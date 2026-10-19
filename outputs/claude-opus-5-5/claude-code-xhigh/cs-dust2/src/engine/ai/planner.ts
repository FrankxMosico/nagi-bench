import type { Vec3 } from '../math.ts';
import { cloneV, dist2D } from '../math.ts';
import type { Game } from '../game.ts';
import type { HoldSpot, SiteId } from '../map/types.ts';
import type { Soldier } from '../soldier.ts';
import type { Team } from '../weapons.ts';
import type { BotTask } from './bot.ts';

/**
 * Team-level strategy layer ("IGL"). Hands out tasks to the team's bots at round start and
 * re-plans on key events: bomb dropped / planted, enemies spotted on a site (CT rotations),
 * and retakes after a plant. Bots execute the tasks with their own state machines.
 */
export class TeamPlanner {
  readonly team: Team;
  readonly game: Game;
  site: SiteId = 'A';
  private rotated: Record<SiteId, boolean> = { A: false, B: false };
  private lastBombState = '';
  private retakeAssigned = false;
  private retakeGo = false;

  constructor(team: Team, game: Game) {
    this.team = team;
    this.game = game;
  }

  /** Alive members of this team currently driven by AI. */
  bots(): Soldier[] {
    return this.game.soldiers.filter((s) => s.team === this.team && s.alive && this.game.isBotControlled(s));
  }

  private setTask(s: Soldier, task: BotTask): void {
    this.game.brainOf(s)?.setTask(task);
  }

  private taskOf(s: Soldier): BotTask | undefined {
    return this.game.brainOf(s)?.task;
  }

  onRoundStart(): void {
    const g = this.game;
    this.rotated = { A: false, B: false };
    this.retakeAssigned = false;
    this.retakeGo = false;
    this.lastBombState = g.bomb.state;
    const bots = this.bots();
    const def = g.def;
    if (this.team === 'T') {
      this.site = g.rng.chance(0.5) ? 'A' : 'B';
      const routes = this.site === 'A' ? ['long', 'short', 'long', 'short', 'long'] : ['tunnels', 'tunnels', 'midToB', 'tunnels', 'tunnels'];
      const holds = def.tHolds[this.site];
      // The bomb carrier takes the first (main) route.
      bots.sort((a, b) => Number(b.hasBomb) - Number(a.hasBomb));
      bots.forEach((s, i) => {
        const points = def.routes[routes[i % routes.length]].map(cloneV);
        const then: BotTask = s.hasBomb
          ? { kind: 'plant', pos: cloneV(g.rng.pick(def.plantSpots[this.site])) }
          : { kind: 'hold', pos: cloneV(holds[i % holds.length].pos), look: cloneV(holds[i % holds.length].look) };
        this.setTask(s, { kind: 'route', points, idx: 0, then, startAt: g.time + (i === 0 ? 0 : g.rng.range(0.2, 2.5)) });
      });
    } else {
      // Default CT setup: 2 A (AWP on long), 1 mid, 2 B.
      const spots: HoldSpot[] = [def.ctHolds.A[0], def.ctHolds.B[0], def.ctHolds.mid[0], def.ctHolds.A[1], def.ctHolds.B[1]];
      const awper = bots.find((s) => s.primary?.def.id === 'awp');
      const ordered = awper ? [awper, ...bots.filter((s) => s !== awper)] : bots;
      ordered.forEach((s, i) => {
        const spot = spots[i % spots.length];
        this.setTask(s, { kind: 'hold', pos: cloneV(spot.pos), look: cloneV(spot.look) });
      });
    }
  }

  update(): void {
    const g = this.game;
    if (g.phase !== 'live') return;
    const b = g.bomb;
    const changed = b.state !== this.lastBombState;
    this.lastBombState = b.state;
    if (this.team === 'T') this.updateT(changed);
    else this.updateCT(changed);
  }

  private updateT(changed: boolean): void {
    const g = this.game;
    const b = g.bomb;
    const bots = this.bots();
    if (b.state === 'dropped') {
      // Nearest bot fetches the bomb (unless one is already on it).
      if (!bots.some((s) => this.taskOf(s)?.kind === 'fetchBomb')) {
        const nearest = this.nearest(bots, b.pos);
        if (nearest) this.setTask(nearest, { kind: 'fetchBomb' });
      }
    } else if (b.state === 'carried') {
      const carrier = g.soldiers[b.carrierId];
      if (carrier && g.isBotControlled(carrier)) {
        const task = this.taskOf(carrier);
        const planning = task && (task.kind === 'plant' || (task.kind === 'route' && task.then.kind === 'plant'));
        if (!planning) this.setTask(carrier, { kind: 'plant', pos: cloneV(g.rng.pick(g.def.plantSpots[this.site])) });
      }
      for (const s of bots) if (this.taskOf(s)?.kind === 'fetchBomb') this.sendToSite(s, bots.indexOf(s));
    } else if (b.state === 'planted' && b.site) {
      if (changed) {
        this.site = b.site;
        bots.forEach((s, i) => this.guard(s, i));
      }
      for (const s of bots) {
        const k = this.taskOf(s)?.kind;
        if (k === 'idle' || k === 'plant' || k === 'fetchBomb') this.guard(s, bots.indexOf(s));
      }
    }
    for (const s of bots) {
      if (this.taskOf(s)?.kind === 'idle' && b.state !== 'planted') this.sendToSite(s, bots.indexOf(s));
    }
  }

  private guard(s: Soldier, i: number): void {
    const holds = this.game.def.tHolds[this.site];
    const h = holds[i % holds.length];
    this.setTask(s, { kind: 'hold', pos: cloneV(h.pos), look: cloneV(h.look) });
  }

  private sendToSite(s: Soldier, i: number): void {
    const holds = this.game.def.tHolds[this.site];
    const h = holds[i % holds.length];
    this.setTask(s, { kind: 'hold', pos: cloneV(h.pos), look: cloneV(h.look) });
  }

  private updateCT(changed: boolean): void {
    const g = this.game;
    const b = g.bomb;
    const bots = this.bots();
    if (b.state === 'planted' && b.site) {
      const site = b.site;
      const holds = g.def.ctHolds[site];
      const stage = g.def.retakeStaging[site];
      const onSite = (s: Soldier) => dist2D(s.pos.x, s.pos.z, b.pos.x, b.pos.z) < 14;
      const goIn = (s: Soldier, i: number) => {
        const h = holds[i % holds.length];
        this.setTask(s, { kind: 'hold', pos: cloneV(h.pos), look: cloneV(b.pos) });
      };
      if (changed || !this.retakeAssigned) {
        // Retake: players already on the site fight, everybody else regroups first.
        this.retakeAssigned = true;
        this.retakeGo = false;
        bots.forEach((s, i) => {
          if (onSite(s)) goIn(s, i);
          else this.setTask(s, { kind: 'hold', pos: cloneV(stage.pos), look: cloneV(stage.look) });
        });
      }
      if (!this.retakeGo) {
        const outside = bots.filter((s) => !onSite(s));
        const gathered = outside.filter((s) => dist2D(s.pos.x, s.pos.z, stage.pos.x, stage.pos.z) < 7).length;
        if (gathered >= Math.min(2, outside.length) || g.bombTimeLeft < 24) {
          this.retakeGo = true;
          bots.forEach((s, i) => goIn(s, i));
        }
      }
      // Exactly one defuser once the retake is on: the closest bot (re-assigned if it dies).
      if (this.retakeGo && !bots.some((s) => this.taskOf(s)?.kind === 'defuse')) {
        const nearest = this.nearest(bots, b.pos);
        if (nearest) this.setTask(nearest, { kind: 'defuse' });
      }
      return;
    }
    // Rotations: if several Ts were seen near a site recently, rotate help there.
    const now = g.time;
    for (const site of ['A', 'B'] as SiteId[]) {
      if (this.rotated[site]) continue;
      const c = g.siteCenter(site);
      let seen = 0;
      for (const info of g.intel.CT.values()) {
        if (now - info.time < 4 && dist2D(info.pos.x, info.pos.z, c.x, c.z) < 34) seen++;
      }
      // A teammate dying on the site is a strong call to rotate.
      for (const s of g.soldiers) {
        if (s.team === 'CT' && !s.alive && now - s.deathTime < 6 && dist2D(s.pos.x, s.pos.z, c.x, c.z) < 30) seen += 2;
      }
      if (seen >= 2) {
        this.rotated[site] = true;
        const holds = g.def.ctHolds[site];
        let i = 0;
        for (const s of bots) {
          const task = this.taskOf(s);
          if (task?.kind !== 'hold') continue;
          const atSite = dist2D(task.pos.x, task.pos.z, c.x, c.z) < 30;
          const isMid = dist2D(task.pos.x, task.pos.z, g.def.ctHolds.mid[0].pos.x, g.def.ctHolds.mid[0].pos.z) < 2;
          if (atSite || isMid) continue;
          const h = holds[i++ % holds.length];
          this.setTask(s, { kind: 'hold', pos: cloneV(h.pos), look: cloneV(h.look) });
        }
      }
    }
  }

  private nearest(list: Soldier[], p: Vec3): Soldier | null {
    let best: Soldier | null = null;
    let bestD = Infinity;
    for (const s of list) {
      const d = dist2D(s.pos.x, s.pos.z, p.x, p.z) + Math.abs(s.pos.y - p.y) * 2;
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    return best;
  }
}


import type { Vec3 } from '../math.ts';
import { DEG, angleDelta, clamp, cloneV, copyV, dist2D, vec3, wrapAngle, yawTowards } from '../math.ts';
import type { Game } from '../game.ts';
import type { ControlInput } from '../soldier.ts';
import { Soldier, emptyInput } from '../soldier.ts';
import { zoneCenter } from '../hitbox.ts';
import type { Slot } from '../weapons.ts';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface BotSkill {
  /** Reaction time range (s) between first sighting and first shot. */
  reaction: [number, number];
  /** Exponential aim convergence rate (1/s) and max turn speed (deg/s). */
  turnRate: number;
  maxTurn: number;
  /** Initial aim error (deg) that decays while tracking. */
  aimError: number;
  headChance: number;
  /** 0..1 recoil compensation. */
  spray: number;
  burst: [number, number];
  fovHalf: number;
}

export const BOT_SKILLS: Record<Difficulty, BotSkill> = {
  easy: { reaction: [0.6, 0.95], turnRate: 6, maxTurn: 260, aimError: 4.5, headChance: 0.08, spray: 0.3, burst: [2, 4], fovHalf: 55 },
  normal: { reaction: [0.34, 0.6], turnRate: 9, maxTurn: 420, aimError: 2.6, headChance: 0.2, spray: 0.55, burst: [3, 6], fovHalf: 62 },
  hard: { reaction: [0.2, 0.36], turnRate: 14, maxTurn: 650, aimError: 1.3, headChance: 0.35, spray: 0.8, burst: [4, 8], fovHalf: 68 },
};

export type BotTask =
  | { kind: 'idle' }
  | { kind: 'route'; points: Vec3[]; idx: number; then: BotTask; startAt: number }
  | { kind: 'hold'; pos: Vec3; look: Vec3 }
  | { kind: 'plant'; pos: Vec3 }
  | { kind: 'defuse' }
  | { kind: 'fetchBomb' };

export type BotState = 'idle' | 'moving' | 'holding' | 'engaging' | 'planting' | 'defusing' | 'investigating';

/**
 * Per-bot finite state machine. High-level tasks come from the TeamPlanner; the brain handles
 * perception response (engage / investigate / react to noise), navigation and weapon handling,
 * and outputs the same ControlInput a human produces — bots obey identical physics and weapon rules.
 */
export class BotBrain {
  readonly s: Soldier;
  readonly game: Game;
  skill: BotSkill;
  task: BotTask = { kind: 'idle' };
  state: BotState = 'idle';

  private readonly input: ControlInput = emptyInput();
  private path: Vec3[] | null = null;
  private pathIdx = 0;
  private pathGoal: Vec3 | null = null;
  private pathRetryAt = 0;
  private progressCheckAt = 0;
  private readonly progressPos = vec3();
  private stuckCount = 0;
  private nudgeUntil = 0;
  private nudgeYaw = 0;

  target: Soldier | null = null;
  private targetSince = 0;
  private reactAt = 0;
  private aimZone: 'head' | 'chest' = 'chest';
  private errYaw = 0;
  private errPitch = 0;
  lastSeenPos: Vec3 | null = null;
  lastSeenTime = -100;
  private alertPos: Vec3 | null = null;
  private alertUntil = 0;
  private burstLeft = 0;
  private burstPauseUntil = 0;
  private lastCountedShot = -1;
  /** Temporarily ignored enemy (long-range stalemate while attacking). */
  private ignoreId = -1;
  private ignoreUntil = 0;
  private strafeDir = 1;
  private strafeSwitchAt = 0;
  private lookYaw = 0;
  private lookPitch = 0;
  private idlePhase: number;
  private holdArrivedAt = -1;
  private readonly aimPoint = vec3();

  constructor(s: Soldier, game: Game, skill: BotSkill) {
    this.s = s;
    this.game = game;
    this.skill = skill;
    this.idlePhase = (s.id * 1.37) % (Math.PI * 2);
  }

  resetForRound(): void {
    this.task = { kind: 'idle' };
    this.state = 'idle';
    this.path = null;
    this.pathGoal = null;
    this.pathRetryAt = 0;
    this.target = null;
    this.lastSeenPos = null;
    this.lastSeenTime = -100;
    this.alertPos = null;
    this.alertUntil = 0;
    this.burstLeft = 0;
    this.burstPauseUntil = 0;
    this.stuckCount = 0;
    this.nudgeUntil = 0;
    this.holdArrivedAt = -1;
    this.progressCheckAt = this.game.time + 1;
    copyV(this.progressPos, this.s.pos);
    this.lookYaw = this.s.yaw;
    this.lookPitch = 0;
  }

  setTask(task: BotTask): void {
    this.task = task;
    this.path = null;
    this.pathGoal = null;
    this.holdArrivedAt = -1;
  }

  onHeard(pos: Vec3): void {
    if (this.target) return;
    this.alertPos = cloneV(pos);
    this.alertUntil = this.game.time + 2.5;
  }

  onDamaged(attacker: Soldier): void {
    if (this.target && this.target.alive) return;
    this.alertPos = cloneV(attacker.pos);
    this.alertUntil = this.game.time + 2.5;
    // Being shot makes the bot react faster once it sees the attacker.
    this.lastSeenTime = Math.max(this.lastSeenTime, this.game.time - 0.5);
  }

  update(dt: number): ControlInput {
    const inp = this.input;
    inp.forward = 0;
    inp.right = 0;
    inp.jump = false;
    inp.crouch = false;
    inp.walk = false;
    inp.fire = false;
    inp.alt = false;
    inp.reload = false;
    inp.use = false;
    inp.drop = false;
    inp.slot = null;
    const g = this.game;
    const now = g.time;

    if (g.phase === 'freeze') {
      this.state = 'idle';
      this.lookTowardsTask();
      this.applyLook(dt, 1);
      return inp;
    }

    this.updateTarget(now);
    const committed = this.committedObjective();
    if (this.target && !committed) {
      this.state = 'engaging';
      this.manageWeapon(inp, now);
      this.combat(inp, now);
      this.applyLook(dt, 1.6);
    } else {
      this.manageWeapon(inp, now);
      this.doTask(inp, now);
      this.applyLook(dt, 1);
    }
    return inp;
  }

  /** True while the bot is pushing an objective (it must not camp in long-range duels). */
  private attacking(): boolean {
    const k = this.task.kind;
    if (k === 'route' || k === 'plant' || k === 'fetchBomb' || k === 'defuse') return true;
    const g = this.game;
    if (this.s.team === 'CT') return g.bomb.state === 'planted' && this.state !== 'holding';
    return g.phase === 'live' && g.bomb.state !== 'planted' && g.roundTimeLeft < 25;
  }

  /** Nearly-finished plant/defuse: keep going even if an enemy appears. */
  private committedObjective(): boolean {
    const s = this.s;
    if (s.planting && s.plantProgress > 1.8) return true;
    if (s.defusing) {
      const left = this.game.defuseDuration(s) - s.defuseProgress;
      // Ninja-defuse if almost done, or if there is no time left to fight first.
      return left < 2.5 || this.game.bombTimeLeft < left + 3;
    }
    return false;
  }

  // ───────────────────────────── perception ─────────────────────────────

  private updateTarget(now: number): void {
    const s = this.s;
    const g = this.game;
    const vis = s.visibleEnemies;
    if (this.target) {
      if (!this.target.alive) {
        this.target = null;
      } else if (!vis.includes(this.target.id)) {
        this.lastSeenPos = cloneV(this.target.pos);
        this.lastSeenTime = now;
        this.target = null;
      }
    }
    // Attackers don't get stuck in endless long-range duels: after a while, push on.
    if (this.target && this.attacking() && now - this.targetSince > 3 && s.weapon.def.id !== 'awp') {
      if (dist2D(s.pos.x, s.pos.z, this.target.pos.x, this.target.pos.z) > 22) {
        this.ignoreId = this.target.id;
        this.ignoreUntil = now + 2.5;
        this.lastSeenPos = cloneV(this.target.pos);
        this.lastSeenTime = now;
        this.target = null;
      }
    }
    if (!this.target && vis.length > 0) {
      let best: Soldier | null = null;
      let bestD = Infinity;
      for (const id of vis) {
        const e = g.soldiers[id];
        const d = dist2D(s.pos.x, s.pos.z, e.pos.x, e.pos.z);
        if (id === this.ignoreId && now < this.ignoreUntil && d > 15) continue;
        if (d < bestD) {
          bestD = d;
          best = e;
        }
      }
      if (best) {
        const sk = this.skill;
        this.target = best;
        this.targetSince = now;
        // Faster reactions if the enemy was just seen, or if holding a pre-aimed angle.
        let quick = now - this.lastSeenTime < 1.2 ? 0.45 : 1;
        // How far the bot has to flick: a pre-aimed angle means a fast, precise first shot.
        const flick = Math.abs(angleDelta(s.yaw, yawTowards(best.pos.x - s.pos.x, best.pos.z - s.pos.z)));
        const preAimed = this.state === 'holding' && flick < 25 * DEG;
        // Holding a pre-aimed angle gives a fixed head start (same edge at every difficulty).
        const react = g.rng.range(sk.reaction[0], sk.reaction[1]) * quick - (preAimed ? 0.13 : 0);
        this.reactAt = now + Math.max(0.08, react);
        this.aimZone = g.rng.chance(sk.headChance) ? 'head' : 'chest';
        const flickFactor = (preAimed ? 0.35 : 0.6) + Math.min(1, flick / (30 * DEG));
        const moving = s.speed > 2 ? 1.25 : 1;
        const err = sk.aimError * DEG * g.rng.range(0.7, 1.2) * flickFactor * moving * (preAimed ? 0.7 : 1);
        const a = g.rng.next() * Math.PI * 2;
        this.errYaw = Math.cos(a) * err * 1.4;
        this.errPitch = Math.sin(a) * err;
        this.burstLeft = 0;
      }
    }
    if (this.target) {
      if (!this.lastSeenPos) this.lastSeenPos = vec3();
      copyV(this.lastSeenPos, this.target.pos);
      this.lastSeenTime = now;
    }
  }

  // ───────────────────────────── combat ─────────────────────────────

  private combat(inp: ControlInput, now: number): void {
    const s = this.s;
    const t = this.target as Soldier;
    const g = this.game;
    const ap = zoneCenter(g.poseOf(t), this.aimZone, this.aimPoint);
    const ey = s.eyeY;
    const dx = ap.x - s.pos.x;
    const dy = ap.y - ey;
    const dz = ap.z - s.pos.z;
    const hd = Math.hypot(dx, dz);
    const dist = Math.hypot(hd, dy);
    const wantYaw = yawTowards(dx, dz);
    const wantPitch = Math.atan2(dy, hd);
    const settle = 0.15 + 0.85 * Math.exp(-(now - this.targetSince) * 3.0);
    const sk = this.skill;
    this.lookYaw = wantYaw + this.errYaw * settle - s.punchYaw * sk.spray;
    this.lookPitch = wantPitch + this.errPitch * settle - s.punchPitch * sk.spray;

    const def = s.weapon.def;
    const aimYaw = s.yaw + s.punchYaw;
    const aimPitch = s.pitch + s.punchPitch;
    const aimErr = Math.hypot(angleDelta(aimYaw, wantYaw) * Math.cos(wantPitch), aimPitch - wantPitch);
    const size = def.id === 'awp' ? 0.22 : 0.42;
    const tol = Math.max(0.8 * DEG, Math.atan2(size, dist));
    const ready = now >= this.reactAt && aimErr < tol * 1.25;

    // Count shots for burst control.
    if (s.lastShotTime > this.lastCountedShot) {
      this.lastCountedShot = s.lastShotTime;
      this.burstLeft--;
      if (this.burstLeft <= 0 && def.auto) {
        this.burstPauseUntil = now + g.rng.range(0.16, 0.38) * (dist > 20 ? 1.6 : 1);
      }
    }

    let firing = false;
    if (def.slot === 'primary' || def.slot === 'secondary') {
      if (def.scopeFovs && s.scope === 0 && s.scopeRestoreAt === 0 && dist > 5 && s.reloadEnd === 0) {
        inp.alt = !s.altHeldPrev;
      }
      const scopedOk = !def.scopeFovs || s.scope > 0 || dist < 5;
      if (ready && scopedOk && s.reloadEnd === 0) {
        if (def.auto) {
          if (now >= this.burstPauseUntil) {
            if (this.burstLeft <= 0) {
              this.burstLeft = dist < 9 ? 12 : dist < 22 ? g.rng.int(sk.burst[1] - sk.burst[0] + 1) + sk.burst[0] : g.rng.int(2) + 2;
            }
            inp.fire = true;
            firing = true;
          }
        } else if (now >= s.nextFireTime && s.recoilIndex < (def.id === 'deagle' ? 0.7 : 2.2)) {
          inp.fire = !s.fireHeldPrev;
          firing = inp.fire;
        }
      }
    } else if (def.slot === 'melee') {
      if (dist < 1.8 && ready) inp.fire = true;
    }

    // Movement while fighting.
    if (def.slot === 'melee') {
      this.steerTowards(t.pos.x, t.pos.z, inp);
    } else if (def.scopeFovs || (def.auto && dist > 11)) {
      // Stand still (counter-strafe) for accuracy; strafe only between bursts at mid range.
      if (!firing && def.auto && now < this.burstPauseUntil && dist < 30) this.strafe(inp, now);
    } else if (!firing || def.slot === 'secondary') {
      this.strafe(inp, now);
    }
    this.state = 'engaging';
  }

  private strafe(inp: ControlInput, now: number): void {
    if (now >= this.strafeSwitchAt) {
      this.strafeDir = -this.strafeDir;
      this.strafeSwitchAt = now + this.game.rng.range(0.35, 0.8);
    }
    inp.right = this.strafeDir;
  }

  private manageWeapon(inp: ControlInput, now: number): void {
    const s = this.s;
    if (this.task.kind === 'plant' && s.hasBomb && this.game.siteAt(s.pos) && !this.target) return;
    const usable = (slot: Slot) => {
      const w = s.weaponIn(slot);
      return w !== null && (w.def.magSize === 0 || w.mag + w.reserve > 0);
    };
    let desired: Slot = usable('primary') ? 'primary' : usable('secondary') ? 'secondary' : 'melee';
    if (this.target && s.primary && s.primary.mag === 0 && s.secondary && s.secondary.mag > 0) {
      const d = dist2D(s.pos.x, s.pos.z, this.target.pos.x, this.target.pos.z);
      if (d < 22) desired = 'secondary';
    }
    if (s.activeSlot !== desired && !(desired === 'primary' && s.activeSlot === 'secondary' && this.target && s.secondary && s.secondary.mag > 0)) {
      inp.slot = desired;
      return;
    }
    const w = s.weapon;
    if (w.def.magSize > 0 && s.reloadEnd === 0 && w.reserve > 0) {
      if (w.mag === 0) inp.reload = true;
      else if (!this.target && now - this.lastSeenTime > 2.5 && w.mag < w.def.magSize * 0.5) inp.reload = true;
    }
    // Unscope while moving around.
    if (!this.target && s.scope > 0 && this.state === 'moving') inp.alt = !s.altHeldPrev;
  }

  // ───────────────────────────── tasks ─────────────────────────────

  private doTask(inp: ControlInput, now: number): void {
    const g = this.game;
    const s = this.s;
    const task = this.task;
    switch (task.kind) {
      case 'idle': {
        this.state = 'idle';
        this.idleLook(now, s.yaw);
        break;
      }
      case 'route': {
        if (now < task.startAt) {
          this.state = 'idle';
          const p = task.points[task.idx];
          this.lookYaw = yawTowards(p.x - s.pos.x, p.z - s.pos.z);
          break;
        }
        const p = task.points[task.idx];
        const last = task.idx === task.points.length - 1;
        if (this.moveTo(p, inp, now, last ? 1.0 : 2.2)) {
          task.idx++;
          if (task.idx >= task.points.length) this.setTask(task.then);
        }
        this.state = 'moving';
        this.lookAtThreats(now);
        break;
      }
      case 'hold': {
        if (this.moveTo(task.pos, inp, now, 0.8)) {
          this.state = 'holding';
          if (this.holdArrivedAt < 0) this.holdArrivedAt = now;
          const base = yawTowards(task.look.x - s.pos.x, task.look.z - s.pos.z);
          const hd = Math.hypot(task.look.x - s.pos.x, task.look.z - s.pos.z);
          this.lookPitch = Math.atan2(task.look.y + 1.3 - s.eyeY, Math.max(1, hd));
          this.idleLook(now, base);
          // AWPers scope while holding an angle.
          if (s.weapon.def.scopeFovs && s.scope === 0 && s.scopeRestoreAt === 0 && now - this.holdArrivedAt > 0.5) inp.alt = !s.altHeldPrev;
        } else {
          this.state = 'moving';
          this.lookAtThreats(now);
        }
        break;
      }
      case 'plant': {
        if (!s.hasBomb) {
          this.setTask({ kind: 'idle' });
          break;
        }
        const inSite = g.siteAt(s.pos) !== null;
        const arrived = this.moveTo(task.pos, inp, now, 0.9);
        if (arrived || (inSite && dist2D(s.pos.x, s.pos.z, task.pos.x, task.pos.z) < 3)) {
          inp.forward = 0;
          inp.right = 0;
          this.state = 'planting';
          if (!inSite) break;
          if (s.activeSlot !== 'bomb') inp.slot = 'bomb';
          else inp.fire = true;
          this.lookPitch = -0.6;
        } else {
          this.state = 'moving';
          this.lookAtThreats(now);
        }
        break;
      }
      case 'defuse': {
        const b = g.bomb;
        if (b.state !== 'planted') {
          this.setTask({ kind: 'idle' });
          break;
        }
        if (this.moveTo(b.pos, inp, now, 0.9)) {
          inp.use = true;
          this.state = 'defusing';
          this.lookYaw = yawTowards(b.pos.x - s.pos.x, b.pos.z - s.pos.z);
          this.lookPitch = -0.7;
        } else {
          this.state = 'moving';
          this.lookAtThreats(now);
        }
        break;
      }
      case 'fetchBomb': {
        const b = g.bomb;
        if (b.state !== 'dropped') {
          this.setTask({ kind: 'idle' });
          break;
        }
        this.moveTo(b.pos, inp, now, 0.2);
        this.state = 'moving';
        this.lookAtThreats(now);
        break;
      }
    }
  }

  private lookTowardsTask(): void {
    const t = this.task;
    const s = this.s;
    let p: Vec3 | null = null;
    if (t.kind === 'route') p = t.points[Math.min(t.idx, t.points.length - 1)];
    else if (t.kind === 'hold') p = t.pos;
    if (p && dist2D(s.pos.x, s.pos.z, p.x, p.z) > 0.5) this.lookYaw = yawTowards(p.x - s.pos.x, p.z - s.pos.z);
    this.lookPitch = 0;
  }

  /** Most recent enemy position reported by a teammate nearby (team intel / "callouts"). */
  private teamCallout(now: number, maxDist: number): Vec3 | null {
    const s = this.s;
    let best: Vec3 | null = null;
    let bestT = now - 1.5;
    for (const info of this.game.intel[s.team].values()) {
      if (info.time <= bestT) continue;
      if (dist2D(s.pos.x, s.pos.z, info.pos.x, info.pos.z) > maxDist) continue;
      best = info.pos;
      bestT = info.time;
    }
    return best;
  }

  /** While moving: look at recent alerts / last known enemy positions, else along the path. */
  private lookAtThreats(now: number): void {
    const s = this.s;
    let p: Vec3 | null = null;
    if (this.alertPos && now < this.alertUntil) p = this.alertPos;
    else if (this.lastSeenPos && now - this.lastSeenTime < 4) p = this.lastSeenPos;
    else p = this.teamCallout(now, 30);
    if (p && dist2D(s.pos.x, s.pos.z, p.x, p.z) < 40) {
      this.lookYaw = yawTowards(p.x - s.pos.x, p.z - s.pos.z);
      this.lookPitch = Math.atan2(p.y + 1.3 - s.eyeY, Math.max(1, dist2D(s.pos.x, s.pos.z, p.x, p.z)));
    }
  }

  private idleLook(now: number, base: number): void {
    const s = this.s;
    let p: Vec3 | null = null;
    if (this.alertPos && now < this.alertUntil) p = this.alertPos;
    else if (this.lastSeenPos && now - this.lastSeenTime < 6) p = this.lastSeenPos;
    else p = this.teamCallout(now, 35);
    if (p && dist2D(s.pos.x, s.pos.z, p.x, p.z) > 0.5) {
      this.lookYaw = yawTowards(p.x - s.pos.x, p.z - s.pos.z);
      this.lookPitch = Math.atan2(p.y + 1.3 - s.eyeY, Math.max(1, dist2D(s.pos.x, s.pos.z, p.x, p.z)));
      return;
    }
    this.lookYaw = wrapAngle(base + Math.sin(now * 0.55 + this.idlePhase) * 0.32);
  }

  // ───────────────────────────── navigation ─────────────────────────────

  /** Path-follow towards goal; returns true once within `arrive` metres. */
  moveTo(goal: Vec3, inp: ControlInput, now: number, arrive: number): boolean {
    const s = this.s;
    const g = this.game;
    if (dist2D(s.pos.x, s.pos.z, goal.x, goal.z) <= arrive && Math.abs(goal.y - s.pos.y) < 1.8) {
      this.path = null;
      return true;
    }
    if (!this.path || !this.pathGoal || dist2D(this.pathGoal.x, this.pathGoal.z, goal.x, goal.z) > 0.75 || Math.abs(this.pathGoal.y - goal.y) > 1.5) {
      if (now < this.pathRetryAt || !g.consumePathBudget()) return false;
      this.path = g.nav.findPath(s.pos, goal);
      this.pathIdx = 0;
      this.pathGoal = cloneV(goal);
      if (!this.path || this.path.length === 0) {
        this.path = null;
        this.pathRetryAt = now + 1;
        // Fallback: walk straight at it.
        this.steerTowards(goal.x, goal.z, inp);
        return false;
      }
      this.progressCheckAt = now + 1;
      copyV(this.progressPos, s.pos);
    }
    const path = this.path;
    let wp = path[this.pathIdx];
    while (this.pathIdx < path.length - 1 && dist2D(s.pos.x, s.pos.z, wp.x, wp.z) < 0.65) {
      this.pathIdx++;
      wp = path[this.pathIdx];
    }
    if (this.pathIdx === path.length - 1 && dist2D(s.pos.x, s.pos.z, wp.x, wp.z) < 0.3) {
      // Reached the end of the path but not the goal (goal snapped to nearest walkable cell).
      return dist2D(s.pos.x, s.pos.z, goal.x, goal.z) <= arrive + 1.5;
    }

    // Stuck detection & recovery.
    if (now >= this.progressCheckAt) {
      const moved = dist2D(s.pos.x, s.pos.z, this.progressPos.x, this.progressPos.z);
      copyV(this.progressPos, s.pos);
      this.progressCheckAt = now + 1;
      if (moved < 0.4) {
        this.stuckCount++;
        if (this.stuckCount >= 2) {
          this.nudgeUntil = now + 0.6;
          this.nudgeYaw = g.rng.next() * Math.PI * 2;
        }
        if (this.stuckCount === 1 || this.stuckCount === 3) this.path = null;
        if (this.stuckCount >= 6) {
          // Last resort: snap to the next waypoint's cell centre.
          const c = g.nav.nearestWalkable(wp.x, wp.z, wp.y);
          if (c >= 0) {
            const p = g.nav.cellCenter(c);
            if (!g.world.isBlocked(p.x, p.z, s.radius, p.y, s.height)) copyV(s.pos, p);
          }
          this.stuckCount = 0;
          this.path = null;
        }
      } else {
        this.stuckCount = 0;
      }
    }

    if (now < this.nudgeUntil) {
      const nx = s.pos.x - Math.sin(this.nudgeYaw);
      const nz = s.pos.z - Math.cos(this.nudgeYaw);
      this.steerTowards(nx, nz, inp);
    } else {
      this.steerTowards(wp.x, wp.z, inp);
    }
    // Default look direction: a little further along the path.
    const ahead = path[Math.min(path.length - 1, this.pathIdx + 1)];
    const lx = (wp.x + ahead.x) * 0.5;
    const lz = (wp.z + ahead.z) * 0.5;
    if (dist2D(s.pos.x, s.pos.z, lx, lz) > 0.8) this.lookYaw = yawTowards(lx - s.pos.x, lz - s.pos.z);
    this.lookPitch = clamp((wp.y - s.pos.y) * 0.08, -0.25, 0.25);
    return false;
  }

  private steerTowards(x: number, z: number, inp: ControlInput): void {
    const s = this.s;
    let dx = x - s.pos.x;
    let dz = z - s.pos.z;
    const l = Math.hypot(dx, dz);
    if (l < 1e-4) return;
    dx /= l;
    dz /= l;
    const sy = Math.sin(s.yaw);
    const cy = Math.cos(s.yaw);
    // forward = (-sin, -cos), right = (cos, -sin)
    inp.forward = dx * -sy + dz * -cy;
    inp.right = dx * cy + dz * -sy;
  }

  private applyLook(dt: number, boost: number): void {
    const s = this.s;
    const k = 1 - Math.exp(-this.skill.turnRate * boost * dt);
    const maxStep = this.skill.maxTurn * boost * DEG * dt;
    const dy = angleDelta(s.yaw, this.lookYaw);
    s.yaw = wrapAngle(s.yaw + clamp(dy * k, -maxStep, maxStep));
    const dp = this.lookPitch - s.pitch;
    s.pitch = clamp(s.pitch + clamp(dp * k, -maxStep, maxStep), -1.45, 1.45);
  }
}

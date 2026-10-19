import type { Vec3 } from './math.ts';
import {
  DEG,
  Random,
  angleDelta,
  clamp,
  cloneV,
  copyV,
  damp,
  dist2D,
  forwardFromAngles,
  lerp,
  vec3,
  yawTowards,
} from './math.ts';
import { DUST2 } from './map/dust2.ts';
import type { BuiltMap } from './map/mapBuilder.ts';
import { authoredFloorHeight, buildMap, calloutAt } from './map/mapBuilder.ts';
import type { MapDefinition, SiteId } from './map/types.ts';
import type { RayHit } from './physics.ts';
import { CollisionWorld, GRAVITY } from './physics.ts';
import { NavGrid } from './nav.ts';
import { EventBus } from './events.ts';
import type { HitboxHit, HitboxPose } from './hitbox.ts';
import { raycastHitboxes } from './hitbox.ts';
import type { ControlInput, SlotRequest } from './soldier.ts';
import { CROUCH_HEIGHT, STAND_HEIGHT, Soldier, emptyInput } from './soldier.ts';
import type { HitZone, RoundType, Slot, Team, WeaponDef, WeaponId, WeaponInst } from './weapons.ts';
import { DEFAULT_PISTOL, DEFAULT_RIFLE, ROUND_PRESETS, WEAPONS, computeDamage, makeWeapon } from './weapons.ts';
import { BotBrain, BOT_SKILLS } from './ai/bot.ts';
import type { Difficulty } from './ai/bot.ts';
import { TeamPlanner } from './ai/planner.ts';

export type Phase = 'freeze' | 'live' | 'post' | 'over';

export const FREEZE_TIME = 4;
export const ROUND_TIME = 115;
export const POST_TIME = 5;
export const BUY_TIME = 15;
export const BOMB_TIME = 40;
export const PLANT_TIME = 3.2;
export const DEFUSE_TIME = 10;
export const DEFUSE_TIME_KIT = 5;
export const JUMP_VELOCITY = 6.3;

export interface GameOptions {
  /** Team of the human player, or null for an all-bot match (headless tests / attract mode). */
  humanTeam: Team | null;
  difficulty: Difficulty;
  firstRound: RoundType;
  roundsToWin: number;
  seed?: number;
  humanName?: string;
}

export interface BombState {
  state: 'carried' | 'dropped' | 'planted' | 'defused' | 'exploded';
  carrierId: number;
  pos: Vec3;
  site: SiteId | null;
  plantedAt: number;
  explodeAt: number;
  defuserId: number;
  nextBeep: number;
  dropTime: number;
  droppedBy: number;
  vel: Vec3;
}

export interface DroppedWeapon {
  id: number;
  weapon: WeaponInst;
  pos: Vec3;
  vel: Vec3;
  yaw: number;
  dropTime: number;
  droppedBy: number;
  onGround: boolean;
}

export interface KillFeedEntry {
  id: number;
  time: number;
  killer: string | null;
  killerTeam: Team | null;
  victim: string;
  victimTeam: Team;
  weapon: string;
  headshot: boolean;
  involvesHuman: boolean;
}

export interface Announcement {
  id: number;
  text: string;
  sub: string;
  tone: 'T' | 'CT' | 'neutral' | 'danger';
  until: number;
}

export interface HumanFlags {
  specNext: boolean;
  specPrev: boolean;
  takeOver: boolean;
}

const T_NAMES = ['Phoenix', 'Vortex', 'Kamil', 'Dmitri', 'Yusuf'];
const CT_NAMES = ['Hawk', 'Frost', 'Ranger', 'Archer', 'Viper'];

interface MapResources {
  built: BuiltMap;
  world: CollisionWorld;
  nav: NavGrid;
}

let cachedResources: MapResources | null = null;

/** Map, collision world and nav grid are immutable and shared between matches. */
export function getMapResources(def: MapDefinition = DUST2): MapResources {
  if (cachedResources && cachedResources.built.def === def) return cachedResources;
  const built = buildMap(def);
  const world = new CollisionWorld(built.boxes, built.ramps);
  const nav = new NavGrid(world, def.bounds, [...def.spawns.T, ...def.spawns.CT], (x, z) => authoredFloorHeight(def, x, z));
  cachedResources = { built, world, nav };
  return cachedResources;
}

/**
 * Authoritative simulation: rounds, movement, weapons, damage, C4, AI. Pure TypeScript with no
 * DOM / three.js dependency; stepped at a fixed rate by the client (or a headless test).
 */
export class Game {
  readonly map: BuiltMap;
  readonly def: MapDefinition;
  readonly world: CollisionWorld;
  readonly nav: NavGrid;
  readonly rng: Random;
  readonly events = new EventBus();
  readonly soldiers: Soldier[] = [];
  readonly opts: GameOptions;
  readonly brains = new Map<number, BotBrain>();
  readonly planners: Record<Team, TeamPlanner>;
  readonly intel: Record<Team, Map<number, { pos: Vec3; time: number }>> = { T: new Map(), CT: new Map() };

  time = 0;
  phase: Phase = 'freeze';
  phaseEnd = 0;
  roundNumber = 0;
  roundType: RoundType = 'pistol';
  roundEndsAt = 0;
  liveStartedAt = 0;
  score: Record<Team, number> = { T: 0, CT: 0 };
  lastWinner: Team | null = null;
  lastReason = '';
  matchWinner: Team | null = null;
  bomb: BombState;
  items: DroppedWeapon[] = [];
  killfeed: KillFeedEntry[] = [];
  announcement: Announcement | null = null;

  humanId = -1;
  controlledId = -1;
  spectateId = -1;
  humanInput: ControlInput = emptyInput();
  humanFlags: HumanFlags = { specNext: false, specPrev: false, takeOver: false };

  /** Remaining A* searches allowed this tick (spreads path-finding spikes across frames). */
  pathBudget = 0;
  stats = { plants: 0, defuses: 0, explosions: 0, shots: 0, kills: 0, roundsPlayed: 0 };

  private perceptionTimer = 0;
  private plannerTimer = 0;
  private nextId = 1;
  private readonly rayHit: RayHit = { t: 0, nx: 0, ny: 0, nz: 0, box: 0 };
  private readonly boxHit: HitboxHit = { t: 0, zone: 'chest' };
  private readonly pose: HitboxPose = { x: 0, y: 0, z: 0, yaw: 0, crouch: 0 };
  private readonly tmpDir = vec3();

  constructor(opts: GameOptions, mapDef: MapDefinition = DUST2) {
    this.opts = opts;
    this.def = mapDef;
    const res = getMapResources(mapDef);
    this.map = res.built;
    this.world = res.world;
    this.nav = res.nav;
    this.rng = new Random(opts.seed);
    this.bomb = {
      state: 'carried',
      carrierId: -1,
      pos: vec3(),
      site: null,
      plantedAt: 0,
      explodeAt: 0,
      defuserId: -1,
      nextBeep: 0,
      dropTime: 0,
      droppedBy: -1,
      vel: vec3(),
    };

    const skill = BOT_SKILLS[opts.difficulty];
    let id = 0;
    for (const team of ['T', 'CT'] as Team[]) {
      const names = team === 'T' ? T_NAMES : CT_NAMES;
      for (let i = 0; i < 5; i++) {
        const isHuman = opts.humanTeam === team && i === 0;
        const name = isHuman ? opts.humanName ?? '你' : `BOT ${names[i]}`;
        const s = new Soldier(id++, name, team, i);
        this.soldiers.push(s);
        if (isHuman) this.humanId = s.id;
        this.brains.set(s.id, new BotBrain(s, this, skill));
      }
    }
    this.controlledId = this.humanId;
    this.planners = { T: new TeamPlanner('T', this), CT: new TeamPlanner('CT', this) };
  }

  // ───────────────────────────── queries ─────────────────────────────

  get controlled(): Soldier | null {
    return this.controlledId >= 0 ? this.soldiers[this.controlledId] : null;
  }

  get human(): Soldier | null {
    return this.humanId >= 0 ? this.soldiers[this.humanId] : null;
  }

  isBotControlled(s: Soldier): boolean {
    return s.id !== this.controlledId;
  }

  brainOf(s: Soldier): BotBrain | undefined {
    return this.brains.get(s.id);
  }

  aliveCount(team: Team): number {
    let n = 0;
    for (const s of this.soldiers) if (s.team === team && s.alive) n++;
    return n;
  }

  siteAt(p: Vec3): SiteId | null {
    for (const id of ['A', 'B'] as SiteId[]) {
      const r = this.def.bombSites[id];
      if (p.x >= r.x0 && p.x <= r.x1 && p.z >= r.z0 && p.z <= r.z1) return id;
    }
    return null;
  }

  siteCenter(site: SiteId): Vec3 {
    const r = this.def.bombSites[site];
    const x = (r.x0 + r.x1) / 2;
    const z = (r.z0 + r.z1) / 2;
    const c = this.nav.nearestWalkable(x, z, 3);
    return c >= 0 ? this.nav.cellCenter(c) : vec3(x, 0, z);
  }

  callout(p: Vec3): string {
    return calloutAt(this.def, p.x, p.z);
  }

  get roundTimeLeft(): number {
    if (this.phase === 'freeze') return ROUND_TIME;
    if (this.phase === 'live') return Math.max(0, this.roundEndsAt - this.time);
    return 0;
  }

  get bombTimeLeft(): number {
    return this.bomb.state === 'planted' ? Math.max(0, this.bomb.explodeAt - this.time) : 0;
  }

  canBuy(s: Soldier): boolean {
    if (!s.alive) return false;
    if (this.phase === 'freeze') return true;
    return this.phase === 'live' && this.time - this.liveStartedAt < BUY_TIME;
  }

  consumePathBudget(): boolean {
    if (this.pathBudget <= 0) return false;
    this.pathBudget--;
    return true;
  }

  // ───────────────────────────── match flow ─────────────────────────────

  startMatch(): void {
    this.score = { T: 0, CT: 0 };
    this.roundNumber = 0;
    this.matchWinner = null;
    for (const s of this.soldiers) {
      s.kills = 0;
      s.deaths = 0;
      s.damageDealt = 0;
    }
    this.startRound();
  }

  private startRound(): void {
    this.roundNumber++;
    this.roundType = this.roundNumber === 1 ? this.opts.firstRound : 'rifle';
    this.phase = 'freeze';
    this.phaseEnd = this.time + FREEZE_TIME;
    this.items = [];
    this.intel.T.clear();
    this.intel.CT.clear();
    this.controlledId = this.humanId;
    this.spectateId = -1;
    const preset = ROUND_PRESETS[this.roundType];

    for (const team of ['T', 'CT'] as Team[]) {
      const members = this.soldiers.filter((s) => s.team === team);
      const spawns = this.def.spawns[team];
      // In rifle rounds one bot per team gets an AWP, one gets a Deagle.
      const botIdx = members.filter((s) => s.id !== this.humanId).map((s) => s.id);
      const awpId = preset.primary ? this.rng.pick(botIdx) : -1;
      const deagleId = preset.primary ? this.rng.pick(botIdx) : -1;
      members.forEach((s, i) => {
        this.resetSoldier(s, spawns[i % spawns.length], team === 'T' ? 0 : Math.PI);
        s.armor = preset.armor;
        s.helmet = preset.helmet;
        s.hasKit = team === 'CT' && preset.defuseKit;
        s.secondary = makeWeapon(s.id === deagleId ? 'deagle' : DEFAULT_PISTOL[team]);
        s.primary = preset.primary ? makeWeapon(s.id === awpId ? 'awp' : DEFAULT_RIFLE[team]) : null;
        s.activeSlot = s.bestSlot();
        s.lastSlot = 'melee';
      });
    }

    // Give the bomb to a random terrorist.
    const ts = this.soldiers.filter((s) => s.team === 'T');
    const carrier = this.rng.pick(ts);
    carrier.hasBomb = true;
    this.bomb = {
      state: 'carried',
      carrierId: carrier.id,
      pos: cloneV(carrier.pos),
      site: null,
      plantedAt: 0,
      explodeAt: 0,
      defuserId: -1,
      nextBeep: 0,
      dropTime: 0,
      droppedBy: -1,
      vel: vec3(),
    };

    for (const b of this.brains.values()) b.resetForRound();
    this.planners.T.onRoundStart();
    this.planners.CT.onRoundStart();

    this.announce(`第 ${this.roundNumber} 回合 · ${preset.label}`, this.roundType === 'pistol' ? '全员默认手枪 · 仅凯夫拉护甲' : '按 B 购买武器', 'neutral', 3.5);
    this.events.emit({ type: 'roundStart', round: this.roundNumber, roundType: this.roundType });
  }

  private resetSoldier(s: Soldier, spawn: Vec3, yaw: number): void {
    copyV(s.pos, spawn);
    copyV(s.prevPos, spawn);
    s.vel.x = s.vel.y = s.vel.z = 0;
    s.yaw = s.prevYaw = yaw;
    s.pitch = s.prevPitch = 0;
    s.punchPitch = s.punchYaw = 0;
    s.alive = true;
    s.health = 100;
    s.hasBomb = false;
    s.onGround = true;
    s.crouchAmt = 0;
    s.crouching = false;
    s.height = STAND_HEIGHT;
    s.nextFireTime = 0;
    s.reloadEnd = 0;
    s.drawEnd = this.time;
    s.drawStart = this.time - 1;
    s.recoilIndex = 0;
    s.scope = 0;
    s.resumeScope = 0;
    s.scopeRestoreAt = 0;
    s.planting = s.defusing = false;
    s.plantProgress = s.defuseProgress = 0;
    s.roundKills = 0;
    s.killerId = -1;
    s.lastAttackerId = -1;
    s.lastHurtTime = -100;
    s.deathTime = -100;
    s.speed = 0;
    s.spottedUntil.T = s.spottedUntil.CT = -1;
    s.visibleEnemies.length = 0;
    s.fireHeldPrev = s.altHeldPrev = s.useHeldPrev = false;
    s.melee = makeWeapon('knife');
  }

  private announce(text: string, sub: string, tone: Announcement['tone'], duration: number): void {
    this.announcement = { id: this.nextId++, text, sub, tone, until: this.time + duration };
  }

  private endRound(winner: Team, reason: string): void {
    if (this.phase !== 'live') return;
    this.phase = 'post';
    this.phaseEnd = this.time + POST_TIME;
    this.score[winner]++;
    this.lastWinner = winner;
    this.lastReason = reason;
    this.stats.roundsPlayed++;
    for (const s of this.soldiers) {
      s.planting = false;
      s.defusing = false;
    }
    if (this.score[winner] >= this.opts.roundsToWin) this.matchWinner = winner;
    this.announce(winner === 'CT' ? '反恐精英 获胜' : '恐怖分子 获胜', reason, winner, POST_TIME);
    this.events.emit({ type: 'roundEnd', winner, reason });
  }

  // ───────────────────────────── main step ─────────────────────────────

  step(dt: number): void {
    this.time += dt;
    this.pathBudget = 4;
    for (const s of this.soldiers) {
      copyV(s.prevPos, s.pos);
      s.prevYaw = s.yaw;
      s.prevPitch = s.pitch;
    }

    if (this.phase === 'freeze' && this.time >= this.phaseEnd) {
      this.phase = 'live';
      this.liveStartedAt = this.time;
      this.roundEndsAt = this.time + ROUND_TIME;
      this.events.emit({ type: 'roundLive' });
    } else if (this.phase === 'post' && this.time >= this.phaseEnd) {
      if (this.matchWinner) {
        this.phase = 'over';
        this.announce(this.matchWinner === 'CT' ? '比赛结束 · 反恐精英胜利' : '比赛结束 · 恐怖分子胜利', `${this.score.T} : ${this.score.CT}`, this.matchWinner, 9999);
        this.events.emit({ type: 'matchOver', winner: this.matchWinner });
      } else {
        this.startRound();
      }
    }
    if (this.phase === 'over') return;

    this.perceptionTimer -= dt;
    if (this.perceptionTimer <= 0) {
      this.perceptionTimer = 0.1;
      this.perceive();
    }
    this.plannerTimer -= dt;
    if (this.plannerTimer <= 0) {
      this.plannerTimer = 0.4;
      this.planners.T.update();
      this.planners.CT.update();
    }

    for (const s of this.soldiers) {
      if (!s.alive) continue;
      let input: ControlInput;
      if (s.id === this.controlledId) {
        input = this.humanInput;
      } else {
        input = (this.brains.get(s.id) as BotBrain).update(dt);
      }
      s.input = input;
      this.updateSoldier(s, input, dt);
    }

    this.separateSoldiers();
    this.updateItems(dt);
    this.updateBomb(dt);
    this.checkRoundEnd();
    this.updateSpectator();
    if (this.announcement && this.time > this.announcement.until) this.announcement = null;
  }

  // ───────────────────────────── soldiers ─────────────────────────────

  maxSpeed(s: Soldier): number {
    const def = s.weapon.def;
    let v = s.scope > 0 && def.scopedMoveSpeed ? def.scopedMoveSpeed : def.moveSpeed;
    if (s.walking) v *= 0.52;
    v *= lerp(1, 0.36, s.crouchAmt);
    return v;
  }

  private updateSoldier(s: Soldier, inp: ControlInput, dt: number): void {
    const frozen = this.phase === 'freeze';
    if (inp.slot) this.requestSlot(s, inp.slot);
    if (inp.drop) this.dropActive(s);

    // Crouch (cannot stand up under a ceiling).
    s.crouching = inp.crouch;
    let crouchTarget = s.crouching ? 1 : 0;
    if (crouchTarget === 0 && s.crouchAmt > 0 && this.world.isBlocked(s.pos.x, s.pos.z, s.radius * 0.95, s.pos.y, STAND_HEIGHT, 0.3)) {
      crouchTarget = s.crouchAmt;
    }
    const cs = dt * 7;
    s.crouchAmt = s.crouchAmt < crouchTarget ? Math.min(crouchTarget, s.crouchAmt + cs) : Math.max(crouchTarget, s.crouchAmt - cs);
    s.height = lerp(STAND_HEIGHT, CROUCH_HEIGHT, s.crouchAmt);
    s.walking = inp.walk;

    // Movement.
    const busy = s.planting || s.defusing;
    let fwd = frozen || busy ? 0 : inp.forward;
    let rt = frozen || busy ? 0 : inp.right;
    const il = Math.hypot(fwd, rt);
    if (il > 1) {
      fwd /= il;
      rt /= il;
    }
    const sy = Math.sin(s.yaw);
    const cy = Math.cos(s.yaw);
    const wx = -sy * fwd + cy * rt;
    const wz = -cy * fwd - sy * rt;
    const maxV = this.maxSpeed(s);
    const wishing = fwd !== 0 || rt !== 0;
    if (s.onGround) {
      const rate = wishing ? 9 : 12;
      s.vel.x = damp(s.vel.x, wx * maxV, rate, dt);
      s.vel.z = damp(s.vel.z, wz * maxV, rate, dt);
    } else if (wishing) {
      // Limited air control.
      s.vel.x = damp(s.vel.x, wx * maxV, 1.2, dt);
      s.vel.z = damp(s.vel.z, wz * maxV, 1.2, dt);
    }
    if (inp.jump && s.onGround && !frozen && !busy) {
      s.vel.y = JUMP_VELOCITY;
      s.onGround = false;
      this.events.emit({ type: 'jump', soldier: s.id });
    }
    const res = this.world.moveBody(s, dt);
    if (res.landed && res.impact > 3) {
      this.events.emit({ type: 'land', soldier: s.id, pos: cloneV(s.pos), impact: res.impact });
      if (res.impact > 12.5) this.hurtWorld(s, Math.round((res.impact - 12.5) * 9));
    }
    s.speed = Math.hypot(s.vel.x, s.vel.z);

    if (s.onGround && !s.walking && s.crouchAmt < 0.5 && s.speed > 2.6) {
      s.stepAccum += s.speed * dt;
      if (s.stepAccum > 2.1) {
        s.stepAccum = 0;
        this.events.emit({ type: 'footstep', soldier: s.id, pos: cloneV(s.pos) });
        this.notifyNoise(s, 16);
      }
    }

    this.updateWeapon(s, inp, dt, frozen);
    this.updatePlant(s, inp, dt);
    this.updateDefuse(s, inp, dt);
    if (inp.use && !s.useHeldPrev && !s.defusing) this.tryUsePickup(s);

    s.fireHeldPrev = inp.fire;
    s.altHeldPrev = inp.alt;
    s.useHeldPrev = inp.use;
  }

  private requestSlot(s: Soldier, req: SlotRequest): void {
    const order: Slot[] = ['primary', 'secondary', 'melee', 'bomb'];
    let target: Slot | null = null;
    if (req === 'last') target = s.weaponIn(s.lastSlot) ? s.lastSlot : null;
    else if (req === 'next' || req === 'prev') {
      const dir = req === 'next' ? 1 : -1;
      let i = order.indexOf(s.activeSlot);
      for (let k = 0; k < order.length; k++) {
        i = (i + dir + order.length) % order.length;
        if (s.weaponIn(order[i])) {
          target = order[i];
          break;
        }
      }
    } else target = s.weaponIn(req) ? req : null;
    if (!target || target === s.activeSlot) return;
    this.switchTo(s, target);
  }

  switchTo(s: Soldier, slot: Slot): void {
    if (!s.weaponIn(slot)) return;
    if (s.activeSlot !== slot) s.lastSlot = s.activeSlot;
    s.activeSlot = slot;
    s.reloadEnd = 0;
    s.scope = 0;
    s.scopeRestoreAt = 0;
    s.recoilIndex = 0;
    s.drawStart = this.time;
    s.drawEnd = this.time + s.weapon.def.drawTime;
    if (s.planting) {
      s.planting = false;
      s.plantProgress = 0;
      this.events.emit({ type: 'plantAbort', soldier: s.id });
    }
    this.events.emit({ type: 'switch', soldier: s.id, weapon: s.weapon.def.id });
  }

  private startReload(s: Soldier): void {
    const w = s.weapon;
    const def = w.def;
    if (def.magSize <= 0 || s.reloadEnd > 0 || w.mag >= def.magSize || w.reserve <= 0) return;
    if (this.time < s.drawEnd) return;
    s.reloadStart = this.time;
    s.reloadEnd = this.time + def.reloadTime;
    if (s.scope > 0) s.scope = 0;
    s.scopeRestoreAt = 0;
    this.events.emit({ type: 'reload', soldier: s.id, weapon: def.id });
  }

  /** Current inaccuracy (radians) of the soldier's active weapon. */
  inaccuracy(s: Soldier): number {
    const def = s.weapon.def;
    const sp = def.spread;
    let base: number;
    if (def.scopeFovs) base = s.scope > 0 ? lerp(sp.stand, sp.crouch, s.crouchAmt) : sp.unscoped ?? sp.stand;
    else base = lerp(sp.stand, sp.crouch, s.crouchAmt);
    const moveFrac = clamp((s.speed / def.moveSpeed - 0.3) / 0.7, 0, 1);
    let total = base + sp.move * moveFrac;
    if (!s.onGround) total += sp.air;
    total += Math.min(sp.maxRecoil, sp.perShot * s.recoilIndex);
    return total * DEG;
  }

  private updateWeapon(s: Soldier, inp: ControlInput, dt: number, frozen: boolean): void {
    const w = s.weapon;
    const def = w.def;
    const now = this.time;
    const firing = now - s.lastShotTime < def.fireInterval * 1.6;
    const k = Math.exp(-(firing ? def.recoil.decayFiring : def.recoil.decayIdle) * dt);
    s.punchPitch *= k;
    s.punchYaw *= k;
    if (now - s.lastShotTime > Math.max(0.12, def.fireInterval * 1.2)) {
      s.recoilIndex = Math.max(0, s.recoilIndex - def.spread.recover * dt);
    }

    if (s.reloadEnd > 0 && now >= s.reloadEnd) {
      const take = Math.min(def.magSize - w.mag, w.reserve);
      w.mag += take;
      w.reserve -= take;
      s.reloadEnd = 0;
    }
    if (s.scopeRestoreAt > 0 && now >= s.scopeRestoreAt) {
      s.scopeRestoreAt = 0;
      if (def.scopeFovs && s.reloadEnd === 0 && w.mag > 0) s.scope = s.resumeScope;
    }

    if (inp.reload) this.startReload(s);

    const altPressed = inp.alt && !s.altHeldPrev;
    if (altPressed && def.scopeFovs && s.reloadEnd === 0 && now >= s.drawEnd) {
      s.scope = (s.scope + 1) % (def.scopeFovs.length + 1);
      s.scopeRestoreAt = 0;
      this.events.emit({ type: 'scope', soldier: s.id, level: s.scope });
    }

    if (frozen) return;
    const firePressed = inp.fire && !s.fireHeldPrev;

    if (def.slot === 'melee') {
      if (now < s.nextFireTime || now < s.drawEnd) return;
      if (inp.fire) this.meleeAttack(s, false);
      else if (inp.alt) this.meleeAttack(s, true);
      return;
    }
    if (def.slot === 'bomb') return;

    const wants = def.auto ? inp.fire : firePressed;
    if (wants && now >= s.nextFireTime && now >= s.drawEnd && s.reloadEnd === 0) {
      if (w.mag > 0) {
        this.fireBullet(s, w);
      } else {
        if (firePressed) this.events.emit({ type: 'dryfire', soldier: s.id });
        s.nextFireTime = now + 0.25;
        this.startReload(s);
      }
    }
    if (w.mag === 0 && w.reserve > 0 && s.reloadEnd === 0 && !inp.fire && now >= s.drawEnd) this.startReload(s);
  }

  private fireBullet(s: Soldier, w: WeaponInst): void {
    const def = w.def;
    const now = this.time;
    w.mag--;
    s.nextFireTime = now + def.fireInterval;
    s.lastShotTime = now;
    this.stats.shots++;

    const inacc = this.inaccuracy(s);
    const r = inacc * Math.sqrt(this.rng.next()) * (0.55 + 0.45 * this.rng.next());
    const th = this.rng.next() * Math.PI * 2;
    const yaw = s.yaw + s.punchYaw + (Math.cos(th) * r) / Math.max(0.2, Math.cos(s.pitch));
    const pitch = s.pitch + s.punchPitch + Math.sin(th) * r;
    const dir = forwardFromAngles(yaw, pitch, this.tmpDir);
    const origin = vec3(s.pos.x, s.eyeY, s.pos.z);
    this.traceBullet(s, origin, dir, def);

    // View punch (the camera visibly climbs; bullets follow the punched view).
    const rc = def.recoil;
    const idx = s.recoilIndex;
    s.punchPitch += (rc.pitch + rc.pitchGrowth * Math.min(idx, rc.growthShots)) * DEG;
    if (idx >= rc.yawStartShot) {
      s.punchYaw += (this.rng.range(-1, 1) * rc.yaw + Math.sin(idx * 0.85) * rc.yaw * 0.7) * DEG;
    }
    s.punchPitch = Math.min(s.punchPitch, rc.maxPitch * DEG);
    s.recoilIndex += 1;

    if (def.scopeFovs && s.scope > 0) {
      s.resumeScope = s.scope;
      s.scope = 0;
      s.scopeRestoreAt = now + def.fireInterval * 0.85;
    }
    this.notifyNoise(s, def.id === 'usp' ? 14 : 48);
  }

  private traceBullet(s: Soldier, origin: Vec3, dir: Vec3, def: WeaponDef): void {
    const maxD = def.range;
    let worldT = maxD;
    const hitWorld = this.world.raycast(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, maxD, this.rayHit);
    if (hitWorld) worldT = this.rayHit.t;
    let bestT = worldT;
    let victim: Soldier | null = null;
    let zone: HitZone = 'chest';
    for (const v of this.soldiers) {
      if (!v.alive || v.team === s.team) continue;
      const hit = raycastHitboxes(this.poseOf(v), origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, bestT, this.boxHit);
      if (hit && hit.t < bestT) {
        bestT = hit.t;
        victim = v;
        zone = hit.zone;
      }
    }
    const end = vec3(origin.x + dir.x * bestT, origin.y + dir.y * bestT, origin.z + dir.z * bestT);
    const normal = !victim && hitWorld ? vec3(this.rayHit.nx, this.rayHit.ny, this.rayHit.nz) : null;
    this.events.emit({
      type: 'shot',
      shooter: s.id,
      weapon: def.id,
      origin,
      end,
      hitWorld: !victim && hitWorld,
      normal,
      hitSoldier: victim ? victim.id : -1,
    });
    if (victim) {
      const dmg = def.damage * Math.pow(def.rangeMod, bestT / 10);
      this.applyDamage(victim, s, dmg, zone, def, end);
    }
  }

  poseOf(v: Soldier): HitboxPose {
    const p = this.pose;
    p.x = v.pos.x;
    p.y = v.pos.y;
    p.z = v.pos.z;
    p.yaw = v.yaw;
    p.crouch = v.crouchAmt;
    return p;
  }

  private meleeAttack(s: Soldier, stab: boolean): void {
    const m = WEAPONS.knife.melee!;
    const now = this.time;
    s.nextFireTime = now + (stab ? m.stabInterval : m.slashInterval);
    s.lastMeleeTime = now;
    s.lastMeleeStab = stab;
    const range = stab ? m.range * 0.85 : m.range;
    const origin = vec3(s.pos.x, s.eyeY, s.pos.z);
    let best: Soldier | null = null;
    let bestT = range;
    let point: Vec3 | null = null;
    for (const off of [0, -10, 10, -20, 20]) {
      const dir = forwardFromAngles(s.yaw + off * DEG, s.pitch, this.tmpDir);
      let maxD = range;
      if (this.world.raycast(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, range, this.rayHit)) maxD = this.rayHit.t;
      for (const v of this.soldiers) {
        if (!v.alive || v.team === s.team) continue;
        const hit = raycastHitboxes(this.poseOf(v), origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, Math.min(maxD, bestT), this.boxHit);
        if (hit && hit.t < bestT) {
          best = v;
          bestT = hit.t;
          point = vec3(origin.x + dir.x * hit.t, origin.y + dir.y * hit.t, origin.z + dir.z * hit.t);
        }
      }
      if (best) break;
    }
    let hitWorld = false;
    if (!best) {
      const dir = forwardFromAngles(s.yaw, s.pitch, this.tmpDir);
      hitWorld = this.world.raycast(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, range, this.rayHit);
      if (hitWorld) point = vec3(origin.x + dir.x * this.rayHit.t, origin.y + dir.y * this.rayHit.t, origin.z + dir.z * this.rayHit.t);
    }
    this.events.emit({ type: 'melee', attacker: s.id, stab, hitSoldier: best ? best.id : -1, hitWorld, point });
    if (best && point) {
      // Backstab: attacker is behind the victim.
      const vf = forwardFromAngles(best.yaw, 0);
      const dx = best.pos.x - s.pos.x;
      const dz = best.pos.z - s.pos.z;
      const dl = Math.hypot(dx, dz) || 1;
      const back = (vf.x * dx + vf.z * dz) / dl > 0.5;
      const dmg = stab ? (back ? 180 : m.stabDamage) : back ? 90 : m.slashDamage;
      this.applyDamage(best, s, dmg, 'chest', WEAPONS.knife, point);
    }
  }

  private applyDamage(victim: Soldier, attacker: Soldier, raw: number, zone: HitZone, def: WeaponDef, point: Vec3): void {
    if (!victim.alive) return;
    const res = computeDamage(raw, zone, def.armorPen, victim.armor, victim.helmet);
    victim.armor = Math.max(0, victim.armor - res.armor);
    const amount = Math.min(victim.health, res.health);
    victim.health -= res.health;
    victim.lastHurtTime = this.time;
    victim.lastAttackerId = attacker.id;
    copyV(victim.lastHurtFrom, attacker.pos);
    attacker.damageDealt += amount;
    // Tagging: getting shot slows you down.
    victim.vel.x *= 0.55;
    victim.vel.z *= 0.55;
    this.events.emit({
      type: 'damage',
      victim: victim.id,
      attacker: attacker.id,
      amount,
      zone,
      point: cloneV(point),
      helmetHit: zone === 'head' && res.armored,
      weapon: def.id,
    });
    const brain = this.brains.get(victim.id);
    if (brain && victim.id !== this.controlledId) brain.onDamaged(attacker);
    if (victim.health <= 0) this.killSoldier(victim, attacker, def.id, zone === 'head');
  }

  private hurtWorld(s: Soldier, amount: number): void {
    if (!s.alive || amount <= 0) return;
    s.health -= amount;
    s.lastHurtTime = this.time;
    this.events.emit({ type: 'damage', victim: s.id, attacker: -1, amount, zone: 'leg', point: cloneV(s.pos), helmetHit: false, weapon: 'knife' });
    if (s.health <= 0) this.killSoldier(s, null, 'world', false);
  }

  private killSoldier(victim: Soldier, killer: Soldier | null, weapon: WeaponId | 'world', headshot: boolean): void {
    victim.alive = false;
    victim.health = 0;
    victim.deathTime = this.time;
    victim.killerId = killer ? killer.id : -1;
    victim.deaths++;
    victim.planting = false;
    victim.defusing = false;
    victim.scope = 0;
    if (this.bomb.defuserId === victim.id) this.bomb.defuserId = -1;
    if (killer && killer.team !== victim.team) {
      killer.kills++;
      killer.roundKills++;
    }
    this.stats.kills++;

    // Drop the best gun and the bomb.
    const gun = victim.primary ?? victim.secondary;
    if (gun) {
      this.spawnItem(gun, victim, 1.2);
      if (gun === victim.primary) victim.primary = null;
      else victim.secondary = null;
    }
    if (victim.hasBomb) this.dropBomb(victim);

    const involves = victim.id === this.humanId || (killer !== null && killer.id === this.humanId) || victim.id === this.controlledId || (killer !== null && killer.id === this.controlledId);
    this.killfeed.push({
      id: this.nextId++,
      time: this.time,
      killer: killer ? killer.name : null,
      killerTeam: killer ? killer.team : null,
      victim: victim.name,
      victimTeam: victim.team,
      weapon: weapon === 'world' ? '坠落' : WEAPONS[weapon].icon,
      headshot,
      involvesHuman: involves,
    });
    if (this.killfeed.length > 12) this.killfeed.shift();
    this.events.emit({ type: 'kill', killer: killer ? killer.id : -1, victim: victim.id, weapon, headshot });
  }

  /** Soft circle separation so soldiers don't overlap (resolved through the collision world). */
  private separateSoldiers(): void {
    const list = this.soldiers;
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (!b.alive) continue;
        if (Math.abs(a.pos.y - b.pos.y) > 1.6) continue;
        const dx = b.pos.x - a.pos.x;
        const dz = b.pos.z - a.pos.z;
        const d2 = dx * dx + dz * dz;
        const minD = a.radius + b.radius + 0.05;
        if (d2 >= minD * minD) continue;
        let d = Math.sqrt(d2);
        let nx = dx;
        let nz = dz;
        if (d < 1e-4) {
          nx = Math.cos(a.id * 1.7);
          nz = Math.sin(a.id * 1.7);
          d = 1;
        } else {
          nx /= d;
          nz /= d;
        }
        const push = (minD - (d2 < 1e-8 ? 0 : d)) * 0.5;
        this.nudge(a, -nx * push, -nz * push);
        this.nudge(b, nx * push, nz * push);
      }
    }
  }

  private nudge(s: Soldier, dx: number, dz: number): void {
    // Re-use the collision sweep so pushes can never move a soldier into a wall.
    this.world.slide(s, dx, dz);
  }

  // ───────────────────────────── items ─────────────────────────────

  private spawnItem(weapon: WeaponInst, from: Soldier, speed: number): void {
    const f = forwardFromAngles(from.yaw, 0);
    this.items.push({
      id: this.nextId++,
      weapon,
      pos: vec3(from.pos.x, from.pos.y + 1.1, from.pos.z),
      vel: vec3(f.x * speed + from.vel.x * 0.5, 1.5, f.z * speed + from.vel.z * 0.5),
      yaw: from.yaw + this.rng.range(-0.6, 0.6),
      dropTime: this.time,
      droppedBy: from.id,
      onGround: false,
    });
  }

  private dropActive(s: Soldier): void {
    if (s.activeSlot === 'bomb' && s.hasBomb) {
      this.dropBomb(s);
      this.switchTo(s, s.bestSlot());
      return;
    }
    if (s.activeSlot === 'primary' && s.primary) {
      this.spawnItem(s.primary, s, 3.5);
      s.primary = null;
    } else if (s.activeSlot === 'secondary' && s.secondary) {
      this.spawnItem(s.secondary, s, 3.5);
      s.secondary = null;
    } else return;
    this.switchTo(s, s.bestSlot());
  }

  private dropBomb(s: Soldier): void {
    s.hasBomb = false;
    s.planting = false;
    const f = forwardFromAngles(s.yaw, 0);
    const alive = s.alive;
    this.bomb.state = 'dropped';
    this.bomb.carrierId = -1;
    this.bomb.pos = vec3(s.pos.x, s.pos.y + (alive ? 1.1 : 0.6), s.pos.z);
    this.bomb.vel = vec3(alive ? f.x * 3 : 0, alive ? 1.5 : 0, alive ? f.z * 3 : 0);
    this.bomb.dropTime = this.time;
    this.bomb.droppedBy = s.id;
    this.events.emit({ type: 'bombDropped', pos: cloneV(this.bomb.pos) });
  }

  private settleItem(pos: Vec3, vel: Vec3, dt: number): boolean {
    vel.y -= GRAVITY * dt;
    const nx = pos.x + vel.x * dt;
    const nz = pos.z + vel.z * dt;
    if (!this.world.isBlocked(nx, nz, 0.15, pos.y, 0.3, 0.05)) {
      pos.x = nx;
      pos.z = nz;
    } else {
      vel.x = 0;
      vel.z = 0;
    }
    const support = this.world.supportHeight(pos.x, pos.z, 0.12, pos.y + 0.2);
    const ny = pos.y + vel.y * dt;
    if (ny <= support) {
      pos.y = support === -Infinity ? 0 : support;
      vel.x = vel.y = vel.z = 0;
      return true;
    }
    pos.y = ny;
    vel.x *= 0.995;
    vel.z *= 0.995;
    return false;
  }

  private updateItems(dt: number): void {
    for (const it of this.items) {
      if (!it.onGround) it.onGround = this.settleItem(it.pos, it.vel, dt);
    }
    // Auto-pickup of weapons into empty slots.
    for (const s of this.soldiers) {
      if (!s.alive) continue;
      for (let i = 0; i < this.items.length; i++) {
        const it = this.items[i];
        if (it.droppedBy === s.id && this.time - it.dropTime < 1.5) continue;
        if (dist2D(s.pos.x, s.pos.z, it.pos.x, it.pos.z) > 0.9 || Math.abs(s.pos.y - it.pos.y) > 1.5) continue;
        const slot = it.weapon.def.slot;
        if (slot === 'primary' && !s.primary) s.primary = it.weapon;
        else if (slot === 'secondary' && !s.secondary) s.secondary = it.weapon;
        else continue;
        this.items.splice(i, 1);
        i--;
        this.events.emit({ type: 'itemPickup', soldier: s.id, weapon: it.weapon.def.id });
        if (s.activeSlot === 'melee' || (slot === 'primary' && s.activeSlot === 'secondary' && s.id !== this.controlledId)) this.switchTo(s, slot);
      }
    }
  }

  /** E near a dropped weapon swaps it with the one in the same slot. */
  private tryUsePickup(s: Soldier): void {
    let best: DroppedWeapon | null = null;
    let bestD = 2.0;
    const f = forwardFromAngles(s.yaw, 0);
    for (const it of this.items) {
      const dx = it.pos.x - s.pos.x;
      const dz = it.pos.z - s.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > bestD || Math.abs(it.pos.y - s.pos.y) > 1.5) continue;
      if (d > 0.6 && (dx * f.x + dz * f.z) / d < 0.3) continue;
      best = it;
      bestD = d;
    }
    if (!best) return;
    const slot = best.weapon.def.slot;
    const current = slot === 'primary' ? s.primary : s.secondary;
    if (current) this.spawnItem(current, s, 2);
    if (slot === 'primary') s.primary = best.weapon;
    else s.secondary = best.weapon;
    this.items = this.items.filter((i) => i !== best);
    this.events.emit({ type: 'itemPickup', soldier: s.id, weapon: best.weapon.def.id });
    this.switchTo(s, slot);
  }

  /** Free buy menu (no economy in this prototype); only during buy time. */
  buy(s: Soldier, weapon: WeaponId): boolean {
    if (!this.canBuy(s)) return false;
    if (!ROUND_PRESETS[this.roundType].buyable.includes(weapon)) return false;
    const inst = makeWeapon(weapon);
    if (inst.def.slot === 'primary') s.primary = inst;
    else if (inst.def.slot === 'secondary') s.secondary = inst;
    else return false;
    this.switchTo(s, inst.def.slot);
    this.events.emit({ type: 'itemPickup', soldier: s.id, weapon });
    return true;
  }

  // ───────────────────────────── bomb ─────────────────────────────

  private updatePlant(s: Soldier, inp: ControlInput, dt: number): void {
    if (s.activeSlot !== 'bomb' || !s.hasBomb) {
      if (s.planting) {
        s.planting = false;
        s.plantProgress = 0;
      }
      return;
    }
    const can = this.phase === 'live' && s.onGround && this.time >= s.drawEnd && this.siteAt(s.pos) !== null;
    if (inp.fire && can) {
      if (!s.planting) {
        s.planting = true;
        s.plantProgress = 0;
        this.events.emit({ type: 'plantStart', soldier: s.id });
      }
      s.plantProgress += dt;
      if (s.plantProgress >= PLANT_TIME) this.plantBomb(s);
    } else if (s.planting) {
      s.planting = false;
      s.plantProgress = 0;
      this.events.emit({ type: 'plantAbort', soldier: s.id });
    }
  }

  private plantBomb(s: Soldier): void {
    const site = this.siteAt(s.pos) as SiteId;
    s.planting = false;
    s.plantProgress = 0;
    s.hasBomb = false;
    const f = forwardFromAngles(s.yaw, 0);
    const px = s.pos.x + f.x * 0.45;
    const pz = s.pos.z + f.z * 0.45;
    const support = this.world.supportHeight(px, pz, 0.1, s.pos.y + 0.3);
    this.bomb = {
      ...this.bomb,
      state: 'planted',
      carrierId: -1,
      pos: vec3(px, support === -Infinity ? s.pos.y : support, pz),
      site,
      plantedAt: this.time,
      explodeAt: this.time + BOMB_TIME,
      defuserId: -1,
      nextBeep: this.time + 1,
    };
    this.stats.plants++;
    this.switchTo(s, s.bestSlot());
    this.announce('炸弹已安放', `${site} 点 · ${BOMB_TIME} 秒后爆炸`, 'danger', 3);
    this.events.emit({ type: 'bombPlanted', soldier: s.id, site, pos: cloneV(this.bomb.pos) });
    this.notifyNoise(s, 60);
  }

  private updateDefuse(s: Soldier, inp: ControlInput, dt: number): void {
    const b = this.bomb;
    if (s.team !== 'CT' || b.state !== 'planted' || this.phase !== 'live') {
      if (s.defusing) {
        s.defusing = false;
        s.defuseProgress = 0;
      }
      return;
    }
    const near = dist2D(s.pos.x, s.pos.z, b.pos.x, b.pos.z) < 1.7 && Math.abs(s.pos.y - b.pos.y) < 1.6;
    if (inp.use && near && s.onGround && (b.defuserId === -1 || b.defuserId === s.id)) {
      if (!s.defusing) {
        s.defusing = true;
        s.defuseProgress = 0;
        b.defuserId = s.id;
        if (s.scope > 0) s.scope = 0;
        this.events.emit({ type: 'defuseStart', soldier: s.id, kit: s.hasKit });
      }
      s.defuseProgress += dt;
      if (s.defuseProgress >= (s.hasKit ? DEFUSE_TIME_KIT : DEFUSE_TIME)) {
        s.defusing = false;
        b.state = 'defused';
        b.defuserId = -1;
        this.stats.defuses++;
        this.events.emit({ type: 'bombDefused', soldier: s.id });
      }
    } else if (s.defusing) {
      s.defusing = false;
      s.defuseProgress = 0;
      if (b.defuserId === s.id) b.defuserId = -1;
      this.events.emit({ type: 'defuseAbort', soldier: s.id });
    }
  }

  defuseDuration(s: Soldier): number {
    return s.hasKit ? DEFUSE_TIME_KIT : DEFUSE_TIME;
  }

  private updateBomb(dt: number): void {
    const b = this.bomb;
    if (b.state === 'carried') {
      const c = this.soldiers[b.carrierId];
      if (c) copyV(b.pos, c.pos);
    } else if (b.state === 'dropped') {
      this.settleItem(b.pos, b.vel, dt);
      for (const s of this.soldiers) {
        if (!s.alive || s.team !== 'T') continue;
        if (b.droppedBy === s.id && this.time - b.dropTime < 1.5) continue;
        if (dist2D(s.pos.x, s.pos.z, b.pos.x, b.pos.z) < 1.0 && Math.abs(s.pos.y - b.pos.y) < 1.6) {
          s.hasBomb = true;
          b.state = 'carried';
          b.carrierId = s.id;
          this.events.emit({ type: 'bombPickup', soldier: s.id });
          break;
        }
      }
    } else if (b.state === 'planted') {
      const left = b.explodeAt - this.time;
      if (this.time >= b.nextBeep) {
        const u = 1 - clamp(left / BOMB_TIME, 0, 1);
        this.events.emit({ type: 'bombBeep', pos: cloneV(b.pos), urgency: u });
        b.nextBeep = this.time + lerp(1.0, 0.12, Math.pow(u, 1.6));
      }
      if (left <= 0) this.explode();
    }
  }

  private explode(): void {
    const b = this.bomb;
    b.state = 'exploded';
    this.stats.explosions++;
    this.events.emit({ type: 'bombExploded', pos: cloneV(b.pos) });
    for (const s of this.soldiers) {
      if (!s.alive) continue;
      const dx = s.pos.x - b.pos.x;
      const dy = s.pos.y + 1 - b.pos.y;
      const dz = s.pos.z - b.pos.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const dmg = Math.round(260 * Math.pow(Math.max(0, 1 - d / 22), 1.6));
      if (dmg <= 0) continue;
      const armorAbsorb = s.armor > 0 ? Math.min(s.armor, dmg * 0.25) : 0;
      s.armor = Math.max(0, s.armor - armorAbsorb);
      s.health -= dmg - Math.round(armorAbsorb * 0.5);
      s.lastHurtTime = this.time;
      copyV(s.lastHurtFrom, b.pos);
      this.events.emit({ type: 'damage', victim: s.id, attacker: -1, amount: dmg, zone: 'chest', point: cloneV(s.pos), helmetHit: false, weapon: 'c4' });
      if (s.health <= 0) this.killSoldier(s, null, 'c4', false);
    }
  }

  private checkRoundEnd(): void {
    if (this.phase !== 'live') return;
    const b = this.bomb;
    const aliveT = this.aliveCount('T');
    const aliveCT = this.aliveCount('CT');
    if (b.state === 'exploded') this.endRound('T', '目标已被摧毁（C4 爆炸）');
    else if (b.state === 'defused') this.endRound('CT', '炸弹已被拆除');
    else if (aliveCT === 0) this.endRound('T', '反恐精英已全部阵亡');
    else if (aliveT === 0 && b.state !== 'planted') this.endRound('CT', '恐怖分子已全部阵亡');
    else if (b.state !== 'planted' && this.time >= this.roundEndsAt) this.endRound('CT', '时间耗尽 · 目标得到保护');
  }

  // ───────────────────────────── perception ─────────────────────────────

  private perceive(): void {
    const now = this.time;
    for (const a of this.soldiers) a.visibleEnemies.length = 0;
    for (const a of this.soldiers) {
      if (!a.alive) continue;
      const fovHalf = (a.id === this.controlledId ? 58 : this.brains.get(a.id)!.skill.fovHalf) * DEG;
      for (const b of this.soldiers) {
        if (!b.alive || b.team === a.team) continue;
        if (this.canSee(a, b, fovHalf)) {
          a.visibleEnemies.push(b.id);
          b.spottedUntil[a.team] = now + 0.35;
          const known = this.intel[a.team].get(b.id);
          if (known) {
            copyV(known.pos, b.pos);
            known.time = now;
          } else this.intel[a.team].set(b.id, { pos: cloneV(b.pos), time: now });
        }
      }
    }
  }

  canSee(a: Soldier, b: Soldier, fovHalf: number): boolean {
    const dx = b.pos.x - a.pos.x;
    const dz = b.pos.z - a.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > 95) return false;
    if (d > 2.5 && Math.abs(angleDelta(a.yaw, yawTowards(dx, dz))) > fovHalf) return false;
    const ey = a.eyeY;
    if (this.world.lineOfSight(a.pos.x, ey, a.pos.z, b.pos.x, b.eyeY + 0.05, b.pos.z)) return true;
    return this.world.lineOfSight(a.pos.x, ey, a.pos.z, b.pos.x, b.pos.y + b.height * 0.62, b.pos.z);
  }

  private notifyNoise(src: Soldier, radius: number): void {
    for (const s of this.soldiers) {
      if (!s.alive || s.team === src.team || s.id === this.controlledId) continue;
      const d = dist2D(s.pos.x, s.pos.z, src.pos.x, src.pos.z);
      if (d > radius) continue;
      this.brains.get(s.id)?.onHeard(src.pos);
    }
  }

  // ───────────────────────────── spectator / takeover ─────────────────────────────

  private updateSpectator(): void {
    const flags = this.humanFlags;
    const ctl = this.controlled;
    if (!ctl || ctl.alive) {
      this.spectateId = -1;
      return;
    }
    if (this.time - ctl.deathTime < 1.8) {
      this.spectateId = -1;
      return;
    }
    if (this.spectateId < 0 || !this.soldiers[this.spectateId].alive) this.spectateId = this.nextSpectateTarget(this.spectateId, 1);
    if (flags.specNext) this.spectateId = this.nextSpectateTarget(this.spectateId, 1);
    if (flags.specPrev) this.spectateId = this.nextSpectateTarget(this.spectateId, -1);
    if (flags.takeOver) this.takeOver();
  }

  private nextSpectateTarget(current: number, dir: number): number {
    const team = this.human?.team ?? 'CT';
    let candidates = this.soldiers.filter((s) => s.alive && s.team === team);
    if (candidates.length === 0) candidates = this.soldiers.filter((s) => s.alive);
    if (candidates.length === 0) return -1;
    const idx = candidates.findIndex((s) => s.id === current);
    if (idx < 0) return candidates[0].id;
    return candidates[(idx + dir + candidates.length) % candidates.length].id;
  }

  canTakeOver(): boolean {
    const human = this.human;
    if (!human || this.spectateId < 0) return false;
    const t = this.soldiers[this.spectateId];
    return t.alive && t.team === human.team && this.phase !== 'over';
  }

  private takeOver(): void {
    if (!this.canTakeOver()) return;
    const t = this.soldiers[this.spectateId];
    this.controlledId = t.id;
    this.spectateId = -1;
    t.planting = false;
    t.defusing = false;
    t.plantProgress = 0;
    t.defuseProgress = 0;
    this.brains.get(t.id)?.resetForRound();
    this.events.emit({ type: 'controlChanged', soldier: t.id });
  }

  /** Camera subject: the controlled soldier if alive, otherwise the spectated one. */
  get viewSoldier(): Soldier | null {
    const c = this.controlled;
    if (c && c.alive) return c;
    if (this.spectateId >= 0) return this.soldiers[this.spectateId];
    return null;
  }
}

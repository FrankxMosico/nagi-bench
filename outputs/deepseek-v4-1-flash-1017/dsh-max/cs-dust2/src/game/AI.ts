import {
  getPlantSiteAt,
} from '../data/mapLayout';
import { WEAPONS } from '../data/weapons';
import type { Combatant } from './Combatant';
import type { NavGrid } from './NavGrid';
import type { PhysicsWorld } from './PhysicsWorld';
import { clamp, normalizeAngle } from './PhysicsWorld';
import type { BombStatus, BotState } from './types';

export interface BotBombView {
  status: BombStatus;
  x: number;
  z: number;
  carrierId: number | null;
  plantedSite: 'A' | 'B' | null;
  action: { actorId: number; type: 'plant' | 'defuse' } | null;
}

export interface BotWorld {
  agents: Combatant[];
  nav: NavGrid;
  physics: PhysicsWorld;
  roundNumber: number;
  attackSite: 'A' | 'B';
  bombView: BotBombView;
  lineOfSight(bot: Combatant, target: Combatant): boolean;
  fireBot(bot: Combatant, target: Combatant): boolean;
  requestPlant(bot: Combatant): boolean;
  requestDefuse(bot: Combatant): boolean;
  cancelBombAction(bot: Combatant): void;
  onBotReload(bot: Combatant): void;
  onBotInteractionStart(bot: Combatant, kind: 'plant' | 'defuse'): void;
  getSiteCenter(site: 'A' | 'B'): { x: number; z: number };
}

interface Point {
  x: number;
  z: number;
}

const A_HOLDS: Point[] = [
  { x: -31, z: 29 },
  { x: -40, z: 35 },
  { x: -29, z: 47 },
  { x: -46, z: 44 },
  { x: -24, z: 37 },
];
const B_HOLDS: Point[] = [
  { x: -37, z: -34 },
  { x: -44, z: -42 },
  { x: -31, z: -49 },
  { x: -24, z: -39 },
  { x: -46, z: -33 },
];
const MID_HOLDS: Point[] = [
  { x: 6, z: 8 },
  { x: -8, z: -5 },
  { x: -11, z: 29 },
  { x: 6, z: 22 },
];
const A_ATTACK_STAGING: Point[] = [
  { x: -24, z: 51 },
  { x: -16, z: 30 },
  { x: -28, z: 35 },
  { x: -14, z: 53 },
  { x: -29, z: 46 },
];
const B_ATTACK_STAGING: Point[] = [
  { x: -22, z: -40 },
  { x: -18, z: -33 },
  { x: -28, z: -47 },
  { x: -26, z: -35 },
  { x: -40, z: -42 },
];

type Role = 'A' | 'B' | 'MID';

/**
 * Utility-style tactical bot:
 * - A* navigation across the lane graph
 * - FOV + wall occlusion target acquisition
 * - ranged combat with reaction times, bursts and inaccuracy
 * - objective routines for planting, retrieving, defending and defusing C4
 */
export class BotController {
  readonly agent: Combatant;
  private readonly world: BotWorld;
  state: BotState = 'idle';
  private role: Role = 'MID';
  private target: Combatant | null = null;
  private targetLastSeen = -99;
  private lastSeenPos: Point | null = null;
  private lastKnownTargetId: number | null = null;
  private alertedUntil = 0;
  private reactionUntil = 0;
  private nextPerceptionAt = 0;
  private nextFireCheck = 0;
  private burstShots = 0;
  private burstSize = 4;
  private burstPauseUntil = 0;
  private path: Point[] = [];
  private pathIndex = 0;
  private goal: Point | null = null;
  private goalSetAt = -99;
  private repathAt = 0;
  private holdUntil = 0;
  private holdPoint: Point | null = null;
  private lastPos = { x: 0, z: 0 };
  private stuckTime = 0;
  private lastSpeed = 0;
  private decideAt = 0;
  private interactionBusy = false;
  private strafeUntil = 0;
  private strafeDir = 0;
  private nextStrafeAt = 0;
  private footstepPhase = Math.random() * Math.PI * 2;

  constructor(agent: Combatant, world: BotWorld) {
    this.agent = agent;
    this.world = world;
    this.lastPos.x = agent.position.x;
    this.lastPos.z = agent.position.z;
    this.assignRole();
    this.decideAt = Math.random() * 0.3;
  }

  private assignRole(): void {
    if (this.agent.team === 'CT') {
      const i = this.agent.ownerIndex;
      this.role = i === 1 || i === 4 ? 'B' : i === 2 ? 'MID' : 'A';
    } else {
      this.role = 'A';
    }
  }

  onDamaged(attacker: Combatant | null, now: number): void {
    if (!this.agent.alive) return;
    if (attacker && attacker.alive) {
      this.target = attacker;
      this.lastKnownTargetId = attacker.id;
      this.lastSeenPos = { x: attacker.position.x, z: attacker.position.z };
      this.targetLastSeen = now - 0.25;
      this.alertedUntil = now + 5;
      this.reactionUntil = now + 0.12;
    }
  }

  onHeardGunshot(source: Combatant, sourcePosition: Point, now: number): void {
    if (!this.agent.alive) return;
    if (source.team === this.agent.team) return;
    const d = Math.hypot(sourcePosition.x - this.agent.position.x, sourcePosition.z - this.agent.position.z);
    if (d > 32) return;
    if (this.target && this.target.alive) return;
    this.lastSeenPos = { x: sourcePosition.x, z: sourcePosition.z };
    this.lastKnownTargetId = source.id;
    this.alertedUntil = now + 4;
    if (!this.target) {
      this.target = source;
      this.targetLastSeen = Math.max(this.targetLastSeen, now - 2.5);
      this.reactionUntil = now + 0.25;
    }
    if (this.state === 'advance' || this.state === 'hold') {
      this.state = 'advance';
      this.forceGoal(sourcePosition.x, sourcePosition.z, now);
    }
  }

  onTeammateKilled(position: Point, now: number): void {
    if (!this.agent.alive) return;
    if (!this.target) {
      this.lastSeenPos = { x: position.x, z: position.z };
      this.alertedUntil = now + 3;
      this.reactionUntil = now + 0.3;
    }
  }

  update(now: number, dt: number): void {
    if (!this.agent.alive) {
      this.state = 'dead';
      this.agent.speed = 0;
      return;
    }
    const agent = this.agent;
    const weapon = agent.activeWeapon;

    // Reload logic is owned by the shared combatant weapon timers.
    if (weapon.ammo <= 0) {
      if (!weapon.reloading && weapon.reserve > 0) {
        if (agent.startReload(now)) this.world.onBotReload(agent);
      } else if (weapon.reserve <= 0) {
        agent.chooseBestWeapon(now);
      }
    } else if (agent.primary && agent.activeSlot === 'primary' && weapon.ammo === 0 && weapon.reserve === 0) {
      agent.switchWeapon('secondary');
    }

    const action = this.world.bombView.action;
    if (action && action.actorId === agent.id) {
      agent.speed = 0;
      this.path.length = 0;
      this.goal = null;
      this.state = action.type === 'plant' ? 'planting' : 'defusing';
      // Turn toward likely danger / the device while the channel ticks.
      this.turnToAngle(this.world.bombView.plantedSite ? Math.atan2(
        -(this.world.bombView.x - agent.position.x),
        -(this.world.bombView.z - agent.position.z),
      ) : agent.yaw, dt, 3);
      return;
    }

    if (now >= this.nextPerceptionAt) {
      this.nextPerceptionAt = now + 0.1 + Math.random() * 0.08;
      this.acquireTarget(now);
    }

    const target = this.target;
    const recentlySeen = target && now - this.targetLastSeen < 4.8;
    if (target && !target.alive) {
      this.target = null;
      this.lastSeenPos = null;
    }

    if (agent.team === 'CT' && this.world.bombView.status === 'planted') {
      this.updateCTDefusePriority(now, dt);
      return;
    }

    if (target && target.alive && recentlySeen) {
      const visible = now - this.targetLastSeen < 0.24 || this.world.lineOfSight(agent, target);
      if (visible) {
        this.targetLastSeen = now;
        this.lastSeenPos = { x: target.position.x, z: target.position.z };
      }
      this.state = 'combat';
      this.combat(now, dt, visible);
      if (visible) {
        // Bots stop to shoot for readable, stable firefights.
        agent.speed = 0;
        this.path.length = 0;
        this.goal = null;
        return;
      }
      if (now - this.targetLastSeen < 3.2 && this.lastSeenPos) {
        this.advanceTo(this.lastSeenPos, now, 1.0, dt);
        return;
      }
    }

    if (target && !target.alive) this.target = null;
    if (this.world.bombView.action && this.world.bombView.action.actorId !== agent.id) {
      // Another bot owns the C4 interaction; guard the area.
      this.state = agent.team === 'CT' ? 'hold' : 'hold';
    }

    if (agent.team === 'T') {
      this.updateTObjective(now, dt);
    } else {
      this.updateCTObjective(now, dt);
    }
  }

  private acquireTarget(now: number): void {
    const agent = this.agent;
    const enemies = this.world.agents.filter((a) => a.alive && a.team !== agent.team);
    let best: Combatant | null = null;
    let bestScore = Number.POSITIVE_INFINITY;
    const eye = agent.eyePosition;
    const forwardX = -Math.sin(agent.yaw);
    const forwardZ = -Math.cos(agent.yaw);
    const agitated = now < this.alertedUntil || Boolean(this.target && now - this.targetLastSeen < 1.0);
    const fovDot = agitated ? -0.55 : 0.18;

    for (const enemy of enemies) {
      const dx = enemy.position.x - agent.position.x;
      const dz = enemy.position.z - agent.position.z;
      const distance = Math.hypot(dx, dz);
      if (distance > 72) continue;
      if (distance > 1.2) {
        const dot = (dx * forwardX + dz * forwardZ) / distance;
        if (dot < fovDot) continue;
      }
      if (!this.world.lineOfSight(agent, enemy)) continue;
      let score = distance;
      if (this.target && this.target.id === enemy.id) score -= 5;
      if (enemy === this.target) score -= 2;
      if (score < bestScore) {
        bestScore = score;
        best = enemy;
      }
    }
    if (best) {
      if (this.target !== best) {
        this.reactionUntil = now + 0.26 + Math.random() * 0.28;
        this.reactionUntil += best.team === 'CT' ? 0.03 : 0;
      }
      this.target = best;
      this.targetLastSeen = now;
      this.lastSeenPos = { x: best.position.x, z: best.position.z };
      this.lastKnownTargetId = best.id;
    } else if (this.target && now - this.targetLastSeen > 4.8) {
      this.target = null;
      this.lastSeenPos = null;
      this.lastKnownTargetId = null;
    }
  }

  private combat(now: number, dt: number, visible: boolean): void {
    const target = this.target;
    if (!target || !target.alive) return;
    const agent = this.agent;
    const eye = agent.eyePosition;
    const targetPos = target.chestPosition;
    const dx = targetPos.x - eye.x;
    const dy = targetPos.y - eye.y;
    const dz = targetPos.z - eye.z;
    const horiz = Math.hypot(dx, dz);
    const desiredYaw = Math.atan2(-dx, -dz);
    const desiredPitch = Math.atan2(dy, Math.max(0.1, horiz));
    const turnSpeed = agent.activeWeapon.id === 'awp' ? 4.2 : 6.5;
    this.turnToAngle(desiredYaw, dt, turnSpeed);
    agent.pitch = clamp(
      agent.pitch + clamp(desiredPitch - agent.pitch, -turnSpeed * 0.75 * dt, turnSpeed * 0.75 * dt),
      -1.2,
      1.2,
    );
    if (!visible || now < this.reactionUntil) return;
    const yawError = Math.abs(normalizeAngle(desiredYaw - agent.yaw));
    const pitchError = Math.abs(desiredPitch - agent.pitch);
    if (yawError > 0.12 || pitchError > 0.1) return;

    if (now < this.burstPauseUntil) return;
    const weapon = agent.activeWeapon;
    const def = WEAPONS[weapon.id];
    if (weapon.id === 'knife') {
      // Bots only knife if the target is literally on top of them.
      if (horiz < 2.3 && now >= this.nextFireCheck) {
        if (this.world.fireBot(agent, target)) this.nextFireCheck = now + def.fireInterval;
      }
      return;
    }
    if (weapon.reloading || weapon.ammo <= 0) return;
    if (now < this.nextFireCheck) return;
    if (weapon.nextFireAt > now) return;
    if (agent.pitch < -1.1 || agent.pitch > 1.1) return;
    if (this.world.fireBot(agent, target)) {
      this.nextFireCheck = now + def.fireInterval;
      if (!def.automatic) {
        this.nextFireCheck += 0.06;
        return;
      }
      this.burstShots++;
      if (this.burstShots >= this.burstSize) {
        this.burstShots = 0;
        this.burstSize = 3 + Math.floor(Math.random() * 5);
        this.burstPauseUntil = now + 0.22 + Math.random() * 0.42;
      }
    }
  }

  private updateCTDefusePriority(now: number, dt: number): void {
    const agent = this.agent;
    const bomb = this.world.bombView;
    const distanceToBomb = Math.hypot(agent.position.x - bomb.x, agent.position.z - bomb.z);
    const target = this.target;
    const targetVisible = Boolean(
      target && target.alive && (now - this.targetLastSeen < 0.24 || this.world.lineOfSight(agent, target)),
    );
    const targetDistance = target
      ? Math.hypot(target.position.x - agent.position.x, target.position.z - agent.position.z)
      : Infinity;

    // At the device: clear immediate threats, then stick the defuse.
    if (distanceToBomb < 1.5) {
      agent.speed = 0;
      this.path.length = 0;
      this.goal = null;
      if (target && targetVisible && targetDistance < 10) {
        this.state = 'combat';
        this.combat(now, dt, true);
        return;
      }
      if (this.world.bombView.action && this.world.bombView.action.actorId !== agent.id) {
        this.state = 'hold';
        this.turnToAngle(
          Math.atan2(-(bomb.x - agent.position.x), -(bomb.z - agent.position.z)),
          dt,
          3,
        );
        return;
      }
      this.state = 'defusing';
      if (this.world.requestDefuse(agent)) {
        this.world.onBotInteractionStart(agent, 'defuse');
      }
      return;
    }

    // Mid-range threats are handled before continuing the retake; long-range
    // duels are ignored so the defuse attempt actually happens.
    if (target && targetVisible && targetDistance < 10) {
      this.state = 'combat';
      this.combat(now, dt, true);
      return;
    }
    this.state = 'defusing';
    this.advanceTo({ x: bomb.x, z: bomb.z }, now, 1.1, dt);
  }

  private updateTObjective(now: number, dt: number): void {
    const agent = this.agent;
    const bomb = this.world.bombView;
    const site = this.world.attackSite;
    if (bomb.status === 'planted') {
      if (!this.target) {
        this.defendPlantedBomb(now, dt);
      }
      return;
    }
    if (bomb.status === 'dropped') {
      // Only the closest living T bot needs to retrieve; the others continue
      // to apply pressure. Game auto-picks the bomb when anyone gets close.
      this.state = 'pickup';
      this.advanceTo({ x: bomb.x, z: bomb.z }, now, 1.0, dt);
      return;
    }
    if (bomb.carrierId === agent.id) {
      const plantSite = getPlantSiteAt(agent.position.x, agent.position.z);
      if (plantSite) {
        this.state = 'planting';
        agent.speed = 0;
        this.path.length = 0;
        if (this.world.requestPlant(agent)) {
          this.world.onBotInteractionStart(agent, 'plant');
          this.interactionBusy = true;
        }
        return;
      }
      // The carrier must actually enter the bombsite, not idle at the outer
      // staging angle. This is the objective that makes offensive rounds close.
      this.state = 'advance';
      const center = this.world.getSiteCenter(site);
      this.advanceTo(center, now, 1.05, dt);
      return;
    }
    // Support the carrier / apply site pressure.
    this.state = 'advance';
    const anchor = site === 'A'
      ? A_ATTACK_STAGING[agent.ownerIndex % A_ATTACK_STAGING.length]
      : B_ATTACK_STAGING[agent.ownerIndex % B_ATTACK_STAGING.length];
    const distance = this.distanceTo(anchor.x, anchor.z);
    if (distance < 2.3) {
      this.holdAt(anchor, now, 4, 8);
      this.state = 'hold';
      this.faceLikelyEntry(site);
    } else {
      this.advanceTo(anchor, now, 1.0, dt);
    }
  }

  private updateCTObjective(now: number, dt: number): void {
    const agent = this.agent;
    const bomb = this.world.bombView;
    if (bomb.status === 'planted') {
      this.state = 'defusing';
      const distance = this.distanceTo(bomb.x, bomb.z);
      if (distance < 1.35) {
        const canTry = !this.target || (this.target && !this.hasLineOfSightToTarget());
        if (canTry && this.world.requestDefuse(agent)) {
          this.world.onBotInteractionStart(agent, 'defuse');
          this.interactionBusy = true;
          agent.speed = 0;
          return;
        }
        agent.speed = 0;
        this.path.length = 0;
        this.faceTowards(bomb.x, bomb.z, dt);
        return;
      }
      this.advanceTo({ x: bomb.x, z: bomb.z }, now, 1.05, dt);
      return;
    }
    if (this.target) return;
    // Pre-plant setup: disciplined holds by lane role.
    let holdList = A_HOLDS;
    if (this.role === 'B') holdList = B_HOLDS;
    else if (this.role === 'MID') holdList = MID_HOLDS;
    const hold = holdList[agent.ownerIndex % holdList.length];
    if (!this.holdPoint) this.holdPoint = hold;
    if (now > this.holdUntil || !this.holdPoint) {
      const base = holdList[agent.ownerIndex % holdList.length];
      const jittered = this.world.nav.findRandomNearbyWalkablePoint(base.x, base.z, 2.4);
      this.holdPoint = jittered;
      this.holdUntil = now + 8 + Math.random() * 7;
      this.goal = null;
    }
    const distance = this.distanceTo(this.holdPoint.x, this.holdPoint.z);
    this.state = 'hold';
    if (distance > 1.5) {
      this.advanceTo(this.holdPoint, now, 0.85, dt);
    } else {
      agent.speed = 0;
      this.path.length = 0;
      this.faceHold(this.role, dt);
    }
  }

  private defendPlantedBomb(now: number, dt: number): void {
    const agent = this.agent;
    const bomb = this.world.bombView;
    // Defend in a ring around the bomb. The exact ring angle is stable per bot.
    const index = agent.ownerIndex;
    const offsets: Point[] = [
      { x: 4.2, z: -3.2 },
      { x: -3.8, z: -3.8 },
      { x: 0.8, z: 5.6 },
      { x: -5.2, z: 2.6 },
      { x: 5.0, z: 2.0 },
    ];
    const offset = offsets[index % offsets.length];
    const desired = this.world.nav.findRandomNearbyWalkablePoint(bomb.x + offset.x, bomb.z + offset.z, 2.2);
    if (this.goal === null || now - this.goalSetAt > 7 || this.holdUntil < now) {
      this.holdPoint = desired;
      this.holdUntil = now + 7 + Math.random() * 5;
      this.goal = null;
    }
    const targetPoint = this.holdPoint ?? desired;
    this.state = 'hold';
    if (this.distanceTo(targetPoint.x, targetPoint.z) > 1.7) {
      this.advanceTo(targetPoint, now, 0.9, dt);
    } else {
      agent.speed = 0;
      this.path.length = 0;
      this.faceTowards(bomb.x, bomb.z, dt);
    }
  }

  private faceHold(role: Role, dt: number): void {
    let yaw = this.agent.yaw;
    if (role === 'A') {
      const dx = -24 - this.agent.position.x;
      const dz = 42 - this.agent.position.z;
      yaw = Math.atan2(-dx, -dz);
    } else if (role === 'B') {
      const dx = -25 - this.agent.position.x;
      const dz = -40 - this.agent.position.z;
      yaw = Math.atan2(-dx, -dz);
    } else {
      const dx = 6 - this.agent.position.x;
      const dz = 2 - this.agent.position.z;
      yaw = Math.atan2(-dx, -dz);
    }
    // Slight scanning makes a stationary hold look alive.
    yaw += Math.sin((performance.now() / 1000) * 0.7 + this.agent.id) * 0.14;
    this.turnToAngle(yaw, dt, 2.3);
  }

  private faceLikelyEntry(site: 'A' | 'B'): void {
    const agent = this.agent;
    let target: Point;
    if (site === 'A') {
      target = { x: agent.position.x < -33 ? -17 : -30, z: 49 };
    } else {
      target = { x: -19, z: -41 };
    }
    const desiredYaw = Math.atan2(
      -(target.x - agent.position.x),
      -(target.z - agent.position.z),
    );
    const delta = normalizeAngle(desiredYaw - agent.yaw);
    agent.yaw += clamp(delta, -0.035, 0.035);
  }

  private faceTowards(x: number, z: number, dt: number): void {
    const desiredYaw = Math.atan2(-(x - this.agent.position.x), -(z - this.agent.position.z));
    this.turnToAngle(desiredYaw, dt, 2.5);
  }

  private turnToAngle(desired: number, dt: number, speed: number): void {
    const delta = normalizeAngle(desired - this.agent.yaw);
    const maxStep = speed * dt;
    this.agent.yaw = normalizeAngle(this.agent.yaw + clamp(delta, -maxStep, maxStep));
  }

  private hasLineOfSightToTarget(): boolean {
    return Boolean(this.target && this.target.alive && this.world.lineOfSight(this.agent, this.target));
  }

  private holdAt(point: Point, now: number, min: number, max: number): void {
    this.holdPoint = point;
    this.holdUntil = now + min + Math.random() * (max - min);
  }

  private forceGoal(x: number, z: number, now: number): void {
    this.goal = this.world.nav.nearestWalkable(x, z) ?? { x, z };
    this.path = this.world.nav.findPath(this.agent.position.x, this.agent.position.z, x, z);
    this.pathIndex = 0;
    this.repathAt = now + 1.4;
    this.goalSetAt = now;
  }

  private advanceTo(point: Point, now: number, speedScale: number, dt: number): void {
    const goalChanged =
      !this.goal || Math.hypot(this.goal.x - point.x, this.goal.z - point.z) > 1.5;
    if (goalChanged || now > this.repathAt) {
      this.goal = { x: point.x, z: point.z };
      this.path = this.world.nav.findPath(
        this.agent.position.x,
        this.agent.position.z,
        point.x,
        point.z,
      );
      this.pathIndex = 0;
      this.repathAt = now + 2.2;
      this.goalSetAt = now;
      if (this.path.length === 0) {
        const nearby = this.world.nav.findRandomNearbyWalkablePoint(
          this.agent.position.x,
          this.agent.position.z,
          6,
        );
        this.path = this.world.nav.findPath(
          this.agent.position.x,
          this.agent.position.z,
          nearby.x,
          nearby.z,
        );
        this.pathIndex = 0;
      }
    }
    this.followPath(now, dt, speedScale);
  }

  private followPath(now: number, dt: number, speedScale: number): void {
    const agent = this.agent;
    if (this.path.length === 0) {
      agent.speed = 0;
      return;
    }
    while (this.pathIndex < this.path.length) {
      const node = this.path[this.pathIndex];
      const dx = node.x - agent.position.x;
      const dz = node.z - agent.position.z;
      if (Math.hypot(dx, dz) < 0.72) {
        this.pathIndex++;
        continue;
      }
      break;
    }
    if (this.pathIndex >= this.path.length) {
      agent.speed = 0;
      this.path.length = 0;
      return;
    }
    const node = this.path[this.pathIndex];
    let dx = node.x - agent.position.x;
    let dz = node.z - agent.position.z;
    const dist = Math.hypot(dx, dz) || 1;
    dx /= dist;
    dz /= dist;

    // Soft teammate separation.
    let sepX = 0;
    let sepZ = 0;
    for (const other of this.world.agents) {
      if (other === agent || !other.alive || other.team !== agent.team) continue;
      const ox = agent.position.x - other.position.x;
      const oz = agent.position.z - other.position.z;
      const d = Math.hypot(ox, oz);
      if (d > 0.01 && d < 1.15) {
        sepX += (ox / d) * (1.15 - d) * 0.7;
        sepZ += (oz / d) * (1.15 - d) * 0.7;
      }
    }
    dx += sepX;
    dz += sepZ;
    const len = Math.hypot(dx, dz) || 1;
    dx /= len;
    dz /= len;

    const baseSpeed = agent.team === 'T' ? 4.5 : 4.35;
    const weaponSlow = WEAPONS[agent.activeWeapon.id].moveSpeedScale;
    const speed = baseSpeed * speedScale * (0.92 + 0.08 * weaponSlow);
    const result = this.world.physics.moveCircle(
      agent.position.x,
      agent.position.z,
      dx * speed * dt,
      dz * speed * dt,
      0.34,
      1.7,
      0,
    );
    const movedX = result.x - agent.position.x;
    const movedZ = result.z - agent.position.z;
    agent.position.x = result.x;
    agent.position.z = result.z;
    const moved = Math.hypot(movedX, movedZ);
    const actualSpeed = dt > 0 ? moved / dt : 0;
    agent.speed = actualSpeed;
    agent.footY = 0;
    agent.grounded = true;
    const desiredYaw = Math.atan2(-dx, -dz);
    this.turnToAngle(desiredYaw, dt, 4.2);
    agent.footstepPhase = (agent.footstepPhase ?? this.footstepPhase) + actualSpeed * dt;
    this.footstepPhase = agent.footstepPhase;

    const blocked = result.hitX || result.hitZ;
    if (blocked && actualSpeed < 0.35) this.stuckTime += dt;
    else if (moved < 0.002) this.stuckTime += dt;
    else this.stuckTime = Math.max(0, this.stuckTime - dt * 1.8);

    if (this.stuckTime > 0.85) {
      this.goal = null;
      this.path = [];
      this.repathAt = 0;
      this.stuckTime = 0;
      const nudge = this.world.nav.findRandomNearbyWalkablePoint(
        agent.position.x,
        agent.position.z,
        4,
      );
      this.goal = nudge;
      this.path = this.world.nav.findPath(agent.position.x, agent.position.z, nudge.x, nudge.z);
      this.pathIndex = 0;
    }
    void now;
  }

  getSpeed(): number {
    return this.agent.speed;
  }

  getTarget(): Combatant | null {
    return this.target;
  }

  getRole(): Role {
    return this.role;
  }

  private distanceTo(x: number, z: number): number {
    return Math.hypot(this.agent.position.x - x, this.agent.position.z - z);
  }
}

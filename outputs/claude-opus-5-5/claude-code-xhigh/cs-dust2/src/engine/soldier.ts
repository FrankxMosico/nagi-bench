import type { Vec3 } from './math.ts';
import { lerp, vec3 } from './math.ts';
import type { PhysBody } from './physics.ts';
import type { Slot, Team, WeaponInst } from './weapons.ts';
import { makeWeapon } from './weapons.ts';

export type SlotRequest = Slot | 'last' | 'next' | 'prev';

/** Per-tick intent, produced either by the human input layer or by a bot brain. */
export interface ControlInput {
  forward: number;
  right: number;
  jump: boolean;
  crouch: boolean;
  walk: boolean;
  fire: boolean;
  alt: boolean;
  reload: boolean;
  use: boolean;
  drop: boolean;
  slot: SlotRequest | null;
}

export function emptyInput(): ControlInput {
  return {
    forward: 0,
    right: 0,
    jump: false,
    crouch: false,
    walk: false,
    fire: false,
    alt: false,
    reload: false,
    use: false,
    drop: false,
    slot: null,
  };
}

export const STAND_HEIGHT = 1.8;
export const CROUCH_HEIGHT = 1.3;
export const STAND_EYE = 1.65;
export const CROUCH_EYE = 1.18;

export class Soldier implements PhysBody {
  readonly id: number;
  readonly name: string;
  readonly team: Team;
  /** Index within its team (0..4). */
  readonly slotIndex: number;

  pos: Vec3 = vec3();
  prevPos: Vec3 = vec3();
  vel: Vec3 = vec3();
  radius = 0.35;
  height = STAND_HEIGHT;
  onGround = true;

  yaw = 0;
  pitch = 0;
  prevYaw = 0;
  prevPitch = 0;
  /** View/aim punch from recoil (radians). */
  punchPitch = 0;
  punchYaw = 0;

  alive = true;
  health = 100;
  armor = 0;
  helmet = false;
  hasKit = false;
  hasBomb = false;

  primary: WeaponInst | null = null;
  secondary: WeaponInst | null = null;
  melee: WeaponInst = makeWeapon('knife');
  activeSlot: Slot = 'secondary';
  lastSlot: Slot = 'melee';

  nextFireTime = 0;
  reloadEnd = 0;
  reloadStart = 0;
  drawEnd = 0;
  drawStart = 0;
  recoilIndex = 0;
  lastShotTime = -100;
  scope = 0;
  resumeScope = 0;
  scopeRestoreAt = 0;
  lastMeleeTime = -100;
  lastMeleeStab = false;

  crouchAmt = 0;
  crouching = false;
  walking = false;
  stepAccum = 0;
  /** Horizontal speed this tick (m/s) — used by animation and inaccuracy. */
  speed = 0;

  plantProgress = 0;
  defuseProgress = 0;
  planting = false;
  defusing = false;

  kills = 0;
  deaths = 0;
  roundKills = 0;
  damageDealt = 0;
  deathTime = -100;
  killerId = -1;
  lastHurtTime = -100;
  lastAttackerId = -1;
  lastHurtFrom: Vec3 = vec3();

  /** Game time until which this soldier is visible to the given team (radar "spotted"). */
  spottedUntil: Record<Team, number> = { T: -1, CT: -1 };
  /** Enemy ids currently visible to this soldier (updated by the perception pass). */
  visibleEnemies: number[] = [];

  fireHeldPrev = false;
  altHeldPrev = false;
  useHeldPrev = false;
  input: ControlInput = emptyInput();

  constructor(id: number, name: string, team: Team, slotIndex: number) {
    this.id = id;
    this.name = name;
    this.team = team;
    this.slotIndex = slotIndex;
  }

  get eyeHeight(): number {
    return lerp(STAND_EYE, CROUCH_EYE, this.crouchAmt);
  }

  get eyeY(): number {
    return this.pos.y + this.eyeHeight;
  }

  weaponIn(slot: Slot): WeaponInst | null {
    switch (slot) {
      case 'primary':
        return this.primary;
      case 'secondary':
        return this.secondary;
      case 'melee':
        return this.melee;
      case 'bomb':
        return this.hasBomb ? BOMB_INST : null;
    }
  }

  get weapon(): WeaponInst {
    return this.weaponIn(this.activeSlot) ?? this.melee;
  }

  get reloading(): boolean {
    return this.reloadEnd > 0;
  }

  bestSlot(): Slot {
    if (this.primary) return 'primary';
    if (this.secondary) return 'secondary';
    return 'melee';
  }
}

const BOMB_INST: WeaponInst = makeWeapon('c4');

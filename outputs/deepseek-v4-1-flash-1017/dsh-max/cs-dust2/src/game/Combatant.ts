import * as THREE from 'three';
import { WEAPONS, createWeaponRuntime, weaponName } from '../data/weapons';
import { CharacterRig } from './Character';
import type {
  HitPart,
  LoadoutSpec,
  SpawnPoint,
  Team,
  WeaponId,
  WeaponRuntime,
  WeaponSlot,
} from './types';

export interface DamageRecord {
  attackerId: number | null;
  amount: number;
  part: HitPart;
  time: number;
  weapon: WeaponId;
}

export class Combatant {
  readonly id: number;
  readonly team: Team;
  name: string;
  readonly rig: CharacterRig;
  readonly position = new THREE.Vector3();
  readonly velocity = new THREE.Vector3();
  readonly spawn = new THREE.Vector3();
  spawnYaw = 0;
  yaw = 0;
  pitch = 0;
  health = 100;
  armor = 0;
  helmet = false;
  alive = true;
  kills = 0;
  deaths = 0;
  activeSlot: WeaponSlot = 'secondary';
  primary: WeaponRuntime | null = null;
  secondary!: WeaponRuntime;
  melee!: WeaponRuntime;
  footY = 0;
  grounded = true;
  crouching = false;
  speed = 0;
  lastMoveTime = 0;
  footstepPhase = 0;
  lastDamage: DamageRecord | null = null;
  controlledByPlayer = false;
  roundDeath = false;
  bombCarrier = false;
  isBot = true;
  ownerIndex = 0;

  constructor(id: number, name: string, team: Team, ownerIndex: number) {
    this.id = id;
    this.name = name;
    this.team = team;
    this.ownerIndex = ownerIndex;
    this.rig = new CharacterRig(team);
    this.rig.root.position.set(0, 0, 0);
  }

  get activeWeapon(): WeaponRuntime {
    if (this.activeSlot === 'primary' && this.primary) return this.primary;
    if (this.activeSlot === 'melee') return this.melee;
    return this.secondary;
  }

  get activeWeaponName(): string {
    return weaponName(this.activeWeapon.id);
  }

  get headPosition(): THREE.Vector3 {
    return new THREE.Vector3(this.position.x, this.position.y + 1.7, this.position.z);
  }

  get chestPosition(): THREE.Vector3 {
    return new THREE.Vector3(this.position.x, this.position.y + 1.32, this.position.z);
  }

  get eyePosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.position.x,
      this.position.y + (this.crouching ? 1.06 : 1.62),
      this.position.z,
    );
  }

  get forwardDirection(): THREE.Vector3 {
    return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
  }

  resetForRound(spawn: SpawnPoint, spec: LoadoutSpec, time: number): void {
    this.alive = true;
    this.health = 100;
    this.armor = spec.armor;
    this.helmet = spec.helmet;
    this.kills = 0;
    this.deaths = 0;
    this.position.set(spawn.x, 0, spawn.z);
    this.velocity.set(0, 0, 0);
    this.spawn.set(spawn.x, 0, spawn.z);
    this.spawnYaw = spawn.yaw;
    this.yaw = spawn.yaw;
    this.pitch = 0;
    this.activeSlot = 'secondary';
    this.primary = spec.primary ? createWeaponRuntime(spec.primary) : null;
    this.secondary = createWeaponRuntime(spec.secondary);
    this.melee = createWeaponRuntime('knife');
    this.activeSlot = this.primary ? 'primary' : 'secondary';
    this.footY = 0;
    this.grounded = true;
    this.crouching = false;
    this.speed = 0;
    this.lastMoveTime = time;
    this.lastDamage = null;
    this.roundDeath = false;
    this.bombCarrier = false;
    this.isBot = true;
    this.controlledByPlayer = false;
    this.rig.setDead(false);
    this.rig.setVisible(true);
    this.rig.root.position.copy(this.position);
    this.rig.root.rotation.set(0, this.yaw, 0);
    this.syncRigWeapon();
    this.rig.setReloading(false);
  }

  addKill(): void {
    this.kills++;
  }

  addDeath(): void {
    this.deaths++;
  }

  canShoot(now: number): boolean {
    if (!this.alive) return false;
    const weapon = this.activeWeapon;
    return !weapon.reloading && weapon.nextFireAt <= now && weapon.ammo > 0;
  }

  startReload(now: number): boolean {
    const weapon = this.activeWeapon;
    const def = WEAPONS[weapon.id];
    if (!this.alive || def.slot === 'melee' || weapon.reloading) return false;
    if (weapon.ammo >= def.magSize || weapon.reserve <= 0) return false;
    weapon.reloading = true;
    weapon.reloadEnd = now + def.reloadTime;
    weapon.scoped = false;
    this.rig.setReloading(true);
    return true;
  }

  finishReload(now: number): boolean {
    const weapon = this.activeWeapon;
    if (!weapon.reloading || weapon.reloadEnd > now) return false;
    const def = WEAPONS[weapon.id];
    const needed = def.magSize - weapon.ammo;
    const taken = Math.min(needed, weapon.reserve);
    weapon.ammo += taken;
    weapon.reserve -= taken;
    weapon.reloading = false;
    this.rig.setReloading(false);
    return true;
  }

  cancelReload(): void {
    const weapon = this.activeWeapon;
    weapon.reloading = false;
    weapon.scoped = false;
    this.rig.setReloading(false);
  }

  switchWeapon(slot: WeaponSlot): boolean {
    if (slot === 'primary' && !this.primary) return false;
    if (slot === this.activeSlot) return false;
    this.cancelReload();
    this.activeSlot = slot;
    this.syncRigWeapon();
    return true;
  }

  syncRigWeapon(): void {
    this.rig.setWeapon(this.activeWeapon.id, this.team);
  }

  /** Prefer any loaded gun when an AI runs dry, then fall back to the knife. */
  chooseBestWeapon(now: number): boolean {
    const current = this.activeWeapon;
    if (current.ammo > 0 || current.reloading) return false;
    if (current.reserve > 0) return false;
    const candidates: WeaponRuntime[] = [];
    if (this.primary) candidates.push(this.primary);
    candidates.push(this.secondary);
    const usable = candidates.find(
      (weapon) => weapon.id !== current.id && (weapon.ammo > 0 || weapon.reserve > 0),
    );
    if (usable) {
      this.activeSlot = usable.slot;
      this.syncRigWeapon();
      return true;
    }
    if (current.slot !== 'melee') {
      this.activeSlot = 'melee';
      this.syncRigWeapon();
      return true;
    }
    return false;
  }

  updateAnimation(dt: number, moving: boolean, aiming: boolean): void {
    this.rig.root.position.copy(this.position);
    this.rig.root.rotation.y = this.yaw;
    this.rig.update(dt, {
      speed: this.speed,
      aimPitch: this.pitch,
      alive: this.alive,
      moving,
      aiming,
    });
  }

  getHitboxes(): THREE.Mesh[] {
    return this.rig.hitboxes.map((h) => h.mesh);
  }
}

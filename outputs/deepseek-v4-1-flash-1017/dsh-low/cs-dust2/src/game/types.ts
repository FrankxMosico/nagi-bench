import type * as THREE from 'three';
import type { HumanModel } from './humanModel';

export type Team = 'CT' | 'T';
export type WeaponSlot = 'primary' | 'secondary' | 'melee';
export type WeaponId =
  | 'ak47'
  | 'm4a4'
  | 'awp'
  | 'glock'
  | 'usp'
  | 'deagle'
  | 'knife';

export type HitZone = 'head' | 'chest' | 'abdomen' | 'armL' | 'armR' | 'legL' | 'legR';

export interface WeaponDef {
  id: WeaponId;
  name: string;
  shortName: string;
  slot: WeaponSlot;
  damage: number;
  fireRate: number; // rounds per minute
  magSize: number;
  reserveAmmo: number;
  reloadTime: number;
  spread: number; // radians
  bloom: number;
  recoilPitch: number;
  recoilYaw: number;
  range: number;
  auto: boolean;
  armorPenetration: number;
  falloffStart: number;
  falloffFactor: number;
  zoom?: number;
  scopedSpread?: number;
  pellets?: number;
  drawTime: number;
  description: string;
  cost: number;
  team?: Team;
}

export interface WeaponState {
  def: WeaponDef;
  mag: number;
  reserve: number;
  reloading: boolean;
  reloadRemaining: number;
  nextFire: number;
}

export interface Loadout {
  primary: WeaponState | null;
  secondary: WeaponState;
  melee: WeaponState;
}

export interface Collider {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  kind: 'wall' | 'building' | 'crate' | 'barrier' | 'barrel' | 'door-frame';
}

export interface MapSpawn {
  x: number;
  z: number;
  yaw: number;
}

export interface BombSite {
  id: 'A' | 'B';
  center: { x: number; z: number };
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface ZoneFloor {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  color: number;
  opacity: number;
  label?: string;
}

export interface Brain {
  state: 'advance' | 'engage' | 'hold' | 'plant' | 'defuse' | 'retrieve' | 'patrol';
  site: 'A' | 'B';
  anchor: 'A' | 'B' | 'mid';
  path: { x: number; z: number }[];
  pathIndex: number;
  goalX: number;
  goalZ: number;
  nextRepath: number;
  nextSense: number;
  targetId: string | null;
  lastSeen: number;
  lastTargetX: number;
  lastTargetZ: number;
  reactionEnd: number;
  stuckTime: number;
  lastX: number;
  lastZ: number;
  strafeDir: number;
  strafeEnd: number;
  desiredYaw: number;
  aimYaw: number;
  aimPitch: number;
  burstLeft: number;
  nextThink: number;
  holdSpotAngle: number;
}

export interface Actor {
  id: string;
  name: string;
  team: Team;
  isPlayer: boolean;
  isBot: boolean;
  alive: boolean;
  health: number;
  armor: number;
  helmet: boolean;
  pos: THREE.Vector3;
  velocity: THREE.Vector3;
  yaw: number;
  pitch: number;
  onGround: boolean;
  radius: number;
  height: number;
  eyeHeight: number;
  speed: number;
  loadout: Loadout;
  currentSlot: WeaponSlot;
  nextFireTime: number;
  reloadEnd: number;
  reloading: boolean;
  bloom: number;
  hasC4: boolean;
  kills: number;
  deaths: number;
  headshotKills: number;
  damageFlash: number;
  lastDamageTime: number;
  lastFootstep: number;
  model: HumanModel;
  brain: Brain;
  money: number;
  totalDamage: number;
}

export interface KillFeedEntry {
  id: number;
  killer: string;
  killerTeam: Team;
  victim: string;
  victimTeam: Team;
  weapon: string;
  headshot: boolean;
  createdAt: number;
}

export interface BuyOption {
  id: WeaponId | 'kevlar' | 'kevlar_helmet';
  name: string;
  price: number;
  category: string;
  description: string;
  unavailable?: boolean;
}

export interface HudActor {
  id: string;
  name: string;
  team: Team;
  x: number;
  z: number;
  yaw: number;
  alive: boolean;
  isSelf: boolean;
  isBombCarrier: boolean;
  spotted: boolean;
}

export interface HudSnapshot {
  ready: boolean;
  locked: boolean;
  phase: 'freeze' | 'live' | 'roundEnd';
  round: number;
  pistolRound: boolean;
  scoreCT: number;
  scoreT: number;
  timeLeft: number;
  freezeLeft: number;
  roundBanner: string;
  roundSubBanner: string;
  playerTeam: Team;
  playerName: string;
  location: string;
  alive: boolean;
  spectating: boolean;
  spectatingName: string;
  canTakeOver: boolean;
  health: number;
  armor: number;
  helmet: boolean;
  weaponName: string;
  weaponShort: string;
  weaponSlot: WeaponSlot;
  weaponIcon: string;
  mag: number;
  reserve: number;
  reloading: boolean;
  reloadProgress: number;
  scoped: boolean;
  canScope: boolean;
  spread: number;
  hitmarker: boolean;
  headshotMarker: boolean;
  damageFlash: number;
  killFlash: boolean;
  killfeed: KillFeedEntry[];
  c4Carried: boolean;
  bombPlanted: boolean;
  bombTime: number;
  bombX: number;
  bombZ: number;
  bombState: 'carried' | 'dropped' | 'planted' | 'none' | 'exploded';
  interactionPrompt: string;
  interactionKind: 'plant' | 'defuse' | null;
  interactionProgress: number;
  players: HudActor[];
  spottedEnemies: string[];
  buyOpen: boolean;
  buyAllowed: boolean;
  buyOptions: BuyOption[];
  money: number;
  killCount: number;
  deathCount: number;
  ammoSlots: { slot: WeaponSlot; name: string; active: boolean; has: boolean }[];
  roundResult: { winner: Team; reason: string } | null;
  scoreboard: {
    id: string;
    name: string;
    team: Team;
    kills: number;
    deaths: number;
    alive: boolean;
    isPlayer: boolean;
  }[];
  instruction: string;
}

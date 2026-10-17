export type Team = 'CT' | 'T';

export type WeaponId = 'ak47' | 'm4a4' | 'awp' | 'glock' | 'usp' | 'deagle' | 'knife';

export type WeaponSlot = 'primary' | 'secondary' | 'melee';

export type HitPart = 'head' | 'chest' | 'stomach' | 'arm' | 'leg';

export type GamePhase = 'menu' | 'freeze' | 'live' | 'roundEnd' | 'matchEnd';

export type BombStatus = 'carried' | 'dropped' | 'planted' | 'exploded' | 'defused';

export type BotState =
  | 'idle'
  | 'advance'
  | 'combat'
  | 'planting'
  | 'defusing'
  | 'pickup'
  | 'hold'
  | 'dead';

export interface WeaponDef {
  id: WeaponId;
  name: string;
  shortName: string;
  slot: WeaponSlot;
  damage: number;
  fireInterval: number;
  magSize: number;
  reserveAmmo: number;
  reloadTime: number;
  /** Cone half-angle in radians while standing still. */
  spread: number;
  /** Extra cone added at full running speed. */
  moveSpread: number;
  airSpread: number;
  recoilPitch: number;
  recoilYaw: number;
  automatic: boolean;
  pellets: number;
  maxRange: number;
  /** Fraction of damage that armor can absorb (before durability loss). */
  armorPenetration: number;
  moveSpeedScale: number;
  scopeFov?: number;
  scopedSpread?: number;
  description: string;
}

export interface WeaponRuntime {
  id: WeaponId;
  slot: WeaponSlot;
  ammo: number;
  reserve: number;
  nextFireAt: number;
  reloadEnd: number;
  reloading: boolean;
  scoped: boolean;
  lastShotAt: number;
  shotCount: number;
}

export interface LoadoutSpec {
  primary: WeaponId | null;
  secondary: WeaponId;
  armor: number;
  helmet: boolean;
}

export interface Vec2Like {
  x: number;
  z: number;
}

export interface RectSpec {
  id: string;
  label?: string;
  x1: number;
  z1: number;
  x2: number;
  z2: number;
  style: 'sand' | 'stone' | 'concrete' | 'tunnel' | 'wood';
}

export interface WallSpec {
  x1: number;
  z1: number;
  x2: number;
  z2: number;
  height?: number;
  thickness?: number;
  style?: 'sandstone' | 'concrete' | 'plaster' | 'brick' | 'tunnel';
  /** Generated perimeter walls do not receive extra visual trim. */
  trim?: boolean;
}

export interface BoxSpec {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  y?: number;
  kind: 'crate' | 'metal' | 'concrete' | 'sandbag' | 'barrel';
  rot?: number;
  stack?: number;
}

export interface Collider {
  id: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  blocksSight: boolean;
  tag: 'wall' | 'crate' | 'door' | 'structure' | 'ground';
}

export interface PlantSite {
  id: 'A' | 'B';
  label: string;
  x1: number;
  z1: number;
  x2: number;
  z2: number;
  centerX: number;
  centerZ: number;
}

export interface SpawnPoint {
  x: number;
  z: number;
  yaw: number;
}

export interface ObjectivePoint {
  id: string;
  x: number;
  z: number;
  label: string;
}

export interface KillFeedItem {
  id: number;
  killer: string;
  killerTeam: Team;
  victim: string;
  victimTeam: Team;
  weapon: string;
  headshot: boolean;
  t: number;
}

export interface HUDWeapon {
  id: WeaponId;
  name: string;
  slot: WeaponSlot;
  ammo: number;
  reserve: number;
  reloading: boolean;
  scoped: boolean;
  reloadProgress: number;
}

export interface LoadoutOption {
  id: WeaponId;
  name: string;
  note: string;
}

export interface HUDState {
  phase: GamePhase;
  roundNumber: number;
  scoreCT: number;
  scoreT: number;
  playerTeam: Team;
  playerName: string;
  playerAlive: boolean;
  health: number;
  armor: number;
  helmet: boolean;
  weapons: HUDWeapon[];
  activeSlot: WeaponSlot;
  crosshairSpread: number;
  hasBomb: boolean;
  bomb: {
    status: BombStatus;
    timer: number;
    plantedSite: 'A' | 'B' | null;
    visibleOnMap: boolean;
    mapX: number;
    mapZ: number;
    actionType: 'plant' | 'defuse' | null;
    actionProgress: number;
    actionDuration: number;
  };
  prompt: string;
  flash: 'damage' | 'hit' | 'headshot' | null;
  flashAt: number;
  roundTimeLeft: number;
  freezeTimeLeft: number;
  aliveCT: number;
  aliveT: number;
  kills: number;
  deaths: number;
  scoreboard: {
    name: string;
    team: Team;
    alive: boolean;
    kills: number;
    deaths: number;
    controlled: boolean;
    hasBomb: boolean;
  }[];
  killfeed: KillFeedItem[];
  death: {
    dead: boolean;
    canTakeover: boolean;
    nextName: string;
    countdown: number;
  };
  roundResult: {
    winner: Team | null;
    reason: string;
    playerWon: boolean;
  };
  matchWinner: Team | null;
  muted: boolean;
  fps: number;
  pointerLocked: boolean;
  loadout: LoadoutSpec;
  lastCallout: string;
}

export interface MinimapAgent {
  x: number;
  z: number;
  yaw: number;
  team: Team;
  controlled: boolean;
  alive: boolean;
  hasBomb: boolean;
}

export interface MinimapSnapshot {
  player: MinimapAgent | null;
  teammates: MinimapAgent[];
  visibleEnemies: MinimapAgent[];
  bomb: { x: number; z: number; status: BombStatus; visible: boolean; carriedByMe: boolean };
  viewYaw: number;
  phase: GamePhase;
}

export interface MapCallout {
  id: string;
  x: number;
  z: number;
  name: string;
}

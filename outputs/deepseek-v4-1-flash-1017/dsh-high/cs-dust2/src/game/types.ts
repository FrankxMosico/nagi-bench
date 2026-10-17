export type Team = 'CT' | 'T';
export type WeaponSlot = 'primary' | 'secondary' | 'melee';
export type HitPart = 'head' | 'chest' | 'stomach' | 'arm' | 'leg';
export type GamePhase = 'menu' | 'freeze' | 'live' | 'planted' | 'roundEnd';

export interface Vec2 {
  x: number;
  z: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Rect {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface HudPlayer {
  team: Team;
  name: string;
  alive: boolean;
  health: number;
  armor: number;
  weapon: string;
  slot: WeaponSlot;
  ammo: number;
  reserve: number;
  reloading: boolean;
  scoped: boolean;
  moving: boolean;
  spread: number;
  hasPrimary: boolean;
  hasBomb: boolean;
  controlledName: string;
  takeoverIn: number;
  spectating: boolean;
}

export interface KillFeedEntry {
  id: number;
  killer: string;
  victim: string;
  killerTeam: Team;
  victimTeam: Team;
  weapon: string;
  headshot: boolean;
  age: number;
  at?: number;
}

export interface BombsiteInfo {
  name: 'A' | 'B';
  center: Vec2;
  rect: Rect;
}

export interface ScoreEntry {
  id: string;
  name: string;
  team: Team;
  alive: boolean;
  health: number;
  isPlayer: boolean;
  kills: number;
  deaths: number;
}

export interface HudState {
  started: boolean;
  paused: boolean;
  phase: GamePhase;
  round: number;
  ctScore: number;
  tScore: number;
  roundTime: number;
  bombTime: number;
  player: HudPlayer | null;
  ctAlive: number;
  tAlive: number;
  killfeed: KillFeedEntry[];
  bomb: {
    planted: boolean;
    plantedSite: string | null;
    carriedBy: string | null;
    dropped: boolean;
    defusing: boolean;
    defuseProgress: number;
    plantProgress: number;
    actionHint: string;
  };
  message: string;
  messageSub: string;
  buyOpen: boolean;
  scoreboard: ScoreEntry[];
  hitMarker: number;
  damageFlash: number;
  objective: string;
  pointerLocked: boolean;
  matchOver: boolean;
  scoreboardOpen: boolean;
}

export interface WeaponSoundProfile {
  kind: 'rifle' | 'heavy' | 'smg' | 'pistol' | 'deagle' | 'knife';
  pitch: number;
  duration: number;
  volume: number;
}

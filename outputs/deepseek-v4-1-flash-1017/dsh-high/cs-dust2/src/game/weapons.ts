import type { Team, WeaponSlot, WeaponSoundProfile } from './types';

export type WeaponId =
  | 'ak47'
  | 'm4a4'
  | 'awp'
  | 'glock'
  | 'usp'
  | 'deagle'
  | 'knife';

export interface WeaponDef {
  id: WeaponId;
  name: string;
  shortName: string;
  slot: WeaponSlot;
  damage: number;
  fireInterval: number;
  automatic: boolean;
  magSize: number;
  reserve: number;
  reloadTime: number;
  spreadBase: number;
  spreadShot: number;
  spreadMove: number;
  recoilPitch: number;
  recoilYaw: number;
  range: number;
  armorPen: number;
  speedFactor: number;
  scoped: boolean;
  sound: WeaponSoundProfile;
  accent: string;
}

export const HIT_MULTIPLIERS = {
  head: 2,
  chest: 1,
  stomach: 0.85,
  arm: 0.65,
  leg: 0.6,
} as const;

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  ak47: {
    id: 'ak47', name: 'AK-47', shortName: 'AK-47', slot: 'primary',
    damage: 36, fireInterval: 100, automatic: true, magSize: 30, reserve: 90,
    reloadTime: 2.45, spreadBase: 0.0045, spreadShot: 0.0052, spreadMove: 0.018,
    recoilPitch: 0.014, recoilYaw: 0.007, range: 130, armorPen: 0.775,
    speedFactor: 0.92, scoped: false, accent: '#e3a64d',
    sound: { kind: 'rifle', pitch: 0.8, duration: 0.24, volume: 0.75 },
  },
  m4a4: {
    id: 'm4a4', name: 'M4A4', shortName: 'M4A4', slot: 'primary',
    damage: 30, fireInterval: 82, automatic: true, magSize: 30, reserve: 90,
    reloadTime: 2.15, spreadBase: 0.0032, spreadShot: 0.0028, spreadMove: 0.013,
    recoilPitch: 0.007, recoilYaw: 0.0038, range: 125, armorPen: 0.7,
    speedFactor: 0.95, scoped: false, accent: '#8fc7ff',
    sound: { kind: 'rifle', pitch: 1.22, duration: 0.18, volume: 0.62 },
  },
  awp: {
    id: 'awp', name: 'AWP', shortName: 'AWP', slot: 'primary',
    damage: 115, fireInterval: 1450, automatic: false, magSize: 10, reserve: 30,
    reloadTime: 3.25, spreadBase: 0.0004, spreadShot: 0.02, spreadMove: 0.05,
    recoilPitch: 0.043, recoilYaw: 0.009, range: 180, armorPen: 0.95,
    speedFactor: 0.8, scoped: true, accent: '#89d39f',
    sound: { kind: 'heavy', pitch: 0.62, duration: 0.65, volume: 0.92 },
  },
  glock: {
    id: 'glock', name: 'Glock-18', shortName: 'GLOCK', slot: 'secondary',
    damage: 22, fireInterval: 145, automatic: false, magSize: 20, reserve: 120,
    reloadTime: 1.75, spreadBase: 0.009, spreadShot: 0.0045, spreadMove: 0.014,
    recoilPitch: 0.0042, recoilYaw: 0.0026, range: 75, armorPen: 0.47,
    speedFactor: 1.02, scoped: false, accent: '#e4c068',
    sound: { kind: 'pistol', pitch: 1.35, duration: 0.12, volume: 0.48 },
  },
  usp: {
    id: 'usp', name: 'USP-S', shortName: 'USP-S', slot: 'secondary',
    damage: 25, fireInterval: 175, automatic: false, magSize: 12, reserve: 96,
    reloadTime: 2.0, spreadBase: 0.0064, spreadShot: 0.0038, spreadMove: 0.012,
    recoilPitch: 0.004, recoilYaw: 0.0018, range: 85, armorPen: 0.5,
    speedFactor: 1.02, scoped: false, accent: '#a8d6ff',
    sound: { kind: 'pistol', pitch: 1.05, duration: 0.11, volume: 0.4 },
  },
  deagle: {
    id: 'deagle', name: 'Desert Eagle', shortName: 'DEAGLE', slot: 'secondary',
    damage: 48, fireInterval: 330, automatic: false, magSize: 7, reserve: 35,
    reloadTime: 2.35, spreadBase: 0.0075, spreadShot: 0.009, spreadMove: 0.02,
    recoilPitch: 0.019, recoilYaw: 0.006, range: 100, armorPen: 0.82,
    speedFactor: 0.98, scoped: false, accent: '#f2c35e',
    sound: { kind: 'deagle', pitch: 0.92, duration: 0.3, volume: 0.72 },
  },
  knife: {
    id: 'knife', name: 'Tactical Knife', shortName: 'KNIFE', slot: 'melee',
    damage: 55, fireInterval: 430, automatic: false, magSize: 1, reserve: 0,
    reloadTime: 0, spreadBase: 0, spreadShot: 0, spreadMove: 0,
    recoilPitch: 0.002, recoilYaw: 0.001, range: 2.35, armorPen: 0.9,
    speedFactor: 1.1, scoped: false, accent: '#d8dde3',
    sound: { kind: 'knife', pitch: 1, duration: 0.14, volume: 0.35 },
  },
};

export interface WeaponInstance {
  def: WeaponDef;
  ammo: number;
  reserve: number;
}

export interface Inventory {
  primary: WeaponInstance | null;
  secondary: WeaponInstance | null;
  melee: WeaponInstance;
  slot: WeaponSlot;
}

export function makeWeapon(id: WeaponId): WeaponInstance {
  const def = WEAPONS[id];
  return { def, ammo: def.magSize, reserve: def.reserve };
}

export function defaultPistolFor(team: Team): WeaponId {
  return team === 'T' ? 'glock' : 'usp';
}

export function createInventory(team: Team, primaryId?: WeaponId | null, pistolId?: WeaponId): Inventory {
  return {
    primary: primaryId ? makeWeapon(primaryId) : null,
    secondary: makeWeapon(pistolId ?? defaultPistolFor(team)),
    melee: makeWeapon('knife'),
    slot: primaryId ? 'primary' : 'secondary',
  };
}

export function getWeapon(inv: Inventory, slot: WeaponSlot): WeaponInstance | null {
  if (slot === 'melee') return inv.melee;
  if (slot === 'secondary') return inv.secondary;
  return inv.primary;
}

export function activeWeapon(inv: Inventory): WeaponInstance {
  return getWeapon(inv, inv.slot) ?? inv.secondary ?? inv.melee;
}

export function hasSlot(inv: Inventory, slot: WeaponSlot): boolean {
  return slot === 'melee' || (slot === 'secondary' ? !!inv.secondary : !!inv.primary);
}

export interface BuyOption {
  id: WeaponId | 'kevlar';
  name: string;
  desc: string;
  team: Team | 'both';
  kind: 'primary' | 'pistol' | 'armor';
}

export const BUY_OPTIONS: BuyOption[] = [
  { id: 'ak47', name: 'AK-47', desc: '高伤害 · 剧烈后坐力', team: 'T', kind: 'primary' },
  { id: 'm4a4', name: 'M4A4', desc: '高射速 · 稳定弹道', team: 'CT', kind: 'primary' },
  { id: 'awp', name: 'AWP', desc: '一击必杀 · 右键开镜', team: 'both', kind: 'primary' },
  { id: 'deagle', name: '沙漠之鹰', desc: '手枪重炮 · 7发弹匣', team: 'both', kind: 'pistol' },
  { id: 'kevlar', name: '防弹衣', desc: '恢复 100 点护甲', team: 'both', kind: 'armor' },
];

import type { WeaponDef, WeaponId, Loadout, WeaponSlot, WeaponState, Team } from './types';

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  ak47: {
    id: 'ak47', name: 'AK-47', shortName: 'AK', slot: 'primary', damage: 36,
    fireRate: 600, magSize: 30, reserveAmmo: 90, reloadTime: 2.45, spread: 0.006,
    bloom: 0.0036, recoilPitch: 0.020, recoilYaw: 0.008, range: 140, auto: true,
    armorPenetration: 0.775, falloffStart: 45, falloffFactor: 0.88, drawTime: 0.75,
    description: '高伤害 • 剧烈后坐力', cost: 2700, team: 'T',
  },
  m4a4: {
    id: 'm4a4', name: 'M4A4', shortName: 'M4', slot: 'primary', damage: 30,
    fireRate: 666, magSize: 30, reserveAmmo: 90, reloadTime: 2.7, spread: 0.005,
    bloom: 0.0021, recoilPitch: 0.0105, recoilYaw: 0.0042, range: 140, auto: true,
    armorPenetration: 0.7, falloffStart: 48, falloffFactor: 0.9, drawTime: 0.8,
    description: '低后坐力 • 高射速', cost: 3100, team: 'CT',
  },
  awp: {
    id: 'awp', name: 'AWP', shortName: 'AWP', slot: 'primary', damage: 118,
    fireRate: 41, magSize: 5, reserveAmmo: 25, reloadTime: 3.65, spread: 0.035,
    bloom: 0.02, recoilPitch: 0.05, recoilYaw: 0.012, range: 220, auto: false,
    armorPenetration: 0.98, falloffStart: 120, falloffFactor: 0.96, zoom: 28,
    scopedSpread: 0.00035, drawTime: 1.25, description: '一枪致命 • 右键开镜', cost: 4750,
  },
  glock: {
    id: 'glock', name: 'Glock-18', shortName: 'GLK', slot: 'secondary', damage: 23,
    fireRate: 400, magSize: 20, reserveAmmo: 120, reloadTime: 1.9, spread: 0.012,
    bloom: 0.0032, recoilPitch: 0.008, recoilYaw: 0.004, range: 70, auto: false,
    armorPenetration: 0.47, falloffStart: 25, falloffFactor: 0.72, drawTime: 0.45,
    description: 'T 默认手枪 • 弹匣大', cost: 200, team: 'T',
  },
  usp: {
    id: 'usp', name: 'USP-S', shortName: 'USP', slot: 'secondary', damage: 25,
    fireRate: 352, magSize: 12, reserveAmmo: 96, reloadTime: 2.05, spread: 0.009,
    bloom: 0.003, recoilPitch: 0.007, recoilYaw: 0.003, range: 75, auto: false,
    armorPenetration: 0.505, falloffStart: 30, falloffFactor: 0.75, drawTime: 0.5,
    description: 'CT 默认手枪 • 精准', cost: 200, team: 'CT',
  },
  deagle: {
    id: 'deagle', name: '沙漠之鹰', shortName: 'DEAGLE', slot: 'secondary', damage: 29,
    fireRate: 266, magSize: 7, reserveAmmo: 35, reloadTime: 2.2, spread: 0.013,
    bloom: 0.0085, recoilPitch: 0.028, recoilYaw: 0.008, range: 100, auto: false,
    armorPenetration: 0.93, falloffStart: 35, falloffFactor: 0.8, drawTime: 0.55,
    description: '高穿透 • 弹匣小', cost: 700,
  },
  knife: {
    id: 'knife', name: '战术匕首', shortName: 'KNIFE', slot: 'melee', damage: 42,
    fireRate: 120, magSize: 0, reserveAmmo: 0, reloadTime: 0, spread: 0,
    bloom: 0, recoilPitch: 0.004, recoilYaw: 0.002, range: 2.1, auto: false,
    armorPenetration: 0.85, falloffStart: 2, falloffFactor: 1, drawTime: 0.35,
    description: '静音近战 • 背刺致命', cost: 0,
  },
};

export function createWeapon(id: WeaponId): WeaponState {
  const def = WEAPONS[id];
  return {
    def,
    mag: def.magSize,
    reserve: def.reserveAmmo,
    reloading: false,
    reloadRemaining: 0,
    nextFire: 0,
  };
}

export function createLoadout(options: {
  primary?: WeaponId | null;
  secondary: WeaponId;
}): Loadout {
  return {
    primary: options.primary ? createWeapon(options.primary) : null,
    secondary: createWeapon(options.secondary),
    melee: createWeapon('knife'),
  };
}

export function getSlot(actor: { loadout: Loadout }, slot: WeaponSlot): WeaponState | null {
  if (slot === 'primary') return actor.loadout.primary;
  if (slot === 'secondary') return actor.loadout.secondary;
  return actor.loadout.melee;
}

export function getActiveWeapon(actor: { loadout: Loadout; currentSlot: WeaponSlot }): WeaponState {
  return (getSlot(actor, actor.currentSlot) ?? actor.loadout.secondary)!;
}

export function defaultSecondary(team: Team): WeaponId {
  return team === 'T' ? 'glock' : 'usp';
}

export function defaultPrimary(team: Team): WeaponId {
  return team === 'T' ? 'ak47' : 'm4a4';
}

export function canUseWeapon(team: Team, weapon: WeaponDef): boolean {
  if (weapon.id === 'ak47' && team === 'CT') return false;
  if (weapon.id === 'm4a4' && team === 'T') return false;
  if (weapon.id === 'glock' && team === 'CT') return false;
  if (weapon.id === 'usp' && team === 'T') return false;
  return true;
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

import type {
  HitPart,
  LoadoutSpec,
  Team,
  WeaponDef,
  WeaponId,
  WeaponRuntime,
  WeaponSlot,
} from '../game/types';

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  ak47: {
    id: 'ak47',
    name: 'AK-47',
    shortName: 'AK',
    slot: 'primary',
    damage: 36,
    fireInterval: 0.1,
    magSize: 30,
    reserveAmmo: 90,
    reloadTime: 2.35,
    spread: 0.0065,
    moveSpread: 0.035,
    airSpread: 0.085,
    recoilPitch: 0.017,
    recoilYaw: 0.008,
    automatic: true,
    pellets: 1,
    maxRange: 110,
    armorPenetration: 0.78,
    moveSpeedScale: 0.92,
    description: '高伤害 · 剧烈后坐力',
  },
  m4a4: {
    id: 'm4a4',
    name: 'M4A4',
    shortName: 'M4',
    slot: 'primary',
    damage: 30,
    fireInterval: 0.087,
    magSize: 30,
    reserveAmmo: 90,
    reloadTime: 2.5,
    spread: 0.0045,
    moveSpread: 0.026,
    airSpread: 0.07,
    recoilPitch: 0.0085,
    recoilYaw: 0.0048,
    automatic: true,
    pellets: 1,
    maxRange: 110,
    armorPenetration: 0.75,
    moveSpeedScale: 0.94,
    description: '高射速 · 低后坐力',
  },
  awp: {
    id: 'awp',
    name: 'AWP',
    shortName: 'AWP',
    slot: 'primary',
    damage: 115,
    fireInterval: 1.42,
    magSize: 5,
    reserveAmmo: 20,
    reloadTime: 3.15,
    spread: 0.075,
    moveSpread: 0.12,
    airSpread: 0.2,
    recoilPitch: 0.038,
    recoilYaw: 0.011,
    automatic: false,
    pellets: 1,
    maxRange: 150,
    armorPenetration: 0.98,
    moveSpeedScale: 0.78,
    scopeFov: 22,
    scopedSpread: 0.00015,
    description: '一击致命 · 右键开镜',
  },
  glock: {
    id: 'glock',
    name: 'Glock-18',
    shortName: 'GLK',
    slot: 'secondary',
    damage: 20,
    fireInterval: 0.15,
    magSize: 20,
    reserveAmmo: 60,
    reloadTime: 1.9,
    spread: 0.019,
    moveSpread: 0.045,
    airSpread: 0.11,
    recoilPitch: 0.0065,
    recoilYaw: 0.005,
    automatic: false,
    pellets: 1,
    maxRange: 70,
    armorPenetration: 0.64,
    moveSpeedScale: 1.03,
    description: 'T 默认手枪 · 大弹匣',
  },
  usp: {
    id: 'usp',
    name: 'USP-S',
    shortName: 'USP',
    slot: 'secondary',
    damage: 24,
    fireInterval: 0.19,
    magSize: 12,
    reserveAmmo: 36,
    reloadTime: 2.05,
    spread: 0.012,
    moveSpread: 0.039,
    airSpread: 0.09,
    recoilPitch: 0.0055,
    recoilYaw: 0.0038,
    automatic: false,
    pellets: 1,
    maxRange: 75,
    armorPenetration: 0.7,
    moveSpeedScale: 1.03,
    description: 'CT 默认手枪 · 精准',
  },
  deagle: {
    id: 'deagle',
    name: 'Desert Eagle',
    shortName: 'DEAGLE',
    slot: 'secondary',
    damage: 29,
    fireInterval: 0.34,
    magSize: 7,
    reserveAmmo: 28,
    reloadTime: 2.15,
    spread: 0.013,
    moveSpread: 0.065,
    airSpread: 0.16,
    recoilPitch: 0.019,
    recoilYaw: 0.01,
    automatic: false,
    pellets: 1,
    maxRange: 85,
    armorPenetration: 0.86,
    moveSpeedScale: 1.0,
    description: '高穿透 · 7 发弹匣',
  },
  knife: {
    id: 'knife',
    name: '军刀',
    shortName: 'KNIFE',
    slot: 'melee',
    damage: 55,
    fireInterval: 0.52,
    magSize: 0,
    reserveAmmo: 0,
    reloadTime: 0,
    spread: 0.02,
    moveSpread: 0.02,
    airSpread: 0.02,
    recoilPitch: 0.002,
    recoilYaw: 0.004,
    automatic: true,
    pellets: 1,
    maxRange: 2.6,
    armorPenetration: 0.5,
    moveSpeedScale: 1.08,
    description: '近战 · 快速连击',
  },
};

export const PART_MULTIPLIERS: Record<HitPart, number> = {
  head: 2,
  chest: 1,
  stomach: 0.85,
  arm: 0.7,
  leg: 0.6,
};

export const PLAYER_LOADOUT_OPTIONS: Record<Team, { primaries: WeaponId[]; pistols: WeaponId[] }> = {
  T: {
    primaries: ['ak47', 'awp'],
    pistols: ['glock', 'deagle'],
  },
  CT: {
    primaries: ['m4a4', 'awp'],
    pistols: ['usp', 'deagle'],
  },
};

export function defaultPistolForTeam(team: Team): WeaponId {
  return team === 'T' ? 'glock' : 'usp';
}

export function pistolRoundLoadout(team: Team): LoadoutSpec {
  return {
    primary: null,
    secondary: defaultPistolForTeam(team),
    armor: 0,
    helmet: false,
  };
}

export function standardBotLoadout(team: Team, round: number, index: number): LoadoutSpec {
  if (round <= 1) return pistolRoundLoadout(team);
  const awpSlot = round >= 3 && (index === 2 || (round > 5 && index === 4));
  return {
    primary: awpSlot ? 'awp' : team === 'T' ? 'ak47' : 'm4a4',
    secondary: index === 0 && round >= 4 ? 'deagle' : defaultPistolForTeam(team),
    armor: 100,
    helmet: true,
  };
}

export function createWeaponRuntime(id: WeaponId, full = true): WeaponRuntime {
  const def = WEAPONS[id];
  return {
    id,
    slot: def.slot,
    ammo: def.slot === 'melee' ? 1 : full ? def.magSize : 0,
    reserve: full ? def.reserveAmmo : 0,
    nextFireAt: 0,
    reloadEnd: 0,
    reloading: false,
    scoped: false,
    lastShotAt: -100,
    shotCount: 0,
  };
}

export function loadoutToRuntimes(spec: LoadoutSpec): {
  primary: WeaponRuntime | null;
  secondary: WeaponRuntime;
  melee: WeaponRuntime;
} {
  return {
    primary: spec.primary ? createWeaponRuntime(spec.primary) : null,
    secondary: createWeaponRuntime(spec.secondary),
    melee: createWeaponRuntime('knife'),
  };
}

export function weaponName(id: WeaponId): string {
  return WEAPONS[id]?.name ?? id;
}

export function slotForWeapon(id: WeaponId): WeaponSlot {
  return WEAPONS[id].slot;
}

// Data-driven weapon definitions. Adding a weapon = adding an entry here (+ an optional model
// builder in render/weaponModels.ts and a sound profile in audio/AudioEngine.ts).

export type WeaponId = 'ak47' | 'm4a4' | 'awp' | 'glock' | 'usp' | 'deagle' | 'knife' | 'c4';
export type Slot = 'primary' | 'secondary' | 'melee' | 'bomb';
export type HitZone = 'head' | 'chest' | 'stomach' | 'arm' | 'leg';
export type Team = 'T' | 'CT';

/** Damage multipliers per hitbox zone. Headshots deal exactly twice the (chest) body damage. */
export const ZONE_MULTIPLIER: Record<HitZone, number> = {
  head: 2.0,
  chest: 1.0,
  stomach: 0.85,
  arm: 0.7,
  leg: 0.55,
};

export const ZONE_LABEL: Record<HitZone, string> = {
  head: '头部',
  chest: '胸部',
  stomach: '腹部',
  arm: '手臂',
  leg: '腿部',
};

export interface SpreadProfile {
  /** Base inaccuracy (degrees) standing still. */
  stand: number;
  crouch: number;
  /** Extra inaccuracy at full run speed. */
  move: number;
  /** Extra inaccuracy while airborne. */
  air: number;
  /** Extra inaccuracy added per consecutive shot. */
  perShot: number;
  maxRecoil: number;
  /** Consecutive-shot counter recovery (shots per second) once the trigger is released. */
  recover: number;
  /** For scoped weapons: inaccuracy when NOT scoped (replaces stand/crouch). */
  unscoped?: number;
}

export interface RecoilProfile {
  /** View punch per shot (degrees, pitch up). */
  pitch: number;
  /** Additional pitch per consecutive shot (up to growthShots). */
  pitchGrowth: number;
  growthShots: number;
  /** Horizontal kick amplitude (degrees), starts after yawStartShot. */
  yaw: number;
  yawStartShot: number;
  maxPitch: number;
  /** Punch recovery rate (1/s) while firing and after firing. */
  decayFiring: number;
  decayIdle: number;
}

export interface WeaponDef {
  id: WeaponId;
  name: string;
  slot: Slot;
  /** Base damage per bullet before zone multiplier and armor. */
  damage: number;
  /** Fraction of damage that goes through armor to health (CS "armor ratio"). */
  armorPen: number;
  /** Damage multiplier per 10 m travelled. */
  rangeMod: number;
  range: number;
  fireInterval: number;
  auto: boolean;
  magSize: number;
  reserveMax: number;
  reloadTime: number;
  drawTime: number;
  /** Max run speed (m/s) while holding this weapon. */
  moveSpeed: number;
  scopedMoveSpeed?: number;
  spread: SpreadProfile;
  recoil: RecoilProfile;
  /** Zoom levels (vertical FOV in degrees). */
  scopeFovs?: number[];
  /** Melee only: secondary (stab) damage/interval/range. */
  melee?: { slashDamage: number; slashInterval: number; stabDamage: number; stabInterval: number; range: number };
  /** Short label for kill-feed. */
  icon: string;
}

const NO_RECOIL: RecoilProfile = {
  pitch: 0,
  pitchGrowth: 0,
  growthShots: 0,
  yaw: 0,
  yawStartShot: 0,
  maxPitch: 0,
  decayFiring: 10,
  decayIdle: 10,
};

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  ak47: {
    id: 'ak47',
    name: 'AK-47',
    slot: 'primary',
    damage: 40,
    armorPen: 0.775,
    rangeMod: 0.98,
    range: 250,
    fireInterval: 0.1,
    auto: true,
    magSize: 30,
    reserveMax: 90,
    reloadTime: 2.45,
    drawTime: 1.0,
    moveSpeed: 5.2,
    spread: { stand: 0.3, crouch: 0.2, move: 6.0, air: 14, perShot: 0.6, maxRecoil: 6.5, recover: 9 },
    recoil: { pitch: 1.15, pitchGrowth: 0.1, growthShots: 9, yaw: 0.55, yawStartShot: 4, maxPitch: 12, decayFiring: 2.0, decayIdle: 8 },
    icon: 'AK-47',
  },
  m4a4: {
    id: 'm4a4',
    name: 'M4A4',
    slot: 'primary',
    damage: 33,
    armorPen: 0.7,
    rangeMod: 0.97,
    range: 250,
    fireInterval: 0.09,
    auto: true,
    magSize: 30,
    reserveMax: 90,
    reloadTime: 3.1,
    drawTime: 1.0,
    moveSpeed: 5.45,
    spread: { stand: 0.22, crouch: 0.14, move: 5.0, air: 13, perShot: 0.3, maxRecoil: 3.2, recover: 11 },
    recoil: { pitch: 0.5, pitchGrowth: 0.035, growthShots: 8, yaw: 0.2, yawStartShot: 6, maxPitch: 5.5, decayFiring: 3.4, decayIdle: 10 },
    icon: 'M4A4',
  },
  awp: {
    id: 'awp',
    name: 'AWP',
    slot: 'primary',
    damage: 125,
    armorPen: 0.975,
    rangeMod: 0.99,
    range: 300,
    fireInterval: 1.46,
    auto: false,
    magSize: 10,
    reserveMax: 30,
    reloadTime: 3.6,
    drawTime: 1.15,
    moveSpeed: 4.8,
    scopedMoveSpeed: 2.4,
    spread: { stand: 0.04, crouch: 0.03, move: 7, air: 20, perShot: 0, maxRecoil: 0, recover: 10, unscoped: 8 },
    recoil: { pitch: 3.2, pitchGrowth: 0, growthShots: 0, yaw: 0.4, yawStartShot: 0, maxPitch: 6, decayFiring: 3.5, decayIdle: 4 },
    scopeFovs: [40, 15],
    icon: 'AWP',
  },
  glock: {
    id: 'glock',
    name: 'Glock-18',
    slot: 'secondary',
    damage: 22,
    armorPen: 0.47,
    rangeMod: 0.85,
    range: 120,
    fireInterval: 0.15,
    auto: false,
    magSize: 20,
    reserveMax: 120,
    reloadTime: 2.2,
    drawTime: 0.55,
    moveSpeed: 5.8,
    spread: { stand: 0.55, crouch: 0.4, move: 2.4, air: 8, perShot: 0.7, maxRecoil: 4, recover: 6 },
    recoil: { pitch: 0.9, pitchGrowth: 0.05, growthShots: 5, yaw: 0.3, yawStartShot: 2, maxPitch: 5, decayFiring: 4, decayIdle: 9 },
    icon: 'Glock',
  },
  usp: {
    id: 'usp',
    name: 'USP-S',
    slot: 'secondary',
    damage: 28,
    armorPen: 0.505,
    rangeMod: 0.91,
    range: 140,
    fireInterval: 0.17,
    auto: false,
    magSize: 12,
    reserveMax: 24,
    reloadTime: 2.2,
    drawTime: 0.55,
    moveSpeed: 5.8,
    spread: { stand: 0.38, crouch: 0.28, move: 2.2, air: 8, perShot: 0.85, maxRecoil: 4, recover: 6 },
    recoil: { pitch: 1.1, pitchGrowth: 0.05, growthShots: 5, yaw: 0.3, yawStartShot: 2, maxPitch: 5, decayFiring: 4, decayIdle: 9 },
    icon: 'USP-S',
  },
  deagle: {
    id: 'deagle',
    name: 'Desert Eagle',
    slot: 'secondary',
    damage: 31,
    armorPen: 0.93,
    rangeMod: 0.86,
    range: 160,
    fireInterval: 0.225,
    auto: false,
    magSize: 7,
    reserveMax: 35,
    reloadTime: 2.2,
    drawTime: 0.65,
    moveSpeed: 5.6,
    spread: { stand: 0.3, crouch: 0.22, move: 4.0, air: 10, perShot: 2.6, maxRecoil: 7, recover: 3.5 },
    recoil: { pitch: 3.0, pitchGrowth: 0.2, growthShots: 3, yaw: 0.8, yawStartShot: 1, maxPitch: 9, decayFiring: 3, decayIdle: 6 },
    icon: 'Deagle',
  },
  knife: {
    id: 'knife',
    name: 'Knife',
    slot: 'melee',
    damage: 40,
    armorPen: 0.85,
    rangeMod: 1,
    range: 1.7,
    fireInterval: 0.4,
    auto: true,
    magSize: 0,
    reserveMax: 0,
    reloadTime: 0,
    drawTime: 0.45,
    moveSpeed: 6.0,
    spread: { stand: 0, crouch: 0, move: 0, air: 0, perShot: 0, maxRecoil: 0, recover: 10 },
    recoil: NO_RECOIL,
    melee: { slashDamage: 40, slashInterval: 0.4, stabDamage: 65, stabInterval: 1.0, range: 1.7 },
    icon: 'Knife',
  },
  c4: {
    id: 'c4',
    name: 'C4',
    slot: 'bomb',
    damage: 0,
    armorPen: 1,
    rangeMod: 1,
    range: 0,
    fireInterval: 0.2,
    auto: true,
    magSize: 0,
    reserveMax: 0,
    reloadTime: 0,
    drawTime: 0.6,
    moveSpeed: 5.8,
    spread: { stand: 0, crouch: 0, move: 0, air: 0, perShot: 0, maxRecoil: 0, recover: 10 },
    recoil: NO_RECOIL,
    icon: 'C4',
  },
};

export interface WeaponInst {
  def: WeaponDef;
  mag: number;
  reserve: number;
}

export function makeWeapon(id: WeaponId): WeaponInst {
  const def = WEAPONS[id];
  return { def, mag: def.magSize, reserve: def.reserveMax };
}

export const DEFAULT_PISTOL: Record<Team, WeaponId> = { T: 'glock', CT: 'usp' };
export const DEFAULT_RIFLE: Record<Team, WeaponId> = { T: 'ak47', CT: 'm4a4' };

/** Round loadout presets ("pistol round" is the standard CS first round). */
export type RoundType = 'pistol' | 'rifle';

export interface LoadoutPreset {
  label: string;
  primary: boolean;
  armor: number;
  helmet: boolean;
  defuseKit: boolean;
  /** Weapons available from the buy menu during buy time. */
  buyable: WeaponId[];
}

export const ROUND_PRESETS: Record<RoundType, LoadoutPreset> = {
  pistol: {
    label: '手枪局',
    primary: false,
    // Pistol-round configuration: kevlar vest only (no helmet), no kits, pistols only.
    armor: 100,
    helmet: false,
    defuseKit: false,
    buyable: ['deagle', 'glock', 'usp'],
  },
  rifle: {
    label: '长枪局',
    primary: true,
    armor: 100,
    helmet: true,
    defuseKit: true,
    buyable: ['ak47', 'm4a4', 'awp', 'deagle', 'glock', 'usp'],
  },
};

/** CS-style armor model: armored zones convert part of the damage into armor loss. */
export function computeDamage(
  rawDamage: number,
  zone: HitZone,
  armorPen: number,
  armor: number,
  helmet: boolean,
): { health: number; armor: number; armored: boolean } {
  const dmg = rawDamage * ZONE_MULTIPLIER[zone];
  const protectedZone = zone === 'head' ? helmet : zone !== 'leg';
  if (armor > 0 && protectedZone) {
    let health = dmg * armorPen;
    let armorDmg = (dmg - health) * 0.5;
    if (armorDmg > armor) {
      armorDmg = armor;
      health = dmg - armor * 2;
    }
    return { health: Math.max(0, Math.round(health)), armor: Math.round(armorDmg), armored: true };
  }
  return { health: Math.round(dmg), armor: 0, armored: false };
}

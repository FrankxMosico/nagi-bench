import type {
  BoxSpec,
  MapCallout,
  ObjectivePoint,
  PlantSite,
  RectSpec,
  SpawnPoint,
  WallSpec,
} from '../game/types';

/**
 * A playable, spatially coherent interpretation of de_dust2's core loop.
 *
 * Coordinate convention:
 *   +X = east (right on the tactical map)
 *   +Z = south (down on the tactical map)
 *   y  = up
 *
 * CT spawn is west/center, T spawn is south-east, A is south-west,
 * B is north-west. Long, Mid/Doors/Catwalk and B Tunnels connect them.
 */
export const MAP_BOUNDS = { minX: -58, maxX: 58, minZ: -62, maxZ: 62 };

export const FLOOR_RECTS: RectSpec[] = [
  { id: 't_spawn', label: 'T SPAWN', x1: 28, z1: 30, x2: 54, z2: 56, style: 'sand' },
  { id: 'a_long', label: 'A LONG', x1: -18, z1: 46, x2: 28, z2: 58, style: 'sand' },
  { id: 'a_site', label: 'A SITE', x1: -54, z1: 24, x2: -18, z2: 56, style: 'concrete' },
  { id: 'catwalk', label: 'CATWALK', x1: -18, z1: 24, x2: 0, z2: 34, style: 'stone' },
  { id: 'mid', label: 'MID', x1: 0, z1: -12, x2: 12, z2: 38, style: 'sand' },
  { id: 't_mid', label: 'T MID', x1: 12, z1: 26, x2: 28, z2: 36, style: 'sand' },
  { id: 'ct_spawn', label: 'CT SPAWN', x1: -44, z1: -18, x2: -20, z2: 2, style: 'concrete' },
  { id: 'ct_mid', label: 'CT MID', x1: -20, z1: -10, x2: 0, z2: 0, style: 'sand' },
  { id: 'ct_ramp', label: 'A RAMP', x1: -40, z1: 2, x2: -28, z2: 24, style: 'concrete' },
  { id: 'b_site', label: 'B SITE', x1: -54, z1: -58, x2: -20, z2: -30, style: 'concrete' },
  { id: 'ct_b', label: 'B DOORS', x1: -38, z1: -30, x2: -26, z2: -18, style: 'concrete' },
  { id: 'b_tunnel_main', label: 'B TUNNELS', x1: 40, z1: -26, x2: 52, z2: 30, style: 'tunnel' },
  { id: 'b_tunnel_horizontal', x1: -16, z1: -26, x2: 52, z2: -14, style: 'tunnel' },
  { id: 'b_tunnel_west', x1: -20, z1: -46, x2: -8, z2: -14, style: 'tunnel' },
];

export const PLANT_SITES: PlantSite[] = [
  {
    id: 'A',
    label: 'A',
    x1: -49,
    z1: 28,
    x2: -23,
    z2: 51,
    centerX: -36,
    centerZ: 39.5,
  },
  {
    id: 'B',
    label: 'B',
    x1: -49,
    z1: -54,
    x2: -25,
    z2: -33,
    centerX: -37,
    centerZ: -43.5,
  },
];

/** Five fixed spawns per side. The first is the human player's spawn. */
export const SPAWNS: Record<'T' | 'CT', SpawnPoint[]> = {
  T: [
    { x: 44, z: 39, yaw: 1.2 },
    { x: 48, z: 43, yaw: 1.05 },
    { x: 40, z: 44, yaw: 1.32 },
    { x: 49, z: 51, yaw: 1.16 },
    { x: 37, z: 51, yaw: 1.42 },
  ],
  CT: [
    { x: -31, z: -11, yaw: -2.15 },
    { x: -36, z: -7, yaw: -2.0 },
    { x: -27, z: -6, yaw: -2.35 },
    { x: -39, z: -13, yaw: -1.88 },
    { x: -25, z: -14, yaw: -2.4 },
  ],
};

export const MAP_CALLOUTS: MapCallout[] = [
  { id: 't_spawn', x: 41, z: 43, name: 'T SPAWN' },
  { id: 'ct_spawn', x: -32, z: -8, name: 'CT SPAWN' },
  { id: 'a_site', x: -35, z: 39, name: 'A SITE' },
  { id: 'b_site', x: -37, z: -43, name: 'B SITE' },
  { id: 'long', x: 4, z: 52, name: 'LONG A' },
  { id: 'doors', x: 6, z: 2, name: 'MID DOORS' },
  { id: 'catwalk', x: -10, z: 29, name: 'CATWALK' },
  { id: 'tunnels', x: 44, z: 12, name: 'B TUNNELS' },
  { id: 't_mid', x: 20, z: 31, name: 'T MID' },
  { id: 'ct_mid', x: -8, z: -5, name: 'CT MID' },
  { id: 'ramp', x: -34, z: 14, name: 'A RAMP' },
  { id: 'b_doors', x: -32, z: -24, name: 'B DOORS' },
];

export const COVER_BOXES: BoxSpec[] = [
  // T spawn / Long A
  { x: 51.2, z: 33.8, w: 3, d: 3, h: 1.5, kind: 'crate' },
  { x: 51.2, z: 36.1, w: 2.1, d: 2.1, h: 1.05, kind: 'crate' },
  { x: 30.8, z: 53.2, w: 3.4, d: 2.3, h: 1.35, kind: 'crate' },
  { x: 38.2, z: 54.0, w: 1.0, d: 1.0, h: 1.9, kind: 'barrel' },
  { x: 8.5, z: 55.6, w: 3.2, d: 2.5, h: 1.45, kind: 'crate', rot: -0.08 },
  { x: -11.5, z: 47.4, w: 2.3, d: 2.3, h: 1.25, kind: 'crate' },
  { x: 2.6, z: 54.6, w: 1.0, d: 1.0, h: 1.85, kind: 'barrel' },
  // A site
  { x: -29.5, z: 34.1, w: 3.4, d: 3.4, h: 1.6, kind: 'crate', stack: 2 },
  { x: -46.2, z: 32.6, w: 3.1, d: 3.1, h: 1.8, kind: 'crate' },
  { x: -47.0, z: 29.4, w: 2.1, d: 2.1, h: 1.1, kind: 'crate' },
  { x: -48.7, z: 49.2, w: 2.5, d: 2.5, h: 1.45, kind: 'crate' },
  { x: -34.0, z: 27.2, w: 3.9, d: 1.0, h: 1.15, kind: 'concrete' },
  { x: -23.8, z: 45.4, w: 2.8, d: 2.8, h: 1.65, kind: 'crate', stack: 2 },
  { x: -43.2, z: 46.7, w: 1.05, d: 1.05, h: 1.9, kind: 'barrel' },
  { x: -18.9, z: 27.8, w: 1.1, d: 1.1, h: 1.9, kind: 'barrel' },
  // Mid / catwalk
  { x: 9.9, z: 30.9, w: 2.4, d: 2.4, h: 1.3, kind: 'crate' },
  { x: 9.7, z: 12.1, w: 2.6, d: 2.6, h: 1.5, kind: 'crate' },
  { x: 2.0, z: -9.0, w: 1.8, d: 1.8, h: 1.1, kind: 'crate' },
  { x: -15.5, z: 26.2, w: 1.0, d: 1.0, h: 1.85, kind: 'barrel' },
  // CT spawn / ramp
  { x: -21.7, z: -15.7, w: 2.8, d: 2.8, h: 1.45, kind: 'crate' },
  { x: -41.4, z: -0.1, w: 2.3, d: 2.3, h: 1.2, kind: 'crate' },
  { x: -39.3, z: 10.5, w: 1.0, d: 1.0, h: 1.8, kind: 'barrel' },
  // B site
  { x: -34.2, z: -43.8, w: 4.2, d: 4.2, h: 2.2, kind: 'crate', stack: 2 },
  { x: -44.5, z: -49.8, w: 3.2, d: 3.2, h: 1.65, kind: 'crate' },
  { x: -47.8, z: -52.5, w: 2.2, d: 2.2, h: 1.2, kind: 'crate' },
  { x: -49.0, z: -35.4, w: 2.6, d: 2.6, h: 1.55, kind: 'crate' },
  { x: -27.5, z: -35.0, w: 3.2, d: 1.0, h: 1.2, kind: 'concrete' },
  { x: -23.4, z: -54.0, w: 2.8, d: 2.8, h: 1.5, kind: 'metal' },
  { x: -47.5, z: -44.5, w: 1.0, d: 1.0, h: 1.9, kind: 'barrel' },
  // B tunnels
  { x: 50.3, z: 20.5, w: 2.3, d: 2.3, h: 1.25, kind: 'crate' },
  { x: 50.4, z: 4.4, w: 1.0, d: 1.0, h: 1.85, kind: 'barrel' },
  { x: 15.3, z: -23.4, w: 2.8, d: 2.1, h: 1.4, kind: 'crate' },
  { x: -13.0, z: -20.0, w: 2.0, d: 2.0, h: 1.2, kind: 'crate' },
  { x: -17.8, z: -37.8, w: 2.2, d: 2.2, h: 1.35, kind: 'crate' },
  { x: 42.2, z: -21.8, w: 3.0, d: 2.0, h: 1.35, kind: 'crate' },
];

/** Extra internal structural walls that create recognisable Dust2 cover. */
export const STRUCTURES: WallSpec[] = [
  // A site: low wall near the ramp, leaving the main site open.
  { x1: -31.0, z1: 31.5, x2: -31.0, z2: 34.2, height: 1.5, thickness: 0.9, style: 'plaster' },
  // B site: partition around the back of the site.
  { x1: -49.5, z1: -41.4, x2: -46.8, z2: -41.4, height: 1.6, thickness: 0.8, style: 'plaster' },
  { x1: -47.4, z1: -41.4, x2: -47.4, z2: -37.0, height: 1.6, thickness: 0.8, style: 'plaster' },
  // Tunnel supports / chicanes (not blocking the path).
  { x1: 39.7, z1: -7.0, x2: 43.3, z2: -7.0, height: 2.3, thickness: 0.9, style: 'tunnel' },
  { x1: 48.7, z1: -7.0, x2: 52.3, z2: -7.0, height: 2.3, thickness: 0.9, style: 'tunnel' },
  { x1: 23.0, z1: -10.4, x2: 23.0, z2: -5.2, height: 2.7, thickness: 0.9, style: 'tunnel' },
  // Mid door-side pillars are visual frames, placed just outside the travel lane.
  { x1: 0.0, z1: 1.5, x2: 0.0, z2: 2.1, height: 3.1, thickness: 1.1, style: 'plaster' },
  { x1: 12.0, z1: 1.5, x2: 12.0, z2: 2.1, height: 3.1, thickness: 1.1, style: 'plaster' },
];

export const OBJECTIVE_POINTS: ObjectivePoint[] = [
  // T staging points
  { id: 't_a_long', x: -4, z: 52, label: 'A Long' },
  { id: 't_a_short', x: -14, z: 29, label: 'Catwalk' },
  { id: 't_b_tunnel', x: -15, z: -40, label: 'B Tunnel' },
  { id: 't_mid', x: 18, z: 31, label: 'T Mid' },
  // A site holds
  { id: 'a_ramp_hold', x: -34, z: 28, label: 'A Ramp' },
  { id: 'a_default_hold', x: -38, z: 36, label: 'A Default' },
  { id: 'a_long_hold', x: -25, z: 47, label: 'A Long' },
  { id: 'a_back_hold', x: -47, z: 42, label: 'A Back' },
  // B site holds
  { id: 'b_back_hold', x: -44, z: -42, label: 'B Back' },
  { id: 'b_plat_hold', x: -32, z: -50, label: 'B Platform' },
  { id: 'b_tunnel_hold', x: -26, z: -38, label: 'B Tunnel' },
  { id: 'b_doors_hold', x: -40, z: -26, label: 'B Doors' },
  // Mid and rotation points
  { id: 'mid_doors', x: 6, z: 7, label: 'Mid Doors' },
  { id: 'ct_mid_hold', x: -9, z: -5, label: 'CT Mid' },
  { id: 'catwalk_hold', x: -11, z: 29, label: 'Catwalk' },
];

export function isInPlantSite(x: number, z: number, site: PlantSite): boolean {
  return x >= site.x1 && x <= site.x2 && z >= site.z1 && z <= site.z2;
}

export function getPlantSiteAt(x: number, z: number): PlantSite | null {
  return PLANT_SITES.find((site) => isInPlantSite(x, z, site)) ?? null;
}

export function getZoneAt(x: number, z: number): string {
  for (const rect of FLOOR_RECTS) {
    if (x >= rect.x1 && x <= rect.x2 && z >= rect.z1 && z <= rect.z2) {
      return rect.label ?? rect.id;
    }
  }
  return 'DUST II';
}

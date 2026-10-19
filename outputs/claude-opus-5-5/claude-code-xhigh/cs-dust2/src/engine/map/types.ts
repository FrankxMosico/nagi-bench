import type { Vec3 } from '../math.ts';

export type MaterialId =
  | 'wall_sand'
  | 'wall_plaster'
  | 'wall_trim'
  | 'floor_sand'
  | 'floor_stone'
  | 'floor_tile'
  | 'floor_dark'
  | 'crate'
  | 'crate_dark'
  | 'metal_blue'
  | 'metal_red'
  | 'door_blue'
  | 'roof_wood'
  | 'car';

export type BoxKind = 'floor' | 'wall' | 'prop' | 'door' | 'roof';

/** A walkable rectangular region of the map; everything that is not a room/ramp becomes wall. */
export interface RoomDef {
  id: string;
  /** Chinese callout shown in the HUD. */
  name: string;
  en: string;
  x0: number;
  z0: number;
  x1: number;
  z1: number;
  /** Floor height (metres). */
  h: number;
  floor: MaterialId;
}

/** Linear ramp/stairs. h0 is the height at the min coordinate along `axis`, h1 at the max. */
export interface RampDef {
  id: string;
  name: string;
  en: string;
  x0: number;
  z0: number;
  x1: number;
  z1: number;
  axis: 'x' | 'z';
  h0: number;
  h1: number;
  floor: MaterialId;
}

export interface PropDef {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
  /** Base height. */
  y: number;
  /** Height of the box. */
  h: number;
  mat: MaterialId;
  kind: BoxKind;
}

export interface Rect {
  x0: number;
  z0: number;
  x1: number;
  z1: number;
}

export type SiteId = 'A' | 'B';

export interface HoldSpot {
  pos: Vec3;
  /** Point the bot should watch while holding. */
  look: Vec3;
  label: string;
}

export interface MapDefinition {
  name: string;
  bounds: Rect;
  rooms: RoomDef[];
  ramps: RampDef[];
  props: PropDef[];
  bombSites: Record<SiteId, Rect>;
  spawns: { T: Vec3[]; CT: Vec3[] };
  /** Named T attack routes (waypoint lists), executed with A* between waypoints. */
  routes: Record<string, Vec3[]>;
  ctHolds: Record<'A' | 'B' | 'mid', HoldSpot[]>;
  tHolds: Record<SiteId, HoldSpot[]>;
  /** Where CTs regroup before retaking a planted site. */
  retakeStaging: Record<SiteId, HoldSpot>;
  plantSpots: Record<SiteId, Vec3[]>;
  labels: { text: string; x: number; z: number; size: number }[];
}

export interface StaticBox {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  kind: BoxKind;
  mat: MaterialId;
  /** Material for the top face (floors use the room floor material, sides use walls). */
  topMat: MaterialId;
}

export interface Ramp {
  minX: number;
  minZ: number;
  maxX: number;
  maxZ: number;
  axis: 'x' | 'z';
  h0: number;
  h1: number;
  mat: MaterialId;
}

import type { MapDefinition, Ramp, RoomDef, StaticBox } from './types.ts';

export interface BuiltMap {
  def: MapDefinition;
  boxes: StaticBox[];
  ramps: Ramp[];
  /** 1 m occupancy grid (used by the minimap and wall generation). */
  grid: { x0: number; z0: number; w: number; h: number; walk: Uint8Array; wall: Uint8Array };
}

const WALL_THICKNESS = 2; // cells (metres)
const FLOOR_BOTTOM = -1;

function hash2(x: number, z: number): number {
  let h = (Math.imul(x | 0, 73856093) ^ Math.imul(z | 0, 19349663)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) >>> 0;
  return (h ^ (h >>> 15)) >>> 0;
}

/**
 * Turns the authored room/ramp/prop description into collision + render boxes.
 * Walls are generated automatically: every 1 m cell that is not walkable but lies within
 * WALL_THICKNESS of a walkable cell becomes wall, then cells are greedily merged into boxes.
 */
export function buildMap(def: MapDefinition): BuiltMap {
  const gx0 = Math.floor(def.bounds.x0) - 4;
  const gz0 = Math.floor(def.bounds.z0) - 4;
  const w = Math.ceil(def.bounds.x1 - def.bounds.x0) + 8;
  const h = Math.ceil(def.bounds.z1 - def.bounds.z0) + 8;
  const walk = new Uint8Array(w * h);
  const wall = new Uint8Array(w * h);

  const mark = (x0: number, z0: number, x1: number, z1: number) => {
    for (let z = Math.round(z0); z < Math.round(z1); z++) {
      for (let x = Math.round(x0); x < Math.round(x1); x++) {
        const i = x - gx0;
        const j = z - gz0;
        if (i >= 0 && j >= 0 && i < w && j < h) walk[j * w + i] = 1;
      }
    }
  };
  for (const r of def.rooms) mark(r.x0, r.z0, r.x1, r.z1);
  for (const r of def.ramps) mark(r.x0, r.z0, r.x1, r.z1);

  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (walk[j * w + i]) continue;
      let near = false;
      for (let dj = -WALL_THICKNESS; dj <= WALL_THICKNESS && !near; dj++) {
        for (let di = -WALL_THICKNESS; di <= WALL_THICKNESS; di++) {
          const ii = i + di;
          const jj = j + dj;
          if (ii < 0 || jj < 0 || ii >= w || jj >= h) continue;
          if (walk[jj * w + ii]) {
            near = true;
            break;
          }
        }
      }
      if (near) wall[j * w + i] = 1;
    }
  }

  const boxes: StaticBox[] = [];

  // Greedy rectangle merge of wall cells.
  const used = new Uint8Array(w * h);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const idx = j * w + i;
      if (!wall[idx] || used[idx]) continue;
      let rw = 1;
      while (i + rw < w && wall[j * w + i + rw] && !used[j * w + i + rw]) rw++;
      let rh = 1;
      outer: while (j + rh < h) {
        for (let k = 0; k < rw; k++) {
          const c = (j + rh) * w + i + k;
          if (!wall[c] || used[c]) break outer;
        }
        rh++;
      }
      for (let jj = 0; jj < rh; jj++) for (let k = 0; k < rw; k++) used[(j + jj) * w + i + k] = 1;
      const x0 = gx0 + i;
      const z0 = gz0 + j;
      const height = 6.5 + (hash2(x0, z0) % 6) * 0.5;
      const mat = hash2(z0, x0) % 3 === 0 ? 'wall_plaster' : 'wall_sand';
      boxes.push({
        minX: x0,
        minY: FLOOR_BOTTOM,
        minZ: z0,
        maxX: x0 + rw,
        maxY: height,
        maxZ: z0 + rh,
        kind: 'wall',
        mat,
        topMat: 'wall_trim',
      });
    }
  }

  // Floors: solid slabs from below ground to the floor height so ledges are real geometry.
  const addFloor = (r: Pick<RoomDef, 'x0' | 'z0' | 'x1' | 'z1' | 'floor'>, top: number) => {
    boxes.push({
      minX: r.x0,
      minY: FLOOR_BOTTOM,
      minZ: r.z0,
      maxX: r.x1,
      maxY: top,
      maxZ: r.z1,
      kind: 'floor',
      mat: 'wall_sand',
      topMat: r.floor,
    });
  };
  for (const r of def.rooms) addFloor(r, r.h);

  const ramps: Ramp[] = [];
  for (const r of def.ramps) {
    const base = Math.min(r.h0, r.h1);
    addFloor(r, base);
    ramps.push({ minX: r.x0, minZ: r.z0, maxX: r.x1, maxZ: r.z1, axis: r.axis, h0: r.h0, h1: r.h1, mat: r.floor });
  }

  for (const p of def.props) {
    boxes.push({
      minX: p.x0,
      minY: p.y,
      minZ: p.z0,
      maxX: p.x1,
      maxY: p.y + p.h,
      maxZ: p.z1,
      kind: p.kind,
      mat: p.mat,
      topMat: p.mat,
    });
  }

  return { def, boxes, ramps, grid: { x0: gx0, z0: gz0, w, h, walk, wall } };
}

/** Floor height of the authored rooms/ramps at (x, z) — used for spawning items and labels. */
export function authoredFloorHeight(def: MapDefinition, x: number, z: number): number {
  for (const r of def.rooms) {
    if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) return r.h;
  }
  for (const r of def.ramps) {
    if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) {
      const t = r.axis === 'x' ? (x - r.x0) / (r.x1 - r.x0) : (z - r.z0) / (r.z1 - r.z0);
      return r.h0 + (r.h1 - r.h0) * t;
    }
  }
  return 0;
}

/** Name of the callout area containing (x, z). */
export function calloutAt(def: MapDefinition, x: number, z: number): string {
  for (const r of def.rooms) {
    if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) return r.name;
  }
  for (const r of def.ramps) {
    if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1) return r.name;
  }
  return '';
}

import type { Rect, Vec2 } from './types';

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const dist2 = (a: Vec2, b: Vec2) => Math.hypot(a.x - b.x, a.z - b.z);
export const distSq2 = (a: Vec2, b: Vec2) => (a.x - b.x) ** 2 + (a.z - b.z) ** 2;

export function normalizeAngle(a: number): number {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

export function angleDelta(a: number, b: number): number {
  return normalizeAngle(b - a);
}

export function moveAngle(current: number, target: number, maxStep: number): number {
  const d = angleDelta(current, target);
  return current + clamp(d, -maxStep, maxStep);
}

export function circleRectOverlap(x: number, z: number, r: number, rect: Rect): boolean {
  const cx = clamp(x, rect.minX, rect.maxX);
  const cz = clamp(z, rect.minZ, rect.maxZ);
  return (x - cx) ** 2 + (z - cz) ** 2 < r * r;
}

export function pointInRect(x: number, z: number, rect: Rect, pad = 0): boolean {
  return x >= rect.minX - pad && x <= rect.maxX + pad && z >= rect.minZ - pad && z <= rect.maxZ + pad;
}

/** Resolve a circle against an axis aligned rectangle, pushing it out on the shallowest axis. */
export function resolveCircleRect(x: number, z: number, r: number, rect: Rect): Vec2 {
  const nearestX = clamp(x, rect.minX, rect.maxX);
  const nearestZ = clamp(z, rect.minZ, rect.maxZ);
  const dx = x - nearestX;
  const dz = z - nearestZ;
  const d2 = dx * dx + dz * dz;
  if (d2 >= r * r) return { x, z };

  if (d2 > 1e-8) {
    const d = Math.sqrt(d2);
    return { x: x + (dx / d) * (r - d), z: z + (dz / d) * (r - d) };
  }

  // Center is inside the rectangle: exit through the closest edge.
  const exits = [
    { d: x - rect.minX, x: rect.minX - r, z },
    { d: rect.maxX - x, x: rect.maxX + r, z },
    { d: z - rect.minZ, x, z: rect.minZ - r },
    { d: rect.maxZ - z, x, z: rect.maxZ + r },
  ].sort((a, b) => a.d - b.d);
  return { x: exits[0].x, z: exits[0].z };
}

/** 2D ray versus axis-aligned rectangle. Returns entry t in [0,1] or null. */
export function segmentRectT(
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  rect: Rect,
  pad = 0,
): number | null {
  const minX = rect.minX - pad;
  const maxX = rect.maxX + pad;
  const minZ = rect.minZ - pad;
  const maxZ = rect.maxZ + pad;
  const dx = x1 - x0;
  const dz = z1 - z0;
  let tmin = 0;
  let tmax = 1;

  for (const [p, d, lo, hi] of [
    [x0, dx, minX, maxX],
    [z0, dz, minZ, maxZ],
  ] as const) {
    if (Math.abs(d) < 1e-9) {
      if (p < lo || p > hi) return null;
    } else {
      let t1 = (lo - p) / d;
      let t2 = (hi - p) / d;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }
  }
  return tmin;
}

export function segmentClear2D(
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  rects: Rect[],
  pad = 0,
): boolean {
  for (const rect of rects) {
    if (segmentRectT(x0, z0, x1, z1, rect, pad) !== null) return false;
  }
  return true;
}

/** 3D slab test against a box. Returns entry distance along a normalized direction. */
export function rayAabb(
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  minX: number,
  minY: number,
  minZ: number,
  maxX: number,
  maxY: number,
  maxZ: number,
): number | null {
  let tmin = 0;
  let tmax = Infinity;
  const axes: [number, number, number, number][] = [
    [ox, dx, minX, maxX],
    [oy, dy, minY, maxY],
    [oz, dz, minZ, maxZ],
  ];
  for (const [o, d, lo, hi] of axes) {
    if (Math.abs(d) < 1e-9) {
      if (o < lo || o > hi) return null;
    } else {
      let t1 = (lo - o) / d;
      let t2 = (hi - o) / d;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }
  }
  return tmin;
}

export function randomPointInRect(rect: Rect, inset = 1): Vec2 {
  return {
    x: rand(rect.minX + inset, rect.maxX - inset),
    z: rand(rect.minZ + inset, rect.maxZ - inset),
  };
}

export function yawFromDirection(dx: number, dz: number): number {
  return Math.atan2(-dx, -dz);
}

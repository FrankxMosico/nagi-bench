import type { HitZone } from './weapons.ts';

/**
 * Hitboxes in the soldier's local frame (feet at origin, facing -Z), matching the procedural
 * character model in render/characterModel.ts. Boxes rotate with yaw (oriented boxes), and
 * interpolate between standing and crouched poses.
 */
export interface HitboxDef {
  zone: HitZone;
  c: [number, number, number];
  h: [number, number, number];
}

const STAND: HitboxDef[] = [
  { zone: 'head', c: [0, 1.665, -0.01], h: [0.125, 0.135, 0.135] },
  { zone: 'chest', c: [0, 1.32, 0], h: [0.23, 0.17, 0.14] },
  { zone: 'stomach', c: [0, 1.04, 0], h: [0.2, 0.12, 0.13] },
  { zone: 'arm', c: [0.2, 1.27, -0.12], h: [0.08, 0.12, 0.17] },
  { zone: 'arm', c: [-0.12, 1.3, -0.33], h: [0.08, 0.09, 0.28] },
  { zone: 'leg', c: [-0.11, 0.47, 0], h: [0.09, 0.47, 0.11] },
  { zone: 'leg', c: [0.11, 0.47, 0], h: [0.09, 0.47, 0.11] },
];

const CROUCH: HitboxDef[] = [
  { zone: 'head', c: [0, 1.2, -0.08], h: [0.125, 0.135, 0.135] },
  { zone: 'chest', c: [0, 0.9, -0.04], h: [0.23, 0.16, 0.15] },
  { zone: 'stomach', c: [0, 0.64, 0], h: [0.2, 0.11, 0.14] },
  { zone: 'arm', c: [0.2, 0.84, -0.16], h: [0.08, 0.12, 0.17] },
  { zone: 'arm', c: [-0.12, 0.86, -0.36], h: [0.08, 0.09, 0.28] },
  { zone: 'leg', c: [-0.11, 0.27, -0.12], h: [0.09, 0.27, 0.22] },
  { zone: 'leg', c: [0.11, 0.27, -0.12], h: [0.09, 0.27, 0.22] },
];

export interface HitboxPose {
  x: number;
  y: number;
  z: number;
  yaw: number;
  crouch: number;
}

export interface HitboxHit {
  t: number;
  zone: HitZone;
}

/** Bounding radius used for cheap rejection before testing individual boxes. */
const BOUND_R = 0.75;
const BOUND_H = 1.95;

/**
 * Ray (world space, normalised dir) vs the soldier's hitboxes. Returns the nearest zone hit
 * within maxDist, or null.
 */
export function raycastHitboxes(
  pose: HitboxPose,
  ox: number,
  oy: number,
  oz: number,
  dx: number,
  dy: number,
  dz: number,
  maxDist: number,
  out: HitboxHit,
): HitboxHit | null {
  // Cheap AABB rejection.
  if (!slab(ox - pose.x, oy - pose.y, oz - pose.z, dx, dy, dz, -BOUND_R, 0, -BOUND_R, BOUND_R, BOUND_H, BOUND_R, maxDist)) {
    return null;
  }
  // Into local frame: translate then rotate by -yaw around Y.
  const c = Math.cos(-pose.yaw);
  const s = Math.sin(-pose.yaw);
  const px = ox - pose.x;
  const py = oy - pose.y;
  const pz = oz - pose.z;
  const lox = px * c + pz * s;
  const loz = -px * s + pz * c;
  const ldx = dx * c + dz * s;
  const ldz = -dx * s + dz * c;
  const k = pose.crouch;
  let best = maxDist;
  let zone: HitZone | null = null;
  for (let i = 0; i < STAND.length; i++) {
    const a = STAND[i];
    const b = CROUCH[i];
    const cx = a.c[0] + (b.c[0] - a.c[0]) * k;
    const cy = a.c[1] + (b.c[1] - a.c[1]) * k;
    const cz = a.c[2] + (b.c[2] - a.c[2]) * k;
    const hx = a.h[0] + (b.h[0] - a.h[0]) * k;
    const hy = a.h[1] + (b.h[1] - a.h[1]) * k;
    const hz = a.h[2] + (b.h[2] - a.h[2]) * k;
    const t = slabT(lox, py, loz, ldx, dy, ldz, cx - hx, cy - hy, cz - hz, cx + hx, cy + hy, cz + hz);
    if (t >= 0 && t < best) {
      best = t;
      zone = a.zone;
    }
  }
  if (!zone) return null;
  out.t = best;
  out.zone = zone;
  return out;
}

function slabT(
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
): number {
  let tmin = -Infinity;
  let tmax = Infinity;
  if (Math.abs(dx) < 1e-12) {
    if (ox < minX || ox > maxX) return -1;
  } else {
    const a = (minX - ox) / dx;
    const b = (maxX - ox) / dx;
    tmin = Math.max(tmin, Math.min(a, b));
    tmax = Math.min(tmax, Math.max(a, b));
  }
  if (Math.abs(dy) < 1e-12) {
    if (oy < minY || oy > maxY) return -1;
  } else {
    const a = (minY - oy) / dy;
    const b = (maxY - oy) / dy;
    tmin = Math.max(tmin, Math.min(a, b));
    tmax = Math.min(tmax, Math.max(a, b));
  }
  if (Math.abs(dz) < 1e-12) {
    if (oz < minZ || oz > maxZ) return -1;
  } else {
    const a = (minZ - oz) / dz;
    const b = (maxZ - oz) / dz;
    tmin = Math.max(tmin, Math.min(a, b));
    tmax = Math.min(tmax, Math.max(a, b));
  }
  if (tmax < tmin || tmax < 0) return -1;
  return tmin < 0 ? 0 : tmin;
}

function slab(
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
  maxDist: number,
): boolean {
  const t = slabT(ox, oy, oz, dx, dy, dz, minX, minY, minZ, maxX, maxY, maxZ);
  return t >= 0 && t <= maxDist;
}

/** World-space centre of a zone (for AI aim points and debug). */
export function zoneCenter(pose: HitboxPose, zone: HitZone, out: { x: number; y: number; z: number }) {
  const idx = STAND.findIndex((h) => h.zone === zone);
  const a = STAND[idx];
  const b = CROUCH[idx];
  const k = pose.crouch;
  const lx = a.c[0] + (b.c[0] - a.c[0]) * k;
  const ly = a.c[1] + (b.c[1] - a.c[1]) * k;
  const lz = a.c[2] + (b.c[2] - a.c[2]) * k;
  const c = Math.cos(pose.yaw);
  const s = Math.sin(pose.yaw);
  out.x = pose.x + lx * c + lz * s;
  out.y = pose.y + ly;
  out.z = pose.z - lx * s + lz * c;
  return out;
}

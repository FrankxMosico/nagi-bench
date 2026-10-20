import * as THREE from "three";
import { lerpPose, type Pose } from "@agentbench/voxel-kit";

/* ------------------------------------------------------------------ scalars */

export const clamp = (v: number, a = 0, b = 1): number => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const invLerp = (a: number, b: number, v: number): number => clamp((v - a) / (b - a));
export const smooth = (t: number): number => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};
export const smoother = (t: number): number => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
export const easeIn = (t: number): number => clamp(t) ** 2;
export const easeOut = (t: number): number => 1 - (1 - clamp(t)) ** 2;
export const easeInOut = (t: number): number => {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
};
export const easeOutBack = (t: number): number => {
  const x = clamp(t);
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
};
/** 0 → 1 → 0 bump between a and b. */
export const bump = (t: number, a: number, b: number): number => {
  if (t <= a || t >= b) return 0;
  return Math.sin(((t - a) / (b - a)) * Math.PI);
};
/** Window: rises over `fin`, holds, falls over `fout`. */
export const win = (t: number, a: number, b: number, fin = 0.3, fout = 0.3): number => {
  if (t <= a || t >= b) return 0;
  return Math.min(fin > 0 ? smooth((t - a) / fin) : 1, fout > 0 ? smooth((b - t) / fout) : 1);
};
export const seg = (t: number, a: number, b: number): number => clamp((t - a) / (b - a));

/* --------------------------------------------------------------- randomness */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stateless hash in [0, 1). */
export function hash1(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
export function hash3(x: number, y: number, z: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return s - Math.floor(s);
}
export function hashInt(x: number, y = 0, z = 0): number {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Smooth 3D value noise in [0, 1]. */
export function vnoise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = fade(x - xi);
  const yf = fade(y - yi);
  const zf = fade(z - zi);
  const c = (i: number, j: number, k: number) => hashInt(xi + i, yi + j, zi + k);
  const x00 = lerp(c(0, 0, 0), c(1, 0, 0), xf);
  const x10 = lerp(c(0, 1, 0), c(1, 1, 0), xf);
  const x01 = lerp(c(0, 0, 1), c(1, 0, 1), xf);
  const x11 = lerp(c(0, 1, 1), c(1, 1, 1), xf);
  return lerp(lerp(x00, x10, yf), lerp(x01, x11, yf), zf);
}

export function fbm3(x: number, y: number, z: number, octaves = 4): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let f = 1;
  for (let i = 0; i < octaves; i++) {
    sum += vnoise3(x * f, y * f, z * f) * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2.03;
  }
  return sum / norm;
}

/** Deterministic, smooth 1D jitter for hand-held cameras and tremors. */
export function wobble(t: number, seed = 0): number {
  return (
    Math.sin(t * 1.31 + seed * 3.1) * 0.5 +
    Math.sin(t * 2.17 + seed * 1.7) * 0.3 +
    Math.sin(t * 4.73 + seed * 5.3) * 0.2
  );
}

/* ---------------------------------------------------------------- keyframes */

export type Ease = (t: number) => number;
export type Key<T> = [time: number, value: T, ease?: Ease];

function locate<T>(keys: Key<T>[], t: number): [Key<T>, Key<T>, number] {
  if (t <= keys[0]![0]) return [keys[0]!, keys[0]!, 0];
  const last = keys[keys.length - 1]!;
  if (t >= last[0]) return [last, last, 0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]!;
    const b = keys[i + 1]!;
    if (t >= a[0] && t < b[0]) {
      const ease = b[2] ?? smooth;
      return [a, b, ease((t - a[0]) / (b[0] - a[0]))];
    }
  }
  return [last, last, 0];
}

export function trackNum(keys: Key<number>[], t: number): number {
  const [a, b, k] = locate(keys, t);
  return lerp(a[1], b[1], k);
}

export type V3 = [number, number, number];

export function trackV3(keys: Key<V3>[], t: number, out = new THREE.Vector3()): THREE.Vector3 {
  const [a, b, k] = locate(keys, t);
  return out.set(lerp(a[1][0], b[1][0], k), lerp(a[1][1], b[1][1], k), lerp(a[1][2], b[1][2], k));
}

export function trackPose(keys: Key<Pose>[], t: number): Pose {
  const [a, b, k] = locate(keys, t);
  return lerpPose(a[1], b[1], k);
}

/** Step function: the value of the last key at or before t. */
export function stepAt<T>(keys: Array<[number, T]>, t: number): T {
  let v = keys[0]![1];
  for (const [kt, kv] of keys) {
    if (t >= kt) v = kv;
    else break;
  }
  return v;
}

/** Add two poses joint-wise (b is treated as an offset). */
export function addPose(a: Pose, b: Pose): Pose {
  const out: Pose = {};
  for (const j of ["hips", "neck", "armR", "armL", "legR", "legL"] as const) {
    const x = a[j] ?? [0, 0, 0];
    const y = b[j];
    out[j] = y ? [x[0] + y[0], x[1] + y[1], x[2] + y[2]] : [x[0], x[1], x[2]];
  }
  out.lift = (a.lift ?? 0) + (b.lift ?? 0);
  return out;
}

/** Override selected joints of a pose. */
export function withPose(a: Pose, over: Pose): Pose {
  return { ...a, ...over };
}

export function scalePose(a: Pose, s: number): Pose {
  const out: Pose = {};
  for (const j of ["hips", "neck", "armR", "armL", "legR", "legL"] as const) {
    const x = a[j];
    if (x) out[j] = [x[0] * s, x[1] * s, x[2] * s];
  }
  if (a.lift !== undefined) out.lift = a.lift * s;
  return out;
}

/* ------------------------------------------------------------------ vectors */

export const v3 = (x = 0, y = 0, z = 0): THREE.Vector3 => new THREE.Vector3(x, y, z);

export function lerpV(a: THREE.Vector3, b: THREE.Vector3, t: number, out = new THREE.Vector3()): THREE.Vector3 {
  return out.copy(a).lerp(b, t);
}

/** Catmull-Rom through points at parameter t ∈ [0,1]. */
export function spline(points: THREE.Vector3[], t: number, out = new THREE.Vector3()): THREE.Vector3 {
  const n = points.length - 1;
  const f = clamp(t) * n;
  const i = Math.min(n - 1, Math.floor(f));
  const u = f - i;
  const p0 = points[Math.max(0, i - 1)]!;
  const p1 = points[i]!;
  const p2 = points[i + 1]!;
  const p3 = points[Math.min(n, i + 2)]!;
  const u2 = u * u;
  const u3 = u2 * u;
  for (const k of ["x", "y", "z"] as const) {
    out[k] =
      0.5 *
      (2 * p1[k] + (-p0[k] + p2[k]) * u + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u3);
  }
  return out;
}

export function hexColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

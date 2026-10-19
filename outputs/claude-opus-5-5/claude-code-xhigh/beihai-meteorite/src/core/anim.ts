import type { Pose, Euler3 } from "@agentbench/voxel-kit";

/** Scalar timing helpers. Everything here is a pure function of its inputs. */

export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const sat = (v: number): number => clamp(v, 0, 1);
export const mix = (a: number, b: number, t: number): number => a + (b - a) * t;
export const smooth = (t: number): number => {
  const x = sat(t);
  return x * x * (3 - 2 * x);
};
export const smoother = (t: number): number => {
  const x = sat(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
export const easeOut = (t: number): number => 1 - Math.pow(1 - sat(t), 3);
export const easeIn = (t: number): number => Math.pow(sat(t), 3);
export const easeInOut = (t: number): number => {
  const x = sat(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const linear = (t: number): number => sat(t);
/** Progress of t through [a, b], clamped. */
export const range = (t: number, a: number, b: number): number => (b <= a ? (t >= b ? 1 : 0) : sat((t - a) / (b - a)));
/** 0 → 1 → 0 window with soft edges. */
export const windowed = (t: number, a: number, b: number, fin = 0.3, fout = 0.3): number => {
  if (t < a || t > b) return 0;
  const i = fin <= 0 ? 1 : smooth((t - a) / fin);
  const o = fout <= 0 ? 1 : smooth((b - t) / fout);
  return Math.min(i, o);
};
export const step = (t: number, edge: number): number => (t >= edge ? 1 : 0);

export type Ease = (t: number) => number;

/**
 * Keyframed scalar: [time, value] pairs sorted by time. Values hold before the
 * first and after the last key; between keys the ease shapes the blend.
 */
export function numTrack(keys: Array<[number, number]>, ease: Ease = smooth): (t: number) => number {
  return (t: number) => {
    if (t <= keys[0]![0]) return keys[0]![1];
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, v0] = keys[i]!;
      const [t1, v1] = keys[i + 1]!;
      if (t < t1) return mix(v0, v1, ease((t - t0) / (t1 - t0)));
    }
    return keys[keys.length - 1]![1];
  };
}

export type V3 = [number, number, number];

export function v3Track(keys: Array<[number, V3]>, ease: Ease = smooth): (t: number) => V3 {
  return (t: number) => {
    if (t <= keys[0]![0]) return [...keys[0]![1]] as V3;
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, a] = keys[i]!;
      const [t1, b] = keys[i + 1]!;
      if (t < t1) {
        const k = ease((t - t0) / (t1 - t0));
        return [mix(a[0], b[0], k), mix(a[1], b[1], k), mix(a[2], b[2], k)];
      }
    }
    return [...keys[keys.length - 1]![1]] as V3;
  };
}

const JOINTS = ["hips", "neck", "armR", "armL", "legR", "legL"] as const;

export function blendPose(a: Pose, b: Pose, t: number): Pose {
  const out: Pose = {};
  for (const j of JOINTS) {
    const f = a[j] ?? [0, 0, 0];
    const g = b[j] ?? [0, 0, 0];
    out[j] = [mix(f[0], g[0], t), mix(f[1], g[1], t), mix(f[2], g[2], t)];
  }
  out.lift = mix(a.lift ?? 0, b.lift ?? 0, t);
  return out;
}

/** Sum two poses joint by joint (b scaled by w): layering breath or tremor on acting. */
export function addPose(a: Pose, b: Pose, w = 1): Pose {
  const out: Pose = {};
  for (const j of JOINTS) {
    const f = a[j] ?? [0, 0, 0];
    const g = b[j] ?? [0, 0, 0];
    out[j] = [f[0] + g[0] * w, f[1] + g[1] * w, f[2] + g[2] * w];
  }
  out.lift = (a.lift ?? 0) + (b.lift ?? 0) * w;
  return out;
}

/** Override selected joints of a pose. */
export function withJoints(base: Pose, over: Partial<Record<(typeof JOINTS)[number], Euler3>> & { lift?: number }): Pose {
  return { ...base, ...over };
}

export type PoseSource = Pose | ((t: number) => Pose);

/**
 * Keyframed performance. Each key names a pose (or a pose generator of absolute
 * time, for breathing or fidgets). Between keys the two poses cross-fade.
 */
export function poseTrack(keys: Array<[number, PoseSource]>, ease: Ease = smooth): (t: number) => Pose {
  const at = (src: PoseSource, t: number): Pose => (typeof src === "function" ? src(t) : src);
  return (t: number) => {
    if (t <= keys[0]![0]) return at(keys[0]![1], t);
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, a] = keys[i]!;
      const [t1, b] = keys[i + 1]!;
      if (t < t1) {
        if (a === b) return at(a, t);
        return blendPose(at(a, t), at(b, t), ease((t - t0) / (t1 - t0)));
      }
    }
    return at(keys[keys.length - 1]![1], t);
  };
}

/** Discrete state track: the value of the last key at or before t. */
export function stateTrack<T>(keys: Array<[number, T]>): (t: number) => T {
  return (t: number) => {
    let v = keys[0]![1];
    for (const [k, value] of keys) {
      if (t >= k) v = value;
      else break;
    }
    return v;
  };
}

// ---------------------------------------------------------------- noise

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hash3(x: number, y: number, z: number, seed = 0): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 2147483647) ^ Math.imul(seed | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function hash1(n: number, seed = 0): number {
  return hash3(n, 17, 91, seed);
}

export function vnoise3(x: number, y: number, z: number, seed = 0): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz, seed);
  const x00 = mix(c(0, 0, 0), c(1, 0, 0), u);
  const x10 = mix(c(0, 1, 0), c(1, 1, 0), u);
  const x01 = mix(c(0, 0, 1), c(1, 0, 1), u);
  const x11 = mix(c(0, 1, 1), c(1, 1, 1), u);
  return mix(mix(x00, x10, v), mix(x01, x11, v), w);
}

export function fbm3(x: number, y: number, z: number, octaves = 4, seed = 0): number {
  let sum = 0;
  let amp = 0.5;
  let f = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += vnoise3(x * f, y * f, z * f, seed + i * 31) * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2.03;
  }
  return sum / norm;
}

/** Deterministic tremor: smooth noise in [-1, 1] sampled at time t. */
export function wobble(t: number, freq: number, seed = 0): number {
  return vnoise3(t * freq, seed * 7.31, 0.5, seed) * 2 - 1;
}

import * as THREE from "three";
import { Grid, MAT, blend, shade } from "./core/vox";
import { fbm3, hash3, mulberry32 } from "./core/anim";

/**
 * Props drawn as character grids or voxel functions, all in metres. When a prop
 * is hung on a figure anchor it is counter-scaled so it keeps its metric size.
 */

export type Palette = Record<string, number>;

/**
 * Extrude a side elevation (row 0 = top, column 0 = back, +Z forward) through
 * `slices` voxels of thickness. Uppercase/lowercase are independent palette keys;
 * keys listed in `glow` become emissive cells.
 */
export function elevation(
  art: string[],
  palette: Palette,
  slices: number,
  voxel: number,
  origin: [number, number, number],
  glow = "",
  mats = MAT,
): THREE.Group {
  const g = new Grid();
  const rows = art.length;
  for (let r = 0; r < rows; r++) {
    const line = art[r]!;
    for (let c = 0; c < line.length; c++) {
      const ch = line[c]!;
      const col = palette[ch];
      if (col === undefined) continue;
      for (let s = 0; s < slices; s++) g.set(s, rows - 1 - r, c, col, glow.includes(ch));
    }
  }
  return g.toGroup(voxel, origin, mats);
}

// ---------------------------------------------------------------- pistol

const PISTOL_PAL: Palette = {
  S: 0x2a2e33,
  s: 0x1a1d20,
  M: 0x0c0d0e,
  F: 0x34383d,
  G: 0x2e2a27,
  g: 0x3c3732,
  T: 0x151515,
  m: 0x222326,
  r: 0x55595e,
};

const PISTOL_SLIDE = [
  "..SSSSSSSSSSSSSS",
  ".SssSSSSSSSSSSSS",
  ".SssSSSSSSSSSSSM",
];
const PISTOL_FRAME = [
  "..rrrrrrrrrrrrr.",
  "..GgGF.T..F.....",
  "..GGG..TFF......",
  "..GgG...........",
  ".GGGG...........",
  ".GgGG...........",
  ".GGG............",
  ".mmm............",
];

export interface Pistol {
  root: THREE.Group;
  slide: THREE.Group;
  muzzle: THREE.Object3D;
  rail: THREE.Object3D;
  magWell: THREE.Object3D;
}

/** The 2010-pattern service pistol, grip at the origin, barrel along +Z. */
export function makePistol(): Pistol {
  const v = 0.0125;
  const root = new THREE.Group();
  // Grip centre is column 2.5, frame row 4 → slide rows sit above.
  const origin: [number, number, number] = [1.5, 3.5, 3];
  const frame = elevation(PISTOL_FRAME, PISTOL_PAL, 3, v, origin, "", { ...MAT, std: MAT.satin });
  const slide = elevation(PISTOL_SLIDE, PISTOL_PAL, 3, v, [1.5, 3.5 - PISTOL_FRAME.length, 3], "", { ...MAT, std: MAT.metal });
  root.add(frame, slide);
  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, (PISTOL_FRAME.length + 0.5 - 3.5) * v, (16 - 3) * v);
  const rail = new THREE.Object3D();
  rail.position.set(0, (PISTOL_FRAME.length + 3 - 3.5) * v, 6 * v);
  const magWell = new THREE.Object3D();
  magWell.position.set(0, -4 * v, -0.5 * v);
  root.add(muzzle, rail, magWell);
  return { root, slide, muzzle, rail, magWell };
}

export function makeMagazine(): THREE.Group {
  const v = 0.0125;
  return elevation(["kkk", "kKk", "kkk", "kKk", "kkk", "kKk", "kkk", "mmm"], { k: 0x26292d, K: 0x33373c, m: 0x1a1b1d }, 2, v, [1, 4, 1.5]);
}

// ---------------------------------------------------------------- scope

/** Rifle scope refitted with a magnetic shoe; eyepiece at −Z, objective at +Z. */
export function makeScope(): THREE.Group {
  const v = 0.012;
  const g = new Grid();
  const body = 0x22262a;
  const ring = 0x3b4046;
  const len = 26;
  for (let z = 0; z < len; z++) {
    const bell = z >= 20 ? 3 : z <= 4 ? 2 : 1.5;
    for (let x = -3; x <= 3; x++) {
      for (let y = -3; y <= 3; y++) {
        if (x * x + y * y > bell * bell + 0.6) continue;
        const c = z === 20 || z === 4 || z === 12 ? ring : body;
        g.set(x, y, z, c);
      }
    }
  }
  // Turrets.
  g.box(-1, 2, 11, 2, 4, 14, ring);
  g.box(2, -1, 11, 4, 2, 14, ring);
  // Magnetic shoe.
  g.box(-1, -4, 7, 2, -2, 18, 0x3a3a3a);
  g.box(-1, -5, 7, 2, -4, 18, 0x8a8f96);
  // Lenses.
  for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) if (x * x + y * y <= 5) g.set(x, y, len, 0x6a9ac0, true);
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) g.set(x, y, -1, 0x3a5a70, true);
  return g.toGroup(v, [0.5, 0.5, len / 2], { ...MAT, std: MAT.satin, glow: MAT.glowSoft });
}

// ---------------------------------------------------------------- stones

export interface StoneOptions {
  radius: number;
  seed: number;
  voxel?: number;
  /** Show a sawn, etched face with Widmanstätten lattice. */
  cut?: boolean;
  /** Squash factors for an irregular silhouette. */
  squash?: [number, number, number];
  palette?: "iron" | "chondrite" | "pallasite" | "mars" | "stony";
}

export function stoneGrid(o: StoneOptions): Grid {
  const g = new Grid();
  const R = o.radius;
  const [sx, sy, sz] = o.squash ?? [1, 0.85, 1.1];
  const n = Math.ceil(R * 1.4);
  const pal = o.palette ?? "iron";
  for (let x = -n; x <= n; x++) {
    for (let y = -n; y <= n; y++) {
      for (let z = -n; z <= n; z++) {
        const d = Math.sqrt((x / sx) ** 2 + (y / sy) ** 2 + (z / sz) ** 2);
        const bump = (fbm3(x * 0.35 + o.seed, y * 0.35, z * 0.35, 3, o.seed) - 0.5) * R * 0.7;
        if (d > R + bump) continue;
        if (o.cut && z > R * 0.45) continue;
        const k = hash3(x, y, z, o.seed);
        let c: number;
        if (pal === "iron") {
          c = k < 0.12 ? 0x6b4a2e : k < 0.2 ? 0x4a3a2a : k < 0.5 ? 0x2b2723 : 0x34302b;
        } else if (pal === "chondrite") {
          c = k < 0.15 ? 0x6e675c : k < 0.3 ? 0x2a2622 : 0x4f4942;
        } else if (pal === "pallasite") {
          c = k < 0.35 ? 0xc79a2e : k < 0.5 ? 0x8a6a1e : 0x5a5650;
        } else if (pal === "mars") {
          c = k < 0.3 ? 0x7a3e26 : k < 0.6 ? 0x5a3424 : 0x3a2a22;
        } else {
          c = k < 0.2 ? 0x8a8278 : k < 0.6 ? 0x5f5a52 : 0x47433d;
        }
        g.set(x, y, z, c);
      }
    }
  }
  if (o.cut) {
    // Etched face: two crossing families of kamacite bands.
    g.each((x, y, z, c) => {
      if (g.has(x, y, z + 1)) return undefined;
      if (z < Math.floor(R * 0.45) - 1) return undefined;
      const a = Math.abs(((x + y * 0.6) % 3) + 3) % 3;
      const b = Math.abs(((x * 0.55 - y) % 3.4) + 3.4) % 3.4;
      if (a < 0.9) return 0xe2e2da;
      if (b < 0.8) return 0xbdbdb5;
      return blend(0x56565a, c, 0.1);
    });
  }
  return g;
}

export function makeStone(o: StoneOptions): THREE.Group {
  const v = o.voxel ?? 0.004;
  const g = stoneGrid(o);
  return g.toGroup(v, [0, 0, 0], { ...MAT, std: o.palette === "iron" || o.cut ? MAT.metal : MAT.std });
}

// ---------------------------------------------------------------- tea

export function makeTeacup(): THREE.Group {
  const v = 0.009;
  const g = new Grid();
  for (let y = 0; y < 6; y++) {
    const r = y === 0 ? 2.2 : 3.2;
    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        const d = Math.sqrt(x * x + z * z);
        if (d > r) continue;
        if (y >= 1 && d < 2.2 && y > 1) {
          if (y === 4) g.set(x, y, z, 0x9a6a22);
          continue;
        }
        g.set(x, y, z, y === 3 ? 0x2c4f8a : y === 5 ? 0xf2efe8 : 0xe9e5dc);
      }
    }
  }
  return g.toGroup(v, [0.5, 0, 0.5], { ...MAT, std: MAT.satin });
}

export function makeTeapot(): THREE.Group {
  const v = 0.01;
  const g = new Grid();
  const clay = 0x6a3a2c;
  for (let x = -6; x <= 6; x++) {
    for (let y = 0; y <= 8; y++) {
      for (let z = -6; z <= 6; z++) {
        const d = Math.sqrt(x * x + ((y - 3.5) * 1.3) ** 2 + z * z);
        if (d <= 5.6) g.set(x, y, z, hash3(x, y, z, 3) < 0.2 ? shade(clay, 0.85) : clay);
      }
    }
  }
  g.box(-1, 8, -1, 2, 10, 2, shade(clay, 0.8));
  for (let i = 0; i < 6; i++) g.box(5 + i, 2 + Math.floor(i * 0.8), 0, 6 + i, 3 + Math.floor(i * 0.8), 1, clay);
  for (let y = 2; y <= 7; y++) {
    g.set(-7, y, 0, clay);
    if (y === 2 || y === 7) g.set(-6, y, 0, clay);
  }
  g.set(-8, 3, 0, clay).set(-8, 4, 0, clay).set(-8, 5, 0, clay).set(-8, 6, 0, clay);
  return g.toGroup(v, [0.5, 0, 0.5], { ...MAT, std: MAT.satin });
}

// ---------------------------------------------------------------- small tools

export function makePhone(): THREE.Group {
  const g = new Grid();
  g.box(0, 0, 0, 9, 19, 1, 0x1a1b1e);
  g.box(1, 2, 1, 8, 18, 2, 0x5a8fb8, true);
  g.box(2, 12, 1, 7, 15, 2, 0xe6eef4, true);
  g.box(3, 4, 1, 6, 5, 2, 0x8fe0a0, true);
  return g.toGroup(0.008, [4.5, 9.5, 0.5], { ...MAT, glow: MAT.glowSoft });
}

export function makePliers(): THREE.Group {
  // Top elevation drawn as a side elevation lying flat (we rotate on use).
  return elevation(
    [
      "rr..............",
      ".rr.............",
      "..rrkkkkMMMMM...",
      "..rrkkkkMMMMMMMM",
      ".rr.............",
      "rr..............",
    ],
    { r: 0xb2342a, k: 0x2a2a2a, M: 0x5a5e63 },
    1,
    0.011,
    [0.5, 3, 4],
  );
}

export function makeKnife(): THREE.Group {
  return elevation(
    [
      "......BBBBBBBBB..",
      "hhhhhhBBBBBBBBBBB",
      "hhhhhhBBBBBBBBBB.",
      "hhhhhh...........",
    ],
    { h: 0x3a2618, B: 0xb8bcc0 },
    1,
    0.011,
    [0.5, 2, 3],
    "",
    { ...MAT, std: MAT.metal },
  );
}

export function makeGlueTube(): THREE.Group {
  return elevation(["....rr", "wwwwrr", "wwwwrr", "....rr"], { w: 0xe2e2dc, r: 0xb02a22 }, 2, 0.01, [1, 2, 0]);
}

export function makeKnot(): THREE.Group {
  return elevation(["cc", "cc"], { c: 0x8a7a5a }, 2, 0.02, [1, 1, 1]);
}

// ---------------------------------------------------------------- rounds

export const ROUND_V = 0.0019;

/** One caseless 7.62 mm round. `tip`: copper head, meteorite segment, or none. */
export function makeRound(tip: "copper" | "meteor" | "none", seed = 1): THREE.Group {
  const g = new Grid();
  for (let x = 0; x < 4; x++) {
    for (let z = 0; z < 4; z++) {
      for (let y = 0; y < 10; y++) {
        const corner = (x === 0 || x === 3) && (z === 0 || z === 3);
        if (corner) continue;
        g.set(x, y, z, y === 0 ? 0x8a7a50 : hash3(x, y, z, seed) < 0.3 ? 0xa89870 : 0xb8a77c);
      }
    }
  }
  if (tip === "copper") {
    for (let y = 10; y < 15; y++) {
      const r = y < 12 ? 2 : y < 14 ? 1.3 : 0.8;
      for (let x = 0; x < 4; x++) for (let z = 0; z < 4; z++) {
        const dx = x - 1.5;
        const dz = z - 1.5;
        if (dx * dx + dz * dz <= r * r) g.set(x, y, z, y > 12 ? 0xd08a4a : 0xb8703a);
      }
    }
  } else if (tip === "meteor") {
    const r = mulberry32(seed);
    for (let y = 10; y < 15; y++) {
      for (let x = 0; x < 4; x++) for (let z = 0; z < 4; z++) {
        const corner = (x === 0 || x === 3) && (z === 0 || z === 3);
        if (corner) continue;
        const k = r();
        g.set(x, y, z, k < 0.15 ? 0x8e8e88 : k < 0.3 ? 0x5a4632 : 0x2c2925);
      }
    }
    g.set(1, 10, 1, 0xd8d0b0).set(2, 10, 2, 0xd8d0b0);
  }
  return g.toGroup(ROUND_V, [2, 0, 2], { ...MAT, std: tip === "meteor" ? MAT.metal : MAT.satin });
}

/** A bare meteorite slug: the 36 machined cylinders. */
export function makeSlug(seed: number): THREE.Group {
  const g = new Grid();
  const r = mulberry32(seed);
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 4; x++) for (let z = 0; z < 4; z++) {
      const corner = (x === 0 || x === 3) && (z === 0 || z === 3);
      if (corner) continue;
      const k = r();
      const cap = y === 0 || y === 4;
      g.set(x, y, z, cap ? (k < 0.5 ? 0xb9b8b0 : 0x9a9993) : k < 0.12 ? 0x6a4a30 : k < 0.5 ? 0x34302b : 0x2a2723);
    }
  }
  return g.toGroup(ROUND_V, [2, 2.5, 2], { ...MAT, std: MAT.metal });
}

// ---------------------------------------------------------------- suit kit

export function makeBackpack(base: number, panel: number, dark: number, lamp = 0x9fe0ff): THREE.Group {
  const g = new Grid();
  // 16 × 20 × 7 at half-pixel voxels: 0.45 × 0.56 × 0.2 m.
  g.box(0, 0, 0, 16, 20, 7, (x, y, z) => {
    const edge = x === 0 || x === 15 || y === 0 || y === 19;
    if (edge && z === 6) return null;
    if (y > 4 && y < 16 && x > 2 && x < 13 && z === 6) return (y + x) % 7 === 0 ? dark : panel;
    return base;
  });
  // Thruster nozzles on the four corners.
  for (const [x, y] of [[0, 0], [14, 0], [0, 18], [14, 18]] as const) g.box(x - 1, y, 2, x + 3, y + 2, 5, dark);
  g.box(6, 20, 2, 10, 21, 5, dark);
  g.set(7, 17, 7, lamp, true).set(8, 17, 7, lamp, true);
  return g.toGroup(0.028, [8, 10, 7], { ...MAT, std: MAT.satin });
}

export function makeGlove(base: number, ring: number): THREE.Group {
  const g = new Grid();
  g.box(0, 0, 0, 18, 13, 18, (x, y, z) => {
    if (y >= 11) return ring;
    if (y < 3 && (x < 2 || x > 15 || z < 2 || z > 15)) return null;
    return hash3(x, y, z, 4) < 0.1 ? shade(base, 0.92) : base;
  });
  return g.toGroup(0.0125, [9, 6.5, 9], { ...MAT, std: MAT.satin });
}

export function makePouch(colour: number): THREE.Group {
  const g = new Grid();
  g.box(0, 0, 0, 5, 7, 3, colour);
  g.box(0, 6, 0, 5, 7, 3, shade(colour, 0.8));
  g.set(2, 5, 3, 0x9a9a9a);
  return g.toGroup(0.03, [5, 4, 1.5]);
}

export function makeCamera(): THREE.Group {
  const g = new Grid();
  g.box(0, 0, 0, 10, 7, 5, 0x2a2b2e);
  g.box(2, 1, 5, 8, 6, 9, 0x1b1c1e);
  g.box(3, 2, 9, 7, 5, 10, 0x4a7aa0, true);
  g.box(7, 7, 1, 9, 8, 3, 0xd23a2a, true);
  g.box(-2, 1, 1, 0, 6, 4, 0x3a3b3e);
  return g.toGroup(0.02, [5, 3.5, 2.5], { ...MAT, glow: MAT.glowSoft });
}

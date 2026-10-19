import * as THREE from "three";
import { Grid, MAT, shade } from "../core/vox";
import { hash3, mulberry32 } from "../core/anim";
import { EARTH_DIR } from "./sky";

/**
 * The Yellow River station: a 1 km wheel at the top of the space elevator,
 * built from 48 identical voxel segments, plus a high-resolution hatch panel
 * on the segment that faces the shooter, the elevator ribbon, the skeletal
 * shipyard and the scattered small facilities of the "frontier camp".
 */

export const WALL_Z = -5040;
export const STATION_R = 500;
export const STATION_CENTRE = new THREE.Vector3(0, 0, WALL_Z - STATION_R);
export const HATCH = new THREE.Vector3(0, 2, WALL_Z);
export const HATCH_RADIUS = 3;

const SEG_V = 2;
const HERO_V = 0.5;

function segmentGrid(): Grid {
  const g = new Grid();
  const W = 40; // along station axis (x): 80 m
  const T = 34; // tangent (y): 68 m
  const R = 20; // radial (z): 40 m
  const base = 0xb8bcc0;
  g.box(0, 0, 0, W, T, R, (x, y, z) => {
    const outer = z === R - 1;
    const side = x === 0 || x === W - 1;
    const inner = z === 0;
    if (!outer && !side && !inner && y !== 0 && y !== T - 1) return null; // hollow
    const k = hash3(Math.floor(x / 2), Math.floor(y / 2), z, 5);
    if (outer) {
      if (x % 8 === 0 || y % 6 === 0) return 0x8e9398;
      if (k < 0.08) return 0x5d6267;
      if (x > 14 && x < 26 && y > 4 && y < 30 && (y % 3 === 0)) return 0x3c4248;
      return k < 0.5 ? base : shade(base, 0.93);
    }
    if (side) {
      if (z % 5 === 2 && y % 2 === 0 && z > 1 && z < R - 2) return null; // window slot (glow filled below)
      if (z === R - 2 || z === 1) return 0x7d8287;
      return k < 0.5 ? 0xa8acb0 : 0x9da1a5;
    }
    return 0x8a8e93;
  });
  for (const x of [0, W - 1]) {
    for (let y = 0; y < T; y++) {
      for (let z = 2; z < R - 2; z++) {
        if (z % 5 === 2 && y % 2 === 0) g.set(x, y, z, hash3(x, y, z, 9) < 0.25 ? 0x6a7f99 : 0xffd29a, true);
      }
    }
  }
  // Edge trim and a few navigation lamps.
  g.box(0, 0, R, 1, T, R + 1, 0x6b7075);
  g.box(W - 1, 0, R, W, T, R + 1, 0x6b7075);
  g.set(0, 0, R, 0xff4a3a, true).set(W - 1, T - 1, R, 0x6aff8a, true);
  return g;
}

/** 黄 and 河 as 11×11 stencils. */
const GLYPHS = {
  huang: [
    "..#.....#..",
    "###########",
    "..#.....#..",
    "###########",
    ".....#.....",
    ".#########.",
    ".#...#...#.",
    ".#########.",
    ".#...#...#.",
    ".#########.",
    ".#.......#.",
  ],
  he: [
    "#..########",
    ".#.......#.",
    ".........#.",
    "#..####..#.",
    ".#.#..#..#.",
    "...#..#..#.",
    "..#####..#.",
    ".#.......#.",
    "#........#.",
    "#.....####.",
    "...........",
  ],
};

export interface HatchParts {
  group: THREE.Group;
  door: THREE.Group;
  red: THREE.Object3D;
  green: THREE.Object3D;
  interior: THREE.Object3D;
}

function heroPanel(): HatchParts {
  const group = new THREE.Group();
  const g = new Grid();
  // Panel spans x ∈ [−28, 28] m, y ∈ [−16, 22] m, two cells thick (1 m).
  const X0 = -56;
  const X1 = 56;
  const Y0 = -32;
  const Y1 = 44;
  const hc = { x: 0, y: 4 }; // hatch centre in cells (y = 2 m)
  const rHole = 6;
  const rFrame = 8.5;
  g.box(X0, Y0, 0, X1, Y1, 2, (x, y, z) => {
    const dx = x + 0.5 - hc.x;
    const dy = y + 0.5 - hc.y;
    const d = Math.hypot(dx, dy);
    if (d < rHole) return null;
    if (z === 0) return 0x9ea2a6;
    const k = hash3(x, y, 3, 2);
    if (x % 16 === 0 || y % 12 === 0) return 0x82878c;
    if ((x % 16 === 1 || x % 16 === 15) && y % 4 === 0) return 0x6e7378;
    return k < 0.5 ? 0xc3c6c9 : 0xbcc0c3;
  });
  // Raised frame with hazard chevrons.
  for (let x = -12; x <= 12; x++) {
    for (let y = -10; y <= 18; y++) {
      const d = Math.hypot(x + 0.5 - hc.x, y + 0.5 - hc.y);
      if (d >= rHole && d < rFrame) {
        const ang = Math.atan2(y + 0.5 - hc.y, x + 0.5 - hc.x);
        const stripe = Math.floor((ang / Math.PI) * 12 + 24) % 2 === 0;
        const outerRing = d > rFrame - 1.2;
        g.set(x, y, 2, outerRing ? (stripe ? 0xe0b028 : 0x26282b) : 0x55595e);
        g.set(x, y, 3, outerRing ? (stripe ? 0xe0b028 : 0x26282b) : 0x55595e);
      }
    }
  }
  // Recess walls inside the doorway and a lit airlock back.
  for (let x = -7; x <= 7; x++) {
    for (let y = -4; y <= 12; y++) {
      const d = Math.hypot(x + 0.5 - hc.x, y + 0.5 - hc.y);
      if (d < rHole) {
        const ring = d > rHole - 1;
        if (ring) for (let z = 0; z < 4; z++) g.set(x, y, z, 0x3a3e43);
        else g.set(x, y, 0, d < 2 ? 0xd8e8ff : 0x2a2e33, d < 2);
      }
    }
  }
  // Lamps above the hatch.
  g.box(-9, 16, 2, -6, 17, 4, 0xfff2d8, true);
  g.box(6, 16, 2, 9, 17, 4, 0xfff2d8, true);
  // Handrails.
  for (const x of [-11, 10]) g.box(x, -6, 2, x + 1, 15, 3, 0xd8a52a);
  // Stencil lettering, flush with the plating.
  const paintGlyph = (glyph: string[], ox: number, oy: number, colour: number) => {
    glyph.forEach((row, r) => {
      for (let c = 0; c < row.length; c++) {
        if (row[c] !== "#") continue;
        for (let sx = 0; sx < 2; sx++) for (let sy = 0; sy < 2; sy++) g.set(ox + c * 2 + sx, oy + (10 - r) * 2 + sy, 1, colour);
      }
    });
  };
  paintGlyph(GLYPHS.huang, 16, -6, 0x9a2a22);
  paintGlyph(GLYPHS.he, 16 + 24, -6, 0x9a2a22);
  // Module number bars.
  g.box(-44, 30, 1, -20, 32, 2, 0x2f6cb3);
  g.box(-44, 27, 1, -30, 28, 2, 0x2f6cb3);
  const panel = g.toGroup(HERO_V, [0, 0, 0], { ...MAT, std: MAT.satin });
  group.add(panel);

  // Door: plug-and-slide, separate so it can move.
  const dg = new Grid();
  for (let x = -6; x < 6; x++) {
    for (let y = -6; y < 6; y++) {
      const d = Math.hypot(x + 0.5, y + 0.5);
      if (d < rHole - 0.2) {
        const spoke = Math.abs(x + 0.5) < 1 || Math.abs(y + 0.5) < 1;
        dg.set(x, y, 0, d < 1.5 ? 0x45494e : spoke ? 0x9a9ea2 : 0xd0d3d6);
        if (d > rHole - 1.4) dg.set(x, y, 1, 0x707479);
      }
    }
  }
  const door = dg.toGroup(HERO_V, [0, 0, 0], { ...MAT, std: MAT.satin });
  const doorPivot = new THREE.Group();
  doorPivot.add(door);
  doorPivot.position.set(hc.x * HERO_V, hc.y * HERO_V, 1.0);
  group.add(doorPivot);

  // Status lamps left of the hatch: red over green.
  const lamp = (colour: number, y: number) => {
    const lg = new Grid();
    lg.box(0, 0, 0, 3, 2, 1, colour, true);
    const o = lg.toGroup(HERO_V, [0, 0, 0], { ...MAT, glow: MAT.glowHot });
    o.position.set(-13 * HERO_V, y * HERO_V, 3 * HERO_V);
    group.add(o);
    return o;
  };
  const housing = new Grid();
  housing.box(-1, -1, 0, 4, 6, 1, 0x26282b);
  const hg = housing.toGroup(HERO_V, [0, 0, 0]);
  hg.position.set(-13 * HERO_V, 6 * HERO_V, 2 * HERO_V);
  group.add(hg);
  const red = lamp(0xff3020, 9.5);
  const green = lamp(0x30ff70, 7);
  const interior = new THREE.Object3D();
  group.add(interior);
  group.position.set(0, 0, WALL_Z);
  return { group, door: doorPivot, red, green, interior };
}

export interface Station {
  group: THREE.Group;
  hatch: HatchParts;
  beacons: THREE.Mesh;
  farLights: THREE.Group;
}

export function buildStation(): Station {
  const group = new THREE.Group();
  group.name = "station";

  // Wheel rim.
  const seg = segmentGrid().build(SEG_V, [20, 17, 10]);
  const N = 48;
  const segStd = new THREE.InstancedMesh(seg.base!, MAT.satin, N);
  const segGlow = new THREE.InstancedMesh(seg.glow!, MAT.glow, N);
  segStd.castShadow = false;
  segStd.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3(1, 1, 1);
  const p = new THREE.Vector3();
  const rMid = STATION_R - 20;
  for (let k = 0; k < N; k++) {
    const a = (k / N) * Math.PI * 2;
    p.set(0, Math.sin(a) * rMid, Math.cos(a) * rMid).add(STATION_CENTRE);
    q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -a);
    m.compose(p, q, s);
    segStd.setMatrixAt(k, m);
    segGlow.setMatrixAt(k, m);
  }
  group.add(segStd, segGlow);

  // Hub and spokes.
  const hub = new Grid();
  for (let x = -20; x < 20; x++) {
    for (let y = -15; y <= 15; y++) {
      for (let z = -15; z <= 15; z++) {
        const d = Math.hypot(y, z);
        if (d > 15 || d < 12) continue;
        const ring = x % 8 === 0;
        hub.set(x, y, z, ring ? 0x7d8287 : hash3(x, y, z, 1) < 0.5 ? 0xaeb2b6 : 0xa2a6aa, ring && hash3(x, y, z, 4) < 0.05);
      }
    }
  }
  for (let y = -12; y <= 12; y++) for (let z = -12; z <= 12; z++) if (Math.hypot(y, z) < 12) {
    hub.set(-20, y, z, 0x80858a);
    hub.set(19, y, z, 0x80858a);
  }
  const hubGroup = hub.toGroup(4, [0, 0, 0], { ...MAT, std: MAT.satin });
  hubGroup.position.copy(STATION_CENTRE);
  group.add(hubGroup);
  const spoke = new Grid();
  spoke.box(-3, -3, 15, 3, 3, 116, (x, y, z) => (z % 10 === 0 ? 0x7d8287 : (x + y) % 3 === 0 ? 0x9a9ea2 : 0xa8acb0));
  for (let z = 20; z < 114; z += 12) spoke.set(0, 3, z, 0xffd29a, true);
  const spokeGeo = spoke.build(4, [0, 0, 0]);
  for (let k = 0; k < 4; k++) {
    const a = Math.PI / 4 + (k * Math.PI) / 2;
    const sg = new THREE.Group();
    sg.add(new THREE.Mesh(spokeGeo.base!, MAT.satin));
    if (spokeGeo.glow) sg.add(new THREE.Mesh(spokeGeo.glow, MAT.glow));
    sg.position.copy(STATION_CENTRE);
    sg.rotation.x = -a;
    group.add(sg);
  }

  const hatch = heroPanel();
  group.add(hatch.group);

  // Elevator ribbon, falling toward Earth from the hub.
  const ribbonLen = 320000;
  const ribbon = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, ribbonLen),
    new THREE.MeshStandardMaterial({ color: 0x5a5e63, roughness: 0.8, metalness: 0.3 }),
  );
  ribbon.position.copy(STATION_CENTRE).addScaledVector(EARTH_DIR, ribbonLen / 2);
  ribbon.lookAt(STATION_CENTRE.clone().addScaledVector(EARTH_DIR, ribbonLen));
  group.add(ribbon);
  // Red beacons every 2 km down the ribbon.
  const bGrid = new Grid();
  bGrid.box(0, 0, 0, 1, 1, 1, 0xff3a2a, true);
  const bGeo = bGrid.build(3, [0.5, 0.5, 0.5]).glow!;
  const beacons = new THREE.InstancedMesh(bGeo, MAT.glow, 24);
  for (let i = 0; i < 24; i++) {
    p.copy(STATION_CENTRE).addScaledVector(EARTH_DIR, 900 + i * 2000);
    m.compose(p, q.identity(), s.set(1, 1, 1).multiplyScalar(1 + i * 0.15));
    beacons.setMatrixAt(i, m);
  }
  group.add(beacons);

  // Shipyard skeleton: a lattice "like the bones of a giant beast".
  const yard = new Grid();
  const rand = mulberry32(7);
  const CX = 8;
  const CY = 3;
  const CZ = 3;
  const L = 6;
  for (let i = 0; i <= CX; i++) {
    for (let j = 0; j <= CY; j++) {
      for (let k = 0; k <= CZ; k++) {
        const done = i < 6 || rand() < 0.4;
        if (!done) continue;
        if (i < CX && rand() < 0.92) yard.box(i * L, j * L, k * L, i * L + L + 1, j * L + 1, k * L + 1, 0x8c9095);
        if (j < CY && rand() < 0.85) yard.box(i * L, j * L, k * L, i * L + 1, j * L + L + 1, k * L + 1, 0x7f8388);
        if (k < CZ && rand() < 0.85) yard.box(i * L, j * L, k * L, i * L + 1, j * L + 1, k * L + L + 1, 0x8c9095);
        if (rand() < 0.15) yard.set(i * L, j * L + 1, k * L, 0xfff0c8, true);
      }
    }
  }
  const yardGroup = yard.toGroup(36, [24, 9, 9], { ...MAT, std: MAT.satin });
  yardGroup.position.set(15000, 2600, -17000);
  yardGroup.rotation.set(0.1, 0.6, 0.05);
  yardGroup.traverse((o) => {
    if (o instanceof THREE.Mesh) o.castShadow = o.receiveShadow = false;
  });
  group.add(yardGroup);

  // Small outlying facilities: boxes with solar wings.
  const farLights = new THREE.Group();
  const outposts: Array<[number, number, number, number]> = [
    [-22000, 4000, -30000, 1.0],
    [30000, -9000, -26000, 0.8],
    [-38000, -12000, -9000, 1.2],
    [26000, 14000, 12000, 0.9],
  ];
  outposts.forEach(([x, y, z, sc], i) => {
    const og = new Grid();
    og.box(-2, -2, -4, 3, 3, 5, 0xb3b7bb);
    og.box(-12, 0, -1, -2, 1, 2, 0x2b3a5c);
    og.box(3, 0, -1, 13, 1, 2, 0x2b3a5c);
    og.set(0, 3, 0, i % 2 ? 0xff5040 : 0x9fe0ff, true);
    const o = og.toGroup(18 * sc, [0, 0, 0], { ...MAT, std: MAT.satin });
    o.position.set(x, y, z);
    o.rotation.set(i, i * 2, 0);
    o.traverse((c) => {
      if (c instanceof THREE.Mesh) c.castShadow = c.receiveShadow = false;
    });
    farLights.add(o);
  });
  group.add(farLights);

  return { group, hatch, beacons, farLights };
}

/** Floating construction debris near the shooter: scale and parallax. */
export function buildDebris(): THREE.Group {
  const group = new THREE.Group();
  const rand = mulberry32(99);
  const items: Array<() => Grid> = [
    () => {
      const g = new Grid();
      g.box(0, 0, 0, 24, 1, 1, 0x8a8e93);
      g.box(0, 3, 0, 24, 4, 1, 0x8a8e93);
      for (let x = 0; x < 24; x += 3) g.box(x, 0, 0, x + 1, 4, 1, 0x6f7378);
      return g;
    },
    () => {
      const g = new Grid();
      g.box(0, 0, 0, 10, 1, 7, (x, _y, z) => ((x + z) % 4 === 0 ? 0x2b3a5c : 0x34466b));
      g.box(0, 1, 0, 1, 2, 7, 0x9a9ea2);
      return g;
    },
    () => {
      const g = new Grid();
      g.box(0, 0, 0, 5, 4, 4, (x, y) => (y === 3 || x === 0 ? 0x8b6a3a : 0xa57c42));
      return g;
    },
    () => {
      const g = new Grid();
      for (let a = 0; a < 40; a++) {
        const ang = (a / 40) * Math.PI * 2;
        g.set(Math.round(Math.cos(ang) * 4), Math.round(Math.sin(ang) * 4), a % 3, 0xc06030);
      }
      g.box(-1, -1, 0, 2, 2, 3, 0x5a5e63);
      return g;
    },
    () => {
      const g = new Grid();
      g.box(0, 0, 0, 3, 8, 3, (_x, y) => (y % 3 === 0 ? 0x6f7378 : 0xd8d8d2));
      return g;
    },
  ];
  const placements: Array<[number, number, number, number, number]> = [
    [-9, 3, -14, 0, 0.25],
    [14, -6, -40, 1, 0.3],
    [-30, -12, -70, 2, 0.4],
    [6, 9, 22, 3, 0.25],
    [-60, 20, -180, 4, 0.6],
    [40, -14, 60, 0, 0.5],
    [-18, -4, 34, 2, 0.3],
    [120, 30, -320, 1, 1.0],
  ];
  placements.forEach(([x, y, z, kind, v], i) => {
    const o = items[kind]!().toGroup(v, [2, 2, 2], { ...MAT, std: MAT.satin });
    const pivot = new THREE.Group();
    pivot.add(o);
    pivot.position.set(x, y, z);
    pivot.userData.spin = [rand() * 0.06 - 0.03, rand() * 0.06 - 0.03, rand() * 0.04 - 0.02];
    pivot.userData.phase = i;
    group.add(pivot);
  });
  return group;
}

export function animateDebris(group: THREE.Group, S: number): void {
  for (const c of group.children) {
    const [a, b, d] = c.userData.spin as [number, number, number];
    const ph = c.userData.phase as number;
    c.rotation.set(ph + a * S, ph * 2 + b * S, d * S);
  }
}

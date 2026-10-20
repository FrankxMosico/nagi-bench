import * as THREE from "three";
import { walk as walkPose, type Pose } from "@agentbench/voxel-kit";
import { Actor, cardigan, coatNavy, COLLECTOR_FACE, ZHANG_FACE } from "../cast";
import { VoxelGrid, vmesh, vglow, jitter, rockGeometry, glowBox } from "../vox";
import { Particles } from "../fx";
import { ironPalette } from "./prologue";
import { C, E } from "../../timeline";
import { speaking } from "../../voice";
import { addPose, hash1, hashInt, mulberry32, seg, smooth, trackPose, trackV3, trackNum, type Key, type V3 } from "../util";

/**
 * The collector's old house deep in the hutong: dim, like a small geological
 * museum, glass cabinets of unremarkable stones under careful light.
 * Room: x -3.5..3.5 (west..east), z -2.5..2.5 (north..south), y 0..3.2.
 */

export interface CollectorSet {
  scene: THREE.Scene;
  zhang: Actor;
  collector: Actor;
  irons: THREE.Mesh[];
  cups: THREE.Group[];
  /** Light state: 0 = afternoon (main scene), 1 = next morning (epilogue). */
  update(t: number, morning?: boolean): void;
  head(actor: Actor, out?: THREE.Vector3): THREE.Vector3;
  points: Record<string, THREE.Vector3>;
}

const V = 0.1;
const WOOD = 0x5b3322;
const WOOD_D = 0x41241a;
const PLASTER = 0xd9d0c0;

function room(): { solid: THREE.BufferGeometry; glow: THREE.BufferGeometry } {
  const nx = 70;
  const ny = 32;
  const nz = 50;
  const g = new VoxelGrid(nx, ny, nz);
  const L = new VoxelGrid(nx, ny, nz);
  const I = (x: number) => Math.round((x + 3.5) / V);
  const K = (z: number) => Math.round((z + 2.5) / V);
  const J = (y: number) => Math.round(y / V);
  // floor: square grey bricks
  for (let k = 0; k < nz; k++) for (let i = 0; i < nx; i++) {
    const seam = i % 4 === 0 || k % 4 === 0;
    g.set(i, 0, k, seam ? 0x58554f : jitter(0x76726b, 0.06, hashInt(Math.floor(i / 4), Math.floor(k / 4))));
  }
  // walls
  const wall = (i: number, j: number, k: number) => {
    if (j < 9) return j === 8 ? WOOD_D : jitter(WOOD, 0.05, hashInt(i, j, k));
    return jitter(PLASTER, 0.025, hashInt(Math.floor(i / 2), Math.floor(j / 2), Math.floor(k / 2)));
  };
  for (let j = 1; j < ny; j++) {
    for (let k = 0; k < nz; k++) {
      g.set(0, j, k, wall(0, j, k));
      g.set(nx - 1, j, k, wall(nx - 1, j, k));
    }
    for (let i = 0; i < nx; i++) {
      g.set(i, j, 0, wall(i, j, 0));
      g.set(i, j, nz - 1, wall(i, j, nz - 1));
    }
  }
  // ceiling with dark beams
  for (let k = 0; k < nz; k++) for (let i = 0; i < nx; i++) g.set(i, ny - 1, k, i % 12 < 2 ? 0x2c1a12 : 0x4a3426);
  for (let i = 0; i < nx; i++) for (const k of [12, 13, 36, 37]) g.set(i, ny - 2, k, 0x2c1a12);
  // east door opening, z 0.6..1.6, up to 2.2 m, with a frame
  for (let k = K(0.6); k < K(1.6); k++) for (let j = 1; j < J(2.2); j++) g.set(nx - 1, j, k, null);
  for (let j = 1; j <= J(2.2); j++) for (const k of [K(0.6) - 1, K(1.6)]) g.set(nx - 1, j, k, WOOD_D);
  for (let k = K(0.6) - 1; k <= K(1.6); k++) g.set(nx - 1, J(2.2), k, WOOD_D);
  // west lattice window, z -1.0..1.0, y 1.0..2.4
  const wk0 = K(-1.0);
  const wk1 = K(1.0);
  const wj0 = J(1.0);
  const wj1 = J(2.4);
  for (let k = wk0; k < wk1; k++) for (let j = wj0; j < wj1; j++) {
    const lk = k - wk0;
    const lj = j - wj0;
    const frame = lk === 0 || lk === wk1 - wk0 - 1 || lj === 0 || lj === wj1 - wj0 - 1;
    const lattice = lk % 4 === 0 || lj % 4 === 0 || (lk + lj) % 8 === 0;
    if (frame || lattice) g.set(0, j, k, frame ? WOOD_D : 0x5a3a28);
    else {
      g.set(0, j, k, null);
      L.set(0, j, k, 0xfff1d6); // paper panes glowing with daylight
    }
  }
  // a wall clock above the window
  for (let k = K(-0.15); k < K(0.15); k++) for (let j = J(2.6); j < J(2.9); j++) g.set(1, j, k, (k === K(0) || j === J(2.75)) ? 0x1f1a16 : 0xe8e0cc);
  // a hanging scroll on the south wall
  for (let i = I(1.6); i < I(2.2); i++) for (let j = J(0.9); j < J(2.5); j++) {
    const edge = j === J(0.9) || j === J(2.5) - 1;
    const stroke = (i + j * 3) % 7 === 0 && j > J(1.2) && j < J(2.2) && i > I(1.7) && i < I(2.1);
    g.set(i, j, nz - 2, edge ? 0x6a4a2a : stroke ? 0x1c1a18 : 0xece4d0);
  }
  return { solid: g.geometry(V, "min").translate(-3.5, 0, -2.5), glow: L.geometry(V, "min").translate(-3.5, 0, -2.5) };
}

interface Cabinet {
  frame: THREE.BufferGeometry;
  strips: THREE.BufferGeometry;
}

function cabinet(withTray: boolean): Cabinet {
  // 1.8 × 2.0 × 0.45 m, origin at its floor-front-left corner (in its own frame)
  const g = new VoxelGrid(18, 20, 5);
  const L = new VoxelGrid(18, 20, 5);
  for (let j = 0; j < 20; j++) for (let k = 0; k < 5; k++) for (let i = 0; i < 18; i++) {
    const side = i === 0 || i === 17;
    const top = j === 19 || j <= 1;
    const back = k === 0;
    const shelf = j === 6 || j === 10 || j === 14;
    if (side || top) g.set(i, j, k, jitter(WOOD, 0.04, hashInt(i, j, k)));
    else if (back) g.set(i, j, k, 0x20232b);
    else if (shelf && k < 4) g.set(i, j, k, 0x3c2418);
  }
  // light strips under each shelf / under the top
  for (const j of [5, 9, 13, 18]) for (let i = 1; i < 17; i++) L.set(i, j, 3, 0xfff4dc);
  // velvet tray with three hollows (middle shelf of the middle cabinet): real pits,
  // so that when the stones are gone the emptiness has a shape
  if (withTray) for (let i = 3; i < 15; i++) for (let k = 1; k < 4; k++) {
    const hollow = (i === 5 || i === 9 || i === 13) && k === 2;
    g.set(i, 11, k, hollow ? null : 0x5c1622);
    if (hollow) g.set(i, 10, k, 0x2a0a10);
  }
  return { frame: g.geometry(V, "min"), strips: L.geometry(V, "min") };
}

/** A few kinds of stones for the display. */
function stonePalette(kind: number, seed: number): (x: number, y: number, z: number, d: number) => number {
  if (kind === 0) return ironPalette(seed);
  return (x, y, z, d) => {
    const h = hash1(x * 13.1 + y * 7.7 + z * 3.3 + seed);
    if (kind === 1) return h > 0.75 ? 0x8a7a62 : h > 0.4 ? 0x6e6152 : 0x5a5046; // chondrite
    if (kind === 2) return h > 0.6 ? 0x8a9a3a : h > 0.3 ? 0x4c4f52 : 0xb8a24a; // pallasite: olivine in metal
    if (kind === 3) return h > 0.7 ? 0x9a4a36 : 0x6e3426; // reddish achondrite
    return d > 0.85 ? 0x2a2620 : h > 0.5 ? 0x9a948a : 0x7c776e;
  };
}

/** Iron meteorite with one sawn face etched to show the Widmanstätten pattern. */
function etchedIron(seed: number): THREE.BufferGeometry {
  const pal = ironPalette(seed);
  return rockGeometry(seed, 6, 0.0078, (x, y, z, d) => {
    if (z > 14) {
      const a = (x + y * 0.58) % 4;
      const b = (x - y * 0.58 + 40) % 4;
      return a < 0.9 || b < 0.9 ? 0xd9dde2 : 0x8e9399;
    }
    return pal(x, y, z, d);
  }, 0.45);
}

function teaTable(): THREE.BufferGeometry {
  const g = new VoxelGrid(9, 8, 9);
  g.box(0, 7, 0, 9, 8, 9, WOOD);
  g.box(0, 6, 0, 9, 7, 9, WOOD_D);
  for (const [i, k] of [[0, 0], [8, 0], [0, 8], [8, 8]] as const) g.box(i, 0, k, i + 1, 6, k + 1, WOOD_D);
  return g.geometry(V, "min");
}

function chair(): THREE.BufferGeometry {
  const g = new VoxelGrid(5, 10, 5);
  g.box(0, 4, 0, 5, 5, 5, WOOD);
  for (const [i, k] of [[0, 0], [4, 0], [0, 4], [4, 4]] as const) g.box(i, 0, k, i + 1, 4, k + 1, WOOD_D);
  g.box(0, 5, 0, 5, 10, 1, WOOD_D);
  g.box(1, 6, 0, 4, 9, 1, WOOD);
  return g.geometry(V, "min");
}

function workbench(): THREE.BufferGeometry {
  const g = new VoxelGrid(9, 8, 24);
  g.box(0, 7, 0, 9, 8, 24, WOOD);
  for (const [i, k] of [[0, 0], [8, 0], [0, 23], [8, 23]] as const) g.box(i, 0, k, i + 1, 7, k + 1, WOOD_D);
  g.box(1, 5, 1, 8, 6, 23, WOOD_D);
  // papers, a tray of small stones
  g.box(3, 8, 3, 7, 8, 7, 0xeee8da);
  return g.geometry(V, "min");
}

function safeBox(): THREE.BufferGeometry {
  const g = new VoxelGrid(7, 8, 6);
  g.box(0, 0, 0, 7, 8, 6, 0x2e4a3c);
  g.box(1, 1, 5, 6, 7, 6, 0x37594a);
  g.set(4, 4, 5, 0xc9a24a).set(2, 4, 5, 0x9a9a9a);
  return g.geometry(V, "min");
}

function radio(): { body: THREE.BufferGeometry; dial: THREE.BufferGeometry } {
  const g = new VoxelGrid(5, 4, 10);
  const L = new VoxelGrid(5, 4, 10);
  g.box(0, 0, 0, 5, 4, 10, 0x6a3f24);
  for (let k = 1; k < 5; k++) for (let j = 1; j < 3; j++) g.set(0, j, k, (j + k) % 2 ? 0x2a1c14 : 0x4a3020);
  L.box(0, 2, 6, 1, 3, 9, 0xffc870);
  g.set(0, 1, 7, 0xd8c8a0).set(0, 1, 8, 0xd8c8a0);
  return { body: g.geometry(0.07, "min"), dial: L.geometry(0.07, "min") };
}

function teapot(): THREE.BufferGeometry {
  const g = new VoxelGrid(9, 6, 6);
  g.box(2, 0, 1, 7, 4, 5, 0x5a3426);
  g.box(3, 4, 2, 6, 5, 4, 0x4a2a1e);
  g.set(4, 5, 3, 0x3a2016);
  g.box(7, 2, 2, 9, 3, 3, 0x5a3426); // spout
  g.box(0, 1, 2, 2, 3, 3, 0x4a2a1e); // handle
  return g.geometry(0.022, "center");
}

function cup(): THREE.BufferGeometry {
  const g = new VoxelGrid(4, 3, 4);
  g.box(0, 0, 0, 4, 3, 4, 0xf2efe6);
  g.box(0, 2, 0, 4, 3, 4, 0x3b5a9a);
  g.box(1, 2, 1, 3, 3, 3, 0x8a6a2a); // tea
  return g.geometry(0.024, "center");
}

function magnifier(): THREE.BufferGeometry {
  const g = new VoxelGrid(5, 9, 1);
  for (let j = 0; j < 9; j++) for (let i = 0; i < 5; i++) {
    const ring = j >= 4 && (i === 0 || i === 4 || j === 4 || j === 8);
    const glass = j > 4 && j < 8 && i > 0 && i < 4;
    if (ring) g.set(i, j, 0, 0x2a2420);
    else if (glass) g.set(i, j, 0, 0xc6dce6);
    else if (j < 4 && i === 2) g.set(i, j, 0, 0x5a3322);
  }
  return g.geometry(0.25, "center");
}

function phone(): { body: THREE.BufferGeometry; screen: THREE.Mesh } {
  const g = new VoxelGrid(3, 6, 1);
  g.box(0, 0, 0, 3, 6, 1, 0x141518);
  const screen = glowBox(0.5, 0.95, 0.05, 0x8fd0ff, 1.6);
  screen.position.set(0, 0, 0.16);
  return { body: g.geometry(0.2, "center"), screen };
}

export function buildCollector(): CollectorSet {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0907);
  const r = room();
  scene.add(vmesh(r.solid, { roughness: 0.92 }, { receive: true, cast: true }));
  const paneGlow = vglow(r.glow, 2.2);
  scene.add(paneGlow);

  // cabinets along the north wall
  const cabXs = [-2.9, -0.9, 1.1];
  // the stone the camera visits for "every one is a new world": the largest
  // eye-level pallasite in an outer cabinet, else the largest eye-level stone
  let alien: { pos: THREE.Vector3; score: number } | null = null;
  const stripMats: THREE.MeshBasicMaterial[] = [];
  cabXs.forEach((x, n) => {
    const cab = cabinet(n === 1);
    const m = vmesh(cab.frame, { roughness: 0.8 }, { receive: true, cast: true });
    m.position.set(x, 0, -2.45);
    scene.add(m);
    const s = vglow(cab.strips, 1.9);
    s.position.copy(m.position);
    scene.add(s);
    stripMats.push(s.material as THREE.MeshBasicMaterial);
    // faint glass front
    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.7, 0.01),
      new THREE.MeshStandardMaterial({ color: 0xcfe0ea, transparent: true, opacity: 0.07, roughness: 0.05, metalness: 0.1, depthWrite: false }),
    );
    glass.position.set(x + 0.9, 1.05, -1.98);
    glass.name = n === 1 ? "middleGlass" : `glass${n}`;
    scene.add(glass);
    const light = new THREE.PointLight(0xffe2b4, 1.4, 1.8, 2);
    light.position.set(x + 0.9, 1.5, -2.15);
    scene.add(light);
    // stones on the shelves
    const rng = mulberry32(40 + n);
    for (const shelfY of [0.7, 1.1, 1.5, 1.95]) {
      if (n === 1 && shelfY === 1.1) continue; // the tray of iron meteorites
      const count = 3 + Math.floor(rng() * 2);
      for (let s = 0; s < count; s++) {
        const kind = Math.floor(rng() * 5);
        const rad = 3 + Math.floor(rng() * 3);
        const geo = rockGeometry(n * 31 + s * 7 + Math.round(shelfY * 10), rad, 0.011, stonePalette(kind, s + n * 10), 0.5);
        const stone = vmesh(geo, { roughness: 0.6, metalness: kind === 0 ? 0.5 : 0.05 }, { cast: true });
        const sx = x + 0.25 + (s + 0.5) * (1.3 / count);
        stone.position.set(sx, shelfY + 0.05 + rad * 0.011, -2.22);
        stone.rotation.set(rng() * 3, rng() * 3, rng() * 3);
        scene.add(stone);
        if (shelfY === 1.5 && n !== 1) {
          // off to the side of the cabinet lamp, so it is lit like a planet, half in shadow
          const sideLit = Math.abs(sx - (x + 0.9)) > 0.35;
          const score = rad + (kind === 2 ? 10 : 0) + (n === 0 ? 0.5 : 0) + (sideLit ? 20 : 0);
          if (!alien || score > alien.score) alien = { pos: stone.position.clone(), score };
        }
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.09), new THREE.MeshStandardMaterial({ color: 0x1a1a1e, roughness: 0.4 }));
        stand.position.set(sx, shelfY + 0.015, -2.22);
        scene.add(stand);
      }
    }
  });

  // three iron meteorites in the velvet tray (middle cabinet)
  const irons = [0, 1, 2].map((k) => {
    const m = vmesh(k === 0 ? etchedIron(91) : rockGeometry(92 + k, 6, 0.0078, ironPalette(92 + k), 0.5), { roughness: 0.4, metalness: 0.6 }, { cast: true });
    scene.add(m);
    return m;
  });
  const trayPos = (k: number) => new THREE.Vector3(-0.9 + (0.55 + k * 0.4), 1.2, -2.22);

  // furniture
  const table = vmesh(teaTable(), { roughness: 0.7 }, { cast: true, receive: true });
  table.position.set(-0.45, 0, -0.15);
  scene.add(table);
  const velvet = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.012, 0.3), new THREE.MeshStandardMaterial({ color: 0x1d3a2a, roughness: 1 }));
  velvet.position.set(0.0, 0.806, 0.12);
  velvet.name = "velvet";
  scene.add(velvet);
  const chairE = vmesh(chair(), { roughness: 0.7 }, { cast: true, receive: true });
  chairE.position.set(1.12, 0, 0.55);
  chairE.rotation.y = -Math.PI / 2;
  scene.add(chairE);
  const chairW = vmesh(chair(), { roughness: 0.7 }, { cast: true, receive: true });
  chairW.position.set(-1.12, 0, 0.05);
  chairW.rotation.y = Math.PI / 2;
  scene.add(chairW);
  const bench = vmesh(workbench(), { roughness: 0.75 }, { cast: true, receive: true });
  bench.position.set(-3.45, 0, -1.2);
  scene.add(bench);
  const stool = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.48, 0.36), new THREE.MeshStandardMaterial({ color: WOOD_D, roughness: 0.8 }));
  stool.position.set(-2.2, 0.24, -0.1);
  scene.add(stool);
  const safe = vmesh(safeBox(), { roughness: 0.5, metalness: 0.4 }, { cast: true });
  safe.position.set(2.7, 0, -2.4);
  scene.add(safe);
  const rad = radio();
  // an old valve radio on the workbench, dial toward the room
  const radioBody = vmesh(rad.body, { roughness: 0.7 });
  radioBody.position.set(-2.95, 0.8, 0.62);
  radioBody.rotation.y = Math.PI;
  scene.add(radioBody);
  const radioDial = vglow(rad.dial, 2.0);
  radioDial.position.copy(radioBody.position);
  radioDial.rotation.y = Math.PI;
  radioDial.name = "radioDial";
  scene.add(radioDial);
  // desk lamp + microscope on the workbench
  const lampG = new VoxelGrid(5, 9, 5);
  lampG.box(1, 0, 1, 4, 1, 4, 0x1e3a2c).box(2, 1, 2, 3, 7, 3, 0x2a2a2a).box(0, 7, 0, 5, 9, 5, 0x1e5a3a);
  const lamp = vmesh(lampG.geometry(0.06, "min"), { roughness: 0.5, metalness: 0.3 }, { cast: true });
  lamp.position.set(-3.3, 0.8, -1.05);
  scene.add(lamp);
  const bulb = glowBox(0.22, 0.02, 0.22, 0xfff0c8, 4);
  bulb.position.set(-3.15, 1.31, -0.9);
  scene.add(bulb);
  const microG = new VoxelGrid(4, 8, 4);
  microG.box(0, 0, 0, 4, 1, 4, 0x2a2a2e).box(1, 1, 0, 2, 7, 1, 0x3a3a40).box(1, 5, 1, 2, 8, 3, 0x1e1e22).box(0, 3, 1, 3, 4, 3, 0x6a6a70);
  const micro = vmesh(microG.geometry(0.06, "min"), { roughness: 0.4, metalness: 0.5 }, { cast: true });
  micro.position.set(-3.3, 0.8, 0.55);
  scene.add(micro);

  // tea things
  const pot = vmesh(teapot(), { roughness: 0.5 }, { cast: true });
  scene.add(pot);
  const cupGeo = cup();
  const cups = [0, 1].map(() => {
    const grp = new THREE.Group();
    grp.add(vmesh(cupGeo, { roughness: 0.3 }, { cast: true }));
    scene.add(grp);
    return grp;
  });

  /* ------------------------------------------------------------ lights */
  const hemi = new THREE.HemisphereLight(0x8a7560, 0x2a221c, 0.55);
  scene.add(hemi);
  const windowSun = new THREE.SpotLight(0xffd2a0, 160, 0, 0.42, 0.5, 2);
  windowSun.position.set(-7.2, 3.6, 0.9);
  windowSun.target.position.set(-1.0, 0, 0.1);
  windowSun.castShadow = true;
  windowSun.shadow.mapSize.set(2048, 2048);
  windowSun.shadow.bias = -0.0004;
  windowSun.shadow.camera.near = 2;
  windowSun.shadow.camera.far = 14;
  scene.add(windowSun, windowSun.target);
  const doorLight = new THREE.SpotLight(0xfff0dc, 70, 0, 0.5, 0.6, 2);
  doorLight.position.set(6.5, 2.4, 1.2);
  doorLight.target.position.set(0.8, 0, 0.8);
  doorLight.castShadow = true;
  doorLight.shadow.mapSize.set(1024, 1024);
  scene.add(doorLight, doorLight.target);
  const deskLamp = new THREE.SpotLight(0xffd9a0, 5, 3, 0.75, 0.6, 2);
  deskLamp.position.set(-3.15, 1.28, -0.9);
  deskLamp.target.position.set(-2.95, 0.78, -0.3);
  scene.add(deskLamp, deskLamp.target);
  const fill = new THREE.PointLight(0xffc890, 1.4, 6, 2);
  fill.position.set(0.4, 2.6, 1.6);
  scene.add(fill);

  // dust turning in the window light stands in for the beam itself
  const dust = new Particles(320, { additive: true });
  scene.add(dust.points);

  /* ------------------------------------------------------------ actors */
  const zhang = new Actor({ face: ZHANG_FACE, heightM: 1.8, exprs: ["neutral", "blink", "talk", "smile", "smileTalk", "grim"], outfits: { coat: coatNavy } });
  const collector = new Actor({ face: COLLECTOR_FACE, heightM: 1.72, exprs: ["neutral", "blink", "talk", "smile", "smileTalk", "laugh", "awkward"], outfits: { cardigan } });
  scene.add(zhang.holder, collector.holder);

  const mag = vmesh(magnifier(), { roughness: 0.3, metalness: 0.2 });
  mag.position.set(0, 0.3, 1.2);
  collector.fig.anchors.handR.add(mag);
  const ph = phone();
  const phoneMesh = vmesh(ph.body, { roughness: 0.3, metalness: 0.4 });
  phoneMesh.add(ph.screen);
  phoneMesh.position.set(0, 0.2, 0.8);
  phoneMesh.rotation.x = -0.9;
  zhang.fig.anchors.handR.add(phoneMesh);

  /* ----------------------------------------------------------- blocking */
  const SEAT_LIFT = -4.1; // px: hips down to chair height
  const SIT: Pose = { legR: [-Math.PI / 2, 0, 0.05], legL: [-Math.PI / 2, 0, -0.05], lift: SEAT_LIFT, armR: [-0.55, 0, 0.1], armL: [-0.5, 0, -0.1] };
  const STAND: Pose = { armR: [0, 0, 0.06], armL: [0, 0, -0.06] };
  const BENT: Pose = { hips: [0.35, 0, 0], legR: [-Math.PI / 2 - 0.35, 0, 0.05], legL: [-Math.PI / 2 - 0.35, 0, -0.05], lift: -4.3, armR: [-1.6, 0.2, 0.25], armL: [-0.95, 0, -0.1], neck: [0.25, 0, 0] };

  // collector: position, facing (yaw), pose
  const cPos: Key<V3>[] = [
    [15, [-2.2, 0, -0.1]],
    [C.rise + 0.6, [-2.2, 0, -0.1]],
    [29.2, [-1.1, 0, 0.55]],
    [33.2, [-1.1, 0, 0.55]],
    [33.9, [-1.12, 0, 0.05]],
    [C.toCase[0], [-1.12, 0, 0.05]],
    [C.toCase[1], [0.0, 0, -1.55]],
    [86.6, [0.0, 0, -1.55]],
    [87.5, [-0.55, 0, 0.6]],
    [89.6, [-0.55, 0, 0.6]],
    [90.4, [-1.12, 0, 0.05]],
    [200, [-1.12, 0, 0.05]],
  ];
  const cYaw: Key<number>[] = [
    [15, -Math.PI / 2],
    [C.lookUp, -Math.PI / 2],
    [C.rise, Math.PI / 2 + 0.6],
    [27.6, Math.PI / 2 - 0.2],
    [29.2, Math.PI / 2 + 0.3],
    [33.9, Math.PI / 2],
    [C.toCase[0], Math.PI / 2],
    [C.toCase[0] + 0.6, Math.PI],
    [C.stoneOut, Math.PI],
    [C.stoneOut + 0.4, Math.PI / 2 + 0.5],
    [86.6, Math.PI / 2 + 0.5],
    [87.3, Math.PI / 4],
    [89.6, Math.PI / 4],
    [90.4, Math.PI / 2],
  ];
  // zhang: enters from the door, takes in the room, sits
  const zPos: Key<V3>[] = [
    [15, [4.2, 0, 1.1]],
    [C.enter, [3.55, 0, 1.1]],
    [24.8, [1.75, 0, 1.0]],
    [29.6, [1.75, 0, 1.0]],
    [31.0, [1.12, 0, 0.55]],
    [200, [1.12, 0, 0.55]],
  ];
  const zYaw: Key<number>[] = [
    [15, -Math.PI / 2],
    [24.8, -Math.PI / 2],
    [25.6, -Math.PI / 2 - 0.9],
    [27.2, -Math.PI / 2 - 0.5],
    [28.4, -Math.PI / 2 + 0.25],
    [29.6, -Math.PI / 2 + 0.15],
    [31.0, -Math.PI / 2],
    [C.toCase[0], -Math.PI / 2],
    [C.toCase[1], -Math.PI / 2 - 0.55],
    [86.8, -Math.PI / 2 - 0.4],
    [88.0, -Math.PI / 2],
  ];

  const collectorPose = (t: number): Pose => {
    if (t < C.rise) {
      // bent over the bench, lens to the eye; straightens and turns at the look-up
      const up = smooth(seg(t, C.lookUp, C.lookUp + 0.6));
      const p = trackPose([[0, BENT], [1, { ...BENT, hips: [0.05, 0, 0], legR: [-Math.PI / 2 - 0.05, 0, 0.05], legL: [-Math.PI / 2 - 0.05, 0, -0.05], armR: [-0.38, 0, 0.15], neck: [-0.05, 0, 0] }]], up);
      return addPose(p, { neck: [Math.sin(t * 0.7) * 0.03, 0, 0] });
    }
    if (t < C.rise + 0.8) return trackPose([[0, { ...SIT, armR: [-0.38, 0, 0.15] }], [1, STAND]], seg(t, C.rise, C.rise + 0.8));
    const walking = (t > C.rise + 0.8 && t < 29.2) || (t > C.toCase[0] && t < C.toCase[1]) || (t > 86.6 && t < 87.5) || (t > 89.6 && t < 90.4);
    if (walking) return walkPose(t, 1.3);
    if (t >= 29.2 && t < 31.0) return { ...STAND, armR: [-0.9, 0.3, -0.45] }; // "please, sit"
    if (t >= 31.0 && t < 33.2) {
      // pouring: right arm out over the table, wrist tilting
      const tilt = Math.sin(seg(t, 31.0, 33.0) * Math.PI) * 0.35;
      return { ...STAND, armR: [-1.15 - tilt, 0.3, 0.15], armL: [-0.5, 0, -0.2], neck: [0.35, 0, 0] };
    }
    if (t >= 33.2 && t < 33.9) return trackPose([[0, STAND], [1, SIT]], seg(t, 33.2, 33.9));
    if (t >= C.toCase[1] && t < 86.6) {
      // at the cabinet: slide the glass, lift a stone, hold it out
      if (t < C.stoneOut + 0.3) return { ...STAND, armR: [-1.55, 0, 0.1], neck: [0.15, 0, 0] };
      const heft = Math.sin(t * 2.2) * 0.06;
      return { ...STAND, armR: [-1.25 + heft, 0.1, 0.05], neck: [0.2, 0, 0] };
    }
    if (t >= 87.5 && t < 89.6) {
      const k = (t - 87.5) % 0.8;
      return { ...STAND, armR: [-1.0 - Math.sin((k / 0.8) * Math.PI) * 0.35, 0.2, 0.1], neck: [0.5, 0, 0] };
    }
    if (t >= 90.4 && t < 91.1) return trackPose([[0, STAND], [1, SIT]], seg(t, 90.4, 91.1));
    // seated performance
    let p: Pose = { ...SIT };
    if (t > 48.4 && t < 53.4) p = addPose(p, { armR: [-0.95 + Math.sin(t * 1.7) * 0.15, -0.5, 0.25], neck: [-0.1, 0.25, 0] });
    if (t > C.laugh[0] && t < C.laugh[1]) {
      const k = Math.sin(t * 13) * 0.05;
      p = addPose(p, { armR: [-1.15, 0.45, 0.2], neck: [-0.25 + k, 0, 0], hips: [-0.08 + k * 0.5, 0, 0] });
    }
    if (t > 96.2 && t < 99.2) p = addPose(p, { armL: [-2.3, 0, -0.3], neck: [0.1, 0, 0.12] }); // scratches his head
    if (t > 67.0 && t < 71.4) p = addPose(p, { armL: [-0.75, 0.3, -0.15] });
    return addPose(p, { neck: [Math.sin(t * 0.43) * 0.03, Math.sin(t * 0.31) * 0.06, 0] });
  };

  const zhangPose = (t: number): Pose => {
    const walking = (t > C.enter - 0.2 && t < 24.8) || (t > 29.6 && t < 31.0);
    if (walking) return walkPose(t, 1.25);
    if (t < 29.6) return { ...STAND, neck: [-0.05, Math.sin(t * 0.5) * 0.15, 0] };
    if (t < 31.8) return trackPose([[0, STAND], [1, SIT]], seg(t, 31.0, 31.8));
    let p: Pose = { ...SIT, armR: [-0.6, 0, 0.05], armL: [-0.6, 0, -0.05] };
    // the cup: raised for "this tea is a meteorite too"
    if (t > 57.6 && t < 62.6) p = addPose(p, { armR: [-0.75 * smooth(seg(t, 57.6, 58.6)) * (1 - smooth(seg(t, 61.8, 62.6))), 0, 0] });
    if (t > 35.0 && t < 37.2) p = addPose(p, { neck: [0.18 * Math.sin(seg(t, 36.5, 37.2) * Math.PI), 0, 0] }); // a nod
    if (t > C.phoneOut - 0.4 && t < 103.4) p = addPose(p, { armR: [-0.45, 0, -0.15], neck: [0.3, 0, 0] });
    if (t > 53.6 && t < 57.6) p = addPose(p, { neck: [0, Math.sin(seg(t, 53.6, 55.0) * Math.PI * 2) * 0.12, 0] }); // shakes head
    return addPose(p, { neck: [Math.sin(t * 0.37) * 0.02, Math.sin(t * 0.27) * 0.04, 0] });
  };

  const collectorExpr = (t: number) => {
    let e: "neutral" | "smile" | "laugh" | "awkward" = "smile";
    if (t < C.lookUp) e = "neutral";
    if (t > C.laugh[0] && t < C.laugh[1]) e = "laugh";
    if (t > 95.2 && t < 99.4) e = "awkward";
    if (t > 101.0 && t < 105.8) e = "neutral";
    return e;
  };
  const zhangExpr = (t: number) => {
    if (t > 53.4 && t < 63.6) return "smile" as const;
    if (t > 99.0) return "grim" as const;
    return "neutral" as const;
  };

  const tmp = new THREE.Vector3();
  const head = (actor: Actor, out = new THREE.Vector3()) => {
    actor.fig.anchors.head.updateWorldMatrix(true, false);
    return actor.fig.anchors.head.localToWorld(out.set(0, -4, 0));
  };

  return {
    scene,
    zhang,
    collector,
    irons,
    cups,
    head,
    points: {
      table: new THREE.Vector3(0, 0.8, 0.3),
      cabinet: new THREE.Vector3(0, 1.2, -2.2),
      tray: trayPos(1),
      bench: new THREE.Vector3(-2.9, 0.85, -0.3),
      door: new THREE.Vector3(3.5, 1.4, 1.1),
      radio: new THREE.Vector3(-3.1, 0.95, 0.3),
      velvet: new THREE.Vector3(0, 0.82, 0.12),
      alien: (alien as { pos: THREE.Vector3 } | null)?.pos ?? new THREE.Vector3(-2.0, 1.6, -2.22),
    },
    update(t, morning = false) {
      /* lighting state */
      // in daylight the cabinet strips read dimmer
      for (const sm of stripMats) sm.color.setScalar(morning ? 0.9 : 1.9);
      if (morning) {
        windowSun.color.set(0xffe6c4);
        windowSun.intensity = 210;
        windowSun.position.set(-7.0, 4.4, -0.3);
        doorLight.intensity = 40;
        hemi.intensity = 0.7;
      } else {
        windowSun.color.set(0xffc890);
        windowSun.intensity = 160;
        windowSun.position.set(-7.2, 3.6, 0.9);
        doorLight.intensity = 70;
        hemi.intensity = 0.55;
      }

      /* collector */
      const cp = trackV3(cPos, morning ? 15 : t);
      collector.holder.position.copy(cp);
      collector.holder.rotation.y = trackNum(cYaw, morning ? 15 : t);
      if (morning) {
        // the next morning: back at the bench, the lens lowered as the news comes on
        const pause = smooth(seg(t, E.pause, E.pause + 0.8)) * (1 - smooth(seg(t, 347.6, 349.6)));
        const p = trackPose([[0, BENT], [1, { ...BENT, hips: [0.1, 0, 0], armR: [-0.9, 0, 0.25], neck: [-0.05, -0.5, 0] }]], pause);
        collector.pose(p);
        collector.perform(t, "neutral", speaking("收藏者", t), 3);
      } else {
        collector.pose(collectorPose(t));
        collector.perform(t, collectorExpr(t), speaking("收藏者", t), 3);
      }
      mag.visible = morning || t < C.rise + 0.4;

      /* zhang */
      zhang.holder.visible = !morning;
      if (!morning) {
        zhang.holder.position.copy(trackV3(zPos, t));
        zhang.holder.rotation.y = trackNum(zYaw, t);
        zhang.pose(zhangPose(t));
        zhang.perform(t, zhangExpr(t), speaking("章北海", t, ["dialogue"]), 5);
      }
      phoneMesh.visible = !morning && t > C.phoneOut && t < 103.4;
      (ph.screen.material as THREE.MeshBasicMaterial).color.set(t > C.pay ? 0x7dffa8 : 0x8fd0ff).multiplyScalar(1.6);

      /* tea things */
      pot.position.set(0.12, 0.84, -0.02);
      pot.rotation.set(0, 0.4, 0);
      if (!morning && t > 30.9 && t < 33.1) {
        collector.fig.anchors.handR.updateWorldMatrix(true, false);
        collector.fig.anchors.handR.getWorldPosition(pot.position);
        pot.rotation.set(0, Math.PI / 2, Math.sin(seg(t, 31.0, 33.0) * Math.PI) * 0.7);
      }
      const cupRest = [new THREE.Vector3(0.28, 0.83, 0.34), new THREE.Vector3(-0.28, 0.83, 0.3)];
      cups.forEach((c, k) => {
        c.visible = !morning;
        c.position.copy(cupRest[k]!);
        c.rotation.set(0, k * 0.6, 0);
      });
      if (!morning && t > 58.0 && t < 62.2) {
        // Zhang lifts his cup
        zhang.fig.anchors.handR.updateWorldMatrix(true, false);
        zhang.fig.anchors.handR.getWorldPosition(tmp);
        const k = smooth(seg(t, 58.0, 58.6)) * (1 - smooth(seg(t, 61.6, 62.2)));
        cups[0]!.position.lerp(tmp.add(new THREE.Vector3(-0.05, 0.09, 0)), k);
      }

      /* iron meteorites: tray → his hand → the velvet; gone in the morning */
      const velvetPos = (k: number) => new THREE.Vector3(-0.12 + k * 0.12, 0.85, 0.12 + (k === 1 ? 0.04 : 0));
      irons.forEach((m, k) => {
        if (morning) {
          m.visible = false;
          return;
        }
        m.visible = true;
        m.rotation.set(k * 1.1, k * 0.7 + 0.3, 0);
        const placed = C.stonesDown[k]!;
        if (t >= placed) {
          m.position.copy(velvetPos(k));
          if (k === 0) m.rotation.set(-0.5, 0.2, 0); // the etched face up toward the light
          return;
        }
        if (k === 0 && t >= C.stoneOut) {
          collector.fig.anchors.handR.updateWorldMatrix(true, false);
          collector.fig.anchors.handR.getWorldPosition(m.position);
          m.position.y += 0.05;
          m.rotation.set(-0.3 + t * 0.1, t * 0.3, 0);
          return;
        }
        if (k > 0 && t >= C.stonesDown[0]!) {
          // brought over by the collector's hand
          collector.fig.anchors.handR.updateWorldMatrix(true, false);
          collector.fig.anchors.handR.getWorldPosition(m.position);
          m.position.y += 0.04;
          return;
        }
        m.position.copy(trayPos(k));
      });
      const midGlass = scene.getObjectByName("middleGlass")!;
      const open = !morning ? smooth(seg(t, C.glassSlide, C.glassSlide + 0.5)) * (1 - smooth(seg(t, 90, 90.6))) : 0;
      midGlass.position.x = 0 + open * 0.55;

      /* dust in the window light */
      dust.update((i, s) => {
        const rr = mulberry32(700 + i);
        const bx = -3.2 + rr() * 2.6;
        const by = 0.4 + rr() * 2.3;
        const bz = -0.9 + rr() * 1.8;
        s.p.set(bx + Math.sin(t * 0.13 + i) * 0.15, by + Math.sin(t * 0.09 + i * 1.7) * 0.2 - ((t * 0.01 + rr()) % 1) * 0.1, bz + Math.cos(t * 0.11 + i) * 0.15);
        const inBeam = Math.exp(-Math.pow((s.p.y - (1.9 - (s.p.x + 3.4) * 0.42)) / 0.55, 2));
        s.size = 0.006 + rr() * 0.006;
        s.alpha = 0.55 * inBeam * (0.5 + 0.5 * Math.sin(t * 2 + i));
        s.c.setRGB(1.0, 0.86, 0.66);
        return s.alpha > 0.02;
      });
    },
  };
}

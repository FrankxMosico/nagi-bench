import * as THREE from "three";
import { VoxelGrid, vmesh, vglow, jitter } from "../vox";
import { glowSprite } from "../fx";
import { hashInt } from "../util";
import { HATCH, RIM_HALF } from "./space-common";

/**
 * The Yellow River station: a horizontal wheel 864 m across, built from 4 m
 * blocks, plus a finely detailed 0.5 m patch of hull around the exit hatch
 * where the photograph is taken.
 */

export interface Station {
  group: THREE.Group;
  door: THREE.Group;
  signal: THREE.Mesh;
  signalLight: THREE.PointLight;
  interiorLight: THREE.PointLight;
  floods: THREE.SpotLight[];
  floodLamps: THREE.Mesh[];
  navLights: THREE.Mesh[];
  /** Set the door opening 0..1 and the signal colour. */
  setHatch(open: number, green: boolean, t: number): void;
}

const HULL = 0xd8dad7;
const HULL_DARK = 0xa9adb2;
const WINDOW = 0xffd7a0;

/** 12×12 pixel glyphs for 黄 and 河, painted on the hull beside the hatch. */
const GLYPH_HUANG = [
  "...#....#...",
  "############",
  "...#....#...",
  "...######...",
  "............",
  "############",
  "..########..",
  "..#..##..#..",
  "..########..",
  "..#..##..#..",
  "..########..",
  ".##......##.",
];
const GLYPH_HE = [
  "##..........",
  "..#.########",
  "...........#",
  "##...####..#",
  "..#..#..#..#",
  ".....#..#..#",
  "..#..####..#",
  "..#........#",
  ".#.........#",
  ".#.........#",
  "#.......#..#",
  "#........###",
];

function buildWheel(): { hull: THREE.BufferGeometry; windows: THREE.BufferGeometry } {
  const V = 4;
  const half = 424;
  const n = (half * 2) / V; // 212
  const ny = 26; // y from -52 .. 52
  const g = new VoxelGrid(n, ny, n);
  const win = new VoxelGrid(n, ny, n);
  for (let j = 0; j < ny; j++) {
    const y = -52 + (j + 0.5) * V;
    for (let k = 0; k < n; k++) {
      const z = -half + (k + 0.5) * V;
      for (let i = 0; i < n; i++) {
        const x = -half + (i + 0.5) * V;
        const r = Math.hypot(x, z);
        const ang = Math.atan2(z, x);
        let c: number | null = null;
        // rim
        if (r >= 368 && r <= 432 && Math.abs(y) < RIM_HALF) {
          const step = Math.floor(((ang + Math.PI) / (Math.PI * 2)) * 600);
          const seam = step % 6 === 0;
          c = jitter(seam ? HULL_DARK : HULL, 0.05, hashInt(Math.floor(i / 2), j, Math.floor(k / 2)));
          const outer = r >= 428;
          const inner = r <= 372;
          if ((outer || inner) && Math.abs(y) < 14 && step % 2 === 0 && Math.abs(y) > 2) {
            win.set(i, j, k, hashInt(i, j, k) > 0.18 ? WINDOW : 0x6a7d96);
          }
          // two rings of lit ports on the Earth-facing underside
          const bottom = y < -RIM_HALF + 4;
          if (bottom && (r < 374 || r > 426) && step % 3 === 0) win.set(i, j, k, hashInt(k, j, i) > 0.25 ? WINDOW : 0xbfd8ff);
          // carve the hatch shaft
          const dx = x - HATCH.x;
          const dz = z - HATCH.z;
          if (Math.hypot(dx, dz) < 6 && y < -14) c = null;
        }
        // hub
        if (r <= 44 && Math.abs(y) < 48) {
          c = jitter(Math.abs(y) > 40 ? HULL_DARK : HULL, 0.05, hashInt(i, j, k));
          if (r > 40 && Math.abs(y) < 30 && (j + Math.floor(ang * 6)) % 3 === 0) win.set(i, j, k, WINDOW);
        }
        // spokes, every 60 degrees, skewed off the hatch line
        if (r > 40 && r < 370 && Math.abs(y) < 8) {
          for (let s = 0; s < 6; s++) {
            const a = (s / 6) * Math.PI * 2 + Math.PI / 6;
            const px = Math.cos(a);
            const pz = Math.sin(a);
            const along = x * px + z * pz;
            const perp = Math.abs(-x * pz + z * px);
            if (along > 0 && perp < 6) {
              c = jitter(0xc8ccd0, 0.06, hashInt(i, j, k));
              if (Math.abs(y) < 3 && perp < 3 && Math.floor(along / 8) % 3 === 0) win.set(i, j, k, WINDOW);
            }
          }
        }
        if (c !== null) g.set(i, j, k, c);
      }
    }
  }
  // radiator fins on the hub, top and bottom
  for (let s = 0; s < 4; s++) {
    const a = (s / 4) * Math.PI * 2;
    for (let d = 46; d < 120; d += 4) {
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      const i = Math.floor((x + half) / V);
      const k = Math.floor((z + half) / V);
      for (let j = 20; j < 24; j++) g.set(i, j, k, 0x8d939a);
      for (let j = 2; j < 6; j++) g.set(i, j, k, 0x8d939a);
    }
  }
  return { hull: g.geometry(V, "min").translate(-half, -52, -half), windows: win.geometry(V, "min").translate(-half, -52, -half) };
}

function buildPatch(): { hull: THREE.BufferGeometry; glyphs: THREE.BufferGeometry; tube: THREE.BufferGeometry } {
  // Fine patch 64 m × 40 m around the hatch, voxel 0.5 m.
  const V = 0.5;
  const nx = 128;
  const nz = 132;
  const ny = 16; // 8 m deep, starting 1 m below the coarse underside
  const x0 = -32;
  const z0 = HATCH.z - 33;
  const y0 = -RIM_HALF - 1.0;
  const g = new VoxelGrid(nx, ny, nz);
  const glyph = new VoxelGrid(nx, ny, nz);
  const tube = new VoxelGrid(nx, ny, nz);
  for (let k = 0; k < nz; k++) {
    const z = z0 + (k + 0.5) * V;
    for (let i = 0; i < nx; i++) {
      const x = x0 + (i + 0.5) * V;
      const r = Math.hypot(x, z);
      if (r < 369.5 || r > 430.5) continue;
      const dx = x - HATCH.x;
      const dz = z - HATCH.z;
      const dh = Math.hypot(dx, dz);
      // hull skin, 0.5 m proud of the coarse rim
      const panel = (i % 16 === 0 || k % 12 === 0);
      let skin = jitter(panel ? 0xb9bdc2 : HULL, 0.035, hashInt(Math.floor(i / 4), Math.floor(k / 4)));
      // hazard ring around the hatch
      if (dh > 3.9 && dh < 4.6) {
        const a = Math.atan2(dz, dx);
        skin = Math.floor((a + Math.PI) / (Math.PI / 10)) % 2 === 0 ? 0xe2b432 : 0x24262a;
      }
      // painted name 黄河 to the right of the hatch, flush with the skin
      const gx = Math.floor(x - 8);
      const gz = Math.floor(HATCH.z + 6 - z);
      if (gz >= 0 && gz < 12) {
        let on = false;
        if (gx >= 0 && gx < 12) on = GLYPH_HUANG[gz]![gx] === "#";
        else if (gx >= 14 && gx < 26) on = GLYPH_HE[gz]![gx - 14] === "#";
        if (on) skin = 0xa62f27;
      }
      // stencilled registration marks on the left
      if (x < -10 && x > -24 && Math.abs(dz) < 0.75 && Math.floor(x) % 2 === 0) skin = 0x2b2e33;
      if (dh >= 3.0) {
        g.set(i, 1, k, skin);
        g.set(i, 2, k, skin);
      }
      // raised frame ring
      if (dh >= 3.0 && dh < 3.8) g.set(i, 0, k, 0x5a6068);
      // airlock shaft walls
      if (dh >= 3.0 && dh < 3.6) for (let j = 1; j < 14; j++) tube.set(i, j, k, j % 4 === 0 ? 0x7a828c : 0xcfd3d8);
      if (dh < 3.0) tube.set(i, 14, k, 0xbfc5cc);
      // handrail posts and rail at r = 6 m
      if (dh > 6.0 && dh < 6.5) {
        const a = Math.atan2(dz, dx);
        const post = Math.floor((a + Math.PI) / (Math.PI / 6)) % 2 === 0 && Math.abs(Math.sin(a * 6)) < 0.25;
        if (post) glyph.set(i, 0, k, 0xd9a52e);
      }
    }
  }
  const off = new THREE.Vector3(x0, y0, z0);
  return {
    hull: g.geometry(V, "min").translate(off.x, off.y, off.z),
    glyphs: glyph.geometry(V, "min").translate(off.x, off.y, off.z),
    tube: tube.geometry(V, "min").translate(off.x, off.y, off.z),
  };
}

function doorGeometry(): THREE.BufferGeometry {
  const g = new VoxelGrid(13, 1, 13);
  for (let k = 0; k < 13; k++) {
    for (let i = 0; i < 13; i++) {
      const d = Math.hypot(i - 6, k - 6);
      if (d > 6.2) continue;
      let c = d > 5.2 ? 0x8d949c : 0xc9ced3;
      if (Math.abs(i - 6) <= 0 && d < 4) c = 0x9aa1a9;
      if ((i === 3 || i === 9) && Math.abs(k - 6) < 2) c = 0xd5a13a;
      g.set(i, 0, k, c);
    }
  }
  return g.geometry(0.5, "center");
}

export function buildStation(): Station {
  const group = new THREE.Group();
  const wheel = buildWheel();
  const hull = vmesh(wheel.hull, { roughness: 0.62, metalness: 0.22 }, { receive: true });
  const windows = vglow(wheel.windows, 1.6);
  group.add(hull, windows);

  const patch = buildPatch();
  const patchMesh = vmesh(patch.hull, { roughness: 0.55, metalness: 0.25 }, { receive: true });
  const glyphMesh = vmesh(patch.glyphs, { roughness: 0.7 }, { receive: true });
  const tubeMesh = vmesh(patch.tube, { roughness: 0.6 });
  group.add(patchMesh, glyphMesh, tubeMesh);

  // the hatch door slides along the hull
  const door = new THREE.Group();
  const doorMesh = vmesh(doorGeometry(), { roughness: 0.5, metalness: 0.35 }, { receive: true });
  door.add(doorMesh);
  door.position.set(HATCH.x, HATCH.y - 0.25, HATCH.z);
  group.add(door);

  // signal lamp beside the hatch
  const signalMat = new THREE.MeshBasicMaterial({ color: 0xff2a1a });
  const signal = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.9), signalMat);
  signal.position.set(HATCH.x + 5.2, HATCH.y - 0.9, HATCH.z + 1.6);
  const housing = vmesh(new VoxelGrid(1, 1, 1).set(0, 0, 0, 0x3b4047).geometry(1.3, "center"));
  housing.position.copy(signal.position).add(new THREE.Vector3(0, 0.45, 0));
  group.add(signal, housing);
  const signalLight = new THREE.PointLight(0xff2a1a, 18, 26, 2);
  signalLight.position.copy(signal.position).add(new THREE.Vector3(0, -0.8, 0));
  group.add(signalLight);

  const interiorLight = new THREE.PointLight(0xfff0d8, 0, 30, 2);
  interiorLight.position.set(HATCH.x, HATCH.y + 3.5, HATCH.z);
  group.add(interiorLight);

  // floodlights aimed down at the photo position
  const floods: THREE.SpotLight[] = [];
  const floodLamps: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) {
    const lampPos = new THREE.Vector3(HATCH.x + sx * 9, HATCH.y - 1.0, HATCH.z + 3.5);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 0.9), new THREE.MeshBasicMaterial({ color: 0xfff6e8 }));
    lamp.position.copy(lampPos);
    group.add(lamp);
    floodLamps.push(lamp);
    const spot = new THREE.SpotLight(0xf3f6ff, 0, 0, 0.42, 0.6, 2);
    spot.position.copy(lampPos);
    spot.target.position.set(HATCH.x - sx * 2, HATCH.y - 70, HATCH.z - 2);
    group.add(spot, spot.target);
    floods.push(spot);
  }

  // navigation lights around the rim
  const navLights: THREE.Mesh[] = [];
  for (let s = 0; s < 12; s++) {
    const a = (s / 12) * Math.PI * 2;
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({ color: s % 3 === 0 ? 0xff3322 : s % 3 === 1 ? 0x33ff66 : 0xffffff }),
    );
    m.position.set(Math.cos(a) * 421, -RIM_HALF - 1, Math.sin(a) * 421);
    group.add(m);
    navLights.push(m);
  }

  // elevator ribbon down to Earth, with a climber partway
  const cable = new THREE.Mesh(
    new THREE.BoxGeometry(10, 400000, 10),
    new THREE.MeshStandardMaterial({ color: 0xb8bec6, roughness: 0.5, metalness: 0.4, emissive: 0x1a1e24 }),
  );
  cable.position.set(0, -48 - 200000, 0);
  group.add(cable);
  const climberG = new VoxelGrid(8, 10, 8);
  climberG.box(0, 0, 0, 8, 10, 8, 0xc9ccd0).box(1, 3, 0, 7, 7, 1, 0xffd7a0).box(0, 4, 3, 1, 6, 5, 0xffd7a0);
  const climber = vmesh(climberG.geometry(4, "center"), { roughness: 0.6 });
  climber.position.set(0, -2600, 0);
  group.add(climber);
  const climberGlow = glowSprite(0xffe2b0, 30, 1.2);
  climberGlow.position.set(0, -2580, 0);
  group.add(climberGlow);

  const red = new THREE.Color(0xff2a1a);
  const green = new THREE.Color(0x2bff6a);
  return {
    group,
    door,
    signal,
    signalLight,
    interiorLight,
    floods,
    floodLamps,
    navLights,
    setHatch(open, isGreen, t) {
      const drop = Math.min(1, open * 4);
      const slide = Math.max(0, (open - 0.25) / 0.75);
      door.position.set(HATCH.x + slide * 7.5, HATCH.y - 0.25 - drop * 0.7, HATCH.z);
      signalMat.color.copy(isGreen ? green : red).multiplyScalar(3.2);
      signalLight.color.copy(isGreen ? green : red);
      interiorLight.intensity = open * 160;
      navLights.forEach((m, i) => {
        const on = ((t * 0.9 + i * 0.37) % 1) < (i % 3 === 2 ? 0.08 : 0.5);
        m.visible = on;
      });
    },
  };
}

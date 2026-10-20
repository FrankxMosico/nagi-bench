import * as THREE from "three";
import { walk as walkPose, type Pose } from "@agentbench/voxel-kit";
import { Actor, coatNavy, ZHANG_FACE } from "../cast";
import { VoxelGrid, vmesh, jitter, mirrorZ } from "../vox";
import { makeCanvas } from "../fx";
import { C } from "../../timeline";
import { addPose, hash1, hashInt, lerp, seg, smooth, mulberry32 } from "../util";

/**
 * A Beijing hutong late in the afternoon: grey brick, a red courtyard gate,
 * persimmons over the wall and a flock of pigeons wheeling overhead.
 * Lane runs along -Z; the gate is in the left wall (x < 0) at z = -14.
 */

export interface HutongSet {
  scene: THREE.Scene;
  zhang: Actor;
  gateLeaf: THREE.Group;
  update(t: number): void;
  zhangPos(t: number, out?: THREE.Vector3): THREE.Vector3;
}

export const GATE_Z = -14;
const HALF = 1.6;

export function skyTexture(top: string, mid: string, bottom: string): THREE.CanvasTexture {
  const c = makeCanvas(4, 128);
  const ctx = c.getContext("2d")!;
  const img = ctx.getImageData(0, 0, 4, 128);
  const ct = new THREE.Color(top);
  const cm = new THREE.Color(mid);
  const cb = new THREE.Color(bottom);
  const tmp = new THREE.Color();
  for (let y = 0; y < 128; y++) {
    const v = y / 127;
    if (v < 0.6) tmp.copy(ct).lerp(cm, v / 0.6);
    else tmp.copy(cm).lerp(cb, (v - 0.6) / 0.4);
    for (let x = 0; x < 4; x++) {
      const i = (y * 4 + x) * 4;
      img.data[i] = Math.round(tmp.r * 255);
      img.data[i + 1] = Math.round(tmp.g * 255);
      img.data[i + 2] = Math.round(tmp.b * 255);
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function brick(x: number, y: number, z: number, along: number): number {
  // 0.1 m voxels; bricks 3 voxels long, rows offset; mortar every 3rd course line
  const row = y;
  const off = row % 2 === 0 ? 0 : 1;
  const mortar = (along + off) % 4 === 0;
  if (mortar) return 0x8d8a84;
  const id = hashInt(Math.floor((along + off) / 4), row, x + z);
  return jitter(id > 0.85 ? 0x5f6266 : id > 0.6 ? 0x6e7176 : 0x7a7d82, 0.04, hashInt(x, y, z));
}

function buildLane(): { solid: THREE.BufferGeometry; glow: THREE.BufferGeometry } {
  const V = 0.1;
  const nx = 52; // x -2.6 .. 2.6
  const nz = 420; // z 2 .. -40
  const ny = 46; // y 0 .. 4.6
  const g = new VoxelGrid(nx, ny, nz);
  const L = new VoxelGrid(nx, ny, nz);
  const xi = (x: number) => Math.round((x + 2.6) / V);
  const zi = (z: number) => Math.round((2 - z) / V);
  // ground: worn grey bricks with a central gutter
  for (let k = 0; k < nz; k++) {
    for (let i = 0; i < nx; i++) {
      const x = -2.6 + (i + 0.5) * V;
      const gutter = Math.abs(x) < 0.12;
      const c = gutter ? 0x4c4d50 : jitter((i + Math.floor(k / 2)) % 5 === 0 ? 0x6b6a67 : 0x86847f, 0.06, hashInt(Math.floor(i / 2), Math.floor(k / 3)));
      g.set(i, 0, k, c);
      g.set(i, 1, k, c);
    }
  }
  // walls on both sides
  const wallH = 32; // 3.2 m
  for (let k = 0; k < nz; k++) {
    for (const side of [-1, 1]) {
      const inner = side < 0 ? xi(-HALF) - 1 : xi(HALF);
      for (let w = 0; w < 4; w++) {
        const i = side < 0 ? inner - w : inner + w;
        for (let j = 2; j < wallH; j++) g.set(i, j, k, brick(i, j, k, k));
        // tiled coping with a small overhang
        for (let j = wallH; j < wallH + 3; j++) g.set(i, j, k, j === wallH + 2 ? 0x3d3f43 : 0x4b4e53);
      }
      const lip = side < 0 ? inner + 1 : inner - 1;
      g.set(lip, wallH + 1, k, 0x3d3f43);
      // plinth of darker stone
      for (let j = 2; j < 6; j++) g.set(inner, j, k, jitter(0x55575a, 0.05, hashInt(k, j)));
    }
  }
  // the courtyard gate in the left wall
  const gz0 = zi(GATE_Z + 0.75);
  const gz1 = zi(GATE_Z - 0.75);
  const gi = xi(-HALF) - 1;
  for (let k = gz0; k < gz1; k++) for (let j = 2; j < 25; j++) for (let w = 0; w < 4; w++) g.set(gi - w, j, k, null);
  // red posts and lintel
  for (let j = 2; j < 27; j++) for (const k of [gz0 - 1, gz0 - 2, gz1, gz1 + 1]) for (let w = 0; w < 3; w++) g.set(gi - w, j, k, 0x8c2a20);
  for (let k = gz0 - 2; k < gz1 + 2; k++) for (let j = 25; j < 28; j++) for (let w = 0; w < 3; w++) g.set(gi - w, j, k, j === 26 ? 0x2d6a5a : 0x8c2a20);
  // little roof over the gate with upturned eaves
  for (let k = gz0 - 6; k < gz1 + 6; k++) {
    const end = k < gz0 - 3 || k > gz1 + 3;
    for (let w = -3; w < 8; w++) {
      const j = 29 + Math.floor(Math.max(0, w) / 3) + (end ? 1 : 0);
      g.set(gi - w, j, k, (k + w) % 2 === 0 ? 0x34373b : 0x3f4247);
    }
  }
  // stone drums either side
  for (const k0 of [gz0 - 4, gz1 + 1]) for (let k = k0; k < k0 + 3; k++) for (let j = 2; j < 6; j++) for (let w = 0; w < 3; w++) g.set(gi + 1 + w, j, k, 0x9a9890);
  // threshold step
  for (let k = gz0; k < gz1; k++) for (let w = -1; w < 3; w++) g.set(gi + w, 2, k, 0x8f8b83);
  // dim courtyard beyond the gate
  for (let k = gz0 - 4; k < gz1 + 4; k++) for (let w = 4; w < 10; w++) for (let j = 2; j < 3; j++) g.set(gi - w, j, k, 0x6d6a63);
  // a lantern each side of the lintel
  for (const k of [gz0 - 3, gz1 + 2]) for (let j = 21; j < 24; j++) L.set(gi + 1, j, k, 0xff6a3a);
  // persimmon tree in the courtyard, branches over the wall
  const rng = mulberry32(8);
  const tx = gi - 9;
  const tz = zi(GATE_Z - 4.5);
  for (let j = 2; j < 38; j++) g.set(tx, j, tz, 0x3b2a20);
  const branch = (x0: number, y0: number, z0: number, dx: number, dy: number, dz: number, len: number) => {
    let x = x0;
    let y = y0;
    let z = z0;
    for (let s = 0; s < len; s++) {
      x += dx + (rng() - 0.5) * 0.6;
      y += dy + (rng() - 0.3) * 0.5;
      z += dz + (rng() - 0.5) * 0.6;
      g.set(Math.round(x), Math.round(y), Math.round(z), 0x3b2a20);
      if (rng() > 0.82) {
        const fx = Math.round(x + (rng() - 0.5) * 2);
        const fy = Math.round(y - 1);
        const fz = Math.round(z + (rng() - 0.5) * 2);
        g.set(fx, fy, fz, 0xf07a1e).set(fx + 1, fy, fz, 0xe56a12).set(fx, fy - 1, fz, 0xd85f10);
      }
    }
  };
  for (let b = 0; b < 9; b++) branch(tx, 26 + b * 1.4, tz, 0.55 + rng() * 0.5, 0.35, (rng() - 0.5) * 1.2, 18 + Math.floor(rng() * 8));
  // overhead wires
  for (let k = zi(-6); k < zi(-6) + 1; k++) for (let i = 0; i < nx; i++) g.set(i, 41 + Math.round(Math.sin(i / 8) * 0.6), k, 0x1e1f22);
  for (let k = zi(-22); k < zi(-22) + 1; k++) for (let i = 0; i < nx; i++) g.set(i, 43 + Math.round(Math.sin(i / 9) * 0.6), k, 0x1e1f22);
  // an old bicycle against the right wall
  const bi = xi(HALF) - 2;
  const bk = zi(-9);
  for (let k = bk; k < bk + 17; k++) g.set(bi, 6, k, 0x2b3c33);
  for (const kc of [bk + 2, bk + 14]) {
    for (let a = 0; a < 24; a++) {
      const ang = (a / 24) * Math.PI * 2;
      g.set(bi, Math.round(5 + Math.sin(ang) * 3.4), Math.round(kc + Math.cos(ang) * 3.4), 0x1b1b1d);
    }
  }
  for (let j = 6; j < 10; j++) g.set(bi, j, bk + 4, 0x2b3c33);
  g.set(bi, 10, bk + 4, 0x111111).set(bi, 10, bk + 3, 0x111111);
  // doors and windows further down the lane
  for (const zc of [-26, -33]) {
    const k0 = zi(zc + 0.5);
    for (let k = k0; k < k0 + 10; k++) for (let j = 2; j < 22; j++) g.set(xi(HALF), j, k, j > 19 ? 0x2d3a4a : 0x6e2a22);
  }
  // grid index k grows toward -z: mirror so that world z = 2 - k * V
  return {
    solid: mirrorZ(g.geometry(V, "min").translate(-2.6, 0, 0), 2),
    glow: mirrorZ(L.geometry(V, "min").translate(-2.6, 0, 0), 2),
  };
}

function pigeonGeometry(wingUp: boolean): THREE.BufferGeometry {
  const g = new VoxelGrid(7, 3, 5);
  g.box(2, 0, 1, 5, 2, 4, 0x8a8f9a);
  g.set(5, 1, 2, 0x6d7380).set(6, 1, 2, 0x3a3d44);
  g.box(0, 1, 2, 2, 2, 3, 0x5d626c);
  if (wingUp) {
    g.box(3, 2, 0, 5, 3, 1, 0x9aa0aa).box(3, 2, 4, 5, 3, 5, 0x9aa0aa);
  } else {
    g.box(3, 0, 0, 5, 1, 1, 0x9aa0aa).box(3, 0, 4, 5, 1, 5, 0x9aa0aa);
  }
  return g.geometry(0.06, "center");
}

export function buildHutong(): HutongSet {
  const scene = new THREE.Scene();
  scene.background = skyTexture("#5a7fae", "#c9b48e", "#f2c58e");
  scene.fog = new THREE.Fog(0xcdb08e, 18, 46);
  const lane = buildLane();
  const solid = vmesh(lane.solid, { roughness: 0.9 }, { cast: true, receive: true });
  scene.add(solid);
  const glow = new THREE.Mesh(lane.glow, new THREE.MeshBasicMaterial({ vertexColors: true }));
  (glow.material as THREE.MeshBasicMaterial).color.setScalar(2.5);
  scene.add(glow);

  // gate leaf (the right-hand door), swings inward
  const gateLeaf = new THREE.Group();
  const leaf = new VoxelGrid(1, 23, 7);
  leaf.box(0, 0, 0, 1, 23, 7, 0x9b2c20);
  for (const [j, k] of [[6, 2], [6, 5], [10, 2], [10, 5], [14, 2], [14, 5], [18, 2], [18, 5]] as const) leaf.set(0, j, k, 0xd8b04a);
  const leafMesh = vmesh(leaf.geometry(0.1, "min"), { roughness: 0.6 }, { cast: true, receive: true });
  leafMesh.position.set(-0.05, 0, 0);
  gateLeaf.add(leafMesh);
  gateLeaf.position.set(-HALF - 0.25, 0.2, GATE_Z - 0.72);
  scene.add(gateLeaf);
  const leafL = leafMesh.clone();
  leafL.position.set(-HALF - 0.3, 0.2, GATE_Z + 0.02);
  scene.add(leafL);

  // low western sun across the lane, long shadows
  const sun = new THREE.DirectionalLight(0xffd2a0, 3.4);
  sun.position.set(14, 7.5, 6);
  sun.target.position.set(0, 0, -12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera as THREE.OrthographicCamera;
  sc.left = -22;
  sc.right = 22;
  sc.top = 12;
  sc.bottom = -12;
  sc.near = 1;
  sc.far = 60;
  sun.shadow.bias = -0.0005;
  scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight(0xa8c4e8, 0x6a5a48, 1.1));

  // pigeons wheeling overhead
  const geoUp = pigeonGeometry(true);
  const geoDown = pigeonGeometry(false);
  const pigeonMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 });
  const pigeons = Array.from({ length: 16 }, (_, k) => {
    const m = new THREE.Mesh(geoUp, pigeonMat);
    scene.add(m);
    return { m, phase: hash1(k * 3.7) * Math.PI * 2, r: 5 + hash1(k * 1.3) * 2.5, h: 6.0 + hash1(k * 5.1) * 1.8, s: 0.5 + hash1(k * 9.2) * 0.08 };
  });

  const zhang = new Actor({
    face: ZHANG_FACE,
    heightM: 1.8,
    exprs: ["neutral", "blink"],
    outfits: { coat: coatNavy },
  });
  scene.add(zhang.holder);

  const start = new THREE.Vector3(0.25, 0, -4.2);
  const stop = new THREE.Vector3(-0.85, 0, GATE_Z);
  function zhangPos(t: number, out = new THREE.Vector3()): THREE.Vector3 {
    const k = seg(t, 15.0, C.gateOpen - 0.5);
    out.copy(start).lerp(stop, k);
    if (t > C.gateOpen + 0.2) {
      const e = smooth(seg(t, C.gateOpen + 0.2, C.gateOpen + 1.8));
      out.x = lerp(stop.x, -HALF - 0.9, e);
    }
    return out;
  }

  return {
    scene,
    zhang,
    gateLeaf,
    zhangPos,
    update(t) {
      const p = zhangPos(t);
      zhang.holder.position.copy(p);
      const walking = t < C.gateOpen - 0.5 || (t > C.gateOpen + 0.2 && t < C.gateOpen + 1.8);
      const turn = smooth(seg(t, C.gateOpen - 0.9, C.gateOpen - 0.2));
      zhang.holder.rotation.y = Math.PI + turn * (Math.PI / 2 - 0.1);
      let pose: Pose = walking ? walkPose(t, 1.25) : { armR: [0, 0, 0.05], armL: [0, 0, -0.05] };
      if (t > C.gateOpen - 0.4 && t < C.gateOpen + 0.6) pose = addPose(pose, { armL: [-1.2, 0, -0.1] });
      zhang.pose(pose);
      zhang.perform(t, "neutral", false, 2);
      const open = smooth(seg(t, C.gateOpen, C.gateOpen + 1.4));
      gateLeaf.rotation.y = -open * 1.4;
      pigeons.forEach((b, k) => {
        const a = b.phase + t * b.s;
        b.m.position.set(Math.cos(a) * b.r - 1, b.h + Math.sin(t * 0.9 + k) * 0.3, -10 + Math.sin(a) * b.r * 0.7);
        b.m.rotation.set(0, -a, Math.sin(t * 2 + k) * 0.2);
        b.m.geometry = Math.floor((t + k * 0.07) * 9) % 2 === 0 ? geoUp : geoDown;
      });
    },
  };
}

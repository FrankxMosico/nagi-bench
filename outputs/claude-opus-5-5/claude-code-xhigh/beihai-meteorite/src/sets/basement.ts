import * as THREE from "three";
import { walk, type Pose } from "@agentbench/voxel-kit";
import { Actor } from "../cast/actors";
import { reach } from "../cast/ik";
import { ZHANG_BODY, clothTexture, paintShirt, type Expression } from "../cast/skins";
import { hash1, hash3, numTrack, poseTrack, range, smooth, stateTrack, v3Track } from "../core/anim";
import { ParticleLayer } from "../core/particles";
import { Grid, MAT } from "../core/vox";
import { ROUND_V, makeGlueTube, makeKnife, makeMagazine, makePistol, makePliers, makeRound } from "../props";

/**
 * A hidden basement under one bare bulb. Thirty-six rounds lose their copper
 * heads and take meteorite ones; four are fired into a bundle of spacesuit
 * fabric wrapped around raw beef.
 */

export const HEADS_OFF: number[] = Array.from({ length: 36 }, (_, k) => 152.7 + 4.6 * (k / 35));
export const GLUED: number[] = Array.from({ length: 36 }, (_, k) => 158.8 + 4.4 * (k / 35));
export const LOADED = [165.0, 165.55, 166.1, 166.65];
export const MAG_IN = 167.5;
export const RACK = 168.3;
export const TEST_SHOTS = [171.4, 172.2, 172.85, 173.45];
export const BUNDLE_OPEN: [number, number] = [180.2, 182.4];
export const CASE_CLOSE = 194.2;

export interface Basement {
  group: THREE.Group;
  zhang: Actor;
  marks: Record<string, THREE.Vector3>;
  bulb: THREE.Object3D;
  update(t: number): void;
  flash(t: number): number;
}

export function buildBasement(): Basement {
  const group = new THREE.Group();
  group.name = "basement";
  const v = 0.1;
  const g = new Grid();
  const X = 21;
  const Z = 18;
  const H = 24;
  const concrete = (x: number, y: number, z: number) => {
    const k = hash3(Math.floor(x / 2), Math.floor(y / 2), Math.floor(z / 2), 3);
    const stain = hash3(x, Math.floor(y / 4), z, 9) < 0.06;
    return stain ? 0x34322e : k < 0.33 ? 0x504d47 : k < 0.66 ? 0x4a4741 : 0x56534c;
  };
  g.box(-X, -1, -Z, X, 0, Z, (x, _y, z) => (hash3(x, 0, z, 1) < 0.5 ? 0x4f4c46 : 0x56534d));
  g.box(-X, 0, -Z - 1, X, H, -Z, concrete);
  g.box(-X, 0, Z, X, H, Z + 1, concrete);
  g.box(-X - 1, 0, -Z, -X, H, Z, concrete);
  g.box(X, 0, -Z, X + 1, H, Z, concrete);
  g.box(-X, H, -Z, X, H + 1, Z, 0x4a4842);
  // Pipes along the ceiling.
  g.box(-X, H - 2, -Z + 2, X, H - 1, -Z + 3, 0x5a3a2a);
  g.box(-X, H - 3, -Z + 5, X, H - 2, -Z + 6, 0x3a4a3a);
  // Shelf with boxes on the left wall.
  g.box(-X + 1, 12, -10, -X + 5, 13, 10, 0x4a3424);
  g.box(-X + 1, 6, -10, -X + 5, 7, 10, 0x4a3424);
  for (const [z0, c] of [[-9, 0x6a5a3a], [-4, 0x3a4a2a], [3, 0x6a5a3a]] as const) g.box(-X + 1, 13, z0, -X + 5, 17, z0 + 4, c);
  // Steps up to a door, top right corner.
  for (let k = 0; k < 6; k++) g.box(X - 8, 0, Z - 2 - k * 2, X, k * 2 + 2, Z - k * 2, 0x5f5c55);
  // Sandbags in the far corner.
  for (let k = 0; k < 4; k++) g.box(12 - (k % 2), k * 2, -16, 20, k * 2 + 2, -9, (x, y) => ((x + y) % 5 === 0 ? 0x6a5a3a : 0x7d6c48));
  const shell = g.toGroup(v, [0, 0, 0], MAT);
  group.add(shell);

  // Table, stool, cloth mat.
  const table = new Grid();
  table.box(0, 0, 0, 20, 15, 12, (x, y, z) => (y === 14 ? 0x5a4632 : (x === 0 || x === 19) && (z === 0 || z === 11) ? 0x3a2a1a : null));
  const tableG = table.toGroup(0.05, [10, 0, 6], MAT);
  tableG.position.set(-0.4, 0, 0.1);
  group.add(tableG);
  const mat = new Grid().box(0, 0, 0, 30, 1, 20, (x, _y, z) => (hash3(x, 0, z, 5) < 0.5 ? 0x2f4a36 : 0x2a4431)).toGroup(0.02, [15, 0, 10], MAT);
  mat.position.set(-0.45, 0.75, 0.1);
  group.add(mat);

  // Bulb on a wire.
  const bulb = new THREE.Group();
  const wire = new Grid().box(0, 0, 0, 1, 30, 1, 0x1a1a1a).toGroup(0.01, [0.5, 30, 0.5]);
  bulb.add(wire);
  const glassB = new Grid();
  for (let x = -3; x <= 3; x++) for (let y = -6; y <= 0; y++) for (let z = -3; z <= 3; z++) if (x * x + z * z + (y + 3) * (y + 3) * 0.8 < 10) glassB.set(x, y, z, 0xfff2c0, true);
  glassB.box(-2, 0, -2, 3, 3, 3, 0x4a4a42);
  const bulbG = glassB.toGroup(0.012, [0.5, 0, 0.5], { ...MAT, glow: new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(5, 4.4, 3.2) }) });
  bulbG.position.y = -0.3;
  bulb.add(bulbG);
  bulb.position.set(-0.4, 2.4, 0.1);
  group.add(bulb);
  const bulbLight = new THREE.PointLight(0xffd8a0, 5, 9, 2);
  bulbLight.castShadow = true;
  bulbLight.shadow.mapSize.set(1024, 1024);
  bulbLight.shadow.bias = -0.002;
  group.add(bulbLight);
  group.add(new THREE.AmbientLight(0x3a3026, 0.18));
  // The bulb's light bouncing off the table into faces bent over it.
  const bounce = new THREE.PointLight(0xffc890, 0.45, 2.2, 2);
  bounce.position.set(-0.4, 0.84, -0.05);
  group.add(bounce);
  const flashLight = new THREE.PointLight(0xffc070, 0, 6, 2);
  group.add(flashLight);

  // Rounds in a 6×6 block on the mat.
  const roundPos = (k: number) => new THREE.Vector3(-0.62 + (k % 6) * 0.03, 0.77, -0.02 + Math.floor(k / 6) * 0.03);
  const rounds = Array.from({ length: 36 }, (_, k) => {
    const holder = new THREE.Group();
    const copper = makeRound("copper", k + 1);
    const bare = makeRound("none", k + 1);
    const meteor = makeRound("meteor", k + 40);
    holder.add(copper, bare, meteor);
    holder.scale.setScalar(1.3);
    holder.position.copy(roundPos(k));
    group.add(holder);
    return { holder, copper, bare, meteor };
  });
  // Dish for the pulled heads.
  const dish = new Grid();
  for (let x = -6; x <= 6; x++) for (let z = -6; z <= 6; z++) if (x * x + z * z <= 36) dish.set(x, 0, z, 0xd8d4c8);
  for (let a = 0; a < 40; a++) dish.set(Math.round(Math.cos(a) * 6), 1, Math.round(Math.sin(a) * 6), 0xd8d4c8);
  const dishG = dish.toGroup(0.008, [0, 0, 0]);
  dishG.position.set(-0.12, 0.765, 0.0);
  group.add(dishG);
  const heads = new Grid();
  const hr = (k: number) => hash1(k, 2);
  for (let k = 0; k < 36; k++) heads.set(Math.round((hr(k) - 0.5) * 10), 0, Math.round((hash1(k, 3) - 0.5) * 10), 0xc07a3c);
  const headPile = heads.toGroup(0.006, [0, 0, 0]);
  headPile.position.set(-0.12, 0.775, 0.0);
  group.add(headPile);
  // Case for the remaining 32.
  const caseBox = new Grid();
  caseBox.box(0, 0, 0, 22, 4, 16, (x, y, z) => (y === 0 || x === 0 || x === 21 || z === 0 || z === 15 ? 0x2a2c2e : null));
  const caseG = caseBox.toGroup(0.01, [11, 0, 8], { ...MAT, std: MAT.satin });
  caseG.position.set(-0.05, 0.765, 0.28);
  group.add(caseG);
  const lid = new Grid().box(0, 0, 0, 22, 1, 16, 0x34373a).toGroup(0.01, [11, 0, 16], { ...MAT, std: MAT.satin });
  const lidPivot = new THREE.Group();
  lidPivot.add(lid);
  lidPivot.position.set(-0.05, 0.805, 0.36);
  group.add(lidPivot);
  const casePos = (k: number) => new THREE.Vector3(-0.15 + (k % 8) * 0.024, 0.775, 0.22 + Math.floor(k / 8) * 0.026);

  // The target bundle: spacesuit sandwich around raw beef.
  const bundle = new THREE.Group();
  const bundleBody = new Grid();
  bundleBody.box(0, 0, 0, 14, 10, 12, (x, y, z) => {
    // The front (z = 11) is the flap itself, so opening it exposes the layers.
    if (z === 11) return x === 0 || x === 13 || y === 0 || y === 9 ? 0xd8d6cd : null;
    const outer = x === 0 || x === 13 || y === 0 || y === 9 || z === 0;
    if (outer) return hash3(x, y, z, 3) < 0.5 ? 0xe2e0d8 : 0xd8d6cd;
    if (z === 10) return x === 1 || x === 12 || y === 1 || y === 8 ? 0xd8c06a : null;
    if (x === 1 || x === 12 || y === 1 || y === 8 || z === 1) return 0xd8c06a; // insulating foam
    if ((y === 3 || y === 6) && x % 3 === 0) return 0x7fb0c9; // coolant tubes
    return hash3(x, y, z, 7) < 0.2 ? 0xead2c0 : 0x8e2a24; // beef with fat
  });
  bundleBody.box(6, 10, 0, 8, 11, 12, 0x9a8a6a); // tie
  const bundleG = bundleBody.toGroup(0.025, [7, 0, 6], MAT);
  bundle.add(bundleG);
  // Front flap that folds open to reveal the layers.
  const flap = new Grid().box(0, 0, 0, 14, 10, 1, (x, y) => (hash3(x, y, 0, 4) < 0.5 ? 0xe2e0d8 : 0xd8d6cd)).toGroup(0.025, [7, 0, 0], MAT);
  const flapPivot = new THREE.Group();
  flapPivot.add(flap);
  flapPivot.position.set(0, 0, 0.155);
  bundle.add(flapPivot);
  const holes = [0, 1, 2, 3].map((k) => {
    const h = new Grid().box(0, 0, 0, 1, 1, 1, 0x121010).toGroup(0.012, [0.5, 0.5, 0]);
    h.position.set((hash1(k, 5) - 0.5) * 0.12, 0.1 + hash1(k, 6) * 0.1, 0.02);
    flap.add(h);
    return h;
  });
  bundle.position.set(1.6, 0.8, -1.25);
  bundle.rotation.y = -0.6;
  group.add(bundle);
  const shards = new Grid();
  for (let k = 0; k < 22; k++) {
    const x = Math.round((hash1(k, 8) - 0.5) * 7);
    const z = Math.round((hash1(k, 10) - 0.5) * 7);
    const y = Math.round(hash1(k, 9) * 1.5 * (1 - (x * x + z * z) / 25));
    shards.set(x, Math.max(0, y), z, hash1(k, 11) < 0.3 ? 0xc8c8c0 : hash1(k, 12) < 0.5 ? 0x3a3530 : 0x2a2622);
  }
  const shardG = shards.toGroup(0.008, [0, 0, 0], { ...MAT, std: MAT.metal });

  // Props in hand.
  const zhang = new Actor("zhang", ZHANG_BODY, 1.8);
  zhang.wear(clothTexture("shirt", paintShirt));
  group.add(zhang.root);
  const pliers = makePliers();
  const glue = makeGlueTube();
  const mag = makeMagazine();
  const pistol = makePistol();
  const knife = makeKnife();
  const hR = zhang.hold("handR", new THREE.Group());
  const hL = zhang.hold("handL", new THREE.Group());
  hR.add(pliers, pistol.root, knife);
  hL.add(glue, mag, shardG);
  pliers.position.set(0, -0.02, 0.1);
  pliers.rotation.set(0, Math.PI / 2, 0);
  glue.position.set(0, 0, 0.1);
  mag.position.set(0, 0.03, 0.1);
  pistol.root.position.set(0, 0.03, 0.12);
  pistol.root.scale.setScalar(1.35);
  knife.position.set(0, 0, 0.12);
  knife.rotation.set(0, -Math.PI / 2, 0);
  shardG.position.set(0, 0.125, -0.03);

  // Smoke and dust.
  const smoke = new ParticleLayer(1400, THREE.NormalBlending);
  group.add(smoke.points);

  // Blocking.
  const zPos = v3Track([
    [152, [-0.4, 0, 0.62]],
    [169.4, [-0.4, 0, 0.62]],
    [170.4, [-0.25, 0, 0.4]],
    [176.4, [-0.25, 0, 0.4]],
    [178.6, [0.92, 0, -0.42]],
    [184.6, [0.92, 0, -0.42]],
    [185.8, [-0.2, 0, 0.55]],
    [188.2, [-0.2, 0, 0.55]],
    [188.8, [-0.4, 0, 0.62]],
  ], (x) => x);
  const aimYaw = Math.atan2(1.6 - -0.25, -1.25 - 0.4) + 0.08;
  const zYaw = numTrack([
    [152, Math.PI],
    [169.6, Math.PI],
    [170.4, aimYaw],
    [176.4, aimYaw],
    [177.0, aimYaw - 0.1],
    [178.6, Math.atan2(1.6 - 0.92, -1.25 + 0.42)],
    [184.6, Math.atan2(1.6 - 0.92, -1.25 + 0.42)],
    [185.4, Math.PI + 0.6],
    [188.2, Math.PI + 0.6],
    [188.8, Math.PI],
  ]);
  const hunch: Pose = { hips: [0.3, 0, 0], neck: [0.55, 0, 0], armR: reach("R", [-2, 1, 9]), armL: reach("L", [2, 1, 8]), lift: -0.3 };
  const pull = (t: number): Pose => ({ ...hunch, armR: reach("R", [-1.5 + Math.sin(t * 6.8) * 1.5, 1 + Math.max(0, Math.sin(t * 6.8 * 2)) * 1.2, 9]) });
  const gluing = (t: number): Pose => ({ ...hunch, armR: reach("R", [-1 + Math.sin(t * 7.5) * 1.6, 1.4, 9]), armL: reach("L", [1.5, 2 + Math.sin(t * 7.5) * 0.6, 9]) });
  const loadMag = (t: number): Pose => ({ hips: [0.04, 0, 0], neck: [0.3, 0, 0], armR: reach("R", [-1, 6 + Math.max(0, Math.sin(t * 11)) * 0.8, 9]), armL: reach("L", [0.5, 6, 9]) });
  const seat: Pose = { hips: [0.05, 0, 0], neck: [0.3, 0, 0], armR: reach("R", [-1.5, 6, 10]), armL: reach("L", [0.5, 5, 10]) };
  const aimP = (t: number): Pose => {
    let kick = 0;
    for (const s of TEST_SHOTS) if (t >= s && t < s + 0.4) kick += Math.exp(-(t - s) * 10) * 0.35;
    return { hips: [0, 0.2, 0], neck: [0.05, 0.25, 0], armR: [-Math.PI / 2 - kick + 0.05, 0.2, 0.02], armL: [-Math.PI / 2 - kick * 0.7 + 0.05, 0.2, -0.32], legR: [0.1, 0, -0.05], legL: [-0.15, 0, 0.05] };
  };
  const inspect: Pose = { hips: [0.42, 0, 0], neck: [0.45, 0, 0], armR: reach("R", [-2, 2, 11]), armL: reach("L", [2, 2, 11]), lift: -0.8 };
  const dig = (t: number): Pose => ({ ...inspect, armR: reach("R", [-1 + Math.sin(t * 5) * 1.2, 2 + Math.sin(t * 9) * 0.6, 11]) });
  const palm: Pose = { hips: [0.1, 0, 0], neck: [0.6, -0.15, 0], armR: [0.05, 0, -0.06], armL: reach("L", [1.0, 4.5, 11]) };
  const packCase = (t: number): Pose => ({ ...hunch, armR: reach("R", [-1 + Math.sin(t * 6) * 2.2, 1.2, 9]) });
  const zPose = poseTrack([
    [152, hunch],
    [152.6, pull],
    [157.6, pull],
    [158.4, gluing],
    [163.4, gluing],
    [164.2, seat],
    [164.8, loadMag],
    [167.0, loadMag],
    [167.6, seat],
    [169.4, seat],
    [170.4, aimP],
    [175.4, aimP],
    [176.4, (t: number) => walk(t, 0.9)],
    [178.4, (t: number) => walk(t, 0.9)],
    [178.9, inspect],
    [182.4, inspect],
    [182.8, dig],
    [184.4, dig],
    [184.8, (t: number) => walk(t, 0.9)],
    [185.6, (t: number) => walk(t, 0.9)],
    [186.0, palm],
    [188.0, palm],
    [188.6, hunch],
    [189.0, packCase],
    [191.2, packCase],
    [191.8, hunch],
  ]);
  const zFace = stateTrack<Expression>([
    [152, "down"],
    [164.2, "neutral"],
    [170.4, "narrow"],
    [175.6, "neutral"],
    [178.6, "down"],
    [185.4, "narrow"],
    [188.0, "down"],
    [192.0, "neutral"],
  ]);

  const marks = {
    table: new THREE.Vector3(-0.45, 0.77, 0.1),
    rounds: new THREE.Vector3(-0.55, 0.78, 0.05),
    bundle: new THREE.Vector3(1.6, 0.95, -1.25),
    face: new THREE.Vector3(-0.4, 1.55, 0.62),
  };

  function flash(t: number): number {
    let f = 0;
    for (const s of TEST_SHOTS) {
      const d = t - s;
      if (d >= 0 && d < 0.08) f = Math.max(f, 1 - d / 0.08);
    }
    return f;
  }

  const tmp = new THREE.Vector3();
  return {
    group,
    zhang,
    marks,
    bulb,
    flash,
    update(t: number) {
      // The bulb swings after each shot: summed damped impulses.
      let swing = 0;
      let swingZ = 0;
      for (const s of TEST_SHOTS) {
        if (t < s) continue;
        const d = t - s;
        swing += Math.sin(d * 3.1) * Math.exp(-d * 0.45) * 0.06;
        swingZ += Math.sin(d * 3.1 + 1) * Math.exp(-d * 0.5) * 0.03;
      }
      bulb.rotation.set(swingZ, 0, swing);
      bulb.updateMatrixWorld(true);
      bulbG.getWorldPosition(bulbLight.position);
      const fl = flash(t);
      flashLight.intensity = fl * 8;
      // Rounds: copper → bare → meteorite; four leave for the magazine; the rest go to the case.
      rounds.forEach((r, k) => {
        const headOff = t >= HEADS_OFF[k]!;
        const glued = t >= GLUED[k]!;
        r.copper.visible = !headOff;
        r.bare.visible = headOff && !glued;
        r.meteor.visible = glued;
        const loadedIdx = k < 4 ? LOADED[k]! : Infinity;
        const packAt = 188.9 + ((k - 4) / 31) * 2.2;
        r.holder.visible = t < loadedIdx;
        if (k >= 4 && t >= packAt) r.holder.position.copy(casePos(k - 4));
        else r.holder.position.copy(roundPos(k));
      });
      headPile.visible = t > HEADS_OFF[0]!;
      headPile.scale.setScalar(0.4 + 0.6 * range(t, HEADS_OFF[0]!, HEADS_OFF[35]!));
      lidPivot.rotation.x = 1.9 * (1 - smooth(range(t, CASE_CLOSE, CASE_CLOSE + 0.5)));
      // Bundle: holes appear with each shot, the flap opens later.
      holes.forEach((h, k) => (h.visible = t >= TEST_SHOTS[k]! + 0.01));
      flapPivot.rotation.x = 1.9 * smooth(range(t, BUNDLE_OPEN[0], BUNDLE_OPEN[1]));
      const jolt = TEST_SHOTS.reduce((a, s) => a + (t >= s ? Math.exp(-(t - s) * 14) * Math.sin((t - s) * 50) * 0.01 : 0), 0);
      bundle.position.set(1.6 + jolt, 0.8, -1.25);
      // Zhang and his props.
      const zp = zPos(t);
      zhang.place(zp[0], zp[1], zp[2], zYaw(t));
      zhang.pose(zPose(t));
      zhang.face(Math.sin(t * 0.8) > 0.985 && zFace(t) === "neutral" ? "blink" : zFace(t));
      pliers.visible = t > 152.4 && t < 158.0;
      glue.visible = t > 158.2 && t < 163.8;
      mag.visible = t > 164.6 && t < MAG_IN;
      pistol.root.visible = t >= MAG_IN - 0.4 && t < 176.6;
      let slide = 0;
      if (t > RACK && t < RACK + 0.35) slide = Math.sin(range(t, RACK, RACK + 0.35) * Math.PI);
      for (const s of TEST_SHOTS) if (t >= s && t < s + 0.1) slide = Math.max(slide, 1 - (t - s) / 0.1);
      pistol.slide.position.z = -0.03 * slide;
      knife.visible = t > 182.6 && t < 184.5;
      shardG.visible = t > 184.4 && t < 188.3;
      // Smoke from the muzzle and dust shaken from the ceiling.
      smoke.begin();
      hR.updateWorldMatrix(true, true);
      pistol.muzzle.getWorldPosition(tmp);
      if (pistol.root.visible || t > TEST_SHOTS[0]!) {
        if (t < 176.6) flashLight.position.copy(tmp);
      }
      const muzzle = new THREE.Vector3(-0.1, 1.38, -0.15);
      TEST_SHOTS.forEach((s, si) => {
        for (let k = 0; k < 80; k++) {
          const te = s + k * 0.012;
          if (te > t) break;
          const age = t - te;
          if (age > 9) continue;
          const dir = new THREE.Vector3(Math.sin(aimYaw), 0, Math.cos(aimYaw));
          const sp = 2.5 * Math.exp(-age * 3) + 0.05;
          const dist = (2.5 / 3) * (1 - Math.exp(-age * 3)) * (0.3 + hash1(k + si * 100, 1)) + age * 0.05;
          const x = muzzle.x + dir.x * dist + (hash1(k, 2 + si) - 0.5) * age * 0.12;
          const y = muzzle.y + age * 0.035 + (hash1(k, 4 + si) - 0.5) * 0.05;
          const z = muzzle.z + dir.z * dist + (hash1(k, 6 + si) - 0.5) * age * 0.12;
          void sp;
          smoke.push(x, y, z, 0.04 + age * 0.06, 0.62, 0.6, 0.56, 0.16 * Math.exp(-age * 0.35));
        }
        for (let k = 0; k < 50; k++) {
          const te = s + 0.05 + hash1(k + si * 60, 9) * 0.5;
          if (te > t) continue;
          const age = t - te;
          if (age > 2.4) continue;
          const x = -1.6 + hash1(k + si * 60, 10) * 3.2;
          const z = -1.6 + hash1(k + si * 60, 11) * 3.2;
          const y = 2.38 - 0.5 * 2.2 * age * age * 0.25 - age * 0.25;
          smoke.push(x, y, z, 0.008, 0.7, 0.66, 0.6, 0.7 * (1 - age / 2.4));
        }
      });
      smoke.end();
    },
  };
}

export { ROUND_V };

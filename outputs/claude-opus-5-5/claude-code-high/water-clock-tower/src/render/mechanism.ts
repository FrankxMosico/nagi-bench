// Meshes for every simulated body plus the static parts of the mechanism.
// Each dynamic body gets a THREE.Group that copies the body's pose every
// frame; children are laid out in the body's own frame exactly like the
// colliders built in sim.ts.
import * as THREE from "three";
import type { RigidBody } from "@dimforge/rapier3d-compat";
import type { Sim } from "../sim/sim";
import {
  WHEEL, wp, N_SCOOP, PITCH, R_HINGE, SCOOP, TEETH, TIANHENG as TH, SHUHENG as SH, LEVER_N, SPOUT, SUMP,
  SHAFT, CROWN, LANTERN_B, POLAR, EQ_E, EQ_F, GLOBE, ARMIL, JACK, FLOORS, DROP, type V3,
} from "../sim/layout";
import type { Materials } from "./materials";
import { plaqueTexture } from "./materials";
import { box, cyl, cylGeo, beam, beamGeo, merged, ringGeo, discGeo, uvn } from "./geom";

const rot2 = (u: number, v: number, a: number): [number, number] => [
  u * Math.cos(a) - v * Math.sin(a),
  u * Math.sin(a) + v * Math.cos(a),
];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];

export type GlowKey = "water" | "scoop" | "shuheng" | "rope" | "tianheng" | "wheel" | "crown" | "shaft" | "globe" | "armil" | "jacks";

export function buildMechanism(sim: Sim, M: Materials, scene: THREE.Scene) {
  const synced: { g: THREE.Object3D; b: RigidBody }[] = [];
  const glowMats: Record<GlowKey, THREE.MeshStandardMaterial[]> = {
    water: [], scoop: [], shuheng: [], rope: [], tianheng: [], wheel: [], crown: [], shaft: [], globe: [], armil: [], jacks: [],
  };
  const glowMat = (key: GlowKey, base: THREE.MeshStandardMaterial) => {
    const m = base.clone();
    m.emissive = new THREE.Color(0xff8a2a);
    m.emissiveIntensity = 0;
    glowMats[key].push(m);
    return m;
  };
  const bodyGroup = (b: RigidBody) => {
    const g = new THREE.Group();
    scene.add(g);
    synced.push({ g, b });
    return g;
  };
  const statics = new THREE.Group();
  scene.add(statics);

  // ─────────── Water wheel 枢轮 ───────────
  const wheelG = bodyGroup(sim.wheel);
  {
    const wood = glowMat("wheel", M.wood);
    const dark = glowMat("wheel", M.darkWood);
    const iron = glowMat("wheel", M.iron);
    const geos: THREE.BufferGeometry[] = [];
    const ironGeos: THREE.BufferGeometry[] = [];
    // axle & hub
    ironGeos.push(cylGeo([-0.84, 0, 0], [0.62, 0, 0], 0.075, 16));
    wheelG.add(merged([cylGeo([-0.32, 0, 0], [0.32, 0, 0], 0.24, 20)], dark));
    // two rims + spokes
    for (const n of [-0.26, 0.26]) {
      geos.push(ringGeo(R_HINGE - 0.02, 0.05, [1, 0, 0], [n, 0, 0], 6, 96));
      geos.push(ringGeo(0.78, 0.035, [1, 0, 0], [n, 0, 0], 6, 64));
      for (let k = 0; k < N_SCOOP; k++) {
        const a = k * PITCH + PITCH / 2;
        const [u0, v0] = rot2(0.2, 0, a), [u1, v1] = rot2(R_HINGE, 0, a);
        geos.push(beamGeo(uvn(u0, v0, n), uvn(u1, v1, n), 0.06, 0.06, [1, 0, 0]));
      }
    }
    // hinge bars carrying the scoops
    for (let k = 0; k < N_SCOOP; k++) {
      const [u, v] = rot2(R_HINGE, 0, k * PITCH);
      ironGeos.push(cylGeo(uvn(u, v, -0.3), uvn(u, v, 0.3), 0.022, 8));
    }
    wheelG.add(merged(geos, wood));
    // teeth ring for the lock (天关)
    const tg: THREE.BufferGeometry[] = [];
    tg.push(ringGeo(1.42, 0.03, [1, 0, 0], [TEETH.n, 0, 0], 6, 96));
    tg.push(cylGeo([0.3, 0, 0], [TEETH.n + 0.03, 0, 0], 0.13, 16));
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3 + 0.2;
      const [u1, v1] = rot2(1.42, 0, a);
      tg.push(beamGeo(uvn(0, 0, TEETH.n), uvn(u1, v1, TEETH.n), 0.04, 0.04, [1, 0, 0]));
    }
    const toothBeta = Math.asin((TEETH.halfT + 0.003) / TEETH.rMid);
    for (let k = 0; k < N_SCOOP; k++) {
      const th = k * PITCH + Math.PI / 2 + toothBeta;
      const [u, v] = rot2(TEETH.rMid, 0, th);
      const g = new THREE.BoxGeometry(TEETH.halfN * 2, TEETH.halfT * 2, TEETH.halfR * 2);
      g.rotateX(th - toothBeta);
      g.translate(TEETH.n, v, -u);
      tg.push(g);
    }
    wheelG.add(merged(tg, iron));
    wheelG.add(merged(ironGeos, M.iron));
    // crown gear 地轂 (pins along the axle)
    const crownMat = glowMat("crown", M.darkWood);
    const crownPins = glowMat("crown", M.paleWood);
    const cg: THREE.BufferGeometry[] = [discGeo(CROWN.rho + 0.08, 0.05, [1, 0, 0], [CROWN.discN, 0, 0], 48)];
    const pg: THREE.BufferGeometry[] = [];
    const cp = (Math.PI * 2) / CROWN.count;
    for (let j = 0; j < CROWN.count; j++) {
      const a = Math.PI / 2 + (j + 0.5) * cp;
      const [u, v] = rot2(CROWN.rho, 0, a);
      pg.push(cylGeo(uvn(u, v, CROWN.n - CROWN.halfLen - CROWN.pinR), uvn(u, v, CROWN.discN), CROWN.pinR, 8));
    }
    wheelG.add(merged(cg, crownMat));
    wheelG.add(merged(pg, crownPins));
  }

  // ─────────── Scoops 受水壶 ───────────
  const scoopGroups: THREE.Group[] = [];
  const scoopMat = glowMat("scoop", M.paleWood);
  const scoopIron = glowMat("scoop", M.iron);
  for (let k = 0; k < N_SCOOP; k++) {
    const g = bodyGroup(sim.scoops[k].body);
    const phi = k * PITCH;
    const geos: THREE.BufferGeometry[] = [];
    const part = (cu: number, cv: number, hn: number, hv: number, hu: number, cn = 0) => {
      const bg = new THREE.BoxGeometry(hn * 2, hv * 2, hu * 2);
      bg.rotateX(phi);
      const [u, v] = rot2(cu, cv, phi);
      bg.translate(cn, v, -u);
      geos.push(bg);
    };
    const L = SCOOP.len, w = SCOOP.wall, top = SCOOP.wallTop, bottom = SCOOP.floorY + SCOOP.floorHalf;
    const wallH = (top - bottom) / 2, wallC = (top + bottom) / 2;
    part(L / 2, SCOOP.floorY, SCOOP.halfN, SCOOP.floorHalf, L / 2);
    part(w, wallC, SCOOP.halfN, wallH, w);
    part(L - w, wallC, SCOOP.halfN, wallH, w);
    part(L / 2, wallC, 0.01, wallH, L / 2, SCOOP.halfN - 0.01);
    part(L / 2, wallC, 0.01, wallH, L / 2, -SCOOP.halfN + 0.01);
    g.add(merged(geos, scoopMat));
    // iron straps
    const sg: THREE.BufferGeometry[] = [];
    for (const n of [-0.12, 0.12]) {
      const bg = new THREE.BoxGeometry(0.03, top - SCOOP.floorY + 0.06, L + 0.03);
      bg.rotateX(phi);
      const [u, v] = rot2(L / 2, (top + SCOOP.floorY) / 2 - 0.01, phi);
      bg.translate(n, v, -u);
      sg.push(bg);
    }
    g.add(merged(sg, scoopIron));
    scoopGroups.push(g);
  }

  // ─────────── 天衡 / 天关 (upper balance & lock) ───────────
  const thMat = glowMat("tianheng", M.blackLacquer);
  const thIron = glowMat("tianheng", M.iron);
  {
    const g = bodyGroup(sim.tianheng);
    const rel = (u: number, v: number, n = LEVER_N): V3 => [n - LEVER_N, v - TH.pivot.v, -(u - TH.pivot.u)];
    g.add(beam(rel(-0.06, TH.beamV), rel(TH.ropeU + 0.08, TH.beamV), 0.07, 0.09, thMat, [0, 1, 0]));
    // pivot cheek down to the axle
    g.add(beam(rel(TH.pivot.u, TH.pivot.v), rel(TH.pivot.u, TH.beamV + 0.02), 0.07, 0.07, thMat, [1, 0, 0]));
    // lock hanger (天关) and its iron tip
    g.add(beam(rel(TH.tip.u, TH.beamV + 0.03, 0.52), rel(TH.tip.u, TH.tip.v + 0.07, 0.52), 0.06, 0.06, thIron, [1, 0, 0]));
    g.add(beam(rel(TH.tip.u, TH.beamV, 0.52), rel(TH.tip.u, TH.beamV, LEVER_N), 0.05, 0.05, thIron, [0, 1, 0]));
    g.add(cyl(rel(TH.tip.u, TH.tip.v, TEETH.n - 0.05), rel(TH.tip.u, TH.tip.v, 0.55), TH.tip.r, thIron));
    g.add(box([0.05, 0.05, 0.05], rel(TH.tip.u, TH.tip.v + 0.1, 0.52), thIron));
    g.add(cyl(rel(TH.pivot.u, TH.pivot.v, LEVER_N - 0.08), rel(TH.pivot.u, TH.pivot.v, LEVER_N + 0.08), 0.05, M.gold));
    for (const u of [0.0, TH.ropeU]) g.add(box([0.05, 0.055, 0.05], rel(u, TH.beamV), M.gold));
    g.add(cyl(rel(TH.ropeU, TH.ropeV - 0.02), rel(TH.ropeU, TH.beamV), 0.02, M.iron));
    // its stand, hanging from the floor above
    const post = beam(wp(TH.pivot.u, TH.pivot.v, LEVER_N + 0.1), wp(TH.pivot.u, FLOORS.mech - WHEEL.y, LEVER_N + 0.1), 0.1, 0.1, M.darkWood, [1, 0, 0]);
    statics.add(post);
  }

  // ─────────── 枢衡 / 格叉 / 枢权 (weighing lever) ───────────
  const shMat = glowMat("shuheng", M.blackLacquer);
  const shIron = glowMat("shuheng", M.iron);
  const shWeight = glowMat("shuheng", M.darkBronze);
  {
    const g = bodyGroup(sim.shuheng);
    const rel = (u: number, v: number, n = LEVER_N): V3 => [n - LEVER_N, v - SH.pivot.v, -(u - SH.pivot.u)];
    const P = rel(SH.pivot.u, SH.pivot.v);
    g.add(beam(P, rel(SH.forkU, SH.forkV), 0.09, 0.1, shMat, [1, 0, 0]));
    g.add(beam(P, rel(SH.ropeU, SH.ropeV), 0.08, 0.09, shMat, [1, 0, 0]));
    g.add(beam(P, rel(SH.counterU, SH.counterV), 0.08, 0.09, shMat, [1, 0, 0]));
    // the checking fork (格叉): a cross bar under the scoop with two prongs
    g.add(cyl(rel(SH.forkU, SH.forkV, SH.forkN0), rel(SH.forkU, SH.forkV, LEVER_N), SH.forkR, shIron));
    for (const n of [SH.forkN0 + 0.02, 0.2]) {
      g.add(beam(rel(SH.forkU - 0.07, SH.forkV + 0.05, n), rel(SH.forkU, SH.forkV, n), 0.025, 0.025, shIron, [1, 0, 0]));
    }
    // counterweight 枢权
    const cw = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.15, 0.24, 20), shWeight);
    cw.position.set(...rel(SH.counterU, SH.counterV - 0.16));
    cw.castShadow = true;
    g.add(cw);
    g.add(cyl(rel(SH.counterU, SH.counterV), rel(SH.counterU, SH.counterV - 0.05), 0.015, M.iron));
    g.add(cyl(rel(SH.pivot.u, SH.pivot.v, LEVER_N - 0.08), rel(SH.pivot.u, SH.pivot.v, LEVER_N + 0.08), 0.05, M.gold));
    g.add(cyl(rel(SH.ropeU, SH.ropeV), rel(SH.ropeU, SH.ropeV + 0.06), 0.02, M.iron));
    // stand
    statics.add(beam(wp(SH.pivot.u, SH.pivot.v, LEVER_N + 0.1), wp(SH.pivot.u, -WHEEL.y, LEVER_N + 0.1), 0.12, 0.12, M.darkWood, [1, 0, 0]));
  }

  // ─────────── 天条 chain ───────────
  const ropeMat = glowMat("rope", M.rope);
  const LINKS = 46;
  const linkGeo = new THREE.TorusGeometry(0.022, 0.007, 6, 10);
  const chain = new THREE.InstancedMesh(linkGeo, ropeMat, LINKS);
  chain.castShadow = true;
  scene.add(chain);
  const ropeTopLocal = sub(sim.ropeTop, [sim.tianheng.translation().x, sim.tianheng.translation().y, sim.tianheng.translation().z]);
  const ropeBotLocal = sub(sim.ropeBot, [sim.shuheng.translation().x, sim.shuheng.translation().y, sim.shuheng.translation().z]);
  const ropeLen = Math.hypot(...sub(sim.ropeTop, sim.ropeBot)) + TH.ropeSlack;

  // ─────────── Vertical shaft 天柱 with lanterns & jack wheels ───────────
  const shaftG = bodyGroup(sim.shaft);
  const shaftY0 = LANTERN_B.y;
  const plaqueMats: THREE.MeshStandardMaterial[] = [];
  {
    const wood = glowMat("shaft", M.darkWood);
    const rungMat = glowMat("shaft", M.paleWood);
    const ly = (y: number) => y - shaftY0;
    shaftG.add(cyl([0, ly(0.35), 0], [0, ly(SHAFT.y1 + 0.1), 0], SHAFT.r, wood, 16));
    const lantern = (y: number, r: number, count: number, half: number, rr: number, psi0: number) => {
      const disks: THREE.BufferGeometry[] = [
        discGeo(r + 0.07, 0.04, [0, 1, 0], [0, ly(y - half - 0.02), 0]),
        discGeo(r + 0.07, 0.04, [0, 1, 0], [0, ly(y + half + 0.02), 0]),
      ];
      const rungs: THREE.BufferGeometry[] = [];
      for (let i = 0; i < count; i++) {
        const psi = psi0 + (i * Math.PI * 2) / count;
        const x = Math.cos(psi) * r, z = -Math.sin(psi) * r;
        rungs.push(cylGeo([x, ly(y - half - 0.02), z], [x, ly(y + half + 0.02), z], rr, 8));
      }
      shaftG.add(merged(disks, wood));
      shaftG.add(merged(rungs, rungMat));
    };
    lantern(LANTERN_B.y, LANTERN_B.r, LANTERN_B.count, LANTERN_B.halfLen, LANTERN_B.rungR, 0);
    lantern(GLOBE.P[1], GLOBE.rl, GLOBE.count, 0.13, 0.03, Math.PI / 2);
    lantern(ARMIL.P[1], ARMIL.rl, ARMIL.count, 0.13, 0.03, Math.PI / 2);

    // jack wheels 机轮
    const jw = glowMat("jacks", M.wood);
    const pinMat = glowMat("jacks", M.iron);
    const disk = (y: number, r: number) => shaftG.add(merged([discGeo(r, 0.05, [0, 1, 0], [0, ly(y - 0.025), 0], 64)], jw));
    disk(JACK.plaqueY, JACK.plaqueR - 0.06);
    disk(JACK.drumPinY, 1.36);
    disk(JACK.bellPinY, 1.36);
    const pins: THREE.BufferGeometry[] = [];
    const tappets = (yDisk: number, psiLever: number, count: number) => {
      for (let k = 0; k < count; k++) {
        const psi = psiLever - Math.PI / 12 + (k * Math.PI * 2) / count;
        const x = Math.cos(psi) * JACK.pinR, z = -Math.sin(psi) * JACK.pinR;
        pins.push(cylGeo([x, ly(yDisk), z], [x, ly(yDisk + 0.1), z], 0.022, 8));
      }
    };
    tappets(JACK.drumPinY, JACK.drumAngle, 12);
    tappets(JACK.bellPinY, JACK.bellAngle, 6);
    shaftG.add(merged(pins, pinMat));
    // spokes under the big jack disks
    const sp: THREE.BufferGeometry[] = [];
    for (const y of [JACK.plaqueY, JACK.drumPinY, JACK.bellPinY]) {
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3;
        sp.push(beamGeo([0, ly(y - 0.07), 0], [Math.cos(a) * 1.3, ly(y - 0.07), -Math.sin(a) * 1.3], 0.05, 0.05));
      }
    }
    shaftG.add(merged(sp, wood));

    // 12 jacks holding hour plaques (子丑寅卯…). Figure i starts at angle -i·30°
    // so that each 30° step of the shaft brings the next hour to the door.
    const BR = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    for (let i = 0; i < 12; i++) {
      const psi = (-i * Math.PI) / 6;
      const fig = jackFigure(M, i % 2 ? M.cloth : M.red);
      fig.position.set(Math.cos(psi) * (JACK.plaqueR - 0.2), ly(JACK.plaqueY), -Math.sin(psi) * (JACK.plaqueR - 0.2));
      fig.rotation.y = psi + Math.PI / 2;
      // plaque held in front
      const pm = new THREE.MeshStandardMaterial({ map: plaqueTexture(BR[i]), roughness: 0.7 });
      plaqueMats.push(pm);
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.02), [M.wood, M.wood, M.wood, M.wood, pm, M.wood]);
      plaque.position.set(0, 0.36, 0.13);
      plaque.castShadow = true;
      fig.add(plaque);
      shaftG.add(fig);
    }
  }

  // ─────────── Strikers (木人击鼓 / 鸣钟) ───────────
  for (const s of sim.strikers) {
    const g = bodyGroup(s.body);
    const mat = glowMat("jacks", M.red);
    const P = (a: number, b: number, c = 0): V3 => add(add(mul(s.t, a), [0, b, 0]), mul(s.r, c));
    g.add(beam(P(0, 0), P(0.26, 0), 0.04, 0.04, mat, s.r));
    g.add(beam(P(0, 0, -0.02), P(0, -0.3, -0.17), 0.03, 0.03, M.darkWood, s.r));
    g.add(cyl(P(0, -0.3, -0.26), P(0, -0.3, -0.08), 0.025, M.iron));
    // mallet
    const head = cyl(P(0.28, 0, -0.07), P(0.28, 0, 0.07), 0.045, M.darkWood);
    g.add(head);
    // figure (static) with its shoulder at the pivot
    const fig = jackFigure(M, s.kind === "drum" ? M.cloth : M.red);
    const fpos = add(s.pivot, add(mul(s.t, -0.12), [0, -0.36, 0]));
    fig.position.set(...fpos);
    fig.lookAt(fpos[0] + s.r[0], fpos[1], fpos[2] + s.r[2]);
    statics.add(fig);
    // instrument
    if (s.kind === "drum") {
      const drum = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.22, 24, 1, true), M.red);
      const top = new THREE.Mesh(new THREE.CircleGeometry(0.17, 24), M.drumSkin);
      top.rotation.x = -Math.PI / 2;
      top.position.y = 0.11;
      drum.add(body, top);
      for (const y of [-0.09, 0.09]) drum.add(new THREE.Mesh(new THREE.TorusGeometry(0.172, 0.012, 6, 24).rotateX(Math.PI / 2).translate(0, y, 0), M.gold));
      drum.position.set(s.target[0], s.target[1] + s.targetR - 0.11, s.target[2]);
      drum.traverse((o) => ((o as THREE.Mesh).castShadow = true));
      statics.add(drum);
      statics.add(cyl([s.target[0], s.target[1] - 0.2, s.target[2]], [s.target[0], s.target[1] - 0.6, s.target[2]], 0.03, M.darkWood));
    } else {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        pts.push(new THREE.Vector2(0.03 + Math.sin(t * Math.PI * 0.5) * 0.12, -0.14 + t * 0.14));
      }
      const bell = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), new THREE.MeshStandardMaterial({ color: 0xb48a4a, metalness: 0.9, roughness: 0.3, side: THREE.DoubleSide }));
      bell.position.set(s.target[0], s.target[1] + s.targetR, s.target[2]);
      bell.castShadow = true;
      statics.add(bell);
      statics.add(cyl([s.target[0], s.target[1] - 0.05, s.target[2]], [s.target[0], s.target[1] - 0.6, s.target[2]], 0.03, M.darkWood));
    }
  }

  // ─────────── Globe 浑象 ───────────
  const globeG = bodyGroup(sim.globe);
  {
    // (the star globe itself does not glow – orange on blue reads as pink)
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(GLOBE.radius, 64, 32), M.globe);
    sphere.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...POLAR));
    sphere.castShadow = true;
    globeG.add(sphere);
    const axleEnd = GLOBE.c + 0.08;
    globeG.add(cyl(mul(POLAR, -axleEnd), mul(POLAR, GLOBE.radius + 0.15), 0.035, M.bronze));
    crownMesh(globeG, GLOBE, glowMat("globe", M.darkWood), glowMat("globe", M.paleWood));
    // horizon cabinet (static) – the globe is half sunk in it, like the original
    const G = GLOBE.center;
    const cab = new THREE.Group();
    const w = 1.7, d = 1.7, h = G[1] - FLOORS.jack;
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, -d / 2);
    shape.lineTo(w / 2, -d / 2);
    shape.lineTo(w / 2, d / 2);
    shape.lineTo(-w / 2, d / 2);
    const hole = new THREE.Path();
    hole.absarc(0, 0, GLOBE.radius + 0.02, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const topGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: false, curveSegments: 48 });
    topGeo.rotateX(-Math.PI / 2);
    const top = new THREE.Mesh(topGeo, M.lacquer);
    top.position.set(G[0], G[1] - 0.06, G[2]);
    top.receiveShadow = top.castShadow = true;
    cab.add(top);
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      cab.add(box([0.05, h / 2, 0.05], [G[0] + (sx * w) / 2 - sx * 0.05, FLOORS.jack + h / 2, G[2] + (sz * d) / 2 - sz * 0.05], M.lacquer));
    }
    // panels all round: the globe is half sunk in the cabinet (its horizon);
    // the front (+z) panel leaves a slot where the drive gear enters
    const ph = (h - 0.06) / 2, pc = FLOORS.jack + ph;
    cab.add(box([w / 2, ph, 0.02], [G[0], pc, G[2] - d / 2 + 0.02], M.darkWood));
    cab.add(box([0.02, ph, d / 2], [G[0] - w / 2 + 0.02, pc, G[2]], M.darkWood));
    cab.add(box([0.02, ph, d / 2], [G[0] + w / 2 - 0.02, pc, G[2]], M.darkWood));
    const slot0 = 6.95, slot1 = G[1] - 0.06, fz = G[2] + d / 2 - 0.02;
    cab.add(box([w / 2, (slot0 - FLOORS.jack) / 2, 0.02], [G[0], (slot0 + FLOORS.jack) / 2, fz], M.darkWood));
    for (const sx of [-1, 1]) cab.add(box([0.25, (slot1 - slot0) / 2, 0.02], [G[0] + sx * (w / 2 - 0.25), (slot0 + slot1) / 2, fz], M.darkWood));
    statics.add(cab);
    // bearing for the polar axle at the south end
    const south = add(G, mul(POLAR, -(GLOBE.c + 0.06)));
    statics.add(beam(south, [south[0], FLOORS.jack, south[2]], 0.08, 0.08, M.darkWood, [1, 0, 0]));
  }

  // ─────────── Armillary sphere 浑仪 ───────────
  const armilG = bodyGroup(sim.armil);
  {
    const bz = glowMat("armil", M.bronze);
    const rings: THREE.BufferGeometry[] = [];
    const R = 0.8;
    rings.push(ringGeo(R, 0.026, POLAR, [0, 0, 0], 8, 128)); // equator (赤道环)
    const ecl = new THREE.Vector3(...POLAR).applyAxisAngle(new THREE.Vector3(...EQ_F), (23.5 * Math.PI) / 180);
    rings.push(ringGeo(R - 0.01, 0.024, [ecl.x, ecl.y, ecl.z], [0, 0, 0], 8, 128)); // ecliptic (黄道环)
    rings.push(ringGeo(R + 0.04, 0.028, EQ_F, [0, 0, 0], 8, 128)); // colure through the poles (三辰仪)
    rings.push(ringGeo(R + 0.04, 0.028, EQ_E, [0, 0, 0], 8, 128));
    armilG.add(merged(rings, bz));
    // graduation dots on the equator
    const dots: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const p = add(mul(EQ_E, Math.cos(a) * R), mul(EQ_F, Math.sin(a) * R));
      const sg = new THREE.SphereGeometry(0.03, 8, 6);
      sg.translate(...p);
      dots.push(sg);
    }
    armilG.add(merged(dots, M.gold));
    armilG.add(cyl(mul(POLAR, -(ARMIL.c + 0.08)), mul(POLAR, R + 0.12), 0.03, M.darkBronze));
    crownMesh(armilG, ARMIL, glowMat("armil", M.darkWood), glowMat("armil", M.paleWood));
    // fixed rings 六合仪 and stand
    const A = ARMIL.center;
    const fixed: THREE.BufferGeometry[] = [];
    fixed.push(ringGeo(0.98, 0.035, [0, 1, 0], A, 8, 128)); // horizon ring
    fixed.push(ringGeo(0.98, 0.035, [1, 0, 0], A, 8, 128)); // meridian ring
    fixed.push(ringGeo(0.9, 0.022, [0, 0, 1], A, 8, 128)); // prime vertical
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const top: V3 = [A[0] + sx * 0.69, A[1], A[2] + sz * 0.69];
      fixed.push(cylGeo([top[0] * 1, FLOORS.platform + 0.12, top[2]], top, 0.05, 10));
    }
    fixed.push(beamGeo([A[0] - 0.9, FLOORS.platform + 0.08, A[2]], [A[0] + 0.9, FLOORS.platform + 0.08, A[2]], 0.16, 0.12));
    fixed.push(beamGeo([A[0], FLOORS.platform + 0.08, A[2] - 0.9], [A[0], FLOORS.platform + 0.08, A[2] + 0.9], 0.16, 0.12));
    const fm = new THREE.Mesh(merged(fixed, M.darkBronze).geometry, M.darkBronze);
    fm.castShadow = true;
    statics.add(fm);
    // south bearing post for the driven polar axle
    const south = add(A, mul(POLAR, -(ARMIL.c + 0.06)));
    statics.add(beam(south, [south[0], FLOORS.platform, south[2]], 0.08, 0.08, M.darkWood, [1, 0, 0]));
    // sighting tube (四游仪 望筒), fixed for the film
    const tubeDir = new THREE.Vector3(0.2, 0.9, -0.4).normalize();
    statics.add(cyl(add(A, mul([tubeDir.x, tubeDir.y, tubeDir.z], -0.85)), add(A, mul([tubeDir.x, tubeDir.y, tubeDir.z], 0.85)), 0.035, M.darkBronze));
  }

  // ─────────── Tanks: 天池 → 平水壶 → spout ───────────
  const spout = sim.spout;
  const waterBits = buildTanks(M, statics, spout);

  // ─────────── shaft bearings, wheel bearings ───────────
  for (const n of [-0.84, 0.62]) {
    const p = wp(0, 0, n);
    statics.add(beam(p, [p[0], 0, p[2]], 0.16, 0.16, M.darkWood, [0, 0, 1]));
    statics.add(box([0.1, 0.06, 0.14], [p[0], p[1] - 0.06, p[2]], M.iron));
  }
  statics.add(cyl([SHAFT.x, 0, SHAFT.z], [SHAFT.x, 0.36, SHAFT.z], 0.14, M.stone));

  // ─────────── the steady jet from the spout (visual) ───────────
  {
    const pts: THREE.Vector3[] = [];
    const vy = SPOUT.vv, vz = -SPOUT.vu;
    const yEnd = WHEEL.y - 0.1;
    for (let i = 0; i <= 16; i++) {
      const t = (i / 16) * 0.42;
      const y = spout[1] + vy * t - 4.905 * t * t;
      pts.push(new THREE.Vector3(spout[0], Math.max(yEnd, y), spout[2] + vz * t));
      if (y < yEnd) break;
    }
    const jetMat = new THREE.MeshStandardMaterial({ color: 0x5aa8db, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.45, depthWrite: false });
    const jet = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 32, 0.016, 8), jetMat);
    scene.add(jet);
  }

  // ─────────── water collecting in each scoop (visual level from the drop count) ───────────
  const fillMat = new THREE.MeshStandardMaterial({ color: 0x2c78ad, roughness: 0.05, metalness: 0.15, transparent: true, opacity: 0.72 });
  const fills = scoopGroups.map((g, k) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), fillMat);
    m.rotation.x = k * PITCH;
    m.visible = false;
    g.add(m);
    return { m, h: 0, phi: k * PITCH };
  });

  // ─────────── Water drops ───────────
  const MAXD = 420;
  const dropMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(DROP.r, 12, 8), glowMat("water", M.water), MAXD);
  dropMesh.count = 0;
  dropMesh.castShadow = false;
  dropMesh.frustumCulled = false;
  scene.add(dropMesh);

  // ─────────── per-frame update ───────────
  const tmpM = new THREE.Matrix4();
  const tmpQ = new THREE.Quaternion();
  const tmpV = new THREE.Vector3();
  const tmpS = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const glowLevel: Record<GlowKey, number> = {
    water: 0, scoop: 0, shuheng: 0, rope: 0, tianheng: 0, wheel: 0, crown: 0, shaft: 0, globe: 0, armil: 0, jacks: 0,
  };
  const focus: Record<GlowKey, number> = { ...glowLevel };

  const toWorld = (b: RigidBody, local: V3): V3 => {
    const t = b.translation(), q = b.rotation();
    tmpV.set(local[0], local[1], local[2]).applyQuaternion(tmpQ.set(q.x, q.y, q.z, q.w));
    return [tmpV.x + t.x, tmpV.y + t.y, tmpV.z + t.z];
  };

  function update(dt: number) {
    for (const { g, b } of synced) {
      const t = b.translation(), q = b.rotation();
      g.position.set(t.x, t.y, t.z);
      g.quaternion.set(q.x, q.y, q.z, q.w);
    }
    // drops, stretched a little along their velocity
    let n = 0;
    for (const d of sim.drops) {
      if (n >= MAXD) break;
      const p = d.body.translation(), v = d.body.linvel();
      const sp = Math.hypot(v.x, v.y, v.z);
      tmpV.set(v.x, v.y, v.z);
      if (sp > 0.3) tmpQ.setFromUnitVectors(up, tmpV.normalize());
      else tmpQ.identity();
      const st = 1 + Math.min(sp * 0.18, 0.7);
      tmpS.set(1 / Math.sqrt(st), st, 1 / Math.sqrt(st));
      tmpM.compose(tmpV.set(p.x, p.y, p.z), tmpQ, tmpS);
      dropMesh.setMatrixAt(n++, tmpM);
    }
    dropMesh.count = n;
    dropMesh.instanceMatrix.needsUpdate = true;
    // scoop water levels
    const floorTop = SCOOP.floorY + SCOOP.floorHalf;
    const kk = 1 - Math.exp(-dt * 8);
    fills.forEach((f, k) => {
      const c = sim.waterIn(k);
      const target = c > 0 ? Math.min(SCOOP.wallTop - floorTop - 0.02, 0.025 + c * 0.0095) : 0;
      f.h += (target - f.h) * kk;
      f.m.visible = f.h > 0.006;
      if (!f.m.visible) return;
      const cu = SCOOP.len / 2, cv = floorTop + f.h / 2;
      const [u, v] = rot2(cu, cv, f.phi);
      f.m.position.set(0, v, -u);
      f.m.scale.set(SCOOP.halfN * 2 - 0.05, f.h, SCOOP.len - 0.09);
    });

    // chain between the two levers: straight when taut, gently bowed when slack
    const a = toWorld(sim.tianheng, ropeTopLocal), b = toWorld(sim.shuheng, ropeBotLocal);
    const dist = Math.hypot(...sub(a, b));
    const slack = Math.max(0, ropeLen - dist);
    const bow = Math.sqrt(slack * dist) * 0.6;
    for (let i = 0; i < LINKS; i++) {
      const s = (i + 0.5) / LINKS;
      const p = add(a, mul(sub(b, a), s));
      const off = Math.sin(s * Math.PI) * bow;
      tmpV.set(p[0], p[1], p[2] + off);
      tmpQ.setFromAxisAngle(up, i % 2 ? Math.PI / 2 : 0);
      tmpM.compose(tmpV, tmpQ, tmpS.set(1, 1.6, 1));
      chain.setMatrixAt(i, tmpM);
    }
    chain.instanceMatrix.needsUpdate = true;

    // motion → glow: each part warms up while it is moving
    const w = (b: RigidBody) => { const v = b.angvel(); return Math.hypot(v.x, v.y, v.z); };
    const k = 1 - Math.exp(-dt * 10);
    const target: Partial<Record<GlowKey, number>> = {
      wheel: w(sim.wheel) * 2.5,
      crown: w(sim.wheel) * 2.5,
      shuheng: w(sim.shuheng) * 3,
      tianheng: w(sim.tianheng) * 4,
      rope: w(sim.shuheng) * 2.5 + w(sim.tianheng) * 2.5,
      shaft: w(sim.shaft) * 2.5,
      globe: w(sim.globe) * 2.5,
      armil: w(sim.armil) * 2.5,
      jacks: w(sim.shaft) * 2.5 + Math.max(...sim.strikers.map((s) => w(s.body))) * 0.4,
      scoop: 0.15,
      water: 0.2,
    };
    for (const key of Object.keys(glowLevel) as GlowKey[]) {
      glowLevel[key] += (Math.min(1.2, target[key] ?? 0) - glowLevel[key]) * k;
      const e = glowLevel[key] * focus[key];
      for (const m of glowMats[key]) m.emissiveIntensity = key === "water" ? 0 : e * 0.2;
    }
    waterBits.update(dt, sim);
  }

  return { update, focus, glowLevel, scoopGroups, wheelG, shaftG, globeG, armilG, statics, plaqueMats };
}

/** a little wooden figure (木人) ~0.55 m tall, origin at its feet, facing +z */
export function jackFigure(M: Materials, robe: THREE.Material) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.32, 12), robe);
  body.position.y = 0.16;
  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.12, 12), robe);
  chest.position.y = 0.37;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 10), M.skin);
  head.position.y = 0.49;
  const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.07, 12), M.darkWood);
  hat.position.y = 0.55;
  const brim = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.012, 0.03), M.darkWood);
  brim.position.y = 0.53;
  const arms = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.05), robe);
  arms.position.set(0, 0.38, 0.06);
  g.add(body, chest, head, hat, brim, arms);
  g.traverse((o) => ((o as THREE.Mesh).castShadow = true));
  return g;
}

function crownMesh(g: THREE.Group, geo: typeof GLOBE, discMat: THREE.Material, pinMat: THREE.Material) {
  const Cl = sub(geo.C, geo.center);
  const disc = discGeo(geo.rho + 0.07, 0.04, POLAR, add(Cl, mul(POLAR, -0.13)), 48);
  g.add(merged([disc], discMat));
  const pins: THREE.BufferGeometry[] = [];
  const pitch = (Math.PI * 2) / geo.count;
  for (let j = 0; j < geo.count; j++) {
    const chi = (j + 0.5) * pitch;
    const p = add(Cl, add(mul(EQ_E, geo.rho * Math.cos(chi)), mul(EQ_F, geo.rho * Math.sin(chi))));
    pins.push(cylGeo(add(p, mul(POLAR, -0.14)), add(p, mul(POLAR, geo.pinHalf + geo.pinR)), geo.pinR, 8));
  }
  g.add(merged(pins, pinMat));
}

function buildTanks(M: Materials, statics: THREE.Group, spout: V3) {
  const group = new THREE.Group();
  statics.add(group);
  const tankBox = (c: V3, half: V3, level: number) => {
    const t = 0.04;
    const [cx, cy, cz] = c, [hx, hy, hz] = half;
    group.add(box([hx, t, hz], [cx, cy - hy, cz], M.darkWood));
    group.add(box([t, hy, hz], [cx - hx, cy, cz], M.darkWood));
    // front wall cut low (cut-away) so the water level inside is visible
    group.add(box([t, hy * 0.3, hz], [cx + hx, cy - hy * 0.7, cz], M.wood));
    group.add(box([hx, hy, t], [cx, cy, cz - hz], M.darkWood));
    group.add(box([hx, hy, t], [cx, cy, cz + hz], M.darkWood));
    for (const y of [cy - hy * 0.6]) {
      group.add(box([hx + 0.012, 0.02, hz + 0.012], [cx, y, cz], M.iron));
    }
    const surf = new THREE.Mesh(new THREE.PlaneGeometry(hx * 2 - 0.06, hz * 2 - 0.06), M.waterSurface);
    surf.rotation.x = -Math.PI / 2;
    surf.position.set(cx, cy - hy + level * hy * 2, cz);
    group.add(surf);
    return surf;
  };
  // 天池 upper reservoir and 平水壶 constant-level tank
  const tianchi: V3 = [spout[0], 4.05, -2.75];
  const pingshui: V3 = [spout[0], 3.35, -2.45];
  tankBox(tianchi, [0.55, 0.22, 0.3], 0.8);
  tankBox(pingshui, [0.3, 0.2, 0.25], 0.72);
  // legs / stands
  for (const [x, z] of [[-0.5, -0.25], [0.5, -0.25], [-0.5, 0.25], [0.5, 0.25]]) {
    group.add(beam([tianchi[0] + x, tianchi[1] - 0.22, tianchi[2] + z], [tianchi[0] + x, FLOORS.mech - 0.02, tianchi[2] + z], 0.05, 0.05, M.darkWood));
  }
  for (const [x, z] of [[-0.25, -0.2], [0.25, -0.2], [-0.25, 0.2], [0.25, 0.2]]) {
    group.add(beam([pingshui[0] + x, pingshui[1] - 0.2, pingshui[2] + z], [pingshui[0] + x, 0, pingshui[2] + z], 0.05, 0.05, M.darkWood));
  }
  // overflow pipe of the constant-level tank (keeps its level fixed)
  group.add(cyl([pingshui[0] - 0.25, pingshui[1] + 0.09, pingshui[2] - 0.25], [pingshui[0] - 0.25, 0.45, pingshui[2] - 0.25], 0.025, M.bronze));
  // pipe from 天池 down into 平水壶
  const p0: V3 = [tianchi[0] + 0.2, tianchi[1] - 0.22, tianchi[2] + 0.2];
  group.add(cyl(p0, [p0[0], p0[1] - 0.12, p0[2]], 0.03, M.bronze));
  // spout from 平水壶 out over the wheel (渴乌)
  const s0: V3 = [pingshui[0], pingshui[1] - 0.1, pingshui[2] + 0.25];
  const s1: V3 = [spout[0], spout[1] + 0.05, spout[2] - 0.12];
  group.add(cyl(s0, s1, 0.035, M.bronze));
  group.add(cyl(s1, [spout[0], spout[1], spout[2] - 0.02], 0.03, M.bronze));
  // falling stream 天池 → 平水壶 (a thin translucent ribbon, purely visual)
  const streamMat = new THREE.MeshStandardMaterial({ color: 0x6fb7e0, transparent: true, opacity: 0.55, roughness: 0.1 });
  const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 0.32, 8, 1, true), streamMat);
  stream.position.set(p0[0], p0[1] - 0.12 - 0.16, p0[2]);
  group.add(stream);
  // sump 退水壶
  const S = SUMP;
  const sumpSurf = tankBox([(S.x0 + S.x1) / 2, (S.y0 + S.y1) / 2, (S.z0 + S.z1) / 2], [(S.x1 - S.x0) / 2, (S.y1 - S.y0) / 2, (S.z1 - S.z0) / 2], 0.2);
  let tt = 0;
  return {
    update(dt: number, sim: Sim) {
      tt += dt;
      stream.scale.x = stream.scale.z = 1 + Math.sin(tt * 23) * 0.08;
      const lvl = Math.min(0.75, 0.2 + sim.sumpCount * 0.0012);
      sumpSurf.position.y = S.y0 + 0.04 + lvl * (S.y1 - S.y0 - 0.06);
    },
  };
}

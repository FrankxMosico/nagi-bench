// Real-time rigid-body model of Su Song's water-driven escapement and
// transmission, built on Rapier. Nothing here is keyframed: water drops fall
// into hinged scoops, the scoop weighs down a counterweighted lever, a rope
// (天条) lifts the upper lock (天关), the wheel turns under the weight of
// water until the next tooth is caught, and pin gears carry that motion up
// the vertical shaft to the globe, the armillary sphere and the jacks.
import type RAPIER_NS from "@dimforge/rapier3d-compat";
import type { RigidBody, Collider, World, ImpulseJoint, RevoluteImpulseJoint } from "@dimforge/rapier3d-compat";
import {
  G, WHEEL, wp, N_SCOOP, PITCH, R_HINGE, SCOOP, TEETH, TIANHENG, SHUHENG, SPOUT, DROP,
  SUMP, SHAFT, CROWN, LANTERN_B, POLAR, EQ_E, EQ_F, GLOBE, ARMIL, JACK, LEVER_N, TUNE, type V3,
} from "./layout";

type RAPIER = typeof RAPIER_NS;
type Q = { x: number; y: number; z: number; w: number };

export let DT = 1 / 240;

// collision groups
const WATER = 1, SCOOPG = 2, FORK = 4, TOOTH = 8, PAWL = 16, PINS = 32, LANT = 64, TAP = 128, LEV = 256,
  MALLET = 512, BELLS = 1024, TANK = 2048;
const grp = (member: number, filter: number) => ((member & 0xffff) << 16) | (filter & 0xffff);
const NONE = grp(0, 0);

const qAxis = (ax: V3, a: number): Q => {
  const s = Math.sin(a / 2);
  return { x: ax[0] * s, y: ax[1] * s, z: ax[2] * s, w: Math.cos(a / 2) };
};
const qMul = (a: Q, b: Q): Q => ({
  w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
  x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
  y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
  z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
});
const QI: Q = { x: 0, y: 0, z: 0, w: 1 };
const Q_Y_TO_X = qAxis([0, 0, 1], -Math.PI / 2);
/** rotation that takes local +y to the unit vector d (d not antiparallel to y) */
function qYTo(d: V3): Q {
  const c = d[1];
  const ax: V3 = [d[2], 0, -d[0]]; // y × d
  const l = Math.hypot(ax[0], ax[2]);
  if (l < 1e-9) return QI;
  return qAxis([ax[0] / l, 0, ax[2] / l], Math.acos(Math.max(-1, Math.min(1, c))));
}
/** in wheel-plane coords: rotate (u,v) by angle a (CCW) */
const rot2 = (u: number, v: number, a: number): [number, number] => [
  u * Math.cos(a) - v * Math.sin(a),
  u * Math.sin(a) + v * Math.cos(a),
];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];
const vec = (a: V3) => ({ x: a[0], y: a[1], z: a[2] });

/** angle of a body rotated purely about unit axis ax */
export function angleAbout(q: Q, ax: V3) {
  const s = q.x * ax[0] + q.y * ax[1] + q.z * ax[2];
  const a = 2 * Math.atan2(s, q.w); // (-2π, 2π]; fold into (-π, π]
  return a > Math.PI ? a - 2 * Math.PI : a <= -Math.PI ? a + 2 * Math.PI : a;
}

/** seeded PRNG (mulberry32) */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Drop {
  body: RigidBody;
  collider: Collider;
  born: number;
  landed: boolean;
  sumpT: number;
}

export type SimEvent =
  | { type: "lock"; t: number; speed: number }
  | { type: "release"; t: number }
  | { type: "trip"; t: number }
  | { type: "fork"; t: number; speed: number }
  | { type: "drop"; t: number; speed: number; where: "scoop" | "sump" }
  | { type: "strike"; t: number; which: "drum" | "bell"; speed: number }
  | { type: "gear"; t: number };

export interface Striker {
  body: RigidBody;
  kind: "drum" | "bell";
  axis: V3;
  pivot: V3;
  t: V3; // tangent (direction pins move)
  r: V3; // radial
  mallet: Collider;
  target: V3; // centre of drum/bell collider
  targetR: number;
}

export function createSim(R: RAPIER, seed = 7) {
  const random = rng(seed);
  const world: World = new R.World({ x: 0, y: -G, z: 0 });
  world.timestep = DT;
  DT = 1 / TUNE.hz;
  world.timestep = DT;
  world.integrationParameters.numSolverIterations = TUNE.iters;
  const queue = new R.EventQueue(true);
  const ground = world.createRigidBody(R.RigidBodyDesc.fixed());
  const tags = new Map<number, string>();

  const box = (
    body: RigidBody, half: V3, pos: V3, rot: Q, groups: number, density: number, friction = 0.4, tag?: string,
  ) => {
    const d = R.ColliderDesc.cuboid(half[0], half[1], half[2])
      .setTranslation(pos[0], pos[1], pos[2]).setRotation(rot)
      .setCollisionGroups(groups).setDensity(density).setFriction(friction).setRestitution(0);
    const c = world.createCollider(d, body);
    if (tag) tags.set(c.handle, tag);
    return c;
  };
  const capsule = (
    body: RigidBody, halfLen: number, r: number, pos: V3, rot: Q, groups: number, density: number, friction = 0.3, tag?: string,
  ) => {
    const d = R.ColliderDesc.capsule(halfLen, r).setTranslation(pos[0], pos[1], pos[2]).setRotation(rot)
      .setCollisionGroups(groups).setDensity(density).setFriction(friction).setRestitution(0);
    const c = world.createCollider(d, body);
    if (tag) tags.set(c.handle, tag);
    return c;
  };
  /** invisible mass carrier */
  const massBox = (body: RigidBody, half: V3, pos: V3, mass: number) =>
    box(body, half, pos, QI, NONE, mass / (8 * half[0] * half[1] * half[2]));

  const revolute = (b1: RigidBody, a1: V3, b2: RigidBody, a2: V3, axis: V3, limits?: [number, number]) => {
    const jd = R.JointData.revolute(vec(a1), vec(a2), vec(axis));
    const j = world.createImpulseJoint(jd, b1, b2, true) as RevoluteImpulseJoint;
    // (revolute limits are not taken from JointData, they must be set on the joint)
    if (limits) j.setLimits(limits[0], limits[1]);
    return j;
  };

  // ───────────────────────── Water wheel 枢轮 ─────────────────────────
  const wheelPos: V3 = [WHEEL.x, WHEEL.y, WHEEL.z];
  const wheel = world.createRigidBody(
    R.RigidBodyDesc.dynamic().setTranslation(...wheelPos).setAngularDamping(TUNE.wheelDamp).setCanSleep(false)
      .setAdditionalMassProperties(60, { x: 0, y: 0, z: 0 }, { x: 140, y: 75, z: 75 }, QI),
  );
  revolute(ground, wheelPos, wheel, [0, 0, 0], [1, 0, 0]);
  const toothBeta = Math.asin((TEETH.halfT + 0.003) / TEETH.rMid);
  // The tooth's working face is square to the lock when engaged: its push goes
  // straight through the lock lever's pivot and neither lifts nor seats it.
  const draw = 0;
  for (let k = 0; k < N_SCOOP; k++) {
    const th = k * PITCH + Math.PI / 2 + toothBeta;
    const [u, v] = rot2(TEETH.rMid, 0, th);
    const orient = th - toothBeta + draw;
    box(wheel, [TEETH.halfN, TEETH.halfT, TEETH.halfR], [TEETH.n, v, -u], qAxis([1, 0, 0], orient), grp(TOOTH, PAWL), 0, 0, "tooth");
  }
  // crown gear pins (along the axle)
  const crownPitch = (Math.PI * 2) / CROWN.count;
  for (let j = 0; j < CROWN.count; j++) {
    const a = Math.PI / 2 + (j + 0.5) * crownPitch;
    const [u, v] = rot2(CROWN.rho, 0, a);
    capsule(wheel, CROWN.halfLen, CROWN.pinR, [CROWN.n, v, -u], Q_Y_TO_X, grp(PINS, LANT), 0, 0.05);
  }

  // ───────────────────────── Scoops 受水壶 (hinged) ─────────────────────────
  const scoops: { body: RigidBody; phi0: number; joint: ImpulseJoint; floor: Collider }[] = [];
  const sDen = SCOOP.mass / 0.0276;
  for (let k = 0; k < N_SCOOP; k++) {
    const phi = k * PITCH;
    const [hu, hv] = rot2(R_HINGE, 0, phi);
    const hinge = wp(hu, hv, 0);
    const body = world.createRigidBody(
      R.RigidBodyDesc.dynamic().setTranslation(...hinge).setAngularDamping(TUNE.scoopDamp).setCanSleep(false),
    );
    const q = qAxis([1, 0, 0], phi);
    const part = (cu: number, cv: number, hn: number, hvv: number, huu: number, cn = 0) => {
      const [u, v] = rot2(cu, cv, phi);
      return box(body, [hn, hvv, huu], [cn, v, -u], q, grp(SCOOPG, WATER | FORK), sDen, 0.25, "scoop");
    };
    // walls stand on top of the floor so the underside is one clean face (no
    // internal edges for the fork tip to snag on)
    const L = SCOOP.len, w = SCOOP.wall, top = SCOOP.wallTop, bottom = SCOOP.floorY + SCOOP.floorHalf;
    const wallH = (top - bottom) / 2, wallC = (top + bottom) / 2;
    const floor = part(L / 2, SCOOP.floorY, SCOOP.halfN, SCOOP.floorHalf, L / 2);
    part(w, wallC, SCOOP.halfN, wallH, w);
    part(L - w, wallC, SCOOP.halfN, wallH, w);
    part(L / 2, wallC, 0.01, wallH, L / 2, SCOOP.halfN - 0.01);
    part(L / 2, wallC, 0.01, wallH, L / 2, -SCOOP.halfN + 0.01);
    const joint = revolute(wheel, sub(hinge, wheelPos), body, [0, 0, 0], [1, 0, 0], [SCOOP.droop, SCOOP.lift]);
    scoops.push({ body, phi0: phi, joint, floor });
  }

  // ───────────────────────── 天衡 / 天关 upper lever & lock ─────────────────────────
  const TH = TIANHENG;
  const thPivot = wp(TH.pivot.u, TH.pivot.v, LEVER_N);
  const tianheng = world.createRigidBody(
    R.RigidBodyDesc.dynamic().setTranslation(...thPivot).setAngularDamping(TUNE.thDamp).setCanSleep(false),
  );
  const rel2 = (u: number, v: number, n = LEVER_N): V3 => [n - LEVER_N, v - TH.pivot.v, -(u - TH.pivot.u)];
  const tipC = rel2(TH.tip.u, TH.tip.v, TEETH.n);
  const lockCollider = capsule(tianheng, 0.05, TH.tip.r, tipC, Q_Y_TO_X, grp(PAWL, TOOTH), 0, 0.0, "lock");
  lockCollider.setActiveEvents(R.ActiveEvents.COLLISION_EVENTS);
  massBox(tianheng, [0.04, 0.04, 0.04], tipC, TH.massLock);
  massBox(tianheng, [0.04, 0.04, 2.3 / 2], rel2(2.3 / 2, TH.beamV), TH.massBeam);
  massBox(tianheng, [0.06, 0.06, 0.06], rel2(TH.ropeU, TH.ropeV), TH.massCounter);
  // lifting the lock = clockwise (negative) rotation
  const tianhengJoint = revolute(ground, thPivot, tianheng, [0, 0, 0], [1, 0, 0], [-TH.maxLift, 0]);

  // ───────────────────────── 枢衡 / 格叉 / 枢权 lower weighing lever ─────────────────────────
  const SH = SHUHENG;
  const shPivot = wp(SH.pivot.u, SH.pivot.v, LEVER_N);
  const shuheng = world.createRigidBody(
    R.RigidBodyDesc.dynamic().setTranslation(...shPivot).setAngularDamping(TUNE.shDamp).setCanSleep(false),
  );
  const rel1 = (u: number, v: number, n = LEVER_N): V3 => [n - LEVER_N, v - SH.pivot.v, -(u - SH.pivot.u)];
  const forkHalf = (LEVER_N - SH.forkN0) / 2;
  const forkCollider = capsule(
    shuheng, forkHalf, SH.forkR, rel1(SH.forkU, SH.forkV, (SH.forkN0 + LEVER_N) / 2), Q_Y_TO_X,
    grp(FORK, SCOOPG), 0, 0.05, "fork",
  );
  forkCollider.setActiveEvents(R.ActiveEvents.COLLISION_EVENTS);
  massBox(shuheng, [0.04, 0.04, 0.04], rel1((SH.forkU + SH.pivot.u) / 2, (SH.forkV + SH.pivot.v) / 2), SH.massBeam * 0.6);
  massBox(shuheng, [0.04, 0.04, 0.04], rel1((SH.ropeU + SH.pivot.u) / 2, (SH.ropeV + SH.pivot.v) / 2), SH.massBeam * 0.4);
  massBox(shuheng, [0.09, 0.09, 0.09], rel1(SH.counterU, SH.counterV), SH.massCounter);
  // tipping under the scoop's weight = clockwise (negative) rotation
  const shuhengJoint = revolute(ground, shPivot, shuheng, [0, 0, 0], [1, 0, 0], [-SH.maxSwing, 0]);

  // ───────────────────────── 天条 chain (rope joint) ─────────────────────────
  const ropeTop = wp(TH.ropeU, TH.ropeV, LEVER_N);
  const ropeBot = wp(SH.ropeU, SH.ropeV, LEVER_N);
  const ropeLen = Math.hypot(...sub(ropeTop, ropeBot)) + TH.ropeSlack;
  world.createImpulseJoint(
    R.JointData.rope(ropeLen, vec(sub(ropeTop, thPivot)), vec(sub(ropeBot, shPivot))), tianheng, shuheng, true,
  );

  // ───────────────────────── Sump 退水壶 ─────────────────────────
  const S = SUMP;
  const sumpBody = world.createRigidBody(R.RigidBodyDesc.fixed());
  const sx = (S.x0 + S.x1) / 2, sz = (S.z0 + S.z1) / 2, hx = (S.x1 - S.x0) / 2, hz = (S.z1 - S.z0) / 2;
  const tankG = grp(TANK, WATER);
  box(sumpBody, [hx, 0.05, hz], [sx, S.y0 + 0.05, sz], QI, tankG, 0, 0.6);
  box(sumpBody, [0.03, (S.y1 - S.y0) / 2, hz], [S.x0, (S.y0 + S.y1) / 2, sz], QI, tankG, 0);
  box(sumpBody, [0.03, (S.y1 - S.y0) / 2, hz], [S.x1, (S.y0 + S.y1) / 2, sz], QI, tankG, 0);
  box(sumpBody, [hx, (S.y1 - S.y0) / 2, 0.03], [sx, (S.y0 + S.y1) / 2, S.z0], QI, tankG, 0);
  box(sumpBody, [hx, (S.y1 - S.y0) / 2, 0.03], [sx, (S.y0 + S.y1) / 2, S.z1], QI, tankG, 0);
  // floor catch-all
  box(sumpBody, [8, 0.05, 8], [0, -0.05, 0], QI, tankG, 0, 0.8);

  // ───────────────────────── Vertical shaft 天柱 ─────────────────────────
  const shaftPos: V3 = [SHAFT.x, LANTERN_B.y, SHAFT.z];
  const shaft = world.createRigidBody(
    R.RigidBodyDesc.dynamic().setTranslation(...shaftPos).setAngularDamping(0.6).setCanSleep(false)
      .setAdditionalMassProperties(70, { x: 0, y: 2.5, z: 0 }, { x: 300, y: 28, z: 300 }, QI),
  );
  revolute(ground, shaftPos, shaft, [0, 0, 0], [0, 1, 0]);
  const radial = (psi: number): V3 => [Math.cos(psi), 0, -Math.sin(psi)];
  const lantern = (y: number, r: number, count: number, halfLen: number, rungR: number, psi0: number) => {
    for (let i = 0; i < count; i++) {
      const psi = psi0 + (i * Math.PI * 2) / count;
      const p = add(mul(radial(psi), r), [0, y - shaftPos[1], 0]);
      capsule(shaft, halfLen, rungR, p, QI, grp(LANT, PINS), 0, 0.05);
    }
  };
  lantern(LANTERN_B.y, LANTERN_B.r, LANTERN_B.count, LANTERN_B.halfLen, LANTERN_B.rungR, 0);
  lantern(GLOBE.P[1], GLOBE.rl, GLOBE.count, 0.13, 0.03, Math.PI / 2);
  lantern(ARMIL.P[1], ARMIL.rl, ARMIL.count, 0.13, 0.03, Math.PI / 2);

  // tappet pins for the jacks
  const tappets = (yDisk: number, psiLever: number, count: number) => {
    for (let k = 0; k < count; k++) {
      const psi = psiLever - Math.PI / 12 + (k * Math.PI * 2) / count;
      const p = add(mul(radial(psi), JACK.pinR), [0, yDisk + 0.05 - shaftPos[1], 0]);
      capsule(shaft, 0.03, 0.022, p, QI, grp(TAP, LEV), 0, 0.1);
    }
  };
  tappets(JACK.drumPinY, JACK.drumAngle, 12);
  tappets(JACK.bellPinY, JACK.bellAngle, 6);

  // ───────────────────────── Globe 浑象 & armillary 浑仪 ─────────────────────────
  const polarBody = (geo: typeof GLOBE, mass: number, inertia: number) => {
    const body = world.createRigidBody(
      R.RigidBodyDesc.dynamic().setTranslation(...geo.center).setAngularDamping(0.6).setCanSleep(false)
        .setAdditionalMassProperties(mass, { x: 0, y: 0, z: 0 }, { x: inertia, y: inertia, z: inertia }, QI),
    );
    revolute(ground, geo.center, body, [0, 0, 0], POLAR);
    const qPin = qYTo(POLAR);
    const pitch = (Math.PI * 2) / geo.count;
    const Cl = sub(geo.C, geo.center);
    for (let j = 0; j < geo.count; j++) {
      const chi = (j + 0.5) * pitch;
      const p = add(Cl, add(mul(EQ_E, geo.rho * Math.cos(chi)), mul(EQ_F, geo.rho * Math.sin(chi))));
      capsule(body, geo.pinHalf, geo.pinR, p, qPin, grp(PINS, LANT), 0, 0.05);
    }
    return body;
  };
  const globe = polarBody(GLOBE, 30, 4.6);
  const armil = polarBody(ARMIL, 25, 11);

  // ───────────────────────── Jack strikers 击鼓 / 敲钟 ─────────────────────────
  const strikers: Striker[] = [];
  const makeStriker = (kind: "drum" | "bell", psi: number, yDisk: number) => {
    const r = radial(psi);
    const t: V3 = [-Math.sin(psi), 0, -Math.cos(psi)];
    const y: V3 = [0, 1, 0];
    const rPiv = 1.47;
    const pivot = add(add([SHAFT.x, 0, SHAFT.z], mul(r, rPiv)), [0, yDisk + 0.39, 0]);
    const P = (a: number, b: number, c = 0) => add(add(mul(t, a), mul(y, b)), mul(r, c)); // local offsets
    const body = world.createRigidBody(
      R.RigidBodyDesc.dynamic().setTranslation(...pivot).setAngularDamping(0.3).setCanSleep(false),
    );
    const qR = qMul(qAxis([0, 1, 0], psi), Q_Y_TO_X); // capsule axis along radial
    capsule(body, 0.09, 0.025, P(0, -0.3, -0.17), qR, grp(LEV, TAP), 0, 0.1, "tail");
    massBox(body, [0.03, 0.03, 0.03], P(0, -0.3, -0.17), 0.3);
    massBox(body, [0.03, 0.03, 0.03], P(0.14, 0, 0), 0.15);
    const malletPos = P(0.28, 0, 0);
    const mallet = world.createCollider(
      R.ColliderDesc.ball(0.045).setTranslation(...malletPos).setCollisionGroups(grp(MALLET, BELLS))
        .setDensity(0.45 / ((4 / 3) * Math.PI * 0.045 ** 3)).setRestitution(0.35).setFriction(0.2),
      body,
    );
    mallet.setActiveEvents(R.ActiveEvents.COLLISION_EVENTS);
    tags.set(mallet.handle, kind);
    const targetR = kind === "drum" ? 0.13 : 0.1;
    const target = add(add(pivot, malletPos), mul(y, -(0.045 + 0.004 + targetR)));
    world.createCollider(
      R.ColliderDesc.ball(targetR).setTranslation(...target).setCollisionGroups(grp(BELLS, MALLET)).setRestitution(0.35),
      ground,
    );
    revolute(ground, pivot, body, [0, 0, 0], r, [-0.05, 0.95]);
    strikers.push({ body, kind, axis: r, pivot, t, r, mallet, target, targetR });
  };
  makeStriker("drum", JACK.drumAngle, JACK.drumPinY);
  makeStriker("bell", JACK.bellAngle, JACK.bellPinY);

  // ───────────────────────── Water drops ─────────────────────────
  const drops: Drop[] = [];
  const dropByHandle = new Map<number, Drop>();
  const spout = wp(SPOUT.u, SPOUT.v, SPOUT.n);
  let spawnAcc = 0;
  let flowOn = true;
  let sumpCount = 0;
  const dropMass = DROP.density * (4 / 3) * Math.PI * DROP.r ** 3;

  const spawnDrop = (t: number) => {
    const j = () => random() * 2 - 1;
    const p: V3 = [spout[0] + j() * 0.05, spout[1] + j() * 0.01, spout[2] + j() * 0.01];
    const body = world.createRigidBody(
      R.RigidBodyDesc.dynamic().setTranslation(...p)
        .setLinvel(j() * 0.04, SPOUT.vv + j() * 0.04, -(SPOUT.vu + j() * 0.04)),
    );
    const collider = world.createCollider(
      R.ColliderDesc.ball(DROP.r).setDensity(DROP.density).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(grp(WATER, WATER | SCOOPG | TANK))
        .setActiveEvents(R.ActiveEvents.COLLISION_EVENTS),
      body,
    );
    const d: Drop = { body, collider, born: t, landed: false, sumpT: 0 };
    drops.push(d);
    dropByHandle.set(collider.handle, d);
  };
  const removeDrop = (i: number) => {
    const d = drops[i];
    dropByHandle.delete(d.collider.handle);
    world.removeRigidBody(d.body);
    drops.splice(i, 1);
  };

  // ───────────────────────── stepping & bookkeeping ─────────────────────────
  let t = 0;
  let steps = 0;
  let lockedPrev = true;
  let released = false;
  let tripped = false;
  const events: SimEvent[] = [];
  const wheelAngle = () => angleAbout(wheel.rotation(), [1, 0, 0]);
  let wheelUnwrapped = 0;
  let wheelPrev = 0;
  const shaftAngleRaw = () => angleAbout(shaft.rotation(), [0, 1, 0]);
  let shaftUnwrapped = 0;
  let shaftPrev = 0;

  function step() {
    // constant-level tank → constant flow
    if (flowOn) {
      spawnAcc += DT * SPOUT.rate;
      while (spawnAcc >= 1) {
        spawnAcc -= 1;
        spawnDrop(t);
      }
    }
    world.step(queue);
    t += DT;
    queue.drainCollisionEvents((h1, h2, started) => {
      if (!started) return;
      const a = tags.get(h1), b = tags.get(h2);
      const da = dropByHandle.get(h1), db = dropByHandle.get(h2);
      const drop = da ?? db;
      if (drop) {
        if (drop.landed) return;
        const other = da ? b : a;
        if (other === "scoop" || (!other && !(da && db))) {
          drop.landed = true;
          const v = drop.body.linvel();
          events.push({ type: "drop", t, speed: Math.hypot(v.x, v.y, v.z), where: other === "scoop" ? "scoop" : "sump" });
        }
        return;
      }
      if ((a === "lock" && b === "tooth") || (b === "lock" && a === "tooth")) {
        events.push({ type: "lock", t, speed: Math.abs(wheel.angvel().x) });
      } else if ((a === "fork" && b === "scoop") || (b === "fork" && a === "scoop")) {
        events.push({ type: "fork", t, speed: Math.abs(wheel.angvel().x) });
      } else if (a === "drum" || b === "drum" || a === "bell" || b === "bell") {
        const s = strikers.find((k) => k.kind === (a === "drum" || b === "drum" ? "drum" : "bell"))!;
        const w = s.body.angvel();
        events.push({ type: "strike", t, which: s.kind, speed: Math.hypot(w.x, w.y, w.z) * 0.28 });
      }
    });
    // wheel bookkeeping
    const wa = wheelAngle();
    let d = wa - wheelPrev;
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    wheelUnwrapped += d;
    wheelPrev = wa;
    const sa = shaftAngleRaw();
    let ds = sa - shaftPrev;
    if (ds > Math.PI) ds -= Math.PI * 2;
    if (ds < -Math.PI) ds += Math.PI * 2;
    shaftUnwrapped += ds;
    shaftPrev = sa;

    const lift = lockLift();
    if (!tripped && shuhengAngle() < -0.02) {
      tripped = true;
      events.push({ type: "trip", t });
    }
    if (!released && lift > 0.1) {
      released = true;
      events.push({ type: "release", t });
    }
    const locked = Math.abs(wheel.angvel().x) < 0.02 && lift < 0.02;
    if (locked && !lockedPrev && released) {
      steps++;
      released = false;
      tripped = false;
    }
    lockedPrev = locked;

    // retire water that has settled in the sump
    for (let i = drops.length - 1; i >= 0; i--) {
      const dr = drops[i];
      const p = dr.body.translation();
      if (p.y < SUMP.y1 + 0.05 && p.x > SUMP.x0 && p.x < SUMP.x1 && p.z > SUMP.z0 && p.z < SUMP.z1) {
        dr.sumpT += DT;
        if (dr.sumpT > 0.6) {
          removeDrop(i);
          sumpCount++;
        }
      } else if (p.y < 0.2 || t - dr.born > 40) {
        removeDrop(i);
        sumpCount++;
      }
    }
  }

  const shuhengAngle = () => angleAbout(shuheng.rotation(), [1, 0, 0]);
  const tianhengAngle = () => angleAbout(tianheng.rotation(), [1, 0, 0]);
  /** how far the lock tip has risen (m) */
  const lockLift = () => -tianhengAngle() * (TH.pivot.u - 0.03);
  const scoopRel = (k: number) => angleAbout(scoops[k].body.rotation(), [1, 0, 0]) - wheelAngle();

  /** index of the scoop currently nearest the filling station */
  const fillingScoop = () => {
    const wa = wheelUnwrapped;
    let best = 0, bd = 1e9;
    for (let k = 0; k < N_SCOOP; k++) {
      let a = (scoops[k].phi0 + wa) % (Math.PI * 2);
      if (a > Math.PI) a -= Math.PI * 2;
      if (a < -Math.PI) a += Math.PI * 2;
      const dd = Math.abs(a - 0.05);
      if (dd < bd) { bd = dd; best = k; }
    }
    return best;
  };

  /** count of drops inside scoop k */
  const waterIn = (k: number) => {
    const b = scoops[k].body;
    const p0 = b.translation();
    const q = b.rotation();
    const ang = angleAbout(q, [1, 0, 0]) + scoops[k].phi0;
    let n = 0;
    for (const d of drops) {
      const p = d.body.translation();
      const du = -(p.z - p0.z), dv = p.y - p0.y, dn = p.x - p0.x;
      const [lu, lv] = rot2(du, dv, -ang);
      if (lu > 0 && lu < SCOOP.len && lv > SCOOP.floorY - 0.02 && lv < SCOOP.wallTop + 0.05 && Math.abs(dn) < SCOOP.halfN) n++;
    }
    return n;
  };

  return {
    R, world, ground, wheel, scoops, tianheng, shuheng, shaft, globe, armil, strikers, drops,
    tianhengJoint, shuhengJoint,
    get t() { return t; },
    get steps() { return steps; },
    get sumpCount() { return sumpCount; },
    get wheelAngle() { return wheelUnwrapped; },
    get shaftAngle() { return shaftUnwrapped; },
    get globeAngle() { return angleAbout(globe.rotation(), POLAR); },
    get armilAngle() { return angleAbout(armil.rotation(), POLAR); },
    set flow(on: boolean) { flowOn = on; },
    dropMass,
    events,
    step,
    shuhengAngle, tianhengAngle, lockLift, scoopRel, fillingScoop, waterIn,
    ropeTop, ropeBot, spout,
  };
}

export type Sim = ReturnType<typeof createSim>;

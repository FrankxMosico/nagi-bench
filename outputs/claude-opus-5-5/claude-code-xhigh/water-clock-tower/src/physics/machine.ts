// 水运仪象台机械系统的物理模型（Rapier 实时计算）。
// 所有机械零件都是动力学刚体，靠重力、关节、接触和绳索约束互相带动；
// 渲染层只读取刚体位姿，不直接设置任何零件的位置或角度。
import type RAPIER_NS from "@dimforge/rapier3d-compat";

type R = typeof RAPIER_NS;
type Body = RAPIER_NS.RigidBody;
export type Vec = { x: number; y: number; z: number };
export type Quat = { x: number; y: number; z: number; w: number };

export const DEG = Math.PI / 180;

// ---------------------------------------------------------------------------
// 枢轮平面局部坐标 (u, v, w)：u = 侧面镜头看去向右（世界 +Z，朝塔前），
// v = 向上（世界 +Y），w = 轮轴方向（世界 -X，朝向塔左侧的镜头）。
// ---------------------------------------------------------------------------
export const WHEEL_C: Vec = { x: -1.85, y: 2.75, z: -0.5 };
export const Q_W: Quat = { x: 0, y: -Math.SQRT1_2, z: 0, w: Math.SQRT1_2 }; // rotY(-90°)
export const Q_I: Quat = { x: 0, y: 0, z: 0, w: 1 };

export const P = {
  dt: 1 / 240,
  solverIters: 4,
  n: 16, // 水斗数（原机 36 个，此处减少以便看清）
  rPivot: 1.5,
  bucketLen: 0.55,
  bucketDepth: 0.31,
  bucketHalfW: 0.2,
  wall: 0.03,
  tipDelta: 15 * DEG,
  rCross: 2.2,
  crossR: 0.04,
  crossHalfW: 0.24,
  pawlFaceU: 0.12,
  pawlArm: 0.8,
  balRaise: 0.3, // 天衡横梁高出支点的距离
  chainU: 3.22, // 天条悬挂位置（在水壶外侧，侧视时不遮挡水流）
  balChainArm: 0, // 由 chainU 推出
  forkArm: 0.62,
  forkChainArm: 0, // 由 chainU 推出
  forkCwArm: 0.5,
  forkCwMass: 7.2,
  forkBeamMass: 2.0,
  pawlMass: 3.0,
  balCwMass: 3.06,
  balBeamMass: 2.5,
  chainSlack: 0.012,
  waterR: 0.05,
  waterMass: 0.45,
  bucketMass: 3.0,
  spokeMass: 0.8,
  crossMass: 0.5,
  hubMass: 40,
  flowRate: 13,
  wheelDamping: 40,
  // 传动
  crownR: 0.75,
  crownW: -0.88, // 冠齿轮齿根所在 w
  crownToothLen: 0.12,
  crownToothHalfT: 0.065,
  lanternN: 12,
  lanternPinR: 0.05,
  spurN1: 12,
  spurN2: 24,
  spurR1: 0.55,
  spurR2: 1.1,
  shaftDamping: 6,
  jilunDamping: 60,
  globeMass: 2.0,
  armMass: 2.0,
  globeDamping: 3,
};

export const W_FRONT = 0.38;

export function rotZ(a: number): Quat {
  return { x: 0, y: 0, z: Math.sin(a / 2), w: Math.cos(a / 2) };
}
export function rotY(a: number): Quat {
  return { x: 0, y: Math.sin(a / 2), z: 0, w: Math.cos(a / 2) };
}
export function rotX(a: number): Quat {
  return { x: Math.sin(a / 2), y: 0, z: 0, w: Math.cos(a / 2) };
}
export function qmul(a: Quat, b: Quat): Quat {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}
export function qrot(q: Quat, v: Vec): Vec {
  const ix = q.w * v.x + q.y * v.z - q.z * v.y;
  const iy = q.w * v.y + q.z * v.x - q.x * v.z;
  const iz = q.w * v.z + q.x * v.y - q.y * v.x;
  const iw = -q.x * v.x - q.y * v.y - q.z * v.z;
  return {
    x: ix * q.w - iw * q.x - iy * q.z + iz * q.y,
    y: iy * q.w - iw * q.y - iz * q.x + ix * q.z,
    z: iz * q.w - iw * q.z - ix * q.y + iy * q.x,
  };
}
export function qconj(q: Quat): Quat {
  return { x: -q.x, y: -q.y, z: -q.z, w: q.w };
}
/** 把单位向量 a 转到单位向量 b 的四元数 */
export function qFromTo(a: Vec, b: Vec): Quat {
  const d = a.x * b.x + a.y * b.y + a.z * b.z;
  const c = { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
  if (d < -0.999999) {
    const ax = Math.abs(a.x) < 0.9 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 };
    const o = norm({ x: a.y * ax.z - a.z * ax.y, y: a.z * ax.x - a.x * ax.z, z: a.x * ax.y - a.y * ax.x });
    return { x: o.x, y: o.y, z: o.z, w: 0 };
  }
  const q = { x: c.x, y: c.y, z: c.z, w: 1 + d };
  const l = Math.hypot(q.x, q.y, q.z, q.w);
  return { x: q.x / l, y: q.y / l, z: q.z / l, w: q.w / l };
}
export function norm(v: Vec): Vec {
  const l = Math.hypot(v.x, v.y, v.z);
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}
export function add(a: Vec, b: Vec, s = 1): Vec {
  return { x: a.x + b.x * s, y: a.y + b.y * s, z: a.z + b.z * s };
}
export function cross(a: Vec, b: Vec): Vec {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
}
/** 枢轮平面坐标 → 世界坐标 */
export function W(u: number, v: number, w = 0): Vec {
  return { x: WHEEL_C.x - w, y: WHEEL_C.y + v, z: WHEEL_C.z + u };
}
export function rot2(u: number, v: number, a: number): [number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [u * c - v * s, u * s + v * c];
}
/** 水平面极坐标：绕 +Y 正向旋转 ang 时角度增加 */
export function polarY(r: number, ang: number): { x: number; z: number } {
  return { x: r * Math.cos(ang), z: -r * Math.sin(ang) };
}

// 碰撞分组（16 位成员 / 16 位过滤）
export const G = {
  STATIC: 0, WATER: 1, BUCKET: 2, TONGUE: 3, FORK: 4, CROSS: 5, PAWL: 6,
  CROWN: 7, LANTERN: 8, SPUR_A: 9, SPUR_B: 10, PEG: 11, JACK: 12, STRIKE: 13, NONE: 15,
};
export function groups(member: number, ...filter: number[]): number {
  let f = 0;
  for (const g of filter) f |= 1 << g;
  return ((1 << member) << 16) | f;
}

export type SoundKind = "lock" | "tongue" | "drum" | "bell";
export interface SoundEvent {
  kind: SoundKind;
  strength: number;
  t: number;
}

/** 由参数推导出的关键几何量 */
export function derived() {
  const n = P.n;
  const phi = (2 * Math.PI) / n;
  const crossStopU = P.pawlFaceU - P.crossR - 0.002;
  const alphaX = Math.acos(crossStopU / P.rCross);
  const thetaFill = alphaX - 5 * phi;
  const t0 = -P.bucketDepth / 2 - P.wall;
  // 斗舌底面在注水位、水斗略低于上限时的位置
  const restTip = -0.2 * P.tipDelta;
  const [tlu, tlv] = rot2(P.bucketLen - 0.05, -P.wall - 0.044, restTip);
  const [tpu, tpv] = rot2(P.rPivot, t0, thetaFill);
  const [tu, tv] = rot2(tlu, tlv, thetaFill);
  const tongueBottom = { u: tpu + tu, v: tpv + tv };
  const forkPivot = { u: tongueBottom.u - P.forkArm, v: tongueBottom.v - 0.03 };
  const pawlU = P.pawlFaceU + 0.05;
  const crossStopV = P.rCross * Math.sin(alphaX);
  const balPivot = { u: pawlU + P.pawlArm, v: crossStopV };
  const spoutUV = { u: 2.3, v: -0.42 };
  const spoutVel = { u: -1.8, v: 0 };
  // 冠齿轮—灯笼齿轮
  const crownPitchX = WHEEL_C.x - (P.crownW - P.crownToothLen / 2); // 世界 x
  const lanternR = (P.crownR * P.lanternN) / n;
  const tianzhu = { x: crownPitchX + lanternR, y: WHEEL_C.y + P.crownR, z: WHEEL_C.z };
  // 天柱齿轮 → 机轮
  const spurAY = 4.1;
  const jilunDir = 52 * DEG; // 从天柱指向机轮的水平方位（polarY 角，负值朝前）
  const jilunAng = -jilunDir;
  const jl = polarY(P.spurR1 + P.spurR2, jilunAng);
  const jilun = { x: tianzhu.x + jl.x, y: 0.45, z: tianzhu.z + jl.z };
  // 浑象（中层）与浑仪（顶层）：竖短轴位于天柱前方，极轴指向北（-Z），仰角为开封纬度
  const lat = 34.8 * DEG;
  const polar = { x: 0, y: Math.sin(lat), z: -Math.cos(lat) };
  const globeDir = -65 * DEG;
  const gs = polarY(P.spurR1 + P.spurR2, globeDir);
  const globeStub = { x: tianzhu.x + gs.x, y: 0, z: tianzhu.z + gs.z };
  const midLen = 0.32;
  const bDir = norm(add({ x: 0, y: 1, z: 0 }, polar));
  const centerFrom = (j1Y: number, dist: number) => add(add({ x: globeStub.x, y: j1Y, z: globeStub.z }, bDir, midLen), polar, dist);
  const globeGearY = 6.15, globeJ1Y = 6.45;
  const armGearY = 9.3, armJ1Y = 9.6;
  const globeCenter = centerFrom(globeJ1Y, 0.98);
  const armCenter = centerFrom(armJ1Y, 1.12);
  // 齿轮初相（碰撞体与可视化共用）
  const crownPitch = (2 * Math.PI) / n;
  const gapC = (P.crownR * crownPitch) / 2 - P.crownToothHalfT - P.lanternPinR;
  const crownPhase = Math.PI / 2 - (gapC - 0.004) / P.crownR;
  const lanternPhase = Math.PI + (P.crownR * crownPitch) / 2 / lanternR;
  const toothHalfT = 0.055;
  const gapS = (P.spurR1 * ((2 * Math.PI) / P.spurN1)) / 2 - 2 * toothHalfT;
  const driverPhase = (dir: number) => dir + (gapS - 0.004) / P.spurR1;
  const drivenPhase = (dir: number) => dir + Math.PI + Math.PI / P.spurN2;
  return {
    crownPitch, crownPhase, lanternPhase, toothHalfT, driverPhase, drivenPhase,
    n, phi, alphaX, thetaFill, t0, tongueBottom, forkPivot, pawlU, crossStopV, balPivot, spoutUV, spoutVel,
    lanternR, tianzhu, spurAY, jilunAng, jilun,
    polar, globeDir, globeStub, midLen, globeGearY, globeJ1Y, armGearY, armJ1Y, globeCenter, armCenter,
  };
}

// 机轮（报时轮）几何
export const JL = {
  pegR: 1.0, // 拨牙根部半径
  pegLen: 0.14,
  pegRad: 0.028,
  pegY: 0.78, // 拨牙所在高度（相对世界）
  placardY: 2.35,
  placardR: 1.02,
  jackTail: 0.3,
  catchDepth: 0.02, // 拨牙卡住木人脚的深度
  upstreamDeg: 4.5, // 静止时拨牙停在木人脚上游的角度
  jackSpring: 10,
  jackZ: 2.22, // 木人枢轴 z 位置（窗后）
  bellOffsetDeg: 34, // 敲钟木人相对正前方的方位（偏右）
  bellDrop: 0.15, // 敲钟拨牙比击鼓拨牙低
  footInnerR: 1.03, // 木人脚端伸到的机轮半径
};

// 升水轮（位于塔后左侧，平面与枢轮平行）
export const NORIA = { center: { x: -2.75, y: 2.9, z: -5.9 }, r: 2.6, speed: 0.32 };

export interface MachineOptions {
  initialFill?: number;
  onContact?: (r1: string, r2: string, t: number) => void;
}

export function buildMachine(RAPIER: R, opts: MachineOptions = {}) {
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  world.timestep = P.dt;
  world.numSolverIterations = P.solverIters;
  const events = new RAPIER.EventQueue(true);
  const D = derived();
  const { n, phi, alphaX, thetaFill, t0 } = D;

  const ground = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(WHEEL_C.x, WHEEL_C.y, WHEEL_C.z).setRotation(Q_W),
  );
  const worldGround = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  const strikeBase = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());

  const colliderRole = new Map<number, string>();
  type ColOpt = { rot?: Quat; mass?: number; grp?: number; friction?: number; restitution?: number; role?: string; events?: boolean; round?: number };
  const finish = (d: RAPIER_NS.ColliderDesc, body: Body, opt: ColOpt) => {
    if (opt.rot) d = d.setRotation(opt.rot);
    d = d.setMass(opt.mass ?? 1);
    d = d.setCollisionGroups(opt.grp ?? groups(G.NONE)).setSolverGroups(opt.grp ?? groups(G.NONE));
    d = d.setFriction(opt.friction ?? 0.3).setRestitution(opt.restitution ?? 0);
    if (opt.events) d = d.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
    const c = world.createCollider(d, body);
    if (opt.role) colliderRole.set(c.handle, opt.role);
    return c;
  };
  const box = (body: Body, hx: number, hy: number, hz: number, x: number, y: number, z: number, opt: ColOpt = {}) => {
    const d = opt.round
      ? RAPIER.ColliderDesc.roundCuboid(hx - opt.round, hy - opt.round, hz - opt.round, opt.round)
      : RAPIER.ColliderDesc.cuboid(hx, hy, hz);
    return finish(d.setTranslation(x, y, z), body, opt);
  };
  const cyl = (body: Body, halfH: number, r: number, x: number, y: number, z: number, opt: ColOpt = {}) =>
    finish(RAPIER.ColliderDesc.cylinder(halfH, r).setTranslation(x, y, z), body, opt);
  const ball = (body: Body, r: number, x: number, y: number, z: number, opt: ColOpt = {}) =>
    finish(RAPIER.ColliderDesc.ball(r).setTranslation(x, y, z), body, opt);
  // 绕局部 X 轴转 90°：圆柱（局部 Y 轴）→ 沿局部 Z
  const AXIAL: Quat = rotX(Math.PI / 2);

  const revolute = (b1: Body, a1: Vec, b2: Body, a2: Vec, axis: Vec, limits?: [number, number], damping = 0) => {
    const j = world.createImpulseJoint(RAPIER.JointData.revolute(a1, a2, axis), b1, b2, true) as RAPIER_NS.RevoluteImpulseJoint;
    j.setContactsEnabled(false);
    if (limits) j.setLimits(limits[0], limits[1]);
    if (damping > 0) {
      j.configureMotorModel(RAPIER.MotorModel.ForceBased);
      j.configureMotorVelocity(0, damping);
    }
    return j;
  };
  const Z: Vec = { x: 0, y: 0, z: 1 };
  const Y: Vec = { x: 0, y: 1, z: 0 };
  const O: Vec = { x: 0, y: 0, z: 0 };
  const dyn = (p: Vec, q: Quat = Q_I) =>
    world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(p.x, p.y, p.z).setRotation(q).setCanSleep(false));

  // ================================================================== 枢轮
  const wheel = dyn(WHEEL_C, Q_W);
  cyl(wheel, 0.55, 0.28, 0, 0, 0, { rot: AXIAL, mass: P.hubMass });
  for (let k = 0; k < n; k++) {
    const a = thetaFill + k * phi;
    const [cu, cv] = rot2((P.rCross + 0.3) / 2, 0, a);
    for (const side of [-1, 1]) {
      box(wheel, (P.rCross - 0.3) / 2, 0.035, 0.02, cu, cv, side * (P.bucketHalfW + 0.03), { rot: rotZ(a), mass: P.spokeMass });
    }
    const [xu, xv] = rot2(P.rCross, 0, a);
    cyl(wheel, P.crossHalfW, P.crossR, xu, xv, 0, {
      rot: AXIAL, mass: P.crossMass, grp: groups(G.CROSS, G.PAWL), friction: 0, role: "cross", events: true,
    });
  }
  // 冠齿轮：齿从轮盘向 -w（塔中心）方向伸出。初相使一个齿恰好贴住灯笼齿轮的销。
  const { crownPitch, crownPhase } = D;
  cyl(wheel, 0.03, P.crownR + 0.08, 0, 0, P.crownW + 0.03, { rot: AXIAL, mass: 6 });
  for (let k = 0; k < n; k++) {
    const a = crownPhase + k * crownPitch;
    const [cu, cv] = rot2(P.crownR, 0, a);
    box(wheel, 0.045, P.crownToothHalfT, P.crownToothLen / 2, cu, cv, P.crownW - P.crownToothLen / 2, {
      rot: rotZ(a), mass: 0.2, grp: groups(G.CROWN, G.LANTERN), friction: 0.02, round: 0.015,
    });
  }
  const wheelJoint = revolute(ground, O, wheel, O, Z, undefined, P.wheelDamping);

  // ================================================================== 水斗
  const buckets: { body: Body; joint: RAPIER_NS.RevoluteImpulseJoint; angle: number }[] = [];
  for (let k = 0; k < n; k++) {
    const a = thetaFill + k * phi;
    const [pu, pv] = rot2(P.rPivot, t0, a);
    const b = dyn(W(pu, pv, 0), Q_W);
    const q = rotZ(a);
    const L = P.bucketLen, Dp = P.bucketDepth, hw = P.bucketHalfW, t = P.wall;
    const grp = groups(G.BUCKET, G.WATER);
    const bm = P.bucketMass / 6;
    const place = (lx: number, ly: number): [number, number] => rot2(lx, ly, a);
    let [x, y] = place(L / 2, -t / 2);
    box(b, L / 2, t / 2, hw, x, y, 0, { rot: q, grp, mass: bm, friction: 0.2 });
    [x, y] = place(t / 2, Dp / 2);
    box(b, t / 2, Dp / 2, hw, x, y, 0, { rot: q, grp, mass: bm, friction: 0.2 });
    [x, y] = place(L - t / 2, Dp / 2);
    box(b, t / 2, Dp / 2, hw, x, y, 0, { rot: q, grp, mass: bm, friction: 0.2 });
    [x, y] = place(L / 2, Dp / 2);
    for (const side of [-1, 1]) box(b, L / 2, Dp / 2, t / 2, x, y, side * (hw - t / 2), { rot: q, grp, mass: bm, friction: 0.2 });
    [x, y] = place(L - 0.05, -t - 0.022);
    box(b, 0.028, 0.022, 0.07, x, y, hw + 0.06, {
      rot: q, grp: groups(G.TONGUE, G.FORK), mass: bm, friction: 0.15, role: "tongue", events: true,
    });
    const joint = revolute(wheel, { x: pu, y: pv, z: 0 }, b, O, Z, [-P.tipDelta, 0]);
    buckets.push({ body: b, joint, angle: a });
  }

  // ================================================================== 枢衡 + 枢权
  const fork = dyn(W(D.forkPivot.u, D.forkPivot.v, 0), Q_W);
  const beamL = -P.forkCwArm - 0.1, beamR = P.forkChainArm + 0.06;
  box(fork, (beamR - beamL) / 2, 0.035, 0.04, (beamR + beamL) / 2, 0, W_FRONT, { mass: P.forkBeamMass });
  box(fork, 0.045, 0.015, 0.07, P.forkArm, 0.015, W_FRONT - 0.09, {
    mass: 0.3, grp: groups(G.FORK, G.TONGUE), friction: 0.15, role: "fork", events: true,
  });
  box(fork, 0.1, 0.12, 0.06, -P.forkCwArm, -0.08, W_FRONT, { mass: P.forkCwMass });
  const forkJoint = revolute(ground, { x: D.forkPivot.u, y: D.forkPivot.v, z: 0 }, fork, O, Z, [-22 * DEG, 0], 0.5);

  // ================================================================== 天衡 + 天关 + 天权
  // 支点与天关—横档接触点同高（抬起天关时不需推回枢轮）；横梁抬高 BR，由竖板连到支点，
  // 这样从侧面能看清天关垂下、卡住横档的位置。
  const BR = P.balRaise;
  const bal = dyn(W(D.balPivot.u, D.balPivot.v, 0), Q_W);
  {
    const bl = -P.pawlArm - 0.3, br = P.balChainArm + 0.06;
    box(bal, (br - bl) / 2, 0.035, 0.04, (br + bl) / 2, BR, W_FRONT, { mass: P.balBeamMass });
    box(bal, 0.05, BR / 2, 0.04, 0, BR / 2, W_FRONT, { mass: 0.3 });
  }
  box(bal, 0.08, 0.1, 0.06, -P.pawlArm - 0.2, BR - 0.12, W_FRONT, { mass: P.balCwMass });
  {
    const hz = (W_FRONT + 0.16) / 2, cz = (W_FRONT - 0.16) / 2 - 0.02;
    const hy = (BR + 0.05) / 2;
    box(bal, 0.05, hy, hz, -P.pawlArm, hy - 0.05, cz, {
      mass: P.pawlMass, grp: groups(G.PAWL, G.CROSS), friction: 0, role: "pawl", events: true,
    });
  }
  const balJoint = revolute(ground, { x: D.balPivot.u, y: D.balPivot.v, z: 0 }, bal, O, Z, [-25 * DEG, 0], 0.2);

  // ================================================================== 天条（链条：只能拉不能推）
  const balAnchor = { x: P.balChainArm, y: BR, z: W_FRONT };
  const forkAnchor = { x: P.forkChainArm, y: 0, z: W_FRONT };
  const chainA = W(D.balPivot.u + P.balChainArm, D.balPivot.v + BR, W_FRONT);
  const chainB = W(D.forkPivot.u + P.forkChainArm, D.forkPivot.v, W_FRONT);
  const chainLength = Math.hypot(chainA.x - chainB.x, chainA.y - chainB.y, chainA.z - chainB.z) + P.chainSlack;
  world.createImpulseJoint(RAPIER.JointData.rope(chainLength, balAnchor, forkAnchor), bal, fork, true);

  // ================================================================== 天柱（竖直传动轴）
  const TZ = D.tianzhu;
  const tianzhu = dyn(TZ);
  cyl(tianzhu, 3.1, 0.09, 0, 3.0, 0, { mass: 6 }); // 轴身：y 从 -0.1 到 6.1（相对）
  // 灯笼齿轮：上下两盘 + 竖销。初相：一根销位于啮合点前方半个齿距处。
  const lanternPitch = (2 * Math.PI) / P.lanternN;
  const lanternPhase = D.lanternPhase;
  for (const dy of [-0.11, 0.11]) cyl(tianzhu, 0.015, D.lanternR + 0.07, 0, dy, 0, { mass: 0.6 });
  for (let k = 0; k < P.lanternN; k++) {
    const p = polarY(D.lanternR, lanternPhase + k * lanternPitch);
    cyl(tianzhu, 0.1, P.lanternPinR, p.x, 0, p.z, { mass: 0.1, grp: groups(G.LANTERN, G.CROWN), friction: 0.02 });
  }
  // 天柱上的小齿轮（12 齿）与从动大齿轮（24 齿）：竖直轴之间的正齿轮副。
  // 初相：主动齿贴住其前方的从动齿（主动轮从上往下看逆时针转）。
  const toothHalfT = D.toothHalfT;
  const spurTeeth = (body: Body, center: Vec, yWorld: number, r: number, N: number, phase: number, grp: number, hubMass: number) => {
    const ly = yWorld - center.y;
    cyl(body, 0.05, r - 0.06, 0, ly, 0, { mass: hubMass });
    for (let k = 0; k < N; k++) {
      const a = phase + (k * 2 * Math.PI) / N;
      const p = polarY(r, a);
      box(body, 0.08, 0.05, toothHalfT, p.x, ly, p.z, { rot: rotY(a), mass: 0.05, grp, friction: 0.02, round: 0.015 });
    }
  };
  const drivenSpur = (body: Body, center: Vec, yWorld: number, dirFromTZ: number, hubMass: number) => {
    spurTeeth(tianzhu, TZ, yWorld, P.spurR1, P.spurN1, D.driverPhase(dirFromTZ), groups(G.SPUR_A, G.SPUR_B), 1.0);
    spurTeeth(body, center, yWorld, P.spurR2, P.spurN2, D.drivenPhase(dirFromTZ), groups(G.SPUR_B, G.SPUR_A), hubMass);
  };
  revolute(worldGround, TZ, tianzhu, O, Y, undefined, P.shaftDamping);

  // ================================================================== 机轮（报时轮）
  const JC = D.jilun;
  const jilun = dyn(JC);
  cyl(jilun, 1.9, 0.12, 0, 1.9, 0, { mass: 6 });
  drivenSpur(jilun, JC, D.spurAY, D.jilunAng, 3);
  // 拨牙轮盘与拨牙：正前方（-π/2 方位，即 +Z）为击鼓木人，偏右 bellOffsetDeg 为敲钟木人
  const pegY = JL.pegY - JC.y;
  cyl(jilun, 0.04, JL.pegR, 0, pegY - JL.bellDrop - 0.07, 0, { mass: 4 });
  const front = -Math.PI / 2;
  const pegAngles: { ang: number; kind: "drum" | "bell"; y: number }[] = [];
  // 机轮从上往下看顺时针转（角度减小）。拨牙停在木人尾杆上游（角度更大一侧）约 2°。
  const upstream = JL.upstreamDeg * DEG;
  for (let k = 0; k < 12; k++) {
    pegAngles.push({ ang: front + upstream + 15 * DEG + k * 30 * DEG, kind: "drum", y: JL.pegY });
    pegAngles.push({ ang: front + JL.bellOffsetDeg * DEG + upstream + 30 * DEG + k * 30 * DEG, kind: "bell", y: JL.pegY - JL.bellDrop });
  }
  // 方形拨牙：脚越过拨牙棱边时立即脱开，木人被扭簧迅速弹回击打
  for (const pg of pegAngles) {
    const p = polarY(JL.pegR + JL.pegLen / 2, pg.ang);
    box(jilun, JL.pegLen / 2, JL.pegRad, JL.pegRad, p.x, pg.y - JC.y, p.z, {
      rot: rotY(pg.ang), mass: 0.03, grp: groups(G.PEG, G.JACK), friction: 0.05,
    });
  }
  // 时辰牌木人所在的转盘（质量）
  cyl(jilun, 0.03, JL.placardR + 0.1, 0, JL.placardY - JC.y - 0.3, 0, { mass: 4 });
  revolute(worldGround, JC, jilun, O, Y, undefined, P.jilunDamping);

  // ================================================================== 报时木人（击鼓、敲钟）
  type Jack = {
    body: Body; pivot: Vec; kind: "drum" | "bell"; strikerTip: Vec; footY: number; q: Quat;
    rPivot: number; tailBottom: number; footLen: number; strikeCenter: Vec; base: Body;
  };
  const jacks: Jack[] = [];
  const makeJack = (kind: "drum" | "bell", ang: number, footY: number) => {
    // 木人绕“机轮径向”的水平轴转动；枢轴位于该径向线上、窗后 jackZ 处。
    // 局部坐标：Z = 径向朝外（朝窗），Y = 上，X = 观众看去的右方。
    const dir = polarY(1, ang);
    const rPivot = (JL.jackZ - JC.z) / dir.z;
    const pivot = { x: JC.x + dir.x * rPivot, y: footY + JL.jackTail, z: JL.jackZ };
    const qj = rotY(ang + Math.PI / 2);
    const base = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(pivot.x, pivot.y, pivot.z).setRotation(qj));
    const body = dyn(pivot, qj);
    // 尾杆：从枢轴竖直向下到拨牙高度；脚沿径向伸向机轮，进入拨牙经过的路径
    const tailBottom = footY + JL.pegRad - JL.catchDepth - pivot.y; // 相对
    box(body, 0.025, -tailBottom / 2, 0.025, 0, tailBottom / 2, 0, { mass: 0.15 });
    const footLen = rPivot - JL.footInnerR + 0.03;
    box(body, 0.03, 0.03, footLen / 2, 0, tailBottom + 0.03, -(footLen / 2 - 0.03), {
      mass: 0.6, grp: groups(G.JACK, G.PEG), friction: 0.05,
    });
    // 木人与手臂、槌头（在枢轴上方偏左）
    box(body, 0.06, 0.16, 0.05, 0, 0.2, 0.1, { mass: 0.25 });
    const tip = kind === "drum" ? { x: -0.2, y: 0.44, z: 0.12 } : { x: -0.22, y: 0.38, z: 0.12 };
    box(body, 0.02, 0.15, 0.02, tip.x / 2, (tip.y + 0.2) / 2, 0.12, { rot: rotZ(Math.atan2(-tip.x, tip.y - 0.2)), mass: 0.05 });
    ball(body, 0.05, tip.x, tip.y, tip.z, {
      mass: 0.12, grp: groups(G.JACK, G.STRIKE), friction: 0.1, restitution: 0.05, role: kind === "drum" ? "drumMallet" : "bellMallet", events: true,
    });
    const j = revolute(base, O, body, O, Z, [-40 * DEG, 8 * DEG]);
    // 竹片弹簧（扭簧）+ 重力使木人复位
    j.configureMotorModel(RAPIER.MotorModel.ForceBased);
    j.configureMotorPosition(0, JL.jackSpring, 0.25);
    // 鼓 / 钟（静止碰撞体，挂在独立的固定刚体上）：位于槌头静止位置左侧
    const target = add(pivot, qrot(qj, tip));
    let strikeCenter: Vec;
    if (kind === "drum") {
      strikeCenter = add(target, qrot(qj, { x: -(0.05 + 0.07 - 0.012), y: 0, z: 0 }));
      cyl(strikeBase, 0.07, 0.17, strikeCenter.x, strikeCenter.y, strikeCenter.z, {
        rot: qmul(qj, rotZ(Math.PI / 2)), grp: groups(G.STRIKE, G.JACK), restitution: 0.1, role: "drum", events: true,
      });
    } else {
      strikeCenter = add(target, qrot(qj, { x: -(0.05 + 0.14 - 0.012), y: 0, z: 0 }));
      ball(strikeBase, 0.14, strikeCenter.x, strikeCenter.y, strikeCenter.z, {
        grp: groups(G.STRIKE, G.JACK), restitution: 0.1, role: "bell", events: true,
      });
    }
    jacks.push({ body, pivot, kind, strikerTip: tip, footY, q: qj, rPivot, tailBottom, footLen, strikeCenter, base });
  };
  makeJack("drum", front, JL.pegY);
  makeJack("bell", front + JL.bellOffsetDeg * DEG, JL.pegY - JL.bellDrop);

  // ================================================================== 浑象、浑仪：天柱齿轮 → 竖短轴 → 双十字万向节 → 极轴
  const poleDrive = (S: Vec, dirFromTZ: number, gearY: number, j1Y: number, center: Vec, objMass: number, objR: number) => {
    const C = D.polar;
    const b = norm(add(Y, C));
    const armB = norm({ x: 0, y: b.z, z: -b.y });
    const X: Vec = { x: 1, y: 0, z: 0 };
    const stubPos = { x: S.x, y: gearY, z: S.z };
    const stub = dyn(stubPos);
    cyl(stub, (j1Y - gearY + 0.1) / 2, 0.05, 0, (j1Y - gearY - 0.1) / 2, 0, { mass: 0.6 });
    drivenSpur(stub, stubPos, gearY, dirFromTZ, 1.5);
    revolute(worldGround, stubPos, stub, O, Y, undefined, P.shaftDamping * 0.5);
    const J1 = { x: S.x, y: j1Y, z: S.z };
    const J2 = add(J1, b, D.midLen);
    const cross1 = dyn(J1);
    ball(cross1, 0.06, 0, 0, 0, { mass: 0.15 });
    const midPos = add(J1, b, D.midLen / 2);
    const mid = dyn(midPos);
    cyl(mid, D.midLen / 2, 0.04, 0, 0, 0, { rot: qFromTo(Y, b), mass: 0.3 });
    const cross2 = dyn(J2);
    ball(cross2, 0.06, 0, 0, 0, { mass: 0.15 });
    const obj = dyn(center);
    ball(obj, objR, 0, 0, 0, { mass: objMass });
    const rel = (p: Vec, o: Vec) => ({ x: p.x - o.x, y: p.y - o.y, z: p.z - o.z });
    revolute(stub, rel(J1, stubPos), cross1, O, X);
    revolute(cross1, O, mid, rel(J1, midPos), armB);
    revolute(mid, rel(J2, midPos), cross2, O, armB);
    revolute(cross2, O, obj, rel(J2, center), X);
    revolute(worldGround, center, obj, O, C, undefined, P.globeDamping);
    return { stub, cross1, mid, cross2, obj, J1, J2, center, b };
  };
  const globe = poleDrive(D.globeStub, D.globeDir, D.globeGearY, D.globeJ1Y, D.globeCenter, P.globeMass, 0.75);
  const armillary = poleDrive(D.globeStub, D.globeDir, D.armGearY, D.armJ1Y, D.armCenter, P.armMass, 0.9);

  // ================================================================== 升水轮（河车）：人力转动，把退水壶的水提回天池
  const noriaC = NORIA.center;
  const noria = dyn(noriaC, Q_W);
  cyl(noria, 0.3, 0.25, 0, 0, 0, { rot: AXIAL, mass: 30 });
  cyl(noria, 0.05, NORIA.r, 0, 0, 0, { rot: AXIAL, mass: 40 });
  {
    const noriaBase = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(noriaC.x, noriaC.y, noriaC.z).setRotation(Q_W));
    const j = revolute(noriaBase, O, noria, O, Z);
    j.configureMotorModel(RAPIER.MotorModel.ForceBased);
    j.configureMotorVelocity(NORIA.speed, 400);
  }

  // ================================================================== 水
  const water: Body[] = [];
  const freeWater: Body[] = [];
  const makeWater = (p: Vec, v: Vec) => {
    let b = freeWater.pop();
    if (b) {
      b.setTranslation(p, true);
      b.setLinvel(v, true);
      b.setAngvel(O, true);
      b.setEnabled(true);
    } else {
      b = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic().setTranslation(p.x, p.y, p.z).setLinvel(v.x, v.y, v.z).setCanSleep(false).setLinearDamping(0.05),
      );
      finish(RAPIER.ColliderDesc.ball(P.waterR), b, {
        mass: P.waterMass, grp: groups(G.WATER, G.WATER, G.BUCKET, G.STATIC), friction: 0.05, restitution: 0.05,
      });
    }
    water.push(b);
    return b;
  };
  const spout = W(D.spoutUV.u, D.spoutUV.v, 0);

  const fillBucket = (k: number, count: number) => {
    const bk = buckets[k];
    const bp = bk.body.translation();
    const pts: Vec[] = [];
    const s = P.waterR * 2.02;
    for (let i = 0; i < 5; i++)
      for (let j = 0; j < 3; j++)
        for (let m = 0; m < 3; m++) {
          const lx = P.wall + P.waterR + 0.01 + i * s * 0.97;
          const ly = P.waterR + 0.005 + j * s;
          const lw = -P.bucketHalfW + P.wall + P.waterR + 0.01 + m * s * 1.03;
          if (lx > P.bucketLen - P.wall - P.waterR) continue;
          const [ru, rv] = rot2(lx, ly, bk.angle - P.tipDelta);
          pts.push({ x: bp.x - lw, y: bp.y + rv, z: bp.z + ru });
        }
    pts.sort((a, b) => a.y - b.y);
    for (let i = 0; i < Math.min(count, pts.length); i++) makeWater(pts[i], O);
  };
  fillBucket(n - 1, 26);
  fillBucket(n - 2, 20);
  fillBucket(0, opts.initialFill ?? 8);

  let time = 0;
  let nextDrop = 0;
  let dropIndex = 0;
  const sounds: SoundEvent[] = [];
  const lastSound = new Map<string, number>();
  const emit = (kind: SoundKind, strength: number) => {
    const last = lastSound.get(kind) ?? -1;
    if (time - last < 0.12) return;
    lastSound.set(kind, time);
    sounds.push({ kind, strength, t: time });
  };

  const angSpeed = (b: Body) => {
    const w = b.angvel();
    return Math.hypot(w.x, w.y, w.z);
  };
  let wheelPeak = 0;
  const jackPeak = [0, 0];
  const step = () => {
    while (time >= nextDrop) {
      const j1 = Math.sin(dropIndex * 12.9898) * 43758.5453;
      const j2 = Math.sin(dropIndex * 78.233) * 12345.678;
      const r1 = j1 - Math.floor(j1) - 0.5, r2 = j2 - Math.floor(j2) - 0.5;
      makeWater(
        { x: spout.x - r1 * 0.1, y: spout.y + r2 * 0.02, z: spout.z },
        { x: -r2 * 0.05, y: D.spoutVel.v, z: D.spoutVel.u + r1 * 0.04 },
      );
      dropIndex++;
      nextDrop += 1 / P.flowRate;
    }
    // 记录撞击前的速度峰值（碰撞事件在解算之后才取出，此时速度已被接触消去）
    wheelPeak = Math.max(Math.abs(wheel.angvel().x), wheelPeak * 0.9);
    jacks.forEach((j, i) => { jackPeak[i] = Math.max(angSpeed(j.body), jackPeak[i] * 0.9); });
    world.step(events);
    time += P.dt;
    events.drainCollisionEvents((h1, h2, started) => {
      if (!started) return;
      const r1 = colliderRole.get(h1), r2 = colliderRole.get(h2);
      opts.onContact?.(r1 ?? "?", r2 ?? "?", time);
      const has = (r: string) => r1 === r || r2 === r;
      if (has("pawl") && has("cross")) emit("lock", Math.min(1, wheelPeak * 1.6 + 0.15));
      else if (has("fork") && has("tongue")) emit("tongue", 0.5);
      else if (has("drumMallet") && has("drum")) emit("drum", Math.min(1, jackPeak[0] * 0.22 + 0.1));
      else if (has("bellMallet") && has("bell")) emit("bell", Math.min(1, jackPeak[1] * 0.22 + 0.1));
    });
    for (let i = water.length - 1; i >= 0; i--) {
      const b = water[i];
      const p = b.translation();
      if (p.y < 0.35 || Math.abs(p.z - WHEEL_C.z) > 4.5) {
        b.setEnabled(false);
        water.splice(i, 1);
        freeWater.push(b);
      }
    }
  };

  /** 射线检测（只与水斗相交），用于让可视水柱停在它实际落到的位置 */
  const rayBucket = (o: Vec, d: Vec, maxToi: number): number | null => {
    const hit = world.castRay(new RAPIER.Ray(o, d), maxToi, true, undefined, groups(G.WATER, G.BUCKET));
    return hit ? hit.timeOfImpact : null;
  };
  const relAngle = (b1: Body, b2: Body, axis: "x" | "y" | "z") => {
    const rel = qmul(qconj(b1.rotation()), b2.rotation());
    return 2 * Math.atan2(rel[axis], rel.w);
  };

  return {
    world, wheel, wheelJoint, buckets, fork, forkJoint, bal, balJoint, tianzhu, jilun, jacks, water, sounds, step,
    globe, armillary, noria, rayBucket,
    polarAngle: (obj: Body) => {
      const q = obj.rotation();
      const c = D.polar;
      return 2 * Math.atan2(q.x * c.x + q.y * c.y + q.z * c.z, q.w);
    },
    ground, worldGround, spout, geom: D, pegAngles, balAnchor, forkAnchor, chainLength,
    get time() { return time; },
    wheelAngle: () => relAngle(ground, wheel, "z"),
    tianzhuAngle: () => relAngle(worldGround, tianzhu, "y"),
    jilunAngle: () => relAngle(worldGround, jilun, "y"),
    relAngle,
    alphaX,
  };
}

export type Machine = ReturnType<typeof buildMachine>;

/** 由天条悬挂位置反推两根杠杆的链臂长度 */
export function applyChainGeometry() {
  const d = derived();
  P.forkChainArm = P.chainU - d.forkPivot.u;
  P.balChainArm = P.chainU - d.balPivot.u;
}
applyChainGeometry();

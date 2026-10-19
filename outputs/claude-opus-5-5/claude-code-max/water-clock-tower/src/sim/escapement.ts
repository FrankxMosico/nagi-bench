// 枢轮 + 受水壶 + 天衡擒纵（格叉/枢衡/天条/天衡/天关/左右天锁）的刚体与关节。
// 所有运动都由 Rapier 计算：这里只负责搭建几何、质量与约束。
import {
  RAPIER, G, groups, DEG, PlaneFrame, boxDesc, pinDesc, qIdent, revolute,
  type Body, type World, type Vec3,
} from './core';
import type { P2 } from './poly';

const add = (a: P2, b: P2): P2 => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P2, s: number): P2 => [a[0] * s, a[1] * s];
const rot = (p: P2, a: number): P2 => {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c];
};
const dir = (a: number): P2 => [Math.cos(a), Math.sin(a)];

export const ESC = {
  origin: { x: 1.8, y: 2.3, z: 0.3 } as Vec3,
  N: 36,
  pitch: 10 * DEG,
  thetaF: 80 * DEG, // 受水位：处于受水位的水斗枢轴所在角
  RP: 1.5, // 水斗枢轴半径
  W: 0.36, // 轮宽（前后两片辐条的间距）
  rimR: [0.62, 1.32, 1.78], // 三道辋
  hubR: 0.26,
  wheelMass: 150,
  wheelK: 1.25,
  wheelDamping: 2.5,
  // ---- 受水壶（受水位姿态下、以斗轴为原点的设计坐标）----
  gamma: 18 * DEG, // 斗口相对竖直略向后倾
  ob: [0.1, 0.03] as P2, // 斗底中心
  wb: 0.15, wt: 0.19, h: 0.18, wall: 0.014,
  halfW: 0.14, // 斗内半宽（轴向）
  pinS: 0.2, pinR: 0.02, pinW0: 0.12, pinW1: 0.31,
  lambda: 10 * DEG, // 满斗下沉角
  mu: 6 * DEG,
  // ---- 锁销 ----
  RLK: 1.82, lockPinR: 0.022, lockPinW0: 0.17, lockPinW1: 0.33,
  // ---- 格叉 / 枢衡 ----
  Q: [1.42, 1.43] as P2,
  forkW: 0.255,
  forkArmMass: 1.5,
  forkWeight: 5.0, // 枢权
  forkWeightArm: 0.36,
  forkMax: 8 * DEG,
  forkDamping: 15,
  shelfLead: 0.035,
  shelfTrail: 0.07,
  rampLen: 0.14,
  // ---- 天衡 / 天关 ----
  U: [0.4, 2.44] as P2,
  lockU: 0.0, // 天关挡面所在 u
  lockW: 0.25,
  lockMass: 1.0,
  lockOverlap: 0.036,
  upperArmR: 0.2, // 天条挂点到支点
  upperMass: 2.0,
  upperWeightR: 0.6, // 天权：挂在天条一侧，抵消大部分梁重，使天衡仅略偏锁侧
  upperDamping: 8,
  lockDamping: 4,
  lockMaxLift: 0.06,
  upperMin: -8 * DEG,
  // ---- 天锁（防倒转棘爪）----
  pawlAngles: [108 * DEG, 72 * DEG],
};

export interface ScoopInfo {
  body: Body;
  pin: RAPIER.Collider;
  pinShape: RAPIER.Shape;
  index: number;
  delta: number; // 相对受水位的安装角
  poly: P2[]; // 刚体局部坐标中的斗内截面（逆时针）
  lipA: P2; // 后唇
  lipB: P2; // 前唇
  pinLocal: P2;
  ownCom: P2; // 木斗自身质心（局部）
}

/** 木斗自身的质量属性（受水位姿态下、以斗轴为原点） */
export const SCOOP_OWN = { mass: 2.2, com: [0.079, 0.095] as P2, inertia: 0.03 };

export interface Escapement {
  frame: PlaneFrame;
  ground: Body;
  wheel: Body;
  scoops: ScoopInfo[];
  fork: Body;
  upper: Body;
  lock: Body;
  pawls: Body[];
  // 设计几何，供渲染使用
  geo: {
    stationPoly: P2[];
    lipA: P2; lipB: P2;
    pinL: P2;
    shelf: { s0: P2; t: P2; n: P2; lead: number; trail: number; ramp: number; rampDepth: number };
    forkTipLocal: P2; forkChainLocal: P2; forkWeightLocal: P2;
    upperLockLocal: P2; upperChainLocal: P2; upperWeightLocal: P2;
    lockTop: P2; lockBottom: P2; lockOrigin: P2; lockWidth: number;
    lockPinAngle0: number;
    pawls: { pivot: P2; tip: P2 }[];
    spout: P2;
    chainLen: number;
    lockRopeLen: number;
  };
  lockColliders: number[];
  pawlColliders: number[];
  wheelPinColliders: number[];
  scoopPinColliders: number[];
  forkColliders: number[];
}

export function buildEscapement(world: World, ground: Body): Escapement {
  const P = ESC;
  const frame = new PlaneFrame(P.origin);
  const o = P.origin;

  // ------------------------------------------------------------ 枢轮
  const wheel = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(o.x, o.y, o.z)
      .setAngularDamping(P.wheelDamping)
      .setSoftCcdPrediction(0.03) // 锁销撞上天关前即生成预测接触，减少穿透回弹
      .setCanSleep(false)
      .setAdditionalMassProperties(
        P.wheelMass, { x: 0, y: 0, z: 0 },
        { x: P.wheelMass * P.wheelK * P.wheelK, y: P.wheelMass * 1.0, z: P.wheelMass * 1.0 },
        qIdent(),
      ),
  );
  world.createImpulseJoint(
    RAPIER.JointData.revolute({ x: o.x, y: o.y, z: o.z }, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }),
    ground, wheel, true,
  );

  // ---- 受水壶几何（受水位、斗轴为原点）----
  const oh = dir(Math.PI / 2 + P.gamma); // 斗口方向
  const ch = dir(P.gamma); // 斗宽方向
  const D = add(P.ob, mul(ch, -P.wb / 2));
  const C = add(P.ob, mul(ch, P.wb / 2));
  const B = add(add(P.ob, mul(oh, P.h)), mul(ch, P.wt / 2));
  const A = add(add(P.ob, mul(oh, P.h)), mul(ch, -P.wt / 2));
  const stationPoly: P2[] = [D, C, B, A];
  const xhat: P2 = [Math.sin(P.thetaF), -Math.cos(P.thetaF)]; // 前进（顺时针）切向
  const pinL = mul(xhat, P.pinS);

  // ---- 锁销：使"0 号斗正处受水位"时，有一枚锁销恰好贴住天关挡面 ----
  const lockFaceU = P.lockU;
  const pinCu = lockFaceU - P.lockPinR - 0.0005;
  const lockPinAngle0 = Math.acos(pinCu / P.RLK); // 约 90°+

  const wheelPinColliders: number[] = [];
  for (let j = 0; j < P.N; j++) {
    const a = lockPinAngle0 + j * P.pitch;
    const [u, v] = mul(dir(a), P.RLK);
    const c = world.createCollider(
      pinDesc(P.lockPinR, u, v, P.lockPinW0, P.lockPinW1)
        .setDensity(0).setFriction(0.0).setRestitution(0)
        .setCollisionGroups(groups(G.WHEEL_PIN, G.LOCK))
        .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS),
      wheel,
    );
    wheelPinColliders.push(c.handle);
  }

  // ---- 36 只受水壶，各自以枢轴挂在一对辐条之间 ----
  const scoops: ScoopInfo[] = [];
  const scoopPinColliders: number[] = [];
  for (let k = 0; k < P.N; k++) {
    const delta = k * P.pitch;
    const pk = mul(dir(P.thetaF + delta), P.RP);
    const wpos = frame.toWorld(pk[0], pk[1], 0);
    const body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(wpos.x, wpos.y, wpos.z).setCanSleep(false).setAngularDamping(0.5),
    );
    const poly = stationPoly.map((p) => rot(p, delta));
    const lA = rot(A, delta), lB = rot(B, delta);
    const lPin = rot(pinL, delta);
    // 木斗自重（约 2.2 kg，质心在斗内偏下）。斗壁不设碰撞体：水滴是否落入斗中由斗口判定。
    const ownCom = rot(SCOOP_OWN.com, delta);
    body.setAdditionalMassProperties(SCOOP_OWN.mass, PlaneFrame.local(ownCom[0], ownCom[1], 0),
      { x: SCOOP_OWN.inertia, y: SCOOP_OWN.inertia, z: SCOOP_OWN.inertia }, qIdent(), true);
    // 拨销（伸出前侧辐条之外，与格叉接触）
    const pc = world.createCollider(
      pinDesc(P.pinR, lPin[0], lPin[1], P.pinW0, P.pinW1)
        .setDensity(0).setFriction(0.02).setRestitution(0)
        .setCollisionGroups(groups(G.SCOOP_PIN, G.FORK)),
      body,
    );
    scoopPinColliders.push(pc.handle);
    // 斗轴：两刚体创建时姿态相同 -> 关节角从 0 起算
    const j = revolute(world, wheel, body, PlaneFrame.local(pk[0], pk[1], 0), { x: 0, y: 0, z: 0 }, undefined, [-P.lambda, P.mu]);
    j.setContactsEnabled(false);
    scoops.push({ body, pin: pc, pinShape: pc.shape, index: k, delta, poly, lipA: lA, lipB: lB, pinLocal: lPin, ownCom });
  }

  // ------------------------------------------------------------ 格叉 / 枢衡
  const L0 = add(mul(dir(P.thetaF), P.RP), pinL); // 受水位拨销中心（轮坐标）
  const phiL = Math.atan2(L0[1], L0[0]);
  const rhat = dir(phiL);
  const that: P2 = [Math.sin(phiL), -Math.cos(phiL)]; // 前进切向
  const s0 = add(L0, mul(rhat, -(P.pinR + 0.001))); // 承托面上的接触点
  const shelf = { s0, t: that, n: rhat, lead: P.shelfLead, trail: P.shelfTrail, ramp: P.rampLen, rampDepth: P.pinS * Math.sin(P.lambda) + 0.012 };
  const Q = P.Q;
  const fork = world.createRigidBody(
    (() => { const w = frame.toWorld(Q[0], Q[1], 0); return RAPIER.RigidBodyDesc.dynamic().setTranslation(w.x, w.y, w.z); })()
      .setCanSleep(false).setAngularDamping(P.forkDamping),
  );
  const toQ = (p: P2): P2 => [p[0] - Q[0], p[1] - Q[1]];
  const forkColliders: number[] = [];
  {
    const thick = 0.03;
    const ang = Math.atan2(that[1], that[0]);
    // 承托面（沿切向的平板，上表面过 s0）
    const mid = add(s0, mul(that, (shelf.lead - shelf.trail) / 2));
    const cpos = toQ(add(mid, mul(rhat, -thick / 2)));
    const c1 = world.createCollider(
      boxDesc((shelf.lead + shelf.trail) / 2, thick / 2, 0.05, cpos[0], cpos[1], P.forkW, ang)
        .setDensity(0).setFriction(0.02).setRestitution(0).setCollisionGroups(groups(G.FORK, G.SCOOP_PIN)),
      fork,
    );
    forkColliders.push(c1.handle);
    // 入口斜坡：从承托面后端向内下斜
    const rStart = add(s0, mul(that, -shelf.trail));
    const rEnd = add(add(rStart, mul(that, -shelf.ramp)), mul(rhat, -shelf.rampDepth));
    const rAng = Math.atan2(rStart[1] - rEnd[1], rStart[0] - rEnd[0]);
    const rLen = Math.hypot(rStart[0] - rEnd[0], rStart[1] - rEnd[1]);
    const rMid = mul(add(rStart, rEnd), 0.5);
    const rN: P2 = [-Math.sin(rAng), Math.cos(rAng)];
    const rc = toQ(add(rMid, mul(rN, -thick / 2)));
    const c2 = world.createCollider(
      boxDesc(rLen / 2 + 0.01, thick / 2, 0.05, rc[0], rc[1], P.forkW, rAng)
        .setDensity(0).setFriction(0.02).setRestitution(0).setCollisionGroups(groups(G.FORK, G.SCOOP_PIN)),
      fork,
    );
    forkColliders.push(c2.handle);
  }
  const forkTipLocal = toQ(s0);
  const chainU = ESC.U[0] + P.upperArmR - Q[0];
  const forkChainLocal: P2 = [chainU, forkTipLocal[1] * (chainU / forkTipLocal[0])];
  const forkWeightLocal: P2 = [P.forkWeightArm, 0];
  {
    // 质量：臂 + 枢权
    const mArm = P.forkArmMass, mW = P.forkWeight;
    const armC = mul(forkTipLocal, 0.5);
    const m = mArm + mW;
    const cu = (armC[0] * mArm + forkWeightLocal[0] * mW) / m;
    const cv = (armC[1] * mArm + forkWeightLocal[1] * mW) / m;
    const Lf = Math.hypot(forkTipLocal[0], forkTipLocal[1]);
    const I = mArm * Lf * Lf / 12 + mArm * ((armC[0] - cu) ** 2 + (armC[1] - cv) ** 2)
      + mW * ((forkWeightLocal[0] - cu) ** 2 + (forkWeightLocal[1] - cv) ** 2) + 0.05;
    fork.setAdditionalMassProperties(m, PlaneFrame.local(cu, cv, P.forkW), { x: I, y: I, z: I }, qIdent(), true);
  }
  {
    const w = frame.toWorld(Q[0], Q[1], 0);
    revolute(world, ground, fork, w, { x: 0, y: 0, z: 0 }, undefined, [0, P.forkMax]);
  }

  // ------------------------------------------------------------ 天关（竖向滑动的闸）
  const lockWidth = 0.05;
  const lockBottomV = Math.sqrt(P.RLK * P.RLK - pinCu * pinCu) + P.lockPinR - P.lockOverlap;
  const lockOrigin: P2 = [lockFaceU + lockWidth / 2, lockBottomV];
  const lockTopV = ESC.U[1] - 0.14;
  const lock = world.createRigidBody(
    (() => { const w = frame.toWorld(lockOrigin[0], lockOrigin[1], 0); return RAPIER.RigidBodyDesc.dynamic().setTranslation(w.x, w.y, w.z); })()
      .setCanSleep(false).setLinearDamping(P.lockDamping),
  );
  const lockColliders: number[] = [];
  {
    const hgt = 0.12;
    const c = world.createCollider(
      boxDesc(lockWidth / 2, hgt / 2, 0.075, 0, hgt / 2, P.lockW)
        .setDensity(0).setFriction(0).setRestitution(0)
        .setCollisionGroups(groups(G.LOCK, G.WHEEL_PIN))
        .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS),
      lock,
    );
    lockColliders.push(c.handle);
    const len = lockTopV - lockBottomV;
    lock.setAdditionalMassProperties(P.lockMass, PlaneFrame.local(0, len * 0.5, P.lockW), { x: 0.2, y: 0.05, z: 0.2 }, qIdent(), true);
    const w = frame.toWorld(lockOrigin[0], lockOrigin[1], 0);
    const jd = RAPIER.JointData.prismatic({ x: w.x, y: w.y, z: w.z }, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 });
    jd.limitsEnabled = true;
    jd.limits = [0, P.lockMaxLift];
    world.createImpulseJoint(jd, ground, lock, true);
  }

  // ------------------------------------------------------------ 天衡（上杠杆）
  const U = ESC.U;
  const upper = world.createRigidBody(
    (() => { const w = frame.toWorld(U[0], U[1], 0); return RAPIER.RigidBodyDesc.dynamic().setTranslation(w.x, w.y, w.z); })()
      .setCanSleep(false).setAngularDamping(P.upperDamping),
  );
  const upperLockLocal: P2 = [lockOrigin[0] - U[0], 0];
  const upperChainLocal: P2 = [P.upperArmR, 0];
  const upperWeightLocal: P2 = [P.upperArmR, -0.06];
  {
    const m = P.upperMass + P.upperWeightR;
    const len = P.upperArmR - upperLockLocal[0];
    const beamC = (P.upperArmR + upperLockLocal[0]) / 2;
    const cu = (beamC * P.upperMass + upperWeightLocal[0] * P.upperWeightR) / m;
    const I = P.upperMass * len * len / 12 + P.upperMass * (beamC - cu) ** 2 + P.upperWeightR * (upperWeightLocal[0] - cu) ** 2 + 0.02;
    upper.setAdditionalMassProperties(m, PlaneFrame.local(cu, 0, P.lockW), { x: I, y: I, z: I }, qIdent(), true);
    const w = frame.toWorld(U[0], U[1], 0);
    // 静止时天衡略偏锁侧，靠在限位上；天条一拉，锁侧抬起
    revolute(world, ground, upper, w, { x: 0, y: 0, z: 0 }, undefined, [P.upperMin, 0]);
  }

  // ---- 天关吊绳：天衡左端 -> 天关顶部 ----
  const lockTopLocal = PlaneFrame.local(0, lockTopV - lockBottomV, P.lockW);
  const lockRopeLen = (U[1] - lockTopV) + 0.002;
  world.createImpulseJoint(
    RAPIER.JointData.rope(lockRopeLen, PlaneFrame.local(upperLockLocal[0], 0, P.lockW), lockTopLocal),
    upper, lock, true,
  );
  // ---- 天条：天衡右端 -> 枢衡上的挂点 ----
  const upperChainWorld = add(U, upperChainLocal);
  const forkChainWorld = add(Q, forkChainLocal);
  const chainLen = Math.hypot(upperChainWorld[0] - forkChainWorld[0], upperChainWorld[1] - forkChainWorld[1]) + 0.001;
  world.createImpulseJoint(
    RAPIER.JointData.rope(chainLen, PlaneFrame.local(upperChainLocal[0], upperChainLocal[1], P.lockW), PlaneFrame.local(forkChainLocal[0], forkChainLocal[1], P.forkW)),
    upper, fork, true,
  );

  // ------------------------------------------------------------ 左右天锁（棘爪）
  const pawls: Body[] = [];
  const pawlColliders: number[] = [];
  const pawlGeo: { pivot: P2; tip: P2 }[] = [];
  for (const pa of P.pawlAngles) {
    // 爪尖位于锁销圆外侧、两销之间；枢轴在其"来销"一侧（左侧）上方
    const tipC = mul(dir(pa - P.pitch / 2), P.RLK + 0.0);
    const tdir: P2 = [Math.sin(pa - P.pitch / 2), -Math.cos(pa - P.pitch / 2)]; // 前进切向
    const pivot = add(add(tipC, mul(tdir, -0.26)), mul(dir(pa - P.pitch / 2), 0.1));
    const pw = frame.toWorld(pivot[0], pivot[1], 0);
    const pawl = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(pw.x, pw.y, pw.z).setCanSleep(false).setAngularDamping(2.0),
    );
    const tipL: P2 = [tipC[0] - pivot[0], tipC[1] - pivot[1]];
    // 爪尖：一块楔形（来销一侧为斜面，背面为直面）
    const back = add(tipL, mul(tdir, 0.012));
    const front = add(tipL, mul(tdir, -0.045));
    const up = mul(dir(pa - P.pitch / 2), 0.05);
    const tri: P2[] = [
      add(back, mul(dir(pa - P.pitch / 2), -0.012)),
      add(back, up),
      add(front, up),
    ];
    const pts: number[] = [];
    for (const p of tri) for (const dw of [P.lockW - 0.05, P.lockW + 0.05]) { const q = PlaneFrame.local(p[0], p[1], dw); pts.push(q.x, q.y, q.z); }
    const cd = RAPIER.ColliderDesc.convexHull(new Float32Array(pts))!;
    const c = world.createCollider(
      cd.setDensity(0).setFriction(0).setRestitution(0)
        .setCollisionGroups(groups(G.LOCK, G.WHEEL_PIN))
        .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS),
      pawl,
    );
    pawlColliders.push(c.handle);
    pawl.setAdditionalMassProperties(0.6, PlaneFrame.local(tipL[0] * 0.7, tipL[1] * 0.7, P.lockW), { x: 0.02, y: 0.02, z: 0.02 }, qIdent(), true);
    revolute(world, ground, pawl, pw, { x: 0, y: 0, z: 0 }, undefined, [-3 * DEG, 14 * DEG]);
    pawls.push(pawl);
    pawlGeo.push({ pivot, tip: tipC });
  }

  // 出水口：受水位斗口正上方
  const mouth = add(add(mul(dir(P.thetaF), P.RP), P.ob), mul(oh, P.h));
  const spout: P2 = [mouth[0] + 0.01, mouth[1] + 0.3];

  return {
    frame, ground, wheel, scoops, fork, upper, lock, pawls,
    geo: {
      stationPoly, lipA: A, lipB: B, pinL,
      shelf,
      forkTipLocal, forkChainLocal, forkWeightLocal,
      upperLockLocal, upperChainLocal, upperWeightLocal,
      lockTop: [lockOrigin[0], lockTopV], lockBottom: [lockOrigin[0], lockBottomV], lockOrigin, lockWidth,
      lockPinAngle0,
      pawls: pawlGeo,
      spout,
      chainLen, lockRopeLen,
    },
    lockColliders, pawlColliders, wheelPinColliders, scoopPinColliders, forkColliders,
  };
}

/** 枢轮转角（平面内，逆时针为正） */
export function wheelAngle(esc: Escapement): number {
  return PlaneFrame.angleOf(esc.wheel.rotation());
}

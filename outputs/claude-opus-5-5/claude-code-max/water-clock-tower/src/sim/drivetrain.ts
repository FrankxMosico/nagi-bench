// 传动与报时：枢轴地毂（冠齿）→ 天柱（灯笼齿）→ 机轮（销轮）→ 拨牙 → 木人击鼓、扣钟。
// 全部是带碰撞体的刚体，靠齿与齿、拨牙与杠杆的接触传递运动。
import {
  RAPIER, G, groups, DEG, qAxis, qIdent, revolute,
  type Body, type World, type Vec3, type Quat,
} from './core';
import { ESC, type Escapement } from './escapement';

export const DRV = {
  // 地毂：枢轴左端的冠齿，销钉沿 -X 伸出
  crownX: 0.7, // 冠齿盘面（世界 x）
  crownPinLen: 0.13,
  crownR: 0.6,
  crownPins: 36,
  crownPinR: 0.022,
  // 天柱
  tz: { x: 0.34, z: 0.2 },
  tzY0: 0.3,
  tzY1: 9.0,
  lanternR: 0.3,
  lanternStaves: 18,
  staveR: 0.026,
  tzLowY: 0.55, // 天柱下轮（与机轮啮合）
  tzLowR: 0.4,
  tzLowStaves: 12,
  // 机轮
  jl: { x: -0.51, z: 1.05 },
  jlY0: 0.35,
  jlY1: 5.25,
  jlGearR0: 0.62,
  jlGearR1: 0.88,
  jlGearPins: 24,
  jlPinR: 0.046,
  disc1Y: 4.85, // 拨牙盘
  disc1R: 0.56,
  drumRingR: 0.53,
  bellRingR: 0.42,
  pegH: 0.08,
  pegR: 0.016,
  drumPegs: 18,
  drumPeg0: 13.93 * DEG, // 机轮每步转 10°：鼓牙每 20° 一枚 -> 每两步击鼓一次（相位使拨杆在步进中途被放开）
  bellPegs: 6,
  bellPeg0: 46.3 * DEG, // 钟牙每 60° 一枚 -> 每六步扣钟一次
  disc2Y: 3.85, // 司辰木人盘
  disc2R: 0.5,
  figures: 12,
  armZ: 2.22, // 木人手臂所在平面（木阁立面之前）
  facadeZ: 2.0,
};

export interface LeverSpec {
  kind: 'drum' | 'bell';
  pivot: [number, number]; // 世界 XY，转轴沿 Z
  tailZ: number;
  tailEndX: number; // 尾杆末端（世界 x）
  ramp: [number, number]; // 斜坡的世界 x 区间；底面沿 +X 逐渐降低
  rise: number;
  head: [number, number]; // 静止时槌头（世界 XY）
  headR: number;
  com: [number, number];
  mass: number;
  limits: [number, number];
}

export interface Lever {
  spec: LeverSpec;
  body: Body;
  origin: Vec3;
  tailCollider: RAPIER.Collider;
}

export interface DriveTrain {
  tianzhu: Body;
  jilun: Body;
  levers: Lever[];
  bell: Body;
  crownCollider: RAPIER.Collider;
  refresh: number[];
  drumPegAngles: number[];
  bellPegAngles: number[];
  drumTop: Vec3;
  bellPivot: Vec3;
  tzOrigin: Vec3;
  jlOrigin: Vec3;
}

/** 把 Rapier 胶囊的 +Y 轴转到方向 d */
function capsuleAlong(d: Vec3): Quat {
  const c = d.y;
  if (c > 0.99999) return qIdent();
  if (c < -0.99999) return qAxis(1, 0, 0, Math.PI);
  const ax = { x: d.z, y: 0, z: -d.x }; // (0,1,0) × d
  const l = Math.hypot(ax.x, ax.z);
  return qAxis(ax.x / l, 0, ax.z / l, Math.acos(c));
}

export const LEVERS: LeverSpec[] = [
  {
    // 击鼓木人：站在左侧，右臂持槌，鼓立在其右前方
    kind: 'drum',
    pivot: [-0.93, 5.05],
    tailZ: DRV.jl.z + DRV.drumRingR,
    tailEndX: -0.47,
    ramp: [-0.53, -0.485],
    rise: 0.05,
    head: [-0.52, 4.95],
    headR: 0.045,
    com: [-0.7, 5.0],
    mass: 2.2,
    limits: [-8 * DEG, 25 * DEG],
  },
  {
    // 扣钟木人：站在右侧，槌垂于身前，拨牙把它拉向左，松开后摆回敲钟
    kind: 'bell',
    pivot: [-0.15, 5.05],
    tailZ: DRV.jl.z + DRV.bellRingR,
    tailEndX: -0.57,
    ramp: [-0.475, -0.43],
    rise: 0.035,
    head: [-0.15, 4.66],
    headR: 0.04,
    com: [-0.152, 4.78],
    mass: 2.4,
    limits: [-28 * DEG, 6 * DEG],
  },
];

export function buildDriveTrain(world: World, ground: Body, esc: Escapement): DriveTrain {
  const D = DRV;
  const o = ESC.origin;
  const refresh: number[] = [];
  const gearCollider = (shapes: RAPIER.Shape[], pos: Vec3[], rots: Quat[], g: number, body: Body) => {
    const c = world.createCollider(
      RAPIER.ColliderDesc.compound(shapes, pos, rots).setDensity(0).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(groups(g, g)),
      body,
    );
    refresh.push(c.handle);
    return c;
  };

  // ------------------------------------------------ 地毂冠齿（固定在枢轮刚体上）
  let crownCollider: RAPIER.Collider;
  {
    const shapes: RAPIER.Shape[] = [], pos: Vec3[] = [], rots: Quat[] = [];
    const wMid = D.crownX - D.crownPinLen / 2 - o.x;
    for (let j = 0; j < D.crownPins; j++) {
      const a = -Math.PI / 2 + j * (2 * Math.PI / D.crownPins);
      const u = D.crownR * Math.cos(a), v = D.crownR * Math.sin(a);
      shapes.push(new RAPIER.Capsule(D.crownPinLen / 2 - D.crownPinR, D.crownPinR));
      pos.push({ x: wMid, y: v, z: -u });
      rots.push(qAxis(0, 0, 1, -Math.PI / 2));
    }
    crownCollider = gearCollider(shapes, pos, rots, G.GEAR_A, esc.wheel);
  }

  // ------------------------------------------------ 天柱
  const tzOrigin = { x: D.tz.x, y: o.y - D.crownR, z: D.tz.z }; // 原点在上灯笼齿中心
  const tianzhu = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation(tzOrigin.x, tzOrigin.y, tzOrigin.z)
      .setCanSleep(false).setAngularDamping(3),
  );
  {
    // 上灯笼齿：18 根竖杆，与冠齿销钉啮合（直角传动）
    const shapes: RAPIER.Shape[] = [], pos: Vec3[] = [], rots: Quat[] = [];
    for (let i = 0; i < D.lanternStaves; i++) {
      const a = (i + 0.5) * (2 * Math.PI / D.lanternStaves);
      shapes.push(new RAPIER.Capsule(0.11, D.staveR));
      pos.push({ x: D.lanternR * Math.cos(a), y: 0, z: D.lanternR * Math.sin(a) });
      rots.push(qIdent());
    }
    gearCollider(shapes, pos, rots, G.GEAR_A, tianzhu);
    // 下灯笼齿：12 根竖杆（与机轮销轮啮合）
    const s2: RAPIER.Shape[] = [], p2: Vec3[] = [], r2: Quat[] = [];
    const yl = D.tzLowY - tzOrigin.y;
    for (let i = 0; i < D.tzLowStaves; i++) {
      const a = i * (2 * Math.PI / D.tzLowStaves);
      s2.push(new RAPIER.Capsule(0.07, 0.046));
      p2.push({ x: D.tzLowR * Math.cos(a), y: yl, z: D.tzLowR * Math.sin(a) });
      r2.push(qIdent());
    }
    gearCollider(s2, p2, r2, G.GEAR_B, tianzhu);
    const m = 60;
    const midY = (D.tzY0 + D.tzY1) / 2 - tzOrigin.y;
    tianzhu.setAdditionalMassProperties(m, { x: 0, y: midY, z: 0 }, { x: 400, y: 4.0, z: 400 }, qIdent(), true);
    revolute(world, ground, tianzhu, tzOrigin, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 });
  }

  // ------------------------------------------------ 机轮（昼夜机轮）
  const jlOrigin = { x: D.jl.x, y: D.tzLowY, z: D.jl.z }; // 原点在销轮中心
  const jilun = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation(jlOrigin.x, jlOrigin.y, jlOrigin.z)
      .setCanSleep(false).setAngularDamping(4),
  );
  const drumPegAngles: number[] = [];
  const bellPegAngles: number[] = [];
  {
    // 销轮：24 根径向销
    const shapes: RAPIER.Shape[] = [], pos: Vec3[] = [], rots: Quat[] = [];
    const rm = (D.jlGearR0 + D.jlGearR1) / 2;
    for (let i = 0; i < D.jlGearPins; i++) {
      const a = i * (2 * Math.PI / D.jlGearPins); // 有一根销正对天柱下灯笼齿的齿隙
      const d = { x: Math.cos(a), y: 0, z: Math.sin(a) };
      shapes.push(new RAPIER.Capsule((D.jlGearR1 - D.jlGearR0) / 2 - D.jlPinR, D.jlPinR));
      pos.push({ x: rm * d.x, y: 0, z: rm * d.z });
      rots.push(capsuleAlong(d));
    }
    gearCollider(shapes, pos, rots, G.GEAR_B, jilun);
    // 拨牙盘上的两圈拨牙（竖直短销）：外圈击鼓，内圈扣钟
    const ps: RAPIER.Shape[] = [], pp: Vec3[] = [], pr: Quat[] = [];
    const y1 = D.disc1Y - jlOrigin.y + D.pegH / 2;
    for (let i = 0; i < D.drumPegs; i++) {
      const a = D.drumPeg0 + i * (2 * Math.PI / D.drumPegs);
      drumPegAngles.push(a);
      ps.push(new RAPIER.Capsule(D.pegH / 2 - D.pegR, D.pegR));
      pp.push({ x: D.drumRingR * Math.cos(a), y: y1, z: D.drumRingR * Math.sin(a) });
      pr.push(qIdent());
    }
    for (let i = 0; i < D.bellPegs; i++) {
      const a = D.bellPeg0 + i * (2 * Math.PI / D.bellPegs);
      bellPegAngles.push(a);
      ps.push(new RAPIER.Capsule(D.pegH / 2 - D.pegR, D.pegR));
      pp.push({ x: D.bellRingR * Math.cos(a), y: y1, z: D.bellRingR * Math.sin(a) });
      pr.push(qIdent());
    }
    gearCollider(ps, pp, pr, G.TRIP, jilun);
    const m = 45;
    jilun.setAdditionalMassProperties(m, { x: 0, y: 2.2, z: 0 }, { x: 150, y: 9.0, z: 150 }, qIdent(), true);
    revolute(world, ground, jilun, jlOrigin, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 });
  }

  // ------------------------------------------------ 木人杠杆（绕 Z 轴，前后贯穿木阁立面）
  const levers: Lever[] = [];
  for (const s of LEVERS) {
    const origin = { x: s.pivot[0], y: s.pivot[1], z: (s.tailZ + D.armZ) / 2 };
    const body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(origin.x, origin.y, origin.z).setCanSleep(false).setAngularDamping(0.25),
    );
    const L = (x: number, y: number) => [x - origin.x, y - origin.y] as const;
    // 尾部斜坡：底面左高右低（拨牙沿 +X 走来，从下方把它顶起）
    const pegTop = D.disc1Y + D.pegH;
    const [xa, ya] = L(s.ramp[0], pegTop + 0.02);
    const [xb, yb] = L(s.ramp[1], pegTop - s.rise);
    const ang = Math.atan2(yb - ya, xb - xa);
    const len = Math.hypot(xb - xa, yb - ya);
    const th = 0.03;
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    const tail = world.createCollider(
      RAPIER.ColliderDesc.cuboid(len / 2 + 0.005, th / 2, 0.035)
        .setTranslation((xa + xb) / 2 + nx * th / 2, (ya + yb) / 2 + ny * th / 2, s.tailZ - origin.z)
        .setRotation(qAxis(0, 0, 1, ang))
        .setDensity(0).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(groups(G.TRIP, G.TRIP)),
      body,
    );
    refresh.push(tail.handle);
    // 槌头
    const [hx, hy] = L(s.head[0], s.head[1]);
    world.createCollider(
      RAPIER.ColliderDesc.ball(s.headR).setTranslation(hx, hy, D.armZ - origin.z)
        .setDensity(0).setFriction(0.3).setRestitution(0.2)
        .setCollisionGroups(groups(G.STRIKE, G.STRIKE)),
      body,
    );
    const [cx, cy] = L(s.com[0], s.com[1]);
    body.setAdditionalMassProperties(s.mass, { x: cx, y: cy, z: (D.armZ - origin.z) * 0.5 }, { x: 0.1, y: 0.1, z: 0.1 }, qIdent(), true);
    revolute(world, ground, body, origin, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }, s.limits);
    levers.push({ spec: s, body, origin, tailCollider: tail });
  }

  // ---- 鼓：立在木阁前，鼓面朝上 ----
  const ds = LEVERS[0];
  const drumTop = { x: ds.head[0], y: ds.head[1] - ds.headR - 0.002, z: D.armZ };
  world.createCollider(
    RAPIER.ColliderDesc.cylinder(0.06, 0.13).setTranslation(drumTop.x, drumTop.y - 0.06, drumTop.z)
      .setFriction(0.3).setRestitution(0.2).setCollisionGroups(groups(G.STRIKE, G.STRIKE)),
    ground,
  );
  // ---- 钟：悬挂，可摆动，被槌从左侧敲响 ----
  const bs = LEVERS[1];
  const bellR = 0.1;
  const bellPivot = { x: bs.head[0] + bs.headR + bellR + 0.003, y: bs.head[1] + 0.24, z: D.armZ };
  const bell = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation(bellPivot.x, bellPivot.y, bellPivot.z).setCanSleep(false).setAngularDamping(2),
  );
  world.createCollider(
    RAPIER.ColliderDesc.cylinder(0.09, bellR).setTranslation(0, -0.24, 0)
      .setDensity(2500).setFriction(0.3).setRestitution(0.3).setCollisionGroups(groups(G.STRIKE, G.STRIKE)),
    bell,
  );
  revolute(world, ground, bell, bellPivot, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }, [-25 * DEG, 25 * DEG]);

  return {
    tianzhu, jilun, levers, bell, crownCollider, refresh,
    drumPegAngles, bellPegAngles, drumTop, bellPivot, tzOrigin, jlOrigin,
  };
}

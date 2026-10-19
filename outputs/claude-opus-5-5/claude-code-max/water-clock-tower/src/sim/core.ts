// 物理层公共工具：碰撞分组、四元数、"枢轮平面"坐标系。
import RAPIER from '@dimforge/rapier3d-compat';

export { RAPIER };
export type World = RAPIER.World;
export type Body = RAPIER.RigidBody;

export const DEG = Math.PI / 180;

// ---- 碰撞分组：membership 在高 16 位，filter 在低 16 位 ----
export const G = {
  STATIC: 1 << 0,
  WHEEL_PIN: 1 << 1, // 枢轮外缘的锁销（与天关、天锁接触）
  SCOOP: 1 << 2, // 水斗壁（只与水滴接触）
  SCOOP_PIN: 1 << 3, // 水斗上的拨销（与格叉接触）
  FORK: 1 << 4, // 格叉
  LOCK: 1 << 5, // 天关、左右天锁
  WATER: 1 << 6,
  GEAR_A: 1 << 7, // 地毂冠齿 ↔ 天柱下轮
  GEAR_B: 1 << 8, // 天柱 ↔ 机轮
  GEAR_C: 1 << 9, // 天柱 ↔ 浑象
  GEAR_D: 1 << 10, // 天梯 ↔ 浑仪
  TRIP: 1 << 11, // 机轮拨牙 ↔ 木人杠杆
  STRIKE: 1 << 12, // 木人鼓槌/钟锤 ↔ 鼓/钟
  CHAIN: 1 << 13, // 天梯链节 ↔ 链轮
  NONE: 1 << 15,
} as const;

export function groups(member: number, filter: number): number {
  return ((member & 0xffff) << 16) | (filter & 0xffff);
}

export interface Vec3 { x: number; y: number; z: number }
export interface Quat { x: number; y: number; z: number; w: number }

export function qAxis(ax: number, ay: number, az: number, a: number): Quat {
  const s = Math.sin(a / 2);
  return { x: ax * s, y: ay * s, z: az * s, w: Math.cos(a / 2) };
}
export const qIdent = (): Quat => ({ x: 0, y: 0, z: 0, w: 1 });
export function qMul(a: Quat, b: Quat): Quat {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}
export function qRot(q: Quat, v: Vec3): Vec3 {
  // v' = q v q*
  const { x, y, z, w } = q;
  const ix = w * v.x + y * v.z - z * v.y;
  const iy = w * v.y + z * v.x - x * v.z;
  const iz = w * v.z + x * v.y - y * v.x;
  const iw = -x * v.x - y * v.y - z * v.z;
  return {
    x: ix * w + iw * -x + iy * -z - iz * -y,
    y: iy * w + iw * -y + iz * -x - ix * -z,
    z: iz * w + iw * -z + ix * -y - iy * -x,
  };
}
export function qConj(q: Quat): Quat {
  return { x: -q.x, y: -q.y, z: -q.z, w: q.w };
}

/**
 * 枢轮平面坐标系 (u, v, w)：
 *   u = 从 +X 方向看去的"屏幕右" = 世界 -Z
 *   v = 世界 +Y
 *   w = 枢轮轴向 = 世界 +X（朝向擒纵机构所在一侧）
 * 在 (u,v) 平面内逆时针转 a  ==  绕世界 +X 轴转 a。
 */
export class PlaneFrame {
  constructor(public origin: Vec3) {}
  /** 设计坐标 -> 世界坐标 */
  toWorld(u: number, v: number, w = 0): Vec3 {
    return { x: this.origin.x + w, y: this.origin.y + v, z: this.origin.z - u };
  }
  /** 设计坐标中的相对向量 -> 刚体局部(Rapier)向量 */
  static local(u: number, v: number, w = 0): Vec3 {
    return { x: w, y: v, z: -u };
  }
  /** 平面内转角 a（逆时针）对应的四元数 */
  static q(a: number): Quat {
    return qAxis(1, 0, 0, a);
  }
  /** 从刚体四元数取出平面转角（假设只绕 X 轴转动） */
  static angleOf(q: Quat): number {
    return 2 * Math.atan2(q.x, q.w);
  }
}

/** 平面内的长方体碰撞体：hu/hv/hw 为设计坐标半尺寸，(u,v,w) 为中心，beta 为平面内转角 */
export function boxDesc(hu: number, hv: number, hw: number, u: number, v: number, w: number, beta = 0) {
  const p = PlaneFrame.local(u, v, w);
  return RAPIER.ColliderDesc.cuboid(hw, hv, hu).setTranslation(p.x, p.y, p.z).setRotation(PlaneFrame.q(beta));
}

/** 沿轴向 w 的销子（胶囊体） */
export function pinDesc(radius: number, u: number, v: number, w0: number, w1: number) {
  const half = Math.max(0.001, (w1 - w0) / 2 - radius);
  const p = PlaneFrame.local(u, v, (w0 + w1) / 2);
  return RAPIER.ColliderDesc.capsule(half, radius).setTranslation(p.x, p.y, p.z).setRotation(qAxis(0, 0, 1, -Math.PI / 2));
}

/** 平面内一段胶囊体，从 (u0,v0) 到 (u1,v1)，位于轴向 w */
export function segDesc(radius: number, u0: number, v0: number, u1: number, v1: number, w: number) {
  const du = u1 - u0, dv = v1 - v0;
  const len = Math.hypot(du, dv);
  const half = Math.max(0.001, len / 2);
  const ang = Math.atan2(dv, du); // 段的方向角
  const p = PlaneFrame.local((u0 + u1) / 2, (v0 + v1) / 2, w);
  // Rapier 胶囊沿局部 Y；Y 在 (u,v) 平面里是 v 方向（角 90°），需要转 ang-90°
  return RAPIER.ColliderDesc.capsule(half, radius).setTranslation(p.x, p.y, p.z).setRotation(PlaneFrame.q(ang - Math.PI / 2));
}

/**
 * 绕给定轴的转动副。两刚体在创建时姿态需一致，关节角从 0 起算。
 * 注意：Rapier 的 revolute 限位必须在创建后通过 setLimits 设置。
 */
export function revolute(
  world: World, b1: Body, b2: Body, anchor1: Vec3, anchor2: Vec3,
  axis: Vec3 = { x: 1, y: 0, z: 0 }, limits?: [number, number],
): RAPIER.RevoluteImpulseJoint {
  const j = world.createImpulseJoint(RAPIER.JointData.revolute(anchor1, anchor2, axis), b1, b2, true) as RAPIER.RevoluteImpulseJoint;
  if (limits) j.setLimits(limits[0], limits[1]);
  return j;
}

/** 确定性伪随机（整型运算，跨引擎一致） */
export class Rng {
  private s: number;
  constructor(seed = 12345) { this.s = seed >>> 0; }
  next(): number {
    // mulberry32
    let t = (this.s = (this.s + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  range(a: number, b: number) { return a + (b - a) * this.next(); }
}

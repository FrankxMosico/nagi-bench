// 浑象（中层天球）与浑仪三辰仪（顶层环组）的驱动：
// 天柱上的灯笼齿 → 横轴冠齿（直角）→ 横轴另一端的灯笼齿 → 赤道环上的冠销。
// 极轴按开封纬度（约 35°）向北上方倾斜，转向与天穹东升西落一致。
import { RAPIER, G, groups, DEG, qAxis, qIdent, revolute, type Body, type World, type Vec3, type Quat } from './core';
import { DRV } from './drivetrain';

export const LAT = 35 * DEG;
/** 极轴：指向北天极（北 = -Z，上 = +Y） */
export const POLAR: Vec3 = { x: 0, y: Math.sin(LAT), z: -Math.cos(LAT) };
const E_UP: Vec3 = { x: 0, y: Math.cos(LAT), z: Math.sin(LAT) }; // X × POLAR

export interface InstrumentSpec {
  name: 'globe' | 'armillary';
  center: Vec3; // 球心
  ringR: number; // 赤道冠销环半径
  ringPins: number;
  lanternR: number;
  lanternStaves: number;
  mass: number;
  inertia: number;
  group: number;
}

export interface Instrument {
  spec: InstrumentSpec;
  body: Body;
  shaft: Body;
  shaftY: number;
  shaftZ: number;
  shaftX0: number;
  shaftX1: number;
  tzLanternY: number;
  lanternCenterX: number;
}

const add = (a: Vec3, b: Vec3, s = 1): Vec3 => ({ x: a.x + b.x * s, y: a.y + b.y * s, z: a.z + b.z * s });

/** 让胶囊（默认沿 +Y）沿方向 d */
function alongDir(d: Vec3): Quat {
  const c = d.y;
  if (c > 0.99999) return qIdent();
  if (c < -0.99999) return qAxis(1, 0, 0, Math.PI);
  const ax = { x: d.z, y: 0, z: -d.x };
  const l = Math.hypot(ax.x, ax.z) || 1;
  return qAxis(ax.x / l, 0, ax.z / l, Math.acos(c));
}

export function buildInstrument(world: World, ground: Body, tianzhu: Body, tzOrigin: Vec3, s: InstrumentSpec, refresh: number[]): Instrument {
  const C = s.center;
  const E = add(C, { x: s.ringR, y: 0, z: 0 }); // 赤道环最东点
  const pinMid = 0.06, pinLen = 0.12, pinR = 0.02;
  // 横轴（沿 X）穿过 E - (r_L - pinMid)·POLAR，这样灯笼齿杆恰在 pinMid 处与冠销相交
  const axisPt = add(E, POLAR, pinMid - s.lanternR);
  const shaftY = axisPt.y, shaftZ = axisPt.z;
  if (Math.abs(shaftZ - DRV.tz.z) > 1e-6) console.warn('instrument shaft z != 天柱 z', shaftZ);

  // ---------------- 仪器本体（绕极轴转动）
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation(C.x, C.y, C.z).setCanSleep(false).setAngularDamping(1.5),
  );
  {
    const shapes: RAPIER.Shape[] = [], pos: Vec3[] = [], rots: Quat[] = [];
    // 赤道平面的两个正交方向：X 与 E_UP
    for (let i = 0; i < s.ringPins; i++) {
      const a = i * (2 * Math.PI / s.ringPins); // 一枚冠销正在最东点，落在灯笼齿的齿隙里
      const radial = add({ x: Math.cos(a), y: 0, z: 0 }, E_UP, Math.sin(a));
      const base = { x: radial.x * s.ringR, y: radial.y * s.ringR, z: radial.z * s.ringR };
      shapes.push(new RAPIER.Capsule(pinLen / 2 - pinR, pinR));
      pos.push(add(base, POLAR, pinMid));
      rots.push(alongDir(POLAR));
    }
    const c = world.createCollider(
      RAPIER.ColliderDesc.compound(shapes, pos, rots).setDensity(0).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(groups(s.group, s.group)),
      body,
    );
    refresh.push(c.handle);
    body.setAdditionalMassProperties(s.mass, { x: 0, y: 0, z: 0 }, { x: s.inertia, y: s.inertia, z: s.inertia }, qIdent(), true);
    revolute(world, ground, body, C, { x: 0, y: 0, z: 0 }, POLAR);
  }

  // ---------------- 横轴：西端灯笼齿啮合赤道冠销，东端冠齿啮合天柱灯笼齿
  const crownX = 0.7, crownR = 0.3, crownPins = 18;
  const shaftX0 = E.x - 0.12, shaftX1 = crownX + 0.04;
  const shaft = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic().setTranslation((shaftX0 + shaftX1) / 2, shaftY, shaftZ).setCanSleep(false).setAngularDamping(2),
  );
  const sOrigin = { x: (shaftX0 + shaftX1) / 2, y: shaftY, z: shaftZ };
  const lanternCenterX = E.x + 0.04;
  {
    // 灯笼齿：杆沿 X，绕轴均布
    const shapes: RAPIER.Shape[] = [], pos: Vec3[] = [], rots: Quat[] = [];
    for (let i = 0; i < s.lanternStaves; i++) {
      // 让一个齿隙正对 +POLAR 方向（与冠销相位错开）
      const a = (i + 0.5) * (2 * Math.PI / s.lanternStaves);
      // 在 YZ 平面内，以 POLAR 为 0 角、E_UP 为 90°
      const dirv = add({ x: 0, y: POLAR.y * Math.cos(a), z: POLAR.z * Math.cos(a) }, E_UP, Math.sin(a));
      shapes.push(new RAPIER.Capsule(0.08, 0.022));
      pos.push({ x: lanternCenterX - 0.04 - sOrigin.x, y: dirv.y * s.lanternR, z: dirv.z * s.lanternR });
      rots.push(qAxis(0, 0, 1, -Math.PI / 2));
    }
    const c1 = world.createCollider(
      RAPIER.ColliderDesc.compound(shapes, pos, rots).setDensity(0).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(groups(s.group, s.group)),
      shaft,
    );
    refresh.push(c1.handle);
    // 冠齿：销沿 -X 伸出，在横轴"上方"与天柱灯笼齿啮合（使转向正确）
    const s2: RAPIER.Shape[] = [], p2: Vec3[] = [], r2: Quat[] = [];
    for (let j = 0; j < crownPins; j++) {
      const a = Math.PI / 2 + j * (2 * Math.PI / crownPins); // 一枚销正在最上方
      s2.push(new RAPIER.Capsule(0.065 - 0.022, 0.022));
      p2.push({ x: crownX - 0.065 - sOrigin.x, y: crownR * Math.sin(a), z: -crownR * Math.cos(a) });
      r2.push(qAxis(0, 0, 1, -Math.PI / 2));
    }
    const c2 = world.createCollider(
      RAPIER.ColliderDesc.compound(s2, p2, r2).setDensity(0).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(groups(G.GEAR_A, G.GEAR_A)),
      shaft,
    );
    refresh.push(c2.handle);
    shaft.setAdditionalMassProperties(6, { x: 0, y: 0, z: 0 }, { x: 0.15, y: 0.8, z: 0.8 }, qIdent(), true);
    revolute(world, ground, shaft, sOrigin, { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 });
  }

  // ---------------- 天柱上与之啮合的灯笼齿（在横轴冠齿正上方）
  const tzLanternY = shaftY + crownR;
  {
    const shapes: RAPIER.Shape[] = [], pos: Vec3[] = [], rots: Quat[] = [];
    for (let i = 0; i < DRV.lanternStaves; i++) {
      const a = (i + 0.5) * (2 * Math.PI / DRV.lanternStaves);
      shapes.push(new RAPIER.Capsule(0.09, DRV.staveR));
      pos.push({ x: DRV.lanternR * Math.cos(a), y: tzLanternY - tzOrigin.y, z: DRV.lanternR * Math.sin(a) });
      rots.push(qIdent());
    }
    const c = world.createCollider(
      RAPIER.ColliderDesc.compound(shapes, pos, rots).setDensity(0).setFriction(0.05).setRestitution(0)
        .setCollisionGroups(groups(G.GEAR_A, G.GEAR_A)),
      tianzhu,
    );
    refresh.push(c.handle);
  }

  return { spec: s, body, shaft, shaftY, shaftZ, shaftX0, shaftX1, tzLanternY, lanternCenterX };
}

/** 两件仪器的布置：浑象在中层，浑仪在顶层，均在天柱以西 */
export function instrumentSpecs(): InstrumentSpec[] {
  // 让横轴 z 恰好等于天柱 z：center.z = tz.z - (pinMid - r_L)·POLAR.z
  const zFor = (rL: number) => DRV.tz.z - (0.06 - rL) * POLAR.z;
  return [
    { name: 'globe', center: { x: -0.95, y: 7.2, z: zFor(0.26) }, ringR: 0.76, ringPins: 36, lanternR: 0.26, lanternStaves: 12, mass: 30, inertia: 3, group: G.GEAR_C },
    { name: 'armillary', center: { x: -0.95, y: 10.35, z: zFor(0.26) }, ringR: 0.86, ringPins: 40, lanternR: 0.26, lanternStaves: 12, mass: 25, inertia: 3.5, group: G.GEAR_D },
  ];
}

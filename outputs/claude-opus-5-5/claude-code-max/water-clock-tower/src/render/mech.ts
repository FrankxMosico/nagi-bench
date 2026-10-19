// 运动部件的网格：每个 Rapier 刚体对应一个 Group（局部坐标与刚体一致），
// 每帧只把刚体位姿（两步之间插值）赋给 Group，不手写任何动画。
import * as THREE from 'three';
import type { Sim } from '../sim/sim';
import { ESC } from '../sim/escapement';
import { DRV, LEVERS } from '../sim/drivetrain';
import { POLAR } from '../sim/instruments';
import type { P2 } from '../sim/poly';
import type { Palette } from './materials';
import { L, V, box, rod, beam, ring, torus, cyl, bake, mesh } from './geom';
import { placardTexture } from './textures';

const DEG = Math.PI / 180;
/** 设计空间 (u,v,w) -> 刚体局部 (w, v, -u) 的线性变换 */
const UVW = new THREE.Matrix4().set(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1);

export interface Bound { body: { translation(): { x: number; y: number; z: number }; rotation(): { x: number; y: number; z: number; w: number } }; obj: THREE.Object3D }

export interface MechView {
  root: THREE.Group;
  bound: Bound[];
  parts: Record<string, THREE.Object3D[]>; // 供高亮与标注使用
  anchors: Record<string, () => THREE.Vector3>; // 标注锚点（世界坐标，随刚体移动）
  waterMeshes: { mesh: THREE.Mesh; k: number }[];
  chainA: THREE.InstancedMesh;
  chainB: THREE.InstancedMesh;
  updateDynamic: () => void;
}

/** 在设计平面里按凸多边形挤出（沿 w） */
function prismUVW(poly: P2[], w0: number, w1: number): THREE.BufferGeometry {
  const shape = new THREE.Shape(poly.map((p) => new THREE.Vector2(p[0], p[1])));
  const g = new THREE.ExtrudeGeometry(shape, { depth: w1 - w0, bevelEnabled: false });
  g.translate(0, 0, w0);
  g.applyMatrix4(UVW);
  return g;
}

function offsetPoly(poly: P2[], d: number): P2[] {
  // 逆时针多边形向外偏移 d（相邻边偏移线求交）
  const n = poly.length;
  const out: P2[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = poly[(i + n - 1) % n], p1 = poly[i], p2 = poly[(i + 1) % n];
    const e1 = [p1[0] - p0[0], p1[1] - p0[1]], e2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(e1[0], e1[1]), l2 = Math.hypot(e2[0], e2[1]);
    const n1 = [e1[1] / l1, -e1[0] / l1], n2 = [e2[1] / l2, -e2[0] / l2];
    const bis = [n1[0] + n2[0], n1[1] + n2[1]];
    const bl = Math.hypot(bis[0], bis[1]) || 1;
    const cosHalf = (bis[0] / bl) * n1[0] + (bis[1] / bl) * n1[1];
    const k = d / Math.max(0.3, cosHalf);
    out.push([p1[0] + (bis[0] / bl) * k, p1[1] + (bis[1] / bl) * k]);
  }
  return out;
}

export function buildMech(sim: Sim, pal: Palette): MechView {
  const root = new THREE.Group();
  root.name = 'mech';
  const bound: Bound[] = [];
  const parts: Record<string, THREE.Object3D[]> = {};
  const anchors: Record<string, () => THREE.Vector3> = {};
  const add = (name: string, o: THREE.Object3D) => { (parts[name] ??= []).push(o); };
  const bind = (body: Bound['body'], obj: THREE.Object3D) => {
    const t = body.translation();
    obj.position.set(t.x, t.y, t.z);
    root.add(obj);
    bound.push({ body, obj });
  };
  const esc = sim.esc, geo = esc.geo, o = ESC.origin;

  // =========================================================== 枢轮
  {
    const g = new THREE.Group();
    const hw = ESC.W / 2;
    g.add(cyl(ESC.hubR, ESC.W + 0.12, pal.woodMech2, 'x', 20));
    g.add(cyl(0.075, 1.65, pal.iron, 'x', 14, V(-0.45, 0, 0))); // 枢轴：穿过枢轮，向左通到地毂
    for (const s of [-1, 1]) {
      for (const r of ESC.rimR) g.add(ring(r, 0.07, 0.045, pal.woodMech2, 'x', 120).translateX(s * (hw - 0.01)));
      g.add(ring(ESC.RLK, 0.06, 0.04, pal.woodMech2, 'x', 120).translateX(hw - 0.01));
    }
    for (let k = 0; k < ESC.N; k++) {
      const a = ESC.thetaF + k * ESC.pitch;
      const d = L(Math.cos(a), Math.sin(a));
      for (const s of [-1, 1]) {
        g.add(beam(d.clone().multiplyScalar(ESC.hubR).setX(s * (hw - 0.01)), d.clone().multiplyScalar(ESC.RLK + 0.02).setX(s * (hw - 0.01)), 0.03, 0.05, pal.woodMech2, new THREE.Vector3(1, 0, 0)));
      }
      // 斗轴（穿过前后辐条）
      const pk = L(ESC.RP * Math.cos(a), ESC.RP * Math.sin(a));
      g.add(cyl(0.022, ESC.W + 0.02, pal.iron, 'x', 8, pk));
    }
    // 外缘锁销（36 枚）
    for (let j = 0; j < ESC.N; j++) {
      const a = geo.lockPinAngle0 + j * ESC.pitch;
      const p = L(ESC.RLK * Math.cos(a), ESC.RLK * Math.sin(a), (ESC.lockPinW0 + ESC.lockPinW1) / 2);
      g.add(cyl(ESC.lockPinR, ESC.lockPinW1 - ESC.lockPinW0, pal.bronze, 'x', 10, p));
    }
    // 地毂（冠齿）：盘 + 36 枚销
    const cw = DRV.crownX - o.x;
    g.add(cyl(DRV.crownR + 0.07, 0.06, pal.woodMech2, 'x', 48, V(cw + 0.03, 0, 0)));
    g.add(ring(DRV.crownR, 0.08, 0.02, pal.iron, 'x', 96).translateX(cw + 0.005));
    for (let j = 0; j < DRV.crownPins; j++) {
      const a = -Math.PI / 2 + j * (2 * Math.PI / DRV.crownPins);
      const p = L(DRV.crownR * Math.cos(a), DRV.crownR * Math.sin(a), cw - DRV.crownPinLen / 2);
      g.add(cyl(DRV.crownPinR, DRV.crownPinLen, pal.bronze, 'x', 8, p));
    }
    const baked = bake(g);
    bind(esc.wheel, baked);
    add('wheel', baked);
    anchors.wheel = () => baked.localToWorld(L(-1.2, 1.25, 0.2));
    anchors.wheelHub = () => baked.localToWorld(V(0.2, 0, 0));
    anchors.crown = () => baked.localToWorld(L(-0.42, -0.42, DRV.crownX - o.x));
    // 运动箭头用的定点：位置固定在世界里（不随轮转走），方向沿枢轮转向
    // （u-v 平面里顺时针，即角度减小的方向）
    const wo = new THREE.Vector3(o.x, o.y, o.z);
    const rimAt = (deg: number, r: number, w: number) => L(r * Math.cos(deg * DEG), r * Math.sin(deg * DEG), w).add(wo);
    anchors.wheelRim = () => rimAt(103, 1.62, 0.32);
    anchors.wheelRimAhead = () => rimAt(97, 1.62, 0.32);
    anchors.wheelRimLow = () => rimAt(165, 1.97, 0.32);
    anchors.wheelRimLowAhead = () => rimAt(159, 1.97, 0.32);
    anchors.crownRim = () => rimAt(60, 0.66, DRV.crownX - o.x - 0.07);
    anchors.crownRimAhead = () => rimAt(51, 0.66, DRV.crownX - o.x - 0.07);
    anchors.crownLbl = () => rimAt(125, 0.6, DRV.crownX - o.x - 0.07);
  }

  // =========================================================== 受水壶（36 只）
  const waterMeshes: { mesh: THREE.Mesh; k: number }[] = [];
  {
    const poly = geo.stationPoly;
    const t = ESC.wall, hw = ESC.halfW;
    const g = new THREE.Group();
    const outer = offsetPoly(poly, t);
    // 前后挡板
    g.add(mesh(prismUVW(outer, hw, hw + t), pal.woodMech));
    g.add(mesh(prismUVW(outer, -hw - t, -hw), pal.woodMech));
    // 斗底与两侧壁（开口一侧不封）
    const wall = (a: P2, b: P2) => {
      const ia = poly.indexOf(a), ib = poly.indexOf(b);
      const oa = outer[ia], ob = outer[ib];
      g.add(mesh(prismUVW([a, oa, ob, b].reverse() as P2[], -hw - t, hw + t), pal.woodMech));
    };
    wall(poly[0], poly[1]);
    wall(poly[1], poly[2]);
    wall(poly[3], poly[0]);
    // 口沿铁箍
    const [A, B] = [geo.lipA, geo.lipB];
    g.add(beam(L(A[0], A[1], 0).setX(hw + t), L(B[0], B[1], 0).setX(hw + t), 0.012, 0.02, pal.iron));
    g.add(beam(L(A[0], A[1], 0).setX(-hw - t), L(B[0], B[1], 0).setX(-hw - t), 0.012, 0.02, pal.iron));
    // 拨销与托架
    const pin = geo.pinL;
    g.add(cyl(ESC.pinR, ESC.pinW1 - ESC.pinW0, pal.iron, 'x', 10, L(pin[0], pin[1], (ESC.pinW0 + ESC.pinW1) / 2)));
    g.add(beam(L(poly[1][0], poly[1][1], hw + t), L(pin[0], pin[1], hw + t), 0.03, 0.02, pal.iron));
    g.add(beam(L(0, 0, hw + t), L(pin[0], pin[1], hw + t), 0.025, 0.02, pal.iron));
    const proto = bake(g);
    esc.scoops.forEach((sc) => {
      const holder = new THREE.Group();
      const inner = proto.clone();
      inner.rotation.x = sc.delta; // 第 k 只斗：受水位几何绕斗轴转 δk（与碰撞体一致）
      holder.add(inner);
      // 斗中水体（动态几何，刚体局部坐标）
      const wg = new THREE.BufferGeometry();
      const maxV = 160;
      wg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxV * 3), 3));
      wg.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(maxV * 3), 3));
      wg.setDrawRange(0, 0);
      const wm = new THREE.Mesh(wg, pal.water);
      wm.frustumCulled = false;
      wm.renderOrder = 2;
      holder.add(wm);
      waterMeshes.push({ mesh: wm, k: sc.index });
      bind(sc.body, holder);
      add('scoops', holder);
      if (sc.index === 0) add('scoop0', holder);
    });
  }

  // =========================================================== 格叉 / 枢衡
  {
    const Q = ESC.Q;
    const sh = geo.shelf;
    const rel = (p: P2): P2 => [p[0] - Q[0], p[1] - Q[1]];
    const g = new THREE.Group();
    const w = ESC.forkW;
    const ang = Math.atan2(sh.t[1], sh.t[0]);
    const thick = 0.03;
    const mid = rel([sh.s0[0] + sh.t[0] * (sh.lead - sh.trail) / 2 - sh.n[0] * thick / 2, sh.s0[1] + sh.t[1] * (sh.lead - sh.trail) / 2 - sh.n[1] * thick / 2]);
    const plate = box(0.1, thick, sh.lead + sh.trail, pal.bronze);
    plate.position.copy(L(mid[0], mid[1], w));
    plate.rotation.x = ang;
    g.add(plate);
    // 格叉的两股叉齿（夹住拨销两侧）
    for (const dw of [-0.055, 0.055]) {
      const tip = rel([sh.s0[0] + sh.n[0] * 0.045, sh.s0[1] + sh.n[1] * 0.045]);
      const bse = rel([sh.s0[0] - sh.n[0] * 0.02, sh.s0[1] - sh.n[1] * 0.02]);
      g.add(rod(L(bse[0], bse[1], w + dw), L(tip[0], tip[1], w + dw), 0.011, pal.bronze, 6));
    }
    // 入口斜坡
    const rs: P2 = [sh.s0[0] - sh.t[0] * sh.trail, sh.s0[1] - sh.t[1] * sh.trail];
    const re: P2 = [rs[0] - sh.t[0] * sh.ramp - sh.n[0] * sh.rampDepth, rs[1] - sh.t[1] * sh.ramp - sh.n[1] * sh.rampDepth];
    g.add(beam(L(...rel(re), w), L(...rel(rs), w), 0.1, 0.02, pal.iron, L(sh.n[0], sh.n[1], 0)));
    // 枢衡（杠杆臂）与支点、枢权
    const tipC = rel(sh.s0);
    g.add(beam(L(tipC[0] + 0.02, tipC[1] - 0.05, w), L(geo.forkWeightLocal[0], geo.forkWeightLocal[1], w), 0.07, 0.05, pal.woodMech2, new THREE.Vector3(0, 1, 0)));
    g.add(cyl(0.05, 0.16, pal.bronze, 'x', 16, L(0, 0, w)));
    const wl = geo.forkWeightLocal;
    g.add(rod(L(wl[0], wl[1], w), L(wl[0], wl[1] - 0.12, w), 0.008, pal.iron, 6));
    const weight = cyl(0.075, 0.13, pal.bronzeDark, 'y', 16, L(wl[0], wl[1] - 0.19, w));
    weight.name = 'forkWeight';
    g.add(weight);
    const fc = geo.forkChainLocal;
    g.add(torus(0.018, 0.005, pal.iron, 'x', 12).translateX(w).translateY(fc[1]).translateZ(-fc[0]));
    const baked = bake(g);
    bind(esc.fork, baked);
    add('fork', baked);
    anchors.fork = () => baked.localToWorld(L(tipC[0], tipC[1] - 0.02, w));
    anchors.forkWeight = () => baked.localToWorld(L(wl[0], wl[1] - 0.19, w));
  }

  // =========================================================== 天衡（上杠杆）
  {
    const g = new THREE.Group();
    const w = ESC.lockW;
    const a = geo.upperLockLocal, b = geo.upperChainLocal;
    g.add(beam(L(a[0] - 0.04, 0, w), L(b[0] + 0.05, 0, w), 0.06, 0.08, pal.woodMech2));
    g.add(cyl(0.045, 0.16, pal.bronze, 'x', 16, L(0, 0, w)));
    const wl = geo.upperWeightLocal;
    g.add(rod(L(wl[0], -0.03, w), L(wl[0], wl[1] - 0.05, w), 0.007, pal.iron, 6));
    g.add(cyl(0.05, 0.09, pal.bronzeDark, 'y', 14, L(wl[0], wl[1] - 0.09, w)));
    g.add(torus(0.016, 0.005, pal.iron, 'x', 12).translateX(w).translateY(-0.045).translateZ(-a[0]));
    g.add(torus(0.016, 0.005, pal.iron, 'x', 12).translateX(w).translateY(-0.045).translateZ(-b[0]));
    const baked = bake(g);
    bind(esc.upper, baked);
    add('upper', baked);
    anchors.upper = () => baked.localToWorld(L(-0.12, 0.05, w));
    anchors.upperWeight = () => baked.localToWorld(L(wl[0], wl[1] - 0.09, w));
    anchors.upperL = () => baked.localToWorld(L(a[0] + 0.04, 0.08, w + 0.05));
    anchors.upperR = () => baked.localToWorld(L(b[0], 0.08, w + 0.05));
  }

  // =========================================================== 天关（闸）
  {
    const g = new THREE.Group();
    const w = ESC.lockW;
    const top = geo.lockTop[1] - geo.lockBottom[1];
    g.add(box(0.07, top, geo.lockWidth + 0.01, pal.bronze).translateY(top / 2).translateX(w));
    g.add(box(0.15, 0.12, geo.lockWidth + 0.016, pal.bronze).translateY(0.06).translateX(w)); // 闸头（与锁销接触的部分）
    g.add(cyl(0.03, 0.08, pal.bronze, 'x', 12, L(0, top, w)));
    const baked = bake(g);
    bind(esc.lock, baked);
    add('lock', baked);
    anchors.lock = () => baked.localToWorld(L(0, 0.1, w));
  }

  // =========================================================== 左右天锁（棘爪）
  esc.pawls.forEach((p, i) => {
    const gp = geo.pawls[i];
    const g = new THREE.Group();
    const w = ESC.lockW;
    const tipL: P2 = [gp.tip[0] - gp.pivot[0], gp.tip[1] - gp.pivot[1]];
    g.add(beam(L(0, 0, w), L(tipL[0], tipL[1] + 0.03, w), 0.03, 0.04, pal.iron));
    g.add(cyl(0.03, 0.1, pal.bronze, 'x', 12, L(0, 0, w)));
    const tip = box(0.1, 0.045, 0.05, pal.iron);
    tip.position.copy(L(tipL[0] - 0.012, tipL[1] + 0.022, w));
    g.add(tip);
    const baked = bake(g);
    bind(p, baked);
    add('pawls', baked);
    if (i === 0) anchors.pawl = () => baked.localToWorld(L(tipL[0], tipL[1] + 0.04, w));
  });

  // =========================================================== 天柱
  const drv = sim.drv;
  {
    const g = new THREE.Group();
    const y0 = DRV.tzY0 - drv.tzOrigin.y, y1 = 10.75 - drv.tzOrigin.y;
    g.add(cyl(0.085, y1 - y0, pal.woodMech2, 'y', 8, V(0, (y0 + y1) / 2, 0)));
    for (let y = y0 + 0.6; y < y1; y += 1.4) g.add(cyl(0.092, 0.04, pal.iron, 'y', 8, V(0, y, 0)));
    const lantern = (yc: number, r: number, n: number, sr: number, h: number, phase: number) => {
      g.add(cyl(r + 0.06, 0.035, pal.woodMech, 'y', 32, V(0, yc - h, 0)));
      g.add(cyl(r + 0.06, 0.035, pal.woodMech, 'y', 32, V(0, yc + h, 0)));
      for (let i = 0; i < n; i++) {
        const a = (i + phase) * (2 * Math.PI / n);
        g.add(cyl(sr, 2 * h, pal.bronze, 'y', 10, V(r * Math.cos(a), yc, r * Math.sin(a))));
      }
    };
    lantern(0, DRV.lanternR, DRV.lanternStaves, DRV.staveR, 0.13, 0.5);
    lantern(DRV.tzLowY - drv.tzOrigin.y, DRV.tzLowR, DRV.tzLowStaves, 0.046, 0.085, 0);
    for (const ins of sim.inst) lantern(ins.tzLanternY - drv.tzOrigin.y, DRV.lanternR, DRV.lanternStaves, DRV.staveR, 0.11, 0.5);
    const baked = bake(g);
    bind(drv.tianzhu, baked);
    add('tianzhu', baked);
    anchors.tianzhu = () => baked.localToWorld(V(0, 3.2, 0));
    anchors.lantern = () => baked.localToWorld(V(-0.05, 0.22, 0.3));
    // 天柱绕 +Y 负向转：点 (x,z) 的"前方"是绕 Y 转 -θ；箭头位置固定在世界里
    const tzo = new THREE.Vector3(drv.tzOrigin.x, drv.tzOrigin.y, drv.tzOrigin.z);
    const aheadY = (x: number, y: number, z: number, deg: number) => {
      const a = -deg * DEG, c = Math.cos(a), s = Math.sin(a);
      return V(x * c + z * s, y, -x * s + z * c).add(tzo);
    };
    anchors.lanternRim = () => aheadY(-0.36, 0.2, 0.0, 0);
    anchors.lanternRimAhead = () => aheadY(-0.36, 0.2, 0.0, 14);
    anchors.tianzhuRim = () => aheadY(-0.1, 2.6, 0.0, 0);
    anchors.tianzhuRimAhead = () => aheadY(-0.1, 2.6, 0.0, 40);
    anchors.tianzhuLbl = () => aheadY(-0.08, 0.55, 0.0, 0);
  }

  // =========================================================== 机轮
  {
    const g = new THREE.Group();
    const jy = (y: number) => y - drv.jlOrigin.y;
    g.add(cyl(0.07, DRV.jlY1 - DRV.jlY0, pal.woodMech2, 'y', 10, V(0, jy((DRV.jlY0 + DRV.jlY1) / 2), 0)));
    // 销轮
    g.add(cyl(0.62, 0.06, pal.woodMech, 'y', 48));
    for (let i = 0; i < DRV.jlGearPins; i++) {
      const a = i * (2 * Math.PI / DRV.jlGearPins);
      const d = V(Math.cos(a), 0, Math.sin(a));
      g.add(rod(d.clone().multiplyScalar(DRV.jlGearR0 - 0.02), d.clone().multiplyScalar(DRV.jlGearR1), DRV.jlPinR, pal.bronze, 10));
    }
    // 拨牙盘
    const d1 = jy(DRV.disc1Y);
    g.add(cyl(DRV.disc1R, 0.05, pal.woodMech, 'y', 64, V(0, d1 - 0.025, 0)));
    g.add(ring(DRV.disc1R, 0.03, 0.052, pal.lacquer, 'y', 96).translateY(d1 - 0.025));
    for (const a of drv.drumPegAngles) g.add(cyl(DRV.pegR + 0.004, DRV.pegH, pal.iron, 'y', 8, V(DRV.drumRingR * Math.cos(a), d1 + DRV.pegH / 2, DRV.drumRingR * Math.sin(a))));
    for (const a of drv.bellPegAngles) g.add(cyl(DRV.pegR + 0.006, DRV.pegH, pal.gold, 'y', 8, V(DRV.bellRingR * Math.cos(a), d1 + DRV.pegH / 2, DRV.bellRingR * Math.sin(a))));
    // 司辰盘（木人另建，保持可读的贴图）
    const d2 = jy(DRV.disc2Y);
    g.add(cyl(DRV.disc2R + 0.03, 0.05, pal.woodMech, 'y', 64, V(0, d2 - 0.025, 0)));
    g.add(ring(DRV.disc2R + 0.03, 0.03, 0.052, pal.lacquer, 'y', 96).translateY(d2 - 0.025));
    // 其余各层的装饰盘
    for (const y of [1.75, 2.85]) g.add(cyl(0.45, 0.04, pal.woodMech, 'y', 48, V(0, jy(y), 0)));
    const baked = bake(g);
    // 司辰木人：12 尊，手持时辰牌（卯、辰、巳、午……依次到窗口）
    const names = ['卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时', '子时', '丑时', '寅时'];
    const robes = [pal.robeRed, pal.robePurple, pal.robeBlue, pal.robeGreen];
    for (let i = 0; i < 12; i++) {
      const a = (90 + i * 30) * DEG; // 局部角；机轮每转 30° 换一尊到正前方窗口
      const fig = makeFigure(pal, robes[i % robes.length], 0.42);
      const pr = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.23), pal.make({ map: placardTexture(names[i]), roughness: 0.8, side: THREE.DoubleSide, emissive: 0x5a4020, emissiveIntensity: 0.5 }));
      pr.position.set(0, 0.24, 0.085);
      pr.rotation.x = -0.12;
      fig.add(pr);
      const r = DRV.disc2R - 0.08;
      fig.position.set(r * Math.cos(a), d2, r * Math.sin(a));
      fig.rotation.y = Math.PI / 2 - a; // 面朝外
      baked.add(fig);
    }
    bind(drv.jilun, baked);
    add('jilun', baked);
    anchors.jilun = () => baked.localToWorld(V(0.45, jy(DRV.disc1Y) + 0.05, 0.25));
    // 机轮绕 +Y 正向转；箭头位置固定在世界里
    const jlo = new THREE.Vector3(drv.jlOrigin.x, drv.jlOrigin.y, drv.jlOrigin.z);
    const aheadJ = (x: number, y: number, z: number, deg: number) => {
      const a = deg * DEG, c = Math.cos(a), s = Math.sin(a);
      return V(x * c + z * s, y, -x * s + z * c).add(jlo);
    };
    const rimP = (deg: number) => V(0.56 * Math.cos(deg * DEG), jy(DRV.disc1Y) + 0.03, 0.56 * Math.sin(deg * DEG));
    anchors.jilunRim = () => { const p = rimP(150); return aheadJ(p.x, p.y, p.z, 0); };
    anchors.jilunRimAhead = () => { const p = rimP(150); return aheadJ(p.x, p.y, p.z, 8); };
    // 下端销轮外缘（朝向传动镜头的一侧）
    const gearP = V(1.0 * Math.cos(165 * DEG), 0.14, 1.0 * Math.sin(165 * DEG));
    anchors.jilunGearRim = () => aheadJ(gearP.x, gearP.y, gearP.z, 0);
    anchors.jilunGearRimAhead = () => aheadJ(gearP.x, gearP.y, gearP.z, 10);
    // 标注用的定点（不随轮转走）
    anchors.jilunLbl = () => aheadJ(0.07, 0.75, 0, 0);
    // 拨牙标注：鼓牙环上、击鼓杠杆尾端"上游"一格的位置（拨牙从这里转过去顶杠杆）
    anchors.pegLbl = () => { const p = rimP(108); return aheadJ(p.x * DRV.drumRingR / 0.56, p.y + 0.06, p.z * DRV.drumRingR / 0.56, 0); };
    anchors.jilunGear = () => baked.localToWorld(V(0.62, 0.05, 0.4));
    anchors.peg = () => {
      // 最靠近击鼓杠杆的那枚拨牙
      const s = LEVERS[0];
      return new THREE.Vector3((s.ramp[0] + s.ramp[1]) / 2, DRV.disc1Y + DRV.pegH, s.tailZ);
    };
  }

  // =========================================================== 木人杠杆（手臂）与鼓、钟
  drv.levers.forEach((lv) => {
    const s = lv.spec;
    const g = new THREE.Group();
    const org = lv.origin;
    const P = (x: number, y: number, z: number) => V(x - org.x, y - org.y, z - org.z);
    const robe = s.kind === 'drum' ? pal.robeGreen : pal.robePurple;
    // 贯穿木阁立面的转轴
    g.add(rod(P(s.pivot[0], s.pivot[1], s.tailZ - 0.04), P(s.pivot[0], s.pivot[1], DRV.armZ), 0.014, pal.iron, 8));
    // 尾杆与斜坡
    const pegTop = DRV.disc1Y + DRV.pegH;
    const ra = P(s.ramp[0], pegTop + 0.02, s.tailZ), rb = P(s.ramp[1], pegTop - s.rise, s.tailZ);
    g.add(beam(P(s.pivot[0], s.pivot[1], s.tailZ), P(s.tailEndX, pegTop + 0.06, s.tailZ), 0.03, 0.04, pal.woodMech2, new THREE.Vector3(0, 0, 1)));
    const rampMid = ra.clone().add(rb).multiplyScalar(0.5);
    const rampDir = rb.clone().sub(ra);
    const nrm = new THREE.Vector3(-rampDir.y, rampDir.x, 0).normalize();
    g.add(beam(ra.clone().addScaledVector(nrm, 0.015), rb.clone().addScaledVector(nrm, 0.015), 0.03, 0.07, pal.iron, new THREE.Vector3(0, 0, 1)));
    g.add(rod(rampMid.clone().addScaledVector(nrm, 0.02), P(s.tailEndX, pegTop + 0.06, s.tailZ), 0.01, pal.iron, 6));
    // 手臂（袖）+ 手 + 槌
    const shoulder = P(s.pivot[0], s.pivot[1], DRV.armZ);
    const head = P(s.head[0], s.head[1], DRV.armZ);
    const hand = shoulder.clone().lerp(head, s.kind === 'drum' ? 0.55 : 0.5);
    g.add(rod(shoulder, hand, 0.03, robe, 10, 0.038));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 8), pal.skin).translateX(hand.x).translateY(hand.y).translateZ(hand.z));
    g.add(rod(hand, head, 0.009, pal.woodMech2, 6));
    if (s.kind === 'drum') {
      g.add(new THREE.Mesh(new THREE.SphereGeometry(s.headR, 16, 12), pal.lacquerDark).translateX(head.x).translateY(head.y).translateZ(head.z));
    } else {
      const hm = cyl(s.headR, 0.12, pal.woodMech2, 'z', 12, head);
      g.add(hm);
    }
    const baked = bake(g);
    baked.traverse((m) => { (m as THREE.Mesh).castShadow = true; });
    bind(lv.body, baked);
    add(s.kind === 'drum' ? 'drumArm' : 'bellArm', baked);
    anchors[s.kind === 'drum' ? 'drumArm' : 'bellArm'] = () => baked.localToWorld(head.clone());
    anchors[s.kind === 'drum' ? 'drumTail' : 'bellTail'] = () => baked.localToWorld(rampMid.clone());
  });
  // 钟（悬挂的刚体）
  {
    const g = new THREE.Group();
    const prof: THREE.Vector2[] = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const r = 0.055 + 0.05 * Math.pow(t, 1.6) + (t > 0.92 ? (t - 0.92) * 0.5 : 0);
      prof.push(new THREE.Vector2(r, -0.15 - t * 0.19));
    }
    const lg = new THREE.LatheGeometry(prof, 28);
    const bm = mesh(lg, pal.bronze);
    (bm.material as THREE.Material).side = THREE.DoubleSide;
    g.add(bm);
    g.add(cyl(0.055, 0.02, pal.bronze, 'y', 20, V(0, -0.15, 0)));
    g.add(rod(V(0, 0, 0), V(0, -0.15, 0), 0.008, pal.iron, 6));
    g.add(torus(0.025, 0.006, pal.bronze, 'z', 12).translateY(-0.13));
    for (let i = 0; i < 4; i++) g.add(torus(0.07 + i * 0.008, 0.004, pal.bronzeDark, 'y', 32).translateY(-0.2 - i * 0.03));
    bind(drv.bell, g);
    add('bell', g);
    anchors.bell = () => g.localToWorld(V(0.06, -0.25, 0));
  }

  // =========================================================== 浑象、浑仪及其横轴
  sim.inst.forEach((ins) => {
    const s = ins.spec;
    const P = new THREE.Vector3(POLAR.x, POLAR.y, POLAR.z);
    const qPolar = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), P);
    const g = new THREE.Group();
    if (s.name === 'globe') {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.68, 64, 40), pal.globe);
      sphere.quaternion.copy(qPolar);
      sphere.castShadow = true; sphere.receiveShadow = true;
      g.add(sphere);
      const ax = rod(P.clone().multiplyScalar(-0.95), P.clone().multiplyScalar(0.95), 0.025, pal.bronze, 10);
      g.add(ax);
    } else {
      // 三辰仪：赤道环、黄道环、两道二分二至经环、极轴
      const eq = torus(s.ringR, 0.022, pal.bronze, 'y', 128);
      eq.quaternion.copy(qPolar);
      g.add(eq);
      const col1 = torus(s.ringR - 0.05, 0.02, pal.bronze, 'x', 128);
      col1.quaternion.premultiply(qPolar);
      g.add(col1);
      const col2 = torus(s.ringR - 0.05, 0.02, pal.bronze, 'z', 128);
      col2.quaternion.premultiply(qPolar);
      g.add(col2);
      const ecl = torus(s.ringR - 0.1, 0.02, pal.gold, 'y', 128);
      ecl.quaternion.copy(qPolar).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 23.5 * DEG));
      g.add(ecl);
      g.add(rod(P.clone().multiplyScalar(-1.12), P.clone().multiplyScalar(1.12), 0.028, pal.bronze, 10));
    }
    // 赤道冠销环
    const rr = torus(s.ringR, 0.03, pal.bronzeDark, 'y', 128);
    rr.quaternion.copy(qPolar);
    g.add(rr);
    const eUp = new THREE.Vector3(0, Math.cos(35 * DEG), Math.sin(35 * DEG));
    for (let i = 0; i < s.ringPins; i++) {
      const a = i * (2 * Math.PI / s.ringPins);
      const radial = new THREE.Vector3(Math.cos(a), 0, 0).addScaledVector(eUp, Math.sin(a)).multiplyScalar(s.ringR);
      g.add(rod(radial, radial.clone().addScaledVector(P, 0.12), 0.02, pal.bronze, 6));
    }
    const baked = bake(g);
    bind(ins.body, baked);
    add(s.name, baked);
    anchors[s.name] = () => baked.localToWorld(s.name === 'globe' ? new THREE.Vector3(-0.3, 0.45, 0.35) : new THREE.Vector3(-0.5, 0.55, 0.3));
    // 横轴：灯笼齿 + 冠齿
    const sg = new THREE.Group();
    const so = ins.shaft.translation();
    const X = (x: number) => x - so.x;
    sg.add(cyl(0.05, ins.shaftX1 - ins.shaftX0, pal.woodMech2, 'x', 10));
    for (const dx of [-0.11, 0.11]) {
      sg.add(ring(s.lanternR, 0.06, 0.03, pal.woodMech2, 'x', 48).translateX(X(ins.lanternCenterX - 0.04 + dx)));
      for (let k = 0; k < 3; k++) sg.add(beam(V(X(ins.lanternCenterX - 0.04 + dx), 0, 0), V(X(ins.lanternCenterX - 0.04 + dx), s.lanternR * Math.sin(k * 2.094), s.lanternR * Math.cos(k * 2.094)), 0.025, 0.025, pal.woodMech2, new THREE.Vector3(1, 0, 0)));
    }
    for (let i = 0; i < s.lanternStaves; i++) {
      const a = (i + 0.5) * (2 * Math.PI / s.lanternStaves);
      const dir = new THREE.Vector3(0, P.y * Math.cos(a), P.z * Math.cos(a)).addScaledVector(eUp, Math.sin(a));
      sg.add(cyl(0.022, 0.22, pal.bronze, 'x', 8, V(X(ins.lanternCenterX - 0.04), dir.y * s.lanternR, dir.z * s.lanternR)));
    }
    sg.add(ring(0.3, 0.07, 0.04, pal.woodMech2, 'x', 48).translateX(X(0.72)));
    for (let k = 0; k < 4; k++) sg.add(beam(V(X(0.72), 0, 0), V(X(0.72), 0.3 * Math.sin(k * Math.PI / 2), 0.3 * Math.cos(k * Math.PI / 2)), 0.03, 0.03, pal.woodMech2, new THREE.Vector3(1, 0, 0)));
    for (let j = 0; j < 18; j++) {
      const a = Math.PI / 2 + j * (2 * Math.PI / 18);
      sg.add(cyl(0.022, 0.13, pal.bronze, 'x', 8, V(X(0.7 - 0.065), 0.3 * Math.sin(a), -0.3 * Math.cos(a))));
    }
    const sb = bake(sg);
    bind(ins.shaft, sb);
    add(s.name + 'Shaft', sb);
  });

  // =========================================================== 天条与天关吊链（随两端刚体伸展的链节）
  const linkGeo = new THREE.TorusGeometry(0.016, 0.005, 6, 12);
  linkGeo.scale(1, 1.6, 1);
  const chainA = new THREE.InstancedMesh(linkGeo, pal.bronze, 64);
  const chainB = new THREE.InstancedMesh(linkGeo, pal.bronze, 16);
  chainA.castShadow = true;
  chainA.frustumCulled = false; chainB.frustumCulled = false;
  root.add(chainA, chainB);
  add('chain', chainA);
  const tmpM = new THREE.Matrix4(), tmpQ = new THREE.Quaternion(), tmpS = new THREE.Vector3(1, 1, 1);
  const layChain = (im: THREE.InstancedMesh, a: THREE.Vector3, b: THREE.Vector3) => {
    const d = b.clone().sub(a);
    const len = d.length();
    const n = Math.min(im.count, Math.max(2, Math.round(len / 0.04)));
    const dir = d.normalize();
    const q0 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    for (let i = 0; i < im.count; i++) {
      if (i >= n) { tmpM.makeScale(0, 0, 0); im.setMatrixAt(i, tmpM); continue; }
      const p = a.clone().addScaledVector(dir, ((i + 0.5) / n) * len);
      tmpQ.copy(q0).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (i % 2) * Math.PI / 2));
      tmpM.compose(p, tmpQ, tmpS);
      im.setMatrixAt(i, tmpM);
    }
    im.instanceMatrix.needsUpdate = true;
  };
  const upperObj = parts.upper[0], forkObj = parts.fork[0], lockObj = parts.lock[0];
  anchors.chain = () => {
    const a = upperObj.localToWorld(L(geo.upperChainLocal[0], -0.045, ESC.lockW));
    const b = forkObj.localToWorld(L(geo.forkChainLocal[0], geo.forkChainLocal[1], ESC.forkW));
    return a.lerp(b, 0.45);
  };

  // =========================================================== 动态部分：斗中水、链条
  const tmpPos: number[] = [];
  const updateDynamic = () => {
    // 斗中水体
    for (const wmI of waterMeshes) {
      const poly = sim.water.waterPoly[wmI.k];
      const g = wmI.mesh.geometry;
      if (poly.length < 3) { g.setDrawRange(0, 0); continue; }
      tmpPos.length = 0;
      const hw = ESC.halfW - 0.004;
      const push = (u: number, v: number, w: number) => tmpPos.push(w, v, -u);
      const n = poly.length;
      for (const w of [hw, -hw]) {
        for (let i = 1; i < n - 1; i++) {
          const a = poly[0], b = w > 0 ? poly[i] : poly[i + 1], c = w > 0 ? poly[i + 1] : poly[i];
          push(a[0], a[1], w); push(b[0], b[1], w); push(c[0], c[1], w);
        }
      }
      for (let i = 0; i < n; i++) {
        const a = poly[i], b = poly[(i + 1) % n];
        push(a[0], a[1], hw); push(a[0], a[1], -hw); push(b[0], b[1], -hw);
        push(a[0], a[1], hw); push(b[0], b[1], -hw); push(b[0], b[1], hw);
      }
      const pa = g.attributes.position as THREE.BufferAttribute;
      const cnt = Math.min(pa.count, tmpPos.length / 3);
      (pa.array as Float32Array).set(tmpPos.slice(0, cnt * 3));
      pa.needsUpdate = true;
      g.setDrawRange(0, cnt);
      g.computeVertexNormals();
    }
    // 链条
    layChain(chainA,
      upperObj.localToWorld(L(geo.upperChainLocal[0], -0.045, ESC.lockW)),
      forkObj.localToWorld(L(geo.forkChainLocal[0], geo.forkChainLocal[1], ESC.forkW)));
    layChain(chainB,
      upperObj.localToWorld(L(geo.upperLockLocal[0], -0.045, ESC.lockW)),
      lockObj.localToWorld(L(0, geo.lockTop[1] - geo.lockBottom[1], ESC.lockW)));
  };

  return { root, bound, parts, anchors, waterMeshes, chainA, chainB, updateDynamic };
}

/** 宋式小木人：圆领袍、幞头 */
export function makeFigure(pal: Palette, robe: THREE.Material, h: number): THREE.Group {
  const g = new THREE.Group();
  const s = h / 0.42;
  const body = new THREE.LatheGeometry([
    new THREE.Vector2(0.075 * s, 0), new THREE.Vector2(0.07 * s, 0.05 * s), new THREE.Vector2(0.055 * s, 0.2 * s),
    new THREE.Vector2(0.06 * s, 0.27 * s), new THREE.Vector2(0.045 * s, 0.31 * s), new THREE.Vector2(0.02 * s, 0.32 * s),
  ], 16);
  g.add(mesh(body, robe));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.037 * s, 14, 10), pal.skin);
  head.position.y = 0.355 * s;
  g.add(head);
  const hat = mesh(new THREE.CylinderGeometry(0.033 * s, 0.036 * s, 0.035 * s, 14), pal.hat);
  hat.position.y = 0.385 * s;
  g.add(hat);
  const wing = mesh(new THREE.BoxGeometry(0.16 * s, 0.006 * s, 0.012 * s), pal.hat);
  wing.position.set(0, 0.375 * s, -0.02 * s);
  g.add(wing);
  for (const sx of [-1, 1]) {
    const arm = mesh(new THREE.CylinderGeometry(0.018 * s, 0.022 * s, 0.13 * s, 8), robe);
    arm.position.set(sx * 0.05 * s, 0.24 * s, 0.03 * s);
    arm.rotation.x = -0.9;
    g.add(arm);
  }
  return g;
}

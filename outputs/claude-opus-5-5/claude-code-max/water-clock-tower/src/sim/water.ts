// 水：出水口按恒定流量放出水滴（Rapier 动力学质点）；水滴从斗口落入即并入斗中水体，
// 斗中水的质量与重心由"水平液面截取斗截面"实时求得并写入 Rapier 刚体；
// 水斗倾斜到容不下时，多余的水再从低唇化为水滴溢出。质量与动量守恒。
import { RAPIER, PlaneFrame, Rng, qIdent, type World, type Body } from './core';
import { clipBelow, area, centroid, levelForArea, type P2 } from './poly';
import { ESC, SCOOP_OWN, type Escapement, type ScoopInfo } from './escapement';

export const WATER = {
  rho: 1000,
  flow: 0.0028, // m³/s（平水壶出水恒定）
  vp: 0.000032, // 每滴代表的体积 m³
  radius: 0.015,
  maxParticles: 520,
  spillTau: 0.09,
  sumpV: -1.92, // 退水壶水面（轮坐标 v）
  life: 5.0,
};

/** 水箱与水路的布置（枢轮平面坐标 u,v） */
export const WATER_TANKS = {
  ping: { u: 1.55, v: 2.62, wd: 0.42, d: 0.46, h: 0.42 }, // 平水壶（wd 为沿轴向的宽）
  tian: { u: 2.12, v: 3.38, wd: 0.6, d: 0.7, h: 0.6 }, // 天池
  tianOut: [1.7, 3.12] as [number, number], // 天池出水口（落入平水壶）
  overflow: [2.1, 2.68] as [number, number], // 平水壶溢流口（落入退水壶）
  pingLevel: 2.74, // 平水壶恒定水位（v）
};

export interface Particle {
  body: Body;
  active: boolean;
  age: number;
  src: number; // 从哪只斗溢出（-1 = 出水口）
  immune: number; // 溢出后短时间内不被原斗吸收
  kind: 0 | 1 | 2; // 0 出水口水流，1 溢出水，2 水箱间的水流
  killV: number; // 落到此高度（轮坐标 v）以下即并入下方水体
}

/** 水箱之间的辅助水流：天池 → 平水壶，平水壶溢流 → 退水壶 */
export interface AuxStream { u: number; v: number; rate: number; killV: number; vu: number; vv: number; acc: number }

const tmpA: P2[] = [];
const tmpB: P2[] = [];

export class Water {
  readonly vol: Float64Array;
  readonly spillAcc: Float64Array;
  readonly waterPoly: P2[][]; // 渲染用：各斗中水体截面（斗局部坐标）
  readonly level: Float64Array; // 液面高度（沿 n）
  readonly upN: Float64Array; // 各斗局部"上"方向
  parts: Particle[] = [];
  private emitAcc = 0;
  private rng = new Rng(20250);
  private massDirty: Uint8Array;
  absorbedTotal = 0;
  emittedTotal = 0;
  spilledTotal = 0;
  flowScale = 1;
  aux: AuxStream[] = [];

  constructor(public world: World, public esc: Escapement) {
    const N = ESC.N;
    this.vol = new Float64Array(N);
    this.spillAcc = new Float64Array(N);
    this.level = new Float64Array(N);
    this.upN = new Float64Array(N * 2);
    this.massDirty = new Uint8Array(N);
    this.waterPoly = Array.from({ length: N }, () => []);
    // 水滴：Rapier 动力学质点（只受重力，不参与碰撞检测；落进斗口即并入斗中水体）
    const m = WATER.rho * WATER.vp;
    const I = m * WATER.radius * WATER.radius * 0.4;
    for (let i = 0; i < WATER.maxParticles; i++) {
      const body = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic().setTranslation(0, -50 - i * 0.1, 0).setEnabled(false).setCanSleep(false).setLinearDamping(0.05)
          .setAdditionalMassProperties(m, { x: 0, y: 0, z: 0 }, { x: I, y: I, z: I }, qIdent()),
      );
      this.parts.push({ body, active: false, age: 0, src: -1, immune: 0, kind: 0, killV: WATER.sumpV });
    }
  }

  /** 预置初始水量（初始条件，非动画） */
  presetVolume(k: number, v: number) {
    this.vol[k] = v;
    this.massDirty[k] = 1;
  }

  private spawn(x: number, y: number, z: number, vx: number, vy: number, vz: number, src: number, kind: 0 | 1 | 2, killV = WATER.sumpV): boolean {
    for (const p of this.parts) {
      if (p.active) continue;
      p.active = true;
      p.age = 0;
      p.src = src;
      p.kind = kind;
      p.killV = killV;
      p.immune = src >= 0 ? 0.25 : 0;
      p.body.setEnabled(true);
      p.body.setTranslation({ x, y, z }, true);
      p.body.setLinvel({ x: vx, y: vy, z: vz }, true);
      p.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
      return true;
    }
    return false;
  }

  private kill(p: Particle) {
    p.active = false;
    p.body.setEnabled(false);
    p.body.setTranslation({ x: 0, y: -50, z: 0 }, false);
  }

  /** 每个物理步调用（在 world.step 之前） */
  step(dt: number) {
    const esc = this.esc;
    const o = ESC.origin;
    const N = ESC.N;
    const W2 = 2 * ESC.halfW;
    const vp = WATER.vp;

    // ---- 1. 出水口：恒定流量 ----
    this.emitAcc += WATER.flow * this.flowScale * dt;
    const sp = esc.geo.spout;
    while (this.emitAcc >= vp) {
      this.emitAcc -= vp;
      const ju = (this.rng.next() - 0.5) * 0.022;
      const jw = (this.rng.next() - 0.5) * 0.06;
      const w = esc.frame.toWorld(sp[0] + ju, sp[1], jw);
      if (this.spawn(w.x, w.y, w.z, (this.rng.next() - 0.5) * 0.05, -0.9 - this.rng.next() * 0.1, (this.rng.next() - 0.5) * 0.05, -1, 0)) this.emittedTotal++;
    }
    for (const s of this.aux) {
      s.acc += s.rate * dt;
      while (s.acc >= 1) {
        s.acc -= 1;
        const w = esc.frame.toWorld(s.u + (this.rng.next() - 0.5) * 0.02, s.v, (this.rng.next() - 0.5) * 0.04);
        // 水箱间水流不与机构碰撞
        this.spawn(w.x, w.y, w.z, 0, s.vv, -s.vu, -2, 2, s.killV);
      }
    }

    // ---- 2. 水滴：并入水斗 / 回收 ----
    const wheelA = PlaneFrame.angleOf(esc.wheel.rotation());
    for (const p of this.parts) {
      if (!p.active) continue;
      p.age += dt;
      if (p.immune > 0) p.immune -= dt;
      const t = p.body.translation();
      const pu = -(t.z - o.z), pv = t.y - o.y, pw = t.x - o.x;
      if (pv < p.killV || p.age > WATER.life) { this.kill(p); continue; }
      if (p.kind === 2 || Math.abs(pw) > ESC.halfW + 0.01) continue;
      const r = Math.hypot(pu, pv);
      if (r < ESC.RP - 0.12 || r > ESC.RP + 0.42) continue;
      const phi = Math.atan2(pv, pu);
      let kf = (phi - wheelA - ESC.thetaF - 0.06) / ESC.pitch;
      kf = Math.round(kf);
      for (let dk = -1; dk <= 1; dk++) {
        const k = (((kf + dk) % N) + N) % N;
        if (p.immune > 0 && p.src === k) continue;
        const sc = esc.scoops[k];
        const bt = sc.body.translation();
        const a = PlaneFrame.angleOf(sc.body.rotation());
        const du = pu - (-(bt.z - o.z)), dv = pv - (bt.y - o.y);
        const c = Math.cos(-a), s = Math.sin(-a);
        const lu = du * c - dv * s, lv = du * s + dv * c;
        if (insideConvex(sc.poly, lu, lv)) {
          // 只有从斗口进入的水滴才落进斗里（上一步还在斗口线之外）
          const vel = p.body.linvel();
          const vsP = sc.body.velocityAtPoint(t);
          const ru = -(vel.z - vsP.z) * dt, rv = (vel.y - vsP.y) * dt; // 相对位移（u,v）
          const pu0 = lu - (ru * c - rv * s), pv0 = lv - (ru * s + rv * c);
          const A = sc.lipA, B = sc.lipB;
          const nxo = A[1] - B[1], nyo = -(A[0] - B[0]); // 斗口边 B->A 的外法线
          if ((pu0 - B[0]) * nxo + (pv0 - B[1]) * nyo < -0.004) continue;
          // 动量守恒：水滴动量交给水斗
          const vs = sc.body.velocityAtPoint(t);
          const m = WATER.rho * vp;
          sc.body.applyImpulseAtPoint({ x: m * (vel.x - vs.x), y: m * (vel.y - vs.y), z: m * (vel.z - vs.z) }, t, true);
          this.vol[k] += vp;
          this.massDirty[k] = 1;
          this.absorbedTotal++;
          this.kill(p);
          break;
        }
      }
    }

    // ---- 3. 斗中水体：液面、溢出、质量属性 ----
    const station = (((Math.round(-wheelA / ESC.pitch)) % N) + N) % N;
    for (let k = 0; k < N; k++) {
      const sc = esc.scoops[k];
      const a = PlaneFrame.angleOf(sc.body.rotation());
      const nx = Math.sin(a), ny = Math.cos(a);
      this.upN[2 * k] = nx;
      this.upN[2 * k + 1] = ny;
      if (this.vol[k] <= 1e-9) {
        if (this.massDirty[k]) {
          setScoopMass(sc, 0, 0, 0);
          if (k === station) sc.pin.setShape(sc.pinShape);
          this.massDirty[k] = 0;
        }
        this.vol[k] = 0;
        this.waterPoly[k].length = 0;
        continue;
      }
      const hLip = Math.min(sc.lipA[0] * nx + sc.lipA[1] * ny, sc.lipB[0] * nx + sc.lipB[1] * ny);
      const cap = area(clipBelow(sc.poly, nx, ny, hLip, tmpA)) * W2;
      const excess = this.vol[k] - cap;
      if (excess > 0) {
        const dv = excess * Math.min(1, dt / WATER.spillTau) + Math.min(excess, vp * 0.02);
        this.vol[k] -= dv;
        this.spillAcc[k] += dv;
        // 从较低的唇口溢出
        const useA = sc.lipA[0] * nx + sc.lipA[1] * ny < sc.lipB[0] * nx + sc.lipB[1] * ny;
        const lip = useA ? sc.lipA : sc.lipB;
        const other = useA ? sc.lipB : sc.lipA;
        while (this.spillAcc[k] >= vp) {
          this.spillAcc[k] -= vp;
          const bt = sc.body.translation();
          const c = Math.cos(a), s = Math.sin(a);
          // 唇口外侧一点点
          const ou = lip[0] - other[0], ov = lip[1] - other[1];
          const ol = Math.hypot(ou, ov) || 1;
          const lu = lip[0] + (ou / ol) * 0.02, lv = lip[1] + (ov / ol) * 0.02;
          const wu = lu * c - lv * s, wv = lu * s + lv * c;
          const bu = -(bt.z - o.z), bv = bt.y - o.y;
          const jw = (this.rng.next() - 0.5) * 2 * (ESC.halfW - 0.02);
          const wp = esc.frame.toWorld(bu + wu, bv + wv, jw);
          const vs = sc.body.velocityAtPoint(wp);
          // 外推方向（世界）
          const du = (ou / ol) * c - (ov / ol) * s;
          const vOut = 0.25 + this.rng.next() * 0.15;
          if (this.spawn(wp.x, wp.y, wp.z, vs.x + (this.rng.next() - 0.5) * 0.05, vs.y - 0.05, vs.z - du * vOut, k, 1)) this.spilledTotal++;
        }
      }
      // 质量属性：水的质量放在水体形心处
      const A = Math.min(this.vol[k] / W2, area(sc.poly) * 0.999);
      const h = levelForArea(sc.poly, nx, ny, A);
      this.level[k] = h;
      const wpoly = clipBelow(sc.poly, nx, ny, h, tmpB);
      const cpt = centroid(wpoly);
      const dst = this.waterPoly[k];
      dst.length = 0;
      for (const q of wpoly) dst.push([q[0], q[1]]);
      setScoopMass(sc, WATER.rho * this.vol[k], cpt[0], cpt[1]);
      // Rapier 在质心改变后不会重算已有接触流形（接触点会"悬空"），
      // 因此改写受水位水斗的质量后，重设其拨销形状以强制重建它与格叉的接触。
      if (k === station) sc.pin.setShape(sc.pinShape);
      this.massDirty[k] = 0;
    }
  }

  activeCount(): number {
    let n = 0;
    for (const p of this.parts) if (p.active) n++;
    return n;
  }
}

/** 斗的总质量属性 = 木斗自重 + 斗中水（各自质心，平行轴定理合成转动惯量） */
function setScoopMass(sc: ScoopInfo, mw: number, wu: number, wv: number) {
  const ms = SCOOP_OWN.mass;
  const [su, sv] = sc.ownCom;
  const m = ms + mw;
  const cu = (ms * su + mw * wu) / m, cv = (ms * sv + mw * wv) / m;
  const I = SCOOP_OWN.inertia + ms * ((su - cu) ** 2 + (sv - cv) ** 2) + mw * (0.004 + (wu - cu) ** 2 + (wv - cv) ** 2);
  sc.body.setAdditionalMassProperties(m, PlaneFrame.local(cu, cv, 0), { x: I, y: I, z: I }, qIdent(), true);
}

function insideConvex(poly: P2[], x: number, y: number): boolean {
  for (let i = 0, n = poly.length; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    if ((b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]) < 0) return false;
  }
  return true;
}

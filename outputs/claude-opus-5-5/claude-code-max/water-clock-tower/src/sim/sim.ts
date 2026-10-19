// 仿真总装：世界、固定机架、各子系统，以及固定步长推进与事件收集。
import { RAPIER, PlaneFrame, type World, type Body } from './core';
import { buildEscapement, type Escapement } from './escapement';
import { buildDriveTrain, type DriveTrain } from './drivetrain';
import { buildInstrument, instrumentSpecs, type Instrument } from './instruments';
import { Water, WATER, WATER_TANKS } from './water';

export type SimEventType = 'lock' | 'pawl' | 'trip' | 'release' | 'drum' | 'bell' | 'gear';
export interface SimEvent { type: SimEventType; t: number; strength: number }

export class Sim {
  world: World;
  ground: Body;
  esc: Escapement;
  drv: DriveTrain;
  inst: Instrument[];
  water: Water;
  readonly dt: number;
  time = 0;
  steps = 0;
  events: SimEvent[] = [];
  /**
   * Rapier/parry 对"慢速滑动"的接触会沿用上一步的接触流形（每步位移 < 1 mm 时不重算），
   * 结果是：闸板缓慢抬起时、销子缓慢滑出承托面时，旧接触点仍然"顶着"。
   * 对机构里的关键接触，每步重设形状以强制重建接触流形。
   */
  private refresh: { c: RAPIER.Collider; s: RAPIER.Shape; b: Body | null; idle: number }[] = [];
  // 事件检测用的上一帧状态
  private wPrev = 0;
  private leverW: number[] = [];
  private forkPrev = 0;
  private pawlPrev: number[] = [];

  constructor(dt = 1 / 120) {
    this.dt = dt;
    this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
    this.world.timestep = dt;
    this.world.numSolverIterations = 8;
    this.ground = this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
    this.esc = buildEscapement(this.world, this.ground);
    this.drv = buildDriveTrain(this.world, this.ground, this.esc);
    const instRefresh: number[] = [];
    this.inst = instrumentSpecs().map((s) => buildInstrument(this.world, this.ground, this.drv.tianzhu, this.drv.tzOrigin, s, instRefresh));
    this.water = new Water(this.world, this.esc);
    // 天池注入平水壶（略多于出水），多余部分经溢流口流入退水壶 —— 平水壶水位因此恒定
    const outRate = WATER.flow / WATER.vp;
    this.water.aux.push(
      { u: WATER_TANKS.tianOut[0], v: WATER_TANKS.tianOut[1], rate: outRate * 1.25, killV: WATER_TANKS.pingLevel, vu: 0, vv: -0.3, acc: 0 },
      { u: WATER_TANKS.overflow[0], v: WATER_TANKS.overflow[1], rate: outRate * 0.25, killV: WATER.sumpV, vu: 0.25, vv: -0.1, acc: 0.5 },
    );
    for (const h of [...this.esc.lockColliders, ...this.esc.pawlColliders, ...this.esc.forkColliders, ...this.drv.refresh, ...instRefresh]) this.addRefresh(h);
    this.leverW = this.drv.levers.map(() => 0);
    this.pawlPrev = this.esc.pawls.map(() => 0);
  }

  addRefresh(handle: number) {
    const c = this.world.getCollider(handle);
    this.refresh.push({ c, s: c.shape, b: c.parent(), idle: 0 });
  }

  /** 只对正在运动（或刚停下）的部件重建接触；静止时接触流形不会"漂移" */
  private refreshContacts() {
    for (const r of this.refresh) {
      const b = r.b;
      let moving = true;
      if (b) {
        const w = b.angvel(), v = b.linvel();
        moving = w.x * w.x + w.y * w.y + w.z * w.z > 4e-6 || v.x * v.x + v.y * v.y + v.z * v.z > 2.5e-7;
      }
      if (moving) r.idle = 0; else r.idle++;
      if (r.idle < 30) r.c.setShape(r.s);
    }
  }

  /** 分项计时（调试用） */
  prof = { refresh: 0, water: 0, world: 0, events: 0, n: 0 };
  profiling = false;

  step() {
    if (this.profiling) return this.stepProfiled();
    this.refreshContacts();
    this.water.step(this.dt);
    this.world.step();
    this.time += this.dt;
    this.steps++;
    this.detectEvents();
  }

  private stepProfiled() {
    const t0 = performance.now();
    this.refreshContacts();
    const t1 = performance.now();
    this.water.step(this.dt);
    const t2 = performance.now();
    this.world.step();
    const t3 = performance.now();
    this.time += this.dt;
    this.steps++;
    this.detectEvents();
    const t4 = performance.now();
    this.prof.refresh += t1 - t0; this.prof.water += t2 - t1; this.prof.world += t3 - t2; this.prof.events += t4 - t3; this.prof.n++;
  }

  /** 从运动状态识别"撞击"类事件（供音效与讲解高亮使用） */
  private detectEvents() {
    const t = this.time;
    // 天关挡住锁销：枢轮角速度骤降
    const w = Math.abs(this.esc.wheel.angvel().x);
    if (this.wPrev > 0.12 && w < this.wPrev * 0.35) this.events.push({ type: 'lock', t, strength: this.wPrev });
    this.wPrev = w;
    // 格叉被压下（起跳）
    const f = PlaneFrame.angleOf(this.esc.fork.rotation());
    if (this.forkPrev < 0.012 && f >= 0.012) this.events.push({ type: 'trip', t, strength: 1 });
    this.forkPrev = f;
    // 天锁落下
    this.esc.pawls.forEach((p, i) => {
      const a = p.angvel().x;
      if (this.pawlPrev[i] < -0.4 && a > -0.05) this.events.push({ type: 'pawl', t, strength: -this.pawlPrev[i] });
      this.pawlPrev[i] = a;
    });
    // 木人槌头击中鼓/钟：杠杆角速度骤停
    this.drv.levers.forEach((lv, i) => {
      const wz = lv.body.angvel().z;
      const prev = this.leverW[i];
      if (lv.spec.kind === 'drum') {
        if (prev < -0.95 && wz > prev * 0.3) this.events.push({ type: 'drum', t, strength: -prev });
      } else if (prev > 0.6 && wz < prev * 0.3) {
        this.events.push({ type: 'bell', t, strength: prev });
      }
      this.leverW[i] = wz;
    });
  }

  drainEvents(): SimEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }
}

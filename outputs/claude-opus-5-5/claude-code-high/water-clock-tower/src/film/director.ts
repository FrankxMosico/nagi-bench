// The film: camera moves, captions, labels and the playback rate of the
// physics. The physics itself is never scripted – the director only chooses
// where to look and how fast simulated time flows (slow motion for the
// escapement, a gentle time-warp beforehand so that a trip lands in shot).
import * as THREE from "three";
import type { Sim, SimEvent } from "../sim/sim";
import type { GlowKey } from "../render/mechanism";
import { buildMechanism } from "../render/mechanism";
import { Label, type UI } from "./ui";
import type { AudioEngine } from "../audio/audio";
import {
  wp, WHEEL, TIANHENG as TH, SHUHENG as SH, LEVER_N, CROWN, SHAFT, GLOBE, ARMIL, JACK, type V3,
} from "../sim/layout";

type Mech = ReturnType<typeof buildMechanism>;
type Key = { t: number; p: V3; q: V3; fov?: number };

export const FILM_END = 31.6;

interface Shot {
  id: string;
  t0: number;
  t1: number;
  keys: Key[];
  focus: Partial<Record<GlowKey, number>>;
}

const SHOTS: Shot[] = [
  {
    id: "open", t0: 0, t1: 3.8,
    keys: [
      { t: 0, p: [25, 3.2, 17], q: [-1.7, 5.8, 2.0], fov: 36 },
      { t: 3.8, p: [16.5, 5.0, 9.5], q: [-1.2, 6.0, 1.4], fov: 36 },
    ],
    focus: { wheel: 0.4, shaft: 0.4 },
  },
  {
    id: "water", t0: 3.8, t1: 7.8,
    keys: [
      { t: 3.8, p: [4.5, 4.05, -2.75], q: [0.85, 3.25, -2.3], fov: 40 },
      { t: 5.8, p: [4.4, 3.75, -2.45], q: [0.9, 3.0, -2.05], fov: 40 },
      { t: 7.8, p: [5.0, 3.2, -2.0], q: [0.95, 2.75, -1.7], fov: 40 },
    ],
    focus: { water: 1, scoop: 1 },
  },
  {
    id: "escape", t0: 7.8, t1: 16.3,
    keys: [
      { t: 7.8, p: [6.0, 2.8, -1.25], q: [1.2, 2.66, -1.25], fov: 42 },
      { t: 12.0, p: [5.6, 2.8, -1.3], q: [1.2, 2.66, -1.3], fov: 42 },
      { t: 16.3, p: [5.9, 2.9, -0.9], q: [1.1, 2.66, -0.95], fov: 42 },
    ],
    focus: { scoop: 1, shuheng: 1, rope: 1, tianheng: 1, wheel: 1, water: 0.6 },
  },
  {
    id: "gear", t0: 16.3, t1: 19.8,
    keys: [
      { t: 16.3, p: [-1.8, 3.15, 1.6], q: [0.05, 2.95, -0.05], fov: 46 },
      { t: 18.0, p: [-1.75, 3.35, 1.7], q: [-0.05, 3.05, -0.05], fov: 46 },
      { t: 19.8, p: [-1.6, 3.85, 1.75], q: [-0.4, 3.75, -0.1], fov: 46 },
    ],
    focus: { wheel: 1, crown: 1, shaft: 1 },
  },
  {
    id: "sky", t0: 19.8, t1: 22.0,
    keys: [
      { t: 19.8, p: [3.7, 7.55, 2.3], q: [-0.5, 7.45, -0.8], fov: 42 },
      { t: 22.0, p: [3.9, 8.2, 1.3], q: [-0.5, 7.75, -1.1], fov: 42 },
    ],
    focus: { shaft: 1, globe: 1, armil: 1 },
  },
  {
    id: "armil", t0: 22.0, t1: 23.8,
    keys: [
      { t: 22.0, p: [4.7, 11.15, -0.3], q: [-0.5, 10.45, -1.55], fov: 42 },
      { t: 23.8, p: [4.0, 11.45, -1.0], q: [-0.5, 10.4, -1.7], fov: 42 },
    ],
    focus: { shaft: 1, armil: 1 },
  },
  {
    id: "jacks", t0: 23.8, t1: 28.0,
    keys: [
      { t: 23.8, p: [5.2, 5.85, 1.4], q: [0.85, 5.55, -0.1], fov: 38 },
      { t: 28.0, p: [4.5, 5.7, 0.7], q: [0.85, 5.6, -0.1], fov: 38 },
    ],
    focus: { jacks: 1, shaft: 0.6 },
  },
  {
    id: "end", t0: 28.0, t1: FILM_END + 2,
    keys: [
      { t: 28.0, p: [10.5, 6.2, 7.0], q: [-1.45, 6.2, 1.5], fov: 40 },
      { t: 31.6, p: [21, 7.5, 15], q: [-2.9, 6.6, 3.5], fov: 38 },
      { t: 33.6, p: [23, 7.8, 16.5], q: [-3.1, 6.6, 3.8], fov: 38 },
    ],
    focus: { wheel: 0.6, shaft: 0.6, globe: 0.6, armil: 0.6, jacks: 0.6 },
  },
];

const CAPTIONS: { t0: number; t1: number; html: string; stage?: string }[] = [
  { t0: 4.0, t1: 5.85, html: `<span class="num">1</span><b>天池</b>的水流进<b>平水壶</b>；平水壶水位不变，所以出水又细又匀。` },
  { t0: 5.9, t1: 7.8, html: `水一滴一滴，落进大水轮（<b>枢轮</b>）边上的<b>受水壶</b>。` },
  { t0: 8.0, t1: 16.3, stage: "A", html: `<span class="num">2</span>受水壶搁在秤杆（<b>枢衡</b>）的格叉上，另一头挂着配重（<b>枢权</b>）：水不够重，秤不动。` },
  { t0: 8.0, t1: 16.3, stage: "B", html: `<span class="num">3</span>水够重了！格叉被压下，拉紧<b>天条</b> → <b>天衡</b>翘起 → <b>天关</b>抬开` },
  { t0: 8.0, t1: 16.3, stage: "C", html: `<span class="num">4</span>满壶的重量带着枢轮转过一格（30°），<b>天关</b>落回卡住下一齿：一停一走，就是<b>“擒纵”</b>。` },
  { t0: 16.45, t1: 19.8, html: `<span class="num">5</span>枢轮每走一格，轴端齿轮（<b>地轂</b>）就拨着竖立的<b>天柱</b>同转一格。` },
  { t0: 20.0, t1: 23.8, html: `<span class="num">6</span>天柱直通楼顶，用齿轮带动<b>浑象</b>和<b>浑仪</b>，与星空同步旋转。` },
  { t0: 24.0, t1: 28.0, html: `<span class="num">7</span>天柱还转动<b>木阁</b>机轮：木人举出时辰牌，拨钉拨动木人<b>击鼓</b>、<b>敲钟</b>。` },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

export class Director {
  ft = 0;
  rate = 1; // physics time per film time
  private rateTarget = 1;
  private stage: "A" | "B" | "C" = "A";
  private stageT = 0;
  stageLog: string[] = [];
  get stageInfo() {
    return `${this.stage} ${this.stageLog.join(" ")}${this.slowDone ? " slowDone@" + this.slowDoneT.toFixed(2) : ""}`;
  }
  private slowDoneT = 0;
  private sawRelease = false;
  private lockedSince = -1;
  private shot: Shot = SHOTS[0];
  private captionKey = "";
  private labels: { l: Label; shots: string[]; anchor: () => V3 | null; hot?: () => boolean; sub?: () => string }[] = [];
  private evIdx = 0;
  private tmp = new THREE.Vector3();
  private lastTickAngle = 0;
  private ended = false;
  onEnd: (() => void) | null = null;

  constructor(
    private camera: THREE.PerspectiveCamera,
    private sim: Sim,
    private mech: Mech,
    private ui: UI,
    private audio: AudioEngine | null,
  ) {
    this.buildLabels();
    this.evIdx = sim.events.length;
    this.lastTickAngle = sim.shaftAngle;
  }

  private bodyPoint(b: { translation(): { x: number; y: number; z: number }; rotation(): { x: number; y: number; z: number; w: number } }, local: V3): V3 {
    const t = b.translation(), q = b.rotation();
    const v = this.tmp.set(local[0], local[1], local[2]).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));
    return [v.x + t.x, v.y + t.y, v.z + t.z];
  }

  private buildLabels() {
    const s = this.sim, root = this.ui.labels;
    const add = (text: string, dx: number, dy: number, shots: string[], anchor: () => V3 | null, hot?: () => boolean, sub?: () => string) => {
      const l = new Label(root, text, dx, dy, sub ? "" : undefined);
      this.labels.push({ l, shots, anchor, hot, sub });
    };
    const g = (k: GlowKey) => () => this.mech.glowLevel[k] > 0.25;
    const thOrigin = (() => { const t = s.tianheng.translation(); return [t.x, t.y, t.z] as V3; })();
    const shOrigin = (() => { const t = s.shuheng.translation(); return [t.x, t.y, t.z] as V3; })();
    const relTH = (u: number, v: number, n = LEVER_N): V3 => {
      const w = wp(u, v, n);
      return [w[0] - thOrigin[0], w[1] - thOrigin[1], w[2] - thOrigin[2]];
    };
    const relSH = (u: number, v: number, n = LEVER_N): V3 => {
      const w = wp(u, v, n);
      return [w[0] - shOrigin[0], w[1] - shOrigin[1], w[2] - shOrigin[2]];
    };
    const fillingScoopPoint = (): V3 => {
      const k = s.fillingScoop();
      const b = s.scoops[k].body;
      const t = b.translation();
      return [t.x, t.y + 0.1, t.z - 0.3];
    };
    add("天池", 40, -36, ["water"], () => [0.8, 4.3, -2.75]);
    add("平水壶", 60, -10, ["water"], () => [0.8, 3.56, -2.25]);
    add("受水壶", -60, 46, ["water", "escape:A", "escape:B"], fillingScoopPoint, undefined, () => {
      const kg = s.waterIn(s.fillingScoop()) * s.dropMass;
      return `水重 ${kg.toFixed(1)} 千克`;
    });
    add("枢轮", -50, -40, ["water"], () => wp(-0.2, 1.4, 0.3));
    add("格叉", -70, 50, ["escape:A", "escape:B"], () => this.bodyPoint(s.shuheng, relSH(SH.forkU, SH.forkV, 0.3)), g("shuheng"));
    add("枢衡 · 秤杆", 70, 40, ["escape:A", "escape:B"], () => this.bodyPoint(s.shuheng, relSH(SH.pivot.u, SH.pivot.v)), g("shuheng"));
    add("枢权 · 配重", -80, 30, ["escape:A", "escape:B"], () => this.bodyPoint(s.shuheng, relSH(SH.counterU, SH.counterV - 0.12)), g("shuheng"));
    add("天条", 60, 0, ["escape:A", "escape:B"], () => {
      const a = this.bodyPoint(s.tianheng, relTH(TH.ropeU, TH.ropeV));
      const b = this.bodyPoint(s.shuheng, relSH(SH.ropeU, SH.ropeV));
      return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 0.2, (a[2] + b[2]) / 2];
    }, g("rope"));
    add("天衡", 50, 46, ["escape:B", "escape:C"], () => this.bodyPoint(s.tianheng, relTH(1.0, TH.beamV)), g("tianheng"));
    add("天关", -110, 70, ["escape:B", "escape:C"], () => this.bodyPoint(s.tianheng, relTH(TH.tip.u, TH.tip.v + 0.05, 0.5)), g("tianheng"));
    add("枢轮", -70, -10, ["escape:C"], () => wp(-0.9, 0.9, 0.3), g("wheel"));
    add("退水壶", 60, -30, ["escape:C"], () => [1.3, 0.42, -1.2]);
    add("地轂 · 齿轮", -60, 50, ["gear"], () => [CROWN.n + WHEEL.x + 0.1, WHEEL.y + 0.62, 0.15], g("crown"));
    add("天柱", -60, -40, ["gear", "sky"], () => [SHAFT.x, this.shot.id === "sky" ? 7.0 : 3.45, SHAFT.z], g("shaft"));
    add("枢轮", 60, 40, ["gear"], () => wp(-1.2, -0.6, -0.26), g("wheel"));
    add("浑象 · 天球", 70, 30, ["sky"], () => [GLOBE.center[0], GLOBE.center[1] + 0.3, GLOBE.center[2] + 0.5], g("globe"));
    add("齿轮", 50, 40, ["sky"], () => [GLOBE.P[0], GLOBE.P[1], GLOBE.P[2] + 0.1], g("globe"));
    add("浑仪", 70, -20, ["armil"], () => [ARMIL.center[0], ARMIL.center[1] + 0.5, ARMIL.center[2] + 0.6], g("armil"));
    add("齿轮", -60, 40, ["armil"], () => [ARMIL.P[0], ARMIL.P[1], ARMIL.P[2] + 0.1], g("armil"));
    add("时辰牌", -70, 50, ["jacks"], () => [JACK.plaqueR - 0.5 + SHAFT.x + 0.15, JACK.plaqueY + 0.45, 0], g("jacks"));
    const strikerPoint = (kind: "drum" | "bell"): V3 => {
      const st = s.strikers.find((x) => x.kind === kind)!;
      return [st.target[0], st.target[1] + 0.15, st.target[2]];
    };
    add("击鼓", 60, -50, ["jacks"], () => strikerPoint("drum"), () => this.strikeHot("drum"));
    add("敲钟", -60, -50, ["jacks"], () => strikerPoint("bell"), () => this.strikeHot("bell"));
  }

  private strikeT: Record<string, number> = { drum: -9, bell: -9 };
  private strikeHot(k: "drum" | "bell") {
    return this.ft - this.strikeT[k] < 0.6;
  }

  get done() {
    return this.ended;
  }

  /** advance film time by dtFilm (physics is stepped by the caller by dtFilm·rate) */
  update(dtFilm: number, audioNow?: number) {
    this.ft += dtFilm;
    const ft = this.ft;
    const s = this.sim;
    const prevShot = this.shot;
    this.shot = SHOTS.find((x) => ft >= x.t0 && ft < x.t1) ?? SHOTS[SHOTS.length - 1];
    if (this.shot !== prevShot && ft > 1) this.audio?.whoosh(0.6);

    // ── camera ──
    const keys = this.shot.keys;
    let i = 0;
    while (i < keys.length - 2 && ft > keys[i + 1].t) i++;
    const k0 = keys[Math.max(0, i - 1)], k1 = keys[i], k2 = keys[Math.min(keys.length - 1, i + 1)], k3 = keys[Math.min(keys.length - 1, i + 2)];
    const u = keys.length === 1 ? 0 : clamp((ft - k1.t) / Math.max(1e-3, k2.t - k1.t), 0, 1);
    // ease only at the shot's ends
    const te = keys.length <= 2 ? smooth(u) * 0.5 + u * 0.5 : u;
    const cp = (j: 0 | 1 | 2) => catmull(k0.p[j], k1.p[j], k2.p[j], k3.p[j], te);
    const cq = (j: 0 | 1 | 2) => catmull(k0.q[j], k1.q[j], k2.q[j], k3.q[j], te);
    let fov = lerp(k1.fov ?? 40, k2.fov ?? 40, te);
    if (this.shot.id === "escape") {
      // the escapement camera follows the chain of cause and effect
      const pose = this.escapePose(ft);
      const first = this.prevShot !== "escape";
      const k = first ? 1 : 1 - Math.exp(-dtFilm * 2.2);
      for (let j = 0; j < 3; j++) {
        this.camP[j] += (pose.p[j] - this.camP[j]) * k;
        this.camQ[j] += (pose.q[j] - this.camQ[j]) * k;
      }
      this.camera.position.set(this.camP[0], this.camP[1], this.camP[2]);
      this.camera.lookAt(this.camQ[0], this.camQ[1], this.camQ[2]);
      fov = pose.fov;
    } else {
      this.camera.position.set(cp(0), cp(1), cp(2));
      this.camera.lookAt(cq(0), cq(1), cq(2));
    }
    this.prevShot = this.shot.id;
    if (Math.abs(this.camera.fov - fov) > 1e-3) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }

    // ── physical state for the story ──
    const wheelW = Math.abs(s.wheel.angvel().x);
    const lift = s.lockLift();
    // a real trip: the steelyard tips while the wheel is held and the scoop is
    // well filled (not the brief jolt of a scoop landing on the fork)
    // (the chain has taken up its slack and the lock is starting to rise)
    const tipping = s.shuhengAngle() < -0.05 && lift > 0.008 && wheelW < 0.05 && s.waterIn(s.fillingScoop()) >= 9;
    if (this.shot.id === "escape") {
      if (this.stage === "A" && tipping && ft > 9.4) {
        this.stage = "B";
        this.stageT = ft;
        this.sawRelease = false;
        this.stageLog.push(`B@${ft.toFixed(2)}`);
      } else if (this.stage === "B" && (lift > 0.1 || wheelW > 0.08)) {
        this.sawRelease = true;
        if (wheelW > 0.08 && ft - this.stageT > 1.2) {
          this.stage = "C";
          this.stageT = ft;
          this.stageLog.push(`C@${ft.toFixed(2)}`);
        }
      }
    }
    // playback rate of simulated time
    if (this.shot.id === "escape" && (this.stage === "B" || this.stage === "C") && !this.slowDone) {
      // deep slow motion for the trip itself; if the release takes longer
      // (more water still needed), let time run faster again
      const inB = ft - this.stageT;
      this.rateTarget = this.stage === "B" ? (inB < 1.2 ? 0.25 : 0.7) : 0.75;
      if (this.stage === "C" && this.sawRelease && wheelW < 0.02 && lift < 0.02) {
        if (this.lockedSince < 0) this.lockedSince = ft;
        if (ft - this.lockedSince > 0.35) {
          this.slowDone = true;
          this.slowDoneT = ft;
        }
      }
    } else if (ft > 2.5 && ft < 10.6 && this.stage === "A") {
      this.rateTarget = this.steer(ft);
    } else {
      this.rateTarget = 1;
    }
    this.rate += (this.rateTarget - this.rate) * (1 - Math.exp(-dtFilm * (this.rateTarget < this.rate ? 9 : 3)));

    // ── glow focus ──
    for (const key of Object.keys(this.mech.focus) as GlowKey[]) {
      const f = this.shot.focus[key] ?? 0.25;
      this.mech.focus[key] += (f - this.mech.focus[key]) * (1 - Math.exp(-dtFilm * 4));
    }

    // ── overlay ──
    const U = this.ui;
    U.title.classList.toggle("on", ft > 0.35 && ft < 3.45);
    let cap = "";
    let capKey = "";
    for (const c of CAPTIONS) {
      if (ft >= c.t0 && ft < c.t1 && (!c.stage || c.stage === this.stage)) {
        cap = c.html;
        capKey = c.t0 + (c.stage ?? "");
      }
    }
    if (capKey !== this.captionKey) {
      this.captionKey = capKey;
      U.caption.classList.remove("on");
      if (cap) {
        const html = cap;
        setTimeout(() => {
          if (this.captionKey === capKey) {
            U.caption.innerHTML = html;
            U.caption.classList.add("on");
          }
        }, 180);
      }
    }
    U.chain.classList.toggle("on", ft > 4.2 && ft < 28.2);
    U.note.classList.toggle("on", ft > 4.2 && ft < 28.2);
    U.badge.classList.toggle("on", this.rate < 0.8 && this.shot.id === "escape");
    U.badge.textContent = `慢放 ×${(Math.round(this.rateTarget * 20) / 20).toFixed(2).replace(/0$/, "")}`;
    U.end.classList.toggle("on", ft > 28.9);
    U.timebar.style.width = `${clamp(ft / FILM_END, 0, 1) * 100}%`;
    const gl = this.mech.glowLevel;
    const lvl: Record<string, number> = {
      water: 0.9, scoop: Math.min(1, s.waterIn(s.fillingScoop()) / 12), shuheng: gl.shuheng * 1.5, rope: gl.rope * 1.5,
      tianheng: gl.tianheng * 1.5, wheel: gl.wheel * 1.4, shaft: gl.shaft * 1.4, sky: Math.max(gl.globe, gl.armil) * 1.4, jacks: gl.jacks * 1.4,
    };
    for (const [k, node] of Object.entries(U.chainNodes)) {
      const v = clamp(lvl[k] ?? 0, 0, 1);
      node.style.background = `rgba(${Math.round(lerp(20, 190, v))},${Math.round(lerp(16, 70, v))},${Math.round(lerp(12, 20, v))},${lerp(0.55, 0.92, v)})`;
      node.style.color = `rgba(255,${Math.round(lerp(240, 236, v))},${Math.round(lerp(220, 200, v))},${lerp(0.55, 1, v)})`;
      node.style.boxShadow = v > 0.4 ? `0 0 ${Math.round(v * 14)}px rgba(255,140,50,${v * 0.7})` : "none";
    }
    this.updateLabels();

    // ── sound from physics events ──
    this.consumeEvents();
    if (this.audio && audioNow !== undefined) {
      const cam = this.camera.position;
      const near = (p: V3, r = 4) => 1 / (1 + Math.max(0, Math.hypot(cam.x - p[0], cam.y - p[1], cam.z - p[2]) - r) / 3);
      this.audio.setBeds(near(s.spout, 3) * (this.ended ? 0 : 1), Math.min(1, wheelW * 1.6) * near([WHEEL.x, WHEEL.y, WHEEL.z], 4));
      // gear ticks: one per lantern rung passing
      const da = s.shaftAngle - this.lastTickAngle;
      const rung = (Math.PI * 2) / 24;
      if (Math.abs(da) > rung) {
        this.lastTickAngle += Math.sign(da) * rung;
        this.audio.tick(near([SHAFT.x, 3.0, SHAFT.z], 3) * 0.8);
      }
    }
    if (!this.ended && ft >= FILM_END) {
      this.ended = true;
      this.onEnd?.();
    }
  }

  private slowDone = false;
  private prevShot = "";
  private camP: V3 = [0, 0, 0];
  private camQ: V3 = [0, 0, 0];

  /** where the escapement camera wants to be, given the physical stage */
  private escapePose(ft: number): { p: V3; q: V3; fov: number } {
    const since = ft - this.stageT;
    if (this.stage === "A") {
      // weighing: scoop, fork, steelyard and counterweight; slow drift in
      const d = clamp((ft - 7.8) / 3, 0, 1);
      return { p: [lerp(4.9, 4.45, d), 2.35, lerp(-1.85, -1.75, d)], q: [1.2, 2.1, -1.6], fov: 40 };
    }
    if (this.stage === "B") {
      // trip: follow the chain up to the balance and the lock
      const d = smooth(clamp(since / 1.4, 0, 1));
      return { p: [lerp(4.45, 4.7, d), lerp(2.35, 3.45, d), lerp(-1.75, -1.2, d)], q: [lerp(1.2, 1.2, d), lerp(2.1, 3.5, d), lerp(-1.6, -0.9, d)], fov: 40 };
    }
    // C: pull back to see the wheel turn one step and the lock catch a tooth
    return { p: [6.3, 3.05, -0.75], q: [1.0, 2.75, -0.75], fov: 42 };
  }

  /** time-warp before the escapement shot so that a trip lands near ft≈10.9 */
  private steer(ft: number) {
    const s = this.sim;
    const target = 11.0;
    const wheelW = Math.abs(s.wheel.angvel().x);
    const n = s.waterIn(s.fillingScoop());
    const R = (wheelW > 0.05 || s.lockLift() > 0.03 ? 1.1 : 0) + Math.max(0.1, (15 - n) / 9);
    const left = Math.max(0.25, target - ft);
    const P = 2.85;
    let best = 1, bestErr = 1e9;
    for (let k = 0; k < 5; k++) {
      const r = (R + k * P) / left;
      const err = Math.abs(Math.log(r));
      if (err < bestErr) { bestErr = err; best = r; }
    }
    return clamp(best, 0.6, 1.6);
  }

  private consumeEvents() {
    const ev = this.sim.events;
    const A = this.audio;
    const cam = this.camera.position;
    const near = (p: V3, r = 3) => 1 / (1 + Math.max(0, Math.hypot(cam.x - p[0], cam.y - p[1], cam.z - p[2]) - r) / 2.5);
    for (; this.evIdx < ev.length; this.evIdx++) {
      const e: SimEvent = ev[this.evIdx];
      if (e.type === "strike" && e.speed > 0.4) {
        this.strikeT[e.which] = this.ft;
        this.eventLog.push(`${e.which === "drum" ? "鼓" : "钟"}${this.ft.toFixed(1)}`);
      } else if (e.type === "lock" && e.speed > 0.04) this.eventLog.push(`锁${this.ft.toFixed(1)}`);
      if (!A) continue;
      switch (e.type) {
        case "drop":
          if (e.where === "scoop") A.drip(near(this.sim.spout, 2) * Math.min(1, e.speed / 2.5));
          else if (Math.random() < 0.4) A.splash(near([0.8, 0.3, -1.0], 3) * 0.6);
          break;
        case "lock":
          if (e.speed > 0.04) A.clack(Math.min(1, 0.35 + e.speed) * near(wp(0, 1.5, 0.42), 2.5), 1);
          break;
        case "fork":
          if (e.speed > 0.05) A.clack(0.35 * near(wp(1.8, -0.2, 0.3), 2.5), 0.55);
          break;
        case "trip":
          A.creak(near(wp(1.7, -0.5, 0.6), 2.5));
          break;
        case "strike":
          if (e.speed > 0.4) {
            const st = this.sim.strikers.find((x) => x.kind === e.which)!;
            const v = Math.min(1, e.speed / 1.8) * near(st.target, 2.5);
            if (e.which === "drum") A.drum(v);
            else A.bell(v);
          }
          break;
      }
    }
  }
  /** film-time log of locks and strikes (for checks) */
  eventLog: string[] = [];

  private updateLabels() {
    const w = window.innerWidth, h = window.innerHeight;
    for (const L of this.labels) {
      const visibleShot = L.shots.includes(this.shot.id) || L.shots.includes(this.shot.id + ":" + this.stage);
      const inShot = visibleShot ? this.ft - this.shot.t0 : 0;
      let on = visibleShot && inShot > 0.5 && this.shot.t1 - this.ft > 0.3;
      if (on) {
        const a = L.anchor();
        if (!a) on = false;
        else {
          const p = this.tmp.set(a[0], a[1], a[2]).project(this.camera);
          if (p.z > 1 || p.z < -1 || Math.abs(p.x) > 0.92 || p.y > 0.8 || p.y < -0.62) on = false;
          else L.l.at((p.x * 0.5 + 0.5) * w, (-p.y * 0.5 + 0.5) * h);
        }
      }
      L.l.show(on);
      if (on) {
        if (L.hot) L.l.hot(L.hot());
        if (L.sub) L.l.setSub(L.sub());
        L.l.place();
      }
    }
  }
}

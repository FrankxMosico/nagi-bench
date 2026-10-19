// 影片控制：镜头、字幕、标注、因果链、剖切、高亮、片头片尾、速度标记、声音事件。
import * as THREE from 'three';
import type { Sim, SimEvent } from '../sim/sim';
import type { View } from '../view';
import { PlaneFrame } from '../sim/core';
import { ESC } from '../sim/escapement';
import { SHOTS, CAPTIONS, TITLE, END, CUT, CHAIN_NODES, CHAIN_STEPS, CHAIN_SHOW, LABELS, ARROWS, LITE_LAMP, type CamKey } from './script';
import { Labels } from './labels';
import { Arrows } from './arrows';
import { segmentScaleAt, FILM_LENGTH } from './schedule';
import { AudioEngine } from '../audio/audio';

const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const smoother = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export class Film {
  private labels: Labels;
  private arrows: Arrows;
  private fadeEl = document.getElementById('fade') as HTMLDivElement;
  private capEl = document.querySelector('#caption') as HTMLDivElement;
  private capInner = document.querySelector('#caption .cap-inner') as HTMLDivElement;
  private chainEl = document.getElementById('chain') as HTMLDivElement;
  private chainNodes: HTMLSpanElement[] = [];
  private titleEl = document.getElementById('titlecard') as HTMLDivElement;
  private endEl = document.getElementById('endcard') as HTMLDivElement;
  private speedEl = document.getElementById('speed') as HTMLDivElement;
  private replayBtn = document.getElementById('replay') as HTMLButtonElement;
  private soundBtn = document.getElementById('sound') as HTMLButtonElement;
  private curCap = -2;
  private curSpeed = '';
  private hlLevel = new Map<string, number>();
  private camPos = new THREE.Vector3();
  private camLook = new THREE.Vector3();
  audio: AudioEngine;
  onRestart: (() => void) | null = null;
  private ended = false;
  private filmT = 0;

  constructor(private view: View, private sim: Sim) {
    this.labels = new Labels(document.getElementById('labels')!, document.getElementById('leaders') as unknown as SVGSVGElement, LABELS);
    this.arrows = new Arrows(document.getElementById('leaders') as unknown as SVGSVGElement, ARROWS, view.lite);
    // 因果链
    CHAIN_NODES.forEach((n, i) => {
      if (i) { const a = document.createElement('span'); a.className = 'a'; a.textContent = '→'; this.chainEl.appendChild(a); }
      const s = document.createElement('span'); s.className = 'n'; s.textContent = n;
      this.chainEl.appendChild(s); this.chainNodes.push(s);
    });
    this.titleEl.innerHTML = `<div class="t1">水运仪象台</div><div class="t2">北宋 · 苏颂 · 1088—1092</div><div class="t3">高约 12 米的水力天文钟楼 —— 一股水，如何按时报时？</div><div class="seal">物理实时演算</div>`;
    this.endEl.innerHTML = `<div class="e1">以<em>水</em>为力，以<em>天衡</em>定时</div><div class="e2">世界上最早的擒纵机构之一，比欧洲机械钟早约两百年</div><div class="e3">据苏颂《新仪象法要》复原示意 · 全部机械运动由 Rapier 物理引擎实时计算 · 演示已加速</div>`;
    this.audio = new AudioEngine();
    this.replayBtn.addEventListener('click', () => this.restart(true));
    const unlock = () => this.restart(true);
    this.soundBtn.addEventListener('click', unlock);
    this.audio.ready.then((running) => { if (!running) this.soundBtn.hidden = false; });
  }

  rebind(view: View, sim: Sim) { this.view = view; this.sim = sim; this.ended = false; this.curCap = -2; this.hlLevel.clear(); this.audio.restart(); }

  private restart(withSound: boolean) {
    this.soundBtn.hidden = true;
    this.replayBtn.hidden = true;
    if (withSound) this.audio.resume();
    this.onRestart?.();
  }

  /** 仿真事件 -> 声音（silent=true 时只用于预跳，不出声） */
  onEvents(events: SimEvent[], silent = false) {
    if (silent) return;
    for (const e of events) this.audio.event(e, this.filmT, this.view.stage.camera.position);
  }

  private shotCamera(t: number): { pos: THREE.Vector3; look: THREE.Vector3; fov: number } {
    let shot = SHOTS[SHOTS.length - 1];
    for (const s of SHOTS) if (t >= s.keys[0].t && t <= s.keys[s.keys.length - 1].t) { shot = s; break; }
    if (t > SHOTS[SHOTS.length - 1].keys.at(-1)!.t) shot = SHOTS[SHOTS.length - 1];
    const ks = shot.keys;
    let a: CamKey = ks[0], b: CamKey = ks[ks.length - 1];
    for (let i = 0; i < ks.length - 1; i++) if (t >= ks[i].t && t <= ks[i + 1].t) { a = ks[i]; b = ks[i + 1]; break; }
    if (t >= ks[ks.length - 1].t) { a = b = ks[ks.length - 1]; }
    const u = a === b ? 0 : smoother((t - a.t) / (b.t - a.t));
    const pos = new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), u);
    const look = new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), u);
    const fov = (a.fov ?? 40) + ((b.fov ?? 40) - (a.fov ?? 40)) * u;
    // 片尾之后：缓慢环绕
    if (t > FILM_LENGTH) {
      const k = (t - FILM_LENGTH) * 0.06;
      const r = Math.hypot(pos.x, pos.z);
      const a0 = Math.atan2(pos.z, pos.x) + k;
      pos.set(Math.cos(a0) * r, pos.y, Math.sin(a0) * r);
    }
    return { pos, look, fov };
  }

  private liteLamp(t: number): THREE.Vector3 {
    const ks = LITE_LAMP;
    let i = 0;
    while (i < ks.length - 1 && t >= ks[i + 1].t) i++;
    const a = ks[i], b = ks[i + 1];
    if (!b || b.jump) return new THREE.Vector3(...a.pos);
    return new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), smoother((t - a.t) / (b.t - a.t)));
  }

  update(t: number) {
    this.filmT = t;
    const v = this.view, sim = this.sim;
    const cam = v.stage.camera;
    // ---- 镜头（叠加轻微手持感的呼吸）
    const c = this.shotCamera(t);
    const breath = new THREE.Vector3(Math.sin(t * 0.7) * 0.012, Math.sin(t * 0.53 + 1) * 0.01, 0);
    this.camPos.copy(c.pos).add(breath);
    this.camLook.copy(c.look);
    cam.position.copy(this.camPos);
    cam.lookAt(this.camLook);
    if (Math.abs(cam.fov - c.fov) > 1e-3) { cam.fov = c.fov; cam.updateProjectionMatrix(); }
    // 星空随浑象转动（同一个物理角度），开场时也缓缓旋转
    const ga = this.polarAngle(sim.inst[0].body.rotation());
    v.stage.stars.quaternion.setFromAxisAngle(v.stage.starAxis, ga);
    // ---- 剖切；剖开时室内灯火随之亮起
    const cut = smooth((t - CUT.t0) / (CUT.t1 - CUT.t0));
    v.tower.setCut(cut);
    const lampK = 0.3 + 0.7 * cut;
    for (const l of v.stage.lights.lamps) l.intensity = (l.userData.base as number) * lampK;
    if (v.lite) v.stage.lights.lamps[0].position.copy(this.liteLamp(t));
    // ---- 片头 / 片尾
    const titleOp = t < TITLE.t0 ? 0 : t < TITLE.t1 ? 1 : 0;
    this.titleEl.style.opacity = String(titleOp);
    this.endEl.style.opacity = t >= END.t0 ? '1' : '0';
    if (t > FILM_LENGTH + 0.3 && !this.ended) { this.ended = true; this.replayBtn.hidden = false; }
    // ---- 字幕
    let ci = -1;
    for (let i = 0; i < CAPTIONS.length; i++) if (t >= CAPTIONS[i].t0 && t <= CAPTIONS[i].t1) ci = i;
    if (ci !== this.curCap) {
      this.curCap = ci;
      if (ci >= 0) {
        const cp = CAPTIONS[ci];
        this.capInner.innerHTML = `${cp.num ? `<span class="num">${cp.num}</span>` : ''}<span>${cp.html}</span>`;
        this.capEl.style.opacity = '1';
      } else this.capEl.style.opacity = '0';
    }
    // ---- 因果链
    this.chainEl.style.opacity = t >= CHAIN_SHOW.t0 && t <= CHAIN_SHOW.t1 ? '1' : '0';
    let on: number[] = [];
    let maxOn = -1;
    for (const s of CHAIN_STEPS) {
      if (t >= s.t0 && t < s.t1) on = s.on;
      if (t >= s.t0) maxOn = Math.max(maxOn, ...s.on);
    }
    this.chainNodes.forEach((n, i) => {
      n.classList.toggle('on', on.includes(i));
      n.classList.toggle('done', !on.includes(i) && i <= maxOn);
    });
    // ---- 速度标记
    const sc = segmentScaleAt(t);
    const lab = t > FILM_LENGTH ? '' : sc < 0.8 ? '◀ 慢放演示' : sc > 1.3 ? `▶▶ 加速 ×${sc}` : '';
    if (lab !== this.curSpeed) { this.curSpeed = lab; if (lab) this.speedEl.textContent = lab; this.speedEl.style.opacity = lab ? '1' : '0'; }
    // ---- 高亮（由真实运动驱动）
    this.updateHighlights(t);
    // ---- 标注
    const anchors = { ...v.tower.anchors, ...v.mech.anchors, scoop: () => this.stationScoopPos() };
    this.labels.update(t, cam, anchors, (n) => this.hlLevel.get(n) ?? 0);
    this.arrows.update(t, cam, anchors, (n) => this.drive(n));
    // 片头由黑渐显
    this.fadeEl.style.opacity = t < 0.8 ? String(1 - smooth(t / 0.8)) : '0';
    // ---- 声音
    this.audio.update(t, cam.position, sim);
  }

  private polarAngle(q: { x: number; y: number; z: number; w: number }): number {
    const P = { x: 0, y: Math.sin(35 * Math.PI / 180), z: -Math.cos(35 * Math.PI / 180) };
    return 2 * Math.atan2(q.x * P.x + q.y * P.y + q.z * P.z, q.w);
  }

  /** 当前处在受水位的水斗（随枢轮步进变化） */
  private stationScoopPos(): THREE.Vector3 {
    const wa = PlaneFrame.angleOf(this.sim.esc.wheel.rotation());
    const k = ((Math.round(-wa / ESC.pitch) % ESC.N) + ESC.N) % ESC.N;
    const sc = this.view.mech.parts.scoops[k];
    return sc.localToWorld(new THREE.Vector3(0, 0.12, -0.06));
  }

  private setHL(name: string, level: number) {
    this.hlLevel.set(name, level);
    this.view.hl.set(name, level);
  }

  private updateHighlights(t: number) {
    const sim = this.sim, esc = sim.esc;
    const win = (a: number, b: number) => clamp01(Math.min((t - a) / 0.3, (b - t) / 0.3));
    // 擒纵段：亮度跟随各部件的实际运动
    const inEsc = win(10.5, 20.5);
    const fork = PlaneFrame.angleOf(esc.fork.rotation());
    const upper = -PlaneFrame.angleOf(esc.upper.rotation());
    const lockLift = esc.lock.translation().y - (ESC.origin.y + esc.geo.lockBottom[1]);
    const w = Math.abs(esc.wheel.angvel().x);
    const fill = sim.water.vol[this.stationIndex()] / 0.0068;
    const pulse = 0.5 + 0.5 * Math.sin(t * 6);
    // 因果链上的每一环，在它真正动起来的那一刻发光
    this.setHL('scoop0', 0);
    this.setHL('fork', inEsc * clamp01(fork / 0.012 + (t > 10.9 && t < 12.3 ? 0.3 * pulse : 0)));
    this.setHL('chain', inEsc * clamp01(fork / 0.014));
    this.setHL('upper', inEsc * clamp01(upper / 0.045));
    this.setHL('lock', inEsc * clamp01(lockLift / 0.025 + (t > 15.6 && t < 16.8 ? 0.5 : 0)));
    this.setHL('pawls', 0);
    this.setHL('wheel', 0);
    this.setHL('water', 0);
    // 传动段：天柱、机轮只在真正转动时发光
    const tzW = Math.abs(sim.drv.tianzhu.angvel().y), jlW = Math.abs(sim.drv.jilun.angvel().y);
    this.setHL('tianzhu', win(20.7, 22.9) * 0.45 * clamp01(tzW / 0.1));
    this.setHL('jilun', win(20.7, 22.9) * 0.45 * clamp01(jlW / 0.05));
    this.setHL('figures', win(23.9, 28.3) * 0.3);
    this.setHL('globe', win(28.55, 30.3) * 0.12);
    this.setHL('armillary', win(28.85, 30.3) * 0.18);
    void fill; void w;
  }

  /** 运动箭头的活跃度：直接取自仿真中各部件的运动状态 */
  private drive(name: string): number {
    const sim = this.sim, esc = sim.esc;
    switch (name) {
      case 'fork': {
        const a = PlaneFrame.angleOf(esc.fork.rotation());
        const w = esc.fork.angvel().x;
        return clamp01(a / 0.012) * (w < -0.05 ? 0.2 : 1);
      }
      case 'upper': {
        const a = -PlaneFrame.angleOf(esc.upper.rotation());
        const w = -esc.upper.angvel().x;
        return clamp01(a / 0.04) * (w < -0.08 ? 0.2 : 1);
      }
      // 设门限，滤掉天关到顶/落座时毫米级的回弹
      case 'lockUp': return clamp01((esc.lock.linvel().y - 0.04) / 0.06);
      case 'lockDown': return clamp01((-esc.lock.linvel().y - 0.12) / 0.12);
      case 'wheel': return clamp01(Math.abs(esc.wheel.angvel().x) / 0.07);
      case 'tianzhu': return clamp01(Math.abs(sim.drv.tianzhu.angvel().y) / 0.12);
      case 'jilun': return clamp01(Math.abs(sim.drv.jilun.angvel().y) / 0.06);
      case 'drumLift': return clamp01(sim.drv.levers[0].body.angvel().z / 0.25);
    }
    return 0;
  }

  private stationIndex() {
    const wa = PlaneFrame.angleOf(this.sim.esc.wheel.rotation());
    return ((Math.round(-wa / ESC.pitch) % ESC.N) + ESC.N) % ESC.N;
  }
}

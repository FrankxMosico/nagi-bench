// 声音：全部用 Web Audio 在运行时合成（不读取任何音频文件）。
//  · 配乐：五声音阶（D 宫）的筝（Karplus-Strong 拨弦，预先算成缓冲）、箫（正弦+气声）与低音铺底。
//  · 音效：由物理事件触发 —— 天关落锁、天锁咔嗒、木人击鼓、扣钟；枢轮转动的木响与齿轮声、水声随画面距离变化。
//  · 主总线经压缩器与限幅，避免爆音。
import * as THREE from 'three';
import type { Sim, SimEvent } from '../sim/sim';
import { ESC } from '../sim/escapement';
import { DRV } from '../sim/drivetrain';
import { scaleAt, FILM_LENGTH } from '../film/schedule';

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

interface Note { t: number; dur: number; n: number; inst: 'zheng' | 'xiao' | 'pad' | 'bass' | 'gong'; vel: number }

/** 80 BPM：一拍 0.75 s，一小节约等于枢轮走一格 */
const BEAT = 0.75;
function compose(): Note[] {
  const N: Note[] = [];
  const D4 = 62, E4 = 64, Fs4 = 66, A4 = 69, B4 = 71, D5 = 74, E5 = 76, Fs5 = 78, A5 = 81, B3 = 59, A3 = 57, D3 = 50, A2 = 45;
  const pent = [D4, E4, Fs4, A4, B4, D5, E5, Fs5, A5];
  // 开场：筝的刮奏 + 低音
  for (let i = 0; i < 9; i++) N.push({ t: 0.55 + i * 0.055, dur: 3, n: pent[i], inst: 'zheng', vel: 0.32 + i * 0.03 });
  N.push({ t: 0.5, dur: 6, n: D3, inst: 'bass', vel: 0.5 });
  N.push({ t: 0.0, dur: 11, n: D3 + 12, inst: 'pad', vel: 0.32 });
  N.push({ t: 0.0, dur: 11, n: A3, inst: 'pad', vel: 0.26 });
  // 开场旋律（筝）
  const op: [number, number, number][] = [[1.9, A4, 0.4], [2.25, B4, 0.35], [2.6, D5, 0.45], [3.35, E5, 0.4], [3.7, D5, 0.35], [4.45, A4, 0.4], [5.2, B4, 0.35], [5.95, Fs4, 0.4]];
  for (const [t, n, v] of op) N.push({ t, dur: 2.5, n, inst: 'zheng', vel: v });
  // 水源段：轻柔分解和弦
  for (let b = 0; b < 8; b++) {
    const t = 7.1 + b * BEAT / 2;
    const seq = [D4, A4, D5, A4, E4, B4, E5, B4];
    N.push({ t, dur: 1.6, n: seq[b % seq.length], inst: 'zheng', vel: 0.2 });
  }
  N.push({ t: 7.0, dur: 4.5, n: A2, inst: 'bass', vel: 0.35 });
  // 擒纵段：音乐退后，长音铺底，慢放时一声低沉的悬置音
  N.push({ t: 10.4, dur: 7.5, n: D3, inst: 'pad', vel: 0.3 });
  N.push({ t: 10.4, dur: 7.5, n: A3, inst: 'pad', vel: 0.22 });
  N.push({ t: 12.4, dur: 3.4, n: E4, inst: 'xiao', vel: 0.24 });
  N.push({ t: 15.6, dur: 2.2, n: Fs4, inst: 'xiao', vel: 0.26 });
  // 节拍段与传动段：箫的旋律 + 筝的分解
  const mel: [number, number, number][] = [
    [17.7, 1.5, A4], [19.2, 0.75, B4], [19.95, 0.75, D5], [20.7, 2.25, E5], [22.95, 0.75, D5], [23.7, 1.5, B4],
  ];
  for (const [t, d, n] of mel) N.push({ t, dur: d + 0.15, n, inst: 'xiao', vel: 0.3 });
  const arp = [D4, Fs4, A4, D5, B3, D4, Fs4, B4, A3, D4, E4, A4, D4, Fs4, A4, E5];
  for (let i = 0; i < 16; i++) N.push({ t: 17.7 + i * BEAT / 2, dur: 1.6, n: arp[i], inst: 'zheng', vel: 0.22 });
  for (let i = 0; i < 8; i++) N.push({ t: 20.7 + i * BEAT / 2, dur: 1.6, n: arp[(i + 4) % 16] + 12, inst: 'zheng', vel: 0.18 });
  N.push({ t: 17.7, dur: 6.2, n: D3, inst: 'bass', vel: 0.4 });
  N.push({ t: 17.7, dur: 6.2, n: Fs4 - 12, inst: 'pad', vel: 0.22 });
  // 报时段：木阁内部原速，留给拨牙与鼓声；切到正面后加速，轻快的筝
  N.push({ t: 24.0, dur: 1.6, n: A4, inst: 'zheng', vel: 0.16 });
  N.push({ t: 24.75, dur: 1.6, n: Fs4, inst: 'zheng', vel: 0.14 });
  N.push({ t: 23.9, dur: 1.8, n: A2, inst: 'bass', vel: 0.28 });
  const quick = [A4, D5, E5, D5, B4, A4, Fs4, A4, B4, D5, Fs5];
  for (let i = 0; i < quick.length; i++) N.push({ t: 25.6 + i * 0.25, dur: 1.2, n: quick[i], inst: 'zheng', vel: 0.17 });
  N.push({ t: 25.6, dur: 2.9, n: A2, inst: 'bass', vel: 0.32 });
  // 终章：和弦渐强、刮奏、锣
  N.push({ t: 28.35, dur: 5.5, n: D3, inst: 'pad', vel: 0.36 });
  N.push({ t: 28.35, dur: 5.5, n: A3, inst: 'pad', vel: 0.3 });
  N.push({ t: 28.35, dur: 5.5, n: Fs4, inst: 'pad', vel: 0.24 });
  N.push({ t: 28.45, dur: 2.6, n: D5, inst: 'xiao', vel: 0.3 });
  N.push({ t: 29.6, dur: 1.2, n: E5, inst: 'xiao', vel: 0.28 });
  N.push({ t: 30.35, dur: 3.5, n: Fs5, inst: 'xiao', vel: 0.26 });
  for (let i = 0; i < 9; i++) N.push({ t: 30.3 + i * 0.05, dur: 3.5, n: pent[i], inst: 'zheng', vel: 0.28 });
  N.push({ t: 30.35, dur: 5, n: D3 - 12, inst: 'gong', vel: 0.55 });
  N.push({ t: 30.35, dur: 5, n: D3, inst: 'bass', vel: 0.42 });
  return N.sort((a, b) => a.t - b.t);
}

/** Karplus-Strong 拨弦：预先渲染成 AudioBuffer（筝） */
function renderPluck(ctx: BaseAudioContext, f: number, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(1, len, sr);
  const out = buf.getChannelData(0);
  const period = sr / f;
  const N = Math.max(2, Math.floor(period));
  const frac = period - N;
  const line = new Float32Array(N + 2);
  let seed = 1234 + Math.floor(f);
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1;
  for (let i = 0; i < line.length; i++) line[i] = rnd() * 0.9;
  // 预先低通一下激励，使音色更圆
  for (let k = 0; k < 2; k++) for (let i = 1; i < line.length; i++) line[i] = 0.5 * (line[i] + line[i - 1]);
  let idx = 0;
  const decay = 0.9965 - Math.min(0.004, f / 400000);
  let prev = 0;
  for (let i = 0; i < len; i++) {
    const a = line[idx], b = line[(idx + 1) % N];
    const v = a + (b - a) * frac;
    const nv = decay * (0.5 * (v + prev));
    prev = v;
    line[idx] = nv;
    out[i] = v;
    idx = (idx + 1) % N;
  }
  // 起音处加一点"拨"的瞬态，尾部淡出
  for (let i = 0; i < Math.min(len, 160); i++) out[i] *= i / 160 + 0.2;
  for (let i = len - 2000; i < len; i++) if (i > 0) out[i] *= (len - i) / 2000;
  return buf;
}

function noiseBuffer(ctx: BaseAudioContext, seconds: number, color: 'white' | 'pink' | 'brown' = 'white'): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let seed = 99;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1;
  let b0 = 0, b1 = 0, b2 = 0, last = 0;
  for (let i = 0; i < len; i++) {
    const w = rnd();
    if (color === 'white') d[i] = w;
    else if (color === 'pink') { b0 = 0.997 * b0 + 0.029591 * w; b1 = 0.985 * b1 + 0.032534 * w; b2 = 0.95 * b2 + 0.048056 * w; d[i] = (b0 + b1 + b2 + w * 0.1) * 1.6; }
    else { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  }
  return buf;
}

function impulseResponse(ctx: BaseAudioContext, seconds: number, decay: number): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1;
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      d[i] = rnd() * Math.pow(1 - t, decay) * (i < 200 ? i / 200 : 1);
    }
  }
  return buf;
}

export class AudioEngine {
  ctx: AudioContext | null = null;
  ready: Promise<boolean>;
  private master!: GainNode;
  private music!: GainNode;
  private sfx!: GainNode;
  private reverb!: ConvolverNode;
  private revSend!: GainNode;
  private plucks = new Map<number, AudioBuffer>();
  private notes = compose();
  private nextNote = 0;
  private lastT = -1;
  private noise!: AudioBuffer;
  private pink!: AudioBuffer;
  private brown!: AudioBuffer;
  // 连续声：水流、溢水、枢轮木响、齿轮
  private water?: { g: GainNode; f: BiquadFilterNode; pan: StereoPannerNode };
  private spill?: { g: GainNode; f: BiquadFilterNode; pan: StereoPannerNode };
  private creak?: { g: GainNode; f: BiquadFilterNode };
  private room?: GainNode;
  private gearAcc = 0;
  private lastTz = 0;
  private tmp = new THREE.Vector3();

  constructor() {
    this.ready = this.init();
  }

  private async init(): Promise<boolean> {
    if (new URLSearchParams(location.search).has('mute')) return true;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC({ latencyHint: 'interactive' });
      this.ctx = ctx;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.knee.value = 10; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
      const limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -3; limiter.knee.value = 0; limiter.ratio.value = 20; limiter.attack.value = 0.001; limiter.release.value = 0.1;
      this.master = ctx.createGain();
      this.master.gain.value = 0.0;
      this.master.connect(comp).connect(limiter).connect(ctx.destination);
      if (new URLSearchParams(location.search).has('audiodebug')) {
        // 调试：监测输出电平（峰值/RMS），确认没有削波
        const an = ctx.createAnalyser();
        an.fftSize = 2048;
        limiter.connect(an);
        const buf = new Float32Array(an.fftSize);
        const stats: { t: number; peak: number; rms: number }[] = [];
        (window as unknown as { __audioStats: typeof stats }).__audioStats = stats;
        setInterval(() => {
          an.getFloatTimeDomainData(buf);
          let p = 0, s = 0;
          for (let i = 0; i < buf.length; i++) { const v = Math.abs(buf[i]); if (v > p) p = v; s += v * v; }
          stats.push({ t: ctx.currentTime, peak: p, rms: Math.sqrt(s / buf.length) });
        }, 50);
      }
      this.music = ctx.createGain(); this.music.gain.value = 0.5; this.music.connect(this.master);
      this.sfx = ctx.createGain(); this.sfx.gain.value = 0.8; this.sfx.connect(this.master);
      this.reverb = ctx.createConvolver();
      this.reverb.buffer = impulseResponse(ctx, 2.6, 3.2);
      const revOut = ctx.createGain(); revOut.gain.value = 0.32;
      this.reverb.connect(revOut).connect(this.master);
      this.revSend = ctx.createGain(); this.revSend.gain.value = 1; this.revSend.connect(this.reverb);
      this.noise = noiseBuffer(ctx, 2.5, 'white');
      this.pink = noiseBuffer(ctx, 3.0, 'pink');
      this.brown = noiseBuffer(ctx, 3.0, 'brown');
      // 预渲染筝的音
      const ns = new Set(this.notes.filter((n) => n.inst === 'zheng').map((n) => n.n));
      for (const n of ns) this.plucks.set(n, renderPluck(ctx, midi(n), 3.2));
      this.setupContinuous();
      this.master.gain.setTargetAtTime(0.62, ctx.currentTime, 0.3);
      return ctx.state === 'running';
    } catch (e) {
      console.warn('audio init failed', e);
      return false;
    }
  }

  resume() { this.ctx?.resume(); }

  restart() {
    this.nextNote = 0;
    this.lastT = -1;
    this.gearAcc = 0;
  }

  private setupContinuous() {
    const ctx = this.ctx!;
    const loop = (buf: AudioBuffer, rate = 1) => {
      const s = ctx.createBufferSource();
      s.buffer = buf; s.loop = true; s.playbackRate.value = rate;
      s.start();
      return s;
    };
    // 出水口水流：带通白噪声
    {
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 0.7;
      const f2 = ctx.createBiquadFilter(); f2.type = 'highshelf'; f2.frequency.value = 5000; f2.gain.value = -8;
      const g = ctx.createGain(); g.gain.value = 0;
      const pan = ctx.createStereoPanner();
      loop(this.noise).connect(f).connect(f2).connect(g).connect(pan).connect(this.sfx);
      g.connect(this.revSend);
      this.water = { g, f, pan };
    }
    // 溢水落入退水壶：粉噪声，较低沉
    {
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.6;
      const g = ctx.createGain(); g.gain.value = 0;
      const pan = ctx.createStereoPanner();
      loop(this.pink, 0.9).connect(f).connect(g).connect(pan).connect(this.sfx);
      this.spill = { g, f, pan };
    }
    // 枢轮转动时的木响
    {
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 180; f.Q.value = 2.5;
      const g = ctx.createGain(); g.gain.value = 0;
      loop(this.brown).connect(f).connect(g).connect(this.sfx);
      this.creak = { g, f };
    }
    // 室内底噪（极轻）
    {
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500;
      const g = ctx.createGain(); g.gain.value = 0.012;
      loop(this.pink, 0.5).connect(f).connect(g).connect(this.master);
      this.room = g;
    }
  }

  // ------------------------------------------------------------------ 乐器
  private playNote(nt: Note, when: number, rate: number) {
    const ctx = this.ctx!;
    const out = ctx.createGain();
    out.connect(this.music);
    const send = ctx.createGain(); send.gain.value = nt.inst === 'zheng' ? 0.35 : 0.5;
    out.connect(send).connect(this.revSend);
    const f = midi(nt.n);
    if (nt.inst === 'zheng') {
      const s = ctx.createBufferSource();
      s.buffer = this.plucks.get(nt.n)!;
      s.playbackRate.value = rate;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4200;
      const stopAt = when + Math.min(3.0, nt.dur + 1.5);
      out.gain.setValueAtTime(nt.vel * 0.95, when);
      out.gain.setTargetAtTime(0, stopAt - 0.25, 0.06); // 收尾前淡出，避免截断的咔哒声
      s.connect(lp).connect(out);
      s.start(when);
      s.stop(stopAt + 0.05);
    } else if (nt.inst === 'xiao') {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2;
      const g2 = ctx.createGain(); g2.gain.value = 0.12;
      const vib = ctx.createOscillator(); vib.frequency.value = 5.2;
      const vg = ctx.createGain(); vg.gain.value = f * 0.006;
      vib.connect(vg); vg.connect(o.frequency); vg.connect(o2.frequency);
      const breath = ctx.createBufferSource(); breath.buffer = this.noise; breath.loop = true;
      const bf = ctx.createBiquadFilter(); bf.type = 'bandpass'; bf.frequency.value = f * 1.5; bf.Q.value = 3;
      const bg = ctx.createGain(); bg.gain.value = 0.05;
      breath.connect(bf).connect(bg).connect(out);
      o.connect(out); o2.connect(g2).connect(out);
      const a = 0.25, r = 0.5;
      out.gain.setValueAtTime(0, when);
      out.gain.linearRampToValueAtTime(nt.vel * 0.5, when + a);
      out.gain.setValueAtTime(nt.vel * 0.5, when + Math.max(a, nt.dur - r));
      out.gain.linearRampToValueAtTime(0, when + nt.dur + 0.05);
      const end = when + nt.dur + 0.1;
      for (const n of [o, o2, vib, breath]) { n.start(when); n.stop(end); }
    } else if (nt.inst === 'pad' || nt.inst === 'bass') {
      const o = ctx.createOscillator(); o.type = nt.inst === 'pad' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * (nt.inst === 'pad' ? 1.003 : 0.5);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = nt.inst === 'pad' ? 700 : 400; lp.Q.value = 0.5;
      o.connect(lp); o2.connect(lp); lp.connect(out);
      const a = nt.inst === 'pad' ? 1.6 : 0.4;
      out.gain.setValueAtTime(0, when);
      out.gain.linearRampToValueAtTime(nt.vel * (nt.inst === 'pad' ? 0.13 : 0.35), when + a);
      out.gain.setValueAtTime(nt.vel * (nt.inst === 'pad' ? 0.13 : 0.35), when + Math.max(a, nt.dur - 1.2));
      out.gain.linearRampToValueAtTime(0, when + nt.dur);
      o.start(when); o2.start(when); o.stop(when + nt.dur + 0.05); o2.stop(when + nt.dur + 0.05);
    } else if (nt.inst === 'gong') {
      this.bellTone(when, f, nt.vel, out, [0.5, 1, 1.42, 1.98, 2.48, 3.1], 5);
    }
  }

  /** 钟磬类：非谐和分音的衰减正弦组 */
  private bellTone(when: number, f0: number, vel: number, out: AudioNode, ratios: number[], decay: number) {
    const ctx = this.ctx!;
    ratios.forEach((r, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f0 * r;
      const g = ctx.createGain();
      const amp = vel * 0.22 / (1 + i * 0.45);
      const d = decay / (1 + i * 0.6);
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(amp, when + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0005, when + d);
      o.connect(g).connect(out);
      o.start(when); o.stop(when + d + 0.05);
    });
  }

  // ------------------------------------------------------------------ 音效
  private spatial(pos: THREE.Vector3, cam: THREE.Vector3, ref = 3.5): { gain: number; pan: number } {
    const d = pos.distanceTo(cam);
    const gain = Math.min(1.2, ref / Math.max(0.8, d));
    // 简单声像：用相机右方向上的投影
    const right = this.tmp.set(1, 0, 0);
    void right;
    const pan = Math.max(-0.8, Math.min(0.8, (pos.x - cam.x) / Math.max(1.5, d) * 0.6));
    return { gain, pan };
  }

  event(e: SimEvent, filmT: number, cam: THREE.Vector3) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running' || filmT < 0.25) return;
    const now = ctx.currentTime;
    const slow = scaleAt(filmT);
    const pitch = Math.sqrt(Math.min(1.5, Math.max(0.35, slow))); // 慢放时音调变低沉
    const out = ctx.createGain();
    const pan = ctx.createStereoPanner();
    out.connect(pan).connect(this.sfx);
    const send = ctx.createGain(); send.gain.value = 0.4; out.connect(send).connect(this.revSend);
    const o = ESC.origin;
    if (e.type === 'lock') {
      const sp = this.spatial(new THREE.Vector3(o.x + 0.25, o.y + 1.85, o.z), cam, 4);
      pan.pan.value = sp.pan;
      const k = Math.min(1, e.strength / 0.35) * sp.gain;
      this.knock(now, out, 650 * pitch, 0.9 * k, 0.07 / pitch);
      this.knock(now + 0.002, out, 1900 * pitch, 0.35 * k, 0.03 / pitch);
      this.thud(now, out, 95 * pitch, 0.7 * k, 0.16 / pitch);
      this.click(now, out, 0.25 * k, 3000 * pitch);
    } else if (e.type === 'pawl') {
      const sp = this.spatial(new THREE.Vector3(o.x + 0.25, o.y + 1.85, o.z - 0.3), cam, 3);
      pan.pan.value = sp.pan;
      this.click(now, out, 0.16 * sp.gain, 4200 * pitch);
      this.knock(now, out, 2600 * pitch, 0.08 * sp.gain, 0.02);
    } else if (e.type === 'trip') {
      const sp = this.spatial(new THREE.Vector3(o.x + 0.25, o.y + 1.4, o.z - 0.5), cam, 3);
      pan.pan.value = sp.pan;
      this.knock(now, out, 1200 * pitch, 0.18 * sp.gain, 0.04);
    } else if (e.type === 'drum') {
      const sp = this.spatial(new THREE.Vector3(DRV.jl.x, 4.9, DRV.armZ), cam, 4.5);
      pan.pan.value = sp.pan;
      const k = Math.min(1.1, e.strength / 1.7) * sp.gain;
      this.drum(now, out, k, pitch);
    } else if (e.type === 'bell') {
      const sp = this.spatial(new THREE.Vector3(DRV.jl.x + 0.5, 4.66, DRV.armZ), cam, 4.5);
      pan.pan.value = sp.pan;
      const k = Math.min(1.1, e.strength / 1.2) * sp.gain;
      this.bellTone(now, 523 * pitch, 0.9 * k, out, [0.5, 1, 1.19, 1.5, 2.0, 2.53, 3.0], 3.6);
      this.click(now, out, 0.2 * k, 6000);
    }
  }

  private knock(when: number, out: AudioNode, f: number, amp: number, dur: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(f * 1.3, when); o.frequency.exponentialRampToValueAtTime(f, when + 0.015);
    const g = ctx.createGain();
    g.gain.setValueAtTime(amp, when);
    g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    o.connect(g).connect(out);
    o.start(when); o.stop(when + dur + 0.02);
  }
  private thud(when: number, out: AudioNode, f: number, amp: number, dur: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(f * 1.6, when); o.frequency.exponentialRampToValueAtTime(f, when + dur * 0.5);
    const g = ctx.createGain();
    g.gain.setValueAtTime(amp, when);
    g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    o.connect(g).connect(out);
    o.start(when); o.stop(when + dur + 0.02);
  }
  private click(when: number, out: AudioNode, amp: number, f: number) {
    const ctx = this.ctx!;
    const s = ctx.createBufferSource(); s.buffer = this.noise;
    const hp = ctx.createBiquadFilter(); hp.type = 'bandpass'; hp.frequency.value = f; hp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(amp, when);
    g.gain.exponentialRampToValueAtTime(0.0005, when + 0.025);
    s.connect(hp).connect(g).connect(out);
    s.start(when, Math.random() * 1.5); s.stop(when + 0.04);
  }
  private drum(when: number, out: AudioNode, k: number, pitch: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(150 * pitch, when);
    o.frequency.exponentialRampToValueAtTime(58 * pitch, when + 0.32);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(0.95 * k, when + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0008, when + 0.85);
    o.connect(g).connect(out);
    o.start(when); o.stop(when + 0.9);
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 230 * pitch;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.25 * k, when);
    g2.gain.exponentialRampToValueAtTime(0.0008, when + 0.18);
    o2.connect(g2).connect(out);
    o2.start(when); o2.stop(when + 0.2);
    const s = ctx.createBufferSource(); s.buffer = this.noise;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
    const gn = ctx.createGain();
    gn.gain.setValueAtTime(0.35 * k, when);
    gn.gain.exponentialRampToValueAtTime(0.0008, when + 0.12);
    s.connect(lp).connect(gn).connect(out);
    s.start(when, Math.random()); s.stop(when + 0.15);
  }

  // ------------------------------------------------------------------ 每帧：配乐排程与连续声
  update(t: number, cam: THREE.Vector3, sim: Sim) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') { this.lastT = t; return; }
    const now = ctx.currentTime;
    // 时间回退（重播）时重置
    if (t < this.lastT - 0.5) this.restart();
    if (this.nextNote === 0 && this.lastT < 0) {
      // 首次：跳过已经过去的音符
      while (this.nextNote < this.notes.length && this.notes[this.nextNote].t < t - 0.05) this.nextNote++;
    }
    const ahead = 0.3;
    while (this.nextNote < this.notes.length && this.notes[this.nextNote].t < t + ahead) {
      const nt = this.notes[this.nextNote++];
      const when = now + Math.max(0, nt.t - t);
      if (nt.t > t - 0.1) this.playNote(nt, when, 1);
    }
    this.lastT = t;
    // 片尾淡出
    const fade = t > FILM_LENGTH + 1.5 ? Math.max(0, 1 - (t - FILM_LENGTH - 1.5) / 3) : 1;
    this.music.gain.setTargetAtTime(0.5 * fade, now, 0.3);
    // ---- 连续声
    const o = ESC.origin;
    const geo = sim.esc.geo;
    const spoutPos = new THREE.Vector3(o.x, o.y + geo.spout[1] - 0.15, o.z - geo.spout[0]);
    const sw = this.spatial(spoutPos, cam, 2.4);
    const slow = scaleAt(t);
    if (this.water) {
      this.water.g.gain.setTargetAtTime(0.16 * sw.gain * (t < 0.3 ? 0 : 1), now, 0.15);
      this.water.pan.pan.setTargetAtTime(sw.pan, now, 0.2);
      this.water.f.frequency.setTargetAtTime(2400 * Math.sqrt(Math.max(0.3, slow)), now, 0.2);
    }
    let spillN = 0;
    for (const p of sim.water.parts) if (p.active && p.kind !== 0) spillN++;
    if (this.spill) {
      const sp = this.spatial(new THREE.Vector3(o.x, o.y - 1.0, o.z - 1.5), cam, 3);
      this.spill.g.gain.setTargetAtTime(Math.min(0.12, spillN * 0.0012) * sp.gain, now, 0.25);
      this.spill.pan.pan.setTargetAtTime(sp.pan, now, 0.3);
    }
    if (this.creak) {
      const w = Math.abs(sim.esc.wheel.angvel().x);
      const wp = this.spatial(new THREE.Vector3(o.x, o.y, o.z), cam, 4);
      this.creak.g.gain.setTargetAtTime(Math.min(0.5, w * 1.6) * wp.gain, now, 0.06);
      this.creak.f.frequency.setTargetAtTime(150 + w * 300, now, 0.1);
    }
    // 齿轮声：天柱每转过一根灯笼齿（20°）发出一声轻响
    const tz = sim.drv.tianzhu.rotation();
    const ang = 2 * Math.atan2(tz.y, tz.w);
    let d = ang - this.lastTz;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    this.lastTz = ang;
    this.gearAcc += Math.abs(d);
    const step = (2 * Math.PI) / 18 / 3;
    if (this.gearAcc > step) {
      this.gearAcc %= step;
      const gp = this.spatial(new THREE.Vector3(DRV.tz.x + 0.3, 1.8, DRV.tz.z), cam, 3);
      const out = ctx.createGain(); out.connect(this.sfx);
      this.knock(now, out, 1400 + Math.random() * 300, 0.05 * gp.gain, 0.03);
    }
    if (this.room) this.room.gain.setTargetAtTime(0.012 * fade, now, 0.5);
  }
}

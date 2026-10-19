// 配乐与音效：全部用 Web Audio API 在运行时合成，不使用任何音频文件。
// 输出链：音乐/音效总线 → 主音量 → 压缩器 → 限幅器 → 扬声器，避免爆音。

type Note = { t: number; f: number; v: number; d: number; kind: "pluck" | "bass" | "flute" };

export class AudioEngine {
  ctx: BaseAudioContext;
  /** 离线渲染（测试响度）时为 true：音效不检查播放状态，时间由调用方给定 */
  offline = false;
  private master: GainNode;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode;
  private reverbIn: GainNode;
  private noise: AudioBuffer;
  private waterGain: GainNode;
  private waterPan: StereoPannerNode;
  private rumbleGain: GainNode;
  private started = false;
  private nodes: AudioScheduledSourceNode[] = [];

  constructor(offlineCtx?: OfflineAudioContext) {
    if (offlineCtx) {
      this.ctx = offlineCtx;
      this.offline = true;
    } else {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx({ latencyHint: "interactive" });
    }
    const ctx = this.ctx;
    // 主链
    this.master = ctx.createGain();
    this.master.gain.value = 0.0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.knee.value = 8;
    comp.ratio.value = 5;
    comp.attack.value = 0.004;
    comp.release.value = 0.25;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -4;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.1;
    const out = ctx.createGain();
    out.gain.value = 0.85;
    this.master.connect(comp).connect(limiter).connect(out).connect(ctx.destination);
    // 混响（程序生成的脉冲响应）
    const conv = ctx.createConvolver();
    conv.buffer = this.makeImpulse(2.6, 2.8);
    this.reverbIn = ctx.createGain();
    this.reverbIn.gain.value = 1;
    const wet = ctx.createGain();
    wet.gain.value = 0.32;
    this.reverbIn.connect(conv).connect(wet).connect(this.master);
    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = 0.9;
    this.sfxBus.connect(this.master);
    // 噪声源
    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.963 * b1 + w * 0.2965164;
      b2 = 0.57 * b2 + w * 1.0526913;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.18; // 粉红噪声
    }
    this.waterGain = ctx.createGain();
    this.waterGain.gain.value = 0;
    this.waterPan = ctx.createStereoPanner();
    this.rumbleGain = ctx.createGain();
    this.rumbleGain.gain.value = 0;
  }

  /** 持续音源（水流、木轮隆隆）在真正开始播放时才启动，避免在未获准播放时触发浏览器警告 */
  private loopsStarted = false;
  private ensureLoops() {
    if (this.loopsStarted) return;
    this.loopsStarted = true;
    const ctx = this.ctx;
    // 持续的水流声
    {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1500;
      bp.Q.value = 0.7;
      const hs = ctx.createBiquadFilter();
      hs.type = "highshelf";
      hs.frequency.value = 3000;
      hs.gain.value = 4;
      // 用两个低频振荡器调制音量，形成“汩汩”的颗粒感
      const am = ctx.createGain();
      am.gain.value = 0.7;
      for (const [f, depth] of [[6.3, 0.18], [9.7, 0.12]] as const) {
        const lfo = ctx.createOscillator();
        lfo.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = depth;
        lfo.connect(g).connect(am.gain);
        lfo.start();
      }
      src.connect(bp).connect(hs).connect(am).connect(this.waterGain).connect(this.waterPan).connect(this.sfxBus);
      src.start();
    }
    // 枢轮转动时木头的低沉隆隆声
    {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      src.playbackRate.value = 0.5;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 180;
      lp.Q.value = 1.2;
      src.connect(lp).connect(this.rumbleGain).connect(this.sfxBus);
      src.start();
    }
  }

  get running() {
    return this.offline || this.ctx.state === "running";
  }

  async resume(): Promise<boolean> {
    const ctx = this.ctx as AudioContext;
    try {
      await Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 300))]);
    } catch { /* 浏览器拒绝自动播放 */ }
    return ctx.state === "running";
  }

  /** 音效的发声时刻：实时播放取当前时间，离线测试可指定 */
  private when(at?: number) {
    return at ?? this.ctx.currentTime + 0.01;
  }

  private makeImpulse(seconds: number, decay: number) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        const t = i / len;
        lp = lp * 0.55 + (Math.random() * 2 - 1) * 0.45;
        d[i] = lp * Math.pow(1 - t, decay) * (i < 60 ? i / 60 : 1);
      }
    }
    return buf;
  }

  // ------------------------------------------------------------ 配乐
  /** 从影片时间 filmT 开始播放配乐（filmT>0 时跳过已过去的音符） */
  startMusic(filmT: number) {
    this.stopMusic();
    this.ensureLoops();
    const ctx = this.ctx;
    const bus = ctx.createGain();
    bus.gain.value = 0.9;
    bus.connect(this.master);
    const send = ctx.createGain();
    send.gain.value = 0.55;
    bus.connect(send).connect(this.reverbIn);
    this.musicBus = bus;
    const t0 = ctx.currentTime + 0.05 - filmT;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.4);
    for (const n of score()) {
      if (n.t < filmT - 0.05) continue;
      const at = t0 + n.t;
      if (n.kind === "pluck") this.pluck(bus, at, n.f, n.v, n.d);
      else if (n.kind === "bass") this.pluck(bus, at, n.f, n.v, n.d, true);
      else this.flute(bus, at, n.f, n.v, n.d);
    }
    // 底层持续音垫
    for (const p of pads()) {
      if (p.t + p.d < filmT) continue;
      this.pad(bus, t0 + Math.max(p.t, filmT), p.d - Math.max(0, filmT - p.t), p.fs, p.v);
    }
    this.started = true;
  }

  stopMusic() {
    if (this.musicBus) {
      const g = this.musicBus;
      const now = this.ctx.currentTime;
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(g.gain.value, now);
      g.gain.linearRampToValueAtTime(0, now + 0.15);
      setTimeout(() => g.disconnect(), 400);
      this.musicBus = null;
    }
    for (const n of this.nodes) { try { n.stop(); } catch { /* 已停止 */ } }
    this.nodes = [];
  }

  /** FM 拨弦：模仿古筝 / 琴 */
  private pluck(bus: AudioNode, at: number, f: number, v: number, dur: number, bass = false) {
    const ctx = this.ctx;
    const car = ctx.createOscillator();
    car.type = "sine";
    car.frequency.value = f;
    const mod = ctx.createOscillator();
    mod.frequency.value = f * (bass ? 1 : 2);
    const mi = ctx.createGain();
    const idx = f * (bass ? 1.6 : 2.4);
    mi.gain.setValueAtTime(idx, at);
    mi.gain.exponentialRampToValueAtTime(idx * 0.06, at + (bass ? 0.5 : 0.28));
    mod.connect(mi).connect(car.frequency);
    // 轻微的“按音”滑音
    car.frequency.setValueAtTime(f * 0.996, at);
    car.frequency.linearRampToValueAtTime(f, at + 0.06);
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.exponentialRampToValueAtTime(v, at + 0.006);
    amp.gain.exponentialRampToValueAtTime(v * 0.35, at + 0.18);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = bass ? 900 : 3800;
    car.connect(amp).connect(lp).connect(bus);
    car.start(at);
    mod.start(at);
    car.stop(at + dur + 0.05);
    mod.stop(at + dur + 0.05);
    this.nodes.push(car, mod);
  }

  /** 笛声：正弦 + 气声 + 颤音 */
  private flute(bus: AudioNode, at: number, f: number, v: number, dur: number) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.2;
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0, at);
    vg.gain.linearRampToValueAtTime(f * 0.008, at + dur * 0.5);
    vib.connect(vg).connect(o.frequency);
    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.value = f * 2;
    const g2 = ctx.createGain();
    g2.gain.value = 0.12;
    o2.connect(g2);
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.linearRampToValueAtTime(v, at + 0.12);
    amp.gain.setValueAtTime(v, at + dur * 0.7);
    amp.gain.linearRampToValueAtTime(0.0001, at + dur);
    o.connect(amp);
    g2.connect(amp);
    // 气声
    const br = ctx.createBufferSource();
    br.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = f * 2;
    bp.Q.value = 6;
    const bg = ctx.createGain();
    bg.gain.value = 0.35;
    br.connect(bp).connect(bg).connect(amp);
    amp.connect(bus);
    for (const n of [o, vib, o2, br]) {
      n.start(at);
      n.stop(at + dur + 0.05);
      this.nodes.push(n);
    }
  }

  private pad(bus: AudioNode, at: number, dur: number, fs: number[], v: number) {
    const ctx = this.ctx;
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.linearRampToValueAtTime(v, at + Math.min(2.5, dur * 0.4));
    amp.gain.setValueAtTime(v, at + dur - Math.min(2.5, dur * 0.4));
    amp.gain.linearRampToValueAtTime(0.0001, at + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 520;
    lp.Q.value = 0.5;
    amp.connect(lp).connect(bus);
    for (const f of fs) {
      for (const det of [-5, 5]) {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = f;
        o.detune.value = det;
        const g = ctx.createGain();
        g.gain.value = 0.5 / fs.length;
        o.connect(g).connect(amp);
        o.start(at);
        o.stop(at + dur + 0.1);
        this.nodes.push(o);
      }
    }
  }

  // ------------------------------------------------------------ 音效
  private env(at: number, peak: number, attack: number, decay: number) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
    return g;
  }

  private noiseHit(dest: AudioNode, at: number, type: BiquadFilterType, freq: number, q: number, peak: number, decay: number) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = 1;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.env(at, peak, 0.002, decay);
    src.connect(f).connect(g).connect(dest);
    src.start(at, Math.random() * 1.5);
    src.stop(at + decay + 0.05);
  }

  private tone(dest: AudioNode, at: number, f0: number, f1: number, peak: number, decay: number, type: OscillatorType = "sine") {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, at);
    o.frequency.exponentialRampToValueAtTime(f1, at + decay);
    const g = this.env(at, peak, 0.003, decay);
    o.connect(g).connect(dest);
    o.start(at);
    o.stop(at + decay + 0.05);
  }

  private panned(pan: number, reverb = 0) {
    const p = this.ctx.createStereoPanner();
    p.pan.value = Math.max(-0.9, Math.min(0.9, pan));
    p.connect(this.sfxBus);
    if (reverb > 0) {
      const s = this.ctx.createGain();
      s.gain.value = reverb;
      p.connect(s).connect(this.reverbIn);
    }
    return p;
  }

  /** 天关卡住横档：木与铜的撞击声 */
  lock(strength: number, pan: number, when?: number) {
    if (!this.running) return;
    const at = this.when(when);
    const s = Math.min(1, strength);
    const dest = this.panned(pan, 0.25);
    this.noiseHit(dest, at, "bandpass", 1900, 2.5, 0.55 * s, 0.05);
    this.tone(dest, at, 420, 300, 0.32 * s, 0.09, "triangle");
    this.tone(dest, at, 140, 70, 0.5 * s, 0.16);
  }

  /** 水斗落上格叉：轻轻的“嗒” */
  tick(strength: number, pan: number, when?: number) {
    if (!this.running) return;
    const at = this.when(when);
    const dest = this.panned(pan, 0.15);
    this.noiseHit(dest, at, "bandpass", 3200, 3, 0.18 * strength, 0.03);
    this.tone(dest, at, 900, 700, 0.08 * strength, 0.04, "triangle");
  }

  /** 击鼓 */
  drum(strength: number, pan: number, when?: number) {
    if (!this.running) return;
    const at = this.when(when);
    const s = Math.min(1, strength);
    const dest = this.panned(pan, 0.35);
    this.tone(dest, at, 130, 62, 0.8 * s, 0.5);
    this.tone(dest, at, 210, 120, 0.25 * s, 0.18);
    this.noiseHit(dest, at, "lowpass", 900, 0.8, 0.5 * s, 0.09);
  }

  /** 敲钟：非谐和分音的铜钟 */
  bell(strength: number, pan: number, when?: number) {
    if (!this.running) return;
    const ctx = this.ctx;
    const at = this.when(when);
    const s = Math.min(1, strength);
    const dest = this.panned(pan, 0.6);
    const f0 = 523;
    const partials: [number, number, number][] = [
      [0.5, 0.35, 4.5], [1, 0.55, 3.6], [1.003, 0.3, 3.4], [2.0, 0.22, 2.2], [2.76, 0.26, 1.9],
      [3.9, 0.12, 1.2], [5.4, 0.1, 0.8], [6.8, 0.05, 0.5],
    ];
    for (const [r, a, dec] of partials) {
      const o = ctx.createOscillator();
      o.frequency.value = f0 * r;
      const g = this.env(at, a * s * 0.55, 0.002, dec);
      o.connect(g).connect(dest);
      o.start(at);
      o.stop(at + dec + 0.1);
    }
    this.noiseHit(dest, at, "highpass", 4000, 0.7, 0.12 * s, 0.03);
  }

  /** 每帧调用：水流与转动声的音量 */
  setContinuous(water: number, waterPan: number, rumble: number) {
    if (!this.running) return;
    this.ensureLoops();
    const now = this.ctx.currentTime;
    this.waterGain.gain.setTargetAtTime(water, now, 0.15);
    this.waterPan.pan.setTargetAtTime(Math.max(-0.8, Math.min(0.8, waterPan)), now, 0.2);
    this.rumbleGain.gain.setTargetAtTime(rumble, now, 0.06);
  }

  fadeOutAll(sec: number) {
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + sec);
  }

  get isStarted() {
    return this.started;
  }
}

// ------------------------------------------------------------ 乐谱（影片时间，秒）
const BEAT = 60 / 76;
function score(): Note[] {
  const notes: Note[] = [];
  const p = (beat: number, f: number, v = 0.16, d = 1.8) => notes.push({ t: beat * BEAT, f, v, d, kind: "pluck" });
  const b = (beat: number, f: number, v = 0.22, d = 2.6) => notes.push({ t: beat * BEAT, f, v, d, kind: "bass" });
  const fl = (beat: number, f: number, len: number, v = 0.05) => notes.push({ t: beat * BEAT, f, v, d: len * BEAT, kind: "flute" });
  // A 羽调式五声音阶（A C D E G）
  const A2 = 110, E2 = 82.41, G2 = 98, C3 = 130.81, E3 = 164.81, G3 = 196, A3 = 220, C4 = 261.63, D4 = 293.66, E4 = 329.63, G4 = 392, A4 = 440, C5 = 523.25, D5 = 587.33, E5 = 659.26, G5 = 783.99, A5 = 880;
  // 引子：琴音泛起
  b(0, A2, 0.24, 4);
  [A3, C4, E4, A4].forEach((f, i) => p(0.5 + i * 0.5, f, 0.12, 2.4));
  p(3, E5, 0.13, 2.2); p(3.75, D5, 0.1, 1.6); p(4.5, C5, 0.12, 2.6);
  fl(5, A4, 2.5, 0.04);
  // 主体：低音每两拍、中音分解和弦，旋律稀疏
  const prog = [
    { bass: A2, arp: [A3, E4, A4, E4] },
    { bass: G2, arp: [G3, D4, G4, D4] },
    { bass: C3, arp: [C4, G4, C5, G4] },
    { bass: E2, arp: [E3, A3, D4, A3] },
  ];
  const mel: [number, number, number][] = [
    [8, E5, 1.6], [9, D5, 1.2], [10, C5, 2], [12, A4, 2.2], [14, C5, 1.4], [15, D5, 1.4], [16, E5, 2.6],
    [20, G5, 1.4], [21, E5, 1.4], [22, D5, 2.2], [24, C5, 1.6], [25, D5, 1.4], [26, A4, 2.8],
    [30, E5, 1.4], [31, G5, 1.4], [32, A5, 2.6], [34, G5, 1.2], [35, E5, 1.4], [36, D5, 2.4],
  ];
  for (let bar = 2; bar < 10; bar++) {
    const c = prog[bar % 4];
    const base = bar * 4;
    b(base, c.bass, 0.2, 2.8);
    b(base + 2, c.bass * 1.5, 0.11, 1.8);
    c.arp.forEach((f, i) => p(base + i, f, 0.06, 1.3));
    c.arp.forEach((f, i) => { if (i % 2 === 0) p(base + i + 0.5, f * 2, 0.035, 0.9); });
  }
  for (const [beat, f, d] of mel) p(beat, f, 0.11, d + 0.6);
  // 尾声：长音与滑音收束
  const end = 40;
  b(end, A2, 0.24, 5);
  [A3, E4, A4, C5, E5].forEach((f, i) => p(end + i * 0.25, f, 0.1, 3.5));
  fl(end + 1, E5, 2, 0.045);
  fl(end + 3, A4, 3.5, 0.045);
  p(end + 4, A5, 0.08, 3.5);
  return notes.filter((n) => n.t < 36);
}

function pads() {
  const A2 = 110, E3 = 164.81, G2 = 98, D3 = 146.83, C3 = 130.81;
  return [
    { t: 0, d: 9, fs: [A2, E3], v: 0.07 },
    { t: 8.5, d: 7, fs: [G2, D3], v: 0.06 },
    { t: 15, d: 8, fs: [C3, E3 * 1.5], v: 0.06 },
    { t: 22.5, d: 8, fs: [A2, E3], v: 0.065 },
    { t: 30, d: 6.5, fs: [A2, E3, A2 * 2], v: 0.07 },
  ];
}

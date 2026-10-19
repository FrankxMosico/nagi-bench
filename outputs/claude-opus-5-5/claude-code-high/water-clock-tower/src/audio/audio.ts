// All sound is synthesised at runtime with the Web Audio API: a pentatonic
// score (guqin-like plucks rendered with Karplus–Strong, a soft pad and a
// drone) and diegetic effects driven by physics events (drips, the lock's
// clack, gear ticks, the jacks' drum and bell).
import { rng } from "../sim/sim";

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

export class AudioEngine {
  ctx: BaseAudioContext;
  master: GainNode;
  music: GainNode;
  sfx: GainNode;
  reverbIn: GainNode;
  private plucks = new Map<number, AudioBuffer>();
  private noise: AudioBuffer;
  private streamGain: GainNode | null = null;
  private rumbleGain: GainNode | null = null;
  private padNodes: { osc: OscillatorNode[]; gain: GainNode; filter: BiquadFilterNode } | null = null;
  private rand = rng(99);
  private lastDrip = 0;
  private dripCount = 0;
  private started = false;
  private scheduledUntil = 0;
  private musicStart = 0;

  /** pass an OfflineAudioContext to render the soundtrack offline (level checks) */
  constructor(offline?: BaseAudioContext) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = offline ?? new AC({ latencyHint: "interactive" });
    const ctx = this.ctx;
    // master chain: gain → soft compressor → brickwall-ish limiter → out
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 12;
    comp.ratio.value = 4;
    comp.attack.value = 0.004;
    comp.release.value = 0.25;
    const limit = ctx.createDynamicsCompressor();
    limit.threshold.value = -4;
    limit.knee.value = 0;
    limit.ratio.value = 20;
    limit.attack.value = 0.001;
    limit.release.value = 0.1;
    this.master = ctx.createGain();
    this.master.gain.value = 0.0;
    this.master.connect(comp).connect(limit).connect(ctx.destination);
    this.music = ctx.createGain();
    this.music.gain.value = 0.55;
    this.sfx = ctx.createGain();
    this.sfx.gain.value = 0.8;
    this.music.connect(this.master);
    this.sfx.connect(this.master);
    // reverb (synthetic impulse response)
    const conv = ctx.createConvolver();
    conv.buffer = this.impulse(2.6, 2.2);
    this.reverbIn = ctx.createGain();
    this.reverbIn.gain.value = 0.32;
    const wet = ctx.createGain();
    wet.gain.value = 0.7;
    this.reverbIn.connect(conv).connect(wet).connect(this.master);
    this.music.connect(this.reverbIn);
    this.noise = this.makeNoise(2);
    // pre-render plucked notes (D major pentatonic, two octaves + low notes)
    for (const n of [50, 52, 54, 57, 59, 62, 64, 66, 69, 71, 74, 76, 78, 81]) this.plucks.set(n, this.renderPluck(midi(n), n < 55 ? 3.2 : 2.4));
  }

  /** time source: the audio clock, or film time when rendering offline */
  timeSource: (() => number) | null = null;
  now() {
    return this.timeSource ? this.timeSource() : this.ctx.currentTime;
  }

  get running() {
    return this.ctx.state === "running";
  }

  async resume() {
    try {
      if (this.ctx instanceof AudioContext) await this.ctx.resume();
    } catch {
      /* ignore */
    }
    return this.running;
  }

  close() {
    if (this.ctx instanceof AudioContext) this.ctx.close();
  }

  private impulse(seconds: number, decay: number) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        d[i] = (this.rand() * 2 - 1) * Math.pow(1 - t, decay) * (i < 80 ? i / 80 : 1);
      }
    }
    return buf;
  }

  private makeNoise(seconds: number) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = this.rand() * 2 - 1;
    return buf;
  }

  /** Karplus–Strong plucked string with a slight body resonance */
  private renderPluck(freq: number, seconds: number) {
    const sr = this.ctx.sampleRate;
    const len = Math.floor(sr * seconds);
    const buf = this.ctx.createBuffer(1, len, sr);
    const out = buf.getChannelData(0);
    const N = Math.max(2, Math.round(sr / freq));
    const line = new Float32Array(N);
    const r = rng(Math.round(freq * 10));
    // excitation: noise shaped by a soft low-pass (finger pluck, not pick)
    let lp = 0;
    for (let i = 0; i < N; i++) {
      lp = lp * 0.55 + (r() * 2 - 1) * 0.45;
      line[i] = lp;
    }
    let idx = 0;
    let prev = 0;
    // loop gain chosen so every note decays at about the same rate (~-20 dB/s)
    const damp = 0.5 * Math.exp(-2.3 / freq);
    let peak = 0;
    for (let i = 0; i < len; i++) {
      const cur = line[idx];
      const nxt = line[(idx + 1) % N];
      const v = (cur + nxt) * damp;
      line[idx] = v;
      idx = (idx + 1) % N;
      // gentle body filter
      prev = prev * 0.2 + cur * 0.8;
      out[i] = prev;
      peak = Math.max(peak, Math.abs(prev));
    }
    const env = Math.floor(sr * 0.004);
    for (let i = 0; i < len; i++) {
      out[i] /= peak || 1;
      if (i < env) out[i] *= i / env;
      if (i > len - sr * 0.3) out[i] *= (len - i) / (sr * 0.3);
    }
    return buf;
  }

  start() {
    if (this.started) return;
    this.started = true;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(0, t);
    this.master.gain.linearRampToValueAtTime(1.05, t + 0.6);
    this.musicStart = t + 0.05;
    this.scheduledUntil = 0;
    // continuous beds: water stream & wheel rumble
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1400;
    bp.Q.value = 0.6;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 500;
    this.streamGain = ctx.createGain();
    this.streamGain.gain.value = 0;
    src.connect(bp).connect(hp).connect(this.streamGain).connect(this.sfx);
    src.start();
    const src2 = ctx.createBufferSource();
    src2.buffer = this.noise;
    src2.loop = true;
    src2.playbackRate.value = 0.5;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 160;
    this.rumbleGain = ctx.createGain();
    this.rumbleGain.gain.value = 0;
    src2.connect(lp).connect(this.rumbleGain).connect(this.sfx);
    src2.start();
    this.startPad();
    this.gong(t + 0.15, 0.5);
  }

  stop() {
    const t = this.now();
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(0, t + 1.2);
  }

  // ───────────── music ─────────────
  private startPad() {
    const ctx = this.ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.4;
    const osc: OscillatorNode[] = [];
    // D2 drone + A2, and a soft triangle chord D3 F#3 A3
    const notes = [38, 45, 50, 54, 57];
    notes.forEach((n, i) => {
      const o = ctx.createOscillator();
      o.type = i < 2 ? "sine" : "triangle";
      o.frequency.value = midi(n);
      o.detune.value = (i % 2 ? 1 : -1) * 4;
      const g = ctx.createGain();
      g.gain.value = i < 2 ? 0.22 : 0.07;
      o.connect(g).connect(filter);
      o.start();
      osc.push(o);
    });
    // slow breathing LFO on the filter
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lg = ctx.createGain();
    lg.gain.value = 260;
    lfo.connect(lg).connect(filter.frequency);
    lfo.start();
    filter.connect(gain).connect(this.music);
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 4);
    this.padNodes = { osc, gain, filter };
  }

  /** move the pad to another chord (midi notes for the 3 upper voices) */
  chord(notes: number[], at: number) {
    if (!this.padNodes) return;
    notes.forEach((n, i) => this.padNodes!.osc[i + 2]?.frequency.setTargetAtTime(midi(n), at, 0.6));
  }

  pluck(note: number, at: number, vel = 0.5, pan = 0) {
    const buf = this.plucks.get(note);
    if (!buf) return;
    const ctx = this.ctx;
    const s = ctx.createBufferSource();
    s.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = vel * 0.32;
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    s.connect(g).connect(p).connect(this.music);
    s.start(at);
  }

  /** a soft breathy flute tone (sine + vibrato + breath noise) */
  flute(note: number, at: number, dur: number, vel = 0.4) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(midi(note), at);
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.2;
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0, at);
    vg.gain.linearRampToValueAtTime(midi(note) * 0.008, at + dur * 0.5);
    vib.connect(vg).connect(o.frequency);
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = midi(note) * 2;
    const g2 = ctx.createGain();
    g2.gain.value = 0.12;
    o2.connect(g2);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(vel * 0.16, at + 0.12);
    g.gain.setValueAtTime(vel * 0.16, at + dur - 0.2);
    g.gain.linearRampToValueAtTime(0, at + dur);
    o.connect(g);
    g2.connect(g);
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const nb = ctx.createBiquadFilter();
    nb.type = "bandpass";
    nb.frequency.value = midi(note) * 2;
    nb.Q.value = 3;
    const ng = ctx.createGain();
    ng.gain.value = 0.25;
    n.connect(nb).connect(ng).connect(g);
    g.connect(this.music);
    o.start(at); o2.start(at); vib.start(at); n.start(at, this.rand());
    const end = at + dur + 0.05;
    o.stop(end); o2.stop(end); vib.stop(end); n.stop(end);
  }

  gong(at: number, vel = 0.5) {
    const ctx = this.ctx;
    const out = ctx.createGain();
    out.gain.value = vel * 0.5;
    out.connect(this.master);
    out.connect(this.reverbIn);
    const partials: [number, number, number][] = [[110, 1, 4.5], [164.5, 0.6, 3.5], [221, 0.4, 3], [297, 0.3, 2.2], [388, 0.18, 1.6], [512, 0.12, 1.2]];
    for (const [f, a, d] of partials) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(f * 1.01, at);
      o.frequency.exponentialRampToValueAtTime(f, at + 1.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(a * 0.3, at + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0008, at + d);
      o.connect(g).connect(out);
      o.start(at);
      o.stop(at + d + 0.1);
    }
  }

  /** Schedules the score; call every frame with the film time. */
  scheduleMusic(filmT: number, filmToCtx: (ft: number) => number, slow: number) {
    if (!this.started) return;
    // the score is written on a 0.4 s grid (≈75 bpm eighths), keyed to film time
    const step = 0.4;
    const horizon = filmT + 0.6;
    if (this.scheduledUntil < filmT - 1) this.scheduledUntil = Math.floor(filmT / step) * step;
    while (this.scheduledUntil < horizon) {
      const ft = this.scheduledUntil;
      this.scheduledUntil += step;
      const i = Math.round(ft / step);
      const at = filmToCtx(ft);
      if (at < this.now() - 0.02) continue;
      this.scoreEvent(i, ft, at, slow);
    }
  }

  private scoreEvent(i: number, ft: number, at: number, slow: number) {
    // sections: intro 0-4 s · water 4-9 · escapement 9-17 · rise 17-27 · coda 27+
    const bar = Math.floor(i / 8);
    const pos = i % 8;
    const D = [62, 64, 66, 69, 71, 74, 76, 78, 81];
    const arp = [
      [50, 57, 62, 66, 69, 66, 62, 57],
      [52, 59, 64, 71, 69, 64, 59, 57],
      [50, 57, 62, 69, 74, 69, 66, 62],
      [54, 57, 64, 66, 71, 69, 66, 64],
    ];
    const chords = [[50, 54, 57], [52, 57, 59], [50, 54, 57], [54, 57, 62]];
    if (ft < 4) {
      if (pos === 0 && bar === 0) this.pluck(50, at + 0.6, 0.55, -0.2);
      if (i === 6) this.pluck(57, at, 0.4, 0.2);
      if (i === 9) this.pluck(62, at, 0.45, 0);
      return;
    }
    if (pos === 0) this.chord(chords[bar % 4], at);
    if (slow < 0.6) {
      // in slow motion: sparse, suspended notes
      if (pos % 4 === 0) this.pluck(arp[bar % 4][pos] + (pos ? 12 : 0), at, 0.28, pos ? 0.3 : -0.3);
      return;
    }
    if (ft < 17) {
      if (pos % 2 === 0 || ft > 9) this.pluck(arp[bar % 4][pos], at, pos === 0 ? 0.5 : 0.32, (pos / 7 - 0.5) * 0.6);
      return;
    }
    if (ft < 27) {
      this.pluck(arp[bar % 4][pos], at, pos === 0 ? 0.5 : 0.34, (pos / 7 - 0.5) * 0.6);
      if (pos === 0 && bar % 2 === 0) {
        const mel = [D[3], D[4], D[5], D[4]];
        this.flute(mel[(bar / 2) % 4 | 0], at, 1.5, 0.35);
      }
      return;
    }
    // coda
    if (ft < 30.4) {
      if (pos % 2 === 0) this.pluck(arp[bar % 4][pos] + 12 * (pos === 4 ? 1 : 0), at, 0.36, (pos / 7 - 0.5) * 0.6);
      if (pos === 0) this.flute(pos === 0 ? 74 : 69, at, 2.2, 0.32);
    } else if (Math.abs(ft - 30.4) < 0.01) {
      this.pluck(50, at, 0.55);
      this.pluck(57, at + 0.08, 0.4);
      this.pluck(62, at + 0.16, 0.4);
      this.pluck(66, at + 0.24, 0.35);
      this.pluck(74, at + 0.32, 0.3);
      this.chord([50, 57, 62], at);
      this.gong(at + 0.05, 0.42);
    }
  }

  fadeOutMusic(at: number, dur: number) {
    this.music.gain.setTargetAtTime(0, at, dur / 3);
    if (this.padNodes) this.padNodes.gain.gain.setTargetAtTime(0, at, dur / 3);
  }

  // ───────────── effects ─────────────
  /** continuous beds; levels 0..1 */
  setBeds(stream: number, rumble: number) {
    const t = this.now();
    this.streamGain?.gain.setTargetAtTime(stream * 0.07, t, 0.1);
    this.rumbleGain?.gain.setTargetAtTime(rumble * 0.5, t, 0.08);
  }

  private env(at: number, peak: number, attack: number, decay: number) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(peak, at + attack);
    g.gain.exponentialRampToValueAtTime(Math.max(peak * 0.001, 1e-5), at + attack + decay);
    return g;
  }

  drip(vol: number, at?: number) {
    const t = at ?? this.now();
    if (t - this.lastDrip < 0.045 || this.rand() < 0.35) return;
    this.lastDrip = t;
    this.dripCount++;
    const f = 900 + this.rand() * 900;
    const o = this.ctx.createOscillator();
    o.frequency.setValueAtTime(f, t);
    o.frequency.exponentialRampToValueAtTime(f * 0.45, t + 0.06);
    const g = this.env(t, 0.038 * vol, 0.002, 0.08);
    o.connect(g).connect(this.sfx);
    o.start(t);
    o.stop(t + 0.12);
  }

  splash(vol: number, at?: number) {
    const t = at ?? this.now();
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 2200 + this.rand() * 1500;
    f.Q.value = 1.2;
    const g = this.env(t, 0.04 * vol, 0.003, 0.12);
    n.connect(f).connect(g).connect(this.sfx);
    n.start(t, this.rand() * 1.5);
    n.stop(t + 0.2);
  }

  /** hard wooden/iron knock – the lock catching a tooth */
  clack(vol: number, pitch = 1, at?: number) {
    const t = at ?? this.now();
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1900 * pitch;
    f.Q.value = 3;
    const g = this.env(t, 0.28 * vol, 0.001, 0.07);
    n.connect(f).connect(g).connect(this.sfx);
    n.start(t, this.rand());
    n.stop(t + 0.12);
    const o = this.ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(380 * pitch, t);
    o.frequency.exponentialRampToValueAtTime(240 * pitch, t + 0.1);
    const g2 = this.env(t, 0.22 * vol, 0.001, 0.16);
    o.connect(g2).connect(this.sfx);
    g2.connect(this.reverbIn);
    o.start(t);
    o.stop(t + 0.2);
  }

  /** lever creak when the steelyard tips */
  creak(vol: number, at?: number) {
    const t = at ?? this.now();
    const o = this.ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(70, t);
    o.frequency.linearRampToValueAtTime(110, t + 0.25);
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 900;
    f.Q.value = 6;
    const am = this.ctx.createOscillator();
    am.frequency.value = 31;
    const amg = this.ctx.createGain();
    amg.gain.value = 0.5;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.06 * vol, t + 0.05);
    g.gain.linearRampToValueAtTime(0, t + 0.3);
    am.connect(amg).connect(g.gain);
    o.connect(f).connect(g).connect(this.sfx);
    o.start(t); am.start(t);
    o.stop(t + 0.32); am.stop(t + 0.32);
  }

  tick(vol: number, at?: number) {
    const t = at ?? this.now();
    const o = this.ctx.createOscillator();
    o.type = "square";
    o.frequency.value = 2600 + this.rand() * 300;
    const f = this.ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 1800;
    const g = this.env(t, 0.03 * vol, 0.0008, 0.025);
    o.connect(f).connect(g).connect(this.sfx);
    o.start(t);
    o.stop(t + 0.04);
  }

  drum(vol: number, at?: number) {
    const t = at ?? this.now();
    const o = this.ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(62, t + 0.25);
    const g = this.env(t, 0.55 * vol, 0.003, 0.5);
    o.connect(g).connect(this.sfx);
    g.connect(this.reverbIn);
    o.start(t);
    o.stop(t + 0.6);
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 900;
    const g2 = this.env(t, 0.22 * vol, 0.001, 0.08);
    n.connect(f).connect(g2).connect(this.sfx);
    n.start(t, this.rand());
    n.stop(t + 0.12);
  }

  bell(vol: number, at?: number) {
    const t = at ?? this.now();
    const base = 587;
    const parts: [number, number, number][] = [[0.5, 0.5, 2.8], [1, 1, 2.2], [1.19, 0.4, 1.6], [1.5, 0.35, 1.4], [2.0, 0.3, 1.0], [2.74, 0.2, 0.7], [3.76, 0.1, 0.45]];
    const out = this.ctx.createGain();
    out.gain.value = 0.16 * vol;
    out.connect(this.sfx);
    out.connect(this.reverbIn);
    for (const [r, a, d] of parts) {
      const o = this.ctx.createOscillator();
      o.frequency.value = base * r;
      const g = this.env(t, a, 0.002, d);
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + d + 0.05);
    }
  }

  whoosh(vol = 1, at?: number) {
    const t = at ?? this.now();
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.4;
    f.frequency.setValueAtTime(300, t);
    f.frequency.exponentialRampToValueAtTime(1800, t + 0.7);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.05 * vol, t + 0.35);
    g.gain.linearRampToValueAtTime(0, t + 0.9);
    n.connect(f).connect(g).connect(this.sfx);
    n.start(t, this.rand());
    n.stop(t + 1);
  }

  get musicT0() {
    return this.musicStart;
  }
}

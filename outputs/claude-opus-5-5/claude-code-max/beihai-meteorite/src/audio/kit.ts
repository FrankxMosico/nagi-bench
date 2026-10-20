import type { SoundFactoryContext, SoundHandle } from "@agentbench/cinematic-player";

/**
 * Small synthesis kit on top of the Web Audio API. Every sound in the film is
 * generated at run time from oscillators, computed noise buffers and computed
 * impulse responses — no recordings, no files.
 *
 * `Voice` schedules relative to a virtual start t0 = now - offset, so a cue
 * resumed or seeked into continues from the right point of its envelopes.
 */

type NoiseKind = "white" | "pink" | "brown";

const noiseCache = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>();

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function noiseBuffer(ac: BaseAudioContext, kind: NoiseKind, seconds = 4, seed = 1): AudioBuffer {
  let cache = noiseCache.get(ac);
  if (!cache) {
    cache = new Map();
    noiseCache.set(ac, cache);
  }
  const key = `${kind}:${seconds}:${seed}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    const r = rng(seed * 7 + ch * 1013);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < len; i++) {
      const w = r() * 2 - 1;
      if (kind === "white") d[i] = w * 0.5;
      else if (kind === "pink") {
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856;
        b4 = 0.55 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      } else {
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.2;
      }
    }
    // crossfade the loop seam
    const fade = Math.min(2048, Math.floor(len / 8));
    for (let i = 0; i < fade; i++) {
      const k = i / fade;
      d[i] = d[i]! * k + d[len - fade + i]! * (1 - k);
    }
  }
  cache.set(key, buf);
  return buf;
}

const irCache = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>();

export interface RoomSpec {
  seconds: number;
  /** RT60-ish decay time constant in seconds. */
  decay: number;
  /** 0 = dark (absorbent), 1 = bright (hard walls). */
  bright: number;
  /** Discrete early reflections: [delay s, gain]. */
  early?: Array<[number, number]>;
  predelay?: number;
}

/** A computed impulse response: early reflections plus a damped noise tail. */
export function impulse(ac: BaseAudioContext, spec: RoomSpec): AudioBuffer {
  let cache = irCache.get(ac);
  if (!cache) {
    cache = new Map();
    irCache.set(ac, cache);
  }
  const key = JSON.stringify(spec);
  const hit = cache.get(key);
  if (hit) return hit;
  const len = Math.floor(ac.sampleRate * spec.seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  const pre = Math.floor((spec.predelay ?? 0) * ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    const r = rng(11 + ch * 97);
    let lp = 0;
    for (let i = pre; i < len; i++) {
      const t = (i - pre) / ac.sampleRate;
      const env = Math.exp((-6.9 * t) / spec.decay);
      // high frequencies die first: the one-pole gets darker over time
      const k = Math.min(0.98, 0.15 + (1 - spec.bright) * 0.5 + t * (1.2 - spec.bright));
      lp = lp * k + (r() * 2 - 1) * (1 - k);
      d[i] = lp * env * 0.6;
    }
    // normalise the diffuse tail to unit energy (sample-rate independent level)
    let e = 0;
    for (let i = 0; i < len; i++) e += d[i]! * d[i]!;
    const k = e > 0 ? 1 / Math.sqrt(e) : 1;
    for (let i = 0; i < len; i++) d[i]! *= k;
    // discrete early reflections ride on top at their stated gains
    for (const [delay, g] of spec.early ?? []) {
      const j = Math.floor((delay + (ch ? 0.0013 : 0)) * ac.sampleRate);
      if (j < len) {
        d[j] = (d[j] ?? 0) + g * (ch ? 0.9 : 1);
        if (j + 1 < len) d[j + 1] = (d[j + 1] ?? 0) - g * 0.4;
      }
    }
  }
  cache.set(key, buf);
  return buf;
}

export function softClip(amount: number): Float32Array<ArrayBuffer> {
  const n = 1024;
  const curve = new Float32Array(new ArrayBuffer(n * 4));
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
  }
  return curve;
}

export type Key = [number, number];

/** Scheduling helper bound to one cue instance. */
export class Voice {
  readonly ac: AudioContext;
  readonly out: GainNode;
  readonly now: number;
  readonly t0: number;
  readonly offset: number;
  private readonly sources: AudioScheduledSourceNode[] = [];
  private readonly master: GainNode;

  constructor(ctx: SoundFactoryContext) {
    this.ac = ctx.audioContext;
    this.offset = ctx.offset;
    this.now = this.ac.currentTime;
    this.t0 = this.now - this.offset;
    this.master = this.ac.createGain();
    this.master.gain.value = 1;
    this.master.connect(ctx.output);
    this.out = this.master;
  }

  /** Absolute audio time of a cue-relative moment, never in the past. */
  at(tau: number): number {
    return Math.max(this.now, this.t0 + tau);
  }

  /** Piecewise-linear envelope from cue-relative keys, correct when entered late. */
  env(param: AudioParam, keys: Key[], exp = false): void {
    const off = this.offset;
    let v = keys[0]![1];
    for (let i = 0; i < keys.length; i++) {
      const [kt, kv] = keys[i]!;
      if (kt <= off) v = kv;
      else {
        const prev = keys[i - 1];
        if (prev) v = prev[1] + ((kv - prev[1]) * (off - prev[0])) / (kt - prev[0]);
        break;
      }
    }
    param.cancelScheduledValues(this.now);
    param.setValueAtTime(exp ? Math.max(1e-5, v) : v, this.now);
    for (const [kt, kv] of keys) {
      if (kt <= off) continue;
      const when = this.t0 + kt;
      if (exp) param.exponentialRampToValueAtTime(Math.max(1e-5, kv), when);
      else param.linearRampToValueAtTime(kv, when);
    }
  }

  gain(v = 1, to?: AudioNode): GainNode {
    const g = this.ac.createGain();
    g.gain.value = v;
    g.connect(to ?? this.out);
    return g;
  }

  /** A modulation input: whatever feeds the returned gain wobbles `param` by ±depth. */
  mod(param: AudioParam, depth: number): GainNode {
    const g = this.ac.createGain();
    g.gain.value = depth;
    g.connect(param);
    return g;
  }

  filter(type: BiquadFilterType, freq: number, q = 0.7, to?: AudioNode): BiquadFilterNode {
    const f = this.ac.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    if (to) f.connect(to);
    return f;
  }

  osc(type: OscillatorType, freq: number, to: AudioNode, startTau = 0, stopTau?: number): OscillatorNode {
    const o = this.ac.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    o.connect(to);
    o.start(this.at(startTau));
    if (stopTau !== undefined) o.stop(Math.max(this.at(startTau) + 0.01, this.t0 + stopTau));
    this.sources.push(o);
    return o;
  }

  noise(kind: NoiseKind, to: AudioNode, startTau = 0, stopTau?: number, seed = 1, rate = 1): AudioBufferSourceNode {
    const s = this.ac.createBufferSource();
    s.buffer = noiseBuffer(this.ac, kind, 4, seed);
    s.loop = true;
    s.playbackRate.value = rate;
    s.connect(to);
    const startAt = this.at(startTau);
    s.start(startAt, (seed * 0.37) % 3.5);
    if (stopTau !== undefined) s.stop(Math.max(startAt + 0.01, this.t0 + stopTau));
    this.sources.push(s);
    return s;
  }

  reverb(spec: RoomSpec, wet: number, to?: AudioNode): ConvolverNode {
    const c = this.ac.createConvolver();
    c.normalize = false;
    c.buffer = impulse(this.ac, spec);
    const g = this.gain(wet, to);
    c.connect(g);
    return c;
  }

  shaper(amount: number, to: AudioNode): WaveShaperNode {
    const w = this.ac.createWaveShaper();
    w.curve = softClip(amount);
    w.oversample = "2x";
    w.connect(to);
    return w;
  }

  panner(pan: number, to: AudioNode): StereoPannerNode {
    const p = this.ac.createStereoPanner();
    p.pan.value = pan;
    p.connect(to);
    return p;
  }

  /** A one-shot burst: decaying noise through a band. */
  burst(tau: number, opts: { kind?: NoiseKind; type?: BiquadFilterType; freq: number; q?: number; peak: number; decay: number; to?: AudioNode; attack?: number; seed?: number }): void {
    if (this.t0 + tau < this.now - 0.02) return;
    const when = this.t0 + tau;
    const g = this.ac.createGain();
    g.gain.value = 0;
    g.connect(opts.to ?? this.out);
    const f = this.filter(opts.type ?? "bandpass", opts.freq, opts.q ?? 1, g);
    const s = this.ac.createBufferSource();
    s.buffer = noiseBuffer(this.ac, opts.kind ?? "white", 1, opts.seed ?? 3);
    s.connect(f);
    const a = opts.attack ?? 0.001;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(opts.peak, when + a);
    g.gain.setTargetAtTime(0, when + a, opts.decay);
    s.start(when, ((opts.seed ?? 3) * 0.13) % 0.5);
    s.stop(when + a + opts.decay * 8 + 0.05);
    this.sources.push(s);
  }

  /** A decaying sine partial, optionally sweeping. */
  ping(tau: number, freq: number, peak: number, decay: number, opts: { to?: AudioNode; sweepTo?: number; sweepTime?: number; type?: OscillatorType; attack?: number } = {}): void {
    if (this.t0 + tau < this.now - 0.02) return;
    const when = this.t0 + tau;
    const g = this.ac.createGain();
    g.gain.value = 0;
    g.connect(opts.to ?? this.out);
    const o = this.ac.createOscillator();
    o.type = opts.type ?? "sine";
    o.frequency.setValueAtTime(freq, when);
    if (opts.sweepTo) o.frequency.exponentialRampToValueAtTime(opts.sweepTo, when + (opts.sweepTime ?? decay * 2));
    o.connect(g);
    const a = opts.attack ?? 0.002;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + a);
    g.gain.setTargetAtTime(0, when + a, decay);
    o.start(when);
    o.stop(when + a + decay * 8 + 0.05);
    this.sources.push(o);
  }

  handle(): SoundHandle {
    return {
      stop: () => {
        const t = this.ac.currentTime;
        this.master.gain.cancelScheduledValues(t);
        this.master.gain.setValueAtTime(this.master.gain.value, t);
        this.master.gain.linearRampToValueAtTime(0, t + 0.04);
        for (const s of this.sources) {
          try {
            s.stop(t + 0.05);
          } catch {
            /* already stopped */
          }
        }
      },
    };
  }
}

/** Musical helpers */
export const NOTE: Record<string, number> = {};
{
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  for (let o = 1; o <= 7; o++) names.forEach((n, i) => (NOTE[`${n}${o}`] = 440 * Math.pow(2, (i - 9 + (o - 4) * 12) / 12)));
}

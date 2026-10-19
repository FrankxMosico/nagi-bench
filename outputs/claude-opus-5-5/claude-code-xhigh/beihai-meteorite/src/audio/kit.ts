import type { SoundFactoryContext, SoundHandle } from "@agentbench/cinematic-player";
import { mulberry32 } from "../core/anim";

/**
 * Small toolkit over raw Web Audio nodes. Every buffer here is computed from
 * code at runtime: noise, impulse responses, nothing recorded.
 */

type NoiseKind = "white" | "pink" | "brown";
const noiseCache = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>();
const irCache = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>();

export function noiseBuffer(ac: BaseAudioContext, kind: NoiseKind, seconds = 4, seed = 1): AudioBuffer {
  let m = noiseCache.get(ac);
  if (!m) {
    m = new Map();
    noiseCache.set(ac, m);
  }
  const key = `${kind}:${seconds}:${seed}`;
  const hit = m.get(key);
  if (hit) return hit;
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    const r = mulberry32(seed * 7 + ch * 131);
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
        d[i] = last * 3.5;
      }
    }
    // Crossfade the loop seam.
    const fade = Math.floor(ac.sampleRate * 0.05);
    for (let i = 0; i < fade; i++) {
      const k = i / fade;
      d[i] = d[i]! * k + d[len - fade + i]! * (1 - k);
    }
  }
  m.set(key, buf);
  return buf;
}

export interface IRSpec {
  seconds: number;
  decay: number; // RT-ish exponent
  early?: Array<[number, number]>; // [delay s, gain]
  brightness?: number; // 0..1, high-frequency retention over the tail
  predelay?: number;
}

export function impulse(ac: BaseAudioContext, key: string, spec: IRSpec): AudioBuffer {
  let m = irCache.get(ac);
  if (!m) {
    m = new Map();
    irCache.set(ac, m);
  }
  const hit = m.get(key);
  if (hit) return hit;
  const len = Math.floor(ac.sampleRate * spec.seconds);
  const buf = ac.createBuffer(2, len, ac.sampleRate);
  const pre = Math.floor((spec.predelay ?? 0) * ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    const r = mulberry32(991 + ch * 17 + key.length);
    let lp = 0;
    const bright = spec.brightness ?? 0.5;
    for (let i = pre; i < len; i++) {
      const t = (i - pre) / ac.sampleRate;
      const env = Math.exp(-t * spec.decay);
      // Darken the tail progressively: a one-pole lowpass whose cutoff falls with time.
      const a = Math.min(0.98, 0.15 + (1 - bright) * 0.6 + t * 0.6);
      lp = lp * a + (r() * 2 - 1) * (1 - a);
      d[i] = lp * env * (1.6 + bright);
    }
    for (const [dt, g] of spec.early ?? []) {
      const at = pre + Math.floor((dt + (ch ? 0.0007 : 0)) * ac.sampleRate);
      for (let k = 0; k < 24 && at + k < len; k++) d[at + k] += g * (1 - k / 24) * (k % 2 ? -1 : 1);
    }
  }
  m.set(key, buf);
  return buf;
}

/**
 * One sounding cue: an output gain with a de-click fade, a list of sources to
 * stop, and helpers to schedule events in cue-relative time (respecting the
 * offset the bus passes when resuming mid-cue).
 */
export class Voice {
  readonly ac: AudioContext;
  readonly out: GainNode;
  readonly now: number;
  readonly off: number;
  readonly dur: number;
  private srcs: AudioScheduledSourceNode[] = [];

  constructor(ctx: SoundFactoryContext, fadeIn = 0.015) {
    this.ac = ctx.audioContext;
    this.now = this.ac.currentTime + 0.005;
    this.off = ctx.offset;
    this.dur = ctx.cue.end - ctx.cue.start;
    this.out = this.ac.createGain();
    this.out.gain.setValueAtTime(0, this.now);
    this.out.gain.linearRampToValueAtTime(1, this.now + fadeIn);
    this.out.connect(ctx.output);
  }

  /** Absolute context time for a cue-relative time (never negative). */
  at(tau: number): number {
    return Math.max(0, this.now + tau - this.off);
  }

  /** True if an event at cue time tau is still ahead of the playhead. */
  ahead(tau: number): boolean {
    return tau >= this.off - 0.01;
  }

  /**
   * Noise source. Only three buffers per colour exist per context; variety
   * for one-shots comes from starting at a seed-dependent point in the buffer.
   */
  noise(kind: NoiseKind, seed = 1, loop = true): AudioBufferSourceNode {
    const s = this.ac.createBufferSource();
    s.buffer = noiseBuffer(this.ac, kind, 4, (Math.abs(Math.floor(seed)) % 3) + 1);
    s.loop = loop;
    this.bufferOffsets.set(s, ((Math.abs(seed) * 0.6180339) % 1) * 3.4);
    return s;
  }

  private readonly bufferOffsets = new WeakMap<AudioScheduledSourceNode, number>();

  osc(type: OscillatorType, f: number): OscillatorNode {
    const o = this.ac.createOscillator();
    o.type = type;
    o.frequency.value = f;
    return o;
  }

  gain(v = 1): GainNode {
    const g = this.ac.createGain();
    g.gain.value = v;
    return g;
  }

  filter(type: BiquadFilterType, f: number, q = 0.7, gainDb = 0): BiquadFilterNode {
    const b = this.ac.createBiquadFilter();
    b.type = type;
    b.frequency.value = f;
    b.Q.value = q;
    b.gain.value = gainDb;
    return b;
  }

  pan(p: number): StereoPannerNode {
    const s = this.ac.createStereoPanner();
    s.pan.value = p;
    return s;
  }

  conv(key: string, spec: IRSpec): ConvolverNode {
    const c = this.ac.createConvolver();
    c.buffer = impulse(this.ac, key, spec);
    return c;
  }

  shaper(amount: number): WaveShaperNode {
    const w = this.ac.createWaveShaper();
    const n = 1024;
    const curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1;
      curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
    }
    w.curve = curve;
    return w;
  }

  /** Connect nodes in series; the last element may be an AudioParam (modulation). */
  chain(...nodes: Array<AudioNode | AudioParam>): AudioNode | AudioParam {
    for (let i = 0; i < nodes.length - 1; i++) {
      const from = nodes[i] as AudioNode;
      const to = nodes[i + 1]!;
      if (to instanceof AudioParam) from.connect(to);
      else from.connect(to);
    }
    return nodes[nodes.length - 1]!;
  }

  /** Start a source at cue time tau (clamped to now) and stop it at tauEnd. */
  play(src: AudioScheduledSourceNode, tau = 0, tauEnd?: number): void {
    const start = Math.max(this.ac.currentTime, this.at(tau));
    const end = tauEnd === undefined ? this.at(this.dur) + 0.2 : this.at(tauEnd);
    if (end <= start) return;
    const bo = this.bufferOffsets.get(src);
    if (bo !== undefined && src instanceof AudioBufferSourceNode) src.start(start, bo);
    else src.start(start);
    src.stop(end);
    this.srcs.push(src);
  }

  /** Piecewise-linear automation in cue time, clamped to the playhead. */
  ramp(param: AudioParam, points: Array<[number, number]>): void {
    const t0 = this.ac.currentTime;
    // Value at the playhead.
    let v = points[0]![1];
    for (let i = 0; i < points.length; i++) {
      const [tau, val] = points[i]!;
      if (tau <= this.off) v = val;
      else {
        const prev = points[i - 1];
        if (prev && prev[0] < this.off) {
          const k = (this.off - prev[0]) / (tau - prev[0]);
          v = prev[1] + (val - prev[1]) * k;
        }
        break;
      }
    }
    param.cancelScheduledValues(t0);
    param.setValueAtTime(v, Math.max(t0, this.now));
    for (const [tau, val] of points) {
      if (tau <= this.off) continue;
      param.linearRampToValueAtTime(val, this.at(tau));
    }
  }

  /** Short exponential decay envelope on a gain param at cue time tau. */
  hit(param: AudioParam, tau: number, peak: number, attack: number, decay: number): void {
    const t = this.at(tau);
    param.setValueAtTime(0.0001, t);
    param.linearRampToValueAtTime(peak, t + attack);
    param.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  handle(): SoundHandle {
    return {
      stop: () => {
        const t = this.ac.currentTime;
        this.out.gain.cancelScheduledValues(t);
        this.out.gain.setValueAtTime(this.out.gain.value, t);
        this.out.gain.linearRampToValueAtTime(0, t + 0.06);
        for (const s of this.srcs) {
          try {
            s.stop(t + 0.08);
          } catch {
            /* already stopped */
          }
        }
      },
    };
  }
}

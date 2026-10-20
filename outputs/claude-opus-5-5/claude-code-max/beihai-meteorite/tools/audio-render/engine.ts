/**
 * A small offline implementation of the Web Audio node graph — just the parts
 * the film uses — so the real sound factories and the real cue bus can be
 * rendered to PCM and measured without a browser. Mono-summed metering taps
 * record per-cue peak and RMS.
 */

export const BLOCK = 128;

type Event =
  | { type: "set"; t: number; v: number }
  | { type: "lin"; t: number; v: number }
  | { type: "exp"; t: number; v: number }
  | { type: "target"; t: number; v: number; c: number };

export class OParam {
  value: number;
  readonly defaultValue: number;
  events: Event[] = [];
  inputs: ONode[] = [];
  minValue = -3.4e38;
  maxValue = 3.4e38;
  private buf = new Float32Array(BLOCK);
  constructor(public ctx: OCtx, v: number, public kRate = false) {
    this.value = v;
    this.defaultValue = v;
  }
  private insert(e: Event) {
    let i = this.events.length;
    while (i > 0 && this.events[i - 1]!.t > e.t) i--;
    this.events.splice(i, 0, e);
  }
  setValueAtTime(v: number, t: number) {
    this.insert({ type: "set", t, v });
    return this;
  }
  linearRampToValueAtTime(v: number, t: number) {
    this.insert({ type: "lin", t, v });
    return this;
  }
  exponentialRampToValueAtTime(v: number, t: number) {
    this.insert({ type: "exp", t, v });
    return this;
  }
  setTargetAtTime(v: number, t: number, c: number) {
    this.insert({ type: "target", t, v, c });
    return this;
  }
  setValueCurveAtTime() {
    return this;
  }
  cancelScheduledValues(t: number) {
    this.events = this.events.filter((e) => e.t < t);
    return this;
  }
  cancelAndHoldAtTime(t: number) {
    return this.cancelScheduledValues(t);
  }
  /** Intrinsic value at time t (seconds), per the Web Audio automation rules (simplified). */
  private at(t: number): number {
    let v = this.value;
    let prevT = 0;
    let prevV = this.value;
    for (let i = 0; i < this.events.length; i++) {
      const e = this.events[i]!;
      if (e.type === "target") {
        if (t < e.t) break;
        // find the end of this target's run
        const next = this.events[i + 1];
        const end = next ? next.t : Infinity;
        const tt = Math.min(t, end);
        const start = Math.max(e.t, prevT);
        v = e.v + (prevV - e.v) * Math.exp(-(tt - start) / Math.max(1e-6, e.c));
        if (t < end) return v;
        prevT = end;
        prevV = v;
        continue;
      }
      if (e.t > t) {
        if (e.type === "lin") return prevV + ((e.v - prevV) * (t - prevT)) / Math.max(1e-9, e.t - prevT);
        if (e.type === "exp") {
          if (prevV <= 0 || e.v <= 0) return prevV;
          return prevV * Math.pow(e.v / prevV, (t - prevT) / Math.max(1e-9, e.t - prevT));
        }
        return prevV;
      }
      v = e.v;
      prevT = e.t;
      prevV = e.v;
    }
    return v;
  }
  /** Per-sample values for the block starting at sample index s0. */
  block(s0: number): Float32Array {
    const sr = this.ctx.sampleRate;
    if (this.kRate || this.events.length === 0) {
      const v = this.events.length === 0 ? this.value : this.at(s0 / sr);
      this.buf.fill(v);
    } else {
      for (let i = 0; i < BLOCK; i++) this.buf[i] = this.at((s0 + i) / sr);
    }
    if (this.inputs.length) {
      for (const n of this.inputs) {
        const o = n.output(s0);
        for (let i = 0; i < BLOCK; i++) this.buf[i] += (o[0]![i]! + o[1]![i]!) * 0.5;
      }
    }
    return this.buf;
  }
}

export abstract class ONode {
  inputs: ONode[] = [];
  outs = new Set<ONode | OParam>();
  private cacheBlock = -1;
  private cache: [Float32Array, Float32Array] = [new Float32Array(BLOCK), new Float32Array(BLOCK)];
  meter: { peak: number; sumSq: number; n: number } | null = null;
  constructor(public ctx: OCtx) {
    ctx.nodes++;
  }
  connect<T extends ONode | OParam>(dest: T): T {
    this.outs.add(dest);
    if (dest instanceof OParam) dest.inputs.push(this);
    else (dest as ONode).inputs.push(this);
    return dest;
  }
  disconnect(): void {
    for (const d of this.outs) {
      if (d instanceof OParam) d.inputs = d.inputs.filter((x) => x !== this);
      else (d as ONode).inputs = (d as ONode).inputs.filter((x) => x !== this);
    }
    this.outs.clear();
  }
  protected mixInputs(s0: number, out: [Float32Array, Float32Array]): void {
    out[0].fill(0);
    out[1].fill(0);
    for (const n of this.inputs) {
      const o = n.output(s0);
      for (let i = 0; i < BLOCK; i++) {
        out[0][i] += o[0]![i]!;
        out[1][i] += o[1]![i]!;
      }
    }
  }
  output(s0: number): [Float32Array, Float32Array] {
    const b = s0 / BLOCK;
    if (b === this.cacheBlock) return this.cache;
    this.cacheBlock = b;
    this.process(s0, this.cache);
    if (this.meter) {
      for (let i = 0; i < BLOCK; i++) {
        const v = Math.max(Math.abs(this.cache[0][i]!), Math.abs(this.cache[1][i]!));
        if (v > this.meter.peak) this.meter.peak = v;
        this.meter.sumSq += (this.cache[0][i]! ** 2 + this.cache[1][i]! ** 2) * 0.5;
        this.meter.n++;
      }
    }
    return this.cache;
  }
  protected abstract process(s0: number, out: [Float32Array, Float32Array]): void;
}

export class OGain extends ONode {
  gain: OParam;
  constructor(ctx: OCtx) {
    super(ctx);
    this.gain = new OParam(ctx, 1);
  }
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
    const g = this.gain.block(s0);
    for (let i = 0; i < BLOCK; i++) {
      out[0][i] *= g[i]!;
      out[1][i] *= g[i]!;
    }
  }
}

abstract class OSource extends ONode {
  startAt = Infinity;
  stopAt = Infinity;
  started = false;
  onended: (() => void) | null = null;
  start(when = 0, offset = 0): void {
    this.started = true;
    this.startAt = when;
    this.offset = offset;
  }
  offset = 0;
  stop(when = 0): void {
    this.stopAt = Math.min(this.stopAt === Infinity ? when : this.stopAt, when);
    this.stopAt = when;
  }
}

export class OOsc extends OSource {
  type: OscillatorType = "sine";
  frequency: OParam;
  detune: OParam;
  private phase = 0;
  constructor(ctx: OCtx) {
    super(ctx);
    this.frequency = new OParam(ctx, 440);
    this.detune = new OParam(ctx, 0, true);
  }
  setPeriodicWave(): void {}
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    const sr = this.ctx.sampleRate;
    const f = this.frequency.block(s0);
    const det = this.detune.block(s0)[0]!;
    const k = det ? Math.pow(2, det / 1200) : 1;
    for (let i = 0; i < BLOCK; i++) {
      const t = (s0 + i) / sr;
      if (t < this.startAt || t >= this.stopAt) {
        out[0][i] = 0;
        out[1][i] = 0;
        continue;
      }
      const p = this.phase;
      let v: number;
      switch (this.type) {
        case "square":
          v = p < 0.5 ? 1 : -1;
          break;
        case "sawtooth":
          v = 2 * p - 1;
          break;
        case "triangle":
          v = p < 0.5 ? 4 * p - 1 : 3 - 4 * p;
          break;
        default:
          v = Math.sin(p * Math.PI * 2);
      }
      out[0][i] = v;
      out[1][i] = v;
      this.phase += (f[i]! * k) / sr;
      this.phase -= Math.floor(this.phase);
    }
  }
}

export class OBuffer {
  private ch: Float32Array[];
  constructor(public numberOfChannels: number, public length: number, public sampleRate: number) {
    this.ch = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
  }
  get duration() {
    return this.length / this.sampleRate;
  }
  getChannelData(c: number): Float32Array {
    return this.ch[c]!;
  }
}

export class OBufSrc extends OSource {
  buffer: OBuffer | null = null;
  loop = false;
  playbackRate: OParam;
  detune: OParam;
  private pos = -1;
  constructor(ctx: OCtx) {
    super(ctx);
    this.playbackRate = new OParam(ctx, 1, true);
    this.detune = new OParam(ctx, 0, true);
  }
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    const sr = this.ctx.sampleRate;
    const b = this.buffer;
    const rate = this.playbackRate.block(s0)[0]! * (b ? b.sampleRate / sr : 1);
    for (let i = 0; i < BLOCK; i++) {
      const t = (s0 + i) / sr;
      if (!b || t < this.startAt || t >= this.stopAt) {
        out[0][i] = 0;
        out[1][i] = 0;
        continue;
      }
      if (this.pos < 0) this.pos = this.offset * b.sampleRate;
      let idx = Math.floor(this.pos);
      if (idx >= b.length) {
        if (this.loop) {
          this.pos -= b.length;
          idx = Math.floor(this.pos);
        } else {
          out[0][i] = 0;
          out[1][i] = 0;
          continue;
        }
      }
      const l = b.getChannelData(0)[idx]!;
      const r = b.numberOfChannels > 1 ? b.getChannelData(1)[idx]! : l;
      out[0][i] = l;
      out[1][i] = r;
      this.pos += rate;
    }
  }
}

export class OBiquad extends ONode {
  type: BiquadFilterType = "lowpass";
  frequency: OParam;
  Q: OParam;
  gain: OParam;
  detune: OParam;
  private z = [new Float64Array(2), new Float64Array(2)];
  constructor(ctx: OCtx) {
    super(ctx);
    this.frequency = new OParam(ctx, 350);
    this.Q = new OParam(ctx, 1, true);
    this.gain = new OParam(ctx, 0, true);
    this.detune = new OParam(ctx, 0, true);
  }
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
    const sr = this.ctx.sampleRate;
    const f0 = Math.min(sr / 2 - 1, Math.max(1, this.frequency.block(s0)[0]!));
    const Q = Math.max(1e-4, this.Q.block(s0)[0]!);
    const G = this.gain.block(s0)[0]!;
    const w0 = (2 * Math.PI * f0) / sr;
    const cw = Math.cos(w0);
    const sw = Math.sin(w0);
    let b0 = 1, b1 = 0, b2 = 0, a0 = 1, a1 = 0, a2 = 0;
    const A = Math.pow(10, G / 40);
    switch (this.type) {
      case "lowpass": {
        // Web Audio lowpass Q is in dB
        const alpha = sw / (2 * Math.pow(10, Q / 20));
        b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = (1 - cw) / 2; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha;
        break;
      }
      case "highpass": {
        const alpha = sw / (2 * Math.pow(10, Q / 20));
        b0 = (1 + cw) / 2; b1 = -(1 + cw); b2 = (1 + cw) / 2; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha;
        break;
      }
      case "bandpass": {
        const alpha = sw / (2 * Q);
        b0 = alpha; b1 = 0; b2 = -alpha; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha;
        break;
      }
      case "peaking": {
        const alpha = sw / (2 * Q);
        b0 = 1 + alpha * A; b1 = -2 * cw; b2 = 1 - alpha * A; a0 = 1 + alpha / A; a1 = -2 * cw; a2 = 1 - alpha / A;
        break;
      }
      case "notch": {
        const alpha = sw / (2 * Q);
        b0 = 1; b1 = -2 * cw; b2 = 1; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha;
        break;
      }
      default:
        break;
    }
    b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0;
    for (let c = 0; c < 2; c++) {
      const z = this.z[c]!;
      const x = out[c]!;
      for (let i = 0; i < BLOCK; i++) {
        const xi = x[i]!;
        const y = b0 * xi + z[0]!;
        z[0] = b1 * xi - a1 * y + z[1]!;
        z[1] = b2 * xi - a2 * y;
        x[i] = Number.isFinite(y) ? y : 0;
      }
    }
  }
}

/* ---------------------------------------------------------------- convolver */

function fft(re: Float64Array, im: Float64Array, inverse: boolean): void {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j]!, re[i]!];
      [im[i], im[j]] = [im[j]!, im[i]!];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = ((inverse ? 2 : -2) * Math.PI) / len;
    const wr = Math.cos(ang);
    const wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1;
      let ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const ar = re[i + k]!;
        const ai = im[i + k]!;
        const br = re[i + k + len / 2]! * cr - im[i + k + len / 2]! * ci;
        const bi = re[i + k + len / 2]! * ci + im[i + k + len / 2]! * cr;
        re[i + k] = ar + br;
        im[i + k] = ai + bi;
        re[i + k + len / 2] = ar - br;
        im[i + k + len / 2] = ai - bi;
        const t = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = t;
      }
    }
  }
  if (inverse) for (let i = 0; i < n; i++) {
    re[i]! /= n;
    im[i]! /= n;
  }
}

const irSpectra = new WeakMap<OBuffer, Array<Array<{ re: Float64Array; im: Float64Array }>>>();
const PART = 1024;

/** Uniformly partitioned FFT convolution (partition 1024), stereo, true-stereo off. */
export class OConvolver extends ONode {
  normalize = true;
  private ir: OBuffer | null = null;
  private parts: Array<Array<{ re: Float64Array; im: Float64Array }>> = [];
  private hist: Array<Array<{ re: Float64Array; im: Float64Array }>> = [[], []];
  private inBuf = [new Float64Array(PART), new Float64Array(PART)];
  private outQueue = [new Float64Array(PART * 2), new Float64Array(PART * 2)];
  private fill = 0;
  private outPos = 0;
  get buffer(): OBuffer | null {
    return this.ir;
  }
  set buffer(b: OBuffer | null) {
    this.ir = b;
    if (!b) return;
    let cached = irSpectra.get(b);
    if (!cached) {
      cached = [];
      for (let c = 0; c < 2; c++) {
        const d = b.getChannelData(Math.min(c, b.numberOfChannels - 1));
        const list: Array<{ re: Float64Array; im: Float64Array }> = [];
        for (let p = 0; p * PART < d.length; p++) {
          const re = new Float64Array(PART * 2);
          const im = new Float64Array(PART * 2);
          for (let i = 0; i < PART && p * PART + i < d.length; i++) re[i] = d[p * PART + i]!;
          fft(re, im, false);
          list.push({ re, im });
        }
        cached.push(list);
      }
      irSpectra.set(b, cached);
    }
    this.parts = cached;
  }
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
    if (!this.ir || this.parts.length === 0) {
      out[0].fill(0);
      out[1].fill(0);
      return;
    }
    for (let c = 0; c < 2; c++) this.inBuf[c]!.set(out[c]!, this.fill);
    this.fill += BLOCK;
    // emit queued output for this block
    for (let c = 0; c < 2; c++) {
      const q = this.outQueue[c]!;
      for (let i = 0; i < BLOCK; i++) out[c]![i] = q[this.outPos + i]!;
    }
    this.outPos += BLOCK;
    if (this.fill === PART) {
      // a full partition arrived: convolve and stage the next PART samples of output
      for (let c = 0; c < 2; c++) {
        const re = new Float64Array(PART * 2);
        const im = new Float64Array(PART * 2);
        re.set(this.inBuf[c]!);
        fft(re, im, false);
        const h = this.hist[c]!;
        h.unshift({ re, im });
        if (h.length > this.parts[c]!.length) h.pop();
        const accR = new Float64Array(PART * 2);
        const accI = new Float64Array(PART * 2);
        for (let p = 0; p < h.length; p++) {
          const x = h[p]!;
          const y = this.parts[c]![p]!;
          for (let k = 0; k < PART * 2; k++) {
            accR[k] += x.re[k]! * y.re[k]! - x.im[k]! * y.im[k]!;
            accI[k] += x.re[k]! * y.im[k]! + x.im[k]! * y.re[k]!;
          }
        }
        fft(accR, accI, true);
        const q = this.outQueue[c]!;
        // shift the queue: the overlap tail becomes the head
        const next = new Float64Array(PART * 2);
        for (let i = 0; i < PART; i++) next[i] = q[PART + i]! + accR[i]!;
        for (let i = 0; i < PART; i++) next[PART + i] = accR[PART + i]!;
        this.outQueue[c] = next;
      }
      this.fill = 0;
      this.outPos = 0;
    }
  }
}

export class OShaper extends ONode {
  curve: Float32Array | null = null;
  oversample = "none";
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
    const c = this.curve;
    if (!c) return;
    const n = c.length;
    for (let ch = 0; ch < 2; ch++) {
      const x = out[ch]!;
      for (let i = 0; i < BLOCK; i++) {
        const v = Math.max(-1, Math.min(1, x[i]!));
        const f = ((v + 1) / 2) * (n - 1);
        const k = Math.floor(f);
        const fr = f - k;
        x[i] = k >= n - 1 ? c[n - 1]! : c[k]! * (1 - fr) + c[k + 1]! * fr;
      }
    }
  }
}

export class OPanner extends ONode {
  pan: OParam;
  constructor(ctx: OCtx) {
    super(ctx);
    this.pan = new OParam(ctx, 0);
  }
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
    const p = this.pan.block(s0);
    for (let i = 0; i < BLOCK; i++) {
      const pan = Math.max(-1, Math.min(1, p[i]!));
      const m = (out[0][i]! + out[1][i]!) * 0.5;
      const x = (pan + 1) / 2;
      out[0][i] = m * Math.cos((x * Math.PI) / 2);
      out[1][i] = m * Math.sin((x * Math.PI) / 2);
    }
  }
}

/** Peak limiter approximating the bus's DynamicsCompressor settings. */
export class OCompressor extends ONode {
  threshold: OParam;
  knee: OParam;
  ratio: OParam;
  attack: OParam;
  release: OParam;
  reduction = 0;
  private env = 0;
  maxReductionDb = 0;
  constructor(ctx: OCtx) {
    super(ctx);
    this.threshold = new OParam(ctx, -24, true);
    this.knee = new OParam(ctx, 30, true);
    this.ratio = new OParam(ctx, 12, true);
    this.attack = new OParam(ctx, 0.003, true);
    this.release = new OParam(ctx, 0.25, true);
  }
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
    const sr = this.ctx.sampleRate;
    const th = this.threshold.block(s0)[0]!;
    const ratio = this.ratio.block(s0)[0]!;
    const att = Math.exp(-1 / (Math.max(1e-4, this.attack.block(s0)[0]!) * sr));
    const rel = Math.exp(-1 / (Math.max(1e-3, this.release.block(s0)[0]!) * sr));
    // the browser applies automatic makeup gain: (1 / fullRangeGain) ^ 0.6
    const full = th + (0 - th) / ratio;
    const makeup = Math.pow(1 / Math.pow(10, full / 20), 0.6);
    for (let i = 0; i < BLOCK; i++) {
      const lvl = Math.max(Math.abs(out[0][i]!), Math.abs(out[1][i]!));
      const db = 20 * Math.log10(Math.max(1e-9, lvl));
      const over = Math.max(0, db - th);
      const red = over - over / ratio;
      this.env = red > this.env ? att * this.env + (1 - att) * red : rel * this.env + (1 - rel) * red;
      if (this.env > this.maxReductionDb) this.maxReductionDb = this.env;
      const g = Math.pow(10, -this.env / 20) * makeup;
      out[0][i] *= g;
      out[1][i] *= g;
    }
    this.reduction = -this.env;
  }
}

export class ODestination extends ONode {
  protected process(s0: number, out: [Float32Array, Float32Array]): void {
    this.mixInputs(s0, out);
  }
}

export class OCtx {
  sampleRate: number;
  state: "suspended" | "running" | "closed" = "suspended";
  destination: ODestination;
  nodes = 0;
  /** samples rendered so far */
  frame = 0;
  constructor(sampleRate = 16000) {
    this.sampleRate = sampleRate;
    this.destination = new ODestination(this);
  }
  get currentTime(): number {
    return this.frame / this.sampleRate;
  }
  resume() {
    this.state = "running";
    return Promise.resolve();
  }
  suspend() {
    this.state = "suspended";
    return Promise.resolve();
  }
  close() {
    this.state = "closed";
    return Promise.resolve();
  }
  createGain() { return new OGain(this); }
  createOscillator() { return new OOsc(this); }
  createBufferSource() { return new OBufSrc(this); }
  createBiquadFilter() { return new OBiquad(this); }
  createConvolver() { return new OConvolver(this); }
  createWaveShaper() { return new OShaper(this); }
  createStereoPanner() { return new OPanner(this); }
  createDynamicsCompressor() { return new OCompressor(this); }
  createBuffer(ch: number, len: number, sr: number) { return new OBuffer(ch, len, sr); }
  /** Render one block into dst at the current frame and advance. */
  renderBlock(): [Float32Array, Float32Array] {
    const o = this.destination.output(this.frame);
    this.frame += BLOCK;
    return o;
  }
}

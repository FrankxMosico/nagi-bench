/**
 * A strict Web Audio stand-in. It produces no sound but enforces the same
 * rules browsers do (positive exponential targets, finite times, single
 * start/stop, buffer before start, connectable targets) and keeps counts.
 */

export const audioLog = {
  nodes: 0,
  sources: 0,
  errors: [] as string[],
  started: 0,
};

function check(cond: boolean, msg: string): void {
  if (!cond) {
    audioLog.errors.push(msg);
    throw new RangeError(msg);
  }
}

export class AudioParamX {
  value: number;
  readonly defaultValue: number;
  automationRate = "a-rate";
  constructor(v = 0, public minValue = -3.4e38, public maxValue = 3.4e38) {
    this.value = v;
    this.defaultValue = v;
  }
  setValueAtTime(v: number, t: number) {
    check(Number.isFinite(v) && Number.isFinite(t) && t >= 0, `setValueAtTime(${v}, ${t})`);
    return this;
  }
  linearRampToValueAtTime(v: number, t: number) {
    check(Number.isFinite(v) && Number.isFinite(t) && t >= 0, `linearRamp(${v}, ${t})`);
    return this;
  }
  exponentialRampToValueAtTime(v: number, t: number) {
    check(Number.isFinite(v) && v !== 0 && Number.isFinite(t) && t >= 0, `exponentialRamp(${v}, ${t})`);
    return this;
  }
  setTargetAtTime(v: number, t: number, c: number) {
    check(Number.isFinite(v) && Number.isFinite(t) && t >= 0 && Number.isFinite(c) && c >= 0, `setTarget(${v}, ${t}, ${c})`);
    return this;
  }
  setValueCurveAtTime(curve: ArrayLike<number>, t: number, d: number) {
    check(curve.length >= 2 && t >= 0 && d > 0, "setValueCurveAtTime");
    return this;
  }
  cancelScheduledValues(t: number) {
    check(Number.isFinite(t) && t >= 0, `cancelScheduledValues(${t})`);
    return this;
  }
  cancelAndHoldAtTime(t: number) {
    return this.cancelScheduledValues(t);
  }
}

export class AudioNodeX extends EventTarget {
  numberOfInputs = 1;
  numberOfOutputs = 1;
  channelCount = 2;
  outputs = new Set<unknown>();
  constructor(public context: AudioContextX) {
    super();
    audioLog.nodes++;
  }
  connect<T>(dest: T): T {
    check(dest instanceof AudioNodeX || dest instanceof AudioParamX, `connect() to a non-node: ${Object.prototype.toString.call(dest)}`);
    this.outputs.add(dest);
    return dest;
  }
  disconnect(): void {
    this.outputs.clear();
  }
}

class ScheduledX extends AudioNodeX {
  started = false;
  stopped = false;
  onended: (() => void) | null = null;
  start(when = 0, offset = 0, duration?: number): void {
    check(!this.started, "start() called twice");
    check(Number.isFinite(when) && when >= 0 && Number.isFinite(offset) && offset >= 0, `start(${when}, ${offset})`);
    if (duration !== undefined) check(Number.isFinite(duration) && duration >= 0, `start duration ${duration}`);
    this.started = true;
    audioLog.started++;
  }
  stop(when = 0): void {
    if (!this.started) {
      audioLog.errors.push("stop() before start()");
      throw new Error("InvalidStateError: stop() before start()");
    }
    check(Number.isFinite(when) && when >= 0, `stop(${when})`);
    this.stopped = true;
  }
}

export class OscillatorX extends ScheduledX {
  type: OscillatorType = "sine";
  frequency = new AudioParamX(440);
  detune = new AudioParamX(0);
  setPeriodicWave(): void {}
}
export class BufferSourceX extends ScheduledX {
  buffer: AudioBufferX | null = null;
  loop = false;
  loopStart = 0;
  loopEnd = 0;
  playbackRate = new AudioParamX(1);
  detune = new AudioParamX(0);
  override start(when = 0, offset = 0, duration?: number): void {
    check(this.buffer !== null, "AudioBufferSourceNode started without a buffer");
    super.start(when, offset, duration);
  }
}
export class GainX extends AudioNodeX {
  gain = new AudioParamX(1);
}
export class BiquadX extends AudioNodeX {
  type: BiquadFilterType = "lowpass";
  frequency = new AudioParamX(350);
  Q = new AudioParamX(1);
  gain = new AudioParamX(0);
  detune = new AudioParamX(0);
}
export class ConvolverX extends AudioNodeX {
  normalize = true;
  private buf: AudioBufferX | null = null;
  get buffer(): AudioBufferX | null {
    return this.buf;
  }
  set buffer(b: AudioBufferX | null) {
    check(b === null || b instanceof AudioBufferX, "convolver buffer must be an AudioBuffer");
    this.buf = b;
  }
}
export class WaveShaperX extends AudioNodeX {
  curve: Float32Array | null = null;
  oversample: OverSampleType = "none";
}
export class PannerX extends AudioNodeX {
  pan = new AudioParamX(0, -1, 1);
}
export class CompressorX extends AudioNodeX {
  threshold = new AudioParamX(-24);
  knee = new AudioParamX(30);
  ratio = new AudioParamX(12);
  attack = new AudioParamX(0.003);
  release = new AudioParamX(0.25);
  reduction = 0;
}
export class AudioBufferX {
  private channels: Float32Array[];
  constructor(public numberOfChannels: number, public length: number, public sampleRate: number) {
    check(numberOfChannels > 0 && length > 0 && sampleRate > 0, `createBuffer(${numberOfChannels}, ${length}, ${sampleRate})`);
    this.channels = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
  }
  get duration(): number {
    return this.length / this.sampleRate;
  }
  getChannelData(ch: number): Float32Array {
    check(ch >= 0 && ch < this.numberOfChannels, `getChannelData(${ch})`);
    return this.channels[ch]!;
  }
}

export class AudioContextX extends EventTarget {
  sampleRate = 48000;
  state: "suspended" | "running" | "closed" = "suspended";
  destination: AudioNodeX;
  private t0 = performance.now();
  constructor() {
    super();
    this.destination = new AudioNodeX(this);
  }
  get currentTime(): number {
    return this.state === "running" ? (performance.now() - this.t0) / 1000 : 0;
  }
  resume(): Promise<void> {
    this.state = "running";
    this.t0 = performance.now();
    return Promise.resolve();
  }
  suspend(): Promise<void> {
    this.state = "suspended";
    return Promise.resolve();
  }
  close(): Promise<void> {
    this.state = "closed";
    return Promise.resolve();
  }
  createGain() {
    return new GainX(this);
  }
  createOscillator() {
    audioLog.sources++;
    return new OscillatorX(this);
  }
  createBufferSource() {
    audioLog.sources++;
    return new BufferSourceX(this);
  }
  createBiquadFilter() {
    return new BiquadX(this);
  }
  createConvolver() {
    return new ConvolverX(this);
  }
  createWaveShaper() {
    return new WaveShaperX(this);
  }
  createStereoPanner() {
    return new PannerX(this);
  }
  createDynamicsCompressor() {
    return new CompressorX(this);
  }
  createBuffer(ch: number, len: number, rate: number) {
    return new AudioBufferX(ch, len, rate);
  }
}

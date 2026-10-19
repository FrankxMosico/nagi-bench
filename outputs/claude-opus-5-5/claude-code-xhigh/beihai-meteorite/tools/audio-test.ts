/**
 * Runs every sound factory through a strict mock AudioContext during a
 * simulated real-time playback of the whole film plus a series of seeks.
 * Catches the scheduling mistakes a browser would throw on. Dev tool only.
 */
const errors: string[] = [];
let clock = 0;
const counts = new Map<string, number>();

function check(cond: boolean, msg: string): void {
  if (!cond) throw new RangeError(msg);
}
const finite = (...v: number[]) => v.every((x) => Number.isFinite(x));

class MockParam {
  value: number;
  constructor(v: number) {
    this.value = v;
  }
  setValueAtTime(v: number, t: number) {
    check(finite(v, t) && t >= 0, `setValueAtTime(${v}, ${t})`);
    return this;
  }
  linearRampToValueAtTime(v: number, t: number) {
    check(finite(v, t) && t >= 0, `linearRamp(${v}, ${t})`);
    return this;
  }
  exponentialRampToValueAtTime(v: number, t: number) {
    check(finite(v, t) && t >= 0 && v !== 0, `expRamp(${v}, ${t})`);
    return this;
  }
  setTargetAtTime(v: number, t: number, c: number) {
    check(finite(v, t, c) && t >= 0 && c > 0, `setTarget(${v}, ${t}, ${c})`);
    return this;
  }
  cancelScheduledValues(t: number) {
    check(finite(t) && t >= 0, `cancel(${t})`);
    return this;
  }
}
class MockNode {
  connect(dest: unknown) {
    check(dest instanceof MockNode || dest instanceof MockParam, "connect to non-node");
    return dest;
  }
  disconnect() {}
}
class MockGain extends MockNode {
  gain = new MockParam(1);
}
class MockScheduled extends MockNode {
  started = false;
  stopped = false;
  start(t = 0, offset = 0) {
    check(!this.started, "start twice");
    check(finite(t, offset) && t >= 0 && offset >= 0, `start(${t}, ${offset})`);
    this.started = true;
  }
  stop(t = 0) {
    check(this.started, "stop before start");
    check(finite(t) && t >= 0, `stop(${t})`);
    this.stopped = true;
  }
}
class MockOsc extends MockScheduled {
  type = "sine";
  frequency = new MockParam(440);
  detune = new MockParam(0);
}
class MockBufferSource extends MockScheduled {
  buffer: MockBuffer | null = null;
  loop = false;
  playbackRate = new MockParam(1);
  override start(t = 0, offset = 0) {
    check(this.buffer !== null, "buffer missing");
    super.start(t, offset);
  }
}
class MockBiquad extends MockNode {
  type = "lowpass";
  frequency = new MockParam(350);
  Q = new MockParam(1);
  gain = new MockParam(0);
  detune = new MockParam(0);
}
class MockPanner extends MockNode {
  pan = new MockParam(0);
}
class MockConvolver extends MockNode {
  buffer: MockBuffer | null = null;
}
class MockShaper extends MockNode {
  curve: Float32Array | null = null;
}
class MockCompressor extends MockNode {
  threshold = new MockParam(0);
  knee = new MockParam(0);
  ratio = new MockParam(1);
  attack = new MockParam(0);
  release = new MockParam(0);
}
class MockBuffer {
  private data: Float32Array[];
  constructor(public numberOfChannels: number, public length: number, public sampleRate: number) {
    check(length > 0 && numberOfChannels > 0, "bad buffer");
    this.data = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
  }
  getChannelData(i: number) {
    return this.data[i]!;
  }
}
let buffers = 0;
let bufferSamples = 0;
class MockAudioContext {
  sampleRate = 48000;
  state = "running";
  destination = new MockNode();
  get currentTime() {
    return clock;
  }
  createGain() {
    return new MockGain();
  }
  createOscillator() {
    return new MockOsc();
  }
  createBufferSource() {
    return new MockBufferSource();
  }
  createBiquadFilter() {
    return new MockBiquad();
  }
  createStereoPanner() {
    return new MockPanner();
  }
  createConvolver() {
    return new MockConvolver();
  }
  createWaveShaper() {
    return new MockShaper();
  }
  createDynamicsCompressor() {
    return new MockCompressor();
  }
  createBuffer(ch: number, len: number, sr: number) {
    buffers++;
    bufferSamples += ch * len;
    return new MockBuffer(ch, len, sr);
  }
  async resume() {}
  async close() {}
}
const g = globalThis as unknown as Record<string, unknown>;
g.window = g;
g.AudioContext = MockAudioContext;
g.AudioParam = MockParam;
g.AudioNode = MockNode;
g.AudioBufferSourceNode = MockBufferSource;
g.requestAnimationFrame = () => 0;

const { CinematicPlayer, WebAudioCueBus } = await import("@agentbench/cinematic-player");
const { buildSoundCues } = await import("../src/audio/cues");
const { registerSounds } = await import("../src/audio/sounds");
const { DURATION } = await import("../src/story");

const cues = buildSoundCues();
let pending: FrameRequestCallback | null = null;
const player = new CinematicPlayer({
  duration: DURATION,
  context: {},
  cues,
  requestFrame: (cb) => {
    pending = cb;
    return 1;
  },
  cancelFrame: () => {
    pending = null;
  },
});
const bus = new WebAudioCueBus(player);
// Wrap define so each factory call is counted and exceptions are caught with context.
const origDefine = bus.define.bind(bus);
(bus as unknown as { define: typeof bus.define }).define = (name, factory) =>
  origDefine(name, (ctx) => {
    counts.set(name, (counts.get(name) ?? 0) + 1);
    try {
      return factory(ctx);
    } catch (e) {
      errors.push(`${name} @cue ${ctx.cue.id} offset ${ctx.offset.toFixed(2)}: ${(e as Error).message}`);
      return undefined;
    }
  });
registerSounds(bus as never);
await bus.unlock();

// Real-time playback from 0 to the end at 30 fps.
const t0 = performance.now();
clock = 0.2;
player.play();
let ms = 1000;
let frames = 0;
while (player.isPlaying && frames < 20000) {
  const cb = pending as FrameRequestCallback | null;
  pending = null;
  if (!cb) break;
  ms += 1000 / 30;
  clock += 1 / 30;
  cb(ms);
  frames++;
}
console.log("playback frames", frames, "ended at", player.currentTime.toFixed(2), "state", player.state);

// Seeks while playing into many places (sustained cues restart with offsets).
player.play();
for (const t of [5, 12.3, 40, 44.7, 60, 99, 128.5, 133.2, 140, 155, 160, 166, 172.2, 186, 200, 230.5, 256.7, 268, 273, 279, 290, 301, 305, 320, 330, 349]) {
  player.seek(t);
  for (let k = 0; k < 20; k++) {
    const cb = pending as FrameRequestCallback | null;
    pending = null;
    if (!cb) break;
    ms += 1000 / 30;
    clock += 1 / 30;
    cb(ms);
  }
}
// Pause/resume inside sustained cues.
player.pause();
player.seek(215);
player.play();
console.log("factories run:", [...counts.entries()].map(([k, v]) => `${k}:${v}`).join(" "));
console.log("noise/IR buffers created:", buffers, "samples:", (bufferSamples / 1e6).toFixed(1), "M");
console.log("errors:", errors.length);
for (const e of errors.slice(0, 30)) console.log("  ", e);
console.log("ms", Math.round(performance.now() - t0));
process.exit(errors.length ? 1 : 0);

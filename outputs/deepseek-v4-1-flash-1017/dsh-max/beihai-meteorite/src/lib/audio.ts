import type { SoundFactory, WebAudioCueBus } from "@agentbench/cinematic-player";
import { mulberry32 } from "./helpers";

type Rack = {
  nodes: AudioNode[];
  sources: AudioScheduledSourceNode[];
  stop: () => void;
};

function makeRack(): Rack {
  const nodes: AudioNode[] = [];
  const sources: AudioScheduledSourceNode[] = [];
  let stopped = false;
  return {
    nodes,
    sources,
    stop() {
      if (stopped) return;
      stopped = true;
      for (const source of sources) {
        try {
          source.stop();
        } catch {
          // Already stopped; nothing to do.
        }
        try {
          source.disconnect();
        } catch {
          // Already detached.
        }
      }
      for (const node of [...nodes].reverse()) {
        try {
          node.disconnect();
        } catch {
          // Already detached.
        }
      }
    },
  };
}

interface NoiseBuffers {
  white: AudioBuffer;
  pink: AudioBuffer;
  brown: AudioBuffer;
}

const noiseCache = new WeakMap<AudioContext, NoiseBuffers>();
const impulseCache = new WeakMap<AudioContext, Map<string, AudioBuffer>>();

function clipSample(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

function getNoise(ctx: AudioContext): NoiseBuffers {
  const cached = noiseCache.get(ctx);
  if (cached) return cached;
  const seconds = 5;
  const length = Math.ceil(ctx.sampleRate * seconds);
  const buffers: NoiseBuffers = {
    white: ctx.createBuffer(2, length, ctx.sampleRate),
    pink: ctx.createBuffer(2, length, ctx.sampleRate),
    brown: ctx.createBuffer(2, length, ctx.sampleRate),
  };
  for (let ch = 0; ch < 2; ch++) {
    const rng = mulberry32(163 + ch * 701);
    const white = buffers.white.getChannelData(ch);
    const pink = buffers.pink.getChannelData(ch);
    const brown = buffers.brown.getChannelData(ch);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;
    let last = 0;
    for (let i = 0; i < length; i++) {
      const w = rng() * 2 - 1;
      white[i] = w;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      pink[i] = clipSample((b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11);
      b6 = w * 0.115926;
      last = (last + 0.018 * w) / 1.018;
      brown[i] = last * 3.4;
    }
  }
  noiseCache.set(ctx, buffers);
  return buffers;
}

function getImpulse(ctx: AudioContext, kind: "concrete" | "room" | "space", seconds: number): AudioBuffer {
  let byKind = impulseCache.get(ctx);
  if (!byKind) {
    byKind = new Map();
    impulseCache.set(ctx, byKind);
  }
  const key = `${kind}-${seconds}`;
  const cached = byKind.get(key);
  if (cached) return cached;
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const rng = mulberry32(kind === "concrete" ? 812 : kind === "room" ? 111 : 717);
  const preDelay = kind === "space" ? 0.06 : 0.012;
  const decay = kind === "concrete" ? 2.7 : kind === "room" ? 2.0 : 0.8;
  const brightness = kind === "concrete" ? 0.24 : kind === "room" ? 0.5 : 0.07;
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let low = 0;
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      if (t < preDelay) {
        data[i] = 0;
        continue;
      }
      const u = t - preDelay;
      const n = rng() * 2 - 1;
      low += (n - low) * brightness;
      data[i] = low * Math.exp(-decay * u) * (ch ? 0.93 : 1);
    }
    // A handful of hard early reflections make concrete feel like concrete.
    if (kind === "concrete") {
      const hits = [0.021, 0.034, 0.048, 0.071, 0.093, 0.121, 0.146, 0.18, 0.214];
      hits.forEach((t, i) => {
        const index = Math.floor((preDelay + t) * ctx.sampleRate);
        if (index < length) data[index] += (i % 2 ? -1 : 1) * (0.6 / (i + 1));
      });
    }
  }
  byKind.set(key, buffer);
  return buffer;
}

function gainEnv(
  ctx: AudioContext,
  when: number,
  duration: number,
  peak: number,
  attack = 0.005,
  curve: "exp" | "linear" = "exp",
): GainNode {
  const gain = ctx.createGain();
  const a = Math.max(0.0005, Math.min(attack, duration * 0.5));
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(Math.max(0.0001, peak), when + a);
  if (curve === "exp") {
    gain.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(a + 0.02, duration));
  } else {
    gain.gain.linearRampToValueAtTime(0.0001, when + Math.max(a + 0.02, duration));
  }
  return gain;
}

function panner(ctx: AudioContext, pan = 0): StereoPannerNode {
  const node = ctx.createStereoPanner();
  node.pan.value = Math.max(-1, Math.min(1, pan));
  return node;
}

function noiseBurst(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  when: number,
  options: {
    duration: number;
    gain: number;
    lowpass?: number;
    highpass?: number;
    q?: number;
    pan?: number;
    type?: "white" | "pink" | "brown";
    attack?: number;
    playbackRate?: number;
  },
): void {
  const noise = getNoise(ctx);
  const source = ctx.createBufferSource();
  source.buffer = noise[options.type ?? "white"];
  let tail: AudioNode = source;
  if (options.lowpass) {
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = options.lowpass;
    lowpass.Q.value = options.q ?? 0.4;
    tail.connect(lowpass);
    tail = lowpass;
    rack.nodes.push(lowpass);
  }
  if (options.highpass) {
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = options.highpass;
    highpass.Q.value = options.q ?? 0.5;
    tail.connect(highpass);
    tail = highpass;
    rack.nodes.push(highpass);
  }
  const env = gainEnv(ctx, when, options.duration, options.gain, options.attack ?? 0.004);
  const panNode = panner(ctx, options.pan ?? 0);
  tail.connect(env).connect(panNode).connect(output);
  source.start(when, (Math.random() * 2.8) % source.buffer!.duration);
  source.stop(when + options.duration + 0.04);
  rack.nodes.push(source, env, panNode);
  rack.sources.push(source);
}

function oscTone(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  when: number,
  options: {
    frequency: number;
    endFrequency?: number;
    duration: number;
    gain: number;
    type?: OscillatorType;
    pan?: number;
    attack?: number;
    filterFreq?: number;
  },
): void {
  const osc = ctx.createOscillator();
  osc.type = options.type ?? "sine";
  osc.frequency.setValueAtTime(Math.max(20, options.frequency), when);
  if (options.endFrequency) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, options.endFrequency), when + options.duration);
  }
  const env = gainEnv(ctx, when, options.duration, options.gain, options.attack ?? 0.004);
  const panNode = panner(ctx, options.pan ?? 0);
  let tail: AudioNode = env;
  if (options.filterFreq) {
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = options.filterFreq;
    filter.Q.value = 0.4;
    env.connect(filter);
    tail = filter;
    rack.nodes.push(filter);
  }
  tail.connect(panNode).connect(output);
  osc.connect(env);
  osc.start(when);
  osc.stop(when + options.duration + 0.04);
  rack.nodes.push(osc, env, panNode);
  rack.sources.push(osc);
}

function metallicClick(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  when: number,
  gain = 0.12,
  pan = 0,
  frequency = 1800,
): void {
  noiseBurst(rack, ctx, output, when, {
    duration: 0.025,
    gain: gain * 0.5,
    highpass: 1200,
    pan,
    attack: 0.001,
  });
  oscTone(rack, ctx, output, when, {
    frequency,
    endFrequency: frequency * 0.63,
    duration: 0.07,
    gain: gain * 0.22,
    type: "triangle",
    pan,
    attack: 0.001,
  });
  oscTone(rack, ctx, output, when + 0.005, {
    frequency: frequency * 1.5,
    duration: 0.04,
    gain: gain * 0.1,
    type: "sine",
    pan,
    attack: 0.001,
  });
}

function makeBed(ctx: AudioContext, kind: "room" | "workshop" | "basement" | "base" | "space"): AudioBuffer {
  const seconds = kind === "space" ? 14 : 11;
  const length = Math.ceil(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const rng = mulberry32(kind === "room" ? 66 : kind === "workshop" ? 87 : kind === "basement" ? 99 : 33);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let brown = 0;
    let low = 0;
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      const n = rng() * 2 - 1;
      brown = (brown + 0.012 * n) / 1.012;
      if (kind === "room") {
        low += (n - low) * 0.018;
        data[i] =
          low * 0.18 +
          Math.sin(t * Math.PI * 2 * 50 + ch) * 0.002 +
          Math.sin(t * Math.PI * 2 * 100.2) * 0.001;
        // An old clock and the occasional settling timber.
        const tick = ((t + ch * 0.07) % 1.47);
        if (tick < 0.006) data[i] += Math.exp(-tick * 950) * 0.1;
        const creak = Math.max(0, Math.sin(t * 0.23 + ch) - 0.995) * 400;
        if (creak > 0) data[i] += Math.sin(t * 230) * Math.min(0.008, creak * 0.0001);
      } else if (kind === "workshop") {
        low += (n - low) * 0.35;
        data[i] =
          low * 0.05 +
          Math.sin(t * Math.PI * 2 * 60 + ch * 0.2) * 0.004 +
          Math.sin(t * Math.PI * 2 * 120) * 0.002;
        const vent = Math.max(0, Math.sin(t * 0.17 + ch * 0.3) - 0.5);
        data[i] += vent * n * 0.01;
        if ((t % 4.23) < 0.008) data[i] += Math.exp(-(t % 4.23) * 500) * 0.04;
      } else if (kind === "basement") {
        low += (n - low) * 0.06;
        data[i] = low * 0.13 + Math.sin(t * Math.PI * 2 * 63 + ch) * 0.003;
        const drip = (t + ch * 0.23) % 5.73;
        if (drip < 0.02) {
          data[i] += Math.sin(drip * 950) * Math.exp(-drip * 110) * 0.12;
        }
      } else if (kind === "base") {
        low += (n - low) * 0.09;
        data[i] = low * 0.095 + Math.sin(t * Math.PI * 2 * 54 + ch * 0.7) * 0.0025;
        data[i] += Math.sin(t * 2.1) * 0.0008;
      } else {
        data[i] = brown * 0.3 + (ch ? Math.sin(t * 1.7) : Math.sin(t * 1.3)) * 0.0015;
      }
    }
    // Soft edge fades avoid a loop-boundary click.
    const fade = Math.min(256, Math.floor(length / 4));
    for (let i = 0; i < fade; i++) {
      const f = i / fade;
      data[i] *= f;
      data[length - 1 - i] *= f;
    }
  }
  return buffer;
}

const bedCache = new WeakMap<AudioContext, Map<string, AudioBuffer>>();
function getBed(ctx: AudioContext, kind: "room" | "workshop" | "basement" | "base" | "space"): AudioBuffer {
  let cache = bedCache.get(ctx);
  if (!cache) {
    cache = new Map();
    bedCache.set(ctx, cache);
  }
  const hit = cache.get(kind);
  if (hit) return hit;
  const bed = makeBed(ctx, kind);
  cache.set(kind, bed);
  return bed;
}

function loopBed(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  bed: AudioBuffer,
  offset: number,
  gain: number,
  filterFreq?: number,
  highpass?: number,
): AudioBufferSourceNode {
  const source = ctx.createBufferSource();
  source.buffer = bed;
  source.loop = true;
  let tail: AudioNode = source;
  let filter: BiquadFilterNode | undefined;
  if (filterFreq) {
    filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.4;
    tail.connect(filter);
    tail = filter;
    rack.nodes.push(filter);
  }
  if (highpass) {
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = highpass;
    tail.connect(hp);
    tail = hp;
    rack.nodes.push(hp);
  }
  const gainNode = ctx.createGain();
  gainNode.gain.value = gain;
  tail.connect(gainNode).connect(output);
  source.start(ctx.currentTime + 0.015, offset % bed.duration);
  rack.nodes.push(source, gainNode);
  rack.sources.push(source);
  return source;
}

function addConvolver(
  rack: Rack,
  ctx: AudioContext,
  source: AudioNode,
  output: AudioNode,
  kind: "concrete" | "room" | "space",
  seconds: number,
  mix: number,
  lowpass = 3800,
): void {
  const convolver = ctx.createConvolver();
  convolver.buffer = getImpulse(ctx, kind, seconds);
  const wet = ctx.createGain();
  wet.gain.value = mix;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = lowpass;
  source.connect(filter).connect(convolver).connect(wet).connect(output);
  rack.nodes.push(convolver, wet, filter);
}

function hutongBed(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
): void {
  const noise = getNoise(ctx);
  const wind = ctx.createBufferSource();
  wind.buffer = noise.pink;
  wind.loop = true;
  const windFilter = ctx.createBiquadFilter();
  windFilter.type = "lowpass";
  windFilter.frequency.value = 540;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.11;
  const windLfo = ctx.createOscillator();
  windLfo.frequency.value = 0.075;
  const windLfoGain = ctx.createGain();
  windLfoGain.gain.value = 0.045;
  windLfo.connect(windLfoGain).connect(windGain.gain);
  wind.connect(windFilter).connect(windGain).connect(output);
  wind.start(ctx.currentTime + 0.01, offset % noise.pink.duration);
  windLfo.start();
  rack.nodes.push(wind, windFilter, windGain, windLfo, windLfoGain);
  rack.sources.push(wind, windLfo);

  const leaves = ctx.createBufferSource();
  leaves.buffer = noise.white;
  leaves.loop = true;
  const leafFilter = ctx.createBiquadFilter();
  leafFilter.type = "bandpass";
  leafFilter.frequency.value = 1900;
  leafFilter.Q.value = 0.8;
  const leafGain = ctx.createGain();
  leafGain.gain.value = 0.012;
  const leafLfo = ctx.createOscillator();
  leafLfo.frequency.value = 0.21;
  const leafLfoGain = ctx.createGain();
  leafLfoGain.gain.value = 0.008;
  leafLfo.connect(leafLfoGain).connect(leafGain.gain);
  leaves.connect(leafFilter).connect(leafGain).connect(output);
  leaves.start(ctx.currentTime + 0.02, offset % noise.white.duration);
  leafLfo.start();
  rack.nodes.push(leaves, leafFilter, leafGain, leafLfo, leafLfoGain);
  rack.sources.push(leaves, leafLfo);

  const city = ctx.createOscillator();
  city.type = "sine";
  city.frequency.value = 43;
  const cityGain = ctx.createGain();
  cityGain.gain.value = 0.014;
  city.connect(cityGain).connect(output);
  city.start();
  rack.nodes.push(city, cityGain);
  rack.sources.push(city);

  const chirps = [2.8, 5.9, 9.1, 13.2, 17.8, 22.6, 26.3];
  const now = ctx.currentTime;
  for (let i = 0; i < chirps.length; i++) {
    const at = chirps[i]!;
    if (at < offset) continue;
    const when = now + (at - offset);
    const p = i % 2 ? 0.32 : -0.38;
    oscTone(rack, ctx, output, when, {
      frequency: 2350 + (i % 3) * 140,
      endFrequency: 1720 - (i % 4) * 90,
      duration: 0.13,
      gain: 0.022,
      type: "sine",
      pan: p,
    });
    oscTone(rack, ctx, output, when + 0.15, {
      frequency: 2850 - (i % 2) * 150,
      endFrequency: 1950,
      duration: 0.1,
      gain: 0.014,
      type: "sine",
      pan: p,
    });
  }
}

function shotReverbTail(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
): void {
  const source = ctx.createGain();
  source.gain.value = 0;
  addConvolver(rack, ctx, source, output, "concrete", 2.9, 0.5, 3200);
}

function spaceBed(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
): void {
  const noise = getNoise(ctx);
  const hiss = ctx.createBufferSource();
  hiss.buffer = noise.brown;
  hiss.loop = true;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1200;
  const gain = ctx.createGain();
  gain.gain.value = 0.018;
  hiss.connect(hp).connect(gain).connect(output);
  hiss.start(ctx.currentTime + 0.02, offset % noise.brown.duration);
  rack.nodes.push(hiss, hp, gain);
  rack.sources.push(hiss);

  const o1 = ctx.createOscillator();
  o1.frequency.value = 31.5;
  const g1 = ctx.createGain();
  g1.gain.value = 0.024;
  const o2 = ctx.createOscillator();
  o2.frequency.value = 47.2;
  const g2 = ctx.createGain();
  g2.gain.value = 0.009;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.031;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.006;
  lfo.connect(lfoGain).connect(g2.gain);
  o1.connect(g1).connect(output);
  o2.connect(g2).connect(output);
  o1.start();
  o2.start();
  lfo.start();
  rack.nodes.push(o1, g1, o2, g2, lfo, lfoGain);
  rack.sources.push(o1, o2, lfo);
}

function suitBreath(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
): void {
  const seconds = 7.6;
  const length = Math.ceil(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const rng = mulberry32(5005);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let low = 0;
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      const cycle = t % 3.8;
      const inhale = Math.exp(-Math.pow((cycle - 0.9) / 0.48, 2));
      const exhale = Math.exp(-Math.pow((cycle - 2.55) / 0.62, 2));
      const n = rng() * 2 - 1;
      low += (n - low) * (inhale > 0.02 ? 0.16 : 0.05);
      const fan = Math.sin(t * Math.PI * 2 * 71 + ch) * 0.0025;
      data[i] = low * (inhale * 0.2 + exhale * 0.15) + fan;
    }
    const fade = Math.min(256, Math.floor(length / 5));
    for (let i = 0; i < fade; i++) {
      data[i] *= i / fade;
      data[length - 1 - i] *= i / fade;
    }
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1150;
  const gain = ctx.createGain();
  gain.gain.value = 0.16;
  source.connect(filter).connect(gain).connect(output);
  source.start(ctx.currentTime + 0.02, offset % buffer.duration);
  rack.nodes.push(source, filter, gain);
  rack.sources.push(source);
}

function scheduleFiring(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
): void {
  // 10 + reload + 10 + reload + 10. Timing is authored to match the cut.
  const shots: number[] = [];
  for (let i = 0; i < 10; i++) shots.push(i * 0.145);
  for (let i = 0; i < 10; i++) shots.push(2.32 + i * 0.145);
  for (let i = 0; i < 10; i++) shots.push(4.64 + i * 0.145);
  const reloads = [1.82, 4.14];
  const now = ctx.currentTime + 0.01;
  for (let i = 0; i < shots.length; i++) {
    const at = shots[i]!;
    if (at < offset) continue;
    const when = now + (at - offset);
    const pan = 0.04 + Math.sin(i * 1.7) * 0.08;
    // In vacuum the report is gone: only the action travelling through the suit remains.
    oscTone(rack, ctx, output, when, {
      frequency: 54 + (i % 4) * 2,
      endFrequency: 34,
      duration: 0.15,
      gain: 0.13,
      type: "sine",
      pan,
      attack: 0.002,
    });
    noiseBurst(rack, ctx, output, when, {
      duration: 0.06,
      gain: 0.045,
      lowpass: 240,
      q: 0.8,
      pan,
      type: "brown",
      attack: 0.001,
    });
    metallicClick(rack, ctx, output, when + 0.004, 0.02, pan, 1250 + (i % 3) * 90);
  }
  for (const at of reloads) {
    if (at < offset) continue;
    const when = now + (at - offset);
    noiseBurst(rack, ctx, output, when, {
      duration: 0.05,
      gain: 0.055,
      lowpass: 900,
      highpass: 350,
      pan: 0.1,
      attack: 0.001,
    });
    metallicClick(rack, ctx, output, when + 0.06, 0.05, -0.12, 820);
    metallicClick(rack, ctx, output, when + 0.17, 0.045, 0.08, 1020);
  }
}

function scoreEarth(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
  duration: number,
): void {
  const start = ctx.currentTime + 0.02;
  const remain = Math.max(0.2, duration - offset);
  const musicBus = ctx.createGain();
  musicBus.gain.value = 0.14;
  musicBus.connect(output);
  rack.nodes.push(musicBus);

  const freqs = [55, 82.41, 110, 164.81, 220];
  for (let i = 0; i < freqs.length; i++) {
    const osc = ctx.createOscillator();
    osc.type = i < 2 ? "sine" : "triangle";
    osc.frequency.value = freqs[i]!;
    osc.detune.value = (i % 2 ? 1 : -1) * (3 + i);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(0.02 / (i * 0.45 + 1), start + 3.2 + i * 0.5);
    env.gain.setValueAtTime(0.02 / (i * 0.45 + 1), start + Math.max(3.3, remain - 3));
    env.gain.exponentialRampToValueAtTime(0.0001, start + remain);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500 + i * 210;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.035 + i * 0.007;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.007;
    lfo.connect(lfoGain).connect(env.gain);
    osc.connect(filter).connect(env).connect(musicBus);
    osc.start(start);
    osc.stop(start + remain + 0.2);
    lfo.start(start);
    lfo.stop(start + remain + 0.2);
    rack.nodes.push(osc, filter, env, lfo, lfoGain);
    rack.sources.push(osc, lfo);
  }

  // Sparse, breathing piano-like notes.
  const melody = [220, 261.63, 196, 164.81, 220, 293.66, 246.94];
  const step = 6.8;
  for (let i = 0; i < 16; i++) {
    const at = 1.5 + i * step;
    if (at < offset) continue;
    if (at > remain) break;
    const when = start + (at - offset);
    const f = melody[i % melody.length]!;
    oscTone(rack, ctx, musicBus, when, {
      frequency: f,
      duration: 3.5,
      gain: 0.012,
      type: "sine",
      pan: i % 2 ? 0.3 : -0.28,
      attack: 0.18,
    });
    oscTone(rack, ctx, musicBus, when, {
      frequency: f * 2,
      duration: 2.0,
      gain: 0.004,
      type: "triangle",
      pan: i % 2 ? 0.34 : -0.34,
      attack: 0.12,
      filterFreq: 900,
    });
  }
}

function scoreCold(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
  duration: number,
  bright: boolean,
): void {
  const start = ctx.currentTime + 0.02;
  const remain = Math.max(0.2, duration - offset);
  const bus = ctx.createGain();
  bus.gain.value = bright ? 0.104 : 0.12;
  bus.connect(output);
  rack.nodes.push(bus);
  const freqs = bright ? [43.65, 65.41, 98, 130.81, 196] : [36.7, 55, 73.4, 110, 146.83];
  for (let i = 0; i < freqs.length; i++) {
    const osc = ctx.createOscillator();
    osc.type = i < 2 ? "sine" : "sawtooth";
    osc.frequency.value = freqs[i]!;
    osc.detune.value = (i - 2) * 4;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = bright ? 950 : 340;
    filter.Q.value = 0.7;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(0.012 / (i * 0.4 + 1), start + 2.5);
    env.gain.setValueAtTime(0.012 / (i * 0.4 + 1), start + Math.max(2.6, remain - 2.4));
    env.gain.exponentialRampToValueAtTime(0.0001, start + remain);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.028 + i * 0.005;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.004;
    lfo.connect(lfoGain).connect(env.gain);
    osc.connect(filter).connect(env).connect(bus);
    osc.start(start);
    osc.stop(start + remain + 0.2);
    lfo.start(start);
    lfo.stop(start + remain + 0.2);
    rack.nodes.push(osc, filter, env, lfo, lfoGain);
    rack.sources.push(osc, lfo);
  }

  if (bright) {
    for (let i = 0; i < 9; i++) {
      const at = 2.1 + i * 7.2;
      if (at < offset || at > remain) continue;
      const when = start + (at - offset);
      oscTone(rack, ctx, bus, when, {
        frequency: 261.63 * (i % 3 === 0 ? 2 : 1.5),
        duration: 2.8,
        gain: 0.004,
        type: "sine",
        pan: i % 2 ? 0.45 : -0.5,
        attack: 0.3,
      });
    }
  }
}

function scoreTension(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
  duration: number,
): void {
  const start = ctx.currentTime + 0.02;
  const remain = Math.max(0.2, duration - offset);
  const bus = ctx.createGain();
  bus.gain.value = 0.105;
  bus.connect(output);
  rack.nodes.push(bus);
  for (let i = 0; i < 12; i++) {
    const at = i * 2.38;
    if (at < offset || at > remain) continue;
    const when = start + (at - offset);
    oscTone(rack, ctx, bus, when, {
      frequency: 46,
      endFrequency: 39,
      duration: 1.4,
      gain: 0.026,
      type: "sine",
      attack: 0.02,
      pan: -0.12,
    });
    oscTone(rack, ctx, bus, when + 0.12, {
      frequency: 92,
      duration: 1.2,
      gain: 0.006,
      type: "triangle",
      attack: 0.01,
      pan: 0.2,
      filterFreq: 300,
    });
  }
  const high = ctx.createOscillator();
  high.type = "triangle";
  high.frequency.value = 1244.5;
  const highGain = ctx.createGain();
  highGain.gain.setValueAtTime(0.0001, start);
  highGain.gain.linearRampToValueAtTime(0.003, start + 4);
  highGain.gain.setValueAtTime(0.003, start + Math.max(4.1, remain - 2));
  highGain.gain.exponentialRampToValueAtTime(0.0001, start + remain);
  high.connect(highGain).connect(bus);
  high.start(start);
  high.stop(start + remain + 0.1);
  rack.nodes.push(high, highGain);
  rack.sources.push(high);
}

function scoreFlight(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
  duration: number,
): void {
  const start = ctx.currentTime + 0.02;
  const remain = Math.max(0.2, duration - offset);
  const bus = ctx.createGain();
  bus.gain.value = 0.11;
  bus.connect(output);
  rack.nodes.push(bus);
  const freqs = [69.3, 92.5, 138.59, 207.65];
  for (let i = 0; i < freqs.length; i++) {
    const osc = ctx.createOscillator();
    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = freqs[i]!;
    osc.detune.value = i * 3 - 4;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 650;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(0.008 + i * 0.003, start + remain * 0.55);
    env.gain.setValueAtTime(0.009 + i * 0.003, start + Math.max(remain * 0.56, remain - 5));
    env.gain.exponentialRampToValueAtTime(0.0001, start + remain);
    osc.connect(filter).connect(env).connect(bus);
    osc.start(start);
    osc.stop(start + remain + 0.1);
    rack.nodes.push(osc, filter, env);
    rack.sources.push(osc);
  }
  for (let i = 0; i < 8; i++) {
    const at = 0.7 + i * 1.3;
    if (at < offset || at > remain) continue;
    const when = start + (at - offset);
    oscTone(rack, ctx, bus, when, {
      frequency: 830 + (i % 3) * 90,
      duration: 2.3,
      gain: 0.0035,
      type: "sine",
      attack: 0.4,
      pan: i % 2 ? 0.5 : -0.5,
    });
  }
}

function scoreCoda(
  rack: Rack,
  ctx: AudioContext,
  output: AudioNode,
  offset: number,
  duration: number,
): void {
  const start = ctx.currentTime + 0.02;
  const remain = Math.max(0.2, duration - offset);
  const bus = ctx.createGain();
  bus.gain.value = 0.12;
  bus.connect(output);
  rack.nodes.push(bus);
  const chord = [55, 82.4, 110, 164.81, 220];
  for (let i = 0; i < chord.length; i++) {
    const osc = ctx.createOscillator();
    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = chord[i]!;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1000;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, start);
    env.gain.linearRampToValueAtTime(0.013 / (i * 0.5 + 1), start + 2.3);
    env.gain.setValueAtTime(0.013 / (i * 0.5 + 1), start + Math.max(2.5, remain - 3.6));
    env.gain.exponentialRampToValueAtTime(0.0001, start + remain);
    osc.connect(filter).connect(env).connect(bus);
    osc.start(start);
    osc.stop(start + remain + 0.2);
    rack.nodes.push(osc, filter, env);
    rack.sources.push(osc);
  }
  const notes = [440, 392, 329.63, 293.66];
  notes.forEach((f, i) => {
    const at = 2.2 + i * 2.2;
    if (at < offset || at > remain) return;
    oscTone(rack, ctx, bus, start + (at - offset), {
      frequency: f,
      duration: 3.2,
      gain: 0.008,
      type: "sine",
      attack: 0.18,
      pan: i % 2 ? 0.3 : -0.3,
    });
  });
}

export function installAudio<Context = unknown>(audio: WebAudioCueBus<Context>): void {
  const define = (name: string, factory: SoundFactory): void => {
    audio.define(name, factory);
  };

  define("amb-hutong", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    hutongBed(rack, ctx, output, offset);
    return { stop: rack.stop };
  });

  define("amb-room", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    const bed = getBed(ctx, "room");
    loopBed(rack, ctx, output, bed, offset, 0.42, 1700, 40);
    const air = getNoise(ctx).pink;
    const src = ctx.createBufferSource();
    src.buffer = air;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2600;
    filter.Q.value = 0.45;
    const gain = ctx.createGain();
    gain.gain.value = 0.005;
    src.connect(filter).connect(gain).connect(output);
    src.start(ctx.currentTime + 0.05, offset % air.duration);
    rack.nodes.push(src, filter, gain);
    rack.sources.push(src);
    return { stop: rack.stop };
  });

  define("amb-workshop", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    loopBed(rack, ctx, output, getBed(ctx, "workshop"), offset, 0.4, 1300, 35);
    const now = ctx.currentTime + 0.02;
    const events = [3.3, 11.7, 19.8, 29.1];
    events.forEach((at, i) => {
      if (at < offset) return;
      metallicClick(rack, ctx, output, now + (at - offset), 0.022, i % 2 ? -0.4 : 0.5, 420 + i * 70);
    });
    return { stop: rack.stop };
  });

  define("amb-basement", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    loopBed(rack, ctx, output, getBed(ctx, "basement"), offset, 0.52, 950, 32);
    const noise = getNoise(ctx);
    const rumble = ctx.createBufferSource();
    rumble.buffer = noise.brown;
    rumble.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 120;
    const gain = ctx.createGain();
    gain.gain.value = 0.028;
    rumble.connect(filter).connect(gain).connect(output);
    rumble.start(ctx.currentTime + 0.03, offset % noise.brown.duration);
    rack.nodes.push(rumble, filter, gain);
    rack.sources.push(rumble);
    return { stop: rack.stop };
  });

  define("amb-base", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    loopBed(rack, ctx, output, getBed(ctx, "base"), offset, 0.34, 900, 34);
    return { stop: rack.stop };
  });

  define("score-earth", ({ audioContext: ctx, output, offset, cue }) => {
    const rack = makeRack();
    const duration = Math.max(0, cue.end - cue.start);
    scoreEarth(rack, ctx, output, offset, duration);
    return { stop: rack.stop };
  });

  define("score-work", ({ audioContext: ctx, output, offset, cue }) => {
    const rack = makeRack();
    scoreCold(rack, ctx, output, offset, Math.max(0, cue.end - cue.start), false);
    return { stop: rack.stop };
  });

  define("score-space", ({ audioContext: ctx, output, offset, cue }) => {
    const rack = makeRack();
    scoreCold(rack, ctx, output, offset, Math.max(0, cue.end - cue.start), true);
    return { stop: rack.stop };
  });

  define("score-tension", ({ audioContext: ctx, output, offset, cue }) => {
    const rack = makeRack();
    scoreTension(rack, ctx, output, offset, Math.max(0, cue.end - cue.start));
    return { stop: rack.stop };
  });

  define("score-flight", ({ audioContext: ctx, output, offset, cue }) => {
    const rack = makeRack();
    scoreFlight(rack, ctx, output, offset, Math.max(0, cue.end - cue.start));
    return { stop: rack.stop };
  });

  define("score-coda", ({ audioContext: ctx, output, offset, cue }) => {
    const rack = makeRack();
    scoreCoda(rack, ctx, output, offset, Math.max(0, cue.end - cue.start));
    return { stop: rack.stop };
  });

  define("suit-space", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    spaceBed(rack, ctx, output, offset);
    suitBreath(rack, ctx, output, offset);
    return { stop: rack.stop };
  });

  define("suit-only", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    suitBreath(rack, ctx, output, offset);
    return { stop: rack.stop };
  });

  define("lathe", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    const now = ctx.currentTime + 0.02;
    const motor = ctx.createOscillator();
    motor.type = "sawtooth";
    motor.frequency.value = 58;
    const motor2 = ctx.createOscillator();
    motor2.type = "triangle";
    motor2.frequency.value = 116;
    const motorFilter = ctx.createBiquadFilter();
    motorFilter.type = "lowpass";
    motorFilter.frequency.value = 340;
    const motorGain = ctx.createGain();
    motorGain.gain.value = 0.032;
    const motorLfo = ctx.createOscillator();
    motorLfo.frequency.value = 7.2;
    const motorLfoGain = ctx.createGain();
    motorLfoGain.gain.value = 0.012;
    motorLfo.connect(motorLfoGain).connect(motorGain.gain);
    motor.connect(motorFilter);
    motor2.connect(motorFilter);
    motorFilter.connect(motorGain).connect(output);
    motor.start();
    motor2.start();
    motorLfo.start();
    rack.nodes.push(motor, motor2, motorFilter, motorGain, motorLfo, motorLfoGain);
    rack.sources.push(motor, motor2, motorLfo);

    const noise = getNoise(ctx);
    const cut = ctx.createBufferSource();
    cut.buffer = noise.white;
    cut.loop = true;
    const cutFilter = ctx.createBiquadFilter();
    cutFilter.type = "bandpass";
    cutFilter.frequency.value = 2250;
    cutFilter.Q.value = 2.2;
    const cutFilter2 = ctx.createBiquadFilter();
    cutFilter2.type = "highpass";
    cutFilter2.frequency.value = 700;
    const cutGain = ctx.createGain();
    cutGain.gain.value = 0.02;
    cut.connect(cutFilter).connect(cutFilter2).connect(cutGain).connect(output);
    cut.start(now, offset % noise.white.duration);
    rack.nodes.push(cut, cutFilter, cutFilter2, cutGain);
    rack.sources.push(cut);

    // Irregular tool chirps keep the loop from feeling like a static sample.
    for (let i = 0; i < 18; i++) {
      const at = 0.4 + i * 0.73;
      if (at < offset) continue;
      oscTone(rack, ctx, output, now + (at - offset), {
        frequency: 1450 + (i % 5) * 210,
        endFrequency: 980,
        duration: 0.08,
        gain: 0.012,
        type: "triangle",
        pan: i % 2 ? 0.3 : -0.2,
        attack: 0.001,
      });
    }
    return { stop: rack.stop };
  });

  define("lathe-stop", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    oscTone(rack, ctx, output, now, {
      frequency: 92,
      endFrequency: 32,
      duration: 1.3,
      gain: 0.07,
      type: "sawtooth",
      filterFreq: 360,
      attack: 0.01,
    });
    noiseBurst(rack, ctx, output, now, {
      duration: 0.35,
      gain: 0.06,
      lowpass: 900,
      highpass: 120,
    });
    return { stop: rack.stop };
  });

  define("metal-click", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    metallicClick(rack, ctx, output, ctx.currentTime, 0.18, -0.1, 2200);
    return { stop: rack.stop };
  });

  define("metal-clack", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    metallicClick(rack, ctx, output, now, 0.22, 0.1, 1350);
    noiseBurst(rack, ctx, output, now + 0.01, {
      duration: 0.06,
      gain: 0.08,
      highpass: 1800,
      pan: 0.08,
      attack: 0.001,
    });
    return { stop: rack.stop };
  });

  define("tool-tray", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      metallicClick(rack, ctx, output, now + i * 0.085, 0.08 - i * 0.015, -0.2 + i * 0.2, 1600 + i * 410);
    }
    return { stop: rack.stop };
  });

  define("cloth-rustle", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 0.42,
      gain: 0.06,
      highpass: 500,
      lowpass: 3600,
      pan: 0.05,
      attack: 0.04,
    });
    noiseBurst(rack, ctx, output, now + 0.19, {
      duration: 0.3,
      gain: 0.035,
      highpass: 800,
      lowpass: 2500,
      pan: -0.1,
      attack: 0.03,
    });
    return { stop: rack.stop };
  });

  define("door-wood", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    oscTone(rack, ctx, output, now, {
      frequency: 130,
      endFrequency: 61,
      duration: 1.1,
      gain: 0.09,
      type: "sawtooth",
      filterFreq: 600,
      attack: 0.02,
    });
    noiseBurst(rack, ctx, output, now, {
      duration: 0.9,
      gain: 0.035,
      lowpass: 900,
      highpass: 110,
      attack: 0.08,
    });
    metallicClick(rack, ctx, output, now + 0.28, 0.045, 0.1, 740);
    return { stop: rack.stop };
  });

  define("door-metal", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 1.15,
      gain: 0.1,
      lowpass: 1500,
      highpass: 180,
      attack: 0.01,
    });
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(38, now);
    osc.frequency.linearRampToValueAtTime(48, now + 1.1);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 210;
    const env = gainEnv(ctx, now, 1.2, 0.065, 0.02);
    osc.connect(filter).connect(env).connect(output);
    osc.start(now);
    osc.stop(now + 1.25);
    rack.nodes.push(osc, filter, env);
    rack.sources.push(osc);
    metallicClick(rack, ctx, output, now + 0.8, 0.07, 0, 900);
    return { stop: rack.stop };
  });

  define("keypad", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    [0, 0.13, 0.26].forEach((d, i) => {
      oscTone(rack, ctx, output, now + d, {
        frequency: 610 + i * 70,
        duration: 0.08,
        gain: 0.035,
        type: "square",
        pan: i % 2 ? 0.16 : -0.16,
        attack: 0.002,
        filterFreq: 1400,
      });
    });
    oscTone(rack, ctx, output, now + 0.46, {
      frequency: 880,
      duration: 0.18,
      gain: 0.04,
      type: "sine",
      attack: 0.004,
    });
    return { stop: rack.stop };
  });

  define("stairs", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const at = now + 0.3 + i * 0.52;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 440;
      const env = gainEnv(ctx, at, 0.18, 0.045, 0.003);
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(95 + i * 8, at);
      osc.frequency.exponentialRampToValueAtTime(52, at + 0.16);
      osc.connect(filter).connect(env).connect(output);
      osc.start(at);
      osc.stop(at + 0.2);
      rack.nodes.push(osc, filter, env);
      rack.sources.push(osc);
      noiseBurst(rack, ctx, output, at + 0.01, {
        duration: 0.08,
        gain: 0.018,
        lowpass: 900,
        highpass: 200,
        pan: -0.08,
      });
    }
    return { stop: rack.stop };
  });

  define("gunshot-concrete", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime + 0.005;
    const dry = ctx.createGain();
    dry.gain.value = 0.9;
    dry.connect(output);
    rack.nodes.push(dry);
    // Waveform crack.
    noiseBurst(rack, ctx, dry, now, {
      duration: 0.065,
      gain: 0.52,
      highpass: 900,
      pan: 0.04,
      attack: 0.001,
    });
    noiseBurst(rack, ctx, dry, now, {
      duration: 0.26,
      gain: 0.22,
      lowpass: 1500,
      highpass: 180,
      pan: 0.04,
      attack: 0.002,
    });
    oscTone(rack, ctx, dry, now, {
      frequency: 92,
      endFrequency: 38,
      duration: 0.62,
      gain: 0.26,
      type: "sine",
      attack: 0.001,
      pan: 0,
    });
    oscTone(rack, ctx, dry, now + 0.004, {
      frequency: 1880,
      endFrequency: 400,
      duration: 0.12,
      gain: 0.08,
      type: "square",
      filterFreq: 2400,
      attack: 0.001,
    });
    // Small-room concrete slap and long low reflections.
    addConvolver(rack, ctx, dry, output, "concrete", 2.9, 0.56, 3000);
    const flutter = ctx.createDelay(0.4);
    flutter.delayTime.value = 0.071;
    const flutterGain = ctx.createGain();
    flutterGain.gain.value = 0.16;
    const flutterFilter = ctx.createBiquadFilter();
    flutterFilter.type = "lowpass";
    flutterFilter.frequency.value = 1500;
    dry.connect(flutterFilter).connect(flutter).connect(flutterGain).connect(output);
    rack.nodes.push(flutter, flutterGain, flutterFilter);
    // Ears ringing.
    oscTone(rack, ctx, output, now + 0.12, {
      frequency: 4720,
      duration: 2.8,
      gain: 0.011,
      type: "sine",
      attack: 0.2,
      pan: -0.2,
    });
    return { stop: rack.stop };
  });

  define("vacuum-shots", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    scheduleFiring(rack, ctx, output, offset);
    return { stop: rack.stop };
  });

  define("reload", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    metallicClick(rack, ctx, output, now, 0.16, 0.08, 910);
    noiseBurst(rack, ctx, output, now + 0.05, {
      duration: 0.09,
      gain: 0.05,
      highpass: 500,
      lowpass: 2100,
      pan: 0.1,
    });
    metallicClick(rack, ctx, output, now + 0.18, 0.09, 0.03, 1550);
    return { stop: rack.stop };
  });

  define("gun-cock", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    metallicClick(rack, ctx, output, now, 0.14, 0.06, 760);
    metallicClick(rack, ctx, output, now + 0.12, 0.17, 0.04, 1260);
    noiseBurst(rack, ctx, output, now + 0.1, {
      duration: 0.06,
      gain: 0.04,
      highpass: 800,
      lowpass: 3000,
      pan: 0.02,
    });
    return { stop: rack.stop };
  });

  define("impact-meat", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 0.16,
      gain: 0.1,
      lowpass: 320,
      type: "brown",
      attack: 0.002,
    });
    oscTone(rack, ctx, output, now, {
      frequency: 110,
      endFrequency: 52,
      duration: 0.2,
      gain: 0.06,
      type: "sine",
      attack: 0.002,
    });
    return { stop: rack.stop };
  });

  define("shard-tinkle", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      oscTone(rack, ctx, output, now + i * 0.055, {
        frequency: 2200 + i * 370,
        endFrequency: 1700 + i * 140,
        duration: 0.22,
        gain: 0.028,
        type: "sine",
        pan: -0.2 + i * 0.08,
        attack: 0.002,
      });
    }
    return { stop: rack.stop };
  });

  define("adhesive", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 0.38,
      gain: 0.025,
      highpass: 1800,
      lowpass: 4200,
      attack: 0.08,
    });
    oscTone(rack, ctx, output, now + 0.05, {
      frequency: 84,
      duration: 0.3,
      gain: 0.03,
      type: "sine",
      attack: 0.04,
    });
    return { stop: rack.stop };
  });

  define("radio-static", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1400;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 3200;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain.gain.setValueAtTime(0.05, now + 0.28);
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.42);
    const src = ctx.createBufferSource();
    src.buffer = getNoise(ctx).white;
    src.connect(hp).connect(lp).connect(gain).connect(output);
    src.start(now, 0.4);
    src.stop(now + 0.44);
    rack.nodes.push(src, hp, lp, gain);
    rack.sources.push(src);
    oscTone(rack, ctx, output, now + 0.02, {
      frequency: 1250,
      duration: 0.08,
      gain: 0.014,
      type: "sine",
      attack: 0.004,
    });
    return { stop: rack.stop };
  });

  define("radio-scream", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1100;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.075, now + 0.02);
    gain.gain.setValueAtTime(0.075, now + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    const src = ctx.createBufferSource();
    src.buffer = getNoise(ctx).white;
    src.loop = true;
    src.connect(hp).connect(lp).connect(gain).connect(output);
    src.start(now, 0.24);
    src.stop(now + 0.95);
    rack.nodes.push(src, hp, lp, gain);
    rack.sources.push(src);
    // Garbled compressed speech rhythm, deliberately non-verbal.
    for (let i = 0; i < 8; i++) {
      oscTone(rack, ctx, output, now + i * 0.09, {
        frequency: 320 + (i % 4) * 170,
        endFrequency: 260 + (i % 3) * 90,
        duration: 0.07,
        gain: 0.015,
        type: "square",
        pan: i % 2 ? 0.2 : -0.2,
        filterFreq: 1600,
        attack: 0.003,
      });
    }
    return { stop: rack.stop };
  });

  define("alarm-radio", ({ audioContext: ctx, output, offset }) => {
    const rack = makeRack();
    const now = ctx.currentTime + 0.02;
    const pattern = [0, 0.42, 0.84, 1.62, 2.04, 2.46, 3.2, 3.62];
    for (const at of pattern) {
      if (at < offset) continue;
      const when = now + (at - offset);
      oscTone(rack, ctx, output, when, {
        frequency: 880,
        duration: 0.26,
        gain: 0.022,
        type: "sine",
        pan: 0.1,
        attack: 0.005,
      });
      oscTone(rack, ctx, output, when, {
        frequency: 1320,
        duration: 0.23,
        gain: 0.011,
        type: "triangle",
        pan: -0.08,
        attack: 0.005,
      });
    }
    noiseBurst(rack, ctx, output, now, {
      duration: 3.9,
      gain: 0.015,
      highpass: 1400,
      lowpass: 3800,
      attack: 0.2,
    });
    return { stop: rack.stop };
  });

  define("scope-magnet", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    oscTone(rack, ctx, output, now, {
      frequency: 1120,
      endFrequency: 820,
      duration: 0.16,
      gain: 0.035,
      type: "triangle",
      attack: 0.002,
    });
    noiseBurst(rack, ctx, output, now + 0.01, {
      duration: 0.025,
      gain: 0.035,
      highpass: 1800,
      pan: -0.1,
      attack: 0.001,
    });
    metallicClick(rack, ctx, output, now + 0.05, 0.06, 0.05, 1440);
    return { stop: rack.stop };
  });

  define("glove-ring", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    const noise = getNoise(ctx).white;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(3400, now + 0.6);
    filter.Q.value = 2.5;
    const env = gainEnv(ctx, now, 0.68, 0.035, 0.05, "linear");
    src.connect(filter).connect(env).connect(output);
    src.start(now, 0.2);
    src.stop(now + 0.7);
    rack.nodes.push(src, filter, env);
    rack.sources.push(src);
    metallicClick(rack, ctx, output, now + 0.57, 0.07, 0.1, 1860);
    return { stop: rack.stop };
  });

  define("heartbeat", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const at = now + i * 1.25;
      oscTone(rack, ctx, output, at, {
        frequency: 56,
        endFrequency: 35,
        duration: 0.33,
        gain: 0.1,
        type: "sine",
        attack: 0.008,
        pan: -0.04,
      });
      oscTone(rack, ctx, output, at + 0.19, {
        frequency: 49,
        endFrequency: 32,
        duration: 0.2,
        gain: 0.04,
        type: "sine",
        attack: 0.005,
        pan: 0.05,
      });
    }
    return { stop: rack.stop };
  });

  define("thruster", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime + 0.01;
    const noise = getNoise(ctx).white;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.065, now + 0.18);
    gain.gain.setValueAtTime(0.065, now + 0.9);
    gain.gain.linearRampToValueAtTime(0.0001, now + 2.2);
    src.connect(filter).connect(gain).connect(output);
    src.start(now, 0.1);
    src.stop(now + 2.25);
    rack.nodes.push(src, filter, gain);
    rack.sources.push(src);
    for (let i = 0; i < 5; i++) {
      oscTone(rack, ctx, output, now + i * 0.07, {
        frequency: 34 + i * 2,
        endFrequency: 24,
        duration: 0.08,
        gain: 0.045,
        type: "sine",
        attack: 0.002,
        pan: 0.05,
      });
    }
    return { stop: rack.stop };
  });

  define("space-impact", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime + 0.01;
    oscTone(rack, ctx, output, now, {
      frequency: 39,
      endFrequency: 28,
      duration: 1.1,
      gain: 0.09,
      type: "sine",
      attack: 0.02,
    });
    noiseBurst(rack, ctx, output, now, {
      duration: 0.7,
      gain: 0.02,
      lowpass: 160,
      type: "brown",
      attack: 0.02,
    });
    return { stop: rack.stop };
  });

  define("news-beep", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    [0, 0.2, 0.42].forEach((d, i) => {
      oscTone(rack, ctx, output, now + d, {
        frequency: i === 2 ? 1046 : 783,
        duration: 0.12,
        gain: 0.018,
        type: "sine",
        attack: 0.004,
      });
    });
    return { stop: rack.stop };
  });

  define("telemetry", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      oscTone(rack, ctx, output, now + i * 0.16, {
        frequency: 1560 + i * 130,
        duration: 0.045,
        gain: 0.012,
        type: "square",
        attack: 0.001,
        filterFreq: 3200,
      });
    }
    return { stop: rack.stop };
  });

  define("seal-hiss", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 1.5,
      gain: 0.045,
      highpass: 1700,
      lowpass: 6000,
      attack: 0.04,
    });
    oscTone(rack, ctx, output, now, {
      frequency: 64,
      endFrequency: 42,
      duration: 1.2,
      gain: 0.03,
      type: "sine",
      attack: 0.05,
    });
    return { stop: rack.stop };
  });

  define("cup-clink", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    oscTone(rack, ctx, output, now, {
      frequency: 1820,
      duration: 0.5,
      gain: 0.018,
      type: "sine",
      attack: 0.002,
    });
    oscTone(rack, ctx, output, now + 0.014, {
      frequency: 2360,
      duration: 0.43,
      gain: 0.008,
      type: "sine",
      attack: 0.002,
    });
    noiseBurst(rack, ctx, output, now, {
      duration: 0.03,
      gain: 0.02,
      highpass: 2600,
      attack: 0.001,
    });
    return { stop: rack.stop };
  });

  define("chair-wood", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 0.3,
      gain: 0.025,
      lowpass: 900,
      highpass: 140,
      attack: 0.015,
    });
    oscTone(rack, ctx, output, now + 0.04, {
      frequency: 146,
      endFrequency: 89,
      duration: 0.4,
      gain: 0.025,
      type: "triangle",
      filterFreq: 700,
      attack: 0.01,
    });
    return { stop: rack.stop };
  });

  define("radio-burst", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    noiseBurst(rack, ctx, output, now, {
      duration: 0.22,
      gain: 0.04,
      highpass: 1200,
      lowpass: 3600,
      attack: 0.008,
    });
    oscTone(rack, ctx, output, now + 0.03, {
      frequency: 1200,
      endFrequency: 720,
      duration: 0.12,
      gain: 0.013,
      type: "sine",
      attack: 0.001,
    });
    return { stop: rack.stop };
  });

  define("meteor-shimmer", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime + 0.01;
    noiseBurst(rack, ctx, output, now, {
      duration: 1.8,
      gain: 0.022,
      highpass: 3000,
      lowpass: 9000,
      attack: 0.1,
    });
    for (let i = 0; i < 4; i++) {
      oscTone(rack, ctx, output, now + i * 0.17, {
        frequency: 2200 + i * 630,
        endFrequency: 1700 + i * 300,
        duration: 0.8,
        gain: 0.009,
        type: "sine",
        attack: 0.05,
        pan: i % 2 ? 0.3 : -0.3,
      });
    }
    return { stop: rack.stop };
  });

  define("distant-clank", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 650;
    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.08;
    const wet = ctx.createGain();
    wet.gain.value = 0.2;
    const env = gainEnv(ctx, now, 0.5, 0.06, 0.004);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.25);
    osc.connect(lp).connect(env);
    env.connect(output);
    env.connect(delay).connect(wet).connect(output);
    osc.start(now);
    osc.stop(now + 0.55);
    rack.nodes.push(lp, delay, wet, env, osc);
    rack.sources.push(osc);
    return { stop: rack.stop };
  });

  define("airlock", ({ audioContext: ctx, output }) => {
    const rack = makeRack();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(35, now);
    osc.frequency.linearRampToValueAtTime(48, now + 2.6);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 180;
    const env = gainEnv(ctx, now, 2.8, 0.05, 0.2, "linear");
    osc.connect(filter).connect(env).connect(output);
    osc.start(now);
    osc.stop(now + 2.85);
    rack.nodes.push(osc, filter, env, osc);
    rack.sources.push(osc);
    noiseBurst(rack, ctx, output, now + 2.55, {
      duration: 0.16,
      gain: 0.04,
      highpass: 900,
      lowpass: 2600,
      attack: 0.005,
    });
    return { stop: rack.stop };
  });
}

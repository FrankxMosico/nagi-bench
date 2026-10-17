import type { WebAudioCueBus, SoundFactoryContext } from "@agentbench/cinematic-player";
import type { FilmContext } from "./stage";

type Ac = AudioContext;

const noiseCache = new WeakMap<Ac, Map<string, AudioBuffer>>();
const impulseCache = new WeakMap<Ac, Map<string, AudioBuffer>>();

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

function buffer(ac: Ac, seconds: number, fill: (data: Float32Array, channel: number, sampleRate: number) => void): AudioBuffer {
  const length = Math.max(1, Math.floor(ac.sampleRate * seconds));
  const b = ac.createBuffer(2, length, ac.sampleRate);
  for (let c = 0; c < 2; c++) fill(b.getChannelData(c), c, ac.sampleRate);
  return b;
}

function noise(ac: Ac, kind: string, seconds = 3): AudioBuffer {
  let map = noiseCache.get(ac);
  if (!map) {
    map = new Map();
    noiseCache.set(ac, map);
  }
  const key = `${kind}:${seconds}`;
  const cached = map.get(key);
  if (cached) return cached;
  const random = rng(0x9e3779b9 + kind.length * 97);
  const out = buffer(ac, seconds, (data, channel) => {
    let low = 0;
    let band = 0;
    let pink = 0;
    for (let i = 0; i < data.length; i++) {
      const white = random() * 2 - 1;
      if (kind === "brown") {
        low = (low + white * 0.025) * 0.997;
        data[i] = low * 3.8;
      } else if (kind === "pink") {
        pink = pink * 0.97 + white * 0.03;
        data[i] = pink * 2.4;
      } else if (kind === "metal") {
        band = band * 0.72 + white * 0.28;
        data[i] = band * 0.7 + (random() > 0.992 ? white : 0) * 0.8;
      } else if (kind === "rain") {
        low = low * 0.993 + white * 0.007;
        data[i] = low * 1.6 + white * 0.14;
      } else {
        data[i] = white * 0.7;
      }
    }
  });
  map.set(key, out);
  return out;
}

function impulse(ac: Ac, seconds: number, decay: number): AudioBuffer {
  let map = impulseCache.get(ac);
  if (!map) {
    map = new Map();
    impulseCache.set(ac, map);
  }
  const key = `${seconds}:${decay}`;
  const cached = map.get(key);
  if (cached) return cached;
  const random = rng(7331);
  const b = buffer(ac, seconds, (data, channel) => {
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      const early = i < ac.sampleRate * 0.09 && random() > 0.992 ? (random() * 2 - 1) * 0.9 : 0;
      data[i] = ((random() * 2 - 1) * 0.6 + early) * Math.pow(1 - t, decay);
    }
  });
  map.set(key, b);
  return b;
}

interface Handle {
  nodes: AudioScheduledSourceNode[];
  stop: () => void;
}

function stopper(nodes: AudioScheduledSourceNode[], extra: Array<() => void> = []): Handle {
  return {
    nodes,
    stop() {
      for (const node of nodes) {
        try { node.stop(); } catch { /* already ended */ }
      }
      for (const fn of extra) fn();
    },
  };
}

function gain(ac: Ac, value: number): GainNode {
  const g = ac.createGain();
  g.gain.value = value;
  return g;
}

function noiseSource(ac: Ac, kind: string, seconds = 3, loop = false): AudioBufferSourceNode {
  const src = ac.createBufferSource();
  src.buffer = noise(ac, kind, seconds);
  src.loop = loop;
  return src;
}

function fade(g: GainNode, now: number, duration: number, peak: number, attack = 0.008): void {
  const end = now + Math.max(0.02, duration);
  g.gain.cancelScheduledValues(now);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(peak, now + Math.min(attack, duration * 0.4));
  g.gain.exponentialRampToValueAtTime(0.0001, end);
}

function connectReverb(ac: Ac, node: AudioNode, dry: AudioNode, amount: number, seconds = 1.6, decay = 2.4): void {
  const convolver = ac.createConvolver();
  convolver.buffer = impulse(ac, seconds, decay);
  const wet = gain(ac, amount);
  node.connect(convolver);
  convolver.connect(wet);
  wet.connect(dry);
}

function scheduleTone(
  ac: Ac,
  dest: AudioNode,
  type: OscillatorType,
  frequency: number,
  start: number,
  duration: number,
  peak: number,
  endFrequency = frequency,
): OscillatorNode {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(peak, start + Math.min(0.02, duration * 0.25));
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + duration + 0.03);
  return osc;
}

function gunshot({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const out = gain(ac, 0.92);
  out.connect(output);
  connectReverb(ac, out, output, 0.75, 2.2, 2.5);

  // The crack: a short, compressed wall of noise.
  const crack = noiseSource(ac, "metal", 1.2);
  const crackFilter = ac.createBiquadFilter();
  crackFilter.type = "lowpass";
  crackFilter.frequency.setValueAtTime(7200, now);
  crackFilter.frequency.exponentialRampToValueAtTime(860, now + 0.22);
  const crackGain = gain(ac, 0.0001);
  crackGain.gain.setValueAtTime(0.0001, now);
  crackGain.gain.linearRampToValueAtTime(1.0, now + 0.004);
  crackGain.gain.exponentialRampToValueAtTime(0.004, now + 0.34);
  crack.connect(crackFilter).connect(crackGain).connect(out);
  crack.start(now);
  crack.stop(now + 0.4);
  nodes.push(crack);

  // The body of the shot: a saturated low thump that folds into room modes.
  const boom = ac.createOscillator();
  boom.type = "sine";
  boom.frequency.setValueAtTime(92, now);
  boom.frequency.exponentialRampToValueAtTime(31, now + 0.4);
  const boomGain = gain(ac, 0.0001);
  boomGain.gain.setValueAtTime(0.0001, now);
  boomGain.gain.linearRampToValueAtTime(0.72, now + 0.008);
  boomGain.gain.exponentialRampToValueAtTime(0.002, now + 0.65);
  boom.connect(boomGain).connect(out);
  boom.start(now);
  boom.stop(now + 0.7);
  nodes.push(boom);

  // Basement slap-back, three discrete reflections from concrete walls.
  for (const [delay, amp] of [[0.085, 0.22], [0.19, 0.13], [0.37, 0.07]] as const) {
    const n = noiseSource(ac, "brown", 0.8);
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1800;
    const g = gain(ac, 0.0001);
    g.gain.setValueAtTime(0.0001, now + delay);
    g.gain.linearRampToValueAtTime(amp, now + delay + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.22);
    n.connect(f).connect(g).connect(out);
    n.start(now + delay);
    n.stop(now + delay + 0.24);
    nodes.push(n);
  }

  // A thin ringing in the ears, subjective but not musical.
  const ring = ac.createOscillator();
  ring.type = "sine";
  ring.frequency.value = 3920;
  const ringGain = gain(ac, 0.0001);
  ringGain.gain.setValueAtTime(0.0001, now + 0.03);
  ringGain.gain.linearRampToValueAtTime(0.045, now + 0.08);
  ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
  ring.connect(ringGain).connect(output);
  ring.start(now + 0.02);
  ring.stop(now + 2.3);
  nodes.push(ring);

  const stop = setTimeout(() => out.disconnect(), 2800);
  return stopper(nodes, [() => { clearTimeout(stop); out.disconnect(); }]);
}

function bell({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (const [frequency, amp] of [[1180, 0.16], [1770, 0.08], [2380, 0.035]] as const) {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sine";
    o.frequency.value = frequency;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(amp, now + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
    o.connect(g).connect(output);
    o.start(now);
    o.stop(now + 1.3);
    nodes.push(o);
  }
  return stopper(nodes);
}

function footsteps({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const random = rng(501);
  for (let i = 0; i < 6; i++) {
    const at = now + 0.12 + i * 0.52;
    const n = noiseSource(ac, "brown", 0.3);
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 160 + i * 22;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.18 * (0.7 + random() * 0.3), at + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.13);
    n.connect(f).connect(g).connect(output);
    n.start(at);
    n.stop(at + 0.16);
    nodes.push(n);
    if (i % 2 === 1) scheduleTone(ac, output, "sine", 90, at + 0.01, 0.09, 0.025, 62);
  }
  return stopper(nodes);
}

function doorCreak({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const o = ac.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(130, now);
  o.frequency.linearRampToValueAtTime(74, now + 0.7);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 540;
  f.Q.value = 3.2;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.045, now + 0.06);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.78);
  o.connect(f).connect(g).connect(output);
  o.start(now);
  o.stop(now + 0.82);
  return stopper([o]);
}

function roomTone(kind: "shop" | "workshop" | "basement", { audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  if (kind === "shop") {
    const n = noiseSource(ac, "rain", 4, true);
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1200;
    const g = gain(ac, 0.065);
    n.connect(f).connect(g).connect(output);
    n.start(now);
    nodes.push(n);
    const hum = ac.createOscillator();
    hum.type = "sine";
    hum.frequency.value = 47;
    const hg = gain(ac, 0.024);
    hum.connect(hg).connect(output);
    hum.start(now);
    nodes.push(hum);
    const high = ac.createOscillator();
    high.type = "sine";
    high.frequency.value = 118;
    const hfg = gain(ac, 0.006);
    high.connect(hfg).connect(output);
    high.start(now);
    nodes.push(high);
  } else if (kind === "workshop") {
    const hum = ac.createOscillator();
    hum.type = "sine";
    hum.frequency.value = 60;
    const g = gain(ac, 0.032);
    hum.connect(g).connect(output);
    hum.start(now);
    nodes.push(hum);
    const n = noiseSource(ac, "brown", 3, true);
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 260;
    const ng = gain(ac, 0.14);
    n.connect(f).connect(ng).connect(output);
    n.start(now);
    nodes.push(n);
  } else {
    const n = noiseSource(ac, "brown", 3, true);
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 150;
    const g = gain(ac, 0.12);
    n.connect(f).connect(g).connect(output);
    n.start(now);
    nodes.push(n);
    const hum = ac.createOscillator();
    hum.type = "sine";
    hum.frequency.value = 38;
    const hg = gain(ac, 0.032);
    hum.connect(hg).connect(output);
    hum.start(now);
    nodes.push(hum);
  }
  return stopper(nodes);
}

function lathe({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const motor = ac.createOscillator();
  motor.type = "sawtooth";
  motor.frequency.setValueAtTime(54, now);
  motor.frequency.linearRampToValueAtTime(57, now + 0.4);
  const motorFilter = ac.createBiquadFilter();
  motorFilter.type = "lowpass";
  motorFilter.frequency.value = 340;
  const motorGain = gain(ac, 0.085);
  motor.connect(motorFilter).connect(motorGain).connect(output);
  motor.start(now);
  nodes.push(motor);

  const whine = ac.createOscillator();
  whine.type = "triangle";
  whine.frequency.setValueAtTime(690, now);
  whine.frequency.linearRampToValueAtTime(760, now + 2);
  const wf = ac.createBiquadFilter();
  wf.type = "bandpass";
  wf.frequency.value = 720;
  wf.Q.value = 1.8;
  const wg = gain(ac, 0.022);
  whine.connect(wf).connect(wg).connect(output);
  whine.start(now);
  nodes.push(whine);

  const cut = noiseSource(ac, "metal", 2, true);
  const cf = ac.createBiquadFilter();
  cf.type = "bandpass";
  cf.frequency.value = 3600;
  cf.Q.value = 0.75;
  const cg = gain(ac, 0.055);
  cut.connect(cf).connect(cg).connect(output);
  cut.start(now);
  nodes.push(cut);
  return stopper(nodes);
}

function machineStart({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const o = ac.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(24, now);
  o.frequency.exponentialRampToValueAtTime(68, now + 1.2);
  const f = ac.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.setValueAtTime(200, now);
  f.frequency.exponentialRampToValueAtTime(640, now + 1.1);
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.12, now + 0.18);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
  o.connect(f).connect(g).connect(output);
  o.start(now);
  o.stop(now + 1.5);
  nodes.push(o);
  const n = noiseSource(ac, "metal", 1.4);
  const nf = ac.createBiquadFilter();
  nf.type = "highpass";
  nf.frequency.value = 900;
  const ng = gain(ac, 0.0001);
  ng.gain.setValueAtTime(0.0001, now);
  ng.gain.linearRampToValueAtTime(0.08, now + 0.03);
  ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  n.connect(nf).connect(ng).connect(output);
  n.start(now);
  n.stop(now + 0.55);
  nodes.push(n);
  return stopper(nodes);
}

function metalClick({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const n = noiseSource(ac, "metal", 0.3);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 1500 + Math.random() * 1200;
  f.Q.value = 4;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.22, now + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
  n.connect(f).connect(g).connect(output);
  n.start(now);
  n.stop(now + 0.16);
  const o = ac.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(1000 + Math.random() * 1400, now);
  const og = gain(ac, 0.04);
  og.gain.setValueAtTime(0.04, now);
  og.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  o.connect(og).connect(output);
  o.start(now);
  o.stop(now + 0.13);
  return stopper([n, o]);
}

function pliers({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (let i = 0; i < 3; i++) {
    const at = now + i * 0.09;
    const n = noiseSource(ac, "metal", 0.2);
    const f = ac.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 2400;
    f.Q.value = 5;
    const g = gain(ac, 0.0001);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.12, at + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
    n.connect(f).connect(g).connect(output);
    n.start(at);
    n.stop(at + 0.08);
    nodes.push(n);
  }
  return stopper(nodes);
}

function glue({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const n = noiseSource(ac, "pink", 0.8);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.setValueAtTime(950, now);
  f.frequency.linearRampToValueAtTime(320, now + 0.5);
  f.Q.value = 2;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.045, now + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  n.connect(f).connect(g).connect(output);
  n.start(now);
  n.stop(now + 0.55);
  return stopper([n]);
}

function phone({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const o = ac.createOscillator();
  o.type = "square";
  o.frequency.value = 196;
  const f = ac.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 420;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  for (let i = 0; i < 3; i++) {
    g.gain.setValueAtTime(0.0001, now + i * 0.18);
    g.gain.linearRampToValueAtTime(0.05, now + i * 0.18 + 0.01);
    g.gain.linearRampToValueAtTime(0.0001, now + i * 0.18 + 0.12);
  }
  o.connect(f).connect(g).connect(output);
  o.start(now);
  o.stop(now + 0.62);
  nodes.push(o);
  return stopper(nodes);
}

function clothRustle({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const n = noiseSource(ac, "pink", 1.2);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.setValueAtTime(700, now);
  f.frequency.linearRampToValueAtTime(1600, now + 0.8);
  f.Q.value = 1.1;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.055, now + 0.16);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
  n.connect(f).connect(g).connect(output);
  n.start(now);
  n.stop(now + 1.0);
  return stopper([n]);
}

function beefCut({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (let i = 0; i < 2; i++) {
    const at = now + i * 0.33;
    const n = noiseSource(ac, "brown", 0.7);
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(900, at);
    f.frequency.exponentialRampToValueAtTime(240, at + 0.3);
    const g = gain(ac, 0.0001);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.1, at + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.28);
    n.connect(f).connect(g).connect(output);
    n.start(at);
    n.stop(at + 0.3);
    nodes.push(n);
  }
  return stopper(nodes);
}

function packing({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (let i = 0; i < 14; i++) {
    const at = now + 0.15 + i * 0.16;
    const n = noiseSource(ac, "metal", 0.2);
    const f = ac.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1200 + (i % 5) * 360;
    f.Q.value = 3.3;
    const g = gain(ac, 0.0001);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.045, at + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.07);
    n.connect(f).connect(g).connect(output);
    n.start(at);
    n.stop(at + 0.09);
    nodes.push(n);
  }
  const close = ac.currentTime + 2.5;
  scheduleTone(ac, output, "triangle", 140, close, 0.08, 0.08, 60);
  return stopper(nodes);
}

function spaceAmbience({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const o1 = ac.createOscillator();
  o1.type = "sine";
  o1.frequency.value = 33;
  const g1 = gain(ac, 0.032);
  o1.connect(g1).connect(output);
  o1.start(now);
  nodes.push(o1);
  const o2 = ac.createOscillator();
  o2.type = "sine";
  o2.frequency.value = 52.7;
  const g2 = gain(ac, 0.012);
  o2.connect(g2).connect(output);
  o2.start(now);
  nodes.push(o2);
  const n = noiseSource(ac, "brown", 5, true);
  const f = ac.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 70;
  const ng = gain(ac, 0.035);
  n.connect(f).connect(ng).connect(output);
  n.start(now);
  nodes.push(n);
  return stopper(nodes);
}

function suitBreath({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const seconds = 14;
  const random = rng(0xbeef);
  const breath = buffer(ac, seconds, (data) => {
    let low = 0;
    for (let i = 0; i < data.length; i++) {
      const t = i / ac.sampleRate;
      const phase = (t / 5.8) % 1;
      let env = 0;
      if (phase < 0.28) env = Math.sin((phase / 0.28) * Math.PI) * 0.8;
      else if (phase > 0.5 && phase < 0.82) env = Math.sin(((phase - 0.5) / 0.32) * Math.PI);
      const white = random() * 2 - 1;
      low = low * 0.94 + white * 0.06;
      data[i] = low * env * 0.34;
    }
  });
  const src = ac.createBufferSource();
  src.buffer = breath;
  src.loop = true;
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 720;
  f.Q.value = 0.55;
  const g = gain(ac, 0.25);
  src.connect(f).connect(g).connect(output);
  src.start(now);
  return stopper([src]);
}

function servo({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const o = ac.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(118, now);
  o.frequency.linearRampToValueAtTime(74, now + 0.7);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 420;
  f.Q.value = 2;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.04, now + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
  o.connect(f).connect(g).connect(output);
  o.start(now);
  o.stop(now + 0.75);
  return stopper([o]);
}

function gloveOff({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const n = noiseSource(ac, "metal", 0.4);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 2100;
  f.Q.value = 2.6;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.18, now + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
  n.connect(f).connect(g).connect(output);
  n.start(now);
  n.stop(now + 0.18);
  nodes.push(n);
  const hiss = noiseSource(ac, "brown", 1.1);
  const hf = ac.createBiquadFilter();
  hf.type = "highpass";
  hf.frequency.value = 1800;
  const hg = gain(ac, 0.0001);
  hg.gain.setValueAtTime(0.0001, now + 0.04);
  hg.gain.linearRampToValueAtTime(0.035, now + 0.1);
  hg.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
  hiss.connect(hf).connect(hg).connect(output);
  hiss.start(now + 0.03);
  hiss.stop(now + 0.95);
  nodes.push(hiss);
  return stopper(nodes);
}

function radioBeep({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (let i = 0; i < 2; i++) {
    const o = ac.createOscillator();
    o.type = "sine";
    o.frequency.value = i === 0 ? 1020 : 1420;
    const g = gain(ac, 0.0001);
    const at = now + i * 0.075;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.035, at + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.055);
    o.connect(g).connect(output);
    o.start(at);
    o.stop(at + 0.06);
    nodes.push(o);
  }
  const n = noiseSource(ac, "metal", 0.4);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 1900;
  f.Q.value = 0.7;
  const ng = gain(ac, 0.0001);
  ng.gain.setValueAtTime(0.0001, now + 0.12);
  ng.gain.linearRampToValueAtTime(0.02, now + 0.14);
  ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
  n.connect(f).connect(ng).connect(output);
  n.start(now + 0.12);
  n.stop(now + 0.48);
  nodes.push(n);
  return stopper(nodes);
}

function airlock({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const thump = ac.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(66, now);
  thump.frequency.exponentialRampToValueAtTime(35, now + 0.45);
  const tg = gain(ac, 0.0001);
  tg.gain.setValueAtTime(0.0001, now);
  tg.gain.linearRampToValueAtTime(0.28, now + 0.01);
  tg.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  thump.connect(tg).connect(output);
  thump.start(now);
  thump.stop(now + 0.54);
  nodes.push(thump);
  const n = noiseSource(ac, "brown", 3.2);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.setValueAtTime(250, now);
  f.frequency.linearRampToValueAtTime(1000, now + 2.8);
  f.Q.value = 0.9;
  const g = gain(ac, 0.0001);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.linearRampToValueAtTime(0.11, now + 0.14);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
  n.connect(f).connect(g).connect(output);
  n.start(now);
  n.stop(now + 3.1);
  nodes.push(n);
  return stopper(nodes);
}

function suitGun({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  // No external report in vacuum: only the mechanism and a conducted body thud.
  // Ten rounds per burst, heard through the suit rather than the void.
  for (let round = 0; round < 10; round++) {
    const at = now + round * 0.063;
    const click = noiseSource(ac, "metal", 0.2);
    const f = ac.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 2200 + (round % 3) * 180;
    f.Q.value = 4.2;
    const cg = gain(ac, 0.0001);
    cg.gain.setValueAtTime(0.0001, at);
    cg.gain.linearRampToValueAtTime(0.045, at + 0.002);
    cg.gain.exponentialRampToValueAtTime(0.0001, at + 0.045);
    click.connect(f).connect(cg).connect(output);
    click.start(at);
    click.stop(at + 0.055);
    nodes.push(click);

    const thud = ac.createOscillator();
    thud.type = "sine";
    thud.frequency.setValueAtTime(76 - round * 1.6, at);
    thud.frequency.exponentialRampToValueAtTime(43, at + 0.13);
    const tg = gain(ac, 0.0001);
    tg.gain.setValueAtTime(0.0001, at);
    tg.gain.linearRampToValueAtTime(0.052, at + 0.004);
    tg.gain.exponentialRampToValueAtTime(0.0001, at + 0.14);
    thud.connect(tg).connect(output);
    thud.start(at);
    thud.stop(at + 0.16);
    nodes.push(thud);
  }
  return stopper(nodes);
}

function vacuumFlight({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const o = ac.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(28, now);
  o.frequency.linearRampToValueAtTime(22, now + 5);
  const g = gain(ac, 0.055);
  o.connect(g).connect(output);
  o.start(now);
  nodes.push(o);
  const n = noiseSource(ac, "pink", 5, true);
  const f = ac.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 5400;
  const ng = gain(ac, 0.022);
  n.connect(f).connect(ng).connect(output);
  n.start(now);
  nodes.push(n);
  return stopper(nodes);
}

function heartbeat({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (let i = 0; i < 8; i++) {
    const at = now + i * 1.1;
    for (const [off, amp] of [[0, 0.06], [0.12, 0.035]] as const) {
      const o = ac.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(56, at + off);
      o.frequency.exponentialRampToValueAtTime(38, at + off + 0.12);
      const g = gain(ac, 0.0001);
      g.gain.setValueAtTime(0.0001, at + off);
      g.gain.linearRampToValueAtTime(amp, at + off + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, at + off + 0.14);
      o.connect(g).connect(output);
      o.start(at + off);
      o.stop(at + off + 0.15);
      nodes.push(o);
    }
  }
  return stopper(nodes);
}

function radioAlarm({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  for (let i = 0; i < 13; i++) {
    const at = now + 0.2 + i * 0.55;
    const o = ac.createOscillator();
    o.type = "square";
    o.frequency.value = i % 2 === 0 ? 620 : 740;
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1200;
    const g = gain(ac, 0.0001);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.018, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
    o.connect(f).connect(g).connect(output);
    o.start(at);
    o.stop(at + 0.2);
    nodes.push(o);
  }
  return stopper(nodes);
}

function thruster({ audioContext: ac, output }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const n = noiseSource(ac, "pink", 3, true);
  const f = ac.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.setValueAtTime(480, now);
  f.frequency.linearRampToValueAtTime(720, now + 1.2);
  f.Q.value = 0.45;
  const g = gain(ac, 0.18);
  n.connect(f).connect(g).connect(output);
  n.start(now);
  nodes.push(n);
  const low = ac.createOscillator();
  low.type = "sawtooth";
  low.frequency.value = 46;
  const lf = ac.createBiquadFilter();
  lf.type = "lowpass";
  lf.frequency.value = 160;
  const lg = gain(ac, 0.09);
  low.connect(lf).connect(lg).connect(output);
  low.start(now);
  nodes.push(low);
  return stopper(nodes);
}

function pad({ audioContext: ac, output, cue, offset }: SoundFactoryContext): Handle {
  const now = ac.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const notes = [55, 82.4, 110, 164.8, 220];
  const duration = Math.max(2, cue.end - cue.start);
  notes.forEach((frequency, index) => {
    const o = ac.createOscillator();
    o.type = index % 2 === 0 ? "sine" : "triangle";
    o.frequency.value = frequency;
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 480 + index * 120;
    const g = gain(ac, 0.0001);
    const start = now + index * 0.18;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(0.018 / (1 + index * 0.2), start + 1.4);
    g.gain.setValueAtTime(0.018 / (1 + index * 0.2), Math.max(start + 1.5, now + duration - 2.2));
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    o.connect(f).connect(g).connect(output);
    o.start(start);
    o.stop(now + duration + 0.1);
    nodes.push(o);
  });
  void offset;
  return stopper(nodes);
}

export function installSoundDesign(audio: WebAudioCueBus<FilmContext>): void {
  audio
    .define("room-shop", (ctx) => roomTone("shop", ctx))
    .define("room-workshop", (ctx) => roomTone("workshop", ctx))
    .define("room-basement", (ctx) => roomTone("basement", ctx))
    .define("bell", bell)
    .define("footsteps", footsteps)
    .define("door-creak", doorCreak)
    .define("lathe", lathe)
    .define("machine-start", machineStart)
    .define("metal-click", metalClick)
    .define("pliers", pliers)
    .define("glue", glue)
    .define("phone", phone)
    .define("cloth", clothRustle)
    .define("beef-cut", beefCut)
    .define("packing", packing)
    .define("space-ambience", spaceAmbience)
    .define("suit-breath", suitBreath)
    .define("servo", servo)
    .define("glove-off", gloveOff)
    .define("radio-beep", radioBeep)
    .define("airlock", airlock)
    .define("suit-gun", suitGun)
    .define("vacuum-flight", vacuumFlight)
    .define("heartbeat", heartbeat)
    .define("radio-alarm", radioAlarm)
    .define("thruster", thruster)
    .define("pad", pad)
    .define("gunshot-basement", gunshot);
}

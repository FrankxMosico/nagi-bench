import type { SoundFactoryContext, WebAudioCueBus } from "@agentbench/cinematic-player";
import { rng } from "./textures";

type Ctx = SoundFactoryContext;

/* --------------------------------------------------------------- utilities */

const noiseCache = new WeakMap<AudioContext, AudioBuffer>();
const impulseCache = new WeakMap<AudioContext, AudioBuffer>();
const loopCache = new WeakMap<AudioContext, Map<string, AudioBuffer>>();

function noiseBuffer(ac: AudioContext): AudioBuffer {
  const cached = noiseCache.get(ac);
  if (cached) return cached;
  const length = Math.floor(ac.sampleRate * 3);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  const r = rng(9182);
  for (let i = 0; i < length; i++) data[i] = r() * 2 - 1;
  noiseCache.set(ac, buffer);
  return buffer;
}

function makeLoop(ac: AudioContext, key: string, seconds: number, fill: (left: Float32Array, right: Float32Array, sampleRate: number) => void): AudioBuffer {
  let map = loopCache.get(ac);
  if (!map) {
    map = new Map();
    loopCache.set(ac, map);
  }
  const cached = map.get(key);
  if (cached) return cached;
  const length = Math.floor(ac.sampleRate * seconds);
  const buffer = ac.createBuffer(2, length, ac.sampleRate);
  const l = buffer.getChannelData(0);
  const r = buffer.getChannelData(1);
  fill(l, r, ac.sampleRate);
  map.set(key, buffer);
  return buffer;
}

function loopSource(ac: AudioContext, out: AudioNode, buffer: AudioBuffer, offset = 0, gain = 1): { source: AudioBufferSourceNode; gainNode: GainNode; stop: () => void } {
  const source = ac.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const g = ac.createGain();
  g.gain.value = gain;
  source.connect(g).connect(out);
  const start = ac.currentTime;
  source.start(start, Math.max(0, offset) % buffer.duration);
  return {
    source,
    gainNode: g,
    stop: () => {
      try {
        g.gain.cancelScheduledValues(ac.currentTime);
        g.gain.setTargetAtTime(0.0001, ac.currentTime, 0.08);
        source.stop(ac.currentTime + 0.4);
      } catch {
        /* already stopped */
      }
    },
  };
}

function osc(ac: AudioContext, type: OscillatorType, frequency: number, gainValue: number, out: AudioNode, detune = 0): { osc: OscillatorNode; gain: GainNode } {
  const o = ac.createOscillator();
  o.type = type;
  o.frequency.value = frequency;
  o.detune.value = detune;
  const g = ac.createGain();
  g.gain.value = gainValue;
  o.connect(g).connect(out);
  o.start();
  return { osc: o, gain: g };
}

function noise(ac: AudioContext, out: AudioNode, duration: number, gainValue: number, offset = 0): { source: AudioBufferSourceNode; gain: GainNode } {
  const source = ac.createBufferSource();
  source.buffer = noiseBuffer(ac);
  source.loop = true;
  const g = ac.createGain();
  g.gain.value = gainValue;
  source.connect(g).connect(out);
  source.start(ac.currentTime, offset % source.buffer.duration);
  source.stop(ac.currentTime + duration + 0.1);
  return { source, gain: g };
}

function impulse(ac: AudioContext): AudioBuffer {
  const cached = impulseCache.get(ac);
  if (cached) return cached;
  const seconds = 2.1;
  const length = Math.floor(ac.sampleRate * seconds);
  const buffer = ac.createBuffer(2, length, ac.sampleRate);
  const r = rng(1234);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const t = i / length;
      data[i] = (r() * 2 - 1) * Math.pow(1 - t, 2.4) * (channel === 0 ? 1 : 0.86);
    }
    // Early reflections in a small concrete room.
    for (const [time, amp] of [[0.018, 0.5], [0.031, 0.32], [0.049, 0.22], [0.083, 0.12]] as const) {
      data[Math.floor(time * ac.sampleRate)] += amp;
    }
  }
  impulseCache.set(ac, buffer);
  return buffer;
}

function reverb(ac: AudioContext, out: AudioNode, mix = 0.8): AudioNode {
  const conv = ac.createConvolver();
  conv.buffer = impulse(ac);
  const wet = ac.createGain();
  wet.gain.value = mix;
  conv.connect(wet).connect(out);
  return conv;
}

function click(ac: AudioContext, out: AudioNode, time: number, freq: number, amp: number, decay: number, type: OscillatorType = "triangle"): void {
  const o = ac.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, time);
  o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.45), time + decay);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(amp, time + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, time + decay);
  o.connect(g).connect(out);
  o.start(time);
  o.stop(time + decay + 0.02);
}

function noiseBurst(ac: AudioContext, out: AudioNode, time: number, duration: number, amp: number, filterFreq: number, q = 0.8, type: BiquadFilterType = "lowpass"): void {
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac);
  const filter = ac.createBiquadFilter();
  filter.type = type;
  filter.frequency.setValueAtTime(filterFreq, time);
  filter.Q.value = q;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(amp, time + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  src.connect(filter).connect(g).connect(out);
  src.start(time, Math.random() * 1.5);
  src.stop(time + duration + 0.05);
}

function makeThruster(ac: AudioContext, out: AudioNode, duration: number, offset: number): { stop: () => void } {
  const t = ac.currentTime;
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac);
  src.loop = true;
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(240, t);
  bp.frequency.exponentialRampToValueAtTime(900, t + 0.3);
  bp.frequency.exponentialRampToValueAtTime(320, t + duration);
  bp.Q.value = 0.7;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + 0.08);
  g.gain.setValueAtTime(0.22, t + Math.max(0.2, duration * 0.6));
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  src.connect(bp).connect(g).connect(out);
  src.start(t, offset % src.buffer.duration);
  src.stop(t + duration + 0.1);
  return { stop: () => { try { src.stop(); } catch { /* noop */ } } };
}

/* --------------------------------------------------------------- factories */

export function defineSounds<Context = unknown>(audio: WebAudioCueBus<Context>): void {
  // Long ambiences.
  audio.define("space-drone", ({ audioContext: ac, output, offset }) => {
    const t = ac.currentTime;
    const lp = ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 180;
    lp.Q.value = 0.4;
    lp.connect(output);
    const a = osc(ac, "sine", 55, 0.12, lp);
    const b = osc(ac, "sine", 82.5, 0.05, lp);
    const c = osc(ac, "triangle", 110, 0.022, lp);
    const lfo = ac.createOscillator();
    const lfoGain = ac.createGain();
    lfo.frequency.value = 0.055;
    lfoGain.gain.value = 0.045;
    lfo.connect(lfoGain).connect(a.gain.gain);
    lfo.start(t);
    const n = noise(ac, output, 60, 0.006, offset);
    const nf = ac.createBiquadFilter();
    nf.type = "bandpass";
    nf.frequency.value = 900;
    nf.Q.value = 0.2;
    // leave the noise unprocessed but very quiet; space should feel like pressure
    return {
      stop: () => {
        for (const o of [a.osc, b.osc, c.osc, lfo]) { try { o.stop(); } catch { /* noop */ } }
        try { n.source.stop(); } catch { /* noop */ }
      },
    };
  });

  audio.define("dusk-wind", ({ audioContext: ac, output, offset }) => {
    const buffer = makeLoop(ac, "wind", 8, (l, r, sr) => {
      const rand = rng(71);
      let bl = 0;
      let br = 0;
      for (let i = 0; i < l.length; i++) {
        const mod = 0.5 + 0.5 * Math.sin((i / sr) * 0.7) * Math.sin((i / sr) * 0.23 + 1.1);
        bl = bl * 0.97 + (rand() * 2 - 1) * 0.03;
        br = br * 0.975 + (rand() * 2 - 1) * 0.03;
        l[i] = bl * (0.22 + mod * 0.32);
        r[i] = br * (0.22 + mod * 0.28);
      }
    });
    const s = loopSource(ac, output, buffer, offset, 0.42);
    return { stop: s.stop };
  });

  audio.define("room-tone", ({ audioContext: ac, output, offset }) => {
    const buffer = makeLoop(ac, "room", 8, (l, r, sr) => {
      const rand = rng(72);
      for (let i = 0; i < l.length; i++) {
        const t = i / sr;
        const hum = Math.sin(t * Math.PI * 2 * 50) * 0.02 + Math.sin(t * Math.PI * 2 * 100 + 0.6) * 0.006;
        const noise = (rand() * 2 - 1) * 0.003;
        l[i] = hum + noise;
        r[i] = hum * 0.9 + (rand() * 2 - 1) * 0.003;
      }
      // clock
      for (let tick = 0; tick < 4; tick++) {
        const idx = Math.floor((tick * 2.05 + 0.4) * sr);
        for (let k = 0; k < 220; k++) {
          const v = Math.sin((k / sr) * 2 * Math.PI * 2100) * Math.exp(-k / 60) * 0.025;
          if (idx + k < l.length) { l[idx + k] += v; r[idx + k] += v * 0.8; }
        }
      }
    });
    const s = loopSource(ac, output, buffer, offset, 0.7);
    return { stop: s.stop };
  });

  audio.define("basement-tone", ({ audioContext: ac, output, offset }) => {
    const t = ac.currentTime;
    const hum = osc(ac, "sine", 42, 0.05, output);
    const hum2 = osc(ac, "triangle", 63, 0.018, output);
    const n = noise(ac, output, 45, 0.01, offset);
    const lp = ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 300;
    // quiet drips
    const drip = (delay: number) => {
      const at = t + delay;
      click(ac, output, at, 900 + Math.random() * 500, 0.018, 0.16, "sine");
    };
    drip(2.5); drip(5.8); drip(9.3); drip(13.1); drip(16.8);
    return {
      stop: () => {
        for (const o of [hum.osc, hum2.osc]) { try { o.stop(); } catch { /* noop */ } }
        try { n.source.stop(); } catch { /* noop */ }
      },
    };
  });

  audio.define("workshop-hum", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const o1 = osc(ac, "sawtooth", 49, 0.018, output);
    const o2 = osc(ac, "sine", 98, 0.02, output);
    const n = noise(ac, output, 60, 0.012);
    const lp = ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 420;
    return {
      stop: () => {
        for (const o of [o1.osc, o2.osc]) { try { o.stop(); } catch { /* noop */ } }
        try { n.source.stop(); } catch { /* noop */ }
      },
    };
  });

  audio.define("station-hum", ({ audioContext: ac, output, offset }) => {
    const t = ac.currentTime;
    const o1 = osc(ac, "sine", 43, 0.035, output);
    const o2 = osc(ac, "sine", 86, 0.011, output, 4);
    const n = noise(ac, output, 60, 0.008, offset);
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1200;
    bp.Q.value = 0.3;
    return {
      stop: () => {
        for (const o of [o1.osc, o2.osc]) { try { o.stop(); } catch { /* noop */ } }
        try { n.source.stop(); } catch { /* noop */ }
      },
    };
  });

  audio.define("broadcast-pad", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const filter = ac.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    filter.connect(output);
    const notes = [110, 164.81, 220, 329.63];
    const oscs = notes.map((f, i) => {
      const o = ac.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      const g = ac.createGain();
      g.gain.value = 0.018 / (i + 1);
      o.connect(g).connect(filter);
      o.start(t);
      return o;
    });
    const n = noise(ac, output, 40, 0.005);
    return {
      stop: () => {
        for (const o of oscs) { try { o.stop(); } catch { /* noop */ } }
        try { n.source.stop(); } catch { /* noop */ }
      },
    };
  });

  audio.define("elevator-hum", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const o1 = osc(ac, "sine", 36, 0.045, output);
    const o2 = osc(ac, "sawtooth", 72, 0.006, output);
    const o3 = osc(ac, "sine", 144, 0.004, output);
    return {
      stop: () => {
        for (const o of [o1.osc, o2.osc, o3.osc]) { try { o.stop(); } catch { /* noop */ } }
      },
    };
  });

  audio.define("radio-bed", ({ audioContext: ac, output, offset }) => {
    const buffer = makeLoop(ac, "radio", 5, (l, r, sr) => {
      const rand = rng(73);
      let b = 0;
      for (let i = 0; i < l.length; i++) {
        b = b * 0.98 + (rand() * 2 - 1) * 0.02;
        const t = i / sr;
        const squelch = Math.sin(t * 0.9) > 0.985 ? (rand() * 2 - 1) * 0.12 : 0;
        l[i] = b * 0.4 + squelch;
        r[i] = b * 0.35 + squelch * 0.6;
      }
    });
    const s = loopSource(ac, output, buffer, offset, 0.36);
    return { stop: s.stop };
  });

  audio.define("eva-breath", ({ audioContext: ac, output, offset }) => {
    const buffer = makeLoop(ac, "breath", 8, (l, r, sr) => {
      const rand = rng(74);
      // Two four-second breath cycles: filtered noise rising and falling, plus a
      // low pulse of the suit's circulation.
      let bpL = 0;
      let bpR = 0;
      for (let i = 0; i < l.length; i++) {
        const t = i / sr;
        const phase = t % 4;
        let env = 0;
        if (phase < 1.9) env = Math.sin((phase / 1.9) * Math.PI) * 0.9;
        else if (phase > 2.2 && phase < 3.6) env = Math.sin(((phase - 2.2) / 1.4) * Math.PI) * 0.55;
        const n = rand() * 2 - 1;
        bpL = bpL * 0.9 + n * 0.1;
        bpR = bpR * 0.9 + n * 0.1;
        const hp = bpL - bpL * 0.02;
        const noiseVal = (bpL - hp) * env;
        const pump = Math.sin(t * Math.PI * 2 * 1.35) * 0.012 * (0.5 + env);
        l[i] = noiseVal * 0.42 + pump;
        r[i] = bpR * env * 0.38 + pump * 0.9;
        // tiny valve hiss
        if (phase > 1.82 && phase < 2.1) l[i] += (rand() * 2 - 1) * 0.02;
      }
    });
    const s = loopSource(ac, output, buffer, offset, 0.9);
    return { stop: s.stop };
  });

  audio.define("heartbeat", ({ audioContext: ac, output, offset }) => {
    const buffer = makeLoop(ac, "heart", 1.35, (l, r, sr) => {
      const pulse = (at: number, amp: number) => {
        const start = Math.floor(at * sr);
        for (let k = 0; k < sr * 0.16; k++) {
          const t = k / sr;
          const v = Math.sin(t * Math.PI * 2 * (52 - t * 120)) * Math.exp(-t * 22) * amp;
          if (start + k < l.length) { l[start + k] += v; r[start + k] += v; }
        }
      };
      pulse(0.05, 0.65);
      pulse(0.27, 0.3);
    });
    const s = loopSource(ac, output, buffer, offset, 0.55);
    return { stop: s.stop };
  });

  audio.define("credits-drone", ({ audioContext: ac, output, offset }) => {
    const t = ac.currentTime;
    const lp = ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 500;
    lp.connect(output);
    const notes = [55, 82.5, 110, 164.8];
    const oscs = notes.map((f, i) => {
      const o = ac.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      const g = ac.createGain();
      g.gain.value = 0.035 / (i + 1);
      o.connect(g).connect(lp);
      o.start(t);
      return o;
    });
    const n = noise(ac, output, 20, 0.004, offset);
    return {
      stop: () => {
        for (const o of oscs) { try { o.stop(); } catch { /* noop */ } }
        try { n.source.stop(); } catch { /* noop */ }
      },
    };
  });

  // One-shots and gestures.
  audio.define("footsteps-stone", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    for (let i = 0; i < 4; i++) {
      noiseBurst(ac, output, t + i * 0.62, 0.14, 0.1, 500, 0.9);
      click(ac, output, t + i * 0.62, 95, 0.08, 0.12, "sine");
    }
  });

  audio.define("door-wood", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(220, t);
    bp.frequency.linearRampToValueAtTime(520, t + 0.9);
    bp.Q.value = 3.5;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.04, t + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    src.connect(bp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 1.2);
    click(ac, output, t + 1.0, 120, 0.1, 0.25, "sine");
  });

  audio.define("tea-pour", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    src.loop = true;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(950, t);
    bp.frequency.exponentialRampToValueAtTime(1400, t + 1.8);
    bp.Q.value = 2.2;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.2);
    g.gain.setValueAtTime(0.03, t + 1.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
    src.connect(bp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 2.2);
    for (let i = 0; i < 4; i++) click(ac, output, t + 0.4 + i * 0.38, 420 + i * 80, 0.015, 0.09, "sine");
  });

  audio.define("porcelain", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 1850, 0.045, 0.35, "sine");
    click(ac, output, t + 0.01, 2630, 0.025, 0.22, "sine");
  });

  audio.define("glass-door", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(1800, t);
    bp.frequency.linearRampToValueAtTime(900, t + 1.2);
    bp.Q.value = 5;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    src.connect(bp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 1.6);
    click(ac, output, t + 1.45, 2300, 0.02, 0.24, "sine");
  });

  audio.define("rock-tap", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    noiseBurst(ac, output, t, 0.035, 0.13, 3200, 1.2, "bandpass");
    click(ac, output, t + 0.003, 1650, 0.035, 0.12, "triangle");
  });

  audio.define("phone-pay", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 1320, 0.035, 0.16, "sine");
    click(ac, output, t + 0.16, 1760, 0.03, 0.2, "sine");
  });

  audio.define("cloth-wrap", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    for (let i = 0; i < 7; i++) {
      noiseBurst(ac, output, t + i * 0.18, 0.09, 0.045, 2100, 0.8, "bandpass");
    }
  });

  audio.define("transition-whoosh", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    src.loop = true;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(250, t);
    bp.frequency.exponentialRampToValueAtTime(2600, t + 1.3);
    bp.frequency.exponentialRampToValueAtTime(180, t + 2.4);
    bp.Q.value = 1.4;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.1, t + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
    src.connect(bp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 2.7);
    click(ac, output, t + 0.2, 68, 0.05, 0.9, "sine");
  });

  audio.define("weld-sparks", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    src.loop = true;
    const hp = ac.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2200;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.1);
    g.gain.setValueAtTime(0.05, t + 2.5);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
    src.connect(hp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 3.5);
    for (let i = 0; i < 26; i++) {
      click(ac, output, t + Math.random() * 3.1, 2500 + Math.random() * 3000, 0.012, 0.03, "square");
    }
  });

  audio.define("beacon-ping", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 880, 0.04, 0.9, "sine");
    click(ac, output, t + 0.42, 880, 0.018, 0.6, "sine");
  });

  audio.define("hatch-slide", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const o = ac.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(45, t);
    o.frequency.linearRampToValueAtTime(95, t + 0.2);
    o.frequency.linearRampToValueAtTime(55, t + 1.4);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.04, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    o.connect(g).connect(output);
    o.start(t);
    o.stop(t + 1.55);
    noiseBurst(ac, output, t + 0.9, 0.25, 0.08, 700, 1.5);
    click(ac, output, t + 1.3, 240, 0.06, 0.25, "sine");
  });

  audio.define("console-beep", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 1040, 0.025, 0.1, "square");
    click(ac, output, t + 0.11, 1320, 0.02, 0.1, "square");
  });

  audio.define("cnc-start", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const o = ac.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(30, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 1.7);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.8);
    g.gain.setValueAtTime(0.03, t + 1.5);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    o.connect(g).connect(output);
    o.start(t);
    o.stop(t + 2.5);
    click(ac, output, t + 0.1, 180, 0.08, 0.2, "sine");
  });

  audio.define("cnc-stop", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const o = ac.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(95, t);
    o.frequency.exponentialRampToValueAtTime(25, t + 1.8);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.03, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);
    o.connect(g).connect(output);
    o.start(t);
    o.stop(t + 2.1);
    noiseBurst(ac, output, t + 1.3, 0.5, 0.02, 800, 0.8);
  });

  audio.define("cnc-cut", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    src.loop = true;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1600;
    bp.Q.value = 1.1;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.5);
    g.gain.setValueAtTime(0.035, t + 14);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 17);
    src.connect(bp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 17.2);
    const motor = osc(ac, "sawtooth", 96, 0.012, output);
    const lfo = ac.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 6.2;
    const lg = ac.createGain();
    lg.gain.value = 0.012;
    lfo.connect(lg).connect(g.gain);
    lfo.start(t);
    // irregular tool bites
    for (let i = 0; i < 34; i++) {
      click(ac, output, t + 0.4 + Math.random() * 15.5, 1400 + Math.random() * 1800, 0.008, 0.035, "square");
    }
    return {
      stop: () => {
        try { src.stop(); } catch { /* noop */ }
        try { motor.osc.stop(); lfo.stop(); } catch { /* noop */ }
      },
    };
  });

  audio.define("tray-drop", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    for (let i = 0; i < 9; i++) {
      click(ac, output, t + i * 0.055 + Math.random() * 0.02, 1800 + Math.random() * 2200, 0.028, 0.16, "triangle");
    }
    noiseBurst(ac, output, t, 0.1, 0.04, 2400, 0.9, "bandpass");
  });

  audio.define("tool-set", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 1200, 0.03, 0.2, "triangle");
    click(ac, output, t + 0.18, 760, 0.04, 0.25, "triangle");
  });

  audio.define("bullet-click", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 2200, 0.02, 0.06, "square");
    click(ac, output, t + 0.015, 900, 0.015, 0.09, "triangle");
  });

  audio.define("glue-squeeze", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    src.loop = true;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(780, t);
    bp.frequency.linearRampToValueAtTime(420, t + 1.1);
    bp.Q.value = 6;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.03, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
    src.connect(bp).connect(g).connect(output);
    src.start(t);
    src.stop(t + 1.4);
  });

  audio.define("mag-out", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    noiseBurst(ac, output, t, 0.08, 0.08, 1500, 1.3, "bandpass");
    click(ac, output, t + 0.05, 620, 0.04, 0.12, "square");
  });

  audio.define("mag-in", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    noiseBurst(ac, output, t, 0.06, 0.09, 1200, 1.1, "bandpass");
    click(ac, output, t + 0.08, 480, 0.06, 0.12, "square");
    click(ac, output, t + 0.13, 1900, 0.02, 0.08, "triangle");
  });

  audio.define("gunshot-basement", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const conv = reverb(ac, output, 0.7);
    const dry = ac.createGain();
    dry.gain.value = 0.92;
    dry.connect(output);
    dry.connect(conv);
    // crack
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    const hp = ac.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 320;
    const lp = ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(7200, t);
    lp.frequency.exponentialRampToValueAtTime(1400, t + 0.22);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.7, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.09);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    src.connect(hp).connect(lp).connect(g).connect(dry);
    src.start(t);
    src.stop(t + 0.7);
    // body
    const body = ac.createOscillator();
    body.type = "sine";
    body.frequency.setValueAtTime(95, t);
    body.frequency.exponentialRampToValueAtTime(38, t + 0.24);
    const bg = ac.createGain();
    bg.gain.setValueAtTime(0.0001, t);
    bg.gain.exponentialRampToValueAtTime(0.5, t + 0.004);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    body.connect(bg).connect(dry);
    body.start(t);
    body.stop(t + 0.5);
    // hard slap off the concrete
    click(ac, output, t + 0.018, 1250, 0.18, 0.22, "square");
    // room tail
    const tail = noise(ac, conv, 2.0, 0.12, 0.2);
    tail.gain.gain.setValueAtTime(0.12, t);
    tail.gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
  });

  audio.define("shell-drop", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    for (let i = 0; i < 3; i++) click(ac, output, t + i * 0.12, 1900 + Math.random() * 1600, 0.018, 0.25, "sine");
  });

  audio.define("cloth-rustle", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    for (let i = 0; i < 5; i++) noiseBurst(ac, output, t + i * 0.2, 0.14, 0.035, 1600, 0.7, "bandpass");
  });

  audio.define("fragment-drop", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    for (let i = 0; i < 4; i++) {
      click(ac, output, t + i * 0.08, 2200 + Math.random() * 1600, 0.012, 0.09, "triangle");
    }
  });

  audio.define("metal-door", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const o = ac.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(72, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 1.3);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    o.connect(g).connect(output);
    o.start(t);
    o.stop(t + 1.6);
    noiseBurst(ac, output, t + 0.1, 0.4, 0.06, 500, 1.0);
    click(ac, output, t + 1.35, 170, 0.09, 0.3, "sine");
  });

  audio.define("suit-boot", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    noiseBurst(ac, output, t, 0.16, 0.05, 300, 1.0);
    click(ac, output, t, 75, 0.06, 0.2, "sine");
  });

  audio.define("thruster", ({ audioContext: ac, output, offset }) => makeThruster(ac, output, 4.2, offset));

  audio.define("suit-beep", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 1400, 0.02, 0.08, "sine");
    click(ac, output, t + 0.13, 1900, 0.015, 0.09, "sine");
  });

  audio.define("radio-click", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    noiseBurst(ac, output, t, 0.05, 0.05, 1800, 0.8, "bandpass");
    click(ac, output, t + 0.01, 900, 0.02, 0.04, "square");
  });

  audio.define("scope-mount", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 700, 0.05, 0.06, "square");
    click(ac, output, t + 0.09, 1400, 0.04, 0.08, "triangle");
    noiseBurst(ac, output, t, 0.04, 0.04, 2000, 1.2, "bandpass");
  });

  audio.define("glove-release", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 420, 0.04, 0.08, "square");
    noiseBurst(ac, output, t + 0.04, 0.25, 0.025, 900, 0.9, "bandpass");
    click(ac, output, t + 0.18, 1100, 0.02, 0.1, "triangle");
  });

  audio.define("suit-kick", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    // Vacuum: no report. Only the suit-conducted thump and a metallic ring.
    const thump = ac.createOscillator();
    thump.type = "sine";
    thump.frequency.setValueAtTime(110, t);
    thump.frequency.exponentialRampToValueAtTime(44, t + 0.18);
    const tg = ac.createGain();
    tg.gain.setValueAtTime(0.0001, t);
    tg.gain.exponentialRampToValueAtTime(0.34, t + 0.004);
    tg.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    thump.connect(tg).connect(output);
    thump.start(t);
    thump.stop(t + 0.24);
    click(ac, output, t + 0.002, 2100, 0.022, 0.12, "triangle");
    noiseBurst(ac, output, t, 0.1, 0.018, 380, 1.2);
  });

  audio.define("suit-mech", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    click(ac, output, t, 1700, 0.012, 0.035, "square");
    click(ac, output, t + 0.03, 900, 0.01, 0.045, "triangle");
  });

  audio.define("radio-scream", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    // A squelch, a burst of clipped carrier, and an alarm chirp: the panic is
    // carried by the subtitles, not by synthesized speech.
    noiseBurst(ac, output, t, 0.08, 0.05, 2000, 0.7, "bandpass");
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(ac);
    src.loop = true;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(800, t);
    bp.frequency.exponentialRampToValueAtTime(3000, t + 0.25);
    bp.frequency.linearRampToValueAtTime(1500, t + 2.5);
    bp.Q.value = 1.4;
    const dist = ac.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i / 255) * 2 - 1;
      curve[i] = Math.tanh(x * 3.2);
    }
    dist.curve = curve;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.055, t + 0.06);
    g.gain.setValueAtTime(0.05, t + 1.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.1);
    src.connect(bp).connect(dist).connect(g).connect(output);
    src.start(t);
    src.stop(t + 3.2);
    click(ac, output, t + 0.1, 1880, 0.025, 0.3, "square");
    click(ac, output, t + 0.45, 1880, 0.018, 0.3, "square");
  });

  audio.define("impact-sub", ({ audioContext: ac, output }) => {
    const t = ac.currentTime;
    const sub = ac.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(58, t);
    sub.frequency.exponentialRampToValueAtTime(22, t + 1.0);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
    sub.connect(g).connect(output);
    sub.start(t);
    sub.stop(t + 1.4);
    click(ac, output, t + 0.01, 3200, 0.009, 1.6, "sine");
  });
}

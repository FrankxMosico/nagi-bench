import type { SoundCue, WebAudioCueBus } from "@agentbench/cinematic-player";
import { NOTE, Voice, type RoomSpec } from "./kit";

/**
 * Every sound effect, ambience and music cue of the film, synthesised at run
 * time. Physical rule of the space sequence: nothing outside the helmet is
 * heard through vacuum — only what travels through the suit (thumps, clicks,
 * thrusters), the suit itself (fan, breath, alarms), the radio, and score.
 */

const ROOM_BASEMENT: RoomSpec = {
  seconds: 1.5,
  decay: 0.8,
  bright: 0.85,
  early: [[0.0031, 0.55], [0.0047, 0.48], [0.0068, 0.42], [0.0093, 0.36], [0.0121, 0.32], [0.0156, 0.27], [0.0189, 0.22], [0.0238, 0.18], [0.031, 0.14], [0.042, 0.1]],
};
const ROOM_HOUSE: RoomSpec = { seconds: 0.9, decay: 0.42, bright: 0.3, early: [[0.006, 0.18], [0.011, 0.13], [0.018, 0.09]] };
const HALL_WORKSHOP: RoomSpec = { seconds: 2.8, decay: 2.0, bright: 0.55, early: [[0.021, 0.22], [0.037, 0.18], [0.058, 0.14], [0.083, 0.1]], predelay: 0.012 };
const LANE: RoomSpec = { seconds: 1.0, decay: 0.45, bright: 0.5, early: [[0.0095, 0.3], [0.019, 0.22], [0.0285, 0.15]] };
const CABIN: RoomSpec = { seconds: 0.6, decay: 0.28, bright: 0.6, early: [[0.004, 0.25], [0.007, 0.18]] };
const HELMET: RoomSpec = { seconds: 0.18, decay: 0.05, bright: 0.65, early: [[0.0009, 0.35], [0.0014, 0.22]] };
const MUSIC_HALL: RoomSpec = { seconds: 5.5, decay: 4.0, bright: 0.4, predelay: 0.025 };

type P = Record<string, number | string | boolean | undefined>;
type Body = (v: Voice, cue: SoundCue, p: P, dur: number) => void;

function h(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** FM electric-piano / bell voice. */
function fmNote(v: Voice, tau: number, f: number, peak: number, decay: number, to: AudioNode, ratio = 1.0, index = 1.6): void {
  if (v.t0 + tau < v.now - 0.05) return;
  const when = v.t0 + tau;
  const ac = v.ac;
  const amp = ac.createGain();
  amp.gain.value = 0;
  amp.connect(to);
  const car = ac.createOscillator();
  car.frequency.value = f;
  const mod = ac.createOscillator();
  mod.frequency.value = f * ratio;
  const modGain = ac.createGain();
  modGain.gain.setValueAtTime(index * f, when);
  modGain.gain.setTargetAtTime(index * f * 0.08, when, decay * 0.25);
  mod.connect(modGain).connect(car.frequency);
  car.connect(amp);
  amp.gain.setValueAtTime(0, when);
  amp.gain.linearRampToValueAtTime(peak, when + 0.006);
  amp.gain.setTargetAtTime(0, when + 0.006, decay);
  car.start(when);
  mod.start(when);
  car.stop(when + decay * 7);
  mod.stop(when + decay * 7);
}

/** A detuned, filtered saw pad note. */
function padNote(v: Voice, f: number, level: number, to: AudioNode, keys: Array<[number, number]>, cutoff: Array<[number, number]>): void {
  const g = v.gain(0, to);
  v.env(g.gain, keys.map(([t, k]) => [t, k * level]));
  const lp = v.filter("lowpass", 800, 0.4, g);
  v.env(lp.frequency, cutoff);
  for (const d of [-7, 0, 6]) {
    const o = v.osc("sawtooth", f, lp);
    o.detune.value = d;
  }
}

export function registerSounds(bus: WebAudioCueBus<unknown>): void {
  const def = (name: string, body: Body): void => {
    bus.define(name, (ctx) => {
      const dur = ctx.cue.end - ctx.cue.start;
      if (ctx.offset >= dur - 0.02) return;
      const v = new Voice(ctx);
      body(v, ctx.cue, (ctx.cue.payload as P) ?? {}, dur);
      return v.handle();
    });
  };

  /* ================================================================ AMBIENCE */

  def("amb_hutong", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [1.5, 1], [d - 1.2, 1], [d, 0]]);
    const wind = v.gain(0.16, g);
    const wl = v.filter("lowpass", 520, 0.5, wind);
    v.noise("pink", wl, 0, undefined, 2);
    const lfo = v.mod(wind.gain, 0.08);
    v.osc("sine", 0.13, lfo);
    const city = v.gain(0.22, g);
    v.noise("brown", v.filter("lowpass", 140, 0.5, city), 0, undefined, 4);
    const rev = v.reverb(LANE, 0.35, g);
    for (let k = 0; k < 6; k++) {
      const t = 0.8 + k * 1.3 + h(k) * 0.6;
      for (let j = 0; j < 3; j++) v.ping(t + j * 0.07, 3800 + h(k * 3 + j) * 1400, 0.01, 0.02, { sweepTo: 3000, to: rev });
    }
  });

  def("amb_room", (v, cue, p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.8, 1], [d - 0.6, 1], [d, 0]]);
    v.noise("brown", v.filter("lowpass", 170, 0.5, v.gain(0.07, g)), 0, undefined, 5);
    v.noise("pink", v.filter("bandpass", 650, 0.4, v.gain(0.012, g)), 0, undefined, 6);
    const rev = v.reverb(ROOM_HOUSE, 0.5, g);
    // the wall clock, locked to whole seconds of the film
    const first = Math.ceil(cue.start) - cue.start;
    for (let k = 0; first + k < d; k++) {
      const tau = first + k;
      const tock = (Math.ceil(cue.start) + k) % 2 === 0;
      v.burst(tau, { freq: tock ? 2500 : 3300, q: 5, peak: 0.022, decay: 0.006, to: rev });
      v.burst(tau, { freq: tock ? 2500 : 3300, q: 5, peak: 0.014, decay: 0.006 , to: g });
    }
    if (p.morning) {
      for (let k = 0; k < 10; k++) {
        const t = 0.6 + k * 1.5 + h(k + 50) * 0.8;
        for (let j = 0; j < 4; j++) v.ping(t + j * 0.09, 4200 + h(k * 7 + j) * 1600, 0.006, 0.025, { sweepTo: 3600, to: g });
      }
    }
  });

  def("amb_workshop", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [1.0, 1], [d - 0.8, 1], [d, 0]]);
    v.noise("brown", v.filter("lowpass", 90, 0.5, v.gain(0.13, g)), 0, undefined, 7);
    v.noise("pink", v.filter("bandpass", 300, 0.5, v.gain(0.02, g)), 0, undefined, 8);
    v.osc("sine", 50, v.gain(0.008, g));
    v.osc("sine", 150, v.gain(0.003, g));
    const rev = v.reverb(HALL_WORKSHOP, 0.8, g);
    for (const t of [2.3, 7.9, 15.2]) v.ping(t, 700 + h(t) * 300, 0.01, 0.06, { to: rev });
  });

  def("fluoro_hum", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.3, 1], [d - 0.05, 1], [d, 0]]);
    v.osc("square", 100, v.filter("lowpass", 1400, 0.6, v.gain(0.0035, g)));
    v.osc("sine", 200, v.gain(0.002, g));
  });

  def("amb_basement", (v, _c, p, d) => {
    const muffled = Boolean(p.muffled);
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.4, muffled ? 0.5 : 1], [d - 0.4, muffled ? 0.5 : 1], [d, 0]]);
    const bus = muffled ? v.filter("lowpass", 280, 0.6, g) : g;
    v.noise("brown", v.filter("lowpass", 85, 0.5, v.gain(0.1, bus)), 0, undefined, 9);
    v.osc("sawtooth", 100, v.filter("bandpass", 2400, 3, v.gain(0.0022, bus)));
    const rev = v.reverb(ROOM_BASEMENT, 0.4, bus);
    for (let k = 0; k * 2.7 < d; k++) v.ping(0.9 + k * 2.7 + h(k) * 0.5, 2100, 0.02, 0.03, { sweepTo: 1300, sweepTime: 0.05, to: rev });
  });

  def("amb_station", (v, _c, p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.6, 1], [d - 0.5, 1], [d, 0]]);
    const bus = p.helmet ? v.filter("lowpass", 900, 0.5, v.gain(0.5, g)) : g;
    v.noise("pink", v.filter("bandpass", 420, 0.5, v.gain(0.035, bus)), 0, undefined, 10);
    v.noise("brown", v.filter("lowpass", 120, 0.5, v.gain(0.05, bus)), 0, undefined, 11);
    const pump = v.gain(0.012, bus);
    v.osc("sine", 58, pump);
    const am = v.mod(pump.gain, 0.01);
    v.osc("sine", 0.7, am);
    v.osc("sine", 7200, v.gain(0.0012, bus));
  });

  def("suit_bed", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.4, 1], [d - 0.3, 1], [d, 0]]);
    v.noise("pink", v.filter("bandpass", 1100, 0.6, v.gain(0.011, g)), 0, undefined, 12);
    v.noise("brown", v.filter("lowpass", 200, 0.5, v.gain(0.028, g)), 0, undefined, 13);
    const pump = v.gain(0.004, g);
    v.osc("sine", 120, pump);
    const am = v.mod(pump.gain, 0.003);
    v.osc("sine", 0.25, am);
  });

  /** Breathing inside the helmet: pink noise through two formant bands. */
  def("breath", (v, _c, p, d) => {
    const style = String(p.style ?? "calm");
    const amp = Number(p.amp ?? 1);
    const out = v.gain(amp);
    const room = v.reverb(HELMET, 0.25, out);
    const inG = v.gain(0, out);
    const exG = v.gain(0, out);
    inG.connect(room);
    exG.connect(room);
    v.noise("pink", v.filter("bandpass", 1500, 0.6, inG), 0, undefined, 14);
    const ex = v.filter("bandpass", 640, 0.8, exG);
    v.noise("pink", ex, 0, undefined, 15);
    v.noise("brown", v.filter("lowpass", 320, 0.6, exG), 0, undefined, 16);
    const inK: Array<[number, number]> = [[0, 0]];
    const exK: Array<[number, number]> = [[0, 0]];
    const cycle = (t: number, inhale: number, exhale: number, gap: number, a: number) => {
      inK.push([t, 0], [t + inhale * 0.35, 0.05 * a], [t + inhale, 0.0]);
      const e = t + inhale + gap;
      exK.push([e, 0], [e + 0.18, 0.075 * a], [e + exhale, 0]);
      return e + exhale;
    };
    let t = 0.1;
    if (style === "hold") {
      t = cycle(t, 1.6, 0.0001, 0.05, 1.25);
    } else if (style === "release") {
      exK.push([0.05, 0], [0.4, 0.09], [2.8, 0]);
    } else {
      const per = style === "tense" ? [1.0, 1.25, 0.15, 0.6] : style === "shallow" ? [0.8, 1.0, 0.1, 0.55] : [1.5, 2.1, 0.2, 0.9];
      const a = style === "shallow" ? 0.55 : style === "tense" ? 1.1 : 0.85;
      while (t < d - 1) {
        t = cycle(t, per[0]!, per[1]!, per[2]!, a * (0.9 + h(t) * 0.2)) + per[3]!;
      }
    }
    v.env(inG.gain, inK.sort((x, y) => x[0] - y[0]));
    v.env(exG.gain, exK.sort((x, y) => x[0] - y[0]));
  });

  /* ================================================================ HUTONG */

  def("pigeon_whistle", (v, _c, p, d) => {
    // heard through the window: walls take the top off
    const g = p.muffled ? v.gain(0, v.filter("lowpass", 1400, 0.5, v.out)) : v.gain(0);
    const peakAt = Number(p.peak ?? 0.45) * d;
    v.env(g.gain, [[0, 0], [peakAt, 1], [d, 0]]);
    const pan = v.panner(-0.7, g);
    v.env(pan.pan, [[0, -0.8], [d, 0.8]]);
    const rev = v.reverb(LANE, 0.25, pan);
    const freqs = [523, 784, 1047, 1397, 1760];
    freqs.forEach((f, k) => {
      const pg = v.gain(0.009 / (1 + k * 0.3), pan);
      pg.connect(rev);
      const o = v.osc("sine", f, pg);
      v.env(o.frequency, [[0, f * 1.022], [d, f * 0.982]]);
      const vib = v.mod(o.frequency, f * 0.004);
      v.osc("sine", 5.2 + k * 0.4, vib);
      v.noise("white", v.filter("bandpass", f, 28, v.gain(0.45, pg)), 0, undefined, 20 + k);
    });
  });

  def("footsteps", (v, _c, p, d) => {
    const interval = Number(p.interval ?? 0.42);
    const surface = String(p.surface ?? "stone");
    const room = surface === "concrete" ? HALL_WORKSHOP : surface === "lane" ? LANE : ROOM_HOUSE;
    const rev = v.reverb(room, surface === "concrete" ? 0.6 : 0.3);
    const level = Number(p.level ?? 1);
    for (let k = 0; k * interval < d - 0.1; k++) {
      const t = 0.02 + k * interval + (h(k) - 0.5) * 0.03;
      const a = level * (0.85 + h(k + 9) * 0.3);
      v.burst(t, { freq: surface === "concrete" ? 1600 : 1100, q: 0.9, peak: 0.09 * a, decay: 0.02, seed: k + 3 });
      v.burst(t, { freq: 1300, q: 0.9, peak: 0.05 * a, decay: 0.02, to: rev, seed: k + 5 });
      v.ping(t, 88, 0.12 * a, 0.03);
    }
  });

  def("bike_bell", (v) => {
    const g = v.panner(-0.6, v.filter("lowpass", 5200, 0.7, v.gain(0.6)));
    const rev = v.reverb(LANE, 0.5, v.gain(1));
    for (const t of [0, 0.22]) {
      for (const [f, a, dcy] of [[2093, 0.02, 0.5], [3140, 0.012, 0.35], [4250, 0.008, 0.25], [5600, 0.005, 0.18]] as const) {
        v.ping(t, f, a, dcy, { to: g });
        v.ping(t, f, a * 0.6, dcy, { to: rev });
      }
    }
  });

  def("gate_creak", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.12, 0.05], [0.8, 0.035], [1.15, 0]]);
    const stick = v.gain(0.6, g);
    const lfoG = v.mod(stick.gain, 0.5);
    v.osc("square", 34, lfoG);
    const b1 = v.filter("bandpass", 900, 5, stick);
    const b2 = v.filter("bandpass", 1750, 7, stick);
    const o = v.osc("sawtooth", 118, b1, 0, 1.2);
    o.connect(b2);
    v.env(o.frequency, [[0, 112], [0.4, 128], [0.8, 104], [1.2, 120]]);
    const rev = v.reverb(LANE, 0.4);
    v.ping(1.25, 140, 0.1, 0.06, { to: rev });
    v.burst(1.25, { type: "lowpass", freq: 600, peak: 0.07, decay: 0.03 });
  });

  /* ================================================================ COLLECTOR */

  def("tea_pour", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.08, 0.06], [1.8, 0.055], [2.0, 0]]);
    const glug = v.gain(0.75, g);
    const lfo = v.mod(glug.gain, 0.25);
    v.osc("sawtooth", 11, lfo);
    const bp = v.filter("bandpass", 420, 5, glug);
    v.env(bp.frequency, [[0, 420], [2.0, 1350]], true);
    v.noise("pink", bp, 0, 2.05, 30);
    for (let k = 0; k < 9; k++) v.ping(0.2 + h(k) * 1.6, 600 + h(k + 3) * 500, 0.008, 0.012, { to: g });
    v.reverb(ROOM_HOUSE, 0.3, g);
  });

  def("porcelain", (v, _c, p) => {
    const a = Number(p.level ?? 1);
    const rev = v.reverb(ROOM_HOUSE, 0.35);
    for (const [f, peak, dcy] of [[2950, 0.04, 0.12], [4380, 0.025, 0.08], [6120, 0.014, 0.05]] as const) {
      v.ping(0, f, peak * a, dcy);
      v.ping(0, f, peak * a * 0.5, dcy, { to: rev });
    }
    v.ping(0, 190, 0.05 * a, 0.015);
  });

  def("chair_creak", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.06, 0.03], [0.35, 0.02], [0.45, 0]]);
    const stick = v.gain(0.7, g);
    v.osc("square", 26, v.mod(stick.gain, 0.5));
    v.osc("sawtooth", 92, v.filter("bandpass", 1100, 6, stick), 0, 0.5);
    v.burst(0.42, { type: "lowpass", freq: 500, peak: 0.05, decay: 0.03 });
  });

  def("glass_slide", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.1, 0.028], [0.45, 0.022], [0.55, 0]]);
    v.noise("white", v.filter("bandpass", 2600, 2, g), 0, 0.6, 31);
    v.ping(0.55, 3600, 0.018, 0.15);
    v.reverb(ROOM_HOUSE, 0.3, g);
  });

  def("stone_set", (v, _c, p) => {
    const a = Number(p.level ?? 1);
    const rev = v.reverb(ROOM_HOUSE, 0.3);
    v.ping(0, 118, 0.12 * a, 0.04, { sweepTo: 72, sweepTime: 0.06 });
    v.burst(0, { type: "lowpass", freq: 700, peak: 0.08 * a, decay: 0.015 });
    v.burst(0, { type: "lowpass", freq: 900, peak: 0.04 * a, decay: 0.015, to: rev });
  });

  def("phone_taps", (v, _c, p, d) => {
    const n = Number(p.count ?? 8);
    for (let k = 0; k < n; k++) v.burst((k / n) * (d - 0.1) + h(k) * 0.05, { freq: 4200, q: 2, peak: 0.016, decay: 0.004, seed: k });
  });

  def("pay_chime", (v) => {
    const spk = v.filter("bandpass", 2000, 0.5, v.gain(1));
    v.ping(0, 1568, 0.035, 0.12, { to: spk });
    v.ping(0.09, 2093, 0.035, 0.25, { to: spk });
  });

  def("lens_set", (v) => {
    const rev = v.reverb(ROOM_HOUSE, 0.3);
    v.ping(0, 2200, 0.03, 0.02);
    v.burst(0, { freq: 3000, peak: 0.03, decay: 0.004, to: rev });
  });

  /* ================================================================ WORKSHOP */

  def("phone_ring", (v) => {
    const spk = v.filter("bandpass", 2100, 0.6, v.gain(1));
    const rev = v.reverb(HALL_WORKSHOP, 0.3, v.gain(1));
    const notes = [NOTE.E5!, NOTE["G#5"]!, NOTE.B5!, NOTE.E6!];
    for (const base of [0, 0.5]) notes.forEach((f, k) => {
      fmNote(v, base + k * 0.1, f, 0.03, 0.12, spk, 4, 1.2);
      fmNote(v, base + k * 0.1, f, 0.015, 0.12, rev, 4, 1.2);
    });
  });

  def("click", (v, _c, p) => {
    const room = String(p.room ?? "hall");
    const rev = v.reverb(room === "house" ? ROOM_HOUSE : room === "basement" ? ROOM_BASEMENT : HALL_WORKSHOP, 0.35);
    v.burst(0, { freq: Number(p.freq ?? 2200), q: 2, peak: Number(p.level ?? 0.06), decay: 0.004 });
    v.burst(0, { freq: Number(p.freq ?? 2200), q: 2, peak: Number(p.level ?? 0.06) * 0.6, decay: 0.004, to: rev });
    v.ping(0.002, 4500, 0.015, 0.01);
  });

  def("fluoro_on", (v) => {
    for (const t of [0, 0.12, 0.31]) v.ping(t, 3000, 0.02, 0.01);
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.05, 0.03], [0.1, 0], [0.18, 0.03], [0.22, 0.004], [0.3, 0.03], [0.8, 0.012]]);
    v.osc("square", 100, v.filter("bandpass", 900, 0.7, g), 0, 0.85);
  });

  def("clamp", (v) => {
    const rev = v.reverb(HALL_WORKSHOP, 0.35);
    v.ping(0, 420, 0.07, 0.06);
    v.ping(0, 1260, 0.04, 0.05, { to: rev });
    v.burst(0, { freq: 1800, peak: 0.06, decay: 0.01 });
    for (let k = 0; k < 6; k++) v.burst(0.2 + k * 0.1, { freq: 3500, q: 3, peak: 0.03, decay: 0.004, seed: k });
  });

  def("machine_door", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.05, 0.03], [0.35, 0.025], [0.42, 0]]);
    v.noise("white", v.filter("bandpass", 1200, 1, g), 0, 0.45, 40);
    v.burst(0.42, { freq: 2600, q: 2, peak: 0.05, decay: 0.006 });
    v.ping(0.42, 600, 0.03, 0.03);
  });

  def("beep", (v, _c, p) => {
    const g = v.gain(0);
    const f = Number(p.freq ?? 1760);
    const len = Number(p.len ?? 0.12);
    v.env(g.gain, [[0, 0], [0.005, Number(p.level ?? 0.02)], [len, Number(p.level ?? 0.02)], [len + 0.01, 0]]);
    v.osc("square", f, v.filter("bandpass", f, 1.5, g), 0, len + 0.05);
  });

  def("lathe_motor", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.9, 0.05], [d - 0.6, 0.05], [d, 0]]);
    const saw = v.osc("sawtooth", 30, v.filter("lowpass", 700, 0.7, g));
    v.env(saw.frequency, [[0, 4], [0.9, 30], [d - 0.6, 30], [d, 5]]);
    const whine = v.osc("sine", 720, v.gain(0.22, g));
    v.env(whine.frequency, [[0, 90], [0.9, 720], [d - 0.6, 720], [d, 110]]);
    v.osc("sine", 100, v.gain(0.3, g));
    v.osc("square", 760, v.filter("bandpass", 760, 4, v.gain(0.06, g)));
    v.reverb(HALL_WORKSHOP, 0.25, g);
  });

  def("lathe_cut", (v, _c, _p, d) => {
    const g = v.gain(0);
    const keys: Array<[number, number]> = [[0, 0]];
    for (let t = 0.1; t < d - 0.4; t += 1.25) keys.push([t, 0], [t + 0.08, 0.055], [t + 0.9, 0.05], [t + 1.0, 0]);
    v.env(g.gain, keys);
    const am = v.mod(g.gain, 0.022);
    v.osc("sine", 30, am);
    v.noise("white", v.filter("bandpass", 3300, 14, v.gain(0.9, g)), 0, undefined, 41);
    v.noise("white", v.filter("bandpass", 5200, 18, v.gain(0.7, g)), 0, undefined, 42);
    for (const f of [2730, 4170]) {
      const o = v.osc("sine", f, v.gain(0.1, g));
      v.osc("sine", 6.5, v.mod(o.frequency, f * 0.004));
    }
    v.reverb(HALL_WORKSHOP, 0.35, g);
  });

  def("coolant", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.3, 0.012], [d - 0.3, 0.012], [d, 0]]);
    v.noise("white", v.filter("highpass", 4000, 0.7, g), 0, undefined, 43);
  });

  def("clinks", (v, _c, p, d) => {
    const n = Number(p.count ?? 12);
    const rev = v.reverb(HALL_WORKSHOP, 0.25);
    for (let k = 0; k < n; k++) {
      const t = (k / n) * (d - 0.3) + h(k) * 0.08;
      for (const [f, a, dc] of [[4300, 0.03, 0.03], [6900, 0.02, 0.02], [9200, 0.01, 0.012]] as const) v.ping(t, f * (0.97 + h(k + 2) * 0.06), a, dc);
      v.ping(t, 1150, 0.015, 0.12, { to: rev });
    }
  });

  def("brush", (v, _c, _p, d) => {
    for (let t = 0.05; t < d - 0.1; t += 0.24) v.burst(t, { freq: 4500, q: 0.8, peak: 0.03, decay: 0.06, attack: 0.03, seed: Math.round(t * 10) });
  });

  def("ratchet_clunk", (v) => {
    const rev = v.reverb(HALL_WORKSHOP, 0.35);
    for (let k = 0; k < 5; k++) v.burst(k * 0.1, { freq: 2800, q: 3, peak: 0.04, decay: 0.004, seed: k + 7 });
    v.ping(0.65, 300, 0.07, 0.08, { to: rev });
    v.ping(0.65, 880, 0.04, 0.06);
  });

  /* ================================================================ BASEMENT */

  def("chain_pull", (v) => {
    const rev = v.reverb(ROOM_BASEMENT, 0.3);
    for (let k = 0; k < 4; k++) v.burst(k * 0.04, { freq: 5000, q: 2, peak: 0.02, decay: 0.003, seed: k });
    v.burst(0.18, { freq: 2200, q: 2, peak: 0.06, decay: 0.004, to: rev });
    v.ping(0.2, 6000, 0.004, 0.05);
  });

  def("pliers", (v) => {
    v.ping(0, 2400, 0.012, 0.03, { sweepTo: 3100, sweepTime: 0.04 });
    v.burst(0.05, { type: "lowpass", freq: 1500, peak: 0.06, decay: 0.008 });
    v.burst(0.06, { freq: 4200, q: 2, peak: 0.03, decay: 0.003 });
  });

  def("glue", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.08, 0.025], [0.35, 0.02], [0.45, 0]]);
    const bp = v.filter("bandpass", 300, 6, g);
    v.env(bp.frequency, [[0, 300], [0.45, 900]], true);
    v.noise("pink", bp, 0, 0.5, 50);
  });

  def("tip_press", (v, _c, _p, d) => {
    for (let k = 0; k < 6; k++) v.burst((k / 6) * (d - 0.05), { freq: 6000, q: 2, peak: 0.015, decay: 0.003, seed: k });
  });

  def("mag_load", (v, _c, p) => {
    const n = Number(p.n ?? 0);
    const rev = v.reverb(ROOM_BASEMENT, 0.2);
    v.burst(0, { freq: 2800, q: 3, peak: 0.07, decay: 0.008 });
    v.ping(0, 1500 + n * 80, 0.03, 0.03, { to: rev });
  });

  def("mag_insert", (v) => {
    const rev = v.reverb(ROOM_BASEMENT, 0.3);
    v.burst(0, { freq: 1100, q: 1, peak: 0.1, decay: 0.018, to: rev });
    v.burst(0, { freq: 1100, q: 1, peak: 0.1, decay: 0.018 });
    v.ping(0, 420, 0.06, 0.025);
    v.burst(0.06, { freq: 3600, q: 2, peak: 0.06, decay: 0.004 });
  });

  def("slide_rack", (v) => {
    const rev = v.reverb(ROOM_BASEMENT, 0.3);
    v.burst(0, { freq: 3200, q: 1.5, peak: 0.05, decay: 0.03, attack: 0.02 });
    v.burst(0.06, { freq: 3800, q: 2, peak: 0.05, decay: 0.004 });
    v.burst(0.16, { freq: 1500, q: 1, peak: 0.12, decay: 0.012, to: rev });
    v.burst(0.16, { freq: 1500, q: 1, peak: 0.1, decay: 0.012 });
    v.ping(0.16, 620, 0.06, 0.025);
  });

  /** A pistol in a small concrete room: blast, body, mechanism, hard reflections. */
  def("gunshot_room", (v) => {
    const ac = v.ac;
    const bus = ac.createGain();
    bus.gain.value = 1;
    const clip = v.shaper(2.2, v.gain(0.85));
    bus.connect(clip);
    const conv = v.reverb(ROOM_BASEMENT, 1.0);
    bus.connect(conv);
    v.burst(0, { type: "lowpass", freq: 9000, peak: 0.9, decay: 0.028, attack: 0.0005, to: bus, seed: 61 });
    v.burst(0, { type: "highpass", freq: 2500, peak: 0.55, decay: 0.006, attack: 0.0003, to: bus, seed: 62 });
    v.ping(0, 150, 0.8, 0.07, { to: bus, sweepTo: 50, sweepTime: 0.12, attack: 0.001 });
    v.ping(0, 48, 0.5, 0.14, { to: bus, attack: 0.002 });
    v.burst(0.035, { freq: 3000, q: 3, peak: 0.12, decay: 0.012, to: bus, seed: 63 });
  });

  def("tinnitus", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.08, 0.03], [d * 0.55, 0.026], [d, 0]]);
    v.osc("sine", 6800, g);
    v.osc("sine", 7060, v.gain(0.7, g));
  });

  def("cloth", (v, _c, _p, d) => {
    const n = Math.floor(d * 14);
    for (let k = 0; k < n; k++) v.burst(h(k) * (d - 0.1), { freq: 3000 + h(k + 4) * 2000, q: 0.7, peak: 0.02 + h(k + 8) * 0.02, decay: 0.03, attack: 0.01, seed: k });
  });

  def("knife_meat", (v, _c, _p, d) => {
    for (let t = 0.05; t < d - 0.3; t += 0.55) {
      const g = v.gain(0);
      const tt = t;
      v.env(g.gain, [[0, 0], [tt, 0], [tt + 0.08, 0.04], [tt + 0.35, 0]]);
      const bp = v.filter("bandpass", 280, 7, g);
      v.env(bp.frequency, [[0, 280], [tt, 280], [tt + 0.35, 800]], true);
      v.noise("pink", bp, tt, tt + 0.4, Math.round(t * 10) + 70);
      v.burst(tt + 0.2, { freq: 5000, q: 2, peak: 0.01, decay: 0.01 });
    }
  });

  def("grit", (v, _c, _p, d) => {
    for (let k = 0; k < 24; k++) v.burst(h(k) * (d - 0.05), { freq: 5500, q: 2, peak: 0.02 + h(k + 1) * 0.02, decay: 0.002, seed: k });
  });

  def("case_latch", (v) => {
    const rev = v.reverb(ROOM_BASEMENT, 0.2);
    v.burst(0, { freq: 3000, q: 2, peak: 0.06, decay: 0.004, to: rev });
    v.burst(0.18, { freq: 3000, q: 2, peak: 0.06, decay: 0.004 });
    v.ping(0.25, 160, 0.05, 0.03);
  });

  def("rounds_clink", (v, _c, _p, d) => {
    for (let k = 0; k < 10; k++) {
      const t = (k / 10) * (d - 0.1) + h(k) * 0.1;
      v.ping(t, 3800, 0.012, 0.02);
      v.ping(t, 5600, 0.008, 0.015);
    }
  });

  /* ================================================================ BASE ONE */

  def("velcro", (v) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.03, 0.05], [0.3, 0.035], [0.35, 0]]);
    const am = v.gain(0.6, g);
    v.osc("square", 180, v.mod(am.gain, 0.5));
    v.noise("white", v.filter("bandpass", 2500, 0.8, am), 0, 0.4, 80);
    v.reverb(CABIN, 0.3, g);
  });

  def("strap_click", (v) => {
    v.burst(0, { freq: 2400, q: 2, peak: 0.05, decay: 0.005 });
    v.ping(0, 900, 0.03, 0.02);
  });

  def("helmet_seal", (v) => {
    v.ping(0, 210, 0.09, 0.05);
    v.burst(0, { type: "lowpass", freq: 900, peak: 0.06, decay: 0.02 });
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.08, 0], [0.14, 0.04], [0.6, 0.01], [0.8, 0]]);
    v.noise("white", v.filter("highpass", 2500, 0.7, g), 0, 0.85, 81);
    v.ping(0.82, 90, 0.03, 0.03);
  });

  def("beacon_beeps", (v, _c, _p, d) => {
    // the airlock's own alarm: it lives in the air, so it dies with the air
    const g = v.gain(0);
    v.env(g.gain, [[0, 0.03], [d * 0.35, 0.02], [d * 0.8, 0.004], [d, 0]]);
    const lp = v.filter("lowpass", 2200, 0.7, g);
    for (let t = 0; t < d; t += 0.8) {
      const bg = v.gain(0, lp);
      v.env(bg.gain, [[0, 0], [t, 0], [t + 0.01, 1], [t + 0.2, 1], [t + 0.21, 0]]);
      v.osc("square", 950, bg, t, t + 0.25);
    }
  });

  def("depress_hiss", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.15, 0.09], [d * 0.35, 0.05], [d * 0.8, 0.012], [d, 0]]);
    const lp = v.filter("lowpass", 12000, 0.7, g);
    v.env(lp.frequency, [[0, 12000], [d, 350]], true);
    v.noise("white", v.filter("highpass", 1200, 0.7, lp), 0, undefined, 82);
    const pump = v.gain(0, g);
    v.env(pump.gain, [[0, 0.5], [d, 0]]);
    v.osc("sine", 55, pump);
    v.osc("sine", 4, v.mod(pump.gain, 0.4));
  });

  def("hud_chime", (v, _c, p) => {
    const spk = v.filter("bandpass", 2200, 0.8, v.gain(1));
    const up = Boolean(p.up ?? true);
    v.ping(0, up ? NOTE.E6! : NOTE.A6!, 0.02, 0.12, { to: spk });
    v.ping(0.12, up ? NOTE.A6! : NOTE.E6!, 0.02, 0.18, { to: spk });
  });

  def("conducted_rumble", (v, _c, p, d) => {
    const g = v.gain(0);
    const peak = Number(p.level ?? 0.12);
    v.env(g.gain, [[0, 0], [0.1, peak], [d - 0.25, peak * 0.8], [d, 0]]);
    v.noise("brown", v.filter("lowpass", 160, 0.7, g), 0, undefined, 83);
    v.ping(0, 75, 0.15, 0.06);
    v.ping(d - 0.3, 75, 0.06, 0.05);
  });

  def("thruster", (v, _c, p, d) => {
    const lvl = Number(p.level ?? 0.08);
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.08, lvl], [Math.max(0.1, d - 0.15), lvl * 0.9], [d, 0]]);
    v.noise("brown", v.filter("lowpass", 220, 0.7, g), 0, undefined, 84);
    v.noise("white", v.filter("bandpass", 3000, 0.8, v.gain(0.07, g)), 0, undefined, 85);
    v.osc("sine", 7, v.mod(g.gain, lvl * 0.25));
    v.burst(0, { type: "lowpass", freq: 1500, peak: 0.03, decay: 0.01 });
    v.burst(Math.max(0, d - 0.12), { type: "lowpass", freq: 1500, peak: 0.025, decay: 0.01 });
  });

  /* ================================================================ RADIO */

  const radioBed = (v: Voice, d: number, level: number, band: [number, number], squelch: boolean, roger: boolean) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.05, level], [d - 0.08, level], [d, 0]]);
    const crackle = v.gain(0.7, g);
    v.noise("white", v.filter("lowpass", 18, 0.5, v.mod(crackle.gain, 0.6)), 0, undefined, 86);
    const hp = v.filter("highpass", band[0], 0.7, crackle);
    v.noise("white", v.filter("lowpass", band[1], 0.7, hp), 0, undefined, 87);
    if (squelch) {
      v.burst(0, { freq: 1500, q: 0.8, peak: level * 4, decay: 0.05 });
      v.burst(Math.max(0, d - 0.12), { freq: 1500, q: 0.8, peak: level * 5, decay: 0.08 });
    }
    if (roger) {
      v.ping(d - 0.02, 1200, level * 1.4, 0.04, { type: "square" });
      v.ping(d + 0.05, 900, level * 1.2, 0.04, { type: "square" });
    }
  };
  def("radio_bed", (v, _c, _p, d) => radioBed(v, d, 0.016, [380, 3000], true, true));
  def("chatter_bed", (v, _c, _p, d) => radioBed(v, d, 0.009, [500, 2400], true, false));
  def("phone_bed", (v, _c, _p, d) => {
    radioBed(v, d, 0.006, [300, 3400], false, false);
    v.osc("sine", 50, v.gain(0.004));
    v.burst(0, { freq: 2500, q: 2, peak: 0.02, decay: 0.004 });
  });
  def("broadcast_bed", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.2, 0.012], [d - 0.2, 0.012], [d, 0]]);
    const fade = v.gain(0.8, g);
    v.osc("sine", 0.3, v.mod(fade.gain, 0.25));
    v.noise("pink", v.filter("bandpass", 1500, 0.5, fade), 0, undefined, 88);
    v.osc("sine", 2500, v.gain(0.12, fade));
  });

  def("radio_alarm", (v, _c, _p, d) => {
    const g = v.gain(0);
    v.env(g.gain, [[0, 0], [0.05, 0.03], [d - 0.2, 0.03], [d, 0]]);
    const shape = v.shaper(3, v.filter("bandpass", 1200, 0.8, g));
    const o = v.osc("square", 880, shape);
    for (let t = 0, k = 0; t < d; t += 0.25, k++) {
      const when = v.t0 + t;
      if (when >= v.now) o.frequency.setValueAtTime(k % 2 === 0 ? 880 : 660, when);
    }
    radioBed(v, d, 0.01, [380, 3000], false, false);
  });

  def("radio_off", (v) => {
    v.burst(0, { freq: 2000, q: 2, peak: 0.04, decay: 0.003 });
    v.burst(0.01, { freq: 1500, q: 0.8, peak: 0.03, decay: 0.05 });
  });

  /* ================================================================ SUIT */

  def("hud_alarm", (v, _c, p, d) => {
    const spk = v.filter("bandpass", 2600, 2, v.gain(1));
    let t = p.quiet ? 1.5 : 0.05;
    while (t < d - 0.3) {
      const early = !p.quiet && t < 3;
      const lvl = early ? 0.022 : 0.009;
      for (const dt of early ? [0, 0.18] : [0]) {
        const bg = v.gain(0, spk);
        const s = t + dt;
        v.env(bg.gain, [[0, 0], [s, 0], [s + 0.005, lvl], [s + 0.08, lvl], [s + 0.09, 0]]);
        v.osc("square", 2600, bg, s, s + 0.12);
      }
      t += early ? 1.0 : 4.0;
    }
  });

  def("glove_ring", (v) => {
    const lp = v.filter("lowpass", 1800, 0.7, v.gain(1));
    for (let k = 0; k < 6; k++) v.burst(k * 0.13, { freq: 1600, q: 2, peak: 0.05, decay: 0.006, to: lp, seed: k });
    v.ping(0.9, 160, 0.06, 0.04);
    v.burst(1.0, { freq: 3000, q: 0.8, peak: 0.02, decay: 0.15 });
  });

  def("pocket", (v) => {
    const lp = v.filter("lowpass", 1500, 0.7, v.gain(1));
    const g = v.gain(0, lp);
    v.env(g.gain, [[0, 0], [0.03, 0.04], [0.22, 0.03], [0.26, 0]]);
    const am = v.gain(0.6, g);
    v.osc("square", 150, v.mod(am.gain, 0.5));
    v.noise("white", v.filter("bandpass", 2000, 0.8, am), 0, 0.3, 90);
  });

  def("magnet", (v) => {
    v.ping(0, 140, 0.12, 0.03, { sweepTo: 90, sweepTime: 0.05 });
    v.burst(0, { type: "lowpass", freq: 800, peak: 0.06, decay: 0.01 });
  });

  /** Ten rounds fired in vacuum: no report, only the recoil coming up the arm. */
  def("gun_vac", (v, _c, p) => {
    const n = Number(p.count ?? 10);
    const step = Number(p.step ?? 0.135);
    for (let k = 0; k < n; k++) {
      const t = k * step;
      v.ping(t, 72, 0.16, 0.045, { sweepTo: 44, sweepTime: 0.06 });
      v.burst(t, { type: "lowpass", freq: 320, peak: 0.08, decay: 0.02, seed: k });
      v.ping(t, 1200, 0.006, 0.01);
    }
  });

  def("mag_vac", (v) => {
    v.burst(0, { type: "lowpass", freq: 1200, peak: 0.04, decay: 0.01 });
    v.ping(0, 300, 0.03, 0.02);
  });

  def("heartbeat", (v, _c, p, d) => {
    const lp = v.filter("lowpass", 160, 0.7, v.gain(1));
    const bpm = Number(p.bpm ?? 54);
    const per = 60 / bpm;
    for (let t = 0.1; t < d - 0.3; t += per) {
      v.ping(t, 58, 0.16, 0.07, { to: lp });
      v.ping(t + 0.26, 50, 0.12, 0.08, { to: lp });
    }
  });

  def("glove_on", (v) => {
    v.ping(0, 180, 0.08, 0.04);
    v.burst(0.05, { freq: 3000, q: 0.8, peak: 0.03, decay: 0.2 });
    const spk = v.filter("bandpass", 2200, 0.8, v.gain(1));
    v.ping(0.45, NOTE.A6!, 0.014, 0.1, { to: spk });
    v.ping(0.55, NOTE.D7!, 0.014, 0.18, { to: spk });
  });

  /* ================================================================ EPILOGUE */

  def("news_jingle", (v) => {
    const radio = v.shaper(1.6, v.filter("bandpass", 1800, 0.5, v.gain(1)));
    [NOTE.G5!, NOTE.C6!, NOTE.E6!, NOTE.G6!].forEach((f, k) => fmNote(v, k * 0.14, f, 0.03, 0.16, radio, 3.5, 1.4));
    v.noise("pink", v.filter("bandpass", 1500, 0.5, v.gain(0.01)), 0, 0.8, 91);
  });

  /* ================================================================ SCORE */

  def("mus_open", (v, _c, _p, d) => {
    const out = v.gain(1);
    const hall = v.reverb(MUSIC_HALL, 0.7, out);
    const drone = v.gain(0, out);
    v.env(drone.gain, [[0, 0], [4, 1], [d - 1.5, 1], [d, 0]]);
    drone.connect(hall);
    v.osc("sine", NOTE.D2!, v.gain(0.05, drone));
    v.osc("sawtooth", NOTE.A2!, v.filter("lowpass", 300, 0.5, v.gain(0.012, drone)));
    v.noise("pink", v.filter("bandpass", 2000, 0.4, v.gain(0.004, drone)), 0, undefined, 92);
    const pn = v.gain(0.9, out);
    pn.connect(hall);
    fmNote(v, 9.0, NOTE.D4!, 0.05, 1.6, pn);
    fmNote(v, 9.9, NOTE.A3!, 0.045, 1.6, pn);
    fmNote(v, 10.8, NOTE.F4!, 0.05, 2.4, pn);
  });

  def("mus_irony", (v, _c, _p, d) => {
    const out = v.gain(1);
    const hall = v.reverb(MUSIC_HALL, 0.6, out);
    const low = v.gain(0, out);
    low.connect(hall);
    v.env(low.gain, [[0, 0], [2.2, 0.05], [d - 1.0, 0.04], [d, 0]]);
    v.osc("sawtooth", NOTE.D2!, v.filter("lowpass", 380, 0.6, low));
    const hi = v.gain(0, hall);
    v.env(hi.gain, [[0, 0], [1.5, 0.006], [d, 0]]);
    v.osc("sine", NOTE.A5!, hi);
    const tense = v.gain(0, hall);
    v.env(tense.gain, [[0, 0], [2.6, 0], [3.6, 0.004], [d, 0]]);
    v.osc("sine", NOTE["G#5"]!, tense);
  });

  def("mus_low", (v, _c, _p, d) => {
    const out = v.gain(0);
    v.env(out.gain, [[0, 0], [2.5, 1], [d - 0.3, 1], [d, 0]]);
    const hall = v.reverb(MUSIC_HALL, 0.5, out);
    const d2 = v.gain(0.03, out);
    d2.connect(hall);
    v.osc("sine", NOTE.D2!, d2);
    v.osc("sine", NOTE.F2!, v.gain(0.02, out));
  });

  def("mus_reveal", (v, _c, _p, d) => {
    const out = v.gain(1);
    const hall = v.reverb(MUSIC_HALL, 0.6, out);
    const bus = v.gain(1, out);
    bus.connect(hall);
    for (const n of ["D3", "A3", "E4", "F4"]) {
      padNote(v, NOTE[n]!, 0.012, bus, [[0, 0], [3.0, 1], [d - 2.0, 0.9], [d, 0]], [[0, 400], [3.0, 1800], [d, 900]]);
    }
    const sh = v.gain(0, hall);
    v.env(sh.gain, [[0, 0], [2.5, 0.005], [d, 0]]);
    v.osc("sine", NOTE.A5!, sh);
    v.osc("sine", NOTE.E6!, v.gain(0.6, sh));
  });

  def("mus_solitude", (v, _c, p, d) => {
    const out = v.gain(1);
    const hall = v.reverb(MUSIC_HALL, 0.7, out);
    const bus = v.gain(1, out);
    bus.connect(hall);
    for (const n of ["D3", "A3", "F4"]) padNote(v, NOTE[n]!, 0.008, bus, [[0, 0.9], [d - 2.5, 0.8], [d, 0]], [[0, 900], [d, 600]]);
    const m = Number(p.motif ?? 10.8);
    fmNote(v, m, NOTE.D5!, 0.04, 1.8, bus, 3.5, 0.9);
    fmNote(v, m + 1.3, NOTE.A4!, 0.035, 1.8, bus, 3.5, 0.9);
    fmNote(v, m + 2.6, NOTE.F5!, 0.04, 2.8, bus, 3.5, 0.9);
  });

  def("mus_tension", (v, _c, _p, d) => {
    const out = v.gain(0);
    v.env(out.gain, [[0, 0], [3, 1], [d - 1.5, 1], [d, 0]]);
    const hall = v.reverb(MUSIC_HALL, 0.35, out);
    let t = 0.5;
    while (t < d - 0.5) {
      const k = t / d;
      v.ping(t, 46, 0.1 + k * 0.05, 0.12, { to: out });
      v.ping(t, 92, 0.02, 0.08, { to: hall });
      t += 1.4 - k * 0.55;
    }
    const cl = v.gain(0, out);
    v.env(cl.gain, [[0, 0], [d * 0.7, 0.012], [d, 0.02]]);
    v.osc("sine", NOTE.D2!, cl);
    v.osc("sine", NOTE["D#2"]!, cl);
  });

  def("mus_flight", (v, _c, _p, d) => {
    const out = v.gain(0);
    v.env(out.gain, [[0, 0], [4, 0.7], [d - 0.3, 1], [d, 1]]);
    const hall = v.reverb(MUSIC_HALL, 0.6, out);
    for (const [f, a] of [[NOTE.A5!, 0.006], [NOTE["A#5"]!, 0.004], [NOTE.E6!, 0.004]] as const) {
      const g = v.gain(a, hall);
      g.connect(out);
      v.osc("sine", f, g);
      v.osc("sine", 0.2 + f / 5000, v.mod(g.gain, a * 0.5));
    }
    const sub = v.gain(0, out);
    v.env(sub.gain, [[0, 0], [d, 0.025]]);
    v.osc("sine", NOTE.D1!, sub);
  });

  def("mus_coda", (v, _c, _p, d) => {
    const out = v.gain(1);
    const hall = v.reverb(MUSIC_HALL, 0.75, out);
    const bus = v.gain(1, out);
    bus.connect(hall);
    for (const n of ["D2", "A2"]) padNote(v, NOTE[n]!, 0.012, bus, [[0, 0], [2.5, 1], [d - 2.0, 0.8], [d, 0]], [[0, 300], [d, 700]]);
    fmNote(v, 4.0, NOTE.D3!, 0.05, 2.0, bus);
    fmNote(v, 5.2, NOTE.A2!, 0.045, 2.0, bus);
    fmNote(v, 6.4, NOTE.F3!, 0.05, 2.6, bus);
    fmNote(v, 8.6, NOTE.D3!, 0.04, 3.5, bus);
  });

  def("mus_end", (v, _c, _p, d) => {
    const out = v.gain(1);
    const hall = v.reverb(MUSIC_HALL, 0.75, out);
    const bus = v.gain(1, out);
    bus.connect(hall);
    fmNote(v, 0.4, NOTE.D4!, 0.04, 1.8, bus);
    fmNote(v, 1.5, NOTE.A3!, 0.035, 1.8, bus);
    fmNote(v, 2.6, NOTE.F4!, 0.04, 2.0, bus);
    fmNote(v, 3.9, NOTE.E4!, 0.035, 2.0, bus);
    fmNote(v, 5.8, NOTE.D4!, 0.045, 3.6, bus);
    fmNote(v, 5.8, NOTE.D3!, 0.03, 3.6, bus);
    for (const n of ["D3", "A3"]) padNote(v, NOTE[n]!, 0.007, bus, [[0, 0], [5.4, 0], [7, 1], [d - 1, 0.6], [d, 0]], [[0, 600], [d, 400]]);
  });
}

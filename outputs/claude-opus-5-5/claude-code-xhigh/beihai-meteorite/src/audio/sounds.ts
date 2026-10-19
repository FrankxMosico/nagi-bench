import type { SoundFactoryContext, WebAudioCueBus } from "@agentbench/cinematic-player";
import { Voice, impulse, noiseBuffer, type IRSpec } from "./kit";
import { hash1 } from "../core/anim";
import { SHOT_FILM_TIMES, RELOADS, filmT } from "../story";
import { FIX_ON, FIX_OFF, PLUNGES, SLUG_DROPS } from "../sets/workshop";
import { HEADS_OFF, GLUED, LOADED, MAG_IN, RACK, TEST_SHOTS } from "../sets/basement";

/**
 * Every sound in the film, designed from synthesis. Physical rules:
 * - the basement is a small concrete box: gunfire is a blast plus dense,
 *   bright early reflections and a short hard tail, then ringing ears;
 * - in vacuum nothing outside the suit is heard: firing reaches the ear only
 *   as a dull thump conducted through glove, arm and suit;
 * - radio is band-limited and clipped; helmet sounds are close and bassy.
 */

type P = Record<string, number | number[] | string | undefined>;
const payload = (ctx: SoundFactoryContext): P => (ctx.cue.payload as P) ?? {};

const IR: Record<string, IRSpec> = {
  basement: {
    seconds: 1.3,
    decay: 6.5,
    brightness: 0.85,
    early: [[0.0041, 0.9], [0.0068, 0.75], [0.0093, 0.7], [0.0121, 0.55], [0.0157, 0.6], [0.0189, 0.45], [0.0236, 0.4], [0.0281, 0.35], [0.0335, 0.3], [0.041, 0.22]],
  },
  room: { seconds: 0.8, decay: 9, brightness: 0.3, early: [[0.011, 0.25], [0.019, 0.18], [0.027, 0.12]] },
  workshop: { seconds: 2.4, decay: 3.0, brightness: 0.45, early: [[0.021, 0.3], [0.037, 0.25], [0.058, 0.2], [0.083, 0.15]], predelay: 0.012 },
  alley: { seconds: 0.9, decay: 7, brightness: 0.4, early: [[0.009, 0.35], [0.021, 0.3], [0.034, 0.2]] },
};

/** Click: a short filtered noise burst. */
function click(v: Voice, dest: AudioNode, tau: number, freq: number, q: number, level: number, decay = 0.03, seed = 1): void {
  if (!v.ahead(tau)) return;
  const n = v.noise("white", seed, false);
  const f = v.filter("bandpass", freq, q);
  const g = v.gain(0);
  v.chain(n, f, g, dest);
  v.hit(g.gain, tau, level, 0.001, decay);
  v.play(n, tau, tau + decay + 0.05);
}

/** Modal strike: a few inharmonic decaying partials (metal, glass, porcelain). */
function strike(v: Voice, dest: AudioNode, tau: number, base: number, ratios: number[], level: number, decay: number): void {
  if (!v.ahead(tau)) return;
  ratios.forEach((r, i) => {
    const o = v.osc("sine", base * r);
    const g = v.gain(0);
    v.chain(o, g, dest);
    v.hit(g.gain, tau, level / (1 + i * 0.7), 0.001, decay / (1 + i * 0.5));
    v.play(o, tau, tau + decay + 0.1);
  });
}

/** Low thump: a pitched-down sine kick plus a puff of filtered noise. */
function thump(v: Voice, dest: AudioNode, tau: number, f0: number, f1: number, level: number, decay: number, noiseCut = 400): void {
  if (!v.ahead(tau)) return;
  const o = v.osc("sine", f0);
  const g = v.gain(0);
  v.chain(o, g, dest);
  o.frequency.setValueAtTime(f0, v.at(tau));
  o.frequency.exponentialRampToValueAtTime(f1, v.at(tau) + decay);
  v.hit(g.gain, tau, level, 0.003, decay);
  v.play(o, tau, tau + decay + 0.1);
  const n = v.noise("brown", 3, false);
  const lp = v.filter("lowpass", noiseCut, 0.8);
  const gn = v.gain(0);
  v.chain(n, lp, gn, dest);
  v.hit(gn.gain, tau, level * 0.8, 0.002, decay * 0.7);
  v.play(n, tau, tau + decay + 0.1);
}

/** Footstep on a hard floor. */
function step(v: Voice, dest: AudioNode, tau: number, level: number, bright: number, seed: number): void {
  click(v, dest, tau, 900 + bright * 1800, 1.2, level, 0.035, seed);
  thump(v, dest, tau + 0.004, 140, 70, level * 0.5, 0.06, 300);
}

/** Build every noise buffer and impulse response once, right after unlock. */
export function warmAudio(ac: BaseAudioContext): void {
  for (const kind of ["white", "pink", "brown"] as const) for (let seed = 1; seed <= 3; seed++) noiseBuffer(ac, kind, 4, seed);
  for (const [key, spec] of Object.entries(IR)) impulse(ac, key, spec);
  impulse(ac, "theme-hall", { seconds: 3.5, decay: 1.6, brightness: 0.5, predelay: 0.02 });
  impulse(ac, "boom-hall", { seconds: 4, decay: 1.3, brightness: 0.15, predelay: 0.03 });
}

export function registerSounds(bus: WebAudioCueBus<unknown>): void {
  // ======================================================== orbit: inside the suit
  bus.define("suit_fan", (ctx) => {
    const v = new Voice(ctx, 0.4);
    const p = payload(ctx);
    const level = (p.level as number) ?? 1;
    // Life-support fan: a low tonal hum with blade rate, plus air.
    const hum = v.osc("sine", 96);
    const hum2 = v.osc("triangle", 192.5);
    const hg = v.gain(0.022 * level);
    const hg2 = v.gain(0.006 * level);
    v.chain(hum, hg, v.out);
    v.chain(hum2, hg2, v.out);
    const air = v.noise("pink", 4);
    const lp = v.filter("lowpass", 900, 0.5);
    const bp = v.filter("peaking", 280, 1.2, 6);
    const ag = v.gain(0.05 * level);
    v.chain(air, bp, lp, ag, v.out);
    // Faint electronics whine.
    const whine = v.osc("sine", 6400);
    const wg = v.gain(0.0016 * level);
    v.chain(whine, wg, v.out);
    [hum, hum2, air, whine].forEach((s) => v.play(s));
    return v.handle();
  });

  bus.define("breath", (ctx) => {
    const v = new Voice(ctx, 0.2);
    const p = payload(ctx);
    const rate = (p.rate as number) ?? 0.22;
    const depth = (p.depth as number) ?? 1;
    const shaky = (p.shaky as number) ?? 0;
    const hold = (p.hold as number[] | undefined) ?? null;
    const src = v.noise("pink", 9);
    const bp = v.filter("bandpass", 700, 0.9);
    const lp = v.filter("lowpass", 2400, 0.6);
    const g = v.gain(0);
    v.chain(src, bp, lp, g, v.out);
    v.play(src);
    // Schedule inhale/exhale envelopes for the cue's length.
    const period = 1 / rate;
    for (let k = 0, tau = 0; tau < v.dur; k++, tau = k * period) {
      if (hold && tau >= hold[0]! && tau < hold[1]!) continue;
      const jitter = shaky ? (hash1(k, 3) - 0.5) * period * 0.35 * shaky : 0;
      const t0 = tau + jitter;
      if (t0 + period < v.off) continue;
      const ins = period * 0.38;
      const outs = period * 0.5;
      const a = Math.max(v.ac.currentTime, v.at(t0));
      if (v.at(t0 + ins + outs) < v.ac.currentTime) continue;
      const amp = 0.05 * depth * (shaky ? 0.7 + hash1(k, 5) * 0.6 : 1);
      g.gain.setValueAtTime(0.0001, a);
      g.gain.linearRampToValueAtTime(amp * 0.8, v.at(t0 + ins * 0.6));
      g.gain.linearRampToValueAtTime(0.0001, v.at(t0 + ins));
      g.gain.linearRampToValueAtTime(amp, v.at(t0 + ins + 0.15));
      g.gain.linearRampToValueAtTime(0.0001, v.at(t0 + ins + outs));
      bp.frequency.setValueAtTime(1150, a);
      bp.frequency.linearRampToValueAtTime(900, v.at(t0 + ins));
      bp.frequency.linearRampToValueAtTime(520, v.at(t0 + ins + outs));
      if (shaky && hash1(k, 8) < 0.5) {
        // A catch in the breath.
        g.gain.setValueAtTime(amp * 0.2, v.at(t0 + ins + outs * 0.4));
        g.gain.linearRampToValueAtTime(amp * 0.7, v.at(t0 + ins + outs * 0.5));
      }
    }
    // Held breath: one deep inhale before the hold, a slow release after.
    if (hold) {
      const [h0, h1] = hold;
      if (v.ahead(h0! - 1.4)) {
        g.gain.setValueAtTime(0.0001, v.at(h0! - 1.4));
        g.gain.linearRampToValueAtTime(0.07 * depth, v.at(h0! - 0.4));
        g.gain.linearRampToValueAtTime(0.0001, v.at(h0!));
      }
      if (h1! < v.dur && v.ahead(h1!)) {
        g.gain.setValueAtTime(0.0001, v.at(h1!));
        g.gain.linearRampToValueAtTime(0.06 * depth, v.at(h1! + 0.3));
        g.gain.linearRampToValueAtTime(0.0001, v.at(h1! + 2.4));
      }
    }
    return v.handle();
  });

  bus.define("heartbeat", (ctx) => {
    const v = new Voice(ctx, 0.05);
    const p = payload(ctx);
    const bpm0 = (p.bpm0 as number) ?? 62;
    const bpm1 = (p.bpm1 as number) ?? 84;
    const lp = v.filter("lowpass", 160, 0.9);
    lp.connect(v.out);
    let tau = 0.2;
    let k = 0;
    while (tau < v.dur - 0.1) {
      const f = tau / v.dur;
      const bpm = bpm0 + (bpm1 - bpm0) * f * f;
      const lvl = 0.2 + 0.26 * f;
      thump(v, lp, tau, 62, 38, lvl, 0.12, 120);
      thump(v, lp, tau + 0.16, 55, 34, lvl * 0.7, 0.11, 110);
      tau += 60 / bpm;
      k++;
    }
    void k;
    return v.handle();
  });

  bus.define("suit_conduct", (ctx) => {
    // Mechanical events heard only through the suit: dull, bassy, close.
    const v = new Voice(ctx, 0.002);
    const p = payload(ctx);
    const kind = (p.kind as string) ?? "clack";
    const lp = v.filter("lowpass", kind === "vent" ? 1400 : 700, 0.7);
    const body = v.filter("peaking", 240, 1.5, 6);
    v.chain(body, lp, v.out);
    if (kind === "clack") {
      thump(v, body, 0, 180, 90, 0.55, 0.07, 500);
      click(v, body, 0.002, 1100, 2, 0.4, 0.03);
    } else if (kind === "ratchet") {
      for (let i = 0; i < 4; i++) click(v, body, i * 0.055, 900 + i * 40, 4, 0.35, 0.02, i + 2);
    } else if (kind === "vent") {
      // The glove seam venting: a short hiss felt through the cuff.
      const n = v.noise("white", 4, true);
      const bp = v.filter("bandpass", 2600, 0.8);
      const g = v.gain(0);
      v.chain(n, bp, g, lp);
      v.ramp(g.gain, [[0, 0], [0.03, 0.22], [0.5, 0.08], [1.1, 0]]);
      v.play(n, 0, 1.2);
    } else if (kind === "rustle") {
      const n = v.noise("pink", 6, true);
      const bp = v.filter("bandpass", 600, 0.6);
      const g = v.gain(0);
      v.chain(n, bp, g, body);
      v.ramp(g.gain, [[0, 0], [0.1, 0.12], [0.35, 0.05], [0.6, 0.1], [1.0, 0]]);
      v.play(n, 0, 1.1);
    } else if (kind === "velcro") {
      const n = v.noise("white", 7, true);
      const bp = v.filter("bandpass", 1800, 0.7);
      const g = v.gain(0);
      const am = v.osc("square", 70);
      const amg = v.gain(0.5);
      v.chain(am, amg, g.gain);
      v.chain(n, bp, g, lp);
      v.ramp(g.gain, [[0, 0], [0.02, 0.18], [0.35, 0.12], [0.4, 0]]);
      v.play(n, 0, 0.5);
      v.play(am, 0, 0.5);
    } else if (kind === "magnet") {
      thump(v, body, 0, 210, 120, 0.7, 0.05, 700);
      strike(v, lp, 0.001, 820, [1, 2.3, 3.9], 0.12, 0.12);
    }
    return v.handle();
  });

  bus.define("volley", (ctx) => {
    // Thirty rounds from a vacuum: no report at all, only the recoil felt
    // through the bare hand and the suit, plus the gun's own mechanism.
    const v = new Voice(ctx, 0.002);
    const lp = v.filter("lowpass", 520, 0.8);
    const res = v.filter("peaking", 150, 2, 5);
    v.chain(res, lp, v.out);
    const t0 = ctx.cue.start;
    SHOT_FILM_TIMES.forEach((ft, k) => {
      const tau = ft - t0;
      thump(v, res, tau, 92, 41, 0.36 + hash1(k, 1) * 0.06, 0.075, 260);
      click(v, res, tau + 0.012, 650, 3, 0.18, 0.025, k + 3);
    });
    RELOADS.forEach((r) => {
      const tau = filmT(r) - t0;
      click(v, res, tau + 0.1, 700, 3, 0.3, 0.03, 31);
      thump(v, res, tau + 0.62, 200, 110, 0.5, 0.06, 600);
      click(v, res, tau + 0.62, 900, 3, 0.25, 0.03, 32);
    });
    return v.handle();
  });

  bus.define("suit_alarm", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const bp = v.filter("bandpass", 1900, 3);
    bp.connect(v.out);
    for (let k = 0; k < 6; k++) {
      const tau = Math.floor(k / 3) * 1.6 + (k % 3) * 0.18;
      if (!v.ahead(tau)) continue;
      const o = v.osc("triangle", k % 3 === 2 ? 1480 : 1975);
      const g = v.gain(0);
      v.chain(o, g, bp);
      g.gain.setValueAtTime(0, v.at(tau));
      g.gain.linearRampToValueAtTime(0.09, v.at(tau) + 0.008);
      g.gain.setValueAtTime(0.09, v.at(tau) + 0.11);
      g.gain.linearRampToValueAtTime(0, v.at(tau) + 0.125);
      v.play(o, tau, tau + 0.14);
    }
    return v.handle();
  });

  bus.define("thruster_own", (ctx) => {
    // Own pack firing: a rumble conducted through the back plate.
    const v = new Voice(ctx, 0.05);
    const n = v.noise("brown", 11);
    const lp = v.filter("lowpass", 220, 0.8);
    const g = v.gain(0);
    v.chain(n, lp, g, v.out);
    const hiss = v.noise("white", 12);
    const bp = v.filter("bandpass", 3200, 0.7);
    const hg = v.gain(0);
    v.chain(hiss, bp, hg, v.out);
    v.ramp(g.gain, [[0, 0], [0.15, 0.32], [6, 0.26], [6.6, 0.08], [v.dur - 1, 0.06], [v.dur, 0]]);
    v.ramp(hg.gain, [[0, 0], [0.1, 0.015], [6, 0.012], [6.6, 0.003], [v.dur, 0]]);
    v.play(n);
    v.play(hiss);
    return v.handle();
  });

  bus.define("radio_alert", (ctx) => {
    // Station emergency traffic on the public channel: squelch, static, the
    // station's two-tone alarm carried by the radio, squelch tail.
    const v = new Voice(ctx, 0.002);
    const band = v.filter("bandpass", 1400, 0.9);
    const clip = v.shaper(3);
    const hp = v.filter("highpass", 320, 0.7);
    const lp = v.filter("lowpass", 3400, 0.7);
    const g = v.gain(0.3);
    v.chain(band, clip, hp, lp, g, v.out);
    click(v, hp, 0, 2000, 1, 0.5, 0.04, 41);
    const stat = v.noise("white", 13);
    const sg = v.gain(0);
    v.chain(stat, sg, band);
    v.ramp(sg.gain, [[0, 0], [0.02, 0.35], [0.25, 0.08], [v.dur - 0.5, 0.08], [v.dur - 0.45, 0.4], [v.dur - 0.1, 0.0]]);
    v.play(stat);
    // Crackle.
    for (let k = 0; k < 40; k++) click(v, hp, 0.3 + hash1(k, 4) * (v.dur - 0.8), 2500 + hash1(k, 5) * 1500, 2, 0.12, 0.01, k + 50);
    // Two-tone alarm under the announcement.
    const tone = v.osc("square", 960);
    const tg = v.gain(0);
    v.chain(tone, tg, band);
    for (let k = 0; k * 0.5 < v.dur - 0.8; k++) tone.frequency.setValueAtTime(k % 2 ? 770 : 960, v.at(0.35 + k * 0.5));
    v.ramp(tg.gain, [[0, 0], [0.35, 0], [0.4, 0.05], [v.dur - 0.7, 0.04], [v.dur - 0.5, 0]]);
    v.play(tone);
    click(v, hp, v.dur - 0.45, 1800, 1, 0.45, 0.05, 42);
    return v.handle();
  });

  // ======================================================== orbit: music & subjective
  bus.define("pad", (ctx) => {
    // Slow, cold chord pad: stacked sines with gentle beating.
    const v = new Voice(ctx, 0.05);
    const p = payload(ctx);
    const notes = (p.notes as number[]) ?? [73.4, 110, 146.8, 174.6];
    const level = (p.level as number) ?? 0.05;
    const fin = (p.fadeIn as number) ?? 3;
    const fout = (p.fadeOut as number) ?? 3;
    const lp = v.filter("lowpass", (p.cut as number) ?? 1200, 0.5);
    const g = v.gain(0);
    v.chain(lp, g, v.out);
    notes.forEach((f, i) => {
      for (const det of [-0.12, 0.12]) {
        const o = v.osc(i === 0 ? "sine" : "triangle", f * (1 + det / 100));
        const og = v.gain(1 / notes.length);
        v.chain(o, og, lp);
        v.play(o);
      }
    });
    v.ramp(g.gain, [[0, 0], [fin, level], [v.dur - fout, level], [v.dur, 0]]);
    return v.handle();
  });

  bus.define("shimmer", (ctx) => {
    // The diamond ring: high glassy partials swelling and beating.
    const v = new Voice(ctx, 0.05);
    const g = v.gain(0);
    const hp = v.filter("highpass", 900, 0.5);
    v.chain(hp, g, v.out);
    [1174.7, 1568, 1760, 2349.3, 2637].forEach((f, i) => {
      const o = v.osc("sine", f);
      const lfo = v.osc("sine", 0.3 + i * 0.13);
      const lg = v.gain(0.4);
      const og = v.gain(0.5);
      v.chain(lfo, lg, og.gain);
      v.chain(o, og, hp);
      v.play(o);
      v.play(lfo);
    });
    v.ramp(g.gain, [[0, 0], [1.6, 0.03], [v.dur - 1.2, 0.025], [v.dur, 0]]);
    return v.handle();
  });

  bus.define("tension", (ctx) => {
    // A low pulse that tightens: filtered saws, slow throb.
    const v = new Voice(ctx, 0.1);
    const p = payload(ctx);
    const f0 = (p.f0 as number) ?? 55;
    const rise = (p.rise as number) ?? 0;
    const level = (p.level as number) ?? 0.06;
    const lp = v.filter("lowpass", 300, 1.2);
    const g = v.gain(0);
    v.chain(lp, g, v.out);
    for (const m of [1, 1.0595, 1.5]) {
      const o = v.osc("sawtooth", f0 * m);
      const og = v.gain(0.33);
      v.chain(o, og, lp);
      if (rise) v.ramp(o.frequency, [[0, f0 * m], [v.dur, f0 * m * (1 + rise)]]);
      v.play(o);
    }
    const throb = v.osc("sine", (p.throb as number) ?? 0.8);
    const tg = v.gain(0.35);
    v.chain(throb, tg, g.gain);
    v.play(throb);
    v.ramp(lp.frequency, [[0, 220], [v.dur, (p.cut as number) ?? 900]]);
    v.ramp(g.gain, [[0, 0], [Math.min(4, v.dur * 0.3), level * 0.6], [v.dur - 0.05, level], [v.dur, 0]]);
    return v.handle();
  });

  bus.define("flight", (ctx) => {
    // Ten seconds stretched into twenty-two: a held cluster climbing very
    // slowly, the air thinning, cut dead at the first impact.
    const v = new Voice(ctx, 0.3);
    const g = v.gain(0);
    const lp = v.filter("lowpass", 1800, 0.6);
    v.chain(lp, g, v.out);
    [196, 207.65, 293.66, 311.13, 392].forEach((f, i) => {
      for (const det of [-6, 6]) {
        const o = v.osc("sawtooth", f);
        o.detune.value = det;
        const og = v.gain(0.08);
        v.chain(o, og, lp);
        v.ramp(o.frequency, [[0, f], [v.dur, f * 1.12]]);
        v.play(o);
      }
      void i;
    });
    v.ramp(lp.frequency, [[0, 500], [v.dur, 2600]]);
    v.ramp(g.gain, [[0, 0], [3, 0.05], [v.dur - 0.02, 0.11], [v.dur, 0]]);
    return v.handle();
  });

  bus.define("theme", (ctx) => {
    // Bell-like FM notes: the film's four-note figure.
    const v = new Voice(ctx, 0.01);
    const p = payload(ctx);
    const notes = (p.notes as number[]) ?? [];
    const times = (p.times as number[]) ?? [];
    const level = (p.level as number) ?? 0.08;
    const rev = v.conv("theme-hall", { seconds: 3.5, decay: 1.6, brightness: 0.5, predelay: 0.02 });
    const wet = v.gain(0.5);
    v.chain(rev, wet, v.out);
    notes.forEach((f, i) => {
      const tau = times[i]!;
      if (!v.ahead(tau)) return;
      const car = v.osc("sine", f);
      const mod = v.osc("sine", f * 3.5);
      const mg = v.gain(f * 1.2);
      const g = v.gain(0);
      v.chain(mod, mg, car.frequency);
      v.chain(car, g, v.out);
      g.connect(rev);
      v.hit(g.gain, tau, level, 0.004, 3.6);
      mg.gain.setValueAtTime(f * 1.4, v.at(tau));
      mg.gain.exponentialRampToValueAtTime(f * 0.05, v.at(tau) + 1.8);
      v.play(car, tau, tau + 4);
      v.play(mod, tau, tau + 4);
    });
    return v.handle();
  });

  bus.define("boom", (ctx) => {
    // Title impact: a deep sub drop with a dark tail.
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("boom-hall", { seconds: 4, decay: 1.3, brightness: 0.15, predelay: 0.03 });
    const wet = v.gain(0.6);
    v.chain(rev, wet, v.out);
    const mix = v.gain(1);
    mix.connect(v.out);
    mix.connect(rev);
    thump(v, mix, 0, 58, 26, 0.9, 1.6, 180);
    return v.handle();
  });

  // ======================================================== Beijing
  bus.define("hutong", (ctx) => {
    const v = new Voice(ctx, 0.6);
    // Wind along the alley, the far city, sparse birds.
    const wind = v.noise("pink", 21);
    const bp = v.filter("bandpass", 450, 0.5);
    const wg = v.gain(0.05);
    const lfo = v.osc("sine", 0.13);
    const lg = v.gain(0.03);
    v.chain(lfo, lg, wg.gain);
    v.chain(wind, bp, wg, v.out);
    const city = v.noise("brown", 22);
    const clp = v.filter("lowpass", 160, 0.6);
    const cg = v.gain(0.12);
    v.chain(city, clp, cg, v.out);
    [wind, lfo, city].forEach((s) => v.play(s));
    for (let k = 0; k < 6; k++) {
      const tau = 0.8 + k * 1.3 + hash1(k, 7) * 0.6;
      if (!v.ahead(tau)) continue;
      const o = v.osc("sine", 3200 + hash1(k, 8) * 1400);
      const g = v.gain(0);
      const pn = v.pan(hash1(k, 9) * 1.6 - 0.8);
      v.chain(o, g, pn, v.out);
      o.frequency.setValueAtTime(3400 + hash1(k, 8) * 1400, v.at(tau));
      o.frequency.exponentialRampToValueAtTime(2600, v.at(tau) + 0.09);
      v.hit(g.gain, tau, 0.012, 0.005, 0.09);
      v.play(o, tau, tau + 0.15);
    }
    return v.handle();
  });

  bus.define("pigeon_whistle", (ctx) => {
    // 鸽哨: a cluster of whistle pipes on a wheeling flock — swells and
    // a Doppler sag as the birds pass overhead.
    const v = new Voice(ctx, 0.2);
    const pn = v.pan(-0.7);
    const g = v.gain(0);
    v.chain(g, pn, v.out);
    v.ramp(pn.pan, [[0, -0.8], [v.dur, 0.8]]);
    [880, 1046.5, 1174.7, 1318.5, 1567.98].forEach((f, i) => {
      const o = v.osc("sine", f);
      const vib = v.osc("sine", 5 + i * 0.7);
      const vg = v.gain(f * 0.004);
      v.chain(vib, vg, o.frequency);
      const og = v.gain(0.2);
      v.chain(o, og, g);
      v.ramp(o.frequency, [[0, f * 1.02], [v.dur * 0.5, f], [v.dur, f * 0.975]]);
      v.play(o);
      v.play(vib);
    });
    const air = v.noise("white", 23);
    const abp = v.filter("bandpass", 2400, 2);
    const ag = v.gain(0.04);
    v.chain(air, abp, ag, g);
    v.play(air);
    v.ramp(g.gain, [[0, 0], [v.dur * 0.35, 0.07], [v.dur * 0.55, 0.09], [v.dur, 0]]);
    return v.handle();
  });

  bus.define("radio_news", (ctx) => {
    // An old valve radio: hum, band-limited hiss, a station jingle; muffled
    // further when heard through a courtyard wall.
    const v = new Voice(ctx, 0.08);
    const p = payload(ctx);
    const wall = (p.wall as number) ?? 0;
    const lp = v.filter("lowpass", wall ? 1300 : 3000, 0.7);
    const hp = v.filter("highpass", 260, 0.7);
    const g = v.gain(wall ? 0.6 : 1);
    v.chain(hp, lp, g, v.out);
    const hiss = v.noise("white", 31);
    const bp = v.filter("bandpass", 1600, 0.6);
    const hg = v.gain(0.012);
    v.chain(hiss, bp, hg, hp);
    const hum = v.osc("sine", 100);
    const humg = v.gain(0.008);
    v.chain(hum, humg, hp);
    v.play(hiss);
    v.play(hum);
    if (p.jingle) {
      [659.3, 784, 987.8].forEach((f, i) => {
        const tau = 0.1 + i * 0.22;
        if (!v.ahead(tau)) return;
        const o = v.osc("square", f);
        const og = v.gain(0);
        v.chain(o, og, hp);
        v.hit(og.gain, tau, 0.03, 0.01, 0.35);
        v.play(o, tau, tau + 0.5);
      });
    }
    // Syllabic murmur of a voice is deliberately NOT synthesized; only the set's carrier.
    return v.handle();
  });

  bus.define("steps", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const p = payload(ctx);
    const rate = (p.rate as number) ?? 1.8;
    const level = (p.level as number) ?? 0.25;
    const bright = (p.bright as number) ?? 0.5;
    const space = (p.space as string) ?? "room";
    const rev = v.conv(space, IR[space] ?? IR.room!);
    const wet = v.gain(0.35);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    for (let k = 0; k * (1 / rate) < v.dur - 0.05; k++) step(v, dry, k / rate + hash1(k, 2) * 0.03, level * (0.85 + hash1(k, 3) * 0.3), bright, k + 5);
    return v.handle();
  });

  bus.define("bike_bell", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const pn = v.pan(0.5);
    const g = v.gain(1);
    v.chain(g, pn, v.out);
    for (const tau of [0, 0.14]) strike(v, g, tau, 2150, [1, 2.76, 5.4], 0.035, 0.9);
    return v.handle();
  });

  bus.define("room_tone", (ctx) => {
    const v = new Voice(ctx, 0.8);
    const p = payload(ctx);
    const n = v.noise("brown", 41);
    const lp = v.filter("lowpass", (p.cut as number) ?? 240, 0.5);
    const g = v.gain((p.level as number) ?? 0.06);
    v.chain(n, lp, g, v.out);
    v.play(n);
    if (p.hum) {
      const h = v.osc("sine", p.hum as number);
      const h2 = v.osc("sine", (p.hum as number) * 2);
      const hg = v.gain(0.004);
      const hg2 = v.gain(0.002);
      v.chain(h, hg, v.out);
      v.chain(h2, hg2, v.out);
      v.play(h);
      v.play(h2);
    }
    if (p.drip) {
      for (let k = 0; k < 8; k++) {
        const tau = 2 + k * 5.1 + hash1(k, 61) * 2;
        if (tau < v.dur) strike(v, v.out, tau, 1300 + hash1(k, 62) * 300, [1, 1.6], 0.01, 0.12);
      }
    }
    return v.handle();
  });

  bus.define("clock", (ctx) => {
    // Pendulum clock: escapement tick-tock at the swing extremes.
    const v = new Voice(ctx, 0.01);
    const rev = v.conv("room", IR.room!);
    const wet = v.gain(0.3);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    const first = Math.ceil(ctx.cue.start - 0.5) + 0.5 - ctx.cue.start;
    for (let k = 0; first + k < v.dur; k++) {
      const tau = first + k;
      const tick = Math.round(ctx.cue.start + tau - 0.5) % 2 === 0;
      click(v, dry, tau, tick ? 3200 : 2500, 6, 0.05, 0.02, k % 7);
      strike(v, dry, tau, tick ? 1850 : 1500, [1, 2.4], 0.008, 0.06);
    }
    return v.handle();
  });

  bus.define("door_creak", (ctx) => {
    const v = new Voice(ctx, 0.02);
    const o = v.osc("sawtooth", 180);
    const bp = v.filter("bandpass", 900, 6);
    const g = v.gain(0);
    v.chain(o, bp, g, v.out);
    v.ramp(o.frequency, [[0, 160], [0.3, 240], [0.6, 190], [1.0, 260], [1.2, 210]]);
    v.ramp(g.gain, [[0, 0], [0.1, 0.03], [0.9, 0.025], [1.25, 0]]);
    v.play(o, 0, 1.3);
    return v.handle();
  });

  bus.define("wood", (ctx) => {
    // Chair/stool scrape or creak.
    const v = new Voice(ctx, 0.01);
    const p = payload(ctx);
    const n = v.noise("pink", 51);
    const bp = v.filter("bandpass", (p.f as number) ?? 520, 3);
    const g = v.gain(0);
    v.chain(n, bp, g, v.out);
    v.ramp(g.gain, [[0, 0], [0.05, 0.12], [v.dur * 0.6, 0.06], [v.dur, 0]]);
    v.ramp(bp.frequency, [[0, (p.f as number) ?? 520], [v.dur, ((p.f as number) ?? 520) * 1.4]]);
    v.play(n);
    return v.handle();
  });

  bus.define("pour", (ctx) => {
    // Tea from a clay pot: a stream whose cup resonance climbs as it fills.
    const v = new Voice(ctx, 0.05);
    const n = v.noise("white", 61);
    const bp = v.filter("bandpass", 800, 4);
    const lp = v.filter("lowpass", 4200, 0.6);
    const g = v.gain(0);
    const gurgle = v.osc("sine", 9);
    const gg = v.gain(300);
    v.chain(gurgle, gg, bp.frequency);
    v.chain(n, bp, lp, g, v.out);
    v.ramp(bp.frequency, [[0, 700], [v.dur, 1900]]);
    v.ramp(g.gain, [[0, 0], [0.15, 0.09], [v.dur - 0.3, 0.07], [v.dur, 0]]);
    v.play(n);
    v.play(gurgle);
    return v.handle();
  });

  bus.define("knob", (ctx) => {
    // A bakelite knob or a collet nut: a firm detent click.
    const v = new Voice(ctx, 0.002);
    click(v, v.out, 0, 1500, 3, 0.12, 0.02, 33);
    click(v, v.out, 0.06, 2300, 4, 0.08, 0.015, 34);
    thump(v, v.out, 0, 260, 150, 0.08, 0.03, 900);
    return v.handle();
  });

  bus.define("porcelain", (ctx) => {
    const v = new Voice(ctx, 0.002);
    strike(v, v.out, 0, 2350, [1, 1.74, 2.63, 3.9], 0.05, 0.5);
    return v.handle();
  });

  bus.define("stones_down", (ctx) => {
    // Iron meteorites set on a hardwood table: heavy, dense knocks.
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("room", IR.room!);
    const wet = v.gain(0.25);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    [0, 0.26, 0.5].forEach((tau, k) => {
      thump(v, dry, tau, 240, 120, 0.3, 0.05, 900);
      click(v, dry, tau, 2400, 2, 0.18, 0.015, k + 70);
      strike(v, dry, tau, 3100 + k * 140, [1, 2.2], 0.008, 0.08);
    });
    return v.handle();
  });

  bus.define("glass_cabinet", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const p = payload(ctx);
    const open = (p.open as number) ?? 1;
    click(v, v.out, 0, 1200, 3, 0.12, 0.03, 81);
    strike(v, v.out, 0.02, 3300, [1, 1.9, 3.1], 0.03, 0.35);
    if (open) {
      const n = v.noise("pink", 82);
      const bp = v.filter("bandpass", 1500, 8);
      const g = v.gain(0);
      v.chain(n, bp, g, v.out);
      v.ramp(g.gain, [[0, 0], [0.1, 0.04], [0.5, 0]]);
      v.play(n, 0, 0.6);
    }
    return v.handle();
  });

  bus.define("phone", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const p = payload(ctx);
    if (p.chime) {
      [1318.5, 1975.5].forEach((f, i) => {
        const o = v.osc("sine", f);
        const g = v.gain(0);
        v.chain(o, g, v.out);
        v.hit(g.gain, i * 0.12, 0.04, 0.005, 0.5);
        v.play(o, i * 0.12, i * 0.12 + 0.6);
      });
    } else {
      [0, 0.38, 0.62].forEach((tau, k) => click(v, v.out, tau, 3000, 3, 0.04, 0.012, k + 90));
    }
    return v.handle();
  });

  // ======================================================== workshop
  bus.define("fluoro", (ctx) => {
    // Tube bank: starter clicks per fixture, then mains buzz that follows
    // how many tubes are lit.
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("workshop", IR.workshop!);
    const wet = v.gain(0.3);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    const t0 = ctx.cue.start;
    FIX_ON.forEach((on, k) => {
      const tau = on - t0;
      click(v, dry, tau - 0.25, 2600, 4, 0.12, 0.02, k + 100);
      click(v, dry, tau, 1800, 3, 0.2, 0.03, k + 110);
      click(v, dry, tau + 0.14, 1700, 3, 0.12, 0.02, k + 120);
      click(v, dry, tau + 0.3, 2000, 3, 0.18, 0.025, k + 130);
    });
    FIX_OFF.forEach((off, k) => click(v, dry, off - t0, 1500, 3, 0.22, 0.04, k + 140));
    const buzz = v.osc("sawtooth", 100);
    const bp = v.filter("bandpass", 200, 3);
    const bg = v.gain(0);
    v.chain(buzz, bp, bg, v.out);
    const lit: Array<[number, number]> = [[0, 0]];
    for (let k = 0; k < 6; k++) lit.push([FIX_ON[k]! - t0 + 0.3, (k + 1) * 0.004]);
    for (let k = 0; k < 6; k++) lit.push([FIX_OFF[k]! - t0, (5 - k) * 0.004]);
    v.ramp(bg.gain, lit);
    v.play(buzz);
    return v.handle();
  });

  bus.define("cnc", (ctx) => {
    // Panel beeps, spindle spin-up whine, four core-drill cuts under load
    // (chatter + coolant), spin-down; in a big empty hall.
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("workshop", IR.workshop!);
    const wet = v.gain(0.35);
    v.chain(rev, wet, v.out);
    const bus2 = v.gain(1);
    bus2.connect(v.out);
    bus2.connect(rev);
    const t0 = ctx.cue.start;
    // Panel beeps.
    [127.3, 128.1, 128.9, 129.8].forEach((bt, k) => {
      const tau = bt - t0;
      if (!v.ahead(tau)) return;
      const o = v.osc("square", k === 3 ? 1560 : 1170);
      const g = v.gain(0);
      v.chain(o, g, bus2);
      v.hit(g.gain, tau, 0.025, 0.003, 0.08);
      v.play(o, tau, tau + 0.12);
    });
    // Spindle.
    const sStart = 130.6 - t0;
    const sEnd = 136.4 - t0;
    const sp = v.osc("sawtooth", 40);
    const sp2 = v.osc("sine", 80);
    const sbp = v.filter("bandpass", 1200, 2);
    const sg = v.gain(0);
    v.chain(sp, sbp, sg, bus2);
    const sg2 = v.gain(0);
    v.chain(sp2, sg2, bus2);
    v.ramp(sp.frequency, [[sStart, 30], [sStart + 1.2, 400], [sEnd, 400], [sEnd + 1.4, 25]]);
    v.ramp(sp2.frequency, [[sStart, 60], [sStart + 1.2, 800], [sEnd, 800], [sEnd + 1.4, 50]]);
    v.ramp(sbp.frequency, [[sStart, 300], [sStart + 1.2, 2400], [sEnd, 2400], [sEnd + 1.4, 200]]);
    v.ramp(sg.gain, [[0, 0], [sStart, 0], [sStart + 0.6, 0.05], [sEnd, 0.05], [sEnd + 1.4, 0]]);
    v.ramp(sg2.gain, [[0, 0], [sStart, 0], [sStart + 0.8, 0.025], [sEnd, 0.025], [sEnd + 1.2, 0]]);
    v.play(sp, Math.max(0, sStart), sEnd + 1.5);
    v.play(sp2, Math.max(0, sStart), sEnd + 1.5);
    // Cuts.
    const cut = v.noise("white", 141);
    const cbp = v.filter("bandpass", 4200, 1.4);
    const cg = v.gain(0);
    const chatter = v.osc("square", 180);
    const chg = v.gain(0);
    v.chain(chatter, chg, cg.gain);
    v.chain(cut, cbp, cg, bus2);
    const coolant = v.noise("pink", 142);
    const clp = v.filter("highpass", 2500, 0.5);
    const cog = v.gain(0);
    v.chain(coolant, clp, cog, bus2);
    const cutPts: Array<[number, number]> = [[0, 0]];
    const chPts: Array<[number, number]> = [[0, 0]];
    const coPts: Array<[number, number]> = [[0, 0]];
    PLUNGES.forEach((p0) => {
      const a = p0 - t0;
      cutPts.push([a + 0.2, 0], [a + 0.3, 0.11], [a + 0.65, 0.13], [a + 0.75, 0]);
      chPts.push([a + 0.2, 0], [a + 0.3, 0.03], [a + 0.7, 0.03], [a + 0.75, 0]);
      coPts.push([a - 0.1, 0], [a + 0.05, 0.02], [a + 1.0, 0.02], [a + 1.2, 0]);
      sp.frequency.setValueAtTime(400, v.at(a + 0.25));
      sp.frequency.linearRampToValueAtTime(330, v.at(a + 0.4));
      sp.frequency.linearRampToValueAtTime(400, v.at(a + 0.8));
    });
    v.ramp(cg.gain, cutPts);
    v.ramp(chg.gain, chPts);
    v.ramp(cog.gain, coPts);
    v.play(cut);
    v.play(chatter);
    v.play(coolant);
    return v.handle();
  });

  bus.define("drops", (ctx) => {
    // Thirty-six slugs dropping into a steel tray, each its own little bell.
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("workshop", IR.workshop!);
    const wet = v.gain(0.18);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    const t0 = ctx.cue.start;
    // Parting tool whirr under the drops.
    const wh = v.osc("sawtooth", 210);
    const wbp = v.filter("bandpass", 1300, 3);
    const wg = v.gain(0);
    v.chain(wh, wbp, wg, dry);
    v.ramp(wg.gain, [[0, 0], [0.3, 0.012], [SLUG_DROPS[34]! - t0, 0.012], [SLUG_DROPS[34]! - t0 + 0.3, 0]]);
    v.play(wh, 0, SLUG_DROPS[34]! - t0 + 0.4);
    SLUG_DROPS.forEach((d, k) => {
      const tau = d - t0;
      const last = k === 35;
      strike(v, dry, tau, 3100 + hash1(k, 151) * 900, [1, 1.83, 2.71], last ? 0.07 : 0.04, last ? 0.9 : 0.35);
      strike(v, dry, tau + 0.045, 3300 + hash1(k, 152) * 700, [1, 1.9], last ? 0.025 : 0.014, 0.2);
    });
    return v.handle();
  });

  bus.define("brush", (ctx) => {
    const v = new Voice(ctx, 0.01);
    const n = v.noise("pink", 161);
    const bp = v.filter("bandpass", 2600, 1);
    const g = v.gain(0);
    v.chain(n, bp, g, v.out);
    const pts: Array<[number, number]> = [[0, 0]];
    for (let k = 0; k * 0.32 < v.dur - 0.2; k++) pts.push([k * 0.32 + 0.02, 0.05], [k * 0.32 + 0.22, 0.005]);
    pts.push([v.dur, 0]);
    v.ramp(g.gain, pts);
    v.play(n);
    // Chips skittering.
    for (let k = 0; k < 18; k++) click(v, v.out, hash1(k, 162) * (v.dur - 0.2), 4500, 4, 0.03, 0.01, k + 163);
    return v.handle();
  });

  // ======================================================== basement
  bus.define("pliers", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("basement", IR.basement!);
    const wet = v.gain(0.12);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    const t0 = ctx.cue.start;
    HEADS_OFF.forEach((h, k) => {
      const tau = h - t0;
      click(v, dry, tau - 0.04, 2400, 4, 0.05, 0.015, k + 200);
      click(v, dry, tau, 1600 + hash1(k, 201) * 600, 3, 0.08, 0.02, k + 240);
    });
    return v.handle();
  });

  bus.define("glue", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const t0 = ctx.cue.start;
    GLUED.forEach((gt, k) => {
      const tau = gt - t0;
      if (!v.ahead(tau)) return;
      const n = v.noise("pink", k + 300, false);
      const bp = v.filter("bandpass", 900 + hash1(k, 301) * 300, 5);
      const g = v.gain(0);
      v.chain(n, bp, g, v.out);
      v.hit(g.gain, tau - 0.06, 0.04, 0.01, 0.07);
      v.play(n, tau - 0.06, tau + 0.1);
      click(v, v.out, tau, 2200, 3, 0.04, 0.015, k + 340);
    });
    return v.handle();
  });

  bus.define("gun_handling", (ctx) => {
    // Rounds pressed into the magazine, magazine seated, slide racked.
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("basement", IR.basement!);
    const wet = v.gain(0.22);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    const t0 = ctx.cue.start;
    LOADED.forEach((lt, k) => {
      click(v, dry, lt - t0, 2900, 5, 0.12, 0.02, k + 400);
      strike(v, dry, lt - t0 + 0.005, 4100, [1, 1.6], 0.012, 0.05);
    });
    const mi = MAG_IN - t0;
    thump(v, dry, mi, 300, 160, 0.3, 0.04, 1200);
    click(v, dry, mi, 2200, 2, 0.25, 0.03, 410);
    const rk = RACK - t0;
    for (const [d, f] of [[0, 1700], [0.12, 2100], [0.2, 1900]] as const) {
      click(v, dry, rk + d, f, 2.5, 0.28, 0.035, 420 + d * 10);
      strike(v, dry, rk + d, 2600 + d * 900, [1, 2.4], 0.02, 0.07);
    }
    return v.handle();
  });

  bus.define("gunshot_room", (ctx) => {
    // 7.62 mm pistol in a 4 m concrete box: hard crack, chest-hitting body,
    // a wall of early reflections, then the ears ring.
    const v = new Voice(ctx, 0.0005);
    const p = payload(ctx);
    const first = (p.first as number) ?? 0;
    const rev = v.conv("basement", IR.basement!);
    const wet = v.gain(0.75);
    v.chain(rev, wet, v.out);
    const pre = v.gain(1);
    const sat = v.shaper(2.2);
    v.chain(pre, sat);
    sat.connect(v.out);
    sat.connect(rev);
    // Crack.
    const n = v.noise("white", 501, false);
    const hp = v.filter("highpass", 900, 0.7);
    const ng = v.gain(0);
    v.chain(n, hp, ng, pre);
    v.hit(ng.gain, 0, 0.95, 0.0008, 0.045);
    v.play(n, 0, 0.12);
    // Body.
    thump(v, pre, 0, 140, 45, 0.85, 0.22, 900);
    const n2 = v.noise("pink", 502, false);
    const bp = v.filter("bandpass", 450, 0.9);
    const g2 = v.gain(0);
    v.chain(n2, bp, g2, pre);
    v.hit(g2.gain, 0, 0.6, 0.002, 0.16);
    v.play(n2, 0, 0.3);
    // Slide cycling.
    click(v, pre, 0.035, 2600, 3, 0.18, 0.02, 503);
    strike(v, pre, 0.04, 3700, [1, 2.2, 3.3], 0.03, 0.09);
    // Tinnitus after the first shot: a thin tone that slowly lets go.
    if (first && v.ahead(0.15)) {
      const ring = v.osc("sine", 6150);
      const ring2 = v.osc("sine", 6177);
      const rg = v.gain(0);
      v.chain(ring, rg, v.out);
      ring2.connect(rg);
      v.ramp(rg.gain, [[0, 0], [0.25, 0.022], [3, 0.014], [v.dur - 0.5, 0.004], [v.dur, 0]]);
      v.play(ring, 0.1);
      v.play(ring2, 0.1);
    }
    return v.handle();
  });

  bus.define("bulb_swing", (ctx) => {
    // The bulb's flex creaking against its hook.
    const v = new Voice(ctx, 0.01);
    for (let k = 0; k < 7; k++) {
      const tau = 0.3 + k * 1.0;
      if (!v.ahead(tau)) continue;
      const o = v.osc("sawtooth", 420 + hash1(k, 601) * 80);
      const bp = v.filter("bandpass", 1300, 9);
      const g = v.gain(0);
      v.chain(o, bp, g, v.out);
      v.hit(g.gain, tau, 0.012 * (1 - k / 8), 0.05, 0.25);
      v.play(o, tau, tau + 0.4);
    }
    return v.handle();
  });

  bus.define("cloth", (ctx) => {
    const v = new Voice(ctx, 0.01);
    const n = v.noise("pink", 701);
    const bp = v.filter("bandpass", 1400, 0.8);
    const g = v.gain(0);
    v.chain(n, bp, g, v.out);
    const pts: Array<[number, number]> = [[0, 0]];
    for (let k = 0; k * 0.4 < v.dur; k++) pts.push([k * 0.4 + 0.08, 0.05 + hash1(k, 702) * 0.04], [k * 0.4 + 0.33, 0.01]);
    pts.push([v.dur, 0]);
    v.ramp(g.gain, pts);
    v.play(n);
    return v.handle();
  });

  bus.define("knife_meat", (ctx) => {
    const v = new Voice(ctx, 0.01);
    const n = v.noise("brown", 711);
    const bp = v.filter("bandpass", 380, 6);
    const g = v.gain(0);
    v.chain(n, bp, g, v.out);
    const pts: Array<[number, number]> = [[0, 0]];
    for (let k = 0; k * 0.45 < v.dur; k++) {
      pts.push([k * 0.45 + 0.05, 0.12], [k * 0.45 + 0.3, 0.02]);
      bp.frequency.setValueAtTime(320 + hash1(k, 712) * 200, Math.max(v.ac.currentTime, v.at(k * 0.45)));
    }
    pts.push([v.dur, 0]);
    v.ramp(g.gain, pts);
    v.play(n);
    // The blade finding a shard.
    click(v, v.out, v.dur * 0.7, 3800, 6, 0.06, 0.015, 713);
    return v.handle();
  });

  bus.define("shards", (ctx) => {
    const v = new Voice(ctx, 0.002);
    for (let k = 0; k < 14; k++) click(v, v.out, hash1(k, 801) * 0.35, 3600 + hash1(k, 802) * 2400, 5, 0.05 * (1 - k / 16), 0.012, k + 803);
    return v.handle();
  });

  bus.define("pack_case", (ctx) => {
    const v = new Voice(ctx, 0.002);
    for (let k = 0; k < 32; k++) click(v, v.out, (k / 31) * (v.dur - 0.1), 1900 + hash1(k, 901) * 500, 4, 0.05, 0.012, k + 902);
    return v.handle();
  });

  bus.define("case_close", (ctx) => {
    const v = new Voice(ctx, 0.002);
    const rev = v.conv("basement", IR.basement!);
    const wet = v.gain(0.3);
    v.chain(rev, wet, v.out);
    const dry = v.gain(1);
    dry.connect(v.out);
    dry.connect(rev);
    thump(v, dry, 0, 160, 80, 0.45, 0.09, 700);
    click(v, dry, 0.0, 1500, 2, 0.2, 0.03, 951);
    click(v, dry, 0.22, 2600, 4, 0.18, 0.02, 952);
    click(v, dry, 0.3, 2900, 4, 0.18, 0.02, 953);
    return v.handle();
  });

  void TEST_SHOTS;
}

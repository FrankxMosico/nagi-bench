import type { SoundCue } from "@agentbench/cinematic-player";
import { B, C, E, S, W } from "../timeline";
import { voiceCues } from "../voice";

/**
 * The film's sound cue sheet. Groups: amb (beds), sfx (foley and effects),
 * suit (inside the helmet), radio (comms beds) and music.
 */

/**
 * Mix calibration, measured with the offline renderer (tools/audio-render):
 * linear trims that bring each synthesised sound to its target level —
 * beds around -30..-36 dBFS RMS, foley peaks -26..-16 dBFS, the basement
 * gunshots into the master limiter on purpose.
 */
const LEVEL: Record<string, number> = {
  amb_hutong: 0.7,
  amb_room: 2.0,
  fluoro_hum: 2.7,
  amb_basement: 1.2,
  amb_station: 1.9,
  suit_bed: 2.7,
  breath: 3.0,
  mus_reveal: 1.6,
  mus_solitude: 1.5,
  mus_tension: 1.15,
  mus_flight: 2.2,
  mus_coda: 1.25,
  pigeon_whistle: 4.3,
  bike_bell: 3.1,
  gate_creak: 3.0,
  chair_creak: 5.3,
  tea_pour: 10,
  glass_slide: 4.5,
  phone_taps: 7,
  phone_ring: 3.1,
  click: 3.0,
  phone_bed: 3.2,
  fluoro_on: 1.4,
  machine_door: 2.2,
  beep: 1.6,
  lathe_motor: 1.25,
  coolant: 3.5,
  lathe_cut: 5.0,
  clinks: 1.25,
  brush: 3.6,
  ratchet_clunk: 2.0,
  chain_pull: 9,
  pliers: 3.5,
  glue: 10,
  tip_press: 6.7,
  mag_load: 6,
  mag_insert: 2.2,
  slide_rack: 2.5,
  tinnitus: 1.25,
  cloth: 3.0,
  knife_meat: 10,
  grit: 3.2,
  rounds_clink: 2.7,
  case_latch: 2.2,
  velcro: 3.2,
  strap_click: 1.7,
  beacon_beeps: 1.7,
  hud_chime: 2.7,
  thruster: 2.0,
  chatter_bed: 4.0,
  radio_bed: 3.3,
  glove_ring: 1.8,
  hud_alarm: 2.7,
  pocket: 3.5,
  mag_vac: 1.7,
  heartbeat: 0.7,
  radio_alarm: 1.4,
  radio_off: 4.5,
  broadcast_bed: 6.6,
  lens_set: 2.2,
};

let n = 0;
function cue(sound: string, start: number, end: number, opts: { group?: string; gain?: number; sustain?: boolean; payload?: unknown } = {}): SoundCue {
  n++;
  return {
    id: `snd-${String(n).padStart(3, "0")}-${sound}`,
    kind: "sound",
    sound,
    group: opts.group ?? "sfx",
    gain: (opts.gain ?? 1) * (LEVEL[sound] ?? 1),
    sustain: opts.sustain ?? false,
    start,
    end,
    payload: opts.payload,
  };
}

const steps = (start: number, end: number, interval: number, surface: string, level = 1) =>
  cue("footsteps", start, end, { payload: { interval, surface, level } });

const cues: SoundCue[] = [
  /* ---------------------------------------------------------- prologue */
  cue("mus_open", 0, 15.0, { group: "music", sustain: true }),
  cue("pigeon_whistle", 13.4, 19.6, { group: "amb", gain: 0.8, payload: { peak: 0.6 } }),

  /* ---------------------------------------------------------- hutong */
  cue("amb_hutong", 15.0, 22.6, { group: "amb", sustain: true }),
  steps(15.05, C.gateOpen - 0.4, 0.4, "lane"),
  cue("bike_bell", 17.3, 18.6, { gain: 0.8 }),
  cue("pigeon_whistle", 18.2, 24.0, { group: "amb", gain: 0.45, payload: { peak: 0.4 } }),
  cue("gate_creak", C.gateOpen, C.gateOpen + 1.6),

  /* ---------------------------------------------------------- the collector */
  cue("amb_room", 22.0, 105.8, { group: "amb", sustain: true }),
  steps(C.enter - 0.1, 24.8, 0.4, "stone", 0.8),
  cue("chair_creak", C.rise, C.rise + 0.6),
  // the flock passing over the courtyard, heard through the paper window
  cue("pigeon_whistle", 44.0, 51.0, { group: "amb", gain: 0.35, payload: { peak: 0.5, muffled: true } }),
  cue("pigeon_whistle", 74.5, 81.0, { group: "amb", gain: 0.28, payload: { peak: 0.45, muffled: true } }),
  steps(C.rise + 0.8, 29.2, 0.4, "stone", 0.7),
  cue("tea_pour", C.pour[0], C.pour[0] + 2.2),
  cue("porcelain", 33.1, 33.6),
  steps(29.6, 31.0, 0.4, "stone", 0.7),
  cue("chair_creak", 31.0, 31.6),
  cue("chair_creak", 33.4, 34.0),
  cue("porcelain", 58.2, 58.8, { payload: { level: 0.6 } }),
  cue("porcelain", 62.0, 62.6),
  cue("chair_creak", C.toCase[0], C.toCase[0] + 0.6),
  steps(C.toCase[0] + 0.2, C.toCase[1], 0.42, "stone", 0.7),
  cue("glass_slide", C.glassSlide, C.glassSlide + 0.9),
  cue("stone_set", C.stoneOut, C.stoneOut + 0.5, { payload: { level: 0.5 } }),
  steps(86.6, 87.5, 0.42, "stone", 0.7),
  ...C.stonesDown.map((t) => cue("stone_set", t, t + 0.5)),
  cue("chair_creak", 90.4, 91.0),
  cue("phone_taps", C.phoneOut + 0.2, C.phoneOut + 0.9, { payload: { count: 3 } }),
  cue("phone_taps", 100.0, 101.8, { payload: { count: 9 } }),
  cue("pay_chime", C.pay, C.pay + 0.6),
  cue("mus_irony", 101.0, 106.2, { group: "music", sustain: true }),

  /* ---------------------------------------------------------- workshop */
  cue("amb_workshop", 105.8, 132.0, { group: "amb", sustain: true }),
  steps(105.9, 111.2, 0.45, "concrete", 0.8),
  cue("phone_ring", W.ring, W.answer),
  cue("click", W.answer, W.answer + 0.3, { payload: { freq: 2500, level: 0.02 } }),
  cue("click", W.hangUp, W.hangUp + 0.3, { payload: { freq: 2500, level: 0.02 } }),
  cue("click", W.lightOn, W.lightOn + 0.6, { payload: { freq: 1800, level: 0.07 } }),
  cue("fluoro_on", W.lightOn + 0.02, W.lightOn + 1.0),
  cue("fluoro_hum", W.lightOn + 0.5, W.lightOff, { group: "amb", sustain: true }),
  steps(W.lightOn + 0.05, W.lightOn + 0.5, 0.42, "concrete", 0.6),
  cue("clamp", W.clamp, W.clamp + 1.0),
  cue("machine_door", W.doorClose - 0.4, W.doorClose + 0.1),
  cue("beep", W.start, W.start + 0.3, { payload: { freq: 1760, len: 0.14, level: 0.025 } }),
  cue("lathe_motor", W.start, W.cut[1] + 0.6, { sustain: true }),
  cue("lathe_cut", W.cut[0], W.cut[1], { sustain: true }),
  cue("coolant", W.cut[0] - 0.1, W.cut[1], { sustain: true }),
  cue("clinks", W.drops[0], W.drops[1] + 0.3, { payload: { count: 12 } }),
  cue("machine_door", W.cut[1] + 0.2, W.cut[1] + 0.7),
  cue("brush", W.sweep[0], W.sweep[1]),
  cue("ratchet_clunk", W.toolOut, W.toolOut + 1.0),
  cue("click", W.lightOff, W.lightOff + 0.6, { payload: { freq: 1800, level: 0.07 } }),
  steps(W.lightOff + 0.05, 132.0, 0.45, "concrete", 0.6),

  /* ---------------------------------------------------------- basement */
  cue("amb_basement", 132.0, B.shots[0], { group: "amb", sustain: true }),
  cue("chain_pull", B.chain, B.chain + 0.5),
  ...B.pulls.map((t) => cue("pliers", t, t + 0.4)),
  cue("glue", B.glue, B.glue + 0.6),
  cue("tip_press", B.tips - 0.3, B.tips + 0.4),
  ...B.load.map((t, k) => cue("mag_load", t, t + 0.4, { payload: { n: k } })),
  cue("mag_insert", B.insert, B.insert + 0.6),
  cue("slide_rack", B.rack, B.rack + 0.7),
  ...B.shots.map((t) => cue("gunshot_room", t, t + 1.4, { gain: 0.6 })),
  cue("tinnitus", B.tinnitus[0], B.tinnitus[1], { group: "sfx" }),
  cue("amb_basement", B.tinnitus[0], B.tinnitus[1], { group: "amb", sustain: true, payload: { muffled: true } }),
  cue("amb_basement", B.tinnitus[1] - 0.3, B.chainOff, { group: "amb", sustain: true }),
  cue("cloth", B.unwrap[0], B.unwrap[1]),
  cue("knife_meat", B.knife[0], B.knife[1]),
  cue("grit", 158.4, 159.4),
  cue("rounds_clink", 164.0, 166.0),
  cue("case_latch", B.caseLatch, B.caseLatch + 0.5),
  cue("chain_pull", B.chainOff, B.chainOff + 0.5),
  cue("mus_low", 158.6, 167.5, { group: "music", sustain: true }),

  /* ---------------------------------------------------------- Base One */
  cue("amb_station", S.cabin, S.helmetOn + 0.1, { group: "amb", sustain: true }),
  cue("velcro", S.locatorOff, S.locatorOff + 0.5),
  cue("strap_click", S.locatorStrap, S.locatorStrap + 0.3),
  cue("helmet_seal", S.helmetOn, S.helmetOn + 1.0, { group: "suit" }),
  cue("amb_station", S.helmetOn + 0.1, S.depress[0], { group: "amb", sustain: true, payload: { helmet: true } }),
  cue("suit_bed", S.helmetOn + 0.2, 301.0, { group: "suit", sustain: true }),
  cue("beacon_beeps", S.airlock, S.depress[1], { gain: 0.9 }),
  cue("depress_hiss", S.depress[0], S.depress[1]),
  cue("hud_chime", S.airlockGreen, S.airlockGreen + 0.5, { group: "suit", payload: { up: true } }),
  cue("conducted_rumble", S.outerOpen[0], S.outerOpen[1] + 0.2, { group: "suit", payload: { level: 0.1 } }),
  cue("mus_reveal", 180.6, 191.4, { group: "music", sustain: true }),

  /* ---------------------------------------------------------- orbit */
  cue("breath", S.helmetOn + 0.6, 255.0, { group: "suit", sustain: true, payload: { style: "calm", amp: 0.8 } }),
  cue("thruster", S.arrivePuff[0], S.arrivePuff[1], { group: "suit", payload: { level: 0.07 } }),
  cue("mus_solitude", 191.0, 207.0, { group: "music", sustain: true, payload: { motif: 10.8 } }),
  cue("mus_tension", 207.0, 264.6, { group: "music", sustain: true }),
  cue("breath", 255.0, 266.4, { group: "suit", sustain: true, payload: { style: "tense", amp: 1 } }),
  cue("glove_ring", S.gloveTwist[0], S.gloveTwist[0] + 1.3, { group: "suit" }),
  cue("hud_alarm", S.gloveOff + 0.1, 301.0, { group: "suit", sustain: true }),
  cue("hud_alarm", 304.4, S.gloveOn, { group: "suit", sustain: true, payload: { quiet: true } }),
  cue("thruster", S.turn[0], S.turn[0] + 0.35, { group: "suit", payload: { level: 0.05 } }),
  cue("pocket", S.gunOut - 0.3, S.gunOut, { group: "suit" }),
  cue("magnet", S.scopeMount, S.scopeMount + 0.3, { group: "suit" }),
  cue("thruster", S.aim[0], S.aim[0] + 0.3, { group: "suit", payload: { level: 0.045 } }),
  cue("breath", 266.4, 278.2, { group: "suit", sustain: true, payload: { style: "hold", amp: 1 } }),
  ...S.fire.map((t) => cue("gun_vac", t, t + 1.6, { group: "suit", payload: { count: 10, step: S.fireStep } })),
  ...S.magOut.map((t) => cue("mag_vac", t, t + 0.2, { group: "suit" })),
  ...S.magIn.map((t) => cue("mag_vac", t, t + 0.2, { group: "suit" })),
  cue("breath", 278.4, 301.0, { group: "suit", sustain: true, payload: { style: "shallow", amp: 0.6 } }),
  cue("heartbeat", 278.6, 301.0, { group: "suit", sustain: true, payload: { bpm: 54 } }),
  cue("mus_flight", 278.4, 301.0, { group: "music", sustain: true }),
  // 301.0 – 304.4: total silence. The impacts make no sound at all.
  cue("breath", 304.4, 307.4, { group: "suit", payload: { style: "release", amp: 1 } }),
  cue("suit_bed", 304.4, 334.6, { group: "suit", sustain: true }),
  cue("breath", 307.4, 322.0, { group: "suit", sustain: true, payload: { style: "tense", amp: 0.8 } }),
  cue("radio_alarm", S.retreat, S.radioOff, { group: "radio", sustain: true }),
  cue("radio_off", S.radioOff, S.radioOff + 0.3, { group: "radio" }),
  cue("glove_on", S.gloveOn, S.gloveOn + 1.0, { group: "suit" }),
  cue("thruster", S.depart[0] - 1.2, S.depart[0] - 0.7, { group: "suit", payload: { level: 0.05 } }),
  cue("thruster", S.depart[0], S.depart[1], { group: "suit", sustain: true, payload: { level: 0.08 } }),
  cue("breath", 322.0, 334.6, { group: "suit", sustain: true, payload: { style: "calm", amp: 0.7 } }),
  cue("mus_coda", 322.0, 334.6, { group: "music", sustain: true }),

  /* ---------------------------------------------------------- epilogue */
  cue("amb_room", 334.6, 351.2, { group: "amb", sustain: true, payload: { morning: true } }),
  cue("pigeon_whistle", 335.0, 343.0, { group: "amb", gain: 0.25, payload: { peak: 0.5 } }),
  cue("news_jingle", E.radioOn, E.radioOn + 1.0, { group: "radio" }),
  cue("lens_set", E.pause + 0.3, E.pause + 0.7),
  cue("mus_end", 345.6, 356.0, { group: "music", sustain: true }),
];

/** Comms beds generated straight from the voice manifest, so they cannot drift. */
const BEDS: Record<string, string> = {
  radio: "radio_bed",
  chatter: "chatter_bed",
  phone: "phone_bed",
  broadcast: "broadcast_bed",
};
for (const v of voiceCues) {
  const sound = BEDS[v.kind];
  if (!sound) continue;
  cues.push({
    id: `bed-${v.id}`,
    kind: "sound",
    sound,
    group: "radio",
    gain: LEVEL[sound] ?? 1,
    sustain: true,
    start: Math.max(0, v.start - 0.08),
    end: v.end + 0.12,
  });
}

export const soundCues: SoundCue[] = cues;

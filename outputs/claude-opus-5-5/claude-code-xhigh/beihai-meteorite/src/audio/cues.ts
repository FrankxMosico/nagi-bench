import type { SoundCue } from "@agentbench/cinematic-player";
import { TEST_SHOTS } from "../sets/basement";

/**
 * The sound timeline. Long multi-event cues are `sustain` so that seeking or
 * resuming inside them rebuilds the remaining events at the right offset;
 * single transients are not.
 */

let n = 0;
function cue(sound: string, start: number, end: number, group: string, gain = 1, payload?: Record<string, unknown>, sustain = false): SoundCue {
  n += 1;
  return { id: `sfx-${String(n).padStart(3, "0")}-${sound}`, kind: "sound", sound, group, gain, start, end, sustain, payload };
}

export function buildSoundCues(): SoundCue[] {
  n = 0;
  const c: SoundCue[] = [];
  const add = (...x: SoundCue[]) => c.push(...x);

  // ---------------------------------------------------------------- cold open (inside the suit)
  add(
    cue("suit_fan", 0, 26, "suit", 1, {}, true),
    cue("breath", 0, 26, "suit", 1, { rate: 0.21, depth: 0.9 }, true),
    cue("pad", 0, 26, "music", 1, { notes: [73.42, 110, 146.83, 174.61], level: 0.035, fadeIn: 5, fadeOut: 1.2, cut: 900 }, true),
    cue("suit_conduct", 13.0, 14.3, "suit", 0.8, { kind: "rustle" }),
    cue("suit_conduct", 16.3, 16.8, "suit", 0.5, { kind: "ratchet" }),
    cue("suit_conduct", 19.6, 20.1, "suit", 0.5, { kind: "ratchet" }),
  );
  // ---------------------------------------------------------------- title
  add(
    cue("boom", 26.6, 31.6, "music", 1),
    cue("theme", 27.0, 33.0, "music", 1, { notes: [440, 587.33, 659.26, 698.46], times: [0.5, 1.4, 2.3, 3.6], level: 0.06 }),
  );
  // ---------------------------------------------------------------- hutong
  add(
    cue("hutong", 33, 41, "amb", 1, {}, true),
    cue("radio_news", 33.1, 41, "amb", 1, { wall: 1, jingle: 1 }, true),
    cue("pigeon_whistle", 33.6, 40.6, "amb", 1),
    cue("steps", 33.2, 40.4, "sfx", 1, { rate: 1.8, level: 0.2, bright: 0.45, space: "alley" }, true),
    cue("bike_bell", 36.6, 38.0, "amb", 1),
  );
  // ---------------------------------------------------------------- the collector's room
  add(
    cue("room_tone", 41, 126, "amb", 1, { level: 0.05, cut: 220, hum: 50 }, true),
    cue("clock", 41, 126, "amb", 1, {}, true),
    cue("radio_news", 41, 50.4, "amb", 1.3, { wall: 0, jingle: 0 }, true),
    cue("knob", 50.35, 50.7, "sfx", 1),
    cue("door_creak", 41.8, 43.2, "sfx", 1),
    cue("steps", 42.4, 44.4, "sfx", 1, { rate: 1.6, level: 0.16, bright: 0.6, space: "room" }),
    cue("wood", 45.8, 46.5, "sfx", 1, { f: 480 }),
    cue("steps", 47.2, 49.2, "sfx", 1, { rate: 2.0, level: 0.12, bright: 0.25, space: "room" }),
    cue("steps", 48.4, 56.8, "sfx", 1, { rate: 1.1, level: 0.12, bright: 0.6, space: "room" }, true),
    cue("steps", 51.8, 55.0, "sfx", 1, { rate: 2.0, level: 0.11, bright: 0.25, space: "room" }),
    cue("wood", 55.3, 55.9, "sfx", 1, { f: 380 }),
    cue("wood", 56.8, 57.4, "sfx", 1, { f: 430 }),
    cue("pour", 58.4, 60.6, "sfx", 1),
    cue("porcelain", 61.5, 62.3, "sfx", 1),
    cue("wood", 98.2, 98.7, "sfx", 0.8, { f: 400 }),
    cue("steps", 98.8, 100.6, "sfx", 1, { rate: 2.0, level: 0.11, bright: 0.25, space: "room" }),
    cue("glass_cabinet", 100.9, 101.7, "sfx", 1, { open: 1 }),
    cue("glass_cabinet", 107.5, 108.2, "sfx", 1, { open: 0 }),
    cue("steps", 108.0, 109.8, "sfx", 1, { rate: 2.0, level: 0.11, bright: 0.25, space: "room" }),
    cue("porcelain", 108.9, 109.6, "sfx", 0.7),
    cue("stones_down", 109.8, 110.8, "sfx", 1),
    cue("wood", 112.9, 113.4, "sfx", 0.8, { f: 380 }),
    cue("phone", 113.9, 114.8, "sfx", 1, {}),
    cue("phone", 120.7, 121.4, "sfx", 1, { chime: 1 }),
    cue("tension", 119.4, 127.6, "music", 1, { f0: 41.2, level: 0.03, cut: 380, throb: 0.4 }, true),
  );
  // ---------------------------------------------------------------- workshop
  add(
    cue("room_tone", 126, 152, "amb", 1, { level: 0.07, cut: 140 }, true),
    cue("fluoro", 126.4, 152, "sfx", 1, {}, true),
    cue("cnc", 126.8, 138.4, "sfx", 1, {}, true),
    cue("drops", 137.2, 146.0, "sfx", 1, {}, true),
    cue("steps", 144.9, 145.7, "sfx", 1, { rate: 1.8, level: 0.14, bright: 0.5, space: "workshop" }),
    cue("brush", 145.6, 147.0, "sfx", 1),
    cue("knob", 147.2, 147.6, "sfx", 0.8),
    cue("steps", 149.2, 150.1, "sfx", 1, { rate: 1.8, level: 0.14, bright: 0.5, space: "workshop" }),
  );
  // ---------------------------------------------------------------- basement
  add(
    cue("room_tone", 152, 196, "amb", 1, { level: 0.05, cut: 200, hum: 120, drip: 1 }, true),
    cue("pliers", 152.4, 157.6, "sfx", 1, {}, true),
    cue("glue", 158.6, 163.4, "sfx", 1, {}, true),
    cue("gun_handling", 164.8, 169.0, "sfx", 1, {}, true),
    ...TEST_SHOTS.map((s, k) => cue("gunshot_room", s, k === 0 ? s + 6.5 : s + 1.4, "sfx", 0.8, { first: k === 0 ? 1 : 0 })),
    cue("bulb_swing", 171.6, 179.0, "sfx", 1),
    cue("steps", 176.4, 178.6, "sfx", 1, { rate: 1.8, level: 0.15, bright: 0.4, space: "basement" }),
    cue("cloth", 180.2, 182.4, "sfx", 1),
    cue("knife_meat", 182.8, 184.8, "sfx", 1),
    cue("shards", 185.3, 185.9, "sfx", 1),
    cue("steps", 187.4, 188.6, "sfx", 1, { rate: 1.8, level: 0.15, bright: 0.4, space: "basement" }),
    cue("pack_case", 188.9, 191.2, "sfx", 1, {}, true),
    cue("case_close", 194.3, 195.2, "sfx", 1),
  );
  // ---------------------------------------------------------------- orbit
  add(
    cue("suit_fan", 196, 300, "suit", 1, {}, true),
    cue("suit_fan", 302.6, 352, "suit", 1, {}, true),
    cue("breath", 196, 266, "suit", 1, { rate: 0.2, depth: 0.9 }, true),
    cue("breath", 266, 300, "suit", 1, { rate: 0.2, depth: 1.1, hold: [2.0, 99] }, true),
    cue("breath", 302.6, 318, "suit", 1, { rate: 0.32, depth: 1.15, shaky: 1 }, true),
    cue("breath", 318, 352, "suit", 1, { rate: 0.19, depth: 0.8 }, true),
    cue("pad", 196, 228.5, "music", 1, { notes: [73.42, 110, 146.83, 174.61], level: 0.045, fadeIn: 5, fadeOut: 3, cut: 1000 }, true),
    cue("shimmer", 223.5, 229.2, "music", 1, {}, true),
    cue("tension", 230.4, 272.2, "music", 1, { f0: 55, level: 0.045, cut: 650, throb: 0.7 }, true),
    cue("suit_conduct", 250.2, 251.3, "suit", 0.8, { kind: "rustle" }),
    cue("suit_conduct", 255.9, 256.5, "suit", 1, { kind: "ratchet" }),
    cue("suit_conduct", 256.6, 257.9, "suit", 1, { kind: "vent" }),
    cue("suit_alarm", 256.7, 260.2, "suit", 1),
    cue("suit_conduct", 258.5, 259.6, "suit", 0.7, { kind: "rustle" }),
    cue("suit_conduct", 259.9, 260.5, "suit", 1, { kind: "velcro" }),
    cue("suit_conduct", 261.6, 262.0, "suit", 0.7, { kind: "magnet" }),
    cue("suit_conduct", 265.4, 265.9, "suit", 1.2, { kind: "magnet" }),
    cue("heartbeat", 267.4, 300.0, "suit", 1, { bpm0: 64, bpm1: 90 }, true),
    cue("volley", 272.0, 279.0, "suit", 1, {}, true),
    cue("flight", 278.0, 300.0, "music", 1, {}, true),
    cue("tension", 304.0, 318.4, "music", 1, { f0: 41.2, level: 0.05, cut: 520, throb: 0.25 }, true),
    cue("radio_alert", 319.0, 326.4, "radio", 1, {}, true),
    cue("thruster_own", 323.5, 352, "suit", 1, {}, true),
    cue("pad", 326, 351, "music", 1, { notes: [73.42, 110, 146.83, 220, 277.18], level: 0.05, fadeIn: 5, fadeOut: 7, cut: 1400 }, true),
    cue("theme", 328, 352, "music", 1, { notes: [440, 587.33, 659.26, 698.46, 587.33, 293.66], times: [1.2, 3.2, 5.2, 8.0, 12.5, 17.5], level: 0.05 }),
  );
  return c;
}

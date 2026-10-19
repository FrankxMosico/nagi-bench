import { mix, numTrack, sat, smooth } from "./core/anim";

/**
 * The film's master clocks. Picture and sound both derive from these, so a
 * muzzle flash, a felt recoil thump and the impact ten seconds later can
 * never drift apart, whether the viewer plays straight through or seeks.
 */

export const DURATION = 352;

/**
 * Story time in orbit. The cold open (film 0–26 s) is the same continuous
 * moment that resumes at film 196 s, so story time runs 170→196 there. The ten
 * seconds of bullet flight are stretched into twenty-two seconds of film
 * (subjective time) and then snap back to real speed for the impacts.
 */
export const FLIGHT_FILM_START = 278;
export const FLIGHT_FILM_END = 300;
const FLIGHT_STORY_SPAN = 4; // story seconds that elapse during the stretched shot

export function spaceS(t: number): number {
  if (t < 26) return t + 170;
  if (t < 196) return 196;
  if (t < FLIGHT_FILM_START) return t;
  if (t < FLIGHT_FILM_END) return FLIGHT_FILM_START + ((t - FLIGHT_FILM_START) * FLIGHT_STORY_SPAN) / (FLIGHT_FILM_END - FLIGHT_FILM_START);
  return t - (FLIGHT_FILM_END - FLIGHT_FILM_START - FLIGHT_STORY_SPAN);
}

/** Inverse of spaceS for story moments after the cold open. */
export function filmT(S: number): number {
  if (S < FLIGHT_FILM_START) return S;
  if (S < FLIGHT_FILM_START + FLIGHT_STORY_SPAN) return FLIGHT_FILM_START + ((S - FLIGHT_FILM_START) * (FLIGHT_FILM_END - FLIGHT_FILM_START)) / FLIGHT_STORY_SPAN;
  return S + (FLIGHT_FILM_END - FLIGHT_FILM_START - FLIGHT_STORY_SPAN);
}

/** Sunset phase (0 = lower limb touching Earth, 1 = gone) over story time. */
export const sunPhase = numTrack(
  [
    [170, 0.0],
    [196, 0.1],
    [226, 0.5],
    [246, 0.67],
    [278, 0.8],
    [282, 0.82],
    [300, 0.97],
    [308, 1.0],
  ],
  (x) => x,
);

// ---------------------------------------------------------------- firing

export const SHOT_INTERVAL = 0.155;
export const FIRE_GROUPS = [
  { start: 272.0, target: 0 },
  { start: 274.3, target: 1 },
  { start: 276.6, target: 2 },
] as const;
export const RELOADS = [273.4, 275.7] as const;

export interface Bullet {
  index: number;
  fired: number; // story time
  arrives: number; // story time
  /** Person index in the photo group that it strikes, or -1 for a miss. */
  victim: number;
  /** Local hit point on the victim (metres, figure frame), or wall point for a miss. */
  local: [number, number, number];
  /** Passes through and bursts the thruster pack. */
  pack?: boolean;
  /** Shatters the visor. */
  visor?: boolean;
}

export const FLIGHT_TIME = 10;

/** Shots in story time. */
export const SHOT_TIMES: number[] = FIRE_GROUPS.flatMap((g) => Array.from({ length: 10 }, (_, i) => g.start + i * SHOT_INTERVAL));

/** Film time of each shot (all before the stretched flight begins). */
export const SHOT_FILM_TIMES: number[] = SHOT_TIMES.map((s) => filmT(s));
export const IMPACT_FILM_TIMES: number[] = SHOT_TIMES.map((s) => filmT(s + FLIGHT_TIME));

export const MAG_DROP = RELOADS.map((r) => r + 0.1);

/** Countdown helper for the shot list: fraction of flight elapsed for the first round. */
export function flightProgress(S: number): number {
  return sat((S - SHOT_TIMES[0]!) / FLIGHT_TIME);
}

export function lerpPhase(a: number, b: number, t: number): number {
  return mix(a, b, smooth(t));
}

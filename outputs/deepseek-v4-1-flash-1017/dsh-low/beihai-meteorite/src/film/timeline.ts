/** Absolute film timeline, in seconds. Hard limit: 360. */
export const FILM_DURATION = 354;

export const SHOT = {
  cold: [0, 13],
  hutongExt: [13, 22],
  hutongWide: [22, 38],
  recognition: [38, 52],
  ask: [52, 72],
  iron: [72, 100],
  depart: [100, 110],
  broadcastEarth: [110, 120],
  broadcastElevator: [120, 130],
  broadcastYard: [130, 140],
  appointment: [140, 162],
  workshop: [162, 190],
  basement: [190, 226],
  evaDepart: [226, 248],
  evaWait: [248, 268],
  aim: [268, 286],
  fire: [286, 296.5],
  impact: [296.5, 316],
  retreat: [316, 338],
  credits: [338, 354],
} as const;

/** Ten rounds, magazine, ten rounds, magazine, ten rounds. */
function burst(start: number, count: number, gap: number): number[] {
  return Array.from({ length: count }, (_, i) => Number((start + i * gap).toFixed(3)));
}

export const FIRE_TIMES: number[] = [
  ...burst(286.8, 10, 0.135),
  ...burst(289.15, 10, 0.135),
  ...burst(291.5, 10, 0.135),
];

export const MAGAZINE_TIMES = [288.85, 291.2];

/** First impact arrives after roughly ten seconds of vacuum flight. */
export const IMPACT_TIMES = FIRE_TIMES.map((t) => Number((t + 10).toFixed(3)));
export const IMPACT_START = IMPACT_TIMES[0];

/**
 * Master timeline of 《尘世之外》 (seconds, absolute). Shots, set animation,
 * voice cues and sound cues all read their beats from here so a retime in one
 * place moves picture and sound together.
 */
export const DURATION = 356;

export const SEQ = {
  prologue: [0, 15],
  collector: [15, 105.8],
  workshop: [105.8, 132],
  basement: [132, 168],
  space: [168, 334.6],
  epilogue: [334.6, 356],
} as const;

/* -------------------------------------------------------------- prologue */
export const P = {
  streak: [8.6, 11.8] as const,
  title: [9.0, 14.0] as const,
};

/* ------------------------------------------------------------- collector */
export const C = {
  gateOpen: 20.6,
  enter: 22.6,
  lookUp: 25.4,
  rise: 26.6,
  pour: [31.0, 33.0] as const,
  cupRaise: [59.0, 62.2] as const,
  laugh: [63.8, 66.9] as const,
  toCase: [79.4, 81.2] as const,
  glassSlide: 81.4,
  stoneOut: 82.0,
  stonesDown: [87.6, 88.4, 89.2] as const,
  phoneOut: 93.0,
  pay: 102.0,
};

/* -------------------------------------------------------------- workshop */
export const W = {
  ring: 106.0,
  answer: 106.9,
  hangUp: 115.4,
  lightOn: 115.6,
  clamp: 116.4,
  doorClose: 117.6,
  start: 118.2,
  cut: [119.4, 127.0] as const,
  counter: [121.8, 124.4] as const,
  drops: [124.6, 127.2] as const,
  sweep: [127.6, 129.0] as const,
  toolOut: 129.4,
  lightOff: 131.0,
};

/* -------------------------------------------------------------- basement */
export const B = {
  chain: 132.6,
  pulls: [136.2, 137.0, 137.7, 138.3, 138.8, 139.2, 139.55, 139.85] as const,
  glue: 140.4,
  tips: 141.0,
  load: [141.9, 142.4, 142.9, 143.4] as const,
  insert: 144.1,
  rack: 144.7,
  shots: [145.8, 146.35, 146.9, 147.45] as const,
  tinnitus: [147.5, 151.6] as const,
  unwrap: [152.9, 154.8] as const,
  knife: [155.0, 157.6] as const,
  caseLatch: 166.6,
  chainOff: 167.4,
};

/* ----------------------------------------------------------------- space */
export const S = {
  cabin: 168.0,
  locatorOff: 169.2,
  locatorStrap: 170.4,
  helmetOn: 173.4,
  airlock: 175.0,
  depress: [175.4, 179.6] as const,
  airlockGreen: 179.8,
  outerOpen: [180.2, 181.4] as const,
  vista: 181.6,
  arrivePuff: [182.4, 183.4] as const,
  sunTouch: 207.0,
  scopeRaise: [210.6, 212.0] as const,
  lookSun: [218.4, 221.6] as const,
  sunHalf: 219.0,
  green: 223.0,
  doorOpen: [224.0, 225.6] as const,
  emerge: 225.8,
  emergeStep: 0.16,
  emergeDur: 4.6,
  sunTwoThirds: 238.0,
  visorClear: 244.0,
  scopeFaces: [250.0, 255.0] as const,
  gloveTwist: [255.4, 256.2] as const,
  gloveOff: 256.6,
  turn: [258.6, 261.2] as const,
  gunOut: 261.8,
  scopeGrab: 262.4,
  scopeMount: 263.2,
  aim: [264.4, 266.0] as const,
  fire: [268.4, 271.2, 274.6] as const,
  fireStep: 0.135,
  magOut: [269.95, 272.8] as const,
  magIn: [270.55, 273.4] as const,
  impact: { T1: 301.0, B1: 301.25, T3: 301.6, B2: 302.0, T2: 303.9 },
  scream: [306.8, 309.0] as const,
  retreat: 309.2,
  doorClose: [316.6, 317.6] as const,
  red: 317.4,
  radioOff: 317.8,
  gunStow: [318.6, 319.4] as const,
  gloveCatch: 320.0,
  gloveOn: 320.6,
  depart: [323.0, 333.0] as const,
  sunGone: 315.0,
};

/* -------------------------------------------------------------- epilogue */
export const E = {
  radioOn: 334.8,
  pause: 337.4,
  endTitle: [351.4, 355.6] as const,
};

/** Every muzzle time of the climax, in firing order (target group 0..2). */
export function shotTimes(): Array<{ t: number; group: number; index: number }> {
  const out: Array<{ t: number; group: number; index: number }> = [];
  for (let g = 0; g < 3; g++) {
    for (let j = 0; j < 10; j++) out.push({ t: S.fire[g]! + j * S.fireStep, group: g, index: j });
  }
  return out;
}

/** Sun position along its set: 0 = touching the limb, 0.5 = half, 1 = gone. */
export function sunsetPhase(t: number): number {
  const keys: Array<[number, number]> = [
    [150, -0.9],
    [S.sunTouch, 0],
    [S.sunHalf, 0.5],
    [S.sunTwoThirds, 0.66],
    [300, 0.86],
    [S.sunGone, 1.0],
    [340, 1.25],
  ];
  if (t <= keys[0]![0]) return keys[0]![1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [ta, va] = keys[i]!;
    const [tb, vb] = keys[i + 1]!;
    if (t <= tb) return va + ((t - ta) / (tb - ta)) * (vb - va);
  }
  return keys[keys.length - 1]![1];
}

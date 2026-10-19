// Geometry of the Water-Powered Armillary Clock Tower (水运仪象台) mechanism.
// Units: metres. World: y up. The tower "front" faces +x.
// The water wheel (枢轮) turns in the y-z plane. For escapement design we use
// wheel-plane coordinates (u, v, n): u = -z (towards the filling side),
// v = +y, n = +x (axle direction). (u, v, n) is right-handed, so a positive
// rotation about +x is counter-clockwise in the (u, v) plane.

export type V3 = [number, number, number];

export const G = 9.81;

export const WHEEL = { x: 0.8, y: 2.4, z: 0.0 };
export const wp = (u: number, v: number, n = 0): V3 => [WHEEL.x + n, WHEEL.y + v, WHEEL.z - u];

export const N_SCOOP = 12;
export const PITCH = (Math.PI * 2) / N_SCOOP;
export const R_HINGE = 1.4;
export const R_RIM = 1.36; // visual rim
// scoop box (local, relative to hinge, unrotated frame where opening faces +v)
export const SCOOP = {
  len: 0.5, // radial length
  floorY: -0.16, // floor centre
  floorHalf: 0.02,
  wallTop: 0.16,
  halfN: 0.22,
  wall: 0.02,
  mass: 2.0,
  droop: -0.1, // lower joint limit (rad), scoop hangs this far below wheel frame
  lift: 0.25, // upper joint limit (free to be lifted by the fork)
};

// Teeth ring for the upper lock (天关)
export const TEETH = { n: 0.42, rMid: 1.51, halfR: 0.06, halfT: 0.025, halfN: 0.04 };

// 天关 / 天衡 (upper balance lever).
export const LEVER_N = 0.6; // plane of the levers and chain (in front of the teeth ring)
export const TIANHENG = {
  // The lock tip is a cylinder (axis along n) whose centre, when seated, is
  // 3 cm below the lever's pivot line. The tooth pushes horizontally, so its
  // push presses the lock into its seat; only after the chain has lifted the
  // lock more than 3 cm (a genuine trip) does the push start to help it up.
  pivot: { u: 1.4, v: 1.535 },
  tip: { u: 0.03, v: 1.505, r: 0.03 },
  // slack in the chain: the jolt of a scoop landing on the fork can't reach the lock
  ropeSlack: 0.025,
  ropeU: 2.2,
  ropeV: 1.62,
  massLock: 0.35,
  massBeam: 0.4,
  massCounter: 0.0,
  beamV: 1.68,
  maxLift: 0.3, // rad
};

// 枢衡 / 格叉 / 枢权 (lower weighing lever with checking fork & counterweight).
// The fork arm leans outward from a pivot below the scoop, so when the scoop
// outweighs the counterweight the fork tip swings down AND outward and the
// scoop slips off it.
export const SHUHENG = {
  pivot: { u: 1.6, v: -0.8 },
  forkU: 1.83,
  forkV: -0.225,
  forkR: 0.025,
  forkN0: -0.12,
  ropeU: 2.2,
  ropeV: -0.75,
  counterU: 1.3,
  counterV: -0.85,
  massCounter: 1.2,
  massBeam: 1.0,
  maxSwing: 0.45, // rad
};

// Water jet from the constant-level tank (平水壶) spout
export const SPOUT = { u: 1.98, v: 0.56, n: 0.0, vu: -0.62, vv: -0.3, rate: 9 };
export const DROP = { r: 0.05, density: 1000 };

// Sump (退水壶)
export const SUMP = { x0: 0.3, x1: 1.3, z0: -2.1, z1: 0.75, y0: 0.0, y1: 0.42 };

// Main transmission: crown (地轂) on the wheel axle meshing with a lantern
// pinion on the vertical shaft (天柱).
export const SHAFT = { x: -0.5, z: 0.0, y0: 2.75, y1: 10.5, r: 0.07 };
// Equal pitch radii: pins and rungs stay in register over the whole mesh.
export const CROWN = { n: -0.7, rho: 0.6, count: 24, halfLen: 0.06, pinR: 0.03, discN: -0.6 };
export const LANTERN_B = { y: WHEEL.y + 0.6, r: 0.6, count: 24, halfLen: 0.12, rungR: 0.028 };

// Celestial globe (浑象) and armillary sphere (浑仪): polar axis tilted to the
// latitude of Kaifeng (~35°), pointing north (-z).
export const LAT = (35 * Math.PI) / 180;
export const POLAR: V3 = [0, Math.sin(LAT), -Math.cos(LAT)];
export const EQ_E: V3 = [0, Math.cos(LAT), Math.sin(LAT)]; // x̂ × d
export const EQ_F: V3 = [1, 0, 0]; // d × e

function driveGeometry(cy: number, c: number, rho: number, rl: number) {
  // contact point P is the lantern rung nearest the crown (behind the shaft)
  const pz = SHAFT.z - rl;
  const off: V3 = [0, -Math.sin(LAT) * c + Math.cos(LAT) * rho, Math.cos(LAT) * c + Math.sin(LAT) * rho];
  const center: V3 = [SHAFT.x, cy, pz - off[2]];
  const P: V3 = [SHAFT.x, cy + off[1], pz];
  const C: V3 = [center[0] - POLAR[0] * c, center[1] - POLAR[1] * c, center[2] - POLAR[2] * c];
  return { center, P, C, c, rho, rl };
}

export const GLOBE = { radius: 0.62, count: 16, pinHalf: 0.1, pinR: 0.03, ...driveGeometry(7.75, 0.92, 0.45, 0.45) };
export const ARMIL = { radius: 0.95, count: 16, pinHalf: 0.1, pinR: 0.03, ...driveGeometry(10.55, 1.15, 0.45, 0.45) };

// Time-keeping jacks (报时木阁)
export const JACK = {
  plaqueY: 5.05,
  plaqueR: 1.42,
  drumPinY: 5.86,
  bellPinY: 5.56,
  pinR: 1.3,
  drumAngle: 0.5, // around shaft (rad), positive = towards -z (screen right from front)
  bellAngle: -0.5,
};

export const FLOORS = { mech: 4.55, jack: 6.75, platform: 9.25 };

// damping / misc tuning knobs (overridable from the test harness)
export const TUNE = { wheelDamp: 5, thDamp: 0.3, shDamp: 1.0, scoopDamp: 0.5, hz: 240, iters: 8 };

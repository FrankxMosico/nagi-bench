import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import { easeInOut, easeOut, mix, range, sat, smooth, wobble } from "./core/anim";
import { resetFX, type SetName, type World } from "./world";
import { EARTH_ANGLE, EARTH_DIR, SUNSET_AXIS, sunDirection } from "./sets/sky";
import { HATCH, STATION_CENTRE } from "./sets/station";
import { BASE1_DIR, type Focus, type SpaceOpts } from "./sets/space";
import { SHOT_TIMES, spaceS, sunPhase } from "./story";
import { TEST_SHOTS } from "./sets/basement";

/**
 * The cut. Each shot owns an interval of absolute film time and, every frame,
 * fully specifies the camera, which set is lit, and the overlay state.
 */

interface A {
  w: World;
  t: number;
  lt: number;
  p: number;
  d: number;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const lv = (a: THREE.Vector3, b: THREE.Vector3, k: number) => a.clone().lerp(b, k);

function shot(id: string, start: number, end: number, set: SetName, fn: (a: A) => void): Shot<World> {
  return {
    id,
    start,
    end,
    update: ({ context: w, time, localTime, progress }) => {
      resetFX(w.fx);
      w.show(set);
      fn({ w, t: time, lt: localTime, p: progress, d: end - start });
    },
  };
}

/** Fade in over `fin` from the shot start and out over `fout` before its end. */
function fades(a: A, fin: number, fout: number): void {
  let f = 0;
  if (fin > 0) f = Math.max(f, 1 - smooth(a.lt / fin));
  if (fout > 0) f = Math.max(f, smooth((a.lt - (a.d - fout)) / fout));
  a.w.fx.fade = Math.max(a.w.fx.fade, f);
}

function spaceShot(a: A, focus: Focus, cam: () => { pos: THREE.Vector3; target: THREE.Vector3; fov: number; roll?: number }, opts: SpaceOpts = {}): void {
  const { w, t } = a;
  w.space.update(t, focus);
  const c = cam();
  w.look(c.pos, c.target, c.fov, c.roll ?? 0);
  w.space.frameCamera(t, w.camera, focus, opts);
  w.fx.exposure = 1.0;
  w.fx.bloom = 0.75;
  w.fx.bloomThreshold = 1.25;
  w.fx.tint = -0.15;
}

/** Breathing sway of a hand-held sight, in radians. */
function sway(t: number, amp: number): [number, number] {
  return [wobble(t, 0.45, 3) * amp + Math.sin(t * 1.6) * amp * 0.4, wobble(t, 0.38, 7) * amp];
}

function scopeShot(a: A, target: THREE.Vector3, fov: number, label: string, swayAmp = 1.2e-5): void {
  spaceShot(a, "group", () => {
    const eye = a.w.space.eye();
    const [sx, sy] = sway(a.t, swayAmp);
    // Recoil: a sharp jolt with every round fired.
    const S = spaceS(a.t);
    let kick = 0;
    for (const s of SHOT_TIMES) if (S >= s && S < s + 0.25) kick += Math.exp(-(S - s) * 16) * 4e-5;
    const dir = target.clone().sub(eye);
    const dist = dir.length();
    const right = new THREE.Vector3().crossVectors(dir, V(0, 1, 0)).normalize();
    const tgt = target.clone().addScaledVector(right, sx * dist).add(V(0, (sy + kick) * dist, 0));
    return { pos: eye, target: tgt, fov };
  }, { fill: 0.3 });
  a.w.fx.scope = 1;
  a.w.fx.scopeLabel = label;
  a.w.fx.bloom = 0.5;
  a.w.fx.bloomThreshold = 1.6;
  a.w.fx.vignette = 0.2;
}

/**
 * Place the camera so a subject of `height` metres fills the frame, seen from
 * direction `from` (subject → camera). `right` shifts the subject off-centre
 * by that fraction of the frame height (positive = subject sits right).
 */
function frameOn(subject: THREE.Vector3, from: THREE.Vector3, height: number, fov: number, right = 0, up = 0): { pos: THREE.Vector3; target: THREE.Vector3; fov: number } {
  const dir = from.clone().normalize();
  const dist = height / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2));
  const pos = subject.clone().addScaledVector(dir, dist);
  const fwd = dir.clone().negate();
  const r = new THREE.Vector3().crossVectors(fwd, V(0, 1, 0)).normalize();
  const target = subject.clone().addScaledVector(r, -right * height).add(V(0, -up * height, 0));
  return { pos, target, fov };
}

const titleCard = (text: string, sub: string | undefined, opacity: number, style: "title" | "place" | "credit") => ({ text, sub, opacity, style });

export function buildShots(): Shot<World>[] {
  const shots: Shot<World>[] = [];
  const add = (s: Shot<World>) => shots.push(s);

  // ==================================================================== COLD OPEN
  add(shot("a1-silhouette", 0, 9.5, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const S = spaceS(a.t);
      const sd = sunDirection(sunPhase(S));
      const head = V(0, 1.55, 0);
      const side = new THREE.Vector3().crossVectors(sd, V(0, 1, 0)).normalize();
      const dist = mix(9.5, 7.8, easeInOut(a.p));
      // The helmet sits just left of the sun, silhouetted against the limb.
      const pos = head.clone().addScaledVector(sd, -dist).addScaledVector(side, -dist * Math.tan(THREE.MathUtils.degToRad(2.6))).add(V(0, -0.35, 0));
      const target = pos.clone().addScaledVector(sd, 50).add(V(0, -2.2, 0));
      return { pos, target, fov: 22 };
    }, { fill: 0.15 });
    fades(a, 4.2, 0);
    a.w.fx.card = titleCard("同步轨道", "黄河空间站外 五公里", sat(range(a.lt, 4.0, 5.2)) * (1 - sat(range(a.lt, 8.2, 9.3))), "place");
  }));
  add(shot("a2-visor", 9.5, 16, "space", (a) => {
    spaceShot(a, "hand", () => frameOn(a.w.space.eye().add(V(0, -0.12, 0)), V(0.75, 0.05, -0.85), mix(0.85, 0.72, easeOut(a.p)), 28, 0.12), { fill: 1.6 });
  }));
  add(shot("a3-scope-hatch", 16, 26, "space", (a) => {
    scopeShot(a, V(HATCH.x, HATCH.y + 0.4, HATCH.z), mix(0.42, 0.2, easeInOut(range(a.lt, 0.5, 7))), "5 012 m");
    fades(a, 0.25, 1.0);
  }));
  // ==================================================================== TITLE
  add(shot("title", 26, 33, "black", (a) => {
    a.w.fx.fade = 1;
    a.w.fx.card = titleCard("尘世之外", undefined, sat(range(a.lt, 0.8, 2.6)) * (1 - sat(range(a.lt, 5.4, 6.6))), "title");
  }));

  // ==================================================================== HUTONG
  add(shot("b1-alley", 33, 41, "alley", (a) => {
    a.w.alley.update(a.t);
    const pos = V(-0.15, 0.6, 3.4).lerp(V(-0.05, 0.75, 2.2), easeInOut(a.p));
    a.w.look(pos, V(0.7, 1.75, -14), 38);
    a.w.fx.exposure = 1.05;
    a.w.fx.bloom = 0.6;
    a.w.fx.tint = 0.35;
    fades(a, 1.4, 0);
    a.w.fx.card = titleCard("四个月前", "北京", sat(range(a.lt, 0.8, 1.8)) * (1 - sat(range(a.lt, 4.6, 5.6))), "place");
  }));

  const roomShot = (id: string, s: number, e: number, cam: (a: A) => { pos: THREE.Vector3; target: THREE.Vector3; fov: number }, extra?: (a: A) => void) =>
    add(shot(id, s, e, "room", (a) => {
      a.w.room.update(a.t);
      const c = cam(a);
      a.w.look(c.pos, c.target, c.fov);
      a.w.fx.exposure = 1.05;
      a.w.fx.bloom = 0.55;
      a.w.fx.bloomThreshold = 0.9;
      a.w.fx.tint = 0.4;
      extra?.(a);
    }));

  const R = (a: A) => a.w.room;
  roomShot("b2-doorway", 41, 46.4, (a) => {
    const co = R(a).collector.headWorld();
    const pos = co.clone().add(V(0.62, 0.42, -0.7)).lerp(co.clone().add(V(0.55, 0.4, -0.62)), a.p);
    return { pos, target: V(-2.2, 0.95, 2.3), fov: 44 };
  });
  roomShot("b3-greeting", 46.4, 50.4, (a) => frameOn(R(a).collector.headWorld().add(V(0, -0.35, 0)), V(-1, 0.12, 0.55), 1.7, 34));
  roomShot("b4-cabinets-ots", 50.4, 54.6, (a) => {
    const zh = R(a).zhang.headWorld();
    return { pos: zh.clone().add(V(-0.75, 0.28, 2.1)), target: zh.clone().add(V(0.55, -0.3, -1.6)), fov: 38 };
  });
  roomShot("b4b-stones", 54.6, 58.2, (a) => ({ pos: V(-0.45, 1.36, -0.55).lerp(V(-0.15, 1.34, -0.6), a.p), target: V(0.25, 1.22, -2.2), fov: 26 }));
  roomShot("b5-pour", 58.2, 64.2, (a) => frameOn(V(0, 1.0, 0.2), V(0, 0.3, 1), mix(1.5, 1.38, a.p), 40));
  roomShot("b6-ots-collector", 64.2, 70.4, (a) => frameOn(R(a).collector.headWorld(), V(-1, 0.14, 0.42), 1.15, 30, 0.2));
  roomShot("b7-ots-zhang", 70.4, 74.4, (a) => frameOn(R(a).zhang.headWorld(), V(1, 0.14, -0.38), 1.15, 30, -0.2));
  roomShot("b8-other-worlds", 74.4, 81.6, (a) => {
    const st = R(a).heldStone.position.clone();
    const co = R(a).collector.headWorld();
    return frameOn(st.lerp(co, 0.45), V(-0.5, 0.02, 0.86), mix(0.95, 0.8, easeInOut(a.p)), 26, 0.06);
  });
  roomShot("b9-teacup", 81.6, 92.4, (a) => frameOn(R(a).zhang.headWorld().add(V(0, -0.12, 0)), V(0.85, 0.1, 0.52), mix(1.05, 0.9, easeInOut(a.p)), 28, -0.12));
  roomShot("b10-laugh", 92.4, 98.2, (a) => frameOn(R(a).collector.headWorld().add(V(0, -0.1, 0)), V(-0.8, 0.14, 0.62), 1.25, 32, 0.1));
  roomShot("b11-cabinet-wide", 98.2, 103.8, (a) => ({ pos: V(1.9, 1.62, 2.15).lerp(V(1.7, 1.58, 2.0), a.p), target: V(-2.0, 0.95, -0.45), fov: 48 }));
  roomShot("b11b-iron", 103.8, 109.4, (a) => frameOn(R(a).collector.headWorld().add(V(0, -0.25, 0)), V(0.8, 0.3, 0.55), 1.35, 32, -0.12));
  roomShot("b12-three-stones", 109.4, 113.6, (a) => ({ pos: V(-0.02, 1.12, 0.78).lerp(V(-0.04, 1.06, 0.7), easeInOut(a.p)), target: V(-0.04, 0.84, 0.31), fov: 30 }));
  roomShot("b13-phone", 113.6, 116.2, (a) => frameOn(R(a).zhang.headWorld().add(V(0, -0.28, 0)), V(0.8, 0.28, 0.55), 1.05, 30));
  roomShot("b14-awkward", 116.2, 121.0, (a) => frameOn(R(a).collector.headWorld(), V(-0.85, 0.1, 0.52), 0.8, 26, 0.08));
  roomShot("b15-respect", 121.0, 126.0, (a) => frameOn(R(a).zhang.headWorld().add(V(0, -0.08, 0)), V(0.9, 0.0, 0.45), mix(0.95, 0.75, easeInOut(a.p)), 24, 0.14), (a) => fades(a, 0, 0.7));

  // ==================================================================== WORKSHOP
  const wsShot = (id: string, s: number, e: number, cam: (a: A) => { pos: THREE.Vector3; target: THREE.Vector3; fov: number }, extra?: (a: A) => void) =>
    add(shot(id, s, e, "workshop", (a) => {
      a.w.workshop.update(a.t);
      const c = cam(a);
      a.w.look(c.pos, c.target, c.fov);
      a.w.fx.exposure = 1.1;
      a.w.fx.bloom = 0.6;
      a.w.fx.tint = -0.45;
      extra?.(a);
    }));
  wsShot("c1-lights-on", 126, 131, (a) => ({ pos: V(5.8, 4.1, 6.2).lerp(V(5.4, 3.9, 5.8), a.p), target: V(0, 0.9, 0), fov: 40 }));
  wsShot("c2-machine", 131, 134, (a) => ({ pos: V(0.46, 1.1, 0.8).lerp(V(0.4, 1.08, 0.7), a.p), target: V(0, 1.06, 0), fov: 34 }));
  wsShot("c2b-drill", 134, 137, (a) => ({ pos: V(0.2, 0.92, 0.26).lerp(V(0.17, 0.91, 0.22), a.p), target: V(0.01, 0.88, 0.0), fov: 30 }));
  wsShot("c3-tray", 137, 145, (a) => ({ pos: V(-1.58, 1.0, 1.18).lerp(V(-1.6, 0.97, 1.15), a.p), target: V(-1.7, 0.8, 1.0), fov: 26 }));
  wsShot("c4-tool", 145, 149, (a) => frameOn(a.w.workshop.zhang.headWorld().add(V(0, -0.3, 0)), V(-0.45, 0.1, -1), 1.4, 34, 0.1));
  wsShot("c5-lights-off", 149, 152, () => ({ pos: V(5.4, 3.9, 5.8), target: V(0, 0.9, 0), fov: 40 }), (a) => fades(a, 0, 0.5));

  // ==================================================================== BASEMENT
  const bmShot = (id: string, s: number, e: number, cam: (a: A) => { pos: THREE.Vector3; target: THREE.Vector3; fov: number; roll?: number }, extra?: (a: A) => void) =>
    add(shot(id, s, e, "basement", (a) => {
      a.w.basement.update(a.t);
      const c = cam(a);
      // Concussion: the frame jumps with each shot.
      let shake = 0;
      for (const s0 of TEST_SHOTS) if (a.t >= s0 && a.t < s0 + 0.5) shake += Math.exp(-(a.t - s0) * 9);
      const jitter = V(wobble(a.t, 30, 1) * 0.02 * shake, wobble(a.t, 30, 2) * 0.02 * shake, 0);
      a.w.look(c.pos.clone().add(jitter), c.target, c.fov, c.roll ?? 0);
      a.w.fx.exposure = 1.2;
      a.w.fx.bloom = 0.7;
      a.w.fx.bloomThreshold = 0.85;
      a.w.fx.tint = 0.25;
      a.w.fx.flash = a.w.basement.flash(a.t) * 0.55;
      extra?.(a);
    }));
  bmShot("d1-heads", 152, 158, (a) => ({ pos: V(-0.42, 1.18, -0.5).lerp(V(-0.46, 1.12, -0.44), a.p), target: V(-0.52, 0.78, 0.12), fov: 32 }), (a) => fades(a, 0.6, 0));
  bmShot("d2-meteor-tips", 158, 164, (a) => ({ pos: V(-0.18, 0.86, -0.24).lerp(V(-0.26, 0.85, -0.2), a.p), target: V(-0.56, 0.79, 0.08), fov: 24 }));
  bmShot("d3-load", 164, 170, (a) => ({ pos: V(-0.02, 1.26, -1.02).lerp(V(-0.08, 1.27, -0.92), a.p), target: V(-0.38, 1.26, 0.4), fov: 34 }));
  bmShot("d4a-aim", 170, 172.0, () => ({ pos: V(-0.87, 1.5, -1.34), target: V(0.65, 1.1, -0.4), fov: 48 }));
  bmShot("d4b-reverse", 172.0, 174.2, () => ({ pos: V(1.35, 1.2, -1.05), target: V(-0.25, 1.36, 0.4), fov: 36 }));
  bmShot("d4c-ringing", 174.2, 176.4, (a) => ({ pos: V(-0.87, 1.5, -1.34).lerp(V(-0.8, 1.52, -1.28), a.p), target: V(0.4, 1.35, -0.3), fov: 48 }));
  bmShot("d5-holes", 176.4, 180.2, (a) => ({ pos: V(1.66, 1.02, -0.5).lerp(V(1.62, 1.0, -0.58), a.p), target: V(1.52, 0.93, -1.12), fov: 32 }));
  bmShot("d6-open", 180.2, 184.6, () => ({ pos: V(1.85, 1.42, -0.4), target: V(1.5, 0.86, -1.15), fov: 36 }));
  bmShot("d7-palm", 184.6, 188.6, (a) => {
    const z = a.w.basement.zhang;
    const hand = z.anchorWorld("handL");
    const f = V(Math.sin(z.root.rotation.y), 0, Math.cos(z.root.rotation.y));
    const r = new THREE.Vector3().crossVectors(f, V(0, 1, 0)).normalize();
    const close = hand.clone().addScaledVector(f, 0.55).addScaledVector(r, -0.18).add(V(0, 0.2, 0));
    const k = smooth(range(a.lt, 0, 1.6));
    const pos = V(0.6, 1.5, -0.2).lerp(close, k);
    return { pos, target: hand.clone().add(V(0, 0.12, 0)), fov: 32 };
  });
  bmShot("d8-pack", 188.6, 191.2, () => ({ pos: V(0.3, 1.15, -0.38), target: V(-0.06, 0.78, 0.27), fov: 32 }));
  bmShot("d9-tip", 191.2, 196, (a) => ({ pos: V(0.14, 0.92, 0.05).lerp(V(0.1, 0.89, 0.1), easeInOut(a.p)), target: V(-0.06, 0.785, 0.27), fov: 20 }), (a) => {
    a.w.fx.exposure = 1.45;
    // The case lid swings over the lens; then silence and black.
    a.w.fx.fade = Math.max(a.w.fx.fade, smooth(range(a.t, 194.25, 194.75)));
  });

  // ==================================================================== ORBIT: WAITING
  add(shot("e1-panorama", 196, 203, "space", (a) => {
    spaceShot(a, "wide", () => {
      const pos = V(-700, 380, -7400).lerp(V(-680, 372, -7300), a.p);
      const target = STATION_CENTRE.clone().addScaledVector(EARTH_DIR, 2600).add(V(0, -300, 0));
      return { pos, target, fov: 46 };
    }, { fill: 0.5 });
    fades(a, 1.6, 0);
  }));
  add(shot("e2-orbit", 203, 216, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const ang = mix(-0.55, 0.65, easeInOut(a.p));
      const r = 3.3;
      const pos = V(Math.sin(ang) * r, 1.35 + 0.25 * Math.sin(a.p * 3), -Math.cos(ang) * r);
      return { pos, target: V(0, 1.05, 0), fov: 32 };
    });
  }));
  add(shot("e3-face", 216, 224, "space", (a) => {
    spaceShot(a, "zhang", () => frameOn(a.w.space.eye().add(V(0, -0.06, 0)), V(0.42, 0.02, -1), mix(0.78, 0.62, a.p), 24, -0.1), { fill: 1.5 });
  }));
  add(shot("e4-ring", 224, 228, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const S = spaceS(a.t);
      const sd = sunDirection(sunPhase(S));
      const eye = a.w.space.eye();
      const pos = eye.clone().add(V(-0.35, 0.16, -0.55));
      return { pos, target: pos.clone().addScaledVector(sd, 100).add(V(0, -2.6, 0)), fov: 26 };
    }, { fill: 0.4 });
  }));

  // ==================================================================== THE HATCH
  add(shot("f1-lamp", 228, 233, "space", (a) => {
    scopeShot(a, V(HATCH.x - 1.6, HATCH.y + 1.2, HATCH.z), 0.16, "5 012 m");
  }));
  add(shot("f2-emerge", 233, 240, "space", (a) => {
    spaceShot(a, "group", () => ({ pos: V(10, 3.4, -5026).lerp(V(9.2, 3.2, -5024.5), a.p), target: V(0.2, 1.5, -5034), fov: 40 }), { fill: 0.25 });
  }));
  add(shot("f3-earth", 240, 246, "space", (a) => {
    spaceShot(a, "wide", () => {
      // Along the limb, away from the glare: the ocean mirror and the clouds.
      const axis = SUNSET_AXIS.clone().applyAxisAngle(EARTH_DIR, 0.8);
      const ang = EARTH_ANGLE * 0.86;
      const dir = EARTH_DIR.clone().multiplyScalar(Math.cos(ang)).addScaledVector(axis, Math.sin(ang)).normalize();
      const pos = V(0, 900, 300);
      return { pos, target: pos.clone().addScaledVector(dir, 100), fov: mix(10, 8.6, a.p), roll: 0.35 };
    }, { fill: 0 });
    a.w.fx.bloom = 0.7;
  }));
  add(shot("f4-visors", 246, 250, "space", (a) => {
    const k = easeInOut(range(a.lt, 0.4, 3.6));
    const t1 = a.w.space.photo.targets[0];
    a.w.space.update(a.t, "group");
    const face = t1.actor.faceWorld();
    const tgt = V(0, 1.25, -5001).lerp(face, k);
    scopeShot(a, tgt, mix(0.13, 0.026, k), "5 008 m");
  }));

  // ==================================================================== THE GLOVE AND THE GUN
  const Z = (a: A) => a.w.space.zhang;
  add(shot("g1-release", 250, 254, "space", (a) => {
    spaceShot(a, "hand", () => frameOn(a.w.space.eye().add(V(0, -0.2, -0.12)), V(0.8, 0.12, -0.62), 1.0, 30, 0.1), { fill: 1.8 });
  }));
  add(shot("g2-glove", 254, 257.6, "space", (a) => {
    spaceShot(a, "hand", () => {
      const hand = Z(a).anchorWorld("handR").lerp(Z(a).anchorWorld("handL"), 0.5);
      return frameOn(hand.add(V(0, 0.05, 0)), V(0.85, 0.2, -0.55), 1.05, 30, -0.05);
    }, { fill: 1.9 });
  }));
  add(shot("g2b-hud", 257.6, 258.6, "space", (a) => {
    spaceShot(a, "hand", () => {
      const eye = a.w.space.eye();
      const hand = Z(a).anchorWorld("handR");
      return { pos: eye.clone().add(V(0, 0.02, -0.06)), target: hand.clone().lerp(eye.clone().add(V(0.2, -0.3, -2)), 0.35), fov: 52 };
    }, { fill: 1.6 });
    a.w.fx.hud = 1;
    a.w.fx.hudLines = ["O₂  87%", "生命维持  10:41:07", "外部  -103°C"];
    a.w.fx.hudWarn = "右手外层手套 · 已解除";
  }));
  add(shot("g3-sunlight", 258.6, 262.6, "space", (a) => {
    spaceShot(a, "hand", () => {
      const S = spaceS(a.t);
      const sd = sunDirection(sunPhase(S));
      const hand = Z(a).anchorWorld("handR");
      return frameOn(hand.lerp(a.w.space.eye(), 0.35), sd.clone().add(V(0, 0.3, 0)), mix(1.5, 1.3, a.p), 30, -0.12);
    }, { fill: 0.6 });
  }));
  add(shot("g4-mount", 262.6, 267.4, "space", (a) => {
    spaceShot(a, "hand", () => {
      const p = a.w.space.pistol.root.position.clone();
      return frameOn(p.add(V(0, 0.05, 0)), V(0.55, -0.05, -1), mix(1.05, 0.9, a.p), 28, 0.08);
    }, { fill: 1.9 });
  }));
  add(shot("g5-ots", 267.4, 270.2, "space", (a) => {
    spaceShot(a, "hand", () => {
      const m = a.w.space.muzzle();
      const pos = m.clone().add(V(0.14, 0.08, 0.46)).lerp(m.clone().add(V(0.12, 0.07, 0.4)), a.p);
      return { pos, target: V(0, 1.4, -5000), fov: 20 };
    }, { fill: 1.6 });
  }));
  add(shot("g6-crosshair", 270.2, 272.0, "space", (a) => {
    const t1 = a.w.space.photo.targets[0];
    a.w.space.update(a.t, "group");
    scopeShot(a, t1.actor.chestWorld().add(V(0, 0.1, 0)), 0.034, "5 008 m", 0.6e-5);
  }));

  // ==================================================================== FIRE
  add(shot("h1-fire", 272.0, 273.6, "space", (a) => {
    spaceShot(a, "hand", () => {
      const p = a.w.space.pistol.root.position.clone();
      return frameOn(p.add(V(0, 0.05, 0)), V(0.95, 0.12, -0.35), 0.95, 30, 0.12);
    }, { fill: 1.5 });
  }));
  add(shot("h2-reload", 273.6, 275.0, "space", (a) => {
    spaceShot(a, "hand", () => {
      const p = a.w.space.pistol.root.position.clone();
      return frameOn(p.add(V(0, -0.05, 0)), V(0.6, -0.15, -0.8), 0.7, 28);
    }, { fill: 1.9 });
  }));
  add(shot("h3-scope-fire", 275.0, 276.8, "space", (a) => {
    const [, t2, t3] = a.w.space.photo.targets;
    a.w.space.update(a.t, "group");
    const k = smooth(range(a.lt, 0.9, 1.5));
    scopeShot(a, t2.actor.chestWorld().lerp(t3.actor.chestWorld(), k).add(V(0, 0.1, 0)), 0.05, "5 008 m", 0.8e-5);
  }));
  add(shot("h4-firefly", 276.8, 278.0, "space", (a) => {
    // From beside the station: only black, stars, and a firefly blinking 5 km away.
    spaceShot(a, "wide", () => ({ pos: V(14, 6.5, -5032), target: V(0, 1.45, 0), fov: 4.5 }), { fill: 0, fireflyPx: 9 });
    a.w.fx.bloom = 1.0;
    a.w.fx.bloomThreshold = 0.9;
  }));

  // ==================================================================== TEN SECONDS
  const bulletCam = (a: A, lead: number, fov: number, off = 1) => {
    const sp = a.w.space;
    sp.update(a.t, "wide");
    const path = sp.bulletPath(0);
    const S = spaceS(a.t);
    const f = sat((S - path.fired) / (path.arrives - path.fired));
    const pos = path.from.clone().lerp(path.to, f);
    const dir = path.to.clone().sub(path.from).normalize();
    const camPos = pos.clone().addScaledVector(dir, -lead).add(V(0.009 * off, 0.011 * off, 0));
    a.w.look(camPos, pos.clone().addScaledVector(dir, 60), fov, 0, 0.004);
    sp.frameCamera(a.t, a.w.camera, "wide", { fill: 0.6 });
    a.w.fx.exposure = 1.0;
    a.w.fx.bloom = 0.8;
    a.w.fx.desat = 0.25;
    a.w.fx.tint = -0.3;
  };
  add(shot("i1-bullet", 278.0, 284.0, "space", (a) => bulletCam(a, 0.07, 34)));
  add(shot("i2-waiting", 284.0, 290.5, "space", (a) => {
    a.w.space.update(a.t, "group");
    const [t1, t2] = a.w.space.photo.targets;
    const k = smooth(range(a.lt, 3.2, 5.8));
    scopeShot(a, t1.actor.chestWorld().lerp(t2.actor.chestWorld(), 0.5 * k).add(V(0, 0.25, 0)), 0.06, "5 008 m", 0.5e-5);
    a.w.fx.desat = 0.35;
  }));
  add(shot("i3-eye", 290.5, 295.0, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const eye = a.w.space.eye();
      return frameOn(eye.clone().add(V(0, -0.08, -0.12)), V(1, 0.06, 0.12), mix(0.95, 0.85, a.p), 22, 0.1);
    }, { fill: 0.6 });
    a.w.fx.desat = 0.3;
  }));
  add(shot("i4-bullet-final", 295.0, 300.0, "space", (a) => bulletCam(a, 0.2, mix(10, 6, a.p), 0.5)));

  // ==================================================================== IMPACT
  add(shot("j1-impact", 300.0, 303.0, "space", (a) => {
    a.w.space.update(a.t, "group");
    scopeShot(a, V(0, 1.2, -5000.6), 0.05, "5 008 m", 0.3e-5);
  }));
  add(shot("j2-near", 303.0, 306.2, "space", (a) => {
    spaceShot(a, "group", () => ({ pos: V(2.8, 1.9, -4993.5).lerp(V(2.5, 1.85, -4994.2), a.p), target: V(-0.2, 1.15, -5000.8), fov: 36 }), { fill: 0.5 });
  }));
  add(shot("j3-mouth", 306.2, 309.4, "space", (a) => {
    a.w.space.update(a.t, "group");
    const sc = a.w.space.photo.screamer;
    scopeShot(a, sc.actor.faceWorld(), 0.012, "5 006 m", 0.4e-5);
  }));
  add(shot("j4-retreat", 309.4, 312.0, "space", (a) => {
    spaceShot(a, "group", () => ({ pos: V(13, 6, -4987).lerp(V(12, 5.6, -4988), a.p), target: V(0, 1.6, -5030), fov: 46 }), { fill: 0.3 });
  }));
  add(shot("j5-gone", 312.0, 320.6, "space", (a) => {
    a.w.space.update(a.t, "group");
    scopeShot(a, V(0, 1.6, -5020), mix(0.2, 0.28, a.p), "5 012 m", 0.8e-5);
  }));

  // ==================================================================== HOME
  add(shot("k1-turn", 320.6, 326.0, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const z = a.w.space.zhang.root.position;
      return { pos: z.clone().add(V(1.9, 1.5, -2.2)).lerp(z.clone().add(V(2.2, 1.6, -1.2)), a.p), target: z.clone().add(V(0, 1.05, 0)), fov: 32 };
    }, { fill: 0.7 });
  }));
  add(shot("k2-night-earth", 326.0, 335.0, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const z = a.w.space.zhang.root.position;
      const back = z.clone().normalize().negate();
      const fwd = back.clone().negate();
      const pos = z.clone().addScaledVector(back, mix(7, 14, a.p)).add(V(-2.2, 1.6, 0));
      const target = z.clone().addScaledVector(fwd, 60).add(EARTH_DIR.clone().multiplyScalar(60)).add(V(0, -8, 0));
      return { pos, target, fov: 46 };
    }, { fill: 0.5 });
  }));
  add(shot("k3-calm", 335.0, 341.0, "space", (a) => {
    spaceShot(a, "zhang", () => {
      const eye = a.w.space.eye();
      const side = new THREE.Vector3().crossVectors(BASE1_DIR, V(0, 1, 0)).normalize();
      return frameOn(eye.add(V(0, -0.06, 0)), BASE1_DIR.clone().addScaledVector(side, -0.45).add(V(0, 0.05, 0)), mix(0.8, 0.68, a.p), 24, -0.12);
    }, { fill: 1.4 });
  }));
  add(shot("k4-pullback", 341.0, 352.0, "space", (a) => {
    spaceShot(a, "wide", () => {
      const z = a.w.space.zhang.root.position.clone();
      const back = BASE1_DIR.clone().negate();
      const k = easeInOut(range(a.lt, 0, 8));
      const pos = z.clone().addScaledVector(back, mix(14, 90, k)).add(V(mix(-2.2, -14, k), mix(1.6, 10, k), 0));
      const target = z.clone().addScaledVector(BASE1_DIR, 60).add(EARTH_DIR.clone().multiplyScalar(mix(60, 75, k))).add(V(0, -8, 0));
      return { pos, target, fov: 46 };
    }, { fill: 0.5, beaconPx: 2.2 });
    a.w.fx.fade = smooth(range(a.lt, 5.4, 7.4));
    a.w.fx.card = titleCard("尘世之外", "改编自 刘慈欣《三体Ⅱ·黑暗森林》", sat(range(a.lt, 6.8, 8.0)) * (1 - sat(range(a.lt, 10.0, 10.9))), "credit");
  }));

  return shots;
}

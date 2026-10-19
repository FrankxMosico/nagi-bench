import * as THREE from "three";
import { float, type Pose } from "@agentbench/voxel-kit";
import { Actor } from "../cast/actors";
import { SUIT_OFFICIAL, SUIT_STATION, crowdFace, suitTexture, type SuitSpec, type Expression } from "../cast/skins";
import { blendPose, easeInOut, hash1, mix, mulberry32, range, sat, smooth, wobble } from "../core/anim";
import { ParticleLayer } from "../core/particles";
import { makeBackpack, makeCamera } from "../props";
import { FIRE_GROUPS, FLIGHT_TIME, SHOT_INTERVAL, type Bullet } from "../story";
import { HATCH, WALL_Z } from "./station";

/**
 * The Yellow River delegation and its photographer. Every position, pose,
 * visor state and gas jet is a pure function of story time S.
 */

export const GROUP_Z = -5000;
const ROW_DZ = 1.3;
const ROW_DY = 0.85;
const SLOT = 1.05;

export interface Person {
  i: number;
  row: number; // 0 front, 1, 2; 3 = photographer
  actor: Actor;
  suit: SuitSpec;
  suitKey: string;
  visorSeed: number;
  home: THREE.Vector3;
  exit: number;
  visorAt: number;
  hits: number[];
  visorCrackAt: number | null;
  packAt: number | null;
  wounded: boolean;
  kick: THREE.Vector3;
  spinAxis: THREE.Vector3;
  alarmAt: number;
  fleeAt: number;
  fleeDur: number;
  drags: number | null;
  draggedBy: number | null;
  grabAt: number;
  scream: [number, number] | null;
  seed: number;
  height: number;
  pack: THREE.Object3D;
}

const PHOTOGRAPHER_HOME = new THREE.Vector3(3.7, 0.9, -4987.5);
const H_OUT = new THREE.Vector3(HATCH.x, HATCH.y - 0.9, WALL_Z + 3.2);
const H_IN = new THREE.Vector3(HATCH.x, HATCH.y - 0.9, WALL_Z - 6);

export interface PhotoGroup {
  group: THREE.Group;
  people: Person[];
  targets: [Person, Person, Person];
  screamer: Person;
  photographer: Person;
  bullets: Bullet[];
  gas: ParticleLayer;
  update(S: number): void;
  /** World transform of a person at an arbitrary story time (pure). */
  transformAt(p: Person, S: number, pos: THREE.Vector3, quat: THREE.Quaternion): boolean;
  hatchState(S: number): { open: number; slide: number; green: boolean };
}

function bezier(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, d: THREE.Vector3, t: number, out: THREE.Vector3): THREE.Vector3 {
  const u = 1 - t;
  return out
    .copy(a)
    .multiplyScalar(u * u * u)
    .addScaledVector(b, 3 * u * u * t)
    .addScaledVector(c, 3 * u * t * t)
    .addScaledVector(d, t * t * t);
}

export function buildPhoto(): PhotoGroup {
  const group = new THREE.Group();
  group.name = "photo-group";
  const rand = mulberry32(2024);
  const people: Person[] = [];
  const rows = [9, 10, 9];
  let order = 0;
  rows.forEach((n, row) => {
    for (let k = 0; k < n; k++) {
      const i = people.length;
      const centre = row === 0 && Math.abs(k - 4) <= 2;
      const old = centre || rand() < 0.2;
      const face = crowdFace(100 + i * 7, old);
      const height = 1.68 + rand() * 0.17;
      const actor = new Actor(`crew${i}`, { face, under: "#cfd2d4", hands: "#d9dbdc" }, height, face.style === "long" || face.style === "bob" ? "slim" : "classic");
      const suit = centre ? SUIT_OFFICIAL : SUIT_STATION;
      const suitKey = centre ? "official" : "station";
      const home = new THREE.Vector3((k - (n - 1) / 2) * SLOT + (rand() - 0.5) * 0.12, row * ROW_DY + (rand() - 0.5) * 0.1, GROUP_Z - row * ROW_DZ);
      const pack = makeBackpack(0xe2e2dc, 0xc9cbc8, 0x8b9096);
      people.push({
        i,
        row,
        actor,
        suit,
        suitKey,
        visorSeed: 1 + (i % 4),
        home,
        exit: 0,
        visorAt: 0,
        hits: [],
        visorCrackAt: null,
        packAt: null,
        wounded: false,
        kick: new THREE.Vector3(),
        spinAxis: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
        alarmAt: 0,
        fleeAt: 0,
        fleeDur: 0,
        drags: null,
        draggedBy: null,
        grabAt: 0,
        scream: null,
        seed: rand() * 100,
        height,
        pack,
      });
      void order;
      order++;
    }
  });
  // Photographer.
  {
    const face = crowdFace(9001, false);
    const actor = new Actor("photographer", { face, under: "#cfd2d4", hands: "#d9dbdc" }, 1.74);
    people.push({
      i: people.length,
      row: 3,
      actor,
      suit: SUIT_STATION,
      suitKey: "station",
      visorSeed: 3,
      home: PHOTOGRAPHER_HOME.clone(),
      exit: 233.4,
      visorAt: 300,
      hits: [],
      visorCrackAt: null,
      packAt: null,
      wounded: false,
      kick: new THREE.Vector3(),
      spinAxis: new THREE.Vector3(0, 1, 0),
      alarmAt: 283.6,
      fleeAt: 286.2,
      fleeDur: 9.2,
      drags: null,
      draggedBy: null,
      grabAt: 0,
      scream: null,
      seed: 7,
      height: 1.74,
      pack: makeBackpack(0xe2e2dc, 0xc9cbc8, 0x8b9096),
    });
  }
  const at = (row: number, k: number) => people.filter((p) => p.row === row)[k]!;
  const T1 = at(0, 4);
  const T2 = at(0, 3);
  const T3 = at(0, 5);
  const N1 = at(0, 2);
  const R1 = at(1, 5);
  const screamer = at(0, 6);
  const photographer = people[people.length - 1]!;

  // Exit order: photographer, then front row from the centre out, then rows behind.
  const exitOrder = [...people.filter((p) => p.row === 0).sort((a, b) => Math.abs(a.home.x) - Math.abs(b.home.x)), ...people.filter((p) => p.row === 1), ...people.filter((p) => p.row === 2)];
  exitOrder.forEach((p, n) => {
    p.exit = 234.2 + n * 0.29;
    p.visorAt = p.row === 0 ? 246 + rand() * 2.6 : 247 + rand() * 4.5;
    if (p.row === 2 && rand() < 0.25) p.visorAt = 400; // a few never bother
  });

  // Bullets: ten per target, a few deliberately strays.
  const bullets: Bullet[] = [];
  const chest = (r: () => number): [number, number, number] => [(r() - 0.5) * 0.3, 0.86 + r() * 0.42, 0.13];
  const plan: Array<Array<{ who: Person | null; visor?: boolean; pack?: boolean }>> = [
    [{ who: T1 }, { who: T1 }, { who: T1, visor: true }, { who: T1 }, { who: T1, pack: true }, { who: T1 }, { who: null }, { who: T1 }, { who: R1 }, { who: T1 }],
    [{ who: T2 }, { who: T2 }, { who: N1 }, { who: T2 }, { who: T2 }, { who: null }, { who: T2 }, { who: N1 }, { who: T2 }, { who: T2 }],
    [{ who: T3 }, { who: T3 }, { who: T3 }, { who: T3 }, { who: null }, { who: T3 }, { who: T3 }, { who: T3 }, { who: T3 }, { who: T3 }],
  ];
  const br = mulberry32(77);
  FIRE_GROUPS.forEach((g, gi) => {
    for (let k = 0; k < 10; k++) {
      const spec = plan[gi]![k]!;
      const fired = g.start + k * SHOT_INTERVAL;
      const arrives = fired + FLIGHT_TIME;
      let local: [number, number, number];
      if (spec.visor) local = [0.03, 1.6, 0.25];
      else if (spec.who) local = chest(br);
      else local = [(br() - 0.5) * 3 + [0, -1.05, 1.05][gi]!, 0.4 + br() * 2.2, 0];
      const b: Bullet = { index: bullets.length, fired, arrives, victim: spec.who ? spec.who.i : -1, local, pack: spec.pack, visor: spec.visor };
      bullets.push(b);
      if (spec.who) {
        spec.who.hits.push(arrives);
        if (spec.visor) spec.who.visorCrackAt = arrives;
        if (spec.pack) spec.who.packAt = arrives;
      }
    }
  });
  for (const p of people) {
    if (p.hits.length) {
      p.wounded = true;
      p.hits.sort((a, b) => a - b);
      const r = mulberry32(p.i * 13 + 5);
      p.kick.set((r() - 0.5) * 0.12, (r() - 0.3) * 0.1, -0.22 - r() * 0.12);
    }
  }
  // Helpers drag the wounded home.
  const pairs: Array<[Person, Person]> = [
    [at(1, 4), T1],
    [at(1, 3), T2],
    [at(1, 6), T3],
    [at(1, 2), N1],
    [at(2, 5), R1],
  ];
  for (const [h, w] of pairs) {
    h.drags = w.i;
    w.draggedBy = h.i;
    h.grabAt = 286.4 + hash1(h.i, 3) * 1.6;
    h.fleeAt = h.grabAt + 1.5;
  }
  // Panic and flight for everyone not wounded.
  for (const p of people) {
    if (p.wounded) continue;
    const near = Math.abs(p.home.x) + p.row * 0.7;
    if (p.row !== 3) p.alarmAt = 282.6 + near * 0.18 + hash1(p.i, 9) * 0.9;
    if (p.drags === null && p.row !== 3) {
      p.fleeAt = 286.0 + hash1(p.i, 11) * 3.0 + p.row * 0.4;
      p.fleeDur = 7.4 + hash1(p.i, 12) * 2.6;
    }
    if (p.drags !== null) p.fleeDur = 8.6 + hash1(p.i, 14) * 1.4;
  }
  for (const p of [screamer, at(0, 7), at(0, 1), at(1, 4), at(1, 7)]) p.scream = [p.alarmAt + 0.4, p.alarmAt + 4.2];
  screamer.scream = [284.6, 290.8];
  screamer.fleeAt = 291.0;
  screamer.fleeDur = 7.6;

  // Dress and mount.
  for (const p of people) {
    const a = p.actor;
    a.wear(suitTexture(`${p.suitKey}`, p.suit, { kind: "opaque" }));
    a.hold("back", p.pack);
    p.pack.position.set(0, 0, -0.11 - 0.1);
    group.add(a.root);
  }
  const camera = makeCamera();
  photographer.actor.hold("handR", camera);
  camera.position.set(0.05, 0.02, 0.05);

  // Prewarm every texture the sequence will need so nothing is painted mid-shot.
  for (const p of people) {
    for (const e of ["neutral", "scream", "blink", "grim", "smile"] as Expression[]) p.actor.face(e);
    p.actor.face("neutral");
    for (let k = 0; k <= 6; k++) suitTexture(p.suitKey, p.suit, { kind: "dissolve", amount: k / 6, seed: p.visorSeed });
    suitTexture(p.suitKey, p.suit, { kind: "clear" });
  }
  suitTexture(T1.suitKey, T1.suit, { kind: "cracked" });

  const gas = new ParticleLayer(9000, THREE.NormalBlending);
  group.add(gas.points);

  // ------------------------------------------------------------------ motion
  const eul = new THREE.Euler();

  function settled(p: Person, S: number, out: THREE.Vector3): THREE.Vector3 {
    // Home plus a slow zero-g drift; the back rows are still jostling for places.
    const amp = p.row === 0 ? 0.04 : p.row === 3 ? 0.06 : 0.16 * (1 - range(S, 270, 300));
    out.copy(p.home);
    out.x += wobble(S, 0.18, p.seed) * amp;
    out.y += wobble(S, 0.15, p.seed + 3) * amp * 0.7;
    out.z += wobble(S, 0.12, p.seed + 5) * amp * 0.6;
    if (p.row >= 1 && p.row <= 2) {
      // Settling in: they arrive slightly off their mark and correct.
      const off = 1 - smooth(range(S, p.exit + 5, p.exit + 18 + p.row * 8));
      out.x += (hash1(p.i, 21) - 0.5) * 1.4 * off;
      out.y += (hash1(p.i, 22) - 0.3) * 0.8 * off;
    }
    return out;
  }

  const EXIT_START = new THREE.Vector3(H_IN.x, H_IN.y, WALL_Z - 1.5);
  function exitPath(p: Person, S: number, out: THREE.Vector3): THREE.Vector3 {
    const k = easeInOut(range(S, p.exit, p.exit + 4.6));
    const end = settled(p, p.exit + 4.6, new THREE.Vector3());
    const c2 = new THREE.Vector3(H_OUT.x, H_OUT.y, H_OUT.z + 6).lerp(end, 0.4);
    return bezier(EXIT_START, H_OUT, c2, end, k, out);
  }

  function fleePath(p: Person, S: number, out: THREE.Vector3, start: THREE.Vector3): THREE.Vector3 {
    const k = easeInOut(range(S, p.fleeAt, p.fleeAt + p.fleeDur));
    const c1 = start.clone().add(new THREE.Vector3(0, 0, -4));
    const c2 = H_OUT.clone().add(new THREE.Vector3(0, 0, 5));
    return bezier(start, c1, c2, H_IN, k, out);
  }

  /** Where a wounded person has drifted to at story time S (before any rescue). */
  function drifted(w: Person, S: number, out: THREE.Vector3): THREE.Vector3 {
    const h = w.hits[0]!;
    return settled(w, h, out).addScaledVector(w.kick, Math.max(0, S - h));
  }

  const RESCUE_OFFSET = new THREE.Vector3(0.45, 0.25, -0.7);

  /** Position (and orientation) of person p at story time S. Returns visibility. */
  function transformAt(p: Person, S: number, pos: THREE.Vector3, quat: THREE.Quaternion): boolean {
    if (S < p.exit) return false;
    let yaw = p.row === 3 ? Math.PI + 0.28 : 0;
    let pitch = 0;
    let roll = 0;
    if (S < p.exit + 4.6) {
      exitPath(p, S, pos);
      pitch = -0.25 * Math.sin(range(S, p.exit, p.exit + 4.6) * Math.PI);
    } else {
      settled(p, S, pos);
    }
    if (p.wounded && S >= p.hits[0]!) {
      const h = p.hits[0]!;
      drifted(p, S, pos);
      if (p.draggedBy !== null) {
        const helper = people[p.draggedBy]!;
        const g = helper.grabAt + 1.5;
        if (S >= g) {
          const hp = new THREE.Vector3();
          transformAt(helper, S, hp, new THREE.Quaternion());
          hp.sub(RESCUE_OFFSET);
          const held = drifted(p, g, new THREE.Vector3());
          pos.copy(held).lerp(hp, smooth(range(S, g, g + 0.6)));
        }
      }
      const spin = Math.min(S - h, 30) * (0.35 + hash1(p.i, 5) * 0.3);
      quat.setFromEuler(eul.set(pitch, yaw, roll, "YXZ"));
      quat.premultiply(new THREE.Quaternion().setFromAxisAngle(p.spinAxis, spin));
      return !(pos.z < WALL_Z - 1.2);
    }
    if (p.drags !== null && S >= p.grabAt) {
      const w = people[p.drags]!;
      const g = p.grabAt;
      const start = settled(p, g, new THREE.Vector3());
      const meet = drifted(w, g + 1.5, new THREE.Vector3()).add(RESCUE_OFFSET);
      if (S < g + 1.5) {
        const k = smooth(range(S, g, g + 1.5));
        pos.copy(start).lerp(meet, k);
        yaw = mix(0, 0.4, k);
      } else {
        fleePath(p, S, pos, meet);
        yaw = mix(0.4, Math.PI, smooth(range(S, g + 1.5, g + 2.6)));
        pitch = 0.45 * smooth(range(S, g + 1.5, g + 2.6));
      }
      quat.setFromEuler(eul.set(pitch, yaw, roll, "YXZ"));
      return !(pos.z < WALL_Z - 1.2);
    }
    if (!p.wounded && p.drags === null && p.fleeAt > 0 && S >= p.fleeAt) {
      const start = settled(p, p.fleeAt, new THREE.Vector3());
      fleePath(p, S, pos, start);
      const k = smooth(range(S, p.fleeAt, p.fleeAt + 1.1));
      yaw = mix(yaw, p.row === 3 ? Math.PI * 2 : Math.PI, k);
      pitch = 0.5 * k;
      roll = (hash1(p.i, 31) - 0.5) * 0.3 * k;
    }
    quat.setFromEuler(eul.set(pitch, yaw, roll, "YXZ"));
    return !(pos.z < WALL_Z - 1.2);
  }

  // ------------------------------------------------------------------ poses
  const PHOTO_POSE: Pose = { armR: [0.05, 0, -0.1], armL: [0.05, 0, 0.1], legR: [0.04, 0, -0.03], legL: [-0.04, 0, 0.03] };
  const WAVE = (S: number): Pose => ({ ...PHOTO_POSE, armR: [-2.7 + Math.sin(S * 6) * 0.15, 0, -0.35 - Math.sin(S * 6) * 0.25] });
  const ALARM = (S: number, seed: number): Pose => ({
    hips: [0.1, Math.sin(S * 3 + seed) * 0.2, 0],
    neck: [-0.2, Math.sin(S * 2.3 + seed) * 0.6, 0],
    armR: [-2.4 + Math.sin(S * 5 + seed) * 0.4, 0, -0.6],
    armL: [-2.2 + Math.cos(S * 4.6 + seed) * 0.4, 0, 0.6],
    legR: [0.3, 0, -0.1],
    legL: [-0.2, 0, 0.1],
  });
  const FLEE: Pose = { neck: [-0.4, 0, 0], armR: [0.25, 0, -0.18], armL: [0.25, 0, 0.18], legR: [0.18, 0, -0.04], legL: [0.24, 0, 0.04] };
  const LIMP = (S: number, seed: number): Pose => ({
    hips: [0.15, 0, 0.1],
    neck: [0.45 + Math.sin(S * 0.7 + seed) * 0.1, 0.3, 0.2],
    armR: [-1.1 + Math.sin(S * 0.5 + seed) * 0.2, 0, -0.7],
    armL: [-0.7 + Math.sin(S * 0.6 + seed) * 0.2, 0, 0.9],
    legR: [-0.5, 0, -0.25],
    legL: [-0.15, 0, 0.3],
    lift: 0,
  });
  const REACH: Pose = { armR: [-1.5, 0, 0.1], armL: [-1.4, 0, -0.1], neck: [0.2, 0, 0], legR: [0.2, 0, 0], legL: [0.3, 0, 0] };
  const CAMERA_POSE = (S: number): Pose => {
    const gesture = Math.max(0, Math.sin(S * 0.9)) ** 3;
    return {
      armR: [-1.62, -0.25, 0.2],
      armL: blendPose({ armL: [-1.55, 0.3, -0.25] }, { armL: [-2.6 + Math.sin(S * 7) * 0.2, 0, 0.9] }, gesture).armL,
      neck: [0.05, 0, 0],
      legR: [0.1, 0, 0],
      legL: [-0.05, 0, 0],
    };
  };

  function poseAt(p: Person, S: number): Pose {
    const drift = float(S * 0.6 + p.seed);
    let pose = blendPose(PHOTO_POSE, drift, 0.28);
    if (p.row === 3) pose = CAMERA_POSE(S);
    if (S < p.exit + 4.6) pose = blendPose(pose, FLEE, 0.6 * Math.sin(range(S, p.exit, p.exit + 4.6) * Math.PI));
    if (p.row === 0 && (p.i % 3 === 1) && S > 246 && S < 281) pose = blendPose(pose, WAVE(S), smooth(range(S, 250 + p.i * 0.3, 252 + p.i * 0.3)) * (1 - smooth(range(S, 262, 264))));
    if (p.wounded && S >= p.hits[0]!) {
      const k = smooth(range(S, p.hits[0]!, p.hits[0]! + 0.5));
      return blendPose(pose, LIMP(S, p.seed), k);
    }
    if (p.alarmAt > 0 && S >= p.alarmAt) pose = blendPose(pose, ALARM(S, p.seed), smooth(range(S, p.alarmAt, p.alarmAt + 0.5)));
    if (p.drags !== null && S >= p.grabAt) pose = blendPose(pose, REACH, smooth(range(S, p.grabAt, p.grabAt + 0.6)));
    else if (p.fleeAt > 0 && S >= p.fleeAt) pose = blendPose(pose, FLEE, smooth(range(S, p.fleeAt, p.fleeAt + 1.2)));
    return pose;
  }

  // ------------------------------------------------------------------ particles
  const lp = new THREE.Vector3();
  const nrm = new THREE.Vector3();
  const pa = new THREE.Vector3();
  const qa = new THREE.Quaternion();
  const hitRand = (k: number, s: number) => hash1(k * 31 + s, 41);

  // Emission instants sit on fixed grids, so their transforms never change:
  // memoize them instead of re-solving thousands of poses per frame.
  const memo = new Map<number, Float64Array | null>();
  function tf(p: Person, te: number, pos: THREE.Vector3, quat: THREE.Quaternion): boolean {
    const key = p.i * 1e7 + Math.round(te * 1000);
    let m = memo.get(key);
    if (m === undefined) {
      const vis = transformAt(p, te, pos, quat);
      m = vis ? Float64Array.of(pos.x, pos.y, pos.z, quat.x, quat.y, quat.z, quat.w) : null;
      memo.set(key, m);
    }
    if (!m) return false;
    pos.set(m[0]!, m[1]!, m[2]!);
    quat.set(m[3]!, m[4]!, m[5]!, m[6]!);
    return true;
  }

  function emitGas(S: number): void {
    gas.begin();
    // Jets from punctures: front entry and rear exit, decaying over five seconds.
    for (const b of bullets) {
      if (S < b.arrives) continue;
      if (b.victim < 0) {
        // Stray round strikes the hull: a silent spray of grit.
        const age = S - b.arrives - 0.08;
        if (age < 0 || age > 2.5) continue;
        for (let k = 0; k < 18; k++) {
          const r1 = hitRand(b.index, k);
          const r2 = hitRand(b.index, k + 50);
          const r3 = hitRand(b.index, k + 99);
          const sp = 1.5 + r1 * 3;
          gas.push(b.local[0] + (r2 - 0.5) * sp * age, b.local[1] + (r3 - 0.5) * sp * age, WALL_Z + 2.1 + sp * age * 0.8, 0.05 + age * 0.08, 0.75, 0.74, 0.7, 0.8 * (1 - age / 2.5));
        }
        continue;
      }
      const p = people[b.victim]!;
      const sides = b.visor ? [1] : [1, -1];
      for (const side of sides) {
        const life = 1.6;
        const span = b.pack ? 5 : 4.2;
        const n = 60;
        for (let k = 0; k < n; k++) {
          const te = b.arrives + (k / n) * span;
          if (te > S) break;
          const age = S - te;
          if (age > life) continue;
          if (!tf(p, te, pa, qa)) continue;
          lp.set(b.local[0], b.local[1], b.local[2] * side);
          if (side < 0) lp.z = -0.14;
          lp.applyQuaternion(qa).add(pa);
          nrm.set((hitRand(b.index, k) - 0.5) * 0.7, (hitRand(b.index, k + 7) - 0.5) * 0.7, side).applyQuaternion(qa).normalize();
          const strength = Math.exp(-(te - b.arrives) * 0.9);
          const sp = 2.2 + hitRand(b.index, k + 3) * 2.5;
          const x = lp.x + nrm.x * sp * age;
          const y = lp.y + nrm.y * sp * age;
          const z = lp.z + nrm.z * sp * age;
          const a = (1 - age / life) * 0.55 * strength;
          const sz = 0.04 + age * 0.32 * (0.5 + strength);
          gas.push(x, y, z, sz, 0.92, 0.94, 0.96, a);
        }
      }
      // Blood thrown out with the gas, freezing into ice.
      if (b.visor || (p === T1 && b.index % 3 === 0)) {
        for (let k = 0; k < 70; k++) {
          const te = b.arrives + (k / 70) * 2.5;
          if (te > S) break;
          const age = S - te;
          if (age > 4) continue;
          if (!tf(p, te, pa, qa)) continue;
          lp.set(b.local[0] + (hitRand(b.index, k + 300) - 0.5) * 0.12, b.local[1], b.local[2] + 0.02).applyQuaternion(qa).add(pa);
          nrm.set((hitRand(b.index, k + 200) - 0.5) * 1.2, (hitRand(b.index, k + 210) - 0.4) * 1.2, 1).applyQuaternion(qa).normalize();
          const sp = 0.8 + hitRand(b.index, k + 220) * 1.6;
          const ice = smooth(range(age, 0.25, 1.1));
          const sparkle = 0.75 + 0.25 * Math.sin(S * 23 + k * 1.7);
          const r = mix(0.55, 0.92 * sparkle, ice);
          const g = mix(0.04, 0.95 * sparkle, ice);
          const bl = mix(0.03, 1.0 * sparkle, ice);
          gas.push(lp.x + nrm.x * sp * age, lp.y + nrm.y * sp * age, lp.z + nrm.z * sp * age, mix(0.035, 0.022, ice), r, g, bl, 0.95 * (1 - age / 4));
        }
      }
      // The pack bursts: one much bigger cloud between the first and second rows.
      if (b.pack) {
        for (let k = 0; k < 600; k++) {
          const te = b.arrives + Math.pow(k / 600, 2) * 1.6;
          if (te > S) break;
          const age = S - te;
          if (age > 3.2) continue;
          if (!tf(p, te, pa, qa)) continue;
          lp.set(0, 1.0, -0.32).applyQuaternion(qa).add(pa);
          const r1 = hitRand(b.index, k + 400) - 0.5;
          const r2 = hitRand(b.index, k + 900) - 0.5;
          const r3 = hitRand(b.index, k + 1400) - 0.4;
          nrm.set(r1 * 1.6, r2 * 1.6, -0.9 + r3).normalize();
          const sp = 1.2 + hitRand(b.index, k + 1900) * 3.5;
          const e = 1 - Math.exp(-age * 2.2);
          gas.push(lp.x + nrm.x * sp * e, lp.y + nrm.y * sp * e, lp.z + nrm.z * sp * e, 0.08 + age * 0.35, 0.95, 0.96, 0.98, 0.5 * (1 - age / 3.2));
        }
      }
    }
    // Thruster plumes: arrangement puffs, then full-power retreat.
    for (const p of people) {
      const flee = p.drags !== null ? p.grabAt : p.fleeAt;
      const puffs: number[] = [];
      if (p.row >= 1 && p.row <= 2) for (let k = 0; k < 3; k++) puffs.push(p.exit + 6 + hash1(p.i, 60 + k) * 30 + k * 9);
      for (const t0 of puffs) {
        for (let k = 0; k < 14; k++) {
          const te = t0 + k * 0.03;
          if (te > S) break;
          const age = S - te;
          if (age > 1.4) continue;
          if (!tf(p, te, pa, qa)) continue;
          lp.set((k % 2 ? 0.2 : -0.2), 0.8, -0.32).applyQuaternion(qa).add(pa);
          nrm.set((hitRand(p.i, k) - 0.5), (hitRand(p.i, k + 5) - 0.5), -1).applyQuaternion(qa).normalize();
          gas.push(lp.x + nrm.x * 2 * age, lp.y + nrm.y * 2 * age, lp.z + nrm.z * 2 * age, 0.05 + age * 0.3, 0.95, 0.95, 0.97, 0.35 * (1 - age / 1.4));
        }
      }
      if (p.wounded || flee <= 0 || S < flee) continue;
      const stop = flee + (p.drags !== null ? 1.5 : 0) + p.fleeDur;
      const n = 90;
      for (let k = 0; k < n; k++) {
        const te = flee + k * 0.11;
        if (te > S || te > stop) break;
        const age = S - te;
        if (age > 1.6) continue;
        if (!tf(p, te, pa, qa)) continue;
        for (const sx of [-0.2, 0.2]) {
          lp.set(sx, 0.75, -0.34).applyQuaternion(qa).add(pa);
          nrm.set((hitRand(p.i, k) - 0.5) * 0.5, (hitRand(p.i, k + 9) - 0.5) * 0.5, -1).applyQuaternion(qa).normalize();
          const sp = 5 + hitRand(p.i, k + 2) * 2;
          gas.push(lp.x + nrm.x * sp * age, lp.y + nrm.y * sp * age, lp.z + nrm.z * sp * age, 0.07 + age * 0.4, 0.96, 0.97, 1.0, 0.45 * (1 - age / 1.6));
        }
      }
    }
    gas.end();
  }

  function hatchState(S: number): { open: number; slide: number; green: boolean } {
    // Lamp red → green when the lock is pumped down, plug out, slide aside;
    // reverse once the last body is inside.
    const green = S >= 230.4 && S < 302.4;
    const open = smooth(range(S, 231.6, 232.6)) * (1 - smooth(range(S, 301.4, 302.2)));
    const slide = smooth(range(S, 232.5, 234.0)) * (1 - smooth(range(S, 299.6, 301.4)));
    return { open, slide, green };
  }

  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  function update(S: number): void {
    for (const p of people) {
      const vis = transformAt(p, S, pos, quat);
      const a = p.actor;
      a.root.visible = vis;
      if (!vis) continue;
      a.root.position.copy(pos);
      a.root.quaternion.copy(quat);
      a.pose(poseAt(p, S));
      // Visor.
      if (p.visorCrackAt !== null && S >= p.visorCrackAt) a.wear(suitTexture(p.suitKey, p.suit, { kind: "cracked" }));
      else {
        const k = sat((S - p.visorAt) / 0.9);
        if (k <= 0) a.wear(suitTexture(p.suitKey, p.suit, { kind: "opaque" }));
        else if (k >= 1) a.wear(suitTexture(p.suitKey, p.suit, { kind: "clear" }));
        else a.wear(suitTexture(p.suitKey, p.suit, { kind: "dissolve", amount: Math.round(k * 6) / 6, seed: p.visorSeed }));
      }
      // Face.
      let e: Expression = Math.sin(S * 0.7 + p.seed * 3) > 0.97 ? "blink" : p.row === 0 && S > 250 && S < 281 ? "smile" : "neutral";
      if (p.scream && S >= p.scream[0] && S < p.scream[1]) e = "scream";
      if (p.wounded && S >= p.hits[0]!) e = p === T2 || p === T3 ? "blink" : "grim";
      a.face(e);
    }
    emitGas(S);
  }

  return { group, people, targets: [T1, T2, T3], screamer, photographer, bullets, gas, update, transformAt, hatchState };
}

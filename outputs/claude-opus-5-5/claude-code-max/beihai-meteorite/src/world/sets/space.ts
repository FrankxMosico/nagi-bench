import * as THREE from "three";
import { float as floatPose, type Pose } from "@agentbench/voxel-kit";
import {
  Actor,
  crackTexture,
  crowdFace,
  suitPainter,
  suitUp,
  TARGET_FACES,
  ZHANG_FACE,
  type Expr,
  type SuitRig,
} from "../cast";
import { VoxelGrid, vmesh, rockGeometry } from "../vox";
import { Particles, glowSprite } from "../fx";
import {
  cameraGeometry,
  gloveGeometry,
  lensMesh,
  magazineGeometry,
  pistolGeometry,
  PISTOL_MUZZLE,
  PISTOL_RAIL,
  propMesh,
  scopeGeometry,
  slugGeometry,
} from "../props";
import { S, shotTimes } from "../../timeline";
import { cueActive } from "../../voice";
import {
  addPose,
  clamp,
  easeInOut,
  hash1,
  mulberry32,
  scalePose,
  seg,
  smooth,
  smoother,
  spline,
  trackPose,
  wobble,
  type Key,
} from "../util";
import { orient } from "../context";
import {
  BASE_DIR,
  buildBackdrop,
  GROUP_C,
  HATCH,
  PHOTO_FWD,
  PHOTO_UP,
  sunColour,
  sunDir,
  sunIntensity,
  sunVisible,
  Z_FWD,
  Z_RIGHT,
  Z_UP,
  ZPOS,
  type Backdrop,
} from "./space-common";
import { buildStation, type Station } from "./station";

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const CENTER_UP = 0.92; // figure centre above the feet, metres
/** Bullet travel direction (Zhang → group). */
const BULLET_DIR = Z_FWD.clone();

type Role = "crowd" | "T1" | "T2" | "T3" | "B1" | "B2" | "photographer";

interface Member {
  i: number;
  actor: Actor;
  rig: SuitRig;
  role: Role;
  row: number;
  slot: THREE.Vector3;
  seed: number;
  emerge: number;
  dur: number;
  flyPts: THREE.Vector3[];
  clearAt: number;
  hit: number | null;
  hitLocal: THREE.Vector3;
  helper: number | null;
  towing: number | null;
  retreat: number;
  retreatDur: number;
  shuffle: THREE.Vector3;
  react: number;
}

/* ===================================================================== */

function quatFrom(forward: THREE.Vector3, up: THREE.Vector3): THREE.Quaternion {
  const o = new THREE.Object3D();
  orient(o, forward, up);
  return o.quaternion.clone();
}
const Q_PHOTO = quatFrom(PHOTO_FWD, PHOTO_UP);
const Q_EXIT = quatFrom(V(0, 0, -1), V(0, -1, 0));
const Q_BACK = quatFrom(V(0, 0, 1), V(0, 1, 0));
const Q_CAMERAMAN = quatFrom(V(0, 1, 0), PHOTO_UP);
const Q_ZHANG = quatFrom(Z_FWD, Z_UP);

export interface SpaceSet {
  scene: THREE.Scene;
  backdrop: Backdrop;
  station: Station;
  members: Member[];
  targets: [Member, Member, Member];
  photographer: Member;
  zhang: Actor;
  zrig: SuitRig;
  bullets: Array<{ mesh: THREE.Mesh; tf: number; ti: number; from: THREE.Vector3; to: THREE.Vector3; miss: boolean }>;
  sunLight: THREE.DirectionalLight;
  /** Pure state update for absolute time t. */
  update(t: number, camera: THREE.PerspectiveCamera): void;
  memberCenter(m: Member, t: number, out?: THREE.Vector3): THREE.Vector3;
  memberQuat(m: Member, t: number, out?: THREE.Quaternion): THREE.Quaternion;
  headOf(m: Member | Actor, out?: THREE.Vector3): THREE.Vector3;
  zhangHead(out?: THREE.Vector3): THREE.Vector3;
  zhangHand(out?: THREE.Vector3): THREE.Vector3;
  zhangHolder: THREE.Group;
  muzzleWorld(out?: THREE.Vector3): THREE.Vector3;
  bulletPos(k: number, t: number, out?: THREE.Vector3): THREE.Vector3;
  aimPoint(group: number, t: number, out?: THREE.Vector3): THREE.Vector3;
  setEnvironment(env: THREE.Texture | null): void;
}

export function buildSpace(): SpaceSet {
  const scene = new THREE.Scene();
  scene.background = null;
  const backdrop = buildBackdrop();
  const station = buildStation();
  scene.add(station.group);

  /* ---------------------------------------------------------- lights */
  const sunLight = new THREE.DirectionalLight(0xffffff, 3);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  const sc = sunLight.shadow.camera as THREE.OrthographicCamera;
  sc.left = -26;
  sc.right = 26;
  sc.top = 26;
  sc.bottom = -26;
  sc.near = 10;
  sc.far = 400;
  sunLight.shadow.bias = -0.0004;
  sunLight.shadow.normalBias = 0.04;
  sunLight.target.position.copy(HATCH).add(V(0, -36, 0));
  scene.add(sunLight, sunLight.target);
  const earthShine = new THREE.DirectionalLight(0x5a7ab8, 0.18);
  earthShine.position.set(0, -100, 0);
  scene.add(earthShine);
  // faint earthshine and starlight so shadow sides of white suits stay legible
  const hemi = new THREE.HemisphereLight(0x1a2234, 0x2a3650, 0.9);
  scene.add(hemi);
  // The station's sunlit underside bounces a little warm light back out to Zhang.
  const bounce = new THREE.DirectionalLight(0xffe9d2, 0.8);
  bounce.position.copy(ZPOS).addScaledVector(Z_FWD, 200).addScaledVector(Z_UP, 40);
  bounce.target.position.copy(ZPOS);
  scene.add(bounce, bounce.target);

  /* ----------------------------------------------------------- group */
  const rand = mulberry32(2024);
  const members: Member[] = [];
  const crackA = crackTexture(3);
  const rows = [9, 10, 10];
  let idx = 0;
  const emergeOrder: number[] = [];
  for (let r = 0; r < rows.length; r++) {
    for (let k = 0; k < rows[r]!; k++) {
      const n = rows[r]!;
      const x = (k - (n - 1) / 2) * 1.12 + (r === 0 ? 0 : (rand() - 0.5) * 0.12);
      const slot = GROUP_C.clone().add(V(x, r * 1.55, r * 0.98 + (rand() - 0.5) * 0.12));
      let role: Role = "crowd";
      let face = crowdFace(idx + 3);
      let stripe = "#3f6fae";
      if (r === 0 && k === 3) { role = "T1"; face = TARGET_FACES[0]!; stripe = "#c9a24a"; }
      if (r === 0 && k === 4) { role = "T2"; face = TARGET_FACES[1]!; stripe = "#c9a24a"; }
      if (r === 0 && k === 5) { role = "T3"; face = TARGET_FACES[2]!; stripe = "#c9a24a"; }
      if (r === 1 && k === 3) role = "B1";
      if (r === 1 && k === 6) role = "B2";
      const leader = r === 0;
      const actor = new Actor({
        face,
        heightM: 1.68 + rand() * 0.14,
        exprs: ["neutral", "blink", "smile", "smileTalk", "talk", "scream", "pain", "dead"],
        outfits: { suit: suitPainter({ stripe: leader && role === "crowd" ? "#8a9bb3" : stripe, flag: true, rank: leader, seed: idx }) },
      });
      const rig = suitUp(actor, role === "T2" ? crackA : undefined);
      members.push({
        i: idx,
        actor,
        rig,
        role,
        row: r,
        slot,
        seed: rand() * 100,
        emerge: 0,
        dur: S.emergeDur + rand() * 1.4,
        flyPts: [],
        clearAt: 0,
        hit: null,
        hitLocal: V(),
        helper: null,
        towing: null,
        retreat: 0,
        retreatDur: 0,
        shuffle: V(r === 0 ? 0 : (rand() - 0.5) * 1.6, 0, r === 0 ? 0 : (rand() - 0.5) * 0.6),
        react: 0.25 + rand() * 0.45,
      });
      emergeOrder.push(idx);
      idx++;
    }
  }
  // photographer
  {
    const actor = new Actor({
      face: crowdFace(77),
      heightM: 1.76,
      exprs: ["neutral", "blink", "smile", "smileTalk", "talk", "scream"],
      outfits: { suit: suitPainter({ stripe: "#e07a2e", flag: true }) },
    });
    const rig = suitUp(actor);
    const cam = propMesh(cameraGeometry(), { metalness: 0.5, roughness: 0.4 });
    cam.position.set(0, 0.6, 1.6);
    actor.fig.anchors.handR.add(cam);
    // the photographer's video lamp: the group's key light once the sun is low
    const lamp = new THREE.SpotLight(0xfff2e2, 0, 0, 0.42, 0.85, 2);
    lamp.name = "photoLamp";
    lamp.position.set(0, 1.2, 3.2);
    lamp.target.position.set(0, 1.2, 60);
    actor.fig.anchors.handR.add(lamp, lamp.target);
    const lampGlow = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.2), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.96, 0.9).multiplyScalar(3) }));
    lampGlow.name = "photoLampGlow";
    lampGlow.position.set(0, 1.4, 2.9);
    actor.fig.anchors.handR.add(lampGlow);
    members.push({
      i: idx,
      actor,
      rig,
      role: "photographer",
      row: -1,
      slot: GROUP_C.clone().add(V(3.6, -23.5, -3.2)),
      seed: 42,
      emerge: 0,
      dur: S.emergeDur + 2.2,
      flyPts: [],
      clearAt: 241.6,
      hit: null,
      hitLocal: V(),
      helper: null,
      towing: null,
      retreat: 0,
      retreatDur: 0,
      shuffle: V(),
      react: 0.3,
    });
  }

  // emergence: leaders first, then back rows, the photographer last
  const order = [...members.slice(0, 9).map((m) => m.i), ...members.slice(9, 29).map((m) => m.i)];
  order.sort((a, b) => (members[a]!.row - members[b]!.row) * 10 + (hash1(a * 7.1) - hash1(b * 7.1)));
  // the photographer goes out first to take his position, then the leaders, then the rest
  members[29]!.emerge = S.emerge - 0.2;
  order.forEach((mi, k) => (members[mi]!.emerge = S.emerge + 0.5 + k * S.emergeStep));

  const clearOrder = members.slice(0, 29).map((m) => m.i).sort((a, b) => hash1(a * 3.3) - hash1(b * 3.3));
  clearOrder.forEach((mi, k) => (members[mi]!.clearAt = S.visorClear + k * 0.1));
  const T1 = members.find((m) => m.role === "T1")!;
  const T2 = members.find((m) => m.role === "T2")!;
  const T3 = members.find((m) => m.role === "T3")!;
  const B1 = members.find((m) => m.role === "B1")!;
  const B2 = members.find((m) => m.role === "B2")!;
  const photographer = members[29]!;
  T2.clearAt = S.visorClear + 0.3;
  T1.hit = S.impact.T1;
  T1.hitLocal.set(0.05, 1.22, 0.16);
  B1.hit = S.impact.B1;
  B1.hitLocal.set(0.31, 1.12, 0.05);
  T3.hit = S.impact.T3;
  T3.hitLocal.set(-0.06, 1.2, 0.16);
  B2.hit = S.impact.B2;
  B2.hitLocal.set(0, 1.18, -0.3);
  T2.hit = S.impact.T2;
  T2.hitLocal.set(0.0, 1.5, 0.3);

  for (const m of members) {
    const exit = HATCH.clone().add(V(0, 3.5, 0));
    const out = HATCH.clone().add(V(0, -6, 0));
    const mid = out.clone().lerp(m.slot, 0.55).add(V(0, 0, 0.6));
    m.flyPts = [exit, out, mid, m.slot.clone()];
  }

  // retreat schedule: helpers tow the wounded, everyone else bolts for the hatch
  const victims = [T1, T2, T3, B1, B2];
  // row 1 is indices 9..18 (B1 = 12, B2 = 15), row 2 is 19..28
  const helpers = [members[11]!, members[13]!, members[14]!, members[21]!, members[25]!];
  victims.forEach((v, k) => {
    const h = helpers[k]!;
    v.helper = h.i;
    h.towing = v.i;
  });
  for (const m of members) {
    const dist = m.slot.distanceTo(HATCH);
    if (m.towing !== null) {
      m.retreat = S.retreat + 0.3 + hash1(m.i) * 0.4;
      m.retreatDur = 4.6;
    } else if (m.helper !== null) {
      m.retreat = 0;
      m.retreatDur = 0;
    } else {
      m.retreat = S.retreat + 0.1 + hash1(m.i * 1.7) * 1.3;
      m.retreatDur = 2.4 + dist / 70 + hash1(m.i * 2.9) * 1.0;
    }
  }

  for (const m of members) scene.add(m.actor.holder);

  /* --------------------------------------------------- member motion */
  const tmpQ = new THREE.Quaternion();
  const MEET = 1.2;

  function settledCenter(m: Member, t: number, out: THREE.Vector3): THREE.Vector3 {
    if (t < m.emerge) return out.copy(HATCH).add(V(0, 4, 0));
    const u = (t - m.emerge) / m.dur;
    if (u < 1) return spline(m.flyPts, smoother(u), out);
    out.copy(m.slot);
    // back rows still shuffling into place
    const settle = 1 - smooth(seg(t, m.emerge + m.dur, m.emerge + m.dur + 30));
    out.addScaledVector(m.shuffle, settle * (0.6 + 0.4 * Math.sin(t * 0.7 + m.seed)));
    out.x += Math.sin(t * 0.41 + m.seed) * 0.05;
    out.y += Math.sin(t * 0.33 + m.seed * 2) * 0.05;
    out.z += Math.sin(t * 0.47 + m.seed * 3) * 0.04;
    if (m.hit !== null && t > m.hit) {
      const dt = t - m.hit;
      out.addScaledVector(BULLET_DIR, 0.45 * (1 - Math.exp(-dt * 3)) + dt * 0.18);
    }
    return out;
  }

  function memberCenter(m: Member, t: number, out = V()): THREE.Vector3 {
    // wounded: dragged by a helper
    if (m.helper !== null) {
      const h = members[m.helper]!;
      const meet = h.retreat + MEET;
      if (t >= meet) {
        memberCenter(h, t, out);
        return out.add(V(0.85, 0.2, -0.3));
      }
      return settledCenter(m, t, out);
    }
    if (m.retreat > 0 && t >= m.retreat) {
      const p0 = settledCenter(m, m.retreat, V());
      if (m.towing !== null) {
        const v = members[m.towing]!;
        const meetAt = m.retreat + MEET;
        const vp = settledCenter(v, meetAt, V()).add(V(-0.85, -0.2, 0.3));
        if (t < meetAt) return out.copy(p0).lerp(vp, smooth((t - m.retreat) / MEET));
        const u = clamp((t - meetAt) / m.retreatDur);
        const pts = [vp, vp.clone().lerp(HATCH, 0.45).add(V(0, -14, 0)), HATCH.clone().add(V(0, -7, 0)), HATCH.clone().add(V(0, 6, 0))];
        return spline(pts, easeInOut(u), out);
      }
      const u = clamp((t - m.retreat) / m.retreatDur);
      const pts = [p0, p0.clone().lerp(HATCH, 0.5).add(V(0, -12, 0)), HATCH.clone().add(V(0, -7, 0)), HATCH.clone().add(V(0, 6, 0))];
      return spline(pts, easeInOut(u), out);
    }
    return settledCenter(m, t, out);
  }

  const tumbleAxis = V(0.3, 0.2, 1).normalize();
  function memberQuat(m: Member, t: number, out = new THREE.Quaternion()): THREE.Quaternion {
    if (m.role === "photographer") {
      out.copy(Q_EXIT).slerp(Q_CAMERAMAN, smooth(seg(t, m.emerge + 0.6, m.emerge + m.dur * 0.8)));
      return out;
    }
    const u = (t - m.emerge) / m.dur;
    out.copy(Q_EXIT).slerp(Q_PHOTO, smooth((u - 0.15) / 0.55));
    // small idle wander
    tmpQ.setFromEuler(new THREE.Euler(Math.sin(t * 0.3 + m.seed) * 0.05, Math.sin(t * 0.23 + m.seed) * 0.08, Math.sin(t * 0.27 + m.seed * 2) * 0.04));
    out.multiply(tmpQ);
    if (m.hit !== null && t > m.hit) {
      tmpQ.setFromAxisAngle(tumbleAxis, (t - m.hit) * 0.35 + (1 - Math.exp(-(t - m.hit) * 4)) * 0.25);
      out.multiply(tmpQ);
    }
    const rt = m.helper !== null ? members[m.helper]!.retreat + MEET : m.retreat;
    if (rt > 0 && t > rt) {
      const k = smooth((t - rt) / 1.1);
      out.slerp(Q_BACK, k * (m.helper !== null ? 0.5 : 1));
    }
    return out;
  }

  function memberVisible(m: Member, t: number, c: THREE.Vector3): boolean {
    if (t < m.emerge) return false;
    return c.y < HATCH.y + 2.4;
  }

  const STREAM: Pose = { armR: [0.12, 0, 0.12], armL: [0.12, 0, -0.12], legR: [0.05, 0, 0.03], legL: [0.05, 0, -0.03] };
  const PHOTO_POSE: Pose = { armR: [-0.3, 0, 0.14], armL: [-0.3, 0, -0.14], legR: [-0.12, 0, 0.04], legL: [-0.05, 0, -0.04], neck: [0.02, 0, 0] };
  const LIMP: Pose = { armR: [-1.4, 0.2, 0.95], armL: [-1.1, -0.2, -1.0], legR: [-0.5, 0, 0.3], legL: [-0.2, 0, -0.35], neck: [0.55, 0.2, 0], hips: [-0.2, 0, 0] };

  function memberPose(m: Member, t: number): Pose {
    const drift = scalePose(floatPose(t * 0.8 + m.seed * 3), 0.45);
    if (m.role === "photographer") {
      const hold: Pose = { armR: [-1.5, 0.15, 0.25], armL: [-1.45, -0.15, -0.38], neck: [0.05, 0, 0], legR: [-0.2, 0, 0.05], legL: [-0.1, 0, -0.05] };
      const wave = t > 231 && t < 236 ? Math.sin(t * 4) * 0.35 : 0;
      const p = addPose(hold, { armL: [wave, 0, 0] });
      return addPose(p, scalePose(drift, 0.5));
    }
    const u = (t - m.emerge) / m.dur;
    let p = addPose(PHOTO_POSE, drift);
    if (u < 1) p = addPose(STREAM, scalePose(drift, smooth(u)));
    if (m.role === "T2" && cueActive("v35", t)) {
      p = addPose(p, { armR: [-0.7 + Math.sin(t * 3.1) * 0.2, 0, 0.15] });
    }
    // startle after the first strikes
    const first = S.impact.T1 + m.react;
    if (t > first && m.hit === null) {
      const k = smooth((t - first) / 0.35);
      const flail: Pose = {
        armR: [-2.2 + Math.sin(t * 5 + m.seed) * 0.4, 0, 0.5],
        armL: [-2.0 + Math.sin(t * 4.3 + m.seed) * 0.4, 0, -0.55],
        legR: [-0.6, 0, 0.2],
        legL: [0.1, 0, -0.2],
        neck: [-0.15, Math.sin(t * 2 + m.seed) * 0.4, 0],
      };
      p = addPose(scalePose(p, 1 - k), scalePose(flail, k));
    }
    if (m.hit !== null && t > m.hit) {
      const k = smooth((t - m.hit) / 0.5);
      p = addPose(scalePose(p, 1 - k), scalePose(LIMP, k));
    }
    const rt = m.helper !== null ? Infinity : m.retreat;
    if (rt > 0 && t > rt) p = addPose(scalePose(p, 1 - smooth((t - rt) / 0.6)), scalePose(STREAM, smooth((t - rt) / 0.6)));
    if (m.towing !== null && t > m.retreat + MEET) p = addPose(p, { armR: [-1.6, 0, 0.6] });
    return p;
  }

  function memberExpr(m: Member, t: number): { e: Expr; speak: boolean } {
    let e: Expr = t > 236 ? "smile" : "neutral";
    let speak = false;
    if (m.role === "photographer") speak = cueActive("v33", t) || cueActive("v34", t);
    if (m.role === "T2") speak = cueActive("v35", t);
    if (t > 250.6 && t < 254.5 && m.role !== "T2") e = "smile";
    const first = S.impact.T1 + m.react;
    if (t > first) e = "scream";
    if (m.hit !== null && t > m.hit) e = t > m.hit + 1.6 && (m.role === "T1" || m.role === "T3") ? "dead" : "pain";
    if (t > S.retreat + 2.5 && m.hit === null) e = "pain";
    return { e, speak };
  }

  /* ------------------------------------------------------------ Zhang */
  const thinPainters: Record<string, ReturnType<typeof suitPainter>> = {};
  for (let k = 0; k < 4; k++) thinPainters[`thin${k}`] = suitPainter({ stripe: "#b8322a", flag: true, rank: true, gloveR: "thin", frost: k / 3, seed: 99 });
  const zhang = new Actor({
    face: ZHANG_FACE,
    heightM: 1.8,
    exprs: ["neutral", "blink", "grim", "squint"],
    outfits: { suit: suitPainter({ stripe: "#b8322a", flag: true, rank: true, seed: 99 }), ...thinPainters },
  });
  const zrig = suitUp(zhang);
  zrig.setVisor(0.86);
  scene.add(zhang.holder);
  const figScale = zhang.fig.root.scale.x;

  // the chest unit's status lamp: blinks red while the glove seal is open
  const statusLamp = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.4), new THREE.MeshBasicMaterial({ color: 0x40ff80 }));
  statusLamp.position.set(1.5, 7.6, 2.35);
  zhang.fig.joints.hips.add(statusLamp);
  const hudLight = new THREE.PointLight(0x9fd8e8, 0.12, 0.36, 2);
  hudLight.position.set(0, -4.2, 3.4);
  zhang.fig.anchors.head.add(hudLight);
  // helmet lamps throw a cone ahead of him: hands, glove and gun are lit by it
  const headLamp = new THREE.SpotLight(0xfff1dc, 3.2, 5, 0.85, 0.75, 2);
  headLamp.position.set(0, -1.2, 5.4);
  headLamp.target.position.set(0, -16, 22);
  zhang.fig.anchors.head.add(headLamp, headLamp.target);
  // a far-off glint so he never vanishes in the wide shots
  const speck = glowSprite(0xfff0dd, 1, 1.4);
  scene.add(speck);

  const pistol = new THREE.Group();
  const pistolMesh = propMesh(pistolGeometry(), { metalness: 0.55, roughness: 0.38 });
  pistol.add(pistolMesh);
  const scope = new THREE.Group();
  scope.add(propMesh(scopeGeometry(), { metalness: 0.4, roughness: 0.35 }), lensMesh());
  const flash = new THREE.Group();
  {
    const g = new VoxelGrid(5, 5, 5);
    g.box(2, 2, 0, 3, 3, 5, 0xffffff).box(0, 2, 2, 5, 3, 3, 0xffffff).box(2, 0, 2, 3, 5, 3, 0xffffff);
    const core = new THREE.Mesh(g.geometry(0.35, "center"), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.85, 0.55).multiplyScalar(14) }));
    flash.add(core);
    const sprite = glowSprite(0xffd38a, 3.2, 6);
    sprite.name = "flashSprite";
    flash.add(sprite);
  }
  flash.position.copy(PISTOL_MUZZLE).add(V(0, 0, 0.8));
  pistol.add(flash);
  // each flash lights his glove, the gun and the visor for a frame or two; the light
  // lives at scene level so hiding the flash never changes the scene's light count
  const muzzleLight = new THREE.PointLight(0xffd8a0, 0, 4, 2);
  scene.add(muzzleLight);
  const spareMags = [propMesh(magazineGeometry()), propMesh(magazineGeometry())];
  const ejected = [propMesh(magazineGeometry()), propMesh(magazineGeometry())];
  const glove = propMesh(gloveGeometry(), { roughness: 0.8, metalness: 0.05 });
  const zPropsHolder = new THREE.Group(); // metre-scale props floating in Zhang's frame
  zhang.holder.add(zPropsHolder);
  for (const m of [...spareMags, ...ejected, glove]) {
    m.scale.setScalar(figScale);
    zPropsHolder.add(m);
  }
  zhang.fig.anchors.handR.add(pistol);

  /* ------------------------------------------------------- Zhang pose */
  const IDLE: Pose = { armR: [-0.28, 0, 0.2], armL: [-0.65, 0.25, -0.32], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06], neck: [0.05, 0, 0], hips: [-0.06, 0, 0] };
  const SCOPE_UP: Pose = { armR: [-0.3, 0, 0.22], armL: [-2.32, 0.1, -0.52], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06], neck: [0.02, 0, 0] };
  const LOOK_BACK: Pose = { armR: [-0.3, 0, 0.35], armL: [-1.4, 0.3, -0.45], legR: [-0.25, 0, 0.1], legL: [-0.1, 0, -0.06], neck: [-0.15, 0.95, 0.05], hips: [0, 0.55, 0] };
  const GLOVE_REACH: Pose = { armR: [-1.05, 0.0, 0.32], armL: [-1.12, 0.1, -0.78], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06], neck: [0.35, 0, 0] };
  const GLOVE_PULL: Pose = { armR: [-1.0, 0.0, 0.3], armL: [-0.75, 0.25, -0.2], neck: [0.3, 0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  // the right arm swings OUT to the side (negative z) into the last of the sunlight
  const HAND_TO_SUN: Pose = { armR: [-0.3, 0.2, -1.35], armL: [-0.5, 0, -0.3], neck: [0.2, -0.75, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const POCKET: Pose = { armR: [0.18, 0, -0.22], armL: [-0.5, 0, -0.3], neck: [0.4, -0.2, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const GUN_UP: Pose = { armR: [-1.05, 0, 0.28], armL: [-0.6, 0, -0.3], neck: [0.3, 0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const SCOPE_GRAB: Pose = { armR: [-1.05, 0, 0.28], armL: [-1.25, -0.1, -0.2], neck: [0.3, 0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const MOUNT: Pose = { armR: [-1.15, 0, 0.32], armL: [-1.15, 0, -0.45], neck: [0.32, 0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const AIM: Pose = { armR: [-Math.PI / 2 + 0.06, 0.02, 0.1], armL: [-Math.PI / 2 + 0.08, 0.02, -0.26], neck: [0.04, 0.0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06], hips: [0, 0, 0] };
  const MAG_HAND: Pose = { ...AIM, armL: [-1.05, 0.1, -0.12] };
  const MAG_FETCH: Pose = { ...AIM, armL: [-0.85, 0.3, -0.5] };
  const LOWER: Pose = { armR: [-0.6, 0, 0.25], armL: [-0.5, 0, -0.25], neck: [0.1, 0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const CATCH: Pose = { armR: [-1.25, 0.35, 0.55], armL: [-0.5, 0, -0.25], neck: [0.25, -0.3, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const DON: Pose = { armR: [-1.0, 0, 0.32], armL: [-1.05, 0.1, -0.72], neck: [0.35, 0, 0], legR: [-0.25, 0, 0.06], legL: [-0.1, 0, -0.06] };
  const FLY: Pose = { armR: [0.1, 0, 0.14], armL: [0.1, 0, -0.14], legR: [0.05, 0, 0.03], legL: [0.05, 0, -0.03], neck: [-0.2, 0, 0] };

  const zKeys: Key<Pose>[] = [
    [S.vista, IDLE],
    [S.scopeRaise[0], IDLE],
    [S.scopeRaise[1], SCOPE_UP],
    [S.lookSun[0], SCOPE_UP],
    [S.lookSun[0] + 1.0, LOOK_BACK],
    [S.lookSun[1] - 0.4, LOOK_BACK],
    [S.lookSun[1] + 0.4, SCOPE_UP],
    [S.gloveTwist[0] - 0.4, SCOPE_UP],
    [S.gloveTwist[0], GLOVE_REACH],
    [S.gloveTwist[1], GLOVE_REACH],
    [S.gloveOff, GLOVE_PULL],
    [S.turn[0] + 0.4, LOWER],
    [S.turn[1] - 0.6, HAND_TO_SUN],
    [S.turn[1], HAND_TO_SUN],
    [S.gunOut - 0.3, POCKET],
    [S.gunOut + 0.25, GUN_UP],
    [S.scopeGrab, SCOPE_GRAB],
    [S.scopeMount, MOUNT],
    [S.aim[0], MOUNT],
    [S.aim[1], AIM],
    [S.magOut[0] - 0.05, AIM],
    [S.magOut[0] + 0.15, MAG_HAND],
    [S.magOut[0] + 0.35, MAG_FETCH],
    [S.magIn[0], MAG_HAND],
    [S.magIn[0] + 0.3, AIM],
    [S.magOut[1] - 0.05, AIM],
    [S.magOut[1] + 0.15, MAG_HAND],
    [S.magOut[1] + 0.35, MAG_FETCH],
    [S.magIn[1], MAG_HAND],
    [S.magIn[1] + 0.3, AIM],
    [S.gunStow[0], AIM],
    [S.gunStow[0] + 0.5, LOWER],
    [S.gunStow[1], POCKET],
    [S.gloveCatch - 0.2, CATCH],
    [S.gloveCatch + 0.2, CATCH],
    [S.gloveOn, DON],
    [S.gloveOn + 0.8, LOWER],
    [S.depart[0], FLY],
  ];

  const shots = shotTimes();
  function recoil(t: number): number {
    let r = 0;
    for (const s of shots) {
      const d = t - s.t;
      if (d >= 0 && d < 0.25) r += Math.exp(-d * 22) * 0.16;
    }
    return r;
  }
  function lastShot(t: number): number {
    let last = -Infinity;
    for (const s of shots) if (s.t <= t) last = s.t;
    return last;
  }

  /** Which target the gun is laid on at time t (0 = T1, 1 = T3, 2 = T2). */
  function aimGroup(t: number): number {
    if (t < S.magIn[0] + 0.2) return 0;
    if (t < S.magIn[1] + 0.2) return 1;
    return 2;
  }
  const groupTargets = [T1, T3, T2];

  function aimPoint(g: number, t: number, out = V()): THREE.Vector3 {
    const m = groupTargets[g]!;
    const tt = Math.min(t, m.hit ?? t);
    memberCenter(m, tt, out);
    memberQuat(m, tt, tmpQ);
    const local = m.hitLocal.clone().sub(V(0, CENTER_UP, 0));
    return out.add(local.applyQuaternion(tmpQ));
  }

  function zhangYaw(t: number): number {
    const turn = smooth(seg(t, S.turn[0], S.turn[1] - 0.4)) - smooth(seg(t, S.aim[0], S.aim[1] - 0.2));
    return turn * 0.55;
  }

  const departQ = quatFrom(BASE_DIR, V(0, 1, 0).addScaledVector(BASE_DIR, -BASE_DIR.y).normalize());
  function zhangTransform(t: number, pos: THREE.Vector3, quat: THREE.Quaternion): void {
    quat.copy(Q_ZHANG);
    const yaw = zhangYaw(t);
    if (yaw !== 0) quat.multiply(tmpQ.setFromAxisAngle(V(0, 1, 0), yaw));
    tmpQ.setFromEuler(new THREE.Euler(wobble(t * 0.2, 1) * 0.03, wobble(t * 0.17, 2) * 0.03, wobble(t * 0.13, 3) * 0.02));
    if (t < S.aim[0] || t > S.gunStow[0]) quat.multiply(tmpQ);
    pos.copy(ZPOS);
    pos.addScaledVector(Z_UP, Math.sin(t * 0.21) * 0.06);
    pos.addScaledVector(Z_RIGHT, Math.sin(t * 0.17) * 0.05);
    // arrival glide (seen in the vista)
    if (t < S.arrivePuff[1] + 1.5) {
      const k = 1 - easeInOut(seg(t, S.vista - 2.0, S.arrivePuff[1] + 1.5));
      pos.addScaledVector(Z_RIGHT, k * 26).addScaledVector(Z_UP, -k * 6);
    }
    // departure toward Base One
    if (t > S.depart[0] - 1.6) {
      const k = smooth(seg(t, S.depart[0] - 1.6, S.depart[0] + 0.6));
      quat.slerp(departQ, k);
      const dt = Math.max(0, t - S.depart[0]);
      const burn = S.depart[1] - S.depart[0];
      const d = dt < burn ? 0.5 * 5.5 * dt * dt : 0.5 * 5.5 * burn * burn + 5.5 * burn * (dt - burn);
      pos.addScaledVector(BASE_DIR, d);
    }
  }

  /* ---------------------------------------------------------- bullets */
  const slugGeo = slugGeometry();
  const slugMat = new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.55, roughness: 0.32, emissive: 0x15171a });
  const bullets: SpaceSet["bullets"] = [];
  const muzzleRef = ZPOS.clone().addScaledVector(Z_FWD, 0.82).addScaledVector(Z_UP, 0.42).addScaledVector(Z_RIGHT, -0.05);
  for (const s of shots) {
    const mesh = new THREE.Mesh(slugGeo, slugMat);
    mesh.visible = false;
    scene.add(mesh);
    const g = s.group;
    const j = s.index;
    const target = groupTargets[g]!;
    let ti = target.hit! + j * (g === 2 ? 0.025 : 0.03);
    const to = aimPoint(g, target.hit!, V());
    const r = mulberry32(s.group * 31 + j * 7 + 1);
    to.add(V((r() - 0.5) * 0.16, (r() - 0.5) * 0.1, (r() - 0.5) * 0.16));
    let miss = false;
    if (g === 0 && j === 4) { memberCenter(B1, B1.hit!, to); to.add(B1.hitLocal.clone().sub(V(0, CENTER_UP, 0)).applyQuaternion(memberQuat(B1, B1.hit!))); ti = B1.hit!; }
    if (g === 1 && j === 6) { memberCenter(B2, B2.hit!, to); to.add(B2.hitLocal.clone().sub(V(0, CENTER_UP, 0)).applyQuaternion(memberQuat(B2, B2.hit!))); ti = B2.hit!; }
    if ((g === 1 && j === 8) || (g === 2 && j === 2)) { to.add(V(0.7 * (j === 8 ? 1 : -1), 0, 0.5)); miss = true; }
    bullets.push({ mesh, tf: s.t, ti, from: muzzleRef.clone(), to, miss });
  }

  function bulletPos(k: number, t: number, out = V()): THREE.Vector3 {
    const b = bullets[k]!;
    const u = (t - b.tf) / (b.ti - b.tf);
    out.copy(b.from).lerp(b.to, u);
    return out;
  }

  /* ---------------------------------------------------------- FX pools */
  const plumes = new Particles(30 * 40 + 80, { soft: true });
  const mist = new Particles(240, { soft: true });
  const leaks = new Particles(5 * 70 + 220, { soft: true });
  const blood = new Particles(170, {});
  const ice = new Particles(170, { additive: true });
  const traffic = new Particles(12 * 6, { additive: true });
  for (const p of [plumes, mist, leaks, blood, ice, traffic]) scene.add(p.points);

  // floating construction debris around Zhang
  const debris: Array<{ mesh: THREE.Mesh; base: THREE.Vector3; axis: THREE.Vector3; w: number; drift: THREE.Vector3 }> = [];
  {
    const dr = mulberry32(77);
    for (let k = 0; k < 14; k++) {
      let geo: THREE.BufferGeometry;
      const kind = k % 4;
      if (kind === 0) {
        const g = new VoxelGrid(12, 2, 2);
        g.box(0, 0, 0, 12, 2, 2, 0x8d939b).box(0, 0, 0, 1, 2, 2, 0xc9a23a).box(11, 0, 0, 12, 2, 2, 0xc9a23a);
        geo = g.geometry(0.35, "center");
      } else if (kind === 1) {
        const g = new VoxelGrid(6, 1, 4);
        g.box(0, 0, 0, 6, 1, 4, 0x2c3d5e).box(0, 0, 0, 6, 1, 1, 0x9aa1a9);
        geo = g.geometry(0.5, "center");
      } else if (kind === 2) {
        geo = rockGeometry(k, 3, 0.25, () => 0xb4b8be, 0.1);
      } else {
        const g = new VoxelGrid(3, 3, 3);
        g.box(0, 0, 0, 3, 3, 3, 0xd8d0b8).box(1, 0, 0, 2, 3, 3, 0xb9452e);
        geo = g.geometry(0.4, "center");
      }
      const mesh = vmesh(geo, { roughness: 0.6, metalness: 0.3 });
      const dist = 45 + dr() * 170;
      const dir = V(dr() - 0.5, dr() - 0.5, dr() - 0.5).normalize();
      if (dir.dot(Z_FWD) > 0.75) dir.addScaledVector(Z_RIGHT, 1).normalize();
      const base = ZPOS.clone().addScaledVector(dir, dist);
      debris.push({ mesh, base, axis: V(dr() - 0.5, dr() - 0.5, dr() - 0.5).normalize(), w: 0.05 + dr() * 0.2, drift: V(dr() - 0.5, dr() - 0.5, dr() - 0.5).multiplyScalar(0.3) });
      scene.add(mesh);
    }
  }
  const movers = Array.from({ length: 12 }, (_, k) => {
    const r = mulberry32(500 + k);
    const start = ZPOS.clone().add(V((r() - 0.5) * 16000, (r() - 0.5) * 9000 + 3000, (r() - 0.5) * 16000));
    const dir = V(r() - 0.5, (r() - 0.5) * 0.4, r() - 0.5).normalize();
    return { start, dir, speed: 110 + r() * 60, col: r() > 0.5 ? new THREE.Color(0.85, 0.92, 1.0) : new THREE.Color(1.0, 0.8, 0.55) };
  });

  /* ------------------------------------------------------------ helpers */
  function headOf(m: Member | Actor, out = V()): THREE.Vector3 {
    const actor = m instanceof Actor ? m : m.actor;
    actor.fig.anchors.head.updateWorldMatrix(true, false);
    return actor.fig.anchors.head.localToWorld(out.set(0, -4, 0));
  }
  function zhangHead(out = V()): THREE.Vector3 {
    return headOf(zhang, out);
  }
  function zhangHand(out = V()): THREE.Vector3 {
    zhang.fig.anchors.handR.updateWorldMatrix(true, false);
    return zhang.fig.anchors.handR.getWorldPosition(out);
  }
  /** Zhang's own thruster output at time t (0..1). */
  function zThrust(ts: number): number {
    if (ts > S.arrivePuff[0] && ts < S.arrivePuff[1]) return 0.8;
    if (ts > S.turn[0] && ts < S.turn[0] + 0.35) return 0.5;
    if (ts > S.aim[0] && ts < S.aim[0] + 0.3) return 0.45;
    if (ts > S.depart[0] - 1.2 && ts < S.depart[0] - 0.7) return 0.5;
    if (ts > S.depart[0] && ts < S.depart[1]) return 1.0;
    return 0;
  }
  const nozzleGlows = zrig.nozzles.map((n) => {
    const g = glowSprite(0xbfe4ff, 4.5, 2.4);
    g.position.copy(n).add(V(0, 0, -0.6));
    zrig.pack.add(g);
    return g;
  });
  function muzzleWorld(out = V()): THREE.Vector3 {
    pistol.updateWorldMatrix(true, false);
    return pistol.localToWorld(out.copy(PISTOL_MUZZLE));
  }

  function placeActor(actor: Actor, center: THREE.Vector3, q: THREE.Quaternion): void {
    actor.holder.quaternion.copy(q);
    actor.holder.position.copy(center).sub(V(0, CENTER_UP, 0).applyQuaternion(q));
  }

  const _p = V();
  const _q = new THREE.Quaternion();
  const _c = new THREE.Color();
  const aimQ = new THREE.Quaternion();

  function alignWorld(obj: THREE.Object3D, worldQuat: THREE.Quaternion): void {
    obj.parent!.updateWorldMatrix(true, false);
    obj.parent!.getWorldQuaternion(_q);
    obj.quaternion.copy(_q.invert().multiply(worldQuat));
  }

  function plumeAt(i: number, t: number, s: { p: THREE.Vector3; c: THREE.Color; size: number; alpha: number }): boolean {
    // member plumes: 40 slots each, Zhang uses the tail of the pool
    const slots = 40;
    if (i >= members.length * slots) {
      // Zhang's thruster
      const k = i - members.length * slots;
      const dtStep = 0.05;
      const ts = Math.floor(t / dtStep) * dtStep - k * dtStep;
      const age = t - ts;
      const life = 1.6;
      if (age < 0 || age > life) return false;
      const power = zThrust(ts);
      if (power <= 0) return false;
      const zp = V();
      const zq = new THREE.Quaternion();
      zhangTransform(ts, zp, zq);
      const back = V(0, 0, -1).applyQuaternion(zq);
      const up = V(0, 1, 0).applyQuaternion(zq);
      const r = hash1(k * 13.1 + Math.floor(ts * 20));
      s.p.copy(zp).addScaledVector(back, 0.35).addScaledVector(up, 0.2 + (r - 0.5) * 0.5);
      s.p.addScaledVector(back, age * (6 + r * 4)).addScaledVector(up, (r - 0.5) * age * 2);
      s.size = 0.08 + age * 0.55;
      s.alpha = power * 0.3 * Math.pow(1 - age / life, 2);
      s.c.setRGB(0.92, 0.94, 0.97);
      return true;
    }
    const m = members[Math.floor(i / slots)]!;
    const k = i % slots;
    const step = 0.06;
    const ts = Math.floor(t / step) * step - k * step;
    const age = t - ts;
    // thrust phases
    let power = 0;
    let dirSign = 1;
    const ue = (ts - m.emerge) / m.dur;
    if (ue >= 0 && ue < 0.2) { power = 0.7; dirSign = -1; }
    else if (ue > 0.75 && ue < 0.98) { power = 0.4; dirSign = 1; }
    const rt = m.helper !== null ? -1 : m.retreat;
    const rdur = m.retreatDur + (m.towing !== null ? MEET : 0);
    const ur = rt > 0 ? (ts - rt) / rdur : -1;
    let life = 0.9;
    if (ur >= 0 && ur < 0.45) { power = 1.0; dirSign = -1; life = 2.2; }
    else if (ur >= 0.8 && ur < 1.0) { power = 0.5; dirSign = 1; }
    if (power <= 0 || age < 0 || age > life) return false;
    const c0 = memberCenter(m, ts, _p);
    const c1 = memberCenter(m, ts + 0.05, V());
    const vel = c1.sub(c0);
    if (vel.lengthSq() < 1e-8) return false;
    vel.normalize();
    const r = hash1(m.i * 17.3 + k * 3.1 + Math.floor(ts * 16.7));
    const r2 = hash1(m.i * 5.7 + k * 9.1 + Math.floor(ts * 16.7));
    s.p.copy(c0).addScaledVector(vel, -0.3 * dirSign);
    const spread = V(r - 0.5, r2 - 0.5, hash1(r * 91.0) - 0.5).multiplyScalar(2.2);
    s.p.addScaledVector(vel, -dirSign * age * (9 + r * 6)).addScaledVector(spread, age);
    s.size = 0.1 + age * 0.55;
    s.alpha = power * 0.075 * Math.pow(1 - age / life, 1.6);
    s.c.setRGB(0.93, 0.95, 0.98);
    return true;
  }

  const hitMembers = [T1, B1, T3, B2, T2];
  function leakAt(i: number, t: number, s: { p: THREE.Vector3; c: THREE.Color; size: number; alpha: number }): boolean {
    if (i < 5 * 70) {
      const m = hitMembers[Math.floor(i / 70)]!;
      const k = i % 70;
      if (m.hit === null || t < m.hit) return false;
      const step = 0.045;
      const ts = Math.floor((t - m.hit) / step) * step + m.hit - k * step;
      const age = t - ts;
      if (ts < m.hit || age < 0 || age > 1.1) return false;
      const strength = Math.exp(-(ts - m.hit) * (m.role === "T2" ? 0.9 : 0.55));
      if (strength < 0.04) return false;
      const c = memberCenter(m, ts, V());
      const q = memberQuat(m, ts, new THREE.Quaternion());
      const origin = c.add(m.hitLocal.clone().sub(V(0, CENTER_UP, 0)).applyQuaternion(q));
      const out = V(0, 0, 1).applyQuaternion(q);
      if (m.role === "B2") out.negate();
      const r = hash1(i * 7.3 + Math.floor(ts * 22));
      const r2 = hash1(i * 3.1 + Math.floor(ts * 22));
      if (age > 0.7) return false;
      s.p.copy(origin).addScaledVector(out, age * (9 + r * 7)).add(V(r - 0.5, r2 - 0.5, (r * r2) - 0.25).multiplyScalar(age * 4.5));
      s.size = 0.04 + age * 0.75;
      s.alpha = 0.6 * strength * Math.pow(1 - age / 0.7, 1.4);
      s.c.setRGB(0.95, 0.96, 1.0);
      return true;
    }
    // B2's ruptured tank: one big expanding cloud
    const k = i - 5 * 70;
    const t0 = B2.hit!;
    if (t < t0) return false;
    const age = t - t0;
    if (age > 5) return false;
    const r = mulberry32(900 + k);
    const dir = V(r() - 0.5, r() - 0.5, r() - 0.5).normalize();
    const speed = 2 + r() * 5;
    const c = memberCenter(B2, t0, V()).add(B2.hitLocal.clone().sub(V(0, CENTER_UP, 0)).applyQuaternion(memberQuat(B2, t0)));
    s.p.copy(c).addScaledVector(dir, speed * (1 - Math.exp(-age * 1.2)) / 1.2);
    s.size = 0.5 + age * 1.0 + r() * 0.6;
    s.alpha = 0.42 * Math.exp(-age * 0.7) * smooth(age / 0.08);
    s.c.setRGB(0.96, 0.97, 1.0);
    return true;
  }

  function bloodAt(i: number, t: number, s: { p: THREE.Vector3; c: THREE.Color; size: number; alpha: number }, iceMode: boolean): boolean {
    const t0 = S.impact.T2 + 0.55;
    const r = mulberry32(1300 + i);
    const birth = t0 + r() * 1.6;
    const age = t - birth;
    if (age < 0 || age > 6) return false;
    const c = memberCenter(T2, birth, V());
    const q = memberQuat(T2, birth, new THREE.Quaternion());
    const origin = c.add(V(-0.04, 1.52 - CENTER_UP, 0.3).applyQuaternion(q));
    const out = V(0, 0, 1).applyQuaternion(q);
    const dir = out.clone().add(V(r() - 0.5, r() - 0.5, r() - 0.5).multiplyScalar(1.1)).normalize();
    s.p.copy(origin).addScaledVector(dir, age * (1.2 + r() * 2.2));
    const freeze = smooth(age / 0.9);
    if (!iceMode) {
      s.c.setRGB(0.45, 0.02, 0.03);
      s.size = 0.005 + r() * 0.008;
      s.alpha = 1 - freeze;
      return s.alpha > 0.02;
    }
    const sparkle = 0.6 + 0.4 * Math.sin(t * (14 + r() * 20) + i);
    _c.setRGB(1.0, 0.82, 0.86).lerp(new THREE.Color(0.9, 0.95, 1.0), freeze);
    s.c.copy(_c).multiplyScalar(1.6 * sparkle * sunVisible(t) + 0.25);
    s.size = 0.008 + r() * 0.014;
    s.alpha = freeze * (1 - smooth((age - 4) / 2));
    return s.alpha > 0.02;
  }

  /* ------------------------------------------------------------ update */
  const sunTmp = V();
  const pos = V();
  const quat = new THREE.Quaternion();

  const set: SpaceSet = {
    scene,
    backdrop,
    station,
    members,
    targets: [T1, T2, T3],
    photographer,
    zhang,
    zrig,
    bullets,
    sunLight,
    memberCenter,
    memberQuat,
    headOf,
    zhangHead,
    zhangHand,
    zhangHolder: zhang.holder,
    muzzleWorld,
    bulletPos,
    aimPoint,
    setEnvironment(env) {
      scene.environment = env;
    },
    update(t, camera) {
      /* sun */
      sunDir(t, sunTmp);
      sunLight.position.copy(sunLight.target.position).addScaledVector(sunTmp, 200);
      sunColour(t, sunLight.color);
      sunLight.intensity = sunIntensity(t);
      backdrop.update(t, camera);

      /* hatch */
      const open = smooth(seg(t, S.doorOpen[0], S.doorOpen[1])) * (1 - smooth(seg(t, S.doorClose[0], S.doorClose[1])));
      const green = t >= S.green && t < S.red;
      station.setHatch(open, green, t);
      const floodOn = t > S.green ? smooth(seg(t, S.green, S.green + 0.6)) : 0;
      station.floods.forEach((f) => (f.intensity = floodOn * 9000));
      {
        const lampOn = smooth(seg(t, 238.0, 239.0)) * (1 - smooth(seg(t, S.retreat + 0.6, S.retreat + 1.2)));
        const lamp = photographer.actor.fig.root.getObjectByName("photoLamp") as THREE.SpotLight;
        lamp.intensity = lampOn * 1500;
        const glowMesh = photographer.actor.fig.root.getObjectByName("photoLampGlow") as THREE.Mesh;
        glowMesh.visible = lampOn > 0.05;
      }
      station.floodLamps.forEach((l) => ((l.material as THREE.MeshBasicMaterial).color.setScalar(0.4 + floodOn * 4)));

      /* group */
      for (const m of members) {
        const c = memberCenter(m, t, pos);
        const visible = memberVisible(m, t, c);
        m.actor.holder.visible = visible;
        if (!visible) continue;
        memberQuat(m, t, quat);
        placeActor(m.actor, c, quat);
        m.actor.pose(memberPose(m, t));
        const ex = memberExpr(m, t);
        m.actor.perform(t, ex.e, ex.speak, m.seed);
        m.rig.setVisor(smooth(seg(t, m.clearAt, m.clearAt + 0.5)));
        if (m.role === "T2") m.rig.setCrack(t >= S.impact.T2 ? smooth(seg(t, S.impact.T2, S.impact.T2 + 0.12)) : 0);
      }

      /* Zhang */
      zhangTransform(t, pos, quat);
      zhang.holder.position.copy(pos).sub(V(0, CENTER_UP, 0).applyQuaternion(quat));
      zhang.holder.quaternion.copy(quat);
      let pose = trackPose(zKeys, t);
      const drift = scalePose(floatPose(t * 0.6), 0.22);
      if (t < S.aim[0] || t > S.gunStow[0]) pose = addPose(pose, drift);
      else pose = addPose(pose, { lift: Math.sin(t * 1.3) * 0.05 });
      // glove twisting motion
      if (t > S.gloveTwist[0] && t < S.gloveTwist[1]) pose = addPose(pose, { armL: [0, Math.sin((t - S.gloveTwist[0]) * 18) * 0.25, 0] });
      const rc = recoil(t);
      if (rc > 0) pose = addPose(pose, { armR: [-rc, 0, 0], armL: [-rc * 0.9, 0, 0] });
      zhang.pose(pose);
      const zExpr: Expr = t > S.aim[1] && t < S.gunStow[0] ? "squint" : t > S.turn[0] ? "grim" : "neutral";
      zhang.perform(t, zExpr, false, 5);
      // outfit: bare liner glove frosting over
      if (t >= S.gloveOff && t < S.gloveOn) {
        const frost = clamp((t - S.gloveOff) / 55);
        zhang.setOutfit(`thin${Math.min(3, Math.floor(frost * 4))}`);
      } else zhang.setOutfit("suit");
      zhang.holder.updateMatrixWorld(true);

      /* Zhang's props */
      // pistol in hand between drawing and stowing
      const gunOut = t >= S.gunOut && t < S.gunStow[1];
      pistol.visible = gunOut;
      if (gunOut) {
        if (t > S.aim[0] + 0.6) {
          const g = aimGroup(t);
          const ap = aimPoint(g, Math.min(t, 300), V());
          const from = muzzleWorld(V());
          const dir = ap.sub(from).normalize();
          const kick = rc * 1.2;
          const q = quatFrom(dir, Z_UP);
          q.multiply(tmpQ.setFromAxisAngle(V(1, 0, 0), -kick));
          aimQ.copy(q);
          const blend = smooth(seg(t, S.aim[0] + 0.6, S.aim[1]));
          pistol.parent!.getWorldQuaternion(_q);
          const handQ = _q.clone();
          alignWorld(pistol, handQ.slerp(aimQ, blend));
        } else {
          pistol.quaternion.identity();
        }
      }
      // scope: telescope → floating → mounted
      if (t < S.gloveTwist[0] - 0.2) {
        if (scope.parent !== zhang.fig.anchors.handL) zhang.fig.anchors.handL.add(scope);
        scope.position.set(0, 0.2, 0.6);
        scope.scale.setScalar(1);
        const dir = HATCH.clone().sub(zhangHead(V())).normalize();
        if (t > S.scopeRaise[0]) alignWorld(scope, quatFrom(dir, Z_UP));
        else scope.quaternion.setFromEuler(new THREE.Euler(-0.6, 0, 0));
        scope.visible = true;
      } else if (t < S.scopeGrab) {
        if (scope.parent !== zPropsHolder) zPropsHolder.add(scope);
        const k = t - (S.gloveTwist[0] - 0.2);
        scope.scale.setScalar(figScale);
        scope.position.set(0.1 + k * 0.012, 1.55 - k * 0.03, 0.42 + k * 0.004);
        scope.rotation.set(0.2 + k * 0.05, k * 0.11, k * 0.03);
        scope.visible = true;
      } else if (t < S.scopeMount) {
        if (scope.parent !== zhang.fig.anchors.handL) zhang.fig.anchors.handL.add(scope);
        scope.scale.setScalar(1);
        scope.position.set(0, 0.3, 0.8);
        scope.rotation.set(0, 0, 0);
        scope.visible = true;
      } else {
        if (scope.parent !== pistol) pistol.add(scope);
        scope.scale.setScalar(1);
        scope.position.copy(PISTOL_RAIL).add(V(0, 0.55, -0.4));
        scope.rotation.set(0, 0, 0);
        scope.visible = gunOut;
      }
      // spare magazines floating at chest height until used
      spareMags.forEach((mag, k) => {
        const used = t >= S.magIn[k]! - 0.3;
        mag.visible = t >= S.gunOut + 0.2 && !used;
        mag.position.set(-0.12 + k * 0.1, 1.18 + Math.sin(t * 0.8 + k) * 0.01, 0.36);
        mag.rotation.set(0.3 + t * 0.05 * (k + 1), 0.4, 0.1 * k);
      });
      ejected.forEach((mag, k) => {
        const t0 = S.magOut[k]!;
        const age = t - t0;
        mag.visible = age >= 0 && age < 30;
        if (!mag.visible) return;
        mag.position.set(0.1 + age * 0.05, 1.05 - age * 0.12, 0.55 + age * 0.02);
        mag.rotation.set(age * 1.3, age * 0.7, 0);
      });
      // the glove drifts off and is recovered
      {
        const age = t - S.gloveOff;
        glove.visible = age >= 0 && t < S.gloveOn;
        if (glove.visible) {
          // drifts out to his right and up, slowing on its tether, then is pulled back in
          const drift = (a: number) => new THREE.Vector3(-0.2 - 0.5 * (1 - Math.exp(-a * 0.35)), 1.3 + 0.35 * (1 - Math.exp(-a * 0.3)), 0.4 + 0.15 * (1 - Math.exp(-a * 0.4)));
          if (t < S.gloveCatch) {
            glove.position.copy(drift(age));
            glove.rotation.set(age * 0.21, age * 0.13, age * 0.05);
          } else {
            const k = smooth((t - S.gloveCatch) / 0.6);
            glove.position.copy(drift(S.gloveCatch - S.gloveOff)).lerp(new THREE.Vector3(-0.25, 1.12, 0.4), k);
          }
        }
      }
      // muzzle flash
      const ls = lastShot(t);
      const flashAge = t - ls;
      flash.visible = gunOut && flashAge >= 0 && flashAge < 0.05;
      if (flash.visible) {
        const fs = flash.getObjectByName("flashSprite") as THREE.Sprite;
        flash.updateWorldMatrix(true, false);
        const fw = flash.getWorldPosition(V());
        const dist = fw.distanceTo(camera.position);
        // keep the flash a bright few pixels even from kilometres away: the firefly
        const s = Math.max(1, (dist * 0.02) / (3.2 * figScale));
        fs.scale.setScalar(3.2 * s);
        (fs.material as THREE.SpriteMaterial).color.setRGB(1, 0.83, 0.54).multiplyScalar(dist > 100 ? 14 : 6);
        flash.rotation.z = ls * 17.0;
        muzzleLight.position.copy(fw);
        muzzleLight.intensity = 6 * (1 - flashAge / 0.05);
      } else {
        muzzleLight.intensity = 0;
      }

      {
        const alarm = t >= S.gloveOff && t < S.gloveOn;
        const on = alarm ? Math.floor(t * 3) % 2 === 0 : true;
        (statusLamp.material as THREE.MeshBasicMaterial).color.set(alarm ? 0xff2a1a : 0x40ff80).multiplyScalar(on ? 3.2 : 0.3);
      }

      /* thruster nozzles glow while firing */
      {
        const p = zThrust(t);
        const dz = zhang.holder.getWorldPosition(V()).distanceTo(camera.position);
        nozzleGlows.forEach((g, k) => {
          g.visible = p > 0.01;
          const flick = 0.8 + 0.2 * Math.sin(t * 60 + k * 2.1);
          g.scale.setScalar(4.5 * Math.max(1, dz / 12));
          (g.material as THREE.SpriteMaterial).color.setRGB(0.75, 0.9, 1.0).multiplyScalar(2.6 * p * flick);
        });
      }

      /* far glint on Zhang */
      {
        const zc = zhang.holder.getWorldPosition(V()).add(V(0, CENTER_UP, 0).applyQuaternion(zhang.holder.quaternion));
        const d = zc.distanceTo(camera.position);
        const far = smooth(seg(d, 15, 60));
        speck.visible = far > 0.01;
        speck.position.copy(zc);
        speck.scale.setScalar(Math.max(1.2, d * 0.012));
        const burning = zThrust(t) > 0.9 ? 1.4 : 0;
        // after sunset his suit beacon keeps blinking: a firefly in the dark
        const beacon = t > S.sunGone ? ((t * 1.1) % 1 < 0.22 ? 1.6 : 0.8) : 0;
        (speck.material as THREE.SpriteMaterial).color.setRGB(1, 0.92, 0.82).multiplyScalar(far * (0.5 + 1.2 * sunVisible(t) + burning + beacon));
      }

      /* bullets */
      bullets.forEach((b, k) => {
        const u = (t - b.tf) / (b.ti - b.tf);
        const vis = u > 0.0005 && (u < 1 || (b.miss && u < 1.25));
        b.mesh.visible = vis;
        if (!vis) return;
        bulletPos(k, t, b.mesh.position);
        orient(b.mesh, b.to.clone().sub(b.from).normalize(), Z_UP);
        b.mesh.rotateZ(t * 160 + k);
      });

      /* debris */
      for (const d of debris) {
        d.mesh.position.copy(d.base).addScaledVector(d.drift, t - 200);
        d.mesh.quaternion.setFromAxisAngle(d.axis, t * d.w + d.base.x);
      }

      /* particles */
      plumes.update((i, s) => plumeAt(i, t, s));
      mist.update((i, s) => {
        const r = mulberry32(3100 + i);
        const base = GROUP_C.clone().add(V((r() - 0.5) * 16, (r() - 0.3) * 9, (r() - 0.5) * 6));
        const drift = V(r() - 0.5, r() - 0.5, r() - 0.5).multiplyScalar(0.25);
        s.p.copy(base).addScaledVector(drift, t - 230);
        s.size = 1.2 + r() * 1.8 + (t - 230) * 0.03;
        const born = smooth(seg(t, 229 + r() * 3, 234 + r() * 2));
        const gone = 1 - smooth(seg(t, 244 + r() * 6, 266 + r() * 6));
        s.alpha = 0.03 * born * gone;
        s.c.setRGB(0.92, 0.94, 0.98);
        return s.alpha > 0.002;
      });
      leaks.update((i, s) => leakAt(i, t, s));
      blood.update((i, s) => bloodAt(i, t, s, false));
      ice.update((i, s) => bloodAt(i, t, s, true));
      traffic.update((i, s) => {
        const m = movers[Math.floor(i / 6)]!;
        const k = i % 6;
        s.p.copy(m.start).addScaledVector(m.dir, m.speed * (t - 170 - k * 0.6));
        const d = s.p.distanceTo(camera.position);
        s.size = Math.max(0.6, d * 0.0028) * (k === 0 ? 1 : 0.6);
        s.alpha = k === 0 ? 0.95 : 0.35 * (1 - k / 6);
        s.c.copy(m.col).multiplyScalar(k === 0 ? 2.2 : 0.8);
        return true;
      });
    },
  };
  return set;
}

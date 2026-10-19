import * as THREE from "three";
import { float, type Pose } from "@agentbench/voxel-kit";
import { Actor } from "../cast/actors";
import { reach, lookToward } from "../cast/ik";
import { SUIT_ZHANG, ZHANG_SPACE_BODY, suitTexture, type Expression } from "../cast/skins";
import { blendPose, easeInOut, hash1, mix, range, sat, smooth, stateTrack, wobble } from "../core/anim";
import { ParticleLayer } from "../core/particles";
import { Grid, MAT } from "../core/vox";
import { makeBackpack, makeGlove, makeMagazine, makePistol, makePouch, makeScope, makeSlug, type Pistol } from "../props";
import { RELOADS, SHOT_TIMES, sunPhase, spaceS } from "../story";
import { buildPhoto, type PhotoGroup } from "./photo";
import { EARTH_DIR, sunDirection, sunVisible, type Sky } from "./sky";
import { HATCH, WALL_Z, animateDebris, buildDebris, buildStation, type Station } from "./station";

export const BASE1_DIR = new THREE.Vector3(0.5, 0.16, 0.85).normalize();
const BASE1 = BASE1_DIR.clone().multiplyScalar(80000);

export type Focus = "zhang" | "group" | "hand" | "wide" | "none";

export interface SpaceOpts {
  flashGain?: number;
  fireflyPx?: number;
  /** Intensity of the camera-side fill light. */
  fill?: number;
  /** Draw Zhang as a fixed-size point of light (px) when he is too far to see. */
  beaconPx?: number;
}

export interface SpaceSet {
  group: THREE.Group;
  zhang: Actor;
  photo: PhotoGroup;
  station: Station;
  pistol: Pistol;
  scope: THREE.Group;
  sun: THREE.DirectionalLight;
  /** Eye point inside Zhang's helmet (world). */
  eye(out?: THREE.Vector3): THREE.Vector3;
  muzzle(out?: THREE.Vector3): THREE.Vector3;
  aimPoint(S: number, out?: THREE.Vector3): THREE.Vector3;
  /** Straight-line path of bullet i: muzzle at firing → impact point. */
  bulletPath(i: number): { from: THREE.Vector3; to: THREE.Vector3; fired: number; arrives: number };
  update(t: number, focus?: Focus): void;
  /** Camera-dependent extras: fill light, fixed-size distant lights, firefly. */
  frameCamera(t: number, camera: THREE.PerspectiveCamera, focus?: Focus, opts?: SpaceOpts): void;
}

const AIM_TARGETS = [new THREE.Vector3(0, 1.15, -5000), new THREE.Vector3(-1.05, 1.15, -5000), new THREE.Vector3(1.05, 1.15, -5000)];

export function buildSpace(sky: Sky): SpaceSet {
  const group = new THREE.Group();
  group.name = "space";

  const station = buildStation();
  group.add(station.group);
  const debris = buildDebris();
  group.add(debris);
  const photo = buildPhoto();
  group.add(photo.group);

  // ---------------------------------------------------------------- lights
  const sun = new THREE.DirectionalLight(0xffffff, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  group.add(sun, sun.target);
  const earthshine = new THREE.DirectionalLight(0x3a5a9a, 0.35);
  earthshine.position.copy(EARTH_DIR).multiplyScalar(100);
  group.add(earthshine);
  const ambient = new THREE.AmbientLight(0x1a2030, 0.25);
  group.add(ambient);
  // Camera-side fill: the cinematographer's cheat that lets a backlit face read.
  const fill = new THREE.DirectionalLight(0xb8c8e8, 0.8);
  group.add(fill, fill.target);

  // ---------------------------------------------------------------- Zhang
  const zhang = new Actor("zhang-space", ZHANG_SPACE_BODY, 1.8);
  zhang.setBodySpec("zhang-space", ZHANG_SPACE_BODY);
  const suitGloved = suitTexture("zhang", SUIT_ZHANG, { kind: "clear" });
  const suitBare = suitTexture("zhang", { ...SUIT_ZHANG, noRightGlove: true }, { kind: "clear" });
  zhang.wear(suitGloved);
  group.add(zhang.root);
  const pack = makeBackpack(0x596068, 0x474d55, 0x2c3035, 0xffb070);
  zhang.hold("back", pack).position.set(0, 0, -0.21);
  const pouch = makePouch(0x3a3f45);
  zhang.hold("hipR", pouch).position.set(-0.05, -0.05, 0.02);
  // Helmet light so his face reads after sunset.
  const helmetLamp = new THREE.PointLight(0xbfd8ff, 0.2, 0.9, 2);
  zhang.hold("head", helmetLamp).position.set(0, -0.16, 0.2);

  const pistol = makePistol();
  const scope = makeScope();
  const glove = makeGlove(0x474d55, 0x9ea4aa);
  const magA = makeMagazine();
  const magB = makeMagazine();
  const magEmptyA = makeMagazine();
  const magEmptyB = makeMagazine();
  for (const o of [pistol.root, scope, glove, magA, magB, magEmptyA, magEmptyB]) group.add(o);
  // Block fists are 22 cm across, so hand props are drawn a size up to read.
  pistol.root.scale.setScalar(1.45);
  scope.scale.setScalar(1.3);
  for (const m of [magA, magB, magEmptyA, magEmptyB]) m.scale.setScalar(1.45);
  const muzzleFlash = (() => {
    const g = new Grid();
    for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) for (let z = 0; z <= 6; z++) {
      const r = Math.hypot(x, y);
      if (r <= 3.2 - z * 0.45 || (z < 2 && r < 3.5 && (x === 0 || y === 0))) g.set(x, y, z, z < 2 ? 0xffffff : 0xffc070, true);
    }
    return g.toGroup(0.012, [0, 0, 0], { ...MAT, glow: MAT.glowHot });
  })();
  group.add(muzzleFlash);
  const flashLight = new THREE.PointLight(0xffc88a, 0, 4, 2);
  group.add(flashLight);

  // Bullets: thirty machined meteorite slugs in flight.
  const slugs = photo.bullets.map((b) => {
    const s = makeSlug(b.index + 3);
    s.scale.setScalar(1.5);
    group.add(s);
    return s;
  });

  const zhangParticles = new ParticleLayer(1800, THREE.NormalBlending);
  group.add(zhangParticles.points);
  const farPoints = new ParticleLayer(64, THREE.AdditiveBlending);
  group.add(farPoints.points);

  // ---------------------------------------------------------------- performance
  // Root: floating 0,0,0 facing −Z. Turns toward the sun to warm the bare hand,
  // then away toward Base One for the flight home.
  const yawTrack = (S: number): number => {
    let y = Math.PI;
    // Turn the right side to the low sun so it falls on the bare hand.
    y -= 2.0 * smooth(range(S, 258.2, 259.9)) * (1 - smooth(range(S, 261.4, 263.0)));
    y += (Math.atan2(BASE1_DIR.x, BASE1_DIR.z) - Math.PI) * smooth(range(S, 303.0, 306.0));
    return y + wobble(S, 0.05, 2) * 0.03;
  };
  const departure = (S: number, out: THREE.Vector3): THREE.Vector3 => {
    const t = Math.max(0, S - 305.5);
    const d = t < 6 ? 1.1 * t * t : 39.6 + 13.2 * (t - 6);
    return out.copy(BASE1_DIR).multiplyScalar(d);
  };

  const R_HAND = (target: [number, number, number]) => reach("R", target);
  const L_HAND = (target: [number, number, number]) => reach("L", target);
  const rest = (S: number): Pose => {
    const f = float(S * 0.5 + 3);
    return { ...f, armR: [-0.55 + Math.sin(S * 0.6) * 0.05, 0, -0.32], armL: [-0.45, 0, 0.38], neck: [0.05 + f.neck![0] * 0.4, f.neck![1] * 0.3, 0], hips: [-0.08, 0, 0] };
  };
  const scopeEye: Pose = { armR: R_HAND([-1.5, 14.5, 10]), armL: L_HAND([1.5, 6, 8]), neck: [0, 0, 0] };
  const twistGlove = (S: number): Pose => ({
    armR: R_HAND([-1, 6, 9]),
    armL: [...L_HAND([-1.5, 3.5, 10.5])].map((v, i) => (i === 1 ? v + Math.sin(S * 9) * 0.25 : v)) as [number, number, number],
    neck: [0.45, 0, 0],
  });
  const warmHand: Pose = { armR: R_HAND([-9, 6, 4]), armL: L_HAND([4, 0, 5]), neck: [0.3, -0.5, 0] };
  const intoPouch: Pose = { armR: R_HAND([-6, -1, 2]), armL: L_HAND([4, 1, 6]), neck: [0.5, -0.3, 0] };
  const holdOut: Pose = { armR: R_HAND([-2, 4, 9]), armL: L_HAND([2, 5, 8]), neck: [0.35, 0, 0] };
  const grabScope: Pose = { armR: R_HAND([-2, 4, 9]), armL: L_HAND([0, 15, 10]), neck: [0.1, 0, 0] };
  const mountScope: Pose = { armR: R_HAND([-1.5, 7, 9]), armL: L_HAND([-1, 8.5, 9.5]), neck: [0.3, 0, 0] };
  const aimPose = (S: number): Pose => {
    let kick = 0;
    for (const s of SHOT_TIMES) {
      if (S >= s && S < s + 0.3) kick += Math.exp(-(S - s) * 22) * 0.07;
    }
    const sway = wobble(S, 0.6, 9) * 0.006;
    return {
      armR: [R_HAND([-0.8, 15.2, 10])[0] - kick + sway, R_HAND([-0.8, 15.2, 10])[1], R_HAND([-0.8, 15.2, 10])[2]],
      armL: [L_HAND([-0.4, 14.4, 9.6])[0] - kick * 0.7 + sway, L_HAND([-0.4, 14.4, 9.6])[1], L_HAND([-0.4, 14.4, 9.6])[2]],
      neck: [0.02, 0.06, 0],
      hips: [0, 0, 0],
      legR: [-0.3, 0, 0.08],
      legL: [-0.12, 0, -0.08],
    };
  };
  const reloadPose = (S: number, r: number): Pose => {
    const k = range(S, r, r + 0.9);
    const toChest = Math.sin(k * Math.PI);
    return blendPose(aimPose(S), { armR: R_HAND([-1, 11, 9]), armL: L_HAND([1, 6, 5]), neck: [0.35, 0, 0] }, toChest);
  };
  const stowPose: Pose = { armR: R_HAND([-6, 0, 3]), armL: [-0.5, 0, 0.35], neck: [0.2, 0, 0] };
  const flyPose = (S: number): Pose => ({ armR: [0.3, 0, -0.15], armL: [0.3, 0, 0.15], legR: [0.15, 0, -0.03], legL: [0.2, 0, 0.03], neck: [-0.15 + Math.sin(S * 0.4) * 0.03, 0, 0], hips: [0.5, 0, 0] });

  function zhangPose(S: number): Pose {
    const r = rest(S);
    if (S < 183) return r;
    if (S < 194) return blendPose(r, scopeEye, smooth(range(S, 183, 185.4)));
    if (S < 228) return blendPose(scopeEye, r, smooth(range(S, 194, 197)));
    if (S < 250) return blendPose(r, scopeEye, smooth(range(S, 228, 229.6)));
    if (S < 254) return blendPose(scopeEye, { ...r, armR: R_HAND([-6, 8, 7]) }, smooth(range(S, 250.3, 251.6)));
    if (S < 258.2) return blendPose({ ...r, armR: R_HAND([-6, 8, 7]) }, twistGlove(S), smooth(range(S, 254, 255)));
    if (S < 259.6) return blendPose(twistGlove(S), warmHand, smooth(range(S, 258.2, 259.4)));
    if (S < 260.8) return blendPose(warmHand, intoPouch, smooth(range(S, 259.6, 260.4)));
    if (S < 262.6) return blendPose(intoPouch, holdOut, smooth(range(S, 260.8, 261.8)));
    if (S < 264.4) return blendPose(holdOut, grabScope, smooth(range(S, 262.6, 263.5)));
    if (S < 266.6) return blendPose(grabScope, mountScope, smooth(range(S, 264.4, 265.4)));
    if (S < 300.6) {
      let p = blendPose(mountScope, aimPose(S), smooth(range(S, 266.6, 268.4)));
      for (const rl of RELOADS) if (S >= rl && S < rl + 0.9) p = reloadPose(S, rl);
      return p;
    }
    if (S < 303.2) return blendPose(aimPose(S), stowPose, smooth(range(S, 300.6, 302.4)));
    return blendPose(stowPose, flyPose(S), smooth(range(S, 303.2, 306)));
  }

  const exprTrack = stateTrack<Expression>([
    [0, "neutral"],
    [186, "narrow"],
    [196, "neutral"],
    [218.6, "blink"],
    [221.4, "neutral"],
    [229.6, "narrow"],
    [250, "neutral"],
    [268, "narrow"],
    [300.8, "neutral"],
    [304, "grim"],
  ]);

  // ---------------------------------------------------------------- props
  const tmpV = new THREE.Vector3();
  const tmpQ = new THREE.Quaternion();
  const tmpM = new THREE.Matrix4();
  const handR = new THREE.Object3D();
  const handL = new THREE.Object3D();
  zhang.hold("handR", handR);
  zhang.hold("handL", handL);
  /** Place a prop at a hand with a chosen world forward direction. */
  const atHand = (prop: THREE.Object3D, hand: THREE.Object3D, forward: THREE.Vector3, offset: THREE.Vector3, up = new THREE.Vector3(0, 1, 0)) => {
    hand.getWorldPosition(prop.position);
    tmpM.lookAt(new THREE.Vector3(), forward.clone().negate(), up);
    prop.quaternion.setFromRotationMatrix(tmpM);
    prop.position.add(offset.clone().applyQuaternion(prop.quaternion));
  };
  const F_AIM = new THREE.Vector3(0, 0, -1);

  function placeProps(S: number): void {
    zhang.root.updateWorldMatrix(true, true);
    // Scope: held → floating → in left hand → mounted.
    if (S < 250.3) {
      atHand(scope, handR, F_AIM, new THREE.Vector3(0, 0.03, 0.14));
      if (capturing) scopeReleaseAt.copy(scope.position);
    } else if (S < 263.5) {
      const d = S - 250.3;
      scope.position.copy(scopeReleaseAt).add(new THREE.Vector3(0.012 * d, -0.004 * d, 0.004 * d));
      scope.quaternion.setFromEuler(new THREE.Euler(0.03 * d, Math.PI + 0.05 * d, 0.02 * d));
    }
    // Pistol.
    const out = S >= 260.8 && S < 302.4;
    pistol.root.visible = out;
    if (out) {
      const aimDir = S > 266.6 ? aimDirection(S) : new THREE.Vector3(0, 0.3, -1).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), zhang.root.rotation.y - Math.PI);
      atHand(pistol.root, handR, aimDir, new THREE.Vector3(0, 0.05, 0.13));
      let kick = 0;
      for (const s of SHOT_TIMES) if (S >= s && S < s + 0.12) kick = Math.max(kick, 1 - (S - s) / 0.12);
      pistol.slide.position.z = -0.025 * kick;
    }
    // Scope in the left hand on its way to the rail, then mounted.
    if (S >= 263.5 && S < 265.4) {
      const k = smooth(range(S, 263.5, 264.0));
      atHand(scope, handL, F_AIM, new THREE.Vector3(0, 0.05, 0.12));
      scope.position.lerp(scopeReleaseAt, 1 - k);
    } else if (S >= 265.4 && S < 302.4) {
      pistol.rail.getWorldPosition(scope.position);
      scope.quaternion.copy(pistol.root.quaternion);
      scope.position.add(new THREE.Vector3(0, 0.075, 0.03).applyQuaternion(scope.quaternion));
    } else if (S >= 302.4) {
      scope.visible = false;
    }
    scope.visible = S < 302.4;
    // Glove: on the hand (painted) until 256.6, then a separate prop drifting away.
    const gloveOff = S >= 256.6;
    zhang.wear(gloveOff ? suitBare : suitGloved);
    glove.visible = gloveOff && S < 330;
    if (gloveOff) {
      const d = S - 256.6;
      glove.position.copy(gloveReleaseAt).add(new THREE.Vector3(0.11 * d, 0.05 * d, -0.06 * d));
      glove.rotation.set(0.6 + d * 0.5, d * 0.3, d * 0.8);
    } else {
      atHand(glove, handR, new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0.02));
      if (capturing) gloveReleaseAt.copy(glove.position);
    }
    // Spare magazines ride on the chest, then go into the gun.
    const onChest = (m: THREE.Object3D, slot: number, until: number) => {
      m.visible = S >= 261.6 && S < until;
      if (!m.visible) return;
      zhang.fig.joints.hips.localToWorld(tmpV.set(-1.5 + slot * 2.6, 8, 2.9));
      m.position.copy(tmpV);
      m.quaternion.copy(zhang.root.getWorldQuaternion(tmpQ));
    };
    onChest(magA, 0, RELOADS[0] + 0.35);
    onChest(magB, 1, RELOADS[1] + 0.35);
    const dropped = (m: THREE.Object3D, at: number, k: number) => {
      m.visible = S >= at && S < at + 14;
      if (!m.visible) return;
      const d = S - at;
      pistol.magWell.getWorldPosition(m.position);
      if (S > at + 0.05) {
        m.position.copy(magDropPos[k]!).add(new THREE.Vector3(0.05 * d, -0.18 * d, 0.07 * d));
        m.rotation.set(d * 1.3, d * 0.4, d * 0.9);
      } else if (capturing) {
        magDropPos[k]!.copy(m.position);
      }
    };
    dropped(magEmptyA, RELOADS[0] + 0.1, 0);
    dropped(magEmptyB, RELOADS[1] + 0.1, 1);
  }
  let capturing = false;
  const scopeReleaseAt = new THREE.Vector3();
  const gloveReleaseAt = new THREE.Vector3();
  const magDropPos = [new THREE.Vector3(), new THREE.Vector3()];

  function aimDirection(S: number): THREE.Vector3 {
    const muzzleW = new THREE.Vector3();
    eyePoint(muzzleW);
    const target = aimPoint(S, new THREE.Vector3());
    return target.sub(muzzleW).normalize();
  }

  function aimPoint(S: number, out = new THREE.Vector3()): THREE.Vector3 {
    let idx = 0;
    if (S >= 274.0) idx = 1;
    if (S >= 276.3) idx = 2;
    if (S >= 278.2) idx = 0;
    const base = AIM_TARGETS[idx]!;
    const tp = photo.targets[idx]!;
    const p = new THREE.Vector3();
    const q = new THREE.Quaternion();
    if (photo.transformAt(tp, Math.min(S, 281.9), p, q)) {
      out.copy(p).add(new THREE.Vector3(0, tp.height * 0.6, 0));
    } else out.copy(base);
    if (S > 280.5) out.lerp(new THREE.Vector3(0.2, 1.2, -5000.5), smooth(range(S, 280.5, 282)) * 0);
    return out;
  }

  function eyePoint(out = new THREE.Vector3()): THREE.Vector3 {
    zhang.root.updateWorldMatrix(true, true);
    return zhang.fig.joints.neck.localToWorld(out.set(0, 4.1, 3.2));
  }

  function muzzlePoint(out = new THREE.Vector3()): THREE.Vector3 {
    pistol.root.updateWorldMatrix(true, true);
    return pistol.muzzle.getWorldPosition(out);
  }

  // Pre-evaluate the instants where props leave the hands, so that the
  // floating positions are a pure function of time even when seeking.
  function evaluateZhang(S: number): void {
    zhang.root.position.copy(departure(S, tmpV));
    zhang.root.rotation.set(0, yawTrack(S), 0, "YXZ");
    zhang.pose(zhangPose(S));
    zhang.root.updateWorldMatrix(true, true);
  }
  capturing = true;
  for (const at of [250.29, 256.59, RELOADS[0] + 0.12, RELOADS[1] + 0.12]) {
    evaluateZhang(at);
    placeProps(at);
  }
  capturing = false;

  // ---------------------------------------------------------------- frame update
  const sunDir = new THREE.Vector3();
  const focusPoint = new THREE.Vector3();
  let lastFlash = 0;
  function update(t: number, focus: Focus = "zhang"): void {
    const S = spaceS(t);
    evaluateZhang(S);
    const phase = sunPhase(S);
    sky.update(phase);
    sunDirection(phase, sunDir);
    const vis = sunVisible(phase);
    // Sunlight: white-gold, reddening and failing as the disc sinks.
    const warm = smooth(range(phase, 0.35, 0.95));
    sun.color.setRGB(1, mix(0.92, 0.55, warm), mix(0.82, 0.3, warm));
    sun.intensity = 6.5 * (0.22 + 0.78 * Math.sqrt(vis)) * smooth(vis / 0.03);
    earthshine.intensity = mix(0.5, 0.25, smooth(phase));
    // Shadow frustum follows what the shot is about.
    if (focus === "group") focusPoint.set(0, 1, -5010);
    else if (focus === "hand") eyePoint(focusPoint);
    else zhang.root.getWorldPosition(focusPoint).add(new THREE.Vector3(0, 1, 0));
    const span = focus === "group" ? 34 : focus === "hand" ? 1.6 : 3.2;
    sun.position.copy(focusPoint).addScaledVector(sunDir, 60);
    sun.target.position.copy(focusPoint);
    sun.castShadow = focus !== "wide" && focus !== "none" && vis > 0.01;
    const sc = sun.shadow.camera;
    sc.left = -span;
    sc.right = span;
    sc.top = span;
    sc.bottom = -span;
    sc.near = 1;
    sc.far = 140;
    sc.updateProjectionMatrix();

    // Station.
    const hs = photo.hatchState(S);
    station.hatch.red.visible = !hs.green;
    station.hatch.green.visible = hs.green;
    station.hatch.door.position.set(hs.slide * 7.2, 2, 1.0 + hs.open * 1.6);
    const blink = Math.floor(t * 1.2) % 2 === 0;
    station.beacons.visible = blink;
    animateDebris(debris, S);

    photo.update(S);

    // Zhang.
    evaluateZhang(S);
    zhang.face(exprTrack(S));
    helmetLamp.intensity = mix(0.22, 0.4, smooth(range(phase, 0.6, 1)));
    placeProps(S);

    // Muzzle flash and its light on the suit.
    let flash = 0;
    let shotIdx = -1;
    for (let k = 0; k < SHOT_TIMES.length; k++) {
      const d = S - SHOT_TIMES[k]!;
      if (d >= 0 && d < 0.06) {
        flash = 1 - d / 0.06;
        shotIdx = k;
      }
    }
    const fg = 1;
    lastFlash = flash;
    muzzleFlash.visible = flash > 0;
    if (flash > 0) {
      muzzlePoint(muzzleFlash.position);
      muzzleFlash.quaternion.copy(pistol.root.quaternion);
      muzzleFlash.scale.setScalar((0.6 + 0.6 * flash) * (0.85 + 0.3 * hash1(shotIdx, 4)) * fg);
    }
    flashLight.intensity = flash * 3.5 * fg;
    flashLight.position.copy(muzzleFlash.position);

    // Slugs in flight.
    const m0 = new THREE.Vector3();
    photo.bullets.forEach((b, k) => {
      const s = slugs[k]!;
      const live = S >= b.fired && S < b.arrives;
      s.visible = live;
      if (!live) return;
      const target = bulletTarget(b);
      m0.copy(bulletOrigin(b));
      const f = (S - b.fired) / (b.arrives - b.fired);
      s.position.copy(m0).lerp(target, f);
      s.lookAt(target);
      s.rotateX(Math.PI / 2);
      s.rotateY(S * 40 + k);
    });

    // Zhang's own thruster: puffs from the pack once he turns for home.
    zhangParticles.begin();
    const fireStart = 305.5;
    if (S > fireStart) {
      for (let k = 0; k < 160; k++) {
        const te = fireStart + k * 0.06;
        if (te > S) break;
        const age = S - te;
        if (age > 1.8) continue;
        const thrust = te < fireStart + 6 ? 1 : 0.35;
        const pos = departure(te, new THREE.Vector3());
        const back = BASE1_DIR.clone().negate();
        for (const sx of [-0.2, 0.2]) {
          const side = new THREE.Vector3().crossVectors(BASE1_DIR, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(sx);
          const o = pos.clone().add(new THREE.Vector3(0, 0.9, 0)).add(side).addScaledVector(back, 0.3);
          const r1 = hash1(k * 2 + (sx > 0 ? 1 : 0), 77) - 0.5;
          const r2 = hash1(k * 2 + 9, 78) - 0.5;
          const v = back.clone().multiplyScalar(4 + thrust * 3).add(new THREE.Vector3(r1, r2, r1 * r2).multiplyScalar(1.2));
          zhangParticles.push(o.x + v.x * age, o.y + v.y * age, o.z + v.z * age, 0.06 + age * 0.35, 0.9, 0.92, 0.95, 0.4 * thrust * (1 - age / 1.8));
        }
      }
    }
    zhangParticles.end();

  }

  function frameCamera(t: number, camera: THREE.PerspectiveCamera, focus: Focus = "zhang", opts: SpaceOpts = {}): void {
    // Fill from just above the lens, toward whatever the shot is about.
    fill.intensity = opts.fill ?? (focus === "group" ? 0.35 : focus === "hand" ? 1.8 : 1.3);
    // Always from just behind and above the lens, along the view.
    const vd = camera.getWorldDirection(new THREE.Vector3());
    fill.position.copy(camera.position).addScaledVector(vd, -20).add(new THREE.Vector3(0, 7, 0));
    fill.target.position.copy(camera.position).addScaledVector(vd, 20);
    if (opts.flashGain !== undefined) {
      muzzleFlash.scale.multiplyScalar(opts.flashGain);
      flashLight.intensity *= opts.flashGain;
    }
    const flash = lastFlash;
    // Distant lights: Base One, spacesuit traffic, and the firefly seen from the station.
    farPoints.begin();
    const focal = camera.projectionMatrix.elements[5] || 1;
    const H2 = farPoints.material.uniforms.uScale!.value as number;
    const px = (p: THREE.Vector3, sizePx: number) => (sizePx * p.distanceTo(camera.position)) / (focal * H2);
    const b1Blink = 0.5 + 0.5 * Math.sin(t * 2.4);
    farPoints.push(BASE1.x, BASE1.y, BASE1.z, px(BASE1, 2.2), 0.8, 0.9, 1.0, 0.5 + 0.5 * b1Blink);
    for (let k = 0; k < 9; k++) {
      const a = new THREE.Vector3((hash1(k, 1) - 0.5) * 30000, (hash1(k, 2) - 0.5) * 9000, -5540 + (hash1(k, 3) - 0.5) * 30000);
      const dir = new THREE.Vector3(hash1(k, 4) - 0.5, (hash1(k, 5) - 0.5) * 0.3, hash1(k, 6) - 0.5).normalize();
      const p = a.addScaledVector(dir, 140 * (t % 200));
      const on = 0.4 + 0.6 * Math.max(0, Math.sin(t * 3 + k * 1.3));
      farPoints.push(p.x, p.y, p.z, px(p, 1.6), 1.0, 0.85, 0.7, on);
    }
    if (opts.beaconPx) {
      const zp = zhang.root.position.clone().add(new THREE.Vector3(0, 1.2, 0));
      farPoints.push(zp.x, zp.y, zp.z, px(zp, opts.beaconPx), 1.2, 1.0, 0.85, 0.9);
    }
    if (opts.fireflyPx && flash > 0) {
      const mp = muzzleFlash.position;
      farPoints.push(mp.x, mp.y, mp.z, px(mp, opts.fireflyPx), 1.6, 1.3, 0.8, flash);
    }
    farPoints.end();
  }

  function bulletOrigin(b: { index: number }): THREE.Vector3 {
    // Muzzle position at the moment of firing (Zhang barely moves while aiming).
    return BULLET_ORIGINS[b.index]!;
  }
  const targetCache = new Map<number, THREE.Vector3>();
  function bulletTarget(b: { index: number; victim: number; local: [number, number, number]; arrives: number }): THREE.Vector3 {
    const hit = targetCache.get(b.index);
    if (hit) return hit.clone();
    const v = bulletTargetRaw(b);
    targetCache.set(b.index, v.clone());
    return v;
  }
  function bulletTargetRaw(b: { victim: number; local: [number, number, number]; arrives: number }): THREE.Vector3 {
    if (b.victim < 0) return new THREE.Vector3(b.local[0], b.local[1], WALL_Z + 2);
    const p = photo.people[b.victim]!;
    const pos = new THREE.Vector3();
    const q = new THREE.Quaternion();
    photo.transformAt(p, b.arrives, pos, q);
    return new THREE.Vector3(...b.local).applyQuaternion(q).add(pos);
  }
  const BULLET_ORIGINS = photo.bullets.map((b) => {
    evaluateZhang(b.fired);
    placeProps(b.fired);
    return muzzlePoint(new THREE.Vector3());
  });

  const set: SpaceSet = {
    group,
    zhang,
    photo,
    station,
    pistol,
    scope,
    sun,
    eye: (out = new THREE.Vector3()) => eyePoint(out),
    muzzle: (out = new THREE.Vector3()) => muzzlePoint(out),
    aimPoint,
    bulletPath: (i: number) => {
      const b = photo.bullets[i]!;
      return { from: bulletOrigin(b).clone(), to: bulletTarget(b), fired: b.fired, arrives: b.arrives };
    },
    update,
    frameCamera,
  };
  void HATCH;
  void easeInOut;
  void sat;
  void lookToward;
  return set;
}

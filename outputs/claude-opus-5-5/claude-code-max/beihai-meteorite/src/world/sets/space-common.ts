import * as THREE from "three";
import { sunsetPhase } from "../../timeline";
import { makeEarth, makeStars, makeSun, type Earth, type Sun } from "../sky";
import { VoxelGrid, vmesh, vglow } from "../vox";
import { glowSprite } from "../fx";
import { clamp, hash1 } from "../util";

/**
 * Shared geometry of the orbital world.
 *
 * World frame for every space shot: +Y points away from Earth, the Earth's
 * centre lies straight "down" (-Y). The Yellow River station is a horizontal
 * wheel centred on the origin; its exit hatch sits on the Earth-facing
 * underside of the rim. Zhang waits 5 km out, 12° off the Earth direction, so
 * the photo group (facing down toward the setting sun) faces him too.
 */

export const DEG = Math.PI / 180;
export const RIM_R = 400;
export const RIM_HALF = 32;
export const HATCH = new THREE.Vector3(0, -RIM_HALF, -RIM_R);
/** Unit vector from the hatch toward Zhang. */
export const ZDIR = new THREE.Vector3(0, -Math.cos(12 * DEG), -Math.sin(12 * DEG));
export const ZPOS = HATCH.clone().addScaledVector(ZDIR, 5000).add(new THREE.Vector3(-0.8, 0, 0));
/** Lineup centre of the photo group, 70 m out from the hull. */
export const GROUP_C = HATCH.clone().add(new THREE.Vector3(0, -70, 0));
/** "Up" inside the photograph (heads point this way). */
export const PHOTO_UP = new THREE.Vector3(0, 0, 1);
export const PHOTO_FWD = new THREE.Vector3(0, -1, 0);
/** Zhang's facing and up. */
export const Z_FWD = ZDIR.clone().negate();
export const Z_UP = PHOTO_UP.clone().addScaledVector(Z_FWD, -PHOTO_UP.dot(Z_FWD)).normalize();
export const Z_RIGHT = new THREE.Vector3().crossVectors(Z_FWD, Z_UP).normalize();
/** Direction from Zhang toward Base One, 80 km away. */
export const BASE_DIR = new THREE.Vector3(-0.82, -0.22, -0.5).normalize();

const EARTH_ANGLE = 8.7;
const SUN_ANGLE = 1.0;

/** Direction toward the sun at absolute time t (unit). */
export function sunDir(t: number, out = new THREE.Vector3()): THREE.Vector3 {
  const phase = sunsetPhase(t);
  const theta = (EARTH_ANGLE + SUN_ANGLE * (1 - 2 * phase)) * DEG;
  return out.set(0, -Math.cos(theta), Math.sin(theta));
}

/** Fraction of the solar disc still above the limb. */
export function sunVisible(t: number): number {
  return clamp(1 - sunsetPhase(t));
}

const WHITE_SUN = new THREE.Color(1.0, 0.94, 0.84);
const GOLD_SUN = new THREE.Color(1.0, 0.62, 0.3);
const RED_SUN = new THREE.Color(1.0, 0.32, 0.14);

export function sunColour(t: number, out = new THREE.Color()): THREE.Color {
  const p = sunsetPhase(t);
  if (p <= 0) return out.copy(WHITE_SUN).lerp(GOLD_SUN, clamp((p + 0.9) / 0.9) * 0.35);
  if (p < 0.6) return out.copy(WHITE_SUN).lerp(GOLD_SUN, 0.35 + (p / 0.6) * 0.65);
  return out.copy(GOLD_SUN).lerp(RED_SUN, clamp((p - 0.6) / 0.4));
}

/** Directional light intensity of the low sun. */
export function sunIntensity(t: number): number {
  const v = sunVisible(t);
  const k = Math.min(1, v / 0.35);
  return 3.2 * k * k * (3 - 2 * k) * (0.45 + 0.55 * v);
}

/* ------------------------------------------------------------- backdrop */

export interface Backdrop {
  scene: THREE.Scene;
  earth: Earth;
  sun: Sun;
  stars: THREE.Points;
  light: THREE.DirectionalLight;
  dock: THREE.Group;
  baseOne: THREE.Group;
  beacons: THREE.Sprite[];
  streak: THREE.Group;
  /** Advance sun, Earth and beacons to time t; `camera` orients billboards. */
  update(t: number, camera: THREE.Camera, sunOverride?: { dir: THREE.Vector3; t: number }): void;
}

export const EARTH_DIST = 1000;
export const SUN_DIST = 2600;

function dockGeometry(): { hull: THREE.BufferGeometry; lights: THREE.BufferGeometry } {
  // A shipyard frame barely begun: a spine with arched ribs, like the
  // skeleton of a beast on a beach.
  const L = 150;
  const g = new VoxelGrid(L, 44, 44);
  const lights = new VoxelGrid(L, 44, 44);
  const c = 22;
  for (let x = 4; x < L - 4; x++) {
    g.box(x, c - 1, c - 1, x + 1, c + 1, c + 1, 0x8b9097);
  }
  for (let k = 0; k < 13; k++) {
    const x0 = 8 + k * 11;
    const radius = 19 - Math.abs(k - 6) * 0.9;
    const built = k < 10 ? 1 : 0.55; // the far end is only half-built
    for (let a = 0; a < 200; a++) {
      const ang = (a / 200) * Math.PI * 2;
      if (Math.sin(ang) < -0.35) continue; // open keel
      if (a / 200 > built && Math.cos(ang) > 0) continue;
      const y = Math.round(c + Math.sin(ang) * radius);
      const z = Math.round(c + Math.cos(ang) * radius);
      g.box(x0, y, z, x0 + 2, y + 1, z + 1, k % 3 === 0 ? 0x9da3aa : 0x7e848c);
    }
    // stringers between ribs
    if (k < 12) {
      for (const ang of [0.5, 1.6, 2.6]) {
        const y = Math.round(c + Math.sin(ang) * radius);
        const z = Math.round(c + Math.cos(ang) * radius);
        g.box(x0, y, z, x0 + 11, y + 1, z + 1, 0x6f757d);
      }
    }
    const ty = Math.round(c + Math.sin(Math.PI * 0.5) * radius);
    lights.set(x0, ty + 1, c, hash1(k) > 0.5 ? 0xff4a3a : 0xffd8a0);
  }
  // a crane boom
  for (let y = c; y < 42; y++) g.box(60, y, c + 2, 61, y + 1, c + 3, 0xd1a23c);
  for (let x = 40; x < 61; x++) g.set(x, 41, c + 2, 0xd1a23c);
  lights.set(40, 42, c + 2, 0xff4a3a);
  return { hull: g.geometry(1, "center"), lights: lights.geometry(1.2, "center") };
}

function baseOneGeometry(): THREE.BufferGeometry {
  const g = new VoxelGrid(24, 10, 10);
  g.box(8, 2, 2, 16, 8, 8, 0xd8dadb);
  g.box(0, 4, 4, 8, 6, 6, 0x5b6170);
  g.box(16, 4, 4, 24, 6, 6, 0x5b6170);
  g.box(0, 3, 0, 7, 7, 1, 0x2b3a5c);
  g.box(17, 3, 0, 24, 7, 1, 0x2b3a5c);
  g.box(0, 3, 9, 7, 7, 10, 0x2b3a5c);
  g.box(17, 3, 9, 24, 7, 10, 0x2b3a5c);
  return g.geometry(0.12, "center");
}

export function buildBackdrop(): Backdrop {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const stars = makeStars();
  scene.add(stars);

  const earthRadius = EARTH_DIST * Math.sin(EARTH_ANGLE * DEG);
  const earth = makeEarth(earthRadius);
  earth.group.position.set(0, -EARTH_DIST, 0);
  scene.add(earth.group);

  const sun = makeSun(SUN_DIST * Math.tan(SUN_ANGLE * DEG));
  scene.add(sun.group);

  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  scene.add(light, light.target);
  scene.add(new THREE.AmbientLight(0x223044, 0.35));

  // Shipyard skeleton, far off to one side of the wheel.
  const dock = new THREE.Group();
  const dg = dockGeometry();
  const hull = vmesh(dg.hull, { roughness: 0.7, metalness: 0.3 });
  const lamps = vglow(dg.lights, 3.0);
  dock.add(hull, lamps);
  dock.scale.setScalar(0.42);
  dock.position.set(0.5, 0.62, 0.6).normalize().multiplyScalar(720);
  dock.lookAt(0, 0, 0);
  dock.rotateY(Math.PI / 2);
  dock.rotateX(0.35);
  scene.add(dock);

  // Base One: 80 km away, barely a shape.
  const baseOne = new THREE.Group();
  baseOne.add(vmesh(baseOneGeometry(), { roughness: 0.6 }));
  const blink = glowSprite(0x9fffd0, 3.2, 2.2);
  baseOne.add(blink);
  baseOne.position.copy(BASE_DIR).multiplyScalar(900);
  baseOne.lookAt(0, 0, 0);
  scene.add(baseOne);

  // Other outposts scattered like nomad tents on a prairie.
  const beacons: THREE.Sprite[] = [];
  const spots: Array<[number, number, number]> = [
    [0.9, 0.35, 0.25],
    [-0.4, 0.5, 0.75],
    [0.2, 0.85, -0.5],
    [-0.9, -0.1, 0.4],
    [0.6, -0.15, -0.78],
    [-0.15, 0.25, 0.95],
    [0.75, 0.6, -0.25],
  ];
  spots.forEach((s, i) => {
    const b = glowSprite(i % 2 ? 0xffd2a0 : 0xbfe0ff, 6 + (i % 3) * 3, 1.4);
    b.position.set(s[0], s[1], s[2]).normalize().multiplyScalar(1500);
    scene.add(b);
    beacons.push(b);
  });

  const streak = new THREE.Group();
  scene.add(streak);

  const sd = new THREE.Vector3();
  const sc = new THREE.Color();
  return {
    scene,
    earth,
    sun,
    stars,
    light,
    dock,
    baseOne,
    beacons,
    streak,
    update(t, camera, sunOverride) {
      // shots may move the planet (the prologue does); every frame starts from the orbital layout
      earth.group.position.set(0, -EARTH_DIST, 0);
      earth.group.scale.setScalar(1);
      const tt = sunOverride?.t ?? t;
      if (sunOverride) sd.copy(sunOverride.dir).normalize();
      else sunDir(tt, sd);
      sunColour(tt, sc);
      const vis = sunVisible(tt);
      sun.set(sd.clone().multiplyScalar(SUN_DIST), sc, 0.25 + 0.75 * vis, vis);
      sun.streak.quaternion.copy(camera.quaternion);
      const ring = 0.6 + 0.8 * clamp(1 - Math.abs(sunsetPhase(tt) - 0.45) * 1.4);
      earth.setSun(sd, 1.0, sc, ring);
      light.position.copy(sd).multiplyScalar(100);
      light.color.copy(sc);
      light.intensity = 0.4 + 2.4 * vis;
      const bm = (blink.material as THREE.SpriteMaterial);
      bm.opacity = (t * 0.8) % 1 < 0.18 ? 1 : 0.25;
      beacons.forEach((b, i) => {
        const m = b.material as THREE.SpriteMaterial;
        m.opacity = 0.55 + 0.45 * Math.sin(t * (0.7 + i * 0.13) + i * 2.0);
      });
    },
  };
}

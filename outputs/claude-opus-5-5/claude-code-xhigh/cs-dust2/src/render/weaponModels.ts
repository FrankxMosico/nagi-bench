import * as THREE from 'three';
import type { WeaponId } from '../engine/weapons.ts';

/**
 * Procedural weapon models. Origin = pistol grip (where the right hand holds), barrel along -Z,
 * up = +Y, units in metres. Shared by the third-person rigs and the first-person view model.
 */
export interface WeaponModel {
  id: WeaponId;
  group: THREE.Group;
  /** Muzzle position in model space. */
  muzzle: THREE.Vector3;
  /** Support-hand position in model space. */
  leftHand: THREE.Vector3;
  /** Detachable magazine (animated during reloads). */
  mag: THREE.Object3D | null;
  /** Blinking LED for the C4. */
  led: THREE.Mesh | null;
}

const matCache = new Map<string, THREE.MeshStandardMaterial>();
const geoCache = new Map<string, THREE.BufferGeometry>();

// No environment map in the scene, so metalness is kept low or metal would render near-black.
function mat(color: number, roughness = 0.55, metalness = 0.25, emissive = 0): THREE.MeshStandardMaterial {
  const key = `${color}|${roughness}|${metalness}|${emissive}`;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    if (emissive) {
      m.emissive = new THREE.Color(emissive);
      m.emissiveIntensity = 1.2;
    }
    matCache.set(key, m);
  }
  return m;
}

function boxGeo(w: number, h: number, d: number): THREE.BufferGeometry {
  const key = `b${w}|${h}|${d}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.BoxGeometry(w, h, d);
    geoCache.set(key, g);
  }
  return g;
}

function cylGeo(rt: number, rb: number, len: number, seg = 10): THREE.BufferGeometry {
  const key = `c${rt}|${rb}|${len}|${seg}`;
  let g = geoCache.get(key);
  if (!g) {
    g = new THREE.CylinderGeometry(rt, rb, len, seg);
    g.rotateX(Math.PI / 2); // along Z
    geoCache.set(key, g);
  }
  return g;
}

function box(parent: THREE.Object3D, w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, rx = 0): THREE.Mesh {
  const mesh = new THREE.Mesh(boxGeo(w, h, d), m);
  mesh.position.set(x, y, z);
  mesh.rotation.x = rx;
  // Weapon parts are tiny: skipping them in the shadow pass saves hundreds of draw calls.
  mesh.castShadow = false;
  parent.add(mesh);
  return mesh;
}

function cyl(parent: THREE.Object3D, rt: number, rb: number, len: number, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
  const mesh = new THREE.Mesh(cylGeo(rt, rb, len), m);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

const BLACK = 0x1c1c1e;
const GUNMETAL = 0x2c2d30;
const STEEL = 0x55585e;
const WOOD = 0x7a4a24;
const WOOD_DARK = 0x56331a;

function ak47(g: THREE.Group): Partial<WeaponModel> {
  const metal = mat(GUNMETAL);
  const wood = mat(WOOD, 0.7, 0.05);
  const woodDark = mat(WOOD_DARK, 0.7, 0.05);
  box(g, 0.05, 0.07, 0.3, metal, 0, 0.04, -0.12);
  box(g, 0.046, 0.022, 0.27, mat(0x37383b), 0, 0.085, -0.11);
  box(g, 0.046, 0.072, 0.25, wood, 0, 0.018, 0.16, 0.1);
  box(g, 0.05, 0.11, 0.03, woodDark, 0, 0.0, 0.29, 0.1);
  box(g, 0.034, 0.1, 0.045, woodDark, 0, -0.045, 0.015, 0.3);
  box(g, 0.054, 0.05, 0.17, wood, 0, 0.032, -0.36);
  box(g, 0.042, 0.032, 0.15, wood, 0, 0.078, -0.35);
  cyl(g, 0.011, 0.011, 0.3, metal, 0, 0.055, -0.59);
  box(g, 0.012, 0.045, 0.015, metal, 0, 0.085, -0.69);
  cyl(g, 0.015, 0.015, 0.045, metal, 0, 0.055, -0.75);
  box(g, 0.01, 0.025, 0.04, metal, 0, -0.005, -0.04); // trigger guard
  const mag = new THREE.Group();
  mag.position.set(0, -0.005, -0.19);
  const magMat = mat(0x6e3d1c, 0.6, 0.15);
  box(mag, 0.03, 0.075, 0.062, magMat, 0, -0.035, 0, 0.12);
  box(mag, 0.03, 0.07, 0.06, magMat, 0, -0.1, -0.02, 0.35);
  box(mag, 0.03, 0.065, 0.058, magMat, 0, -0.155, -0.055, 0.6);
  g.add(mag);
  return { muzzle: new THREE.Vector3(0, 0.055, -0.78), leftHand: new THREE.Vector3(0, 0.02, -0.34), mag };
}

function m4a4(g: THREE.Group): Partial<WeaponModel> {
  const upper = mat(0x2a2b2e, 0.5, 0.3);
  const lower = mat(0x323336, 0.5, 0.3);
  const black = mat(BLACK, 0.6, 0.3);
  box(g, 0.05, 0.065, 0.28, upper, 0, 0.045, -0.1);
  box(g, 0.046, 0.05, 0.2, lower, 0, -0.004, -0.06);
  box(g, 0.022, 0.016, 0.26, black, 0, 0.086, -0.1);
  box(g, 0.03, 0.04, 0.03, black, 0, 0.105, 0.01);
  box(g, 0.06, 0.06, 0.22, upper, 0, 0.045, -0.35);
  box(g, 0.064, 0.012, 0.2, black, 0, 0.081, -0.35);
  cyl(g, 0.01, 0.01, 0.24, black, 0, 0.045, -0.56);
  box(g, 0.014, 0.065, 0.02, black, 0, 0.095, -0.45);
  cyl(g, 0.014, 0.014, 0.05, black, 0, 0.045, -0.7);
  cyl(g, 0.016, 0.016, 0.16, black, 0, 0.05, 0.1);
  box(g, 0.045, 0.075, 0.17, black, 0, 0.03, 0.22);
  box(g, 0.034, 0.1, 0.045, black, 0, -0.05, 0.02, 0.35);
  const mag = new THREE.Group();
  mag.position.set(0, -0.025, -0.14);
  box(mag, 0.03, 0.15, 0.065, mat(0x3a3b3e, 0.5, 0.3), 0, -0.07, -0.01, 0.12);
  g.add(mag);
  return { muzzle: new THREE.Vector3(0, 0.045, -0.73), leftHand: new THREE.Vector3(0, 0.012, -0.33), mag };
}

function awp(g: THREE.Group): Partial<WeaponModel> {
  const olive = mat(0x55683a, 0.75, 0.1);
  const dark = mat(0x222324, 0.5, 0.3);
  box(g, 0.062, 0.09, 0.5, olive, 0, 0.02, -0.08);
  box(g, 0.05, 0.13, 0.3, olive, 0, 0.0, 0.3);
  box(g, 0.048, 0.04, 0.16, olive, 0, 0.085, 0.25);
  box(g, 0.054, 0.15, 0.03, dark, 0, -0.005, 0.46);
  cyl(g, 0.015, 0.012, 0.64, dark, 0, 0.05, -0.64);
  box(g, 0.042, 0.032, 0.07, dark, 0, 0.05, -0.98);
  cyl(g, 0.026, 0.026, 0.3, dark, 0, 0.135, -0.08);
  cyl(g, 0.036, 0.03, 0.08, dark, 0, 0.135, -0.26);
  cyl(g, 0.033, 0.026, 0.06, dark, 0, 0.135, 0.1);
  let lensGeo = geoCache.get('lens');
  if (!lensGeo) {
    lensGeo = new THREE.CircleGeometry(0.03, 16);
    geoCache.set('lens', lensGeo);
  }
  const lens = new THREE.Mesh(lensGeo, mat(0x3a6ea8, 0.1, 0.3, 0x112244));
  lens.position.set(0, 0.135, -0.301);
  lens.rotation.y = Math.PI;
  g.add(lens);
  box(g, 0.02, 0.05, 0.02, dark, 0, 0.09, -0.18);
  box(g, 0.02, 0.05, 0.02, dark, 0, 0.09, 0.03);
  box(g, 0.07, 0.012, 0.012, dark, 0.04, 0.06, 0.03);
  box(g, 0.022, 0.022, 0.022, dark, 0.075, 0.06, 0.03);
  box(g, 0.035, 0.09, 0.045, olive, 0, -0.05, 0.04, 0.3);
  const mag = new THREE.Group();
  mag.position.set(0, -0.03, -0.08);
  box(mag, 0.045, 0.07, 0.09, dark, 0, -0.035, 0);
  g.add(mag);
  return { muzzle: new THREE.Vector3(0, 0.05, -1.02), leftHand: new THREE.Vector3(0, -0.012, -0.36), mag };
}

function pistol(g: THREE.Group, slideColor: number, frameColor: number, long: boolean, silencer: boolean): Partial<WeaponModel> {
  const slide = mat(slideColor, 0.45, 0.35);
  const frame = mat(frameColor, 0.6, 0.25);
  const len = long ? 0.25 : 0.19;
  box(g, long ? 0.036 : 0.03, long ? 0.045 : 0.036, len, slide, 0, 0.052, -len / 2 + 0.03);
  box(g, 0.028, 0.026, len * 0.82, frame, 0, 0.022, -len * 0.4 + 0.02);
  box(g, long ? 0.036 : 0.03, 0.105, 0.048, frame, 0, -0.025, 0.005, 0.22);
  box(g, 0.006, 0.022, 0.04, frame, 0, -0.0, -0.045);
  if (long) box(g, 0.026, 0.028, 0.05, slide, 0, 0.06, -len + 0.02);
  let muzzleZ = -len + 0.03;
  if (silencer) {
    cyl(g, 0.017, 0.017, 0.16, mat(0x1b1b1d, 0.5, 0.3), 0, 0.052, muzzleZ - 0.08);
    muzzleZ -= 0.16;
  }
  const mag = new THREE.Group();
  mag.position.set(0, -0.075, 0.012);
  box(mag, 0.028, 0.02, 0.044, frame, 0, 0, 0);
  g.add(mag);
  return { muzzle: new THREE.Vector3(0, 0.052, muzzleZ - 0.01), leftHand: new THREE.Vector3(-0.022, -0.02, 0.0), mag };
}

function knife(g: THREE.Group): Partial<WeaponModel> {
  const handle = mat(BLACK, 0.7, 0.1);
  const blade = mat(0xd5d9de, 0.3, 0.45);
  box(g, 0.026, 0.032, 0.11, handle, 0, 0, 0.03);
  box(g, 0.045, 0.04, 0.012, mat(STEEL, 0.4, 0.4), 0, 0, -0.028);
  box(g, 0.005, 0.036, 0.16, blade, 0, 0.006, -0.11);
  const tip = box(g, 0.005, 0.026, 0.05, blade, 0, 0.012, -0.2, 0.45);
  tip.rotation.x = 0.45;
  return { muzzle: new THREE.Vector3(0, 0.01, -0.23), leftHand: new THREE.Vector3(-0.2, -0.1, 0.1), mag: null };
}

function c4(g: THREE.Group): Partial<WeaponModel> {
  const brick = mat(0xc2a36b, 0.85, 0.0);
  const black = mat(BLACK, 0.6, 0.2);
  for (let i = -1; i <= 1; i++) box(g, 0.055, 0.045, 0.21, brick, i * 0.058, 0, -0.1);
  box(g, 0.17, 0.008, 0.03, mat(0x333333), 0, 0.026, -0.03);
  box(g, 0.17, 0.008, 0.03, mat(0x333333), 0, 0.026, -0.17);
  box(g, 0.09, 0.03, 0.11, black, 0, 0.035, -0.1);
  box(g, 0.06, 0.004, 0.03, mat(0x113311, 0.3, 0, 0x22ff55), 0, 0.052, -0.12);
  box(g, 0.004, 0.004, 0.12, mat(0xaa2222), 0.05, 0.03, -0.1);
  box(g, 0.004, 0.004, 0.12, mat(0x2244aa), -0.05, 0.03, -0.1);
  const led = new THREE.Mesh(boxGeo(0.012, 0.012, 0.012), new THREE.MeshStandardMaterial({ color: 0x550000, emissive: new THREE.Color(0xff2020), emissiveIntensity: 0.2 }));
  led.position.set(0.03, 0.055, -0.07);
  g.add(led);
  return { muzzle: new THREE.Vector3(0, 0, -0.2), leftHand: new THREE.Vector3(-0.08, 0, -0.1), mag: null, led };
}

export function buildWeapon(id: WeaponId): WeaponModel {
  const group = new THREE.Group();
  group.name = `weapon:${id}`;
  let parts: Partial<WeaponModel>;
  switch (id) {
    case 'ak47':
      parts = ak47(group);
      break;
    case 'm4a4':
      parts = m4a4(group);
      break;
    case 'awp':
      parts = awp(group);
      break;
    case 'glock':
      parts = pistol(group, 0x2a2a2c, 0x3a3a3c, false, false);
      break;
    case 'usp':
      parts = pistol(group, 0x2b2c2f, 0x303134, false, true);
      break;
    case 'deagle':
      parts = pistol(group, 0xb9bbbf, 0x1d1d1f, true, false);
      break;
    case 'knife':
      parts = knife(group);
      break;
    case 'c4':
      parts = c4(group);
      break;
  }
  return {
    id,
    group,
    muzzle: parts.muzzle ?? new THREE.Vector3(),
    leftHand: parts.leftHand ?? new THREE.Vector3(),
    mag: parts.mag ?? null,
    led: parts.led ?? null,
  };
}

/** Removes a model from its parent. Geometries/materials are cached and shared, so nothing is disposed. */
export function releaseWeapon(m: WeaponModel): void {
  m.group.removeFromParent();
}

export function disposeWeaponCaches(): void {
  for (const g of geoCache.values()) g.dispose();
  for (const m of matCache.values()) m.dispose();
  geoCache.clear();
  matCache.clear();
}

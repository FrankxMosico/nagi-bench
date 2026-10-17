import * as THREE from 'three';
import type { WeaponId } from './types';

const metal = new THREE.MeshStandardMaterial({ color: 0x45494e, roughness: 0.38, metalness: 0.6 });
const darkMetal = new THREE.MeshStandardMaterial({ color: 0x2f3236, roughness: 0.48, metalness: 0.55 });
const wood = new THREE.MeshStandardMaterial({ color: 0x87512f, roughness: 0.74, metalness: 0.04 });
const tanPoly = new THREE.MeshStandardMaterial({ color: 0x7b7257, roughness: 0.72, metalness: 0.12 });
const olive = new THREE.MeshStandardMaterial({ color: 0x4a5039, roughness: 0.76, metalness: 0.1 });
const bladeMat = new THREE.MeshStandardMaterial({ color: 0xb9c1c4, roughness: 0.22, metalness: 0.92 });
const scopeGlass = new THREE.MeshStandardMaterial({ color: 0x68b8c9, roughness: 0.1, metalness: 0.65, emissive: 0x224b55, emissiveIntensity: 0.6 });

export const SHARED_WEAPON_MATERIALS = new Set<THREE.Material>([metal, darkMetal, wood, tanPoly, olive, bladeMat, scopeGlass]);

const glove = new THREE.MeshStandardMaterial({ color: 0x514a40, roughness: 0.82 });

function box(
  parent: THREE.Object3D, size: [number, number, number], pos: [number, number, number],
  mat: THREE.Material, rot?: [number, number, number],
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.position.set(...pos);
  if (rot) mesh.rotation.set(...rot);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function cyl(
  parent: THREE.Object3D, radius: number, length: number, pos: [number, number, number],
  mat: THREE.Material, axis: 'z' | 'y' = 'z',
) {
  const geo = new THREE.CylinderGeometry(radius, radius, length, 10);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...pos);
  if (axis === 'z') mesh.rotation.x = Math.PI / 2;
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

export interface WeaponModelResult {
  group: THREE.Group;
  muzzle: THREE.Object3D;
  muzzleZ: number;
}

export function buildWeaponModel(id: WeaponId): WeaponModelResult {
  const group = new THREE.Group();
  const muzzle = new THREE.Object3D();
  let muzzleZ = -0.8;

  if (id === 'ak47') {
    box(group, [0.09, 0.12, 0.55], [0, 0, -0.06], metal);
    box(group, [0.10, 0.075, 0.26], [0, 0.005, -0.42], wood);
    cyl(group, 0.022, 0.44, [0, 0.015, -0.69], darkMetal);
    cyl(group, 0.035, 0.16, [0, 0.015, -0.48], metal);
    box(group, [0.085, 0.13, 0.3], [0, -0.035, 0.33], wood, [-0.12, 0, 0]);
    box(group, [0.07, 0.19, 0.16], [0, -0.14, -0.03], metal, [0.28, 0, 0]);
    box(group, [0.055, 0.15, 0.08], [0, -0.13, 0.15], darkMetal, [-0.32, 0, 0]);
    box(group, [0.02, 0.055, 0.05], [0, 0.095, -0.35], darkMetal);
    box(group, [0.025, 0.075, 0.025], [0, 0.11, -0.62], darkMetal);
    box(group, [0.048, 0.045, 0.05], [0, 0.095, 0.03], darkMetal);
    box(group, [0.025, 0.018, 0.12], [0, 0.07, -0.09], darkMetal);
    muzzleZ = -0.93;
  } else if (id === 'm4a4') {
    box(group, [0.085, 0.105, 0.5], [0, 0, -0.04], metal);
    box(group, [0.09, 0.07, 0.35], [0, 0.0, -0.42], darkMetal);
    box(group, [0.075, 0.075, 0.18], [0, -0.01, -0.64], metal);
    cyl(group, 0.018, 0.25, [0, 0.008, -0.84], darkMetal);
    box(group, [0.075, 0.12, 0.28], [0, -0.03, 0.3], metal);
    box(group, [0.07, 0.17, 0.12], [0, -0.13, -0.02], darkMetal, [0.18, 0, 0]);
    box(group, [0.05, 0.14, 0.07], [0, -0.13, 0.14], darkMetal, [-0.28, 0, 0]);
    box(group, [0.02, 0.085, 0.22], [0, 0.11, -0.23], darkMetal);
    box(group, [0.032, 0.035, 0.08], [0, 0.105, 0.02], darkMetal);
    box(group, [0.025, 0.02, 0.5], [0, 0.008, -0.25], metal);
    muzzleZ = -0.97;
  } else if (id === 'awp') {
    box(group, [0.09, 0.12, 0.7], [0, 0, 0.05], olive);
    box(group, [0.095, 0.11, 0.32], [0, -0.005, 0.43], olive);
    box(group, [0.08, 0.075, 0.27], [0, 0.0, -0.46], tanPoly);
    cyl(group, 0.025, 0.72, [0, 0.02, -0.88], metal);
    cyl(group, 0.035, 0.12, [0, 0.02, -1.19], darkMetal);
    box(group, [0.075, 0.17, 0.14], [0, -0.13, 0.08], darkMetal, [0.2, 0, 0]);
    box(group, [0.06, 0.17, 0.08], [0, -0.12, 0.28], darkMetal, [-0.3, 0, 0]);
    // Scope
    cyl(group, 0.055, 0.36, [0, 0.14, -0.06], darkMetal);
    cyl(group, 0.07, 0.075, [0, 0.14, -0.25], darkMetal);
    cyl(group, 0.065, 0.075, [0, 0.14, 0.13], darkMetal);
    cyl(group, 0.052, 0.012, [0, 0.14, -0.289], scopeGlass);
    box(group, [0.04, 0.08, 0.05], [0, 0.09, -0.06], metal);
    box(group, [0.04, 0.08, 0.05], [0, 0.09, 0.06], metal);
    box(group, [0.045, 0.035, 0.14], [0, 0.065, 0.1], darkMetal);
    muzzleZ = -1.3;
  } else if (id === 'glock') {
    box(group, [0.055, 0.075, 0.28], [0, 0, -0.08], metal);
    box(group, [0.052, 0.06, 0.19], [0, -0.035, -0.07], darkMetal);
    box(group, [0.05, 0.14, 0.08], [0, -0.13, 0.02], darkMetal, [-0.22, 0, 0]);
    box(group, [0.055, 0.075, 0.065], [0, 0.0, 0.11], metal);
    box(group, [0.012, 0.018, 0.03], [0, 0.06, -0.2], darkMetal);
    muzzleZ = -0.33;
  } else if (id === 'usp') {
    box(group, [0.052, 0.07, 0.3], [0, 0, -0.09], metal);
    box(group, [0.048, 0.05, 0.16], [0, -0.035, -0.09], darkMetal);
    box(group, [0.05, 0.13, 0.075], [0, -0.12, 0.0], darkMetal, [-0.2, 0, 0]);
    cyl(group, 0.018, 0.14, [0, 0.0, -0.28], darkMetal);
    box(group, [0.012, 0.02, 0.03], [0, 0.055, -0.21], darkMetal);
    muzzleZ = -0.37;
  } else if (id === 'deagle') {
    box(group, [0.062, 0.095, 0.32], [0, 0, -0.08], metal);
    box(group, [0.058, 0.075, 0.2], [0, -0.045, -0.07], darkMetal);
    box(group, [0.055, 0.16, 0.085], [0, -0.14, 0.02], darkMetal, [-0.23, 0, 0]);
    box(group, [0.075, 0.055, 0.21], [0, 0.02, -0.14], darkMetal);
    cyl(group, 0.023, 0.08, [0, 0.012, -0.29], metal);
    box(group, [0.014, 0.022, 0.03], [0, 0.075, -0.22], darkMetal);
    muzzleZ = -0.36;
  } else {
    // Tactical knife
    box(group, [0.05, 0.08, 0.22], [0, -0.005, 0.08], glove);
    box(group, [0.09, 0.025, 0.07], [0, 0, -0.04], darkMetal);
    const blade = box(group, [0.028, 0.055, 0.3], [0, 0.02, -0.19], bladeMat);
    blade.geometry.translate(0, 0, -0.04);
    box(group, [0.02, 0.07, 0.1], [0, 0.02, -0.32], bladeMat, [0, 0.12, 0]);
    muzzleZ = -0.35;
  }

  muzzle.position.set(0, 0.015, muzzleZ);
  group.add(muzzle);
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = false;
    }
  });
  return { group, muzzle, muzzleZ };
}

export function addFirstPersonHands(group: THREE.Group, team: 'CT' | 'T' = 'CT') {
  const glove = new THREE.MeshStandardMaterial({ color: 0x2e2b26, roughness: 0.82, metalness: 0.05 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xa87852, roughness: 0.9 });
  const mk = (
    size: [number, number, number], pos: [number, number, number], mat: THREE.Material,
    rot?: [number, number, number],
  ) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
    mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    group.add(mesh);
    return mesh;
  };
  // Right hand wraps the pistol grip / rifle wrist.
  mk([0.075, 0.085, 0.13], [0.035, -0.115, 0.055], glove, [-0.2, 0, 0.08]);
  mk([0.026, 0.07, 0.04], [0.02, -0.155, 0.045], skin, [-0.25, 0, 0]);
  mk([0.06, 0.04, 0.07], [0.05, -0.17, 0.14], glove, [0.25, 0.08, 0]);
  // Supporting left hand sits under the handguard.
  mk([0.07, 0.055, 0.12], [-0.028, -0.09, -0.18], glove, [0.12, 0.12, 0]);
  mk([0.022, 0.055, 0.04], [-0.055, -0.125, -0.2], skin, [0.2, 0.1, 0]);
  mk([0.055, 0.04, 0.07], [-0.06, -0.16, -0.02], glove, [0.34, -0.12, 0]);
}

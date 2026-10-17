import * as THREE from 'three';
import type { Team, WeaponId } from './types';

export interface WeaponModelResult {
  group: THREE.Group;
  muzzle: THREE.Object3D;
  flash: THREE.Object3D;
}

interface MaterialPalette {
  metal: THREE.MeshStandardMaterial;
  darkMetal: THREE.MeshStandardMaterial;
  wood: THREE.MeshStandardMaterial;
  polymer: THREE.MeshStandardMaterial;
  accent: THREE.MeshStandardMaterial;
  gold: THREE.MeshStandardMaterial;
  blade: THREE.MeshStandardMaterial;
  glove: THREE.MeshStandardMaterial;
  sleeve: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
}

function palette(team: Team): MaterialPalette {
  return {
    metal: new THREE.MeshStandardMaterial({ color: '#6b7478', roughness: 0.38, metalness: 0.76 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: '#3b4346', roughness: 0.48, metalness: 0.64 }),
    wood: new THREE.MeshStandardMaterial({ color: '#7d4d28', roughness: 0.75 }),
    polymer: new THREE.MeshStandardMaterial({ color: '#3a4140', roughness: 0.62 }),
    accent: new THREE.MeshStandardMaterial({
      color: team === 'T' ? '#a74a2b' : '#396988',
      roughness: 0.55,
      metalness: 0.2,
    }),
    gold: new THREE.MeshStandardMaterial({ color: '#b59a68', roughness: 0.3, metalness: 0.8 }),
    blade: new THREE.MeshStandardMaterial({ color: '#9ca7ac', roughness: 0.18, metalness: 0.95 }),
    glove: new THREE.MeshStandardMaterial({
      color: team === 'T' ? '#2c231b' : '#1e2a31',
      roughness: 0.8,
    }),
    sleeve: new THREE.MeshStandardMaterial({
      color: team === 'T' ? '#5b432c' : '#2b4351',
      roughness: 0.9,
    }),
    skin: new THREE.MeshStandardMaterial({ color: '#a87856', roughness: 0.85 }),
  };
}

function addBox(
  group: THREE.Group,
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
  rx = 0,
  ry = 0,
  rz = 0,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addCylinder(
  group: THREE.Group,
  radius: number,
  length: number,
  mat: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
  rx = Math.PI / 2,
  segments = 10,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, segments), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.x = rx;
  mesh.castShadow = true;
  group.add(mesh);
  return mesh;
}

function addMuzzle(group: THREE.Group, z: number, y = 0): { muzzle: THREE.Object3D; flash: THREE.Object3D } {
  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, y, z);
  group.add(muzzle);
  const flashGroup = new THREE.Object3D();
  const flashMat = new THREE.MeshBasicMaterial({
    color: '#ffd36a',
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const starGeo = new THREE.ConeGeometry(0.075, 0.32, 5);
  const star = new THREE.Mesh(starGeo, flashMat);
  star.rotation.x = -Math.PI / 2;
  star.position.z = -0.15;
  const crossMat = flashMat.clone();
  crossMat.color.set('#fff3b8');
  const planeA = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.09), crossMat);
  planeA.position.z = -0.08;
  const planeB = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.32), crossMat);
  planeB.position.z = -0.08;
  flashGroup.add(star, planeA, planeB);
  flashGroup.position.set(0, y, z);
  flashGroup.visible = false;
  group.add(flashGroup);
  return { muzzle, flash: flashGroup };
}

function addViewHands(group: THREE.Group, team: Team, kind: 'rifle' | 'pistol' | 'knife' | 'sniper'): void {
  const p = palette(team);
  // Small gloves and short sleeve stubs keep the weapon silhouette readable.
  addBox(group, 0.07, 0.09, 0.125, p.glove, 0.02, -0.085, 0.045, 0, 0.04, 0.03).castShadow = false;
  addBox(group, 0.09, 0.075, 0.17, p.sleeve, 0.075, -0.16, 0.18, -0.2, -0.1, 0.12).castShadow = false;
  if (kind !== 'knife') {
    const supportZ = kind === 'pistol' ? -0.04 : kind === 'sniper' ? -0.32 : -0.26;
    addBox(group, 0.065, 0.078, 0.11, p.glove, -0.005, -0.05, supportZ, 0, 0.2, 0).castShadow = false;
    addBox(group, 0.08, 0.07, 0.16, p.sleeve, -0.055, -0.115, supportZ + 0.1, -0.25, 0.68, 0.1).castShadow = false;
  } else {
    addBox(group, 0.067, 0.078, 0.1, p.glove, -0.02, -0.045, 0.0, 0, 0.2, 0).castShadow = false;
    addBox(group, 0.08, 0.07, 0.15, p.sleeve, -0.06, -0.11, 0.1, -0.25, 0.75, 0.12).castShadow = false;
  }
  addBox(group, 0.05, 0.038, 0.045, p.skin, 0.019, -0.048, 0.115, 0, 0, 0).castShadow = false;
}

function createWorldWeaponModel(id: WeaponId, team: Team): WeaponModelResult {
  const group = new THREE.Group();
  group.name = `world_weapon_${id}`;
  const dark = new THREE.MeshStandardMaterial({ color: '#30383a', roughness: 0.5, metalness: 0.55 });
  const steel = new THREE.MeshStandardMaterial({ color: '#626c70', roughness: 0.38, metalness: 0.72 });
  const wood = new THREE.MeshStandardMaterial({ color: '#6e4929', roughness: 0.8 });
  const accent = new THREE.MeshStandardMaterial({
    color: team === 'T' ? '#9a4a2d' : '#365e73',
    roughness: 0.65,
  });
  let muzzleZ = -0.6;
  let muzzleY = 0.02;
  switch (id) {
    case 'ak47':
      addBox(group, 0.1, 0.13, 0.55, dark, 0, 0, -0.08);
      addBox(group, 0.085, 0.12, 0.28, wood, 0, -0.01, -0.46);
      addBox(group, 0.075, 0.09, 0.31, wood, 0, -0.015, 0.28);
      addBox(group, 0.075, 0.24, 0.1, dark, 0, -0.18, -0.13, 0.25, 0, 0);
      addBox(group, 0.03, 0.03, 0.28, steel, 0, 0.03, -0.75);
      muzzleZ = -0.9;
      muzzleY = 0.03;
      break;
    case 'm4a4':
      addBox(group, 0.105, 0.13, 0.58, dark, 0, 0, -0.08);
      addBox(group, 0.08, 0.09, 0.35, dark, 0, 0.01, -0.5);
      addBox(group, 0.08, 0.1, 0.3, accent, 0, -0.005, 0.26);
      addBox(group, 0.072, 0.23, 0.1, dark, 0, -0.17, -0.12, 0.18, 0, 0);
      addBox(group, 0.03, 0.03, 0.26, steel, 0, 0.015, -0.78);
      addBox(group, 0.05, 0.055, 0.2, dark, 0, 0.13, -0.1);
      muzzleZ = -0.92;
      muzzleY = 0.015;
      break;
    case 'awp':
      addBox(group, 0.11, 0.15, 0.72, dark, 0, 0, -0.2);
      addBox(group, 0.11, 0.14, 0.3, accent, 0, 0, 0.3);
      addCylinder(group, 0.026, 0.8, steel, 0, 0.02, -0.92, Math.PI / 2, 8);
      addCylinder(group, 0.062, 0.38, dark, 0, 0.14, -0.12, Math.PI / 2, 10);
      addBox(group, 0.09, 0.2, 0.11, dark, 0, -0.16, 0.08, -0.10, 0, 0);
      muzzleZ = -1.34;
      muzzleY = 0.02;
      break;
    case 'glock':
      addBox(group, 0.085, 0.115, 0.29, dark, 0, 0.01, -0.1);
      addBox(group, 0.065, 0.17, 0.11, wood, 0, -0.14, 0.01, 0.17, 0, 0);
      addBox(group, 0.075, 0.05, 0.2, steel, 0, -0.04, -0.13);
      muzzleZ = -0.26;
      muzzleY = 0.01;
      break;
    case 'usp':
      addBox(group, 0.08, 0.105, 0.28, dark, 0, 0.01, -0.1);
      addBox(group, 0.065, 0.16, 0.1, dark, 0, -0.13, 0.01, 0.15, 0, 0);
      addCylinder(group, 0.036, 0.18, steel, 0, 0.01, -0.32, Math.PI / 2, 8);
      muzzleZ = -0.42;
      muzzleY = 0.01;
      break;
    case 'deagle':
      addBox(group, 0.1, 0.13, 0.33, bronzeMaterial(), 0, 0.015, -0.12);
      addBox(group, 0.075, 0.17, 0.11, dark, 0, -0.14, 0.02, 0.16, 0, 0);
      addCylinder(group, 0.04, 0.17, steel, 0, 0.02, -0.36, Math.PI / 2, 8);
      muzzleZ = -0.47;
      muzzleY = 0.02;
      break;
    case 'knife':
      addBox(group, 0.05, 0.07, 0.22, dark, 0, 0, 0.07);
      addBox(group, 0.035, 0.085, 0.34, steel, 0, 0.045, -0.21, -0.12, 0, 0);
      addBox(group, 0.17, 0.025, 0.06, dark, 0, 0.005, -0.04);
      muzzleZ = -0.4;
      muzzleY = 0.03;
      break;
    default:
      break;
  }
  const { muzzle, flash } = addMuzzle(group, muzzleZ, muzzleY);
  return { group, muzzle, flash };
}

function bronzeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: '#ae9664', roughness: 0.32, metalness: 0.75 });
}

export function createWeaponModel(
  id: WeaponId,
  opts: { viewModel?: boolean; team?: Team } = {},
): WeaponModelResult {
  const team = opts.team ?? 'CT';
  if (!opts.viewModel) return createWorldWeaponModel(id, team);
  const p = palette(team);
  const group = new THREE.Group();
  group.name = `weapon_${id}`;
  let muzzleZ = -0.5;
  let muzzleY = 0.02;
  let kind: 'rifle' | 'pistol' | 'knife' | 'sniper' = 'rifle';

  switch (id) {
    case 'ak47': {
      kind = 'rifle';
      addBox(group, 0.095, 0.12, 0.48, p.darkMetal, 0, 0.01, -0.1);
      addBox(group, 0.085, 0.13, 0.26, p.wood, 0, -0.005, -0.43);
      addBox(group, 0.075, 0.075, 0.34, p.darkMetal, 0, 0.045, -0.7);
      addBox(group, 0.036, 0.036, 0.28, p.metal, 0, 0.035, -0.9);
      // Curved magazine.
      addBox(group, 0.076, 0.26, 0.105, p.darkMetal, 0, -0.18, -0.14, 0.28, 0, 0);
      addBox(group, 0.075, 0.12, 0.1, p.darkMetal, 0, -0.32, -0.09, 0.52, 0, 0);
      // Stock, pistol grip, sights.
      addBox(group, 0.09, 0.105, 0.3, p.wood, 0, -0.005, 0.3);
      addBox(group, 0.075, 0.2, 0.11, p.polymer, 0, -0.17, 0.08, -0.2, 0, 0);
      addBox(group, 0.055, 0.07, 0.06, p.darkMetal, 0, 0.11, -0.06);
      addBox(group, 0.04, 0.045, 0.035, p.darkMetal, 0, 0.105, -0.68);
      addBox(group, 0.12, 0.018, 0.17, p.wood, 0, -0.06, -0.45);
      muzzleZ = -1.04;
      muzzleY = 0.04;
      break;
    }
    case 'm4a4': {
      kind = 'rifle';
      addBox(group, 0.1, 0.12, 0.46, p.darkMetal, 0, 0.01, -0.1);
      addBox(group, 0.09, 0.09, 0.36, p.darkMetal, 0, 0.015, -0.48);
      addBox(group, 0.082, 0.082, 0.22, p.polymer, 0, 0.015, -0.72);
      addBox(group, 0.034, 0.034, 0.24, p.metal, 0, 0.015, -0.92);
      addBox(group, 0.075, 0.22, 0.095, p.polymer, 0, -0.16, -0.12, 0.2, 0, 0);
      addBox(group, 0.085, 0.12, 0.3, p.polymer, 0, 0.005, 0.32);
      addBox(group, 0.055, 0.07, 0.2, p.darkMetal, 0, 0.09, -0.05);
      addBox(group, 0.055, 0.045, 0.07, p.darkMetal, 0, 0.115, -0.22);
      addBox(group, 0.035, 0.07, 0.04, p.darkMetal, 0, 0.11, -0.75);
      addBox(group, 0.03, 0.05, 0.06, p.polymer, 0, 0.055, 0.04);
      addBox(group, 0.12, 0.02, 0.17, p.darkMetal, 0, -0.045, -0.43);
      // Carry-handle silhouette.
      addBox(group, 0.045, 0.05, 0.18, p.darkMetal, 0, 0.145, -0.08);
      muzzleZ = -1.04;
      muzzleY = 0.015;
      break;
    }
    case 'awp': {
      kind = 'sniper';
      addBox(group, 0.105, 0.14, 0.65, p.darkMetal, 0, 0.005, -0.22);
      addBox(group, 0.11, 0.13, 0.28, p.polymer, 0, -0.005, -0.64);
      addBox(group, 0.1, 0.11, 0.34, p.polymer, 0, -0.005, 0.3);
      addCylinder(group, 0.025, 0.74, p.metal, 0, 0.025, -0.95);
      addCylinder(group, 0.04, 0.1, p.darkMetal, 0, 0.025, -1.31, Math.PI / 2, 8);
      // Scope.
      addCylinder(group, 0.06, 0.37, p.darkMetal, 0, 0.145, -0.14, Math.PI / 2, 14);
      addCylinder(group, 0.078, 0.07, p.metal, 0, 0.145, -0.33, Math.PI / 2, 14);
      addCylinder(group, 0.065, 0.055, p.metal, 0, 0.145, 0.06, Math.PI / 2, 14);
      addBox(group, 0.045, 0.1, 0.055, p.darkMetal, 0, 0.08, -0.2);
      addBox(group, 0.045, 0.09, 0.05, p.darkMetal, 0, 0.08, -0.02);
      addBox(group, 0.09, 0.2, 0.1, p.polymer, 0, -0.16, 0.05, -0.15, 0, 0);
      addBox(group, 0.08, 0.08, 0.16, p.darkMetal, 0, -0.11, -0.4);
      addBox(group, 0.075, 0.2, 0.2, p.polymer, 0, -0.17, -0.24);
      muzzleZ = -1.46;
      muzzleY = 0.025;
      break;
    }
    case 'glock': {
      kind = 'pistol';
      addBox(group, 0.08, 0.11, 0.28, p.polymer, 0, 0.01, -0.12);
      addBox(group, 0.075, 0.085, 0.23, p.darkMetal, 0, -0.045, -0.13);
      addBox(group, 0.06, 0.17, 0.1, p.polymer, 0, -0.15, 0.0, 0.18, 0, 0);
      addBox(group, 0.025, 0.035, 0.08, p.darkMetal, 0, -0.1, -0.09);
      addBox(group, 0.03, 0.05, 0.035, p.metal, 0, 0.09, -0.25);
      muzzleZ = -0.31;
      muzzleY = 0.01;
      break;
    }
    case 'usp': {
      kind = 'pistol';
      addBox(group, 0.08, 0.1, 0.28, p.darkMetal, 0, 0.01, -0.12);
      addBox(group, 0.075, 0.085, 0.24, p.darkMetal, 0, -0.045, -0.12);
      addBox(group, 0.06, 0.16, 0.1, p.polymer, 0, -0.14, 0.01, 0.15, 0, 0);
      // Suppressor-like silhouette and tall sights.
      addCylinder(group, 0.038, 0.2, p.darkMetal, 0, 0.012, -0.34, Math.PI / 2, 12);
      addBox(group, 0.03, 0.055, 0.03, p.darkMetal, 0, 0.075, -0.24);
      addBox(group, 0.025, 0.035, 0.08, p.darkMetal, 0, -0.09, -0.08);
      muzzleZ = -0.49;
      muzzleY = 0.012;
      break;
    }
    case 'deagle': {
      kind = 'pistol';
      addBox(group, 0.095, 0.13, 0.34, p.gold, 0, 0.02, -0.13);
      addBox(group, 0.085, 0.08, 0.25, p.metal, 0, -0.055, -0.12);
      addBox(group, 0.07, 0.18, 0.115, p.polymer, 0, -0.16, 0.03, 0.18, 0, 0);
      addBox(group, 0.03, 0.04, 0.09, p.metal, 0, -0.115, -0.1);
      addBox(group, 0.038, 0.055, 0.04, p.gold, 0, 0.105, -0.27);
      addCylinder(group, 0.04, 0.17, p.metal, 0, 0.025, -0.4, Math.PI / 2, 10);
      muzzleZ = -0.51;
      muzzleY = 0.025;
      break;
    }
    case 'knife': {
      kind = 'knife';
      addBox(group, 0.045, 0.065, 0.23, p.polymer, 0, 0, 0.08, 0.05, 0, 0);
      addBox(group, 0.17, 0.025, 0.065, p.darkMetal, 0, 0.005, -0.05);
      // Blade, angled slightly.
      addBox(group, 0.035, 0.085, 0.33, p.blade, 0, 0.045, -0.23, -0.14, 0, 0);
      addBox(group, 0.03, 0.045, 0.12, p.blade, 0, 0.088, -0.36, -0.35, 0, 0);
      addBox(group, 0.02, 0.035, 0.04, p.darkMetal, 0, 0, 0.105);
      muzzleZ = -0.44;
      muzzleY = 0.02;
      break;
    }
    default:
      break;
  }

  if (opts.viewModel) {
    addViewHands(group, team, kind);
    // View model scale is tuned for a 70° camera with the gun near the lens.
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }

  const { muzzle, flash } = addMuzzle(group, muzzleZ, muzzleY);
  return { group, muzzle, flash };
}

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose();
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of materials) {
        if (mat instanceof THREE.MeshStandardMaterial) {
          for (const key of ['map', 'normalMap', 'roughnessMap'] as const) {
            const map = mat[key];
            if (map) map.dispose();
          }
        }
        mat.dispose();
      }
    }
  });
}

import * as THREE from 'three';
import type { HitPart, Team, Vec2 } from './types';
import type { WeaponId } from './weapons';
import { clamp } from './math';

export interface HitboxWorld {
  part: HitPart;
  box: THREE.Box3;
}

interface TeamPalette {
  shirt: number;
  pants: number;
  vest: number;
  skin: number;
  helmet: number;
  accent: number;
  boots: number;
}

const PALETTES: Record<Team, TeamPalette> = {
  T: {
    shirt: 0x7a6b4b,
    pants: 0x3b3529,
    vest: 0x4b402e,
    skin: 0x9a6d4a,
    helmet: 0x1a1a18,
    accent: 0xa63c2e,
    boots: 0x211e19,
  },
  CT: {
    shirt: 0x3b526a,
    pants: 0x253442,
    vest: 0x1e2b36,
    skin: 0xa87956,
    helmet: 0x445e76,
    accent: 0x4c8fca,
    boots: 0x171d22,
  },
};

const matCache = new Map<number, THREE.MeshStandardMaterial>();
function mat(color: number, rough = 0.85, metal = 0.05): THREE.MeshStandardMaterial {
  const key = color * 1000 + Math.round(rough * 100) + Math.round(metal * 100) * 100000;
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
    matCache.set(key, m);
  }
  return m;
}

function box(
  parent: THREE.Object3D,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  color: number,
  rough = 0.85,
  metal = 0.04,
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, rough, metal));
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function cyl(
  parent: THREE.Object3D,
  rTop: number,
  rBottom: number,
  h: number,
  x: number,
  y: number,
  z: number,
  color: number,
  segments = 8,
  rough = 0.7,
  metal = 0.25,
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, segments), mat(color, rough, metal));
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

export class CharacterModel {
  readonly root = new THREE.Group();
  readonly visual = new THREE.Group();
  readonly weaponMount = new THREE.Group();
  private leftLeg = new THREE.Group();
  private rightLeg = new THREE.Group();
  private leftArm = new THREE.Group();
  private rightArm = new THREE.Group();
  private torso: THREE.Group;
  private head!: THREE.Group;
  private walkPhase = 0;
  private deadTime = 0;
  private weaponModel: THREE.Group | null = null;
  private currentWeapon: WeaponId | null = null;
  private deathRoll = Math.random() > 0.5 ? 1 : -1;
  readonly team: Team;

  constructor(team: Team) {
    this.team = team;
    this.root.add(this.visual);
    this.root.name = 'character';
    this.visual.position.y = 0;
    this.torso = this.buildBody();
    this.visual.add(this.torso);
    this.weaponMount.position.set(0.21, 1.28, -0.47);
    this.visual.add(this.weaponMount);
    this.root.userData.character = this;
  }

  private buildBody(): THREE.Group {
    const p = PALETTES[this.team];
    const g = new THREE.Group();

    // hips and torso, deliberately layered for a readable human silhouette
    const hips = box(g, 0.42, 0.2, 0.28, 0, 0.92, 0, p.pants);
    hips.scale.set(1, 1, 1);
    box(g, 0.46, 0.46, 0.29, 0, 1.27, 0, p.shirt);
    box(g, 0.5, 0.36, 0.33, 0, 1.32, 0.0, p.vest);
    box(g, 0.4, 0.24, 0.34, 0, 1.25, 0.04, p.accent === 0xa63c2e ? 0x4e3e25 : 0x26333e);
    // chest rig pouches
    for (const x of [-0.13, 0, 0.13]) {
      box(g, 0.1, 0.1, 0.08, x, 1.2, -0.2, 0x2d2a22);
    }
    // team armband
    box(g, 0.08, 0.11, 0.31, 0.27, 1.33, 0, p.accent);

    // neck
    cyl(g, 0.075, 0.085, 0.13, 0, 1.53, -0.01, p.skin, 8, 0.9, 0);
    // head
    this.head = new THREE.Group();
    this.head.position.set(0, 1.7, -0.01);
    g.add(this.head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.185, 12, 10), mat(p.skin, 0.9, 0));
    skull.scale.set(0.9, 1.06, 0.94);
    skull.castShadow = true;
    this.head.add(skull);

    if (this.team === 'T') {
      // balaclava + red bandana: unmistakable T silhouette
      const mask = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 10, 0, Math.PI * 2, 0.42, Math.PI * 0.6), mat(0x1e1d1a, 0.96, 0));
      mask.castShadow = true;
      this.head.add(mask);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.032, 5, 14), mat(p.accent, 0.75, 0));
      band.rotation.x = Math.PI / 2;
      band.position.y = 0.065;
      band.castShadow = true;
      this.head.add(band);
      box(this.head, 0.05, 0.18, 0.04, 0.16, -0.02, 0.08, p.accent);
      // eyes (tiny)
      for (const x of [-0.065, 0.065]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.019, 6, 5), mat(0xd8cfb8, 0.5, 0));
        eye.position.set(x, 0.0, -0.165);
        this.head.add(eye);
      }
    } else {
      // CT helmet, goggles and headset
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.205, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), mat(p.helmet, 0.55, 0.3));
      helmet.scale.set(1.02, 0.88, 1.03);
      helmet.position.y = 0.035;
      helmet.castShadow = true;
      this.head.add(helmet);
      box(this.head, 0.23, 0.055, 0.02, 0, 0.075, 0.185, 0x25333f);
      box(this.head, 0.25, 0.1, 0.12, 0, 0.03, -0.12, 0x1a232c);
      for (const x of [-0.075, 0.075]) {
        box(this.head, 0.055, 0.032, 0.02, x, 0.0, -0.18, 0x8fd8ff, 0.3, 0.4);
      }
      box(this.head, 0.05, 0.035, 0.24, 0.17, -0.04, -0.03, 0x23313c);
    }

    // arms with shoulders, elbows, gloves
    for (const side of [-1, 1]) {
      const arm = new THREE.Group();
      arm.position.set(side * 0.31, 1.47, 0);
      g.add(arm);
      box(arm, 0.15, 0.32, 0.17, 0, -0.14, 0, p.shirt);
      const elbow = new THREE.Group();
      elbow.position.y = -0.31;
      elbow.rotation.x = -0.36;
      arm.add(elbow);
      box(elbow, 0.13, 0.3, 0.14, 0, -0.14, 0, p.shirt);
      box(elbow, 0.12, 0.1, 0.13, 0, -0.3, 0, 0x24221e);
      // Set the whole arm to a weapon-ready pose.
      arm.rotation.x = 1.08;
      arm.rotation.z = side * -0.1;
      if (side < 0) this.leftArm = arm;
      else this.rightArm = arm;
    }

    // legs, articulated at the hip and knee
    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(side * 0.135, 0.9, 0);
      g.add(leg);
      box(leg, 0.19, 0.42, 0.21, 0, -0.2, 0, p.pants);
      const knee = new THREE.Group();
      knee.position.y = -0.42;
      leg.add(knee);
      box(knee, 0.16, 0.38, 0.18, 0, -0.18, 0.01, p.pants);
      box(knee, 0.19, 0.12, 0.28, 0, -0.38, -0.04, p.boots);
      if (side < 0) this.leftLeg = leg;
      else this.rightLeg = leg;
    }

    // backpack / bomb harness silhouette
    box(g, 0.32, 0.34, 0.16, 0, 1.3, 0.23, 0x2b2a24);
    box(g, 0.34, 0.06, 0.18, 0, 1.48, 0.23, p.accent);
    return g;
  }

  setWeapon(id: WeaponId | null): void {
    if (this.currentWeapon === id) return;
    this.currentWeapon = id;
    if (this.weaponModel) {
      this.weaponMount.remove(this.weaponModel);
      this.weaponModel = null;
    }
    if (!id) return;
    const model = createWeaponModel(id, 'world');
    model.scale.setScalar(0.82);
    model.rotation.set(0, 0, 0);
    this.weaponMount.add(model);
    this.weaponModel = model;
  }

  setAimPitch(pitch: number): void {
    if (this.weaponModel) this.weaponMount.rotation.x = clamp(pitch, -0.7, 0.7);
  }

  kick(): void {
    if (!this.weaponModel) return;
    this.weaponMount.position.z += 0.035;
  }

  update(dt: number, speed: number, alive: boolean): void {
    if (!alive) {
      this.deadTime += dt;
      this.visual.rotation.z = THREE.MathUtils.damp(this.visual.rotation.z, this.deathRoll * 1.42, 4.5, dt);
      this.visual.rotation.x = THREE.MathUtils.damp(this.visual.rotation.x, 0.15, 3.5, dt);
      this.visual.position.y = THREE.MathUtils.damp(this.visual.position.y, -0.03, 4, dt);
      this.weaponMount.visible = false;
      return;
    }
    this.weaponMount.visible = true;
    const amount = clamp(speed / 4.5, 0, 1);
    this.walkPhase += dt * (3.2 + speed * 1.15);
    const swing = Math.sin(this.walkPhase) * 0.68 * amount;
    this.leftLeg.rotation.x = swing;
    this.rightLeg.rotation.x = -swing;
    const bob = Math.abs(Math.sin(this.walkPhase * 2)) * 0.022 * amount;
    this.torso.position.y = bob;
    this.head.position.y = 1.7 + bob;
    // subtle breathing / idle sway
    const idle = Math.sin(performance.now() * 0.0016 + this.root.id) * 0.012;
    this.torso.rotation.z = idle * (1 - amount);
    // weapon settles back after recoil
    this.weaponMount.position.z = THREE.MathUtils.damp(this.weaponMount.position.z, 0, 12, dt);
    // keep the hands near the gun while moving
    this.rightArm.rotation.x = 1.08 - swing * 0.06;
    this.leftArm.rotation.x = 1.12 + swing * 0.04;
  }

  getHitboxes(position: THREE.Vector3, yaw: number, alive: boolean): HitboxWorld[] {
    if (!alive) return [];
    const cos = Math.cos(yaw);
    const sin = Math.sin(yaw);
    const transform = (lx: number, ly: number, lz: number) => {
      const wx = position.x + lx * cos + lz * sin;
      const wz = position.z - lx * sin + lz * cos;
      return new THREE.Vector3(wx, position.y + ly, wz);
    };
    const make = (part: HitPart, lx: number, ly: number, lz: number, sx: number, sy: number, sz: number): HitboxWorld => {
      const c = transform(lx, ly, lz);
      const box = new THREE.Box3(c.clone().sub(new THREE.Vector3(sx / 2, sy / 2, sz / 2)), c.clone().add(new THREE.Vector3(sx / 2, sy / 2, sz / 2)));
      return { part, box };
    };
    return [
      make('head', 0, 1.72, 0, 0.38, 0.4, 0.38),
      make('chest', 0, 1.34, 0, 0.5, 0.42, 0.34),
      make('stomach', 0, 1.04, 0, 0.43, 0.32, 0.3),
      make('arm', -0.34, 1.22, -0.08, 0.2, 0.53, 0.24),
      make('arm', 0.34, 1.22, -0.08, 0.2, 0.53, 0.24),
      make('leg', -0.14, 0.47, 0, 0.24, 0.78, 0.26),
      make('leg', 0.14, 0.47, 0, 0.24, 0.78, 0.26),
    ];
  }

  getMuzzleWorld(): THREE.Vector3 {
    const v = new THREE.Vector3(0.22, 1.31, -1.15);
    return this.root.localToWorld(v);
  }

  getCenter(): THREE.Vector3 {
    return this.root.localToWorld(new THREE.Vector3(0, 1.2, 0));
  }

  getWeaponRoot(): THREE.Group | null {
    return this.weaponModel;
  }

  setVisible(v: boolean): void {
    this.visual.visible = v;
  }

  reset(): void {
    this.deadTime = 0;
    this.visual.rotation.set(0, 0, 0);
    this.visual.position.y = 0;
    this.visual.visible = true;
    this.weaponMount.visible = true;
  }
}

// ---------------------------------------------------------------------------
// Procedural weapons. One cached source model per weapon/mode is cloned for
// every character and the first-person view model.
// ---------------------------------------------------------------------------

type WeaponMode = 'world' | 'fp';
const weaponCache = new Map<string, THREE.Group>();

function gunMaterials() {
  return {
    black: mat(0x3b4143, 0.55, 0.35),
    dark: mat(0x4b5254, 0.65, 0.28),
    steel: mat(0x989fa0, 0.32, 0.75),
    wood: mat(0x6f4526, 0.82, 0.05),
    olive: mat(0x4c5540, 0.72, 0.15),
    tan: mat(0x7e6d4d, 0.8, 0.1),
    gold: mat(0xb48a45, 0.32, 0.8),
    glove: mat(0x3a342c, 0.92, 0),
  };
}

function addMuzzle(parent: THREE.Object3D, z: number, scale = 1): void {
  const muzzle = new THREE.Object3D();
  muzzle.name = 'muzzle';
  muzzle.position.set(0, 0, z);
  parent.add(muzzle);
  const flashMat = new THREE.MeshBasicMaterial({
    color: 0xffdf9c,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const flash = new THREE.Mesh(new THREE.ConeGeometry(0.1 * scale, 0.32 * scale, 7), flashMat);
  flash.name = 'flash';
  flash.rotation.x = Math.PI / 2;
  flash.position.z = -0.15 * scale;
  flash.visible = false;
  muzzle.add(flash);
  const star = new THREE.Mesh(new THREE.SphereGeometry(0.07 * scale, 7, 5), flashMat);
  star.name = 'flashStar';
  star.visible = false;
  muzzle.add(star);
}

function addHandsFP(g: THREE.Group, forwardZ: number): void {
  // Compact gloved hands keep the viewmodel readable without giant floating arms.
  box(g, 0.105, 0.13, 0.13, 0.05, -0.17, 0.07, 0x35312a, 0.95);
  box(g, 0.12, 0.105, 0.16, -0.035, -0.135, forwardZ, 0x35312a, 0.95);
  box(g, 0.08, 0.05, 0.06, 0.055, -0.105, 0.05, 0x4a4236, 0.9);
}

function buildWeapon(id: WeaponId, mode: WeaponMode): THREE.Group {
  const g = new THREE.Group();
  const p = gunMaterials();
  let muzzleZ = -0.9;

  if (id === 'ak47') {
    box(g, 0.13, 0.14, 0.55, 0, 0, -0.24, 0x232525, 0.55, 0.55);
    box(g, 0.1, 0.12, 0.42, 0, 0.02, -0.6, 0x2b2d2d, 0.5, 0.6);
    // wood furniture
    box(g, 0.09, 0.1, 0.35, 0.0, -0.015, -0.47, 0x6f4526, 0.85, 0.03);
    box(g, 0.11, 0.15, 0.26, 0, -0.02, 0.17, 0x6f4526, 0.85, 0.03);
    const stock = box(g, 0.1, 0.13, 0.36, 0, 0.0, 0.38, 0x6f4526, 0.85, 0.03);
    stock.rotation.x = -0.12;
    // magazine, two sections to suggest the banana curve
    const mag = box(g, 0.115, 0.3, 0.17, 0, -0.23, -0.28, 0x3d3426, 0.65, 0.15);
    mag.rotation.x = 0.18;
    const mag2 = box(g, 0.11, 0.16, 0.16, 0, -0.36, -0.22, 0x3d3426, 0.65, 0.15);
    mag2.rotation.x = 0.36;
    // barrel and front sight
    const barrel = cyl(g, 0.023, 0.027, 0.5, 0, 0.035, -0.85, 0x3e4242, 8, 0.35, 0.8);
    barrel.rotation.x = Math.PI / 2;
    box(g, 0.02, 0.08, 0.02, 0, 0.1, -0.74, 0x222424, 0.5, 0.5);
    box(g, 0.03, 0.04, 0.03, 0, 0.09, -0.11, 0x222424, 0.5, 0.5);
    box(g, 0.09, 0.04, 0.16, 0, -0.09, -0.45, 0x6f4526, 0.85, 0.03);
    muzzleZ = -1.11;
    if (mode === 'fp') addHandsFP(g, -0.52);
  } else if (id === 'm4a4') {
    box(g, 0.12, 0.13, 0.55, 0, 0, -0.3, 0x40474a, 0.55, 0.35);
    box(g, 0.1, 0.11, 0.36, 0, 0.01, -0.7, 0x4d5457, 0.5, 0.4);
    box(g, 0.08, 0.17, 0.12, 0, -0.14, -0.14, 0x555c5f, 0.55, 0.3);
    box(g, 0.085, 0.2, 0.13, 0, -0.23, -0.18, 0x42494b, 0.6, 0.3);
    const barrel = cyl(g, 0.018, 0.024, 0.5, 0, 0.025, -0.95, 0x81898b, 8, 0.35, 0.75);
    barrel.rotation.x = Math.PI / 2;
    box(g, 0.1, 0.06, 0.3, 0, 0.1, -0.43, 0x454b4e, 0.5, 0.4);
    box(g, 0.07, 0.07, 0.1, 0, 0.16, -0.28, 0x3b4143, 0.45, 0.45);
    // carry handle
    box(g, 0.05, 0.07, 0.3, 0, 0.12, -0.05, 0x383e40, 0.5, 0.4);
    // stock
    box(g, 0.1, 0.13, 0.4, 0, 0.01, 0.38, 0x41484a, 0.6, 0.3);
    const rail = box(g, 0.1, 0.025, 0.5, 0, 0.09, -0.28, 0x33393b, 0.45, 0.5);
    rail.rotation.x = 0;
    muzzleZ = -1.2;
    if (mode === 'fp') addHandsFP(g, -0.63);
  } else if (id === 'awp') {
    // long chassis
    box(g, 0.14, 0.14, 0.85, 0, 0, -0.42, 0x4f5747, 0.72, 0.18);
    box(g, 0.11, 0.12, 0.44, 0, 0.0, -0.95, 0x424a3c, 0.65, 0.25);
    const barrel = cyl(g, 0.03, 0.04, 0.95, 0, 0.025, -1.25, 0x3a4036, 10, 0.35, 0.7);
    barrel.rotation.x = Math.PI / 2;
    // folded stock
    box(g, 0.12, 0.14, 0.46, 0, -0.05, 0.44, 0x3c4436, 0.75, 0.2);
    box(g, 0.13, 0.19, 0.1, 0, -0.17, 0.22, 0x32382e, 0.8, 0.1);
    // bolt
    box(g, 0.04, 0.04, 0.18, 0.1, 0.02, -0.12, 0x727778, 0.35, 0.8);
    // big scope
    const mount = box(g, 0.08, 0.1, 0.3, 0, 0.13, -0.32, 0x22221e, 0.6, 0.3);
    const scope = cyl(g, 0.06, 0.07, 0.42, 0, 0.23, -0.34, 0x171a18, 12, 0.4, 0.55);
    scope.rotation.x = Math.PI / 2;
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.058, 12), new THREE.MeshStandardMaterial({ color: 0x7fd7c4, roughness: 0.15, metalness: 0.7 }));
    lens.position.set(0, 0.23, -0.56);
    lens.rotation.y = Math.PI;
    g.add(lens);
    box(g, 0.1, 0.1, 0.4, 0, -0.14, -0.7, 0x343b30, 0.8, 0.1);
    muzzleZ = -1.75;
    if (mode === 'fp') addHandsFP(g, -0.73);
  } else if (id === 'glock') {
    box(g, 0.1, 0.12, 0.3, 0, 0.02, -0.19, 0x252728, 0.55, 0.4);
    box(g, 0.095, 0.1, 0.31, 0, -0.05, -0.2, 0x1d1f20, 0.6, 0.35);
    const grip = box(g, 0.09, 0.28, 0.13, 0, -0.18, 0.0, 0x2b2e2f, 0.75, 0.15);
    grip.rotation.x = -0.16;
    box(g, 0.04, 0.035, 0.1, 0, 0.095, -0.27, 0x17191a, 0.5, 0.5);
    muzzleZ = -0.36;
    if (mode === 'fp') addHandsFP(g, -0.21);
  } else if (id === 'usp') {
    box(g, 0.1, 0.12, 0.33, 0, 0.02, -0.2, 0x252728, 0.55, 0.4);
    box(g, 0.095, 0.105, 0.35, 0, -0.055, -0.22, 0x1c1e1f, 0.6, 0.35);
    const grip = box(g, 0.085, 0.29, 0.13, 0, -0.19, 0.01, 0x242728, 0.8, 0.1);
    grip.rotation.x = -0.15;
    const supp = cyl(g, 0.038, 0.042, 0.34, 0, 0.015, -0.58, 0x2d3031, 12, 0.45, 0.55);
    supp.rotation.x = Math.PI / 2;
    box(g, 0.025, 0.035, 0.08, 0, 0.1, -0.28, 0x161819, 0.5, 0.5);
    muzzleZ = -0.78;
    if (mode === 'fp') addHandsFP(g, -0.3);
  } else if (id === 'deagle') {
    box(g, 0.115, 0.14, 0.4, 0, 0.02, -0.23, 0x8c9192, 0.32, 0.82);
    box(g, 0.11, 0.11, 0.4, 0, -0.05, -0.24, 0x9da2a2, 0.28, 0.85);
    const grip = box(g, 0.095, 0.31, 0.15, 0, -0.21, 0.0, 0x555a5b, 0.55, 0.4);
    grip.rotation.x = -0.14;
    box(g, 0.04, 0.04, 0.11, 0, 0.11, -0.34, 0x222526, 0.5, 0.5);
    const barrel = cyl(g, 0.025, 0.03, 0.22, 0, 0.025, -0.54, 0x313435, 8, 0.35, 0.8);
    barrel.rotation.x = Math.PI / 2;
    muzzleZ = -0.68;
    if (mode === 'fp') addHandsFP(g, -0.25);
  } else {
    // knife
    box(g, 0.06, 0.08, 0.24, 0, -0.02, 0.02, 0x30312e, 0.85, 0.05);
    box(g, 0.11, 0.035, 0.04, 0, 0.0, -0.1, 0x6f7373, 0.35, 0.9);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.02, 0.5), mat(0xb9c0c1, 0.22, 0.95));
    blade.position.set(0, 0.01, -0.36);
    blade.rotation.y = 0.04;
    blade.castShadow = true;
    g.add(blade);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.16, 4), mat(0xb9c0c1, 0.22, 0.95));
    tip.rotation.x = -Math.PI / 2;
    tip.rotation.z = Math.PI / 4;
    tip.position.set(0, 0.01, -0.7);
    g.add(tip);
    muzzleZ = -0.8;
    if (mode === 'fp') {
      box(g, 0.14, 0.15, 0.14, 0.02, -0.16, 0.1, 0x2d2a25, 0.95);
      const rArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 0.14), p.glove);
      rArm.position.set(0.07, -0.33, 0.22);
      rArm.rotation.set(-0.2, 0, -0.25);
      g.add(rArm);
    }
  }

  addMuzzle(g, muzzleZ, id === 'awp' ? 1.5 : id === 'glock' || id === 'usp' || id === 'deagle' ? 0.7 : 1);
  return g;
}

export function createWeaponModel(id: WeaponId, mode: WeaponMode): THREE.Group {
  const key = `${id}:${mode}`;
  let base = weaponCache.get(key);
  if (!base) {
    base = buildWeapon(id, mode);
    weaponCache.set(key, base);
  }
  return base.clone(true);
}

export function createFirstPersonWeapon(id: WeaponId): THREE.Group {
  const g = createWeaponModel(id, 'fp');
  // Scale and orientation adjustments for the camera-space model. The viewmodel
  // gets its own emissive material copies so it stays readable when the player
  // enters shadowed areas.
  g.scale.setScalar(0.43);
  g.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const src = mesh.material as THREE.MeshStandardMaterial;
    if (!src || !('emissive' in src)) return;
    const m = src.clone();
    m.emissive = new THREE.Color(m.color).multiplyScalar(0.55);
    m.emissiveIntensity = 0.9;
    m.metalness = Math.min(0.35, m.metalness);
    m.roughness = Math.max(0.4, m.roughness);
    mesh.material = m;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
  });
  return g;
}

export function getWeaponMuzzle(group: THREE.Object3D): THREE.Object3D | null {
  return group.getObjectByName('muzzle') ?? null;
}

export function triggerMuzzleFlash(group: THREE.Object3D, duration = 0.055): void {
  const muzzle = getWeaponMuzzle(group);
  if (!muzzle) return;
  muzzle.children.forEach((c) => {
    if (c.name === 'flash' || c.name === 'flashStar') {
      c.visible = true;
      const mesh = c as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
      }
      window.setTimeout(() => {
        c.visible = false;
      }, duration * 1000);
    }
  });
  const light = new THREE.PointLight(0xffc06b, 2.8, 6, 2);
  muzzle.add(light);
  window.setTimeout(() => {
    muzzle.remove(light);
    light.dispose();
  }, 60);
}

export const teamColorHex: Record<Team, number> = { CT: 0x4d9bdd, T: 0xe0a14d };
export const teamName: Record<Team, string> = { CT: '反恐精英', T: '恐怖分子' };

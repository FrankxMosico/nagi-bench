import * as THREE from 'three';
import type { Team, WeaponId } from '../engine/weapons.ts';
import type { WeaponModel } from './weaponModels.ts';
import { buildWeapon } from './weaponModels.ts';
import { createNameTexture } from './textures.ts';

/*
 * Procedural humanoid: separate head, torso (+vest), pelvis, two 2-segment arms solved with
 * analytic two-bone IK onto the weapon's grip / handguard, and two 2-segment legs with a
 * procedural walk cycle. Dimensions match engine/hitbox.ts.
 */

interface Palette {
  jacket: number;
  vest: number;
  pants: number;
  boots: number;
  gloves: number;
  skin: number;
  head: number;
  accent: number;
  belt: number;
}

const PALETTES: Record<Team, Palette> = {
  // Terrorists: warm tan jacket, brown leather vest, black balaclava, red armband.
  T: { jacket: 0xa47e48, vest: 0x4d3522, pants: 0x4c4330, boots: 0x2b2118, gloves: 0x1f1f1f, skin: 0xc9996a, head: 0x1a1a1a, accent: 0xa3201c, belt: 0x2d2117 },
  // Counter-Terrorists: navy uniform, blue-grey plate carrier, helmet + goggles, light-blue patches.
  CT: { jacket: 0x22385a, vest: 0x3a4d63, pants: 0x2a3549, boots: 0x15171b, gloves: 0x18191b, skin: 0xd5a57c, head: 0x1f2c3d, accent: 0x5aa9e6, belt: 0x1b222c },
};

const geoCache = new Map<string, THREE.BoxGeometry>();
const matCache = new Map<string, THREE.MeshStandardMaterial>();

function geo(w: number, h: number, d: number): THREE.BoxGeometry {
  const k = `${w}|${h}|${d}`;
  let g = geoCache.get(k);
  if (!g) {
    g = new THREE.BoxGeometry(w, h, d);
    geoCache.set(k, g);
  }
  return g;
}

function mat(color: number, rough = 0.85, emissive = 0): THREE.MeshStandardMaterial {
  const k = `${color}|${rough}|${emissive}`;
  let m = matCache.get(k);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.05 });
    if (emissive) {
      m.emissive = new THREE.Color(emissive);
      m.emissiveIntensity = 0.6;
    }
    matCache.set(k, m);
  }
  return m;
}

function part(parent: THREE.Object3D, w: number, h: number, d: number, color: number, x: number, y: number, z: number, rough = 0.85, emissive = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo(w, h, d), mat(color, rough, emissive));
  m.position.set(x, y, z);
  m.castShadow = true;
  parent.add(m);
  return m;
}

export interface RigParams {
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  speed: number;
  onGround: boolean;
  crouch: number;
  alive: boolean;
  deathAge: number;
  weaponId: WeaponId;
  hasBomb: boolean;
  planting: boolean;
  defusing: boolean;
  /** 0..1 reload progress, or -1. */
  reloadT: number;
  /** Seconds since last shot. */
  firedAge: number;
  /** Seconds since last melee swing. */
  meleeAge: number;
}

const UPPER = 0.31;
const LOWER = 0.3;
const SHOULDER_Y = 0.44;
const SHOULDER_X = 0.25;
const DOWN = new THREE.Vector3(0, -1, 0);
const _t = new THREE.Vector3();
const _d = new THREE.Vector3();
const _p = new THREE.Vector3();
const _e = new THREE.Vector3();
const _h = new THREE.Vector3();
const _q = new THREE.Quaternion();

interface Arm {
  upper: THREE.Group;
  lower: THREE.Group;
  hand: THREE.Group;
  shoulder: THREE.Vector3;
  pole: THREE.Vector3;
}

/** Grip location (spine space) per weapon class. */
function gripPose(id: WeaponId): { pos: THREE.Vector3; rest: 'rifle' | 'pistol' | 'knife' | 'bomb' } {
  switch (id) {
    case 'ak47':
    case 'm4a4':
    case 'awp':
      return { pos: new THREE.Vector3(0.09, 0.25, -0.15), rest: 'rifle' };
    case 'glock':
    case 'usp':
    case 'deagle':
      return { pos: new THREE.Vector3(0.04, 0.33, -0.43), rest: 'pistol' };
    case 'knife':
      return { pos: new THREE.Vector3(0.22, 0.12, -0.28), rest: 'knife' };
    case 'c4':
      return { pos: new THREE.Vector3(0.0, 0.1, -0.32), rest: 'bomb' };
  }
}

export class CharacterRig {
  readonly root = new THREE.Group();
  readonly team: Team;
  private readonly hips = new THREE.Group();
  private readonly spine = new THREE.Group();
  private readonly head = new THREE.Group();
  private readonly thighL = new THREE.Group();
  private readonly thighR = new THREE.Group();
  private readonly kneeL = new THREE.Group();
  private readonly kneeR = new THREE.Group();
  private readonly armL: Arm;
  private readonly armR: Arm;
  private readonly holder = new THREE.Group();
  private readonly backpack: THREE.Group;
  private readonly models = new Map<WeaponId, WeaponModel>();
  private current: WeaponModel | null = null;
  private walkPhase = 0;
  private kick = 0;
  private lastFiredAge = 99;
  nameTag: THREE.Sprite | null = null;
  private nameTex: THREE.Texture | null = null;

  constructor(team: Team, name: string, showName: boolean) {
    this.team = team;
    const P = PALETTES[team];
    this.root.rotation.order = 'YXZ';
    this.root.add(this.hips);
    this.hips.position.set(0, 0.95, 0);

    // Pelvis + belt
    part(this.hips, 0.34, 0.2, 0.22, P.pants, 0, 0, 0);
    part(this.hips, 0.36, 0.05, 0.24, P.belt, 0, 0.09, 0);

    // Legs
    for (const [thigh, knee, side] of [
      [this.thighL, this.kneeL, -1],
      [this.thighR, this.kneeR, 1],
    ] as [THREE.Group, THREE.Group, number][]) {
      thigh.position.set(0.1 * side, -0.05, 0);
      this.hips.add(thigh);
      part(thigh, 0.15, 0.44, 0.17, P.pants, 0, -0.22, 0);
      if (team === 'T') part(thigh, 0.07, 0.1, 0.05, P.belt, 0.06 * side, -0.25, -0.06); // thigh pouch
      knee.position.set(0, -0.44, 0);
      thigh.add(knee);
      part(knee, 0.13, 0.42, 0.14, P.pants, 0, -0.21, 0);
      if (team === 'CT') part(knee, 0.12, 0.1, 0.04, 0x111111, 0, -0.04, -0.075); // knee pad
      part(knee, 0.14, 0.1, 0.27, P.boots, 0, -0.42, -0.045, 0.9);
    }

    // Torso
    this.spine.position.set(0, 0.08, 0);
    this.hips.add(this.spine);
    part(this.spine, 0.42, 0.5, 0.24, P.jacket, 0, 0.25, 0);
    part(this.spine, 0.45, 0.34, 0.28, P.vest, 0, 0.24, 0);
    if (team === 'CT') {
      part(this.spine, 0.12, 0.08, 0.04, 0x2e3b4c, -0.1, 0.2, -0.15); // mag pouches
      part(this.spine, 0.12, 0.08, 0.04, 0x2e3b4c, 0.1, 0.2, -0.15);
      part(this.spine, 0.2, 0.05, 0.01, P.accent, 0, 0.34, -0.145, 0.6, P.accent); // reflective strip
    } else {
      part(this.spine, 0.08, 0.1, 0.04, 0x3a2a1a, 0.12, 0.16, -0.15);
      part(this.spine, 0.46, 0.05, 0.29, 0x6b5434, 0, 0.42, 0, 0.9); // shoulder strap
    }
    part(this.spine, 0.11, 0.08, 0.11, team === 'T' ? P.head : P.skin, 0, 0.53, 0);

    // Head
    this.head.position.set(0, 0.6, -0.01);
    this.spine.add(this.head);
    if (team === 'T') {
      part(this.head, 0.22, 0.25, 0.24, P.head, 0, 0.065, 0); // balaclava
      part(this.head, 0.2, 0.055, 0.02, P.skin, 0, 0.09, -0.121); // eye opening
      part(this.head, 0.035, 0.022, 0.01, 0x101010, -0.045, 0.09, -0.132);
      part(this.head, 0.035, 0.022, 0.01, 0x101010, 0.045, 0.09, -0.132);
      part(this.head, 0.235, 0.07, 0.255, 0x2f3322, 0, 0.17, 0); // beanie
      part(this.head, 0.24, 0.03, 0.26, P.accent, 0, 0.13, 0); // red band
    } else {
      part(this.head, 0.21, 0.24, 0.23, P.skin, 0, 0.06, 0); // face
      part(this.head, 0.25, 0.13, 0.27, P.head, 0, 0.16, 0.0, 0.6); // helmet
      part(this.head, 0.26, 0.03, 0.06, P.head, 0, 0.11, -0.14, 0.6); // brim
      part(this.head, 0.21, 0.055, 0.03, 0x8fc3ea, 0, 0.085, -0.125, 0.2, 0x3a6a90); // goggles
      part(this.head, 0.16, 0.06, 0.02, 0x23272d, 0, -0.02, -0.12); // mask/balaclava lower
    }

    // Arms (IK; parts hang along -Y inside each segment group)
    const makeArm = (side: number): Arm => {
      const upper = new THREE.Group();
      const lower = new THREE.Group();
      const hand = new THREE.Group();
      part(upper, 0.12, UPPER, 0.13, P.jacket, 0, -UPPER / 2, 0);
      if (team === 'T' && side < 0) part(upper, 0.13, 0.05, 0.14, P.accent, 0, -0.1, 0);
      if (team === 'CT') part(upper, 0.13, 0.08, 0.14, P.accent, 0, -0.06, 0, 0.7);
      part(lower, 0.1, LOWER, 0.11, P.jacket, 0, -LOWER / 2, 0);
      part(hand, 0.085, 0.1, 0.1, P.gloves, 0, -0.03, 0);
      this.spine.add(upper, lower, hand);
      return {
        upper,
        lower,
        hand,
        shoulder: new THREE.Vector3(SHOULDER_X * side, SHOULDER_Y, 0),
        pole: new THREE.Vector3(side * 1.0, -1.1, 0.5),
      };
    };
    this.armL = makeArm(-1);
    this.armR = makeArm(1);
    part(this.spine, 0.14, 0.1, 0.16, P.jacket, -SHOULDER_X + 0.02, SHOULDER_Y + 0.01, 0);
    part(this.spine, 0.14, 0.1, 0.16, P.jacket, SHOULDER_X - 0.02, SHOULDER_Y + 0.01, 0);

    this.spine.add(this.holder);

    // C4 backpack (visible on the bomb carrier)
    this.backpack = buildWeapon('c4').group;
    this.backpack.position.set(0, 0.22, 0.17);
    this.backpack.rotation.set(Math.PI / 2, 0, 0);
    this.backpack.visible = false;
    this.spine.add(this.backpack);

    if (showName) {
      const { tex, aspect } = createNameTexture(name, team === 'T' ? '#f0c060' : '#8ccaf5');
      this.nameTex = tex;
      const sm = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false, sizeAttenuation: false });
      const sprite = new THREE.Sprite(sm);
      sprite.scale.set(0.05 * aspect, 0.05, 1);
      sprite.position.set(0, 2.15, 0);
      sprite.renderOrder = 20;
      this.root.add(sprite);
      this.nameTag = sprite;
    }
  }

  private model(id: WeaponId): WeaponModel {
    let m = this.models.get(id);
    if (!m) {
      m = buildWeapon(id);
      this.models.set(id, m);
    }
    return m;
  }

  /** World-space muzzle position of the held weapon (for muzzle flashes / tracers). */
  muzzleWorld(out: THREE.Vector3): THREE.Vector3 {
    if (!this.current) return this.root.getWorldPosition(out).setY(this.root.position.y + 1.4);
    this.current.group.updateWorldMatrix(true, false);
    return out.copy(this.current.muzzle).applyMatrix4(this.current.group.matrixWorld);
  }

  private solveArm(arm: Arm, target: THREE.Vector3): void {
    _d.copy(target).sub(arm.shoulder);
    let dist = _d.length();
    if (dist < 1e-4) _d.set(0, -1, 0);
    _d.normalize();
    dist = Math.min(Math.max(dist, 0.08), (UPPER + LOWER) * 0.999);
    _h.copy(arm.shoulder).addScaledVector(_d, dist);
    const cosA = (UPPER * UPPER + dist * dist - LOWER * LOWER) / (2 * UPPER * dist);
    const a = Math.acos(Math.min(1, Math.max(-1, cosA)));
    _p.copy(arm.pole).addScaledVector(_d, -arm.pole.dot(_d));
    if (_p.lengthSq() < 1e-6) _p.set(0, -1, 0);
    _p.normalize();
    _t.copy(_d).multiplyScalar(Math.cos(a)).addScaledVector(_p, Math.sin(a)).normalize();
    _e.copy(arm.shoulder).addScaledVector(_t, UPPER);
    arm.upper.position.copy(arm.shoulder);
    arm.upper.quaternion.setFromUnitVectors(DOWN, _t);
    _t.copy(_h).sub(_e).normalize();
    arm.lower.position.copy(_e);
    _q.setFromUnitVectors(DOWN, _t);
    arm.lower.quaternion.copy(_q);
    arm.hand.position.copy(_h);
    arm.hand.quaternion.copy(_q);
  }

  update(p: RigParams, dt: number): void {
    const r = this.root;
    r.position.set(p.x, p.y, p.z);
    r.rotation.y = p.yaw;

    // Weapon model swap.
    const want = p.alive ? p.weaponId : null;
    if ((this.current?.id ?? null) !== want) {
      if (this.current) this.current.group.removeFromParent();
      this.current = want ? this.model(want) : null;
      if (this.current) this.holder.add(this.current.group);
    }
    this.backpack.visible = p.hasBomb && p.alive && p.weaponId !== 'c4';

    // Death: fall backwards.
    if (!p.alive) {
      const t = Math.min(1, p.deathAge / 0.55);
      const e = 1 - (1 - t) * (1 - t);
      r.rotation.x = (Math.PI / 2) * e;
      r.position.y = p.y + 0.13 * e;
      this.spine.rotation.set(-0.2 * e, 0, 0);
      this.head.rotation.set(-0.3 * e, 0.4 * e, 0);
      this.thighL.rotation.set(-0.15 * e, 0, -0.15 * e);
      this.thighR.rotation.set(-0.05 * e, 0, 0.2 * e);
      this.kneeL.rotation.x = -0.5 * e;
      this.kneeR.rotation.x = -0.15 * e;
      this.solveArm(this.armL, _p.set(-0.55, 0.35, 0.05));
      this.solveArm(this.armR, _p.set(0.55, 0.3, -0.05));
      if (this.nameTag) this.nameTag.visible = false;
      return;
    }
    r.rotation.x = 0;
    if (this.nameTag) this.nameTag.visible = true;

    // Locomotion.
    const s01 = Math.min(1, p.speed / 5);
    this.walkPhase += p.speed * dt * 2.7;
    const kneel = p.planting || p.defusing ? 1 : 0;
    const crouch = Math.max(p.crouch, kneel);
    const amp = 0.6 * s01 * (1 - crouch * 0.6);
    const ph = this.walkPhase;
    let thL = Math.sin(ph) * amp;
    let thR = -Math.sin(ph) * amp;
    let knL = -Math.max(0, Math.sin(ph + 1.4)) * amp * 1.5;
    let knR = -Math.max(0, -Math.sin(ph + 1.4)) * amp * 1.5;
    if (!p.onGround) {
      thL = 0.5;
      thR = 0.15;
      knL = -0.9;
      knR = -0.45;
    }
    thL += crouch * 1.1;
    thR += crouch * 1.1;
    knL -= crouch * 1.9;
    knR -= crouch * 1.9;
    this.thighL.rotation.set(thL, 0, 0);
    this.thighR.rotation.set(thR, 0, 0);
    this.kneeL.rotation.x = knL;
    this.kneeR.rotation.x = knR;
    this.hips.position.y = 0.95 - crouch * 0.38 + Math.abs(Math.sin(ph)) * 0.03 * s01;

    // Upper body follows aim pitch (split between spine, head and the weapon).
    const pitch = Math.max(-1.2, Math.min(1.2, p.pitch));
    this.spine.rotation.set(pitch * 0.4 + crouch * 0.22, 0, 0);
    this.head.rotation.set(pitch * 0.35, 0, 0);

    // Weapon holder pose + recoil kick + reload tilt.
    if (p.firedAge < this.lastFiredAge) this.kick = 1;
    this.lastFiredAge = p.firedAge;
    this.kick *= Math.exp(-dt * 14);
    const grip = gripPose(p.weaponId);
    const reloadEnv = p.reloadT >= 0 ? Math.sin(Math.min(1, p.reloadT) * Math.PI) : 0;
    this.holder.position.copy(grip.pos);
    this.holder.position.z += this.kick * 0.05;
    this.holder.rotation.set(pitch * 0.6 - reloadEnv * 0.45 + this.kick * 0.08, 0, reloadEnv * 0.5);
    if (grip.rest === 'knife') {
      const m = p.meleeAge < 0.4 ? Math.sin((p.meleeAge / 0.4) * Math.PI) : 0;
      this.holder.position.z -= m * 0.2;
      this.holder.rotation.y = m * 0.9;
    } else {
      this.holder.rotation.y = 0;
    }
    if (grip.rest === 'bomb' && (p.planting || p.defusing)) this.holder.position.set(0, -0.15, -0.35);
    this.holder.updateMatrix();

    // IK hands.
    const rightTarget = _p.copy(this.holder.position);
    this.solveArm(this.armR, rightTarget);
    let left: THREE.Vector3;
    if (p.defusing) left = _e.set(-0.05, -0.12, -0.42);
    else if (grip.rest === 'knife') left = _e.set(-0.3, 0.02, -0.12);
    else if (this.current) {
      left = _e.copy(this.current.leftHand).applyMatrix4(this.holder.matrix);
      if (reloadEnv > 0.3 && this.current.mag) left.y -= 0.15 * reloadEnv;
    } else left = _e.set(-0.3, 0, 0);
    this.solveArm(this.armL, left.clone());
  }

  dispose(): void {
    this.root.removeFromParent();
    if (this.nameTag) {
      (this.nameTag.material as THREE.SpriteMaterial).dispose();
    }
    this.nameTex?.dispose();
  }
}

export function disposeCharacterCaches(): void {
  for (const g of geoCache.values()) g.dispose();
  for (const m of matCache.values()) m.dispose();
  geoCache.clear();
  matCache.clear();
}

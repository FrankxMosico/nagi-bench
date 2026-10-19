import * as THREE from 'three';
import type { Team, WeaponId } from '../engine/weapons.ts';
import type { WeaponModel } from './weaponModels.ts';
import { buildWeapon } from './weaponModels.ts';

/** Inputs for one frame of the first-person weapon view. */
export interface ViewModelState {
  visible: boolean;
  team: Team;
  weaponId: WeaponId;
  speed: number;
  onGround: boolean;
  crouch: number;
  /** 0..1 draw progress. */
  drawT: number;
  /** 0..1 reload progress or -1. */
  reloadT: number;
  /** Seconds since the last melee swing, and whether it was a stab. */
  meleeAge: number;
  meleeStab: boolean;
  planting: boolean;
  defusing: boolean;
  /** Mouse delta this frame (pixels) for weapon sway. */
  lookDX: number;
  lookDY: number;
}

const REST: Record<WeaponId, { pos: THREE.Vector3; rotY: number; rotX: number; rotZ: number }> = {
  ak47: { pos: new THREE.Vector3(0.15, -0.17, -0.33), rotY: 0.045, rotX: 0, rotZ: 0 },
  m4a4: { pos: new THREE.Vector3(0.15, -0.165, -0.33), rotY: 0.045, rotX: 0, rotZ: 0 },
  awp: { pos: new THREE.Vector3(0.15, -0.18, -0.36), rotY: 0.04, rotX: 0, rotZ: 0 },
  glock: { pos: new THREE.Vector3(0.12, -0.15, -0.36), rotY: 0.04, rotX: 0, rotZ: 0 },
  usp: { pos: new THREE.Vector3(0.12, -0.15, -0.34), rotY: 0.04, rotX: 0, rotZ: 0 },
  deagle: { pos: new THREE.Vector3(0.12, -0.155, -0.36), rotY: 0.04, rotX: 0, rotZ: 0 },
  knife: { pos: new THREE.Vector3(0.17, -0.17, -0.3), rotY: 0.25, rotX: 0.35, rotZ: -0.35 },
  c4: { pos: new THREE.Vector3(0.0, -0.24, -0.4), rotY: 0, rotX: 0.6, rotZ: 0 },
};

const KICK: Partial<Record<WeaponId, number>> = { ak47: 0.03, m4a4: 0.018, awp: 0.07, glock: 0.022, usp: 0.026, deagle: 0.06 };

const SLEEVE: Record<Team, number> = { T: 0xa47e48, CT: 0x22385a };
const Z = new THREE.Vector3(0, 0, 1);
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

function smooth(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export class ViewModel {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  private readonly root = new THREE.Group();
  private readonly pivot = new THREE.Group();
  private readonly models = new Map<WeaponId, WeaponModel>();
  private current: WeaponModel | null = null;
  private readonly foreR: THREE.Mesh;
  private readonly foreL: THREE.Mesh;
  private readonly handR: THREE.Mesh;
  private readonly handL: THREE.Mesh;
  private readonly sleeveMat: THREE.MeshStandardMaterial;
  private readonly gloveMat: THREE.MeshStandardMaterial;
  private readonly flash: THREE.Sprite;
  private readonly flashLight: THREE.PointLight;
  private flashT = 0;
  private kick = 0;
  private bob = 0;
  private swayX = 0;
  private swayY = 0;
  private team: Team | null = null;

  constructor(flashTexture: THREE.Texture) {
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10);
    this.scene.add(this.camera);
    this.camera.add(this.root);
    this.root.add(this.pivot);
    this.scene.add(new THREE.HemisphereLight(0xfff4e0, 0x6b5a45, 1.4));
    const sun = new THREE.DirectionalLight(0xffeedd, 1.8);
    sun.position.set(0.5, 1, 0.6);
    this.scene.add(sun);

    this.sleeveMat = new THREE.MeshStandardMaterial({ color: SLEEVE.CT, roughness: 0.9 });
    this.gloveMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.8 });
    const foreGeo = new THREE.BoxGeometry(0.075, 0.075, 1);
    foreGeo.translate(0, 0, 0.5);
    const handGeo = new THREE.BoxGeometry(0.07, 0.085, 0.1);
    this.foreR = new THREE.Mesh(foreGeo, this.sleeveMat);
    this.foreL = new THREE.Mesh(foreGeo, this.sleeveMat);
    this.handR = new THREE.Mesh(handGeo, this.gloveMat);
    this.handL = new THREE.Mesh(handGeo, this.gloveMat);
    this.root.add(this.foreR, this.foreL, this.handR, this.handL);

    this.flash = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: flashTexture, color: 0xffd9a0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    this.flash.visible = false;
    this.flash.scale.set(0.16, 0.16, 1);
    this.flashLight = new THREE.PointLight(0xffb060, 0, 3, 2);
    this.root.add(this.flash, this.flashLight);
  }

  setAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  private model(id: WeaponId): WeaponModel {
    let m = this.models.get(id);
    if (!m) {
      m = buildWeapon(id);
      m.group.traverse((o) => {
        o.castShadow = false;
      });
      this.models.set(id, m);
    }
    return m;
  }

  onFire(weaponId: WeaponId): void {
    this.kick += KICK[weaponId] ?? 0.02;
    if (weaponId !== 'knife' && weaponId !== 'c4') {
      this.flashT = weaponId === 'usp' ? 0.025 : 0.05;
      this.flash.material.rotation = Math.random() * Math.PI;
      const s = weaponId === 'awp' || weaponId === 'deagle' ? 0.24 : weaponId === 'usp' ? 0.08 : 0.17;
      this.flash.scale.set(s, s, 1);
    }
  }

  /**
   * Muzzle position in view-camera space (the view camera sits at the origin of its own scene),
   * so callers can transform it by the main camera's matrixWorld to start tracers at the gun.
   */
  muzzleCameraSpace(out: THREE.Vector3): THREE.Vector3 {
    if (!this.current) return out.set(0.1, -0.1, -0.6);
    return out.copy(this.current.muzzle).applyMatrix4(this.pivot.matrix).applyMatrix4(this.root.matrix);
  }

  update(st: ViewModelState, dt: number): void {
    this.root.visible = st.visible;
    if (!st.visible) {
      this.flashLight.intensity = 0;
      return;
    }
    if (this.team !== st.team) {
      this.team = st.team;
      this.sleeveMat.color.setHex(SLEEVE[st.team]);
    }
    const want = st.planting || st.defusing ? (st.planting ? 'c4' : st.weaponId) : st.weaponId;
    if (this.current?.id !== want) {
      if (this.current) this.current.group.removeFromParent();
      this.current = this.model(want);
      this.pivot.add(this.current.group);
    }
    const m = this.current;
    const rest = REST[m.id];

    // Bob & sway.
    const s01 = st.onGround ? Math.min(1, st.speed / 5.5) : 0;
    this.bob += dt * (4 + st.speed * 1.6);
    this.swayX += (-st.lookDX * 0.00025 - this.swayX) * Math.min(1, dt * 10);
    this.swayY += (st.lookDY * 0.00025 - this.swayY) * Math.min(1, dt * 10);
    this.swayX = Math.max(-0.03, Math.min(0.03, this.swayX));
    this.swayY = Math.max(-0.03, Math.min(0.03, this.swayY));
    this.kick *= Math.exp(-dt * 16);

    const p = this.pivot.position;
    p.copy(rest.pos);
    p.x += Math.sin(this.bob) * 0.011 * s01 + this.swayX;
    p.y += -Math.abs(Math.cos(this.bob)) * 0.01 * s01 + this.swayY - st.crouch * 0.01;
    p.z += this.kick;
    let rx = rest.rotX + this.kick * 2.2;
    let ry = rest.rotY + this.swayX * 1.5;
    let rz = rest.rotZ;

    // Draw.
    const d = smooth(st.drawT);
    p.y -= (1 - d) * 0.22;
    rx -= (1 - d) * 0.9;

    // Reload choreography: tilt, mag out, mag in, return.
    if (m.mag) m.mag.visible = true;
    if (st.reloadT >= 0) {
      const t = st.reloadT;
      const env = t < 0.15 ? smooth(t / 0.15) : t > 0.85 ? smooth((1 - t) / 0.15) : 1;
      rx += env * 0.35;
      rz += env * 0.45;
      p.y -= env * 0.04;
      if (m.mag) {
        const magOut = t > 0.15 && t < 0.45 ? (t - 0.15) / 0.3 : 0;
        const magIn = t >= 0.45 && t < 0.7 ? 1 - (t - 0.45) / 0.25 : 0;
        m.mag.position.y = -0.005 - (magOut * magOut * 0.35 + magIn * 0.22) + (m.id === 'awp' ? -0.025 : 0);
        m.mag.visible = !(t > 0.38 && t < 0.47);
      }
      if (t > 0.72 && t < 0.86) p.z += Math.sin(((t - 0.72) / 0.14) * Math.PI) * 0.03;
    } else if (m.mag) {
      m.mag.position.y = m.id === 'awp' ? -0.03 : m.id === 'ak47' ? -0.005 : m.id === 'm4a4' ? -0.025 : -0.075;
    }

    // Knife swings.
    if (m.id === 'knife' && st.meleeAge < (st.meleeStab ? 0.8 : 0.4)) {
      const dur = st.meleeStab ? 0.8 : 0.4;
      const k = Math.sin((st.meleeAge / dur) * Math.PI);
      if (st.meleeStab) {
        p.z -= k * 0.16;
        rx -= k * 0.4;
      } else {
        p.x -= k * 0.14;
        ry += k * 1.1;
        rz += k * 0.6;
      }
    }

    // Planting / defusing: hands low and tapping.
    if (st.planting) {
      p.set(0, -0.26 + Math.abs(Math.sin(this.bob * 2.5)) * 0.01, -0.38);
      rx = 0.7;
      ry = 0;
      rz = 0;
    } else if (st.defusing) {
      p.y -= 0.18;
      rx -= 0.5;
    }

    this.pivot.rotation.set(rx, ry, rz);
    this.pivot.updateMatrix();

    // Arms: forearms from off-screen elbows to the grip / support hand.
    const grip = _a.set(0, -0.02, 0.01).applyMatrix4(this.pivot.matrix);
    this.placeForearm(this.foreR, this.handR, _b.set(0.3, -0.44, 0.08), grip);
    let support: THREE.Vector3;
    if (m.id === 'knife') support = _a.set(-0.25, -0.5, -0.1);
    else if (st.reloadT >= 0 && st.reloadT > 0.18 && st.reloadT < 0.68 && m.mag) {
      support = _a.copy(m.mag.position).add(new THREE.Vector3(0, -0.04, 0)).applyMatrix4(this.pivot.matrix);
    } else support = _a.copy(m.leftHand).applyMatrix4(this.pivot.matrix);
    this.placeForearm(this.foreL, this.handL, new THREE.Vector3(-0.08, -0.46, -0.06), support.clone());

    // Muzzle flash.
    this.flashT -= dt;
    const flashing = this.flashT > 0;
    this.flash.visible = flashing;
    if (flashing) {
      this.flash.position.copy(m.muzzle).applyMatrix4(this.pivot.matrix);
      this.flashLight.position.copy(this.flash.position);
      this.flashLight.intensity = 2.5;
    } else this.flashLight.intensity = 0;
  }

  private placeForearm(fore: THREE.Mesh, hand: THREE.Mesh, elbow: THREE.Vector3, wrist: THREE.Vector3): void {
    const dir = wrist.clone().sub(elbow);
    const len = Math.max(0.05, dir.length());
    dir.normalize();
    fore.position.copy(elbow);
    fore.quaternion.setFromUnitVectors(Z, dir);
    fore.scale.set(1, 1, len);
    hand.position.copy(wrist);
    hand.quaternion.copy(fore.quaternion);
  }

  dispose(): void {
    this.sleeveMat.dispose();
    this.gloveMat.dispose();
    (this.foreR.geometry as THREE.BufferGeometry).dispose();
    (this.handR.geometry as THREE.BufferGeometry).dispose();
    this.flash.material.dispose();
  }
}

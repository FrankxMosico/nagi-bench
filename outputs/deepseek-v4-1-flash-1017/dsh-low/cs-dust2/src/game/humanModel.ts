import * as THREE from 'three';
import type { Team, WeaponId } from './types';
import { buildWeaponModel, SHARED_WEAPON_MATERIALS } from './weaponModels';

const skinMat = new THREE.MeshStandardMaterial({ color: 0xb17c58, roughness: 0.9 });
const skinDark = new THREE.MeshStandardMaterial({ color: 0x8f5f42, roughness: 0.92 });
const bootMat = new THREE.MeshStandardMaterial({ color: 0x241f1a, roughness: 0.9 });
const gloveMat = new THREE.MeshStandardMaterial({ color: 0x262522, roughness: 0.95 });
const eyeMat = new THREE.MeshBasicMaterial({ color: 0x17110d });

interface ArmRig {
  shoulder: THREE.Group;
  elbow: THREE.Group;
}

interface LegRig {
  hip: THREE.Group;
  knee: THREE.Group;
}

export class HumanModel {
  readonly root = new THREE.Group();
  readonly body = new THREE.Group();
  private readonly head = new THREE.Group();
  private readonly leftArm: ArmRig;
  private readonly rightArm: ArmRig;
  private readonly leftLeg: LegRig;
  private readonly rightLeg: LegRig;
  private readonly weaponHolder = new THREE.Group();
  private weaponModel: THREE.Group | null = null;
  private weaponId: WeaponId | null = null;
  private walkPhase = 0;
  private deadAmount = 0;
  private flashAmount = 0;
  private readonly flashMats: THREE.MeshStandardMaterial[] = [];
  private readonly allMaterials = new Set<THREE.Material>();
  team: Team;
  dead = false;

  constructor(team: Team, _name: string) {
    this.team = team;
    const uniform = this.regMat(team === 'CT'
      ? { color: 0x2c4055, roughness: 0.86, metalness: 0.03 }
      : { color: 0x8f7147, roughness: 0.92, metalness: 0.02 });
    const uniformDark = this.regMat(team === 'CT'
      ? { color: 0x202d3b, roughness: 0.9 }
      : { color: 0x5c4931, roughness: 0.94 });
    const accent = this.regMat(team === 'CT'
      ? { color: 0x477688, roughness: 0.72, metalness: 0.1 }
      : { color: 0x783126, roughness: 0.84 });
    const vestMat = this.regMat(team === 'CT'
      ? { color: 0x394638, roughness: 0.82 }
      : { color: 0x54492f, roughness: 0.9 });
    const helmetMat = this.regMat(team === 'CT'
      ? { color: 0x26303a, roughness: 0.52, metalness: 0.35 }
      : { color: 0x4a3524, roughness: 0.88 });
    const pants = this.regMat(team === 'CT'
      ? { color: 0x28394a, roughness: 0.9 }
      : { color: 0x6b583c, roughness: 0.94 });

    this.root.add(this.body);
    this.root.rotation.order = 'YXZ';

    // Hips and torso have an explicit silhouette; never a single capsule.
    const hips = this.makeBox([0.48, 0.22, 0.3], [0, 0.92, 0], uniformDark);
    hips.castShadow = true;
    this.body.add(hips);

    const torso = this.makeBox([0.56, 0.62, 0.34], [0, 1.27, 0], uniform);
    const vest = this.makeBox([0.5, 0.42, 0.375], [0, 1.32, -0.005], vestMat);
    vest.castShadow = true;
    // A narrow identification strip and pouches, rather than a full bright chest slab.
    this.makeBox([0.24, 0.075, 0.39], [0, 1.43, -0.01], accent);
    this.makeBox([0.19, 0.06, 0.395], [0, 1.12, -0.01], team === 'CT' ? accent : uniformDark);
    this.makeBox([0.11, 0.13, 0.06], [-0.11, 1.28, -0.2], vestMat);
    this.makeBox([0.11, 0.13, 0.06], [0.11, 1.28, -0.2], vestMat);
    this.makeBox([0.11, 0.13, 0.06], [0, 1.2, -0.2], uniformDark);
    this.makeBox([0.22, 0.045, 0.045], [0, 1.35, -0.225], accent);
    if (team === 'T') {
      const scarf = this.makeBox([0.32, 0.08, 0.37], [0, 1.57, 0], accent);
      scarf.castShadow = true;
      const backpack = this.makeBox([0.34, 0.4, 0.2], [0, 1.25, 0.26], uniformDark);
      backpack.castShadow = true;
    } else {
      const shoulderL = this.makeBox([0.17, 0.16, 0.33], [-0.36, 1.5, 0], accent);
      const shoulderR = this.makeBox([0.17, 0.16, 0.33], [0.36, 1.5, 0], accent);
      shoulderL.castShadow = true;
      shoulderR.castShadow = true;
      const radio = this.makeBox([0.1, 0.22, 0.12], [0.22, 1.45, 0.2], uniformDark);
      radio.castShadow = true;
    }

    // Neck and head group.
    this.body.add(this.head);
    this.head.position.y = 1.62;
    this.makeBox([0.16, 0.09, 0.15], [0, 0.02, 0], skinDark);
    const face = this.makeBox([0.28, 0.3, 0.27], [0, 0.2, 0], skinMat);
    face.castShadow = true;
    this.makeBox([0.05, 0.035, 0.02], [-0.075, 0.23, -0.143], eyeMat);
    this.makeBox([0.05, 0.035, 0.02], [0.075, 0.23, -0.143], eyeMat);
    this.makeBox([0.11, 0.035, 0.03], [0, 0.12, -0.145], skinDark);
    if (team === 'CT') {
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.185, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.58), helmetMat);
      helmet.scale.set(1, 0.8, 1.04);
      helmet.position.y = 0.33;
      helmet.castShadow = true;
      this.head.add(helmet);
      this.makeBox([0.3, 0.04, 0.05], [0, 0.27, -0.16], accent);
      this.makeBox([0.04, 0.3, 0.045], [-0.18, 0.2, 0.04], helmetMat);
      this.makeBox([0.04, 0.3, 0.045], [0.18, 0.2, 0.04], helmetMat);
      this.makeBox([0.1, 0.14, 0.07], [0.12, 0.24, 0.16], helmetMat);
      this.makeBox([0.03, 0.02, 0.22], [0.2, 0.38, -0.02], helmetMat);
    } else {
      // head wrap + bandana tail
      const wrap = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52), helmetMat);
      wrap.scale.set(1.02, 0.7, 1.03);
      wrap.position.y = 0.34;
      wrap.castShadow = true;
      this.head.add(wrap);
      this.makeBox([0.29, 0.06, 0.29], [0, 0.29, 0], accent);
      this.makeBox([0.075, 0.22, 0.05], [0.15, 0.17, 0.12], accent);
      this.makeBox([0.15, 0.08, 0.12], [0, 0.08, -0.06], helmetMat);
    }

    this.leftArm = this.makeArm(-1, uniform, vestMat, accent);
    this.rightArm = this.makeArm(1, uniform, vestMat, accent);
    this.leftLeg = this.makeLeg(-1, pants, bootMat);
    this.rightLeg = this.makeLeg(1, pants, bootMat);

    this.weaponHolder.position.set(0.1, 1.27, -0.35);
    this.weaponHolder.rotation.set(0.02, -0.06, 0);
    this.body.add(this.weaponHolder);

    this.root.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        this.allMaterials.add(o.material as THREE.Material);
      }
    });
    for (const m of this.allMaterials) {
      if (m instanceof THREE.MeshStandardMaterial) {
        m.userData.baseEmissive = m.emissive.clone();
        this.flashMats.push(m);
      }
    }
  }

  private regMat(params: THREE.MeshStandardMaterialParameters) {
    const mat = new THREE.MeshStandardMaterial(params);
    return mat;
  }

  private makeBox(size: [number, number, number], pos: [number, number, number], mat: THREE.Material): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
    mesh.position.set(...pos);
    mesh.castShadow = true;
    this.body.add(mesh);
    return mesh;
  }

  private makeArm(side: -1 | 1, sleeve: THREE.Material, shoulderMat: THREE.Material, accent: THREE.Material): ArmRig {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.34, 1.5, 0);
    shoulder.rotation.set(1.18, 0, side * 0.2);
    this.body.add(shoulder);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.17, 0.21), shoulderMat);
    pad.position.set(0, -0.02, 0);
    pad.castShadow = true;
    shoulder.add(pad);
    const armMesh = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.4, 0.15), sleeve);
    armMesh.position.set(0, -0.24, 0);
    armMesh.castShadow = true;
    shoulder.add(armMesh);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.075, 0.16), accent);
    band.position.set(0, -0.41, 0);
    band.castShadow = true;
    shoulder.add(band);
    const elbow = new THREE.Group();
    elbow.position.y = -0.43;
    elbow.rotation.x = 0.24;
    shoulder.add(elbow);
    const forearm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.14), sleeve);
    forearm.position.y = -0.15;
    forearm.castShadow = true;
    elbow.add(forearm);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.14), gloveMat);
    hand.position.set(0, -0.32, -0.01);
    hand.castShadow = true;
    elbow.add(hand);
    return { shoulder, elbow };
  }

  private makeLeg(side: -1 | 1, pantsMat: THREE.Material, boot: THREE.Material): LegRig {
    const hip = new THREE.Group();
    hip.position.set(side * 0.15, 0.91, 0);
    this.body.add(hip);
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.44, 0.2), pantsMat);
    thigh.position.y = -0.23;
    thigh.castShadow = true;
    hip.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.46;
    hip.add(knee);
    const shin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.17), pantsMat);
    shin.position.y = -0.2;
    shin.castShadow = true;
    knee.add(shin);
    const bootMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.13, 0.27), boot);
    bootMesh.position.set(0, -0.44, -0.03);
    bootMesh.castShadow = true;
    knee.add(bootMesh);
    return { hip, knee };
  }

  setWeapon(id: WeaponId) {
    if (this.weaponId === id) return;
    this.weaponId = id;
    if (this.weaponModel) {
      this.weaponHolder.remove(this.weaponModel);
      this.weaponModel.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
    }
    const built = buildWeaponModel(id);
    this.weaponModel = built.group;
    this.weaponModel.scale.setScalar(id === 'awp' ? 0.9 : 0.95);
    this.weaponHolder.add(built.group);
  }

  flash() {
    this.flashAmount = 0.1;
  }

  update(dt: number, moveSpeed: number, alive = true) {
    if (!alive) {
      this.deadAmount = Math.min(1, this.deadAmount + dt * 3.5);
      const eased = 1 - Math.pow(1 - this.deadAmount, 3);
      this.root.rotation.z = this.team === 'CT' ? -eased * Math.PI * 0.47 : eased * Math.PI * 0.47;
      this.root.position.y = -eased * 0.55;
      this.leftArm.shoulder.rotation.x = 0.35;
      this.rightArm.shoulder.rotation.x = 0.2;
      return;
    }
    this.deadAmount = 0;
    this.root.rotation.z = 0;
    this.root.position.y = 0;
    const amount = Math.min(1, moveSpeed / 4.2);
    this.walkPhase += dt * (5.8 + amount * 6.8);
    const swing = Math.sin(this.walkPhase) * 0.58 * amount;
    const swing2 = Math.sin(this.walkPhase + Math.PI) * 0.58 * amount;
    this.leftLeg.hip.rotation.x = swing;
    this.rightLeg.hip.rotation.x = swing2;
    this.leftLeg.knee.rotation.x = Math.max(0, -swing) * 0.6;
    this.rightLeg.knee.rotation.x = Math.max(0, -swing2) * 0.6;
    const bob = Math.abs(Math.sin(this.walkPhase * 2)) * 0.018 * amount;
    this.body.position.y = bob;
    this.body.rotation.z = Math.sin(this.walkPhase) * 0.018 * amount;
    this.leftArm.shoulder.rotation.x = 1.18 + swing * 0.14;
    this.rightArm.shoulder.rotation.x = 1.18 + swing2 * 0.12;
    this.leftArm.shoulder.rotation.z = 0.2 + Math.sin(this.walkPhase) * 0.012;
    this.rightArm.shoulder.rotation.z = -0.2;
    this.weaponHolder.rotation.x = 0.02 + Math.sin(this.walkPhase) * 0.012 * amount;
    if (this.flashAmount > 0) {
      this.flashAmount = Math.max(0, this.flashAmount - dt);
      const strength = this.flashAmount * 8;
      for (const m of this.flashMats) {
        m.emissive.setRGB(strength * 0.8, strength * 0.22, strength * 0.12);
      }
    }
  }

  getWeaponMuzzleWorld(out: THREE.Vector3): THREE.Vector3 {
    this.weaponHolder.updateWorldMatrix(true, true);
    out.set(0, 0.015, -0.95).applyMatrix4(this.weaponHolder.matrixWorld);
    return out;
  }

  setVisible(v: boolean) {
    this.root.visible = v;
  }

  dispose() {
    this.root.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const mat = o.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => { if (!SHARED_WEAPON_MATERIALS.has(m)) m.dispose(); });
        else if (!SHARED_WEAPON_MATERIALS.has(mat)) mat.dispose();
      }
    });
    this.root.removeFromParent();
  }
}

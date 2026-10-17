import * as THREE from 'three';
import type { HitPart, Team, WeaponId } from './types';
import { createWeaponModel, disposeObject3D, WeaponModelResult } from './WeaponModels';

interface Hitbox {
  mesh: THREE.Mesh;
  part: HitPart;
}

interface TeamMaterials {
  shirt: THREE.MeshStandardMaterial;
  pants: THREE.MeshStandardMaterial;
  vest: THREE.MeshStandardMaterial;
  skin: THREE.MeshStandardMaterial;
  boots: THREE.MeshStandardMaterial;
  helmet: THREE.MeshStandardMaterial;
  accent: THREE.MeshStandardMaterial;
  dark: THREE.MeshStandardMaterial;
}

function makeMaterials(team: Team): TeamMaterials {
  if (team === 'CT') {
    return {
      shirt: new THREE.MeshStandardMaterial({ color: '#436579', roughness: 0.9 }),
      pants: new THREE.MeshStandardMaterial({ color: '#25343e', roughness: 0.92 }),
      vest: new THREE.MeshStandardMaterial({ color: '#1b2a33', roughness: 0.75, metalness: 0.08 }),
      skin: new THREE.MeshStandardMaterial({ color: '#b08160', roughness: 0.85 }),
      boots: new THREE.MeshStandardMaterial({ color: '#151b1e', roughness: 0.9 }),
      helmet: new THREE.MeshStandardMaterial({ color: '#314955', roughness: 0.56, metalness: 0.25 }),
      accent: new THREE.MeshStandardMaterial({ color: '#74aec7', roughness: 0.5, metalness: 0.15 }),
      dark: new THREE.MeshStandardMaterial({ color: '#0e1418', roughness: 0.8 }),
    };
  }
  return {
    shirt: new THREE.MeshStandardMaterial({ color: '#876143', roughness: 0.95 }),
    pants: new THREE.MeshStandardMaterial({ color: '#3b3329', roughness: 0.95 }),
    vest: new THREE.MeshStandardMaterial({ color: '#382d22', roughness: 0.85 }),
    skin: new THREE.MeshStandardMaterial({ color: '#a87b59', roughness: 0.85 }),
    boots: new THREE.MeshStandardMaterial({ color: '#1c1814', roughness: 0.95 }),
    helmet: new THREE.MeshStandardMaterial({ color: '#2d251e', roughness: 0.92 }),
    accent: new THREE.MeshStandardMaterial({ color: '#c35b34', roughness: 0.7 }),
    dark: new THREE.MeshStandardMaterial({ color: '#17120e', roughness: 0.9 }),
  };
}

function box(
  parent: THREE.Object3D,
  material: THREE.Material,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function sphere(
  parent: THREE.Object3D,
  material: THREE.Material,
  r: number,
  x: number,
  y: number,
  z: number,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 7), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

/**
 * A deliberately low-poly but fully articulated humanoid: independent head,
 * torso, both arms and both legs. The actual body meshes are also raycast
 * hitboxes, so every visual limb maps 1:1 to a damage zone.
 */
export class CharacterRig {
  readonly root = new THREE.Group();
  readonly body = new THREE.Group();
  readonly hitboxes: Hitbox[] = [];
  readonly team: Team;
  readonly height = 1.86;
  private readonly headPivot = new THREE.Group();
  private readonly leftLeg = new THREE.Group();
  private readonly rightLeg = new THREE.Group();
  private readonly leftArm = new THREE.Group();
  private readonly rightArm = new THREE.Group();
  private readonly leftElbow = new THREE.Group();
  private readonly rightElbow = new THREE.Group();
  private readonly weaponMount = new THREE.Group();
  private readonly materials: TeamMaterials;
  private readonly currentTeam: Team;
  private weaponModel: WeaponModelResult | null = null;
  private weaponId: WeaponId | null = null;
  private walkPhase = 0;
  private flashTimer = 0;
  private recoilKick = 0;
  private reloadTilt = 0;
  private targetReloadTilt = 0;
  private deathProgress = 0;
  private dead = false;
  private time = 0;

  constructor(team: Team) {
    this.team = team;
    this.currentTeam = team;
    this.materials = makeMaterials(team);
    this.root.name = `character_${team}`;
    this.root.add(this.body);
    this.weaponMount.position.set(0.21, 1.23, -0.34);
    this.weaponMount.scale.setScalar(0.82);
    this.body.add(this.weaponMount);

    // Legs: a hip pivot with a full-length limb and a boot. Both the limb and
    // boot are intentionally kept and animated independently from each other.
    this.leftLeg.position.set(-0.16, 0.98, 0);
    this.rightLeg.position.set(0.16, 0.98, 0);
    this.body.add(this.leftLeg, this.rightLeg);
    for (const [side, pivot] of [
      [-1, this.leftLeg],
      [1, this.rightLeg],
    ] as const) {
      const leg = box(pivot, this.materials.pants, 0.225, 0.85, 0.24, 0, -0.43, 0);
      this.addHitbox(leg, 'leg');
      const boot = box(pivot, this.materials.boots, 0.23, 0.15, 0.34, 0, -0.9, -0.055);
      boot.rotation.y = side * 0.02;
    }

    // Torso: separate chest and stomach hit areas. These are the visual body,
    // not an invisible proxy.
    const chest = box(this.body, this.materials.vest, 0.58, 0.44, 0.33, 0, 1.39, 0);
    this.addHitbox(chest, 'chest');
    const stomach = box(this.body, this.materials.shirt, 0.48, 0.27, 0.29, 0, 1.1, 0);
    this.addHitbox(stomach, 'stomach');
    // Head and team headgear.
    this.headPivot.position.set(0, 1.59, 0);
    this.body.add(this.headPivot);
    box(this.headPivot, this.materials.skin, 0.14, 0.1, 0.14, 0, 0.02, 0);
    const headMesh = sphere(this.headPivot, this.materials.skin, 0.175, 0, 0.18, 0);
    headMesh.scale.set(0.94, 1.02, 0.94);
    this.addHitbox(headMesh, 'head');
    if (team === 'CT') {
      const helmet = sphere(this.headPivot, this.materials.helmet, 0.195, 0, 0.21, 0.015);
      helmet.scale.set(1.02, 0.68, 1.02);
      box(this.headPivot, this.materials.dark, 0.23, 0.065, 0.055, 0, 0.23, -0.165).rotation.x = -0.08;
      box(this.headPivot, this.materials.accent, 0.275, 0.04, 0.1, 0, 0.29, -0.08);
    } else {
      const hood = sphere(this.headPivot, this.materials.helmet, 0.188, 0, 0.18, 0.02);
      hood.scale.set(0.95, 1.0, 0.9);
      box(this.headPivot, this.materials.skin, 0.16, 0.11, 0.045, 0, 0.16, -0.166);
      box(this.headPivot, this.materials.dark, 0.17, 0.05, 0.04, 0, 0.11, -0.17);
      const band = box(this.headPivot, this.materials.accent, 0.32, 0.055, 0.23, 0, 0.27, 0.02);
      band.rotation.z = 0.02;
    }

    // Arms: single articulated limb per side with a gloved hand.
    this.leftArm.position.set(-0.37, 1.5, 0);
    this.rightArm.position.set(0.37, 1.5, 0);
    this.body.add(this.leftArm, this.rightArm);
    for (const [side, pivot, elbow] of [
      [-1, this.leftArm, this.leftElbow],
      [1, this.rightArm, this.rightElbow],
    ] as const) {
      const upper = box(pivot, this.materials.shirt, 0.155, 0.26, 0.18, 0, -0.12, 0);
      this.addHitbox(upper, 'arm');
      elbow.position.set(0, -0.24, 0);
      pivot.add(elbow);
      const forearm = box(elbow, this.materials.shirt, 0.135, 0.36, 0.14, 0, -0.17, -0.035);
      this.addHitbox(forearm, 'arm');
      const glove = box(elbow, this.materials.dark, 0.115, 0.12, 0.15, 0, -0.38, -0.065);
      glove.rotation.x = 0.22;
      pivot.rotation.set(0.12, side * -0.25, side * 0.16);
      elbow.rotation.set(1.4, 0, side * -0.08);
    }

    this.root.visible = true;
  }

  private addHitbox(mesh: THREE.Mesh, part: HitPart): void {
    mesh.userData.hitPart = part;
    this.hitboxes.push({ mesh, part });
  }

  setTeamVisuals(team: Team): void {
    // Teams do not swap mid-round in this mode. Kept as an extension point.
    void team;
    void this.currentTeam;
  }

  setWeapon(id: WeaponId | null, team: Team = this.team): void {
    if (this.weaponId === id) return;
    this.weaponId = id;
    if (this.weaponModel) {
      this.weaponMount.remove(this.weaponModel.group);
      disposeObject3D(this.weaponModel.group);
      this.weaponModel = null;
    }
    this.weaponMount.visible = Boolean(id);
    if (!id) return;
    this.weaponModel = createWeaponModel(id, { viewModel: false, team });
    this.weaponMount.add(this.weaponModel.group);
    this.weaponModel.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }

  get currentWeaponId(): WeaponId | null {
    return this.weaponId;
  }

  getMuzzleWorldPosition(target = new THREE.Vector3()): THREE.Vector3 {
    if (this.weaponModel) {
      this.weaponModel.muzzle.getWorldPosition(target);
      return target;
    }
    return target.copy(this.root.position).add(new THREE.Vector3(0.2, 1.3, -0.5));
  }

  triggerFire(): void {
    this.flashTimer = 0.055;
    this.recoilKick = 0.08;
    if (this.weaponModel) this.weaponModel.flash.visible = true;
  }

  setReloading(reloading: boolean): void {
    this.targetReloadTilt = reloading ? 0.6 : 0;
  }

  setVisible(visible: boolean): void {
    this.root.visible = visible;
  }

  setDead(dead: boolean): void {
    if (this.dead === dead) return;
    this.dead = dead;
    if (!dead) {
      this.deathProgress = 0;
      this.body.rotation.set(0, 0, 0);
      this.body.position.y = 0;
      this.root.visible = true;
    }
  }

  update(
    dt: number,
    opts: {
      speed: number;
      aimPitch: number;
      alive: boolean;
      moving?: boolean;
      aiming?: boolean;
    },
  ): void {
    this.time += dt;
    this.flashTimer = Math.max(0, this.flashTimer - dt);
    this.recoilKick += (0 - this.recoilKick) * Math.min(1, dt * 16);
    this.reloadTilt += (this.targetReloadTilt - this.reloadTilt) * Math.min(1, dt * 8);
    if (this.weaponModel) this.weaponModel.flash.visible = this.flashTimer > 0.001;

    if (!opts.alive) {
      this.deathProgress = Math.min(1, this.deathProgress + dt * 3.4);
      const eased = 1 - (1 - this.deathProgress) ** 3;
      this.body.rotation.x = -eased * Math.PI * 0.48;
      this.body.rotation.z = eased * 0.07;
      this.body.position.y = -eased * 0.02;
      this.leftArm.rotation.x = 1.3 - 1.8 * eased;
      this.rightArm.rotation.x = 1.18 - 1.6 * eased;
      return;
    }

    const speedFactor = Math.min(1, opts.speed / 5);
    this.walkPhase += dt * (2.5 + opts.speed * 1.25);
    const swing = Math.sin(this.walkPhase) * 0.42 * speedFactor;
    const idle = Math.sin(this.time * 1.4) * 0.007;
    this.leftLeg.rotation.x = swing + idle;
    this.rightLeg.rotation.x = -swing + idle;
    this.body.position.y = Math.abs(Math.sin(this.walkPhase)) * 0.032 * speedFactor;
    this.body.position.x = Math.cos(this.walkPhase) * 0.012 * speedFactor;

    const aimUp = Math.max(-0.85, Math.min(0.85, opts.aimPitch));
    this.headPivot.rotation.x = aimUp * 0.3;
    this.weaponMount.rotation.x = aimUp * 0.82 + this.recoilKick * 0.8;
    this.weaponMount.rotation.z = this.reloadTilt * 0.3;
    this.weaponMount.position.y = 1.23 - this.reloadTilt * 0.18 + this.body.position.y;
    this.weaponMount.position.z = -0.34 + this.recoilKick * 0.34;
    this.weaponMount.rotation.y = this.reloadTilt * 0.22;
    this.leftArm.rotation.x = 0.12 + aimUp * 0.16 + swing * 0.05;
    this.rightArm.rotation.x = 0.12 + aimUp * 0.13 - swing * 0.035 + this.recoilKick * 0.4;
    this.leftArm.rotation.z = 0.16 + Math.sin(this.walkPhase) * 0.016 * speedFactor;
    this.rightArm.rotation.z = -0.16 - Math.sin(this.walkPhase) * 0.016 * speedFactor;
    this.leftArm.rotation.y = 0.25;
    this.rightArm.rotation.y = -0.25;
    this.leftElbow.rotation.x = 1.4 + aimUp * 0.28 + this.recoilKick * 0.3;
    this.rightElbow.rotation.x = 1.4 + aimUp * 0.28 + this.recoilKick * 0.35;
  }
}

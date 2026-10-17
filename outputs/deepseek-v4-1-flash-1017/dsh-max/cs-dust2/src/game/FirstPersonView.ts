import * as THREE from 'three';
import type { Team, WeaponId, WeaponSlot } from './types';
import { createWeaponModel, disposeObject3D, WeaponModelResult } from './WeaponModels';
import { WEAPONS } from '../data/weapons';

interface SlotModel {
  id: WeaponId;
  slot: WeaponSlot;
  model: WeaponModelResult;
}

/** Rendered in a dedicated pass so the viewmodel can never clip into walls. */
export class FirstPersonView {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(58, 1, 0.01, 8);
  private readonly root = new THREE.Group();
  private readonly holder = new THREE.Group();
  private readonly models: SlotModel[] = [];
  private readonly light = new THREE.PointLight('#ffe0b5', 1.6, 4, 2);
  private team: Team;
  private activeSlot: WeaponSlot = 'secondary';
  private activeId: WeaponId = 'usp';
  private elapsed = 0;
  private swayX = 0;
  private swayY = 0;
  private mouseDX = 0;
  private mouseDY = 0;
  private kick = 0;
  private kickYaw = 0;
  private reloadAmount = 0;
  private reloading = false;
  private switchAmount = 0;
  private scoped = false;
  private movingSpeed = 0;
  private flashTimer = 0;
  private activeFlash: THREE.Object3D | null = null;
  private knifeSwing = 0;
  private fireAge = 999;

  constructor(team: Team) {
    this.team = team;
    this.camera.position.set(0, 0, 0);
    this.scene.add(this.root);
    this.root.add(this.holder);
    this.scene.add(new THREE.HemisphereLight('#e4edf1', '#6b543b', 2.9));
    this.scene.add(new THREE.AmbientLight('#d9d2c1', 0.65));
    const key = new THREE.DirectionalLight('#fff2cf', 2.5);
    key.position.set(-2, 3, 2);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight('#6f97bb', 1.0);
    rim.position.set(2, 0.4, -1.5);
    this.scene.add(rim);
    this.light.position.set(0.25, 0.2, -0.2);
    this.scene.add(this.light);
    this.root.position.set(0.33, -0.21, -0.84);
    this.root.scale.setScalar(0.55);
  }

  setLoadout(primary: WeaponId | null, secondary: WeaponId, team: Team): void {
    const currentPrimary = this.models.find((m) => m.slot === 'primary')?.id ?? null;
    const currentSecondary = this.models.find((m) => m.slot === 'secondary')?.id ?? null;
    const loadoutChanged =
      team !== this.team ||
      this.models.length === 0 ||
      currentPrimary !== primary ||
      currentSecondary !== secondary;
    if (!loadoutChanged) return;
    this.team = team;
    this.clearModels();
    const ids: WeaponId[] = [];
    if (primary) ids.push(primary);
    ids.push(secondary, 'knife');
    for (const id of ids) {
      const model = createWeaponModel(id, { viewModel: true, team });
      model.group.visible = false;
      model.group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = false;
          obj.receiveShadow = false;
          obj.frustumCulled = false;
        }
      });
      this.holder.add(model.group);
      this.models.push({ id, slot: WEAPONS[id].slot, model });
    }
    const wantedSlot = this.activeSlot;
    const wanted = this.models.find((m) => m.slot === wantedSlot);
    const fallback = this.models.find((m) => m.slot === 'secondary') ?? this.models[0];
    this.equip((wanted ?? fallback).slot, true);
  }

  setActiveSlot(slot: WeaponSlot): void {
    const existing = this.models.find((m) => m.slot === slot);
    if (!existing) return;
    if (slot === this.activeSlot) return;
    this.activeSlot = slot;
    this.activeId = existing.id;
    this.switchAmount = 1;
    this.scoped = false;
    for (const item of this.models) item.model.group.visible = item.slot === slot;
    this.updateBasePose(true);
  }

  private equip(slot: WeaponSlot, instant = false): void {
    const existing = this.models.find((m) => m.slot === slot);
    if (!existing) return;
    this.activeSlot = slot;
    this.activeId = existing.id;
    if (!instant) this.switchAmount = 1;
    this.scoped = false;
    for (const item of this.models) item.model.group.visible = item.slot === slot;
    this.updateBasePose(true);
  }

  setScoped(scoped: boolean): void {
    this.scoped = scoped;
    const found = this.models.find((m) => m.slot === this.activeSlot);
    if (found) found.model.group.visible = !scoped;
  }

  setReloading(reloading: boolean): void {
    this.reloading = reloading;
  }

  addLook(dx: number, dy: number): void {
    this.mouseDX += dx;
    this.mouseDY += dy;
  }

  triggerFire(): void {
    const active = this.models.find((m) => m.slot === this.activeSlot);
    if (!active) return;
    this.kick = Math.min(0.22, this.kick + (active.id === 'awp' ? 0.16 : active.id === 'ak47' ? 0.085 : active.id === 'deagle' ? 0.075 : 0.04));
    this.kickYaw = (Math.random() - 0.5) * 0.03;
    this.flashTimer = 0.05;
    this.fireAge = 0;
    this.activeFlash = active.model.flash;
    active.model.flash.visible = true;
    if (active.id === 'knife') {
      this.knifeSwing = 1;
    }
  }

  update(
    dt: number,
    opts: { movingSpeed: number; activeId: WeaponId; reloading: boolean },
  ): void {
    this.elapsed += dt;
    this.movingSpeed = opts.movingSpeed;
    this.reloading = opts.reloading;
    this.activeId = opts.activeId;
    this.flashTimer = Math.max(0, this.flashTimer - dt);
    this.fireAge += dt;
    if (this.activeFlash && this.flashTimer <= 0) this.activeFlash.visible = false;
    this.kick += (0 - this.kick) * Math.min(1, dt * 15);
    this.kickYaw += (0 - this.kickYaw) * Math.min(1, dt * 13);
    this.switchAmount = Math.max(0, this.switchAmount - dt * 5.5);
    this.knifeSwing = Math.max(0, this.knifeSwing - dt * 4.2);
    this.reloadAmount += ((this.reloading ? 1 : 0) - this.reloadAmount) * Math.min(1, dt * 7);

    const swayDamp = Math.min(1, dt * 9);
    this.swayX += (THREE.MathUtils.clamp(-this.mouseDX * 0.00048, -0.025, 0.025) - this.swayX) * swayDamp;
    this.swayY += (THREE.MathUtils.clamp(this.mouseDY * 0.0004, -0.022, 0.022) - this.swayY) * swayDamp;
    this.mouseDX = 0;
    this.mouseDY = 0;

    const speedFactor = Math.min(1, this.movingSpeed / 5.5);
    const bobX = Math.cos(this.elapsed * 8.2) * 0.0085 * speedFactor;
    const bobY = Math.abs(Math.sin(this.elapsed * 8.2)) * 0.011 * speedFactor;
    const idle = Math.sin(this.elapsed * 1.6) * 0.0018;

    const base = this.basePose();
    const switchDrop = this.switchAmount * 0.2;
    this.root.position.x = base.x + bobX + this.swayX;
    this.root.position.y = base.y - bobY + this.swayY + idle - switchDrop - this.reloadAmount * 0.08;
    this.root.position.z = base.z + this.kick * 0.4 + this.reloadAmount * 0.035;
    this.root.rotation.z = this.swayX * 0.6 + this.reloadAmount * 0.32 + switchDrop * 0.8;
    this.root.rotation.y = 0.28 + this.swayX * 0.8 + this.kickYaw * 1.5 + this.reloadAmount * 0.22;
    this.root.rotation.x = this.swayY * 0.7 + this.kick * 0.52;
    this.holder.position.y = -this.knifeSwing * 0.03;
    this.holder.rotation.z = -this.knifeSwing * 0.9;
    this.holder.rotation.y = this.knifeSwing * 0.5;
    this.holder.rotation.x = -this.knifeSwing * 0.3;
    this.light.intensity = 1.6 + (this.flashTimer > 0 ? 4.2 : 0);
    this.light.position.z = -0.2 - this.kick;
    this.updateBasePose(false);
  }

  private basePose(): { x: number; y: number; z: number } {
    const item = this.models.find((m) => m.slot === this.activeSlot);
    if (!item) return { x: 0.225, y: -0.2, z: -0.86 };
    const def = WEAPONS[item.id];
    if (def.slot === 'melee') return { x: 0.205, y: -0.18, z: -0.8 };
    if (def.slot === 'secondary') return { x: 0.205, y: -0.16, z: -0.78 };
    if (item.id === 'awp') return { x: 0.2, y: -0.17, z: -0.92 };
    return { x: 0.21, y: -0.18, z: -0.87 };
  }

  private updateBasePose(force = false, _scopeBias = 0): void {
    const item = this.models.find((m) => m.slot === this.activeSlot);
    if (!item) return;
    const def = WEAPONS[item.id];
    const isPistol = def.slot === 'secondary';
    const isKnife = def.slot === 'melee';
    const isAwp = item.id === 'awp';
    const scale = isPistol ? 0.58 : isKnife ? 0.55 : isAwp ? 0.4 : 0.47;
    this.root.scale.setScalar(scale);
    item.model.group.position.set(
      isPistol ? -0.01 : 0,
      isPistol ? 0.01 : 0,
      isAwp ? 0.06 : 0,
    );
    if (force) this.root.updateMatrixWorld();
  }

  render(renderer: THREE.WebGLRenderer, aspect: number): void {
    if (this.scoped) return;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    renderer.clearDepth();
    renderer.render(this.scene, this.camera);
  }

  get activeWeaponId(): WeaponId {
    return this.activeId;
  }

  dispose(): void {
    this.clearModels();
    this.scene.clear();
  }

  private clearModels(): void {
    for (const item of this.models) {
      this.holder.remove(item.model.group);
      disposeObject3D(item.model.group);
    }
    this.models.length = 0;
  }
}

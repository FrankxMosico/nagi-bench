import * as THREE from 'three';
import type { Game } from '../engine/game.ts';
import type { GameEvent } from '../engine/events.ts';
import { getMapResources } from '../engine/game.ts';
import { damp, lerp, lerpAngle } from '../engine/math.ts';
import type { Soldier } from '../engine/soldier.ts';
import type { WeaponId } from '../engine/weapons.ts';
import { CharacterRig, disposeCharacterCaches } from './characterModel.ts';
import { Effects } from './effects.ts';
import type { MapView } from './mapMesh.ts';
import { buildMapView } from './mapMesh.ts';
import { ViewModel } from './viewModel.ts';
import type { WeaponModel } from './weaponModels.ts';
import { buildWeapon, disposeWeaponCaches } from './weaponModels.ts';

export const BASE_FOV = 74;

export interface RenderInput {
  dt: number;
  /** Interpolation factor between the previous and current simulation tick. */
  alpha: number;
  viewYaw: number;
  viewPitch: number;
  lookDX: number;
  lookDY: number;
  time: number;
}

const _v = new THREE.Vector3();

/**
 * Owns the WebGL renderer, the world scene (map, characters, items, effects) and the
 * first-person view-model scene. Reads simulation state every frame (with interpolation)
 * and reacts to simulation events for one-shot effects.
 */
export class GameRenderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(BASE_FOV, 1, 0.05, 800);
  readonly effects: Effects;
  readonly vm: ViewModel;
  private readonly container: HTMLElement;
  private readonly mapView: MapView;
  private readonly sun: THREE.DirectionalLight;
  private game: Game | null = null;
  private unsub: (() => void) | null = null;
  private readonly rigs = new Map<number, CharacterRig>();
  private readonly itemModels = new Map<number, WeaponModel>();
  private readonly bombModel: WeaponModel;
  private eyeY = 0;
  private lastSubject = -2;
  private shake = 0;
  private ledFlash = 0;
  private fov = BASE_FOV;
  private readonly onResize = () => this.resize();

  constructor(container: HTMLElement) {
    this.container = container;
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    renderer.domElement.className = 'game-canvas';
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);
    this.scene.fog = new THREE.Fog(0xdccdb0, 80, 260);
    this.scene.background = new THREE.Color(0xdccdb0);

    const sunDir = new THREE.Vector3(-0.45, 0.82, 0.36).normalize();
    this.scene.add(new THREE.HemisphereLight(0xcfe2ff, 0xb39470, 1.15));
    const sun = new THREE.DirectionalLight(0xffeccc, 2.7);
    sun.position.copy(sunDir).multiplyScalar(90).add(new THREE.Vector3(50, 0, 50));
    sun.target.position.set(50, 0, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -64;
    sc.right = 64;
    sc.top = 64;
    sc.bottom = -64;
    sc.near = 10;
    sc.far = 200;
    sc.updateProjectionMatrix();
    sun.shadow.bias = -0.0006;
    sun.shadow.normalBias = 0.04;
    this.scene.add(sun, sun.target);
    this.sun = sun;

    const { built } = getMapResources();
    this.mapView = buildMapView(built, renderer.capabilities.getMaxAnisotropy(), sunDir);
    this.scene.add(this.mapView.group);

    this.effects = new Effects();
    this.scene.add(this.effects.group);
    this.vm = new ViewModel(this.effects.flashTexture);

    this.bombModel = buildWeapon('c4');
    this.bombModel.group.visible = false;
    this.scene.add(this.bombModel.group);

    window.addEventListener('resize', this.onResize);
    this.resize();
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  /** Current vertical FOV (degrees), used by the HUD to size the dynamic crosshair. */
  get currentFov(): number {
    return this.fov;
  }

  resize(): void {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.vm.setAspect(w / h);
  }

  attach(game: Game): void {
    this.detach();
    this.game = game;
    const humanTeam = game.human?.team ?? null;
    for (const s of game.soldiers) {
      const showName = humanTeam !== null && s.team === humanTeam && s.id !== game.humanId;
      const rig = new CharacterRig(s.team, s.name.replace('BOT ', ''), showName);
      this.scene.add(rig.root);
      this.rigs.set(s.id, rig);
    }
    this.unsub = game.events.on((e) => this.onEvent(e));
    this.lastSubject = -2;
  }

  detach(): void {
    this.unsub?.();
    this.unsub = null;
    for (const rig of this.rigs.values()) rig.dispose();
    this.rigs.clear();
    for (const m of this.itemModels.values()) m.group.removeFromParent();
    this.itemModels.clear();
    this.bombModel.group.visible = false;
    this.effects.clearDecals();
    this.game = null;
  }

  private isFirstPerson(id: number): boolean {
    const g = this.game;
    if (!g) return false;
    const subj = g.viewSoldier;
    return subj !== null && subj.id === id && subj.alive;
  }

  private onEvent(e: GameEvent): void {
    const g = this.game;
    if (!g) return;
    switch (e.type) {
      case 'shot': {
        const fp = this.isFirstPerson(e.shooter);
        const end = new THREE.Vector3(e.end.x, e.end.y, e.end.z);
        const start = new THREE.Vector3();
        if (fp) {
          this.vm.onFire(e.weapon);
          this.camera.updateMatrixWorld();
          this.vm.muzzleCameraSpace(start).applyMatrix4(this.camera.matrixWorld);
        } else {
          const rig = this.rigs.get(e.shooter);
          if (rig) rig.muzzleWorld(start);
          else start.set(e.origin.x, e.origin.y, e.origin.z);
          if (e.weapon !== 'usp') this.effects.muzzleFlash(start, e.weapon === 'awp' || e.weapon === 'deagle');
        }
        this.effects.tracer(start, end);
        if (e.hitWorld && e.normal) this.effects.impact(end, new THREE.Vector3(e.normal.x, e.normal.y, e.normal.z));
        break;
      }
      case 'damage': {
        if (e.attacker < 0) break;
        const att = g.soldiers[e.attacker];
        const p = new THREE.Vector3(e.point.x, e.point.y, e.point.z);
        const dir = new THREE.Vector3(e.point.x - att.pos.x, 0, e.point.z - att.pos.z).normalize();
        this.effects.blood(p, dir, e.zone === 'head');
        if (e.helmetHit) this.effects.sparks(p);
        break;
      }
      case 'melee': {
        if (e.hitWorld && e.point) {
          const p = new THREE.Vector3(e.point.x, e.point.y, e.point.z);
          this.effects.sparks(p);
        }
        break;
      }
      case 'bombExploded': {
        const p = new THREE.Vector3(e.pos.x, e.pos.y, e.pos.z);
        this.effects.explosion(p);
        const d = p.distanceTo(this.camera.position);
        this.shake = Math.max(this.shake, Math.max(0, 1.2 - d / 45));
        break;
      }
      case 'bombBeep':
        this.ledFlash = 0.12;
        break;
      case 'roundStart':
        this.effects.clearDecals();
        break;
      default:
        break;
    }
  }

  private rigParams(s: Soldier, alpha: number, g: Game) {
    const w = s.weapon.def;
    return {
      x: lerp(s.prevPos.x, s.pos.x, alpha),
      y: lerp(s.prevPos.y, s.pos.y, alpha),
      z: lerp(s.prevPos.z, s.pos.z, alpha),
      yaw: lerpAngle(s.prevYaw, s.yaw, alpha),
      pitch: s.pitch + s.punchPitch * 0.5,
      speed: s.speed,
      onGround: s.onGround,
      crouch: s.crouchAmt,
      alive: s.alive,
      deathAge: g.time - s.deathTime,
      weaponId: (s.planting ? 'c4' : w.id) as WeaponId,
      hasBomb: s.hasBomb,
      planting: s.planting,
      defusing: s.defusing,
      reloadT: s.reloadEnd > 0 ? (g.time - s.reloadStart) / Math.max(0.01, s.reloadEnd - s.reloadStart) : -1,
      firedAge: g.time - s.lastShotTime,
      meleeAge: g.time - s.lastMeleeTime,
    };
  }

  render(inp: RenderInput): void {
    const g = this.game;
    const dt = inp.dt;
    this.effects.update(dt);
    const cam = this.camera;
    let targetFov = BASE_FOV;
    let vmVisible = false;
    let subject: Soldier | null = null;

    if (!g) {
      // Attract mode: slow orbit over the map.
      const t = inp.time * 0.04;
      cam.position.set(50 + Math.cos(t) * 62, 42, 50 + Math.sin(t) * 62);
      cam.lookAt(50, 0, 48);
    } else {
      subject = g.viewSoldier;
      const ctl = g.controlled;
      const a = inp.alpha;
      if (subject) {
        const px = lerp(subject.prevPos.x, subject.pos.x, a);
        const py = lerp(subject.prevPos.y, subject.pos.y, a);
        const pz = lerp(subject.prevPos.z, subject.pos.z, a);
        let yaw: number;
        let pitch: number;
        if (subject === ctl) {
          yaw = inp.viewYaw;
          pitch = inp.viewPitch;
        } else {
          yaw = lerpAngle(subject.prevYaw, subject.yaw, a);
          pitch = lerp(subject.prevPitch, subject.pitch, a);
        }
        yaw += subject.punchYaw;
        pitch += subject.punchPitch;
        const targetEye = py + subject.eyeHeight;
        if (subject.id !== this.lastSubject || Math.abs(targetEye - this.eyeY) > 1.2) this.eyeY = targetEye;
        else this.eyeY = damp(this.eyeY, targetEye, 20, dt);
        this.lastSubject = subject.id;
        cam.position.set(px, this.eyeY, pz);
        cam.rotation.set(pitch, yaw, 0);
        const def = subject.weapon.def;
        if (def.scopeFovs && subject.scope > 0) targetFov = def.scopeFovs[subject.scope - 1];
        vmVisible = subject.alive && subject.scope === 0;
      } else if (ctl && !ctl.alive) {
        // Death cam: rise above the body and look at the killer.
        const age = g.time - ctl.deathTime;
        const k = Math.min(1, age / 1.2);
        const killer = ctl.killerId >= 0 ? g.soldiers[ctl.killerId] : null;
        cam.position.set(ctl.pos.x, ctl.pos.y + 1.6 + k * 1.6, ctl.pos.z);
        const look = killer ?? ctl;
        cam.lookAt(look.pos.x, look.pos.y + 1.2, look.pos.z);
        this.lastSubject = -1;
      } else {
        cam.position.set(50, 60, 75);
        cam.lookAt(50, 0, 45);
        this.lastSubject = -1;
      }

      // Characters.
      for (const s of g.soldiers) {
        const rig = this.rigs.get(s.id);
        if (!rig) continue;
        const hidden = subject !== null && s.id === subject.id && subject.alive;
        rig.root.visible = !hidden;
        if (!hidden) rig.update(this.rigParams(s, a, g), dt);
      }

      // Dropped weapons.
      const seen = new Set<number>();
      for (const it of g.items) {
        seen.add(it.id);
        let m = this.itemModels.get(it.id);
        if (!m) {
          m = buildWeapon(it.weapon.def.id);
          m.group.rotation.order = 'YXZ';
          this.scene.add(m.group);
          this.itemModels.set(it.id, m);
        }
        m.group.position.set(it.pos.x, it.pos.y + 0.03, it.pos.z);
        m.group.rotation.set(0, it.yaw, Math.PI / 2);
      }
      for (const [id, m] of this.itemModels) {
        if (!seen.has(id)) {
          m.group.removeFromParent();
          this.itemModels.delete(id);
        }
      }

      // Bomb on the ground / planted.
      const b = g.bomb;
      const showBomb = b.state === 'dropped' || b.state === 'planted' || b.state === 'defused';
      this.bombModel.group.visible = showBomb;
      if (showBomb) {
        this.bombModel.group.position.set(b.pos.x, b.pos.y + 0.025, b.pos.z);
        this.bombModel.group.rotation.y = 0.6;
      }
      this.ledFlash -= dt;
      if (this.bombModel.led) {
        const m = this.bombModel.led.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = b.state === 'planted' && this.ledFlash > 0 ? 6 : b.state === 'planted' ? 0.6 : 0.15;
      }

      // First-person view model.
      if (subject) {
        const now = g.time;
        const def = subject.weapon.def;
        this.vm.update(
          {
            visible: vmVisible,
            team: subject.team,
            weaponId: def.id,
            speed: subject.speed,
            onGround: subject.onGround,
            crouch: subject.crouchAmt,
            drawT: subject.drawEnd > subject.drawStart ? (now - subject.drawStart) / (subject.drawEnd - subject.drawStart) : 1,
            reloadT: subject.reloadEnd > 0 ? (now - subject.reloadStart) / Math.max(0.01, subject.reloadEnd - subject.reloadStart) : -1,
            meleeAge: now - subject.lastMeleeTime,
            meleeStab: subject.lastMeleeStab,
            planting: subject.planting,
            defusing: subject.defusing,
            lookDX: subject === g.controlled ? inp.lookDX : 0,
            lookDY: subject === g.controlled ? inp.lookDY : 0,
          },
          dt,
        );
      } else {
        this.vm.update(
          {
            visible: false,
            team: 'CT',
            weaponId: 'knife',
            speed: 0,
            onGround: true,
            crouch: 0,
            drawT: 1,
            reloadT: -1,
            meleeAge: 9,
            meleeStab: false,
            planting: false,
            defusing: false,
            lookDX: 0,
            lookDY: 0,
          },
          dt,
        );
      }
    }

    // Camera shake (explosions).
    if (this.shake > 0.001) {
      cam.position.x += (Math.random() - 0.5) * this.shake * 0.25;
      cam.position.y += (Math.random() - 0.5) * this.shake * 0.25;
      cam.rotation.z += (Math.random() - 0.5) * this.shake * 0.03;
      this.shake *= Math.exp(-dt * 2.5);
    }

    // Zoom (AWP scope) — snap in quickly, ease out.
    const prevFov = this.fov;
    this.fov = targetFov < this.fov ? damp(this.fov, targetFov, 30, dt) : damp(this.fov, targetFov, 18, dt);
    if (Math.abs(this.fov - targetFov) < 0.05) this.fov = targetFov;
    if (prevFov !== this.fov) {
      cam.fov = this.fov;
      cam.updateProjectionMatrix();
    }

    const r = this.renderer;
    r.clear();
    r.render(this.scene, cam);
    if (vmVisible) {
      r.clearDepth();
      r.render(this.vm.scene, this.vm.camera);
    }
  }

  /** Projects a world point to normalised screen coords (for HUD overlays), or null if behind. */
  project(x: number, y: number, z: number): { x: number; y: number } | null {
    _v.set(x, y, z).project(this.camera);
    if (_v.z > 1) return null;
    return { x: (_v.x + 1) / 2, y: (1 - _v.y) / 2 };
  }

  dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.detach();
    this.mapView.dispose();
    this.effects.dispose();
    this.vm.dispose();
    disposeCharacterCaches();
    disposeWeaponCaches();
    this.sun.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}

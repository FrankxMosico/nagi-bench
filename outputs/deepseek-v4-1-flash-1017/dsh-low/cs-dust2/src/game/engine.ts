import * as THREE from 'three';
import type {
  Actor, BombSite, Brain, BuyOption, HitZone, HudSnapshot, KillFeedEntry, Loadout,
  Team, WeaponDef, WeaponId, WeaponSlot, WeaponState,
} from './types';
import {
  BOMB_SITES, buildMap, getBombSiteAt, MAP_EXTENTS, type BuiltMap,
} from './map';
import {
  canUseWeapon, createLoadout, createWeapon, defaultPrimary, defaultSecondary,
  getActiveWeapon, getSlot, WEAPONS,
} from './weapons';
import { AudioSynth } from './audio';
import { HumanModel } from './humanModel';
import { addFirstPersonHands, buildWeaponModel, SHARED_WEAPON_MATERIALS } from './weaponModels';

const EYE = 1.64;
const GRAVITY = 19;
const JUMP_SPEED = 5.7;
const PLAYER_RADIUS = 0.34;
const PLAYER_HEIGHT = 1.82;
const BOT_RADIUS = 0.38;
const ROUND_LIVE_TIME = 100;
const FREEZE_TIME = 6;
const BOMB_TIME = 40;
const PLANT_TIME = 3.2;
const DEFUSE_TIME = 7.5;
const END_TIME = 5.5;

const HITBOXES: { zone: HitZone; x0: number; x1: number; y0: number; y1: number; z0: number; z1: number }[] = [
  { zone: 'head', x0: -0.17, x1: 0.17, y0: 1.64, y1: 2.02, z0: -0.18, z1: 0.18 },
  { zone: 'chest', x0: -0.31, x1: 0.31, y0: 1.15, y1: 1.64, z0: -0.22, z1: 0.22 },
  { zone: 'abdomen', x0: -0.27, x1: 0.27, y0: 0.87, y1: 1.15, z0: -0.18, z1: 0.18 },
  { zone: 'armL', x0: -0.52, x1: -0.27, y0: 0.88, y1: 1.53, z0: -0.36, z1: 0.12 },
  { zone: 'armR', x0: 0.27, x1: 0.52, y0: 0.88, y1: 1.53, z0: -0.36, z1: 0.12 },
  { zone: 'legL', x0: -0.29, x1: -0.01, y0: 0, y1: 0.9, z0: -0.18, z1: 0.17 },
  { zone: 'legR', x0: 0.01, x1: 0.29, y0: 0, y1: 0.9, z0: -0.18, z1: 0.17 },
];

const ZONE_MULTIPLIER: Record<HitZone, number> = {
  head: 2, chest: 1, abdomen: 1.22, armL: 0.68, armR: 0.68, legL: 0.64, legR: 0.64,
};

const BOT_NAMES: Record<Team, string[]> = {
  CT: ['BROOK', 'VANTA', 'CIPHER', 'RIDGE', 'ECHO'],
  T: ['HAVOC', 'KILO', 'NOMAD', 'VEX', 'ROOK'],
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const angleDelta = (from: number, to: number) => {
  let d = (to - from + Math.PI) % (Math.PI * 2) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

function rayAabb(
  ox: number, oy: number, oz: number,
  dx: number, dy: number, dz: number,
  minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number,
  maxT: number,
): number | null {
  let tmin = 0;
  let tmax = maxT;
  for (const [o, d, lo, hi] of [
    [ox, dx, minX, maxX], [oy, dy, minY, maxY], [oz, dz, minZ, maxZ],
  ] as [number, number, number, number][]) {
    if (Math.abs(d) < 1e-9) {
      if (o < lo || o > hi) return null;
      continue;
    }
    let t1 = (lo - o) / d;
    let t2 = (hi - o) / d;
    if (t1 > t2) [t1, t2] = [t2, t1];
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return null;
  }
  return tmin;
}

interface ShotOutcome {
  endpoint: THREE.Vector3;
  hit: Actor | null;
  headshot: boolean;
  wall: boolean;
}

function makeBrain(site: 'A' | 'B', anchor: 'A' | 'B' | 'mid'): Brain {
  return {
    state: 'advance', site, anchor, path: [], pathIndex: 0, goalX: 0, goalZ: 0,
    nextRepath: 0, nextSense: 0, targetId: null, lastSeen: -100, lastTargetX: 0, lastTargetZ: 0, reactionEnd: 0,
    stuckTime: 0, lastX: 0, lastZ: 0, strafeDir: Math.random() > 0.5 ? 1 : -1,
    strafeEnd: 0, desiredYaw: 0, aimYaw: 0, aimPitch: 0, burstLeft: 2,
    nextThink: 0, holdSpotAngle: Math.random() * Math.PI * 2,
  };
}

export interface GameOptions {
  canvas: HTMLCanvasElement;
  team: Team;
  onHud: (hud: HudSnapshot) => void;
}

interface Tracer {
  line: THREE.Line;
  life: number;
}

interface FlashPuff {
  mesh: THREE.Mesh;
  life: number;
  maxLife: number;
  velocity: THREE.Vector3;
}

export class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly map: BuiltMap;
  private readonly audio = new AudioSynth();
  private readonly onHud: (hud: HudSnapshot) => void;

  readonly playerTeam: Team;
  private actors: Actor[] = [];
  private controlledActor: Actor | null = null;
  private spectateId: string | null = null;
  private lookYaw = 0;
  private lookPitch = 0;
  private locked = false;
  private buyOpen = false;
  private disposed = false;

  private phase: 'freeze' | 'live' | 'roundEnd' = 'freeze';
  private round = 0;
  private scoreCT = 0;
  private scoreT = 0;
  private roundTime = ROUND_LIVE_TIME;
  private freezeTimer = FREEZE_TIME;
  private endTimer = END_TIME;
  private pistolRound = true;
  private roundResult: { winner: Team; reason: string } | null = null;
  private roundBanner = '';
  private roundSubBanner = '';
  private bannerUntil = 0;

  private killfeed: KillFeedEntry[] = [];
  private killfeedCounter = 0;
  private now = 0;
  private elapsed = 0;
  private lastFrame = 0;
  private lastHud = 0;
  private raf = 0;

  private readonly keys = new Set<string>();
  private firing = false;
  private jumpQueued = false;
  private scoped = false;
  private viewKick = 0;
  private viewKickYaw = 0;
  private cameraShake = 0;
  private bobTime = 0;
  private footstepTimer = 0;
  private hitmarkerUntil = 0;
  private hitmarkerHeadshot = false;
  private killFlashUntil = 0;
  private damageFlash = 0;
  private shotSpread = 0;

  private readonly tracers: Tracer[] = [];
  private readonly flashes: (THREE.PointLight & { life: number })[] = [];
  private readonly puffs: FlashPuff[] = [];

  private vmRoot = new THREE.Group();
  private vmGroup: THREE.Group | null = null;
  private fpFlash: THREE.Mesh | null = null;
  private fpFlashTimer = 0;
  private vmRecoil = 0;
  private vmSwayX = 0;
  private vmSwayY = 0;
  private meleeSwing = 0;

  private bombState: 'carried' | 'dropped' | 'planted' | 'none' | 'exploded' = 'none';
  private bombCarrierId: string | null = null;
  private bombPos = new THREE.Vector3();
  private bombTimer = BOMB_TIME;
  private nextBombBeep = 0;
  private bombMesh: THREE.Group | null = null;
  private bombLight: THREE.MeshStandardMaterial | null = null;
  private plantingActorId: string | null = null;
  private defusingActorId: string | null = null;
  private plantProgress = 0;
  private defuseProgress = 0;
  private nextDefuseTick = 0;
  private bombRequest: string | null = null;
  private defuseRequest: string | null = null;
  private aiPlantRequest: string | null = null;
  private aiDefuseRequest: string | null = null;

  private buyOptions: BuyOption[] = [];
  private playerKills = 0;
  private playerDeaths = 0;
  private dust: THREE.Points | null = null;

  private readonly boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
  private readonly boundKeyUp = (e: KeyboardEvent) => this.onKeyUp(e);
  private readonly boundMouseMove = (e: MouseEvent) => this.onMouseMove(e);
  private readonly boundMouseDown = (e: MouseEvent) => this.onMouseDown(e);
  private readonly boundMouseUp = (e: MouseEvent) => this.onMouseUp(e);
  private readonly boundContext = (e: Event) => e.preventDefault();
  private readonly boundPointerLock = () => this.onPointerLockChange();
  private readonly boundResize = () => this.onResize();
  private readonly boundWheel = (e: WheelEvent) => this.onWheel(e);
  private readonly boundBlur = () => this.clearInput();

  constructor(opts: GameOptions) {
    this.canvas = opts.canvas;
    this.playerTeam = opts.team;
    this.onHud = opts.onHud;
    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 800);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);
    this.camera.add(this.vmRoot);
    const vmLight = new THREE.PointLight(0xffe2b4, 4.2, 2.8, 2);
    vmLight.position.set(0.28, 0.16, -0.32);
    this.camera.add(vmLight);

    this.scene.fog = new THREE.Fog(0xcbb58e, 85, 220);
    this.scene.background = new THREE.Color(0x9ab1bc);

    this.map = buildMap();
    this.scene.add(this.map.group);
    this.setupLighting();
    this.setupDust();
    this.createBombMesh();

    document.addEventListener('keydown', this.boundKeyDown);
    document.addEventListener('keyup', this.boundKeyUp);
    document.addEventListener('mousemove', this.boundMouseMove);
    document.addEventListener('mousedown', this.boundMouseDown);
    document.addEventListener('mouseup', this.boundMouseUp);
    document.addEventListener('contextmenu', this.boundContext);
    document.addEventListener('pointerlockchange', this.boundPointerLock);
    window.addEventListener('resize', this.boundResize);
    window.addEventListener('blur', this.boundBlur);
    this.canvas.addEventListener('wheel', this.boundWheel, { passive: false });

    this.locked = document.pointerLockElement === this.canvas;
    this.startRound();
    this.updateCamera(0.016);
    this.emitHud();
    this.lastFrame = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private setupLighting() {
    const hemi = new THREE.HemisphereLight(0xffe8c2, 0x5f513a, 0.85);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffd8a3, 2.25);
    sun.position.set(-55, 78, 38);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -78;
    sun.shadow.camera.right = 78;
    sun.shadow.camera.top = 78;
    sun.shadow.camera.bottom = -78;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 190;
    sun.shadow.bias = -0.00035;
    sun.shadow.normalBias = 0.03;
    this.scene.add(sun);
    this.scene.add(sun.target);
    sun.target.position.set(0, 0, -5);
    const fill = new THREE.DirectionalLight(0x8bb6d4, 0.38);
    fill.position.set(40, 30, -50);
    this.scene.add(fill);
  }

  private setupDust() {
    const count = 420;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -55 + Math.random() * 110;
      pos[i * 3 + 1] = 0.4 + Math.random() * 7;
      pos[i * 3 + 2] = -58 + Math.random() * 106;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffe0ae, size: 0.055, transparent: true, opacity: 0.34,
      depthWrite: false, sizeAttenuation: true,
    });
    this.dust = new THREE.Points(geo, mat);
    this.scene.add(this.dust);
  }

  private createBombMesh() {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.24, 0.34),
      new THREE.MeshStandardMaterial({ color: 0x2a2b26, roughness: 0.55, metalness: 0.35 }),
    );
    body.castShadow = true;
    group.add(body);
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.11, 0.015),
      new THREE.MeshStandardMaterial({ color: 0x17221d, emissive: 0x12452c, emissiveIntensity: 1.2, roughness: 0.3 }),
    );
    screen.position.set(-0.05, 0.05, -0.175);
    group.add(screen);
    const wire = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.02, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xa93221, emissive: 0x300500 }),
    );
    wire.position.set(0.16, 0.12, -0.06);
    group.add(wire);
    this.bombLight = new THREE.MeshStandardMaterial({ color: 0xff2211, emissive: 0xff1600, emissiveIntensity: 2 });
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.055), this.bombLight);
    light.position.set(-0.17, 0.16, -0.05);
    group.add(light);
    group.visible = false;
    this.bombMesh = group;
    this.scene.add(group);
  }

  requestLock() {
    this.audio.init();
    this.audio.resume();
    if (document.pointerLockElement !== this.canvas) {
      const p = this.canvas.requestPointerLock() as unknown as Promise<void> | undefined;
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
  }

  private onPointerLockChange() {
    this.locked = document.pointerLockElement === this.canvas;
    if (!this.locked) this.clearInput();
    this.emitHud();
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  private clearInput() {
    this.keys.clear();
    this.firing = false;
    this.jumpQueued = false;
  }

  private onWheel(e: WheelEvent) {
    if (this.buyOpen || !this.controlledActor?.alive) return;
    e.preventDefault();
    const available: WeaponSlot[] = ['primary', 'secondary', 'melee'];
    const currentIndex = available.indexOf(this.controlledActor.currentSlot);
    const dir = e.deltaY > 0 ? 1 : -1;
    for (let i = 1; i <= 3; i++) {
      const slot = available[(currentIndex + dir * i + 9) % 3];
      if (getSlot(this.controlledActor, slot)) {
        this.switchSlot(slot);
        break;
      }
    }
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.locked || this.buyOpen) return;
    const sens = 0.00165 * (this.scoped ? 0.34 : 1);
    this.lookYaw -= e.movementX * sens;
    this.lookPitch -= e.movementY * sens;
    this.lookPitch = clamp(this.lookPitch, -1.42, 1.42);
    this.vmSwayX = clamp(this.vmSwayX - e.movementX * 0.00008, -0.025, 0.025);
    this.vmSwayY = clamp(this.vmSwayY - e.movementY * 0.00006, -0.02, 0.02);
  }

  private onMouseDown(e: MouseEvent) {
    if (this.buyOpen) return;
    if (!this.locked) {
      this.requestLock();
      return;
    }
    this.audio.resume();
    const actor = this.controlledActor;
    if (!actor || !actor.alive) {
      if (e.button === 0) this.tryTakeover();
      return;
    }
    if (e.button === 2) {
      this.toggleScope();
      return;
    }
    if (e.button !== 0) return;
    if (this.phase !== 'live') return;
    const weapon = getActiveWeapon(actor);
    this.firing = true;
    if (!weapon.def.auto) this.tryPlayerFire();
  }

  private onMouseUp(e: MouseEvent) {
    if (e.button === 0) this.firing = false;
  }

  private onKeyDown(e: KeyboardEvent) {
    if (['Space', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    if (e.code === 'Escape') {
      if (this.buyOpen) this.closeBuy();
      return;
    }
    if (this.buyOpen) {
      if (e.code === 'KeyB') this.closeBuy();
      return;
    }
    if (e.code === 'KeyB' && this.phase === 'freeze' && this.controlledActor?.alive) {
      this.openBuy();
      return;
    }
    const actor = this.controlledActor;
    if (!actor || !actor.alive) {
      if (e.code === 'KeyE') this.cycleSpectate(1);
      if (e.code === 'KeyQ') this.cycleSpectate(-1);
      if (e.code === 'Space' || e.code === 'Enter') this.tryTakeover();
      return;
    }
    this.keys.add(e.code);
    if (e.code === 'Space') this.jumpQueued = true;
    if (e.code === 'KeyR') this.startReload(actor);
    if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3') {
      const slot: WeaponSlot = e.code === 'Digit1' ? 'primary' : e.code === 'Digit2' ? 'secondary' : 'melee';
      if (getSlot(actor, slot)) this.switchSlot(slot);
    }
    if (e.code === 'KeyF') {
      // C4 is auto-picked up; this key is kept free for future interaction design.
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keys.delete(e.code);
  }

  private openBuy() {
    if (this.phase !== 'freeze') return;
    this.buyOpen = true;
    this.clearInput();
    if (document.pointerLockElement) document.exitPointerLock();
    this.refreshBuyOptions();
    this.emitHud();
  }

  closeBuy() {
    if (!this.buyOpen) return;
    this.buyOpen = false;
    this.requestLock();
    this.emitHud();
  }

  private refreshBuyOptions() {
    const team = this.playerTeam;
    const rifle = team === 'T' ? WEAPONS.ak47 : WEAPONS.m4a4;
    const pistol = team === 'T' ? WEAPONS.glock : WEAPONS.usp;
    const player = this.controlledActor;
    const money = player?.money ?? 0;
    const opts: BuyOption[] = [];
    if (!this.pistolRound) {
      opts.push(
        { id: rifle.id, name: rifle.name, price: rifle.cost, category: '主武器', description: rifle.description, unavailable: money < rifle.cost },
        { id: 'awp', name: WEAPONS.awp.name, price: WEAPONS.awp.cost, category: '主武器', description: WEAPONS.awp.description, unavailable: money < WEAPONS.awp.cost },
      );
    }
    opts.push(
      { id: pistol.id, name: pistol.name, price: pistol.cost, category: '副武器', description: pistol.description, unavailable: money < pistol.cost },
      { id: 'deagle', name: WEAPONS.deagle.name, price: WEAPONS.deagle.cost, category: '副武器', description: WEAPONS.deagle.description, unavailable: money < WEAPONS.deagle.cost },
      { id: 'kevlar', name: '防弹衣', price: 650, category: '装备', description: '恢复 100 点护甲', unavailable: money < 650 },
      { id: 'kevlar_helmet', name: '防弹衣 + 头盔', price: 1000, category: '装备', description: '护甲与头盔，减免头部伤害', unavailable: money < 1000 },
    );
    this.buyOptions = opts;
  }

  buyWeapon(id: BuyOption['id']) {
    if (!this.buyOpen) return;
    const actor = this.controlledActor;
    if (!actor || !actor.alive) return;
    this.refreshBuyOptions();
    const option = this.buyOptions.find((o) => o.id === id);
    if (!option || option.unavailable || actor.money < option.price) return;
    if (typeof id === 'string' && id in WEAPONS) {
      const def = WEAPONS[id as WeaponId];
      if (!canUseWeapon(this.playerTeam, def)) return;
      const state = createWeapon(def.id);
      if (def.slot === 'primary') {
        actor.loadout.primary = state;
        actor.currentSlot = 'primary';
      } else {
        actor.loadout.secondary = state;
        actor.currentSlot = 'secondary';
      }
      actor.model.setWeapon(def.id);
      this.rebuildViewModel();
      this.audio.pickup();
    } else if (id === 'kevlar') {
      actor.armor = 100;
      actor.helmet = false;
      this.audio.pickup();
    } else if (id === 'kevlar_helmet') {
      actor.armor = 100;
      actor.helmet = true;
      this.audio.pickup();
    }
    actor.money -= option.price;
    this.scoped = false;
    this.refreshBuyOptions();
    this.emitHud();
  }

  private startRound() {
    for (const a of this.actors) {
      a.model.dispose();
    }
    this.actors = [];
    for (const tr of this.tracers) {
      this.scene.remove(tr.line);
      tr.line.geometry.dispose();
      (tr.line.material as THREE.Material).dispose();
    }
    this.tracers.length = 0;
    for (const f of this.flashes) this.scene.remove(f);
    this.flashes.length = 0;
    for (const p of this.puffs) this.scene.remove(p.mesh);
    this.puffs.length = 0;

    this.round += 1;
    this.pistolRound = this.round === 1;
    this.phase = 'freeze';
    this.freezeTimer = FREEZE_TIME;
    this.roundTime = ROUND_LIVE_TIME;
    this.endTimer = END_TIME;
    this.roundResult = null;
    this.killfeed = [];
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.plantingActorId = null;
    this.defusingActorId = null;
    this.bombRequest = null;
    this.defuseRequest = null;
    this.bombState = 'none';
    this.bombCarrierId = null;
    this.bombTimer = BOMB_TIME;
    this.nextBombBeep = 0;
    this.scoped = false;
    this.firing = false;
    this.playerKills = 0;
    this.playerDeaths = 0;
    this.roundBanner = `第 ${this.round} 回合 · ${this.pistolRound ? '手枪局' : '全装局'}`;
    this.roundSubBanner = this.pistolRound ? '默认手枪 · 轻甲 · 按 B 采购手枪' : '按 B 打开军械库';
    this.bannerUntil = this.now + (this.pistolRound ? 4.3 : 3.6);

    // Create 5 actors per side. Exactly one is the human when on the chosen side.
    for (const team of ['CT', 'T'] as Team[]) {
      const spawns = team === 'CT'
        ? [{ x: -6, z: -55, yaw: Math.PI }, { x: 7, z: -56, yaw: Math.PI - 0.15 }, { x: -15, z: -57, yaw: Math.PI + 0.1 }, { x: 18, z: -57, yaw: Math.PI - 0.12 }, { x: 0, z: -48, yaw: Math.PI }]
        : [{ x: -5, z: 36, yaw: 0 }, { x: 6, z: 35, yaw: 0.08 }, { x: -13, z: 40, yaw: 0.15 }, { x: 13, z: 41, yaw: -0.2 }, { x: -4, z: 47, yaw: 0.05 }];
      const isPlayerTeam = team === this.playerTeam;
      for (let i = 0; i < 5; i++) {
        const isPlayer = isPlayerTeam && i === 0;
        const spawn = spawns[i];
        let loadout: Loadout;
        let armor = 0;
        let helmet = false;
        if (this.pistolRound) {
          loadout = createLoadout({ secondary: defaultSecondary(team) });
          armor = 50;
          helmet = false;
        } else {
          const primary = this.chooseBotPrimary(team, i, isPlayer);
          loadout = createLoadout({ primary, secondary: defaultSecondary(team) });
          armor = 100;
          helmet = true;
        }
        const name = isPlayer ? '你' : BOT_NAMES[team][isPlayerTeam ? i - 1 : i];
        const actor = this.createActor(name, team, isPlayer, spawn.x, spawn.z, spawn.yaw, loadout, armor, helmet);
        if (isPlayer) {
          this.controlledActor = actor;
        }
      }
    }

    // Bomb assignment. On a T pistol round the human gets it so planting can be learned immediately.
    const ts = this.actors.filter((a) => a.team === 'T');
    let carrier: Actor | undefined;
    if (this.playerTeam === 'T' && this.round === 1) {
      carrier = this.actors.find((a) => a.isPlayer && a.team === 'T');
    }
    if (!carrier) carrier = ts[Math.floor(Math.random() * ts.length)];
    if (carrier) {
      carrier.hasC4 = true;
      this.bombCarrierId = carrier.id;
      this.bombState = 'carried';
    }
    this.bombMesh!.visible = false;

    // Team brain assignments.
    const tsiteA = Math.random() > 0.5 ? 'A' : 'B';
    let tIndex = 0;
    for (const bot of this.actors.filter((a) => a.team === 'T' && !a.isPlayer)) {
      bot.brain.site = tIndex % 2 === 0 ? tsiteA : (tsiteA === 'A' ? 'B' : 'A');
      bot.brain.anchor = bot.brain.site;
      tIndex++;
    }
    let ctIndex = 0;
    for (const bot of this.actors.filter((a) => a.team === 'CT' && !a.isPlayer)) {
      bot.brain.anchor = (['A', 'B', 'mid', 'A', 'B'] as const)[ctIndex++ % 5];
      bot.brain.site = bot.brain.anchor === 'B' ? 'B' : 'A';
    }
    const player = this.controlledActor;
    if (player) {
      this.lookYaw = player.yaw;
      this.lookPitch = 0;
      player.money = this.pistolRound ? 800 : 16000;
      this.hideViewActor();
      this.rebuildViewModel();
    }
    this.refreshBuyOptions();
    this.emitHud();
  }

  private chooseBotPrimary(team: Team, index: number, isPlayer: boolean): WeaponId {
    if (isPlayer) return defaultPrimary(team);
    const roll = Math.random();
    if (roll > 0.82 && index !== 4) return 'awp';
    return defaultPrimary(team);
  }

  private createActor(
    name: string, team: Team, isPlayer: boolean,
    x: number, z: number, yaw: number, loadout: Loadout, armor: number, helmet: boolean,
  ): Actor {
    const id = `${team}-${name}-${this.round}-${this.actors.length}`;
    const model = new HumanModel(team, name);
    model.root.position.set(x, 0, z);
    model.root.rotation.y = yaw;
    this.scene.add(model.root);
    model.setWeapon(loadout.primary?.def.id ?? loadout.secondary.def.id);
    const actor: Actor = {
      id, name, team, isPlayer, isBot: !isPlayer, alive: true, health: 100,
      armor, helmet, pos: new THREE.Vector3(x, 0, z), velocity: new THREE.Vector3(),
      yaw, pitch: 0, onGround: true, radius: isPlayer ? PLAYER_RADIUS : BOT_RADIUS,
      height: PLAYER_HEIGHT, eyeHeight: EYE, speed: 5.35,
      loadout, currentSlot: loadout.primary ? 'primary' : 'secondary',
      nextFireTime: 0, reloadEnd: 0, reloading: false, bloom: 0,
      hasC4: false, kills: 0, deaths: 0, headshotKills: 0, damageFlash: 0,
      lastDamageTime: -100, lastFootstep: 0, model,
      brain: makeBrain(Math.random() > 0.5 ? 'A' : 'B', 'A'), money: 0, totalDamage: 0,
    };
    actor.brain.lastX = x;
    actor.brain.lastZ = z;
    model.root.userData.actorId = id;
    this.actors.push(actor);
    return actor;
  }

  private hideViewActor() {
    for (const a of this.actors) {
      a.model.setVisible(true);
    }
    const viewActor = this.controlledActor ?? this.actors.find((a) => a.id === this.spectateId);
    if (viewActor) viewActor.model.setVisible(false);
  }

  private frame = (t: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(0.05, Math.max(0.001, (t - this.lastFrame) / 1000));
    this.lastFrame = t;
    const paused = !this.locked || this.buyOpen;
    if (!paused) {
      this.update(dt);
    }
    this.renderer.render(this.scene, this.camera);
    if (t - this.lastHud > 80) {
      this.lastHud = t;
      this.emitHud();
    }
  };

  private update(dt: number) {
    this.now += dt;
    this.elapsed += dt;
    this.updateTimers(dt);
    if (this.phase === 'freeze') {
      this.freezeTimer -= dt;
      if (this.freezeTimer <= 0) {
        this.freezeTimer = 0;
        this.phase = 'live';
        this.roundBanner = '行动开始';
        this.roundSubBanner = '';
        this.bannerUntil = this.now + 2.0;
        this.audio.roundStart();
        this.emitHud();
      }
    } else if (this.phase === 'live') {
      if (this.bombState !== 'planted') {
        this.roundTime -= dt;
        if (this.roundTime <= 0) {
          this.roundTime = 0;
          this.endRound('CT', '时间耗尽，CT 守住了炸弹点');
        }
      }
      this.updatePlayer(dt);
      this.updateBots(dt);
      this.updateInteractions(dt);
      this.updateBomb(dt);
      this.checkElimination();
    } else if (this.phase === 'roundEnd') {
      this.endTimer -= dt;
      if (this.endTimer <= 0) {
        this.startRound();
        return;
      }
    }

    this.updateDoors(dt);
    this.updateModels(dt);
    this.updateEffects(dt);
    this.updateCamera(dt);
    this.updateViewModel(dt);
    this.emitHudIfNeeded();
  }

  private updateTimers(dt: number) {
    this.damageFlash = Math.max(0, this.damageFlash - dt * 2.2);
    this.viewKick = Math.max(0, this.viewKick - dt * 0.75);
    this.viewKickYaw *= Math.exp(-dt * 9);
    this.cameraShake = Math.max(0, this.cameraShake - dt * 0.7);
    this.vmRecoil = Math.max(0, this.vmRecoil - dt * 6);
    this.vmSwayX *= Math.exp(-dt * 5);
    this.vmSwayY *= Math.exp(-dt * 5);
    this.fpFlashTimer = Math.max(0, this.fpFlashTimer - dt);
    this.meleeSwing = Math.max(0, this.meleeSwing - dt * 5);
    if (this.fpFlash) this.fpFlash.visible = this.fpFlashTimer > 0;
    for (const actor of this.actors) {
      const weapon = getActiveWeapon(actor);
      if (weapon.def.slot !== 'melee') {
        weapon.reloadRemaining = Math.max(0, weapon.reloadRemaining);
        if (weapon.reloading) {
          weapon.reloadRemaining -= dt;
          if (weapon.reloadRemaining <= 0) this.finishReload(actor, weapon);
        }
      }
      actor.reloading = weapon.reloading;
      actor.bloom = Math.max(0, actor.bloom - dt * (0.018 + weapon.def.bloom * 1.6));
      actor.damageFlash = Math.max(0, actor.damageFlash - dt * 3);
    }
  }

  private startReload(actor: Actor) {
    if (!actor.alive) return;
    const ws = getActiveWeapon(actor);
    if (ws.def.slot === 'melee' || ws.reloading || ws.mag >= ws.def.magSize || ws.reserve <= 0) return;
    ws.reloading = true;
    ws.reloadRemaining = ws.def.reloadTime;
    actor.reloading = true;
    this.audio.reload(ws.def.id);
    if (actor === this.controlledActor) {
      this.scoped = false;
      this.emitHud();
    }
  }

  private finishReload(actor: Actor, ws: WeaponState) {
    const need = ws.def.magSize - ws.mag;
    const take = Math.min(need, ws.reserve);
    ws.mag += take;
    ws.reserve -= take;
    ws.reloading = false;
    ws.reloadRemaining = 0;
    actor.reloading = false;
    if (actor === this.controlledActor) this.emitHud();
  }

  private switchSlot(slot: WeaponSlot) {
    const actor = this.controlledActor;
    if (!actor || !actor.alive) return;
    if (actor.currentSlot === slot) return;
    const target = getSlot(actor, slot);
    if (!target) return;
    const old = getActiveWeapon(actor);
    old.reloading = false;
    old.reloadRemaining = 0;
    actor.reloading = false;
    actor.currentSlot = slot;
    actor.nextFireTime = this.now + target.def.drawTime;
    actor.model.setWeapon(target.def.id);
    this.scoped = false;
    this.rebuildViewModel();
    this.audio.switchWeapon();
    this.emitHud();
  }

  private toggleScope() {
    const actor = this.controlledActor;
    if (!actor?.alive) return;
    const def = getActiveWeapon(actor).def;
    if (def.id !== 'awp') return;
    this.scoped = !this.scoped;
    this.audio.scope();
    if (this.fpFlash) this.fpFlash.visible = false;
    this.emitHud();
  }

  private updatePlayer(dt: number) {
    const actor = this.controlledActor;
    if (!actor || !actor.alive) return;
    actor.yaw = this.lookYaw;
    actor.pitch = this.lookPitch;
    if (this.phase !== 'live') {
      actor.velocity.x = 0;
      actor.velocity.z = 0;
      this.jumpQueued = false;
      return;
    }
    const forwardInput = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const rightInput = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    const fx = -Math.sin(this.lookYaw);
    const fz = -Math.cos(this.lookYaw);
    const rx = Math.cos(this.lookYaw);
    const rz = -Math.sin(this.lookYaw);
    let wx = fx * forwardInput + rx * rightInput;
    let wz = fz * forwardInput + rz * rightInput;
    const len = Math.hypot(wx, wz);
    if (len > 0) { wx /= len; wz /= len; }
    const weapon = getActiveWeapon(actor);
    let moveSpeed = 5.35;
    if (this.scoped) moveSpeed *= 0.34;
    if (weapon.def.slot === 'melee') moveSpeed *= 1.08;
    const jump = this.jumpQueued && actor.onGround;
    this.jumpQueued = false;
    this.simulateMovement(actor, dt, wx, wz, moveSpeed, jump);
    actor.yaw = this.lookYaw;
    actor.pitch = this.lookPitch;

    const horizontalSpeed = Math.hypot(actor.velocity.x, actor.velocity.z);
    if (actor.onGround && horizontalSpeed > 1.1) {
      this.footstepTimer -= dt;
      if (this.footstepTimer <= 0) {
        this.footstepTimer = 0.38;
        this.audio.footstep(0.55 + Math.min(0.4, horizontalSpeed / 12), actor.team);
      }
    } else {
      this.footstepTimer = Math.max(0, this.footstepTimer - dt);
    }
    if (this.firing && weapon.def.auto && this.now >= actor.nextFireTime && this.phase === 'live') {
      this.tryPlayerFire();
    }
  }

  private simulateMovement(actor: Actor, dt: number, wishX: number, wishZ: number, speed: number, jump: boolean) {
    const accel = actor.onGround ? 16 : 3.8;
    const targetX = wishX * speed;
    const targetZ = wishZ * speed;
    const blend = clamp(accel * dt, 0, 1);
    actor.velocity.x = lerp(actor.velocity.x, targetX, blend);
    actor.velocity.z = lerp(actor.velocity.z, targetZ, blend);
    if (wishX === 0 && wishZ === 0 && actor.onGround) {
      const friction = clamp(10 * dt, 0, 1);
      actor.velocity.x = lerp(actor.velocity.x, 0, friction);
      actor.velocity.z = lerp(actor.velocity.z, 0, friction);
    }
    if (jump && actor.onGround) {
      actor.velocity.y = JUMP_SPEED;
      actor.onGround = false;
    }

    // Horizontal collision resolution, one axis at a time so the player slides along walls.
    const dx = actor.velocity.x * dt;
    const dz = actor.velocity.z * dt;
    if (dx !== 0) {
      const nx = actor.pos.x + dx;
      if (!this.collidesAt(actor, nx, actor.pos.z)) actor.pos.x = nx;
      else actor.velocity.x = 0;
    }
    if (dz !== 0) {
      const nz = actor.pos.z + dz;
      if (!this.collidesAt(actor, actor.pos.x, nz)) actor.pos.z = nz;
      else actor.velocity.z = 0;
    }

    // Support height and gravity.
    let support = 0;
    for (const c of this.map.colliders) {
      if (c.maxY > actor.pos.y + 0.12) continue;
      if (!this.circleOverlaps(actor.pos.x, actor.pos.z, actor.radius, c)) continue;
      if (c.maxY > support) support = c.maxY;
    }
    actor.velocity.y -= GRAVITY * dt;
    let nextY = actor.pos.y + actor.velocity.y * dt;
    if (actor.velocity.y <= 0 && nextY <= support) {
      nextY = support;
      actor.velocity.y = 0;
      actor.onGround = true;
    } else {
      actor.onGround = false;
    }
    actor.pos.y = Math.max(0, nextY);
    if (actor.pos.x < -56 || actor.pos.x > 56 || actor.pos.z < -60 || actor.pos.z > 50) {
      actor.pos.x = clamp(actor.pos.x, -56, 56);
      actor.pos.z = clamp(actor.pos.z, -60, 50);
    }
  }

  private collidesAt(actor: Actor, x: number, z: number): boolean {
    const bottom = actor.pos.y + 0.06;
    const top = actor.pos.y + actor.height;
    for (const c of this.map.colliders) {
      if (top <= c.minY || bottom >= c.maxY) continue;
      if (this.circleOverlaps(x, z, actor.radius, c)) return true;
    }
    return false;
  }

  private circleOverlaps(x: number, z: number, radius: number, c: { minX: number; maxX: number; minZ: number; maxZ: number }): boolean {
    const nx = clamp(x, c.minX, c.maxX);
    const nz = clamp(z, c.minZ, c.maxZ);
    const dx = x - nx;
    const dz = z - nz;
    return dx * dx + dz * dz < radius * radius;
  }

  private tryPlayerFire() {
    const actor = this.controlledActor;
    if (!actor?.alive || this.phase !== 'live' || this.buyOpen) return;
    const ws = getActiveWeapon(actor);
    if (this.now < actor.nextFireTime) return;
    if (ws.reloading) return;
    if (ws.def.slot !== 'melee' && ws.mag <= 0) {
      this.audio.empty();
      actor.nextFireTime = this.now + 0.22;
      if (ws.reserve > 0) this.startReload(actor);
      return;
    }
    const def = ws.def;
    const interval = def.slot === 'melee' ? 0.42 : 60 / def.fireRate;
    actor.nextFireTime = this.now + interval;
    if (def.slot !== 'melee') ws.mag -= 1;
    const speed = Math.hypot(actor.velocity.x, actor.velocity.z);
    if (def.id === 'awp' && this.scoped) this.scoped = true;
    let spread = this.scoped && def.id === 'awp' ? (def.scopedSpread ?? 0) : def.spread + actor.bloom + (speed > 1.2 ? 0.018 + speed * 0.003 : 0) + (actor.onGround ? 0 : 0.022);
    if (def.slot === 'melee') spread = 0;
    this.shotSpread = spread;
    if (def.slot !== 'melee') {
      const kickScale = this.scoped && def.id === 'awp' ? 0.52 : 1;
      this.lookPitch = clamp(this.lookPitch + def.recoilPitch * kickScale, -1.42, 1.42);
      this.lookYaw += (Math.random() - 0.5) * 2 * def.recoilYaw;
      this.viewKick += def.recoilPitch * 0.55;
      this.viewKickYaw += (Math.random() - 0.5) * def.recoilYaw * 0.7;
      actor.bloom = Math.min(0.075, actor.bloom + def.bloom);
      this.cameraShake += def.recoilPitch * (def.id === 'awp' ? 2.8 : 0.45);
      this.vmRecoil = 1;
      this.fpFlashTimer = 0.045;
    } else {
      this.meleeSwing = 1;
      this.audio.shoot('knife');
    }
    const origin = new THREE.Vector3(actor.pos.x, actor.pos.y + actor.eyeHeight, actor.pos.z);
    const dir = this.directionFromAngles(this.lookYaw, this.lookPitch);
    this.addSpread(dir, spread);
    this.resolveShot(actor, origin, dir, def, false);
    if (ws.mag === 0 && ws.reserve > 0) {
      // Leave the click empty on the next trigger; the HUD and bots communicate reloading.
    }
    this.emitHud();
  }

  private directionFromAngles(yaw: number, pitch: number): THREE.Vector3 {
    const cp = Math.cos(pitch);
    return new THREE.Vector3(-Math.sin(yaw) * cp, Math.sin(pitch), -Math.cos(yaw) * cp).normalize();
  }

  private addSpread(dir: THREE.Vector3, spread: number) {
    if (spread <= 0) return;
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(dir, up);
    if (right.lengthSq() < 0.0001) right.set(1, 0, 0);
    right.normalize();
    const up2 = new THREE.Vector3().crossVectors(right, dir).normalize();
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * spread;
    dir.addScaledVector(right, Math.cos(angle) * r);
    dir.addScaledVector(up2, Math.sin(angle) * r);
    dir.normalize();
  }

  private resolveShot(shooter: Actor, origin: THREE.Vector3, dir: THREE.Vector3, def: WeaponDef, isAI: boolean): ShotOutcome {
    const maxDist = def.range;
    let wallDist = maxDist;
    for (const c of this.map.colliders) {
      const t = rayAabb(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, c.minX, c.minY, c.minZ, c.maxX, c.maxY, c.maxZ, maxDist);
      if (t !== null && t > 0.03 && t < wallDist) wallDist = t;
    }
    let bestActor: Actor | null = null;
    let bestDist = wallDist;
    let bestZone: HitZone = 'chest';
    for (const target of this.actors) {
      if (!target.alive || target === shooter || target.team === shooter.team) continue;
      const hit = this.rayActor(origin, dir, target, bestDist);
      if (hit && hit.t < bestDist) {
        bestDist = hit.t;
        bestActor = target;
        bestZone = hit.zone;
      }
    }
    const endpoint = origin.clone().addScaledVector(dir, bestDist);
    const headshot = bestZone === 'head';
    if (bestActor) {
      this.damageActor(bestActor, shooter, def, bestZone, bestDist);
      if (shooter === this.controlledActor) {
        this.hitmarkerUntil = this.now + 0.16;
        this.hitmarkerHeadshot = headshot;
        this.audio.hit(headshot);
      }
      if (def.slot !== 'melee') this.spawnBlood(endpoint, headshot);
    } else if (def.slot !== 'melee') {
      const wallHit = wallDist < maxDist - 0.1;
      if (wallHit) this.spawnImpact(endpoint);
    }
    if (def.slot !== 'melee') {
      this.spawnTracer(origin, endpoint);
      this.spawnMuzzleFlash(origin, dir, shooter);
      if (shooter === this.controlledActor) {
        this.audio.shoot(def.id);
      }
    }
    return { endpoint, hit: bestActor, headshot, wall: !bestActor };
  }

  private rayActor(origin: THREE.Vector3, dir: THREE.Vector3, target: Actor, maxT: number): { t: number; zone: HitZone } | null {
    const ox = origin.x - target.pos.x;
    const oy = origin.y - target.pos.y;
    const oz = origin.z - target.pos.z;
    const c = Math.cos(target.yaw);
    const s = Math.sin(target.yaw);
    const lox = ox * c - oz * s;
    const loz = ox * s + oz * c;
    const ldx = dir.x * c - dir.z * s;
    const ldz = dir.x * s + dir.z * c;
    let best: { t: number; zone: HitZone } | null = null;
    for (const hb of HITBOXES) {
      const t = rayAabb(lox, oy, loz, ldx, dir.y, ldz, hb.x0, hb.y0, hb.z0, hb.x1, hb.y1, hb.z1, maxT);
      if (t !== null && t > 0.03 && (!best || t < best.t)) best = { t, zone: hb.zone };
    }
    return best;
  }

  private damageActor(victim: Actor, shooter: Actor, def: WeaponDef, zone: HitZone, hitDist: number) {
    if (!victim.alive) return;
    let damage = def.damage * ZONE_MULTIPLIER[zone];
    if (hitDist > def.falloffStart) {
      const extra = (hitDist - def.falloffStart) / 60;
      damage *= Math.pow(def.falloffFactor, extra);
    }
    const armorCovers = victim.armor > 0 && (zone !== 'head' || victim.helmet);
    if (armorCovers) {
      const reduction = 0.52 + 0.48 * def.armorPenetration;
      damage *= reduction;
      victim.armor = Math.max(0, victim.armor - damage * 0.42);
    }
    if (zone === 'head') {
      damage *= 1;
    }
    damage = Math.max(1, damage);
    victim.health -= damage;
    victim.totalDamage += damage;
    victim.lastDamageTime = this.now;
    victim.damageFlash = 0.3;
    victim.model.flash();
    if (victim === this.controlledActor) {
      this.damageFlash = Math.max(this.damageFlash, 0.8);
      this.cameraShake = Math.min(0.16, this.cameraShake + 0.045);
      this.audio.damage();
    }
    if (victim.isBot && victim.alive && shooter.team !== victim.team) {
      // Taking damage instantly alerts a bot, even if the shooter approached from outside its view cone.
      victim.brain.targetId = shooter.id;
      victim.brain.lastSeen = this.now;
      victim.brain.lastTargetX = shooter.pos.x;
      victim.brain.lastTargetZ = shooter.pos.z;
      victim.brain.reactionEnd = Math.min(victim.brain.reactionEnd, this.now + 0.18);
      victim.brain.nextSense = 0;
    }
    if (victim.health <= 0) {
      victim.health = 0;
      this.killActor(victim, shooter, def.name, zone === 'head');
    }
  }

  private killActor(victim: Actor, killer: Actor, weaponName: string, headshot: boolean) {
    if (!victim.alive) return;
    victim.alive = false;
    victim.health = 0;
    victim.deaths += 1;
    victim.velocity.set(0, 0, 0);
    killer.kills += 1;
    if (headshot) killer.headshotKills += 1;
    if (victim.isPlayer) this.playerDeaths += 1;
    if (killer.isPlayer) this.playerKills += 1;
    this.killfeed.push({
      id: ++this.killfeedCounter,
      killer: killer.name,
      killerTeam: killer.team,
      victim: victim.name,
      victimTeam: victim.team,
      weapon: weaponName,
      headshot,
      createdAt: this.now,
    });
    if (this.killfeed.length > 6) this.killfeed.shift();
    if (victim === this.controlledActor) {
      this.hitmarkerUntil = 0;
      this.controlledActor = null;
      this.scoped = false;
      this.firing = false;
      this.spectateId = this.pickSpectate(victim);
      this.lookYaw = victim.yaw;
      this.lookPitch = 0;
      this.hideViewActor();
      this.rebuildViewModel();
      this.audio.damage();
    } else if (this.spectateId === victim.id) {
      this.spectateId = this.pickSpectate(victim);
    }
    if (killer === this.controlledActor) {
      this.audio.kill();
      this.killFlashUntil = this.now + 1.1;
    }
    if (victim.hasC4 && this.bombState !== 'planted') {
      this.dropBomb(victim);
    }
    this.emitHud();
    this.checkElimination();
  }

  private pickSpectate(dead: Actor): string | null {
    const mates = this.actors.filter((a) => a.alive && a.team === this.playerTeam && a.id !== dead.id);
    if (mates.length === 0) return null;
    mates.sort((a, b) => {
      const da = a.pos.distanceToSquared(dead.pos);
      const db = b.pos.distanceToSquared(dead.pos);
      return da - db;
    });
    return mates[0].id;
  }

  private tryTakeover() {
    if (this.controlledActor) return;
    const target = this.actors.find((a) => a.id === this.spectateId && a.alive && a.team === this.playerTeam);
    if (!target) return;
    const prior = this.actors.find((a) => a.isPlayer);
    if (prior) prior.isPlayer = false;
    target.isPlayer = true;
    target.isBot = false;
    target.brain.targetId = null;
    this.controlledActor = target;
    this.spectateId = null;
    this.lookYaw = target.yaw;
    this.lookPitch = target.pitch;
    this.hideViewActor();
    this.rebuildViewModel();
    this.audio.switchWeapon();
    this.emitHud();
  }

  private cycleSpectate(dir: number) {
    if (this.controlledActor) return;
    const mates = this.actors.filter((a) => a.alive && a.team === this.playerTeam);
    if (mates.length === 0) return;
    const idx = mates.findIndex((a) => a.id === this.spectateId);
    const next = mates[(idx + dir + mates.length) % mates.length];
    this.spectateId = next.id;
    this.lookYaw = next.yaw;
    this.lookPitch = 0;
    this.hideViewActor();
    this.emitHud();
  }

  private spawnTracer(from: THREE.Vector3, to: THREE.Vector3) {
    const geo = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()]);
    const mat = new THREE.LineBasicMaterial({ color: 0xffd58a, transparent: true, opacity: 0.7 });
    const line = new THREE.Line(geo, mat);
    this.scene.add(line);
    this.tracers.push({ line, life: 0.065 });
  }

  private spawnMuzzleFlash(origin: THREE.Vector3, dir: THREE.Vector3, shooter: Actor) {
    const distToPlayer = this.controlledActor ? shooter.pos.distanceTo(this.controlledActor.pos) : 40;
    if (distToPlayer > 34 && shooter !== this.controlledActor) return;
    const light = new THREE.PointLight(0xffbe73, 3.8, 9, 2);
    light.position.copy(origin).addScaledVector(dir, 0.45);
    light.position.y += 0.03;
    (light as THREE.PointLight & { life: number }).life = 0.055;
    this.scene.add(light);
    this.flashes.push(light as THREE.PointLight & { life: number });
  }

  private spawnImpact(point: THREE.Vector3) {
    const geo = new THREE.SphereGeometry(0.06, 5, 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffd49a, transparent: true, opacity: 0.85 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(point);
    this.scene.add(mesh);
    this.puffs.push({ mesh, life: 0.16, maxLife: 0.16, velocity: new THREE.Vector3((Math.random() - 0.5) * 0.6, Math.random() * 1.2, (Math.random() - 0.5) * 0.6) });
  }

  private spawnBlood(point: THREE.Vector3, headshot: boolean) {
    const count = headshot ? 9 : 5;
    for (let i = 0; i < count; i++) {
      const geo = new THREE.SphereGeometry(headshot ? 0.045 : 0.035, 4, 3);
      const mat = new THREE.MeshBasicMaterial({ color: 0x8f1d17, transparent: true, opacity: 0.8 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(point);
      this.scene.add(mesh);
      this.puffs.push({
        mesh, life: 0.35, maxLife: 0.35,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 1.8, Math.random() * 1.3, (Math.random() - 0.5) * 1.8),
      });
    }
  }

  private updateEffects(dt: number) {
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const tr = this.tracers[i];
      tr.life -= dt;
      (tr.line.material as THREE.LineBasicMaterial).opacity = Math.max(0, tr.life / 0.065) * 0.7;
      if (tr.life <= 0) {
        this.scene.remove(tr.line);
        tr.line.geometry.dispose();
        (tr.line.material as THREE.Material).dispose();
        this.tracers.splice(i, 1);
      }
    }
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.life -= dt;
      f.intensity = Math.max(0, f.life / 0.055) * 3.8;
      if (f.life <= 0) {
        this.scene.remove(f);
        this.flashes.splice(i, 1);
      }
    }
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const p = this.puffs[i];
      p.life -= dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.velocity.y -= 6 * dt;
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, p.life / p.maxLife) * 0.85;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        mat.dispose();
        this.puffs.splice(i, 1);
      }
    }
    if (this.dust) {
      this.dust.rotation.y += dt * 0.001;
    }
    if (this.bombLight) {
      const pulse = 0.2 + Math.abs(Math.sin(this.now * (this.bombState === 'planted' ? 8 : 3))) * 2.6;
      this.bombLight.emissiveIntensity = pulse;
      this.bombLight.color.setRGB(1, 0.08, 0.03);
    }
  }

  private updateDoors(dt: number) {
    const positions = this.actors.filter((a) => a.alive).map((a) => ({ x: a.pos.x, z: a.pos.z }));
    if (this.map.updateDoors(dt, positions)) this.audio.door();
  }

  private updateCamera(dt: number) {
    const actor = this.controlledActor;
    let posX: number;
    let posY: number;
    let posZ: number;
    let viewPitch = this.lookPitch + this.viewKick;
    let viewYaw = this.lookYaw + this.viewKickYaw;
    if (actor?.alive) {
      const speed = Math.hypot(actor.velocity.x, actor.velocity.z);
      this.bobTime += dt * (3 + speed * 1.7);
      const bob = actor.onGround ? Math.abs(Math.sin(this.bobTime)) * 0.025 * Math.min(1, speed / 4) : 0;
      posX = actor.pos.x;
      posY = actor.pos.y + actor.eyeHeight + bob;
      posZ = actor.pos.z;
      actor.pitch = this.lookPitch;
    } else {
      const spec = this.actors.find((a) => a.id === this.spectateId && a.alive);
      if (spec) {
        posX = spec.pos.x;
        posY = spec.pos.y + spec.eyeHeight;
        posZ = spec.pos.z;
        spec.yaw = this.lookYaw;
      } else {
        const dead = this.actors.find((a) => a.isPlayer) ?? this.actors[0];
        if (dead) {
          posX = dead.pos.x;
          posY = dead.pos.y + 3.6;
          posZ = dead.pos.z + 1.2;
          viewPitch = -0.3;
          viewYaw = dead.yaw;
        } else {
          posX = 0; posY = 8; posZ = 20;
          viewPitch = -0.15; viewYaw = 0;
        }
      }
    }
    const shake = this.cameraShake;
    if (shake > 0) {
      posX += (Math.random() - 0.5) * shake;
      posY += (Math.random() - 0.5) * shake;
      posZ += (Math.random() - 0.5) * shake;
      viewPitch += (Math.random() - 0.5) * shake * 0.36;
      viewYaw += (Math.random() - 0.5) * shake * 0.28;
    }
    this.camera.position.set(posX, posY, posZ);
    this.camera.rotation.set(viewPitch, viewYaw, 0, 'YXZ');
    const targetFov = actor?.alive && this.scoped ? (getActiveWeapon(actor).def.zoom ?? 28) : 75;
    if (Math.abs(this.camera.fov - targetFov) > 0.05) {
      this.camera.fov = lerp(this.camera.fov, targetFov, Math.min(1, dt * 16));
      this.camera.updateProjectionMatrix();
    }
  }

  private rebuildViewModel() {
    for (const child of [...this.vmRoot.children]) {
      this.vmRoot.remove(child);
      child.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mat = o.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) mat.forEach((m) => { if (!SHARED_WEAPON_MATERIALS.has(m)) m.dispose(); });
          else if (!SHARED_WEAPON_MATERIALS.has(mat)) mat.dispose();
        }
      });
    }
    this.vmGroup = null;
    this.fpFlash = null;
    const actor = this.controlledActor;
    if (!actor) return;
    const def = getActiveWeapon(actor).def;
    const built = buildWeaponModel(def.id);
    const group = new THREE.Group();
    group.add(built.group);
    addFirstPersonHands(built.group, this.playerTeam);
    let scale = 0.5;
    let px = 0.28;
    let py = -0.29;
    let pz = -0.66;
    if (def.slot === 'secondary') {
      scale = 0.54; px = 0.255; py = -0.28; pz = -0.62;
    } else if (def.slot === 'melee') {
      scale = 0.5; px = 0.25; py = -0.27; pz = -0.52;
    } else if (def.id === 'awp') {
      scale = 0.47; px = 0.29; py = -0.31; pz = -0.74;
    }
    group.scale.setScalar(scale);
    group.position.set(px, py, pz);
    group.rotation.set(0.015, 0.045, 0);
    this.vmGroup = group;
    this.vmRoot.add(group);
    const flashCanvas = document.createElement('canvas');
    flashCanvas.width = 128;
    flashCanvas.height = 128;
    const ctx = flashCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 3, 64, 64, 61);
    grad.addColorStop(0, 'rgba(255,255,230,1)');
    grad.addColorStop(0.15, 'rgba(255,224,135,0.95)');
    grad.addColorStop(0.45, 'rgba(255,151,55,0.5)');
    grad.addColorStop(1, 'rgba(255,120,20,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(flashCanvas);
    const flashMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const flash = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), flashMat);
    flash.position.set(built.muzzle.position.x, built.muzzle.position.y, built.muzzle.position.z + 0.02);
    flash.rotation.z = Math.random() * Math.PI;
    flash.visible = false;
    group.add(flash);
    this.fpFlash = flash;
  }

  private updateViewModel(dt: number) {
    const actor = this.controlledActor;
    const visible = !!actor?.alive && !this.scoped && !this.buyOpen;
    this.vmRoot.visible = visible;
    if (!visible || !this.vmGroup) return;
    const speed = Math.hypot(actor.velocity.x, actor.velocity.z);
    const baseY = getActiveWeapon(actor).def.slot === 'secondary' ? -0.28 : -0.29;
    const bobX = Math.sin(this.bobTime) * 0.006 * Math.min(1, speed / 3);
    const bobY = Math.abs(Math.cos(this.bobTime)) * 0.005 * Math.min(1, speed / 3);
    this.vmGroup.position.x = lerp(this.vmGroup.position.x, 0.255 + this.vmSwayX + bobX, Math.min(1, dt * 10));
    this.vmGroup.position.y = lerp(this.vmGroup.position.y, baseY + this.vmSwayY + bobY, Math.min(1, dt * 10));
    const baseZ = getActiveWeapon(actor).def.slot === 'secondary' ? -0.62 : getActiveWeapon(actor).def.id === 'awp' ? -0.74 : -0.66;
    this.vmGroup.position.z = lerp(this.vmGroup.position.z, baseZ + this.vmRecoil * 0.06, Math.min(1, dt * 16));
    this.vmGroup.rotation.x = lerp(this.vmGroup.rotation.x, 0.015 - this.vmRecoil * 0.15, Math.min(1, dt * 18));
    this.vmGroup.rotation.y = lerp(this.vmGroup.rotation.y, 0.045 + this.vmSwayX * 0.7, Math.min(1, dt * 12));
    this.vmGroup.rotation.z = this.meleeSwing > 0 ? -this.meleeSwing * 0.9 : 0;
    if (this.fpFlash) this.fpFlash.visible = this.fpFlashTimer > 0 && !this.scoped;
  }

  private updateModels(dt: number) {
    for (const actor of this.actors) {
      actor.model.root.position.x = actor.pos.x;
      actor.model.root.position.z = actor.pos.z;
      actor.model.root.position.y = actor.pos.y;
      actor.model.root.rotation.y = actor.yaw;
      const speed = Math.hypot(actor.velocity.x, actor.velocity.z);
      actor.model.update(dt, speed, actor.alive);
      if (actor.alive && actor !== this.controlledActor) {
        if (speed > 0.7 && actor.onGround) {
          actor.lastFootstep = actor.lastFootstep ?? 0;
          if (this.now - actor.lastFootstep > 0.46) {
            actor.lastFootstep = this.now;
            if (this.controlledActor) {
              const dist = actor.pos.distanceTo(this.controlledActor.pos);
              if (dist < 24) this.audio.footstep(Math.max(0.04, 0.42 - dist / 60), actor.team);
            }
          }
        }
      }
    }
  }

  private updateBomb(dt: number) {
    if (this.bombState === 'planted') {
      this.bombTimer -= dt;
      if (this.bombMesh) {
        this.bombMesh.visible = true;
        this.bombMesh.position.set(this.bombPos.x, 0.16, this.bombPos.z);
      }
      const beepInterval = clamp(this.bombTimer / BOMB_TIME, 0.105, 0.7);
      if (this.now >= this.nextBombBeep) {
        this.nextBombBeep = this.now + beepInterval;
        this.audio.beep(this.bombTimer < 10);
      }
      if (this.bombTimer <= 0) {
        this.bombTimer = 0;
        this.explodeBomb();
      }
    } else if (this.bombState === 'dropped') {
      if (this.bombMesh) {
        this.bombMesh.visible = true;
        this.bombMesh.position.set(this.bombPos.x, 0.16, this.bombPos.z);
        this.bombMesh.rotation.y = Math.sin(this.now * 1.2) * 0.2;
      }
      for (const actor of this.actors) {
        if (actor.alive && actor.team === 'T' && !actor.hasC4 && !this.bombCarrierId) {
          const d = Math.hypot(actor.pos.x - this.bombPos.x, actor.pos.z - this.bombPos.z);
          if (d < 1.65) {
            this.pickupBomb(actor);
            break;
          }
        }
      }
    } else if (this.bombState === 'carried') {
      const carrier = this.actors.find((a) => a.id === this.bombCarrierId && a.alive);
      if (carrier) {
        this.bombPos.set(carrier.pos.x, carrier.pos.y + 1.05, carrier.pos.z);
      }
      if (this.bombMesh) this.bombMesh.visible = false;
    }
  }

  private pickupBomb(actor: Actor) {
    if (this.bombState !== 'dropped') return;
    this.bombState = 'carried';
    this.bombCarrierId = actor.id;
    actor.hasC4 = true;
    if (this.bombMesh) this.bombMesh.visible = false;
    this.audio.pickup();
    if (actor === this.controlledActor) this.emitHud();
  }

  private dropBomb(victim: Actor) {
    if (!victim.hasC4) return;
    victim.hasC4 = false;
    this.bombCarrierId = null;
    this.bombState = 'dropped';
    const rx = (Math.random() - 0.5) * 0.9;
    const rz = (Math.random() - 0.5) * 0.9;
    this.bombPos.set(victim.pos.x + rx, 0.1, victim.pos.z + rz);
    if (this.bombMesh) {
      this.bombMesh.visible = true;
      this.bombMesh.position.copy(this.bombPos);
    }
  }

  private plantBomb(actor: Actor) {
    this.bombState = 'planted';
    this.bombCarrierId = null;
    this.hitmarkerUntil = 0;
    actor.hasC4 = false;
    this.bombPos.set(actor.pos.x, 0.1, actor.pos.z);
    this.bombTimer = BOMB_TIME;
    this.nextBombBeep = this.now + 0.3;
    this.plantProgress = 0;
    this.plantingActorId = null;
    if (this.bombMesh) {
      this.bombMesh.visible = true;
      this.bombMesh.position.copy(this.bombPos);
    }
    this.audio.plant();
    this.roundBanner = 'C4 已安放';
    this.roundSubBanner = this.playerTeam === 'CT' ? '立即前往炸弹点拆除' : '守住炸弹直到爆炸';
    this.bannerUntil = this.now + 3;
    this.emitHud();
  }

  private explodeBomb() {
    if (this.bombState === 'exploded' || this.phase !== 'live') return;
    this.bombState = 'exploded';
    this.audio.explosion();
    this.cameraShake = 0.32;
    const flash = new THREE.PointLight(0xff8a38, 35, 55, 2);
    flash.position.set(this.bombPos.x, 2, this.bombPos.z);
    this.scene.add(flash);
    window.setTimeout(() => this.scene.remove(flash), 700);
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(8, 20, 14),
      new THREE.MeshBasicMaterial({ color: 0xff5b1b, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    sphere.position.set(this.bombPos.x, 2.5, this.bombPos.z);
    this.scene.add(sphere);
    this.puffs.push({ mesh: sphere, life: 0.75, maxLife: 0.75, velocity: new THREE.Vector3(0, 0.3, 0) });
    this.puffs.push({
      mesh: new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffd18a, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false })),
      life: 0.35, maxLife: 0.35, velocity: new THREE.Vector3(0, 0.5, 0),
    });
    for (const a of this.actors) {
      if (a.alive) {
        const d = Math.hypot(a.pos.x - this.bombPos.x, a.pos.z - this.bombPos.z);
        if (d < 18) {
          a.alive = false;
          a.health = 0;
          a.deaths += 1;
          a.model.update(0.1, 0, false);
        }
      }
    }
    this.controlledActor = null;
    this.spectateId = null;
    this.endRound('T', 'C4 爆炸，T 获胜');
  }

  private updateInteractions(dt: number) {
    this.bombRequest = null;
    this.defuseRequest = null;
    const controlled = this.controlledActor;
    if (controlled?.alive) {
      const eHeld = this.keys.has('KeyE');
      if (controlled.team === 'T' && controlled.hasC4 && this.phase === 'live' && eHeld) {
        const site = this.getPlantSite(controlled.pos.x, controlled.pos.z);
        const speed = Math.hypot(controlled.velocity.x, controlled.velocity.z);
        if (site && speed < 0.5) this.bombRequest = controlled.id;
      }
      if (controlled.team === 'CT' && this.bombState === 'planted' && eHeld) {
        const d = Math.hypot(controlled.pos.x - this.bombPos.x, controlled.pos.z - this.bombPos.z);
        const speed = Math.hypot(controlled.velocity.x, controlled.velocity.z);
        if (d < 2.1 && speed < 0.65) this.defuseRequest = controlled.id;
      }
    }
    // Bots may request plant/defuse during their update. The last request frame wins.
    if (this.aiPlantRequest && this.actors.some((a) => a.id === this.aiPlantRequest && a.alive)) {
      if (!this.bombRequest) this.bombRequest = this.aiPlantRequest;
    }
    if (this.aiDefuseRequest && this.actors.some((a) => a.id === this.aiDefuseRequest && a.alive)) {
      if (!this.defuseRequest) this.defuseRequest = this.aiDefuseRequest;
    }

    if (this.bombState !== 'planted') {
      if (this.bombRequest) {
        const planter = this.actors.find((a) => a.id === this.bombRequest);
        if (planter?.alive && planter.hasC4) {
          const site = this.getPlantSite(planter.pos.x, planter.pos.z);
          const speed = Math.hypot(planter.velocity.x, planter.velocity.z);
          if (site && speed < 0.9) {
            if (this.plantingActorId !== planter.id) {
              this.plantingActorId = planter.id;
              this.plantProgress = 0;
            }
            this.plantProgress += dt;
            if (this.plantProgress >= PLANT_TIME) this.plantBomb(planter);
          } else {
            this.plantingActorId = null;
            this.plantProgress = 0;
          }
        }
      } else {
        this.plantingActorId = null;
        this.plantProgress = 0;
      }
    }

    if (this.bombState === 'planted') {
      if (this.defuseRequest) {
        const defuser = this.actors.find((a) => a.id === this.defuseRequest);
        if (defuser?.alive && defuser.team === 'CT') {
          const d = Math.hypot(defuser.pos.x - this.bombPos.x, defuser.pos.z - this.bombPos.z);
          const speed = Math.hypot(defuser.velocity.x, defuser.velocity.z);
          if (d < 2.1 && speed < 0.9) {
            if (this.defusingActorId !== defuser.id) {
              this.defusingActorId = defuser.id;
              this.defuseProgress = 0;
            }
            this.defuseProgress += dt;
            if (this.now >= this.nextDefuseTick) {
              this.nextDefuseTick = this.now + 0.38;
              this.audio.defuseTick(Math.min(1, this.defuseProgress / DEFUSE_TIME));
            }
            if (this.defuseProgress >= DEFUSE_TIME) {
              this.defuseProgress = DEFUSE_TIME;
              this.audio.defused();
              this.endRound('CT', 'C4 已被成功拆除');
            }
          } else {
            this.defusingActorId = null;
            this.defuseProgress = 0;
          }
        }
      } else {
        this.defusingActorId = null;
        this.defuseProgress = 0;
      }
    }
  }

  private updateBots(dt: number) {
    this.aiPlantRequest = null;
    this.aiDefuseRequest = null;
    for (const bot of this.actors) {
      if (!bot.alive || !bot.isBot || bot.isPlayer) continue;
      this.updateBot(bot, dt);
    }
  }

  private updateBot(bot: Actor, dt: number) {
    if (this.phase !== 'live') return;
    const brain = bot.brain;
    const now = this.now;

    // Objective priorities: a T carrier plants on site; a designated CT tries to defuse.
    if (bot.team === 'T' && bot.hasC4 && this.bombState !== 'planted') {
      const site = this.getPlantSite(bot.pos.x, bot.pos.z);
      if (site) {
        this.aiPlantRequest = bot.id;
        brain.state = 'plant';
        this.moveBot(bot, dt, 0, 0);
        bot.yaw += angleDelta(bot.yaw, -Math.PI * 0.5) * Math.min(1, dt * 2);
        return;
      }
    }
    if (bot.team === 'CT' && this.bombState === 'planted') {
      const designated = this.getDefuserId();
      const distToBomb = Math.hypot(bot.pos.x - this.bombPos.x, bot.pos.z - this.bombPos.z);
      if (designated === bot.id) {
        if (distToBomb < 2.1) {
          this.aiDefuseRequest = bot.id;
          brain.state = 'defuse';
          this.moveBot(bot, dt, 0, 0);
          bot.yaw += angleDelta(bot.yaw, Math.atan2(-(this.bombPos.x - bot.pos.x), -(this.bombPos.z - bot.pos.z))) * Math.min(1, dt * 2);
          return;
        }
        if (distToBomb > 3) {
          brain.state = 'defuse';
          this.navigateBot(bot, this.bombPos.x, this.bombPos.z, dt);
          return;
        }
      }
    }

    if (now >= brain.nextSense) {
      brain.nextSense = now + 0.13 + Math.random() * 0.12;
      this.senseEnemies(bot);
    }

    let target = this.actors.find((a) => a.id === brain.targetId && a.alive && a.team !== bot.team) ?? null;
    if (target) {
      const targetDist = Math.hypot(target.pos.x - bot.pos.x, target.pos.z - bot.pos.z);
      if (targetDist > this.engagementRange(bot) + 8) {
        brain.targetId = null;
        target = null;
      }
    }
    if (target) {
      if (this.isVisibleTo(bot, target, 150, true)) {
        brain.lastSeen = now;
        brain.lastTargetX = target.pos.x;
        brain.lastTargetZ = target.pos.z;
        this.botEngage(bot, target, dt);
        return;
      }
      if (now - brain.lastSeen > 2.5) {
        brain.targetId = null;
        target = null;
      } else {
        // Hold an angle toward the last known position, but do not shoot through walls.
        const dx = brain.lastTargetX - bot.pos.x;
        const dz = brain.lastTargetZ - bot.pos.z;
        const desired = Math.atan2(-dx, -dz);
        bot.yaw += angleDelta(bot.yaw, desired) * Math.min(1, dt * 3.5);
        this.moveBot(bot, dt, 0, 0);
        return;
      }
    }

    this.updateBotObjective(bot, dt);
  }

  private senseEnemies(bot: Actor) {
    const brain = bot.brain;
    let best: Actor | null = null;
    let bestDist = Infinity;
    const maxEngage = this.engagementRange(bot) + 5;
    for (const enemy of this.actors) {
      if (!enemy.alive || enemy.team === bot.team) continue;
      const d = Math.hypot(enemy.pos.x - bot.pos.x, enemy.pos.z - bot.pos.z);
      if (d > maxEngage) continue;
      const senseFov = d < 18 ? 360 : 150;
      if (!this.isVisibleTo(bot, enemy, senseFov, false)) continue;
      if (d < bestDist) {
        bestDist = d;
        best = enemy;
      }
    }
    if (best) {
      if (brain.targetId !== best.id) {
        brain.reactionEnd = this.now + 0.22 + Math.random() * 0.33;
      }
      brain.targetId = best.id;
      brain.lastSeen = this.now;
      brain.lastTargetX = best.pos.x;
      brain.lastTargetZ = best.pos.z;
    }
  }

  private isVisibleTo(viewer: Actor, target: Actor, fovDeg: number, assumeAware: boolean): boolean {
    const eyeX = viewer.pos.x;
    const eyeY = viewer.pos.y + viewer.eyeHeight - 0.1;
    const eyeZ = viewer.pos.z;
    const dx = target.pos.x - eyeX;
    const dz = target.pos.z - eyeZ;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.4) return true;
    if (!assumeAware) {
      const forwardX = -Math.sin(viewer.yaw);
      const forwardZ = -Math.cos(viewer.yaw);
      const dot = (dx * forwardX + dz * forwardZ) / dist;
      if (dot < Math.cos((fovDeg / 2) * Math.PI / 180)) return false;
    }
    const points = [1.3, 1.8, 0.9];
    for (const y of points) {
      const ty = target.pos.y + y;
      const dy = ty - eyeY;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const ndx = dx / len;
      const ndy = dy / len;
      const ndz = dz / len;
      let blocked = false;
      for (const c of this.map.colliders) {
        const t = rayAabb(eyeX, eyeY, eyeZ, ndx, ndy, ndz, c.minX, c.minY, c.minZ, c.maxX, c.maxY, c.maxZ, len);
        if (t !== null && t > 0.05 && t < len - 0.08) {
          blocked = true;
          break;
        }
      }
      if (!blocked) return true;
    }
    return false;
  }

  private botEngage(bot: Actor, target: Actor, dt: number) {
    const brain = bot.brain;
    brain.state = 'engage';
    const eye = new THREE.Vector3(bot.pos.x, bot.pos.y + bot.eyeHeight, bot.pos.z);
    const aimY = target.pos.y + (Math.random() < 0.16 ? 1.78 : 1.32);
    const aimPoint = new THREE.Vector3(target.pos.x, aimY, target.pos.z);
    const dx = aimPoint.x - eye.x;
    const dy = aimPoint.y - eye.y;
    const dz = aimPoint.z - eye.z;
    const dist = Math.hypot(dx, dz);
    const desiredYaw = Math.atan2(-dx, -dz);
    const desiredPitch = clamp(Math.asin(dy / Math.max(0.001, Math.hypot(dx, dy, dz))), -1.2, 1.2);
    const turn = dt * (4.6 + Math.random() * 1.4);
    bot.yaw += angleDelta(bot.yaw, desiredYaw) * Math.min(1, turn);
    bot.pitch = lerp(bot.pitch, desiredPitch, Math.min(1, dt * 7));
    this.moveBot(bot, dt, 0, 0);

    if (this.now < brain.reactionEnd) return;
    const weapon = getActiveWeapon(bot);
    if (weapon.reloading) return;
    if (weapon.def.slot !== 'melee' && weapon.mag <= 0) {
      this.startReload(bot);
      return;
    }
    if (this.now < bot.nextFireTime) return;
    const aimDiff = Math.abs(angleDelta(bot.yaw, desiredYaw));
    if (aimDiff > 0.16) return;
    const dir = aimPoint.clone().sub(eye).normalize();
    const baseError = weapon.def.id === 'awp'
      ? 0.006
      : weapon.def.slot === 'secondary' ? 0.022 : 0.016;
    const error = baseError + Math.min(0.026, dist * 0.00028);
    this.addSpread(dir, error);
    const interval = 60 / weapon.def.fireRate;
    bot.nextFireTime = this.now + interval * (1.04 + Math.random() * 0.22);
    if (weapon.def.slot !== 'melee') weapon.mag -= 1;
    this.audio.shoot(weapon.def.id);
    this.resolveShot(bot, eye, dir, weapon.def, true);
    if (weapon.mag <= 0 && weapon.reserve > 0) {
      window.setTimeout(() => {
        if (bot.alive && this.phase === 'live') this.startReload(bot);
      }, 220);
    }
    bot.pitch += 0.008;
  }

  private updateBotObjective(bot: Actor, dt: number) {
    const brain = bot.brain;
    const now = this.now;
    let goalX = bot.pos.x;
    let goalZ = bot.pos.z;
    let wantsPatrol = false;

    if (bot.team === 'T') {
      if (this.bombState === 'planted') {
        const d = Math.hypot(bot.pos.x - this.bombPos.x, bot.pos.z - this.bombPos.z);
        if (d > 9) {
          goalX = this.bombPos.x + Math.cos(brain.holdSpotAngle) * 2.5;
          goalZ = this.bombPos.z + Math.sin(brain.holdSpotAngle) * 2.5;
        } else {
          brain.state = 'hold';
          this.holdAndScan(bot, dt);
          return;
        }
      } else if (bot.hasC4) {
        const site = BOMB_SITES.find((s) => s.id === brain.site) ?? BOMB_SITES[0];
        goalX = site.center.x;
        goalZ = site.center.z;
      } else if (this.bombState === 'dropped') {
        const nearest = this.closestTeammateTo('T', this.bombPos.x, this.bombPos.z);
        if (nearest?.id === bot.id) {
          brain.state = 'retrieve';
          goalX = this.bombPos.x;
          goalZ = this.bombPos.z;
        } else {
          const site = BOMB_SITES.find((s) => s.id === brain.site) ?? BOMB_SITES[0];
          goalX = site.center.x;
          goalZ = site.center.z;
        }
      } else {
        const site = BOMB_SITES.find((s) => s.id === brain.site) ?? BOMB_SITES[0];
        const inSite = getBombSiteAt(bot.pos.x, bot.pos.z);
        if (inSite) {
          brain.state = 'hold';
          if (now > brain.nextThink) {
            brain.nextThink = now + 8 + Math.random() * 5;
            wantsPatrol = true;
          }
        } else {
          brain.state = 'advance';
          goalX = site.center.x + Math.cos(brain.holdSpotAngle) * 3;
          goalZ = site.center.z + Math.sin(brain.holdSpotAngle) * 3;
        }
      }
    } else {
      if (this.bombState === 'planted') {
        const designated = this.getDefuserId();
        const dToBomb = Math.hypot(bot.pos.x - this.bombPos.x, bot.pos.z - this.bombPos.z);
        if (designated === bot.id && dToBomb < 7) {
          goalX = this.bombPos.x;
          goalZ = this.bombPos.z;
          brain.state = 'defuse';
        } else if (dToBomb > 9) {
          goalX = this.bombPos.x + Math.cos(brain.holdSpotAngle) * 2.5;
          goalZ = this.bombPos.z + Math.sin(brain.holdSpotAngle) * 2.5;
          brain.state = 'advance';
        } else if (designated === bot.id) {
          goalX = this.bombPos.x;
          goalZ = this.bombPos.z;
          brain.state = 'defuse';
        } else {
          brain.state = 'hold';
        }
      } else {
        let anchorX = 0;
        let anchorZ = 0;
        if (brain.anchor === 'A') { anchorX = 39; anchorZ = -35; }
        else if (brain.anchor === 'B') { anchorX = -39; anchorZ = -35; }
        else { anchorX = 0; anchorZ = -35; }
        const d = Math.hypot(bot.pos.x - anchorX, bot.pos.z - anchorZ);
        if (d > 5.5) {
          goalX = anchorX;
          goalZ = anchorZ;
          brain.state = 'advance';
        } else {
          brain.state = 'hold';
          if (now > brain.nextThink) {
            brain.nextThink = now + 6 + Math.random() * 3;
            wantsPatrol = true;
          }
        }
      }
    }

    if (wantsPatrol && brain.anchor) {
      let cx = goalX, cz = goalZ;
      if (bot.team === 'CT') {
        if (brain.anchor === 'A') { cx = 39; cz = -35; }
        else if (brain.anchor === 'B') { cx = -39; cz = -35; }
        else { cx = 0; cz = -32; }
      } else if (this.bombState === 'planted') {
        cx = this.bombPos.x;
        cz = this.bombPos.z;
      }
      const point = this.map.nav.randomPointNear(cx, cz, 6.5);
      if (point) {
        goalX = point.x;
        goalZ = point.z;
      }
    }

    const dGoal = Math.hypot(goalX - bot.pos.x, goalZ - bot.pos.z);
    if (dGoal > 0.8) {
      this.navigateBot(bot, goalX, goalZ, dt);
    } else {
      brain.path = [];
      brain.goalX = goalX;
      brain.goalZ = goalZ;
      this.moveBot(bot, dt, 0, 0);
      this.holdAndScan(bot, dt);
    }
    if (bot.team === 'CT' && this.bombState === 'planted' && this.getDefuserId() === bot.id) {
      const dist = Math.hypot(bot.pos.x - this.bombPos.x, bot.pos.z - this.bombPos.z);
      if (dist < 1.85) this.aiDefuseRequest = bot.id;
    }
  }

  private holdAndScan(bot: Actor, dt: number) {
    const now = this.now;
    // Gentle scans while holding; bots look toward likely entrances instead of standing frozen.
    const base = bot.team === 'T'
      ? Math.atan2(-(0 - bot.pos.x), -(25 - bot.pos.z))
      : Math.atan2(-(0 - bot.pos.x), -(-10 - bot.pos.z));
    const target = base + Math.sin(now * 0.27 + bot.brain.holdSpotAngle) * 1.65;
    bot.yaw += angleDelta(bot.yaw, target) * Math.min(1, dt * 1.4);
    bot.pitch = lerp(bot.pitch, 0, Math.min(1, dt * 3));
  }

  private navigateBot(bot: Actor, goalX: number, goalZ: number, dt: number) {
    const brain = bot.brain;
    const now = this.now;
    const goalChanged = Math.hypot(goalX - brain.goalX, goalZ - brain.goalZ) > 2.0;
    if (brain.path.length === 0 || brain.pathIndex >= brain.path.length || goalChanged || now > brain.nextRepath) {
      brain.goalX = goalX;
      brain.goalZ = goalZ;
      brain.path = this.map.nav.findPath(bot.pos.x, bot.pos.z, goalX, goalZ);
      brain.pathIndex = 0;
      brain.nextRepath = now + 1.6 + Math.random() * 1.3;
    }
    while (brain.pathIndex < brain.path.length) {
      const wp = brain.path[brain.pathIndex];
      if (Math.hypot(wp.x - bot.pos.x, wp.z - bot.pos.z) < 0.75) brain.pathIndex++;
      else break;
    }
    if (brain.pathIndex >= brain.path.length) {
      this.moveBot(bot, dt, 0, 0);
      return;
    }
    const wp = brain.path[brain.pathIndex];
    const dx = wp.x - bot.pos.x;
    const dz = wp.z - bot.pos.z;
    const len = Math.hypot(dx, dz);
    if (len < 0.001) { this.moveBot(bot, dt, 0, 0); return; }
    const nx = dx / len;
    const nz = dz / len;
    const speed = bot.team === 'T' ? 4.35 : 4.15;
    this.moveBot(bot, dt, nx, nz, speed);
    const desiredYaw = Math.atan2(-nx, -nz);
    bot.yaw += angleDelta(bot.yaw, desiredYaw) * Math.min(1, dt * 7);
    bot.pitch = lerp(bot.pitch, 0, Math.min(1, dt * 5));

    const moved = Math.hypot(bot.pos.x - brain.lastX, bot.pos.z - brain.lastZ);
    if (moved < 0.012) brain.stuckTime += dt;
    else brain.stuckTime = 0;
    brain.lastX = bot.pos.x;
    brain.lastZ = bot.pos.z;
    if (brain.stuckTime > 1.15) {
      brain.stuckTime = 0;
      const point = this.map.nav.randomPointNear(bot.pos.x, bot.pos.z, 4);
      if (point) {
        brain.path = this.map.nav.findPath(bot.pos.x, bot.pos.z, point.x, point.z);
        brain.pathIndex = 0;
      }
    }
  }

  private moveBot(bot: Actor, dt: number, nx: number, nz: number, speed = 4.2) {
    this.simulateMovement(bot, dt, nx, nz, speed, false);
    // Soft actor separation to prevent conga-line interpenetration around doorways.
    let sepX = 0;
    let sepZ = 0;
    for (const other of this.actors) {
      if (other === bot || !other.alive) continue;
      const dx = bot.pos.x - other.pos.x;
      const dz = bot.pos.z - other.pos.z;
      const d = Math.hypot(dx, dz);
      const minDist = bot.radius + other.radius + 0.12;
      if (d > 0.001 && d < minDist) {
        const push = (minDist - d) * 0.5;
        sepX += (dx / d) * push;
        sepZ += (dz / d) * push;
      }
    }
    if (sepX !== 0 || sepZ !== 0) {
      const nx2 = bot.pos.x + sepX;
      const nz2 = bot.pos.z + sepZ;
      if (!this.collidesAt(bot, nx2, bot.pos.z)) bot.pos.x = nx2;
      if (!this.collidesAt(bot, bot.pos.x, nz2)) bot.pos.z = nz2;
    }
  }

  private closestTeammateTo(team: Team, x: number, z: number): Actor | null {
    let best: Actor | null = null;
    let bestD = Infinity;
    for (const a of this.actors) {
      if (!a.alive || a.team !== team) continue;
      const d = Math.hypot(a.pos.x - x, a.pos.z - z);
      if (d < bestD) { bestD = d; best = a; }
    }
    return best;
  }

  private getDefuserId(): string | null {
    if (this.bombState !== 'planted') return null;
    const best = this.closestTeammateTo('CT', this.bombPos.x, this.bombPos.z);
    return best?.id ?? null;
  }

  private engagementRange(bot: Actor): number {
    const weapon = getActiveWeapon(bot);
    if (weapon.def.id === 'awp') return 95;
    if (weapon.def.slot === 'secondary') return 34;
    return 58;
  }

  private getLocationLabel(x: number, z: number): string {
    if (x >= 24 && x <= 58 && z >= -52 && z <= -22) return 'A 点 / A SITE';
    if (x >= -58 && x <= -24 && z >= -52 && z <= -22) return 'B 点 / B SITE';
    if (x >= -8 && x <= 8 && z >= -44 && z <= 28) return '中路 / MID';
    if (x >= 8 && x <= 32 && z >= -22 && z <= -8) return '猫道 / CATWALK';
    if (x >= 30 && z > -22 && z <= 41) return 'A大 / LONG A';
    if (x < -39 && z > -22 && z <= 41) return 'B洞 / B TUNNELS';
    if (z >= 28 && x >= -24 && x <= 24) return 'T 出生点 / T SPAWN';
    if (z <= -44 && x >= -24 && x <= 24) return 'CT 出生点 / CT SPAWN';
    if (x > 24 && z > -22) return 'A大入口';
    if (x < -24 && z > -22) return 'B洞入口';
    return 'DUST II';
  }

  /** A small forgiveness margin lets a carrier plant at the painted site edge. */
  private getPlantSite(x: number, z: number): BombSite | null {
    const direct = getBombSiteAt(x, z);
    if (direct) return direct;
    const margin = 1.2;
    for (const site of BOMB_SITES) {
      if (x >= site.minX - margin && x <= site.maxX + margin && z >= site.minZ - margin && z <= site.maxZ + margin) return site;
    }
    return null;
  }

  private checkElimination() {
    if (this.phase !== 'live') return;
    const ctAlive = this.actors.some((a) => a.alive && a.team === 'CT');
    const tAlive = this.actors.some((a) => a.alive && a.team === 'T');
    if (!ctAlive) {
      this.endRound('T', 'CT 已被全部消灭');
      return;
    }
    if (!tAlive && this.bombState !== 'planted') {
      this.endRound('CT', 'T 已被全部消灭');
    }
  }

  private endRound(winner: Team, reason: string) {
    if (this.phase === 'roundEnd') return;
    this.phase = 'roundEnd';
    this.endTimer = END_TIME;
    this.roundResult = { winner, reason };
    this.roundBanner = winner === this.playerTeam ? '回合胜利' : '回合失败';
    this.roundSubBanner = reason;
    this.bannerUntil = this.now + END_TIME;
    this.firing = false;
    this.plantProgress = 0;
    this.defuseProgress = 0;
    this.plantingActorId = null;
    this.defusingActorId = null;
    if (winner === 'CT') this.scoreCT += 1;
    else this.scoreT += 1;
    this.audio.roundEnd(winner === this.playerTeam);
    this.emitHud();
  }

  private lastHudEmitMs = 0;

  private emitHudIfNeeded() {
    const t = performance.now();
    if (t - this.lastHudEmitMs > 80) {
      this.lastHudEmitMs = t;
      this.emitHud();
    }
  }

  private computeSpottedEnemies(): string[] {
    const spotted: string[] = [];
    const friendlies = this.actors.filter((a) => a.alive && a.team === this.playerTeam);
    if (friendlies.length === 0) return spotted;
    for (const enemy of this.actors) {
      if (!enemy.alive || enemy.team === this.playerTeam) continue;
      for (const mate of friendlies) {
        const d = Math.hypot(enemy.pos.x - mate.pos.x, enemy.pos.z - mate.pos.z);
        if (this.isVisibleTo(mate, enemy, d < 18 ? 360 : 155, false)) {
          spotted.push(enemy.id);
          break;
        }
      }
    }
    return spotted;
  }

  private emitHud() {
    if (this.disposed) return;
    const controlled = this.controlledActor;
    const spectate = this.actors.find((a) => a.id === this.spectateId && a.alive) ?? null;
    const viewActor = controlled ?? spectate;
    const ws = viewActor ? getActiveWeapon(viewActor) : null;
    const reloadProgress = ws && ws.reloading && ws.def.reloadTime > 0
      ? clamp(1 - ws.reloadRemaining / ws.def.reloadTime, 0, 1) : 0;
    const moveSpeed = controlled ? Math.hypot(controlled.velocity.x, controlled.velocity.z) : 0;
    let spread = 0;
    if (ws && controlled) {
      spread = ws.def.spread + controlled.bloom;
      if (moveSpeed > 1.2) spread += 0.018 + moveSpeed * 0.003;
      if (!controlled.onGround) spread += 0.022;
      if (this.scoped && ws.def.id === 'awp') spread = ws.def.scopedSpread ?? 0;
    }
    const spotted = this.computeSpottedEnemies();
    const bombCarrier = this.actors.find((a) => a.id === this.bombCarrierId);
    let bombX = this.bombPos.x;
    let bombZ = this.bombPos.z;
    if (this.bombState === 'carried' && bombCarrier) {
      bombX = bombCarrier.pos.x;
      bombZ = bombCarrier.pos.z;
    }
    const site = controlled ? this.getPlantSite(controlled.pos.x, controlled.pos.z) : null;
    let interactionPrompt = '';
    let interactionKind: 'plant' | 'defuse' | null = null;
    if (this.phase === 'live') {
      if (controlled?.alive && controlled.team === 'T' && controlled.hasC4) {
        interactionKind = 'plant';
        interactionPrompt = site ? '按住 E 安放 C4' : '前往 A 点或 B 点安放 C4';
      } else if (controlled?.alive && controlled.team === 'CT' && this.bombState === 'planted') {
        const d = Math.hypot(controlled.pos.x - this.bombPos.x, controlled.pos.z - this.bombPos.z);
        if (d < 2.1) {
          interactionKind = 'defuse';
          interactionPrompt = '按住 E 拆除 C4';
        } else {
          interactionPrompt = 'C4 已安放，前往炸弹点拆除';
        }
      } else if (this.plantProgress > 0) {
        interactionKind = 'plant';
        interactionPrompt = controlled?.team === 'T' ? '安放 C4 中…' : 'T 正在安放 C4';
      } else if (this.defuseProgress > 0) {
        interactionKind = 'defuse';
        interactionPrompt = controlled?.team === 'CT' ? '拆除 C4 中…' : 'CT 正在拆除 C4';
      } else if (this.bombState === 'dropped' && controlled?.team === 'T') {
        interactionPrompt = 'C4 已掉落 · 靠近自动拾取';
      }
    }
    const plantActive = this.plantProgress > 0 || this.plantingActorId !== null;
    const defuseActive = this.defuseProgress > 0;
    if (plantActive) interactionKind = 'plant';
    if (defuseActive) interactionKind = 'defuse';
    const progress = defuseActive ? this.defuseProgress / DEFUSE_TIME : plantActive ? this.plantProgress / PLANT_TIME : 0;
    const now = this.now;
    const aliveFriendly = this.actors.filter((a) => a.team === this.playerTeam && a.alive);
    const hud: HudSnapshot = {
      ready: true,
      locked: this.locked,
      phase: this.phase,
      round: this.round,
      pistolRound: this.pistolRound,
      scoreCT: this.scoreCT,
      scoreT: this.scoreT,
      timeLeft: this.roundTime,
      freezeLeft: this.freezeTimer,
      roundBanner: now < this.bannerUntil ? this.roundBanner : '',
      roundSubBanner: now < this.bannerUntil ? this.roundSubBanner : '',
      playerTeam: this.playerTeam,
      playerName: '你',
      location: viewActor ? this.getLocationLabel(viewActor.pos.x, viewActor.pos.z) : 'DUST II',
      alive: !!controlled?.alive,
      spectating: !controlled && !!spectate,
      spectatingName: spectate?.name ?? '',
      canTakeOver: !controlled && !!spectate,
      health: viewActor?.health ?? 0,
      armor: viewActor?.armor ?? 0,
      helmet: viewActor?.helmet ?? false,
      weaponName: ws?.def.name ?? '—',
      weaponShort: ws?.def.shortName ?? '—',
      weaponSlot: viewActor?.currentSlot ?? 'secondary',
      weaponIcon: ws?.def.id ?? 'none',
      mag: ws?.mag ?? 0,
      reserve: ws?.reserve ?? 0,
      reloading: ws?.reloading ?? false,
      reloadProgress,
      scoped: this.scoped && !!controlled?.alive,
      canScope: ws?.def.id === 'awp',
      spread: spread * 1000,
      hitmarker: now < this.hitmarkerUntil,
      headshotMarker: this.hitmarkerHeadshot && now < this.hitmarkerUntil,
      damageFlash: this.damageFlash,
      killFlash: now < this.killFlashUntil,
      killfeed: this.killfeed.filter((k) => now - k.createdAt < 7),
      c4Carried: !!controlled?.hasC4,
      bombPlanted: this.bombState === 'planted',
      bombTime: this.bombTimer,
      bombX,
      bombZ,
      bombState: this.bombState,
      interactionPrompt,
      interactionKind,
      interactionProgress: clamp(progress, 0, 1),
      players: this.actors.map((a) => ({
        id: a.id, name: a.name, team: a.team, x: a.pos.x, z: a.pos.z, yaw: a.yaw,
        alive: a.alive, isSelf: a === controlled || (a.id === this.spectateId && !controlled),
        isBombCarrier: a.hasC4, spotted: spotted.includes(a.id),
      })),
      spottedEnemies: spotted,
      buyOpen: this.buyOpen,
      buyAllowed: this.phase === 'freeze',
      buyOptions: this.buyOptions,
      money: controlled?.money ?? 0,
      killCount: controlled?.kills ?? 0,
      deathCount: this.playerDeaths,
      ammoSlots: (['primary', 'secondary', 'melee'] as WeaponSlot[]).map((slot) => {
        const s = viewActor ? getSlot(viewActor, slot) : null;
        return {
          slot,
          name: s ? s.def.shortName : '—',
          active: viewActor?.currentSlot === slot,
          has: !!s,
        };
      }),
      roundResult: this.roundResult,
      scoreboard: this.actors
        .map((a) => ({ id: a.id, name: a.name, team: a.team, kills: a.kills, deaths: a.deaths, alive: a.alive, isPlayer: a.isPlayer }))
        .sort((a, b) => b.kills - a.kills),
      instruction: `剩余 ${aliveFriendly.length} 名队友 · E 安放/拆除 · R 换弹 · B 军械库`,
    };
    this.onHud(hud);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    document.removeEventListener('keydown', this.boundKeyDown);
    document.removeEventListener('keyup', this.boundKeyUp);
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mousedown', this.boundMouseDown);
    document.removeEventListener('mouseup', this.boundMouseUp);
    document.removeEventListener('contextmenu', this.boundContext);
    document.removeEventListener('pointerlockchange', this.boundPointerLock);
    window.removeEventListener('resize', this.boundResize);
    window.removeEventListener('blur', this.boundBlur);
    this.canvas.removeEventListener('wheel', this.boundWheel);
    for (const a of this.actors) a.model.dispose();
    this.actors = [];
    for (const tr of this.tracers) {
      this.scene.remove(tr.line);
    }
    this.renderer.dispose();
    this.audio.close();
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
  }
}


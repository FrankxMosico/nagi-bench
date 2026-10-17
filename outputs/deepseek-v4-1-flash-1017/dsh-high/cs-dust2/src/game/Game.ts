import * as THREE from 'three';
import { AudioManager } from './audio';
import {
  CharacterModel,
  createFirstPersonWeapon,
  triggerMuzzleFlash,
  type HitboxWorld,
} from './character';
import { createMap, type GameMap, type MapSolid } from './map';
import { Navigation } from './navigation';
import {
  WEAPONS,
  HIT_MULTIPLIERS,
  BUY_OPTIONS,
  activeWeapon,
  createInventory,
  getWeapon,
  hasSlot,
  makeWeapon,
  type BuyOption,
  type Inventory,
  type WeaponId,
  type WeaponInstance,
} from './weapons';
import {
  clamp,
  dist2,
  moveAngle,
  normalizeAngle,
  rand,
  rayAabb,
  resolveCircleRect,
} from './math';
import type {
  BombsiteInfo,
  GamePhase,
  HitPart,
  HudState,
  KillFeedEntry,
  ScoreEntry,
  Team,
  Vec2,
  WeaponSlot,
} from './types';

const FREEZE_TIME = 4.6;
const ROUND_TIME = 108;
const BOMB_TIME = 40;
const PLANT_TIME = 3.2;
const DEFUSE_TIME = 7;
const PLAYER_EYE = 1.62;
const PLAYER_RADIUS = 0.42;
const MATCH_POINT = 13;

const CT_NAMES = ['Sable', 'Rook', 'Viper', 'Echo', 'Atlas'];
const T_NAMES = ['Falcon', 'Jackal', 'Dune', 'Mako', 'Cobra'];

type AIMode = 'idle' | 'objective' | 'combat' | 'investigate' | 'plant' | 'defuse';

interface AIState {
  mode: AIMode;
  targetId: string | null;
  targetVisible: boolean;
  lastSeen: Vec2 | null;
  lastSeenAt: number;
  nextThink: number;
  reactionUntil: number;
  nextFireAt: number;
  burstLeft: number;
  path: Vec2[];
  pathIndex: number;
  pathGoal: Vec2 | null;
  goalKey: string;
  nextRepathAt: number;
  wantsPlant: boolean;
  wantsDefuse: boolean;
  strafeDir: number;
  nextStrafeAt: number;
  stuckCheckAt: number;
  lastCheck: Vec2;
  routeDone: boolean;
  arrivedAt: number;
  holdPoint: Vec2 | null;
}

interface Entity {
  id: string;
  name: string;
  team: Team;
  teamIndex: number;
  position: THREE.Vector3;
  yaw: number;
  pitch: number;
  health: number;
  armor: number;
  alive: boolean;
  inventory: Inventory;
  model: CharacterModel;
  ai: AIState | null;
  kills: number;
  deaths: number;
  nextFireAt: number;
  reloading: boolean;
  reloadEnd: number;
  bloom: number;
  velocityY: number;
  onGround: boolean;
  footstepTimer: number;
  lastDamageAt: number;
  speed: number;
  lastPosition: THREE.Vector3;
  deathAt: number;
}

interface AIAction {
  kind: 'plant' | 'defuse';
  entityId: string;
  progress: number;
}

interface BombState {
  planted: boolean;
  plantedSite: BombsiteInfo | null;
  carriedBy: string | null;
  dropped: boolean;
  position: THREE.Vector3;
  timer: number;
  plantProgress: number;
  defuseProgress: number;
  nextBeep: number;
  plantedAt: number;
  exploded: boolean;
  defused: boolean;
}

interface Effect {
  object: THREE.Object3D;
  ttl: number;
  life: number;
  velocity?: THREE.Vector3;
  gravity?: number;
  fade?: boolean;
  spin?: number;
}

interface MinimapMarker {
  x: number;
  z: number;
  yaw?: number;
  team?: Team;
  alive?: boolean;
}

export interface MinimapData {
  player: MinimapMarker | null;
  teammates: MinimapMarker[];
  enemies: MinimapMarker[];
  bomb: { x: number; z: number; kind: 'carried' | 'dropped' | 'planted' } | null;
  sites: { name: 'A' | 'B'; x: number; z: number }[];
}

interface ScoreboardRow extends ScoreEntry {}

const TEAM_COLOR: Record<Team, number> = { CT: 0x4f9de0, T: 0xe2a04a };

function teamSpawnName(team: Team): string {
  return team === 'CT' ? '反恐精英' : '恐怖分子';
}

function angleLerp(a: number, b: number, t: number): number {
  return a + normalizeAngle(b - a) * t;
}

export class Game {
  private container: HTMLElement;
  private onHud: (hud: HudState) => void;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  map: GameMap;
  nav: Navigation;
  audio = new AudioManager();

  private entities: Entity[] = [];
  private humanId: string | null = null;
  private playerTeam: Team = 'CT';
  private started = false;
  private paused = false;
  private buyOpen = false;
  private matchOver = false;
  private phase: GamePhase = 'menu';
  private round = 1;
  private roundTime = ROUND_TIME;
  private freezeEnd = 0;
  private roundEndAt = 0;
  private simTime = 0;
  private ctScore = 0;
  private tScore = 0;
  private tStrategy: 'A' | 'B' = 'A';
  private playerPreferredPrimary: WeaponId | null = null;
  private playerPreferredPistol: WeaponId | null = null;
  private killfeed: KillFeedEntry[] = [];
  private killfeedId = 0;
  private action: AIAction | null = null;
  private message = '';
  private messageSub = '';
  private objective = '';
  private hitMarkerUntil = 0;
  private hitMarkerHead = false;
  private damageFlash = 0;
  private shake = 0;
  private scoped = false;
  private scopeHeld = false;
  private fireHeld = false;
  private semiLocked = false;
  private interactHeld = false;
  private showScoreboard = false;
  private takeoverAt = -1;
  private spectateId: string | null = null;
  private lastHudAt = 0;
  private lastFrame = performance.now();
  private menuAngle = 0;
  private keys = new Set<string>();
  private fpRoot = new THREE.Group();
  private fpWeaponHost = new THREE.Group();
  private fpWeapon: THREE.Group | null = null;
  private fpWeaponId: WeaponId | null = null;
  private fpRecoil = 0;
  private fpReload = 0;
  private swayX = 0;
  private swayY = 0;
  private lastLookYaw = 0;
  private lastLookPitch = 0;
  private lockAcquiredAt = 0;
  private bobPhase = 0;
  private effects: Effect[] = [];
  private explosionFlash: THREE.Mesh | null = null;
  private exploLight: THREE.PointLight | null = null;
  private bombMesh: THREE.Group;
  private bombLed: THREE.Mesh;
  private bombLight: THREE.PointLight;
  private spotUntil = new Map<string, { x: number; z: number; until: number }>();
  private nextTeamVision = 0;
  private raf = 0;
  private disposed = false;
  private resizeObserver: ResizeObserver;
  private bomb: BombState = {
    planted: false,
    plantedSite: null,
    carriedBy: null,
    dropped: false,
    position: new THREE.Vector3(),
    timer: BOMB_TIME,
    plantProgress: 0,
    defuseProgress: 0,
    nextBeep: 0,
    plantedAt: 0,
    exploded: false,
    defused: false,
  };

  constructor(container: HTMLElement, onHud: (hud: HudState) => void) {
    this.container = container;
    this.onHud = onHud;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setSize(container.clientWidth || 1, container.clientHeight || 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = 'game-canvas';
    this.renderer.domElement.tabIndex = 0;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xcdbb94, 62, 152);
    this.camera = new THREE.PerspectiveCamera(75, this.aspect(), 0.045, 300);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.setupSky();
    this.setupLights();
    this.map = createMap(this.scene);
    this.nav = new Navigation(this.map.solids);

    this.camera.add(this.fpRoot);
    const viewLight = new THREE.PointLight(0xffe2bd, 2.4, 2.6, 2);
    viewLight.position.set(0.35, 0.25, 0.2);
    this.camera.add(viewLight);
    this.fpRoot.position.set(0.27, -0.29, -0.68);
    this.fpRoot.add(this.fpWeaponHost);
    this.fpRoot.visible = false;

    const bomb = this.buildBombMesh();
    this.bombMesh = bomb.group;
    this.bombLed = bomb.led;
    this.bombLight = bomb.light;
    this.bombMesh.visible = false;
    this.scene.add(this.bombMesh);

    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();

    this.menuAngle = Math.PI * 0.22;
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
    this.emitHud(true);
  }

  private aspect(): number {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    return w / Math.max(1, h);
  }

  private setupSky(): void {
    const uniforms = {
      topColor: { value: new THREE.Color(0x7ea8c5) },
      horizonColor: { value: new THREE.Color(0xe8d5a8) },
      bottomColor: { value: new THREE.Color(0xbb9e6c) },
      sunDir: { value: new THREE.Vector3(0.55, 0.45, 0.25).normalize() },
    };
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms,
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vWorld;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        void main() {
          vec3 dir = normalize(vWorld);
          float h = clamp(dir.y * 1.15 + 0.08, 0.0, 1.0);
          vec3 col = mix(horizonColor, topColor, pow(h, 0.7));
          col = mix(bottomColor, col, clamp(h * 4.0, 0.0, 1.0));
          float sun = pow(max(dot(dir, sunDir), 0.0), 380.0);
          float halo = pow(max(dot(dir, sunDir), 0.0), 14.0);
          col += vec3(1.0, 0.83, 0.56) * (sun * 1.8 + halo * 0.18);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(220, 32, 18), mat);
    sky.frustumCulled = false;
    sky.renderOrder = -10;
    this.scene.add(sky);
  }

  private setupLights(): void {
    const hemi = new THREE.HemisphereLight(0xb9d5e8, 0x7a5d36, 1.25);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffe2b6, 2.55);
    sun.position.set(38, 64, 24);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -70;
    sun.shadow.camera.right = 70;
    sun.shadow.camera.top = 72;
    sun.shadow.camera.bottom = -72;
    sun.shadow.camera.near = 4;
    sun.shadow.camera.far = 160;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.025;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x8ba6c6, 0.38);
    fill.position.set(-40, 22, -38);
    this.scene.add(fill);
  }

  private buildBombMesh(): { group: THREE.Group; led: THREE.Mesh; light: THREE.PointLight } {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.24, 0.34),
      new THREE.MeshStandardMaterial({ color: 0x50442f, roughness: 0.85, metalness: 0.15 }),
    );
    body.castShadow = true;
    body.position.y = 0.14;
    g.add(body);
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.03, 0.24),
      new THREE.MeshStandardMaterial({ color: 0x171b18, roughness: 0.5, metalness: 0.4 }),
    );
    panel.position.set(0, 0.27, 0);
    g.add(panel);
    const ledMat = new THREE.MeshStandardMaterial({ color: 0x5a0b07, emissive: 0xff1d08, emissiveIntensity: 1, roughness: 0.3 });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), ledMat);
    led.position.set(0.11, 0.3, 0.06);
    g.add(led);
    const wireMat = new THREE.MeshStandardMaterial({ color: 0x9a2b1f, roughness: 0.6 });
    for (let i = 0; i < 3; i++) {
      const wire = new THREE.Mesh(new THREE.TorusGeometry(0.18 + i * 0.02, 0.008, 4, 16, Math.PI * 1.25), wireMat);
      wire.rotation.x = Math.PI / 2;
      wire.rotation.z = i * 0.8;
      wire.position.y = 0.29;
      g.add(wire);
    }
    const light = new THREE.PointLight(0xff2b11, 0, 5, 2);
    light.position.set(0.11, 0.36, 0.06);
    g.add(light);
    return { group: g, led, light };
  }

  // -------------------------------------------------------------------------
  // Lifecycle and public UI API
  // -------------------------------------------------------------------------

  startGame(team: Team): void {
    this.audio.init();
    this.clearEntities();
    this.playerTeam = team;
    this.playerPreferredPrimary = null;
    this.playerPreferredPistol = null;
    this.ctScore = 0;
    this.tScore = 0;
    this.round = 1;
    this.matchOver = false;
    this.started = true;
    this.paused = false;
    this.buyOpen = false;
    this.showScoreboard = false;
    this.createEntities();
    this.startRound(1);
    this.requestLock();
    this.emitHud(true);
  }

  restartMatch(): void {
    this.audio.init();
    const team = this.playerTeam;
    this.startGame(team);
  }

  returnToMenu(): void {
    this.started = false;
    this.paused = false;
    this.buyOpen = false;
    this.phase = 'menu';
    this.humanId = null;
    this.spectateId = null;
    this.clearEntities();
    this.bombMesh.visible = false;
    this.fpRoot.visible = false;
    this.scoped = false;
    if (document.pointerLockElement) document.exitPointerLock();
    this.emitHud(true);
  }

  resume(): void {
    this.audio.init();
    this.paused = false;
    this.requestLock();
    this.emitHud(true);
  }

  setBuyOpen(open: boolean): void {
    if (open) this.openBuy();
    else this.closeBuy();
  }

  buyOption(id: string): void {
    if (this.phase !== 'freeze' || this.round === 1 || !this.buyOpen) {
      return;
    }
    const e = this.getHuman();
    if (!e || !e.alive) return;
    const option = BUY_OPTIONS.find((o) => o.id === id);
    if (!option || (option.team !== 'both' && option.team !== e.team)) return;
    if (option.kind === 'primary') {
      const wid = id as WeaponId;
      e.inventory.primary = makeWeapon(wid);
      e.inventory.slot = 'primary';
      this.playerPreferredPrimary = wid;
      e.reloading = false;
      this.setEntityWeaponView(e);
      this.message = `已装备 ${WEAPONS[wid].name}`;
      this.messageSub = '军械库配置将在本回合生效';
    } else if (option.kind === 'pistol') {
      const wid = id as WeaponId;
      e.inventory.secondary = makeWeapon(wid);
      e.inventory.slot = 'secondary';
      this.playerPreferredPistol = wid;
      e.reloading = false;
      this.setEntityWeaponView(e);
      this.message = `已装备 ${WEAPONS[wid].name}`;
      this.messageSub = '副武器已更换';
    } else if (id === 'kevlar') {
      e.armor = 100;
      this.message = '已穿戴防弹衣';
      this.messageSub = '护甲将吸收部分伤害';
    }
    this.audio.pickup();
    this.emitHud(true);
  }

  private openBuy(): void {
    if (!this.started || this.phase !== 'freeze') return;
    this.buyOpen = true;
    this.fireHeld = false;
    this.scopeHeld = false;
    this.scoped = false;
    if (document.pointerLockElement) document.exitPointerLock();
    this.emitHud(true);
  }

  private closeBuy(): void {
    this.buyOpen = false;
    this.paused = false;
    this.requestLock();
    this.emitHud(true);
  }

  private requestLock(): void {
    if (!this.started) return;
    const el = this.renderer.domElement;
    try {
      const p = el.requestPointerLock() as unknown as Promise<void> | undefined;
      if (p && typeof p.catch === 'function') p.catch(() => undefined);
    } catch {
      // pointer lock may be unavailable in some embedded contexts; the pause overlay handles it.
    }
  }

  // -------------------------------------------------------------------------
  // Round and entity lifecycle
  // -------------------------------------------------------------------------

  private clearEntities(): void {
    for (const e of this.entities) {
      this.scene.remove(e.model.root);
    }
    this.entities = [];
    this.humanId = null;
  }

  private createEntities(): void {
    const makeTeam = (team: Team, names: string[]) => {
      for (let i = 0; i < 5; i++) {
        const model = new CharacterModel(team);
        this.scene.add(model.root);
        const id = `${team.toLowerCase()}${i}`;
        const isHuman = team === this.playerTeam && i === 0;
        const entity: Entity = {
          id,
          name: isHuman ? '你' : names[i],
          team,
          teamIndex: i,
          position: new THREE.Vector3(),
          yaw: team === 'T' ? Math.PI : 0,
          pitch: 0,
          health: 100,
          armor: 0,
          alive: true,
          inventory: createInventory(team),
          model,
          ai: null,
          kills: 0,
          deaths: 0,
          nextFireAt: 0,
          reloading: false,
          reloadEnd: 0,
          bloom: 0,
          velocityY: 0,
          onGround: true,
          footstepTimer: 0,
          lastDamageAt: -99,
          speed: 0,
          lastPosition: new THREE.Vector3(),
          deathAt: 0,
        };
        model.setWeapon('knife');
        this.entities.push(entity);
      }
    };
    makeTeam('CT', CT_NAMES);
    makeTeam('T', T_NAMES);
  }

  private startRound(round: number): void {
    this.round = round;
    this.phase = 'freeze';
    this.freezeEnd = this.simTime + FREEZE_TIME;
    this.roundEndAt = 0;
    this.roundTime = ROUND_TIME;
    this.killfeed = [];
    this.action = null;
    this.buyOpen = false;
    this.scoped = false;
    this.scopeHeld = false;
    this.fireHeld = false;
    this.semiLocked = false;
    this.interactHeld = false;
    this.damageFlash = 0;
    this.shake = 0;
    this.spotUntil.clear();
    this.tStrategy = Math.random() < 0.5 ? 'A' : 'B';
    this.bomb.planted = false;
    this.bomb.plantedSite = null;
    this.bomb.carriedBy = null;
    this.bomb.dropped = false;
    this.bomb.timer = BOMB_TIME;
    this.bomb.plantProgress = 0;
    this.bomb.defuseProgress = 0;
    this.bomb.exploded = false;
    this.bomb.defused = false;
    this.bomb.nextBeep = 0;
    this.bomb.plantedAt = 0;
    this.bomb.position.set(0, 0.02, 0);
    this.bombMesh.visible = false;
    this.bombMesh.position.copy(this.bomb.position);
    this.explosionFlash?.removeFromParent();
    this.explosionFlash = null;
    if (this.exploLight) {
      this.exploLight.removeFromParent();
      this.exploLight = null;
    }

    // Reset every combatant and equip according to the round type.
    this.entities.forEach((e, index) => {
      const spawns = e.team === 'T' ? this.map.tSpawns : this.map.ctSpawns;
      const spawn = spawns[e.teamIndex];
      e.position.set(spawn.x + (index % 2 === 0 ? 0.18 : -0.18), 0, spawn.z);
      e.yaw = e.team === 'T' ? 0 : Math.PI;
      e.pitch = 0;
      e.alive = true;
      e.health = 100;
      e.velocityY = 0;
      e.onGround = true;
      e.bloom = 0;
      e.nextFireAt = 0;
      e.reloading = false;
      e.reloadEnd = 0;
      e.speed = 0;
      e.deathAt = 0;
      e.lastPosition.copy(e.position);
      e.footstepTimer = 0;
      e.model.reset();
      e.model.root.position.copy(e.position);
      e.model.root.rotation.y = e.yaw;
      e.model.setVisible(true);
      this.giveLoadout(e, round);
      e.model.setWeapon(activeWeapon(e.inventory).def.id);
      e.ai = this.createAIState();
    });

    // Player takes the first slot on their chosen side. Teammates are AI.
    const first = this.entities.find((e) => e.team === this.playerTeam && e.teamIndex === 0);
    if (first) {
      this.humanId = first.id;
      this.spectateId = null;
      this.takeoverAt = -1;
      this.camera.fov = 75;
      this.camera.updateProjectionMatrix();
      this.possess(first, true);
      this.camera.position.set(first.position.x, first.position.y + PLAYER_EYE, first.position.z);
      this.camera.rotation.set(first.pitch, first.yaw, 0, 'YXZ');
    }

    // Which T has the bomb?
    const terrorists = this.aliveEntities('T');
    if (terrorists.length) {
      const carrier = terrorists[Math.floor(Math.random() * terrorists.length)];
      this.bomb.carriedBy = carrier.id;
      this.bomb.dropped = false;
      this.bomb.position.copy(carrier.position);
      this.bombMesh.visible = true;
    }

    this.killfeed = [];
    this.scoped = false;
    this.objective =
      this.playerTeam === 'T'
        ? this.round === 1
          ? '手枪局：携带 C4 推进至 A 或 B 点并安放炸弹'
          : `目标：${this.tStrategy} 点 · 安放 C4 或清除所有 CT`
        : '目标：阻止 T 安放 C4，或拆除已安放的炸弹';
    this.message = `第 ${this.round} 回合 · ${this.round === 1 ? '手枪局' : this.tStrategy + ' 点进攻'}`;
    this.messageSub =
      this.round === 1
        ? '全员仅装备默认手枪与战术刀 · 无护甲'
        : this.phase === 'freeze'
          ? '准备阶段 · 按 B 打开军械库'
          : '';
    this.updateBombAuxiliary();
    this.emitHud(true);
  }

  private giveLoadout(e: Entity, round: number): void {
    if (round === 1) {
      e.inventory = createInventory(e.team);
      e.armor = 0;
    } else {
      const isPlayerSlot = e.team === this.playerTeam && e.teamIndex === 0;
      const standard = e.team === 'T' ? 'ak47' : 'm4a4';
      let primary: WeaponId = standard;
      let pistol: WeaponId = e.team === 'T' ? 'glock' : 'usp';
      if (e.teamIndex === 4) primary = 'awp';
      if (e.teamIndex === 2 || e.teamIndex === 3) pistol = 'deagle';
      if (isPlayerSlot) {
        primary = this.playerPreferredPrimary ?? standard;
        pistol = this.playerPreferredPistol ?? (e.team === 'T' ? 'glock' : 'usp');
      }
      e.inventory = createInventory(e.team, primary, pistol);
      e.armor = 100;
    }
  }

  private createAIState(): AIState {
    return {
      mode: 'idle',
      targetId: null,
      targetVisible: false,
      lastSeen: null,
      lastSeenAt: -99,
      nextThink: 0,
      reactionUntil: 0,
      nextFireAt: 0,
      burstLeft: 3,
      path: [],
      pathIndex: 0,
      pathGoal: null,
      goalKey: '',
      nextRepathAt: 0,
      wantsPlant: false,
      wantsDefuse: false,
      strafeDir: Math.random() < 0.5 ? -1 : 1,
      nextStrafeAt: 0,
      stuckCheckAt: 0,
      lastCheck: { x: 0, z: 0 },
      routeDone: false,
      arrivedAt: 0,
      holdPoint: null,
    };
  }

  private getHuman(): Entity | null {
    return this.humanId ? this.entities.find((e) => e.id === this.humanId) ?? null : null;
  }

  private getEntity(id: string | null): Entity | null {
    if (!id) return null;
    return this.entities.find((e) => e.id === id) ?? null;
  }

  private aliveEntities(team: Team): Entity[] {
    return this.entities.filter((e) => e.team === team && e.alive);
  }

  private possess(e: Entity, instant = false): void {
    if (!e.alive) return;
    const old = this.getHuman();
    if (old && old.id !== e.id) old.model.setVisible(true);
    this.humanId = e.id;
    this.spectateId = null;
    this.takeoverAt = -1;
    e.model.setVisible(false);
    this.scoped = false;
    this.scopeHeld = false;
    this.fireHeld = false;
    this.semiLocked = false;
    this.reloadingViewSync(e);
    this.message = instant ? this.message : `已接管 ${e.name}`;
    this.messageSub = instant ? this.messageSub : '你正在控制这名队友';
    this.audio.pickup();
    this.emitHud(true);
  }

  private reloadingViewSync(e: Entity): void {
    const w = activeWeapon(e.inventory);
    this.updateFPWeapon(w.def.id);
  }

  private setEntityWeaponView(e: Entity): void {
    e.model.setWeapon(activeWeapon(e.inventory).def.id);
    if (e.id === this.humanId) this.updateFPWeapon(activeWeapon(e.inventory).def.id);
  }

  // -------------------------------------------------------------------------
  // Input
  // -------------------------------------------------------------------------

  private bindEvents(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
    window.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('pointerlockchange', this.handlePointerLockChange);
    window.addEventListener('resize', this.handleResize);
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousedown', this.handleMouseDown);
    canvas.addEventListener('contextmenu', this.handleContextMenu);
    canvas.addEventListener('mousemove', this.handleMouseMove);
    canvas.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  private unbindEvents(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);
    window.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
    window.removeEventListener('resize', this.handleResize);
    const canvas = this.renderer.domElement;
    canvas.removeEventListener('mousedown', this.handleMouseDown);
    canvas.removeEventListener('contextmenu', this.handleContextMenu);
    canvas.removeEventListener('mousemove', this.handleMouseMove);
    canvas.removeEventListener('wheel', this.handleWheel);
  }

  private activeGameplay(): boolean {
    return this.started && !this.paused && !this.buyOpen && (this.phase === 'live' || this.phase === 'planted');
  }

  private handleKeyDown = (ev: KeyboardEvent): void => {
    if (!this.started || this.paused || this.matchOver) return;
    if (ev.code === 'Tab') {
      ev.preventDefault();
      this.showScoreboard = true;
      this.emitHud(true);
      return;
    }
    if (this.buyOpen) {
      if (ev.code === 'KeyB' || ev.code === 'Escape') {
        ev.preventDefault();
        this.closeBuy();
      }
      return;
    }
    if (['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyR', 'KeyE', 'Digit1', 'Digit2', 'Digit3', 'KeyB'].includes(ev.code)) {
      ev.preventDefault();
    }
    this.keys.add(ev.code);
    if (ev.repeat) return;
    if (ev.code === 'KeyB') {
      if (this.phase === 'freeze') {
        if (this.round === 1) {
          this.message = '手枪局禁止购买主武器';
          this.messageSub = '全员仅可使用默认手枪';
          this.audio.empty();
          this.emitHud(true);
        } else this.openBuy();
      }
      return;
    }
    if (ev.code === 'KeyR') this.startReload(this.getHuman(), true);
    if (ev.code === 'KeyE') this.interactHeld = true;
    if (ev.code === 'Space') {
      const e = this.getHuman();
      if (e && !e.alive) {
        const target = this.pickSpectateTarget();
        if (target) this.possess(target);
      } else if (this.activeGameplay() && e) {
        this.tryJump(e);
      }
    }
    if (ev.code === 'Digit1') this.switchSlot('primary');
    if (ev.code === 'Digit2') this.switchSlot('secondary');
    if (ev.code === 'Digit3') this.switchSlot('melee');
  };

  private handleKeyUp = (ev: KeyboardEvent): void => {
    this.keys.delete(ev.code);
    if (ev.code === 'KeyE') this.interactHeld = false;
    if (ev.code === 'Tab') {
      this.showScoreboard = false;
      this.emitHud(true);
    }
  };

  private handleBlur = (): void => {
    this.keys.clear();
    this.fireHeld = false;
    this.scopeHeld = false;
    this.interactHeld = false;
  };

  private handleResize = (): void => {
    this.resize();
  };

  private handleMouseDown = (ev: MouseEvent): void => {
    if (!this.started || this.buyOpen) return;
    if (document.pointerLockElement !== this.renderer.domElement) {
      this.requestLock();
      return;
    }
    if (this.paused) return;
    if (ev.button === 0) {
      this.fireHeld = true;
      this.semiLocked = false;
    } else if (ev.button === 2) {
      this.scopeHeld = true;
    }
  };

  private handleMouseUp = (ev: MouseEvent): void => {
    if (ev.button === 0) {
      this.fireHeld = false;
      this.semiLocked = false;
    } else if (ev.button === 2) {
      this.scopeHeld = false;
    }
  };

  private handleContextMenu = (ev: Event): void => {
    ev.preventDefault();
  };

  private handleMouseMove = (ev: MouseEvent): void => {
    if (!this.started || this.paused || this.buyOpen || document.pointerLockElement !== this.renderer.domElement) return;
    const e = this.getHuman();
    if (!e || !e.alive) return;
    // Browsers can emit a large synthetic delta right after pointer lock is
    // acquired; ignore that initial spike and clamp pathological events.
    if (performance.now() - this.lockAcquiredAt < 180) return;
    const mx = clamp(ev.movementX, -90, 90);
    const my = clamp(ev.movementY, -90, 90);
    const sens = 0.0021 * (this.scoped ? 0.48 : 1);
    e.yaw = normalizeAngle(e.yaw - mx * sens);
    e.pitch = clamp(e.pitch - my * sens, -1.3, 1.3);
    this.lastLookYaw = clamp(mx * 0.0008, -0.035, 0.035);
    this.lastLookPitch = clamp(my * 0.0005, -0.025, 0.025);
  };

  private handleWheel = (ev: WheelEvent): void => {
    if (!this.activeGameplay() || document.pointerLockElement !== this.renderer.domElement) return;
    ev.preventDefault();
    const e = this.getHuman();
    if (!e || !e.alive) return;
    const slots: WeaponSlot[] = ['primary', 'secondary', 'melee'];
    const available = slots.filter((s) => hasSlot(e.inventory, s));
    if (available.length <= 1) return;
    const current = available.indexOf(e.inventory.slot);
    const next = (current + (ev.deltaY > 0 ? 1 : -1) + available.length) % available.length;
    this.switchSlot(available[next], e);
  };

  private handlePointerLockChange = (): void => {
    if (!this.started) {
      this.emitHud(true);
      return;
    }
    const locked = document.pointerLockElement === this.renderer.domElement;
    if (!locked && !this.buyOpen && !this.matchOver) {
      this.paused = true;
      this.fireHeld = false;
      this.scopeHeld = false;
      this.interactHeld = false;
    } else if (locked) {
      this.paused = false;
      this.lockAcquiredAt = performance.now();
    }
    this.emitHud(true);
  };

  // -------------------------------------------------------------------------
  // Main update
  // -------------------------------------------------------------------------

  private loop(now: number): void {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, Math.max(0.001, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    if (!this.started) {
      this.menuAngle += dt * 0.045;
      const radius = 69;
      this.camera.position.set(Math.cos(this.menuAngle) * radius, 36, Math.sin(this.menuAngle) * radius * 0.7 + 8);
      this.camera.lookAt(0, 1.5, -5);
      this.camera.fov = 58;
      this.camera.updateProjectionMatrix();
      this.fpRoot.visible = false;
    } else if (!this.paused && !this.buyOpen) {
      this.simTime += dt;
      this.update(dt);
    }
    this.renderer.render(this.scene, this.camera);
    if (this.started && !this.paused && !this.buyOpen && now - this.lastHudAt > 55) this.emitHud();
  }

  private update(dt: number): void {
    this.updateDoors(dt);
    this.updateReloads(dt);
    this.updatePlayer(dt);
    this.updateBots(dt);
    this.updateBombCarry();
    this.updateBombActions(dt);
    this.updateBombState(dt);
    this.updateRoundState(dt);
    this.updateEntityVisuals(dt);
    this.updateEffects(dt);
    this.updateCamera(dt);
    this.updateTeamVision();
    this.updateSpotCleanup();
  }

  private updateDoors(dt: number): void {
    const points: Vec2[] = this.entities.filter((e) => e.alive).map((e) => ({ x: e.position.x, z: e.position.z }));
    this.map.updateDoors(points, dt);
  }

  private updateReloads(dt: number): void {
    for (const e of this.entities) {
      if (!e.alive) continue;
      e.bloom = Math.max(0, e.bloom - dt * (0.045 + e.bloom * 5.8));
      if (e.reloading && this.simTime >= e.reloadEnd) {
        e.reloading = false;
        const weapon = activeWeapon(e.inventory);
        const need = weapon.def.magSize - weapon.ammo;
        const take = Math.min(need, weapon.reserve);
        weapon.ammo += take;
        weapon.reserve -= take;
        this.setEntityWeaponView(e);
        if (e.id === this.humanId) this.fpReload = 0;
      }
    }
  }

  private updatePlayer(dt: number): void {
    const e = this.getHuman();
    if (!e) return;
    if (!e.alive) {
      this.updateSpectator(dt);
      return;
    }
    const gameplay = this.activeGameplay();
    const canMove = gameplay && !this.buyOpen;
    const weapon = activeWeapon(e.inventory);
    const moving = this.updateMovement(e, dt, canMove, this.keys);
    e.speed = moving;
    if (!e.onGround || e.velocityY !== 0) {
      e.velocityY -= 19.5 * dt;
      e.position.y += e.velocityY * dt;
      if (e.position.y <= 0) {
        e.position.y = 0;
        e.velocityY = 0;
        e.onGround = true;
      } else {
        e.onGround = false;
      }
    }

    const wasScoped = this.scoped;
    if (weapon.def.scoped && e.alive) {
      this.scoped = this.scopeHeld && !e.reloading && (this.phase === 'live' || this.phase === 'planted' || this.phase === 'freeze');
    } else {
      this.scoped = false;
    }
    if (this.scoped !== wasScoped) this.audio.scope();

    if (e.reloading) this.fpReload = Math.min(1, 1 - (e.reloadEnd - this.simTime) / Math.max(0.01, weapon.def.reloadTime));
    else this.fpReload = Math.max(0, this.fpReload - dt * 5);

    if (canMove && this.fireHeld) {
      if (weapon.def.automatic || !this.semiLocked) {
        const fired = this.tryFire(e);
        if (!weapon.def.automatic && fired) this.semiLocked = true;
      }
    }

    // Footsteps, with a little acceleration nuance.
    if (moving > 0.4 && e.onGround) {
      e.footstepTimer -= dt;
      if (e.footstepTimer <= 0) {
        const running = moving > 3.2;
        e.footstepTimer = running ? 0.35 : 0.55;
        this.audio.footstep(running, 0, 0);
      }
    } else {
      e.footstepTimer = Math.min(e.footstepTimer, 0.1);
    }

    this.updateScopeFov(dt);
  }

  private updateSpectator(dt: number): void {
    const aliveMates = this.aliveEntities(this.playerTeam);
    if (!aliveMates.length) {
      this.takeoverAt = -1;
      this.spectateId = null;
      return;
    }
    if (!this.spectateId || !this.getEntity(this.spectateId)?.alive) {
      this.spectateId = aliveMates[0].id;
      this.takeoverAt = this.simTime + 2.4;
    }
    if (this.takeoverAt > 0 && this.simTime >= this.takeoverAt) {
      const target = this.getEntity(this.spectateId);
      if (target && target.alive) this.possess(target);
    }
  }

  private pickSpectateTarget(): Entity | null {
    const aliveMates = this.aliveEntities(this.playerTeam);
    if (!aliveMates.length) return null;
    if (this.spectateId) {
      const t = this.getEntity(this.spectateId);
      if (t && t.alive) return t;
    }
    return aliveMates[0];
  }

  private updateScopeFov(dt: number): void {
    const target = this.scoped ? 30 : 75;
    const next = THREE.MathUtils.damp(this.camera.fov, target, 13, dt);
    if (Math.abs(next - this.camera.fov) > 0.01) {
      this.camera.fov = next;
      this.camera.updateProjectionMatrix();
    }
  }

  private updateMovement(e: Entity, dt: number, allowed: boolean, keys: Set<string>): number {
    if (!allowed) {
      e.speed = 0;
      return 0;
    }
    const weapon = activeWeapon(e.inventory);
    let forward = 0;
    let right = 0;
    if (keys.has('KeyW')) forward += 1;
    if (keys.has('KeyS')) forward -= 1;
    if (keys.has('KeyD')) right += 1;
    if (keys.has('KeyA')) right -= 1;
    const fx = -Math.sin(e.yaw);
    const fz = -Math.cos(e.yaw);
    const rx = Math.cos(e.yaw);
    const rz = -Math.sin(e.yaw);
    let dx = fx * forward + rx * right;
    let dz = fz * forward + rz * right;
    const len = Math.hypot(dx, dz);
    let speed = 0;
    if (len > 0.01) {
      dx /= len;
      dz /= len;
      const walk = keys.has('ShiftLeft') || keys.has('ShiftRight');
      speed = walk ? 2.65 : 5.15;
      if (this.scoped) speed *= 0.52;
      speed *= weapon.def.speedFactor;
      if (e.reloading) speed *= 0.9;
      e.position.x += dx * speed * dt;
      e.position.z += dz * speed * dt;
      this.resolveEntityCollisions(e);
    }
    return speed;
  }

  private tryJump(e: Entity): void {
    if (!e.onGround) return;
    e.velocityY = 6.2;
    e.onGround = false;
    e.position.y += 0.02;
  }

  private resolveEntityCollisions(e: Entity): void {
    for (let pass = 0; pass < 2; pass++) {
      for (const solid of this.map.solids) {
        if (solid.maxY < e.position.y + 0.2) continue;
        if (
          e.position.x + PLAYER_RADIUS > solid.rect.minX &&
          e.position.x - PLAYER_RADIUS < solid.rect.maxX &&
          e.position.z + PLAYER_RADIUS > solid.rect.minZ &&
          e.position.z - PLAYER_RADIUS < solid.rect.maxZ
        ) {
          const p = resolveCircleRect(e.position.x, e.position.z, PLAYER_RADIUS, solid.rect);
          e.position.x = p.x;
          e.position.z = p.z;
        }
      }
    }
    // keep the player inside the playable rectangle as a final guard
    e.position.x = clamp(e.position.x, -56.5, 56.5);
    e.position.z = clamp(e.position.z, -48.5, 48.5);
  }

  private separateEntities(): void {
    const alive = this.entities.filter((e) => e.alive);
    for (let i = 0; i < alive.length; i++) {
      for (let j = i + 1; j < alive.length; j++) {
        const a = alive[i];
        const b = alive[j];
        const dx = b.position.x - a.position.x;
        const dz = b.position.z - a.position.z;
        const d = Math.hypot(dx, dz);
        const min = PLAYER_RADIUS * 1.7;
        if (d > 0.0001 && d < min) {
          const push = (min - d) * 0.5;
          const nx = dx / d;
          const nz = dz / d;
          a.position.x -= nx * push;
          a.position.z -= nz * push;
          b.position.x += nx * push;
          b.position.z += nz * push;
          if (a.alive) this.resolveEntityCollisions(a);
          if (b.alive) this.resolveEntityCollisions(b);
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Weapons, hitscan and damage
  // -------------------------------------------------------------------------

  private startReload(e: Entity | null, byPlayer: boolean): void {
    if (!e || !e.alive || e.reloading) return;
    const w = activeWeapon(e.inventory);
    if (w.def.id === 'knife') return;
    if (w.ammo >= w.def.magSize || w.reserve <= 0) {
      if (byPlayer) this.audio.empty();
      return;
    }
    if (this.phase !== 'live' && this.phase !== 'planted' && this.phase !== 'freeze') return;
    e.reloading = true;
    e.reloadEnd = this.simTime + w.def.reloadTime;
    this.scoped = false;
    if (byPlayer) {
      this.audio.reload(w.def.reloadTime, w.def.sound.kind);
      this.fpReload = 0.001;
    }
  }

  private switchSlot(slot: WeaponSlot, onlyActor?: Entity): void {
    const e = onlyActor ?? this.getHuman();
    if (!e || !e.alive) return;
    if (!hasSlot(e.inventory, slot) || e.inventory.slot === slot) return;
    if ((this.phase === 'roundEnd' || this.phase === 'menu')) return;
    e.inventory.slot = slot;
    e.reloading = false;
    e.nextFireAt = this.simTime + 0.18;
    this.scoped = false;
    this.semiLocked = false;
    this.fireHeld = false;
    this.setEntityWeaponView(e);
    if (e.id === this.humanId) this.audio.pickup();
    this.emitHud(true);
  }

  private currentSpread(e: Entity): number {
    const w = activeWeapon(e.inventory);
    if (w.def.id === 'knife') return 0.01;
    let spread = w.def.spreadBase + e.bloom;
    const speedFactor = clamp(e.speed / 5, 0, 1);
    spread += speedFactor * w.def.spreadMove;
    if (!e.onGround) spread += 0.05;
    if (e.reloading) spread += 0.04;
    if (this.scoped) spread *= 0.18;
    return spread;
  }

  private tryFire(e: Entity): boolean {
    if (!e.alive || this.phase !== 'live' && this.phase !== 'planted') return false;
    if (this.simTime < e.nextFireAt || e.reloading) return false;
    const w = activeWeapon(e.inventory);
    if (w.def.id !== 'knife' && w.ammo <= 0) {
      if (e.id === this.humanId) {
        this.audio.empty();
        this.message = '弹匣已空 · 按 R 换弹';
        this.messageSub = w.reserve > 0 ? '换弹后继续射击' : '没有备用弹药';
        this.emitHud(true);
      }
      if (w.reserve > 0) this.startReload(e, false);
      return false;
    }
    e.nextFireAt = this.simTime + w.def.fireInterval / 1000;
    if (w.def.id === 'knife') {
      this.audio.knife();
      if (e.id === this.humanId) this.fpRecoil = 0.5;
    } else {
      w.ammo -= 1;
      e.bloom = Math.min(0.075, e.bloom + w.def.spreadShot);
      e.pitch = clamp(e.pitch + w.def.recoilPitch * rand(0.85, 1.15), -1.35, 1.35);
      e.yaw = normalizeAngle(e.yaw + rand(-1, 1) * w.def.recoilYaw);
      if (e.id === this.humanId) {
        this.fpRecoil = Math.min(1, this.fpRecoil + 0.9);
        this.shake = Math.min(0.28, this.shake + w.def.recoilPitch * 1.2);
      }
      const human = this.getHuman();
      const dist = human ? dist2({ x: human.position.x, z: human.position.z }, { x: e.position.x, z: e.position.z }) : 0;
      const pan = this.audioPan(e.position);
      this.audio.shot(w.def, dist, pan);
      const muzzle = e.model.getWeaponRoot();
      if (muzzle) triggerMuzzleFlash(muzzle);
      if (e.id === this.humanId) {
        if (this.fpWeapon) triggerMuzzleFlash(this.fpWeapon, 0.05);
      }
    }

    const origin = new THREE.Vector3(e.position.x, e.position.y + PLAYER_EYE, e.position.z);
    const dir = this.getShotDirection(e, w);
    this.resolveShot(e, origin, dir, w, w.def.id === 'knife' ? 'knife' : 'gun');

    // Gunfire gives away rough positions.
    if (w.def.id !== 'knife') this.alertNearbyBots(e);

    if (w.def.id !== 'knife' && w.ammo === 0 && w.reserve > 0) {
      this.startReload(e, e.id === this.humanId);
    }
    this.emitHud();
    return true;
  }

  private getShotDirection(e: Entity, w: WeaponInstance): THREE.Vector3 {
    if (e.id === this.humanId) {
      const spread = this.currentSpread(e);
      const yaw = e.yaw + rand(-spread, spread);
      const pitch = clamp(e.pitch + rand(-spread, spread), -1.45, 1.45);
      return new THREE.Vector3(
        -Math.sin(yaw) * Math.cos(pitch),
        Math.sin(pitch),
        -Math.cos(yaw) * Math.cos(pitch),
      ).normalize();
    }
    const target = this.getEntity(e.ai?.targetId ?? null);
    if (target && target.alive) {
      const eye = new THREE.Vector3(e.position.x, e.position.y + PLAYER_EYE, e.position.z);
      const aimHead = Math.random() < (w.def.id === 'awp' ? 0.18 : 0.09);
      const point = new THREE.Vector3(
        target.position.x,
        target.position.y + (aimHead ? 1.65 : rand(1.05, 1.35)),
        target.position.z,
      );
      const dir = point.sub(eye).normalize();
      const dist = target.position.distanceTo(e.position);
      const movePenalty = 1 + clamp(e.speed / 4.2, 0, 1) * 0.8;
      const error = (w.def.id === 'awp' ? 0.014 : 0.032) * (1 + dist / 38) * movePenalty;
      dir.x += rand(-error, error);
      dir.y += rand(-error * 0.65, error * 0.65);
      dir.z += rand(-error, error);
      return dir.normalize();
    }
    const yaw = e.yaw;
    const pitch = e.pitch;
    return new THREE.Vector3(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
  }

  private resolveShot(shooter: Entity, origin: THREE.Vector3, dir: THREE.Vector3, weapon: WeaponInstance, kind: 'gun' | 'knife'): void {
    const range = kind === 'knife' ? weapon.def.range : weapon.def.range;
    let wallT = Infinity;
    for (const solid of this.map.solids) {
      const t = rayAabb(
        origin.x, origin.y, origin.z,
        dir.x, dir.y, dir.z,
        solid.rect.minX, solid.minY, solid.rect.minZ,
        solid.rect.maxX, solid.maxY, solid.rect.maxZ,
      );
      if (t !== null && t >= 0 && t < wallT) wallT = t;
    }
    let hitEntity: Entity | null = null;
    let hitPart: HitPart = 'chest';
    let hitT = Infinity;
    for (const target of this.entities) {
      if (!target.alive || target.team === shooter.team) continue;
      if (dist2({ x: shooter.position.x, z: shooter.position.z }, { x: target.position.x, z: target.position.z }) > range + 3) continue;
      const boxes = target.model.getHitboxes(target.position, target.yaw, target.alive);
      for (const hb of boxes) {
        const b = hb.box;
        const t = rayAabb(
          origin.x, origin.y, origin.z,
          dir.x, dir.y, dir.z,
          b.min.x, b.min.y, b.min.z,
          b.max.x, b.max.y, b.max.z,
        );
        if (t !== null && t >= 0 && t < hitT) {
          hitT = t;
          hitEntity = target;
          hitPart = hb.part;
        }
      }
    }

    const end = new THREE.Vector3();
    if (hitEntity && hitT < wallT && hitT <= range) {
      end.copy(origin).addScaledVector(dir, hitT);
      const dist = hitT;
      const falloff = 1 - clamp((dist - 34) / 180, 0, 0.42);
      const base = weapon.def.damage * HIT_MULTIPLIERS[hitPart] * falloff;
      this.damageEntity(hitEntity, shooter, base, hitPart, weapon, end);
      if (kind === 'gun') this.spawnTracer(origin, end, 0xf6dca0);
      this.spawnImpact(end, 0x8f2a1f, 7, true);
    } else if (wallT < Infinity && wallT <= range) {
      end.copy(origin).addScaledVector(dir, wallT);
      if (kind === 'gun') {
        this.spawnTracer(origin, end, 0xe9cf93);
        this.spawnImpact(end, 0xc6ad7d, 5, false);
      }
    } else {
      end.copy(origin).addScaledVector(dir, range);
      if (kind === 'gun') this.spawnTracer(origin, end, 0xe9cf93);
    }
  }

  private damageEntity(victim: Entity, attacker: Entity, rawDamage: number, part: HitPart, weapon: WeaponInstance, point: THREE.Vector3): void {
    if (!victim.alive) return;
    let damage = rawDamage;
    if (victim.armor > 0) {
      const potential = damage * 0.5 * (1 - weapon.def.armorPen);
      const absorbed = Math.min(victim.armor, potential);
      victim.armor = Math.max(0, victim.armor - absorbed);
      damage -= absorbed;
    }
    victim.health = Math.max(0, victim.health - damage);
    victim.lastDamageAt = this.simTime;
    const human = this.getHuman();
    if (attacker.id === this.humanId && human) {
      this.hitMarkerUntil = this.simTime + 0.22;
      this.hitMarkerHead = part === 'head';
      this.audio.hit(part === 'head');
      this.shake = Math.min(0.1, this.shake + 0.02);
    }
    if (victim.id === this.humanId) {
      this.damageFlash = Math.min(1, this.damageFlash + damage / 55);
      this.shake = Math.min(0.65, this.shake + damage / 220);
      this.audio.damage();
    }
    if (victim.ai) {
      if (!victim.ai.targetId || Math.random() < 0.75) {
        victim.ai.targetId = attacker.id;
        victim.ai.targetVisible = false;
        victim.ai.lastSeen = { x: attacker.position.x, z: attacker.position.z };
        victim.ai.lastSeenAt = this.simTime;
        victim.ai.reactionUntil = this.simTime + rand(0.12, 0.3);
      }
    }
    if (victim.health <= 0) {
      this.killEntity(victim, attacker, weapon, part === 'head');
    }
    this.emitHud();
  }

  private killEntity(victim: Entity, killer: Entity, weapon: WeaponInstance, headshot: boolean): void {
    if (!victim.alive) return;
    victim.alive = false;
    victim.deathAt = this.simTime;
    victim.deaths++;
    killer.kills++;
    victim.velocityY = 0;
    this.killfeed.push({
      id: ++this.killfeedId,
      killer: killer.name,
      victim: victim.name,
      killerTeam: killer.team,
      victimTeam: victim.team,
      weapon: weapon.def.shortName,
      headshot,
      age: 0,
      at: this.simTime,
    });
    if (this.killfeed.length > 6) this.killfeed.shift();
    this.audio.kill();

    // Bomb drops on death.
    if (this.bomb.carriedBy === victim.id && !this.bomb.planted) {
      this.bomb.carriedBy = null;
      this.bomb.dropped = true;
      this.bomb.position.set(victim.position.x, 0.02, victim.position.z);
      this.bombMesh.visible = true;
      this.bombMesh.position.copy(this.bomb.position);
      if (victim.team === this.playerTeam) {
        this.message = 'C4 已掉落';
        this.messageSub = '队友可以靠近拾取炸弹';
      }
    }

    if (victim.id === this.humanId) {
      const mates = this.aliveEntities(this.playerTeam);
      if (mates.length) {
        this.spectateId = mates[0].id;
        this.takeoverAt = this.simTime + 2.5;
        this.message = '你已阵亡';
        this.messageSub = '2.5 秒后自动接管存活队友 · 按空格立即接管';
      } else {
        this.message = '你已阵亡';
        this.messageSub = '队伍已无存活成员';
      }
      this.fireHeld = false;
      this.scopeHeld = false;
      this.scoped = false;
    }
    this.emitHud(true);
  }

  private alertNearbyBots(shooter: Entity): void {
    for (const e of this.entities) {
      if (!e.alive || e.team === shooter.team || !e.ai) continue;
      if (e.ai.targetVisible) continue;
      const d = dist2({ x: e.position.x, z: e.position.z }, { x: shooter.position.x, z: shooter.position.z });
      if (d < 19) {
        e.ai.targetId = shooter.id;
        e.ai.lastSeen = { x: shooter.position.x, z: shooter.position.z };
        e.ai.lastSeenAt = this.simTime;
        e.ai.reactionUntil = this.simTime + rand(0.2, 0.45);
      }
    }
  }

  private audioPan(source: THREE.Vector3): number {
    const human = this.getHuman();
    if (!human) return 0;
    const dx = source.x - human.position.x;
    const dz = source.z - human.position.z;
    const rightX = Math.cos(human.yaw);
    const rightZ = -Math.sin(human.yaw);
    const d = Math.max(1, Math.hypot(dx, dz));
    return clamp((dx * rightX + dz * rightZ) / d, -1, 1);
  }

  // -------------------------------------------------------------------------
  // AI
  // -------------------------------------------------------------------------

  private updateBots(dt: number): void {
    if (this.phase !== 'live' && this.phase !== 'planted') {
      // Let bots settle and look around during freeze without moving.
      for (const e of this.entities) {
        if (!e.alive || e.id === this.humanId || !e.ai) continue;
        e.ai.wantsPlant = false;
        e.ai.wantsDefuse = false;
      }
      return;
    }
    for (const e of this.entities) {
      if (!e.alive || e.id === this.humanId || !e.ai) continue;
      const ai = e.ai;
      const now = this.simTime;
      if (now >= ai.nextThink) {
        ai.nextThink = now + rand(0.13, 0.2);
        this.aiThink(e, ai);
      }
      if (ai.targetId) {
        const target = this.getEntity(ai.targetId);
        if (!target || !target.alive) {
          ai.targetId = null;
          ai.targetVisible = false;
        }
      }
      const target = this.getEntity(ai.targetId);
      if (target && target.alive && ai.targetVisible) {
        this.aiCombat(e, ai, target, dt);
      } else if (target && target.alive && ai.lastSeen && now - ai.lastSeenAt < 5) {
        this.aiInvestigate(e, ai, dt);
      } else {
        ai.targetId = ai.targetId && target && target.alive ? ai.targetId : null;
        this.aiObjective(e, ai, dt);
      }
    }
    this.separateEntities();
  }

  private aiThink(e: Entity, ai: AIState): void {
    const now = this.simTime;
    const enemies = this.entities.filter((o) => o.alive && o.team !== e.team);
    let best: Entity | null = null;
    let bestScore = -Infinity;
    for (const target of enemies) {
      const d = dist2({ x: e.position.x, z: e.position.z }, { x: target.position.x, z: target.position.z });
      if (d > 52) continue;
      if (ai.targetId !== target.id && d > 3) {
        const dx = target.position.x - e.position.x;
        const dz = target.position.z - e.position.z;
        const fx = -Math.sin(e.yaw);
        const fz = -Math.cos(e.yaw);
        const dot = (dx * fx + dz * fz) / Math.max(0.001, d);
        if (dot < -0.34) continue;
      }
      if (!this.hasLineOfSight(e, target)) continue;
      const score = -d + (target.id === ai.targetId ? 7 : 0) + (target.health < 40 ? 5 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = target;
      }
    }
    if (best) {
      if (ai.targetId !== best.id) {
        ai.reactionUntil = now + rand(0.24, 0.52);
        ai.burstLeft = Math.floor(rand(2, 6));
      }
      ai.targetId = best.id;
      ai.targetVisible = true;
      ai.lastSeen = { x: best.position.x, z: best.position.z };
      ai.lastSeenAt = now;
    } else {
      ai.targetVisible = false;
      if (ai.targetId && ai.lastSeen && now - ai.lastSeenAt > 5.5) ai.targetId = null;
    }
  }

  private hasLineOfSight(a: Entity, b: Entity): boolean {
    const origins = [
      new THREE.Vector3(a.position.x, a.position.y + PLAYER_EYE, a.position.z),
    ];
    const targets = [
      new THREE.Vector3(b.position.x, b.position.y + 1.55, b.position.z),
      new THREE.Vector3(b.position.x, b.position.y + 1.1, b.position.z),
      new THREE.Vector3(b.position.x, b.position.y + 0.7, b.position.z),
    ];
    for (const o of origins) {
      for (const t of targets) {
        const dir = t.clone().sub(o);
        const len = dir.length();
        if (len < 0.01) return true;
        dir.divideScalar(len);
        if (this.lineClear(o, dir, len - 0.2)) return true;
      }
    }
    return false;
  }

  private lineClear(origin: THREE.Vector3, dir: THREE.Vector3, maxDist: number): boolean {
    for (const solid of this.map.solids) {
      const t = rayAabb(
        origin.x, origin.y, origin.z,
        dir.x, dir.y, dir.z,
        solid.rect.minX, solid.minY, solid.rect.minZ,
        solid.rect.maxX, solid.maxY, solid.rect.maxZ,
      );
      if (t !== null && t >= 0 && t < maxDist) return false;
    }
    return true;
  }

  private aiCombat(e: Entity, ai: AIState, target: Entity, dt: number): void {
    ai.mode = 'combat';
    ai.wantsPlant = false;
    ai.wantsDefuse = false;
    const dx = target.position.x - e.position.x;
    const dz = target.position.z - e.position.z;
    const dist = Math.hypot(dx, dz);
    const safeDist = Math.max(0.001, dist);
    const aimY = target.position.y + (Math.random() < 0.5 ? 1.55 : 1.2);
    const desiredYaw = Math.atan2(-dx, -dz);
    const desiredPitch = Math.atan2(aimY - (e.position.y + PLAYER_EYE), Math.max(0.2, dist));
    e.yaw = moveAngle(e.yaw, desiredYaw, 8.6 * dt);
    e.pitch = angleLerp(e.pitch, desiredPitch, Math.min(1, dt * 8));
    const aimError = Math.abs(normalizeAngle(e.yaw - desiredYaw));
    const weapon = activeWeapon(e.inventory);
    const now = this.simTime;

    if (now >= ai.reactionUntil && aimError < 0.16 && !e.reloading && now >= e.nextFireAt) {
      if (ai.burstLeft <= 0) {
        ai.burstLeft = Math.floor(rand(3, 7));
        e.nextFireAt = now + rand(0.28, 0.7);
      } else {
        const fired = this.tryFire(e);
        if (fired) ai.burstLeft--;
        e.nextFireAt = Math.max(e.nextFireAt, now + (weapon.def.fireInterval / 1000) * rand(1.02, 1.55));
      }
    }

    if (e.reloading && weapon.ammo > 0) e.reloading = false;
    // Close the distance, strafe in the mid range, or back out at point blank.
    let mx = 0;
    let mz = 0;
    const nowT = this.simTime;
    if (dist > 15) {
      mx = dx / safeDist;
      mz = dz / safeDist;
    } else if (dist < 4.5) {
      mx = -dx / safeDist;
      mz = -dz / safeDist;
    } else {
      if (nowT > ai.nextStrafeAt) {
        ai.strafeDir *= -1;
        ai.nextStrafeAt = nowT + rand(0.5, 1.3);
      }
      mx = (-dz / safeDist) * ai.strafeDir;
      mz = (dx / safeDist) * ai.strafeDir;
    }
    const speed = (dist > 15 ? 3.4 : 2.15) * weapon.def.speedFactor;
    e.position.x += mx * speed * dt;
    e.position.z += mz * speed * dt;
    this.resolveEntityCollisions(e);
    e.speed = Math.hypot(mx, mz) * speed;
  }

  private aiInvestigate(e: Entity, ai: AIState, dt: number): void {
    ai.mode = 'investigate';
    ai.wantsPlant = false;
    ai.wantsDefuse = false;
    if (!ai.lastSeen) return;
    const goal = ai.lastSeen;
    const d = dist2({ x: e.position.x, z: e.position.z }, goal);
    if (d < 1.2) {
      e.yaw += dt * 1.7;
      e.speed = 0;
      if (this.simTime - ai.lastSeenAt > 1.6) ai.targetId = null;
      return;
    }
    const key = `seen:${Math.round(goal.x)}:${Math.round(goal.z)}`;
    this.aiGoTo(e, ai, goal, key, dt, 0.92);
    const dx = goal.x - e.position.x;
    const dz = goal.z - e.position.z;
    e.yaw = moveAngle(e.yaw, Math.atan2(-dx, -dz), 4.5 * dt);
  }

  private aiObjective(e: Entity, ai: AIState, dt: number): void {
    ai.mode = 'objective';
    ai.wantsPlant = false;
    ai.wantsDefuse = false;
    const now = this.simTime;
    if (e.team === 'T') {
      if (this.bomb.planted) {
        const site = this.bomb.plantedSite;
        const hold = site ? this.siteHoldPoint(e.team, site.name, e.teamIndex) : this.map.sites[this.tStrategy].center;
        if (now > ai.arrivedAt && dist2({ x: e.position.x, z: e.position.z }, hold) < 1.4) {
          if (now > ai.arrivedAt + 5 + e.teamIndex) {
            ai.arrivedAt = now;
            ai.holdPoint = this.nav.randomNearbyWalkable(hold, 3.2);
          }
        }
        this.aiGoTo(e, ai, ai.holdPoint ?? hold, `defend:${site?.name ?? 'A'}`, dt, 0.78);
        if (ai.path.length === 0) e.yaw += dt * 0.55;
        return;
      }
      if (this.bomb.carriedBy === e.id) {
        const site = this.map.sites[this.tStrategy];
        const inside = this.map.getSiteAt(e.position.x, e.position.z)?.name === site.name;
        if (inside) {
          ai.mode = 'plant';
          ai.wantsPlant = true;
          e.speed = 0;
          if (!ai.targetVisible && e.ai) {
            e.yaw = moveAngle(e.yaw, Math.atan2(-(site.center.x - e.position.x), -(site.center.z - e.position.z)), 1.5 * dt);
          }
          return;
        }
        if (!ai.routeDone) {
          const route = this.tStrategy === 'A' ? { x: 46, z: 8 } : { x: -37, z: 13 };
          if (dist2({ x: e.position.x, z: e.position.z }, route) < 5) {
            ai.routeDone = true;
          } else {
            this.aiGoTo(e, ai, route, `route:${this.tStrategy}`, dt, 1);
            return;
          }
        }
        const safe = this.siteApproachPoint(site.name, e.teamIndex);
        this.aiGoTo(e, ai, safe, `plant:${site.name}`, dt, 1);
        return;
      }
      if (!this.bomb.carriedBy && this.bomb.dropped) {
        const closest = this.nearestTerroristToBomb();
        const goal = closest?.id === e.id ? { x: this.bomb.position.x, z: this.bomb.position.z } : this.siteApproachPoint(this.tStrategy, e.teamIndex);
        this.aiGoTo(e, ai, goal, closest?.id === e.id ? 'bomb:pickup' : `push:${this.tStrategy}`, dt, 0.95);
        return;
      }
      const site = this.map.sites[this.tStrategy];
      if (!ai.routeDone) {
        const route = this.tStrategy === 'A' ? { x: 46, z: 12 } : { x: -37, z: 15 };
        if (dist2({ x: e.position.x, z: e.position.z }, route) < 6) ai.routeDone = true;
        else {
          this.aiGoTo(e, ai, route, `route:${this.tStrategy}`, dt, 1);
          return;
        }
      }
      const safe = this.siteApproachPoint(site.name, e.teamIndex);
      this.aiGoTo(e, ai, safe, `push:${site.name}`, dt, 0.92);
    } else {
      if (this.bomb.planted) {
        const bombPos = { x: this.bomb.position.x, z: this.bomb.position.z };
        const d = dist2({ x: e.position.x, z: e.position.z }, bombPos);
        if (d < 1.65 && !ai.targetVisible) {
          ai.mode = 'defuse';
          ai.wantsDefuse = true;
          e.speed = 0;
          const face = Math.atan2(-(bombPos.x - e.position.x), -(bombPos.z - e.position.z));
          e.yaw = moveAngle(e.yaw, face, 3 * dt);
          return;
        }
        this.aiGoTo(e, ai, bombPos, 'defuse', dt, 1);
        return;
      }
      const role = this.ctRole(e.teamIndex);
      const point = this.ctDefendPoint(role, e.teamIndex);
      if (dist2({ x: e.position.x, z: e.position.z }, point) < 1.3) {
        if (!ai.holdPoint) ai.holdPoint = point;
        if (now > ai.arrivedAt + 7) {
          ai.arrivedAt = now;
          ai.holdPoint = this.nav.randomNearbyWalkable(point, 3.6);
        }
        if (ai.holdPoint) {
          const hp = ai.holdPoint;
          if (dist2({ x: e.position.x, z: e.position.z }, hp) > 0.6) {
            this.aiGoTo(e, ai, hp, `hold:${role}`, dt, 0.7);
          } else {
            e.yaw += dt * 0.35;
            e.speed = 0;
          }
        }
      } else {
        ai.holdPoint = null;
        this.aiGoTo(e, ai, point, `defend:${role}`, dt, 0.92);
      }
    }
  }

  private aiGoTo(e: Entity, ai: AIState, goal: Vec2, key: string, dt: number, speedMult: number): void {
    const now = this.simTime;
    const goalMoved = !ai.pathGoal || dist2(ai.pathGoal, goal) > 2.2;
    if (key !== ai.goalKey || goalMoved || now >= ai.nextRepathAt) {
      ai.path = this.nav.findPath({ x: e.position.x, z: e.position.z }, goal);
      ai.pathIndex = 0;
      ai.pathGoal = { ...goal };
      ai.goalKey = key;
      ai.nextRepathAt = now + 1.25;
    }
    if (ai.path.length === 0) {
      e.speed = 0;
      return;
    }
    let node = ai.path[ai.pathIndex];
    while (node && dist2({ x: e.position.x, z: e.position.z }, node) < 0.62) {
      ai.pathIndex++;
      node = ai.path[ai.pathIndex];
    }
    if (!node) {
      ai.pathGoal = null;
      ai.goalKey = '';
      e.speed = 0;
      return;
    }
    const dx = node.x - e.position.x;
    const dz = node.z - e.position.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.001) return;
    const weapon = activeWeapon(e.inventory);
    const speed = 4.35 * weapon.def.speedFactor * speedMult;
    const beforeX = e.position.x;
    const beforeZ = e.position.z;
    e.position.x += (dx / d) * speed * dt;
    e.position.z += (dz / d) * speed * dt;
    this.resolveEntityCollisions(e);
    const moved = Math.hypot(e.position.x - beforeX, e.position.z - beforeZ);
    if (moved < 0.0002 && ai.path.length > 1) {
      ai.pathIndex++;
    }
    e.yaw = moveAngle(e.yaw, Math.atan2(-dx, -dz), 5.2 * dt);
    e.speed = moved / Math.max(dt, 0.0001);

    if (now > ai.stuckCheckAt) {
      ai.stuckCheckAt = now + 1.1;
      if (dist2(ai.lastCheck, { x: e.position.x, z: e.position.z }) < 0.15 && d > 0.9) {
        ai.path = [];
        ai.nextRepathAt = 0;
        ai.goalKey = '';
      }
      ai.lastCheck = { x: e.position.x, z: e.position.z };
    }
  }

  private ctRole(index: number): 'A' | 'B' {
    return index === 1 || index === 3 ? 'A' : 'B';
  }

  private ctDefendPoint(role: 'A' | 'B', index: number): Vec2 {
    if (role === 'A') {
      const pts = [
        { x: 44, z: -35 }, { x: 34, z: -21 }, { x: 49, z: -13 }, { x: 29, z: -42 }, { x: 38, z: -36 },
      ];
      return pts[index % pts.length];
    }
    const pts = [
      { x: -41, z: -35 }, { x: -48, z: -22 }, { x: -31, z: -37 }, { x: -36, z: -20 }, { x: -29, z: -27 },
    ];
    return pts[index % pts.length];
  }

  private siteApproachPoint(site: 'A' | 'B', index: number): Vec2 {
    if (site === 'A') {
      const pts = [
        { x: 44, z: -30 }, { x: 36, z: -34 }, { x: 48, z: -22 }, { x: 30, z: -27 }, { x: 41, z: -20 },
      ];
      return pts[index % pts.length];
    }
    const pts = [
      { x: -39, z: -34 }, { x: -47, z: -26 }, { x: -31, z: -29 }, { x: -42, z: -20 }, { x: -33, z: -38 },
    ];
    return pts[index % pts.length];
  }

  private siteHoldPoint(team: Team, site: 'A' | 'B', index: number): Vec2 {
    if (team === 'CT') return this.ctDefendPoint(site, index);
    return this.siteApproachPoint(site, index);
  }

  private nearestTerroristToBomb(): Entity | null {
    const ts = this.aliveEntities('T');
    let best: Entity | null = null;
    let bestD = Infinity;
    for (const t of ts) {
      const d = dist2({ x: t.position.x, z: t.position.z }, { x: this.bomb.position.x, z: this.bomb.position.z });
      if (d < bestD) {
        bestD = d;
        best = t;
      }
    }
    return best;
  }

  // -------------------------------------------------------------------------
  // Bomb
  // -------------------------------------------------------------------------

  private updateBombCarry(): void {
    if (this.bomb.planted) return;
    if (!this.bomb.carriedBy && this.bomb.dropped) {
      for (const e of this.aliveEntities('T')) {
        const d = dist2({ x: e.position.x, z: e.position.z }, { x: this.bomb.position.x, z: this.bomb.position.z });
        if (d < 1.35) {
          this.bomb.carriedBy = e.id;
          this.bomb.dropped = false;
          if (e.id === this.humanId) {
            this.message = '已拾取 C4';
            this.messageSub = '在 A 或 B 点内按住 E 安放炸弹';
            this.audio.pickup();
          }
          break;
        }
      }
    }
    if (this.bomb.carriedBy) {
      const carrier = this.getEntity(this.bomb.carriedBy);
      if (!carrier || !carrier.alive) {
        if (carrier) {
          this.bomb.carriedBy = null;
          this.bomb.dropped = true;
          this.bomb.position.set(carrier.position.x, 0.02, carrier.position.z);
        }
      } else {
        const backX = Math.sin(carrier.yaw) * 0.28;
        const backZ = Math.cos(carrier.yaw) * 0.28;
        this.bomb.position.set(carrier.position.x + backX, 0.02, carrier.position.z + backZ);
      }
    }
    this.updateBombAuxiliary();
  }

  private updateBombActions(dt: number): void {
    if (!this.started) return;
    let plantCandidate: Entity | null = null;
    if (this.phase === 'live' && !this.bomb.planted && this.bomb.carriedBy) {
      const carrier = this.getEntity(this.bomb.carriedBy);
      if (carrier && carrier.alive && this.map.getSiteAt(carrier.position.x, carrier.position.z)) {
        if (carrier.id === this.humanId) {
          if (this.interactHeld && carrier.speed < 1.1 && carrier.onGround) plantCandidate = carrier;
        } else if (carrier.ai?.wantsPlant) {
          plantCandidate = carrier;
        }
      }
    }
    if (plantCandidate) {
      if (!this.action || this.action.kind !== 'plant' || this.action.entityId !== plantCandidate.id) {
        this.action = { kind: 'plant', entityId: plantCandidate.id, progress: 0 };
      }
      const oldProgress = this.action.progress;
      this.action.progress += dt / PLANT_TIME;
      this.bomb.plantProgress = this.action.progress;
      if (Math.floor(oldProgress * 8) !== Math.floor(this.action.progress * 8)) this.audio.bombBeep(false);
      if (this.action.progress >= 1) {
        this.plantBomb(plantCandidate);
      }
    } else if (this.action?.kind === 'plant') {
      this.action = null;
      this.bomb.plantProgress = 0;
    }

    let defuseCandidate: Entity | null = null;
    if (this.phase === 'planted' && this.bomb.planted) {
      let bestD = Infinity;
      for (const c of this.aliveEntities('CT')) {
        const d = dist2({ x: c.position.x, z: c.position.z }, { x: this.bomb.position.x, z: this.bomb.position.z });
        if (d > 2.0) continue;
        const eligible = c.id === this.humanId ? this.interactHeld : c.ai?.wantsDefuse === true;
        if (eligible && d < bestD) {
          bestD = d;
          defuseCandidate = c;
        }
      }
    }
    if (defuseCandidate) {
      if (!this.action || this.action.kind !== 'defuse' || this.action.entityId !== defuseCandidate.id) {
        this.action = { kind: 'defuse', entityId: defuseCandidate.id, progress: 0 };
      }
      const oldDefuse = this.action.progress;
      this.action.progress += dt / DEFUSE_TIME;
      this.bomb.defuseProgress = this.action.progress;
      if (Math.floor(oldDefuse * 12) !== Math.floor(this.action.progress * 12)) this.audio.bombDefuse(false);
      if (this.action.progress >= 1) {
        this.defuseBomb(defuseCandidate);
      }
    } else if (this.action?.kind === 'defuse') {
      this.action = null;
      this.bomb.defuseProgress = 0;
    }
  }

  private plantBomb(carrier: Entity): void {
    if (this.bomb.planted) return;
    const site = this.map.getSiteAt(carrier.position.x, carrier.position.z) ?? this.map.sites[this.tStrategy];
    this.bomb.planted = true;
    this.bomb.plantedSite = site;
    this.bomb.carriedBy = null;
    this.bomb.dropped = false;
    this.bomb.position.set(carrier.position.x, 0.03, carrier.position.z);
    this.bomb.timer = BOMB_TIME;
    this.bomb.plantedAt = this.simTime;
    this.bomb.nextBeep = this.simTime + 0.35;
    this.bomb.plantProgress = 1;
    this.bombMesh.visible = true;
    this.bombMesh.position.copy(this.bomb.position);
    this.phase = 'planted';
    this.action = null;
    this.message = `C4 已安放在 ${site.name} 点`;
    this.messageSub = '炸弹将在 40 秒后爆炸 · CT 必须拆除';
    this.objective = carrier.team === this.playerTeam ? `保护 ${site.name} 点炸弹直至爆炸` : `前往 ${site.name} 点拆除 C4`;
    this.audio.bombPlant();
    this.emitHud(true);
  }

  private defuseBomb(ct: Entity): void {
    if (!this.bomb.planted) return;
    this.bomb.defused = true;
    this.bomb.defuseProgress = 1;
    this.action = null;
    this.audio.bombDefuse(true);
    this.message = 'C4 已成功拆除';
    this.messageSub = `${ct.name} 拆除了炸弹`;
    this.endRound('CT', 'C4 已被拆除');
  }

  private updateBombState(dt: number): void {
    if (this.phase === 'planted' && this.bomb.planted) {
      this.bomb.timer = Math.max(0, this.bomb.timer - dt);
      const beepInterval = this.bomb.timer < 10 ? 0.32 : 0.95;
      if (this.simTime >= this.bomb.nextBeep) {
        this.bomb.nextBeep = this.simTime + beepInterval;
        this.audio.bombBeep(this.bomb.timer < 6);
        this.bombLight.intensity = 6;
        const mat = this.bombLed.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 3;
      }
      this.bombLight.intensity = Math.max(0, this.bombLight.intensity - dt * 16);
      const mat = this.bombLed.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = Math.max(0.6, mat.emissiveIntensity - dt * 10);
      if (this.bomb.timer <= 0) {
        this.detonateBomb();
      }
    }
    this.updateBombAuxiliary();
  }

  private updateBombAuxiliary(): void {
    this.bombMesh.visible = this.bomb.planted || this.bomb.dropped || !!this.bomb.carriedBy;
    if (this.bomb.planted) {
      this.bombMesh.position.copy(this.bomb.position);
      this.bombMesh.position.y = 0.02;
      this.bombMesh.rotation.y = 0.3;
    } else if (this.bomb.dropped) {
      this.bombMesh.position.copy(this.bomb.position);
      this.bombMesh.position.y = 0.02;
      this.bombMesh.rotation.y += 0.01;
    } else if (this.bomb.carriedBy) {
      const carrier = this.getEntity(this.bomb.carriedBy);
      if (carrier) {
        this.bombMesh.visible = carrier.id !== this.humanId;
        this.bombMesh.position.copy(this.bomb.position);
        this.bombMesh.position.y = carrier.position.y + 0.55;
        this.bombMesh.rotation.y = carrier.yaw;
      }
    }
  }

  private detonateBomb(): void {
    if (this.phase !== 'planted') return;
    this.bomb.exploded = true;
    this.audio.explosion();
    this.shake = 1.4;
    this.damageFlash = 0.9;
    const center = this.bomb.position.clone();
    const mat = new THREE.MeshBasicMaterial({ color: 0xffd08a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
    const flash = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 12), mat);
    flash.position.copy(center);
    flash.position.y = 2;
    this.scene.add(flash);
    this.explosionFlash = flash;
    const light = new THREE.PointLight(0xffa040, 140, 45, 2);
    light.position.copy(center).add(new THREE.Vector3(0, 3, 0));
    this.scene.add(light);
    this.exploLight = light;
    for (let i = 0; i < 48; i++) {
      const geo = new THREE.BoxGeometry(rand(0.06, 0.22), rand(0.06, 0.22), rand(0.06, 0.22));
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: i % 3 ? 0x3b3124 : 0xff9d3c }));
      mesh.position.copy(center).add(new THREE.Vector3(rand(-0.7, 0.7), rand(0.2, 1.2), rand(-0.7, 0.7)));
      this.scene.add(mesh);
      this.effects.push({
        object: mesh,
        ttl: rand(0.8, 1.8),
        life: 1.8,
        velocity: new THREE.Vector3(rand(-7, 7), rand(5, 15), rand(-7, 7)),
        gravity: -15,
        spin: rand(-12, 12),
      });
    }
    this.endRound('T', 'C4 爆炸 · 反恐精英未能拆除炸弹');
  }

  // -------------------------------------------------------------------------
  // Round state and checks
  // -------------------------------------------------------------------------

  private updateRoundState(dt: number): void {
    if (this.phase === 'freeze') {
      if (this.simTime >= this.freezeEnd) {
        this.phase = 'live';
        this.roundTime = ROUND_TIME;
        this.message = `第 ${this.round} 回合 · 行动开始`;
        this.messageSub = this.playerTeam === 'T' ? `进攻 ${this.tStrategy} 点` : '守住 A / B 点';
        this.audio.roundStart();
        this.emitHud(true);
      }
      return;
    }
    if (this.phase === 'live') {
      this.roundTime = Math.max(0, this.roundTime - dt);
      this.checkElimination();
      if (this.phase !== 'live') return;
      if (this.roundTime <= 0) {
        this.endRound('CT', '回合时间耗尽');
        return;
      }
      return;
    }
    if (this.phase === 'planted') {
      this.checkElimination();
      return;
    }
    if (this.phase === 'roundEnd') {
      if (!this.matchOver && this.roundEndAt > 0 && this.simTime >= this.roundEndAt) {
        this.roundEndAt = 0;
        this.startRound(this.round + 1);
      }
    }
  }

  private checkElimination(): void {
    if (this.phase === 'roundEnd') return;
    const ctAlive = this.aliveEntities('CT').length;
    const tAlive = this.aliveEntities('T').length;
    if (ctAlive === 0) {
      this.endRound('T', '反恐精英已被全部消灭');
      return;
    }
    if (tAlive === 0) {
      if (this.phase === 'planted') {
        // CT still has to defuse the bomb; the round is not over yet.
        return;
      }
      this.endRound('CT', '恐怖分子已被全部消灭');
    }
  }

  private endRound(winner: Team, reason: string): void {
    if (this.phase === 'roundEnd') return;
    this.phase = 'roundEnd';
    this.action = null;
    this.fireHeld = false;
    this.scopeHeld = false;
    this.scoped = false;
    this.interactHeld = false;
    this.bomb.plantProgress = 0;
    this.bomb.defuseProgress = 0;
    if (winner === 'CT') this.ctScore++;
    else this.tScore++;
    const playerWon = winner === this.playerTeam;
    this.message = `${teamSpawnName(winner)}胜利`;
    this.messageSub = reason;
    this.objective = `比分 ${this.ctScore} : ${this.tScore}`;
    this.roundEndAt = this.simTime + 5.8;
    this.audio[playerWon ? 'win' : 'lose']();
    if (this.ctScore >= MATCH_POINT || this.tScore >= MATCH_POINT) {
      this.matchOver = true;
      this.roundEndAt = 0;
      this.messageSub = `${reason} · 比赛结束`;
      if (document.pointerLockElement) document.exitPointerLock();
    }
    this.emitHud(true);
  }

  // -------------------------------------------------------------------------
  // Visuals, effects, camera, minimap
  // -------------------------------------------------------------------------

  private updateEntityVisuals(dt: number): void {
    for (const e of this.entities) {
      e.model.root.position.copy(e.position);
      e.model.root.rotation.y = e.yaw;
      if (e.alive) {
        const moved = Math.hypot(e.position.x - e.lastPosition.x, e.position.z - e.lastPosition.z);
        const speed = Math.max(e.speed, moved / Math.max(dt, 0.0001));
        e.model.update(dt, speed, true);
        e.model.setAimPitch(e.pitch);
        e.model.setWeapon(activeWeapon(e.inventory).def.id);
      } else {
        e.model.update(dt, 0, false);
      }
      if ((this.phase === 'live' || this.phase === 'planted') && e.alive && e.id !== this.humanId && e.speed > 1.15 && e.onGround) {
        e.footstepTimer -= dt;
        if (e.footstepTimer <= 0) {
          e.footstepTimer = clamp(5.2 / Math.max(1, e.speed), 0.3, 0.7);
          const human = this.getHuman();
          const d = human ? Math.hypot(e.position.x - human.position.x, e.position.z - human.position.z) : 0;
          if (d < 22) this.audio.footstep(e.speed > 3.6, d, this.audioPan(e.position));
        }
      }
      e.lastPosition.copy(e.position);
    }
  }

  private spawnTracer(from: THREE.Vector3, to: THREE.Vector3, color: number): void {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending, depthWrite: false });
    const line = new THREE.Line(geo, mat);
    this.scene.add(line);
    this.effects.push({ object: line, ttl: 0.065, life: 0.065, fade: true });
  }

  private spawnImpact(point: THREE.Vector3, color: number, count: number, blood: boolean): void {
    if (this.effects.length > 180) return;
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(blood ? 0.045 : 0.035, blood ? 0.045 : 0.035, blood ? 0.045 : 0.035), mat);
      mesh.position.copy(point);
      this.scene.add(mesh);
      this.effects.push({
        object: mesh,
        ttl: rand(0.25, blood ? 0.65 : 0.5),
        life: blood ? 0.65 : 0.5,
        velocity: new THREE.Vector3(rand(-2.2, 2.2), rand(0.6, 3.2), rand(-2.2, 2.2)),
        gravity: -9,
        fade: true,
      });
    }
  }

  private updateEffects(dt: number): void {
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const e = this.effects[i];
      e.ttl -= dt;
      if (e.velocity) {
        e.velocity.y += (e.gravity ?? 0) * dt;
        e.object.position.addScaledVector(e.velocity, dt);
      }
      if (e.spin) e.object.rotation.x += e.spin * dt;
      if (e.fade) {
        const mat = (e.object as THREE.Mesh).material as THREE.Material & { opacity?: number; transparent?: boolean };
        if (mat && typeof mat.opacity === 'number') {
          mat.transparent = true;
          mat.opacity = clamp(e.ttl / e.life, 0, 1) * 0.9;
        }
      }
      if (e.ttl <= 0) {
        this.scene.remove(e.object);
        const mesh = e.object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) (mesh.material as THREE.Material).dispose();
        this.effects.splice(i, 1);
      }
    }
    this.shake = Math.max(0, this.shake - dt * 2.1);
    this.damageFlash = Math.max(0, this.damageFlash - dt * 1.8);
    if (this.explosionFlash) {
      this.explosionFlash.scale.multiplyScalar(1 + dt * 2.8);
      const mat = (this.explosionFlash as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, mat.opacity - dt * 1.6);
      if (mat.opacity <= 0) {
        this.explosionFlash.removeFromParent();
        this.explosionFlash = null;
      }
    }
    if (this.exploLight) {
      this.exploLight.intensity = Math.max(0, this.exploLight.intensity - dt * 180);
      if (this.exploLight.intensity <= 0) {
        this.exploLight.removeFromParent();
        this.exploLight = null;
      }
    }
  }

  private updateCamera(dt: number): void {
    if (!this.started) return;
    const e = this.getHuman();
    if (!e) return;
    let eyeEntity = e;
    if (!e.alive) {
      const spec = this.getEntity(this.spectateId);
      if (spec && spec.alive) {
        eyeEntity = spec;
      } else {
        const mates = this.aliveEntities(this.playerTeam);
        if (mates.length) {
          this.spectateId = mates[0].id;
          eyeEntity = mates[0];
        }
      }
    }
    const watching = !e.alive;
    const target = watching ? eyeEntity : e;
    const scope = !watching && this.scoped;
    const moving = target.speed;
    if (!watching && target.onGround && moving > 0.2) this.bobPhase += dt * (4.8 + moving * 0.75);
    const bob = !watching && target.onGround ? Math.sin(this.bobPhase * 2) * Math.min(0.045, moving * 0.007) : 0;
    const sway = !watching ? Math.cos(this.bobPhase) * Math.min(0.035, moving * 0.005) : 0;
    const basePos = new THREE.Vector3(target.position.x, target.position.y + PLAYER_EYE + bob, target.position.z);
    basePos.addScaledVector(new THREE.Vector3(Math.cos(target.yaw), 0, -Math.sin(target.yaw)), sway);
    if (this.shake > 0.001) {
      basePos.x += rand(-this.shake, this.shake) * 0.08;
      basePos.y += rand(-this.shake, this.shake) * 0.07;
      basePos.z += rand(-this.shake, this.shake) * 0.08;
    }
    const lerpSpeed = watching ? 8 : 26;
    this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, basePos.x, lerpSpeed, dt);
    this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, basePos.y, lerpSpeed, dt);
    this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, basePos.z, lerpSpeed, dt);
    const targetYaw = target.yaw;
    const targetPitch = watching ? target.pitch - 0.02 : target.pitch;
    this.camera.rotation.y = angleLerp(this.camera.rotation.y, targetYaw, Math.min(1, dt * (watching ? 8 : 28)));
    this.camera.rotation.x = THREE.MathUtils.damp(this.camera.rotation.x, targetPitch, watching ? 8 : 28, dt);
    this.camera.rotation.z = THREE.MathUtils.damp(this.camera.rotation.z, watching ? 0 : this.keys.has('KeyA') && !watching ? 0.012 : this.keys.has('KeyD') && !watching ? -0.012 : 0, 6, dt);

    if (!watching && this.scoped) {
      this.fpRoot.visible = false;
    } else if (!watching && e.alive) {
      this.fpRoot.visible = true;
      this.updateFPTransform(dt, e);
    } else {
      this.fpRoot.visible = false;
    }
    this.updateScopeFov(dt);
    this.lastLookYaw *= Math.exp(-dt * 8);
    this.lastLookPitch *= Math.exp(-dt * 8);
  }

  private updateFPTransform(dt: number, e: Entity): void {
    const w = activeWeapon(e.inventory);
    if (this.fpWeaponId !== w.def.id) this.updateFPWeapon(w.def.id);
    const weapon = w.def;
    const reloading = e.reloading ? clamp(1 - (e.reloadEnd - this.simTime) / Math.max(0.01, weapon.reloadTime), 0, 1) : 0;
    const reloadCurve = Math.sin(reloading * Math.PI);
    const baseX = 0.27;
    const baseY = -0.29;
    const baseZ = -0.68;
    this.fpRoot.position.x = THREE.MathUtils.damp(this.fpRoot.position.x, baseX + this.swayX, 14, dt);
    this.fpRoot.position.y = THREE.MathUtils.damp(this.fpRoot.position.y, baseY + this.swayY - reloadCurve * 0.18, 14, dt);
    this.fpRoot.position.z = THREE.MathUtils.damp(this.fpRoot.position.z, baseZ + this.fpRecoil * 0.055, 16, dt);
    this.fpRoot.rotation.x = THREE.MathUtils.damp(this.fpRoot.rotation.x, this.fpRecoil * 0.1 - reloadCurve * 0.55, 15, dt);
    this.fpRoot.rotation.y = THREE.MathUtils.damp(this.fpRoot.rotation.y, 0.055 + reloadCurve * 0.3 + this.lastLookYaw * 2.2, 14, dt);
    this.fpRoot.rotation.z = THREE.MathUtils.damp(this.fpRoot.rotation.z, reloadCurve * 0.15, 14, dt);
    this.fpRecoil = Math.max(0, this.fpRecoil - dt * 7.5);
    this.swayX = THREE.MathUtils.damp(this.swayX, this.lastLookYaw * 0.7, 9, dt);
    this.swayY = THREE.MathUtils.damp(this.swayY, -this.lastLookPitch * 0.55, 9, dt);
    if (this.fpWeapon) this.fpWeapon.rotation.z = Math.sin(this.bobPhase) * 0.006 * Math.min(1, e.speed / 4);
  }

  private updateFPWeapon(id: WeaponId): void {
    if (this.fpWeaponId === id && this.fpWeapon) return;
    if (this.fpWeapon) {
      this.fpWeaponHost.remove(this.fpWeapon);
      this.fpWeapon = null;
    }
    this.fpWeaponId = id;
    this.fpWeapon = createFirstPersonWeapon(id);
    this.fpWeaponHost.add(this.fpWeapon);
  }

  private updateTeamVision(): void {
    if (this.simTime < this.nextTeamVision) return;
    this.nextTeamVision = this.simTime + 0.18;
    const allies = this.aliveEntities(this.playerTeam);
    if (!allies.length) return;
    for (const enemy of this.aliveEntities(this.playerTeam === 'CT' ? 'T' : 'CT')) {
      let seen = false;
      for (const ally of allies) {
        if (dist2({ x: ally.position.x, z: ally.position.z }, { x: enemy.position.x, z: enemy.position.z }) > 54) continue;
        if (this.hasLineOfSight(ally, enemy)) {
          seen = true;
          break;
        }
      }
      if (seen) {
        this.spotUntil.set(enemy.id, { x: enemy.position.x, z: enemy.position.z, until: this.simTime + 2.2 });
      }
    }
  }

  private updateSpotCleanup(): void {
    for (const [id, info] of this.spotUntil) {
      if (info.until < this.simTime) this.spotUntil.delete(id);
    }
  }

  getMinimapData(): MinimapData {
    const human = this.getHuman();
    const marker = (e: Entity): MinimapMarker => ({ x: e.position.x, z: e.position.z, yaw: e.yaw, team: e.team, alive: e.alive });
    const teammates = this.entities
      .filter((e) => e.team === this.playerTeam && e.id !== this.humanId && e.alive)
      .map(marker);
    const enemies: MinimapMarker[] = [];
    for (const [id, info] of this.spotUntil) {
      const e = this.getEntity(id);
      if (e && e.alive) enemies.push({ x: info.x, z: info.z, team: e.team, alive: true });
    }
    let bomb: MinimapData['bomb'] = null;
    if (this.bomb.planted) bomb = { x: this.bomb.position.x, z: this.bomb.position.z, kind: 'planted' };
    else if (this.bomb.dropped) bomb = { x: this.bomb.position.x, z: this.bomb.position.z, kind: 'dropped' };
    else if (this.bomb.carriedBy) {
      const c = this.getEntity(this.bomb.carriedBy);
      if (c) bomb = { x: c.position.x, z: c.position.z, kind: 'carried' };
    }
    return {
      player: human ? marker(human) : null,
      teammates,
      enemies,
      bomb,
      sites: [
        { name: 'A', x: this.map.sites.A.center.x, z: this.map.sites.A.center.z },
        { name: 'B', x: this.map.sites.B.center.x, z: this.map.sites.B.center.z },
      ],
    };
  }

  // -------------------------------------------------------------------------
  // HUD snapshot
  // -------------------------------------------------------------------------

  private emitHud(force = false): void {
    const now = performance.now();
    if (!force && now - this.lastHudAt < 48) return;
    this.lastHudAt = now;
    const human = this.getHuman();
    const ctAlive = this.aliveEntities('CT').length;
    const tAlive = this.aliveEntities('T').length;
    const weapon = human ? activeWeapon(human.inventory) : null;
    const players: ScoreboardRow[] = this.entities
      .map((e) => ({
        id: e.id,
        name: e.name,
        team: e.team,
        alive: e.alive,
        health: e.health,
        isPlayer: e.id === this.humanId,
        kills: e.kills,
        deaths: e.deaths,
      }))
      .sort((a, b) => b.kills - a.kills || a.deaths - b.deaths);
    const mate = this.getEntity(this.spectateId);
    const actionHint = this.makeActionHint(human);
    const bombCarrier = this.getEntity(this.bomb.carriedBy);
    const hud: HudState = {
      started: this.started,
      paused: this.paused,
      phase: this.phase,
      round: this.round,
      ctScore: this.ctScore,
      tScore: this.tScore,
      roundTime: this.phase === 'planted' ? this.roundTime : this.roundTime,
      bombTime: this.bomb.planted ? this.bomb.timer : 0,
      player: human
        ? {
            team: human.team,
            name: human.name,
            alive: human.alive,
            health: Math.ceil(human.health),
            armor: Math.ceil(human.armor),
            weapon: weapon?.def.name ?? '—',
            slot: human.inventory.slot,
            ammo: weapon && weapon.def.id !== 'knife' ? weapon.ammo : -1,
            reserve: weapon && weapon.def.id !== 'knife' ? weapon.reserve : -1,
            reloading: human.reloading,
            scoped: this.scoped,
            moving: human.speed > 0.5,
            spread: this.currentSpread(human),
            hasPrimary: !!human.inventory.primary,
            hasBomb: this.bomb.carriedBy === human.id,
            controlledName: human.name,
            takeoverIn: human.alive ? 0 : this.takeoverAt > 0 ? Math.max(0, this.takeoverAt - this.simTime) : 0,
            spectating: !human.alive && !!mate,
          }
        : null,
      ctAlive,
      tAlive,
      killfeed: this.killfeed.map((k) => ({ ...k, age: this.simTime - (k.at ?? this.simTime) })),
      bomb: {
        planted: this.bomb.planted,
        plantedSite: this.bomb.plantedSite?.name ?? null,
        carriedBy: bombCarrier?.id === this.humanId ? '你' : bombCarrier?.name ?? null,
        dropped: this.bomb.dropped,
        defusing: this.action?.kind === 'defuse',
        defuseProgress: this.bomb.defuseProgress,
        plantProgress: this.bomb.plantProgress,
        actionHint,
      },
      message: this.message,
      messageSub: this.messageSub,
      buyOpen: this.buyOpen,
      scoreboard: players,
      hitMarker: Math.max(0, this.hitMarkerUntil - this.simTime),
      damageFlash: this.damageFlash,
      objective: this.objective,
      pointerLocked: document.pointerLockElement === this.renderer.domElement,
      matchOver: this.matchOver,
      scoreboardOpen: this.showScoreboard,
    };
    this.onHud(hud);
  }

  private makeActionHint(e: Entity | null): string {
    if (!e || !e.alive) return '';
    if (this.phase === 'freeze') {
      return this.round === 1 ? '手枪局 · 准备阶段' : '按 B 打开军械库';
    }
    if (e.team === 'T' && this.bomb.carriedBy === e.id && !this.bomb.planted) {
      const site = this.map.getSiteAt(e.position.x, e.position.z);
      if (site) return this.interactHeld ? '正在安放 C4…' : '按住 E 安放 C4';
      return '将 C4 带到 A 或 B 点';
    }
    if (e.team === 'CT' && this.bomb.planted) {
      const d = dist2({ x: e.position.x, z: e.position.z }, { x: this.bomb.position.x, z: this.bomb.position.z });
      if (d < 2.1) return this.interactHeld ? '正在拆除 C4…' : '按住 E 拆除 C4';
      return '前往 C4 位置进行拆除';
    }
    if (e.team === 'CT') return '守住 A / B 点';
    if (this.bomb.carriedBy === e.id) return '将 C4 带至炸弹点';
    return '推进至炸弹点';
  }

  // -------------------------------------------------------------------------
  // Resize / disposal
  // -------------------------------------------------------------------------

  private resize(): void {
    if (!this.container) return;
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.unbindEvents();
    this.resizeObserver.disconnect();
    for (const e of this.entities) {
      this.scene.remove(e.model.root);
    }
    this.effects.forEach((e) => {
      this.scene.remove(e.object);
    });
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

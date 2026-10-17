import * as THREE from 'three';
import {
  FLOOR_RECTS,
  PLANT_SITES,
  SPAWNS,
  getPlantSiteAt,
  getZoneAt,
} from '../data/mapLayout';
import {
  PART_MULTIPLIERS,
  PLAYER_LOADOUT_OPTIONS,
  WEAPONS,
  pistolRoundLoadout,
  standardBotLoadout,
} from '../data/weapons';
import { BotController, BotBombView, BotWorld } from './AI';
import { AudioEngine } from './AudioEngine';
import { C4Prop } from './C4';
import { Combatant } from './Combatant';
import { FirstPersonView } from './FirstPersonView';
import { Dust2Map } from './MapBuilder';
import { NavGrid } from './NavGrid';
import { PhysicsWorld, clamp, normalizeAngle } from './PhysicsWorld';
import { disposeObject3D } from './WeaponModels';
import type {
  BombStatus,
  GamePhase,
  HUDState,
  HitPart,
  KillFeedItem,
  LoadoutSpec,
  MinimapAgent,
  MinimapSnapshot,
  Team,
  WeaponDef,
  WeaponId,
  WeaponSlot,
} from './types';
import { UIStore, gameUI } from './UIStore';

const PLAYER_RADIUS = 0.36;
const PLAYER_HEIGHT = 1.78;
const EYE_HEIGHT = 1.63;
const CROUCH_EYE_HEIGHT = 1.08;
const BASE_SPEED = 5.35;
const GRAVITY = 19.5;
const JUMP_SPEED = 5.65;
const FREEZE_DURATION = 4.0;
const ROUND_DURATION = 105;
const BOMB_DURATION = 40;
const PLANT_DURATION = 3.2;
const DEFUSE_DURATION = 8.0;
const MATCH_SCORE = 7;
const SENSITIVITY = 0.00205;

interface BombAction {
  actorId: number;
  type: 'plant' | 'defuse';
  progress: number;
  duration: number;
  originX: number;
  originZ: number;
  lastTick: number;
}

interface BombRuntime {
  status: BombStatus;
  carrierId: number | null;
  site: 'A' | 'B' | null;
  timer: number;
  action: BombAction | null;
  beepIn: number;
  position: THREE.Vector3;
}

interface RoundResult {
  winner: Team | null;
  reason: string;
  playerWon: boolean;
}

interface EffectParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  gravity: number;
}

interface Tracer {
  line: THREE.Line;
  material: THREE.LineBasicMaterial;
  life: number;
}

interface ExplosionEffect {
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  light: THREE.PointLight;
  life: number;
  maxLife: number;
}

const T_NAMES = ['Yasin', 'Rakan', 'Omar', 'Hakim', 'Tariq'];
const CT_NAMES = ['Aegis', 'Vega', 'Rook', 'Juno', 'Cypher'];
const BOT_NAMES_PLAYER_TEAM = { T: T_NAMES, CT: CT_NAMES };

export class GameEngine implements BotWorld {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(72, 1, 0.08, 700);
  readonly physics = new PhysicsWorld();
  readonly nav: NavGrid;
  readonly map: Dust2Map;
  readonly audio = new AudioEngine();
  readonly c4: C4Prop;
  readonly ui: UIStore;

  agents: Combatant[] = [];
  bots = new Map<number, BotController>();
  playerTeam: Team = 'CT';
  playerAgentId = -1;
  designatedPlayerId = -1;
  roundNumber = 1;
  scoreCT = 0;
  scoreT = 0;
  phase: GamePhase = 'menu';
  attackSite: 'A' | 'B' = 'A';
  roundNumberStartedAt = 0;
  bombView: BotBombView = {
    status: 'carried',
    x: 0,
    z: 0,
    carrierId: null,
    plantedSite: null,
    action: null,
  };

  private readonly canvas: HTMLCanvasElement;
  private readonly firstPerson: FirstPersonView;
  private readonly agentById = new Map<number, Combatant>();
  private readonly raycaster = new THREE.Raycaster();
  private readonly particles: EffectParticle[] = [];
  private readonly tracers: Tracer[] = [];
  private readonly explosions: ExplosionEffect[] = [];
  private readonly sharedGeometry = {
    dust: new THREE.SphereGeometry(0.04, 4, 3),
    blood: new THREE.SphereGeometry(0.045, 4, 3),
    spark: new THREE.SphereGeometry(0.025, 4, 3),
  };
  private readonly sharedMaterial = {
    dust: new THREE.MeshBasicMaterial({ color: '#c3a97d' }),
    blood: new THREE.MeshBasicMaterial({ color: '#7d1008' }),
    spark: new THREE.MeshBasicMaterial({ color: '#ffd57a' }),
  };

  private readonly bomb: BombRuntime = {
    status: 'carried',
    carrierId: null,
    site: null,
    timer: 0,
    action: null,
    beepIn: 0,
    position: new THREE.Vector3(),
  };
  private readonly botBombView: BotBombView = this.bombView;
  private freezeTimeLeft = FREEZE_DURATION;
  private roundTimeLeft = ROUND_DURATION;
  private playerLoadoutSelection: LoadoutSpec = {
    primary: 'ak47',
    secondary: 'glock',
    armor: 100,
    helmet: true,
  };
  private roundResult: RoundResult = { winner: null, reason: '', playerWon: false };
  private matchWinner: Team | null = null;
  private killfeed: KillFeedItem[] = [];
  private killSeq = 1;
  private elapsed = 0;
  private lastFrame = 0;
  private animationFrame = 0;
  private disposed = false;
  private fps = 60;
  private fpsAccum = 0;
  private fpsFrames = 0;
  private hudAccum = 0;
  private pointerLocked = false;
  private keys = new Set<string>();
  private jumpQueued = false;
  private eHeld = false;
  private triggerHeld = false;
  private semiQueued = false;
  private semiQueuedAt = 0;
  private yaw = 0;
  private pitch = 0;
  private footY = 0;
  private velocityY = 0;
  private grounded = true;
  private crouching = false;
  private movingSpeed = 0;
  private bobPhase = 0;
  private stepTimer = 0;
  private viewRecoilPitch = 0;
  private viewRecoilYaw = 0;
  private recoilLastShotAt = -100;
  private crosshairBloom = 0;
  private switchReadyAt = 0;
  private cameraShake = 0;
  private hudFlash: HUDState['flash'] = null;
  private hudFlashAt = 0;
  private prompt = '';
  private deathOverlay = false;
  private deathCountdown = 0;
  private pendingTakeoverId = -1;
  private deathCameraPos = new THREE.Vector3();
  private deathYaw = 0;
  private deathPitch = 0;
  private deathElapsed = 0;
  private lastCallout = 'DUST II';
  private hasPlayedEmptyClick = false;
  private lastScopeAt = -100;
  private lastInteractionSound = -100;
  private visibleEnemyCacheAt = -100;
  private visibleEnemyIds = new Set<number>();
  private menuTime = 0;
  private lowQuality = false;
  private lowFpsFrames = 0;

  private readonly onResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();
  };

  private readonly onPointerLockChange = (): void => {
    this.pointerLocked = document.pointerLockElement === this.canvas;
    if (!this.pointerLocked) {
      this.triggerHeld = false;
      this.semiQueued = false;
    }
    this.syncHud();
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.code === 'KeyM') {
      if (!event.repeat) this.toggleMute();
      return;
    }
    if (this.phase === 'menu' || this.phase === 'roundEnd' || this.phase === 'matchEnd') return;
    const gameKeys = new Set([
      'KeyW',
      'KeyA',
      'KeyS',
      'KeyD',
      'Space',
      'ShiftLeft',
      'ControlLeft',
      'KeyE',
      'KeyR',
      'Digit1',
      'Digit2',
      'Digit3',
      'KeyF',
      'Tab',
    ]);
    if (gameKeys.has(event.code)) event.preventDefault();
    if (event.code === 'Space' && !event.repeat) this.jumpQueued = true;
    if (event.code === 'KeyE') this.eHeld = true;
    if (event.repeat) {
      this.keys.add(event.code);
      return;
    }
    if (event.code === 'KeyR') this.reloadPlayer();
    if (event.code === 'Digit1') this.switchPlayerSlot('primary');
    if (event.code === 'Digit2') this.switchPlayerSlot('secondary');
    if (event.code === 'Digit3') this.switchPlayerSlot('melee');
    if (event.code === 'KeyF') this.takeOverNow();
    this.keys.add(event.code);
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    this.keys.delete(event.code);
    if (event.code === 'KeyE') this.eHeld = false;
  };

  private readonly onMouseDown = (event: MouseEvent): void => {
    if (this.phase === 'menu' || this.phase === 'roundEnd' || this.phase === 'matchEnd') return;
    if (!this.pointerLocked) {
      if (event.button === 0) {
        this.requestPointerLock();
        event.preventDefault();
      }
      return;
    }
    if (event.button === 0) {
      this.triggerHeld = true;
      this.semiQueued = true;
      this.semiQueuedAt = this.elapsed;
      this.hasPlayedEmptyClick = false;
    } else if (event.button === 2) {
      event.preventDefault();
      this.toggleScope();
    }
  };

  private readonly onMouseUp = (event: MouseEvent): void => {
    if (event.button === 0) this.triggerHeld = false;
  };

  private readonly onMouseMove = (event: MouseEvent): void => {
    if (!this.pointerLocked || this.phase === 'menu' || this.phase === 'roundEnd' || this.phase === 'matchEnd') return;
    const player = this.getPlayer();
    if (!player || !player.alive) return;
    const weapon = player.activeWeapon;
    const sensitivity = weapon.scoped && weapon.id === 'awp' ? SENSITIVITY * 0.42 : SENSITIVITY;
    this.yaw -= event.movementX * sensitivity;
    this.pitch -= event.movementY * sensitivity;
    this.pitch = clamp(this.pitch, -1.43, 1.43);
    this.yaw = normalizeAngle(this.yaw);
    this.firstPerson.addLook(event.movementX, event.movementY);
  };

  private readonly onWheel = (event: WheelEvent): void => {
    if (!this.pointerLocked || this.phase !== 'live' && this.phase !== 'freeze') return;
    const player = this.getPlayer();
    if (!player || !player.alive) return;
    event.preventDefault();
    const slots: WeaponSlot[] = [];
    if (player.primary) slots.push('primary');
    slots.push('secondary', 'melee');
    const index = slots.indexOf(player.activeSlot);
    const next = slots[(index + (event.deltaY > 0 ? 1 : -1) + slots.length) % slots.length];
    this.switchPlayerSlot(next);
  };

  private readonly onContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  private readonly onBlur = (): void => {
    this.keys.clear();
    this.triggerHeld = false;
    this.eHeld = false;
  };

  constructor(canvas: HTMLCanvasElement, ui: UIStore = gameUI) {
    this.canvas = canvas;
    this.ui = ui;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !navigator.webdriver,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.autoClear = false;
    this.renderer.setClearColor('#c3ac85', 1);

    try {
      const gl = this.renderer.getContext();
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const rendererName = debugInfo
        ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)).toLowerCase()
        : '';
      if (/swiftshader|llvmpipe|software|softpipe/.test(rendererName)) {
        this.applyLowQuality();
      }
    } catch {
      // Renderer introspection is best-effort.
    }

    this.scene.background = new THREE.Color('#b8a27d');
    this.scene.fog = new THREE.FogExp2('#c5b08c', 0.0042);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.map = new Dust2Map(this.scene, this.physics);
    this.nav = new NavGrid(this.physics);
    this.c4 = new C4Prop();
    this.c4.group.visible = false;
    this.scene.add(this.c4.group);
    this.firstPerson = new FirstPersonView('CT');

    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('blur', this.onBlur);
    document.addEventListener('pointerlockchange', this.onPointerLockChange);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.canvas.addEventListener('contextmenu', this.onContextMenu);

    this.ui.reset();
    this.ui.patch({
      phase: 'menu',
      playerTeam: this.playerTeam,
      pointerLocked: false,
      loadout: { ...this.playerLoadoutSelection },
    });
    if (import.meta.env.DEV) {
      (window as unknown as { __dust2?: GameEngine }).__dust2 = this;
    }
    this.updateMenuCamera(0);
    this.lastFrame = performance.now();
    this.animationFrame = requestAnimationFrame(this.frame);
  }

  private applyLowQuality(): void {
    if (this.lowQuality) return;
    this.lowQuality = true;
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(0.72);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  private maybeDegradeQuality(): void {
    if (this.lowQuality || this.elapsed < 4) return;
    if (this.fps > 0 && this.fps < 25) {
      this.lowFpsFrames++;
      if (this.lowFpsFrames > 8) {
        this.applyLowQuality();
        this.lowFpsFrames = 0;
      }
    } else {
      this.lowFpsFrames = 0;
    }
  }

  getPlayer(): Combatant | null {
    return this.agentById.get(this.playerAgentId) ?? null;
  }

  get designatedPlayer(): Combatant | null {
    return this.agentById.get(this.designatedPlayerId) ?? null;
  }

  startMatch(team: Team): void {
    if (this.disposed) return;
    void this.audio.init();
    this.playerTeam = team;
    this.ui.setPlayerTeam(team);
    this.scoreCT = 0;
    this.scoreT = 0;
    this.roundNumber = 1;
    this.matchWinner = null;
    this.roundResult = { winner: null, reason: '', playerWon: false };
    this.playerLoadoutSelection = {
      primary: team === 'T' ? 'ak47' : 'm4a4',
      secondary: team === 'T' ? 'glock' : 'usp',
      armor: 100,
      helmet: true,
    };
    this.rebuildRoster();
    this.beginRound();
    this.requestPointerLock();
    this.syncHud();
  }

  startNextRound(loadout: LoadoutSpec): void {
    if (this.phase !== 'roundEnd') return;
    this.applyLoadoutSelection(loadout);
    this.roundNumber++;
    this.beginRound();
    this.requestPointerLock();
    this.syncHud();
  }

  restartMatch(): void {
    if (this.phase !== 'matchEnd' && this.phase !== 'roundEnd') return;
    void this.startMatch(this.playerTeam);
  }

  returnToMenu(): void {
    this.releasePointerLock();
    this.phase = 'menu';
    this.deathOverlay = false;
    this.pendingTakeoverId = -1;
    this.clearRoster();
    this.bots.clear();
    this.bomb.status = 'carried';
    this.bomb.carrierId = null;
    this.bomb.action = null;
    this.c4.group.visible = false;
    this.triggerHeld = false;
    this.eHeld = false;
    this.ui.reset();
    this.ui.patch({ phase: 'menu', playerTeam: this.playerTeam, pointerLocked: false });
    this.updateMenuCamera(0);
  }

  requestPointerLock(): void {
    if (document.pointerLockElement === this.canvas) return;
    if (this.phase === 'menu') return;
    try {
      const result = this.canvas.requestPointerLock() as unknown;
      if (result && typeof (result as Promise<void>).catch === 'function') {
        (result as Promise<void>).catch(() => {
          // The HUD will keep showing the click-to-lock hint.
        });
      }
    } catch {
      // Pointer lock is optional; mouse clicks can retry.
    }
  }

  releasePointerLock(): void {
    if (document.pointerLockElement === this.canvas) {
      try {
        document.exitPointerLock();
      } catch {
        // noop
      }
    }
  }

  toggleMute(): void {
    this.audio.setMuted(!this.audio.isMuted);
    this.syncHud();
  }

  takeOverNow(): void {
    if (this.phase !== 'live' || !this.deathOverlay) return;
    const candidate = this.findTakeoverCandidate();
    if (!candidate) return;
    this.takeOverCombatant(candidate);
  }

  setMuted(muted: boolean): void {
    this.audio.setMuted(muted);
    this.syncHud();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('pointerlockchange', this.onPointerLockChange);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.canvas.removeEventListener('contextmenu', this.onContextMenu);
    this.clearRoster();
    this.firstPerson.dispose();
    this.audio.dispose();
    this.c4.dispose();
    this.map.dispose();
    for (const effect of this.particles) if (effect.mesh.parent) effect.mesh.parent.remove(effect.mesh);
    for (const tracer of this.tracers) {
      if (tracer.line.parent) tracer.line.parent.remove(tracer.line);
      tracer.line.geometry.dispose();
      tracer.material.dispose();
    }
    this.sharedGeometry.dust.dispose();
    this.sharedGeometry.blood.dispose();
    this.sharedGeometry.spark.dispose();
    this.sharedMaterial.dust.dispose();
    this.sharedMaterial.blood.dispose();
    this.sharedMaterial.spark.dispose();
    this.renderer.dispose();
    this.ui.reset();
  }

  // ---------------------------------------------------------------------------
  // Match and round lifecycle
  // ---------------------------------------------------------------------------

  private rebuildRoster(): void {
    this.clearRoster();
    this.bots.clear();
    const rosters: Record<Team, Combatant[]> = { CT: [], T: [] };
    let id = 0;
    for (const team of ['CT', 'T'] as const) {
      for (let index = 0; index < 5; index++) {
        const names = BOT_NAMES_PLAYER_TEAM[team];
        const name = team === this.playerTeam && index === 0 ? 'YOU' : names[index];
        const agent = new Combatant(id, name, team, index);
        for (const hitbox of agent.rig.hitboxes) {
          hitbox.mesh.userData.agentId = id;
          hitbox.mesh.userData.hitPart = hitbox.part;
        }
        agent.rig.root.visible = false;
        this.scene.add(agent.rig.root);
        rosters[team].push(agent);
        this.agentById.set(id, agent);
        this.agents.push(agent);
        id++;
      }
    }
    this.designatedPlayerId = rosters[this.playerTeam][0].id;
    this.playerAgentId = this.designatedPlayerId;
  }

  private clearRoster(): void {
    if (this.c4.group.parent && this.agents.some((agent) => agent.rig.root === this.c4.group.parent)) {
      this.c4.group.parent.remove(this.c4.group);
      this.scene.add(this.c4.group);
    }
    for (const agent of this.agents) {
      this.scene.remove(agent.rig.root);
      disposeObject3D(agent.rig.root);
    }
    this.agents = [];
    this.agentById.clear();
    this.bots.clear();
    this.playerAgentId = -1;
    this.designatedPlayerId = -1;
    this.nextBotFootstepTime.clear();
  }

  private beginRound(): void {
    if (this.agents.length === 0) return;
    this.phase = 'freeze';
    this.freezeTimeLeft = FREEZE_DURATION;
    this.roundTimeLeft = ROUND_DURATION;
    this.roundNumberStartedAt = this.elapsed;
    this.roundResult = { winner: null, reason: '', playerWon: false };
    this.matchWinner = null;
    this.killfeed = [];
    this.ui.setKillfeed([]);
    this.bots.clear();
    this.nextBotFootstepTime.clear();
    this.deathOverlay = false;
    this.pendingTakeoverId = -1;
    this.deathCountdown = 0;
    this.deathElapsed = 0;
    this.viewRecoilPitch = 0;
    this.viewRecoilYaw = 0;
    this.crosshairBloom = 0;
    this.triggerHeld = false;
    this.semiQueued = false;
    this.eHeld = false;
    this.jumpQueued = false;
    this.prompt = '';
    this.movingSpeed = 0;
    this.stepTimer = 0;
    this.keys.clear();
    this.attackSite = Math.random() < 0.5 ? 'A' : 'B';
    this.resetBombState();
    this.bomb.action = null;
    this.bomb.site = null;
    this.bomb.timer = 0;
    this.bomb.beepIn = 0;

    const playerTeamAgents = this.agents
      .filter((agent) => agent.team === this.playerTeam)
      .sort((a, b) => a.ownerIndex - b.ownerIndex);
    const playerAgent = playerTeamAgents[0];
    this.playerAgentId = playerAgent.id;
    this.designatedPlayerId = playerAgent.id;

    for (const agent of this.agents) {
      const spawns = SPAWNS[agent.team];
      const spawn = spawns[agent.ownerIndex % spawns.length];
      const isPlayer = agent.id === playerAgent.id;
      const loadout = isPlayer
        ? this.playerSpecForRound(agent.team)
        : standardBotLoadout(agent.team, this.roundNumber, agent.ownerIndex);
      agent.resetForRound(spawn, loadout, this.elapsed);
      agent.controlledByPlayer = isPlayer;
      agent.isBot = !isPlayer;
      if (isPlayer) {
        agent.rig.setVisible(false);
      }
    }

    // The player's current viewmodel follows the exact same weapon instances
    // as the combat simulation.
    this.firstPerson.setLoadout(
      playerAgent.primary?.id ?? null,
      playerAgent.secondary.id,
      playerAgent.team,
    );
    this.firstPerson.setActiveSlot(playerAgent.activeSlot);
    this.firstPerson.setScoped(false);
    playerAgent.activeWeapon.scoped = false;
    this.camera.fov = 72;
    this.camera.updateProjectionMatrix();

    this.yaw = playerAgent.yaw;
    this.pitch = 0;
    this.footY = 0;
    this.velocityY = 0;
    this.grounded = true;
    this.movingSpeed = 0;
    this.bobPhase = 0;
    this.stepTimer = 0;
    this.cameraShake = 0;
    this.playerLoadoutSelection = this.sanitizeLoadout(this.playerLoadoutSelection, playerAgent.team);

    // Spawn the AI controllers only after combatants are positioned.
    for (const agent of this.agents) {
      if (agent.id === this.playerAgentId) continue;
      this.bots.set(agent.id, new BotController(agent, this));
    }

    // C4 assignment: one random T, including potentially the human.
    const tAgents = this.agents.filter((a) => a.team === 'T' && a.alive);
    const carrier = tAgents[Math.floor(Math.random() * tAgents.length)];
    if (carrier) this.giveBombTo(carrier);
    else this.c4.group.visible = false;

    this.updateBombView();
    this.updateCameraInstant();
    this.firstPerson.setLoadout(
      playerAgent.primary?.id ?? null,
      playerAgent.secondary.id,
      playerAgent.team,
    );
    this.syncHud();
    this.requestPointerLock();
    this.audio.resume();
  }

  private playerSpecForRound(team: Team): LoadoutSpec {
    if (this.roundNumber === 1) return pistolRoundLoadout(team);
    return this.sanitizeLoadout(this.playerLoadoutSelection, team);
  }

  private sanitizeLoadout(loadout: LoadoutSpec, team: Team): LoadoutSpec {
    const options = PLAYER_LOADOUT_OPTIONS[team];
    const primary = loadout.primary && options.primaries.includes(loadout.primary)
      ? loadout.primary
      : options.primaries[0];
    const secondary = options.pistols.includes(loadout.secondary)
      ? loadout.secondary
      : options.pistols[0];
    return {
      primary,
      secondary,
      armor: loadout.armor > 0 ? 100 : 0,
      helmet: loadout.armor > 0 ? loadout.helmet : false,
    };
  }

  private applyLoadoutSelection(loadout: LoadoutSpec): void {
    this.playerLoadoutSelection = this.sanitizeLoadout(loadout, this.playerTeam);
    this.ui.patch({ loadout: this.playerLoadoutSelection });
  }

  private resetBombState(): void {
    this.bomb.status = 'carried';
    this.bomb.carrierId = null;
    this.bomb.site = null;
    this.bomb.timer = 0;
    this.bomb.action = null;
    this.bomb.beepIn = 0;
    this.c4.group.visible = false;
    if (this.c4.group.parent) this.c4.group.parent.remove(this.c4.group);
    this.scene.add(this.c4.group);
    this.updateBombView();
  }

  private endRound(winner: Team, reason: string): void {
    if (this.phase !== 'live') return;
    this.phase = 'roundEnd';
    if (winner === 'CT') this.scoreCT++;
    else this.scoreT++;
    const playerWon = winner === this.playerTeam;
    this.roundResult = { winner, reason, playerWon };
    this.triggerHeld = false;
    this.eHeld = false;
    this.semiQueued = false;
    this.bomb.action = null;
    this.prompt = '';
    this.audio.result(playerWon);
    this.releasePointerLock();
    if (this.scoreCT >= MATCH_SCORE || this.scoreT >= MATCH_SCORE) {
      this.matchWinner = winner;
      this.phase = 'matchEnd';
    }
    this.syncHud();
  }

  // ---------------------------------------------------------------------------
  // Frame update
  // ---------------------------------------------------------------------------

  private readonly frame = (now: number): void => {
    if (this.disposed) return;
    this.animationFrame = requestAnimationFrame(this.frame);
    const rawDt = (now - this.lastFrame) / 1000;
    this.lastFrame = now;
    const dt = clamp(rawDt, 0.0001, 0.1);
    this.elapsed += dt;
    this.fpsAccum += rawDt;
    this.fpsFrames++;
    if (this.fpsAccum >= 0.45) {
      this.fps = Math.round(this.fpsFrames / this.fpsAccum);
      this.fpsAccum = 0;
      this.fpsFrames = 0;
      this.maybeDegradeQuality();
    }

    this.map.update(dt, this.camera.position);
    this.c4.updateBlink(this.elapsed, this.bomb.status, this.bomb.timer);
    this.updateEffects(dt);

    if (this.phase === 'menu') {
      this.menuTime += dt;
      this.updateMenuCamera(dt);
    } else if (this.phase === 'freeze') {
      this.updateFreeze(dt);
    } else if (this.phase === 'live') {
      this.updateLive(dt);
    } else {
      this.updateAllAnimations(dt);
      this.updateCamera(dt);
    }

    if (this.phase !== 'menu') {
      this.updateBombView();
      this.updateFirstPerson(dt);
    }

    this.hudAccum += dt;
    if (this.hudAccum >= 0.05) {
      this.hudAccum = 0;
      if (this.phase === 'live' || this.phase === 'freeze') this.syncHud();
    }

    this.render();
  };

  private updateFreeze(dt: number): void {
    this.freezeTimeLeft = Math.max(0, this.freezeTimeLeft - dt);
    this.updatePlayerViewInput();
    this.updateAllAnimations(dt);
    this.updateCamera(dt);
    if (this.freezeTimeLeft <= 0) {
      this.phase = 'live';
      this.roundNumberStartedAt = this.elapsed;
      this.audio.roundStart();
      this.syncHud();
    }
  }

  private updateLive(dt: number): void {
    this.finishAllReloads();
    const player = this.getPlayer();
    if (player && player.alive) {
      this.updatePlayer(dt);
    } else {
      this.updateDeath(dt);
    }

    if (this.phase === 'live') this.updateBombAction(dt);
    if (this.phase === 'live') this.updateBombTick(dt);
    if (this.phase === 'live') this.updateBombPickup();
    if (this.phase === 'live') this.updateBots(dt);
    if (this.phase === 'live') this.updateDeath(dt);
    this.updateAllAnimations(dt);
    if (this.phase === 'live') this.updatePlayerWeaponGroundedInput();
    if (this.phase === 'live') this.updateRoundConditions(dt);
    this.updateCamera(dt);
    this.updateFirstPerson(dt);
    this.updateFeedbackTiming();
  }

  private updatePlayerViewInput(): void {
    const player = this.getPlayer();
    if (!player) return;
    this.playerFootsteps(player);
    this.cursorWeaponMaintenance(player);
  }

  private updateBots(dt: number): void {
    const now = this.elapsed;
    for (const bot of this.bots.values()) {
      if (!bot.agent.alive) continue;
      bot.update(now, dt);
      this.botFootstep(bot.agent);
    }
  }

  private updateAllAnimations(dt: number): void {
    for (const agent of this.agents) {
      const moving = agent.alive && agent.speed > 0.4;
      agent.updateAnimation(dt, moving, agent.alive);
      this.refreshAgentVisibility(agent);
    }
  }

  private refreshAgentVisibility(agent: Combatant): void {
    if (agent.controlledByPlayer) {
      agent.rig.setVisible(false);
    } else {
      agent.rig.setVisible(true);
    }
  }

  private updateFirstPerson(dt: number): void {
    const player = this.getPlayer();
    if (!player) return;
    this.firstPerson.setLoadout(
      player.primary?.id ?? null,
      player.secondary.id,
      player.team,
    );
    this.firstPerson.setActiveSlot(player.activeSlot);
    const weapon = player.activeWeapon;
    this.firstPerson.setScoped(player.alive && weapon.scoped);
    this.firstPerson.setReloading(weapon.reloading);
    this.firstPerson.update(dt, {
      movingSpeed: player.alive ? this.movingSpeed : 0,
      activeId: weapon.id,
      reloading: weapon.reloading,
    });
  }

  private updateCamera(dt: number): void {
    const player = this.getPlayer();
    if (this.phase === 'menu') return;

    const isScoped = Boolean(player?.alive && player.activeWeapon.scoped && player.activeWeapon.id === 'awp');
    const targetFov = isScoped ? (WEAPONS.awp.scopeFov ?? 22) : 72;
    this.camera.fov += (targetFov - this.camera.fov) * (1 - Math.exp(-dt * 14));
    this.camera.updateProjectionMatrix();

    if (player && player.alive) {
      this.crouching = this.keys.has('ControlLeft');
      const eyeHeight = this.crouching ? CROUCH_EYE_HEIGHT : EYE_HEIGHT;
      const scopeFactor = isScoped ? 0.16 : 1;
      if (this.grounded && this.movingSpeed > 0.4) {
        this.bobPhase += dt * (4.6 + this.movingSpeed * 1.8);
      }
      const bob = this.grounded ? Math.abs(Math.sin(this.bobPhase)) * 0.026 * scopeFactor : 0;
      const sway = this.grounded ? Math.cos(this.bobPhase * 0.5) * 0.011 * scopeFactor : 0;
      const shakeX = (Math.random() - 0.5) * this.cameraShake;
      const shakeY = (Math.random() - 0.5) * this.cameraShake * 0.7;
      this.camera.position.set(
        player.position.x + sway + shakeX,
        this.footY + eyeHeight + bob + shakeY,
        player.position.z,
      );
      this.camera.rotation.set(
        this.pitch + this.viewRecoilPitch + this.cameraShake * 0.25,
        this.yaw + this.viewRecoilYaw,
        0,
      );
    } else if (player && !player.alive) {
      this.deathElapsed += dt;
      const settle = Math.min(1, this.deathElapsed * 1.2);
      this.camera.position.copy(this.deathCameraPos);
      this.camera.position.y = Math.max(0.32, this.deathCameraPos.y - settle * 0.55);
      this.camera.rotation.set(
        this.deathPitch - settle * 0.24,
        this.deathYaw,
        settle * 0.045,
      );
    }

    this.cameraShake = Math.max(0, this.cameraShake - dt * 1.6);
    const recoilRecoveryActive = this.elapsed - this.recoilLastShotAt > 0.18;
    if (recoilRecoveryActive) {
      this.viewRecoilPitch += (0 - this.viewRecoilPitch) * Math.min(1, dt * 6.5);
      this.viewRecoilYaw += (0 - this.viewRecoilYaw) * Math.min(1, dt * 7.5);
    } else {
      this.viewRecoilPitch += (0 - this.viewRecoilPitch) * Math.min(1, dt * 0.28);
      this.viewRecoilYaw += (0 - this.viewRecoilYaw) * Math.min(1, dt * 0.65);
    }
    this.crosshairBloom += (0 - this.crosshairBloom) * Math.min(1, dt * 5.5);
    this.viewRecoilPitch = clamp(this.viewRecoilPitch, -0.12, 0.32);
    this.viewRecoilYaw = clamp(this.viewRecoilYaw, -0.12, 0.12);
  }

  private updateMenuCamera(dt: number): void {
    this.menuTime += dt;
    const angle = this.menuTime * 0.045 + 0.8;
    const targetX = -20;
    const targetZ = 11;
    const radius = 35;
    this.camera.position.set(
      targetX + Math.cos(angle) * radius,
      17 + Math.sin(this.menuTime * 0.19) * 2.2,
      targetZ + Math.sin(angle) * radius,
    );
    this.camera.lookAt(-16, 0.4, 31);
    this.camera.fov = 54;
    this.camera.updateProjectionMatrix();
  }

  private updatePlayer(dt: number): void {
    const player = this.getPlayer();
    if (!player || !player.alive) return;
    this.crouching = this.keys.has('ControlLeft');
    this.updatePlayerBombStart(player);
    this.cursorWeaponMaintenance(player);
    this.handlePlayerWeaponInput(player, dt);
    this.handlePlayerMovement(player, dt);
    this.updatePlayerInteraction(player);
    this.updatePlayerCameraState(player);
    this.movingSpeed = Math.hypot(player.velocity.x, player.velocity.z);
    player.speed = this.movingSpeed;
    player.position.y = this.footY;
    player.yaw = this.yaw;
    player.pitch = this.pitch + this.viewRecoilPitch;
    if (this.bomb.action && this.bomb.action.actorId === player.id) {
      player.velocity.x = 0;
      player.velocity.z = 0;
      this.movingSpeed = 0;
    }
    this.playerFootsteps(player);
  }

  private updatePlayerBombStart(player: Combatant): void {
    if (!this.eHeld || this.bomb.action || this.phase !== 'live') return;
    if (player.team === 'T' && this.bomb.status === 'carried' && this.bomb.carrierId === player.id) {
      const site = getPlantSiteAt(player.position.x, player.position.z);
      if (site) this.startBombAction(player, 'plant');
    } else if (player.team === 'CT' && this.bomb.status === 'planted') {
      const distance = Math.hypot(player.position.x - this.bomb.position.x, player.position.z - this.bomb.position.z);
      if (distance < 1.9) this.startBombAction(player, 'defuse');
    }
  }

  private handlePlayerWeaponInput(player: Combatant, dt: number): void {
    if (this.phase !== 'live') return;
    const weapon = player.activeWeapon;
    const def = WEAPONS[weapon.id];
    if (this.eHeld && this.bomb.action && this.bomb.action.actorId === player.id) {
      this.triggerHeld = false;
      return;
    }
    if (this.triggerHeld) {
      if (def.automatic) {
        this.tryPlayerFire(player);
      }
    }
    if (this.semiQueued) {
      if (this.elapsed - this.semiQueuedAt > 0.24) {
        this.semiQueued = false;
      } else if (!def.automatic) {
        const fired = this.tryPlayerFire(player);
        if (fired || weapon.ammo <= 0 || weapon.reloading) this.semiQueued = false;
      } else {
        this.semiQueued = false;
      }
    }
    void dt;
  }

  private handlePlayerMovement(player: Combatant, dt: number): void {
    const inputForward = (this.keys.has('KeyW') ? 1 : 0) - (this.keys.has('KeyS') ? 1 : 0);
    const inputRight = (this.keys.has('KeyD') ? 1 : 0) - (this.keys.has('KeyA') ? 1 : 0);
    let desiredX = 0;
    let desiredZ = 0;
    if (inputForward !== 0 || inputRight !== 0) {
      const forwardX = -Math.sin(this.yaw);
      const forwardZ = -Math.cos(this.yaw);
      const rightX = Math.cos(this.yaw);
      const rightZ = -Math.sin(this.yaw);
      desiredX = forwardX * inputForward + rightX * inputRight;
      desiredZ = forwardZ * inputForward + rightZ * inputRight;
      const length = Math.hypot(desiredX, desiredZ) || 1;
      desiredX /= length;
      desiredZ /= length;
    }
    const actionLocked = Boolean(this.bomb.action && this.bomb.action.actorId === player.id && this.eHeld);
    if (actionLocked) {
      desiredX = 0;
      desiredZ = 0;
    }
    const weapon = player.activeWeapon;
    const scoped = weapon.scoped && weapon.id === 'awp';
    let targetSpeed = BASE_SPEED * WEAPONS[weapon.id].moveSpeedScale;
    if (this.crouching) targetSpeed *= 0.52;
    if (this.keys.has('ShiftLeft')) targetSpeed *= 0.62;
    if (scoped) targetSpeed *= 0.42;
    const desiredVelocityX = desiredX * targetSpeed;
    const desiredVelocityZ = desiredZ * targetSpeed;
    const accel = this.grounded ? 42 : 13;
    player.velocity.x = this.approach(player.velocity.x, desiredVelocityX, accel * dt);
    player.velocity.z = this.approach(player.velocity.z, desiredVelocityZ, accel * dt);
    if (desiredX === 0 && desiredZ === 0 && this.grounded) {
      player.velocity.x = this.approach(player.velocity.x, 0, 18 * dt);
      player.velocity.z = this.approach(player.velocity.z, 0, 18 * dt);
    }
    const move = this.physics.moveCircle(
      player.position.x,
      player.position.z,
      player.velocity.x * dt,
      player.velocity.z * dt,
      PLAYER_RADIUS,
      this.crouching ? 1.38 : PLAYER_HEIGHT,
      this.footY,
    );
    player.position.x = move.x;
    player.position.z = move.z;
    if (move.hitX) player.velocity.x = 0;
    if (move.hitZ) player.velocity.z = 0;

    if (this.jumpQueued && this.grounded) {
      this.velocityY = JUMP_SPEED;
      this.grounded = false;
      this.jumpQueued = false;
      this.audio.footstep(this.surfaceAt(player.position.x, player.position.z), 0.5, 0);
    }

    const support = this.physics.highestSurfaceBelow(
      player.position.x,
      player.position.z,
      PLAYER_RADIUS,
      this.footY + 0.12,
    );
    if (this.grounded) {
      if (support < this.footY - 0.06) {
        this.grounded = false;
      } else {
        this.footY = support;
      }
    }
    if (!this.grounded) {
      this.velocityY -= GRAVITY * dt;
      const nextY = this.footY + this.velocityY * dt;
      if (this.velocityY <= 0) {
        const landing = this.physics.highestSurfaceBelow(
          player.position.x,
          player.position.z,
          PLAYER_RADIUS,
          this.footY + 0.1,
        );
        if (nextY <= landing) {
          this.footY = landing;
          this.velocityY = 0;
          this.grounded = true;
          if (Math.abs(nextY - landing) > 0.05) {
            this.audio.footstep(this.surfaceAt(player.position.x, player.position.z), 0.7, 0);
          }
        } else {
          this.footY = nextY;
        }
      } else {
        this.footY = nextY;
      }
    }
    player.footY = this.footY;
    this.jumpQueued = false;
  }

  private updatePlayerCameraState(player: Combatant): void {
    const weapon = player.activeWeapon;
    this.firstPerson.setScoped(player.alive && weapon.scoped);
    if (weapon.reloading) {
      weapon.scoped = false;
      this.firstPerson.setScoped(false);
    }
    const aimYaw = this.yaw;
    player.yaw = aimYaw;
    player.pitch = this.pitch + this.viewRecoilPitch;
    player.rig.root.rotation.y = aimYaw;
    void player;
  }

  private cursorWeaponMaintenance(player: Combatant): void {
    if (!player.alive) return;
    for (const runtime of this.playerWeapons(player)) {
      if (runtime.reloading && this.elapsed >= runtime.reloadEnd) {
        const def = WEAPONS[runtime.id];
        const needed = def.magSize - runtime.ammo;
        const taken = Math.min(needed, runtime.reserve);
        runtime.ammo += taken;
        runtime.reserve -= taken;
        runtime.reloading = false;
        if (player.activeWeapon === runtime) player.rig.setReloading(false);
      }
    }
  }

  private playerWeapons(player: Combatant): Combatant['secondary'][] {
    const list: Combatant['secondary'][] = [player.secondary, player.melee];
    if (player.primary) list.unshift(player.primary);
    return list;
  }

  private finishAllReloads(): void {
    for (const agent of this.agents) {
      if (!agent.alive) continue;
      const weapon = agent.activeWeapon;
      if (weapon.reloading && this.elapsed >= weapon.reloadEnd) {
        const def = WEAPONS[weapon.id];
        const needed = def.magSize - weapon.ammo;
        const taken = Math.min(needed, weapon.reserve);
        weapon.ammo += taken;
        weapon.reserve -= taken;
        weapon.reloading = false;
        agent.rig.setReloading(false);
      }
    }
  }

  private updatePlayerInteraction(player: Combatant): void {
    if (this.bomb.action) {
      if (this.bomb.action.actorId === player.id) {
        this.prompt = this.bomb.action.type === 'plant'
          ? '正在安放 C4 — 保持不动'
          : '正在拆除 C4 — 保持不动';
      } else {
        const actor = this.agentById.get(this.bomb.action.actorId);
        this.prompt = `${this.bomb.action.type === 'plant' ? '队友正在安放 C4' : '队友正在拆除 C4'}${actor ? ` · ${actor.name}` : ''}`;
      }
      return;
    }
    if (player.team === 'T' && this.bomb.status === 'carried' && this.bomb.carrierId === player.id) {
      const site = getPlantSiteAt(player.position.x, player.position.z);
      this.prompt = site ? `按住 E 在 ${site.id} 点安放 C4` : '把 C4 带到 A 点或 B 点安放';
      return;
    }
    if (player.team === 'T' && this.bomb.status === 'dropped') {
      const distance = Math.hypot(player.position.x - this.bomb.position.x, player.position.z - this.bomb.position.z);
      this.prompt = distance < 6 ? '靠近 C4 以自动拾取' : '';
      return;
    }
    if (player.team === 'CT' && this.bomb.status === 'planted') {
      const distance = Math.hypot(player.position.x - this.bomb.position.x, player.position.z - this.bomb.position.z);
      this.prompt = distance < 2.4 ? '按住 E 拆除 C4' : `C4 已安放于 ${this.bomb.site} 点 · 前往拆除`;
      return;
    }
    if (this.bomb.status === 'planted') {
      this.prompt = `C4 已安放于 ${this.bomb.site} 点`;
      return;
    }
    this.prompt = '';
  }

  private updateRoundConditions(dt: number): void {
    this.roundTimeLeft = Math.max(0, this.roundTimeLeft - dt);
    const aliveCT = this.aliveTeam('CT');
    const aliveT = this.aliveTeam('T');
    if (aliveCT === 0) {
      this.endRound('T', 'CT 小队已被全部消灭');
      return;
    }
    if (aliveT === 0) {
      if (this.bomb.status === 'planted') {
        // The bomb still has to be defused.
      } else {
        this.endRound('CT', 'T 小队已被全部消灭');
        return;
      }
    }
    if (this.roundTimeLeft <= 0 && this.bomb.status !== 'planted') {
      this.endRound('CT', '时间耗尽 · C4 未能安放');
    }
  }

  // ---------------------------------------------------------------------------
  // Death, spectator and takeover
  // ---------------------------------------------------------------------------

  private handlePlayerDeath(): void {
    const player = this.getPlayer();
    if (!player) return;
    this.deathOverlay = true;
    this.deathCountdown = 2.8;
    this.deathElapsed = 0;
    this.deathCameraPos.copy(this.camera.position);
    this.deathYaw = this.yaw;
    this.deathPitch = this.pitch;
    this.pendingTakeoverId = this.findTakeoverCandidate()?.id ?? -1;
    this.triggerHeld = false;
    this.eHeld = false;
    this.semiQueued = false;
    this.firstPerson.setScoped(false);
    const weapon = player.activeWeapon;
    weapon.scoped = false;
    this.prompt = '';
    this.audio.damage();
    this.syncHud();
  }

  private updateDeath(dt: number): void {
    if (!this.deathOverlay) return;
    if (this.phase !== 'live' && this.phase !== 'freeze') return;
    const pending = this.agentById.get(this.pendingTakeoverId);
    if (!pending || !pending.alive) {
      this.pendingTakeoverId = this.findTakeoverCandidate()?.id ?? -1;
      if (this.pendingTakeoverId < 0) {
        this.deathCountdown = 0;
      }
    }
    if (this.pendingTakeoverId < 0) return;
    this.deathCountdown = Math.max(0, this.deathCountdown - dt);
    if (this.deathCountdown <= 0) {
      const candidate = this.agentById.get(this.pendingTakeoverId);
      if (candidate && candidate.alive) this.takeOverCombatant(candidate);
    }
  }

  private findTakeoverCandidate(): Combatant | null {
    const player = this.getPlayer();
    if (!player) return null;
    const teammates = this.agents
      .filter((agent) => agent.team === player.team && agent.alive && agent.id !== player.id)
      .sort((a, b) => {
        const da = Math.hypot(a.position.x - player.position.x, a.position.z - player.position.z);
        const db = Math.hypot(b.position.x - player.position.x, b.position.z - player.position.z);
        return da - db;
      });
    return teammates[0] ?? null;
  }

  private takeOverCombatant(next: Combatant): void {
    const previous = this.getPlayer();
    if (!next || !next.alive) return;
    if (previous) {
      previous.controlledByPlayer = false;
      previous.rig.setVisible(true);
    }
    this.playerAgentId = next.id;
    next.controlledByPlayer = true;
    next.isBot = false;
    this.bots.delete(next.id);
    next.rig.setVisible(false);
    this.yaw = next.yaw;
    this.pitch = clamp(next.pitch, -1.3, 1.3);
    this.footY = next.position.y;
    this.velocityY = 0;
    this.grounded = true;
    this.viewRecoilPitch = 0;
    this.viewRecoilYaw = 0;
    this.crosshairBloom = 0;
    this.deathOverlay = false;
    this.pendingTakeoverId = -1;
    this.prompt = '';
    this.triggerHeld = false;
    this.firstPerson.setLoadout(next.primary?.id ?? null, next.secondary.id, next.team);
    this.firstPerson.setActiveSlot(next.activeSlot);
    this.firstPerson.setScoped(false);
    next.activeWeapon.scoped = false;
    this.updateCameraInstant();
    this.audio.scope();
    this.syncHud();
  }

  private updateCameraInstant(): void {
    const player = this.getPlayer();
    if (!player) return;
    this.camera.fov = 72;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(player.position.x, this.footY + EYE_HEIGHT, player.position.z);
    this.camera.rotation.set(this.pitch, this.yaw, 0);
  }

  // ---------------------------------------------------------------------------
  // Player weapons and firing
  // ---------------------------------------------------------------------------

  private toggleScope(): void {
    const player = this.getPlayer();
    if (!player || !player.alive) return;
    if (this.phase !== 'live' && this.phase !== 'freeze') return;
    const weapon = player.activeWeapon;
    if (weapon.id !== 'awp' || weapon.reloading) return;
    if (this.elapsed - this.lastScopeAt < 0.12) return;
    this.lastScopeAt = this.elapsed;
    weapon.scoped = !weapon.scoped;
    this.firstPerson.setScoped(weapon.scoped);
    this.audio.scope();
    this.syncHud();
  }

  private unscope(): void {
    const player = this.getPlayer();
    if (!player) return;
    player.activeWeapon.scoped = false;
    this.firstPerson.setScoped(false);
  }

  private switchPlayerSlot(slot: WeaponSlot): void {
    const player = this.getPlayer();
    if (!player || !player.alive) return;
    if (slot === 'primary' && !player.primary) return;
    if (this.phase !== 'live' && this.phase !== 'freeze') return;
    if (!player.switchWeapon(slot)) return;
    this.unscope();
    player.activeWeapon.scoped = false;
    this.firstPerson.setActiveSlot(slot);
    this.firstPerson.setScoped(false);
    this.switchReadyAt = this.elapsed + 0.2;
    this.crosshairBloom = 0;
    this.audio.uiClick();
    this.syncHud();
  }

  private reloadPlayer(): void {
    const player = this.getPlayer();
    if (!player || !player.alive) return;
    if (this.phase !== 'live') return;
    if (player.startReload(this.elapsed)) {
      this.unscope();
      this.audio.reload(player.activeWeapon.id, WEAPONS[player.activeWeapon.id].reloadTime, 0);
      this.syncHud();
    }
  }

  private tryPlayerFire(player: Combatant): boolean {
    if (this.phase !== 'live') return false;
    if (this.elapsed < this.switchReadyAt) return false;
    const weapon = player.activeWeapon;
    const def = WEAPONS[weapon.id];
    if (weapon.reloading) return false;
    if (weapon.nextFireAt > this.elapsed) return false;
    if (this.bomb.action && this.bomb.action.actorId === player.id) return false;
    if (weapon.ammo <= 0) {
      if (!this.hasPlayedEmptyClick) {
        this.audio.uiClick();
        this.hasPlayedEmptyClick = true;
      }
      return false;
    }
    weapon.ammo = Math.max(0, weapon.ammo - (def.slot === 'melee' ? 0 : 1));
    weapon.nextFireAt = this.elapsed + def.fireInterval;
    weapon.lastShotAt = this.elapsed;
    weapon.shotCount++;
    this.hasPlayedEmptyClick = false;

    const scoped = weapon.scoped && weapon.id === 'awp';
    // The render camera is updated later in the frame; sync it now so the ray
    // originates exactly where the player is currently looking.
    const eyeHeight = this.crouching ? CROUCH_EYE_HEIGHT : EYE_HEIGHT;
    this.camera.position.set(player.position.x, this.footY + eyeHeight, player.position.z);
    this.camera.rotation.set(this.pitch + this.viewRecoilPitch, this.yaw + this.viewRecoilYaw, 0);
    this.camera.updateMatrixWorld(true);
    const origin = this.camera.position.clone();
    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    const spread = this.computePlayerSpread(player, def, scoped);
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0).normalize();
    const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1).normalize();
    const shotDirection = this.applySpread(direction, right, up, spread);
    const tracerOrigin = origin
      .clone()
      .addScaledVector(right, 0.2)
      .addScaledVector(up, -0.14)
      .addScaledVector(direction, 0.6);
    const result = this.performHitscan(player, origin, shotDirection, def, tracerOrigin, scoped);

    this.viewRecoilPitch = clamp(this.viewRecoilPitch + def.recoilPitch, -0.12, 0.32);
    this.viewRecoilYaw = clamp(
      this.viewRecoilYaw + (Math.random() - 0.5) * 2 * def.recoilYaw,
      -0.12,
      0.12,
    );
    this.recoilLastShotAt = this.elapsed;
    this.crosshairBloom = Math.min(0.16, this.crosshairBloom + def.recoilPitch * 0.95 + 0.0015);
    this.firstPerson.triggerFire();
    const soundWeapon = weapon.id;
    if (soundWeapon === 'knife') {
      this.audio.shot('knife', 0, 1);
    } else {
      this.audio.shot(soundWeapon, 0, 1);
    }
    if (weapon.id === 'awp' && weapon.scoped) {
      weapon.scoped = false;
      this.firstPerson.setScoped(false);
    }
    player.rig.triggerFire();
    player.rig.setReloading(false);
    if (result) this.setHudFlash(result.headshot ? 'headshot' : 'hit');
    this.alertBotsToGunshot(player);
    this.syncHud();
    return true;
  }

  private computePlayerSpread(player: Combatant, def: WeaponDef, scoped: boolean): number {
    const speedRatio = clamp(this.movingSpeed / BASE_SPEED, 0, 1.35);
    if (scoped && def.scopedSpread !== undefined) {
      return speedRatio > 0.02
        ? def.scopedSpread + speedRatio * 0.07 + (this.grounded ? 0 : 0.08)
        : def.scopedSpread;
    }
    const movement = def.moveSpread * speedRatio;
    const air = this.grounded ? 0 : def.airSpread;
    return def.spread + movement + air + this.crosshairBloom * 0.42;
  }

  private tryBotFire(bot: Combatant, target: Combatant): boolean {
    if (this.phase !== 'live' || !bot.alive || !target.alive) return false;
    const weapon = bot.activeWeapon;
    const def = WEAPONS[weapon.id];
    if (weapon.reloading || weapon.ammo <= 0 || weapon.nextFireAt > this.elapsed) return false;
    if (this.bomb.action && this.bomb.action.actorId === bot.id) return false;
    if (weapon.id === 'awp' && weapon.nextFireAt > this.elapsed) return false;
    weapon.ammo = Math.max(0, weapon.ammo - (def.slot === 'melee' ? 0 : 1));
    weapon.nextFireAt = this.elapsed + def.fireInterval;
    weapon.lastShotAt = this.elapsed;
    weapon.shotCount++;
    const origin = bot.eyePosition;
    const targetPoint = target.chestPosition;
    targetPoint.x += (Math.random() - 0.5) * 0.28;
    targetPoint.y += (Math.random() - 0.5) * 0.22;
    targetPoint.z += (Math.random() - 0.5) * 0.28;
    const direction = targetPoint.sub(origin).normalize();
    const right = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
    let up = new THREE.Vector3().crossVectors(right, direction).normalize();
    if (up.lengthSq() < 0.01) up.set(0, 1, 0);
    const botSpread = def.spread * 0.72 + (def.slot === 'secondary' ? 0.021 : 0.0145) + (weapon.id === 'awp' ? 0.0035 : 0);
    const shotDirection = this.applySpread(direction, right, up, botSpread);
    this.performHitscan(bot, origin, shotDirection, def, bot.rig.getMuzzleWorldPosition(), false);
    bot.rig.triggerFire();
    const spatial = this.spatialAudio(origin);
    this.audio.shot(weapon.id, spatial.pan, spatial.volume);
    this.alertBotsToGunshot(bot);
    const maybeTargetDeath = !target.alive;
    void maybeTargetDeath;
    return true;
  }

  private applySpread(direction: THREE.Vector3, right: THREE.Vector3, up: THREE.Vector3, spread: number): THREE.Vector3 {
    if (spread <= 0) return direction.clone();
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.tan(Math.min(spread, 0.25)) * Math.sqrt(Math.random());
    return direction
      .clone()
      .addScaledVector(right, Math.cos(angle) * radius)
      .addScaledVector(up, Math.sin(angle) * radius)
      .normalize();
  }

  private performHitscan(
    shooter: Combatant,
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    def: WeaponDef,
    visualOrigin: THREE.Vector3,
    scoped: boolean,
  ): { headshot: boolean; agent: Combatant; point: THREE.Vector3 } | null {
    const maxRange = def.slot === 'melee' ? def.maxRange : def.maxRange;
    const worldHit = this.physics.raycastWorld(
      origin.x,
      origin.y,
      origin.z,
      direction.x,
      direction.y,
      direction.z,
      maxRange,
    );
    let nearestAgent: Combatant | null = null;
    let nearestPart: HitPart = 'chest';
    let nearestDistance = Number.POSITIVE_INFINITY;
    let nearestPoint = new THREE.Vector3();

    for (const agent of this.agents) {
      if (!agent.alive || agent.team === shooter.team) continue;
      agent.rig.root.updateMatrixWorld(true);
      const hitboxes = agent.rig.hitboxes.map((hitbox) => hitbox.mesh);
      this.raycaster.set(origin, direction);
      this.raycaster.far = maxRange;
      const hits = this.raycaster.intersectObjects(hitboxes, false);
      if (hits.length > 0) {
        const hit = hits[0];
        if (hit.distance < nearestDistance) {
          const holder = this.agentById.get(hit.object.userData.agentId as number);
          if (holder && holder.alive && holder.team !== shooter.team) {
            nearestAgent = holder;
            nearestPart = (hit.object.userData.hitPart as HitPart) ?? 'chest';
            nearestDistance = hit.distance;
            nearestPoint.copy(hit.point);
          }
        }
      }
    }

    const worldDistance = worldHit ? worldHit.distance : Number.POSITIVE_INFINITY;
    let endpoint: THREE.Vector3;
    let hitResult: { headshot: boolean; agent: Combatant; point: THREE.Vector3 } | null = null;
    if (nearestAgent && nearestDistance < worldDistance - 0.02) {
      endpoint = nearestPoint.clone();
      const headshot = nearestPart === 'head';
      this.applyDamage(
        nearestAgent,
        def.damage * PART_MULTIPLIERS[nearestPart],
        nearestPart,
        shooter,
        def.id,
        nearestDistance,
      );
      this.spawnBlood(nearestPoint);
      hitResult = { headshot, agent: nearestAgent, point: nearestPoint.clone() };
    } else if (worldHit) {
      endpoint = worldHit.point
        ? new THREE.Vector3(worldHit.point.x, worldHit.point.y, worldHit.point.z)
        : origin.clone().addScaledVector(direction, maxRange);
      this.spawnDust(endpoint, worldHit.normal);
    } else {
      endpoint = origin.clone().addScaledVector(direction, maxRange);
    }
    if (def.slot !== 'melee') {
      this.addTracer(
        visualOrigin,
        endpoint,
        shooter.team === this.playerTeam ? '#ffd78e' : '#ff9d68',
      );
    }
    void scoped;
    if (hitResult) {
      if (shooter.id === this.playerAgentId) {
        this.audio.hit(hitResult.headshot);
        this.setHudFlash(hitResult.headshot ? 'headshot' : 'hit');
      }
    }
    return hitResult;
  }

  private applyDamage(
    victim: Combatant,
    rawDamage: number,
    part: HitPart,
    attacker: Combatant | null,
    weaponId: WeaponId,
    distance: number,
  ): void {
    if (!victim.alive) return;
    const def = WEAPONS[weaponId];
    let finalDamage = rawDamage;
    if (victim.armor > 0) {
      const armorFactor = part === 'head' && !victim.helmet ? 0.35 : 1;
      const reduction = (1 - def.armorPenetration) * armorFactor;
      finalDamage = rawDamage * (1 - reduction);
      victim.armor = Math.max(0, victim.armor - rawDamage * reduction * 1.15);
    }
    const distancePenalty = weaponId === 'awp' ? 1 : clamp(1 - Math.max(0, distance - 28) / 220, 0.72, 1);
    const rounded = Math.max(1, Math.round(finalDamage * distancePenalty));
    victim.health = Math.max(0, victim.health - rounded);
    victim.lastDamage = {
      attackerId: attacker?.id ?? null,
      amount: rounded,
      part,
      time: this.elapsed,
      weapon: weaponId,
    };
    if (attacker && attacker.id === this.playerAgentId && victim.team !== attacker.team) {
      this.audio.hit(part === 'head');
      this.setHudFlash(part === 'head' ? 'headshot' : 'hit');
    }
    if (victim.id === this.playerAgentId) {
      this.audio.damage();
      this.setHudFlash('damage');
      this.cameraShake = Math.min(0.16, this.cameraShake + 0.05);
    }
    const victimBot = this.bots.get(victim.id);
    if (victimBot) victimBot.onDamaged(attacker, this.elapsed);
    if (victim.health <= 0) {
      this.killCombatant(victim, attacker, weaponId, part === 'head');
    }
  }

  private killCombatant(victim: Combatant, attacker: Combatant | null, weaponId: WeaponId, headshot: boolean): void {
    if (!victim.alive) return;
    victim.alive = false;
    victim.health = 0;
    victim.addDeath();
    victim.rig.setDead(true);
    victim.rig.root.rotation.set(0, victim.yaw, 0);
    victim.activeWeapon.scoped = false;
    this.cancelBombAction(victim);
    if (this.bomb.status === 'carried' && this.bomb.carrierId === victim.id) {
      this.dropBomb(victim.position.x, victim.position.y, victim.position.z);
    }
    if (attacker) attacker.addKill();
    this.recordKill(attacker, victim, weaponId, headshot);
    this.bots.delete(victim.id);
    this.alertTeamOfDeath(victim);
    if (victim.id === this.playerAgentId) {
      this.handlePlayerDeath();
    } else if (attacker?.id === this.playerAgentId) {
      this.audio.kill(headshot);
    }
    if (!victim.controlledByPlayer) victim.rig.setVisible(true);
  }

  private recordKill(
    attacker: Combatant | null,
    victim: Combatant,
    weaponId: WeaponId,
    headshot: boolean,
  ): void {
    const item: KillFeedItem = {
      id: this.killSeq++,
      killer: attacker?.name ?? 'C4',
      killerTeam: attacker?.team ?? victim.team,
      victim: victim.name,
      victimTeam: victim.team,
      weapon: WEAPONS[weaponId]?.shortName ?? 'C4',
      headshot,
      t: this.elapsed,
    };
    this.killfeed.push(item);
    if (this.killfeed.length > 7) this.killfeed.shift();
    this.ui.addKill(item);
  }

  private alertTeamOfDeath(victim: Combatant): void {
    for (const bot of this.bots.values()) {
      if (bot.agent.team === victim.team) {
        bot.onTeammateKilled({ x: victim.position.x, z: victim.position.z }, this.elapsed);
      }
    }
  }

  private alertBotsToGunshot(shooter: Combatant): void {
    if (shooter.activeWeapon.id === 'knife') return;
    for (const bot of this.bots.values()) {
      if (bot.agent.team === shooter.team || !bot.agent.alive) continue;
      bot.onHeardGunshot(shooter, { x: shooter.position.x, z: shooter.position.z }, this.elapsed);
    }
  }

  private setHudFlash(flash: HUDState['flash']): void {
    this.hudFlash = flash;
    this.hudFlashAt = performance.now();
  }

  private updateFeedbackTiming(): void {
    if (this.hudFlash === 'damage' && performance.now() - this.hudFlashAt > 650) {
      this.hudFlash = null;
    }
  }

  private aliveTeam(team: Team): number {
    return this.agents.filter((agent) => agent.alive && agent.team === team).length;
  }

  // ---------------------------------------------------------------------------
  // C4
  // ---------------------------------------------------------------------------

  private giveBombTo(carrier: Combatant): void {
    if (!carrier || !carrier.alive) return;
    this.bomb.status = 'carried';
    this.bomb.carrierId = carrier.id;
    this.bomb.site = null;
    this.bomb.timer = 0;
    this.bomb.action = null;
    for (const agent of this.agents) agent.bombCarrier = agent.id === carrier.id;
    this.attachC4ToCarrier(carrier);
    this.updateBombView();
  }

  private attachC4ToCarrier(carrier: Combatant): void {
    if (this.c4.group.parent) this.c4.group.parent.remove(this.c4.group);
    carrier.rig.root.add(this.c4.group);
    this.c4.group.position.set(0.04, 1.03, 0.24);
    this.c4.group.rotation.set(0, Math.PI, 0.05);
    this.c4.group.scale.setScalar(0.72);
    this.c4.group.visible = true;
  }

  private dropBomb(x: number, y: number, z: number): void {
    this.bomb.status = 'dropped';
    this.bomb.carrierId = null;
    this.bomb.site = null;
    this.bomb.timer = 0;
    this.bomb.action = null;
    for (const agent of this.agents) agent.bombCarrier = false;
    const pos = this.findBombDropPoint(x, z);
    this.bomb.position.set(pos.x, 0.03, pos.z);
    if (this.c4.group.parent) this.c4.group.parent.remove(this.c4.group);
    this.scene.add(this.c4.group);
    this.c4.group.position.copy(this.bomb.position);
    this.c4.group.rotation.set(0, Math.random() * Math.PI * 2, 0);
    this.c4.group.scale.setScalar(1);
    this.c4.group.visible = true;
    this.updateBombView();
    if (this.getPlayer()?.team === 'T') this.prompt = 'C4 已掉落 — 前去拾取';
  }

  private findBombDropPoint(x: number, z: number): { x: number; z: number } {
    const nearest = this.nav.nearestWalkable(x, z);
    return nearest ?? { x, z };
  }

  private updateBombPickup(): void {
    if (this.bomb.status !== 'dropped') return;
    let picker: Combatant | null = null;
    let bestDistance = 1.7;
    for (const agent of this.agents) {
      if (!agent.alive || agent.team !== 'T') continue;
      const distance = Math.hypot(agent.position.x - this.bomb.position.x, agent.position.z - this.bomb.position.z);
      if (distance < bestDistance) {
        bestDistance = distance;
        picker = agent;
      }
    }
    if (!picker) return;
    this.giveBombTo(picker);
    this.audio.pickup();
    this.prompt = picker.id === this.playerAgentId ? '你拾取了 C4' : `${picker.name} 拾取了 C4`;
    this.syncHud();
  }

  private startBombAction(actor: Combatant, type: 'plant' | 'defuse'): boolean {
    if (this.bomb.action || this.phase !== 'live' || !actor.alive) return false;
    if (type === 'plant') {
      if (actor.team !== 'T' || this.bomb.status !== 'carried' || this.bomb.carrierId !== actor.id) return false;
      const site = getPlantSiteAt(actor.position.x, actor.position.z);
      if (!site) return false;
      this.bomb.action = {
        actorId: actor.id,
        type,
        progress: 0,
        duration: PLANT_DURATION,
        originX: actor.position.x,
        originZ: actor.position.z,
        lastTick: 0,
      };
      this.audio.bombPlantStart();
      this.prompt = '正在安放 C4 — 保持不动';
    } else {
      if (actor.team !== 'CT' || this.bomb.status !== 'planted') return false;
      const distance = Math.hypot(actor.position.x - this.bomb.position.x, actor.position.z - this.bomb.position.z);
      if (distance > 1.9) return false;
      this.bomb.action = {
        actorId: actor.id,
        type,
        progress: 0,
        duration: DEFUSE_DURATION,
        originX: actor.position.x,
        originZ: actor.position.z,
        lastTick: 0,
      };
      this.audio.defuseTick(0);
      this.prompt = '正在拆除 C4 — 保持不动';
    }
    this.updateBombView();
    this.syncHud();
    return true;
  }

  private updateBombAction(dt: number): void {
    const action = this.bomb.action;
    if (!action) return;
    const actor = this.agentById.get(action.actorId);
    if (!actor || !actor.alive) {
      this.bomb.action = null;
      this.updateBombView();
      return;
    }
    if (action.type === 'plant') {
      if (this.bomb.status !== 'carried' || this.bomb.carrierId !== actor.id) {
        this.bomb.action = null;
        return;
      }
      const site = getPlantSiteAt(actor.position.x, actor.position.z);
      if (!site) {
        this.bomb.action = null;
        return;
      }
    } else {
      if (this.bomb.status !== 'planted') {
        this.bomb.action = null;
        return;
      }
      const distance = Math.hypot(actor.position.x - this.bomb.position.x, actor.position.z - this.bomb.position.z);
      if (distance > 2.05) {
        this.bomb.action = null;
        return;
      }
    }
    if (actor.id === this.playerAgentId) {
      if (!this.eHeld) {
        this.bomb.action = null;
        this.prompt = '';
        this.syncHud();
        return;
      }
    }
    const moved = Math.hypot(actor.position.x - action.originX, actor.position.z - action.originZ);
    if (moved > 0.48) {
      this.bomb.action = null;
      this.syncHud();
      return;
    }
    action.progress += dt;
    if (action.type === 'defuse' && action.progress - action.lastTick > 0.6) {
      action.lastTick = action.progress;
      const spatial = this.spatialAudio(this.bomb.position);
      this.audio.defuseTick(spatial.pan);
    }
    if (action.progress >= action.duration) {
      this.bomb.action = null;
      if (action.type === 'plant') {
        this.finishPlant(actor);
      } else {
        this.finishDefuse(actor);
      }
    }
    this.updateBombView();
  }

  private finishPlant(actor: Combatant): void {
    const site = getPlantSiteAt(actor.position.x, actor.position.z);
    if (!site) return;
    this.bomb.status = 'planted';
    this.bomb.carrierId = null;
    this.bomb.site = site.id;
    this.bomb.timer = BOMB_DURATION;
    this.bomb.beepIn = 0.45;
    this.bomb.action = null;
    for (const agent of this.agents) agent.bombCarrier = false;
    const pos = this.findBombDropPoint(actor.position.x, actor.position.z);
    this.bomb.position.set(pos.x, 0.03, pos.z);
    if (this.c4.group.parent) this.c4.group.parent.remove(this.c4.group);
    this.scene.add(this.c4.group);
    this.c4.group.position.copy(this.bomb.position);
    this.c4.group.rotation.set(0, actor.yaw + Math.PI, 0);
    this.c4.group.scale.setScalar(1.05);
    this.c4.group.visible = true;
    this.audio.bombPlanted();
    this.prompt = `C4 已安放于 ${site.id} 点`;
    this.syncHud();
  }

  private finishDefuse(actor: Combatant): void {
    this.bomb.status = 'defused';
    this.bomb.action = null;
    this.audio.defuseTick(0);
    this.endRound('CT', `${actor.name} 成功拆除 C4`);
    this.updateBombView();
  }

  private updateBombTick(dt: number): void {
    if (this.bomb.status === 'planted') {
      this.bomb.timer = Math.max(0, this.bomb.timer - dt);
      this.bomb.beepIn -= dt;
      if (this.bomb.beepIn <= 0) {
        const progress = 1 - this.bomb.timer / BOMB_DURATION;
        const interval = 0.82 - progress * 0.62;
        this.bomb.beepIn = Math.max(0.13, interval);
        const spatial = this.spatialAudio(this.bomb.position);
        this.audio.bombBeep(spatial.pan, Math.max(0.18, spatial.volume));
      }
      if (this.bomb.timer <= 0) {
        this.bomb.status = 'exploded';
        this.spawnExplosion(this.bomb.position.clone());
        this.audio.explosion();
        this.endRound('T', 'C4 爆炸 · 目标被摧毁');
        this.syncHud();
      }
    }
    this.updateBombView();
  }

  private updateBombView(): void {
    const carrier = this.bomb.carrierId !== null ? this.agentById.get(this.bomb.carrierId) : null;
    const pos = carrier ? carrier.position : this.bomb.position;
    this.bombView.status = this.bomb.status;
    this.bombView.x = pos.x;
    this.bombView.z = pos.z;
    this.bombView.carrierId = this.bomb.carrierId;
    this.bombView.plantedSite = this.bomb.site;
    this.bombView.action = this.bomb.action
      ? { actorId: this.bomb.action.actorId, type: this.bomb.action.type }
      : null;
    if (this.bomb.action) {
      this.prompt = this.bomb.action.actorId === this.playerAgentId
        ? (this.bomb.action.type === 'plant' ? '正在安放 C4 — 保持不动' : '正在拆除 C4 — 保持不动')
        : `${this.bomb.action.type === 'plant' ? '队友正在安放 C4' : '队友正在拆除 C4'}`;
    }
  }

  // ---------------------------------------------------------------------------
  // BotWorld implementation
  // ---------------------------------------------------------------------------

  lineOfSight(bot: Combatant, target: Combatant): boolean {
    if (!bot.alive || !target.alive) return false;
    const eye = bot.eyePosition;
    const chest = target.chestPosition;
    if (this.physics.lineOfSight(eye.x, eye.y, eye.z, chest.x, chest.y, chest.z, 0.04)) {
      return true;
    }
    const head = target.headPosition;
    return this.physics.lineOfSight(eye.x, eye.y, eye.z, head.x, head.y, head.z, 0.04);
  }

  fireBot(bot: Combatant, target: Combatant): boolean {
    return this.tryBotFire(bot, target);
  }


  requestPlant(bot: Combatant): boolean {
    return this.startBombAction(bot, 'plant');
  }

  requestDefuse(bot: Combatant): boolean {
    return this.startBombAction(bot, 'defuse');
  }

  cancelBombAction(actor: Combatant): void {
    if (this.bomb.action?.actorId === actor.id) {
      this.bomb.action = null;
      this.updateBombView();
    }
  }

  onBotReload(bot: Combatant): void {
    if (!bot.alive) return;
    const spatial = this.spatialAudio(bot.position);
    if (spatial.volume > 0.02) {
      this.audio.reload(bot.activeWeapon.id, WEAPONS[bot.activeWeapon.id].reloadTime, spatial.pan);
    }
  }

  onBotInteractionStart(bot: Combatant, kind: 'plant' | 'defuse'): void {
    if (!bot.alive) return;
    this.lastInteractionSound = this.elapsed;
    void kind;
  }

  getSiteCenter(site: 'A' | 'B'): { x: number; z: number } {
    const plant = PLANT_SITES.find((entry) => entry.id === site) ?? PLANT_SITES[0];
    return { x: plant.centerX, z: plant.centerZ };
  }

  // ---------------------------------------------------------------------------
  // C4 visuals / effects
  // ---------------------------------------------------------------------------

  private spawnBlood(point: THREE.Vector3): void {
    for (let i = 0; i < 5; i++) {
      const mesh = new THREE.Mesh(this.sharedGeometry.blood, this.sharedMaterial.blood);
      mesh.position.set(
        point.x + (Math.random() - 0.5) * 0.25,
        point.y + (Math.random() - 0.5) * 0.25,
        point.z + (Math.random() - 0.5) * 0.25,
      );
      mesh.scale.setScalar(0.5 + Math.random());
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 1.4, Math.random() * 1.2, (Math.random() - 0.5) * 1.4),
        life: 0.55,
        maxLife: 0.55,
        gravity: 4,
      });
    }
  }

  private spawnDust(point: THREE.Vector3, normal: { x: number; y: number; z: number }): void {
    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(this.sharedGeometry.dust, this.sharedMaterial.dust);
      mesh.position.set(point.x, point.y, point.z);
      mesh.scale.setScalar(0.8 + Math.random() * 1.8);
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(
          normal.x * (0.3 + Math.random()) + (Math.random() - 0.5) * 0.8,
          normal.y * 0.6 + Math.random() * 0.6,
          normal.z * (0.3 + Math.random()) + (Math.random() - 0.5) * 0.8,
        ),
        life: 0.35 + Math.random() * 0.25,
        maxLife: 0.6,
        gravity: 1.4,
      });
    }
  }

  private addTracer(from: THREE.Vector3, to: THREE.Vector3, color: string): void {
    const geo = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()]);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(geo, mat);
    this.scene.add(line);
    this.tracers.push({ line, material: mat, life: 0.06 });
  }

  private spawnExplosion(point: THREE.Vector3): void {
    const material = new THREE.MeshBasicMaterial({
      color: '#ffc861',
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), material);
    sphere.position.copy(point).add(new THREE.Vector3(0, 1.5, 0));
    sphere.scale.setScalar(0.3);
    this.scene.add(sphere);
    const light = new THREE.PointLight('#ffad42', 80, 45, 1.8);
    light.position.copy(point).add(new THREE.Vector3(0, 3, 0));
    this.scene.add(light);
    this.explosions.push({ mesh: sphere, material, light, life: 0.9, maxLife: 0.9 });
    this.cameraShake = 0.7;
    for (let i = 0; i < 38; i++) {
      const mesh = new THREE.Mesh(this.sharedGeometry.spark, this.sharedMaterial.spark);
      mesh.position.copy(point).add(new THREE.Vector3(0, 0.45, 0));
      mesh.scale.setScalar(0.8 + Math.random() * 2.5);
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          2 + Math.random() * 10,
          (Math.random() - 0.5) * 16,
        ),
        life: 0.7 + Math.random() * 0.7,
        maxLife: 1.4,
        gravity: 13,
      });
    }
  }

  private updateEffects(dt: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.life -= dt;
      particle.velocity.y -= particle.gravity * dt;
      particle.mesh.position.addScaledVector(particle.velocity, dt);
      const ratio = Math.max(0, particle.life / particle.maxLife);
      particle.mesh.scale.multiplyScalar(Math.max(0.8, 0.985));
      if (particle.life <= 0) {
        if (particle.mesh.parent) particle.mesh.parent.remove(particle.mesh);
        this.particles.splice(i, 1);
      } else {
        particle.mesh.scale.setScalar(0.2 + ratio * 0.8);
      }
    }
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const tracer = this.tracers[i];
      tracer.life -= dt;
      tracer.material.opacity = Math.max(0, tracer.life / 0.06) * 0.7;
      if (tracer.life <= 0) {
        if (tracer.line.parent) tracer.line.parent.remove(tracer.line);
        tracer.line.geometry.dispose();
        tracer.material.dispose();
        this.tracers.splice(i, 1);
      }
    }
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const explosion = this.explosions[i];
      explosion.life -= dt;
      const t = 1 - Math.max(0, explosion.life / explosion.maxLife);
      explosion.mesh.scale.setScalar(0.3 + t * 5.8);
      explosion.material.opacity = Math.max(0, 0.95 * (1 - t));
      explosion.light.intensity = Math.max(0, 80 * (1 - t));
      if (explosion.life <= 0) {
        if (explosion.mesh.parent) explosion.mesh.parent.remove(explosion.mesh);
        explosion.mesh.geometry.dispose();
        explosion.material.dispose();
        if (explosion.light.parent) explosion.light.parent.remove(explosion.light);
        explosion.light.dispose();
        this.explosions.splice(i, 1);
      }
    }
    // Keep effect buffers bounded.
    while (this.particles.length > 160) {
      const oldest = this.particles.shift();
      if (oldest?.mesh.parent) oldest.mesh.parent.remove(oldest.mesh);
    }
  }

  // ---------------------------------------------------------------------------
  // Sound, footsteps and input feedback
  // ---------------------------------------------------------------------------

  private spatialAudio(position: THREE.Vector3 | { x: number; z: number }): { pan: number; volume: number } {
    const cam = this.camera.position;
    const dx = position.x - cam.x;
    const dz = position.z - cam.z;
    const distance = Math.hypot(dx, dz);
    const rightX = Math.cos(this.yaw);
    const rightZ = -Math.sin(this.yaw);
    const pan = clamp((dx * rightX + dz * rightZ) / Math.max(4, distance), -1, 1) * 0.82;
    const volume = Math.pow(clamp(1 - distance / 48, 0, 1), 1.25);
    return { pan, volume };
  }

  private surfaceAt(x: number, z: number): 'sand' | 'concrete' | 'tunnel' {
    for (const rect of FLOOR_RECTS) {
      if (x >= rect.x1 && x <= rect.x2 && z >= rect.z1 && z <= rect.z2) {
        if (rect.style === 'tunnel') return 'tunnel';
        if (rect.style === 'concrete' || rect.style === 'stone') return 'concrete';
        return 'sand';
      }
    }
    return 'sand';
  }

  private playerFootsteps(player: Combatant): void {
    if (!player.alive) return;
    if (this.movingSpeed > 1.2 && this.grounded) {
      if (this.elapsed >= this.stepTimer) {
        const walking = this.keys.has('ShiftLeft');
        this.stepTimer = this.elapsed + (walking ? 0.66 : 0.42);
        this.audio.footstep(this.surfaceAt(player.position.x, player.position.z), walking ? 0.33 : 0.6, 0);
      }
    } else {
      this.stepTimer = Math.max(this.stepTimer, this.elapsed + 0.18);
    }
  }

  private nextBotFootstepTime = new Map<number, number>();
  private botFootstep(agent: Combatant): void {
    if (!agent.alive || agent.speed < 1.3) return;
    const next = this.nextBotFootstepTime.get(agent.id) ?? 0;
    if (this.elapsed < next) return;
    this.nextBotFootstepTime.set(agent.id, this.elapsed + 0.42 + Math.random() * 0.14);
    const spatial = this.spatialAudio(agent.position);
    if (spatial.volume > 0.02) {
      this.audio.footstep(this.surfaceAt(agent.position.x, agent.position.z), spatial.volume * 0.5, spatial.pan);
    }
  }

  private approach(value: number, target: number, maxDelta: number): number {
    if (value < target) return Math.min(target, value + maxDelta);
    if (value > target) return Math.max(target, value - maxDelta);
    return value;
  }

  private updatePlayerWeaponGroundedInput(): void {
    const player = this.getPlayer();
    if (!player?.alive) return;
    player.velocity.y = this.velocityY;
    if (this.bomb.action?.actorId === player.id) {
      this.prompt = this.bomb.action.type === 'plant'
        ? `安放 C4 ${Math.round((this.bomb.action.progress / this.bomb.action.duration) * 100)}%`
        : `拆除 C4 ${Math.round((this.bomb.action.progress / this.bomb.action.duration) * 100)}%`;
    }
  }

  // ---------------------------------------------------------------------------
  // Visible enemies and HUD
  // ---------------------------------------------------------------------------

  private computeVisibleEnemies(): Set<number> {
    const result = new Set<number>();
    const playerTeam = this.playerTeam;
    const teamMembers = this.agents.filter((agent) => agent.alive && agent.team === playerTeam);
    for (const enemy of this.agents) {
      if (!enemy.alive || enemy.team === playerTeam) continue;
      for (const mate of teamMembers) {
        if (this.physics.lineOfSight(
          mate.eyePosition.x,
          mate.eyePosition.y,
          mate.eyePosition.z,
          enemy.chestPosition.x,
          enemy.chestPosition.y,
          enemy.chestPosition.z,
          0.04,
        )) {
          result.add(enemy.id);
          break;
        }
      }
    }
    return result;
  }

  getMinimapSnapshot(): MinimapSnapshot {
    const player = this.getPlayer();
    const teamAgents = this.agents.filter((agent) => agent.alive && agent.team === this.playerTeam);
    const active = player && player.alive ? player : null;
    const visibleEnemies = this.computeVisibleEnemies();
    const agents: MinimapAgent[] = teamAgents.map((agent) => ({
      x: agent.position.x,
      z: agent.position.z,
      yaw: agent.id === this.playerAgentId ? this.yaw : agent.yaw,
      team: agent.team,
      controlled: agent.id === this.playerAgentId,
      alive: agent.alive,
      hasBomb: this.bomb.status === 'carried' && this.bomb.carrierId === agent.id,
    }));
    const enemyAgents: MinimapAgent[] = this.agents
      .filter((agent) => agent.alive && agent.team !== this.playerTeam && visibleEnemies.has(agent.id))
      .map((agent) => ({
        x: agent.position.x,
        z: agent.position.z,
        yaw: agent.yaw,
        team: agent.team,
        controlled: false,
        alive: true,
        hasBomb: this.bomb.status === 'carried' && this.bomb.carrierId === agent.id,
      }));
    const carrier = this.bomb.carrierId !== null ? this.agentById.get(this.bomb.carrierId) : null;
    const bombVisible =
      this.bomb.status === 'planted' ||
      this.bomb.status === 'dropped' ||
      (this.bomb.status === 'carried' && Boolean(carrier && carrier.team === this.playerTeam));
    const bombPos = carrier && this.bomb.status === 'carried' ? carrier.position : this.bomb.position;
    return {
      player: active
        ? {
            x: active.position.x,
            z: active.position.z,
            yaw: this.yaw,
            team: active.team,
            controlled: true,
            alive: true,
            hasBomb: Boolean(active && this.bomb.carrierId === active.id),
          }
        : null,
      teammates: agents.filter((agent) => !agent.controlled),
      visibleEnemies: enemyAgents,
      bomb: {
        x: bombPos.x,
        z: bombPos.z,
        status: this.bomb.status,
        visible: bombVisible,
        carriedByMe: Boolean(active && this.bomb.carrierId === active.id),
      },
      viewYaw: this.yaw,
      phase: this.phase,
    };
  }

  private computeCrosshairPixels(): number {
    const player = this.getPlayer();
    if (!player || !player.alive) return 0;
    const weapon = player.activeWeapon;
    const def = WEAPONS[weapon.id];
    const scoped = weapon.scoped && weapon.id === 'awp';
    let spread: number;
    if (scoped) {
      spread = def.scopedSpread ?? 0.0002;
      spread += clamp(this.movingSpeed / BASE_SPEED, 0, 1) * 0.055;
    } else {
      const speedRatio = clamp(this.movingSpeed / BASE_SPEED, 0, 1.3);
      spread = def.spread + def.moveSpread * speedRatio + this.crosshairBloom * 0.42 + (this.grounded ? 0 : def.airSpread);
    }
    if (def.slot === 'melee') spread = 0.004;
    return clamp(4 + spread * 560, 4, 42);
  }

  private syncHud(): void {
    if (this.killfeed.length > 0) {
      this.killfeed = this.killfeed.filter((entry) => this.elapsed - entry.t < 8.5);
    }
    const player = this.getPlayer();
    const active = player && player.alive ? player : player;
    const weapons: HUDState['weapons'] = [];
    if (player) {
      for (const runtime of this.playerWeapons(player)) {
        const def = WEAPONS[runtime.id];
        const reloadProgress = runtime.reloading
          ? clamp(1 - (runtime.reloadEnd - this.elapsed) / Math.max(0.01, def.reloadTime), 0, 1)
          : 1;
        weapons.push({
          id: runtime.id,
          name: def.name,
          slot: runtime.slot,
          ammo: runtime.ammo,
          reserve: runtime.reserve,
          reloading: runtime.reloading,
          scoped: runtime.scoped,
          reloadProgress,
        });
      }
    }
    const action = this.bomb.action;
    const activeWeapon = active?.activeWeapon;
    const scoped = Boolean(activeWeapon?.scoped && activeWeapon.id === 'awp');
    const bombVisible =
      this.bomb.status === 'planted' ||
      this.bomb.status === 'dropped' ||
      (this.bomb.status === 'carried' && Boolean(active && active.team === 'T'));
    const carrier = this.bomb.carrierId !== null ? this.agentById.get(this.bomb.carrierId) : null;
    const bombX = carrier && this.bomb.status === 'carried' ? carrier.position.x : this.bomb.position.x;
    const bombZ = carrier && this.bomb.status === 'carried' ? carrier.position.z : this.bomb.position.z;
    const aliveCT = this.aliveTeam('CT');
    const aliveT = this.aliveTeam('T');
    const pending = this.agentById.get(this.pendingTakeoverId);
    const scoreboard = this.agents.map((agent) => ({
      name: agent.name,
      team: agent.team,
      alive: agent.alive,
      kills: agent.kills,
      deaths: agent.deaths,
      controlled: agent.id === this.playerAgentId,
      hasBomb: this.bomb.status === 'carried' && this.bomb.carrierId === agent.id,
    }));
    if (active) {
      const zone = getZoneAt(active.position.x, active.position.z);
      this.lastCallout = zone;
    }
    const death = {
      dead: this.deathOverlay && (this.phase === 'live' || this.phase === 'freeze'),
      canTakeover: this.pendingTakeoverId >= 0,
      nextName: pending?.name ?? '',
      countdown: Math.max(0, this.deathCountdown),
    };
    const patch: Partial<HUDState> = {
      phase: this.phase,
      roundNumber: this.roundNumber,
      scoreCT: this.scoreCT,
      scoreT: this.scoreT,
      playerTeam: this.playerTeam,
      playerName: player?.name ?? 'YOU',
      playerAlive: Boolean(player?.alive),
      health: player?.health ?? 0,
      armor: player?.armor ?? 0,
      helmet: player?.helmet ?? false,
      weapons,
      activeSlot: player?.activeSlot ?? 'secondary',
      crosshairSpread: this.computeCrosshairPixels(),
      hasBomb: Boolean(player && this.bomb.carrierId === player.id),
      bomb: {
        status: this.bomb.status,
        timer: this.bomb.timer,
        plantedSite: this.bomb.site,
        visibleOnMap: bombVisible,
        mapX: bombX,
        mapZ: bombZ,
        actionType: action?.type ?? null,
        actionProgress: action ? clamp(action.progress / action.duration, 0, 1) : 0,
        actionDuration: action?.duration ?? 0,
      },
      prompt: this.prompt,
      flash: this.hudFlash,
      flashAt: this.hudFlashAt,
      roundTimeLeft: this.roundTimeLeft,
      freezeTimeLeft: this.freezeTimeLeft,
      aliveCT,
      aliveT,
      kills: player?.kills ?? 0,
      deaths: player?.deaths ?? 0,
      scoreboard,
      killfeed: this.killfeed,
      death,
      roundResult: {
        winner: this.roundResult.winner,
        reason: this.roundResult.reason,
        playerWon: this.roundResult.playerWon,
      },
      matchWinner: this.matchWinner,
      muted: this.audio.isMuted,
      fps: this.fps,
      pointerLocked: this.pointerLocked,
      loadout: this.playerLoadoutSelection,
      lastCallout: this.lastCallout,
    };
    if (scoped) {
      patch.weapons = weapons.map((weapon) => ({ ...weapon, scoped: weapon.slot === 'primary' && weapon.scoped }));
    }
    this.ui.patch(patch);
    void aliveT;
    void aliveCT;
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  private render(): void {
    this.renderer.clear(true, true, true);
    this.renderer.render(this.scene, this.camera);
    const player = this.getPlayer();
    if (
      player &&
      player.alive &&
      this.phase !== 'menu' &&
      this.phase !== 'roundEnd' &&
      this.phase !== 'matchEnd'
    ) {
      this.firstPerson.render(this.renderer, this.camera.aspect);
    }
  }
}

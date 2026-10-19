import { AudioEngine } from '../audio/AudioEngine.ts';
import type { GameEvent } from '../engine/events.ts';
import { Game, PLANT_TIME } from '../engine/game.ts';
import { clamp, dist2D, forwardFromAngles, wrapAngle, yawTowards } from '../engine/math.ts';
import type { ControlInput, SlotRequest } from '../engine/soldier.ts';
import { emptyInput } from '../engine/soldier.ts';
import type { Soldier } from '../engine/soldier.ts';
import type { Team, WeaponId } from '../engine/weapons.ts';
import { ROUND_PRESETS, WEAPONS } from '../engine/weapons.ts';
import { BASE_FOV, GameRenderer } from '../render/GameRenderer.ts';
import type { BuyItem, HudSnapshot, Screen, Settings, SlotView, ViewInfo } from './HudStore.ts';
import { HudStore } from './HudStore.ts';
import { InputManager } from './Input.ts';

export const SIM_STEP = 1 / 60;
const HUD_INTERVAL = 1 / 15;
const SETTINGS_KEY = 'dust2fps.settings.v1';

/** Mutable per-frame data for high-frequency HUD widgets (crosshair, hit markers, minimap). */
export interface FrameState {
  now: number;
  crosshairGap: number;
  crosshairVisible: boolean;
  scope: number;
  hitTime: number;
  hitKill: boolean;
  hitHead: boolean;
  hurtTime: number;
  damageDirs: { angle: number; time: number }[];
  viewYaw: number;
  health: number;
  alive: boolean;
}

const DEFAULT_SETTINGS: Settings = { sensitivity: 1.0, volume: 0.7, difficulty: 'normal', team: 'CT', firstRound: 'pistol' };

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    /* storage unavailable */
  }
  return { ...DEFAULT_SETTINGS };
}

const SLOT_KEYS: Record<string, SlotRequest> = {
  Digit1: 'primary',
  Digit2: 'secondary',
  Digit3: 'melee',
  Digit5: 'bomb',
  KeyQ: 'last',
};

/**
 * Glue between the pure simulation (Game), the three.js renderer, Web Audio and React.
 *  - requestAnimationFrame drives everything;
 *  - the simulation advances in fixed 60 Hz steps (accumulator) and the renderer interpolates;
 *  - React receives an immutable HUD snapshot at ~15 Hz (only when it changed), while the
 *    crosshair / minimap subscribe to per-frame callbacks and draw imperatively.
 */
export class GameClient {
  readonly hud: HudStore;
  readonly renderer: GameRenderer;
  readonly audio = new AudioEngine();
  readonly input: InputManager;
  readonly frame: FrameState = {
    now: 0,
    crosshairGap: 6,
    crosshairVisible: false,
    scope: 0,
    hitTime: -10,
    hitKill: false,
    hitHead: false,
    hurtTime: -10,
    damageDirs: [],
    viewYaw: 0,
    health: 100,
    alive: false,
  };
  game: Game | null = null;
  settings: Settings;

  private screen: Screen = 'menu';
  private raf = 0;
  private last = 0;
  private acc = 0;
  private disposed = false;
  private viewYaw = 0;
  private viewPitch = 0;
  private buyOpen = false;
  private lockFailed = false;
  private lockErrors = 0;
  private hudTimer = 0;
  private unsubGame: (() => void) | null = null;
  private readonly frameListeners = new Set<(c: GameClient) => void>();
  private readonly plantSteps = new Map<number, number>();
  private readonly defuseSteps = new Map<number, number>();

  constructor(container: HTMLElement) {
    this.settings = loadSettings();
    this.renderer = new GameRenderer(container);
    this.input = new InputManager(this.renderer.canvas);
    this.input.onLockChange = (locked) => this.onLockChange(locked);
    this.input.onLockError = () => {
      // Browsers refuse re-locking for ~1 s after Esc; only give up after repeated failures
      // (e.g. sandboxed iframe without pointer-lock permission) and fall back to raw mouse moves.
      this.lockErrors++;
      if (this.lockErrors >= 3) {
        this.lockFailed = true;
        this.input.lookFallback = true;
        if (this.game) this.setScreen('playing');
      } else if (this.game) {
        this.setScreen('paused');
      }
    };
    this.renderer.canvas.addEventListener('click', this.onCanvasClick);
    this.hud = new HudStore(this.buildSnapshot());
    this.audio.setVolume(this.settings.volume);
    this.raf = requestAnimationFrame(this.loop);
  }

  // ───────────────────────────── public API (called from React) ─────────────────────────────

  onFrame(fn: (c: GameClient) => void): () => void {
    this.frameListeners.add(fn);
    return () => {
      this.frameListeners.delete(fn);
    };
  }

  updateSettings(patch: Partial<Settings>): void {
    this.settings = { ...this.settings, ...patch };
    this.audio.setVolume(this.settings.volume);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
    } catch {
      /* ignore */
    }
    this.publishHud();
  }

  /** Must be invoked from a user gesture (audio unlock + pointer lock). */
  startMatch(): void {
    this.audio.init();
    this.unsubGame?.();
    this.renderer.detach();
    const s = this.settings;
    const game = new Game({
      humanTeam: s.team,
      difficulty: s.difficulty,
      firstRound: s.firstRound,
      roundsToWin: 8,
      humanName: '你',
    });
    this.game = game;
    this.unsubGame = game.events.on((e) => this.onGameEvent(e));
    this.renderer.attach(game);
    game.startMatch();
    const h = game.human;
    this.viewYaw = h ? h.yaw : 0;
    this.viewPitch = 0;
    this.acc = 0;
    this.buyOpen = false;
    this.plantSteps.clear();
    this.defuseSteps.clear();
    this.input.enabled = true;
    this.input.releaseAll();
    this.setScreen('playing');
    this.requestLock();
  }

  resume(): void {
    this.audio.init();
    if (!this.game) return;
    if (this.lockFailed) this.setScreen('playing');
    else this.requestLock();
  }

  quitToMenu(): void {
    this.unsubGame?.();
    this.unsubGame = null;
    this.renderer.detach();
    this.game = null;
    this.input.enabled = false;
    this.input.exitLock();
    this.buyOpen = false;
    this.setScreen('menu');
  }

  buy(id: WeaponId): void {
    const g = this.game;
    const s = g?.controlled;
    if (!g || !s) return;
    if (g.buy(s, id)) this.buyOpen = false;
    this.publishHud();
  }

  closeBuy(): void {
    this.buyOpen = false;
    this.publishHud();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.renderer.canvas.removeEventListener('click', this.onCanvasClick);
    this.unsubGame?.();
    this.input.dispose();
    this.renderer.dispose();
    this.audio.dispose();
    this.frameListeners.clear();
  }

  // ───────────────────────────── internals ─────────────────────────────

  private requestLock(): void {
    if (this.lockFailed) return;
    this.input.requestLock();
  }

  private readonly onCanvasClick = () => {
    if (this.game && !this.input.locked && !this.lockFailed && this.screen !== 'menu' && this.game.phase !== 'over') {
      this.audio.init();
      this.requestLock();
    }
  };

  private onLockChange(locked: boolean): void {
    if (locked) this.lockErrors = 0;
    if (!this.game) return;
    if (locked) this.setScreen('playing');
    else if (this.screen === 'playing' && !this.lockFailed) this.setScreen('paused');
  }

  private setScreen(s: Screen): void {
    this.screen = s;
    if (s === 'paused') this.audio.suspend();
    else this.audio.resume();
    this.publishHud();
  }

  private readonly loop = (nowMs: number): void => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    const now = nowMs / 1000;
    const dt = this.last ? Math.min(0.1, Math.max(0, now - this.last)) : 1 / 60;
    this.last = now;
    const g = this.game;
    const playing = this.screen === 'playing' && g !== null && g.phase !== 'over';
    const [mdx, mdy] = this.input.consumeLook();

    if (playing && g) {
      const ctl = g.controlled;
      if (ctl && ctl.alive) {
        const fovScale = this.renderer.currentFov / BASE_FOV;
        const sens = this.settings.sensitivity * 0.0022 * fovScale;
        this.viewYaw = wrapAngle(this.viewYaw - mdx * sens);
        this.viewPitch = clamp(this.viewPitch - mdy * sens, -1.5, 1.5);
      }
      this.acc += dt;
      let steps = 0;
      while (this.acc >= SIM_STEP && steps < 6) {
        const first = steps === 0;
        g.humanInput = this.buildCommand(g, first);
        const c = g.controlled;
        if (c && c.alive) {
          c.yaw = this.viewYaw;
          c.pitch = this.viewPitch;
        }
        g.step(SIM_STEP);
        g.humanFlags.specNext = false;
        g.humanFlags.specPrev = false;
        g.humanFlags.takeOver = false;
        this.acc -= SIM_STEP;
        steps++;
      }
      if (steps === 6) this.acc = 0;
      this.perFrameAudio(g);
    }

    const alpha = playing ? this.acc / SIM_STEP : 1;
    this.renderer.render({ dt, alpha, viewYaw: this.viewYaw, viewPitch: this.viewPitch, lookDX: mdx, lookDY: mdy, time: now });
    this.updateListener();
    this.updateFrame(now);
    for (const fn of this.frameListeners) fn(this);

    this.hudTimer -= dt;
    if (this.hudTimer <= 0) {
      this.hudTimer = HUD_INTERVAL;
      this.publishHud();
    }
  };

  private buildCommand(g: Game, first: boolean): ControlInput {
    const i = this.input;
    const c = emptyInput();
    c.forward = (i.isDown('KeyW') ? 1 : 0) - (i.isDown('KeyS') ? 1 : 0);
    c.right = (i.isDown('KeyD') ? 1 : 0) - (i.isDown('KeyA') ? 1 : 0);
    c.jump = i.isDown('Space');
    // Crouch is on C (not Ctrl): Ctrl+W would close the browser tab while crouch-walking.
    c.crouch = i.isDown('KeyC');
    c.walk = i.isDown('ShiftLeft') || i.isDown('ShiftRight');
    c.fire = i.isDown('Mouse0') && !this.buyOpen;
    c.alt = i.isDown('Mouse2');
    c.use = i.isDown('KeyE');
    if (!first) return c;

    const ctl = g.controlled;
    const alive = ctl !== null && ctl.alive;
    if (i.consume('KeyB')) {
      if (this.buyOpen) this.buyOpen = false;
      else if (ctl && g.canBuy(ctl)) this.buyOpen = true;
    }
    if (this.buyOpen && ctl && !g.canBuy(ctl)) this.buyOpen = false;
    if (this.buyOpen && ctl) {
      const items = this.buyItems(g);
      for (const it of items) {
        if (i.consume(`Digit${it.key}`)) {
          this.buy(it.id);
          break;
        }
      }
    } else {
      for (const [code, slot] of Object.entries(SLOT_KEYS)) {
        if (i.consume(code)) c.slot = slot;
      }
      const wheel = i.consumeWheel();
      if (wheel !== 0) c.slot = wheel > 0 ? 'next' : 'prev';
    }
    c.reload = i.consume('KeyR');
    c.drop = i.consume('KeyG');
    if (!alive) {
      g.humanFlags.specNext = i.consume('Mouse0') || i.consume('Space');
      g.humanFlags.specPrev = i.consume('Mouse2');
      g.humanFlags.takeOver = i.consume('KeyE');
    }
    i.clearPressed();
    return c;
  }

  private buyItems(g: Game): BuyItem[] {
    return ROUND_PRESETS[g.roundType].buyable.map((id, k) => ({
      key: k + 1,
      id,
      name: WEAPONS[id].name,
      slot: WEAPONS[id].slot === 'primary' ? '主武器' : '副武器',
    }));
  }

  private posOf(id: number) {
    const s = this.game?.soldiers[id];
    return s ? { x: s.pos.x, y: s.pos.y + 1.4, z: s.pos.z } : null;
  }

  private isSubject(id: number): boolean {
    const v = this.game?.viewSoldier;
    return v !== null && v !== undefined && v.id === id;
  }

  private onGameEvent(e: GameEvent): void {
    const g = this.game;
    if (!g) return;
    const a = this.audio;
    const ctl = g.controlled;
    const ctlId = ctl ? ctl.id : -1;
    switch (e.type) {
      case 'shot':
        a.gunshot(e.weapon, this.isSubject(e.shooter) ? null : this.posOf(e.shooter));
        break;
      case 'reload':
        a.reload(e.weapon, WEAPONS[e.weapon].reloadTime, this.isSubject(e.soldier) ? null : this.posOf(e.soldier));
        break;
      case 'switch':
        if (this.isSubject(e.soldier)) a.draw(e.weapon);
        break;
      case 'scope':
        if (this.isSubject(e.soldier)) a.scope(e.level > 0);
        break;
      case 'dryfire':
        if (this.isSubject(e.soldier)) a.dryFire();
        break;
      case 'footstep':
        a.footstep(this.isSubject(e.soldier) ? null : { x: e.pos.x, y: e.pos.y + 0.1, z: e.pos.z });
        break;
      case 'land':
        a.land(this.isSubject(e.soldier) ? null : { x: e.pos.x, y: e.pos.y, z: e.pos.z });
        break;
      case 'melee':
        a.knifeSwing(this.isSubject(e.attacker) ? null : this.posOf(e.attacker), e.hitSoldier >= 0);
        break;
      case 'damage': {
        const now = performance.now() / 1000;
        if (e.attacker === ctlId && e.attacker >= 0) {
          a.hitMarker(e.zone === 'head', e.helmetHit);
          this.frame.hitTime = now;
          this.frame.hitKill = false;
          this.frame.hitHead = e.zone === 'head';
        }
        if (e.victim === ctlId) {
          a.hurt();
          this.frame.hurtTime = now;
          const v = g.soldiers[e.victim];
          const from = e.attacker >= 0 ? g.soldiers[e.attacker].pos : v.lastHurtFrom;
          const ang = yawTowards(from.x - v.pos.x, from.z - v.pos.z);
          this.frame.damageDirs.push({ angle: ang, time: now });
          if (this.frame.damageDirs.length > 6) this.frame.damageDirs.shift();
        }
        break;
      }
      case 'kill':
        if (e.killer === ctlId && e.killer >= 0) {
          a.killConfirm(e.headshot);
          this.frame.hitKill = true;
          this.frame.hitHead = e.headshot;
          this.frame.hitTime = performance.now() / 1000;
        }
        break;
      case 'bombPlanted':
        a.bombPlanted({ x: e.pos.x, y: e.pos.y + 0.3, z: e.pos.z });
        break;
      case 'bombBeep':
        a.bombBeep({ x: e.pos.x, y: e.pos.y + 0.3, z: e.pos.z }, e.urgency);
        break;
      case 'defuseStart':
        a.defuseTick(this.isSubject(e.soldier) ? null : this.posOf(e.soldier));
        break;
      case 'bombDefused':
        a.bombDefused();
        break;
      case 'bombExploded':
        a.explosion({ x: e.pos.x, y: e.pos.y + 1, z: e.pos.z });
        break;
      case 'itemPickup':
      case 'bombPickup':
        if (this.isSubject(e.soldier)) a.pickup();
        break;
      case 'roundStart': {
        a.roundStart();
        this.buyOpen = false;
        const h = g.human;
        if (h) {
          this.viewYaw = h.yaw;
          this.viewPitch = 0;
        }
        this.frame.damageDirs.length = 0;
        this.plantSteps.clear();
        this.defuseSteps.clear();
        break;
      }
      case 'roundEnd':
        a.roundEnd(g.human ? e.winner === g.human.team : e.winner === 'CT');
        break;
      case 'matchOver':
        this.input.exitLock();
        break;
      case 'controlChanged': {
        const s = g.soldiers[e.soldier];
        this.viewYaw = s.yaw;
        this.viewPitch = s.pitch;
        break;
      }
      default:
        break;
    }
  }

  /** Keypad beeps while planting and wire clicks while defusing (driven by progress). */
  private perFrameAudio(g: Game): void {
    for (const s of g.soldiers) {
      if (s.planting) {
        const step = Math.floor(s.plantProgress / (PLANT_TIME / 7));
        if (step !== this.plantSteps.get(s.id)) {
          this.plantSteps.set(s.id, step);
          this.audio.plantKey(this.isSubject(s.id) ? null : this.posOf(s.id));
        }
      } else this.plantSteps.delete(s.id);
      if (s.defusing) {
        const step = Math.floor(s.defuseProgress / 0.6);
        if (step !== this.defuseSteps.get(s.id)) {
          this.defuseSteps.set(s.id, step);
          this.audio.defuseTick(this.isSubject(s.id) ? null : this.posOf(s.id));
        }
      } else this.defuseSteps.delete(s.id);
    }
  }

  private updateListener(): void {
    const cam = this.renderer.camera;
    const f = forwardFromAngles(cam.rotation.y, cam.rotation.x);
    this.audio.setListener(cam.position.x, cam.position.y, cam.position.z, f.x, f.y, f.z);
  }

  private updateFrame(now: number): void {
    const fr = this.frame;
    fr.now = now;
    fr.viewYaw = this.renderer.camera.rotation.y;
    const g = this.game;
    const s = g?.viewSoldier ?? null;
    if (!g || !s || !s.alive || this.screen === 'menu') {
      fr.crosshairVisible = false;
      fr.scope = 0;
      fr.alive = false;
      return;
    }
    fr.alive = true;
    fr.health = s.health;
    fr.scope = s.weapon.def.scopeFovs ? s.scope : 0;
    fr.crosshairVisible = fr.scope === 0 && !s.weapon.def.scopeFovs;
    const inacc = g.inaccuracy(s);
    const h = this.renderer.canvas.clientHeight || 800;
    const half = Math.tan(((this.renderer.currentFov * Math.PI) / 180) / 2);
    fr.crosshairGap = 3 + (Math.tan(inacc) / half) * (h / 2);
  }

  // ───────────────────────────── HUD snapshot ─────────────────────────────

  private publishHud(): void {
    this.hud.publish(this.buildSnapshot());
  }

  private viewInfo(g: Game, s: Soldier): ViewInfo {
    const w = s.weapon;
    const slots: SlotView[] = [];
    if (s.primary) slots.push({ key: '1', name: s.primary.def.name, active: s.activeSlot === 'primary' });
    if (s.secondary) slots.push({ key: '2', name: s.secondary.def.name, active: s.activeSlot === 'secondary' });
    slots.push({ key: '3', name: '刀', active: s.activeSlot === 'melee' });
    if (s.hasBomb) slots.push({ key: '5', name: 'C4', active: s.activeSlot === 'bomb' });
    return {
      name: s.name,
      team: s.team,
      isSelf: s.id === g.controlledId,
      health: Math.max(0, s.health),
      armor: Math.round(s.armor),
      helmet: s.helmet,
      kit: s.hasKit,
      hasBomb: s.hasBomb,
      weaponId: w.def.id,
      weaponName: w.def.name,
      mag: w.mag,
      reserve: w.reserve,
      magSize: w.def.magSize,
      usesAmmo: w.def.magSize > 0,
      reloading: s.reloadEnd > 0,
      slots,
      location: g.callout(s.pos),
    };
  }

  private hint(g: Game, s: Soldier | null): string | null {
    const ctl = g.controlled;
    if (ctl && !ctl.alive) {
      if (g.spectateId >= 0) return g.canTakeOver() ? '左键 / 空格 切换队友视角 · E 接管该队友' : '左键 / 空格 切换视角';
      return null;
    }
    if (!s || !ctl || s !== ctl) return null;
    if (this.buyOpen) return '按数字键购买 · B 关闭';
    if (s.hasBomb) {
      if (g.siteAt(s.pos)) return s.activeSlot === 'bomb' ? '按住 左键 安放 C4（保持不动）' : '按 5 切出 C4，按住左键安放';
      return g.phase === 'freeze' ? '你携带着 C4' : '携带 C4：前往 A点 / B点 安放';
    }
    const b = g.bomb;
    if (s.team === 'CT' && b.state === 'planted' && dist2D(s.pos.x, s.pos.z, b.pos.x, b.pos.z) < 2.2) {
      return `按住 E 拆除炸弹（${s.hasKit ? '拆弹器 5 秒' : '10 秒'}）`;
    }
    if (b.state === 'dropped' && s.team === 'T' && dist2D(s.pos.x, s.pos.z, b.pos.x, b.pos.z) < 6) return '走过去捡起 C4';
    if (g.canBuy(s) && g.phase === 'freeze') return '按 B 打开购买菜单';
    return null;
  }

  private buildSnapshot(): HudSnapshot {
    const g = this.game;
    const settings = this.settings;
    const base: HudSnapshot = {
      screen: this.screen,
      started: g !== null,
      lockFailed: this.lockFailed,
      lockRetry: this.lockErrors > 0 && !this.lockFailed,
      phase: 'none',
      round: 0,
      roundLabel: '',
      timeLeft: 0,
      freezeLeft: 0,
      bombPlanted: false,
      bombTimeLeft: 0,
      bombSite: '',
      scoreT: 0,
      scoreCT: 0,
      aliveT: [],
      aliveCT: [],
      humanTeam: null,
      view: null,
      spectating: null,
      deathCam: null,
      killfeed: [],
      announcement: null,
      progress: null,
      hint: null,
      buyOpen: false,
      canBuy: false,
      buyItems: [],
      scoreboardOpen: false,
      scoreboard: [],
      matchOver: null,
      settings,
      plan: null,
    };
    if (!g) return base;
    const s = g.viewSoldier;
    const ctl = g.controlled;
    const human = g.human;
    const humanTeam: Team | null = human ? human.team : null;
    base.phase = g.phase;
    base.round = g.roundNumber;
    base.roundLabel = ROUND_PRESETS[g.roundType].label;
    base.timeLeft = Math.ceil(g.roundTimeLeft);
    base.freezeLeft = g.phase === 'freeze' ? Math.ceil(g.phaseEnd - g.time) : 0;
    base.bombPlanted = g.bomb.state === 'planted';
    base.bombTimeLeft = Math.ceil(g.bombTimeLeft);
    base.bombSite = g.bomb.site ?? '';
    base.scoreT = g.score.T;
    base.scoreCT = g.score.CT;
    base.aliveT = g.soldiers.filter((x) => x.team === 'T').map((x) => x.alive);
    base.aliveCT = g.soldiers.filter((x) => x.team === 'CT').map((x) => x.alive);
    base.humanTeam = humanTeam;
    base.view = s ? this.viewInfo(g, s) : null;
    if (ctl && !ctl.alive) {
      if (g.spectateId >= 0) {
        const t = g.soldiers[g.spectateId];
        base.spectating = { name: t.name, team: t.team, canTakeOver: g.canTakeOver() };
      } else {
        base.deathCam = { killer: ctl.killerId >= 0 ? g.soldiers[ctl.killerId].name : null };
      }
    }
    base.killfeed = g.killfeed.filter((k) => g.time - k.time < 7).slice(-6);
    base.announcement = g.announcement ? { id: g.announcement.id, text: g.announcement.text, sub: g.announcement.sub, tone: g.announcement.tone } : null;
    if (s && s.planting) base.progress = { label: '正在安放 C4', value: Math.min(1, s.plantProgress / PLANT_TIME), tone: 'T' };
    else if (s && s.defusing) base.progress = { label: s.hasKit ? '正在拆除炸弹（拆弹器）' : '正在拆除炸弹', value: Math.min(1, s.defuseProgress / g.defuseDuration(s)), tone: 'CT' };
    base.hint = this.hint(g, s);
    base.canBuy = ctl !== null && ctl.alive && g.canBuy(ctl);
    base.buyOpen = this.buyOpen && base.canBuy;
    base.buyItems = base.buyOpen ? this.buyItems(g) : [];
    base.scoreboardOpen = this.input.isDown('Tab') || g.phase === 'over';
    if (base.scoreboardOpen) {
      base.scoreboard = g.soldiers.map((x) => ({
        id: x.id,
        name: x.name,
        team: x.team,
        kills: x.kills,
        deaths: x.deaths,
        alive: x.alive,
        bot: x.id !== g.controlledId && x.id !== g.humanId,
        you: x.id === g.humanId,
        bomb: x.hasBomb && (humanTeam === 'T' || humanTeam === null),
        kit: x.hasKit,
      }));
    }
    if (g.phase === 'over' && g.matchWinner) base.matchOver = { winner: g.matchWinner, scoreT: g.score.T, scoreCT: g.score.CT };
    if (humanTeam && (g.phase === 'freeze' || (g.phase === 'live' && g.time - g.liveStartedAt < 12))) {
      base.plan = humanTeam === 'T' ? `队伍计划：进攻 ${g.planners.T.site} 点` : '队伍布防：A点 ×2 · 中路 ×1 · B点 ×2';
    }
    return base;
  }
}

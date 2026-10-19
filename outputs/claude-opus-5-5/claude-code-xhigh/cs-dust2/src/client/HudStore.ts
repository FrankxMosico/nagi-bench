import type { KillFeedEntry, Phase } from '../engine/game.ts';
import type { Difficulty } from '../engine/ai/bot.ts';
import type { RoundType, Team, WeaponId } from '../engine/weapons.ts';

export type Screen = 'menu' | 'playing' | 'paused';

export interface SlotView {
  key: string;
  name: string;
  active: boolean;
}

export interface ViewInfo {
  name: string;
  team: Team;
  isSelf: boolean;
  health: number;
  armor: number;
  helmet: boolean;
  kit: boolean;
  hasBomb: boolean;
  weaponId: WeaponId;
  weaponName: string;
  mag: number;
  reserve: number;
  magSize: number;
  usesAmmo: boolean;
  reloading: boolean;
  slots: SlotView[];
  location: string;
}

export interface ScoreRow {
  id: number;
  name: string;
  team: Team;
  kills: number;
  deaths: number;
  alive: boolean;
  bot: boolean;
  you: boolean;
  bomb: boolean;
  kit: boolean;
}

export interface BuyItem {
  key: number;
  id: WeaponId;
  name: string;
  slot: string;
}

export interface Settings {
  sensitivity: number;
  volume: number;
  difficulty: Difficulty;
  team: Team;
  firstRound: RoundType;
}

/** Immutable HUD snapshot consumed by React via useSyncExternalStore. */
export interface HudSnapshot {
  screen: Screen;
  started: boolean;
  lockFailed: boolean;
  /** Last pointer-lock request was refused (usually the browser's cooldown after Esc). */
  lockRetry: boolean;
  phase: Phase | 'none';
  round: number;
  roundLabel: string;
  timeLeft: number;
  freezeLeft: number;
  bombPlanted: boolean;
  bombTimeLeft: number;
  bombSite: string;
  scoreT: number;
  scoreCT: number;
  aliveT: boolean[];
  aliveCT: boolean[];
  humanTeam: Team | null;
  view: ViewInfo | null;
  spectating: { name: string; team: Team; canTakeOver: boolean } | null;
  deathCam: { killer: string | null } | null;
  killfeed: KillFeedEntry[];
  announcement: { id: number; text: string; sub: string; tone: string } | null;
  progress: { label: string; value: number; tone: 'T' | 'CT' } | null;
  hint: string | null;
  buyOpen: boolean;
  canBuy: boolean;
  buyItems: BuyItem[];
  scoreboardOpen: boolean;
  scoreboard: ScoreRow[];
  matchOver: { winner: Team; scoreT: number; scoreCT: number } | null;
  settings: Settings;
  plan: string | null;
}

/** Tiny external store: publishes a new snapshot only when its content changed. */
export class HudStore {
  private snapshot: HudSnapshot;
  private readonly listeners = new Set<() => void>();
  private lastJson = '';

  constructor(initial: HudSnapshot) {
    this.snapshot = initial;
    this.lastJson = JSON.stringify(initial);
  }

  readonly subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  };

  readonly getSnapshot = (): HudSnapshot => this.snapshot;

  publish(next: HudSnapshot): void {
    const json = JSON.stringify(next);
    if (json === this.lastJson) return;
    this.lastJson = json;
    this.snapshot = next;
    for (const fn of this.listeners) fn();
  }
}

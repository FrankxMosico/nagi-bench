import type { HUDState, KillFeedItem, LoadoutSpec, Team } from './types';

export function createInitialHUD(): HUDState {
  const loadout: LoadoutSpec = {
    primary: 'ak47',
    secondary: 'glock',
    armor: 100,
    helmet: true,
  };
  return {
    phase: 'menu',
    roundNumber: 1,
    scoreCT: 0,
    scoreT: 0,
    playerTeam: 'CT',
    playerName: 'YOU',
    playerAlive: true,
    health: 100,
    armor: 0,
    helmet: false,
    weapons: [],
    activeSlot: 'secondary',
    crosshairSpread: 4,
    hasBomb: false,
    bomb: {
      status: 'carried',
      timer: 0,
      plantedSite: null,
      visibleOnMap: false,
      mapX: 0,
      mapZ: 0,
      actionType: null,
      actionProgress: 0,
      actionDuration: 0,
    },
    prompt: '',
    flash: null,
    flashAt: 0,
    roundTimeLeft: 105,
    freezeTimeLeft: 4,
    aliveCT: 5,
    aliveT: 5,
    kills: 0,
    deaths: 0,
    scoreboard: [],
    killfeed: [],
    death: {
      dead: false,
      canTakeover: false,
      nextName: '',
      countdown: 0,
    },
    roundResult: {
      winner: null,
      reason: '',
      playerWon: false,
    },
    matchWinner: null,
    muted: false,
    fps: 60,
    pointerLocked: false,
    loadout,
    lastCallout: 'DUST II',
  };
}

export class UIStore {
  private snapshot: HUDState = createInitialHUD();
  private readonly listeners = new Set<() => void>();

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): HUDState => this.snapshot;

  patch(patch: Partial<HUDState>): void {
    this.snapshot = { ...this.snapshot, ...patch };
    this.emit();
  }

  set(next: HUDState): void {
    this.snapshot = next;
    this.emit();
  }

  addKill(item: KillFeedItem): void {
    this.snapshot = {
      ...this.snapshot,
      killfeed: [...this.snapshot.killfeed, item].slice(-7),
    };
    this.emit();
  }

  setKillfeed(items: KillFeedItem[]): void {
    this.snapshot = { ...this.snapshot, killfeed: items };
    this.emit();
  }

  setPlayerTeam(team: Team): void {
    const primary = team === 'T' ? 'ak47' : 'm4a4';
    this.snapshot = {
      ...this.snapshot,
      playerTeam: team,
      loadout: {
        ...this.snapshot.loadout,
        primary,
        secondary: team === 'T' ? 'glock' : 'usp',
      },
    };
    this.emit();
  }

  reset(): void {
    this.snapshot = createInitialHUD();
    this.emit();
  }

  private emit(): void {
    for (const listener of this.listeners) listener();
  }
}

/** A single UI bridge shared by the canvas engine and React overlay. */
export const gameUI = new UIStore();

export const MATCH_WIN_SCORE = 7;

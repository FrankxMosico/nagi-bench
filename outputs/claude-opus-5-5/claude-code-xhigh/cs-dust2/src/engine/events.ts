import type { Vec3 } from './math.ts';
import type { SiteId } from './map/types.ts';
import type { HitZone, RoundType, Team, WeaponId } from './weapons.ts';

/** Everything the presentation layers (renderer, audio, HUD) need to react to. */
export type GameEvent =
  | {
      type: 'shot';
      shooter: number;
      weapon: WeaponId;
      origin: Vec3;
      end: Vec3;
      hitWorld: boolean;
      normal: Vec3 | null;
      hitSoldier: number;
    }
  | { type: 'melee'; attacker: number; stab: boolean; hitSoldier: number; hitWorld: boolean; point: Vec3 | null }
  | {
      type: 'damage';
      victim: number;
      attacker: number;
      amount: number;
      zone: HitZone;
      point: Vec3;
      helmetHit: boolean;
      weapon: WeaponId;
    }
  | { type: 'kill'; killer: number; victim: number; weapon: WeaponId | 'world'; headshot: boolean }
  | { type: 'reload'; soldier: number; weapon: WeaponId }
  | { type: 'switch'; soldier: number; weapon: WeaponId }
  | { type: 'scope'; soldier: number; level: number }
  | { type: 'dryfire'; soldier: number }
  | { type: 'footstep'; soldier: number; pos: Vec3 }
  | { type: 'land'; soldier: number; pos: Vec3; impact: number }
  | { type: 'jump'; soldier: number }
  | { type: 'plantStart'; soldier: number }
  | { type: 'plantAbort'; soldier: number }
  | { type: 'bombPlanted'; soldier: number; site: SiteId; pos: Vec3 }
  | { type: 'defuseStart'; soldier: number; kit: boolean }
  | { type: 'defuseAbort'; soldier: number }
  | { type: 'bombDefused'; soldier: number }
  | { type: 'bombExploded'; pos: Vec3 }
  | { type: 'bombBeep'; pos: Vec3; urgency: number }
  | { type: 'bombDropped'; pos: Vec3 }
  | { type: 'bombPickup'; soldier: number }
  | { type: 'itemPickup'; soldier: number; weapon: WeaponId }
  | { type: 'roundStart'; round: number; roundType: RoundType }
  | { type: 'roundLive' }
  | { type: 'roundEnd'; winner: Team; reason: string }
  | { type: 'matchOver'; winner: Team }
  | { type: 'controlChanged'; soldier: number };

export type GameEventType = GameEvent['type'];

export class EventBus {
  private listeners: Array<(e: GameEvent) => void> = [];

  on(fn: (e: GameEvent) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  emit(e: GameEvent): void {
    for (let i = 0; i < this.listeners.length; i++) this.listeners[i](e);
  }

  clear(): void {
    this.listeners = [];
  }
}

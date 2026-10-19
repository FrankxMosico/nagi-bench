import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import type { GameClient } from '../client/GameClient.ts';
import type { HudSnapshot } from '../client/HudStore.ts';

export const ClientContext = createContext<GameClient | null>(null);

export function useClient(): GameClient {
  const c = useContext(ClientContext);
  if (!c) throw new Error('GameClient not available');
  return c;
}

/** Low-frequency HUD state (re-renders only when the snapshot content changes). */
export function useHud(): HudSnapshot {
  const c = useClient();
  return useSyncExternalStore(c.hud.subscribe, c.hud.getSnapshot);
}

/** High-frequency per-frame callback (imperative DOM/canvas updates, no React re-render). */
export function useFrame(fn: (c: GameClient) => void, deps: unknown[] = []): void {
  const c = useClient();
  useEffect(() => c.onFrame(fn), [c, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
}

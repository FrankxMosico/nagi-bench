import { useEffect, useRef, useState } from 'react';
import { GameClient } from './client/GameClient.ts';
import { Hud } from './ui/Hud.tsx';
import { ClientContext } from './ui/context.ts';

export default function App() {
  const host = useRef<HTMLDivElement>(null);
  const [client, setClient] = useState<GameClient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let c: GameClient | null = null;
    try {
      c = new GameClient(el);
      setClient(c);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : String(e));
    }
    return () => {
      c?.dispose();
      setClient(null);
    };
  }, []);

  return (
    <div className="app">
      <div ref={host} className="viewport" />
      {client && (
        <ClientContext.Provider value={client}>
          <Hud />
        </ClientContext.Provider>
      )}
      {error && (
        <div className="fatal">
          <h2>无法启动 WebGL</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

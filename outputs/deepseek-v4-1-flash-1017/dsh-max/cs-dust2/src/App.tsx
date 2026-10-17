import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { GameEngine } from './game/GameEngine';
import { gameUI } from './game/UIStore';
import { HUD } from './ui/HUD';
import { Minimap } from './ui/Minimap';
import { MatchEndScreen, RoundEndScreen, StartScreen } from './ui/Screens';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hud = useSyncExternalStore(gameUI.subscribe, gameUI.getSnapshot, gameUI.getSnapshot);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let instance: GameEngine | null = null;
    try {
      instance = new GameEngine(canvas);
      setEngine(instance);
    } catch (err) {
      console.error('[dust2-strike] failed to initialize:', err);
      setError(
        err instanceof Error
          ? `WebGL初始化失败：${err.message}。请使用支持 WebGL2 的现代浏览器。`
          : 'WebGL初始化失败，请检查浏览器图形支持。',
      );
    }
    return () => {
      instance?.dispose();
    };
  }, []);

  const inMatch = engine && hud.phase !== 'menu';

  return (
    <div className="game-root">
      <canvas ref={canvasRef} className="game-canvas" aria-label="Dust2 Strike 3D battlefield" />
      <div className="canvas-tint" aria-hidden="true" />

      {inMatch && hud.phase !== 'roundEnd' && hud.phase !== 'matchEnd' && (
        <>
          <Minimap engine={engine} />
          <HUD hud={hud} />
        </>
      )}

      {hud.phase === 'menu' && <StartScreen engine={engine} error={error} />}
      {hud.phase === 'roundEnd' && engine && (
        <RoundEndScreen engine={engine} hud={hud} key={`round-${hud.roundNumber}`} />
      )}
      {hud.phase === 'matchEnd' && engine && <MatchEndScreen engine={engine} hud={hud} />}

      {!engine && !error && (
        <div className="boot-overlay">
          <div className="boot-mark">D//S</div>
          <span>构筑 Dust II 战场…</span>
          <div className="boot-line"><i /></div>
        </div>
      )}

    </div>
  );
}

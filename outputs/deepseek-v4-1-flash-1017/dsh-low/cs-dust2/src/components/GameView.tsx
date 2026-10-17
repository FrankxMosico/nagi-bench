import { useEffect, useRef, useState } from 'react';
import type { BuyOption, HudSnapshot, Team } from '../game/types';
import { Game } from '../game/engine';
import { HUD } from './HUD';

interface Props {
  team: Team;
  onExit: () => void;
}

export function GameView({ team, onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [hud, setHud] = useState<HudSnapshot | null>(null);
  const [bootError, setBootError] = useState<string>('');

  useEffect(() => {
    if (!canvasRef.current) return;
    let game: Game;
    try {
      game = new Game({
        canvas: canvasRef.current,
        team,
        onHud: setHud,
      });
      gameRef.current = game;
      if (import.meta.env.DEV) (window as unknown as { __dustGame?: Game }).__dustGame = game;
    } catch (err) {
      console.error(err);
      setBootError(err instanceof Error ? err.message : 'WebGL 初始化失败');
      return;
    }
    return () => {
      game.dispose();
      gameRef.current = null;
    };
  }, [team]);

  const handleBuy = (id: BuyOption['id']) => gameRef.current?.buyWeapon(id);
  const handleCloseBuy = () => gameRef.current?.closeBuy();
  const requestLock = () => gameRef.current?.requestLock();

  return (
    <div className="game-root">
      <canvas ref={canvasRef} className="game-canvas" />
      {hud && <HUD hud={hud} onBuy={handleBuy} onCloseBuy={handleCloseBuy} />}
      {bootError && (
        <div className="boot-error">
          <h2>无法启动 3D 战场</h2>
          <p>{bootError}</p>
          <button onClick={onExit}>返回主界面</button>
        </div>
      )}
      {hud && !hud.locked && !hud.buyOpen && (
        <div className="lock-overlay" onClick={requestLock}>
          <div className="lock-card">
            <span className="lock-kicker">{hud.round === 0 ? 'INITIALIZING' : 'TACTICAL PAUSE'}</span>
            <h2>点击进入战场</h2>
            <p>鼠标将被锁定用于第一人称视角 · 按 <kbd>ESC</kbd> 暂停并释放鼠标</p>
            <div className="lock-actions">
              <button className="primary-btn" onClick={(e) => { e.stopPropagation(); requestLock(); }}>
                继续作战
              </button>
              <button className="ghost-btn" onClick={(e) => { e.stopPropagation(); onExit(); }}>
                退出对局
              </button>
            </div>
            <div className="lock-controls">
              <span><kbd>W A S D</kbd> 移动</span>
              <span><kbd>鼠标</kbd> 瞄准 / 开火</span>
              <span><kbd>右键</kbd> AWP 开镜</span>
              <span><kbd>E</kbd> 安放 / 拆除</span>
              <span><kbd>R</kbd> 换弹</span>
              <span><kbd>1 2 3</kbd> 切换武器</span>
            </div>
          </div>
        </div>
      )}
      {!hud && !bootError && (
        <div className="loading-overlay">
          <div className="loading-mark">DUST<span>//</span>II</div>
          <p>正在生成沙漠战场…</p>
        </div>
      )}
    </div>
  );
}

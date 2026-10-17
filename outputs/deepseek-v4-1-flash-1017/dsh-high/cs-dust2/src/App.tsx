import { useCallback, useEffect, useRef, useState } from 'react';
import { Game } from './game/Game';
import type { HudState } from './game/types';
import { HUD } from './ui/HUD';
import { MainMenu } from './ui/MainMenu';
import { BuyMenu } from './ui/BuyMenu';

export default function App() {
  const shellRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [hud, setHud] = useState<HudState | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [fatal, setFatal] = useState('');

  useEffect(() => {
    if (!shellRef.current) return;
    try {
      const instance = new Game(shellRef.current, (next) => setHud(next));
      gameRef.current = instance;
      setGame(instance);
      return () => {
        instance.dispose();
        gameRef.current = null;
      };
    } catch (err) {
      console.error(err);
      setFatal(err instanceof Error ? err.message : 'WebGL 初始化失败');
    }
  }, []);

  const handleStart = useCallback((team: 'CT' | 'T') => {
    gameRef.current?.startGame(team);
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      gameRef.current?.audio.setEnabled(next);
      return next;
    });
  }, []);

  const winner = hud && hud.ctScore > hud.tScore ? 'CT' : 'T';
  const mvp = hud?.scoreboard.slice().sort((a, b) => b.kills - a.kills)[0];

  return (
    <div className="game-shell" ref={shellRef}>
      {fatal && (
        <div className="fatal-screen">
          <h1>无法启动战术模拟</h1>
          <p>{fatal}</p>
          <small>请确认浏览器启用了 WebGL 与硬件加速。</small>
        </div>
      )}
      {game && hud && (
        <div className="ui-layer">
          {hud.started && <HUD hud={hud} game={game} />}

          {!hud.started && (
            <MainMenu onStart={handleStart} audioEnabled={audioEnabled} onToggleAudio={toggleAudio} />
          )}

          {hud.started && hud.buyOpen && <BuyMenu hud={hud} game={game} />}

          {hud.started && hud.paused && !hud.buyOpen && !hud.matchOver && (
            <div className="menu-overlay pause-overlay">
              <div className="pause-card">
                <div className="pause-sigil">II</div>
                <div className="eyebrow">SIMULATION SUSPENDED</div>
                <h1>战术暂停</h1>
                <p>鼠标已释放。恢复后点击画面重新锁定指针。</p>
                <div className="pause-stats">
                  <div><span>回合</span><b>{hud.round}</b></div>
                  <div><span>比分</span><b className="ct">CT {hud.ctScore}</b><b className="t">T {hud.tScore}</b></div>
                  <div><span>状态</span><b>{hud.phase === 'planted' ? 'C4 倒计时' : '进行中'}</b></div>
                </div>
                <div className="pause-actions">
                  <button className="primary-button wide" onClick={() => game.resume()}>
                    恢复战斗 <span>→</span>
                  </button>
                  <button className="ghost-button wide" onClick={() => game.restartMatch()}>重新开始比赛</button>
                  <button className="ghost-button wide" onClick={() => game.returnToMenu()}>返回主菜单</button>
                </div>
                <button className="sound-toggle" onClick={toggleAudio}>
                  {audioEnabled ? '声音：开启' : '声音：关闭'}
                </button>
                <div className="pause-controls">
                  <span><kbd>WASD</kbd> 移动</span><span><kbd>SHIFT</kbd> 静步</span><span><kbd>SPACE</kbd> 跳跃</span>
                  <span><kbd>E</kbd> 安放 / 拆除</span><span><kbd>R</kbd> 换弹</span><span><kbd>B</kbd> 军械库</span>
                </div>
              </div>
            </div>
          )}

          {hud.started && hud.matchOver && (
            <div className="menu-overlay match-over">
              <div className={`match-card ${winner === 'CT' ? 'ct-win' : 't-win'}`}>
                <div className="match-kicker">MATCH COMPLETE // {winner === 'CT' ? 'COUNTER-TERRORISTS' : 'TERRORISTS'} WIN</div>
                <div className="match-team-mark">{winner}</div>
                <h1>{winner === 'CT' ? '防线守住了' : '目标被摧毁'}</h1>
                <div className="final-score">
                  <div><span>CT</span><b>{hud.ctScore}</b></div>
                  <em>:</em>
                  <div><span>T</span><b>{hud.tScore}</b></div>
                </div>
                {mvp && (
                  <div className="mvp-line">
                    <span>MVP</span>
                    <b>{mvp.name}</b>
                    <small>{mvp.kills} KILLS · {mvp.deaths} DEATHS</small>
                  </div>
                )}
                <div className="match-actions">
                  <button className="primary-button" onClick={() => game.restartMatch()}>再战一场 <span>→</span></button>
                  <button className="ghost-button" onClick={() => game.returnToMenu()}>返回主菜单</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

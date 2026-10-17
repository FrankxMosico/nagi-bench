import type { CSSProperties } from 'react';
import type { Game } from '../game/Game';
import type { HudState, Team } from '../game/types';
import { Minimap } from './Minimap';

interface Props {
  hud: HudState;
  game: Game;
}

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function teamLabel(team: Team): string {
  return team === 'CT' ? 'CT' : 'T';
}

function phaseLabel(hud: HudState): string {
  if (hud.phase === 'freeze') return '准备阶段';
  if (hud.phase === 'planted') return 'C4 已安放';
  if (hud.phase === 'roundEnd') return '回合结束';
  return '行动中';
}

export function HUD({ hud, game }: Props) {
  const p = hud.player;
  if (!p) return null;
  const gap = Math.max(3, Math.min(44, 3.5 + p.spread * 880));
  const low = p.health <= 35;
  const phase = hud.phase;
  const timer = phase === 'planted' ? formatTime(hud.bombTime) : formatTime(hud.roundTime);
  const isScoped = p.scoped && p.alive;
  const showCrosshair = p.alive && !isScoped && !hud.paused && !hud.buyOpen;
  const feed = hud.killfeed.filter((k) => k.age < 9).slice(-5);
  const activeSlot = p.slot;
  const actionProgress = hud.bomb.defuseProgress > 0 ? hud.bomb.defuseProgress : hud.bomb.plantProgress;
  const actionKind = hud.bomb.defuseProgress > 0 ? '拆除 C4' : hud.bomb.plantProgress > 0 ? '安放 C4' : '';

  return (
    <div className="hud">
      <div className="hud-vignette" />
      <div className="hud-grain" />

      <div className="top-center">
        <div className="score-hud">
          <div className="team-score ct-score">
            <div className="team-mark">CT</div>
            <div className="score-stack">
              <b>{hud.ctScore}</b>
              <span>{hud.ctAlive} 存活</span>
            </div>
          </div>
          <div className={`round-clock ${phase}`}>
            <div className="round-label"><span className="round-dot" /> ROUND {String(hud.round).padStart(2, '0')}</div>
            <strong className={phase === 'planted' ? 'bomb-clock' : ''}>{timer}</strong>
            <div className="phase-label">{phaseLabel(hud)}</div>
          </div>
          <div className="team-score t-score">
            <div className="score-stack right">
              <b>{hud.tScore}</b>
              <span>{hud.tAlive} 存活</span>
            </div>
            <div className="team-mark">T</div>
          </div>
        </div>
        <div className="objective-strip">
          <span className="objective-pip" />
          <span>{hud.objective}</span>
        </div>
        {hud.bomb.planted && (
          <div className="bomb-status">
            <div className="bomb-icon">
              <span className="bomb-led" />
              <span>C4</span>
            </div>
            <div>
              <b>炸弹已安放 · {hud.bomb.plantedSite} 点</b>
              <small>{formatTime(hud.bombTime)} 后爆炸</small>
            </div>
            {hud.bomb.defusing && (
              <div className="defuse-live"><span /> 正在拆除</div>
            )}
          </div>
        )}
      </div>

      <div className="top-left">
        <Minimap game={game} />
      </div>

      <div className="top-right">
        <div className="killfeed">
          {feed.map((k) => (
            <div className="kill-entry" key={k.id} style={{ opacity: Math.max(0, 1 - k.age / 10) }}>
              <span className={`kf-name ${k.killerTeam === 'CT' ? 'ct' : 't'}`}>{k.killer}</span>
              <span className="kf-weapon">
                {k.headshot && <i className="headshot-icon" title="爆头">◎</i>}
                {k.weapon}
              </span>
              <span className={`kf-name ${k.victimTeam === 'CT' ? 'ct' : 't'}`}>{k.victim}</span>
            </div>
          ))}
        </div>
        <div className="controls-mini">
          <span><kbd>TAB</kbd> 计分板</span>
          <span><kbd>B</kbd> 军械库</span>
          <span><kbd>ESC</kbd> 暂停</span>
        </div>
      </div>

      <div className="message-area">
        <div className={`message-title ${phase === 'roundEnd' ? 'round-end' : ''}`}>{hud.message}</div>
        {hud.messageSub && <div className="message-sub">{hud.messageSub}</div>}
        {phase === 'freeze' && (
          <div className="freeze-line"><span /> 准备阶段 <span /></div>
        )}
      </div>

      {actionKind && (
        <div className="action-panel">
          <div className="action-head"><span>{actionKind}</span><b>{Math.round(actionProgress * 100)}%</b></div>
          <div className="action-bar"><i style={{ width: `${Math.min(100, actionProgress * 100)}%` }} /></div>
          <small>{hud.bomb.actionHint}</small>
        </div>
      )}

      {!actionKind && hud.bomb.actionHint && phase !== 'freeze' && (
        <div className="hint-panel"><i /><span>{hud.bomb.actionHint}</span></div>
      )}

      <div className={`player-panel ${low ? 'low' : ''}`}>
        <div className="player-head">
          <div className={`team-chip ${p.team === 'CT' ? 'ct' : 't'}`}>{teamLabel(p.team)}</div>
          <div className="player-name-block">
            <div className="player-name">{p.controlledName}</div>
            <div className="player-role">{p.team === 'CT' ? 'COUNTER-TERRORIST' : 'TERRORIST'}</div>
          </div>
          {p.hasBomb && <div className="c4-chip">C4</div>}
        </div>
        <div className="vitals">
          <div className="vital-block hp">
            <div className="vital-icon">✚</div>
            <div className="vital-main">
              <b>{p.alive ? p.health : 0}</b>
              <div className="vital-bar"><i style={{ width: `${p.alive ? p.health : 0}%` }} /></div>
            </div>
          </div>
          <div className="vital-block armor">
            <div className="vital-icon">◆</div>
            <div className="vital-main">
              <b>{p.alive ? p.armor : 0}</b>
              <div className="vital-bar"><i style={{ width: `${p.alive ? p.armor : 0}%` }} /></div>
            </div>
          </div>
        </div>
        <div className="player-status">
          <span className={p.alive ? 'online' : 'offline'}>{p.alive ? 'COMBAT READY' : 'KIA'}</span>
          <span>{p.team === 'CT' ? '守方' : '攻方'}</span>
        </div>
      </div>

      <div className="weapon-panel">
        <div className="weapon-head">
          <div className="weapon-kicker">ACTIVE WEAPON</div>
          <div className="weapon-title-row">
            <b>{p.weapon}</b>
            {p.scoped && <span className="zoom-chip">SCOPED</span>}
            {p.reloading && <span className="reload-chip">RELOADING</span>}
          </div>
        </div>
        <div className="ammo-row">
          <div className="ammo-main">
            {p.ammo < 0 ? <span className="infinity">∞</span> : <b className={p.ammo <= 5 ? 'ammo-low' : ''}>{p.ammo}</b>}
            {p.ammo >= 0 && <span className="reserve">/ {p.reserve}</span>}
          </div>
          <div className="slots">
            <div className={`slot ${activeSlot === 'primary' ? 'active' : ''} ${!p.hasPrimary ? 'empty' : ''}`}>
              <kbd>1</kbd><span>主武器</span>
            </div>
            <div className={`slot ${activeSlot === 'secondary' ? 'active' : ''}`}>
              <kbd>2</kbd><span>手枪</span>
            </div>
            <div className={`slot ${activeSlot === 'melee' ? 'active' : ''}`}>
              <kbd>3</kbd><span>战术刀</span>
            </div>
          </div>
        </div>
      </div>

      {showCrosshair && (
        <div className="crosshair" style={{ '--gap': `${gap}px` } as CSSProperties}>
          <i className="ch top" />
          <i className="ch bottom" />
          <i className="ch left" />
          <i className="ch right" />
          <i className="ch dot" />
        </div>
      )}

      {hud.hitMarker > 0 && (
        <div className={`hitmarker ${hud.player && hud.hitMarker > 0 ? 'active' : ''}`}>
          <i /><i /><i /><i />
        </div>
      )}

      {isScoped && (
        <div className="scope-overlay">
          <div className="scope-mask" />
          <div className="scope-ring">
            <div className="scope-cross-h" />
            <div className="scope-cross-v" />
            <div className="scope-mil-dot" />
            <span className="scope-tick t1" /><span className="scope-tick t2" /><span className="scope-tick t3" />
            <span className="scope-tick b1" /><span className="scope-tick b2" /><span className="scope-tick b3" />
            <span className="scope-tick l1" /><span className="scope-tick l2" />
            <span className="scope-tick r1" /><span className="scope-tick r2" />
            <div className="scope-label">AWP · 8×</div>
          </div>
          <div className="scope-vignette" />
        </div>
      )}

      <div className="damage-vignette" style={{ opacity: hud.damageFlash * 0.8 }} />

      {!hud.pointerLocked && !hud.paused && !hud.buyOpen && !p.scoped && (
        <div className="lock-prompt">点击画面 · 锁定鼠标</div>
      )}

      {!p.alive && phase !== 'roundEnd' && !hud.matchOver && (
        <div className="death-overlay">
          <div className="death-kicker">YOU ARE DEAD</div>
          <div className="death-title">观战模式</div>
          {p.takeoverIn > 0 ? (
            <div className="takeover-line">
              <div className="takeover-bar"><i style={{ width: `${Math.max(0, 100 - (p.takeoverIn / 2.5) * 100)}%` }} /></div>
              <span>{p.takeoverIn.toFixed(1)} 秒后接管存活队友</span>
              <small>按 <kbd>SPACE</kbd> 立即接管</small>
            </div>
          ) : (
            <div className="takeover-line"><span>队伍已无存活成员</span></div>
          )}
        </div>
      )}

      {hud.scoreboardOpen && (
        <div className="scoreboard-overlay">
          <div className="scoreboard-card">
            <div className="scoreboard-head">
              <div>
                <span className="eyebrow">MATCH TELEMETRY</span>
                <h2>战术计分板</h2>
              </div>
              <div className="sb-score">
                <span className="ct">CT {hud.ctScore}</span>
                <em>:</em>
                <span className="t">T {hud.tScore}</span>
              </div>
            </div>
            <div className="scoreboard-columns">
              {(['CT', 'T'] as Team[]).map((team) => (
                <div className={`sb-team ${team === 'CT' ? 'ct' : 't'}`} key={team}>
                  <div className="sb-team-head">
                    <span>{team === 'CT' ? '反恐精英' : '恐怖分子'}</span>
                    <b>{team === 'CT' ? hud.ctScore : hud.tScore}</b>
                  </div>
                  <div className="sb-labels"><span>玩家</span><span>K</span><span>D</span><span>HP</span></div>
                  {hud.scoreboard
                    .filter((row) => row.team === team)
                    .sort((a, b) => b.kills - a.kills)
                    .map((row) => (
                      <div className={`sb-row ${row.isPlayer ? 'me' : ''} ${row.alive ? '' : 'dead'}`} key={row.id}>
                        <span className="sb-player">
                          <i className={row.alive ? 'alive' : 'dead'} />
                          {row.name}
                          {row.isPlayer && <em>YOU</em>}
                        </span>
                        <span>{row.kills}</span>
                        <span>{row.deaths}</span>
                        <span>{row.alive ? row.health : '—'}</span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <div className="scoreboard-foot">按住 TAB 查看 · {hud.phase === 'freeze' ? '准备阶段' : '实时战绩'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

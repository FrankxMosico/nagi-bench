import { useMemo, type CSSProperties } from 'react';
import type { BuyOption, HudSnapshot, Team } from '../game/types';
import { Minimap } from './Minimap';

interface HudProps {
  hud: HudSnapshot;
  onBuy: (id: BuyOption['id']) => void;
  onCloseBuy: () => void;
}

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function TeamBadge({ team, active, score, alive }: { team: Team; active: boolean; score: number; alive: number }) {
  const label = team === 'CT' ? '反恐精英' : '恐怖分子';
  return (
    <div className={`score-team ${team.toLowerCase()} ${active ? 'is-active' : ''}`}>
      <div className="score-team-tag">{team}</div>
      <div className="score-team-info">
        <strong>{score}</strong>
        <small>{label} · {alive} 存活</small>
      </div>
    </div>
  );
}

export function HUD({ hud, onBuy, onCloseBuy }: HudProps) {
  const aliveCT = hud.players.filter((p) => p.team === 'CT' && p.alive).length;
  const aliveT = hud.players.filter((p) => p.team === 'T' && p.alive).length;
  const self = hud.players.find((p) => p.isSelf);
  const timerValue = hud.bombPlanted ? hud.bombTime : hud.phase === 'freeze' ? hud.freezeLeft : hud.timeLeft;
  const timerClass = hud.bombPlanted ? 'bomb' : hud.phase === 'freeze' ? 'freeze' : '';
  const phaseLabel = hud.phase === 'freeze' ? '准备阶段' : hud.phase === 'roundEnd' ? '回合结束' : hud.bombPlanted ? 'C4 计时' : '行动中';
  const gap = Math.max(4, Math.min(18, 4 + hud.spread * 0.11));
  const interactionVisible = hud.interactionKind !== null && (hud.interactionProgress > 0.001 || hud.interactionPrompt.length > 0);
  const healthColor = hud.health <= 25 ? 'critical' : hud.health <= 55 ? 'low' : '';
  const resultClass = hud.roundResult?.winner === hud.playerTeam ? 'victory' : 'defeat';
  const canBuy = hud.phase === 'freeze';

  const sortedBuy = useMemo(() => {
    const groups: Record<string, BuyOption[]> = {};
    for (const option of hud.buyOptions) {
      groups[option.category] ??= [];
      groups[option.category].push(option);
    }
    return groups;
  }, [hud.buyOptions]);

  return (
    <div className={`hud ${hud.playerTeam.toLowerCase()}`}>
      <div className="vignette" />
      <div className="damage-overlay" style={{ opacity: hud.damageFlash * 0.82 }} />
      {hud.scoped && (
        <div className="scope-overlay">
          <div className="scope-circle">
            <div className="scope-v" />
            <div className="scope-h" />
            <div className="scope-dot" />
            <div className="scope-ticks scope-ticks-v" />
            <div className="scope-ticks scope-ticks-h" />
            <span className="scope-range">AWP · 8×</span>
            <span className="scope-brand">OPTIC / 8x42</span>
          </div>
        </div>
      )}

      <div className="top-cluster">
        <div className="round-meta">
          <span className="round-serial">ROUND {String(hud.round).padStart(2, '0')}</span>
          <span className={`round-mode ${hud.pistolRound ? 'pistol' : ''}`}>
            {hud.pistolRound ? 'PISTOL ROUND' : 'TACTICAL'}
          </span>
        </div>
        <div className="score-strip">
          <TeamBadge team="CT" active={hud.playerTeam === 'CT'} score={hud.scoreCT} alive={aliveCT} />
          <div className={`match-clock ${timerClass}`}>
            <span className="phase-label">{phaseLabel}</span>
            <strong>{formatTime(timerValue)}</strong>
            <span className="clock-rule" />
            <small>{hud.bombPlanted ? 'C4 ARMED' : hud.phase === 'freeze' ? '部署倒计时' : 'ROUND TIME'}</small>
          </div>
          <TeamBadge team="T" active={hud.playerTeam === 'T'} score={hud.scoreT} alive={aliveT} />
        </div>
      </div>

      <div className="left-rail">
        <Minimap hud={hud} playerTeam={hud.playerTeam} />
        <div className={`c4-status ${hud.bombPlanted ? 'armed' : hud.c4Carried ? 'carried' : ''}`}>
          <span className="c4-icon">C4</span>
          {hud.bombPlanted ? (
            <div><strong>炸弹已安放</strong><small>{formatTime(hud.bombTime)} 后引爆</small></div>
          ) : hud.c4Carried ? (
            <div><strong>你携带 C4</strong><small>前往 A / B 点按住 E</small></div>
          ) : hud.bombState === 'dropped' ? (
            <div><strong>C4 掉落</strong><small>靠近拾取</small></div>
          ) : (
            <div><strong>C4 待命</strong><small>炸弹由 T 携带</small></div>
          )}
        </div>
      </div>

      <div className="killfeed">
        {hud.killfeed.map((entry) => (
          <div key={entry.id} className={`kill-entry ${entry.killerTeam.toLowerCase()}`}>
            <span className="killer">{entry.killer}</span>
            <span className="weapon">{entry.weapon}</span>
            {entry.headshot && <span className="hs-mark">HS</span>}
            <span className="victim">{entry.victim}</span>
          </div>
        ))}
      </div>

      {hud.phase === 'freeze' && !hud.scoped && (
        <div className="round-banner freeze-banner">
          <span className="banner-kicker">BUY PHASE</span>
          <h2>{hud.roundBanner}</h2>
          <p>{hud.roundSubBanner}</p>
          <div className="banner-countdown">{Math.ceil(hud.freezeLeft)}</div>
          {canBuy && <span className="banner-hint">按 <kbd>B</kbd> 打开军械库</span>}
        </div>
      )}
      {hud.phase === 'roundEnd' && hud.roundResult && !hud.scoped && (
        <div className={`round-banner result-banner ${resultClass}`}>
          <span className="banner-kicker">{hud.roundResult.winner === hud.playerTeam ? 'ROUND SECURED' : 'ROUND LOST'}</span>
          <h2>{hud.roundBanner}</h2>
          <p>{hud.roundResult.reason}</p>
          <span className="banner-hint">下一回合即将开始</span>
        </div>
      )}
      {hud.phase === 'live' && hud.roundBanner && !hud.scoped && (
        <div className="round-banner action-banner">
          <h2>{hud.roundBanner}</h2>
          <p>{hud.roundSubBanner}</p>
        </div>
      )}

      {!hud.scoped && hud.alive && (
        <div className="crosshair" style={{ '--gap': `${gap}px` } as CSSProperties}>
          <i className="ch-top" /><i className="ch-bottom" /><i className="ch-left" /><i className="ch-right" />
          <i className="ch-dot" />
          {hud.hitmarker && (
            <div className={`hitmarker ${hud.headshotMarker ? 'headshot' : ''}`}>
              <i /><i /><i /><i />
            </div>
          )}
        </div>
      )}
      {hud.hitmarker && hud.scoped && (
        <div className="scope-hitmarker"><i /><i /><i /><i /></div>
      )}

      {interactionVisible && (
        <div className={`interaction ${hud.interactionKind}`}>
          <span className="interaction-label">{hud.interactionPrompt}</span>
          <div className="interaction-track">
            <div className="interaction-fill" style={{ width: `${hud.interactionProgress * 100}%` }} />
          </div>
          {hud.interactionProgress > 0 && <span className="interaction-pct">{Math.round(hud.interactionProgress * 100)}%</span>}
        </div>
      )}

      {!hud.alive && (
        <div className="spectate-bar">
          {hud.spectating ? (
            <>
              <span className="spectate-kicker">正在观战</span>
              <strong>{hud.spectatingName}</strong>
              <span className="spectate-tip"><kbd>Q</kbd> / <kbd>E</kbd> 切换队友 · <b>鼠标左键 / 空格</b> 接管操控</span>
            </>
          ) : (
            <>
              <span className="spectate-kicker">你已阵亡</span>
              <strong>等待回合结束</strong>
            </>
          )}
        </div>
      )}

      {hud.killFlash && <div className="kill-flash">目标击倒</div>}

      <div className="bottom-left">
        <div className="vitals-panel">
          <div className={`health-block ${healthColor}`}>
            <span className="vital-icon">+</span>
            <div className="vital-value">{Math.ceil(hud.health)}</div>
            <span className="vital-label">生命</span>
            <div className="health-track"><i style={{ width: `${Math.max(0, hud.health)}%` }} /></div>
          </div>
          <div className="armor-block">
            <span className="vital-icon armor-icon">◇</span>
            <div className="vital-value">{Math.ceil(hud.armor)}</div>
            <span className="vital-label">{hud.helmet ? '护甲 + 头盔' : '护甲'}</span>
          </div>
          <div className="player-meta">
            <span className="team-chip">{hud.playerTeam}</span>
            <span>{hud.playerName}</span>
            <span className="kd">K/D&nbsp; {hud.killCount}/{hud.deathCount}</span>
          </div>
        </div>
      </div>

      <div className="bottom-right">
        <div className="weapon-panel">
          <div className="weapon-header">
            <span>{hud.weaponSlot === 'primary' ? '主武器' : hud.weaponSlot === 'secondary' ? '副武器' : '近战'}</span>
            <span className="weapon-name">{hud.weaponName}</span>
          </div>
          <div className="ammo-line">
            <strong>{hud.weaponSlot === 'melee' ? '∞' : hud.mag}</strong>
            <span className="ammo-slash">/</span>
            <span className="reserve">{hud.weaponSlot === 'melee' ? '—' : hud.reserve}</span>
          </div>
          <div className="weapon-sub">
            <span>{hud.canScope ? '右键开镜' : hud.weaponSlot === 'melee' ? '左键挥刀' : '自动/半自动'}</span>
            <span>{hud.reloading ? '换弹中' : 'R 换弹'}</span>
          </div>
          {hud.reloading && (
            <div className="reload-track"><div className="reload-fill" style={{ width: `${hud.reloadProgress * 100}%` }} /></div>
          )}
          <div className="slot-row">
            {hud.ammoSlots.map((slot) => (
              <span key={slot.slot} className={`slot ${slot.active ? 'active' : ''} ${!slot.has ? 'empty' : ''}`}>
                <b>{slot.slot === 'primary' ? '1' : slot.slot === 'secondary' ? '2' : '3'}</b> {slot.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-center-hint">
        <span><kbd>WASD</kbd> 移动</span>
        <span><kbd>SPACE</kbd> 跳跃</span>
        <span><kbd>E</kbd> 安放 / 拆除</span>
        <span><kbd>1 2 3</kbd> 切枪</span>
        {canBuy && <span>按 <kbd>B</kbd> 军械库</span>}
      </div>

      {hud.buyOpen && (
        <div className="buy-overlay">
          <div className="buy-card">
            <div className="buy-head">
              <div>
                <span className="buy-kicker">ARSENAL // 军械库</span>
                <h2>准备本回合装备</h2>
                <p>{hud.pistolRound ? '手枪局采购 · 仅副武器与护甲可用' : '原型自由采购窗口 · 仅准备阶段可用'}</p>
              </div>
              <div className="buy-wallet">
                <span>可用资金</span>
                <strong>${hud.money}</strong>
              </div>
            </div>
            <div className="buy-grid">
              {Object.entries(sortedBuy).map(([category, options]) => (
                <div className="buy-group" key={category}>
                  <h3>{category}</h3>
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className={`buy-item ${option.unavailable ? 'is-disabled' : ''}`}
                      disabled={option.unavailable}
                      onClick={() => onBuy(option.id)}
                    >
                      <span className="buy-item-name">{option.name}</span>
                      <span className="buy-item-desc">{option.description}</span>
                      <span className="buy-item-price">${option.price}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="buy-foot">
              <span><kbd>ESC</kbd> 或 <kbd>B</kbd> 关闭</span>
              <button className="buy-close" onClick={onCloseBuy}>完成采购</button>
            </div>
          </div>
        </div>
      )}

      <div className="screen-corners" aria-hidden="true"><i /><i /><i /><i /></div>
    </div>
  );
}

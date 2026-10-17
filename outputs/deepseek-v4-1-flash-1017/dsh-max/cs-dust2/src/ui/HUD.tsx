import type { CSSProperties } from 'react';
import { WEAPONS } from '../data/weapons';
import type { HUDState } from '../game/types';

interface Props {
  hud: HUDState;
}

function formatTime(seconds: number): string {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function TeamPips({ team, alive, scoreboard }: { team: 'CT' | 'T'; alive: number; scoreboard: HUDState['scoreboard'] }) {
  const players = scoreboard.filter((entry) => entry.team === team);
  return (
    <div className="team-pips" aria-label={`${alive} alive`}>
      {(players.length > 0 ? players : Array.from({ length: 5 }, () => null)).map((entry, index) => (
        <span key={entry?.name ?? index} className={`pip ${entry && !entry.alive ? 'dead' : ''}`} />
      ))}
    </div>
  );
}

export function HUD({ hud }: Props) {
  const phaseActive = hud.phase === 'live' || hud.phase === 'freeze';
  const activeWeapon = hud.weapons.find((weapon) => weapon.slot === hud.activeSlot);
  const scoped = Boolean(activeWeapon?.scoped && activeWeapon.id === 'awp');
  const flashAge = performance.now() - hud.flashAt;
  const showHit = (hud.flash === 'hit' || hud.flash === 'headshot') && flashAge < 260;
  const showDamage = hud.flash === 'damage' && flashAge < 650;
  const planted = hud.bomb.status === 'planted';
  const liveScoreboard = hud.scoreboard;
  const activeDef = activeWeapon ? WEAPONS[activeWeapon.id] : null;
  const playerWeaponLabel = activeWeapon?.name ?? 'NO WEAPON';
  const ammo = activeWeapon?.slot === 'melee' ? '∞' : String(activeWeapon?.ammo ?? 0).padStart(2, '0');
  const reserve = activeWeapon?.slot === 'melee' ? '—' : String(activeWeapon?.reserve ?? 0).padStart(2, '0');
  const fireMode = activeWeapon?.slot === 'melee'
    ? 'MELEE'
    : activeWeapon?.reloading
      ? 'RELOADING'
      : scoped
        ? 'SCOPED'
        : activeDef?.automatic
          ? 'AUTO'
          : 'SEMI';
  const lowAmmo = activeWeapon && activeWeapon.slot !== 'melee' && activeWeapon.ammo <= Math.ceil((activeWeapon.reserve + 1) / 10);
  const crosshairStyle = { '--crosshair-gap': `${hud.crosshairSpread}px` } as CSSProperties;
  const showPointerHint =
    phaseActive && !hud.pointerLocked && !hud.death.dead;
  const isPistolRound = hud.roundNumber === 1;

  return (
    <div className={`hud hud-${hud.phase}`}>
      {scoped && (
        <div className="scope-overlay">
          <div className="scope-mask" />
          <div className="scope-ring">
            <span className="scope-tick tick-n" />
            <span className="scope-tick tick-e" />
            <span className="scope-tick tick-s" />
            <span className="scope-tick tick-w" />
            <span className="scope-cross-h" />
            <span className="scope-cross-v" />
            <span className="scope-center-dot" />
            <div className="scope-readout scope-readout-left">AWP · 8×</div>
            <div className="scope-readout scope-readout-right">RANGE {Math.round(hud.crosshairSpread)}</div>
          </div>
          <div className="scope-vignette" />
        </div>
      )}

      {!scoped && phaseActive && hud.playerAlive && (
        <div className={`crosshair ${showHit ? 'crosshair-hit' : ''}`} style={crosshairStyle}>
          <span className="ch-line ch-top" />
          <span className="ch-line ch-bottom" />
          <span className="ch-line ch-left" />
          <span className="ch-line ch-right" />
          <span className="ch-dot" />
        </div>
      )}

      {showHit && (
        <div key={`hit-${hud.flashAt}`} className={`hitmarker ${hud.flash === 'headshot' ? 'headshot' : ''}`}>
          <span /><span /><span /><span />
        </div>
      )}
      {showDamage && <div key={`dmg-${hud.flashAt}`} className="damage-vignette" />}
      <div className="screen-grain" />

      <header className="hud-top">
        <div className={`team-block team-ct ${hud.playerTeam === 'CT' ? 'is-player-team' : ''}`}>
          <div className="team-tag">
            <span className="team-symbol">◇</span>
            <span className="team-name">COUNTER-TERRORIST</span>
            <span className="team-side-label">CT</span>
          </div>
          <div className="team-row">
            <span className="team-score">{hud.scoreCT.toString().padStart(2, '0')}</span>
            <TeamPips team="CT" alive={hud.aliveCT} scoreboard={liveScoreboard} />
          </div>
        </div>

        <div className="round-center">
          <div className="round-meta">
            <span>ROUND {String(hud.roundNumber).padStart(2, '0')}</span>
            <span className="meta-divider">/</span>
            <span>{hud.playerTeam === 'T' ? 'OFFENSE' : 'DEFENSE'}</span>
          </div>
          <div className={`round-clock ${planted ? 'bomb-clock' : ''}`}>
            {planted ? (
              <>
                <span className="c4-symbol">◈</span>
                <span>{formatTime(hud.bomb.timer)}</span>
              </>
            ) : (
              <span>{formatTime(hud.roundTimeLeft)}</span>
            )}
          </div>
          <div className="round-subline">
            {planted ? (
              <span className="objective-alert">C4 ARMED · {hud.bomb.plantedSite} SITE</span>
            ) : hud.phase === 'freeze' ? (
              <span className="freeze-count">FREEZE {Math.ceil(hud.freezeTimeLeft)}s</span>
            ) : (
              <span>先到 7 分获胜</span>
            )}
          </div>
        </div>

        <div className={`team-block team-t ${hud.playerTeam === 'T' ? 'is-player-team' : ''}`}>
          <div className="team-tag">
            <span className="team-side-label">T</span>
            <span className="team-name">TERRORIST STRIKE</span>
            <span className="team-symbol">◆</span>
          </div>
          <div className="team-row">
            <TeamPips team="T" alive={hud.aliveT} scoreboard={liveScoreboard} />
            <span className="team-score">{hud.scoreT.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      {hud.phase === 'freeze' && (
        <div className="freeze-banner">
          <div className="freeze-kicker">{isPistolRound ? 'PISTOL ROUND' : 'ROUND DEPLOYMENT'}</div>
          <div className="freeze-title">{isPistolRound ? '手枪局' : `第 ${hud.roundNumber} 回合`}</div>
          <div className="freeze-sub">
            {isPistolRound ? '仅默认手枪与军刀 · 无主武器' : '购买阶段 · 检查装备'}
          </div>
          <div className="freeze-timer">{Math.ceil(hud.freezeTimeLeft)}</div>
        </div>
      )}

      {planted && (
        <div className="bomb-banner">
          <span className="bomb-pulse" />
          <span>C4 已安放</span>
          <strong>{formatTime(hud.bomb.timer)}</strong>
          <span className="bomb-site-label">{hud.bomb.plantedSite} 点</span>
        </div>
      )}

      <div className="hud-left-stack">
        {hud.playerAlive ? (
          <section className="vitals-panel">
            <div className="vitals-callout">
              <span className="callout-dot" />
              {hud.lastCallout}
            </div>
            <div className="vital-row">
              <span className="vital-icon hp-icon">✚</span>
              <div className="vital-main">
                <div className="vital-label">
                  <span>HEALTH</span>
                  <strong className={hud.health <= 30 ? 'critical' : ''}>{hud.health}</strong>
                </div>
                <div className="health-bar">
                  <span
                    style={{
                      width: `${Math.max(0, Math.min(100, hud.health))}%`,
                      background:
                        hud.health > 60
                          ? 'linear-gradient(90deg, #72a584, #b7d8a7)'
                          : hud.health > 30
                            ? 'linear-gradient(90deg, #c69a52, #e0c57b)'
                            : 'linear-gradient(90deg, #9e3830, #e46d53)',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="vital-row armor-row">
              <span className="vital-icon armor-icon">⬡</span>
              <div className="vital-main">
                <div className="vital-label">
                  <span>ARMOR {hud.helmet ? '· HELMET' : ''}</span>
                  <strong>{Math.round(hud.armor)}</strong>
                </div>
                <div className="armor-bar">
                  <span style={{ width: `${Math.max(0, Math.min(100, hud.armor))}%` }} />
                </div>
              </div>
            </div>
            <div className="vitals-meta">
              <span>K {hud.kills.toString().padStart(2, '0')}</span>
              <span>D {hud.deaths.toString().padStart(2, '0')}</span>
              <span>{hud.playerTeam === 'T' ? 'ATTACK' : 'DEFEND'}</span>
            </div>
          </section>
        ) : (
          <section className="vitals-panel vitals-dead">
            <div className="vitals-callout"><span className="callout-dot danger" />K.I.A.</div>
            <div className="dead-name">{hud.playerName}</div>
            <div className="dead-sub">等待队友完成回合</div>
          </section>
        )}

        {hud.hasBomb && (
          <div className="bomb-inventory">
            <span className="c4-chip">C4</span>
            <div>
              <strong>炸弹已携带</strong>
              <span>前往 A / B 点，按住 E 安放</span>
            </div>
          </div>
        )}
      </div>

      {phaseActive && hud.playerAlive && (
        <section className="weapon-panel">
          <div className="weapon-topline">
            <span className="weapon-slot-name">{playerWeaponLabel}</span>
            <span className="weapon-mode">
              {fireMode}
            </span>
          </div>
          <div className="ammo-line">
            <span className={`ammo-mag ${lowAmmo ? 'low' : ''}`}>{ammo}</span>
            <span className="ammo-separator">/</span>
            <span className="ammo-reserve">{reserve}</span>
          </div>
          {activeWeapon?.reloading && (
            <div className="reload-track">
              <span style={{ width: `${Math.round(activeWeapon.reloadProgress * 100)}%` }} />
            </div>
          )}
          <div className="weapon-slots">
            <span className={`slot-key ${hud.activeSlot === 'primary' ? 'active' : ''} ${!hud.weapons.some((w) => w.slot === 'primary') ? 'empty' : ''}`}>
              <b>1</b>{hud.weapons.find((w) => w.slot === 'primary')?.name ?? '—'}
            </span>
            <span className={`slot-key ${hud.activeSlot === 'secondary' ? 'active' : ''}`}>
              <b>2</b>{hud.weapons.find((w) => w.slot === 'secondary')?.name ?? 'PISTOL'}
            </span>
            <span className={`slot-key ${hud.activeSlot === 'melee' ? 'active' : ''}`}>
              <b>3</b>军刀
            </span>
          </div>
          <div className="reload-hint">
            <span>R 换弹</span>
            {activeWeapon?.id === 'awp' && <span>RMB 开镜</span>}
            <span>E 互动</span>
          </div>
        </section>
      )}

      <aside className="killfeed">
        <div className="killfeed-heading">COMBAT LOG</div>
        {hud.killfeed.length === 0 && <div className="killfeed-empty">等待交火信号…</div>}
        {hud.killfeed.slice(-6).reverse().map((entry) => (
          <div className="killfeed-item" key={entry.id}>
            <span className={`kf-name ${entry.killerTeam === 'CT' ? 'ct' : 't'}`}>{entry.killer}</span>
            <span className="kf-weapon">{entry.weapon}{entry.headshot ? <i className="hs-mark">HS</i> : null}</span>
            <span className={`kf-name ${entry.victimTeam === 'CT' ? 'ct' : 't'}`}>{entry.victim}</span>
          </div>
        ))}
      </aside>

      {(hud.bomb.actionType || hud.prompt) && phaseActive && hud.playerAlive && (
        <div className="interaction-area">
          {hud.bomb.actionType && (
            <div className={`action-panel ${hud.bomb.actionType}`}>
              <div className="action-topline">
                <span>{hud.bomb.actionType === 'plant' ? '安放 C4' : '拆除 C4'}</span>
                <strong>{Math.round(hud.bomb.actionProgress * 100)}%</strong>
              </div>
              <div className="action-track">
                <span style={{ width: `${hud.bomb.actionProgress * 100}%` }} />
              </div>
            </div>
          )}
          {hud.prompt && <div className="interaction-prompt">{hud.prompt}</div>}
        </div>
      )}

      {showPointerHint && (
        <div className="pointer-hint">
          <span className="pointer-icon">◉</span>
          <strong>点击画面锁定鼠标</strong>
          <span>浏览器已释放指针 · 战斗仍在继续</span>
        </div>
      )}

      {hud.death.dead && (
        <div className="death-overlay">
          <div className="death-vignette" />
          <div className="death-card">
            <div className="death-kicker">SIGNAL LOST</div>
            <div className="death-title">你已阵亡</div>
            <div className="death-divider" />
            {hud.death.canTakeover ? (
              <>
                <p>正在接管队友 <strong>{hud.death.nextName}</strong></p>
                <div className="takeover-countdown">
                  {Math.ceil(hud.death.countdown * 10) / 10}
                  <span>s</span>
                </div>
                <div className="death-hint">按 <kbd>F</kbd> 立即接管存活队友</div>
              </>
            ) : (
              <p className="no-takeover">没有可接管的队友 · 观战中</p>
            )}
            <div className="death-footnote">回合结束前仍会广播所有击杀信息</div>
          </div>
        </div>
      )}

      <div className="fps-readout">
        <span>{hud.fps} FPS</span>
        <span>{hud.muted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
      </div>
    </div>
  );
}

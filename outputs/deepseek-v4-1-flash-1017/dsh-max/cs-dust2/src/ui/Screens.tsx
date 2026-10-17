import { useState } from 'react';
import { PLAYER_LOADOUT_OPTIONS, WEAPONS } from '../data/weapons';
import type { GameEngine } from '../game/GameEngine';
import type { HUDState, LoadoutSpec, Team, WeaponId } from '../game/types';

interface StartProps {
  engine: GameEngine | null;
  error: string | null;
}

const TEAM_COPY: Record<Team, { title: string; subtitle: string; body: string; tags: string[] }> = {
  CT: {
    title: 'COUNTER-TERRORIST',
    subtitle: 'CT · 防守方',
    body: '守住 A / B 两个炸弹点，阻止 T 安放 C4。用交叉火力切断长道、中门与隧道。',
    tags: ['默认 USP', '防守轮转', '拆除 C4'],
  },
  T: {
    title: 'TERRORIST',
    subtitle: 'T · 进攻方',
    body: '带上 C4 推进炸弹点，撕开 CT 的防线。倒下的队友会掉落炸弹，任何人都可以重新拾取。',
    tags: ['默认 Glock', '安放 C4', '5v5 突袭'],
  },
};

export function StartScreen({ engine, error }: StartProps) {
  const [team, setTeam] = useState<Team>('CT');
  const copy = TEAM_COPY[team];

  return (
    <div className="screen-overlay start-screen">
      <div className="start-backdrop-grid" />
      <div className="start-topline">
        <span>DUST II // PROCEDURAL TACTICAL SIMULATION</span>
        <span className="start-build">BUILD 1.0 · NO EXTERNAL ASSETS</span>
      </div>

      <div className="start-layout">
        <section className="start-hero">
          <div className="eyebrow"><span /> 5v5 TACTICAL FPS</div>
          <h1>
            DUST<span>//</span>STRIKE
          </h1>
          <div className="hero-subtitle">沙漠二 · 核心区域作战原型</div>
          <p className="hero-copy">
            从零搭建的浏览器第一人称战术射击。真实走位连接 A 大、A 点、中门、猫道、B 洞与 B 点。
            手枪局、AK / M4 / AWP、Hitbox 分区伤害、C4 回合与 5v5 自主 AI 战场，全部在代码中运行。
          </p>

          <div className="feature-strip">
            <div><strong>8</strong><span>核心区域</span></div>
            <div><strong>10</strong><span>作战单位</span></div>
            <div><strong>7</strong><span>武器系统</span></div>
            <div><strong>01</strong><span>程序化战场</span></div>
          </div>

          <div className="side-select">
            <div className="side-title">选择阵营 <span>CHOOSE YOUR SIDE</span></div>
            <div className="team-options">
              {(['CT', 'T'] as const).map((side) => (
                <button
                  key={side}
                  className={`team-option ${side.toLowerCase()} ${team === side ? 'selected' : ''}`}
                  onClick={() => {
                    setTeam(side);
                    engine?.audio.uiClick();
                  }}
                >
                  <span className="side-glyph">{side === 'CT' ? '◇' : '◆'}</span>
                  <span className="side-option-title">{side === 'CT' ? 'CT' : 'T'}</span>
                  <span className="side-option-sub">{side === 'CT' ? 'COUNTER-TERRORIST' : 'TERRORIST'}</span>
                  <span className="side-option-mark">{team === side ? 'DEPLOYED' : 'SELECT'}</span>
                </button>
              ))}
            </div>
            <div className="side-detail">
              <h3>{copy.title}</h3>
              <p>{copy.body}</p>
              <div className="side-tags">
                {copy.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>

          <button
            className="deploy-button"
            disabled={!engine || Boolean(error)}
            onClick={() => {
              if (!engine) return;
              engine.audio.uiClick();
              engine.startMatch(team);
            }}
          >
            <span className="deploy-index">01</span>
            <span>{error ? 'WEBGL UNAVAILABLE' : engine ? `以 ${team} 阵营进入战场` : 'INITIALIZING ARENA…'}</span>
            <span className="deploy-arrow">→</span>
          </button>
          {error && <div className="start-error">{error}</div>}
          <div className="start-note">
            点击开始即锁定鼠标。若浏览器拦截，点击游戏画面重新锁定。按 ESC 释放鼠标，按 M 切换声音。
          </div>
        </section>

        <aside className="start-brief">
          <div className="brief-header">
            <span>MISSION BRIEF</span>
            <span>13:07 LOCAL</span>
          </div>
          <div className="brief-map">
            <div className="brief-map-grid" />
            <div className="brief-route route-a" />
            <div className="brief-route route-b" />
            <div className="brief-route route-mid" />
            <span className="brief-node node-a">A</span>
            <span className="brief-node node-b">B</span>
            <span className="brief-node node-mid">MID</span>
            <span className="brief-node node-t">T</span>
            <span className="brief-node node-ct">CT</span>
            <span className="brief-caption">DUST II / ACTIVE DUTY</span>
          </div>
          <div className="brief-block">
            <h4><span>01</span> 标准手枪局</h4>
            <p>第一回合全员仅携带默认手枪与军刀，无主武器。回合结束后可选择下一轮装备。</p>
          </div>
          <div className="brief-block">
            <h4><span>02</span> C4 规则</h4>
            <p>T 携带 C4 进攻。安放后 40 秒爆炸。CT 需要贴近 C4 持续拆包。阵亡后可按 F 接管存活队友。</p>
          </div>
          <div className="brief-block">
            <h4><span>03</span> 操作</h4>
            <div className="control-grid">
              <span><kbd>WASD</kbd>移动</span>
              <span><kbd>鼠标</kbd>瞄准</span>
              <span><kbd>左键</kbd>开火</span>
              <span><kbd>右键</kbd>AWP 开镜</span>
              <span><kbd>空格</kbd>跳跃</span>
              <span><kbd>Ctrl</kbd>蹲伏</span>
              <span><kbd>R</kbd>换弹</span>
              <span><kbd>1 2 3</kbd>切换武器</span>
              <span><kbd>E</kbd>安放 / 拆除</span>
              <span><kbd>Shift</kbd>静步</span>
              <span><kbd>M</kbd>静音</span>
              <span><kbd>F</kbd>接管队友</span>
            </div>
          </div>
          <div className="brief-footer">
            <span>THREE.JS / REACT / TYPESCRIPT</span>
            <span>PROCEDURAL GEO & AUDIO</span>
          </div>
        </aside>
      </div>

      <div className="start-footer">
        <span>© SANDSTONE PROTOCOL</span>
        <span>所有模型、贴图与声音均由代码实时生成</span>
      </div>
    </div>
  );
}

function LoadoutOption({
  weapon,
  selected,
  onSelect,
}: {
  weapon: WeaponId;
  selected: boolean;
  onSelect: () => void;
}) {
  const def = WEAPONS[weapon];
  return (
    <button className={`loadout-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="loadout-card-head">
        <span className="loadout-weapon-name">{def.name}</span>
        <span className="loadout-weapon-slot">{def.slot === 'primary' ? 'PRIMARY' : 'SIDEARM'}</span>
      </div>
      <p>{def.description}</p>
      <div className="loadout-stats">
        <span>DMG <b>{def.damage}</b></span>
        <span>MAG <b>{def.magSize}</b></span>
        <span>ROF <b>{Math.round(60 / def.fireInterval)}</b></span>
      </div>
      <span className="loadout-check">{selected ? 'EQUIPPED' : 'CHOOSE'}</span>
    </button>
  );
}

interface RoundEndProps {
  engine: GameEngine;
  hud: HUDState;
}

export function RoundEndScreen({ engine, hud }: RoundEndProps) {
  const [selection, setSelection] = useState<LoadoutSpec>({ ...hud.loadout });
  const playerTeam = hud.playerTeam;
  const options = PLAYER_LOADOUT_OPTIONS[playerTeam];
  const selectedWon = hud.roundResult.winner === playerTeam;
  const topCT = [...hud.scoreboard].filter((s) => s.team === 'CT').sort((a, b) => b.kills - a.kills).slice(0, 3);
  const topT = [...hud.scoreboard].filter((s) => s.team === 'T').sort((a, b) => b.kills - a.kills).slice(0, 3);

  const choose = (patch: Partial<LoadoutSpec>) => {
    setSelection((previous) => ({ ...previous, ...patch }));
    engine.audio.uiClick();
  };

  return (
    <div className={`screen-overlay round-end-screen ${selectedWon ? 'won' : 'lost'}`}>
      <div className="end-vignette" />
      <div className="round-end-wrap">
        <section className="round-summary">
          <div className="round-end-kicker">
            <span>ROUND {String(hud.roundNumber).padStart(2, '0')}</span>
            <span className="dot-separator">·</span>
            <span>{hud.roundResult.playerWon ? 'SECTOR SECURED' : 'SECTOR LOST'}</span>
          </div>
          <h2>
            {selectedWon ? '回合胜利' : '回合失败'}
            <span>{selectedWon ? 'ROUND WIN' : 'ROUND LOSS'}</span>
          </h2>
          <div className="round-reason">{hud.roundResult.reason}</div>
          <div className="round-score-large">
            <div className="score-side ct">
              <span className="score-tag">COUNTER-TERRORIST</span>
              <strong>{hud.scoreCT.toString().padStart(2, '0')}</strong>
            </div>
            <span className="score-slash">/</span>
            <div className="score-side t">
              <span className="score-tag">TERRORIST</span>
              <strong>{hud.scoreT.toString().padStart(2, '0')}</strong>
            </div>
          </div>
          <div className="round-top-stats">
            <div>
              <span className="stat-heading">CT TOP FRAGS</span>
              {topCT.map((entry) => (
                <div className="stat-row" key={entry.name}>
                  <span className={entry.controlled ? 'is-you' : ''}>{entry.name}</span>
                  <b>{entry.kills} / {entry.deaths}</b>
                </div>
              ))}
            </div>
            <div>
              <span className="stat-heading">T TOP FRAGS</span>
              {topT.map((entry) => (
                <div className="stat-row" key={entry.name}>
                  <span className={entry.controlled ? 'is-you' : ''}>{entry.name}</span>
                  <b>{entry.kills} / {entry.deaths}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="round-footnote">
            {hud.roundNumber === 1 ? '手枪局结束 · 下一回合将装备所选主武器与副武器。' : '装备选择将在下一回合冻结阶段开始时生效。'}
          </div>
        </section>

        <section className="loadout-panel">
          <div className="loadout-header">
            <div>
              <span className="loadout-kicker">NEXT ROUND LOADOUT</span>
              <h3>下回合装备</h3>
            </div>
            <div className={`loadout-team-mark ${playerTeam.toLowerCase()}`}>{playerTeam}</div>
          </div>
          <div className="loadout-block">
            <div className="loadout-label">主武器 <span>PRIMARY</span></div>
            <div className="loadout-options two">
              {options.primaries.map((weapon) => (
                <LoadoutOption
                  key={weapon}
                  weapon={weapon}
                  selected={selection.primary === weapon}
                  onSelect={() => choose({ primary: weapon })}
                />
              ))}
            </div>
          </div>
          <div className="loadout-block">
            <div className="loadout-label">副武器 <span>SIDEARM</span></div>
            <div className="loadout-options two">
              {options.pistols.map((weapon) => (
                <LoadoutOption
                  key={weapon}
                  weapon={weapon}
                  selected={selection.secondary === weapon}
                  onSelect={() => choose({ secondary: weapon })}
                />
              ))}
            </div>
          </div>
          <button
            className={`armor-toggle ${selection.armor > 0 ? 'active' : ''}`}
            onClick={() => choose(selection.armor > 0 ? { armor: 0, helmet: false } : { armor: 100, helmet: true })}
          >
            <span className="armor-toggle-icon">⬡</span>
            <span>
              <strong>KEVLAR + HELMET</strong>
              <small>护甲减伤 · 头盔降低爆头伤害</small>
            </span>
            <span className="toggle-switch">{selection.armor > 0 ? 'ON' : 'OFF'}</span>
          </button>
          <button
            className="next-round-button"
            onClick={() => {
              engine.audio.uiClick();
              engine.startNextRound({
                primary: selection.primary,
                secondary: selection.secondary,
                armor: selection.armor,
                helmet: selection.helmet,
              });
            }}
          >
            <span>部署 · ROUND {hud.roundNumber + 1}</span>
            <span className="deploy-arrow">→</span>
          </button>
          <div className="next-round-note">下一回合开始前有 4 秒冻结时间。选择装备后点击部署。</div>
        </section>
      </div>
    </div>
  );
}

interface MatchEndProps {
  engine: GameEngine;
  hud: HUDState;
}

export function MatchEndScreen({ engine, hud }: MatchEndProps) {
  const playerWon = hud.matchWinner === hud.playerTeam;
  const ct = [...hud.scoreboard].filter((entry) => entry.team === 'CT').sort((a, b) => b.kills - a.kills);
  const t = [...hud.scoreboard].filter((entry) => entry.team === 'T').sort((a, b) => b.kills - a.kills);
  return (
    <div className={`screen-overlay match-end-screen ${playerWon ? 'won' : 'lost'}`}>
      <div className="match-result-glow" />
      <div className="match-result">
        <div className="match-kicker">DUST II // MATCH COMPLETE</div>
        <div className="match-word">{playerWon ? 'VICTORY' : 'DEFEAT'}</div>
        <h2>{playerWon ? '行动成功' : '行动失败'}</h2>
        <div className="match-final-score">
          <span className={hud.playerTeam === 'CT' ? 'highlight' : ''}>{hud.scoreCT} <small>CT</small></span>
          <i>:</i>
          <span className={hud.playerTeam === 'T' ? 'highlight' : ''}>{hud.scoreT} <small>T</small></span>
        </div>
        <div className="match-scoreboard">
          <div>
            <div className="match-team-head ct">COUNTER-TERRORIST</div>
            {ct.map((entry) => (
              <div className={`match-player-row ${entry.controlled ? 'you' : ''}`} key={entry.name}>
                <span>{entry.name}</span>
                <b>{entry.kills}</b>
                <small>{entry.deaths}</small>
              </div>
            ))}
          </div>
          <div>
            <div className="match-team-head t">TERRORIST</div>
            {t.map((entry) => (
              <div className={`match-player-row ${entry.controlled ? 'you' : ''}`} key={entry.name}>
                <span>{entry.name}</span>
                <b>{entry.kills}</b>
                <small>{entry.deaths}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="match-actions">
          <button
            className="deploy-button"
            onClick={() => {
              engine.audio.uiClick();
              engine.startMatch(engine.playerTeam);
            }}
          >
            <span>再来一局</span><span className="deploy-arrow">→</span>
          </button>
          <button
            className="ghost-button"
            onClick={() => {
              engine.audio.uiClick();
              engine.returnToMenu();
            }}
          >
            返回简报
          </button>
        </div>
        <div className="match-footnote">5V5 · 战术原型 · 先到 7 分获胜</div>
      </div>
    </div>
  );
}

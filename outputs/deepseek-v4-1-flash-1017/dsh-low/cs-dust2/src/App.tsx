import { useState } from 'react';
import type { Team } from './game/types';
import { GameView } from './components/GameView';

const FEATURES = [
  ['5v5 战术对抗', '玩家 + 4 名 AI 队友对抗 5 名 AI 敌人'],
  ['完整 Dust2 核心区', 'T / CT 出生点、A大、A点、中门、猫道、B洞、B点'],
  ['分区命中判定', '头 / 胸 / 腹 / 臂 / 腿独立 Hitbox，爆头双倍伤害'],
  ['C4 回合制', '下包、拆包、掉落、拾取、爆炸与攻防结算'],
  ['程序化战场', '几何体地图、类人角色、武器与 Web Audio 音效'],
  ['智能 BOT', 'A* 寻路、视野遮挡、交火、下包与拆包'],
];

const WEAPON_STATS = [
  { name: 'AK-47', role: 'T 主武器', stat: '高伤害 · 强后坐力', width: 92 },
  { name: 'M4A4', role: 'CT 主武器', stat: '低后坐力 · 高射速', width: 74 },
  { name: 'AWP', role: '狙击步枪', stat: '单发致命 · 右键开镜', width: 98 },
  { name: 'DEAGLE', role: '手枪', stat: '高穿透 · 7 发弹匣', width: 58 },
];

export default function App() {
  const [screen, setScreen] = useState<'menu' | 'game'>('menu');
  const [team, setTeam] = useState<Team>('CT');

  if (screen === 'game') {
    return <GameView key={team} team={team} onExit={() => setScreen('menu')} />;
  }

  return (
    <main className={`menu-screen ${team.toLowerCase()}`}>
      <div className="menu-bg-grid" />
      <div className="menu-noise" />
      <header className="menu-top">
        <div className="brand-lock">
          <span className="brand-mark">D2</span>
          <div>
            <span className="brand-overline">TACTICAL FPS PROTOTYPE</span>
            <strong>DUST OPERATIONS</strong>
          </div>
        </div>
        <div className="menu-meta">
          <span>BUILD 1.0 / THREE.JS</span>
          <span className="live-dot">NO EXTERNAL ASSETS</span>
        </div>
      </header>

      <section className="hero-grid">
        <div className="hero-copy">
          <span className="hero-overline">操作简报 // OPERATION DUST</span>
          <h1>
            沙漠核心区
            <br /><span className="accent">5 V 5</span> 战术行动
          </h1>
          <p className="hero-desc">
            程序化重建 Dust2 核心走位。选择阵营，与四名 AI 队友协同推进：
            控制 A大与中门，争夺 A / B 两个炸弹点。下包，或者拆包。
          </p>
          <div className="feature-grid">
            {FEATURES.map(([title, text]) => (
              <div className="feature-item" key={title}>
                <span className="feature-slash">//</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="team-select-label">选择你的阵营 / CHOOSE SIDE</div>
          <div className="team-select">
            <button className={`team-card ct ${team === 'CT' ? 'selected' : ''}`} onClick={() => setTeam('CT')}>
              <span className="team-card-index">01</span>
              <strong>CT</strong>
              <span className="team-card-name">反恐精英 · 防守方</span>
              <p>默认 USP-S · 阻止 T 安放炸弹，或在倒计时内完成拆除。</p>
              <span className="team-card-tag">拆弹专家 / DEFUSE</span>
            </button>
            <button className={`team-card t ${team === 'T' ? 'selected' : ''}`} onClick={() => setTeam('T')}>
              <span className="team-card-index">02</span>
              <strong>T</strong>
              <span className="team-card-name">恐怖分子 · 进攻方</span>
              <p>默认 Glock-18 · 将 C4 安放至 A 点或 B 点并守到爆炸。</p>
              <span className="team-card-tag">爆破小组 / DEMOLITION</span>
            </button>
          </div>
          <div className="hero-actions">
            <button className="start-btn" onClick={() => setScreen('game')}>
              <span>进入战场</span>
              <small>DEPLOY TO DUST II</small>
              <i>→</i>
            </button>
            <div className="controls-summary">
              <span><kbd>WASD</kbd> 移动 · <kbd>SPACE</kbd> 跳跃</span>
              <span><kbd>鼠标</kbd> 瞄准 / 开火 · <kbd>右键</kbd> 开镜</span>
              <span><kbd>E</kbd> 安放/拆除 · <kbd>R</kbd> 换弹 · <kbd>B</kbd> 军械库</span>
            </div>
          </div>
        </div>

        <aside className="hero-aside">
          <div className="map-brief">
            <div className="map-brief-head">
              <span>DUST CORE / 战术俯瞰</span>
              <span className="map-scale">1 : 200</span>
            </div>
            <div className="blueprint">
              <svg viewBox="0 0 360 380" role="img" aria-label="Dust2 tactical blueprint">
                <defs>
                  <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0 L0 0 0 20" fill="none" stroke="rgba(232,210,167,0.08)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="360" height="380" fill="url(#bpGrid)" />
                <g fill="none" stroke="rgba(232,210,167,0.34)" strokeWidth="2">
                  <path d="M44 250 H130 V330 H44 Z" />
                  <path d="M145 250 H230 V330 H145 Z" />
                  <path d="M230 250 H315 V330 H230 Z" />
                  <path d="M44 95 H130 V220 H44 Z" />
                  <path d="M145 70 H230 V220 H145 Z" />
                  <path d="M230 95 H315 V220 H230 Z" />
                  <path d="M135 250 H140 M225 250 H230" />
                  <path d="M44 220 H130 V250 H44" />
                  <path d="M230 220 H315 V250 H230" />
                </g>
                <g fill="rgba(232,210,167,0.06)" stroke="rgba(232,210,167,0.23)">
                  <rect x="54" y="105" width="25" height="38" />
                  <rect x="285" y="110" width="18" height="26" />
                  <rect x="238" y="268" width="28" height="18" />
                </g>
                <g fill="rgba(240,216,173,0.8)" fontFamily="Arial Narrow, Arial" fontSize="15" fontWeight="700">
                  <text x="252" y="113">A SITE</text>
                  <text x="58" y="113">B SITE</text>
                  <text x="164" y="238">MID</text>
                  <text x="253" y="239">LONG A</text>
                  <text x="64" y="240">TUNNELS</text>
                  <text x="130" y="358">T SPAWN</text>
                  <text x="133" y="54">CT SPAWN</text>
                </g>
                <g fill="#db9b55">
                  <circle cx="273" cy="122" r="5" />
                  <circle cx="76" cy="122" r="5" />
                </g>
                <path d="M180 342 C180 300 180 300 180 270" stroke="#dc9b50" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                <path d="M180 260 C210 250 240 240 262 216" stroke="rgba(220,155,80,0.55)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
                <path d="M180 260 C144 248 112 232 92 208" stroke="rgba(220,155,80,0.55)" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
                <g fill="rgba(232,210,167,0.4)" fontFamily="monospace" fontSize="9">
                  <text x="16" y="28">N ↑</text>
                  <text x="292" y="368">DUST II</text>
                  <text x="16" y="368">// TAC MAP 01</text>
                </g>
              </svg>
            </div>
            <div className="map-brief-foot">
              <span><i className="bp-dot a" />A 点</span>
              <span><i className="bp-dot b" />B 点</span>
              <span><i className="bp-dash" />进攻路线</span>
            </div>
          </div>

          <div className="weapon-brief">
            <div className="aside-title"><span>武器库</span><small>WEAPON READINESS</small></div>
            {WEAPON_STATS.map((w) => (
              <div className="weapon-stat" key={w.name}>
                <div className="weapon-stat-head"><strong>{w.name}</strong><span>{w.role}</span></div>
                <div className="weapon-stat-bar"><i style={{ width: `${w.width}%` }} /></div>
                <small>{w.stat}</small>
              </div>
            ))}
          </div>

          <div className="round-intel">
            <span className="aside-title">初始配置</span>
            <div className="intel-row"><span>回合 01</span><strong>手枪局 · 轻甲</strong></div>
            <div className="intel-row"><span>移动</span><strong>无冲刺 · 物理碰撞</strong></div>
            <div className="intel-row"><span>音频</span><strong>Web Audio 实时合成</strong></div>
          </div>
        </aside>
      </section>

      <footer className="menu-footer">
        <span>DUST OPERATIONS // A PROCEDURAL 3D FPS PROTOTYPE</span>
        <span>REACT 18 · TYPESCRIPT · THREE.JS · NO EXTERNAL ASSETS</span>
      </footer>
    </main>
  );
}

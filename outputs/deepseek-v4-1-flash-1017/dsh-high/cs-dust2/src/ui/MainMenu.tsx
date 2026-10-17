import { useEffect, useState } from 'react';
import type { Team } from '../game/types';

interface Props {
  onStart: (team: Team) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export function MainMenu({ onStart, audioEnabled, onToggleAudio }: Props) {
  const [team, setTeam] = useState<Team>('CT');

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.code === 'Enter') onStart(team);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [team, onStart]);

  return (
    <div className="menu-overlay main-menu">
      <div className="menu-atmosphere" />
      <header className="menu-nav">
        <div className="brand-lockup">
          <div className="brand-mark">D<span>II</span></div>
          <div className="brand-copy">
            <b>STRIKE PROTOCOL</b>
            <small>DUST II · TACTICAL FPS PROTOTYPE</small>
          </div>
        </div>
        <div className="menu-nav-right">
          <div className="server-status"><i /> LOCAL SIMULATION</div>
          <button className="icon-button" onClick={onToggleAudio} title={audioEnabled ? '静音' : '开启声音'}>
            {audioEnabled ? '◖)))' : '◖×'}
          </button>
        </div>
      </header>

      <main className="menu-main">
        <section className="menu-hero">
          <div className="hero-kicker"><span /> DECLASSIFIED // DUST II</div>
          <h1>
            DUST<span>II</span>
            <br />
            <em>STRIKE PROTOCOL</em>
          </h1>
          <p className="hero-copy">
            程序化重建的 Dust2 核心战区。5v5 战术对抗，C4 攻防，真实弹道与命中分区。
            没有贴图、没有模型文件——这里的一切都由几何体与代码构成。
          </p>
          <div className="hero-tags">
            <span>5V5 AI WARFARE</span>
            <span>C4 OBJECTIVE</span>
            <span>PROCEDURAL WORLD</span>
          </div>
          <div className="map-facts">
            <div><b>7</b><span>A大 · 中门 · 猫道<br />B洞 · A/B点 · 双出生点</span></div>
            <div><b>06</b><span>AK-47 · M4A4 · AWP<br />GLOCK · USP · DEAGLE</span></div>
            <div><b>10</b><span>头 / 胸 / 腹 / 手臂 / 腿<br />独立命中判定</span></div>
          </div>
        </section>

        <section className="deploy-panel">
          <div className="panel-eyebrow">SELECT YOUR SIDE</div>
          <h2>选择阵营</h2>
          <div className="team-select">
            <button
              className={`team-card ct ${team === 'CT' ? 'active' : ''}`}
              onClick={() => setTeam('CT')}
            >
              <div className="team-card-bg" />
              <div className="team-card-top">
                <span className="team-sigil">CT</span>
                <span className="team-radio">{team === 'CT' ? '● SELECTED' : '○ STANDBY'}</span>
              </div>
              <div className="team-card-copy">
                <h3>反恐精英</h3>
                <p>驻守 A/B 点，阻止炸弹安放。炸弹落地后，突入点位完成拆除。</p>
              </div>
              <div className="team-loadout">
                <span>USP-S</span><span>M4A4</span><span>护甲</span>
              </div>
            </button>
            <button
              className={`team-card t ${team === 'T' ? 'active' : ''}`}
              onClick={() => setTeam('T')}
            >
              <div className="team-card-bg" />
              <div className="team-card-top">
                <span className="team-sigil">T</span>
                <span className="team-radio">{team === 'T' ? '● SELECTED' : '○ STANDBY'}</span>
              </div>
              <div className="team-card-copy">
                <h3>恐怖分子</h3>
                <p>突破 A 大、B 洞或中门，控制包点并安放 C4。守住 40 秒倒计时。</p>
              </div>
              <div className="team-loadout">
                <span>GLOCK-18</span><span>AK-47</span><span>C4</span>
              </div>
            </button>
          </div>

          <div className="deploy-note">
            <div className="pistol-badge">ROUND 01</div>
            <div>
              <b>首回合为手枪局</b>
              <span>全员仅携带默认手枪与战术刀，无主武器、无护甲。第 2 回合起开放军械库，按 B 配置。</span>
            </div>
          </div>

          <button className="deploy-button" onClick={() => onStart(team)}>
            <span className="deploy-arrow">↗</span>
            <span className="deploy-label">
              部署至 DUST II
              <small>{team === 'CT' ? 'DEFEND THE SITE' : 'PLANT THE OBJECTIVE'}</small>
            </span>
            <span className="deploy-key">ENTER</span>
          </button>

          <div className="controls-grid">
            <div><kbd>W A S D</kbd><span>移动</span></div>
            <div><kbd>SPACE</kbd><span>跳跃 / 接管</span></div>
            <div><kbd>MOUSE 1</kbd><span>开火</span></div>
            <div><kbd>MOUSE 2</kbd><span>AWP 开镜</span></div>
            <div><kbd>R</kbd><span>换弹</span></div>
            <div><kbd>1 / 2 / 3</kbd><span>切换武器</span></div>
            <div><kbd>E</kbd><span>安放 / 拆除</span></div>
            <div><kbd>SHIFT</kbd><span>静步</span></div>
          </div>
        </section>
      </main>

      <footer className="menu-footer">
        <div><span className="footer-dot" /> THREE.JS / REACT / TYPESCRIPT</div>
        <div>100% PROCEDURAL ASSETS · WEB AUDIO SYNTHESIS</div>
        <div className="footer-warning">PROTOTYPE BUILD · AI 5V5</div>
      </footer>
    </div>
  );
}

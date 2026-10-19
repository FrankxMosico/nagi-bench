import type { HudSnapshot, Settings } from '../client/HudStore.ts';
import { useClient } from './context.ts';

function SettingsFields({ s }: { s: Settings }) {
  const client = useClient();
  return (
    <div className="settings">
      <label>
        鼠标灵敏度 <b>{s.sensitivity.toFixed(2)}</b>
        <input
          type="range"
          min={0.2}
          max={3}
          step={0.05}
          value={s.sensitivity}
          onChange={(e) => client.updateSettings({ sensitivity: Number(e.target.value) })}
        />
      </label>
      <label>
        音量 <b>{Math.round(s.volume * 100)}%</b>
        <input type="range" min={0} max={1} step={0.05} value={s.volume} onChange={(e) => client.updateSettings({ volume: Number(e.target.value) })} />
      </label>
    </div>
  );
}

function Toggle<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="toggle">
      {options.map(([v, label]) => (
        <button key={v} type="button" className={v === value ? 'on' : ''} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}

const CONTROLS: [string, string][] = [
  ['WASD', '移动'],
  ['鼠标', '视角（点击画面锁定指针）'],
  ['左键 / 右键', '开火 / AWP 开镜 · 刀重击'],
  ['空格', '跳跃'],
  ['C · Shift', '蹲下 · 静步'],
  ['R', '换弹'],
  ['1 2 3 5 · Q · 滚轮', '主武器 / 副武器 / 刀 / C4 · 上一把'],
  ['E', '拆包 · 捡枪 · 死亡后接管队友'],
  ['G', '丢弃武器 / C4'],
  ['B · Tab', '购买菜单 · 记分板'],
];

export function MainMenu({ h }: { h: HudSnapshot }) {
  const client = useClient();
  const s = h.settings;
  return (
    <div className="menu-backdrop">
      <div className="menu">
        <div className="title">
          DUST<span>2</span>
          <small>5v5 · 爆破模式 · 浏览器原型</small>
        </div>
        <div className="menu-grid">
          <div className="col">
            <h3>阵营</h3>
            <Toggle
              value={s.team}
              options={[
                ['CT', '反恐精英 CT'],
                ['T', '恐怖分子 T'],
              ]}
              onChange={(team) => client.updateSettings({ team })}
            />
            <h3>开局</h3>
            <Toggle
              value={s.firstRound}
              options={[
                ['pistol', '手枪局'],
                ['rifle', '长枪局'],
              ]}
              onChange={(firstRound) => client.updateSettings({ firstRound })}
            />
            <h3>电脑难度</h3>
            <Toggle
              value={s.difficulty}
              options={[
                ['easy', '简单'],
                ['normal', '普通'],
                ['hard', '困难'],
              ]}
              onChange={(difficulty) => client.updateSettings({ difficulty })}
            />
            <SettingsFields s={s} />
            <button type="button" className="primary big" onClick={() => client.startMatch()}>
              开始游戏
            </button>
            <p className="note">先赢 8 回合的一方获胜。你 + 4 名 AI 队友 vs 5 名 AI 敌人。</p>
          </div>
          <div className="col">
            <h3>操作</h3>
            <table className="controls">
              <tbody>
                {CONTROLS.map(([k, v]) => (
                  <tr key={k}>
                    <td>
                      <kbd>{k}</kbd>
                    </td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note">
              T：把 C4 带到 A点 或 B点，切到 C4（5）按住左键安放。CT：阻止下包，或站在炸弹旁按住 E 拆除。阵亡后可观战并按 E 接管存活的 AI 队友。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PauseMenu({ h }: { h: HudSnapshot }) {
  const client = useClient();
  return (
    <div className="menu-backdrop light">
      <div className="menu small">
        <h2>已暂停</h2>
        <button type="button" className="primary big" onClick={() => client.resume()}>
          继续游戏
        </button>
        <SettingsFields s={h.settings} />
        <button type="button" onClick={() => client.quitToMenu()}>
          返回主菜单
        </button>
        {h.lockRetry && <p className="note">浏览器暂时拒绝锁定鼠标（按 Esc 后约 1 秒内不允许重新锁定），请稍等再点「继续游戏」。</p>}
        {h.lockFailed && <p className="note">浏览器拒绝了指针锁定，已切换为直接鼠标移动模式。</p>}
      </div>
    </div>
  );
}

export function MatchOverPanel({ h }: { h: HudSnapshot }) {
  const client = useClient();
  const m = h.matchOver;
  if (!m) return null;
  const won = h.humanTeam === m.winner;
  return (
    <div className="menu-backdrop light">
      <div className="menu small">
        <h2 className={m.winner === 'T' ? 't' : 'ct'}>{won ? '胜利！' : '失败'}</h2>
        <div className="final-score">
          <span className="t">T {m.scoreT}</span> : <span className="ct">{m.scoreCT} CT</span>
        </div>
        <button type="button" className="primary big" onClick={() => client.startMatch()}>
          再来一局
        </button>
        <button type="button" onClick={() => client.quitToMenu()}>
          返回主菜单
        </button>
      </div>
    </div>
  );
}

export function BuyMenu({ h }: { h: HudSnapshot }) {
  const client = useClient();
  return (
    <div className="buy-menu">
      <h3>购买（{h.roundLabel}）</h3>
      {h.buyItems.map((it) => (
        <button key={it.id} type="button" onClick={() => client.buy(it.id)}>
          <kbd>{it.key}</kbd> {it.name} <small>{it.slot}</small>
        </button>
      ))}
      <p className="note">原型无经济系统：购买免费。按 B 关闭。</p>
    </div>
  );
}

export function Scoreboard({ h }: { h: HudSnapshot }) {
  const teams = [
    { team: 'CT' as const, label: '反恐精英', score: h.scoreCT },
    { team: 'T' as const, label: '恐怖分子', score: h.scoreT },
  ];
  return (
    <div className="scoreboard">
      {teams.map((t) => (
        <div key={t.team} className={`sb-team ${t.team === 'T' ? 't' : 'ct'}`}>
          <div className="sb-head">
            <span>{t.label}</span>
            <b>{t.score}</b>
          </div>
          <table>
            <thead>
              <tr>
                <th>玩家</th>
                <th>击杀</th>
                <th>死亡</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {h.scoreboard
                .filter((r) => r.team === t.team)
                .map((r) => (
                  <tr key={r.id} className={`${r.alive ? '' : 'dead'}${r.you ? ' you' : ''}`}>
                    <td>
                      {r.name}
                      {r.bot ? '' : ' ★'}
                    </td>
                    <td>{r.kills}</td>
                    <td>{r.deaths}</td>
                    <td className="icons">
                      {r.bomb && <span className="badge c4">C4</span>}
                      {r.kit && <span className="badge kit">钳</span>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

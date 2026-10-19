import type { HudSnapshot } from '../client/HudStore.ts';
import { Crosshair, DamageOverlay, ScopeOverlay } from './FrameWidgets.tsx';
import { Minimap } from './Minimap.tsx';
import { BuyMenu, MainMenu, MatchOverPanel, PauseMenu, Scoreboard } from './Menus.tsx';
import { useHud } from './context.ts';

function fmtTime(sec: number): string {
  const s = Math.max(0, sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function TopBar({ h }: { h: HudSnapshot }) {
  const timer = h.phase === 'freeze' ? fmtTime(h.freezeLeft) : fmtTime(h.timeLeft);
  return (
    <div className="topbar">
      <div className="team-alive t">
        {h.aliveT.map((a, i) => (
          <i key={i} className={a ? 'on' : ''} />
        ))}
      </div>
      <div className="score t">{h.scoreT}</div>
      <div className={`clock${h.bombPlanted ? ' bomb' : ''}${h.phase === 'freeze' ? ' freeze' : ''}`}>
        {h.bombPlanted ? (
          <>
            <span className="bomb-icon">C4</span>
            <span>{h.bombTimeLeft}s</span>
          </>
        ) : (
          timer
        )}
        <small>
          第 {h.round} 回合 · {h.roundLabel}
        </small>
      </div>
      <div className="score ct">{h.scoreCT}</div>
      <div className="team-alive ct">
        {h.aliveCT.map((a, i) => (
          <i key={i} className={a ? 'on' : ''} />
        ))}
      </div>
    </div>
  );
}

function Killfeed({ h }: { h: HudSnapshot }) {
  return (
    <div className="killfeed">
      {h.killfeed.map((k) => (
        <div key={k.id} className={`kf-row${k.involvesHuman ? ' me' : ''}`}>
          {k.killer && <span className={`kf-name ${k.killerTeam === 'T' ? 't' : 'ct'}`}>{k.killer}</span>}
          <span className="kf-weapon">{k.weapon}</span>
          {k.headshot && <span className="kf-hs" title="爆头">⌖</span>}
          <span className={`kf-name ${k.victimTeam === 'T' ? 't' : 'ct'}`}>{k.victim}</span>
        </div>
      ))}
    </div>
  );
}

function Status({ h }: { h: HudSnapshot }) {
  const v = h.view;
  if (!v) return null;
  const low = v.health <= 25;
  return (
    <>
      <div className={`status-left ${v.team === 'T' ? 't' : 'ct'}`}>
        <div className={`stat hp${low ? ' low' : ''}`}>
          <span className="icon">✚</span>
          <span className="val">{v.health}</span>
          <div className="bar">
            <div style={{ width: `${v.health}%` }} />
          </div>
        </div>
        <div className="stat ar">
          <span className="icon">{v.helmet ? '⛑' : '⛨'}</span>
          <span className="val">{v.armor}</span>
          <div className="bar">
            <div style={{ width: `${v.armor}%` }} />
          </div>
        </div>
        <div className="badges">
          {v.kit && <span className="badge kit">拆弹器</span>}
          {v.hasBomb && <span className="badge c4">C4</span>}
          {!v.isSelf && <span className="badge spec">观战 {v.name}</span>}
        </div>
      </div>
      <div className="status-right">
        <div className="slots">
          {v.slots.map((s) => (
            <div key={s.key} className={`slot${s.active ? ' active' : ''}`}>
              <b>{s.key}</b>
              {s.name}
            </div>
          ))}
        </div>
        <div className="weapon-name">{v.weaponName}</div>
        {v.usesAmmo && (
          <div className={`ammo${v.mag === 0 ? ' empty' : v.mag <= v.magSize * 0.25 ? ' lowammo' : ''}`}>
            <span className="mag">{v.reloading ? '…' : v.mag}</span>
            <span className="sep">/</span>
            <span className="reserve">{v.reserve}</span>
            <div className="bullets">
              {Array.from({ length: Math.min(v.magSize, 30) }, (_, i) => (
                <i key={i} className={i < Math.round((v.mag / v.magSize) * Math.min(v.magSize, 30)) ? 'on' : ''} />
              ))}
            </div>
          </div>
        )}
        {v.reloading && <div className="reloading">换弹中…</div>}
      </div>
    </>
  );
}

function Center({ h }: { h: HudSnapshot }) {
  return (
    <>
      {h.announcement && (
        <div key={h.announcement.id} className={`announce tone-${h.announcement.tone}`}>
          <div className="a-title">{h.announcement.text}</div>
          {h.announcement.sub && <div className="a-sub">{h.announcement.sub}</div>}
        </div>
      )}
      {h.progress && (
        <div className={`progress ${h.progress.tone === 'T' ? 't' : 'ct'}`}>
          <div className="p-label">{h.progress.label}</div>
          <div className="p-track">
            <div className="p-fill" style={{ width: `${(h.progress.value * 100).toFixed(1)}%` }} />
          </div>
        </div>
      )}
      {h.hint && <div className="hint">{h.hint}</div>}
      {h.spectating && (
        <div className={`spectate ${h.spectating.team === 'T' ? 't' : 'ct'}`}>
          <div>
            正在观战 <b>{h.spectating.name}</b>
          </div>
          {h.spectating.canTakeOver && <div className="take">按 E 接管</div>}
        </div>
      )}
      {h.deathCam && (
        <div className="deathcam">
          你已阵亡{h.deathCam.killer ? <> · 击杀者 <b>{h.deathCam.killer}</b></> : null}
        </div>
      )}
    </>
  );
}

export function Hud() {
  const h = useHud();
  const inGame = h.started;
  return (
    <div className="hud-root">
      {inGame && (
        <>
          <ScopeOverlay />
          <DamageOverlay />
          <Crosshair />
          <div className="radar">
            <Minimap />
            {h.view && <div className="location">{h.view.location}</div>}
            {h.plan && <div className="plan">{h.plan}</div>}
          </div>
          <TopBar h={h} />
          <Killfeed h={h} />
          <Status h={h} />
          <Center h={h} />
          {h.buyOpen && <BuyMenu h={h} />}
          {h.scoreboardOpen && h.screen !== 'menu' && <Scoreboard h={h} />}
          {h.matchOver && <MatchOverPanel h={h} />}
          {h.screen === 'paused' && !h.matchOver && <PauseMenu h={h} />}
        </>
      )}
      {h.screen === 'menu' && <MainMenu h={h} />}
    </div>
  );
}

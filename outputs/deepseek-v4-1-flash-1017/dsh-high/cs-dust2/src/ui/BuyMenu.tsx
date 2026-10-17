import type { HudState } from '../game/types';
import type { Game } from '../game/Game';
import { BUY_OPTIONS, WEAPONS, type WeaponId } from '../game/weapons';

interface Props {
  hud: HudState;
  game: Game;
}

const WEAPON_STATS: Record<string, { dmg: string; rate: string; ctrl: string }> = {
  ak47: { dmg: '36', rate: '600 RPM', ctrl: '低稳定' },
  m4a4: { dmg: '30', rate: '730 RPM', ctrl: '高稳定' },
  awp: { dmg: '115', rate: '单发', ctrl: '开镜' },
  deagle: { dmg: '48', rate: '半自动', ctrl: '7 发' },
};

function WeaponGlyph({ id }: { id: string }) {
  return (
    <div className={`weapon-glyph glyph-${id}`}>
      <i className="wg-body" />
      <i className="wg-barrel" />
      <i className="wg-mag" />
      <i className="wg-stock" />
      {id === 'awp' && <i className="wg-scope" />}
    </div>
  );
}

export function BuyMenu({ hud, game }: Props) {
  if (!hud.player) return null;
  const team = hud.player.team;
  const options = BUY_OPTIONS.filter((o) => o.team === 'both' || o.team === team);
  const current = hud.player.weapon;
  return (
    <div className="menu-overlay buy-overlay">
      <div className="buy-card">
        <div className="buy-head">
          <div>
            <div className="eyebrow">FIELD ARMORY // ROUND {String(hud.round).padStart(2, '0')}</div>
            <h1>军械库</h1>
            <p>试验场补给已解锁。选择主武器、副武器或补充护甲，配置将在本回合冻结时间结束后生效。</p>
          </div>
          <div className="buy-loadout">
            <span>当前配置</span>
            <b>{current}</b>
            <small>护甲 {hud.player.armor} · {team === 'CT' ? 'CT' : 'T'} 阵营</small>
          </div>
        </div>

        <div className="buy-grid">
          {options.map((option) => {
            const stats = WEAPON_STATS[option.id];
            const isWeapon = option.kind !== 'armor';
            const selected = isWeapon && current === (option.kind === 'primary' || option.kind === 'pistol'
              ? WEAPONS[option.id as WeaponId]?.name
              : '');
            return (
              <button
                key={option.id}
                className={`buy-item ${option.kind} ${selected ? 'selected' : ''}`}
                onClick={() => game.buyOption(option.id)}
              >
                <div className="buy-item-top">
                  <span className="buy-kind">{option.kind === 'primary' ? '主武器' : option.kind === 'pistol' ? '副武器' : '装备'}</span>
                  <span className="buy-status">{selected ? '已装备' : '点击装备'}</span>
                </div>
                {isWeapon ? <WeaponGlyph id={option.id} /> : (
                  <div className="armor-glyph"><i /><i /><i /></div>
                )}
                <div className="buy-name">{option.name}</div>
                <div className="buy-desc">{option.desc}</div>
                {stats ? (
                  <div className="buy-stats">
                    <span><small>伤害</small>{stats.dmg}</span>
                    <span><small>射速</small>{stats.rate}</span>
                    <span><small>特性</small>{stats.ctrl}</span>
                  </div>
                ) : (
                  <div className="buy-stats armor-stats">
                    <span><small>护甲</small>+100</span>
                    <span><small>减伤</small>吸收</span>
                    <span><small>状态</small>满配</span>
                  </div>
                )}
                <div className="buy-cta">装备 <span>→</span></div>
              </button>
            );
          })}
        </div>

        <div className="buy-foot">
          <div className="buy-tip"><span className="key-dot">B</span> 关闭军械库并继续准备</div>
          <div className="buy-actions">
            <button className="ghost-button" onClick={() => game.setBuyOpen(false)}>返回战场</button>
            <button className="primary-button" onClick={() => game.setBuyOpen(false)}>进入战斗 <span>→</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import type { HudSnapshot, Team } from '../game/types';
import { BOMB_SITES, MAP_EXTENTS, MINIMAP_RECTS } from '../game/map';

interface Props {
  hud: HudSnapshot;
  playerTeam: Team;
}

export function Minimap({ hud, playerTeam }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 214;
  const height = 232;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const pad = 8;
    const worldW = MAP_EXTENTS.maxX - MAP_EXTENTS.minX;
    const worldH = MAP_EXTENTS.maxZ - MAP_EXTENTS.minZ;
    const scale = Math.min((width - pad * 2) / worldW, (height - pad * 2) / worldH);
    const ox = (width - worldW * scale) / 2;
    const oz = (height - worldH * scale) / 2;
    const toX = (x: number) => ox + (x - MAP_EXTENTS.minX) * scale;
    const toY = (z: number) => oz + (z - MAP_EXTENTS.minZ) * scale;

    // background + grid
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, 'rgba(32,30,25,0.92)');
    bg.addColorStop(1, 'rgba(13,14,12,0.96)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(207,184,132,0.055)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 24) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 24) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // walkable silhouette (subtle)
    ctx.fillStyle = 'rgba(157,130,84,0.12)';
    for (const rect of MINIMAP_RECTS) {
      if (rect.kind === 'building') continue;
      ctx.fillRect(toX(rect.x0), toY(rect.z0), (rect.x1 - rect.x0) * scale, (rect.z1 - rect.z0) * scale);
    }

    // bomb sites
    for (const site of BOMB_SITES) {
      const x = toX(site.minX), y = toY(site.minZ);
      const w = (site.maxX - site.minX) * scale;
      const h = (site.maxZ - site.minZ) * scale;
      ctx.fillStyle = site.id === 'A' ? 'rgba(214,148,74,0.16)' : 'rgba(185,102,61,0.16)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(226,194,128,0.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = 'rgba(244,222,176,0.55)';
      ctx.font = '700 19px "Arial Narrow", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(site.id, x + w / 2, y + h / 2 + 7);
    }

    // solids
    for (const rect of MINIMAP_RECTS) {
      const x = toX(rect.x0);
      const y = toY(rect.z0);
      const w = Math.max(1, (rect.x1 - rect.x0) * scale);
      const h = Math.max(1, (rect.z1 - rect.z0) * scale);
      if (rect.kind === 'wall') ctx.fillStyle = 'rgba(113,99,75,0.83)';
      else if (rect.kind === 'building') ctx.fillStyle = 'rgba(73,65,51,0.96)';
      else ctx.fillStyle = 'rgba(139,106,65,0.55)';
      ctx.fillRect(x, y, w, h);
      if (rect.kind === 'building') {
        ctx.strokeStyle = 'rgba(195,166,110,0.15)';
        ctx.strokeRect(x, y, w, h);
      }
    }

    // visible enemies
    const spotted = new Set(hud.spottedEnemies);
    const drawActor = (x: number, y: number, yaw: number, color: string, isSelf: boolean) => {
      const fx = -Math.sin(yaw);
      const fz = -Math.cos(yaw);
      if (isSelf) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.atan2(fx, -fz));
        ctx.fillStyle = 'rgba(255,224,151,0.14)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 23, -Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      const nx = -fz;
      const nz = fx;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x + fx * 6.5, y + fz * 6.5);
      ctx.lineTo(x - fx * 3.4 + nx * 3.5, y - fz * 3.4 + nz * 3.5);
      ctx.lineTo(x - fx * 2.1, y - fz * 2.1);
      ctx.lineTo(x - fx * 3.4 - nx * 3.5, y - fz * 3.4 - nz * 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    for (const actor of hud.players) {
      if (!actor.alive) continue;
      if (actor.team === playerTeam) {
        drawActor(toX(actor.x), toY(actor.z), actor.yaw, actor.id === hud.players.find((p) => p.isSelf)?.id ? '#ffe09b' : '#85b8c9', actor.isSelf);
      } else if (spotted.has(actor.id)) {
        drawActor(toX(actor.x), toY(actor.z), actor.yaw, '#e35543', false);
      }
    }

    // bomb / C4
    if (hud.bombState === 'dropped' || hud.bombState === 'planted' || hud.bombState === 'carried') {
      const bx = toX(hud.bombX);
      const by = toY(hud.bombZ);
      const pulse = hud.bombState === 'planted' ? 0.7 + 0.3 * Math.sin(performance.now() / 140) : 0.9;
      ctx.fillStyle = `rgba(255,177,59,${pulse})`;
      ctx.fillRect(bx - 3.5, by - 3.5, 7, 7);
      ctx.strokeStyle = 'rgba(255,220,155,0.9)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx - 5.5, by - 5.5, 11, 11);
      if (hud.bombState === 'planted') {
        ctx.strokeStyle = `rgba(255,82,54,${pulse})`;
        ctx.beginPath();
        ctx.arc(bx, by, 10 + Math.sin(performance.now() / 160) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // compass labels
    ctx.fillStyle = 'rgba(232,215,178,0.4)';
    ctx.font = '600 9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('N', 10, 15);
    ctx.textAlign = 'right';
    ctx.fillText('DUST II', width - 10, 15);
    ctx.strokeStyle = 'rgba(232,215,178,0.12)';
    ctx.strokeRect(1, 1, width - 2, height - 2);
  }, [hud, playerTeam]);

  return (
    <div className="minimap-wrap">
      <div className="minimap-head">
        <span>战术地图</span>
        <span className="minimap-sectors">{hud.location}</span>
      </div>
      <canvas ref={canvasRef} style={{ width, height }} aria-label="Dust2 minimap" />
      <div className="minimap-foot">
        <span><i className="dot dot-self" />你</span>
        <span><i className="dot dot-mate" />队友</span>
        <span><i className="dot dot-enemy" />可见敌人</span>
        <span><i className="dot dot-bomb" />C4</span>
      </div>
    </div>
  );
}

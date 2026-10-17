import { useEffect, useRef } from 'react';
import type { Game } from '../game/Game';
import { MAP_BOUNDS } from '../game/map';

interface Props {
  game: Game;
}

export function Minimap({ game }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = 248;
    const H = 216;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    let raf = 0;
    let last = 0;

    const toMap = (x: number, z: number) => {
      const pad = 10;
      const sx = (W - pad * 2) / (MAP_BOUNDS.maxX - MAP_BOUNDS.minX);
      const sy = (H - pad * 2) / (MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ);
      const s = Math.min(sx, sy);
      const ox = (W - (MAP_BOUNDS.maxX - MAP_BOUNDS.minX) * s) / 2;
      const oy = (H - (MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ) * s) / 2;
      return { x: ox + (x - MAP_BOUNDS.minX) * s, y: oy + (z - MAP_BOUNDS.minZ) * s, s };
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 33) return;
      last = t;
      const data = game.getMinimapData();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Base / paper
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, 'rgba(28, 25, 19, 0.92)');
      grad.addColorStop(1, 'rgba(16, 18, 17, 0.92)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = 'rgba(198, 167, 104, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 10; x < W; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 10; y < H; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // walkable silhouette approximated by floor zones
      const p0 = toMap(MAP_BOUNDS.minX, MAP_BOUNDS.minZ);
      const p1 = toMap(MAP_BOUNDS.maxX, MAP_BOUNDS.maxZ);
      ctx.fillStyle = 'rgba(173, 144, 89, 0.16)';
      ctx.fillRect(p0.x, p0.y, p1.x - p0.x, p1.y - p0.y);

      // bomb-site highlights
      for (const site of [game.map.sites.A, game.map.sites.B]) {
        const a = toMap(site.rect.minX, site.rect.minZ);
        const b = toMap(site.rect.maxX, site.rect.maxZ);
        ctx.fillStyle = 'rgba(197, 159, 77, 0.12)';
        ctx.fillRect(a.x, a.y, b.x - a.x, b.y - a.y);
        ctx.strokeStyle = 'rgba(219, 187, 117, 0.28)';
        ctx.lineWidth = 1;
        ctx.strokeRect(a.x + 0.5, a.y + 0.5, b.x - a.x - 1, b.y - a.y - 1);
        ctx.fillStyle = 'rgba(229, 205, 150, 0.53)';
        ctx.font = '900 20px Impact, Arial Black, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const c = toMap(site.center.x, site.center.z);
        ctx.fillText(site.name, c.x, c.y);
      }

      // walls and crates
      for (const item of game.map.mapRects) {
        const a = toMap(item.rect.minX, item.rect.minZ);
        const b = toMap(item.rect.maxX, item.rect.maxZ);
        if (b.x - a.x > W - 20 || b.y - a.y > H - 20) continue;
        if (item.kind === 'wall') {
          ctx.fillStyle = 'rgba(52, 48, 38, 0.94)';
          ctx.strokeStyle = 'rgba(147, 128, 88, 0.45)';
        } else if (item.kind === 'railing') {
          ctx.fillStyle = 'rgba(92, 82, 61, 0.8)';
          ctx.strokeStyle = 'rgba(164, 144, 103, 0.4)';
        } else if (item.kind === 'crate') {
          ctx.fillStyle = 'rgba(122, 83, 45, 0.92)';
          ctx.strokeStyle = 'rgba(214, 171, 105, 0.45)';
        } else {
          ctx.fillStyle = 'rgba(92, 87, 66, 0.82)';
          ctx.strokeStyle = 'rgba(170, 151, 108, 0.3)';
        }
        ctx.fillRect(a.x, a.y, Math.max(1, b.x - a.x), Math.max(1, b.y - a.y));
        ctx.lineWidth = 0.6;
        ctx.strokeRect(a.x, a.y, Math.max(1, b.x - a.x), Math.max(1, b.y - a.y));
      }

      // bomb
      if (data.bomb) {
        const b = toMap(data.bomb.x, data.bomb.z);
        const pulse = 0.65 + Math.sin(t * 0.012) * 0.35;
        ctx.save();
        ctx.translate(b.x, b.y);
        if (data.bomb.kind === 'planted') {
          ctx.strokeStyle = `rgba(255, 91, 53, ${pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 9, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 94, 48, ${0.72 + pulse * 0.2})`;
          ctx.fillRect(-4, -4, 8, 8);
        } else if (data.bomb.kind === 'dropped') {
          ctx.fillStyle = '#e8b65c';
          ctx.beginPath();
          ctx.moveTo(0, -6);
          ctx.lineTo(6, 4);
          ctx.lineTo(-6, 4);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.strokeStyle = 'rgba(235, 177, 86, .85)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-4, -4, 8, 8);
        }
        ctx.restore();
      }

      const drawMarker = (m: { x: number; z: number; yaw?: number }, color: string, size: number, friendly: boolean) => {
        const p = toMap(m.x, m.z);
        ctx.save();
        ctx.translate(p.x, p.y);
        if (friendly && m.yaw !== undefined) {
          ctx.rotate(-m.yaw);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.72, size * 0.8);
          ctx.lineTo(0, size * 0.38);
          ctx.lineTo(-size * 0.72, size * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,.5)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          if (friendly) {
            ctx.strokeStyle = 'rgba(255,255,255,.5)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        ctx.restore();
      };

      for (const mate of data.teammates) drawMarker(mate, '#5bb3ec', 5, true);
      for (const enemy of data.enemies) drawMarker(enemy, '#ef5e4b', 5, false);
      if (data.player) drawMarker(data.player, '#f3f0e4', 6, true);

      // frame ticks
      ctx.strokeStyle = 'rgba(209, 181, 118, 0.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(5.5, 5.5, W - 11, H - 11);
      ctx.fillStyle = 'rgba(204, 180, 128, 0.5)';
      ctx.font = '600 8px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText('N', 10, H - 8);
      ctx.textAlign = 'right';
      ctx.fillText('DUST II // RADAR', W - 10, H - 8);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [game]);

  return (
    <div className="minimap-shell">
      <div className="minimap-topline">
        <span>TACTICAL MAP</span>
        <span className="minimap-live"><i /> LIVE</span>
      </div>
      <canvas ref={canvasRef} className="minimap-canvas" />
    </div>
  );
}

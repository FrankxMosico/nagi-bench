import { useEffect, useRef } from 'react';
import {
  COVER_BOXES,
  FLOOR_RECTS,
  MAP_BOUNDS,
  MAP_CALLOUTS,
  PLANT_SITES,
} from '../data/mapLayout';
import type { GameEngine } from '../game/GameEngine';

interface Props {
  engine: GameEngine;
}

interface Transform {
  scale: number;
  padX: number;
  padY: number;
  width: number;
  height: number;
  dpr: number;
}

function makeTransform(width: number, height: number, dpr: number): Transform {
  const padding = 10;
  const worldWidth = MAP_BOUNDS.maxX - MAP_BOUNDS.minX;
  const worldHeight = MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ;
  const scale = Math.min((width - padding * 2) / worldWidth, (height - padding * 2) / worldHeight);
  return {
    scale,
    padX: (width - worldWidth * scale) / 2,
    padY: (height - worldHeight * scale) / 2,
    width,
    height,
    dpr,
  };
}

function mapX(x: number, t: Transform): number {
  return t.padX + (x - MAP_BOUNDS.minX) * t.scale;
}

function mapY(z: number, t: Transform): number {
  return t.padY + (z - MAP_BOUNDS.minZ) * t.scale;
}

function drawBase(width: number, height: number, dpr: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(dpr, dpr);
  const t = makeTransform(width, height, dpr);

  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, '#0d1917');
  bg.addColorStop(0.55, '#101b18');
  bg.addColorStop(1, '#0a1210');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Radar sweep / tactical grid texture.
  ctx.strokeStyle = 'rgba(116, 150, 126, .055)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 14) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const floorColors: Record<string, string> = {
    sand: 'rgba(125, 116, 82, .68)',
    concrete: 'rgba(100, 106, 94, .72)',
    tunnel: 'rgba(78, 87, 79, .75)',
    stone: 'rgba(104, 100, 78, .72)',
    wood: 'rgba(112, 84, 55, .7)',
  };

  // Main walkable footprint.
  ctx.lineJoin = 'round';
  for (const rect of FLOOR_RECTS) {
    const x = mapX(rect.x1, t);
    const y = mapY(rect.z1, t);
    const w = (rect.x2 - rect.x1) * t.scale;
    const h = (rect.z2 - rect.z1) * t.scale;
    ctx.fillStyle = floorColors[rect.style] ?? 'rgba(95, 100, 85, .6)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(172, 190, 160, .28)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));
  }

  // Outer silhouette / borders.
  ctx.strokeStyle = 'rgba(203, 217, 187, .33)';
  ctx.lineWidth = 1.6;
  ctx.strokeRect(
    mapX(MAP_BOUNDS.minX + 1, t),
    mapY(MAP_BOUNDS.minZ + 1, t),
    (MAP_BOUNDS.maxX - MAP_BOUNDS.minX - 2) * t.scale,
    (MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ - 2) * t.scale,
  );

  // Cover footprints.
  for (const box of COVER_BOXES) {
    const x = mapX(box.x - box.w / 2, t);
    const y = mapY(box.z - box.d / 2, t);
    const w = Math.max(1.4, box.w * t.scale);
    const h = Math.max(1.4, box.d * t.scale);
    ctx.fillStyle =
      box.kind === 'metal'
        ? 'rgba(36, 48, 47, .85)'
        : box.kind === 'crate'
          ? 'rgba(72, 56, 34, .82)'
          : 'rgba(83, 80, 66, .8)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(220, 203, 164, .16)';
    ctx.lineWidth = 0.7;
    ctx.strokeRect(x, y, w, h);
  }

  // Bomb sites.
  for (const site of PLANT_SITES) {
    ctx.save();
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = 'rgba(230, 185, 91, .52)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(
      mapX(site.x1, t),
      mapY(site.z1, t),
      (site.x2 - site.x1) * t.scale,
      (site.z2 - site.z1) * t.scale,
    );
    ctx.restore();
    ctx.fillStyle = 'rgba(227, 198, 137, .3)';
    ctx.font = '900 23px "Arial Narrow", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(site.label, mapX(site.centerX, t), mapY(site.centerZ, t) + 1);
  }

  // Door / choke markings.
  ctx.strokeStyle = 'rgba(168, 203, 194, .34)';
  ctx.lineWidth = 1.8;
  const chokes: [number, number, number, number][] = [
    [6, 2, 9, 2],
    [3, 48, 3, 56],
    [-32, -30, -32, -33],
    [-18, 46, -18, 53],
  ];
  for (const [x1, z1, x2, z2] of chokes) {
    ctx.beginPath();
    ctx.moveTo(mapX(x1, t), mapY(z1, t));
    ctx.lineTo(mapX(x2, t), mapY(z2, t));
    ctx.stroke();
  }

  // Zone labels. Keep the classic calls compact enough to read at a glance.
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const labelStyle: [string, number, number, string][] = [
    ['A', -36, 40, 'rgba(235, 207, 146, .8)'],
    ['B', -37, -43.5, 'rgba(235, 207, 146, .8)'],
    ['LONG A', 4, 52, 'rgba(211, 201, 170, .57)'],
    ['MID', 6, 13, 'rgba(211, 201, 170, .57)'],
    ['T SPAWN', 41, 43, 'rgba(207, 162, 125, .5)'],
    ['CT SPAWN', -32, -8, 'rgba(156, 185, 200, .55)'],
    ['CATWALK', -9, 29, 'rgba(211, 201, 170, .45)'],
    ['TUNNELS', 23, -20, 'rgba(211, 201, 170, .47)'],
  ];
  for (const [text, x, z, color] of labelStyle) {
    ctx.fillStyle = color;
    ctx.font = text.length > 2 ? 'bold 7px "Arial Narrow", Arial, sans-serif' : '900 14px "Arial Narrow", Arial, sans-serif';
    ctx.fillText(text, mapX(x, t), mapY(z, t));
  }

  // Callout ticks.
  for (const callout of MAP_CALLOUTS) {
    if (!['mid_doors', 'b_doors', 'ramp'].includes(callout.id)) continue;
    ctx.fillStyle = 'rgba(163, 190, 171, .28)';
    ctx.beginPath();
    ctx.arc(mapX(callout.x, t), mapY(callout.z, t), 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Compass north.
  ctx.fillStyle = 'rgba(204, 219, 188, .65)';
  ctx.font = 'bold 9px monospace';
  ctx.fillText('N', width - 13, 13);
  ctx.beginPath();
  ctx.moveTo(width - 13, 18);
  ctx.lineTo(width - 16, 23);
  ctx.lineTo(width - 10, 23);
  ctx.closePath();
  ctx.fill();

  // Fine scan lines.
  ctx.fillStyle = 'rgba(2, 10, 8, .12)';
  for (let y = 0; y < height; y += 3) {
    ctx.fillRect(0, y, width, 1);
  }

  return canvas;
}

export function Minimap({ engine }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const lastSize = useRef({ width: 0, height: 0, dpr: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let timer = 0;

    const setup = (): boolean => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(120, Math.round(rect.width));
      const height = Math.max(120, Math.round(rect.height));
      if (
        lastSize.current.width !== width ||
        lastSize.current.height !== height ||
        lastSize.current.dpr !== dpr
      ) {
        lastSize.current = { width, height, dpr };
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        baseRef.current = drawBase(width, height, dpr);
      }
      return Boolean(baseRef.current);
    };

    const draw = (): void => {
      if (!setup()) return;
      const base = baseRef.current;
      const ctx = canvas.getContext('2d');
      if (!base || !ctx) return;
      const { width, height, dpr } = lastSize.current;
      const t = makeTransform(width, height, dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(base, 0, 0, width, height);

      const snapshot = engine.getMinimapSnapshot();
      if (snapshot.phase === 'menu') return;
      const playerPos = snapshot.player;
      if (playerPos) {
        const px = mapX(playerPos.x, t);
        const py = mapY(playerPos.z, t);
        const forwardX = -Math.sin(playerPos.yaw);
        const forwardY = -Math.cos(playerPos.yaw);
        const angle = Math.atan2(forwardY, forwardX);
        const viewLength = 25 * t.scale;

        // Vision cone.
        const cone = ctx.createRadialGradient(px, py, 2, px, py, viewLength);
        cone.addColorStop(0, 'rgba(224, 205, 148, .16)');
        cone.addColorStop(1, 'rgba(224, 205, 148, 0)');
        ctx.fillStyle = cone;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.arc(px, py, viewLength, angle - 0.55, angle + 0.55);
        ctx.closePath();
        ctx.fill();

        // Teammates.
        for (const mate of snapshot.teammates) {
          const mx = mapX(mate.x, t);
          const my = mapY(mate.z, t);
          ctx.fillStyle = '#7bd0cb';
          ctx.strokeStyle = 'rgba(6, 15, 14, .9)';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(mx, my, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          if (mate.hasBomb) {
            ctx.fillStyle = '#f0b34c';
            ctx.fillRect(mx - 1.7, my - 5.8, 3.4, 2.4);
          }
        }

        // Seen enemies.
        const pulse = 0.65 + Math.sin(performance.now() / 250) * 0.25;
        for (const enemy of snapshot.visibleEnemies) {
          const ex = mapX(enemy.x, t);
          const ey = mapY(enemy.z, t);
          ctx.fillStyle = `rgba(237, 91, 68, ${pulse})`;
          ctx.strokeStyle = 'rgba(25, 6, 4, .9)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(ex, ey, 3.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          const dirX = -Math.sin(enemy.yaw);
          const dirY = -Math.cos(enemy.yaw);
          ctx.strokeStyle = `rgba(255, 138, 104, ${pulse})`;
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex + dirX * 7, ey + dirY * 7);
          ctx.stroke();
        }

        // Local player arrow.
        const tipX = px + forwardX * 8;
        const tipY = py + forwardY * 8;
        const perpX = -forwardY;
        const perpY = forwardX;
        ctx.fillStyle = '#f7e8b6';
        ctx.strokeStyle = 'rgba(24, 25, 17, .95)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(px - forwardX * 4.5 + perpX * 4.2, py - forwardY * 4.5 + perpY * 4.2);
        ctx.lineTo(px - forwardX * 2.3, py - forwardY * 2.3);
        ctx.lineTo(px - forwardX * 4.5 - perpX * 4.2, py - forwardY * 4.5 - perpY * 4.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Bomb marker.
      if (snapshot.bomb.visible) {
        const bx = mapX(snapshot.bomb.x, t);
        const by = mapY(snapshot.bomb.z, t);
        const blink = 0.6 + Math.sin(performance.now() / 170) * 0.4;
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(250, 158, 55, ${0.65 + blink * 0.3})`;
        ctx.strokeStyle = 'rgba(35, 18, 5, .95)';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-3.4, -3.4, 6.8, 6.8);
        ctx.strokeRect(-3.4, -3.4, 6.8, 6.8);
        ctx.restore();
        ctx.fillStyle = 'rgba(255, 205, 126, .9)';
        ctx.font = 'bold 7px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('C4', bx + 5, by - 4);
      }

      // Border ticks.
      ctx.strokeStyle = 'rgba(184, 206, 177, .18)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 9; i++) {
        const x = 10 + (i * (width - 20)) / 8;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 4);
        ctx.stroke();
      }
    };

    draw();
    timer = window.setInterval(draw, 85);
    const onResize = (): void => {
      lastSize.current.width = 0;
      draw();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [engine]);

  return (
    <aside className="minimap-panel">
      <div className="minimap-heading">
        <span className="minimap-title">TACTICAL MAP</span>
        <span className="minimap-sub">DUST II · LIVE</span>
      </div>
      <div className="minimap-frame">
        <canvas ref={canvasRef} className="minimap-canvas" />
        <div className="minimap-corner tl" />
        <div className="minimap-corner tr" />
        <div className="minimap-corner bl" />
        <div className="minimap-corner br" />
        <div className="scanline" />
      </div>
      <div className="minimap-footer">
        <span className="legend-dot ally" /> 队友
        <span className="legend-dot enemy" /> 已发现
        <span className="legend-dot bomb" /> C4
      </div>
    </aside>
  );
}

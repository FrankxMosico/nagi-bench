import { useEffect, useRef } from 'react';
import { getMapResources } from '../engine/game.ts';
import type { MapDefinition } from '../engine/map/types.ts';
import { useClient, useFrame } from './context.ts';

const SIZE = 230;
const TEAM_COLOR = { T: '#f0b13e', CT: '#58a8ea' } as const;

function heightColor(h: number, dark: boolean): string {
  if (dark) return '#4a4336';
  if (h >= 2) return '#8d7f60';
  if (h >= 1) return '#776b52';
  return '#615848';
}

/** Pre-renders the static Dust2 radar (floors by height, crates, bomb sites, spawns). */
function buildStaticLayer(def: MapDefinition, px: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = SIZE * px;
  c.height = SIZE * px;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  const b = def.bounds;
  const k = (SIZE * px) / Math.max(b.x1 - b.x0, b.z1 - b.z0);
  const X = (x: number) => (x - b.x0) * k;
  const Z = (z: number) => (z - b.z0) * k;
  ctx.fillStyle = 'rgba(12,14,18,0.82)';
  ctx.fillRect(0, 0, c.width, c.height);
  // Wall outline: draw rooms slightly expanded in a lighter tone first.
  ctx.fillStyle = 'rgba(180,165,130,0.35)';
  for (const r of [...def.rooms, ...def.ramps]) ctx.fillRect(X(r.x0) - 1.5 * px, Z(r.z0) - 1.5 * px, (r.x1 - r.x0) * k + 3 * px, (r.z1 - r.z0) * k + 3 * px);
  for (const r of def.rooms) {
    ctx.fillStyle = heightColor(r.h, r.floor === 'floor_dark');
    ctx.fillRect(X(r.x0), Z(r.z0), (r.x1 - r.x0) * k, (r.z1 - r.z0) * k);
  }
  for (const r of def.ramps) {
    const g = r.axis === 'x' ? ctx.createLinearGradient(X(r.x0), 0, X(r.x1), 0) : ctx.createLinearGradient(0, Z(r.z0), 0, Z(r.z1));
    g.addColorStop(0, heightColor(r.h0, false));
    g.addColorStop(1, heightColor(r.h1, false));
    ctx.fillStyle = g;
    ctx.fillRect(X(r.x0), Z(r.z0), (r.x1 - r.x0) * k, (r.z1 - r.z0) * k);
    // stair hatching
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = px;
    ctx.beginPath();
    if (r.axis === 'z') {
      for (let z = r.z0; z <= r.z1; z += 1) {
        ctx.moveTo(X(r.x0), Z(z));
        ctx.lineTo(X(r.x1), Z(z));
      }
    } else {
      for (let x = r.x0; x <= r.x1; x += 1) {
        ctx.moveTo(X(x), Z(r.z0));
        ctx.lineTo(X(x), Z(r.z1));
      }
    }
    ctx.stroke();
  }
  for (const p of def.props) {
    if (p.kind === 'roof') continue;
    ctx.fillStyle = p.kind === 'door' ? '#2f6d8c' : p.kind === 'wall' ? 'rgba(25,25,28,0.95)' : 'rgba(40,34,26,0.9)';
    ctx.fillRect(X(p.x0), Z(p.z0), Math.max(px, (p.x1 - p.x0) * k), Math.max(px, (p.z1 - p.z0) * k));
  }
  for (const id of ['A', 'B'] as const) {
    const s = def.bombSites[id];
    ctx.fillStyle = 'rgba(210,60,40,0.16)';
    ctx.fillRect(X(s.x0), Z(s.z0), (s.x1 - s.x0) * k, (s.z1 - s.z0) * k);
    ctx.strokeStyle = 'rgba(235,95,70,0.65)';
    ctx.lineWidth = 1.2 * px;
    ctx.setLineDash([4 * px, 3 * px]);
    ctx.strokeRect(X(s.x0), Z(s.z0), (s.x1 - s.x0) * k, (s.z1 - s.z0) * k);
    ctx.setLineDash([]);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const l of def.labels) {
    ctx.font = `bold ${l.size * px}px "Segoe UI", sans-serif`;
    ctx.fillStyle = l.text === 'A' || l.text === 'B' ? 'rgba(255,120,95,0.85)' : l.text === 'T' ? TEAM_COLOR.T : TEAM_COLOR.CT;
    ctx.fillText(l.text, X(l.x), Z(l.z));
  }
  return c;
}

/**
 * Radar: fixed north-up Dust2 overview with live positions of you, your teammates,
 * spotted enemies and the C4. Drawn on a canvas once per frame.
 */
export function Minimap() {
  const client = useClient();
  const canvas = useRef<HTMLCanvasElement>(null);
  const staticLayer = useRef<HTMLCanvasElement | null>(null);
  const pxRatio = Math.min(2, window.devicePixelRatio || 1);

  useEffect(() => {
    staticLayer.current = buildStaticLayer(getMapResources().built.def, pxRatio);
  }, [pxRatio]);

  useFrame((c) => {
    const cv = canvas.current;
    const layer = staticLayer.current;
    const g = c.game;
    if (!cv || !layer || !g) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const px = pxRatio;
    const b = g.def.bounds;
    const k = (SIZE * px) / Math.max(b.x1 - b.x0, b.z1 - b.z0);
    const X = (x: number) => (x - b.x0) * k;
    const Z = (z: number) => (z - b.z0) * k;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(layer, 0, 0);
    const human = g.human;
    const team = human ? human.team : 'CT';
    const now = g.time;
    const blink = Math.floor(c.frame.now * 3) % 2 === 0;
    const ctl = g.controlled;

    // C4
    const bomb = g.bomb;
    let bombX = NaN;
    let bombZ = NaN;
    if (bomb.state === 'planted' || bomb.state === 'defused' || bomb.state === 'exploded') {
      bombX = bomb.pos.x;
      bombZ = bomb.pos.z;
    } else if (bomb.state === 'dropped' && team === 'T') {
      bombX = bomb.pos.x;
      bombZ = bomb.pos.z;
    } else if (bomb.state === 'carried') {
      const carrier = g.soldiers[bomb.carrierId];
      if (carrier && (team === 'T' || carrier.spottedUntil[team] > now)) {
        bombX = carrier.pos.x;
        bombZ = carrier.pos.z;
      }
    }

    for (const s of g.soldiers) {
      const x = X(s.pos.x);
      const z = Z(s.pos.z);
      const mine = s.team === team;
      if (!mine && !(s.alive && s.spottedUntil[team] > now)) continue;
      if (!s.alive) {
        if (!mine) continue;
        ctx.strokeStyle = 'rgba(200,200,200,0.55)';
        ctx.lineWidth = 1.5 * px;
        const r = 3 * px;
        ctx.beginPath();
        ctx.moveTo(x - r, z - r);
        ctx.lineTo(x + r, z + r);
        ctx.moveTo(x + r, z - r);
        ctx.lineTo(x - r, z + r);
        ctx.stroke();
        continue;
      }
      if (ctl && s.id === ctl.id) continue;
      const color = mine ? TEAM_COLOR[s.team] : '#ff3b30';
      // view cone tick
      if (mine) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5 * px;
        ctx.beginPath();
        ctx.moveTo(x, z);
        ctx.lineTo(x - Math.sin(s.yaw) * 9 * px, z - Math.cos(s.yaw) * 9 * px);
        ctx.stroke();
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, z, (mine ? 4 : 4.5) * px, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.8)';
      ctx.lineWidth = px;
      ctx.stroke();
      if (mine) {
        ctx.fillStyle = '#111';
        ctx.font = `bold ${7 * px}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(s.slotIndex + 1), x, z + 0.5 * px);
      }
    }

    if (!Number.isNaN(bombX)) {
      const x = X(bombX);
      const z = Z(bombZ);
      const planted = bomb.state === 'planted';
      if (!planted || blink) {
        ctx.fillStyle = planted ? '#ff2d2d' : '#ff9d2e';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = px;
        ctx.beginPath();
        ctx.rect(x - 5 * px, z - 9 * px - (bomb.state === 'carried' ? 4 * px : 0), 10 * px, 7 * px);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.font = `bold ${6 * px}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('C4', x, z - 5.5 * px - (bomb.state === 'carried' ? 4 * px : 0));
      }
    }

    // You (controlled soldier, or spectated one): arrow.
    const me = g.viewSoldier;
    if (me && me.alive) {
      const x = X(me.pos.x);
      const z = Z(me.pos.z);
      ctx.save();
      ctx.translate(x, z);
      ctx.rotate(-c.frame.viewYaw);
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.2 * px;
      ctx.beginPath();
      ctx.moveTo(0, -8 * px);
      ctx.lineTo(5.5 * px, 6 * px);
      ctx.lineTo(0, 3 * px);
      ctx.lineTo(-5.5 * px, 6 * px);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  });

  return <canvas ref={canvas} className="minimap" width={SIZE * pxRatio} height={SIZE * pxRatio} style={{ width: SIZE, height: SIZE }} />;
}

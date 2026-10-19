// 把 Rapier 世界中的碰撞体投影成 SVG，便于调试几何。
import { RAPIER } from '../src/sim/core';
import type { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';

export interface SvgOpts {
  u0: number; u1: number; v0: number; v1: number; px: number; label?: string; wMin?: number; wMax?: number;
  /** 投影：uv=枢轮平面（从 +X 看），xy=正视（从 +Z 看），xz=俯视（+Z 朝下） */
  proj?: 'uv' | 'xy' | 'xz';
}
type V3 = { x: number; y: number; z: number };
type Q4 = { x: number; y: number; z: number; w: number };

function hull(pts: [number, number][]): [number, number][] {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [], up: [number, number][] = [];
  for (const q of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  up.pop(); lo.pop();
  return lo.concat(up);
}
function rotv(q: Q4, v: V3): V3 {
  const { x, y, z, w } = q;
  const ix = w * v.x + y * v.z - z * v.y, iy = w * v.y + z * v.x - x * v.z, iz = w * v.z + x * v.y - y * v.x, iw = -x * v.x - y * v.y - z * v.z;
  return { x: ix * w + iw * -x + iy * -z - iz * -y, y: iy * w + iw * -y + iz * -x - ix * -z, z: iz * w + iw * -z + ix * -y - iy * -x };
}
function qmul(a: Q4, b: Q4): Q4 {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}

export function svgSnapshot(sim: Sim, o: SvgOpts): string {
  const O = ESC.origin;
  const W = (o.u1 - o.u0) * o.px, H = (o.v1 - o.v0) * o.px;
  const X = (u: number) => ((u - o.u0) * o.px).toFixed(1);
  const Y = (v: number) => ((o.v1 - v) * o.px).toFixed(1);
  const mode = o.proj ?? 'uv';
  const proj = (p: V3): [number, number] =>
    mode === 'uv' ? [-(p.z - O.z), p.y - O.y] : mode === 'xy' ? [p.x, p.y] : [p.x, -p.z];
  const depth = (p: V3) => (mode === 'uv' ? p.x - O.x : mode === 'xy' ? p.z : p.y);
  const out: string[] = [];
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="background:#fff">`);
  const colorOf = (g: number) => {
    const m = g >>> 16;
    if (m & (1 << 1)) return '#c00';
    if (m & (1 << 2)) return '#8a5a2b';
    if (m & (1 << 3)) return '#e60';
    if (m & (1 << 4)) return '#06c';
    if (m & (1 << 5)) return '#a0a';
    if (m & (1 << 6)) return '#09f';
    if (m & (1 << 7)) return '#2a2';
    if (m & (1 << 8)) return '#c80';
    if (m & (1 << 11)) return '#d05';
    if (m & (1 << 12)) return '#555';
    return '#444';
  };
  const draw = (sh: RAPIER.Shape, t: V3, q: Q4, col: string) => {
    const d = depth(t);
    if (o.wMin !== undefined && d < o.wMin) return;
    if (o.wMax !== undefined && d > o.wMax) return;
    const st = sh.type;
    if (st === RAPIER.ShapeType.Ball) {
      const [u, v] = proj(t);
      out.push(`<circle cx="${X(u)}" cy="${Y(v)}" r="${((sh as RAPIER.Ball).radius * o.px).toFixed(1)}" fill="${col}" fill-opacity="0.6"/>`);
    } else if (st === RAPIER.ShapeType.Cuboid) {
      const he = (sh as RAPIER.Cuboid).halfExtents;
      const pts: [number, number][] = [];
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
        const r = rotv(q, { x: sx * he.x, y: sy * he.y, z: sz * he.z });
        pts.push(proj({ x: t.x + r.x, y: t.y + r.y, z: t.z + r.z }));
      }
      const h = hull(pts);
      out.push(`<polygon points="${h.map((p) => X(p[0]) + ',' + Y(p[1])).join(' ')}" fill="${col}" fill-opacity="0.35" stroke="${col}" stroke-width="1"/>`);
    } else if (st === RAPIER.ShapeType.Capsule || st === RAPIER.ShapeType.Cylinder) {
      const s2 = sh as RAPIER.Capsule;
      const hh = s2.halfHeight, r = s2.radius;
      const a = rotv(q, { x: 0, y: hh, z: 0 });
      const p1 = proj({ x: t.x + a.x, y: t.y + a.y, z: t.z + a.z });
      const p2 = proj({ x: t.x - a.x, y: t.y - a.y, z: t.z - a.z });
      if (st === RAPIER.ShapeType.Cylinder) {
        // 圆柱：画成以轴线为中心的矩形（近似）
        const pts: [number, number][] = [];
        for (const s of [-1, 1]) for (let k = 0; k < 8; k++) {
          const ang = (k / 8) * Math.PI * 2;
          const rr = rotv(q, { x: r * Math.cos(ang), y: s * hh, z: r * Math.sin(ang) });
          pts.push(proj({ x: t.x + rr.x, y: t.y + rr.y, z: t.z + rr.z }));
        }
        const h = hull(pts);
        out.push(`<polygon points="${h.map((p) => X(p[0]) + ',' + Y(p[1])).join(' ')}" fill="${col}" fill-opacity="0.25" stroke="${col}" stroke-width="1"/>`);
      } else {
        out.push(`<line x1="${X(p1[0])}" y1="${Y(p1[1])}" x2="${X(p2[0])}" y2="${Y(p2[1])}" stroke="${col}" stroke-opacity="0.7" stroke-width="${Math.max(1, 2 * r * o.px).toFixed(1)}" stroke-linecap="round"/>`);
      }
    } else if (st === RAPIER.ShapeType.ConvexPolyhedron) {
      const vs = (sh as RAPIER.ConvexPolyhedron).vertices;
      const pts: [number, number][] = [];
      for (let i = 0; i < vs.length; i += 3) {
        const r = rotv(q, { x: vs[i], y: vs[i + 1], z: vs[i + 2] });
        pts.push(proj({ x: t.x + r.x, y: t.y + r.y, z: t.z + r.z }));
      }
      const h = hull(pts);
      out.push(`<polygon points="${h.map((p) => X(p[0]) + ',' + Y(p[1])).join(' ')}" fill="${col}" fill-opacity="0.18" stroke="${col}" stroke-width="0.8"/>`);
    } else if (st === RAPIER.ShapeType.Compound) {
      const cp = sh as RAPIER.Compound;
      cp.shapes.forEach((s, i) => {
        const p = rotv(q, cp.positions[i]);
        draw(s, { x: t.x + p.x, y: t.y + p.y, z: t.z + p.z }, qmul(q, cp.rotations[i]), col);
      });
    }
  };
  sim.world.forEachCollider((c) => {
    if (!c.isEnabled()) return;
    const body = c.parent();
    if (body && !body.isEnabled()) return;
    draw(c.shape, c.translation(), c.rotation(), colorOf(c.collisionGroups()));
  });
  if (mode === 'uv') {
    // 斗中水体
    const esc = sim.esc;
    for (let k = 0; k < ESC.N; k++) {
      const wp = sim.water.waterPoly[k];
      if (!wp.length) continue;
      const b = esc.scoops[k].body;
      const bt = b.translation();
      const a = 2 * Math.atan2(b.rotation().x, b.rotation().w);
      const c = Math.cos(a), s = Math.sin(a);
      const bu = -(bt.z - O.z), bv = bt.y - O.y;
      const pts = wp.map((p) => [bu + p[0] * c - p[1] * s, bv + p[0] * s + p[1] * c]);
      out.push(`<polygon points="${pts.map((p) => X(p[0]) + ',' + Y(p[1])).join(' ')}" fill="#1e90ff" fill-opacity="0.75"/>`);
    }
    // 绳（天条、吊绳）
    const lineW = (b1: RAPIER.RigidBody, l1: V3, b2: RAPIER.RigidBody, l2: V3) => {
      const t1 = b1.translation(), r1 = rotv(b1.rotation(), l1);
      const t2 = b2.translation(), r2 = rotv(b2.rotation(), l2);
      const p1 = proj({ x: t1.x + r1.x, y: t1.y + r1.y, z: t1.z + r1.z });
      const p2 = proj({ x: t2.x + r2.x, y: t2.y + r2.y, z: t2.z + r2.z });
      out.push(`<line x1="${X(p1[0])}" y1="${Y(p1[1])}" x2="${X(p2[0])}" y2="${Y(p2[1])}" stroke="#333" stroke-width="2" stroke-dasharray="4 2"/>`);
    };
    const g = esc.geo;
    lineW(esc.upper, { x: 0, y: g.upperChainLocal[1], z: -g.upperChainLocal[0] }, esc.fork, { x: 0, y: g.forkChainLocal[1], z: -g.forkChainLocal[0] });
    lineW(esc.upper, { x: 0, y: 0, z: -g.upperLockLocal[0] }, esc.lock, { x: 0, y: g.lockTop[1] - g.lockBottom[1], z: 0 });
    out.push(`<circle cx="${X(g.spout[0])}" cy="${Y(g.spout[1])}" r="4" fill="#0a0"/>`);
  }
  if (o.label) out.push(`<text x="8" y="20" font-family="monospace" font-size="14">${o.label}</text>`);
  out.push('</svg>');
  return out.join('\n');
}

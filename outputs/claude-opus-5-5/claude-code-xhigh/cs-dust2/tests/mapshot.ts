/*
 * Renders a top-down debug image of the generated map (collision boxes, ramps, nav grid,
 * bomb sites, spawns, a sample bot path) to tests/out/map.png.
 *   node --experimental-strip-types tests/mapshot.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { getMapResources } from '../src/engine/game.ts';
import { vec3 } from '../src/engine/math.ts';

const S = 6; // pixels per metre
const W = 104 * S;
const H = 104 * S;
const OX = -2;
const OZ = -2;
const img = new Uint8Array(W * H * 3);

function px(x: number, y: number, c: [number, number, number]): void {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 3;
  img[i] = c[0];
  img[i + 1] = c[1];
  img[i + 2] = c[2];
}

function rect(x0: number, z0: number, x1: number, z1: number, c: [number, number, number]): void {
  for (let y = Math.floor((z0 - OZ) * S); y < Math.ceil((z1 - OZ) * S); y++) {
    for (let x = Math.floor((x0 - OX) * S); x < Math.ceil((x1 - OX) * S); x++) px(x, y, c);
  }
}

function outline(x0: number, z0: number, x1: number, z1: number, c: [number, number, number]): void {
  const a = Math.floor((x0 - OX) * S);
  const b = Math.ceil((x1 - OX) * S) - 1;
  const t = Math.floor((z0 - OZ) * S);
  const d = Math.ceil((z1 - OZ) * S) - 1;
  for (let x = a; x <= b; x++) {
    px(x, t, c);
    px(x, d, c);
  }
  for (let y = t; y <= d; y++) {
    px(a, y, c);
    px(b, y, c);
  }
}

const { built, nav } = getMapResources();
const shade = (h: number): [number, number, number] => {
  const k = Math.max(0, Math.min(1, h / 2.4));
  return [Math.round(150 + 70 * k), Math.round(128 + 60 * k), Math.round(92 + 40 * k)];
};

for (const b of built.boxes) {
  if (b.kind === 'floor') rect(b.minX, b.minZ, b.maxX, b.maxZ, shade(b.maxY));
}
for (const r of built.ramps) {
  for (let z = r.minZ; z < r.maxZ; z += 1 / S) {
    for (let x = r.minX; x < r.maxX; x += 1 / S) {
      const t = r.axis === 'x' ? (x - r.minX) / (r.maxX - r.minX) : (z - r.minZ) / (r.maxZ - r.minZ);
      const c = shade(r.h0 + (r.h1 - r.h0) * t);
      px(Math.floor((x - OX) * S), Math.floor((z - OZ) * S), [c[0] - 20, c[1] - 10, c[2]]);
    }
  }
}
for (const b of built.boxes) {
  if (b.kind === 'wall') rect(b.minX, b.minZ, b.maxX, b.maxZ, b.maxY > 5 ? [55, 50, 45] : [95, 85, 70]);
  else if (b.kind === 'prop') rect(b.minX, b.minZ, b.maxX, b.maxZ, b.mat === 'metal_blue' ? [50, 90, 140] : b.mat === 'metal_red' ? [140, 60, 45] : b.mat === 'car' ? [120, 50, 40] : [110, 75, 40]);
  else if (b.kind === 'door') rect(b.minX, b.minZ, b.maxX, b.maxZ, [40, 120, 160]);
}
// Roofs as hatching.
for (const b of built.boxes) {
  if (b.kind !== 'roof') continue;
  for (let y = Math.floor((b.minZ - OZ) * S); y < Math.ceil((b.maxZ - OZ) * S); y++) {
    for (let x = Math.floor((b.minX - OX) * S); x < Math.ceil((b.maxX - OX) * S); x++) if ((x + y) % 8 === 0) px(x, y, [70, 55, 40]);
  }
}
// Nav grid walkable cells as faint dots.
for (let j = 0; j < nav.h; j++) {
  for (let i = 0; i < nav.w; i++) {
    if (!nav.walk[j * nav.w + i]) continue;
    const x = Math.floor((nav.ox + (i + 0.5) * nav.cs - OX) * S);
    const y = Math.floor((nav.oz + (j + 0.5) * nav.cs - OZ) * S);
    px(x, y, nav.clear[j * nav.w + i] <= 1 ? [200, 80, 80] : [60, 160, 60]);
  }
}
for (const id of ['A', 'B'] as const) {
  const s = built.def.bombSites[id];
  outline(s.x0, s.z0, s.x1, s.z1, [230, 40, 40]);
}
for (const p of built.def.spawns.T) rect(p.x - 0.5, p.z - 0.5, p.x + 0.5, p.z + 0.5, [240, 180, 50]);
for (const p of built.def.spawns.CT) rect(p.x - 0.5, p.z - 0.5, p.x + 0.5, p.z + 0.5, [80, 160, 240]);
// Sample paths: T spawn -> A (via long route endpoints) and CT spawn -> B.
for (const [a, b, c] of [
  [vec3(52, 0, 89), vec3(80, 2.4, 14), [255, 255, 255]],
  [vec3(52, 1.2, 10), vec3(16, 0, 20), [120, 220, 255]],
  [vec3(47, 0, 88), vec3(14, 0, 22), [255, 220, 120]],
] as const) {
  const path = nav.findPath(a, b) ?? [];
  let prev = a;
  for (const p of path) {
    const n = Math.ceil(Math.hypot(p.x - prev.x, p.z - prev.z) * S);
    for (let k = 0; k <= n; k++) {
      const x = prev.x + ((p.x - prev.x) * k) / Math.max(1, n);
      const z = prev.z + ((p.z - prev.z) * k) / Math.max(1, n);
      px(Math.floor((x - OX) * S), Math.floor((z - OZ) * S), c as unknown as [number, number, number]);
    }
    prev = p;
  }
}

// Minimal PNG encoder.
function crc32(buf: Uint8Array): number {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}
function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}
const raw = new Uint8Array(H * (W * 3 + 1));
for (let y = 0; y < H; y++) {
  raw[y * (W * 3 + 1)] = 0;
  raw.set(img.subarray(y * W * 3, (y + 1) * W * 3), y * (W * 3 + 1) + 1);
}
const ihdr = new Uint8Array(13);
const dv = new DataView(ihdr.buffer);
dv.setUint32(0, W);
dv.setUint32(4, H);
ihdr[8] = 8;
ihdr[9] = 2;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw)),
  chunk('IEND', new Uint8Array(0)),
]);
mkdirSync(new URL('./out/', import.meta.url), { recursive: true });
writeFileSync(new URL('./out/map.png', import.meta.url), png);
console.log(`wrote tests/out/map.png (${W}x${H})`);

import * as THREE from 'three';
import type { MaterialId } from '../engine/map/types.ts';

// All textures are painted at runtime on <canvas> — no image files are shipped.

type RGB = [number, number, number];

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  return [c, ctx];
}

/** Seeded hash noise so textures are identical every load. */
function hash(x: number, y: number, seed: number): number {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function valueNoise(x: number, y: number, period: number, seed: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const p = (v: number) => ((v % period) + period) % period;
  const a = hash(p(xi), p(yi), seed);
  const b = hash(p(xi + 1), p(yi), seed);
  const c = hash(p(xi), p(yi + 1), seed);
  const d = hash(p(xi + 1), p(yi + 1), seed);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Tileable fractal noise in [0,1]. */
function fbm(x: number, y: number, size: number, baseCells: number, seed: number, octaves = 4): number {
  let amp = 0.5;
  let sum = 0;
  let norm = 0;
  let cells = baseCells;
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise((x / size) * cells, (y / size) * cells, cells, seed + o * 17);
    norm += amp;
    amp *= 0.5;
    cells *= 2;
  }
  return sum / norm;
}

function fillNoise(ctx: CanvasRenderingContext2D, size: number, base: RGB, amount: number, seed: number, cells = 6): void {
  const img = ctx.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x, y, size, cells, seed) - 0.5;
      const grain = (hash(x, y, seed + 99) - 0.5) * 0.35;
      const k = (n + grain * 0.5) * amount;
      const i = (y * size + x) * 4;
      d[i] = clamp255(base[0] + k);
      d[i + 1] = clamp255(base[1] + k * 0.92);
      d[i + 2] = clamp255(base[2] + k * 0.8);
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function clamp255(v: number): number {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function rgba(c: RGB, a = 1): string {
  return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
}

function rand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), s | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paintBlocks(ctx: CanvasRenderingContext2D, size: number, rows: number, mortar: RGB, seed: number, chip: number): void {
  const r = rand(seed);
  const rowH = size / rows;
  for (let row = 0; row < rows; row++) {
    const y = row * rowH;
    let x = -r() * 120;
    while (x < size) {
      const w = 90 + r() * 110;
      // per-block tint
      const t = (r() - 0.5) * 26;
      ctx.fillStyle = t > 0 ? `rgba(255,240,210,${t / 140})` : `rgba(60,40,20,${-t / 140})`;
      ctx.fillRect(x, y, w, rowH);
      ctx.fillStyle = rgba(mortar, 0.85);
      ctx.fillRect(x, y, 3, rowH);
      if (x + w > size) {
        ctx.fillStyle = t > 0 ? `rgba(255,240,210,${t / 140})` : `rgba(60,40,20,${-t / 140})`;
        ctx.fillRect(x - size, y, w, rowH);
        ctx.fillStyle = rgba(mortar, 0.85);
        ctx.fillRect(x - size, y, 3, rowH);
      }
      x += w;
    }
    ctx.fillStyle = rgba(mortar, 0.9);
    ctx.fillRect(0, y, size, 3);
    ctx.fillStyle = 'rgba(255,245,220,0.18)';
    ctx.fillRect(0, y + 3, size, 2);
  }
  for (let i = 0; i < chip; i++) {
    ctx.fillStyle = `rgba(70,50,30,${0.15 + r() * 0.25})`;
    const s = 2 + r() * 7;
    ctx.beginPath();
    ctx.ellipse(r() * size, r() * size, s, s * (0.5 + r() * 0.6), r() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintCracks(ctx: CanvasRenderingContext2D, size: number, count: number, seed: number): void {
  const r = rand(seed);
  ctx.strokeStyle = 'rgba(80,60,40,0.45)';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < count; i++) {
    let x = r() * size;
    let y = r() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const n = 5 + Math.floor(r() * 8);
    for (let k = 0; k < n; k++) {
      x += (r() - 0.5) * 40;
      y += r() * 30;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function paintStains(ctx: CanvasRenderingContext2D, size: number, count: number, seed: number, dark: RGB, alpha: number): void {
  const r = rand(seed);
  for (let i = 0; i < count; i++) {
    const x = r() * size;
    const y = r() * size;
    const rad = 20 + r() * 90;
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, rgba(dark, alpha * (0.5 + r() * 0.5)));
    g.addColorStop(1, rgba(dark, 0));
    ctx.fillStyle = g;
    ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
}

function paintTiles(ctx: CanvasRenderingContext2D, size: number, n: number, grout: RGB, seed: number, irregular: boolean): void {
  const r = rand(seed);
  const s = size / n;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const t = (r() - 0.5) * 30;
      ctx.fillStyle = t > 0 ? `rgba(255,240,215,${t / 160})` : `rgba(50,35,20,${-t / 160})`;
      const ox = irregular ? (r() - 0.5) * 6 : 0;
      const oy = irregular ? (r() - 0.5) * 6 : 0;
      ctx.fillRect(i * s + 2 + ox, j * s + 2 + oy, s - 4, s - 4);
    }
  }
  ctx.strokeStyle = rgba(grout, 0.8);
  ctx.lineWidth = irregular ? 4 : 3;
  for (let k = 0; k <= n; k++) {
    ctx.beginPath();
    ctx.moveTo(0, k * s);
    ctx.lineTo(size, k * s);
    ctx.moveTo(k * s, 0);
    ctx.lineTo(k * s, size);
    ctx.stroke();
  }
}

function paintPlanks(ctx: CanvasRenderingContext2D, size: number, count: number, vertical: boolean, seed: number, dark: RGB): void {
  const r = rand(seed);
  const s = size / count;
  for (let i = 0; i < count; i++) {
    const t = (r() - 0.5) * 34;
    ctx.fillStyle = t > 0 ? `rgba(255,230,190,${t / 160})` : `rgba(40,25,10,${-t / 160})`;
    if (vertical) ctx.fillRect(i * s, 0, s, size);
    else ctx.fillRect(0, i * s, size, s);
    // grain
    ctx.strokeStyle = rgba(dark, 0.18);
    ctx.lineWidth = 1;
    for (let g = 0; g < 6; g++) {
      ctx.beginPath();
      const off = r() * s;
      if (vertical) {
        ctx.moveTo(i * s + off, 0);
        ctx.bezierCurveTo(i * s + off + 4, size * 0.3, i * s + off - 4, size * 0.7, i * s + off, size);
      } else {
        ctx.moveTo(0, i * s + off);
        ctx.bezierCurveTo(size * 0.3, i * s + off + 4, size * 0.7, i * s + off - 4, size, i * s + off);
      }
      ctx.stroke();
    }
    ctx.fillStyle = rgba(dark, 0.75);
    if (vertical) ctx.fillRect(i * s, 0, 3, size);
    else ctx.fillRect(0, i * s, size, 3);
  }
}

function toTexture(canvas: HTMLCanvasElement, repeat = true): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  }
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

const SIZE = 256;

function wallSand(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [204, 172, 122], 46, 11);
  paintBlocks(ctx, SIZE, 6, [150, 118, 78], 12, 40);
  paintStains(ctx, SIZE, 6, [120, 90, 55], 13, 0.12);
  return c;
}

function wallPlaster(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [222, 198, 154], 34, 21, 4);
  paintStains(ctx, SIZE, 10, [150, 115, 75], 22, 0.16);
  paintCracks(ctx, SIZE, 4, 23);
  // exposed bricks
  const r = rand(24);
  for (let i = 0; i < 3; i++) {
    const x = r() * SIZE;
    const y = r() * SIZE;
    for (let k = 0; k < 4; k++) {
      ctx.fillStyle = 'rgba(170,120,80,0.6)';
      ctx.fillRect(x + (k % 2) * 14, y + k * 9, 26, 7);
    }
  }
  return c;
}

function wallTrim(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [178, 146, 104], 40, 31);
  paintBlocks(ctx, SIZE, 4, [120, 92, 60], 32, 25);
  return c;
}

function floorSand(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [198, 166, 116], 50, 41, 5);
  const r = rand(42);
  for (let i = 0; i < 260; i++) {
    ctx.fillStyle = r() > 0.5 ? 'rgba(120,95,60,0.35)' : 'rgba(245,225,185,0.35)';
    const s = 1 + r() * 2.5;
    ctx.fillRect(r() * SIZE, r() * SIZE, s, s);
  }
  paintStains(ctx, SIZE, 5, [140, 110, 70], 43, 0.12);
  return c;
}

function floorStone(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [184, 156, 112], 40, 51);
  paintTiles(ctx, SIZE, 4, [120, 96, 66], 52, true);
  paintStains(ctx, SIZE, 4, [110, 85, 55], 53, 0.12);
  return c;
}

function floorTile(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [206, 178, 132], 30, 61);
  paintTiles(ctx, SIZE, 8, [150, 124, 88], 62, false);
  paintStains(ctx, SIZE, 4, [130, 100, 65], 63, 0.1);
  return c;
}

function floorDark(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [132, 112, 86], 36, 71);
  paintTiles(ctx, SIZE, 4, [80, 64, 46], 72, true);
  return c;
}

function crate(dark: boolean): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  const base: RGB = dark ? [104, 96, 66] : [160, 112, 62];
  const deep: RGB = dark ? [52, 46, 30] : [92, 60, 28];
  fillNoise(ctx, SIZE, base, 30, dark ? 81 : 82, 4);
  paintPlanks(ctx, SIZE, 5, false, dark ? 83 : 84, deep);
  // frame and brace
  ctx.fillStyle = rgba(deep, 0.85);
  const b = 26;
  ctx.fillRect(0, 0, SIZE, b);
  ctx.fillRect(0, SIZE - b, SIZE, b);
  ctx.fillRect(0, 0, b, SIZE);
  ctx.fillRect(SIZE - b, 0, b, SIZE);
  ctx.save();
  ctx.translate(SIZE / 2, SIZE / 2);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-SIZE * 0.7, -12, SIZE * 1.4, 24);
  ctx.restore();
  ctx.fillStyle = 'rgba(255,230,190,0.12)';
  ctx.fillRect(4, 4, SIZE - 8, 4);
  // nails
  ctx.fillStyle = 'rgba(40,40,40,0.8)';
  for (const [x, y] of [
    [13, 13],
    [SIZE - 13, 13],
    [13, SIZE - 13],
    [SIZE - 13, SIZE - 13],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

function corrugated(base: RGB, seed: number): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, base, 26, seed, 4);
  for (let x = 0; x < SIZE; x += 16) {
    const g = ctx.createLinearGradient(x, 0, x + 16, 0);
    g.addColorStop(0, 'rgba(0,0,0,0.25)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.15)');
    g.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, 16, SIZE);
  }
  paintStains(ctx, SIZE, 12, [110, 60, 30], seed + 1, 0.35);
  return c;
}

function doorBlue(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [52, 104, 128], 30, 91, 4);
  paintPlanks(ctx, SIZE, 6, true, 92, [24, 52, 66]);
  // worn paint showing wood
  const r = rand(93);
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = 'rgba(150,110,70,0.55)';
    ctx.beginPath();
    ctx.ellipse(r() * SIZE, r() * SIZE, 4 + r() * 16, 2 + r() * 6, r() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = 'rgba(30,30,30,0.85)';
  ctx.fillRect(0, SIZE * 0.18, SIZE, 10);
  ctx.fillRect(0, SIZE * 0.78, SIZE, 10);
  return c;
}

function roofWood(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [96, 70, 44], 26, 101, 4);
  paintPlanks(ctx, SIZE, 6, false, 102, [40, 28, 16]);
  return c;
}

function car(): HTMLCanvasElement {
  const [c, ctx] = makeCanvas(SIZE, SIZE);
  fillNoise(ctx, SIZE, [126, 58, 44], 30, 111, 4);
  paintStains(ctx, SIZE, 14, [80, 50, 30], 112, 0.45);
  ctx.fillStyle = 'rgba(30,34,40,0.9)';
  ctx.fillRect(SIZE * 0.12, SIZE * 0.1, SIZE * 0.76, SIZE * 0.28);
  ctx.fillStyle = 'rgba(20,20,20,0.9)';
  ctx.beginPath();
  ctx.arc(SIZE * 0.25, SIZE * 0.92, 26, 0, Math.PI * 2);
  ctx.arc(SIZE * 0.75, SIZE * 0.92, 26, 0, Math.PI * 2);
  ctx.fill();
  return c;
}

const PAINTERS: Record<MaterialId, () => HTMLCanvasElement> = {
  wall_sand: wallSand,
  wall_plaster: wallPlaster,
  wall_trim: wallTrim,
  floor_sand: floorSand,
  floor_stone: floorStone,
  floor_tile: floorTile,
  floor_dark: floorDark,
  crate: () => crate(false),
  crate_dark: () => crate(true),
  metal_blue: () => corrugated([48, 92, 138], 121),
  metal_red: () => corrugated([142, 58, 44], 131),
  door_blue: doorBlue,
  roof_wood: roofWood,
  car,
};

export function createSurfaceTexture(id: MaterialId, anisotropy: number): THREE.CanvasTexture {
  const tex = toTexture(PAINTERS[id]());
  tex.anisotropy = anisotropy;
  return tex;
}

/** Soft radial sprite (flashes, sparks, glow). */
export function createGlowTexture(inner: string, outer: string): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(64, 64);
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return toTexture(c, false);
}

/** Star-shaped muzzle flash. */
export function createFlashTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.translate(64, 64);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 64);
  g.addColorStop(0, 'rgba(255,255,230,1)');
  g.addColorStop(0.25, 'rgba(255,210,120,0.9)');
  g.addColorStop(1, 'rgba(255,120,20,0)');
  ctx.fillStyle = g;
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(60, 0);
    ctx.lineTo(0, 8);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, Math.PI * 2);
  ctx.fill();
  return toTexture(c, false);
}

export function createSmokeTexture(): THREE.CanvasTexture {
  const size = 64;
  const [c, ctx] = makeCanvas(size, size);
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - 32) / 32;
      const dy = (y - 32) / 32;
      const r = Math.sqrt(dx * dx + dy * dy);
      const n = fbm(x, y, size, 4, 7, 3);
      const a = Math.max(0, 1 - r) * (0.55 + n * 0.6);
      const i = (y * size + x) * 4;
      img.data[i] = 255;
      img.data[i + 1] = 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = clamp255(a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(c, false);
}

export function createDecalTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(64, 64);
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  g.addColorStop(0, 'rgba(10,8,6,1)');
  g.addColorStop(0.3, 'rgba(25,18,12,0.95)');
  g.addColorStop(0.55, 'rgba(70,52,34,0.6)');
  g.addColorStop(1, 'rgba(90,70,45,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return toTexture(c, false);
}

/** Large painted letter (bomb-site markers on walls). */
export function createLetterTexture(text: string, color: string): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.font = 'bold 200px Impact, "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.88;
  ctx.fillText(text, 128, 140);
  // drips / wear
  ctx.globalCompositeOperation = 'destination-out';
  const r = rand(text.charCodeAt(0));
  for (let i = 0; i < 120; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.2 + r() * 0.5})`;
    ctx.fillRect(r() * 256, r() * 256, 2 + r() * 5, 2 + r() * 5);
  }
  return toTexture(c, false);
}

export function createNameTexture(text: string, color: string): { tex: THREE.CanvasTexture; aspect: number } {
  const [c, ctx] = makeCanvas(256, 64);
  ctx.font = 'bold 30px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(0,0,0,0.75)';
  ctx.strokeText(text, 128, 34);
  ctx.fillStyle = color;
  ctx.fillText(text, 128, 34);
  return { tex: toTexture(c, false), aspect: 4 };
}

// 运行时生成的程序化贴图（不使用任何图片文件）。
import * as THREE from 'three';

class Prng {
  private s: number;
  constructor(seed: number) { this.s = seed >>> 0; }
  next() {
    let t = (this.s = (this.s + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

/** 平滑值噪声（可平铺） */
function valueNoise(w: number, h: number, cell: number, seed: number): Float32Array {
  const r = new Prng(seed);
  const gw = Math.ceil(w / cell), gh = Math.ceil(h / cell);
  const g = new Float32Array(gw * gh);
  for (let i = 0; i < g.length; i++) g[i] = r.next();
  const out = new Float32Array(w * h);
  const sm = (t: number) => t * t * (3 - 2 * t);
  for (let y = 0; y < h; y++) {
    const gy = y / cell, y0 = Math.floor(gy), fy = sm(gy - y0);
    const ya = (y0 % gh) * gw, yb = ((y0 + 1) % gh) * gw;
    for (let x = 0; x < w; x++) {
      const gx = x / cell, x0 = Math.floor(gx), fx = sm(gx - x0);
      const xa = x0 % gw, xb = (x0 + 1) % gw;
      const a = g[ya + xa], b = g[ya + xb], c = g[yb + xa], d = g[yb + xb];
      out[y * w + x] = (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
    }
  }
  return out;
}

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return { c, g: c.getContext('2d')! };
}

function finish(c: HTMLCanvasElement, repeat = true, srgb = true): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}

/** 木纹：沿 u 方向的纤维 + 年轮扰动 */
export function woodTexture(base: [number, number, number], seed = 1, contrast = 0.22): THREE.CanvasTexture {
  const W = 512, H = 512;
  const { c, g } = canvas(W, H);
  const img = g.createImageData(W, H);
  const n1 = valueNoise(W, H, 64, seed);
  const n2 = valueNoise(W, H, 8, seed + 7);
  const r = new Prng(seed + 3);
  const lines = new Float32Array(H);
  for (let y = 0; y < H; y++) lines[y] = r.next();
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const warp = n1[i] * 18;
      const ring = 0.5 + 0.5 * Math.sin((y + warp) * 0.19 + Math.sin(x * 0.012 + seed) * 2.0);
      const fiber = lines[Math.floor(y + warp * 0.3 + H) % H] * 0.35 + n2[i] * 0.25;
      const k = 1 - contrast + contrast * (ring * 0.65 + fiber);
      img.data[i * 4] = Math.min(255, base[0] * k);
      img.data[i * 4 + 1] = Math.min(255, base[1] * k);
      img.data[i * 4 + 2] = Math.min(255, base[2] * k);
      img.data[i * 4 + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return finish(c);
}

/** 石材：斑点 + 细裂纹 */
export function stoneTexture(base: [number, number, number], seed = 5, tiles = 0): THREE.CanvasTexture {
  const W = 512, H = 512;
  const { c, g } = canvas(W, H);
  const img = g.createImageData(W, H);
  const n1 = valueNoise(W, H, 48, seed);
  const n2 = valueNoise(W, H, 6, seed + 11);
  for (let i = 0; i < W * H; i++) {
    const k = 0.82 + 0.16 * n1[i] + 0.1 * (n2[i] - 0.5);
    img.data[i * 4] = base[0] * k;
    img.data[i * 4 + 1] = base[1] * k;
    img.data[i * 4 + 2] = base[2] * k;
    img.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  if (tiles > 0) {
    g.strokeStyle = 'rgba(20,18,15,0.55)';
    g.lineWidth = 3;
    const s = W / tiles;
    for (let i = 0; i <= tiles; i++) {
      g.beginPath(); g.moveTo(0, i * s); g.lineTo(W, i * s); g.stroke();
      for (let j = 0; j <= tiles; j++) {
        const off = (i % 2) * s * 0.5;
        g.beginPath(); g.moveTo(j * s + off, i * s); g.lineTo(j * s + off, (i + 1) * s); g.stroke();
      }
    }
  }
  return finish(c);
}

/** 筒瓦屋面：沿坡向的瓦垄 */
export function roofTexture(): THREE.CanvasTexture {
  const W = 256, H = 256;
  const { c, g } = canvas(W, H);
  const grd = g.createLinearGradient(0, 0, W, 0);
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    grd.addColorStop(t, i % 2 === 0 ? '#2f3a37' : '#4c5a55');
  }
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(0,0,0,0.25)';
  for (let y = 0; y < H; y += 32) g.fillRect(0, y, W, 3);
  return finish(c);
}

/** 浑象星图：深蓝底、金色星点、赤道与黄道 */
export function globeTexture(): THREE.CanvasTexture {
  const W = 2048, H = 1024;
  const { c, g } = canvas(W, H);
  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0c1f45');
  bg.addColorStop(0.5, '#123063');
  bg.addColorStop(1, '#0c1f45');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  // 二十八宿式的星官连线（程序化）
  const r = new Prng(28);
  g.lineWidth = 1.6;
  for (let k = 0; k < 64; k++) {
    const cx = r.next() * W, cy = H * (0.12 + 0.76 * r.next());
    const n = 3 + Math.floor(r.next() * 4);
    const pts: [number, number][] = [];
    let x = cx, y = cy;
    for (let i = 0; i < n; i++) {
      pts.push([x, y]);
      x += (r.next() - 0.5) * 90; y += (r.next() - 0.5) * 60;
    }
    g.strokeStyle = 'rgba(232,196,110,0.35)';
    g.beginPath();
    pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
    g.stroke();
    for (const p of pts) {
      const s = 2.2 + r.next() * 3.2;
      g.fillStyle = 'rgba(255,224,150,0.95)';
      g.beginPath(); g.arc(p[0], p[1], s, 0, Math.PI * 2); g.fill();
    }
  }
  for (let i = 0; i < 1400; i++) {
    const s = r.next() < 0.92 ? 0.9 + r.next() * 1.2 : 2 + r.next() * 2;
    g.fillStyle = `rgba(255,232,180,${0.35 + r.next() * 0.6})`;
    g.beginPath(); g.arc(r.next() * W, r.next() * H, s, 0, Math.PI * 2); g.fill();
  }
  // 赤道
  g.strokeStyle = 'rgba(230,190,100,0.85)';
  g.lineWidth = 4;
  g.beginPath(); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke();
  // 黄道（与赤道成 23.5°）
  g.strokeStyle = 'rgba(214,92,64,0.8)';
  g.lineWidth = 3;
  g.beginPath();
  for (let x = 0; x <= W; x += 8) {
    const lon = (x / W) * Math.PI * 2;
    const lat = Math.asin(Math.sin(23.5 * Math.PI / 180) * Math.sin(lon));
    const y = H / 2 - (lat / Math.PI) * H;
    x ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.stroke();
  // 经线（宿度）
  g.strokeStyle = 'rgba(230,190,100,0.25)';
  g.lineWidth = 1.5;
  for (let i = 0; i < 28; i++) {
    const x = (i / 28) * W;
    g.beginPath(); g.moveTo(x, H * 0.06); g.lineTo(x, H * 0.94); g.stroke();
  }
  const t = finish(c, false);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

/** 司辰木人手持的牌子：竖排两字 */
export function placardTexture(text: string): THREE.CanvasTexture {
  const W = 128, H = 256;
  const { c, g } = canvas(W, H);
  g.fillStyle = '#f2e3c2';
  g.fillRect(0, 0, W, H);
  g.strokeStyle = '#7a1e14';
  g.lineWidth = 8;
  g.strokeRect(6, 6, W - 12, H - 12);
  g.fillStyle = '#7a1e14';
  g.font = `bold 92px ${getComputedStyle(document.documentElement).getPropertyValue('--serif') || 'serif'}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const chars = [...text];
  chars.forEach((ch, i) => g.fillText(ch, W / 2, H * (0.3 + 0.42 * i)));
  return finish(c, false);
}

/** 夜空背景：竖直渐变 + 地平线辉光（用于天穹球内表面） */
export function skyTexture(): THREE.CanvasTexture {
  const W = 16, H = 512;
  const { c, g } = canvas(W, H);
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0.0, '#03040b');
  grd.addColorStop(0.32, '#081127');
  grd.addColorStop(0.47, '#1a2347');
  grd.addColorStop(0.5, '#3b3150');
  grd.addColorStop(0.53, '#120f1c');
  grd.addColorStop(1.0, '#050507');
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);
  const t = finish(c, false);
  return t;
}

/** 地面：中心亮、四周暗的方砖院落 */
export function groundTexture(): THREE.CanvasTexture {
  const W = 1024, H = 1024;
  const { c, g } = canvas(W, H);
  g.fillStyle = '#3b3934';
  g.fillRect(0, 0, W, H);
  const n = valueNoise(W, H, 64, 77);
  const n2 = valueNoise(W, H, 8, 78);
  const img = g.getImageData(0, 0, W, H);
  for (let i = 0; i < W * H; i++) {
    const k = 0.84 + 0.16 * n[i] + 0.06 * (n2[i] - 0.5);
    img.data[i * 4] *= k; img.data[i * 4 + 1] *= k; img.data[i * 4 + 2] *= k;
  }
  g.putImageData(img, 0, 0);
  // 错缝铺就的大石板，缝隙很淡
  g.strokeStyle = 'rgba(12,11,10,0.32)';
  g.lineWidth = 2;
  const s = W / 12;
  for (let j = 0; j <= 12; j++) {
    g.beginPath(); g.moveTo(0, j * s); g.lineTo(W, j * s); g.stroke();
    for (let i = 0; i <= 12; i++) {
      const x = i * s + (j % 2) * s * 0.5;
      g.beginPath(); g.moveTo(x, j * s); g.lineTo(x, (j + 1) * s); g.stroke();
    }
  }
  return finish(c);
}

// Procedural textures (drawn on canvases at runtime) and shared materials.
import * as THREE from "three";
import { rng } from "../sim/sim";

const canvas = (w: number, h: number) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
};

function tex(c: HTMLCanvasElement, repeat: [number, number] = [1, 1], srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 4;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** wood grain running along the texture's v axis */
export function woodTexture(base: string, dark: string, seed = 1, w = 256, h = 512) {
  const [c, g] = canvas(w, h);
  const r = rng(seed);
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) {
    const x = r() * w;
    const amp = 2 + r() * 6;
    const freq = 0.004 + r() * 0.012;
    const ph = r() * 10;
    g.strokeStyle = dark;
    g.globalAlpha = 0.08 + r() * 0.22;
    g.lineWidth = 0.6 + r() * 2.2;
    g.beginPath();
    for (let y = 0; y <= h; y += 8) {
      const xx = x + Math.sin(y * freq + ph) * amp + Math.sin(y * freq * 3.1 + ph) * amp * 0.3;
      if (y === 0) g.moveTo(xx, y);
      else g.lineTo(xx, y);
    }
    g.stroke();
  }
  // a few knots
  for (let i = 0; i < 3; i++) {
    const x = r() * w, y = r() * h;
    for (let k = 0; k < 6; k++) {
      g.globalAlpha = 0.12;
      g.beginPath();
      g.ellipse(x, y, 3 + k * 2.5, 6 + k * 4, 0, 0, Math.PI * 2);
      g.stroke();
    }
  }
  g.globalAlpha = 1;
  return tex(c);
}

/** cylindrical roof tiles (筒瓦) in rows */
export function tileTexture(base: string, light: string) {
  const [c, g] = canvas(256, 256);
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);
  const cols = 8;
  for (let i = 0; i < cols; i++) {
    const x = (i + 0.5) * (256 / cols);
    const grd = g.createLinearGradient(x - 14, 0, x + 14, 0);
    grd.addColorStop(0, "rgba(0,0,0,0.35)");
    grd.addColorStop(0.45, light);
    grd.addColorStop(1, "rgba(0,0,0,0.45)");
    g.fillStyle = grd;
    g.fillRect(x - 12, 0, 24, 256);
  }
  for (let j = 0; j < 4; j++) {
    g.fillStyle = "rgba(0,0,0,0.25)";
    g.fillRect(0, j * 64 + 60, 256, 4);
  }
  return tex(c);
}

export function stoneTexture(seed = 3) {
  const [c, g] = canvas(256, 256);
  const r = rng(seed);
  g.fillStyle = "#9c9486";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2500; i++) {
    const v = 120 + r() * 70;
    g.fillStyle = `rgba(${v},${v - 6},${v - 16},0.25)`;
    g.fillRect(r() * 256, r() * 256, 1 + r() * 3, 1 + r() * 3);
  }
  g.strokeStyle = "rgba(60,52,44,0.55)";
  g.lineWidth = 2;
  for (let row = 0; row < 4; row++) {
    const y = row * 64;
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(256, y);
    g.stroke();
    const off = row % 2 ? 64 : 0;
    for (let x = off; x < 256; x += 128) {
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x, y + 64);
      g.stroke();
    }
  }
  return tex(c);
}

/** celestial globe: equirectangular star map with the 28 lunar mansions */
export function starTexture() {
  const W = 2048, H = 1024;
  const [c, g] = canvas(W, H);
  const r = rng(28);
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "#14244a");
  grd.addColorStop(0.5, "#1b2f5c");
  grd.addColorStop(1, "#14244a");
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);
  // equator & ecliptic
  g.strokeStyle = "rgba(240,200,110,0.85)";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(0, H / 2);
  g.lineTo(W, H / 2);
  g.stroke();
  g.strokeStyle = "rgba(230,120,90,0.8)";
  g.beginPath();
  for (let x = 0; x <= W; x += 8) {
    const y = H / 2 - Math.sin((x / W) * Math.PI * 2) * (23.5 / 180) * H;
    if (x === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  g.stroke();
  // 28 mansion boundaries (unequal widths, as in Chinese astronomy)
  const widths = [12, 9, 15, 5, 5, 18, 11, 26, 8, 12, 10, 17, 16, 9, 16, 12, 14, 11, 16, 2, 9, 33, 4, 15, 7, 18, 18, 17];
  const total = widths.reduce((a, b) => a + b, 0);
  let acc = 0;
  g.strokeStyle = "rgba(240,200,110,0.35)";
  g.lineWidth = 1.5;
  for (const w of widths) {
    const x = (acc / total) * W;
    g.beginPath();
    g.moveTo(x, H * 0.08);
    g.lineTo(x, H * 0.92);
    g.stroke();
    acc += w;
  }
  // stars
  for (let i = 0; i < 1400; i++) {
    const x = r() * W;
    const y = Math.acos(1 - 2 * r()) / Math.PI * H;
    const m = r();
    const rad = m > 0.985 ? 3.2 : m > 0.93 ? 2.0 : 1.1;
    g.fillStyle = m > 0.97 ? "#ffe9b0" : m > 0.8 ? "#f4f0e0" : "rgba(220,225,240,0.75)";
    g.beginPath();
    g.arc(x, y, rad, 0, Math.PI * 2);
    g.fill();
  }
  // a few asterism lines (stylised, Chinese star maps join stars into groups)
  g.strokeStyle = "rgba(250,230,170,0.55)";
  g.lineWidth = 1.4;
  for (let k = 0; k < 40; k++) {
    let x = r() * W, y = H * (0.15 + r() * 0.7);
    const n = 3 + Math.floor(r() * 4);
    g.beginPath();
    g.moveTo(x, y);
    const pts: [number, number][] = [[x, y]];
    for (let j = 0; j < n; j++) {
      x += (r() - 0.5) * 90;
      y += (r() - 0.5) * 70;
      g.lineTo(x, y);
      pts.push([x, y]);
    }
    g.stroke();
    g.fillStyle = "#fff4cf";
    for (const [px, py] of pts) {
      g.beginPath();
      g.arc(px, py, 3, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = tex(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** jack's time plaque: e.g. 子 / 时 */
export function plaqueTexture(ch: string) {
  const [c, g] = canvas(128, 192);
  g.fillStyle = "#efe3c4";
  g.fillRect(0, 0, 128, 192);
  g.strokeStyle = "#7a2416";
  g.lineWidth = 8;
  g.strokeRect(6, 6, 116, 180);
  g.fillStyle = "#2a1a10";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = 'bold 84px "Noto Serif CJK SC","Source Han Serif SC","Songti SC","STSong","SimSun","AR PL UMing CN",serif';
  g.fillText(ch, 64, 72);
  g.font = 'bold 44px "Noto Serif CJK SC","Source Han Serif SC","Songti SC","STSong","SimSun","AR PL UMing CN",serif';
  g.fillText("时", 64, 150);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** soft silk-paper sky with a low sun glow */
export function skyTexture() {
  const [c, g] = canvas(16, 512);
  const grd = g.createLinearGradient(0, 0, 0, 512);
  grd.addColorStop(0.0, "#4d6f92");
  grd.addColorStop(0.3, "#93adc0");
  grd.addColorStop(0.47, "#d9d3c0");
  grd.addColorStop(0.56, "#f1d9ab");
  grd.addColorStop(0.66, "#dcc39c");
  grd.addColorStop(1.0, "#8f8472");
  g.fillStyle = grd;
  g.fillRect(0, 0, 16, 512);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** ink-wash mountain silhouettes (alpha) */
export function mountainTexture(seed: number, color: string) {
  const W = 2048, H = 256;
  const [c, g] = canvas(W, H);
  const r = rng(seed);
  const pts: number[] = [];
  let y = H * 0.6;
  for (let x = 0; x <= W; x += 8) {
    y += (r() - 0.5) * 18;
    y = Math.min(H * 0.92, Math.max(H * 0.12, y));
    pts.push(y);
  }
  // smooth a few times
  for (let k = 0; k < 4; k++) for (let i = 1; i < pts.length - 1; i++) pts[i] = (pts[i - 1] + pts[i] * 2 + pts[i + 1]) / 4;
  pts[pts.length - 1] = pts[0];
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.beginPath();
  g.moveTo(0, H);
  pts.forEach((p, i) => g.lineTo(i * 8, p));
  g.lineTo(W, H);
  g.closePath();
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

export function makeMaterials() {
  const woodTex = woodTexture("#8a5a35", "#3e2412", 1);
  const darkWoodTex = woodTexture("#5a3420", "#24130a", 2);
  const paleWoodTex = woodTexture("#b8895a", "#5e3a1c", 3);
  const lacquerTex = woodTexture("#8e2a1e", "#4a110b", 4);
  const M = {
    wood: new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.78, metalness: 0.0 }),
    darkWood: new THREE.MeshStandardMaterial({ map: darkWoodTex, roughness: 0.8 }),
    paleWood: new THREE.MeshStandardMaterial({ map: paleWoodTex, roughness: 0.72 }),
    lacquer: new THREE.MeshStandardMaterial({ map: lacquerTex, roughness: 0.55, color: 0xffffff }),
    iron: new THREE.MeshStandardMaterial({ color: 0x3a3836, roughness: 0.55, metalness: 0.75 }),
    blackLacquer: new THREE.MeshStandardMaterial({ color: 0x1e1612, roughness: 0.38, metalness: 0.05 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0xb4874a, roughness: 0.35, metalness: 0.9 }),
    darkBronze: new THREE.MeshStandardMaterial({ color: 0x6f5a36, roughness: 0.45, metalness: 0.85 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xd8b25a, roughness: 0.3, metalness: 1.0 }),
    stone: new THREE.MeshStandardMaterial({ map: stoneTexture(), roughness: 0.92 }),
    tile: new THREE.MeshStandardMaterial({ map: tileTexture("#3f5a55", "rgba(120,160,150,0.9)"), roughness: 0.6, metalness: 0.05, side: THREE.DoubleSide }),
    plaster: new THREE.MeshStandardMaterial({ color: 0xe6dccb, roughness: 0.95 }),
    water: new THREE.MeshStandardMaterial({ color: 0x2f7fb8, roughness: 0.06, metalness: 0.15, transparent: true, opacity: 0.9, emissive: 0x06243c }),
    waterSurface: new THREE.MeshStandardMaterial({ color: 0x3f86b3, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.82 }),
    rope: new THREE.MeshStandardMaterial({ color: 0x2e2b28, roughness: 0.5, metalness: 0.8 }),
    cloth: new THREE.MeshStandardMaterial({ color: 0x2f4f6f, roughness: 0.9 }),
    skin: new THREE.MeshStandardMaterial({ color: 0xe8c9a0, roughness: 0.7 }),
    red: new THREE.MeshStandardMaterial({ color: 0xa8321f, roughness: 0.6 }),
    drumSkin: new THREE.MeshStandardMaterial({ color: 0xd9c49a, roughness: 0.85 }),
    globe: new THREE.MeshStandardMaterial({ map: starTexture(), roughness: 0.55, metalness: 0.05 }),
  };
  return M;
}
export type Materials = ReturnType<typeof makeMaterials>;

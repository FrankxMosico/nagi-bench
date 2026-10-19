// 运行时程序化生成的纹理与材质（不加载任何外部图片）。
import * as THREE from "three";
import { QUALITY } from "../quality";

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  // CPU 光栅化：避免在（可能是软件实现的）GPU 进程里绘制程序化纹理
  return [c, c.getContext("2d", { willReadFrequently: true })!] as const;
}

/** 木纹：沿 v 方向的纤维条纹 + 少量节疤 */
export function woodTexture(base: string, dark: string, seed = 1, w = 256, h = 512) {
  const [c, g] = canvas(w, h);
  const r = rng(seed);
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) {
    const x0 = r() * w;
    const amp = 2 + r() * 6;
    const fr = 0.004 + r() * 0.01;
    g.strokeStyle = dark;
    g.globalAlpha = 0.08 + r() * 0.18;
    g.lineWidth = 0.6 + r() * 2.2;
    g.beginPath();
    for (let y = 0; y <= h; y += 8) {
      const x = x0 + Math.sin(y * fr + i) * amp;
      if (y === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
  }
  for (let i = 0; i < 4; i++) {
    const x = r() * w, y = r() * h;
    g.globalAlpha = 0.25;
    g.fillStyle = dark;
    g.beginPath();
    g.ellipse(x, y, 3 + r() * 4, 8 + r() * 10, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 石材：斑点噪声 + 方砖缝 */
export function stoneTexture(seed = 7, size = 512, tiles = 4) {
  const [c, g] = canvas(size, size);
  const r = rng(seed);
  g.fillStyle = "#8c8a84";
  g.fillRect(0, 0, size, size);
  const cell = size / tiles;
  for (let i = 0; i < tiles; i++)
    for (let j = 0; j < tiles; j++) {
      const v = 120 + Math.floor(r() * 30);
      g.fillStyle = `rgb(${v},${v - 3},${v - 8})`;
      g.fillRect(i * cell + 2, j * cell + 2, cell - 4, cell - 4);
    }
  for (let i = 0; i < 4000; i++) {
    const v = Math.floor(r() * 80 + 90);
    g.fillStyle = `rgba(${v},${v},${v - 6},0.35)`;
    g.fillRect(r() * size, r() * size, 1 + r() * 2, 1 + r() * 2);
  }
  g.strokeStyle = "rgba(40,38,34,0.7)";
  g.lineWidth = 3;
  for (let i = 0; i <= tiles; i++) {
    g.beginPath();
    g.moveTo(i * cell, 0);
    g.lineTo(i * cell, size);
    g.moveTo(0, i * cell);
    g.lineTo(size, i * cell);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 地面：深色夯土与零星草色的噪声 */
export function earthTexture(seed = 21, size = 512) {
  const [c, g] = canvas(size, size);
  const r = rng(seed);
  g.fillStyle = "#3a332c";
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i++) {
    const x = r() * size, y = r() * size, s = 2 + r() * 14;
    const tone = r();
    g.fillStyle = tone < 0.4 ? "rgba(70,62,50,0.25)" : tone < 0.75 ? "rgba(40,36,30,0.3)" : "rgba(58,70,44,0.22)";
    g.beginPath();
    g.ellipse(x, y, s, s * (0.5 + r()), r() * 3, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 筒瓦屋面：一列列瓦垄 */
export function roofTexture() {
  const [c, g] = canvas(256, 256);
  g.fillStyle = "#3e464f";
  g.fillRect(0, 0, 256, 256);
  for (let x = 0; x < 256; x += 32) {
    const grd = g.createLinearGradient(x, 0, x + 32, 0);
    grd.addColorStop(0, "#2a3036");
    grd.addColorStop(0.5, "#8d97a2");
    grd.addColorStop(1, "#2a3036");
    g.fillStyle = grd;
    g.fillRect(x + 6, 0, 20, 256);
  }
  for (let y = 0; y < 256; y += 32) {
    g.fillStyle = "rgba(0,0,0,0.35)";
    g.fillRect(0, y, 256, 3);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** 浑象星图：深蓝底、星点、赤道与黄道 */
export function starMapTexture() {
  const W = 1024, H = 512;
  const [c, g] = canvas(W, H);
  const grd = g.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "#0b1a3a");
  grd.addColorStop(0.5, "#13295a");
  grd.addColorStop(1, "#0b1a3a");
  g.fillStyle = grd;
  g.fillRect(0, 0, W, H);
  const r = rng(42);
  // 二十八宿：画若干小星群与连线
  g.strokeStyle = "rgba(240,210,140,0.55)";
  g.lineWidth = 1.5;
  for (let k = 0; k < 28; k++) {
    const cx = (k / 28) * W + r() * 20;
    const cy = H / 2 + (r() - 0.5) * H * 0.55;
    let px = cx, py = cy;
    const n = 3 + Math.floor(r() * 4);
    g.beginPath();
    g.moveTo(px, py);
    for (let i = 0; i < n; i++) {
      px += (r() - 0.3) * 40;
      py += (r() - 0.5) * 34;
      g.lineTo(px, py);
    }
    g.stroke();
  }
  for (let i = 0; i < 900; i++) {
    const x = r() * W, y = r() * H;
    const s = r() < 0.1 ? 2.6 : 1.2;
    g.fillStyle = r() < 0.15 ? "#ffd27a" : "#e8eeff";
    g.beginPath();
    g.arc(x, y, s, 0, Math.PI * 2);
    g.fill();
  }
  // 赤道（红）与黄道（金）
  g.strokeStyle = "rgba(220,60,40,0.9)";
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo(0, H / 2);
  g.lineTo(W, H / 2);
  g.stroke();
  g.strokeStyle = "rgba(255,200,80,0.9)";
  g.lineWidth = 3;
  g.beginPath();
  for (let x = 0; x <= W; x += 8) {
    const y = H / 2 - Math.sin((x / W) * Math.PI * 2) * H * 0.13;
    if (x === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  }
  g.stroke();
  // 经线
  g.strokeStyle = "rgba(200,190,160,0.25)";
  g.lineWidth = 1;
  for (let k = 0; k < 12; k++) {
    g.beginPath();
    g.moveTo((k / 12) * W, 0);
    g.lineTo((k / 12) * W, H);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** 时辰牌：竖排文字 */
export function placardTexture(text: string) {
  const [c, g] = canvas(128, 256);
  g.fillStyle = "#f3e6c4";
  g.fillRect(0, 0, 128, 256);
  g.strokeStyle = "#7a1d12";
  g.lineWidth = 8;
  g.strokeRect(6, 6, 116, 244);
  g.fillStyle = "#1c120c";
  g.font = 'bold 84px "Noto Serif CJK SC","Source Han Serif SC","Songti SC","STSong","SimSun",serif';
  g.textAlign = "center";
  g.textBaseline = "middle";
  const chars = [...text];
  chars.forEach((ch, i) => g.fillText(ch, 64, 70 + i * 100));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export type LitMat = THREE.MeshStandardMaterial | THREE.MeshPhongMaterial;

/** 统一的受光材质：高画质用 PBR，低画质用更便宜的 Phong */
export function litMat(o: THREE.MeshStandardMaterialParameters): LitMat {
  if (!QUALITY.low) return new THREE.MeshStandardMaterial(o);
  const metal = o.metalness ?? 0;
  const rough = o.roughness ?? 0.8;
  const color = new THREE.Color(o.color ?? 0xffffff);
  return new THREE.MeshPhongMaterial({
    map: o.map ?? null,
    color: metal > 0.5 ? color.clone().multiplyScalar(0.75) : color,
    emissive: o.emissive ?? 0x000000,
    emissiveIntensity: o.emissiveIntensity ?? 1,
    transparent: o.transparent ?? false,
    opacity: o.opacity ?? 1,
    side: o.side ?? THREE.FrontSide,
    shininess: Math.max(4, (1 - rough) * (metal > 0.5 ? 90 : 40)),
    specular: metal > 0.5 ? color.clone().multiplyScalar(0.8) : new THREE.Color(0x1a1a1a),
  });
}

export function makeMaterials() {
  const lacquer = woodTexture("#8a2318", "#3b0b06", 3);
  const woodLight = woodTexture("#b98a55", "#5a3a1c", 5);
  const woodMid = woodTexture("#7a5434", "#2e1c0d", 9);
  const woodDark = woodTexture("#4d3420", "#1a0f06", 11);
  const stone = stoneTexture(7, 512, 4);
  const roof = roofTexture();
  const std = litMat;
  return {
    lacquer: std({ map: lacquer, color: "#ffffff", roughness: 0.55, metalness: 0.0 }),
    woodLight: std({ map: woodLight, roughness: 0.75 }),
    woodMid: std({ map: woodMid, roughness: 0.8 }),
    woodDark: std({ map: woodDark, roughness: 0.85 }),
    stone: std({ map: stone, roughness: 0.95 }),
    roof: std({ map: roof, roughness: 0.7, metalness: 0.1 }),
    bronze: std({ color: "#c49a5a", roughness: 0.32, metalness: 0.9 }),
    darkBronze: std({ color: "#7a6038", roughness: 0.45, metalness: 0.85 }),
    iron: std({ color: "#3c3a38", roughness: 0.55, metalness: 0.7 }),
    gold: std({ color: "#e0b450", roughness: 0.3, metalness: 1.0 }),
    red: std({ color: "#c8361f", roughness: 0.45, metalness: 0.05 }),
    jade: std({ color: "#2e5c52", roughness: 0.5, metalness: 0.1 }),
    water: std({ color: "#5cc3ff", emissive: "#0f4f8a", emissiveIntensity: 0.6, roughness: 0.08, metalness: 0.1 }),
    waterSurface: std({ color: "#3a8fd0", emissive: "#0b3a66", emissiveIntensity: 0.5, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.85 }),
    paper: std({ color: "#efe2c0", roughness: 0.9 }),
    skin: std({ color: "#e6c39a", roughness: 0.7 }),
    robeBlue: std({ color: "#2f4f8f", roughness: 0.7 }),
    robeGreen: std({ color: "#2f6f4f", roughness: 0.7 }),
    robeRed: std({ color: "#a83224", roughness: 0.7 }),
    black: std({ color: "#151515", roughness: 0.6 }),
    drumSkin: std({ color: "#d9c08e", roughness: 0.8 }),
    globe: std({ map: starMapTexture(), roughness: 0.5, metalness: 0.1 }),
  };
}

export type Materials = ReturnType<typeof makeMaterials>;

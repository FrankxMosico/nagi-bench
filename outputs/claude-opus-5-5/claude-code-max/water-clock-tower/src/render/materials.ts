// 材质库：宋式木作（朱漆柱、本色木构件）、青铜仪器、铁件、水、石作。
import * as THREE from 'three';
import { woodTexture, stoneTexture, roofTexture, globeTexture, groundTexture } from './textures';

export type PMat = THREE.MeshStandardMaterial | THREE.MeshLambertMaterial | THREE.MeshPhongMaterial;

export interface Palette {
  make: (p: THREE.MeshStandardMaterialParameters) => PMat;
  woodMech: PMat; // 机构木件（浅）
  woodMech2: PMat; // 机构木件（深）
  woodBeam: PMat; // 梁枋
  woodFloor: PMat;
  lacquer: PMat; // 朱漆
  lacquerDark: PMat;
  wall: PMat; // 白墙（剖切时淡出）
  lattice: PMat;
  bronze: PMat;
  bronzeDark: PMat;
  iron: PMat;
  gold: PMat;
  stone: PMat;
  stoneLight: PMat;
  roof: PMat;
  water: PMat;
  waterSurface: PMat;
  globe: PMat;
  robeRed: PMat;
  robePurple: PMat;
  robeGreen: PMat;
  robeBlue: PMat;
  skin: PMat;
  hat: PMat;
  drumSkin: PMat;
  ground: PMat;
  paper: PMat;
}

export function makePalette(lite = false): Palette {
  const wood1 = woodTexture([184, 146, 106], 3);
  const wood2 = woodTexture([118, 86, 60], 9);
  const wood3 = woodTexture([96, 58, 36], 15, 0.3);
  const floorTex = woodTexture([120, 84, 56], 21, 0.25);
  floorTex.repeat.set(4, 4);
  const stoneTex = stoneTexture([170, 164, 150], 5, 4);
  const stoneTex2 = stoneTexture([205, 198, 182], 8);
  const roofTex = roofTexture();
  roofTex.repeat.set(6, 2);
  const gnd = groundTexture();
  gnd.repeat.set(6, 6);
  // 软件渲染时用更省的光照模型：金属用 Phong（保留高光），其余用 Lambert
  const std = (p: THREE.MeshStandardMaterialParameters): PMat => {
    if (!lite) return new THREE.MeshStandardMaterial(p);
    const { roughness = 0.7, metalness = 0, ...rest } = p;
    if (metalness > 0.5) {
      const c = new THREE.Color(rest.color ?? 0xffffff);
      return new THREE.MeshPhongMaterial({ ...rest, color: c.clone().multiplyScalar(0.75), specular: c.clone().multiplyScalar(0.9), shininess: 18 + (1 - roughness) * 60 });
    }
    return new THREE.MeshLambertMaterial(rest);
  };
  return {
    make: (p: THREE.MeshStandardMaterialParameters) => std(p),
    woodMech: std({ map: wood1, roughness: 0.72, metalness: 0.0 }),
    woodMech2: std({ map: wood2, roughness: 0.75, metalness: 0.0 }),
    woodBeam: std({ map: wood3, roughness: 0.8 }),
    woodFloor: std({ map: floorTex, roughness: 0.85 }),
    lacquer: std({ color: 0x9a2a1d, roughness: 0.42, metalness: 0.05 }),
    lacquerDark: std({ color: 0x5a1a14, roughness: 0.5 }),
    wall: std({ color: 0xd8ccb2, roughness: 0.92, transparent: true, opacity: 1 }),
    lattice: std({ color: 0x6b2219, roughness: 0.6, transparent: true, opacity: 1 }),
    bronze: std({ color: 0xb08a48, roughness: 0.34, metalness: 0.88 }),
    bronzeDark: std({ color: 0x6d5a35, roughness: 0.45, metalness: 0.8 }),
    iron: std({ color: 0x45474d, roughness: 0.5, metalness: 0.7 }),
    gold: std({ color: 0xe0b45a, roughness: 0.28, metalness: 1.0 }),
    stone: std({ map: stoneTex, roughness: 0.9 }),
    stoneLight: std({ map: stoneTex2, roughness: 0.88 }),
    roof: std({ map: roofTex, roughness: 0.62, metalness: 0.1 }),
    water: std({ color: 0x4cc4f0, roughness: 0.08, metalness: 0.0, transparent: true, opacity: 0.82, emissive: 0x0b4f72, emissiveIntensity: 0.55 }),
    waterSurface: std({ color: 0x8fe2ff, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.9, emissive: 0x1a6f96, emissiveIntensity: 0.5 }),
    globe: std({ map: globeTexture(), roughness: 0.45, metalness: 0.15 }),
    robeRed: std({ color: 0xa8342a, roughness: 0.75 }),
    robePurple: std({ color: 0x6c3a7c, roughness: 0.75 }),
    robeGreen: std({ color: 0x3d7350, roughness: 0.75 }),
    robeBlue: std({ color: 0x2f4f86, roughness: 0.75 }),
    skin: std({ color: 0xe6c39a, roughness: 0.7 }),
    hat: std({ color: 0x17161a, roughness: 0.6 }),
    drumSkin: std({ color: 0xd9c49a, roughness: 0.85 }),
    ground: std({ map: gnd, roughness: 0.95 }),
    paper: std({ color: 0xf2e3c2, roughness: 0.9 }),
  };
}

/**
 * 高亮：为一组网格克隆材质，之后可单独调节其自发光强度（金色辉光）。
 */
export class Highlighter {
  private groups = new Map<string, { mats: PMat[]; base: number[]; level: number }>();
  private color = new THREE.Color(0xff9a2e);
  private tmp = new THREE.Color();
  /** 高亮强度上限：软件渲染的 Lambert 材质对自发光更敏感，取低一些 */
  constructor(private gain = 0.6) {}

  register(name: string, roots: THREE.Object3D[]) {
    const mats: PMat[] = [];
    const base: number[] = [];
    const cache = new Map<THREE.Material, PMat>();
    for (const r of roots) {
      r.traverse((o) => {
        const m = o as THREE.Mesh;
        if (!m.isMesh) return;
        const src = m.material as PMat;
        if (!src || !('emissive' in src) || Array.isArray(src)) return;
        let c = cache.get(src);
        if (!c) {
          c = src.clone();
          cache.set(src, c);
          mats.push(c);
          base.push(c.emissiveIntensity ?? 0);
          c.userData.baseEmissive = c.emissive.clone();
        }
        m.material = c;
      });
    }
    this.groups.set(name, { mats, base, level: 0 });
  }

  set(name: string, level: number) {
    const g = this.groups.get(name);
    if (!g || Math.abs(g.level - level) < 1e-3) return;
    g.level = level;
    g.mats.forEach((m, i) => {
      const be = m.userData.baseEmissive as THREE.Color;
      if (level <= 1e-3) {
        m.emissive.copy(be);
        m.emissiveIntensity = g.base[i];
      } else {
        // 自发光输出 = 原有自发光 与 (高亮色 × 上限) 之间按 level 插值；强度并入颜色
        this.tmp.copy(this.color).multiplyScalar(this.gain);
        m.emissive.copy(be).multiplyScalar(g.base[i]).lerp(this.tmp, Math.min(1, level));
        m.emissiveIntensity = 1;
      }
    });
  }

  names() { return [...this.groups.keys()]; }
}

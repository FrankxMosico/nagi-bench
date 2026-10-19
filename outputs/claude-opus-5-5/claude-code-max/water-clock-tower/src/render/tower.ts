// 静止的建筑与支架：台基、柱梁斗栱、墙与窗、屋檐、木阁、水箱渠管、轴承支架、浑象室、顶层浑仪座。
// 剖视用"裁切平面"实现：东侧整面与中层东南角被逐渐剖开，机构本身不受影响。
import * as THREE from 'three';
import type { Sim } from '../sim/sim';
import { ESC } from '../sim/escapement';
import { DRV, LEVERS } from '../sim/drivetrain';
import { POLAR } from '../sim/instruments';
import { WATER, WATER_TANKS } from '../sim/water';
import type { Palette, PMat } from './materials';
import { V, box, rod, beam, ring, torus, cyl, bake, mesh } from './geom';
import { makeFigure } from './mech';

export interface TowerView {
  root: THREE.Group;
  parts: Record<string, THREE.Object3D[]>;
  anchors: Record<string, () => THREE.Vector3>;
  setCut: (k: number) => void; // 0 = 完整外观，1 = 完全剖开
}

// 建筑尺度
export const T = {
  x0: -2.55, x1: 2.95, // 底层东西
  z0: -2.35, z1: 2.45, // 底层南北（+Z 为南、正面）
  h1: 6.0, // 底层高
  m: { x0: -2.15, x1: 1.75, z0: -1.75, z1: 1.85, h: 8.75 }, // 中层（浑象室）
  top: { x0: -2.3, x1: 1.9, z0: -1.9, z1: 2.0 }, // 顶层平台
  cutA: 2.78, // 底层剖切面 x
  cutBx: 1.45, // 中层剖切面 x
  cutBz: 1.62, // 中层剖切面 z
};

const wp = (u: number, v: number, w = 0) => {
  const o = ESC.origin;
  return V(o.x + w, o.y + v, o.z - u);
};

/** 给一组网格换上带裁切平面的材质（按源材质缓存克隆） */
function applyClip(obj: THREE.Object3D, planes: THREE.Plane[], cache: Map<THREE.Material, THREE.Material>) {
  obj.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const src = m.material as THREE.Material;
    let c = cache.get(src);
    if (!c) {
      c = src.clone();
      c.clippingPlanes = planes;
      c.clipShadows = true;
      cache.set(src, c);
    }
    m.material = c;
  });
}

/**
 * 宋式屋檐一圈：檐面略凹、四角起翘，下有一排椽子。
 * (x0..x1, z0..z1) 为檐根（墙顶）矩形，over 为出檐，drop 为檐口下降，lift 为角部起翘。
 */
function eaveRing(g: THREE.Group, x0: number, x1: number, z0: number, z1: number, y: number, over: number, drop: number, lift: number, roof: PMat, rafter: PMat) {
  const inner = [V(x0, y, z0), V(x1, y, z0), V(x1, y, z1), V(x0, y, z1)];
  const outer = [V(x0 - over, y, z0 - over), V(x1 + over, y, z0 - over), V(x1 + over, y, z1 + over), V(x0 - over, y, z1 + over)];
  const ns = 24, nr = 6;
  for (let side = 0; side < 4; side++) {
    const ia = inner[side], ib = inner[(side + 1) % 4], oa = outer[side], ob = outer[(side + 1) % 4];
    const len = ia.distanceTo(ib);
    const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    for (let i = 0; i <= ns; i++) {
      const s = i / ns;
      const corner = Math.pow(Math.max(0, 1 - Math.min(s, 1 - s) / 0.22), 2);
      for (let j = 0; j <= nr; j++) {
        const r = j / nr;
        const pi = ia.clone().lerp(ib, s), po = oa.clone().lerp(ob, s);
        const p = pi.lerp(po, r);
        p.y = y - drop * (0.6 * r + 0.4 * r * r) + lift * corner * r * r;
        pos.push(p.x, p.y, p.z);
        uv.push(s * len * 0.9, r * 1.6);
      }
    }
    for (let i = 0; i < ns; i++) for (let j = 0; j < nr; j++) {
      const a = i * (nr + 1) + j, b = a + nr + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const m = mesh(geo, roof);
    g.add(m);
    // 檐口瓦当线
    const edge: THREE.Vector3[] = [];
    for (let i = 0; i <= ns; i++) edge.push(new THREE.Vector3(pos[(i * (nr + 1) + nr) * 3], pos[(i * (nr + 1) + nr) * 3 + 1], pos[(i * (nr + 1) + nr) * 3 + 2]));
    g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edge), ns * 2, 0.035, 5, false), roof));
    // 椽子
    const nRaf = Math.floor(len / 0.16);
    for (let i = 1; i < nRaf; i++) {
      const s = i / nRaf;
      const pi = ia.clone().lerp(ib, s), po = oa.clone().lerp(ob, s);
      const corner = Math.pow(Math.max(0, 1 - Math.min(s, 1 - s) / 0.22), 2);
      const r1 = 0.94;
      const pe = pi.clone().lerp(po, r1);
      pe.y = y - drop * (0.6 * r1 + 0.4 * r1 * r1) + lift * corner * r1 * r1 - 0.05;
      g.add(rod(pi.clone().setY(y - 0.07), pe, 0.022, rafter, 5));
    }
  }
  // 角梁
  for (let k = 0; k < 4; k++) {
    const e = outer[k].clone();
    e.y = y - drop + lift + 0.02;
    g.add(rod(inner[k].clone().setY(y - 0.05), e, 0.045, rafter, 6));
  }
}

/** 一组斗栱：栌斗 + 十字栱 + 散斗（简化），刷青绿彩画 */
function bracketSet(g: THREE.Group, x: number, y: number, z: number, nx: number, nz: number, paint: PMat, wood: PMat, s = 1) {
  g.add(box(0.2 * s, 0.11 * s, 0.2 * s, wood, V(x, y, z)));
  const along = nx === 0; // 沿 x 方向的墙
  g.add(box(along ? 0.56 * s : 0.08 * s, 0.07 * s, along ? 0.08 * s : 0.56 * s, paint, V(x, y + 0.09 * s, z)));
  g.add(box(along ? 0.08 * s : 0.5 * s, 0.07 * s, along ? 0.5 * s : 0.08 * s, paint, V(x + nx * 0.18 * s, y + 0.09 * s, z + nz * 0.18 * s)));
  for (const d of [-0.24, 0, 0.24]) {
    const ox = along ? d * s : nx * 0.36 * s, oz = along ? nz * 0.36 * s : d * s;
    g.add(box(0.1 * s, 0.07 * s, 0.1 * s, wood, V(x + (along ? d * s : 0), y + 0.16 * s, z + (along ? 0 : d * s))));
    if (d === 0) g.add(box(0.1 * s, 0.07 * s, 0.1 * s, wood, V(x + ox, y + 0.16 * s, z + oz)));
  }
  g.add(box(along ? 0.6 * s : 0.08 * s, 0.06 * s, along ? 0.08 * s : 0.6 * s, paint, V(x + nx * 0.36 * s, y + 0.22 * s, z + nz * 0.36 * s)));
}

export function buildTower(sim: Sim, pal: Palette): TowerView {
  const root = new THREE.Group();
  root.name = 'tower';
  const parts: Record<string, THREE.Object3D[]> = {};
  const anchors: Record<string, () => THREE.Vector3> = {};
  const add = (n: string, o: THREE.Object3D) => (parts[n] ??= []).push(o);
  const clipA = [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 40)];
  const clipB = [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 40), new THREE.Plane(new THREE.Vector3(0, 0, -1), 40)];
  const cacheA = new Map<THREE.Material, THREE.Material>(), cacheB = new Map<THREE.Material, THREE.Material>();
  const paint = pal.make({ color: 0x2d6a5e, roughness: 0.6 });
  const paintBlue = pal.make({ color: 0x2f5684, roughness: 0.6 });
  const wallMat = pal.make({ color: 0xa39478, roughness: 0.95 });
  const latMat = pal.make({ color: 0x7a2a1e, roughness: 0.6 });
  const paper = pal.make({ color: 0xcdb98f, roughness: 0.9, emissive: 0x6b3a12, emissiveIntensity: 0.1 });

  // ---------------------------------------------------------------- 台基与院落
  {
    const g = new THREE.Group();
    const cx = (T.x0 + T.x1) / 2, cz = (T.z0 + T.z1) / 2 + 0.25;
    g.add(box(T.x1 - T.x0 + 1.4, 0.62, T.z1 - T.z0 + 1.9, pal.stone, V(cx, -0.31, cz)));
    g.add(box(T.x1 - T.x0 + 1.6, 0.07, T.z1 - T.z0 + 2.1, pal.stoneLight, V(cx, -0.035, cz)));
    for (let i = 0; i < 3; i++) g.add(box(2.4, 0.2, 0.34, pal.stoneLight, V(-0.5, -0.52 + i * 0.2, T.z1 + 1.6 - i * 0.32)));
    // 台基四周的石栏
    const rx0 = T.x0 - 0.62, rx1 = T.x1 + 0.62, rz0 = T.z0 - 0.62, rz1 = T.z1 + 1.12;
    const post = (x: number, z: number) => g.add(box(0.1, 0.42, 0.1, pal.stoneLight, V(x, 0.2, z)));
    for (let x = rx0; x <= rx1 + 1e-6; x += (rx1 - rx0) / 12) { post(x, rz0); if (Math.abs(x + 0.5) > 1.3) post(x, rz1); }
    for (let z = rz0; z <= rz1 + 1e-6; z += (rz1 - rz0) / 9) { post(rx0, z); post(rx1, z); }
    g.add(box(rx1 - rx0, 0.06, 0.06, pal.stoneLight, V(cx, 0.36, rz0)));
    g.add(box(0.06, 0.06, rz1 - rz0, pal.stoneLight, V(rx0, 0.36, (rz0 + rz1) / 2)), box(0.06, 0.06, rz1 - rz0, pal.stoneLight, V(rx1, 0.36, (rz0 + rz1) / 2)));
    g.add(box((-0.5 - 1.3) - rx0, 0.06, 0.06, pal.stoneLight, V((rx0 - 1.8) / 2, 0.36, rz1)), box(rx1 - 0.8, 0.06, 0.06, pal.stoneLight, V((rx1 + 0.8) / 2, 0.36, rz1)));
    g.add(box(T.x1 - T.x0, 0.06, T.z1 - T.z0, pal.woodFloor, V((T.x0 + T.x1) / 2, 0.03, (T.z0 + T.z1) / 2)));
    root.add(bake(g));
  }

  // ---------------------------------------------------------------- 底层：柱、阑额、斗栱、顶板（剖切 A）
  const baseFrame = new THREE.Group();
  {
    const g = baseFrame;
    const col = (x: number, z: number, y0: number, y1: number, r = 0.11) => {
      g.add(cyl(r, y1 - y0, pal.lacquer, 'y', 16, V(x, (y0 + y1) / 2, z)));
      g.add(cyl(r + 0.07, 0.12, pal.stoneLight, 'y', 16, V(x, y0 + 0.06, z)));
    };
    const top = T.h1 - 0.32;
    for (const x of [T.x0, -1.95, -0.05, 1.15, T.x1]) { col(x, T.z0, 0.06, top); if (x !== -0.05) col(x, T.z1, 0.06, top); }
    for (const z of [-0.6, 1.0]) { col(T.x0, z, 0.06, top); col(T.x1, z, 0.06, top); }
    const ringBeam = (x0: number, x1: number, z0: number, z1: number, y: number, h: number, d: number, mat: PMat) => {
      g.add(box(x1 - x0 + 0.24, h, d, mat, V((x0 + x1) / 2, y, z0)), box(x1 - x0 + 0.24, h, d, mat, V((x0 + x1) / 2, y, z1)));
      g.add(box(d, h, z1 - z0 + 0.24, mat, V(x0, y, (z0 + z1) / 2)), box(d, h, z1 - z0 + 0.24, mat, V(x1, y, (z0 + z1) / 2)));
    };
    ringBeam(T.x0, T.x1, T.z0, T.z1, top - 0.08, 0.2, 0.16, pal.lacquerDark); // 阑额
    ringBeam(T.x0, T.x1, T.z0, T.z1, top + 0.08, 0.06, 0.1, paint); // 彩画带
    ringBeam(T.x0, T.x1, T.z0, T.z1, top + 0.16, 0.1, 0.22, pal.woodBeam); // 普拍枋
    for (let i = 0; i <= 10; i++) { const x = T.x0 + (i * (T.x1 - T.x0)) / 10; bracketSet(g, x, top + 0.28, T.z0, 0, -1, paint, pal.woodBeam); bracketSet(g, x, top + 0.28, T.z1, 0, 1, paint, pal.woodBeam); }
    for (let i = 1; i < 8; i++) { const z = T.z0 + (i * (T.z1 - T.z0)) / 8; bracketSet(g, T.x0, top + 0.28, z, -1, 0, paint, pal.woodBeam); bracketSet(g, T.x1, top + 0.28, z, 1, 0, paint, pal.woodBeam); }
    // 底层顶板（中层楼面）
    g.add(box(T.x1 - T.x0 + 0.3, 0.14, T.z1 - T.z0 + 0.3, pal.woodBeam, V((T.x0 + T.x1) / 2, T.h1 + 0.1, (T.z0 + T.z1) / 2)));
    // 腰檐
    eaveRing(g, T.x0 - 0.12, T.x1 + 0.12, T.z0 - 0.12, T.z1 + 0.12, T.h1 + 0.52, 0.95, 0.62, 0.32, pal.roof, pal.woodBeam);
    // 腰檐与中层之间的平坐板
    const M = T.m, yy = T.h1 + 0.5;
    g.add(box(T.x1 - T.x0 + 0.24, 0.05, M.z0 - T.z0 + 0.12, pal.roof, V((T.x0 + T.x1) / 2, yy, (T.z0 + M.z0) / 2)));
    g.add(box(T.x1 - T.x0 + 0.24, 0.05, T.z1 - M.z1 + 0.12, pal.roof, V((T.x0 + T.x1) / 2, yy, (T.z1 + M.z1) / 2)));
    g.add(box(M.x0 - T.x0 + 0.12, 0.05, M.z1 - M.z0, pal.roof, V((T.x0 + M.x0) / 2, yy, (M.z0 + M.z1) / 2)));
    g.add(box(T.x1 - M.x1 + 0.12, 0.05, M.z1 - M.z0, pal.roof, V((T.x1 + M.x1) / 2, yy, (M.z0 + M.z1) / 2)));
    const b = bake(g);
    applyClip(b, clipA, cacheA);
    root.add(b);
    add('roofs', b);
  }

  // ---------------------------------------------------------------- 墙与窗
  const fadeGroups: THREE.Object3D[] = [];
  const latticePanel = (g: THREE.Group, cx: number, cy: number, cz: number, w: number, h: number, axis: 'x' | 'z') => {
    const t = 0.05;
    const along = (dx: number, dy: number) => (axis === 'z' ? V(cx + dx, cy + dy, cz) : V(cx, cy + dy, cz + dx));
    const sz = (a: number, b: number) => (axis === 'z' ? [a, b, t] : [t, b, a]);
    const [w1, h1, d1] = sz(w, 0.07);
    g.add(box(w1, h1, d1, latMat, along(0, h / 2)), box(w1, h1, d1, latMat, along(0, -h / 2)));
    const [w2, h2, d2] = sz(0.07, h);
    g.add(box(w2, h2, d2, latMat, along(-w / 2, 0)), box(w2, h2, d2, latMat, along(w / 2, 0)));
    const nx = Math.max(2, Math.round(w / 0.13)), ny = Math.max(2, Math.round(h / 0.13));
    for (let i = 1; i < nx; i++) { const [a, b, c] = sz(0.02, h); g.add(box(a, b, c, latMat, along(-w / 2 + (i * w) / nx, 0))); }
    for (let j = 1; j < ny; j++) { const [a, b, c] = sz(w, 0.02); g.add(box(a, b, c, latMat, along(0, -h / 2 + (j * h) / ny))); }
    // 窗纸（透出室内暖光）
    const [pw, ph, pd] = axis === 'z' ? [w, h, 0.01] : [0.01, h, w];
    g.add(box(pw, ph, pd, paper, along(0, 0).add(axis === 'z' ? V(0, 0, -0.015) : V(-0.015, 0, 0))));
  };
  const wallBay = (g: THREE.Group, a: number, b: number, fixed: number, axis: 'x' | 'z', y0: number, y1: number) => {
    // 一个开间：下为槛墙，上为格子窗，再上为照壁
    const mid = (a + b) / 2, w = Math.abs(b - a) - 0.24;
    const pos = (yc: number) => (axis === 'z' ? V(mid, yc, fixed) : V(fixed, yc, mid));
    const sz = (h: number, d: number) => (axis === 'z' ? [w + 0.04, h, d] : [d, h, w + 0.04]);
    const sill = 0.95;
    const [x1, h1, z1] = sz(sill, 0.14);
    g.add(box(x1, h1, z1, pal.lacquerDark, pos(y0 + sill / 2)));
    const winH = (y1 - y0) * 0.5;
    latticePanel(g, pos(0).x, y0 + sill + winH / 2 + 0.05, pos(0).z, w, winH, axis);
    const restH = y1 - (y0 + sill + winH + 0.1);
    const [x3, h3, z3] = sz(restH, 0.1);
    g.add(box(x3, h3, z3, wallMat, pos(y1 - restH / 2)));
  };
  // 东墙（遮住枢轮）——位于剖切面之外，剖开时消失
  {
    const g = new THREE.Group();
    const zs = [T.z0, -0.6, 1.0, T.z1];
    for (let i = 0; i < 3; i++) wallBay(g, zs[i], zs[i + 1], T.x1 + 0.02, 'x', 0.06, T.h1 - 0.42);
    const b = bake(g);
    applyClip(b, clipA, cacheA);
    root.add(b);
  }
  // 南面东段：随剖切淡出（用独立的材质副本，不影响其它墙体）
  {
    const g = new THREE.Group();
    wallBay(g, 1.15, T.x1, T.z1 + 0.02, 'z', 0.06, T.h1 - 0.42);
    const b = bake(g);
    applyClip(b, clipA, new Map());
    root.add(b);
    fadeGroups.push(b);
  }
  // 南面西段、西墙、北墙
  {
    const g = new THREE.Group();
    wallBay(g, T.x0, -1.95, T.z1 + 0.02, 'z', 0.06, T.h1 - 0.42);
    const zs = [T.z0, -0.6, 1.0, T.z1];
    for (let i = 0; i < 3; i++) wallBay(g, zs[i], zs[i + 1], T.x0 - 0.02, 'x', 0.06, T.h1 - 0.42);
    const xs = [T.x0, -1.95, -0.05, 1.15, T.x1];
    for (let i = 0; i < 4; i++) wallBay(g, xs[i], xs[i + 1], T.z0 - 0.02, 'z', 0.06, T.h1 - 0.42);
    root.add(bake(g));
  }

  // ---------------------------------------------------------------- 中层：浑象室（剖切 B：东侧与南侧）
  {
    const g = new THREE.Group();
    const M = T.m;
    const col = (x: number, z: number) => g.add(cyl(0.09, M.h - T.h1 - 0.5, pal.lacquer, 'y', 14, V(x, (M.h + T.h1) / 2 - 0.05, z)));
    for (const x of [M.x0, -0.25, M.x1]) { col(x, M.z0); col(x, M.z1); }
    col(M.x0, 0.05); col(M.x1, 0.05);
    const top = M.h - 0.38;
    g.add(box(M.x1 - M.x0 + 0.2, 0.16, 0.14, pal.lacquerDark, V((M.x0 + M.x1) / 2, top, M.z0)), box(M.x1 - M.x0 + 0.2, 0.16, 0.14, pal.lacquerDark, V((M.x0 + M.x1) / 2, top, M.z1)));
    g.add(box(0.14, 0.16, M.z1 - M.z0 + 0.2, pal.lacquerDark, V(M.x0, top, (M.z0 + M.z1) / 2)), box(0.14, 0.16, M.z1 - M.z0 + 0.2, pal.lacquerDark, V(M.x1, top, (M.z0 + M.z1) / 2)));
    for (let i = 0; i <= 7; i++) { const x = M.x0 + (i * (M.x1 - M.x0)) / 7; bracketSet(g, x, top + 0.16, M.z0, 0, -1, paintBlue, pal.woodBeam, 0.8); bracketSet(g, x, top + 0.16, M.z1, 0, 1, paintBlue, pal.woodBeam, 0.8); }
    for (let i = 1; i < 6; i++) { const z = M.z0 + (i * (M.z1 - M.z0)) / 6; bracketSet(g, M.x0, top + 0.16, z, -1, 0, paintBlue, pal.woodBeam, 0.8); bracketSet(g, M.x1, top + 0.16, z, 1, 0, paintBlue, pal.woodBeam, 0.8); }
    // 墙：四面
    for (const [a, b] of [[M.x0, -0.25], [-0.25, M.x1]] as [number, number][]) { wallBay(g, a, b, M.z1 + 0.02, 'z', T.h1 + 0.2, top - 0.1); wallBay(g, a, b, M.z0 - 0.02, 'z', T.h1 + 0.2, top - 0.1); }
    for (const [a, b] of [[M.z0, 0.05], [0.05, M.z1]] as [number, number][]) { wallBay(g, a, b, M.x1 + 0.02, 'x', T.h1 + 0.2, top - 0.1); wallBay(g, a, b, M.x0 - 0.02, 'x', T.h1 + 0.2, top - 0.1); }
    eaveRing(g, M.x0 - 0.1, M.x1 + 0.1, M.z0 - 0.1, M.z1 + 0.1, M.h - 0.02, 0.72, 0.4, 0.24, pal.roof, pal.woodBeam);
    const b = bake(g);
    applyClip(b, clipB, cacheB);
    root.add(b);
  }

  // ---------------------------------------------------------------- 顶层平台、勾栏与可开合的顶亭
  {
    const g = new THREE.Group();
    const M = T.m, P = T.top;
    g.add(box(P.x1 - P.x0, 0.14, P.z1 - P.z0, pal.woodFloor, V((P.x0 + P.x1) / 2, M.h - 0.07, (P.z0 + P.z1) / 2)));
    const rail = (a: THREE.Vector3, b: THREE.Vector3) => {
      g.add(beam(a.clone().setY(M.h + 0.56), b.clone().setY(M.h + 0.56), 0.07, 0.06, pal.lacquer));
      g.add(beam(a.clone().setY(M.h + 0.2), b.clone().setY(M.h + 0.2), 0.05, 0.05, pal.lacquer));
      const n = Math.round(a.distanceTo(b) / 0.42);
      for (let i = 0; i <= n; i++) {
        const p = a.clone().lerp(b, i / n);
        g.add(box(0.08, 0.66, 0.08, pal.lacquer, V(p.x, M.h + 0.3, p.z)));
        if (i < n) {
          const q = a.clone().lerp(b, (i + 0.5) / n);
          g.add(box(0.03, 0.26, 0.03, pal.gold, V(q.x, M.h + 0.38, q.z)));
        }
      }
    };
    const pc = [V(P.x0, 0, P.z0), V(P.x1, 0, P.z0), V(P.x1, 0, P.z1), V(P.x0, 0, P.z1)];
    for (let i = 0; i < 4; i++) rail(pc[i], pc[(i + 1) % 4]);
    // 顶亭：四柱、梁架；北半屋面板在位，南半已推开（浑仪观测时可开合的屋顶）
    const ax = sim.inst[1].spec.center;
    const y0 = M.h;
    const px0 = ax.x - 1.42, px1 = ax.x + 1.42, pz0 = ax.z - 1.42, pz1 = ax.z + 1.42;
    for (const x of [px0, px1]) for (const z of [pz0, pz1]) g.add(cyl(0.08, 3.0, pal.lacquer, 'y', 12, V(x, y0 + 1.5, z)));
    const yb = y0 + 2.95;
    g.add(box(px1 - px0 + 0.24, 0.16, 0.14, pal.lacquerDark, V(ax.x, yb, pz0)), box(px1 - px0 + 0.24, 0.16, 0.14, pal.lacquerDark, V(ax.x, yb, pz1)));
    g.add(box(0.14, 0.16, pz1 - pz0 + 0.24, pal.lacquerDark, V(px0, yb, ax.z)), box(0.14, 0.16, pz1 - pz0 + 0.24, pal.lacquerDark, V(px1, yb, ax.z)));
    g.add(box(px1 - px0 + 0.1, 0.05, 0.06, paint, V(ax.x, yb + 0.11, pz0)), box(px1 - px0 + 0.1, 0.05, 0.06, paint, V(ax.x, yb + 0.11, pz1)));
    // 屋脊与椽架
    const ridgeY = yb + 0.95;
    g.add(beam(V(px0 + 0.5, ridgeY, ax.z), V(px1 - 0.5, ridgeY, ax.z), 0.09, 0.12, pal.woodBeam));
    for (let i = 0; i <= 8; i++) {
      const x = px0 - 0.25 + (i * (px1 - px0 + 0.5)) / 8;
      g.add(rod(V(x, yb + 0.14, pz0 - 0.32), V(Math.min(px1 - 0.5, Math.max(px0 + 0.5, x)), ridgeY, ax.z), 0.022, pal.woodBeam, 5));
      g.add(rod(V(x, yb + 0.14, pz1 + 0.32), V(Math.min(px1 - 0.5, Math.max(px0 + 0.5, x)), ridgeY, ax.z), 0.022, pal.woodBeam, 5));
    }
    // 北坡屋面（在位）
    const roofN = new THREE.BufferGeometry();
    const rp = [V(px0 - 0.3, yb + 0.12, pz0 - 0.34), V(px1 + 0.3, yb + 0.12, pz0 - 0.34), V(px1 - 0.5, ridgeY + 0.04, ax.z), V(px0 + 0.5, ridgeY + 0.04, ax.z)];
    roofN.setAttribute('position', new THREE.Float32BufferAttribute([...rp[0].toArray(), ...rp[1].toArray(), ...rp[2].toArray(), ...rp[0].toArray(), ...rp[2].toArray(), ...rp[3].toArray()], 3));
    roofN.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 3, 0, 2.5, 1.4, 0, 0, 2.5, 1.4, 0.5, 1.4], 2));
    roofN.computeVertexNormals();
    const rn = mesh(roofN, pal.roof);
    g.add(rn);
    // 推开的屋面板：叠放在南侧檐口
    for (let i = 0; i < 4; i++) g.add(box(px1 - px0 + 0.4, 0.035, 0.36, pal.woodMech2, V(ax.x, yb + 0.12 + i * 0.04, pz1 + 0.2 - i * 0.05)));
    const b = bake(g);
    b.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) (m.material as THREE.Material).side = THREE.DoubleSide; });
    root.add(b);
    add('pavilion', b);
  }

  // ---------------------------------------------------------------- 浑象室：地柜、子午环、横轴轴承
  {
    const g = new THREE.Group();
    const gc = sim.inst[0].spec.center;
    const top = gc.y - 0.2;
    const hw = 0.95;
    g.add(box(hw * 2, 0.08, hw * 2, pal.woodMech2, V(gc.x, top, gc.z)));
    g.add(box(hw * 2 - 0.1, top - T.h1 - 0.2, 0.08, pal.lacquerDark, V(gc.x, (top + T.h1 + 0.2) / 2, gc.z + hw - 0.04)));
    g.add(box(0.08, top - T.h1 - 0.2, hw * 2 - 0.1, pal.lacquerDark, V(gc.x - hw + 0.04, (top + T.h1 + 0.2) / 2, gc.z)));
    g.add(box(hw * 2 - 0.1, top - T.h1 - 0.2, 0.08, pal.lacquerDark, V(gc.x, (top + T.h1 + 0.2) / 2, gc.z - hw + 0.04)));
    g.add(box(hw * 2 - 0.1, 0.05, 0.1, pal.gold, V(gc.x, top + 0.05, gc.z + hw - 0.04)));
    const P = new THREE.Vector3(POLAR.x, POLAR.y, POLAR.z);
    const mer = ring(0.86, 0.05, 0.05, pal.bronzeDark, 'x', 96);
    mer.position.set(gc.x, gc.y, gc.z);
    g.add(mer);
    g.add(cyl(0.05, 0.12, pal.bronze, 'y', 12, V(gc.x, gc.y, gc.z).addScaledVector(P, 0.95)));
    g.add(box(0.1, top - T.h1 - 0.1, 0.1, pal.woodBeam, V(gc.x, (top + T.h1) / 2, gc.z - 0.86)));
    const sh = sim.inst[0];
    g.add(box(0.12, sh.shaftY - T.h1 - 0.1, 0.12, pal.woodBeam, V(0.55, (sh.shaftY + T.h1) / 2 + 0.05, sh.shaftZ)));
    g.add(cyl(0.07, 0.1, pal.bronze, 'x', 12, V(0.55, sh.shaftY, sh.shaftZ)));
    root.add(bake(g));
    anchors.globeRoom = () => V(gc.x, gc.y + 0.9, gc.z);
  }

  // ---------------------------------------------------------------- 顶层浑仪座（六合仪：地平环、子午环、龙柱）
  {
    const g = new THREE.Group();
    const ac = sim.inst[1].spec.center;
    const y0 = T.m.h;
    const hz = ring(1.05, 0.08, 0.05, pal.bronzeDark, 'y', 128);
    hz.position.set(ac.x, ac.y, ac.z);
    g.add(hz);
    const mer = ring(1.0, 0.06, 0.06, pal.bronzeDark, 'x', 128);
    mer.position.set(ac.x, ac.y, ac.z);
    g.add(mer);
    g.add(box(2.4, 0.16, 0.24, pal.bronzeDark, V(ac.x, y0 + 0.1, ac.z)), box(0.24, 0.16, 2.4, pal.bronzeDark, V(ac.x, y0 + 0.1, ac.z)));
    for (const [dx, dz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const base = V(ac.x + dx * 0.78, y0 + 0.15, ac.z + dz * 0.78);
      const topP = V(ac.x + dx * 0.74, ac.y - 0.02, ac.z + dz * 0.74);
      g.add(rod(base, topP, 0.06, pal.bronzeDark, 10, 0.045));
    }
    g.add(rod(V(ac.x, y0 + 0.15, ac.z), V(ac.x, ac.y - 1.0, ac.z), 0.09, pal.bronzeDark, 12, 0.12));
    const sh = sim.inst[1];
    g.add(box(0.12, sh.shaftY - y0, 0.12, pal.woodBeam, V(0.55, (sh.shaftY + y0) / 2, sh.shaftZ)));
    g.add(cyl(0.07, 0.1, pal.bronze, 'x', 12, V(0.55, sh.shaftY, sh.shaftZ)));
    // 天柱顶部与传动的护箱（只露出横轴）
    g.add(box(0.95, 0.75, 0.9, pal.lacquerDark, V(0.42, y0 + 0.38, DRV.tz.z)));
    g.add(box(0.99, 0.06, 0.94, paint, V(0.42, y0 + 0.78, DRV.tz.z)));
    root.add(bake(g));
    anchors.armRoom = () => V(ac.x, ac.y + 1.2, ac.z);
  }

  // ---------------------------------------------------------------- 水：天池、平水壶、渴乌、退水壶
  const waterSurfaces: THREE.Object3D[] = [];
  {
    const g = new THREE.Group();
    const geo = sim.esc.geo;
    const pw = WATER_TANKS.ping;
    const pc = wp(pw.u, pw.v, 0);
    const tankMat = pal.bronzeDark;
    g.add(box(0.06, pw.h, pw.d, tankMat, V(pc.x - pw.wd / 2, pc.y, pc.z)), box(0.06, pw.h, pw.d, tankMat, V(pc.x + pw.wd / 2, pc.y, pc.z)));
    g.add(box(pw.wd, pw.h, 0.06, tankMat, V(pc.x, pc.y, pc.z - pw.d / 2)), box(pw.wd, pw.h, 0.06, tankMat, V(pc.x, pc.y, pc.z + pw.d / 2)));
    g.add(box(pw.wd, 0.06, pw.d, tankMat, V(pc.x, pc.y - pw.h / 2, pc.z)));
    g.add(box(pw.wd + 0.06, 0.04, pw.d + 0.06, pal.gold, V(pc.x, pc.y + pw.h / 2, pc.z)));
    const tw = WATER_TANKS.tian;
    const tc = wp(tw.u, tw.v, 0);
    g.add(box(0.08, tw.h, tw.d, pal.woodMech2, V(tc.x - tw.wd / 2, tc.y, tc.z)), box(0.08, tw.h, tw.d, pal.woodMech2, V(tc.x + tw.wd / 2, tc.y, tc.z)));
    g.add(box(tw.wd, tw.h, 0.08, pal.woodMech2, V(tc.x, tc.y, tc.z - tw.d / 2)), box(tw.wd, tw.h, 0.08, pal.woodMech2, V(tc.x, tc.y, tc.z + tw.d / 2)));
    g.add(box(tw.wd, 0.08, tw.d, pal.woodMech2, V(tc.x, tc.y - tw.h / 2, tc.z)));
    for (const dy of [-0.2, 0.2]) g.add(box(tw.wd + 0.04, 0.035, tw.d + 0.04, pal.iron, V(tc.x, tc.y + dy, tc.z)));
    g.add(box(0.1, tc.y - tw.h / 2, 0.1, pal.woodBeam, V(tc.x, (tc.y - tw.h / 2) / 2, tc.z - tw.d / 2 + 0.1)));
    g.add(box(0.1, tc.y - tw.h / 2, 0.1, pal.woodBeam, V(tc.x, (tc.y - tw.h / 2) / 2, tc.z + tw.d / 2 - 0.1)));
    // 平水壶由顶梁吊起（不穿过枢轮）
    for (const dz of [-pw.d / 2 + 0.04, pw.d / 2 - 0.04]) g.add(rod(V(pc.x, pc.y + pw.h / 2, pc.z + dz), V(pc.x, T.h1 - 0.42, pc.z + dz), 0.018, pal.iron, 6));
    g.add(box(0.12, 0.12, pw.d + 0.3, pal.woodBeam, V(pc.x, T.h1 - 0.42, pc.z)));
    const tOut = wp(WATER_TANKS.tianOut[0], WATER_TANKS.tianOut[1], 0);
    g.add(rod(wp(tw.u - tw.d / 2 + 0.05, WATER_TANKS.tianOut[1], 0), tOut, 0.032, pal.bronze, 10));
    g.add(cyl(0.042, 0.06, pal.bronze, 'y', 10, tOut.clone().setY(tOut.y - 0.02)));
    const sp = geo.spout;
    const curve = new THREE.CatmullRomCurve3([
      wp(pw.u - 0.08, pw.v - 0.05, 0), wp(pw.u - 0.08, pw.v + pw.h / 2 + 0.14, 0), wp((pw.u + sp[0]) / 2 + 0.1, pw.v + pw.h / 2 + 0.22, 0),
      wp(sp[0] + 0.12, sp[1] + 0.14, 0), wp(sp[0], sp[1] + 0.06, 0), wp(sp[0], sp[1] + 0.005, 0),
    ]);
    g.add(mesh(new THREE.TubeGeometry(curve, 48, 0.028, 10, false), pal.bronze));
    g.add(cyl(0.038, 0.05, pal.bronze, 'y', 12, wp(sp[0], sp[1] + 0.02, 0)));
    const ov = WATER_TANKS.overflow;
    g.add(rod(wp(pw.u + pw.d / 2 - 0.02, ov[1] + 0.02, 0), wp(ov[0], ov[1] + 0.02, 0), 0.028, pal.bronze, 8));
    const sx0 = 0.2, sx1 = 2.35, sv = WATER.sumpV;
    const s0 = wp(sx0, sv - 0.12, 0), s1 = wp(sx1, sv - 0.12, 0);
    const len = s0.distanceTo(s1);
    const cz = (s0.z + s1.z) / 2;
    g.add(box(0.7, 0.06, len, pal.woodMech2, V(s0.x, s0.y - 0.1, cz)));
    g.add(box(0.06, 0.32, len, pal.woodMech2, V(s0.x - 0.35, s0.y + 0.04, cz)), box(0.06, 0.32, len, pal.woodMech2, V(s0.x + 0.35, s0.y + 0.04, cz)));
    g.add(box(0.7, 0.32, 0.06, pal.woodMech2, V(s0.x, s0.y + 0.04, s0.z + 0.03)), box(0.7, 0.32, 0.06, pal.woodMech2, V(s0.x, s0.y + 0.04, s1.z - 0.03)));
    const tanksBaked = bake(g);
    root.add(tanksBaked);
    add('tanks', tanksBaked);
    const surf = (cx: number, cy: number, cz2: number, w: number, d: number) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pal.waterSurface);
      m.rotation.x = -Math.PI / 2;
      m.position.set(cx, cy, cz2);
      root.add(m);
      waterSurfaces.push(m);
      return m;
    };
    surf(pc.x, ESC.origin.y + WATER_TANKS.pingLevel, pc.z, pw.wd - 0.06, pw.d - 0.06);
    surf(tc.x, tc.y + tw.h / 2 - 0.12, tc.z, tw.wd - 0.08, tw.d - 0.08);
    surf(s0.x, ESC.origin.y + sv, cz, 0.62, len - 0.08);
    for (const s of waterSurfaces) add('waterSurfaces', s);
    anchors.ping = () => pc.clone().add(V(0.0, pw.h / 2 + 0.02, 0.12));
    anchors.tian = () => tc.clone().add(V(0.0, tw.h / 2 + 0.02, 0.2));
    anchors.spout = () => wp(sp[0] + 0.02, sp[1] + 0.12, 0);
    anchors.sump = () => V(s0.x, ESC.origin.y + sv + 0.1, cz);
  }

  // ---------------------------------------------------------------- 轴承、支架、导轨
  {
    const g = new THREE.Group();
    const o = ESC.origin;
    // 枢轴轴承（在枢轮与地毂之间，不挡正面视线）
    g.add(box(0.2, o.y + 0.05, 0.26, pal.woodBeam, V(o.x - 0.75, (o.y - 0.05) / 2 + 0.05, o.z)));
    g.add(cyl(0.13, 0.2, pal.bronze, 'x', 16, V(o.x - 0.75, o.y, o.z)));
    g.add(box(0.2, 0.2, 1.4, pal.woodBeam, V(o.x - 0.75, 0.16, o.z)));
    const topY = T.h1 - 0.5;
    // 格叉支点：吊架从顶梁垂下
    const Q = wp(ESC.Q[0], ESC.Q[1], ESC.forkW + 0.12);
    g.add(box(0.07, topY - Q.y, 0.08, pal.woodBeam, V(Q.x, (topY + Q.y) / 2, Q.z)));
    g.add(cyl(0.032, 0.24, pal.iron, 'x', 10, V(Q.x - 0.1, Q.y, Q.z)));
    g.add(box(0.14, 0.16, 0.5, pal.woodBeam, V(Q.x, topY, Q.z)));
    const U = wp(ESC.U[0], ESC.U[1], ESC.lockW + 0.12);
    g.add(box(0.08, topY - U.y, 0.08, pal.woodBeam, V(U.x, (topY + U.y) / 2, U.z)));
    g.add(cyl(0.028, 0.24, pal.iron, 'x', 10, V(U.x - 0.1, U.y, U.z)));
    const lg = sim.esc.geo;
    const l0 = wp(lg.lockOrigin[0], lg.lockBottom[1] + 0.12, ESC.lockW);
    for (const du of [-0.045, 0.045]) {
      const p = wp(lg.lockOrigin[0] + du, 0, ESC.lockW);
      g.add(box(0.12, topY - l0.y, 0.02, pal.woodBeam, V(p.x, (topY + l0.y) / 2, p.z)));
    }
    for (const pg of lg.pawls) {
      const p = wp(pg.pivot[0], pg.pivot[1], ESC.lockW + 0.1);
      g.add(box(0.06, topY - p.y, 0.06, pal.woodBeam, V(p.x, (topY + p.y) / 2, p.z)));
    }
    g.add(box(0.14, 0.16, 4.2, pal.woodBeam, V(o.x + 0.38, topY, o.z - 0.4)));
    for (const y of [0.3, 3.2, 5.6, 8.4, 9.6]) {
      g.add(cyl(0.12, 0.08, pal.bronze, 'y', 12, V(DRV.tz.x, y, DRV.tz.z)));
      if (y < 6) g.add(box(0.1, 0.1, 2.2, pal.woodBeam, V(DRV.tz.x, y, DRV.tz.z - 1.1)));
    }
    g.add(cyl(0.11, 0.08, pal.bronze, 'y', 12, V(DRV.jl.x, DRV.jlY0, DRV.jl.z)));
    g.add(cyl(0.11, 0.08, pal.bronze, 'y', 12, V(DRV.jl.x, DRV.jlY1, DRV.jl.z)));
    g.add(box(0.1, 0.1, 1.0, pal.woodBeam, V(DRV.jl.x, DRV.jlY1, DRV.jl.z + 0.5)));
    root.add(bake(g));
  }

  // ---------------------------------------------------------------- 木阁：五层报时楼阁（正立面）
  {
    const g = new THREE.Group();
    const fz = DRV.facadeZ;
    const xc = DRV.jl.x, half = 1.22;
    const x0 = xc - half, x1 = xc + half;
    const tiers = [5.62, 4.6, 3.58, 2.56, 1.54, 0.5];
    for (let k = 0; k < 5; k++) {
      const yt = tiers[k], yb = tiers[k + 1];
      for (const x of [x0, xc - 0.42, xc + 0.42, x1]) g.add(cyl(0.045, yt - yb, pal.lacquer, 'y', 10, V(x, (yt + yb) / 2, fz + 0.05)));
      // 每层小檐（带椽头）
      g.add(box(x1 - x0 + 0.42, 0.04, 0.34, pal.roof, V(xc, yt + 0.02, fz + 0.2)));
      g.add(box(x1 - x0 + 0.3, 0.08, 0.08, pal.lacquerDark, V(xc, yt - 0.08, fz + 0.06)));
      g.add(box(x1 - x0 + 0.3, 0.04, 0.06, paint, V(xc, yt - 0.14, fz + 0.07)));
      for (let i = 0; i <= 22; i++) g.add(box(0.035, 0.035, 0.3, pal.woodBeam, V(x0 - 0.15 + (i * (x1 - x0 + 0.3)) / 22, yt - 0.02, fz + 0.18)));
      const doorY = (yb + yt) / 2 - 0.05;
      for (const [cx, w] of [[xc - 0.82, 0.62], [xc, 0.7], [xc + 0.82, 0.62]] as [number, number][]) {
        const isCenter = Math.abs(cx - xc) < 0.01;
        if (k === 0) continue; // 第一层三门洞开，木人立于门前
        if (k === 1 && isCenter) {
          // 司辰窗：一个小窗洞，木人持牌在其后经过（从正面镜头的俯角看过去，窗口对准时辰牌与头部）
          const top = yt - 0.16, bot = yb + 0.02;
          const wy0 = DRV.disc2Y + 0.15, wy1 = Math.min(top - 0.02, DRV.disc2Y + 0.57), whw = 0.16;
          g.add(box(w, top - wy1, 0.05, pal.lacquerDark, V(cx, (top + wy1) / 2, fz)));
          g.add(box(w, wy0 - bot, 0.05, pal.lacquerDark, V(cx, (wy0 + bot) / 2, fz)));
          for (const sx of [-1, 1]) g.add(box(w / 2 - whw, wy1 - wy0, 0.05, pal.lacquerDark, V(cx + sx * (w / 2 + whw) / 2, (wy0 + wy1) / 2, fz)));
          g.add(box(2 * whw + 0.06, 0.04, 0.07, pal.gold, V(cx, wy1 + 0.02, fz + 0.03)), box(2 * whw + 0.06, 0.04, 0.07, pal.gold, V(cx, wy0 - 0.02, fz + 0.03)));
          continue;
        }
        g.add(box(w, yt - yb - 0.32, 0.04, pal.lacquerDark, V(cx, doorY, fz)));
        // 格子门
        const nx = 4, ny = 5, ww = w - 0.12, hh = (yt - yb - 0.32) * 0.55;
        for (let i = 0; i <= nx; i++) g.add(box(0.018, hh, 0.02, pal.gold, V(cx - ww / 2 + (i * ww) / nx, doorY + 0.12, fz + 0.025)));
        for (let j = 0; j <= ny; j++) g.add(box(ww, 0.018, 0.02, pal.gold, V(cx, doorY + 0.12 - hh / 2 + (j * hh) / ny, fz + 0.025)));
      }
      g.add(box(x1 - x0, 0.05, 0.25, pal.woodBeam, V(xc, yb + 0.02, fz + 0.12)));
    }
    g.add(box(x1 - x0 + 0.1, 0.06, 0.62, pal.woodBeam, V(xc, 4.6, fz + 0.31)));
    for (let i = 0; i <= 14; i++) g.add(box(0.03, 0.2, 0.03, pal.lacquer, V(x0 + (i * (x1 - x0)) / 14, 4.72, fz + 0.6)));
    g.add(box(x1 - x0, 0.035, 0.035, pal.lacquer, V(xc, 4.82, fz + 0.6)));
    // 顶檐
    eaveRing(g, x0 - 0.05, x1 + 0.05, fz - 0.62, fz + 0.12, 5.7, 0.32, 0.18, 0.1, pal.roof, pal.woodBeam);
    const b = bake(g);
    root.add(b);
    add('mugo', b);
    anchors.mugo = () => V(x1 + 0.1, 5.3, fz + 0.2);
    anchors.window = () => V(xc + 0.2, tiers[1] - 0.5, fz + 0.06);
  }

  // ---------------------------------------------------------------- 木人身体（静止）、鼓、钟架
  {
    const g = new THREE.Group();
    const ds = LEVERS[0], bs = LEVERS[1];
    const drummer = makeFigure(pal, pal.robeGreen, 0.62);
    drummer.position.set(ds.pivot[0] - 0.04, 4.63, DRV.armZ - 0.07);
    drummer.rotation.y = 0.15;
    g.add(drummer);
    const ringer = makeFigure(pal, pal.robePurple, 0.62);
    ringer.position.set(bs.pivot[0] + 0.06, 4.63, DRV.armZ - 0.09);
    ringer.rotation.y = -0.2;
    g.add(ringer);
    const dt = sim.drv.drumTop;
    g.add(cyl(0.13, 0.12, pal.lacquer, 'y', 24, V(dt.x, dt.y - 0.06, dt.z)));
    g.add(cyl(0.125, 0.012, pal.drumSkin, 'y', 24, V(dt.x, dt.y - 0.004, dt.z)));
    g.add(torus(0.13, 0.008, pal.gold, 'y', 32).translateX(dt.x).translateY(dt.y - 0.02).translateZ(dt.z));
    for (const a of [0, 2.1, 4.2]) g.add(rod(V(dt.x + 0.11 * Math.cos(a), dt.y - 0.12, dt.z + 0.11 * Math.sin(a)), V(dt.x + 0.14 * Math.cos(a), 4.63, dt.z + 0.14 * Math.sin(a)), 0.012, pal.woodBeam, 6));
    const bp = sim.drv.bellPivot;
    g.add(beam(V(bp.x - 0.16, bp.y + 0.03, bp.z), V(bp.x + 0.16, bp.y + 0.03, bp.z), 0.04, 0.04, pal.lacquerDark));
    g.add(rod(V(bp.x + 0.15, bp.y + 0.03, bp.z), V(bp.x + 0.15, 4.63, bp.z), 0.018, pal.lacquerDark, 8));
    g.add(rod(V(bp.x - 0.15, bp.y + 0.03, bp.z), V(bp.x - 0.15, 4.63, bp.z), 0.018, pal.lacquerDark, 8));
    root.add(bake(g));
    anchors.drum = () => V(dt.x, dt.y + 0.02, dt.z);
    anchors.drummer = () => V(ds.pivot[0] - 0.06, 5.22, DRV.armZ);
  }

  const setCut = (k: number) => {
    const e = k * k * (3 - 2 * k);
    clipA[0].constant = 4.4 + (T.cutA - 4.4) * e;
    clipB[0].constant = 3.0 + (T.cutBx - 3.0) * e;
    clipB[1].constant = 3.0 + (T.cutBz - 3.0) * e;
    const op = 1 - Math.min(1, k * 1.4);
    for (const f of fadeGroups) {
      f.visible = op > 0.02;
      f.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { const mm = m.material as THREE.Material; mm.transparent = true; mm.opacity = op; mm.depthWrite = op > 0.95; } });
    }
  };
  return { root, parts, anchors, setCut };
}

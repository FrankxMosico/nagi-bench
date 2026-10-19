// 仪象台的建筑：石台基、木构架、楼板、木阁（报时楼）立面、腰檐、屋顶与栏杆。
// 为便于观看内部机构，左侧与前左侧做成剖开的“剖面模型”。
import * as THREE from "three";
import { Builder, type V3 } from "./builder";
import { litMat, type Materials } from "./materials";
import { derived } from "../physics/machine";

const D = derived();

export const TOWER = {
  x0: -3.3, x1: 2.7, z0: -3.1, z1: 2.9,
  floor1: 5.6, floor2: 8.8,
  facadeZ: 2.55, facadeX0: -0.15,
};

/** 由四边形条带生成网格；expect 为期望的大致法线方向，用来确定绕序 */
function strip(rows: [number, number, number][][], expect: THREE.Vector3, uvScale = 1) {
  const pos: number[] = [];
  const uv: number[] = [];
  const n = rows[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < rows.length; j++) {
      pos.push(...rows[j][i]);
      uv.push(i * uvScale * 0.12, j * uvScale);
    }
  }
  const idx: number[] = [];
  const R = rows.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < R - 1; j++) {
      const a = i * R + j, b = (i + 1) * R + j, c = i * R + j + 1, d = (i + 1) * R + j + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  // 检查第一个三角形法线方向
  const p = (k: number) => new THREE.Vector3(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);
  const nrm = new THREE.Vector3().crossVectors(p(idx[1]).sub(p(idx[0])), p(idx[2]).sub(p(idx[0])));
  if (nrm.dot(expect) < 0) for (let k = 0; k < idx.length; k += 3) { const t = idx[k]; idx[k] = idx[k + 1]; idx[k + 1] = t; }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** 带起翘与厚度的单坡檐（沿一条边）：瓦面、檐底、檐口封板 */
function eave(b: Builder, top: THREE.Material, under: THREE.Material, edge: THREE.Material, a: V3, c: V3, out: V3, drop: number, depth: number) {
  const segs = 14, th = 0.12;
  const root: [number, number, number][] = [], tip: [number, number, number][] = [];
  const rootB: [number, number, number][] = [], tipB: [number, number, number][] = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const e = Math.pow(Math.abs(t - 0.5) * 2, 3);
    const lift = e * 0.3; // 两端起翘
    const ext = depth + e * 0.28;
    const bx = a[0] + (c[0] - a[0]) * t, by = a[1] + (c[1] - a[1]) * t, bz = a[2] + (c[2] - a[2]) * t;
    const tx = bx + out[0] * ext, ty = by - drop + lift, tz = bz + out[2] * ext;
    root.push([bx, by, bz]);
    tip.push([tx, ty, tz]);
    rootB.push([bx, by - th, bz]);
    tipB.push([tx, ty - th * 0.6, tz]);
  }
  const o = new THREE.Vector3(out[0], 0, out[2]);
  b.add(strip([root, tip], new THREE.Vector3(0, 1, 0).add(o.clone().multiplyScalar(0.3)), 2), top);
  b.add(strip([rootB, tipB], new THREE.Vector3(0, -1, 0)), under);
  b.add(strip([tip, tipB], o), edge);
}

export function buildTower(mats: Materials) {
  const M = mats;
  const T = TOWER;
  const b = new Builder();
  const roofMat = M.roof;
  const col = M.lacquer;
  const beamMat = M.woodDark;

  // ---------------------------------------------------------------- 台基与台阶
  const px0 = T.x0 - 1.4, px1 = T.x1 + 1.0, pz0 = T.z0 - 3.9, pz1 = T.z1 + 1.0;
  b.box([px1 - px0, 0.62, pz1 - pz0], M.stone, [(px0 + px1) / 2, -0.31, (pz0 + pz1) / 2]);
  b.box([px1 - px0 + 0.12, 0.08, pz1 - pz0 + 0.12], M.woodDark, [(px0 + px1) / 2, -0.04, (pz0 + pz1) / 2]);
  for (let i = 0; i < 3; i++) {
    b.box([2.4, 0.2, 0.35], M.stone, [0.8, -0.1 - i * 0.2 - 0.1, pz1 + 0.18 + i * 0.35]);
  }
  // 室内地面（木地板）
  b.box([T.x1 - T.x0, 0.04, T.z1 - T.z0], M.woodMid, [(T.x0 + T.x1) / 2, 0.02, (T.z0 + T.z1) / 2]);

  // ---------------------------------------------------------------- 柱
  const colsLower: [number, number][] = [
    [T.x0, T.z0], [-0.3, T.z0], [T.x1, T.z0],
    [T.x1, -0.1], [T.x1, T.z1], [-0.3, T.z1], [T.x0, T.z1],
  ];
  for (const [x, z] of colsLower) {
    b.add(new THREE.CylinderGeometry(0.15, 0.17, T.floor2, 12), col, [x, T.floor2 / 2, z]);
    b.add(new THREE.CylinderGeometry(0.24, 0.26, 0.16, 12), M.stone, [x, 0.08, z]);
  }
  // 额枋（楼层处的横梁）
  const ring = (y: number, h: number, mat: THREE.Material) => {
    b.box([T.x1 - T.x0 + 0.3, h, 0.2], mat, [(T.x0 + T.x1) / 2, y, T.z0]);
    b.box([T.x1 - T.x0 + 0.3, h, 0.2], mat, [(T.x0 + T.x1) / 2, y, T.z1]);
    b.box([0.2, h, T.z1 - T.z0 + 0.3], mat, [T.x0, y, (T.z0 + T.z1) / 2]);
    b.box([0.2, h, T.z1 - T.z0 + 0.3], mat, [T.x1, y, (T.z0 + T.z1) / 2]);
  };
  ring(T.floor1 - 0.12, 0.26, beamMat);
  ring(T.floor2 - 0.12, 0.26, beamMat);
  // 斗拱（简化为一排小木块）
  for (const y of [T.floor1 + 0.05, T.floor2 + 0.05]) {
    for (let x = T.x0; x <= T.x1 + 0.01; x += 0.5) {
      b.box([0.18, 0.12, 0.3], M.jade, [x, y, T.z1 + 0.05]);
      b.box([0.18, 0.12, 0.3], M.jade, [x, y, T.z0 - 0.05]);
    }
    for (let z = T.z0; z <= T.z1 + 0.01; z += 0.5) {
      b.box([0.3, 0.12, 0.18], M.jade, [T.x1 + 0.05, y, z]);
      b.box([0.3, 0.12, 0.18], M.jade, [T.x0 - 0.05, y, z]);
    }
  }

  // ---------------------------------------------------------------- 楼板（留出天柱孔）
  const slab = (y: number, holes: { x0: number; x1: number; z0: number; z1: number }[]) => {
    // 用矩形拼出带孔楼板：按 x 切条
    const xs = new Set<number>([T.x0, T.x1]);
    for (const h of holes) { xs.add(h.x0); xs.add(h.x1); }
    const xl = [...xs].sort((a, c) => a - c);
    for (let i = 0; i < xl.length - 1; i++) {
      const xa = xl[i], xb = xl[i + 1], xm = (xa + xb) / 2;
      const zs = [T.z0];
      const inside = holes.filter((h) => xm > h.x0 && xm < h.x1).sort((a, c) => a.z0 - c.z0);
      const segs: [number, number][] = [];
      let z = T.z0;
      for (const h of inside) { segs.push([z, h.z0]); z = h.z1; }
      segs.push([z, T.z1]);
      void zs;
      for (const [za, zb] of segs) if (zb - za > 0.01) b.box([xb - xa, 0.18, zb - za], M.woodMid, [xm, y + 0.09, (za + zb) / 2]);
    }
  };
  const tz = D.tianzhu;
  slab(T.floor1, [
    { x0: tz.x - 0.35, x1: tz.x + 0.35, z0: tz.z - 0.35, z1: tz.z + 0.35 },
  ]);
  slab(T.floor2, [
    { x0: tz.x - 0.35, x1: tz.x + 0.35, z0: tz.z - 0.35, z1: tz.z + 0.35 },
  ]);

  // ---------------------------------------------------------------- 墙：后墙、右墙（格子窗），前右为木阁立面
  // 格子窗：深色木格 + 外侧透光的窗纸（室内灯光映出的暖色）
  const paper = litMat({ color: "#4a3a2a", emissive: "#a8692c", emissiveIntensity: 0.16, roughness: 1 });
  const lattice = (x0: number, x1: number, y0: number, y1: number, z: number, axis: "x" | "z", outward: number) => {
    const n = Math.max(2, Math.round((x1 - x0) / 0.26));
    for (let i = 0; i <= n; i++) {
      const t = x0 + ((x1 - x0) * i) / n;
      if (axis === "x") b.box([0.03, y1 - y0, 0.04], M.woodDark, [t, (y0 + y1) / 2, z]);
      else b.box([0.04, y1 - y0, 0.03], M.woodDark, [z, (y0 + y1) / 2, t]);
    }
    const m = Math.max(2, Math.round((y1 - y0) / 0.26));
    for (let j = 0; j <= m; j++) {
      const y = y0 + ((y1 - y0) * j) / m;
      if (axis === "x") b.box([x1 - x0, 0.03, 0.04], M.woodDark, [(x0 + x1) / 2, y, z]);
      else b.box([0.04, 0.03, x1 - x0], M.woodDark, [z, y, (x0 + x1) / 2]);
    }
    if (axis === "x") b.box([x1 - x0, y1 - y0, 0.01], paper, [(x0 + x1) / 2, (y0 + y1) / 2, z + outward * 0.03]);
    else b.box([0.01, y1 - y0, x1 - x0], paper, [z + outward * 0.03, (y0 + y1) / 2, (x0 + x1) / 2]);
  };
  // 后墙下半为木板、上半格窗
  b.box([T.x1 - T.x0, 1.4, 0.08], M.woodDark, [(T.x0 + T.x1) / 2, 0.7, T.z0 + 0.02]);
  lattice(T.x0 + 0.15, T.x1 - 0.15, 1.4, T.floor1 - 0.25, T.z0 + 0.02, "x", -1);
  b.box([T.x1 - T.x0, T.floor2 - T.floor1 - 0.3, 0.06], M.woodDark, [(T.x0 + T.x1) / 2, (T.floor1 + T.floor2) / 2, T.z0 + 0.02]);
  // 右墙
  b.box([0.08, 1.4, T.z1 - T.z0], M.woodDark, [T.x1 - 0.02, 0.7, (T.z0 + T.z1) / 2]);
  lattice(T.z0 + 0.15, T.z1 - 0.15, 1.4, T.floor1 - 0.25, T.x1 - 0.02, "z", 1);
  lattice(T.z0 + 0.15, T.z1 - 0.15, T.floor1 + 0.4, T.floor2 - 0.3, T.x1 - 0.02, "z", 1);

  // ---------------------------------------------------------------- 木阁（报时楼）立面：五层
  {
    const z = T.facadeZ, x0 = T.facadeX0, x1 = T.x1 - 0.1;
    const levels = [0.55, 1.9, 2.95, 3.85, 4.6, T.floor1 - 0.15];
    // 一层为开敞的回廊（击鼓、敲钟木人在此）
    b.box([x1 - x0, 0.1, 0.5], M.woodMid, [(x0 + x1) / 2, levels[0] - 0.05, z - 0.1]);
    b.box([x1 - x0, 0.12, 0.16], M.lacquer, [(x0 + x1) / 2, levels[1] - 0.06, z]);
    for (const x of [x0, 0.15, 1.15, 2.15, x1]) b.box([0.12, levels[1] - levels[0], 0.12], M.lacquer, [x, (levels[0] + levels[1]) / 2, z]);
    // 二层以上为墙板，二层中间开时辰牌窗
    const winX = D.jilun.x, winW = 0.44;
    for (let i = 1; i < levels.length - 1; i++) {
      const ya = levels[i], yb = levels[i + 1];
      const h = yb - ya;
      if (i === 1) {
        b.box([winX - winW / 2 - x0, h, 0.06], M.woodDark, [(x0 + winX - winW / 2) / 2, (ya + yb) / 2, z]);
        b.box([x1 - (winX + winW / 2), h, 0.06], M.woodDark, [(winX + winW / 2 + x1) / 2, (ya + yb) / 2, z]);
        b.box([winW + 0.12, 0.08, 0.1], M.gold, [winX, ya + 0.04, z + 0.02]);
        b.box([winW + 0.12, 0.08, 0.1], M.gold, [winX, yb - 0.04, z + 0.02]);
        for (const s of [-1, 1]) b.box([0.06, h, 0.1], M.gold, [winX + s * (winW / 2 + 0.03), (ya + yb) / 2, z + 0.02]);
      } else {
        b.box([x1 - x0, h, 0.06], M.woodDark, [(x0 + x1) / 2, (ya + yb) / 2, z]);
        // 小门窗装饰
        const n = 3;
        for (let k = 0; k < n; k++) {
          const cx = x0 + ((k + 0.5) / n) * (x1 - x0);
          b.box([0.42, h * 0.6, 0.03], M.lacquer, [cx, (ya + yb) / 2, z + 0.04]);
          b.box([0.3, h * 0.45, 0.03], M.paper, [cx, (ya + yb) / 2, z + 0.055]);
        }
      }
      // 每层的小檐
      b.box([x1 - x0 + 0.1, 0.06, 0.22], M.lacquer, [(x0 + x1) / 2, yb - 0.03, z + 0.12]);
      eave(b, roofMat, M.woodDark, M.lacquer, [x0 - 0.05, yb + 0.02, z + 0.04], [x1 + 0.05, yb + 0.02, z + 0.04], [0, 0, 1], 0.16, 0.36);
    }
    // 木阁两侧
    b.box([0.08, T.floor1 - levels[1], 0.6], M.woodDark, [x0, (levels[1] + T.floor1) / 2, z - 0.3]);
    // 匾额
    b.box([1.0, 0.36, 0.06], M.lacquer, [1.3, 4.25, z + 0.06]);
    b.box([0.9, 0.28, 0.02], M.gold, [1.3, 4.25, z + 0.1]);
  }

  // ---------------------------------------------------------------- 腰檐与顶层
  const eaveRing = (y: number, depth: number, drop: number, skip: string[] = []) => {
    const e = 0.15;
    if (!skip.includes("front")) eave(b, roofMat, M.woodDark, M.lacquer, [T.x0 - e, y, T.z1 + e], [T.x1 + e, y, T.z1 + e], [0, 0, 1], drop, depth);
    if (!skip.includes("back")) eave(b, roofMat, M.woodDark, M.lacquer, [T.x1 + e, y, T.z0 - e], [T.x0 - e, y, T.z0 - e], [0, 0, -1], drop, depth);
    if (!skip.includes("right")) eave(b, roofMat, M.woodDark, M.lacquer, [T.x1 + e, y, T.z1 + e], [T.x1 + e, y, T.z0 - e], [1, 0, 0], drop, depth);
    if (!skip.includes("left")) eave(b, roofMat, M.woodDark, M.lacquer, [T.x0 - e, y, T.z0 - e], [T.x0 - e, y, T.z1 + e], [-1, 0, 0], drop, depth);
  };
  eaveRing(T.floor1 + 0.3, 0.95, 0.45);
  eaveRing(T.floor2 + 0.3, 0.95, 0.45);

  // 顶层平台栏杆
  {
    const y = T.floor2 + 0.18;
    const rail = (a: V3, c: V3) => {
      b.beam([a[0], y + 0.55, a[2]], [c[0], y + 0.55, c[2]], 0.07, 0.07, M.lacquer);
      b.beam([a[0], y + 0.15, a[2]], [c[0], y + 0.15, c[2]], 0.05, 0.05, M.lacquer);
      const len = Math.hypot(c[0] - a[0], c[2] - a[2]);
      const n = Math.round(len / 0.4);
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        b.box([0.06, 0.6, 0.06], M.lacquer, [a[0] + (c[0] - a[0]) * t, y + 0.3, a[2] + (c[2] - a[2]) * t]);
      }
    };
    rail([T.x0, 0, T.z1], [T.x1, 0, T.z1]);
    rail([T.x0, 0, T.z0], [T.x1, 0, T.z0]);
    rail([T.x0, 0, T.z0], [T.x0, 0, T.z1]);
    rail([T.x1, 0, T.z0], [T.x1, 0, T.z1]);
  }
  // 顶层屋顶（可拆卸的板屋，此处为四柱攒尖顶，抬高以露出浑仪）
  {
    const ac = D.armCenter;
    const cx = ac.x, cz = ac.z, hw = 1.75;
    const y0 = T.floor2 + 0.18, y1 = 12.5;
    for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      b.add(new THREE.CylinderGeometry(0.1, 0.11, y1 - y0, 10), col, [cx + sx * hw, (y0 + y1) / 2, cz + sz * hw]);
    }
    b.box([hw * 2 + 0.3, 0.2, 0.18], beamMat, [cx, y1, cz + hw]);
    b.box([hw * 2 + 0.3, 0.2, 0.18], beamMat, [cx, y1, cz - hw]);
    b.box([0.18, 0.2, hw * 2 + 0.3], beamMat, [cx - hw, y1, cz]);
    b.box([0.18, 0.2, hw * 2 + 0.3], beamMat, [cx + hw, y1, cz]);
    // 攒尖屋面
    const e = 2.6, apexY = y1 + 1.5;
    const corners: V3[] = [[cx - e, y1 - 0.15, cz - e], [cx + e, y1 - 0.15, cz - e], [cx + e, y1 - 0.15, cz + e], [cx - e, y1 - 0.15, cz + e]];
    const geo = new THREE.BufferGeometry();
    const pos: number[] = [];
    const uvs: number[] = [];
    for (let i = 0; i < 4; i++) {
      const a = corners[i], c = corners[(i + 1) % 4];
      pos.push(...a, ...c, cx, apexY, cz);
      uvs.push(0, 0, 4, 0, 2, 3);
      pos.push(...c, ...a, cx, apexY - 0.02, cz);
      uvs.push(4, 0, 0, 0, 2, 3);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.computeVertexNormals();
    b.add(geo, roofMat);
    b.add(new THREE.SphereGeometry(0.16, 12, 10), M.gold, [cx, apexY + 0.1, cz]);
    b.add(new THREE.ConeGeometry(0.08, 0.4, 10), M.gold, [cx, apexY + 0.4, cz]);
    // 翘角
    for (const c of corners) b.add(new THREE.ConeGeometry(0.06, 0.5, 6), roofMat, [c[0], c[1] + 0.15, c[2]], [0, 0, 0]);
  }

  // 灯笼（暖光来源的造型）
  const lanternMat = litMat({ color: "#ff5a2a", emissive: "#ff6a20", emissiveIntensity: 1.6, roughness: 0.6 });
  for (const [x, y, z] of [[-0.6, 4.3, 2.95], [2.2, 4.3, 2.95], [-0.6, 8.0, 2.95], [2.2, 8.0, 2.95]] as V3[]) {
    b.add(new THREE.SphereGeometry(0.18, 14, 10), lanternMat, [x, y, z]);
    b.add(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 10), M.gold, [x, y + 0.19, z]);
    b.add(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 10), M.gold, [x, y - 0.19, z]);
  }

  const group = b.build(true);
  return group;
}

// The timber tower around the mechanism: stone platform, lacquered columns,
// floors, bracket sets, tiled eaves, the façade of the jack pagoda (木阁) and
// the roofed observation platform. Drawn as a cut-away: the front (+x) and the
// escapement side of the lower storey are left open.
import * as THREE from "three";
import type { Materials } from "./materials";
import { box, cyl, beam, beamGeo, cylGeo, merged } from "./geom";
import { FLOORS, ARMIL, SHAFT, type V3 } from "../sim/layout";

export const TOWER = { x0: -2.8, x1: 2.3, z0: -3.3, z1: 2.6 };

export function buildTower(M: Materials, scene: THREE.Scene) {
  const g = new THREE.Group();
  scene.add(g);
  const T = TOWER;
  const cx = (T.x0 + T.x1) / 2, cz = (T.z0 + T.z1) / 2;
  const W = T.x1 - T.x0, D = T.z1 - T.z0;

  // stone platform (台基) with front steps
  g.add(box([W / 2 + 0.7, 0.3, D / 2 + 0.7], [cx, -0.3, cz], M.stone));
  g.add(box([W / 2 + 1.0, 0.08, D / 2 + 1.0], [cx, -0.55, cz], M.stone));
  for (let i = 0; i < 3; i++) {
    g.add(box([0.22, 0.1, 1.2], [T.x1 + 0.92 + i * 0.36, -0.1 - i * 0.2, cz], M.stone));
  }
  // floor of the lower storey (paving)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W + 1.2, D + 1.2), M.stone);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(cx, 0.002, cz);
  floor.receiveShadow = true;
  (floor.material as THREE.MeshStandardMaterial).map!.repeat.set(4, 4);
  g.add(floor);

  // columns
  const colGeos: THREE.BufferGeometry[] = [];
  const baseGeos: THREE.BufferGeometry[] = [];
  const col = (x: number, z: number, y0: number, y1: number, r = 0.13) => {
    colGeos.push(cylGeo([x, y0, z], [x, y1, z], r, 16));
    baseGeos.push(cylGeo([x, y0, z], [x, y0 + 0.12, z], r + 0.07, 16));
  };
  const zs = [T.z0, -1.0, 1.2, T.z1];
  for (const z of [T.z0, T.z1]) col(T.x1, z, 0, FLOORS.platform);
  for (const z of zs) col(T.x0, z, 0, FLOORS.platform);
  // intermediate columns only on the walled (+z) side; the escapement side stays open
  for (const x of [-0.9, 0.9]) col(x, T.z1, 0, FLOORS.platform);
  g.add(merged(colGeos, M.lacquer));
  g.add(merged(baseGeos, M.stone));

  // floors with beams and bracket sets
  const slab = (y: number, holes = true) => {
    const s = new THREE.Shape();
    s.moveTo(T.x0 - 0.2, T.z0 - 0.2);
    s.lineTo(T.x1 + 0.2, T.z0 - 0.2);
    s.lineTo(T.x1 + 0.2, T.z1 + 0.2);
    s.lineTo(T.x0 - 0.2, T.z1 + 0.2);
    if (holes) {
      const h = new THREE.Path();
      h.absarc(SHAFT.x, -SHAFT.z, 0.16, 0, Math.PI * 2, true);
      s.holes.push(h);
    }
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: false });
    geo.rotateX(Math.PI / 2);
    const m = new THREE.Mesh(geo, M.darkWood);
    m.position.y = y;
    m.castShadow = m.receiveShadow = true;
    g.add(m);
    // perimeter beams (额枋) painted
    const bg: THREE.BufferGeometry[] = [];
    const yb = y - 0.24;
    bg.push(beamGeo([T.x0, yb, T.z0], [T.x1, yb, T.z0], 0.16, 0.22));
    bg.push(beamGeo([T.x0, yb, T.z1], [T.x1, yb, T.z1], 0.16, 0.22));
    bg.push(beamGeo([T.x0, yb, T.z0], [T.x0, yb, T.z1], 0.16, 0.22));
    bg.push(beamGeo([T.x1, yb, T.z0], [T.x1, yb, T.z1], 0.16, 0.22));
    g.add(merged(bg, M.lacquer));
    // bracket sets (斗拱) along the outer edge
    const brk: THREE.BufferGeometry[] = [];
    const add = (x: number, z: number, ox: number, oz: number) => {
      for (let k = 0; k < 3; k++) {
        const s2 = 0.09 + k * 0.05;
        const geo2 = new THREE.BoxGeometry(0.12 + Math.abs(ox) * s2 * 2, 0.07, 0.12 + Math.abs(oz) * s2 * 2);
        geo2.translate(x + ox * (0.08 + k * 0.08), y - 0.08 + k * 0.05 - 0.1, z + oz * (0.08 + k * 0.08));
        brk.push(geo2);
      }
    };
    for (let x = T.x0; x <= T.x1 + 0.01; x += W / 6) {
      add(x, T.z0, 0, -1);
      add(x, T.z1, 0, 1);
    }
    for (let z = T.z0; z <= T.z1 + 0.01; z += D / 7) {
      add(T.x0, z, -1, 0);
      add(T.x1, z, 1, 0);
    }
    const bm = merged(brk, M.paleWood);
    g.add(bm);
  };
  slab(FLOORS.mech);
  slab(FLOORS.jack);
  slab(FLOORS.platform);

  // eaves (腰檐): a tiled frustum skirt around each floor
  const eave = (y: number, out: number, drop: number) => {
    const r1 = 1, r0 = 1;
    const geo = new THREE.CylinderGeometry(r0, r1 + out, drop, 4, 1, true);
    geo.rotateY(Math.PI / 4);
    // stretch the square frustum to the tower's rectangle
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), yy = pos.getY(i), z = pos.getZ(i);
      const top = yy > 0;
      const sx = Math.sign(x) || 1, sz = Math.sign(z) || 1;
      const ex = top ? W / 2 + 0.25 : W / 2 + 0.25 + out;
      const ez = top ? D / 2 + 0.25 : D / 2 + 0.25 + out;
      // corners curl up slightly
      const lift = top ? 0 : 0.08;
      pos.setXYZ(i, cx + sx * ex, y + yy + lift, cz + sz * ez);
    }
    geo.computeVertexNormals();
    // uv: tiles run down the slope
    const uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 12, uv.getY(i) * 1.2);
    const m = new THREE.Mesh(geo, M.tile);
    m.castShadow = m.receiveShadow = true;
    g.add(m);
    // ridge/edge strip
    const edge: THREE.BufferGeometry[] = [];
    const ex = W / 2 + 0.25 + out, ez = D / 2 + 0.25 + out, yy = y - drop / 2 + 0.08;
    edge.push(beamGeo([cx - ex, yy, cz - ez], [cx + ex, yy, cz - ez], 0.08, 0.08));
    edge.push(beamGeo([cx - ex, yy, cz + ez], [cx + ex, yy, cz + ez], 0.08, 0.08));
    edge.push(beamGeo([cx - ex, yy, cz - ez], [cx - ex, yy, cz + ez], 0.08, 0.08));
    edge.push(beamGeo([cx + ex, yy, cz - ez], [cx + ex, yy, cz + ez], 0.08, 0.08));
    g.add(merged(edge, M.darkWood));
  };
  eave(FLOORS.mech + 0.12, 0.75, 0.55);
  eave(FLOORS.jack + 0.12, 0.75, 0.55);
  eave(FLOORS.platform + 0.12, 0.9, 0.6);

  // back wall with lattice windows (lower and middle storeys)
  const wall = (x: number, z0: number, z1: number, y0: number, y1: number, windows: number) => {
    g.add(box([0.06, (y1 - y0) / 2, (z1 - z0) / 2], [x, (y0 + y1) / 2, (z0 + z1) / 2], M.plaster));
    const lat: THREE.BufferGeometry[] = [];
    for (let i = 0; i < windows; i++) {
      const zc = z0 + ((i + 0.5) * (z1 - z0)) / windows;
      const yc = y0 + (y1 - y0) * 0.6;
      lat.push(beamGeo([x + 0.07, yc - 0.45, zc - 0.4], [x + 0.07, yc - 0.45, zc + 0.4], 0.04, 0.06));
      lat.push(beamGeo([x + 0.07, yc + 0.45, zc - 0.4], [x + 0.07, yc + 0.45, zc + 0.4], 0.04, 0.06));
      for (let k = -3; k <= 3; k++) lat.push(beamGeo([x + 0.07, yc - 0.45, zc + k * 0.12], [x + 0.07, yc + 0.45, zc + k * 0.12], 0.03, 0.025));
      for (let k = -3; k <= 3; k++) lat.push(beamGeo([x + 0.07, yc + k * 0.13, zc - 0.4], [x + 0.07, yc + k * 0.13, zc + 0.4], 0.03, 0.025));
    }
    if (lat.length) g.add(merged(lat, M.lacquer));
  };
  wall(T.x0 + 0.05, T.z0, T.z1, 0, FLOORS.mech - 0.25, 3);
  wall(T.x0 + 0.05, T.z0, T.z1, FLOORS.mech, FLOORS.jack - 0.25, 3);
  wall(T.x0 + 0.05, T.z0, T.z1, FLOORS.jack, FLOORS.platform - 0.25, 3);
  // side wall on the +z side (left, seen from the front); the -z side stays open
  g.add(box([W / 2, (FLOORS.platform - 0.25) / 2, 0.06], [cx, (FLOORS.platform - 0.25) / 2, T.z1 - 0.05], M.plaster));

  // ── jack pagoda façade (木阁) between the floors, facing +x ──
  const fx = 1.05;
  const y0 = FLOORS.mech, y1 = FLOORS.jack - 0.25;
  const zA = -1.6, zB = 1.6;
  const facade = new THREE.MeshStandardMaterial({ color: 0x6e2216, roughness: 0.62, metalness: 0.0 });
  const panel = (z0: number, z1: number, ya: number, yb: number) =>
    g.add(box([0.04, (yb - ya) / 2, (z1 - z0) / 2], [fx, (ya + yb) / 2, (z0 + z1) / 2], facade));
  // lower tier: one central door for the hour plaques
  const dA = [4.75, 5.62];
  panel(zA, -0.3, y0, dA[1]);
  panel(0.3, zB, y0, dA[1]);
  panel(-0.3, 0.3, y0, dA[0]);
  // band with a small eave between tiers
  panel(zA, zB, dA[1], 5.72);
  g.add(beam([fx + 0.25, 5.74, zA - 0.1], [fx + 0.25, 5.74, zB + 0.1], 0.5, 0.04, M.tile));
  // upper tier: two doors (drum on the right, bell on the left)
  const dB = [5.78, 6.42];
  panel(zA, -1.1, dB[0], y1);
  panel(-0.35, 0.35, dB[0], y1);
  panel(1.1, zB, dB[0], y1);
  panel(-1.1, -0.35, dB[1], y1);
  panel(0.35, 1.1, dB[1], y1);
  // door frames
  const fr: THREE.BufferGeometry[] = [];
  const frame = (za: number, zb: number, ya: number, yb: number) => {
    fr.push(beamGeo([fx + 0.05, ya, za], [fx + 0.05, yb, za], 0.06, 0.06));
    fr.push(beamGeo([fx + 0.05, ya, zb], [fx + 0.05, yb, zb], 0.06, 0.06));
    fr.push(beamGeo([fx + 0.05, yb, za], [fx + 0.05, yb, zb], 0.06, 0.06));
    fr.push(beamGeo([fx + 0.05, ya, za], [fx + 0.05, ya, zb], 0.06, 0.06));
  };
  frame(-0.3, 0.3, dA[0], dA[1]);
  frame(-1.1, -0.35, dB[0], dB[1]);
  frame(0.35, 1.1, dB[0], dB[1]);
  g.add(merged(fr, M.gold));
  // pilasters, lattice windows and a small signboard make it read as a pagoda front
  const deco: THREE.BufferGeometry[] = [];
  for (const z of [zA, -1.1, -0.35, 0.35, 1.1, zB]) deco.push(beamGeo([fx + 0.07, y0, z], [fx + 0.07, y1, z], 0.08, 0.08));
  deco.push(beamGeo([fx + 0.07, y0 + 0.1, zA], [fx + 0.07, y0 + 0.1, zB], 0.1, 0.12));
  g.add(merged(deco, M.lacquer));
  const lat: THREE.BufferGeometry[] = [];
  for (const [za, zb] of [[-1.45, -0.5], [0.5, 1.45]]) {
    const ya = 4.9, yb = 5.45;
    for (let k = 0; k <= 6; k++) {
      const z = za + ((zb - za) * k) / 6;
      lat.push(beamGeo([fx + 0.05, ya, z], [fx + 0.05, yb, z], 0.025, 0.02));
    }
    for (let k = 0; k <= 4; k++) {
      const y = ya + ((yb - ya) * k) / 4;
      lat.push(beamGeo([fx + 0.05, y, za], [fx + 0.05, y, zb], 0.025, 0.02));
    }
  }
  g.add(merged(lat, M.gold));
  const sb = signBoard("报时");
  sb.scale.set(0.32, 0.5, 1);
  sb.position.set(fx + 0.06, 6.12, 0);
  sb.rotation.y = Math.PI / 2;
  g.add(sb);

  // balustrade around the top platform
  const bal: THREE.BufferGeometry[] = [];
  const py = FLOORS.platform + 0.02;
  const corners: V3[] = [[T.x0 - 0.1, py, T.z0 - 0.1], [T.x1 + 0.1, py, T.z0 - 0.1], [T.x1 + 0.1, py, T.z1 + 0.1], [T.x0 - 0.1, py, T.z1 + 0.1]];
  for (let i = 0; i < 4; i++) {
    const a = corners[i], b = corners[(i + 1) % 4];
    bal.push(beamGeo([a[0], py + 0.55, a[2]], [b[0], py + 0.55, b[2]], 0.07, 0.07));
    bal.push(beamGeo([a[0], py + 0.2, a[2]], [b[0], py + 0.2, b[2]], 0.05, 0.05));
    const n = Math.round(Math.hypot(b[0] - a[0], b[2] - a[2]) / 0.6);
    for (let k = 0; k <= n; k++) {
      const x = a[0] + ((b[0] - a[0]) * k) / n, z = a[2] + ((b[2] - a[2]) * k) / n;
      bal.push(cylGeo([x, py, z], [x, py + 0.62, z], 0.04, 8));
    }
  }
  g.add(merged(bal, M.lacquer));

  // light pavilion roof over the armillary sphere (the real one could be opened)
  const A = ARMIL.center;
  const rx = 1.45, rz = 1.45, ry0 = FLOORS.platform, ry1 = 12.0;
  const pc: THREE.BufferGeometry[] = [];
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) pc.push(cylGeo([A[0] + sx * rx, ry0, A[2] + sz * rz], [A[0] + sx * rx, ry1, A[2] + sz * rz], 0.09, 12));
  g.add(merged(pc, M.lacquer));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.3, 4, 1, true).rotateY(Math.PI / 4), M.tile);
  roof.position.set(A[0], ry1 + 0.62, A[2]);
  roof.castShadow = true;
  g.add(roof);
  const finial = cyl([A[0], ry1 + 1.2, A[2]], [A[0], ry1 + 1.6, A[2]], 0.07, M.gold);
  g.add(finial);
  const rb: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 4; i++) {
    const a = [[-1, -1], [1, -1], [1, 1], [-1, 1]][i], b = [[-1, -1], [1, -1], [1, 1], [-1, 1]][(i + 1) % 4];
    rb.push(beamGeo([A[0] + a[0] * rx, ry1, A[2] + a[1] * rz], [A[0] + b[0] * rx, ry1, A[2] + b[1] * rz], 0.12, 0.16));
  }
  g.add(merged(rb, M.lacquer));
  return g;
}

function signBoard(text: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const x = c.getContext("2d")!;
  x.fillStyle = "#1d2a33";
  x.fillRect(0, 0, 512, 128);
  x.strokeStyle = "#c9a24e";
  x.lineWidth = 10;
  x.strokeRect(8, 8, 496, 112);
  x.fillStyle = "#e3c06a";
  x.font = 'bold 76px "Noto Serif CJK SC","Source Han Serif SC","Songti SC","STSong","SimSun","AR PL UMing CN",serif';
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(text, 256, 68);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 }));
}

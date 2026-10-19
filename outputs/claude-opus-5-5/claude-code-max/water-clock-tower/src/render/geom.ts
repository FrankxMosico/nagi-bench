// 几何小工具：基本体、两点间的杆件、按材质合并静态子网格。
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
/** 枢轮平面设计坐标 (u,v,w) -> 刚体局部 (x=w, y=v, z=-u) */
export const L = (u: number, v: number, w = 0) => new THREE.Vector3(w, v, -u);

export function mesh(g: THREE.BufferGeometry, m: THREE.Material, cast = true, receive = true) {
  const o = new THREE.Mesh(g, m);
  o.castShadow = cast;
  o.receiveShadow = receive;
  return o;
}

export function box(w: number, h: number, d: number, m: THREE.Material, pos?: THREE.Vector3, rot?: THREE.Euler) {
  const o = mesh(new THREE.BoxGeometry(w, h, d), m);
  if (pos) o.position.copy(pos);
  if (rot) o.rotation.copy(rot);
  return o;
}

/** 两点间圆柱 */
export function rod(a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material, seg = 10, r2?: number) {
  const d = new THREE.Vector3().subVectors(b, a);
  const len = d.length();
  const o = mesh(new THREE.CylinderGeometry(r2 ?? r, r, len, seg, 1), m);
  o.position.copy(a).addScaledVector(d, 0.5);
  o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return o;
}

/** 两点间方杆（截面 w×h，h 方向尽量朝向 up） */
export function beam(a: THREE.Vector3, b: THREE.Vector3, w: number, h: number, m: THREE.Material, up = new THREE.Vector3(0, 1, 0)) {
  const d = new THREE.Vector3().subVectors(b, a);
  const len = d.length();
  const o = mesh(new THREE.BoxGeometry(w, h, len), m);
  o.position.copy(a).addScaledVector(d, 0.5);
  const m4 = new THREE.Matrix4();
  const z = d.clone().normalize();
  let x = new THREE.Vector3().crossVectors(up, z);
  if (x.lengthSq() < 1e-6) x = new THREE.Vector3().crossVectors(new THREE.Vector3(1, 0, 0), z);
  x.normalize();
  const y = new THREE.Vector3().crossVectors(z, x);
  m4.makeBasis(x, y, z);
  o.quaternion.setFromRotationMatrix(m4);
  return o;
}

/** 平面环（圆环带），轴向 axis，半径 r，截面 tw×th */
export function ring(r: number, tw: number, th: number, m: THREE.Material, axis: 'x' | 'y' | 'z' = 'y', seg = 96) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, r + tw / 2, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, r - tw / 2, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(shape, { depth: th, bevelEnabled: false, curveSegments: seg });
  g.translate(0, 0, -th / 2);
  if (axis === 'x') g.rotateY(Math.PI / 2);
  if (axis === 'y') g.rotateX(Math.PI / 2);
  return mesh(g, m);
}

/** 圆管环（torus），轴向 axis */
export function torus(r: number, tube: number, m: THREE.Material, axis: 'x' | 'y' | 'z' = 'z', seg = 96) {
  const g = new THREE.TorusGeometry(r, tube, 8, seg);
  if (axis === 'x') g.rotateY(Math.PI / 2);
  if (axis === 'y') g.rotateX(Math.PI / 2);
  return mesh(g, m);
}

export function cyl(r: number, len: number, m: THREE.Material, axis: 'x' | 'y' | 'z' = 'y', seg = 16, pos?: THREE.Vector3) {
  const g = new THREE.CylinderGeometry(r, r, len, seg);
  if (axis === 'x') g.rotateZ(Math.PI / 2);
  if (axis === 'z') g.rotateX(Math.PI / 2);
  const o = mesh(g, m);
  if (pos) o.position.copy(pos);
  return o;
}

/**
 * 把 group 中的所有网格按材质合并（变换烘焙进顶点），减少绘制调用。
 * 只合并 group 的直接或间接子网格；group 自身的变换保留。
 */
export function bake(group: THREE.Object3D, keepNames: string[] = []): THREE.Group {
  group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const byMat = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const keep: THREE.Object3D[] = [];
  group.traverse((o) => {
    if (o === group) return;
    if (keepNames.includes(o.name)) { keep.push(o); return; }
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    let p: THREE.Object3D | null = m.parent;
    while (p && p !== group) { if (keepNames.includes(p.name)) return; p = p.parent; }
    const g = m.geometry.clone();
    const mat = new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld);
    g.applyMatrix4(mat);
    const geo = g.index ? g.toNonIndexed() : g;
    for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
    if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
    const arr = byMat.get(m.material as THREE.Material) ?? [];
    arr.push(geo);
    byMat.set(m.material as THREE.Material, arr);
  });
  const out = new THREE.Group();
  out.position.copy(group.position);
  out.quaternion.copy(group.quaternion);
  out.scale.copy(group.scale);
  out.name = group.name;
  for (const [m, gs] of byMat) {
    const merged = mergeGeometries(gs, false);
    if (!merged) continue;
    out.add(mesh(merged, m));
  }
  for (const k of keep) {
    const wm = new THREE.Matrix4().multiplyMatrices(inv, k.matrixWorld);
    k.removeFromParent();
    wm.decompose(k.position, k.quaternion, k.scale);
    out.add(k);
  }
  return out;
}

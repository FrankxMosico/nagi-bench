// 几何构建辅助：把同一材质的多个基础几何体合并成一个网格，减少绘制调用。
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type V3 = [number, number, number];

const tmpM = new THREE.Matrix4();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();

export class Builder {
  private byMat = new Map<THREE.Material, THREE.BufferGeometry[]>();

  add(geo: THREE.BufferGeometry, mat: THREE.Material, pos: V3 = [0, 0, 0], rot?: V3 | THREE.Quaternion, scale?: V3) {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    if (!g.attributes.uv) {
      g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array((g.attributes.position.count) * 2), 2));
    }
    if (rot instanceof THREE.Quaternion) tmpQ.copy(rot);
    else if (rot) tmpQ.setFromEuler(tmpE.set(rot[0], rot[1], rot[2]));
    else tmpQ.identity();
    tmpM.compose(new THREE.Vector3(...pos), tmpQ, new THREE.Vector3(...(scale ?? [1, 1, 1])));
    g.applyMatrix4(tmpM);
    let list = this.byMat.get(mat);
    if (!list) this.byMat.set(mat, (list = []));
    list.push(g);
    return this;
  }

  /** 轴对齐盒子 */
  box(size: V3, mat: THREE.Material, pos: V3 = [0, 0, 0], rot?: V3 | THREE.Quaternion) {
    return this.add(new THREE.BoxGeometry(...size), mat, pos, rot);
  }

  /** 两点之间的圆柱（杆） */
  rod(a: V3, b: V3, r: number, mat: THREE.Material, seg = 10) {
    const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
    const d = vb.clone().sub(va);
    const len = d.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    const mid = va.add(vb).multiplyScalar(0.5);
    return this.add(new THREE.CylinderGeometry(r, r, len, seg), mat, [mid.x, mid.y, mid.z], q);
  }

  /** 两点之间的方木 */
  beam(a: V3, b: V3, w: number, h: number, mat: THREE.Material) {
    const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
    const d = vb.clone().sub(va);
    const len = d.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    const mid = va.add(vb).multiplyScalar(0.5);
    return this.add(new THREE.BoxGeometry(w, len, h), mat, [mid.x, mid.y, mid.z], q);
  }

  build(shadows = true): THREE.Group {
    const group = new THREE.Group();
    for (const [mat, list] of this.byMat) {
      const merged = mergeGeometries(list, false);
      if (!merged) continue;
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = shadows;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.byMat.clear();
    return group;
  }
}

/** 正齿轮/冠齿轮等用的方齿环 */
export function toothRing(
  b: Builder, mat: THREE.Material, n: number, r: number, phase: number,
  size: V3, place: (x: number, y: number, a: number) => { pos: V3; rot: V3 | THREE.Quaternion },
) {
  for (let k = 0; k < n; k++) {
    const a = phase + (k * 2 * Math.PI) / n;
    const { pos, rot } = place(r * Math.cos(a), r * Math.sin(a), a);
    b.add(new THREE.BoxGeometry(...size), mat, pos, rot);
  }
}

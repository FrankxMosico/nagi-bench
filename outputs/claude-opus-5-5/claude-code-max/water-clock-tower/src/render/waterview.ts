// 水滴渲染：一个 InstancedMesh，按速度方向拉长，形成连续的水流观感。
import * as THREE from 'three';
import type { Water } from '../sim/water';
import type { Palette } from './materials';

export interface WaterView { mesh: THREE.InstancedMesh; update: () => void }

export function buildWaterView(water: Water, pal: Palette): WaterView {
  const geo = new THREE.SphereGeometry(1, 10, 8);
  const mat = pal.water.clone();
  mat.opacity = 0.88;
  mat.emissiveIntensity = 0.75;
  const mesh = new THREE.InstancedMesh(geo, mat, water.parts.length);
  mesh.frustumCulled = false;
  mesh.renderOrder = 3;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3();
  const zero = new THREE.Matrix4().makeScale(0, 0, 0);
  const update = () => {
    const parts = water.parts;
    for (let i = 0; i < parts.length; i++) {
      const pt = parts[i];
      if (!pt.active) { mesh.setMatrixAt(i, zero); continue; }
      const t = pt.body.translation();
      const v = pt.body.linvel();
      const sp = Math.hypot(v.x, v.y, v.z);
      p.set(t.x, t.y, t.z);
      if (sp > 1e-3) dir.set(v.x / sp, v.y / sp, v.z / sp); else dir.set(0, 1, 0);
      q.setFromUnitVectors(up, dir);
      const r = pt.kind === 2 ? 0.016 : 0.019;
      s.set(r, r * (1 + Math.min(4.5, sp * 1.6)), r);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };
  return { mesh, update };
}

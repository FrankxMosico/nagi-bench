// Small geometry helpers.
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { V3 } from "../sim/layout";

export const v3 = (a: V3) => new THREE.Vector3(a[0], a[1], a[2]);

/** wheel-plane offset (u, v, n) → world-aligned offset */
export const uvn = (u: number, v: number, n = 0): V3 => [n, v, -u];

export function box(half: V3, pos: V3, mat: THREE.Material, rotX = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(half[0] * 2, half[1] * 2, half[2] * 2), mat);
  m.position.set(...pos);
  m.rotation.x = rotX;
  m.castShadow = m.receiveShadow = true;
  return m;
}

/** geometry of a cylinder spanning a → b */
export function cylGeo(a: V3, b: V3, r: number, seg = 12, r2 = r) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const d = B.clone().sub(A);
  const g = new THREE.CylinderGeometry(r2, r, d.length(), seg);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
  g.applyQuaternion(q);
  const mid = A.add(B).multiplyScalar(0.5);
  g.translate(mid.x, mid.y, mid.z);
  return g;
}
export function cyl(a: V3, b: V3, r: number, mat: THREE.Material, seg = 12) {
  const m = new THREE.Mesh(cylGeo(a, b, r, seg), mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

/** a beam (box) spanning a → b with cross-section w × h (h along `up`) */
export function beamGeo(a: V3, b: V3, w: number, h: number, up: V3 = [0, 1, 0]) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const d = B.clone().sub(A);
  const len = d.length();
  const g = new THREE.BoxGeometry(w, h, len);
  const z = d.clone().normalize();
  let y = new THREE.Vector3(...up);
  if (Math.abs(y.dot(z)) > 0.95) y = new THREE.Vector3(1, 0, 0);
  const x = new THREE.Vector3().crossVectors(y, z).normalize();
  y.crossVectors(z, x).normalize();
  const m = new THREE.Matrix4().makeBasis(x, y, z);
  g.applyMatrix4(m);
  const mid = A.add(B).multiplyScalar(0.5);
  g.translate(mid.x, mid.y, mid.z);
  return g;
}
export function beam(a: V3, b: V3, w: number, h: number, mat: THREE.Material, up?: V3) {
  const m = new THREE.Mesh(beamGeo(a, b, w, h, up), mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

export function merged(geos: THREE.BufferGeometry[], mat: THREE.Material) {
  const clean = geos.map((g) => (g.index ? g.toNonIndexed() : g));
  for (const g of clean) {
    for (const k of Object.keys(g.attributes)) if (!["position", "normal", "uv"].includes(k)) g.deleteAttribute(k);
  }
  const m = new THREE.Mesh(mergeGeometries(clean), mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

/** torus ring of radius R lying in the plane perpendicular to `axis`, centred at c */
export function ringGeo(R: number, tube: number, axis: V3, c: V3 = [0, 0, 0], radial = 8, tubular = 96) {
  const g = new THREE.TorusGeometry(R, tube, radial, tubular); // in XY plane, axis z
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(...axis).normalize());
  g.applyQuaternion(q);
  g.translate(...c);
  return g;
}

/** flat-sectioned ring (washer) perpendicular to axis */
export function discGeo(R: number, thick: number, axis: V3, c: V3 = [0, 0, 0], seg = 48) {
  const g = new THREE.CylinderGeometry(R, R, thick, seg);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...axis).normalize());
  g.applyQuaternion(q);
  g.translate(...c);
  return g;
}

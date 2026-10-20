import * as THREE from "three";
import type { CanvasShim } from "./shim";

/**
 * A small CPU rasteriser that consumes the film's real three.js scene graph and
 * produces an approximate frame (Gouraud-lit, no shadows, no bloom). It exists
 * so composition, staging, colour and continuity can be checked offline, where
 * no browser or GPU is available.
 */

interface Lights {
  ambient: [number, number, number];
  hemis: Array<{ sky: THREE.Color; ground: THREE.Color; dir: THREE.Vector3 }>;
  dirs: Array<{ dir: THREE.Vector3; col: THREE.Color }>;
  points: Array<{ pos: THREE.Vector3; col: THREE.Color; distance: number; decay: number }>;
  spots: Array<{ pos: THREE.Vector3; dir: THREE.Vector3; col: THREE.Color; distance: number; decay: number; cosOuter: number; cosInner: number }>;
}

const INV_PI = 1 / Math.PI;
const IRR = new Float32Array(3);

/** Summed irradiance (three.js units) at a world point with unit normal n. */
function irradiance(lights: Lights, px: number, py: number, pz: number, nx: number, ny: number, nz: number, out: Float32Array): void {
  let r = lights.ambient[0];
  let g = lights.ambient[1];
  let b = lights.ambient[2];
  for (const h of lights.hemis) {
    const k = 0.5 * (nx * h.dir.x + ny * h.dir.y + nz * h.dir.z) + 0.5;
    r += h.ground.r + (h.sky.r - h.ground.r) * k;
    g += h.ground.g + (h.sky.g - h.ground.g) * k;
    b += h.ground.b + (h.sky.b - h.ground.b) * k;
  }
  for (const d of lights.dirs) {
    const k = Math.max(0, nx * d.dir.x + ny * d.dir.y + nz * d.dir.z);
    r += d.col.r * k;
    g += d.col.g * k;
    b += d.col.b * k;
  }
  for (const p of lights.points) {
    let lx = p.pos.x - px;
    let ly = p.pos.y - py;
    let lz = p.pos.z - pz;
    const dist = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
    lx /= dist;
    ly /= dist;
    lz /= dist;
    const k = nx * lx + ny * ly + nz * lz;
    if (k <= 0) continue;
    let att = 1 / Math.max(Math.pow(dist, p.decay), 0.01);
    if (p.distance > 0) att *= Math.pow(Math.max(0, Math.min(1, 1 - Math.pow(dist / p.distance, 4))), 2);
    r += p.col.r * k * att;
    g += p.col.g * k * att;
    b += p.col.b * k * att;
  }
  for (const s of lights.spots) {
    let lx = s.pos.x - px;
    let ly = s.pos.y - py;
    let lz = s.pos.z - pz;
    const dist = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
    lx /= dist;
    ly /= dist;
    lz /= dist;
    const k = nx * lx + ny * ly + nz * lz;
    if (k <= 0) continue;
    const sp = smoothstep(s.cosOuter, s.cosInner, -(lx * s.dir.x + ly * s.dir.y + lz * s.dir.z));
    if (sp <= 0) continue;
    let att = 1 / Math.max(Math.pow(dist, s.decay), 0.01);
    if (s.distance > 0) att *= Math.pow(Math.max(0, Math.min(1, 1 - Math.pow(dist / s.distance, 4))), 2);
    r += s.col.r * k * att * sp;
    g += s.col.g * k * att * sp;
    b += s.col.b * k * att * sp;
  }
  out[0] = r;
  out[1] = g;
  out[2] = b;
}

/** A clip-space vertex with everything interpolated across a triangle. */
interface CV {
  x: number; y: number; z: number; w: number;
  r: number; g: number; b: number;
  u: number; v: number; f: number;
  wx: number; wy: number; wz: number;
  nx: number; ny: number; nz: number;
}

interface RasterState {
  tex: TexInfo | null;
  uvA: THREE.BufferAttribute | undefined;
  useAlpha: boolean;
  opacity: number;
  alphaTest: number;
  additive: boolean;
  blend: boolean;
  depthWrite: boolean;
  depthTest: boolean;
  fogCol: THREE.Color | null;
  pp: PixelLight | null;
}

/** Per-pixel shading state for a lit mesh (see Raster.perPixel). */
interface PixelLight {
  lights: Lights;
  diffuseK: number;
  metal: number;
  emissive: THREE.Color | null;
}

function srgbToLinear(c: number): number {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
const S2L = new Float32Array(256);
for (let i = 0; i < 256; i++) S2L[i] = srgbToLinear(i);

interface TexInfo {
  w: number;
  h: number;
  data: Uint8ClampedArray;
  flipY: boolean;
  srgb: boolean;
}

function texInfo(tex: THREE.Texture | null | undefined): TexInfo | null {
  if (!tex) return null;
  const img = tex.image as CanvasShim | { data: Uint8Array | Uint8ClampedArray; width: number; height: number } | undefined;
  if (!img) return null;
  const data = (img as { data?: Uint8ClampedArray }).data;
  if (!data) return null;
  return { w: img.width, h: img.height, data: data as Uint8ClampedArray, flipY: tex.flipY, srgb: tex.colorSpace === THREE.SRGBColorSpace };
}

export class Raster {
  readonly w: number;
  readonly h: number;
  readonly color: Float32Array;
  readonly depth: Float32Array;
  uScale = 600;
  starScale = 1;
  /** Light lit meshes per pixel (as WebGL does) instead of per vertex. Slower, but
   *  big voxel faces near a light no longer go dark between their corners. */
  perPixel = false;

  // scratch buffers for transformed vertices
  private cap = 0;
  private cx!: Float32Array;
  private cy!: Float32Array;
  private cz!: Float32Array;
  private cw!: Float32Array;
  private lr!: Float32Array;
  private lg!: Float32Array;
  private lb!: Float32Array;
  private fog!: Float32Array;
  private wx!: Float32Array;
  private wy!: Float32Array;
  private wz!: Float32Array;
  private nx!: Float32Array;
  private ny!: Float32Array;
  private nz!: Float32Array;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.color = new Float32Array(w * h * 3);
    this.depth = new Float32Array(w * h).fill(Infinity);
  }

  clear(r = 0, g = 0, b = 0): void {
    for (let i = 0; i < this.w * this.h; i++) {
      this.color[i * 3] = r;
      this.color[i * 3 + 1] = g;
      this.color[i * 3 + 2] = b;
    }
    this.depth.fill(Infinity);
  }

  clearDepth(): void {
    this.depth.fill(Infinity);
  }

  private ensure(n: number): void {
    if (n <= this.cap) return;
    this.cap = Math.max(n, this.cap * 2, 1024);
    this.cx = new Float32Array(this.cap);
    this.cy = new Float32Array(this.cap);
    this.cz = new Float32Array(this.cap);
    this.cw = new Float32Array(this.cap);
    this.lr = new Float32Array(this.cap);
    this.lg = new Float32Array(this.cap);
    this.lb = new Float32Array(this.cap);
    this.fog = new Float32Array(this.cap);
    this.wx = new Float32Array(this.cap);
    this.wy = new Float32Array(this.cap);
    this.wz = new Float32Array(this.cap);
    this.nx = new Float32Array(this.cap);
    this.ny = new Float32Array(this.cap);
    this.nz = new Float32Array(this.cap);
  }

  private gatherLights(scene: THREE.Scene): Lights {
    const L: Lights = { ambient: [0, 0, 0], hemis: [], dirs: [], points: [], spots: [] };
    scene.traverseVisible((o) => {
      const l = o as THREE.Light;
      if (!(l as THREE.Light).isLight) return;
      const col = l.color.clone().multiplyScalar(l.intensity);
      if ((l as THREE.AmbientLight).isAmbientLight) {
        L.ambient[0] += col.r;
        L.ambient[1] += col.g;
        L.ambient[2] += col.b;
      } else if ((l as THREE.HemisphereLight).isHemisphereLight) {
        const h = l as THREE.HemisphereLight;
        L.hemis.push({ sky: col, ground: h.groundColor.clone().multiplyScalar(h.intensity), dir: new THREE.Vector3().setFromMatrixPosition(h.matrixWorld).normalize() });
      } else if ((l as THREE.DirectionalLight).isDirectionalLight) {
        const d = l as THREE.DirectionalLight;
        const p = new THREE.Vector3().setFromMatrixPosition(d.matrixWorld);
        const t = new THREE.Vector3().setFromMatrixPosition(d.target.matrixWorld);
        L.dirs.push({ dir: p.sub(t).normalize(), col });
      } else if ((l as THREE.SpotLight).isSpotLight) {
        const s = l as THREE.SpotLight;
        const p = new THREE.Vector3().setFromMatrixPosition(s.matrixWorld);
        const t = new THREE.Vector3().setFromMatrixPosition(s.target.matrixWorld);
        L.spots.push({ pos: p, dir: t.sub(p).normalize(), col, distance: s.distance, decay: s.decay, cosOuter: Math.cos(s.angle), cosInner: Math.cos(s.angle * (1 - s.penumbra)) });
      } else if ((l as THREE.PointLight).isPointLight) {
        const pl = l as THREE.PointLight;
        L.points.push({ pos: new THREE.Vector3().setFromMatrixPosition(pl.matrixWorld), col, distance: pl.distance, decay: pl.decay });
      }
    });
    return L;
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    const lights = this.gatherLights(scene);
    const view = camera.matrixWorldInverse;
    const proj = camera.projectionMatrix;
    const viewProj = new THREE.Matrix4().multiplyMatrices(proj, view);
    const camPos = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);

    const opaque: THREE.Object3D[] = [];
    const transparent: Array<{ o: THREE.Object3D; d: number }> = [];
    scene.traverseVisible((o) => {
      const m = o as THREE.Mesh;
      if (!(m.isMesh || (o as THREE.Points).isPoints || (o as THREE.Sprite).isSprite)) return;
      const mat = (m.material as THREE.Material);
      if (!mat || Array.isArray(mat)) return;
      const tr = mat.transparent || (o as THREE.Points).isPoints || (o as THREE.Sprite).isSprite || mat.blending === THREE.AdditiveBlending;
      if (tr) {
        const p = new THREE.Vector3().setFromMatrixPosition(o.matrixWorld);
        transparent.push({ o, d: p.distanceToSquared(camPos) });
      } else opaque.push(o);
    });
    opaque.sort((a, b) => a.renderOrder - b.renderOrder);
    transparent.sort((a, b) => a.o.renderOrder - b.o.renderOrder || b.d - a.d);
    for (const o of opaque) this.drawObject(o, scene, camera, viewProj, lights, camPos);
    for (const { o } of transparent) this.drawObject(o, scene, camera, viewProj, lights, camPos);
  }

  private drawObject(o: THREE.Object3D, scene: THREE.Scene, camera: THREE.PerspectiveCamera, viewProj: THREE.Matrix4, lights: Lights, camPos: THREE.Vector3): void {
    if ((o as THREE.Points).isPoints) return this.drawPoints(o as THREE.Points, camera, viewProj);
    if ((o as THREE.Sprite).isSprite) return this.drawSprite(o as THREE.Sprite, camera, viewProj);
    this.drawMesh(o as THREE.Mesh, scene, viewProj, lights, camPos);
  }

  private drawMesh(mesh: THREE.Mesh, scene: THREE.Scene, viewProj: THREE.Matrix4, lights: Lights, camPos: THREE.Vector3): void {
    const geo = mesh.geometry as THREE.BufferGeometry;
    const mat = mesh.material as THREE.Material & Record<string, any>;
    const posA = geo.attributes.position as THREE.BufferAttribute | undefined;
    if (!posA) return;
    const nrmA = geo.attributes.normal as THREE.BufferAttribute | undefined;
    const uvA = geo.attributes.uv as THREE.BufferAttribute | undefined;
    const colA = geo.attributes.color as THREE.BufferAttribute | undefined;
    const index = geo.index;
    const n = posA.count;
    this.ensure(n);

    const preview = (mat.userData?.preview ?? null) as { kind?: string } | null;
    const kind = preview?.kind ?? (mat.type === "MeshBasicMaterial" || mat.type === "SpriteMaterial" ? "basic" : mat.type === "ShaderMaterial" ? "skip" : "lit");
    if (kind === "skip" || kind === "stars" || kind === "points") return;

    const mw = mesh.matrixWorld;
    const nm = new THREE.Matrix3().getNormalMatrix(mw);
    const e = mw.elements;
    const vp = viewProj.elements;
    const ne = nm.elements;
    const useVC = Boolean(mat.vertexColors) && colA;
    const baseCol: THREE.Color = (mat.color as THREE.Color | undefined) ?? new THREE.Color(1, 1, 1);
    const emissive: THREE.Color | null = (mat.emissive as THREE.Color | undefined) ? (mat.emissive as THREE.Color).clone().multiplyScalar(mat.emissiveIntensity ?? 1) : null;
    const metal = (mat.metalness as number | undefined) ?? 0;
    const diffuseK = 1 - metal * 0.75;
    const tex = texInfo(mat.map as THREE.Texture | null);
    const opacity = (mat.opacity as number) ?? 1;
    const alphaTest = (mat.alphaTest as number) ?? 0;
    const additive = mat.blending === THREE.AdditiveBlending;
    const blend = mat.transparent || additive;
    const depthWrite = mat.depthWrite !== false && !additive;
    const depthTest = mat.depthTest !== false;
    const side = mat.side;
    const fog = scene.fog as THREE.Fog | THREE.FogExp2 | null;
    const uni = (mat as THREE.ShaderMaterial).uniforms;

    const wp = new THREE.Vector3();
    const wn = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const sphereN = new THREE.Vector3();
    const centre = new THREE.Vector3().setFromMatrixPosition(mw);

    for (let i = 0; i < n; i++) {
      const x = posA.getX(i);
      const y = posA.getY(i);
      const z = posA.getZ(i);
      wp.set(e[0]! * x + e[4]! * y + e[8]! * z + e[12]!, e[1]! * x + e[5]! * y + e[9]! * z + e[13]!, e[2]! * x + e[6]! * y + e[10]! * z + e[14]!);
      this.cx[i] = vp[0]! * wp.x + vp[4]! * wp.y + vp[8]! * wp.z + vp[12]!;
      this.cy[i] = vp[1]! * wp.x + vp[5]! * wp.y + vp[9]! * wp.z + vp[13]!;
      this.cz[i] = vp[2]! * wp.x + vp[6]! * wp.y + vp[10]! * wp.z + vp[14]!;
      this.cw[i] = vp[3]! * wp.x + vp[7]! * wp.y + vp[11]! * wp.z + vp[15]!;
      let r = 1;
      let g = 1;
      let b = 1;
      if (nrmA) {
        const nx = nrmA.getX(i);
        const ny = nrmA.getY(i);
        const nz = nrmA.getZ(i);
        wn.set(ne[0]! * nx + ne[3]! * ny + ne[6]! * nz, ne[1]! * nx + ne[4]! * ny + ne[7]! * nz, ne[2]! * nx + ne[5]! * ny + ne[8]! * nz).normalize();
      } else wn.set(0, 1, 0);
      if (kind === "lit" && this.perPixel) {
        // lighting happens per pixel in raster(); carry the world position and normal
        this.wx[i] = wp.x;
        this.wy[i] = wp.y;
        this.wz[i] = wp.z;
        this.nx[i] = wn.x;
        this.ny[i] = wn.y;
        this.nz[i] = wn.z;
      } else if (kind === "lit") {
        irradiance(lights, wp.x, wp.y, wp.z, wn.x, wn.y, wn.z, IRR);
        r = IRR[0]! * INV_PI * diffuseK + metal * 0.04;
        g = IRR[1]! * INV_PI * diffuseK + metal * 0.04;
        b = IRR[2]! * INV_PI * diffuseK + metal * 0.045;
      } else if (kind === "earth" || kind === "clouds") {
        // mirrors earthFrag / cloudFrag in src/world/sky.ts, evaluated per vertex
        sphereN.copy(wp).sub(centre).normalize();
        const N = wn.clone().lerp(sphereN, 0.72).normalize();
        const L = (uni.uSunDir!.value as THREE.Vector3).clone().normalize();
        const Vv = camPos.clone().sub(wp).normalize();
        const sc = uni.uSunColor!.value as THREE.Color;
        const power = uni.uSunPower!.value as number;
        const wrap = (uni.uWrap?.value as number) ?? 0.3;
        const ndl = N.dot(L);
        const wrapped = Math.max(0, Math.min(1, (ndl + wrap) / (1 + wrap)));
        const cr = colA ? colA.getX(i) : 1;
        const cg = colA ? colA.getY(i) : 1;
        const cb = colA ? colA.getZ(i) : 1;
        if (kind === "earth") {
          const ocean = cr + 0.04 < cb && cg < cb + 0.03 ? 1 : 0;
          const ice = Math.min(cr, cg, cb) > 0.7 ? 1 : 0;
          const land = Math.max(0, 1 - ocean - ice);
          const day = smoothstep(0, 0.5, wrapped);
          const term = smoothstep(0, 0.12, wrapped) * (1 - smoothstep(0.12, 0.34, wrapped));
          const s7 = smoothstep(0.08, 0.42, wrapped);
          const wr = 1.0;
          const wg = 0.42 + (0.95 - 0.42) * s7;
          const wb = 0.16 + (0.9 - 0.16) * s7;
          let lr = cr * wrapped * 1.35 * wr * sc.r + 0.55 * term * 0.35 * (0.6 + ocean);
          let lg = cg * wrapped * 1.35 * wg * sc.g + 0.16 * term * 0.35 * (0.6 + ocean);
          let lb = cb * wrapped * 1.35 * wb * sc.b + 0.1 * term * 0.35 * (0.6 + ocean);
          const Hh = L.clone().add(Vv).normalize();
          const spec = Math.pow(Math.max(0, N.dot(Hh)), 26) * ocean * 2.2;
          lr += spec * (1.0);
          lg += spec * (0.45 + 0.4 * day);
          lb += spec * (0.18 + 0.47 * day);
          const night = 1 - smoothstep(-0.02, 0.22, wrapped);
          const vox = (uni.uVoxel?.value as number) ?? 1;
          const lx = (wp.x - centre.x) / vox - wn.x * 0.5;
          const ly = (wp.y - centre.y) / vox - wn.y * 0.5;
          const lz = (wp.z - centre.z) / vox - wn.z * 0.5;
          const hs = Math.sin(Math.floor(lx) * 127.1 + Math.floor(ly) * 311.7 + Math.floor(lz) * 74.7) * 43758.5453;
          const hh = hs - Math.floor(hs);
          const city = land * (hh > 0.84 ? 1 : 0) * night * ((uni.uCity?.value as number) ?? 1);
          r = lr * power + cr * 0.01 + city * 1.0 * (0.5 + hh * 0.9);
          g = lg * power + cg * 0.014 + city * 0.68 * (0.5 + hh * 0.9);
          b = lb * power + cb * 0.024 + city * 0.32 * (0.5 + hh * 0.9);
        } else {
          const term = smoothstep(0, 0.2, wrapped) * (1 - smoothstep(0.25, 0.7, wrapped));
          let lr = cr * wrapped * 1.4 * sc.r;
          let lg = cg * wrapped * 1.4 * sc.g;
          let lb = cb * wrapped * 1.4 * sc.b;
          lr = lr + (lr * 1.0 * 1.6 + 0.12 - lr) * term;
          lg = lg + (lg * 0.55 * 1.6 + 0.066 - lg) * term;
          lb = lb + (lb * 0.62 * 1.6 + 0.074 - lb) * term;
          r = lr * power + 0.012;
          g = lg * power + 0.014;
          b = lb * power + 0.02;
        }
      } else if (kind === "atmo") {
        sphereN.copy(wp).sub(centre).normalize();
        const V = camPos.clone().sub(wp).normalize();
        const rim = 1 - Math.abs(sphereN.dot(V));
        const glow = Math.pow(rim, 5);
        const L = (uni.uSunDir!.value as THREE.Vector3).clone().normalize();
        const fwd = Math.pow(Math.max(0, -V.dot(L)), 12);
        const side2 = Math.max(0, sphereN.dot(L));
        const sunlit = smoothstep(-0.35, 0.35, sphereN.dot(L));
        const power = uni.uSunPower!.value as number;
        const ring = (uni.uRing?.value as number) ?? 1;
        r = (0.18 * glow * (0.12 + sunlit * 0.55) + glow * (fwd * 3 * ring + side2 * 0.35) * 1.0) * power;
        g = (0.42 * glow * (0.12 + sunlit * 0.55) + glow * (fwd * 3 * ring + side2 * 0.35) * 0.5) * power;
        b = (1.0 * glow * (0.12 + sunlit * 0.55) + glow * (fwd * 3 * ring + side2 * 0.35) * 0.2) * power;
      }
      if (useVC && kind !== "atmo" && kind !== "earth" && kind !== "clouds") {
        const cr = colA!.getX(i);
        const cg = colA!.getY(i);
        const cb = colA!.getZ(i);
        r *= cr;
        g *= cg;
        b *= cb;
      }
      if (kind === "lit" || kind === "basic") {
        r *= baseCol.r;
        g *= baseCol.g;
        b *= baseCol.b;
      }
      if (emissive && kind === "lit" && !this.perPixel) {
        r += emissive.r;
        g += emissive.g;
        b += emissive.b;
      }
      this.lr[i] = r;
      this.lg[i] = g;
      this.lb[i] = b;
      if (fog) {
        const d = wp.distanceTo(camPos);
        let f = 0;
        if ((fog as THREE.FogExp2).isFogExp2) {
          const dd = (fog as THREE.FogExp2).density * d;
          f = 1 - Math.exp(-dd * dd);
        } else f = smoothstep((fog as THREE.Fog).near, (fog as THREE.Fog).far, d);
        this.fog[i] = f;
      } else this.fog[i] = 0;
    }

    const fogCol = fog ? fog.color : null;
    const triCount = index ? index.count / 3 : n / 3;
    const idx = index ? (index.array as ArrayLike<number>) : null;
    const pp: PixelLight | null = kind === "lit" && this.perPixel ? { lights, diffuseK, metal, emissive } : null;
    const st = { tex, uvA, useAlpha: blend || alphaTest > 0, opacity, alphaTest, additive, blend, depthWrite, depthTest, fogCol, pp };
    for (let t = 0; t < triCount; t++) {
      const a = idx ? idx[t * 3]! : t * 3;
      const b = idx ? idx[t * 3 + 1]! : t * 3 + 1;
      const c = idx ? idx[t * 3 + 2]! : t * 3 + 2;
      this.tri(a, b, c, side, st);
    }
  }

  private tri(a: number, b: number, c: number, side: THREE.Side, st: RasterState): void {
    // near-plane clipping in clip space
    const ids = [a, b, c];
    const inside = ids.map((i) => this.cz[i]! + this.cw[i]! > 1e-6);
    if (!inside[0] && !inside[1] && !inside[2]) return;
    const pp = st.pp !== null;
    const vtx = (i: number): CV => ({
      x: this.cx[i]!, y: this.cy[i]!, z: this.cz[i]!, w: this.cw[i]!,
      r: this.lr[i]!, g: this.lg[i]!, b: this.lb[i]!,
      u: st.uvA ? st.uvA.getX(i) : 0, v: st.uvA ? st.uvA.getY(i) : 0,
      f: this.fog[i]!,
      wx: pp ? this.wx[i]! : 0, wy: pp ? this.wy[i]! : 0, wz: pp ? this.wz[i]! : 0,
      nx: pp ? this.nx[i]! : 0, ny: pp ? this.ny[i]! : 0, nz: pp ? this.nz[i]! : 0,
    });
    let poly: CV[] = ids.map(vtx);
    if (!(inside[0] && inside[1] && inside[2])) {
      const out: CV[] = [];
      for (let k = 0; k < poly.length; k++) {
        const p = poly[k]!;
        const q = poly[(k + 1) % poly.length]!;
        const dp = p.z + p.w;
        const dq = q.z + q.w;
        if (dp > 1e-6) out.push(p);
        if ((dp > 1e-6) !== (dq > 1e-6)) {
          const s = dp / (dp - dq);
          const l = (x: number, y: number) => x + (y - x) * s;
          out.push({
            x: l(p.x, q.x), y: l(p.y, q.y), z: l(p.z, q.z), w: l(p.w, q.w), r: l(p.r, q.r), g: l(p.g, q.g), b: l(p.b, q.b), u: l(p.u, q.u), v: l(p.v, q.v), f: l(p.f, q.f),
            wx: l(p.wx, q.wx), wy: l(p.wy, q.wy), wz: l(p.wz, q.wz), nx: l(p.nx, q.nx), ny: l(p.ny, q.ny), nz: l(p.nz, q.nz),
          });
        }
      }
      poly = out;
      if (poly.length < 3) return;
    }
    for (let k = 1; k < poly.length - 1; k++) this.raster(poly[0]!, poly[k]!, poly[k + 1]!, side, st);
  }

  private raster(A: CV, B: CV, C: CV, side: THREE.Side, st: RasterState): void {
    const W = this.w;
    const H = this.h;
    const iwA = 1 / A.w;
    const iwB = 1 / B.w;
    const iwC = 1 / C.w;
    const ax = (A.x * iwA * 0.5 + 0.5) * W;
    const ay = (1 - (A.y * iwA * 0.5 + 0.5)) * H;
    const bx = (B.x * iwB * 0.5 + 0.5) * W;
    const by = (1 - (B.y * iwB * 0.5 + 0.5)) * H;
    const cx = (C.x * iwC * 0.5 + 0.5) * W;
    const cy = (1 - (C.y * iwC * 0.5 + 0.5)) * H;
    const area = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    if (area === 0 || !isFinite(area)) return;
    // screen y is flipped, so counter-clockwise front faces have negative area here
    if (side === THREE.FrontSide && area > 0) return;
    if (side === THREE.BackSide && area < 0) return;
    let minX = Math.max(0, Math.floor(Math.min(ax, bx, cx)));
    let maxX = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx)));
    let minY = Math.max(0, Math.floor(Math.min(ay, by, cy)));
    let maxY = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
    if (minX > maxX || minY > maxY) return;
    const za = A.z * iwA;
    const zb = B.z * iwB;
    const zc = C.z * iwC;
    const invArea = 1 / area;
    const tex = st.tex;
    for (let py = minY; py <= maxY; py++) {
      const y = py + 0.5;
      for (let px = minX; px <= maxX; px++) {
        const x = px + 0.5;
        let w0 = (bx - x) * (cy - y) - (by - y) * (cx - x);
        let w1 = (cx - x) * (ay - y) - (cy - y) * (ax - x);
        let w2 = (ax - x) * (by - y) - (ay - y) * (bx - x);
        w0 *= invArea;
        w1 *= invArea;
        w2 *= invArea;
        if (w0 < 0 || w1 < 0 || w2 < 0) continue;
        const z = w0 * za + w1 * zb + w2 * zc;
        if (z < -1 || z > 1) continue;
        const di = py * W + px;
        if (st.depthTest && z >= this.depth[di]!) continue;
        // perspective-correct weights
        const p0 = w0 * iwA;
        const p1 = w1 * iwB;
        const p2 = w2 * iwC;
        const ps = 1 / (p0 + p1 + p2);
        const k0 = p0 * ps;
        const k1 = p1 * ps;
        const k2 = p2 * ps;
        let r = A.r * k0 + B.r * k1 + C.r * k2;
        let g = A.g * k0 + B.g * k1 + C.g * k2;
        let b = A.b * k0 + B.b * k1 + C.b * k2;
        if (st.pp) {
          // r, g, b hold the albedo here; light it at this pixel's own position and normal
          let nx = A.nx * k0 + B.nx * k1 + C.nx * k2;
          let ny = A.ny * k0 + B.ny * k1 + C.ny * k2;
          let nz = A.nz * k0 + B.nz * k1 + C.nz * k2;
          const nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          nx /= nl;
          ny /= nl;
          nz /= nl;
          irradiance(st.pp.lights, A.wx * k0 + B.wx * k1 + C.wx * k2, A.wy * k0 + B.wy * k1 + C.wy * k2, A.wz * k0 + B.wz * k1 + C.wz * k2, nx, ny, nz, IRR);
          const dk = INV_PI * st.pp.diffuseK;
          const m = st.pp.metal;
          r *= IRR[0]! * dk + m * 0.04;
          g *= IRR[1]! * dk + m * 0.04;
          b *= IRR[2]! * dk + m * 0.045;
          const em = st.pp.emissive;
          if (em) {
            r += em.r;
            g += em.g;
            b += em.b;
          }
        }
        let alpha = st.opacity;
        if (tex) {
          const u = A.u * k0 + B.u * k1 + C.u * k2;
          const v = A.v * k0 + B.v * k1 + C.v * k2;
          let tx = Math.floor((u - Math.floor(u)) * tex.w);
          let ty = Math.floor((v - Math.floor(v)) * tex.h);
          if (tex.flipY) ty = tex.h - 1 - ty;
          tx = Math.min(tex.w - 1, Math.max(0, tx));
          ty = Math.min(tex.h - 1, Math.max(0, ty));
          const ti = (ty * tex.w + tx) * 4;
          const d = tex.data;
          if (tex.srgb) {
            r *= S2L[d[ti]!]!;
            g *= S2L[d[ti + 1]!]!;
            b *= S2L[d[ti + 2]!]!;
          } else {
            r *= d[ti]! / 255;
            g *= d[ti + 1]! / 255;
            b *= d[ti + 2]! / 255;
          }
          alpha *= d[ti + 3]! / 255;
        }
        if (st.alphaTest > 0 && alpha < st.alphaTest) continue;
        if (st.fogCol) {
          const f = A.f * k0 + B.f * k1 + C.f * k2;
          r += (st.fogCol.r - r) * f;
          g += (st.fogCol.g - g) * f;
          b += (st.fogCol.b - b) * f;
        }
        const ci = di * 3;
        if (st.additive) {
          this.color[ci] += r * alpha;
          this.color[ci + 1] += g * alpha;
          this.color[ci + 2] += b * alpha;
        } else if (st.blend && alpha < 0.999) {
          this.color[ci] = this.color[ci]! * (1 - alpha) + r * alpha;
          this.color[ci + 1] = this.color[ci + 1]! * (1 - alpha) + g * alpha;
          this.color[ci + 2] = this.color[ci + 2]! * (1 - alpha) + b * alpha;
        } else {
          this.color[ci] = r;
          this.color[ci + 1] = g;
          this.color[ci + 2] = b;
        }
        if (st.depthWrite) this.depth[di] = z;
      }
    }
  }

  private drawPoints(points: THREE.Points, camera: THREE.PerspectiveCamera, viewProj: THREE.Matrix4): void {
    const mat = points.material as THREE.ShaderMaterial;
    const kind = (mat.userData?.preview?.kind as string) ?? "";
    const geo = points.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const col = geo.attributes.aColor as THREE.BufferAttribute | undefined;
    const size = geo.attributes.aSize as THREE.BufferAttribute | undefined;
    const alphaA = geo.attributes.aAlpha as THREE.BufferAttribute | undefined;
    if (!pos || !col) return;
    const additive = mat.blending === THREE.AdditiveBlending || kind === "stars";
    const soft = Boolean(mat.userData?.preview?.soft);
    const mvp = new THREE.Matrix4().multiplyMatrices(viewProj, points.matrixWorld);
    const mv = new THREE.Matrix4().multiplyMatrices(camera.matrixWorldInverse, points.matrixWorld);
    const e = mvp.elements;
    const m = mv.elements;
    const bright = kind === "stars" ? ((mat.uniforms.uBright?.value as number) ?? 1) : 1;
    for (let i = 0; i < pos.count; i++) {
      const a = alphaA ? alphaA.getX(i) : 1;
      if (a <= 0.002) continue;
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const cw = e[3]! * x + e[7]! * y + e[11]! * z + e[15]!;
      if (cw <= 1e-5) continue;
      const cx = (e[0]! * x + e[4]! * y + e[8]! * z + e[12]!) / cw;
      const cy = (e[1]! * x + e[5]! * y + e[9]! * z + e[13]!) / cw;
      const cz = (e[2]! * x + e[6]! * y + e[10]! * z + e[14]!) / cw;
      if (cz < -1 || cz > 1) continue;
      const mvz = m[2]! * x + m[6]! * y + m[10]! * z + m[14]!;
      let px: number;
      if (kind === "stars") px = Math.max(1, (size ? size.getX(i) : 1) * this.starScale);
      else px = Math.min(512, Math.max(1, ((size ? size.getX(i) : 1) * this.uScale) / Math.max(1e-4, -mvz)));
      const sx = (cx * 0.5 + 0.5) * this.w;
      const sy = (1 - (cy * 0.5 + 0.5)) * this.h;
      const half = px / 2;
      const x0 = Math.max(0, Math.floor(sx - half));
      const x1 = Math.min(this.w - 1, Math.ceil(sx + half) - 1);
      const y0 = Math.max(0, Math.floor(sy - half));
      const y1 = Math.min(this.h - 1, Math.ceil(sy + half) - 1);
      const r = col.getX(i) * bright;
      const g = col.getY(i) * bright;
      const b = col.getZ(i) * bright;
      for (let yy = y0; yy <= y1; yy++) {
        for (let xx = x0; xx <= x1; xx++) {
          const di = yy * this.w + xx;
          if (mat.depthTest !== false && cz >= this.depth[di]!) continue;
          let al = a;
          if (soft) {
            const qx = Math.abs((xx + 0.5 - sx) / half);
            const qy = Math.abs((yy + 0.5 - sy) / half);
            const d = Math.max(qx, qy);
            al *= 1 - smoothstep(0.35, 1.0, d);
          }
          const ci = di * 3;
          if (additive) {
            this.color[ci] += r * al;
            this.color[ci + 1] += g * al;
            this.color[ci + 2] += b * al;
          } else {
            this.color[ci] = this.color[ci]! * (1 - al) + r * al;
            this.color[ci + 1] = this.color[ci + 1]! * (1 - al) + g * al;
            this.color[ci + 2] = this.color[ci + 2]! * (1 - al) + b * al;
          }
        }
      }
    }
  }

  private drawSprite(sprite: THREE.Sprite, camera: THREE.PerspectiveCamera, viewProj: THREE.Matrix4): void {
    const mat = sprite.material as THREE.SpriteMaterial;
    const tex = texInfo(mat.map);
    const centre = new THREE.Vector3().setFromMatrixPosition(sprite.matrixWorld);
    const scale = new THREE.Vector3().setFromMatrixScale(sprite.matrixWorld);
    const viewC = centre.clone().applyMatrix4(camera.matrixWorldInverse);
    if (viewC.z > -camera.near) return;
    const corner = (dx: number, dy: number) => {
      const v = viewC.clone().add(new THREE.Vector3(dx * scale.x * 0.5, dy * scale.y * 0.5, 0));
      return v.applyMatrix4(camera.projectionMatrix);
    };
    const p0 = corner(-1, -1);
    const p1 = corner(1, 1);
    const cz = viewC.clone().applyMatrix4(camera.projectionMatrix).z;
    const x0 = (p0.x * 0.5 + 0.5) * this.w;
    const x1 = (p1.x * 0.5 + 0.5) * this.w;
    const y0 = (1 - (p1.y * 0.5 + 0.5)) * this.h;
    const y1 = (1 - (p0.y * 0.5 + 0.5)) * this.h;
    const additive = mat.blending === THREE.AdditiveBlending;
    const c = mat.color;
    for (let yy = Math.max(0, Math.floor(y0)); yy <= Math.min(this.h - 1, Math.ceil(y1)); yy++) {
      for (let xx = Math.max(0, Math.floor(x0)); xx <= Math.min(this.w - 1, Math.ceil(x1)); xx++) {
        const di = yy * this.w + xx;
        if (mat.depthTest !== false && cz >= this.depth[di]!) continue;
        const u = (xx + 0.5 - x0) / (x1 - x0);
        const v = (yy + 0.5 - y0) / (y1 - y0);
        if (u < 0 || u > 1 || v < 0 || v > 1) continue;
        let r = c.r;
        let g = c.g;
        let b = c.b;
        let a = mat.opacity;
        if (tex) {
          const tx = Math.min(tex.w - 1, Math.floor(u * tex.w));
          const ty = Math.min(tex.h - 1, Math.floor(v * tex.h));
          const ti = (ty * tex.w + tx) * 4;
          r *= S2L[tex.data[ti]!]!;
          g *= S2L[tex.data[ti + 1]!]!;
          b *= S2L[tex.data[ti + 2]!]!;
          a *= tex.data[ti + 3]! / 255;
        }
        const ci = di * 3;
        if (additive) {
          this.color[ci] += r * a;
          this.color[ci + 1] += g * a;
          this.color[ci + 2] += b * a;
        } else {
          this.color[ci] = this.color[ci]! * (1 - a) + r * a;
          this.color[ci + 1] = this.color[ci + 1]! * (1 - a) + g * a;
          this.color[ci + 2] = this.color[ci + 2]! * (1 - a) + b * a;
        }
      }
    }
    void viewProj;
  }

  /** ACES filmic (three.js variant) + sRGB, returns 8-bit RGB. */
  toRGB8(exposure = 1): Uint8Array {
    const out = new Uint8Array(this.w * this.h * 3);
    for (let i = 0; i < this.w * this.h; i++) {
      let r = this.color[i * 3]! * exposure / 0.6;
      let g = this.color[i * 3 + 1]! * exposure / 0.6;
      let b = this.color[i * 3 + 2]! * exposure / 0.6;
      const ir = 0.59719 * r + 0.35458 * g + 0.04823 * b;
      const ig = 0.076 * r + 0.90834 * g + 0.01566 * b;
      const ib = 0.0284 * r + 0.13383 * g + 0.83777 * b;
      const f = (v: number) => (v * (v + 0.0245786) - 0.000090537) / (v * (0.983729 * v + 0.432951) + 0.238081);
      const fr = f(ir);
      const fg = f(ig);
      const fb = f(ib);
      r = 1.60475 * fr - 0.53108 * fg - 0.07367 * fb;
      g = -0.10208 * fr + 1.10813 * fg - 0.00605 * fb;
      b = -0.00327 * fr - 0.07276 * fg + 1.07602 * fb;
      out[i * 3] = enc(r);
      out[i * 3 + 1] = enc(g);
      out[i * 3 + 2] = enc(b);
    }
    return out;
  }
}

function enc(v: number): number {
  v = Math.max(0, Math.min(1, v));
  const s = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.round(s * 255);
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

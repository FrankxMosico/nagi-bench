import * as THREE from "three";
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

/**
 * A small software rasterizer for previewing frames of the film without a GPU
 * or browser: flat-shaded triangles, z-buffer, nearest texture sampling,
 * Lambert lighting with the same 1/π convention as three's physical lights,
 * points, sprites, additive/normal blending, ACES tone mapping and a cheap
 * bloom. Development tool only.
 */

import type { PreviewShader } from "../src/core/preview";

interface LightInfo {
  kind: "dir" | "point" | "spot" | "amb" | "hemi";
  colour: THREE.Color;
  dir?: THREE.Vector3;
  pos?: THREE.Vector3;
  distance?: number;
  decay?: number;
  cosOuter?: number;
  cosInner?: number;
  ground?: THREE.Color;
}

export class Raster {
  readonly colour: Float32Array;
  readonly depth: Float64Array;
  constructor(readonly W: number, readonly H: number) {
    this.colour = new Float32Array(W * H * 3);
    this.depth = new Float64Array(W * H);
  }

  clear(r = 0, g = 0, b = 0): void {
    for (let i = 0; i < this.W * this.H; i++) {
      this.colour[i * 3] = r;
      this.colour[i * 3 + 1] = g;
      this.colour[i * 3 + 2] = b;
    }
    this.clearDepth();
  }

  clearDepth(): void {
    this.depth.fill(0);
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    camera.updateProjectionMatrix();
    if (scene.background instanceof THREE.Color) {
      // Only paints where nothing has been drawn this pass (we treat it as clear).
      this.clear(scene.background.r, scene.background.g, scene.background.b);
    }
    const lights = collectLights(scene);
    const fog = scene.fog;
    const view = camera.matrixWorldInverse;
    const proj = camera.projectionMatrix;
    const vp = new THREE.Matrix4().multiplyMatrices(proj, view);
    const camPos = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);
    const opaque: THREE.Object3D[] = [];
    const transparent: THREE.Object3D[] = [];
    scene.traverseVisible((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (!m || Array.isArray(m)) return;
      if (!(o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Sprite)) return;
      if (m.visible === false) return;
      if (m.transparent || m.blending === THREE.AdditiveBlending || o instanceof THREE.Sprite) transparent.push(o);
      else opaque.push(o);
    });
    for (const o of opaque) this.drawObject(o, vp, view, camPos, lights, fog, camera);
    const tmp = new THREE.Vector3();
    transparent.sort((a, b) => {
      const da = tmp.setFromMatrixPosition(a.matrixWorld).distanceToSquared(camPos);
      const db = tmp.setFromMatrixPosition(b.matrixWorld).distanceToSquared(camPos);
      return db - da;
    });
    for (const o of transparent) this.drawObject(o, vp, view, camPos, lights, fog, camera);
  }

  private drawObject(
    o: THREE.Object3D,
    vp: THREE.Matrix4,
    view: THREE.Matrix4,
    camPos: THREE.Vector3,
    lights: LightInfo[],
    fog: THREE.Fog | THREE.FogExp2 | null,
    camera: THREE.PerspectiveCamera,
  ): void {
    if (o instanceof THREE.Points) return this.drawPoints(o, vp, camera);
    if (o instanceof THREE.Sprite) return this.drawSprite(o, view, camera);
    const mesh = o as THREE.Mesh;
    const geo = mesh.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute | undefined;
    if (!pos || pos.count === 0) return;
    const mat = mesh.material as THREE.Material & {
      color?: THREE.Color;
      map?: THREE.Texture | null;
      vertexColors?: boolean;
      emissive?: THREE.Color;
      emissiveIntensity?: number;
      opacity: number;
      alphaTest: number;
      side: THREE.Side;
    };
    const preview = mesh.userData.preview as PreviewShader | undefined;
    if (mat instanceof THREE.ShaderMaterial && !preview) return;
    const nor = geo.attributes.normal as THREE.BufferAttribute | undefined;
    const col = mat.vertexColors ? (geo.attributes.color as THREE.BufferAttribute | undefined) : undefined;
    const uv = geo.attributes.uv as THREE.BufferAttribute | undefined;
    const index = geo.index;
    const triCount = index ? index.count / 3 : pos.count / 3;
    if ((mesh as THREE.InstancedMesh).isInstancedMesh && !mesh.userData.__instancePass) {
      const im = mesh as THREE.InstancedMesh;
      const saved = im.matrixWorld.clone();
      const inst = new THREE.Matrix4();
      im.userData.__instancePass = true;
      for (let i = 0; i < im.count; i++) {
        im.getMatrixAt(i, inst);
        im.matrixWorld.multiplyMatrices(saved, inst);
        this.drawObject(im, vp, view, camPos, lights, fog, camera);
      }
      im.userData.__instancePass = false;
      im.matrixWorld.copy(saved);
      return;
    }
    const mw = mesh.matrixWorld;
    const nm = new THREE.Matrix3().getNormalMatrix(mw);
    const mvp = new THREE.Matrix4().multiplyMatrices(vp, mw);
    const unlit = mat instanceof THREE.MeshBasicMaterial || mat instanceof THREE.SpriteMaterial;
    const additive = mat.blending === THREE.AdditiveBlending;
    const blendOn = mat.transparent || additive;
    const depthWrite = mat.depthWrite !== false && !blendOn;
    const depthTest = mat.depthTest !== false;
    const baseCol = mat.color ? mat.color.clone() : new THREE.Color(1, 1, 1);
    const emissive = mat.emissive ? mat.emissive.clone().multiplyScalar(mat.emissiveIntensity ?? 1) : null;
    const tex = mat.map ? textureSampler(mat.map) : null;
    const W = this.W;
    const H = this.H;
    const clip: number[][] = [[], [], []];
    const wp = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const v4 = new THREE.Vector4();
    const n = new THREE.Vector3();
    const e1 = new THREE.Vector3();
    const e2 = new THREE.Vector3();
    const centroid = new THREE.Vector3();
    const c = new THREE.Color();
    const shaded = new THREE.Color();
    for (let t = 0; t < triCount; t++) {
      const ia = index ? index.getX(t * 3) : t * 3;
      const ib = index ? index.getX(t * 3 + 1) : t * 3 + 1;
      const ic = index ? index.getX(t * 3 + 2) : t * 3 + 2;
      const ids = [ia, ib, ic];
      for (let k = 0; k < 3; k++) {
        const id = ids[k]!;
        v4.set(pos.getX(id), pos.getY(id), pos.getZ(id), 1).applyMatrix4(mvp);
        const uu = uv ? uv.getX(id) : 0;
        const vv = uv ? uv.getY(id) : 0;
        clip[k] = [v4.x, v4.y, v4.z, v4.w, uu, vv];
        wp[k]!.set(pos.getX(id), pos.getY(id), pos.getZ(id)).applyMatrix4(mw);
      }
      // Face normal in world space (geometry normal if present, else from winding).
      if (nor) {
        n.set(nor.getX(ia), nor.getY(ia), nor.getZ(ia)).applyMatrix3(nm).normalize();
      } else {
        e1.subVectors(wp[1]!, wp[0]!);
        e2.subVectors(wp[2]!, wp[0]!);
        n.crossVectors(e1, e2).normalize();
      }
      centroid.copy(wp[0]!).add(wp[1]!).add(wp[2]!).multiplyScalar(1 / 3);
      // Back-face culling via winding in clip space handled after projection.
      const poly = clipNear(clip);
      if (poly.length < 3) continue;
      const scr = poly.map((p) => {
        const iw = 1 / p[3]!;
        return [(p[0]! * iw * 0.5 + 0.5) * W, (1 - (p[1]! * iw * 0.5 + 0.5)) * H, iw, p[4]! * iw, p[5]! * iw];
      });
      // Winding.
      const area = (scr[1]![0]! - scr[0]![0]!) * (scr[2]![1]! - scr[0]![1]!) - (scr[2]![0]! - scr[0]![0]!) * (scr[1]![1]! - scr[0]![1]!);
      const front = area < 0;
      if (mat.side === THREE.FrontSide && !front) continue;
      if (mat.side === THREE.BackSide && front) continue;
      const nn = front || mat.side === THREE.FrontSide ? n : n.clone().negate();
      // Base colour.
      c.copy(baseCol);
      if (col) {
        c.r *= col.getX(ia);
        c.g *= col.getY(ia);
        c.b *= col.getZ(ia);
      }
      let alpha = mat.opacity;
      let out: [number, number, number, number] | null = null;
      if (preview) {
        out = preview({
          world: centroid,
          normal: nn,
          colour: c,
          camera: camPos,
          attr: (name) => {
            const a = geo.attributes[name] as THREE.BufferAttribute | undefined;
            if (!a) return [0, 0, 0, 0];
            return [a.getX(ia), a.itemSize > 1 ? a.getY(ia) : 0, a.itemSize > 2 ? a.getZ(ia) : 0, a.itemSize > 3 ? a.getW(ia) : 1];
          },
        });
      }
      if (!unlit) shade(shaded.setRGB(1, 1, 1), centroid, nn, lights);
      const lr = shaded.r;
      const lg = shaded.g;
      const lb = shaded.b;
      for (let k = 1; k < scr.length - 1; k++) {
        this.fillTri(scr[0]!, scr[k]!, scr[k + 1]!, (u, v) => {
          let r = c.r;
          let g = c.g;
          let b = c.b;
          let a = alpha;
          if (tex) {
            const s = tex(u, v);
            if (mat.alphaTest > 0 && s[3] < mat.alphaTest) return null;
            r *= s[0];
            g *= s[1];
            b *= s[2];
            a *= s[3];
          }
          if (out) return [out[0], out[1], out[2], out[3]];
          if (!unlit) {
            r *= lr;
            g *= lg;
            b *= lb;
            if (emissive) {
              r += emissive.r;
              g += emissive.g;
              b += emissive.b;
            }
          }
          if (fog) {
            const d = centroid.distanceTo(camPos);
            const f = fog instanceof THREE.Fog ? THREE.MathUtils.clamp((d - fog.near) / (fog.far - fog.near), 0, 1) : 1 - Math.exp(-Math.pow((fog as THREE.FogExp2).density * d, 2));
            r = r * (1 - f) + fog.color.r * f;
            g = g * (1 - f) + fog.color.g * f;
            b = b * (1 - f) + fog.color.b * f;
          }
          return [r, g, b, a];
        }, depthTest, depthWrite, blendOn, additive);
      }
    }
  }

  private fillTri(
    a: number[],
    b: number[],
    c: number[],
    shadeFn: (u: number, v: number) => [number, number, number, number] | null,
    depthTest: boolean,
    depthWrite: boolean,
    blendOn: boolean,
    additive: boolean,
  ): void {
    const W = this.W;
    const H = this.H;
    const minX = Math.max(0, Math.floor(Math.min(a[0]!, b[0]!, c[0]!)));
    const maxX = Math.min(W - 1, Math.ceil(Math.max(a[0]!, b[0]!, c[0]!)));
    const minY = Math.max(0, Math.floor(Math.min(a[1]!, b[1]!, c[1]!)));
    const maxY = Math.min(H - 1, Math.ceil(Math.max(a[1]!, b[1]!, c[1]!)));
    if (minX > maxX || minY > maxY) return;
    const area = (b[0]! - a[0]!) * (c[1]! - a[1]!) - (c[0]! - a[0]!) * (b[1]! - a[1]!);
    if (Math.abs(area) < 1e-12) return;
    const inv = 1 / area;
    let cached: [number, number, number, number] | null | undefined;
    const needsUV = true;
    for (let y = minY; y <= maxY; y++) {
      const py = y + 0.5;
      for (let x = minX; x <= maxX; x++) {
        const px = x + 0.5;
        const w0 = ((b[0]! - px) * (c[1]! - py) - (c[0]! - px) * (b[1]! - py)) * inv;
        const w1 = ((c[0]! - px) * (a[1]! - py) - (a[0]! - px) * (c[1]! - py)) * inv;
        const w2 = 1 - w0 - w1;
        if (w0 < -1e-9 || w1 < -1e-9 || w2 < -1e-9) continue;
        const iw = w0 * a[2]! + w1 * b[2]! + w2 * c[2]!;
        const k = y * W + x;
        if (depthTest && iw <= this.depth[k]!) continue;
        let s: [number, number, number, number] | null;
        if (needsUV) {
          const u = (w0 * a[3]! + w1 * b[3]! + w2 * c[3]!) / iw;
          const v = (w0 * a[4]! + w1 * b[4]! + w2 * c[4]!) / iw;
          s = shadeFn(u, v);
        } else {
          if (cached === undefined) cached = shadeFn(0, 0);
          s = cached;
        }
        if (!s) continue;
        const o = k * 3;
        if (additive) {
          this.colour[o] += s[0] * s[3];
          this.colour[o + 1] += s[1] * s[3];
          this.colour[o + 2] += s[2] * s[3];
        } else if (blendOn) {
          this.colour[o] = this.colour[o]! * (1 - s[3]) + s[0] * s[3];
          this.colour[o + 1] = this.colour[o + 1]! * (1 - s[3]) + s[1] * s[3];
          this.colour[o + 2] = this.colour[o + 2]! * (1 - s[3]) + s[2] * s[3];
        } else {
          this.colour[o] = s[0];
          this.colour[o + 1] = s[1];
          this.colour[o + 2] = s[2];
        }
        if (depthWrite) this.depth[k] = iw;
      }
    }
  }

  private drawPoints(p: THREE.Points, vp: THREE.Matrix4, camera: THREE.PerspectiveCamera): void {
    const geo = p.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const mat = p.material as THREE.PointsMaterial;
    const custom = (p.material as THREE.Material) instanceof THREE.ShaderMaterial;
    const sizeAttr = geo.attributes.size as THREE.BufferAttribute | undefined;
    const col = mat.vertexColors || custom ? (geo.attributes.color as THREE.BufferAttribute | undefined) : undefined;
    const focal = camera.projectionMatrix.elements[5]!;
    const mvp = new THREE.Matrix4().multiplyMatrices(vp, p.matrixWorld);
    const v4 = new THREE.Vector4();
    const additive = mat.blending === THREE.AdditiveBlending;
    const range = geo.drawRange;
    const count = Math.min(pos.count, range.count === Infinity ? pos.count : range.start + range.count);
    const scale = this.H / 2;
    for (let i = range.start; i < count; i++) {
      v4.set(pos.getX(i), pos.getY(i), pos.getZ(i), 1).applyMatrix4(mvp);
      if (v4.w <= camera.near) continue;
      const iw = 1 / v4.w;
      const sx = (v4.x * iw * 0.5 + 0.5) * this.W;
      const sy = (1 - (v4.y * iw * 0.5 + 0.5)) * this.H;
      let size = custom ? sizeAttr!.getX(i) * scale * focal / v4.w : mat.size;
      if (!custom && mat.sizeAttenuation) size *= scale / v4.w;
      size = Math.max(1, size);
      let r = custom ? 1 : mat.color.r;
      let g = custom ? 1 : mat.color.g;
      let b = custom ? 1 : mat.color.b;
      let a = custom ? 1 : mat.opacity;
      if (col) {
        r *= col.getX(i);
        g *= col.getY(i);
        b *= col.getZ(i);
        if (col.itemSize === 4) a *= col.getW(i);
      }
      const half = size / 2;
      const x0 = Math.max(0, Math.floor(sx - half));
      const x1 = Math.min(this.W - 1, Math.floor(sx + half - 1e-6));
      const y0 = Math.max(0, Math.floor(sy - half));
      const y1 = Math.min(this.H - 1, Math.floor(sy + half - 1e-6));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const k = y * this.W + x;
          if (mat.depthTest !== false && iw <= this.depth[k]!) continue;
          const o = k * 3;
          if (additive) {
            this.colour[o] += r * a;
            this.colour[o + 1] += g * a;
            this.colour[o + 2] += b * a;
          } else {
            this.colour[o] = this.colour[o]! * (1 - a) + r * a;
            this.colour[o + 1] = this.colour[o + 1]! * (1 - a) + g * a;
            this.colour[o + 2] = this.colour[o + 2]! * (1 - a) + b * a;
          }
        }
      }
    }
  }

  private drawSprite(s: THREE.Sprite, view: THREE.Matrix4, camera: THREE.PerspectiveCamera): void {
    const mat = s.material as THREE.SpriteMaterial;
    const centre = new THREE.Vector3().setFromMatrixPosition(s.matrixWorld).applyMatrix4(view);
    if (centre.z > -camera.near) return;
    const sc = new THREE.Vector3().setFromMatrixScale(s.matrixWorld);
    const f = 1 / Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const depth = -centre.z;
    const sx = ((centre.x * f) / camera.aspect / depth * 0.5 + 0.5) * this.W;
    const sy = (1 - ((centre.y * f) / depth * 0.5 + 0.5)) * this.H;
    const hw = ((sc.x * f) / camera.aspect / depth) * 0.5 * this.W * 0.5;
    const hh = ((sc.y * f) / depth) * 0.5 * this.H * 0.5;
    const tex = mat.map ? textureSampler(mat.map) : null;
    const additive = mat.blending === THREE.AdditiveBlending;
    const iw = 1 / depth;
    const rot = mat.rotation ?? 0;
    const cr = Math.cos(rot);
    const sr = Math.sin(rot);
    const ext = Math.max(hw, hh) * 1.42;
    for (let y = Math.max(0, Math.floor(sy - ext)); y <= Math.min(this.H - 1, Math.ceil(sy + ext)); y++) {
      for (let x = Math.max(0, Math.floor(sx - ext)); x <= Math.min(this.W - 1, Math.ceil(sx + ext)); x++) {
        const dx = x + 0.5 - sx;
        const dy = y + 0.5 - sy;
        const lx = (dx * cr - dy * sr) / hw;
        const ly = (dx * sr + dy * cr) / hh;
        if (Math.abs(lx) > 1 || Math.abs(ly) > 1) continue;
        const k = y * this.W + x;
        if (mat.depthTest !== false && iw <= this.depth[k]!) continue;
        let r = mat.color.r;
        let g = mat.color.g;
        let b = mat.color.b;
        let a = mat.opacity;
        if (tex) {
          const t = tex(lx * 0.5 + 0.5, 1 - (ly * 0.5 + 0.5));
          r *= t[0];
          g *= t[1];
          b *= t[2];
          a *= t[3];
        }
        const o = k * 3;
        if (additive) {
          this.colour[o] += r * a;
          this.colour[o + 1] += g * a;
          this.colour[o + 2] += b * a;
        } else {
          this.colour[o] = this.colour[o]! * (1 - a) + r * a;
          this.colour[o + 1] = this.colour[o + 1]! * (1 - a) + g * a;
          this.colour[o + 2] = this.colour[o + 2]! * (1 - a) + b * a;
        }
      }
    }
  }

  /** Cheap bloom: threshold, blur at quarter resolution, add back. */
  bloom(strength: number, threshold = 1.0): void {
    if (strength <= 0) return;
    const W = this.W;
    const H = this.H;
    const s = 4;
    const w = Math.ceil(W / s);
    const h = Math.ceil(H / s);
    let buf = new Float32Array(w * h * 3);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const o = (y * W + x) * 3;
        const l = Math.max(this.colour[o]!, this.colour[o + 1]!, this.colour[o + 2]!);
        if (l <= threshold) continue;
        const k = (l - threshold) / l;
        const t = (Math.floor(y / s) * w + Math.floor(x / s)) * 3;
        buf[t] += (this.colour[o]! * k) / (s * s);
        buf[t + 1] += (this.colour[o + 1]! * k) / (s * s);
        buf[t + 2] += (this.colour[o + 2]! * k) / (s * s);
      }
    }
    const blur = (src: Float32Array, rad: number): Float32Array => {
      const tmp = new Float32Array(src.length);
      const out = new Float32Array(src.length);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        let r = 0, g = 0, b = 0, n = 0;
        for (let d = -rad; d <= rad; d++) {
          const xx = Math.min(w - 1, Math.max(0, x + d));
          const o = (y * w + xx) * 3;
          r += src[o]!; g += src[o + 1]!; b += src[o + 2]!; n++;
        }
        const o = (y * w + x) * 3;
        tmp[o] = r / n; tmp[o + 1] = g / n; tmp[o + 2] = b / n;
      }
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        let r = 0, g = 0, b = 0, n = 0;
        for (let d = -rad; d <= rad; d++) {
          const yy = Math.min(h - 1, Math.max(0, y + d));
          const o = (yy * w + x) * 3;
          r += tmp[o]!; g += tmp[o + 1]!; b += tmp[o + 2]!; n++;
        }
        const o = (y * w + x) * 3;
        out[o] = r / n; out[o + 1] = g / n; out[o + 2] = b / n;
      }
      return out;
    };
    const b1 = blur(buf, 2);
    const b2 = blur(blur(b1, 6), 6);
    buf = b1;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const o = (y * W + x) * 3;
        const t = (Math.floor(y / s) * w + Math.floor(x / s)) * 3;
        for (let c = 0; c < 3; c++) this.colour[o + c] += (b1[t + c]! * 0.6 + b2[t + c]! * 1.6) * strength;
      }
    }
  }

  toBytes(exposure = 1, overlay?: (x: number, y: number, rgb: [number, number, number]) => [number, number, number]): Uint8Array {
    const out = new Uint8Array(this.W * this.H * 3);
    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        const o = (y * this.W + x) * 3;
        let rgb = aces(this.colour[o]!, this.colour[o + 1]!, this.colour[o + 2]!, exposure);
        rgb = [toSRGB(rgb[0]), toSRGB(rgb[1]), toSRGB(rgb[2])];
        if (overlay) rgb = overlay(x, y, rgb);
        for (let c = 0; c < 3; c++) out[o + c] = Math.round(Math.min(1, Math.max(0, rgb[c]!)) * 255);
      }
    }
    return out;
  }

  toPNG(file: string, exposure = 1, overlay?: (x: number, y: number, rgb: [number, number, number]) => [number, number, number]): void {
    const W = this.W;
    const H = this.H;
    const raw = Buffer.alloc((W * 3 + 1) * H);
    for (let y = 0; y < H; y++) {
      raw[y * (W * 3 + 1)] = 0;
      for (let x = 0; x < W; x++) {
        const o = (y * W + x) * 3;
        let rgb = aces(this.colour[o]!, this.colour[o + 1]!, this.colour[o + 2]!, exposure);
        rgb = [toSRGB(rgb[0]), toSRGB(rgb[1]), toSRGB(rgb[2])];
        if (overlay) rgb = overlay(x, y, rgb);
        const p = y * (W * 3 + 1) + 1 + x * 3;
        raw[p] = Math.round(Math.min(1, Math.max(0, rgb[0])) * 255);
        raw[p + 1] = Math.round(Math.min(1, Math.max(0, rgb[1])) * 255);
        raw[p + 2] = Math.round(Math.min(1, Math.max(0, rgb[2])) * 255);
      }
    }
    writeFileSync(file, encodePNG(W, H, raw));
  }
}

function clipNear(tri: number[][]): number[][] {
  const eps = 1e-5;
  const out: number[][] = [];
  for (let i = 0; i < tri.length; i++) {
    const a = tri[i]!;
    const b = tri[(i + 1) % tri.length]!;
    const da = a[3]! - eps;
    const db = b[3]! - eps;
    if (da >= 0) out.push(a);
    if (da >= 0 !== db >= 0) {
      const t = da / (da - db);
      out.push(a.map((v, k) => v + (b[k]! - v) * t));
    }
  }
  return out;
}

function collectLights(scene: THREE.Scene): LightInfo[] {
  const out: LightInfo[] = [];
  scene.traverseVisible((o) => {
    if (!(o instanceof THREE.Light)) return;
    const colour = o.color.clone().multiplyScalar(o.intensity);
    if (o instanceof THREE.AmbientLight) out.push({ kind: "amb", colour });
    else if (o instanceof THREE.HemisphereLight) out.push({ kind: "hemi", colour, ground: o.groundColor.clone().multiplyScalar(o.intensity) });
    else if (o instanceof THREE.DirectionalLight) {
      const p = new THREE.Vector3().setFromMatrixPosition(o.matrixWorld);
      const t = new THREE.Vector3().setFromMatrixPosition(o.target.matrixWorld);
      out.push({ kind: "dir", colour, dir: p.sub(t).normalize() });
    } else if (o instanceof THREE.SpotLight) {
      const p = new THREE.Vector3().setFromMatrixPosition(o.matrixWorld);
      const t = new THREE.Vector3().setFromMatrixPosition(o.target.matrixWorld);
      out.push({
        kind: "spot",
        colour,
        pos: p,
        dir: t.sub(p).normalize(),
        distance: o.distance,
        decay: o.decay,
        cosOuter: Math.cos(o.angle),
        cosInner: Math.cos(o.angle * (1 - o.penumbra)),
      });
    } else if (o instanceof THREE.PointLight) {
      out.push({ kind: "point", colour, pos: new THREE.Vector3().setFromMatrixPosition(o.matrixWorld), distance: o.distance, decay: o.decay });
    }
  });
  return out;
}

const L = new THREE.Vector3();
function shade(c: THREE.Color, p: THREE.Vector3, n: THREE.Vector3, lights: LightInfo[]): void {
  let r = 0;
  let g = 0;
  let b = 0;
  for (const l of lights) {
    let k = 0;
    if (l.kind === "amb") {
      r += l.colour.r; g += l.colour.g; b += l.colour.b;
      continue;
    }
    if (l.kind === "hemi") {
      const t = n.y * 0.5 + 0.5;
      r += l.ground!.r * (1 - t) + l.colour.r * t;
      g += l.ground!.g * (1 - t) + l.colour.g * t;
      b += l.ground!.b * (1 - t) + l.colour.b * t;
      continue;
    }
    if (l.kind === "dir") {
      k = Math.max(0, n.dot(l.dir!));
    } else {
      L.subVectors(l.pos!, p);
      const d = L.length();
      L.divideScalar(d);
      k = Math.max(0, n.dot(L));
      let att = 1 / Math.max(Math.pow(d, l.decay ?? 2), 0.01);
      if (l.distance && l.distance > 0) att *= Math.pow(Math.min(1, Math.max(0, 1 - Math.pow(d / l.distance, 4))), 2);
      k *= att;
      if (l.kind === "spot") {
        const cs = -L.dot(l.dir!);
        const s = THREE.MathUtils.smoothstep(cs, l.cosOuter!, l.cosInner!);
        k *= s;
      }
    }
    r += l.colour.r * k;
    g += l.colour.g * k;
    b += l.colour.b * k;
  }
  c.setRGB((c.r * r) / Math.PI, (c.g * g) / Math.PI, (c.b * b) / Math.PI);
}

const samplerCache = new WeakMap<THREE.Texture, (u: number, v: number) => [number, number, number, number]>();
function textureSampler(tex: THREE.Texture): (u: number, v: number) => [number, number, number, number] {
  const cached = samplerCache.get(tex);
  if (cached && !(tex as THREE.Texture & { __dirty?: boolean }).__dirty) return cached;
  const img = tex.image as { width: number; height: number; pixels?: Uint8ClampedArray; data?: Uint8ClampedArray | Float32Array };
  const data = img.pixels ?? img.data;
  const srgb = tex.colorSpace === THREE.SRGBColorSpace;
  const fn = (u: number, v: number): [number, number, number, number] => {
    if (!data) return [1, 1, 1, 1];
    let uu = u;
    let vv = v;
    if (tex.flipY) vv = 1 - vv;
    uu = Math.min(img.width - 1, Math.max(0, Math.floor(uu * img.width)));
    vv = Math.min(img.height - 1, Math.max(0, Math.floor(vv * img.height)));
    const k = (vv * img.width + uu) * 4;
    const isFloat = data instanceof Float32Array;
    const r = isFloat ? data[k]! : data[k]! / 255;
    const g = isFloat ? data[k + 1]! : data[k + 1]! / 255;
    const b = isFloat ? data[k + 2]! : data[k + 2]! / 255;
    const a = isFloat ? data[k + 3]! : data[k + 3]! / 255;
    return srgb ? [fromSRGB(r), fromSRGB(g), fromSRGB(b), a] : [r, g, b, a];
  };
  samplerCache.set(tex, fn);
  return fn;
}

function fromSRGB(c: number): number {
  return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}
function toSRGB(c: number): number {
  return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}

function aces(r: number, g: number, b: number, exposure: number): [number, number, number] {
  const e = exposure / 0.6;
  r *= e; g *= e; b *= e;
  const ir = 0.59719 * r + 0.35458 * g + 0.04823 * b;
  const ig = 0.076 * r + 0.90834 * g + 0.01566 * b;
  const ib = 0.0284 * r + 0.13383 * g + 0.83777 * b;
  const fit = (v: number) => (v * (v + 0.0245786) - 0.000090537) / (v * (0.983729 * v + 0.432951) + 0.238081);
  const fr = fit(ir);
  const fg = fit(ig);
  const fb = fit(ib);
  const or = 1.60475 * fr - 0.53108 * fg - 0.07367 * fb;
  const og = -0.10208 * fr + 1.10813 * fg - 0.00605 * fb;
  const ob = -0.00327 * fr - 0.07276 * fg + 1.07602 * fb;
  return [Math.min(1, Math.max(0, or)), Math.min(1, Math.max(0, og)), Math.min(1, Math.max(0, ob))];
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]!) & 255]! ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
export function writeRGB(file: string, W: number, H: number, rgb: Uint8Array): void {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 3 + 1)] = 0;
    for (let i = 0; i < W * 3; i++) raw[y * (W * 3 + 1) + 1 + i] = rgb[y * W * 3 + i]!;
  }
  writeFileSync(file, encodePNG(W, H, raw));
}

function encodePNG(W: number, H: number, raw: Buffer): Buffer {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

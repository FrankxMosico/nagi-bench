import * as THREE from "three";

/**
 * Shared uniform: pixels per world unit at distance 1 for the active camera.
 * The presentation layer refreshes it every frame from the canvas height and fov.
 */
export const fxUniforms = {
  uScale: { value: 600 },
};

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uScale / max(0.0001, -mv.z), 1.0, 512.0);
    #include <logdepthbuf_vertex>
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uSoft;
  varying vec3 vColor;
  varying float vAlpha;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec2 q = abs(gl_PointCoord - 0.5) * 2.0;
    float a = vAlpha;
    if (uSoft > 0.5) {
      // Square-ish soft puff: keeps the block silhouette but loses the hard edge.
      float d = max(q.x, q.y);
      a *= 1.0 - smoothstep(0.35, 1.0, d);
    }
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor * (uSoft > 0.5 ? 1.0 : 1.0), a);
  }
`;

export interface ParticleState {
  p: THREE.Vector3;
  c: THREE.Color;
  size: number;
  alpha: number;
}

export interface ParticleOptions {
  additive?: boolean;
  soft?: boolean;
  depthWrite?: boolean;
  depthTest?: boolean;
  renderOrder?: number;
}

/**
 * A pool of square points whose every attribute is recomputed from a pure
 * function of time, so scrubbing the timeline reproduces the exact frame.
 */
export class Particles {
  readonly points: THREE.Points;
  readonly count: number;
  private readonly geometry: THREE.BufferGeometry;
  private readonly pos: Float32Array;
  private readonly col: Float32Array;
  private readonly size: Float32Array;
  private readonly alpha: Float32Array;
  private readonly state: ParticleState = { p: new THREE.Vector3(), c: new THREE.Color(), size: 1, alpha: 1 };

  constructor(count: number, options: ParticleOptions = {}) {
    this.count = count;
    this.pos = new Float32Array(count * 3);
    this.col = new Float32Array(count * 3);
    this.size = new Float32Array(count);
    this.alpha = new Float32Array(count);
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(this.col, 3));
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(this.size, 1));
    this.geometry.setAttribute("aAlpha", new THREE.BufferAttribute(this.alpha, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { uScale: fxUniforms.uScale, uSoft: { value: options.soft ? 1 : 0 } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: options.depthWrite ?? false,
      depthTest: options.depthTest ?? true,
      blending: options.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    material.userData.preview = { kind: "points", additive: Boolean(options.additive), soft: Boolean(options.soft) };
    this.points = new THREE.Points(this.geometry, material);
    this.points.frustumCulled = false;
    this.points.renderOrder = options.renderOrder ?? 5;
  }

  /** `fn` fills the state for particle i and returns false to hide it. */
  update(fn: (i: number, s: ParticleState) => boolean): void {
    const s = this.state;
    for (let i = 0; i < this.count; i++) {
      s.size = 1;
      s.alpha = 1;
      const visible = fn(i, s);
      if (!visible || s.alpha <= 0.001) {
        this.alpha[i] = 0;
        this.size[i] = 0;
        this.pos[i * 3] = 0;
        this.pos[i * 3 + 1] = -1e5;
        this.pos[i * 3 + 2] = 0;
        continue;
      }
      this.pos[i * 3] = s.p.x;
      this.pos[i * 3 + 1] = s.p.y;
      this.pos[i * 3 + 2] = s.p.z;
      this.col[i * 3] = s.c.r;
      this.col[i * 3 + 1] = s.c.g;
      this.col[i * 3 + 2] = s.c.b;
      this.size[i] = s.size;
      this.alpha[i] = s.alpha;
    }
    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
  }

  hide(): void {
    this.update(() => false);
  }
}

/** Canvas helper that works with both a real browser canvas and the preview shim. */
export function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

/** Radial glow texture drawn pixel by pixel (no gradient API needed). */
export function glowTexture(size = 64, falloff = 2.2, square = 0): THREE.CanvasTexture {
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d")!;
  const img = ctx.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x + 0.5) / size * 2 - 1;
      const dy = (y + 0.5) / size * 2 - 1;
      const round = Math.sqrt(dx * dx + dy * dy);
      const box = Math.max(Math.abs(dx), Math.abs(dy));
      const d = round * (1 - square) + box * square;
      const a = Math.pow(Math.max(0, 1 - d), falloff);
      const i = (y * size + x) * 4;
      img.data[i] = 255;
      img.data[i + 1] = 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = Math.round(a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** A camera-facing additive glow sprite. */
export function glowSprite(colour: THREE.ColorRepresentation, size: number, intensity = 1, texture?: THREE.Texture): THREE.Sprite {
  const material = new THREE.SpriteMaterial({
    map: texture ?? sharedGlow(),
    color: new THREE.Color(colour).multiplyScalar(intensity),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.setScalar(size);
  return sprite;
}

let glowCache: THREE.CanvasTexture | null = null;
export function sharedGlow(): THREE.CanvasTexture {
  if (!glowCache) glowCache = glowTexture(64, 2.4);
  return glowCache;
}

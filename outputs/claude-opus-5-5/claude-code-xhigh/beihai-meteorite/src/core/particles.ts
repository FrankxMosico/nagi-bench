import * as THREE from "three";

/**
 * Square, voxel-like particles whose every position is recomputed each frame
 * from emitters that are pure functions of time. Point size is specified in
 * world metres and scaled by the camera's true focal length, so smoke and
 * gas read correctly through a 0.05° telescopic sight as well as in close-up.
 */

/** Registry so the renderer can update every layer's viewport scale. */
export const LAYERS: ParticleLayer[] = [];

export class ParticleLayer {
  readonly points: THREE.Points;
  private readonly pos: Float32Array;
  private readonly col: Float32Array;
  private readonly size: Float32Array;
  private n = 0;
  readonly material: THREE.ShaderMaterial;

  constructor(readonly max: number, blending: THREE.Blending = THREE.NormalBlending) {
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 4);
    this.size = new Float32Array(max);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("size", new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setDrawRange(0, 0);
    this.material = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 400 } },
      transparent: true,
      depthWrite: false,
      blending,
      vertexShader: `#include <common>
        #include <logdepthbuf_pars_vertex>
        attribute vec4 color; attribute float size;
        uniform float uScale;
        varying vec4 vColor;
        void main(){
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = max(1.0, size * uScale * projectionMatrix[1][1] / -mv.z);
          #include <logdepthbuf_vertex>
        }`,
      fragmentShader: `#include <logdepthbuf_pars_fragment>
        varying vec4 vColor;
        void main(){
          #include <logdepthbuf_fragment>
          if (vColor.a <= 0.003) discard;
          gl_FragColor = vColor;
        }`,
    });
    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    this.points.userData.particleLayer = this;
    LAYERS.push(this);
  }

  begin(): void {
    this.n = 0;
  }

  push(x: number, y: number, z: number, size: number, r: number, g: number, b: number, a: number): void {
    if (this.n >= this.max) return;
    const i = this.n++;
    this.pos[i * 3] = x;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = z;
    this.col[i * 4] = r;
    this.col[i * 4 + 1] = g;
    this.col[i * 4 + 2] = b;
    this.col[i * 4 + 3] = a;
    this.size[i] = size;
  }

  end(): void {
    const geo = this.points.geometry;
    geo.setDrawRange(0, this.n);
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    (geo.attributes.size as THREE.BufferAttribute).needsUpdate = true;
  }

  get count(): number {
    return this.n;
  }

  /** Half the drawing-buffer height in px; set once per frame by the stage. */
  setViewportHalfHeight(h: number): void {
    this.material.uniforms.uScale!.value = h;
  }
}

export function layer(max: number, blending: THREE.Blending = THREE.NormalBlending): ParticleLayer {
  return new ParticleLayer(max, blending);
}

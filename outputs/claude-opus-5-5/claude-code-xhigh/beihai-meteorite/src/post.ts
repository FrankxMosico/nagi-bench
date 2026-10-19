import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import type { World } from "./world";

/** Final display-space grade: tint, desaturation, vignette and fine grain. */
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uGrain: { value: 0.05 },
    uVignette: { value: 0.35 },
    uDesat: { value: 0 },
    uTint: { value: 0 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uGrain; uniform float uVignette; uniform float uDesat; uniform float uTint;
    varying vec2 vUv;
    float hash(vec2 p){ p = fract(p * vec2(443.897, 441.423)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(c, vec3(l), uDesat);
      vec3 warm = vec3(1.06, 1.0, 0.9);
      vec3 cool = vec3(0.92, 0.98, 1.07);
      c *= uTint >= 0.0 ? mix(vec3(1.0), warm, uTint) : mix(vec3(1.0), cool, -uTint);
      vec2 d = vUv - 0.5; d.x *= 1.6;
      c *= 1.0 - uVignette * smoothstep(0.25, 0.95, dot(d, d) * 2.2);
      float g = hash(vUv * 1024.0 + fract(uTime * 13.7) * 91.0) - 0.5;
      c += g * uGrain * (0.35 + 0.65 * (1.0 - l));
      gl_FragColor = vec4(c, 1.0);
    }`,
};

export interface Post {
  composer: EffectComposer;
  setSize(w: number, h: number): void;
  setPixelRatio(r: number): void;
  render(time: number): void;
}

export function createPost(renderer: THREE.WebGLRenderer, world: World): Post {
  const target = new THREE.WebGLRenderTarget(16, 16, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, target);
  const bgPass = new RenderPass(world.bg, world.bgCamera);
  const mainPass = new RenderPass(world.scene, world.camera);
  mainPass.clear = false;
  mainPass.clearDepth = true;
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.6, 0.5, 0.85);
  const output = new OutputPass();
  const grade = new ShaderPass(GradeShader);
  composer.addPass(bgPass);
  composer.addPass(mainPass);
  composer.addPass(bloom);
  composer.addPass(output);
  composer.addPass(grade);
  return {
    composer,
    setSize(w, h) {
      composer.setSize(w, h);
    },
    setPixelRatio(r) {
      composer.setPixelRatio(r);
    },
    render(time) {
      const fx = world.fx;
      renderer.toneMappingExposure = fx.exposure;
      bloom.strength = fx.bloom;
      bloom.radius = fx.bloomRadius;
      bloom.threshold = fx.bloomThreshold;
      bgPass.enabled = true;
      grade.uniforms.uTime!.value = time;
      grade.uniforms.uGrain!.value = fx.grain;
      grade.uniforms.uVignette!.value = fx.vignette;
      grade.uniforms.uDesat!.value = fx.desat;
      grade.uniforms.uTint!.value = fx.tint;
      composer.render();
    },
  };
}

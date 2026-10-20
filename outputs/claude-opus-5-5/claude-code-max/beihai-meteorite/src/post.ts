import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import type { FilmContext } from "./world/context";

/**
 * Picture pipeline: far layer (sky, planet, sun) → foreground set → bloom →
 * ACES tone map → a display-referred grade that owns the film look: vignette,
 * grain, fades, flashes, the rifle-scope mask and the tinnitus smear.
 */

const GradeShader = {
  name: "FilmGrade",
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1920, 804) },
    uExposure: { value: 1 },
    uSaturation: { value: 1 },
    uContrast: { value: 1 },
    uLift: { value: new THREE.Color(0, 0, 0) },
    uGain: { value: new THREE.Color(1, 1, 1) },
    uVignette: { value: 0.35 },
    uGrain: { value: 0.035 },
    uFade: { value: 0 },
    uFlash: { value: 0 },
    uFlashColor: { value: new THREE.Color(1, 0.95, 0.85) },
    uScope: { value: 0 },
    uScopeR: { value: 0.46 },
    uReticle: { value: 0 },
    uReticleOffset: { value: new THREE.Vector2(0, 0) },
    uBlur: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uRes;
    uniform float uExposure, uSaturation, uContrast, uVignette, uGrain, uFade, uFlash;
    uniform vec3 uLift, uGain, uFlashColor;
    uniform float uScope, uScopeR, uReticle, uBlur;
    uniform vec2 uReticleOffset;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

    vec3 sampleBlur(vec2 uv, float amt) {
      if (amt <= 0.001) return texture2D(tDiffuse, uv).rgb;
      vec2 px = amt * 6.0 / uRes;
      vec3 c = texture2D(tDiffuse, uv).rgb * 0.2;
      c += texture2D(tDiffuse, uv + vec2( px.x, 0.0)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(-px.x, 0.0)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(0.0,  px.y)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(0.0, -px.y)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + px).rgb * 0.1;
      c += texture2D(tDiffuse, uv - px).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(px.x, -px.y)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(-px.x, px.y)).rgb * 0.1;
      return c;
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uRes.x / uRes.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      vec3 col = sampleBlur(uv, uBlur);
      // a little chromatic fringe toward the rim of the scope glass
      if (uScope > 0.0) {
        float rr = length(p) / uScopeR;
        float fringe = smoothstep(0.75, 0.98, rr) * 0.004;
        col.r = sampleBlur(uv + (uv - 0.5) * fringe, uBlur).r;
        col.b = sampleBlur(uv - (uv - 0.5) * fringe, uBlur).b;
      }

      col *= uExposure;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      col = col * uGain + uLift * (1.0 - col);

      float d = length(p);
      col *= 1.0 - uVignette * pow(clamp((d - 0.32) / 0.78, 0.0, 1.0), 1.5);

      if (uScope > 0.0) {
        float r = length(p) / uScopeR;
        float mask = 1.0 - smoothstep(0.955, 1.0, r);
        float inner = 1.0 - 0.45 * smoothstep(0.55, 1.0, r);
        col *= mix(1.0, mask * inner, uScope);
        // reticle: thin cross with a gap, heavy posts, mil dots
        vec2 q = p - uReticleOffset;
        float lw = 1.25 / uRes.y;
        float thin = (1.0 - smoothstep(lw * 0.5, lw * 1.2, abs(q.y))) * step(0.012, abs(q.x));
        thin = max(thin, (1.0 - smoothstep(lw * 0.5, lw * 1.2, abs(q.x))) * step(0.012, abs(q.y)));
        float post = (1.0 - smoothstep(lw * 2.2, lw * 3.2, abs(q.y))) * step(uScopeR * 0.42, abs(q.x));
        post = max(post, (1.0 - smoothstep(lw * 2.2, lw * 3.2, abs(q.x))) * step(uScopeR * 0.42, abs(q.y)) * step(q.y, 0.0));
        float dots = 0.0;
        for (int k = 1; k <= 4; k++) {
          float s = float(k) * uScopeR * 0.085;
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q - vec2(s, 0.0))));
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q + vec2(s, 0.0))));
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q - vec2(0.0, s))));
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q + vec2(0.0, s))));
        }
        float ret = clamp(max(max(thin, post), dots), 0.0, 1.0) * uReticle * mask;
        col = mix(col, vec3(0.01, 0.012, 0.01), ret * 0.92);
      }

      float g = hash(uv * uRes + fract(uTime * 13.7) * 91.0) - 0.5;
      col += g * uGrain * (0.6 + 0.4 * (1.0 - l));
      col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));
      col *= 1.0 - clamp(uFade, 0.0, 1.0);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `,
};

export interface Post {
  composer: EffectComposer;
  render(time: number): void;
  setSize(w: number, h: number): void;
  setPixelRatio(r: number): void;
  /** Drop the bloom pass on GPUs that cannot keep up. */
  setBloomEnabled(on: boolean): void;
}

export function createPost(renderer: THREE.WebGLRenderer, ctx: FilmContext): Post {
  const composer = new EffectComposer(renderer);
  const backCam = new THREE.PerspectiveCamera(40, 2.39, 1, 20000);
  const empty = new THREE.Scene();
  const backPass = new RenderPass(empty, backCam);
  const mainPass = new RenderPass(ctx.scene, ctx.camera);
  mainPass.clear = false;
  mainPass.clearDepth = true;
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 256), 0.6, 0.45, 0.85);
  const output = new OutputPass();
  const grade = new ShaderPass(GradeShader);
  composer.addPass(backPass);
  composer.addPass(mainPass);
  composer.addPass(bloom);
  composer.addPass(output);
  composer.addPass(grade);
  const size = new THREE.Vector2();
  const q = new THREE.Quaternion();

  return {
    composer,
    setSize(w, h) {
      composer.setSize(w, h);
    },
    setPixelRatio(r) {
      composer.setPixelRatio(r);
    },
    setBloomEnabled(on) {
      bloom.enabled = on;
    },
    render(time) {
      const g = ctx.grade;
      renderer.getDrawingBufferSize(size);
      // far layer: same orientation and lens, camera fixed at the origin
      if (ctx.backdrop) {
        backPass.scene = ctx.backdrop;
        backCam.fov = ctx.camera.fov;
        backCam.aspect = ctx.camera.aspect;
        backCam.updateProjectionMatrix();
        backCam.position.set(0, 0, 0);
        ctx.camera.getWorldQuaternion(q);
        backCam.quaternion.copy(q);
        backCam.updateMatrixWorld(true);
      } else {
        backPass.scene = empty;
      }
      // a set with its own background colour must not wipe the far layer
      mainPass.scene = ctx.scene;
      mainPass.camera = ctx.camera;
      bloom.strength = g.bloomStrength;
      bloom.radius = g.bloomRadius;
      bloom.threshold = g.bloomThreshold;
      renderer.toneMappingExposure = g.toneExposure;
      const u = grade.uniforms;
      u.uTime!.value = time;
      (u.uRes!.value as THREE.Vector2).copy(size);
      u.uExposure!.value = g.exposure;
      u.uSaturation!.value = g.saturation;
      u.uContrast!.value = g.contrast;
      (u.uLift!.value as THREE.Color).copy(g.lift);
      (u.uGain!.value as THREE.Color).copy(g.gain);
      u.uVignette!.value = g.vignette;
      u.uGrain!.value = g.grain;
      u.uFade!.value = g.fade;
      u.uFlash!.value = g.flash;
      (u.uFlashColor!.value as THREE.Color).copy(g.flashColor);
      u.uScope!.value = g.scope;
      u.uScopeR!.value = g.scopeRadius;
      u.uReticle!.value = g.reticle;
      (u.uReticleOffset!.value as THREE.Vector2).copy(g.reticleOffset);
      u.uBlur!.value = g.blur;
      composer.render();
    },
  };
}

/**
 * A dim room with one bright strip overhead and a cold window to the side: what
 * the machined slugs, the pistol and the iron meteorites reflect indoors. Without
 * it, metal under a few point lights renders almost black.
 */
export function interiorEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c0b0a);
  const basic = (r: number, g: number, b: number) => new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b) });
  const strip = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 2.4), basic(6, 5.7, 5.2));
  strip.position.set(0, 9, 0);
  const floor = new THREE.Mesh(new THREE.BoxGeometry(40, 0.5, 40), basic(0.09, 0.08, 0.07));
  floor.position.set(0, -6, 0);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(40, 14, 0.5), basic(0.16, 0.15, 0.14));
  wall.position.set(0, 0, -14);
  const pane = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5, 7), basic(0.35, 0.45, 0.62));
  pane.position.set(14, 2, 0);
  scene.add(strip, floor, wall, pane);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(scene, 0.03).texture;
  pmrem.dispose();
  return env;
}

/** A tiny procedural environment so visors and metal have something to reflect. */
export function spaceEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x010103);
  const sun = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.75, 0.45).multiplyScalar(30) }));
  sun.position.set(0, -40, 9);
  const earth = new THREE.Mesh(new THREE.BoxGeometry(40, 2, 40), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.05, 0.1, 0.22) }));
  earth.position.set(0, -45, 0);
  const rim = new THREE.Mesh(new THREE.BoxGeometry(44, 1, 4), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.45, 0.2).multiplyScalar(2) }));
  rim.position.set(0, -43, 18);
  const hull = new THREE.Mesh(new THREE.BoxGeometry(60, 1, 60), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 0.55, 0.5) }));
  hull.position.set(0, 40, 0);
  scene.add(sun, earth, rim, hull);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(scene, 0.02).texture;
  pmrem.dispose();
  return env;
}

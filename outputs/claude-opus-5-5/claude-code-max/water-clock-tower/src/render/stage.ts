// 舞台：渲染器、天穹与星空、月光与灯火、地面、后期（辉光 + 暗角）。
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { POLAR } from '../sim/instruments';
import type { Palette } from './materials';

export interface Stage {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  composer: EffectComposer | null;
  stars: THREE.Points;
  starAxis: THREE.Vector3;
  lights: { key: THREE.DirectionalLight; hemi: THREE.HemisphereLight; lamps: THREE.PointLight[]; fill: THREE.DirectionalLight };
  bloom: UnrealBloomPass | null;
  vignette: ShaderPass | null;
  resize: () => void;
  render: () => void;
}

const VignetteShader = {
  uniforms: { tDiffuse: { value: null }, strength: { value: 0.38 }, fade: { value: 0 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float strength; uniform float fade; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv); vec2 d = vUv - 0.5; float v = smoothstep(0.9, 0.25, length(d * vec2(1.15, 1.0)));
      c.rgb *= mix(1.0 - strength, 1.0, v); c.rgb *= (1.0 - fade); gl_FragColor = c; }`,
};

/** 软件渲染（如无头浏览器的 SwiftShader）时自动降低画质，保证时间轴照常推进 */
export function detectSoftwareGL(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);
  } catch {
    return false;
  }
}

export function createStage(canvas: HTMLCanvasElement, pal: Palette, lite: boolean): Stage {
  const qs = new URLSearchParams(location.search);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, powerPreference: 'high-performance' });
  const res = qs.has('res') ? Number(qs.get('res')) : lite ? 0.55 : Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(res);
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = lite ? 1.15 : 1.05;
  renderer.shadowMap.enabled = !lite && !qs.has('noshadow');
  renderer.localClippingEnabled = true; // 剖视用的裁切平面
  renderer.shadowMap.type = lite ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x15142a, 0.02);
  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.05, 600);

  // 环境反射（程序化房间环境），给青铜与铁件以光泽（软件渲染时省略）
  if (!lite) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.32;
  }

  // ---- 天穹：渐变 + 地平线辉光 + 月晕 ----
  const moonDir = new THREE.Vector3(-0.55, 0.62, 0.56).normalize();
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { moonDir: { value: moonDir } },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vDir; uniform vec3 moonDir;
      void main(){
        float h = vDir.y;
        vec3 zen = vec3(0.012, 0.018, 0.05);
        vec3 mid = vec3(0.03, 0.055, 0.13);
        vec3 hor = vec3(0.16, 0.13, 0.22);
        vec3 col = mix(hor, mid, smoothstep(0.0, 0.25, h));
        col = mix(col, zen, smoothstep(0.25, 0.9, h));
        col = mix(col, vec3(0.02,0.018,0.025), smoothstep(0.0, -0.08, h));
        float m = max(dot(vDir, moonDir), 0.0);
        col += vec3(0.55, 0.6, 0.75) * pow(m, 900.0) * 3.0;   // 月盘
        col += vec3(0.25, 0.3, 0.45) * pow(m, 18.0) * 0.35;   // 月晕
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 48, 24), skyMat);
  sky.renderOrder = -10;
  scene.add(sky);

  // ---- 星空：绕北天极转动（与浑象同步）----
  const starAxis = new THREE.Vector3(POLAR.x, POLAR.y, POLAR.z).normalize();
  const nStar = 3200;
  const pos = new Float32Array(nStar * 3);
  const col = new Float32Array(nStar * 3);
  const size = new Float32Array(nStar);
  let seed = 9;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < nStar; i++) {
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    pos[i * 3] = r * Math.cos(th) * 350; pos[i * 3 + 1] = u * 350; pos[i * 3 + 2] = r * Math.sin(th) * 350;
    const w = 0.75 + rnd() * 0.25, warm = rnd();
    col[i * 3] = w; col[i * 3 + 1] = w * (0.9 + 0.1 * warm); col[i * 3 + 2] = w * (0.85 + 0.25 * (1 - warm));
    size[i] = rnd() < 0.95 ? 1.0 + rnd() * 1.6 : 2.8 + rnd() * 2.2;
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  sg.setAttribute('size', new THREE.BufferAttribute(size, 1));
  const starMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    fog: false,
    uniforms: { pr: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float size; attribute vec3 color; varying vec3 vC; varying float vA; uniform float pr;
      void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv;
        vec3 wp = normalize((modelMatrix * vec4(position,1.0)).xyz); vA = smoothstep(-0.02, 0.12, wp.y);
        gl_PointSize = size * pr; }`,
    fragmentShader: `varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC * 1.4, a * vA); }`,
  });
  const stars = new THREE.Points(sg, starMat);
  stars.renderOrder = -9;
  scene.add(stars);

  // ---- 地面 ----
  const ground = new THREE.Mesh(new THREE.CircleGeometry(120, 64), pal.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.62;
  ground.receiveShadow = true;
  scene.add(ground);

  // ---- 灯光 ----
  const hemi = new THREE.HemisphereLight(0x6f86c2, 0x2a1d14, lite ? 0.95 : 0.55);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xc9d6ff, 1.25); // 月光
  key.position.set(moonDir.x * 40, moonDir.y * 40, moonDir.z * 40);
  key.target.position.set(0, 4, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(lite ? 1024 : 2048, lite ? 1024 : 2048);
  key.shadow.camera.left = -9; key.shadow.camera.right = 9;
  key.shadow.camera.top = 12; key.shadow.camera.bottom = -6;
  key.shadow.camera.near = 10; key.shadow.camera.far = 80;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xffc28a, 0.35); // 暖色补光（来自右后方的灯火）
  fill.position.set(12, 8, -10);
  scene.add(fill);
  // 室内灯火：照亮机构
  const lamps: THREE.PointLight[] = [];
  const lampAt = (x: number, y: number, z: number, i: number) => {
    const l = new THREE.PointLight(0xffb065, i, 10, 1.6);
    l.position.set(x, y, z);
    l.userData.base = i;
    scene.add(l);
    lamps.push(l);
  };
  lampAt(3.1, 4.2, 0.5, lite ? 8 : 6.5);   // 枢轮旁
  if (!lite) {
    lampAt(-0.45, 5.2, 3.3, 5);  // 木阁前檐下
    lampAt(-0.2, 4.35, 1.9, 0.7); // 木阁第二层内（照亮司辰木人）
    lampAt(0.6, 1.4, -1.2, 4);  // 天柱与地毂
    lampAt(-0.4, 7.4, 1.6, 4);  // 浑象室
  }

  // ---- 后期 ----
  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;
  let vignette: ShaderPass | null = null;
  if (!lite) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.42, 0.55, 0.82);
    composer.addPass(bloom);
    vignette = new ShaderPass(VignetteShader);
    composer.addPass(vignette);
    composer.addPass(new OutputPass());
  }

  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    composer?.setSize(w, h);
    bloom?.setSize(w, h);
  };
  window.addEventListener('resize', resize);

  return {
    renderer, scene, camera, composer, stars, starAxis,
    lights: { key, hemi, lamps, fill }, bloom, vignette, resize,
    render: () => (composer ? composer.render() : renderer.render(scene, camera)),
  };
}

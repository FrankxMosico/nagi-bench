// 天空（黄昏渐变 + 星空）、地面与灯光
import * as THREE from "three";
import { earthTexture, litMat, type Materials } from "./materials";
import { QUALITY } from "../quality";

export function buildEnvironment(scene: THREE.Scene, mats: Materials) {
  // ---------------------------------------------------------------- 天空
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      uniform float uTime;
      float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 horizon = vec3(0.93, 0.55, 0.32);
        vec3 mid = vec3(0.34, 0.27, 0.45);
        vec3 zenith = vec3(0.035, 0.06, 0.16);
        vec3 col = mix(horizon, mid, smoothstep(-0.02, 0.18, h));
        col = mix(col, zenith, smoothstep(0.15, 0.75, h));
        // 西侧（-X 方向）的余晖更亮
        float glow = pow(max(0.0, dot(d, normalize(vec3(-0.6, 0.05, -0.8)))), 6.0);
        col += vec3(1.0, 0.55, 0.25) * glow * 0.35 * (1.0 - smoothstep(0.0, 0.4, h));
        // 星星
        vec3 sp = d * 220.0;
        vec3 cell = floor(sp);
        float r = hash(cell);
        float star = step(0.985, r) * smoothstep(0.55, 0.0, length(fract(sp) - 0.5));
        float tw = 0.7 + 0.3 * sin(uTime * 2.0 + r * 60.0);
        col += vec3(0.9, 0.93, 1.0) * star * tw * smoothstep(0.12, 0.45, h) * 1.4;
        // 地平线以下融入地面雾色
        col = mix(col, vec3(0.16, 0.13, 0.15), smoothstep(0.0, -0.08, h));
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 48, 24), skyMat);
  sky.frustumCulled = false;
  sky.renderOrder = -1;
  scene.add(sky);

  scene.fog = new THREE.Fog(0x3a2c34, 45, 175);

  // ---------------------------------------------------------------- 地面
  const groundTex = earthTexture();
  groundTex.repeat.set(36, 36);
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(220, 64),
    litMat({ map: groundTex, color: "#8a8378", roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.62;
  ground.receiveShadow = true;
  scene.add(ground);
  void mats;

  // ---------------------------------------------------------------- 远山剪影（两层）
  const hills = (radius: number, height: number, color: number, seed: number) => {
    const seg = 160;
    const pos: number[] = [];
    let s = seed;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const ph = [rnd() * 6, rnd() * 6, rnd() * 6];
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      const h = height * (0.45 + 0.3 * Math.sin(a * 3 + ph[0]) + 0.18 * Math.sin(a * 7 + ph[1]) + 0.1 * Math.sin(a * 17 + ph[2]));
      const x = Math.cos(a) * radius, z = Math.sin(a) * radius;
      pos.push(x, -0.6, z, x, -0.6 + Math.max(0.5, h), z);
    }
    const idx: number[] = [];
    for (let i = 0; i < seg; i++) {
      const k = i * 2;
      idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, fog: true }));
    scene.add(mesh);
  };
  hills(150, 16, 0x2a2436, 7);
  hills(110, 9, 0x231c24, 13);

  // ---------------------------------------------------------------- 灯光
  const hemi = new THREE.HemisphereLight(0x8a96c8, 0x3a2a20, 0.9);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffd2a0, 2.6);
  key.position.set(-16, 11, 11);
  key.target.position.set(-0.3, 4, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -10;
  key.shadow.camera.right = 10;
  key.shadow.camera.top = 12;
  key.shadow.camera.bottom = -8;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 50;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.03;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0x7f9cff, 1.0);
  rim.position.set(10, 8, -14);
  scene.add(rim);
  // 不投影的侧面补光：照亮塔内（从左侧剖开处）的枢轮与擒纵机构
  if (!QUALITY.low) {
    const fill = new THREE.DirectionalLight(0xffe2c0, 0.9);
    fill.position.set(-12, 4, 3);
    scene.add(fill);
  }
  // 室内暖色补光（像灯笼）；低画质下省略点光源
  if (!QUALITY.low) {
    const lantern1 = new THREE.PointLight(0xffb060, 6, 9, 1.6);
    lantern1.position.set(-0.6, 3.6, 1.6);
    scene.add(lantern1);
    const lantern2 = new THREE.PointLight(0xffb060, 4, 8, 1.6);
    lantern2.position.set(0.5, 7.4, 1.2);
    scene.add(lantern2);
    const lantern3 = new THREE.PointLight(0xffc070, 3.0, 5, 1.5);
    lantern3.position.set(1.1, 1.8, 3.9);
    scene.add(lantern3);
  } else {
    hemi.intensity = 1.25;
  }

  return {
    update(t: number) {
      skyMat.uniforms.uTime.value = t;
    },
    key,
  };
}

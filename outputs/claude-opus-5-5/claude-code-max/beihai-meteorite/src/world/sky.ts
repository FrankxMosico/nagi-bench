import * as THREE from "three";
import { voxelSphere, buildVoxelGeometry } from "@agentbench/voxel-kit";
import { fbm3, hash1, mulberry32, vnoise3 } from "./util";
import { glowTexture } from "./fx";

/* ------------------------------------------------------------------ stars */

const starVert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize;
    #include <logdepthbuf_vertex>
  }
`;
const starFrag = /* glsl */ `
  uniform float uBright;
  varying vec3 vColor;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    gl_FragColor = vec4(vColor * uBright, 1.0);
  }
`;

export function makeStars(count = 5200, radius = 4000, seed = 7): THREE.Points {
  const rand = mulberry32(seed);
  const pos: number[] = [];
  const col: number[] = [];
  const size: number[] = [];
  const c = new THREE.Color();
  // Galactic plane tilted across the sky.
  const pole = new THREE.Vector3(0.35, 0.42, -0.84).normalize();
  for (let i = 0; i < count; i++) {
    let v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    if (v.lengthSq() < 1e-6 || v.lengthSq() > 1) {
      i--;
      continue;
    }
    v.normalize();
    const band = i > count * 0.55;
    if (band) {
      // squash toward the galactic plane
      const d = v.dot(pole);
      v.addScaledVector(pole, -d * (0.86 + rand() * 0.12)).normalize();
    }
    v.multiplyScalar(radius);
    pos.push(v.x, v.y, v.z);
    const m = rand();
    const bright = band ? 0.18 + m * 0.35 : Math.pow(m, 6) * 2.4 + 0.25;
    const temp = rand();
    c.setRGB(temp < 0.2 ? 1.0 : 0.82, temp < 0.2 ? 0.86 : 0.9, temp < 0.2 ? 0.72 : 1.0).multiplyScalar(bright);
    col.push(c.r, c.g, c.b);
    size.push(m > 0.985 ? 3 : m > 0.9 ? 2 : 1.4);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute("aSize", new THREE.Float32BufferAttribute(size, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uBright: { value: 1 } },
    vertexShader: starVert,
    fragmentShader: starFrag,
    depthWrite: false,
  });
  mat.userData.preview = { kind: "stars" };
  const points = new THREE.Points(g, mat);
  points.frustumCulled = false;
  points.renderOrder = -10;
  return points;
}

/* ------------------------------------------------------------------ earth */

export const EARTH_VOXELS = 56;

const earthVert = /* glsl */ `
  varying vec3 vColor;
  varying vec3 vN;
  varying vec3 vFaceN;
  varying vec3 vWorld;
  varying vec3 vLocal;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vColor = color;
    vLocal = position;
    vFaceN = normal;
    vec3 sphereN = normalize(position);
    vN = normalize(mat3(modelMatrix) * normalize(mix(normal, sphereN, 0.72)));
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
    #include <logdepthbuf_vertex>
  }
`;

const earthFrag = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunPower;
  uniform float uVoxel;
  uniform float uCity;
  uniform float uWrap;
  varying vec3 vColor;
  varying vec3 vN;
  varying vec3 vFaceN;
  varying vec3 vWorld;
  varying vec3 vLocal;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  float h3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  void main() {
    #include <logdepthbuf_fragment>
    vec3 N = normalize(vN);
    vec3 L = normalize(uSunDir);
    vec3 V = normalize(cameraPosition - vWorld);
    float ndl = dot(N, L);
    float ocean = step(vColor.r + 0.04, vColor.b) * step(vColor.g + 0.0, vColor.b + 0.03);
    float ice = step(0.7, min(vColor.r, min(vColor.g, vColor.b)));
    float land = clamp(1.0 - ocean - ice, 0.0, 1.0);
    // Wrapped light gives the backlit crescent some body.
    float wrapped = clamp((ndl + uWrap) / (1.0 + uWrap), 0.0, 1.0);
    float day = smoothstep(0.0, 0.5, wrapped);
    float term = smoothstep(0.0, 0.12, wrapped) * (1.0 - smoothstep(0.12, 0.34, wrapped));
    vec3 warm = mix(vec3(1.0, 0.42, 0.16), vec3(1.0, 0.95, 0.9), smoothstep(0.08, 0.42, wrapped));
    vec3 lit = vColor * wrapped * 1.35 * warm * uSunColor;
    lit += vec3(0.55, 0.16, 0.10) * term * 0.35 * (0.6 + ocean);
    // the sea as a mirror: hot glint near the terminator
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 26.0) * ocean;
    lit += spec * mix(vec3(1.0, 0.45, 0.18), vec3(1.0, 0.85, 0.65), day) * 2.2;
    // night side
    float night = 1.0 - smoothstep(-0.02, 0.22, wrapped);
    vec3 cell = floor(vLocal / uVoxel - vFaceN * 0.5);
    float hh = h3(cell);
    float city = land * step(0.84, hh) * night * uCity;
    vec3 col = lit * uSunPower + vColor * vec3(0.010, 0.014, 0.024) + city * vec3(1.0, 0.68, 0.32) * (0.5 + hh * 0.9);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const cloudFrag = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunPower;
  uniform float uWrap;
  varying vec3 vColor;
  varying vec3 vN;
  varying vec3 vFaceN;
  varying vec3 vWorld;
  varying vec3 vLocal;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec3 N = normalize(vN);
    float ndl = dot(N, normalize(uSunDir));
    float wrapped = clamp((ndl + uWrap) / (1.0 + uWrap), 0.0, 1.0);
    float term = smoothstep(0.0, 0.2, wrapped) * (1.0 - smoothstep(0.25, 0.7, wrapped));
    vec3 pink = vec3(1.0, 0.55, 0.62);
    vec3 col = vColor * wrapped * 1.4 * uSunColor;
    col = mix(col, col * pink * 1.6 + pink * 0.12, term);
    col = col * uSunPower + vec3(0.012, 0.014, 0.02);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const atmoVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vWorld;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vN = normalize(mat3(modelMatrix) * normalize(position));
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
    #include <logdepthbuf_vertex>
  }
`;
const atmoFrag = /* glsl */ `
  uniform vec3 uSunDir;
  uniform float uSunPower;
  uniform float uRing;
  uniform vec3 uSunColor;
  varying vec3 vN;
  varying vec3 vWorld;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec3 V = normalize(cameraPosition - vWorld);
    float rim = 1.0 - abs(dot(normalize(vN), V));
    float glow = pow(rim, 5.0);
    vec3 L = normalize(uSunDir);
    float fwd = pow(max(dot(-V, L), 0.0), 12.0);
    float side = max(dot(normalize(vN), L), 0.0);
    vec3 blue = vec3(0.18, 0.42, 1.0);
    vec3 fire = mix(vec3(1.0, 0.36, 0.12), vec3(1.0, 0.78, 0.5), fwd);
    float sunlit = smoothstep(-0.35, 0.35, dot(normalize(vN), L));
    vec3 col = blue * glow * (0.12 + sunlit * 0.55) * uSunPower;
    col += fire * glow * (fwd * 3.0 * uRing + side * 0.35) * uSunPower;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export interface Earth {
  group: THREE.Group;
  earthMat: THREE.ShaderMaterial;
  cloudMat: THREE.ShaderMaterial;
  atmoMat: THREE.ShaderMaterial;
  radius: number;
  setSun(dir: THREE.Vector3, power: number, colour: THREE.Color, ring?: number): void;
}

function earthColour(dir: THREE.Vector3): number {
  // Pole along +X: |x| is the sine of latitude.
  const lat = Math.asin(Math.max(-1, Math.min(1, dir.x)));
  const absLat = Math.abs(lat);
  // Continents: noise plus a few hand-placed masses so the visible face reads.
  let n = fbm3(dir.x * 1.9 + 11.3, dir.y * 1.9 + 4.2, dir.z * 1.9 - 7.7, 5);
  const blob = (cx: number, cy: number, cz: number, r: number, s: number) => {
    const d = Math.hypot(dir.x - cx, dir.y - cy, dir.z - cz);
    return Math.max(0, 1 - d / r) * s;
  };
  n += blob(0.45, 0.62, -0.55, 0.7, 0.32); // a large northern landmass
  n += blob(-0.35, 0.82, -0.2, 0.32, 0.22);
  n += blob(-0.05, 0.95, 0.15, 0.18, 0.18); // islands near the sub-station point
  n -= blob(0.0, 0.7, 0.68, 0.75, 0.3); // open ocean on the sunset side
  const landLevel = 0.6;
  if (absLat > 1.18) return 0xe9eef2;
  if (n > landLevel) {
    const h = (n - landLevel) * 6;
    if (absLat > 1.0) return 0xd8e0e4;
    const desert = Math.abs(absLat - 0.42) < 0.16 && vnoise3(dir.x * 5, dir.y * 5, dir.z * 5) > 0.45;
    if (desert) return h > 0.4 ? 0xb08a5a : 0xc4a06a;
    return h > 0.5 ? 0x5d6a3e : h > 0.25 ? 0x4c6a36 : 0x3f6b3a;
  }
  const depth = landLevel - n;
  if (depth < 0.025) return 0x2f7aa6;
  if (depth < 0.07) return 0x1d5a8e;
  return 0x123f74;
}

export function makeEarth(radiusWorld: number): Earth {
  const R = EARTH_VOXELS;
  const voxel = radiusWorld / R;
  const tmp = new THREE.Vector3();
  const span = Math.ceil(R) * 2;
  const centre = span / 2;
  const earthGeo = voxelSphere(
    R,
    (x, y, z, d) => {
      if (d < 0.9) return 0x0b1f3a;
      tmp.set(x + 0.5 - centre, y + 0.5 - centre, z + 0.5 - centre).normalize();
      return earthColour(tmp);
    },
    { voxel },
  );
  const uniforms = {
    uSunDir: { value: new THREE.Vector3(0, -1, 0) },
    uSunColor: { value: new THREE.Color(1, 1, 1) },
    uSunPower: { value: 1 },
    uVoxel: { value: voxel },
    uCity: { value: 1 },
    uWrap: { value: 0.42 },
  };
  const earthMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: earthVert,
    fragmentShader: earthFrag,
    vertexColors: true,
  });
  earthMat.userData.preview = { kind: "earth" };
  const earth = new THREE.Mesh(earthGeo, earthMat);

  // Cloud shell: one voxel above the surface.
  const cloudR = R + 1.2;
  const cspan = Math.ceil(cloudR) * 2;
  const cc = cspan / 2;
  const cloudGeo = buildVoxelGeometry(
    {
      size: [cspan, cspan, cspan],
      at(x, y, z) {
        const dx = x + 0.5 - cc;
        const dy = y + 0.5 - cc;
        const dz = z + 0.5 - cc;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d > cloudR || d < cloudR - 1.0) return null;
        const nx = dx / d;
        const ny = dy / d;
        const nz = dz / d;
        const lat = Math.abs(nx);
        const band = 0.5 + 0.5 * Math.cos(lat * 9.0);
        const n = fbm3(nx * 3.3 + 2.1, ny * 3.3 - 5.4, nz * 3.3 + 9.9, 4) + band * 0.08;
        if (n < 0.63) return null;
        return hash1(x * 3 + y * 7 + z * 11) > 0.5 ? 0xf3f5f7 : 0xe3e8ee;
      },
    },
    { voxel },
  );
  const cloudMat = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: uniforms.uSunDir,
      uSunColor: uniforms.uSunColor,
      uSunPower: uniforms.uSunPower,
      uWrap: { value: 0.38 },
    },
    vertexShader: earthVert,
    fragmentShader: cloudFrag,
    vertexColors: true,
  });
  cloudMat.userData.preview = { kind: "clouds" };
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);

  const atmoGeo = voxelSphere(R + 1.35, 0xffffff, { voxel });
  const atmoMat = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: uniforms.uSunDir,
      uSunPower: uniforms.uSunPower,
      uSunColor: uniforms.uSunColor,
      uRing: { value: 1 },
    },
    vertexShader: atmoVert,
    fragmentShader: atmoFrag,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  atmoMat.userData.preview = { kind: "atmo" };
  const atmo = new THREE.Mesh(atmoGeo, atmoMat);
  atmo.renderOrder = 2;

  const group = new THREE.Group();
  group.add(earth, clouds, atmo);
  return {
    group,
    earthMat,
    cloudMat,
    atmoMat,
    radius: radiusWorld,
    setSun(dir, power, colour, ring = 1) {
      uniforms.uSunDir.value.copy(dir).normalize();
      uniforms.uSunPower.value = power;
      uniforms.uSunColor.value.copy(colour);
      atmoMat.uniforms.uRing!.value = ring;
    },
  };
}

/* -------------------------------------------------------------------- sun */

export interface Sun {
  group: THREE.Group;
  core: THREE.Mesh;
  glow: THREE.Sprite;
  halo: THREE.Sprite;
  streak: THREE.Mesh;
  set(pos: THREE.Vector3, colour: THREE.Color, intensity: number, visible: number): void;
}

export function makeSun(radiusWorld: number): Sun {
  const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.95, 0.85).multiplyScalar(30) });
  const core = new THREE.Mesh(voxelSphere(4, 0xffffff, { voxel: radiusWorld / 4 }), coreMat);
  const tex = glowTexture(64, 2.6);
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, color: 0xffd9a0, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }),
  );
  glow.scale.setScalar(radiusWorld * 7);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture(64, 3.2), color: 0xffb070, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }),
  );
  halo.scale.setScalar(radiusWorld * 22);
  const streakMat = new THREE.MeshBasicMaterial({
    map: glowTexture(64, 1.6, 0),
    color: 0xffc890,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
  const streak = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), streakMat);
  streak.scale.set(radiusWorld * 34, radiusWorld * 0.5, 1);
  streak.renderOrder = 20;
  const group = new THREE.Group();
  group.add(core, halo, glow, streak);
  return {
    group,
    core,
    glow,
    halo,
    streak,
    set(pos, colour, intensity, visible) {
      group.position.copy(pos);
      coreMat.color.copy(colour).multiplyScalar(30 * intensity);
      (glow.material as THREE.SpriteMaterial).color.copy(colour).multiplyScalar(1.6 * intensity);
      (halo.material as THREE.SpriteMaterial).color.copy(colour).multiplyScalar(0.32 * intensity);
      streakMat.color.copy(colour).multiplyScalar(0.45 * intensity * visible);
      streak.visible = visible > 0.01;
    },
  };
}

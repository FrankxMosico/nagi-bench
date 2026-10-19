import * as THREE from "three";
import { voxelSphere } from "@agentbench/voxel-kit";
import { fbm3, mix, mulberry32, sat, smooth } from "../core/anim";
import type { PreviewShader } from "../core/preview";

/**
 * The celestial layer, rendered in its own pass with a camera that shares the
 * shot camera's rotation but never its translation: Earth, sun and stars sit at
 * infinity, so 5 km of parallax between the shooter and the station never
 * shifts the planet.
 */

export const EARTH_DIR = new THREE.Vector3(-0.42, -0.3, 0.86).normalize();
const WORLD_UP = new THREE.Vector3(0, 1, 0);
/** Unit vector on the sky pointing from Earth's centre toward the sunset point. */
export const SUNSET_AXIS = WORLD_UP.clone().sub(EARTH_DIR.clone().multiplyScalar(WORLD_UP.dot(EARTH_DIR))).normalize()
  .applyAxisAngle(EARTH_DIR, 0.5);

const EARTH_DIST = 1000;
const EARTH_VOX = 64;
const EARTH_R = 151;
export const EARTH_ANGLE = Math.asin(EARTH_R / EARTH_DIST);
const SUN_ANGLE = THREE.MathUtils.degToRad(0.62);
const SUN_DIST = 1150;

/** Sun direction for a sunset phase: 0 = lower limb touching, 1 = fully set. */
export function sunDirection(phase: number, out = new THREE.Vector3()): THREE.Vector3 {
  const theta = EARTH_ANGLE + SUN_ANGLE * (1 - 2 * phase) + 0.004;
  return out.copy(EARTH_DIR).multiplyScalar(Math.cos(theta)).addScaledVector(SUNSET_AXIS, Math.sin(theta)).normalize();
}

/** Fraction of the solar disc still above the limb. */
export function sunVisible(phase: number): number {
  const p = sat(phase);
  // Area of a circular segment, as fraction of the disc.
  const h = 1 - p * 2; // signed distance of centre above limb in radii
  const a = Math.acos(Math.max(-1, Math.min(1, -h)));
  return sat((a - Math.sin(2 * a) / 2) / Math.PI);
}

const LOGDEPTH_V_PARS = "#include <common>\n#include <logdepthbuf_pars_vertex>\n";
const LOGDEPTH_V = "#include <logdepthbuf_vertex>\n";
const LOGDEPTH_F_PARS = "#include <logdepthbuf_pars_fragment>\n";
const LOGDEPTH_F = "#include <logdepthbuf_fragment>\n";

function earthColour(x: number, y: number, z: number, d: number): { albedo: number; emit: number } {
  if (d < 0.9) return { albedo: 0, emit: 0 };
  const c = EARTH_VOX;
  const dx = x + 0.5 - c;
  const dy = y + 0.5 - c;
  const dz = z + 0.5 - c;
  const l = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
  const nx = dx / l;
  const ny = dy / l;
  const nz = dz / l;
  const cont = fbm3(nx * 2.1 + 3, ny * 2.1, nz * 2.1, 5, 11);
  const lat = Math.abs(ny);
  if (lat > 0.88 || (lat > 0.8 && cont > 0.47)) return { albedo: 0xe8eef2, emit: 0 };
  if (cont < 0.515) {
    const shallow = smooth((cont - 0.46) / 0.055);
    const deep = 0x0a2650;
    const mid = 0x12407a;
    const albedo = shallow > 0.7 ? 0x1f5f8e : shallow > 0.3 ? mid : deep;
    return { albedo, emit: 0x0000ff };
  }
  const moist = fbm3(nx * 4 + 9, ny * 4, nz * 4, 3, 5);
  const high = cont > 0.6;
  let albedo: number;
  if (high) albedo = moist > 0.5 ? 0x6b6450 : 0x7d6f58;
  else if (lat < 0.42 && moist < 0.45) albedo = 0xb0925e;
  else if (moist > 0.55) albedo = 0x2f5a2c;
  else albedo = 0x55703a;
  // City lights: clustered, mostly temperate coasts and plains.
  const city = fbm3(nx * 14, ny * 14, nz * 14, 2, 23);
  const coast = cont < 0.56 ? 1 : 0.55;
  const band = lat > 0.12 && lat < 0.7 ? 1 : 0.25;
  const lights = city > 0.62 ? sat((city - 0.62) * 6) * coast * band : 0;
  const emit = Math.round(lights * 255) << 16;
  return { albedo, emit };
}

export interface Sky {
  group: THREE.Group;
  earth: THREE.Group;
  uniforms: { uLight: { value: THREE.Vector3 }; uSun: { value: THREE.Vector3 }; uNight: { value: number }; uCenter: { value: THREE.Vector3 }; uGlow: { value: number } };
  update(phase: number, opts?: { starGain?: number }): void;
  setVisible(v: boolean): void;
}

export function buildSky(): Sky {
  const group = new THREE.Group();
  group.name = "sky";

  // ---------------------------------------------------------- stars
  const rand = mulberry32(42);
  const layers: Array<{ n: number; size: number; gain: number }> = [
    { n: 5200, size: 1.2, gain: 0.55 },
    { n: 1400, size: 2, gain: 0.9 },
    { n: 160, size: 3, gain: 1.6 },
  ];
  const starMats: THREE.PointsMaterial[] = [];
  const band = new THREE.Vector3(0.3, 0.9, -0.3).normalize();
  for (const layer of layers) {
    const pos: number[] = [];
    const col: number[] = [];
    for (let i = 0; i < layer.n; i++) {
      let v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
      if (v.lengthSq() > 1 || v.lengthSq() < 0.01) {
        i--;
        continue;
      }
      v.normalize();
      // Half the faint stars crowd a galactic band.
      if (layer.size < 1.5 && rand() < 0.5) {
        const off = v.dot(band);
        v = v.sub(band.clone().multiplyScalar(off * 0.85)).normalize();
      }
      pos.push(v.x * 9000, v.y * 9000, v.z * 9000);
      const t = rand();
      const c = t < 0.15 ? [0.75, 0.85, 1.25] : t < 0.3 ? [1.2, 1.0, 0.75] : [1, 1, 1];
      const b = layer.gain * (0.35 + rand() * 0.65);
      col.push(c[0]! * b, c[1]! * b, c[2]! * b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: layer.size, sizeAttenuation: false, vertexColors: true, depthWrite: false });
    starMats.push(mat);
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    group.add(pts);
  }

  // ---------------------------------------------------------- earth
  const earth = new THREE.Group();
  const centre = EARTH_DIR.clone().multiplyScalar(EARTH_DIST);
  earth.position.copy(centre);
  group.add(earth);
  const voxel = EARTH_R / EARTH_VOX;
  const albedoGeo = voxelSphere(EARTH_VOX, (x, y, z, d) => earthColour(x, y, z, d).albedo, { voxel });
  const emitGeo = voxelSphere(EARTH_VOX, (x, y, z, d) => earthColour(x, y, z, d).emit, { voxel });
  albedoGeo.setAttribute("emission", emitGeo.getAttribute("color"));
  emitGeo.dispose();
  // Tilt the globe so the Pacific rim and East Asia face the shooter.
  const tilt = new THREE.Euler(0.35, 2.4, 0.2);
  albedoGeo.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(tilt));

  const uniforms = {
    uLight: { value: new THREE.Vector3() },
    uSun: { value: new THREE.Vector3() },
    uNight: { value: 1 },
    uCenter: { value: centre.clone() },
    uGlow: { value: 1 },
  };

  const earthMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `${LOGDEPTH_V_PARS}
      attribute vec3 emission;
      varying vec3 vColor; varying vec3 vEmit; varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vRadial;
      uniform vec3 uCenter;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vRadial = normalize(w.xyz - uCenter);
        vColor = color; vEmit = emission;
        gl_Position = projectionMatrix * viewMatrix * w;
        ${LOGDEPTH_V}
      }`,
    fragmentShader: `${LOGDEPTH_F_PARS}
      uniform vec3 uLight; uniform vec3 uSun; uniform float uNight;
      varying vec3 vColor; varying vec3 vEmit; varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vRadial;
      void main(){
        ${LOGDEPTH_F}
        vec3 N = normalize(vRadial + vNormalW * 0.32);
        float ndl = dot(N, uLight);
        float lit = max(ndl, 0.0);
        float term = (1.0 - smoothstep(0.0, 0.5, ndl)) * smoothstep(-0.12, 0.05, ndl);
        vec3 lightCol = mix(vec3(1.0, 0.96, 0.9), vec3(1.0, 0.42, 0.16), term);
        vec3 col = vColor * lightCol * (lit * 1.25 + term * 0.25);
        vec3 V = normalize(cameraPosition - vWorld);
        vec3 H = normalize(uLight + V);
        float glint = pow(max(dot(normalize(vRadial + vNormalW * 0.1), H), 0.0), 38.0) * vEmit.b * smoothstep(-0.02, 0.2, ndl);
        col += glint * mix(vec3(1.2, 0.95, 0.7), vec3(1.6, 0.6, 0.2), term) * 2.2;
        float night = 1.0 - smoothstep(-0.22, 0.08, ndl);
        col += vEmit.r * night * uNight * vec3(1.0, 0.6, 0.26) * 1.6;
        col += vColor * 0.012;
        gl_FragColor = vec4(col, 1.0);
      }`,
    vertexColors: true,
  });
  const earthMesh = new THREE.Mesh(albedoGeo, earthMat);
  earth.add(earthMesh);

  // Clouds: a sparse shell two voxels above the ground.
  const cloudGeo = voxelSphere(
    EARTH_VOX + 2,
    (x, y, z, d) => {
      if (d < 0.975) return null;
      const c = EARTH_VOX + 2;
      const dx = x + 0.5 - c;
      const dy = y + 0.5 - c;
      const dz = z + 0.5 - c;
      const l = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const v = fbm3((dx / l) * 3.2 + 7, (dy / l) * 5.5, (dz / l) * 3.2, 4, 77);
      return v > 0.56 ? 0xffffff : null;
    },
    { voxel },
  );
  cloudGeo.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(tilt));
  const cloudMat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `${LOGDEPTH_V_PARS}
      varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vRadial;
      uniform vec3 uCenter;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vRadial = normalize(w.xyz - uCenter);
        gl_Position = projectionMatrix * viewMatrix * w;
        ${LOGDEPTH_V}
      }`,
    fragmentShader: `${LOGDEPTH_F_PARS}
      uniform vec3 uLight;
      varying vec3 vWorld; varying vec3 vNormalW; varying vec3 vRadial;
      void main(){
        ${LOGDEPTH_F}
        vec3 N = normalize(vRadial + vNormalW * 0.4);
        float ndl = dot(N, uLight);
        float lit = max(ndl, 0.0);
        float term = (1.0 - smoothstep(0.0, 0.55, ndl)) * smoothstep(-0.15, 0.04, ndl);
        vec3 c = mix(vec3(1.0), vec3(1.0, 0.55, 0.62), term) * (lit * 1.3 + term * 0.55);
        float a = 0.82 * smoothstep(-0.25, 0.05, ndl) + 0.08;
        gl_FragColor = vec4(c + vec3(0.01, 0.012, 0.02), a);
      }`,
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);
  earth.add(clouds);

  // Atmosphere: hollow voxel shell, additive, brightest at the limb and toward the sun.
  const atmoGeo = voxelSphere(EARTH_VOX + 4, (_x, _y, _z, d) => (d > 0.986 ? 0xffffff : null), { voxel });
  const atmoMat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `${LOGDEPTH_V_PARS}
      varying vec3 vWorld; varying vec3 vRadial;
      uniform vec3 uCenter;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        vRadial = normalize(w.xyz - uCenter);
        gl_Position = projectionMatrix * viewMatrix * w;
        ${LOGDEPTH_V}
      }`,
    fragmentShader: `${LOGDEPTH_F_PARS}
      uniform vec3 uLight; uniform vec3 uSun; uniform float uGlow;
      varying vec3 vWorld; varying vec3 vRadial;
      void main(){
        ${LOGDEPTH_F}
        vec3 V = normalize(cameraPosition - vWorld);
        float rim = 1.0 - max(dot(vRadial, V), 0.0);
        rim = pow(rim, 3.0);
        float day = smoothstep(-0.35, 0.45, dot(vRadial, uLight));
        float fwd = pow(max(dot(-V, uSun), 0.0), 900.0);
        vec3 blue = vec3(0.25, 0.5, 1.0);
        vec3 warm = vec3(1.0, 0.45, 0.15);
        vec3 c = mix(warm, blue, smoothstep(0.0, 0.6, dot(vRadial, uLight))) * rim * (0.015 + day * 0.55);
        c += vec3(1.0, 0.62, 0.3) * fwd * 2.2 * uGlow * rim;
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const atmo = new THREE.Mesh(atmoGeo, atmoMat);
  earth.add(atmo);

  // ---------------------------------------------------------- sun
  const sun = new THREE.Group();
  group.add(sun);
  const sunVox = (SUN_DIST * Math.tan(SUN_ANGLE)) / 5;
  const sunDisc = new THREE.Mesh(
    voxelSphere(5, 0xffffff, { voxel: sunVox }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(24, 20, 15) }),
  );
  sun.add(sunDisc);
  const glowTex = radialTexture(128, (r) => Math.pow(sat(1 - r), 2.2));
  const haloTex = radialTexture(128, (r) => Math.pow(sat(1 - r), 4) * 0.8 + Math.pow(sat(1 - r), 1.2) * 0.2);
  const rayTex = starburstTexture(256);
  const mkSprite = (tex: THREE.Texture, size: number, colour: THREE.Color) => {
    const m = new THREE.SpriteMaterial({ map: tex, color: colour, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    const s = new THREE.Sprite(m);
    s.scale.setScalar(size);
    sun.add(s);
    return s;
  };
  const core = mkSprite(glowTex, 60, new THREE.Color(3.0, 2.4, 1.7));
  const halo = mkSprite(haloTex, 300, new THREE.Color(0.45, 0.28, 0.15));
  const rays = mkSprite(rayTex, 560, new THREE.Color(1.3, 1.0, 0.7));
  const preview: PreviewShader = earthPreview(uniforms);
  earthMesh.userData.preview = preview;
  clouds.userData.preview = cloudPreview(uniforms);
  atmo.userData.preview = atmoPreview(uniforms);

  const tmp = new THREE.Vector3();
  const sky: Sky = {
    group,
    earth,
    uniforms,
    update(phase, opts = {}) {
      const p = sat(phase);
      const sDir = sunDirection(p, tmp);
      sun.position.copy(sDir).multiplyScalar(SUN_DIST);
      uniforms.uSun.value.copy(sDir);
      // Shading light: exaggerated phase angle so the lit crescent reads.
      const psi = THREE.MathUtils.degToRad(mix(104, 176, smooth(p) * smooth(p)));
      const V = EARTH_DIR.clone().negate();
      uniforms.uLight.value.copy(V.multiplyScalar(Math.cos(psi)).addScaledVector(SUNSET_AXIS, Math.sin(psi)).normalize());
      const vis = sunVisible(p);
      uniforms.uGlow.value = 0.25 + vis;
      uniforms.uNight.value = mix(0.55, 1.2, smooth(p));
      const s = Math.pow(vis, 0.6);
      core.material.opacity = 0.25 + 0.75 * s;
      core.scale.setScalar(36 + 34 * s);
      halo.material.opacity = 0.15 + 0.85 * s;
      rays.material.opacity = Math.pow(vis, 0.9);
      rays.material.rotation = 0.12 + p * 0.05;
      sunDisc.visible = vis > 0.001;
      const sg = opts.starGain ?? 1;
      starMats.forEach((m) => m.color.setScalar(sg));
    },
    setVisible(v) {
      group.visible = v;
    },
  };
  sky.update(0);
  return sky;
}

function radialTexture(n: number, f: (r: number) => number): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = n;
  canvas.height = n;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(n, n);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const dx = (x + 0.5) / n - 0.5;
      const dy = (y + 0.5) / n - 0.5;
      const r = Math.sqrt(dx * dx + dy * dy) * 2;
      const v = Math.round(sat(f(r)) * 255);
      const k = (y * n + x) * 4;
      img.data[k] = img.data[k + 1] = img.data[k + 2] = 255;
      img.data[k + 3] = v;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

/** Diffraction spikes: thin rays at fixed angles over a soft core. */
function starburstTexture(n: number): THREE.Texture {
  return radialTextureXY(n, (dx, dy) => {
    const r = Math.sqrt(dx * dx + dy * dy) * 2;
    const a = Math.atan2(dy, dx);
    let v = Math.pow(sat(1 - r), 6) * 0.6;
    for (let k = 0; k < 6; k++) {
      const ang = (k * Math.PI) / 3;
      const d = Math.abs(Math.sin(a - ang));
      v += Math.pow(sat(1 - d * 60), 2) * Math.pow(sat(1 - r), 1.6) * 0.55;
    }
    // Horizontal anamorphic streak.
    v += Math.pow(sat(1 - Math.abs(dy) * 90), 2) * Math.pow(sat(1 - Math.abs(dx) * 2), 1.5) * 0.5;
    return v;
  });
}

function radialTextureXY(n: number, f: (dx: number, dy: number) => number): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = n;
  canvas.height = n;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(n, n);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const v = Math.round(sat(f((x + 0.5) / n - 0.5, (y + 0.5) / n - 0.5)) * 255);
      const k = (y * n + x) * 4;
      img.data[k] = img.data[k + 1] = img.data[k + 2] = 255;
      img.data[k + 3] = v;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

export { radialTexture, radialTextureXY };

// ------------------------------------------------------------ preview shading
// JS mirrors of the shaders above, used only by the offline frame previewer.

type U = Sky["uniforms"];
const _n = new THREE.Vector3();
const _r = new THREE.Vector3();
const _v = new THREE.Vector3();
const _h = new THREE.Vector3();

function earthPreview(u: U): PreviewShader {
  return ({ world, normal, colour, camera, attr }) => {
    const emit = attr("emission");
    _r.copy(world).sub(u.uCenter.value).normalize();
    _n.copy(_r).addScaledVector(normal, 0.32).normalize();
    const ndl = _n.dot(u.uLight.value);
    const lit = Math.max(ndl, 0);
    const term = THREE.MathUtils.smoothstep(-ndl, -0.5, 0) * THREE.MathUtils.smoothstep(ndl, -0.12, 0.05);
    const lc = [1, 0.96 - 0.54 * term, 0.9 - 0.74 * term];
    const k = lit * 1.25 + term * 0.25;
    let r = colour.r * lc[0]! * k + colour.r * 0.012;
    let g = colour.g * lc[1]! * k + colour.g * 0.012;
    let b = colour.b * lc[2]! * k + colour.b * 0.012;
    _v.copy(camera).sub(world).normalize();
    _h.copy(u.uLight.value).add(_v).normalize();
    const ocean = emit[2]!;
    const gl = Math.pow(Math.max(_n.dot(_h), 0), 38) * ocean * THREE.MathUtils.smoothstep(ndl, -0.02, 0.2) * 2.2;
    r += gl * (1.2 + 0.4 * term);
    g += gl * (0.95 - 0.35 * term);
    b += gl * (0.7 - 0.5 * term);
    const night = THREE.MathUtils.smoothstep(-ndl, -0.08, 0.22);
    const city = emit[0]!;
    r += city * night * u.uNight.value * 1.6;
    g += city * night * u.uNight.value * 0.96;
    b += city * night * u.uNight.value * 0.4;
    return [r, g, b, 1];
  };
}

function cloudPreview(u: U): PreviewShader {
  return ({ world, normal }) => {
    _r.copy(world).sub(u.uCenter.value).normalize();
    _n.copy(_r).addScaledVector(normal, 0.4).normalize();
    const ndl = _n.dot(u.uLight.value);
    const lit = Math.max(ndl, 0);
    const term = THREE.MathUtils.smoothstep(-ndl, -0.55, 0) * THREE.MathUtils.smoothstep(ndl, -0.15, 0.04);
    const k = lit * 1.3 + term * 0.55;
    const a = 0.82 * THREE.MathUtils.smoothstep(ndl, -0.25, 0.05) + 0.08;
    return [k + 0.01, (1 - 0.45 * term) * k + 0.012, (1 - 0.38 * term) * k + 0.02, a];
  };
}

function atmoPreview(u: U): PreviewShader {
  return ({ world, camera }) => {
    _r.copy(world).sub(u.uCenter.value).normalize();
    _v.copy(camera).sub(world).normalize();
    const rim = Math.pow(1 - Math.max(_r.dot(_v), 0), 3);
    const dl = _r.dot(u.uLight.value);
    const day = THREE.MathUtils.smoothstep(dl, -0.35, 0.45);
    const fwd = Math.pow(Math.max(-_v.dot(u.uSun.value), 0), 900);
    const m = THREE.MathUtils.smoothstep(dl, 0, 0.6);
    const base = rim * (0.015 + day * 0.55);
    const r = (1 - m * 0.75) * base + fwd * 2.2 * u.uGlow.value * rim;
    const g = (0.45 + m * 0.05) * base + fwd * 1.36 * u.uGlow.value * rim;
    const b = (0.15 + m * 0.85) * base + fwd * 0.66 * u.uGlow.value * rim;
    return [r, g, b, 1];
  };
}

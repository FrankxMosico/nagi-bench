import * as THREE from "three";
import {
  buildVoxelGeometry,
  voxelModel,
  voxelSphere,
  type VoxelModelSpec,
} from "@agentbench/voxel-kit";

export type Vec3 = [number, number, number];

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function smooth01(v: number): number {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
}

export function range(v: number, start: number, end: number): number {
  if (end <= start) return v >= end ? 1 : 0;
  return clamp01((v - start) / (end - start));
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function vec(a: Vec3, b: Vec3, t: number, out = new THREE.Vector3()): THREE.Vector3 {
  return out.set(mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t));
}

export function pulse(t: number, start: number, duration: number): number {
  if (t < start || t > start + duration) return 0;
  const x = (t - start) / duration;
  return Math.sin(Math.PI * clamp01(x));
}

/* ------------------------------------------------------------------ */
/* Procedural surface library. Everything is drawn to a tiny canvas.   */
/* ------------------------------------------------------------------ */

type Painter = (ctx: CanvasRenderingContext2D, size: number, rng: () => number) => void;

const textureCache = new Map<string, THREE.Texture>();

function texture(key: string, painter: Painter, repeat: [number, number] = [1, 1]): THREE.Texture {
  const cached = textureCache.get(key);
  if (cached) return cached;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rng = mulberry32(hashString(key));
  painter(ctx, size, rng);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeat[0], repeat[1]);
  map.magFilter = THREE.NearestFilter;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.anisotropy = 4;
  textureCache.set(key, map);
  return map;
}

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function speckle(ctx: CanvasRenderingContext2D, size: number, rng: () => number, count: number, alpha: number, light = true) {
  for (let i = 0; i < count; i++) {
    const a = alpha * rng();
    ctx.fillStyle = light ? `rgba(255,245,220,${a})` : `rgba(0,0,0,${a})`;
    const s = rng() > 0.84 ? 2 : 1;
    ctx.fillRect(Math.floor(rng() * size), Math.floor(rng() * size), s, s);
  }
}

export function woodTexture(key: string, base: string, dark: string, light: string, repeat: [number, number] = [2, 2]) {
  return texture(
    `wood-${key}`,
    (ctx, size, rng) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, size, size);
      for (let y = 0; y < size; y += 3) {
        ctx.fillStyle = rng() > 0.55 ? dark : light;
        ctx.globalAlpha = 0.08 + rng() * 0.18;
        ctx.fillRect(0, y + Math.floor(rng() * 2), size, 1 + Math.floor(rng() * 2));
      }
      for (let i = 0; i < 30; i++) {
        ctx.globalAlpha = 0.05 + rng() * 0.13;
        ctx.fillStyle = rng() > 0.5 ? dark : light;
        ctx.fillRect(Math.floor(rng() * size), Math.floor(rng() * size), 2 + Math.floor(rng() * 9), 1);
      }
      ctx.globalAlpha = 1;
      speckle(ctx, size, rng, 90, 0.035);
    },
    repeat,
  );
}

export function concreteTexture(key: string, base: string, dark: string, light: string, repeat: [number, number] = [2, 2]) {
  return texture(
    `concrete-${key}`,
    (ctx, size, rng) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 380; i++) {
        ctx.fillStyle = rng() > 0.52 ? dark : light;
        ctx.globalAlpha = 0.04 + rng() * 0.12;
        ctx.fillRect(Math.floor(rng() * size), Math.floor(rng() * size), 1 + Math.floor(rng() * 3), 1);
      }
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = dark;
      for (let y = 0; y < size; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(size, y + 0.5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    repeat,
  );
}

export function metalTexture(key: string, base: string, dark: string, light: string, repeat: [number, number] = [2, 2]) {
  return texture(
    `metal-${key}`,
    (ctx, size, rng) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 2) {
        ctx.fillStyle = rng() > 0.5 ? dark : light;
        ctx.globalAlpha = 0.035 + rng() * 0.11;
        ctx.fillRect(x, 0, 1, size);
      }
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "#000";
      for (let i = 0; i < 26; i++) ctx.fillRect(0, Math.floor(rng() * size), size, 1);
      ctx.globalAlpha = 1;
    },
    repeat,
  );
}

export function fabricTexture(key: string, base: string, dark: string, light: string, repeat: [number, number] = [2, 2]) {
  return texture(
    `fabric-${key}`,
    (ctx, size, rng) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = rng() > 0.5 ? dark : light;
        ctx.globalAlpha = 0.03 + rng() * 0.08;
        ctx.fillRect(Math.floor(rng() * size), Math.floor(rng() * size), 1, 1);
      }
      ctx.globalAlpha = 0.07;
      ctx.strokeStyle = dark;
      for (let y = 0; y < size; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    repeat,
  );
}

/* ------------------------------------------------------------------ */
/* Materials and primitive helpers.                                    */
/* ------------------------------------------------------------------ */

export interface SurfaceOptions {
  roughness?: number;
  metalness?: number;
  map?: THREE.Texture;
  emissive?: number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  side?: THREE.Side;
  depthWrite?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

const materialCache = new Map<string, THREE.MeshStandardMaterial>();

export function surface(color: number | string, options: SurfaceOptions = {}): THREE.MeshStandardMaterial {
  const key = [
    color,
    options.roughness ?? 0.88,
    options.metalness ?? 0,
    options.map?.uuid ?? "none",
    options.emissive ?? 0,
    options.emissiveIntensity ?? 0,
    options.transparent ?? false,
    options.opacity ?? 1,
    options.side ?? THREE.FrontSide,
    options.depthWrite ?? true,
  ].join("|");
  const cached = materialCache.get(key);
  if (cached) return cached;
  const material = new THREE.MeshStandardMaterial({
    // Procedural maps already carry their final albedo; the colour argument is
    // only a tint for untextured surfaces.
    color: options.map ? 0xffffff : color,
    map: options.map ?? null,
    roughness: options.roughness ?? 0.88,
    metalness: options.metalness ?? 0,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide,
    depthWrite: options.depthWrite ?? true,
  });
  materialCache.set(key, material);
  return material;
}

const unitBox = new THREE.BoxGeometry(1, 1, 1);

export function box(
  parent: THREE.Object3D,
  width: number,
  height: number,
  depth: number,
  color: number | string,
  x: number,
  y: number,
  z: number,
  options: SurfaceOptions = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(unitBox, surface(color, options));
  mesh.position.set(x, y, z);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? true;
  parent.add(mesh);
  return mesh;
}

export function glowBox(
  parent: THREE.Object3D,
  width: number,
  height: number,
  depth: number,
  color: number,
  x: number,
  y: number,
  z: number,
  opacity = 1,
): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(unitBox, material);
  mesh.position.set(x, y, z);
  mesh.scale.set(width, height, depth);
  parent.add(mesh);
  return mesh;
}

export function plane(
  parent: THREE.Object3D,
  width: number,
  height: number,
  color: number | string,
  x: number,
  y: number,
  z: number,
  options: SurfaceOptions & { rotation?: Vec3 } = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), surface(color, options));
  mesh.position.set(x, y, z);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  mesh.receiveShadow = options.receiveShadow ?? false;
  parent.add(mesh);
  return mesh;
}

export function textTexture(text: string, options: {
  background?: string;
  color?: string;
  font?: string;
  width?: number;
  height?: number;
  align?: CanvasTextAlign;
  padding?: number;
} = {}): THREE.CanvasTexture {
  const width = options.width ?? 512;
  const height = options.height ?? 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = options.background ?? "#171410";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = options.color ?? "#e8dfca";
  ctx.font = options.font ?? `500 ${Math.floor(height * 0.44)}px "Noto Serif CJK SC", serif`;
  ctx.textAlign = options.align ?? "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, options.align === "left" ? (options.padding ?? 24) : width / 2, height / 2);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.magFilter = THREE.LinearFilter;
  return map;
}

/* ------------------------------------------------------------------ */
/* Voxel props.                                                       */
/* ------------------------------------------------------------------ */

export function meteorGeometry(seed: number, radius = 4, pale = false): THREE.BufferGeometry {
  const rng = mulberry32(seed);
  const span = radius * 2 + 1;
  const center = span / 2;
  const noise = Array.from({ length: 29 }, () => rng() * 2 - 1);
  const base = pale ? [0x5c5b55, 0x77746a, 0x46453f] : [0x2c2a27, 0x444039, 0x1d1c1a];
  return buildVoxelGeometry(
    {
      size: [span, span, span],
      at(x, y, z) {
        const dx = x + 0.5 - center;
        const dy = y + 0.5 - center;
        const dz = z + 0.5 - center;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const wave =
          Math.sin((x + 1) * 1.31 + (y + 2) * 0.73) * 0.18 +
          Math.cos((z + 1) * 1.17 - y * 0.61) * 0.16 +
          noise[(x * 7 + y * 5 + z * 3) % noise.length] * 0.2;
        if (d > radius * (0.76 + wave)) return null;
        const shade = Math.floor((noise[(x * 3 + z * 11 + y) % noise.length] + 1) * 0.5 * 3) % 3;
        return base[shade];
      },
    },
    { voxel: 1, anchor: "center" },
  );
}

export function meteorMaterial(pale = false): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: pale ? 0.58 : 0.38,
    metalness: pale ? 0.45 : 0.78,
    envMapIntensity: 0.4,
  });
}

export function addMeteor(parent: THREE.Object3D, seed: number, radius: number, scale: number, x: number, y: number, z: number, pale = false): THREE.Mesh {
  const mesh = new THREE.Mesh(meteorGeometry(seed, radius, pale), meteorMaterial(pale));
  mesh.position.set(x, y, z);
  mesh.scale.setScalar(scale);
  mesh.rotation.set(seed * 0.71, seed * 1.13, seed * 0.37);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function cylinderVoxelGeometry(radius = 3, height = 8, color = 0x423b31): THREE.BufferGeometry {
  const span = radius * 2 + 1;
  const center = span / 2;
  return buildVoxelGeometry(
    {
      size: [span, height, span],
      at(x, y, z) {
        const dx = x + 0.5 - center;
        const dz = z + 0.5 - center;
        if (dx * dx + dz * dz > radius * radius) return null;
        const edge = Math.sqrt(dx * dx + dz * dz) / radius;
        const shade = edge > 0.75 ? 0x2d2924 : edge > 0.42 ? color : 0x5d5549;
        return shade;
      },
    },
    { voxel: 1, anchor: "center" },
  );
}

export function buildProp(spec: VoxelModelSpec, material: THREE.Material): THREE.Mesh {
  const geometry = voxelModel(spec);
  return new THREE.Mesh(geometry, material);
}

export function pistolModel(): { group: THREE.Group; scope: THREE.Group; muzzle: THREE.Object3D } {
  const rows = [
    "..###########",
    ".############",
    ".####ssss####",
    ".####....ggg.",
    "..###....ggg.",
    "..##.....ggg.",
    "...#.....ggg.",
    ".........ggg.",
  ];
  const side = rows.map((row) => row.padEnd(13, "."));
  const clean = voxelModel({
    palette: { "#": 0x25282b, g: 0x3b2d23, s: 0x777b79 },
    layers: [side, side, side],
    axis: "x",
    voxel: 0.019,
    anchor: "min",
  });
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.48, metalness: 0.72 });
  const gun = new THREE.Mesh(clean, mat);
  gun.name = "prop:pistol-body";
  gun.position.set(-0.0285, 0.0, -0.075);
  const group = new THREE.Group();
  group.name = "prop:pistol";
  group.add(gun);

  const scope = new THREE.Group();
  scope.name = "prop:scope";
  const scopeMat = surface(0x15191b, { roughness: 0.32, metalness: 0.7 });
  const tube = new THREE.Mesh(unitBox, scopeMat);
  tube.scale.set(0.042, 0.048, 0.185);
  tube.position.set(0, 0.185, 0.105);
  scope.add(tube);
  const lens = new THREE.Mesh(unitBox, surface(0x74d5c1, { emissive: 0x3a9f8c, emissiveIntensity: 1.6, roughness: 0.25 }));
  lens.scale.set(0.036, 0.036, 0.006);
  lens.position.set(0, 0.185, 0.2);
  scope.add(lens);
  group.add(scope);

  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0.125, 0.19);
  group.add(muzzle);
  return { group, scope, muzzle };
}

export function phoneModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "prop:phone";
  const body = new THREE.Mesh(unitBox, surface(0x0b0d10, { roughness: 0.25, metalness: 0.6 }));
  body.scale.set(0.085, 0.016, 0.16);
  group.add(body);
  const screenMat = surface(0x8cd3cf, { emissive: 0x63beb6, emissiveIntensity: 2.5, roughness: 0.2 });
  for (const side of [1, -1]) {
    const screen = new THREE.Mesh(unitBox, screenMat);
    screen.scale.set(0.073, 0.002, 0.145);
    screen.position.y = side * 0.009;
    group.add(screen);
  }
  return group;
}

export function caseModel(): THREE.Group {
  const group = new THREE.Group();
  const body = new THREE.Mesh(unitBox, surface(0x26231f, { roughness: 0.6, metalness: 0.25 }));
  body.scale.set(0.46, 0.12, 0.34);
  group.add(body);
  const handle = new THREE.Mesh(unitBox, surface(0x151412, { roughness: 0.65 }));
  handle.scale.set(0.13, 0.035, 0.035);
  handle.position.set(0, 0.082, 0);
  group.add(handle);
  for (const side of [-1, 1]) {
    const latch = new THREE.Mesh(unitBox, surface(0xa08d63, { roughness: 0.32, metalness: 0.82 }));
    latch.scale.set(0.035, 0.026, 0.012);
    latch.position.set(side * 0.13, 0.032, 0.176);
    group.add(latch);
  }
  return group;
}

export function clothMaterial(color = 0x8a806e): THREE.MeshStandardMaterial {
  return surface(color, {
    map: fabricTexture("beef-cloth", "#7a715f", "#5c5447", "#948a75", [2, 2]),
    roughness: 0.98,
  });
}

export function glowSprite(color: number, size: number, opacity = 0.8): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  const c = new THREE.Color(color);
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  gradient.addColorStop(0, `rgba(${r},${g},${b},1)`);
  gradient.addColorStop(0.18, `rgba(${r},${g},${b},0.8)`);
  gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.22)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: tex,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.setScalar(size);
  return sprite;
}

export function labelPlane(text: string, width: number, height: number, options: Parameters<typeof textTexture>[1] = {}): THREE.Mesh {
  const map = textTexture(text, options);
  const material = new THREE.MeshStandardMaterial({
    map,
    roughness: 0.72,
    metalness: 0.08,
    transparent: true,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
}

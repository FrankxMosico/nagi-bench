import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { buildVoxelGeometry, voxelMaterial } from "@agentbench/voxel-kit";

export const TAU = Math.PI * 2;
export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const clamp01 = (v: number): number => clamp(v, 0, 1);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const invLerp = (a: number, b: number, v: number): number => (v - a) / Math.max(1e-8, b - a);
export const smooth = (t: number): number => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - clamp01(t), 3);
export const easeInOutCubic = (t: number): number => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Deterministic value in [0,1) from an integer. */
export function hash01(n: number): number {
  let x = Math.floor(n) | 0;
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function valueNoise2(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash01(xi * 374761393 + yi * 668265263);
  const b = hash01((xi + 1) * 374761393 + yi * 668265263);
  const c = hash01(xi * 374761393 + (yi + 1) * 668265263);
  const d = hash01((xi + 1) * 374761393 + (yi + 1) * 668265263);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

export function fbm(x: number, y: number, octaves = 4): number {
  let value = 0;
  let amp = 0.5;
  let fx = x;
  let fy = y;
  for (let i = 0; i < octaves; i++) {
    value += valueNoise2(fx, fy) * amp;
    fx *= 2.02;
    fy *= 2.02;
    amp *= 0.5;
  }
  return value / (1 - Math.pow(0.5, octaves));
}

export interface TextureOptions {
  nearest?: boolean;
  repeat?: [number, number];
  colorSpace?: THREE.ColorSpace;
  anisotropy?: number;
}

export function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
  options: TextureOptions = {},
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  ctx.imageSmoothingEnabled = options.nearest ?? false;
  draw(ctx, canvas);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  if (options.repeat) texture.repeat.set(options.repeat[0], options.repeat[1]);
  texture.colorSpace = options.colorSpace ?? THREE.SRGBColorSpace;
  if (options.nearest) {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
  } else {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
  }
  texture.anisotropy = options.anisotropy ?? 4;
  return texture;
}

export function woodTexture(base = "#493422", repeat: [number, number] = [4, 5]): THREE.CanvasTexture {
  const rng = mulberry32(7301);
  return canvasTexture(
    128,
    128,
    (ctx) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 128, 128);
      for (let p = 0; p < 4; p++) {
        const y0 = p * 32;
        ctx.fillStyle = p % 2 ? "rgba(255,214,156,.045)" : "rgba(0,0,0,.08)";
        ctx.fillRect(0, y0, 128, 32);
        ctx.strokeStyle = "rgba(10,6,3,.38)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y0 + 0.5);
        ctx.lineTo(128, y0 + 0.5);
        ctx.stroke();
        for (let i = 0; i < 20; i++) {
          const gy = y0 + 3 + rng() * 26;
          ctx.strokeStyle = `rgba(23,12,5,${0.04 + rng() * 0.09})`;
          ctx.beginPath();
          ctx.moveTo(0, gy);
          for (let x = 0; x <= 128; x += 16) {
            ctx.lineTo(x, gy + Math.sin(x * 0.09 + p + i) * (0.8 + rng() * 1.8));
          }
          ctx.stroke();
        }
        for (let k = 0; k < 2; k++) {
          ctx.strokeStyle = "rgba(20,11,5,.18)";
          ctx.beginPath();
          ctx.ellipse(rng() * 128, y0 + 8 + rng() * 20, 3 + rng() * 4, 1 + rng() * 1.5, 0, 0, TAU);
          ctx.stroke();
        }
      }
    },
    { repeat, anisotropy: 8 },
  );
}

export function brickTexture(
  base = "#544a40",
  mortar = "#2d2925",
  repeat: [number, number] = [5, 6],
): THREE.CanvasTexture {
  const rng = mulberry32(1123);
  return canvasTexture(
    128,
    128,
    (ctx) => {
      ctx.fillStyle = mortar;
      ctx.fillRect(0, 0, 128, 128);
      const bw = 32;
      const bh = 16;
      for (let row = 0; row < 8; row++) {
        const offset = row % 2 ? -16 : 0;
        for (let col = -1; col < 6; col++) {
          const x = col * bw + offset + 1;
          const y = row * bh + 1;
          const tone = 0.82 + rng() * 0.3;
          ctx.fillStyle = base;
          ctx.globalAlpha = 0.86;
          ctx.fillRect(x, y, bw - 2, bh - 2);
          ctx.globalAlpha = 1;
          ctx.fillStyle = `rgba(255,235,205,${0.018 + rng() * 0.04})`;
          ctx.fillRect(x, y, bw - 2, 1);
          ctx.fillStyle = `rgba(10,8,6,${0.03 + rng() * 0.1})`;
          for (let s = 0; s < 3; s++) {
            ctx.fillRect(x + rng() * (bw - 2), y + rng() * (bh - 2), 1 + rng() * 4, 1);
          }
          const grd = ctx.createLinearGradient(x, y, x, y + bh);
          grd.addColorStop(0, `rgba(255,255,255,${(tone - 1) * 0.12})`);
          grd.addColorStop(1, "rgba(0,0,0,.16)");
          ctx.fillStyle = grd;
          ctx.fillRect(x, y, bw - 2, bh - 2);
        }
      }
    },
    { repeat, anisotropy: 8 },
  );
}

export function stoneTexture(repeat: [number, number] = [7, 9]): THREE.CanvasTexture {
  const rng = mulberry32(8012);
  return canvasTexture(
    128,
    128,
    (ctx) => {
      ctx.fillStyle = "#514c43";
      ctx.fillRect(0, 0, 128, 128);
      const rows = 4;
      for (let row = 0; row < rows; row++) {
        const y = row * 32;
        const shift = row % 2 ? 18 : 0;
        for (let col = -1; col < 5; col++) {
          const x = col * 38 + shift;
          ctx.fillStyle = `rgba(${124 + (rng() * 26) | 0},${116 + (rng() * 22) | 0},${101 + (rng() * 20) | 0},.22)`;
          ctx.fillRect(x + 1, y + 1, 35, 29);
          ctx.strokeStyle = "rgba(30,27,23,.5)";
          ctx.strokeRect(x + 0.5, y + 0.5, 37, 30);
          for (let s = 0; s < 14; s++) {
            ctx.fillStyle = `rgba(20,18,15,${rng() * 0.11})`;
            ctx.fillRect(x + rng() * 34, y + rng() * 28, 1 + rng() * 4, 1 + rng() * 2);
          }
        }
      }
      const shade = ctx.createLinearGradient(0, 0, 0, 128);
      shade.addColorStop(0, "rgba(255,255,255,.06)");
      shade.addColorStop(1, "rgba(0,0,0,.2)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, 128, 128);
    },
    { repeat, anisotropy: 8 },
  );
}

export function concreteTexture(repeat: [number, number] = [4, 4]): THREE.CanvasTexture {
  const rng = mulberry32(4117);
  return canvasTexture(
    128,
    128,
    (ctx) => {
      ctx.fillStyle = "#5d5b55";
      ctx.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 3200; i++) {
        const v = 60 + rng() * 55;
        ctx.fillStyle = `rgba(${v},${v - 2},${v - 5},${0.03 + rng() * 0.09})`;
        ctx.fillRect(rng() * 128, rng() * 128, 1 + rng() * 2, 1 + rng() * 2);
      }
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = `rgba(22,21,18,${0.07 + rng() * 0.13})`;
        ctx.lineWidth = 0.7 + rng();
        ctx.beginPath();
        let x = rng() * 128;
        let y = rng() * 128;
        ctx.moveTo(x, y);
        for (let k = 0; k < 4; k++) {
          x += (rng() - 0.5) * 22;
          y += rng() * 15;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(24,23,20,.2)";
      ctx.fillRect(0, 96, 128, 1);
      ctx.fillRect(0, 32, 128, 1);
    },
    { repeat, anisotropy: 6 },
  );
}

export function starDotTexture(): THREE.CanvasTexture {
  return canvasTexture(8, 8, (ctx) => {
    ctx.clearRect(0, 0, 8, 8);
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.fillRect(2, 2, 4, 4);
    ctx.fillStyle = "rgba(255,255,255,.95)";
    ctx.fillRect(3, 3, 2, 2);
    ctx.fillStyle = "rgba(255,255,255,.4)";
    ctx.fillRect(0, 3, 1, 2);
    ctx.fillRect(7, 3, 1, 2);
    ctx.fillRect(3, 0, 2, 1);
    ctx.fillRect(3, 7, 2, 1);
  }, { colorSpace: THREE.SRGBColorSpace });
}

export function glowTexture(inner = "rgba(255,244,213,1)", mid = "rgba(231,142,61,.4)"): THREE.CanvasTexture {
  return canvasTexture(128, 128, (ctx) => {
    ctx.clearRect(0, 0, 128, 128);
    const grd = ctx.createRadialGradient(64, 64, 1, 64, 64, 62);
    grd.addColorStop(0, inner);
    grd.addColorStop(0.12, "rgba(255,235,192,.9)");
    grd.addColorStop(0.3, mid);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 128, 128);
  });
}

export function softMistTexture(): THREE.CanvasTexture {
  return canvasTexture(64, 64, (ctx) => {
    ctx.clearRect(0, 0, 64, 64);
    const grd = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
    grd.addColorStop(0, "rgba(255,255,255,.65)");
    grd.addColorStop(0.45, "rgba(221,234,238,.2)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 64, 64);
  });
}

export function makeGlowSprite(
  color: THREE.ColorRepresentation,
  size: number,
  opacity = 0.8,
  texture?: THREE.Texture,
): THREE.Sprite {
  const material = new THREE.SpriteMaterial({
    map: texture ?? glowTexture(),
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.setScalar(size);
  return sprite;
}

export function makeMistSprite(size: number, opacity = 0.35): THREE.Sprite {
  const material = new THREE.SpriteMaterial({
    map: softMistTexture(),
    color: 0xdde9ea,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.setScalar(size);
  return sprite;
}

export function createTextTexture(
  text: string,
  options: {
    width?: number;
    height?: number;
    size?: number;
    color?: string;
    bg?: string;
    family?: string;
    align?: CanvasTextAlign;
    weight?: string;
    letterSpacing?: number;
    lines?: string[];
  } = {},
): THREE.CanvasTexture {
  const width = options.width ?? 512;
  const height = options.height ?? 128;
  const family = options.family ?? '"Noto Sans CJK SC", sans-serif';
  return canvasTexture(width, height, (ctx) => {
    ctx.clearRect(0, 0, width, height);
    if (options.bg) {
      ctx.fillStyle = options.bg;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.fillStyle = options.color ?? "#f3ead8";
    ctx.font = `${options.weight ?? "500"} ${options.size ?? 42}px ${family}`;
    ctx.textAlign = options.align ?? "center";
    ctx.textBaseline = "middle";
    const lines = options.lines ?? [text];
    const lineHeight = (options.size ?? 42) * 1.45;
    const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, options.align === "left" ? 24 : width / 2, startY + i * lineHeight);
    });
  }, { anisotropy: 4 });
}

export function createStarfield(
  count: number,
  minRadius: number,
  maxRadius: number,
  seed = 1,
  tintA = 0xdce9f5,
  tintB = 0xaabfce,
): THREE.Points {
  const rng = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cA = new THREE.Color(tintA);
  const cB = new THREE.Color(tintB);
  const cC = new THREE.Color(0xe7cba5);
  for (let i = 0; i < count; i++) {
    const theta = rng() * TAU;
    const z = rng() * 2 - 1;
    const r = lerp(minRadius, maxRadius, Math.pow(rng(), 0.55));
    const s = Math.sqrt(Math.max(0, 1 - z * z));
    positions[i * 3] = Math.cos(theta) * s * r;
    positions[i * 3 + 1] = Math.sin(theta) * s * r;
    positions[i * 3 + 2] = z * r;
    const pick = rng();
    const c = pick > 0.93 ? cC : pick > 0.48 ? cB : cA;
    const b = 0.26 + Math.pow(rng(), 3) * 1.45;
    colors[i * 3] = c.r * b;
    colors[i * 3 + 1] = c.g * b;
    colors[i * 3 + 2] = c.b * b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 1.55,
    sizeAttenuation: false,
    map: starDotTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    alphaTest: 0.015,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return points;
}

export interface RockOptions {
  radius: number;
  voxel: number;
  color: (x: number, y: number, z: number, ratio: number) => number | null;
  irregularity?: number;
  seed?: number;
  metalness?: number;
  roughness?: number;
}

/** A lumpy, faceted meteorite made from true voxels rather than a smooth mesh. */
export function voxelRockGeometry(options: RockOptions): THREE.BufferGeometry {
  const span = Math.max(2, Math.ceil(options.radius) * 2);
  const c = span / 2;
  const irr = options.irregularity ?? 0.22;
  return buildVoxelGeometry(
    {
      size: [span, span, span],
      at(x, y, z) {
        const dx = x + 0.5 - c;
        const dy = y + 0.5 - c;
        const dz = z + 0.5 - c;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const n =
          fbm(x * 0.24 + (options.seed ?? 1) * 3.7, z * 0.24 - y * 0.17, 3) * 2 - 1;
        const limit = options.radius * (1 + n * irr);
        if (d > limit) return null;
        return options.color(x, y, z, d / Math.max(0.001, limit));
      },
    },
    { voxel: options.voxel, anchor: "center" },
  );
}

export function voxelRock(options: RockOptions): THREE.Mesh {
  const geometry = voxelRockGeometry(options);
  const mesh = new THREE.Mesh(
    geometry,
    voxelMaterial({
      metalness: options.metalness ?? 0.14,
      roughness: options.roughness ?? 0.82,
    }),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export interface ColoredBox {
  position: [number, number, number];
  size: [number, number, number];
  color: number;
  rotation?: [number, number, number];
}

/** Batch many inert boxes into a single vertex-coloured draw call. */
export function batchBoxes(boxes: ColoredBox[]): THREE.BufferGeometry | null {
  const geometries: THREE.BufferGeometry[] = [];
  const tempColor = new THREE.Color();
  for (const spec of boxes) {
    const g = new THREE.BoxGeometry(...spec.size);
    if (spec.rotation) {
      g.rotateX(spec.rotation[0]);
      g.rotateY(spec.rotation[1]);
      g.rotateZ(spec.rotation[2]);
    }
    g.translate(...spec.position);
    tempColor.setHex(spec.color);
    const count = g.attributes.position.count;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = tempColor.r;
      arr[i * 3 + 1] = tempColor.g;
      arr[i * 3 + 2] = tempColor.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(arr, 3));
    geometries.push(g);
  }
  const merged = geometries.length ? mergeGeometries(geometries, false) : null;
  for (const g of geometries) g.dispose();
  return merged;
}

export function addBatchedBoxes(
  parent: THREE.Object3D,
  boxes: ColoredBox[],
  materialOptions: THREE.MeshStandardMaterialParameters = {},
  castShadow = true,
  receiveShadow = true,
): THREE.Mesh | null {
  const geometry = batchBoxes(boxes);
  if (!geometry) return null;
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0,
      ...materialOptions,
    }),
  );
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  parent.add(mesh);
  return mesh;
}

export function addBox(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  options: {
    rotation?: [number, number, number];
    castShadow?: boolean;
    receiveShadow?: boolean;
    name?: string;
  } = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  if (options.name) mesh.name = options.name;
  parent.add(mesh);
  return mesh;
}

export function addPlane(
  parent: THREE.Object3D,
  size: [number, number],
  position: [number, number, number],
  material: THREE.Material,
  rotation: [number, number, number] = [0, 0, 0],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}

export function shadowify(
  object: THREE.Object3D,
  cast = true,
  receive = true,
): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = cast;
      child.receiveShadow = receive;
    }
  });
}

export function setCamera(
  camera: THREE.PerspectiveCamera,
  position: [number, number, number],
  target: [number, number, number],
  fov?: number,
  roll = 0,
): void {
  camera.position.set(...position);
  camera.up.set(0, 1, 0);
  camera.lookAt(target[0], target[1], target[2]);
  if (roll) camera.rotateZ(roll);
  if (fov !== undefined && camera.fov !== fov) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
}

export function dampCameraNoise(time: number, amplitude = 0.006, seed = 0): number[] {
  return [
    (Math.sin(time * 2.13 + seed) + Math.sin(time * 0.91 + seed * 4.2) * 0.7) * amplitude,
    (Math.sin(time * 1.77 + 1.1 + seed) + Math.sin(time * 0.57 + seed * 2.2) * 0.6) * amplitude * 0.55,
  ];
}

export function lightPool(
  color: THREE.ColorRepresentation,
  intensity: number,
  distance = 6,
  decay = 2,
): THREE.PointLight {
  const light = new THREE.PointLight(color, intensity, distance, decay);
  light.castShadow = false;
  return light;
}

export function addEmissiveStrip(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  color: THREE.ColorRepresentation,
  intensity = 1.4,
): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({ color, toneMapped: false });
  const mesh = addBox(parent, size, position, material, { castShadow: false, receiveShadow: false });
  material.color.multiplyScalar(intensity);
  return mesh;
}

export interface LabelPlaneOptions {
  width: number;
  height: number;
  text: string;
  lines?: string[];
  color?: string;
  bg?: string;
  fontFamily?: string;
  size?: number;
  emissive?: boolean;
}

export function addLabelPlane(
  parent: THREE.Object3D,
  position: [number, number, number],
  rotation: [number, number, number],
  options: LabelPlaneOptions,
): THREE.Mesh {
  const texture = createTextTexture(options.text, {
    width: 512,
    height: 256,
    size: options.size ?? 60,
    color: options.color ?? "#f3e6d0",
    bg: options.bg,
    family: options.fontFamily,
    lines: options.lines,
  });
  const material = options.emissive
    ? new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false })
    : new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.55,
        metalness: 0.12,
        emissive: 0x4b351f,
        emissiveMap: texture,
        emissiveIntensity: 0.22,
      });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(options.width, options.height), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}

export function computeCameraForward(camera: THREE.Camera): THREE.Vector3 {
  return new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
}

export function approach(current: number, target: number, lambda: number, dt: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function makeLine(
  points: Array<[number, number, number]>,
  color: THREE.ColorRepresentation,
  opacity = 0.5,
): THREE.Line {
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(...p)));
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.Line(geometry, material);
}

export function makeTickerTexture(lines: string[], accent = "#e2a866"): THREE.CanvasTexture {
  return canvasTexture(1024, 512, (ctx) => {
    ctx.fillStyle = "#050b0d";
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = "#0a171b";
    ctx.fillRect(0, 0, 1024, 92);
    ctx.strokeStyle = "rgba(113,165,171,.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, 1000, 488);
    ctx.fillStyle = accent;
    ctx.fillRect(42, 113, 8, 340);
    ctx.font = '500 29px "Noto Sans CJK SC", sans-serif';
    ctx.fillStyle = "rgba(176,210,208,.66)";
    ctx.fillText("DEEP SPACE OPERATIONS / BULLETIN", 56, 55);
    ctx.fillStyle = "#d9b881";
    ctx.font = '600 44px "Noto Serif CJK SC", serif';
    lines.forEach((line, i) => {
      ctx.fillStyle = i === 0 ? "#eee2cd" : i === 1 ? "#ba9b70" : "rgba(211,229,225,.7)";
      ctx.font = i === 0 ? '600 45px "Noto Serif CJK SC", serif' : '400 30px "Noto Sans CJK SC", sans-serif';
      ctx.fillText(line, 74, 178 + i * 74);
    });
    ctx.fillStyle = "rgba(138,183,184,.5)";
    ctx.font = '400 23px "Courier New", monospace';
    ctx.fillText("2337.11.04  18:42:09  UTC+8", 74, 430);
    ctx.fillStyle = "#9d3a30";
    ctx.fillRect(800, 411, 126, 34);
    ctx.fillStyle = "#e9d8be";
    ctx.font = '600 20px "Noto Sans CJK SC", sans-serif';
    ctx.fillText("LIVE", 838, 436);
  }, { anisotropy: 4 });
}

export function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const material = child.material;
      if (Array.isArray(material)) material.forEach((m) => m.dispose());
      else material.dispose();
    }
    if (child instanceof THREE.Sprite) {
      child.material.dispose();
    }
  });
}

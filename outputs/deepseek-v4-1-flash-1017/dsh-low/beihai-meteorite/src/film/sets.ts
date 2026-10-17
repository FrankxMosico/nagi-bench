import * as THREE from "three";
import {
  applyPose,
  buildVoxelGeometry,
  float as floatPose,
  lerpPose,
  voxelMaterial,
  voxelModel,
  voxelSphere,
  type Figure,
  type Pose,
} from "@agentbench/voxel-kit";
import {
  concreteTexture,
  craterTexture,
  dustTexture,
  fabricTexture,
  glowTexture,
  labelTexture,
  meatTexture,
  metalTexture,
  plasterTexture,
  rng,
  screenTexture,
  smokeTexture,
  stoneTileTexture,
  sunTexture,
  woodTexture,
} from "./textures";
import {
  createCast,
  getSuitTextures,
  magazineGeometry,
  makeGloveProp,
  makePistol,
  meteoriteGeometry,
  pistolGeometry,
  seatedPose,
  suitPackGeometry,
  helmetGloveGeometry,
  applyStanding,
  aimPose,
  basePose,
  type Cast,
} from "./figures";
import { FIRE_TIMES, IMPACT_TIMES, MAGAZINE_TIMES } from "./timeline";

export type SetName =
  | "cold"
  | "hutongExt"
  | "hutongInt"
  | "spaceMontage"
  | "appointment"
  | "workshop"
  | "basement"
  | "eva"
  | "photo"
  | "credits";

export interface World {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  cast: Cast;
  sets: Record<SetName, THREE.Group>;
  stars: THREE.Points;
  props: Record<string, any>;
  show(name: SetName, bg: number, fog?: number): void;
  hideActors(): void;
  showActor(figure: Figure, visible: boolean): void;
  setCamera(position: THREE.Vector3, target: THREE.Vector3, fov: number, near?: number): void;
  cameraShake(amount: number, time: number): void;
  updateEnvironment(time: number): void;
}

const V2 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* ---------------------------------------------------------------- helpers */

function standard(color: number, map?: THREE.Texture | null, extra: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({ color, map: map ?? null, roughness: 0.9, metalness: 0.02, ...extra });
}

function box(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  cast = false,
  receive = false,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  return mesh;
}

function emissive(parent: THREE.Object3D, size: [number, number, number], position: [number, number, number], color: number, intensity = 2) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.5,
  });
  return box(parent, size, position, mat);
}

function picture(parent: THREE.Object3D, texture: THREE.Texture, width: number, height: number, position: [number, number, number], rotation: [number, number, number] = [0, 0, 0]) {
  const mat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), mat);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}

function rock(parent: THREE.Object3D, radiusM: number, position: [number, number, number], seed: number, metalness = 0.3): THREE.Mesh {
  const radiusVox = Math.max(2, Math.round(radiusM / 0.008));
  const geometry = meteoriteGeometry(radiusVox, radiusM / radiusVox, seed);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.66, metalness, flatShading: true }),
  );
  mesh.position.set(...position);
  mesh.rotation.set(seed * 0.4, seed * 0.9, seed * 0.2);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function points(
  parent: THREE.Object3D,
  count: number,
  spread: number,
  size: number,
  texture: THREE.Texture,
  color = 0xffe9c9,
  opacity = 0.6,
): THREE.Points {
  const positions = new Float32Array(count * 3);
  const rand = rng(count * 17 + 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * spread;
    positions[i * 3 + 1] = (rand() - 0.5) * spread;
    positions[i * 3 + 2] = (rand() - 0.5) * spread;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size,
    map: texture,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color,
    sizeAttenuation: true,
  });
  const p = new THREE.Points(geo, mat);
  parent.add(p);
  return p;
}

function boxes(...items: Array<[THREE.Object3D, [number, number, number], [number, number, number], THREE.Material]>): void {
  for (const [parent, size, pos, mat] of items) box(parent, size, pos, mat);
}

/* ------------------------------------------------------------------ stars */

function createStars(): THREE.Points {
  const count = 2600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const rand = rng(8317);
  const tints = [0xdde6ff, 0xffeed6, 0xffffff, 0xb9d2ff, 0xffd9ae];
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const r = 720 + rand() * 380;
    const s = Math.sqrt(1 - u * u);
    positions[i * 3] = Math.cos(phi) * s * r;
    positions[i * 3 + 1] = u * r;
    positions[i * 3 + 2] = Math.sin(phi) * s * r;
    c.setHex(tints[Math.floor(rand() * tints.length)]!);
    const b = 0.35 + rand() * 0.65;
    colors[i * 3] = c.r * b;
    colors[i * 3 + 1] = c.g * b;
    colors[i * 3 + 2] = c.b * b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 1.45,
    map: dustTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: false,
  });
  const p = new THREE.Points(geo, mat);
  p.frustumCulled = false;
  return p;
}

/* ------------------------------------------------------------------ earth */

let earthGeometryCache: THREE.BufferGeometry | null = null;
let earthAtmosphereCache: THREE.BufferGeometry | null = null;
let earthMaterialCache: THREE.MeshStandardMaterial | null = null;

function hash3(x: number, y: number, z: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, z: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);
  const c000 = hash3(xi, yi, zi);
  const c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi);
  const c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1);
  const c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1);
  const c111 = hash3(xi + 1, yi + 1, zi + 1);
  const x00 = c000 + (c100 - c000) * u;
  const x10 = c010 + (c110 - c010) * u;
  const x01 = c001 + (c101 - c001) * u;
  const x11 = c011 + (c111 - c011) * u;
  const y0 = x00 + (x10 - x00) * v;
  const y1 = x01 + (x11 - x01) * v;
  return y0 + (y1 - y0) * w;
}

function fbm(x: number, y: number, z: number): number {
  return smoothNoise(x, y, z) * 0.55 + smoothNoise(x * 2.1, y * 2.1, z * 2.1) * 0.28 + smoothNoise(x * 4.3, y * 4.3, z * 4.3) * 0.17;
}

function makeEarthGeometry(): THREE.BufferGeometry {
  if (earthGeometryCache) return earthGeometryCache;
  const radius = 28;
  const voxel = 1.8;
  const oceanDeep = new THREE.Color(0x0d2742);
  const oceanMid = new THREE.Color(0x164767);
  const oceanShallow = new THREE.Color(0x256b83);
  const landLow = new THREE.Color(0x3e6145);
  const landHigh = new THREE.Color(0x6d7548);
  const desert = new THREE.Color(0x9a8355);
  const ice = new THREE.Color(0xc9d5d8);
  earthGeometryCache = voxelSphere(
    radius,
    (x, y, z, d) => {
      const nx = (x - radius) / radius;
      const ny = (y - radius) / radius;
      const nz = (z - radius) / radius;
      const lat = Math.abs(ny);
      const n = fbm(nx * 2.6 + 3.1, ny * 2.6 + 0.7, nz * 2.6 + 1.9);
      const detail = fbm(nx * 7.2, ny * 7.2, nz * 7.2);
      if (lat > 0.97 - detail * 0.01) return ice.getHex();
      if (n > 0.505) {
        const dry = fbm(nx * 4.1 + 8, ny * 4.1, nz * 4.1 + 2);
        if (lat < 0.34 && dry > 0.54) return desert.getHex();
        return (detail > 0.54 ? landHigh : landLow).getHex();
      }
      if (n > 0.47) return oceanShallow.getHex();
      if (detail > 0.48) return oceanMid.getHex();
      return oceanDeep.getHex();
    },
    { voxel },
  );
  const colors = earthGeometryCache.getAttribute("color");
  if (colors) {
    const c = new THREE.Color();
    for (let i = 0; i < colors.count; i++) {
      c.fromBufferAttribute(colors as THREE.BufferAttribute, i);
      c.offsetHSL(0, 0, (hash3(i, 1, 7) - 0.5) * 0.03);
      (colors as THREE.BufferAttribute).setXYZ(i, c.r, c.g, c.b);
    }
    colors.needsUpdate = true;
  }
  return earthGeometryCache;
}

function makeEarthMaterial(): THREE.MeshStandardMaterial {
  if (!earthMaterialCache) {
    earthMaterialCache = voxelMaterial({ roughness: 0.94, metalness: 0.0 });
  }
  return earthMaterialCache;
}

function createEarth(radiusScale = 1): THREE.Group {
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(makeEarthGeometry(), makeEarthMaterial());
  mesh.scale.setScalar(radiusScale);
  mesh.receiveShadow = false;
  group.add(mesh);

  // A sparse city-light cloud; only its colour is emitted from the night side.
  const count = 560;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const rand = rng(4141);
  const amber = new THREE.Color(0xe8b56c);
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const r = 50.45 * radiusScale;
    positions[i * 3] = Math.cos(phi) * s * r;
    positions[i * 3 + 1] = u * r;
    positions[i * 3 + 2] = Math.sin(phi) * s * r;
    colors[i * 3] = amber.r;
    colors[i * 3 + 1] = amber.g;
    colors[i * 3 + 2] = amber.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const lights = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  group.add(lights);

  if (!earthAtmosphereCache) {
    earthAtmosphereCache = voxelSphere(28, 0x3b78b8, { voxel: 1.8 });
  }
  const atmo = new THREE.Mesh(
    earthAtmosphereCache,
    new THREE.MeshBasicMaterial({
      color: 0x4a8dd4,
      transparent: true,
      opacity: 0.055,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    }),
  );
  atmo.scale.setScalar(radiusScale * 1.028);
  group.add(atmo);
  return group;
}

/* ------------------------------------------------------------- ring station */

function createRingStation(radius: number, tube: number, voxel: number, accent = 0x8b9296): THREE.Group {
  const group = new THREE.Group();
  const span = Math.ceil(((radius + tube) * 2) / voxel) + 2;
  const zSpan = Math.max(3, Math.ceil((tube * 1.4) / voxel) + 1);
  const half = (span * voxel) / 2;
  const zHalf = (zSpan * voxel) / 2;
  const base = new THREE.Color(0x5c6266);
  const light = new THREE.Color(accent);
  const dark = new THREE.Color(0x2f3538);
  const warm = new THREE.Color(0xb59a63);
  const geo = buildVoxelGeometry(
    {
      size: [span, span, zSpan],
      at(x, y, z) {
        const wx = (x + 0.5) * voxel - half;
        const wy = (y + 0.5) * voxel - half;
        const wz = (z + 0.5) * voxel - zHalf;
        const rr = Math.sqrt(wx * wx + wy * wy);
        const ang = Math.atan2(wy, wx);
        const onRing = Math.abs(rr - radius) < tube * 0.5 && Math.abs(wz) < zHalf * 0.85;
        const spoke = Math.abs(Math.sin(ang * 2 + 0.2)) < 0.055 && rr < radius - tube * 0.4 && Math.abs(wz) < tube * 0.24;
        const hub = rr < tube * 0.95 && Math.abs(wz) < zHalf * 0.85;
        if (!onRing && !spoke && !hub) return null;
        if (Math.abs(Math.sin(ang * 14)) < 0.1) return dark.getHex();
        if (Math.abs(Math.sin(ang * 31)) < 0.06) return warm.getHex();
        return (Math.floor((ang + Math.PI) * 3) % 3 === 0 ? light : base).getHex();
      },
    },
    { voxel, anchor: "center" },
  );
  const mesh = new THREE.Mesh(geo, voxelMaterial({ roughness: 0.55, metalness: 0.55 }));
  group.add(mesh);

  // Lit windows on the outward rim.
  const windowMat = new THREE.MeshBasicMaterial({ color: 0xd9c18a, toneMapped: false });
  const windowGeo = new THREE.BoxGeometry(voxel * 1.2, voxel * 1.2, voxel * 1.2);
  for (let i = 0; i < 34; i++) {
    const a = (i / 34) * Math.PI * 2 + 0.09;
    const r = radius + tube * 0.52;
    const m = new THREE.Mesh(windowGeo, windowMat);
    m.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
    m.rotation.z = a;
    group.add(m);
  }
  // Two navigation beacons.
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff5a42, toneMapped: false });
  for (const a of [0.1, Math.PI + 0.2]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(voxel, voxel, voxel), beaconMat);
    m.position.set(Math.cos(a) * (radius + tube), Math.sin(a) * (radius + tube), zHalf);
    group.add(m);
  }
  return group;
}

/* --------------------------------------------------------------- shipyard */

function createShipyard(): THREE.Group {
  const group = new THREE.Group();
  const steel = standard(0x51575b, metalTexture(44, 0x50565a), { metalness: 0.65, roughness: 0.55 });
  const dark = standard(0x272d31, metalTexture(45, 0x272d31), { metalness: 0.7, roughness: 0.6 });
  const lit = new THREE.MeshBasicMaterial({ color: 0x93c6cd, toneMapped: false });
  const rand = rng(5252);
  // The beginnings of a colossal hull, read as a rib cage rather than a finished ship.
  for (let i = 0; i < 9; i++) {
    const z = -24 + i * 6;
    const w = 26 - Math.abs(i - 4) * 2.2;
    const h = 15 - Math.abs(i - 4) * 1.1;
    box(group, [0.7, h, 0.7], [-w / 2, 4 + h / 2, z], steel);
    box(group, [0.7, h, 0.7], [w / 2, 4 + h / 2, z], steel);
    box(group, [w, 0.7, 0.7], [0, 4, z], steel);
    box(group, [w, 0.7, 0.7], [0, 4 + h, z], steel);
    if (i % 2 === 0) {
      box(group, [w * 0.92, 0.34, 0.34], [0, 5.4, z], dark);
      box(group, [0.34, h * 0.72, 0.34], [-w * 0.22, 8, z], dark);
      box(group, [0.34, h * 0.72, 0.34], [w * 0.22, 8, z], dark);
    }
  }
  for (let i = 0; i < 8; i++) {
    const z = -24 + i * 6;
    box(group, [0.34, 0.34, 6.4], [-12, 5, z], dark);
    box(group, [0.34, 0.34, 6.4], [12, 5, z], dark);
    box(group, [0.34, 0.34, 6.4], [-8, 17, z], dark);
    box(group, [0.34, 0.34, 6.4], [8, 17, z], dark);
  }
  // A partially attached hull plate.
  box(group, [21, 3.8, 0.5], [0, 13, -12], steel);
  box(group, [9, 2.6, 0.45], [-7, 8.4, 6], steel);
  // Cranes and work lights.
  for (let i = 0; i < 7; i++) {
    const x = -18 + rand() * 36;
    const y = 3 + rand() * 17;
    const z = -29 + rand() * 32;
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), lit);
    m.position.set(x, y, z);
    group.add(m);
    const l = new THREE.PointLight(0x9dd6e2, 7, 10, 2);
    l.position.set(x, y, z);
    group.add(l);
  }
  // Scaffolding towers.
  for (const [x, z] of [[-21, 4], [23, -9], [18, 8]] as const) {
    for (let i = 0; i < 4; i++) {
      box(group, [0.22, 18, 0.22], [x + i * 0.7, 9, z], dark);
    }
    for (let y = 2; y < 18; y += 2.6) {
      box(group, [2.4, 0.18, 0.18], [x + 1, y, z], dark);
    }
  }
  return group;
}

/* ------------------------------------------------------------------ cold */

function buildCold(world: World): void {
  const group = new THREE.Group();
  world.sets.cold = group;
  group.visible = false;

  const earth = createEarth(1.45);
  earth.position.set(-18, -92, -190);
  earth.rotation.set(0.25, 0.05, 0.12);
  group.add(earth);

  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: sunTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  sun.position.set(85, 34, -210);
  sun.scale.set(58, 58, 1);
  group.add(sun);

  const light = new THREE.DirectionalLight(0xfff0d8, 3.6);
  light.position.set(60, 25, -40);
  group.add(light);
  const fill = new THREE.DirectionalLight(0x9fb8d0, 3.0);
  fill.position.set(-10, 8, 30);
  group.add(fill);
  group.add(new THREE.AmbientLight(0x263241, 0.5));

  const rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.72, metalness: 0.24, flatShading: true });
  const heroGeo = meteoriteGeometry(8, 0.024, 33);
  const hero = new THREE.Mesh(heroGeo, rockMat);
  hero.position.set(0, 0.1, 0);
  group.add(hero);

  const debris: THREE.Mesh[] = [];
  const rand = rng(313);
  for (let i = 0; i < 26; i++) {
    const geo = meteoriteGeometry(2 + Math.floor(rand() * 4), 0.012 + rand() * 0.01, 60 + i);
    const m = new THREE.Mesh(geo, rockMat);
    m.position.set((rand() - 0.5) * 7, (rand() - 0.5) * 4.6, (rand() - 0.5) * 9 - 2);
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.userData.spin = new THREE.Vector3((rand() - 0.5) * 0.12, (rand() - 0.5) * 0.16, (rand() - 0.5) * 0.1);
    m.userData.drift = new THREE.Vector3((rand() - 0.5) * 0.018, (rand() - 0.5) * 0.012, (rand() - 0.5) * 0.016);
    m.userData.base = m.position.clone();
    debris.push(m);
    group.add(m);
  }

  world.props.cold = { hero, debris, sun, earth, light };

  const update = (t: number, local: number) => {
    hero.rotation.x = local * 0.075;
    hero.rotation.y = local * 0.12;
    hero.position.y = 0.1 + Math.sin(local * 0.32) * 0.03;
    for (let i = 0; i < debris.length; i++) {
      const m = debris[i]!;
      const base = m.userData.base as THREE.Vector3;
      m.position.copy(base).addScaledVector(m.userData.drift as THREE.Vector3, local);
      m.rotation.x = m.userData.spin.x * local;
      m.rotation.y = m.userData.spin.y * local;
    }
    const p = local / 13;
    world.setCamera(V2(Math.sin(p * 0.5) * 0.25, 0.25 + p * 0.05, 1.75 + p * 0.35), V2(0, 0, -0.15), 48, 0.01);
    sun.material.opacity = 0.6;
  };
  (group as any).update = update;
}

/* -------------------------------------------------------------- hutong ext */

function buildHutongExt(world: World): void {
  const group = new THREE.Group();
  world.sets.hutongExt = group;
  group.visible = false;

  const groundMat = standard(0x5d5b53, stoneTileTexture(72), { roughness: 0.98 });
  box(group, [26, 0.3, 22], [0, -0.15, 2], groundMat, false, true);

  const wallMat = standard(0x86765f, plasterTexture(73, "#8b7a62"), { roughness: 1 });
  const woodMat = standard(0x4a3324, woodTexture(74, "#4a3324"), { roughness: 0.88 });
  const darkWood = standard(0x2b1e16, woodTexture(75, "#2b1e16"), { roughness: 0.9 });
  const roofMat = standard(0x4a4c52, concreteTexture(76, "#4a4c52"), { roughness: 0.92 });

  // Facade with a gate opening at the centre.
  box(group, [9.5, 3.4, 0.5], [-5.25, 1.7, 0], wallMat, true, true);
  box(group, [9.5, 3.4, 0.5], [5.25, 1.7, 0], wallMat, true, true);
  box(group, [2.1, 1.2, 0.5], [0, 2.8, 0], wallMat, true, true);
  box(group, [2.1, 0.15, 0.6], [0, 1.35, 0.05], darkWood);
  box(group, [1.8, 2.45, 0.12], [0, 1.23, -0.35], new THREE.MeshBasicMaterial({ color: 0x3e2414 }));
  // Warm interior glow in the doorway.
  const doorGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 2.4),
    new THREE.MeshBasicMaterial({ color: 0xffb765, transparent: true, opacity: 0.72, toneMapped: false }),
  );
  doorGlow.position.set(0, 1.2, -0.28);
  group.add(doorGlow);

  // Roof tiles and eaves.
  for (let i = 0; i < 11; i++) {
    box(group, [2.4, 0.18, 1.1], [-8.8 + i * 1.8, 3.8, 0.2], roofMat);
  }
  for (let i = 0; i < 12; i++) {
    box(group, [0.14, 0.32, 1.1], [-10.4 + i * 1.9, 3.95, 0.2], darkWood);
  }
  box(group, [19, 0.25, 2.2], [0, 3.55, -1.2], roofMat);
  // Gate frame and lattice.
  box(group, [2.5, 0.2, 0.25], [0, 2.58, 0.3], darkWood);
  box(group, [0.18, 2.6, 0.25], [-1.15, 1.3, 0.3], darkWood);
  box(group, [0.18, 2.6, 0.25], [1.15, 1.3, 0.3], darkWood);
  for (let i = 0; i < 4; i++) {
    box(group, [0.08, 0.7, 0.08], [-0.8 + i * 0.5, 1.6, 0.25], darkWood);
  }
  box(group, [2.5, 0.14, 0.9], [0, 0.07, 0.55], standard(0x66645a, concreteTexture(185, "#66645a"), { roughness: 0.98 }));
  picture(group, labelTexture("周 宅", "#d6b47c", "#231811"), 1.6, 0.8, [0, 2.95, 0.28]);
  // A lit lattice window on the right of the gate.
  const windowFrame = new THREE.Group();
  box(windowFrame, [1.55, 1.4, 0.08], [0, 0, 0], darkWood);
  const litPane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 1.15),
    new THREE.MeshBasicMaterial({ color: 0xe0a35d, toneMapped: false }),
  );
  litPane.position.z = 0.06;
  windowFrame.add(litPane);
  for (let i = 0; i < 4; i++) {
    box(windowFrame, [0.055, 1.2, 0.08], [-0.65 + i * 0.43, 0, 0.09], darkWood);
    box(windowFrame, [1.35, 0.055, 0.08], [0, -0.55 + i * 0.37, 0.09], darkWood);
  }
  windowFrame.position.set(3.6, 1.85, 0.22);
  group.add(windowFrame);
  const windowLight = new THREE.PointLight(0xffa45e, 34, 6, 2);
  windowLight.position.set(3.6, 1.9, 1.1);
  group.add(windowLight);
  // A blocky courtyard tree.
  const tree = new THREE.Group();
  box(tree, [0.55, 4.0, 0.55], [0, 2.0, 0], standard(0x33251b, woodTexture(183, "#33251b"), { roughness: 1 }));
  const leafMat = standard(0x30452f, fabricTexture(184, "#30452f"), { roughness: 1 });
  const leafPositions: Array<[number, number, number, number, number, number]> = [
    [-1.5, 4.4, 0.2, 2.0, 0.9, 1.7],
    [1.3, 4.8, -0.2, 2.1, 1.0, 1.6],
    [0.1, 5.3, 0.4, 2.4, 0.9, 1.9],
    [-0.8, 5.0, -1.4, 1.6, 0.8, 1.3],
    [0.8, 4.2, 1.4, 1.5, 0.7, 1.2],
  ];
  for (const [x, y, z, w, h, d] of leafPositions) box(tree, [w, h, d], [x, y, z], leafMat);
  tree.position.set(-4.9, 0, 3.5);
  tree.scale.setScalar(1.15);
  group.add(tree);

  // Side courtyard walls.
  box(group, [0.6, 3.2, 16], [-12.6, 1.6, 3], wallMat, true, true);
  box(group, [0.6, 3.2, 16], [12.6, 1.6, 3], wallMat, true, true);
  box(group, [26, 3.2, 0.6], [0, 1.6, 11], wallMat, true, true);

  // Stone table, stools, coal stove, potted plants, bicycle.
  const stone = standard(0x66645a, concreteTexture(77, "#66645a"), { roughness: 0.98 });
  box(group, [2.2, 0.16, 1.2], [-4.4, 0.72, 4.2], stone);
  box(group, [0.34, 0.7, 0.34], [-5.2, 0.34, 3.9], stone);
  box(group, [0.34, 0.7, 0.34], [-3.6, 0.34, 4.5], stone);
  box(group, [0.8, 0.55, 0.8], [4.6, 0.28, 5.2], standard(0x3a3a37, metalTexture(78, 0x3a3a37), { metalness: 0.3 }));
  const potMat = standard(0x6a3d2b, concreteTexture(79, "#6a3d2b"), { roughness: 1 });
  for (const [x, z] of [[-2.6, 0.9], [-8.2, 7.8], [2.4, 1.25], [7.7, 8.3]] as const) {
    box(group, [0.6, 0.55, 0.6], [x, 0.28, z], potMat);
    const bush = new THREE.Group();
    const leaf = standard(0x3e5737, fabricTexture(80, "#3e5737"));
    for (let i = 0; i < 5; i++) {
      box(bush, [0.5, 0.22, 0.4], [(i % 3 - 1) * 0.2, 0.7 + i * 0.14, (i % 2 - 0.5) * 0.2], leaf);
    }
    bush.position.set(x, 0.4, z);
    group.add(bush);
  }

  // Bicycle silhouette.
  const bike = new THREE.Group();
  const tireMat = standard(0x1e1e1d, null, { roughness: 0.9 });
  const frameMat = standard(0x2c3132, metalTexture(81, 0x2c3132), { metalness: 0.6 });
  for (const x of [-0.55, 0.55]) {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.19, 0.07), tireMat);
      seg.position.set(x, 0.36 + Math.cos(a) * 0.31, Math.sin(a) * 0.31);
      seg.rotation.x = a;
      bike.add(seg);
    }
  }
  box(bike, [1.1, 0.06, 0.06], [0, 0.62, 0], frameMat);
  box(bike, [0.06, 0.55, 0.06], [0.32, 0.4, 0], frameMat);
  box(bike, [0.7, 0.06, 0.06], [0.3, 0.72, 0], frameMat);
  box(bike, [0.4, 0.06, 0.06], [-0.2, 0.4, 0], frameMat);
  bike.position.set(4.2, 0, 4.15);
  bike.rotation.y = -0.75;
  group.add(bike);

  // Hanging lanterns.
  for (const x of [-2.4, 2.4]) {
    const lantern = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.44, 0.32),
      new THREE.MeshStandardMaterial({ color: 0x6b1f18, emissive: 0xa74a2d, emissiveIntensity: 0.8, roughness: 0.9 }),
    );
    lantern.position.set(x, 2.55, 1.4);
    group.add(lantern);
    const l = new THREE.PointLight(0xff7b3d, 30, 8, 2);
    l.position.copy(lantern.position);
    group.add(l);
  }

  const doorLight = new THREE.PointLight(0xffa35c, 85, 12, 2);
  doorLight.position.set(0, 1.8, 0.8);
  group.add(doorLight);
  const moon = new THREE.DirectionalLight(0x8aa8c4, 0.9);
  moon.position.set(-9, 12, 7);
  group.add(moon);
  group.add(new THREE.HemisphereLight(0x27303b, 0x16120f, 0.55));

  const steam = points(group, 100, 1.4, 0.32, dustTexture(), 0xbfc4c4, 0.18);
  steam.position.set(4.6, 0.75, 5.2);

  // Dust in the shafts of dusk.
  const dust = points(group, 220, 13, 0.055, dustTexture(), 0xffd8a0, 0.38);
  dust.position.set(0, 1.6, 3.2);

  world.props.hutongExt = { steam, dust, doorLight };
  (group as any).update = (t: number, local: number) => {
    steam.position.y = 0.75 + (local * 0.1) % 0.8;
    dust.rotation.y = local * 0.01;
    const p = local / 9;
    world.setCamera(V2(3.3 - p * 2.6, 1.95 - p * 0.25, 9.6 - p * 5.6), V2(-0.2, 1.65, 0.15), 54, 0.01);
  };
}

/* --------------------------------------------------------------- hutong int */

function createCabinet(parent: THREE.Group, width: number, height: number, depth: number, seed: number): THREE.Group {
  const g = new THREE.Group();
  const wood = standard(0x3b291d, woodTexture(seed, "#3b291d"), { roughness: 0.82 });
  const back = standard(0x171310, null, { roughness: 1 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x9db2aa,
    transparent: true,
    opacity: 0.075,
    roughness: 0.05,
    metalness: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  box(g, [width, height, 0.08], [0, height / 2, -depth / 2], back);
  box(g, [0.12, height, depth], [-width / 2, height / 2, 0], wood, true);
  box(g, [0.12, height, depth], [width / 2, height / 2, 0], wood, true);
  box(g, [width, 0.16, depth], [0, 0.08, 0], wood, true);
  box(g, [width, 0.16, depth], [0, height - 0.08, 0], wood, true);
  box(g, [width, 0.08, depth], [0, height * 0.33, 0], wood);
  box(g, [width, 0.08, depth], [0, height * 0.63, 0], wood);
  const pane = box(g, [width - 0.15, height - 0.25, 0.03], [0, height / 2, depth / 2 - 0.03], glass);
  pane.renderOrder = 2;
  // slim brass frame
  box(g, [width - 0.1, 0.035, 0.045], [0, height * 0.48, depth / 2], wood);
  box(g, [0.035, height - 0.1, 0.045], [0, height / 2, depth / 2], wood);

  const rockMats = [
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.56, metalness: 0.38 }),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.12 }),
  ];
  const shelves = [0.16, 0.33, 0.63, 0.84];
  const rand = rng(seed * 13);
  let idx = 0;
  for (let s = 0; s < shelves.length; s++) {
    const count = 4;
    for (let i = 0; i < count; i++) {
      const radius = 0.035 + rand() * 0.055;
      const radiusVox = Math.max(2, Math.round(radius / 0.009));
      const m = new THREE.Mesh(meteoriteGeometry(radiusVox, radius / radiusVox, seed * 20 + idx), rockMats[idx % 2]);
      m.position.set(-width / 2 + 0.35 + (i / (count - 1)) * (width - 0.7), height * shelves[s]! + 0.09, -0.03 + (rand() - 0.5) * 0.12);
      m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
      m.castShadow = true;
      g.add(m);
      // little museum label
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(0.16, 0.045),
        new THREE.MeshBasicMaterial({ color: 0xb7a98a, transparent: true, opacity: 0.55 }),
      );
      label.position.set(m.position.x, height * shelves[s]! + 0.03, depth / 2 - 0.02);
      g.add(label);
      idx++;
    }
  }
  // Light strip in the cabinet top.
  emissive(g, [width - 0.4, 0.025, 0.03], [0, height - 0.18, 0.05], 0xffd8a0, 2.2);
  parent.add(g);
  return g;
}

function buildHutongInt(world: World): void {
  const group = new THREE.Group();
  world.sets.hutongInt = group;
  group.visible = false;

  const floorMat = standard(0x504c43, stoneTileTexture(101), { roughness: 0.96 });
  box(group, [13, 0.3, 14], [0, -0.15, 0], floorMat, false, true);
  const wallMat = standard(0x75644f, plasterTexture(102, "#75644f"), { roughness: 0.98 });
  const woodMat = standard(0x4a3325, woodTexture(103, "#4a3325"), { roughness: 0.85 });
  const darkWood = standard(0x2a1e17, woodTexture(104, "#2a1e17"), { roughness: 0.9 });
  // walls
  box(group, [13, 3.9, 0.3], [0, 1.95, -7], wallMat, true, true);
  box(group, [0.3, 3.9, 14], [-6.5, 1.95, 0], wallMat, true, true);
  box(group, [0.3, 3.9, 14], [6.5, 1.95, 0], wallMat, true, true);
  box(group, [13, 3.9, 0.3], [0, 1.95, 7], wallMat, true, true);
  // ceiling and beams
  box(group, [13, 0.2, 14], [0, 3.95, 0], darkWood);
  for (let i = 0; i < 6; i++) box(group, [0.24, 0.24, 14], [-5.4 + i * 2.15, 3.72, 0], darkWood);
  for (let i = 0; i < 5; i++) box(group, [13, 0.18, 0.18], [0, 3.78, -6 + i * 3], darkWood);
  // door opening
  box(group, [2.4, 3.2, 0.24], [0, 1.6, 6.86], darkWood);
  const doorGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.65, 2.3),
    new THREE.MeshBasicMaterial({ color: 0x9b6a3b, transparent: true, opacity: 0.26, toneMapped: false }),
  );
  doorGlow.position.set(-0.35, 1.3, 6.7);
  group.add(doorGlow);

  // cabinets on the back and left wall
  const cab1 = createCabinet(group, 2.5, 2.55, 0.55, 11);
  cab1.position.set(-4.5, 0, -6.62);
  const cab2 = createCabinet(group, 2.5, 2.55, 0.55, 12);
  cab2.position.set(-1.8, 0, -6.62);
  const cab3 = createCabinet(group, 1.9, 2.4, 0.52, 13);
  cab3.position.set(0.7, 0, -6.64);
  const cab4 = createCabinet(group, 2.0, 2.4, 0.5, 14);
  cab4.position.set(-6.2, 0, -2.8);
  cab4.rotation.y = Math.PI / 2;
  const cab5 = createCabinet(group, 1.8, 2.25, 0.5, 15);
  cab5.position.set(-6.2, 0, 0.3);
  cab5.rotation.y = Math.PI / 2;

  // workbench
  const bench = new THREE.Group();
  box(bench, [1.5, 0.12, 3.4], [0, 0.9, 0], woodMat, true, true);
  for (const [x, z] of [[-0.55, -1.4], [0.55, -1.4], [-0.55, 1.4], [0.55, 1.4]] as const) {
    box(bench, [0.12, 0.9, 0.12], [x, 0.45, z], darkWood, true);
  }
  box(bench, [1.3, 0.7, 0.9], [0, 0.5, -1.2], darkWood, true);
  for (let i = 0; i < 3; i++) box(bench, [1.1, 0.16, 0.2], [0, 0.18 + i * 0.24, -1.2], woodMat);
  bench.position.set(4.75, 0, -1.45);
  group.add(bench);

  // work lamp
  const lamp = new THREE.Group();
  box(lamp, [0.32, 0.06, 0.32], [0, 0.96, 0], standard(0x292d2c, metalTexture(105, 0x292d2c), { metalness: 0.5 }));
  box(lamp, [0.04, 0.52, 0.04], [0.02, 1.22, 0], standard(0x3b3e39, metalTexture(106, 0x3b3e39), { metalness: 0.5 }));
  box(lamp, [0.46, 0.22, 0.46], [0.02, 1.48, 0], standard(0x4d4b3e, metalTexture(107, 0x4d4b3e), { metalness: 0.4 }));
  const bulb = emissive(lamp, [0.18, 0.1, 0.18], [0.02, 1.36, 0], 0xffc987, 3);
  lamp.position.set(5.32, 0, -0.35);
  group.add(lamp);
  const lampLight = new THREE.PointLight(0xffc27c, 12, 5.5, 2);
  lampLight.position.set(5.3, 1.38, -0.35);
  group.add(lampLight);

  // objects on the bench
  const teaMat = standard(0xd3d0c2, null, { roughness: 0.5 });
  const tray = box(group, [0.62, 0.04, 0.44], [4.62, 0.98, -0.2], standard(0x49321f, woodTexture(108, "#49321f"), { roughness: 0.8 }));
  const cup = box(group, [0.13, 0.14, 0.13], [4.48, 1.07, -0.2], teaMat);
  box(group, [0.1, 0.02, 0.1], [4.48, 1.013, -0.2], standard(0x3e4a36, null, { roughness: 0.6 }));
  box(group, [0.05, 0.08, 0.02], [4.55, 1.06, -0.2], teaMat);
  // magnifier and small meteorites
  box(group, [0.09, 0.02, 0.09], [4.42, 1.0, -1.35], standard(0x2c2f2e, metalTexture(109, 0x2c2f2e), { metalness: 0.4 }));
  box(group, [0.02, 0.24, 0.02], [4.42, 1.1, -1.35], standard(0x2c2f2e, null, { metalness: 0.4 }));
  box(group, [0.2, 0.02, 0.2], [4.42, 1.22, -1.35], standard(0x494f4b, null, { transparent: true, opacity: 0.4 }));
  const singleRock = rock(group, 0.055, [4.55, 1.0, -1.7], 61);
  // three iron meteorites, revealed later
  const ironGroup = new THREE.Group();
  const ironMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, metalness: 0.3, flatShading: true });
  const sizes = [0.055, 0.072, 0.064];
  const irons: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const radiusVox = 7;
    const mesh = new THREE.Mesh(meteoriteGeometry(radiusVox, sizes[i]! / radiusVox, 71 + i), ironMat);
    mesh.position.set(4.05 + i * 0.22, 1.05, -2.15);
    mesh.rotation.set(i * 1.4, i * 0.8, i * 0.6);
    mesh.visible = false;
    mesh.castShadow = true;
    ironGroup.add(mesh);
    irons.push(mesh);
  }
  const velvet = box(ironGroup, [0.85, 0.025, 0.5], [4.28, 0.99, -2.1], standard(0x241a1b, fabricTexture(110, "#241a1b"), { roughness: 1 }));
  velvet.visible = false;
  group.add(ironGroup);

  // stool
  box(group, [0.55, 0.12, 0.55], [5.25, 0.48, -1.55], woodMat, true);
  for (const [x, z] of [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]] as const) {
    box(group, [0.07, 0.46, 0.07], [5.25 + x, 0.23, -1.55 + z], darkWood);
  }

  // rug
  box(group, [3.2, 0.015, 4.4], [1.2, 0.01, -0.5], standard(0x4e2e27, fabricTexture(111, "#4e2e27"), { roughness: 1 }));

  // lighting
  const hemi = new THREE.HemisphereLight(0x4b4032, 0x18120f, 0.95);
  group.add(hemi);
  const key = new THREE.SpotLight(0xffd6a0, 32, 12, 0.72, 0.55, 1.4);
  key.position.set(2.4, 3.45, 1.2);
  key.target.position.set(4.5, 0.9, -1.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0006;
  group.add(key, key.target);
  const cabinetLight = new THREE.PointLight(0xffc287, 12, 7, 2);
  cabinetLight.position.set(-2.4, 2.3, -5.4);
  group.add(cabinetLight);
  for (const x of [-4.3, -1.7, 0.7]) {
    const l = new THREE.PointLight(0xffc88f, 8, 3.4, 2);
    l.position.set(x, 1.9, -6.05);
    group.add(l);
  }
  const deskLight = new THREE.PointLight(0xffd49a, 7, 4, 2);
  deskLight.position.set(3.8, 1.35, 1.3);
  group.add(deskLight);
  const doorFill = new THREE.PointLight(0xffd9b8, 6, 6, 2);
  doorFill.position.set(1.0, 2.2, 3.5);
  group.add(doorFill);
  const faceFill = new THREE.PointLight(0xe8d8c2, 16, 6, 2);
  faceFill.position.set(3.4, 2.1, 2.6);
  group.add(faceFill);

  // dust in the air
  const dust = points(group, 150, 9, 0.045, dustTexture(), 0xffd7a1, 0.26);
  dust.position.set(0, 1.7, -2.2);

  // Actors
  const { zhou, zhang } = world.cast;
  zhou.root.position.set(5.18, 0, -1.58);
  zhou.root.rotation.y = -Math.PI / 2;
  zhang.root.position.set(1.5, 0, 2.85);
  zhang.root.rotation.y = 2.17;
  applyPose(zhou, seatedPose(0, 0));
  applyStanding(zhang, 0);

  world.props.hutongInt = {
    ironGroup,
    irons,
    velvet,
    singleRock,
    doorGlow,
    lampLight,
    dust,
    cabinetLight,
    key,
    updateActors(t: number, local: number, phase: "wide" | "talk" | "ask" | "iron" | "depart") {
      // Collector
      let activity = 0;
      let headYaw = 0.1;
      let lean = 0;
      if (phase === "wide") headYaw = 0.36;
      if (phase === "talk") headYaw = 0.22;
      if (phase === "ask") headYaw = 0.05;
      if (phase === "iron") {
        activity = 0.45;
        headYaw = -0.35;
      }
      const base = seatedPose(t, activity);
      base.neck = [base.neck![0] - 0.03, headYaw, 0];
      base.armR = [-0.7 - activity * 0.55, 0.2, 0.26];
      base.armL = [-0.45, -0.25, -0.25];
      if (phase === "wide") {
        // looking up from the loupe as the visitor arrives
        base.neck![0] = -0.04;
        base.armR = [-0.2, 0.1, 0.75];
      }
      if (phase === "iron") {
        base.armR = [-1.05, -0.1, 0.35 + Math.sin(t * 0.9) * 0.04];
        base.armL = [-0.9, 0.12, -0.42];
      }
      applyPose(zhou, base);

      // Beihai entry and stance
      if (phase === "wide") {
        const p = Math.min(1, Math.max(0, (local - 0.6) / 6.5));
        const ease = p * p * (3 - 2 * p);
        zhang.root.position.set(1.5 - ease * 0.3, 0, 2.85 - ease * 0.55);
        zhang.root.rotation.y = 2.17;
        if (p < 1) {
          const walkPhase = local * 2.2;
          applyPose(zhang, {
            hips: [0, Math.sin(walkPhase) * 0.035, 0],
            neck: [0.02, 0.12, 0],
            armR: [Math.sin(walkPhase) * 0.42, 0, 0.05],
            armL: [-Math.sin(walkPhase) * 0.42, 0, -0.05],
            legR: [-Math.sin(walkPhase) * 0.38, 0, 0],
            legL: [Math.sin(walkPhase) * 0.38, 0, 0],
            lift: Math.abs(Math.cos(walkPhase)) * 0.2 - 0.1,
          });
        } else applyStanding(zhang, t);
      } else if (phase === "iron") {
        const p = Math.min(1, Math.max(0, local / 4));
        const ease = p * p * (3 - 2 * p);
        zhang.root.position.set(1.2 + ease * 1.2, 0, 2.3 - ease * 1.5);
        zhang.root.rotation.y = 2.17 + ease * 0.35;
        applyPose(zhang, {
          ...basePose(t),
          hips: [0, 0.1, 0],
          neck: [0.18, 0.1, 0],
          armR: [-0.6, 0.2, 0.16],
          armL: [-0.48, -0.3, -0.2],
        });
      } else if (phase === "depart") {
        const p = Math.min(1, Math.max(0, local / 8));
        const ease = p * p * (3 - 2 * p);
        zhang.root.position.set(3.3 - ease * 3.0, 0, 0.4 + ease * 5.9);
        zhang.root.rotation.y = 2.56 - ease * 2.9;
        const walkPhase = local * 2.6;
        applyPose(zhang, {
          hips: [0, Math.sin(walkPhase) * 0.03, 0],
          neck: [0, 0.1, 0],
          armR: [Math.sin(walkPhase) * 0.42, 0, 0.05],
          armL: [-Math.sin(walkPhase) * 0.42, 0, -0.05],
          legR: [-Math.sin(walkPhase) * 0.38, 0, 0],
          legL: [Math.sin(walkPhase) * 0.38, 0, 0],
          lift: Math.abs(Math.cos(walkPhase)) * 0.2 - 0.1,
        });
      } else {
        zhang.root.position.set(1.2, 0, 2.3);
        zhang.root.rotation.y = 2.17;
        applyStanding(zhang, t, 0.3);
        zhang.joints.armR.rotation.set(-0.18, 0.08, 0.08);
        zhang.joints.armL.rotation.set(-0.16, -0.08, -0.08);
        zhang.joints.neck.rotation.set(0.02, 0.2, 0);
      }
    },
  };

  (group as any).update = (t: number, local: number, phase = "wide") => {
    world.props.hutongInt.updateActors(t, local, phase);
    dust.rotation.y = local * 0.008;
    lampLight.intensity = 27 + Math.sin(t * 7.3) * 0.6;
  };
}

/* ------------------------------------------------------------ space montage */

function buildSpaceMontage(world: World): void {
  const group = new THREE.Group();
  world.sets.spaceMontage = group;
  group.visible = false;

  const earth = createEarth(1.05);
  earth.position.set(0, -110, -120);
  earth.rotation.set(0.3, 0.1, 0.15);
  group.add(earth);

  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: sunTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  sun.position.set(70, -40, -160);
  sun.scale.set(75, 75, 1);
  group.add(sun);

  const sunLight = new THREE.DirectionalLight(0xfff1d8, 3.2);
  sunLight.position.set(80, 30, 20);
  group.add(sunLight);
  const fill = new THREE.DirectionalLight(0x7f9fbe, 1.25);
  fill.position.set(10, 5, 70);
  group.add(fill);
  group.add(new THREE.AmbientLight(0x1b2a3a, 0.34));

  // Space elevator ribbon and climbers.
  const ribbonMat = new THREE.MeshStandardMaterial({ color: 0x7e898c, metalness: 0.8, roughness: 0.4 });
  const ribbon = box(group, [0.5, 360, 0.5], [0, 120, 0], ribbonMat);
  ribbon.castShadow = false;
  const climberMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false });
  const climbers: THREE.Mesh[] = [];
  for (let i = 0; i < 7; i++) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 1.4), climberMat);
    c.position.set(0, -20 + i * 26, 0);
    group.add(c);
    climbers.push(c);
  }
  // tension ring at the base and lights along the ribbon
  for (let i = 0; i < 16; i++) {
    const l = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 1.1), new THREE.MeshBasicMaterial({ color: 0xc54d39, toneMapped: false }));
    l.position.set(0, -16 + i * 18, 0);
    group.add(l);
  }

  const station = createRingStation(13, 3.2, 0.72, 0x9aa2a8);
  station.position.set(-8, 65, -40);
  group.add(station);

  const yard = createShipyard();
  yard.position.set(52, 25, -48);
  yard.rotation.y = -0.18;
  group.add(yard);
  const yard2 = createShipyard();
  yard2.position.set(-55, 20, -110);
  yard2.rotation.y = 0.3;
  yard2.scale.setScalar(0.6);
  group.add(yard2);

  // Debris and service vehicles.
  const rand = rng(818);
  const debris: THREE.Mesh[] = [];
  const metal = standard(0x666c6d, metalTexture(121, 0x666c6d), { metalness: 0.6, roughness: 0.6 });
  for (let i = 0; i < 30; i++) {
    const m = box(group, [0.5 + rand() * 2.2, 0.3 + rand() * 1.2, 0.4 + rand() * 1.8], [(rand() - 0.5) * 140, 15 + rand() * 90, -30 + rand() * 80], metal);
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.userData.drift = new THREE.Vector3((rand() - 0.5) * 0.05, (rand() - 0.5) * 0.03, (rand() - 0.5) * 0.04);
    m.userData.base = m.position.clone();
    debris.push(m);
  }

  const beacon = new THREE.PointLight(0xff7958, 9, 15, 2);
  beacon.position.set(-8, 80, -38);
  group.add(beacon);

  world.props.spaceMontage = { earth, sun, sunLight, station, yard, ribbon, climbers, debris, beam: yard.children[0] };

  (group as any).update = (t: number, local: number, view: "earth" | "elevator" | "yard") => {
    for (const d of debris) d.position.copy(d.userData.base as THREE.Vector3).addScaledVector(d.userData.drift as THREE.Vector3, local);
    for (let i = 0; i < climbers.length; i++) {
      const c = climbers[i]!;
      c.position.y = -12 + ((local * (2.2 + i * 0.2) + i * 28) % 170);
    }
    station.rotation.z = local * 0.01;
    beacon.intensity = 6 + Math.sin(t * 2.2) * 5;
    if (view === "earth") {
      const p = local / 10;
      world.setCamera(V2(48 - p * 8, 33 + p * 3, 92 - p * 10), V2(-2, 20, -30), 46, 0.1);
    } else if (view === "elevator") {
      const p = local / 10;
      world.setCamera(V2(7 + p * 2, -10 + p * 7, 44 - p * 2), V2(0, 80, 0), 58, 0.1);
    } else {
      const p = local / 10;
      world.setCamera(V2(76 - p * 4, 38 + p * 2, 48 - p * 6), V2(38, 22, -38), 48, 0.1);
    }
  };
}

/* ------------------------------------------------------------- appointment */

function buildAppointment(world: World): void {
  const group = new THREE.Group();
  world.sets.appointment = group;
  group.visible = false;

  const floor = standard(0x30383b, metalTexture(131, 0x30383b), { metalness: 0.45, roughness: 0.55 });
  box(group, [10, 0.25, 12], [0, -0.12, 0], floor, false, true);
  const wallMat = standard(0x2e3538, metalTexture(132, 0x2e3538), { metalness: 0.3, roughness: 0.6 });
  box(group, [0.25, 3.6, 12], [-5.1, 1.8, 0], wallMat, true, true);
  box(group, [0.25, 3.6, 12], [5.1, 1.8, 0], wallMat, true, true);
  box(group, [10, 3.6, 0.25], [0, 1.8, 6], wallMat, true, true);
  box(group, [10, 0.25, 12], [0, 3.65, 0], wallMat);
  // A full-height window onto the Earth.
  box(group, [3.0, 3.6, 0.3], [-3.5, 1.8, -6], wallMat, true, true);
  box(group, [3.0, 3.6, 0.3], [3.5, 1.8, -6], wallMat, true, true);
  box(group, [4.0, 0.45, 0.3], [0, 3.375, -6], wallMat, true, true);
  box(group, [4.0, 0.55, 0.3], [0, 0.275, -6], wallMat, true, true);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x577f99, transparent: true, opacity: 0.1, roughness: 0.02, metalness: 0, side: THREE.DoubleSide });
  box(group, [4.0, 2.6, 0.04], [0, 1.85, -5.98], glass);
  // window frame
  for (const x of [-2.0, 0, 2.0]) box(group, [0.1, 2.6, 0.16], [x, 1.85, -5.9], wallMat);
  for (const y of [0.55, 1.85, 3.15]) box(group, [4.1, 0.1, 0.16], [0, y, -5.9], wallMat);

  // A small blue Earth beyond the glass.
  const earth = createEarth(0.22);
  earth.position.set(-0.6, 1.2, -95);
  group.add(earth);

  // console and seats
  const consoleMat = standard(0x20282b, metalTexture(133, 0x20282b), { metalness: 0.4, roughness: 0.5 });
  box(group, [2.8, 0.72, 0.8], [3.2, 0.36, -2.2], consoleMat, true, true);
  const screen = picture(group, screenTexture(["增援未来  特遣队 01", "STATUS: APPROVED", "CREW: 30", "DEPLOY: 3 MONTHS"], "#8fd8b0"), 1.5, 0.7, [3.2, 0.9, -2.62], [-0.22, 0, 0]);
  const consoleLight = new THREE.PointLight(0x66c9b0, 8, 3.4, 2);
  consoleLight.position.set(3.2, 1.0, -2.0);
  group.add(consoleLight);

  // room strips
  for (let i = 0; i < 4; i++) {
    emissive(group, [0.06, 0.06, 5.2], [-4.7, 3.35, -0.4], 0x9dbac5, 1.4);
    emissive(group, [0.06, 0.06, 5.2], [4.7, 3.35, -0.4], 0x9dbac5, 1.4);
    break;
  }
  const windowLight = new THREE.SpotLight(0x7fb7e0, 58, 20, 0.5, 0.8, 1.2);
  windowLight.position.set(0, 2.6, -5.2);
  windowLight.target.position.set(0, 0.6, 2.2);
  windowLight.castShadow = true;
  windowLight.shadow.mapSize.set(1024, 1024);
  group.add(windowLight, windowLight.target);
  group.add(new THREE.HemisphereLight(0x273a49, 0x0e1214, 1.02));
  const earthFill = new THREE.DirectionalLight(0x9fc6e6, 2.4);
  earthFill.position.set(0, 4, 30);
  group.add(earthFill);
  const fill = new THREE.PointLight(0x8aa9b6, 4, 7, 2);
  fill.position.set(2.0, 1.5, 2.8);
  group.add(fill);
  const roomFill = new THREE.PointLight(0x9fb8c4, 14, 8, 2);
  roomFill.position.set(0.2, 1.7, 0.2);
  group.add(roomFill);

  const { zhang, chang } = world.cast;
  zhang.root.position.set(-1.5, 0, -3.1);
  zhang.root.rotation.y = 1.1;
  chang.root.position.set(1.9, 0, -0.5);
  chang.root.rotation.y = -1.25;
  applyStanding(zhang, 0);
  applyStanding(chang, 0);

  world.props.appointment = {
    screen,
    windowLight,
    update(t: number, local: number) {
      // The two men face one another; the Earth fills the window behind them.
      applyStanding(zhang, t, 0.18);
      applyStanding(chang, t, 0.08);
      zhang.joints.neck.rotation.set(-0.02, -0.22 + Math.sin(local * 0.22) * 0.04, 0);
      zhang.joints.armR.rotation.set(0.32 + Math.sin(local * 0.4) * 0.03, 0.04, 0.1);
      zhang.joints.armL.rotation.set(0.22, -0.1, -0.12);
      zhang.joints.hips.position.y = 12 + Math.sin(t * 1.1) * 0.04;
      chang.joints.neck.rotation.set(0.02, -0.48 + Math.sin(local * 0.31) * 0.03, 0);
      chang.joints.armR.rotation.set(0.24, 0.08, 0.1);
      chang.joints.armL.rotation.set(0.26, -0.1, -0.09);
      chang.joints.hips.position.y = 12 + Math.sin(t * 0.9 + 0.6) * 0.05;
      screen.material.opacity = 1;
      void local;
    },
  };

  (group as any).update = (t: number, local: number) => world.props.appointment.update(t, local);
}

/* ---------------------------------------------------------------- workshop */

function buildWorkshop(world: World): void {
  const group = new THREE.Group();
  world.sets.workshop = group;
  group.visible = false;

  const floor = standard(0x373a38, concreteTexture(141, "#373a38"), { roughness: 0.92 });
  box(group, [18, 0.25, 18], [0, -0.12, 0], floor, false, true);
  const wallMat = standard(0x4a4c47, concreteTexture(142, "#4a4c47"), { roughness: 0.96 });
  box(group, [18, 6.5, 0.3], [0, 3.2, -9], wallMat, true, true);
  box(group, [0.3, 6.5, 18], [-9, 3.2, 0], wallMat, true, true);
  box(group, [0.3, 6.5, 18], [9, 3.2, 0], wallMat, true, true);
  box(group, [18, 0.2, 18], [0, 6.4, 0], standard(0x202322, metalTexture(143, 0x202322), { metalness: 0.3 }));
  for (let i = 0; i < 5; i++) {
    box(group, [0.3, 0.3, 18], [-7 + i * 3.5, 5.9, 0], standard(0x4b5050, metalTexture(144, 0x4b5050), { metalness: 0.5 }));
  }
  // fluorescent fixtures
  for (const x of [-5.2, 0, 5.2]) {
    emissive(group, [2.8, 0.08, 0.32], [x, 5.55, -2], 0xbfe3df, 2.6);
    const l = new THREE.PointLight(0xc5e5df, 95, 18, 2);
    l.position.set(x, 5.3, -2);
    group.add(l);
  }
  const fill = new THREE.HemisphereLight(0x364344, 0x111311, 1.1);
  group.add(fill);

  // CNC machine
  const machine = new THREE.Group();
  const metal = standard(0x5d6466, metalTexture(145, 0x5d6466), { metalness: 0.75, roughness: 0.42 });
  const darkMetal = standard(0x292e30, metalTexture(146, 0x292e30), { metalness: 0.7, roughness: 0.5 });
  box(machine, [4.2, 0.7, 3.2], [0, 0.35, 0], darkMetal, true, true);
  box(machine, [4.0, 1.7, 0.35], [0, 1.55, -1.45], metal, true);
  box(machine, [0.35, 1.7, 3.0], [-1.95, 1.55, 0], metal, true);
  box(machine, [0.35, 1.7, 3.0], [1.95, 1.55, 0], metal, true);
  box(machine, [4.0, 0.25, 3.0], [0, 2.5, 0], metal, true);
  const window = new THREE.Mesh(
    new THREE.PlaneGeometry(3.1, 1.2),
    new THREE.MeshPhysicalMaterial({ color: 0x80a0a2, transparent: true, opacity: 0.16, roughness: 0.05, side: THREE.DoubleSide }),
  );
  window.position.set(0, 1.65, 1.52);
  machine.add(window);
  // tool head
  const head = new THREE.Group();
  box(head, [1.2, 0.7, 1.0], [0, 0, 0], darkMetal, true);
  box(head, [0.2, 0.55, 0.2], [0, -0.55, 0.1], standard(0x9a9f9e, metalTexture(147, 0x9a9f9e), { metalness: 0.9, roughness: 0.25 }));
  box(head, [0.08, 0.55, 0.08], [0, -1.1, 0.1], standard(0xaeb3b0, null, { metalness: 0.9, roughness: 0.2 }));
  head.position.set(0, 1.55, 0.1);
  machine.add(head);
  // vice and meteorite
  const vise = new THREE.Group();
  box(vise, [0.9, 0.2, 0.9], [0, -2.2, 0], darkMetal);
  box(vise, [0.35, 0.35, 0.9], [-0.35, -2.0, 0], darkMetal);
  box(vise, [0.35, 0.35, 0.9], [0.35, -2.0, 0], darkMetal);
  const rawRock = new THREE.Mesh(
    meteoriteGeometry(7, 0.012, 151),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.5 }),
  );
  rawRock.position.set(0, -1.95, 0);
  rawRock.castShadow = true;
  vise.add(rawRock);
  head.add(vise);
  // control panel
  const panel = new THREE.Group();
  box(panel, [1.0, 1.2, 0.2], [2.8, 1.35, 0.8], darkMetal);
  const panelScreen = picture(panel, screenTexture(["FINE CUT  036", "FEED 0.02 mm", "RPM  1800", "COOLANT ON", ">> RUNNING"], "#8fd8b0"), 0.8, 0.5, [0, 1.55, 0.92]);
  box(panel, [0.8, 0.06, 0.04], [2.8, 1.0, 0.92], standard(0x9db7ae, null, { emissive: 0x4e8b79, emissiveIntensity: 0.6 }));
  machine.add(panel);
  machine.position.set(-1.2, 0, -1.4);
  group.add(machine);

  // tool cabinet and rolling cart
  const cabinet = new THREE.Group();
  for (let i = 0; i < 5; i++) box(cabinet, [1.15, 0.32, 0.6], [0, 0.18 + i * 0.34, 0], standard(0x5e665f, metalTexture(152, 0x5e665f), { metalness: 0.4 }));
  cabinet.position.set(4.9, 0, -4.6);
  group.add(cabinet);
  const cart = new THREE.Group();
  box(cart, [1.4, 0.08, 0.8], [0, 0.9, 0], metal);
  for (const [x, z] of [[-0.55, -0.3], [0.55, -0.3], [-0.55, 0.3], [0.55, 0.3]] as const) {
    box(cart, [0.06, 0.9, 0.06], [x, 0.45, z], metal);
  }
  cart.position.set(1.9, 0, 0.2);
  group.add(cart);

  // Tray of 36 machined cylinders.
  const tray = new THREE.Group();
  box(tray, [1.6, 0.04, 0.9], [0, 0.955, 0], darkMetal);
  const cylMat = new THREE.MeshStandardMaterial({ color: 0x77736c, metalness: 0.65, roughness: 0.38 });
  const cylGeo = new THREE.BoxGeometry(0.048, 0.18, 0.048);
  const cylinders: THREE.Mesh[] = [];
  for (let i = 0; i < 36; i++) {
    const m = new THREE.Mesh(cylGeo, cylMat);
    m.position.set(-0.66 + (i % 12) * 0.12, 1.06, -0.22 + Math.floor(i / 12) * 0.22);
    m.rotation.set(Math.PI / 2, 0, 0);
    m.visible = false;
    tray.add(m);
    cylinders.push(m);
  }
  tray.position.set(1.9, 0, 0.2);
  group.add(tray);

  // Work light and cutting dust
  const workLight = new THREE.SpotLight(0xcde7e4, 110, 9, 0.75, 0.65, 1.2);
  workLight.position.set(1.6, 4.6, 1.6);
  workLight.target.position.set(-1.2, 1.2, -1.4);
  workLight.castShadow = true;
  workLight.shadow.mapSize.set(1024, 1024);
  group.add(workLight, workLight.target);
  const machineLight = new THREE.PointLight(0x88c9c2, 8, 4, 2);
  machineLight.position.set(-1.2, 2.2, 0.2);
  group.add(machineLight);
  const taskLight = new THREE.PointLight(0xd6ece6, 45, 4.5, 2);
  taskLight.position.set(1.9, 2.15, 1.15);
  group.add(taskLight);

  const dust = points(group, 300, 3.2, 0.028, dustTexture(), 0xd7ded8, 0.3);
  dust.position.set(-1.2, 1.5, -0.4);
  const sparks = points(group, 60, 1.2, 0.03, dustTexture(), 0xffd08a, 0.75);
  sparks.position.set(-1.2, 1.2, -1.3);
  const steam = points(group, 80, 1.0, 0.18, smokeTexture(), 0x9fb7b2, 0.12);
  steam.position.set(-1.2, 1.1, -0.8);

  const { zhangWork } = world.cast;
  zhangWork.root.position.set(1.5, 0, 2.1);
  zhangWork.root.rotation.y = 2.0;
  applyStanding(zhangWork, 0);

  world.props.workshop = {
    machine,
    head,
    rawRock,
    tray,
    cylinders,
    panelScreen,
    dust,
    sparks,
    steam,
    update(t: number, local: number, macro: boolean) {
      const running = local > 4 && local < 24;
      head.position.y = 1.55 - Math.max(0, Math.sin((local - 4) * 0.9)) * 0.22;
      rawRock.visible = local < 18;
      for (let i = 0; i < cylinders.length; i++) cylinders[i]!.visible = local > 17.5 + i * 0.025;
      dust.visible = running;
      sparks.visible = local > 5 && local < 20;
      steam.visible = running;
      dust.rotation.y = local * 0.12;
      steam.position.y = 1.1 + (local * 0.2) % 0.6;
      panelScreen.material.opacity = 1;
      zhangWork.joints.neck.rotation.set(0.14, 0.22 + Math.sin(local * 0.2) * 0.05, 0);
      zhangWork.joints.armR.rotation.set(-0.35 + Math.sin(local * 0.7) * 0.05, 0.02, 0.12);
      zhangWork.joints.armL.rotation.set(-0.28, -0.05, -0.1);
      zhangWork.joints.hips.position.y = 12 + Math.sin(t * 1.3) * 0.04;
      if (macro) {
        const p = (local - 14) / 14;
        world.setCamera(V2(2.55 - Math.max(0, p) * 0.18, 1.95, 1.85 - Math.max(0, p) * 0.12), V2(1.9, 1.02, 0.15), 34, 0.01);
      } else {
        const p = local / 14;
        world.setCamera(V2(6.5 - p * 1.3, 2.75 - p * 0.2, 6.6 - p * 0.7), V2(-1.1, 1.35, -1.4), 44, 0.01);
      }
    },
  };

  (group as any).update = (t: number, local: number, macro = false) => world.props.workshop.update(t, local, macro);
}

/* ---------------------------------------------------------------- basement */

function buildBasement(world: World): void {
  const group = new THREE.Group();
  world.sets.basement = group;
  group.visible = false;

  const wallMat = standard(0x4a4740, concreteTexture(161, "#4a4740"), { roughness: 1 });
  const floorMat = standard(0x34322e, concreteTexture(162, "#34322e"), { roughness: 1 });
  box(group, [7, 0.25, 7], [0, -0.12, 0], floorMat, false, true);
  box(group, [7, 3.0, 0.3], [0, 1.5, -3.5], wallMat, true, true);
  box(group, [0.3, 3.0, 7], [-3.5, 1.5, 0], wallMat, true, true);
  box(group, [0.3, 3.0, 7], [3.5, 1.5, 0], wallMat, true, true);
  box(group, [7, 0.2, 7], [0, 3.0, 0], wallMat);
  // door
  box(group, [1.2, 2.2, 0.14], [1.8, 1.1, 3.42], standard(0x343b38, metalTexture(163, 0x343b38), { metalness: 0.5 }));
  box(group, [0.9, 0.05, 0.1], [1.8, 1.8, 3.33], standard(0x8a8f86, null, { metalness: 0.6 }));
  const underDoor = emissive(group, [1.05, 0.02, 0.02], [1.8, 0.02, 3.34], 0x86b4bf, 1.6);

  // bench
  const benchMat = standard(0x3d2b1f, woodTexture(164, "#3d2b1f"), { roughness: 0.9 });
  box(group, [4.8, 0.14, 0.8], [0, 0.86, -3.05], benchMat, true, true);
  for (const x of [-2.1, 2.1]) box(group, [0.14, 0.86, 0.7], [x, 0.43, -3.05], standard(0x2a1d16, woodTexture(165, "#2a1d16")));
  // shelves
  for (let i = 0; i < 3; i++) box(group, [1.4, 0.06, 0.5], [-2.55, 1.2 + i * 0.5, 2.0], benchMat);
  box(group, [0.12, 1.9, 0.5], [-3.2, 1.3, 2.0], benchMat);
  // boxes and jars
  for (let i = 0; i < 6; i++) {
    box(group, [0.28, 0.34, 0.28], [-2.9 + (i % 3) * 0.4, 0.18, 1.65 + Math.floor(i / 3) * 0.4], standard(0x43483f, metalTexture(166, 0x43483f), { metalness: 0.2 }));
  }

  // one hanging bulb
  const bulbGroup = new THREE.Group();
  box(bulbGroup, [0.02, 0.7, 0.02], [0, 2.65, 0], standard(0x24221e, null));
  const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.12), new THREE.MeshBasicMaterial({ color: 0xffd9a2, toneMapped: false }));
  bulb.position.set(0, 2.26, 0);
  bulbGroup.add(bulb);
  const shade = box(bulbGroup, [0.48, 0.18, 0.48], [0, 2.4, 0], new THREE.MeshStandardMaterial({ color: 0x3b3a31, roughness: 0.8 }));
  const bulbLight = new THREE.PointLight(0xffcf8f, 30, 8, 2);
  bulbLight.position.set(0, 2.2, 0);
  bulbLight.castShadow = true;
  bulbLight.shadow.mapSize.set(1024, 1024);
  bulbLight.shadow.bias = -0.0005;
  group.add(bulbGroup, bulbLight);
  group.add(new THREE.HemisphereLight(0x28251d, 0x0b0a08, 0.85));
  const benchFill = new THREE.PointLight(0xffd9b0, 20, 5, 2);
  benchFill.position.set(1.8, 1.55, -1.4);
  group.add(benchFill);
  const doorFill = new THREE.PointLight(0x86b4bf, 8, 4.5, 2);
  doorFill.position.set(2.0, 0.8, 2.9);
  group.add(doorFill);

  // work pieces on bench
  const brass = new THREE.MeshStandardMaterial({ color: 0xa7864f, metalness: 0.8, roughness: 0.32 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x6e6a62, metalness: 0.6, roughness: 0.4 });
  const bulletGroup = new THREE.Group();
  const caseGeo = new THREE.BoxGeometry(0.034, 0.085, 0.034);
  const tipGeo = new THREE.BoxGeometry(0.03, 0.045, 0.03);
  const bullets: THREE.Group[] = [];
  for (let i = 0; i < 36; i++) {
    const b = new THREE.Group();
    const c = new THREE.Mesh(caseGeo, brass);
    const t = new THREE.Mesh(tipGeo, stone);
    t.position.y = 0.062;
    b.add(c, t);
    b.position.set(-1.8 + (i % 9) * 0.12, 0.94, -3.28 + Math.floor(i / 9) * 0.115);
    b.rotation.y = (i % 2) * 0.1;
    bulletGroup.add(b);
    bullets.push(b);
  }
  group.add(bulletGroup);

  const pliers = new THREE.Group();
  box(pliers, [0.5, 0.03, 0.08], [0, 0, 0], standard(0x4b4f4c, metalTexture(167, 0x4b4f4c), { metalness: 0.7 }));
  box(pliers, [0.24, 0.03, 0.1], [0.36, 0, 0], standard(0x4b4f4c, null, { metalness: 0.7 }));
  pliers.position.set(-2.2, 0.94, -2.75);
  pliers.rotation.y = 0.4;
  group.add(pliers);
  const glue = box(group, [0.08, 0.2, 0.08], [-1.0, 1.02, -2.85], standard(0xbfc5b8, null, { roughness: 0.4 }));
  box(group, [0.04, 0.08, 0.04], [-1.0, 1.16, -2.85], standard(0x2e3230, null));

  // pistol on bench
  const benchPistol = makePistol();
  benchPistol.position.set(0.55, 0.98, -2.85);
  benchPistol.rotation.set(0, 1.2, 0);
  benchPistol.scale.setScalar(0.056);
  group.add(benchPistol);

  // test bundle at the wall
  const bundle = new THREE.Group();
  const clothMat = standard(0x8b8574, fabricTexture(168, "#8b8574"), { roughness: 1 });
  const cloth = box(bundle, [0.72, 0.5, 0.24], [0, 0, 0], clothMat, true);
  const strap = box(bundle, [0.1, 0.55, 0.27], [0, 0, 0], standard(0x5a5040, fabricTexture(169, "#5a5040")));
  bundle.position.set(-1.45, 1.4, -3.3);
  group.add(bundle);
  const stand = box(group, [0.25, 1.4, 0.25], [-1.45, 0.7, -3.3], benchMat);

  // beef after the shot
  const beefGroup = new THREE.Group();
  const rawBeef = box(beefGroup, [0.56, 0.28, 0.34], [0, 0, 0], new THREE.MeshStandardMaterial({ color: 0x9a3a36, map: meatTexture(), roughness: 0.62 }));
  // five entrance holes
  for (let i = 0; i < 5; i++) {
    const hole = new THREE.Mesh(
      new THREE.BoxGeometry(0.032, 0.032, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x140607 }),
    );
    hole.position.set(-0.17 + i * 0.075, 0.05 - (i % 2) * 0.08, 0.175);
    beefGroup.add(hole);
  }
  const openCloth = box(beefGroup, [0.9, 0.06, 0.7], [0, -0.18, 0], clothMat);
  beefGroup.position.set(0.0, 1.15, -2.25);
  beefGroup.rotation.x = -0.15;
  beefGroup.visible = false;
  group.add(beefGroup);

  // tiny stone fragments on a white cloth
  const fragGroup = new THREE.Group();
  const whiteCloth = box(fragGroup, [0.5, 0.03, 0.4], [0, 0, 0], standard(0xcfc9b8, fabricTexture(170, "#cfc9b8")));
  const fragMat = new THREE.MeshStandardMaterial({ color: 0x6b675f, roughness: 0.6, metalness: 0.3 });
  for (let i = 0; i < 7; i++) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.02 + (i % 3) * 0.01, 0.015, 0.015), fragMat);
    f.position.set(-0.12 + i * 0.04, 0.03, (i % 2 - 0.5) * 0.1);
    f.rotation.set(i, i * 2, i * 0.5);
    fragGroup.add(f);
  }
  fragGroup.position.set(0.2, 1.02, -2.55);
  fragGroup.visible = false;
  group.add(fragGroup);

  // muzzle flash light + sprite
  const flash = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture("rgba(255,248,220,1)", "rgba(255,150,50,0)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  flash.scale.set(1.0, 1.0, 1);
  flash.visible = false;
  group.add(flash);
  const flashLight = new THREE.PointLight(0xffb36a, 0, 9, 2);
  group.add(flashLight);
  const smoke = points(group, 40, 0.3, 0.18, smokeTexture(), 0xb8b2a4, 0.24);
  smoke.position.set(-1.45, 1.4, -3.1);
  smoke.visible = false;

  const { zhangWork } = world.cast;
  zhangWork.root.position.set(0.4, 0, 0.4);
  zhangWork.root.rotation.y = Math.PI + 0.16;
  applyStanding(zhangWork, 0);
  const gun = makePistol();
  gun.visible = false;
  zhangWork.anchors.handR.add(gun);
  gun.rotation.set(-0.1, 0, 0);

  world.props.basement = {
    bulbGroup,
    bulbLight,
    bullets,
    bulletGroup,
    bundle,
    beefGroup,
    fragGroup,
    flash,
    flashLight,
    smoke,
    gun,
    zhangWork,
    buildTime: 0,
    shotTime: 210.0,
    update(t: number, local: number, global: number) {
      // swinging bare bulb
      const swing = Math.sin(t * 1.05) * 0.055;
      bulbGroup.rotation.z = swing;
      bulbLight.position.x = Math.sin(swing) * 2.1;
      bulbLight.position.z = -0.1 + Math.cos(swing) * 0.5;
      bulbLight.intensity = 40 + Math.sin(t * 13.7) * 1.5;

      // Actor: either assembling at the bench, or raising and firing.
      const testing = global >= 207.5;
      if (!testing) {
        applyPose(zhangWork, {
          ...basePose(t),
          hips: [0.02, 0.04, 0],
          neck: [0.32, 0.08, 0],
          armR: [-0.9 + Math.sin(t * 0.9) * 0.06, 0.15, 0.28],
          armL: [-0.78, -0.12, -0.25],
          legR: [0.02, 0, 0.04],
          legL: [-0.02, 0, -0.04],
        });
        gun.visible = false;
      } else {
        const aimP = Math.min(1, Math.max(0, (global - 208.4) / 1.4));
        const lowered = Math.min(1, Math.max(0, (global - 211.4) / 1.2));
        const aimAmount = aimP * (1 - lowered);
        applyPose(zhangWork, {
          ...aimPose(t, -0.02),
          armR: [-Math.PI / 2 + aimAmount * 0.0 - (1 - aimAmount) * 0.9, 0.02, 0.045],
          armL: [-1.06 * aimAmount - 0.3, -0.22, -0.44 * aimAmount],
          neck: [-0.05 + (1 - aimAmount) * 0.1, 0.06, 0],
          hips: [0, 0.1, 0],
          legR: [0.06, 0, 0.04],
          legL: [-0.04, 0, -0.04],
        });
        gun.visible = global > 208.6 && global < 214.5;
        const kick = Math.exp(-Math.abs(global - 210.0) * 16);
        zhangWork.joints.armR.rotation.x += kick * 0.16;
        zhangWork.joints.hips.rotation.x -= kick * 0.03;
        const fire = Math.abs(global - 210.0);
        if (fire < 0.07) {
          flash.visible = true;
          flashLight.intensity = 25;
          const muzzle = new THREE.Vector3();
          gun.getWorldPosition(muzzle);
          flash.position.copy(muzzle);
          flashLight.position.copy(muzzle);
        } else {
          flash.visible = false;
          flashLight.intensity = 0;
        }
        bundle.visible = global < 212.2;
        beefGroup.visible = global >= 212.2 && global < 217.6;
        fragGroup.visible = global >= 217.6;
        smoke.visible = global > 210.0 && global < 213.5;
        (smoke.material as THREE.PointsMaterial).opacity = Math.max(0, 0.24 - (global - 210.0) * 0.06);
      }

      if (local > 3 && local < 20 && !testing) {
        // subtle assembly rhythm: hands meet over the tray
        zhangWork.joints.armR.rotation.z = 0.28 + Math.sin(local * 1.7) * 0.05;
      }
    },
  };

  (group as any).update = (t: number, local: number, global: number) => {
    world.props.basement.update(t, local, global);
    const cameraZ = 2.9;
    const p = local / 36;
    if (global < 207.5) {
      world.setCamera(V2(1.6 - p * 0.35, 1.72, cameraZ), V2(-0.4, 1.1, -2.9), 46, 0.01);
    } else if (global >= 209.55 && global < 210.55) {
      // Reverse angle on the shot itself: face, pistol, and the flash in one frame.
      world.setCamera(V2(-2.55, 1.48, -2.85), V2(0.4, 1.32, 0.15), 52, 0.01);
    } else if (global < 212.2) {
      world.setCamera(V2(2.7, 1.65, 2.6), V2(-0.5, 1.35, -2.7), 54, 0.01);
    } else if (global < 217.6) {
      world.setCamera(V2(0.55, 1.50, -1.1), V2(-0.05, 1.13, -2.3), 26, 0.005);
    } else {
      world.setCamera(V2(0.9, 1.35, -1.55), V2(0.18, 1.02, -2.55), 24, 0.005);
    }
  };
}

/* --------------------------------------------------------------------- EVA */

function createSuitBackpack(figure: Figure): THREE.Mesh {
  const pack = new THREE.Mesh(suitPackGeometry(), voxelMaterial({ roughness: 0.7, metalness: 0.1 }));
  pack.castShadow = true;
  figure.anchors.back.add(pack);
  return pack;
}

function buildEva(world: World): void {
  const group = new THREE.Group();
  world.sets.eva = group;
  group.visible = false;

  const earth = createEarth(1.12);
  earth.position.set(6, -45, -108);
  earth.rotation.set(0.2, 0.1, 0.15);
  group.add(earth);

  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: sunTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  sun.position.set(64, -9, -150);
  sun.scale.set(58, 58, 1);
  group.add(sun);

  const sunLight = new THREE.DirectionalLight(0xffeccd, 3.8);
  sunLight.position.set(70, -20, -40);
  group.add(sunLight);
  const rim = new THREE.DirectionalLight(0x6a9fd6, 0.9);
  rim.position.set(-70, 15, 60);
  group.add(rim);
  const fill = new THREE.DirectionalLight(0x8fb4d8, 1.5);
  fill.position.set(0, 12, 40);
  group.add(fill);
  group.add(new THREE.AmbientLight(0x1b2735, 0.32));

  // One Base: a compact outpost with solar wings.
  const base = new THREE.Group();
  const baseMat = standard(0x6c7173, metalTexture(181, 0x6c7173), { metalness: 0.6, roughness: 0.5 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x1c3346, metalness: 0.55, roughness: 0.35, emissive: 0x0c1c28, emissiveIntensity: 0.5 });
  box(base, [8, 4, 6], [0, 0, 0], baseMat, true);
  box(base, [2.4, 2.2, 2.4], [4.6, -0.4, 0], baseMat, true);
  for (const x of [-7.2, 7.2]) {
    box(base, [6.2, 0.16, 3.2], [x, 0.8, 0], panelMat);
    box(base, [0.3, 0.3, 3.4], [x * 0.72, 0.7, 0], baseMat);
  }
  const beacons: THREE.Mesh[] = [];
  for (const x of [-3, 3]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), new THREE.MeshBasicMaterial({ color: 0xff5a42, toneMapped: false }));
    b.position.set(x, 2.2, 3.1);
    base.add(b);
    beacons.push(b);
  }
  base.position.set(-14, 22, 20);
  base.rotation.y = 0.4;
  group.add(base);
  const baseLight = new THREE.PointLight(0xff8a5e, 8, 14, 2);
  baseLight.position.set(-11, 24, 22);
  group.add(baseLight);

  // Yellow River station in the distance
  const station = createRingStation(12, 2.8, 0.68, 0x9aa2a8);
  station.position.set(-15, 34, -30);
  station.rotation.y = 0.2;
  group.add(station);
  const stationLight = new THREE.PointLight(0xffc879, 12, 40, 2);
  stationLight.position.set(-15, 34, -28);
  group.add(stationLight);

  // Floating debris and ice crystals.
  const rand = rng(191);
  const debris: THREE.Mesh[] = [];
  for (let i = 0; i < 34; i++) {
    const m = box(
      group,
      [0.5 + rand() * 2.6, 0.3 + rand() * 1.8, 0.4 + rand() * 2.2],
      [(rand() - 0.5) * 46, 18 + rand() * 28, -16 + rand() * 38],
      standard(0x5f6465, metalTexture(182 + i, 0x5f6465), { metalness: 0.5, roughness: 0.65 }),
    );
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.userData.drift = new THREE.Vector3((rand() - 0.5) * 0.03, (rand() - 0.5) * 0.02, (rand() - 0.5) * 0.03);
    m.userData.base = m.position.clone();
    debris.push(m);
  }

  // Beihai in EVA suit.
  const { zhangSuit } = world.cast;
  zhangSuit.root.position.set(4.6, 17.5, 14.5);
  zhangSuit.root.rotation.set(0.1, 0.2, -0.08);
  applyPose(zhangSuit, floatPose(0));
  const pack = createSuitBackpack(zhangSuit);
  const pistol = makePistol();
  pistol.visible = false;
  zhangSuit.anchors.handR.add(pistol);
  const scope = new THREE.Mesh(
    voxelModel({
      palette: { "#": 0x2c3438, l: 0x8ed0d3 },
      layers: [["..####..", ".######.", "##llll##", "##llll##", ".######.", "..####.."], ["..####..", ".######.", "##llll##", "##llll##", ".######.", "..####.."]],
      axis: "x",
      voxel: 0.18,
    }),
    voxelMaterial({ metalness: 0.5, roughness: 0.3 }),
  );
  scope.position.set(0, 0, 0.4);
  scope.visible = false;
  zhangSuit.anchors.handL.add(scope);
  const glove = makeGloveProp();
  glove.position.set(5.4, 18.2, 15.2);
  glove.rotation.set(0.4, 0.1, 0.2);
  glove.scale.setScalar(0.058);
  glove.visible = false;
  group.add(glove);

  // thruster particles
  const thruster = points(group, 100, 0.6, 0.12, dustTexture(), 0xbfe6ff, 0.5);
  thruster.position.set(4.4, 18.5, 14);
  thruster.visible = false;

  // Muzzle flash and spare magazines for the vacuum sequence.
  const flash = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture("rgba(255,250,228,1)", "rgba(255,150,55,0)"),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  flash.scale.set(1.35, 1.35, 1);
  flash.visible = false;
  group.add(flash);
  const flashLight = new THREE.PointLight(0xffbd7a, 0, 10, 2);
  group.add(flashLight);
  const magazines: THREE.Mesh[] = [];
  for (let i = 0; i < 2; i++) {
    const mag = new THREE.Mesh(magazineGeometry(), voxelMaterial({ roughness: 0.5, metalness: 0.6 }));
    mag.scale.setScalar(0.058);
    mag.visible = false;
    group.add(mag);
    magazines.push(mag);
  }

  // A small locator left behind, blinking inside the base.
  const locator = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.06), new THREE.MeshBasicMaterial({ color: 0xff6c55, toneMapped: false }));
  locator.position.set(1.6, 1.15, 3.15);
  base.add(locator);

  // A single foreground meteorite, the recurring image.
  const foreRock = new THREE.Mesh(
    meteoriteGeometry(5, 0.011, 202),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.35 }),
  );
  foreRock.position.set(-3.4, 16.4, 19.4);
  group.add(foreRock);

  world.props.eva = {
    earth,
    sun,
    sunLight,
    station,
    base,
    beacons,
    debris,
    zhangSuit,
    pack,
    pistol,
    scope,
    glove,
    thruster,
    flash,
    flashLight,
    magazines,
    foreRock,
    locator,
    update(t: number, local: number, mode: "depart" | "wait" | "prep" | "fire" | "retreat", global: number) {
      for (const d of debris) d.position.copy(d.userData.base as THREE.Vector3).addScaledVector(d.userData.drift as THREE.Vector3, local);
      if (mode !== "fire") {
        flash.visible = false;
        flashLight.intensity = 0;
        for (const mag of magazines) mag.visible = false;
      }
      // The suit drifts with a slow, weightless authority.
      const drift = floatPose(t);
      applyPose(zhangSuit, drift);
      const baseP = drift;
      if (mode === "depart") {
        const p = local / 22;
        zhangSuit.root.position.set(4.6 - p * 2.8, 17.5 + Math.sin(local * 0.18) * 0.12, 14.5 + p * 4.0);
        zhangSuit.root.rotation.set(0.1 + p * 0.25, 0.2 + p * 0.7, -0.08 - p * 0.1);
        thruster.visible = local > 2 && local < 12;
        thruster.position.set(zhangSuit.root.position.x - 0.4, zhangSuit.root.position.y + 1.0, zhangSuit.root.position.z - 0.3);
        thruster.rotation.z = local;
      } else if (mode === "retreat") {
        const p = local / 22;
        zhangSuit.root.position.set(1.8 + p * 5.0, 17.8 + p * 0.8, 18.5 + p * 8.0);
        zhangSuit.root.rotation.set(0.1 + p * 0.4, 0.9 + p * 0.6, -0.2 - p * 0.2);
        thruster.visible = true;
        thruster.position.set(zhangSuit.root.position.x - 0.5, zhangSuit.root.position.y + 1.0, zhangSuit.root.position.z - 0.4);
        thruster.rotation.z = local * 2;
      } else if (mode === "wait") {
        zhangSuit.root.position.set(4.6, 17.5 + Math.sin(local * 0.18) * 0.08, 14.5);
      } else {
        zhangSuit.root.position.set(4.6, 17.5 + Math.sin(local * 0.2) * 0.06, 14.5);
        zhangSuit.root.rotation.set(0.08, 0.15, -0.06);
      }
      // cross-body acting for the scope
      const holdingScope = mode === "wait" || mode === "prep" || mode === "fire";
      zhangSuit.joints.armL.rotation.set(holdingScope ? -0.55 : baseP.armL![0], holdingScope ? -0.15 : 0, holdingScope ? -0.42 : 0);
      if (mode === "prep") {
        zhangSuit.joints.armR.rotation.set(-0.9, 0.1, 0.16);
        zhangSuit.joints.neck.rotation.set(0.12, 0.14, 0);
      }
      if (mode === "fire") {
        const aim = Math.min(1, Math.max(0, (local - 1.0) / 1.2));
        zhangSuit.joints.armR.rotation.set(-Math.PI / 2 + (1 - aim) * 0.3, 0.02, 0.05);
        zhangSuit.joints.neck.rotation.set(-0.04, 0.1, 0);
        zhangSuit.joints.hips.rotation.set(-0.12, 0.1, 0);
        let kick = 0;
        for (const ft of FIRE_TIMES) {
          if (global >= ft) kick = Math.max(kick, Math.exp(-(global - ft) * 18));
        }
        zhangSuit.joints.armR.rotation.x += kick * 0.055;
        zhangSuit.joints.neck.rotation.x -= kick * 0.02;
        zhangSuit.joints.hips.rotation.x -= kick * 0.018;
      }
      // keep the helmet and limbs alive even when the body is otherwise still
      zhangSuit.joints.hips.position.y = 12 + Math.sin(t * 1.2) * 0.18;
      zhangSuit.joints.legR.rotation.z = 0.16 + Math.sin(t * 0.6) * 0.04;
      zhangSuit.joints.legL.rotation.z = -0.16 - Math.sin(t * 0.6 + 1) * 0.04;
      pack.rotation.z = Math.sin(t * 0.4) * 0.02;
      foreRock.rotation.y = t * 0.09;
      foreRock.rotation.x = t * 0.05;
      beacons[0]!.visible = Math.sin(t * 2.2) > 0;
      beacons[1]!.visible = Math.sin(t * 2.2 + Math.PI) > 0;
      locator.visible = Math.sin(t * 3.4) > 0.2;
      station.rotation.z = 0.1 + t * 0.003;
      // sunset progression
      const sunPhase = Math.min(1, Math.max(0, (global - 246) / 46));
      sun.position.y = -18 - sunPhase * 48;
      sun.position.x = 50 + sunPhase * 22;
      sun.scale.setScalar(56 + sunPhase * 8);
      sunLight.color.setHSL(0.1 - sunPhase * 0.035, 0.55 + sunPhase * 0.2, 0.9 - sunPhase * 0.12);
      sunLight.intensity = 3.8 - sunPhase * 1.3;
      earth.rotation.y = 0.1;
    },
  };

  (group as any).update = (t: number, local: number, mode: "depart" | "wait" | "prep" | "fire" | "retreat", global: number) => {
    world.props.eva.update(t, local, mode, global);
    if (mode === "depart") {
      const p = local / 22;
      world.setCamera(V2(0.8 - p * 0.5, 18.4, 39 - p * 5), V2(2.2, 18.2, 10), 45, 0.01);
    } else if (mode === "wait") {
      const p = local / 20;
      world.setCamera(V2(-0.8 + p * 1.2, 18.8 + p * 0.4, 30.5 - p * 2.2), V2(2.2, 19.0, 6), 38, 0.01);
    } else if (mode === "prep") {
      const p = local / 6;
      world.setCamera(V2(7.6 - p * 0.2, 18.7, 17.9 - p * 0.3), V2(4.55, 18.2, 14.7), 42, 0.01);
    } else if (mode === "fire") {
      const p = local / 10.5;
      const shake = Math.sin(local * 23) * 0.006 * Math.max(0, 1 - local / 8);
      world.setCamera(V2(8.4 + shake, 18.6 + shake, 16.2 - p * 0.2), V2(4.6, 18.15, 14.8), 40, 0.01);
    } else {
      world.setCamera(V2(-1.5 + Math.min(1, local / 22) * 3.0, 19.5, 34), V2(5.0, 19.2, 6), 42, 0.01);
    }
  };
}

/* ------------------------------------------------------------------- photo */

function buildPhoto(world: World): void {
  const group = new THREE.Group();
  world.sets.photo = group;
  group.visible = false;

  const earth = createEarth(1.32);
  earth.position.set(0, -92, -115);
  earth.rotation.set(1.08, 0.35, 0.28);
  group.add(earth);

  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: sunTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  sun.position.set(34, 14, -70);
  sun.scale.set(46, 46, 1);
  group.add(sun);
  const sunLight = new THREE.DirectionalLight(0xffe4b8, 4.4);
  sunLight.position.set(50, 20, -30);
  group.add(sunLight);
  const fill = new THREE.DirectionalLight(0x9fc0d8, 1.8);
  fill.position.set(0, 18, 50);
  group.add(fill);
  group.add(new THREE.AmbientLight(0x24313c, 0.36));

  // A curved station wall, built from panels.
  const wall = new THREE.Group();
  const panelMat = standard(0x767d7e, metalTexture(201, 0x767d7e), { metalness: 0.65, roughness: 0.48 });
  const darkMat = standard(0x333a3c, metalTexture(202, 0x333a3c), { metalness: 0.7, roughness: 0.55 });
  const width = 36;
  for (let i = 0; i < 12; i++) {
    const x = -width / 2 + 1.5 + i * 3;
    const h = 9 - Math.abs(x) * 0.06;
    box(wall, [2.9, h, 0.4], [x, h / 2 - 2.5, 0], i % 3 === 0 ? darkMat : panelMat);
    for (let j = 0; j < 4; j++) {
      if ((i + j) % 3 === 0) {
        emissive(wall, [0.24, 0.12, 0.05], [x - 0.85 + (j % 2) * 1.7, -1.2 + j * 1.9, 0.23], 0xffd08e, 1.5);
      }
    }
  }
  // upper and lower structural rails
  box(wall, [width, 0.35, 0.5], [0, -2.55, 0.05], darkMat);
  box(wall, [width, 0.35, 0.5], [0, 5.9, 0.05], darkMat);
  // hazard chevrons around the hatch
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const x = Math.cos(a) * 2.4;
    const y = Math.sin(a) * 2.4;
    const m = box(wall, [0.5, 0.16, 0.08], [x, y + 1.4, 0.26], new THREE.MeshStandardMaterial({ color: 0xb18a3d, roughness: 0.8 }), false);
    m.rotation.z = a + Math.PI / 2;
  }
  // hatch opening and sliding door
  const hatchBack = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.2, 0.2), new THREE.MeshBasicMaterial({ color: 0x070b0d }));
  hatchBack.position.set(0, 1.4, 0.12);
  wall.add(hatchBack);
  const doorL = box(wall, [2.05, 4.0, 0.18], [-1.02, 1.4, 0.3], panelMat);
  const doorR = box(wall, [2.05, 4.0, 0.18], [1.02, 1.4, 0.3], panelMat);
  // station sign
  const sign = picture(wall, labelTexture("黄 河 站", "#d9c088", "#171b1c"), 4.4, 2.2, [0, 6.8, 0.28]);
  wall.position.set(0, 0.2, -10.5);
  group.add(wall);

  // A file of tiny service lights along the wall.
  for (let i = 0; i < 18; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0xffce8e, toneMapped: false }));
    m.position.set(-16 + i * 1.9, -2.0, -10.2);
    group.add(m);
  }

  // Photo group.
  const suit = getSuitTextures();
  const photoPositions: THREE.Vector3[] = [];
  const frontX = [-1.15, 0, 1.15, -2.55, 2.55];
  const backX = [-2.0, -1.0, 0, 1.0, 2.0];
  for (let i = 0; i < 10; i++) {
    const x = i < 5 ? frontX[i]! : backX[i - 5]!;
    const z = i < 5 ? 0 : -1.7;
    const y = i < 5 ? 0.15 : 0.45;
    photoPositions.push(new THREE.Vector3(x, y, z));
  }
  for (let i = 0; i < world.cast.photo.length; i++) {
    const f = world.cast.photo[i]!;
    f.root.position.copy(photoPositions[i]!);
    f.root.rotation.y = 0;
    applyPose(f, floatPose(i * 1.3));
    createSuitBackpack(f);
    f.setClothes(suit.opaque);
  }

  // impact effects
  const gasJets: THREE.Points[] = [];
  const bloodJets: THREE.Points[] = [];
  const rand = rng(2211);
  for (let i = 0; i < 5; i++) {
    const make = (color: number, tex: THREE.Texture, size: number, count: number, op: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size, map: tex, color, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
      const p = new THREE.Points(geo, mat);
      p.visible = false;
      group.add(p);
      return p;
    };
    gasJets.push(make(0xe8f4f6, dustTexture(), 0.085, 90, 0.7));
    bloodJets.push(make(0x9f2c29, dustTexture(), 0.04, 40, 0.8));
  }

  // muzzle flashes seen from the firing position, not from the target set.
  const flash = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture("rgba(255,248,220,1)", "rgba(255,150,50,0)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  flash.visible = false;
  group.add(flash);

  world.props.photo = {
    wall,
    doorL,
    doorR,
    photoPositions,
    gasJets,
    bloodJets,
    sun,
    sunLight,
    earth,
    flash,
    hit: [false, false, false, false, false, false, false, false, false, false],
    update(t: number, local: number, global: number, view: "lineup" | "scope" | "impact") {
      const suitTex = getSuitTextures();
      // visors become transparent as the sun goes down
      const clear = global > 272.6;
      for (let i = 0; i < world.cast.photo.length; i++) {
        const f = world.cast.photo[i]!;
        let next = suitTex.opaque;
        if (i < 3) {
          const hitAt = IMPACT_TIMES[i * 10] ?? IMPACT_TIMES[0]!;
          if (global > hitAt) next = suitTex.damaged[i]!;
          else if (clear) next = suitTex.clear;
        } else if (i >= 5 && global > 303) next = suitTex.opaque;
        else if (clear) next = suitTex.clear;
        if ((f.clothing.head.material as THREE.MeshStandardMaterial).map !== next) f.setClothes(next);
      }
      // door opens
      const seq = global - 268;
      const doorP = Math.min(1, Math.max(0, (seq - 0.4) / 1.8));
      doorL.position.x = -1.02 - doorP * 2.02;
      doorR.position.x = 1.02 + doorP * 2.02;
      // flight outward and lineup
      for (let i = 0; i < 10; i++) {
        const f = world.cast.photo[i]!;
        const start = new THREE.Vector3((i % 2) * 0.2 - 0.1, 1.4 + (i % 3) * 0.08, -10.2);
        const target = photoPositions[i]!;
        const stagger = i * 0.14;
        const p = Math.min(1, Math.max(0, (seq - 1.6 - stagger) / 3.2));
        const ease = p * p * (3 - 2 * p);
        const drift = new THREE.Vector3(
          Math.sin(t * 0.45 + i) * 0.03,
          Math.sin(t * 0.38 + i * 1.8) * 0.035,
          Math.cos(t * 0.4 + i) * 0.03,
        );
        if (global > 303) {
          const back = Math.min(1, Math.max(0, (global - 303) / 8));
          const e = back * back * (3 - 2 * back);
          f.root.position.lerpVectors(target.clone().add(drift), start, e);
          f.root.rotation.y = (1 - e) * 0 + e * 0.9;
          f.root.rotation.z = e * (i % 2 === 0 ? 0.7 : -0.6);
        } else {
          f.root.position.lerpVectors(start, target.clone().add(drift), ease);
          f.root.rotation.y = 0;
          f.root.rotation.z = (1 - ease) * 0.15;
        }
        // A formal zero-gravity line-up: upright, arms at the sides, only the
        // smallest drift so the formation still feels weightless.
        const hold = 1 - ease;
        const sway = Math.sin(t * 0.55 + i * 1.4);
        f.joints.hips.rotation.set(-0.04 + sway * 0.012, 0, sway * 0.018);
        f.joints.hips.position.y = 12 + Math.sin(t * 1.05 + i) * 0.16;
        f.joints.neck.rotation.set(0.015, Math.sin(t * 0.38 + i) * 0.05, 0);
        f.joints.armR.rotation.set(-0.14 - hold * 0.2, 0, 0.14 + Math.sin(t * 0.5 + i) * 0.02);
        f.joints.armL.rotation.set(-0.12 - hold * 0.18, 0, -0.14 - Math.sin(t * 0.5 + i) * 0.02);
        f.joints.legR.rotation.set(0.07 + Math.sin(t * 0.5 + i) * 0.025, 0, 0.055);
        f.joints.legL.rotation.set(0.035 - Math.sin(t * 0.5 + i) * 0.025, 0, -0.055);
      }
      // Impact effects. The first three are the targets; 5 and 6 are collateral.
      const targets = [0, 1, 2, 5, 6];
      for (let n = 0; n < 5; n++) {
        const fig = targets[n]!;
        const first = IMPACT_TIMES[fig === 5 ? 12 : fig === 6 ? 22 : n * 10] ?? IMPACT_TIMES[0]!;
        const since = global - first;
        const active = since > 0 && global < 310;
        const gas = gasJets[n]!;
        const blood = bloodJets[n]!;
        gas.visible = active;
        blood.visible = active && n < 3;
        if (active) {
          const origin = world.cast.photo[fig]!.root.position.clone();
          origin.y += 1.15;
          const pos = gas.geometry.getAttribute("position") as THREE.BufferAttribute;
          const r = rng(300 + n);
          for (let j = 0; j < pos.count; j++) {
            const life = Math.min(1, since / 2.4);
            const vx = (r() - 0.5) * 1.2 + (n % 2 ? 0.4 : -0.4);
            const vy = r() * 0.8 - 0.2;
            const vz = 0.45 + r() * 1.2;
            pos.setXYZ(j, origin.x + vx * life * 1.4, origin.y + vy * life * 1.2, origin.z + vz * life * 3.4);
          }
          pos.needsUpdate = true;
          (gas.material as THREE.PointsMaterial).opacity = 0.6 * (1 - since / 8);
          if (n < 3) {
            const bp = blood.geometry.getAttribute("position") as THREE.BufferAttribute;
            for (let j = 0; j < bp.count; j++) {
              const life = Math.min(1, since / 3.2);
              bp.setXYZ(j, origin.x + (r() - 0.5) * 0.45 * life, origin.y + 0.3 + r() * 0.5 * life, origin.z + 0.2 + r() * 1.3 * life);
            }
            bp.needsUpdate = true;
            (blood.material as THREE.PointsMaterial).opacity = 0.75 * (1 - since / 6);
          }
        }
      }
      // Sun slowly slips behind Earth's limb.
      const p = Math.min(1, Math.max(0, (global - 248) / 48));
      sun.position.set(30 + p * 14, 18 - p * 38, -70);
      sunLight.color.setHSL(0.1 - p * 0.04, 0.5 + p * 0.24, 0.92 - p * 0.16);
      sunLight.intensity = 4.4 - p * 1.4;
      earth.rotation.y = 0.3;
      if (view === "lineup") {
        const q = (global - 268) / 8;
        world.setCamera(V2(0.4 + q * 0.35, 1.85, 12.8 - q * 0.8), V2(0, 1.55, -1.2), 38, 0.01);
      } else if (view === "scope") {
        world.setCamera(V2(0.05, 1.78, 10.6), V2(0, 1.6, -0.9), 22, 0.01);
      } else {
        const k = Math.min(1, Math.max(0, (global - 296.5) / 12));
        world.setCamera(V2(0.1 + k * 0.4, 1.75, 7.0 + k * 1.2), V2(0, 1.55, -1.4), 34, 0.01);
      }
    },
  };

  (group as any).update = (t: number, local: number, global: number, view: "lineup" | "scope" | "impact") => {
    world.props.photo.update(t, local, global, view);
  };
}

/* ------------------------------------------------------------------ credits */

function buildCredits(world: World): void {
  const group = new THREE.Group();
  world.sets.credits = group;
  group.visible = false;
  const earth = createEarth(0.8);
  earth.position.set(-20, -60, -120);
  group.add(earth);
  const sun = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: sunTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  sun.position.set(80, -20, -140);
  sun.scale.set(40, 40, 1);
  group.add(sun);
  const light = new THREE.DirectionalLight(0xffd8b0, 1.2);
  light.position.set(40, 10, 10);
  group.add(light);
  group.add(new THREE.AmbientLight(0x131b24, 0.35));
  const rock = new THREE.Mesh(
    meteoriteGeometry(5, 0.012, 777),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.3 }),
  );
  rock.position.set(0, 0, 0);
  group.add(rock);
  (group as any).update = (t: number, local: number) => {
    rock.rotation.y = local * 0.08;
    rock.rotation.x = local * 0.04;
    world.setCamera(V2(0, 0.2, 2.2), V2(0, 0, 0), 46, 0.01);
  };
}

/* --------------------------------------------------------------- assemble */

export function buildWorld(): World {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060a);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 2400);
  const eyeTarget = new THREE.Object3D();
  eyeTarget.position.set(0, 0, -1);
  camera.add(eyeTarget);
  const eyeLight = new THREE.SpotLight(0xffe0bd, 20, 12, 0.65, 0.9, 1.6);
  eyeLight.position.set(0, 0.06, 0.05);
  eyeLight.target = eyeTarget;
  camera.add(eyeLight);
  scene.add(camera);
  const stars = createStars();
  scene.add(stars);
  const cast = createCast();
  cast.zhang.root.name = "fig-zhang";
  cast.zhou.root.name = "fig-zhou";
  cast.chang.root.name = "fig-chang";
  cast.zhangWork.root.name = "fig-work";
  cast.zhangSuit.root.name = "fig-suit";
  cast.photo.forEach((f, i) => { f.root.name = `fig-photo-${i}`; });

  const world: World = {
    scene,
    camera,
    cast,
    sets: {} as Record<SetName, THREE.Group>,
    stars,
    props: {},
    show(name, bg, fog) {
      for (const key of Object.keys(world.sets) as SetName[]) {
        world.sets[key].visible = key === name;
      }
      scene.background = new THREE.Color(bg);
      scene.fog = fog && fog > 0 ? new THREE.FogExp2(bg, fog) : null;
      world.stars.visible = name !== "hutongExt" && name !== "hutongInt" ? true : true;
      if (name === "photo" || name === "credits") world.stars.visible = true;
      camera.fov = 45;
      world.hideActors();
      const showF = (f: Figure) => { f.root.visible = true; };
      if (name === "hutongInt") { showF(cast.zhou); showF(cast.zhang); }
      else if (name === "appointment") { showF(cast.zhang); showF(cast.chang); }
      else if (name === "workshop" || name === "basement") { showF(cast.zhangWork); }
      else if (name === "eva") { showF(cast.zhangSuit); }
      else if (name === "photo") { for (const f of cast.photo) showF(f); }
    },
    hideActors() {
      for (const f of [cast.zhang, cast.zhou, cast.chang, cast.zhangWork, cast.zhangSuit, ...cast.photo]) {
        f.root.visible = false;
      }
    },
    showActor(figure, visible) {
      figure.root.visible = visible;
    },
    setCamera(position, target, fov, near = 0.01) {
      camera.position.copy(position);
      camera.lookAt(target);
      if (camera.fov !== fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      if (camera.near !== near) {
        camera.near = near;
        camera.updateProjectionMatrix();
      }
    },
    cameraShake(amount, time) {
      camera.position.x += Math.sin(time * 43.1) * amount;
      camera.position.y += Math.sin(time * 37.7 + 1.3) * amount;
    },
    updateEnvironment(time) {
      stars.rotation.y = time * 0.0008;
    },
  };

  buildCold(world);
  buildHutongExt(world);
  buildHutongInt(world);
  buildSpaceMontage(world);
  buildAppointment(world);
  buildWorkshop(world);
  buildBasement(world);
  buildEva(world);
  buildPhoto(world);
  buildCredits(world);

  for (const group of Object.values(world.sets)) scene.add(group);
  // Actors live at scene level so one performance rig can be staged in different
  // sets without rebuilding the canonical skeleton.
  for (const f of [cast.zhang, cast.zhou, cast.chang, cast.zhangWork, cast.zhangSuit, ...cast.photo]) {
    scene.add(f.root);
    f.root.visible = false;
  }
  return world;
}

export function hideSetActors(set: SetName, world: World): void {
  if (set === "hutongInt") {
    world.showActor(world.cast.zhou, false);
    world.showActor(world.cast.zhang, false);
  } else if (set === "appointment") {
    world.showActor(world.cast.zhang, false);
    world.showActor(world.cast.chang, false);
  } else if (set === "workshop" || set === "basement") {
    world.showActor(world.cast.zhangWork, false);
  } else if (set === "eva") {
    world.showActor(world.cast.zhangSuit, false);
  } else if (set === "photo") {
    for (const f of world.cast.photo) world.showActor(f, false);
  }
}

export function activateSetActors(set: SetName, world: World): void {
  if (set === "hutongInt") {
    world.showActor(world.cast.zhou, true);
    world.showActor(world.cast.zhang, true);
  } else if (set === "appointment") {
    world.showActor(world.cast.zhang, true);
    world.showActor(world.cast.chang, true);
  } else if (set === "workshop" || set === "basement") {
    world.showActor(world.cast.zhangWork, true);
  } else if (set === "eva") {
    world.showActor(world.cast.zhangSuit, true);
  } else if (set === "photo") {
    for (const f of world.cast.photo) world.showActor(f, true);
  }
}

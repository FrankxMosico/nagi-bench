import * as THREE from 'three';
import type { BombSite, Collider, MapSpawn, Team, ZoneFloor } from './types';
import { NavGrid } from './pathfinding';

export const MAP_EXTENTS = { minX: -60, maxX: 60, minZ: -64, maxZ: 54 };
export const MAP_FLOOR_SIZE = 150;

export interface SolidSpec {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  h: number;
  y0?: number;
  kind: Collider['kind'];
}

const S: SolidSpec[] = [];
const wall = (x0: number, x1: number, z0: number, z1: number, h = 7, kind: SolidSpec['kind'] = 'wall') => {
  S.push({ x0, x1, z0, z1, h, kind });
};
const crate = (x0: number, x1: number, z0: number, z1: number, h: number) => {
  S.push({ x0, x1, z0, z1, h, kind: 'crate' });
};
const barrel = (x: number, z: number) => {
  S.push({ x0: x - 0.42, x1: x + 0.42, z0: z - 0.42, z1: z + 0.42, h: 1.25, kind: 'barrel' });
};

// ---------- Outer shell ----------
wall(-60, -58, -64, 54, 10);
wall(58, 60, -64, 54, 10);
wall(-60, 60, -64, -62, 10);
wall(-60, 60, 52, 54, 10);

// ---------- T spawn ----------
wall(-24, -8, 28, 29);
wall(8, 24, 28, 29);
wall(24, 25, 28, 31);
wall(24, 25, 39, 52);
wall(-25, -24, 28, 31);
wall(-25, -24, 39, 52);

// ---------- A long / catwalk shell ----------
wall(24, 30, 29, 30);
wall(24, 58, 40, 41);
wall(29, 30, -8, 30);
// Large solid block from the middle towards A long
S.push({ x0: 9, x1: 29, z0: -8, z1: 28, h: 8, kind: 'building' });

// Catwalk
wall(8, 32, -8, -7);
wall(8, 24, -23, -22);
wall(32, 33, -23, -8);

// ---------- B tunnels shell ----------
wall(-40, -24, 28, 30);
wall(-58, -24, 40, 41);
S.push({ x0: -40, x1: -9, z0: -22, z1: 28, h: 8, kind: 'building' });

// ---------- Middle corridor ----------
wall(-9, -8, -44, 28);
wall(8, 9, -44, -18);
wall(8, 9, -8, 28);
// Mid double-door frame: the actual passable opening is 8.4m wide.
wall(-8, -4.2, -0.7, 0.7, 7);
wall(4.2, 8, -0.7, 0.7, 7);

// ---------- CT spawn and site transitions ----------
wall(-24, -8, -45, -44);
wall(8, 24, -45, -44);
wall(24, 25, -62, -52);
wall(24, 25, -44, -22);
wall(-25, -24, -62, -52);
wall(-25, -24, -44, -22);

// ---------- Bomb sites ----------
wall(-58, -24, -54, -52); // B north
wall(-40, -24, -23, -22); // B south, B tunnel opening to the west
wall(24, 58, -54, -52);   // A north
wall(24, 25, -52, -50);   // A west doorpost

// ---------- Cover crates (all collide) ----------
crate(12, 15, 43, 46, 1.35);      // T spawn
crate(-16, -13, 44, 46, 1.05);    // T spawn
crate(31.5, 35, -36, -32.5, 1.65); // A site default box
crate(46, 49.5, -34, -31, 1.45);   // A site
crate(48, 52, -45, -42, 2.15);     // A site stacked cover
crate(26, 29, -46, -43, 1.3);      // A site corner
crate(43, 45.5, 5, 8, 1.3);        // A long
crate(51, 54.5, 22, 25, 1.5);      // A long
crate(33, 36, 15, 18, 1.15);       // A long
crate(-49, -45.5, -35, -31.5, 1.6); // B site
crate(-35, -32, -43, -40, 1.25);   // B site
crate(-53, -50, -45.5, -42.5, 1.0); // B site
crate(-39, -36, -28, -25, 1.35);   // B site
crate(-50, -47, 9, 12, 1.2);       // B tunnels
crate(-45, -42, 24, 27, 1.4);      // B tunnels
crate(-6, -3.5, 17, 19.5, 1.05);   // Mid
crate(11, 13, -13, -11, 0.95);     // Catwalk
crate(5, 7.5, -26, -23.5, 1.15);   // Mid (near CT)
crate(13, 16, -56, -53, 1.1);      // CT spawn
crate(-22, -19, -60, -57, 1.05);   // CT spawn corner

// Barrels
barrel(43, -45);
barrel(29, -44);
barrel(-31, -33);
barrel(-52, -27);
barrel(-5, 24);
barrel(55, -16);
barrel(38, 33);
barrel(28, -34);
barrel(-44, -28);

// Low site cover and tunnel clutter. All of it remains physically solid.
S.push({ x0: 43, x1: 47.2, z0: -38.2, z1: -37.1, h: 1.05, kind: 'barrier' });
S.push({ x0: 27, x1: 30.2, z0: -25, z1: -24, h: 1.0, kind: 'barrier' });
S.push({ x0: -49, x1: -45, z0: -25.7, z1: -24.6, h: 1.05, kind: 'barrier' });
S.push({ x0: -34, x1: -30.8, z0: -35.8, z1: -34.7, h: 1.0, kind: 'barrier' });
crate(52, 55, 34, 37, 1.25);
crate(-7, -4, 31, 33.5, 1.1);

export const MAP_SOLIDS: SolidSpec[] = S;

export const BOMB_SITES: BombSite[] = [
  { id: 'A', center: { x: 41, z: -35 }, minX: 25.5, maxX: 57.5, minZ: -51.5, maxZ: -22.5 },
  { id: 'B', center: { x: -39, z: -35 }, minX: -57.5, maxX: -25.5, minZ: -51.5, maxZ: -22.5 },
];

export const SPAWNS: Record<Team, MapSpawn[]> = {
  T: [
    { x: -5, z: 36, yaw: -0.05 },
    { x: 6, z: 35, yaw: 0.08 },
    { x: -13, z: 40, yaw: 0.15 },
    { x: 13, z: 41, yaw: -0.2 },
    { x: -4, z: 47, yaw: 0.05 },
  ],
  CT: [
    { x: -6, z: -55, yaw: Math.PI },
    { x: 7, z: -56, yaw: Math.PI - 0.15 },
    { x: -15, z: -57, yaw: Math.PI + 0.1 },
    { x: 18, z: -57, yaw: Math.PI - 0.12 },
    { x: 0, z: -48, yaw: Math.PI },
  ],
};

export const ZONE_FLOORS: ZoneFloor[] = [
  { minX: -24, maxX: 24, minZ: 28, maxZ: 52, color: 0xb59a6b, opacity: 0.24, label: 'T SPAWN' },
  { minX: -9, maxX: 9, minZ: -44, maxZ: 28, color: 0x9d8b68, opacity: 0.22, label: 'MID' },
  { minX: 8, maxX: 32, minZ: -22, maxZ: -8, color: 0x9c845d, opacity: 0.25, label: 'CATWALK' },
  { minX: 30, maxX: 58, minZ: -22, maxZ: 40, color: 0xb29a6c, opacity: 0.18, label: 'LONG A' },
  { minX: 24, maxX: 58, minZ: -52, maxZ: -22, color: 0xa8875d, opacity: 0.28, label: 'A SITE' },
  { minX: -56, maxX: -40, minZ: -22, maxZ: 40, color: 0x9e865d, opacity: 0.22, label: 'B TUNNELS' },
  { minX: -58, maxX: -24, minZ: -52, maxZ: -22, color: 0x9d7c55, opacity: 0.27, label: 'B SITE' },
  { minX: -24, maxX: 24, minZ: -62, maxZ: -44, color: 0xaa9066, opacity: 0.22, label: 'CT SPAWN' },
];

export const MINIMAP_RECTS = MAP_SOLIDS.filter((s) => s.kind === 'wall' || s.kind === 'building' || s.kind === 'crate');

export interface DoorRig {
  group: THREE.Group;
  leaves: THREE.Group[];
  isOpen: boolean;
  angle: number;
}

export interface BuiltMap {
  group: THREE.Group;
  colliders: Collider[];
  nav: NavGrid;
  doors: DoorRig[];
  updateDoors: (dt: number, positions: { x: number; z: number }[]) => boolean;
  traverseColliderMeshes: () => THREE.Object3D[];
}

function makeNoiseTexture(base: string, fleck: string, lines = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const a = Math.random() * 0.15;
    ctx.fillStyle = `rgba(50,38,22,${a})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2.5, 1 + Math.random() * 2.5);
  }
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(255,245,220,${Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  if (lines) {
    ctx.strokeStyle = 'rgba(63,47,28,0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      let x = Math.random() * 256;
      let y = Math.random() * 256;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 60;
        y += Math.random() * 20;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeWoodTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#956b43';
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 32) {
    ctx.fillStyle = `rgba(45,25,10,${0.18 + Math.random() * 0.12})`;
    ctx.fillRect(0, y, 256, 2);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = `rgba(255,220,160,${0.025 + Math.random() * 0.04})`;
      ctx.fillRect(0, y + 5 + Math.random() * 22, 256, 1);
    }
  }
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = `rgba(30,16,5,${Math.random() * 0.15})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 9, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeLabelTexture(main: string, sub = '', tint = '#f2e2bd'): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 512, 256);
  ctx.strokeStyle = 'rgba(240,222,184,0.5)';
  ctx.lineWidth = 3;
  ctx.strokeRect(14, 14, 484, 228);
  ctx.fillStyle = tint;
  ctx.font = '900 150px Impact, Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.78;
  ctx.fillText(main, 256, 112);
  if (sub) {
    ctx.font = '700 36px Arial, sans-serif';
    ctx.fillStyle = 'rgba(242,226,189,0.8)';
    ctx.fillText(sub, 256, 206);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function addLabel(group: THREE.Group, text: string, sub: string, x: number, z: number, size = 9, rotation = 0) {
  const tex = makeLabelTexture(text, sub);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size * 0.5), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = rotation;
  mesh.position.set(x, 0.035, z);
  group.add(mesh);
}

function addWallSign(
  group: THREE.Group, text: string, sub: string,
  x: number, y: number, z: number, rotationY: number, width = 5,
) {
  const tex = makeLabelTexture(text, sub);
  const nx = Math.sin(rotationY);
  const nz = Math.cos(rotationY);
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 1.06, width * 0.56),
    new THREE.MeshBasicMaterial({ color: 0x191812, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }),
  );
  board.position.set(x - nx * 0.035, y, z - nz * 0.035);
  board.rotation.y = rotationY;
  group.add(board);
  const mat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width * 0.5), mat);
  mesh.position.set(x + nx * 0.012, y, z + nz * 0.012);
  mesh.rotation.y = rotationY;
  group.add(mesh);
  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.72, 0.06, 0.02),
    new THREE.MeshBasicMaterial({ color: 0xdeb777, transparent: true, opacity: 0.5 }),
  );
  stripe.position.set(x + nx * 0.02, y - width * 0.17, z + nz * 0.02);
  stripe.rotation.y = rotationY;
  group.add(stripe);
}

function addArch(group: THREE.Group, x: number, z: number, width: number, height: number, mat: THREE.Material) {
  const legGeo = new THREE.BoxGeometry(0.6, height, 0.8);
  const left = new THREE.Mesh(legGeo, mat);
  left.position.set(x - width / 2, height / 2, z);
  left.castShadow = true;
  const right = new THREE.Mesh(legGeo, mat);
  right.position.set(x + width / 2, height / 2, z);
  right.castShadow = true;
  const beam = new THREE.Mesh(new THREE.BoxGeometry(width + 0.6, 0.6, 0.9), mat);
  beam.position.set(x, height, z);
  beam.castShadow = true;
  group.add(left, right, beam);
}

function addLamp(group: THREE.Group, x: number, y: number, z: number) {
  const wire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.6, 5),
    new THREE.MeshBasicMaterial({ color: 0x30291f }),
  );
  wire.position.set(x, y + 0.3, z);
  group.add(wire);
  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.22, 8, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x3b3125, roughness: 0.7, metalness: 0.3, side: THREE.DoubleSide }),
  );
  shade.position.set(x, y, z);
  shade.rotation.x = Math.PI;
  group.add(shade);
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0xffd18a, emissive: 0xffa64d, emissiveIntensity: 1.8 }),
  );
  bulb.position.set(x, y - 0.08, z);
  group.add(bulb);
}

function buildSky(): THREE.Mesh {
  const geo = new THREE.SphereGeometry(400, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x5c86a6) },
      horizonColor: { value: new THREE.Color(0xeed8ae) },
      bottomColor: { value: new THREE.Color(0x9f825d) },
      sunDir: { value: new THREE.Vector3(-0.55, 0.3, 0.4).normalize() },
    },
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 bottomColor;
      uniform vec3 sunDir;
      varying vec3 vWorld;
      void main() {
        vec3 dir = normalize(vWorld);
        float h = clamp(dir.y, -0.2, 1.0);
        vec3 col = mix(horizonColor, topColor, pow(max(h, 0.0), 0.6));
        col = mix(bottomColor, col, smoothstep(-0.12, 0.08, h));
        float sun = pow(max(dot(dir, normalize(sunDir)), 0.0), 240.0);
        float haze = pow(max(dot(dir, normalize(sunDir)), 0.0), 8.0) * 0.13;
        col += vec3(1.0, 0.78, 0.45) * (sun * 1.6 + haze);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(geo, mat);
  sky.frustumCulled = false;
  return sky;
}

function addDoorRig(group: THREE.Group): DoorRig {
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x66513a, roughness: 0.74, metalness: 0.18 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x3a3025, roughness: 0.55, metalness: 0.45 });
  const leaves: THREE.Group[] = [];
  for (const side of [-1, 1] as const) {
    const hinge = new THREE.Group();
    hinge.position.set(side * 4.15, 0, 0);
    const leaf = new THREE.Group();
    leaf.position.x = side === -1 ? 0 : -4.15;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(4.15, 3.15, 0.18), doorMat);
    panel.position.set(2.075, 1.575, 0);
    panel.castShadow = true;
    leaf.add(panel);
    for (const y of [0.55, 1.58, 2.62]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(4.06, 0.11, 0.21), trimMat);
      band.position.set(2.075, y, 0);
      leaf.add(band);
    }
    for (const x of [0.45, 2.075, 3.65]) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.96, 0.205), trimMat);
      plank.position.set(x, 1.58, 0);
      leaf.add(plank);
    }
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.1), new THREE.MeshStandardMaterial({ color: 0xa38b63, metalness: 0.8, roughness: 0.25 }));
    handle.position.set(side === -1 ? 3.6 : 0.55, 1.5, side === -1 ? -0.16 : 0.16);
    leaf.add(handle);
    hinge.add(leaf);
    leaves.push(hinge);
    group.add(hinge);
  }
  // Door frame and lintel are decorative.
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x493b2b, roughness: 0.85 });
  for (const x of [-4.35, 4.35]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.8, 0.7), frameMat);
    post.position.set(x, 1.9, 0);
    post.castShadow = true;
    group.add(post);
  }
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.45, 0.7), frameMat);
  lintel.position.set(0, 3.55, 0);
  lintel.castShadow = true;
  group.add(lintel);
  return { group, leaves, isOpen: false, angle: 0.2 };
}

export function buildMap(): BuiltMap {
  const group = new THREE.Group();
  group.name = 'Dust2Core';
  group.add(buildSky());

  const groundTex = makeNoiseTexture('#bda476', '#675336', true);
  groundTex.repeat.set(32, 32);
  const groundMat = new THREE.MeshStandardMaterial({ map: groundTex, color: 0xd0b685, roughness: 0.96, metalness: 0.0 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(MAP_FLOOR_SIZE, MAP_FLOOR_SIZE), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  group.add(ground);

  const wallTex = makeNoiseTexture('#c2ab81', '#5f4e36', true);
  wallTex.repeat.set(3, 1.4);
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, color: 0xd5c198, roughness: 0.92, metalness: 0.02 });
  const buildingTex = makeNoiseTexture('#a98e66', '#51432f', true);
  buildingTex.repeat.set(5, 2);
  const buildingMat = new THREE.MeshStandardMaterial({ map: buildingTex, color: 0xc0a579, roughness: 0.94 });
  const woodTex = makeWoodTexture();
  woodTex.repeat.set(1.4, 1.4);
  const woodMat = new THREE.MeshStandardMaterial({ map: woodTex, color: 0xc09666, roughness: 0.82 });
  const woodDarkMat = new THREE.MeshStandardMaterial({ map: woodTex, color: 0x6e4e2f, roughness: 0.86 });
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x7c4729, roughness: 0.6, metalness: 0.35 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x7d6748, roughness: 0.9 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x3b3934, roughness: 0.45, metalness: 0.65 });

  const colliders: Collider[] = [];
  for (const spec of MAP_SOLIDS) {
    const w = spec.x1 - spec.x0;
    const d = spec.z1 - spec.z0;
    const h = spec.h;
    const y0 = spec.y0 ?? 0;
    colliders.push({ minX: spec.x0, maxX: spec.x1, minY: y0, maxY: y0 + h, minZ: spec.z0, maxZ: spec.z1, kind: spec.kind });
    const cx = (spec.x0 + spec.x1) / 2;
    const cz = (spec.z0 + spec.z1) / 2;

    if (spec.kind === 'barrel') {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, h, 12), barrelMat);
      mesh.position.set(cx, y0 + h / 2, cz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      for (const yy of [0.28, h - 0.3]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.435, 0.035, 6, 16), metalMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(cx, yy + y0, cz);
        group.add(ring);
      }
      continue;
    }

    let mat = wallMat;
    if (spec.kind === 'building') mat = buildingMat;
    if (spec.kind === 'crate') mat = woodMat;
    if (spec.kind === 'barrier') mat = trimMat;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(cx, y0 + h / 2, cz);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);

    if (spec.kind === 'crate') {
      // Wooden crate bands and vertical corner straps stay flush with the collision volume.
      for (const yy of [y0 + 0.18, y0 + h - 0.18]) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.045, 0.1, d + 0.045), woodDarkMat);
        band.position.set(cx, yy, cz);
        group.add(band);
      }
      for (const xx of [spec.x0, spec.x1]) {
        for (const zz of [spec.z0, spec.z1]) {
          const strap = new THREE.Mesh(new THREE.BoxGeometry(0.1, h * 0.94, 0.1), woodDarkMat);
          strap.position.set(xx, y0 + h / 2, zz);
          group.add(strap);
        }
      }
      const lid = new THREE.Mesh(new THREE.BoxGeometry(w + 0.055, 0.08, d + 0.055), woodDarkMat);
      lid.position.set(cx, y0 + h + 0.018, cz);
      group.add(lid);
    } else if (spec.kind === 'wall' || spec.kind === 'building') {
      // Subtle base trim and top cap create a hand-built Dust2 silhouette.
      const trim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.22, d + 0.08), trimMat);
      trim.position.set(cx, y0 + 0.11, cz);
      trim.receiveShadow = true;
      group.add(trim);
      if (spec.kind === 'building') {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(w + 0.15, 0.25, d + 0.15), trimMat);
        cap.position.set(cx, y0 + h - 0.12, cz);
        cap.receiveShadow = true;
        group.add(cap);
        // fake shuttered windows on the long blank facade
        if (w > 10 && d > 30) {
          for (const zz of [-5, 10, 20]) {
            const window = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.35, 2.1), new THREE.MeshStandardMaterial({ color: 0x332c22, roughness: 0.9 }));
            window.position.set(spec.x1 + 0.03, 4.9, zz);
            group.add(window);
            const sill = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.15, 2.4), trimMat);
            sill.position.set(spec.x1 + 0.05, 4.18, zz);
            group.add(sill);
          }
        }
      }
    }
  }

  // Colored walkable-zone floors with painted labels.
  for (const zone of ZONE_FLOORS) {
    const zoneMat = new THREE.MeshStandardMaterial({
      color: zone.color,
      transparent: true,
      opacity: zone.opacity,
      roughness: 1,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(zone.maxX - zone.minX, zone.maxZ - zone.minZ), zoneMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set((zone.minX + zone.maxX) / 2, 0.008, (zone.minZ + zone.maxZ) / 2);
    group.add(mesh);
  }

  addLabel(group, 'A', 'BOMB SITE', 41, -39, 7.5);
  addLabel(group, 'B', 'BOMB SITE', -39, -39, 7.5);
  addLabel(group, 'LONG A', '', 46, 14, 5.5);
  addLabel(group, 'B TUNNELS', '', -48, 14, 5);
  addLabel(group, 'CATWALK', '', 20, -17, 4.5);
  addLabel(group, 'CT', 'SPAWN', 0, -53, 5);
  addLabel(group, 'T', 'SPAWN', 0, 39, 5);
  // Large wall signage and architectural silhouettes.
  addWallSign(group, 'A', 'BOMB SITE · 炸弹点', 40, 4.2, -51.88, 0, 6.8);
  addWallSign(group, 'B', 'BOMB SITE · 炸弹点', -39, 4.2, -51.88, 0, 6.8);
  addWallSign(group, 'LONG A', 'T → A SITE', 30.06, 4.4, 11, Math.PI / 2, 6.2);
  addWallSign(group, 'B', 'TUNNELS → SITE', -40.06, 4.1, -5, -Math.PI / 2, 5.4);
  addWallSign(group, 'CT', 'SPAWN / DEFEND', 0, 4.3, -61.9, 0, 6);
  addWallSign(group, 'T', 'SPAWN / ATTACK', 0, 4.3, 51.9, Math.PI, 6);
  addWallSign(group, 'CATWALK', 'SHORT → A', 8.06, 3.6, -17, Math.PI / 2, 3.8);

  addArch(group, 0, 28.4, 16, 4.1, trimMat);
  addArch(group, 44, 29.9, 27, 4.3, trimMat);
  addArch(group, -48, 29.9, 15, 3.9, trimMat);
  addArch(group, 16, 39.8, 16, 3.6, trimMat);
  addLamp(group, 0, 3.4, 17);
  addLamp(group, 0, 3.4, -27);
  addLamp(group, 44, 3.4, 8);
  addLamp(group, -46, 3.2, 4);
  addLamp(group, 42, 3.4, -44);
  addLamp(group, -41, 3.4, -44);
  addLamp(group, 20, 3.1, -13);

  // Site bomb-target markings.
  for (const site of BOMB_SITES) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.8, 2.0, 32),
      new THREE.MeshBasicMaterial({ color: 0xe2c98e, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(site.center.x, 0.025, site.center.z);
    group.add(ring);
  }

  // Mid double doors, with visible openable door bodies.
  const doorRig = addDoorRig(group);
  const doors = [doorRig];
  doorRig.leaves[0].rotation.y = doorRig.angle;
  doorRig.leaves[1].rotation.y = -doorRig.angle;
  let doorSoundCooldown = 0;
  const updateDoors = (dt: number, positions: { x: number; z: number }[]) => {
    doorSoundCooldown -= dt;
    let near = false;
    for (const p of positions) {
      if (Math.abs(p.x) < 12 && Math.abs(p.z) < 7) { near = true; break; }
    }
    const target = near ? 1.42 : 0.2;
    const prev = doorRig.angle;
    doorRig.angle += (target - doorRig.angle) * Math.min(1, dt * 5.5);
    if (Math.abs(doorRig.angle - 1.42) < 0.02) doorRig.isOpen = true;
    if (doorRig.angle < 0.23) doorRig.isOpen = false;
    doorRig.leaves[0].rotation.y = doorRig.angle;
    doorRig.leaves[1].rotation.y = -doorRig.angle;
    if (Math.abs(doorRig.angle - prev) > 0.003 && doorSoundCooldown <= 0) {
      doorSoundCooldown = 1.1;
      return true;
    }
    return false;
  };

  // Add some dry grass tufts / debris for visual depth without colliders.
  const tuftMat = new THREE.MeshStandardMaterial({ color: 0x756139, roughness: 1 });
  for (let i = 0; i < 40; i++) {
    const x = -54 + Math.random() * 108;
    const z = -58 + Math.random() * 106;
    if (Math.random() < 0.5) continue;
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.12 + Math.random() * 0.12, 0.35 + Math.random() * 0.35, 4), tuftMat);
    blade.position.set(x, 0.16, z);
    blade.rotation.y = Math.random() * Math.PI;
    group.add(blade);
  }

  const nav = new NavGrid(colliders, 0.46);
  return {
    group,
    colliders,
    nav,
    doors,
    updateDoors,
    traverseColliderMeshes: () => group.children,
  };
}

/** All solid meshes used only for optional raycasting effects. Collision itself is analytic AABB. */
export function isInBombSite(x: number, z: number, site: BombSite): boolean {
  return x >= site.minX && x <= site.maxX && z >= site.minZ && z <= site.maxZ;
}

export function getBombSiteAt(x: number, z: number): BombSite | null {
  for (const site of BOMB_SITES) if (isInBombSite(x, z, site)) return site;
  return null;
}

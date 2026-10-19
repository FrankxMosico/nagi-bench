import * as THREE from 'three';
import type { BuiltMap } from '../engine/map/mapBuilder.ts';
import type { MaterialId, Ramp, StaticBox } from '../engine/map/types.ts';
import { createLetterTexture, createSurfaceTexture } from './textures.ts';

/** Metres covered by one texture repeat, per material (world-space box mapping). */
const TEX_SCALE: Record<MaterialId, number> = {
  wall_sand: 4,
  wall_plaster: 4,
  wall_trim: 2,
  floor_sand: 4,
  floor_stone: 4,
  floor_tile: 3,
  floor_dark: 3,
  crate: 1,
  crate_dark: 1,
  metal_blue: 2.6,
  metal_red: 2.6,
  door_blue: 1,
  roof_wood: 3,
  car: 1,
};

/** Materials whose texture is mapped once per face instead of tiled in world space. */
const LOCAL_UV = new Set<MaterialId>(['crate', 'crate_dark', 'door_blue', 'car']);

const MATERIAL_PARAMS: Partial<Record<MaterialId, { roughness: number; metalness: number }>> = {
  metal_blue: { roughness: 0.6, metalness: 0.15 },
  metal_red: { roughness: 0.6, metalness: 0.15 },
  car: { roughness: 0.65, metalness: 0.1 },
  door_blue: { roughness: 0.75, metalness: 0.05 },
};

class Batch {
  pos: number[] = [];
  nrm: number[] = [];
  uv: number[] = [];
  idx: number[] = [];

  quad(
    v: [number, number, number][],
    n: [number, number, number],
    uv: [number, number][],
  ): void {
    const base = this.pos.length / 3;
    for (let i = 0; i < 4; i++) {
      this.pos.push(v[i][0], v[i][1], v[i][2]);
      this.nrm.push(n[0], n[1], n[2]);
      this.uv.push(uv[i][0], uv[i][1]);
    }
    this.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  build(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nrm, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setIndex(this.idx);
    g.computeBoundingSphere();
    return g;
  }
}

export class MapMaterials {
  readonly materials = new Map<MaterialId, THREE.MeshStandardMaterial>();
  private readonly anisotropy: number;

  constructor(anisotropy: number) {
    this.anisotropy = anisotropy;
  }

  get(id: MaterialId): THREE.MeshStandardMaterial {
    let m = this.materials.get(id);
    if (!m) {
      const p = MATERIAL_PARAMS[id] ?? { roughness: 0.92, metalness: 0 };
      m = new THREE.MeshStandardMaterial({
        map: createSurfaceTexture(id, this.anisotropy),
        roughness: p.roughness,
        metalness: p.metalness,
      });
      this.materials.set(id, m);
    }
    return m;
  }

  dispose(): void {
    for (const m of this.materials.values()) {
      m.map?.dispose();
      m.dispose();
    }
    this.materials.clear();
  }
}

function addBox(batches: Map<MaterialId, Batch>, b: StaticBox): void {
  const get = (id: MaterialId) => {
    let bt = batches.get(id);
    if (!bt) {
      bt = new Batch();
      batches.set(id, bt);
    }
    return bt;
  };
  const x0 = b.minX;
  const x1 = b.maxX;
  const y0 = b.minY;
  const y1 = b.maxY;
  const z0 = b.minZ;
  const z1 = b.maxZ;
  const side = b.mat;
  const top = b.topMat;
  const sideLocal = LOCAL_UV.has(side);
  const topLocal = LOCAL_UV.has(top);
  const s = TEX_SCALE[side];
  const st = TEX_SCALE[top];

  // +Y (top)
  get(top).quad(
    [
      [x0, y1, z1],
      [x1, y1, z1],
      [x1, y1, z0],
      [x0, y1, z0],
    ],
    [0, 1, 0],
    topLocal
      ? [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ]
      : [
          [x0 / st, -z1 / st],
          [x1 / st, -z1 / st],
          [x1 / st, -z0 / st],
          [x0 / st, -z0 / st],
        ],
  );
  const sideUV = (u0: number, u1: number): [number, number][] =>
    sideLocal
      ? [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ]
      : [
          [u0 / s, y0 / s],
          [u1 / s, y0 / s],
          [u1 / s, y1 / s],
          [u0 / s, y1 / s],
        ];
  const bs = get(side);
  // +X
  bs.quad(
    [
      [x1, y0, z1],
      [x1, y0, z0],
      [x1, y1, z0],
      [x1, y1, z1],
    ],
    [1, 0, 0],
    sideUV(-z1, -z0),
  );
  // -X
  bs.quad(
    [
      [x0, y0, z0],
      [x0, y0, z1],
      [x0, y1, z1],
      [x0, y1, z0],
    ],
    [-1, 0, 0],
    sideUV(z0, z1),
  );
  // +Z
  bs.quad(
    [
      [x0, y0, z1],
      [x1, y0, z1],
      [x1, y1, z1],
      [x0, y1, z1],
    ],
    [0, 0, 1],
    sideUV(x0, x1),
  );
  // -Z
  bs.quad(
    [
      [x1, y0, z0],
      [x0, y0, z0],
      [x0, y1, z0],
      [x1, y1, z0],
    ],
    [0, 0, -1],
    sideUV(-x1, -x0),
  );
  // Roofs are seen from below.
  if (b.kind === 'roof') {
    bs.quad(
      [
        [x0, y0, z0],
        [x1, y0, z0],
        [x1, y0, z1],
        [x0, y0, z1],
      ],
      [0, -1, 0],
      [
        [x0 / s, z0 / s],
        [x1 / s, z0 / s],
        [x1 / s, z1 / s],
        [x0 / s, z1 / s],
      ],
    );
  }
}

function addRamp(batches: Map<MaterialId, Batch>, r: Ramp): void {
  const get = (id: MaterialId) => {
    let bt = batches.get(id);
    if (!bt) {
      bt = new Batch();
      batches.set(id, bt);
    }
    return bt;
  };
  const h = (x: number, z: number) => {
    const t = r.axis === 'x' ? (x - r.minX) / (r.maxX - r.minX) : (z - r.minZ) / (r.maxZ - r.minZ);
    return r.h0 + (r.h1 - r.h0) * t;
  };
  const x0 = r.minX;
  const x1 = r.maxX;
  const z0 = r.minZ;
  const z1 = r.maxZ;
  const base = Math.min(r.h0, r.h1);
  const st = TEX_SCALE[r.mat];
  const k = r.axis === 'x' ? (r.h1 - r.h0) / (x1 - x0) : (r.h1 - r.h0) / (z1 - z0);
  const nl = Math.sqrt(k * k + 1);
  const n: [number, number, number] = r.axis === 'x' ? [-k / nl, 1 / nl, 0] : [0, 1 / nl, -k / nl];
  get(r.mat).quad(
    [
      [x0, h(x0, z1), z1],
      [x1, h(x1, z1), z1],
      [x1, h(x1, z0), z0],
      [x0, h(x0, z0), z0],
    ],
    n,
    [
      [x0 / st, -z1 / st],
      [x1 / st, -z1 / st],
      [x1 / st, -z0 / st],
      [x0 / st, -z0 / st],
    ],
  );
  const ws = get('wall_trim');
  const s = TEX_SCALE.wall_trim;
  // Side faces (trapezoids) and the tall end.
  if (r.axis === 'z') {
    ws.quad(
      [
        [x1, base, z1],
        [x1, base, z0],
        [x1, h(x1, z0), z0],
        [x1, h(x1, z1), z1],
      ],
      [1, 0, 0],
      [
        [-z1 / s, base / s],
        [-z0 / s, base / s],
        [-z0 / s, h(x1, z0) / s],
        [-z1 / s, h(x1, z1) / s],
      ],
    );
    ws.quad(
      [
        [x0, base, z0],
        [x0, base, z1],
        [x0, h(x0, z1), z1],
        [x0, h(x0, z0), z0],
      ],
      [-1, 0, 0],
      [
        [z0 / s, base / s],
        [z1 / s, base / s],
        [z1 / s, h(x0, z1) / s],
        [z0 / s, h(x0, z0) / s],
      ],
    );
  } else {
    ws.quad(
      [
        [x0, base, z1],
        [x1, base, z1],
        [x1, h(x1, z1), z1],
        [x0, h(x0, z1), z1],
      ],
      [0, 0, 1],
      [
        [x0 / s, base / s],
        [x1 / s, base / s],
        [x1 / s, h(x1, z1) / s],
        [x0 / s, h(x0, z1) / s],
      ],
    );
    ws.quad(
      [
        [x1, base, z0],
        [x0, base, z0],
        [x0, h(x0, z0), z0],
        [x1, h(x1, z0), z0],
      ],
      [0, 0, -1],
      [
        [-x1 / s, base / s],
        [-x0 / s, base / s],
        [-x0 / s, h(x0, z0) / s],
        [-x1 / s, h(x1, z0) / s],
      ],
    );
  }
}

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const SKY_FRAG = /* glsl */ `
uniform vec3 topColor;
uniform vec3 horizonColor;
uniform vec3 sunColor;
uniform vec3 sunDir;
varying vec3 vDir;
void main() {
  float h = clamp(vDir.y, -0.2, 1.0);
  vec3 col = mix(horizonColor, topColor, pow(max(h, 0.0), 0.55));
  float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
  col += sunColor * (pow(s, 600.0) * 2.5 + pow(s, 12.0) * 0.18);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export interface MapView {
  group: THREE.Group;
  materials: MapMaterials;
  dispose(): void;
}

/** Builds merged, shadowed meshes for the whole map (a handful of draw calls). */
export function buildMapView(map: BuiltMap, anisotropy: number, sunDir: THREE.Vector3): MapView {
  const group = new THREE.Group();
  group.name = 'map';
  const materials = new MapMaterials(anisotropy);
  const batches = new Map<MaterialId, Batch>();
  for (const b of map.boxes) addBox(batches, b);
  for (const r of map.ramps) addRamp(batches, r);
  const disposables: { dispose(): void }[] = [];
  for (const [mat, batch] of batches) {
    const geo = batch.build();
    disposables.push(geo);
    const mesh = new THREE.Mesh(geo, materials.get(mat));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    group.add(mesh);
  }

  // Desert ground outside the playable area (seen over the walls from high spots).
  const groundGeo = new THREE.PlaneGeometry(600, 600);
  groundGeo.rotateX(-Math.PI / 2);
  const groundMat = materials.get('floor_sand').clone();
  groundMat.map = groundMat.map ? groundMat.map.clone() : null;
  if (groundMat.map) {
    groundMat.map.repeat.set(150, 150);
    groundMat.map.needsUpdate = true;
  }
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.set(50, -0.03, 50);
  ground.receiveShadow = true;
  group.add(ground);
  disposables.push(groundGeo, groundMat);
  if (groundMat.map) disposables.push(groundMat.map);

  // Distant skyline: blocky houses + domes around the map.
  const skyline = new THREE.Group();
  const houseMat = materials.get('wall_plaster');
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xd8c39a, roughness: 0.9 });
  disposables.push(domeMat);
  const houseGeo = new THREE.BoxGeometry(1, 1, 1);
  houseGeo.translate(0, 0.5, 0);
  const domeGeo = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  disposables.push(houseGeo, domeGeo);
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 46; i++) {
    const a = (i / 46) * Math.PI * 2 + rnd() * 0.1;
    const rad = 82 + rnd() * 30;
    const w = 8 + rnd() * 14;
    const d = 8 + rnd() * 14;
    const hgt = 9 + rnd() * 10;
    const m = new THREE.Mesh(houseGeo, houseMat);
    m.position.set(50 + Math.cos(a) * rad, -1, 50 + Math.sin(a) * rad);
    m.scale.set(w, hgt, d);
    m.rotation.y = rnd() * 0.3;
    m.castShadow = false;
    skyline.add(m);
    if (rnd() < 0.3) {
      const dome = new THREE.Mesh(domeGeo, domeMat);
      const r = Math.min(w, d) * 0.35;
      dome.position.set(m.position.x, hgt - 1, m.position.z);
      dome.scale.set(r, r * 0.9, r);
      skyline.add(dome);
    }
  }
  group.add(skyline);

  // Painted bomb-site letters.
  const letter = (text: string, x: number, y: number, z: number, rotY: number) => {
    const tex = createLetterTexture(text, '#b3261e');
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    const geo = new THREE.PlaneGeometry(3.2, 3.2);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    group.add(mesh);
    disposables.push(tex, mat, geo);
  };
  letter('A', 76, 5.2, 4.02, 0); // north wall of A site, facing south (+Z)
  letter('A', 84.02, 3.0, 40, Math.PI / 2); // Long A, west wall facing east
  letter('B', 6.02, 3.0, 18, Math.PI / 2); // west wall of B site, facing east
  letter('B', 14.98, 2.0, 40, -Math.PI / 2); // upper tunnels, east wall facing west

  // Sky dome.
  const skyGeo = new THREE.SphereGeometry(380, 32, 16);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(0x3f78c4) },
      horizonColor: { value: new THREE.Color(0xe9dcc2) },
      sunColor: { value: new THREE.Color(0xfff2d0) },
      sunDir: { value: sunDir.clone() },
    },
    vertexShader: SKY_VERT,
    fragmentShader: SKY_FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.position.set(50, 0, 50);
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  group.add(sky);
  disposables.push(skyGeo, skyMat);

  return {
    group,
    materials,
    dispose() {
      for (const d of disposables) d.dispose();
      materials.dispose();
    },
  };
}

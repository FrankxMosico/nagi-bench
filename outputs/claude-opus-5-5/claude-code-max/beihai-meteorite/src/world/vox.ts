import * as THREE from "three";
import { buildVoxelGeometry, voxelMaterial } from "@agentbench/voxel-kit";

/**
 * A dense voxel canvas. Everything in the film that is not a figure is drawn
 * into one of these and merged by the kit's `buildVoxelGeometry`, so props,
 * rooms and stations share the cast's block language.
 */
export class VoxelGrid {
  readonly sx: number;
  readonly sy: number;
  readonly sz: number;
  private readonly cells: Int32Array;

  constructor(sx: number, sy: number, sz: number) {
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;
    this.cells = new Int32Array(sx * sy * sz).fill(-1);
  }

  private idx(x: number, y: number, z: number): number {
    return (y * this.sz + z) * this.sx + x;
  }

  inside(x: number, y: number, z: number): boolean {
    return x >= 0 && y >= 0 && z >= 0 && x < this.sx && y < this.sy && z < this.sz;
  }

  set(x: number, y: number, z: number, colour: number | null): this {
    x = Math.floor(x);
    y = Math.floor(y);
    z = Math.floor(z);
    if (!this.inside(x, y, z)) return this;
    this.cells[this.idx(x, y, z)] = colour === null ? -1 : colour;
    return this;
  }

  get(x: number, y: number, z: number): number | null {
    if (!this.inside(x, y, z)) return null;
    const v = this.cells[this.idx(x, y, z)]!;
    return v < 0 ? null : v;
  }

  /** Inclusive-exclusive box [x0, x1) × [y0, y1) × [z0, z1). */
  box(
    x0: number, y0: number, z0: number,
    x1: number, y1: number, z1: number,
    colour: number | null | ((x: number, y: number, z: number) => number | null),
  ): this {
    const ax = Math.max(0, Math.floor(Math.min(x0, x1)));
    const bx = Math.min(this.sx, Math.ceil(Math.max(x0, x1)));
    const ay = Math.max(0, Math.floor(Math.min(y0, y1)));
    const by = Math.min(this.sy, Math.ceil(Math.max(y0, y1)));
    const az = Math.max(0, Math.floor(Math.min(z0, z1)));
    const bz = Math.min(this.sz, Math.ceil(Math.max(z0, z1)));
    for (let y = ay; y < by; y++) {
      for (let z = az; z < bz; z++) {
        for (let x = ax; x < bx; x++) {
          const c = typeof colour === "function" ? colour(x, y, z) : colour;
          this.cells[this.idx(x, y, z)] = c === null ? -1 : c;
        }
      }
    }
    return this;
  }

  /** Fill every cell where `fn` returns a colour. */
  fill(fn: (x: number, y: number, z: number) => number | null | undefined): this {
    for (let y = 0; y < this.sy; y++) {
      for (let z = 0; z < this.sz; z++) {
        for (let x = 0; x < this.sx; x++) {
          const c = fn(x, y, z);
          if (c !== undefined) this.cells[this.idx(x, y, z)] = c === null ? -1 : c;
        }
      }
    }
    return this;
  }

  /** Recolour existing voxels. */
  paint(fn: (x: number, y: number, z: number, colour: number) => number): this {
    for (let i = 0; i < this.cells.length; i++) {
      const c = this.cells[i]!;
      if (c < 0) continue;
      const x = i % this.sx;
      const yz = Math.floor(i / this.sx);
      const z = yz % this.sz;
      const y = Math.floor(yz / this.sz);
      this.cells[i] = fn(x, y, z, c);
    }
    return this;
  }

  geometry(voxel = 1, anchor: "center" | "min" = "min"): THREE.BufferGeometry {
    return buildVoxelGeometry(
      {
        size: [this.sx, this.sy, this.sz],
        at: (x, y, z) => this.get(x, y, z),
      },
      { voxel, anchor },
    );
  }

  /** Build only the voxels selected by `keep` (others still cull faces). */
  geometryWhere(keep: (colour: number) => boolean, voxel = 1, anchor: "center" | "min" = "min"): THREE.BufferGeometry {
    return buildVoxelGeometry(
      {
        size: [this.sx, this.sy, this.sz],
        at: (x, y, z) => {
          const c = this.get(x, y, z);
          return c !== null && keep(c) ? c : null;
        },
      },
      { voxel, anchor },
    );
  }
}

/**
 * Mirror a geometry along Z about z = 0 and shift it by `dz`, restoring the
 * triangle winding so front faces stay front faces.
 */
export function mirrorZ(geometry: THREE.BufferGeometry, dz = 0): THREE.BufferGeometry {
  geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
  geometry.translate(0, 0, dz);
  const index = geometry.index;
  if (index) {
    const a = index.array as Uint16Array | Uint32Array;
    for (let i = 0; i < a.length; i += 3) {
      const t = a[i + 1]!;
      a[i + 1] = a[i + 2]!;
      a[i + 2] = t;
    }
    index.needsUpdate = true;
  }
  return geometry;
}

/** Multiply a hex colour's brightness by k (clamped). */
export function shade(colour: number, k: number): number {
  const r = Math.min(255, Math.max(0, Math.round(((colour >> 16) & 255) * k)));
  const g = Math.min(255, Math.max(0, Math.round(((colour >> 8) & 255) * k)));
  const b = Math.min(255, Math.max(0, Math.round((colour & 255) * k)));
  return (r << 16) | (g << 8) | b;
}

export function mix(a: number, b: number, t: number): number {
  const r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t);
  const g = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t);
  const bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
  return (r << 16) | (g << 8) | bl;
}

/** Jitter a colour's brightness by a deterministic amount. */
export function jitter(colour: number, amount: number, h: number): number {
  return shade(colour, 1 + (h - 0.5) * 2 * amount);
}

export function vmesh(
  geometry: THREE.BufferGeometry,
  options: THREE.MeshStandardMaterialParameters = {},
  shadows: { cast?: boolean; receive?: boolean } = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, voxelMaterial(options));
  mesh.castShadow = shadows.cast ?? false;
  mesh.receiveShadow = shadows.receive ?? false;
  return mesh;
}

/** Unlit vertex-coloured mesh, for lamps, screens and windows that glow. */
export function vglow(geometry: THREE.BufferGeometry, intensity = 1, options: THREE.MeshBasicMaterialParameters = {}): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: true, ...options });
  material.color.setScalar(intensity);
  return new THREE.Mesh(geometry, material);
}

export function glowBox(w: number, h: number, d: number, colour: THREE.ColorRepresentation, intensity = 1): THREE.Mesh {
  const material = new THREE.MeshBasicMaterial({ color: colour });
  material.color.multiplyScalar(intensity);
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
}

export function solidBox(
  w: number, h: number, d: number,
  colour: THREE.ColorRepresentation,
  options: THREE.MeshStandardMaterialParameters = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color: colour, roughness: 0.9, metalness: 0, ...options }),
  );
  return mesh;
}

/** Irregular rock / meteorite blob as voxels, centred at the origin. */
export function rockGeometry(
  seed: number,
  radius: number,
  voxel: number,
  palette: (x: number, y: number, z: number, d: number) => number,
  roughness = 0.35,
): THREE.BufferGeometry {
  const n = Math.ceil(radius * 1.4) * 2 + 2;
  const c = n / 2;
  const grid = new VoxelGrid(n, n, n);
  const sx = 1 + ((seed * 13) % 7) / 20;
  const sy = 0.82 + ((seed * 7) % 5) / 25;
  grid.fill((x, y, z) => {
    const dx = (x + 0.5 - c) / sx;
    const dy = (y + 0.5 - c) / sy;
    const dz = z + 0.5 - c;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const len = Math.max(1e-6, d);
    const nx = dx / len;
    const ny = dy / len;
    const nz = dz / len;
    const bumpy =
      Math.sin(nx * 3.1 + seed) * Math.cos(ny * 2.7 + seed * 1.3) * 0.5 +
      Math.sin(nz * 4.3 + seed * 0.7) * 0.3 +
      (hashSeeded(seed, Math.round(nx * 4), Math.round(ny * 4), Math.round(nz * 4)) - 0.5) * 0.6;
    const r = radius * (1 + bumpy * roughness * 0.5);
    if (d > r) return null;
    return palette(x, y, z, d / r);
  });
  return grid.geometry(voxel, "center");
}

function hashSeeded(seed: number, x: number, y: number, z: number): number {
  const s = Math.sin(seed * 91.7 + x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return s - Math.floor(s);
}

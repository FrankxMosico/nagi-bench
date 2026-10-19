import * as THREE from "three";
import { buildVoxelGeometry, voxelMaterial } from "@agentbench/voxel-kit";

/**
 * Sparse voxel canvas for sets and props. Cells are painted with box fills and
 * per-cell callbacks, then merged through the kit's face-culled mesher so every
 * object in the film shares the same block language. Cells flagged as glow are
 * meshed separately so lamps, windows and screens can emit light.
 */

const OFF = 1024;
const pack = (x: number, y: number, z: number) => (x + OFF) * 4194304 + (y + OFF) * 2048 + (z + OFF);

export type Paint = number | ((x: number, y: number, z: number) => number | null);

export class Grid {
  readonly cells = new Map<number, number>();
  readonly glowCells = new Set<number>();
  min: [number, number, number] = [Infinity, Infinity, Infinity];
  max: [number, number, number] = [-Infinity, -Infinity, -Infinity];

  set(x: number, y: number, z: number, colour: number | null, glow = false): this {
    const k = pack(x, y, z);
    if (colour === null) {
      this.cells.delete(k);
      this.glowCells.delete(k);
      return this;
    }
    this.cells.set(k, colour);
    if (glow) this.glowCells.add(k);
    else this.glowCells.delete(k);
    if (x < this.min[0]) this.min[0] = x;
    if (y < this.min[1]) this.min[1] = y;
    if (z < this.min[2]) this.min[2] = z;
    if (x > this.max[0]) this.max[0] = x;
    if (y > this.max[1]) this.max[1] = y;
    if (z > this.max[2]) this.max[2] = z;
    return this;
  }

  get(x: number, y: number, z: number): number | undefined {
    return this.cells.get(pack(x, y, z));
  }

  has(x: number, y: number, z: number): boolean {
    return this.cells.has(pack(x, y, z));
  }

  /** Fill the half-open box [x0, x1) × [y0, y1) × [z0, z1). */
  box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, paint: Paint, glow = false): this {
    for (let x = x0; x < x1; x++) {
      for (let y = y0; y < y1; y++) {
        for (let z = z0; z < z1; z++) {
          const c = typeof paint === "number" ? paint : paint(x, y, z);
          if (c !== null) this.set(x, y, z, c, glow);
        }
      }
    }
    return this;
  }

  clearBox(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): this {
    for (let x = x0; x < x1; x++) for (let y = y0; y < y1; y++) for (let z = z0; z < z1; z++) this.set(x, y, z, null);
    return this;
  }

  /** Visit every filled cell (for recolouring passes such as grime or wear). */
  each(fn: (x: number, y: number, z: number, c: number) => number | null | void): this {
    const updates: Array<[number, number, number, number | null]> = [];
    for (const [k, c] of this.cells) {
      const x = Math.floor(k / 4194304) - OFF;
      const y = Math.floor((k % 4194304) / 2048) - OFF;
      const z = (k % 2048) - OFF;
      const r = fn(x, y, z, c);
      if (r !== undefined) updates.push([x, y, z, r]);
    }
    for (const [x, y, z, c] of updates) {
      const glow = this.glowCells.has(pack(x, y, z));
      this.set(x, y, z, c, glow);
    }
    return this;
  }

  /**
   * Merge to geometry. `origin` is the cell coordinate that lands on the local
   * origin (may be fractional), so a model can pivot where it should.
   */
  build(voxel: number, origin: [number, number, number] = [0, 0, 0]): { base: THREE.BufferGeometry | null; glow: THREE.BufferGeometry | null } {
    if (this.cells.size === 0) return { base: null, glow: null };
    const [mx, my, mz] = this.min;
    const size: [number, number, number] = [this.max[0] - mx + 1, this.max[1] - my + 1, this.max[2] - mz + 1];
    const make = (wantGlow: boolean): THREE.BufferGeometry | null => {
      let any = false;
      const geometry = buildVoxelGeometry(
        {
          size,
          at: (x, y, z) => {
            const k = pack(x + mx, y + my, z + mz);
            const c = this.cells.get(k);
            if (c === undefined) return null;
            if (this.glowCells.has(k) !== wantGlow) return null;
            any = true;
            return c;
          },
        },
        { voxel, anchor: "min" },
      );
      if (!any) {
        geometry.dispose();
        return null;
      }
      geometry.translate((mx - origin[0]) * voxel, (my - origin[1]) * voxel, (mz - origin[2]) * voxel);
      geometry.computeBoundingSphere();
      return geometry;
    };
    return { base: make(false), glow: make(true) };
  }

  /** Build straight into a group holding a lit mesh and an emissive mesh. */
  toGroup(voxel: number, origin: [number, number, number], mats: Materials = MAT, opts: { shadows?: boolean; glowMat?: THREE.Material } = {}): THREE.Group {
    const { base, glow } = this.build(voxel, origin);
    const group = new THREE.Group();
    if (base) {
      const m = new THREE.Mesh(base, mats.std);
      m.castShadow = opts.shadows ?? true;
      m.receiveShadow = opts.shadows ?? true;
      group.add(m);
    }
    if (glow) {
      const g = new THREE.Mesh(glow, opts.glowMat ?? mats.glow);
      group.add(g);
    }
    return group;
  }
}

export interface Materials {
  std: THREE.Material;
  glow: THREE.Material;
}

export function glowMaterial(intensity = 2.2): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(intensity, intensity, intensity) });
}

export const MAT: Materials & {
  metal: THREE.MeshStandardMaterial;
  satin: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  glowSoft: THREE.MeshBasicMaterial;
  glowHot: THREE.MeshBasicMaterial;
} = {
  std: voxelMaterial(),
  metal: voxelMaterial({ metalness: 0.75, roughness: 0.38 }),
  satin: voxelMaterial({ metalness: 0.15, roughness: 0.6 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x9fb8c0, transparent: true, opacity: 0.12, roughness: 0.05, metalness: 0.2, depthWrite: false }),
  glow: glowMaterial(2.2),
  glowSoft: glowMaterial(1.2),
  glowHot: glowMaterial(6),
};

export function meshOf(geometry: THREE.BufferGeometry | null, material: THREE.Material, shadows = true): THREE.Mesh {
  const m = new THREE.Mesh(geometry ?? new THREE.BufferGeometry(), material);
  m.castShadow = shadows;
  m.receiveShadow = shadows;
  return m;
}

/** Colour helpers operating on 0xRRGGBB integers. */
export function shade(c: number, k: number): number {
  const r = Math.min(255, Math.max(0, Math.round(((c >> 16) & 255) * k)));
  const g = Math.min(255, Math.max(0, Math.round(((c >> 8) & 255) * k)));
  const b = Math.min(255, Math.max(0, Math.round((c & 255) * k)));
  return (r << 16) | (g << 8) | b;
}

export function blend(a: number, b: number, t: number): number {
  const r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t);
  const g = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t);
  const bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
  return (r << 16) | (g << 8) | bl;
}

export function hex(c: number): string {
  return `#${c.toString(16).padStart(6, "0")}`;
}

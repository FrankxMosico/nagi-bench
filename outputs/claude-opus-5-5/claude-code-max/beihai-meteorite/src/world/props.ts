import * as THREE from "three";
import { voxelModel, voxelMaterial } from "@agentbench/voxel-kit";
import { VoxelGrid } from "./vox";

/**
 * Hand props are drawn as character grids (side elevations) and built with the
 * kit's `voxelModel`. Sizes are in figure px when the prop hangs off a hand
 * anchor (1 px ≈ 5.6 cm on a 1.8 m figure).
 */

const PISTOL_SIDE = [
  "...sssssssssss",
  "..sssssssssssm",
  "..sssssssssssm",
  "..#############",
  "..####...#.....",
  "..####..#......",
  "..####.##......",
  "..gggg.........",
  "..gggg.........",
  "..gggg.........",
  "..gggg.........",
  "...ggg.........",
].map((r) => r.padEnd(15, ".").slice(0, 15));

export function pistolGeometry(): THREE.BufferGeometry {
  const g = voxelModel({
    palette: { s: 0x30343b, "#": 0x24272c, g: 0x1b1c20, m: 0x111214 },
    layers: [PISTOL_SIDE, PISTOL_SIDE, PISTOL_SIDE],
    axis: "x",
    voxel: 0.27,
    anchor: "center",
  });
  // Put the grip at the origin so the fist closes around it.
  g.translate(0, 1.0, 1.0);
  return g;
}

/** Muzzle position in pistol-local space (after the grip translation). */
export const PISTOL_MUZZLE = new THREE.Vector3(0, 2.1, 3.05);
/** Where the scope's magnet seats on the slide. */
export const PISTOL_RAIL = new THREE.Vector3(0, 3.1, 0.6);

const SCOPE_SIDE = [
  "......................",
  "bb...............bbbbb",
  "bbbbbbbbbbbbbbbbbbbbbb",
  "bbbbbbbbbbbbbbbbbbbbbb",
  "bbbbbbbbbbbbbbbbbbbbbb",
  "bb...............bbbbb",
  "........kkkk..........",
];
const SCOPE_TOP = [
  "......................",
  "bb...............bbbbb",
  "bbbbbbbbbbbbbbbbbbbbbb",
  "bbbbbbbbttbbbbbbbbbbbb",
  "bbbbbbbbbbbbbbbbbbbbbb",
  "bb...............bbbbb",
  "........kkkk..........",
];

export function scopeGeometry(): THREE.BufferGeometry {
  const pal = { b: 0x16171a, t: 0x3a3d43, k: 0x8b9099 };
  const g = voxelModel({
    palette: pal,
    layers: [SCOPE_SIDE, SCOPE_TOP, SCOPE_TOP, SCOPE_SIDE],
    axis: "x",
    voxel: 0.2,
    anchor: "center",
  });
  return g;
}

export function lensMesh(): THREE.Mesh {
  // Objective lens catching light: a tiny glassy face at the front of the scope.
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.62, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x3a5a7a, metalness: 0.9, roughness: 0.08, emissive: 0x0a1422 }),
  );
  m.position.set(0, 0.0, 2.21);
  return m;
}

const MAG_SIDE = [
  "rr.",
  "###",
  "###",
  "###",
  "###",
  "###",
  "###",
  "##.",
  "bbb",
];
export function magazineGeometry(): THREE.BufferGeometry {
  return voxelModel({
    palette: { r: 0x3b3430, "#": 0x26282d, b: 0x4a4e55 },
    layers: [MAG_SIDE, MAG_SIDE],
    axis: "x",
    voxel: 0.25,
    anchor: "center",
  });
}

export function gloveGeometry(): THREE.BufferGeometry {
  const g = new VoxelGrid(6, 8, 6);
  g.box(0, 0, 0, 6, 6, 6, 0xdedfd9);
  g.box(0, 6, 0, 6, 8, 6, 0xa9b0b9); // locking ring
  g.box(1, 6, 1, 5, 8, 5, null);
  g.box(5, 2, 2, 6, 5, 4, 0xd0d1cb); // thumb
  g.paint((x, y, z, c) => ((x + y + z) % 5 === 0 && y < 6 ? 0xd2d3cd : c));
  return g.geometry(0.75, "center");
}

export function cameraGeometry(): THREE.BufferGeometry {
  const g = new VoxelGrid(8, 6, 8);
  g.box(0, 0, 0, 8, 5, 5, 0x2c2f35);
  g.box(2, 1, 5, 6, 4, 8, 0x1a1b1e);
  g.box(3, 2, 7, 5, 3, 8, 0x5b7c9a);
  g.box(6, 5, 1, 8, 6, 3, 0x8b9099);
  return g.geometry(0.55, "center");
}

export function locatorGeometry(): THREE.BufferGeometry {
  const g = new VoxelGrid(6, 4, 3);
  g.box(0, 0, 0, 6, 4, 3, 0x3d434b);
  g.box(1, 1, 2, 5, 3, 3, 0x2a2e33);
  g.set(4, 2, 2, 0x2fd06a);
  return g.geometry(0.035, "center");
}

/** One machined meteorite slug (iron-nickel), in metres. */
export function slugGeometry(): THREE.BufferGeometry {
  const g = new VoxelGrid(5, 5, 7);
  g.fill((x, y, z) => {
    const dx = x - 2;
    const dy = y - 2;
    if (dx * dx + dy * dy > 5) return null;
    const face = z === 6 || z === 0;
    if (face) return 0xc3c7cc;
    // cut iron-nickel flanks, a few dark pits where the Widmanstätten grain shows
    return (x * 7 + y * 13 + z * 5) % 9 === 0 ? 0x4e5257 : 0x8a8f95;
  });
  return g.geometry(0.0015, "center");
}

export function propMaterial(options: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial {
  return voxelMaterial({ roughness: 0.6, metalness: 0.3, ...options });
}

export function propMesh(geometry: THREE.BufferGeometry, options: THREE.MeshStandardMaterialParameters = {}): THREE.Mesh {
  const m = new THREE.Mesh(geometry, propMaterial(options));
  m.castShadow = true;
  return m;
}

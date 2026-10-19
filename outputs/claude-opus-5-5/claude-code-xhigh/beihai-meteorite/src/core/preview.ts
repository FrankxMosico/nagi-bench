import type * as THREE from "three";

/**
 * Optional CPU mirror of a custom shader, stored in `mesh.userData.preview`.
 * The film never calls it; the offline frame previewer in /tools does, so
 * custom-shaded meshes (Earth, atmosphere) can be inspected without a GPU.
 */
export interface PreviewShadeInput {
  world: THREE.Vector3;
  normal: THREE.Vector3;
  colour: THREE.Color;
  camera: THREE.Vector3;
  attr: (name: string) => number[];
}

export type PreviewShader = (input: PreviewShadeInput) => [number, number, number, number];

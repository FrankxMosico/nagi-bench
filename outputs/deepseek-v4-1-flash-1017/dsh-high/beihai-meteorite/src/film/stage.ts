import * as THREE from "three";
import type { Cast } from "./cast";
import type { ShopSet } from "./shop";
import type { WorkshopSet } from "./workshop";
import type { BasementSet } from "./basement";
import type { SpaceSet } from "./space";
import { mix, smooth01, type Vec3 } from "./visual";

export type SetName = "shop" | "workshop" | "basement" | "space";

export interface FilmContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cast: Cast;
  sets: {
    shop: ShopSet;
    workshop: WorkshopSet;
    basement: BasementSet;
    space: SpaceSet;
  };
  activeSet: SetName | null;
}

interface Mood {
  background: number;
  fog: { color: number; density: number } | null;
  exposure: number;
}

const MOODS: Record<SetName, Mood> = {
  shop: { background: 0x090705, fog: { color: 0x171009, density: 0.043 }, exposure: 1.16 },
  workshop: { background: 0x05090a, fog: { color: 0x0b1416, density: 0.032 }, exposure: 1.08 },
  basement: { background: 0x070504, fog: { color: 0x130d08, density: 0.06 }, exposure: 1.02 },
  space: { background: 0x000003, fog: null, exposure: 1.12 },
};

export function hideAll(ctx: FilmContext): void {
  for (const set of Object.values(ctx.sets)) set.root.visible = false;
  ctx.activeSet = null;
  ctx.scene.background = new THREE.Color(0x000000);
  ctx.scene.fog = null;
  ctx.renderer.toneMappingExposure = 0.92;
}

export function activateSet(ctx: FilmContext, name: SetName): void {
  if (ctx.activeSet === name) return;
  for (const set of Object.values(ctx.sets)) set.root.visible = false;
  ctx.sets[name].root.visible = true;
  ctx.activeSet = name;
  const mood = MOODS[name];
  ctx.scene.background = new THREE.Color(mood.background);
  ctx.scene.fog = mood.fog ? new THREE.FogExp2(mood.fog.color, mood.fog.density) : null;
  ctx.renderer.toneMappingExposure = mood.exposure;
}

export interface CameraKey {
  at: number;
  pos: Vec3;
  look: Vec3;
  fov?: number;
  roll?: number;
}

export function cameraKeys(
  camera: THREE.PerspectiveCamera,
  localTime: number,
  keys: CameraKey[],
  shake = 0,
): void {
  if (keys.length === 0) return;
  let a = keys[0]!;
  let b = keys[keys.length - 1]!;
  for (let i = 0; i < keys.length - 1; i++) {
    const left = keys[i]!;
    const right = keys[i + 1]!;
    if (localTime >= left.at && localTime <= right.at) {
      a = left;
      b = right;
      break;
    }
    if (localTime > right.at) {
      a = right;
      b = right;
    }
  }
  const t = b.at <= a.at ? 0 : smooth01((localTime - a.at) / (b.at - a.at));
  camera.position.set(
    mix(a.pos[0], b.pos[0], t),
    mix(a.pos[1], b.pos[1], t),
    mix(a.pos[2], b.pos[2], t),
  );
  const look = new THREE.Vector3(
    mix(a.look[0], b.look[0], t),
    mix(a.look[1], b.look[1], t),
    mix(a.look[2], b.look[2], t),
  );
  const fov = mix(a.fov ?? 42, b.fov ?? 42, t);
  camera.fov = fov;
  camera.updateProjectionMatrix();
  if (shake > 0) {
    const s = shake;
    camera.position.x += (Math.sin(localTime * 17.3) + Math.sin(localTime * 7.1)) * s;
    camera.position.y += (Math.cos(localTime * 13.7) + Math.sin(localTime * 5.3)) * s;
    look.x += Math.sin(localTime * 9.7) * s * 0.5;
    look.y += Math.cos(localTime * 11.1) * s * 0.4;
  }
  camera.up.set(0, 1, 0);
  camera.lookAt(look);
  const roll = mix(a.roll ?? 0, b.roll ?? 0, t);
  if (roll !== 0) camera.rotateZ(roll);
}

export function lookAtWorld(
  camera: THREE.PerspectiveCamera,
  localTime: number,
  from: Vec3,
  at: THREE.Vector3,
  fov: number,
  shake = 0,
): void {
  camera.position.set(...from);
  camera.fov = fov;
  camera.updateProjectionMatrix();
  camera.up.set(0, 1, 0);
  if (shake > 0) {
    camera.position.x += Math.sin(localTime * 14.3) * shake;
    camera.position.y += Math.cos(localTime * 11.7) * shake;
  }
  camera.lookAt(at);
}

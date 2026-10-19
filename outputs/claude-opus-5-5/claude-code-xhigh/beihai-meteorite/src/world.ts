import * as THREE from "three";
import { buildSky, type Sky } from "./sets/sky";
import { buildSpace, type SpaceSet } from "./sets/space";
import { buildAlley, buildRoom, type Alley, type Room } from "./sets/courtyard";
import { buildWorkshop, type Workshop } from "./sets/workshop";
import { buildBasement, type Basement } from "./sets/basement";

/**
 * Everything on stage, independent of the renderer and the DOM, so the same
 * world can be driven by the player in the browser and by the offline
 * previewer. Shots write into `fx` every frame; the presentation layer reads it.
 */

export type SetName = "space" | "alley" | "room" | "workshop" | "basement" | "black";

export interface Card {
  text: string;
  sub?: string;
  opacity: number;
  style: "title" | "place" | "credit";
}

export interface FrameFX {
  exposure: number;
  bloom: number;
  bloomRadius: number;
  bloomThreshold: number;
  /** 0 clear → 1 black. */
  fade: number;
  /** Additive white flash (muzzle in a dark room). */
  flash: number;
  /** Telescopic sight overlay 0..1 and its reticle readouts. */
  scope: number;
  scopeLabel: string;
  scopeShake: [number, number];
  /** Helmet HUD lines (POV only). */
  hud: number;
  hudLines: string[];
  hudWarn: string;
  card: Card | null;
  card2: Card | null;
  grain: number;
  vignette: number;
  /** Desaturate (0..1) for the subjective stillness of the flight. */
  desat: number;
  /** Warm/cool grade: −1 cool … +1 warm. */
  tint: number;
  set: SetName;
}

export function defaultFX(): FrameFX {
  return {
    exposure: 1,
    bloom: 0.5,
    bloomRadius: 0.5,
    bloomThreshold: 0.85,
    fade: 0,
    flash: 0,
    scope: 0,
    scopeLabel: "",
    scopeShake: [0, 0],
    hud: 0,
    hudLines: [],
    hudWarn: "",
    card: null,
    card2: null,
    grain: 0.06,
    vignette: 0.35,
    desat: 0,
    tint: 0,
    set: "black",
  };
}

export interface World {
  scene: THREE.Scene;
  bg: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  bgCamera: THREE.PerspectiveCamera;
  sky: Sky;
  space: SpaceSet;
  alley: Alley;
  room: Room;
  workshop: Workshop;
  basement: Basement;
  fx: FrameFX;
  show(set: SetName): void;
  /** Aim the shot camera: position, look-at target, vertical FOV (deg), roll (rad). */
  look(pos: THREE.Vector3Like, target: THREE.Vector3Like, fov: number, roll?: number, near?: number): void;
}

export function createWorld(): World {
  const scene = new THREE.Scene();
  scene.background = null;
  const bg = new THREE.Scene();
  bg.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(35, 2.35, 0.02, 2_000_000);
  const bgCamera = new THREE.PerspectiveCamera(35, 2.35, 1, 30000);

  const sky = buildSky();
  bg.add(sky.group);
  const space = buildSpace(sky);
  const alley = buildAlley();
  const room = buildRoom();
  const workshop = buildWorkshop();
  const basement = buildBasement();
  const groups: Record<Exclude<SetName, "black">, THREE.Group> = {
    space: space.group,
    alley: alley.group,
    room: room.group,
    workshop: workshop.group,
    basement: basement.group,
  };
  for (const g of Object.values(groups)) {
    g.visible = false;
    scene.add(g);
  }

  const fx = defaultFX();
  const up = new THREE.Vector3(0, 1, 0);
  const tmp = new THREE.Vector3();

  const world: World = {
    scene,
    bg,
    camera,
    bgCamera,
    sky,
    space,
    alley,
    room,
    workshop,
    basement,
    fx,
    show(set) {
      fx.set = set;
      for (const [name, g] of Object.entries(groups)) g.visible = name === set;
      sky.setVisible(set === "space");
    },
    look(pos, target, fov, roll = 0, near) {
      camera.position.set(pos.x, pos.y, pos.z);
      camera.up.copy(up);
      camera.lookAt(tmp.set(target.x, target.y, target.z));
      if (roll) camera.rotateZ(roll);
      camera.fov = fov;
      // The logarithmic depth buffer keeps precision with a tiny near plane,
      // so foreground props never clip even when the target is 5 km away.
      camera.near = near ?? 0.02;
      camera.far = 2_000_000;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
      bgCamera.quaternion.copy(camera.quaternion);
      bgCamera.fov = fov;
      bgCamera.aspect = camera.aspect;
      bgCamera.updateProjectionMatrix();
      bgCamera.updateMatrixWorld(true);
    },
  };
  world.show("black");
  return world;
}

export function resetFX(fx: FrameFX): void {
  Object.assign(fx, defaultFX(), { set: fx.set });
}

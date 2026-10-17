import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import {
  activateSet,
  cameraKeys,
  hideAll,
  type FilmContext,
} from "./stage";
import { pulse, range, smooth01 } from "./visual";

const V = (x: number, y: number, z: number): [number, number, number] => [x, y, z];

function shopShot(
  id: string,
  start: number,
  end: number,
  keys: Parameters<typeof cameraKeys>[2],
  shake = 0,
): Shot<FilmContext> {
  return {
    id,
    start,
    end,
    enter: ({ context }) => activateSet(context, "shop"),
    update: ({ context, localTime, time }) => {
      context.sets.shop.update(time);
      cameraKeys(context.camera, localTime, keys, shake);
    },
  };
}

function workshopShot(
  id: string,
  start: number,
  end: number,
  keys: Parameters<typeof cameraKeys>[2],
  shake = 0,
): Shot<FilmContext> {
  return {
    id,
    start,
    end,
    enter: ({ context }) => activateSet(context, "workshop"),
    update: ({ context, localTime, time }) => {
      context.sets.workshop.update(time);
      cameraKeys(context.camera, localTime, keys, shake);
    },
  };
}

function basementShot(
  id: string,
  start: number,
  end: number,
  keys: Parameters<typeof cameraKeys>[2],
  shake = 0,
): Shot<FilmContext> {
  return {
    id,
    start,
    end,
    enter: ({ context }) => activateSet(context, "basement"),
    update: ({ context, localTime, time }) => {
      context.sets.basement.update(time);
      cameraKeys(context.camera, localTime, keys, shake);
    },
  };
}

function spaceShot(
  id: string,
  start: number,
  end: number,
  keys: Parameters<typeof cameraKeys>[2],
  shake = 0,
): Shot<FilmContext> {
  return {
    id,
    start,
    end,
    enter: ({ context }) => activateSet(context, "space"),
    update: ({ context, localTime, time }) => {
      context.sets.space.update(time);
      cameraKeys(context.camera, localTime, keys, shake);
    },
  };
}

export function createShots(): Shot<FilmContext>[] {
  const tempHand = new THREE.Vector3();
  const tempLook = new THREE.Vector3();

  return [
    {
      id: "01-cold-open",
      start: 0,
      end: 11,
      enter: ({ context }) => activateSet(context, "space"),
      update: ({ context, localTime, time }) => {
        context.sets.space.update(time);
        cameraKeys(context.camera, localTime, [
          { at: 0, pos: V(0.2, 4.6, 13.5), look: V(0, -21, -100), fov: 53, roll: -0.015 },
          { at: 11, pos: V(2.2, 3.2, 8.6), look: V(-4, -17, -106), fov: 48, roll: 0.012 },
        ]);
      },
    },
    shopShot("02-the-stones", 11, 19, [
      { at: 0, pos: V(-0.7, 1.72, 3.75), look: V(-5.25, 1.35, -0.2), fov: 43 },
      { at: 5.5, pos: V(-2.8, 1.6, 2.3), look: V(-5.15, 1.3, 0.2), fov: 38 },
      { at: 8, pos: V(-3.75, 1.56, 1.72), look: V(-5.45, 1.36, 0.78), fov: 31 },
    ]),
    shopShot("03-visitor", 19, 27, [
      { at: 0, pos: V(3.3, 1.92, 1.05), look: V(-3.0, 1.18, 4.38), fov: 48 },
      { at: 4.2, pos: V(2.7, 1.81, 0.35), look: V(-2.25, 1.34, 3.2), fov: 45 },
      { at: 8, pos: V(2.15, 1.7, -0.1), look: V(-0.6, 1.32, 1.3), fov: 43 },
    ]),
    shopShot("04-greeting", 27, 35, [
      { at: 0, pos: V(-2.4, 1.95, 0.4), look: V(1.05, 1.35, -1.75), fov: 46 },
      { at: 8, pos: V(-1.55, 2.0, 1.2), look: V(1.05, 1.31, -1.8), fov: 50 },
    ]),
    shopShot("05-his-world", 35, 44, [
      { at: 0, pos: V(-1.25, 1.74, 0.75), look: V(1.02, 1.3, -2.78), fov: 32 },
      { at: 9, pos: V(-0.82, 1.66, 0.35), look: V(1.02, 1.36, -2.62), fov: 29 },
    ]),
    shopShot("06-earth-is-a-meteorite", 44, 50, [
      { at: 0, pos: V(-0.05, 1.65, -3.3), look: V(1.18, 1.43, -0.55), fov: 36 },
      { at: 6, pos: V(0.42, 1.56, -3.02), look: V(1.18, 1.4, -0.58), fov: 32 },
    ]),
    shopShot("07-the-request", 50, 61, [
      { at: 0, pos: V(3.5, 1.68, -1.25), look: V(1.0, 1.35, -1.72), fov: 38, roll: 0.006 },
      { at: 11, pos: V(2.82, 1.54, -1.72), look: V(1.08, 1.44, -1.72), fov: 35 },
    ]),
    shopShot("08-three-stones", 61, 69, [
      { at: 0, pos: V(1.08, 2.0, -1.7), look: V(1.08, 0.91, -1.75), fov: 40 },
      { at: 8, pos: V(1.08, 1.8, -1.74), look: V(1.08, 0.91, -1.76), fov: 37 },
    ]),
    shopShot("08b-the-dealer", 69, 75, [
      { at: 0, pos: V(2.7, 1.92, 0.48), look: V(1.04, 1.32, -2.6), fov: 37 },
      { at: 6, pos: V(2.36, 1.8, 0.2), look: V(1.04, 1.36, -2.48), fov: 34 },
    ]),
    shopShot("09-the-price", 75, 82, [
      { at: 0, pos: V(-1.8, 1.86, 0.15), look: V(1.04, 1.34, -1.76), fov: 46 },
      { at: 7, pos: V(-1.3, 1.76, -0.1), look: V(1.16, 1.38, -1.2), fov: 42 },
    ]),
    shopShot("09b-the-transfer", 82, 88, [
      { at: 0, pos: V(0.25, 1.66, -2.24), look: V(1.18, 1.44, -0.56), fov: 37 },
      { at: 6, pos: V(0.62, 1.58, -1.98), look: V(1.16, 1.42, -0.64), fov: 32 },
    ]),
    shopShot("10-respect", 88, 95, [
      { at: 0, pos: V(0.18, 1.6, -3.25), look: V(1.18, 1.42, -0.56), fov: 32 },
      { at: 7, pos: V(0.52, 1.52, -2.86), look: V(1.18, 1.4, -0.59), fov: 27 },
    ]),
    shopShot("10b-his-question", 95, 98, [
      { at: 0, pos: V(0.1, 1.68, -1.35), look: V(1.05, 1.32, -2.74), fov: 38 },
      { at: 3, pos: V(0.3, 1.62, -1.48), look: V(1.05, 1.3, -2.66), fov: 34 },
    ]),
    shopShot("11-departure", 98, 105, [
      { at: 0, pos: V(3.7, 2.15, -3.1), look: V(-2.0, 1.35, 4.38), fov: 46 },
      { at: 7, pos: V(3.2, 2.0, -2.4), look: V(-3.2, 1.3, 4.42), fov: 42 },
    ]),
    {
      id: "12-one-year-later",
      start: 105,
      end: 112,
      enter: ({ context }) => hideAll(context),
      update: ({ context }) => {
        context.renderer.setClearColor(0x000000, 1);
      },
    },
    workshopShot("13-night-shift", 112, 121, [
      { at: 0, pos: V(5.7, 2.55, 4.8), look: V(1.1, 1.3, 0.1), fov: 48, roll: -0.01 },
      { at: 9, pos: V(4.2, 2.15, 3.25), look: V(0.2, 1.2, -0.3), fov: 43 },
    ]),
    workshopShot("14-the-lathe", 121, 131, [
      { at: 0, pos: V(-3.7, 1.8, 3.1), look: V(-0.2, 1.0, -0.1), fov: 37 },
      { at: 10, pos: V(-3.0, 1.6, 2.6), look: V(-0.35, 1.0, 0.0), fov: 34, roll: -0.008 },
    ], 0.003),
    workshopShot("15-thirty-six", 131, 139, [
      { at: 0, pos: V(-2.55, 1.38, -2.95), look: V(-3.75, 0.98, -3.82), fov: 31 },
      { at: 8, pos: V(-2.92, 1.2, -3.2), look: V(-3.78, 0.98, -3.82), fov: 26 },
    ]),
    basementShot("16-assembly", 139, 149, [
      { at: 0, pos: V(2.15, 1.72, 2.05), look: V(-0.5, 1.0, 0.08), fov: 39 },
      { at: 10, pos: V(1.7, 1.55, 1.55), look: V(-0.52, 0.98, 0.12), fov: 34 },
    ]),
    basementShot("17-four-rounds", 149, 158, [
      { at: 0, pos: V(-2.8, 1.55, 0.95), look: V(0.2, 1.3, 0.55), fov: 39 },
      { at: 9, pos: V(-2.4, 1.45, 0.7), look: V(0.25, 1.32, 0.55), fov: 34 },
    ]),
    basementShot("18-the-shot", 158, 162, [
      { at: 0, pos: V(2.4, 1.8, 2.2), look: V(0.2, 1.45, -1.2), fov: 44 },
      { at: 4, pos: V(3.1, 2.0, 2.6), look: V(0.2, 1.38, -1.0), fov: 40 },
    ], 0.005),
    basementShot("19-five-holes", 162, 168, [
      { at: 0, pos: V(0.36, 1.6, -1.05), look: V(0.35, 1.61, -2.38), fov: 29 },
      { at: 6, pos: V(0.38, 1.58, -1.45), look: V(0.35, 1.6, -2.38), fov: 24 },
    ]),
    basementShot("20-fragments", 168, 177, [
      { at: 0, pos: V(1.32, 1.42, 0.9), look: V(0.1, 1.02, -0.12), fov: 31 },
      { at: 9, pos: V(0.92, 1.24, 0.64), look: V(0.12, 1.03, -0.12), fov: 25 },
    ]),
    basementShot("21-thirty-two", 177, 185, [
      { at: 0, pos: V(1.55, 1.64, 1.64), look: V(0.55, 1.0, 0.05), fov: 37 },
      { at: 8, pos: V(1.85, 1.5, 0.98), look: V(0.9, 1.0, 0.1), fov: 31 },
    ]),
    {
      id: "22-synchronous-orbit",
      start: 185,
      end: 193,
      enter: ({ context }) => hideAll(context),
      update: () => undefined,
    },
    spaceShot("23-five-kilometres", 193, 203, [
      { at: 0, pos: V(8.8, 4.6, 13.2), look: V(0, 2.8, -24), fov: 48, roll: 0.03 },
      { at: 10, pos: V(5.2, 3.4, 8.2), look: V(0, 3.2, -30), fov: 42, roll: 0.015 },
    ]),
    spaceShot("24-a-man-alone", 203, 214, [
      { at: 0, pos: V(2.55, 3.45, -2.45), look: V(0, 3.25, 0.25), fov: 34 },
      { at: 11, pos: V(1.75, 3.08, -2.1), look: V(0, 3.35, 0.2), fov: 29, roll: -0.015 },
    ]),
    spaceShot("25-sunset", 214, 228, [
      { at: 0, pos: V(0, 8.2, -27.5), look: V(0, 4.0, -51), fov: 42, roll: -0.02 },
      { at: 14, pos: V(-2.1, 7.3, -31.5), look: V(0, 4.4, -52), fov: 38, roll: 0.01 },
    ]),
    {
      id: "26-scope",
      start: 228,
      end: 234,
      enter: ({ context }) => activateSet(context, "space"),
      update: ({ context, localTime, time }) => {
        context.sets.space.update(time);
        cameraKeys(context.camera, localTime, [
          { at: 0, pos: V(0.04, 3.82, -0.72), look: V(0.0, 5.85, -40.8), fov: 7.8, roll: -0.004 },
          { at: 6, pos: V(0.03, 3.82, -0.72), look: V(0.08, 5.8, -40.8), fov: 7.25, roll: 0.003 },
        ], 0.0003);
      },
    },
    {
      id: "27-thirty-rounds",
      start: 234,
      end: 239.5,
      enter: ({ context }) => activateSet(context, "space"),
      update: ({ context, localTime, time }) => {
        context.sets.space.update(time);
        const zx = context.sets.space.zhang.root.position.x;
        const zy = context.sets.space.zhang.root.position.y;
        const zz = context.sets.space.zhang.root.position.z;
        const burst = burstEnergy(time);
        const camera = context.camera;
        camera.position.set(zx + 2.15, zy + 1.7, zz + 2.25);
        camera.position.x += Math.sin(localTime * 17) * burst * 0.016;
        camera.position.y += Math.cos(localTime * 13) * burst * 0.013;
        camera.fov = 38;
        camera.updateProjectionMatrix();
        camera.up.set(0, 1, 0);
        tempLook.set(zx + 0.15, zy + 1.28, zz - 1.5);
        camera.lookAt(tempLook);
        camera.rotateZ(-0.04);
      },
    },
    {
      id: "28-ten-seconds",
      start: 239.5,
      end: 244.3,
      enter: ({ context }) => activateSet(context, "space"),
      update: ({ context, localTime, time }) => {
        context.sets.space.update(time);
        cameraKeys(context.camera, localTime, [
          { at: 0, pos: V(2.8, 6.9, -17.5), look: V(0.2, 6.2, -34), fov: 31, roll: 0.06 },
          { at: 4.8, pos: V(1.9, 6.25, -24.2), look: V(0.1, 6.35, -40), fov: 27, roll: 0.02 },
        ]);
      },
    },
    spaceShot("29-impact", 244.3, 252, [
      { at: 0, pos: V(0.0, 6.65, -33.2), look: V(0.0, 6.3, -41.2), fov: 35, roll: -0.02 },
      { at: 7.7, pos: V(0.4, 6.45, -35.1), look: V(0.2, 6.2, -41.7), fov: 31, roll: 0.01 },
    ], 0.006),
    spaceShot("30-meteor-rain", 252, 265, [
      { at: 0, pos: V(-1.8, 7.0, -35.4), look: V(0.5, 6.3, -42.2), fov: 45, roll: 0.035 },
      { at: 7, pos: V(1.7, 6.15, -35.0), look: V(0.1, 6.1, -42.5), fov: 41, roll: -0.03 },
      { at: 13, pos: V(0.6, 5.8, -33.2), look: V(0.0, 5.8, -42.0), fov: 48, roll: 0.01 },
    ], 0.015),
    {
      id: "31-departure",
      start: 265,
      end: 278,
      enter: ({ context }) => activateSet(context, "space"),
      update: ({ context, localTime, time }) => {
        context.sets.space.update(time);
        const z = context.sets.space.zhang.root.position.z;
        cameraKeys(context.camera, localTime, [
          { at: 0, pos: V(3.8, 3.8, z + 5.3), look: V(0.2, 2.8, z - 1.0), fov: 41, roll: 0.02 },
          { at: 13, pos: V(4.9, 3.1, z + 7.4), look: V(0.2, 2.7, z - 0.2), fov: 45, roll: -0.01 },
        ], 0.003);
      },
    },
    spaceShot("32-silence", 278, 290, [
      { at: 0, pos: V(10.5, 7.2, 22.0), look: V(0, -5.5, -55), fov: 53, roll: 0.015 },
      { at: 12, pos: V(13.8, 9.2, 28.0), look: V(0, -3.5, -57), fov: 55, roll: -0.01 },
    ]),
    spaceShot("33-the-stone", 290, 304, [
      { at: 0, pos: V(2.8, 2.55, 5.0), look: V(1.15, 1.55, 2.2), fov: 39, roll: 0.02 },
      { at: 14, pos: V(2.25, 2.25, 4.35), look: V(1.17, 1.62, 2.28), fov: 35, roll: -0.022 },
    ]),
    {
      id: "34-end-credits",
      start: 304,
      end: 330,
      enter: ({ context }) => hideAll(context),
      update: () => undefined,
    },
  ];
}

function burstEnergy(time: number): number {
  let energy = 0;
  for (const start of [234.15, 236.45, 238.75]) {
    if (time >= start && time <= start + 0.72) {
      energy = Math.max(energy, Math.max(0, Math.sin((time - start) * 118) * 0.5 + 0.5));
    }
  }
  return energy;
}

void pulse;
void range;
void smooth01;

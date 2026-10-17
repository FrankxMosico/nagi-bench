import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import { applyPose, lerpPose, walk, type Pose } from "@agentbench/voxel-kit";
import { clamp01, lerp, setCamera, smooth } from "./lib/helpers";
import {
  aimPose,
  floatingWorkPose,
  gesturePose,
  seatedCollectorPose,
  standingAtRest,
  workbenchPose,
} from "./lib/characters";
import { FIRE_TIMES } from "./cues";
import type { PrologueWorld } from "./world/prologue";
import type { HutongWorld } from "./world/hutong";
import type { CollectorWorld } from "./world/collector";
import type { WorkshopWorld } from "./world/workshop";
import type { BasementWorld } from "./world/basement";
import type { SpaceWorld } from "./world/space";
import type { BaseWorld } from "./world/base";

export interface FilmContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  worlds: {
    prologue: PrologueWorld;
    hutong: HutongWorld;
    collector: CollectorWorld;
    workshop: WorkshopWorld;
    basement: BasementWorld;
    space: SpaceWorld;
    base: BaseWorld;
  };
}

function mixPose(base: Pose, overrides: Partial<Pose>, amount: number): Pose {
  return lerpPose(base, { ...base, ...overrides }, clamp01(amount));
}

function walkingPose(time: number, speed = 1.2): Pose {
  const pose = walk(time, speed);
  pose.neck = [-0.015, Math.sin(time * 0.45) * 0.06, 0];
  return pose;
}

function cameraShake(camera: THREE.PerspectiveCamera, time: number, strength: number, seed = 1): void {
  const x = Math.sin(time * 113.1 + seed) * Math.sin(time * 67.3) * strength;
  const y = Math.cos(time * 91.7 + seed * 1.7) * Math.sin(time * 53.9) * strength;
  camera.position.x += x;
  camera.position.y += y;
  camera.rotateZ(x * 0.16);
}

function fireShake(time: number): number {
  let amount = 0;
  for (const shot of FIRE_TIMES) {
    const d = Math.abs(time - shot);
    if (d < 0.11) amount = Math.max(amount, 1 - d / 0.11);
  }
  return amount;
}

export function createFilmShots(): Shot<FilmContext>[] {
  const allWorlds = (context: FilmContext): THREE.Group[] => [
    context.worlds.prologue.group,
    context.worlds.hutong.group,
    context.worlds.collector.group,
    context.worlds.workshop.group,
    context.worlds.basement.group,
    context.worlds.space.group,
    context.worlds.base.group,
  ];

  const onlyWorld = (context: FilmContext, group: THREE.Group): void => {
    for (const world of allWorlds(context)) world.visible = world === group;
  };

  const setBackdrop = (name: string): void => {
    const element = document.getElementById("backdrop");
    if (element) element.className = `backdrop backdrop--${name}`;
  };

  const resetCollectorStage = (context: FilmContext): void => {
    const { zhang, collector } = context.worlds.collector;
    zhang.figure.root.visible = true;
    zhang.setUniform();
    zhang.figure.root.position.set(0, 0, -0.08);
    zhang.figure.root.rotation.set(0, 0.62, 0);
    collector.figure.root.visible = true;
    collector.figure.root.position.set(0.05, 0, 2.7);
    collector.figure.root.rotation.set(0, Math.PI - 0.62, 0);
    collector.setSmile(true);
  };

  const resetWorkshopStage = (context: FilmContext): void => {
    const world = context.worlds.workshop;
    world.zhang.figure.root.visible = true;
    world.zhang.setUniform();
    world.setMachining(false);
    world.setPieces(0);
    world.setCaseOpen(false);
    world.setWorkpieces(true);
    world.setDustVial(false);
    world.machineGlass.visible = true;
  };

  const resetBasementStage = (context: FilmContext): void => {
    const world = context.worlds.basement;
    world.zhang.figure.root.visible = true;
    world.zhang.setUniform();
    world.setDoorOpen(0);
    world.setLights(1);
    world.setBullets(true);
    world.setInspection(false);
    world.setParcelState("loaded");
    world.setBulletCount(36);
    world.gun.root.visible = false;
    world.setStairsActive(false);
  };

  const enterSpace = (context: FilmContext, crew: boolean): SpaceWorld => {
    onlyWorld(context, context.worlds.space.group);
    setBackdrop("space");
    const world = context.worlds.space;
    world.setCrewVisible(crew);
    world.setSoloVictim(null);
    world.setGunVisible(false);
    world.setScopeVisible(false);
    world.setBulletsVisible(false);
    world.setZhangJets(false);
    return world;
  };

  const shots: Shot<FilmContext>[] = [
    {
      id: "prologue",
      start: 0,
      end: 10,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.prologue.group);
        setBackdrop("space");
      },
      update: ({ context, localTime, time }) => {
        context.worlds.prologue.update(time, localTime);
        const t = clamp01(localTime / 10);
        setCamera(
          context.camera,
          [0.55 - 0.1 * t, 0.18 + Math.sin(t * 2.1) * 0.03, 0.4 - 0.14 * t],
          [-0.4, 0.02, -1.55],
          35 - 2.5 * t,
          Math.sin(t * 2.2) * 0.012,
        );
      },
    },
    {
      id: "hutong-approach",
      start: 10,
      end: 27.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.hutong.group);
        setBackdrop("dusk");
        const world = context.worlds.hutong;
        world.setMode("dusk");
        world.setDoorOpen(0);
        world.setCase(false);
        world.zhang.figure.root.visible = true;
        world.zhang.setUniform();
        world.zhang.figure.root.position.set(-0.2, 0, -5.5);
        world.zhang.figure.root.rotation.set(0, 0, 0);
        world.collector.figure.root.visible = true;
        world.collector.figure.root.position.set(0.2, 0, 4.7);
        world.collector.figure.root.rotation.set(0, Math.PI, 0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.hutong;
        const t = localTime;
        world.zhang.figure.root.visible = t < 12.4;
        world.collector.figure.root.visible = t > 10.8;
        if (t < 8.1) {
          const p = smooth(clamp01((t - 0.35) / 7.4));
          world.zhang.figure.root.position.set(-0.25 + Math.sin(p * 2.8) * 0.06, 0, lerp(-6.5, -0.5, p));
          world.zhang.figure.root.rotation.set(0, 0, 0);
          world.zhang.pose(walkingPose(time + 0.7, 1.18));
          world.setDoorOpen(0);
        } else if (t < 9.8) {
          world.zhang.figure.root.position.set(-0.16, 0, -0.35);
          world.zhang.figure.root.rotation.set(0, 0, 0);
          world.setDoorOpen(smooth(clamp01((t - 8.1) / 1.3)));
          world.zhang.pose(
            mixPose(standingAtRest(time), {
              neck: [0.02, 0.1, 0],
              armR: [-1.25, 0.05, -0.16],
              armL: [-0.18, -0.05, 0.08],
            }, smooth(clamp01((t - 8.1) / 0.5))),
          );
        } else if (t < 12.4) {
          const p = smooth(clamp01((t - 9.8) / 2.5));
          world.setDoorOpen(1);
          world.zhang.figure.root.position.set(-0.1, 0, lerp(-0.2, 2.9, p));
          world.zhang.pose(walkingPose(time + 1.4, 1.0));
        } else {
          world.setDoorOpen(1);
          applyPose(world.collector.figure, standingAtRest(time + 1.4));
        }
        world.collector.setSmile(true);
        world.collector.figure.root.position.set(0.18, 0, 4.5);
        world.collector.figure.root.rotation.set(0, Math.PI, 0);
        world.update(time, localTime);
        frameHutong(context, localTime);
      },
    },
    {
      id: "room-reveal",
      start: 27.5,
      end: 39,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        resetCollectorStage(context);
        const world = context.worlds.collector;
        world.setSafeOpen(0);
        world.setChosenVisible(false);
        world.setParcelVisible(false);
        world.setPhone(false);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        const inspect = 1 - smooth(clamp01((localTime - 3.3) / 1.1));
        const seated = seatedCollectorPose(time, inspect > 0.4, 0.12);
        if (localTime > 4.3) {
          seated.armR = [-0.7, 0.14, 0.3];
          seated.armL = [-0.8, -0.18, -0.32];
          seated.neck = [0.05, 0.2, 0.02];
        }
        applyPose(world.collector.figure, seated);
        applyPose(world.zhang.figure, mixPose(standingAtRest(time), {
          neck: [0.01, 0.04, 0],
          armR: [0.03, 0.03, -0.08],
          armL: [-0.03, -0.03, 0.07],
        }, smooth(clamp01(localTime / 2.5))));
        const push = smooth(clamp01(localTime / 11.5));
        setCamera(
          context.camera,
          [3.35 - 0.2 * push, 1.48 - 0.02 * push, 1.25 - 0.35 * push],
          [0.0, 1.22, 1.35],
          44 - 3 * push,
          0.005 * Math.sin(localTime * 0.25),
        );
      },
    },
    {
      id: "room-talk",
      start: 39,
      end: 52,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        resetCollectorStage(context);
        const world = context.worlds.collector;
        world.setSafeOpen(0);
        world.setChosenVisible(false);
        world.setParcelVisible(false);
        world.setPhone(false);
        world.collector.setSmile(true);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        const seated = seatedCollectorPose(time + 0.5, false, 0.12);
        seated.neck = [0.07, 0.18, -0.02];
        seated.armR = [-0.77, 0.14, 0.3];
        seated.armL = [-0.8, -0.2, -0.3];
        applyPose(world.collector.figure, seated);
        let zPose = gesturePose(time + 0.2, 0.4);
        if (localTime > 7.4) {
          zPose = mixPose(zPose, {
            armR: [-0.45, 0.2, 0.18],
            neck: [0.06, -0.16, 0],
          }, smooth(clamp01((localTime - 7.4) / 1.8)));
        }
        applyPose(world.zhang.figure, zPose);
        const push = smooth(clamp01(localTime / 13));
        setCamera(
          context.camera,
          [3.55 - 0.2 * push, 1.4, 0.55 - 0.08 * push],
          [-0.05, 1.2, 1.25],
          41 - 2 * push,
          0.005 * Math.sin(localTime * 0.36),
        );
      },
    },
    {
      id: "cabinets",
      start: 52,
      end: 58.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        const world = context.worlds.collector;
        world.zhang.figure.root.visible = false;
        world.collector.figure.root.visible = false;
        world.setSafeOpen(0);
        world.setChosenVisible(false);
        world.setParcelVisible(false);
      },
      update: ({ context, localTime, time }) => {
        context.worlds.collector.update(time, localTime);
        const push = smooth(clamp01(localTime / 6.0));
        setCamera(
          context.camera,
          [1.5 - 0.3 * push, 1.42, 0.4 + 1.2 * push],
          [-4.6, 1.65, 0.0 + 2.8 * push],
          43,
          -0.01,
        );
      },
    },
    {
      id: "safe",
      start: 58.5,
      end: 64,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        const world = context.worlds.collector;
        world.zhang.figure.root.visible = false;
        world.collector.figure.root.visible = false;
        world.setChosenVisible(false);
        world.setParcelVisible(false);
        world.setPhone(false);
        world.setSafeOpen(0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        world.setSafeOpen(0);
        const push = smooth(clamp01(localTime / 5.2));
        setCamera(
          context.camera,
          [-1.95 + 0.12 * push, 1.35, 2.25 + 0.15 * push],
          [-3.55, 1.18, 3.95],
          36 - 2 * push,
          -0.005,
        );
      },
    },
    {
      id: "request",
      start: 64,
      end: 78,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        resetCollectorStage(context);
        const world = context.worlds.collector;
        world.setChosenVisible(false);
        world.setParcelVisible(false);
        world.setPhone(false);
        world.setSafeOpen(1);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        const seated = seatedCollectorPose(time + 1.1, false, 0.24);
        const lean = smooth(clamp01((localTime - 6.0) / 3.2));
        seated.hips = [-0.06 - lean * 0.03, 0.03, 0];
        seated.neck = [0.08 + lean * 0.18, 0.08, 0];
        seated.armR = [-0.78 - lean * 0.1, 0.12, 0.3 + lean * 0.15];
        seated.armL = [-0.75 - lean * 0.1, -0.18, -0.27 - lean * 0.12];
        applyPose(world.collector.figure, seated);
        applyPose(world.zhang.figure, mixPose(standingAtRest(time + 0.8), {
          neck: [0.03, 0.08, 0],
          armR: [-0.18, 0.16, -0.06],
          armL: [0.02, -0.02, 0.06],
        }, smooth(clamp01((localTime - 1.0) / 2.2))));
        if (localTime > 5.4) world.setChosenVisible(true);
        const down = smooth(clamp01((localTime - 9.5) / 3.6));
        setCamera(
          context.camera,
          [3.45 - 0.2 * down, 1.43 - 0.16 * down, 0.45 + 0.2 * down],
          [0.0, 1.22 - 0.22 * down, 1.25 - 0.08 * down],
          42 - 5 * down,
          0.005 * Math.sin(localTime * 0.35),
        );
      },
    },
    {
      id: "bargain",
      start: 78,
      end: 88.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        resetCollectorStage(context);
        const world = context.worlds.collector;
        world.setChosenVisible(true);
        world.setParcelVisible(false);
        world.setPhone(false);
        world.setSafeOpen(1);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        const seated = seatedCollectorPose(time + 2, false, 0.28);
        seated.neck = [0.12, 0.06, 0];
        seated.armR = [-0.88, 0.14, 0.32];
        seated.armL = [-0.84, -0.18, -0.3];
        if (localTime > 6.8) {
          world.collector.setSmile(false);
          seated.armR = [-0.62, 0.2, 0.22];
        }
        applyPose(world.collector.figure, seated);
        applyPose(world.zhang.figure, standingAtRest(time + 1));
        const push = smooth(clamp01(localTime / 10.5));
        setCamera(
          context.camera,
          [2.85 - 0.2 * push, 1.3, 1.05 + 0.2 * push],
          [0.02, 1.06, 1.7],
          36 - 1.5 * push,
          -0.008,
        );
      },
    },
    {
      id: "payment",
      start: 88.5,
      end: 95.4,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        resetCollectorStage(context);
        const world = context.worlds.collector;
        world.setChosenVisible(true);
        world.setParcelVisible(false);
        world.setPhone(false);
        world.setSafeOpen(1);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        world.setPhone(localTime > 0.35);
        const seated = seatedCollectorPose(time + 3, false, 0.08);
        seated.neck = [0.14, 0.06, 0];
        seated.armR = [-0.7, 0.14, 0.3];
        seated.armL = [-0.78, -0.18, -0.25];
        applyPose(world.collector.figure, seated);
        if (localTime > 4.6) world.collector.setSmile(false);
        applyPose(world.zhang.figure, mixPose(standingAtRest(time + 1.4), {
          neck: [0.14, 0.05, 0],
          armR: [-0.95, 0.02, 0.08],
          armL: [0.02, -0.02, 0.06],
        }, smooth(clamp01(localTime / 1.5))));
        const up = smooth(clamp01((localTime - 0.7) / 3.8));
        setCamera(
          context.camera,
          [2.0 + 0.8 * up, 1.7 - 0.25 * up, 1.0 + 1.0 * up],
          [0.15, 0.95 + 0.2 * up, 1.25 + 0.7 * up],
          39 + 1 * up,
          0.005,
        );
      },
    },
    {
      id: "farewell",
      start: 95.4,
      end: 100.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.collector.group);
        setBackdrop("room");
        resetCollectorStage(context);
        const world = context.worlds.collector;
        world.setChosenVisible(true);
        world.setParcelVisible(false);
        world.setPhone(true);
        world.collector.setSmile(false);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.collector;
        world.update(time, localTime);
        const seated = seatedCollectorPose(time + 4, false, 0);
        seated.neck = [0.02, 0.08, 0];
        seated.armR = [-0.56, 0.12, 0.3];
        seated.armL = [-0.62, -0.12, -0.25];
        applyPose(world.collector.figure, seated);
        const pose = standingAtRest(time + 2);
        pose.neck = [0.03, 0.02, 0];
        pose.armR = [-0.1, 0.06, -0.08];
        pose.armL = [-0.06, -0.04, 0.06];
        applyPose(world.zhang.figure, pose);
        const push = smooth(clamp01(localTime / 5));
        setCamera(
          context.camera,
          [2.7 - 0.2 * push, 1.38, 2.25 - 0.35 * push],
          [0.0, 1.28, -0.08 - 0.12 * push],
          38 - 2 * push,
          0.005,
        );
      },
    },
    {
      id: "departure",
      start: 100.5,
      end: 107.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.hutong.group);
        setBackdrop("night");
        const world = context.worlds.hutong;
        world.setMode("night");
        world.setDoorOpen(1);
        world.setCase(true);
        world.zhang.figure.root.visible = true;
        world.zhang.setUniform();
        world.zhang.figure.root.position.set(-0.1, 0, 1.7);
        world.zhang.figure.root.rotation.set(0, Math.PI, 0);
        world.collector.figure.root.visible = true;
        world.collector.figure.root.position.set(0.2, 0, 4.3);
        world.collector.figure.root.rotation.set(0, Math.PI, 0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.hutong;
        const t = localTime;
        const walkT = smooth(clamp01((t - 0.2) / 6.4));
        const zhang = world.zhang;
        zhang.figure.root.visible = true;
        zhang.figure.root.position.set(-0.1 + Math.sin(walkT * 1.7) * 0.12, 0, lerp(1.65, -3.0, walkT));
        zhang.figure.root.rotation.set(0, Math.PI, 0);
        const pose = walkingPose(time + 0.9, 1.05);
        pose.armL = [0.02 + Math.sin(time * 1.1) * 0.025, 0, 0.1];
        if (t > 4.1) pose.neck = [0.02, -0.4 * smooth(clamp01((t - 4.1) / 1.3)), 0];
        zhang.pose(pose);
        const close = smooth(clamp01((t - 1.2) / 1.8));
        world.setDoorOpen(1 - close);
        if (t > 2.6) world.collector.figure.root.visible = false;
        else {
          world.collector.figure.root.visible = true;
          applyPose(world.collector.figure, {
            hips: [0, 0.04, 0],
            neck: [0.03, -0.05, 0],
            armR: [-0.12, 0.08, -0.1],
            armL: [-0.06, -0.04, 0.08],
            legR: [0, 0, 0.02],
            legL: [0, 0, -0.02],
          });
        }
        world.update(time, localTime);
        const push = smooth(clamp01(t / 6.8));
        setCamera(
          context.camera,
          [2.35 - 0.4 * push, 1.28 + 0.08 * push, -5.6 + 0.4 * push],
          [0, 1.36, lerp(0.6, -1.1, push)],
          37 + 1 * push,
          0.006 * Math.sin(localTime * 0.25),
        );
      },
    },
    {
      id: "workshop-wide",
      start: 107.5,
      end: 120.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.workshop.group);
        setBackdrop("workshop");
        resetWorkshopStage(context);
        const world = context.worlds.workshop;
        world.zhang.figure.root.position.set(6.5, 0, 4.5);
        world.zhang.figure.root.rotation.set(0, -1.9, 0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.workshop;
        const t = localTime;
        const p = smooth(clamp01((t - 0.2) / 5.3));
        world.zhang.figure.root.position.set(lerp(6.5, -0.15, p), 0, lerp(4.5, 2.3, p));
        if (t < 5.4) {
          world.zhang.figure.root.rotation.y = -1.9 + 0.55 * p;
          world.zhang.pose(walkingPose(time + 2, 1.18));
        } else {
          const turn = smooth(clamp01((t - 5.4) / 1.7));
          world.zhang.figure.root.rotation.y = lerp(-1.35, Math.PI, turn);
          const reach = smooth(clamp01((t - 7.4) / 2.0));
          world.zhang.pose(
            mixPose(standingAtRest(time + 1), {
              neck: [0.12, 0.1, 0],
              armR: [-0.34, 0.16, -0.05],
              armL: [-0.5, -0.12, 0.1],
            }, reach),
          );
        }
        if (t > 8.6) {
          world.zhang.pose(
            mixPose(workbenchPose(time, 0.55), {
              hips: [-0.02, 0, 0],
              neck: [0.24, -0.1, 0],
              armR: [-0.58, 0.16, -0.06],
              armL: [-0.75, -0.08, -0.12],
            }, smooth(clamp01((t - 8.6) / 1.5))),
          );
        }
        if (t > 11.0) world.setCaseOpen(true);
        if (t > 12.4) world.setMachining(true);
        world.update(time);
        const push = smooth(clamp01(localTime / 13));
        setCamera(
          context.camera,
          [6.3 - 2.7 * push, 2.05 - 0.34 * push, 6.4 - 1.8 * push],
          [0.0 + 0.1 * push, 1.2, 0.7],
          43 - 6 * push,
          0.006 * Math.sin(time * 0.2),
        );
      },
    },
    {
      id: "lathe-macro",
      start: 120.5,
      end: 133,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.workshop.group);
        setBackdrop("workshop");
        resetWorkshopStage(context);
        const world = context.worlds.workshop;
        world.zhang.figure.root.visible = false;
        world.setMachining(true);
        world.setCaseOpen(true);
        world.machineGlass.visible = false;
      },
      leave: ({ context }) => {
        context.worlds.workshop.machineGlass.visible = true;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.workshop;
        world.update(time);
        const push = smooth(clamp01(localTime / 12));
        setCamera(
          context.camera,
          [1.7 - 0.2 * push, 1.55 + 0.03 * Math.sin(localTime * 0.5), 3.5 - 0.2 * push],
          [-1.15 - 0.1 * push, 1.08 - 0.03 * push, 0.55],
          38 - 3 * push,
          0.004 * Math.sin(localTime * 1.6),
        );
        cameraShake(context.camera, time, 0.003, 3);
      },
    },
    {
      id: "segments",
      start: 133,
      end: 144.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.workshop.group);
        setBackdrop("workshop");
        resetWorkshopStage(context);
        const world = context.worlds.workshop;
        world.zhang.figure.root.position.set(3.15, 0, 2.62);
        world.zhang.figure.root.rotation.set(0, Math.PI, 0);
        world.setMachining(true);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.workshop;
        if (localTime > 6.3) world.setMachining(false);
        const pieces = Math.floor(smooth(clamp01((localTime - 1.2) / 6.0)) * 36);
        world.setPieces(pieces);
        if (localTime > 8.1) world.setWorkpieces(false);
        applyPose(
          world.zhang.figure,
          mixPose(workbenchPose(time + 1.3, 0.7), {
            neck: [0.26, 0.04, 0],
            armR: [-0.93, 0.12, 0.2],
            armL: [-0.88, -0.14, -0.18],
          }, smooth(clamp01(localTime / 2.5))),
        );
        world.update(time);
        const push = smooth(clamp01(localTime / 11.5));
        setCamera(
          context.camera,
          [5.25 - 0.35 * push, 1.72 - 0.08 * push, 0.05 + 0.2 * push],
          [3.03, 1.04, 1.5],
          40 - 3 * push,
          0.005 * Math.sin(localTime * 0.3),
        );
      },
    },
    {
      id: "workshop-clean",
      start: 144.5,
      end: 154,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.workshop.group);
        setBackdrop("workshop");
        resetWorkshopStage(context);
        const world = context.worlds.workshop;
        world.zhang.figure.root.position.set(3.0, 0, 2.5);
        world.zhang.figure.root.rotation.set(0, Math.PI, 0);
        world.setPieces(36);
        world.setWorkpieces(false);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.workshop;
        world.update(time);
        if (localTime > 3.2) world.setDustVial(true);
        const pose = workbenchPose(time + 2, 0.65);
        pose.neck = [0.22, 0.02, 0];
        pose.armR = [-0.96, 0.1, 0.2];
        pose.armL = [-0.86, -0.14, -0.2];
        pose.lift = Math.sin(time * 1.2) * 0.15 - 0.08;
        applyPose(world.zhang.figure, pose);
        const push = smooth(clamp01(localTime / 9.5));
        setCamera(
          context.camera,
          [5.0 - 0.3 * push, 1.55 - 0.04 * push, 0.95 - 0.15 * push],
          [3.02, 1.0, 1.5],
          38 - 3 * push,
          0.006,
        );
      },
    },
    {
      id: "stairwell",
      start: 154,
      end: 165,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.position.set(0, 2.55, -8.4);
        world.zhang.figure.root.rotation.set(0, 0.04, 0);
        world.setDoorOpen(0);
        world.setStairsActive(true);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        const t = localTime;
        world.zhang.figure.root.visible = t < 8.2;
        const p = smooth(clamp01((t - 0.4) / 4.2));
        world.zhang.figure.root.position.set(0, lerp(2.52, 0.05, p), lerp(-8.35, -4.9, p));
        world.zhang.figure.root.rotation.set(0, 0.03, 0);
        if (t < 4.7) {
          const pose = walkingPose(time + 1.2, 1.1);
          pose.armR = [-0.72 + Math.sin(time * 1.2) * 0.03, 0.08, -0.35];
          pose.neck = [0.15, 0.05, 0];
          world.zhang.pose(pose);
        } else if (t < 6.5) {
          world.zhang.pose(
            mixPose(standingAtRest(time + 0.5), {
              neck: [0.12, 0.18, 0],
              armR: [-1.15, 0.18, 0.1],
              armL: [-0.1, -0.03, 0.07],
            }, smooth(clamp01((t - 4.7) / 1.2))),
          );
        } else if (t < 8.2) {
          const move = smooth(clamp01((t - 6.5) / 1.6));
          world.zhang.figure.root.position.set(0, 0, lerp(-4.9, -3.7, move));
          world.zhang.pose(walkingPose(time + 0.8, 1.0));
        }
        world.setDoorOpen(smooth(clamp01((t - 5.6) / 1.5)));
        world.setStairsActive(true);
        world.update(time, localTime);
        const push = smooth(clamp01(t / 10));
        setCamera(
          context.camera,
          [0.75, 2.9 - 0.65 * push, -8.9 + 1.5 * push],
          [0, lerp(1.35, 0.8, push), lerp(-5.0, -4.25, push)],
          46 - 4 * push,
          0.006 * Math.sin(time * 0.35),
        );
      },
    },
    {
      id: "disassembly",
      start: 165,
      end: 178,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.position.set(-0.8, 0, -0.5);
        world.zhang.figure.root.rotation.set(0, 0, 0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        world.update(time, localTime);
        const working: Pose = {
          hips: [-0.035, 0.02, 0],
          neck: [0.25, 0.04, 0],
          armR: [-0.96 + Math.sin(time * 1.7) * 0.03, 0.14, 0.24],
          armL: [-0.9 + Math.cos(time * 1.5) * 0.03, -0.16, -0.21],
          legR: [-0.02, 0, 0.02],
          legL: [0.015, 0, -0.02],
          lift: Math.sin(time * 1.2) * 0.05,
        };
        applyPose(world.zhang.figure, mixPose(standingAtRest(time), working, 0.9));
        const push = smooth(clamp01(localTime / 12));
        setCamera(
          context.camera,
          [1.15 + 0.15 * push, 1.34 - 0.02 * push, 1.42 + 0.25 * push],
          [-0.52, 1.04, 0.05],
          39 - 2 * push,
          0.005 * Math.sin(localTime * 0.4),
        );
      },
    },
    {
      id: "tips",
      start: 178,
      end: 191,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.visible = false;
        world.zhang.figure.root.position.set(-0.55, 0, -0.35);
        world.zhang.figure.root.rotation.set(0, 0, 0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        world.update(time, localTime);
        const push = smooth(clamp01(localTime / 12));
        setCamera(
          context.camera,
          [0.52 - 0.04 * push, 1.29 - 0.02 * push, 1.42 - 0.08 * push],
          [-0.18, 1.0, 0.5],
          34 - 1.5 * push,
          0.004,
        );
      },
    },
    {
      id: "load-aim",
      start: 191,
      end: 203,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.position.set(-0.35, 0, 0.3);
        world.zhang.figure.root.rotation.set(0, 0.2, 0);
        world.gun.root.visible = true;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        world.update(time, localTime);
        const aimAmount = smooth(clamp01((localTime - 8.0) / 2.4));
        const load: Pose = {
          hips: [0.01, 0.04, 0],
          neck: [0.13, -0.16, 0],
          armR: [-0.7, 0.12, 0.15],
          armL: [-0.88, -0.15, -0.34],
          legR: [0.02, 0, 0.04],
          legL: [-0.02, 0, -0.04],
          lift: Math.sin(time * 1.2) * 0.08,
        };
        applyPose(world.zhang.figure, lerpPose(load, aimPose(time, 0, 0.055, 0.15), aimAmount));
        world.zhang.figure.root.rotation.y = lerp(0.1, 0.45, aimAmount);
        const push = smooth(clamp01(localTime / 12));
        setCamera(
          context.camera,
          [2.35 - 0.2 * push, 1.7 + 0.02 * push, -2.4 + 1.6 * push],
          [-0.2, 1.12, 1.0 + 0.15 * push],
          48 - 4 * push,
          0.005 * Math.sin(localTime * 0.4),
        );
      },
    },
    {
      id: "test-shot",
      start: 203,
      end: 215,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.position.set(-0.6, 0, 0.42);
        world.zhang.figure.root.rotation.set(0, 0.58, 0);
        world.gun.root.visible = true;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        world.update(time, localTime);
        const shotLocal = 3.7;
        const recoil = localTime > shotLocal ? Math.max(0, 1 - (localTime - shotLocal) / 0.35) : 0;
        const aimed = aimPose(time, recoil, 0.055, 0.12);
        const lowered: Pose = {
          hips: [0.01, 0.06, 0],
          neck: [0.01, -0.08, 0],
          armR: [-0.22, 0.08, 0.08],
          armL: [-0.18, -0.06, -0.08],
          legR: [0.03, 0, 0.04],
          legL: [-0.03, 0, -0.04],
          lift: Math.sin(time * 1.2) * 0.08,
        };
        const lowerAmount = smooth(clamp01((localTime - 4.8) / 1.4));
        applyPose(world.zhang.figure, lerpPose(aimed, lowered, lowerAmount));
        world.zhang.figure.root.position.x = -0.6 + recoil * 0.016;
        world.setParcelState(localTime > shotLocal + 0.2 ? "holes" : "loaded");
        const push = smooth(clamp01(localTime / 11));
        setCamera(
          context.camera,
          [2.55 - 0.1 * push, 1.8 + 0.02 * push, -2.5 + 0.2 * push],
          [-0.15, 1.1, 1.15 + 0.25 * push],
          51 - 4 * push,
          0.006 * Math.sin(localTime * 0.33),
        );
        cameraShake(context.camera, time, 0.04 * recoil, 5);
      },
    },
    {
      id: "inspect",
      start: 215,
      end: 225.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.visible = false;
        world.setInspection(true);
        world.setParcelState("open");
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        world.update(time, localTime);
        const push = smooth(clamp01(localTime / 9.5));
        setCamera(
          context.camera,
          [0.9 - 0.18 * push, 1.7 - 0.04 * push, 2.35 - 0.2 * push],
          [-0.18, 0.98, 1.02],
          38 - 2 * push,
          0.005,
        );
      },
    },
    {
      id: "basement-leave",
      start: 225.5,
      end: 233.5,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.basement.group);
        setBackdrop("basement");
        resetBasementStage(context);
        const world = context.worlds.basement;
        world.zhang.figure.root.position.set(-0.1, 0, 0.1);
        world.zhang.figure.root.rotation.set(0, 0.12, 0);
        world.setParcelState("open");
        world.setInspection(false);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.basement;
        const t = localTime;
        world.zhang.figure.root.visible = t < 5.8;
        if (t < 2.4) {
          applyPose(
            world.zhang.figure,
            mixPose(workbenchPose(time + 1.2, 0.55), {
              hips: [-0.01, 0.02, 0],
              neck: [0.13, 0.03, 0],
              armR: [-0.68, 0.1, 0.16],
              armL: [-0.56, -0.12, -0.14],
            }, 0.8),
          );
        } else if (t < 5.8) {
          const p = smooth(clamp01((t - 2.4) / 3.2));
          world.zhang.figure.root.position.set(lerp(-0.1, -0.35, p), 0, lerp(0.1, -3.5, p));
          world.zhang.figure.root.rotation.y = lerp(0.12, Math.PI - 0.04, smooth(clamp01((t - 2.4) / 1.2)));
          world.zhang.pose(walkingPose(time + 0.4, 1.0));
        }
        const open = smooth(clamp01((t - 1.8) / 1.4));
        world.setDoorOpen(open);
        if (t > 2.6) world.setBulletCount(0);
        if (t > 4.3) world.setLights(Math.max(0.06, 1 - smooth(clamp01((t - 4.3) / 3.2)) * 0.94));
        world.update(time, localTime);
        const push = smooth(clamp01(localTime / 8));
        setCamera(
          context.camera,
          [2.1 - 0.15 * push, 1.6 + 0.02 * push, 2.4 - 0.15 * push],
          [-0.3, 1.15, lerp(-0.5, -1.7, push)],
          47 - 3 * push,
          0.006 * Math.sin(localTime * 0.31),
        );
      },
    },
    {
      id: "orbit-reveal",
      start: 233.5,
      end: 245,
      enter: ({ context }) => {
        const world = enterSpace(context, false);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 11.5));
        setCamera(
          context.camera,
          [14 - 6 * push, 8.5 - 2.6 * push, 16 - 7.5 * push],
          [-2.8 + 1.2 * push, -6 + 4.8 * push, -73 - 2 * push],
          47 - 8 * push,
          0.007 * Math.sin(localTime * 0.14),
        );
      },
    },
    {
      id: "zhang-float",
      start: 245,
      end: 256,
      enter: ({ context }) => {
        const world = enterSpace(context, false);
        world.zhang.figure.root.visible = true;
        world.zhang.setSuit("clear");
        world.zhang.figure.root.position.set(0.03, 0.42, 0.05);
        world.zhang.figure.root.rotation.set(0.05, 0.08, 0.04);
      },
      update: ({ context, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const zhang = world.zhang;
        zhang.figure.root.position.set(
          0.03 + Math.sin(time * 0.31) * 0.05,
          0.42 + Math.sin(time * 0.27 + 0.8) * 0.035,
          0.05,
        );
        zhang.figure.root.rotation.set(0.045, 0.08 + Math.sin(time * 0.23) * 0.04, 0.035);
        const pose = floatingWorkPose(time, undefined, 1);
        pose.neck = [0.09, 0.18 + Math.sin(time * 0.16) * 0.06, -0.03];
        pose.armR = [-0.45 + Math.sin(time * 0.27) * 0.04, 0.18, 0.3];
        pose.armL = [-0.72 + Math.sin(time * 0.22 + 1) * 0.04, -0.16, -0.26];
        applyPose(zhang.figure, pose);
        const t = smooth(clamp01((time - 245) / 11));
        setCamera(
          context.camera,
          [1.7 + 0.35 * t, 1.82 - 0.1 * t, 4.15 - 0.6 * t],
          [-0.02 + 0.05 * t, 1.3 + 0.02 * t, -0.15],
          34 - 2 * t,
          0.012 * Math.sin(time * 0.25),
        );
      },
    },
    {
      id: "station-exit",
      start: 256,
      end: 267.5,
      enter: ({ context }) => {
        const world = enterSpace(context, false);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 11.5));
        setCamera(
          context.camera,
          [5.0 - 1.2 * push, 2.4 - 0.9 * push, -60.5 - 2.5 * push],
          [0.5, 1.1 - 0.35 * push, -81.0],
          36 - 4 * push,
          0.007 * Math.sin(localTime * 0.25),
        );
      },
    },
    {
      id: "airlock-exit",
      start: 267.5,
      end: 272,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 4.5));
        setCamera(
          context.camera,
          [4.7 - 0.7 * push, 2.2 + 0.55 * push, -62.5 - 1.5 * push],
          [0.5, 0.9 + 0.7 * push, -80.5],
          38 - 3 * push,
          0.007 * Math.sin(localTime * 0.3),
        );
      },
    },
    {
      id: "egress",
      start: 272,
      end: 279,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 7));
        setCamera(
          context.camera,
          [2.2 - 0.8 * push, 5.6 - 0.8 * push, -26 - 2 * push],
          [0.3, 4.1 - 0.6 * push, -48 - 6 * push],
          43 - 5 * push,
          0.008 * Math.sin(localTime * 0.22),
        );
      },
    },
    {
      id: "lineup",
      start: 279,
      end: 291,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 12));
        setCamera(
          context.camera,
          [3.6 - 1.35 * push, 2.9 + 1.0 * push, -33.8 - 2.0 * push],
          [0.15, 4.55, -46.4],
          38 - 3 * push,
          0.005 * Math.sin(localTime * 0.35),
        );
        cameraShake(context.camera, time, 0.0012, 2);
      },
    },
    {
      id: "weapon-prep",
      start: 291,
      end: 302,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = true;
        world.zhang.setSuit("clear");
        world.zhang.figure.root.position.set(0.02, 0.35, 0.02);
        world.zhang.figure.root.rotation.set(0.03, 0, 0.02);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const zhang = world.zhang;
        const gloveOff = time >= 293.1;
        zhang.setSuit(gloveOff ? "bare" : "clear");
        world.setGunVisible(time >= 293.5);
        world.setScopeVisible(time >= 295.1);
        const turn = smooth(clamp01((time - 298.2) / 1.8));
        zhang.figure.root.rotation.y = Math.PI * turn;
        zhang.figure.root.position.set(0.02 + Math.sin(time * 0.4) * 0.025, 0.35 + Math.sin(time * 0.3) * 0.03, 0.02);
        const working: Pose = {
          hips: [-0.12, 0.03, 0.02],
          neck: [0.18, -0.12, 0.02],
          armR: [-0.6, 0.16, 0.3],
          armL: [-0.85, -0.2, -0.42],
          legR: [-0.5, 0.12, 0.08],
          legL: [-0.37, -0.1, -0.1],
          lift: 1.1 + Math.sin(time * 0.4) * 0.15,
        };
        const aim = aimPose(time, 0, 0.06, 0);
        aim.lift = 1.0;
        applyPose(zhang.figure, lerpPose(working, aim, turn));
        const push = smooth(clamp01(localTime / 11));
        setCamera(
          context.camera,
          [-2.3 + 0.15 * push, 1.6, 3.8 - 0.25 * push],
          [0.0, 1.26, -0.28],
          42 - 2 * push,
          0.007 * Math.sin(localTime * 0.3),
        );
      },
    },
    {
      id: "firing",
      start: 302,
      end: 309,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = true;
        world.zhang.setSuit("bare");
        world.zhang.figure.root.position.set(0, 0.3, 0);
        world.zhang.figure.root.rotation.set(0.03, Math.PI, 0);
        world.setGunVisible(true);
        world.setScopeVisible(true);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const shake = fireShake(time);
        const aim = aimPose(time, shake, 0.06, 0);
        aim.hips = [0.03, 0.01, -0.008];
        aim.lift = 1.05;
        applyPose(world.zhang.figure, aim);
        world.zhang.figure.root.position.set(
          0.02 + Math.sin(time * 0.28) * 0.035 - shake * 0.02,
          0.3 + Math.sin(time * 0.23) * 0.025,
          shake * 0.035,
        );
        const push = smooth(clamp01(localTime / 6.8));
        setCamera(
          context.camera,
          [2.65 - 0.25 * push, 1.72 - 0.04 * push, 3.2 - 0.2 * push],
          [0.0, 1.28, -0.55 - 0.2 * push],
          39 - 2 * push,
          0.004 * Math.sin(localTime * 0.28),
        );
        cameraShake(context.camera, time, 0.04 * shake, 4);
      },
    },
    {
      id: "bullet-flight",
      start: 309,
      end: 311.2,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
        world.setBulletsVisible(true);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 2.2));
        setCamera(
          context.camera,
          [5.4 - 0.4 * push, 4.7 - 0.1 * push, -10 - 1.2 * push],
          [-0.2, 3.35, -29 - 1.0 * push],
          36 - 2 * push,
          -0.02 + 0.008 * push,
        );
      },
    },
    {
      id: "scope",
      start: 311.2,
      end: 315,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const breathX = Math.sin(time * 0.9) * 0.025;
        const breathY = Math.cos(time * 0.7) * 0.012;
        setCamera(
          context.camera,
          [0.12 + breathX, 1.73 + breathY, 0.62],
          [0.2 + breathX * 0.4, 4.64 + breathY, -46],
          7.3,
          0.002 * Math.sin(time * 0.4),
        );
      },
    },
    {
      id: "impact-reaction",
      start: 315,
      end: 320.5,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const push = smooth(clamp01(localTime / 5.5));
        setCamera(
          context.camera,
          [0.35 + 0.1 * push, 4.4 - 0.06 * push, -39.4 - 1.4 * push],
          [0.1, 4.7, -46.2 - 0.8 * push],
          34 - 2 * push,
          0.006 * Math.sin(localTime * 0.7),
        );
        cameraShake(context.camera, time, 0.006, 6);
      },
    },
    {
      id: "victim-close",
      start: 320.5,
      end: 326,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.zhang.figure.root.visible = false;
        world.setSoloVictim(1);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const focus = world.getVictimPoint(1);
        const pull = smooth(clamp01(localTime / 5.5));
        const cameraPos = focus.clone().add(new THREE.Vector3(
          0.85 - 0.06 * pull + Math.sin(time * 0.5) * 0.04,
          0.15 + 0.04 * pull,
          3.15 - 0.35 * pull,
        ));
        setCamera(
          context.camera,
          [cameraPos.x, cameraPos.y, cameraPos.z],
          [focus.x, focus.y + 0.02, focus.z],
          30 - 1 * pull,
          -0.018 + 0.012 * pull,
        );
        cameraShake(context.camera, time, 0.0035, 12);
      },
    },
    {
      id: "retreat",
      start: 326,
      end: 337,
      enter: ({ context }) => {
        const world = enterSpace(context, true);
        world.setSoloVictim(null);
        world.zhang.figure.root.visible = true;
        world.zhang.setSuit("bare");
        world.zhang.figure.root.position.set(-0.2, 0.35, 0.0);
        world.zhang.figure.root.rotation.set(0.02, 0.1, 0.02);
        world.setGunVisible(true);
        world.setScopeVisible(true);
        world.setZhangJets(true);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.space;
        world.update(time);
        const t = clamp01(localTime / 11);
        const drift = smooth(t);
        const zhang = world.zhang;
        zhang.figure.root.position.set(
          -0.2 + Math.sin(t * 3.2) * 0.12,
          0.35 + Math.sin(t * 2.4) * 0.04,
          drift * 1.1,
        );
        zhang.figure.root.rotation.set(0.03 + Math.sin(t * 2) * 0.02, 0.1 + drift * 0.16, 0.02 + Math.sin(t * 1.5) * 0.03);
        const base = floatingWorkPose(time + 1.3);
        base.neck = [0.15, 0.08, 0.02];
        base.armR = [-0.27, -0.04, 0.25];
        base.armL = [-0.19, 0.08, -0.24];
        applyPose(zhang.figure, base);
        const pull = smooth(clamp01(t));
        setCamera(
          context.camera,
          [1.9 + 0.8 * pull, 1.58 + 0.22 * pull, 3.1 + 1.1 * pull],
          [0.0, 1.32 - 0.18 * pull, 0.5 + 0.55 * pull],
          42 + 4 * pull,
          -0.012 * pull,
        );
        cameraShake(context.camera, time, 0.0025, 17);
      },
    },
    {
      id: "base",
      start: 337,
      end: 347,
      enter: ({ context }) => {
        onlyWorld(context, context.worlds.base.group);
        setBackdrop("base");
        const world = context.worlds.base;
        world.zhang.figure.root.visible = true;
        world.zhang.setUniform();
        world.zhang.figure.root.position.set(-1.1, 0, -0.3);
        world.zhang.figure.root.rotation.set(0, Math.PI, 0);
      },
      update: ({ context, localTime, time }) => {
        const world = context.worlds.base;
        world.update(time, localTime);
        const pose = standingAtRest(time + 0.4);
        pose.neck = [0.03 + Math.sin(time * 0.21) * 0.01, 0.03, 0];
        pose.armR = [0.04, 0.02, -0.07];
        pose.armL = [-0.03, -0.02, 0.06];
        applyPose(world.zhang.figure, pose);
        const t = smooth(clamp01(localTime / 10));
        setCamera(
          context.camera,
          [1.65 - 0.6 * t, 1.66 - 0.02 * t, 2.8 - 0.7 * t],
          [-0.75 - 0.05 * t, 1.36, -1.65],
          54 - 7 * t,
          0.005 * Math.sin(localTime * 0.2),
        );
      },
    },
    {
      id: "end-card",
      start: 347,
      end: 356,
      enter: ({ context }) => {
        for (const world of allWorlds(context)) world.visible = false;
        setBackdrop("black");
      },
      update: ({ context }) => {
        context.camera.position.set(0, 1.5, 4);
        context.camera.lookAt(0, 1.2, 0);
      },
    },
  ];

  return shots;
}

function frameHutong(context: FilmContext, localTime: number): void {
  const t = Math.min(1, Math.max(0, localTime / 12));
  const e = 1 - Math.pow(1 - t, 2.6);
  setCamera(
    context.camera,
    [2.1 - 0.7 * e + Math.sin(localTime * 0.25) * 0.035, 4.85 - 3.35 * e, -14.6 + 11.3 * e],
    [-0.18 + 0.12 * Math.sin(localTime * 0.15), 1.85 - 0.25 * e, -2.0 + 3.0 * e],
    37 + e * 4,
    -0.012 + e * 0.018,
  );
}

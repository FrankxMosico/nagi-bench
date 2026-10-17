import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import { applyPose, float as floatPose, type Figure } from "@agentbench/voxel-kit";
import type { World } from "./sets";
import { applyStanding, getSuitTextures } from "./figures";
import { FIRE_TIMES, MAGAZINE_TIMES, SHOT } from "./timeline";

export interface FilmContext {
  world: World;
}

type S = Shot<FilmContext>;

function enter(world: World, name: Parameters<World["show"]>[0], bg: number, fog = 0): void {
  world.show(name, bg, fog);
}

function camera(world: World, pos: [number, number, number], target: [number, number, number], fov: number, near = 0.01): void {
  world.setCamera(new THREE.Vector3(...pos), new THREE.Vector3(...target), fov, near);
}

function setSuit(world: World, mode: "opaque" | "clear" | "clearNoGlove"): void {
  const suit = getSuitTextures();
  const next = mode === "opaque" ? suit.opaque : mode === "clear" ? suit.clear : suit.clearNoGlove;
  if ((world.cast.zhangSuit.clothing.head.material as THREE.MeshStandardMaterial).map !== next) world.cast.zhangSuit.setClothes(next);
}

function hideIron(world: World, visible: boolean): void {
  const p = world.props.hutongInt;
  p.ironGroup.visible = visible;
  p.velvet.visible = visible;
  for (const iron of p.irons) iron.visible = visible;
  if (p.singleRock) p.singleRock.visible = !visible;
}

function freezePhoto(world: World, global: number): void {
  // The photo set computes its own state from absolute time; this simply ensures
  // seeking into the middle of the sequence is deterministic.
  const group = world.sets.photo as THREE.Group & {
    update?: (t: number, local: number, global: number, view: "lineup" | "scope" | "impact") => void;
  };
  void group;
  void global;
}

export const shots: S[] = [
  {
    id: "01-cold-open",
    start: SHOT.cold[0],
    end: SHOT.cold[1],
    enter: ({ context }) => {
      enter(context.world, "cold", 0x04060a, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.cold as any).update(time, localTime);
    },
  },
  {
    id: "02-courtyard",
    start: SHOT.hutongExt[0],
    end: SHOT.hutongExt[1],
    enter: ({ context }) => {
      enter(context.world, "hutongExt", 0x0b0d13, 0.022);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.hutongExt as any).update(time, localTime);
    },
  },
  {
    id: "03-museum",
    start: SHOT.hutongWide[0],
    end: SHOT.hutongWide[1],
    enter: ({ context }) => {
      enter(context.world, "hutongInt", 0x100d09, 0.018);
      const w = context.world;
      w.cast.zhou.root.position.set(5.18, 0, -1.58);
      w.cast.zhou.root.rotation.y = -Math.PI / 2;
      w.cast.zhang.root.position.set(0.2, 0, 6.15);
      w.cast.zhang.root.rotation.y = 0;
      hideIron(w, false);
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      const p = localTime / 16;
      const e = p * p * (3 - 2 * p);
      w.props.hutongInt.updateActors(time, localTime, "wide");
      camera(
        w,
        [2.15 - p * 0.22, 1.74 - p * 0.05, 5.55 - p * 0.35],
        [-1.05 + e * 0.72 * 5.15, 1.35 + e * 0.72 * 0.02, -4.9 + e * 0.72 * 2.8],
        58,
      );
    },
  },
  {
    id: "04-recognition",
    start: SHOT.recognition[0],
    end: SHOT.recognition[1],
    enter: ({ context }) => {
      enter(context.world, "hutongInt", 0x100d09, 0.018);
      const w = context.world;
      w.cast.zhang.root.position.set(1.2, 0, 2.3);
      w.cast.zhang.root.rotation.y = 2.17;
      hideIron(w, false);
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      const p = localTime / 14;
      w.props.hutongInt.updateActors(time, localTime, "talk");
      camera(w, [2.8 - p * 0.28, 1.63, 0.55 - p * 0.24], [5.06, 1.36, -1.55], 37);
    },
  },
  {
    id: "05-the-ask",
    start: SHOT.ask[0],
    end: SHOT.ask[1],
    enter: ({ context }) => {
      enter(context.world, "hutongInt", 0x100d09, 0.018);
      const w = context.world;
      w.cast.zhang.root.position.set(1.2, 0, 2.3);
      w.cast.zhang.root.rotation.y = 2.17;
      hideIron(w, false);
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      const p = localTime / 20;
      w.props.hutongInt.updateActors(time, localTime, "ask");
      camera(w, [4.25 - p * 0.2, 1.58, 2.75 - p * 0.16], [1.2, 1.48, 2.3], 37);
    },
  },
  {
    id: "06-iron-meteorites",
    start: SHOT.iron[0],
    end: SHOT.iron[1],
    enter: ({ context }) => {
      enter(context.world, "hutongInt", 0x100d09, 0.018);
      const w = context.world;
      w.cast.zhang.root.position.set(1.2, 0, 2.3);
      w.cast.zhang.root.rotation.y = 2.17;
      hideIron(w, false);
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      const p = localTime / 28;
      w.props.hutongInt.updateActors(time, localTime, "iron");
      hideIron(w, localTime > 6.2);
      camera(w, [3.75, 1.16, -0.42], [4.1, 1.02, -2.1], 22);
    },
  },
  {
    id: "07-departure",
    start: SHOT.depart[0],
    end: SHOT.depart[1],
    enter: ({ context }) => {
      enter(context.world, "hutongInt", 0x100d09, 0.018);
      const w = context.world;
      w.cast.zhang.root.position.set(3.3, 0, 0.4);
      w.cast.zhang.root.rotation.y = 2.56;
      hideIron(w, true);
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      w.props.hutongInt.updateActors(time, localTime, "depart");
      camera(w, [4.55, 1.5, -0.1], [0.25, 1.35, 6.2], 46);
    },
  },
  {
    id: "08-broadcast-earth",
    start: SHOT.broadcastEarth[0],
    end: SHOT.broadcastEarth[1],
    enter: ({ context }) => {
      enter(context.world, "spaceMontage", 0x04060a, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.spaceMontage as any).update(time, localTime, "earth");
    },
  },
  {
    id: "09-broadcast-elevator",
    start: SHOT.broadcastElevator[0],
    end: SHOT.broadcastElevator[1],
    enter: ({ context }) => {
      enter(context.world, "spaceMontage", 0x04060a, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.spaceMontage as any).update(time, localTime, "elevator");
    },
  },
  {
    id: "10-broadcast-yard",
    start: SHOT.broadcastYard[0],
    end: SHOT.broadcastYard[1],
    enter: ({ context }) => {
      enter(context.world, "spaceMontage", 0x04060a, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.spaceMontage as any).update(time, localTime, "yard");
    },
  },
  {
    id: "11a-appointment-wide",
    start: SHOT.appointment[0],
    end: 147,
    enter: ({ context }) => {
      enter(context.world, "appointment", 0x070b10, 0.012);
      const w = context.world;
      w.cast.zhang.root.position.set(-1.5, 0, -3.1);
      w.cast.zhang.root.rotation.y = 1.1;
      w.cast.chang.root.position.set(1.9, 0, -0.5);
      w.cast.chang.root.rotation.y = -0.55;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.appointment as any).update(time, localTime);
      const w = context.world;
      const p = localTime / 7;
      camera(w, [1.7 - p * 0.5, 1.75, 4.2 - p * 0.4], [0.1, 1.48, -3.2], 52);
    },
  },
  {
    id: "11b-appointment-beihai",
    start: 147,
    end: 153,
    enter: ({ context }) => {
      enter(context.world, "appointment", 0x070b10, 0.012);
      const w = context.world;
      w.cast.zhang.root.position.set(-1.5, 0, -3.1);
      w.cast.zhang.root.rotation.y = 1.1;
      w.cast.chang.root.position.set(1.9, 0, -0.5);
      w.cast.chang.root.rotation.y = -1.25;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.appointment as any).update(time, localTime);
      const w = context.world;
      const p = localTime / 6;
      camera(w, [-0.25 + p * 0.1, 1.6, -1.3 + p * 0.1], [-1.5, 1.47, -3.1], 38);
    },
  },
  {
    id: "11c-appointment-chang",
    start: 153,
    end: 156.5,
    enter: ({ context }) => {
      enter(context.world, "appointment", 0x070b10, 0.012);
      const w = context.world;
      w.cast.zhang.root.position.set(-1.5, 0, -3.1);
      w.cast.zhang.root.rotation.y = 1.1;
      w.cast.chang.root.position.set(1.9, 0, -0.5);
      w.cast.chang.root.rotation.y = -1.25;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.appointment as any).update(time, localTime);
      const w = context.world;
      const p = localTime / 3.5;
      camera(w, [0.1 - p * 0.04, 1.66, -2.1 - p * 0.1], [1.9, 1.47, -0.5], 40);
    },
  },
  {
    id: "11d-appointment-answer",
    start: 156.5,
    end: SHOT.appointment[1],
    enter: ({ context }) => {
      enter(context.world, "appointment", 0x070b10, 0.012);
      const w = context.world;
      w.cast.zhang.root.position.set(-1.5, 0, -3.1);
      w.cast.zhang.root.rotation.y = 1.1;
      w.cast.chang.root.position.set(1.9, 0, -0.5);
      w.cast.chang.root.rotation.y = -1.25;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.appointment as any).update(time, localTime);
      const w = context.world;
      const p = localTime / 5.5;
      camera(w, [0.05 + p * 0.25, 1.62, 0.75 + p * 0.2], [-1.5, 1.47, -3.05], 40);
    },
  },
  {
    id: "12-workshop-wide",
    start: SHOT.workshop[0],
    end: 176,
    enter: ({ context }) => {
      enter(context.world, "workshop", 0x111615, 0.012);
      const w = context.world;
      w.cast.zhangWork.root.position.set(1.5, 0, 2.1);
      w.cast.zhangWork.root.rotation.y = 2.0;
      applyStanding(w.cast.zhangWork, 0);
      w.props.basement.gun.visible = false;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.workshop as any).update(time, localTime, false);
    },
  },
  {
    id: "13-workshop-macro",
    start: 176,
    end: SHOT.workshop[1],
    enter: ({ context }) => {
      enter(context.world, "workshop", 0x111615, 0.012);
      const w = context.world;
      w.cast.zhangWork.root.position.set(1.5, 0, 2.1);
      w.cast.zhangWork.root.rotation.y = 2.0;
      applyStanding(w.cast.zhangWork, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.workshop as any).update(time, 14 + localTime, true);
    },
  },
  {
    id: "14-basement-build",
    start: SHOT.basement[0],
    end: 207.5,
    enter: ({ context }) => {
      enter(context.world, "basement", 0x0a0907, 0.02);
      const w = context.world;
      w.cast.zhangWork.root.position.set(0.4, 0, 0.4);
      w.cast.zhangWork.root.rotation.y = Math.PI + 0.16;
      applyStanding(w.cast.zhangWork, 0);
      w.props.basement.gun.visible = false;
      w.props.basement.bundle.visible = true;
      w.props.basement.beefGroup.visible = false;
      w.props.basement.fragGroup.visible = false;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.basement as any).update(time, localTime, time);
    },
  },
  {
    id: "15-basement-test",
    start: 207.5,
    end: SHOT.basement[1],
    enter: ({ context }) => {
      enter(context.world, "basement", 0x0a0907, 0.02);
      const w = context.world;
      w.cast.zhangWork.root.position.set(0.4, 0, 0.4);
      w.cast.zhangWork.root.rotation.y = Math.PI + 0.16;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.basement as any).update(time, localTime, time);
      const recoil = Math.max(0, 1 - Math.abs(time - 210.0) / 0.34) * 0.012;
      context.world.cameraShake(recoil, time);
    },
  },
  {
    id: "16-eva-depart",
    start: SHOT.evaDepart[0],
    end: SHOT.evaDepart[1],
    enter: ({ context }) => {
      enter(context.world, "eva", 0x03060a, 0);
      const w = context.world;
      setSuit(w, "clear");
      const p = w.props.eva;
      p.pistol.visible = false;
      p.scope.visible = false;
      p.glove.visible = false;
      p.thruster.visible = false;
      p.zhangSuit.root.position.set(4.6, 17.5, 14.5);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.eva as any).update(time, localTime, "depart", time);
    },
  },
  {
    id: "17-eva-wait",
    start: SHOT.evaWait[0],
    end: SHOT.evaWait[1],
    enter: ({ context }) => {
      enter(context.world, "eva", 0x03060a, 0);
      const w = context.world;
      setSuit(w, "clear");
      const p = w.props.eva;
      p.pistol.visible = false;
      p.scope.visible = true;
      p.glove.visible = false;
      p.thruster.visible = false;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.eva as any).update(time, localTime, "wait", time);
    },
  },
  {
    id: "18-photo-lineup",
    start: SHOT.aim[0],
    end: 276,
    enter: ({ context }) => {
      enter(context.world, "photo", 0x04070b, 0);
      const w = context.world;
      for (const f of w.cast.photo) {
        const i = w.cast.photo.indexOf(f);
        const frontX = [-1.15, 0, 1.15, -2.55, 2.55];
        const backX = [-2.0, -1.0, 0, 1.0, 2.0];
        const row = i < 5 ? 0 : 1;
        f.root.position.set(i < 5 ? frontX[i]! : backX[i - 5]!, row ? 0.45 : 0.15, -row * 1.7);
        f.root.rotation.set(0, 0, 0);
      }
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.photo as any).update(time, localTime, time, "lineup");
    },
  },
  {
    id: "19-prepare",
    start: 276,
    end: 282,
    enter: ({ context }) => {
      enter(context.world, "eva", 0x03060a, 0);
      const w = context.world;
      setSuit(w, "clear");
      const p = w.props.eva;
      p.pistol.visible = false;
      p.scope.visible = true;
      p.glove.visible = false;
      p.thruster.visible = false;
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      const global = time;
      const p = w.props.eva;
      if (global > 277.2) {
        setSuit(w, "clearNoGlove");
        p.glove.visible = true;
        p.glove.position.set(5.6, 18.3, 16.0);
        p.glove.rotation.set(0.4 + localTime * 0.2, 0.1, 0.2 + localTime * 0.4);
      }
      if (global > 279.2) {
        p.scope.visible = false;
        p.pistol.visible = true;
      }
      (w.sets.eva as any).update(time, localTime, "prep", time);
    },
  },
  {
    id: "20-scope-aim",
    start: SHOT.aim[1] - 4,
    end: SHOT.fire[0],
    enter: ({ context }) => {
      enter(context.world, "photo", 0x04070b, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.photo as any).update(time, localTime, time, "scope");
    },
  },
  {
    id: "21-fire",
    start: SHOT.fire[0],
    end: SHOT.fire[1],
    enter: ({ context }) => {
      enter(context.world, "eva", 0x03060a, 0);
      const w = context.world;
      setSuit(w, "clearNoGlove");
      const p = w.props.eva;
      p.pistol.visible = true;
      p.scope.visible = false;
      p.glove.visible = true;
      p.glove.position.set(6.4, 19.3, 17.5);
      p.glove.rotation.set(0.9, 0.4, 1.1);
    },
    update: ({ context, time, localTime }) => {
      const w = context.world;
      const p = w.props.eva;
      // 30 flashes, each brief and cold.
      let flash = 0;
      for (const t of FIRE_TIMES) {
        if (time >= t && time <= t + 0.075) flash = Math.max(flash, 1 - (time - t) / 0.075);
      }
      p.pistol.visible = time > 286.5;
      p.flash.visible = flash > 0;
      p.flash.material.opacity = flash;
      p.flashLight.intensity = flash * 90;
      const muzzle = new THREE.Vector3();
      p.pistol.getWorldPosition(muzzle);
      p.flash.position.copy(muzzle);
      p.flashLight.position.copy(muzzle);
      // magazines float and snap home
      for (let i = 0; i < p.magazines.length; i++) {
        const mt = MAGAZINE_TIMES[i]!;
        const mag = p.magazines[i]!;
        const dt = time - mt;
        mag.visible = dt > -1.1 && dt < 0.7;
        const p0 = new THREE.Vector3(6.0, 18.4 + i * 0.3, 16.8);
        const p1 = new THREE.Vector3(5.25, 18.05, 15.1);
        const k = Math.min(1, Math.max(0, (dt + 1.1) / 0.8));
        mag.position.lerpVectors(p0, p1, k);
        mag.rotation.y = k * 2.2;
      }
      (w.sets.eva as any).update(time, localTime, "fire", time);
      const shake = flash * 0.012;
      w.cameraShake(shake, time);
    },
  },
  {
    id: "22-impact",
    start: SHOT.impact[0],
    end: SHOT.impact[1],
    enter: ({ context }) => {
      enter(context.world, "photo", 0x04070b, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.photo as any).update(time, localTime, time, "impact");
    },
  },
  {
    id: "23-retreat",
    start: SHOT.retreat[0],
    end: SHOT.retreat[1],
    enter: ({ context }) => {
      enter(context.world, "eva", 0x03060a, 0);
      const w = context.world;
      setSuit(w, "clearNoGlove");
      const p = w.props.eva;
      p.pistol.visible = true;
      p.scope.visible = false;
      p.glove.visible = false;
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.eva as any).update(time, localTime, "retreat", time);
    },
  },
  {
    id: "24-credits",
    start: SHOT.credits[0],
    end: SHOT.credits[1],
    enter: ({ context }) => {
      enter(context.world, "credits", 0x020305, 0);
    },
    update: ({ context, time, localTime }) => {
      (context.world.sets.credits as any).update(time, localTime);
    },
  },
];

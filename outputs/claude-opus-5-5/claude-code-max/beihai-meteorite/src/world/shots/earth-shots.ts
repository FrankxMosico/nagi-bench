import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import { frame, type FilmContext } from "../context";
import { shot, edgeFade, V3, type ShotEnv } from "../shotkit";
import type { PrologueSet } from "../sets/prologue";
import type { HutongSet } from "../sets/hutong";
import type { CollectorSet } from "../sets/collector";
import type { WorkshopSet } from "../sets/workshop";
import type { BasementSet } from "../sets/basement";
import type { CabinSet } from "../sets/cabin";
import type { SpaceSet } from "../sets/space";
import { B, E, P, S } from "../../timeline";
import { easeInOut, lerp, seg, smooth, wobble } from "../util";

export interface EarthSets {
  prologue: PrologueSet;
  hutong: HutongSet;
  collector: CollectorSet;
  workshop: WorkshopSet;
  basement: BasementSet;
  cabin: CabinSet;
  space: SpaceSet;
  black: THREE.Scene;
}

const PROLOGUE_SUN = new THREE.Vector3(-0.83, 0.33, 0.41).normalize();

/** Hand-held breathing for interior coverage. */
function handheld(pos: THREE.Vector3, t: number, amt = 0.006): THREE.Vector3 {
  return pos.clone().add(V3(wobble(t * 0.7, 1) * amt, wobble(t * 0.6, 2) * amt, wobble(t * 0.5, 3) * amt));
}

function warmGrade(e: ShotEnv): void {
  const g = e.ctx.grade;
  g.contrast = 1.06;
  g.saturation = 0.94;
  g.lift.setRGB(0.012, 0.008, 0.012);
  g.gain.setRGB(1.04, 0.99, 0.9);
  g.vignette = 0.55;
  g.grain = 0.04;
  g.bloomStrength = 0.55;
  g.bloomThreshold = 0.85;
  g.toneExposure = 1.15;
}

function coldGrade(e: ShotEnv): void {
  const g = e.ctx.grade;
  g.contrast = 1.1;
  g.saturation = 0.82;
  g.lift.setRGB(0.0, 0.01, 0.02);
  g.gain.setRGB(0.92, 1.0, 1.06);
  g.vignette = 0.6;
  g.grain = 0.045;
  g.bloomStrength = 0.65;
  g.bloomThreshold = 0.8;
  g.toneExposure = 1.1;
}

function bunkerGrade(e: ShotEnv): void {
  const g = e.ctx.grade;
  g.contrast = 1.12;
  g.saturation = 0.78;
  g.lift.setRGB(0.008, 0.01, 0.004);
  g.gain.setRGB(1.05, 1.0, 0.86);
  g.vignette = 0.7;
  g.grain = 0.055;
  g.bloomStrength = 0.6;
  g.bloomThreshold = 0.8;
  g.toneExposure = 1.15;
}

export function earthShots(s: EarthSets): Shot<FilmContext>[] {
  const { prologue, hutong, collector, workshop, basement, cabin, space } = s;

  /* ------------------------------------------------------------ helpers */
  const usePrologue = (e: ShotEnv, earthPos: THREE.Vector3, earthScale: number) => {
    e.ctx.scene = prologue.scene;
    e.ctx.backdrop = space.backdrop.scene;
    space.backdrop.update(e.t, e.ctx.camera, { dir: PROLOGUE_SUN, t: 150 });
    space.backdrop.earth.group.position.copy(earthPos);
    space.backdrop.earth.group.scale.setScalar(earthScale);
    space.backdrop.earth.setSun(PROLOGUE_SUN, 1, new THREE.Color(1, 0.96, 0.9), 0.4);
    space.backdrop.sun.set(PROLOGUE_SUN.clone().multiplyScalar(2600), new THREE.Color(1, 0.95, 0.88), 1, 1);
    prologue.update(e.t, space.backdrop);
  };
  const useCollector = (e: ShotEnv, morning = false) => {
    e.ctx.scene = collector.scene;
    e.ctx.backdrop = null;
    collector.update(e.t, morning);
    warmGrade(e);
  };
  const useWorkshop = (e: ShotEnv) => {
    e.ctx.scene = workshop.scene;
    e.ctx.backdrop = null;
    workshop.update(e.t);
    coldGrade(e);
  };
  const useBasement = (e: ShotEnv) => {
    e.ctx.scene = basement.scene;
    e.ctx.backdrop = null;
    basement.update(e.t);
    bunkerGrade(e);
  };
  const useCabin = (e: ShotEnv) => {
    e.ctx.scene = cabin.scene;
    e.ctx.backdrop = space.backdrop.scene;
    space.backdrop.update(e.t, e.ctx.camera);
    cabin.update(e.t);
    const g = e.ctx.grade;
    g.contrast = 1.05;
    g.saturation = 0.85;
    g.gain.setRGB(0.95, 1.0, 1.05);
    g.vignette = 0.5;
    g.grain = 0.03;
    g.toneExposure = 1.0;
  };
  const cHead = (a: "zhang" | "collector") => collector.head(a === "zhang" ? collector.zhang : collector.collector);

  return [
    /* ===================================================== PROLOGUE */
    shot("p1-iron", 0, 7.5, (e) => {
      usePrologue(e, V3(0, -2600, 0), 0.9);
      const d = 0.4 - easeInOut(e.p) * 0.08;
      const pos = V3(0.09, 1, 0.16).normalize().multiplyScalar(d);
      frame(e.ctx.camera, pos, V3(0, -0.012, 0), 30, V3(0, 0, -1), 0, 0.01, 1e5);
      space.backdrop.update(e.t, e.ctx.camera, { dir: PROLOGUE_SUN, t: 150 });
      space.backdrop.earth.group.position.set(0, -2600, 0);
      space.backdrop.earth.group.scale.setScalar(0.9);
      space.backdrop.earth.setSun(PROLOGUE_SUN, 1, new THREE.Color(1, 0.96, 0.9), 0.4);
      e.ctx.grade.fade = edgeFade(e, 2.2, 0);
      e.ctx.grade.bloomStrength = 0.9;
      e.ctx.grade.vignette = 0.6;
    }),
    shot("p2-fall", 7.5, 15.0, (e) => {
      usePrologue(e, V3(0, -620, 0), 1);
      prologue.meteorite.visible = false;
      const pos = V3(0, 0, 0);
      const look = V3(0.25, -1, -0.08).normalize().multiplyScalar(100);
      frame(e.ctx.camera, pos, look.add(V3(e.p * 2, 0, 0)), 34, V3(0, 0, -1), 0, 0.01, 1e5);
      space.backdrop.update(e.t, e.ctx.camera, { dir: PROLOGUE_SUN, t: 150 });
      space.backdrop.earth.group.position.set(0, -620, 0);
      space.backdrop.earth.group.scale.setScalar(1);
      space.backdrop.earth.setSun(PROLOGUE_SUN, 1, new THREE.Color(1, 0.96, 0.9), 0.4);
      e.ctx.overlay.title = "尘世之外";
      e.ctx.overlay.titleSub = "根据刘慈欣《三体Ⅱ·黑暗森林》片段改编";
      e.ctx.overlay.titleOpacity = smooth(seg(e.t, P.title[0], P.title[0] + 1.4)) * (1 - smooth(seg(e.t, P.title[1] - 0.8, P.title[1])));
      e.ctx.grade.fade = edgeFade(e, 0, 0.9);
      e.ctx.grade.bloomStrength = 0.9;
    }),

    /* ===================================================== HUTONG */
    shot("c01-hutong", 15.0, 22.0, (e) => {
      e.ctx.scene = hutong.scene;
      e.ctx.backdrop = null;
      hutong.update(e.t);
      warmGrade(e);
      e.ctx.grade.toneExposure = 1.05;
      e.ctx.grade.saturation = 1.0;
      const zp = hutong.zhangPos(e.t);
      const pos = V3(0.55, 0.62, lerp(-0.6, -6.6, easeInOut(e.p)));
      frame(e.ctx.camera, handheld(pos, e.t, 0.01), V3(-0.5, 2.5, zp.z - 9), 52, V3(0, 1, 0), 0, 0.05, 200);
      e.ctx.overlay.caption = "北京 · 胡同深处";
      e.ctx.overlay.captionOpacity = smooth(seg(e.t, 15.8, 16.8)) * (1 - smooth(seg(e.t, 19.8, 20.8)));
      e.ctx.grade.fade = edgeFade(e, 0.6, 0);
    }),

    /* ===================================================== COLLECTOR */
    shot("c02a-reveal", 22.0, 25.8, (e) => {
      // three-quarter from the corner: the collector lost in his stone, the bright door beyond
      useCollector(e);
      const pos = V3(-3.0, 1.38, 2.05 - e.p * 0.1);
      frame(e.ctx.camera, handheld(pos, e.t, 0.004), V3(-0.2, 0.98, -1.15), 50, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c02b-lookup", 25.8, 29.8, (e) => {
      useCollector(e);
      const h = cHead("collector");
      const pos = V3(-0.7 - e.p * 0.25, 1.32, 1.35);
      frame(e.ctx.camera, handheld(pos, e.t), h.clone().add(V3(0.0, -0.05, 0)), 38, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c03-tea", 29.8, 34.6, (e) => {
      useCollector(e);
      frame(e.ctx.camera, handheld(V3(0.25, 1.5, 2.45 - e.p * 0.15), e.t), V3(0.0, 0.95, 0.3), 44, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c04-two", 34.6, 41.0, (e) => {
      useCollector(e);
      frame(e.ctx.camera, handheld(V3(0.05 + e.p * 0.15, 1.28, 2.3 - e.p * 0.2), e.t), V3(0, 1.18, 0.3), 36, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c05-zhang", 41.0, 43.4, (e) => {
      useCollector(e);
      const h = cHead("zhang");
      frame(e.ctx.camera, handheld(V3(-1.6, 1.44, 1.05), e.t), h.clone().add(V3(0, -0.05, 0)), 26, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c06-collector", 43.4, 49.6, (e) => {
      useCollector(e);
      const h = cHead("collector");
      const push = smooth(e.p);
      frame(e.ctx.camera, handheld(V3(2.15 - push * 0.2, 1.55, 1.8 - push * 0.1), e.t), h.clone().add(V3(0, -0.06, 0)), lerp(22, 19, push), V3(0, 1, 0), 0, 0.05, 50);
    }),
    /* "they come from beyond the world": a slow push until one stone is a planet */
    shot("c06b-shelves", 49.6, 53.6, (e) => {
      useCollector(e);
      const a = collector.points.alien!;
      const k = easeInOut(e.p);
      const pos = a.clone().add(V3(lerp(0.2, 0.07, k), lerp(0.06, 0.025, k), lerp(0.8, 0.3, k)));
      frame(e.ctx.camera, pos, a.clone().add(V3(0, -0.004, 0)), lerp(30, 25, k), V3(0, 1, 0), 0, 0.02, 50);
      e.ctx.grade.bloomStrength = 0.7;
    }),
    shot("c07-zhang", 53.6, 58.4, (e) => {
      useCollector(e);
      const h = cHead("zhang");
      const push = smooth(e.p);
      frame(e.ctx.camera, handheld(V3(-1.5 + push * 0.1, 1.4, 1.12), e.t), h.clone().add(V3(0, -0.12, 0)), lerp(30, 27, push), V3(0, 1, 0), 0, 0.05, 50);
    }),
    /* "this cup of tea is a meteorite too" */
    shot("c07b-cup", 58.4, 61.7, (e) => {
      useCollector(e);
      // the raised cup in the foreground, his face behind it
      const cupPos = collector.cups[0]!.getWorldPosition(V3());
      const face = cHead("zhang");
      frame(e.ctx.camera, cupPos.clone().add(V3(-0.9, 0.12, 0.66)), cupPos.clone().lerp(face, 0.5), 30, V3(0, 1, 0), 0, 0.02, 50);
    }),
    shot("c07c-zhang", 61.7, 63.6, (e) => {
      useCollector(e);
      const h = cHead("zhang");
      frame(e.ctx.camera, handheld(V3(-1.38, 1.4, 1.1), e.t), h.clone().add(V3(0, -0.1, 0)), 25, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c08-laugh", 63.6, 71.4, (e) => {
      useCollector(e);
      const h = cHead("collector");
      frame(e.ctx.camera, handheld(V3(2.2, 1.55, 1.85), e.t, 0.008), h.clone().add(V3(0, -0.14, 0)), 25, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c09-request", 71.4, 79.3, (e) => {
      useCollector(e);
      frame(e.ctx.camera, handheld(V3(1.95 - e.p * 0.2, 1.52, 2.3), e.t), V3(-0.25, 1.1, 0.2), 38, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c10-cabinet", 79.3, 86.5, (e) => {
      useCollector(e);
      const h = cHead("collector");
      const target = h.clone().lerp(V3(0, 1.2, -2.1), 0.35);
      frame(e.ctx.camera, handheld(V3(1.25, 1.45, 0.55), e.t), target, 40, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c11-velvet", 86.5, 90.0, (e) => {
      useCollector(e);
      const v = collector.points.velvet!;
      frame(e.ctx.camera, V3(0.08, 1.32 - e.p * 0.05, 0.5), v.clone().add(V3(0, 0, 0.02)), 32, V3(0, 1, 0), 0, 0.02, 50);
      e.ctx.grade.bloomStrength = 0.7;
    }),
    shot("c12-price", 90.0, 96.2, (e) => {
      useCollector(e);
      frame(e.ctx.camera, handheld(V3(0.0, 1.3, 2.05 - e.p * 0.15), e.t), V3(0, 1.12, 0.3), 34, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c13-awkward", 96.2, 99.2, (e) => {
      useCollector(e);
      const h = cHead("collector");
      frame(e.ctx.camera, handheld(V3(2.15, 1.55, 1.8), e.t), h.clone().add(V3(0, -0.02, 0)), 17, V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c14-respect", 99.2, 104.2, (e) => {
      useCollector(e);
      const h = cHead("zhang");
      const push = easeInOut(e.p);
      frame(e.ctx.camera, V3(-1.35 + push * 0.2, 1.37, 1.0 - push * 0.06), h.clone().add(V3(0, -0.04, 0)), lerp(24, 19, push), V3(0, 1, 0), 0, 0.05, 50);
    }),
    shot("c15-puzzled", 104.2, 105.8, (e) => {
      useCollector(e);
      const h = cHead("collector");
      frame(e.ctx.camera, V3(2.15, 1.52, 1.8), h.clone().add(V3(0, -0.03, 0)), 14, V3(0, 1, 0), 0, 0.05, 50);
      e.ctx.grade.fade = edgeFade(e, 0, 0.6);
    }),

    /* ===================================================== WORKSHOP */
    shot("w01-hall", 105.8, 111.2, (e) => {
      useWorkshop(e);
      // behind him in the dark hall: he walks toward the machine, the windows beyond
      frame(e.ctx.camera, V3(-8.2 + e.p * 1.2, 1.35, 6.5), V3(-1.2, 2.3, -2.0), 46, V3(0, 1, 0), 0, 0.05, 100);
      e.ctx.overlay.caption = "太空军某研究所 · 模型车间 · 夜";
      e.ctx.overlay.captionOpacity = smooth(seg(e.t, 106.4, 107.2)) * (1 - smooth(seg(e.t, 110.2, 111.0)));
      e.ctx.grade.fade = edgeFade(e, 0.5, 0);
    }),
    shot("w02-phone", 111.2, 115.6, (e) => {
      useWorkshop(e);
      // three-quarter front from his free side: moonlit face, the phone's glow on the far cheek
      const zh = workshop.head();
      const yaw = workshop.zhang.holder.rotation.y;
      const fwd = V3(Math.sin(yaw), 0, Math.cos(yaw));
      const left = V3(Math.cos(yaw), 0, -Math.sin(yaw));
      const pos = zh.clone().addScaledVector(fwd, 1.0).addScaledVector(left, 0.5).add(V3(0, 0.02, 0));
      frame(e.ctx.camera, handheld(pos, e.t), zh.clone().addScaledVector(left, -0.06).add(V3(0, -0.06, 0)), 30, V3(0, 1, 0), 0, 0.05, 100);
    }),
    shot("w03-lathe", 115.6, 118.6, (e) => {
      useWorkshop(e);
      frame(e.ctx.camera, V3(1.85, 1.55, 2.7 - e.p * 0.2), V3(-0.1, 1.05, 0.2), 42, V3(0, 1, 0), 0, 0.05, 100);
    }),
    shot("w04-cut", 118.6, 121.8, (e) => {
      useWorkshop(e);
      const sp = workshop.points.spindle!;
      frame(e.ctx.camera, V3(0.32, 1.32, 0.62), sp.clone().add(V3(0.06, 0, 0)), 28, V3(0, 1, 0), 0, 0.02, 100);
      e.ctx.grade.bloomStrength = 0.9;
    }),
    shot("w05-counter", 121.8, 124.4, (e) => {
      useWorkshop(e);
      const sc = workshop.points.screen!;
      frame(e.ctx.camera, sc.clone().add(V3(-0.12, 0.02, 0.42 - e.p * 0.06)), sc.clone(), 24, V3(0, 1, 0), 0, 0.02, 100);
    }),
    shot("w06-tray", 124.4, 127.4, (e) => {
      useWorkshop(e);
      const tr = workshop.points.tray!;
      frame(e.ctx.camera, tr.clone().add(V3(0.05, 0.4, 0.22)), tr.clone(), 28, V3(0, 1, 0), 0, 0.02, 100);
    }),
    shot("w07-clean", 127.4, 130.6, (e) => {
      useWorkshop(e);
      frame(e.ctx.camera, handheld(V3(2.7, 1.55, 2.6), e.t), V3(0.6, 1.1, 0.8), 38, V3(0, 1, 0), 0, 0.05, 100);
    }),
    shot("w08-dark", 130.6, 132.0, (e) => {
      useWorkshop(e);
      frame(e.ctx.camera, V3(-1.6, 1.8, 5.2), V3(0.4, 1.0, 0.6), 40, V3(0, 1, 0), 0, 0.05, 100);
      e.ctx.grade.fade = edgeFade(e, 0, 0.5);
    }),

    /* ===================================================== BASEMENT */
    shot("b01-grid", 132.0, 135.6, (e) => {
      useBasement(e);
      // overhead, close: thirty-six rounds in ranks, the bulb snaps on
      const g = basement.points.grid!;
      frame(e.ctx.camera, g.clone().add(V3(0.0, 0.42 - e.p * 0.05, -0.02)), g.clone().add(V3(0, 0, -0.03)), 34, V3(0, 0, -1), 0, 0.02, 30);
      e.ctx.overlay.caption = "某处 · 地下室";
      e.ctx.overlay.captionOpacity = smooth(seg(e.t, 133.0, 133.8)) * (1 - smooth(seg(e.t, 134.8, 135.5)));
    }),
    shot("b02-pliers", 135.6, 141.6, (e) => {
      useBasement(e);
      const g = basement.points.grid!;
      frame(e.ctx.camera, handheld(V3(0.28, 1.04, 0.32), e.t, 0.004), g.clone().add(V3(0.04, 0, 0.06)), 30, V3(0, 1, 0), 0, 0.02, 30);
    }),
    shot("b03-load", 141.6, 145.2, (e) => {
      useBasement(e);
      // across the table, just above his hands: his face over the work, four rounds leave the front rank
      frame(e.ctx.camera, handheld(V3(-0.06, 1.33, -0.5), e.t, 0.003), V3(0.03, 1.12, 0.35), 40, V3(0, 1, 0), 0, 0.02, 30);
    }),
    shot("b04-shots", 145.2, 149.4, (e) => {
      useBasement(e);
      // locked off: let the violence happen inside a still frame
      frame(e.ctx.camera, V3(1.75, 1.45, -1.25), V3(-0.55, 0.95, -0.25), 56, V3(0, 1, 0), 0, 0.05, 30);
      let flash = 0;
      for (const s of B.shots) {
        const d = e.t - s;
        if (d >= 0 && d < 0.06) flash = Math.max(flash, 0.55 * (1 - d / 0.06));
      }
      e.ctx.grade.flash = flash;
      e.ctx.grade.blur = smooth(seg(e.t, B.tinnitus[0], B.tinnitus[0] + 0.3)) * 0.6;
    }),
    shot("b05-holes", 149.4, 152.6, (e) => {
      useBasement(e);
      const t0 = basement.points.target!;
      frame(e.ctx.camera, handheld(t0.clone().add(V3(-0.22, 0.24, 0.95 - e.p * 0.12)), e.t, 0.004), t0.clone().add(V3(0.02, 0.04, 0.3)), 30, V3(0, 1, 0), 0, 0.02, 30);
      e.ctx.grade.blur = 0.6 * (1 - smooth(seg(e.t, 150.0, 152.0)));
    }),
    shot("b06-unwrap", 152.6, 158.6, (e) => {
      useBasement(e);
      const t0 = basement.points.target!;
      frame(e.ctx.camera, handheld(t0.clone().add(V3(-0.15, 0.75, 0.62)), e.t, 0.004), t0.clone().add(V3(0, 0.12, 0.0)), 40, V3(0, 1, 0), 0, 0.02, 30);
    }),
    shot("b07-palm", 158.6, 163.8, (e) => {
      useBasement(e);
      // over his shoulder, down into the open hand: grit, nothing else
      const n = V3();
      const palm = basement.palm(V3(), n);
      const toHead = basement.head().sub(palm).normalize();
      const pos = palm.clone().addScaledVector(n, 0.3 - e.p * 0.05).addScaledVector(toHead, 0.12);
      frame(e.ctx.camera, pos, palm, 30, V3(0, 1, 0), 0, 0.01, 30);
      e.ctx.grade.toneExposure = 0.7; // the hand is right under the bulb
    }),
    shot("b08-case", 163.8, 168.0, (e) => {
      useBasement(e);
      // over his left shoulder: the rounds stand in the case, the lid comes down, the bulb dies
      frame(e.ctx.camera, handheld(V3(-0.44, 1.3, 0.55 - e.p * 0.04), e.t, 0.002), V3(-0.46, 0.84, 0.13), 30, V3(0, 1, 0), 0, 0.02, 30);
      e.ctx.grade.fade = e.t > B.chainOff ? 1 : 0;
    }),

    /* ===================================================== BASE ONE */
    shot("s01a-cabin", S.cabin, 170.9, (e) => {
      useCabin(e);
      frame(e.ctx.camera, handheld(V3(-1.05, 1.6, 1.25), e.t), V3(0.3, 1.25, -0.4), 54, V3(0, 1, 0), 0, 0.03, 1e5);
      e.ctx.overlay.caption = "地球同步轨道 · 太空军一号基地";
      e.ctx.overlay.captionOpacity = smooth(seg(e.t, 168.6, 169.4)) * (1 - smooth(seg(e.t, 170.2, 170.9)));
      e.ctx.grade.fade = edgeFade(e, 0.6, 0);
    }),
    shot("s01b-photo", 170.9, 173.2, (e) => {
      useCabin(e);
      const p = cabin.photo.position;
      frame(e.ctx.camera, p.clone().add(V3(-0.08, 0.02, 0.42 - e.p * 0.08)), p.clone().add(V3(-0.05, -0.02, 0)), 32, V3(0, 1, 0), 0, 0.02, 1e5);
    }),
    shot("s01c-helmet", 173.2, 175.0, (e) => {
      useCabin(e);
      // from the photo's wall: his face, then the gold visor comes down over it
      const h = cabin.headWorld();
      frame(e.ctx.camera, handheld(V3(-0.3, 1.72, -1.15), e.t), h.clone().add(V3(0, 0.08, 0)), 42, V3(0, 1, 0), 0, 0.03, 1e5);
    }),
    shot("s02a-airlock", S.airlock, 178.4, (e) => {
      useCabin(e);
      // from below his boots, looking up the shaft: the red lamp, the suit, the cabin light above
      frame(e.ctx.camera, V3(0.55, -3.3, 0.55), V3(-0.05, -0.6, -0.05), 64, V3(0, 0, -1), 0, 0.03, 1e5);
      e.ctx.grade.saturation = 0.9;
    }),
    shot("s02b-pov", 178.4, S.vista, (e) => {
      useCabin(e);
      const h = cabin.headWorld();
      const pos = h.clone().add(V3(0, -0.08, 0.32));
      // pure point of view: his own body is out of the picture
      cabin.zhang.holder.visible = false;
      frame(e.ctx.camera, pos, V3(0.02, -4.5, 0.15), 72, V3(0, 0, -1), 0, 0.02, 1e5);
      space.backdrop.update(e.t, e.ctx.camera);
      e.ctx.overlay.hud.visible = 1;
      const kpa = Math.max(0, 101.3 * (1 - smooth(seg(e.t, S.depress[0], S.depress[1]))));
      e.ctx.overlay.hud.lines = [`舱压  ${kpa.toFixed(2)} kPa`, "定位单元  未连接", "生命维持  12:00:00"];
      e.ctx.grade.vignette = 0.75;
    }),

    /* ===================================================== EPILOGUE */
    shot("e01-radio", 334.6, 344.6, (e) => {
      useCollector(e, true);
      const h = cHead("collector");
      // from beyond the radio: he lowers the lens and turns toward the news
      frame(e.ctx.camera, handheld(V3(-1.7 + e.p * 0.12, 1.45, 1.4), e.t), h.clone().add(V3(-0.3, -0.18, -0.05)), 40, V3(0, 1, 0), 0, 0.05, 50);
      e.ctx.grade.fade = edgeFade(e, 1.0, 0);
      e.ctx.grade.saturation = 0.86;
    }),
    shot("e02-empty", 344.6, 351.0, (e) => {
      useCollector(e, true);
      const tray = collector.points.tray!;
      // raking along the velvet at its own level: three empty pits in a row
      const k = easeInOut(e.p);
      const pos = V3(tray.x - 0.75 + k * 0.1, 1.27, -1.88 - k * 0.03);
      frame(e.ctx.camera, pos, tray.clone().add(V3(0.15, -0.05, 0)), 36, V3(0, 1, 0), 0, 0.02, 50);
      e.ctx.grade.fade = edgeFade(e, 0, 1.6);
      e.ctx.grade.saturation = 0.86;
    }),
    shot("e03-end", 351.0, 356.0, (e) => {
      e.ctx.scene = s.black;
      e.ctx.backdrop = null;
      e.ctx.grade.fade = 1;
      e.ctx.overlay.endCard = smooth(seg(e.t, E.endTitle[0], E.endTitle[0] + 1.2)) * (1 - smooth(seg(e.t, E.endTitle[1] - 1.0, E.endTitle[1])));
    }),
  ];
}

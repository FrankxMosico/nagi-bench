import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import { frame, type FilmContext } from "../context";
import { shot, edgeFade, V3, type ShotEnv } from "../shotkit";
import type { SpaceSet } from "../sets/space";
import { GROUP_C, HATCH, sunDir, sunVisible, Z_FWD, Z_RIGHT, Z_UP, ZPOS, BASE_DIR } from "../sets/space-common";
import { S } from "../../timeline";
import { clamp, easeInOut, lerp, seg, smooth, wobble } from "../util";

const PHOTO_UP = V3(0, 0, 1);

function spaceGrade(e: ShotEnv): void {
  const g = e.ctx.grade;
  g.contrast = 1.08;
  g.saturation = 0.96;
  g.lift.setRGB(0.0, 0.004, 0.012);
  g.vignette = 0.5;
  g.grain = 0.028;
  g.bloomStrength = 0.85;
  g.bloomRadius = 0.55;
  g.bloomThreshold = 0.72;
  g.toneExposure = 1.05;
}

export function spaceShots(space: SpaceSet): Shot<FilmContext>[] {
  const use = (e: ShotEnv): void => {
    e.ctx.scene = space.scene;
    e.ctx.backdrop = space.backdrop.scene;
    space.update(e.t, e.ctx.camera);
    spaceGrade(e);
  };
  const settle = (e: ShotEnv): void => {
    // camera-dependent parts (sun streak billboard, flash scale) after framing
    space.backdrop.update(e.t, e.ctx.camera);
    space.update(e.t, e.ctx.camera);
  };
  const head = (): THREE.Vector3 => space.zhangHead();

  /** Look through the rifle scope at `target`, framing `frameH` metres. */
  const scope = (e: ShotEnv, target: THREE.Vector3, frameH: number, shake = 1, kick = 0): void => {
    const from = head();
    const dir = target.clone().sub(from).normalize();
    const dist = 150;
    const jitter = V3(wobble(e.t * 1.7, 1), wobble(e.t * 1.9, 2), wobble(e.t * 1.3, 3)).multiplyScalar(frameH * 0.012 * shake);
    const aim = target.clone().add(jitter).addScaledVector(Z_UP, kick * frameH * 0.35);
    const pos = aim.clone().addScaledVector(dir, -dist);
    const fov = THREE.MathUtils.radToDeg(2 * Math.atan(frameH / 2 / dist));
    frame(e.ctx.camera, pos, aim, fov, Z_UP, 0, 20, 1e6);
    e.ctx.grade.scope = 1;
    e.ctx.grade.reticle = 1;
    e.ctx.grade.vignette = 0.25;
    const range = from.distanceTo(target);
    e.ctx.overlay.scopeText = `${Math.round(range).toLocaleString("en-US").replace(",", " ")} m`;
  };

  const recoilKick = (t: number): number => {
    let r = 0;
    for (let g = 0; g < 3; g++) {
      for (let j = 0; j < 10; j++) {
        const d = t - (S.fire[g]! + j * S.fireStep);
        if (d >= 0 && d < 0.3) r += Math.exp(-d * 16);
      }
    }
    return Math.min(1.3, r);
  };

  const headOfTarget = (k: 0 | 1 | 2): THREE.Vector3 => space.headOf(space.targets[k]);

  return [
    /* s03 — the vista: Zhang glides into position, the wheel ahead */
    shot("s03-vista", S.vista, 191.0, (e) => {
      use(e);
      const zp = ZPOS;
      const pos = zp.clone().addScaledVector(Z_FWD, -13 + e.p * 1.5).addScaledVector(Z_UP, 1.15).addScaledVector(Z_RIGHT, 2.6);
      const target = HATCH.clone().lerp(V3(0, 0, 0), 0.42);
      frame(e.ctx.camera, pos, target, 17.5 - e.p * 1.2, Z_UP, 0, 0.05, 1e6);
      settle(e);
      e.ctx.grade.fade = edgeFade(e, 0.4, 0);
      e.ctx.overlay.caption = "黄河空间站外 · 五公里";
      e.ctx.overlay.captionOpacity = smooth(seg(e.t, 182.4, 183.4)) * (1 - smooth(seg(e.t, 187.6, 188.8)));
    }),

    /* s04 — hero: Zhang against the night side of the Earth */
    shot("s04-hero", 191.0, 198.0, (e) => {
      use(e);
      const zp = ZPOS;
      const orbit = -0.35 + e.p * 0.3;
      const pos = zp.clone()
        .addScaledVector(Z_FWD, 4.6 * Math.cos(orbit))
        .addScaledVector(Z_RIGHT, 4.6 * Math.sin(orbit) - 0.6)
        .addScaledVector(Z_UP, -0.9 + e.p * 0.3);
      const earthward = V3(0, -1, 0);
      const look = zp.clone().addScaledVector(Z_UP, 0.25);
      const dir = look.clone().sub(pos).normalize().lerp(earthward, 0.28).normalize();
      frame(e.ctx.camera, pos, pos.clone().addScaledVector(dir, 10), 36, Z_UP, 0.05, 0.05, 1e6);
      settle(e);
    }),

    /* s05 — extreme wide: a speck in the dust of stars */
    shot("s05-alone", 198.0, 207.0, (e) => {
      use(e);
      // a slow dolly out until he is a mote in the dust of stars
      const zp = ZPOS;
      const d = 3.5 + Math.pow(e.p, 1.8) * 30;
      const side = Z_RIGHT.clone().multiplyScalar(-1).addScaledVector(Z_FWD, -0.55).addScaledVector(Z_UP, 0.3).normalize();
      const pos = zp.clone().addScaledVector(side, d);
      const across = new THREE.Vector3().crossVectors(side, Z_UP).normalize();
      frame(e.ctx.camera, pos, zp.clone().addScaledVector(across, -d * 0.18), 32, Z_UP, -0.06, 0.1, 1e6);
      settle(e);
    }),

    /* s06 — the sun touches the rim of the Earth; Zhang a mote beside it */
    shot("s06-touch", 207.0, 210.6, (e) => {
      use(e);
      const pos = GROUP_C.clone().add(V3(4, 14, 2));
      const target = pos.clone().add(V3(0, -1000, 18));
      frame(e.ctx.camera, pos, target, 33 - e.p * 2, V3(1, 0, 0), 0, 0.5, 1e6);
      settle(e);
      e.ctx.grade.bloomStrength = 1.1;
    }),

    /* s07 — he lifts the rifle scope to his visor */
    shot("s07-scope-up", 210.6, 214.0, (e) => {
      use(e);
      // three-quarter profile: the scope comes up to the visor, aimed at the far wheel
      const h = head();
      const pos = h.clone().addScaledVector(Z_RIGHT, -2.1 + e.p * 0.2).addScaledVector(Z_FWD, 1.35).addScaledVector(Z_UP, -0.25);
      frame(e.ctx.camera, pos, h.clone().addScaledVector(Z_FWD, 0.25).addScaledVector(Z_UP, -0.35), 34, Z_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s08 — scope: the hatch, still shut, the lamp red */
    shot("s08-scope-hatch", 214.0, 218.0, (e) => {
      use(e);
      scope(e, HATCH.clone().add(V3(1.5, -7, 0.5)), 24 - e.p * 3);
      settle(e);
    }),

    /* s09 — over the shoulder: half the sun gone, a ring of fire */
    shot("s09-ring", 218.0, 222.0, (e) => {
      use(e);
      const h = head();
      const sd = sunDir(e.t);
      const pos = h.clone().addScaledVector(Z_FWD, 1.6).addScaledVector(Z_UP, 0.25).addScaledVector(Z_RIGHT, 0.55);
      const toHead = h.clone().sub(pos).normalize();
      const look = sd.clone().lerp(toHead, 0.42).normalize();
      frame(e.ctx.camera, pos, pos.clone().addScaledVector(look, 100), 40, V3(1, 0, 0), 0, 0.05, 1e6);
      settle(e);
      e.ctx.grade.bloomStrength = 1.25;
    }),

    /* s10 — scope: the lamp turns green, the door slides, they come out */
    shot("s10-scope-emerge", 222.0, 231.0, (e) => {
      use(e);
      const k = smooth(seg(e.t, 225.4, 230.5));
      const target = HATCH.clone().add(V3(1, -9, 0.5)).lerp(GROUP_C.clone().add(V3(0, 24, 0.5)), k);
      scope(e, target, lerp(24, 40, k));
      settle(e);
    }),

    /* s11 — documentary angle: thirty white figures arranging themselves */
    shot("s11-arrange", 231.0, 237.0, (e) => {
      use(e);
      // three-quarter view: the rows taking shape against the lit hull
      const pos = GROUP_C.clone().add(V3(7.5 - e.p * 1.5, -11.5, 3.2));
      const target = GROUP_C.clone().add(V3(-0.6, 2.2, 0.7));
      frame(e.ctx.camera, pos, target, 40, PHOTO_UP, 0, 0.1, 1e6);
      settle(e);
    }),

    /* s12 — the limb: ocean a mirror, half blue half orange */
    shot("s12-limb", 237.0, 242.0, (e) => {
      use(e);
      const sd = sunDir(e.t);
      const pos = ZPOS.clone().addScaledVector(Z_FWD, -3);
      const dir = sd.clone().lerp(V3(0, -1, 0), 0.32 + e.p * 0.04).normalize();
      frame(e.ctx.camera, pos, pos.clone().addScaledVector(dir, 100), 7.5, PHOTO_UP, 0, 0.05, 1e6);
      settle(e);
      e.ctx.grade.bloomStrength = 1.1;
      e.ctx.grade.saturation = 1.08;
    }),

    /* s13 — front row: visors clear, faces appear; the old man speaks */
    shot("s13-front-row", 242.0, 250.0, (e) => {
      use(e);
      const c = GROUP_C.clone();
      const pos = c.clone().add(V3(1.6 - e.p * 1.8, -4.6, 0.25));
      const target = c.clone().add(V3(0.2 - e.p * 0.4, 0.4, 0.7));
      frame(e.ctx.camera, pos, target, 34, PHOTO_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s14 — scope: the reticle finds three faces */
    shot("s14-scope-faces", 250.0, 255.0, (e) => {
      use(e);
      const a = headOfTarget(0);
      const b = headOfTarget(1);
      const c = headOfTarget(2);
      const k1 = easeInOut(seg(e.t, 251.2, 251.9));
      const k2 = easeInOut(seg(e.t, 252.9, 253.6));
      const target = a.clone().lerp(b, k1).lerp(c, k2);
      scope(e, target, 1.5, 0.6);
      settle(e);
    }),

    /* s15 — close on the hands: the locking ring turns, the glove floats off */
    shot("s15-glove", 255.0, 258.6, (e) => {
      use(e);
      // right profile: the ring turns, the glove drifts off, the chest lamp goes red
      const pos = ZPOS.clone().addScaledVector(Z_RIGHT, 2.0 - e.p * 0.15).addScaledVector(Z_FWD, 0.9).addScaledVector(Z_UP, 0.45);
      frame(e.ctx.camera, pos, ZPOS.clone().addScaledVector(Z_FWD, 0.35).addScaledVector(Z_UP, 0.42), 38, Z_UP, 0, 0.02, 1e6);
      settle(e);
    }),

    /* s16 — he turns so the failing sunlight falls on his hand */
    shot("s16-turn", 258.6, 261.2, (e) => {
      use(e);
      // right side, a little behind: the hand goes out into the failing light
      const hand = space.zhangHand();
      const pos = ZPOS.clone().addScaledVector(Z_FWD, -0.45).addScaledVector(Z_RIGHT, 2.3).addScaledVector(Z_UP, 0.55);
      frame(e.ctx.camera, pos, hand.clone().lerp(space.zhangHead(), 0.45), 36, Z_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s17 — the pistol from the thigh pocket; the scope snaps on */
    shot("s17-assemble", 261.2, 264.2, (e) => {
      use(e);
      // left profile: pistol out of the thigh pocket, the scope snaps onto the slide
      const pos = ZPOS.clone().addScaledVector(Z_RIGHT, -2.1).addScaledVector(Z_FWD, 0.85).addScaledVector(Z_UP, 0.45);
      frame(e.ctx.camera, pos, ZPOS.clone().addScaledVector(Z_FWD, 0.45).addScaledVector(Z_UP, 0.35), 36, Z_UP, 0, 0.03, 1e6);
      settle(e);
    }),

    /* s18 — profile: the arms come up into the aim */
    shot("s18-aim", 264.2, 268.2, (e) => {
      use(e);
      const pos = ZPOS.clone().addScaledVector(Z_RIGHT, -2.7).addScaledVector(Z_FWD, 0.9 + e.p * 0.3).addScaledVector(Z_UP, 0.25);
      frame(e.ctx.camera, pos, ZPOS.clone().addScaledVector(Z_FWD, 0.75).addScaledVector(Z_UP, 0.32), 30, Z_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s19 — the gun: ten flashes, no sound but the body's thud */
    shot("s19-fire1", 268.2, 271.0, (e) => {
      use(e);
      const m = space.muzzleWorld();
      const aim = space.aimPoint(0, e.t).sub(m).normalize();
      const pos = m.clone().addScaledVector(aim, -0.42).addScaledVector(Z_RIGHT, 0.2).addScaledVector(Z_UP, 0.0);
      frame(e.ctx.camera, pos, m.clone().addScaledVector(aim, 3).addScaledVector(Z_UP, -0.04), 42, Z_UP, 0, 0.02, 1e6);
      settle(e);
    }),

    /* s20 — scope: the second target, the reticle bucking */
    shot("s20-fire2", 271.0, 274.4, (e) => {
      use(e);
      const a = headOfTarget(2).addScaledVector(PHOTO_UP, -0.35);
      const b = headOfTarget(1);
      const k = easeInOut(seg(e.t, 273.5, 274.2));
      const dip = Math.sin(clamp((e.t - S.magOut[1]) / 0.7) * Math.PI) * 0.8;
      const target = a.clone().lerp(b, k).addScaledVector(PHOTO_UP, -dip);
      scope(e, target, 1.9, 0.8, recoilKick(e.t) * 0.5);
      settle(e);
    }),

    /* s21 — from among the victims: a firefly flickers out in the dark */
    shot("s21-firefly", 274.4, 278.4, (e) => {
      use(e);
      // above and behind the rows: helmets along the bottom edge, the Earth beyond
      // tilted down so their helmets fill the lower third; the flicker sits just above them
      const pos = GROUP_C.clone().add(V3(-1.2 + e.p * 0.4, 6.5, 4.6));
      const target = ZPOS.clone().addScaledVector(PHOTO_UP, -390);
      frame(e.ctx.camera, pos, target, 30, PHOTO_UP, 0, 0.1, 1e6);
      settle(e);
      e.ctx.grade.bloomStrength = 1.0;
    }),

    /* s22a — a meteorite slug, cruising through vacuum (slowed) */
    shot("s22a-slug", 278.4, 284.0, (e) => {
      use(e);
      const k = 20;
      const b = space.bullets[k]!;
      const dir = b.to.clone().sub(b.from).normalize();
      const p = space.bulletPos(k, e.t);
      const side = new THREE.Vector3().crossVectors(dir, Z_UP).normalize();
      const pos = p.clone().addScaledVector(dir, -0.05 + e.p * 0.012).addScaledVector(side, 0.016).addScaledVector(Z_UP, 0.007);
      frame(e.ctx.camera, pos, p.clone().addScaledVector(dir, 0.02), 30, Z_UP, 0.04, 0.002, 1e6);
      settle(e);
      e.ctx.grade.fade = edgeFade(e, 0.25, 0);
    }),

    /* s22b — his face behind the visor, lit by the instruments */
    shot("s22b-face", 284.0, 289.0, (e) => {
      use(e);
      const h = head();
      const pos = h.clone().addScaledVector(Z_FWD, 1.45 - e.p * 0.25).addScaledVector(Z_RIGHT, 0.22).addScaledVector(Z_UP, -0.05);
      frame(e.ctx.camera, pos, h.clone().addScaledVector(Z_UP, -0.08), 26, Z_UP, 0, 0.02, 1e6);
      settle(e);
    }),

    /* s22c — scope: they wait for the mist to clear */
    shot("s22c-wait", 289.0, 293.4, (e) => {
      use(e);
      scope(e, headOfTarget(1).addScaledVector(PHOTO_UP, -0.6), 4.2 - e.p * 0.6, 0.5);
      settle(e);
    }),

    /* s22d — another slug, the station filling the dark ahead */
    shot("s22d-slug", 293.4, 297.2, (e) => {
      use(e);
      const k = 0;
      const b = space.bullets[k]!;
      const dir = b.to.clone().sub(b.from).normalize();
      const p = space.bulletPos(k, e.t);
      const side = new THREE.Vector3().crossVectors(dir, Z_UP).normalize();
      const pos = p.clone().addScaledVector(dir, -0.06).addScaledVector(side, -0.02).addScaledVector(Z_UP, 0.012);
      frame(e.ctx.camera, pos, p.clone().addScaledVector(dir, 0.6), 34, Z_UP, -0.05, 0.002, 1e6);
      settle(e);
    }),

    /* s22e — the front row, smiling for the camera */
    shot("s22e-smile", 297.2, 301.0, (e) => {
      use(e);
      const c = GROUP_C.clone();
      const pos = c.clone().add(V3(0.3, -3.6 + e.p * 0.4, 0.3));
      frame(e.ctx.camera, pos, c.clone().add(V3(0, 0.3, 0.68)), 30, PHOTO_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s23 — impact: white gas, a burst between the rows, no sound */
    shot("s23-impact", 301.0, 303.6, (e) => {
      use(e);
      const c = GROUP_C.clone();
      const pos = c.clone().add(V3(0.5, -6.8, 0.7));
      frame(e.ctx.camera, pos, c.clone().add(V3(0, 0.9, 0.75)), 40, PHOTO_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s24 — the old man's visor: cracks, blood, and then snow */
    shot("s24-visor", 303.6, 306.6, (e) => {
      use(e);
      const h = headOfTarget(1);
      const pos = h.clone().add(V3(0.18, -0.95 + e.p * 0.12, 0.05));
      frame(e.ctx.camera, pos, h.clone().add(V3(0.0, 0, -0.03)), 30, PHOTO_UP, 0.03, 0.02, 1e6);
      settle(e);
      e.ctx.grade.bloomStrength = 1.0;
    }),

    /* s25 — mouths open behind clear visors: "陨石雨！" */
    shot("s25-scream", 306.6, 309.2, (e) => {
      use(e);
      const a = space.headOf(space.members[6]!);
      const b = space.headOf(space.members[7]!);
      const mid = a.clone().lerp(b, 0.5);
      const pos = mid.clone().add(V3(0.15, -2.3 + e.p * 0.2, -0.25));
      frame(e.ctx.camera, pos, mid.clone().add(V3(0, 0, -0.05)), 34, PHOTO_UP, -0.04, 0.05, 1e6);
      settle(e);
    }),

    /* s26 — every thruster at full power, white trails back to the hatch */
    shot("s26-retreat", 309.2, 313.4, (e) => {
      use(e);
      // from below and behind the rows: everyone bolting up their own white trails to the light
      const pos = GROUP_C.clone().add(V3(-4.5, -11 + e.p * 3, -3.5));
      frame(e.ctx.camera, pos, HATCH.clone().add(V3(0, -6, 0)), 56, PHOTO_UP, 0, 0.1, 1e6);
      settle(e);
    }),

    /* s27 — scope: the wounded dragged in; the door; the lamp red again */
    shot("s27-scope-close", 313.4, 318.2, (e) => {
      use(e);
      scope(e, HATCH.clone().add(V3(1, -10 + smooth(e.p) * 4, 0.5)), 26 - e.p * 6, 0.7);
      settle(e);
      e.ctx.grade.fade = edgeFade(e, 0, 0.2);
    }),

    /* s28 — he lowers the gun, stows it, recovers the glove */
    shot("s28-after", 318.2, 322.0, (e) => {
      use(e);
      const pos = ZPOS.clone().addScaledVector(Z_FWD, 2.7).addScaledVector(Z_RIGHT, -1.3).addScaledVector(Z_UP, 0.1);
      frame(e.ctx.camera, pos, ZPOS.clone().addScaledVector(Z_UP, 0.2).addScaledVector(Z_RIGHT, -0.15), 34, Z_UP, 0, 0.05, 1e6);
      settle(e);
    }),

    /* s29 — he turns for Base One and burns away into the dark */
    shot("s29-depart", 322.0, 334.6, (e) => {
      use(e);
      // behind and beside him; he turns, burns, and dwindles to a spark among the stars
      const up = V3(0, 1, 0).addScaledVector(BASE_DIR, -BASE_DIR.y).normalize();
      const side = new THREE.Vector3().crossVectors(BASE_DIR, up).normalize();
      const anchor = ZPOS.clone().addScaledVector(BASE_DIR, -6.5).addScaledVector(up, 1.3).addScaledVector(side, 2.4);
      const look = ZPOS.clone().addScaledVector(BASE_DIR, 18 + easeInOut(e.p) * 140).addScaledVector(up, 0.4);
      frame(e.ctx.camera, anchor, look, 36, up, 0, 0.05, 1e6);
      settle(e);
      e.ctx.grade.fade = edgeFade(e, 0, 1.2);
    }),
  ];
}

export { sunVisible };

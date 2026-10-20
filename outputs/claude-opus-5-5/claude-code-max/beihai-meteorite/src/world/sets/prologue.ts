import * as THREE from "three";
import { voxelMaterial } from "@agentbench/voxel-kit";
import { rockGeometry } from "../vox";
import { Particles } from "../fx";
import { P } from "../../timeline";
import { hash1, mulberry32, seg, smooth } from "../util";
import type { Backdrop } from "./space-common";

/**
 * Cold open: an iron meteorite drifting toward the Earth, then its brief fire
 * across the night side. It is the same kind of stone the collector keeps under
 * glass, and the same kind Zhang will send back into the sky.
 */

export interface PrologueSet {
  scene: THREE.Scene;
  meteorite: THREE.Mesh;
  streak: Particles;
  update(t: number, backdrop: Backdrop): void;
}

/** Fusion crust, rust and a few bright flecks of nickel-iron. */
export function ironPalette(seed: number): (x: number, y: number, z: number, d: number) => number {
  return (x, y, z, d) => {
    const h = hash1(x * 17.1 + y * 31.7 + z * 7.3 + seed);
    if (d < 0.8) return 0x5a5d62;
    if (h > 0.95) return 0xb4bac0;
    if (h > 0.82) return 0x6a4630;
    if (h > 0.5) return 0x3e3730;
    return 0x302a25;
  };
}

export function buildPrologue(): PrologueSet {
  const scene = new THREE.Scene();
  scene.background = null;
  const meteorite = new THREE.Mesh(
    rockGeometry(11, 9, 0.006, ironPalette(11), 0.55),
    voxelMaterial({ roughness: 0.38, metalness: 0.3 }),
  );
  scene.add(meteorite);
  const sun = new THREE.DirectionalLight(0xfff0dc, 6.5);
  sun.position.set(-3, 1.2, 1.5);
  scene.add(sun);
  // earthshine from below, and a cold rim from behind
  const fill = new THREE.DirectionalLight(0x5577bb, 0.9);
  fill.position.set(0, -1, 0.3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xb8d0ff, 2.0);
  rim.position.set(1.5, 0.6, -2.5);
  scene.add(rim);

  // the fireball, drawn in the backdrop so the planet occludes it correctly
  const streak = new Particles(48, { additive: true });
  const r = mulberry32(5);
  // on the night side, just past the terminator
  const base = new THREE.Vector3(0.45, 0.85, -0.25).normalize();
  const tangent = new THREE.Vector3(0.55, -0.2, 0.8).normalize();
  const jitters = Array.from({ length: 48 }, () => [r() - 0.5, r() - 0.5, r() - 0.5]);

  return {
    scene,
    meteorite,
    streak,
    update(t, backdrop) {
      // tumble: derived from absolute time so a seek lands on the same pose
      meteorite.rotation.set(t * 0.37 + 0.4, t * 0.23, t * 0.11);
      if (streak.points.parent !== backdrop.scene) backdrop.scene.add(streak.points);
      const active = t >= P.streak[0] - 0.05 && t <= P.streak[1] + 0.05;
      streak.points.visible = active;
      if (!active) return;
      const u = seg(t, P.streak[0], P.streak[1]);
      const earthR = backdrop.earth.radius * backdrop.earth.group.scale.x;
      const centre = backdrop.earth.group.position.clone();
      streak.update((i, s) => {
        const lag = i * 0.012;
        const k = u - lag;
        if (k < 0) return false;
        const dir = base.clone().addScaledVector(tangent, (k - 0.5) * 0.34).normalize();
        s.p.copy(centre).addScaledVector(dir, earthR * 1.012);
        const j = jitters[i]!;
        s.p.add(new THREE.Vector3(j[0]!, j[1]!, j[2]!).multiplyScalar(0.35 * (i / 48)));
        const head = i === 0;
        const life = 1 - smooth(seg(u, 0.75, 1));
        s.size = head ? 4.5 : 2.8 * (1 - i / 48);
        s.alpha = (head ? 1 : 0.8 * (1 - i / 48)) * life * smooth(u / 0.08);
        s.c.setRGB(1.0, 0.62 - (i / 48) * 0.3, 0.25 - (i / 48) * 0.15).multiplyScalar(head ? 6 : 3);
        return true;
      });
    },
  };
}

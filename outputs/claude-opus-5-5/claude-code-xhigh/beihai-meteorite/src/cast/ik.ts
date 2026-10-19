import type { Euler3, Pose } from "@agentbench/voxel-kit";

/**
 * Block arms have no elbow, so "reaching" is a single rotation that points the
 * arm from the shoulder at a target. Targets are in the figure's hips frame,
 * in px (the rig's own units): x to the figure's left, y up from the hips
 * joint, z forward.
 */

const SHOULDER_R: [number, number, number] = [-5, 10, 0];
const SHOULDER_L: [number, number, number] = [5, 10, 0];

/** Euler (XYZ) that turns a hanging arm (0,−1,0) to point along d. */
export function armToward(dx: number, dy: number, dz: number, twist = 0): Euler3 {
  const l = Math.hypot(dx, dy, dz) || 1;
  const x = dx / l;
  const y = dy / l;
  const z = dz / l;
  const c = Math.asin(Math.max(-1, Math.min(1, x)));
  const a = Math.atan2(-z, -y);
  return [a, twist, c];
}

/** Point an arm at a target in hips space (px). */
export function reach(side: "R" | "L", target: [number, number, number], twist = 0): Euler3 {
  const s = side === "R" ? SHOULDER_R : SHOULDER_L;
  return armToward(target[0] - s[0], target[1] - s[1], target[2] - s[2], twist);
}

/** Neck rotation that turns the head toward a direction in hips space. */
export function lookToward(dx: number, dy: number, dz: number): Euler3 {
  const yaw = Math.atan2(dx, dz);
  const pitch = -Math.atan2(dy, Math.hypot(dx, dz));
  return [Math.max(-0.7, Math.min(0.6, pitch)), Math.max(-1.1, Math.min(1.1, yaw)), 0];
}

/** Handy hips-space landmarks (px). */
export const BODY = {
  face: [0, 16, 7] as [number, number, number],
  chest: [0, 7, 4] as [number, number, number],
  belly: [0, 3, 5] as [number, number, number],
  hipR: [-5, 1, 2] as [number, number, number],
  hipL: [5, 1, 2] as [number, number, number],
};

export function mergePose(base: Pose, over: Pose): Pose {
  return { ...base, ...over };
}

import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import type { FilmContext } from "./context";
import { clamp } from "./util";

export interface ShotEnv {
  ctx: FilmContext;
  /** Absolute time. */
  t: number;
  /** Seconds since the shot began. */
  lt: number;
  /** 0..1 through the shot. */
  p: number;
  dur: number;
}

export type ShotBody = (e: ShotEnv) => void;

/**
 * Wrap a shot body as a player Shot. Every body derives the whole frame —
 * active set, set state, camera, grade, captions — from absolute time, so a
 * seek lands on exactly the frame normal playback would have produced.
 */
export function shot(id: string, start: number, end: number, body: ShotBody): Shot<FilmContext> {
  return {
    id,
    start,
    end,
    update: ({ context, time }) => {
      const lt = Math.max(0, time - start);
      body({ ctx: context, t: time, lt, p: clamp(lt / (end - start)), dur: end - start });
    },
  };
}

/** Fade in at the head and/or out at the tail of a shot. */
export function edgeFade(e: ShotEnv, fadeIn = 0, fadeOut = 0): number {
  let f = 0;
  if (fadeIn > 0) f = Math.max(f, 1 - clamp(e.lt / fadeIn));
  if (fadeOut > 0) f = Math.max(f, 1 - clamp((e.dur - e.lt) / fadeOut));
  return f;
}

export const V3 = (x = 0, y = 0, z = 0): THREE.Vector3 => new THREE.Vector3(x, y, z);

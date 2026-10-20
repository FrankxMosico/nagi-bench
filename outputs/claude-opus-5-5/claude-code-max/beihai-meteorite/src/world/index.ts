import * as THREE from "three";
import type { Shot } from "@agentbench/cinematic-player";
import { defaultGrade, defaultOverlay, type FilmContext } from "./context";
import { buildSpace, type SpaceSet } from "./sets/space";
import { buildCabin, type CabinSet } from "./sets/cabin";
import { buildPrologue, type PrologueSet } from "./sets/prologue";
import { buildHutong, type HutongSet } from "./sets/hutong";
import { buildCollector, type CollectorSet } from "./sets/collector";
import { buildWorkshop, type WorkshopSet } from "./sets/workshop";
import { buildBasement, type BasementSet } from "./sets/basement";
import { spaceShots } from "./shots/space-shots";
import { earthShots } from "./shots/earth-shots";

export interface Sets {
  space: SpaceSet;
  cabin: CabinSet;
  prologue: PrologueSet;
  hutong: HutongSet;
  collector: CollectorSet;
  workshop: WorkshopSet;
  basement: BasementSet;
}

export interface Film {
  ctx: FilmContext;
  shots: Shot<FilmContext>[];
  sets: Sets;
  black: THREE.Scene;
}

/** Build every set and the full shot list. Shared by the browser and offline tools. */
export function buildFilm(onProgress?: (label: string, k: number, n: number) => void): Film {
  const camera = new THREE.PerspectiveCamera(40, 2.39, 0.05, 60000);
  const black = new THREE.Scene();
  black.background = new THREE.Color(0x000000);
  const ctx: FilmContext = {
    camera,
    scene: black,
    backdrop: null,
    grade: defaultGrade(),
    overlay: defaultOverlay(),
    time: 0,
  };
  const steps: Array<[string, () => unknown]> = [];
  const out: Partial<Sets> = {};
  steps.push(["太空", () => (out.space = buildSpace())]);
  steps.push(["一号基地", () => (out.cabin = buildCabin())]);
  steps.push(["序", () => (out.prologue = buildPrologue())]);
  steps.push(["胡同", () => (out.hutong = buildHutong())]);
  steps.push(["收藏者", () => (out.collector = buildCollector())]);
  steps.push(["车间", () => (out.workshop = buildWorkshop())]);
  steps.push(["地下室", () => (out.basement = buildBasement())]);
  steps.forEach(([label, fn], k) => {
    onProgress?.(label, k, steps.length);
    fn();
  });
  const sets = out as Sets;
  const shots: Shot<FilmContext>[] = [
    ...earthShots({ ...sets, black }),
    ...spaceShots(sets.space),
  ];
  return { ctx, shots, sets, black };
}

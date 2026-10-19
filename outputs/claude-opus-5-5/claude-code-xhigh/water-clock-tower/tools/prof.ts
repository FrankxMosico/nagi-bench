// 物理耗时剖析：bun tools/prof.ts [秒数]
import RAPIER from "@dimforge/rapier3d-compat";
import { buildMachine } from "../src/physics/machine";

await RAPIER.init();
const secs = Number(process.argv[2] ?? 8);
const { P } = await import("../src/physics/machine");
if (process.argv[3] === "nowater") P.flowRate = 0.001;
if (process.argv[3] === "iter2") P.solverIters = 2;
const m = buildMachine(RAPIER, { initialFill: 8 });
m.world.profilerEnabled = true;
const acc: Record<string, number> = {};
const keys = ["timingStep", "timingCollisionDetection", "timingBroadPhase", "timingNarrowPhase", "timingSolver", "timingVelocityResolution", "timingIslandConstruction", "timingUserChanges"] as const;
let n = 0;
const t0 = performance.now();
let jsTime = 0;
while (m.time < secs) {
  const a = performance.now();
  m.step();
  jsTime += performance.now() - a;
  for (const k of keys) acc[k] = (acc[k] ?? 0) + (m.world as any)[k]();
  n++;
}
console.log("steps", n, "wall", (performance.now() - t0).toFixed(0), "per-step", (jsTime / n).toFixed(3));
for (const k of keys) console.log(k.padEnd(28), (acc[k] / n).toFixed(3), "ms");
let colliders = 0;
m.world.forEachCollider(() => colliders++);
console.log("colliders", colliders, "water", m.water.length);

// Headless tuning harness: runs the physics model without rendering and
// prints the escapement timeline.  bun tools/simtest.ts [seconds] [-v]
import RAPIER from "@dimforge/rapier3d-compat";
import { createSim, DT } from "../src/sim/sim";
import * as L from "../src/sim/layout";

await RAPIER.init();
const secs = Number(process.argv[2] ?? 40);
const verbose = process.argv.includes("-v");
// --set TUNE.wheelDamp=4,SHUHENG.pivot.v=-0.8
const si = process.argv.indexOf("--set");
const fs = await import("node:fs");
const setFile = process.argv.includes("--file") ? fs.readFileSync("tools/set.txt", "utf8").trim() : "";
const setStr = si > 0 ? process.argv[si + 1] : setFile;
if (setStr) {
  console.log("overrides:", setStr);
  for (const kv of setStr.split(",")) {
    const [path, val] = kv.split("=");
    const keys = path.split(".");
    let o: any = L;
    for (const k of keys.slice(0, -1)) o = o[k];
    o[keys[keys.length - 1]] = Number(val);
  }
}
const quiet = process.argv.includes("-q");
const wi = process.argv.indexOf("--win");
const win = wi > 0 ? [Number(process.argv[wi + 1]), Number(process.argv[wi + 2])] : null;
const sim = createSim(RAPIER);
const t0 = performance.now();
let ev = 0;
let lastLockAngle = 0;
const deg = (r: number) => ((r * 180) / Math.PI).toFixed(1);
const advances: number[] = [];
const trips: number[] = [];
const releaseFill: number[] = [];
const misTimes: string[] = [];
const n = Math.round(secs / DT);
let lastPrint = -1;
for (let i = 0; i < n; i++) {
  sim.step();
  for (; ev < sim.events.length; ev++) {
    const e = sim.events[ev];
    if (e.type === "drop" || e.type === "gear") continue;
    if (e.type === "fork" && !verbose) continue;
    let extra = "";
    if (e.type === "trip") {
      const k = sim.fillingScoop();
      extra = `scoop#${k} holds ${sim.waterIn(k)} drops`;
      trips.push(e.t);
    }
    if (e.type === "lock") {
      const adv = sim.wheelAngle - lastLockAngle;
      extra = `ω=${e.speed.toFixed(2)} wheel=${deg(sim.wheelAngle)}° advance=${deg(adv)}° shaft=${deg(sim.shaftAngle)}° globe=${deg(sim.globeAngle)}° armil=${deg(sim.armilAngle)}°`;
      if (Math.abs(adv) > 0.05) advances.push(adv);
      lastLockAngle = sim.wheelAngle;
    }
    if (e.type === "strike") extra = `${e.which} v=${e.speed.toFixed(2)}`;
    if (e.type === "release") {
      const n = sim.waterIn(sim.fillingScoop());
      releaseFill.push(n);
      extra = `fill=${n}`;
      if (n < 8) misTimes.push(e.t.toFixed(2));
    }
    if (!quiet) console.log(`${e.t.toFixed(2).padStart(6)}  ${e.type.padEnd(8)} ${extra}`);
  }
  const inWin = win && sim.t >= win[0] && sim.t <= win[1];
  if ((verbose && Math.floor(sim.t * 4) !== lastPrint) || (inWin && Math.floor(sim.t * 50) !== lastPrint)) {
    lastPrint = inWin ? Math.floor(sim.t * 50) : Math.floor(sim.t * 4);
    const k = sim.fillingScoop();
    console.log(
      `   t=${sim.t.toFixed(2)} wheel=${deg(sim.wheelAngle)} ω=${sim.wheel.angvel().x.toFixed(2)} fill#${k}=${sim.waterIn(k)} ` +
        `sh=${sim.shuhengAngle().toFixed(3)} lift=${sim.lockLift().toFixed(3)} rel=${sim.scoopRel(k).toFixed(3)} drops=${sim.drops.length}`,
    );
  }
}
const ms = performance.now() - t0;
console.log(`\n${n} steps in ${ms.toFixed(0)} ms → ${(ms / n).toFixed(3)} ms/step`);
console.log(`advances: ${advances.map((a) => deg(a)).join(" ")}`);
const periods = trips.slice(1).map((t, i) => (t - trips[i]).toFixed(2));
console.log(`trip periods: ${periods.join(" ")}`);
{
  const rel = sim.events.filter((e) => e.type === "release").map((e) => e.t);
  const locks = sim.events.filter((e) => e.type === "lock" && e.speed > 0.02).map((e) => e.t);
  let doubles = 0;
  for (let i = 0; i < rel.length; i++) {
    const end = rel[i + 1] ?? 1e9;
    if (locks.filter((t) => t > rel[i] && t < end).length > 1) doubles++;
  }
  const strikes = sim.events.filter((e) => e.type === "strike" && e.speed > 0.5).length;
  const lockSpeeds = sim.events.flatMap((e) => (e.type === "lock" ? [e.speed] : []));
  console.log(
    `SUMMARY releases=${rel.length} steps=${advances.length} doubleSteps=${doubles} strikes=${strikes} ` +
      `maxLockω=${Math.max(...lockSpeeds).toFixed(2)} wheel=${deg(sim.wheelAngle)}`,
  );
  const mis = releaseFill.filter((n) => n < 8).length;
  console.log(`RELEASES fill: ${releaseFill.join(" ")}  → mis-releases (<8 drops): ${mis}/${releaseFill.length} at ${misTimes.join(" ")}`);
}

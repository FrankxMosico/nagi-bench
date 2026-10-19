// 无头物理调试：bun tools/sim.ts [秒数] [初始水滴] [精细区间 a:b]
import RAPIER from "@dimforge/rapier3d-compat";
import { buildMachine, P, applyChainGeometry } from "../src/physics/machine";

await RAPIER.init();
// 参数覆盖：第 5 个参数形如 "solverIters@2,wheelDamping@60"
for (const kv of (process.argv[5] ?? "").split(",").filter(Boolean)) {
  const [k, v] = kv.split("@");
  (P as Record<string, number>)[k] = Number(v);
}
applyChainGeometry();
const secs = Number(process.argv[2] ?? 20);
const m = buildMachine(RAPIER, {
  initialFill: Number(process.argv[3] ?? 8),
  onContact: (a, b, t) => {
    if (a !== "cross" && b !== "cross" && a !== "tongue" && b !== "tongue") console.log(`  contact ${a}-${b} t=${t.toFixed(3)}`);
  },
});
const D = 180 / Math.PI;
const t0 = performance.now();
let lastLog = -1;
let steps = 0;
const stepTimes: number[] = [];
let moving = false;
const unwrap = () => {
  let last = 0, acc = 0, first = true;
  return (a: number) => {
    if (first) { first = false; last = a; return 0; }
    let d = a - last;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    acc += d; last = a;
    return acc;
  };
};
const uw = unwrap(), ut = unwrap(), uj = unwrap();
let wA = 0, tA = 0, jA = 0;
while (m.time < secs) {
  m.step();
  steps++;
  wA = uw(m.wheelAngle());
  tA = ut(m.tianzhuAngle());
  jA = uj(m.jilunAngle());
  const w = m.wheel.angvel().x;
  if (!moving && Math.abs(w) > 0.05) { moving = true; stepTimes.push(m.time); console.log(`  >> release t=${m.time.toFixed(3)} wheel=${(wA * D).toFixed(2)}`); }
  if (moving && Math.abs(w) < 0.01) { moving = false; console.log(`  << stop    t=${m.time.toFixed(3)} wheel=${(wA * D).toFixed(2)} tianzhu=${(tA * D).toFixed(2)} jilun=${(jA * D).toFixed(2)} globe=${(m.polarAngle(m.globe.obj) * D).toFixed(2)} arm=${(m.polarAngle(m.armillary.obj) * D).toFixed(2)}`); }
  for (const s of m.sounds.splice(0)) console.log(`  ♪ ${s.kind} t=${m.time.toFixed(3)} s=${s.strength.toFixed(2)}`);
  const fine = (process.argv[4] ?? "").split(":").map(Number);
  const rate = fine.length === 2 && m.time > fine[0] && m.time < fine[1] ? 40 : 2;
  if (Math.floor(m.time * rate) !== lastLog) {
    lastLog = Math.floor(m.time * rate);
    const fa = m.relAngle(m.ground, m.fork, "z") * D;
    const ba = m.relAngle(m.ground, m.bal, "z") * D;
    const j0 = m.relAngle(m.jacks[0].base, m.jacks[0].body, "z") * D;
    const j1 = m.relAngle(m.jacks[1].base, m.jacks[1].body, "z") * D;
    console.log(
      `t=${m.time.toFixed(2)} wheel=${(wA * D).toFixed(2)} tz=${(tA * D).toFixed(2)} jl=${(jA * D).toFixed(2)} fork=${fa.toFixed(1)} bal=${ba.toFixed(1)} drum=${j0.toFixed(1)} bell=${j1.toFixed(1)} water=${m.water.length}`,
    );
  }
}
console.log(`steps=${steps} wall=${(performance.now() - t0).toFixed(0)}ms per-step=${((performance.now() - t0) / steps).toFixed(3)}ms`);
console.log("release intervals:", stepTimes.map((t, i) => (i ? (t - stepTimes[i - 1]).toFixed(2) : t.toFixed(2))).join(" "));

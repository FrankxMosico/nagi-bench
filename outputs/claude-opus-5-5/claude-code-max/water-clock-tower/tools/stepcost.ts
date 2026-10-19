// 物理每步耗时随仿真时间的分布：bun tools/stepcost.ts [simSeconds]
import { RAPIER } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { applyInitialState } from '../src/sim/init';

await RAPIER.init();
const T = Number(process.argv[2] ?? 20);
const sim = new Sim();
applyInitialState(sim);
sim.profiling = true;
let bucket = 0, t0 = performance.now(), n = 0, worst = 0;
let p0 = { ...sim.prof };
while (sim.time < T) {
  const s0 = performance.now();
  sim.step();
  const d = performance.now() - s0;
  worst = Math.max(worst, d);
  n++;
  const b = Math.floor(sim.time / 0.5);
  if (b !== bucket) {
    const ms = performance.now() - t0;
    const p = sim.prof;
    const parts = ['refresh', 'water', 'world', 'events'].map((k) => `${k}=${((p[k as keyof typeof p] - p0[k as keyof typeof p0]) / n).toFixed(2)}`).join(' ');
    console.log(`sim ${(bucket * 0.5).toFixed(1)}-${(b * 0.5).toFixed(1)}  ${(ms / n).toFixed(2)} ms/step  worst ${worst.toFixed(1)}  ${parts}`);
    bucket = b; t0 = performance.now(); n = 0; worst = 0; p0 = { ...p };
  }
}

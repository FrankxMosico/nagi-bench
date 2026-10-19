// 影片排程检查：按 SCALE 表推进仿真，报告各机械事件在影片时间轴上的位置。
// bun tools/plan.ts [stationFill]
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { INIT, applyInitialState } from '../src/sim/init';
import { simTimeAt, filmTimeAt, FILM_LENGTH } from '../src/film/schedule';

await RAPIER.init();
if (process.argv[2] && process.argv[2] !== '-') INIT.stationFill = Number(process.argv[2]);
const hz = Number(process.argv[3] ?? 240);
const sim = new Sim(1 / hz);
applyInitialState(sim);
const end = simTimeAt(FILM_LENGTH);
let moving = false, mStart = 0;
const t0 = performance.now();
while (sim.time < end) {
  sim.step();
  const w = Math.abs(sim.esc.wheel.angvel().x);
  if (!moving && w > 0.02) { moving = true; mStart = sim.time; }
  if (moving && w < 0.004 && sim.time - mStart > 0.2) {
    moving = false;
    console.log(`step  sim ${mStart.toFixed(2)}→${sim.time.toFixed(2)}  film ${filmTimeAt(mStart).toFixed(2)}→${filmTimeAt(sim.time).toFixed(2)}  wheel=${(PlaneFrame.angleOf(sim.esc.wheel.rotation()) / DEG).toFixed(1)}°`);
  }
  for (const e of sim.drainEvents()) {
    if (e.type === 'pawl') continue;
    console.log(`  ${e.type.padEnd(5)} sim ${e.t.toFixed(2)}  film ${filmTimeAt(e.t).toFixed(2)}  s=${e.strength.toFixed(2)}`);
  }
}
console.log('done; sim end', end.toFixed(2), 'wall ms', (performance.now() - t0).toFixed(0));

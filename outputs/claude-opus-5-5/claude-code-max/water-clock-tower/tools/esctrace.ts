// 按影片时间打印慢放段内擒纵各部件的运动：bun tools/esctrace.ts [from] [to]
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';
import { applyInitialState } from '../src/sim/init';
import { simTimeAt, filmTimeAt } from '../src/film/schedule';

await RAPIER.init();
const from = Number(process.argv[2] ?? 12.0), to = Number(process.argv[3] ?? 16.5);
const sim = new Sim();
applyInitialState(sim);
let last = -1;
while (sim.time < simTimeAt(to)) {
  sim.step();
  for (const e of sim.drainEvents()) if (e.type !== 'pawl' && filmTimeAt(e.t) > from) console.log(`  [${e.type}] film ${filmTimeAt(e.t).toFixed(2)}`);
  const ft = filmTimeAt(sim.time);
  if (ft < from) continue;
  const k = Math.floor(ft * 10);
  if (k === last) continue;
  last = k;
  const esc = sim.esc;
  const lock = esc.lock.translation().y - (ESC.origin.y + esc.geo.lockBottom[1]);
  console.log(`film ${ft.toFixed(1)} fork=${(PlaneFrame.angleOf(esc.fork.rotation()) / DEG).toFixed(2)}° upper=${(-PlaneFrame.angleOf(esc.upper.rotation()) / DEG).toFixed(2)}° lock=${(lock * 100).toFixed(1)}cm w=${esc.wheel.angvel().x.toFixed(3)} wheel=${(PlaneFrame.angleOf(esc.wheel.rotation()) / DEG).toFixed(2)}°`);
}

// Bun 中的物理步进基准：分别关闭各子系统，找出开销所在
import { RAPIER } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { applyInitialState } from '../src/sim/init';

await RAPIER.init();
function run(label: string, setup: (s: Sim) => void, n = 1200, dt?: number) {
  const s = new Sim(dt);
  applyInitialState(s);
  setup(s);
  s.profiling = true;
  for (let i = 0; i < 200; i++) s.step();
  s.prof = { refresh: 0, water: 0, world: 0, events: 0, n: 0 };
  const t0 = performance.now();
  for (let i = 0; i < n; i++) s.step();
  const total = performance.now() - t0;
  const p = s.prof;
  console.log(label.padEnd(26), 'perStep', (total / n).toFixed(3), 'refresh', (p.refresh / n).toFixed(3), 'water', (p.water / n).toFixed(3), 'world', (p.world / n).toFixed(3), 'perSimSec', ((total / n) / s.dt / 1000).toFixed(3));
}
run('baseline', () => {});
run('no water particles', (s) => { s.water.flowScale = 0; s.water.aux.length = 0; });
run('solver iters 4', (s) => { s.world.numSolverIterations = 4; });
run('dt 1/120', () => {}, 600, 1 / 120);
run('dt 1/180', () => {}, 900, 1 / 180);

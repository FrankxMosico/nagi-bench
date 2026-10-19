// 诊断：仪器传动带来的额外阻力
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';

await RAPIER.init();
function run(label: string, setup: (s: Sim) => void) {
  const sim = new Sim();
  for (let i = 1; i <= 5; i++) sim.water.presetVolume(ESC.N - i, 0.0062 - i * 0.0004);
  setup(sim);
  let maxW = 0, steps = 0, moving = false, t0 = 0;
  const durs: number[] = [];
  while (sim.time < 16) {
    sim.step();
    const w = Math.abs(sim.esc.wheel.angvel().x);
    if (!moving && w > 0.02) { moving = true; t0 = sim.time; }
    if (moving && w < 0.004 && sim.time - t0 > 0.2) { moving = false; durs.push(sim.time - t0); steps++; }
    if (sim.time > 3) maxW = Math.max(maxW, w);
  }
  console.log(label.padEnd(32), 'maxW', maxW.toFixed(3), 'steps', steps, 'durs', durs.map((d) => d.toFixed(2)).join(','));
}
run('baseline', () => {});
run('tiny instrument inertia', (s) => { for (const i of s.inst) { i.body.setAdditionalMassProperties(1, { x: 0, y: 0, z: 0 }, { x: 0.05, y: 0.05, z: 0.05 }, { x: 0, y: 0, z: 0, w: 1 }, true); i.shaft.setAdditionalMassProperties(0.5, { x: 0, y: 0, z: 0 }, { x: 0.02, y: 0.05, z: 0.05 }, { x: 0, y: 0, z: 0, w: 1 }, true); } });
run('globe only (arm shaft off)', (s) => { s.inst[1].shaft.setEnabled(false); });
run('arm only (globe shaft off)', (s) => { s.inst[0].shaft.setEnabled(false); });
run('no instrument damping', (s) => { for (const i of s.inst) { i.body.setAngularDamping(0); i.shaft.setAngularDamping(0); } });
run('globe+arm disabled gears', (s) => { for (const i of s.inst) { i.shaft.setEnabled(false); } });
run('friction 0 on inst gears', (s) => {
  s.world.forEachCollider((c) => { const p = c.parent(); if (p && s.inst.some((i) => i.body.handle === p.handle || i.shaft.handle === p.handle)) c.setFriction(0); });
});

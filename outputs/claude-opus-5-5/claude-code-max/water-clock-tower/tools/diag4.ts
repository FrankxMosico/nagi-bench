// 诊断：质量变化后刷新拨销碰撞体形状，能否消除漂移
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';

await RAPIER.init();
function run(label: string, refresh: boolean, fill: number, flow = 0) {
  const sim = new Sim();
  const esc = sim.esc;
  sim.water.flowScale = flow;
  const pins = esc.scoopPinColliders.map((h) => sim.world.getCollider(h));
  const out: string[] = [];
  for (let i = 0; i < 60; i++) sim.step();
  if (fill) sim.water.presetVolume(0, fill);
  for (let i = 0; i < 480; i++) {
    sim.water.step(0); // no-op guard
    if (refresh) for (const p of pins) p.setShape(p.shape);
    sim.step();
    if (i % 60 === 0) out.push(((PlaneFrame.angleOf(esc.scoops[0].body.rotation()) - PlaneFrame.angleOf(esc.wheel.rotation())) / DEG).toFixed(2) + `/${(sim.water.vol[0] * 1000).toFixed(1)}L`);
  }
  console.log(label.padEnd(24), out.join(' '));
}
run('empty', false, 0);
run('empty refresh', true, 0);
run('3L', false, 0.003);
run('3L refresh', true, 0.003);
run('flow', false, 0, 1);
run('flow refresh', true, 0, 1);

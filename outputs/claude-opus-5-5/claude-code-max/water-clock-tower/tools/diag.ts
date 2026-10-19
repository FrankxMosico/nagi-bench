// 诊断：水斗质心、受力、格叉接触
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';
import { svgSnapshot } from './debugsvg';
import { writeFileSync, mkdirSync } from 'node:fs';

await RAPIER.init();
const sim = new Sim();
const esc = sim.esc;
const sc = esc.scoops[0];
const O = ESC.origin;
const show = (label: string) => {
  const com = sc.body.worldCom();
  const t = sc.body.translation();
  console.log(label, 'mass', sc.body.mass().toFixed(3), 'localCom', JSON.stringify(sc.body.localCom()),
    'com-pivot (u,v)=', (-(com.z - t.z)).toFixed(4), (com.y - t.y).toFixed(4),
    'rel', ((PlaneFrame.angleOf(sc.body.rotation()) - PlaneFrame.angleOf(esc.wheel.rotation())) / DEG).toFixed(2));
};
show('init');
sim.water.flowScale = 0;
for (let i = 0; i < 60; i++) sim.step();
show('after 0.25s empty');
// 接触：拨销与格叉
sim.world.contactPairsWith(sim.world.getCollider(esc.scoopPinColliders[0]), (c2) => console.log('pin0 contacts collider', c2.handle, esc.forkColliders.includes(c2.handle) ? '(fork)' : ''));
sim.water.presetVolume(0, 0.003);
for (let i = 0; i < 120; i++) sim.step();
show('3L');
sim.water.presetVolume(0, 0.006);
for (let i = 0; i < 120; i++) sim.step();
show('6L');
console.log('fork angle', (PlaneFrame.angleOf(esc.fork.rotation()) / DEG).toFixed(3));
mkdirSync('tools/out', { recursive: true });
writeFileSync('tools/out/zoom.html', `<html><body style="margin:0">${svgSnapshot(sim, { u0: -0.5, u1: 1.6, v0: 1.1, v1: 2.6, px: 700, label: 'zoom' })}</body></html>`);

// 诊断：预置 3L 后水斗枢轴位置、拨销位置、格叉碰撞体位置随时间变化
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';

await RAPIER.init();
const sim = new Sim();
const esc = sim.esc;
const O = ESC.origin;
sim.water.flowScale = 0;
for (let i = 0; i < 60; i++) sim.step();
sim.water.presetVolume(0, 0.003);
const pin = sim.world.getCollider(esc.scoopPinColliders[0]);
const shelf = sim.world.getCollider(esc.forkColliders[0]);
const ramp = sim.world.getCollider(esc.forkColliders[1]);
const uv = (p: { x: number; y: number; z: number }) => `(${(-(p.z - O.z)).toFixed(4)},${(p.y - O.y).toFixed(4)})`;
for (let i = 0; i < 100; i++) {
  sim.step();
  if (i % 10 === 0) {
    const b = esc.scoops[0].body;
    let info = '';
    for (const [name, c] of [['shelf', shelf], ['ramp', ramp]] as const) {
      sim.world.contactPair(pin, c, (m) => {
        info += ` ${name}:np=${m.numContacts()}`;
        for (let k = 0; k < m.numContacts(); k++) info += ` [d=${m.contactDist(k).toFixed(4)} imp=${m.contactImpulse(k).toFixed(3)}]`;
      });
    }
    console.log(`t=${sim.time.toFixed(3)} pin=${uv(pin.translation())} shelf=${uv(shelf.translation())} ramp=${uv(ramp.translation())} angle=${(PlaneFrame.angleOf(b.rotation()) / DEG).toFixed(2)} fork=${(PlaneFrame.angleOf(esc.fork.rotation()) / DEG).toFixed(3)} forkPos=${uv(esc.fork.translation())}${info}`);
  }
}

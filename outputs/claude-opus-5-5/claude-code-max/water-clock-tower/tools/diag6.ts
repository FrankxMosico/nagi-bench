// 诊断：列出传动链上有冲量的接触对
import { RAPIER } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';

await RAPIER.init();
const T = Number(process.argv[2] ?? 3.0);
const sim = new Sim();
for (let i = 1; i <= 5; i++) sim.water.presetVolume(ESC.N - i, 0.0062 - i * 0.0004);
while (sim.time < T) sim.step();
const names = new Map<number, string>();
const nameBody = (b: RAPIER.RigidBody | null) => {
  if (!b) return 'none';
  if (b.handle === sim.esc.wheel.handle) return 'wheel';
  if (b.handle === sim.drv.tianzhu.handle) return '天柱';
  if (b.handle === sim.drv.jilun.handle) return '机轮';
  if (b.handle === sim.drv.bell.handle) return 'bell';
  if (b.handle === sim.ground.handle) return 'ground';
  if (b.handle === sim.esc.lock.handle) return 'lock';
  if (b.handle === sim.esc.fork.handle) return 'fork';
  const li = sim.drv.levers.findIndex((l) => l.body.handle === b.handle);
  if (li >= 0) return 'lever-' + sim.drv.levers[li].spec.kind;
  const si = sim.esc.scoops.findIndex((s) => s.body.handle === b.handle);
  if (si >= 0) return 'scoop' + si;
  return 'body' + b.handle;
};
void names;
const seen = new Set<string>();
sim.world.forEachCollider((c1) => {
  sim.world.contactPairsWith(c1, (c2) => {
    const key = [c1.handle, c2.handle].sort().join('-');
    if (seen.has(key)) return;
    seen.add(key);
    sim.world.contactPair(c1, c2, (m) => {
      let imp = 0;
      for (let i = 0; i < m.numContacts(); i++) imp += m.contactImpulse(i);
      const n1 = nameBody(c1.parent()), n2 = nameBody(c2.parent());
      if (n1.startsWith('scoop') && n2.startsWith('scoop')) return;
      if (m.numContacts() > 0) console.log(`${n1} <-> ${n2}  np=${m.numContacts()} imp=${imp.toFixed(4)} dist=${m.numContacts() ? m.contactDist(0).toFixed(4) : '-'} subshape=${m.subshape1()}/${m.subshape2()}`);
    });
  });
});

// 无头仿真调试：bun tools/simtest.ts [秒数] [快照时刻,逗号分隔] [-v] [-w t0,t1] [-p uv|xy|xz]
import { RAPIER, PlaneFrame, DEG } from '../src/sim/core';
import { Sim } from '../src/sim/sim';
import { ESC } from '../src/sim/escapement';
import { svgSnapshot, type SvgOpts } from './debugsvg';
import { writeFileSync, mkdirSync } from 'node:fs';

await RAPIER.init();
const T = Number(process.argv[2] ?? 12);
const shots = (process.argv[3] ?? '').split(',').filter(Boolean).map(Number);
const verbose = process.argv.includes('-v');
const wi = process.argv.indexOf('-w');
const win = wi > 0 ? process.argv[wi + 1].split(',').map(Number) : null;
const pi = process.argv.indexOf('-p');
const projMode = (pi > 0 ? process.argv[pi + 1] : 'uv') as 'uv' | 'xy' | 'xz';
const sim = new Sim();
const esc = sim.esc;
const drv = sim.drv;

for (let i = 1; i <= 5; i++) sim.water.presetVolume(ESC.N - i, 0.0062 - i * 0.0004);

const ang = (b: RAPIER.RigidBody) => PlaneFrame.angleOf(b.rotation()) / DEG;
const angY = (b: RAPIER.RigidBody) => (2 * Math.atan2(b.rotation().y, b.rotation().w)) / DEG;
const angZ = (b: RAPIER.RigidBody) => (2 * Math.atan2(b.rotation().z, b.rotation().w)) / DEG;
const viewOf: Record<string, SvgOpts> = {
  uv: { u0: -2.1, u1: 2.3, v0: -2.1, v1: 2.75, px: 180, proj: 'uv' },
  xy: { u0: -1.6, u1: 0.5, v0: 4.3, v1: 5.5, px: 600, proj: 'xy' },
  xz: { u0: -1.6, u1: 1.1, v0: -2.4, v1: 0.6, px: 300, proj: 'xz' },
};
mkdirSync('tools/out', { recursive: true });
const svgs: string[] = [];
let nextShot = 0;
const sorted = shots.slice().sort((a, b) => a - b);
let lastLog = -1;
let moving = false;
let moveStart = 0, angStart = 0, maxLock = 0, maxW = 0, tzStart = 0, jlStart = 0;
let unwrapped = 0, prevA = ang(esc.wheel);
let tzU = 0, tzPrev = angY(drv.tianzhu), jlU = 0, jlPrev = angY(drv.jilun);
const unwrap = (d: number) => (d > 180 ? d - 360 : d < -180 ? d + 360 : d);
// 绕极轴的转角
const P = { x: 0, y: Math.sin(35 * DEG), z: -Math.cos(35 * DEG) };
const angP = (b: RAPIER.RigidBody) => { const q = b.rotation(); return (2 * Math.atan2(q.x * P.x + q.y * P.y + q.z * P.z, q.w)) / DEG; };
const instU = sim.inst.map(() => 0), instPrev = sim.inst.map((i) => angP(i.body)), instStart = sim.inst.map(() => 0);
const t0 = performance.now();
while (sim.time < T) {
  if (nextShot < sorted.length && sim.time >= sorted[nextShot] - 1e-9) {
    svgs.push(svgSnapshot(sim, { ...viewOf[projMode], label: `t=${sim.time.toFixed(2)}s` }));
    nextShot++;
  }
  sim.step();
  const a = ang(esc.wheel);
  unwrapped += unwrap(a - prevA); prevA = a;
  const ty = angY(drv.tianzhu); tzU += unwrap(ty - tzPrev); tzPrev = ty;
  const jy = angY(drv.jilun); jlU += unwrap(jy - jlPrev); jlPrev = jy;
  sim.inst.forEach((ins, i) => { const v = angP(ins.body); instU[i] += unwrap(v - instPrev[i]); instPrev[i] = v; });
  const w = Math.abs(esc.wheel.angvel().x);
  const lockY = esc.lock.translation().y - (ESC.origin.y + esc.geo.lockBottom[1]);
  for (const e of sim.drainEvents()) if (verbose || e.type !== 'pawl') console.log(`  [${e.type}] t=${e.t.toFixed(3)} s=${e.strength.toFixed(3)} wheel=${unwrapped.toFixed(2)}°`);
  if (!moving && w > 0.02) { moving = true; moveStart = sim.time; angStart = unwrapped; maxLock = 0; maxW = 0; tzStart = tzU; jlStart = jlU; instU.forEach((v, i) => (instStart[i] = v)); }
  if (moving) { maxLock = Math.max(maxLock, lockY); maxW = Math.max(maxW, w); }
  if (moving && w < 0.004 && sim.time - moveStart > 0.2) {
    moving = false;
    console.log(`STEP t=${moveStart.toFixed(2)}→${sim.time.toFixed(2)} Δ=${(unwrapped - angStart).toFixed(2)}° total=${unwrapped.toFixed(2)}° maxW=${maxW.toFixed(2)} maxLock=${(maxLock * 100).toFixed(1)}cm 天柱Δ=${(tzU - tzStart).toFixed(1)}° 机轮Δ=${(jlU - jlStart).toFixed(1)}° 机轮=${jlU.toFixed(1)}° 象/仪Δ=${instU.map((v, i) => (v - instStart[i]).toFixed(1)).join('/')}°`);
  }
  if (win && sim.time >= win[0] && sim.time <= win[1] && sim.steps % 6 === 0) {
    console.log(`  t=${sim.time.toFixed(3)} wheel=${unwrapped.toFixed(2)}° w=${w.toFixed(3)} lock=${(lockY * 100).toFixed(2)}cm fork=${ang(esc.fork).toFixed(2)}° 天柱=${tzU.toFixed(1)} 机轮=${jlU.toFixed(2)} levers=${drv.levers.map((l) => angZ(l.body).toFixed(1)).join('/')} bell=${angZ(drv.bell).toFixed(1)}`);
  }
  if (verbose && Math.floor(sim.time * 10) !== lastLog) {
    lastLog = Math.floor(sim.time * 10);
    console.log(`t=${sim.time.toFixed(1)} wheel=${unwrapped.toFixed(2)}° 天柱=${tzU.toFixed(1)}° 机轮=${jlU.toFixed(1)}° levers=${drv.levers.map((l) => angZ(l.body).toFixed(1)).join('/')} parts=${sim.water.activeCount()}`);
  }
}
console.log('sim time', T, 'wall ms', (performance.now() - t0).toFixed(0), 'absorbed', sim.water.absorbedTotal, 'emitted', sim.water.emittedTotal, 'spilled', sim.water.spilledTotal);
if (svgs.length) writeFileSync('tools/out/snap.html', `<html><body style="margin:0;display:flex;flex-wrap:wrap;gap:4px;background:#ccc">${svgs.join('\n')}</body></html>`);

import { ClockPhysics, STEP } from '../src/physics.js';
const clock = new ClockPhysics();
const samples = [];
for (let i = 0; i < 30 / STEP; i++) {
  clock.step();
  if (i % 1200 === 0) samples.push(clock.state());
  for (const r of clock.rotors) if (!Number.isFinite(r.q) || !Number.isFinite(r.v)) throw Error('Non-finite body state');
  clock.takeEvents();
}
console.log('30 s:', JSON.stringify(clock.state(), null, 2));
if (clock.stepCount < 8 || clock.strikes < 2) throw Error('Insufficient causal motion');
if (clock.maxConstraintError > .002) throw Error('Constraint drift');
clock.flow = false;
for (let i = 0; i < 25 / STEP; i++) clock.step();
const stopped = clock.wheel.q;
for (let i = 0; i < 10 / STEP; i++) clock.step();
if (Math.abs(clock.wheel.q - stopped) > .001) throw Error('Wheel moves without water supply');
console.log('Water-off: stopped at', stopped, 'radians.');
const dry = new ClockPhysics(); dry.flow = false;
for (let i = 0; i < 10 / STEP; i++) dry.step();
if (dry.wheel.q !== 0 || dry.stepCount !== 0) throw Error('Unpowered mechanism moved');
const a = new ClockPhysics(), b = new ClockPhysics();
for(let i=0;i<2400;i++){a.step();b.step();}
if (a.wheel.q !== b.wheel.q) throw Error('Simulation not deterministic');
console.log('PASS: load-driven motion, transmission constraints, bell contacts, dry start, water-off, deterministic replay.');

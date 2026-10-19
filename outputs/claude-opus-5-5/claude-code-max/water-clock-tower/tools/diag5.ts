// 最小复现：每步调用 setAdditionalMassProperties 是否导致接触流形陈旧
import { RAPIER, DEG, PlaneFrame, revolute, qAxis } from '../src/sim/core';

await RAPIER.init();
function test(label: string, everyStep: boolean, mass: number) {
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  world.timestep = 1 / 240;
  const g = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.05, 0.015, 0.055).setTranslation(0.05, -0.015, 0).setRotation(qAxis(1, 0, 0, 0.3)), g);
  const b = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 0.021, 0.2).setCanSleep(false));
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.1, 0.05, 0.05).setTranslation(0, 0.1, -0.1).setDensity(300), b);
  world.createCollider(RAPIER.ColliderDesc.capsule(0.075, 0.02).setRotation(qAxis(0, 0, 1, -Math.PI / 2)).setTranslation(0.05, 0, -0.2), b);
  revolute(world, g, b, { x: 0, y: 0.021, z: 0.2 }, { x: 0, y: 0, z: 0 }, undefined, [-20 * DEG, 20 * DEG]);
  for (let i = 0; i < 120; i++) world.step();
  const out: string[] = [];
  for (let i = 0; i < 480; i++) {
    if (everyStep || i === 0) b.setAdditionalMassProperties(mass, { x: 0, y: 0.05, z: -0.1 }, { x: 0.01, y: 0.01, z: 0.01 }, { x: 0, y: 0, z: 0, w: 1 }, true);
    if (i === 100) b.applyTorqueImpulse({ x: 0.05, y: 0, z: 0 }, true);
    world.step();
    if (i % 40 === 0) out.push((PlaneFrame.angleOf(b.rotation()) / DEG).toFixed(2));
  }
  console.log(label.padEnd(30), out.join(' '));
}
test('once', false, 3);
test('every step', true, 3);
test('every step, growing', true, 3);

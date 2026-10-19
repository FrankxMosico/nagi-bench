import RAPIER from '@dimforge/rapier3d-compat';
await RAPIER.init();
console.log('version', RAPIER.version());
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
world.timestep = 1 / 120;
const ground = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
world.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.1, 10), ground);
const bodies = [];
for (let i = 0; i < 300; i++) {
  const b = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation((i % 10) * 0.1, 1 + Math.floor(i / 10) * 0.1, 0));
  world.createCollider(RAPIER.ColliderDesc.ball(0.02), b);
  bodies.push(b);
}
const t0 = performance.now();
for (let i = 0; i < 1200; i++) world.step();
console.log('1200 steps ms', performance.now() - t0, bodies[0].translation());

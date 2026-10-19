// 诊断：去掉格叉后水斗往哪边转；单摆验证转动副方向与限位符号
import { RAPIER, PlaneFrame, DEG, revolute } from '../src/sim/core';
import { Sim } from '../src/sim/sim';

await RAPIER.init();
{
  const sim = new Sim();
  const esc = sim.esc;
  sim.water.flowScale = 0;
  for (const h of esc.forkColliders) sim.world.getCollider(h).setEnabled(false);
  sim.water.presetVolume(0, 0.003);
  for (let i = 0; i < 240; i++) sim.step();
  const rel = (PlaneFrame.angleOf(esc.scoops[0].body.rotation()) - PlaneFrame.angleOf(esc.wheel.rotation())) / DEG;
  console.log('no fork, 3L: rel', rel.toFixed(2));
}
{
  // 单摆：质心在枢轴 +u 侧，限位 [-11°, 6°]
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  const g = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  const b = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 1, 0));
  world.createCollider(RAPIER.ColliderDesc.ball(0.05).setTranslation(0, 0, -0.3).setDensity(1000), b); // u=+0.3
  const j = revolute(world, g, b, { x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 0 }, undefined, [-11 * DEG, 6 * DEG]);
  for (let i = 0; i < 240; i++) world.step();
  console.log('pendulum (com at +u): angle', (PlaneFrame.angleOf(b.rotation()) / DEG).toFixed(2), 'limits', j.limitsMin(), j.limitsMax());
  // 反过来：ground 作为 body2
  const b2 = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 3, 0));
  world.createCollider(RAPIER.ColliderDesc.ball(0.05).setTranslation(0, 0, -0.3).setDensity(1000), b2);
  revolute(world, b2, g, { x: 0, y: 0, z: 0 }, { x: 0, y: 3, z: 0 }, undefined, [-11 * DEG, 6 * DEG]);
  for (let i = 0; i < 240; i++) world.step();
  console.log('pendulum reversed bodies: angle', (PlaneFrame.angleOf(b2.rotation()) / DEG).toFixed(2));
}

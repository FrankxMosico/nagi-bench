/*
 * Boots the real GameClient + renderer + HUD under Node with mocked three.js / DOM / Web Audio /
 * React, then drives a scripted session (menu → match → shooting, buying, spectating, takeover,
 * planting, defusing, explosion, match over → menu). Catches runtime errors in the browser-side
 * code paths that the headless simulation test cannot reach.
 *
 *   node --expose-internals --no-warnings --import ./tests/smoke/register.mjs tests/smoke/smoke.mjs
 */
import { createHost, installDom, pumpFrame } from './mocks/dom.mjs';

installDom();
const { createElement: h, render, flushEffects, findAll, textOf } = await import('./mocks/react.mjs');
const { roots } = await import('./mocks/react-dom-client.mjs');
const { GameClient } = await import('../../src/client/GameClient.ts');
const { Hud } = await import('../../src/ui/Hud.tsx');
const { ClientContext } = await import('../../src/ui/context.ts');
const App = (await import('../../src/App.tsx')).default;

let failures = 0;
function check(cond, msg) {
  if (cond) console.log(`  ok   ${msg}`);
  else {
    failures++;
    console.log(`  FAIL ${msg}`);
  }
}

let t = 0;
function frames(n) {
  for (let i = 0; i < n; i++) {
    t += 1000 / 60;
    pumpFrame(t);
  }
}
const key = (code, down = true) => window.dispatch(down ? 'keydown' : 'keyup', { code });
const tap = (code) => {
  key(code, true);
  frames(2);
  key(code, false);
};
const mouse = (button, down = true) => document.dispatch(down ? 'mousedown' : 'mouseup', { button });
const look = (dx, dy) => document.dispatch('mousemove', { movementX: dx, movementY: dy });

console.log('[app mount]');
{
  render(h(App, null));
  const cleanups = flushEffects();
  frames(5);
  for (const c of cleanups) c();
  check(true, 'App mounts and unmounts (GameClient created + disposed)');
  await import('../../src/main.tsx');
  frames(3);
  check(roots.length === 1 && roots[0].tree !== null, 'main.tsx renders through createRoot');
  for (const r of roots) r.unmount();
}

console.log('[session]');
const client = new GameClient(createHost('div'));
let hudCleanups = [];
function renderHud() {
  for (const c of hudCleanups) c();
  const tree = render(h(ClientContext.Provider, { value: client }, h(Hud, null)));
  hudCleanups = flushEffects();
  frames(1);
  return tree;
}
const button = (tree, label) => findAll(tree, (n) => n.tag === 'button' && textOf(n).includes(label))[0];
const lock = () => {
  document.pointerLockElement = client.renderer.canvas;
  document.dispatch('pointerlockchange');
};

let tree = renderHud();
frames(20);
check(textOf(tree).includes('开始游戏'), 'main menu rendered');
button(tree, '恐怖分子')?.props.onClick();
button(tree, '反恐精英')?.props.onClick();
check(client.settings.team === 'CT', 'team toggle updates settings');
tree = renderHud();
button(tree, '开始游戏').props.onClick();
lock();
frames(10);
let snap = client.hud.getSnapshot();
check(snap.screen === 'playing' && snap.started, 'match started, screen = playing');
check(snap.roundLabel === '手枪局', `round 1 is a pistol round (${snap.roundLabel})`);
const g0 = client.game;
const me = g0.human;
check(me.primary === null && me.secondary.def.id === 'usp', 'CT human spawns with USP only');

// Buy menu during freeze time (pistol round: pistols only).
tap('KeyB');
frames(3);
tree = renderHud();
check(client.hud.getSnapshot().buyOpen && textOf(tree).includes('Desert Eagle'), 'buy menu opens with pistols');
tap('Digit1');
frames(3);
check(me.secondary.def.id === 'deagle', 'bought a Desert Eagle');

// Wait for live, then move / look / shoot / reload / switch.
frames(60 * 5);
check(g0.phase === 'live', 'round went live after freeze time');
key('KeyW');
look(120, -20);
frames(60);
key('KeyW', false);
mouse(0);
frames(3);
mouse(0, false);
frames(20);
mouse(0);
frames(3);
mouse(0, false);
frames(10);
check(me.secondary.mag < 7, `firing consumes ammo (mag ${me.secondary.mag}/7)`);
tree = renderHud();
check(textOf(tree).includes('Desert Eagle'), 'HUD shows weapon');
tap('KeyR');
frames(60 * 3);
check(me.secondary.mag === 7, 'reload refills the magazine');
tap('Digit3');
frames(40);
check(me.activeSlot === 'melee', 'switched to knife');
mouse(0);
frames(30);
mouse(0, false);
mouse(2);
frames(30);
mouse(2, false);
tap('KeyQ');
frames(40);
check(me.activeSlot === 'secondary', 'Q returns to previous weapon');
key('Tab');
frames(10);
tree = renderHud();
check(client.hud.getSnapshot().scoreboardOpen && textOf(tree).includes('反恐精英'), 'scoreboard visible while Tab held');
key('Tab', false);

// Pause / resume.
document.exitPointerLock();
frames(2);
tree = renderHud();
check(client.hud.getSnapshot().screen === 'paused' && textOf(tree).includes('继续游戏'), 'unlocking pointer pauses the game');
button(tree, '继续游戏').props.onClick();
lock();
frames(5);
check(client.hud.getSnapshot().screen === 'playing', 'resume returns to playing');

// Let bots play for a while, rendering the HUD periodically.
for (let k = 0; k < 20; k++) {
  frames(60);
  renderHud();
}
check(true, 'bots played 20 s with HUD/minimap/crosshair updates');

// Death → spectate → take over a bot.
const g = client.game;
const kill = (s) => g.killSoldier(s, null, 'world', false);
if (g.phase !== 'live') frames(60 * 10);
if (me.alive) kill(me);
frames(60 * 2.2);
tree = renderHud();
snap = client.hud.getSnapshot();
check(snap.spectating !== null || g.phase !== 'live', `spectating a teammate after death (${snap.spectating?.name ?? g.phase})`);
mouse(0);
frames(2);
mouse(0, false);
frames(2);
if (g.canTakeOver()) {
  const target = g.spectateId;
  tap('KeyE');
  frames(5);
  check(g.controlledId === target && g.controlled.alive, `took over bot ${g.controlled.name}`);
  tree = renderHud();
  key('KeyW');
  look(-200, 10);
  frames(30);
  key('KeyW', false);
} else {
  check(false, 'expected a teammate to take over');
}

// Next round: force a plant next to the CT human, wipe the Ts, defuse with E.
function nextRound() {
  const r = g.roundNumber;
  for (let k = 0; k < 60 * 130 && g.roundNumber === r; k++) frames(1);
  frames(60 * 4.2);
}
nextRound();
check(g.roundType === 'rifle' && g.human.primary?.def.id === 'm4a4', `round ${g.roundNumber} is a rifle round with M4A4`);
check(g.phase === 'live', 'second round live');
{
  const c = g.controlled;
  g.bomb = { ...g.bomb, state: 'planted', carrierId: -1, pos: { x: c.pos.x + 0.6, y: c.pos.y, z: c.pos.z }, site: 'A', plantedAt: g.time, explodeAt: g.time + 40, defuserId: -1, nextBeep: g.time + 0.5 };
  for (const s of g.soldiers) {
    if (s.hasBomb) s.hasBomb = false;
    if (s.team === 'T' && s.alive) kill(s);
  }
  frames(5);
  check(g.phase === 'live', 'round continues after Ts die because the bomb is planted');
  key('KeyE');
  frames(30);
  tree = renderHud();
  check(client.hud.getSnapshot().progress !== null, 'defuse progress bar shown');
  frames(60 * 5.5);
  key('KeyE', false);
  check(g.bomb.state === 'defused' && g.lastWinner === 'CT', `defused with kit → CT wins (${g.lastReason})`);
}

// Rifle round as CT: scope an AWP via the buy menu.
nextRound();
{
  const c = g.controlled;
  if (g.phase !== 'live') frames(60 * 4);
  g.liveStartedAt = g.time;
  tap('KeyB');
  frames(2);
  const items = client.hud.getSnapshot().buyItems;
  const awp = items.find((i) => i.id === 'awp');
  if (awp) tap(`Digit${awp.key}`);
  frames(70);
  check(c.primary?.def.id === 'awp', 'bought an AWP');
  mouse(2);
  frames(2);
  mouse(2, false);
  frames(10);
  check(c.scope === 1 && client.frame.scope === 1, 'right click scopes the AWP');
  check(client.renderer.currentFov < 70, `scoped FOV narrows (${client.renderer.currentFov.toFixed(1)}°)`);
  mouse(0);
  frames(2);
  mouse(0, false);
  frames(5);
  check(c.scope === 0, 'AWP unscopes during bolt cycle');
  frames(90);
  check(c.scope === 1, 'AWP re-scopes after bolt cycle');
}

client.quitToMenu();
frames(5);
check(client.hud.getSnapshot().screen === 'menu', 'quit to menu');

// T side: plant, explosion, match over.
console.log('[T side]');
client.updateSettings({ team: 'T', firstRound: 'rifle' });
client.startMatch();
lock();
const gt = client.game;
const tk = (s) => gt.killSoldier(s, null, 'world', false);
frames(60 * 4.5);
{
  const m = gt.human;
  check(m.primary?.def.id === 'ak47' && m.secondary?.def.id === 'glock', 'T human has AK-47 + Glock in rifle round');
  for (const s of gt.soldiers) s.hasBomb = false;
  m.hasBomb = true;
  gt.bomb.state = 'carried';
  gt.bomb.carrierId = m.id;
  // Deterministic: keep a single CT alive, parked on B, so nobody interrupts the plant.
  const cts = gt.soldiers.filter((s) => s.team === 'CT');
  cts.slice(1).forEach(tk);
  cts[0].pos.x = 12;
  cts[0].pos.y = 0;
  cts[0].pos.z = 12;
  const spot = gt.def.plantSpots.A[0];
  m.pos.x = spot.x;
  m.pos.y = spot.y;
  m.pos.z = spot.z;
  frames(2);
  tap('Digit5');
  frames(45);
  check(m.activeSlot === 'bomb', 'selected C4');
  tree = renderHud();
  check((client.hud.getSnapshot().hint ?? '').includes('安放'), `plant hint shown (${client.hud.getSnapshot().hint})`);
  mouse(0);
  frames(60 * 3.5);
  mouse(0, false);
  check(gt.bomb.state === 'planted' && gt.bomb.site === 'A', `human planted the C4 on A (bomb ${gt.bomb.state}, alive ${m.alive}, hp ${m.health}, phase ${gt.phase}, slot ${m.activeSlot}, onGround ${m.onGround}, site ${gt.siteAt(m.pos)}, pos ${m.pos.x.toFixed(1)},${m.pos.y.toFixed(2)},${m.pos.z.toFixed(1)})`);
  tree = renderHud();
  check(client.hud.getSnapshot().bombPlanted, 'HUD shows bomb planted');
  gt.bomb.explodeAt = gt.time + 0.5;
  frames(60);
  check(gt.bomb.state === 'exploded' && gt.lastWinner === 'T', `C4 exploded → T wins (${gt.lastReason})`);
}
gt.score.T = 7;
{
  const r = gt.roundNumber;
  for (let k = 0; k < 60 * 10 && gt.roundNumber === r; k++) frames(1);
  frames(60 * 4.2);
  for (const s of gt.soldiers) if (s.team === 'CT' && s.alive) tk(s);
  frames(60 * 6);
  tree = renderHud();
  check(gt.phase === 'over' && client.hud.getSnapshot().matchOver?.winner === 'T', 'match over at 8 wins');
  check(textOf(tree).includes('再来一局'), 'match-over panel rendered');
  button(tree, '返回主菜单').props.onClick();
  frames(3);
  check(client.hud.getSnapshot().screen === 'menu', 'back to menu from match over');
}

for (const c of hudCleanups) c();
client.dispose();
frames(3);
check(true, 'client disposed cleanly');

console.log(failures === 0 ? '\nSMOKE TEST PASSED' : `\n${failures} SMOKE CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

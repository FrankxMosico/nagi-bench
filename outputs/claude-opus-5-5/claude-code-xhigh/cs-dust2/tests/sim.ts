/*
 * Headless verification of the simulation core (no three.js / DOM needed):
 *   node --experimental-strip-types tests/sim.ts
 * Checks map connectivity, collision, damage rules, and plays full all-bot 5v5 matches.
 */
import { Game, getMapResources } from '../src/engine/game.ts';
import { DUST2 } from '../src/engine/map/dust2.ts';
import { computeDamage, ZONE_MULTIPLIER, WEAPONS } from '../src/engine/weapons.ts';
import { vec3 } from '../src/engine/math.ts';
import type { Vec3 } from '../src/engine/math.ts';

let failures = 0;
function check(cond: boolean, msg: string): void {
  if (cond) console.log(`  ok   ${msg}`);
  else {
    failures++;
    console.log(`  FAIL ${msg}`);
  }
}

const t0 = performance.now();
const res = getMapResources(DUST2);
console.log(`map built: ${res.built.boxes.length} boxes, ${res.built.ramps.length} ramps, nav ${res.nav.w}x${res.nav.h} in ${(performance.now() - t0).toFixed(0)} ms`);
let walkable = 0;
for (let i = 0; i < res.nav.walk.length; i++) walkable += res.nav.walk[i];
console.log(`walkable nav cells: ${walkable}`);

// ── 1. Connectivity between all key areas (Dust2 routes) ──
console.log('\n[connectivity]');
const P = (x: number, y: number, z: number) => vec3(x, y, z);
const areas: Record<string, Vec3> = {
  'T Spawn': P(52, 0, 89),
  'CT Spawn': P(52, 1.2, 10),
  'Long A': P(90, 0, 40),
  'Long Doors': P(77, 0, 65),
  'Outside Long': P(69, 0, 75),
  'Pit': P(91, 0, 75),
  'A Site': P(78, 2.4, 16),
  'Catwalk': P(52.5, 2.4, 35),
  'A Short': P(64, 2.4, 28),
  'Mid': P(45, 0, 50),
  'Mid Doors (north side)': P(45, 0, 32),
  'Top Mid': P(46, 0, 74),
  'CT Mid': P(42, 0, 27),
  'B Doors': P(31, 0, 26),
  'B Site': P(16, 0, 20),
  'Upper Tunnels': P(11.5, 0, 45),
  'Lower Tunnels': P(28, 0, 47),
  'Outside Tunnels': P(31, 0, 83),
};
const names = Object.keys(areas);
for (const name of names) {
  const c = res.nav.nearestWalkable(areas[name].x, areas[name].z, areas[name].y);
  check(c >= 0, `${name} has walkable nav cell`);
}
let worst = 0;
for (const a of ['T Spawn', 'CT Spawn']) {
  for (const b of names) {
    if (a === b) continue;
    const t = performance.now();
    const path = res.nav.findPath(areas[a], areas[b]);
    worst = Math.max(worst, performance.now() - t);
    check(path !== null && path.length > 0, `path ${a} -> ${b}${path ? ` (${path.length} pts, expanded ${res.nav.lastExpanded})` : ''}`);
  }
}
console.log(`  worst A* time: ${worst.toFixed(1)} ms`);

// Route waypoints all reachable in sequence.
for (const [rname, pts] of Object.entries(DUST2.routes)) {
  let prev = rname.startsWith('long') || rname.startsWith('tunnels') || rname.startsWith('short') || rname.startsWith('mid') ? areas['T Spawn'] : pts[0];
  let ok = true;
  for (const p of pts) {
    if (!res.nav.findPath(prev, p)) ok = false;
    prev = p;
  }
  check(ok, `route "${rname}" fully navigable`);
}
for (const site of ['A', 'B'] as const) {
  for (const h of [...DUST2.ctHolds[site], ...DUST2.tHolds[site]]) {
    check(res.nav.findPath(areas['CT Spawn'], h.pos) !== null && res.nav.findPath(areas['T Spawn'], h.pos) !== null, `hold "${h.label}" reachable`);
  }
  for (const p of DUST2.plantSpots[site]) {
    const s = { x0: DUST2.bombSites[site].x0, x1: DUST2.bombSites[site].x1, z0: DUST2.bombSites[site].z0, z1: DUST2.bombSites[site].z1 };
    check(p.x >= s.x0 && p.x <= s.x1 && p.z >= s.z0 && p.z <= s.z1, `plant spot (${p.x},${p.z}) inside bomb site ${site}`);
  }
}

// ── 2. Collision: running into walls never penetrates ──
console.log('\n[collision]');
{
  const w = res.world;
  const body = { pos: vec3(45, 0, 50), vel: vec3(), radius: 0.35, height: 1.8, onGround: true };
  // Run west in mid into the wall for 3 seconds.
  for (let i = 0; i < 180; i++) {
    body.vel.x = -6;
    body.vel.z = 0;
    w.moveBody(body, 1 / 60);
  }
  check(body.pos.x >= 40 + 0.35 - 1e-3 && body.pos.x < 40.5, `mid west wall stops body at x=${body.pos.x.toFixed(3)}`);
  // Run into the mid doors leaf diagonally and through the gap.
  body.pos = vec3(45, 0, 40);
  for (let i = 0; i < 240; i++) {
    body.vel.x = 0;
    body.vel.z = -6;
    w.moveBody(body, 1 / 60);
  }
  check(body.pos.z < 31, `walks north through the mid doors gap (z=${body.pos.z.toFixed(2)})`);
  body.pos = vec3(41.5, 0, 40);
  for (let i = 0; i < 240; i++) {
    body.vel.x = 0;
    body.vel.z = -6;
    w.moveBody(body, 1 / 60);
  }
  check(body.pos.z > 36.4 + 0.3, `blocked by the mid doors frame (z=${body.pos.z.toFixed(2)})`);
  // Walk up the catwalk stairs.
  body.pos = vec3(52.5, 0, 60);
  for (let i = 0; i < 300; i++) {
    body.vel.x = 0;
    body.vel.z = -5;
    w.moveBody(body, 1 / 60);
  }
  check(Math.abs(body.pos.y - 2.4) < 0.05 && body.pos.z < 44, `climbs catwalk stairs to y=${body.pos.y.toFixed(2)} z=${body.pos.z.toFixed(1)}`);
  // Can't walk up the A-site ledge from Long A.
  body.pos = vec3(85.2, 0, 30);
  body.onGround = true;
  for (let i = 0; i < 200; i++) {
    body.vel.x = 0;
    body.vel.z = -6;
    w.moveBody(body, 1 / 60);
  }
  check(body.pos.y < 0.1 && body.pos.z > 24, `A-site ledge blocks from Long (z=${body.pos.z.toFixed(2)}, y=${body.pos.y.toFixed(2)})`);
  // Raycast blocked by a wall: mid -> B site.
  check(!w.lineOfSight(45, 1.6, 50, 16, 1.6, 20), 'no line of sight through walls (mid -> B site)');
  check(w.lineOfSight(45, 1.6, 60, 45, 1.6, 40), 'line of sight along mid');
}

// ── 3. Damage model ──
console.log('\n[damage]');
{
  const ak = WEAPONS.ak47;
  const body = computeDamage(ak.damage, 'chest', ak.armorPen, 0, false);
  const head = computeDamage(ak.damage, 'head', ak.armorPen, 0, false);
  check(head.health === body.health * 2, `headshot = 2x chest (${head.health} vs ${body.health})`);
  const armored = computeDamage(ak.damage, 'chest', ak.armorPen, 100, true);
  check(armored.health < body.health && armored.armor > 0, `armor reduces chest damage (${armored.health} hp, -${armored.armor} armor)`);
  const legArmor = computeDamage(ak.damage, 'leg', ak.armorPen, 100, true);
  check(legArmor.health === Math.round(ak.damage * ZONE_MULTIPLIER.leg), 'legs are not protected by armor');
  const zones = Object.values(ZONE_MULTIPLIER);
  check(new Set(zones).size === zones.length, 'every hit zone has a distinct multiplier');
  const awp = WEAPONS.awp;
  check(computeDamage(awp.damage, 'chest', awp.armorPen, 100, true).health >= 100, 'AWP one-shots an armored chest');
  check(computeDamage(awp.damage, 'stomach', awp.armorPen, 100, true).health >= 100, 'AWP one-shots an armored stomach');
  const dg = WEAPONS.deagle;
  check(dg.damage > WEAPONS.usp.damage && dg.damage > WEAPONS.glock.damage && dg.damage < WEAPONS.m4a4.damage && dg.damage < WEAPONS.ak47.damage, 'Deagle damage between pistols and rifles');
  check(dg.magSize < WEAPONS.usp.magSize && dg.magSize < WEAPONS.glock.magSize, 'Deagle has the smallest magazine');
  check(WEAPONS.m4a4.fireInterval < WEAPONS.ak47.fireInterval && WEAPONS.m4a4.recoil.pitch < WEAPONS.ak47.recoil.pitch, 'M4A4 fires faster with less recoil than AK');
}

// ── 4. Full matches ──
console.log('\n[matches]');
interface Track {
  last: Vec3;
  idle: number;
  maxIdle: number;
}
function runMatch(seed: number, rounds: number, firstRound: 'pistol' | 'rifle'): void {
  const game = new Game({ humanTeam: null, difficulty: 'normal', firstRound, roundsToWin: 99, seed });
  game.startMatch();
  const dt = 1 / 60;
  const endReasons: Record<string, number> = {};
  game.events.on((e) => {
    if (e.type === 'roundEnd') endReasons[`${e.winner}: ${e.reason}`] = (endReasons[`${e.winner}: ${e.reason}`] ?? 0) + 1;
  });
  const track = new Map<number, Track>();
  let insideWall = 0;
  let nanCount = 0;
  let roundOneChecked = false;
  let maxStep = 0;
  const t = performance.now();
  let ticks = 0;
  while (game.stats.roundsPlayed < rounds && ticks < 60 * 60 * 25) {
    const ts = performance.now();
    game.step(dt);
    maxStep = Math.max(maxStep, performance.now() - ts);
    ticks++;
    if (!roundOneChecked && game.roundNumber === 1) {
      roundOneChecked = true;
      if (firstRound === 'pistol') {
        const ok = game.soldiers.every((s) => s.primary === null && s.secondary !== null && s.secondary.def.id === (s.team === 'T' ? 'glock' : 'usp') && !s.helmet);
        check(ok, 'pistol round: no primaries, default pistols (Glock/USP), no helmets');
      }
      check(game.soldiers.filter((s) => s.hasBomb).length === 1 && game.soldiers.find((s) => s.hasBomb)!.team === 'T', 'exactly one T carries the C4 at round start');
    }
    for (const s of game.soldiers) {
      if (!s.alive) continue;
      if (!Number.isFinite(s.pos.x) || !Number.isFinite(s.pos.y) || !Number.isFinite(s.pos.z) || !Number.isFinite(s.yaw)) nanCount++;
      if (game.world.isBlocked(s.pos.x, s.pos.z, s.radius - 0.05, s.pos.y, s.height, 0.44)) insideWall++;
      if (game.phase !== 'live') continue;
      let tr = track.get(s.id);
      if (!tr) {
        tr = { last: vec3(s.pos.x, s.pos.y, s.pos.z), idle: 0, maxIdle: 0 };
        track.set(s.id, tr);
      }
      const brain = game.brainOf(s)!;
      const moving = brain.state === 'moving';
      const moved = Math.hypot(s.pos.x - tr.last.x, s.pos.z - tr.last.z);
      if (moving && moved < 0.002) tr.idle += dt;
      else tr.idle = 0;
      tr.maxIdle = Math.max(tr.maxIdle, tr.idle);
      tr.last = vec3(s.pos.x, s.pos.y, s.pos.z);
    }
  }
  const secs = ticks / 60;
  console.log(`  seed ${seed}: ${game.stats.roundsPlayed} rounds in ${secs.toFixed(0)} s sim (${(performance.now() - t).toFixed(0)} ms wall, worst tick ${maxStep.toFixed(1)} ms)`);
  console.log(`    score T ${game.score.T} : CT ${game.score.CT} | kills ${game.stats.kills}, shots ${game.stats.shots}, plants ${game.stats.plants}, defuses ${game.stats.defuses}, explosions ${game.stats.explosions}`);
  for (const [k, v] of Object.entries(endReasons)) console.log(`    ${v}x ${k}`);
  let maxIdle = 0;
  for (const tr of track.values()) maxIdle = Math.max(maxIdle, tr.maxIdle);
  check(game.stats.roundsPlayed >= rounds, `seed ${seed}: completed ${rounds} rounds`);
  check(nanCount === 0, `seed ${seed}: no NaN positions`);
  check(insideWall === 0, `seed ${seed}: no soldier ever inside geometry (${insideWall} samples)`);
  check(maxIdle < 3.5, `seed ${seed}: no bot stuck while moving for > 3.5 s (max ${maxIdle.toFixed(2)} s)`);
  check(game.stats.kills > 0, `seed ${seed}: bots fight and kill each other`);
}

const seeds = (process.argv[2] ?? '1,2,3').split(',').map(Number);
const roundsPer = Number(process.argv[3] ?? 6);
let totalPlants = 0;
for (const seed of seeds) {
  runMatch(seed, roundsPer, seed % 2 === 0 ? 'rifle' : 'pistol');
}
void totalPlants;

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

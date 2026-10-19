/*
 * 1v1 duel harness for AI tuning: one bot holds an angle, the other walks into it.
 *   node --experimental-strip-types tests/duel.ts [trials] [difficulty]
 */
import { Game } from '../src/engine/game.ts';
import type { Difficulty } from '../src/engine/ai/bot.ts';
import { cloneV, vec3 } from '../src/engine/math.ts';
import type { Vec3 } from '../src/engine/math.ts';
import type { Team, WeaponId } from '../src/engine/weapons.ts';
import { makeWeapon } from '../src/engine/weapons.ts';

const trials = Number(process.argv[2] ?? 60);
const diff = (process.argv[3] ?? 'normal') as Difficulty;

interface Scenario {
  name: string;
  holder: Team;
  holdPos: Vec3;
  holdLook: Vec3;
  walkFrom: Vec3;
  walkTo: Vec3;
}

const scenarios: Scenario[] = [
  { name: 'CT holds B plat vs T from tunnels', holder: 'CT', holdPos: vec3(9, 0, 12.5), holdLook: vec3(11.5, 0.8, 32), walkFrom: vec3(22, 0, 59), walkTo: vec3(15, 0, 20) },
  { name: 'T holds B plat vs CT from tunnels', holder: 'T', holdPos: vec3(9, 0, 12.5), holdLook: vec3(11.5, 0.8, 32), walkFrom: vec3(22, 0, 59), walkTo: vec3(15, 0, 20) },
  { name: 'CT holds mid vs T walking mid', holder: 'CT', holdPos: vec3(44, 0, 27), holdLook: vec3(45, 0.8, 50), walkFrom: vec3(56, 0, 90), walkTo: vec3(45, 0, 40) },
];

const agg = { hSee: 0, wSee: 0, hShot: 0, wShot: 0, hShots: 0, wShots: 0, hHits: 0, wHits: 0, n: 0, dist: 0 };

function run(sc: Scenario, seed: number, weapon: WeaponId): Team | null {
  const g = new Game({ humanTeam: null, difficulty: diff, firstRound: 'rifle', roundsToWin: 99, seed });
  g.startMatch();
  while (g.phase === 'freeze') g.step(1 / 60);
  const holder = g.soldiers.find((s) => s.team === sc.holder)!;
  const walker = g.soldiers.find((s) => s.team !== sc.holder)!;
  for (const s of g.soldiers) {
    if (s !== holder && s !== walker) (g as unknown as { killSoldier: (a: unknown, b: null, c: string, d: boolean) => void }).killSoldier(s, null, 'world', false);
  }
  for (const s of [holder, walker]) {
    s.primary = makeWeapon(weapon);
    s.activeSlot = 'primary';
    s.hasBomb = false;
  }
  // Isolate the duel from team strategy (no bomb fetching / rotations).
  g.planners.T.update = () => {};
  g.planners.CT.update = () => {};
  g.bomb.state = 'dropped';
  g.bomb.pos = vec3(70, 0, 90);
  holder.pos = cloneV(sc.holdPos);
  holder.yaw = Math.atan2(-(sc.holdLook.x - sc.holdPos.x), -(sc.holdLook.z - sc.holdPos.z));
  walker.pos = cloneV(sc.walkFrom);
  g.brainOf(holder)!.setTask({ kind: 'hold', pos: cloneV(sc.holdPos), look: cloneV(sc.holdLook) });
  g.brainOf(walker)!.setTask({ kind: 'hold', pos: cloneV(sc.walkTo), look: cloneV(sc.holdPos) });
  const st = { hSee: -1, wSee: -1, hShot: -1, wShot: -1, hShots: 0, wShots: 0, hHits: 0, wHits: 0, dist: 0 };
  g.events.on((e) => {
    if (e.type === 'shot') {
      if (e.shooter === holder.id) {
        st.hShots++;
        if (st.hShot < 0) st.hShot = g.time;
        if (e.hitSoldier >= 0) st.hHits++;
      } else {
        st.wShots++;
        if (st.wShot < 0) st.wShot = g.time;
        if (e.hitSoldier >= 0) st.wHits++;
      }
    }
  });
  for (let i = 0; i < 60 * 30; i++) {
    g.step(1 / 60);
    if (st.hSee < 0 && holder.visibleEnemies.length) {
      st.hSee = g.time;
      st.dist = Math.hypot(holder.pos.x - walker.pos.x, holder.pos.z - walker.pos.z);
    }
    if (st.wSee < 0 && walker.visibleEnemies.length) st.wSee = g.time;
    if (!holder.alive || !walker.alive) break;
  }
  if (st.hSee > 0 && st.wSee > 0 && st.hShot > 0 && st.wShot > 0) {
    const t0 = Math.min(st.hSee, st.wSee);
    agg.hSee += st.hSee - t0;
    agg.wSee += st.wSee - t0;
    agg.hShot += st.hShot - t0;
    agg.wShot += st.wShot - t0;
    agg.hShots += st.hShots;
    agg.wShots += st.wShots;
    agg.hHits += st.hHits;
    agg.wHits += st.wHits;
    agg.dist += st.dist;
    agg.n++;
  }
  if (!holder.alive && walker.alive) return walker.team;
  if (!walker.alive && holder.alive) return holder.team;
  return null;
}

for (const weapon of ['ak47', 'm4a4'] as WeaponId[]) {
  for (const sc of scenarios) {
    let holderWins = 0;
    let walkerWins = 0;
    for (let i = 0; i < trials; i++) {
      const w = run(sc, 1000 + i, weapon);
      if (w === sc.holder) holderWins++;
      else if (w) walkerWins++;
    }
    console.log(`${weapon} | ${sc.name}: holder ${holderWins} / walker ${walkerWins} / none ${trials - holderWins - walkerWins}`);
    const n = Math.max(1, agg.n);
    console.log(
      `   avg dist ${(agg.dist / n).toFixed(1)}m | see H ${(agg.hSee / n).toFixed(2)}s W ${(agg.wSee / n).toFixed(2)}s | first shot H ${(agg.hShot / n).toFixed(2)}s W ${(agg.wShot / n).toFixed(2)}s | acc H ${((100 * agg.hHits) / Math.max(1, agg.hShots)).toFixed(0)}% W ${((100 * agg.wHits) / Math.max(1, agg.wShots)).toFixed(0)}%`,
    );
    Object.assign(agg, { hSee: 0, wSee: 0, hShot: 0, wShot: 0, hShots: 0, wShots: 0, hHits: 0, wHits: 0, n: 0, dist: 0 });
  }
}

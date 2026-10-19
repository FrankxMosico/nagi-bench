/*
 * Round-by-round log of all-bot matches, useful for tuning AI/balance:
 *   node --experimental-strip-types tests/rounds.ts [seeds] [difficulty] [rounds]
 */
import { Game } from '../src/engine/game.ts';
import type { Difficulty } from '../src/engine/ai/bot.ts';

const seeds = (process.argv[2] ?? '11,12,13,14').split(',').map(Number);
const diff = (process.argv[3] ?? 'normal') as Difficulty;
const roundsPer = Number(process.argv[4] ?? 8);
let defuses = 0;
let plants = 0;
let expl = 0;
let rounds = 0;
const reasons: Record<string, number> = {};
const killStats: Record<string, number> = {};
const killPlaces: Record<string, number> = {};
for (const seed of seeds) {
  const g = new Game({ humanTeam: null, difficulty: diff, firstRound: 'pistol', roundsToWin: 99, seed });
  g.startMatch();
  let liveStart = 0;
  const log: string[] = [];
  g.events.on((e) => {
    if (e.type === 'roundLive') liveStart = g.time;
    if (e.type === 'bombPlanted') log.push(`  plant ${e.site} @${(g.time - liveStart).toFixed(0)}s`);
    if (e.type === 'kill' && e.killer >= 0) {
      const k = g.soldiers[e.killer];
      const v = g.soldiers[e.victim];
      const key = `${k.team} kills ${g.bomb.state === 'planted' ? 'post' : 'pre'}-plant`;
      killStats[key] = (killStats[key] ?? 0) + 1;
      const place = `${v.team} dies @ ${g.callout(v.pos) || '?'} <- ${g.callout(k.pos) || '?'} (${g.bomb.state === 'planted' ? 'post' : 'pre'})`;
      killPlaces[place] = (killPlaces[place] ?? 0) + 1;
    }
    if (e.type === 'bombDefused') log.push(`  defused @${(g.time - liveStart).toFixed(0)}s`);
    if (e.type === 'roundEnd') {
      log.push(`R${g.roundNumber} ${g.roundType} target:${g.planners.T.site} -> ${e.winner} (${e.reason}) @${(g.time - liveStart).toFixed(0)}s`);
      reasons[e.reason] = (reasons[e.reason] ?? 0) + 1;
    }
  });
  while (g.stats.roundsPlayed < roundsPer) g.step(1 / 60);
  defuses += g.stats.defuses;
  plants += g.stats.plants;
  expl += g.stats.explosions;
  rounds += g.stats.roundsPlayed;
  console.log(`seed ${seed}: T ${g.score.T} CT ${g.score.CT}\n  ${log.join('\n  ')}`);
}
console.log({ rounds, plants, defuses, expl, reasons });
console.log(killStats);
console.log(Object.entries(killPlaces).sort((a, b) => b[1] - a[1]).slice(0, 24));

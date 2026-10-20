import "./shim";
import { buildFilm } from "../src/world/index";
import { voiceCues } from "../src/voice";

/** Print each voice cue next to the shot(s) on screen while it plays. */
const film = buildFilm();
const shots = film.shots.map((s) => ({ id: s.id, start: s.start, end: s.end }));
for (const v of voiceCues) {
  const on = shots.filter((s) => s.start < v.end && s.end > v.start).map((s) => s.id);
  const chars = [...v.text].length;
  const cps = chars / (v.end - v.start);
  console.log(`${v.start.toFixed(1).padStart(6)}–${v.end.toFixed(1).padEnd(6)} ${cps.toFixed(1)}c/s  ${v.id} ${v.kind.padEnd(9)} 【${v.speaker}】${v.text}   ⟶ ${on.join(" + ")}`);
}
let gaps = 0;
const sorted = [...voiceCues].sort((a, b) => a.start - b.start);
for (let i = 1; i < sorted.length; i++) if (sorted[i]!.start < sorted[i - 1]!.end) {
  gaps++;
  console.log(`overlap: ${sorted[i - 1]!.id} / ${sorted[i]!.id}`);
}
console.log(`${voiceCues.length} cues, ${gaps} overlaps`);

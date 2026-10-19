/** Validates the speech manifest: schema, overlaps and subtitle reading speed. */
import { validateVoiceCues } from "@agentbench/cinematic-player";
import { voiceCues } from "../src/voice";
import { DURATION } from "../src/story";

const v = validateVoiceCues(voiceCues, DURATION);
const keys = new Set(["id", "kind", "speaker", "text", "delivery", "start", "end"]);
for (const c of voiceCues) {
  const k = Object.keys(c);
  if (k.length !== 7 || !k.every((x) => keys.has(x))) console.log("bad fields", c.id, k);
}
const sorted = [...v].sort((a, b) => a.start - b.start);
for (let i = 0; i < sorted.length - 1; i++) {
  if (sorted[i]!.end > sorted[i + 1]!.start) console.log("overlap", sorted[i]!.id, sorted[i + 1]!.id);
}
const punct = /[……——，。？！：、“”《》·\s]/g;
for (const c of sorted) {
  const chars = [...c.text.replace(punct, "")].length;
  const rate = chars / (c.end - c.start);
  if (rate > 6.6) console.log(`fast ${c.id} ${rate.toFixed(1)} c/s  ${c.text}`);
}
console.log("voice cues:", v.length, "valid; last ends at", Math.max(...v.map((c) => c.end)));

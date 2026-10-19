import { installMockDom } from "./mockdom";
installMockDom();
const { CinematicPlayer } = await import("@agentbench/cinematic-player");
const { createWorld } = await import("../src/world");
const { buildShots } = await import("../src/shots");
const { DURATION } = await import("../src/story");
const world = createWorld();
const shots = buildShots();
const player = new CinematicPlayer({ duration: DURATION, context: world, shots, requestFrame: () => 0, cancelFrame: () => {} });
for (const [a, b] of [[40, 60], [130, 150], [170, 180], [230, 250], [270, 280], [300, 318], [318, 340]] as const) {
  const t0 = performance.now();
  let n = 0;
  for (let t = a; t < b; t += 1 / 60) {
    player.seek(t);
    n++;
  }
  console.log(`${a}-${b}: ${((performance.now() - t0) / n).toFixed(2)} ms/frame (scene update only)`);
}

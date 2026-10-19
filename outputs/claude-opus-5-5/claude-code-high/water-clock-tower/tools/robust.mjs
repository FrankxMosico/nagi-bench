// Robustness check of the film's event timing across different start phases.
//   bun tools/robust.mjs "6,7;5.2,7;6.8,3"   (warm,seed pairs)
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, normalize } from "node:path";

const BROWSER = "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell";
const ORIGIN = "http://preview.local";
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript" };
const root = resolve("dist");
const combos = (process.argv[2] ?? "6,7").split(";").map((s) => s.split(",").map(Number));
const browser = await chromium.launch({
  executablePath: BROWSER,
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--disable-dev-shm-usage"],
});
for (const [warm, seed] of combos) {
  const page = await browser.newPage({ viewport: { width: 320, height: 180 } });
  page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== ORIGIN) return route.abort();
    let path = normalize(decodeURIComponent(url.pathname));
    if (path.endsWith("/")) path += "index.html";
    const file = join(root, path);
    try {
      await route.fulfill({ status: 200, body: await readFile(file), contentType: TYPES[extname(file)] ?? "application/octet-stream" });
    } catch {
      await route.fulfill({ status: 404, body: "nf" });
    }
  });
  await page.goto(`${ORIGIN}/?capture&warm=${warm}&seed=${seed}`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__cap, null, { timeout: 120000 });
  const out = [];
  for (const t of [7.8, 11, 16.3, 20, 24, 28]) {
    await page.evaluate((tt) => window.__cap.advance(tt - window.__cap.t()), t);
    out.push(await page.evaluate(() => window.__cap.state()));
  }
  const last = out[out.length - 1];
  console.log(`warm=${warm} seed=${seed} → stage: ${out[2].stage} | steps@8.3=${out[0].steps} @16=${out[2].steps} @28=${last.steps}`);
  console.log(`    events: ${last.events}`);
  await page.close();
}
await browser.close();

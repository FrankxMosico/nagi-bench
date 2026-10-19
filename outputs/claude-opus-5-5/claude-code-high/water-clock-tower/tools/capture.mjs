// Deterministic review captures: loads dist/index.html?capture, advances the
// film to each requested time and saves a screenshot.
//   bun tools/capture.mjs 1,5,9.5,12 [outDir] [WxH]
import { chromium } from "playwright-core";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, resolve, normalize } from "node:path";

const BROWSER = "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell";
const ORIGIN = "http://preview.local";
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".wasm": "application/wasm" };
const times = (process.argv[2] ?? "1,5,10").split(",").map(Number).sort((a, b) => a - b);
const out = resolve(process.argv[3] ?? ".captures");
const [width, height] = (process.argv[4] ?? "1280x720").split("x").map(Number);
// extra query params as "warm:6.9,seed:23"
const query = ["capture", ...(process.argv[5] ? process.argv[5].split(",").map((s) => s.replace(":", "=")) : [])].join("&");
const root = resolve("dist");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: BROWSER,
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width, height } });
page.on("console", (m) => console.log(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== ORIGIN) return route.abort();
  let path = normalize(decodeURIComponent(url.pathname));
  if (path.endsWith("/")) path += "index.html";
  const file = join(root, path);
  try {
    const body = await readFile(file);
    await route.fulfill({ status: 200, body, contentType: TYPES[extname(file)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
const t0 = Date.now();
await page.goto(`${ORIGIN}/?${query}`, { waitUntil: "load" });
await page.waitForFunction(() => window.__cap, null, { timeout: 180000 });
console.log(`ready after ${((Date.now() - t0) / 1000).toFixed(1)}s`);
let cur = 0;
for (const t of times) {
  const dt = t - cur;
  if (dt > 0) {
    const s0 = Date.now();
    await page.evaluate((d) => window.__cap.advance(d), dt);
    cur = t;
    const st = await page.evaluate(() => window.__cap.state());
    console.log(`t=${t} (${((Date.now() - s0) / 1000).toFixed(1)}s) ${JSON.stringify(st)}`);
  }
  await page.waitForTimeout(450); // let CSS transitions settle
  const file = join(out, `f${String(t.toFixed(1)).padStart(5, "0")}.png`);
  await page.screenshot({ path: file });
}
await browser.close();

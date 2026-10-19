// Reports main-thread long tasks while the film loads and plays (headless).
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, normalize } from "node:path";

const ORIGIN = "http://preview.local";
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript" };
const root = resolve("dist");
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--disable-dev-shm-usage", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.addInitScript(() => {
  window.__long = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__long.push([Math.round(e.startTime), Math.round(e.duration)]);
  }).observe({ type: "longtask", buffered: true });
});
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
const t0 = Date.now();
await page.goto(`${ORIGIN}/`, { waitUntil: "load" });
console.log(`load event after ${Date.now() - t0} ms`);
await page.waitForTimeout(15000);
const long = await page.evaluate(() => window.__long);
const top = [...long].sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log(`long tasks: ${long.length}, longest [start,ms]: ${JSON.stringify(top)}`);
await browser.close();

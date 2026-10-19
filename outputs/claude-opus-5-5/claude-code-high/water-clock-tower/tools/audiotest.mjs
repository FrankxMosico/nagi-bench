// Offline soundtrack level check: loads dist/index.html?audiotest and prints
// the loudness report produced by the page.
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, normalize } from "node:path";

const BROWSER = "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell";
const ORIGIN = "http://preview.local";
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css" };
const root = resolve("dist");
const browser = await chromium.launch({
  executablePath: BROWSER,
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on("console", (m) => console.log(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
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
await page.goto(`${ORIGIN}/?audiotest`, { waitUntil: "load" });
await page.waitForFunction(() => window.__audioReport, null, { timeout: 300000 });
await browser.close();

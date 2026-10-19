// 测试自动播放被拦截时的开始流程：bun tools/startflow.ts
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const root = resolve("dist");
const TYPES: Record<string, string> = { ".html": "text/html", ".js": "text/javascript" };
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=document-user-activation-required"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on("console", (m) => { if (m.type() !== "log") console.log(`[${m.type()}] ${m.text()}`); });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== "http://flow.local") return route.abort();
  const p = decodeURIComponent(url.pathname).replace(/\/$/, "/index.html");
  try {
    await route.fulfill({ status: 200, body: await readFile(join(root, p)), contentType: TYPES[extname(p)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
await page.goto("http://flow.local/");
await page.waitForFunction(() => (window as any).__ready === true, null, { timeout: 120000 });
console.log("state:", await page.evaluate(() => (window as any).__state), "film:", await page.evaluate(() => (window as any).__filmTime));
await page.screenshot({ path: "debug/start0.png" });
await page.mouse.click(640, 360);
await page.waitForTimeout(200);
await page.screenshot({ path: "debug/start1.png" });
await page.waitForTimeout(3000);
console.log("after click state:", await page.evaluate(() => (window as any).__state), "film:", await page.evaluate(() => (window as any).__filmTime));
await page.screenshot({ path: "debug/start2.png" });
await browser.close();

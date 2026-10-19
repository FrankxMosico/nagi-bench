// 离线渲染配乐与音效并报告电平：bun tools/audiotest.ts
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const root = resolve("dist");
const TYPES: Record<string, string> = { ".html": "text/html", ".js": "text/javascript" };
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== "http://audio.local") return route.abort();
  const p = decodeURIComponent(url.pathname).replace(/\/$/, "/index.html");
  try {
    await route.fulfill({ status: 200, body: await readFile(join(root, p)), contentType: TYPES[extname(p)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
await page.goto("http://audio.local/index.html?t=0&freeze&mute");
await page.waitForFunction(() => (window as any).__ready === true, null, { timeout: 120000 });
const res = (await page.evaluate(() => (window as any).__audioTest(36))) as { peakDb: number; perSecond: { s: number; peak: number; rms: number }[] };
console.log("overall peak dBFS:", res.peakDb);
const png = (await page.evaluate(() => (window as any).__audioPng)) as string;
await Bun.write("debug/audio.png", Buffer.from(png.split(",")[1], "base64"));
console.log(res.perSecond.map((r) => `${String(r.s).padStart(2)}s pk ${r.peak.toFixed(1).padStart(6)} rms ${r.rms.toFixed(1).padStart(6)}`).join("\n"));
await browser.close();

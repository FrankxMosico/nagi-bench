// Debug the click-to-play path (autoplay blocked).
import { chromium } from "playwright-core";
import { resolve } from "node:path";

const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--disable-dev-shm-usage", "--autoplay-policy=user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on("console", (m) => console.log(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.goto("file://" + resolve("dist/index.html") + (process.argv[2] ?? ""));
for (let i = 0; i < 12; i++) {
  await page.waitForTimeout(2500);
  const st = await page.evaluate(() => ({
    bar: document.querySelector(".overlay .progress div")?.style.width,
    status: document.querySelector(".overlay .status")?.textContent,
    disabled: document.querySelector(".overlay button")?.disabled,
    hidden: document.querySelector(".overlay")?.classList.contains("hide"),
  }));
  console.log(i, JSON.stringify(st));
  if (st.disabled === false) break;
}
await page.screenshot({ path: resolve(".cap/gesture_overlay.png") });
const btn = await page.$(".overlay button:not([disabled])");
if (btn) {
  await btn.click();
  await page.waitForTimeout(4000);
  console.log("after click hidden:", await page.evaluate(() => document.querySelector(".overlay")?.classList.contains("hide")));
  await page.screenshot({ path: resolve(".cap/gesture_after.png") });
}
await browser.close();

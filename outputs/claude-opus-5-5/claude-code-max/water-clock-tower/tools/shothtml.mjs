// 用无头 Chromium 把一个本地 HTML 文件截图成 PNG：bun tools/shothtml.mjs in.html out.png [width]
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
const [, , inp, out, width = '1600'] = process.argv;
const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
});
const page = await browser.newPage({ viewport: { width: Number(width), height: 600 } });
await page.goto('file://' + resolve(inp));
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('wrote', out);

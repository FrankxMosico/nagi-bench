import {chromium} from 'playwright-core';
const browser=await chromium.launch({executablePath:'/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',chromiumSandbox:false,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>console.log('ERROR',e.message));await page.goto('file:///workspace/dist/index.html');await page.waitForFunction(()=>window.__film);await page.evaluate(()=>window.__film.pause());
for(const t of [2,6,10,17,23,27,28,29,30,32]){console.log(await page.evaluate(t=>{window.__film.seek(t);return window.__film.state},t));}
await page.waitForTimeout(700);await page.screenshot({path:'checks/final.png'});await browser.close();

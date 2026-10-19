import {chromium} from 'playwright-core';
const browser=await chromium.launch({executablePath:'/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',chromiumSandbox:false,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});
const page=await browser.newPage({viewport:{width:1440,height:900}});page.on('console',m=>{if(m.type()==='error'||m.type()==='warning')console.log(m.type(),m.text())});page.on('pageerror',e=>console.log('ERROR',e.stack));
await page.goto('file:///workspace/dist/index.html');await page.waitForFunction(()=>window.__film);await page.evaluate(()=>window.__film.pause());
for(const t of [0,6,11.5,17.5,23.5,29.5,32]){await page.evaluate(t=>window.__film.seek(t),t);await page.waitForTimeout(750);await page.screenshot({path:`checks/frame-${t}.png`});console.log(t,await page.evaluate(()=>window.__film.state));}
await browser.close();

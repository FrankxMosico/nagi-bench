import {chromium} from 'playwright-core';
import {writeFile,mkdir} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',chromiumSandbox:false,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[],requests=[],states=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>requests.push(r.url()));
await mkdir('preview-final',{recursive:true});await page.goto('file:///workspace/dist/index.html');await page.waitForFunction(()=>window.__film);await page.evaluate(()=>window.__film.pause());
for(const t of [0,6,11.5,17.5,23.5,29.5,32]){
 await page.evaluate(t=>window.__film.seek(t),t);await page.waitForTimeout(700);states.push(await page.evaluate(()=>window.__film.state));await page.screenshot({path:`preview-final/step-${t}.png`});
}
const last=states.at(-1);if(!last.steps||!last.strikes)errors.push('Transmission or bell failed');if(requests.some(r=>!r.startsWith('file:')))errors.push('Nonlocal request');
const report={errors,requests,states};await writeFile('checks/final-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({errors,offline:true,steps:last.steps,strikes:last.strikes}));await browser.close();if(errors.length)process.exitCode=1;

import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
const dir=process.argv[2]||'preview/review';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:'/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',chromiumSandbox:false,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:720}});
const errors=[],requests=[];
page.on('pageerror',e=>{errors.push(e.message);console.log('ERROR',e.message);});
page.on('console',msg=>{if(msg.type()==='error'){errors.push(msg.text());console.log('CONSOLE ERROR',msg.text());}});
page.on('request',r=>requests.push(r.url()));
await page.goto('file:///workspace/dist/index.html');
await page.waitForFunction(()=>!!window.__clock);await page.evaluate(()=>window.__clock.pause());
const states=[];
for(const t of (process.env.SHOT_TIMES==='none'?[]:(process.env.SHOT_TIMES||'0,5,12,15,20,24,26,30').split(',').map(Number))){
 await page.evaluate(t=>window.__clock.seek(t),t);
 await page.waitForTimeout(150);
 await page.screenshot({path:`${dir}/frame-${t}.png`,timeout:120000,animations:'disabled'});
 states.push(await page.evaluate(()=>window.__clock.state()));await writeFile(`${dir}/states.json`,JSON.stringify(states,null,2));console.log('Screenshot',t,'physics',states.at(-1).steps,states.at(-1).strikes);
}
if(process.env.SHOTS_ONLY){await writeFile(`${dir}/checks.json`,JSON.stringify({errors,requests,states},null,2));console.log('FILE CHECKS',JSON.stringify({errors,requests}));await browser.close();process.exit(errors.length?1:0);}
await page.click('#sound');console.log('Audio',await page.locator('#sound-text').textContent());
await page.click('#replay');await page.waitForTimeout(800);await page.click('#play');const paused=await page.evaluate(()=>window.__clock.state().playhead);await page.waitForTimeout(500);const still=await page.evaluate(()=>window.__clock.state().playhead);if(Math.abs(still-paused)>.05)errors.push('Pause failed');
await page.click('#explore');await page.click('#water-toggle');const water=await page.evaluate(()=>window.__clock.state().water);if(water!==false)errors.push('Water toggle failed');
await page.click('#return-film');await page.click('#info');if(!await page.locator('#about').evaluate(el=>el.open))errors.push('Info failed');await page.click('#close-info');await page.waitForTimeout(250);
await writeFile(`${dir}/interaction-checks.json`,JSON.stringify({errors,requests,paused,still,water},null,2));
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.__clock.seek(0));await page.waitForTimeout(200);await page.screenshot({path:`${dir}/mobile.png`,timeout:120000,animations:'disabled'});
const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)errors.push('Horizontal mobile overflow');
const external=requests.filter(r=>!r.startsWith('file:')&&!r.startsWith('data:'));if(external.length)errors.push('External runtime request: '+external.join(','));
await writeFile(`${dir}/checks.json`,JSON.stringify({errors,requests,states,paused,still,water},null,2));
console.log('CHECKS',JSON.stringify({errors,requests}));await browser.close();if(errors.length)process.exitCode=1;

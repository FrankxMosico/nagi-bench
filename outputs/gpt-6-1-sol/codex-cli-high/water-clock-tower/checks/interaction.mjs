import {chromium} from 'playwright-core';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',chromiumSandbox:false,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});
const page=await browser.newPage({viewport:{width:1280,height:720}});const errors=[],requests=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>requests.push(r.url()));
await page.addInitScript(()=>{
 const Native=window.AudioContext;
 window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audio=this;}
 createDynamicsCompressor(){const comp=super.createDynamicsCompressor(),probe=this.createAnalyser(),silent=this.createGain();probe.fftSize=2048;silent.gain.value=0;comp.connect(probe);probe.connect(silent);silent.connect(this.destination);window.__audioProbe=probe;return comp;}}
});
await page.goto('file:///workspace/dist/index.html');await page.waitForFunction(()=>window.__film);
await page.click('#sound');
const audio=await page.evaluate(async()=>{let peak=0,samples=0;await new Promise(resolve=>{const start=performance.now();const timer=setInterval(()=>{const a=new Float32Array(2048);window.__audioProbe.getFloatTimeDomainData(a);for(const x of a)peak=Math.max(peak,Math.abs(x));samples++;if(performance.now()-start>2200){clearInterval(timer);resolve();}},30)});return {state:window.__audio.state,sampleRate:window.__audio.sampleRate,peak,samples}});
await page.click('#play');const paused=await page.evaluate(()=>window.__film.state);await page.waitForTimeout(600);const stillPaused=await page.evaluate(()=>window.__film.state);if(paused.time!==stillPaused.time||paused.wheelAngle!==stillPaused.wheelAngle)errors.push('Pause did not freeze film and physics');
await page.click('#play');await page.waitForTimeout(500);const resumed=await page.evaluate(()=>window.__film.state);if(resumed.time<=paused.time)errors.push('Resume failed');
await page.click('[data-time="27"]');await page.evaluate(()=>window.__film.pause());const chapter=await page.evaluate(()=>window.__film.state);if(chapter.time<27||chapter.strikes<1||chapter.steps<1)errors.push('Chapter seek failed');await page.waitForTimeout(700);await page.screenshot({path:'checks/reporting-closeup.png'});
await page.click('#replay');await page.evaluate(()=>window.__film.pause());const replay=await page.evaluate(()=>window.__film.state);if(replay.time>3)errors.push('Replay failed');
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.__film.seek(0));await page.waitForTimeout(700);await page.screenshot({path:'checks/mobile.png'});
const report={offline:requests.every(r=>r.startsWith('file:')),requests,errors,audio,pauseVerified:paused.time===stillPaused.time&&paused.wheelAngle===stillPaused.wheelAngle,resumeVerified:resumed.time>paused.time,chapter,replay};
await writeFile('checks/interaction-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();if(errors.length)process.exitCode=1;

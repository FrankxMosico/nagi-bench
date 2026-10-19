import * as THREE from 'three';
import { createModel } from './model.js';
import { ClockPhysics, STEP } from './physics.js';
import { Soundscape } from './audio.js';
import './style.css';
const $=id=>document.getElementById(id);
const container=$('scene');
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.65));renderer.setClearColor(0xeeeadd,0);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
container.prepend(renderer.domElement);
const scene=new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xfff8e4,0x81907a,2.4));
const sun=new THREE.DirectionalLight(0xfff0d5,3.6);sun.position.set(-3,11,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-6;sun.shadow.camera.right=6;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-5;sun.shadow.normalBias=.035;sun.shadow.bias=-.0004;sun.shadow.radius=3;scene.add(sun);sun.target.position.set(0,3,0);scene.add(sun.target);
const rim=new THREE.DirectionalLight(0xe5f4ef,1.7);rim.position.set(5,6,-4);scene.add(rim);
const camera=new THREE.OrthographicCamera(-6,6,5,-5,.1,100);
let physics=new ClockPhysics();
const model=createModel(scene),audio=new Soundscape();
let time=0,playing=true,exploring=false,last=performance.now(),simTarget=0,chapter=-1,wasPlaying=true;
const DURATION=30;
const chapters=[
 {start:0,end:4,num:'序 · 01',category:'北宋的机械宇宙',title:'让流水<br>成为<span>时间</span>。',description:'九百多年前，苏颂把观天、演天与报时，装进了同一座水力钟楼。',detail:'水运仪象台',note:'北宋 · 苏颂主持建造 · 1092 年',cause:-1,camera:[10,7.0,16],target:[.4,4.2,0],span:10.2,labels:[['上层 · 浑仪',[.8,7.7,0],'right'],['中层 · 浑象',[.75,5.2,.15],'right'],['下层 · 报时',[-1.7,1.8,1.7],'left']]},
 {start:4,end:10,num:'壹 · 02',category:'流水 → 重量',title:'水入壶，<br><span>重力</span>生。',description:'平水壶保持水位，水便较均匀地流入水斗。水越积越重，在轮缘产生向下的拉力。',detail:'水流供能',note:'水重 × 轮缘力臂 → 转动力矩',cause:0,camera:[6.8,5.0,12],target:[1.0,2.75,.7],span:5.7,labels:[['恒定水位',[2.64,4.3,.6],'right'],['受水壶 · 蓄水增重',[1.25,2.95,.9],'left'],['余水回流',[1.8,.57,.9],'right']]},
 {start:10,end:16,num:'贰 · 03',category:'重量 → 节律',title:'蓄满一壶，<br>才走<span>一格</span>。',description:'水重压下天衡，止挡放开；水轮前进一格，止挡再锁住。下一壶重新蓄水。',detail:'擒纵：放行，再锁止',note:'把连续流水，变成重复的机械节拍',cause:1,camera:[3.2,3.7,12],target:[.65,2.64,.75],span:4.65,labels:[['止挡 · 锁住',[1.24,2.98,1.12],'left'],['天衡 · 水重压下',[1.66,2.73,1.3],'right'],['配重 · 帮助复位',[2.44,2.51,1.3],'right']]},
 {start:16,end:22,num:'叁 · 04',category:'节律 → 传动',title:'一轮动，<br><span>层层</span>相随。',description:'齿轮与“天梯”链条把动力传到各层；齿数比决定转速，浑仪、浑象随之转动。',detail:'同一水轮，带动整座钟楼',note:'上层观天 · 中层演天 · 下层计时',cause:2,camera:[7.3,6.9,14],target:[-.25,5.45,0],span:7.2,labels:[['天梯 · 向上传动',[-2.12,4.9,-.26],'left'],['浑象 · 演示天球',[.75,5.3,.15],'right'],['浑仪 · 辅助观测',[.9,7.8,0],'right']]},
 {start:22,end:27,num:'肆 · 05',category:'传动 → 报时',title:'转到刻度，<br><span>木人</span>报时。',description:'传动轮带动报时机构。轮上的拨销抬起钟锤；拨销转过，钟锤回落，击钟报时。',detail:'轮的位置，决定何时报时',note:'木人还可击鼓、出牌，报告时刻',cause:3,camera:[3.2,3.4,11],target:[-1.47,1.48,1.62],span:3.35,labels:[['钟 · 碰撞发声',[-1.96,1.79,1.55],'left'],['拨销 → 钟锤',[-1.36,1.42,1.45],'right'],['木人 · 出牌报时',[-1.30,1.08,2.3],'right']]},
 {start:27,end:30,num:'终 · 06',category:'把流水，变成时刻',title:'水供力，<br><span>擒纵</span>定节律。',description:'从水重到钟声，每一步都带动下一步。这就是水运仪象台的机械智慧。',detail:'流水不息，时刻有序',note:'30 秒原理演示 · 实际计时周期已压缩',cause:4,camera:[8.7,7.2,16],target:[.25,4.2,0],span:10.2,labels:[['观天 · 演天',[.8,7.7,0],'right'],['按时报时',[-1.7,1.8,1.7],'left']]}
];
const subtitles=[
 [0,'这座钟楼，用一股流水，同时推动天象与时间。'],
 [4,'先让供水稳定：水位保持不变，水流便较均匀。'],
 [6.8,'水进入轮缘上的受水壶；水越重，向下的力矩越大。'],
 [10,'先拦住水轮，等一壶水积到足够重。'],
 [12.3,'水重压下天衡，释放止挡，水轮才转过一格。'],
 [14.1,'止挡重新锁住，下一壶继续蓄水，节律就这样重复。'],
 [16,'水轮带动齿轮，链条再把动力传到楼上。'],
 [19,'不同的传动比，让浑仪、浑象与报时机构各按其速转动。'],
 [22,'报时轮转到相应位置，拨销先把钟锤抬起。'],
 [24.2,'拨销转过，钟锤回落击钟，木人便按时报时。'],
 [27,'水重供能 → 擒纵定节律 → 传动分配 → 木人报时。']
];
let labelEls=[];
function setChapter(index){
 if(chapter===index)return;chapter=index;const c=chapters[index];
 $('chapter-number').textContent=c.num;$('chapter-category').textContent=c.category;$('headline').innerHTML=c.title;$('description').textContent=c.description;$('detail-top').textContent=c.detail;$('detail-bottom').textContent=c.note;
 document.querySelectorAll('[data-cause]').forEach(el=>el.classList.toggle('active',c.cause===4||Number(el.dataset.cause)===c.cause));
 document.querySelectorAll('[data-seek]').forEach((el,i)=>el.classList.toggle('active',i===Math.min(index,4)));
 $('annotations').replaceChildren();labelEls=c.labels.map(([text,anchor,side])=>{const el=document.createElement('div');el.className=`annotation ${side==='left'?'left':''}`;el.innerHTML=`<i class="point"></i><i class="leader"></i><span class="label">${text}</span>`;$('annotations').append(el);return {el,anchor:new THREE.Vector3(...anchor),side};});
 $('water-meter').classList.toggle('visible',index===1||index===2);
}
let invalidated=true,aspect=1.5;function resize(){const rect=container.getBoundingClientRect();renderer.setSize(rect.width,rect.height);aspect=rect.width/rect.height;invalidated=true;}
window.addEventListener('resize',resize);resize();
const smooth=x=>x*x*(3-2*x),v3=a=>new THREE.Vector3(...a);
let orbit={azimuth:.44,elevation:.19,distance:18,span:10.2,target:new THREE.Vector3(.25,4.2,0)};
function updateCamera(){
 let position,target,span;
 if(exploring){target=orbit.target;position=new THREE.Vector3(Math.sin(orbit.azimuth)*Math.cos(orbit.elevation),Math.sin(orbit.elevation),Math.cos(orbit.azimuth)*Math.cos(orbit.elevation)).multiplyScalar(orbit.distance).add(target);span=orbit.span;}
 else{const c=chapters[chapter],previous=chapters[Math.max(0,chapter-1)];const blend=chapter===0?1:smooth(Math.min(1,(time-c.start)/1.15));position=v3(previous.camera).lerp(v3(c.camera),blend);target=v3(previous.target).lerp(v3(c.target),blend);span=THREE.MathUtils.lerp(previous.span,c.span,blend);}
 if(aspect<.9)span*=1.06;
 camera.position.copy(position);camera.lookAt(target);camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();camera.updateMatrixWorld();
}
function updateUI(){
 const cIndex=Math.max(0,chapters.findIndex(c=>time>=c.start&&time<c.end));
 if(!exploring)setChapter(time>=30?5:cIndex);
 const s=subtitles.findLast(s=>s[0]<=time);$('subtitle').textContent=s?.[1]||'';
 $('elapsed').textContent=`00:${Math.floor(time).toString().padStart(2,'0')}`;$('timeline').value=time;$('timeline').style.background=`linear-gradient(to right,#426c58 ${time/DURATION*100}%,#c7ccbb ${time/DURATION*100}%)`;
 if(chapter===2&&labelEls[0])labelEls[0].el.querySelector('.label').textContent=physics.latched?'止挡 · 锁住水轮':'止挡 · 放行一格';
 $('fill-level').style.width=`${Math.min(100,physics.receivingMass/.32*100)}%`;$('gate-state').textContent=physics.latched?'蓄水 · 锁止':'放行 · 进一格';$('step-count').textContent=`水轮 · 第 ${physics.stepCount} 格`;
 $('scene-state').textContent=!playing&&!exploring?(time>=30?'演示完成':'已暂停'):physics.latched?'水重积累 · 止挡锁住':'水轮进格 · 机构传动';
 $('replay-main').hidden=time<30||exploring;
 document.body.classList.toggle('paused',!playing);$('play').setAttribute('aria-label',time>=30?'重新播放':playing?'暂停':'继续播放');
}
function placeLabels(){
 const rect=container.getBoundingClientRect();
 labelEls.forEach(({el,anchor,side})=>{const v=anchor.clone().project(camera),x=(v.x*.5+.5)*rect.width;let left=side==='left';const width=el.offsetWidth;if(left&&x-width<8)left=false;if(!left&&x+width>rect.width-8)left=true;el.classList.toggle('left',left);el.style.left=`${x}px`;el.style.top=`${(-v.y*.5+.5)*rect.height}px`;el.style.opacity=(exploring||v.x<-1||v.x>1||v.y<-1||v.y>1)?'0':'1';});
}
function simulateTo(target,quiet=false){
 while(physics.time+STEP<=target+1e-8){physics.step();const events=physics.takeEvents();if(!quiet)for(const e of events)if(target-e.at<.20)audio.event(e);}
}
function seek(t){
 const running=playing;time=Math.max(0,Math.min(DURATION,t));physics=new ClockPhysics();simTarget=time;simulateTo(time,true);last=performance.now();chapter=-1;playing=time<30&&running;updateUI();model.update(physics);updateCamera();placeLabels();renderer.render(scene,camera);audio.setRunning(playing);
}
function restart(){exitExplore();playing=true;seek(0);audio.setRunning(true);}
function togglePlay(){if(exploring)return;if(time>=30){restart();return;}playing=!playing;last=performance.now();audio.setRunning(playing);updateUI();}
$('play').addEventListener('click',togglePlay);$('replay').addEventListener('click',restart);$('replay-main').addEventListener('click',restart);document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();restart();});
$('timeline').addEventListener('input',e=>{if(exploring)exitExplore();seek(Number(e.target.value));});
for(const el of document.querySelectorAll('[data-seek]'))el.addEventListener('click',()=>{exitExplore();seek(Number(el.dataset.seek));});
$('sound').addEventListener('click',async()=>{try{if(audio.enabled)audio.mute();else{await audio.enable();audio.setRunning(playing||exploring);}document.body.classList.toggle('audio-on',audio.enabled);$('sound-text').textContent=audio.enabled?'声音已开':'开启声音';$('sound').setAttribute('aria-label',audio.enabled?'关闭声音':'开启声音');}catch(e){$('sound-text').textContent='声音不可用';console.warn('Audio unavailable',e);}});
function enterExplore(){
 exploring=true;playing=false;last=performance.now();simTarget=physics.time;document.body.classList.add('exploring');$('explore-panel').hidden=false;$('explore').innerHTML='返回短片 <span>↙</span>';
 $('headline').innerHTML='亲手试一试，<br><span>停下水流</span>。';$('description').textContent='水是唯一的动力来源。转动视角，观察每一处传动。';$('chapter-number').textContent='自由观察';$('chapter-category').textContent='探索机械因果';$('water-meter').classList.add('visible');audio.setRunning(true);updateUI();
}
function exitExplore(){if(!exploring)return;exploring=false;document.body.classList.remove('exploring');$('explore-panel').hidden=true;$('explore').innerHTML='自由观察 <span>↗</span>';physics.flow=true;chapter=-1;seek(time);updateWaterButton();}
$('explore').addEventListener('click',()=>exploring?exitExplore():enterExplore());$('return-film').addEventListener('click',()=>{exitExplore();playing=time<30;last=performance.now();audio.setRunning(playing);});
function updateWaterButton(){$('water-toggle').setAttribute('aria-pressed',String(physics.flow));$('water-toggle-text').textContent=physics.flow?'水流已开启':'水流已关闭';}
$('water-toggle').addEventListener('click',()=>{physics.flow=!physics.flow;updateWaterButton();});
$('info').addEventListener('click',()=>{wasPlaying=playing;playing=false;audio.setRunning(false);$('about').showModal();});$('close-info').addEventListener('click',()=>$('about').close());$('about').addEventListener('close',()=>{playing=wasPlaying&&time<30;last=performance.now();audio.setRunning(playing||exploring);});$('about').addEventListener('click',e=>{if(e.target===$('about')){const b=$('about').getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)$('about').close();}});
let dragging=false,px=0,py=0;
container.addEventListener('pointerdown',e=>{if(!exploring)return;dragging=true;px=e.clientX;py=e.clientY;container.setPointerCapture(e.pointerId);});container.addEventListener('pointermove',e=>{if(!dragging)return;orbit.azimuth-=(e.clientX-px)*.007;orbit.elevation=THREE.MathUtils.clamp(orbit.elevation+(e.clientY-py)*.005,-.05,1.0);px=e.clientX;py=e.clientY;});container.addEventListener('pointerup',()=>dragging=false);container.addEventListener('pointercancel',()=>dragging=false);
container.addEventListener('wheel',e=>{if(!exploring)return;e.preventDefault();orbit.span=THREE.MathUtils.clamp(orbit.span+e.deltaY*.008,4,13);},{passive:false});
window.addEventListener('keydown',e=>{if($('about').open||['INPUT','BUTTON'].includes(document.activeElement.tagName))return;if(e.code==='Space'){e.preventDefault();togglePlay();}if(e.code==='ArrowRight'){e.preventDefault();seek(time+2);}if(e.code==='ArrowLeft'){e.preventDefault();seek(time-2);}});
// A read-only state and deterministic seek hook also make the physical demo auditable.
window.__clock={state:()=>({...physics.state(),playhead:time,playing,exploring,drawCalls:renderer.info.render.calls}),seek:t=>{playing=false;seek(t);},play:()=>{playing=true;last=performance.now();},pause:()=>{playing=false;audio.setRunning(false);},water:on=>{physics.flow=!!on;updateWaterButton();}};
function frame(now){
 const elapsed=Math.max(0,(now-last)/1000);last=now;
 if(!$('about').open){
  if(exploring){simTarget+=Math.min(elapsed,1);simulateTo(simTarget);}
  else if(playing){time=Math.min(DURATION,time+elapsed);simTarget=time;simulateTo(time);if(time>=DURATION){playing=false;invalidated=true;audio.setRunning(false);}}
 }
 updateUI();if(playing||exploring||invalidated){model.update(physics);updateCamera();placeLabels();renderer.render(scene,camera);invalidated=false;}if(playing||exploring)audio.update(physics.time,physics.flow);requestAnimationFrame(frame);
}
setChapter(0);model.update(physics);updateCamera();placeLabels();renderer.render(scene,camera);last=performance.now();requestAnimationFrame(frame);

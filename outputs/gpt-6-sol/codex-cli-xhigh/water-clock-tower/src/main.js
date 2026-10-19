import * as THREE from 'three';
import { ClockPhysics, STEP } from './physics.js';
import './style.css';

const TAU = Math.PI * 2;
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, powerPreference: 'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.36;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#071522');
scene.fog = new THREE.FogExp2('#071522', 0.022);
const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 100);
const phys = new ClockPhysics();

const mat = {
  brass: new THREE.MeshStandardMaterial({color: '#c5954f', metalness: 0.73, roughness: 0.28}),
  bright: new THREE.MeshStandardMaterial({color: '#f2c779', metalness: 0.73, roughness: 0.22, emissive: '#54300e', emissiveIntensity: 0.11}),
  darkGold: new THREE.MeshStandardMaterial({color: '#795633', metalness: 0.67, roughness: 0.38}),
  wood: new THREE.MeshStandardMaterial({color: '#493526', metalness: 0.07, roughness: 0.76}),
  edgeWood: new THREE.MeshStandardMaterial({color: '#8c633a', metalness: 0.18, roughness: 0.6}),
  stone: new THREE.MeshStandardMaterial({color: '#8a8a79', metalness: 0.12, roughness: 0.75}),
  jade: new THREE.MeshStandardMaterial({color: '#4d9b91', metalness: 0.33, roughness: 0.37}),
  jadeDark: new THREE.MeshStandardMaterial({color: '#124c51', metalness: 0.3, roughness: 0.45}),
  water: new THREE.MeshStandardMaterial({color: '#65e0dc', emissive: '#20a7b3', emissiveIntensity: 0.5, metalness: 0.17, roughness: 0.15, transparent: true, opacity: 0.85}),
  waterSoft: new THREE.MeshBasicMaterial({color: '#66dcd5', transparent: true, opacity: 0.43, depthWrite: false}),
  blue: new THREE.MeshStandardMaterial({color: '#0d2d4e', metalness: 0.3, roughness: 0.56}),
  silk: new THREE.MeshStandardMaterial({color: '#a64f38', metalness: 0.08, roughness: 0.72}),
  black: new THREE.MeshStandardMaterial({color: '#0e212b', metalness: 0.23, roughness: 0.66}),
  glow: new THREE.MeshBasicMaterial({color: '#e6bf78', transparent: true, opacity: 0.7}),
};

function mesh(geometry, material, parent = scene, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function box(w, h, d, material, parent = scene, x = 0, y = 0, z = 0) { return mesh(new THREE.BoxGeometry(w,h,d), material, parent,x,y,z); }
function sphere(r, material, parent = scene, x=0,y=0,z=0, segments=20) { return mesh(new THREE.SphereGeometry(r,segments,12), material,parent,x,y,z); }
function cyl(rt, rb, h, material, parent = scene, x=0,y=0,z=0, segments=24) { return mesh(new THREE.CylinderGeometry(rt,rb,h,segments),material,parent,x,y,z); }
function rod(a,b,r,material,parent=scene) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
  const m = cyl(r,r,start.distanceTo(end),material,parent);
  m.position.copy(start).add(end).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),end.sub(start).normalize());
  return m;
}
function torus(radius, tube, material, parent=scene,x=0,y=0,z=0) { return mesh(new THREE.TorusGeometry(radius,tube,10,80),material,parent,x,y,z); }
function line(points, color, opacity=1, parent=scene) {
  const g = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)));
  const m = new THREE.Line(g,new THREE.LineBasicMaterial({color,transparent:opacity<1,opacity,depthWrite:false})); parent.add(m); return m;
}

scene.add(new THREE.HemisphereLight('#b5d9db','#24150c',2.0));
const sun = new THREE.DirectionalLight('#ffe0a2',3.2); sun.position.set(-5,14,11); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048); sun.shadow.camera.left=-12; sun.shadow.camera.right=12; sun.shadow.camera.top=14; sun.shadow.camera.bottom=-5; sun.shadow.bias=-0.0004; scene.add(sun);
const cyanLight = new THREE.PointLight('#43bbc2',28,22); cyanLight.position.set(-4,5,5); scene.add(cyanLight);
const warmLight = new THREE.PointLight('#f5ae68',33,18); warmLight.position.set(4,8,4); scene.add(warmLight);

// Base and restrained Song-dynasty tower architecture: an open cutaway so the
// entire causal route remains visible, even when the camera moves.
box(12,0.38,5.4,mat.stone,scene,0,-0.18,0);
box(11.5,0.12,5.05,mat.darkGold,scene,0,0.06,0);
box(11.2,0.12,4.8,mat.wood,scene,0,0.16,0);
for (const y of [0.52,5.1,7.75]) {
  box(10.1,0.18,4.2,mat.wood,scene,0,y,-0.23);
  box(10.3,0.055,4.3,mat.edgeWood,scene,0,y+0.12,-0.23);
  for (const z of [-2.24,1.78]) box(10.5,0.11,0.12,mat.brass,scene,0,y+0.05,z);
}
for (const x of [-4.9,4.9]) for (const z of [-2.05,1.58]) {
  box(0.29,10.2,0.29,mat.wood,scene,x,5.15,z);
  for (const y of [0.55,5.2,7.85,10.1]) {
    box(0.53,0.22,0.53,mat.darkGold,scene,x,y,z);
    box(0.41,0.055,0.41,mat.bright,scene,x,y+0.14,z);
  }
}
// Paired roof pitches, ridge, and upturned eaves.
function roof(y,width,depth) {
  const shape = new THREE.Shape();
  shape.moveTo(-width/2-0.36,0);
  shape.quadraticCurveTo(-width/2,0.02,-width/2+0.5,0.09);
  shape.lineTo(0,0.72);
  shape.lineTo(width/2-0.5,0.09);
  shape.quadraticCurveTo(width/2,0.02,width/2+0.36,0);
  shape.lineTo(width/2+0.36,-0.18);
  shape.lineTo(0,0.51);
  shape.lineTo(-width/2-0.36,-0.18);
  const g = new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:6});
  mesh(g,mat.jadeDark,scene,0,y,-depth/2-0.25);
  rod([-width/2-0.36,y-0.09,depth/2-0.25],[width/2+0.36,y-0.09,depth/2-0.25],0.045,mat.bright);
  rod([-width/2-0.36,y-0.09,-depth/2-0.25],[width/2+0.36,y-0.09,-depth/2-0.25],0.045,mat.bright);
  rod([-width/2,y+0.04,0],[0,y+0.71,0],0.032,mat.brass);
  rod([0,y+0.71,0],[width/2,y+0.04,0],0.032,mat.brass);
}
roof(10.32,11.1,5.0);
for (const y of [5.42,8.04]) {
  for (const x of [-4.85,4.85]) rod([x,y,-2.15],[x,y,1.77],0.06,mat.edgeWood);
}
for (let i=0;i<9;i++) { const x=-4+i; box(0.06,0.36,0.06,mat.brass,scene,x,5.42,1.79); }

// Reservoir and visible outlet.
box(1.65,0.58,1.1,mat.darkGold,scene,-4.35,5.28,0.75);
box(1.4,0.09,0.87,mat.water,scene,-4.35,5.6,0.75);
box(2.25,0.16,0.55,mat.edgeWood,scene,-3.56,4.98,0.75);
box(2.2,0.035,0.43,mat.waterSoft,scene,-3.54,5.08,0.75);
const spout = cyl(0.15,0.15,0.47,mat.brass,scene,-2.55,4.79,0.75); spout.rotation.z=-0.3;
const drops=[];
for (let i=0;i<30;i++) drops.push(sphere(i%5===0?0.048:0.031, i%4===0?mat.water:mat.waterSoft,scene));
// Catch basin carries spent water away.
box(4.0,0.19,1.22,mat.darkGold,scene,-1.63,0.46,0.87);
box(3.6,0.033,0.89,mat.waterSoft,scene,-1.7,0.565,0.87);

function makeWheel() {
  const root = new THREE.Group(); root.position.set(-1.76,2.74,0.86); scene.add(root);
  torus(1.76,0.075,mat.brass,root);
  torus(1.46,0.045,mat.darkGold,root);
  torus(1.73,0.028,mat.bright,root,0,0,0.14);
  for (let i=0;i<12;i++) {
    const a=i*TAU/12;
    const spoke=box(1.62,0.105,0.12,mat.edgeWood,root,0.78*Math.cos(a),0.78*Math.sin(a),0);
    spoke.rotation.z=a;
    const sub=new THREE.Group(); sub.position.set(1.62*Math.cos(a),1.62*Math.sin(a),0.11); sub.rotation.z=a; root.add(sub);
    box(0.37,0.25,0.43,mat.darkGold,sub,0,0,0);
    box(0.31,0.035,0.37,mat.edgeWood,sub,0,0.14,0);
    box(0.28,0.06,0.32,mat.water,sub,0,0.178,0);
    const fill=sub.children[sub.children.length-1]; fill.userData.bucket=i; fill.userData.isFill=true;
    cyl(0.048,0.048,0.45,mat.bright,root,1.65*Math.cos(a),1.65*Math.sin(a),0.31).rotation.x=Math.PI/2;
  }
  cyl(0.22,0.22,0.53,mat.brass,root,0,0,0).rotation.x=Math.PI/2;
  cyl(0.09,0.09,1.2,mat.darkGold,scene,-1.76,2.74,0.86).rotation.x=Math.PI/2;
  return root;
}
const wheelVisual=makeWheel();
const fills=[]; wheelVisual.traverse(o=>{if(o.userData.isFill) fills.push(o);});

function makeGear(radius,teeth,depth=0.18,material=mat.brass) {
  const g=new THREE.Group();
  torus(radius*0.82,0.09,material,g);
  torus(radius*0.49,0.045,mat.darkGold,g,0,0,depth/2+0.03);
  for(let i=0;i<teeth;i++) {
    const a=i*TAU/teeth;
    const t=box(radius*0.22,Math.min(0.17,radius*0.2),depth,material,g,radius*Math.cos(a),radius*Math.sin(a),0);
    t.rotation.z=a;
  }
  for(let i=0;i<6;i++) { const a=i*TAU/6; const sp=box(radius*0.9,0.058,depth*0.6,mat.darkGold,g,radius*0.42*Math.cos(a),radius*0.42*Math.sin(a),0); sp.rotation.z=a; }
  cyl(radius*0.19,radius*0.19,depth*1.5,mat.bright,g,0,0,0).rotation.x=Math.PI/2;
  return g;
}
const pinionVisual=makeGear(0.72,12,0.28,mat.bright); pinionVisual.position.set(0.71,2.74,0.86); scene.add(pinionVisual);
// Visible shaft bearing and two bevel-like transmission stations.
rod([0.71,2.75,0.86],[0.71,8.58,0.86],0.079,mat.brass);
for(const y of [3.17,5.4,7.9,8.5]) {
  const ring=torus(0.14,0.038,mat.bright,scene,0.71,y,0.86); ring.rotation.x=Math.PI/2;
}
const shaftVisual=new THREE.Group(); shaftVisual.position.set(0.71,5.6,0.86); scene.add(shaftVisual);
for (const y of [-1.8,0,2.35]) {
  const cross=box(0.92,0.07,0.075,mat.bright,shaftVisual,0,y,0); cross.rotation.y=0;
  box(0.07,0.07,0.92,mat.bright,shaftVisual,0,y,0);
}
const upperGear=makeGear(0.62,12,0.16,mat.brass); upperGear.position.set(0.71,7.92,0.85); scene.add(upperGear);
const camVisual=new THREE.Group(); camVisual.position.set(2.62,5.91,0.2); scene.add(camVisual);
const camDisk=cyl(0.46,0.46,0.12,mat.darkGold,camVisual); camDisk.rotation.x=Math.PI/2;
const camLobe=sphere(0.26,mat.brass,camVisual,0.25,0,0.06); camLobe.scale.set(1.2,0.78,0.5);
torus(0.38,0.025,mat.bright,camVisual,0,0,0.08);
rod([0.72,5.8,0.74],[2.62,5.91,0.2],0.045,mat.brass);

// Physical balance lever / escapement at the upper edge of the wheel.
const leverVisual=new THREE.Group(); leverVisual.position.set(0.05,4.42,1.35); scene.add(leverVisual);
const leverBar=box(1.6,0.09,0.12,mat.bright,leverVisual,-0.28,0,0); leverBar.rotation.z=0.05;
const stopTooth=box(0.16,0.42,0.13,mat.darkGold,leverVisual,-0.9,-0.19,0); stopTooth.rotation.z=0.34;
cyl(0.13,0.13,0.3,mat.bright,scene,0.05,4.42,1.35).rotation.x=Math.PI/2;
const cupGroup=new THREE.Group(); cupGroup.position.set(0.58,4.28,1.35); leverVisual.add(cupGroup);
const cup=cyl(0.23,0.16,0.27,mat.darkGold,cupGroup); cup.position.y=-0.1;
const cupWater=cyl(0.183,0.183,0.05,mat.water,cupGroup,0,-0.04,0);
rod([0.14,4.88,1.36],[0.58,4.55,1.36],0.025,mat.brass);

// Rotating celestial globe, with procedurally placed star dots and tracery.
const globeVisual=new THREE.Group(); globeVisual.position.set(-1.58,6.62,0.11); scene.add(globeVisual);
sphere(0.91,mat.blue,globeVisual,0,0,0,32);
const equator=torus(0.93,0.025,mat.bright,globeVisual); equator.rotation.x=Math.PI/2;
const meridian=torus(0.96,0.027,mat.brass,globeVisual); meridian.rotation.y=Math.PI/2;
const oblique=torus(0.965,0.016,mat.bright,globeVisual); oblique.rotation.x=Math.PI/2.7; oblique.rotation.y=0.3;
let seed=8827; const random=()=>{seed=(seed*16807)%2147483647; return (seed-1)/2147483646;};
const stars=[];
for (let i=0;i<72;i++) {
  const u=random()*TAU,v=Math.acos(2*random()-1),r=0.916;
  const p=[r*Math.sin(v)*Math.cos(u),r*Math.cos(v),r*Math.sin(v)*Math.sin(u)];
  sphere(i%9===0?0.032:0.018,mat.bright,globeVisual,...p,8); stars.push(p);
}
for(let i=0;i<stars.length-1;i+=4) line([stars[i],stars[i+1],stars[i+2]],'#c99d55',0.44,globeVisual);
// Armillary sphere above, each ring is a rigid member of the driven assembly.
const armillaryVisual=new THREE.Group(); armillaryVisual.position.set(-1.58,8.95,0.03); scene.add(armillaryVisual);
const armBase=sphere(0.42,mat.blue,armillaryVisual);
const armRings=[];
for(const [rx,ry,rz,r] of [[0,0,0,1.13],[Math.PI/2,0,0,1.13],[0,Math.PI/2,0,1.13],[0.42,0.36,0,1.17],[-0.68,0.12,0.1,1.19]]) {
  const ring=torus(r,0.035,mat.bright,armillaryVisual); ring.rotation.set(rx,ry,rz); armRings.push(ring);
}
const polar=rod([0,-1.23,0],[0,1.23,0],0.038,mat.brass,armillaryVisual);
sphere(0.11,mat.bright,armillaryVisual,0,1.2,0);
// Fixed armillary pedestal.
cyl(0.65,0.73,0.13,mat.darkGold,scene,-1.58,7.89,0.03);
cyl(0.12,0.12,0.66,mat.brass,scene,-1.58,8.2,0.03);

// Clock face as a visual cue to regulated time. The rotating hand is coupled
// to the shaft through the same physics state as all other driven parts.
const dialCenter=[2.93,8.75,1.7];
const dial=cyl(0.76,0.76,0.09,mat.black,scene,...dialCenter); dial.rotation.x=Math.PI/2;
torus(0.76,0.047,mat.bright,scene,...[dialCenter[0],dialCenter[1],dialCenter[2]+0.075]);
for(let i=0;i<12;i++) {
  const a=i*TAU/12;
  sphere(0.027,mat.bright,scene,dialCenter[0]+0.62*Math.sin(a),dialCenter[1]+0.62*Math.cos(a),dialCenter[2]+0.09,8);
}
const handGroup=new THREE.Group(); handGroup.position.set(dialCenter[0],dialCenter[1],dialCenter[2]+0.11); scene.add(handGroup);
const hand=box(0.056,0.58,0.04,mat.bright,handGroup,0,0.23,0);
sphere(0.09,mat.bright,handGroup,0,0,0.02);

// An automaton slides on a guide. The cam computes its travel; the hammer
// has its own inertia, spring and impact, all handled by ClockPhysics.
const stageX=2.74, stageY=6.12;
box(2.67,0.12,1.54,mat.edgeWood,scene,stageX,5.25,1.14);
for(const x of [1.5,3.98]) {
  box(0.13,1.75,0.17,mat.darkGold,scene,x,6.18,1.53);
  box(0.28,0.12,0.27,mat.bright,scene,x,7.08,1.53);
}
box(2.65,0.12,0.2,mat.darkGold,scene,stageX,7.09,1.53);
const innerArch=torus(0.87,0.044,mat.bright,scene,stageX,6.13,1.56); innerArch.scale.y=0.9;
const figureVisual=new THREE.Group(); figureVisual.position.set(stageX,5.36,1.51); scene.add(figureVisual);
cyl(0.24,0.35,0.75,mat.silk,figureVisual,0,0.46,0,12);
sphere(0.16,mat.stone,figureVisual,0,0.98,0,16);
const hat=cyl(0.23,0.14,0.2,mat.black,figureVisual,0,1.15,0,12);
box(0.42,0.1,0.11,mat.bright,figureVisual,0,0.42,0.31);
rod([-0.28,0.76,0],[0.28,0.76,0],0.07,mat.silk,figureVisual);
const figurePlaque=box(0.39,0.35,0.035,mat.darkGold,figureVisual,0,0.56,0.38);
const plaqueLine=box(0.26,0.025,0.013,mat.bright,figureVisual,0,0.58,0.405);
// Bell and independent hammer pivot.
const bellTop=cyl(0.15,0.15,0.13,mat.bright,scene,4.18,6.72,1.83);
const bellBody=cyl(0.21,0.37,0.55,mat.brass,scene,4.18,6.39,1.83,20);
torus(0.375,0.035,mat.bright,scene,4.18,6.13,1.83).rotation.x=Math.PI/2;
rod([4.18,7.07,1.83],[4.18,6.77,1.83],0.028,mat.bright);
const hammerVisual=new THREE.Group(); hammerVisual.position.set(3.81,6.22,2.03); scene.add(hammerVisual);
rod([0,0,0],[0.38,0.47,0],0.035,mat.darkGold,hammerVisual);
sphere(0.105,mat.bright,hammerVisual,0.38,0.47,0);
sphere(0.07,mat.bright,scene,3.81,6.22,2.03);

// Background stars, engraved concentric circles, and a faint grid establish
// scale without bringing in image assets or textures.
const starPoints=[];
for(let i=0;i<250;i++) {
  const x=(random()-0.5)*38,y=random()*18-1,z=-7-random()*6;
  starPoints.push(x,y,z);
}
const starGeo=new THREE.BufferGeometry(); starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPoints,3));
scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:'#8ab2b4',size:0.028,transparent:true,opacity:0.45,sizeAttenuation:true})));
for(const r of [5.2,7.3,9.2]) {
  const pts=[]; for(let i=0;i<=120;i++){let a=i*TAU/120;pts.push([r*Math.cos(a),0.018,r*Math.sin(a)]);} line(pts,'#6b734f',0.21);
}
for(let x=-8;x<=8;x+=1) line([[x,0.014,-5],[x,0.014,5]],'#476569',0.075);
for(let z=-5;z<=5;z+=1) line([[-8,0.014,z],[8,0.014,z]],'#476569',0.075);

const chapters=[
  {at:0, end:4.2, tag:'序章 / 全貌', num:'引子 · 00', en:'THE WATER CLOCK', title:'一滴水，如何报时？', desc:'北宋苏颂造了一座会观星、会报时的天文钟。它的动力，来自不断流下的水。', active:-1},
  {at:4.2,end:10.2,tag:'第一步 / 水轮',num:'第一步 · 01',en:'WATER BECOMES MOTION',title:'水落入斗，重量转动水轮',desc:'水从高处流下，注满轮缘上的水斗。装水的一侧变重，拉着水轮转动。',active:1},
  {at:10.2,end:16.1,tag:'第二步 / 擒纵',num:'第二步 · 02',en:'THE ESCAPEMENT',title:'卡住，再放行一格',desc:'水杯渐满，压动擒纵杆：放开一个齿，又立刻扣住下一个。水轮因此按节拍前进。',active:2},
  {at:16.1,end:22.0,tag:'第三步 / 传动',num:'第三步 · 03',en:'GEARS CARRY THE TURN',title:'齿轮把转动送上塔顶',desc:'水轮咬合小齿轮，带动竖轴。上层的天球与浑仪，随着同一股动力旋转。',active:3},
  {at:22.0,end:28.7,tag:'第四步 / 报时',num:'第四步 · 04',en:'THE HOUR IS ANNOUNCED',title:'转到时刻，偶人出来报时',desc:'竖轴再带动凸轮。凸轮推偶人走出门洞，拨动木槌，敲响铜钟。',active:4},
  {at:28.7,end:30.1,tag:'全程 / 一眼看懂',num:'总览 · 05',en:'ONE CHAIN OF CAUSE',title:'一滴水，驱动整座时钟',desc:'流水 → 水轮 → 擒纵 → 齿轮 → 天象与报时。',active:5}
];
const cameraKeys=[
  {t:0,p:[11.6,9.1,18.8],q:[0,5.2,0]},
  {t:3.0,p:[11.5,9.1,18.5],q:[0,5.1,0]},
  {t:5.2,p:[3.4,5.9,11.5],q:[-1.8,3.05,0.35]},
  {t:9.0,p:[3.5,5.6,10.7],q:[-1.8,3.1,0.4]},
  {t:11.2,p:[3.7,5.6,8.5],q:[-0.15,4.2,0.65]},
  {t:15.0,p:[3.5,5.5,9.0],q:[-0.2,4.2,0.7]},
  {t:17.2,p:[7.0,8.5,14.0],q:[-0.5,7.0,0.1]},
  {t:21.0,p:[6.5,8.2,13.3],q:[-0.6,7.2,0.1]},
  {t:23.3,p:[7.5,8.4,10.8],q:[2.65,6.9,0.5]},
  {t:27.8,p:[7.5,8.3,10.8],q:[2.65,6.9,0.5]},
  {t:30,p:[11.6,9.1,18.8],q:[0,5.2,0]}
];
function ease(x) { return x*x*(3-2*x); }
function lerp(a,b,t) { return a+(b-a)*t; }
function cameraAt(t) {
  let i=0; while(i<cameraKeys.length-2 && t>cameraKeys[i+1].t) i++;
  const a=cameraKeys[i], b=cameraKeys[i+1], f=ease(THREE.MathUtils.clamp((t-a.t)/(b.t-a.t),0,1));
  camera.position.set(...a.p.map((v,k)=>lerp(v,b.p[k],f)));
  camera.lookAt(...a.q.map((v,k)=>lerp(v,b.q[k],f)));
}
const calloutEls=['calloutA','calloutB','calloutC','calloutD'].map(id=>document.getElementById(id));
const anchors=[new THREE.Vector3(-2.85,3.55,1.1),new THREE.Vector3(0.15,4.5,1.5),new THREE.Vector3(0.72,6.5,1.0),new THREE.Vector3(2.65,6.15,2.15)];
function positionCallouts(active) {
  calloutEls.forEach((el,i)=>{
    const on=active===i+1;
    el.classList.toggle('visible',on);
    if(!on) return;
    const p=anchors[i].clone().project(camera);
    el.style.left=`${(p.x*0.5+0.5)*100}%`;
    el.style.top=`${(-p.y*0.5+0.5)*100}%`;
  });
}

const audio = {
  ctx:null, master:null, on:false, lastMelody:-1,
  init() {
    if(this.ctx) return;
    this.ctx=new AudioContext();
    const compressor=this.ctx.createDynamicsCompressor(); compressor.threshold.value=-18; compressor.knee.value=18; compressor.ratio.value=5; compressor.attack.value=0.006; compressor.release.value=0.25;
    this.master=this.ctx.createGain(); this.master.gain.value=0; this.master.connect(compressor); compressor.connect(this.ctx.destination);
    for(const [f,g] of [[110,0.013],[164.8,0.008],[220.1,0.007]]) {
      const o=this.ctx.createOscillator(),gain=this.ctx.createGain(),filter=this.ctx.createBiquadFilter();
      o.type='sine'; o.frequency.value=f; gain.gain.value=g; filter.type='lowpass'; filter.frequency.value=340;
      o.connect(filter);filter.connect(gain);gain.connect(this.master);o.start();
    }
    // Filtered random pressure fluctuations make a quiet, continuous stream.
    const samples=this.ctx.sampleRate*2;
    const buffer=this.ctx.createBuffer(1,samples,this.ctx.sampleRate);
    const data=buffer.getChannelData(0); let noiseSeed=727;
    for(let i=0;i<samples;i++){noiseSeed=(noiseSeed*16807)%2147483647;data[i]=(noiseSeed/1073741823-1)*0.36;}
    const water=this.ctx.createBufferSource(),waterFilter=this.ctx.createBiquadFilter(),waterGain=this.ctx.createGain();
    water.buffer=buffer;water.loop=true;waterFilter.type='lowpass';waterFilter.frequency.value=680;waterGain.gain.value=0.028;
    water.connect(waterFilter);waterFilter.connect(waterGain);waterGain.connect(this.master);water.start();
  },
  tone(freq,duration=0.5,level=0.05,type='sine') {
    if(!this.on || !this.ctx) return;
    const now=this.ctx.currentTime, o=this.ctx.createOscillator(),g=this.ctx.createGain();
    o.type=type; o.frequency.setValueAtTime(freq,now); o.frequency.exponentialRampToValueAtTime(freq*0.995,now+duration);
    g.gain.setValueAtTime(0.0001,now);g.gain.exponentialRampToValueAtTime(level,now+0.012);g.gain.exponentialRampToValueAtTime(0.0001,now+duration);
    o.connect(g);g.connect(this.master);o.start(now);o.stop(now+duration+0.02);
  },
  tick() { this.tone(620,0.11,0.025,'triangle'); this.tone(308,0.17,0.009,'sine'); },
  bell() { this.tone(392,2.1,0.09); this.tone(784,1.55,0.022); this.tone(1110,1.15,0.013); },
  music(t) {
    const beat=Math.floor(t/2.6);
    if(beat===this.lastMelody) return;
    this.lastMelody=beat;
    const notes=[293.66,329.63,392,440,392,329.63,261.63,293.66,392,440,523.25,392];
    this.tone(notes[beat%notes.length],1.9,0.026,'sine');
    this.tone(notes[beat%notes.length]/2,2.3,0.009,'triangle');
  }
};
const soundButton=document.querySelector('#soundButton');
soundButton.addEventListener('click',async()=>{
  audio.init();await audio.ctx.resume();audio.on=!audio.on;
  audio.master.gain.setTargetAtTime(audio.on?0.48:0,audio.ctx.currentTime,0.045);
  document.querySelector('#soundIcon').textContent=audio.on?'●':'○';
  soundButton.classList.toggle('sound-on',audio.on);
  if(audio.on) audio.tone(392,0.45,0.04);
});
// Try autoplay where permitted. A user click still enables sound in stricter browsers.
try { audio.init(); audio.ctx.resume().then(()=>{ if(audio.ctx.state==='running'){audio.on=true;audio.master.gain.setTargetAtTime(0.48,audio.ctx.currentTime,0.05);document.querySelector('#soundIcon').textContent='●';soundButton.classList.add('sound-on');} }); } catch {}

let playing=true, filmTime=0, lastFrame=performance.now(), currentChapter=-1;
const timeline=document.querySelector('#timeline');
const playButton=document.querySelector('#playButton');
function setPlaying(v){playing=v;document.querySelector('#playIcon').textContent=v?'Ⅱ':'▶';playButton.setAttribute('aria-label',v?'暂停':'播放');}
playButton.addEventListener('click',()=>setPlaying(!playing));
timeline.addEventListener('input',()=>{filmTime=+timeline.value;phys.advanceTo(filmTime);renderState();});
timeline.addEventListener('pointerdown',()=>setPlaying(false));
timeline.addEventListener('change',()=>setPlaying(true));
window.seek=(t)=>{filmTime=THREE.MathUtils.clamp(t,0,30);phys.advanceTo(filmTime);renderState();};
window.clockPhysics=phys;

function renderState() {
  const t=filmTime;
  cameraAt(t);
  wheelVisual.rotation.z=phys.wheel.a;
  pinionVisual.rotation.z=phys.pinion.a;
  shaftVisual.rotation.y=phys.shaft.a;
  upperGear.rotation.z=phys.shaft.a;
  camVisual.rotation.z=phys.cam.a;
  leverVisual.rotation.z=phys.lever.a;
  globeVisual.rotation.y=phys.globe.a;
  armillaryVisual.rotation.y=phys.armillary.a;
  handGroup.rotation.z=-phys.shaft.a*0.42;
  figureVisual.position.z=1.51+phys.figure.x;
  hammerVisual.rotation.z=phys.hammer.a;
  cupWater.scale.y=0.08+Math.min(1,phys.cupMass/1.2)*0.9;
  fills.forEach(f=>{const m=phys.bucket[f.userData.bucket];f.scale.y=0.03+0.9*m;f.visible=m>0.035;});
  for(let i=0;i<drops.length;i++) {
    const phase=((t*1.55+i/drops.length)%1+1)%1;
    const p=drops[i];
    p.position.set(-2.55+0.44*phase,4.58-2.6*phase*phase,0.76+0.07*Math.sin(i*3.6));
    p.scale.setScalar(0.45+0.55*(1-phase));
  }
  let index=chapters.findIndex(c=>t>=c.at && t<c.end); if(index<0) index=chapters.length-1;
  const chapter=chapters[index];
  if(index!==currentChapter) {
    currentChapter=index;
    document.querySelector('#chapterTag').textContent=chapter.tag;
    document.querySelector('#stepNumber').textContent=chapter.num;
    document.querySelector('#stepTitleEn').textContent=chapter.en;
    document.querySelector('#headline').textContent=chapter.title;
    document.querySelector('#description').textContent=chapter.desc;
    document.querySelectorAll('#chain span').forEach((el,i)=>el.classList.toggle('active',i===chapter.active || chapter.active===5));
  }
  positionCallouts(chapter.active);
  timeline.value=t;
  timeline.style.setProperty('--progress',`${t/30*100}%`);
  document.querySelector('#timeText').textContent=`00:${String(Math.floor(t)).padStart(2,'0')}`;
  renderer.render(scene,camera);
}
function animate(now) {
  const delta=Math.min((now-lastFrame)/1000,2.5); lastFrame=now;
  if(playing) {
    filmTime=Math.min(30,filmTime+delta);
    const old=phys.time;
    while(phys.time+STEP<=filmTime) {
      phys.step(STEP);
      if(phys.justStepped && phys.time>old) audio.tick();
      if(phys.justStruck && phys.time>old) audio.bell();
    }
    if(filmTime>=30) setPlaying(false);
  }
  audio.music(filmTime);
  renderState();
  requestAnimationFrame(animate);
}
addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();});
renderState(); requestAnimationFrame(animate);

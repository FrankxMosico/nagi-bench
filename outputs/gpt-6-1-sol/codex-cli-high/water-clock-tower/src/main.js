import * as THREE from 'three';
import * as C from 'cannon-es';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const $ = s => document.querySelector(s);
const TAU=Math.PI*2, STEP=1/120, DURATION=32;
const renderer=new THREE.WebGLRenderer({canvas:$('#scene'),antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
renderer.setClearColor(0x0b2428); renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.13;
const scene=new THREE.Scene(); scene.fog=new THREE.FogExp2(0x0b2428,.026);
const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,100);
scene.add(new THREE.HemisphereLight(0xc9ede0,0x3a2010,2.2));
const sun=new THREE.DirectionalLight(0xffdfab,4.2);sun.position.set(-4,10,7);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-5;sun.shadow.normalBias=.035;scene.add(sun);
const rim=new THREE.DirectionalLight(0x69c7c8,3.1);rim.position.set(5,7,-5);scene.add(rim);
const point=new THREE.PointLight(0x79eee2,8,6,2);point.position.set(-2,4,2);scene.add(point);
const mat={
 wood:new THREE.MeshStandardMaterial({color:0x74523a,roughness:.7}),
 dark:new THREE.MeshStandardMaterial({color:0x382f27,roughness:.8}),
 edge:new THREE.MeshStandardMaterial({color:0xad7e4b,roughness:.54}),
 gold:new THREE.MeshStandardMaterial({color:0xd1a765,metalness:.72,roughness:.31}),
 bronze:new THREE.MeshStandardMaterial({color:0x8b7047,metalness:.7,roughness:.45}),
 red:new THREE.MeshStandardMaterial({color:0x853f31,roughness:.65}),
 water:new THREE.MeshStandardMaterial({color:0x63d7ce,metalness:.25,roughness:.16,emissive:0x174b4d,emissiveIntensity:.5}),
 glass:new THREE.MeshStandardMaterial({color:0x4b9990,transparent:true,opacity:.24,metalness:.25,roughness:.25,side:THREE.DoubleSide,depthWrite:false}),
 ink:new THREE.MeshStandardMaterial({color:0x123b41,metalness:.35,roughness:.5}),
 ivory:new THREE.MeshStandardMaterial({color:0xead8a9,roughness:.6}),
 floor:new THREE.MeshStandardMaterial({color:0x123033,roughness:.9}),
 line:new THREE.MeshStandardMaterial({color:0x557367,metalness:.4,roughness:.6})
};
const staticG=new THREE.Group();scene.add(staticG);
function mesh(geo,material,parent=staticG,x=0,y=0,z=0){const m=new THREE.Mesh(geo,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(p,x,y,z,sx,sy,sz,m=mat.wood){return mesh(new THREE.BoxGeometry(sx,sy,sz),m,p,x,y,z)}
function cyl(p,x,y,z,r,h,m=mat.gold,axis='y',n=32){const o=mesh(new THREE.CylinderGeometry(r,r,h,n),m,p,x,y,z);if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;return o;}
function tor(p,x,y,z,r,t,m=mat.gold,rx=0,ry=0){const o=mesh(new THREE.TorusGeometry(r,t,8,64),m,p,x,y,z);o.rotation.set(rx,ry,0);return o;}
function sphere(p,x,y,z,r,m=mat.gold){return mesh(new THREE.SphereGeometry(r,16,12),m,p,x,y,z)}
function beam(p,a,b,width,depth,m=mat.wood){const mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);const o=box(p,mid.x,mid.y,mid.z,width,a.distanceTo(b),depth,m);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());return o;}
function consolidate(g){g.updateMatrixWorld(true);const inv=g.matrixWorld.clone().invert(), batches=new Map(), old=[];g.traverse(o=>{if(o.isMesh){const geo=o.geometry.clone().applyMatrix4(inv.clone().multiply(o.matrixWorld));if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(geo);old.push(o)}});for(const o of old){o.removeFromParent();o.geometry.dispose()}for(const [m,geos] of batches){const joined=mergeGeometries(geos,false);const ob=mesh(joined,m,g);ob.castShadow=m!==mat.glass;for(const geo of geos)geo.dispose();}}
// An open architectural section: every part is made from primitives.
cyl(staticG,0,-.22,0,4.5,.28,mat.floor,'y',96);tor(staticG,0,-.065,0,4.13,.014,mat.line,Math.PI/2);tor(staticG,0,-.06,0,3.72,.009,mat.line,Math.PI/2);
for(let i=0;i<72;i++){const a=i/72*TAU,r=4.08;const o=box(staticG,Math.cos(a)*r,-.06,Math.sin(a)*r,.012,.008,i%6===0?.16:.065,mat.gold);o.rotation.y=-a+Math.PI/2;}
box(staticG,0,.05,0,4.55,.2,2.9,mat.dark);box(staticG,0,.19,0,4.38,.13,2.75,mat.edge);box(staticG,0,.3,0,4.22,.13,2.6,mat.wood);
for(const x of [-1.83,1.83])for(const z of [-.85,.85]){
 if(x<0&&z>0){box(staticG,x,1.7,z,.17,2.65,.17,mat.wood);box(staticG,x,5.69,z,.17,1.4,.17,mat.wood);}else box(staticG,x,3.37,z,.17,6.04,.17,mat.wood);box(staticG,x,.52,z,.34,.3,.32,mat.dark);box(staticG,x,6.34,z,.31,.18,.3,mat.edge);
 for(const y of [2.95,4.95,6.3]){box(staticG,x,y,z,.27,.12,.26,mat.gold);}
}
for(const y of [3.05,4.98,6.36]){
 // The front deck is cut away to expose the mechanism.
 box(staticG,0,y,-.78,3.95,.18,.22,mat.wood);box(staticG,0,y,.82,3.95,.14,.17,mat.edge);
 for(const x of [-1.86,1.86])box(staticG,x,y,0,.18,.18,1.85,mat.wood);
}
for(const x of [-1.83,1.83]){beam(staticG,new THREE.Vector3(x,.5,-.8),new THREE.Vector3(x,2.8,.8),.08,.08,mat.dark);beam(staticG,new THREE.Vector3(x,3.1,-.8),new THREE.Vector3(x,4.85,.8),.08,.08,mat.dark)}
// A shallow roof cornice beneath the sky instruments.
box(staticG,0,6.48,0,4.35,.14,2.28,mat.dark);box(staticG,0,6.58,0,4.05,.12,2.09,mat.red);
for(const x of [-1.7,-1.1,-.5,.1,.7,1.3,1.8]){box(staticG,x,6.4,.98,.11,.25,.32,mat.edge);box(staticG,x,6.4,-.98,.11,.25,.32,mat.edge)}
box(staticG,1.1,6.76,0,1.2,.18,1.25,mat.wood);cyl(staticG,1.1,6.93,0,.4,.2,mat.gold);
// Constant-head reservoir, visible through its front wall.
const tank={x:-2.31,y:4.28,z:.05};
box(staticG,tank.x,tank.y-.46,tank.z,1.03,.12,.95,mat.bronze);
for(const x of [tank.x-.5,tank.x+.5])box(staticG,x,tank.y,tank.z,.07,.95,.95,mat.bronze);
box(staticG,tank.x,tank.y,tank.z-.46,1.05,.95,.06,mat.bronze);box(staticG,tank.x,tank.y,tank.z+.46,1.05,.95,.026,mat.glass);
box(staticG,tank.x,tank.y+.12,tank.z,.94,.53,.87,mat.glass);box(staticG,tank.x,tank.y+.38,tank.z,.94,.015,.87,mat.water);
for(const y of [tank.y-.39,tank.y+.45]){box(staticG,tank.x,y,tank.z+.48,1.08,.04,.05,mat.gold)}
for(let i=0;i<5;i++)box(staticG,tank.x+.38,tank.y-.24+i*.13,tank.z+.485,.11,.012,.02,mat.ivory);
// Upper inlet and overflow tube.
cyl(staticG,-2.31,5.17,.05,.11,.63,mat.bronze);tor(staticG,-2.31,4.87,.05,.12,.025,mat.gold,Math.PI/2);
cyl(staticG,-2.89,4.64,.05,.075,.42,mat.gold,'x');cyl(staticG,-3.06,4.08,.05,.065,1.14,mat.bronze);
// Low head supply trough towards the buckets.
box(staticG,-1.04,3.99,.25,2.02,.055,.34,mat.bronze);
for(const z of [.09,.41])box(staticG,-1.04,4.06,z,2.02,.15,.025,mat.gold);
box(staticG,-1.04,4.03,.25,2.02,.025,.27,mat.water);
box(staticG,-.02,3.98,.25,.25,.06,.35,mat.gold);
// Lower collection tray.
box(staticG,-.55,.47,.1,2.8,.14,1.35,mat.bronze);box(staticG,-.55,.57,.1,2.65,.035,1.22,mat.water);
for(const z of [-.56,.76])box(staticG,-.55,.62,z,2.85,.24,.08,mat.edge);
for(const x of [-1.96,.86])box(staticG,x,.62,.1,.08,.24,1.35,mat.edge);
// Bearing blocks and the exposed horizontal axle.
for(const z of [-.56,.65]){box(staticG,-.6,2.05,z,.45,.45,.19,mat.wood);tor(staticG,-.6,2.05,z+.11,.17,.035,mat.gold)}
cyl(staticG,-.6,2.05,.12,.085,1.72,mat.gold,'z');
for(const y of [2.15,3.03,4.98,6.45]){box(staticG,1.1,y,-.06,.47,.12,.44,mat.dark);tor(staticG,1.1,y+.07,0,.14,.03,mat.gold,Math.PI/2)}
// Time-telling gallery, bell and figure.
box(staticG,2.35,3.35,.9,1.35,.15,1.05,mat.wood);
for(const x of [1.85,2.92]){box(staticG,x,4.27,.7,.07,1.75,.07,mat.red);box(staticG,x,5.09,.7,.22,.08,.24,mat.gold)}
box(staticG,2.39,5.1,.7,1.34,.11,.23,mat.dark);box(staticG,2.39,5.2,.7,1.48,.1,.4,mat.red);
const bellProfile=[new THREE.Vector2(.19,0),new THREE.Vector2(.25,.04),new THREE.Vector2(.22,.12),new THREE.Vector2(.18,.28),new THREE.Vector2(.11,.42),new THREE.Vector2(.06,.45)];
mesh(new THREE.LatheGeometry(bellProfile,32),mat.gold,staticG,2.83,4.45,.95);tor(staticG,2.83,4.5,.95,.22,.015,mat.bronze,Math.PI/2);cyl(staticG,2.83,4.98,.95,.015,.19,mat.gold);
// Carved wooden timekeeper. The arm below is a separate rigid body.
cyl(staticG,2.24,3.5,1.02,.14,.24,mat.dark);const robe=mesh(new THREE.ConeGeometry(.22,.5,10),mat.red,staticG,2.24,3.87,1.02);sphere(staticG,2.24,4.25,1.02,.14,mat.edge);cyl(staticG,2.24,4.39,1.02,.19,.07,mat.dark);box(staticG,2.24,4.45,1.02,.18,.08,.15,mat.dark);
for(const x of [2.19,2.29])sphere(staticG,x,4.26,1.151,.013,mat.ink);
// Small fixed dial panel.
box(staticG,-.7,5.43,.88,1.05,.68,.08,mat.dark);tor(staticG,-.7,5.43,.94,.25,.015,mat.gold);
for(let i=0;i<12;i++){const a=i/12*TAU;const o=box(staticG,-.7+Math.sin(a)*.21,5.43+Math.cos(a)*.21,.94,.015,.045,.02,mat.ivory);o.rotation.z=-a}
consolidate(staticG);

let randomSeed=917;function random(){randomSeed=(1664525*randomSeed+1013904223)>>>0;return randomSeed/4294967296;}
let world,anchor,wheel,latch,pinion,shaft,sky,globe,cam,hammer,brake,rotors=[],drops=[],wheelAngle=0,prevWheel=0,locked=true,nextStop=0,waterTick=0,sourceTick=0,stepCount=0,releases=0,strikes=0,lastStrike=-2,simTime=0,loadTorque=0,tripTorque=0;
let dynamicRoot=new THREE.Group();scene.add(dynamicRoot);
const wheelCenter=new C.Vec3(-.6,2.05,.1), axisZ=new C.Vec3(0,0,1),axisY=new C.Vec3(0,1,0);
const waterMaterial=new C.Material('water'),solidMaterial=new C.Material('solid');
let waterInstances,bellBody;
function physicalRotor(pos,axis,mass,radius,depth=.15){const b=new C.Body({mass,material:solidMaterial,position:new C.Vec3(...pos),angularDamping:.025,linearDamping:.1});const q=new C.Quaternion();if(axis==='z')q.setFromEuler(Math.PI/2,0,0);b.addShape(new C.Cylinder(radius,radius,depth,16),new C.Vec3(),q);world.addBody(b);const hinge=new C.HingeConstraint(anchor,b,{pivotA:b.position.clone(),pivotB:new C.Vec3(),axisA:axis==='z'?axisZ:axisY,axisB:axis==='z'?axisZ:axisY,maxForce:1e5});world.addConstraint(hinge);const g=new THREE.Group();dynamicRoot.add(g);rotors.push({body:b,mesh:g});return {body:b,mesh:g};}
class GearEquation extends C.Equation{
 constructor(a,b,axisA,axisB,ratio){super(a,b,-1e4,1e4);this.axA=axisA;this.axB=axisB;this.ratio=ratio;this.setSpookParams(1e7,4,STEP)}
 computeB(h){this.axA.scale(this.ratio,this.jacobianElementA.rotational);this.axB.negate(this.jacobianElementB.rotational);return -this.computeGW()*this.b-h*this.computeGiMf()}
}
function gears(a,b,aa,ab,ratio){const con=new C.Constraint(a,b,{collideConnected:false});con.update=()=>{};con.equations.push(new GearEquation(a,b,aa,ab,ratio));world.addConstraint(con);}
function gearMesh(g,r,teeth,depth=.14){cyl(g,0,0,0,r*.86,depth,mat.bronze,'z');tor(g,0,0,depth/2+.01,r*.68,.026,mat.gold);for(let i=0;i<teeth;i++){const a=i/teeth*TAU;const t=box(g,Math.cos(a)*r*.92,Math.sin(a)*r*.92,0,r*.2,r*.13,depth,mat.gold);t.rotation.z=a}cyl(g,0,0,0,r*.2,depth+.08,mat.gold,'z');for(let i=0;i<6;i++){const a=i*TAU/6;cyl(g,Math.cos(a)*r*.47,Math.sin(a)*r*.47,depth/2+.015,r*.09,.018,mat.dark,'z',12)}}
function initPhysics(){
 for(const o of rotors){o.mesh.traverse(m=>{if(m.isMesh)m.geometry.dispose()})}if(waterInstances)waterInstances.geometry.dispose();dynamicRoot.clear();rotors=[];drops=[];wheelAngle=0;prevWheel=0;locked=true;nextStop=0;waterTick=0;sourceTick=0;stepCount=0;releases=0;strikes=0;lastStrike=-2;simTime=0;loadTorque=0;tripTorque=0;randomSeed=917;
 world=new C.World({gravity:new C.Vec3(0,-9.81,0),allowSleep:false});world.broadphase=new C.SAPBroadphase(world);world.solver.iterations=24;world.solver.tolerance=1e-6;world.defaultContactMaterial.friction=.16;world.defaultContactMaterial.restitution=.04;
 anchor=new C.Body({mass:0});world.addBody(anchor);
 const floor=new C.Body({mass:0,material:solidMaterial});floor.addShape(new C.Box(new C.Vec3(2,.06,1)),new C.Vec3(-.5,.48,.1));world.addBody(floor);
 world.addContactMaterial(new C.ContactMaterial(waterMaterial,solidMaterial,{friction:.25,restitution:.03,contactEquationStiffness:1e6}));
 wheel=physicalRotor([-.6,2.05,.1],'z',2.6,1.19,.21);wheel.body.collisionFilterGroup=1;wheel.body.collisionFilterMask=2;
 // Open spokes, twelve scoop buckets, and two wheel rims.
 for(const z of [-.2,.2]){tor(wheel.mesh,0,0,z,1.14,.055,mat.wood);tor(wheel.mesh,0,0,z,1.01,.018,mat.gold)}
 for(let i=0;i<12;i++){
  const a=i*TAU/12;const cup=new THREE.Group();cup.position.set(Math.cos(a)*1.18,Math.sin(a)*1.18,0);cup.rotation.z=a-Math.PI/2;wheel.mesh.add(cup);
  box(cup,0,-.02,0,.42,.06,.49,mat.edge);box(cup,-.2,.09,0,.045,.24,.49,mat.wood);box(cup,.2,.09,0,.045,.24,.49,mat.wood);box(cup,0,.06,-.24,.42,.21,.035,mat.dark);
  box(cup,0,.06,.24,.42,.21,.025,mat.glass);box(cup,0,.19,.25,.44,.025,.03,mat.gold);
  const sp=box(wheel.mesh,Math.cos(a)*.6,Math.sin(a)*.6,0,1.03,.065,.11,mat.wood);sp.rotation.z=a;
  const q=new C.Quaternion();q.setFromEuler(0,0,a-Math.PI/2);wheel.body.addShape(new C.Box(new C.Vec3(.21,.035,.245)),new C.Vec3(Math.cos(a)*1.18,Math.sin(a)*1.18,0),q);
  sphere(wheel.mesh,Math.cos(a)*1.07,Math.sin(a)*1.07,.28,.035,mat.gold);
 }
 for(let i=0;i<36;i++){const a=i*TAU/36;const t=box(wheel.mesh,Math.cos(a)*1.12,Math.sin(a)*1.12,-.25,.10,.055,.12,mat.gold);t.rotation.z=a;}
 cyl(wheel.mesh,0,0,0,.22,.61,mat.gold,'z');gearMesh(wheel.mesh,.46,16,.09);
 // A zero-speed equation is a physical brake: it is removed by the tipping balance.
 brake=new C.RotationalMotorEquation(anchor,wheel.body,1e5);brake.axisA.copy(axisZ);brake.axisB.copy(axisZ);brake.targetVelocity=0;const bc=new C.Constraint(anchor,wheel.body);bc.update=()=>{};bc.equations.push(brake);world.addConstraint(bc);
 latch=physicalRotor([.84,1.64,.58],'z',.11,.11,.12);latch.body.collisionFilterMask=0;latch.body.addShape(new C.Box(new C.Vec3(.47,.028,.055)),new C.Vec3(.15,0,0));box(latch.mesh,.15,0,0,.94,.055,.11,mat.gold);box(latch.mesh,-.27,.13,0,.07,.3,.1,mat.red);cyl(latch.mesh,.53,-.07,0,.16,.07,mat.bronze);sphere(latch.mesh,-.28,.29,0,.065,mat.ivory);cyl(latch.mesh,0,0,0,.09,.16,mat.bronze,'z');
 pinion=physicalRotor([1.03,2.05,.1],'z',.11,.41,.2);pinion.body.collisionFilterMask=0;gearMesh(pinion.mesh,.43,16,.21);gears(wheel.body,pinion.body,axisZ,axisZ,-2.8);
 shaft=physicalRotor([1.1,4.29,-.15],'y',.13,.08,4.5);shaft.body.collisionFilterMask=0;cyl(shaft.mesh,0,0,0,.065,4.53,mat.gold);for(const y of [-2.1,-1.1,.6,1.9]){cyl(shaft.mesh,0,y,0,.22,.09,mat.gold);for(let i=0;i<12;i++){const a=i*TAU/12;box(shaft.mesh,Math.cos(a)*.22,y,Math.sin(a)*.22,.055,.13,.055,mat.bronze)}}gears(pinion.body,shaft.body,axisZ,axisY,1);
 globe=physicalRotor([.2,5.52,0],'y',.055,.53,.5);globe.body.collisionFilterMask=0;sphere(globe.mesh,0,0,0,.51,mat.ink);
 for(let j=-2;j<=2;j++){const lat=j*.18,r=Math.sqrt(.52*.52-lat*lat);tor(globe.mesh,0,lat,0,r,.007,mat.gold,Math.PI/2)}
 for(let j=0;j<6;j++)tor(globe.mesh,0,0,0,.518,.006,mat.bronze,0,j*Math.PI/6);
 for(let i=0;i<67;i++){const y=1-2*(i+.5)/67,r=Math.sqrt(1-y*y),a=i*2.39996;sphere(globe.mesh,Math.cos(a)*r*.523,y*.523,Math.sin(a)*r*.523,i%7===0?.016:.008,mat.ivory)}
 tor(globe.mesh,0,0,0,.61,.018,mat.gold);
 cyl(globe.mesh,0,-.52,0,.60,.07,mat.bronze);for(let i=0;i<32;i++){const a=i*TAU/32;const t=box(globe.mesh,Math.cos(a)*.62,-.52,Math.sin(a)*.62,.075,.08,.055,mat.gold);t.rotation.y=-a;}
 gears(shaft.body,globe.body,axisY,axisY,.22);
 sky=physicalRotor([1.1,7.48,0],'y',.06,.7,.4);sky.body.collisionFilterMask=0;
 tor(sky.mesh,0,0,0,.77,.025,mat.gold,Math.PI/2);tor(sky.mesh,0,0,0,.77,.025,mat.gold,0,.5);tor(sky.mesh,0,0,0,.72,.018,mat.gold,.78,.35);tor(sky.mesh,0,0,0,.68,.018,mat.gold,-.65,-.35);cyl(sky.mesh,0,0,0,.026,1.63,mat.gold);sphere(sky.mesh,0,0,0,.1,mat.ivory);
 for(let i=0;i<48;i++){const a=i*TAU/48;const t=box(sky.mesh,Math.cos(a)*.78,0,Math.sin(a)*.78,.015,.055,.012,mat.ivory);t.rotation.y=-a}
 gears(shaft.body,sky.body,axisY,axisY,.16);
 // Cam and follower make the clock figure's hammer lift and fall by contact.
 cam=physicalRotor([1.68,3.86,1.02],'z',.035,.3,.1);cam.body.collisionFilterGroup=4;cam.body.collisionFilterMask=8;gearMesh(cam.mesh,.28,14,.12);sphere(cam.mesh,.31,0,0,.13,mat.gold);cam.body.addShape(new C.Sphere(.13),new C.Vec3(.31,0,0));gears(shaft.body,cam.body,axisY,axisZ,3.5);
 hammer=physicalRotor([2.22,4.09,1.02],'z',.04,.06,.08);hammer.body.collisionFilterGroup=8;hammer.body.collisionFilterMask=4|16;hammer.body.quaternion.setFromAxisAngle(axisZ,-.62);
 box(hammer.mesh,-.27,-.04,0,.58,.065,.075,mat.edge);beam(hammer.mesh,new THREE.Vector3(),new THREE.Vector3(.42,.63,0),.07,.07,mat.edge);cyl(hammer.mesh,.45,.65,0,.105,.19,mat.dark,'z');cyl(hammer.mesh,0,0,0,.075,.12,mat.gold,'z');
 hammer.body.addShape(new C.Box(new C.Vec3(.29,.033,.04)),new C.Vec3(-.27,-.04,0));hammer.body.addShape(new C.Sphere(.09),new C.Vec3(.45,.65,0));
 bellBody=new C.Body({mass:0,position:new C.Vec3(2.85,4.70,1.02),collisionFilterGroup:16,collisionFilterMask:8});bellBody.addShape(new C.Sphere(.035));world.addBody(bellBody);
 world.addEventListener('beginContact',e=>{if((e.bodyA===hammer.body&&e.bodyB===bellBody)||(e.bodyB===hammer.body&&e.bodyA===bellBody)){if(hammerWasUp&&simTime-lastStrike>.48){hammerWasUp=false;lastStrike=simTime;strikes++;sound.bell();}}});
 for(const o of rotors)consolidate(o.mesh);
 waterInstances=new THREE.InstancedMesh(new THREE.SphereGeometry(.055,8,6),mat.water,100);waterInstances.instanceMatrix.setUsage(THREE.DynamicDrawUsage);waterInstances.count=0;waterInstances.castShadow=false;waterInstances.frustumCulled=false;dynamicRoot.add(waterInstances);
}
const dummy=new THREE.Object3D();
function drop(kind){if(drops.length>=95)return;const b=new C.Body({mass:kind==='drive'?.057:.008,material:waterMaterial,linearDamping:.06,collisionFilterGroup:2,collisionFilterMask:1|16});b.addShape(new C.Sphere(kind==='drive'?.055:.038));
 if(kind==='drive'){b.position.set(-.045+(random()-.5)*.08,3.89,.13+(random()-.5)*.16);b.velocity.set(.05,-.35,0)}
 else if(kind==='inlet'){b.position.set(-2.31+(random()-.5)*.06,4.87,.05+(random()-.5)*.04);b.velocity.set(0,-.25,0)}
 else{b.position.set(-3.06,3.53,.05);b.velocity.set(0,-.3,0)}
 world.addBody(b);drops.push({body:b,kind,born:simTime,bound:false,joint:null});}
let hammerWasUp=false;
function physicalStep(){
 simTime+=STEP;waterTick+=STEP;sourceTick+=STEP;if(waterTick>.16){waterTick-=.16;drop('drive')}if(sourceTick>.1){sourceTick-=.1;drop('inlet');drop('overflow')}
 loadTorque=0;tripTorque=0;
 for(let i=drops.length-1;i>=0;i--){const d=drops[i],p=d.body.position;
  if(d.kind==='drive'){
   if(!d.bound&&!d.drained&&p.y<3.43&&p.y>2.28&&p.x>-.45&&p.x<.55){const local=wheel.body.pointToLocalFrame(p);const r=Math.hypot(local.x,local.y),ang=Math.atan2(local.y,local.x);const near=Math.round(ang/(TAU/12))*(TAU/12);
    if(r<1.37&&r>1.05&&Math.abs(ang-near)<.20){d.joint=new C.LockConstraint(wheel.body,d.body,{maxForce:1e4});world.addConstraint(d.joint);d.bound=true;}
   }
   if(d.bound){const weightMoment=Math.max(0,p.x-wheelCenter.x)*d.body.mass*9.81;loadTorque+=weightMoment;if(p.y>2.89&&p.x<.32)tripTorque+=weightMoment;if(p.y<1.13){world.removeConstraint(d.joint);d.joint=null;d.bound=false;d.drained=true}}
  }
  if((d.kind==='inlet'&&p.y<4.63)||p.y<.54||simTime-d.born>9){if(d.joint)world.removeConstraint(d.joint);world.removeBody(d.body);drops.splice(i,1)}
 }
 const la=2*Math.atan2(latch.body.quaternion.z,latch.body.quaternion.w);
 latch.body.torque.z+=-1.35*la-.16*latch.body.angularVelocity.z-(locked?tripTorque*.32:0);
 if(locked&&la<-.205&&tripTorque>.65){locked=false;brake.enabled=false;nextStop=-(stepCount+1)*TAU/12;releases++;sound.tick(.08)}
 if(!locked&&wheelAngle<=nextStop){locked=true;brake.enabled=true;stepCount++;sound.tick(.2)}
 // A weak return spring represents the wooden hammer's counterweight.
 const ha=2*Math.atan2(hammer.body.quaternion.z,hammer.body.quaternion.w);
 hammer.body.torque.z+=-.12*(ha-.08)-.022*hammer.body.angularVelocity.z;
 if(ha<-.50)hammerWasUp=true;
 
 
 world.step(STEP);
 const angle=2*Math.atan2(wheel.body.quaternion.z,wheel.body.quaternion.w);let delta=angle-prevWheel;while(delta>Math.PI)delta-=TAU;while(delta<-Math.PI)delta+=TAU;wheelAngle+=delta;prevWheel=angle;
}
function syncPhysics(){for(const {body,mesh:g} of rotors){g.position.copy(body.position);g.quaternion.copy(body.quaternion)}waterInstances.count=drops.length;drops.forEach((d,i)=>{dummy.position.copy(d.body.position);dummy.quaternion.copy(d.body.quaternion);dummy.scale.setScalar(d.kind==='drive'?1:.68);dummy.updateMatrix();waterInstances.setMatrixAt(i,dummy.matrix)});waterInstances.instanceMatrix.needsUpdate=true;}

// All sound is synthesized here; no audio assets are loaded.
class Sound{
 constructor(){this.ctx=null;this.enabled=false;this.nextNote=0;this.muted=false;}
 async toggle(){if(!this.ctx){this.ctx=new AudioContext();const c=this.ctx;this.master=c.createGain();this.master.gain.value=.5;this.compressor=c.createDynamicsCompressor();this.compressor.threshold.value=-15;this.compressor.knee.value=16;this.compressor.ratio.value=5;this.master.connect(this.compressor);this.compressor.connect(c.destination);
  const buffer=c.createBuffer(1,c.sampleRate*2,c.sampleRate),a=buffer.getChannelData(0);let v=0;for(let i=0;i<a.length;i++){v=.91*v+(Math.random()*2-1)*.09;a[i]=v*.35}const noise=c.createBufferSource();noise.buffer=buffer;noise.loop=true;const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=1200;this.waterGain=c.createGain();this.waterGain.gain.value=.13;noise.connect(f);f.connect(this.waterGain);this.waterGain.connect(this.master);noise.start();}
 this.enabled=!this.enabled;if(this.enabled){this.nextNote=0;await this.ctx.resume();this.master.gain.setTargetAtTime(.5,this.ctx.currentTime,.15)}else this.master.gain.setTargetAtTime(0,this.ctx.currentTime,.1);return this.enabled;}
 tone(freq,duration,volume,type='sine',delay=0){if(!this.enabled||this.muted)return;const c=this.ctx,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.04)}
 tick(v){if(this.ctx&&this.ctx.currentTime-(this.tickTime??-10)<.045)return;if(this.ctx)this.tickTime=this.ctx.currentTime;this.tone(470,.07,v*.15,'triangle');this.tone(910,.028,v*.08)}
 bell(){if(this.ctx&&this.ctx.currentTime-(this.bellTime??-10)<.18)return;if(this.ctx)this.bellTime=this.ctx.currentTime;[1,2.01,2.76,4.05].forEach((r,i)=>this.tone(440*r,2.6/(1+i*.3),.12/(i+1)));}
 update(t){if(t>this.nextNote){this.nextNote=t+2.7;const notes=[146.83,196,220,293.66,261.63,196,164.81,220,293.66,196,146.83,220];this.tone(notes[Math.floor(t/2.7)%notes.length],3,.075);this.tone(73.416,3.5,.037);}}
}
const sound=new Sound();
initPhysics();
const acts=[
 {start:0,end:3.8,eye:'北宋 · 苏颂 · 水运仪象台',title:'把流水<br>变成<span>时间</span>',desc:'九百多年前，一座木制高台，<br>让水流驱动星辰，也让木人按时报时。',key:'32″',mech:'看懂一座水力天文钟',sub:'水给动力，机械把它变成有节奏的时间。',caption:'水运仪象台 · 工作原理剖视',cam:[10.8,7.7,15.2],target:[-1.5,3.9,0],labels:['sky','wheel','figure']},
 {start:3.8,end:9,eye:'01 / 稳定水流',title:'水稳，<br>时才<span>准</span>。',desc:'上方持续补水，多余的水从溢流口流走，<br>水位保持稳定，流向水轮的水也更均匀。',key:'恒定水位',mech:'让每斗水的积蓄时间相近',sub:'先稳住水位，再让水匀速流入受水斗。',caption:'上层水箱 · 恒定水头',cam:[4.3,5.8,9.2],target:[-1.9,4.2,.1],labels:['tank','overflow','spout']},
 {start:9,end:14.8,eye:'02 / 水重驱轮',title:'一斗水，<br>一份<span>动力</span>。',desc:'水落进轮缘的受水斗，越积越重。<br>重力拉着这一侧向下，给水轮转动的力。',key:'水的重量',mech:'向下的重力 → 转动的力矩',sub:'受水斗逐渐变重，水的重量成为水轮的动力。',caption:'下层枢轮 · 水重产生力矩',cam:[5.4,4.7,9.4],target:[-1.35,2.25,.1],labels:['spout','bucket','gravity']},
 {start:14.8,end:20.5,eye:'03 / 擒纵定步',title:'停一下，<br>再走<span>一格</span>。',desc:'水斗够重，压动秤杆，止挡放开；<br>水轮转过一格，止挡再扣住，等下一斗。',key:'擒纵机构',mech:'积水 → 放行 → 再锁住',sub:'止挡控制“走”与“停”，把水流分成重复的步进。',caption:'擒纵原理 · 秤杆与止挡简化示意',cam:[5.2,3.5,8.1],target:[-.62,1.98,.25],labels:['bucket','latch']},
 {start:20.5,end:26,eye:'04 / 齿轮传动',title:'一轮牵动，<br>满台<span>皆转</span>。',desc:'水轮拨动齿轮，再带动竖直传动轴。<br>不同齿轮减速，把步进传给浑仪与浑象。',key:'齿轮与轴',mech:'水轮 → 齿轮 → 天文仪器',sub:'同一份水力，沿齿轮和传动轴送往各层。',caption:'中央传动 · 联动观天与计时',cam:[8.9,7.1,12.2],target:[-.75,4.7,0],labels:['pinion','shaft','sky','globe']},
 {start:26,end:32,eye:'05 / 按时报时',title:'转到时刻，<br>木人<span>报时</span>。',desc:'传动也带着报时轮转动；到设定位置，<br>拨动木人敲钟、击鼓或出牌，告诉人们时刻。',key:'水运仪象台',mech:'流水有动力，机械有节律，报时有次序',sub:'从一斗水，到一次报时：水力就这样变成了时间。',caption:'报时层 · 以凸轮与敲钟木人示意',cam:[7.0,5.7,8.8],target:[.15,4.05,.5],labels:['cam','figure','bell']}
];
const labelData={sky:{p:[1.18,8.27,0],name:'浑仪',note:'观测天象',left:false},globe:{p:[.15,5.54,.57],name:'浑象',note:'演示星空',left:true},wheel:{p:[.1,1.8,.45],name:'水轮',note:'动力之源'},figure:{p:[2.22,4.48,1.05],name:'报时木人',left:false},tank:{p:[-2.45,4.7,.5],name:'稳定水位',left:true},overflow:{p:[-3.08,4.32,.14],name:'多余的水溢出',left:true},spout:{p:[-.04,3.67,.4],name:'均匀供水',left:false},bucket:{p:[.42,2.85,.4],name:'受水斗',note:'积水增重'},gravity:{p:[.7,1.97,.4],name:'↓ 重力拉动',left:false},latch:{p:[1.18,1.65,.6],name:'秤杆 / 止挡',note:'放行 · 锁住'},pinion:{p:[1.21,2.13,.4],name:'传动齿轮'},shaft:{p:[1.15,4.35,-.05],name:'竖直传动轴',left:false},cam:{p:[1.64,3.88,1.1],name:'报时轮拨动',left:true},bell:{p:[2.85,4.72,1.07],name:'到时敲钟',left:false}};
for(const [id,l] of Object.entries(labelData)){const div=document.createElement('div');div.className='annotation'+(l.left?' left':'');div.innerHTML=`<span class="pin"></span><span class="line"></span><span class="label">${l.name}${l.note?`<small>${l.note}</small>`:''}</span>`;$('#annotations').append(div);l.el=div;l.v=new THREE.Vector3(...l.p);}
let filmTime=0,playing=true,currentAct=-1,accumulator=0,lastFrame=performance.now(),isSeeking=false;
const viewPosition=new THREE.Vector3(),viewTarget=new THREE.Vector3(),projected=new THREE.Vector3();
function smooth(t){t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)}
function updateFilm(t,instant=false){const i=acts.findIndex(a=>t<a.end);const idx=i<0?acts.length-1:i,a=acts[idx];if(idx!==currentAct){currentAct=idx;$('#eyebrow').textContent=a.eye;$('#title').innerHTML=a.title;$('#description').innerHTML=a.desc;$('#mechanism').innerHTML=`<span>${a.key}</span>${a.mech}`;$('#subtitle').textContent=a.sub;$('#scene-caption').textContent=a.caption;$('.story').classList.remove('swap');void $('.story').offsetWidth;if(!instant&&idx!==0)$('.story').classList.add('swap');}
 const previous=acts[Math.max(0,idx-1)],blend=smooth((t-a.start)/1.2);viewPosition.set(...previous.cam).lerp(new THREE.Vector3(...a.cam),blend);viewTarget.set(...previous.target).lerp(new THREE.Vector3(...a.target),blend);
 // Only the camera is animated. Mechanical transforms always come from Cannon bodies.
 const drift=Math.sin(t*.18)*.12;viewPosition.x+=drift;
 if(t>30.2){const end=smooth((t-30.2)/1.8);viewPosition.lerp(new THREE.Vector3(...acts[0].cam),end);viewTarget.lerp(new THREE.Vector3(...acts[0].target),end);}
 if(innerWidth<600){viewPosition.multiplyScalar(1.35);viewTarget.y+=1.5;viewTarget.x+=.45;camera.fov=42;}else camera.fov=35;
 camera.position.copy(viewPosition);camera.lookAt(viewTarget);camera.updateProjectionMatrix();camera.updateMatrixWorld();
 for(const [id,l]of Object.entries(labelData)){const show=a.labels.includes(id)&&!(innerWidth<600&&id==='sky');l.el.classList.toggle('on',show);if(show){projected.copy(l.v).project(camera);l.el.style.left=`${(projected.x*.5+.5)*innerWidth}px`;l.el.style.top=`${(-projected.y*.5+.5)*innerHeight}px`;}}
 $('#time').textContent='00:'+String(Math.min(32,Math.floor(t))).padStart(2,'0');
 document.querySelectorAll('.chapters button').forEach((b,k)=>{const start=acts[k+1].start,end=acts[k+1].end;const progress=Math.min(1,Math.max(0,(t-start)/(end-start)));b.querySelector('em').style.transform=`scaleX(${progress})`;b.classList.toggle('active',idx===k+1);b.querySelector('span').dataset.short=['稳水','驱轮','定步','传动','报时'][k]});
 if(t>=30.2)$('#subtitle').textContent='稳水 → 积水驱轮 → 擒纵定步 → 齿轮传动 → 木人报时';
 $('#pulse').textContent=locked?'止挡锁住 · 积水中':'止挡放行 · 前进一步';if(idx===3)$('#subtitle').textContent='积水增重 → 秤杆下压 → 放行一格 → 重新锁住';
}
function setPlaying(v){playing=v;$('#play').setAttribute('aria-label',v?'暂停短片':filmTime>=32?'重播短片':'继续播放');$('#play svg').innerHTML=v?'<path d="M8 5v14M16 5v14"/>':'<path d="m8 5 11 7-11 7Z"/>';if(sound.ctx)sound.master.gain.setTargetAtTime(v&&sound.enabled?.5:0,sound.ctx.currentTime,.15);lastFrame=performance.now();}
function seek(t){isSeeking=true;sound.muted=true;initPhysics();hammerWasUp=false;const steps=Math.round(t/STEP);for(let n=0;n<steps;n++)physicalStep();filmTime=Math.min(t,32);accumulator=0;currentAct=-1;syncPhysics();updateFilm(filmTime,true);renderer.render(scene,camera);sound.muted=false;sound.nextNote=t+1;lastFrame=performance.now();isSeeking=false;}
$('#play').onclick=()=>{if(filmTime>=32){seek(0);setPlaying(true)}else setPlaying(!playing)};
$('#replay').onclick=()=>{seek(0);setPlaying(true)};
$('#sound').onclick=async()=>{const enabled=await sound.toggle();$('#sound').setAttribute('aria-pressed',String(enabled));$('#sound').title=enabled?'关闭声音':'开启声音';$('#sound span').textContent=enabled?'声音开启':'声音关闭';$('#sound').setAttribute('aria-label',enabled?'关闭程序合成配乐':'开启程序合成配乐');$('#sound svg').innerHTML=enabled?'<path d="M4 9v6h4l5 4V5L8 9H4m13-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>':'<path d="M4 9v6h4l5 4V5L8 9H4m13 0 4 6m0-6-4 6"/>';if(!playing&&sound.ctx)sound.master.gain.setTargetAtTime(0,sound.ctx.currentTime,.1)};
$('#fullscreen').onclick=()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()};
for(const b of document.querySelectorAll('[data-time]'))b.onclick=()=>{seek(Number(b.dataset.time));setPlaying(true)};
addEventListener('keydown',e=>{if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();$('#play').click()}if(e.code==='KeyM')$('#sound').click();if(e.code==='KeyR')$('#replay').click()});
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();updateFilm(filmTime);renderer.render(scene,camera)}addEventListener('resize',resize);resize();
function frame(){const now=performance.now();requestAnimationFrame(frame);if(!playing||isSeeking){lastFrame=now;return;}let dt=Math.max(0,(now-lastFrame)/1000);lastFrame=now;if(playing&&!isSeeking){dt=Math.min(dt,32-filmTime);filmTime+=dt;accumulator+=dt;while(accumulator>=STEP){physicalStep();accumulator-=STEP}sound.update(filmTime);if(filmTime>=32){setPlaying(false);$('#subtitle').textContent='一斗水，一步轮，一声钟。流水，成为时间。'}}syncPhysics();updateFilm(filmTime);renderer.render(scene,camera);}
syncPhysics();updateFilm(0);renderer.render(scene,camera);$('#loading').classList.add('done');lastFrame=performance.now();requestAnimationFrame(frame);
// Read-only diagnostics and deterministic replay are provided for verification.
window.__film={seek(t){setPlaying(false);seek(t)},play(){setPlaying(true)},pause(){setPlaying(false)},get state(){return {time:filmTime,physicsTime:simTime,drops:drops.length,bound:drops.filter(d=>d.bound).length,wheelAngle,locked,releases,steps:stepCount,strikes,latchAngle:2*Math.atan2(latch.body.quaternion.z,latch.body.quaternion.w),hammerAngle:2*Math.atan2(hammer.body.quaternion.z,hammer.body.quaternion.w),loadTorque,tripTorque,bodies:world.bodies.length,gears:world.constraints.filter(c=>c.equations.some(e=>e instanceof GearEquation)).length,renderer:renderer.info.render};}};

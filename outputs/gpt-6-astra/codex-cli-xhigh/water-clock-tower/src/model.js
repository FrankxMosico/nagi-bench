import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
const TAU = Math.PI * 2;
const palette = {
  wood: '#73533a', edge: '#a27c4c', darkwood: '#493e2e', brass: '#b19250', bright: '#c8b171',
  green: '#3d6156', roof: '#4c6b5e', roofedge: '#738676', darkgreen: '#294f48', stone: '#a9ab94',
  base: '#b8b8a2', water: '#3e9994', red: '#985b41', cream: '#d8cba6', black: '#343f36'
};
export function createModel(scene) {
  const materials = {};
  for (const [name, color] of Object.entries(palette)) materials[name] = new THREE.MeshStandardMaterial({color, roughness: name === 'brass' || name === 'bright' ? .32 : .78, metalness: name === 'brass' || name === 'bright' ? .65 : .08});
  materials.water.transparent = true; materials.water.opacity = .84; materials.water.roughness=.18; materials.water.metalness=.15;
  const stationary = new THREE.Group(); scene.add(stationary);
  const dynamic = {};
  function mesh(geom, mat, parent=stationary, position=[0,0,0], rotation=[0,0,0]) {
    const m = new THREE.Mesh(geom, typeof mat === 'string' ? materials[mat] : mat);
    m.position.set(...position); m.rotation.set(...rotation); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
  }
  const box = (w,h,d,mat,p,x=0,y=0,z=0,rx=0,ry=0,rz=0) => mesh(new THREE.BoxGeometry(w,h,d),mat,p,[x,y,z],[rx,ry,rz]);
  const cyl = (r,h,mat,p,x=0,y=0,z=0,rx=0,ry=0,rz=0,r2=r,n=32) => mesh(new THREE.CylinderGeometry(r,r2,h,n),mat,p,[x,y,z],[rx,ry,rz]);
  const ring = (r,t,mat,p,x=0,y=0,z=0,rx=0,ry=0,rz=0) => mesh(new THREE.TorusGeometry(r,t,6,64),mat,p,[x,y,z],[rx,ry,rz]);
  const sphere = (r,mat,p,x=0,y=0,z=0) => mesh(new THREE.SphereGeometry(r,20,14),mat,p,[x,y,z]);
  function lineBetween(a,b,r,mat,parent=stationary) {
    const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),d=vb.clone().sub(va);
    const m=cyl(r,d.length(),mat,parent,...va.clone().add(vb).multiplyScalar(.5).toArray());
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m;
  }
  function mergeGroup(group) {
    group.updateMatrixWorld(true); const batches = new Map(); const inverse=group.matrixWorld.clone().invert(); const remove=[];
    group.traverse(m=>{ if (!m.isMesh || m.isInstancedMesh) return; const key=m.material.uuid; if(!batches.has(key)) batches.set(key,{material:m.material,geometries:[]}); const g=m.geometry.clone(); g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,m.matrixWorld)); if(g.index) { const flat=g.toNonIndexed();g.dispose();batches.get(key).geometries.push(flat); }else batches.get(key).geometries.push(g); remove.push(m); });
    remove.forEach(m=>{m.parent.remove(m);m.geometry.dispose();});
    for(const b of batches.values()){ const geom=mergeGeometries(b.geometries,false); const m=new THREE.Mesh(geom,b.material);m.castShadow=true;m.receiveShadow=true;group.add(m);b.geometries.forEach(g=>g.dispose()); }
  }
  function rotor(name,position){const group=new THREE.Group();group.position.set(...position);scene.add(group);dynamic[name]=group;return group;}
  function gear(parent,radius,teeth,mat='brass',z=0){
    ring(radius*.85,radius*.11,mat,parent,0,0,z);cyl(radius*.23,.20,mat,parent,0,0,z,Math.PI/2);
    for(let i=0;i<6;i++)box(radius*1.6,.065,.12,mat,parent,0,0,z,0,0,i*Math.PI/3);
    for(let i=0;i<teeth;i++){const a=i/teeth*TAU;box(.11,.16,.15,mat,parent,Math.cos(a)*radius,Math.sin(a)*radius,z,0,0,a-Math.PI/2);}
  }
  function plaque(text,w,h,x,y,z,parent=stationary){
    const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');
    ctx.fillStyle='#344c40';ctx.fillRect(0,0,512,128);ctx.strokeStyle='#c3ab73';ctx.lineWidth=3;ctx.strokeRect(9,9,494,110);ctx.fillStyle='#e0d1a1';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='52px "Noto Serif CJK SC", serif';ctx.fillText(text,256,68);
    const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
    mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:tex,roughness:.9}),parent,[x,y,z]);
  }
  // Low stone plinth, three broad steps and incised bronze corners.
  box(6.8,.20,4.4,'base',stationary,0,.02,0);box(6.35,.16,4.05,'stone',stationary,0,.19,0);box(5.9,.14,3.8,'darkwood',stationary,0,.34,0);
  for(const z of [1.85,2.02,2.18])box(2.1,.10,.36,'stone',stationary,0,.11+(2.18-z)*.6,z);
  box(5.78,.08,3.65,'wood',stationary,0,.45,0);
  for(let i=-7;i<=7;i++)box(.012,.005,3.5,'edge',stationary,i*.38,.495,0);
  // Open timber frame. Narrow rear slats leave the machinery visible.
  for(const x of [-2.1,2.1])for(const z of [-1.18,1.18]){
    if(x>0 && z>0){cyl(.20,.19,'darkwood',stationary,x,.59,z);continue;} // Static cutaway opens the view of the water and balance.
    cyl(.16,6.1,'wood',stationary,x,3.53,z);cyl(.21,.23,'darkwood',stationary,x,.62,z);cyl(.20,.15,'brass',stationary,x,.79,z);
    for(const y of [3.78,6.18]){box(.42,.13,.42,'edge',stationary,x,y,z);box(.62,.12,.42,'wood',stationary,x,y+.12,z);box(.80,.13,.45,'wood',stationary,x,y+.23,z);}
  }
  for(const y of [.65,3.9,6.27]){
    for(const z of [-1.18,1.18]){if(y===3.9&&z>0)box(2.8,.17,.18,'darkwood',stationary,-.85,y,z);else box(4.5,.17,.18,'darkwood',stationary,0,y,z);}
    for(const x of [-2.1,2.1])box(.18,.17,2.55,'darkwood',stationary,x,y,0);
  }
  for(let x=-1.9;x<=1.9;x+=.3)box(.07,1.5,.05,'green',stationary,x,5.2,-1.2);
  for(const x of [-2.1,2.1])for(const y of [3.2,5.6])for(const z of [-1.18,1.18]){
    if(x>0&&z>0)continue;
    const innerX=x-Math.sign(x)*.55;lineBetween([x,y,z],[innerX,y+.65,z],.055,'wood');
  }
  function roof(y,w,d){
    // Small curved eaves; surfaces and individual tile ridges are procedural.
    const nx=24,nz=12,pos=[],idx=[];
    const height=(x,z)=>y+.24*(1-Math.abs(z)/(d/2))+.16*Math.pow(Math.abs(x)/(w/2),4)+.12*Math.pow(Math.abs(z)/(d/2),5);
    for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=(i/nx-.5)*w,z=(j/nz-.5)*d;pos.push(x,height(x,z),z);}
    for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){if(y<5 && (i/nx-.5)*w>.5 && (j/nz-.5)*d>=0)continue;const a=j*(nx+1)+i;idx.push(a,a+1,a+nx+1,a+1,a+nx+2,a+nx+1);}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();const roofmat=materials.roof.clone();roofmat.side=THREE.DoubleSide;mesh(geo,roofmat);
    for(let i=0;i<=20;i++){const x=(i/20-.5)*w;for(let j=0;j<8;j++){const z1=(j/8-.5)*d,z2=((j+1)/8-.5)*d;if(y<5&&x>.5&&z1>=0)continue;lineBetween([x,height(x,z1)+.025,z1],[x,height(x,z2)+.025,z2],.024,'roofedge');}}
    for(const z of [-d/2,d/2])for(let i=0;i<24;i++){const x1=(i/24-.5)*w,x2=((i+1)/24-.5)*w;if(y<5&&x1>.5&&z>0)continue;lineBetween([x1,height(x1,z),z],[x2,height(x2,z),z],.052,'roofedge');}
    if(y<5){box(w-.2,.09,(d-.18)/2,'darkwood',stationary,0,y-.08,-(d-.18)/4);box(w/2+.3,.09,(d-.18)/2,'darkwood',stationary,-w/4+.25,y-.08,(d-.18)/4);}else box(w-.2,.09,d-.18,'darkwood',stationary,0,y-.08,0);
    for(const x of [-w/2,w/2])for(const z of [-d/2,d/2]){sphere(.075,'brass',stationary,x,y+.30,z);}
  }
  roof(3.97,4.9,3.0);roof(6.37,4.8,2.95);
  plaque('水 運 儀 象 臺',1.9,.35,0,3.77,1.52);
  // The great driving wheel: open spokes, bronze hoops, rivets and 12 visible scoops.
  const wheel=rotor('wheel',[0,2.18,.66]);
  for(const z of [-.16,.16]){ring(1.38,.055,'darkwood',wheel,0,0,z);ring(1.30,.03,'brass',wheel,0,0,z);}
  cyl(.21,.65,'darkwood',wheel,0,0,0,Math.PI/2);cyl(.12,.72,'brass',wheel,0,0,0,Math.PI/2);
  const waterMeshes=[];
  for(let i=0;i<12;i++){
    const a=Math.PI/6+i/12*TAU;
    box(2.76,.065,.15,'wood',wheel,0,0,0,0,0,a);
    const scoop=new THREE.Group();scoop.position.set(1.44*Math.cos(a),1.44*Math.sin(a),0);scoop.rotation.z=a-Math.PI/6;wheel.add(scoop);
    box(.32,.045,.43,'edge',scoop,0,-.12,0);
    for(const x of [-.155,.155])box(.035,.22,.43,'wood',scoop,x,-.015,0);
    for(const z of [-.20,.20])box(.32,.22,.035,'wood',scoop,0,-.015,z);
    box(.34,.025,.46,'brass',scoop,0,-.10,0);
    for(const z of [-.22,.22])sphere(.025,'bright',scoop,0,-.01,z);
    // Water volume is scalar mass / density, not a driven mechanical part.
    const liquid=box(.267,.1,.35,'water',undefined);scene.remove(liquid);scoop.add(liquid);liquid.position.set(0,-.075,0);waterMeshes.push(liquid);
  }
  // Merge wheel metal and timber but retain the changing water-volume meshes.
  waterMeshes.forEach(m=>m.parent.remove(m));
  mergeGroup(wheel);
  // Put individual water cells in their exact rigid cup frames after batching.
  waterMeshes.forEach((m,i)=>{const frame=new THREE.Group();const a=Math.PI/6+i/12*TAU;frame.position.set(1.44*Math.cos(a),1.44*Math.sin(a),0);frame.rotation.z=a-Math.PI/6;frame.add(m);wheel.add(frame);});
  // Rear driving gear is rigidly keyed to the water-wheel axle.
  const wheelGear=new THREE.Group();wheelGear.position.z=-.61;wheel.add(wheelGear);gear(wheelGear,1.22,32,'brass');mergeGroup(wheelGear);
  const idler=rotor('gear',[-1.77,3.12,.05]);gear(idler,.69,18,'brass');gear(idler,.32,12,'darkwood',-.31);mergeGroup(idler);
  const upper=rotor('upper',[-1.77,6.05,-.26]);gear(upper,.34,12,'brass');mergeGroup(upper);
  const chain=new THREE.InstancedMesh(new THREE.BoxGeometry(.068,.12,.09),materials.darkwood,56);chain.castShadow=true;scene.add(chain);
  const pins=new THREE.InstancedMesh(new THREE.SphereGeometry(.032,6,4),materials.brass,56);scene.add(pins);
  // Bearing blocks and long chain supports.
  for(const y of [2.18,3.12,6.05]){const x=y===2.18?0:-1.77;cyl(.1,.76,'brass',stationary,x,y,-.40,Math.PI/2);box(.36,.34,.16,'darkwood',stationary,x,y,-.88);}
  const shaft=rotor('shaft',[-1.77,4.98,-.52]);cyl(.065,2.55,'brass',shaft);
  for(const yy of [-.50,1.07]){const g=new THREE.Group();g.position.y=yy;g.rotation.x=Math.PI/2;shaft.add(g);gear(g,.48,18,'brass');}mergeGroup(shaft);
  // Constant-head reservoir, overflow and open feeder trough.
  box(1.25,.10,1.0,'darkwood',stationary,2.6,3.97,.51);
  for(const x of [2.0,3.20])box(.08,.46,1,'wood',stationary,x,4.17,.51);
  for(const z of [.04,.98])box(1.25,.46,.065,'wood',stationary,2.6,4.17,z);
  for(const y of [4.04,4.34]){for(const z of [.0,1.02])box(1.32,.035,.035,'brass',stationary,2.6,y,z);for(const x of [1.96,3.24])box(.035,.035,1.05,'brass',stationary,x,y,.51);}
  box(1.08,.025,.85,'water',stationary,2.6,4.28,.51);
  for(const x of [2.35,2.95])for(const z of [.14,.86])box(.09,3.42,.09,'wood',stationary,x,2.25,z);
  box(.97,.045,.23,'wood',stationary,1.69,3.98,.78,0,0,.09);
  for(const z of [.65,.91])box(.97,.12,.035,'edge',stationary,1.69,4.015,z,0,0,.09);
  box(.85,.012,.19,'water',stationary,1.73,4.02,.78,0,0,.09);
  // Small overflow bypass returning to the lower cistern.
  lineBetween([3.24,4.3,.50],[3.42,4.3,.50],.06,'brass');lineBetween([3.42,4.3,.50],[3.42,.45,.50],.026,'water');
  box(3.6,.13,1.3,'green',stationary,.9,.43,.65);
  for(const z of [.04,1.28])box(3.6,.22,.07,'darkgreen',stationary,.9,.52,z);
  for(const x of [-.86,2.66])box(.07,.22,1.3,'darkgreen',stationary,x,.52,.65);
  box(3.43,.015,1.16,'water',stationary,.9,.57,.65);
  // Weighted balance. The entire lever/pallet is one hinged rigid assembly.
  cyl(.10,.45,'brass',stationary,1.96,2.73,1.13,Math.PI/2);box(.13,1.0,.13,'green',stationary,1.96,2.10,1.1);
  const balance=rotor('balance',[1.96,2.73,1.28]);box(1.52,.075,.11,'bright',balance,-.16,0,0);
  box(.38,.06,.34,'brass',balance,-.82,.02,-.20);box(.08,.32,.09,'brass',balance,-.58,.14,-.12);box(.24,.07,.09,'brass',balance,-.66,.30,-.12);
  cyl(.13,.27,'darkwood',balance,.48,-.14,0);cyl(.15,.04,'brass',balance,.48,-.29,0);sphere(.09,'brass',balance,0,0,.10);mergeGroup(balance);
  // Celestial globe between the two eaves.
  const globeHolder=new THREE.Group();globeHolder.position.set(.13,5.20,.03);globeHolder.rotation.z=-.24;scene.add(globeHolder);
  const globe=new THREE.Group();globeHolder.add(globe);dynamic.globe=globe;
  sphere(.74,'darkgreen',globe);for(const a of [-.66,-.33,0,.33,.66]){const rr=Math.sqrt(.746**2-a*a);ring(rr,.006,'brass',globe,0,a,0,Math.PI/2);}
  for(let i=0;i<6;i++)ring(.747,.006,'brass',globe,0,0,0,0,i*Math.PI/6);
  const stars=[];for(let i=0;i<34;i++){const u=i*2.39996,y=1-2*(i+.5)/34,r=Math.sqrt(1-y*y);const p=[.755*r*Math.cos(u),.755*y,.755*r*Math.sin(u)];stars.push(p);sphere(i%7===0?.023:.013,'bright',globe,...p);}
  for(let i=0;i<26;i+=3)lineBetween(stars[i],stars[i+3],.003,'bright',globe);
  mergeGroup(globe);
  ring(.92,.025,'brass',stationary,.13,5.2,.03,0,0,-.24);ring(.91,.025,'bright',stationary,.13,5.2,.03,Math.PI/2);
  cyl(.055,2.0,'brass',stationary,.13,5.2,.03,0,0,-.24);
  for(const x of [-.75,1.0])lineBetween([x,4.35,.03],[x,5.1,.03],.06,'green');
  const globeDrive=rotor('globeDrive',[.13,4.49,.03]);const gd=new THREE.Group();gd.rotation.x=Math.PI/2;globeDrive.add(gd);gear(gd,1.03,32,'brass');mergeGroup(globeDrive);
  // Open astronomical armillary on the upper terrace.
  const ac=[.08,7.52,0];
  for(const x of [-.78,.78])for(const z of [-.50,.50]){lineBetween([x,6.70,z],[x*.75,7.15,z*.7],.07,'green');sphere(.10,'brass',stationary,x,6.73,z);}
  ring(1.04,.034,'brass',stationary,...ac);ring(1.04,.035,'brass',stationary,...ac,Math.PI/2);
  for(let i=0;i<48;i++){const a=i/48*TAU;box(.012,i%4===0?.09:.045,.018,'bright',stationary,ac[0]+Math.cos(a)*1.04,ac[1]+Math.sin(a)*1.04,0,0,0,a-Math.PI/2);}
  const armillary=rotor('armillary',ac);ring(.91,.024,'bright',armillary,0,0,0,.35);ring(.91,.025,'brass',armillary,0,0,0,0,Math.PI/2);ring(.76,.018,'brass',armillary,0,0,0,Math.PI/2,.42);
  cyl(.035,2.1,'brass',armillary,0,0,0,0,0,-.37);cyl(.07,1.48,'darkgreen',armillary,0,0,0,Math.PI/2,.38);cyl(.09,.12,'bright',armillary,.27,0,.69,Math.PI/2,.38);sphere(.10,'brass',armillary);mergeGroup(armillary);
  cyl(.065,.65,'brass',stationary,.08,6.84,0);cyl(.33,.08,'green',stationary,.08,6.60,0);
  // Lower time drum with figurines and a cam-controlled bell striker.
  const carousel=rotor('carousel',[-1.30,.88,1.65]);cyl(.87,.18,'darkwood',carousel);cyl(.90,.035,'brass',carousel,0,.1,0);cyl(.74,.16,'green',carousel,0,.13,0);
  function figure(parent,x,y,z,heading=0,plaqueText=false){
    const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=heading;parent.add(g);
    cyl(.075,.28,'red',g,0,.22,0,0,0,0,.13,12);sphere(.075,'cream',g,0,.43,0);cyl(.09,.055,'black',g,0,.49,0,0,0,0,.075,12);box(.22,.03,.065,'black',g,0,.49,0);
    lineBetween([-.06,.32,0],[-.13,.22,.10],.026,'red',g);lineBetween([.06,.32,0],[.13,.22,.10],.026,'red',g);
    if(plaqueText){box(.22,.22,.025,'cream',g,0,.24,.14);plaque('时',.18,.13,0,.26,.158,g);}return g;
  }
  for(let i=0;i<6;i++){const a=i/6*TAU;figure(carousel,Math.cos(a)*.62,.15,Math.sin(a)*.62,-a+Math.PI/2,i%2===0);}
  for(let i=0;i<24;i++){const a=i/24*TAU;box(.04,.06,.03,'bright',carousel,.88*Math.cos(a),.06,.88*Math.sin(a),0,-a,0);}
  mergeGroup(carousel);
  cyl(.12,.50,'brass',stationary,-1.3,.61,1.65);
  // Bell gantry and a wooden automaton: the hammer is an independent rigid body.
  for(const x of [-2.40,-1.52]){box(.08,1.34,.08,'green',stationary,x,1.49,1.55);box(.18,.07,.18,'brass',stationary,x,.82,1.55);}
  box(1.12,.10,.16,'darkwood',stationary,-1.96,2.18,1.55);
  const bell=rotor('bell',[-1.96,2.10,1.55]);
  const bellPoints=[[0,0],[.08,-.03],[.11,-.12],[.16,-.35],[.23,-.43],[.23,-.47],[.19,-.49],[.18,-.45],[.13,-.34],[.08,-.13],[.04,-.08]].map(p=>new THREE.Vector2(...p));
  mesh(new THREE.LatheGeometry(bellPoints,32),'brass',bell);ring(.20,.018,'bright',bell,0,-.43,0,Math.PI/2);ring(.07,.017,'brass',bell,0,.015,0);mergeGroup(bell);
  const standing=figure(stationary,-1.35,1.00,1.90,-Math.PI/2,false);standing.scale.setScalar(1.20);
  const hammer=rotor('hammer',[-1.25,1.65,1.66]);box(.56,.045,.045,'darkwood',hammer,-.22,0,0);cyl(.07,.13,'wood',hammer,-.50,0,0,Math.PI/2);sphere(.06,'cream',hammer,0,0,0);mergeGroup(hammer);
  const cam=rotor('cam',[-1.36,1.42,1.28]);gear(cam,.25,12,'brass');for(let i=0;i<4;i++){const a=i/4*TAU;cyl(.035,.37,'darkwood',cam,.27*Math.cos(a),.27*Math.sin(a),.18,Math.PI/2);}mergeGroup(cam);
  lineBetween([0,2.18,-.10],[-1.36,1.42,1.28],.045,'brass');
  // Physical droplets, rendered in one draw call.
  const droplets=new THREE.InstancedMesh(new THREE.SphereGeometry(.045,6,5),materials.water,256);droplets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);droplets.frustumCulled=false;scene.add(droplets);
  mergeGroup(stationary);
  // Procedural soft contact shadow (no image file).
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;const ctx=shadowCanvas.getContext('2d');const grad=ctx.createRadialGradient(64,64,12,64,64,64);grad.addColorStop(0,'rgba(43,55,37,0.25)');grad.addColorStop(.55,'rgba(43,55,37,0.13)');grad.addColorStop(1,'rgba(43,55,37,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,128,128);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(11,8),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-.11;scene.add(shadow);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:0x57634c,opacity:.14}));floor.rotation.x=-Math.PI/2;floor.position.y=-.10;floor.receiveShadow=true;scene.add(floor);
  const tmp=new THREE.Object3D();
  function update(p){
    // Rendering is read-only: every moving machine pose comes from the solver.
    dynamic.wheel.rotation.z=-p.wheel.q;
    dynamic.gear.rotation.z=-p.gear.q;dynamic.upper.rotation.z=-p.upper.q;
    dynamic.shaft.rotation.y=p.shaft.q;dynamic.globe.rotation.y=p.globe.q;
    dynamic.globeDrive.rotation.y=p.globe.q;dynamic.armillary.rotation.y=p.armillary.q;
    dynamic.carousel.rotation.y=p.carousel.q;dynamic.balance.rotation.z=p.balance.q;
    dynamic.hammer.rotation.z=-p.hammer.q;dynamic.cam.rotation.z=-p.cam.q;dynamic.bell.rotation.z=p.bell.q;
    waterMeshes.forEach((m,i)=>{const h=Math.min(.18,p.buckets[i].mass*.46);m.visible=h>.001;m.scale.y=h/.1;m.position.y=-.098+h/2;});
    for(let i=0;i<56;i++){const pose=p.chainPose(i);tmp.position.set(pose.x,pose.y,pose.z);tmp.rotation.set(0,0,pose.angle);tmp.scale.set(1,1,1);tmp.updateMatrix();chain.setMatrixAt(i,tmp.matrix);pins.setMatrixAt(i,tmp.matrix);}
    chain.instanceMatrix.needsUpdate=true;pins.instanceMatrix.needsUpdate=true;
    const count=Math.min(256,p.particles.length);droplets.count=count;
    for(let i=0;i<count;i++){const pt=p.particles[i];tmp.position.set(pt.x,pt.y,pt.z);tmp.rotation.set(0,0,0);tmp.scale.set(1,1.5,1);tmp.updateMatrix();droplets.setMatrixAt(i,tmp.matrix);}droplets.instanceMatrix.needsUpdate=true;
  }
  return {update,materials,dynamic,stationary};
}

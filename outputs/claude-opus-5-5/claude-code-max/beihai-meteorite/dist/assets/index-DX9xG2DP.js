(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,ee=1029,O=1030,te=1031,ne=1033,re=33776,k=33777,ie=33778,ae=33779,A=35840,oe=35841,se=35842,ce=35843,le=36196,ue=37492,de=37496,fe=37808,pe=37809,me=37810,he=37811,ge=37812,_e=37813,ve=37814,ye=37815,j=37816,be=37817,xe=37818,Se=37819,M=37820,Ce=37821,N=36492,we=36494,Te=36495,Ee=36283,De=36284,Oe=36285,ke=36286,Ae=2300,je=2301,Me=2302,Ne=2400,Pe=2401,Fe=2402,Ie=3200,Le=3201,Re=`srgb`,ze=`srgb-linear`,Be=`linear`,Ve=`srgb`,He=7680,Ue=35044,We=2e3,Ge=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Ke=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),qe=1234567,Je=Math.PI/180,Ye=180/Math.PI;function Xe(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Ke[e&255]+Ke[e>>8&255]+Ke[e>>16&255]+Ke[e>>24&255]+`-`+Ke[t&255]+Ke[t>>8&255]+`-`+Ke[t>>16&15|64]+Ke[t>>24&255]+`-`+Ke[n&63|128]+Ke[n>>8&255]+`-`+Ke[n>>16&255]+Ke[n>>24&255]+Ke[r&255]+Ke[r>>8&255]+Ke[r>>16&255]+Ke[r>>24&255]).toLowerCase()}function Ze(e,t,n){return Math.max(t,Math.min(n,e))}function Qe(e,t){return(e%t+t)%t}function $e(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function et(e,t,n){return e===t?0:(n-e)/(t-e)}function tt(e,t,n){return(1-n)*e+n*t}function nt(e,t,n,r){return tt(e,t,1-Math.exp(-n*r))}function rt(e,t=1){return t-Math.abs(Qe(e,t*2)-t)}function it(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function at(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ot(e,t){return e+Math.floor(Math.random()*(t-e+1))}function st(e,t){return e+Math.random()*(t-e)}function ct(e){return e*(.5-Math.random())}function lt(e){e!==void 0&&(qe=e);let t=qe+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ut(e){return e*Je}function dt(e){return e*Ye}function ft(e){return!(e&e-1)&&e!==0}function pt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function mt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function ht(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:console.warn(`THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function gt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function _t(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var vt={DEG2RAD:Je,RAD2DEG:Ye,generateUUID:Xe,clamp:Ze,euclideanModulo:Qe,mapLinear:$e,inverseLerp:et,lerp:tt,damp:nt,pingpong:rt,smoothstep:it,smootherstep:at,randInt:ot,randFloat:st,randFloatSpread:ct,seededRandom:lt,degToRad:ut,radToDeg:dt,isPowerOfTwo:ft,ceilPowerOfTwo:pt,floorPowerOfTwo:mt,setQuaternionFromProperEuler:ht,normalize:_t,denormalize:gt},P=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},yt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0){e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;return}if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bt.copy(this).projectOnVector(e),this.sub(bt)}reflect(e){return this.sub(bt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bt=new F,xt=new yt,St=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ct.makeScale(e,t)),this}rotate(e){return this.premultiply(Ct.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ct.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ct=new St;function wt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Tt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Et(){let e=Tt(`canvas`);return e.style.display=`block`,e}var Dt={};function Ot(e){e in Dt||(Dt[e]=!0,console.warn(e))}function kt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var At=new St().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jt=new St().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mt(){let e={enabled:!0,workingColorSpace:ze,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ft(e.r),e.g=Ft(e.g),e.b=Ft(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Be:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ot(`THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ot(`THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ze]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:r,transfer:Ve,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),e}var Nt=Mt();function Pt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ft(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var It,Lt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{It===void 0&&(It=Tt(`canvas`)),It.width=e.width,It.height=e.height;let t=It.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=It}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Tt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Pt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Pt(t[e]/255)*255):t[e]=Pt(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Rt=0,zt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rt++}),this.uuid=Xe(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Bt(r[t].image)):e.push(Bt(r[t]))}else e=Bt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Bt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Lt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var Vt=0,Ht=new F,Ut=class r extends Ge{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vt++}),this.uuid=Xe(),this.name=``,this.source=new zt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new P(0,0),this.repeat=new P(1,1),this.center=new P(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new St,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ht).x}get height(){return this.source.getSize(Ht).y}get depth(){return this.source.getSize(Ht).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null,Ut.DEFAULT_MAPPING=300,Ut.DEFAULT_ANISOTROPY=1;var Wt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gt=class extends Ge{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Wt(0,0,e,t),this.scissorTest=!1,this.viewport=new Wt(0,0,e,t);let r=new Ut({width:e,height:t,depth:n.depth});this.textures=[];let i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new zt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Kt=class extends Gt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qt=class extends Ut{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Jt=class extends Ut{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Yt=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Zt):Zt.fromBufferAttribute(r,t),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Qt.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Qt.copy(e.boundingBox)),Qt.applyMatrix4(e.matrixWorld),this.union(Qt)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(on),sn.subVectors(this.max,on),$t.subVectors(e.a,on),en.subVectors(e.b,on),tn.subVectors(e.c,on),nn.subVectors(en,$t),rn.subVectors(tn,en),an.subVectors($t,tn);let t=[0,-nn.z,nn.y,0,-rn.z,rn.y,0,-an.z,an.y,nn.z,0,-nn.x,rn.z,0,-rn.x,an.z,0,-an.x,-nn.y,nn.x,0,-rn.y,rn.x,0,-an.y,an.x,0];return!un(t,$t,en,tn,sn)||(t=[1,0,0,0,1,0,0,0,1],!un(t,$t,en,tn,sn))?!1:(cn.crossVectors(nn,rn),t=[cn.x,cn.y,cn.z],un(t,$t,en,tn,sn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Xt=[new F,new F,new F,new F,new F,new F,new F,new F],Zt=new F,Qt=new Yt,$t=new F,en=new F,tn=new F,nn=new F,rn=new F,an=new F,on=new F,sn=new F,cn=new F,ln=new F;function un(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ln.fromArray(e,a);let o=i.x*Math.abs(ln.x)+i.y*Math.abs(ln.y)+i.z*Math.abs(ln.z),s=t.dot(ln),c=n.dot(ln),l=r.dot(ln);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var dn=new Yt,fn=new F,pn=new F,mn=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?dn.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fn.subVectors(e,this.center);let t=fn.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(fn,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fn.copy(e.center).add(pn)),this.expandByPoint(fn.copy(e.center).sub(pn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},hn=new F,gn=new F,_n=new F,vn=new F,yn=new F,bn=new F,xn=new F,Sn=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){gn.copy(e).add(t).multiplyScalar(.5),_n.copy(t).sub(e).normalize(),vn.copy(this.origin).sub(gn);let i=e.distanceTo(t)*.5,a=-this.direction.dot(_n),o=vn.dot(this.direction),s=-vn.dot(_n),c=vn.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(gn).addScaledVector(_n,d),f}intersectSphere(e,t){hn.subVectors(e.center,this.origin);let n=hn.dot(this.direction),r=hn.dot(hn)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,r,i){yn.subVectors(t,e),bn.subVectors(n,e),xn.crossVectors(yn,bn);let a=this.direction.dot(xn),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vn.subVectors(this.origin,e);let s=o*this.direction.dot(bn.crossVectors(vn,bn));if(s<0)return null;let c=o*this.direction.dot(yn.cross(vn));if(c<0||s+c>a)return null;let l=-o*vn.dot(xn);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Cn=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/wn.setFromMatrixColumn(e,0).length(),i=1/wn.setFromMatrixColumn(e,1).length(),a=1/wn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(En,e,Dn)}lookAt(e,t,n){let r=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),On.crossVectors(n,An),On.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),On.crossVectors(n,An)),On.normalize(),kn.crossVectors(An,On),r[0]=On.x,r[4]=kn.x,r[8]=An.x,r[1]=On.y,r[5]=kn.y,r[9]=An.y,r[2]=On.z,r[6]=kn.z,r[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],O=r[2],te=r[6],ne=r[10],re=r[14],k=r[3],ie=r[7],ae=r[11],A=r[15];return i[0]=a*x+o*T+s*O+c*k,i[4]=a*S+o*E+s*te+c*ie,i[8]=a*C+o*D+s*ne+c*ae,i[12]=a*w+o*ee+s*re+c*A,i[1]=l*x+u*T+d*O+f*k,i[5]=l*S+u*E+d*te+f*ie,i[9]=l*C+u*D+d*ne+f*ae,i[13]=l*w+u*ee+d*re+f*A,i[2]=p*x+m*T+h*O+g*k,i[6]=p*S+m*E+h*te+g*ie,i[10]=p*C+m*D+h*ne+g*ae,i[14]=p*w+m*ee+h*re+g*A,i[3]=_*x+v*T+y*O+b*k,i[7]=_*S+v*E+y*te+b*ie,i[11]=_*C+v*D+y*ne+b*ae,i[15]=_*w+v*ee+y*re+b*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=wn.set(r[0],r[1],r[2]).length(),a=wn.set(r[4],r[5],r[6]).length(),o=wn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],Tn.copy(this);let s=1/i,c=1/a,l=1/o;return Tn.elements[0]*=s,Tn.elements[1]*=s,Tn.elements[2]*=s,Tn.elements[4]*=c,Tn.elements[5]*=c,Tn.elements[6]*=c,Tn.elements[8]*=l,Tn.elements[9]*=l,Tn.elements[10]*=l,t.setFromRotationMatrix(Tn),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},wn=new F,Tn=new Cn,En=new F(0,0,0),Dn=new F(1,1,1),On=new F,kn=new F,An=new F,jn=new Cn,Mn=new yt,Nn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Ze(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Ze(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mn.setFromEuler(this),this.setFromQuaternion(Mn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nn.DEFAULT_ORDER=`XYZ`;var Pn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Fn=0,In=new F,Ln=new yt,Rn=new Cn,zn=new F,Bn=new F,Vn=new F,Hn=new yt,Un=new F(1,0,0),Wn=new F(0,1,0),Gn=new F(0,0,1),Kn={type:`added`},qn={type:`removed`},Jn={type:`childadded`,child:null},Yn={type:`childremoved`,child:null},Xn=class e extends Ge{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fn++}),this.uuid=Xe(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new F,n=new Nn,r=new yt,i=new F(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Cn},normalMatrix:{value:new St}}),this.matrix=new Cn,this.matrixWorld=new Cn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ln.setFromAxisAngle(e,t),this.quaternion.multiply(Ln),this}rotateOnWorldAxis(e,t){return Ln.setFromAxisAngle(e,t),this.quaternion.premultiply(Ln),this}rotateX(e){return this.rotateOnAxis(Un,e)}rotateY(e){return this.rotateOnAxis(Wn,e)}rotateZ(e){return this.rotateOnAxis(Gn,e)}translateOnAxis(e,t){return In.copy(e).applyQuaternion(this.quaternion),this.position.add(In.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Un,e)}translateY(e){return this.translateOnAxis(Wn,e)}translateZ(e){return this.translateOnAxis(Gn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zn.copy(e):zn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Bn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Bn,zn,this.up):Rn.lookAt(zn,Bn,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Ln.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ln.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kn),Jn.child=e,this.dispatchEvent(Jn),Jn.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qn),Yn.child=e,this.dispatchEvent(Yn),Yn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kn),Jn.child=e,this.dispatchEvent(Jn),Jn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bn,e,Vn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bn,Hn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Xn.DEFAULT_UP=new F(0,1,0),Xn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zn=new F,Qn=new F,$n=new F,er=new F,tr=new F,nr=new F,rr=new F,ir=new F,ar=new F,or=new F,sr=new Wt,cr=new Wt,lr=new Wt,ur=class e{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Zn.subVectors(e,t),r.cross(Zn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Zn.subVectors(r,t),Qn.subVectors(n,t),$n.subVectors(e,t);let a=Zn.dot(Zn),o=Zn.dot(Qn),s=Zn.dot($n),c=Qn.dot(Qn),l=Qn.dot($n),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,er)!==null&&er.x>=0&&er.y>=0&&er.x+er.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,er)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,er.x),s.addScaledVector(a,er.y),s.addScaledVector(o,er.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return sr.setScalar(0),cr.setScalar(0),lr.setScalar(0),sr.fromBufferAttribute(e,t),cr.fromBufferAttribute(e,n),lr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(sr,i.x),a.addScaledVector(cr,i.y),a.addScaledVector(lr,i.z),a}static isFrontFacing(e,t,n,r){return Zn.subVectors(n,t),Qn.subVectors(e,t),Zn.cross(Qn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Zn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;tr.subVectors(r,n),nr.subVectors(i,n),ir.subVectors(e,n);let s=tr.dot(ir),c=nr.dot(ir);if(s<=0&&c<=0)return t.copy(n);ar.subVectors(e,r);let l=tr.dot(ar),u=nr.dot(ar);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(tr,a);or.subVectors(e,i);let f=tr.dot(or),p=nr.dot(or);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(nr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return rr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(rr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(tr,a).addScaledVector(nr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},dr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fr={h:0,s:0,l:0},pr={h:0,s:0,l:0};function mr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var I=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Re){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Nt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Nt.workingColorSpace){if(e=Qe(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=mr(i,r,e+1/3),this.g=mr(i,r,e),this.b=mr(i,r,e-1/3)}return Nt.colorSpaceToWorking(this,r),this}setStyle(e,t=Re){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Re){let n=dr[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}copyLinearToSRGB(e){return this.r=Ft(e.r),this.g=Ft(e.g),this.b=Ft(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Re){return Nt.workingToColorSpace(hr.copy(this),e),Math.round(Ze(hr.r*255,0,255))*65536+Math.round(Ze(hr.g*255,0,255))*256+Math.round(Ze(hr.b*255,0,255))}getHexString(e=Re){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Nt.workingColorSpace){Nt.workingToColorSpace(hr.copy(this),t);let n=hr.r,r=hr.g,i=hr.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Nt.workingColorSpace){return Nt.workingToColorSpace(hr.copy(this),t),e.r=hr.r,e.g=hr.g,e.b=hr.b,e}getStyle(e=Re){Nt.workingToColorSpace(hr.copy(this),e);let t=hr.r,n=hr.g,r=hr.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(fr),this.setHSL(fr.h+e,fr.s+t,fr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(fr),e.getHSL(pr);let n=tt(fr.h,pr.h,t),r=tt(fr.s,pr.s,t),i=tt(fr.l,pr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hr=new I;I.NAMES=dr;var gr=0,_r=class extends Ge{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gr++}),this.uuid=Xe(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new I(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=He,this.stencilZFail=He,this.stencilZPass=He,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},vr=class extends _r{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new I(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},yr=new F,br=new P,xr=0,Sr=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ue,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXYZ(t,yr.x,yr.y,yr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix4(e),this.setXYZ(t,yr.x,yr.y,yr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyNormalMatrix(e),this.setXYZ(t,yr.x,yr.y,yr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.transformDirection(e),this.setXYZ(t,yr.x,yr.y,yr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gt(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gt(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gt(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),r=_t(r,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},Cr=class extends Sr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},wr=class extends Sr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Tr=class extends Sr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Er=0,Dr=new Cn,Or=new Xn,kr=new F,Ar=new Yt,jr=new Yt,Mr=new F,Nr=class e extends Ge{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Er++}),this.uuid=Xe(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(wt(e)?wr:Cr)(e,1):e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new St().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dr.makeRotationFromQuaternion(e),this.applyMatrix4(Dr),this}rotateX(e){return Dr.makeRotationX(e),this.applyMatrix4(Dr),this}rotateY(e){return Dr.makeRotationY(e),this.applyMatrix4(Dr),this}rotateZ(e){return Dr.makeRotationZ(e),this.applyMatrix4(Dr),this}translate(e,t,n){return Dr.makeTranslation(e,t,n),this.applyMatrix4(Dr),this}scale(e,t,n){return Dr.makeScale(e,t,n),this.applyMatrix4(Dr),this}lookAt(e){return Or.lookAt(e),Or.updateMatrix(),this.applyMatrix4(Or.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kr).negate(),this.translate(kr.x,kr.y,kr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Tr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ar.setFromBufferAttribute(n),this.morphTargetsRelative?(Mr.addVectors(this.boundingBox.min,Ar.min),this.boundingBox.expandByPoint(Mr),Mr.addVectors(this.boundingBox.max,Ar.max),this.boundingBox.expandByPoint(Mr)):(this.boundingBox.expandByPoint(Ar.min),this.boundingBox.expandByPoint(Ar.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new F,1/0);return}if(e){let n=this.boundingSphere.center;if(Ar.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];jr.setFromBufferAttribute(n),this.morphTargetsRelative?(Mr.addVectors(Ar.min,jr.min),Ar.expandByPoint(Mr),Mr.addVectors(Ar.max,jr.max),Ar.expandByPoint(Mr)):(Ar.expandByPoint(jr.min),Ar.expandByPoint(jr.max))}Ar.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Mr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Mr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Mr.fromBufferAttribute(a,t),o&&(kr.fromBufferAttribute(e,t),Mr.add(kr)),r=Math.max(r,n.distanceToSquared(Mr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Sr(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new F,s[e]=new F;let c=new F,l=new F,u=new F,d=new P,f=new P,p=new P,m=new F,h=new F;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new F,y=new F,b=new F,x=new F;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Sr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new F,i=new F,a=new F,o=new F,s=new F,c=new F,l=new F,u=new F;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mr.fromBufferAttribute(e,t),Mr.normalize(),e.setXYZ(t,Mr.x,Mr.y,Mr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Sr(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Pr=new Cn,Fr=new Sn,Ir=new mn,Lr=new F,Rr=new F,zr=new F,Br=new F,Vr=new F,Hr=new F,Ur=new F,Wr=new F,L=class extends Xn{constructor(e=new Nr,t=new vr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Hr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Vr.fromBufferAttribute(s,e),a?Hr.addScaledVector(Vr,r):Hr.addScaledVector(Vr.sub(t),r))}t.add(Hr)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(i),Fr.copy(e.ray).recast(e.near),!(Ir.containsPoint(Fr.origin)===!1&&(Fr.intersectSphere(Ir,Lr)===null||Fr.origin.distanceToSquared(Lr)>(e.far-e.near)**2))&&(Pr.copy(i).invert(),Fr.copy(e.ray).applyMatrix4(Pr),(n.boundingBox===null||Fr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Fr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Kr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Kr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Kr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Kr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function Gr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Wr.copy(s),Wr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Wr);return l<n.near||l>n.far?null:{distance:l,point:Wr.clone(),object:e}}function Kr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Rr),e.getVertexPosition(c,zr),e.getVertexPosition(l,Br);let u=Gr(e,t,n,r,Rr,zr,Br,Ur);if(u){let e=new F;ur.getBarycoord(Ur,Rr,zr,Br,e),i&&(u.uv=ur.getInterpolatedAttribute(i,s,c,l,e,new P)),a&&(u.uv1=ur.getInterpolatedAttribute(a,s,c,l,e,new P)),o&&(u.normal=ur.getInterpolatedAttribute(o,s,c,l,e,new F),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new F,materialIndex:0};ur.getNormal(Rr,zr,Br,t.normal),u.face=t,u.barycoord=e}return u}var R=class e extends Nr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Tr(c,3)),this.setAttribute(`normal`,new Tr(l,3)),this.setAttribute(`uv`,new Tr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new F;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function qr(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function Jr(e){let t={};for(let n=0;n<e.length;n++){let r=qr(e[n]);for(let e in r)t[e]=r[e]}return t}function Yr(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Xr(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Nt.workingColorSpace}var Zr={clone:qr,merge:Jr},Qr=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$r=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ei=class extends _r{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qr,this.fragmentShader=$r,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qr(e.uniforms),this.uniformsGroups=Yr(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ti=class extends Xn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Cn,this.projectionMatrix=new Cn,this.projectionMatrixInverse=new Cn,this.coordinateSystem=We,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ni=new F,ri=new P,ii=new P,ai=class extends ti{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ye*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Je*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ye*2*Math.atan(Math.tan(Je*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,ri,ii),t.subVectors(ii,ri)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Je*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},oi=-90,si=1,ci=class extends Xn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ai(oi,si,e,t);r.layers=this.layers,this.add(r);let i=new ai(oi,si,e,t);i.layers=this.layers,this.add(i);let a=new ai(oi,si,e,t);a.layers=this.layers,this.add(a);let o=new ai(oi,si,e,t);o.layers=this.layers,this.add(o);let s=new ai(oi,si,e,t);s.layers=this.layers,this.add(s);let c=new ai(oi,si,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},li=class extends Ut{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ui=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new li(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new R(5,5,5),i=new ei({name:`CubemapFromEquirect`,uniforms:qr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new L(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new ci(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},di=class extends Xn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},fi={type:`move`},pi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new di,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new di,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new di,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fi)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new di;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},mi=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new I(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},hi=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new I(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},gi=class extends Xn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},_i=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ue,this.updateRanges=[],this.version=0,this.uuid=Xe()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xe()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xe()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},vi=new F,yi=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)vi.fromBufferAttribute(this,t),vi.applyMatrix4(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vi.fromBufferAttribute(this,t),vi.applyNormalMatrix(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vi.fromBufferAttribute(this,t),vi.transformDirection(e),this.setXYZ(t,vi.x,vi.y,vi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=gt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=gt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=gt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=gt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=gt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),r=_t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),r=_t(r,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){console.log(`THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Sr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log(`THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},bi=class extends _r{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new I(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xi,Si=new F,Ci=new F,wi=new F,Ti=new P,Ei=new P,Di=new Cn,Oi=new F,ki=new F,Ai=new F,ji=new P,Mi=new P,Ni=new P,Pi=class extends Xn{constructor(e=new bi){if(super(),this.isSprite=!0,this.type=`Sprite`,xi===void 0){xi=new Nr;let e=new _i(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);xi.setIndex([0,1,2,0,2,3]),xi.setAttribute(`position`,new yi(e,3,0,!1)),xi.setAttribute(`uv`,new yi(e,2,3,!1))}this.geometry=xi,this.material=e,this.center=new P(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error(`THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Ci.setFromMatrixScale(this.matrixWorld),Di.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ci.multiplyScalar(-wi.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Fi(Oi.set(-.5,-.5,0),wi,a,Ci,r,i),Fi(ki.set(.5,-.5,0),wi,a,Ci,r,i),Fi(Ai.set(.5,.5,0),wi,a,Ci,r,i),ji.set(0,0),Mi.set(1,0),Ni.set(1,1);let o=e.ray.intersectTriangle(Oi,ki,Ai,!1,Si);if(o===null&&(Fi(ki.set(-.5,.5,0),wi,a,Ci,r,i),Mi.set(0,1),o=e.ray.intersectTriangle(Oi,Ai,ki,!1,Si),o===null))return;let s=e.ray.origin.distanceTo(Si);s<e.near||s>e.far||t.push({distance:s,point:Si.clone(),uv:ur.getInterpolation(Si,Oi,ki,Ai,ji,Mi,Ni,new P),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Fi(e,t,n,r,i,a){Ti.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Ei.copy(Ti):(Ei.x=a*Ti.x-i*Ti.y,Ei.y=i*Ti.x+a*Ti.y),e.copy(t),e.x+=Ei.x,e.y+=Ei.y,e.applyMatrix4(Di)}var Ii=new F,Li=new F,Ri=new St,zi=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ii.subVectors(n,t).cross(Li.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ii),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ri.getNormalMatrix(e),r=this.coplanarPoint(Ii).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bi=new mn,Vi=new P(.5,.5),Hi=new F,Ui=class{constructor(e=new zi,t=new zi,n=new zi,r=new zi,i=new zi,a=new zi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=We,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476+Vi.distanceTo(e.center),Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Hi.x=r.normal.x>0?e.max.x:e.min.x,Hi.y=r.normal.y>0?e.max.y:e.min.y,Hi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Hi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wi=class extends _r{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new I(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gi=new Cn,Ki=new Sn,qi=new mn,Ji=new F,Yi=class extends Xn{constructor(e=new Nr,t=new Wi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qi.copy(n.boundingSphere),qi.applyMatrix4(r),qi.radius+=i,e.ray.intersectsSphere(qi)===!1)return;Gi.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(Gi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ji.fromBufferAttribute(l,n),Xi(Ji,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ji.fromBufferAttribute(l,a),Xi(Ji,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Xi(e,t,n,r,i,a,o){let s=Ki.distanceSqToPoint(e);if(s<n){let n=new F;Ki.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Zi=class extends Ut{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Qi=class extends Ut{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},$i=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ea=class e extends Nr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Tr(p,3)),this.setAttribute(`normal`,new Tr(m,3)),this.setAttribute(`uv`,new Tr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ta=class extends ei{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},na=class extends _r{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new I(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new I(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new P(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ra=class extends _r{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ie,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ia=class extends _r{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function aa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function oa(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var sa=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},ca=class extends sa{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ne,endingEnd:Ne}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pe:i=e,o=2*t-n;break;case Fe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Pe:a=e,s=2*n-t;break;case Fe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},la=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ua=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},da=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=aa(t,this.TimeBufferType),this.values=aa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:aa(e.times,Array),values:aa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ca(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ae:t=this.InterpolantFactoryMethodDiscrete;break;case je:t=this.InterpolantFactoryMethodLinear;break;case Me:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ae;case this.InterpolantFactoryMethodLinear:return je;case this.InterpolantFactoryMethodSmooth:return Me}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&oa(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Me,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};da.prototype.ValueTypeName=``,da.prototype.TimeBufferType=Float32Array,da.prototype.ValueBufferType=Float32Array,da.prototype.DefaultInterpolation=je;var fa=class extends da{constructor(e,t,n){super(e,t,n)}};fa.prototype.ValueTypeName=`bool`,fa.prototype.ValueBufferType=Array,fa.prototype.DefaultInterpolation=Ae,fa.prototype.InterpolantFactoryMethodLinear=void 0,fa.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends da{constructor(e,t,n,r){super(e,t,n,r)}};pa.prototype.ValueTypeName=`color`;var ma=class extends da{constructor(e,t,n,r){super(e,t,n,r)}};ma.prototype.ValueTypeName=`number`;var ha=class extends sa{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)yt.slerpFlat(i,0,a,c-o,a,c,s);return i}},ga=class extends da{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ha(this.times,this.values,this.getValueSize(),e)}};ga.prototype.ValueTypeName=`quaternion`,ga.prototype.InterpolantFactoryMethodSmooth=void 0;var _a=class extends da{constructor(e,t,n){super(e,t,n)}};_a.prototype.ValueTypeName=`string`,_a.prototype.ValueBufferType=Array,_a.prototype.DefaultInterpolation=Ae,_a.prototype.InterpolantFactoryMethodLinear=void 0,_a.prototype.InterpolantFactoryMethodSmooth=void 0;var va=class extends da{constructor(e,t,n,r){super(e,t,n,r)}};va.prototype.ValueTypeName=`vector`;var ya=class extends Xn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new I(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ba=class extends ya{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Xn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new I(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},xa=new Cn,Sa=new F,Ca=new F,wa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new P(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new Cn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ui,this._frameExtents=new P(1,1),this._viewportCount=1,this._viewports=[new Wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Sa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sa),Ca.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ca),t.updateMatrixWorld(),xa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ta=class extends wa{constructor(){super(new ai(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ye*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ea=class extends ya{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Xn.DEFAULT_UP),this.updateMatrix(),this.target=new Xn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Ta}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Da=new Cn,Oa=new F,ka=new F,Aa=class extends wa{constructor(){super(new ai(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new P(4,2),this._viewportCount=6,this._viewports=[new Wt(2,1,1,1),new Wt(0,1,1,1),new Wt(3,1,1,1),new Wt(1,1,1,1),new Wt(3,0,1,1),new Wt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,i=e.distance||n.far;i!==n.far&&(n.far=i,n.updateProjectionMatrix()),Oa.setFromMatrixPosition(e.matrixWorld),n.position.copy(Oa),ka.copy(n.position),ka.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ka),n.updateMatrixWorld(),r.makeTranslation(-Oa.x,-Oa.y,-Oa.z),Da.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da,n.coordinateSystem,n.reversedDepth)}},ja=class extends ya{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Aa}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ma=class extends ti{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Na=class extends wa{constructor(){super(new Ma(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Pa=class extends ya{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Xn.DEFAULT_UP),this.updateMatrix(),this.target=new Xn,this.shadow=new Na}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Fa=class extends ya{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Ia=class extends ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},La=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},Ra=`\\[\\]\\.:\\/`,za=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ba=`[^\\[\\]\\.:\\/]`,Va=`[^`+Ra.replace(`\\.`,``)+`]`,Ha=`((?:WC+[\\/:])*)`.replace(`WC`,Ba),Ua=`(WCOD+)?`.replace(`WCOD`,Va),Wa=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ba),Ga=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ba),Ka=RegExp(`^`+Ha+Ua+Wa+Ga+`$`),qa=[`material`,`materials`,`bones`,`map`],Ja=class{constructor(e,t,n){let r=n||Ya.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ya=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(za,``)}static parseTrackName(e){let t=Ka.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);qa.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ya.Composite=Ja,Ya.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ya.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ya.prototype.GetterByBindingType=[Ya.prototype._getValue_direct,Ya.prototype._getValue_array,Ya.prototype._getValue_arrayElement,Ya.prototype._getValue_toArray],Ya.prototype.SetterByBindingTypeAndVersioning=[[Ya.prototype._setValue_direct,Ya.prototype._setValue_direct_setNeedsUpdate,Ya.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ya.prototype._setValue_array,Ya.prototype._setValue_array_setNeedsUpdate,Ya.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ya.prototype._setValue_arrayElement,Ya.prototype._setValue_arrayElement_setNeedsUpdate,Ya.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ya.prototype._setValue_fromArray,Ya.prototype._setValue_fromArray_setNeedsUpdate,Ya.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Xa(e,t,n,r){let i=Za(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case O:return e*t*2/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case ne:return e*t*4/i.components*i.byteLength;case re:case k:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ie:case ae:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case oe:case ce:return Math.max(e,16)*Math.max(t,8)/4;case A:case se:return Math.max(e,8)*Math.max(t,8)/2;case le:case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case j:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case M:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ce:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case N:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Za(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`180`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`180`);function Qa(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function $a(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var eo={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},z={common:{diffuse:{value:new I(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new St}},envmap:{envMap:{value:null},envMapRotation:{value:new St},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new St}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new St}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new St},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new St},normalScale:{value:new P(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new St},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new St}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new St}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new St}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new I(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new I(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0},uvTransform:{value:new St}},sprite:{diffuse:{value:new I(16777215)},opacity:{value:1},center:{value:new P(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}}},to={basic:{uniforms:Jr([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.fog]),vertexShader:eo.meshbasic_vert,fragmentShader:eo.meshbasic_frag},lambert:{uniforms:Jr([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.fog,z.lights,{emissive:{value:new I(0)}}]),vertexShader:eo.meshlambert_vert,fragmentShader:eo.meshlambert_frag},phong:{uniforms:Jr([z.common,z.specularmap,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.fog,z.lights,{emissive:{value:new I(0)},specular:{value:new I(1118481)},shininess:{value:30}}]),vertexShader:eo.meshphong_vert,fragmentShader:eo.meshphong_frag},standard:{uniforms:Jr([z.common,z.envmap,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.roughnessmap,z.metalnessmap,z.fog,z.lights,{emissive:{value:new I(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:eo.meshphysical_vert,fragmentShader:eo.meshphysical_frag},toon:{uniforms:Jr([z.common,z.aomap,z.lightmap,z.emissivemap,z.bumpmap,z.normalmap,z.displacementmap,z.gradientmap,z.fog,z.lights,{emissive:{value:new I(0)}}]),vertexShader:eo.meshtoon_vert,fragmentShader:eo.meshtoon_frag},matcap:{uniforms:Jr([z.common,z.bumpmap,z.normalmap,z.displacementmap,z.fog,{matcap:{value:null}}]),vertexShader:eo.meshmatcap_vert,fragmentShader:eo.meshmatcap_frag},points:{uniforms:Jr([z.points,z.fog]),vertexShader:eo.points_vert,fragmentShader:eo.points_frag},dashed:{uniforms:Jr([z.common,z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:eo.linedashed_vert,fragmentShader:eo.linedashed_frag},depth:{uniforms:Jr([z.common,z.displacementmap]),vertexShader:eo.depth_vert,fragmentShader:eo.depth_frag},normal:{uniforms:Jr([z.common,z.bumpmap,z.normalmap,z.displacementmap,{opacity:{value:1}}]),vertexShader:eo.meshnormal_vert,fragmentShader:eo.meshnormal_frag},sprite:{uniforms:Jr([z.sprite,z.fog]),vertexShader:eo.sprite_vert,fragmentShader:eo.sprite_frag},background:{uniforms:{uvTransform:{value:new St},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:eo.background_vert,fragmentShader:eo.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new St}},vertexShader:eo.backgroundCube_vert,fragmentShader:eo.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:eo.cube_vert,fragmentShader:eo.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:eo.equirect_vert,fragmentShader:eo.equirect_frag},distanceRGBA:{uniforms:Jr([z.common,z.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:eo.distanceRGBA_vert,fragmentShader:eo.distanceRGBA_frag},shadow:{uniforms:Jr([z.lights,z.fog,{color:{value:new I(0)},opacity:{value:1}}]),vertexShader:eo.shadow_vert,fragmentShader:eo.shadow_frag}};to.physical={uniforms:Jr([to.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new St},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new St},clearcoatNormalScale:{value:new P(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new St},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new St},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new St},sheen:{value:0},sheenColor:{value:new I(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new St},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new St},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new St},transmissionSamplerSize:{value:new P},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new St},attenuationDistance:{value:0},attenuationColor:{value:new I(0)},specularColor:{value:new I(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new St},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new St},anisotropyVector:{value:new P},anisotropyMap:{value:null},anisotropyMapTransform:{value:new St}}]),vertexShader:eo.meshphysical_vert,fragmentShader:eo.meshphysical_frag};var no={r:0,b:0,g:0},ro=new Nn,io=new Cn;function ao(e,t,n,r,i,a,o){let s=new I(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new L(new R(1,1,1),new ei({name:`BackgroundCubeMaterial`,uniforms:qr(to.backgroundCube.uniforms),vertexShader:to.backgroundCube.vertexShader,fragmentShader:to.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ro.copy(n.backgroundRotation),ro.x*=-1,ro.y*=-1,ro.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&(ro.y*=-1,ro.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(io.makeRotationFromEuler(ro)),u.material.toneMapped=Nt.getTransfer(r.colorSpace)!==Ve,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new L(new ea(2,2),new ei({name:`BackgroundMaterial`,uniforms:qr(to.background.uniforms),vertexShader:to.background.vertexShader,fragmentShader:to.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=Nt.getTransfer(r.colorSpace)!==Ve,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(no,Xr(e)),r.buffers.color.setClear(no.r,no.g,no.b,n,o)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:v}}function oo(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){T(),o=!0,a!==i&&(a=i,l(a.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:T,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function so(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function co(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function lo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new zi,s=new St,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function uo(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304)if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}else{let a=r.image;if(a&&a.height>0){let o=new ui(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var fo=4,po=[.125,.215,.35,.446,.526,.582],mo=20,ho=new Ma,go=new I,_o=null,vo=0,yo=0,bo=!1,xo=(1+Math.sqrt(5))/2,So=1/xo,Co=[new F(-xo,So,0),new F(xo,So,0),new F(-So,0,xo),new F(So,0,xo),new F(0,xo,-So),new F(0,xo,So),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],wo=new F,To=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=wo}=i;_o=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ao(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,vo,yo),this._renderer.xr.enabled=bo,e.scissorTest=!1,Oo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:ze,depthBuffer:!1},r=Do(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Do(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Eo(r)),this._blurMaterial=ko(r,e,t)}return r}_compileMaterial(e){let t=new L(this._lodPlanes[0],e);this._renderer.compile(t,ho)}_sceneToCubeUV(e,t,n,r,i){let a=new ai(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(go),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let d=new vr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),f=new L(new R,d),p=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,p=!0):(d.color.copy(go),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Oo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(f,a),c.render(e,a)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=jo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ao());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new L(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Oo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ho)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=Co[(r-t-1)%Co.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new L(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):mo;m>mo&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mo}`);let h=[],g=0;for(let e=0;e<mo;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Oo(t,3*v*(r>_-fo?r-_+fo:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,ho)}};function Eo(e){let t=[],n=[],r=[],i=e,a=e-fo+1+po.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-fo?s=po[o-e+fo-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Nr;h.setAttribute(`position`,new Sr(f,3)),h.setAttribute(`uv`,new Sr(p,2)),h.setAttribute(`faceIndex`,new Sr(m,1)),t.push(h),i>fo&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function Do(e,t,n){let r=new Kt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Oo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function ko(e,t,n){let r=new Float32Array(mo),i=new F(0,1,0);return new ei({name:`SphericalGaussianBlur`,defines:{n:mo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ao(){return new ei({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function jo(){return new ei({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function No(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new To(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new To(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function Po(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ot(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function Fo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(wt(n)?wr:Cr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Io(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Lo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ro(e,t,n){let r=new WeakMap,i=new Wt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new qt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new P(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function zo(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var Bo=new Ut,Vo=new Qi(1,1),Ho=new qt,Uo=new Jt,Wo=new li,Go=[],Ko=[],qo=new Float32Array(16),Jo=new Float32Array(9),Yo=new Float32Array(4);function Xo(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Go[i];if(a===void 0&&(a=new Float32Array(i),Go[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Zo(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Qo(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function $o(e,t){let n=Ko[t];n===void 0&&(n=new Int32Array(t),Ko[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function es(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Zo(n,t))return;e.uniform2fv(this.addr,t),Qo(n,t)}}function ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Zo(n,t))return;e.uniform3fv(this.addr,t),Qo(n,t)}}function rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Zo(n,t))return;e.uniform4fv(this.addr,t),Qo(n,t)}}function is(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Zo(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Qo(n,t)}else{if(Zo(n,r))return;Yo.set(r),e.uniformMatrix2fv(this.addr,!1,Yo),Qo(n,r)}}function as(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Zo(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Qo(n,t)}else{if(Zo(n,r))return;Jo.set(r),e.uniformMatrix3fv(this.addr,!1,Jo),Qo(n,r)}}function os(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Zo(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Qo(n,t)}else{if(Zo(n,r))return;qo.set(r),e.uniformMatrix4fv(this.addr,!1,qo),Qo(n,r)}}function ss(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function cs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Zo(n,t))return;e.uniform2iv(this.addr,t),Qo(n,t)}}function ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Zo(n,t))return;e.uniform3iv(this.addr,t),Qo(n,t)}}function us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Zo(n,t))return;e.uniform4iv(this.addr,t),Qo(n,t)}}function ds(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function fs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Zo(n,t))return;e.uniform2uiv(this.addr,t),Qo(n,t)}}function ps(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Zo(n,t))return;e.uniform3uiv(this.addr,t),Qo(n,t)}}function ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Zo(n,t))return;e.uniform4uiv(this.addr,t),Qo(n,t)}}function hs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Vo.compareFunction=515,a=Vo):a=Bo,n.setTexture2D(t||a,i)}function gs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Uo,i)}function _s(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Wo,i)}function vs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ho,i)}function ys(e){switch(e){case 5126:return es;case 35664:return ts;case 35665:return ns;case 35666:return rs;case 35674:return is;case 35675:return as;case 35676:return os;case 5124:case 35670:return ss;case 35667:case 35671:return cs;case 35668:case 35672:return ls;case 35669:case 35673:return us;case 5125:return ds;case 36294:return fs;case 36295:return ps;case 36296:return ms;case 35678:case 36198:case 36298:case 36306:case 35682:return hs;case 35679:case 36299:case 36307:return gs;case 35680:case 36300:case 36308:case 36293:return _s;case 36289:case 36303:case 36311:case 36292:return vs}}function bs(e,t){e.uniform1fv(this.addr,t)}function xs(e,t){let n=Xo(t,this.size,2);e.uniform2fv(this.addr,n)}function Ss(e,t){let n=Xo(t,this.size,3);e.uniform3fv(this.addr,n)}function Cs(e,t){let n=Xo(t,this.size,4);e.uniform4fv(this.addr,n)}function ws(e,t){let n=Xo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ts(e,t){let n=Xo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Es(e,t){let n=Xo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ds(e,t){e.uniform1iv(this.addr,t)}function Os(e,t){e.uniform2iv(this.addr,t)}function ks(e,t){e.uniform3iv(this.addr,t)}function As(e,t){e.uniform4iv(this.addr,t)}function js(e,t){e.uniform1uiv(this.addr,t)}function Ms(e,t){e.uniform2uiv(this.addr,t)}function Ns(e,t){e.uniform3uiv(this.addr,t)}function Ps(e,t){e.uniform4uiv(this.addr,t)}function Fs(e,t,n){let r=this.cache,i=t.length,a=$o(n,i);Zo(r,a)||(e.uniform1iv(this.addr,a),Qo(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||Bo,a[e])}function Is(e,t,n){let r=this.cache,i=t.length,a=$o(n,i);Zo(r,a)||(e.uniform1iv(this.addr,a),Qo(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Uo,a[e])}function Ls(e,t,n){let r=this.cache,i=t.length,a=$o(n,i);Zo(r,a)||(e.uniform1iv(this.addr,a),Qo(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Wo,a[e])}function Rs(e,t,n){let r=this.cache,i=t.length,a=$o(n,i);Zo(r,a)||(e.uniform1iv(this.addr,a),Qo(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ho,a[e])}function zs(e){switch(e){case 5126:return bs;case 35664:return xs;case 35665:return Ss;case 35666:return Cs;case 35674:return ws;case 35675:return Ts;case 35676:return Es;case 5124:case 35670:return Ds;case 35667:case 35671:return Os;case 35668:case 35672:return ks;case 35669:case 35673:return As;case 5125:return js;case 36294:return Ms;case 36295:return Ns;case 36296:return Ps;case 35678:case 36198:case 36298:case 36306:case 35682:return Fs;case 35679:case 36299:case 36307:return Is;case 35680:case 36300:case 36308:case 36293:return Ls;case 36289:case 36303:case 36311:case 36292:return Rs}}var Bs=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ys(t.type)}},Vs=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zs(t.type)}},Hs=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Us=/(\w+)(\])?(\[|\.)?/g;function Ws(e,t){e.seq.push(t),e.map[t.id]=t}function Gs(e,t,n){let r=e.name,i=r.length;for(Us.lastIndex=0;;){let a=Us.exec(r),o=Us.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ws(n,l===void 0?new Bs(s,e,t):new Vs(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Hs(s),Ws(n,e)),n=e}}}var Ks=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Gs(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function qs(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Js=37297,Ys=0;function Xs(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Zs=new St;function Qs(e){Nt._getMatrix(Zs,Nt.workingColorSpace,e);let t=`mat3( ${Zs.elements.map(e=>e.toFixed(4))} )`;switch(Nt.getTransfer(e)){case Be:return[t,`LinearTransferOETF`];case Ve:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function $s(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Xs(e.getShaderSource(t),r)}return i}function ec(e,t){let n=Qs(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function tc(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var nc=new F;function rc(){return Nt.getLuminanceCoefficients(nc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${nc.x.toFixed(4)}, ${nc.y.toFixed(4)}, ${nc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ic(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(sc).join(`
`)}function ac(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function oc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function sc(e){return e!==``}function cc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var uc=/^[ \t]*#include +<([\w\d./]+)>/gm;function dc(e){return e.replace(uc,pc)}var fc=new Map;function pc(e,t){let n=eo[t];if(n===void 0){let e=fc.get(t);if(e!==void 0)n=eo[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return dc(n)}var mc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hc(e){return e.replace(mc,gc)}function gc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function _c(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}function vc(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function yc(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function bc(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function xc(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function Sc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Cc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=vc(n),l=yc(n),u=bc(n),d=xc(n),f=Sc(n),p=ic(n),m=ac(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(sc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(sc).join(`
`),_.length>0&&(_+=`
`)):(g=[_c(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(sc).join(`
`),_=[_c(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:eo.tonemapping_pars_fragment,n.toneMapping===0?``:tc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,eo.colorspace_pars_fragment,ec(`linearToOutputTexel`,n.outputColorSpace),rc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(sc).join(`
`)),o=dc(o),o=cc(o,n),o=lc(o,n),s=dc(s),s=cc(s,n),s=lc(s,n),o=hc(o),s=hc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=qs(i,i.VERTEX_SHADER,y),S=qs(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=$s(i,x,`vertex`),n=$s(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Ks(i,h),T=oc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Js)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ys++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var wc=0,Tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ec(e),t.set(e,n)),n}},Ec=class{constructor(e){this.id=wc++,this.code=e,this.usedTimes=0}};function Dc(e,t,n,r,i,a,o){let s=new Pn,c=new Tc,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,ee,O,te;if(C){let e=to[C];D=e.vertexShader,ee=e.fragmentShader}else D=a.vertexShader,ee=a.fragmentShader,c.update(a),O=c.getVertexShaderID(a),te=c.getFragmentShaderID(a);let ne=e.getRenderTarget(),re=e.state.buffers.depth.getReversed(),k=_.isInstancedMesh===!0,ie=_.isBatchedMesh===!0,ae=!!a.map,A=!!a.matcap,oe=!!x,se=!!a.aoMap,ce=!!a.lightMap,le=!!a.bumpMap,ue=!!a.normalMap,de=!!a.displacementMap,fe=!!a.emissiveMap,pe=!!a.metalnessMap,me=!!a.roughnessMap,he=a.anisotropy>0,ge=a.clearcoat>0,_e=a.dispersion>0,ve=a.iridescence>0,ye=a.sheen>0,j=a.transmission>0,be=he&&!!a.anisotropyMap,xe=ge&&!!a.clearcoatMap,Se=ge&&!!a.clearcoatNormalMap,M=ge&&!!a.clearcoatRoughnessMap,Ce=ve&&!!a.iridescenceMap,N=ve&&!!a.iridescenceThicknessMap,we=ye&&!!a.sheenColorMap,Te=ye&&!!a.sheenRoughnessMap,Ee=!!a.specularMap,De=!!a.specularColorMap,Oe=!!a.specularIntensityMap,ke=j&&!!a.transmissionMap,Ae=j&&!!a.thicknessMap,je=!!a.gradientMap,Me=!!a.alphaMap,Ne=a.alphaTest>0,Pe=!!a.alphaHash,Fe=!!a.extensions,Ie=0;a.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:ee,defines:a.defines,customVertexShaderID:O,customFragmentShaderID:te,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:ie,batchingColor:ie&&_._colorsTexture!==null,instancing:k,instancingColor:k&&_.instanceColor!==null,instancingMorph:k&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?e.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ze,alphaToCoverage:!!a.alphaToCoverage,map:ae,matcap:A,envMap:oe,envMapMode:oe&&x.mapping,envMapCubeUVHeight:S,aoMap:se,lightMap:ce,bumpMap:le,normalMap:ue,displacementMap:f&&de,emissiveMap:fe,normalMapObjectSpace:ue&&a.normalMapType===1,normalMapTangentSpace:ue&&a.normalMapType===0,metalnessMap:pe,roughnessMap:me,anisotropy:he,anisotropyMap:be,clearcoat:ge,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:M,dispersion:_e,iridescence:ve,iridescenceMap:Ce,iridescenceThicknessMap:N,sheen:ye,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:j,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:Pe,combine:a.combine,mapUv:ae&&h(a.map.channel),aoMapUv:se&&h(a.aoMap.channel),lightMapUv:ce&&h(a.lightMap.channel),bumpMapUv:le&&h(a.bumpMap.channel),normalMapUv:ue&&h(a.normalMap.channel),displacementMapUv:de&&h(a.displacementMap.channel),emissiveMapUv:fe&&h(a.emissiveMap.channel),metalnessMapUv:pe&&h(a.metalnessMap.channel),roughnessMapUv:me&&h(a.roughnessMap.channel),anisotropyMapUv:be&&h(a.anisotropyMap.channel),clearcoatMapUv:xe&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:Se&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:M&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:N&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:we&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:Te&&h(a.sheenRoughnessMap.channel),specularMapUv:Ee&&h(a.specularMap.channel),specularColorMapUv:De&&h(a.specularColorMap.channel),specularIntensityMapUv:Oe&&h(a.specularIntensityMap.channel),transmissionMapUv:ke&&h(a.transmissionMap.channel),thicknessMapUv:Ae&&h(a.thicknessMap.channel),alphaMapUv:Me&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(ue||he),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(ae||Me),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0&&a.wireframe===!1,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:ae&&a.map.isVideoTexture===!0&&Nt.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:fe&&a.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Fe&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&a.extensions.multiDraw===!0||ie)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),t.gradientMap&&s.enable(22),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=to[t];n=Zr.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new Cc(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function Oc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function kc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ac(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function jc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||kc),r.length>1&&r.sort(t||Ac),i.length>1&&i.sort(t||Ac)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function Mc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new jc,e.set(t,[i])):n>=r.length?(i=new jc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Nc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new F,color:new I};break;case`SpotLight`:n={position:new F,direction:new F,color:new I,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new F,color:new I,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new F,skyColor:new I,groundColor:new I};break;case`RectAreaLight`:n={color:new I,position:new F,halfWidth:new F,halfHeight:new F}}return e[t.id]=n,n}}}function Pc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new P};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new P};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new P,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Fc=0;function Ic(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Lc(e){let t=new Nc,n=Pc(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new F);let i=new F,a=new Cn,o=new Cn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(Ic);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=z.LTC_FLOAT_1,r.rectAreaLTC2=z.LTC_FLOAT_2):(r.rectAreaLTC1=z.LTC_HALF_1,r.rectAreaLTC2=z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=Fc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Rc(e){let t=new Lc(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function zc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Rc(e),t.set(n,[a])):r>=i.length?(a=new Rc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Bc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hc(e,t,n){let i=new Ui,a=new P,o=new P,s=new Wt,c=new ra({depthPacking:Le}),l=new ia,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new P},radius:{value:4}},vertexShader:Bc,fragmentShader:Vc}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new Nr;h.setAttribute(`position`,new Sr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new L(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,c){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;a.copy(f.mapSize);let g=f.getFrameExtents();if(a.multiply(g),o.copy(f.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(o.x=Math.floor(d/g.x),a.x=o.x*g.x,f.mapSize.x=o.x),a.y>d&&(o.y=Math.floor(d/g.y),a.y=o.y*g.y,f.mapSize.y=o.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:r,magFilter:r};f.map!==null&&f.map.dispose(),f.map=new Kt(a.x,a.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);s.set(o.x*t.x,o.y*t.y,o.x*t.z,o.y*t.w),p.viewport(s),f.updateMatrices(u,e),i=f.getFrustum(),x(n,c,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,c),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let i=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Kt(a.x,a.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||i.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],r,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var Uc={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Wc(e,t){function n(){let t=!1,n=new Wt,r=null,i=new Wt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Uc[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new I(0,0,0),w=0,T=!1,E=null,D=null,ee=null,O=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),re=!1,k=0,ie=e.getParameter(e.VERSION);ie.indexOf(`WebGL`)===-1?ie.indexOf(`OpenGL ES`)!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),re=k>=2):(k=parseFloat(/^WebGL (\d)/.exec(ie)[1]),re=k>=1);let ae=null,A={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Wt().fromArray(oe),le=new Wt().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),be(!1),xe(1),fe(e.CULL_FACE),ye(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return m!==t&&(e.useProgram(t),m=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ye(t,n,r,i,a,o,s,c,l,u){if(t===0){h===!0&&(pe(e.BLEND),h=!1);return}if(h===!1&&(fe(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:console.error(`THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:console.error(`THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}return}a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(_e[n],_e[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function j(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ye(0):ye(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),M(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function xe(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function Se(t){t!==ee&&(re&&e.lineWidth(t),ee=t)}function M(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(O!==n||te!==r)&&(e.polygonOffset(n,r),O=n,te=r)):pe(e.POLYGON_OFFSET_FILL)}function Ce(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function N(t){t===void 0&&(t=e.TEXTURE0+ne-1),ae!==t&&(e.activeTexture(t),ae=t)}function we(t,n,r){r===void 0&&(r=ae===null?e.TEXTURE0+ne-1:ae);let i=A[r];i===void 0&&(i={type:void 0,texture:void 0},A[r]=i),(i.type!==t||i.texture!==n)&&(ae!==r&&(e.activeTexture(r),ae=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function Te(){let t=A[ae];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Pe(){try{e.texImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ie(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Le(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Re(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function ze(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Be(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},ae=null,A={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new I(0,0,0),w=0,T=!1,E=null,D=null,ee=null,O=null,te=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:ye,setMaterial:j,setFlipSided:be,setCullFace:xe,setLineWidth:Se,setPolygonOffset:M,setScissorTest:Ce,activeTexture:N,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:Pe,texImage3D:Fe,updateUBOMapping:Re,uniformBlockBinding:ze,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:Ie,viewport:Le,reset:Be}}function Gc(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new P,y=new WeakMap,b,x=new WeakMap,S=!1;try{S=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function C(e,t){return S?new OffscreenCanvas(e,t):Tt(`canvas`)}function w(e,t,n){let r=1,i=Pe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);b===void 0&&(b=C(n,a));let o=t?C(n,a):b;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function T(e){return e.generateMipmaps}function D(e){l.generateMipmap(e)}function ee(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function O(e,t,n,r,i=!1){if(e!==null){if(l[e]!==void 0)return l[e];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let a=t;if(t===l.RED&&(n===l.FLOAT&&(a=l.R32F),n===l.HALF_FLOAT&&(a=l.R16F),n===l.UNSIGNED_BYTE&&(a=l.R8)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.R8UI),n===l.UNSIGNED_SHORT&&(a=l.R16UI),n===l.UNSIGNED_INT&&(a=l.R32UI),n===l.BYTE&&(a=l.R8I),n===l.SHORT&&(a=l.R16I),n===l.INT&&(a=l.R32I)),t===l.RG&&(n===l.FLOAT&&(a=l.RG32F),n===l.HALF_FLOAT&&(a=l.RG16F),n===l.UNSIGNED_BYTE&&(a=l.RG8)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RG8UI),n===l.UNSIGNED_SHORT&&(a=l.RG16UI),n===l.UNSIGNED_INT&&(a=l.RG32UI),n===l.BYTE&&(a=l.RG8I),n===l.SHORT&&(a=l.RG16I),n===l.INT&&(a=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RGB8UI),n===l.UNSIGNED_SHORT&&(a=l.RGB16UI),n===l.UNSIGNED_INT&&(a=l.RGB32UI),n===l.BYTE&&(a=l.RGB8I),n===l.SHORT&&(a=l.RGB16I),n===l.INT&&(a=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(a=l.RGBA16UI),n===l.UNSIGNED_INT&&(a=l.RGBA32UI),n===l.BYTE&&(a=l.RGBA8I),n===l.SHORT&&(a=l.RGBA16I),n===l.INT&&(a=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_INT_5_9_9_9_REV&&(a=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(a=l.R11F_G11F_B10F)),t===l.RGBA){let e=i?Be:Nt.getTransfer(r);n===l.FLOAT&&(a=l.RGBA32F),n===l.HALF_FLOAT&&(a=l.RGBA16F),n===l.UNSIGNED_BYTE&&(a=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT_4_4_4_4&&(a=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(a=l.RGB5_A1)}return(a===l.R16F||a===l.R32F||a===l.RG16F||a===l.RG32F||a===l.RGBA16F||a===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),a}function te(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function ne(e,t){return T(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function re(e){let t=e.target;t.removeEventListener(`dispose`,re),ie(t),t.isVideoTexture&&y.delete(t)}function k(e){let t=e.target;t.removeEventListener(`dispose`,k),A(t)}function ie(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=x.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&ae(e),Object.keys(r).length===0&&x.delete(n)}f.remove(e)}function ae(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=x.get(n);delete r[t.__cacheKey],h.memory.textures--}function A(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let oe=0;function se(){oe=0}function ce(){let e=oe;return e>=p.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),oe+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ue(e,t){let n=f.get(e);if(e.isVideoTexture&&Me(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{be(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function de(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){be(n,e,t);return}d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function fe(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){be(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function pe(e,t){let n=f.get(e);if(e.version>0&&n.__version!==e.version){xe(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let me={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},he={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},ge={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function _e(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,me[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,me[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,me[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,he[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,he[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,ge[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function ve(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,re));let r=t.source,i=x.get(r);i===void 0&&(i={},x.set(r,i));let a=le(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&ae(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function j(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=ye(r.start,t.width,4),c=ye(n.start,t.width,4);r.start<=o+1&&s===c&&ye(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=l.getParameter(l.UNPACK_ROW_LENGTH),s=l.getParameter(l.UNPACK_SKIP_PIXELS),c=l.getParameter(l.UNPACK_SKIP_ROWS);l.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;l.pixelStorei(l.UNPACK_SKIP_PIXELS,c),l.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),l.pixelStorei(l.UNPACK_ROW_LENGTH,o),l.pixelStorei(l.UNPACK_SKIP_PIXELS,s),l.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function be(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=ve(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(l.TEXTURE0+n);let e=Nt.getPrimaries(Nt.workingColorSpace),s=t.colorSpace===``?null:Nt.getPrimaries(t.colorSpace),c=t.colorSpace===``||e===s?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let u=w(t.image,!1,p.maxTextureSize);u=Ne(t,u);let f=m.convert(t.format,t.colorSpace),h=m.convert(t.type),g=O(t.internalFormat,f,h,t.colorSpace,t.isVideoTexture);_e(r,t);let _,v=t.mipmaps,y=t.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=ne(t,u);if(t.isDepthTexture)g=te(t.format===E,t.type),b&&(y?d.texStorage2D(l.TEXTURE_2D,1,g,u.width,u.height):d.texImage2D(l.TEXTURE_2D,0,g,u.width,u.height,0,f,h,null));else if(t.isDataTexture)if(v.length>0){y&&b&&d.texStorage2D(l.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let e=0,t=v.length;e<t;e++)_=v[e],y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,h,_.data):d.texImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,f,h,_.data);t.generateMipmaps=!1}else y?(b&&d.texStorage2D(l.TEXTURE_2D,S,g,u.width,u.height),x&&j(t,u,f,h)):d.texImage2D(l.TEXTURE_2D,0,g,u.width,u.height,0,f,h,u.data);else if(t.isCompressedTexture)if(t.isCompressedArrayTexture){y&&b&&d.texStorage3D(l.TEXTURE_2D_ARRAY,S,g,v[0].width,v[0].height,u.depth);for(let e=0,n=v.length;e<n;e++)if(_=v[e],t.format!==1023)if(f!==null)if(y){if(x)if(t.layerUpdates.size>0){let n=Xa(_.width,_.height,t.format,t.type);for(let r of t.layerUpdates){let t=_.data.subarray(r*n/_.data.BYTES_PER_ELEMENT,(r+1)*n/_.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,r,_.width,_.height,1,f,t)}t.clearLayerUpdates()}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,0,_.width,_.height,u.depth,f,_.data)}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,e,g,_.width,_.height,u.depth,0,_.data,0,0);else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else y?x&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,0,_.width,_.height,u.depth,f,h,_.data):d.texImage3D(l.TEXTURE_2D_ARRAY,e,g,_.width,_.height,u.depth,0,f,h,_.data)}else{y&&b&&d.texStorage2D(l.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let e=0,n=v.length;e<n;e++)_=v[e],t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,h,_.data):d.texImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,f,h,_.data):f===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,_.data):d.compressedTexImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,_.data)}else if(t.isDataArrayTexture)if(y){if(b&&d.texStorage3D(l.TEXTURE_2D_ARRAY,S,g,u.width,u.height,u.depth),x)if(t.layerUpdates.size>0){let e=Xa(u.width,u.height,t.format,t.type);for(let n of t.layerUpdates){let t=u.data.subarray(n*e/u.data.BYTES_PER_ELEMENT,(n+1)*e/u.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,n,u.width,u.height,1,f,h,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,g,u.width,u.height,u.depth,0,f,h,u.data);else if(t.isData3DTexture)y?(b&&d.texStorage3D(l.TEXTURE_3D,S,g,u.width,u.height,u.depth),x&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)):d.texImage3D(l.TEXTURE_3D,0,g,u.width,u.height,u.depth,0,f,h,u.data);else if(t.isFramebufferTexture){if(b)if(y)d.texStorage2D(l.TEXTURE_2D,S,g,u.width,u.height);else{let e=u.width,t=u.height;for(let n=0;n<S;n++)d.texImage2D(l.TEXTURE_2D,n,g,e,t,0,f,h,null),e>>=1,t>>=1}}else if(v.length>0){if(y&&b){let e=Pe(v[0]);d.texStorage2D(l.TEXTURE_2D,S,g,e.width,e.height)}for(let e=0,t=v.length;e<t;e++)_=v[e],y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f,h,_):d.texImage2D(l.TEXTURE_2D,e,g,f,h,_);t.generateMipmaps=!1}else if(y){if(b){let e=Pe(u);d.texStorage2D(l.TEXTURE_2D,S,g,e.width,e.height)}x&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,f,h,u)}else d.texImage2D(l.TEXTURE_2D,0,g,f,h,u);T(t)&&D(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function xe(e,t,n){if(t.image.length!==6)return;let r=ve(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=Nt.getPrimaries(Nt.workingColorSpace),o=t.colorSpace===``?null:Nt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=w(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Ne(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=O(t.internalFormat,g,_,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=ne(t,h);_e(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Pe(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}T(t)&&D(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Se(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=O(n.internalFormat,o,s,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ae(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function M(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=te(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,s=Ae(t);je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,s,a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,s,a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=O(i.internalFormat,a,o,i.colorSpace),c=Ae(t);n&&je(t)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,t.width,t.height):je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,c,s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Ce(e,t){if(t&&t.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let n=f.get(t.depthTexture);n.__renderTarget=t,(!n.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),ue(t.depthTexture,0);let r=n.__webglTexture,i=Ae(t);if(t.depthTexture.format===1026)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,r,0,i):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,r,0);else if(t.depthTexture.format===1027)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,r,0,i):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,r,0);else throw Error(`Unknown depthTexture format`)}function N(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)throw Error(`target.depthTexture not supported in Cube render targets`);let r=e.texture.mipmaps;r&&r.length>0?Ce(t.__webglFramebuffer[0],e):Ce(t.__webglFramebuffer,e)}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),M(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),M(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function we(e,t,n){let r=f.get(e);t!==void 0&&Se(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&N(e)}function Te(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,k);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&je(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=O(r.internalFormat,a,o,r.colorSpace,e.isXRRenderTarget===!0),c=Ae(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),M(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),_e(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)Se(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else Se(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);T(t)&&D(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),_e(o,r),Se(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),T(r)&&D(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),_e(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)Se(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else Se(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);T(t)&&D(i),d.unbindTexture()}e.depthBuffer&&N(e)}function Ee(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(T(r)){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),D(t),d.unbindTexture()}}}let De=[],Oe=[];function ke(e){if(e.samples>0){if(je(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(De.length=0,Oe.length=0,De.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.resolveDepthBuffer===!1&&(De.push(a),Oe.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Oe)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,De))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.resolveDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ae(e){return Math.min(p.maxSamples,e.samples)}function je(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Me(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Ne(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Nt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function Pe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ce,this.resetTextureUnits=se,this.setTexture2D=ue,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=N,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=je}function Kc(e,t){function n(n,r=``){let i,a=Nt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var qc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jc=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Yc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new $i(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ei({vertexShader:qc,fragmentShader:Jc,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new L(new ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Xc=class extends Ge{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Yc,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],ee=new P,O=null,te=new ai;te.viewport=new Wt;let ne=new ai;ne.viewport=new Wt;let re=[te,ne],k=new Ia,ie=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new pi,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new pi,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new pi,C[e]=t),t.getHandSpace()};function A(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function oe(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,oe),r.removeEventListener(`inputsourceschange`,se);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}ie=null,ae=null,_.reset();for(let e in v)delete v[e];e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,he.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(ee.width,ee.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,oe),r.addEventListener(`inputsourceschange`,se),b.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(ee),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Kt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new Qi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Kt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),he.setContext(r),he.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function se(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ce=new F,le=new F;function ue(e,t,n){ce.setFromMatrixPosition(t.matrixWorld),le.setFromMatrixPosition(n.matrixWorld);let r=ce.distanceTo(le),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function de(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),k.near=ne.near=te.near=t,k.far=ne.far=te.far=n,(ie!==k.near||ae!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),ie=k.near,ae=k.far),k.layers.mask=e.layers.mask|6,te.layers.mask=k.layers.mask&3,ne.layers.mask=k.layers.mask&5;let i=e.parent,a=k.cameras;de(k,i);for(let e=0;e<a.length;e++)de(a[e],i);a.length===2?ue(k,te,ne):k.projectionMatrix.copy(te.projectionMatrix),fe(e,k,i)};function fe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Ye*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(k)},this.getCameraTexture=function(e){return v[e]};let pe=null;function me(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==k.cameras.length&&(k.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=re[n];o===void 0&&(o=new ai,o.layers.enable(n),o.viewport=new Wt,re[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(k.matrix.copy(o.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),i===!0&&k.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new $i,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}pe&&pe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let he=new Qa;he.setAnimationLoop(me),this.setAnimationLoop=function(e){pe=e},this.dispose=function(){}}},Zc=new Nn,Qc=new Cn;function $c(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Xr(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,Zc.copy(o),Zc.x*=-1,Zc.y*=-1,Zc.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(Zc.y*=-1,Zc.z*=-1),e.envMapRotation.value.setFromMatrix4(Qc.makeRotationFromEuler(Zc)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function el(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var tl=class{constructor(e={}){let{canvas:t=Et(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=new Uint32Array(4),_=new Int32Array(4),v=null,y=null,b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=Re;let w=0,T=0,E=null,D=-1,ee=null,O=new Wt,te=new Wt,ne=null,re=new I(0),k=0,ie=t.width,ae=t.height,A=1,oe=null,se=null,ce=new Wt(0,0,ie,ae),le=new Wt(0,0,ie,ae),ue=!1,de=new Ui,fe=!1,pe=!1,me=new Cn,he=new F,ge=new Wt,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return E===null?A:1}let j=n;function be(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r180`),t.addEventListener(`webglcontextlost`,Je,!1),t.addEventListener(`webglcontextrestored`,Ye,!1),t.addEventListener(`webglcontextcreationerror`,Xe,!1),j===null){let t=`webgl2`;if(j=be(t,e),j===null)throw be(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let xe,Se,M,Ce,N,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Be,Ve,He,Ue,Ge;function Ke(){xe=new Po(j),xe.init(),He=new Kc(j,xe),Se=new co(j,xe,e,He),M=new Wc(j,xe),Se.reversedDepthBuffer&&p&&M.buffers.depth.setReversed(!0),Ce=new Lo(j),N=new Oc,we=new Gc(j,xe,M,N,Se,He,Ce),Te=new uo(S),Ee=new No(S),De=new $a(j),Ue=new oo(j,De),Oe=new Fo(j,De,Ce,Ue),ke=new zo(j,Oe,De,Ce),Le=new Ro(j,Se,we),Pe=new lo(N),Ae=new Dc(S,Te,Ee,xe,Se,Ue,Pe),je=new $c(S,N),Me=new Mc,Ne=new zc(xe),Ie=new ao(S,Te,Ee,M,ke,m,s),Fe=new Hc(S,ke,Se),Ge=new el(j,Ce,Se,M),Be=new so(j,xe,Ce),Ve=new Io(j,xe,Ce),Ce.programs=Ae.programs,S.capabilities=Se,S.extensions=xe,S.properties=N,S.renderLists=Me,S.shadowMap=Fe,S.state=M,S.info=Ce}Ke();let qe=new Xc(S,j);this.xr=qe,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return A},this.setPixelRatio=function(e){e!==void 0&&(A=e,this.setSize(ie,ae,!1))},this.getSize=function(e){return e.set(ie,ae)},this.setSize=function(e,n,r=!0){if(qe.isPresenting){console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`);return}ie=e,ae=n,t.width=Math.floor(e*A),t.height=Math.floor(n*A),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ie*A,ae*A).floor()},this.setDrawingBufferSize=function(e,n,r){ie=e,ae=n,A=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(O)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),M.viewport(O.copy(ce).multiplyScalar(A).round())},this.getScissor=function(e){return e.copy(le)},this.setScissor=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),M.scissor(te.copy(le).multiplyScalar(A).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(e){M.setScissorTest(ue=e)},this.setOpaqueSort=function(e){oe=e},this.setTransparentSort=function(e){se=e},this.getClearColor=function(e){return e.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(E!==null){let t=E.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=E.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=Ie.getClearColor(),r=Ie.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,j.clearBufferuiv(j.COLOR,0,h)):(_[0]=i,_[1]=a,_[2]=o,_[3]=r,j.clearBufferiv(j.COLOR,0,_))}else r|=j.COLOR_BUFFER_BIT}t&&(r|=j.DEPTH_BUFFER_BIT),n&&(r|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Je,!1),t.removeEventListener(`webglcontextrestored`,Ye,!1),t.removeEventListener(`webglcontextcreationerror`,Xe,!1),Ie.dispose(),Me.dispose(),Ne.dispose(),N.dispose(),Te.dispose(),Ee.dispose(),ke.dispose(),Ue.dispose(),Ge.dispose(),Ae.dispose(),qe.dispose(),qe.removeEventListener(`sessionstart`,rt),qe.removeEventListener(`sessionend`,it),at.stop()};function Je(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),C=!0}function Ye(){console.log(`THREE.WebGLRenderer: Context Restored.`),C=!1;let e=Ce.autoReset,t=Fe.enabled,n=Fe.autoUpdate,r=Fe.needsUpdate,i=Fe.type;Ke(),Ce.autoReset=e,Fe.enabled=t,Fe.autoUpdate=n,Fe.needsUpdate=r,Fe.type=i}function Xe(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ze(e){let t=e.target;t.removeEventListener(`dispose`,Ze),Qe(t)}function Qe(e){$e(e),N.remove(e)}function $e(e){let t=N.get(e).programs;t!==void 0&&(t.forEach(function(e){Ae.releaseProgram(e)}),e.isShaderMaterial&&Ae.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=mt(e,t,n,r,i);M.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Oe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ue.setup(i,r,s,n,c);let h,g=Be;if(c!==null&&(h=De.get(c),g=Ve,g.setIndex(h)),i.isMesh)r.wireframe===!0?(M.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(j.LINES)):g.setMode(j.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),M.setLineWidth(e*ye()),i.isLineSegments?g.setMode(j.LINES):i.isLineLoop?g.setMode(j.LINE_LOOP):g.setMode(j.LINE_STRIP)}else i.isPoints?g.setMode(j.POINTS):i.isSprite&&g.setMode(j.TRIANGLES);if(i.isBatchedMesh)if(i._multiDrawInstances!==null)Ot(`THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.`),g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?De.get(c).bytesPerElement:1,o=N.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(j,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function et(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,dt(e,t,n),e.side=0,e.needsUpdate=!0,dt(e,t,n),e.side=2):dt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),y=Ne.get(n),y.init(t),x.push(y),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),y.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];et(a,n,e),r.add(a)}else et(t,n,e),r.add(t)}),y=x.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){N.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let tt=null;function nt(e){tt&&tt(e)}function rt(){at.stop()}function it(){at.start()}let at=new Qa;at.setAnimationLoop(nt),typeof self<`u`&&at.setContext(self),this.setAnimationLoop=function(e){tt=e,qe.setAnimationLoop(e),e===null?at.stop():at.start()},qe.addEventListener(`sessionstart`,rt),qe.addEventListener(`sessionend`,it),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(C===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(t),t=qe.getCamera()),e.isScene===!0&&e.onBeforeRender(S,e,t,E),y=Ne.get(e,x.length),y.init(t),x.push(y),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),de.setFromProjectionMatrix(me,We,t.reversedDepth),pe=this.localClippingEnabled,fe=Pe.init(this.clippingPlanes,pe),v=Me.get(e,b.length),v.init(),b.push(v),qe.enabled===!0&&qe.isPresenting===!0){let e=S.xr.getDepthSensingMesh();e!==null&&ot(e,t,-1/0,S.sortObjects)}ot(e,t,0,S.sortObjects),v.finish(),S.sortObjects===!0&&v.sort(oe,se),ve=qe.enabled===!1||qe.isPresenting===!1||qe.hasDepthSensing()===!1,ve&&Ie.addToRenderList(v,e),this.info.render.frame++,fe===!0&&Pe.beginShadows();let n=y.state.shadowsArray;Fe.render(n,e,t),fe===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=v.opaque,i=v.transmissive;if(y.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];ct(r,i,e,a)}ve&&Ie.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];st(v,e,r,r.viewport)}}else i.length>0&&ct(r,i,e,t),ve&&Ie.render(e),st(v,e,t);E!==null&&T===0&&(we.updateMultisampleRenderTarget(E),we.updateRenderTargetMipmap(E)),e.isScene===!0&&e.onAfterRender(S,e,t),Ue.resetDefaultState(),D=-1,ee=null,x.pop(),x.length>0?(y=x[x.length-1],fe===!0&&Pe.setGlobalState(S.clippingPlanes,y.state.camera)):y=null,b.pop(),v=b.length>0?b[b.length-1]:null};function ot(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)y.pushLight(e),e.castShadow&&y.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||de.intersectsSprite(e)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let t=ke.update(e),i=e.material;i.visible&&v.push(e,t,i,n,ge.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||de.intersectsObject(e))){let t=ke.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ge.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&v.push(e,t,s,n,ge.z,o)}}else i.visible&&v.push(e,t,i,n,ge.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ot(i[e],t,n,r)}function st(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;y.setupLightsView(n),fe===!0&&Pe.setGlobalState(S.clippingPlanes,n),r&&M.viewport(O.copy(r)),i.length>0&&lt(i,t,n),a.length>0&&lt(a,t,n),o.length>0&&lt(o,t,n),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function ct(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[r.id]===void 0&&(y.state.transmissionRenderTarget[r.id]=new Kt(1,1,{generateMipmaps:!0,type:xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`)?g:l,minFilter:c,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace}));let a=y.state.transmissionRenderTarget[r.id],o=r.viewport||O;a.setSize(o.z*S.transmissionResolutionScale,o.w*S.transmissionResolutionScale);let s=S.getRenderTarget(),u=S.getActiveCubeFace(),d=S.getActiveMipmapLevel();S.setRenderTarget(a),S.getClearColor(re),k=S.getClearAlpha(),k<1&&S.setClearColor(16777215,.5),S.clear(),ve&&Ie.render(n);let f=S.toneMapping;S.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),y.setupLightsView(r),fe===!0&&Pe.setGlobalState(S.clippingPlanes,r),lt(e,n,r),we.updateMultisampleRenderTarget(a),we.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,ut(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(we.updateMultisampleRenderTarget(a),we.updateRenderTargetMipmap(a))}S.setRenderTarget(s,u,d),S.setClearColor(re,k),p!==void 0&&(r.viewport=p),S.toneMapping=f}function lt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=a.group,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ut(o,t,n,s,l,c)}}function ut(e,t,n,r,i,a){e.onBeforeRender(S,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(S,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=2):S.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(S,t,n,r,i,a)}function dt(e,t,n){t.isScene!==!0&&(t=_e);let r=N.get(e),i=y.state.lights,a=y.state.shadowsArray,o=i.state.version,s=Ae.getParameters(e,i.state,a,t,n),c=Ae.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?Ee:Te).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ze),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return pt(e,s),u}else s.uniforms=Ae.getUniforms(e),e.onBeforeCompile(s,S),u=Ae.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=Pe.uniform),pt(e,s),r.needsLights=gt(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function ft(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Ks.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function pt(e,t){let n=N.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function mt(e,t,n,r,i){t.isScene!==!0&&(t=_e),we.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=E===null?S.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ze,c=(r.isMeshStandardMaterial?Ee:Te).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(m=S.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=N.get(r),v=y.state.lights;if(fe===!0&&(pe===!0||e!==ee)){let t=e===ee&&r.id===D;Pe.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==v.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isBatchedMesh&&_.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&_.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&_.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&_.instancingMorph===!1&&i.morphTexture!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==Pe.numPlanes||_.numIntersection!==Pe.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=dt(r,t,i));let C=!1,w=!1,T=!1,O=x.getUniforms(),te=_.uniforms;if(M.useProgram(x.program)&&(C=!0,w=!0,T=!0),r.id!==D&&(D=r.id,w=!0),C||ee!==e){M.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(j,`projectionMatrix`,e.projectionMatrix),O.setValue(j,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(j,he.setFromMatrixPosition(e.matrixWorld)),Se.logarithmicDepthBuffer&&O.setValue(j,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(j,`isOrthographic`,e.isOrthographicCamera===!0),ee!==e&&(ee=e,w=!0,T=!0)}if(i.isSkinnedMesh){O.setOptional(j,i,`bindMatrix`),O.setOptional(j,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(j,`boneTexture`,e.boneTexture,we))}i.isBatchedMesh&&(O.setOptional(j,i,`batchingTexture`),O.setValue(j,`batchingTexture`,i._matricesTexture,we),O.setOptional(j,i,`batchingIdTexture`),O.setValue(j,`batchingIdTexture`,i._indirectTexture,we),O.setOptional(j,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(j,`batchingColorTexture`,i._colorsTexture,we));let ne=n.morphAttributes;if((ne.position!==void 0||ne.normal!==void 0||ne.color!==void 0)&&Le.update(i,n,x),(w||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,O.setValue(j,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(te.envMap.value=c,te.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(te.envMapIntensity.value=t.environmentIntensity),w&&(O.setValue(j,`toneMappingExposure`,S.toneMappingExposure),_.needsLights&&ht(te,T),a&&r.fog===!0&&je.refreshFogUniforms(te,a),je.refreshMaterialUniforms(te,r,A,ae,y.state.transmissionRenderTarget[e.id]),Ks.upload(j,ft(_),te,we)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Ks.upload(j,ft(_),te,we),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(j,`center`,i.center),O.setValue(j,`modelViewMatrix`,i.modelViewMatrix),O.setValue(j,`normalMatrix`,i.normalMatrix),O.setValue(j,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ge.update(n,x),Ge.bind(n,x)}}return x}function ht(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function gt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(e,t,n){let r=N.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),N.get(e.texture).__webglTexture=t,N.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=N.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let _t=j.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){E=e,w=t,T=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=N.get(e);if(s.__useDefaultFramebuffer!==void 0)M.bindFramebuffer(j.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)we.setupRenderTarget(e);else if(s.__hasExternalTextures)we.rebindTextures(e,N.get(e.texture).__webglTexture,N.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&N.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);we.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=N.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&we.useMultisampledRTT(e)===!1?N.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,O.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest}else O.copy(ce).multiplyScalar(A).floor(),te.copy(le).multiplyScalar(A).floor(),ne=ue;if(n!==0&&(i=_t),M.bindFramebuffer(j.FRAMEBUFFER,i)&&r&&M.drawBuffers(e,i),M.viewport(O),M.scissor(te),M.setScissorTest(ne),a){let r=N.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=t;for(let t=0;t<e.textures.length;t++){let i=N.get(e.textures[t]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=N.get(e.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,t.__webglTexture,n)}D=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=N.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){M.bindFramebuffer(j.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(!Se.textureFormatReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Se.textureTypeReadable(l)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&(e.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+s),j.readPixels(t,n,r,i,He.convert(c),He.convert(l),a))}finally{let e=E===null?null:N.get(E).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=N.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){M.bindFramebuffer(j.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(!Se.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Se.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,d),j.bufferData(j.PIXEL_PACK_BUFFER,a.byteLength,j.STREAM_READ),e.textures.length>1&&j.readBuffer(j.COLOR_ATTACHMENT0+s),j.readPixels(t,n,r,i,He.convert(l),He.convert(u),0);let f=E===null?null:N.get(E).__webglFramebuffer;M.bindFramebuffer(j.FRAMEBUFFER,f);let p=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await kt(j,p,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,d),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,a),j.deleteBuffer(d),j.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;we.setTexture2D(e,0),j.copyTexSubImage2D(j.TEXTURE_2D,n,0,0,o,s,i,a),M.unbindTexture()};let vt=j.createFramebuffer(),P=j.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=null){a===null&&(i===0?a=0:(Ot(`WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.`),a=i,i=0));let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=He.convert(t.format),_=He.convert(t.type),v;t.isData3DTexture?(we.setTexture3D(t,0),v=j.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(we.setTexture2DArray(t,0),v=j.TEXTURE_2D_ARRAY):(we.setTexture2D(t,0),v=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,t.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,t.unpackAlignment);let y=j.getParameter(j.UNPACK_ROW_LENGTH),b=j.getParameter(j.UNPACK_IMAGE_HEIGHT),x=j.getParameter(j.UNPACK_SKIP_PIXELS),S=j.getParameter(j.UNPACK_SKIP_ROWS),C=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,h.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,h.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,l),j.pixelStorei(j.UNPACK_SKIP_ROWS,u),j.pixelStorei(j.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=N.get(e),r=N.get(t),h=N.get(n.__renderTarget),g=N.get(r.__renderTarget);M.bindFramebuffer(j.READ_FRAMEBUFFER,h.__webglFramebuffer),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,N.get(e).__webglTexture,i,d+n),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,N.get(t).__webglTexture,a,m+n)),j.blitFramebuffer(l,u,o,s,f,p,o,s,j.DEPTH_BUFFER_BIT,j.NEAREST);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||N.has(e)){let n=N.get(e),r=N.get(t);M.bindFramebuffer(j.READ_FRAMEBUFFER,vt),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,P);for(let e=0;e<c;e++)w?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,n.__webglTexture,i),T?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,r.__webglTexture,a),i===0?T?j.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):j.copyTexSubImage2D(v,a,f,p,l,u,o,s):j.blitFramebuffer(l,u,o,s,f,p,o,s,j.COLOR_BUFFER_BIT,j.NEAREST);M.bindFramebuffer(j.READ_FRAMEBUFFER,null),M.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?j.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?j.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):j.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):j.texSubImage2D(j.TEXTURE_2D,a,f,p,o,s,g,_,h);j.pixelStorei(j.UNPACK_ROW_LENGTH,y),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,b),j.pixelStorei(j.UNPACK_SKIP_PIXELS,x),j.pixelStorei(j.UNPACK_SKIP_ROWS,S),j.pixelStorei(j.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&j.generateMipmap(v),M.unbindTexture()},this.initRenderTarget=function(e){N.get(e).__webglFramebuffer===void 0&&we.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?we.setTextureCube(e,0):e.isData3DTexture?we.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?we.setTexture2DArray(e,0):we.setTexture2D(e,0),M.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,M.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return We}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Nt._getUnpackColorSpace()}};function nl(e){return e.kind===`sound`&&typeof e.sound==`string`}function rl(e,t){return(1/10**((e+(0-e)/t)/20))**.6}var il=class{player;audioContext;master;groups=new Map;factories=new Map;active=new Map;detachListeners=[];masterGain=.8;constructor(e){this.player=e,this.detachListeners=[e.addTypedEventListener(`cue`,e=>{let{cue:t}=e.detail;nl(t)&&this.start(t,0)}),e.addTypedEventListener(`cueexit`,e=>{let{cue:t}=e.detail;nl(t)&&this.stop(t.id)}),e.addTypedEventListener(`frame`,t=>{if((t.detail.reason===`seek`||t.detail.reason===`init`)&&(this.stopAll(),e.isPlaying))for(let n of e.getActiveCues(`sound`))nl(n)&&n.sustain&&this.start(n,t.detail.time-n.start)}),e.addTypedEventListener(`statechange`,t=>{if(t.detail.state!==`playing`){this.stopAll();return}for(let t of e.getActiveCues(`sound`))nl(t)&&t.sustain&&this.start(t,e.currentTime-t.start)})]}define(e,t){if(!e.trim())throw Error(`Sound names cannot be empty`);return this.factories.set(e,t),this}async unlock(){if(typeof window>`u`)return;let e=window.AudioContext??window.webkitAudioContext;if(e){if(!this.audioContext){this.audioContext=new e,this.master=this.audioContext.createGain(),this.master.gain.value=this.masterGain;let t=this.audioContext.createDynamicsCompressor();t.threshold.value=-6,t.knee.value=0,t.ratio.value=20,t.attack.value=.001,t.release.value=.12;let n=this.audioContext.createGain();n.gain.value=1/rl(-6,20),this.master.connect(t),t.connect(n),n.connect(this.audioContext.destination)}return this.audioContext.state===`suspended`&&await this.audioContext.resume(),this.audioContext}}setMasterGain(e){return this.masterGain=Math.min(1,Math.max(0,e)),this.master&&this.audioContext&&this.master.gain.setTargetAtTime(this.masterGain,this.audioContext.currentTime,.015),this}setGroupGain(e,t){let n=this.getGroup(e);return n&&this.audioContext&&n.gain.setTargetAtTime(Math.min(2,Math.max(0,t)),this.audioContext.currentTime,.015),this}stopAll(){for(let e of[...this.active.keys()])this.stop(e)}destroy(){this.stopAll();for(let e of this.detachListeners)e();this.detachListeners=[],this.audioContext?.close(),this.audioContext=void 0,this.master=void 0,this.groups.clear()}getGroup(e=`sfx`){if(!this.audioContext||!this.master)return;let t=this.groups.get(e);if(t)return t;let n=this.audioContext.createGain();return n.connect(this.master),this.groups.set(e,n),n}start(e,t){if(this.active.has(e.id)||!this.audioContext)return;let n=this.factories.get(e.sound),r=this.getGroup(e.group);if(!n||!r)return;let i=this.audioContext.createGain();i.gain.value=e.gain??1,i.connect(r);let a=n({audioContext:this.audioContext,output:i,cue:e,offset:Math.max(0,t)}),o=a&&typeof a.stop==`function`?a:void 0;this.active.set(e.id,{handle:o,output:i})}stop(e){let t=this.active.get(e);if(t){this.active.delete(e);try{t.handle?.stop()}finally{t.output.disconnect()}}}};function al(e){return Math.min(1,Math.max(0,e))}var ol=class extends Event{detail;constructor(e,t){super(e),this.detail=t}};function sl(e,t){if(!Number.isFinite(e)||e<0)throw Error(`${t} must be a finite non-negative number`)}function cl(e,t){if(!e.id.trim())throw Error(`Timeline ids cannot be empty`);if(sl(e.start,`${e.id}.start`),sl(e.end,`${e.id}.end`),e.end<=e.start)throw Error(`${e.id}.end must be greater than start`);if(e.end>t)throw Error(`${e.id}.end exceeds the player duration`)}function ll(e,t,n){return t>=e.start&&(t<e.end||t===n&&e.end===n)}function ul(e,t=1/0){let n=new Set;return e.map(e=>{if(cl(e,t),n.has(e.id))throw Error(`Duplicate voice cue id: ${e.id}`);n.add(e.id);for(let t of[`kind`,`speaker`,`text`,`delivery`])if(typeof e[t]!=`string`||!e[t].trim())throw Error(`${e.id}.${t} must be a non-empty string`);return{...e}})}var dl=class extends EventTarget{context;duration;loop;requestFrame;cancelFrame;shots=[];cues=[];activeShots=new Set;activeCueIds=new Set;frameHandle;lastFrameMs;timeValue=0;rateValue=1;stateValue=`paused`;constructor(e){if(super(),sl(e.duration,`duration`),e.duration===0)throw Error(`duration must be greater than zero`);this.context=e.context,this.duration=e.duration,this.loop=e.loop??!1,this.requestFrame=e.requestFrame??(e=>requestAnimationFrame(e)),this.cancelFrame=e.cancelFrame??(e=>cancelAnimationFrame(e)),this.setPlaybackRate(e.playbackRate??1);for(let t of e.shots??[])this.addShot(t,!1);for(let t of e.cues??[])this.addCue(t,!1);this.reconcile(0,0,`init`,!0)}get currentTime(){return this.timeValue}get playbackRate(){return this.rateValue}get state(){return this.stateValue}get isPlaying(){return this.stateValue===`playing`}addTypedEventListener(e,t,n){let r=t;return this.addEventListener(e,r,n),()=>this.removeEventListener(e,r,n)}addShot(e,t=!0){if(cl(e,this.duration),this.shots.some(t=>t.id===e.id))throw Error(`Duplicate shot id: ${e.id}`);return this.shots.push(e),this.shots.sort((e,t)=>e.start-t.start||e.end-t.end||e.id.localeCompare(t.id)),t&&this.reconcile(this.timeValue,this.timeValue,`init`,!0),this}addCue(e,t=!0){if(cl(e,this.duration),this.cues.some(t=>t.id===e.id))throw Error(`Duplicate cue id: ${e.id}`);return this.cues.push({...e}),this.cues.sort((e,t)=>e.start-t.start||e.end-t.end||e.id.localeCompare(t.id)),t&&this.reconcile(this.timeValue,this.timeValue,`init`,!0),this}getShots(){return this.shots}getCues(){return this.cues}getActiveCues(e){return this.cues.filter(t=>this.activeCueIds.has(t.id)&&(!e||t.kind===e))}setPlaybackRate(e){if(!Number.isFinite(e)||e<=0||e>16)throw Error(`playbackRate must be greater than 0 and no more than 16`);return this.rateValue=e,this}play(){return this.stateValue===`playing`?this:(this.timeValue>=this.duration&&this.seek(0),this.stateValue=`playing`,this.lastFrameMs=void 0,this.emit(`statechange`,{state:this.stateValue}),this.frameHandle=this.requestFrame(this.onAnimationFrame),this)}pause(){return this.frameHandle!==void 0&&this.cancelFrame(this.frameHandle),this.frameHandle=void 0,this.lastFrameMs=void 0,this.stateValue!==`paused`&&(this.stateValue=`paused`,this.emit(`statechange`,{state:this.stateValue})),this}seek(e){sl(e,`seek time`);let t=Math.min(e,this.duration),n=this.timeValue;return this.timeValue=t,this.stateValue===`ended`&&t<this.duration&&(this.stateValue=`paused`),this.reconcile(n,t,`seek`,!0),this}step(e){if(!Number.isFinite(e))throw Error(`step seconds must be finite`);this.pause();let t=this.timeValue;return this.timeValue=Math.min(this.duration,Math.max(0,t+e)),this.reconcile(t,this.timeValue,`step`,!0),this}refresh(){return this.reconcile(this.timeValue,this.timeValue,`init`,!0),this}destroy(){this.pause();let e=this.makeFrame(this.timeValue,this.timeValue,`init`);for(let t of[...this.shots].reverse())this.activeShots.has(t.id)&&t.leave?.(this.shotFrame(t,e));this.activeShots.clear(),this.activeCueIds.clear()}onAnimationFrame=e=>{if(this.stateValue!==`playing`)return;let t=this.timeValue,n=this.lastFrameMs===void 0?0:Math.max(0,Math.min(.25,(e-this.lastFrameMs)/1e3));this.lastFrameMs=e;let r=t+n*this.rateValue;if(r>=this.duration)if(this.timeValue=this.duration,this.reconcile(t,this.duration,`play`),this.loop){let t=r%this.duration,n=this.timeValue;this.timeValue=t,this.reconcile(n,t,`seek`,!0),this.lastFrameMs=e}else{this.stateValue=`ended`,this.frameHandle=void 0,this.lastFrameMs=void 0,this.emit(`statechange`,{state:this.stateValue});return}else this.timeValue=r,this.reconcile(t,r,`play`);this.frameHandle=this.requestFrame(this.onAnimationFrame)};reconcile(e,t,n,r=!1){let i=this.makeFrame(e,t,n),a=new Set(this.shots.filter(e=>ll(e,t,this.duration)).map(e=>e.id));for(let e of[...this.shots].reverse())this.activeShots.has(e.id)&&!a.has(e.id)&&e.leave?.(this.shotFrame(e,i));for(let e of this.shots)!this.activeShots.has(e.id)&&a.has(e.id)&&e.enter?.(this.shotFrame(e,i));this.activeShots.clear();for(let e of a)this.activeShots.add(e);for(let o of this.shots)a.has(o.id)&&(r||t!==e||n===`play`)&&o.update?.(this.shotFrame(o,i));let o=new Set(this.cues.filter(e=>ll(e,t,this.duration)).map(e=>e.id)),s=!1;for(let e of this.cues)this.activeCueIds.has(e.id)&&!o.has(e.id)&&(s=!0,this.emit(`cueexit`,{cue:e,frame:i}));for(let r of this.cues)!this.activeCueIds.has(r.id)&&o.has(r.id)&&(s=!0,this.emit(`cueenter`,{cue:r,frame:i})),(t>e&&r.start>=e&&r.start<t||n===`seek`&&r.fireOnSeek&&o.has(r.id))&&this.emit(`cue`,{cue:r,frame:i});this.activeCueIds.clear();for(let e of o)this.activeCueIds.add(e);(s||r)&&this.emit(`activecueschange`,{cues:this.getActiveCues(),frame:i}),this.emit(`frame`,i)}makeFrame(e,t,n){return{context:this.context,time:t,previousTime:e,delta:t-e,duration:this.duration,reason:n}}shotFrame(e,t){return{...t,shot:e,localTime:Math.max(0,t.time-e.start),progress:al((t.time-e.start)/(e.end-e.start))}}emit(e,t){this.dispatchEvent(new ol(e,t))}},fl=class{options;detachFrame;resizeObserver;onWindowResize=()=>this.resize();constructor(e){this.options=e;let t=e.renderer.domElement;e.container.contains(t)||e.container.appendChild(t),this.detachFrame=e.player.addTypedEventListener(`frame`,()=>{e.renderer.render(e.scene,this.camera())}),e.autoResize!==!1&&(typeof ResizeObserver<`u`?(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e.container)):typeof window<`u`&&window.addEventListener(`resize`,this.onWindowResize)),this.resize(),e.player.refresh()}resize(){let e=typeof window>`u`?1:window.innerWidth,t=typeof window>`u`?1:window.innerHeight,n=Math.max(1,this.options.container.clientWidth||e||1),r=Math.max(1,this.options.container.clientHeight||t||1),i=Math.min(this.options.maxPixelRatio??2,typeof window>`u`?1:window.devicePixelRatio||1);this.options.renderer.setPixelRatio?.(i),this.options.renderer.setSize(n,r,!1);let a=this.camera();`aspect`in a&&(a.aspect=n/r),a.updateProjectionMatrix?.()}destroy(e=!1){this.detachFrame(),this.resizeObserver?.disconnect(),typeof window<`u`&&window.removeEventListener(`resize`,this.onWindowResize),e&&this.options.renderer.dispose?.()}camera(){return typeof this.options.camera==`function`?this.options.camera():this.options.camera}};function pl(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/60);return`${String(n).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}function ml(e){let t=e;return typeof t.speaker==`string`&&typeof t.text==`string`}function hl(e){let t=e.container??document.body,n=document.createElement(`div`);n.className=`ab-cinematic-ui${e.className?` ${e.className}`:``}`,n.innerHTML=`
    <style>
      .ab-cinematic-ui{position:absolute;inset:0;z-index:20;pointer-events:none;color:#fff;font-family:ui-sans-serif,system-ui,sans-serif}
      .ab-cinematic-subtitle{position:absolute;left:50%;bottom:76px;max-width:min(82vw,980px);transform:translateX(-50%);padding:.45em .8em;text-align:center;font-size:clamp(18px,2.1vw,30px);line-height:1.45;letter-spacing:.02em;text-wrap:balance;text-shadow:0 2px 4px #000,0 0 12px #000;white-space:pre-line}
      .ab-cinematic-transport{position:absolute;left:50%;bottom:18px;display:flex;width:min(92vw,980px);align-items:center;gap:10px;transform:translateX(-50%);padding:10px 12px;border:1px solid #ffffff24;border-radius:12px;background:#080b10b8;backdrop-filter:blur(12px);pointer-events:auto;opacity:.3;transition:opacity .18s ease}
      .ab-cinematic-transport:hover,.ab-cinematic-transport:focus-within{opacity:1}
      .ab-cinematic-transport button{min-width:38px;height:34px;border:0;border-radius:8px;background:#ffffff18;color:inherit;cursor:pointer}
      .ab-cinematic-transport input[type=range]{min-width:0;flex:1;accent-color:#e2bd76}
      .ab-cinematic-time{min-width:92px;font-variant-numeric:tabular-nums;font-size:13px;text-align:center}
      .ab-cinematic-volume{max-width:88px}
      @media (prefers-reduced-motion:reduce){.ab-cinematic-transport{transition:none}}
    </style>
    <div class="ab-cinematic-subtitle" aria-live="polite"></div>
    <div class="ab-cinematic-transport">
      <button type="button" data-action="play" aria-label="播放">▶</button>
      <input data-action="seek" type="range" min="0" max="${e.player.duration}" step="0.01" value="0" aria-label="时间轴">
      <span class="ab-cinematic-time">00:00 / ${pl(e.player.duration)}</span>
      <input class="ab-cinematic-volume" data-action="volume" type="range" min="0" max="1" step="0.01" value="0.8" aria-label="音量">
      ${e.showFullscreen===!1?``:`<button type="button" data-action="fullscreen" aria-label="全屏">⛶</button>`}
    </div>`,t.appendChild(n);let r=n.querySelector(`[data-action="play"]`),i=n.querySelector(`[data-action="seek"]`),a=n.querySelector(`[data-action="volume"]`),o=n.querySelector(`[data-action="fullscreen"]`),s=n.querySelector(`.ab-cinematic-time`),c=n.querySelector(`.ab-cinematic-subtitle`),l=async()=>{await e.audio?.unlock(),e.player.isPlaying?e.player.pause():e.player.play()},u=()=>{e.player.seek(Number(i.value))},d=()=>{e.audio?.setMasterGain(Number(a.value))},f=()=>void t.requestFullscreen?.();r.addEventListener(`click`,l),i.addEventListener(`input`,u),a.addEventListener(`input`,d),o?.addEventListener(`click`,f);let p=[e.player.addTypedEventListener(`frame`,t=>{i.value=String(t.detail.time),s.textContent=`${pl(t.detail.time)} / ${pl(e.player.duration)}`}),e.player.addTypedEventListener(`statechange`,e=>{r.textContent=e.detail.state===`playing`?`Ⅱ`:`▶`,r.setAttribute(`aria-label`,e.detail.state===`playing`?`暂停`:`播放`)}),e.player.addTypedEventListener(`activecueschange`,e=>{c.textContent=e.detail.cues.filter(ml).map(e=>`【${e.speaker}】${e.text}`).join(`
`)})];return e.player.refresh(),{root:n,subtitle:c,destroy:()=>{for(let e of p)e();r.removeEventListener(`click`,l),i.removeEventListener(`input`,u),a.removeEventListener(`input`,d),o?.removeEventListener(`click`,f),n.remove()}}}function gl(){return{exposure:1,saturation:1,contrast:1,lift:new I(0,0,0),gain:new I(1,1,1),vignette:.35,grain:.035,fade:0,flash:0,flashColor:new I(1,.95,.85),scope:0,scopeRadius:.46,reticle:0,reticleOffset:new P(0,0),bloomStrength:.55,bloomRadius:.45,bloomThreshold:.82,toneExposure:1,blur:0}}function _l(){return{caption:``,captionOpacity:0,title:``,titleSub:``,titleOpacity:0,hud:{visible:0,lines:[],alert:``,alertOn:!1},scopeText:``,endCard:0}}function vl(e){let t=gl();Object.assign(e.grade,{...t,lift:e.grade.lift.copy(t.lift),gain:e.grade.gain.copy(t.gain),flashColor:e.grade.flashColor.copy(t.flashColor),reticleOffset:e.grade.reticleOffset.copy(t.reticleOffset)});let n=_l();e.overlay.caption=n.caption,e.overlay.captionOpacity=0,e.overlay.title=``,e.overlay.titleSub=``,e.overlay.titleOpacity=0,e.overlay.hud.visible=0,e.overlay.hud.lines=[],e.overlay.hud.alert=``,e.overlay.hud.alertOn=!1,e.overlay.scopeText=``,e.overlay.endCard=0}var yl=new Cn,bl=new F,xl=new F,Sl=new F;function B(e,t,n,r,i=new F(0,1,0),a=0,o=.05,s=6e4){e.position.copy(t),e.up.copy(i),e.lookAt(n),a!==0&&e.rotateZ(a),(e.fov!==r||e.near!==o||e.far!==s)&&(e.fov=r,e.near=o,e.far=s,e.updateProjectionMatrix()),e.updateMatrixWorld(!0)}function Cl(e,t,n){Sl.copy(t).normalize(),bl.copy(n).cross(Sl).normalize(),xl.copy(Sl).cross(bl).normalize(),yl.makeBasis(bl,xl,Sl),e.quaternion.setFromRotationMatrix(yl)}var wl=1.8/32,Tl=1.8,El={classic:4,slim:3};function Dl(e=`classic`){let t=El[e],n=4+t/2;return{head:{size:[8,8,8],pivot:[0,24,0],offset:[0,4,0],uv:[0,0],inflate:.5},torso:{size:[8,12,4],pivot:[0,12,0],offset:[0,6,0],uv:[16,16],inflate:.25},armR:{size:[t,12,4],pivot:[-5,22,0],offset:[-(n-5),-4,0],uv:[40,16],inflate:.25},armL:{size:[t,12,4],pivot:[5,22,0],offset:[n-5,-4,0],uv:[32,48],inflate:.25},legR:{size:[4,12,4],pivot:[-1.9,12,0],offset:[0,-6,0],uv:[0,16],inflate:.25},legL:{size:[4,12,4],pivot:[1.9,12,0],offset:[0,-6,0],uv:[16,48],inflate:.25}}}var Ol=[`head`,`torso`,`armR`,`armL`,`legR`,`legL`];function kl(e){let[t,n,r]=e.size,[i,a]=e.uv;return{top:{x:i+r,y:a,w:t,h:r},bottom:{x:i+r+t,y:a,w:t,h:r},right:{x:i,y:a+r,w:r,h:n},front:{x:i+r,y:a+r,w:t,h:n},left:{x:i+r+t,y:a+r,w:r,h:n},back:{x:i+r+t+r,y:a+r,w:t,h:n}}}function Al(e=`classic`){let t=Dl(e);return Object.fromEntries(Object.entries(t).map(([e,t])=>[e,kl(t)]))}var jl=[`front`,`back`,`left`,`right`,`top`,`bottom`];function Ml(e){return e===`all`?jl:Array.isArray(e)?e:[e]}function Nl(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Pl(e,t={}){let n=document.createElement(`canvas`);n.width=64,n.height=64;let i=n.getContext(`2d`,{willReadFrequently:!0});i.imageSmoothingEnabled=!1;let a=Al(t.arm??`classic`),o={ctx:i,fill(e,t,n){for(let r of Ml(t)){let t=a[e][r];i.fillStyle=n,i.fillRect(t.x,t.y,t.w,t.h)}return o},rect(e,t,n,r,s,c,l){let u=a[e][t];return i.fillStyle=l,i.fillRect(u.x+n,u.y+r,s,c),o},px(e,t,n,r,i){return o.rect(e,t,n,r,1,1,i)},erase(e,t,n,r,s,c){let l=a[e][t];return i.clearRect(l.x+n,l.y+r,s,c),o},grain(e,t,n,r=1){for(let o of Ml(t)){let t=a[e][o],s=Nl(r+t.x*131+t.y*977),c=i.getImageData(t.x,t.y,t.w,t.h);for(let e=0;e<c.data.length;e+=4){if(c.data[e+3]===0)continue;let t=1+(s()-.5)*2*n;c.data[e]=Math.max(0,Math.min(255,c.data[e]*t)),c.data[e+1]=Math.max(0,Math.min(255,c.data[e+1]*t)),c.data[e+2]=Math.max(0,Math.min(255,c.data[e+2]*t))}i.putImageData(c,t.x,t.y)}return o},clear(e,t=`all`){for(let n of Ml(t)){let t=a[e][n];i.clearRect(t.x,t.y,t.w,t.h)}return o}};(t.transparent??!1)||(i.fillStyle=`#ffffff`,i.fillRect(0,0,64,64)),e(o);let s=new Zi(n);s.magFilter=r,s.minFilter=r,s.generateMipmaps=!1,s.flipY=!1,s.colorSpace=Re;let c={canvas:n,texture:s,repaint(e){return i.clearRect(0,0,64,64),(t.transparent??!1)||(i.fillStyle=`#ffffff`,i.fillRect(0,0,64,64)),e(o),s.needsUpdate=!0,c}};return c}var Fl=[`left`,`right`,`top`,`bottom`,`front`,`back`];function Il(e,t,n){let r=kl(Dl(n)[t]),i=e.attributes.uv;Fl.forEach((e,t)=>{let n=r[e],a=n.x/64,o=(n.x+n.w)/64,s=n.y/64,c=(n.y+n.h)/64,l=t*4;i.setXY(l+0,a,s),i.setXY(l+1,o,s),i.setXY(l+2,a,c),i.setXY(l+3,o,c)}),i.needsUpdate=!0}function Ll(e){let t=e.arm??`classic`,n=Dl(t),r=e.castShadow??!0,i=new na({map:e.body,roughness:1,metalness:0}),a=new na({map:e.clothes??null,roughness:1,metalness:0,transparent:!0,alphaTest:.5}),o=new di;o.name=`block-figure`;let s=new di;s.name=`joint:hips`,s.position.set(0,n.torso.pivot[1],0),o.add(s);let c={hips:s},l={},u={},d=[],f={head:`neck`,torso:`hips`,armR:`armR`,armL:`armL`,legR:`legR`,legL:`legL`};for(let e of[`neck`,`armR`,`armL`,`legR`,`legL`]){let t=e===`neck`?n.head:n[e],r=new di;r.name=`joint:${e}`,r.position.set(t.pivot[0],t.pivot[1]-n.torso.pivot[1],t.pivot[2]),s.add(r),c[e]=r}for(let o of Ol){let s=n[o],p=c[f[o]],m=new R(...s.size);Il(m,o,t),d.push(m);let h=new L(m,i);h.name=`part:${o}`,h.position.set(...s.offset),h.castShadow=r,h.receiveShadow=r,p.add(h),l[o]=h;let g=new R(s.size[0]+s.inflate*2,s.size[1]+s.inflate*2,s.size[2]+s.inflate*2);Il(g,o,t),d.push(g);let _=new L(g,a);_.name=`clothes:${o}`,_.position.set(...s.offset),_.castShadow=r,_.visible=!!e.clothes,p.add(_),u[o]=_}let p={},m=[[`handR`,`armR`,[n.armR.offset[0],-9.5,0],Math.PI/2],[`handL`,`armL`,[n.armL.offset[0],-9.5,0],Math.PI/2],[`head`,`neck`,[0,8,0],0],[`back`,`hips`,[0,6,-2],0],[`hipR`,`hips`,[-4.5,2,0],0],[`hipL`,`hips`,[4.5,2,0],0]];for(let[e,t,n,r]of m){let i=new di;i.name=`anchor:${e}`,i.position.set(...n),i.rotation.x=r,c[t].add(i),p[e]=i}let h={root:o,joints:c,anchors:p,parts:l,clothing:u,arm:t,setBody(e){i.map=e,i.needsUpdate=!0},setClothes(e){a.map=e,a.needsUpdate=!0,h.showClothes(!!e)},setHeight(e){o.scale.setScalar(wl*e/Tl)},showClothes(e){for(let t of Ol)u[t].visible=e},dispose(){for(let e of d)e.dispose();i.dispose(),a.dispose()}};return h.setHeight(e.heightM??1.8),h}var Rl=[`hips`,`neck`,`armR`,`armL`,`legR`,`legL`];function zl(e,t){for(let n of Rl){let r=t[n];e.joints[n].rotation.set(...r??[0,0,0])}e.joints.hips.position.y=12+(t.lift??0)}function Bl(e,t,n){let r={};for(let i of Rl){let a=e[i]??[0,0,0],o=t[i]??[0,0,0];r[i]=[a[0]+(o[0]-a[0])*n,a[1]+(o[1]-a[1])*n,a[2]+(o[2]-a[2])*n]}return r.lift=(e.lift??0)+((t.lift??0)-(e.lift??0))*n,r}function Vl(e,t=1.4){let n=e*t*Math.PI*2,r=Math.sin(n);return{hips:[0,Math.sin(n)*.04,0],neck:[Math.abs(Math.cos(n))*-.03,0,0],armR:[r*.62,0,.06],armL:[-r*.62,0,-.06],legR:[-r*.58,0,0],legL:[r*.58,0,0],lift:Math.abs(Math.cos(n))*.35-.2}}function Hl(e){let t=Math.sin(e*.5);return{hips:[-.2+t*.06,Math.sin(e*.31)*.18,Math.cos(e*.43)*.05],neck:[.16+Math.sin(e*.6+1)*.08,Math.sin(e*.4)*.14,0],armR:[-.95+Math.sin(e*.7)*.18,0,.3+t*.08],armL:[-.62+Math.sin(e*.62+2)*.18,0,-.46-t*.08],legR:[-.55+Math.sin(e*.55)*.12,0,.12],legL:[-.26+Math.sin(e*.51+1.7)*.12,0,-.14],lift:t*.5}}var Ul=[{dir:[1,0,0],corners:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]]},{dir:[-1,0,0],corners:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]]},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},{dir:[0,0,1],corners:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]]},{dir:[0,0,-1],corners:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]]}];function Wl(e,t={}){let[n,r,i]=e.size,a=t.voxel??1,o=t.anchor??`center`,s=o===`center`?-n/2:0,c=o===`center`?-r/2:0,l=o===`center`?-i/2:0,u=Array(n*r*i),d=(e,t,r)=>(t*i+r)*n+e;for(let t=0;t<r;t++)for(let r=0;r<i;r++)for(let i=0;i<n;i++)u[d(i,t,r)]=e.at(i,t,r);let f=(e,t,a)=>e>=0&&t>=0&&a>=0&&e<n&&t<r&&a<i&&u[d(e,t,a)]!==null,p=[],m=[],h=[],g=[],_=new I;for(let e=0;e<r;e++)for(let t=0;t<i;t++)for(let r=0;r<n;r++){let n=u[d(r,e,t)];if(n!=null){_.setHex(n);for(let n of Ul){if(f(r+n.dir[0],e+n.dir[1],t+n.dir[2]))continue;let i=p.length/3;for(let[i,o,u]of n.corners)p.push((r+i+s)*a,(e+o+c)*a,(t+u+l)*a),m.push(n.dir[0],n.dir[1],n.dir[2]),h.push(_.r,_.g,_.b);g.push(i,i+1,i+2,i,i+2,i+3)}}}let v=new Nr;return v.setAttribute(`position`,new Tr(p,3)),v.setAttribute(`normal`,new Tr(m,3)),v.setAttribute(`color`,new Tr(h,3)),v.setIndex(g),v.computeBoundingSphere(),v}function Gl(e={}){return new na({vertexColors:!0,roughness:1,metalness:0,...e})}function Kl(e,t,n={}){let r=Math.ceil(e)*2,i=r/2;return Wl({size:[r,r,r],at(n,r,a){let o=n+.5-i,s=r+.5-i,c=a+.5-i,l=Math.sqrt(o*o+s*s+c*c);return l>e?null:typeof t==`function`?t(n,r,a,l/e):t}},n)}function ql(e){let{layers:t,palette:n,axis:r=`x`}=e;if(t.length===0)throw Error(`voxelModel needs at least one slice`);let i=t[0].length,a=t[0][0]?.length??0;for(let e of t){if(e.length!==i)throw Error(`every slice needs the same row count`);for(let t of e)if(t.length!==a)throw Error(`every row needs the same length`)}let o=(e,r,i)=>{let a=t[e][r][i],o=n[a];return o===void 0?null:o};return Wl({size:r===`x`?[t.length,i,a]:r===`z`?[a,i,t.length]:[a,t.length,i],at(e,t,n){return r===`x`?o(e,i-1-t,n):r===`z`?o(n,i-1-t,e):o(t,n,e)}},e)}var V=class{sx;sy;sz;cells;constructor(e,t,n){this.sx=e,this.sy=t,this.sz=n,this.cells=new Int32Array(e*t*n).fill(-1)}idx(e,t,n){return(t*this.sz+n)*this.sx+e}inside(e,t,n){return e>=0&&t>=0&&n>=0&&e<this.sx&&t<this.sy&&n<this.sz}set(e,t,n,r){return e=Math.floor(e),t=Math.floor(t),n=Math.floor(n),this.inside(e,t,n)&&(this.cells[this.idx(e,t,n)]=r===null?-1:r),this}get(e,t,n){if(!this.inside(e,t,n))return null;let r=this.cells[this.idx(e,t,n)];return r<0?null:r}box(e,t,n,r,i,a,o){let s=Math.max(0,Math.floor(Math.min(e,r))),c=Math.min(this.sx,Math.ceil(Math.max(e,r))),l=Math.max(0,Math.floor(Math.min(t,i))),u=Math.min(this.sy,Math.ceil(Math.max(t,i))),d=Math.max(0,Math.floor(Math.min(n,a))),f=Math.min(this.sz,Math.ceil(Math.max(n,a)));for(let e=l;e<u;e++)for(let t=d;t<f;t++)for(let n=s;n<c;n++){let r=typeof o==`function`?o(n,e,t):o;this.cells[this.idx(n,e,t)]=r===null?-1:r}return this}fill(e){for(let t=0;t<this.sy;t++)for(let n=0;n<this.sz;n++)for(let r=0;r<this.sx;r++){let i=e(r,t,n);i!==void 0&&(this.cells[this.idx(r,t,n)]=i===null?-1:i)}return this}paint(e){for(let t=0;t<this.cells.length;t++){let n=this.cells[t];if(n<0)continue;let r=t%this.sx,i=Math.floor(t/this.sx),a=i%this.sz,o=Math.floor(i/this.sz);this.cells[t]=e(r,o,a,n)}return this}geometry(e=1,t=`min`){return Wl({size:[this.sx,this.sy,this.sz],at:(e,t,n)=>this.get(e,t,n)},{voxel:e,anchor:t})}geometryWhere(e,t=1,n=`min`){return Wl({size:[this.sx,this.sy,this.sz],at:(t,n,r)=>{let i=this.get(t,n,r);return i!==null&&e(i)?i:null}},{voxel:t,anchor:n})}};function Jl(e,t=0){e.applyMatrix4(new Cn().makeScale(1,1,-1)),e.translate(0,0,t);let n=e.index;if(n){let e=n.array;for(let t=0;t<e.length;t+=3){let n=e[t+1];e[t+1]=e[t+2],e[t+2]=n}n.needsUpdate=!0}return e}function Yl(e,t){let n=Math.min(255,Math.max(0,Math.round((e>>16&255)*t))),r=Math.min(255,Math.max(0,Math.round((e>>8&255)*t))),i=Math.min(255,Math.max(0,Math.round((e&255)*t)));return n<<16|r<<8|i}function Xl(e,t,n){return Yl(e,1+(n-.5)*2*t)}function Zl(e,t={},n={}){let r=new L(e,Gl(t));return r.castShadow=n.cast??!1,r.receiveShadow=n.receive??!1,r}function Ql(e,t=1,n={}){let r=new vr({vertexColors:!0,toneMapped:!0,...n});return r.color.setScalar(t),new L(e,r)}function $l(e,t,n,r,i=1){let a=new vr({color:r});return a.color.multiplyScalar(i),new L(new R(e,t,n),a)}function eu(e,t,n,r,i=.35){let a=Math.ceil(t*1.4)*2+2,o=a/2,s=new V(a,a,a),c=1+e*13%7/20,l=.82+e*7%5/25;return s.fill((n,a,s)=>{let u=(n+.5-o)/c,d=(a+.5-o)/l,f=s+.5-o,p=Math.sqrt(u*u+d*d+f*f),m=Math.max(1e-6,p),h=u/m,g=d/m,_=f/m,v=t*(1+(Math.sin(h*3.1+e)*Math.cos(g*2.7+e*1.3)*.5+Math.sin(_*4.3+e*.7)*.3+(tu(e,Math.round(h*4),Math.round(g*4),Math.round(_*4))-.5)*.6)*i*.5);return p>v?null:r(n,a,s,p/v)}),s.geometry(n,`center`)}function tu(e,t,n,r){let i=Math.sin(e*91.7+t*127.1+n*311.7+r*74.7)*43758.5453123;return i-Math.floor(i)}var nu={uScale:{value:600}},ru=`
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uScale / max(0.0001, -mv.z), 1.0, 512.0);
    #include <logdepthbuf_vertex>
  }
`,iu=`
  uniform float uSoft;
  varying vec3 vColor;
  varying float vAlpha;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec2 q = abs(gl_PointCoord - 0.5) * 2.0;
    float a = vAlpha;
    if (uSoft > 0.5) {
      // Square-ish soft puff: keeps the block silhouette but loses the hard edge.
      float d = max(q.x, q.y);
      a *= 1.0 - smoothstep(0.35, 1.0, d);
    }
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor * (uSoft > 0.5 ? 1.0 : 1.0), a);
  }
`,au=class{points;count;geometry;pos;col;size;alpha;state={p:new F,c:new I,size:1,alpha:1};constructor(e,t={}){this.count=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.geometry=new Nr,this.geometry.setAttribute(`position`,new Sr(this.pos,3)),this.geometry.setAttribute(`aColor`,new Sr(this.col,3)),this.geometry.setAttribute(`aSize`,new Sr(this.size,1)),this.geometry.setAttribute(`aAlpha`,new Sr(this.alpha,1));let n=new ei({uniforms:{uScale:nu.uScale,uSoft:{value:+!!t.soft}},vertexShader:ru,fragmentShader:iu,transparent:!0,depthWrite:t.depthWrite??!1,depthTest:t.depthTest??!0,blending:t.additive?2:1});n.userData.preview={kind:`points`,additive:!!t.additive,soft:!!t.soft},this.points=new Yi(this.geometry,n),this.points.frustumCulled=!1,this.points.renderOrder=t.renderOrder??5}update(e){let t=this.state;for(let n=0;n<this.count;n++){if(t.size=1,t.alpha=1,!e(n,t)||t.alpha<=.001){this.alpha[n]=0,this.size[n]=0,this.pos[n*3]=0,this.pos[n*3+1]=-1e5,this.pos[n*3+2]=0;continue}this.pos[n*3]=t.p.x,this.pos[n*3+1]=t.p.y,this.pos[n*3+2]=t.p.z,this.col[n*3]=t.c.r,this.col[n*3+1]=t.c.g,this.col[n*3+2]=t.c.b,this.size[n]=t.size,this.alpha[n]=t.alpha}this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.aColor.needsUpdate=!0,this.geometry.attributes.aSize.needsUpdate=!0,this.geometry.attributes.aAlpha.needsUpdate=!0}hide(){this.update(()=>!1)}};function ou(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function su(e=64,t=2.2,n=0){let r=ou(e,e),i=r.getContext(`2d`),a=i.getImageData(0,0,e,e);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let o=(i+.5)/e*2-1,s=(r+.5)/e*2-1,c=Math.sqrt(o*o+s*s),l=Math.max(Math.abs(o),Math.abs(s)),u=c*(1-n)+l*n,d=Math.max(0,1-u)**+t,f=(r*e+i)*4;a.data[f]=255,a.data[f+1]=255,a.data[f+2]=255,a.data[f+3]=Math.round(d*255)}i.putImageData(a,0,0);let o=new Zi(r);return o.colorSpace=Re,o}function cu(e,t,n=1,r){let i=new Pi(new bi({map:r??uu(),color:new I(e).multiplyScalar(n),blending:2,transparent:!0,depthWrite:!1}));return i.scale.setScalar(t),i}var lu=null;function uu(){return lu||=su(64,2.4),lu}var du=(e,t=0,n=1)=>e<t?t:e>n?n:e,fu=(e,t,n)=>e+(t-e)*n,H=e=>{let t=du(e);return t*t*(3-2*t)},pu=e=>{let t=du(e);return t*t*t*(t*(t*6-15)+10)},mu=e=>{let t=du(e);return t<.5?4*t*t*t:1-(-2*t+2)**3/2},U=(e,t,n)=>du((e-t)/(n-t));function hu(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function gu(e){let t=Math.sin(e*127.1+311.7)*43758.5453123;return t-Math.floor(t)}function _u(e,t=0,n=0){let r=e*374761393+t*668265263+n*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}function vu(e){return e*e*e*(e*(e*6-15)+10)}function yu(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=Math.floor(n),o=vu(e-r),s=vu(t-i),c=vu(n-a),l=(e,t,n)=>_u(r+e,i+t,a+n),u=fu(l(0,0,0),l(1,0,0),o),d=fu(l(0,1,0),l(1,1,0),o),f=fu(l(0,0,1),l(1,0,1),o),p=fu(l(0,1,1),l(1,1,1),o);return fu(fu(u,d,s),fu(f,p,s),c)}function bu(e,t,n,r=4){let i=0,a=.5,o=0,s=1;for(let c=0;c<r;c++)i+=yu(e*s,t*s,n*s)*a,o+=a,a*=.5,s*=2.03;return i/o}function xu(e,t=0){return Math.sin(e*1.31+t*3.1)*.5+Math.sin(e*2.17+t*1.7)*.3+Math.sin(e*4.73+t*5.3)*.2}function Su(e,t){if(t<=e[0][0])return[e[0],e[0],0];let n=e[e.length-1];if(t>=n[0])return[n,n,0];for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];if(t>=r[0]&&t<i[0])return[r,i,(i[2]??H)((t-r[0])/(i[0]-r[0]))]}return[n,n,0]}function Cu(e,t){let[n,r,i]=Su(e,t);return fu(n[1],r[1],i)}function wu(e,t,n=new F){let[r,i,a]=Su(e,t);return n.set(fu(r[1][0],i[1][0],a),fu(r[1][1],i[1][1],a),fu(r[1][2],i[1][2],a))}function Tu(e,t){let[n,r,i]=Su(e,t);return Bl(n[1],r[1],i)}function Eu(e,t){let n={};for(let r of[`hips`,`neck`,`armR`,`armL`,`legR`,`legL`]){let i=e[r]??[0,0,0],a=t[r];n[r]=a?[i[0]+a[0],i[1]+a[1],i[2]+a[2]]:[i[0],i[1],i[2]]}return n.lift=(e.lift??0)+(t.lift??0),n}function Du(e,t){let n={};for(let r of[`hips`,`neck`,`armR`,`armL`,`legR`,`legL`]){let i=e[r];i&&(n[r]=[i[0]*t,i[1]*t,i[2]*t])}return e.lift!==void 0&&(n.lift=e.lift*t),n}function Ou(e,t,n=new F){let r=e.length-1,i=du(t)*r,a=Math.min(r-1,Math.floor(i)),o=i-a,s=e[Math.max(0,a-1)],c=e[a],l=e[a+1],u=e[Math.min(r,a+2)],d=o*o,f=d*o;for(let e of[`x`,`y`,`z`])n[e]=.5*(2*c[e]+(-s[e]+l[e])*o+(2*s[e]-5*c[e]+4*l[e]-u[e])*d+(-s[e]+3*c[e]-3*l[e]+u[e])*f);return n}function ku(e,t){let n=t.hair,r=t.skin;t.hairStyle===`bald`?e.fill(`head`,`top`,r):t.hairStyle===`receding`?(e.fill(`head`,`top`,n),e.rect(`head`,`top`,2,4,4,4,r)):e.fill(`head`,`top`,n),e.fill(`head`,`back`,r);let i=t.hairStyle===`long`?8:t.hairStyle===`bob`?7:t.hairStyle===`bald`?0:6;t.hairStyle===`bald`?e.rect(`head`,`back`,0,1,8,4,n):e.rect(`head`,`back`,0,0,8,i,n);for(let i of[`left`,`right`]){e.fill(`head`,i,r);let a=t.hairStyle===`long`?8:t.hairStyle===`bob`?6:t.hairStyle===`crew`?2:3;if(t.hairStyle===`bald`?e.rect(`head`,i,0,2,8,2,n):e.rect(`head`,i,0,0,8,a,n),t.hairStyle!==`long`&&t.hairStyle!==`bob`){let a=i===`left`?0:7;e.rect(`head`,i,a,0,1,4,t.hairStyle===`bald`?r:n)}e.rect(`head`,i,3,3,2,2,t.shadow)}e.fill(`head`,`bottom`,t.shadow),e.grain(`head`,[`top`,`back`,`left`,`right`],.06,7)}function Au(e,t,n){let r=t.skin,i=t.shadow;switch(e.fill(`head`,`front`,r),t.hairStyle){case`crew`:e.rect(`head`,`front`,0,0,8,1,t.hair),e.px(`head`,`front`,0,1,t.hair).px(`head`,`front`,7,1,t.hair);break;case`short`:e.rect(`head`,`front`,0,0,8,1,t.hair),e.rect(`head`,`front`,0,1,2,1,t.hair).px(`head`,`front`,7,1,t.hair);break;case`parted`:e.rect(`head`,`front`,0,0,8,1,t.hair),e.rect(`head`,`front`,4,1,4,1,t.hair).px(`head`,`front`,0,1,t.hair);break;case`long`:case`bob`:e.rect(`head`,`front`,0,0,8,1,t.hair),e.rect(`head`,`front`,0,1,3,1,t.hair).rect(`head`,`front`,6,1,2,1,t.hair),e.rect(`head`,`front`,0,2,1,6,t.hair).rect(`head`,`front`,7,2,1,6,t.hair);break;case`receding`:e.px(`head`,`front`,0,0,t.hair).px(`head`,`front`,7,0,t.hair),e.px(`head`,`front`,0,1,t.hair).px(`head`,`front`,7,1,t.hair)}t.wrinkle&&e.rect(`head`,`front`,2,1,4,1,t.wrinkle);let a=n===`scream`||n===`pain`||n===`awkward`?1:2;t.browStyle;let o=(n,r)=>e.px(`head`,`front`,n,r,t.brow);n===`grim`||n===`squint`?(o(1,2),o(2,2),o(5,2),o(6,2),e.px(`head`,`front`,2,3,t.brow).px(`head`,`front`,5,3,t.brow)):n===`scream`||n===`pain`?(o(1,2),o(2,a),o(5,a),o(6,2)):n===`awkward`?(o(1,2),o(2,2),o(5,1),o(6,1)):(o(1,2),o(2,2),o(5,2),o(6,2));let s=(t.gaze??`in`)===`in`,c=(t,n)=>e.px(`head`,`front`,t,3,n);switch(n){case`blink`:case`dead`:e.rect(`head`,`front`,1,3,2,1,i).rect(`head`,`front`,5,3,2,1,i),n===`dead`&&e.px(`head`,`front`,2,3,t.pupil).px(`head`,`front`,5,3,t.pupil);break;case`laugh`:e.rect(`head`,`front`,1,3,2,1,t.pupil).rect(`head`,`front`,5,3,2,1,t.pupil),e.px(`head`,`front`,1,4,i).px(`head`,`front`,6,4,i);break;case`squint`:c(1,i),c(6,i),e.px(`head`,`front`,2,3,t.pupil).px(`head`,`front`,5,3,t.pupil);break;case`scream`:e.rect(`head`,`front`,1,3,2,1,t.white).rect(`head`,`front`,5,3,2,1,t.white),e.px(`head`,`front`,s?2:1,3,t.pupil).px(`head`,`front`,s?5:6,3,t.pupil);break;default:s?(c(1,t.white),c(6,t.white),e.px(`head`,`front`,2,3,t.pupil).px(`head`,`front`,5,3,t.pupil)):(c(2,t.white),c(5,t.white),e.px(`head`,`front`,1,3,t.pupil).px(`head`,`front`,6,3,t.pupil))}if(t.glasses){let r=t.glasses;e.px(`head`,`front`,0,3,r).px(`head`,`front`,3,3,r).px(`head`,`front`,4,3,r).px(`head`,`front`,7,3,r),t.lens&&n!==`blink`&&n!==`laugh`&&n!==`dead`&&e.px(`head`,`front`,s?1:2,3,t.lens).px(`head`,`front`,s?6:5,3,t.lens)}e.rect(`head`,`front`,3,4,2,1,i),t.cheek&&e.px(`head`,`front`,1,5,t.cheek).px(`head`,`front`,6,5,t.cheek),t.stubble&&e.rect(`head`,`front`,1,6,6,2,t.stubble).px(`head`,`front`,0,7,t.stubble).px(`head`,`front`,7,7,t.stubble);let l=t.mouth,u=t.lip??l;switch(n){case`talk`:e.rect(`head`,`front`,3,6,2,1,l).rect(`head`,`front`,3,7,2,1,u);break;case`smileTalk`:e.px(`head`,`front`,2,5,l).px(`head`,`front`,5,5,l),e.rect(`head`,`front`,3,6,2,1,l).rect(`head`,`front`,3,7,2,1,u);break;case`smile`:e.px(`head`,`front`,2,5,l).px(`head`,`front`,5,5,l),e.rect(`head`,`front`,3,6,2,1,l);break;case`laugh`:e.px(`head`,`front`,1,5,l).px(`head`,`front`,6,5,l),e.rect(`head`,`front`,2,6,4,1,l).rect(`head`,`front`,3,7,2,1,u);break;case`scream`:e.rect(`head`,`front`,2,5,4,1,l).rect(`head`,`front`,2,6,4,2,u),e.rect(`head`,`front`,3,6,2,1,l);break;case`pain`:e.rect(`head`,`front`,2,6,4,1,`#e8e4da`).rect(`head`,`front`,2,7,4,1,l);break;case`awkward`:e.rect(`head`,`front`,3,6,3,1,l).px(`head`,`front`,6,5,l);break;case`grim`:e.rect(`head`,`front`,2,6,4,1,l);break;case`dead`:e.rect(`head`,`front`,3,6,2,2,l);break;default:e.rect(`head`,`front`,2,6,4,1,l),e.px(`head`,`front`,2,6,i).px(`head`,`front`,5,6,i)}e.px(`head`,`front`,0,7,i).px(`head`,`front`,7,7,i)}function ju(e,t,n){ku(e,t),Au(e,t,n);for(let n of[`armR`,`armL`])e.fill(n,`all`,t.skin),e.fill(n,`bottom`,t.shadow);e.fill(`torso`,`all`,`#d8d4cc`);for(let t of[`legR`,`legL`])e.fill(t,`all`,`#55565a`)}var Mu=[`armR`,`armL`],Nu=[`legR`,`legL`];function Pu(e,t,n,r=2){for(let i of Mu){e.fill(i,`all`,t),e.clear(i,`bottom`);for(let t of[`front`,`back`,`left`,`right`])e.erase(i,t,0,12-r,4,r),n&&e.rect(i,t,0,12-r-1,4,1,n)}}function Fu(e,t,n,r){for(let i of Nu){e.fill(i,`all`,t);for(let t of[`front`,`back`,`left`,`right`])e.rect(i,t,0,10,4,2,n);if(e.fill(i,`bottom`,r??n),r)for(let t of[`front`,`back`,`left`,`right`])e.rect(i,t,0,11,4,1,r)}}var Iu=e=>{let t=`#1f2636`,n=`#161b27`;e.fill(`torso`,`all`,t),e.rect(`torso`,`front`,3,0,2,2,`#e9e6df`),e.px(`torso`,`front`,3,2,`#e9e6df`),e.rect(`torso`,`front`,2,0,1,3,n).rect(`torso`,`front`,5,0,1,3,n),e.rect(`torso`,`front`,4,2,1,10,n),e.px(`torso`,`front`,3,5,`#3a4256`).px(`torso`,`front`,3,8,`#3a4256`),e.rect(`torso`,`front`,0,8,2,1,n).rect(`torso`,`front`,6,8,2,1,n),e.rect(`torso`,`top`,2,1,4,2,`#e9e6df`),Pu(e,t,n,2),Fu(e,`#24262b`,`#0e0e10`);for(let n of Nu)for(let r of[`front`,`back`,`left`,`right`])e.rect(n,r,0,0,4,4,t);e.rect(`legR`,`front`,3,0,1,4,n),e.rect(`legL`,`front`,0,0,1,4,n),e.grain(`torso`,`all`,.07,3);for(let t of Mu)e.grain(t,`all`,.07,4)},Lu=e=>{let t=`#3c4134`;e.fill(`torso`,`all`,t),e.rect(`torso`,`front`,2,0,4,1,`#2d3127`),e.rect(`torso`,`front`,0,11,8,1,`#2d3127`);for(let t=1;t<11;t+=2)e.rect(`torso`,`front`,0,t,8,1,`#41463a`);Pu(e,t,`#2d3127`,3),Fu(e,`#2a2b2e`,`#111112`),e.grain(`torso`,`all`,.1,11);for(let t of Mu)e.grain(t,`all`,.1,12)},Ru=e=>{let t=`#6d4a33`,n=`#563826`;e.fill(`torso`,`all`,t),e.rect(`torso`,`front`,3,0,2,3,`#b9c7cf`),e.px(`torso`,`front`,2,0,`#b9c7cf`).px(`torso`,`front`,5,0,`#b9c7cf`),e.rect(`torso`,`front`,4,3,1,9,n);for(let t of[4,6,8,10])e.px(`torso`,`front`,3,t,`#d8c9a3`);e.rect(`torso`,`front`,0,7,2,2,n).rect(`torso`,`front`,6,7,2,2,n),e.rect(`torso`,`top`,2,1,4,2,`#b9c7cf`),Pu(e,t,n,2),Fu(e,`#3a3b40`,`#1b1b1d`,`#e7e1d3`),e.grain(`torso`,`all`,.12,31);for(let t of Mu)e.grain(t,`all`,.12,32)};function zu(e){return t=>{let n=`#e6e6e1`,r=`#c3c7cc`,i=`#8e96a0`;t.fill(`torso`,`all`,n),t.rect(`torso`,`front`,2,3,4,3,`#4b525c`),t.px(`torso`,`front`,2,3,`#58d27a`).px(`torso`,`front`,3,3,`#e2b23c`).px(`torso`,`front`,5,4,`#d24a3a`),t.rect(`torso`,`front`,0,0,8,1,r),t.rect(`torso`,`front`,0,9,8,1,i),t.rect(`torso`,`front`,1,10,2,1,r).rect(`torso`,`front`,5,10,2,1,r),t.rect(`torso`,`back`,0,0,8,12,r),t.rect(`torso`,`left`,0,9,4,1,i).rect(`torso`,`right`,0,9,4,1,i),e.rank&&t.rect(`torso`,`front`,6,1,1,1,`#d8b44a`),t.grain(`torso`,`all`,.04,(e.seed??1)+40);for(let r of Mu){t.fill(r,`all`,n);for(let n of[`front`,`back`,`left`,`right`])t.rect(r,n,0,2,4,1,e.stripe),t.rect(r,n,0,5,4,1,i),t.rect(r,n,0,8,4,1,`#a9b0b9`),t.rect(r,n,0,9,4,3,`#dcdcd6`);t.fill(r,`bottom`,`#cfcfc9`),t.fill(r,`top`,n)}if(e.flag&&(t.rect(`armL`,`left`,1,0,2,2,`#c8302a`),t.px(`armL`,`left`,1,0,`#f1d34a`),t.rect(`armL`,`front`,1,0,2,1,`#c8302a`)),(e.gloveR??`glove`)===`thin`){let n=e.frost??0;for(let e of[`front`,`back`,`left`,`right`]){t.rect(`armR`,e,0,9,4,3,`#80848b`),t.rect(`armR`,e,0,8,4,1,`#c9ced6`);let r=Math.round(n*3);for(let i=0;i<r;i++)for(let r=0;r<4;r++)gu(r*7+i*13+e.length*3)<.35+n*.55&&t.px(`armR`,e,r,11-i,`#dfe9f2`)}t.fill(`armR`,`bottom`,n>.4?`#dfe9f2`:`#80848b`)}for(let e of Nu){t.fill(e,`all`,n);for(let n of[`front`,`back`,`left`,`right`])t.rect(e,n,0,4,4,1,i),t.rect(e,n,0,8,4,4,`#d2d3cf`),t.rect(e,n,0,11,4,1,`#5d636b`);t.fill(e,`bottom`,`#3d4248`)}t.rect(`legR`,`right`,0,1,4,3,r),t.rect(`legR`,`right`,0,1,4,1,i)}}var Bu=class{holder=new di;fig;face;bodies=new Map;wardrobe=new Map;painters;exprNow=null;outfitNow=null;arm;constructor(e){this.face=e.face,this.arm=e.arm??`classic`,this.painters=e.outfits;for(let t of e.exprs??[`neutral`,`blink`,`talk`])this.bodyFor(t);let t=e.outfit??Object.keys(e.outfits)[0];this.fig=Ll({body:this.bodyFor(`neutral`),clothes:this.clothesFor(t).texture,heightM:e.heightM??1.78,arm:this.arm}),this.exprNow=`neutral`,this.outfitNow=t,this.holder.add(this.fig.root)}bodyFor(e){let t=this.bodies.get(e);return t||(t=Pl(t=>ju(t,this.face,e),{arm:this.arm}).texture,this.bodies.set(e,t)),t}clothesFor(e){let t=this.wardrobe.get(e);if(!t){let n=this.painters[e];if(!n)throw Error(`unknown outfit ${e}`);t=Pl(n,{transparent:!0,arm:this.arm}),this.wardrobe.set(e,t)}return t}addOutfit(e,t){this.painters[e]=t}setExpr(e){e!==this.exprNow&&(this.exprNow=e,this.fig.setBody(this.bodyFor(e)))}setOutfit(e){e!==this.outfitNow&&(this.outfitNow=e,this.fig.setClothes(this.clothesFor(e).texture))}pose(e){zl(this.fig,e)}perform(e,t,n,r=0){let i=t;n&&(Math.sin(e*23+r)+Math.sin(e*14.3+r*2.1)*.8>.15?i=t===`smile`||t===`laugh`?`smileTalk`:`talk`:t===`laugh`&&(i=`smile`)),!n&&(i===`neutral`||i===`smile`||i===`grim`||i===`awkward`)&&Vu(e,r)&&(i=`blink`),this.setExpr(i)}};function Vu(e,t){let n=3.3+t%7*.31;return((e+t*1.37)%n+n)%n<.14}var Hu=null,Uu=null;function Wu(){if(Hu)return Hu;let e=new V(26,26,26);return e.fill((e,t,n)=>{if(e!==0&&t!==0&&n!==0&&e!==25&&t!==25&&n!==25&&!(e<=1||t<=1||n<=1||e>=24||t>=24||n>=24))return null;let r=e<=1||e>=24,i=t<=1||t>=24,a=n<=1||n>=24;if(r&&i||i&&a||r&&a){let r=Math.min(e,25-e),i=Math.min(t,25-t),a=Math.min(n,25-n);if(r+i+a<2)return null}return n>=24&&e>=3&&e<=22&&t>=4&&t<=19&&!((e<=3||e>=22)&&(t<=4||t>=19))?null:t<=2?5988712:t>=20&&t<=21?12962254:15198178}),Hu=e.geometry(.4,`center`),Hu}function Gu(){if(Uu)return Uu;let e=new V(18,22,8);return e.fill((e,t,n)=>(e<=1||e>=16)&&(t<=1||t>=20)&&n<=1?3882821:n===0&&e>=4&&e<=13&&t>=5&&t<=16?13619926:t===10||t===11?12172996:14869213),Uu=e.geometry(.5,`center`),Uu}var Ku=new I(`#d6a443`),qu=new I(`#f4f8ff`);function Ju(e,t){let n=e.fig.anchors.head,r=new L(Wu(),Gl({roughness:.55,metalness:.05}));r.position.set(0,-4,0),r.castShadow=!0,n.add(r);let i=new na({color:Ku.clone(),metalness:1,roughness:.18,transparent:!0,opacity:.94,envMapIntensity:1.6,depthWrite:!1}),a=new L(new R(8.2,6.2,.16),i);a.position.set(0,-4.5,4.95),a.renderOrder=6,n.add(a);let o=new vr({map:t??null,transparent:!0,opacity:0,depthWrite:!1}),s=new L(new ea(8.2,6.2),o);s.position.set(0,-4.5,5.06),s.renderOrder=7,s.visible=!1,n.add(s);let c=[];for(let e of[-1,1]){let t=new L(new R(.8,.8,.4),new vr({color:new I(`#fff3d6`).multiplyScalar(2.2)}));t.position.set(e*4.3,-.9,5.1),n.add(t),c.push(t)}let l=new L(Gu(),Gl({roughness:.6}));l.position.set(0,.4,-2),l.castShadow=!0,e.fig.anchors.back.add(l);let u={helmet:r,visor:a,visorMat:i,crack:s,crackMat:o,pack:l,nozzles:[new F(-4,-5,-2.2),new F(4,-5,-2.2),new F(-4,5,-2.2),new F(4,5,-2.2)],helmetLamp:c,setVisor(e){let t=Math.min(1,Math.max(0,e));i.color.copy(Ku).lerp(qu,t),i.metalness=1-t*.92,i.roughness=.18-t*.12,i.opacity=.94-t*.84,i.envMapIntensity=1.6-t*.9},setCrack(e){s.visible=e>.001,o.opacity=Math.min(1,e)}};return u.setVisor(0),u}function Yu(e){let t=ou(82,62),n=t.getContext(`2d`),i=n.getImageData(0,0,82,62),a=(e,t,n,r,a,o)=>{if(e<0||t<0||e>=82||t>=62)return;let s=(Math.floor(t)*82+Math.floor(e))*4;i.data[s]=n,i.data[s+1]=r,i.data[s+2]=a,i.data[s+3]=o};for(let t=0;t<62;t++)for(let n=0;n<82;n++){let r=gu(n*31+t*17+e);a(n,t,205+r*30,212+r*25,220+r*20,150+r*60)}let o=30+e%5*4;for(let t=0;t<14;t++){let n=o,r=28,i=t/14*Math.PI*2+gu(e+t)*.4,s=18+gu(t*3+e)*40;for(let o=0;o<s;o++)a(n,r,250,252,255,255),i+=(gu(t*91+o+e)-.5)*.35,n+=Math.cos(i),r+=Math.sin(i)}for(let t=0;t<260;t++){let n=gu(t*7+e)*Math.PI*2,r=gu(t*13+e)**1.8*30,i=o+Math.cos(n)*r*1.3,s=28+Math.sin(n)*r*.9+4,c=gu(t*5)<.2?2:1;for(let e=0;e<c;e++)for(let n=0;n<c;n++)a(i+n,s+e,120+gu(t)*40,8,12,255)}n.putImageData(i,0,0);let s=new Zi(t);return s.magFilter=r,s.minFilter=r,s.generateMipmaps=!1,s.colorSpace=Re,s}var Xu={skin:`#c79a74`,shadow:`#a77c5c`,hair:`#16130f`,hairStyle:`crew`,brow:`#1a1612`,pupil:`#141419`,white:`#d9d3ca`,mouth:`#6a3d33`,lip:`#4a2420`,stubble:`#b48d6c`},Zu={skin:`#d4a07c`,shadow:`#b58262`,hair:`#9a9792`,hairStyle:`receding`,brow:`#6d6a66`,browStyle:`thin`,pupil:`#2a2420`,white:`#e7e1d8`,mouth:`#7a3b33`,lip:`#5a2420`,glasses:`#3a2c22`,lens:`#c9d6dc`,cheek:`#d98e74`,wrinkle:`#c08d6c`},Qu=[`#c99c78`,`#d6a985`,`#bf8f6b`,`#e0b493`,`#b88763`,`#cfa07d`],$u=[`#a87e5f`,`#b88b6b`,`#a07254`,`#c39878`,`#986c4d`,`#ad8263`],ed=[`#17130f`,`#221a14`,`#2b2219`,`#3a2f25`,`#121010`];function td(e){let t=t=>Math.floor(gu(e*13.7+t*3.1)*1e3),n=t(1)%Qu.length,r=[`short`,`parted`,`crew`,`bob`,`short`,`long`,`parted`],i=r[t(2)%r.length],a=i===`bob`||i===`long`;return{skin:Qu[n],shadow:$u[n],hair:ed[t(3)%ed.length],hairStyle:i,brow:`#1d1814`,browStyle:a?`thin`:`thick`,pupil:`#161417`,white:`#e1dbd2`,mouth:a?`#9a4b4b`:`#73423a`,lip:`#4e2222`,glasses:t(4)%5==0?`#2a2a2e`:void 0,lens:`#cbd7df`,cheek:a?`#d9947f`:void 0}}var nd=[{skin:`#cf9f7d`,shadow:`#ae7f60`,hair:`#e6e4df`,hairStyle:`short`,brow:`#bdbab4`,pupil:`#211c18`,white:`#e5dfd6`,mouth:`#7a4038`,glasses:`#1c1c1f`,lens:`#cfd9df`,wrinkle:`#b9896a`},{skin:`#d6a684`,shadow:`#b78666`,hair:`#8f8c87`,hairStyle:`parted`,brow:`#5d5a56`,browStyle:`thin`,pupil:`#231d19`,white:`#e5dfd6`,mouth:`#7f3f37`,cheek:`#dc947a`,wrinkle:`#be8f6f`},{skin:`#c49371`,shadow:`#a27455`,hair:`#b5b2ad`,hairStyle:`bald`,brow:`#76736e`,pupil:`#1e1a17`,white:`#e2dcd3`,mouth:`#6e3a33`,glasses:`#7d6a4a`,lens:`#d3dde2`,wrinkle:`#a8795b`}],rd=[`...sssssssssss`,`..sssssssssssm`,`..sssssssssssm`,`..#############`,`..####...#.....`,`..####..#......`,`..####.##......`,`..gggg.........`,`..gggg.........`,`..gggg.........`,`..gggg.........`,`...ggg.........`].map(e=>e.padEnd(15,`.`).slice(0,15));function id(){let e=ql({palette:{s:3159099,"#":2369324,g:1776672,m:1118740},layers:[rd,rd,rd],axis:`x`,voxel:.27,anchor:`center`});return e.translate(0,1,1),e}var ad=new F(0,2.1,3.05),od=new F(0,3.1,.6),sd=[`......................`,`bb...............bbbbb`,`bbbbbbbbbbbbbbbbbbbbbb`,`bbbbbbbbbbbbbbbbbbbbbb`,`bbbbbbbbbbbbbbbbbbbbbb`,`bb...............bbbbb`,`........kkkk..........`],cd=[`......................`,`bb...............bbbbb`,`bbbbbbbbbbbbbbbbbbbbbb`,`bbbbbbbbttbbbbbbbbbbbb`,`bbbbbbbbbbbbbbbbbbbbbb`,`bb...............bbbbb`,`........kkkk..........`];function ld(){return ql({palette:{b:1447706,t:3816771,k:9146521},layers:[sd,cd,cd,sd],axis:`x`,voxel:.2,anchor:`center`})}function ud(){let e=new L(new R(.62,.62,.05),new na({color:3824250,metalness:.9,roughness:.08,emissive:660514}));return e.position.set(0,0,2.21),e}var dd=[`rr.`,`###`,`###`,`###`,`###`,`###`,`###`,`##.`,`bbb`];function fd(){return ql({palette:{r:3879984,"#":2500653,b:4869717},layers:[dd,dd],axis:`x`,voxel:.25,anchor:`center`})}function pd(){let e=new V(6,8,6);return e.box(0,0,0,6,6,6,14606297),e.box(0,6,0,6,8,6,11120825),e.box(1,6,1,5,8,5,null),e.box(5,2,2,6,5,4,13685195),e.paint((e,t,n,r)=>(e+t+n)%5==0&&t<6?13816781:r),e.geometry(.75,`center`)}function md(){let e=new V(8,6,8);return e.box(0,0,0,8,5,5,2895669),e.box(2,1,5,6,4,8,1710878),e.box(3,2,7,5,3,8,5995674),e.box(6,5,1,8,6,3,9146521),e.geometry(.55,`center`)}function hd(){let e=new V(6,4,3);return e.box(0,0,0,6,4,3,4014923),e.box(1,1,2,5,3,3,2764339),e.set(4,2,2,3133546),e.geometry(.035,`center`)}function gd(){let e=new V(5,5,7);return e.fill((e,t,n)=>{let r=e-2,i=t-2;return r*r+i*i>5?null:n===6||n===0?12830668:(e*7+t*13+n*5)%9==0?5132887:9080725}),e.geometry(.0015,`center`)}function _d(e={}){return Gl({roughness:.6,metalness:.3,...e})}function vd(e,t={}){let n=new L(e,_d(t));return n.castShadow=!0,n}var yd={streak:[8.6,11.8],title:[9,14]},W={gateOpen:20.6,enter:22.6,lookUp:25.4,rise:26.6,pour:[31,33],cupRaise:[59,62.2],laugh:[63.8,66.9],toCase:[79.4,81.2],glassSlide:81.4,stoneOut:82,stonesDown:[87.6,88.4,89.2],phoneOut:93,pay:102},G={ring:106,answer:106.9,hangUp:115.4,lightOn:115.6,clamp:116.4,doorClose:117.6,start:118.2,cut:[119.4,127],counter:[121.8,124.4],drops:[124.6,127.2],sweep:[127.6,129],toolOut:129.4,lightOff:131},K={chain:132.6,pulls:[136.2,137,137.7,138.3,138.8,139.2,139.55,139.85],glue:140.4,tips:141,load:[141.9,142.4,142.9,143.4],insert:144.1,rack:144.7,shots:[145.8,146.35,146.9,147.45],tinnitus:[147.5,151.6],unwrap:[152.9,154.8],knife:[155,157.6],caseLatch:166.6,chainOff:167.4},q={cabin:168,locatorOff:169.2,locatorStrap:170.4,helmetOn:173.4,airlock:175,depress:[175.4,179.6],airlockGreen:179.8,outerOpen:[180.2,181.4],vista:181.6,arrivePuff:[182.4,183.4],sunTouch:207,scopeRaise:[210.6,212],lookSun:[218.4,221.6],sunHalf:219,green:223,doorOpen:[224,225.6],emerge:225.8,emergeStep:.16,emergeDur:4.6,sunTwoThirds:238,visorClear:244,scopeFaces:[250,255],gloveTwist:[255.4,256.2],gloveOff:256.6,turn:[258.6,261.2],gunOut:261.8,scopeGrab:262.4,scopeMount:263.2,aim:[264.4,266],fire:[268.4,271.2,274.6],fireStep:.135,magOut:[269.95,272.8],magIn:[270.55,273.4],impact:{T1:301,B1:301.25,T3:301.6,B2:302,T2:303.9},scream:[306.8,309],retreat:309.2,doorClose:[316.6,317.6],red:317.4,radioOff:317.8,gunStow:[318.6,319.4],gloveCatch:320,gloveOn:320.6,depart:[323,333],sunGone:315},bd={radioOn:334.8,pause:337.4,endTitle:[351.4,355.6]};function xd(){let e=[];for(let t=0;t<3;t++)for(let n=0;n<10;n++)e.push({t:q.fire[t]+n*q.fireStep,group:t,index:n});return e}function Sd(e){let t=[[150,-.9],[q.sunTouch,0],[q.sunHalf,.5],[q.sunTwoThirds,.66],[300,.86],[q.sunGone,1],[340,1.25]];if(e<=t[0][0])return t[0][1];for(let n=0;n<t.length-1;n++){let[r,i]=t[n],[a,o]=t[n+1];if(e<=a)return i+(e-r)/(a-r)*(o-i)}return t[t.length-1][1]}var Cd=[{id:`v01`,kind:`monologue`,speaker:`章北海（内心）`,text:`他有一个自己钟爱的小世界，外面怎么变，都能沉浸其中。`,delivery:`内心独白，低沉平静，带一点几乎察觉不到的暖意`,start:23,end:28.3},{id:`v02`,kind:`monologue`,speaker:`章北海（内心）`,text:`我们在为人类的生存而战，多数人仍守着原来的日子。这让我踏实。`,delivery:`内心独白，语速放慢，“踏实”二字轻轻落下`,start:28.6,end:34.4},{id:`v03`,kind:`dialogue`,speaker:`收藏者`,text:`您是军人吧。`,delivery:`热情的北京口音，一边端茶一边随口问，带笑`,start:34.8,end:36.5},{id:`v04`,kind:`dialogue`,speaker:`收藏者`,text:`现在的军人不太像军人了，可您，我一眼就看得出来。`,delivery:`得意于自己的眼力，语气轻快`,start:36.8,end:41.2},{id:`v05`,kind:`dialogue`,speaker:`章北海`,text:`您怎么迷上陨石的？`,delivery:`客气、简短，目光扫过四壁的玻璃柜`,start:41.5,end:43.2},{id:`v06`,kind:`dialogue`,speaker:`收藏者`,text:`十多年前跟考察队穿越南极，在雪底下找陨石，就此迷上了。`,delivery:`回忆往事，兴致勃勃`,start:43.4,end:48.2},{id:`v07`,kind:`dialogue`,speaker:`收藏者`,text:`它们来自尘世之外。每拿到一块，就像去了一个新的外星世界。`,delivery:`压低声音，近乎虔诚，“尘世之外”放慢`,start:48.4,end:53.4},{id:`v08`,kind:`dialogue`,speaker:`章北海`,text:`地球本身就是星际物质聚成的，也是一块大陨石。`,delivery:`微笑摇头，平实地讲道理`,start:53.7,end:57.7},{id:`v09`,kind:`dialogue`,speaker:`章北海`,text:`听说水是彗星带来的——这杯茶，也是陨石。`,delivery:`举起茶杯，半开玩笑`,start:57.9,end:61.6},{id:`v10`,kind:`dialogue`,speaker:`章北海`,text:`您这些东西，不稀罕。`,delivery:`嘴角一点笑意，像是认真又像是逗他`,start:61.8,end:63.5},{id:`v11`,kind:`dialogue`,speaker:`收藏者`,text:`呵呵呵……你很精明，已经开始砍价了。`,delivery:`大笑，用手指点着对方`,start:63.8,end:66.9},{id:`v12`,kind:`dialogue`,speaker:`收藏者`,text:`不过我还是信自个儿的感觉。说说看，您要什么样的？`,delivery:`笑意未散，转入正题`,start:67,end:71.4},{id:`v13`,kind:`dialogue`,speaker:`章北海`,text:`不用贵重。比重要大，受冲击不易碎，容易加工。`,delivery:`条理清楚，像在念一份技术要求`,start:71.6,end:75.6},{id:`v14`,kind:`dialogue`,speaker:`收藏者`,text:`要雕刻是吧？`,delivery:`恍然大悟的口气`,start:75.8,end:77.1},{id:`v15`,kind:`dialogue`,speaker:`章北海`,text:`算是吧。最好能上车床。`,delivery:`略一停顿，含糊带过`,start:77.3,end:79.2},{id:`v16`,kind:`dialogue`,speaker:`收藏者`,text:`那就是铁陨石了。`,delivery:`内行的笃定，起身`,start:79.4,end:81},{id:`v17`,kind:`dialogue`,speaker:`收藏者`,text:`铁镍为主，每立方厘米八克多，上车床没问题。`,delivery:`托着石头掂一掂，如数家珍`,start:82.6,end:86.4},{id:`v18`,kind:`dialogue`,speaker:`章北海`,text:`这么大的，要三块。`,delivery:`平静，没有商量的余地`,start:86.6,end:88.2},{id:`v19`,kind:`dialogue`,speaker:`收藏者`,text:`每块六万，三块十八万，怎么样？`,delivery:`试探着报价，留出还价的空间`,start:90,end:92.9},{id:`v20`,kind:`dialogue`,speaker:`章北海`,text:`给个账号，我现在就付。`,delivery:`毫不犹豫，掏出手机`,start:93.2,end:95.2},{id:`v21`,kind:`dialogue`,speaker:`收藏者`,text:`呵呵……其实，我是等着你还价的。`,delivery:`尴尬地笑，有点不好意思`,start:96.2,end:99.1},{id:`v22`,kind:`dialogue`,speaker:`章北海`,text:`不，就这个价。`,delivery:`很坚决地打断`,start:99.4,end:100.8},{id:`v23`,kind:`dialogue`,speaker:`章北海`,text:`就算表示我对要送的人的尊重吧。`,delivery:`声音放轻，几乎是自语；平静之下压着分量`,start:101,end:104},{id:`v24`,kind:`phone`,speaker:`常伟思（电话）`,text:`批了。一个月后，你带第一特遣队三十个人上太空。`,delivery:`电话里的声音，干脆，首长口吻，略带赞许`,start:107,end:111.3},{id:`v25`,kind:`dialogue`,speaker:`章北海`,text:`是。总不能让我们成了不能出海的舰队政委。`,delivery:`压低声音对着手机，空旷的车间里有轻微回响`,start:111.5,end:115.5},{id:`v26`,kind:`monologue`,speaker:`章北海（内心）`,text:`弹孔很小——发射时，没有碎。`,delivery:`内心独白，耳鸣未散，声音像隔着一层棉`,start:149.6,end:152.4},{id:`v27`,kind:`monologue`,speaker:`章北海（内心）`,text:`进了肉，就碎成了砂砾。看不出一点加工的痕迹。`,delivery:`内心独白，冷静的确认，像在核对数据`,start:158.8,end:163.6},{id:`v28`,kind:`chatter`,speaker:`货运调度（无线电）`,text:`七号货舱，电梯锚点，允许对接。`,delivery:`公共频道里的例行调度，失真、平淡，音量偏低`,start:183.2,end:186},{id:`v29`,kind:`chatter`,speaker:`过往行人（无线电）`,text:`收到，我从东侧绕过去。`,delivery:`一个路过的太空行人，随口回应，带呼吸声`,start:186.4,end:188.6},{id:`v30`,kind:`monologue`,speaker:`章北海（内心）`,text:`脚下没有大地，四周只有空间。`,delivery:`内心独白，极轻，与头盔内的呼吸声同节奏`,start:191.8,end:194.8},{id:`v31`,kind:`monologue`,speaker:`章北海（内心）`,text:`不依附于任何世界。没有从哪里来，也不想到哪里去，只是存在着。`,delivery:`内心独白，几乎是享受，句间留白`,start:195.2,end:201.2},{id:`v32`,kind:`monologue`,speaker:`章北海（内心）`,text:`父亲，您现在大概也是这种感觉吧。`,delivery:`内心独白，第一次露出柔软，尾音轻`,start:201.8,end:205.2},{id:`v33`,kind:`radio`,speaker:`摄影师（无线电）`,text:`各位领导往中间靠一靠，后排再往上一点……好！`,delivery:`公共频道，摄影师热情地指挥，背景有人轻笑`,start:231.5,end:235.8},{id:`v34`,kind:`radio`,speaker:`摄影师（无线电）`,text:`请把面罩调成透明——太阳要落了，抓紧！`,delivery:`公共频道，轻快地催促`,start:242.3,end:246},{id:`v35`,kind:`radio`,speaker:`老专家（无线电）`,text:`当年咱们做梦都不敢想，能到这儿来拍张合影。`,delivery:`前排正中的老人，感慨又欣慰，声音有点发颤；说完周围一片笑声`,start:246.4,end:250.6},{id:`v36`,kind:`monologue`,speaker:`章北海（内心）`,text:`无辜？`,delivery:`内心独白，一个自问，停顿很长`,start:279.2,end:280.8},{id:`v37`,kind:`monologue`,speaker:`章北海（内心）`,text:`他们也是无辜的。用微薄的投入，如履薄冰，开启了太空时代的黎明。`,delivery:`内心独白，带着敬意，平稳`,start:281.2,end:287.6},{id:`v38`,kind:`monologue`,speaker:`章北海（内心）`,text:`可正是那段经历，禁锢了他们的思想。`,delivery:`内心独白，转冷`,start:288.2,end:291.6},{id:`v39`,kind:`monologue`,speaker:`章北海（内心）`,text:`为了得到能在恒星际航行的飞船，必须消灭他们。`,delivery:`内心独白，斩钉截铁，没有起伏`,start:292,end:296},{id:`v40`,kind:`monologue`,speaker:`章北海（内心）`,text:`他们的死，也算是为人类太空事业做出的最后贡献。`,delivery:`内心独白，近乎悼词的郑重`,start:296.4,end:300.8},{id:`v41`,kind:`mouthed`,speaker:`合影者（口型）`,text:`陨石雨！`,delivery:`真空中无声——只读唇形。配音时不出声，或仅作极远、极闷的主观化处理`,start:306.8,end:309},{id:`v42`,kind:`radio`,speaker:`黄河站调度（无线电）`,text:`陨石雨！所有舱外人员立即返回！重复，立即返回！`,delivery:`公共频道，警报声中急促喊话，强压镇定`,start:309.4,end:313.4},{id:`v43`,kind:`radio`,speaker:`黄河站调度（无线电）`,text:`医疗组到二号气闸！有五人受伤！`,delivery:`公共频道，嘈杂，喊声发紧`,start:313.6,end:316.6},{id:`v44`,kind:`monologue`,speaker:`章北海（内心）`,text:`三个人的死，并不能保证无工质辐射推进成为主要的研究方向。`,delivery:`内心独白，冷而平静，像太空本身`,start:322.4,end:327.4},{id:`v45`,kind:`monologue`,speaker:`章北海（内心）`,text:`但我做了我能做的。`,delivery:`内心独白，短，落地`,start:327.7,end:329.5},{id:`v46`,kind:`monologue`,speaker:`章北海（内心）`,text:`不管以后发生什么，在父亲的目光里，我可以安心了。`,delivery:`内心独白，极轻，最后一句释然`,start:329.9,end:334.4},{id:`v47`,kind:`broadcast`,speaker:`新闻广播`,text:`昨天傍晚，黄河空间站外发生一起微陨石撞击事故。`,delivery:`中波收音机里的新闻播音，字正腔圆，略带电流声`,start:335.4,end:339.8},{id:`v48`,kind:`broadcast`,speaker:`新闻广播`,text:`正在舱外合影的三位航天资深专家不幸遇难，另有两人受伤。`,delivery:`新闻播音，语调沉重而克制`,start:340,end:345},{id:`v49`,kind:`dialogue`,speaker:`收藏者`,text:`天外来的东西啊……`,delivery:`放下放大镜，低声叹气，自言自语，带着惋惜与敬畏`,start:346.6,end:349}];function wd(e,t){let n=Cd.find(t=>t.id===e);return!!(n&&t>=n.start&&t<n.end)}function Td(e,t,n){for(let r of Cd)if(t>=r.start&&t<r.end&&r.speaker.startsWith(e)&&(!n||n.includes(r.kind)))return!0;return!1}var Ed=`
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize;
    #include <logdepthbuf_vertex>
  }
`,Dd=`
  uniform float uBright;
  varying vec3 vColor;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    gl_FragColor = vec4(vColor * uBright, 1.0);
  }
`;function Od(e=5200,t=4e3,n=7){let r=hu(n),i=[],a=[],o=[],s=new I,c=new F(.35,.42,-.84).normalize();for(let n=0;n<e;n++){let l=new F(r()*2-1,r()*2-1,r()*2-1);if(l.lengthSq()<1e-6||l.lengthSq()>1){n--;continue}l.normalize();let u=n>e*.55;if(u){let e=l.dot(c);l.addScaledVector(c,-e*(.86+r()*.12)).normalize()}l.multiplyScalar(t),i.push(l.x,l.y,l.z);let d=r(),f=u?.18+d*.35:d**6*2.4+.25,p=r();s.setRGB(p<.2?1:.82,p<.2?.86:.9,p<.2?.72:1).multiplyScalar(f),a.push(s.r,s.g,s.b),o.push(d>.985?3:d>.9?2:1.4)}let l=new Nr;l.setAttribute(`position`,new Tr(i,3)),l.setAttribute(`aColor`,new Tr(a,3)),l.setAttribute(`aSize`,new Tr(o,1));let u=new ei({uniforms:{uBright:{value:1}},vertexShader:Ed,fragmentShader:Dd,depthWrite:!1});u.userData.preview={kind:`stars`};let d=new Yi(l,u);return d.frustumCulled=!1,d.renderOrder=-10,d}var kd=`
  varying vec3 vColor;
  varying vec3 vN;
  varying vec3 vFaceN;
  varying vec3 vWorld;
  varying vec3 vLocal;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vColor = color;
    vLocal = position;
    vFaceN = normal;
    vec3 sphereN = normalize(position);
    vN = normalize(mat3(modelMatrix) * normalize(mix(normal, sphereN, 0.72)));
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
    #include <logdepthbuf_vertex>
  }
`,Ad=`
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunPower;
  uniform float uVoxel;
  uniform float uCity;
  uniform float uWrap;
  varying vec3 vColor;
  varying vec3 vN;
  varying vec3 vFaceN;
  varying vec3 vWorld;
  varying vec3 vLocal;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  float h3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  void main() {
    #include <logdepthbuf_fragment>
    vec3 N = normalize(vN);
    vec3 L = normalize(uSunDir);
    vec3 V = normalize(cameraPosition - vWorld);
    float ndl = dot(N, L);
    float ocean = step(vColor.r + 0.04, vColor.b) * step(vColor.g + 0.0, vColor.b + 0.03);
    float ice = step(0.7, min(vColor.r, min(vColor.g, vColor.b)));
    float land = clamp(1.0 - ocean - ice, 0.0, 1.0);
    // Wrapped light gives the backlit crescent some body.
    float wrapped = clamp((ndl + uWrap) / (1.0 + uWrap), 0.0, 1.0);
    float day = smoothstep(0.0, 0.5, wrapped);
    float term = smoothstep(0.0, 0.12, wrapped) * (1.0 - smoothstep(0.12, 0.34, wrapped));
    vec3 warm = mix(vec3(1.0, 0.42, 0.16), vec3(1.0, 0.95, 0.9), smoothstep(0.08, 0.42, wrapped));
    vec3 lit = vColor * wrapped * 1.35 * warm * uSunColor;
    lit += vec3(0.55, 0.16, 0.10) * term * 0.35 * (0.6 + ocean);
    // the sea as a mirror: hot glint near the terminator
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 26.0) * ocean;
    lit += spec * mix(vec3(1.0, 0.45, 0.18), vec3(1.0, 0.85, 0.65), day) * 2.2;
    // night side
    float night = 1.0 - smoothstep(-0.02, 0.22, wrapped);
    vec3 cell = floor(vLocal / uVoxel - vFaceN * 0.5);
    float hh = h3(cell);
    float city = land * step(0.84, hh) * night * uCity;
    vec3 col = lit * uSunPower + vColor * vec3(0.010, 0.014, 0.024) + city * vec3(1.0, 0.68, 0.32) * (0.5 + hh * 0.9);
    gl_FragColor = vec4(col, 1.0);
  }
`,jd=`
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunPower;
  uniform float uWrap;
  varying vec3 vColor;
  varying vec3 vN;
  varying vec3 vFaceN;
  varying vec3 vWorld;
  varying vec3 vLocal;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec3 N = normalize(vN);
    float ndl = dot(N, normalize(uSunDir));
    float wrapped = clamp((ndl + uWrap) / (1.0 + uWrap), 0.0, 1.0);
    float term = smoothstep(0.0, 0.2, wrapped) * (1.0 - smoothstep(0.25, 0.7, wrapped));
    vec3 pink = vec3(1.0, 0.55, 0.62);
    vec3 col = vColor * wrapped * 1.4 * uSunColor;
    col = mix(col, col * pink * 1.6 + pink * 0.12, term);
    col = col * uSunPower + vec3(0.012, 0.014, 0.02);
    gl_FragColor = vec4(col, 1.0);
  }
`,Md=`
  varying vec3 vN;
  varying vec3 vWorld;
  #include <common>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vN = normalize(mat3(modelMatrix) * normalize(position));
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
    #include <logdepthbuf_vertex>
  }
`,Nd=`
  uniform vec3 uSunDir;
  uniform float uSunPower;
  uniform float uRing;
  uniform vec3 uSunColor;
  varying vec3 vN;
  varying vec3 vWorld;
  #include <common>
  #include <logdepthbuf_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec3 V = normalize(cameraPosition - vWorld);
    float rim = 1.0 - abs(dot(normalize(vN), V));
    float glow = pow(rim, 5.0);
    vec3 L = normalize(uSunDir);
    float fwd = pow(max(dot(-V, L), 0.0), 12.0);
    float side = max(dot(normalize(vN), L), 0.0);
    vec3 blue = vec3(0.18, 0.42, 1.0);
    vec3 fire = mix(vec3(1.0, 0.36, 0.12), vec3(1.0, 0.78, 0.5), fwd);
    float sunlit = smoothstep(-0.35, 0.35, dot(normalize(vN), L));
    vec3 col = blue * glow * (0.12 + sunlit * 0.55) * uSunPower;
    col += fire * glow * (fwd * 3.0 * uRing + side * 0.35) * uSunPower;
    gl_FragColor = vec4(col, 1.0);
  }
`;function Pd(e){let t=Math.asin(Math.max(-1,Math.min(1,e.x))),n=Math.abs(t),r=bu(e.x*1.9+11.3,e.y*1.9+4.2,e.z*1.9-7.7,5),i=(t,n,r,i,a)=>{let o=Math.hypot(e.x-t,e.y-n,e.z-r);return Math.max(0,1-o/i)*a};r+=i(.45,.62,-.55,.7,.32),r+=i(-.35,.82,-.2,.32,.22),r+=i(-.05,.95,.15,.18,.18),r-=i(0,.7,.68,.75,.3);let a=.6;if(n>1.18)return 15331058;if(r>a){let t=(r-a)*6;return n>1?14213348:Math.abs(n-.42)<.16&&yu(e.x*5,e.y*5,e.z*5)>.45?t>.4?11569754:12886122:t>.5?6122046:t>.25?5007926:4156218}let o=a-r;return o<.025?3111590:o<.07?1923726:1195892}function Fd(e){let t=e/56,n=new F,r=Kl(56,(e,t,r,i)=>i<.9?728890:(n.set(e+.5-56,t+.5-56,r+.5-56).normalize(),Pd(n)),{voxel:t}),i={uSunDir:{value:new F(0,-1,0)},uSunColor:{value:new I(1,1,1)},uSunPower:{value:1},uVoxel:{value:t},uCity:{value:1},uWrap:{value:.42}},a=new ei({uniforms:i,vertexShader:kd,fragmentShader:Ad,vertexColors:!0});a.userData.preview={kind:`earth`};let o=new L(r,a),s=Wl({size:[116,116,116],at(e,t,n){let r=e+.5-58,i=t+.5-58,a=n+.5-58,o=Math.sqrt(r*r+i*i+a*a);if(o>57.2||o<56.2)return null;let s=r/o,c=i/o,l=a/o,u=.5+.5*Math.cos(Math.abs(s)*9);return bu(s*3.3+2.1,c*3.3-5.4,l*3.3+9.9,4)+u*.08<.63?null:gu(e*3+t*7+n*11)>.5?15988215:14936302}},{voxel:t}),c=new ei({uniforms:{uSunDir:i.uSunDir,uSunColor:i.uSunColor,uSunPower:i.uSunPower,uWrap:{value:.38}},vertexShader:kd,fragmentShader:jd,vertexColors:!0});c.userData.preview={kind:`clouds`};let l=new L(s,c),u=Kl(57.35,16777215,{voxel:t}),d=new ei({uniforms:{uSunDir:i.uSunDir,uSunPower:i.uSunPower,uSunColor:i.uSunColor,uRing:{value:1}},vertexShader:Md,fragmentShader:Nd,blending:2,transparent:!0,depthWrite:!1});d.userData.preview={kind:`atmo`};let f=new L(u,d);f.renderOrder=2;let p=new di;return p.add(o,l,f),{group:p,earthMat:a,cloudMat:c,atmoMat:d,radius:e,setSun(e,t,n,r=1){i.uSunDir.value.copy(e).normalize(),i.uSunPower.value=t,i.uSunColor.value.copy(n),d.uniforms.uRing.value=r}}}function Id(e){let t=new vr({color:new I(1,.95,.85).multiplyScalar(30)}),n=new L(Kl(4,16777215,{voxel:e/4}),t),r=new Pi(new bi({map:su(64,2.6),color:16767392,blending:2,transparent:!0,depthWrite:!1}));r.scale.setScalar(e*7);let i=new Pi(new bi({map:su(64,3.2),color:16756848,blending:2,transparent:!0,depthWrite:!1}));i.scale.setScalar(e*22);let a=new vr({map:su(64,1.6,0),color:16763024,blending:2,transparent:!0,depthWrite:!1,depthTest:!1}),o=new L(new ea(1,1),a);o.scale.set(e*34,e*.5,1),o.renderOrder=20;let s=new di;return s.add(n,i,r,o),{group:s,core:n,glow:r,halo:i,streak:o,set(e,n,c,l){s.position.copy(e),t.color.copy(n).multiplyScalar(30*c),r.material.color.copy(n).multiplyScalar(1.6*c),i.material.color.copy(n).multiplyScalar(.32*c),a.color.copy(n).multiplyScalar(.45*c*l),o.visible=l>.01}}}var Ld=Math.PI/180,Rd=new F(0,-32,-400),zd=new F(0,-Math.cos(12*Ld),-Math.sin(12*Ld)),Bd=Rd.clone().addScaledVector(zd,5e3).add(new F(-.8,0,0)),Vd=Rd.clone().add(new F(0,-70,0)),Hd=new F(0,0,1),Ud=new F(0,-1,0),Wd=zd.clone().negate(),J=Hd.clone().addScaledVector(Wd,-Hd.dot(Wd)).normalize(),Gd=new F().crossVectors(Wd,J).normalize(),Kd=new F(-.82,-.22,-.5).normalize(),qd=8.7,Jd=1;function Yd(e,t=new F){let n=(qd+Jd*(1-2*Sd(e)))*Ld;return t.set(0,-Math.cos(n),Math.sin(n))}function Xd(e){return du(1-Sd(e))}var Zd=new I(1,.94,.84),Qd=new I(1,.62,.3),$d=new I(1,.32,.14);function ef(e,t=new I){let n=Sd(e);return n<=0?t.copy(Zd).lerp(Qd,du((n+.9)/.9)*.35):n<.6?t.copy(Zd).lerp(Qd,.35+n/.6*.65):t.copy(Qd).lerp($d,du((n-.6)/.4))}function tf(e){let t=Xd(e),n=Math.min(1,t/.35);return 3.2*n*n*(3-2*n)*(.45+.55*t)}var nf=1e3,rf=2600;function af(){let e=new V(150,44,44),t=new V(150,44,44);for(let t=4;t<146;t++)e.box(t,21,21,t+1,23,23,9146519);for(let n=0;n<13;n++){let r=8+n*11,i=19-Math.abs(n-6)*.9,a=n<10?1:.55;for(let t=0;t<200;t++){let o=t/200*Math.PI*2;if(Math.sin(o)<-.35||t/200>a&&Math.cos(o)>0)continue;let s=Math.round(22+Math.sin(o)*i),c=Math.round(22+Math.cos(o)*i);e.box(r,s,c,r+2,s+1,c+1,n%3==0?10331050:8291468)}if(n<12)for(let t of[.5,1.6,2.6]){let n=Math.round(22+Math.sin(t)*i),a=Math.round(22+Math.cos(t)*i);e.box(r,n,a,r+11,n+1,a+1,7304573)}let o=Math.round(22+Math.sin(Math.PI*.5)*i);t.set(r,o+1,22,gu(n)>.5?16730682:16767136)}for(let t=22;t<42;t++)e.box(60,t,24,61,t+1,25,13738556);for(let t=40;t<61;t++)e.set(t,41,24,13738556);return t.set(40,42,24,16730682),{hull:e.geometry(1,`center`),lights:t.geometry(1.2,`center`)}}function of(){let e=new V(24,10,10);return e.box(8,2,2,16,8,8,14211803),e.box(0,4,4,8,6,6,5988720),e.box(16,4,4,24,6,6,5988720),e.box(0,3,0,7,7,1,2832988),e.box(17,3,0,24,7,1,2832988),e.box(0,3,9,7,7,10,2832988),e.box(17,3,9,24,7,10,2832988),e.geometry(.12,`center`)}function sf(){let e=new gi;e.background=new I(0);let t=Od();e.add(t);let n=Fd(nf*Math.sin(qd*Ld));n.group.position.set(0,-1e3,0),e.add(n.group);let r=Id(rf*Math.tan(Jd*Ld));e.add(r.group);let i=new Pa(16777215,2.5);e.add(i,i.target),e.add(new Fa(2240580,.35));let a=new di,o=af(),s=Zl(o.hull,{roughness:.7,metalness:.3}),c=Ql(o.lights,3);a.add(s,c),a.scale.setScalar(.42),a.position.set(.5,.62,.6).normalize().multiplyScalar(720),a.lookAt(0,0,0),a.rotateY(Math.PI/2),a.rotateX(.35),e.add(a);let l=new di;l.add(Zl(of(),{roughness:.6}));let u=cu(10485712,3.2,2.2);l.add(u),l.position.copy(Kd).multiplyScalar(900),l.lookAt(0,0,0),e.add(l);let d=[];[[.9,.35,.25],[-.4,.5,.75],[.2,.85,-.5],[-.9,-.1,.4],[.6,-.15,-.78],[-.15,.25,.95],[.75,.6,-.25]].forEach((t,n)=>{let r=cu(n%2?16765600:12574975,6+n%3*3,1.4);r.position.set(t[0],t[1],t[2]).normalize().multiplyScalar(1500),e.add(r),d.push(r)});let f=new di;e.add(f);let p=new F,m=new I;return{scene:e,earth:n,sun:r,stars:t,light:i,dock:a,baseOne:l,beacons:d,streak:f,update(e,t,a){n.group.position.set(0,-1e3,0),n.group.scale.setScalar(1);let o=a?.t??e;a?p.copy(a.dir).normalize():Yd(o,p),ef(o,m);let s=Xd(o);r.set(p.clone().multiplyScalar(rf),m,.25+.75*s,s),r.streak.quaternion.copy(t.quaternion);let c=.6+.8*du(1-Math.abs(Sd(o)-.45)*1.4);n.setSun(p,1,m,c),i.position.copy(p).multiplyScalar(100),i.color.copy(m),i.intensity=.4+2.4*s;let l=u.material;l.opacity=e*.8%1<.18?1:.25,d.forEach((t,n)=>{let r=t.material;r.opacity=.55+.45*Math.sin(e*(.7+n*.13)+n*2)})}}}var cf=14211799,lf=11120050,uf=16766880,df=[`...#....#...`,`############`,`...#....#...`,`...######...`,`............`,`############`,`..########..`,`..#..##..#..`,`..########..`,`..#..##..#..`,`..########..`,`.##......##.`],ff=[`##..........`,`..#.########`,`...........#`,`##...####..#`,`..#..#..#..#`,`.....#..#..#`,`..#..####..#`,`..#........#`,`.#.........#`,`.#.........#`,`#.......#..#`,`#........###`];function pf(){let e=new V(212,26,212),t=new V(212,26,212);for(let n=0;n<26;n++){let r=-52+(n+.5)*4;for(let i=0;i<212;i++){let a=-424+(i+.5)*4;for(let o=0;o<212;o++){let s=-424+(o+.5)*4,c=Math.hypot(s,a),l=Math.atan2(a,s),u=null;if(c>=368&&c<=432&&Math.abs(r)<32){let e=Math.floor((l+Math.PI)/(Math.PI*2)*600);u=Xl(e%6==0?lf:cf,.05,_u(Math.floor(o/2),n,Math.floor(i/2))),(c>=428||c<=372)&&Math.abs(r)<14&&e%2==0&&Math.abs(r)>2&&t.set(o,n,i,_u(o,n,i)>.18?uf:6978966),r<-28&&(c<374||c>426)&&e%3==0&&t.set(o,n,i,_u(i,n,o)>.25?uf:12572927);let d=s-Rd.x,f=a-Rd.z;Math.hypot(d,f)<6&&r<-14&&(u=null)}if(c<=44&&Math.abs(r)<48&&(u=Xl(Math.abs(r)>40?lf:cf,.05,_u(o,n,i)),c>40&&Math.abs(r)<30&&(n+Math.floor(l*6))%3==0&&t.set(o,n,i,uf)),c>40&&c<370&&Math.abs(r)<8)for(let e=0;e<6;e++){let c=e/6*Math.PI*2+Math.PI/6,l=Math.cos(c),d=Math.sin(c),f=s*l+a*d,p=Math.abs(-s*d+a*l);f>0&&p<6&&(u=Xl(13159632,.06,_u(o,n,i)),Math.abs(r)<3&&p<3&&Math.floor(f/8)%3==0&&t.set(o,n,i,uf))}u!==null&&e.set(o,n,i,u)}}}for(let t=0;t<4;t++){let n=t/4*Math.PI*2;for(let t=46;t<120;t+=4){let r=Math.cos(n)*t,i=Math.sin(n)*t,a=Math.floor((r+424)/4),o=Math.floor((i+424)/4);for(let t=20;t<24;t++)e.set(a,t,o,9278362);for(let t=2;t<6;t++)e.set(a,t,o,9278362)}}return{hull:e.geometry(4,`min`).translate(-424,-52,-424),windows:t.geometry(4,`min`).translate(-424,-52,-424)}}function mf(){let e=.5,t=Rd.z-33,n=new V(128,16,132),r=new V(128,16,132),i=new V(128,16,132);for(let a=0;a<132;a++){let o=t+(a+.5)*e;for(let t=0;t<128;t++){let s=-32+(t+.5)*e,c=Math.hypot(s,o);if(c<369.5||c>430.5)continue;let l=s-Rd.x,u=o-Rd.z,d=Math.hypot(l,u),f=Xl(t%16==0||a%12==0?12172738:cf,.035,_u(Math.floor(t/4),Math.floor(a/4)));d>3.9&&d<4.6&&(f=Math.floor((Math.atan2(u,l)+Math.PI)/(Math.PI/10))%2==0?14857266:2369066);let p=Math.floor(s-8),m=Math.floor(Rd.z+6-o);if(m>=0&&m<12){let e=!1;p>=0&&p<12?e=df[m][p]===`#`:p>=14&&p<26&&(e=ff[m][p-14]===`#`),e&&(f=10891047)}if(s<-10&&s>-24&&Math.abs(u)<.75&&Math.floor(s)%2==0&&(f=2829875),d>=3&&(n.set(t,1,a,f),n.set(t,2,a,f)),d>=3&&d<3.8&&n.set(t,0,a,5922920),d>=3&&d<3.6)for(let e=1;e<14;e++)i.set(t,e,a,e%4==0?8028812:13620184);if(d<3&&i.set(t,14,a,12568012),d>6&&d<6.5){let e=Math.atan2(u,l);Math.floor((e+Math.PI)/(Math.PI/6))%2==0&&Math.abs(Math.sin(e*6))<.25&&r.set(t,0,a,14263598)}}}let a=new F(-32,-33,t);return{hull:n.geometry(e,`min`).translate(a.x,a.y,a.z),glyphs:r.geometry(e,`min`).translate(a.x,a.y,a.z),tube:i.geometry(e,`min`).translate(a.x,a.y,a.z)}}function hf(){let e=new V(13,1,13);for(let t=0;t<13;t++)for(let n=0;n<13;n++){let r=Math.hypot(n-6,t-6);if(r>6.2)continue;let i=r>5.2?9278620:13225683;Math.abs(n-6)<=0&&r<4&&(i=10133929),(n===3||n===9)&&Math.abs(t-6)<2&&(i=14000442),e.set(n,0,t,i)}return e.geometry(.5,`center`)}function gf(){let e=new di,t=pf(),n=Zl(t.hull,{roughness:.62,metalness:.22},{receive:!0}),r=Ql(t.windows,1.6);e.add(n,r);let i=mf(),a=Zl(i.hull,{roughness:.55,metalness:.25},{receive:!0}),o=Zl(i.glyphs,{roughness:.7},{receive:!0}),s=Zl(i.tube,{roughness:.6});e.add(a,o,s);let c=new di,l=Zl(hf(),{roughness:.5,metalness:.35},{receive:!0});c.add(l),c.position.set(Rd.x,Rd.y-.25,Rd.z),e.add(c);let u=new vr({color:16722458}),d=new L(new R(.9,.35,.9),u);d.position.set(Rd.x+5.2,Rd.y-.9,Rd.z+1.6);let f=Zl(new V(1,1,1).set(0,0,0,3883079).geometry(1.3,`center`));f.position.copy(d.position).add(new F(0,.45,0)),e.add(d,f);let p=new ja(16722458,18,26,2);p.position.copy(d.position).add(new F(0,-.8,0)),e.add(p);let m=new ja(16773336,0,30,2);m.position.set(Rd.x,Rd.y+3.5,Rd.z),e.add(m);let h=[],g=[];for(let t of[-1,1]){let n=new F(Rd.x+t*9,Rd.y-1,Rd.z+3.5),r=new L(new R(1.4,.3,.9),new vr({color:16774888}));r.position.copy(n),e.add(r),g.push(r);let i=new Ea(15988479,0,0,.42,.6,2);i.position.copy(n),i.target.position.set(Rd.x-t*2,Rd.y-70,Rd.z-2),e.add(i,i.target),h.push(i)}let _=[];for(let t=0;t<12;t++){let n=t/12*Math.PI*2,r=new L(new R(3,3,3),new vr({color:t%3==0?16724770:t%3==1?3407718:16777215}));r.position.set(Math.cos(n)*421,-33,Math.sin(n)*421),e.add(r),_.push(r)}let v=new L(new R(10,4e5,10),new na({color:12107462,roughness:.5,metalness:.4,emissive:1711652}));v.position.set(0,-200048,0),e.add(v);let y=new V(8,10,8);y.box(0,0,0,8,10,8,13225168).box(1,3,0,7,7,1,16766880).box(0,4,3,1,6,5,16766880);let b=Zl(y.geometry(4,`center`),{roughness:.6});b.position.set(0,-2600,0),e.add(b);let x=cu(16769712,30,1.2);x.position.set(0,-2580,0),e.add(x);let S=new I(16722458),C=new I(2883434);return{group:e,door:c,signal:d,signalLight:p,interiorLight:m,floods:h,floodLamps:g,navLights:_,setHatch(e,t,n){let r=Math.min(1,e*4),i=Math.max(0,(e-.25)/.75);c.position.set(Rd.x+i*7.5,Rd.y-.25-r*.7,Rd.z),u.color.copy(t?C:S).multiplyScalar(3.2),p.color.copy(t?C:S),m.intensity=e*160,_.forEach((e,t)=>{e.visible=(n*.9+t*.37)%1<(t%3==2?.08:.5)})}}}var Y=(e=0,t=0,n=0)=>new F(e,t,n),_f=.92,vf=Wd.clone();function yf(e,t){let n=new Xn;return Cl(n,e,t),n.quaternion.clone()}var bf=yf(Ud,Hd),xf=yf(Y(0,0,-1),Y(0,-1,0)),Sf=yf(Y(0,0,1),Y(0,1,0)),Cf=yf(Y(0,1,0),Hd),wf=yf(Wd,J);function Tf(){let e=new gi;e.background=null;let t=sf(),n=gf();e.add(n.group);let r=new Pa(16777215,3);r.castShadow=!0,r.shadow.mapSize.set(2048,2048);let i=r.shadow.camera;i.left=-26,i.right=26,i.top=26,i.bottom=-26,i.near=10,i.far=400,r.shadow.bias=-4e-4,r.shadow.normalBias=.04,r.target.position.copy(Rd).add(Y(0,-36,0)),e.add(r,r.target);let a=new Pa(5929656,.18);a.position.set(0,-100,0),e.add(a);let o=new ba(1712692,2766416,.9);e.add(o);let s=new Pa(16771538,.8);s.position.copy(Bd).addScaledVector(Wd,200).addScaledVector(J,40),s.target.position.copy(Bd),e.add(s,s.target);let c=hu(2024),l=[],u=Yu(3),d=[9,10,10],f=0,p=[];for(let e=0;e<d.length;e++)for(let t=0;t<d[e];t++){let n=d[e],r=(t-(n-1)/2)*1.12+(e===0?0:(c()-.5)*.12),i=Vd.clone().add(Y(r,e*1.55,e*.98+(c()-.5)*.12)),a=`crowd`,o=td(f+3),s=`#3f6fae`;e===0&&t===3&&(a=`T1`,o=nd[0],s=`#c9a24a`),e===0&&t===4&&(a=`T2`,o=nd[1],s=`#c9a24a`),e===0&&t===5&&(a=`T3`,o=nd[2],s=`#c9a24a`),e===1&&t===3&&(a=`B1`),e===1&&t===6&&(a=`B2`);let m=e===0,h=new Bu({face:o,heightM:1.68+c()*.14,exprs:[`neutral`,`blink`,`smile`,`smileTalk`,`talk`,`scream`,`pain`,`dead`],outfits:{suit:zu({stripe:m&&a===`crowd`?`#8a9bb3`:s,flag:!0,rank:m,seed:f})}}),g=Ju(h,a===`T2`?u:void 0);l.push({i:f,actor:h,rig:g,role:a,row:e,slot:i,seed:c()*100,emerge:0,dur:q.emergeDur+c()*1.4,flyPts:[],clearAt:0,hit:null,hitLocal:Y(),helper:null,towing:null,retreat:0,retreatDur:0,shuffle:Y(e===0?0:(c()-.5)*1.6,0,e===0?0:(c()-.5)*.6),react:.25+c()*.45}),p.push(f),f++}{let e=new Bu({face:td(77),heightM:1.76,exprs:[`neutral`,`blink`,`smile`,`smileTalk`,`talk`,`scream`],outfits:{suit:zu({stripe:`#e07a2e`,flag:!0})}}),t=Ju(e),n=vd(md(),{metalness:.5,roughness:.4});n.position.set(0,.6,1.6),e.fig.anchors.handR.add(n);let r=new Ea(16773858,0,0,.42,.85,2);r.name=`photoLamp`,r.position.set(0,1.2,3.2),r.target.position.set(0,1.2,60),e.fig.anchors.handR.add(r,r.target);let i=new L(new R(1.4,.7,.2),new vr({color:new I(1,.96,.9).multiplyScalar(3)}));i.name=`photoLampGlow`,i.position.set(0,1.4,2.9),e.fig.anchors.handR.add(i),l.push({i:f,actor:e,rig:t,role:`photographer`,row:-1,slot:Vd.clone().add(Y(3.6,-23.5,-3.2)),seed:42,emerge:0,dur:q.emergeDur+2.2,flyPts:[],clearAt:241.6,hit:null,hitLocal:Y(),helper:null,towing:null,retreat:0,retreatDur:0,shuffle:Y(),react:.3})}let m=[...l.slice(0,9).map(e=>e.i),...l.slice(9,29).map(e=>e.i)];m.sort((e,t)=>(l[e].row-l[t].row)*10+(gu(e*7.1)-gu(t*7.1))),l[29].emerge=q.emerge-.2,m.forEach((e,t)=>l[e].emerge=q.emerge+.5+t*q.emergeStep),l.slice(0,29).map(e=>e.i).sort((e,t)=>gu(e*3.3)-gu(t*3.3)).forEach((e,t)=>l[e].clearAt=q.visorClear+t*.1);let h=l.find(e=>e.role===`T1`),g=l.find(e=>e.role===`T2`),_=l.find(e=>e.role===`T3`),v=l.find(e=>e.role===`B1`),y=l.find(e=>e.role===`B2`),b=l[29];g.clearAt=q.visorClear+.3,h.hit=q.impact.T1,h.hitLocal.set(.05,1.22,.16),v.hit=q.impact.B1,v.hitLocal.set(.31,1.12,.05),_.hit=q.impact.T3,_.hitLocal.set(-.06,1.2,.16),y.hit=q.impact.B2,y.hitLocal.set(0,1.18,-.3),g.hit=q.impact.T2,g.hitLocal.set(0,1.5,.3);for(let e of l){let t=Rd.clone().add(Y(0,3.5,0)),n=Rd.clone().add(Y(0,-6,0));e.flyPts=[t,n,n.clone().lerp(e.slot,.55).add(Y(0,0,.6)),e.slot.clone()]}let x=[h,g,_,v,y],S=[l[11],l[13],l[14],l[21],l[25]];x.forEach((e,t)=>{let n=S[t];e.helper=n.i,n.towing=e.i});for(let e of l){let t=e.slot.distanceTo(Rd);e.towing===null?e.helper===null?(e.retreat=q.retreat+.1+gu(e.i*1.7)*1.3,e.retreatDur=2.4+t/70+gu(e.i*2.9)*1):(e.retreat=0,e.retreatDur=0):(e.retreat=q.retreat+.3+gu(e.i)*.4,e.retreatDur=4.6)}for(let t of l)e.add(t.actor.holder);let C=new yt,w=1.2;function T(e,t,n){if(t<e.emerge)return n.copy(Rd).add(Y(0,4,0));let r=(t-e.emerge)/e.dur;if(r<1)return Ou(e.flyPts,pu(r),n);n.copy(e.slot);let i=1-H(U(t,e.emerge+e.dur,e.emerge+e.dur+30));if(n.addScaledVector(e.shuffle,i*(.6+.4*Math.sin(t*.7+e.seed))),n.x+=Math.sin(t*.41+e.seed)*.05,n.y+=Math.sin(t*.33+e.seed*2)*.05,n.z+=Math.sin(t*.47+e.seed*3)*.04,e.hit!==null&&t>e.hit){let r=t-e.hit;n.addScaledVector(vf,.45*(1-Math.exp(-r*3))+r*.18)}return n}function E(e,t,n=Y()){if(e.helper!==null){let r=l[e.helper];return t>=r.retreat+w?(E(r,t,n),n.add(Y(.85,.2,-.3))):T(e,t,n)}if(e.retreat>0&&t>=e.retreat){let r=T(e,e.retreat,Y());if(e.towing!==null){let i=l[e.towing],a=e.retreat+w,o=T(i,a,Y()).add(Y(-.85,-.2,.3));if(t<a)return n.copy(r).lerp(o,H((t-e.retreat)/w));let s=du((t-a)/e.retreatDur);return Ou([o,o.clone().lerp(Rd,.45).add(Y(0,-14,0)),Rd.clone().add(Y(0,-7,0)),Rd.clone().add(Y(0,6,0))],mu(s),n)}let i=du((t-e.retreat)/e.retreatDur);return Ou([r,r.clone().lerp(Rd,.5).add(Y(0,-12,0)),Rd.clone().add(Y(0,-7,0)),Rd.clone().add(Y(0,6,0))],mu(i),n)}return T(e,t,n)}let D=Y(.3,.2,1).normalize();function ee(e,t,n=new yt){if(e.role===`photographer`)return n.copy(xf).slerp(Cf,H(U(t,e.emerge+.6,e.emerge+e.dur*.8))),n;let r=(t-e.emerge)/e.dur;n.copy(xf).slerp(bf,H((r-.15)/.55)),C.setFromEuler(new Nn(Math.sin(t*.3+e.seed)*.05,Math.sin(t*.23+e.seed)*.08,Math.sin(t*.27+e.seed*2)*.04)),n.multiply(C),e.hit!==null&&t>e.hit&&(C.setFromAxisAngle(D,(t-e.hit)*.35+(1-Math.exp(-(t-e.hit)*4))*.25),n.multiply(C));let i=e.helper===null?e.retreat:l[e.helper].retreat+w;if(i>0&&t>i){let r=H((t-i)/1.1);n.slerp(Sf,r*(e.helper===null?1:.5))}return n}function O(e,t,n){return t<e.emerge?!1:n.y<Rd.y+2.4}let te={armR:[.12,0,.12],armL:[.12,0,-.12],legR:[.05,0,.03],legL:[.05,0,-.03]},ne={armR:[-.3,0,.14],armL:[-.3,0,-.14],legR:[-.12,0,.04],legL:[-.05,0,-.04],neck:[.02,0,0]},re={armR:[-1.4,.2,.95],armL:[-1.1,-.2,-1],legR:[-.5,0,.3],legL:[-.2,0,-.35],neck:[.55,.2,0],hips:[-.2,0,0]};function k(e,t){let n=Du(Hl(t*.8+e.seed*3),.45);if(e.role===`photographer`)return Eu(Eu({armR:[-1.5,.15,.25],armL:[-1.45,-.15,-.38],neck:[.05,0,0],legR:[-.2,0,.05],legL:[-.1,0,-.05]},{armL:[t>231&&t<236?Math.sin(t*4)*.35:0,0,0]}),Du(n,.5));let r=(t-e.emerge)/e.dur,i=Eu(ne,n);r<1&&(i=Eu(te,Du(n,H(r)))),e.role===`T2`&&wd(`v35`,t)&&(i=Eu(i,{armR:[-.7+Math.sin(t*3.1)*.2,0,.15]}));let a=q.impact.T1+e.react;if(t>a&&e.hit===null){let n=H((t-a)/.35),r={armR:[-2.2+Math.sin(t*5+e.seed)*.4,0,.5],armL:[-2+Math.sin(t*4.3+e.seed)*.4,0,-.55],legR:[-.6,0,.2],legL:[.1,0,-.2],neck:[-.15,Math.sin(t*2+e.seed)*.4,0]};i=Eu(Du(i,1-n),Du(r,n))}if(e.hit!==null&&t>e.hit){let n=H((t-e.hit)/.5);i=Eu(Du(i,1-n),Du(re,n))}let o=e.helper===null?e.retreat:1/0;return o>0&&t>o&&(i=Eu(Du(i,1-H((t-o)/.6)),Du(te,H((t-o)/.6)))),e.towing!==null&&t>e.retreat+w&&(i=Eu(i,{armR:[-1.6,0,.6]})),i}function ie(e,t){let n=t>236?`smile`:`neutral`,r=!1;return e.role===`photographer`&&(r=wd(`v33`,t)||wd(`v34`,t)),e.role===`T2`&&(r=wd(`v35`,t)),t>250.6&&t<254.5&&e.role!==`T2`&&(n=`smile`),t>q.impact.T1+e.react&&(n=`scream`),e.hit!==null&&t>e.hit&&(n=t>e.hit+1.6&&(e.role===`T1`||e.role===`T3`)?`dead`:`pain`),t>q.retreat+2.5&&e.hit===null&&(n=`pain`),{e:n,speak:r}}let ae={};for(let e=0;e<4;e++)ae[`thin${e}`]=zu({stripe:`#b8322a`,flag:!0,rank:!0,gloveR:`thin`,frost:e/3,seed:99});let A=new Bu({face:Xu,heightM:1.8,exprs:[`neutral`,`blink`,`grim`,`squint`],outfits:{suit:zu({stripe:`#b8322a`,flag:!0,rank:!0,seed:99}),...ae}}),oe=Ju(A);oe.setVisor(.86),e.add(A.holder);let se=A.fig.root.scale.x,ce=new L(new R(1,1,.4),new vr({color:4259712}));ce.position.set(1.5,7.6,2.35),A.fig.joints.hips.add(ce);let le=new ja(10475752,.12,.36,2);le.position.set(0,-4.2,3.4),A.fig.anchors.head.add(le);let ue=new Ea(16773596,3.2,5,.85,.75,2);ue.position.set(0,-1.2,5.4),ue.target.position.set(0,-16,22),A.fig.anchors.head.add(ue,ue.target);let de=cu(16773341,1,1.4);e.add(de);let fe=new di,pe=vd(id(),{metalness:.55,roughness:.38});fe.add(pe);let me=new di;me.add(vd(ld(),{metalness:.4,roughness:.35}),ud());let he=new di;{let e=new V(5,5,5);e.box(2,2,0,3,3,5,16777215).box(0,2,2,5,3,3,16777215).box(2,0,2,3,5,3,16777215);let t=new L(e.geometry(.35,`center`),new vr({color:new I(1,.85,.55).multiplyScalar(14)}));he.add(t);let n=cu(16765834,3.2,6);n.name=`flashSprite`,he.add(n)}he.position.copy(ad).add(Y(0,0,.8)),fe.add(he);let ge=new ja(16767136,0,4,2);e.add(ge);let _e=[vd(fd()),vd(fd())],ve=[vd(fd()),vd(fd())],ye=vd(pd(),{roughness:.8,metalness:.05}),j=new di;A.holder.add(j);for(let e of[..._e,...ve,ye])e.scale.setScalar(se),j.add(e);A.fig.anchors.handR.add(fe);let be={armR:[-.28,0,.2],armL:[-.65,.25,-.32],legR:[-.25,0,.06],legL:[-.1,0,-.06],neck:[.05,0,0],hips:[-.06,0,0]},xe={armR:[-.3,0,.22],armL:[-2.32,.1,-.52],legR:[-.25,0,.06],legL:[-.1,0,-.06],neck:[.02,0,0]},Se={armR:[-.3,0,.35],armL:[-1.4,.3,-.45],legR:[-.25,0,.1],legL:[-.1,0,-.06],neck:[-.15,.95,.05],hips:[0,.55,0]},M={armR:[-1.05,0,.32],armL:[-1.12,.1,-.78],legR:[-.25,0,.06],legL:[-.1,0,-.06],neck:[.35,0,0]},Ce={armR:[-1,0,.3],armL:[-.75,.25,-.2],neck:[.3,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},N={armR:[-.3,.2,-1.35],armL:[-.5,0,-.3],neck:[.2,-.75,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},we={armR:[.18,0,-.22],armL:[-.5,0,-.3],neck:[.4,-.2,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},Te={armR:[-1.05,0,.28],armL:[-.6,0,-.3],neck:[.3,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},Ee={armR:[-1.05,0,.28],armL:[-1.25,-.1,-.2],neck:[.3,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},De={armR:[-1.15,0,.32],armL:[-1.15,0,-.45],neck:[.32,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},Oe={armR:[-Math.PI/2+.06,.02,.1],armL:[-Math.PI/2+.08,.02,-.26],neck:[.04,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06],hips:[0,0,0]},ke={...Oe,armL:[-1.05,.1,-.12]},Ae={...Oe,armL:[-.85,.3,-.5]},je={armR:[-.6,0,.25],armL:[-.5,0,-.25],neck:[.1,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},Me={armR:[-1.25,.35,.55],armL:[-.5,0,-.25],neck:[.25,-.3,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]},Ne=[[q.vista,be],[q.scopeRaise[0],be],[q.scopeRaise[1],xe],[q.lookSun[0],xe],[q.lookSun[0]+1,Se],[q.lookSun[1]-.4,Se],[q.lookSun[1]+.4,xe],[q.gloveTwist[0]-.4,xe],[q.gloveTwist[0],M],[q.gloveTwist[1],M],[q.gloveOff,Ce],[q.turn[0]+.4,je],[q.turn[1]-.6,N],[q.turn[1],N],[q.gunOut-.3,we],[q.gunOut+.25,Te],[q.scopeGrab,Ee],[q.scopeMount,De],[q.aim[0],De],[q.aim[1],Oe],[q.magOut[0]-.05,Oe],[q.magOut[0]+.15,ke],[q.magOut[0]+.35,Ae],[q.magIn[0],ke],[q.magIn[0]+.3,Oe],[q.magOut[1]-.05,Oe],[q.magOut[1]+.15,ke],[q.magOut[1]+.35,Ae],[q.magIn[1],ke],[q.magIn[1]+.3,Oe],[q.gunStow[0],Oe],[q.gunStow[0]+.5,je],[q.gunStow[1],we],[q.gloveCatch-.2,Me],[q.gloveCatch+.2,Me],[q.gloveOn,{armR:[-1,0,.32],armL:[-1.05,.1,-.72],neck:[.35,0,0],legR:[-.25,0,.06],legL:[-.1,0,-.06]}],[q.gloveOn+.8,je],[q.depart[0],{armR:[.1,0,.14],armL:[.1,0,-.14],legR:[.05,0,.03],legL:[.05,0,-.03],neck:[-.2,0,0]}]],Pe=xd();function Fe(e){let t=0;for(let n of Pe){let r=e-n.t;r>=0&&r<.25&&(t+=Math.exp(-r*22)*.16)}return t}function Ie(e){let t=-1/0;for(let n of Pe)n.t<=e&&(t=n.t);return t}function Le(e){return e<q.magIn[0]+.2?0:e<q.magIn[1]+.2?1:2}let Re=[h,_,g];function ze(e,t,n=Y()){let r=Re[e],i=Math.min(t,r.hit??t);E(r,i,n),ee(r,i,C);let a=r.hitLocal.clone().sub(Y(0,_f,0));return n.add(a.applyQuaternion(C))}function Be(e){return(H(U(e,q.turn[0],q.turn[1]-.4))-H(U(e,q.aim[0],q.aim[1]-.2)))*.55}let Ve=yf(Kd,Y(0,1,0).addScaledVector(Kd,-Kd.y).normalize());function He(e,t,n){n.copy(wf);let r=Be(e);if(r!==0&&n.multiply(C.setFromAxisAngle(Y(0,1,0),r)),C.setFromEuler(new Nn(xu(e*.2,1)*.03,xu(e*.17,2)*.03,xu(e*.13,3)*.02)),(e<q.aim[0]||e>q.gunStow[0])&&n.multiply(C),t.copy(Bd),t.addScaledVector(J,Math.sin(e*.21)*.06),t.addScaledVector(Gd,Math.sin(e*.17)*.05),e<q.arrivePuff[1]+1.5){let n=1-mu(U(e,q.vista-2,q.arrivePuff[1]+1.5));t.addScaledVector(Gd,n*26).addScaledVector(J,-n*6)}if(e>q.depart[0]-1.6){let r=H(U(e,q.depart[0]-1.6,q.depart[0]+.6));n.slerp(Ve,r);let i=Math.max(0,e-q.depart[0]),a=q.depart[1]-q.depart[0],o=i<a?2.75*i*i:2.75*a*a+5.5*a*(i-a);t.addScaledVector(Kd,o)}}let Ue=gd(),We=new na({vertexColors:!0,metalness:.55,roughness:.32,emissive:1382170}),Ge=[],Ke=Bd.clone().addScaledVector(Wd,.82).addScaledVector(J,.42).addScaledVector(Gd,-.05);for(let t of Pe){let n=new L(Ue,We);n.visible=!1,e.add(n);let r=t.group,i=t.index,a=Re[r],o=a.hit+i*(r===2?.025:.03),s=ze(r,a.hit,Y()),c=hu(t.group*31+i*7+1);s.add(Y((c()-.5)*.16,(c()-.5)*.1,(c()-.5)*.16));let l=!1;r===0&&i===4&&(E(v,v.hit,s),s.add(v.hitLocal.clone().sub(Y(0,_f,0)).applyQuaternion(ee(v,v.hit))),o=v.hit),r===1&&i===6&&(E(y,y.hit,s),s.add(y.hitLocal.clone().sub(Y(0,_f,0)).applyQuaternion(ee(y,y.hit))),o=y.hit),(r===1&&i===8||r===2&&i===2)&&(s.add(Y(.7*(i===8?1:-1),0,.5)),l=!0),Ge.push({mesh:n,tf:t.t,ti:o,from:Ke.clone(),to:s,miss:l})}function qe(e,t,n=Y()){let r=Ge[e],i=(t-r.tf)/(r.ti-r.tf);return n.copy(r.from).lerp(r.to,i),n}let Je=new au(1280,{soft:!0}),Ye=new au(240,{soft:!0}),Xe=new au(570,{soft:!0}),Ze=new au(170,{}),Qe=new au(170,{additive:!0}),$e=new au(72,{additive:!0});for(let t of[Je,Ye,Xe,Ze,Qe,$e])e.add(t.points);let et=[];{let t=hu(77);for(let n=0;n<14;n++){let r,i=n%4;if(i===0){let e=new V(12,2,2);e.box(0,0,0,12,2,2,9278363).box(0,0,0,1,2,2,13214266).box(11,0,0,12,2,2,13214266),r=e.geometry(.35,`center`)}else if(i===1){let e=new V(6,1,4);e.box(0,0,0,6,1,4,2899294).box(0,0,0,6,1,1,10133929),r=e.geometry(.5,`center`)}else if(i===2)r=eu(n,3,.25,()=>11843774,.1);else{let e=new V(3,3,3);e.box(0,0,0,3,3,3,14209208).box(1,0,0,2,3,3,12141870),r=e.geometry(.4,`center`)}let a=Zl(r,{roughness:.6,metalness:.3}),o=45+t()*170,s=Y(t()-.5,t()-.5,t()-.5).normalize();s.dot(Wd)>.75&&s.addScaledVector(Gd,1).normalize();let c=Bd.clone().addScaledVector(s,o);et.push({mesh:a,base:c,axis:Y(t()-.5,t()-.5,t()-.5).normalize(),w:.05+t()*.2,drift:Y(t()-.5,t()-.5,t()-.5).multiplyScalar(.3)}),e.add(a)}}let tt=Array.from({length:12},(e,t)=>{let n=hu(500+t);return{start:Bd.clone().add(Y((n()-.5)*16e3,(n()-.5)*9e3+3e3,(n()-.5)*16e3)),dir:Y(n()-.5,(n()-.5)*.4,n()-.5).normalize(),speed:110+n()*60,col:n()>.5?new I(.85,.92,1):new I(1,.8,.55)}});function nt(e,t=Y()){let n=e instanceof Bu?e:e.actor;return n.fig.anchors.head.updateWorldMatrix(!0,!1),n.fig.anchors.head.localToWorld(t.set(0,-4,0))}function rt(e=Y()){return nt(A,e)}function it(e=Y()){return A.fig.anchors.handR.updateWorldMatrix(!0,!1),A.fig.anchors.handR.getWorldPosition(e)}function at(e){return e>q.arrivePuff[0]&&e<q.arrivePuff[1]?.8:e>q.turn[0]&&e<q.turn[0]+.35?.5:e>q.aim[0]&&e<q.aim[0]+.3?.45:e>q.depart[0]-1.2&&e<q.depart[0]-.7?.5:+(e>q.depart[0]&&e<q.depart[1])}let ot=oe.nozzles.map(e=>{let t=cu(12575999,4.5,2.4);return t.position.copy(e).add(Y(0,0,-.6)),oe.pack.add(t),t});function st(e=Y()){return fe.updateWorldMatrix(!0,!1),fe.localToWorld(e.copy(ad))}function ct(e,t,n){e.holder.quaternion.copy(n),e.holder.position.copy(t).sub(Y(0,_f,0).applyQuaternion(n))}let lt=Y(),ut=new yt,dt=new I,ft=new yt;function pt(e,t){e.parent.updateWorldMatrix(!0,!1),e.parent.getWorldQuaternion(ut),e.quaternion.copy(ut.invert().multiply(t))}function mt(e,t,n){if(e>=l.length*40){let r=e-l.length*40,i=.05,a=Math.floor(t/i)*i-r*i,o=t-a,s=1.6;if(o<0||o>s)return!1;let c=at(a);if(c<=0)return!1;let u=Y(),d=new yt;He(a,u,d);let f=Y(0,0,-1).applyQuaternion(d),p=Y(0,1,0).applyQuaternion(d),m=gu(r*13.1+Math.floor(a*20));return n.p.copy(u).addScaledVector(f,.35).addScaledVector(p,.2+(m-.5)*.5),n.p.addScaledVector(f,o*(6+m*4)).addScaledVector(p,(m-.5)*o*2),n.size=.08+o*.55,n.alpha=c*.3*(1-o/s)**2,n.c.setRGB(.92,.94,.97),!0}let r=l[Math.floor(e/40)],i=e%40,a=.06,o=Math.floor(t/a)*a-i*a,s=t-o,c=0,u=1,d=(o-r.emerge)/r.dur;d>=0&&d<.2?(c=.7,u=-1):d>.75&&d<.98&&(c=.4,u=1);let f=r.helper===null?r.retreat:-1,p=r.retreatDur+(r.towing===null?0:w),m=f>0?(o-f)/p:-1,h=.9;if(m>=0&&m<.45?(c=1,u=-1,h=2.2):m>=.8&&m<1&&(c=.5,u=1),c<=0||s<0||s>h)return!1;let g=E(r,o,lt),_=E(r,o+.05,Y()).sub(g);if(_.lengthSq()<1e-8)return!1;_.normalize();let v=gu(r.i*17.3+i*3.1+Math.floor(o*16.7)),y=gu(r.i*5.7+i*9.1+Math.floor(o*16.7));n.p.copy(g).addScaledVector(_,-.3*u);let b=Y(v-.5,y-.5,gu(v*91)-.5).multiplyScalar(2.2);return n.p.addScaledVector(_,-u*s*(9+v*6)).addScaledVector(b,s),n.size=.1+s*.55,n.alpha=c*.075*(1-s/h)**1.6,n.c.setRGB(.93,.95,.98),!0}let ht=[h,v,_,y,g];function gt(e,t,n){if(e<350){let r=ht[Math.floor(e/70)],i=e%70;if(r.hit===null||t<r.hit)return!1;let a=.045,o=Math.floor((t-r.hit)/a)*a+r.hit-i*a,s=t-o;if(o<r.hit||s<0||s>1.1)return!1;let c=Math.exp(-(o-r.hit)*(r.role===`T2`?.9:.55));if(c<.04)return!1;let l=E(r,o,Y()),u=ee(r,o,new yt),d=l.add(r.hitLocal.clone().sub(Y(0,_f,0)).applyQuaternion(u)),f=Y(0,0,1).applyQuaternion(u);r.role===`B2`&&f.negate();let p=gu(e*7.3+Math.floor(o*22)),m=gu(e*3.1+Math.floor(o*22));return s>.7?!1:(n.p.copy(d).addScaledVector(f,s*(9+p*7)).add(Y(p-.5,m-.5,p*m-.25).multiplyScalar(s*4.5)),n.size=.04+s*.75,n.alpha=.6*c*(1-s/.7)**1.4,n.c.setRGB(.95,.96,1),!0)}let r=e-350,i=y.hit;if(t<i)return!1;let a=t-i;if(a>5)return!1;let o=hu(900+r),s=Y(o()-.5,o()-.5,o()-.5).normalize(),c=2+o()*5,l=E(y,i,Y()).add(y.hitLocal.clone().sub(Y(0,_f,0)).applyQuaternion(ee(y,i)));return n.p.copy(l).addScaledVector(s,c*(1-Math.exp(-a*1.2))/1.2),n.size=.5+a*1+o()*.6,n.alpha=.42*Math.exp(-a*.7)*H(a/.08),n.c.setRGB(.96,.97,1),!0}function _t(e,t,n,r){let i=q.impact.T2+.55,a=hu(1300+e),o=i+a()*1.6,s=t-o;if(s<0||s>6)return!1;let c=E(g,o,Y()),l=ee(g,o,new yt),u=c.add(Y(-.04,.6,.3).applyQuaternion(l)),d=Y(0,0,1).applyQuaternion(l).clone().add(Y(a()-.5,a()-.5,a()-.5).multiplyScalar(1.1)).normalize();n.p.copy(u).addScaledVector(d,s*(1.2+a()*2.2));let f=H(s/.9);if(!r)return n.c.setRGB(.45,.02,.03),n.size=.005+a()*.008,n.alpha=1-f,n.alpha>.02;let p=.6+.4*Math.sin(t*(14+a()*20)+e);return dt.setRGB(1,.82,.86).lerp(new I(.9,.95,1),f),n.c.copy(dt).multiplyScalar(1.6*p*Xd(t)+.25),n.size=.008+a()*.014,n.alpha=f*(1-H((s-4)/2)),n.alpha>.02}let vt=Y(),P=Y(),bt=new yt;return{scene:e,backdrop:t,station:n,members:l,targets:[h,g,_],photographer:b,zhang:A,zrig:oe,bullets:Ge,sunLight:r,memberCenter:E,memberQuat:ee,headOf:nt,zhangHead:rt,zhangHand:it,zhangHolder:A.holder,muzzleWorld:st,bulletPos:qe,aimPoint:ze,setEnvironment(t){e.environment=t},update(e,i){Yd(e,vt),r.position.copy(r.target.position).addScaledVector(vt,200),ef(e,r.color),r.intensity=tf(e),t.update(e,i);let a=H(U(e,q.doorOpen[0],q.doorOpen[1]))*(1-H(U(e,q.doorClose[0],q.doorClose[1]))),o=e>=q.green&&e<q.red;n.setHatch(a,o,e);let s=e>q.green?H(U(e,q.green,q.green+.6)):0;n.floods.forEach(e=>e.intensity=s*9e3);{let t=H(U(e,238,239))*(1-H(U(e,q.retreat+.6,q.retreat+1.2))),n=b.actor.fig.root.getObjectByName(`photoLamp`);n.intensity=t*1500;let r=b.actor.fig.root.getObjectByName(`photoLampGlow`);r.visible=t>.05}n.floodLamps.forEach(e=>e.material.color.setScalar(.4+s*4));for(let t of l){let n=E(t,e,P),r=O(t,e,n);if(t.actor.holder.visible=r,!r)continue;ee(t,e,bt),ct(t.actor,n,bt),t.actor.pose(k(t,e));let i=ie(t,e);t.actor.perform(e,i.e,i.speak,t.seed),t.rig.setVisor(H(U(e,t.clearAt,t.clearAt+.5))),t.role===`T2`&&t.rig.setCrack(e>=q.impact.T2?H(U(e,q.impact.T2,q.impact.T2+.12)):0)}He(e,P,bt),A.holder.position.copy(P).sub(Y(0,_f,0).applyQuaternion(bt)),A.holder.quaternion.copy(bt);let c=Tu(Ne,e),u=Du(Hl(e*.6),.22);c=e<q.aim[0]||e>q.gunStow[0]?Eu(c,u):Eu(c,{lift:Math.sin(e*1.3)*.05}),e>q.gloveTwist[0]&&e<q.gloveTwist[1]&&(c=Eu(c,{armL:[0,Math.sin((e-q.gloveTwist[0])*18)*.25,0]}));let d=Fe(e);d>0&&(c=Eu(c,{armR:[-d,0,0],armL:[-d*.9,0,0]})),A.pose(c);let f=e>q.aim[1]&&e<q.gunStow[0]?`squint`:e>q.turn[0]?`grim`:`neutral`;if(A.perform(e,f,!1,5),e>=q.gloveOff&&e<q.gloveOn){let t=du((e-q.gloveOff)/55);A.setOutfit(`thin${Math.min(3,Math.floor(t*4))}`)}else A.setOutfit(`suit`);A.holder.updateMatrixWorld(!0);let p=e>=q.gunOut&&e<q.gunStow[1];if(fe.visible=p,p)if(e>q.aim[0]+.6){let t=ze(Le(e),Math.min(e,300),Y()),n=st(Y()),r=t.sub(n).normalize(),i=d*1.2,a=yf(r,J);a.multiply(C.setFromAxisAngle(Y(1,0,0),-i)),ft.copy(a);let o=H(U(e,q.aim[0]+.6,q.aim[1]));fe.parent.getWorldQuaternion(ut);let s=ut.clone();pt(fe,s.slerp(ft,o))}else fe.quaternion.identity();if(e<q.gloveTwist[0]-.2){me.parent!==A.fig.anchors.handL&&A.fig.anchors.handL.add(me),me.position.set(0,.2,.6),me.scale.setScalar(1);let t=Rd.clone().sub(rt(Y())).normalize();e>q.scopeRaise[0]?pt(me,yf(t,J)):me.quaternion.setFromEuler(new Nn(-.6,0,0)),me.visible=!0}else if(e<q.scopeGrab){me.parent!==j&&j.add(me);let t=e-(q.gloveTwist[0]-.2);me.scale.setScalar(se),me.position.set(.1+t*.012,1.55-t*.03,.42+t*.004),me.rotation.set(.2+t*.05,t*.11,t*.03),me.visible=!0}else e<q.scopeMount?(me.parent!==A.fig.anchors.handL&&A.fig.anchors.handL.add(me),me.scale.setScalar(1),me.position.set(0,.3,.8),me.rotation.set(0,0,0),me.visible=!0):(me.parent!==fe&&fe.add(me),me.scale.setScalar(1),me.position.copy(od).add(Y(0,.55,-.4)),me.rotation.set(0,0,0),me.visible=p);_e.forEach((t,n)=>{let r=e>=q.magIn[n]-.3;t.visible=e>=q.gunOut+.2&&!r,t.position.set(-.12+n*.1,1.18+Math.sin(e*.8+n)*.01,.36),t.rotation.set(.3+e*.05*(n+1),.4,.1*n)}),ve.forEach((t,n)=>{let r=e-q.magOut[n];t.visible=r>=0&&r<30,t.visible&&(t.position.set(.1+r*.05,1.05-r*.12,.55+r*.02),t.rotation.set(r*1.3,r*.7,0))});{let t=e-q.gloveOff;if(ye.visible=t>=0&&e<q.gloveOn,ye.visible){let n=e=>new F(-.2-.5*(1-Math.exp(-e*.35)),1.3+.35*(1-Math.exp(-e*.3)),.4+.15*(1-Math.exp(-e*.4)));if(e<q.gloveCatch)ye.position.copy(n(t)),ye.rotation.set(t*.21,t*.13,t*.05);else{let t=H((e-q.gloveCatch)/.6);ye.position.copy(n(q.gloveCatch-q.gloveOff)).lerp(new F(-.25,1.12,.4),t)}}}let m=Ie(e),h=e-m;if(he.visible=p&&h>=0&&h<.05,he.visible){let e=he.getObjectByName(`flashSprite`);he.updateWorldMatrix(!0,!1);let t=he.getWorldPosition(Y()),n=t.distanceTo(i.position),r=Math.max(1,n*.02/(3.2*se));e.scale.setScalar(3.2*r),e.material.color.setRGB(1,.83,.54).multiplyScalar(n>100?14:6),he.rotation.z=m*17,ge.position.copy(t),ge.intensity=6*(1-h/.05)}else ge.intensity=0;{let t=e>=q.gloveOff&&e<q.gloveOn,n=!t||Math.floor(e*3)%2==0;ce.material.color.set(t?16722458:4259712).multiplyScalar(n?3.2:.3)}{let t=at(e),n=A.holder.getWorldPosition(Y()).distanceTo(i.position);ot.forEach((r,i)=>{r.visible=t>.01;let a=.8+.2*Math.sin(e*60+i*2.1);r.scale.setScalar(4.5*Math.max(1,n/12)),r.material.color.setRGB(.75,.9,1).multiplyScalar(2.6*t*a)})}{let t=A.holder.getWorldPosition(Y()).add(Y(0,_f,0).applyQuaternion(A.holder.quaternion)),n=t.distanceTo(i.position),r=H(U(n,15,60));de.visible=r>.01,de.position.copy(t),de.scale.setScalar(Math.max(1.2,n*.012));let a=at(e)>.9?1.4:0,o=e>q.sunGone?e*1.1%1<.22?1.6:.8:0;de.material.color.setRGB(1,.92,.82).multiplyScalar(r*(.5+1.2*Xd(e)+a+o))}Ge.forEach((t,n)=>{let r=(e-t.tf)/(t.ti-t.tf),i=r>5e-4&&(r<1||t.miss&&r<1.25);t.mesh.visible=i,i&&(qe(n,e,t.mesh.position),Cl(t.mesh,t.to.clone().sub(t.from).normalize(),J),t.mesh.rotateZ(e*160+n))});for(let t of et)t.mesh.position.copy(t.base).addScaledVector(t.drift,e-200),t.mesh.quaternion.setFromAxisAngle(t.axis,e*t.w+t.base.x);Je.update((t,n)=>mt(t,e,n)),Ye.update((t,n)=>{let r=hu(3100+t),i=Vd.clone().add(Y((r()-.5)*16,(r()-.3)*9,(r()-.5)*6)),a=Y(r()-.5,r()-.5,r()-.5).multiplyScalar(.25);n.p.copy(i).addScaledVector(a,e-230),n.size=1.2+r()*1.8+(e-230)*.03;let o=H(U(e,229+r()*3,234+r()*2)),s=1-H(U(e,244+r()*6,266+r()*6));return n.alpha=.03*o*s,n.c.setRGB(.92,.94,.98),n.alpha>.002}),Xe.update((t,n)=>gt(t,e,n)),Ze.update((t,n)=>_t(t,e,n,!1)),Qe.update((t,n)=>_t(t,e,n,!0)),$e.update((t,n)=>{let r=tt[Math.floor(t/6)],a=t%6;n.p.copy(r.start).addScaledVector(r.dir,r.speed*(e-170-a*.6));let o=n.p.distanceTo(i.position);return n.size=Math.max(.6,o*.0028)*(a===0?1:.6),n.alpha=a===0?.95:.35*(1-a/6),n.c.copy(r.col).multiplyScalar(a===0?2.2:.8),!0})}}}function Ef(){let e=ou(24,30),t=e.getContext(`2d`),n=(e,n,r,i,a)=>{t.fillStyle=a,t.fillRect(e,n,r,i)};n(0,0,24,30,`#2a241c`),n(2,2,20,26,`#bdb6a4`),n(4,21,16,7,`#e9e6dc`),n(10,21,4,3,`#2a2f3a`),n(5,23,3,1,`#c9a94a`),n(16,23,3,1,`#c9a94a`),n(8,11,8,9,`#b58d6c`),n(9,14,2,1,`#2a221c`),n(13,14,2,1,`#2a221c`),n(9,13,2,1,`#4a3a2c`),n(13,13,2,1,`#4a3a2c`),n(11,16,2,1,`#8f6b52`),n(10,18,4,1,`#6b4436`),n(6,7,12,3,`#efede6`),n(7,10,10,1,`#1d1d22`),n(11,8,2,1,`#d4b24a`);for(let e=0;e<7;e++)n(e,6-e,2,1,`#0b0b0d`);let i=new Zi(e);return i.magFilter=r,i.minFilter=r,i.generateMipmaps=!1,i.colorSpace=Re,i}function Df(){let e=.1,t=new V(28,60,32),n=new V(28,60,32),r=(e,t,n)=>Xl(e%6==0||n%6==0||(t-36)%8==0?11975876:14672870,.03,_u(Math.floor(e/3),Math.floor(t/3),Math.floor(n/3)));for(let e=36;e<60;e++)for(let n=0;n<32;n++)for(let i=0;i<28;i++)(i===0||i===27||n===0||n===31||e===36||e===59)&&t.set(i,e,n,r(i,e,n));for(let e=6;e<26;e++)for(let n=4;n<24;n++){let r=Math.hypot(n-13.5,e-15.5);r<9.5?t.set(n,36,e,null):r<10.5&&t.set(n,36,e,14263598)}for(let e=0;e<36;e++)for(let n=4;n<28;n++)for(let r=2;r<26;r++){let i=Math.hypot(r-13.5,n-15.5);i>=10.5&&i<11.6&&t.set(r,e,n,e%6==0?7173248:Xl(10134187,.04,_u(r,e,n)))}for(let e=4;e<28;e++)for(let n=2;n<26;n++){let r=Math.hypot(n-13.5,e-15.5);if(r>=9&&r<11.6){let r=Math.atan2(e-15.5,n-13.5);t.set(n,0,e,Math.floor((r+Math.PI)/(Math.PI/8))%2==0?14857266:2369066)}}for(let e=8;e<24;e++)for(let t=6;t<22;t++)t%8>1&&e%8>1&&n.set(t,58,e,15660799);for(let e=3;e<29;e++)t.set(1,48,e,14263598),t.set(26,48,e,14263598);for(let e=39;e<57;e++)for(let n=8;n<20;n++){let r=n===8||n===19||e===39||e===56;t.set(n,e,1,r?4083566:Xl(5597583,.05,_u(n,e))),e%6==0&&t.set(n,e,2,2830134)}for(let e=46;e<54;e++)for(let n=18;n<26;n++){let r=Math.hypot(e-49.5,n-21.5);r<3.2?t.set(27,e,n,null):r<4.3&&t.set(27,e,n,5989232)}for(let e=40;e<52;e++)for(let n=20;n<30;n++)t.set(1,e,n,n%5==0?9081500:13094098);return n.set(1,50,22,4710522).set(1,50,24,14725703),{shell:t.geometry(e,`min`).translate(-1.4,-3.6,-1.6),lights:n.geometry(e,`min`).translate(-1.4,-3.6,-1.6)}}function Of(){let e=new V(20,1,20);for(let t=0;t<20;t++)for(let n=0;n<20;n++){let r=Math.hypot(n-9.5,t-9.5);r>9.6||e.set(n,0,t,r>8.4?8094606:(n===9||n===10)&&r<6?14000442:12173512)}return e.geometry(.1,`center`)}function kf(){let e=new gi;e.background=null;let t=Df();e.add(Zl(t.shell,{roughness:.75,metalness:.1},{receive:!0})),e.add(Ql(t.lights,2.2));let n=new di;n.add(Zl(Of(),{roughness:.5,metalness:.3})),n.position.set(0,-3.55,0),e.add(n);let r=new L(new R(.22,.22,.12),new vr({color:16722458}));r.position.set(.9,-1.6,-.4),e.add(r);let i=new ja(16722458,3,6,2);i.position.copy(r.position).add(new F(-.25,0,.1)),e.add(i);let a=new L(new ea(.16,.2),new na({map:Ef(),roughness:.6}));a.position.set(.75,1.45,-1.37),a.rotation.y=-.08,e.add(a),e.add(new ba(14674431,4212304,.9));let o=new ja(15660287,6,8,2);o.position.set(0,2.1,0),e.add(o);let s=new Ea(16769720,4,4,.5,.6,2);s.position.set(.9,2.1,-.6),s.target.position.set(.75,1.4,-1.4),e.add(s,s.target);let c=new ja(14214911,2.2,5,2);c.position.set(-.6,-1.4,.5),e.add(c);let l=new Bu({face:Xu,heightM:1.8,exprs:[`neutral`,`blink`,`grim`],outfits:{suit:zu({stripe:`#b8322a`,flag:!0,rank:!0,seed:99})}}),u=Ju(l);u.setVisor(.86),e.add(l.holder);let d=new di,f=vd(hd(),{roughness:.5});d.add(f);let p=new L(new R(.02,.02,.01),new vr({color:4259712}));p.position.set(.04,.02,.06),d.add(p),e.add(d);let m=new F(0,1.2,0),h=new F(0,-1.8,0),g={armR:[-.25,0,.18],armL:[-.25,0,-.18],legR:[-.25,0,.05],legL:[-.1,0,-.05]},_={armR:[-1.2,0,-.25],armL:[-.3,0,-.2],legR:[-.25,0,.05],legL:[-.1,0,-.05],neck:[.35,0,0]},v={armR:[-1.45,.1,.1],armL:[-.4,0,-.2],legR:[-.2,0,.05],legL:[-.1,0,-.05],neck:[.15,.25,0]},y={armR:[-.6,.1,.15],armL:[-.3,0,-.2],legR:[-.2,0,.05],legL:[-.1,0,-.05],neck:[.05,.42,0]},b={armR:[-2.7,0,.35],armL:[-2.7,0,-.35],legR:[-.2,0,.05],legL:[-.1,0,-.05],neck:[-.1,0,0]},x=[[q.cabin,g],[q.locatorOff-.5,_],[q.locatorOff+.3,_],[q.locatorStrap-.2,v],[q.locatorStrap+.5,v],[171.4,y],[172.9,y],[q.helmetOn-.2,b],[q.helmetOn+.4,b],[q.helmetOn+1.2,g]],S=[[q.cabin,[.2,.25,.3]],[q.locatorStrap,[.45,.28,-.55]],[172.9,[.45,.3,-.5]],[174.6,[.1,.2,.1]]],C=[[q.cabin,Math.PI*.85],[q.locatorStrap-.6,Math.PI],[172.9,Math.PI],[174.6,Math.PI*.9]],w=[[q.airlock,[0,-2.6,.1]],[q.outerOpen[1],[0,-2.45,.1]],[181.6,[0,-3.4,.1]]],T=new F;return{scene:e,zhang:l,rig:u,photo:a,locator:d,outerDoor:n,cabinCentre:m,airlockCentre:h,headWorld(e=new F){return l.fig.anchors.head.updateWorldMatrix(!0,!1),l.fig.anchors.head.localToWorld(e.set(0,-4,0))},update(e){l.holder.visible=!0;let t=e>=q.airlock,a=e>=q.helmetOn-.55,o=6*(1-H(U(e,q.helmetOn-.15,q.helmetOn+.15)));if(u.helmet.visible=a,u.visor.visible=a,u.helmet.position.y=-4+o,u.visor.position.y=-4.5+o,u.helmetLamp.forEach(e=>{e.visible=a,e.position.y=-.9+o}),t){let t=wu(w,e);l.holder.position.copy(t),l.holder.rotation.set(.12,Math.PI,0),l.pose(Eu(g,Du(Hl(e*.6),.3)))}else{let t=wu(S,e);l.holder.position.copy(t),l.holder.rotation.set(0,(()=>{let t=0;for(let n=C.length-1;n>=0;n--)if(e>=C[n][0]){t=C[n][1];break}let n=C.findIndex(t=>t[0]>e);if(n>0){let r=C[n-1],i=C[n];t=r[1]+(i[1]-r[1])*H((e-r[0])/(i[0]-r[0]))}return t})(),0);let n=Eu(Tu(x,e),Du(Hl(e*.6),.25));l.pose(n)}l.perform(e,e>171.2&&e<173?`grim`:`neutral`,!1,5),l.holder.updateMatrixWorld(!0),e<q.locatorOff?(l.fig.joints.hips.localToWorld(T.set(-1.5,8,2.6)),d.position.copy(T),d.quaternion.copy(l.holder.quaternion)):e<q.locatorStrap?(l.fig.anchors.handR.getWorldPosition(d.position),d.quaternion.copy(l.holder.quaternion)):(d.position.set(.55,1.15,-1.36),d.rotation.set(0,0,.1)),p.visible=e*1.2%1<.15;let s=e>=q.airlockGreen;r.material.color.set(s?2883434:16722458).multiplyScalar(3),i.color.set(s?2883434:16722458),i.intensity=s?3:2+Math.sin(e*9)*1.2;let c=H(U(e,q.outerOpen[0],q.outerOpen[1]));n.position.set(c*2.3,-3.55-Math.min(1,c*4)*.12,0)}}}function Af(e){return(t,n,r,i)=>{let a=gu(t*17.1+n*31.7+r*7.3+e);return i<.8?5922146:a>.95?11844288:a>.82?6964784:a>.5?4077360:3156517}}function jf(){let e=new gi;e.background=null;let t=new L(eu(11,9,.006,Af(11),.55),Gl({roughness:.38,metalness:.3}));e.add(t);let n=new Pa(16773340,6.5);n.position.set(-3,1.2,1.5),e.add(n);let r=new Pa(5601211,.9);r.position.set(0,-1,.3),e.add(r);let i=new Pa(12112127,2);i.position.set(1.5,.6,-2.5),e.add(i);let a=new au(48,{additive:!0}),o=hu(5),s=new F(.45,.85,-.25).normalize(),c=new F(.55,-.2,.8).normalize(),l=Array.from({length:48},()=>[o()-.5,o()-.5,o()-.5]);return{scene:e,meteorite:t,streak:a,update(e,n){t.rotation.set(e*.37+.4,e*.23,e*.11),a.points.parent!==n.scene&&n.scene.add(a.points);let r=e>=yd.streak[0]-.05&&e<=yd.streak[1]+.05;if(a.points.visible=r,!r)return;let i=U(e,yd.streak[0],yd.streak[1]),o=n.earth.radius*n.earth.group.scale.x,u=n.earth.group.position.clone();a.update((e,t)=>{let n=e*.012,r=i-n;if(r<0)return!1;let a=s.clone().addScaledVector(c,(r-.5)*.34).normalize();t.p.copy(u).addScaledVector(a,o*1.012);let d=l[e];t.p.add(new F(d[0],d[1],d[2]).multiplyScalar(e/48*.35));let f=e===0,p=1-H(U(i,.75,1));return t.size=f?4.5:2.8*(1-e/48),t.alpha=(f?1:.8*(1-e/48))*p*H(i/.08),t.c.setRGB(1,.62-e/48*.3,.25-e/48*.15).multiplyScalar(f?6:3),!0})}}}var Mf=1.6;function Nf(e,t,n){let r=ou(4,128),i=r.getContext(`2d`),a=i.getImageData(0,0,4,128),o=new I(e),s=new I(t),c=new I(n),l=new I;for(let e=0;e<128;e++){let t=e/127;t<.6?l.copy(o).lerp(s,t/.6):l.copy(s).lerp(c,(t-.6)/.4);for(let t=0;t<4;t++){let n=(e*4+t)*4;a.data[n]=Math.round(l.r*255),a.data[n+1]=Math.round(l.g*255),a.data[n+2]=Math.round(l.b*255),a.data[n+3]=255}}i.putImageData(a,0,0);let u=new Zi(r);return u.colorSpace=Re,u}function Pf(e,t,n,r){let i=t,a=i%2==0?0:1;if((r+a)%4==0)return 9276036;let o=_u(Math.floor((r+a)/4),i,e+n);return Xl(o>.85?6251110:o>.6?7238006:8027522,.04,_u(e,t,n))}function Ff(){let e=.1,t=new V(52,46,420),n=new V(52,46,420),r=t=>Math.round((t+2.6)/e),i=t=>Math.round((2-t)/e);for(let n=0;n<420;n++)for(let r=0;r<52;r++){let i=-2.6+(r+.5)*e,a=Math.abs(i)<.12?5000528:Xl((r+Math.floor(n/2))%5==0?7039591:8815743,.06,_u(Math.floor(r/2),Math.floor(n/3)));t.set(r,0,n,a),t.set(r,1,n,a)}for(let e=0;e<420;e++)for(let n of[-1,1]){let i=n<0?r(-1.6)-1:r(Mf);for(let r=0;r<4;r++){let a=n<0?i-r:i+r;for(let n=2;n<32;n++)t.set(a,n,e,Pf(a,n,e,e));for(let n=32;n<35;n++)t.set(a,n,e,n===34?4013891:4935251)}let a=n<0?i+1:i-1;t.set(a,33,e,4013891);for(let n=2;n<6;n++)t.set(i,n,e,Xl(5592922,.05,_u(e,n)))}let a=i(-13.25),o=i(-14.75),s=r(-1.6)-1;for(let e=a;e<o;e++)for(let n=2;n<25;n++)for(let r=0;r<4;r++)t.set(s-r,n,e,null);for(let e=2;e<27;e++)for(let n of[a-1,a-2,o,o+1])for(let r=0;r<3;r++)t.set(s-r,e,n,9185824);for(let e=a-2;e<o+2;e++)for(let n=25;n<28;n++)for(let r=0;r<3;r++)t.set(s-r,n,e,n===26?2976346:9185824);for(let e=a-6;e<o+6;e++){let n=e<a-3||e>o+3;for(let r=-3;r<8;r++){let i=29+Math.floor(Math.max(0,r)/3)+ +!!n;t.set(s-r,i,e,(e+r)%2==0?3422011:4145735)}}for(let e of[a-4,o+1])for(let n=e;n<e+3;n++)for(let e=2;e<6;e++)for(let r=0;r<3;r++)t.set(s+1+r,e,n,10131600);for(let e=a;e<o;e++)for(let n=-1;n<3;n++)t.set(s+n,2,e,9407363);for(let e=a-4;e<o+4;e++)for(let n=4;n<10;n++)for(let r=2;r<3;r++)t.set(s-n,r,e,7170659);for(let e of[a-3,o+2])for(let t=21;t<24;t++)n.set(s+1,t,e,16738874);let c=hu(8),l=s-9,u=i(-18.5);for(let e=2;e<38;e++)t.set(l,e,u,3877408);let d=(e,n,r,i,a,o,s)=>{let l=e,u=n,d=r;for(let e=0;e<s;e++)if(l+=i+(c()-.5)*.6,u+=a+(c()-.3)*.5,d+=o+(c()-.5)*.6,t.set(Math.round(l),Math.round(u),Math.round(d),3877408),c()>.82){let e=Math.round(l+(c()-.5)*2),n=Math.round(u-1),r=Math.round(d+(c()-.5)*2);t.set(e,n,r,15759902).set(e+1,n,r,15034898).set(e,n-1,r,14180112)}};for(let e=0;e<9;e++)d(l,26+e*1.4,u,.55+c()*.5,.35,(c()-.5)*1.2,18+Math.floor(c()*8));for(let e=i(-6);e<i(-6)+1;e++)for(let n=0;n<52;n++)t.set(n,41+Math.round(Math.sin(n/8)*.6),e,1974050);for(let e=i(-22);e<i(-22)+1;e++)for(let n=0;n<52;n++)t.set(n,43+Math.round(Math.sin(n/9)*.6),e,1974050);let f=r(Mf)-2,p=i(-9);for(let e=p;e<p+17;e++)t.set(f,6,e,2833459);for(let e of[p+2,p+14])for(let n=0;n<24;n++){let r=n/24*Math.PI*2;t.set(f,Math.round(5+Math.sin(r)*3.4),Math.round(e+Math.cos(r)*3.4),1776413)}for(let e=6;e<10;e++)t.set(f,e,p+4,2833459);t.set(f,10,p+4,1118481).set(f,10,p+3,1118481);for(let e of[-26,-33]){let n=i(e+.5);for(let e=n;e<n+10;e++)for(let n=2;n<22;n++)t.set(r(Mf),n,e,n>19?2964042:7219746)}return{solid:Jl(t.geometry(e,`min`).translate(-2.6,0,0),2),glow:Jl(n.geometry(e,`min`).translate(-2.6,0,0),2)}}function If(e){let t=new V(7,3,5);return t.box(2,0,1,5,2,4,9080730),t.set(5,1,2,7172992).set(6,1,2,3816772),t.box(0,1,2,2,2,3,6120044),e?t.box(3,2,0,5,3,1,10133674).box(3,2,4,5,3,5,10133674):t.box(3,0,0,5,1,1,10133674).box(3,0,4,5,1,5,10133674),t.geometry(.06,`center`)}function Lf(){let e=new gi;e.background=Nf(`#5a7fae`,`#c9b48e`,`#f2c58e`),e.fog=new hi(13480078,18,46);let t=Ff(),n=Zl(t.solid,{roughness:.9},{cast:!0,receive:!0});e.add(n);let r=new L(t.glow,new vr({vertexColors:!0}));r.material.color.setScalar(2.5),e.add(r);let i=new di,a=new V(1,23,7);a.box(0,0,0,1,23,7,10169376);for(let[e,t]of[[6,2],[6,5],[10,2],[10,5],[14,2],[14,5],[18,2],[18,5]])a.set(0,e,t,14200906);let o=Zl(a.geometry(.1,`min`),{roughness:.6},{cast:!0,receive:!0});o.position.set(-.05,0,0),i.add(o),i.position.set(-1.85,.2,-14.72),e.add(i);let s=o.clone();s.position.set(-1.6-.3,.2,-13.98),e.add(s);let c=new Pa(16765600,3.4);c.position.set(14,7.5,6),c.target.position.set(0,0,-12),c.castShadow=!0,c.shadow.mapSize.set(2048,2048);let l=c.shadow.camera;l.left=-22,l.right=22,l.top=12,l.bottom=-12,l.near=1,l.far=60,c.shadow.bias=-5e-4,e.add(c,c.target),e.add(new ba(11060456,6969928,1.1));let u=If(!0),d=If(!1),f=new na({vertexColors:!0,roughness:.9}),p=Array.from({length:16},(t,n)=>{let r=new L(u,f);return e.add(r),{m:r,phase:gu(n*3.7)*Math.PI*2,r:5+gu(n*1.3)*2.5,h:6+gu(n*5.1)*1.8,s:.5+gu(n*9.2)*.08}}),m=new Bu({face:Xu,heightM:1.8,exprs:[`neutral`,`blink`],outfits:{coat:Iu}});e.add(m.holder);let h=new F(.25,0,-4.2),g=new F(-.85,0,-14);function _(e,t=new F){let n=U(e,15,W.gateOpen-.5);if(t.copy(h).lerp(g,n),e>W.gateOpen+.2){let n=H(U(e,W.gateOpen+.2,W.gateOpen+1.8));t.x=fu(g.x,-2.5,n)}return t}return{scene:e,zhang:m,gateLeaf:i,zhangPos:_,update(e){let t=_(e);m.holder.position.copy(t);let n=e<W.gateOpen-.5||e>W.gateOpen+.2&&e<W.gateOpen+1.8,r=H(U(e,W.gateOpen-.9,W.gateOpen-.2));m.holder.rotation.y=Math.PI+r*(Math.PI/2-.1);let a=n?Vl(e,1.25):{armR:[0,0,.05],armL:[0,0,-.05]};e>W.gateOpen-.4&&e<W.gateOpen+.6&&(a=Eu(a,{armL:[-1.2,0,-.1]})),m.pose(a),m.perform(e,`neutral`,!1,2);let o=H(U(e,W.gateOpen,W.gateOpen+1.4));i.rotation.y=-o*1.4,p.forEach((t,n)=>{let r=t.phase+e*t.s;t.m.position.set(Math.cos(r)*t.r-1,t.h+Math.sin(e*.9+n)*.3,-10+Math.sin(r)*t.r*.7),t.m.rotation.set(0,-r,Math.sin(e*2+n)*.2),t.m.geometry=Math.floor((e+n*.07)*9)%2==0?u:d})}}}var Rf=.1,zf=5976866,Bf=4269082,Vf=14274752;function Hf(){let e=new V(70,32,50),t=new V(70,32,50),n=e=>Math.round((e+3.5)/Rf),r=e=>Math.round((e+2.5)/Rf),i=e=>Math.round(e/Rf);for(let t=0;t<50;t++)for(let n=0;n<70;n++){let r=n%4==0||t%4==0;e.set(n,0,t,r?5789007:Xl(7762539,.06,_u(Math.floor(n/4),Math.floor(t/4))))}let a=(e,t,n)=>t<9?t===8?Bf:Xl(zf,.05,_u(e,t,n)):Xl(Vf,.025,_u(Math.floor(e/2),Math.floor(t/2),Math.floor(n/2)));for(let t=1;t<32;t++){for(let n=0;n<50;n++)e.set(0,t,n,a(0,t,n)),e.set(69,t,n,a(69,t,n));for(let n=0;n<70;n++)e.set(n,t,0,a(n,t,0)),e.set(n,t,49,a(n,t,49))}for(let t=0;t<50;t++)for(let n=0;n<70;n++)e.set(n,31,t,n%12<2?2890258:4863014);for(let t=0;t<70;t++)for(let n of[12,13,36,37])e.set(t,30,n,2890258);for(let t=r(.6);t<r(1.6);t++)for(let n=1;n<i(2.2);n++)e.set(69,n,t,null);for(let t=1;t<=i(2.2);t++)for(let n of[r(.6)-1,r(1.6)])e.set(69,t,n,Bf);for(let t=r(.6)-1;t<=r(1.6);t++)e.set(69,i(2.2),t,Bf);let o=r(-1),s=r(1),c=i(1),l=i(2.4);for(let n=o;n<s;n++)for(let r=c;r<l;r++){let i=n-o,a=r-c,u=i===0||i===s-o-1||a===0||a===l-c-1,d=i%4==0||a%4==0||(i+a)%8==0;u||d?e.set(0,r,n,u?Bf:5913128):(e.set(0,r,n,null),t.set(0,r,n,16773590))}for(let t=r(-.15);t<r(.15);t++)for(let n=i(2.6);n<i(2.9);n++)e.set(1,n,t,t===r(0)||n===i(2.75)?2038294:15261900);for(let t=n(1.6);t<n(2.2);t++)for(let r=i(.9);r<i(2.5);r++){let a=r===i(.9)||r===i(2.5)-1,o=(t+r*3)%7==0&&r>i(1.2)&&r<i(2.2)&&t>n(1.7)&&t<n(2.1);e.set(t,r,48,a?6965802:o?1841688:15525072)}return{solid:e.geometry(Rf,`min`).translate(-3.5,0,-2.5),glow:t.geometry(Rf,`min`).translate(-3.5,0,-2.5)}}function Uf(e){let t=new V(18,20,5),n=new V(18,20,5);for(let e=0;e<20;e++)for(let n=0;n<5;n++)for(let r=0;r<18;r++)r===0||r===17||e===19||e<=1?t.set(r,e,n,Xl(zf,.04,_u(r,e,n))):n===0?t.set(r,e,n,2106155):(e===6||e===10||e===14)&&n<4&&t.set(r,e,n,3941400);for(let e of[5,9,13,18])for(let t=1;t<17;t++)n.set(t,e,3,16774364);if(e)for(let e=3;e<15;e++)for(let n=1;n<4;n++){let r=(e===5||e===9||e===13)&&n===2;t.set(e,11,n,r?null:6034978),r&&t.set(e,10,n,2755088)}return{frame:t.geometry(Rf,`min`),strips:n.geometry(Rf,`min`)}}function Wf(e,t){return e===0?Af(t):(n,r,i,a)=>{let o=gu(n*13.1+r*7.7+i*3.3+t);return e===1?o>.75?9075298:o>.4?7233874:5918790:e===2?o>.6?9083450:o>.3?5001042:12100170:e===3?o>.7?10111542:7222310:a>.85?2762272:o>.5?10130570:8157038}}function Gf(e){let t=Af(e);return eu(e,6,.0078,(e,n,r,i)=>{if(r>14){let t=(e+n*.58)%4,r=(e-n*.58+40)%4;return t<.9||r<.9?14278114:9343897}return t(e,n,r,i)},.45)}function Kf(){let e=new V(9,8,9);e.box(0,7,0,9,8,9,zf),e.box(0,6,0,9,7,9,Bf);for(let[t,n]of[[0,0],[8,0],[0,8],[8,8]])e.box(t,0,n,t+1,6,n+1,Bf);return e.geometry(Rf,`min`)}function qf(){let e=new V(5,10,5);e.box(0,4,0,5,5,5,zf);for(let[t,n]of[[0,0],[4,0],[0,4],[4,4]])e.box(t,0,n,t+1,4,n+1,Bf);return e.box(0,5,0,5,10,1,Bf),e.box(1,6,0,4,9,1,zf),e.geometry(Rf,`min`)}function Jf(){let e=new V(9,8,24);e.box(0,7,0,9,8,24,zf);for(let[t,n]of[[0,0],[8,0],[0,23],[8,23]])e.box(t,0,n,t+1,7,n+1,Bf);return e.box(1,5,1,8,6,23,Bf),e.box(3,8,3,7,8,7,15657178),e.geometry(Rf,`min`)}function Yf(){let e=new V(7,8,6);return e.box(0,0,0,7,8,6,3033660),e.box(1,1,5,6,7,6,3627338),e.set(4,4,5,13214282).set(2,4,5,10132122),e.geometry(Rf,`min`)}function Xf(){let e=new V(5,4,10),t=new V(5,4,10);e.box(0,0,0,5,4,10,6962980);for(let t=1;t<5;t++)for(let n=1;n<3;n++)e.set(0,n,t,(n+t)%2?2759700:4861984);return t.box(0,2,6,1,3,9,16762992),e.set(0,1,7,14207136).set(0,1,8,14207136),{body:e.geometry(.07,`min`),dial:t.geometry(.07,`min`)}}function Zf(){let e=new V(9,6,6);return e.box(2,0,1,7,4,5,5911590),e.box(3,4,2,6,5,4,4860446),e.set(4,5,3,3809302),e.box(7,2,2,9,3,3,5911590),e.box(0,1,2,2,3,3,4860446),e.geometry(.022,`center`)}function Qf(){let e=new V(4,3,4);return e.box(0,0,0,4,3,4,15921126),e.box(0,2,0,4,3,4,3889818),e.box(1,2,1,3,3,3,9071146),e.geometry(.024,`center`)}function $f(){let e=new V(5,9,1);for(let t=0;t<9;t++)for(let n=0;n<5;n++)t>=4&&(n===0||n===4||t===4||t===8)?e.set(n,t,0,2761760):t>4&&t<8&&n>0&&n<4?e.set(n,t,0,13032678):t<4&&n===2&&e.set(n,t,0,5911330);return e.geometry(.25,`center`)}function ep(){let e=new V(3,6,1);e.box(0,0,0,3,6,1,1316120);let t=$l(.5,.95,.05,9425151,1.6);return t.position.set(0,0,.16),{body:e.geometry(.2,`center`),screen:t}}function tp(){let e=new gi;e.background=new I(723207);let t=Hf();e.add(Zl(t.solid,{roughness:.92},{receive:!0,cast:!0}));let n=Ql(t.glow,2.2);e.add(n);let r=[-2.9,-.9,1.1],i=null,a=[];r.forEach((t,n)=>{let r=Uf(n===1),o=Zl(r.frame,{roughness:.8},{receive:!0,cast:!0});o.position.set(t,0,-2.45),e.add(o);let s=Ql(r.strips,1.9);s.position.copy(o.position),e.add(s),a.push(s.material);let c=new L(new R(1.6,1.7,.01),new na({color:13623530,transparent:!0,opacity:.07,roughness:.05,metalness:.1,depthWrite:!1}));c.position.set(t+.9,1.05,-1.98),c.name=n===1?`middleGlass`:`glass${n}`,e.add(c);let l=new ja(16769716,1.4,1.8,2);l.position.set(t+.9,1.5,-2.15),e.add(l);let u=hu(40+n);for(let r of[.7,1.1,1.5,1.95]){if(n===1&&r===1.1)continue;let a=3+Math.floor(u()*2);for(let o=0;o<a;o++){let s=Math.floor(u()*5),c=3+Math.floor(u()*3),l=Zl(eu(n*31+o*7+Math.round(r*10),c,.011,Wf(s,o+n*10),.5),{roughness:.6,metalness:s===0?.5:.05},{cast:!0}),d=t+.25+(o+.5)*(1.3/a);if(l.position.set(d,r+.05+c*.011,-2.22),l.rotation.set(u()*3,u()*3,u()*3),e.add(l),r===1.5&&n!==1){let e=Math.abs(d-(t+.9))>.35,r=c+(s===2?10:0)+(n===0?.5:0)+(e?20:0);(!i||r>i.score)&&(i={pos:l.position.clone(),score:r})}let f=new L(new R(.09,.03,.09),new na({color:1710622,roughness:.4}));f.position.set(d,r+.015,-2.22),e.add(f)}}});let o=[0,1,2].map(t=>{let n=Zl(t===0?Gf(91):eu(92+t,6,.0078,Af(92+t),.5),{roughness:.4,metalness:.6},{cast:!0});return e.add(n),n}),s=e=>new F(-.9+(.55+e*.4),1.2,-2.22),c=Zl(Kf(),{roughness:.7},{cast:!0,receive:!0});c.position.set(-.45,0,-.15),e.add(c);let l=new L(new R(.42,.012,.3),new na({color:1915434,roughness:1}));l.position.set(0,.806,.12),l.name=`velvet`,e.add(l);let u=Zl(qf(),{roughness:.7},{cast:!0,receive:!0});u.position.set(1.12,0,.55),u.rotation.y=-Math.PI/2,e.add(u);let d=Zl(qf(),{roughness:.7},{cast:!0,receive:!0});d.position.set(-1.12,0,.05),d.rotation.y=Math.PI/2,e.add(d);let f=Zl(Jf(),{roughness:.75},{cast:!0,receive:!0});f.position.set(-3.45,0,-1.2),e.add(f);let p=new L(new R(.36,.48,.36),new na({color:Bf,roughness:.8}));p.position.set(-2.2,.24,-.1),e.add(p);let m=Zl(Yf(),{roughness:.5,metalness:.4},{cast:!0});m.position.set(2.7,0,-2.4),e.add(m);let h=Xf(),g=Zl(h.body,{roughness:.7});g.position.set(-2.95,.8,.62),g.rotation.y=Math.PI,e.add(g);let _=Ql(h.dial,2);_.position.copy(g.position),_.rotation.y=Math.PI,_.name=`radioDial`,e.add(_);let v=new V(5,9,5);v.box(1,0,1,4,1,4,1980972).box(2,1,2,3,7,3,2763306).box(0,7,0,5,9,5,1989178);let y=Zl(v.geometry(.06,`min`),{roughness:.5,metalness:.3},{cast:!0});y.position.set(-3.3,.8,-1.05),e.add(y);let b=$l(.22,.02,.22,16773320,4);b.position.set(-3.15,1.31,-.9),e.add(b);let x=new V(4,8,4);x.box(0,0,0,4,1,4,2763310).box(1,1,0,2,7,1,3816e3).box(1,5,1,2,8,3,1973794).box(0,3,1,3,4,3,6974064);let S=Zl(x.geometry(.06,`min`),{roughness:.4,metalness:.5},{cast:!0});S.position.set(-3.3,.8,.55),e.add(S);let C=Zl(Zf(),{roughness:.5},{cast:!0});e.add(C);let w=Qf(),T=[0,1].map(()=>{let t=new di;return t.add(Zl(w,{roughness:.3},{cast:!0})),e.add(t),t}),E=new ba(9074016,2761244,.55);e.add(E);let D=new Ea(16765600,160,0,.42,.5,2);D.position.set(-7.2,3.6,.9),D.target.position.set(-1,0,.1),D.castShadow=!0,D.shadow.mapSize.set(2048,2048),D.shadow.bias=-4e-4,D.shadow.camera.near=2,D.shadow.camera.far=14,e.add(D,D.target);let ee=new Ea(16773340,70,0,.5,.6,2);ee.position.set(6.5,2.4,1.2),ee.target.position.set(.8,0,.8),ee.castShadow=!0,ee.shadow.mapSize.set(1024,1024),e.add(ee,ee.target);let O=new Ea(16767392,5,3,.75,.6,2);O.position.set(-3.15,1.28,-.9),O.target.position.set(-2.95,.78,-.3),e.add(O,O.target);let te=new ja(16763024,1.4,6,2);te.position.set(.4,2.6,1.6),e.add(te);let ne=new au(320,{additive:!0});e.add(ne.points);let re=new Bu({face:Xu,heightM:1.8,exprs:[`neutral`,`blink`,`talk`,`smile`,`smileTalk`,`grim`],outfits:{coat:Iu}}),k=new Bu({face:Zu,heightM:1.72,exprs:[`neutral`,`blink`,`talk`,`smile`,`smileTalk`,`laugh`,`awkward`],outfits:{cardigan:Ru}});e.add(re.holder,k.holder);let ie=Zl($f(),{roughness:.3,metalness:.2});ie.position.set(0,.3,1.2),k.fig.anchors.handR.add(ie);let ae=ep(),A=Zl(ae.body,{roughness:.3,metalness:.4});A.add(ae.screen),A.position.set(0,.2,.8),A.rotation.x=-.9,re.fig.anchors.handR.add(A);let oe={legR:[-Math.PI/2,0,.05],legL:[-Math.PI/2,0,-.05],lift:-4.1,armR:[-.55,0,.1],armL:[-.5,0,-.1]},se={armR:[0,0,.06],armL:[0,0,-.06]},ce={hips:[.35,0,0],legR:[-Math.PI/2-.35,0,.05],legL:[-Math.PI/2-.35,0,-.05],lift:-4.3,armR:[-1.6,.2,.25],armL:[-.95,0,-.1],neck:[.25,0,0]},le=[[15,[-2.2,0,-.1]],[W.rise+.6,[-2.2,0,-.1]],[29.2,[-1.1,0,.55]],[33.2,[-1.1,0,.55]],[33.9,[-1.12,0,.05]],[W.toCase[0],[-1.12,0,.05]],[W.toCase[1],[0,0,-1.55]],[86.6,[0,0,-1.55]],[87.5,[-.55,0,.6]],[89.6,[-.55,0,.6]],[90.4,[-1.12,0,.05]],[200,[-1.12,0,.05]]],ue=[[15,-Math.PI/2],[W.lookUp,-Math.PI/2],[W.rise,Math.PI/2+.6],[27.6,Math.PI/2-.2],[29.2,Math.PI/2+.3],[33.9,Math.PI/2],[W.toCase[0],Math.PI/2],[W.toCase[0]+.6,Math.PI],[W.stoneOut,Math.PI],[W.stoneOut+.4,Math.PI/2+.5],[86.6,Math.PI/2+.5],[87.3,Math.PI/4],[89.6,Math.PI/4],[90.4,Math.PI/2]],de=[[15,[4.2,0,1.1]],[W.enter,[3.55,0,1.1]],[24.8,[1.75,0,1]],[29.6,[1.75,0,1]],[31,[1.12,0,.55]],[200,[1.12,0,.55]]],fe=[[15,-Math.PI/2],[24.8,-Math.PI/2],[25.6,-Math.PI/2-.9],[27.2,-Math.PI/2-.5],[28.4,-Math.PI/2+.25],[29.6,-Math.PI/2+.15],[31,-Math.PI/2],[W.toCase[0],-Math.PI/2],[W.toCase[1],-Math.PI/2-.55],[86.8,-Math.PI/2-.4],[88,-Math.PI/2]],pe=e=>{if(e<W.rise){let t=H(U(e,W.lookUp,W.lookUp+.6));return Eu(Tu([[0,ce],[1,{...ce,hips:[.05,0,0],legR:[-Math.PI/2-.05,0,.05],legL:[-Math.PI/2-.05,0,-.05],armR:[-.38,0,.15],neck:[-.05,0,0]}]],t),{neck:[Math.sin(e*.7)*.03,0,0]})}if(e<W.rise+.8)return Tu([[0,{...oe,armR:[-.38,0,.15]}],[1,se]],U(e,W.rise,W.rise+.8));if(e>W.rise+.8&&e<29.2||e>W.toCase[0]&&e<W.toCase[1]||e>86.6&&e<87.5||e>89.6&&e<90.4)return Vl(e,1.3);if(e>=29.2&&e<31)return{...se,armR:[-.9,.3,-.45]};if(e>=31&&e<33.2){let t=Math.sin(U(e,31,33)*Math.PI)*.35;return{...se,armR:[-1.15-t,.3,.15],armL:[-.5,0,-.2],neck:[.35,0,0]}}if(e>=33.2&&e<33.9)return Tu([[0,se],[1,oe]],U(e,33.2,33.9));if(e>=W.toCase[1]&&e<86.6){if(e<W.stoneOut+.3)return{...se,armR:[-1.55,0,.1],neck:[.15,0,0]};let t=Math.sin(e*2.2)*.06;return{...se,armR:[-1.25+t,.1,.05],neck:[.2,0,0]}}if(e>=87.5&&e<89.6){let t=(e-87.5)%.8;return{...se,armR:[-1-Math.sin(t/.8*Math.PI)*.35,.2,.1],neck:[.5,0,0]}}if(e>=90.4&&e<91.1)return Tu([[0,se],[1,oe]],U(e,90.4,91.1));let t={...oe};if(e>48.4&&e<53.4&&(t=Eu(t,{armR:[-.95+Math.sin(e*1.7)*.15,-.5,.25],neck:[-.1,.25,0]})),e>W.laugh[0]&&e<W.laugh[1]){let n=Math.sin(e*13)*.05;t=Eu(t,{armR:[-1.15,.45,.2],neck:[-.25+n,0,0],hips:[-.08+n*.5,0,0]})}return e>96.2&&e<99.2&&(t=Eu(t,{armL:[-2.3,0,-.3],neck:[.1,0,.12]})),e>67&&e<71.4&&(t=Eu(t,{armL:[-.75,.3,-.15]})),Eu(t,{neck:[Math.sin(e*.43)*.03,Math.sin(e*.31)*.06,0]})},me=e=>{if(e>W.enter-.2&&e<24.8||e>29.6&&e<31)return Vl(e,1.25);if(e<29.6)return{...se,neck:[-.05,Math.sin(e*.5)*.15,0]};if(e<31.8)return Tu([[0,se],[1,oe]],U(e,31,31.8));let t={...oe,armR:[-.6,0,.05],armL:[-.6,0,-.05]};return e>57.6&&e<62.6&&(t=Eu(t,{armR:[-.75*H(U(e,57.6,58.6))*(1-H(U(e,61.8,62.6))),0,0]})),e>35&&e<37.2&&(t=Eu(t,{neck:[.18*Math.sin(U(e,36.5,37.2)*Math.PI),0,0]})),e>W.phoneOut-.4&&e<103.4&&(t=Eu(t,{armR:[-.45,0,-.15],neck:[.3,0,0]})),e>53.6&&e<57.6&&(t=Eu(t,{neck:[0,Math.sin(U(e,53.6,55)*Math.PI*2)*.12,0]})),Eu(t,{neck:[Math.sin(e*.37)*.02,Math.sin(e*.27)*.04,0]})},he=e=>{let t=`smile`;return e<W.lookUp&&(t=`neutral`),e>W.laugh[0]&&e<W.laugh[1]&&(t=`laugh`),e>95.2&&e<99.4&&(t=`awkward`),e>101&&e<105.8&&(t=`neutral`),t},ge=e=>e>53.4&&e<63.6?`smile`:e>99?`grim`:`neutral`,_e=new F;return{scene:e,zhang:re,collector:k,irons:o,cups:T,head:(e,t=new F)=>(e.fig.anchors.head.updateWorldMatrix(!0,!1),e.fig.anchors.head.localToWorld(t.set(0,-4,0))),points:{table:new F(0,.8,.3),cabinet:new F(0,1.2,-2.2),tray:s(1),bench:new F(-2.9,.85,-.3),door:new F(3.5,1.4,1.1),radio:new F(-3.1,.95,.3),velvet:new F(0,.82,.12),alien:i?.pos??new F(-2,1.6,-2.22)},update(t,n=!1){for(let e of a)e.color.setScalar(n?.9:1.9);n?(D.color.set(16770756),D.intensity=210,D.position.set(-7,4.4,-.3),ee.intensity=40,E.intensity=.7):(D.color.set(16763024),D.intensity=160,D.position.set(-7.2,3.6,.9),ee.intensity=70,E.intensity=.55);let r=wu(le,n?15:t);if(k.holder.position.copy(r),k.holder.rotation.y=Cu(ue,n?15:t),n){let e=H(U(t,bd.pause,bd.pause+.8))*(1-H(U(t,347.6,349.6))),n=Tu([[0,ce],[1,{...ce,hips:[.1,0,0],armR:[-.9,0,.25],neck:[-.05,-.5,0]}]],e);k.pose(n),k.perform(t,`neutral`,Td(`收藏者`,t),3)}else k.pose(pe(t)),k.perform(t,he(t),Td(`收藏者`,t),3);ie.visible=n||t<W.rise+.4,re.holder.visible=!n,n||(re.holder.position.copy(wu(de,t)),re.holder.rotation.y=Cu(fe,t),re.pose(me(t)),re.perform(t,ge(t),Td(`章北海`,t,[`dialogue`]),5)),A.visible=!n&&t>W.phoneOut&&t<103.4,ae.screen.material.color.set(t>W.pay?8257448:9425151).multiplyScalar(1.6),C.position.set(.12,.84,-.02),C.rotation.set(0,.4,0),!n&&t>30.9&&t<33.1&&(k.fig.anchors.handR.updateWorldMatrix(!0,!1),k.fig.anchors.handR.getWorldPosition(C.position),C.rotation.set(0,Math.PI/2,Math.sin(U(t,31,33)*Math.PI)*.7));let i=[new F(.28,.83,.34),new F(-.28,.83,.3)];if(T.forEach((e,t)=>{e.visible=!n,e.position.copy(i[t]),e.rotation.set(0,t*.6,0)}),!n&&t>58&&t<62.2){re.fig.anchors.handR.updateWorldMatrix(!0,!1),re.fig.anchors.handR.getWorldPosition(_e);let e=H(U(t,58,58.6))*(1-H(U(t,61.6,62.2)));T[0].position.lerp(_e.add(new F(-.05,.09,0)),e)}let c=e=>new F(-.12+e*.12,.85,.12+(e===1?.04:0));o.forEach((e,r)=>{if(n){e.visible=!1;return}if(e.visible=!0,e.rotation.set(r*1.1,r*.7+.3,0),t>=W.stonesDown[r]){e.position.copy(c(r)),r===0&&e.rotation.set(-.5,.2,0);return}if(r===0&&t>=W.stoneOut){k.fig.anchors.handR.updateWorldMatrix(!0,!1),k.fig.anchors.handR.getWorldPosition(e.position),e.position.y+=.05,e.rotation.set(-.3+t*.1,t*.3,0);return}if(r>0&&t>=W.stonesDown[0]){k.fig.anchors.handR.updateWorldMatrix(!0,!1),k.fig.anchors.handR.getWorldPosition(e.position),e.position.y+=.04;return}e.position.copy(s(r))});let l=e.getObjectByName(`middleGlass`),u=n?0:H(U(t,W.glassSlide,W.glassSlide+.5))*(1-H(U(t,90,90.6)));l.position.x=0+u*.55,ne.update((e,n)=>{let r=hu(700+e),i=-3.2+r()*2.6,a=.4+r()*2.3,o=-.9+r()*1.8;n.p.set(i+Math.sin(t*.13+e)*.15,a+Math.sin(t*.09+e*1.7)*.2-(t*.01+r())%1*.1,o+Math.cos(t*.11+e)*.15);let s=Math.exp(-(((n.p.y-(1.9-(n.p.x+3.4)*.42))/.55)**2));return n.size=.006+r()*.006,n.alpha=.55*s*(.5+.5*Math.sin(t*2+e)),n.c.setRGB(1,.86,.66),n.alpha>.02})}}}var np=new F(-.35,1.18,.05);function rp(){let e=.2,t=new V(100,32,70),n=new V(100,32,70);for(let e=0;e<70;e++)for(let n=0;n<100;n++)t.set(n,0,e,Xl((n+e)%9==0?4014148:4869458,.05,_u(Math.floor(n/3),Math.floor(e/3)))),(n===40||n===60)&&e>10&&e<60&&t.set(n,0,e,13214266);for(let e=1;e<32;e++){for(let n=0;n<100;n++)t.set(n,e,0,e<6?5001558:6185832);for(let n=0;n<70;n++)t.set(0,e,n,5593438),t.set(99,e,n,5593438)}for(let e=0;e<6;e++){let r=6+e*15;for(let e=r;e<r+12;e++)for(let i=14;i<29;i++)(e-r)%4==0||i%5==4||e===r+11||i===14?t.set(e,i,0,2237738):(t.set(e,i,0,null),n.set(e,i,0,7311304))}for(let e=0;e<100;e+=12)for(let n=0;n<70;n++)t.set(e,30,n,2895667);let r=hu(3);for(let e=0;e<6;e++){let e=6+Math.floor(r()*80),i=6+Math.floor(r()*18);if(Math.abs(e-50)<14&&i>28&&i<42)continue;let a=6+Math.floor(r()*8),o=5+Math.floor(r()*6),s=5+Math.floor(r()*5);t.box(e,1,i,e+a,1+o,i+s,Xl(4151890,.08,r())),n.set(e+1,o-1,i+s,3407718)}return{solid:t.geometry(e,`min`).translate(-10,0,-7),glow:n.geometry(e,`min`).translate(-10,0,-7)}}function ip(){let e=.05,t=new V(52,36,26),n=new V(52,36,26),r=13225928;t.box(0,0,0,52,10,26,4014406),t.box(0,10,0,52,36,4,r),t.box(3,13,3,49,33,4,8225663),t.box(0,10,0,3,36,26,r),t.box(49,10,0,52,36,26,r),t.box(0,33,0,52,36,26,r),t.box(3,10,4,49,13,22,7107193),t.box(3,13,6,14,30,20,11186602),t.box(30,13,8,38,22,18,9344412),t.box(31,22,10,37,26,16,7107193),t.box(27,21,12,31,23,14,2764081),t.box(40,18,22,49,32,26,3027511);for(let e=41;e<48;e++)for(let t=25;t<31;t++)n.set(e,t,25,997924);n.set(42,20,25,2883434).set(45,20,25,16724770),t.box(0,9,25,52,10,26,14263598);for(let e=8;e<44;e++)n.set(e,32,10,15398143);return{body:t.geometry(e,`center`).translate(0,.9,0),glow:n.geometry(e,`center`).translate(0,.9,0)}}function ap(){let e=ou(48,32),t=e.getContext(`2d`),n={0:[`111`,`101`,`101`,`101`,`111`],1:[`010`,`110`,`010`,`010`,`111`],2:[`111`,`001`,`111`,`100`,`111`],3:[`111`,`001`,`111`,`001`,`111`],4:[`101`,`101`,`111`,`001`,`001`],5:[`111`,`100`,`111`,`001`,`111`],6:[`111`,`100`,`111`,`101`,`111`],7:[`111`,`001`,`010`,`010`,`010`],8:[`111`,`101`,`111`,`101`,`111`],9:[`111`,`101`,`111`,`001`,`111`]},i=(e,r,i,a,o)=>{t.fillStyle=o;let s=r;for(let r of e){let e=n[r];if(e)for(let n=0;n<5;n++)for(let r=0;r<3;r++)e[n][r]===`1`&&t.fillRect(s+r*a,i+n*a,a,a);s+=4*a}},a=new Zi(e);a.magFilter=r,a.minFilter=r,a.generateMipmaps=!1,a.colorSpace=Re;let o=``,s=(e,n)=>{let r=`${e}:${n}`;r!==o&&(o=r,t.fillStyle=`#03140b`,t.fillRect(0,0,48,32),t.fillStyle=`#1a5a32`,t.fillRect(2,2,44,1),i(String(e).padStart(3,`0`),6,6,3,`#56ff9a`),i(String(n).padStart(4,`0`),8,24,1,`#2fbf6a`),i(`762`,30,24,1,`#2fbf6a`),a.needsUpdate=!0)};return s(0,0),{tex:a,draw:s}}function op(){let e=new gi;e.background=new I(197637),e.fog=new mi(461328,.03);let t=rp();e.add(Zl(t.solid,{roughness:.95},{receive:!0,cast:!0})),e.add(Ql(t.glow,2.2));let n=ip(),r=Zl(n.body,{roughness:.55,metalness:.25},{cast:!0,receive:!0});e.add(r),e.add(Ql(n.glow,2.2));let i=new L(new R(1.2,.9,.02),new na({color:12572386,transparent:!0,opacity:.16,roughness:.1,metalness:.2,depthWrite:!1}));e.add(i);let a=new L(new R(1.24,.06,.05),new na({color:9344412,roughness:.5}));e.add(a);let o=ap(),s=new L(new ea(.34,.24),new vr({map:o.tex}));s.position.set(.97,1.42,.651),e.add(s);let c=new di,l=new V(4,8,8);l.fill((e,t,n)=>Math.hypot(t-3.5,n-3.5)<4?e===3&&(Math.abs(t-3.5)<.6||Math.abs(n-3.5)<.6)?2764081:10397100:null),c.add(Zl(l.geometry(.04,`center`),{roughness:.35,metalness:.7})),c.position.copy(np),e.add(c);let u=Zl(eu(91,6,.0078,Af(91),.45),{roughness:.4,metalness:.6});e.add(u);let d=new V(10,2,2);d.box(0,0,0,10,2,2,10133672);let f=Zl(d.geometry(.004,`min`),{roughness:.3,metalness:.8});e.add(f);let p=$l(.008,.008,.008,16777215,1);e.add(p);let m=new V(16,9,8);m.box(0,8,0,16,9,8,6975349);for(let[e,t]of[[0,0],[15,0],[0,7],[15,7]])m.box(e,0,t,e+1,8,t+1,4014406);let h=Zl(m.geometry(.1,`min`),{roughness:.6,metalness:.4},{receive:!0,cast:!0});h.position.set(1.6,0,.6),e.add(h);let g=new L(new R(.34,.03,.22),new na({color:3817285,roughness:.5,metalness:.5}));g.position.set(2.15,.915,.95),e.add(g);let _=new V(2,3,2);_.box(0,0,0,2,3,2,9080982).box(0,2,0,2,3,2,13225683);let v=_.geometry(.004,`center`),y=new na({vertexColors:!0,roughness:.3,metalness:.8}),b=Array.from({length:36},(t,n)=>{let r=new L(v,y),i=hu(n+3);return r.position.set(2.15+(i()-.5)*.26,.937,.95+(i()-.5)*.15),r.rotation.set(Math.PI/2,i()*3,i()*3),e.add(r),r}),x=new L(new R(.16,.2,.06),new na({color:2829094,roughness:.9}));x.position.set(1.85,1,.75),e.add(x);let S=$l(1.6,.05,.12,15398143,3.5);S.position.set(0,3.2,.4),e.add(S);let C=new Ea(14675711,0,0,.8,.55,2);C.position.set(0,3.15,.6),C.target.position.set(.1,.9,.5),C.castShadow=!0,C.shadow.mapSize.set(1024,1024),e.add(C,C.target);let w=new ja(15398143,0,2.2,2);w.position.set(-.1,1.55,.1),e.add(w);let T=new Pa(8364e3,2.6);T.position.set(-3,6,-8),T.castShadow=!0,T.shadow.mapSize.set(2048,2048);let E=T.shadow.camera;E.left=-14,E.right=14,E.top=12,E.bottom=-12,E.near=.5,E.far=40,T.shadow.bias=-8e-4,e.add(T,T.target),e.add(new ba(3820144,1052692,1.8));let D=new Ea(16773340,0,3,.7,.6,2);D.position.set(2.2,1.75,1.05),D.target.position.set(2.15,.9,.95),e.add(D,D.target);let ee=$l(.12,.04,.12,16773340,3);ee.position.set(2.2,1.77,1.05),e.add(ee);let O=new ja(9425151,0,1.8,2);e.add(O);let te=new ja(16752704,0,1.6,2);te.position.copy(np).add(new F(.12,0,.1)),e.add(te);let ne=new au(160,{additive:!0});e.add(ne.points);let re=new au(60,{soft:!0});e.add(re.points);let k=new Bu({face:Xu,heightM:1.8,exprs:[`neutral`,`blink`,`talk`,`grim`],outfits:{coat:Iu}});e.add(k.holder);let ie=new di,ae=new L(new R(.6,1.2,.15),new na({color:1316120,roughness:.3})),A=$l(.5,1,.02,9425151,1.8);A.position.z=.09,ie.add(ae,A),ie.position.set(0,.2,.6),k.fig.anchors.handR.add(ie);let oe=new L(new R(.15,.15,1.6),new na({color:9080982,metalness:.7,roughness:.35}));oe.position.set(0,0,.9),k.fig.anchors.handL.add(oe);let se=[[105.8,[-6.5,0,4.6]],[G.answer,[-5.2,0,3.9]],[111.2,[-2,0,2.6]],[G.hangUp,[-.9,0,1.6]],[G.lightOn+.4,[-.3,0,1.25]],[G.sweep[0]-.3,[-.3,0,1.25]],[G.sweep[0],[1,0,1.4]],[G.lightOff,[1,0,1.4]],[132,[.6,0,2.2]]],ce=[[105.8,2.3],[G.hangUp,2.6],[G.lightOn+.4,Math.PI],[G.sweep[0]-.3,Math.PI],[G.sweep[0],Math.PI+.5],[G.lightOff,Math.PI+.6]],le={armR:[0,0,.06],armL:[0,0,-.06]},ue={armR:[-2.5,.5,-.45],armL:[0,0,-.06],neck:[0,-.15,0]},de={armR:[-1.15,0,-.05],armL:[-1.1,0,.05],neck:[.45,0,0],hips:[.12,0,0],legR:[-.12,0,0],legL:[-.12,0,0]},fe=e=>{let t=e<111.2||e>G.sweep[0]-.3&&e<G.sweep[0]||e>G.lightOff?Vl(e,1.2):le;if(e>G.answer-.3&&e<G.hangUp+.3){let n=H(U(e,G.answer-.3,G.answer+.2))*(1-H(U(e,G.hangUp,G.hangUp+.4)));t=Eu(t,{armR:[ue.armR[0]*n,ue.armR[1]*n,ue.armR[2]*n]})}if(e>G.lightOn+.4&&e<G.sweep[0]-.3&&(t=Tu([[0,le],[1,de]],H(U(e,G.lightOn+.4,G.clamp)))),e>G.sweep[0]&&e<G.lightOff){let n=Math.sin(e*7)*.25;t={...de,armR:[-1+n,.2,0],armL:[-.7,0,.1]},e>G.toolOut-.4&&(t={...de,armL:[-1.3,0,.1],armR:[-.5,0,.1]})}return e>G.lightOff-.4&&e<G.lightOff+.2&&(t=Eu(t,{armR:[-1.4,0,.3]})),t},pe=new F;return{scene:e,zhang:k,points:{spindle:np.clone(),screen:s.position.clone(),tray:g.position.clone(),lathe:new F(0,1.1,0)},head(e=new F){return k.fig.anchors.head.updateWorldMatrix(!0,!1),k.fig.anchors.head.localToWorld(e.set(0,-4,0))},update(e){k.holder.position.copy(wu(se,e)),k.holder.rotation.y=Cu(ce,e),k.pose(fe(e)),k.perform(e,e>G.lightOn?`grim`:`neutral`,Td(`章北海`,e,[`dialogue`]),5),ie.visible=e>G.ring-.2&&e<G.hangUp+.4,oe.visible=e>G.toolOut-.5&&e<G.lightOff,A.material.color.set(9425151).multiplyScalar(e<G.answer?1.2+Math.sin(e*12)*.6:1.4),ie.visible?(ie.updateWorldMatrix(!0,!1),ie.getWorldPosition(O.position),O.intensity=1.6):O.intensity=0;let t=e>=G.lightOn&&e<G.lightOff,n=e<G.lightOn+.6&&Math.floor((e-G.lightOn)*22)%3==0?.15:1;C.intensity=t?45*n:0,w.intensity=t&&e>G.start?.6:0,D.intensity=t?3.5*n:0,ee.material.color.set(16773340).multiplyScalar(t?3*n:.05),S.material.color.set(15398143).multiplyScalar(t?3.5*n:.08);let r=1-H(U(e,G.doorClose-.4,G.doorClose))+H(U(e,G.cut[1]+.2,G.cut[1]+.8));i.position.set(.05+Math.min(1,r)*.9,1.25,.67),a.position.set(i.position.x,1.72,.67);let s=e>=G.start&&e<G.cut[1]+.4,l=s?Math.round(1800*H(U(e,G.start,G.start+.9))):0;c.rotation.x=s?(e-G.start)*21:0;let d=H(U(e,G.cut[0],G.cut[0]+2.6));u.visible=e>G.clamp-.6&&e<G.counter[0],u.position.copy(np).add(new F(.1,0,0)),u.scale.set(1,1-d*.55,1-d*.55),u.rotation.set(c.rotation.x,.3,.2),e<G.clamp&&(k.fig.anchors.handR.updateWorldMatrix(!0,!1),k.fig.anchors.handR.getWorldPosition(pe),u.position.lerp(pe,1-H(U(e,G.clamp-.6,G.clamp)))),f.visible=e>=G.counter[0]&&e<G.cut[1]+.4,f.position.copy(np).add(new F(.06,-.004,-.004)),f.rotation.x=c.rotation.x,p.position.copy(np).add(new F(.12+Math.sin(e*3)*.01,.04,.02)),p.visible=s;let m=e<G.counter[0]?Math.floor(U(e,G.cut[0],G.counter[0])*6):e<G.drops[0]?6+Math.floor(U(e,G.counter[0],G.counter[1])*18):Math.min(36,24+Math.floor(U(e,G.drops[0],G.drops[1])*12.99));o.draw(e>G.start?m:0,l),b.forEach((t,n)=>t.visible=n<(e<G.drops[0]?Math.max(0,m-12):m));let h=e>G.cut[0]&&e<G.cut[1];te.intensity=h?1.2+Math.sin(e*40)*.5:0,ne.update((t,n)=>{if(!h)return!1;let r=hu(t*7+1),i=.35+r()*.3,a=(e+r()*5)%i,o=.4+r()*1.2,s=.6+r()*1.4,c=(r()-.2)*1.4;return n.p.copy(np).add(new F(.12,.02,.03)),n.p.x+=o*a,n.p.y+=s*a-4.9*a*a,n.p.z+=c*a,n.size=.006+r()*.006,n.alpha=1-a/i,n.c.setRGB(1,.6+r()*.3,.2).multiplyScalar(3),!0}),re.update((t,n)=>{if(!h)return!1;let r=hu(t*13+5),i=(e*.5+r())%1;return n.p.copy(np).add(new F(.15+i*.3,.05+i*.4,(r()-.5)*.3)),n.size=.05+i*.2,n.alpha=.12*(1-i),n.c.setRGB(.8,.86,.9),!0}),x.visible=e>G.sweep[0]-.5&&e<G.lightOff}}}var sp=.8,cp=new F(-.2,sp,-.18),lp=.055,up=new F(-1.55,.72,-1.35),dp=-.46;function fp(){let e=new V(40,23,35),t=(e,t,n)=>{let r=_u(Math.floor(e/3),Math.floor(t/4),Math.floor(n/3));return Xl(r>.8?5923157:r>.5?7041637:7633516,.06,_u(e,t,n))};for(let n=0;n<35;n++)for(let r=0;r<40;r++)e.set(r,0,n,Xl(6184794,.07,_u(r,n))),e.set(r,22,n,t(r,22,n));for(let n=1;n<22;n++){for(let r=0;r<40;r++)e.set(r,n,0,t(r,n,0)),e.set(r,n,34,t(r,n,34));for(let r=0;r<35;r++)e.set(0,n,r,t(0,n,r)),e.set(39,n,r,t(39,n,r))}for(let t=0;t<40;t++)e.set(t,21,4,7031346).set(t,21,6,4086378).set(t,20,6,4086378);e.box(18,0,22,21,1,25,2763562);for(let t=0;t<6;t++)e.box(33,1,28-t*2,39,2+t*3,30-t*2,6712160);return e.geometry(.1,`min`).translate(-2,0,-1.75)}function pp(){let e=new V(12,8,8);e.box(0,7,0,12,8,8,7227952);for(let[t,n]of[[0,0],[11,0],[0,7],[11,7]])e.box(t,0,n,t+1,7,n+1,4861984);return e.geometry(.1,`min`)}function mp(){let e=new V(6,6,6);return e.fill((e,t,n)=>(e+t+n)%3==0?8018488:9071172),e.geometry(.1,`min`)}function hp(e){let t=new V(12,6,10);return t.fill((t,n,r)=>e?n===5?null:n>=1&&n<=4&&t>1&&t<10&&r>1&&r<8?Math.abs(Math.sin(t*.9+r*.35+n*1.7))<.16?15257540:n===4?(t*7+r*3)%5==0?8264224:10101288:9051170:t===1||t===10||r===1||r===8?n%2==0?14205040:3828400:15526626:t===0||t===11||r===0||r===9||n===5?(t+r)%4==0?14277074:15526626:15131868),t.geometry(.06,`min`)}function gp(e){let t=new V(3,7,3);return t.box(0,0,0,3,4,3,3813926),t.box(0,3,0,3,4,3,2761756),e===`copper`&&t.box(0,4,0,3,6,3,12088122).set(1,6,1,13206602),e===`stone`&&t.box(0,4,0,3,6,3,7304314).set(1,6,1,10133670),t.geometry(.0028,`center`)}function _p(){let e=new gi;e.background=new I(131586),e.add(Zl(fp(),{roughness:.95},{receive:!0}));let t=Zl(pp(),{roughness:.8},{cast:!0,receive:!0});t.position.set(-.6,0,-.4),e.add(t);let n=new L(new R(.9,.006,.6),new na({color:2898478,roughness:1}));n.position.set(0,.803,0),n.receiveShadow=!0,e.add(n);let r=Zl(mp(),{roughness:.9},{cast:!0,receive:!0});r.position.set(-1.9,0,-1.7),e.add(r);let i=Zl(hp(!1),{roughness:.95},{cast:!0,receive:!0}),a=Zl(hp(!0),{roughness:.8},{cast:!0,receive:!0});for(let t of[i,a])t.position.set(up.x-.36,.6,up.z-.3),e.add(t);let o=[0,1,2,3].map(t=>{let n=new L(new R(.018,.018,.004),new vr({color:1708560}));return n.position.set(up.x-.1+t*.06+t%2*.01,.74+t%3*.02,up.z+.302),e.add(n),n}),s=gp(`copper`),c=gp(`stone`),l=gp(`none`),u=new na({vertexColors:!0,roughness:.5,metalness:.4}),d=Array.from({length:36},(t,n)=>{let r=new L(s,u);return r.position.set(cp.x+n%6*lp,.812,cp.z+Math.floor(n/6)*lp),r.castShadow=!0,e.add(r),r}),f=new L(new R(.03,.012,.16),new na({color:10496546,roughness:.5}));f.position.set(.25,.81,.1),e.add(f);let p=new L(new R(.03,.03,.12),new na({color:14211280,roughness:.4}));p.position.set(.3,.8160000000000001,-.12),e.add(p);let m=new L(new R(.032,.032,.03),new na({color:13119530}));m.position.copy(p.position).add(new F(0,0,.02)),e.add(m);let h=new V(22,6,16);h.box(0,0,0,22,6,16,2303531).box(1,1,1,21,6,15,null).box(1,1,1,21,2,15,3817528);let g=Zl(h.geometry(.01,`center`),{roughness:.5,metalness:.4},{cast:!0,receive:!0});g.position.set(dp,.8300000000000001,.14),e.add(g);let _=new L(new R(.22,.012,.16),new na({color:2830133,roughness:.5,metalness:.4}));e.add(_);let v=$l(.07,.09,.07,16769192,6);v.position.set(-.1,1.95,.05),e.add(v);let y=new L(new R(.01,.3,.01),new na({color:1118481}));y.position.set(-.1,2.15,.05),e.add(y);let b=new ja(16766362,0,0,2);b.position.copy(v.position).add(new F(0,-.06,0)),b.castShadow=!0,b.shadow.mapSize.set(1024,1024),b.shadow.bias=-.002,e.add(b);let x=new ba(3815984,1052688,0);e.add(x);let S=new Ea(16763024,0,1.4,.85,1,2);S.position.set(.05,.84,0),S.target.position.set(.05,1.3,.6),e.add(S,S.target);let C=new ja(16767136,0,0,2);e.add(C);let w=new au(240,{soft:!0});e.add(w.points);let T=new au(40,{});e.add(T.points);let E=new Bu({face:Xu,heightM:1.8,exprs:[`neutral`,`blink`,`grim`,`squint`],outfits:{sweater:Lu}});e.add(E.holder);let D=vd(id(),{metalness:.55,roughness:.38});E.fig.anchors.handR.add(D);let ee=new L(new R(1.4,1.4,2.2),new vr({color:new I(1,.86,.6).multiplyScalar(12)}));ee.position.copy(ad).add(new F(0,0,1.2)),D.add(ee);let O=vd(fd());E.fig.anchors.handL.add(O),O.position.set(0,.6,.6);let te=new L(new R(.5,.3,2.6),new na({color:10496546,roughness:.5}));te.position.set(0,0,1.4),E.fig.anchors.handR.add(te);let ne=new L(new R(.12,.4,3),new na({color:13225684,metalness:.8,roughness:.2}));ne.position.set(0,0,1.8),E.fig.anchors.handR.add(ne);let re={legR:[-Math.PI/2-.1,0,.05],legL:[-Math.PI/2-.1,0,-.05],lift:-4,armR:[-1.48,.12,.05],armL:[-1.45,-.12,-.05],neck:[.32,0,0],hips:[.1,0,0]},k={armL:[-1.15,.2,-.2],armR:[-.25,0,.08],neck:[.55,.12,0],hips:[.08,0,0]},ie={armR:[-Math.PI/2+.05,.18,.1],armL:[-Math.PI/2+.07,.18,-.26],neck:[.06,.15,0],hips:[0,.35,0]},ae={armR:[-1.35,0,.1],armL:[-1.25,0,-.1],neck:[.6,0,0],hips:[.35,0,0],legR:[-.35,0,0],legL:[-.35,0,0],lift:-2},A=[[132,re],[144.6,re],[145.15,ie],[148.6,ie],[149.2,ae],[158.55,ae],[158.6,k],[163.75,k],[163.8,re],[168,re]],oe=new L(new R(.34,.46,.34),new na({color:4861984,roughness:.85}));oe.position.set(.05,.23,.68),oe.castShadow=!0,e.add(oe);let se=new F(up.x+.82,0,up.z+.42),ce=Math.atan2(up.x-se.x,up.z-se.z),le=new F(-.6,0,-.75),ue=Math.atan2(-.1-le.x,.05-le.z),de=e=>e<144.6?{p:new F(.05,0,.62),yaw:Math.PI}:e<148.8?{p:new F(.3,0,.75),yaw:Math.PI+.62}:e<158.6?{p:se,yaw:ce}:e<163.8?{p:le,yaw:ue}:{p:new F(.05,0,.62),yaw:Math.PI},fe=e=>{let t=0;for(let n of K.shots){let r=e-n;r>=0&&r<.09&&(t=Math.max(t,1-r/.09))}return t};return new F,{scene:e,zhang:E,points:{table:new F(0,sp,0),grid:cp.clone().add(new F(lp*2.5,0,lp*2.5)),target:up.clone(),bulb:v.position.clone()},head(e=new F){return E.fig.anchors.head.updateWorldMatrix(!0,!1),E.fig.anchors.head.localToWorld(e.set(0,-4,0))},hand(e=new F){return E.fig.anchors.handL.updateWorldMatrix(!0,!1),E.fig.anchors.handL.getWorldPosition(e)},palm(e=new F,t){let n=E.fig.anchors.handL;return n.updateWorldMatrix(!0,!1),t&&t.set(0,1,0).transformDirection(n.matrixWorld),n.localToWorld(e.set(0,2.25,-1))},update(e){let t=e>=K.chain&&e<K.chainOff;b.intensity=t?9:0,x.intensity=t?.35:0,S.intensity=t?.75:0,v.material.color.set(16769192).multiplyScalar(t?6:.05);let n=de(e);E.holder.position.copy(n.p),E.holder.rotation.y=n.yaw;let r=Tu(A,e);e>K.pulls[0]-.3&&e<K.tips+.6&&(r=Eu(r,{armR:[Math.sin(e*9)*.08,0,0]}));for(let t of K.shots){let n=e-t;n>=0&&n<.3&&(r=Eu(r,{armR:[-.25*Math.exp(-n*18),0,0],armL:[-.22*Math.exp(-n*18),0,0]}))}E.pose(r),E.perform(e,e>145&&e<148.6?`squint`:`grim`,!1,5),D.visible=e>K.load[0]-.4&&e<148.9,O.visible=e>K.load[0]-.6&&e<K.insert,te.visible=e>K.pulls[0]-.4&&e<K.glue-.2,ne.visible=e>K.knife[0]-.3&&e<K.knife[1]+.2;let u=fe(e);ee.visible=u>.3,u>0?(ee.updateWorldMatrix(!0,!1),ee.getWorldPosition(C.position),C.intensity=70*u):C.intensity=0;let f=e<K.pulls[0]?0:Math.min(36,Math.floor(1+U(e,K.pulls[0],K.glue)*36)),p=e<K.glue?0:Math.min(36,Math.floor(U(e,K.glue,K.tips+.5)*36.99)),m=K.load.filter(t=>e>=t).length;d.forEach((t,n)=>{t.geometry=n<p?c:n<f?l:s;let r=e>=163.8&&n>=4;if(t.visible=!(n<m)&&!(e>=K.caseLatch&&r),r&&e<K.caseLatch){let e=n-4;t.position.set(-.537+e%8*.022,.8300000000000001,.107+Math.floor(e/8)*.022)}else t.position.set(cp.x+n%6*lp,.812,cp.z+Math.floor(n/6)*lp)});let h=e<K.caseLatch-.6?1:1-H(U(e,K.caseLatch-.6,K.caseLatch));_.position.set(dp,.8640000000000001+h*.07,.14-h*.08),_.rotation.x=-h*1.2,o.forEach((t,n)=>t.visible=e>K.shots[n]&&e<K.unwrap[0]);let g=e>=K.unwrap[0]+.8;i.visible=!g,a.visible=g,w.update((n,r)=>{let i=hu(n*3+11),a=e-K.shots[n%4]-i()*.1;if(a<0||a>22)return!1;let o=new F(-.15,1.3,.25),s=up.clone().sub(o).normalize();return r.p.copy(o).addScaledVector(s,(1-Math.exp(-a*2.5))*(.3+i()*.6)),r.p.x+=(i()-.5)*a*.12,r.p.y+=a*.025+(i()-.5)*.15*Math.min(1,a),r.p.z+=(i()-.5)*a*.12,r.size=.06+Math.min(a,6)*.07+i()*.05,r.alpha=(t?.11:0)*Math.exp(-a*.12)*Math.min(1,a*8),r.c.setRGB(.72,.72,.68),r.alpha>.003});let y=e>158.4&&e<163.8,re=E.fig.anchors.handL;y&&re.updateWorldMatrix(!0,!1),T.update((e,t)=>{if(!y)return!1;let n=hu(e*5+2);re.localToWorld(t.p.set((n()-.5)*2.4,2.3+n()*.15,-.3-n()*2.2)),t.size=.004+n()*.006;let r=n()>.82;return t.c.setRGB(.07,.065,.06).multiplyScalar(r?5:1),!0})}}}function X(e,t,n,r){return{id:e,start:t,end:n,update:({context:e,time:i})=>{let a=Math.max(0,i-t);r({ctx:e,t:i,lt:a,p:du(a/(n-t)),dur:n-t})}}}function vp(e,t=0,n=0){let r=0;return t>0&&(r=Math.max(r,1-du(e.lt/t))),n>0&&(r=Math.max(r,1-du((e.dur-e.lt)/n))),r}var Z=(e=0,t=0,n=0)=>new F(e,t,n),yp=Z(0,0,1);function bp(e){let t=e.ctx.grade;t.contrast=1.08,t.saturation=.96,t.lift.setRGB(0,.004,.012),t.vignette=.5,t.grain=.028,t.bloomStrength=.85,t.bloomRadius=.55,t.bloomThreshold=.72,t.toneExposure=1.05}function xp(e){let t=t=>{t.ctx.scene=e.scene,t.ctx.backdrop=e.backdrop.scene,e.update(t.t,t.ctx.camera),bp(t)},n=t=>{e.backdrop.update(t.t,t.ctx.camera),e.update(t.t,t.ctx.camera)},r=()=>e.zhangHead(),i=(e,t,n,i=1,a=0)=>{let o=r(),s=t.clone().sub(o).normalize(),c=Z(xu(e.t*1.7,1),xu(e.t*1.9,2),xu(e.t*1.3,3)).multiplyScalar(n*.012*i),l=t.clone().add(c).addScaledVector(J,a*n*.35),u=l.clone().addScaledVector(s,-150),d=vt.radToDeg(2*Math.atan(n/2/150));B(e.ctx.camera,u,l,d,J,0,20,1e6),e.ctx.grade.scope=1,e.ctx.grade.reticle=1,e.ctx.grade.vignette=.25;let f=o.distanceTo(t);e.ctx.overlay.scopeText=`${Math.round(f).toLocaleString(`en-US`).replace(`,`,` `)} m`},a=e=>{let t=0;for(let n=0;n<3;n++)for(let r=0;r<10;r++){let i=e-(q.fire[n]+r*q.fireStep);i>=0&&i<.3&&(t+=Math.exp(-i*16))}return Math.min(1.3,t)},o=t=>e.headOf(e.targets[t]);return[X(`s03-vista`,q.vista,191,e=>{t(e);let r=Bd.clone().addScaledVector(Wd,-13+e.p*1.5).addScaledVector(J,1.15).addScaledVector(Gd,2.6),i=Rd.clone().lerp(Z(0,0,0),.42);B(e.ctx.camera,r,i,17.5-e.p*1.2,J,0,.05,1e6),n(e),e.ctx.grade.fade=vp(e,.4,0),e.ctx.overlay.caption=`黄河空间站外 · 五公里`,e.ctx.overlay.captionOpacity=H(U(e.t,182.4,183.4))*(1-H(U(e.t,187.6,188.8)))}),X(`s04-hero`,191,198,e=>{t(e);let r=Bd,i=-.35+e.p*.3,a=r.clone().addScaledVector(Wd,4.6*Math.cos(i)).addScaledVector(Gd,4.6*Math.sin(i)-.6).addScaledVector(J,-.9+e.p*.3),o=Z(0,-1,0),s=r.clone().addScaledVector(J,.25).clone().sub(a).normalize().lerp(o,.28).normalize();B(e.ctx.camera,a,a.clone().addScaledVector(s,10),36,J,.05,.05,1e6),n(e)}),X(`s05-alone`,198,207,e=>{t(e);let r=Bd,i=3.5+e.p**1.8*30,a=Gd.clone().multiplyScalar(-1).addScaledVector(Wd,-.55).addScaledVector(J,.3).normalize(),o=r.clone().addScaledVector(a,i),s=new F().crossVectors(a,J).normalize();B(e.ctx.camera,o,r.clone().addScaledVector(s,-i*.18),32,J,-.06,.1,1e6),n(e)}),X(`s06-touch`,207,210.6,e=>{t(e);let r=Vd.clone().add(Z(4,14,2)),i=r.clone().add(Z(0,-1e3,18));B(e.ctx.camera,r,i,33-e.p*2,Z(1,0,0),0,.5,1e6),n(e),e.ctx.grade.bloomStrength=1.1}),X(`s07-scope-up`,210.6,214,e=>{t(e);let i=r(),a=i.clone().addScaledVector(Gd,-2.1+e.p*.2).addScaledVector(Wd,1.35).addScaledVector(J,-.25);B(e.ctx.camera,a,i.clone().addScaledVector(Wd,.25).addScaledVector(J,-.35),34,J,0,.05,1e6),n(e)}),X(`s08-scope-hatch`,214,218,e=>{t(e),i(e,Rd.clone().add(Z(1.5,-7,.5)),24-e.p*3),n(e)}),X(`s09-ring`,218,222,e=>{t(e);let i=r(),a=Yd(e.t),o=i.clone().addScaledVector(Wd,1.6).addScaledVector(J,.25).addScaledVector(Gd,.55),s=i.clone().sub(o).normalize(),c=a.clone().lerp(s,.42).normalize();B(e.ctx.camera,o,o.clone().addScaledVector(c,100),40,Z(1,0,0),0,.05,1e6),n(e),e.ctx.grade.bloomStrength=1.25}),X(`s10-scope-emerge`,222,231,e=>{t(e);let r=H(U(e.t,225.4,230.5)),a=Rd.clone().add(Z(1,-9,.5)).lerp(Vd.clone().add(Z(0,24,.5)),r);i(e,a,fu(24,40,r)),n(e)}),X(`s11-arrange`,231,237,e=>{t(e);let r=Vd.clone().add(Z(7.5-e.p*1.5,-11.5,3.2)),i=Vd.clone().add(Z(-.6,2.2,.7));B(e.ctx.camera,r,i,40,yp,0,.1,1e6),n(e)}),X(`s12-limb`,237,242,e=>{t(e);let r=Yd(e.t),i=Bd.clone().addScaledVector(Wd,-3),a=r.clone().lerp(Z(0,-1,0),.32+e.p*.04).normalize();B(e.ctx.camera,i,i.clone().addScaledVector(a,100),7.5,yp,0,.05,1e6),n(e),e.ctx.grade.bloomStrength=1.1,e.ctx.grade.saturation=1.08}),X(`s13-front-row`,242,250,e=>{t(e);let r=Vd.clone(),i=r.clone().add(Z(1.6-e.p*1.8,-4.6,.25)),a=r.clone().add(Z(.2-e.p*.4,.4,.7));B(e.ctx.camera,i,a,34,yp,0,.05,1e6),n(e)}),X(`s14-scope-faces`,250,255,e=>{t(e);let r=o(0),a=o(1),s=o(2),c=mu(U(e.t,251.2,251.9)),l=mu(U(e.t,252.9,253.6)),u=r.clone().lerp(a,c).lerp(s,l);i(e,u,1.5,.6),n(e)}),X(`s15-glove`,255,258.6,e=>{t(e);let r=Bd.clone().addScaledVector(Gd,2-e.p*.15).addScaledVector(Wd,.9).addScaledVector(J,.45);B(e.ctx.camera,r,Bd.clone().addScaledVector(Wd,.35).addScaledVector(J,.42),38,J,0,.02,1e6),n(e)}),X(`s16-turn`,258.6,261.2,r=>{t(r);let i=e.zhangHand(),a=Bd.clone().addScaledVector(Wd,-.45).addScaledVector(Gd,2.3).addScaledVector(J,.55);B(r.ctx.camera,a,i.clone().lerp(e.zhangHead(),.45),36,J,0,.05,1e6),n(r)}),X(`s17-assemble`,261.2,264.2,e=>{t(e);let r=Bd.clone().addScaledVector(Gd,-2.1).addScaledVector(Wd,.85).addScaledVector(J,.45);B(e.ctx.camera,r,Bd.clone().addScaledVector(Wd,.45).addScaledVector(J,.35),36,J,0,.03,1e6),n(e)}),X(`s18-aim`,264.2,268.2,e=>{t(e);let r=Bd.clone().addScaledVector(Gd,-2.7).addScaledVector(Wd,.9+e.p*.3).addScaledVector(J,.25);B(e.ctx.camera,r,Bd.clone().addScaledVector(Wd,.75).addScaledVector(J,.32),30,J,0,.05,1e6),n(e)}),X(`s19-fire1`,268.2,271,r=>{t(r);let i=e.muzzleWorld(),a=e.aimPoint(0,r.t).sub(i).normalize(),o=i.clone().addScaledVector(a,-.42).addScaledVector(Gd,.2).addScaledVector(J,0);B(r.ctx.camera,o,i.clone().addScaledVector(a,3).addScaledVector(J,-.04),42,J,0,.02,1e6),n(r)}),X(`s20-fire2`,271,274.4,e=>{t(e);let r=o(2).addScaledVector(yp,-.35),s=o(1),c=mu(U(e.t,273.5,274.2)),l=Math.sin(du((e.t-q.magOut[1])/.7)*Math.PI)*.8,u=r.clone().lerp(s,c).addScaledVector(yp,-l);i(e,u,1.9,.8,a(e.t)*.5),n(e)}),X(`s21-firefly`,274.4,278.4,e=>{t(e);let r=Vd.clone().add(Z(-1.2+e.p*.4,6.5,4.6)),i=Bd.clone().addScaledVector(yp,-390);B(e.ctx.camera,r,i,30,yp,0,.1,1e6),n(e),e.ctx.grade.bloomStrength=1}),X(`s22a-slug`,278.4,284,r=>{t(r);let i=e.bullets[20],a=i.to.clone().sub(i.from).normalize(),o=e.bulletPos(20,r.t),s=new F().crossVectors(a,J).normalize(),c=o.clone().addScaledVector(a,-.05+r.p*.012).addScaledVector(s,.016).addScaledVector(J,.007);B(r.ctx.camera,c,o.clone().addScaledVector(a,.02),30,J,.04,.002,1e6),n(r),r.ctx.grade.fade=vp(r,.25,0)}),X(`s22b-face`,284,289,e=>{t(e);let i=r(),a=i.clone().addScaledVector(Wd,1.45-e.p*.25).addScaledVector(Gd,.22).addScaledVector(J,-.05);B(e.ctx.camera,a,i.clone().addScaledVector(J,-.08),26,J,0,.02,1e6),n(e)}),X(`s22c-wait`,289,293.4,e=>{t(e),i(e,o(1).addScaledVector(yp,-.6),4.2-e.p*.6,.5),n(e)}),X(`s22d-slug`,293.4,297.2,r=>{t(r);let i=e.bullets[0],a=i.to.clone().sub(i.from).normalize(),o=e.bulletPos(0,r.t),s=new F().crossVectors(a,J).normalize(),c=o.clone().addScaledVector(a,-.06).addScaledVector(s,-.02).addScaledVector(J,.012);B(r.ctx.camera,c,o.clone().addScaledVector(a,.6),34,J,-.05,.002,1e6),n(r)}),X(`s22e-smile`,297.2,301,e=>{t(e);let r=Vd.clone(),i=r.clone().add(Z(.3,-3.6+e.p*.4,.3));B(e.ctx.camera,i,r.clone().add(Z(0,.3,.68)),30,yp,0,.05,1e6),n(e)}),X(`s23-impact`,301,303.6,e=>{t(e);let r=Vd.clone(),i=r.clone().add(Z(.5,-6.8,.7));B(e.ctx.camera,i,r.clone().add(Z(0,.9,.75)),40,yp,0,.05,1e6),n(e)}),X(`s24-visor`,303.6,306.6,e=>{t(e);let r=o(1),i=r.clone().add(Z(.18,-.95+e.p*.12,.05));B(e.ctx.camera,i,r.clone().add(Z(0,0,-.03)),30,yp,.03,.02,1e6),n(e),e.ctx.grade.bloomStrength=1}),X(`s25-scream`,306.6,309.2,r=>{t(r);let i=e.headOf(e.members[6]),a=e.headOf(e.members[7]),o=i.clone().lerp(a,.5),s=o.clone().add(Z(.15,-2.3+r.p*.2,-.25));B(r.ctx.camera,s,o.clone().add(Z(0,0,-.05)),34,yp,-.04,.05,1e6),n(r)}),X(`s26-retreat`,309.2,313.4,e=>{t(e);let r=Vd.clone().add(Z(-4.5,-11+e.p*3,-3.5));B(e.ctx.camera,r,Rd.clone().add(Z(0,-6,0)),56,yp,0,.1,1e6),n(e)}),X(`s27-scope-close`,313.4,318.2,e=>{t(e),i(e,Rd.clone().add(Z(1,-10+H(e.p)*4,.5)),26-e.p*6,.7),n(e),e.ctx.grade.fade=vp(e,0,.2)}),X(`s28-after`,318.2,322,e=>{t(e);let r=Bd.clone().addScaledVector(Wd,2.7).addScaledVector(Gd,-1.3).addScaledVector(J,.1);B(e.ctx.camera,r,Bd.clone().addScaledVector(J,.2).addScaledVector(Gd,-.15),34,J,0,.05,1e6),n(e)}),X(`s29-depart`,322,334.6,e=>{t(e);let r=Z(0,1,0).addScaledVector(Kd,-Kd.y).normalize(),i=new F().crossVectors(Kd,r).normalize(),a=Bd.clone().addScaledVector(Kd,-6.5).addScaledVector(r,1.3).addScaledVector(i,2.4),o=Bd.clone().addScaledVector(Kd,18+mu(e.p)*140).addScaledVector(r,.4);B(e.ctx.camera,a,o,36,r,0,.05,1e6),n(e),e.ctx.grade.fade=vp(e,0,1.2)})]}var Sp=new F(-.83,.33,.41).normalize();function Cp(e,t,n=.006){return e.clone().add(Z(xu(t*.7,1)*n,xu(t*.6,2)*n,xu(t*.5,3)*n))}function wp(e){let t=e.ctx.grade;t.contrast=1.06,t.saturation=.94,t.lift.setRGB(.012,.008,.012),t.gain.setRGB(1.04,.99,.9),t.vignette=.55,t.grain=.04,t.bloomStrength=.55,t.bloomThreshold=.85,t.toneExposure=1.15}function Tp(e){let t=e.ctx.grade;t.contrast=1.1,t.saturation=.82,t.lift.setRGB(0,.01,.02),t.gain.setRGB(.92,1,1.06),t.vignette=.6,t.grain=.045,t.bloomStrength=.65,t.bloomThreshold=.8,t.toneExposure=1.1}function Ep(e){let t=e.ctx.grade;t.contrast=1.12,t.saturation=.78,t.lift.setRGB(.008,.01,.004),t.gain.setRGB(1.05,1,.86),t.vignette=.7,t.grain=.055,t.bloomStrength=.6,t.bloomThreshold=.8,t.toneExposure=1.15}function Dp(e){let{prologue:t,hutong:n,collector:r,workshop:i,basement:a,cabin:o,space:s}=e,c=(e,n,r)=>{e.ctx.scene=t.scene,e.ctx.backdrop=s.backdrop.scene,s.backdrop.update(e.t,e.ctx.camera,{dir:Sp,t:150}),s.backdrop.earth.group.position.copy(n),s.backdrop.earth.group.scale.setScalar(r),s.backdrop.earth.setSun(Sp,1,new I(1,.96,.9),.4),s.backdrop.sun.set(Sp.clone().multiplyScalar(2600),new I(1,.95,.88),1,1),t.update(e.t,s.backdrop)},l=(e,t=!1)=>{e.ctx.scene=r.scene,e.ctx.backdrop=null,r.update(e.t,t),wp(e)},u=e=>{e.ctx.scene=i.scene,e.ctx.backdrop=null,i.update(e.t),Tp(e)},d=e=>{e.ctx.scene=a.scene,e.ctx.backdrop=null,a.update(e.t),Ep(e)},f=e=>{e.ctx.scene=o.scene,e.ctx.backdrop=s.backdrop.scene,s.backdrop.update(e.t,e.ctx.camera),o.update(e.t);let t=e.ctx.grade;t.contrast=1.05,t.saturation=.85,t.gain.setRGB(.95,1,1.05),t.vignette=.5,t.grain=.03,t.toneExposure=1},p=e=>r.head(e===`zhang`?r.zhang:r.collector);return[X(`p1-iron`,0,7.5,e=>{c(e,Z(0,-2600,0),.9);let t=.4-mu(e.p)*.08,n=Z(.09,1,.16).normalize().multiplyScalar(t);B(e.ctx.camera,n,Z(0,-.012,0),30,Z(0,0,-1),0,.01,1e5),s.backdrop.update(e.t,e.ctx.camera,{dir:Sp,t:150}),s.backdrop.earth.group.position.set(0,-2600,0),s.backdrop.earth.group.scale.setScalar(.9),s.backdrop.earth.setSun(Sp,1,new I(1,.96,.9),.4),e.ctx.grade.fade=vp(e,2.2,0),e.ctx.grade.bloomStrength=.9,e.ctx.grade.vignette=.6}),X(`p2-fall`,7.5,15,e=>{c(e,Z(0,-620,0),1),t.meteorite.visible=!1;let n=Z(0,0,0),r=Z(.25,-1,-.08).normalize().multiplyScalar(100);B(e.ctx.camera,n,r.add(Z(e.p*2,0,0)),34,Z(0,0,-1),0,.01,1e5),s.backdrop.update(e.t,e.ctx.camera,{dir:Sp,t:150}),s.backdrop.earth.group.position.set(0,-620,0),s.backdrop.earth.group.scale.setScalar(1),s.backdrop.earth.setSun(Sp,1,new I(1,.96,.9),.4),e.ctx.overlay.title=`尘世之外`,e.ctx.overlay.titleSub=`根据刘慈欣《三体Ⅱ·黑暗森林》片段改编`,e.ctx.overlay.titleOpacity=H(U(e.t,yd.title[0],yd.title[0]+1.4))*(1-H(U(e.t,yd.title[1]-.8,yd.title[1]))),e.ctx.grade.fade=vp(e,0,.9),e.ctx.grade.bloomStrength=.9}),X(`c01-hutong`,15,22,e=>{e.ctx.scene=n.scene,e.ctx.backdrop=null,n.update(e.t),wp(e),e.ctx.grade.toneExposure=1.05,e.ctx.grade.saturation=1;let t=n.zhangPos(e.t),r=Z(.55,.62,fu(-.6,-6.6,mu(e.p)));B(e.ctx.camera,Cp(r,e.t,.01),Z(-.5,2.5,t.z-9),52,Z(0,1,0),0,.05,200),e.ctx.overlay.caption=`北京 · 胡同深处`,e.ctx.overlay.captionOpacity=H(U(e.t,15.8,16.8))*(1-H(U(e.t,19.8,20.8))),e.ctx.grade.fade=vp(e,.6,0)}),X(`c02a-reveal`,22,25.8,e=>{l(e);let t=Z(-3,1.38,2.05-e.p*.1);B(e.ctx.camera,Cp(t,e.t,.004),Z(-.2,.98,-1.15),50,Z(0,1,0),0,.05,50)}),X(`c02b-lookup`,25.8,29.8,e=>{l(e);let t=p(`collector`),n=Z(-.7-e.p*.25,1.32,1.35);B(e.ctx.camera,Cp(n,e.t),t.clone().add(Z(0,-.05,0)),38,Z(0,1,0),0,.05,50)}),X(`c03-tea`,29.8,34.6,e=>{l(e),B(e.ctx.camera,Cp(Z(.25,1.5,2.45-e.p*.15),e.t),Z(0,.95,.3),44,Z(0,1,0),0,.05,50)}),X(`c04-two`,34.6,41,e=>{l(e),B(e.ctx.camera,Cp(Z(.05+e.p*.15,1.28,2.3-e.p*.2),e.t),Z(0,1.18,.3),36,Z(0,1,0),0,.05,50)}),X(`c05-zhang`,41,43.4,e=>{l(e);let t=p(`zhang`);B(e.ctx.camera,Cp(Z(-1.6,1.44,1.05),e.t),t.clone().add(Z(0,-.05,0)),26,Z(0,1,0),0,.05,50)}),X(`c06-collector`,43.4,49.6,e=>{l(e);let t=p(`collector`),n=H(e.p);B(e.ctx.camera,Cp(Z(2.15-n*.2,1.55,1.8-n*.1),e.t),t.clone().add(Z(0,-.06,0)),fu(22,19,n),Z(0,1,0),0,.05,50)}),X(`c06b-shelves`,49.6,53.6,e=>{l(e);let t=r.points.alien,n=mu(e.p),i=t.clone().add(Z(fu(.2,.07,n),fu(.06,.025,n),fu(.8,.3,n)));B(e.ctx.camera,i,t.clone().add(Z(0,-.004,0)),fu(30,25,n),Z(0,1,0),0,.02,50),e.ctx.grade.bloomStrength=.7}),X(`c07-zhang`,53.6,58.4,e=>{l(e);let t=p(`zhang`),n=H(e.p);B(e.ctx.camera,Cp(Z(-1.5+n*.1,1.4,1.12),e.t),t.clone().add(Z(0,-.12,0)),fu(30,27,n),Z(0,1,0),0,.05,50)}),X(`c07b-cup`,58.4,61.7,e=>{l(e);let t=r.cups[0].getWorldPosition(Z()),n=p(`zhang`);B(e.ctx.camera,t.clone().add(Z(-.9,.12,.66)),t.clone().lerp(n,.5),30,Z(0,1,0),0,.02,50)}),X(`c07c-zhang`,61.7,63.6,e=>{l(e);let t=p(`zhang`);B(e.ctx.camera,Cp(Z(-1.38,1.4,1.1),e.t),t.clone().add(Z(0,-.1,0)),25,Z(0,1,0),0,.05,50)}),X(`c08-laugh`,63.6,71.4,e=>{l(e);let t=p(`collector`);B(e.ctx.camera,Cp(Z(2.2,1.55,1.85),e.t,.008),t.clone().add(Z(0,-.14,0)),25,Z(0,1,0),0,.05,50)}),X(`c09-request`,71.4,79.3,e=>{l(e),B(e.ctx.camera,Cp(Z(1.95-e.p*.2,1.52,2.3),e.t),Z(-.25,1.1,.2),38,Z(0,1,0),0,.05,50)}),X(`c10-cabinet`,79.3,86.5,e=>{l(e);let t=p(`collector`).clone().lerp(Z(0,1.2,-2.1),.35);B(e.ctx.camera,Cp(Z(1.25,1.45,.55),e.t),t,40,Z(0,1,0),0,.05,50)}),X(`c11-velvet`,86.5,90,e=>{l(e);let t=r.points.velvet;B(e.ctx.camera,Z(.08,1.32-e.p*.05,.5),t.clone().add(Z(0,0,.02)),32,Z(0,1,0),0,.02,50),e.ctx.grade.bloomStrength=.7}),X(`c12-price`,90,96.2,e=>{l(e),B(e.ctx.camera,Cp(Z(0,1.3,2.05-e.p*.15),e.t),Z(0,1.12,.3),34,Z(0,1,0),0,.05,50)}),X(`c13-awkward`,96.2,99.2,e=>{l(e);let t=p(`collector`);B(e.ctx.camera,Cp(Z(2.15,1.55,1.8),e.t),t.clone().add(Z(0,-.02,0)),17,Z(0,1,0),0,.05,50)}),X(`c14-respect`,99.2,104.2,e=>{l(e);let t=p(`zhang`),n=mu(e.p);B(e.ctx.camera,Z(-1.35+n*.2,1.37,1-n*.06),t.clone().add(Z(0,-.04,0)),fu(24,19,n),Z(0,1,0),0,.05,50)}),X(`c15-puzzled`,104.2,105.8,e=>{l(e);let t=p(`collector`);B(e.ctx.camera,Z(2.15,1.52,1.8),t.clone().add(Z(0,-.03,0)),14,Z(0,1,0),0,.05,50),e.ctx.grade.fade=vp(e,0,.6)}),X(`w01-hall`,105.8,111.2,e=>{u(e),B(e.ctx.camera,Z(-8.2+e.p*1.2,1.35,6.5),Z(-1.2,2.3,-2),46,Z(0,1,0),0,.05,100),e.ctx.overlay.caption=`太空军某研究所 · 模型车间 · 夜`,e.ctx.overlay.captionOpacity=H(U(e.t,106.4,107.2))*(1-H(U(e.t,110.2,111))),e.ctx.grade.fade=vp(e,.5,0)}),X(`w02-phone`,111.2,115.6,e=>{u(e);let t=i.head(),n=i.zhang.holder.rotation.y,r=Z(Math.sin(n),0,Math.cos(n)),a=Z(Math.cos(n),0,-Math.sin(n)),o=t.clone().addScaledVector(r,1).addScaledVector(a,.5).add(Z(0,.02,0));B(e.ctx.camera,Cp(o,e.t),t.clone().addScaledVector(a,-.06).add(Z(0,-.06,0)),30,Z(0,1,0),0,.05,100)}),X(`w03-lathe`,115.6,118.6,e=>{u(e),B(e.ctx.camera,Z(1.85,1.55,2.7-e.p*.2),Z(-.1,1.05,.2),42,Z(0,1,0),0,.05,100)}),X(`w04-cut`,118.6,121.8,e=>{u(e);let t=i.points.spindle;B(e.ctx.camera,Z(.32,1.32,.62),t.clone().add(Z(.06,0,0)),28,Z(0,1,0),0,.02,100),e.ctx.grade.bloomStrength=.9}),X(`w05-counter`,121.8,124.4,e=>{u(e);let t=i.points.screen;B(e.ctx.camera,t.clone().add(Z(-.12,.02,.42-e.p*.06)),t.clone(),24,Z(0,1,0),0,.02,100)}),X(`w06-tray`,124.4,127.4,e=>{u(e);let t=i.points.tray;B(e.ctx.camera,t.clone().add(Z(.05,.4,.22)),t.clone(),28,Z(0,1,0),0,.02,100)}),X(`w07-clean`,127.4,130.6,e=>{u(e),B(e.ctx.camera,Cp(Z(2.7,1.55,2.6),e.t),Z(.6,1.1,.8),38,Z(0,1,0),0,.05,100)}),X(`w08-dark`,130.6,132,e=>{u(e),B(e.ctx.camera,Z(-1.6,1.8,5.2),Z(.4,1,.6),40,Z(0,1,0),0,.05,100),e.ctx.grade.fade=vp(e,0,.5)}),X(`b01-grid`,132,135.6,e=>{d(e);let t=a.points.grid;B(e.ctx.camera,t.clone().add(Z(0,.42-e.p*.05,-.02)),t.clone().add(Z(0,0,-.03)),34,Z(0,0,-1),0,.02,30),e.ctx.overlay.caption=`某处 · 地下室`,e.ctx.overlay.captionOpacity=H(U(e.t,133,133.8))*(1-H(U(e.t,134.8,135.5)))}),X(`b02-pliers`,135.6,141.6,e=>{d(e);let t=a.points.grid;B(e.ctx.camera,Cp(Z(.28,1.04,.32),e.t,.004),t.clone().add(Z(.04,0,.06)),30,Z(0,1,0),0,.02,30)}),X(`b03-load`,141.6,145.2,e=>{d(e),B(e.ctx.camera,Cp(Z(-.06,1.33,-.5),e.t,.003),Z(.03,1.12,.35),40,Z(0,1,0),0,.02,30)}),X(`b04-shots`,145.2,149.4,e=>{d(e),B(e.ctx.camera,Z(1.75,1.45,-1.25),Z(-.55,.95,-.25),56,Z(0,1,0),0,.05,30);let t=0;for(let n of K.shots){let r=e.t-n;r>=0&&r<.06&&(t=Math.max(t,.55*(1-r/.06)))}e.ctx.grade.flash=t,e.ctx.grade.blur=H(U(e.t,K.tinnitus[0],K.tinnitus[0]+.3))*.6}),X(`b05-holes`,149.4,152.6,e=>{d(e);let t=a.points.target;B(e.ctx.camera,Cp(t.clone().add(Z(-.22,.24,.95-e.p*.12)),e.t,.004),t.clone().add(Z(.02,.04,.3)),30,Z(0,1,0),0,.02,30),e.ctx.grade.blur=.6*(1-H(U(e.t,150,152)))}),X(`b06-unwrap`,152.6,158.6,e=>{d(e);let t=a.points.target;B(e.ctx.camera,Cp(t.clone().add(Z(-.15,.75,.62)),e.t,.004),t.clone().add(Z(0,.12,0)),40,Z(0,1,0),0,.02,30)}),X(`b07-palm`,158.6,163.8,e=>{d(e);let t=Z(),n=a.palm(Z(),t),r=a.head().sub(n).normalize(),i=n.clone().addScaledVector(t,.3-e.p*.05).addScaledVector(r,.12);B(e.ctx.camera,i,n,30,Z(0,1,0),0,.01,30),e.ctx.grade.toneExposure=.7}),X(`b08-case`,163.8,168,e=>{d(e),B(e.ctx.camera,Cp(Z(-.44,1.3,.55-e.p*.04),e.t,.002),Z(-.46,.84,.13),30,Z(0,1,0),0,.02,30),e.ctx.grade.fade=+(e.t>K.chainOff)}),X(`s01a-cabin`,q.cabin,170.9,e=>{f(e),B(e.ctx.camera,Cp(Z(-1.05,1.6,1.25),e.t),Z(.3,1.25,-.4),54,Z(0,1,0),0,.03,1e5),e.ctx.overlay.caption=`地球同步轨道 · 太空军一号基地`,e.ctx.overlay.captionOpacity=H(U(e.t,168.6,169.4))*(1-H(U(e.t,170.2,170.9))),e.ctx.grade.fade=vp(e,.6,0)}),X(`s01b-photo`,170.9,173.2,e=>{f(e);let t=o.photo.position;B(e.ctx.camera,t.clone().add(Z(-.08,.02,.42-e.p*.08)),t.clone().add(Z(-.05,-.02,0)),32,Z(0,1,0),0,.02,1e5)}),X(`s01c-helmet`,173.2,175,e=>{f(e);let t=o.headWorld();B(e.ctx.camera,Cp(Z(-.3,1.72,-1.15),e.t),t.clone().add(Z(0,.08,0)),42,Z(0,1,0),0,.03,1e5)}),X(`s02a-airlock`,q.airlock,178.4,e=>{f(e),B(e.ctx.camera,Z(.55,-3.3,.55),Z(-.05,-.6,-.05),64,Z(0,0,-1),0,.03,1e5),e.ctx.grade.saturation=.9}),X(`s02b-pov`,178.4,q.vista,e=>{f(e);let t=o.headWorld().clone().add(Z(0,-.08,.32));o.zhang.holder.visible=!1,B(e.ctx.camera,t,Z(.02,-4.5,.15),72,Z(0,0,-1),0,.02,1e5),s.backdrop.update(e.t,e.ctx.camera),e.ctx.overlay.hud.visible=1;let n=Math.max(0,101.3*(1-H(U(e.t,q.depress[0],q.depress[1]))));e.ctx.overlay.hud.lines=[`舱压  ${n.toFixed(2)} kPa`,`定位单元  未连接`,`生命维持  12:00:00`],e.ctx.grade.vignette=.75}),X(`e01-radio`,334.6,344.6,e=>{l(e,!0);let t=p(`collector`);B(e.ctx.camera,Cp(Z(-1.7+e.p*.12,1.45,1.4),e.t),t.clone().add(Z(-.3,-.18,-.05)),40,Z(0,1,0),0,.05,50),e.ctx.grade.fade=vp(e,1,0),e.ctx.grade.saturation=.86}),X(`e02-empty`,344.6,351,e=>{l(e,!0);let t=r.points.tray,n=mu(e.p),i=Z(t.x-.75+n*.1,1.27,-1.88-n*.03);B(e.ctx.camera,i,t.clone().add(Z(.15,-.05,0)),36,Z(0,1,0),0,.02,50),e.ctx.grade.fade=vp(e,0,1.6),e.ctx.grade.saturation=.86}),X(`e03-end`,351,356,t=>{t.ctx.scene=e.black,t.ctx.backdrop=null,t.ctx.grade.fade=1,t.ctx.overlay.endCard=H(U(t.t,bd.endTitle[0],bd.endTitle[0]+1.2))*(1-H(U(t.t,bd.endTitle[1]-1,bd.endTitle[1])))})]}function Op(e){let t=new ai(40,2.39,.05,6e4),n=new gi;n.background=new I(0);let r={camera:t,scene:n,backdrop:null,grade:gl(),overlay:_l(),time:0},i=[],a={};i.push([`太空`,()=>a.space=Tf()]),i.push([`一号基地`,()=>a.cabin=kf()]),i.push([`序`,()=>a.prologue=jf()]),i.push([`胡同`,()=>a.hutong=Lf()]),i.push([`收藏者`,()=>a.collector=tp()]),i.push([`车间`,()=>a.workshop=op()]),i.push([`地下室`,()=>a.basement=_p()]),i.forEach(([t,n],r)=>{e?.(t,r,i.length),n()});let o=a;return{ctx:r,shots:[...Dp({...o,black:n}),...xp(o.space)],sets:o,black:n}}var kp={amb_hutong:.7,amb_room:2,fluoro_hum:2.7,amb_basement:1.2,amb_station:1.9,suit_bed:2.7,breath:3,mus_reveal:1.6,mus_solitude:1.5,mus_tension:1.15,mus_flight:2.2,mus_coda:1.25,pigeon_whistle:4.3,bike_bell:3.1,gate_creak:3,chair_creak:5.3,tea_pour:10,glass_slide:4.5,phone_taps:7,phone_ring:3.1,click:3,phone_bed:3.2,fluoro_on:1.4,machine_door:2.2,beep:1.6,lathe_motor:1.25,coolant:3.5,lathe_cut:5,clinks:1.25,brush:3.6,ratchet_clunk:2,chain_pull:9,pliers:3.5,glue:10,tip_press:6.7,mag_load:6,mag_insert:2.2,slide_rack:2.5,tinnitus:1.25,cloth:3,knife_meat:10,grit:3.2,rounds_clink:2.7,case_latch:2.2,velcro:3.2,strap_click:1.7,beacon_beeps:1.7,hud_chime:2.7,thruster:2,chatter_bed:4,radio_bed:3.3,glove_ring:1.8,hud_alarm:2.7,pocket:3.5,mag_vac:1.7,heartbeat:.7,radio_alarm:1.4,radio_off:4.5,broadcast_bed:6.6,lens_set:2.2},Ap=0;function Q(e,t,n,r={}){return Ap++,{id:`snd-${String(Ap).padStart(3,`0`)}-${e}`,kind:`sound`,sound:e,group:r.group??`sfx`,gain:(r.gain??1)*(kp[e]??1),sustain:r.sustain??!1,start:t,end:n,payload:r.payload}}var jp=(e,t,n,r,i=1)=>Q(`footsteps`,e,t,{payload:{interval:n,surface:r,level:i}}),Mp=[Q(`mus_open`,0,15,{group:`music`,sustain:!0}),Q(`pigeon_whistle`,13.4,19.6,{group:`amb`,gain:.8,payload:{peak:.6}}),Q(`amb_hutong`,15,22.6,{group:`amb`,sustain:!0}),jp(15.05,W.gateOpen-.4,.4,`lane`),Q(`bike_bell`,17.3,18.6,{gain:.8}),Q(`pigeon_whistle`,18.2,24,{group:`amb`,gain:.45,payload:{peak:.4}}),Q(`gate_creak`,W.gateOpen,W.gateOpen+1.6),Q(`amb_room`,22,105.8,{group:`amb`,sustain:!0}),jp(W.enter-.1,24.8,.4,`stone`,.8),Q(`chair_creak`,W.rise,W.rise+.6),Q(`pigeon_whistle`,44,51,{group:`amb`,gain:.35,payload:{peak:.5,muffled:!0}}),Q(`pigeon_whistle`,74.5,81,{group:`amb`,gain:.28,payload:{peak:.45,muffled:!0}}),jp(W.rise+.8,29.2,.4,`stone`,.7),Q(`tea_pour`,W.pour[0],W.pour[0]+2.2),Q(`porcelain`,33.1,33.6),jp(29.6,31,.4,`stone`,.7),Q(`chair_creak`,31,31.6),Q(`chair_creak`,33.4,34),Q(`porcelain`,58.2,58.8,{payload:{level:.6}}),Q(`porcelain`,62,62.6),Q(`chair_creak`,W.toCase[0],W.toCase[0]+.6),jp(W.toCase[0]+.2,W.toCase[1],.42,`stone`,.7),Q(`glass_slide`,W.glassSlide,W.glassSlide+.9),Q(`stone_set`,W.stoneOut,W.stoneOut+.5,{payload:{level:.5}}),jp(86.6,87.5,.42,`stone`,.7),...W.stonesDown.map(e=>Q(`stone_set`,e,e+.5)),Q(`chair_creak`,90.4,91),Q(`phone_taps`,W.phoneOut+.2,W.phoneOut+.9,{payload:{count:3}}),Q(`phone_taps`,100,101.8,{payload:{count:9}}),Q(`pay_chime`,W.pay,W.pay+.6),Q(`mus_irony`,101,106.2,{group:`music`,sustain:!0}),Q(`amb_workshop`,105.8,132,{group:`amb`,sustain:!0}),jp(105.9,111.2,.45,`concrete`,.8),Q(`phone_ring`,G.ring,G.answer),Q(`click`,G.answer,G.answer+.3,{payload:{freq:2500,level:.02}}),Q(`click`,G.hangUp,G.hangUp+.3,{payload:{freq:2500,level:.02}}),Q(`click`,G.lightOn,G.lightOn+.6,{payload:{freq:1800,level:.07}}),Q(`fluoro_on`,G.lightOn+.02,G.lightOn+1),Q(`fluoro_hum`,G.lightOn+.5,G.lightOff,{group:`amb`,sustain:!0}),jp(G.lightOn+.05,G.lightOn+.5,.42,`concrete`,.6),Q(`clamp`,G.clamp,G.clamp+1),Q(`machine_door`,G.doorClose-.4,G.doorClose+.1),Q(`beep`,G.start,G.start+.3,{payload:{freq:1760,len:.14,level:.025}}),Q(`lathe_motor`,G.start,G.cut[1]+.6,{sustain:!0}),Q(`lathe_cut`,G.cut[0],G.cut[1],{sustain:!0}),Q(`coolant`,G.cut[0]-.1,G.cut[1],{sustain:!0}),Q(`clinks`,G.drops[0],G.drops[1]+.3,{payload:{count:12}}),Q(`machine_door`,G.cut[1]+.2,G.cut[1]+.7),Q(`brush`,G.sweep[0],G.sweep[1]),Q(`ratchet_clunk`,G.toolOut,G.toolOut+1),Q(`click`,G.lightOff,G.lightOff+.6,{payload:{freq:1800,level:.07}}),jp(G.lightOff+.05,132,.45,`concrete`,.6),Q(`amb_basement`,132,K.shots[0],{group:`amb`,sustain:!0}),Q(`chain_pull`,K.chain,K.chain+.5),...K.pulls.map(e=>Q(`pliers`,e,e+.4)),Q(`glue`,K.glue,K.glue+.6),Q(`tip_press`,K.tips-.3,K.tips+.4),...K.load.map((e,t)=>Q(`mag_load`,e,e+.4,{payload:{n:t}})),Q(`mag_insert`,K.insert,K.insert+.6),Q(`slide_rack`,K.rack,K.rack+.7),...K.shots.map(e=>Q(`gunshot_room`,e,e+1.4,{gain:.6})),Q(`tinnitus`,K.tinnitus[0],K.tinnitus[1],{group:`sfx`}),Q(`amb_basement`,K.tinnitus[0],K.tinnitus[1],{group:`amb`,sustain:!0,payload:{muffled:!0}}),Q(`amb_basement`,K.tinnitus[1]-.3,K.chainOff,{group:`amb`,sustain:!0}),Q(`cloth`,K.unwrap[0],K.unwrap[1]),Q(`knife_meat`,K.knife[0],K.knife[1]),Q(`grit`,158.4,159.4),Q(`rounds_clink`,164,166),Q(`case_latch`,K.caseLatch,K.caseLatch+.5),Q(`chain_pull`,K.chainOff,K.chainOff+.5),Q(`mus_low`,158.6,167.5,{group:`music`,sustain:!0}),Q(`amb_station`,q.cabin,q.helmetOn+.1,{group:`amb`,sustain:!0}),Q(`velcro`,q.locatorOff,q.locatorOff+.5),Q(`strap_click`,q.locatorStrap,q.locatorStrap+.3),Q(`helmet_seal`,q.helmetOn,q.helmetOn+1,{group:`suit`}),Q(`amb_station`,q.helmetOn+.1,q.depress[0],{group:`amb`,sustain:!0,payload:{helmet:!0}}),Q(`suit_bed`,q.helmetOn+.2,301,{group:`suit`,sustain:!0}),Q(`beacon_beeps`,q.airlock,q.depress[1],{gain:.9}),Q(`depress_hiss`,q.depress[0],q.depress[1]),Q(`hud_chime`,q.airlockGreen,q.airlockGreen+.5,{group:`suit`,payload:{up:!0}}),Q(`conducted_rumble`,q.outerOpen[0],q.outerOpen[1]+.2,{group:`suit`,payload:{level:.1}}),Q(`mus_reveal`,180.6,191.4,{group:`music`,sustain:!0}),Q(`breath`,q.helmetOn+.6,255,{group:`suit`,sustain:!0,payload:{style:`calm`,amp:.8}}),Q(`thruster`,q.arrivePuff[0],q.arrivePuff[1],{group:`suit`,payload:{level:.07}}),Q(`mus_solitude`,191,207,{group:`music`,sustain:!0,payload:{motif:10.8}}),Q(`mus_tension`,207,264.6,{group:`music`,sustain:!0}),Q(`breath`,255,266.4,{group:`suit`,sustain:!0,payload:{style:`tense`,amp:1}}),Q(`glove_ring`,q.gloveTwist[0],q.gloveTwist[0]+1.3,{group:`suit`}),Q(`hud_alarm`,q.gloveOff+.1,301,{group:`suit`,sustain:!0}),Q(`hud_alarm`,304.4,q.gloveOn,{group:`suit`,sustain:!0,payload:{quiet:!0}}),Q(`thruster`,q.turn[0],q.turn[0]+.35,{group:`suit`,payload:{level:.05}}),Q(`pocket`,q.gunOut-.3,q.gunOut,{group:`suit`}),Q(`magnet`,q.scopeMount,q.scopeMount+.3,{group:`suit`}),Q(`thruster`,q.aim[0],q.aim[0]+.3,{group:`suit`,payload:{level:.045}}),Q(`breath`,266.4,278.2,{group:`suit`,sustain:!0,payload:{style:`hold`,amp:1}}),...q.fire.map(e=>Q(`gun_vac`,e,e+1.6,{group:`suit`,payload:{count:10,step:q.fireStep}})),...q.magOut.map(e=>Q(`mag_vac`,e,e+.2,{group:`suit`})),...q.magIn.map(e=>Q(`mag_vac`,e,e+.2,{group:`suit`})),Q(`breath`,278.4,301,{group:`suit`,sustain:!0,payload:{style:`shallow`,amp:.6}}),Q(`heartbeat`,278.6,301,{group:`suit`,sustain:!0,payload:{bpm:54}}),Q(`mus_flight`,278.4,301,{group:`music`,sustain:!0}),Q(`breath`,304.4,307.4,{group:`suit`,payload:{style:`release`,amp:1}}),Q(`suit_bed`,304.4,334.6,{group:`suit`,sustain:!0}),Q(`breath`,307.4,322,{group:`suit`,sustain:!0,payload:{style:`tense`,amp:.8}}),Q(`radio_alarm`,q.retreat,q.radioOff,{group:`radio`,sustain:!0}),Q(`radio_off`,q.radioOff,q.radioOff+.3,{group:`radio`}),Q(`glove_on`,q.gloveOn,q.gloveOn+1,{group:`suit`}),Q(`thruster`,q.depart[0]-1.2,q.depart[0]-.7,{group:`suit`,payload:{level:.05}}),Q(`thruster`,q.depart[0],q.depart[1],{group:`suit`,sustain:!0,payload:{level:.08}}),Q(`breath`,322,334.6,{group:`suit`,sustain:!0,payload:{style:`calm`,amp:.7}}),Q(`mus_coda`,322,334.6,{group:`music`,sustain:!0}),Q(`amb_room`,334.6,351.2,{group:`amb`,sustain:!0,payload:{morning:!0}}),Q(`pigeon_whistle`,335,343,{group:`amb`,gain:.25,payload:{peak:.5}}),Q(`news_jingle`,bd.radioOn,bd.radioOn+1,{group:`radio`}),Q(`lens_set`,bd.pause+.3,bd.pause+.7),Q(`mus_end`,345.6,356,{group:`music`,sustain:!0})],Np={radio:`radio_bed`,chatter:`chatter_bed`,phone:`phone_bed`,broadcast:`broadcast_bed`};for(let e of Cd){let t=Np[e.kind];t&&Mp.push({id:`bed-${e.id}`,kind:`sound`,sound:t,group:`radio`,gain:kp[t]??1,sustain:!0,start:Math.max(0,e.start-.08),end:e.end+.12})}var Pp=Mp,Fp=new WeakMap;function Ip(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Lp(e,t,n=4,r=1){let i=Fp.get(e);i||(i=new Map,Fp.set(e,i));let a=`${t}:${n}:${r}`,o=i.get(a);if(o)return o;let s=Math.floor(e.sampleRate*n),c=e.createBuffer(2,s,e.sampleRate);for(let e=0;e<2;e++){let n=c.getChannelData(e),i=Ip(r*7+e*1013),a=0,o=0,l=0,u=0,d=0,f=0,p=0,m=0;for(let e=0;e<s;e++){let r=i()*2-1;t===`white`?n[e]=r*.5:t===`pink`?(a=.99886*a+r*.0555179,o=.99332*o+r*.0750759,l=.969*l+r*.153852,u=.8665*u+r*.3104856,d=.55*d+r*.5329522,f=-.7616*f-r*.016898,n[e]=(a+o+l+u+d+f+p+r*.5362)*.11,p=r*.115926):(m=(m+.02*r)/1.02,n[e]=m*3.2)}let h=Math.min(2048,Math.floor(s/8));for(let e=0;e<h;e++){let t=e/h;n[e]=n[e]*t+n[s-h+e]*(1-t)}}return i.set(a,c),c}var Rp=new WeakMap;function zp(e,t){let n=Rp.get(e);n||(n=new Map,Rp.set(e,n));let r=JSON.stringify(t),i=n.get(r);if(i)return i;let a=Math.floor(e.sampleRate*t.seconds),o=e.createBuffer(2,a,e.sampleRate),s=Math.floor((t.predelay??0)*e.sampleRate);for(let n=0;n<2;n++){let r=o.getChannelData(n),i=Ip(11+n*97),c=0;for(let n=s;n<a;n++){let a=(n-s)/e.sampleRate,o=Math.exp(-6.9*a/t.decay),l=Math.min(.98,.15+(1-t.bright)*.5+a*(1.2-t.bright));c=c*l+(i()*2-1)*(1-l),r[n]=c*o*.6}let l=0;for(let e=0;e<a;e++)l+=r[e]*r[e];let u=l>0?1/Math.sqrt(l):1;for(let e=0;e<a;e++)r[e]*=u;for(let[i,o]of t.early??[]){let t=Math.floor((i+(n?.0013:0))*e.sampleRate);t<a&&(r[t]=(r[t]??0)+o*(n?.9:1),t+1<a&&(r[t+1]=(r[t+1]??0)-o*.4))}}return n.set(r,o),o}function Bp(e){let t=1024,n=new Float32Array(new ArrayBuffer(t*4));for(let r=0;r<t;r++){let t=r/1023*2-1;n[r]=Math.tanh(t*e)/Math.tanh(e)}return n}var Vp=class{ac;out;now;t0;offset;sources=[];master;constructor(e){this.ac=e.audioContext,this.offset=e.offset,this.now=this.ac.currentTime,this.t0=this.now-this.offset,this.master=this.ac.createGain(),this.master.gain.value=1,this.master.connect(e.output),this.out=this.master}at(e){return Math.max(this.now,this.t0+e)}env(e,t,n=!1){let r=this.offset,i=t[0][1];for(let e=0;e<t.length;e++){let[n,a]=t[e];if(n<=r)i=a;else{let o=t[e-1];o&&(i=o[1]+(a-o[1])*(r-o[0])/(n-o[0]));break}}e.cancelScheduledValues(this.now),e.setValueAtTime(n?Math.max(1e-5,i):i,this.now);for(let[i,a]of t){if(i<=r)continue;let t=this.t0+i;n?e.exponentialRampToValueAtTime(Math.max(1e-5,a),t):e.linearRampToValueAtTime(a,t)}}gain(e=1,t){let n=this.ac.createGain();return n.gain.value=e,n.connect(t??this.out),n}mod(e,t){let n=this.ac.createGain();return n.gain.value=t,n.connect(e),n}filter(e,t,n=.7,r){let i=this.ac.createBiquadFilter();return i.type=e,i.frequency.value=t,i.Q.value=n,r&&i.connect(r),i}osc(e,t,n,r=0,i){let a=this.ac.createOscillator();return a.type=e,a.frequency.value=t,a.connect(n),a.start(this.at(r)),i!==void 0&&a.stop(Math.max(this.at(r)+.01,this.t0+i)),this.sources.push(a),a}noise(e,t,n=0,r,i=1,a=1){let o=this.ac.createBufferSource();o.buffer=Lp(this.ac,e,4,i),o.loop=!0,o.playbackRate.value=a,o.connect(t);let s=this.at(n);return o.start(s,i*.37%3.5),r!==void 0&&o.stop(Math.max(s+.01,this.t0+r)),this.sources.push(o),o}reverb(e,t,n){let r=this.ac.createConvolver();r.normalize=!1,r.buffer=zp(this.ac,e);let i=this.gain(t,n);return r.connect(i),r}shaper(e,t){let n=this.ac.createWaveShaper();return n.curve=Bp(e),n.oversample=`2x`,n.connect(t),n}panner(e,t){let n=this.ac.createStereoPanner();return n.pan.value=e,n.connect(t),n}burst(e,t){if(this.t0+e<this.now-.02)return;let n=this.t0+e,r=this.ac.createGain();r.gain.value=0,r.connect(t.to??this.out);let i=this.filter(t.type??`bandpass`,t.freq,t.q??1,r),a=this.ac.createBufferSource();a.buffer=Lp(this.ac,t.kind??`white`,1,t.seed??3),a.connect(i);let o=t.attack??.001;r.gain.setValueAtTime(0,n),r.gain.linearRampToValueAtTime(t.peak,n+o),r.gain.setTargetAtTime(0,n+o,t.decay),a.start(n,(t.seed??3)*.13%.5),a.stop(n+o+t.decay*8+.05),this.sources.push(a)}ping(e,t,n,r,i={}){if(this.t0+e<this.now-.02)return;let a=this.t0+e,o=this.ac.createGain();o.gain.value=0,o.connect(i.to??this.out);let s=this.ac.createOscillator();s.type=i.type??`sine`,s.frequency.setValueAtTime(t,a),i.sweepTo&&s.frequency.exponentialRampToValueAtTime(i.sweepTo,a+(i.sweepTime??r*2)),s.connect(o);let c=i.attack??.002;o.gain.setValueAtTime(0,a),o.gain.linearRampToValueAtTime(n,a+c),o.gain.setTargetAtTime(0,a+c,r),s.start(a),s.stop(a+c+r*8+.05),this.sources.push(s)}handle(){return{stop:()=>{let e=this.ac.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setValueAtTime(this.master.gain.value,e),this.master.gain.linearRampToValueAtTime(0,e+.04);for(let t of this.sources)try{t.stop(e+.05)}catch{}}}}},$={};{let e=[`C`,`C#`,`D`,`D#`,`E`,`F`,`F#`,`G`,`G#`,`A`,`A#`,`B`];for(let t=1;t<=7;t++)e.forEach((e,n)=>$[`${e}${t}`]=440*2**((n-9+(t-4)*12)/12))}var Hp={seconds:1.5,decay:.8,bright:.85,early:[[.0031,.55],[.0047,.48],[.0068,.42],[.0093,.36],[.0121,.32],[.0156,.27],[.0189,.22],[.0238,.18],[.031,.14],[.042,.1]]},Up={seconds:.9,decay:.42,bright:.3,early:[[.006,.18],[.011,.13],[.018,.09]]},Wp={seconds:2.8,decay:2,bright:.55,early:[[.021,.22],[.037,.18],[.058,.14],[.083,.1]],predelay:.012},Gp={seconds:1,decay:.45,bright:.5,early:[[.0095,.3],[.019,.22],[.0285,.15]]},Kp={seconds:.6,decay:.28,bright:.6,early:[[.004,.25],[.007,.18]]},qp={seconds:.18,decay:.05,bright:.65,early:[[9e-4,.35],[.0014,.22]]},Jp={seconds:5.5,decay:4,bright:.4,predelay:.025};function Yp(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}function Xp(e,t,n,r,i,a,o=1,s=1.6){if(e.t0+t<e.now-.05)return;let c=e.t0+t,l=e.ac,u=l.createGain();u.gain.value=0,u.connect(a);let d=l.createOscillator();d.frequency.value=n;let f=l.createOscillator();f.frequency.value=n*o;let p=l.createGain();p.gain.setValueAtTime(s*n,c),p.gain.setTargetAtTime(s*n*.08,c,i*.25),f.connect(p).connect(d.frequency),d.connect(u),u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(r,c+.006),u.gain.setTargetAtTime(0,c+.006,i),d.start(c),f.start(c),d.stop(c+i*7),f.stop(c+i*7)}function Zp(e,t,n,r,i,a){let o=e.gain(0,r);e.env(o.gain,i.map(([e,t])=>[e,t*n]));let s=e.filter(`lowpass`,800,.4,o);e.env(s.frequency,a);for(let n of[-7,0,6]){let r=e.osc(`sawtooth`,t,s);r.detune.value=n}}function Qp(e){let t=(t,n)=>{e.define(t,e=>{let t=e.cue.end-e.cue.start;if(e.offset>=t-.02)return;let r=new Vp(e);return n(r,e.cue,e.cue.payload??{},t),r.handle()})};t(`amb_hutong`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[1.5,1],[r-1.2,1],[r,0]]);let a=e.gain(.16,i),o=e.filter(`lowpass`,520,.5,a);e.noise(`pink`,o,0,void 0,2);let s=e.mod(a.gain,.08);e.osc(`sine`,.13,s);let c=e.gain(.22,i);e.noise(`brown`,e.filter(`lowpass`,140,.5,c),0,void 0,4);let l=e.reverb(Gp,.35,i);for(let t=0;t<6;t++){let n=.8+t*1.3+Yp(t)*.6;for(let r=0;r<3;r++)e.ping(n+r*.07,3800+Yp(t*3+r)*1400,.01,.02,{sweepTo:3e3,to:l})}}),t(`amb_room`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.8,1],[r-.6,1],[r,0]]),e.noise(`brown`,e.filter(`lowpass`,170,.5,e.gain(.07,i)),0,void 0,5),e.noise(`pink`,e.filter(`bandpass`,650,.4,e.gain(.012,i)),0,void 0,6);let a=e.reverb(Up,.5,i),o=Math.ceil(t.start)-t.start;for(let n=0;o+n<r;n++){let r=o+n,s=(Math.ceil(t.start)+n)%2==0;e.burst(r,{freq:s?2500:3300,q:5,peak:.022,decay:.006,to:a}),e.burst(r,{freq:s?2500:3300,q:5,peak:.014,decay:.006,to:i})}if(n.morning)for(let t=0;t<10;t++){let n=.6+t*1.5+Yp(t+50)*.8;for(let r=0;r<4;r++)e.ping(n+r*.09,4200+Yp(t*7+r)*1600,.006,.025,{sweepTo:3600,to:i})}}),t(`amb_workshop`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[1,1],[r-.8,1],[r,0]]),e.noise(`brown`,e.filter(`lowpass`,90,.5,e.gain(.13,i)),0,void 0,7),e.noise(`pink`,e.filter(`bandpass`,300,.5,e.gain(.02,i)),0,void 0,8),e.osc(`sine`,50,e.gain(.008,i)),e.osc(`sine`,150,e.gain(.003,i));let a=e.reverb(Wp,.8,i);for(let t of[2.3,7.9,15.2])e.ping(t,700+Yp(t)*300,.01,.06,{to:a})}),t(`fluoro_hum`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.3,1],[r-.05,1],[r,0]]),e.osc(`square`,100,e.filter(`lowpass`,1400,.6,e.gain(.0035,i))),e.osc(`sine`,200,e.gain(.002,i))}),t(`amb_basement`,(e,t,n,r)=>{let i=!!n.muffled,a=e.gain(0);e.env(a.gain,[[0,0],[.4,i?.5:1],[r-.4,i?.5:1],[r,0]]);let o=i?e.filter(`lowpass`,280,.6,a):a;e.noise(`brown`,e.filter(`lowpass`,85,.5,e.gain(.1,o)),0,void 0,9),e.osc(`sawtooth`,100,e.filter(`bandpass`,2400,3,e.gain(.0022,o)));let s=e.reverb(Hp,.4,o);for(let t=0;t*2.7<r;t++)e.ping(.9+t*2.7+Yp(t)*.5,2100,.02,.03,{sweepTo:1300,sweepTime:.05,to:s})}),t(`amb_station`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.6,1],[r-.5,1],[r,0]]);let a=n.helmet?e.filter(`lowpass`,900,.5,e.gain(.5,i)):i;e.noise(`pink`,e.filter(`bandpass`,420,.5,e.gain(.035,a)),0,void 0,10),e.noise(`brown`,e.filter(`lowpass`,120,.5,e.gain(.05,a)),0,void 0,11);let o=e.gain(.012,a);e.osc(`sine`,58,o);let s=e.mod(o.gain,.01);e.osc(`sine`,.7,s),e.osc(`sine`,7200,e.gain(.0012,a))}),t(`suit_bed`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.4,1],[r-.3,1],[r,0]]),e.noise(`pink`,e.filter(`bandpass`,1100,.6,e.gain(.011,i)),0,void 0,12),e.noise(`brown`,e.filter(`lowpass`,200,.5,e.gain(.028,i)),0,void 0,13);let a=e.gain(.004,i);e.osc(`sine`,120,a);let o=e.mod(a.gain,.003);e.osc(`sine`,.25,o)}),t(`breath`,(e,t,n,r)=>{let i=String(n.style??`calm`),a=Number(n.amp??1),o=e.gain(a),s=e.reverb(qp,.25,o),c=e.gain(0,o),l=e.gain(0,o);c.connect(s),l.connect(s),e.noise(`pink`,e.filter(`bandpass`,1500,.6,c),0,void 0,14);let u=e.filter(`bandpass`,640,.8,l);e.noise(`pink`,u,0,void 0,15),e.noise(`brown`,e.filter(`lowpass`,320,.6,l),0,void 0,16);let d=[[0,0]],f=[[0,0]],p=(e,t,n,r,i)=>{d.push([e,0],[e+t*.35,.05*i],[e+t,0]);let a=e+t+r;return f.push([a,0],[a+.18,.075*i],[a+n,0]),a+n},m=.1;if(i===`hold`)m=p(m,1.6,1e-4,.05,1.25);else if(i===`release`)f.push([.05,0],[.4,.09],[2.8,0]);else{let e=i===`tense`?[1,1.25,.15,.6]:i===`shallow`?[.8,1,.1,.55]:[1.5,2.1,.2,.9],t=i===`shallow`?.55:i===`tense`?1.1:.85;for(;m<r-1;)m=p(m,e[0],e[1],e[2],t*(.9+Yp(m)*.2))+e[3]}e.env(c.gain,d.sort((e,t)=>e[0]-t[0])),e.env(l.gain,f.sort((e,t)=>e[0]-t[0]))}),t(`pigeon_whistle`,(e,t,n,r)=>{let i=n.muffled?e.gain(0,e.filter(`lowpass`,1400,.5,e.out)):e.gain(0),a=Number(n.peak??.45)*r;e.env(i.gain,[[0,0],[a,1],[r,0]]);let o=e.panner(-.7,i);e.env(o.pan,[[0,-.8],[r,.8]]);let s=e.reverb(Gp,.25,o);[523,784,1047,1397,1760].forEach((t,n)=>{let i=e.gain(.009/(1+n*.3),o);i.connect(s);let a=e.osc(`sine`,t,i);e.env(a.frequency,[[0,t*1.022],[r,t*.982]]);let c=e.mod(a.frequency,t*.004);e.osc(`sine`,5.2+n*.4,c),e.noise(`white`,e.filter(`bandpass`,t,28,e.gain(.45,i)),0,void 0,20+n)})}),t(`footsteps`,(e,t,n,r)=>{let i=Number(n.interval??.42),a=String(n.surface??`stone`),o=a===`concrete`?Wp:a===`lane`?Gp:Up,s=e.reverb(o,a===`concrete`?.6:.3),c=Number(n.level??1);for(let t=0;t*i<r-.1;t++){let n=.02+t*i+(Yp(t)-.5)*.03,r=c*(.85+Yp(t+9)*.3);e.burst(n,{freq:a===`concrete`?1600:1100,q:.9,peak:.09*r,decay:.02,seed:t+3}),e.burst(n,{freq:1300,q:.9,peak:.05*r,decay:.02,to:s,seed:t+5}),e.ping(n,88,.12*r,.03)}}),t(`bike_bell`,e=>{let t=e.panner(-.6,e.filter(`lowpass`,5200,.7,e.gain(.6))),n=e.reverb(Gp,.5,e.gain(1));for(let r of[0,.22])for(let[i,a,o]of[[2093,.02,.5],[3140,.012,.35],[4250,.008,.25],[5600,.005,.18]])e.ping(r,i,a,o,{to:t}),e.ping(r,i,a*.6,o,{to:n})}),t(`gate_creak`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.12,.05],[.8,.035],[1.15,0]]);let n=e.gain(.6,t),r=e.mod(n.gain,.5);e.osc(`square`,34,r);let i=e.filter(`bandpass`,900,5,n),a=e.filter(`bandpass`,1750,7,n),o=e.osc(`sawtooth`,118,i,0,1.2);o.connect(a),e.env(o.frequency,[[0,112],[.4,128],[.8,104],[1.2,120]]);let s=e.reverb(Gp,.4);e.ping(1.25,140,.1,.06,{to:s}),e.burst(1.25,{type:`lowpass`,freq:600,peak:.07,decay:.03})}),t(`tea_pour`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.08,.06],[1.8,.055],[2,0]]);let n=e.gain(.75,t),r=e.mod(n.gain,.25);e.osc(`sawtooth`,11,r);let i=e.filter(`bandpass`,420,5,n);e.env(i.frequency,[[0,420],[2,1350]],!0),e.noise(`pink`,i,0,2.05,30);for(let n=0;n<9;n++)e.ping(.2+Yp(n)*1.6,600+Yp(n+3)*500,.008,.012,{to:t});e.reverb(Up,.3,t)}),t(`porcelain`,(e,t,n)=>{let r=Number(n.level??1),i=e.reverb(Up,.35);for(let[t,n,a]of[[2950,.04,.12],[4380,.025,.08],[6120,.014,.05]])e.ping(0,t,n*r,a),e.ping(0,t,n*r*.5,a,{to:i});e.ping(0,190,.05*r,.015)}),t(`chair_creak`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.06,.03],[.35,.02],[.45,0]]);let n=e.gain(.7,t);e.osc(`square`,26,e.mod(n.gain,.5)),e.osc(`sawtooth`,92,e.filter(`bandpass`,1100,6,n),0,.5),e.burst(.42,{type:`lowpass`,freq:500,peak:.05,decay:.03})}),t(`glass_slide`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.1,.028],[.45,.022],[.55,0]]),e.noise(`white`,e.filter(`bandpass`,2600,2,t),0,.6,31),e.ping(.55,3600,.018,.15),e.reverb(Up,.3,t)}),t(`stone_set`,(e,t,n)=>{let r=Number(n.level??1),i=e.reverb(Up,.3);e.ping(0,118,.12*r,.04,{sweepTo:72,sweepTime:.06}),e.burst(0,{type:`lowpass`,freq:700,peak:.08*r,decay:.015}),e.burst(0,{type:`lowpass`,freq:900,peak:.04*r,decay:.015,to:i})}),t(`phone_taps`,(e,t,n,r)=>{let i=Number(n.count??8);for(let t=0;t<i;t++)e.burst(t/i*(r-.1)+Yp(t)*.05,{freq:4200,q:2,peak:.016,decay:.004,seed:t})}),t(`pay_chime`,e=>{let t=e.filter(`bandpass`,2e3,.5,e.gain(1));e.ping(0,1568,.035,.12,{to:t}),e.ping(.09,2093,.035,.25,{to:t})}),t(`lens_set`,e=>{let t=e.reverb(Up,.3);e.ping(0,2200,.03,.02),e.burst(0,{freq:3e3,peak:.03,decay:.004,to:t})}),t(`phone_ring`,e=>{let t=e.filter(`bandpass`,2100,.6,e.gain(1)),n=e.reverb(Wp,.3,e.gain(1)),r=[$.E5,$[`G#5`],$.B5,$.E6];for(let i of[0,.5])r.forEach((r,a)=>{Xp(e,i+a*.1,r,.03,.12,t,4,1.2),Xp(e,i+a*.1,r,.015,.12,n,4,1.2)})}),t(`click`,(e,t,n)=>{let r=String(n.room??`hall`),i=e.reverb(r===`house`?Up:r===`basement`?Hp:Wp,.35);e.burst(0,{freq:Number(n.freq??2200),q:2,peak:Number(n.level??.06),decay:.004}),e.burst(0,{freq:Number(n.freq??2200),q:2,peak:Number(n.level??.06)*.6,decay:.004,to:i}),e.ping(.002,4500,.015,.01)}),t(`fluoro_on`,e=>{for(let t of[0,.12,.31])e.ping(t,3e3,.02,.01);let t=e.gain(0);e.env(t.gain,[[0,0],[.05,.03],[.1,0],[.18,.03],[.22,.004],[.3,.03],[.8,.012]]),e.osc(`square`,100,e.filter(`bandpass`,900,.7,t),0,.85)}),t(`clamp`,e=>{let t=e.reverb(Wp,.35);e.ping(0,420,.07,.06),e.ping(0,1260,.04,.05,{to:t}),e.burst(0,{freq:1800,peak:.06,decay:.01});for(let t=0;t<6;t++)e.burst(.2+t*.1,{freq:3500,q:3,peak:.03,decay:.004,seed:t})}),t(`machine_door`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.05,.03],[.35,.025],[.42,0]]),e.noise(`white`,e.filter(`bandpass`,1200,1,t),0,.45,40),e.burst(.42,{freq:2600,q:2,peak:.05,decay:.006}),e.ping(.42,600,.03,.03)}),t(`beep`,(e,t,n)=>{let r=e.gain(0),i=Number(n.freq??1760),a=Number(n.len??.12);e.env(r.gain,[[0,0],[.005,Number(n.level??.02)],[a,Number(n.level??.02)],[a+.01,0]]),e.osc(`square`,i,e.filter(`bandpass`,i,1.5,r),0,a+.05)}),t(`lathe_motor`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.9,.05],[r-.6,.05],[r,0]]);let a=e.osc(`sawtooth`,30,e.filter(`lowpass`,700,.7,i));e.env(a.frequency,[[0,4],[.9,30],[r-.6,30],[r,5]]);let o=e.osc(`sine`,720,e.gain(.22,i));e.env(o.frequency,[[0,90],[.9,720],[r-.6,720],[r,110]]),e.osc(`sine`,100,e.gain(.3,i)),e.osc(`square`,760,e.filter(`bandpass`,760,4,e.gain(.06,i))),e.reverb(Wp,.25,i)}),t(`lathe_cut`,(e,t,n,r)=>{let i=e.gain(0),a=[[0,0]];for(let e=.1;e<r-.4;e+=1.25)a.push([e,0],[e+.08,.055],[e+.9,.05],[e+1,0]);e.env(i.gain,a);let o=e.mod(i.gain,.022);e.osc(`sine`,30,o),e.noise(`white`,e.filter(`bandpass`,3300,14,e.gain(.9,i)),0,void 0,41),e.noise(`white`,e.filter(`bandpass`,5200,18,e.gain(.7,i)),0,void 0,42);for(let t of[2730,4170]){let n=e.osc(`sine`,t,e.gain(.1,i));e.osc(`sine`,6.5,e.mod(n.frequency,t*.004))}e.reverb(Wp,.35,i)}),t(`coolant`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.3,.012],[r-.3,.012],[r,0]]),e.noise(`white`,e.filter(`highpass`,4e3,.7,i),0,void 0,43)}),t(`clinks`,(e,t,n,r)=>{let i=Number(n.count??12),a=e.reverb(Wp,.25);for(let t=0;t<i;t++){let n=t/i*(r-.3)+Yp(t)*.08;for(let[r,i,a]of[[4300,.03,.03],[6900,.02,.02],[9200,.01,.012]])e.ping(n,r*(.97+Yp(t+2)*.06),i,a);e.ping(n,1150,.015,.12,{to:a})}}),t(`brush`,(e,t,n,r)=>{for(let t=.05;t<r-.1;t+=.24)e.burst(t,{freq:4500,q:.8,peak:.03,decay:.06,attack:.03,seed:Math.round(t*10)})}),t(`ratchet_clunk`,e=>{let t=e.reverb(Wp,.35);for(let t=0;t<5;t++)e.burst(t*.1,{freq:2800,q:3,peak:.04,decay:.004,seed:t+7});e.ping(.65,300,.07,.08,{to:t}),e.ping(.65,880,.04,.06)}),t(`chain_pull`,e=>{let t=e.reverb(Hp,.3);for(let t=0;t<4;t++)e.burst(t*.04,{freq:5e3,q:2,peak:.02,decay:.003,seed:t});e.burst(.18,{freq:2200,q:2,peak:.06,decay:.004,to:t}),e.ping(.2,6e3,.004,.05)}),t(`pliers`,e=>{e.ping(0,2400,.012,.03,{sweepTo:3100,sweepTime:.04}),e.burst(.05,{type:`lowpass`,freq:1500,peak:.06,decay:.008}),e.burst(.06,{freq:4200,q:2,peak:.03,decay:.003})}),t(`glue`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.08,.025],[.35,.02],[.45,0]]);let n=e.filter(`bandpass`,300,6,t);e.env(n.frequency,[[0,300],[.45,900]],!0),e.noise(`pink`,n,0,.5,50)}),t(`tip_press`,(e,t,n,r)=>{for(let t=0;t<6;t++)e.burst(t/6*(r-.05),{freq:6e3,q:2,peak:.015,decay:.003,seed:t})}),t(`mag_load`,(e,t,n)=>{let r=Number(n.n??0),i=e.reverb(Hp,.2);e.burst(0,{freq:2800,q:3,peak:.07,decay:.008}),e.ping(0,1500+r*80,.03,.03,{to:i})}),t(`mag_insert`,e=>{let t=e.reverb(Hp,.3);e.burst(0,{freq:1100,q:1,peak:.1,decay:.018,to:t}),e.burst(0,{freq:1100,q:1,peak:.1,decay:.018}),e.ping(0,420,.06,.025),e.burst(.06,{freq:3600,q:2,peak:.06,decay:.004})}),t(`slide_rack`,e=>{let t=e.reverb(Hp,.3);e.burst(0,{freq:3200,q:1.5,peak:.05,decay:.03,attack:.02}),e.burst(.06,{freq:3800,q:2,peak:.05,decay:.004}),e.burst(.16,{freq:1500,q:1,peak:.12,decay:.012,to:t}),e.burst(.16,{freq:1500,q:1,peak:.1,decay:.012}),e.ping(.16,620,.06,.025)}),t(`gunshot_room`,e=>{let t=e.ac.createGain();t.gain.value=1;let n=e.shaper(2.2,e.gain(.85));t.connect(n);let r=e.reverb(Hp,1);t.connect(r),e.burst(0,{type:`lowpass`,freq:9e3,peak:.9,decay:.028,attack:5e-4,to:t,seed:61}),e.burst(0,{type:`highpass`,freq:2500,peak:.55,decay:.006,attack:3e-4,to:t,seed:62}),e.ping(0,150,.8,.07,{to:t,sweepTo:50,sweepTime:.12,attack:.001}),e.ping(0,48,.5,.14,{to:t,attack:.002}),e.burst(.035,{freq:3e3,q:3,peak:.12,decay:.012,to:t,seed:63})}),t(`tinnitus`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.08,.03],[r*.55,.026],[r,0]]),e.osc(`sine`,6800,i),e.osc(`sine`,7060,e.gain(.7,i))}),t(`cloth`,(e,t,n,r)=>{let i=Math.floor(r*14);for(let t=0;t<i;t++)e.burst(Yp(t)*(r-.1),{freq:3e3+Yp(t+4)*2e3,q:.7,peak:.02+Yp(t+8)*.02,decay:.03,attack:.01,seed:t})}),t(`knife_meat`,(e,t,n,r)=>{for(let t=.05;t<r-.3;t+=.55){let n=e.gain(0),r=t;e.env(n.gain,[[0,0],[r,0],[r+.08,.04],[r+.35,0]]);let i=e.filter(`bandpass`,280,7,n);e.env(i.frequency,[[0,280],[r,280],[r+.35,800]],!0),e.noise(`pink`,i,r,r+.4,Math.round(t*10)+70),e.burst(r+.2,{freq:5e3,q:2,peak:.01,decay:.01})}}),t(`grit`,(e,t,n,r)=>{for(let t=0;t<24;t++)e.burst(Yp(t)*(r-.05),{freq:5500,q:2,peak:.02+Yp(t+1)*.02,decay:.002,seed:t})}),t(`case_latch`,e=>{let t=e.reverb(Hp,.2);e.burst(0,{freq:3e3,q:2,peak:.06,decay:.004,to:t}),e.burst(.18,{freq:3e3,q:2,peak:.06,decay:.004}),e.ping(.25,160,.05,.03)}),t(`rounds_clink`,(e,t,n,r)=>{for(let t=0;t<10;t++){let n=t/10*(r-.1)+Yp(t)*.1;e.ping(n,3800,.012,.02),e.ping(n,5600,.008,.015)}}),t(`velcro`,e=>{let t=e.gain(0);e.env(t.gain,[[0,0],[.03,.05],[.3,.035],[.35,0]]);let n=e.gain(.6,t);e.osc(`square`,180,e.mod(n.gain,.5)),e.noise(`white`,e.filter(`bandpass`,2500,.8,n),0,.4,80),e.reverb(Kp,.3,t)}),t(`strap_click`,e=>{e.burst(0,{freq:2400,q:2,peak:.05,decay:.005}),e.ping(0,900,.03,.02)}),t(`helmet_seal`,e=>{e.ping(0,210,.09,.05),e.burst(0,{type:`lowpass`,freq:900,peak:.06,decay:.02});let t=e.gain(0);e.env(t.gain,[[0,0],[.08,0],[.14,.04],[.6,.01],[.8,0]]),e.noise(`white`,e.filter(`highpass`,2500,.7,t),0,.85,81),e.ping(.82,90,.03,.03)}),t(`beacon_beeps`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,.03],[r*.35,.02],[r*.8,.004],[r,0]]);let a=e.filter(`lowpass`,2200,.7,i);for(let t=0;t<r;t+=.8){let n=e.gain(0,a);e.env(n.gain,[[0,0],[t,0],[t+.01,1],[t+.2,1],[t+.21,0]]),e.osc(`square`,950,n,t,t+.25)}}),t(`depress_hiss`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.15,.09],[r*.35,.05],[r*.8,.012],[r,0]]);let a=e.filter(`lowpass`,12e3,.7,i);e.env(a.frequency,[[0,12e3],[r,350]],!0),e.noise(`white`,e.filter(`highpass`,1200,.7,a),0,void 0,82);let o=e.gain(0,i);e.env(o.gain,[[0,.5],[r,0]]),e.osc(`sine`,55,o),e.osc(`sine`,4,e.mod(o.gain,.4))}),t(`hud_chime`,(e,t,n)=>{let r=e.filter(`bandpass`,2200,.8,e.gain(1)),i=!!(n.up??!0);e.ping(0,i?$.E6:$.A6,.02,.12,{to:r}),e.ping(.12,i?$.A6:$.E6,.02,.18,{to:r})}),t(`conducted_rumble`,(e,t,n,r)=>{let i=e.gain(0),a=Number(n.level??.12);e.env(i.gain,[[0,0],[.1,a],[r-.25,a*.8],[r,0]]),e.noise(`brown`,e.filter(`lowpass`,160,.7,i),0,void 0,83),e.ping(0,75,.15,.06),e.ping(r-.3,75,.06,.05)}),t(`thruster`,(e,t,n,r)=>{let i=Number(n.level??.08),a=e.gain(0);e.env(a.gain,[[0,0],[.08,i],[Math.max(.1,r-.15),i*.9],[r,0]]),e.noise(`brown`,e.filter(`lowpass`,220,.7,a),0,void 0,84),e.noise(`white`,e.filter(`bandpass`,3e3,.8,e.gain(.07,a)),0,void 0,85),e.osc(`sine`,7,e.mod(a.gain,i*.25)),e.burst(0,{type:`lowpass`,freq:1500,peak:.03,decay:.01}),e.burst(Math.max(0,r-.12),{type:`lowpass`,freq:1500,peak:.025,decay:.01})});let n=(e,t,n,r,i,a)=>{let o=e.gain(0);e.env(o.gain,[[0,0],[.05,n],[t-.08,n],[t,0]]);let s=e.gain(.7,o);e.noise(`white`,e.filter(`lowpass`,18,.5,e.mod(s.gain,.6)),0,void 0,86);let c=e.filter(`highpass`,r[0],.7,s);e.noise(`white`,e.filter(`lowpass`,r[1],.7,c),0,void 0,87),i&&(e.burst(0,{freq:1500,q:.8,peak:n*4,decay:.05}),e.burst(Math.max(0,t-.12),{freq:1500,q:.8,peak:n*5,decay:.08})),a&&(e.ping(t-.02,1200,n*1.4,.04,{type:`square`}),e.ping(t+.05,900,n*1.2,.04,{type:`square`}))};t(`radio_bed`,(e,t,r,i)=>n(e,i,.016,[380,3e3],!0,!0)),t(`chatter_bed`,(e,t,r,i)=>n(e,i,.009,[500,2400],!0,!1)),t(`phone_bed`,(e,t,r,i)=>{n(e,i,.006,[300,3400],!1,!1),e.osc(`sine`,50,e.gain(.004)),e.burst(0,{freq:2500,q:2,peak:.02,decay:.004})}),t(`broadcast_bed`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[.2,.012],[r-.2,.012],[r,0]]);let a=e.gain(.8,i);e.osc(`sine`,.3,e.mod(a.gain,.25)),e.noise(`pink`,e.filter(`bandpass`,1500,.5,a),0,void 0,88),e.osc(`sine`,2500,e.gain(.12,a))}),t(`radio_alarm`,(e,t,r,i)=>{let a=e.gain(0);e.env(a.gain,[[0,0],[.05,.03],[i-.2,.03],[i,0]]);let o=e.shaper(3,e.filter(`bandpass`,1200,.8,a)),s=e.osc(`square`,880,o);for(let t=0,n=0;t<i;t+=.25,n++){let r=e.t0+t;r>=e.now&&s.frequency.setValueAtTime(n%2==0?880:660,r)}n(e,i,.01,[380,3e3],!1,!1)}),t(`radio_off`,e=>{e.burst(0,{freq:2e3,q:2,peak:.04,decay:.003}),e.burst(.01,{freq:1500,q:.8,peak:.03,decay:.05})}),t(`hud_alarm`,(e,t,n,r)=>{let i=e.filter(`bandpass`,2600,2,e.gain(1)),a=n.quiet?1.5:.05;for(;a<r-.3;){let t=!n.quiet&&a<3,r=t?.022:.009;for(let n of t?[0,.18]:[0]){let t=e.gain(0,i),o=a+n;e.env(t.gain,[[0,0],[o,0],[o+.005,r],[o+.08,r],[o+.09,0]]),e.osc(`square`,2600,t,o,o+.12)}a+=t?1:4}}),t(`glove_ring`,e=>{let t=e.filter(`lowpass`,1800,.7,e.gain(1));for(let n=0;n<6;n++)e.burst(n*.13,{freq:1600,q:2,peak:.05,decay:.006,to:t,seed:n});e.ping(.9,160,.06,.04),e.burst(1,{freq:3e3,q:.8,peak:.02,decay:.15})}),t(`pocket`,e=>{let t=e.filter(`lowpass`,1500,.7,e.gain(1)),n=e.gain(0,t);e.env(n.gain,[[0,0],[.03,.04],[.22,.03],[.26,0]]);let r=e.gain(.6,n);e.osc(`square`,150,e.mod(r.gain,.5)),e.noise(`white`,e.filter(`bandpass`,2e3,.8,r),0,.3,90)}),t(`magnet`,e=>{e.ping(0,140,.12,.03,{sweepTo:90,sweepTime:.05}),e.burst(0,{type:`lowpass`,freq:800,peak:.06,decay:.01})}),t(`gun_vac`,(e,t,n)=>{let r=Number(n.count??10),i=Number(n.step??.135);for(let t=0;t<r;t++){let n=t*i;e.ping(n,72,.16,.045,{sweepTo:44,sweepTime:.06}),e.burst(n,{type:`lowpass`,freq:320,peak:.08,decay:.02,seed:t}),e.ping(n,1200,.006,.01)}}),t(`mag_vac`,e=>{e.burst(0,{type:`lowpass`,freq:1200,peak:.04,decay:.01}),e.ping(0,300,.03,.02)}),t(`heartbeat`,(e,t,n,r)=>{let i=e.filter(`lowpass`,160,.7,e.gain(1)),a=60/Number(n.bpm??54);for(let t=.1;t<r-.3;t+=a)e.ping(t,58,.16,.07,{to:i}),e.ping(t+.26,50,.12,.08,{to:i})}),t(`glove_on`,e=>{e.ping(0,180,.08,.04),e.burst(.05,{freq:3e3,q:.8,peak:.03,decay:.2});let t=e.filter(`bandpass`,2200,.8,e.gain(1));e.ping(.45,$.A6,.014,.1,{to:t}),e.ping(.55,$.D7,.014,.18,{to:t})}),t(`news_jingle`,e=>{let t=e.shaper(1.6,e.filter(`bandpass`,1800,.5,e.gain(1)));[$.G5,$.C6,$.E6,$.G6].forEach((n,r)=>Xp(e,r*.14,n,.03,.16,t,3.5,1.4)),e.noise(`pink`,e.filter(`bandpass`,1500,.5,e.gain(.01)),0,.8,91)}),t(`mus_open`,(e,t,n,r)=>{let i=e.gain(1),a=e.reverb(Jp,.7,i),o=e.gain(0,i);e.env(o.gain,[[0,0],[4,1],[r-1.5,1],[r,0]]),o.connect(a),e.osc(`sine`,$.D2,e.gain(.05,o)),e.osc(`sawtooth`,$.A2,e.filter(`lowpass`,300,.5,e.gain(.012,o))),e.noise(`pink`,e.filter(`bandpass`,2e3,.4,e.gain(.004,o)),0,void 0,92);let s=e.gain(.9,i);s.connect(a),Xp(e,9,$.D4,.05,1.6,s),Xp(e,9.9,$.A3,.045,1.6,s),Xp(e,10.8,$.F4,.05,2.4,s)}),t(`mus_irony`,(e,t,n,r)=>{let i=e.gain(1),a=e.reverb(Jp,.6,i),o=e.gain(0,i);o.connect(a),e.env(o.gain,[[0,0],[2.2,.05],[r-1,.04],[r,0]]),e.osc(`sawtooth`,$.D2,e.filter(`lowpass`,380,.6,o));let s=e.gain(0,a);e.env(s.gain,[[0,0],[1.5,.006],[r,0]]),e.osc(`sine`,$.A5,s);let c=e.gain(0,a);e.env(c.gain,[[0,0],[2.6,0],[3.6,.004],[r,0]]),e.osc(`sine`,$[`G#5`],c)}),t(`mus_low`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[2.5,1],[r-.3,1],[r,0]]);let a=e.reverb(Jp,.5,i),o=e.gain(.03,i);o.connect(a),e.osc(`sine`,$.D2,o),e.osc(`sine`,$.F2,e.gain(.02,i))}),t(`mus_reveal`,(e,t,n,r)=>{let i=e.gain(1),a=e.reverb(Jp,.6,i),o=e.gain(1,i);o.connect(a);for(let t of[`D3`,`A3`,`E4`,`F4`])Zp(e,$[t],.012,o,[[0,0],[3,1],[r-2,.9],[r,0]],[[0,400],[3,1800],[r,900]]);let s=e.gain(0,a);e.env(s.gain,[[0,0],[2.5,.005],[r,0]]),e.osc(`sine`,$.A5,s),e.osc(`sine`,$.E6,e.gain(.6,s))}),t(`mus_solitude`,(e,t,n,r)=>{let i=e.gain(1),a=e.reverb(Jp,.7,i),o=e.gain(1,i);o.connect(a);for(let t of[`D3`,`A3`,`F4`])Zp(e,$[t],.008,o,[[0,.9],[r-2.5,.8],[r,0]],[[0,900],[r,600]]);let s=Number(n.motif??10.8);Xp(e,s,$.D5,.04,1.8,o,3.5,.9),Xp(e,s+1.3,$.A4,.035,1.8,o,3.5,.9),Xp(e,s+2.6,$.F5,.04,2.8,o,3.5,.9)}),t(`mus_tension`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[3,1],[r-1.5,1],[r,0]]);let a=e.reverb(Jp,.35,i),o=.5;for(;o<r-.5;){let t=o/r;e.ping(o,46,.1+t*.05,.12,{to:i}),e.ping(o,92,.02,.08,{to:a}),o+=1.4-t*.55}let s=e.gain(0,i);e.env(s.gain,[[0,0],[r*.7,.012],[r,.02]]),e.osc(`sine`,$.D2,s),e.osc(`sine`,$[`D#2`],s)}),t(`mus_flight`,(e,t,n,r)=>{let i=e.gain(0);e.env(i.gain,[[0,0],[4,.7],[r-.3,1],[r,1]]);let a=e.reverb(Jp,.6,i);for(let[t,n]of[[$.A5,.006],[$[`A#5`],.004],[$.E6,.004]]){let r=e.gain(n,a);r.connect(i),e.osc(`sine`,t,r),e.osc(`sine`,.2+t/5e3,e.mod(r.gain,n*.5))}let o=e.gain(0,i);e.env(o.gain,[[0,0],[r,.025]]),e.osc(`sine`,$.D1,o)}),t(`mus_coda`,(e,t,n,r)=>{let i=e.gain(1),a=e.reverb(Jp,.75,i),o=e.gain(1,i);o.connect(a);for(let t of[`D2`,`A2`])Zp(e,$[t],.012,o,[[0,0],[2.5,1],[r-2,.8],[r,0]],[[0,300],[r,700]]);Xp(e,4,$.D3,.05,2,o),Xp(e,5.2,$.A2,.045,2,o),Xp(e,6.4,$.F3,.05,2.6,o),Xp(e,8.6,$.D3,.04,3.5,o)}),t(`mus_end`,(e,t,n,r)=>{let i=e.gain(1),a=e.reverb(Jp,.75,i),o=e.gain(1,i);o.connect(a),Xp(e,.4,$.D4,.04,1.8,o),Xp(e,1.5,$.A3,.035,1.8,o),Xp(e,2.6,$.F4,.04,2,o),Xp(e,3.9,$.E4,.035,2,o),Xp(e,5.8,$.D4,.045,3.6,o),Xp(e,5.8,$.D3,.03,3.6,o);for(let t of[`D3`,`A3`])Zp(e,$[t],.007,o,[[0,0],[5.4,0],[7,1],[r-1,.6],[r,0]],[[0,600],[r,400]])})}var $p={amb:1.1,sfx:1,suit:1.2,radio:1.1,music:1},em={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},tm=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},nm=new Ma(-1,1,1,-1,0,1),rm=new class extends Nr{constructor(){super(),this.setAttribute(`position`,new Tr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Tr([0,2,0,0,2,0],2))}},im=class{constructor(e){this._mesh=new L(rm,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,nm)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},am=class extends tm{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ei?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Zr.clone(e.uniforms),this.material=new ei({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new im(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},om=class extends tm{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},sm=class extends tm{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},cm=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new P);this._width=n.width,this._height=n.height,t=new Kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new am(em),this.copyPass.material.blending=0,this.clock=new La}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}om!==void 0&&(r instanceof om?n=!0:r instanceof sm&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new P);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},lm=class extends tm{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new I}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},um={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new I(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},dm=class e extends tm{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new P(256,256):new P(e.x,e.y),this.clearColor=new I(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Kt(i,a,{type:g}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Kt(i,a,{type:g});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Kt(i,a,{type:g});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=um;this.highPassUniforms=Zr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ei({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[3,5,7,9,11];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new P(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Zr.clone(em.uniforms),this.blendMaterial=new ei({uniforms:this.copyUniforms,vertexShader:em.vertexShader,fragmentShader:em.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new I,this._oldClearAlpha=1,this._basic=new vr,this._fsQuad=new im(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new P(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new ei({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new P(.5,.5)},direction:{value:new P(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new ei({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};dm.BlurDirectionX=new P(1,0),dm.BlurDirectionY=new P(0,1);var fm={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},pm=class extends tm{constructor(){super(),this.uniforms=Zr.clone(fm.uniforms),this.material=new ta({name:fm.name,uniforms:this.uniforms,vertexShader:fm.vertexShader,fragmentShader:fm.fragmentShader}),this._fsQuad=new im(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Nt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},mm={name:`FilmGrade`,uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:new P(1920,804)},uExposure:{value:1},uSaturation:{value:1},uContrast:{value:1},uLift:{value:new I(0,0,0)},uGain:{value:new I(1,1,1)},uVignette:{value:.35},uGrain:{value:.035},uFade:{value:0},uFlash:{value:0},uFlashColor:{value:new I(1,.95,.85)},uScope:{value:0},uScopeR:{value:.46},uReticle:{value:0},uReticleOffset:{value:new P(0,0)},uBlur:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uRes;
    uniform float uExposure, uSaturation, uContrast, uVignette, uGrain, uFade, uFlash;
    uniform vec3 uLift, uGain, uFlashColor;
    uniform float uScope, uScopeR, uReticle, uBlur;
    uniform vec2 uReticleOffset;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

    vec3 sampleBlur(vec2 uv, float amt) {
      if (amt <= 0.001) return texture2D(tDiffuse, uv).rgb;
      vec2 px = amt * 6.0 / uRes;
      vec3 c = texture2D(tDiffuse, uv).rgb * 0.2;
      c += texture2D(tDiffuse, uv + vec2( px.x, 0.0)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(-px.x, 0.0)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(0.0,  px.y)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(0.0, -px.y)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + px).rgb * 0.1;
      c += texture2D(tDiffuse, uv - px).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(px.x, -px.y)).rgb * 0.1;
      c += texture2D(tDiffuse, uv + vec2(-px.x, px.y)).rgb * 0.1;
      return c;
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uRes.x / uRes.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      vec3 col = sampleBlur(uv, uBlur);
      // a little chromatic fringe toward the rim of the scope glass
      if (uScope > 0.0) {
        float rr = length(p) / uScopeR;
        float fringe = smoothstep(0.75, 0.98, rr) * 0.004;
        col.r = sampleBlur(uv + (uv - 0.5) * fringe, uBlur).r;
        col.b = sampleBlur(uv - (uv - 0.5) * fringe, uBlur).b;
      }

      col *= uExposure;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      col = col * uGain + uLift * (1.0 - col);

      float d = length(p);
      col *= 1.0 - uVignette * pow(clamp((d - 0.32) / 0.78, 0.0, 1.0), 1.5);

      if (uScope > 0.0) {
        float r = length(p) / uScopeR;
        float mask = 1.0 - smoothstep(0.955, 1.0, r);
        float inner = 1.0 - 0.45 * smoothstep(0.55, 1.0, r);
        col *= mix(1.0, mask * inner, uScope);
        // reticle: thin cross with a gap, heavy posts, mil dots
        vec2 q = p - uReticleOffset;
        float lw = 1.25 / uRes.y;
        float thin = (1.0 - smoothstep(lw * 0.5, lw * 1.2, abs(q.y))) * step(0.012, abs(q.x));
        thin = max(thin, (1.0 - smoothstep(lw * 0.5, lw * 1.2, abs(q.x))) * step(0.012, abs(q.y)));
        float post = (1.0 - smoothstep(lw * 2.2, lw * 3.2, abs(q.y))) * step(uScopeR * 0.42, abs(q.x));
        post = max(post, (1.0 - smoothstep(lw * 2.2, lw * 3.2, abs(q.x))) * step(uScopeR * 0.42, abs(q.y)) * step(q.y, 0.0));
        float dots = 0.0;
        for (int k = 1; k <= 4; k++) {
          float s = float(k) * uScopeR * 0.085;
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q - vec2(s, 0.0))));
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q + vec2(s, 0.0))));
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q - vec2(0.0, s))));
          dots = max(dots, 1.0 - smoothstep(lw * 1.5, lw * 2.6, length(q + vec2(0.0, s))));
        }
        float ret = clamp(max(max(thin, post), dots), 0.0, 1.0) * uReticle * mask;
        col = mix(col, vec3(0.01, 0.012, 0.01), ret * 0.92);
      }

      float g = hash(uv * uRes + fract(uTime * 13.7) * 91.0) - 0.5;
      col += g * uGrain * (0.6 + 0.4 * (1.0 - l));
      col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));
      col *= 1.0 - clamp(uFade, 0.0, 1.0);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `};function hm(e,t){let n=new cm(e),r=new ai(40,2.39,1,2e4),i=new gi,a=new lm(i,r),o=new lm(t.scene,t.camera);o.clear=!1,o.clearDepth=!0;let s=new dm(new P(512,256),.6,.45,.85),c=new pm,l=new am(mm);n.addPass(a),n.addPass(o),n.addPass(s),n.addPass(c),n.addPass(l);let u=new P,d=new yt;return{composer:n,setSize(e,t){n.setSize(e,t)},setPixelRatio(e){n.setPixelRatio(e)},setBloomEnabled(e){s.enabled=e},render(c){let f=t.grade;e.getDrawingBufferSize(u),t.backdrop?(a.scene=t.backdrop,r.fov=t.camera.fov,r.aspect=t.camera.aspect,r.updateProjectionMatrix(),r.position.set(0,0,0),t.camera.getWorldQuaternion(d),r.quaternion.copy(d),r.updateMatrixWorld(!0)):a.scene=i,o.scene=t.scene,o.camera=t.camera,s.strength=f.bloomStrength,s.radius=f.bloomRadius,s.threshold=f.bloomThreshold,e.toneMappingExposure=f.toneExposure;let p=l.uniforms;p.uTime.value=c,p.uRes.value.copy(u),p.uExposure.value=f.exposure,p.uSaturation.value=f.saturation,p.uContrast.value=f.contrast,p.uLift.value.copy(f.lift),p.uGain.value.copy(f.gain),p.uVignette.value=f.vignette,p.uGrain.value=f.grain,p.uFade.value=f.fade,p.uFlash.value=f.flash,p.uFlashColor.value.copy(f.flashColor),p.uScope.value=f.scope,p.uScopeR.value=f.scopeRadius,p.uReticle.value=f.reticle,p.uReticleOffset.value.copy(f.reticleOffset),p.uBlur.value=f.blur,n.render()}}}function gm(e){let t=new gi;t.background=new I(789258);let n=(e,t,n)=>new vr({color:new I(e,t,n)}),r=new L(new R(14,.6,2.4),n(6,5.7,5.2));r.position.set(0,9,0);let i=new L(new R(40,.5,40),n(.09,.08,.07));i.position.set(0,-6,0);let a=new L(new R(40,14,.5),n(.16,.15,.14));a.position.set(0,0,-14);let o=new L(new R(.5,5,7),n(.35,.45,.62));o.position.set(14,2,0),t.add(r,i,a,o);let s=new To(e),c=s.fromScene(t,.03).texture;return s.dispose(),c}function _m(e){let t=new gi;t.background=new I(65795);let n=new L(new R(6,6,6),new vr({color:new I(1,.75,.45).multiplyScalar(30)}));n.position.set(0,-40,9);let r=new L(new R(40,2,40),new vr({color:new I(.05,.1,.22)}));r.position.set(0,-45,0);let i=new L(new R(44,1,4),new vr({color:new I(1,.45,.2).multiplyScalar(2)}));i.position.set(0,-43,18);let a=new L(new R(60,1,60),new vr({color:new I(.6,.55,.5)}));a.position.set(0,40,0),t.add(n,r,i,a);let o=new To(e),s=o.fromScene(t,.02).texture;return o.dispose(),s}function vm(e){let t=document.createElement(`div`);t.className=`ov`,t.innerHTML=`
    <div class="ov-caption"></div>
    <div class="ov-title"><div class="ov-title-main"></div><div class="ov-title-sub"></div></div>
    <div class="ov-hud"><div class="ov-hud-lines"></div><div class="ov-hud-alert"></div></div>
    <div class="ov-scope"></div>
    <div class="ov-end">
      <div class="ov-end-title">尘世之外</div>
      <div class="ov-end-line">根据刘慈欣《三体Ⅱ·黑暗森林》片段改编</div>
      <div class="ov-end-line dim">人物、场景、光影与声音全部由代码实时生成</div>
    </div>`,e.appendChild(t);let n=t.querySelector(`.ov-caption`),r=t.querySelector(`.ov-title`),i=t.querySelector(`.ov-title-main`),a=t.querySelector(`.ov-title-sub`),o=t.querySelector(`.ov-hud`),s=t.querySelector(`.ov-hud-lines`),c=t.querySelector(`.ov-hud-alert`),l=t.querySelector(`.ov-scope`),u=t.querySelector(`.ov-end`),d=``;return{update(e){let t=e.overlay,f=[t.caption,t.captionOpacity.toFixed(2),t.title,t.titleOpacity.toFixed(2),t.hud.visible,t.hud.lines.join(`|`),t.hud.alert,t.hud.alertOn,t.scopeText,t.endCard.toFixed(2),e.grade.scope].join(`#`);if(f===d)return;d=f,n.textContent!==t.caption&&(n.textContent=t.caption),n.style.opacity=String(t.captionOpacity),i.textContent!==t.title&&(i.textContent=t.title),a.textContent!==t.titleSub&&(a.textContent=t.titleSub),r.style.opacity=String(t.titleOpacity),o.style.opacity=String(t.hud.visible);let p=t.hud.lines.join(`
`);s.textContent!==p&&(s.textContent=p),c.textContent!==t.hud.alert&&(c.textContent=t.hud.alert),c.style.opacity=t.hud.alert?t.hud.alertOn?`1`:`0.35`:`0`,l.textContent=t.scopeText,l.style.opacity=e.grade.scope>.5&&t.scopeText?`0.85`:`0`,u.style.opacity=String(t.endCard)}}}var ym=document.querySelector(`#app`),bm=document.querySelector(`#stage`),xm=document.querySelector(`#loading`),Sm=document.querySelector(`#loading-text`);function Cm(){return new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0)))}async function wm(){await Cm();let e=Op(e=>{Sm.textContent=`正在生成场景：${e}`});ul(Cd,356);let t=new tl({antialias:!0,logarithmicDepthBuffer:!0,powerPreference:`high-performance`});t.toneMapping=4,t.outputColorSpace=Re,t.shadowMap.enabled=!0,t.shadowMap.type=2;let n=_m(t);e.sets.space.setEnvironment(n),e.sets.prologue.scene.environment=n,e.sets.cabin.scene.environment=n;let r=gm(t);for(let t of[e.sets.collector,e.sets.workshop,e.sets.basement])t.scene.traverse(e=>{let t=e.material;for(let e of Array.isArray(t)?t:t?[t]:[])e instanceof na&&e.metalness>=.3&&!e.envMap&&(e.envMap=r,e.envMapIntensity=.8)});let i=e.ctx,a=hm(t,i),o=vm(bm),s=new P,c=0,l=16,u=0,d=()=>{let e=performance.now();p.isPlaying&&c>0&&(l=l*.96+Math.min(200,e-c)*.04,l>40&&p.currentTime>4&&(u++,l=16,u===1?(t.setPixelRatio(1),a.setPixelRatio(1)):u===2&&a.setBloomEnabled(!1))),c=p.isPlaying?e:0},f={domElement:t.domElement,setSize:(e,n,r)=>{t.setSize(e,n,r),a.setSize(e,n)},setPixelRatio:e=>{t.setPixelRatio(e),a.setPixelRatio(e)},render:()=>{d(),t.getSize(s);let e=s.x/Math.max(1,s.y);Math.abs(i.camera.aspect-e)>1e-4&&(i.camera.aspect=e,i.camera.updateProjectionMatrix()),nu.uScale.value=s.y*t.getPixelRatio()/(2*Math.tan(vt.degToRad(i.camera.fov)/2)),a.render(p.currentTime),o.update(i),vl(i)},dispose:()=>t.dispose()},p=new dl({duration:356,context:i,shots:e.shots,cues:[...Cd,...Pp]}),m=new il(p);Qp(m);let h=new fl({player:p,renderer:f,scene:i.scene,camera:()=>i.camera,container:bm,maxPixelRatio:1.5}),g=hl({player:p,audio:m,container:ym}),_=!1;p.addTypedEventListener(`statechange`,e=>{if(e.detail.state===`playing`&&!_){_=!0;for(let[e,t]of Object.entries($p))m.setGroupGain(e,t)}});let v=[1,11,18,30,108,120,140,146,170,177,180.5,183.2,186,228,248,270,280.5,305,324,340];for(let e=0;e<v.length;e++)Sm.textContent=`正在预热画面 ${e+1}/${v.length}`,p.seek(v[e]),await Cm();p.seek(219.6);let y=``;try{y=t.domElement.toDataURL(`image/jpeg`,.86)}catch{y=``}p.seek(0);let b=document.createElement(`div`);b.className=`poster`,y&&(b.style.backgroundImage=`url(${y})`),b.innerHTML=`
    <div class="poster-title">尘世之外</div>
    <div class="poster-sub">根据刘慈欣《三体Ⅱ·黑暗森林》片段改编</div>
    <button class="poster-play" type="button" aria-label="播放">▶</button>
    <div class="poster-hint">建议佩戴耳机 · 全片约 6 分钟</div>`,bm.appendChild(b);let x=async()=>{await m.unlock(),p.isPlaying||p.play()};b.addEventListener(`click`,()=>void x()),p.addTypedEventListener(`statechange`,e=>{e.detail.state===`playing`&&(b.style.opacity=`0`,b.style.pointerEvents=`none`,setTimeout(()=>b.remove(),1e3))}),window.addEventListener(`keydown`,e=>{let t=e.target;t&&(t.tagName===`BUTTON`||t.tagName===`INPUT`)||(e.code===`Space`?(e.preventDefault(),m.unlock().then(()=>p.isPlaying?p.pause():p.play())):e.code===`ArrowRight`?p.seek(Math.min(356,p.currentTime+5)):e.code===`ArrowLeft`&&p.seek(Math.max(0,p.currentTime-5)))}),xm.style.opacity=`0`,setTimeout(()=>xm.remove(),700),window.__film={player:p,audio:m,stage:h,controls:g,film:e}}wm().catch(e=>{console.error(e),Sm.textContent=`加载失败：${e instanceof Error?e.message:String(e)}`});
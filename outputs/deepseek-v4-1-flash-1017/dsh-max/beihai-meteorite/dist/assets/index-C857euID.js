(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,ee=1029,O=1030,k=1031,A=1033,te=33776,j=33777,ne=33778,M=33779,N=35840,re=35841,ie=35842,ae=35843,oe=36196,P=37492,se=37496,F=37808,ce=37809,le=37810,ue=37811,de=37812,fe=37813,pe=37814,me=37815,I=37816,he=37817,ge=37818,_e=37819,L=37820,ve=37821,R=36492,ye=36494,be=36495,xe=36283,Se=36284,Ce=36285,we=36286,Te=2300,Ee=2301,De=2302,Oe=2400,ke=2401,Ae=2402,je=3200,Me=3201,Ne=`srgb`,Pe=`srgb-linear`,Fe=`linear`,Ie=`srgb`,Le=7680,Re=35044,ze=35048,Be=2e3,Ve=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},He=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ue=Math.PI/180,We=180/Math.PI;function Ge(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(He[e&255]+He[e>>8&255]+He[e>>16&255]+He[e>>24&255]+`-`+He[t&255]+He[t>>8&255]+`-`+He[t>>16&15|64]+He[t>>24&255]+`-`+He[n&63|128]+He[n>>8&255]+`-`+He[n>>16&255]+He[n>>24&255]+He[r&255]+He[r>>8&255]+He[r>>16&255]+He[r>>24&255]).toLowerCase()}function Ke(e,t,n){return Math.max(t,Math.min(n,e))}function qe(e,t){return(e%t+t)%t}function Je(e,t,n){return(1-n)*e+n*t}function Ye(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function Xe(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var z=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ze=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(o===0){e[t+0]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=m;return}if(u!==m||s!==d||c!==f||l!==p){let e=1-o,t=s*d+c*f+l*p+u*m,n=t>=0?1:-1,r=1-t*t;if(r>2**-52){let i=Math.sqrt(r),a=Math.atan2(i,t*n);e=Math.sin(e*a)/i,o=Math.sin(o*a)/i}let i=o*n;if(s=s*e+d*i,c=c*e+f*i,l=l*e+p*i,u=u*e+m*i,e===1-o){let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:console.warn(`THREE.Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;let s=1-o*o;if(s<=2**-52){let e=1-t;return this._w=e*a+t*this._w,this._x=e*n+t*this._x,this._y=e*r+t*this._y,this._z=e*i+t*this._z,this.normalize(),this}let c=Math.sqrt(s),l=Math.atan2(c,o),u=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=i*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($e.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($e.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qe.copy(this).projectOnVector(e),this.sub(Qe)}reflect(e){return this.sub(Qe.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qe=new B,$e=new Ze,V=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(et.makeScale(e,t)),this}rotate(e){return this.premultiply(et.makeRotation(-e)),this}translate(e,t){return this.premultiply(et.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},et=new V;function tt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function nt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function rt(){let e=nt(`canvas`);return e.style.display=`block`,e}var it={};function at(e){e in it||(it[e]=!0,console.warn(e))}function ot(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var st=new V().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ct=new V().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lt(){let e={enabled:!0,workingColorSpace:Pe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=dt(e.r),e.g=dt(e.g),e.b=dt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=ft(e.r),e.g=ft(e.g),e.b=ft(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Fe:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return at(`THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return at(`THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Pe]:{primaries:t,whitePoint:r,transfer:Fe,toXYZ:st,fromXYZ:ct,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ne},outputColorSpaceConfig:{drawingBufferColorSpace:Ne}},[Ne]:{primaries:t,whitePoint:r,transfer:Ie,toXYZ:st,fromXYZ:ct,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ne}}}),e}var ut=lt();function dt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function ft(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var pt,mt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{pt===void 0&&(pt=nt(`canvas`)),pt.width=e.width,pt.height=e.height;let t=pt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=pt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=nt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=dt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(dt(t[e]/255)*255):t[e]=dt(t[e]);return{data:t,width:e.width,height:e.height}}return console.warn(`THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},ht=0,gt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ht++}),this.uuid=Ge(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(_t(r[t].image)):e.push(_t(r[t]))}else e=_t(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function _t(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?mt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn(`THREE.Texture: Unable to serialize Texture.`),{})}var vt=0,yt=new B,bt=class r extends Ve{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vt++}),this.uuid=Ge(),this.name=``,this.source=new gt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new z(0,0),this.repeat=new z(1,1),this.center=new z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new V,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(yt).x}get height(){return this.source.getSize(yt).y}get depth(){return this.source.getSize(yt).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};bt.DEFAULT_IMAGE=null,bt.DEFAULT_MAPPING=300,bt.DEFAULT_ANISOTROPY=1;var xt=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},St=class extends Ve{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t);let r=new bt({width:e,height:t,depth:n.depth});this.textures=[];let i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new gt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ct=class extends St{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},wt=class extends bt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Tt=class extends bt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Et=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ot.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ot.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ot.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ot):Ot.fromBufferAttribute(r,t),Ot.applyMatrix4(e.matrixWorld),this.expandByPoint(Ot);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),kt.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),kt.copy(e.boundingBox)),kt.applyMatrix4(e.matrixWorld),this.union(kt)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ot),Ot.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(It),Lt.subVectors(this.max,It),At.subVectors(e.a,It),jt.subVectors(e.b,It),Mt.subVectors(e.c,It),Nt.subVectors(jt,At),Pt.subVectors(Mt,jt),Ft.subVectors(At,Mt);let t=[0,-Nt.z,Nt.y,0,-Pt.z,Pt.y,0,-Ft.z,Ft.y,Nt.z,0,-Nt.x,Pt.z,0,-Pt.x,Ft.z,0,-Ft.x,-Nt.y,Nt.x,0,-Pt.y,Pt.x,0,-Ft.y,Ft.x,0];return!Bt(t,At,jt,Mt,Lt)||(t=[1,0,0,0,1,0,0,0,1],!Bt(t,At,jt,Mt,Lt))?!1:(Rt.crossVectors(Nt,Pt),t=[Rt.x,Rt.y,Rt.z],Bt(t,At,jt,Mt,Lt))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ot).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ot).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Dt=[new B,new B,new B,new B,new B,new B,new B,new B],Ot=new B,kt=new Et,At=new B,jt=new B,Mt=new B,Nt=new B,Pt=new B,Ft=new B,It=new B,Lt=new B,Rt=new B,zt=new B;function Bt(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){zt.fromArray(e,a);let o=i.x*Math.abs(zt.x)+i.y*Math.abs(zt.y)+i.z*Math.abs(zt.z),s=t.dot(zt),c=n.dot(zt),l=r.dot(zt);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Vt=new Et,Ht=new B,Ut=new B,Wt=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Vt.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ht.subVectors(e,this.center);let t=Ht.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ht,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ut.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ht.copy(e.center).add(Ut)),this.expandByPoint(Ht.copy(e.center).sub(Ut))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Gt=new B,Kt=new B,qt=new B,Jt=new B,Yt=new B,Xt=new B,Zt=new B,Qt=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gt.copy(this.origin).addScaledVector(this.direction,t),Gt.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Kt.copy(e).add(t).multiplyScalar(.5),qt.copy(t).sub(e).normalize(),Jt.copy(this.origin).sub(Kt);let i=e.distanceTo(t)*.5,a=-this.direction.dot(qt),o=Jt.dot(this.direction),s=-Jt.dot(qt),c=Jt.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Kt).addScaledVector(qt,d),f}intersectSphere(e,t){Gt.subVectors(e.center,this.origin);let n=Gt.dot(this.direction),r=Gt.dot(Gt)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gt)!==null}intersectTriangle(e,t,n,r,i){Yt.subVectors(t,e),Xt.subVectors(n,e),Zt.crossVectors(Yt,Xt);let a=this.direction.dot(Zt),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Jt.subVectors(this.origin,e);let s=o*this.direction.dot(Xt.crossVectors(Jt,Xt));if(s<0)return null;let c=o*this.direction.dot(Yt.cross(Jt));if(c<0||s+c>a)return null;let l=-o*Jt.dot(Zt);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$t=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/en.setFromMatrixColumn(e,0).length(),i=1/en.setFromMatrixColumn(e,1).length(),a=1/en.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nn,e,rn)}lookAt(e,t,n){let r=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),an.crossVectors(n,sn),an.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),an.crossVectors(n,sn)),an.normalize(),on.crossVectors(sn,an),r[0]=an.x,r[4]=on.x,r[8]=sn.x,r[1]=an.y,r[5]=on.y,r[9]=sn.y,r[2]=an.z,r[6]=on.z,r[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],O=r[2],k=r[6],A=r[10],te=r[14],j=r[3],ne=r[7],M=r[11],N=r[15];return i[0]=a*x+o*T+s*O+c*j,i[4]=a*S+o*E+s*k+c*ne,i[8]=a*C+o*D+s*A+c*M,i[12]=a*w+o*ee+s*te+c*N,i[1]=l*x+u*T+d*O+f*j,i[5]=l*S+u*E+d*k+f*ne,i[9]=l*C+u*D+d*A+f*M,i[13]=l*w+u*ee+d*te+f*N,i[2]=p*x+m*T+h*O+g*j,i[6]=p*S+m*E+h*k+g*ne,i[10]=p*C+m*D+h*A+g*M,i[14]=p*w+m*ee+h*te+g*N,i[3]=_*x+v*T+y*O+b*j,i[7]=_*S+v*E+y*k+b*ne,i[11]=_*C+v*D+y*A+b*M,i[15]=_*w+v*ee+y*te+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15];return p*(+i*s*u-r*c*u-i*o*d+n*c*d+r*o*f-n*s*f)+m*(+t*s*f-t*c*d+i*a*d-r*a*f+r*c*l-i*s*l)+h*(+t*c*u-t*o*f-i*a*u+n*a*f+i*o*l-n*c*l)+g*(-r*o*l-t*s*u+t*o*d+r*a*u-n*a*d+n*s*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=u*h*c-m*d*c+m*s*f-o*h*f-u*s*g+o*d*g,v=p*d*c-l*h*c-p*s*f+a*h*f+l*s*g-a*d*g,y=l*m*c-p*u*c+p*o*f-a*m*f-l*o*g+a*u*g,b=p*u*s-l*m*s-p*o*d+a*m*d+l*o*h-a*u*h,x=t*_+n*v+r*y+i*b;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/x;return e[0]=_*S,e[1]=(m*d*i-u*h*i-m*r*f+n*h*f+u*r*g-n*d*g)*S,e[2]=(o*h*i-m*s*i+m*r*c-n*h*c-o*r*g+n*s*g)*S,e[3]=(u*s*i-o*d*i-u*r*c+n*d*c+o*r*f-n*s*f)*S,e[4]=v*S,e[5]=(l*h*i-p*d*i+p*r*f-t*h*f-l*r*g+t*d*g)*S,e[6]=(p*s*i-a*h*i-p*r*c+t*h*c+a*r*g-t*s*g)*S,e[7]=(a*d*i-l*s*i+l*r*c-t*d*c-a*r*f+t*s*f)*S,e[8]=y*S,e[9]=(p*u*i-l*m*i-p*n*f+t*m*f+l*n*g-t*u*g)*S,e[10]=(a*m*i-p*o*i+p*n*c-t*m*c-a*n*g+t*o*g)*S,e[11]=(l*o*i-a*u*i-l*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=b*S,e[13]=(l*m*r-p*u*r+p*n*d-t*m*d-l*n*h+t*u*h)*S,e[14]=(p*o*r-a*m*r-p*n*s+t*m*s+a*n*h-t*o*h)*S,e[15]=(a*u*r-l*o*r+l*n*s-t*u*s-a*n*d+t*o*d)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=en.set(r[0],r[1],r[2]).length(),a=en.set(r[4],r[5],r[6]).length(),o=en.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],tn.copy(this);let s=1/i,c=1/a,l=1/o;return tn.elements[0]*=s,tn.elements[1]*=s,tn.elements[2]*=s,tn.elements[4]*=c,tn.elements[5]*=c,tn.elements[6]*=c,tn.elements[8]*=l,tn.elements[9]*=l,tn.elements[10]*=l,t.setFromRotationMatrix(tn),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=Be,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Be,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},en=new B,tn=new $t,nn=new B(0,0,0),rn=new B(1,1,1),an=new B,on=new B,sn=new B,cn=new $t,ln=new Ze,un=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Ke(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Ke(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:console.warn(`THREE.Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ln.setFromEuler(this),this.setFromQuaternion(ln,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER=`XYZ`;var dn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},fn=0,pn=new B,mn=new Ze,hn=new $t,gn=new B,_n=new B,vn=new B,yn=new Ze,bn=new B(1,0,0),xn=new B(0,1,0),Sn=new B(0,0,1),Cn={type:`added`},wn={type:`removed`},Tn={type:`childadded`,child:null},En={type:`childremoved`,child:null},Dn=class e extends Ve{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fn++}),this.uuid=Ge(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new B,n=new un,r=new Ze,i=new B(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $t},normalMatrix:{value:new V}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.multiply(mn),this}rotateOnWorldAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.premultiply(mn),this}rotateX(e){return this.rotateOnAxis(bn,e)}rotateY(e){return this.rotateOnAxis(xn,e)}rotateZ(e){return this.rotateOnAxis(Sn,e)}translateOnAxis(e,t){return pn.copy(e).applyQuaternion(this.quaternion),this.position.add(pn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bn,e)}translateY(e){return this.translateOnAxis(xn,e)}translateZ(e){return this.translateOnAxis(Sn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gn.copy(e):gn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),_n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(_n,gn,this.up):hn.lookAt(gn,_n,this.up),this.quaternion.setFromRotationMatrix(hn),r&&(hn.extractRotation(r.matrixWorld),mn.setFromRotationMatrix(hn),this.quaternion.premultiply(mn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(console.error(`THREE.Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null):console.error(`THREE.Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,e,vn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,yn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Dn.DEFAULT_UP=new B(0,1,0),Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=new B,kn=new B,An=new B,jn=new B,Mn=new B,Nn=new B,Pn=new B,Fn=new B,In=new B,Ln=new B,Rn=new xt,zn=new xt,Bn=new xt,Vn=class e{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),On.subVectors(e,t),r.cross(On);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){On.subVectors(r,t),kn.subVectors(n,t),An.subVectors(e,t);let a=On.dot(On),o=On.dot(kn),s=On.dot(An),c=kn.dot(kn),l=kn.dot(An),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,jn)!==null&&jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,jn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,jn.x),s.addScaledVector(a,jn.y),s.addScaledVector(o,jn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Rn.setScalar(0),zn.setScalar(0),Bn.setScalar(0),Rn.fromBufferAttribute(e,t),zn.fromBufferAttribute(e,n),Bn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Rn,i.x),a.addScaledVector(zn,i.y),a.addScaledVector(Bn,i.z),a}static isFrontFacing(e,t,n,r){return On.subVectors(n,t),kn.subVectors(e,t),On.cross(kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),On.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Mn.subVectors(r,n),Nn.subVectors(i,n),Fn.subVectors(e,n);let s=Mn.dot(Fn),c=Nn.dot(Fn);if(s<=0&&c<=0)return t.copy(n);In.subVectors(e,r);let l=Mn.dot(In),u=Nn.dot(In);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Mn,a);Ln.subVectors(e,i);let f=Mn.dot(Ln),p=Nn.dot(Ln);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Nn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Pn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Pn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Mn,a).addScaledVector(Nn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Hn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Wn={h:0,s:0,l:0};function Gn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var H=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ne){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ut.workingColorSpace){if(e=qe(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Gn(i,r,e+1/3),this.g=Gn(i,r,e),this.b=Gn(i,r,e-1/3)}return ut.colorSpaceToWorking(this,r),this}setStyle(e,t=Ne){function n(t){t!==void 0&&parseFloat(t)<1&&console.warn(`THREE.Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn(`THREE.Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);console.warn(`THREE.Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ne){let n=Hn[e.toLowerCase()];return n===void 0?console.warn(`THREE.Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=dt(e.r),this.g=dt(e.g),this.b=dt(e.b),this}copyLinearToSRGB(e){return this.r=ft(e.r),this.g=ft(e.g),this.b=ft(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ne){return ut.workingToColorSpace(Kn.copy(this),e),Math.round(Ke(Kn.r*255,0,255))*65536+Math.round(Ke(Kn.g*255,0,255))*256+Math.round(Ke(Kn.b*255,0,255))}getHexString(e=Ne){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.workingToColorSpace(Kn.copy(this),t);let n=Kn.r,r=Kn.g,i=Kn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=ut.workingColorSpace){return ut.workingToColorSpace(Kn.copy(this),t),e.r=Kn.r,e.g=Kn.g,e.b=Kn.b,e}getStyle(e=Ne){ut.workingToColorSpace(Kn.copy(this),e);let t=Kn.r,n=Kn.g,r=Kn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(Wn);let n=Je(Un.h,Wn.h,t),r=Je(Un.s,Wn.s,t),i=Je(Un.l,Wn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kn=new H;H.NAMES=Hn;var qn=0,Jn=class extends Ve{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qn++}),this.uuid=Ge(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new H(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Le,this.stencilZFail=Le,this.stencilZPass=Le,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},U=class extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new H(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Yn=new B,Xn=new z,Zn=0,Qn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Re,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix3(e),this.setXY(t,Xn.x,Xn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.applyMatrix3(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.applyMatrix4(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.applyNormalMatrix(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yn.fromBufferAttribute(this,t),Yn.transformDirection(e),this.setXYZ(t,Yn.x,Yn.y,Yn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ye(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ye(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ye(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ye(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ye(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),r=Xe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),r=Xe(r,this.array),i=Xe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},$n=class extends Qn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},er=class extends Qn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},tr=class extends Qn{constructor(e,t,n){super(new Float32Array(e),t,n)}},nr=0,rr=new $t,ir=new Dn,ar=new B,or=new Et,sr=new Et,cr=new B,lr=class e extends Ve{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nr++}),this.uuid=Ge(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(tt(e)?er:$n)(e,1):e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new V().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rr.makeRotationFromQuaternion(e),this.applyMatrix4(rr),this}rotateX(e){return rr.makeRotationX(e),this.applyMatrix4(rr),this}rotateY(e){return rr.makeRotationY(e),this.applyMatrix4(rr),this}rotateZ(e){return rr.makeRotationZ(e),this.applyMatrix4(rr),this}translate(e,t,n){return rr.makeTranslation(e,t,n),this.applyMatrix4(rr),this}scale(e,t,n){return rr.makeScale(e,t,n),this.applyMatrix4(rr),this}lookAt(e){return ir.lookAt(e),ir.updateMatrix(),this.applyMatrix4(ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new tr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&console.warn(`THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Et);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];or.setFromBufferAttribute(n),this.morphTargetsRelative?(cr.addVectors(this.boundingBox.min,or.min),this.boundingBox.expandByPoint(cr),cr.addVectors(this.boundingBox.max,or.max),this.boundingBox.expandByPoint(cr)):(this.boundingBox.expandByPoint(or.min),this.boundingBox.expandByPoint(or.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error(`THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error(`THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(or.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];sr.setFromBufferAttribute(n),this.morphTargetsRelative?(cr.addVectors(or.min,sr.min),or.expandByPoint(cr),cr.addVectors(or.max,sr.max),or.expandByPoint(cr)):(or.expandByPoint(sr.min),or.expandByPoint(sr.max))}or.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)cr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(cr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)cr.fromBufferAttribute(a,t),o&&(ar.fromBufferAttribute(e,t),cr.add(ar)),r=Math.max(r,n.distanceToSquared(cr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error(`THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new Qn(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new B,s[e]=new B;let c=new B,l=new B,u=new B,d=new z,f=new z,p=new z,m=new B,h=new B;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new B,y=new B,b=new B,x=new B;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new Qn(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new B,i=new B,a=new B,o=new B,s=new B,c=new B,l=new B,u=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cr.fromBufferAttribute(e,t),cr.normalize(),e.setXYZ(t,cr.x,cr.y,cr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Qn(a,r,i)}if(this.index===null)return console.warn(`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},ur=new $t,dr=new Qt,fr=new Wt,pr=new B,mr=new B,hr=new B,gr=new B,_r=new B,vr=new B,yr=new B,br=new B,W=class extends Dn{constructor(e=new lr,t=new U){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){vr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(_r.fromBufferAttribute(s,e),a?vr.addScaledVector(_r,r):vr.addScaledVector(_r.sub(t),r))}t.add(vr)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(i),dr.copy(e.ray).recast(e.near),!(fr.containsPoint(dr.origin)===!1&&(dr.intersectSphere(fr,pr)===null||dr.origin.distanceToSquared(pr)>(e.far-e.near)**2))&&(ur.copy(i).invert(),dr.copy(e.ray).applyMatrix4(ur),(n.boundingBox===null||dr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,dr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Sr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Sr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Sr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Sr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function xr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;br.copy(s),br.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(br);return l<n.near||l>n.far?null:{distance:l,point:br.clone(),object:e}}function Sr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,mr),e.getVertexPosition(c,hr),e.getVertexPosition(l,gr);let u=xr(e,t,n,r,mr,hr,gr,yr);if(u){let e=new B;Vn.getBarycoord(yr,mr,hr,gr,e),i&&(u.uv=Vn.getInterpolatedAttribute(i,s,c,l,e,new z)),a&&(u.uv1=Vn.getInterpolatedAttribute(a,s,c,l,e,new z)),o&&(u.normal=Vn.getInterpolatedAttribute(o,s,c,l,e,new B),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new B,materialIndex:0};Vn.getNormal(mr,hr,gr,t.normal),u.face=t,u.barycoord=e}return u}var Cr=class e extends lr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new tr(c,3)),this.setAttribute(`normal`,new tr(l,3)),this.setAttribute(`uv`,new tr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new B;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function wr(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function Tr(e){let t={};for(let n=0;n<e.length;n++){let r=wr(e[n]);for(let e in r)t[e]=r[e]}return t}function Er(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Dr(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ut.workingColorSpace}var Or={clone:wr,merge:Tr},kr=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ar=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,jr=class extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kr,this.fragmentShader=Ar,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=Er(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Mr=class extends Dn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=Be,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Nr=new B,Pr=new z,Fr=new z,Ir=class extends Mr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=We*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ue*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return We*2*Math.atan(Math.tan(Ue*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nr.x,Nr.y).multiplyScalar(-e/Nr.z),Nr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nr.x,Nr.y).multiplyScalar(-e/Nr.z)}getViewSize(e,t){return this.getViewBounds(e,Pr,Fr),t.subVectors(Fr,Pr)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ue*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Lr=-90,Rr=1,zr=class extends Dn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ir(Lr,Rr,e,t);r.layers=this.layers,this.add(r);let i=new Ir(Lr,Rr,e,t);i.layers=this.layers,this.add(i);let a=new Ir(Lr,Rr,e,t);a.layers=this.layers,this.add(a);let o=new Ir(Lr,Rr,e,t);o.layers=this.layers,this.add(o);let s=new Ir(Lr,Rr,e,t);s.layers=this.layers,this.add(s);let c=new Ir(Lr,Rr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,i),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Br=class extends bt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Vr=class extends Ct{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Br(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Cr(5,5,5),i=new jr({name:`CubemapFromEquirect`,uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new W(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new zr(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},G=class extends Dn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Hr={type:`move`},Ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new G,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new G,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new G,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new G;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wr=class extends Dn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Gr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Re,this.updateRanges=[],this.version=0,this.uuid=Ge()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ge()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ge()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Kr=new B,qr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kr.fromBufferAttribute(this,t),Kr.applyMatrix4(e),this.setXYZ(t,Kr.x,Kr.y,Kr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kr.fromBufferAttribute(this,t),Kr.applyNormalMatrix(e),this.setXYZ(t,Kr.x,Kr.y,Kr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kr.fromBufferAttribute(this,t),Kr.transformDirection(e),this.setXYZ(t,Kr.x,Kr.y,Kr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ye(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ye(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ye(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ye(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ye(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),r=Xe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),r=Xe(r,this.array),i=Xe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){console.log(`THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Qn(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log(`THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Jr=class extends Jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new H(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Yr,Xr=new B,Zr=new B,Qr=new B,$r=new z,ei=new z,ti=new $t,ni=new B,ri=new B,ii=new B,ai=new z,oi=new z,si=new z,ci=class extends Dn{constructor(e=new Jr){if(super(),this.isSprite=!0,this.type=`Sprite`,Yr===void 0){Yr=new lr;let e=new Gr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Yr.setIndex([0,1,2,0,2,3]),Yr.setAttribute(`position`,new qr(e,3,0,!1)),Yr.setAttribute(`uv`,new qr(e,2,3,!1))}this.geometry=Yr,this.material=e,this.center=new z(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error(`THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Zr.setFromMatrixScale(this.matrixWorld),ti.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Qr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Zr.multiplyScalar(-Qr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;li(ni.set(-.5,-.5,0),Qr,a,Zr,r,i),li(ri.set(.5,-.5,0),Qr,a,Zr,r,i),li(ii.set(.5,.5,0),Qr,a,Zr,r,i),ai.set(0,0),oi.set(1,0),si.set(1,1);let o=e.ray.intersectTriangle(ni,ri,ii,!1,Xr);if(o===null&&(li(ri.set(-.5,.5,0),Qr,a,Zr,r,i),oi.set(0,1),o=e.ray.intersectTriangle(ni,ii,ri,!1,Xr),o===null))return;let s=e.ray.origin.distanceTo(Xr);s<e.near||s>e.far||t.push({distance:s,point:Xr.clone(),uv:Vn.getInterpolation(Xr,ni,ri,ii,ai,oi,si,new z),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function li(e,t,n,r,i,a){$r.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?ei.copy($r):(ei.x=a*$r.x-i*$r.y,ei.y=i*$r.x+a*$r.y),e.copy(t),e.x+=ei.x,e.y+=ei.y,e.applyMatrix4(ti)}var ui=class extends bt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},di=class extends Qn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},fi=new $t,pi=new $t,mi=[],hi=new Et,gi=new $t,_i=new W,vi=new Wt,yi=class extends W{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new di(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,gi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Et),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fi),hi.copy(e.boundingBox).applyMatrix4(fi),this.boundingBox.union(hi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,fi),vi.copy(e.boundingSphere).applyMatrix4(fi),this.boundingSphere.union(vi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(_i.geometry=this.geometry,_i.material=this.material,_i.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vi.copy(this.boundingSphere),vi.applyMatrix4(n),e.ray.intersectsSphere(vi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,fi),pi.multiplyMatrices(n,fi),_i.matrixWorld=pi,_i.raycast(e,mi);for(let e=0,n=mi.length;e<n;e++){let n=mi[e];n.instanceId=i,n.object=this,t.push(n)}mi.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new di(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ui(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;i[s]=o,i.set(n,s+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bi=new B,xi=new B,Si=new V,Ci=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=bi.subVectors(n,t).cross(xi.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(bi),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Si.getNormalMatrix(e),r=this.coplanarPoint(bi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},wi=new Wt,Ti=new z(.5,.5),Ei=new B,Di=class{constructor(e=new Ci,t=new Ci,n=new Ci,r=new Ci,i=new Ci,a=new Ci){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Be,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(e){return wi.center.set(0,0,0),wi.radius=.7071067811865476+Ti.distanceTo(e.center),wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ei.x=r.normal.x>0?e.max.x:e.min.x,Ei.y=r.normal.y>0?e.max.y:e.min.y,Ei.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ei)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Oi=class extends Jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new H(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ki=new B,Ai=new B,ji=new $t,Mi=new Qt,Ni=new Wt,Pi=new B,Fi=new B,Ii=class extends Dn{constructor(e=new lr,t=new Oi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ki.fromBufferAttribute(t,e-1),Ai.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ki.distanceTo(Ai);e.setAttribute(`lineDistance`,new tr(n,1))}else console.warn(`THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ni.copy(n.boundingSphere),Ni.applyMatrix4(r),Ni.radius+=i,e.ray.intersectsSphere(Ni)===!1)return;ji.copy(r).invert(),Mi.copy(e.ray).applyMatrix4(ji);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Li(this,e,Mi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Li(this,e,Mi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Li(this,e,Mi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Li(this,e,Mi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Li(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(ki.fromBufferAttribute(s,i),Ai.fromBufferAttribute(s,a),n.distanceSqToSegment(ki,Ai,Pi,Fi)>r)return;Pi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Pi);if(!(c<t.near||c>t.far))return{distance:c,point:Fi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Ri=new B,zi=new B,Bi=class extends Ii{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Ri.fromBufferAttribute(t,e),zi.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Ri.distanceTo(zi);e.setAttribute(`lineDistance`,new tr(n,1))}else console.warn(`THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Vi=class extends Jn{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new H(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hi=new $t,Ui=new Qt,Wi=new Wt,Gi=new B,Ki=class extends Dn{constructor(e=new lr,t=new Vi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wi.copy(n.boundingSphere),Wi.applyMatrix4(r),Wi.radius+=i,e.ray.intersectsSphere(Wi)===!1)return;Hi.copy(r).invert(),Ui.copy(e.ray).applyMatrix4(Hi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Gi.fromBufferAttribute(l,n),qi(Gi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Gi.fromBufferAttribute(l,a),qi(Gi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function qi(e,t,n,r,i,a,o){let s=Ui.distanceSqToPoint(e);if(s<n){let n=new B;Ui.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ji=class extends bt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Yi=class extends bt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new gt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Xi=class extends bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Zi=class e extends lr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new tr(p,3)),this.setAttribute(`normal`,new tr(m,3)),this.setAttribute(`uv`,new tr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Qi=class e extends lr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],s=[],c=[],l=new B,u=new B,d=new B;for(let a=0;a<=n;a++)for(let f=0;f<=r;f++){let p=f/r*i,m=a/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(p),u.y=(e+t*Math.cos(m))*Math.sin(p),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),l.x=e*Math.cos(p),l.y=e*Math.sin(p),d.subVectors(u,l).normalize(),s.push(d.x,d.y,d.z),c.push(f/r),c.push(a/n)}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,o=(r+1)*(e-1)+t,s=(r+1)*e+t;a.push(n,i,s),a.push(i,o,s)}this.setIndex(a),this.setAttribute(`position`,new tr(o,3)),this.setAttribute(`normal`,new tr(s,3)),this.setAttribute(`uv`,new tr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},K=class extends Jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new H(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new H(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$i=class extends K{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new H(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new H(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new H(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ea=class extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=je,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ta=class extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function na(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ra(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var ia=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},aa=class extends ia{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oe,endingEnd:Oe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ke:i=e,o=2*t-n;break;case Ae:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case ke:a=e,s=2*n-t;break;case Ae:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},oa=class extends ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},sa=class extends ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ca=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=na(t,this.TimeBufferType),this.values=na(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:na(e.times,Array),values:na(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new oa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new aa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Te:t=this.InterpolantFactoryMethodDiscrete;break;case Ee:t=this.InterpolantFactoryMethodLinear;break;case De:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return console.warn(`THREE.KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Te;case this.InterpolantFactoryMethodLinear:return Ee;case this.InterpolantFactoryMethodSmooth:return De}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error(`THREE.KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(console.error(`THREE.KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){console.error(`THREE.KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){console.error(`THREE.KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&ra(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){console.error(`THREE.KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===De,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ca.prototype.ValueTypeName=``,ca.prototype.TimeBufferType=Float32Array,ca.prototype.ValueBufferType=Float32Array,ca.prototype.DefaultInterpolation=Ee;var la=class extends ca{constructor(e,t,n){super(e,t,n)}};la.prototype.ValueTypeName=`bool`,la.prototype.ValueBufferType=Array,la.prototype.DefaultInterpolation=Te,la.prototype.InterpolantFactoryMethodLinear=void 0,la.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}};ua.prototype.ValueTypeName=`color`;var da=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}};da.prototype.ValueTypeName=`number`;var fa=class extends ia{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Ze.slerpFlat(i,0,a,c-o,a,c,s);return i}},pa=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new fa(this.times,this.values,this.getValueSize(),e)}};pa.prototype.ValueTypeName=`quaternion`,pa.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends ca{constructor(e,t,n){super(e,t,n)}};ma.prototype.ValueTypeName=`string`,ma.prototype.ValueBufferType=Array,ma.prototype.DefaultInterpolation=Te,ma.prototype.InterpolantFactoryMethodLinear=void 0,ma.prototype.InterpolantFactoryMethodSmooth=void 0;var ha=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}};ha.prototype.ValueTypeName=`vector`;var ga=class extends Dn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new H(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},_a=class extends ga{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new H(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},va=new $t,ya=new B,ba=new B,xa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new z(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Di,this._frameExtents=new z(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ya.setFromMatrixPosition(e.matrixWorld),t.position.copy(ya),ba.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ba),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sa=class extends xa{constructor(){super(new Ir(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=We*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Ca=class extends ga{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Sa}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},wa=new $t,Ta=new B,Ea=new B,Da=class extends xa{constructor(){super(new Ir(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new z(4,2),this._viewportCount=6,this._viewports=[new xt(2,1,1,1),new xt(0,1,1,1),new xt(3,1,1,1),new xt(1,1,1,1),new xt(3,0,1,1),new xt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,i=e.distance||n.far;i!==n.far&&(n.far=i,n.updateProjectionMatrix()),Ta.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ta),Ea.copy(n.position),Ea.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ea),n.updateMatrixWorld(),r.makeTranslation(-Ta.x,-Ta.y,-Ta.z),wa.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wa,n.coordinateSystem,n.reversedDepth)}},Oa=class extends ga{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Da}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ka=class extends Mr{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Aa=class extends xa{constructor(){super(new ka(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ja=class extends ga{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.shadow=new Aa}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Ma=class extends ga{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Na=class extends Ir{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Pa=`\\[\\]\\.:\\/`,Fa=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ia=`[^\\[\\]\\.:\\/]`,La=`[^`+Pa.replace(`\\.`,``)+`]`,Ra=`((?:WC+[\\/:])*)`.replace(`WC`,Ia),za=`(WCOD+)?`.replace(`WCOD`,La),Ba=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ia),Va=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ia),Ha=RegExp(`^`+Ra+za+Ba+Va+`$`),Ua=[`material`,`materials`,`bones`,`map`],Wa=class{constructor(e,t,n){let r=n||Ga.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ga=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Fa,``)}static parseTrackName(e){let t=Ha.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ua.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn(`THREE.PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){console.error(`THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){console.error(`THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){console.error(`THREE.PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){console.error(`THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){console.error(`THREE.PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){console.error(`THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;console.error(`THREE.PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){console.error(`THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ga.Composite=Wa,Ga.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ga.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ga.prototype.GetterByBindingType=[Ga.prototype._getValue_direct,Ga.prototype._getValue_array,Ga.prototype._getValue_arrayElement,Ga.prototype._getValue_toArray],Ga.prototype.SetterByBindingTypeAndVersioning=[[Ga.prototype._setValue_direct,Ga.prototype._setValue_direct_setNeedsUpdate,Ga.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ga.prototype._setValue_array,Ga.prototype._setValue_array_setNeedsUpdate,Ga.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ga.prototype._setValue_arrayElement,Ga.prototype._setValue_arrayElement_setNeedsUpdate,Ga.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ga.prototype._setValue_fromArray,Ga.prototype._setValue_fromArray_setNeedsUpdate,Ga.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Ka(e,t,n,r){let i=qa(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case O:return e*t*2/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case A:return e*t*4/i.components*i.byteLength;case te:case j:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ne:case M:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case re:case ae:return Math.max(e,16)*Math.max(t,8)/4;case N:case ie:return Math.max(e,8)*Math.max(t,8)/2;case oe:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ce:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case le:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ue:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case de:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case fe:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case me:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case I:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case L:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ve:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case R:case ye:case be:return Math.ceil(e/4)*Math.ceil(t/4)*16;case xe:case Se:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ce:case we:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function qa(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`180`}})),typeof window<`u`&&(window.__THREE__?console.warn(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`180`);function Ja(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ya(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Xa={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},q={common:{diffuse:{value:new H(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new V}},envmap:{envMap:{value:null},envMapRotation:{value:new V},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new V}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new V}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new V},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new V},normalScale:{value:new z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new V},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new V}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new V}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new V}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new H(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new H(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0},uvTransform:{value:new V}},sprite:{diffuse:{value:new H(16777215)},opacity:{value:1},center:{value:new z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}}},Za={basic:{uniforms:Tr([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:Xa.meshbasic_vert,fragmentShader:Xa.meshbasic_frag},lambert:{uniforms:Tr([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new H(0)}}]),vertexShader:Xa.meshlambert_vert,fragmentShader:Xa.meshlambert_frag},phong:{uniforms:Tr([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new H(0)},specular:{value:new H(1118481)},shininess:{value:30}}]),vertexShader:Xa.meshphong_vert,fragmentShader:Xa.meshphong_frag},standard:{uniforms:Tr([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new H(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xa.meshphysical_vert,fragmentShader:Xa.meshphysical_frag},toon:{uniforms:Tr([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new H(0)}}]),vertexShader:Xa.meshtoon_vert,fragmentShader:Xa.meshtoon_frag},matcap:{uniforms:Tr([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:Xa.meshmatcap_vert,fragmentShader:Xa.meshmatcap_frag},points:{uniforms:Tr([q.points,q.fog]),vertexShader:Xa.points_vert,fragmentShader:Xa.points_frag},dashed:{uniforms:Tr([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xa.linedashed_vert,fragmentShader:Xa.linedashed_frag},depth:{uniforms:Tr([q.common,q.displacementmap]),vertexShader:Xa.depth_vert,fragmentShader:Xa.depth_frag},normal:{uniforms:Tr([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:Xa.meshnormal_vert,fragmentShader:Xa.meshnormal_frag},sprite:{uniforms:Tr([q.sprite,q.fog]),vertexShader:Xa.sprite_vert,fragmentShader:Xa.sprite_frag},background:{uniforms:{uvTransform:{value:new V},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xa.background_vert,fragmentShader:Xa.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new V}},vertexShader:Xa.backgroundCube_vert,fragmentShader:Xa.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xa.cube_vert,fragmentShader:Xa.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xa.equirect_vert,fragmentShader:Xa.equirect_frag},distanceRGBA:{uniforms:Tr([q.common,q.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xa.distanceRGBA_vert,fragmentShader:Xa.distanceRGBA_frag},shadow:{uniforms:Tr([q.lights,q.fog,{color:{value:new H(0)},opacity:{value:1}}]),vertexShader:Xa.shadow_vert,fragmentShader:Xa.shadow_frag}};Za.physical={uniforms:Tr([Za.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new V},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new V},clearcoatNormalScale:{value:new z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new V},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new V},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new V},sheen:{value:0},sheenColor:{value:new H(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new V},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new V},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new V},transmissionSamplerSize:{value:new z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new V},attenuationDistance:{value:0},attenuationColor:{value:new H(0)},specularColor:{value:new H(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new V},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new V},anisotropyVector:{value:new z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new V}}]),vertexShader:Xa.meshphysical_vert,fragmentShader:Xa.meshphysical_frag};var Qa={r:0,b:0,g:0},$a=new un,eo=new $t;function to(e,t,n,r,i,a,o){let s=new H(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let r=e.isScene===!0?e.background:null;return r&&r.isTexture&&(r=(e.backgroundBlurriness>0?n:t).get(r)),r}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let r=m(n);r&&(r.isCubeTexture||r.mapping===306)?(u===void 0&&(u=new W(new Cr(1,1,1),new jr({name:`BackgroundCubeMaterial`,uniforms:wr(Za.backgroundCube.uniforms),vertexShader:Za.backgroundCube.vertexShader,fragmentShader:Za.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),$a.copy(n.backgroundRotation),$a.x*=-1,$a.y*=-1,$a.z*=-1,r.isCubeTexture&&r.isRenderTargetTexture===!1&&($a.y*=-1,$a.z*=-1),u.material.uniforms.envMap.value=r,u.material.uniforms.flipEnvMap.value=r.isCubeTexture&&r.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(eo.makeRotationFromEuler($a)),u.material.toneMapped=ut.getTransfer(r.colorSpace)!==Ie,(d!==r||f!==r.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):r&&r.isTexture&&(l===void 0&&(l=new W(new Zi(2,2),new jr({name:`BackgroundMaterial`,uniforms:wr(Za.background.uniforms),vertexShader:Za.background.vertexShader,fragmentShader:Za.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=r,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=ut.getTransfer(r.colorSpace)!==Ie,r.matrixAutoUpdate===!0&&r.updateMatrix(),l.material.uniforms.uvTransform.value.copy(r.matrix),(d!==r||f!==r.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=r,f=r.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(Qa,Dr(e)),r.buffers.color.setClear(Qa.r,Qa.g,Qa.b,n,o)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:v}}function no(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n){let i=n.wireframe===!0,a=r[e.id];a===void 0&&(a={},r[e.id]=a);let o=a[t.id];o===void 0&&(o={},a[t.id]=o);let s=o[i];return s===void 0&&(s=f(c()),o[i]=s),s}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){w();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n)u(n[e].object),delete n[e];delete t[e]}delete r[e.id]}function C(e){for(let t in r){let n=r[t];if(n[e.id]===void 0)continue;let i=n[e.id];for(let e in i)u(i[e].object),delete i[e];delete n[e.id]}}function w(){T(),o=!0,a!==i&&(a=i,l(a.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:w,resetDefaultState:T,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ro(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function io(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(console.warn(`THREE.WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,S=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:x,maxSamples:S}}function ao(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ci,s=new V,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}function oo(e){let t=new WeakMap;function n(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function r(r){if(r&&r.isTexture){let a=r.mapping;if(a===303||a===304)if(t.has(r)){let e=t.get(r).texture;return n(e,r.mapping)}else{let a=r.image;if(a&&a.height>0){let o=new Vr(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener(`dispose`,i),n(o.texture,r.mapping)}return null}}return r}function i(e){let n=e.target;n.removeEventListener(`dispose`,i);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function a(){t=new WeakMap}return{get:r,dispose:a}}var so=4,co=[.125,.215,.35,.446,.526,.582],lo=20,uo=new ka,fo=new H,po=null,mo=0,ho=0,go=!1,_o=(1+Math.sqrt(5))/2,vo=1/_o,yo=[new B(-_o,vo,0),new B(_o,vo,0),new B(-vo,0,_o),new B(vo,0,_o),new B(0,_o,-vo),new B(0,_o,vo),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],bo=new B,xo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=bo}=i;po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Do(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(po,mo,ho),this._renderer.xr.enabled=go,e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Pe,depthBuffer:!1},r=Co(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Co(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=So(r)),this._blurMaterial=To(r,e,t)}return r}_compileMaterial(e){let t=new W(this._lodPlanes[0],e);this._renderer.compile(t,uo)}_sceneToCubeUV(e,t,n,r,i){let a=new Ir(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(fo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let d=new U({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1}),f=new W(new Cr,d),p=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,p=!0):(d.color.copy(fo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;wo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(f,a),c.render(e,a)}f.geometry.dispose(),f.material.dispose(),c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Do()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=new W(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;wo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,uo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let t=1;t<r;t++){let n=Math.sqrt(this._sigmas[t]*this._sigmas[t]-this._sigmas[t-1]*this._sigmas[t-1]),i=yo[(r-t-1)%yo.length];this._blur(e,t-1,t,n,i)}t.autoClear=n}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&console.error(`blur direction must be either latitudinal or longitudinal!`);let l=new W(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):lo;m>lo&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${lo}`);let h=[],g=0;for(let e=0;e<lo;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];wo(t,3*v*(r>_-so?r-_+so:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,uo)}};function So(e){let t=[],n=[],r=[],i=e,a=e-so+1+co.length;for(let o=0;o<a;o++){let a=2**i;n.push(a);let s=1/a;o>e-so?s=co[o-e+so-1]:o===0&&(s=0),r.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new lr;h.setAttribute(`position`,new Qn(f,3)),h.setAttribute(`uv`,new Qn(p,2)),h.setAttribute(`faceIndex`,new Qn(m,1)),t.push(h),i>so&&i--}return{lodPlanes:t,sizeLods:n,sigmas:r}}function Co(e,t,n){let r=new Ct(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function wo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function To(e,t,n){let r=new Float32Array(lo),i=new B(0,1,0);return new jr({name:`SphericalGaussianBlur`,defines:{n:lo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Eo(){return new jr({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Oo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Do(){return new jr({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Oo(){return`

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
	`}function ko(e){let t=new WeakMap,n=null;function r(r){if(r&&r.isTexture){let o=r.mapping,s=o===303||o===304,c=o===301||o===302;if(s||c){let o=t.get(r),l=o===void 0?0:o.texture.pmremVersion;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return n===null&&(n=new xo(e)),o=s?n.fromEquirectangular(r,o):n.fromCubemap(r,o),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),o.texture;if(o!==void 0)return o.texture;{let l=r.image;return s&&l&&l.height>0||c&&l&&i(l)?(n===null&&(n=new xo(e)),o=s?n.fromEquirectangular(r):n.fromCubemap(r),o.texture.pmremVersion=r.pmremVersion,t.set(r,o),r.addEventListener(`dispose`,a),o.texture):null}}}return r}function i(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function a(e){let n=e.target;n.removeEventListener(`dispose`,a);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:o}}function Ao(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r;switch(n){case`WEBGL_depth_texture`:r=e.getExtension(`WEBGL_depth_texture`)||e.getExtension(`MOZ_WEBGL_depth_texture`)||e.getExtension(`WEBKIT_WEBGL_depth_texture`);break;case`EXT_texture_filter_anisotropic`:r=e.getExtension(`EXT_texture_filter_anisotropic`)||e.getExtension(`MOZ_EXT_texture_filter_anisotropic`)||e.getExtension(`WEBKIT_EXT_texture_filter_anisotropic`);break;case`WEBGL_compressed_texture_s3tc`:r=e.getExtension(`WEBGL_compressed_texture_s3tc`)||e.getExtension(`MOZ_WEBGL_compressed_texture_s3tc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_s3tc`);break;case`WEBGL_compressed_texture_pvrtc`:r=e.getExtension(`WEBGL_compressed_texture_pvrtc`)||e.getExtension(`WEBKIT_WEBGL_compressed_texture_pvrtc`);break;default:r=e.getExtension(n)}return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&at(`THREE.WebGLRenderer: `+e+` extension not supported.`),t}}}function jo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else if(i!==void 0){let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}else return;let s=new(tt(n)?er:$n)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Mo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function No(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:console.error(`THREE.WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Po(e,t,n){let r=new WeakMap,i=new xt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new wt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new z(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Fo(e,t,n,r){let i=new WeakMap;function a(a){let o=r.render.frame,c=a.geometry,l=t.get(a,c);if(i.get(l)!==o&&(t.update(l),i.set(l,o)),a.isInstancedMesh&&(a.hasEventListener(`dispose`,s)===!1&&a.addEventListener(`dispose`,s),i.get(a)!==o&&(n.update(a.instanceMatrix,e.ARRAY_BUFFER),a.instanceColor!==null&&n.update(a.instanceColor,e.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let e=a.skeleton;i.get(e)!==o&&(e.update(),i.set(e,o))}return l}function o(){i=new WeakMap}function s(e){let t=e.target;t.removeEventListener(`dispose`,s),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:a,dispose:o}}var Io=new bt,Lo=new Yi(1,1),Ro=new wt,zo=new Tt,Bo=new Br,Vo=[],Ho=[],Uo=new Float32Array(16),Wo=new Float32Array(9),Go=new Float32Array(4);function Ko(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Vo[i];if(a===void 0&&(a=new Float32Array(i),Vo[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function qo(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Jo(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Yo(e,t){let n=Ho[t];n===void 0&&(n=new Int32Array(t),Ho[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Xo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Zo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qo(n,t))return;e.uniform2fv(this.addr,t),Jo(n,t)}}function Qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(qo(n,t))return;e.uniform3fv(this.addr,t),Jo(n,t)}}function $o(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qo(n,t))return;e.uniform4fv(this.addr,t),Jo(n,t)}}function es(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(qo(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Jo(n,t)}else{if(qo(n,r))return;Go.set(r),e.uniformMatrix2fv(this.addr,!1,Go),Jo(n,r)}}function ts(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(qo(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Jo(n,t)}else{if(qo(n,r))return;Wo.set(r),e.uniformMatrix3fv(this.addr,!1,Wo),Jo(n,r)}}function ns(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(qo(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Jo(n,t)}else{if(qo(n,r))return;Uo.set(r),e.uniformMatrix4fv(this.addr,!1,Uo),Jo(n,r)}}function rs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function is(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qo(n,t))return;e.uniform2iv(this.addr,t),Jo(n,t)}}function as(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(qo(n,t))return;e.uniform3iv(this.addr,t),Jo(n,t)}}function os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qo(n,t))return;e.uniform4iv(this.addr,t),Jo(n,t)}}function ss(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function cs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(qo(n,t))return;e.uniform2uiv(this.addr,t),Jo(n,t)}}function ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(qo(n,t))return;e.uniform3uiv(this.addr,t),Jo(n,t)}}function us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(qo(n,t))return;e.uniform4uiv(this.addr,t),Jo(n,t)}}function ds(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Lo.compareFunction=515,a=Lo):a=Io,n.setTexture2D(t||a,i)}function fs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||zo,i)}function ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Bo,i)}function ms(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ro,i)}function hs(e){switch(e){case 5126:return Xo;case 35664:return Zo;case 35665:return Qo;case 35666:return $o;case 35674:return es;case 35675:return ts;case 35676:return ns;case 5124:case 35670:return rs;case 35667:case 35671:return is;case 35668:case 35672:return as;case 35669:case 35673:return os;case 5125:return ss;case 36294:return cs;case 36295:return ls;case 36296:return us;case 35678:case 36198:case 36298:case 36306:case 35682:return ds;case 35679:case 36299:case 36307:return fs;case 35680:case 36300:case 36308:case 36293:return ps;case 36289:case 36303:case 36311:case 36292:return ms}}function gs(e,t){e.uniform1fv(this.addr,t)}function _s(e,t){let n=Ko(t,this.size,2);e.uniform2fv(this.addr,n)}function vs(e,t){let n=Ko(t,this.size,3);e.uniform3fv(this.addr,n)}function ys(e,t){let n=Ko(t,this.size,4);e.uniform4fv(this.addr,n)}function bs(e,t){let n=Ko(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function xs(e,t){let n=Ko(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ss(e,t){let n=Ko(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Cs(e,t){e.uniform1iv(this.addr,t)}function ws(e,t){e.uniform2iv(this.addr,t)}function Ts(e,t){e.uniform3iv(this.addr,t)}function Es(e,t){e.uniform4iv(this.addr,t)}function Ds(e,t){e.uniform1uiv(this.addr,t)}function Os(e,t){e.uniform2uiv(this.addr,t)}function ks(e,t){e.uniform3uiv(this.addr,t)}function As(e,t){e.uniform4uiv(this.addr,t)}function js(e,t,n){let r=this.cache,i=t.length,a=Yo(n,i);qo(r,a)||(e.uniform1iv(this.addr,a),Jo(r,a));for(let e=0;e!==i;++e)n.setTexture2D(t[e]||Io,a[e])}function Ms(e,t,n){let r=this.cache,i=t.length,a=Yo(n,i);qo(r,a)||(e.uniform1iv(this.addr,a),Jo(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||zo,a[e])}function Ns(e,t,n){let r=this.cache,i=t.length,a=Yo(n,i);qo(r,a)||(e.uniform1iv(this.addr,a),Jo(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Bo,a[e])}function Ps(e,t,n){let r=this.cache,i=t.length,a=Yo(n,i);qo(r,a)||(e.uniform1iv(this.addr,a),Jo(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ro,a[e])}function Fs(e){switch(e){case 5126:return gs;case 35664:return _s;case 35665:return vs;case 35666:return ys;case 35674:return bs;case 35675:return xs;case 35676:return Ss;case 5124:case 35670:return Cs;case 35667:case 35671:return ws;case 35668:case 35672:return Ts;case 35669:case 35673:return Es;case 5125:return Ds;case 36294:return Os;case 36295:return ks;case 36296:return As;case 35678:case 36198:case 36298:case 36306:case 35682:return js;case 35679:case 36299:case 36307:return Ms;case 35680:case 36300:case 36308:case 36293:return Ns;case 36289:case 36303:case 36311:case 36292:return Ps}}var Is=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=hs(t.type)}},Ls=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fs(t.type)}},Rs=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},zs=/(\w+)(\])?(\[|\.)?/g;function Bs(e,t){e.seq.push(t),e.map[t.id]=t}function Vs(e,t,n){let r=e.name,i=r.length;for(zs.lastIndex=0;;){let a=zs.exec(r),o=zs.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Bs(n,l===void 0?new Is(s,e,t):new Ls(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Rs(s),Bs(n,e)),n=e}}}var Hs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Vs(n,e.getUniformLocation(t,n.name),this)}}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Us(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ws=37297,Gs=0;function Ks(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var qs=new V;function Js(e){ut._getMatrix(qs,ut.workingColorSpace,e);let t=`mat3( ${qs.elements.map(e=>e.toFixed(4))} )`;switch(ut.getTransfer(e)){case Fe:return[t,`LinearTransferOETF`];case Ie:return[t,`sRGBTransferOETF`];default:return console.warn(`THREE.WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ys(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ks(e.getShaderSource(t),r)}return i}function Xs(e,t){let n=Js(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}function Zs(e,t){let n;switch(t){case 1:n=`Linear`;break;case 2:n=`Reinhard`;break;case 3:n=`Cineon`;break;case 4:n=`ACESFilmic`;break;case 6:n=`AgX`;break;case 7:n=`Neutral`;break;case 5:n=`Custom`;break;default:console.warn(`THREE.WebGLProgram: Unsupported toneMapping:`,t),n=`Linear`}return`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Qs=new B;function $s(){return ut.getLuminanceCoefficients(Qs),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Qs.x.toFixed(4)}, ${Qs.y.toFixed(4)}, ${Qs.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ec(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(rc).join(`
`)}function tc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function nc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function rc(e){return e!==``}function ic(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ac(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var oc=/^[ \t]*#include +<([\w\d./]+)>/gm;function sc(e){return e.replace(oc,lc)}var cc=new Map;function lc(e,t){let n=Xa[t];if(n===void 0){let e=cc.get(t);if(e!==void 0)n=Xa[e],console.warn(`THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return sc(n)}var uc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dc(e){return e.replace(uc,fc)}function fc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function pc(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}function mc(e){let t=`SHADOWMAP_TYPE_BASIC`;return e.shadowMapType===1?t=`SHADOWMAP_TYPE_PCF`:e.shadowMapType===2?t=`SHADOWMAP_TYPE_PCF_SOFT`:e.shadowMapType===3&&(t=`SHADOWMAP_TYPE_VSM`),t}function hc(e){let t=`ENVMAP_TYPE_CUBE`;if(e.envMap)switch(e.envMapMode){case 301:case 302:t=`ENVMAP_TYPE_CUBE`;break;case 306:t=`ENVMAP_TYPE_CUBE_UV`}return t}function gc(e){let t=`ENVMAP_MODE_REFLECTION`;if(e.envMap)switch(e.envMapMode){case 302:t=`ENVMAP_MODE_REFRACTION`}return t}function _c(e){let t=`ENVMAP_BLENDING_NONE`;if(e.envMap)switch(e.combine){case 0:t=`ENVMAP_BLENDING_MULTIPLY`;break;case 1:t=`ENVMAP_BLENDING_MIX`;break;case 2:t=`ENVMAP_BLENDING_ADD`}return t}function vc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function yc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=mc(n),l=hc(n),u=gc(n),d=_c(n),f=vc(n),p=ec(n),m=tc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(rc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(rc).join(`
`),_.length>0&&(_+=`
`)):(g=[pc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(rc).join(`
`),_=[pc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor||n.batchingColor?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Xa.tonemapping_pars_fragment,n.toneMapping===0?``:Zs(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Xa.colorspace_pars_fragment,Xs(`linearToOutputTexel`,n.outputColorSpace),$s(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(rc).join(`
`)),o=sc(o),o=ic(o,n),o=ac(o,n),s=sc(s),s=ic(s,n),s=ac(s,n),o=dc(o),s=dc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Us(i,i.VERTEX_SHADER,y),S=Us(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Ys(i,x,`vertex`),n=Ys(i,S,`fragment`);console.error(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):console.warn(`THREE.WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Hs(i,h),T=nc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ws)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Gs++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var bc=0,xc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Sc(e),t.set(e,n)),n}},Sc=class{constructor(e){this.id=bc++,this.code=e,this.usedTimes=0}};function Cc(e,t,n,r,i,a,o){let s=new dn,c=new xc,l=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures,p=i.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distanceRGBA`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(a,s,u,g,_){let v=g.fog,y=_.geometry,b=a.isMeshStandardMaterial?g.environment:null,x=(a.isMeshStandardMaterial?n:t).get(a.envMap||b),S=x&&x.mapping===306?x.image.height:null,C=m[a.type];a.precision!==null&&(p=i.getMaxPrecision(a.precision),p!==a.precision&&console.warn(`THREE.WebGLProgram.getParameters:`,a.precision,`not supported, using`,p,`instead.`));let w=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,T=w===void 0?0:w.length,E=0;y.morphAttributes.position!==void 0&&(E=1),y.morphAttributes.normal!==void 0&&(E=2),y.morphAttributes.color!==void 0&&(E=3);let D,ee,O,k;if(C){let e=Za[C];D=e.vertexShader,ee=e.fragmentShader}else D=a.vertexShader,ee=a.fragmentShader,c.update(a),O=c.getVertexShaderID(a),k=c.getFragmentShaderID(a);let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=_.isInstancedMesh===!0,ne=_.isBatchedMesh===!0,M=!!a.map,N=!!a.matcap,re=!!x,ie=!!a.aoMap,ae=!!a.lightMap,oe=!!a.bumpMap,P=!!a.normalMap,se=!!a.displacementMap,F=!!a.emissiveMap,ce=!!a.metalnessMap,le=!!a.roughnessMap,ue=a.anisotropy>0,de=a.clearcoat>0,fe=a.dispersion>0,pe=a.iridescence>0,me=a.sheen>0,I=a.transmission>0,he=ue&&!!a.anisotropyMap,ge=de&&!!a.clearcoatMap,_e=de&&!!a.clearcoatNormalMap,L=de&&!!a.clearcoatRoughnessMap,ve=pe&&!!a.iridescenceMap,R=pe&&!!a.iridescenceThicknessMap,ye=me&&!!a.sheenColorMap,be=me&&!!a.sheenRoughnessMap,xe=!!a.specularMap,Se=!!a.specularColorMap,Ce=!!a.specularIntensityMap,we=I&&!!a.transmissionMap,Te=I&&!!a.thicknessMap,Ee=!!a.gradientMap,De=!!a.alphaMap,Oe=a.alphaTest>0,ke=!!a.alphaHash,Ae=!!a.extensions,je=0;a.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:C,shaderType:a.type,shaderName:a.name,vertexShader:D,fragmentShader:ee,defines:a.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:a.isRawShaderMaterial===!0,glslVersion:a.glslVersion,precision:p,batching:ne,batchingColor:ne&&_._colorsTexture!==null,instancing:j,instancingColor:j&&_.instanceColor!==null,instancingMorph:j&&_.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Pe,alphaToCoverage:!!a.alphaToCoverage,map:M,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:P,displacementMap:f&&se,emissiveMap:F,normalMapObjectSpace:P&&a.normalMapType===1,normalMapTangentSpace:P&&a.normalMapType===0,metalnessMap:ce,roughnessMap:le,anisotropy:ue,anisotropyMap:he,clearcoat:de,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:L,dispersion:fe,iridescence:pe,iridescenceMap:ve,iridescenceThicknessMap:R,sheen:me,sheenColorMap:ye,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:Ce,transmission:I,transmissionMap:we,thicknessMap:Te,gradientMap:Ee,opaque:a.transparent===!1&&a.blending===1&&a.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:ke,combine:a.combine,mapUv:M&&h(a.map.channel),aoMapUv:ie&&h(a.aoMap.channel),lightMapUv:ae&&h(a.lightMap.channel),bumpMapUv:oe&&h(a.bumpMap.channel),normalMapUv:P&&h(a.normalMap.channel),displacementMapUv:se&&h(a.displacementMap.channel),emissiveMapUv:F&&h(a.emissiveMap.channel),metalnessMapUv:ce&&h(a.metalnessMap.channel),roughnessMapUv:le&&h(a.roughnessMap.channel),anisotropyMapUv:he&&h(a.anisotropyMap.channel),clearcoatMapUv:ge&&h(a.clearcoatMap.channel),clearcoatNormalMapUv:_e&&h(a.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:L&&h(a.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&h(a.iridescenceMap.channel),iridescenceThicknessMapUv:R&&h(a.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&h(a.sheenColorMap.channel),sheenRoughnessMapUv:be&&h(a.sheenRoughnessMap.channel),specularMapUv:xe&&h(a.specularMap.channel),specularColorMapUv:Se&&h(a.specularColorMap.channel),specularIntensityMapUv:Ce&&h(a.specularIntensityMap.channel),transmissionMapUv:we&&h(a.transmissionMap.channel),thicknessMapUv:Te&&h(a.thicknessMap.channel),alphaMapUv:De&&h(a.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(P||ue),vertexColors:a.vertexColors,vertexAlphas:a.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:_.isPoints===!0&&!!y.attributes.uv&&(M||De),fog:!!v,useFog:a.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:a.flatShading===!0&&a.wireframe===!1,sizeAttenuation:a.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:_.isSkinnedMesh===!0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numSpotLightMaps:s.spotLightMap.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numSpotLightShadowsWithMaps:s.numSpotLightShadowsWithMaps,numLightProbes:s.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:a.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:M&&a.map.isVideoTexture===!0&&ut.getTransfer(a.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:F&&a.emissiveMap.isVideoTexture===!0&&ut.getTransfer(a.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:a.premultipliedAlpha,doubleSided:a.side===2,flipSided:a.side===1,useDepthPacking:a.depthPacking>=0,depthPacking:a.depthPacking||0,index0AttributeName:a.index0AttributeName,extensionClipCullDistance:Ae&&a.extensions.clipCullDistance===!0&&r.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&a.extensions.multiDraw===!0||ne)&&r.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:r.has(`KHR_parallel_shader_compile`),customProgramCacheKey:a.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){s.disableAll(),t.supportsVertexTextures&&s.enable(0),t.instancing&&s.enable(1),t.instancingColor&&s.enable(2),t.instancingMorph&&s.enable(3),t.matcap&&s.enable(4),t.envMap&&s.enable(5),t.normalMapObjectSpace&&s.enable(6),t.normalMapTangentSpace&&s.enable(7),t.clearcoat&&s.enable(8),t.iridescence&&s.enable(9),t.alphaTest&&s.enable(10),t.vertexColors&&s.enable(11),t.vertexAlphas&&s.enable(12),t.vertexUv1s&&s.enable(13),t.vertexUv2s&&s.enable(14),t.vertexUv3s&&s.enable(15),t.vertexTangents&&s.enable(16),t.anisotropy&&s.enable(17),t.alphaHash&&s.enable(18),t.batching&&s.enable(19),t.dispersion&&s.enable(20),t.batchingColor&&s.enable(21),t.gradientMap&&s.enable(22),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),e.push(s.mask)}function b(e){let t=m[e.type],n;if(t){let e=Za[t];n=Or.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r;for(let e=0,t=u.length;e<t;e++){let t=u[e];if(t.cacheKey===n){r=t,++r.usedTimes;break}}return r===void 0&&(r=new yc(e,n,t,a),u.push(r)),r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function wc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Tc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ec(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Dc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(n,r,i,a,o,s){let c=e[t];return c===void 0?(c={id:n.id,object:n,geometry:r,material:i,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=c):(c.id=n.id,c.object=n,c.geometry=r,c.material=i,c.groupOrder=a,c.renderOrder=n.renderOrder,c.z=o,c.group=s),t++,c}function s(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function c(e,t,a,s,c,l){let u=o(e,t,a,s,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function l(e,t){n.length>1&&n.sort(e||Tc),r.length>1&&r.sort(t||Ec),i.length>1&&i.sort(t||Ec)}function u(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:s,unshift:c,finish:u,sort:l}}function Oc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Dc,e.set(t,[i])):n>=r.length?(i=new Dc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function kc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new B,color:new H};break;case`SpotLight`:n={position:new B,direction:new B,color:new H,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new B,color:new H,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new B,skyColor:new H,groundColor:new H};break;case`RectAreaLight`:n={color:new H,position:new B,halfWidth:new B,halfHeight:new B}}return e[t.id]=n,n}}}function Ac(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var jc=0;function Mc(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Nc(e){let t=new kc,n=Ac(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new B);let i=new B,a=new $t,o=new $t;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(Mc);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=jc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Pc(e){let t=new Nc(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function Fc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Pc(e),t.set(n,[a])):r>=i.length?(a=new Pc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ic=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lc=`uniform sampler2D shadow_pass;
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
}`;function Rc(e,t,n){let i=new Di,a=new z,o=new z,s=new xt,c=new ea({depthPacking:Me}),l=new ta,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new jr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new z},radius:{value:4}},vertexShader:Ic,fragmentShader:Lc}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new lr;h.setAttribute(`position`,new Qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new W(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,c){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;let l=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=v!==3&&this.type===3,h=v===3&&this.type!==3;for(let l=0,u=t.length;l<u;l++){let u=t[l],f=u.shadow;if(f===void 0){console.warn(`THREE.WebGLShadowMap:`,u,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;a.copy(f.mapSize);let g=f.getFrameExtents();if(a.multiply(g),o.copy(f.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(o.x=Math.floor(d/g.x),a.x=o.x*g.x,f.mapSize.x=o.x),a.y>d&&(o.y=Math.floor(d/g.y),a.y=o.y*g.y,f.mapSize.y=o.y)),f.map===null||m===!0||h===!0){let e=this.type===3?{}:{minFilter:r,magFilter:r};f.map!==null&&f.map.dispose(),f.map=new Ct(a.x,a.y,e),f.map.texture.name=u.name+`.shadowMap`,f.camera.updateProjectionMatrix()}e.setRenderTarget(f.map),e.clear();let _=f.getViewportCount();for(let e=0;e<_;e++){let t=f.getViewport(e);s.set(o.x*t.x,o.y*t.y,o.x*t.z,o.y*t.w),p.viewport(s),f.updateMatrices(u,e),i=f.getFrustum(),x(n,c,f.camera,u,this.type)}f.isPointLightShadow!==!0&&this.type===3&&y(f,c),f.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(l,u,f)};function y(n,r){let i=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Ct(a.x,a.y)),p.uniforms.shadow_pass.value=n.map.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||i.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],r,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}var zc={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Bc(e,t){function n(){let t=!1,n=new xt,r=null,i=new xt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?F(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=zc[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(r&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?F(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new H(0,0,0),w=0,T=!1,E=null,D=null,ee=null,O=null,k=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,j=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),te=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(ne)[1]),te=j>=1);let M=null,N={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new xt().fromArray(re),oe=new xt().fromArray(ie);function P(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=P(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=P(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=P(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=P(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),F(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),F(e.CULL_FACE),me(0);function F(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return m!==t&&(e.useProgram(t),m=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0){h===!0&&(ce(e.BLEND),h=!1);return}if(h===!1&&(F(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:console.error(`THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:console.error(`THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:console.error(`THREE.WebGLState: Invalid blending: `,t)}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}return}a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(fe[n],fe[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function I(t,n){t.side===2?ce(e.CULL_FACE):F(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),L(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?F(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function ge(t){t===0?ce(e.CULL_FACE):(F(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function _e(t){t!==ee&&(te&&e.lineWidth(t),ee=t)}function L(t,n,r){t?(F(e.POLYGON_OFFSET_FILL),(O!==n||k!==r)&&(e.polygonOffset(n,r),O=n,k=r)):ce(e.POLYGON_OFFSET_FILL)}function ve(t){t?F(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+A-1),M!==t&&(e.activeTexture(t),M=t)}function ye(t,n,r){r===void 0&&(r=M===null?e.TEXTURE0+A-1:M);let i=N[r];i===void 0&&(i={type:void 0,texture:void 0},N[r]=i),(i.type!==t||i.texture!==n)&&(M!==r&&(e.activeTexture(r),M=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function be(){let t=N[M];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function we(){try{e.texSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){console.error(`THREE.WebGLState:`,e)}}function je(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Me(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},M=null,N={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new H(0,0,0),w=0,T=!1,E=null,D=null,ee=null,O=null,k=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:F,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:I,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:L,setScissorTest:ve,activeTexture:R,bindTexture:ye,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:ke,texImage3D:Ae,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:De,texStorage3D:Oe,texSubImage2D:Ce,texSubImage3D:we,compressedTexSubImage2D:Te,compressedTexSubImage3D:Ee,scissor:je,viewport:Me,reset:Fe}}function Vc(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new z,y=new WeakMap,b,x=new WeakMap,S=!1;try{S=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function C(e,t){return S?new OffscreenCanvas(e,t):nt(`canvas`)}function w(e,t,n){let r=1,i=ke(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);b===void 0&&(b=C(n,a));let o=t?C(n,a):b;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),console.warn(`THREE.WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&console.warn(`THREE.WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function T(e){return e.generateMipmaps}function D(e){l.generateMipmap(e)}function ee(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function O(e,t,n,r,i=!1){if(e!==null){if(l[e]!==void 0)return l[e];console.warn(`THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let a=t;if(t===l.RED&&(n===l.FLOAT&&(a=l.R32F),n===l.HALF_FLOAT&&(a=l.R16F),n===l.UNSIGNED_BYTE&&(a=l.R8)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.R8UI),n===l.UNSIGNED_SHORT&&(a=l.R16UI),n===l.UNSIGNED_INT&&(a=l.R32UI),n===l.BYTE&&(a=l.R8I),n===l.SHORT&&(a=l.R16I),n===l.INT&&(a=l.R32I)),t===l.RG&&(n===l.FLOAT&&(a=l.RG32F),n===l.HALF_FLOAT&&(a=l.RG16F),n===l.UNSIGNED_BYTE&&(a=l.RG8)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RG8UI),n===l.UNSIGNED_SHORT&&(a=l.RG16UI),n===l.UNSIGNED_INT&&(a=l.RG32UI),n===l.BYTE&&(a=l.RG8I),n===l.SHORT&&(a=l.RG16I),n===l.INT&&(a=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RGB8UI),n===l.UNSIGNED_SHORT&&(a=l.RGB16UI),n===l.UNSIGNED_INT&&(a=l.RGB32UI),n===l.BYTE&&(a=l.RGB8I),n===l.SHORT&&(a=l.RGB16I),n===l.INT&&(a=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(a=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(a=l.RGBA16UI),n===l.UNSIGNED_INT&&(a=l.RGBA32UI),n===l.BYTE&&(a=l.RGBA8I),n===l.SHORT&&(a=l.RGBA16I),n===l.INT&&(a=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_INT_5_9_9_9_REV&&(a=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(a=l.R11F_G11F_B10F)),t===l.RGBA){let e=i?Fe:ut.getTransfer(r);n===l.FLOAT&&(a=l.RGBA32F),n===l.HALF_FLOAT&&(a=l.RGBA16F),n===l.UNSIGNED_BYTE&&(a=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT_4_4_4_4&&(a=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(a=l.RGB5_A1)}return(a===l.R16F||a===l.R32F||a===l.RG16F||a===l.RG32F||a===l.RGBA16F||a===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),a}function k(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,console.warn(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function A(e,t){return T(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),ne(t),t.isVideoTexture&&y.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),N(t)}function ne(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=x.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&M(e),Object.keys(r).length===0&&x.delete(n)}f.remove(e)}function M(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=x.get(n);delete r[t.__cacheKey],h.memory.textures--}function N(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let re=0;function ie(){re=0}function ae(){let e=re;return e>=p.maxTextures&&console.warn(`THREE.WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),re+=1,e}function oe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(e,t){let n=f.get(e);if(e.isVideoTexture&&De(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)console.warn(`THREE.WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)console.warn(`THREE.WebGLRenderer: Texture marked for update but image is incomplete`);else{he(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function se(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){he(n,e,t);return}d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function F(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){he(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function ce(e,t){let n=f.get(e);if(e.version>0&&n.__version!==e.version){ge(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let le={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},ue={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},de={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function fe(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&console.warn(`THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,le[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,le[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,le[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,ue[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,ue[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,de[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function pe(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,te));let r=t.source,i=x.get(r);i===void 0&&(i={},x.set(r,i));let a=oe(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&M(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function me(e,t,n){return Math.floor(Math.floor(e/n)/t)}function I(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=me(r.start,t.width,4),c=me(n.start,t.width,4);r.start<=o+1&&s===c&&me(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=l.getParameter(l.UNPACK_ROW_LENGTH),s=l.getParameter(l.UNPACK_SKIP_PIXELS),c=l.getParameter(l.UNPACK_SKIP_ROWS);l.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;l.pixelStorei(l.UNPACK_SKIP_PIXELS,c),l.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),l.pixelStorei(l.UNPACK_ROW_LENGTH,o),l.pixelStorei(l.UNPACK_SKIP_PIXELS,s),l.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function he(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=pe(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(l.TEXTURE0+n);let e=ut.getPrimaries(ut.workingColorSpace),s=t.colorSpace===``?null:ut.getPrimaries(t.colorSpace),c=t.colorSpace===``||e===s?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let u=w(t.image,!1,p.maxTextureSize);u=Oe(t,u);let f=m.convert(t.format,t.colorSpace),h=m.convert(t.type),g=O(t.internalFormat,f,h,t.colorSpace,t.isVideoTexture);fe(r,t);let _,v=t.mipmaps,y=t.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=A(t,u);if(t.isDepthTexture)g=k(t.format===E,t.type),b&&(y?d.texStorage2D(l.TEXTURE_2D,1,g,u.width,u.height):d.texImage2D(l.TEXTURE_2D,0,g,u.width,u.height,0,f,h,null));else if(t.isDataTexture)if(v.length>0){y&&b&&d.texStorage2D(l.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let e=0,t=v.length;e<t;e++)_=v[e],y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,h,_.data):d.texImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,f,h,_.data);t.generateMipmaps=!1}else y?(b&&d.texStorage2D(l.TEXTURE_2D,S,g,u.width,u.height),x&&I(t,u,f,h)):d.texImage2D(l.TEXTURE_2D,0,g,u.width,u.height,0,f,h,u.data);else if(t.isCompressedTexture)if(t.isCompressedArrayTexture){y&&b&&d.texStorage3D(l.TEXTURE_2D_ARRAY,S,g,v[0].width,v[0].height,u.depth);for(let e=0,n=v.length;e<n;e++)if(_=v[e],t.format!==1023)if(f!==null)if(y){if(x)if(t.layerUpdates.size>0){let n=Ka(_.width,_.height,t.format,t.type);for(let r of t.layerUpdates){let t=_.data.subarray(r*n/_.data.BYTES_PER_ELEMENT,(r+1)*n/_.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,r,_.width,_.height,1,f,t)}t.clearLayerUpdates()}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,0,_.width,_.height,u.depth,f,_.data)}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,e,g,_.width,_.height,u.depth,0,_.data,0,0);else console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else y?x&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,e,0,0,0,_.width,_.height,u.depth,f,h,_.data):d.texImage3D(l.TEXTURE_2D_ARRAY,e,g,_.width,_.height,u.depth,0,f,h,_.data)}else{y&&b&&d.texStorage2D(l.TEXTURE_2D,S,g,v[0].width,v[0].height);for(let e=0,n=v.length;e<n;e++)_=v[e],t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,h,_.data):d.texImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,f,h,_.data):f===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,_.width,_.height,f,_.data):d.compressedTexImage2D(l.TEXTURE_2D,e,g,_.width,_.height,0,_.data)}else if(t.isDataArrayTexture)if(y){if(b&&d.texStorage3D(l.TEXTURE_2D_ARRAY,S,g,u.width,u.height,u.depth),x)if(t.layerUpdates.size>0){let e=Ka(u.width,u.height,t.format,t.type);for(let n of t.layerUpdates){let t=u.data.subarray(n*e/u.data.BYTES_PER_ELEMENT,(n+1)*e/u.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,n,u.width,u.height,1,f,h,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,g,u.width,u.height,u.depth,0,f,h,u.data);else if(t.isData3DTexture)y?(b&&d.texStorage3D(l.TEXTURE_3D,S,g,u.width,u.height,u.depth),x&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,u.width,u.height,u.depth,f,h,u.data)):d.texImage3D(l.TEXTURE_3D,0,g,u.width,u.height,u.depth,0,f,h,u.data);else if(t.isFramebufferTexture){if(b)if(y)d.texStorage2D(l.TEXTURE_2D,S,g,u.width,u.height);else{let e=u.width,t=u.height;for(let n=0;n<S;n++)d.texImage2D(l.TEXTURE_2D,n,g,e,t,0,f,h,null),e>>=1,t>>=1}}else if(v.length>0){if(y&&b){let e=ke(v[0]);d.texStorage2D(l.TEXTURE_2D,S,g,e.width,e.height)}for(let e=0,t=v.length;e<t;e++)_=v[e],y?x&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f,h,_):d.texImage2D(l.TEXTURE_2D,e,g,f,h,_);t.generateMipmaps=!1}else if(y){if(b){let e=ke(u);d.texStorage2D(l.TEXTURE_2D,S,g,e.width,e.height)}x&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,f,h,u)}else d.texImage2D(l.TEXTURE_2D,0,g,f,h,u);T(t)&&D(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ge(e,t,n){if(t.image.length!==6)return;let r=pe(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=ut.getPrimaries(ut.workingColorSpace),o=t.colorSpace===``?null:ut.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=w(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Oe(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=O(t.internalFormat,g,_,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=A(t,h);fe(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?console.warn(`THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=ke(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}T(t)&&D(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function _e(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=O(n.internalFormat,o,s,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Ee(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Te(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function L(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=k(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,s=Te(t);Ee(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,s,a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,s,a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=O(i.internalFormat,a,o,i.colorSpace),c=Te(t);n&&Ee(t)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,t.width,t.height):Ee(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,c,s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function ve(e,t){if(t&&t.isWebGLCubeRenderTarget)throw Error(`Depth Texture with cube render targets is not supported`);if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let n=f.get(t.depthTexture);n.__renderTarget=t,(!n.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),P(t.depthTexture,0);let r=n.__webglTexture,i=Te(t);if(t.depthTexture.format===1026)Ee(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,r,0,i):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,r,0);else if(t.depthTexture.format===1027)Ee(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,r,0,i):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,r,0);else throw Error(`Unknown depthTexture format`)}function R(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)throw Error(`target.depthTexture not supported in Cube render targets`);let r=e.texture.mipmaps;r&&r.length>0?ve(t.__webglFramebuffer[0],e):ve(t.__webglFramebuffer,e)}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),L(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),L(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function ye(e,t,n){let r=f.get(e);t!==void 0&&_e(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&R(e)}function be(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,j);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Ee(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=O(r.internalFormat,a,o,r.colorSpace,e.isXRRenderTarget===!0),c=Te(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),L(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),fe(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)_e(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else _e(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);T(t)&&D(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),fe(o,r),_e(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),T(r)&&D(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),fe(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)_e(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else _e(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);T(t)&&D(i),d.unbindTexture()}e.depthBuffer&&R(e)}function xe(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(T(r)){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),D(t),d.unbindTexture()}}}let Se=[],Ce=[];function we(e){if(e.samples>0){if(Ee(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Se.length=0,Ce.length=0,Se.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.resolveDepthBuffer===!1&&(Se.push(a),Ce.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Ce)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Se))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.resolveDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Te(e){return Math.min(p.maxSamples,e.samples)}function Ee(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function De(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Oe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(ut.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&console.warn(`THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):console.error(`THREE.WebGLTextures: Unsupported texture color space:`,n)),t}function ke(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ae,this.resetTextureUnits=ie,this.setTexture2D=P,this.setTexture2DArray=se,this.setTexture3D=F,this.setTextureCube=ce,this.rebindTextures=ye,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=R,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ee}function Hc(e,t){function n(n,r=``){let i,a=ut.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Uc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wc=`
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

}`,Gc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Xi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new jr({vertexShader:Uc,fragmentShader:Wc,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new W(new Zi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Kc=class extends Ve{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Gc,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],ee=new z,O=null,k=new Ir;k.viewport=new xt;let A=new Ir;A.viewport=new xt;let te=[k,A],j=new Na,ne=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Ur,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Ur,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Ur,C[e]=t),t.getHandSpace()};function N(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){r.removeEventListener(`select`,N),r.removeEventListener(`selectstart`,N),r.removeEventListener(`selectend`,N),r.removeEventListener(`squeeze`,N),r.removeEventListener(`squeezestart`,N),r.removeEventListener(`squeezeend`,N),r.removeEventListener(`end`,re),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}ne=null,M=null,_.reset();for(let e in v)delete v[e];e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(ee.width,ee.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&console.warn(`THREE.WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,N),r.addEventListener(`selectstart`,N),r.addEventListener(`selectend`,N),r.addEventListener(`squeeze`,N),r.addEventListener(`squeezestart`,N),r.addEventListener(`squeezeend`,N),r.addEventListener(`end`,re),r.addEventListener(`inputsourceschange`,ie),b.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(ee),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Ct(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new Yi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Ct(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ae=new B,oe=new B;function P(e,t,n){ae.setFromMatrixPosition(t.matrixWorld),oe.setFromMatrixPosition(n.matrixWorld);let r=ae.distanceTo(oe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function se(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=A.near=k.near=t,j.far=A.far=k.far=n,(ne!==j.near||M!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),ne=j.near,M=j.far),j.layers.mask=e.layers.mask|6,k.layers.mask=j.layers.mask&3,A.layers.mask=j.layers.mask&5;let i=e.parent,a=j.cameras;se(j,i);for(let e=0;e<a.length;e++)se(a[e],i);a.length===2?P(j,k,A):j.projectionMatrix.copy(k.projectionMatrix),F(e,j,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=We*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let ce=null;function le(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=te[n];o===void 0&&(o=new Ir,o.layers.enable(n),o.viewport=new xt,te[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Xi,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ce&&ce(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let ue=new Ja;ue.setAnimationLoop(le),this.setAnimationLoop=function(e){ce=e},this.dispose=function(){}}},qc=new un,Jc=new $t;function Yc(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Dr(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial||t.isMeshLambertMaterial?a(e,t):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,qc.copy(o),qc.x*=-1,qc.y*=-1,qc.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(qc.y*=-1,qc.z*=-1),e.envMapRotation.value.setFromMatrix4(Jc.makeRotationFromEuler(qc)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Xc(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return console.error(`THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?console.warn(`THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.`):console.warn(`THREE.WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Zc=class{constructor(e={}){let{canvas:t=rt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=new Uint32Array(4),_=new Int32Array(4),v=null,y=null,b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=Ne;let w=0,T=0,E=null,D=-1,ee=null,O=new xt,k=new xt,A=null,te=new H(0),j=0,ne=t.width,M=t.height,N=1,re=null,ie=null,ae=new xt(0,0,ne,M),oe=new xt(0,0,ne,M),P=!1,se=new Di,F=!1,ce=!1,le=new $t,ue=new B,de=new xt,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pe=!1;function me(){return E===null?N:1}let I=n;function he(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r180`),t.addEventListener(`webglcontextlost`,Ue,!1),t.addEventListener(`webglcontextrestored`,We,!1),t.addEventListener(`webglcontextcreationerror`,Ge,!1),I===null){let t=`webgl2`;if(I=he(t,e),I===null)throw he(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw console.error(`THREE.WebGLRenderer: `+e.message),e}let ge,_e,L,ve,R,ye,be,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Fe,Ie,Le,Re,ze;function Ve(){ge=new Ao(I),ge.init(),Le=new Hc(I,ge),_e=new io(I,ge,e,Le),L=new Bc(I,ge),_e.reversedDepthBuffer&&p&&L.buffers.depth.setReversed(!0),ve=new No(I),R=new wc,ye=new Vc(I,ge,L,R,_e,Le,ve),be=new oo(S),xe=new ko(S),Se=new Ya(I),Re=new no(I,Se),Ce=new jo(I,Se,ve,Re),we=new Fo(I,Ce,Se,ve),Me=new Po(I,_e,ye),ke=new ao(R),Te=new Cc(S,be,xe,ge,_e,Re,ke),Ee=new Yc(S,R),De=new Oc,Oe=new Fc(ge),je=new to(S,be,xe,L,we,m,s),Ae=new Rc(S,we,_e),ze=new Xc(I,ve,_e,L),Fe=new ro(I,ge,ve),Ie=new Mo(I,ge,ve),ve.programs=Te.programs,S.capabilities=_e,S.extensions=ge,S.properties=R,S.renderLists=De,S.shadowMap=Ae,S.state=L,S.info=ve}Ve();let He=new Kc(S,I);this.xr=He,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=ge.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ge.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(e){e!==void 0&&(N=e,this.setSize(ne,M,!1))},this.getSize=function(e){return e.set(ne,M)},this.setSize=function(e,n,r=!0){if(He.isPresenting){console.warn(`THREE.WebGLRenderer: Can't change size while VR device is presenting.`);return}ne=e,M=n,t.width=Math.floor(e*N),t.height=Math.floor(n*N),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ne*N,M*N).floor()},this.setDrawingBufferSize=function(e,n,r){ne=e,M=n,N=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.getCurrentViewport=function(e){return e.copy(O)},this.getViewport=function(e){return e.copy(ae)},this.setViewport=function(e,t,n,r){e.isVector4?ae.set(e.x,e.y,e.z,e.w):ae.set(e,t,n,r),L.viewport(O.copy(ae).multiplyScalar(N).round())},this.getScissor=function(e){return e.copy(oe)},this.setScissor=function(e,t,n,r){e.isVector4?oe.set(e.x,e.y,e.z,e.w):oe.set(e,t,n,r),L.scissor(k.copy(oe).multiplyScalar(N).round())},this.getScissorTest=function(){return P},this.setScissorTest=function(e){L.setScissorTest(P=e)},this.setOpaqueSort=function(e){re=e},this.setTransparentSort=function(e){ie=e},this.getClearColor=function(e){return e.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(E!==null){let t=E.texture.format;e=t===1033||t===1031||t===1029}if(e){let e=E.texture.type,t=e===1009||e===1014||e===1012||e===1020||e===1017||e===1018,n=je.getClearColor(),r=je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(h[0]=i,h[1]=a,h[2]=o,h[3]=r,I.clearBufferuiv(I.COLOR,0,h)):(_[0]=i,_[1]=a,_[2]=o,_[3]=r,I.clearBufferiv(I.COLOR,0,_))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ue,!1),t.removeEventListener(`webglcontextrestored`,We,!1),t.removeEventListener(`webglcontextcreationerror`,Ge,!1),je.dispose(),De.dispose(),Oe.dispose(),R.dispose(),be.dispose(),xe.dispose(),we.dispose(),Re.dispose(),ze.dispose(),Te.dispose(),He.dispose(),He.removeEventListener(`sessionstart`,Ze),He.removeEventListener(`sessionend`,Qe),$e.stop()};function Ue(e){e.preventDefault(),console.log(`THREE.WebGLRenderer: Context Lost.`),C=!0}function We(){console.log(`THREE.WebGLRenderer: Context Restored.`),C=!1;let e=ve.autoReset,t=Ae.enabled,n=Ae.autoUpdate,r=Ae.needsUpdate,i=Ae.type;Ve(),ve.autoReset=e,Ae.enabled=t,Ae.autoUpdate=n,Ae.needsUpdate=r,Ae.type=i}function Ge(e){console.error(`THREE.WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ke(e){let t=e.target;t.removeEventListener(`dispose`,Ke),qe(t)}function qe(e){Je(e),R.remove(e)}function Je(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){Te.releaseProgram(e)}),e.isShaderMaterial&&Te.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=fe);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=dt(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ce.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Re.setup(i,r,s,n,c);let h,g=Fe;if(c!==null&&(h=Se.get(c),g=Ie,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*me()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*me()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh)if(i._multiDrawInstances!==null)at(`THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.`),g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(ge.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Se.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ye(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,st(e,t,n),e.side=0,e.needsUpdate=!0,st(e,t,n),e.side=2):st(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),y=Oe.get(n),y.init(t),x.push(y),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(y.pushLight(e),e.castShadow&&y.pushShadow(e))}),y.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Ye(a,n,e),r.add(a)}else Ye(t,n,e),r.add(t)}),y=x.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){R.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}ge.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Xe=null;function z(e){Xe&&Xe(e)}function Ze(){$e.stop()}function Qe(){$e.start()}let $e=new Ja;$e.setAnimationLoop(z),typeof self<`u`&&$e.setContext(self),this.setAnimationLoop=function(e){Xe=e,He.setAnimationLoop(e),e===null?$e.stop():$e.start()},He.addEventListener(`sessionstart`,Ze),He.addEventListener(`sessionend`,Qe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){console.error(`THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(C===!0)return;if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(t),t=He.getCamera()),e.isScene===!0&&e.onBeforeRender(S,e,t,E),y=Oe.get(e,x.length),y.init(t),x.push(y),le.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),se.setFromProjectionMatrix(le,Be,t.reversedDepth),ce=this.localClippingEnabled,F=ke.init(this.clippingPlanes,ce),v=De.get(e,b.length),v.init(),b.push(v),He.enabled===!0&&He.isPresenting===!0){let e=S.xr.getDepthSensingMesh();e!==null&&V(e,t,-1/0,S.sortObjects)}V(e,t,0,S.sortObjects),v.finish(),S.sortObjects===!0&&v.sort(re,ie),pe=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,pe&&je.addToRenderList(v,e),this.info.render.frame++,F===!0&&ke.beginShadows();let n=y.state.shadowsArray;Ae.render(n,e,t),F===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset();let r=v.opaque,i=v.transmissive;if(y.setupLights(),t.isArrayCamera){let n=t.cameras;if(i.length>0)for(let t=0,a=n.length;t<a;t++){let a=n[t];tt(r,i,e,a)}pe&&je.render(e);for(let t=0,r=n.length;t<r;t++){let r=n[t];et(v,e,r,r.viewport)}}else i.length>0&&tt(r,i,e,t),pe&&je.render(e),et(v,e,t);E!==null&&T===0&&(ye.updateMultisampleRenderTarget(E),ye.updateRenderTargetMipmap(E)),e.isScene===!0&&e.onAfterRender(S,e,t),Re.resetDefaultState(),D=-1,ee=null,x.pop(),x.length>0?(y=x[x.length-1],F===!0&&ke.setGlobalState(S.clippingPlanes,y.state.camera)):y=null,b.pop(),v=b.length>0?b[b.length-1]:null};function V(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)y.pushLight(e),e.castShadow&&y.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||se.intersectsSprite(e)){r&&de.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);let t=we.update(e),i=e.material;i.visible&&v.push(e,t,i,n,de.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||se.intersectsObject(e))){let t=we.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),de.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),de.copy(e.boundingSphere.center)),de.applyMatrix4(e.matrixWorld).applyMatrix4(le)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&v.push(e,t,s,n,de.z,o)}}else i.visible&&v.push(e,t,i,n,de.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)V(i[e],t,n,r)}function et(e,t,n,r){let i=e.opaque,a=e.transmissive,o=e.transparent;y.setupLightsView(n),F===!0&&ke.setGlobalState(S.clippingPlanes,n),r&&L.viewport(O.copy(r)),i.length>0&&nt(i,t,n),a.length>0&&nt(a,t,n),o.length>0&&nt(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function tt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[r.id]===void 0&&(y.state.transmissionRenderTarget[r.id]=new Ct(1,1,{generateMipmaps:!0,type:ge.has(`EXT_color_buffer_half_float`)||ge.has(`EXT_color_buffer_float`)?g:l,minFilter:c,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));let a=y.state.transmissionRenderTarget[r.id],o=r.viewport||O;a.setSize(o.z*S.transmissionResolutionScale,o.w*S.transmissionResolutionScale);let s=S.getRenderTarget(),u=S.getActiveCubeFace(),d=S.getActiveMipmapLevel();S.setRenderTarget(a),S.getClearColor(te),j=S.getClearAlpha(),j<1&&S.setClearColor(16777215,.5),S.clear(),pe&&je.render(n);let f=S.toneMapping;S.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),y.setupLightsView(r),F===!0&&ke.setGlobalState(S.clippingPlanes,r),nt(e,n,r),ye.updateMultisampleRenderTarget(a),ye.updateRenderTargetMipmap(a),ge.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.object,s=a.geometry,c=a.material,l=a.group;if(c.side===2&&o.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,it(o,n,r,s,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(ye.updateMultisampleRenderTarget(a),ye.updateRenderTargetMipmap(a))}S.setRenderTarget(s,u,d),S.setClearColor(te,j),p!==void 0&&(r.viewport=p),S.toneMapping=f}function nt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],o=a.object,s=a.geometry,c=a.group,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&it(o,t,n,s,l,c)}}function it(e,t,n,r,i,a){e.onBeforeRender(S,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(S,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,S.renderBufferDirect(n,t,r,i,e,a),i.side=2):S.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(S,t,n,r,i,a)}function st(e,t,n){t.isScene!==!0&&(t=fe);let r=R.get(e),i=y.state.lights,a=y.state.shadowsArray,o=i.state.version,s=Te.getParameters(e,i.state,a,t,n),c=Te.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial?t.environment:null,r.fog=t.fog,r.envMap=(e.isMeshStandardMaterial?xe:be).get(e.envMap||r.environment),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ke),l=new Map,r.programs=l);let u=l.get(c);if(u!==void 0){if(r.currentProgram===u&&r.lightsStateVersion===o)return lt(e,s),u}else s.uniforms=Te.getUniforms(e),e.onBeforeCompile(s,S),u=Te.acquireProgram(s,c),l.set(c,u),r.uniforms=s.uniforms;let d=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(d.clippingPlanes=ke.uniform),lt(e,s),r.needsLights=pt(e),r.lightsStateVersion=o,r.needsLights&&(d.ambientLightColor.value=i.state.ambient,d.lightProbe.value=i.state.probe,d.directionalLights.value=i.state.directional,d.directionalLightShadows.value=i.state.directionalShadow,d.spotLights.value=i.state.spot,d.spotLightShadows.value=i.state.spotShadow,d.rectAreaLights.value=i.state.rectArea,d.ltc_1.value=i.state.rectAreaLTC1,d.ltc_2.value=i.state.rectAreaLTC2,d.pointLights.value=i.state.point,d.pointLightShadows.value=i.state.pointShadow,d.hemisphereLights.value=i.state.hemi,d.directionalShadowMap.value=i.state.directionalShadowMap,d.directionalShadowMatrix.value=i.state.directionalShadowMatrix,d.spotShadowMap.value=i.state.spotShadowMap,d.spotLightMatrix.value=i.state.spotLightMatrix,d.spotLightMap.value=i.state.spotLightMap,d.pointShadowMap.value=i.state.pointShadowMap,d.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=u,r.uniformsList=null,u}function ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Hs.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function lt(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function dt(e,t,n,r,i){t.isScene!==!0&&(t=fe),ye.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial?t.environment:null,s=E===null?S.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Pe,c=(r.isMeshStandardMaterial?xe:be).get(r.envMap||o),l=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,u=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),d=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color,m=0;r.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(m=S.toneMapping);let h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,g=h===void 0?0:h.length,_=R.get(r),v=y.state.lights;if(F===!0&&(ce===!0||e!==ee)){let t=e===ee&&r.id===D;ke.setState(r,e,t)}let b=!1;r.version===_.__version?_.needsLights&&_.lightsStateVersion!==v.state.version?b=!0:_.outputColorSpace===s?i.isBatchedMesh&&_.batching===!1||!i.isBatchedMesh&&_.batching===!0||i.isBatchedMesh&&_.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&_.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&_.instancing===!1||!i.isInstancedMesh&&_.instancing===!0||i.isSkinnedMesh&&_.skinning===!1||!i.isSkinnedMesh&&_.skinning===!0||i.isInstancedMesh&&_.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&_.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&_.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&_.instancingMorph===!1&&i.morphTexture!==null?b=!0:_.envMap===c?r.fog===!0&&_.fog!==a||_.numClippingPlanes!==void 0&&(_.numClippingPlanes!==ke.numPlanes||_.numIntersection!==ke.numIntersection)?b=!0:_.vertexAlphas===l&&_.vertexTangents===u&&_.morphTargets===d&&_.morphNormals===f&&_.morphColors===p&&_.toneMapping===m?_.morphTargetsCount!==g&&(b=!0):b=!0:b=!0:b=!0:(b=!0,_.__version=r.version);let x=_.currentProgram;b===!0&&(x=st(r,t,i));let C=!1,w=!1,T=!1,O=x.getUniforms(),k=_.uniforms;if(L.useProgram(x.program)&&(C=!0,w=!0,T=!0),r.id!==D&&(D=r.id,w=!0),C||ee!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(I,`projectionMatrix`,e.projectionMatrix),O.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(I,ue.setFromMatrixPosition(e.matrixWorld)),_e.logarithmicDepthBuffer&&O.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),ee!==e&&(ee=e,w=!0,T=!0)}if(i.isSkinnedMesh){O.setOptional(I,i,`bindMatrix`),O.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(I,`boneTexture`,e.boneTexture,ye))}i.isBatchedMesh&&(O.setOptional(I,i,`batchingTexture`),O.setValue(I,`batchingTexture`,i._matricesTexture,ye),O.setOptional(I,i,`batchingIdTexture`),O.setValue(I,`batchingIdTexture`,i._indirectTexture,ye),O.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(I,`batchingColorTexture`,i._colorsTexture,ye));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Me.update(i,n,x),(w||_.receiveShadow!==i.receiveShadow)&&(_.receiveShadow=i.receiveShadow,O.setValue(I,`receiveShadow`,i.receiveShadow)),r.isMeshGouraudMaterial&&r.envMap!==null&&(k.envMap.value=c,k.flipEnvMap.value=c.isCubeTexture&&c.isRenderTargetTexture===!1?-1:1),r.isMeshStandardMaterial&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),w&&(O.setValue(I,`toneMappingExposure`,S.toneMappingExposure),_.needsLights&&ft(k,T),a&&r.fog===!0&&Ee.refreshFogUniforms(k,a),Ee.refreshMaterialUniforms(k,r,N,M,y.state.transmissionRenderTarget[e.id]),Hs.upload(I,ct(_),k,ye)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Hs.upload(I,ct(_),k,ye),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(I,`center`,i.center),O.setValue(I,`modelViewMatrix`,i.modelViewMatrix),O.setValue(I,`normalMatrix`,i.normalMatrix),O.setValue(I,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ze.update(n,x),ze.bind(n,x)}}return x}function ft(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function pt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let mt=I.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){E=e,w=t,T=n;let r=!0,i=null,a=!1,o=!1;if(e){let s=R.get(e);if(s.__useDefaultFramebuffer!==void 0)L.bindFramebuffer(I.FRAMEBUFFER,null),r=!1;else if(s.__webglFramebuffer===void 0)ye.setupRenderTarget(e);else if(s.__hasExternalTextures)ye.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(s.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);ye.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(o=!0);let l=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],a=!0):i=e.samples>0&&ye.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,O.copy(e.viewport),k.copy(e.scissor),A=e.scissorTest}else O.copy(ae).multiplyScalar(N).floor(),k.copy(oe).multiplyScalar(N).floor(),A=P;if(n!==0&&(i=mt),L.bindFramebuffer(I.FRAMEBUFFER,i)&&r&&L.drawBuffers(e,i),L.viewport(O),L.scissor(k),L.setScissorTest(A),a){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(o){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}D=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(!_e.textureFormatReadable(c)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!_e.textureTypeReadable(l)){console.error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&(e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s),I.readPixels(t,n,r,i,Le.convert(c),Le.convert(l),a))}finally{let e=E===null?null:R.get(E).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(!_e.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!_e.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,d),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s),I.readPixels(t,n,r,i,Le.convert(l),Le.convert(u),0);let f=E===null?null:R.get(E).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,f);let p=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await ot(I,p,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,d),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.deleteBuffer(d),I.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ye.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()};let ht=I.createFramebuffer(),gt=I.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=null){a===null&&(i===0?a=0:(at(`WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.`),a=i,i=0));let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Le.convert(t.format),_=Le.convert(t.type),v;t.isData3DTexture?(ye.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ye.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(ye.setTexture2D(t,0),v=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(I.UNPACK_ROW_LENGTH),b=I.getParameter(I.UNPACK_IMAGE_HEIGHT),x=I.getParameter(I.UNPACK_SKIP_PIXELS),S=I.getParameter(I.UNPACK_SKIP_ROWS),C=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,l),I.pixelStorei(I.UNPACK_SKIP_ROWS,u),I.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,o,s,f,p,o,s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,ht),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,gt);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,o,s,f,p,o,s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(I.UNPACK_ROW_LENGTH,y),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(I.UNPACK_SKIP_PIXELS,x),I.pixelStorei(I.UNPACK_SKIP_ROWS,S),I.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&ye.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ye.setTextureCube(e,0):e.isData3DTexture?ye.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ye.setTexture2DArray(e,0):ye.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,L.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Be}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}};function Qc(e){return e.kind===`sound`&&typeof e.sound==`string`}function $c(e,t){return(1/10**((e+(0-e)/t)/20))**.6}var el=class{player;audioContext;master;groups=new Map;factories=new Map;active=new Map;detachListeners=[];masterGain=.8;constructor(e){this.player=e,this.detachListeners=[e.addTypedEventListener(`cue`,e=>{let{cue:t}=e.detail;Qc(t)&&this.start(t,0)}),e.addTypedEventListener(`cueexit`,e=>{let{cue:t}=e.detail;Qc(t)&&this.stop(t.id)}),e.addTypedEventListener(`frame`,t=>{if((t.detail.reason===`seek`||t.detail.reason===`init`)&&(this.stopAll(),e.isPlaying))for(let n of e.getActiveCues(`sound`))Qc(n)&&n.sustain&&this.start(n,t.detail.time-n.start)}),e.addTypedEventListener(`statechange`,t=>{if(t.detail.state!==`playing`){this.stopAll();return}for(let t of e.getActiveCues(`sound`))Qc(t)&&t.sustain&&this.start(t,e.currentTime-t.start)})]}define(e,t){if(!e.trim())throw Error(`Sound names cannot be empty`);return this.factories.set(e,t),this}async unlock(){if(typeof window>`u`)return;let e=window.AudioContext??window.webkitAudioContext;if(e){if(!this.audioContext){this.audioContext=new e,this.master=this.audioContext.createGain(),this.master.gain.value=this.masterGain;let t=this.audioContext.createDynamicsCompressor();t.threshold.value=-6,t.knee.value=0,t.ratio.value=20,t.attack.value=.001,t.release.value=.12;let n=this.audioContext.createGain();n.gain.value=1/$c(-6,20),this.master.connect(t),t.connect(n),n.connect(this.audioContext.destination)}return this.audioContext.state===`suspended`&&await this.audioContext.resume(),this.audioContext}}setMasterGain(e){return this.masterGain=Math.min(1,Math.max(0,e)),this.master&&this.audioContext&&this.master.gain.setTargetAtTime(this.masterGain,this.audioContext.currentTime,.015),this}setGroupGain(e,t){let n=this.getGroup(e);return n&&this.audioContext&&n.gain.setTargetAtTime(Math.min(2,Math.max(0,t)),this.audioContext.currentTime,.015),this}stopAll(){for(let e of[...this.active.keys()])this.stop(e)}destroy(){this.stopAll();for(let e of this.detachListeners)e();this.detachListeners=[],this.audioContext?.close(),this.audioContext=void 0,this.master=void 0,this.groups.clear()}getGroup(e=`sfx`){if(!this.audioContext||!this.master)return;let t=this.groups.get(e);if(t)return t;let n=this.audioContext.createGain();return n.connect(this.master),this.groups.set(e,n),n}start(e,t){if(this.active.has(e.id)||!this.audioContext)return;let n=this.factories.get(e.sound),r=this.getGroup(e.group);if(!n||!r)return;let i=this.audioContext.createGain();i.gain.value=e.gain??1,i.connect(r);let a=n({audioContext:this.audioContext,output:i,cue:e,offset:Math.max(0,t)}),o=a&&typeof a.stop==`function`?a:void 0;this.active.set(e.id,{handle:o,output:i})}stop(e){let t=this.active.get(e);if(t){this.active.delete(e);try{t.handle?.stop()}finally{t.output.disconnect()}}}};function tl(e){return Math.min(1,Math.max(0,e))}var nl=class extends Event{detail;constructor(e,t){super(e),this.detail=t}};function rl(e,t){if(!Number.isFinite(e)||e<0)throw Error(`${t} must be a finite non-negative number`)}function il(e,t){if(!e.id.trim())throw Error(`Timeline ids cannot be empty`);if(rl(e.start,`${e.id}.start`),rl(e.end,`${e.id}.end`),e.end<=e.start)throw Error(`${e.id}.end must be greater than start`);if(e.end>t)throw Error(`${e.id}.end exceeds the player duration`)}function al(e,t,n){return t>=e.start&&(t<e.end||t===n&&e.end===n)}function ol(e,t=1/0){let n=new Set;return e.map(e=>{if(il(e,t),n.has(e.id))throw Error(`Duplicate voice cue id: ${e.id}`);n.add(e.id);for(let t of[`kind`,`speaker`,`text`,`delivery`])if(typeof e[t]!=`string`||!e[t].trim())throw Error(`${e.id}.${t} must be a non-empty string`);return{...e}})}var sl=class extends EventTarget{context;duration;loop;requestFrame;cancelFrame;shots=[];cues=[];activeShots=new Set;activeCueIds=new Set;frameHandle;lastFrameMs;timeValue=0;rateValue=1;stateValue=`paused`;constructor(e){if(super(),rl(e.duration,`duration`),e.duration===0)throw Error(`duration must be greater than zero`);this.context=e.context,this.duration=e.duration,this.loop=e.loop??!1,this.requestFrame=e.requestFrame??(e=>requestAnimationFrame(e)),this.cancelFrame=e.cancelFrame??(e=>cancelAnimationFrame(e)),this.setPlaybackRate(e.playbackRate??1);for(let t of e.shots??[])this.addShot(t,!1);for(let t of e.cues??[])this.addCue(t,!1);this.reconcile(0,0,`init`,!0)}get currentTime(){return this.timeValue}get playbackRate(){return this.rateValue}get state(){return this.stateValue}get isPlaying(){return this.stateValue===`playing`}addTypedEventListener(e,t,n){let r=t;return this.addEventListener(e,r,n),()=>this.removeEventListener(e,r,n)}addShot(e,t=!0){if(il(e,this.duration),this.shots.some(t=>t.id===e.id))throw Error(`Duplicate shot id: ${e.id}`);return this.shots.push(e),this.shots.sort((e,t)=>e.start-t.start||e.end-t.end||e.id.localeCompare(t.id)),t&&this.reconcile(this.timeValue,this.timeValue,`init`,!0),this}addCue(e,t=!0){if(il(e,this.duration),this.cues.some(t=>t.id===e.id))throw Error(`Duplicate cue id: ${e.id}`);return this.cues.push({...e}),this.cues.sort((e,t)=>e.start-t.start||e.end-t.end||e.id.localeCompare(t.id)),t&&this.reconcile(this.timeValue,this.timeValue,`init`,!0),this}getShots(){return this.shots}getCues(){return this.cues}getActiveCues(e){return this.cues.filter(t=>this.activeCueIds.has(t.id)&&(!e||t.kind===e))}setPlaybackRate(e){if(!Number.isFinite(e)||e<=0||e>16)throw Error(`playbackRate must be greater than 0 and no more than 16`);return this.rateValue=e,this}play(){return this.stateValue===`playing`?this:(this.timeValue>=this.duration&&this.seek(0),this.stateValue=`playing`,this.lastFrameMs=void 0,this.emit(`statechange`,{state:this.stateValue}),this.frameHandle=this.requestFrame(this.onAnimationFrame),this)}pause(){return this.frameHandle!==void 0&&this.cancelFrame(this.frameHandle),this.frameHandle=void 0,this.lastFrameMs=void 0,this.stateValue!==`paused`&&(this.stateValue=`paused`,this.emit(`statechange`,{state:this.stateValue})),this}seek(e){rl(e,`seek time`);let t=Math.min(e,this.duration),n=this.timeValue;return this.timeValue=t,this.stateValue===`ended`&&t<this.duration&&(this.stateValue=`paused`),this.reconcile(n,t,`seek`,!0),this}step(e){if(!Number.isFinite(e))throw Error(`step seconds must be finite`);this.pause();let t=this.timeValue;return this.timeValue=Math.min(this.duration,Math.max(0,t+e)),this.reconcile(t,this.timeValue,`step`,!0),this}refresh(){return this.reconcile(this.timeValue,this.timeValue,`init`,!0),this}destroy(){this.pause();let e=this.makeFrame(this.timeValue,this.timeValue,`init`);for(let t of[...this.shots].reverse())this.activeShots.has(t.id)&&t.leave?.(this.shotFrame(t,e));this.activeShots.clear(),this.activeCueIds.clear()}onAnimationFrame=e=>{if(this.stateValue!==`playing`)return;let t=this.timeValue,n=this.lastFrameMs===void 0?0:Math.max(0,Math.min(.25,(e-this.lastFrameMs)/1e3));this.lastFrameMs=e;let r=t+n*this.rateValue;if(r>=this.duration)if(this.timeValue=this.duration,this.reconcile(t,this.duration,`play`),this.loop){let t=r%this.duration,n=this.timeValue;this.timeValue=t,this.reconcile(n,t,`seek`,!0),this.lastFrameMs=e}else{this.stateValue=`ended`,this.frameHandle=void 0,this.lastFrameMs=void 0,this.emit(`statechange`,{state:this.stateValue});return}else this.timeValue=r,this.reconcile(t,r,`play`);this.frameHandle=this.requestFrame(this.onAnimationFrame)};reconcile(e,t,n,r=!1){let i=this.makeFrame(e,t,n),a=new Set(this.shots.filter(e=>al(e,t,this.duration)).map(e=>e.id));for(let e of[...this.shots].reverse())this.activeShots.has(e.id)&&!a.has(e.id)&&e.leave?.(this.shotFrame(e,i));for(let e of this.shots)!this.activeShots.has(e.id)&&a.has(e.id)&&e.enter?.(this.shotFrame(e,i));this.activeShots.clear();for(let e of a)this.activeShots.add(e);for(let o of this.shots)a.has(o.id)&&(r||t!==e||n===`play`)&&o.update?.(this.shotFrame(o,i));let o=new Set(this.cues.filter(e=>al(e,t,this.duration)).map(e=>e.id)),s=!1;for(let e of this.cues)this.activeCueIds.has(e.id)&&!o.has(e.id)&&(s=!0,this.emit(`cueexit`,{cue:e,frame:i}));for(let r of this.cues)!this.activeCueIds.has(r.id)&&o.has(r.id)&&(s=!0,this.emit(`cueenter`,{cue:r,frame:i})),(t>e&&r.start>=e&&r.start<t||n===`seek`&&r.fireOnSeek&&o.has(r.id))&&this.emit(`cue`,{cue:r,frame:i});this.activeCueIds.clear();for(let e of o)this.activeCueIds.add(e);(s||r)&&this.emit(`activecueschange`,{cues:this.getActiveCues(),frame:i}),this.emit(`frame`,i)}makeFrame(e,t,n){return{context:this.context,time:t,previousTime:e,delta:t-e,duration:this.duration,reason:n}}shotFrame(e,t){return{...t,shot:e,localTime:Math.max(0,t.time-e.start),progress:tl((t.time-e.start)/(e.end-e.start))}}emit(e,t){this.dispatchEvent(new nl(e,t))}},cl=class{options;detachFrame;resizeObserver;onWindowResize=()=>this.resize();constructor(e){this.options=e;let t=e.renderer.domElement;e.container.contains(t)||e.container.appendChild(t),this.detachFrame=e.player.addTypedEventListener(`frame`,()=>{e.renderer.render(e.scene,this.camera())}),e.autoResize!==!1&&(typeof ResizeObserver<`u`?(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e.container)):typeof window<`u`&&window.addEventListener(`resize`,this.onWindowResize)),this.resize(),e.player.refresh()}resize(){let e=typeof window>`u`?1:window.innerWidth,t=typeof window>`u`?1:window.innerHeight,n=Math.max(1,this.options.container.clientWidth||e||1),r=Math.max(1,this.options.container.clientHeight||t||1),i=Math.min(this.options.maxPixelRatio??2,typeof window>`u`?1:window.devicePixelRatio||1);this.options.renderer.setPixelRatio?.(i),this.options.renderer.setSize(n,r,!1);let a=this.camera();`aspect`in a&&(a.aspect=n/r),a.updateProjectionMatrix?.()}destroy(e=!1){this.detachFrame(),this.resizeObserver?.disconnect(),typeof window<`u`&&window.removeEventListener(`resize`,this.onWindowResize),e&&this.options.renderer.dispose?.()}camera(){return typeof this.options.camera==`function`?this.options.camera():this.options.camera}};function ll(e){let t=Math.max(0,Math.floor(e)),n=Math.floor(t/60);return`${String(n).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}function ul(e){let t=e;return typeof t.speaker==`string`&&typeof t.text==`string`}function dl(e){let t=e.container??document.body,n=document.createElement(`div`);n.className=`ab-cinematic-ui${e.className?` ${e.className}`:``}`,n.innerHTML=`
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
      <span class="ab-cinematic-time">00:00 / ${ll(e.player.duration)}</span>
      <input class="ab-cinematic-volume" data-action="volume" type="range" min="0" max="1" step="0.01" value="0.8" aria-label="音量">
      ${e.showFullscreen===!1?``:`<button type="button" data-action="fullscreen" aria-label="全屏">⛶</button>`}
    </div>`,t.appendChild(n);let r=n.querySelector(`[data-action="play"]`),i=n.querySelector(`[data-action="seek"]`),a=n.querySelector(`[data-action="volume"]`),o=n.querySelector(`[data-action="fullscreen"]`),s=n.querySelector(`.ab-cinematic-time`),c=n.querySelector(`.ab-cinematic-subtitle`),l=async()=>{await e.audio?.unlock(),e.player.isPlaying?e.player.pause():e.player.play()},u=()=>{e.player.seek(Number(i.value))},d=()=>{e.audio?.setMasterGain(Number(a.value))},f=()=>void t.requestFullscreen?.();r.addEventListener(`click`,l),i.addEventListener(`input`,u),a.addEventListener(`input`,d),o?.addEventListener(`click`,f);let p=[e.player.addTypedEventListener(`frame`,t=>{i.value=String(t.detail.time),s.textContent=`${ll(t.detail.time)} / ${ll(e.player.duration)}`}),e.player.addTypedEventListener(`statechange`,e=>{r.textContent=e.detail.state===`playing`?`Ⅱ`:`▶`,r.setAttribute(`aria-label`,e.detail.state===`playing`?`暂停`:`播放`)}),e.player.addTypedEventListener(`activecueschange`,e=>{c.textContent=e.detail.cues.filter(ul).map(e=>`【${e.speaker}】${e.text}`).join(`
`)})];return e.player.refresh(),{root:n,subtitle:c,destroy:()=>{for(let e of p)e();r.removeEventListener(`click`,l),i.removeEventListener(`input`,u),a.removeEventListener(`input`,d),o?.removeEventListener(`click`,f),n.remove()}}}var fl=(()=>{let e=[];for(let t=0;t<10;t++)e.push(302.4+t*.145);for(let t=0;t<10;t++)e.push(304.72+t*.145);for(let t=0;t<10;t++)e.push(307.04+t*.145);return e})();fl[0]+10;var pl=[{id:`voice-001`,kind:`narration`,speaker:`章北海`,text:`可控核聚变成功的那一年，所有人都以为，苦日子结束了。`,delivery:`低声、克制，像在很远的将来回望；句尾留一点风。`,start:12.8,end:18.4},{id:`voice-002`,kind:`narration`,speaker:`章北海`,text:`可对太空军来说，真正的深渊，才刚刚开始。`,delivery:`几乎贴着麦克风说；不强调“深渊”，让观众自己听见重量。`,start:20.4,end:26},{id:`voice-003`,kind:`dialogue`,speaker:`收藏者`,text:`您是军人吧。`,delivery:`眼角带笑，像认出了旧时代的同路人；尾音轻。`,start:31.4,end:33.7},{id:`voice-004`,kind:`dialogue`,speaker:`收藏者`,text:`现在的军人，已经不太像军人了。可您，我一眼就能看出来。`,delivery:`放慢，带一点怀念和自嘲；“您”要落到实处。`,start:34.7,end:38.4},{id:`voice-005`,kind:`dialogue`,speaker:`章北海`,text:`您也曾经是军人。`,delivery:`平静确认，不寒暄；目光没有离开对方。`,start:40,end:42},{id:`voice-006`,kind:`dialogue`,speaker:`收藏者`,text:`大半辈子，都在总参测绘局。`,delivery:`轻描淡写，把一生放进一句话里。`,start:43,end:45.6},{id:`voice-007`,kind:`dialogue`,speaker:`章北海`,text:`怎么会喜欢陨石？`,delivery:`声音稍暖，是真心好奇。`,start:46.8,end:48.6},{id:`voice-008`,kind:`dialogue`,speaker:`收藏者`,text:`十多年前，我随考察队穿越南极。任务，是在雪下面找它们。`,delivery:`陷入回忆；提到“找它们”时语气几乎变轻。`,start:49.8,end:55},{id:`voice-009`,kind:`dialogue`,speaker:`收藏者`,text:`后来就迷上了。它们来自尘世之外。每一块，都像一个新世界。`,delivery:`眼里有光，像小孩展示宝物；最后一句放慢。`,start:56.2,end:60.6},{id:`voice-010`,kind:`dialogue`,speaker:`章北海`,text:`地球本身就是一块大陨石。您这些东西，其实并不稀罕。`,delivery:`淡淡反驳，甚至有礼貌的挑衅；不笑。`,start:62,end:66.2},{id:`voice-011`,kind:`dialogue`,speaker:`收藏者`,text:`呵呵……你已经开始砍价了。`,delivery:`被逗乐，真笑出来；随即收住，重新打量对方。`,start:67.2,end:69.8},{id:`voice-012`,kind:`dialogue`,speaker:`章北海`,text:`我要三块铁陨石。比重大，受冲击不易碎，能上车床。`,delivery:`干脆、精确，像在陈述作战需求；最后三个字格外清楚。`,start:70.8,end:75},{id:`voice-013`,kind:`dialogue`,speaker:`收藏者`,text:`要雕刻？`,delivery:`试探，带着一点好奇和不安。`,start:76,end:77.6},{id:`voice-014`,kind:`dialogue`,speaker:`章北海`,text:`算是。`,delivery:`停顿半拍；不解释。`,start:78.4,end:79.6},{id:`voice-015`,kind:`dialogue`,speaker:`收藏者`,text:`铁陨石只占百分之五。这三块，成色都很好。`,delivery:`职业性的体面；说到“成色”时指尖敲了敲玻璃。`,start:80.8,end:84},{id:`voice-016`,kind:`dialogue`,speaker:`收藏者`,text:`国际市场的价，每克二十美元。三块，十八万。`,delivery:`报价时装得很硬，尾音却留了还价的余地。`,start:85,end:88.4},{id:`voice-017`,kind:`dialogue`,speaker:`章北海`,text:`给个账号。`,delivery:`语气没有起伏，像结束一段流程。`,start:89.4,end:90.9},{id:`voice-018`,kind:`dialogue`,speaker:`收藏者`,text:`其实，我等着你还价。`,delivery:`有点尴尬的笑；声音低下去。`,start:91.8,end:94.2},{id:`voice-019`,kind:`dialogue`,speaker:`章北海`,text:`不。就这个价。算是我对要送的人的尊重。`,delivery:`第一次显出温度；仍然不解释“要送的人”是谁。`,start:95.4,end:100.2},{id:`voice-020`,kind:`broadcast`,speaker:`旧广播`,text:`航天系统重申，无工质辐射推进项目不具备工程可行性，相关预算继续冻结。`,delivery:`隔着车间铁门传进来，失真、平淡，像一条已重复过很多遍的新闻。`,start:134,end:139.8},{id:`voice-021`,kind:`broadcast`,speaker:`旧收音机`,text:`航天系统高层会议，将于三日后在黄河空间站召开。`,delivery:`老收音机的短波质感；语速快，背景有电流噪声。`,start:191.8,end:196.4},{id:`voice-022`,kind:`monologue`,speaker:`章北海`,text:`现在，名单齐了。`,delivery:`心跳之间的一句低语，几乎被自己的呼吸盖住。`,start:198,end:201},{id:`voice-023`,kind:`monologue`,speaker:`章北海`,text:`弹头会在身体里碎成沙。人们只会看见一场陨石雨。`,delivery:`平静、克制，不带快意；像在报告一个已经完成的计算。`,start:218,end:223},{id:`voice-024`,kind:`monologue`,speaker:`章北海`,text:`定位单元留在基地。现在，太空里没有章北海。`,delivery:`贴着面罩传出的呼吸声；声音比平时轻。`,start:247.4,end:253},{id:`voice-025`,kind:`radio`,speaker:`黄河站调度`,text:`三号气闸准备出舱。合影结束后，请全体立即返回。`,delivery:`标准、礼貌的工作广播，带一点回声。`,start:257.4,end:261.6},{id:`voice-026`,kind:`radio`,speaker:`摄影师`,text:`把太阳留在左边。大家动作快一点。`,delivery:`现场指挥，清晰而随意；无线电底噪。`,start:263,end:266.6},{id:`voice-027`,kind:`chatter`,speaker:`女与会者`,text:`面罩反光太厉害，调透明吧。`,delivery:`闲谈，带一点抱怨；面罩内收音，声音近而闷。`,start:273.2,end:276.2},{id:`voice-028`,kind:`radio`,speaker:`摄影师`,text:`再散开半步——好，很好。`,delivery:`工作状态中的轻声引导，尾音满意。`,start:280.8,end:284.8},{id:`voice-029`,kind:`monologue`,speaker:`章北海`,text:`前排正中，三个。`,delivery:`确认目标时的低语；没有犹豫，也没有情绪。`,start:285,end:288.4},{id:`voice-030`,kind:`monologue`,speaker:`章北海`,text:`在真空里，枪声不会传出去。`,delivery:`极轻，几乎被航天服风机盖过；像对自己陈述物理事实。`,start:294,end:298.8},{id:`voice-031`,kind:`radio`,speaker:`男宇航员`,text:`陨石雨！是陨石雨！`,delivery:`无线电被尖叫挤爆，几乎失真；恐惧压过了理智。`,start:313.4,end:315.2},{id:`voice-032`,kind:`radio`,speaker:`女目标`,text:`我的面罩……裂了……`,delivery:`漏气后的耳语，气声比字更响；无线电断续。`,start:315.8,end:318.8},{id:`voice-033`,kind:`radio`,speaker:`摄影师`,text:`有五个人被击中！全体回舱！`,delivery:`嘶哑、急促的命令；喷气背包噪声压着尾音。`,start:319.2,end:321.8},{id:`voice-034`,kind:`radio`,speaker:`黄河站调度`,text:`紧急泄压！医疗组到三号气闸！`,delivery:`远端调度被警报打断，字句之间有空旷的回声。`,start:322.8,end:325.4},{id:`voice-035`,kind:`monologue`,speaker:`章北海`,text:`父亲，我做了我能做的事。`,delivery:`轻得几乎听不见；说给父亲，也说给自己。`,start:329,end:333.4},{id:`voice-036`,kind:`monologue`,speaker:`章北海`,text:`现在，太空又安静了。`,delivery:`最后一句，呼吸落下去；让沉默接住它。`,start:341.2,end:344.4}],J=(e,t,n,r,i=.6,a=`sfx`,o=!1)=>({id:e,kind:`sound`,sound:t,group:a,gain:i,sustain:o,start:n,end:r}),ml=[J(`sfx-001`,`meteor-shimmer`,1.8,4,.7,`score`),J(`sfx-002`,`meteor-shimmer`,6.2,8.4,.55,`score`),J(`sfx-003`,`amb-hutong`,10,31,.72,`amb`,!0),J(`sfx-004`,`amb-room`,27.5,108,.7,`amb`,!0),J(`sfx-005`,`cup-clink`,30.9,32.5,.65,`sfx`),J(`sfx-006`,`chair-wood`,34.1,35.6,.6,`sfx`),J(`sfx-007`,`metal-click`,39.4,40.5,.58,`sfx`),J(`sfx-008`,`metal-click`,57.1,58.2,.52,`sfx`),J(`sfx-009`,`door-metal`,58.5,61.5,.55,`sfx`),J(`sfx-010`,`tool-tray`,61,62.6,.5,`sfx`),J(`sfx-011`,`cloth-rustle`,64.2,65.8,.55,`sfx`),J(`sfx-012`,`cup-clink`,68.4,70,.5,`sfx`),J(`sfx-013`,`metal-clack`,76.4,77.8,.55,`sfx`),J(`sfx-014`,`metal-clack`,82.6,84,.6,`sfx`),J(`sfx-015`,`tool-tray`,92,93.5,.45,`sfx`),J(`sfx-016`,`cloth-rustle`,94.4,96,.55,`sfx`),J(`sfx-017`,`door-wood`,101.8,104.3,.72,`sfx`),J(`sfx-093`,`door-wood`,17.8,20.2,.55,`sfx`),J(`sfx-094`,`stairs`,12,16.2,.28,`sfx`),J(`sfx-095`,`stairs`,102.4,105.2,.24,`sfx`),J(`sfx-018`,`amb-workshop`,107.5,154.5,.65,`amb`,!0),J(`sfx-019`,`score-earth`,9.5,113.5,.58,`score`,!0),J(`sfx-020`,`score-work`,110,235,.55,`score`,!0),J(`sfx-021`,`door-metal`,108.4,111.2,.6,`sfx`),J(`sfx-022`,`metal-clack`,109.9,111.3,.6,`sfx`),J(`sfx-023`,`cloth-rustle`,111.2,112.8,.55,`sfx`),J(`sfx-024`,`tool-tray`,114,115.5,.55,`sfx`),J(`sfx-025`,`lathe`,120.2,139.5,.68,`sfx`,!0),J(`sfx-026`,`metal-click`,128.1,129.2,.5,`sfx`),J(`sfx-027`,`metal-clack`,135.9,137.2,.55,`sfx`),J(`sfx-028`,`lathe-stop`,139.2,141.2,.63,`sfx`),J(`sfx-029`,`shard-tinkle`,142.6,144.1,.5,`sfx`),J(`sfx-030`,`tool-tray`,144.9,146.4,.55,`sfx`),J(`sfx-031`,`radio-static`,134,135.2,.5,`radio`),J(`sfx-032`,`stairs`,153.8,158.2,.56,`sfx`),J(`sfx-033`,`amb-basement`,154,234,.72,`amb`,!0),J(`sfx-034`,`door-metal`,154.4,157.2,.6,`sfx`),J(`sfx-035`,`keypad`,157.3,158.8,.52,`sfx`),J(`sfx-036`,`door-metal`,159.2,162.2,.68,`sfx`),J(`sfx-037`,`airlock`,159.8,163,.1,`space`),J(`sfx-038`,`cloth-rustle`,165.4,167.1,.55,`sfx`),J(`sfx-039`,`tool-tray`,168.2,169.7,.55,`sfx`),J(`sfx-040`,`metal-clack`,170.4,171.7,.55,`sfx`),J(`sfx-041`,`adhesive`,180.2,181.7,.56,`sfx`),J(`sfx-042`,`adhesive`,183.1,184.6,.52,`sfx`),J(`sfx-043`,`adhesive`,185.9,187.4,.5,`sfx`),J(`sfx-044`,`metal-click`,188.8,189.8,.45,`sfx`),J(`sfx-045`,`radio-static`,191.4,192.7,.45,`radio`),J(`sfx-046`,`reload`,199,200.5,.7,`sfx`),J(`sfx-047`,`gun-cock`,201.2,202.6,.7,`sfx`),J(`sfx-048`,`heartbeat`,203,208,.6,`score`),J(`sfx-049`,`gunshot-concrete`,206.7,212.8,.85,`sfx`),J(`sfx-050`,`impact-meat`,206.76,207.6,.7,`sfx`),J(`sfx-051`,`shard-tinkle`,211.9,213.2,.55,`sfx`),J(`sfx-052`,`cloth-rustle`,214.8,216.5,.5,`sfx`),J(`sfx-053`,`metal-clack`,217.2,218.6,.52,`sfx`),J(`sfx-054`,`cloth-rustle`,222.8,224.2,.5,`sfx`),J(`sfx-055`,`metal-clack`,224.7,226,.58,`sfx`),J(`sfx-056`,`door-metal`,227.2,230,.62,`sfx`),J(`sfx-057`,`stairs`,229.8,233.4,.52,`sfx`),J(`sfx-058`,`score-space`,233.5,292.5,.56,`score`,!0),J(`sfx-059`,`suit-space`,244.5,327.5,.8,`suit`,!0),J(`sfx-060`,`telemetry`,246.2,247.2,.38,`radio`),J(`sfx-061`,`radio-burst`,257.2,258,.4,`radio`),J(`sfx-062`,`airlock`,266.4,269.5,.5,`sfx`),J(`sfx-063`,`thruster`,270.1,273.2,.42,`sfx`),J(`sfx-064`,`radio-static`,262.7,264,.36,`radio`),J(`sfx-065`,`radio-static`,279,280.1,.34,`radio`),J(`sfx-066`,`score-tension`,286,309,.54,`score`,!0),J(`sfx-067`,`glove-ring`,293.1,294.2,.72,`suit`),J(`sfx-068`,`scope-magnet`,295.1,296.1,.7,`sfx`),J(`sfx-069`,`reload`,297,298.4,.66,`sfx`),J(`sfx-070`,`gun-cock`,298.6,299.8,.62,`sfx`),J(`sfx-071`,`heartbeat`,300,305,.44,`score`),J(`sfx-072`,`vacuum-shots`,302.4,309.5,.8,`suit`),J(`sfx-073`,`heartbeat`,309.5,313,.5,`score`),J(`sfx-074`,`score-flight`,309.2,327,.6,`score`,!0),J(`sfx-075`,`space-impact`,312.4,313.6,.75,`sfx`),J(`sfx-076`,`space-impact`,313.1,314.3,.65,`sfx`),J(`sfx-077`,`radio-scream`,313.6,314.7,.64,`radio`),J(`sfx-078`,`radio-static`,315,316.2,.48,`radio`),J(`sfx-079`,`space-impact`,315.3,316.5,.55,`sfx`),J(`sfx-080`,`radio-static`,319,320.2,.44,`radio`),J(`sfx-081`,`alarm-radio`,318.8,323.4,.63,`radio`),J(`sfx-082`,`space-impact`,317,318.2,.5,`sfx`),J(`sfx-083`,`thruster`,326.2,329.2,.5,`sfx`),J(`sfx-084`,`suit-only`,327.5,337,.7,`suit`,!0),J(`sfx-085`,`score-coda`,326,356,.62,`score`,!0),J(`sfx-086`,`amb-base`,336.5,347,.52,`amb`,!0),J(`sfx-087`,`seal-hiss`,337.4,339.6,.6,`sfx`),J(`sfx-088`,`news-beep`,338.6,340,.45,`radio`),J(`sfx-089`,`radio-burst`,338.2,339,.32,`radio`),J(`sfx-090`,`score-earth`,0,9.6,.32,`score`,!0),J(`sfx-091`,`radio-burst`,329.3,330.1,.4,`radio`),J(`sfx-092`,`radio-burst`,334.7,335.5,.35,`radio`)];function hl(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new lr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=gl(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=gl(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}return c}function gl(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Qn(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var _l=1.8/32,vl=1.8,yl={classic:4,slim:3};function bl(e=`classic`){let t=yl[e],n=4+t/2;return{head:{size:[8,8,8],pivot:[0,24,0],offset:[0,4,0],uv:[0,0],inflate:.5},torso:{size:[8,12,4],pivot:[0,12,0],offset:[0,6,0],uv:[16,16],inflate:.25},armR:{size:[t,12,4],pivot:[-5,22,0],offset:[-(n-5),-4,0],uv:[40,16],inflate:.25},armL:{size:[t,12,4],pivot:[5,22,0],offset:[n-5,-4,0],uv:[32,48],inflate:.25},legR:{size:[4,12,4],pivot:[-1.9,12,0],offset:[0,-6,0],uv:[0,16],inflate:.25},legL:{size:[4,12,4],pivot:[1.9,12,0],offset:[0,-6,0],uv:[16,48],inflate:.25}}}var xl=[`head`,`torso`,`armR`,`armL`,`legR`,`legL`];function Sl(e){let[t,n,r]=e.size,[i,a]=e.uv;return{top:{x:i+r,y:a,w:t,h:r},bottom:{x:i+r+t,y:a,w:t,h:r},right:{x:i,y:a+r,w:r,h:n},front:{x:i+r,y:a+r,w:t,h:n},left:{x:i+r+t,y:a+r,w:r,h:n},back:{x:i+r+t+r,y:a+r,w:t,h:n}}}function Cl(e=`classic`){let t=bl(e);return Object.fromEntries(Object.entries(t).map(([e,t])=>[e,Sl(t)]))}var wl=[`front`,`back`,`left`,`right`,`top`,`bottom`];function Tl(e){return e===`all`?wl:Array.isArray(e)?e:[e]}function El(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Dl(e,t={}){let n=document.createElement(`canvas`);n.width=64,n.height=64;let i=n.getContext(`2d`,{willReadFrequently:!0});i.imageSmoothingEnabled=!1;let a=Cl(t.arm??`classic`),o={ctx:i,fill(e,t,n){for(let r of Tl(t)){let t=a[e][r];i.fillStyle=n,i.fillRect(t.x,t.y,t.w,t.h)}return o},rect(e,t,n,r,s,c,l){let u=a[e][t];return i.fillStyle=l,i.fillRect(u.x+n,u.y+r,s,c),o},px(e,t,n,r,i){return o.rect(e,t,n,r,1,1,i)},erase(e,t,n,r,s,c){let l=a[e][t];return i.clearRect(l.x+n,l.y+r,s,c),o},grain(e,t,n,r=1){for(let o of Tl(t)){let t=a[e][o],s=El(r+t.x*131+t.y*977),c=i.getImageData(t.x,t.y,t.w,t.h);for(let e=0;e<c.data.length;e+=4){if(c.data[e+3]===0)continue;let t=1+(s()-.5)*2*n;c.data[e]=Math.max(0,Math.min(255,c.data[e]*t)),c.data[e+1]=Math.max(0,Math.min(255,c.data[e+1]*t)),c.data[e+2]=Math.max(0,Math.min(255,c.data[e+2]*t))}i.putImageData(c,t.x,t.y)}return o},clear(e,t=`all`){for(let n of Tl(t)){let t=a[e][n];i.clearRect(t.x,t.y,t.w,t.h)}return o}};(t.transparent??!1)||(i.fillStyle=`#ffffff`,i.fillRect(0,0,64,64)),e(o);let s=new Ji(n);s.magFilter=r,s.minFilter=r,s.generateMipmaps=!1,s.flipY=!1,s.colorSpace=Ne;let c={canvas:n,texture:s,repaint(e){return i.clearRect(0,0,64,64),(t.transparent??!1)||(i.fillStyle=`#ffffff`,i.fillRect(0,0,64,64)),e(o),s.needsUpdate=!0,c}};return c}var Ol=[`left`,`right`,`top`,`bottom`,`front`,`back`];function kl(e,t,n){let r=Sl(bl(n)[t]),i=e.attributes.uv;Ol.forEach((e,t)=>{let n=r[e],a=n.x/64,o=(n.x+n.w)/64,s=n.y/64,c=(n.y+n.h)/64,l=t*4;i.setXY(l+0,a,s),i.setXY(l+1,o,s),i.setXY(l+2,a,c),i.setXY(l+3,o,c)}),i.needsUpdate=!0}function Al(e){let t=e.arm??`classic`,n=bl(t),r=e.castShadow??!0,i=new K({map:e.body,roughness:1,metalness:0}),a=new K({map:e.clothes??null,roughness:1,metalness:0,transparent:!0,alphaTest:.5}),o=new G;o.name=`block-figure`;let s=new G;s.name=`joint:hips`,s.position.set(0,n.torso.pivot[1],0),o.add(s);let c={hips:s},l={},u={},d=[],f={head:`neck`,torso:`hips`,armR:`armR`,armL:`armL`,legR:`legR`,legL:`legL`};for(let e of[`neck`,`armR`,`armL`,`legR`,`legL`]){let t=e===`neck`?n.head:n[e],r=new G;r.name=`joint:${e}`,r.position.set(t.pivot[0],t.pivot[1]-n.torso.pivot[1],t.pivot[2]),s.add(r),c[e]=r}for(let o of xl){let s=n[o],p=c[f[o]],m=new Cr(...s.size);kl(m,o,t),d.push(m);let h=new W(m,i);h.name=`part:${o}`,h.position.set(...s.offset),h.castShadow=r,h.receiveShadow=r,p.add(h),l[o]=h;let g=new Cr(s.size[0]+s.inflate*2,s.size[1]+s.inflate*2,s.size[2]+s.inflate*2);kl(g,o,t),d.push(g);let _=new W(g,a);_.name=`clothes:${o}`,_.position.set(...s.offset),_.castShadow=r,_.visible=!!e.clothes,p.add(_),u[o]=_}let p={},m=[[`handR`,`armR`,[n.armR.offset[0],-9.5,0],Math.PI/2],[`handL`,`armL`,[n.armL.offset[0],-9.5,0],Math.PI/2],[`head`,`neck`,[0,8,0],0],[`back`,`hips`,[0,6,-2],0],[`hipR`,`hips`,[-4.5,2,0],0],[`hipL`,`hips`,[4.5,2,0],0]];for(let[e,t,n,r]of m){let i=new G;i.name=`anchor:${e}`,i.position.set(...n),i.rotation.x=r,c[t].add(i),p[e]=i}let h={root:o,joints:c,anchors:p,parts:l,clothing:u,arm:t,setBody(e){i.map=e,i.needsUpdate=!0},setClothes(e){a.map=e,a.needsUpdate=!0,h.showClothes(!!e)},setHeight(e){o.scale.setScalar(_l*e/vl)},showClothes(e){for(let t of xl)u[t].visible=e},dispose(){for(let e of d)e.dispose();i.dispose(),a.dispose()}};return h.setHeight(e.heightM??1.8),h}var jl=[`hips`,`neck`,`armR`,`armL`,`legR`,`legL`];function Ml(e,t){for(let n of jl){let r=t[n];e.joints[n].rotation.set(...r??[0,0,0])}e.joints.hips.position.y=12+(t.lift??0)}function Nl(e,t,n){let r={};for(let i of jl){let a=e[i]??[0,0,0],o=t[i]??[0,0,0];r[i]=[a[0]+(o[0]-a[0])*n,a[1]+(o[1]-a[1])*n,a[2]+(o[2]-a[2])*n]}return r.lift=(e.lift??0)+((t.lift??0)-(e.lift??0))*n,r}function Pl(e,t=1.4){let n=e*t*Math.PI*2,r=Math.sin(n);return{hips:[0,Math.sin(n)*.04,0],neck:[Math.abs(Math.cos(n))*-.03,0,0],armR:[r*.62,0,.06],armL:[-r*.62,0,-.06],legR:[-r*.58,0,0],legL:[r*.58,0,0],lift:Math.abs(Math.cos(n))*.35-.2}}var Fl=[{dir:[1,0,0],corners:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]]},{dir:[-1,0,0],corners:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]},{dir:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]]},{dir:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},{dir:[0,0,1],corners:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]]},{dir:[0,0,-1],corners:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]]}];function Il(e,t={}){let[n,r,i]=e.size,a=t.voxel??1,o=t.anchor??`center`,s=o===`center`?-n/2:0,c=o===`center`?-r/2:0,l=o===`center`?-i/2:0,u=Array(n*r*i),d=(e,t,r)=>(t*i+r)*n+e;for(let t=0;t<r;t++)for(let r=0;r<i;r++)for(let i=0;i<n;i++)u[d(i,t,r)]=e.at(i,t,r);let f=(e,t,a)=>e>=0&&t>=0&&a>=0&&e<n&&t<r&&a<i&&u[d(e,t,a)]!==null,p=[],m=[],h=[],g=[],_=new H;for(let e=0;e<r;e++)for(let t=0;t<i;t++)for(let r=0;r<n;r++){let n=u[d(r,e,t)];if(n!=null){_.setHex(n);for(let n of Fl){if(f(r+n.dir[0],e+n.dir[1],t+n.dir[2]))continue;let i=p.length/3;for(let[i,o,u]of n.corners)p.push((r+i+s)*a,(e+o+c)*a,(t+u+l)*a),m.push(n.dir[0],n.dir[1],n.dir[2]),h.push(_.r,_.g,_.b);g.push(i,i+1,i+2,i,i+2,i+3)}}}let v=new lr;return v.setAttribute(`position`,new tr(p,3)),v.setAttribute(`normal`,new tr(m,3)),v.setAttribute(`color`,new tr(h,3)),v.setIndex(g),v.computeBoundingSphere(),v}function Ll(e={}){return new K({vertexColors:!0,roughness:1,metalness:0,...e})}function Rl(e,t,n={}){let r=Math.ceil(e)*2,i=r/2;return Il({size:[r,r,r],at(n,r,a){let o=n+.5-i,s=r+.5-i,c=a+.5-i,l=Math.sqrt(o*o+s*s+c*c);return l>e?null:typeof t==`function`?t(n,r,a,l/e):t}},n)}function zl(e){let{layers:t,palette:n,axis:r=`x`}=e;if(t.length===0)throw Error(`voxelModel needs at least one slice`);let i=t[0].length,a=t[0][0]?.length??0;for(let e of t){if(e.length!==i)throw Error(`every slice needs the same row count`);for(let t of e)if(t.length!==a)throw Error(`every row needs the same length`)}let o=(e,r,i)=>{let a=t[e][r][i],o=n[a];return o===void 0?null:o};return Il({size:r===`x`?[t.length,i,a]:r===`z`?[a,i,t.length]:[a,t.length,i],at(e,t,n){return r===`x`?o(e,i-1-t,n):r===`z`?o(n,i-1-t,e):o(t,n,e)}},e)}var Bl=Math.PI*2,Vl=(e,t,n)=>Math.min(n,Math.max(t,e)),Y=e=>Vl(e,0,1),X=(e,t,n)=>e+(t-e)*n,Z=e=>{let t=Y(e);return t*t*(3-2*t)};function Hl(e){let t=Math.floor(e)|0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),t^=t>>>16,(t>>>0)/4294967296}function Ul(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Wl(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=Hl(n*374761393+r*668265263),l=Hl((n+1)*374761393+r*668265263),u=Hl(n*374761393+(r+1)*668265263),d=Hl((n+1)*374761393+(r+1)*668265263);return X(X(c,l,o),X(u,d,o),s)}function Gl(e,t,n=4){let r=0,i=.5,a=e,o=t;for(let e=0;e<n;e++)r+=Wl(a,o)*i,a*=2.02,o*=2.02,i*=.5;return r/(1-.5**n)}function Kl(t,n,i,a={}){let s=document.createElement(`canvas`);s.width=t,s.height=n;let l=s.getContext(`2d`);if(!l)throw Error(`2D canvas context unavailable`);l.imageSmoothingEnabled=a.nearest??!1,i(l,s);let u=new Ji(s);return u.wrapS=e,u.wrapT=e,a.repeat&&u.repeat.set(a.repeat[0],a.repeat[1]),u.colorSpace=a.colorSpace??`srgb`,a.nearest?(u.magFilter=r,u.minFilter=r,u.generateMipmaps=!1):(u.magFilter=o,u.minFilter=c),u.anisotropy=a.anisotropy??4,u}function ql(e=`#493422`,t=[4,5]){let n=Ul(7301);return Kl(128,128,t=>{t.fillStyle=e,t.fillRect(0,0,128,128);for(let e=0;e<4;e++){let r=e*32;t.fillStyle=e%2?`rgba(255,214,156,.045)`:`rgba(0,0,0,.08)`,t.fillRect(0,r,128,32),t.strokeStyle=`rgba(10,6,3,.38)`,t.lineWidth=1,t.beginPath(),t.moveTo(0,r+.5),t.lineTo(128,r+.5),t.stroke();for(let i=0;i<20;i++){let a=r+3+n()*26;t.strokeStyle=`rgba(23,12,5,${.04+n()*.09})`,t.beginPath(),t.moveTo(0,a);for(let r=0;r<=128;r+=16)t.lineTo(r,a+Math.sin(r*.09+e+i)*(.8+n()*1.8));t.stroke()}for(let e=0;e<2;e++)t.strokeStyle=`rgba(20,11,5,.18)`,t.beginPath(),t.ellipse(n()*128,r+8+n()*20,3+n()*4,1+n()*1.5,0,0,Bl),t.stroke()}},{repeat:t,anisotropy:8})}function Jl(e=`#544a40`,t=`#2d2925`,n=[5,6]){let r=Ul(1123);return Kl(128,128,n=>{n.fillStyle=t,n.fillRect(0,0,128,128);for(let t=0;t<8;t++){let i=t%2?-16:0;for(let a=-1;a<6;a++){let o=a*32+i+1,s=t*16+1,c=.82+r()*.3;n.fillStyle=e,n.globalAlpha=.86,n.fillRect(o,s,30,14),n.globalAlpha=1,n.fillStyle=`rgba(255,235,205,${.018+r()*.04})`,n.fillRect(o,s,30,1),n.fillStyle=`rgba(10,8,6,${.03+r()*.1})`;for(let e=0;e<3;e++)n.fillRect(o+r()*30,s+r()*14,1+r()*4,1);let l=n.createLinearGradient(o,s,o,s+16);l.addColorStop(0,`rgba(255,255,255,${(c-1)*.12})`),l.addColorStop(1,`rgba(0,0,0,.16)`),n.fillStyle=l,n.fillRect(o,s,30,14)}}},{repeat:n,anisotropy:8})}function Yl(e=[7,9]){let t=Ul(8012);return Kl(128,128,e=>{e.fillStyle=`#514c43`,e.fillRect(0,0,128,128);for(let n=0;n<4;n++){let r=n*32,i=n%2?18:0;for(let n=-1;n<5;n++){let a=n*38+i;e.fillStyle=`rgba(${124+t()*26|0},${116+t()*22|0},${101+t()*20|0},.22)`,e.fillRect(a+1,r+1,35,29),e.strokeStyle=`rgba(30,27,23,.5)`,e.strokeRect(a+.5,r+.5,37,30);for(let n=0;n<14;n++)e.fillStyle=`rgba(20,18,15,${t()*.11})`,e.fillRect(a+t()*34,r+t()*28,1+t()*4,1+t()*2)}}let n=e.createLinearGradient(0,0,0,128);n.addColorStop(0,`rgba(255,255,255,.06)`),n.addColorStop(1,`rgba(0,0,0,.2)`),e.fillStyle=n,e.fillRect(0,0,128,128)},{repeat:e,anisotropy:8})}function Xl(e=[4,4]){let t=Ul(4117);return Kl(128,128,e=>{e.fillStyle=`#5d5b55`,e.fillRect(0,0,128,128);for(let n=0;n<3200;n++){let n=60+t()*55;e.fillStyle=`rgba(${n},${n-2},${n-5},${.03+t()*.09})`,e.fillRect(t()*128,t()*128,1+t()*2,1+t()*2)}for(let n=0;n<8;n++){e.strokeStyle=`rgba(22,21,18,${.07+t()*.13})`,e.lineWidth=.7+t(),e.beginPath();let n=t()*128,r=t()*128;e.moveTo(n,r);for(let i=0;i<4;i++)n+=(t()-.5)*22,r+=t()*15,e.lineTo(n,r);e.stroke()}e.fillStyle=`rgba(24,23,20,.2)`,e.fillRect(0,96,128,1),e.fillRect(0,32,128,1)},{repeat:e,anisotropy:6})}function Zl(){return Kl(8,8,e=>{e.clearRect(0,0,8,8),e.fillStyle=`rgba(255,255,255,.25)`,e.fillRect(2,2,4,4),e.fillStyle=`rgba(255,255,255,.95)`,e.fillRect(3,3,2,2),e.fillStyle=`rgba(255,255,255,.4)`,e.fillRect(0,3,1,2),e.fillRect(7,3,1,2),e.fillRect(3,0,2,1),e.fillRect(3,7,2,1)},{colorSpace:Ne})}function Ql(e=`rgba(255,244,213,1)`,t=`rgba(231,142,61,.4)`){return Kl(128,128,n=>{n.clearRect(0,0,128,128);let r=n.createRadialGradient(64,64,1,64,64,62);r.addColorStop(0,e),r.addColorStop(.12,`rgba(255,235,192,.9)`),r.addColorStop(.3,t),r.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=r,n.fillRect(0,0,128,128)})}function $l(){return Kl(64,64,e=>{e.clearRect(0,0,64,64);let t=e.createRadialGradient(32,32,1,32,32,31);t.addColorStop(0,`rgba(255,255,255,.65)`),t.addColorStop(.45,`rgba(221,234,238,.2)`),t.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=t,e.fillRect(0,0,64,64)})}function eu(e,t,n=.8,r){let i=new ci(new Jr({map:r??Ql(),color:e,transparent:!0,opacity:n,depthWrite:!1,depthTest:!0,blending:2}));return i.scale.setScalar(t),i}function tu(e,t=.35){let n=new ci(new Jr({map:$l(),color:14543338,transparent:!0,opacity:t,depthWrite:!1,blending:1}));return n.scale.setScalar(e),n}function nu(e,t={}){let n=t.width??512,r=t.height??128,i=t.family??`"Noto Sans CJK SC", sans-serif`;return Kl(n,r,a=>{a.clearRect(0,0,n,r),t.bg&&(a.fillStyle=t.bg,a.fillRect(0,0,n,r)),a.fillStyle=t.color??`#f3ead8`,a.font=`${t.weight??`500`} ${t.size??42}px ${i}`,a.textAlign=t.align??`center`,a.textBaseline=`middle`;let o=t.lines??[e],s=(t.size??42)*1.45,c=r/2-(o.length-1)*s/2;o.forEach((e,r)=>{a.fillText(e,t.align===`left`?24:n/2,c+r*s)})},{anisotropy:4})}function ru(e,t,n,r=1,i=14477813,a=11190222){let o=Ul(r),s=new Float32Array(e*3),c=new Float32Array(e*3),l=new H(i),u=new H(a),d=new H(15190949);for(let r=0;r<e;r++){let e=o()*Bl,i=o()*2-1,a=X(t,n,o()**.55),f=Math.sqrt(Math.max(0,1-i*i));s[r*3]=Math.cos(e)*f*a,s[r*3+1]=Math.sin(e)*f*a,s[r*3+2]=i*a;let p=o(),m=p>.93?d:p>.48?u:l,h=.26+o()**3*1.45;c[r*3]=m.r*h,c[r*3+1]=m.g*h,c[r*3+2]=m.b*h}let f=new lr;f.setAttribute(`position`,new Qn(s,3)),f.setAttribute(`color`,new Qn(c,3));let p=new Ki(f,new Vi({size:1.55,sizeAttenuation:!1,map:Zl(),vertexColors:!0,transparent:!0,opacity:.92,alphaTest:.015,depthWrite:!1,blending:2}));return p.frustumCulled=!1,p}function iu(e){let t=Math.max(2,Math.ceil(e.radius)*2),n=t/2,r=e.irregularity??.22;return Il({size:[t,t,t],at(t,i,a){let o=t+.5-n,s=i+.5-n,c=a+.5-n,l=Math.sqrt(o*o+s*s+c*c),u=Gl(t*.24+(e.seed??1)*3.7,a*.24-i*.17,3)*2-1,d=e.radius*(1+u*r);return l>d?null:e.color(t,i,a,l/Math.max(.001,d))}},{voxel:e.voxel,anchor:`center`})}function au(e){let t=new W(iu(e),Ll({metalness:e.metalness??.14,roughness:e.roughness??.82}));return t.castShadow=!0,t.receiveShadow=!0,t}function ou(e){let t=[],n=new H;for(let r of e){let e=new Cr(...r.size);r.rotation&&(e.rotateX(r.rotation[0]),e.rotateY(r.rotation[1]),e.rotateZ(r.rotation[2])),e.translate(...r.position),n.setHex(r.color);let i=e.attributes.position.count,a=new Float32Array(i*3);for(let e=0;e<i;e++)a[e*3]=n.r,a[e*3+1]=n.g,a[e*3+2]=n.b;e.setAttribute(`color`,new Qn(a,3)),t.push(e)}let r=t.length?hl(t,!1):null;for(let e of t)e.dispose();return r}function su(e,t,n={},r=!0,i=!0){let a=ou(t);if(!a)return null;let o=new W(a,new K({vertexColors:!0,roughness:.9,metalness:0,...n}));return o.castShadow=r,o.receiveShadow=i,e.add(o),o}function Q(e,t,n,r,i={}){let a=new W(new Cr(...t),r);return a.position.set(...n),i.rotation&&a.rotation.set(...i.rotation),a.castShadow=i.castShadow??!0,a.receiveShadow=i.receiveShadow??!0,i.name&&(a.name=i.name),e.add(a),a}function cu(e,t,n,r,i=[0,0,0]){let a=new W(new Zi(t[0],t[1]),r);return a.position.set(...n),a.rotation.set(...i),e.add(a),a}function lu(e,t=!0,n=!0){e.traverse(e=>{e instanceof W&&(e.castShadow=t,e.receiveShadow=n)})}function uu(e,t,n,r,i=0){e.position.set(...t),e.up.set(0,1,0),e.lookAt(n[0],n[1],n[2]),i&&e.rotateZ(i),r!==void 0&&e.fov!==r&&(e.fov=r,e.updateProjectionMatrix())}function du(e,t,n,r){let i=nu(r.text,{width:512,height:256,size:r.size??60,color:r.color??`#f3e6d0`,bg:r.bg,family:r.fontFamily,lines:r.lines}),a=r.emissive?new U({map:i,transparent:!0,toneMapped:!1}):new K({map:i,transparent:!0,roughness:.55,metalness:.12,emissive:4928799,emissiveMap:i,emissiveIntensity:.22}),o=new W(new Zi(r.width,r.height),a);return o.position.set(...t),o.rotation.set(...n),e.add(o),o}function fu(e,t=`#e2a866`){return Kl(1024,512,n=>{n.fillStyle=`#050b0d`,n.fillRect(0,0,1024,512),n.fillStyle=`#0a171b`,n.fillRect(0,0,1024,92),n.strokeStyle=`rgba(113,165,171,.35)`,n.lineWidth=2,n.strokeRect(12,12,1e3,488),n.fillStyle=t,n.fillRect(42,113,8,340),n.font=`500 29px "Noto Sans CJK SC", sans-serif`,n.fillStyle=`rgba(176,210,208,.66)`,n.fillText(`DEEP SPACE OPERATIONS / BULLETIN`,56,55),n.fillStyle=`#d9b881`,n.font=`600 44px "Noto Serif CJK SC", serif`,e.forEach((e,t)=>{n.fillStyle=t===0?`#eee2cd`:t===1?`#ba9b70`:`rgba(211,229,225,.7)`,n.font=t===0?`600 45px "Noto Serif CJK SC", serif`:`400 30px "Noto Sans CJK SC", sans-serif`,n.fillText(e,74,178+t*74)}),n.fillStyle=`rgba(138,183,184,.5)`,n.font=`400 23px "Courier New", monospace`,n.fillText(`2337.11.04  18:42:09  UTC+8`,74,430),n.fillStyle=`#9d3a30`,n.fillRect(800,411,126,34),n.fillStyle=`#e9d8be`,n.font=`600 20px "Noto Sans CJK SC", sans-serif`,n.fillText(`LIVE`,838,436)},{anisotropy:4})}function $(){let e=[],t=[],n=!1;return{nodes:e,sources:t,stop(){if(!n){n=!0;for(let e of t){try{e.stop()}catch{}try{e.disconnect()}catch{}}for(let t of[...e].reverse())try{t.disconnect()}catch{}}}}}var pu=new WeakMap,mu=new WeakMap;function hu(e){return Math.max(-1,Math.min(1,e))}function gu(e){let t=pu.get(e);if(t)return t;let n=Math.ceil(e.sampleRate*5),r={white:e.createBuffer(2,n,e.sampleRate),pink:e.createBuffer(2,n,e.sampleRate),brown:e.createBuffer(2,n,e.sampleRate)};for(let e=0;e<2;e++){let t=Ul(163+e*701),i=r.white.getChannelData(e),a=r.pink.getChannelData(e),o=r.brown.getChannelData(e),s=0,c=0,l=0,u=0,d=0,f=0,p=0,m=0;for(let e=0;e<n;e++){let n=t()*2-1;i[e]=n,s=.99886*s+n*.0555179,c=.99332*c+n*.0750759,l=.969*l+n*.153852,u=.8665*u+n*.3104856,d=.55*d+n*.5329522,f=-.7616*f-n*.016898,a[e]=hu((s+c+l+u+d+f+p+n*.5362)*.11),p=n*.115926,m=(m+.018*n)/1.018,o[e]=m*3.4}}return pu.set(e,r),r}function _u(e,t,n){let r=mu.get(e);r||(r=new Map,mu.set(e,r));let i=`${t}-${n}`,a=r.get(i);if(a)return a;let o=Math.max(1,Math.floor(e.sampleRate*n)),s=e.createBuffer(2,o,e.sampleRate),c=Ul(t===`concrete`?812:t===`room`?111:717),l=t===`space`?.06:.012,u=t===`concrete`?2.7:t===`room`?2:.8,d=t===`concrete`?.24:t===`room`?.5:.07;for(let n=0;n<2;n++){let r=s.getChannelData(n),i=0;for(let t=0;t<o;t++){let a=t/e.sampleRate;if(a<l){r[t]=0;continue}let o=a-l,s=c()*2-1;i+=(s-i)*d,r[t]=i*Math.exp(-u*o)*(n?.93:1)}t===`concrete`&&[.021,.034,.048,.071,.093,.121,.146,.18,.214].forEach((t,n)=>{let i=Math.floor((l+t)*e.sampleRate);i<o&&(r[i]+=(n%2?-1:1)*(.6/(n+1)))})}return r.set(i,s),s}function vu(e,t,n,r,i=.005,a=`exp`){let o=e.createGain(),s=Math.max(5e-4,Math.min(i,n*.5));return o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(Math.max(1e-4,r),t+s),a===`exp`?o.gain.exponentialRampToValueAtTime(1e-4,t+Math.max(s+.02,n)):o.gain.linearRampToValueAtTime(1e-4,t+Math.max(s+.02,n)),o}function yu(e,t=0){let n=e.createStereoPanner();return n.pan.value=Math.max(-1,Math.min(1,t)),n}function bu(e,t,n,r,i){let a=gu(t),o=t.createBufferSource();o.buffer=a[i.type??`white`];let s=o;if(i.lowpass){let n=t.createBiquadFilter();n.type=`lowpass`,n.frequency.value=i.lowpass,n.Q.value=i.q??.4,s.connect(n),s=n,e.nodes.push(n)}if(i.highpass){let n=t.createBiquadFilter();n.type=`highpass`,n.frequency.value=i.highpass,n.Q.value=i.q??.5,s.connect(n),s=n,e.nodes.push(n)}let c=vu(t,r,i.duration,i.gain,i.attack??.004),l=yu(t,i.pan??0);s.connect(c).connect(l).connect(n),o.start(r,Math.random()*2.8%o.buffer.duration),o.stop(r+i.duration+.04),e.nodes.push(o,c,l),e.sources.push(o)}function xu(e,t,n,r,i){let a=t.createOscillator();a.type=i.type??`sine`,a.frequency.setValueAtTime(Math.max(20,i.frequency),r),i.endFrequency&&a.frequency.exponentialRampToValueAtTime(Math.max(20,i.endFrequency),r+i.duration);let o=vu(t,r,i.duration,i.gain,i.attack??.004),s=yu(t,i.pan??0),c=o;if(i.filterFreq){let n=t.createBiquadFilter();n.type=`lowpass`,n.frequency.value=i.filterFreq,n.Q.value=.4,o.connect(n),c=n,e.nodes.push(n)}c.connect(s).connect(n),a.connect(o),a.start(r),a.stop(r+i.duration+.04),e.nodes.push(a,o,s),e.sources.push(a)}function Su(e,t,n,r,i=.12,a=0,o=1800){bu(e,t,n,r,{duration:.025,gain:i*.5,highpass:1200,pan:a,attack:.001}),xu(e,t,n,r,{frequency:o,endFrequency:o*.63,duration:.07,gain:i*.22,type:`triangle`,pan:a,attack:.001}),xu(e,t,n,r+.005,{frequency:o*1.5,duration:.04,gain:i*.1,type:`sine`,pan:a,attack:.001})}function Cu(e,t){let n=t===`space`?14:11,r=Math.ceil(e.sampleRate*n),i=e.createBuffer(2,r,e.sampleRate),a=Ul(t===`room`?66:t===`workshop`?87:t===`basement`?99:33);for(let n=0;n<2;n++){let o=i.getChannelData(n),s=0,c=0;for(let i=0;i<r;i++){let r=i/e.sampleRate,l=a()*2-1;if(s=(s+.012*l)/1.012,t===`room`){c+=(l-c)*.018,o[i]=c*.18+Math.sin(r*Math.PI*2*50+n)*.002+Math.sin(r*Math.PI*2*100.2)*.001;let e=(r+n*.07)%1.47;e<.006&&(o[i]+=Math.exp(-e*950)*.1);let t=Math.max(0,Math.sin(r*.23+n)-.995)*400;t>0&&(o[i]+=Math.sin(r*230)*Math.min(.008,t*1e-4))}else if(t===`workshop`){c+=(l-c)*.35,o[i]=c*.05+Math.sin(r*Math.PI*2*60+n*.2)*.004+Math.sin(r*Math.PI*2*120)*.002;let e=Math.max(0,Math.sin(r*.17+n*.3)-.5);o[i]+=e*l*.01,r%4.23<.008&&(o[i]+=Math.exp(-(r%4.23)*500)*.04)}else if(t===`basement`){c+=(l-c)*.06,o[i]=c*.13+Math.sin(r*Math.PI*2*63+n)*.003;let e=(r+n*.23)%5.73;e<.02&&(o[i]+=Math.sin(e*950)*Math.exp(-e*110)*.12)}else t===`base`?(c+=(l-c)*.09,o[i]=c*.095+Math.sin(r*Math.PI*2*54+n*.7)*.0025,o[i]+=Math.sin(r*2.1)*8e-4):o[i]=s*.3+Math.sin(n?r*1.7:r*1.3)*.0015}let l=Math.min(256,Math.floor(r/4));for(let e=0;e<l;e++){let t=e/l;o[e]*=t,o[r-1-e]*=t}}return i}var wu=new WeakMap;function Tu(e,t){let n=wu.get(e);n||(n=new Map,wu.set(e,n));let r=n.get(t);if(r)return r;let i=Cu(e,t);return n.set(t,i),i}function Eu(e,t,n,r,i,a,o,s){let c=t.createBufferSource();c.buffer=r,c.loop=!0;let l=c,u;if(o&&(u=t.createBiquadFilter(),u.type=`lowpass`,u.frequency.value=o,u.Q.value=.4,l.connect(u),l=u,e.nodes.push(u)),s){let n=t.createBiquadFilter();n.type=`highpass`,n.frequency.value=s,l.connect(n),l=n,e.nodes.push(n)}let d=t.createGain();return d.gain.value=a,l.connect(d).connect(n),c.start(t.currentTime+.015,i%r.duration),e.nodes.push(c,d),e.sources.push(c),c}function Du(e,t,n,r,i,a,o,s=3800){let c=t.createConvolver();c.buffer=_u(t,i,a);let l=t.createGain();l.gain.value=o;let u=t.createBiquadFilter();u.type=`lowpass`,u.frequency.value=s,n.connect(u).connect(c).connect(l).connect(r),e.nodes.push(c,l,u)}function Ou(e,t,n,r){let i=gu(t),a=t.createBufferSource();a.buffer=i.pink,a.loop=!0;let o=t.createBiquadFilter();o.type=`lowpass`,o.frequency.value=540;let s=t.createGain();s.gain.value=.11;let c=t.createOscillator();c.frequency.value=.075;let l=t.createGain();l.gain.value=.045,c.connect(l).connect(s.gain),a.connect(o).connect(s).connect(n),a.start(t.currentTime+.01,r%i.pink.duration),c.start(),e.nodes.push(a,o,s,c,l),e.sources.push(a,c);let u=t.createBufferSource();u.buffer=i.white,u.loop=!0;let d=t.createBiquadFilter();d.type=`bandpass`,d.frequency.value=1900,d.Q.value=.8;let f=t.createGain();f.gain.value=.012;let p=t.createOscillator();p.frequency.value=.21;let m=t.createGain();m.gain.value=.008,p.connect(m).connect(f.gain),u.connect(d).connect(f).connect(n),u.start(t.currentTime+.02,r%i.white.duration),p.start(),e.nodes.push(u,d,f,p,m),e.sources.push(u,p);let h=t.createOscillator();h.type=`sine`,h.frequency.value=43;let g=t.createGain();g.gain.value=.014,h.connect(g).connect(n),h.start(),e.nodes.push(h,g),e.sources.push(h);let _=[2.8,5.9,9.1,13.2,17.8,22.6,26.3],v=t.currentTime;for(let i=0;i<_.length;i++){let a=_[i];if(a<r)continue;let o=v+(a-r),s=i%2?.32:-.38;xu(e,t,n,o,{frequency:2350+i%3*140,endFrequency:1720-i%4*90,duration:.13,gain:.022,type:`sine`,pan:s}),xu(e,t,n,o+.15,{frequency:2850-i%2*150,endFrequency:1950,duration:.1,gain:.014,type:`sine`,pan:s})}}function ku(e,t,n,r){let i=gu(t),a=t.createBufferSource();a.buffer=i.brown,a.loop=!0;let o=t.createBiquadFilter();o.type=`highpass`,o.frequency.value=1200;let s=t.createGain();s.gain.value=.018,a.connect(o).connect(s).connect(n),a.start(t.currentTime+.02,r%i.brown.duration),e.nodes.push(a,o,s),e.sources.push(a);let c=t.createOscillator();c.frequency.value=31.5;let l=t.createGain();l.gain.value=.024;let u=t.createOscillator();u.frequency.value=47.2;let d=t.createGain();d.gain.value=.009;let f=t.createOscillator();f.frequency.value=.031;let p=t.createGain();p.gain.value=.006,f.connect(p).connect(d.gain),c.connect(l).connect(n),u.connect(d).connect(n),c.start(),u.start(),f.start(),e.nodes.push(c,l,u,d,f,p),e.sources.push(c,u,f)}function Au(e,t,n,r){let i=Math.ceil(t.sampleRate*7.6),a=t.createBuffer(2,i,t.sampleRate),o=Ul(5005);for(let e=0;e<2;e++){let n=a.getChannelData(e),r=0;for(let a=0;a<i;a++){let i=a/t.sampleRate,s=i%3.8,c=Math.exp(-(((s-.9)/.48)**2)),l=Math.exp(-(((s-2.55)/.62)**2)),u=o()*2-1;r+=(u-r)*(c>.02?.16:.05);let d=Math.sin(i*Math.PI*2*71+e)*.0025;n[a]=r*(c*.2+l*.15)+d}let s=Math.min(256,Math.floor(i/5));for(let e=0;e<s;e++)n[e]*=e/s,n[i-1-e]*=e/s}let s=t.createBufferSource();s.buffer=a,s.loop=!0;let c=t.createBiquadFilter();c.type=`lowpass`,c.frequency.value=1150;let l=t.createGain();l.gain.value=.16,s.connect(c).connect(l).connect(n),s.start(t.currentTime+.02,r%a.duration),e.nodes.push(s,c,l),e.sources.push(s)}function ju(e,t,n,r){let i=[];for(let e=0;e<10;e++)i.push(e*.145);for(let e=0;e<10;e++)i.push(2.32+e*.145);for(let e=0;e<10;e++)i.push(4.64+e*.145);let a=[1.82,4.14],o=t.currentTime+.01;for(let a=0;a<i.length;a++){let s=i[a];if(s<r)continue;let c=o+(s-r),l=.04+Math.sin(a*1.7)*.08;xu(e,t,n,c,{frequency:54+a%4*2,endFrequency:34,duration:.15,gain:.13,type:`sine`,pan:l,attack:.002}),bu(e,t,n,c,{duration:.06,gain:.045,lowpass:240,q:.8,pan:l,type:`brown`,attack:.001}),Su(e,t,n,c+.004,.02,l,1250+a%3*90)}for(let i of a){if(i<r)continue;let a=o+(i-r);bu(e,t,n,a,{duration:.05,gain:.055,lowpass:900,highpass:350,pan:.1,attack:.001}),Su(e,t,n,a+.06,.05,-.12,820),Su(e,t,n,a+.17,.045,.08,1020)}}function Mu(e,t,n,r,i){let a=t.currentTime+.02,o=Math.max(.2,i-r),s=t.createGain();s.gain.value=.14,s.connect(n),e.nodes.push(s);let c=[55,82.41,110,164.81,220];for(let n=0;n<c.length;n++){let r=t.createOscillator();r.type=n<2?`sine`:`triangle`,r.frequency.value=c[n],r.detune.value=(n%2?1:-1)*(3+n);let i=t.createGain();i.gain.setValueAtTime(1e-4,a),i.gain.linearRampToValueAtTime(.02/(n*.45+1),a+3.2+n*.5),i.gain.setValueAtTime(.02/(n*.45+1),a+Math.max(3.3,o-3)),i.gain.exponentialRampToValueAtTime(1e-4,a+o);let l=t.createBiquadFilter();l.type=`lowpass`,l.frequency.value=500+n*210;let u=t.createOscillator();u.frequency.value=.035+n*.007;let d=t.createGain();d.gain.value=.007,u.connect(d).connect(i.gain),r.connect(l).connect(i).connect(s),r.start(a),r.stop(a+o+.2),u.start(a),u.stop(a+o+.2),e.nodes.push(r,l,i,u,d),e.sources.push(r,u)}let l=[220,261.63,196,164.81,220,293.66,246.94];for(let n=0;n<16;n++){let i=1.5+n*6.8;if(i<r)continue;if(i>o)break;let c=a+(i-r),u=l[n%l.length];xu(e,t,s,c,{frequency:u,duration:3.5,gain:.012,type:`sine`,pan:n%2?.3:-.28,attack:.18}),xu(e,t,s,c,{frequency:u*2,duration:2,gain:.004,type:`triangle`,pan:n%2?.34:-.34,attack:.12,filterFreq:900})}}function Nu(e,t,n,r,i,a){let o=t.currentTime+.02,s=Math.max(.2,i-r),c=t.createGain();c.gain.value=a?.104:.12,c.connect(n),e.nodes.push(c);let l=a?[43.65,65.41,98,130.81,196]:[36.7,55,73.4,110,146.83];for(let n=0;n<l.length;n++){let r=t.createOscillator();r.type=n<2?`sine`:`sawtooth`,r.frequency.value=l[n],r.detune.value=(n-2)*4;let i=t.createBiquadFilter();i.type=`lowpass`,i.frequency.value=a?950:340,i.Q.value=.7;let u=t.createGain();u.gain.setValueAtTime(1e-4,o),u.gain.linearRampToValueAtTime(.012/(n*.4+1),o+2.5),u.gain.setValueAtTime(.012/(n*.4+1),o+Math.max(2.6,s-2.4)),u.gain.exponentialRampToValueAtTime(1e-4,o+s);let d=t.createOscillator();d.frequency.value=.028+n*.005;let f=t.createGain();f.gain.value=.004,d.connect(f).connect(u.gain),r.connect(i).connect(u).connect(c),r.start(o),r.stop(o+s+.2),d.start(o),d.stop(o+s+.2),e.nodes.push(r,i,u,d,f),e.sources.push(r,d)}if(a)for(let n=0;n<9;n++){let i=2.1+n*7.2;i<r||i>s||xu(e,t,c,o+(i-r),{frequency:261.63*(n%3==0?2:1.5),duration:2.8,gain:.004,type:`sine`,pan:n%2?.45:-.5,attack:.3})}}function Pu(e,t,n,r,i){let a=t.currentTime+.02,o=Math.max(.2,i-r),s=t.createGain();s.gain.value=.105,s.connect(n),e.nodes.push(s);for(let n=0;n<12;n++){let i=n*2.38;if(i<r||i>o)continue;let c=a+(i-r);xu(e,t,s,c,{frequency:46,endFrequency:39,duration:1.4,gain:.026,type:`sine`,attack:.02,pan:-.12}),xu(e,t,s,c+.12,{frequency:92,duration:1.2,gain:.006,type:`triangle`,attack:.01,pan:.2,filterFreq:300})}let c=t.createOscillator();c.type=`triangle`,c.frequency.value=1244.5;let l=t.createGain();l.gain.setValueAtTime(1e-4,a),l.gain.linearRampToValueAtTime(.003,a+4),l.gain.setValueAtTime(.003,a+Math.max(4.1,o-2)),l.gain.exponentialRampToValueAtTime(1e-4,a+o),c.connect(l).connect(s),c.start(a),c.stop(a+o+.1),e.nodes.push(c,l),e.sources.push(c)}function Fu(e,t,n,r,i){let a=t.currentTime+.02,o=Math.max(.2,i-r),s=t.createGain();s.gain.value=.11,s.connect(n),e.nodes.push(s);let c=[69.3,92.5,138.59,207.65];for(let n=0;n<c.length;n++){let r=t.createOscillator();r.type=n===0?`sine`:`triangle`,r.frequency.value=c[n],r.detune.value=n*3-4;let i=t.createBiquadFilter();i.type=`lowpass`,i.frequency.value=650;let l=t.createGain();l.gain.setValueAtTime(1e-4,a),l.gain.linearRampToValueAtTime(.008+n*.003,a+o*.55),l.gain.setValueAtTime(.009+n*.003,a+Math.max(o*.56,o-5)),l.gain.exponentialRampToValueAtTime(1e-4,a+o),r.connect(i).connect(l).connect(s),r.start(a),r.stop(a+o+.1),e.nodes.push(r,i,l),e.sources.push(r)}for(let n=0;n<8;n++){let i=.7+n*1.3;i<r||i>o||xu(e,t,s,a+(i-r),{frequency:830+n%3*90,duration:2.3,gain:.0035,type:`sine`,attack:.4,pan:n%2?.5:-.5})}}function Iu(e,t,n,r,i){let a=t.currentTime+.02,o=Math.max(.2,i-r),s=t.createGain();s.gain.value=.12,s.connect(n),e.nodes.push(s);let c=[55,82.4,110,164.81,220];for(let n=0;n<c.length;n++){let r=t.createOscillator();r.type=n===0?`sine`:`triangle`,r.frequency.value=c[n];let i=t.createBiquadFilter();i.type=`lowpass`,i.frequency.value=1e3;let l=t.createGain();l.gain.setValueAtTime(1e-4,a),l.gain.linearRampToValueAtTime(.013/(n*.5+1),a+2.3),l.gain.setValueAtTime(.013/(n*.5+1),a+Math.max(2.5,o-3.6)),l.gain.exponentialRampToValueAtTime(1e-4,a+o),r.connect(i).connect(l).connect(s),r.start(a),r.stop(a+o+.2),e.nodes.push(r,i,l),e.sources.push(r)}[440,392,329.63,293.66].forEach((n,i)=>{let c=2.2+i*2.2;c<r||c>o||xu(e,t,s,a+(c-r),{frequency:n,duration:3.2,gain:.008,type:`sine`,attack:.18,pan:i%2?.3:-.3})})}function Lu(e){let t=(t,n)=>{e.define(t,n)};t(`amb-hutong`,({audioContext:e,output:t,offset:n})=>{let r=$();return Ou(r,e,t,n),{stop:r.stop}}),t(`amb-room`,({audioContext:e,output:t,offset:n})=>{let r=$();Eu(r,e,t,Tu(e,`room`),n,.42,1700,40);let i=gu(e).pink,a=e.createBufferSource();a.buffer=i,a.loop=!0;let o=e.createBiquadFilter();o.type=`bandpass`,o.frequency.value=2600,o.Q.value=.45;let s=e.createGain();return s.gain.value=.005,a.connect(o).connect(s).connect(t),a.start(e.currentTime+.05,n%i.duration),r.nodes.push(a,o,s),r.sources.push(a),{stop:r.stop}}),t(`amb-workshop`,({audioContext:e,output:t,offset:n})=>{let r=$();Eu(r,e,t,Tu(e,`workshop`),n,.4,1300,35);let i=e.currentTime+.02;return[3.3,11.7,19.8,29.1].forEach((a,o)=>{a<n||Su(r,e,t,i+(a-n),.022,o%2?-.4:.5,420+o*70)}),{stop:r.stop}}),t(`amb-basement`,({audioContext:e,output:t,offset:n})=>{let r=$();Eu(r,e,t,Tu(e,`basement`),n,.52,950,32);let i=gu(e),a=e.createBufferSource();a.buffer=i.brown,a.loop=!0;let o=e.createBiquadFilter();o.type=`lowpass`,o.frequency.value=120;let s=e.createGain();return s.gain.value=.028,a.connect(o).connect(s).connect(t),a.start(e.currentTime+.03,n%i.brown.duration),r.nodes.push(a,o,s),r.sources.push(a),{stop:r.stop}}),t(`amb-base`,({audioContext:e,output:t,offset:n})=>{let r=$();return Eu(r,e,t,Tu(e,`base`),n,.34,900,34),{stop:r.stop}}),t(`score-earth`,({audioContext:e,output:t,offset:n,cue:r})=>{let i=$();return Mu(i,e,t,n,Math.max(0,r.end-r.start)),{stop:i.stop}}),t(`score-work`,({audioContext:e,output:t,offset:n,cue:r})=>{let i=$();return Nu(i,e,t,n,Math.max(0,r.end-r.start),!1),{stop:i.stop}}),t(`score-space`,({audioContext:e,output:t,offset:n,cue:r})=>{let i=$();return Nu(i,e,t,n,Math.max(0,r.end-r.start),!0),{stop:i.stop}}),t(`score-tension`,({audioContext:e,output:t,offset:n,cue:r})=>{let i=$();return Pu(i,e,t,n,Math.max(0,r.end-r.start)),{stop:i.stop}}),t(`score-flight`,({audioContext:e,output:t,offset:n,cue:r})=>{let i=$();return Fu(i,e,t,n,Math.max(0,r.end-r.start)),{stop:i.stop}}),t(`score-coda`,({audioContext:e,output:t,offset:n,cue:r})=>{let i=$();return Iu(i,e,t,n,Math.max(0,r.end-r.start)),{stop:i.stop}}),t(`suit-space`,({audioContext:e,output:t,offset:n})=>{let r=$();return ku(r,e,t,n),Au(r,e,t,n),{stop:r.stop}}),t(`suit-only`,({audioContext:e,output:t,offset:n})=>{let r=$();return Au(r,e,t,n),{stop:r.stop}}),t(`lathe`,({audioContext:e,output:t,offset:n})=>{let r=$(),i=e.currentTime+.02,a=e.createOscillator();a.type=`sawtooth`,a.frequency.value=58;let o=e.createOscillator();o.type=`triangle`,o.frequency.value=116;let s=e.createBiquadFilter();s.type=`lowpass`,s.frequency.value=340;let c=e.createGain();c.gain.value=.032;let l=e.createOscillator();l.frequency.value=7.2;let u=e.createGain();u.gain.value=.012,l.connect(u).connect(c.gain),a.connect(s),o.connect(s),s.connect(c).connect(t),a.start(),o.start(),l.start(),r.nodes.push(a,o,s,c,l,u),r.sources.push(a,o,l);let d=gu(e),f=e.createBufferSource();f.buffer=d.white,f.loop=!0;let p=e.createBiquadFilter();p.type=`bandpass`,p.frequency.value=2250,p.Q.value=2.2;let m=e.createBiquadFilter();m.type=`highpass`,m.frequency.value=700;let h=e.createGain();h.gain.value=.02,f.connect(p).connect(m).connect(h).connect(t),f.start(i,n%d.white.duration),r.nodes.push(f,p,m,h),r.sources.push(f);for(let a=0;a<18;a++){let o=.4+a*.73;o<n||xu(r,e,t,i+(o-n),{frequency:1450+a%5*210,endFrequency:980,duration:.08,gain:.012,type:`triangle`,pan:a%2?.3:-.2,attack:.001})}return{stop:r.stop}}),t(`lathe-stop`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return xu(n,e,t,r,{frequency:92,endFrequency:32,duration:1.3,gain:.07,type:`sawtooth`,filterFreq:360,attack:.01}),bu(n,e,t,r,{duration:.35,gain:.06,lowpass:900,highpass:120}),{stop:n.stop}}),t(`metal-click`,({audioContext:e,output:t})=>{let n=$();return Su(n,e,t,e.currentTime,.18,-.1,2200),{stop:n.stop}}),t(`metal-clack`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return Su(n,e,t,r,.22,.1,1350),bu(n,e,t,r+.01,{duration:.06,gain:.08,highpass:1800,pan:.08,attack:.001}),{stop:n.stop}}),t(`tool-tray`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;for(let i=0;i<3;i++)Su(n,e,t,r+i*.085,.08-i*.015,-.2+i*.2,1600+i*410);return{stop:n.stop}}),t(`cloth-rustle`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return bu(n,e,t,r,{duration:.42,gain:.06,highpass:500,lowpass:3600,pan:.05,attack:.04}),bu(n,e,t,r+.19,{duration:.3,gain:.035,highpass:800,lowpass:2500,pan:-.1,attack:.03}),{stop:n.stop}}),t(`door-wood`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return xu(n,e,t,r,{frequency:130,endFrequency:61,duration:1.1,gain:.09,type:`sawtooth`,filterFreq:600,attack:.02}),bu(n,e,t,r,{duration:.9,gain:.035,lowpass:900,highpass:110,attack:.08}),Su(n,e,t,r+.28,.045,.1,740),{stop:n.stop}}),t(`door-metal`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;bu(n,e,t,r,{duration:1.15,gain:.1,lowpass:1500,highpass:180,attack:.01});let i=e.createOscillator();i.type=`sawtooth`,i.frequency.setValueAtTime(38,r),i.frequency.linearRampToValueAtTime(48,r+1.1);let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=210;let o=vu(e,r,1.2,.065,.02);return i.connect(a).connect(o).connect(t),i.start(r),i.stop(r+1.25),n.nodes.push(i,a,o),n.sources.push(i),Su(n,e,t,r+.8,.07,0,900),{stop:n.stop}}),t(`keypad`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return[0,.13,.26].forEach((i,a)=>{xu(n,e,t,r+i,{frequency:610+a*70,duration:.08,gain:.035,type:`square`,pan:a%2?.16:-.16,attack:.002,filterFreq:1400})}),xu(n,e,t,r+.46,{frequency:880,duration:.18,gain:.04,type:`sine`,attack:.004}),{stop:n.stop}}),t(`stairs`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;for(let i=0;i<6;i++){let a=r+.3+i*.52,o=e.createBiquadFilter();o.type=`lowpass`,o.frequency.value=440;let s=vu(e,a,.18,.045,.003),c=e.createOscillator();c.type=`sine`,c.frequency.setValueAtTime(95+i*8,a),c.frequency.exponentialRampToValueAtTime(52,a+.16),c.connect(o).connect(s).connect(t),c.start(a),c.stop(a+.2),n.nodes.push(c,o,s),n.sources.push(c),bu(n,e,t,a+.01,{duration:.08,gain:.018,lowpass:900,highpass:200,pan:-.08})}return{stop:n.stop}}),t(`gunshot-concrete`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime+.005,i=e.createGain();i.gain.value=.9,i.connect(t),n.nodes.push(i),bu(n,e,i,r,{duration:.065,gain:.52,highpass:900,pan:.04,attack:.001}),bu(n,e,i,r,{duration:.26,gain:.22,lowpass:1500,highpass:180,pan:.04,attack:.002}),xu(n,e,i,r,{frequency:92,endFrequency:38,duration:.62,gain:.26,type:`sine`,attack:.001,pan:0}),xu(n,e,i,r+.004,{frequency:1880,endFrequency:400,duration:.12,gain:.08,type:`square`,filterFreq:2400,attack:.001}),Du(n,e,i,t,`concrete`,2.9,.56,3e3);let a=e.createDelay(.4);a.delayTime.value=.071;let o=e.createGain();o.gain.value=.16;let s=e.createBiquadFilter();return s.type=`lowpass`,s.frequency.value=1500,i.connect(s).connect(a).connect(o).connect(t),n.nodes.push(a,o,s),xu(n,e,t,r+.12,{frequency:4720,duration:2.8,gain:.011,type:`sine`,attack:.2,pan:-.2}),{stop:n.stop}}),t(`vacuum-shots`,({audioContext:e,output:t,offset:n})=>{let r=$();return ju(r,e,t,n),{stop:r.stop}}),t(`reload`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return Su(n,e,t,r,.16,.08,910),bu(n,e,t,r+.05,{duration:.09,gain:.05,highpass:500,lowpass:2100,pan:.1}),Su(n,e,t,r+.18,.09,.03,1550),{stop:n.stop}}),t(`gun-cock`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return Su(n,e,t,r,.14,.06,760),Su(n,e,t,r+.12,.17,.04,1260),bu(n,e,t,r+.1,{duration:.06,gain:.04,highpass:800,lowpass:3e3,pan:.02}),{stop:n.stop}}),t(`impact-meat`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return bu(n,e,t,r,{duration:.16,gain:.1,lowpass:320,type:`brown`,attack:.002}),xu(n,e,t,r,{frequency:110,endFrequency:52,duration:.2,gain:.06,type:`sine`,attack:.002}),{stop:n.stop}}),t(`shard-tinkle`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;for(let i=0;i<6;i++)xu(n,e,t,r+i*.055,{frequency:2200+i*370,endFrequency:1700+i*140,duration:.22,gain:.028,type:`sine`,pan:-.2+i*.08,attack:.002});return{stop:n.stop}}),t(`adhesive`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return bu(n,e,t,r,{duration:.38,gain:.025,highpass:1800,lowpass:4200,attack:.08}),xu(n,e,t,r+.05,{frequency:84,duration:.3,gain:.03,type:`sine`,attack:.04}),{stop:n.stop}}),t(`radio-static`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime,i=e.createBiquadFilter();i.type=`highpass`,i.frequency.value=1400;let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=3200;let o=e.createGain();o.gain.setValueAtTime(1e-4,r),o.gain.linearRampToValueAtTime(.05,r+.02),o.gain.setValueAtTime(.05,r+.28),o.gain.linearRampToValueAtTime(1e-4,r+.42);let s=e.createBufferSource();return s.buffer=gu(e).white,s.connect(i).connect(a).connect(o).connect(t),s.start(r,.4),s.stop(r+.44),n.nodes.push(s,i,a,o),n.sources.push(s),xu(n,e,t,r+.02,{frequency:1250,duration:.08,gain:.014,type:`sine`,attack:.004}),{stop:n.stop}}),t(`radio-scream`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime,i=e.createBiquadFilter();i.type=`highpass`,i.frequency.value=1100;let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=2800;let o=e.createGain();o.gain.setValueAtTime(1e-4,r),o.gain.linearRampToValueAtTime(.075,r+.02),o.gain.setValueAtTime(.075,r+.55),o.gain.exponentialRampToValueAtTime(1e-4,r+.9);let s=e.createBufferSource();s.buffer=gu(e).white,s.loop=!0,s.connect(i).connect(a).connect(o).connect(t),s.start(r,.24),s.stop(r+.95),n.nodes.push(s,i,a,o),n.sources.push(s);for(let i=0;i<8;i++)xu(n,e,t,r+i*.09,{frequency:320+i%4*170,endFrequency:260+i%3*90,duration:.07,gain:.015,type:`square`,pan:i%2?.2:-.2,filterFreq:1600,attack:.003});return{stop:n.stop}}),t(`alarm-radio`,({audioContext:e,output:t,offset:n})=>{let r=$(),i=e.currentTime+.02;for(let a of[0,.42,.84,1.62,2.04,2.46,3.2,3.62]){if(a<n)continue;let o=i+(a-n);xu(r,e,t,o,{frequency:880,duration:.26,gain:.022,type:`sine`,pan:.1,attack:.005}),xu(r,e,t,o,{frequency:1320,duration:.23,gain:.011,type:`triangle`,pan:-.08,attack:.005})}return bu(r,e,t,i,{duration:3.9,gain:.015,highpass:1400,lowpass:3800,attack:.2}),{stop:r.stop}}),t(`scope-magnet`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return xu(n,e,t,r,{frequency:1120,endFrequency:820,duration:.16,gain:.035,type:`triangle`,attack:.002}),bu(n,e,t,r+.01,{duration:.025,gain:.035,highpass:1800,pan:-.1,attack:.001}),Su(n,e,t,r+.05,.06,.05,1440),{stop:n.stop}}),t(`glove-ring`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime,i=gu(e).white,a=e.createBufferSource();a.buffer=i;let o=e.createBiquadFilter();o.type=`bandpass`,o.frequency.setValueAtTime(1500,r),o.frequency.exponentialRampToValueAtTime(3400,r+.6),o.Q.value=2.5;let s=vu(e,r,.68,.035,.05,`linear`);return a.connect(o).connect(s).connect(t),a.start(r,.2),a.stop(r+.7),n.nodes.push(a,o,s),n.sources.push(a),Su(n,e,t,r+.57,.07,.1,1860),{stop:n.stop}}),t(`heartbeat`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;for(let i=0;i<4;i++){let a=r+i*1.25;xu(n,e,t,a,{frequency:56,endFrequency:35,duration:.33,gain:.1,type:`sine`,attack:.008,pan:-.04}),xu(n,e,t,a+.19,{frequency:49,endFrequency:32,duration:.2,gain:.04,type:`sine`,attack:.005,pan:.05})}return{stop:n.stop}}),t(`thruster`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime+.01,i=gu(e).white,a=e.createBufferSource();a.buffer=i,a.loop=!0;let o=e.createBiquadFilter();o.type=`bandpass`,o.frequency.value=1800,o.Q.value=.5;let s=e.createGain();s.gain.setValueAtTime(1e-4,r),s.gain.linearRampToValueAtTime(.065,r+.18),s.gain.setValueAtTime(.065,r+.9),s.gain.linearRampToValueAtTime(1e-4,r+2.2),a.connect(o).connect(s).connect(t),a.start(r,.1),a.stop(r+2.25),n.nodes.push(a,o,s),n.sources.push(a);for(let i=0;i<5;i++)xu(n,e,t,r+i*.07,{frequency:34+i*2,endFrequency:24,duration:.08,gain:.045,type:`sine`,attack:.002,pan:.05});return{stop:n.stop}}),t(`space-impact`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime+.01;return xu(n,e,t,r,{frequency:39,endFrequency:28,duration:1.1,gain:.09,type:`sine`,attack:.02}),bu(n,e,t,r,{duration:.7,gain:.02,lowpass:160,type:`brown`,attack:.02}),{stop:n.stop}}),t(`news-beep`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return[0,.2,.42].forEach((i,a)=>{xu(n,e,t,r+i,{frequency:a===2?1046:783,duration:.12,gain:.018,type:`sine`,attack:.004})}),{stop:n.stop}}),t(`telemetry`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;for(let i=0;i<4;i++)xu(n,e,t,r+i*.16,{frequency:1560+i*130,duration:.045,gain:.012,type:`square`,attack:.001,filterFreq:3200});return{stop:n.stop}}),t(`seal-hiss`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return bu(n,e,t,r,{duration:1.5,gain:.045,highpass:1700,lowpass:6e3,attack:.04}),xu(n,e,t,r,{frequency:64,endFrequency:42,duration:1.2,gain:.03,type:`sine`,attack:.05}),{stop:n.stop}}),t(`cup-clink`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return xu(n,e,t,r,{frequency:1820,duration:.5,gain:.018,type:`sine`,attack:.002}),xu(n,e,t,r+.014,{frequency:2360,duration:.43,gain:.008,type:`sine`,attack:.002}),bu(n,e,t,r,{duration:.03,gain:.02,highpass:2600,attack:.001}),{stop:n.stop}}),t(`chair-wood`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return bu(n,e,t,r,{duration:.3,gain:.025,lowpass:900,highpass:140,attack:.015}),xu(n,e,t,r+.04,{frequency:146,endFrequency:89,duration:.4,gain:.025,type:`triangle`,filterFreq:700,attack:.01}),{stop:n.stop}}),t(`radio-burst`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime;return bu(n,e,t,r,{duration:.22,gain:.04,highpass:1200,lowpass:3600,attack:.008}),xu(n,e,t,r+.03,{frequency:1200,endFrequency:720,duration:.12,gain:.013,type:`sine`,attack:.001}),{stop:n.stop}}),t(`meteor-shimmer`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime+.01;bu(n,e,t,r,{duration:1.8,gain:.022,highpass:3e3,lowpass:9e3,attack:.1});for(let i=0;i<4;i++)xu(n,e,t,r+i*.17,{frequency:2200+i*630,endFrequency:1700+i*300,duration:.8,gain:.009,type:`sine`,attack:.05,pan:i%2?.3:-.3});return{stop:n.stop}}),t(`distant-clank`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime,i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.value=650;let a=e.createDelay(.5);a.delayTime.value=.08;let o=e.createGain();o.gain.value=.2;let s=vu(e,r,.5,.06,.004),c=e.createOscillator();return c.type=`triangle`,c.frequency.setValueAtTime(760,r),c.frequency.exponentialRampToValueAtTime(420,r+.25),c.connect(i).connect(s),s.connect(t),s.connect(a).connect(o).connect(t),c.start(r),c.stop(r+.55),n.nodes.push(i,a,o,s,c),n.sources.push(c),{stop:n.stop}}),t(`airlock`,({audioContext:e,output:t})=>{let n=$(),r=e.currentTime,i=e.createOscillator();i.type=`sawtooth`,i.frequency.setValueAtTime(35,r),i.frequency.linearRampToValueAtTime(48,r+2.6);let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=180;let o=vu(e,r,2.8,.05,.2,`linear`);return i.connect(a).connect(o).connect(t),i.start(r),i.stop(r+2.85),n.nodes.push(i,a,o,i),n.sources.push(i),bu(n,e,t,r+2.55,{duration:.16,gain:.04,highpass:900,lowpass:2600,attack:.005}),{stop:n.stop}})}var Ru=`#241a16`,zu=[`front`,`back`,`left`,`right`,`top`,`bottom`];function Bu(e,t){let n=t.expression??`calm`,r=t.eye??Ru,i=t.hair;t.skin;let a=t.skinShade;e.grain(`head`,`all`,.035,t.seed??9),e.fill(`head`,`top`,i),e.fill(`head`,`back`,i),e.rect(`head`,`front`,0,0,8,1,i),e.rect(`head`,`front`,0,1,1,t.bald?1:2,i),e.rect(`head`,`front`,7,1,1,t.bald?1:2,i),e.rect(`head`,`left`,0,0,8,t.female?5:2,i),e.rect(`head`,`right`,0,0,8,t.female?5:2,i),t.bald&&(e.rect(`head`,`front`,2,0,4,1,t.skinShade),e.rect(`head`,`front`,3,0,1,1,`rgba(255,255,255,.22)`)),t.female&&(e.rect(`head`,`front`,0,2,1,3,i),e.rect(`head`,`front`,7,2,1,3,i)),e.rect(`head`,`front`,1,2,2,1,t.brow),e.rect(`head`,`front`,5,2,2,1,t.brow),(n===`stern`||n===`sorrow`)&&(e.px(`head`,`front`,3,2,t.brow),e.px(`head`,`front`,4,2,t.brow)),n===`scream`&&(e.rect(`head`,`front`,1,1,2,1,t.brow),e.rect(`head`,`front`,5,1,2,1,t.brow)),e.rect(`head`,`front`,1,3,2,1,`#d9d5c9`),e.rect(`head`,`front`,5,3,2,1,`#d9d5c9`),e.px(`head`,`front`,2,3,r),e.px(`head`,`front`,5,3,r),e.px(`head`,`front`,1,4,a),e.px(`head`,`front`,6,4,a),t.glasses&&(e.rect(`head`,`front`,1,2,2,2,`rgba(181,213,210,.16)`),e.rect(`head`,`front`,5,2,2,2,`rgba(181,213,210,.16)`),e.rect(`head`,`front`,1,2,2,1,`#3d3830`),e.rect(`head`,`front`,5,2,2,1,`#3d3830`),e.px(`head`,`front`,3,2,`#5d5344`),e.px(`head`,`front`,4,2,`#5d5344`),e.px(`head`,`front`,0,3,`#3d3830`),e.px(`head`,`front`,7,3,`#3d3830`)),e.px(`head`,`front`,4,4,a),e.px(`head`,`front`,4,5,a),e.px(`head`,`front`,1,5,`rgba(104,62,47,.17)`),e.px(`head`,`front`,6,5,`rgba(104,62,47,.17)`),t.moustache&&e.rect(`head`,`front`,2,5,4,1,t.hair),n===`scream`?(e.rect(`head`,`front`,3,5,2,2,`#2b1713`),e.px(`head`,`front`,3,6,`#b88b75`)):n===`smile`?(e.rect(`head`,`front`,3,6,2,1,t.mouth??`#844c40`),e.px(`head`,`front`,2,5,`rgba(105,62,48,.4)`),e.px(`head`,`front`,5,5,`rgba(105,62,48,.4)`)):n===`sorrow`?(e.rect(`head`,`front`,3,6,2,1,t.mouth??`#845147`),e.px(`head`,`front`,2,7,`rgba(90,52,42,.3)`)):n===`stern`?(e.rect(`head`,`front`,2,6,4,1,t.mouth??`#75463c`),e.px(`head`,`front`,3,6,`#5e362f`)):e.rect(`head`,`front`,3,6,2,1,t.mouth??`#8a5548`),t.age&&t.age>0&&(e.px(`head`,`front`,1,4,`rgba(107,74,60,.28)`),e.px(`head`,`front`,6,4,`rgba(107,74,60,.28)`),e.px(`head`,`front`,2,1,`rgba(87,67,56,.28)`)),t.scar&&e.rect(`head`,`front`,6,1,1,3,`rgba(99,55,45,.45)`)}function Vu(e){let t=Dl(t=>{t.fill(`head`,`all`,e.skin),t.fill(`torso`,`all`,e.skin),t.fill(`armR`,`all`,e.skin),t.fill(`armL`,`all`,e.skin),t.fill(`legR`,`all`,e.skin),t.fill(`legL`,`all`,e.skin),Bu(t,e)});return{skin:t,texture:t.texture}}function Hu(e,t=`armR`){for(let n of zu)e.erase(t,n,0,10,4,2);e.rect(t,`front`,0,9,4,1,`#d4d6ce`),e.rect(t,`back`,0,9,4,1,`#aeb5b1`),e.rect(t,`left`,0,9,4,1,`#c9ccc4`),e.rect(t,`right`,0,9,4,1,`#bfc5c0`)}function Uu(e,t){let{jacket:n,jacketDark:r,collar:i,trousers:a}=t;e.fill(`torso`,`all`,n),e.fill(`armR`,`all`,n),e.fill(`armL`,`all`,n),e.fill(`legR`,`all`,a),e.fill(`legL`,`all`,a),e.grain(`torso`,`all`,.055,21),e.grain(`armR`,`all`,.04,26),e.grain(`armL`,`all`,.04,22),e.grain(`legR`,`all`,.055,31),e.grain(`legL`,`all`,.055,34),e.rect(`torso`,`front`,0,9,8,3,r),e.rect(`torso`,`front`,3,9,2,1,`#b99656`),e.rect(`torso`,`front`,3,1,2,1,i),e.rect(`torso`,`front`,0,0,8,1,r),e.rect(`torso`,`front`,1,0,1,2,i),e.rect(`torso`,`front`,6,0,1,2,i),e.rect(`torso`,`front`,1,3,2,2,`rgba(0,0,0,.11)`),e.rect(`torso`,`front`,5,3,2,2,`rgba(0,0,0,.11)`),e.rect(`torso`,`front`,3,1,1,6,`rgba(228,204,155,.6)`),e.rect(`torso`,`front`,3,10,2,1,`#171b1c`),t.insignia&&(e.rect(`torso`,`front`,1,2,1,1,t.insignia),e.rect(`torso`,`right`,0,2,4,1,t.insignia)),e.rect(`torso`,`back`,0,6,8,1,`rgba(0,0,0,.15)`);for(let t of[`armR`,`armL`])e.rect(t,`front`,0,8,4,1,r),e.rect(t,`back`,0,8,4,1,r),e.rect(t,`left`,0,8,4,1,r),e.rect(t,`right`,0,8,4,1,r),e.rect(t,`front`,0,2,1,1,i),e.rect(t,`back`,0,2,1,1,i),Hu(e,t);for(let t of[`legR`,`legL`])e.rect(t,`front`,1,0,1,9,`rgba(0,0,0,.13)`),e.rect(t,`front`,0,10,4,2,`#131719`),e.rect(t,`left`,0,10,4,2,`#191d1f`),e.rect(t,`right`,0,10,4,2,`#101416`),e.rect(t,`front`,0,10,4,1,`rgba(207,196,169,.12)`)}function Wu(e){let t=`#6b5840`,n=`#4a3b2b`;e.fill(`torso`,`all`,`#d0c2aa`),e.fill(`armR`,`all`,t),e.fill(`armL`,`all`,t),e.fill(`legR`,`all`,`#3d3a33`),e.fill(`legL`,`all`,`#3d3a33`),e.grain(`torso`,`all`,.09,54),e.grain(`armR`,`all`,.06,57),e.grain(`armL`,`all`,.06,53),e.grain(`legR`,`all`,.08,62),e.grain(`legL`,`all`,.08,66),e.rect(`torso`,`front`,0,0,2,9,t),e.rect(`torso`,`front`,6,0,2,9,t),e.rect(`torso`,`front`,2,0,4,9,`#cbbda5`),e.rect(`torso`,`front`,3,0,1,2,`#9f927e`),e.rect(`torso`,`front`,3,2,1,1,`#58493a`),e.rect(`torso`,`front`,3,5,1,1,`#58493a`),e.rect(`torso`,`front`,3,8,1,1,`#58493a`),e.rect(`torso`,`front`,0,9,8,3,`#3a3932`),e.rect(`torso`,`front`,3,10,2,1,`#77674a`),e.rect(`torso`,`front`,0,2,1,6,`rgba(255,235,199,.07)`),e.rect(`torso`,`front`,7,2,1,6,`rgba(255,235,199,.07)`),e.rect(`torso`,`front`,0,0,8,1,n);for(let t of[`armR`,`armL`])e.rect(t,`front`,0,8,4,2,n),e.rect(t,`back`,0,8,4,2,n),e.rect(t,`left`,0,8,4,2,n),e.rect(t,`right`,0,8,4,2,n),Hu(e,t);for(let t of[`legR`,`legL`])e.rect(t,`front`,1,0,1,9,`rgba(0,0,0,.16)`),e.rect(t,`front`,0,10,4,2,`#201d19`),e.rect(t,`left`,0,10,4,2,`#25221c`),e.rect(t,`right`,0,10,4,2,`#191612`)}function Gu(e,t,n){let r=Ul(t);e.save(),e.beginPath(),e.rect(9,9,6,6),e.clip(),e.strokeStyle=`rgba(217,237,235,.92)`,e.lineWidth=.55;for(let t=0;t<5;t++){e.beginPath();let t=8+r()*8,n=8+r()*8;e.moveTo(t,n);for(let i=0;i<3;i++)t+=(r()-.5)*3.5,n+=(r()-.5)*3.2,e.lineTo(t,n);e.stroke()}if(n)for(let t=0;t<20;t++)e.fillStyle=`rgba(${112+r()*30|0},${18+r()*20|0},${16+r()*18|0},${.35+r()*.65})`,e.fillRect(8+r()*8,8+r()*8,.6+r()*1.4,.6+r()*1.3);e.restore()}function Ku(e){return Dl(t=>{let n=`#d8dcd9`,r=`#c7cdca`,i=`#333d40`,a=e.accent;t.fill(`torso`,`all`,n),t.fill(`armR`,`all`,n),t.fill(`armL`,`all`,n),t.fill(`legR`,`all`,r),t.fill(`legL`,`all`,r),t.fill(`head`,`all`,`#e2e4de`),t.grain(`torso`,`all`,.04,e.seed??2),t.grain(`armR`,`all`,.04,3),t.grain(`armL`,`all`,.04,4),t.grain(`legR`,`all`,.045,5),t.grain(`legL`,`all`,.045,6),t.rect(`torso`,`front`,0,2,8,1,a),t.rect(`torso`,`front`,0,8,8,1,e.accentDark),t.rect(`torso`,`front`,1,3,1,5,i),t.rect(`torso`,`front`,6,3,1,5,i),t.rect(`torso`,`front`,3,3,2,2,`#66797b`),t.rect(`torso`,`front`,3,4,1,1,`#a04437`),t.rect(`torso`,`front`,2,9,4,2,`#b3b9b4`),t.rect(`torso`,`front`,3,10,1,1,a),t.rect(`torso`,`front`,0,3,1,1,`#a32f27`),t.px(`torso`,`front`,0,4,`#d5b65e`),t.rect(`torso`,`front`,5,6,2,1,`rgba(255,255,255,.35)`),t.rect(`torso`,`back`,0,0,8,2,`#b2b9b6`),t.rect(`torso`,`back`,3,2,2,7,`#6f7b7e`);for(let n of[`armR`,`armL`])t.rect(n,`front`,0,2,4,1,a),t.rect(n,`back`,0,2,4,1,a),t.rect(n,`left`,0,2,4,1,e.accentDark),t.rect(n,`right`,0,2,4,1,e.accentDark),t.rect(n,`front`,0,6,4,1,`#9fa9a6`),t.rect(n,`front`,0,10,4,2,e.gloveOff&&n===`armR`?`#d6a281`:`#a7b0ac`),t.rect(n,`back`,0,10,4,2,e.gloveOff&&n===`armR`?`#c69576`:`#949e9a`),t.rect(n,`left`,0,10,4,2,e.gloveOff&&n===`armR`?`#c49175`:`#b4bab5`),t.rect(n,`right`,0,10,4,2,e.gloveOff&&n===`armR`?`#ba8a70`:`#bcc1bd`);e.gloveOff&&Hu(t,`armR`);for(let n of[`legR`,`legL`])t.rect(n,`front`,1,0,1,7,`rgba(0,0,0,.13)`),t.rect(n,`front`,0,6,4,1,a),t.rect(n,`front`,0,10,4,2,`#5a5e58`),t.rect(n,`left`,0,10,4,2,`#4e524e`),t.rect(n,`right`,0,10,4,2,`#4e524e`),t.rect(n,`top`,0,0,4,4,e.accentDark);if(t.rect(`head`,`left`,0,0,8,8,`#dfe3de`),t.rect(`head`,`right`,0,0,8,8,`#d6dcd9`),t.rect(`head`,`top`,0,0,8,8,`#e6e8e2`),t.rect(`head`,`back`,0,0,8,8,`#cdd4d2`),t.rect(`head`,`bottom`,0,0,8,8,`#6e7776`),t.rect(`head`,`left`,0,1,8,1,a),t.rect(`head`,`right`,0,1,8,1,a),t.rect(`head`,`back`,0,1,8,1,a),e.visor===`sealed`)t.rect(`head`,`front`,0,0,8,8,`#e2e3da`),t.rect(`head`,`front`,1,1,6,5,`#263639`),t.rect(`head`,`front`,1,1,6,2,`#6c6857`),t.rect(`head`,`front`,2,2,2,1,`#baa06a`),t.rect(`head`,`front`,1,5,6,1,`#493c2a`),t.rect(`head`,`front`,0,6,8,1,`#b8bdb6`),t.rect(`head`,`front`,3,7,2,1,`#4f5653`);else{if(t.rect(`head`,`front`,0,0,8,8,`#e2e3da`),t.erase(`head`,`front`,1,1,6,6),t.rect(`head`,`front`,0,0,8,1,`#d1d7d3`),t.rect(`head`,`front`,0,0,1,8,a),t.rect(`head`,`front`,7,0,1,8,a),t.rect(`head`,`front`,1,7,6,1,`#b9bfb9`),t.rect(`head`,`front`,1,1,6,1,`rgba(227,246,246,.22)`),e.visor!==`clear`){let n=t.ctx.canvas.getContext(`2d`);n&&Gu(n,2301+(e.seed??0),e.visor===`bloodied`)}t.rect(`head`,`front`,0,7,4,1,e.accentDark)}},{transparent:!0})}var qu={geometry:null},Ju={geometry:null,material:null},Yu={geometry:null},Xu={texture:null};function Zu(){if(qu.geometry)return qu.geometry;let e=zl({palette:{"#":2106922,h:5266272,g:4010538,a:10382398,l:12169370},layers:[[`.............`,`.....#######.`,`....##hhhhhh#`,`....########.`,`....##.......`,`...##gg......`,`..##ggg......`,`..##gg.......`,`..##.........`],[`.............`,`....#########`,`....#hhhhhhh#`,`....#########`,`....##.......`,`...##gg......`,`..##ggg......`,`..##gg.......`,`..##.........`],[`.............`,`.....#######.`,`....##hhhhhh#`,`....########.`,`....##.......`,`...##gg......`,`..##ggg......`,`..##gg.......`,`..##.........`]],axis:`x`,voxel:.34});return qu.geometry=e,e}function Qu(){if(Yu.geometry)return Yu.geometry;let e=zl({palette:{"#":2435885,l:6983572,o:10119999},layers:[[`####`,`#ll#`,`####`],[`####`,`#ll#`,`####`]],axis:`x`,voxel:.34});return Yu.geometry=e,e}function $u(e=!1){let t=new G,n=Ll({metalness:.55,roughness:.4}),r=new W(Zu(),n);r.position.set(0,-.1,1.4),r.castShadow=!0,t.add(r);let i=new G,a=new W(Qu(),Ll({metalness:.7,roughness:.28}));if(a.position.set(0,.62,1.6),i.add(a),i.visible=e,t.add(i),!Xu.texture){let e=document.createElement(`canvas`);e.width=32,e.height=32;let t=e.getContext(`2d`),n=t.createRadialGradient(16,16,0,16,16,15);n.addColorStop(0,`rgba(255,247,218,1)`),n.addColorStop(.2,`rgba(255,201,94,.9)`),n.addColorStop(.55,`rgba(255,125,38,.35)`),n.addColorStop(1,`rgba(255,100,30,0)`),t.fillStyle=n,t.fillRect(0,0,32,32),Xu.texture=new Ji(e),Xu.texture.colorSpace=Ne}let o=new Jr({map:Xu.texture,color:16766362,transparent:!0,opacity:0,depthWrite:!1,blending:2}),s=new ci(o);s.position.set(0,0,3.65),s.scale.setScalar(1.1),t.add(s);let c=new Dn;return c.position.set(0,0,3.7),t.add(c),{root:t,scope:i,flash:s,muzzle:c,setFlash(e){o.opacity=Y(e),s.scale.setScalar(2.2+Y(e)*4.2)}}}function ed(){Ju.geometry||(Ju.geometry=zl({palette:{W:13094345,w:11186862,d:4608340,o:12089399,l:15316340},layers:[[`WWWWWW`,`WooooW`,`WWWWWW`,`WwwwwW`,`WwddwW`,`WwwwwW`,`WWWWWW`],[`WWWWWW`,`WooooW`,`WwWWwW`,`WwWWwW`,`WwddwW`,`WwwwwW`,`WWllWW`]],axis:`z`,voxel:1}),Ju.material=Ll({roughness:.8,metalness:.15}));let e=new G,t=new W(Ju.geometry,Ju.material);t.position.set(0,0,-1.2),t.castShadow=!1,t.receiveShadow=!1,e.add(t);let n=new K({color:5857892,metalness:.6,roughness:.45}),r=new W(new Cr(.45,3.2,.45),n);r.position.set(-2.2,3.6,-1.5),e.add(r);let i=new U({color:15118449,toneMapped:!1}),a=new W(new Cr(1.2,.55,.55),i);return a.position.set(0,1.2,-2.4),e.add(a),e}function td(){let e=Vu({skin:`#c9936d`,skinShade:`#9e694f`,hair:`#181b1d`,brow:`#1b1d1c`,expression:`calm`,age:1,seed:40}),t=Dl(e=>{Uu(e,{jacket:`#23343a`,jacketDark:`#141f23`,collar:`#954c3e`,trousers:`#1d282b`,insignia:`#cdaa65`})},{transparent:!0}),n=Ku({accent:`#d59652`,accentDark:`#92653a`,visor:`sealed`,commander:!0,seed:71}),r=Ku({accent:`#d59652`,accentDark:`#92653a`,visor:`clear`,commander:!0,seed:71}),i=Ku({accent:`#d59652`,accentDark:`#92653a`,visor:`clear`,gloveOff:!0,commander:!0,seed:71}),a=Al({body:e.texture,clothes:t.texture,heightM:1.78,castShadow:!0});return{figure:a,uniform:t.texture,suitSealed:n.texture,suitClear:r.texture,suitBare:i.texture,setUniform(){a.setClothes(t.texture)},setSuit(e){a.setClothes(e===`sealed`?n.texture:e===`bare`?i.texture:r.texture)},pose(e){Ml(a,e)}}}function nd(){let e=Vu({skin:`#c79a75`,skinShade:`#9d7159`,hair:`#827f76`,brow:`#6f6c63`,glasses:!0,moustache:!1,expression:`calm`,age:2,seed:21}),t=Vu({skin:`#c79a75`,skinShade:`#9d7159`,hair:`#827f76`,brow:`#6f6c63`,glasses:!0,expression:`smile`,age:2,seed:21}),n=Dl(e=>{Wu(e)},{transparent:!0}),r=Al({body:e.texture,clothes:n.texture,heightM:1.73,castShadow:!0});return{figure:r,uniform:n.texture,neutral:e.texture,smile:t.texture,setSmile(n){r.setBody(n?t.texture:e.texture)}}}function rd(e){let t=Vu({skin:e.skin,skinShade:e.skinShade,hair:e.hair,brow:e.brow,female:e.female,bald:e.bald,moustache:e.moustache,glasses:e.glasses,age:e.age,expression:`stern`,seed:e.seed}),n=Vu({skin:e.skin,skinShade:e.skinShade,hair:e.hair,brow:e.brow,female:e.female,bald:e.bald,moustache:e.moustache,glasses:e.glasses,age:e.age,expression:`scream`,seed:e.seed}),r=Ku({accent:e.accent,accentDark:e.accentDark,visor:`sealed`,commander:e.commander,seed:e.seed}),i=Ku({accent:e.accent,accentDark:e.accentDark,visor:`clear`,commander:e.commander,seed:e.seed}),a=Ku({accent:e.accent,accentDark:e.accentDark,visor:`cracked`,commander:e.commander,seed:e.seed}),o=Ku({accent:e.accent,accentDark:e.accentDark,visor:`bloodied`,commander:e.commander,seed:e.seed}),s=Al({body:t.texture,clothes:r.texture,heightM:1.72+e.seed%13*.009,castShadow:!1}),c=ed();return s.anchors.back.add(c),{figure:s,clearSuit:i.texture,sealedSuit:r.texture,crackedSuit:a.texture,bloodiedSuit:o.texture,setVisor(e){s.setClothes(e===`sealed`?r.texture:e===`cracked`?a.texture:e===`bloodied`?o.texture:i.texture)},setScream(e){s.setBody(e?n.texture:t.texture)}}}function id(e,t=`#8a9e9b`){let n=[`#c99b77`,`#c38967`,`#d7a887`,`#b67d63`,`#d0a080`],r=[`#171b1c`,`#2b2521`,`#4a4038`,`#777267`];return rd({skin:n[e%n.length],skinShade:`#93684f`,hair:r[e%r.length],brow:`#442f26`,female:e%4==0,bald:e%7==0,moustache:e%5==0,glasses:e%6==0,age:1,accent:t,accentDark:`#5f7472`,seed:e+80})}var ad=[{skin:`#c18a66`,skinShade:`#8d5f49`,hair:`#b7b5ac`,brow:`#887d6f`,age:3,accent:`#bd5039`,accentDark:`#743528`,seed:101,commander:!0},{skin:`#d3a482`,skinShade:`#a3745b`,hair:`#8c8c88`,brow:`#716b63`,female:!0,glasses:!0,age:2,accent:`#6d9ca5`,accentDark:`#466b73`,seed:202,commander:!0},{skin:`#c68f6c`,skinShade:`#96664f`,hair:`#5d574f`,brow:`#514b43`,bald:!0,moustache:!0,age:3,accent:`#c8a15c`,accentDark:`#796238`,seed:303,commander:!0}];function od(e){return rd(ad[e%ad.length])}function sd(e,t=!1,n=0){let r=Math.sin(e*1.4),i={hips:[-.06,.02,0],neck:[t?.34:.12+r*.01,.16,-.03],armR:[t?-.42:-.82+r*.018,.18,.34],armL:[t?-.5:-.9-r*.018,-.24,-.4],legR:[-1.25,.02,.1],legL:[-1.2,-.03,-.12],lift:-.2+r*.04};return n>0&&(i.armR=[i.armR[0]+n*.15,i.armR[1]-n*.1,i.armR[2]+n*.2]),i}function cd(e){let t=Math.sin(e*1.15);return{hips:[0,0,0],neck:[-.02+t*.01,.06,0],armR:[.02+t*.02,.02,-.075],armL:[-.02-t*.02,-.02,.065],legR:[0,0,.015],legL:[0,0,-.015],lift:t*.03}}function ld(e,t=0){let n=cd(e),r=Z(Y(Math.sin(e*.6+t)*.5+.5));return n.armR=[X(-.1,-.35,r),X(.02,.18,r),-.12],n}function ud(e,t=.55){let n=Math.sin(e*1.25)*.01;return{hips:[-.025,0,0],neck:[.22,0,0],armR:[-.76+n,.04,.18],armL:[-.8-n,-.05,-.14],legR:[.015,0,.015],legL:[-.015,0,-.015],lift:n*.2}}function dd(e,t=0,n=0,r=0){let i=Math.sin(e*.9)*.008;return{hips:[.025,r*.3,0],neck:[n*.4+.08,r*.25,0],armR:[-Math.PI/2+n+t*.08+i,r*.2,.045],armL:[-.5+t*.06,.36,-.55],legR:[-.08,0,.04],legL:[.1,0,-.04],lift:-.02+i}}function fd(e,t,n=1){let r={hips:[-.16+Math.sin(e*.33)*.03,Math.sin(e*.23)*.08,Math.cos(e*.21)*.03],neck:[.06+Math.sin(e*.4)*.02,Math.sin(e*.27)*.08,0],armR:[-.52+Math.sin(e*.31)*.06,.08,.25],armL:[-.35+Math.sin(e*.38+1.4)*.06,-.12,-.3],legR:[-.42+Math.sin(e*.29)*.08,.1,.12],legL:[-.22+Math.sin(e*.26+2)*.08,-.08,-.1],lift:1.2+Math.sin(e*.25)*.2};return t?Nl(r,t,Y(n)):r}function pd(e,t=1,n=!1){let r=Math.max(2,Math.round(e)),i=new H(n?9208178:4867648);return au({radius:r,voxel:.0095,seed:t,irregularity:.28,metalness:.42,roughness:.56,color(e,n,r,a){let o=a>.83,s=(e*13+n*7+r*17+t*5)%9/9,c=i.clone();return o?c.offsetHSL(-.015,.02,.1+s*.08):c.offsetHSL(0,0,(s-.45)*.14),c.getHex()}})}function md(e,t,n){return Nl(e,{...e,...t},Y(n))}function hd(e,t=1.2){let n=Pl(e,t);return n.neck=[-.015,Math.sin(e*.45)*.06,0],n}function gd(e,t,n,r=1){let i=Math.sin(t*113.1+r)*Math.sin(t*67.3)*n,a=Math.cos(t*91.7+r*1.7)*Math.sin(t*53.9)*n;e.position.x+=i,e.position.y+=a,e.rotateZ(i*.16)}function _d(e){let t=0;for(let n of fl){let r=Math.abs(e-n);r<.11&&(t=Math.max(t,1-r/.11))}return t}function vd(){let e=e=>[e.worlds.prologue.group,e.worlds.hutong.group,e.worlds.collector.group,e.worlds.workshop.group,e.worlds.basement.group,e.worlds.space.group,e.worlds.base.group],t=(t,n)=>{for(let r of e(t))r.visible=r===n},n=e=>{let t=document.getElementById(`backdrop`);t&&(t.className=`backdrop backdrop--${e}`)},r=e=>{let{zhang:t,collector:n}=e.worlds.collector;t.figure.root.visible=!0,t.setUniform(),t.figure.root.position.set(0,0,-.08),t.figure.root.rotation.set(0,.62,0),n.figure.root.visible=!0,n.figure.root.position.set(.05,0,2.7),n.figure.root.rotation.set(0,Math.PI-.62,0),n.setSmile(!0)},i=e=>{let t=e.worlds.workshop;t.zhang.figure.root.visible=!0,t.zhang.setUniform(),t.setMachining(!1),t.setPieces(0),t.setCaseOpen(!1),t.setWorkpieces(!0),t.setDustVial(!1),t.machineGlass.visible=!0},a=e=>{let t=e.worlds.basement;t.zhang.figure.root.visible=!0,t.zhang.setUniform(),t.setDoorOpen(0),t.setLights(1),t.setBullets(!0),t.setInspection(!1),t.setParcelState(`loaded`),t.setBulletCount(36),t.gun.root.visible=!1,t.setStairsActive(!1)},o=(e,r)=>{t(e,e.worlds.space.group),n(`space`);let i=e.worlds.space;return i.setCrewVisible(r),i.setSoloVictim(null),i.setGunVisible(!1),i.setScopeVisible(!1),i.setBulletsVisible(!1),i.setZhangJets(!1),i};return[{id:`prologue`,start:0,end:10,enter:({context:e})=>{t(e,e.worlds.prologue.group),n(`space`)},update:({context:e,localTime:t,time:n})=>{e.worlds.prologue.update(n,t);let r=Y(t/10);uu(e.camera,[.55-.1*r,.18+Math.sin(r*2.1)*.03,.4-.14*r],[-.4,.02,-1.55],35-2.5*r,Math.sin(r*2.2)*.012)}},{id:`hutong-approach`,start:10,end:27.5,enter:({context:e})=>{t(e,e.worlds.hutong.group),n(`dusk`);let r=e.worlds.hutong;r.setMode(`dusk`),r.setDoorOpen(0),r.setCase(!1),r.zhang.figure.root.visible=!0,r.zhang.setUniform(),r.zhang.figure.root.position.set(-.2,0,-5.5),r.zhang.figure.root.rotation.set(0,0,0),r.collector.figure.root.visible=!0,r.collector.figure.root.position.set(.2,0,4.7),r.collector.figure.root.rotation.set(0,Math.PI,0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.hutong,i=t;if(r.zhang.figure.root.visible=i<12.4,r.collector.figure.root.visible=i>10.8,i<8.1){let e=Z(Y((i-.35)/7.4));r.zhang.figure.root.position.set(-.25+Math.sin(e*2.8)*.06,0,X(-6.5,-.5,e)),r.zhang.figure.root.rotation.set(0,0,0),r.zhang.pose(hd(n+.7,1.18)),r.setDoorOpen(0)}else if(i<9.8)r.zhang.figure.root.position.set(-.16,0,-.35),r.zhang.figure.root.rotation.set(0,0,0),r.setDoorOpen(Z(Y((i-8.1)/1.3))),r.zhang.pose(md(cd(n),{neck:[.02,.1,0],armR:[-1.25,.05,-.16],armL:[-.18,-.05,.08]},Z(Y((i-8.1)/.5))));else if(i<12.4){let e=Z(Y((i-9.8)/2.5));r.setDoorOpen(1),r.zhang.figure.root.position.set(-.1,0,X(-.2,2.9,e)),r.zhang.pose(hd(n+1.4,1))}else r.setDoorOpen(1),Ml(r.collector.figure,cd(n+1.4));r.collector.setSmile(!0),r.collector.figure.root.position.set(.18,0,4.5),r.collector.figure.root.rotation.set(0,Math.PI,0),r.update(n,t),yd(e,t)}},{id:`room-reveal`,start:27.5,end:39,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`),r(e);let i=e.worlds.collector;i.setSafeOpen(0),i.setChosenVisible(!1),i.setParcelVisible(!1),i.setPhone(!1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t);let i=sd(n,1-Z(Y((t-3.3)/1.1))>.4,.12);t>4.3&&(i.armR=[-.7,.14,.3],i.armL=[-.8,-.18,-.32],i.neck=[.05,.2,.02]),Ml(r.collector.figure,i),Ml(r.zhang.figure,md(cd(n),{neck:[.01,.04,0],armR:[.03,.03,-.08],armL:[-.03,-.03,.07]},Z(Y(t/2.5))));let a=Z(Y(t/11.5));uu(e.camera,[3.35-.2*a,1.48-.02*a,1.25-.35*a],[0,1.22,1.35],44-3*a,.005*Math.sin(t*.25))}},{id:`room-talk`,start:39,end:52,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`),r(e);let i=e.worlds.collector;i.setSafeOpen(0),i.setChosenVisible(!1),i.setParcelVisible(!1),i.setPhone(!1),i.collector.setSmile(!0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t);let i=sd(n+.5,!1,.12);i.neck=[.07,.18,-.02],i.armR=[-.77,.14,.3],i.armL=[-.8,-.2,-.3],Ml(r.collector.figure,i);let a=ld(n+.2,.4);t>7.4&&(a=md(a,{armR:[-.45,.2,.18],neck:[.06,-.16,0]},Z(Y((t-7.4)/1.8)))),Ml(r.zhang.figure,a);let o=Z(Y(t/13));uu(e.camera,[3.55-.2*o,1.4,.55-.08*o],[-.05,1.2,1.25],41-2*o,.005*Math.sin(t*.36))}},{id:`cabinets`,start:52,end:58.5,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`);let r=e.worlds.collector;r.zhang.figure.root.visible=!1,r.collector.figure.root.visible=!1,r.setSafeOpen(0),r.setChosenVisible(!1),r.setParcelVisible(!1)},update:({context:e,localTime:t,time:n})=>{e.worlds.collector.update(n,t);let r=Z(Y(t/6));uu(e.camera,[1.5-.3*r,1.42,.4+1.2*r],[-4.6,1.65,0+2.8*r],43,-.01)}},{id:`safe`,start:58.5,end:64,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`);let r=e.worlds.collector;r.zhang.figure.root.visible=!1,r.collector.figure.root.visible=!1,r.setChosenVisible(!1),r.setParcelVisible(!1),r.setPhone(!1),r.setSafeOpen(0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t),r.setSafeOpen(0);let i=Z(Y(t/5.2));uu(e.camera,[-1.95+.12*i,1.35,2.25+.15*i],[-3.55,1.18,3.95],36-2*i,-.005)}},{id:`request`,start:64,end:78,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`),r(e);let i=e.worlds.collector;i.setChosenVisible(!1),i.setParcelVisible(!1),i.setPhone(!1),i.setSafeOpen(1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t);let i=sd(n+1.1,!1,.24),a=Z(Y((t-6)/3.2));i.hips=[-.06-a*.03,.03,0],i.neck=[.08+a*.18,.08,0],i.armR=[-.78-a*.1,.12,.3+a*.15],i.armL=[-.75-a*.1,-.18,-.27-a*.12],Ml(r.collector.figure,i),Ml(r.zhang.figure,md(cd(n+.8),{neck:[.03,.08,0],armR:[-.18,.16,-.06],armL:[.02,-.02,.06]},Z(Y((t-1)/2.2)))),t>5.4&&r.setChosenVisible(!0);let o=Z(Y((t-9.5)/3.6));uu(e.camera,[3.45-.2*o,1.43-.16*o,.45+.2*o],[0,1.22-.22*o,1.25-.08*o],42-5*o,.005*Math.sin(t*.35))}},{id:`bargain`,start:78,end:88.5,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`),r(e);let i=e.worlds.collector;i.setChosenVisible(!0),i.setParcelVisible(!1),i.setPhone(!1),i.setSafeOpen(1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t);let i=sd(n+2,!1,.28);i.neck=[.12,.06,0],i.armR=[-.88,.14,.32],i.armL=[-.84,-.18,-.3],t>6.8&&(r.collector.setSmile(!1),i.armR=[-.62,.2,.22]),Ml(r.collector.figure,i),Ml(r.zhang.figure,cd(n+1));let a=Z(Y(t/10.5));uu(e.camera,[2.85-.2*a,1.3,1.05+.2*a],[.02,1.06,1.7],36-1.5*a,-.008)}},{id:`payment`,start:88.5,end:95.4,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`),r(e);let i=e.worlds.collector;i.setChosenVisible(!0),i.setParcelVisible(!1),i.setPhone(!1),i.setSafeOpen(1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t),r.setPhone(t>.35);let i=sd(n+3,!1,.08);i.neck=[.14,.06,0],i.armR=[-.7,.14,.3],i.armL=[-.78,-.18,-.25],Ml(r.collector.figure,i),t>4.6&&r.collector.setSmile(!1),Ml(r.zhang.figure,md(cd(n+1.4),{neck:[.14,.05,0],armR:[-.95,.02,.08],armL:[.02,-.02,.06]},Z(Y(t/1.5))));let a=Z(Y((t-.7)/3.8));uu(e.camera,[2+.8*a,1.7-.25*a,1+1*a],[.15,.95+.2*a,1.25+.7*a],39+1*a,.005)}},{id:`farewell`,start:95.4,end:100.5,enter:({context:e})=>{t(e,e.worlds.collector.group),n(`room`),r(e);let i=e.worlds.collector;i.setChosenVisible(!0),i.setParcelVisible(!1),i.setPhone(!0),i.collector.setSmile(!1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.collector;r.update(n,t);let i=sd(n+4,!1,0);i.neck=[.02,.08,0],i.armR=[-.56,.12,.3],i.armL=[-.62,-.12,-.25],Ml(r.collector.figure,i);let a=cd(n+2);a.neck=[.03,.02,0],a.armR=[-.1,.06,-.08],a.armL=[-.06,-.04,.06],Ml(r.zhang.figure,a);let o=Z(Y(t/5));uu(e.camera,[2.7-.2*o,1.38,2.25-.35*o],[0,1.28,-.08-.12*o],38-2*o,.005)}},{id:`departure`,start:100.5,end:107.5,enter:({context:e})=>{t(e,e.worlds.hutong.group),n(`night`);let r=e.worlds.hutong;r.setMode(`night`),r.setDoorOpen(1),r.setCase(!0),r.zhang.figure.root.visible=!0,r.zhang.setUniform(),r.zhang.figure.root.position.set(-.1,0,1.7),r.zhang.figure.root.rotation.set(0,Math.PI,0),r.collector.figure.root.visible=!0,r.collector.figure.root.position.set(.2,0,4.3),r.collector.figure.root.rotation.set(0,Math.PI,0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.hutong,i=t,a=Z(Y((i-.2)/6.4)),o=r.zhang;o.figure.root.visible=!0,o.figure.root.position.set(-.1+Math.sin(a*1.7)*.12,0,X(1.65,-3,a)),o.figure.root.rotation.set(0,Math.PI,0);let s=hd(n+.9,1.05);s.armL=[.02+Math.sin(n*1.1)*.025,0,.1],i>4.1&&(s.neck=[.02,-.4*Z(Y((i-4.1)/1.3)),0]),o.pose(s);let c=Z(Y((i-1.2)/1.8));r.setDoorOpen(1-c),i>2.6?r.collector.figure.root.visible=!1:(r.collector.figure.root.visible=!0,Ml(r.collector.figure,{hips:[0,.04,0],neck:[.03,-.05,0],armR:[-.12,.08,-.1],armL:[-.06,-.04,.08],legR:[0,0,.02],legL:[0,0,-.02]})),r.update(n,t);let l=Z(Y(i/6.8));uu(e.camera,[2.35-.4*l,1.28+.08*l,-5.6+.4*l],[0,1.36,X(.6,-1.1,l)],37+1*l,.006*Math.sin(t*.25))}},{id:`workshop-wide`,start:107.5,end:120.5,enter:({context:e})=>{t(e,e.worlds.workshop.group),n(`workshop`),i(e);let r=e.worlds.workshop;r.zhang.figure.root.position.set(6.5,0,4.5),r.zhang.figure.root.rotation.set(0,-1.9,0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.workshop,i=t,a=Z(Y((i-.2)/5.3));if(r.zhang.figure.root.position.set(X(6.5,-.15,a),0,X(4.5,2.3,a)),i<5.4)r.zhang.figure.root.rotation.y=-1.9+.55*a,r.zhang.pose(hd(n+2,1.18));else{let e=Z(Y((i-5.4)/1.7));r.zhang.figure.root.rotation.y=X(-1.35,Math.PI,e);let t=Z(Y((i-7.4)/2));r.zhang.pose(md(cd(n+1),{neck:[.12,.1,0],armR:[-.34,.16,-.05],armL:[-.5,-.12,.1]},t))}i>8.6&&r.zhang.pose(md(ud(n,.55),{hips:[-.02,0,0],neck:[.24,-.1,0],armR:[-.58,.16,-.06],armL:[-.75,-.08,-.12]},Z(Y((i-8.6)/1.5)))),i>11&&r.setCaseOpen(!0),i>12.4&&r.setMachining(!0),r.update(n);let o=Z(Y(t/13));uu(e.camera,[6.3-2.7*o,2.05-.34*o,6.4-1.8*o],[0+.1*o,1.2,.7],43-6*o,.006*Math.sin(n*.2))}},{id:`lathe-macro`,start:120.5,end:133,enter:({context:e})=>{t(e,e.worlds.workshop.group),n(`workshop`),i(e);let r=e.worlds.workshop;r.zhang.figure.root.visible=!1,r.setMachining(!0),r.setCaseOpen(!0),r.machineGlass.visible=!1},leave:({context:e})=>{e.worlds.workshop.machineGlass.visible=!0},update:({context:e,localTime:t,time:n})=>{e.worlds.workshop.update(n);let r=Z(Y(t/12));uu(e.camera,[1.7-.2*r,1.55+.03*Math.sin(t*.5),3.5-.2*r],[-1.15-.1*r,1.08-.03*r,.55],38-3*r,.004*Math.sin(t*1.6)),gd(e.camera,n,.003,3)}},{id:`segments`,start:133,end:144.5,enter:({context:e})=>{t(e,e.worlds.workshop.group),n(`workshop`),i(e);let r=e.worlds.workshop;r.zhang.figure.root.position.set(3.15,0,2.62),r.zhang.figure.root.rotation.set(0,Math.PI,0),r.setMachining(!0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.workshop;t>6.3&&r.setMachining(!1);let i=Math.floor(Z(Y((t-1.2)/6))*36);r.setPieces(i),t>8.1&&r.setWorkpieces(!1),Ml(r.zhang.figure,md(ud(n+1.3,.7),{neck:[.26,.04,0],armR:[-.93,.12,.2],armL:[-.88,-.14,-.18]},Z(Y(t/2.5)))),r.update(n);let a=Z(Y(t/11.5));uu(e.camera,[5.25-.35*a,1.72-.08*a,.05+.2*a],[3.03,1.04,1.5],40-3*a,.005*Math.sin(t*.3))}},{id:`workshop-clean`,start:144.5,end:154,enter:({context:e})=>{t(e,e.worlds.workshop.group),n(`workshop`),i(e);let r=e.worlds.workshop;r.zhang.figure.root.position.set(3,0,2.5),r.zhang.figure.root.rotation.set(0,Math.PI,0),r.setPieces(36),r.setWorkpieces(!1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.workshop;r.update(n),t>3.2&&r.setDustVial(!0);let i=ud(n+2,.65);i.neck=[.22,.02,0],i.armR=[-.96,.1,.2],i.armL=[-.86,-.14,-.2],i.lift=Math.sin(n*1.2)*.15-.08,Ml(r.zhang.figure,i);let a=Z(Y(t/9.5));uu(e.camera,[5-.3*a,1.55-.04*a,.95-.15*a],[3.02,1,1.5],38-3*a,.006)}},{id:`stairwell`,start:154,end:165,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.position.set(0,2.55,-8.4),r.zhang.figure.root.rotation.set(0,.04,0),r.setDoorOpen(0),r.setStairsActive(!0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.basement,i=t;r.zhang.figure.root.visible=i<8.2;let a=Z(Y((i-.4)/4.2));if(r.zhang.figure.root.position.set(0,X(2.52,.05,a),X(-8.35,-4.9,a)),r.zhang.figure.root.rotation.set(0,.03,0),i<4.7){let e=hd(n+1.2,1.1);e.armR=[-.72+Math.sin(n*1.2)*.03,.08,-.35],e.neck=[.15,.05,0],r.zhang.pose(e)}else if(i<6.5)r.zhang.pose(md(cd(n+.5),{neck:[.12,.18,0],armR:[-1.15,.18,.1],armL:[-.1,-.03,.07]},Z(Y((i-4.7)/1.2))));else if(i<8.2){let e=Z(Y((i-6.5)/1.6));r.zhang.figure.root.position.set(0,0,X(-4.9,-3.7,e)),r.zhang.pose(hd(n+.8,1))}r.setDoorOpen(Z(Y((i-5.6)/1.5))),r.setStairsActive(!0),r.update(n,t);let o=Z(Y(i/10));uu(e.camera,[.75,2.9-.65*o,-8.9+1.5*o],[0,X(1.35,.8,o),X(-5,-4.25,o)],46-4*o,.006*Math.sin(n*.35))}},{id:`disassembly`,start:165,end:178,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.position.set(-.8,0,-.5),r.zhang.figure.root.rotation.set(0,0,0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.basement;r.update(n,t);let i={hips:[-.035,.02,0],neck:[.25,.04,0],armR:[-.96+Math.sin(n*1.7)*.03,.14,.24],armL:[-.9+Math.cos(n*1.5)*.03,-.16,-.21],legR:[-.02,0,.02],legL:[.015,0,-.02],lift:Math.sin(n*1.2)*.05};Ml(r.zhang.figure,md(cd(n),i,.9));let a=Z(Y(t/12));uu(e.camera,[1.15+.15*a,1.34-.02*a,1.42+.25*a],[-.52,1.04,.05],39-2*a,.005*Math.sin(t*.4))}},{id:`tips`,start:178,end:191,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.visible=!1,r.zhang.figure.root.position.set(-.55,0,-.35),r.zhang.figure.root.rotation.set(0,0,0)},update:({context:e,localTime:t,time:n})=>{e.worlds.basement.update(n,t);let r=Z(Y(t/12));uu(e.camera,[.52-.04*r,1.29-.02*r,1.42-.08*r],[-.18,1,.5],34-1.5*r,.004)}},{id:`load-aim`,start:191,end:203,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.position.set(-.35,0,.3),r.zhang.figure.root.rotation.set(0,.2,0),r.gun.root.visible=!0},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.basement;r.update(n,t);let i=Z(Y((t-8)/2.4)),a={hips:[.01,.04,0],neck:[.13,-.16,0],armR:[-.7,.12,.15],armL:[-.88,-.15,-.34],legR:[.02,0,.04],legL:[-.02,0,-.04],lift:Math.sin(n*1.2)*.08};Ml(r.zhang.figure,Nl(a,dd(n,0,.055,.15),i)),r.zhang.figure.root.rotation.y=X(.1,.45,i);let o=Z(Y(t/12));uu(e.camera,[2.35-.2*o,1.7+.02*o,-2.4+1.6*o],[-.2,1.12,1+.15*o],48-4*o,.005*Math.sin(t*.4))}},{id:`test-shot`,start:203,end:215,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.position.set(-.6,0,.42),r.zhang.figure.root.rotation.set(0,.58,0),r.gun.root.visible=!0},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.basement;r.update(n,t);let i=3.7,a=t>i?Math.max(0,1-(t-i)/.35):0,o=dd(n,a,.055,.12),s={hips:[.01,.06,0],neck:[.01,-.08,0],armR:[-.22,.08,.08],armL:[-.18,-.06,-.08],legR:[.03,0,.04],legL:[-.03,0,-.04],lift:Math.sin(n*1.2)*.08},c=Z(Y((t-4.8)/1.4));Ml(r.zhang.figure,Nl(o,s,c)),r.zhang.figure.root.position.x=-.6+a*.016,r.setParcelState(t>3.9000000000000004?`holes`:`loaded`);let l=Z(Y(t/11));uu(e.camera,[2.55-.1*l,1.8+.02*l,-2.5+.2*l],[-.15,1.1,1.15+.25*l],51-4*l,.006*Math.sin(t*.33)),gd(e.camera,n,.04*a,5)}},{id:`inspect`,start:215,end:225.5,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.visible=!1,r.setInspection(!0),r.setParcelState(`open`)},update:({context:e,localTime:t,time:n})=>{e.worlds.basement.update(n,t);let r=Z(Y(t/9.5));uu(e.camera,[.9-.18*r,1.7-.04*r,2.35-.2*r],[-.18,.98,1.02],38-2*r,.005)}},{id:`basement-leave`,start:225.5,end:233.5,enter:({context:e})=>{t(e,e.worlds.basement.group),n(`basement`),a(e);let r=e.worlds.basement;r.zhang.figure.root.position.set(-.1,0,.1),r.zhang.figure.root.rotation.set(0,.12,0),r.setParcelState(`open`),r.setInspection(!1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.basement,i=t;if(r.zhang.figure.root.visible=i<5.8,i<2.4)Ml(r.zhang.figure,md(ud(n+1.2,.55),{hips:[-.01,.02,0],neck:[.13,.03,0],armR:[-.68,.1,.16],armL:[-.56,-.12,-.14]},.8));else if(i<5.8){let e=Z(Y((i-2.4)/3.2));r.zhang.figure.root.position.set(X(-.1,-.35,e),0,X(.1,-3.5,e)),r.zhang.figure.root.rotation.y=X(.12,Math.PI-.04,Z(Y((i-2.4)/1.2))),r.zhang.pose(hd(n+.4,1))}let a=Z(Y((i-1.8)/1.4));r.setDoorOpen(a),i>2.6&&r.setBulletCount(0),i>4.3&&r.setLights(Math.max(.06,1-Z(Y((i-4.3)/3.2))*.94)),r.update(n,t);let o=Z(Y(t/8));uu(e.camera,[2.1-.15*o,1.6+.02*o,2.4-.15*o],[-.3,1.15,X(-.5,-1.7,o)],47-3*o,.006*Math.sin(t*.31))}},{id:`orbit-reveal`,start:233.5,end:245,enter:({context:e})=>{let t=o(e,!1);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/11.5));uu(e.camera,[14-6*r,8.5-2.6*r,16-7.5*r],[-2.8+1.2*r,-6+4.8*r,-73-2*r],47-8*r,.007*Math.sin(t*.14))}},{id:`zhang-float`,start:245,end:256,enter:({context:e})=>{let t=o(e,!1);t.zhang.figure.root.visible=!0,t.zhang.setSuit(`clear`),t.zhang.figure.root.position.set(.03,.42,.05),t.zhang.figure.root.rotation.set(.05,.08,.04)},update:({context:e,time:t})=>{let n=e.worlds.space;n.update(t);let r=n.zhang;r.figure.root.position.set(.03+Math.sin(t*.31)*.05,.42+Math.sin(t*.27+.8)*.035,.05),r.figure.root.rotation.set(.045,.08+Math.sin(t*.23)*.04,.035);let i=fd(t,void 0,1);i.neck=[.09,.18+Math.sin(t*.16)*.06,-.03],i.armR=[-.45+Math.sin(t*.27)*.04,.18,.3],i.armL=[-.72+Math.sin(t*.22+1)*.04,-.16,-.26],Ml(r.figure,i);let a=Z(Y((t-245)/11));uu(e.camera,[1.7+.35*a,1.82-.1*a,4.15-.6*a],[-.02+.05*a,1.3+.02*a,-.15],34-2*a,.012*Math.sin(t*.25))}},{id:`station-exit`,start:256,end:267.5,enter:({context:e})=>{let t=o(e,!1);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/11.5));uu(e.camera,[5-1.2*r,2.4-.9*r,-60.5-2.5*r],[.5,1.1-.35*r,-81],36-4*r,.007*Math.sin(t*.25))}},{id:`airlock-exit`,start:267.5,end:272,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/4.5));uu(e.camera,[4.7-.7*r,2.2+.55*r,-62.5-1.5*r],[.5,.9+.7*r,-80.5],38-3*r,.007*Math.sin(t*.3))}},{id:`egress`,start:272,end:279,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/7));uu(e.camera,[2.2-.8*r,5.6-.8*r,-26-2*r],[.3,4.1-.6*r,-48-6*r],43-5*r,.008*Math.sin(t*.22))}},{id:`lineup`,start:279,end:291,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/12));uu(e.camera,[3.6-1.35*r,2.9+1*r,-33.8-2*r],[.15,4.55,-46.4],38-3*r,.005*Math.sin(t*.35)),gd(e.camera,n,.0012,2)}},{id:`weapon-prep`,start:291,end:302,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!0,t.zhang.setSuit(`clear`),t.zhang.figure.root.position.set(.02,.35,.02),t.zhang.figure.root.rotation.set(.03,0,.02)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.space;r.update(n);let i=r.zhang,a=n>=293.1;i.setSuit(a?`bare`:`clear`),r.setGunVisible(n>=293.5),r.setScopeVisible(n>=295.1);let o=Z(Y((n-298.2)/1.8));i.figure.root.rotation.y=Math.PI*o,i.figure.root.position.set(.02+Math.sin(n*.4)*.025,.35+Math.sin(n*.3)*.03,.02);let s={hips:[-.12,.03,.02],neck:[.18,-.12,.02],armR:[-.6,.16,.3],armL:[-.85,-.2,-.42],legR:[-.5,.12,.08],legL:[-.37,-.1,-.1],lift:1.1+Math.sin(n*.4)*.15},c=dd(n,0,.06,0);c.lift=1,Ml(i.figure,Nl(s,c,o));let l=Z(Y(t/11));uu(e.camera,[-2.3+.15*l,1.6,3.8-.25*l],[0,1.26,-.28],42-2*l,.007*Math.sin(t*.3))}},{id:`firing`,start:302,end:309,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!0,t.zhang.setSuit(`bare`),t.zhang.figure.root.position.set(0,.3,0),t.zhang.figure.root.rotation.set(.03,Math.PI,0),t.setGunVisible(!0),t.setScopeVisible(!0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.space;r.update(n);let i=_d(n),a=dd(n,i,.06,0);a.hips=[.03,.01,-.008],a.lift=1.05,Ml(r.zhang.figure,a),r.zhang.figure.root.position.set(.02+Math.sin(n*.28)*.035-i*.02,.3+Math.sin(n*.23)*.025,i*.035);let o=Z(Y(t/6.8));uu(e.camera,[2.65-.25*o,1.72-.04*o,3.2-.2*o],[0,1.28,-.55-.2*o],39-2*o,.004*Math.sin(t*.28)),gd(e.camera,n,.04*i,4)}},{id:`bullet-flight`,start:309,end:311.2,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1,t.setBulletsVisible(!0)},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/2.2));uu(e.camera,[5.4-.4*r,4.7-.1*r,-10-1.2*r],[-.2,3.35,-29-1*r],36-2*r,-.02+.008*r)}},{id:`scope`,start:311.2,end:315,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Math.sin(n*.9)*.025,i=Math.cos(n*.7)*.012;uu(e.camera,[.12+r,1.73+i,.62],[.2+r*.4,4.64+i,-46],7.3,.002*Math.sin(n*.4))}},{id:`impact-reaction`,start:315,end:320.5,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1},update:({context:e,localTime:t,time:n})=>{e.worlds.space.update(n);let r=Z(Y(t/5.5));uu(e.camera,[.35+.1*r,4.4-.06*r,-39.4-1.4*r],[.1,4.7,-46.2-.8*r],34-2*r,.006*Math.sin(t*.7)),gd(e.camera,n,.006,6)}},{id:`victim-close`,start:320.5,end:326,enter:({context:e})=>{let t=o(e,!0);t.zhang.figure.root.visible=!1,t.setSoloVictim(1)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.space;r.update(n);let i=r.getVictimPoint(1),a=Z(Y(t/5.5)),o=i.clone().add(new B(.85-.06*a+Math.sin(n*.5)*.04,.15+.04*a,3.15-.35*a));uu(e.camera,[o.x,o.y,o.z],[i.x,i.y+.02,i.z],30-1*a,-.018+.012*a),gd(e.camera,n,.0035,12)}},{id:`retreat`,start:326,end:337,enter:({context:e})=>{let t=o(e,!0);t.setSoloVictim(null),t.zhang.figure.root.visible=!0,t.zhang.setSuit(`bare`),t.zhang.figure.root.position.set(-.2,.35,0),t.zhang.figure.root.rotation.set(.02,.1,.02),t.setGunVisible(!0),t.setScopeVisible(!0),t.setZhangJets(!0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.space;r.update(n);let i=Y(t/11),a=Z(i),o=r.zhang;o.figure.root.position.set(-.2+Math.sin(i*3.2)*.12,.35+Math.sin(i*2.4)*.04,a*1.1),o.figure.root.rotation.set(.03+Math.sin(i*2)*.02,.1+a*.16,.02+Math.sin(i*1.5)*.03);let s=fd(n+1.3);s.neck=[.15,.08,.02],s.armR=[-.27,-.04,.25],s.armL=[-.19,.08,-.24],Ml(o.figure,s);let c=Z(Y(i));uu(e.camera,[1.9+.8*c,1.58+.22*c,3.1+1.1*c],[0,1.32-.18*c,.5+.55*c],42+4*c,-.012*c),gd(e.camera,n,.0025,17)}},{id:`base`,start:337,end:347,enter:({context:e})=>{t(e,e.worlds.base.group),n(`base`);let r=e.worlds.base;r.zhang.figure.root.visible=!0,r.zhang.setUniform(),r.zhang.figure.root.position.set(-1.1,0,-.3),r.zhang.figure.root.rotation.set(0,Math.PI,0)},update:({context:e,localTime:t,time:n})=>{let r=e.worlds.base;r.update(n,t);let i=cd(n+.4);i.neck=[.03+Math.sin(n*.21)*.01,.03,0],i.armR=[.04,.02,-.07],i.armL=[-.03,-.02,.06],Ml(r.zhang.figure,i);let a=Z(Y(t/10));uu(e.camera,[1.65-.6*a,1.66-.02*a,2.8-.7*a],[-.75-.05*a,1.36,-1.65],54-7*a,.005*Math.sin(t*.2))}},{id:`end-card`,start:347,end:356,enter:({context:t})=>{for(let n of e(t))n.visible=!1;n(`black`)},update:({context:e})=>{e.camera.position.set(0,1.5,4),e.camera.lookAt(0,1.2,0)}}]}function yd(e,t){let n=1-(1-Math.min(1,Math.max(0,t/12)))**2.6;uu(e.camera,[2.1-.7*n+Math.sin(t*.25)*.035,4.85-3.35*n,-14.6+11.3*n],[-.18+.12*Math.sin(t*.15),1.85-.25*n,-2+3*n],37+n*4,-.012+n*.018)}function bd(e){let t=Ul(e),n=new G,r=new U({color:16768432,transparent:!0,opacity:.65,depthWrite:!1,blending:2}),i=new W(new Cr(.025,.025,1.9+t()*1.3),r);i.rotation.z=-.2,n.add(i);for(let e=0;e<3;e++){let r=new W(new Cr(.01,.01,.8+t()*.7),new U({color:e===1?10273743:16763019,transparent:!0,opacity:.18+t()*.2,depthWrite:!1,blending:2}));r.position.set((t()-.5)*.04,(t()-.5)*.04,-.3-e*.18),r.rotation.z=-.2,n.add(r)}let a=eu(16770228,.16,.8);return a.position.z=.9,n.add(a),n.visible=!1,n}function xd(){let e=new G;e.name=`prologue`,e.visible=!0,e.add(ru(980,50,150,4,13360103,9547450));let t=ru(260,4,18,47,8165800,14405550);t.material.size=.7,e.add(t);let n=new W(Rl(34,(e,t,n,r)=>{let i=(e-34)/34,a=(t-34)/34,o=(n-34)/34;if(Math.abs(a)>.88)return 11979209;let s=Math.sin(i*5.3+1)*Math.cos(o*4.4+2)+Math.sin(i*o*12);return s>.18?4283461:s>.4?7955266:r>.99?6264746:930635},{voxel:.34,anchor:`center`}),new K({vertexColors:!0,roughness:.92,metalness:0,emissive:465188,emissiveIntensity:.6}));n.position.set(13,-24,-76),n.rotation.z=.3,e.add(n);let r=eu(6725818,45,.2);r.position.set(12,-12,-72),e.add(r);let i=pd(18,42,!0);i.position.set(-.1,.05,-1.55),i.rotation.set(.2,.7,-.25),i.scale.setScalar(1.05),e.add(i),e.add(tu(2.4,.025));let a=new G;e.add(a);let o=new Oa(16759928,6.5,9,2);o.position.set(1.8,2.4,1),a.add(o);let s=new Oa(5936060,2.4,7,2);s.position.set(-2.4,-2,.8),a.add(s);let c=new ja(16765852,1.1);c.position.set(2,4,5),e.add(c),e.add(new Ma(1186593,.8));let l=[bd(31),bd(72),bd(105)];l[0].position.set(-13,7,-36),l[1].position.set(9,13,-48),l[2].position.set(16,-2,-44),l.forEach(t=>e.add(t));let u=new lr,d=[],f=Ul(515);for(let e=0;e<52;e++)d.push((f()-.5)*3,(f()-.5)*2,-1+f()*2);u.setAttribute(`position`,new tr(d,3));let p=new Ki(u,new Vi({color:16763017,size:.015,map:Ql(`rgba(255,226,172,1)`,`rgba(214,136,65,.3)`),transparent:!0,opacity:.6,depthWrite:!1,blending:2}));e.add(p);let m=(e,r)=>{i.rotation.y=.7+r*.075,i.rotation.x=.2+Math.sin(r*.21)*.08,i.rotation.z=-.25+Math.sin(r*.13)*.04,i.position.y=.05+Math.sin(r*.4)*.012,p.rotation.y=e*.02,o.intensity=6.5+Math.sin(e*2.3)*.1,n.rotation.y=.1+e*.001,l.forEach((e,t)=>{let n=(r-(6.8+t*1.4))/2.2;if(e.visible=n>0&&n<1,e.visible){e.position.x=-13+n*(25+t*8)+t*10-2,e.position.y=7-n*(9+t*2);let r=e.children[0].material;r.opacity=.6*Math.sin(Math.PI*n)}}),t.rotation.z=e*.002};return m(0,0),{group:e,update:m}}function Sd(){let e=new G;e.name=`hutong`,e.visible=!1;let t=new G;e.add(t),new K({map:ql(`#402a1b`,[2,2]),color:9067326,roughness:.85,metalness:.02}),new K({map:ql(`#24160f`,[1,3]),color:5059108,roughness:.88});let n=new K({map:Yl([3,10]),roughness:.95,metalness:0,color:9406331}),r=new K({map:Jl(`#5f5a51`,`#3d3933`,[4,3]),roughness:.95,metalness:0}),i=new K({color:3092524,roughness:.62,metalness:.55});Q(t,[7.2,.2,26],[0,-.12,-8],n,{receiveShadow:!0,castShadow:!1});let a=new W(new Zi(7.2,22),new U({color:3942944,transparent:!0,opacity:.12,blending:2,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.set(0,.002,-8),t.add(a),Q(t,[.55,3.15,23],[-3.35,1.55,-8.5],r),Q(t,[.55,3.15,23],[3.35,1.55,-8.5],r),Q(t,[.72,.16,23.2],[-3.35,3.1,-8.5],i),Q(t,[.72,.16,23.2],[3.35,3.1,-8.5],i);let o=[],s=Ul(881),c=[3489088,4015432,2962744,4344395,3225916];for(let e of[-1,1]){for(let t=-20;t<3;t+=.45)o.push({position:[e*3.55,3.29+s()*.03,t],size:[.5,.12,.46],color:c[Math.floor(s()*c.length)]});for(let t=0;t<4;t++){let n=e*(4.2+t*1.25),r=-19+t*5.2,i=7+s()*5,a=3.4+t*.23;for(let s=0;s<5;s++){let l=n+e*s*.42,u=a+s*.23;o.push({position:[l,u,r+i/2],size:[.44,.16,i-s*.18],color:c[(s+t)%c.length],rotation:[0,0,e*-.08]})}o.push({position:[n+e*1.02,a+1.04,r+i/2],size:[.16,.22,i-.8],color:2436142}),o.push({position:[n+e*1.2,a+1.16,r+i-.2],size:[.22,.45,.24],color:2370091})}for(let t=0;t<12;t++){let t=e*(8+s()*7),n=-25+s()*25,r=2.8+s()*3.2;o.push({position:[t,r/2,n],size:[2+s()*3,r,2+s()*4],color:2107952}),o.push({position:[t,r+.18,n],size:[2.8+s()*2.5,.22,2.8+s()*3],color:3226174})}}su(t,o,{roughness:.91,metalness:.03},!0,!0),su(t,[{position:[4.25,1.8,5.4],size:[.45,3.6,.45],color:4337958},{position:[4.1,3.2,5.4],size:[.33,2.1,.33],color:4995369,rotation:[.1,0,-.32]},{position:[4.55,3.45,5.35],size:[.26,1.7,.26],color:5258025,rotation:[0,0,.54]}],{roughness:.96},!0,!0);let l=[],u=[8017972,9594939,7032365,10975813,5718312,8937782],d=Ul(909);for(let e=0;e<150;e++){let e=1.2+d()*2.6,t=d()*Bl,n=3.3+d()*3.1-e*.2;l.push({position:[4.2+Math.cos(t)*e,n,5.3+Math.sin(t)*e*.72],size:[.32+d()*.38,.26+d()*.3,.32+d()*.32],color:u[Math.floor(d()*u.length)],rotation:[d()*.8,d()*Bl,d()*.6]})}su(t,l,{roughness:.95},!0,!0),Q(t,[2.1,3.4,.55],[-2.55,1.7,2],r),Q(t,[2.1,3.4,.55],[2.55,1.7,2],r),Q(t,[3.1,.65,.55],[0,3.05,2],r);let f=[];for(let e=0;e<10;e++)f.push({position:[0,3.68+e*.08,2],size:[5.7-e*.24,.13,1.25-e*.06],color:c[e%c.length],rotation:[0,0,0]});f.push({position:[0,4.43,2],size:[1.25,.25,1.3],color:2436142}),f.push({position:[-2.95,4.3,2],size:[.65,.52,.8],color:2633779}),f.push({position:[2.95,4.3,2],size:[.65,.52,.8],color:2633779}),su(t,f,{roughness:.9,metalness:.04},!0,!0);let p=new G;p.position.set(0,0,2),t.add(p);let m=new W(new Zi(2.2,2.72),new U({color:10967853,toneMapped:!1}));m.position.set(0,1.45,.4),m.rotation.y=Math.PI,p.add(m);let h=eu(16765596,5.2,.23);h.position.set(0,1.5,.65),p.add(h);let g=new K({map:ql(`#6a2f1c`,[1,1]),color:13658692,roughness:.62,metalness:.04,emissive:3872012,emissiveIntensity:.35});function _(e){let t=new G;t.position.set(e*1.18,0,.18),p.add(t);let n=Q(t,[1.2,2.76,.14],[e*-.6,1.42,0],g,{castShadow:!0}),r=new Cr(.055,.055,.035),i=new K({color:13804125,metalness:.65,roughness:.35});for(let t=0;t<5;t++)for(let a=0;a<3;a++){let o=new W(r,i);o.position.set(e*-.25-a*.32,2.15-t*.36,-.095),n.add(o)}let a=new W(new Qi(.12,.016,4,10),i);return a.rotation.y=Math.PI/2,a.position.set(e*-.6,1.28,-.11),n.add(a),t}let v=_(-1),y=_(1);Q(t,[3.5,.21,1.1],[0,.1,1.8],i,{castShadow:!0}),Q(t,[4.2,.16,.65],[0,.01,.65],i,{castShadow:!1}),Q(t,[4.2,.16,.65],[0,.12,.19],i,{castShadow:!1}),du(t,[0,3.33,1.69],[0,Math.PI,0],{width:1.5,height:.45,text:`栖石斋`,bg:`#261813`,color:`#d7b275`,size:64,emissive:!1});let b=[];for(let e of[-1.85,1.85]){let n=new G;n.position.set(e,2.55,1.56),t.add(n),Q(n,[.03,.6,.03],[0,.3,0],new K({color:3088664,roughness:.7}),{castShadow:!1}),Q(n,[.32,.42,.32],[0,0,0],new U({color:16758384,toneMapped:!1}),{castShadow:!1});let r=new K({color:2234899,roughness:.7});Q(n,[.42,.08,.42],[0,.25,0],r),Q(n,[.42,.08,.42],[0,-.25,0],r);let i=eu(16755040,1.25,.38);n.add(i);let a=new Oa(16753755,10.5,7,2);a.position.set(0,0,.2),n.add(a),b.push(a)}Q(t,[10,.15,8],[0,-.06,6.5],n,{castShadow:!1}),Q(t,[10,3.8,.3],[0,1.9,10.2],r),Q(t,[7,3.4,.2],[0,1.9,10.1],new K({color:4207916,roughness:.9})),cu(t,[3.2,1.9],[0,1.85,9.97],new U({color:15247725,toneMapped:!1}),[0,Math.PI,0]);let x=new Oa(16758639,24,12,2);x.position.set(0,2.2,6.6),t.add(x);let S=tu(5,.08);S.position.set(0,1.9,5.5),t.add(S);let C=[],w=Ul(921);for(let e=0;e<30;e++)C.push({position:[3.4+(w()-.5)*2.4,2.5+w()*2.7,7.6+(w()-.5)*1.8],size:[.34+w()*.3,.28+w()*.25,.3+w()*.3],color:u[Math.floor(w()*u.length)],rotation:[w(),w()*Bl,w()]});su(t,C,{roughness:.95},!1,!1);let T=new G;T.position.set(2.65,0,-7.4),T.rotation.y=-.12,t.add(T);let E=new Qi(.33,.026,4,12),D=new K({color:1514010,roughness:.72,metalness:.25});for(let e of[-.55,.55]){let t=new W(E,D);t.rotation.y=Math.PI/2,t.position.set(0,.35,e),T.add(t)}let ee=new K({color:2833468,roughness:.55,metalness:.55});Q(T,[.04,.04,1.1],[0,.58,0],ee,{castShadow:!1}),Q(T,[.04,.43,.04],[0,.4,.45],ee,{castShadow:!1}),Q(T,[.04,.55,.04],[0,.58,-.5],ee,{castShadow:!1}),Q(T,[.38,.04,.04],[0,.75,.42],ee,{castShadow:!1});let O=new Oi({color:1251868,transparent:!0,opacity:.9});for(let e=0;e<3;e++){let n=[];for(let t=-3;t<=3.2;t+=.25)n.push(new B(t,5.2+e*.35+Math.sin(t*1.4+e)*.12,-4.5-e*3.7));let r=new Ii(new lr().setFromPoints(n),O);t.add(r)}let k=new K({color:4995367,roughness:.94});Q(t,[.6,.45,.45],[-2.7,.22,-10.6],k),Q(t,[.55,.4,.42],[-2.6,.6,-10.5],k,{rotation:[0,.06,.02]});let A=ru(450,80,130,84);A.visible=!1,t.add(A);let te=new lr,j=[],ne=Ul(744);for(let e=0;e<110;e++)j.push((ne()-.5)*6.5,.2+ne()*3.6,-15+ne()*17);te.setAttribute(`position`,new tr(j,3));let M=new Ki(te,new Vi({color:15251331,size:.018,transparent:!0,opacity:.25,depthWrite:!1,blending:2}));t.add(M);let N=td();N.setUniform(),N.figure.root.position.set(-.2,0,-5.5),t.add(N.figure.root);let re=nd();re.figure.root.position.set(.25,0,5.3),re.figure.root.rotation.y=Math.PI,t.add(re.figure.root),lu(re.figure.root,!1,!0);let ie=new G,ae=new W(zl({palette:{"#":2763303,h:11046234,d:1381910},layers:[[`########`,`########`,`########`,`########`,`########`,`########`,`#h####h#`,`########`],[`########`,`########`,`########`,`########`,`########`,`########`,`#h####h#`,`########`],[`########`,`########`,`########`,`########`,`########`,`########`,`#h####h#`,`########`]],axis:`x`,voxel:.3,anchor:`center`}),Ll({roughness:.65,metalness:.2}));ae.position.set(0,-1.2,0),ie.add(ae),ie.visible=!1,N.figure.anchors.handL.add(ie);let oe=new _a(11582663,3878177,1.02);t.add(oe);let P=new ja(16763018,3.25);P.position.set(-8.5,10.5,-5.5),P.target.position.set(0,.3,.5),P.castShadow=!0,P.shadow.mapSize.set(1536,1536),P.shadow.camera.left=-9,P.shadow.camera.right=9,P.shadow.camera.top=10,P.shadow.camera.bottom=-2,P.shadow.camera.near=.5,P.shadow.camera.far=35,P.shadow.bias=-.0012,t.add(P,P.target);let se=new Oa(8224368,3.8,16,2);se.position.set(0,3.8,-8),t.add(se);let F=new ja(10401995,1.15);F.position.set(6,4.5,-9),F.target.position.set(0,1.2,1),t.add(F,F.target);let ce=new Oa(16762243,19,8,2);ce.position.set(0,1.65,-.3),t.add(ce);let le=new yi(new Cr(.075,.018,.11),new K({color:11828543,roughness:.95,vertexColors:!0}),52);le.instanceMatrix.setUsage(ze),le.castShadow=!0,le.frustumCulled=!1,t.add(le);let ue=Ul(592),de=[],fe=new H;for(let e=0;e<52;e++)de.push({origin:new B(-5.5+ue()*11,3.4+ue()*2.2,-13+ue()*20),phase:ue()*Bl,speed:.32+ue()*.45,drift:.5+ue()*1.2,spin:.5+ue()*1.2}),fe.setHex(u[Math.floor(ue()*u.length)]),le.setColorAt(e,fe);le.instanceColor&&(le.instanceColor.needsUpdate=!0);let pe=new Dn,me=0,I=!1,he=0,ge=new B(0,1.4,2),_e=e=>{e===`dusk`?(oe.intensity=1.02,oe.color.setHex(11582663),P.intensity=3.25,P.color.setHex(16763018),se.intensity=3.8,b.forEach(e=>e.intensity=9.5),x.intensity=22,I=!1,me=0):(oe.intensity=.34,oe.color.setHex(7309732),P.intensity=.34,P.color.setHex(7903159),se.intensity=.55,b.forEach(e=>e.intensity=27),x.intensity=32,I=!0,me=.8),A.visible=I,A.material.opacity=me};_e(`dusk`);let L=e=>{he=Math.max(0,Math.min(1,e));let t=he*he*(3-2*he);v.rotation.y=-t*1.24,y.rotation.y=t*1.24},ve=(e,t)=>{for(let e=0;e<de.length;e++){let n=de[e],r=(t*n.speed+n.phase)%1.8/1.8,i=n.origin.x+Math.sin(t*.5+n.phase)*n.drift*.5+r*.6,a=n.origin.y-r*n.origin.y,o=n.origin.z+Math.cos(t*.37+n.phase)*n.drift*.3;pe.position.set(i,Math.max(.04,a),o),pe.rotation.set(t*n.spin+n.phase,t*.7+n.phase,Math.sin(t+n.phase)),pe.scale.setScalar(.65+.45*Math.sin(n.phase*9)),pe.updateMatrix(),le.setMatrixAt(e,pe.matrix)}le.instanceMatrix.needsUpdate=!0,M.position.y=Math.sin(e*.12)*.03,M.position.x=Math.sin(e*.07)*.04};return ve(0,0),{group:e,zhang:N,collector:re,update:ve,setDoorOpen:L,setMode:_e,setCase(e){ie.visible=e},doorWorldPosition:ge}}function Cd(e=`#3b281b`){return new K({map:ql(e,[3,4]),color:10843984,roughness:.8,metalness:.02})}function wd(){let e=Kl(256,256,e=>{e.fillStyle=`#3b1f1a`,e.fillRect(0,0,256,256),e.strokeStyle=`#7d4a35`,e.lineWidth=2;for(let t=16;t<256;t+=48)e.strokeRect(t,t,256-t*2,256-t*2);e.strokeStyle=`#9c6242`,e.lineWidth=1;for(let t=0;t<5;t++){let n=32+t*49;e.beginPath(),e.moveTo(n,102),e.lineTo(n+22,128),e.lineTo(n,154),e.lineTo(n-22,128),e.closePath(),e.stroke()}let t=Ul(611);for(let n=0;n<700;n++)e.fillStyle=`rgba(20,10,8,${t()*.06})`,e.fillRect(t()*256,t()*256,2,2)},{repeat:[1,1]}),t=new W(new Cr(4.4,.012,4.6),new K({map:e,roughness:1}));return t.position.set(.1,.015,.25),t.receiveShadow=!0,t}function Td(e,t,n,r,i){let a=new G;a.position.set(...t),a.rotation.y=n,e.add(a);let o=3.1,s=.52,c=Cd(`#2f2017`),l=new K({color:2168079,roughness:.8});Q(a,[r,.1,s],[0,o,0],c,{castShadow:!0}),Q(a,[r,.1,s],[0,.1,0],c,{castShadow:!1}),Q(a,[.09,o,s],[-r/2,o/2,0],c),Q(a,[.09,o,s],[r/2,o/2,0],c),Q(a,[r,o,.035],[0,o/2,-.52/2],l);let u=[.74,1.53,2.32,3.06];for(let e of u)Q(a,[r-.12,.065,.44],[0,e,.015],c,{castShadow:!0}),Q(a,[r-.35,.018,.035],[0,e-.06,.22],new U({color:16761463,toneMapped:!1}),{castShadow:!1,receiveShadow:!1});let d=new $i({color:10470597,metalness:0,roughness:.12,transparent:!0,opacity:.07,depthWrite:!1,side:2});cu(a,[r-.16,2.92],[0,o/2,.28],d),Q(a,[.055,o,.055],[0,o/2,.28800000000000003],l,{castShadow:!1}),Q(a,[r-.12,.055,.055],[0,1.44,.28800000000000003],l,{castShadow:!1}),Q(a,[r-.12,.055,.055],[0,2.37,.28800000000000003],l,{castShadow:!1}),Q(a,[.04,.22,.04],[r*.2,1.35,.335],new K({color:11965013,metalness:.7,roughness:.3}),{castShadow:!1});let f=Ul(410+Math.floor(t[0]*10+t[2]*17));for(let e=0;e<3;e++){let o=2+e%2;for(let s=0;s<o;s++){let c=-r*.31+s/Math.max(1,o-1)*r*.62+(f()-.5)*.12,d=.01+f()*.04,p=u[e]+.08,m=new $t,h=new Ze().setFromEuler(new un(f()*.5,f()*Bl,f()*.4)),g=1.15+f()*.9;m.compose(new B(c,p+.16,d),h,new B(g,g,g));let _=new $t().compose(new B(...t),new Ze().setFromEuler(new un(0,n,0)),new B(1,1,1));i.push(_.multiply(m)),Q(a,[.18,.035,.18],[c,p,d],l,{castShadow:!1}),Q(a,[.24,.04,.1],[c,p-.03,d+.12],new K({color:13616301,roughness:.9}),{castShadow:!1})}}}function Ed(){let e=new G;e.position.set(1.75,0,4.62),e.rotation.y=0;let t=new K({color:3421744,metalness:.58,roughness:.6}),n=new K({color:1448213,metalness:.45,roughness:.72});Q(e,[1.04,1.2,.72],[0,.94,0],t),Q(e,[.92,1.04,.63],[0,.94,.02],n),Q(e,[.84,.95,.58],[0,.95,0],new K({color:1709843,roughness:.75,emissive:2824975,emissiveIntensity:.7})),Q(e,[.84,.04,.55],[0,.58,.04],new K({color:11707531,roughness:.9})),Q(e,[.22,.12,.22],[0,.65,.08],new K({color:1513751,roughness:.65}),{castShadow:!1});let r=pd(2,48,!0);r.scale.setScalar(.72),r.position.set(0,.78,.12),e.add(r),cu(e,[.56,.32],[0,.83,.34],new $i({color:13227213,roughness:.08,metalness:0,transparent:!0,opacity:.14,depthWrite:!1})),Q(e,[.32,.018,.07],[0,1.03,.24],new U({color:16766618,toneMapped:!1}),{castShadow:!1});let i=new Oa(16761208,5.4,2,2);i.position.set(0,1.12,.17),e.add(i);let a=new G;a.position.set(-.53,0,.38),e.add(a);let o=new G;o.position.set(.52,.98,0),a.add(o),Q(o,[1.02,1.14,.08],[0,0,0],t);let s=new W(new Qi(.1,.018,4,12),new K({color:12032089,metalness:.8,roughness:.3}));return s.position.set(.12,.14,.06),s.rotation.y=0,o.add(s),Q(o,[.035,.28,.04],[-.18,.05,.06],new K({color:12032089,metalness:.8,roughness:.3}),{castShadow:!1}),e.add(a),Q(e,[1.12,.12,.8],[0,.3,0],t),e.traverse(e=>{e instanceof W&&(e.castShadow=!0,e.receiveShadow=!0)}),{group:e,door:a,light:i,mars:r}}function Dd(){let e=new G,t=new K({color:10254915,metalness:.72,roughness:.36}),n=new K({color:1776409,roughness:.55,metalness:.2});return Q(e,[.42,.055,.3],[0,.03,0],n),Q(e,[.05,.36,.05],[-.06,.2,-.02],t),Q(e,[.25,.05,.05],[-.04,.38,-.02],t),Q(e,[.08,.18,.08],[.06,.31,-.02],t),Q(e,[.16,.09,.16],[.06,.46,-.02],n),Q(e,[.1,.05,.1],[.06,.52,-.02],t),Q(e,[.24,.02,.2],[.06,.09,.06],t,{castShadow:!1}),Q(e,[.04,.06,.07],[.06,.2,.17],t,{castShadow:!1}),e}function Od(){let e=new G;e.position.set(.15,0,1.2);let t=Cd(`#38261a`),n=new K({color:2365457,roughness:.86});Q(e,[3.2,.09,1.25],[0,.79,0],t),Q(e,[3,.03,1.05],[0,.85,0],new K({color:3753533,roughness:.95}));for(let t of[-1.43,1.43])for(let r of[-.48,.48])Q(e,[.09,.78,.09],[t,.39,r],n);for(let t=0;t<3;t++)Q(e,[.92,.15,.06],[-.95+t*.95,.64,-.56],n,{castShadow:!1});let r=new K({color:11636827,metalness:.7,roughness:.34});for(let t=0;t<3;t++)Q(e,[.13,.025,.025],[-.95+t*.95,.64,-.62],r,{castShadow:!1});let i=new G;i.position.set(-1.35,.88,-.18),e.add(i),Q(i,[.36,.05,.26],[0,0,0],r),Q(i,[.035,.45,.035],[0,.22,0],r),Q(i,[.56,.09,.3],[0,.5,0],new K({color:3497293,roughness:.32,metalness:.2,emissive:926233,emissiveIntensity:.6})),Q(i,[.48,.014,.24],[0,.447,0],new U({color:14066782,toneMapped:!1}),{castShadow:!1});let a=eu(16765846,1.1,.2);a.position.set(0,.4,.05),i.add(a);let o=new Oa(16761975,4.2,3.6,2);o.position.set(0,.42,.1),i.add(o);let s=new Oa(16766884,2.2,1.55,2);s.position.set(.15,1.18,1.33),e.add(s);let c=new G;c.position.set(-1.25,.9,-.22),e.add(c);let l=new K({color:14603970,roughness:.35});Q(c,[.2,.16,.2],[0,.08,0],l),Q(c,[.16,.012,.16],[0,.15,0],new U({color:13673578,toneMapped:!1})),Q(c,[.05,.07,.035],[.13,.09,0],l,{castShadow:!1});let u=tu(.75,.06);u.position.set(0,.48,0),c.add(u);let d=new G;d.position.set(.08,.88,.1),e.add(d),Q(d,[1.5,.03,.73],[0,.015,0],new K({color:1513493,roughness:.99}));for(let e=0;e<3;e++){let t=pd(4+e%2,300+e,e!==1);t.scale.setScalar(2.25-e*.16),t.position.set(-.42+e*.42,.14+(e===1?.02:0),.02),t.rotation.set(.2+e*.1,e*1.4,.1),d.add(t)}let f=new G;f.position.set(.02,.9,.18),e.add(f),Q(f,[.6,.19,.34],[0,.1,0],new K({color:7167304,roughness:1})),Q(f,[.64,.04,.15],[0,.2,0],new K({color:9075039,roughness:1})),Q(f,[.13,.012,.37],[0,.21,0],new K({color:10917235,roughness:1}),{castShadow:!1}),f.visible=!1,d.visible=!1;let p=Dd();return p.position.set(-.55,.86,.07),p.scale.setScalar(.8),e.add(p),Q(e,[.24,.012,.06],[.43,.87,.27],r,{rotation:[0,.25,0],castShadow:!1}),Q(e,[.2,.012,.05],[.72,.87,.33],new K({color:11448487,metalness:.5,roughness:.4}),{rotation:[0,-.18,0],castShadow:!1}),{group:e,lampLight:o,cup:c,chosenTray:d,parcel:f}}function kd(){let e=new G;e.name=`collector-room`,e.visible=!1;let t=Cd(`#3b281b`),n=new K({map:ql(`#21140e`,[1,2]),color:5059621,roughness:.86}),r=new K({map:Xl([3,2]),color:6773580,roughness:.99});Q(e,[10.4,.16,13.5],[0,-.09,.2],new K({map:ql(`#2f1f16`,[5,8]),color:9396286,roughness:.82}),{castShadow:!1,receiveShadow:!0}),Q(e,[10.4,.1,13.5],[0,4.15,.2],n,{castShadow:!1}),Q(e,[10.4,2.5,.24],[0,2.25,6.5],r),Q(e,[10.4,1.2,.24],[0,.6,6.5],t),Q(e,[.24,4.2,13.5],[-5.1,2.1,.2],r),Q(e,[.24,4.2,13.5],[5.1,2.1,.2],r),Q(e,[10.2,1.15,.15],[0,.58,-6.32],n,{castShadow:!1}),Q(e,[.15,4.2,13],[-5,2.1,-.4],n),Q(e,[.15,4.2,13],[5,2.1,-.4],n),Q(e,[4.02,4.2,.2],[-3.09,2.1,-6.3],r),Q(e,[4.02,4.2,.2],[3.09,2.1,-6.3],r),Q(e,[2.16,1.72,.2],[0,3.34,-6.3],r),Q(e,[2.15,.08,.24],[0,2.45,-6.22],n,{castShadow:!1}),Q(e,[.1,2.5,.24],[-1.1,1.25,-6.22],n,{castShadow:!1}),Q(e,[.1,2.5,.24],[1.1,1.25,-6.22],n,{castShadow:!1}),Q(e,[2.02,2.36,.12],[0,1.23,-6.39],new K({color:4400924,roughness:.74})),Q(e,[.03,2.3,.04],[0,1.23,-6.32],new U({color:10270650,toneMapped:!1}),{castShadow:!1});let i=new Oa(9285320,1.6,5,2);i.position.set(0,1.6,-5.8),e.add(i);let a=[];for(let e=-5.5;e<6;e+=1.55)a.push({position:[0,3.98,e],size:[10.2,.25,.22],color:2759699});for(let e of[-4.4,-2.1,0,2.1,4.4])a.push({position:[e,4.07,.25],size:[.17,.13,12.8],color:2365199});su(e,a,{roughness:.9},!1,!1),e.add(wd());let o=[];for(let t=0;t<3;t++)Td(e,[-4.8,.02,-2.5+t*3.18],Math.PI/2,2.9,o),Td(e,[4.8,.02,-2.5+t*3.18],-Math.PI/2,2.9,o);for(let t=0;t<3;t++)Td(e,[-3.3+t*3.3,.02,6.14],Math.PI,3.02,o);let s=[];for(let e=0;e<5;e++){let t=pd(2+e%3,700+e,e===2);s.push(t.geometry),t.geometry=t.geometry}let c=Ll({roughness:.7,metalness:.25}),l=[[],[],[],[],[]];o.forEach((e,t)=>{l[t%l.length].push(e)});for(let t=0;t<s.length;t++){let n=new yi(s[t],c,l[t].length);l[t].forEach((e,t)=>n.setMatrixAt(t,e)),n.instanceMatrix.needsUpdate=!0,n.receiveShadow=!0,e.add(n)}let u=Od();e.add(u.group),Q(e,[.65,.08,.52],[.05,.65,2.45],t);for(let t of[-.24,.34])for(let r of[2.25,2.65])Q(e,[.07,.64,.07],[t,.32,r],n);Q(e,[.72,.16,.58],[.05,.6,2.45],new K({color:5913383,roughness:.95}));let d=Ed();d.group.rotation.y=Math.PI,e.add(d.group),Q(e,[1.35,.12,.9],[1.75,.34,4.62],n);let f=new G;f.position.set(-3.55,0,3.95),e.add(f),Q(f,[.78,.82,.56],[0,.41,0],new K({color:2365458,roughness:.8})),Q(f,[.86,.07,.64],[0,.86,0],new K({color:10124880,metalness:.6,roughness:.35})),Q(f,[.68,.035,.5],[0,.9,0],new K({color:1316113,roughness:.95}));let p=pd(7,940,!0);p.scale.setScalar(1.65),p.position.set(0,1.18,0),p.rotation.set(.2,.65,.1),f.add(p);let m=new W(new Cr(.62,.58,.46),new $i({color:12112075,transparent:!0,opacity:.1,roughness:.05,metalness:0,depthWrite:!1}));m.position.set(0,1.2,0),f.add(m),Q(f,[.56,.02,.05],[0,1.42,.2],new U({color:16765338,toneMapped:!1}),{castShadow:!1});let h=new Oa(16762750,3.2,2.2,2);h.position.set(0,1.38,.18),f.add(h);let g=new W(new Qi(.11,.012,4,10),new K({color:11702101,metalness:.75,roughness:.3}));g.position.set(.38,1.23,.08),g.rotation.y=Math.PI/2,f.add(g),du(f,[0,1.4,.235],[0,0,0],{width:.6,height:.16,text:`火星无球粒陨石 / MARS`,bg:`#191713`,color:`#d5bd92`,size:28,fontFamily:`"Noto Sans CJK SC", sans-serif`,emissive:!0}),du(e,[-1.85,2.55,6.35],[0,Math.PI,0],{width:1.55,height:.9,text:`石不能言最可人`,lines:[`石不能言`,`最可人`],bg:`#b7a98f`,color:`#2b2017`,size:56,fontFamily:`"Noto Serif CJK SC", serif`,emissive:!1}),cu(e,[1.65,1.24],[-4.97,2.7,1.2],new K({map:Kl(512,384,e=>{e.fillStyle=`#10171a`,e.fillRect(0,0,512,384),e.strokeStyle=`rgba(153,177,170,.4)`,e.lineWidth=1;for(let t=0;t<8;t++)e.beginPath(),e.ellipse(256,190,50+t*28,24+t*16,.2,0,Bl),e.stroke();let t=Ul(806);e.fillStyle=`rgba(218,194,150,.9)`;for(let n=0;n<120;n++){let n=t()*8;e.fillRect(t()*512,t()*330+22,n>5?2:1,n>5?2:1)}e.fillStyle=`rgba(219,205,178,.78)`,e.font=`500 20px "Noto Serif CJK SC", serif`,e.fillText(`同步轨道陨石分布 / 2087`,28,350),e.strokeStyle=`rgba(205,180,139,.5)`,e.strokeRect(14,14,484,356)}),roughness:.7,metalness:.1}),[0,Math.PI/2,0]);let _=new G;_.position.set(2.8,2.9,6.32),_.rotation.y=Math.PI,e.add(_),Q(_,[.5,1.2,.12],[0,0,0],n);let v=new W(new Zi(.42,.42),new U({map:Kl(128,128,e=>{e.fillStyle=`#d6c8ab`,e.fillRect(0,0,128,128),e.strokeStyle=`#3c2d20`,e.lineWidth=3,e.strokeRect(7,7,114,114);for(let t=0;t<12;t++){let n=t/12*Bl;e.fillStyle=`#3b2a1e`,e.fillRect(63+Math.sin(n)*48,63-Math.cos(n)*48,2,2)}e.beginPath(),e.moveTo(64,64),e.lineTo(64,28),e.stroke(),e.beginPath(),e.moveTo(64,64),e.lineTo(90,74),e.stroke()})}));v.position.set(0,.2,.07),_.add(v);let y=new G;y.position.set(0,-.18,.07),_.add(y),Q(y,[.02,.52,.02],[0,-.27,0],new K({color:11637597,metalness:.7,roughness:.35}),{castShadow:!1}),Q(y,[.12,.12,.025],[0,-.53,0],new K({color:11373653,metalness:.65,roughness:.4}),{castShadow:!1});let b=new lr,x=[],S=Ul(992);for(let e=0;e<180;e++)x.push((S()-.5)*9.2,.25+S()*3.3,-5.4+S()*11.2);b.setAttribute(`position`,new tr(x,3));let C=new Ki(b,new Vi({color:14992792,size:.013,transparent:!0,opacity:.32,depthWrite:!1,blending:2}));e.add(C);let w=new _a(10194810,2759956,.58);e.add(w);let T=new Ca(16763532,68,8.5,.67,.7,2);T.position.set(.15,4,.9),T.target.position.set(.1,.8,1.3),T.castShadow=!0,T.shadow.mapSize.set(1536,1536),T.shadow.bias=-.0015,T.shadow.camera.near=.4,T.shadow.camera.far=9,e.add(T,T.target);let E=new ja(7178657,.15);E.position.set(-4,3,-5),e.add(E);for(let[t,n,r]of[[-3.8,2.25,-2.5],[-3.8,2.25,3.7],[3.8,2.25,-2.5],[3.8,2.25,3.7],[-3,2.25,5.2],[3,2.25,5.2]]){let i=new Oa(16759151,6,4.6,2);i.position.set(t,n,r),e.add(i)}let D=new Oa(16761206,3.6,3,2);D.position.set(1.75,1.4,4.8),e.add(D);let ee=new Oa(16765602,9.5,6.5,2);ee.position.set(2.5,2,-1.25),e.add(ee);let O=new ja(14205082,.7);O.position.set(7,4,2),O.target.position.set(0,1.2,1.2),e.add(O,O.target);let k=td();k.setUniform(),k.figure.root.position.set(-.7,0,-2.8),e.add(k.figure.root);let A=nd();A.figure.root.position.set(.05,0,2.7),A.figure.root.rotation.y=Math.PI,e.add(A.figure.root);let te=new G;Q(te,[.36,.024,.7],[0,0,0],new K({color:1776926,roughness:.3,metalness:.45}),{castShadow:!1}),Q(te,[.3,.006,.56],[0,.017,0],new U({color:8577748,toneMapped:!1}),{castShadow:!1}),te.position.set(0,.91,-.15),u.group.add(te),te.visible=!1;let j=0,ne=e=>{j=Math.max(0,Math.min(1,e));let t=j*j*(3-2*j);d.door.rotation.y=-t*1.72};ne(0);let M=e=>{u.parcel.visible=e,u.chosenTray.visible=!e},N=e=>{u.chosenTray.visible=e},re=e=>{u.parcel.visible=e},ie=e=>{te.visible=e},ae=(e,t)=>{let n=1+Math.sin(e*2.3)*.006+Math.sin(e*7.1+.4)*.0025;T.intensity=82*n,u.lampLight.intensity=4.2*(.98+Math.sin(e*1.7)*.03),y.rotation.x=Math.sin(e*2.3)*.22,C.position.y=Math.sin(e*.08)*.06,C.position.z=Math.cos(e*.05)*.05;let r=u.cup.children[u.cup.children.length-1];r&&(r.position.y=.45+Math.sin(e*.7)*.06,r.material.opacity=.035+Math.sin(e*.5)*.015),d.light.intensity=5.4*(.9+Math.sin(e*.9)*.1)*(.3+j*.7)};return ae(0,0),{group:e,zhang:k,collector:A,chosenMeteorites:[],safeGroup:d.group,setSafeOpen:ne,setParcel:M,setChosenVisible:N,setParcelVisible:re,setPhone:ie,update:ae,deskTarget:new B(.05,1.2,2.25),safeTarget:new B(1.75,1.1,4)}}function Ad(){let e=new G;e.position.set(-1,0,.35);let t=new K({color:2372150,metalness:.36,roughness:.58}),n=new K({color:1054747,metalness:.42,roughness:.66}),r=new K({color:9202493,metalness:.6,roughness:.38});Q(e,[4.2,.35,2.4],[0,.22,0],n,{castShadow:!0}),Q(e,[4.3,2.15,.16],[0,1.36,-1.16],t),Q(e,[.3,2.3,2.2],[-2.05,1.32,0],t),Q(e,[.3,2.3,2.2],[2.05,1.32,0],t),Q(e,[4.2,.35,2.2],[0,2.45,0],t),Q(e,[4.1,.62,.15],[0,.64,1.11],t),Q(e,[4.1,.43,.15],[0,2.22,1.11],t),Q(e,[.38,1.95,.15],[-1.86,1.42,1.11],t),Q(e,[.38,1.95,.15],[1.86,1.42,1.11],t),Q(e,[3.4,.055,.18],[0,1.95,1.09],r,{castShadow:!1}),Q(e,[3.4,.055,.18],[0,.88,1.09],r,{castShadow:!1});let i=cu(e,[3.08,1.05],[0,1.42,1.12],new $i({color:10405315,transparent:!0,opacity:.055,roughness:.1,metalness:0,depthWrite:!1,side:2}));i.name=`machine-safety-glass`,Q(e,[3.8,.13,.28],[0,.78,.52],n),Q(e,[3.8,.08,.06],[0,.86,.84],r,{castShadow:!1}),Q(e,[3.8,.08,.06],[0,.86,.2],r,{castShadow:!1});let a=new G;a.position.set(-1.36,1.05,.52),e.add(a),Q(a,[.35,.48,.48],[0,0,0],new K({color:6844784,metalness:.7,roughness:.35})),Q(a,[.12,.32,.32],[.2,0,0],n);for(let e=0;e<4;e++)Q(a,[.08,.12,.08],[.24,Math.sin(e*Bl/4)*.2,Math.cos(e*Bl/4)*.2],r,{rotation:[e*Bl/4,0,0]});let o=new G;o.position.set(-.35,1.05,.52),e.add(o),Q(o,[1.82,.18,.18],[0,0,0],new K({color:7829100,metalness:.58,roughness:.33}));for(let e=0;e<9;e++)Q(o,[.03,.19,.19],[-.8+e*.2,0,0],new K({color:e%2?4868675:9999494,metalness:.68,roughness:.35}),{castShadow:!1});Q(e,[.3,.5,.3],[.94,1.02,.52],n),Q(e,[.12,.12,.12],[.81,1.05,.52],r,{castShadow:!1});let s=new G;s.position.set(.2,1.31,.85),e.add(s),Q(s,[.3,.25,.22],[0,0,0],n),Q(s,[.1,.1,.34],[0,.14,-.12],new K({color:12690791,metalness:.75,roughness:.22})),Q(s,[.08,.32,.08],[0,.3,.08],r),Q(s,[.18,.06,.18],[0,.16,-.22],new K({color:7634038,metalness:.7,roughness:.3})),Q(s,[.04,.045,.32],[-.19,.14,-.1],new K({color:5467245,metalness:.5,roughness:.45}),{rotation:[.5,0,0]});let c=new W(new Cr(.018,.018,.4),new U({color:9487045,transparent:!0,opacity:.22,blending:2,depthWrite:!1}));c.position.set(-.19,.05,-.26),c.rotation.x=.35,s.add(c),Q(e,[.82,1.35,.4],[2.35,.92,.74],t);let l=cu(e,[.55,.42],[2.06,1.36,.95],new U({map:Kl(512,384,e=>{e.fillStyle=`#061211`,e.fillRect(0,0,512,384),e.strokeStyle=`rgba(122,197,180,.24)`,e.lineWidth=2,e.strokeRect(18,18,476,348),e.fillStyle=`#9dd3bd`,e.font=`500 25px "Courier New", monospace`,e.fillText(`FE-NI / CTRL-07`,42,64),e.font=`600 45px "Courier New", monospace`,e.fillStyle=`#d6efc7`,e.fillText(`X 36.000`,42,132),e.fillStyle=`#81b9a9`,e.font=`500 24px "Courier New", monospace`,e.fillText(`FEED  0.08 mm/rev`,42,188),e.fillText(`SPINDLE  1480 rpm`,42,226),e.fillText(`COOLANT  ON`,42,264),e.fillStyle=`#d1a860`,e.fillRect(42,302,250,3),e.fillStyle=`#7fa89d`,e.fillText(`METEORITE / 36`,42,342),e.strokeStyle=`rgba(129,198,178,.28)`,e.beginPath(),e.moveTo(320,110),e.lineTo(448,110),e.lineTo(448,292),e.lineTo(320,292),e.stroke(),e.beginPath(),e.moveTo(340,272),e.lineTo(380,208),e.lineTo(406,228),e.lineTo(438,164),e.stroke()}),toneMapped:!1}));l.rotation.y=-.45;for(let t=0;t<6;t++)Q(e,[.045,.035,.045],[2.15+t%3*.08,1.03-Math.floor(t/3)*.07,.98],new U({color:t===1?7587510:t===4?13867605:2701880,toneMapped:!1}),{castShadow:!1});let u=new Oa(12181457,8,3.6,2);u.position.set(-.1,1.8,.8),e.add(u);let d=eu(12574417,1.6,.16);d.position.set(-.25,1.5,.95),e.add(d);let f=new Oa(16741432,.08,2.4,2);f.position.set(1.86,2.13,.65),e.add(f),Q(e,[.15,.1,.15],[1.86,2.13,1.03],new U({color:6170136,toneMapped:!1}),{castShadow:!1});let p=[];for(let e=0;e<22;e++)p.push({position:[-2.25+e*.22,.02,1.46],size:[.1,.015,.3],color:e%2?13079615:1579028,rotation:[0,.6,0]});return su(e,p,{roughness:.7},!1,!1),{group:e,glass:i,rod:o,chuck:a,tool:s,screen:l,workLight:u,alarm:f}}function jd(){let e=new G;e.position.set(3.25,0,1.6);let t=new K({color:3753029,metalness:.55,roughness:.44});Q(e,[2.7,.1,1.45],[0,.86,0],t),Q(e,[2.5,.08,1.25],[0,.93,0],new K({color:2831155,metalness:.35,roughness:.7}));for(let n of[-1.1,1.1])for(let r of[-.55,.55])Q(e,[.1,.84,.1],[n,.42,r],t);Q(e,[.46,.02,.1],[-.8,.985,.15],new K({color:10133658,metalness:.75,roughness:.28}),{rotation:[0,.15,0],castShadow:!1}),Q(e,[.16,.02,.3],[-.65,.995,.19],new K({color:13158073,metalness:.55,roughness:.36}),{rotation:[0,.15,0],castShadow:!1}),Q(e,[.72,.025,.44],[.25,.99,0],new K({color:1842973,roughness:.9}),{castShadow:!1}),Q(e,[.5,.035,.12],[-.72,1,-.32],new K({color:6186590,roughness:.9}),{rotation:[0,-.18,0],castShadow:!1});let n=new G;n.position.set(-.95,.93,-.35),e.add(n),Q(n,[.2,.02,.16],[0,0,0],new K({color:1909796,metalness:.5}),{castShadow:!1}),Q(n,[.025,.5,.025],[.02,.25,0],new K({color:1909796,metalness:.5}),{rotation:[0,0,-.16],castShadow:!1}),Q(n,[.34,.1,.24],[.08,.5,-.02],new K({color:3228220,metalness:.4,roughness:.45}),{rotation:[0,0,-.16],castShadow:!1}),Q(n,[.26,.016,.18],[.11,.445,-.02],new U({color:16767131,toneMapped:!1}),{castShadow:!1});let r=new Oa(16764813,4.8,2.3,2);r.position.set(0,.4,0),n.add(r);let i=new G;i.position.set(.78,.99,-.15),i.visible=!1,e.add(i),Q(i,[.08,.24,.08],[0,.12,0],new $i({color:11518647,transparent:!0,opacity:.35,roughness:.08,depthWrite:!1}),{castShadow:!1}),Q(i,[.06,.1,.06],[0,.06,0],new K({color:7038296,roughness:.95}),{castShadow:!1}),Q(i,[.1,.04,.1],[0,.25,0],new K({color:2961196,metalness:.55,roughness:.42}),{castShadow:!1});let a=new G;a.position.set(1,1,.35),e.add(a),Q(a,[.78,.18,.5],[0,.09,0],new K({color:2237217,metalness:.3,roughness:.62}),{castShadow:!1});let o=new G;o.position.set(0,.18,-.24),a.add(o),Q(o,[.78,.08,.5],[0,.04,.24],new K({color:2631974,metalness:.4,roughness:.5}),{castShadow:!1}),Q(o,[.3,.03,.05],[0,.1,.25],new K({color:9075285,metalness:.65,roughness:.32}),{castShadow:!1});let s=new G;s.visible=!1,a.add(s);for(let e=0;e<3;e++){let t=pd(3,410+e,e===1);t.position.set(-.22+e*.22,.22,.06),t.scale.setScalar(.7),s.add(t)}let c=new yi(new Cr(.035,.22,.035),new K({color:9077105,metalness:.72,roughness:.24}),36),l=new $t,u=new Ze;for(let e=0;e<36;e++){let t=Math.floor(e/6),n=e%6;l.compose(new B(.17+(n-2.5)*.065,1.055,-.16+t*.075),u.setFromEuler(new un(.012*Math.sin(e*2.2),.08*Math.sin(e*3.1),.015*Math.cos(e))),new B(1,1,1)),c.setMatrixAt(e,l)}return c.instanceMatrix.needsUpdate=!0,c.castShadow=!1,c.visible=!1,e.add(c),{group:e,pieces:c,vial:i,caseOpen:s,caseLid:o}}function Md(){let e=new G;e.name=`workshop`,e.visible=!1;let t=new K({map:Xl([5,5]),color:6317922,roughness:.92});Q(e,[16,.2,13],[0,-.11,.5],t,{castShadow:!1,receiveShadow:!0}),Q(e,[16,.2,13],[0,6.5,.5],new K({color:1581349,roughness:.96}),{castShadow:!1}),Q(e,[16,6.5,.3],[0,3.25,-6],t),Q(e,[.3,6.5,13],[-8,3.25,.5],t),Q(e,[.3,6.5,13],[8,3.25,.5],t);let n=new $i({color:5139061,transparent:!0,opacity:.2,roughness:.22,metalness:.2,depthWrite:!1,side:2});for(let t of[-5.4,-1.8,1.8,5.4])Q(e,[3.3,2.2,.1],[t,4.65,-5.82],new K({color:725268,roughness:.85}),{castShadow:!1}),cu(e,[3,1.95],[t,4.63,-5.75],n),Q(e,[.08,2.1,.12],[t,4.63,-5.68],new K({color:2765879,metalness:.55,roughness:.5}),{castShadow:!1}),Q(e,[3.15,.08,.12],[t,4.63,-5.68],new K({color:2765879,metalness:.55,roughness:.5}),{castShadow:!1});let r=[],i=Ul(382);for(let e=0;e<48;e++){let e=-18+i()*36,t=-14-i()*16,n=1.3+i()*7.5;r.push({position:[e,n/2-1.4,t],size:[1.2+i()*2.2,n,1.5],color:462868}),i()>.42&&r.push({position:[e+(i()-.5),n/2-1.3,t+.8],size:[.08,.1,.02],color:i()>.55?14723173:9351609})}su(e,r,{roughness:.92},!1,!1);let a=[];for(let e of[-5.2,0,5.2])a.push({position:[e,6.24,.5],size:[.22,.18,12],color:2568759}),a.push({position:[e,6.2,-3.5],size:[.14,.35,.14],color:1976364}),a.push({position:[e,6.2,3.6],size:[.14,.35,.14],color:1976364});su(e,a,{metalness:.5,roughness:.48},!1,!1);let o=[];for(let t of[-5.2,0,5.2])for(let n of[-3.5,.5,4.5]){Q(e,[1.3,.07,.24],[t,5.72,n],new U({color:11459023,toneMapped:!1}),{castShadow:!1}),Q(e,[1.45,.13,.34],[t,5.82,n],new K({color:2108721,metalness:.5,roughness:.6}),{castShadow:!1});let r=eu(12183260,1.4,.13);r.position.set(t,5.6,n),e.add(r),o.push(new B(t,5.65,n))}let s=new K({color:2897721,metalness:.35,roughness:.65});for(let t of[-7.1,7.1])Q(e,[.7,6.3,.7],[t,3.15,-4],s),Q(e,[.7,6.3,.7],[t,3.15,5],s);let c=new K({color:4281934,metalness:.6,roughness:.4});for(let t=0;t<4;t++)Q(e,[15.6,.16,.16],[0,5.12-t*.21,-1.5-t*.38],c,{castShadow:!1});let l=new K({color:3687497,metalness:.35,roughness:.6}),u=Ul(908);for(let t=0;t<5;t++)Q(e,[.9,1.8,.65],[-6.75,.9,-2.5+t*.72],l),Q(e,[.84,.02,.04],[-6.75,1.28+t%2*.22,-2.48+t*.72],new K({color:1383454,roughness:.5,metalness:.4}),{castShadow:!1});Q(e,[1.2,.12,2.8],[6.9,2.1,1.3],l);for(let t=0;t<8;t++)Q(e,[.06,.35+u()*.5,.06],[6.76,2.3,.1+t*.32],new K({color:t%2?9081215:5465450,metalness:.65,roughness:.35}),{castShadow:!1,rotation:[0,0,(u()-.5)*.1]});let d=Ad();e.add(d.group);let f=jd();e.add(f.group);let p=td();p.setUniform(),p.figure.root.position.set(6.7,0,4.4),e.add(p.figure.root);let m=tu(2.1,.04);m.position.set(-1.3,1.6,1.5),e.add(m);let h=new lr,g=[],_=Ul(772);for(let e=0;e<110;e++)g.push(-3.5+_()*7,.3+_()*3.2,-1+_()*5);h.setAttribute(`position`,new tr(g,3));let v=new Ki(h,new Vi({color:11850440,size:.014,transparent:!0,opacity:.23,depthWrite:!1,blending:2}));e.add(v);let y=new lr,b=new Float32Array(270),x=new Float32Array(270),S=Ul(660);for(let e=0;e<90;e++)x[e*3]=S(),x[e*3+1]=S(),x[e*3+2]=S();y.setAttribute(`position`,new Qn(b,3));let C=new Ki(y,new Vi({color:16758366,size:.035,map:Kl(16,16,e=>{e.clearRect(0,0,16,16);let t=e.createRadialGradient(8,8,0,8,8,8);t.addColorStop(0,`rgba(255,243,194,1)`),t.addColorStop(.35,`rgba(255,186,86,.9)`),t.addColorStop(1,`rgba(255,122,42,0)`),e.fillStyle=t,e.fillRect(0,0,16,16)}),transparent:!0,depthWrite:!1,blending:2,opacity:.9}));e.add(C);let w=new _a(10205632,2437423,.68);e.add(w);let T=new Ca(14085091,128,16,.85,.72,2);T.position.set(2.5,7,4.2),T.target.position.set(.5,.8,.2),T.castShadow=!0,T.shadow.mapSize.set(1536,1536),T.shadow.bias=-.002,T.shadow.camera.near=.5,T.shadow.camera.far=18,e.add(T,T.target);let E=new ja(8562869,.58);E.position.set(4,5,-6),e.add(E);let D=new Oa(16754784,5.2,5,2);D.position.set(-2.8,2.6,2.8),e.add(D);let ee=new ja(11978950,.48);ee.position.set(2.5,3.4,7),ee.target.position.set(-1,1.1,.4),e.add(ee,ee.target);let O=new Oa(16765854,5.5,3.6,2);O.position.set(3.2,2.15,1.5),e.add(O);let k=new Oa(8249800,3,3,2);k.position.set(1,1.4,1.9),e.add(k);let A=!1,te=0,j=!1,ne=e=>{A=e},M=e=>{te=Math.max(0,Math.min(36,Math.round(e))),f.pieces.visible=te>0,f.pieces.count=te},N=e=>{j=e,f.caseLid.rotation.x=e?-1.05:0,f.caseOpen.visible=e},re=e=>{f.vial.visible=e},ie=e=>{d.rod.visible=e},ae=e=>{let t=e,n=A?t*14.5:t*.4;if(d.rod.rotation.x=n,d.chuck.rotation.x=n,d.tool.position.x=.2+Math.sin(t*.22)*.17,d.rod.position.x=-.35+Math.sin(t*.08)*.015,d.tool.children[3].rotation.y=Math.sin(t*2.1)*.1,f.caseLid.rotation.x=j?-1.05+Math.sin(t*1.3)*.008:0,T.intensity=128*(.98+Math.sin(t*1.8)*.014),d.workLight.intensity=A?13*(.8+Math.sin(t*12)*.1):5.2,d.alarm.intensity=A?.08:.22+Math.abs(Math.sin(t*1.7))*.18,v.position.y=Math.sin(t*.08)*.08,m.position.x=-1.3+Math.sin(t*.1)*.25,A){let e=new B(-1.1+d.tool.position.x,1.28,.57),n=y.attributes.position.array;for(let r=0;r<90;r++){let i=(t*(.8+x[r*3]*1.4)+x[r*3+2])%1,a=e.x-.16+(x[r*3+1]-.5)*.2+(x[r*3]-.5)*.34*i,o=e.y+i*.14-i*i*.35,s=e.z+.4+i*(.35+x[r*3+2]*.55);n[r*3]=a,n[r*3+1]=o,n[r*3+2]=s}y.attributes.position.needsUpdate=!0,C.visible=!0}else C.visible=!1};return M(0),N(!1),ae(0),{group:e,zhang:p,update:ae,setMachining:ne,setPieces:M,setCaseOpen:N,setWorkpieces:ie,setDustVial:re,machineScreen:d.screen,machineGlass:d.glass,cutRod:d.rod}}var Nd=206.7;function Pd(){new Cr(.014,.043,.014),new Cr(.012,.015,.012);let e=new lr,t=[],n=[],r=[],i=(e,i,a,o,s)=>{let c=new Cr(e,i,a);c.translate(0,o,0);let l=c.attributes.position,u=c.attributes.normal,d=new H(s);for(let e=0;e<l.count;e++)t.push(l.getX(e),l.getY(e),l.getZ(e)),n.push(u.getX(e),u.getY(e),u.getZ(e)),r.push(d.r,d.g,d.b);c.dispose()};return i(.018,.03,.018,-.005,7232318),i(.02,.004,.02,.013,4141863),i(.015,.014,.015,.022,4078132),i(.011,.006,.011,.032,7301725),e.setAttribute(`position`,new tr(t,3)),e.setAttribute(`normal`,new tr(n,3)),e.setAttribute(`color`,new tr(r,3)),e.computeBoundingSphere(),{geometry:e,material:new K({vertexColors:!0,roughness:.4,metalness:.55})}}function Fd(){let e=new G,t=new K({color:7371382,metalness:.7,roughness:.35}),n=new K({color:4402464,roughness:.85});return Q(e,[.035,.026,.17],[.035,0,0],t),Q(e,[.035,.026,.17],[-.035,0,0],t),Q(e,[.035,.026,.1],[.085,0,0],n,{rotation:[0,-.18,0]}),Q(e,[.035,.026,.1],[-.085,0,0],n,{rotation:[0,.18,0]}),e}function Id(){let e=new G,t=new K({color:2830641,metalness:.55,roughness:.35});return Q(e,[.08,.07,.31],[0,0,0],t),Q(e,[.09,.085,.04],[0,0,.15],t),Q(e,[.055,.055,.03],[0,0,-.16],t),Q(e,[.08,.03,.08],[0,-.055,0],t,{castShadow:!1}),Q(e,[.064,.03,.01],[0,0,.08],new U({color:7125927,toneMapped:!1}),{castShadow:!1}),e}function Ld(){let e=new G;e.name=`basement`,e.visible=!1;let t=new K({map:Xl([3,2]),color:5987155,roughness:.98,metalness:0}),n=new K({map:Xl([4,4]),color:4868933,roughness:1}),r=new K({color:4081992,metalness:.55,roughness:.48}),i=new K({color:1777951,metalness:.4,roughness:.65});new K({map:ql(`#332318`,[1,2]),color:8017209,roughness:.9}),Q(e,[6.6,.2,8.8],[0,-.1,0],n,{castShadow:!1,receiveShadow:!0}),Q(e,[6.6,.22,8.8],[0,2.62,0],new K({color:2434852,roughness:1}),{castShadow:!1}),Q(e,[6.6,2.7,.22],[0,1.35,4.25],t),Q(e,[.22,2.7,8.8],[-3.24,1.35,0],t),Q(e,[.22,2.7,8.8],[3.24,1.35,0],t),Q(e,[2,2.7,.25],[-2.3,1.35,-4.25],t),Q(e,[2,2.7,.25],[2.3,1.35,-4.25],t),Q(e,[2.6,.5,.25],[0,2.45,-4.25],t),Q(e,[.34,.01,.34],[.9,.01,-1.5],i,{castShadow:!1});let a=new U({color:2104086,transparent:!0,opacity:.26,depthWrite:!1}),o=new W(new Zi(1.4,.8),a);o.rotation.x=-Math.PI/2,o.position.set(-1.4,.007,1.6),e.add(o),Q(e,[2.55,.25,5.2],[0,3.16,-6.75],new K({color:1842716,roughness:1}),{castShadow:!1}),Q(e,[.24,3.3,5.2],[-1.3,1.55,-6.75],t),Q(e,[.24,3.3,5.2],[1.3,1.55,-6.75],t);let s=[];for(let e=0;e<15;e++){let t=-8.55+e*.27,n=2.68-e*.18;s.push({position:[0,(n-.18)/2,t],size:[2.16,Math.max(.02,n-.17),.28],color:e%2?4934467:4473917})}su(e,s,{roughness:.98},!1,!0),Q(e,[.045,.08,4.1],[1.02,2.3,-6.6],r,{rotation:[-.56,0,0],castShadow:!1});let c=new Oa(13682856,10.5,7,2);c.position.set(.1,3,-7.2),e.add(c);let l=new Oa(14733748,24,7.5,2);l.position.set(.3,2.8,-8),e.add(l);let u=new Oa(15783594,11,5.2,2);u.position.set(.15,2.2,-8.65),e.add(u),Q(e,[.34,.05,.18],[.15,3.06,-8.65],new U({color:15192739,toneMapped:!1}),{castShadow:!1}),Q(e,[.28,.12,.28],[.1,3.02,-7.2],new U({color:12964265,toneMapped:!1}),{castShadow:!1});let d=new G;d.position.set(-.76,0,-4.12),e.add(d);let f=new G;f.position.set(.76,0,0),d.add(f),Q(f,[1.52,2.14,.13],[0,1.08,0],new K({color:3884097,metalness:.48,roughness:.55})),Q(f,[1.1,.34,.03],[0,1.58,-.09],i,{castShadow:!1}),Q(f,[.17,.07,.06],[.52,1.05,-.13],r,{castShadow:!1});let p=new G;p.position.set(1.06,1.25,-4.18),e.add(p),Q(p,[.23,.36,.06],[0,0,0],i),Q(p,[.15,.1,.012],[0,.07,-.04],new U({color:8508329,toneMapped:!1}),{castShadow:!1}),Q(e,[1.7,.12,.35],[0,2.25,-4.12],t,{castShadow:!1}),Q(e,[1.9,.11,.25],[0,.055,-4.1],i,{castShadow:!1}),du(e,[0,1.97,-4.36],[0,Math.PI,0],{width:.62,height:.23,text:`B-07`,bg:`#1b211f`,color:`#b49d6e`,size:58,emissive:!1});let m=new K({color:4870471,metalness:.55,roughness:.44});for(let t=0;t<4;t++)Q(e,[6.5,.1,.1],[0,2.39-t*.12,2.9-t*.27],m,{castShadow:!1});Q(e,[.1,.1,8.4],[-2.83,2.32,0],m,{castShadow:!1}),Q(e,[.1,1.8,.1],[-2.83,1.6,-4],m,{castShadow:!1});let h=[];for(let e=0;e<=28;e++){let t=e/28;h.push(new B(-2.75+Math.sin(t*9)*.06,2.5-t*.55,-3.8+t*7.4))}let g=new Ii(new lr().setFromPoints(h),new Oi({color:1579543}));e.add(g);let _=new G;_.position.set(-.15,0,.15),e.add(_),Q(_,[3.7,.09,1.45],[0,.87,0],r),Q(_,[3.55,.025,1.28],[0,.925,0],new K({color:4016701,roughness:.92}),{castShadow:!1});for(let e of[-1.62,1.62])for(let t of[-.56,.56])Q(_,[.1,.86,.1],[e,.43,t],i);Q(_,[.94,.27,.7],[1.18,.7,.1],i),Q(_,[.02,.025,.6],[1,.87,.1],r,{castShadow:!1}),Q(_,[.56,.014,.56],[-.8,.94,.06],new K({color:1513749,roughness:.94}),{castShadow:!1});let v=Pd(),y=new yi(v.geometry,v.material,36),b=new Dn;for(let e=0;e<36;e++){let t=Math.floor(e/6),n=e%6;b.position.set(-1.03+n*.092,.975,-.16+t*.09),b.rotation.set(0,e*37%10*.01,0),b.updateMatrix(),y.setMatrixAt(e,b.matrix)}y.instanceMatrix.needsUpdate=!0,_.add(y),Q(_,[.45,.03,.28],[.22,.95,-.13],new K({color:3817016,metalness:.45,roughness:.5}),{castShadow:!1});for(let e=0;e<5;e++){let t=new W(new Cr(.017,.018,.017),new K({color:8414800,metalness:.6,roughness:.35}));t.position.set(.08+e*.055,.973,-.16+e%2*.06),t.rotation.y=e*.6,_.add(t)}let x=new yi(new Cr(.018,.034,.018),new K({color:5919045,metalness:.42,roughness:.55}),36),S=new Dn;for(let e=0;e<36;e++){let t=Math.floor(e/6),n=e%6;S.position.set(.34+(n-2.5)*.045,.972,-.25+t*.05),S.rotation.set(0,e*.83%1.4,.03-e%3*.02),S.updateMatrix(),x.setMatrixAt(e,S.matrix)}x.instanceMatrix.needsUpdate=!0,_.add(x),Q(_,[.34,.012,.37],[.34,.95,-.12],new K({color:2171422,roughness:.9}),{castShadow:!1});let C=new G;C.name=`assembly-jig`,C.position.set(-.12,.94,.5),_.add(C);let w=new K({color:4739146,metalness:.65,roughness:.35});Q(C,[.2,.025,.18],[0,0,0],w,{castShadow:!1}),Q(C,[.035,.055,.14],[-.075,.03,0],w,{castShadow:!1}),Q(C,[.035,.055,.14],[.075,.03,0],w,{castShadow:!1}),Q(C,[.018,.02,.11],[0,.035,.03],new U({color:10271644,toneMapped:!1}),{castShadow:!1}),Q(C,[.042,.09,.042],[0,.08,0],new K({color:7954757,metalness:.55,roughness:.4}),{castShadow:!1}),Q(C,[.042,.014,.042],[0,.132,0],new K({color:4011306,roughness:.8}),{castShadow:!1});let T=new G;T.position.set(0,.2,0),C.add(T);let E=pd(2,880,!0);E.scale.setScalar(.5),E.position.set(0,.02,0),T.add(E);for(let e of[-.04,.04])Q(T,[.009,.16,.009],[e,.12,-.04],w,{castShadow:!1,rotation:[.08,0,0]});let D=Q(C,[.016,.018,.016],[0,.143,0],new U({color:14272399,transparent:!0,opacity:.8,toneMapped:!1}),{castShadow:!1}),ee=new Oa(16766112,1.7,1.4,2);ee.position.set(.05,.32,.08),C.add(ee);let O=Fd();O.position.set(.74,.96,.16),O.rotation.y=-.45,_.add(O);let k=new G;k.position.set(-1.32,.96,-.25),Q(k,[.065,.23,.065],[0,.12,0],new K({color:6252897,roughness:.35,metalness:.2})),Q(k,[.04,.09,.04],[0,.27,0],new K({color:13682081,roughness:.5})),_.add(k);for(let e=0;e<4;e++){let t=pd(2,601+e,!1);t.scale.setScalar(.4+e*.04),t.position.set(.9+e%2*.08,.955,-.3+Math.floor(e/2)*.08),_.add(t)}let A=new G;A.position.set(-1.55,.93,-.38),_.add(A),Q(A,[.22,.02,.16],[0,0,0],i),Q(A,[.025,.46,.025],[.03,.23,0],i,{rotation:[0,0,-.2]}),Q(A,[.28,.1,.22],[.06,.46,0],new K({color:2898482,roughness:.5,metalness:.35}),{rotation:[0,0,-.2]}),Q(A,[.22,.015,.16],[.09,.405,0],new U({color:13804128,toneMapped:!1}),{castShadow:!1});let te=new Oa(16760182,4.8,2.5,2);te.position.set(-1.4,1.32,-.4),e.add(te);let j=new G;j.position.set(-.2,.94,1.05),j.visible=!1,e.add(j),Q(j,[1.35,.03,.72],[0,0,0],new K({color:12040364,roughness:.4,metalness:.2}),{castShadow:!1}),Q(j,[1.02,.02,.58],[-.06,.035,0],new K({color:6447956,roughness:.98}),{castShadow:!1}),Q(j,[.84,.14,.44],[-.08,.1,0],new K({color:5906718,roughness:.78}),{castShadow:!1}),Q(j,[.72,.025,.34],[-.08,.18,0],new K({color:8138795,roughness:.64}),{castShadow:!1}),Q(j,[.9,.012,.02],[-.06,.195,-.02],new K({color:13871504,roughness:.8}),{castShadow:!1,rotation:[0,.35,0]}),Q(j,[.42,.01,.015],[.1,.2,.14],new K({color:13147266,roughness:.8}),{castShadow:!1,rotation:[0,-.4,0]}),Q(j,[.17,.015,.19],[.42,.02,.21],new K({color:6774607,roughness:.9}),{castShadow:!1});for(let e=0;e<7;e++){let t=pd(2,710+e,!1);t.scale.setScalar(.55+e%2*.1),t.position.set(-.24+e%4*.1,.2,-.03+Math.floor(e/4)*.12),j.add(t)}let ne=new W(new Cr(.29,.018,.055),new K({color:9279633,metalness:.75,roughness:.27}));ne.position.set(.5,.07,.17),ne.rotation.y=-.65,j.add(ne);let M=new G;M.position.set(.9,0,2.45),e.add(M),Q(e,[.7,.08,.58],[.9,.04,2.45],new K({color:2567209,metalness:.5,roughness:.55}),{castShadow:!1}),Q(e,[.55,.05,.44],[.9,.12,2.45],new K({color:3810336,roughness:.8}),{castShadow:!1});let N=new K({color:5001808,metalness:.8,roughness:.36});for(let e=0;e<7;e++)Q(M,[.018,.09,.018],[0,2.45-e*.1,0],N,{castShadow:!1});Q(M,[.34,.035,.18],[0,1.78,0],i,{castShadow:!1}),Q(M,[.44,.5,.22],[0,1.5,0],new K({color:7828068,roughness:.97})),Q(M,[.47,.08,.25],[0,1.78,0],new K({color:9143412,roughness:.98})),Q(M,[.03,.44,.23],[-.19,1.49,0],new K({color:6248781,roughness:1}),{castShadow:!1}),Q(M,[.03,.44,.23],[.19,1.49,0],new K({color:6248781,roughness:1}),{castShadow:!1});let re=new G;re.visible=!1,M.add(re);for(let e=0;e<5;e++){let t=new W(new Cr(.018,.018,.006),new U({color:1445901}));t.position.set(-.1+e%2*.2+(e===3?.06:0),1.56+Math.floor(e/2)*.13,-.115),re.add(t)}let ie=tu(.33,0);ie.position.set(0,1.6,-.18),M.add(ie);let ae=new G;ae.visible=!1,M.add(ae);for(let e=0;e<12;e++){let t=new W(new Cr(.009,.009,.009),new U({color:e%3?5513244:10107700,toneMapped:!1})),n=Ul(410+e);t.position.set((n()-.5)*.42,1.52+n()*.28,-.13-n()*.12),ae.add(t)}Q(e,[2.8,.7,.35],[.9,.35,3.92],new K({color:3816756,roughness:.98}));for(let t=0;t<4;t++)Q(e,[2.3-t*.12,.32,.18],[.9,.8+t*.27,3.89],new K({color:5591619,roughness:1}),{castShadow:!1});du(e,[.9,1.7,3.69],[0,Math.PI,0],{width:.9,height:.34,text:`试射 / B-07`,bg:`#5a3523`,color:`#e0c287`,size:48,emissive:!1}),Q(e,[.9,.08,2.3],[2.78,1.55,.5],r),Q(e,[.9,.08,2.3],[2.78,.9,.5],r);for(let t of[-.45,.5,1.35])Q(e,[.06,1.55,.06],[3.12,.8,t],r);for(let t=0;t<12;t++){let n=Ul(900+t),r=new W(new Cr(.22+n()*.24,.16+n()*.2,.22+n()*.26),new K({color:t%4==0?7760718:4344386,roughness:.9}));r.position.set(2.75+(n()-.5)*.3,1+t%2*.64,-.2+t/12*1.7),r.rotation.y=n()*1.4,e.add(r)}Q(e,[1,.15,.65],[-2.5,.85,2.75],new K({color:6185565,metalness:.55,roughness:.4})),Q(e,[.8,.2,.45],[-2.5,.75,2.75],t),Q(e,[.04,.5,.04],[-2.5,1.1,3.02],r),Q(e,[.24,.03,.16],[-2.48,1.34,2.9],r),Q(e,[.7,1.6,.1],[-3.1,1,2.6],new K({color:2962479,roughness:1}));let oe=td();oe.setUniform(),oe.figure.root.position.set(-.15,0,-.55),e.add(oe.figure.root);let P=$u(!0);P.root.visible=!1,oe.figure.anchors.handR.add(P.root);let se=Id();se.scale.setScalar(.75),se.position.set(.95,.975,-.03),_.add(se),Q(e,[.52,.07,.5],[1.35,.48,-1.5],i);for(let t of[1.14,1.56])for(let n of[-1.7,-1.3])Q(e,[.05,.47,.05],[t,.24,n],i);let F=new G;F.position.set(0,2.55,1.2),e.add(F),Q(F,[.02,.38,.02],[0,-.19,0],new U({color:2826776}),{castShadow:!1}),Q(F,[.13,.18,.13],[0,-.44,0],new U({color:16761980,toneMapped:!1}),{castShadow:!1}),Q(F,[.24,.08,.24],[0,-.33,0],i,{castShadow:!1});let ce=eu(16757345,1.9,.32);ce.position.set(0,-.44,0),F.add(ce);let le=new Oa(16754786,14,7,2);le.position.set(0,-.48,0),le.castShadow=!0,le.shadow.mapSize.set(1024,1024),le.shadow.bias=-.008,le.shadow.camera.near=.1,le.shadow.camera.far=8,F.add(le);let ue=new _a(7241586,2104084,.18);e.add(ue);let de=new Oa(9418906,5.2,5.2,2);de.position.set(0,1,-4.6),e.add(de);let fe=new ja(13284494,.6);fe.position.set(3.5,3.2,4.2),fe.target.position.set(-.4,1,.2),e.add(fe,fe.target);let pe=new Oa(7314045,1.35,3.2,2);pe.position.set(-2.2,1.9,2.6),e.add(pe);let me=new Oa(9881505,2,4,2);me.position.set(.4,1.6,-3.4),e.add(me);let I=new Oa(16763538,9,5,2);I.position.set(1.4,1.95,-2.15),e.add(I);let he=new Oa(16765066,0,7,2);he.position.set(.15,1.2,1.65),e.add(he);let ge=eu(16764291,3.3,0);ge.position.set(.3,1.45,1),e.add(ge);let _e=tu(1,0);_e.position.set(.35,1.45,1.3),e.add(_e);let L=new lr,ve=[],R=Ul(736);for(let e=0;e<150;e++)ve.push((R()-.5)*6,.3+R()*2.1,-3.6+R()*7.7);L.setAttribute(`position`,new tr(ve,3));let ye=new Ki(L,new Vi({color:14268806,size:.012,transparent:!0,opacity:.25,depthWrite:!1,blending:2}));e.add(ye);let be=1,xe=0,Se=!1,Ce=36,we=`loaded`,Te=!0,Ee=e=>{be=Math.max(0,Math.min(1.4,e))},De=e=>{xe=Math.max(0,Math.min(1,e));let t=xe*xe*(3-2*xe);d.rotation.y=t*1.5},Oe=e=>{y.visible=e},ke=e=>{j.visible=e},Ae=e=>{we=e,re.visible=e!==`loaded`,ae.visible=e!==`loaded`},je=e=>{Ce=Math.max(0,Math.min(36,Math.round(e))),y.count=Ce,y.visible=Ce>0},Me=e=>{Se=e},Ne=e=>{let t=e-Nd;return t<0?{flash:0,smoke:0}:{flash:Math.max(0,1-t/.14),smoke:Math.max(0,Math.min(1,t/.15))*Math.max(0,1-(t-.2)/2.3)}},Pe=(e,t)=>{let n=be,r=e>=177.6&&e<191.2;if(T.visible=r,r){let t=Z(Y((e-180.2)/5.6));T.position.y=.2-t*.058,D.scale.setScalar(t>.08&&t<.82?1:.001),D.position.y=.143}else D.scale.setScalar(.001);let i=Math.sin(e*.63)*.12+Math.sin(e*1.17+1.1)*.025;F.rotation.z=i,le.intensity=(18.5+Math.sin(e*2.4)*.25)*n,ue.intensity=.46*n,c.intensity=(Se?6.5:3.8)*Math.max(.05,n),te.intensity=4.8*Math.max(0,Math.min(1,n+.15)),ye.position.y=Math.sin(e*.09)*.06;let a=Ne(e);he.intensity=a.flash*55,ge.material.opacity=a.flash*.9,_e.material.opacity=a.smoke*.24,_e.scale.setScalar(.55+a.smoke*1.4),ie.material.opacity=Math.max(0,Math.min(.25,(e-Nd-1.8)*.14))*(we===`loaded`?0:1),ie.scale.setScalar(.3+Math.max(0,e-Nd)*.11),P.setFlash(a.flash);let o=Math.max(0,1-Math.abs(e-Nd-.12)/.18);M.rotation.z=Math.sin(e*1.3)*.008+o*.035,Te&&(Te=!1,y.count=Ce)};return Ae(`loaded`),De(0),Pe(0,0),{group:e,zhang:oe,gun:P,update:Pe,setLights:Ee,setDoorOpen:De,setBullets:Oe,setInspection:ke,setParcelState:Ae,setBulletCount:je,setStairsActive:Me,fireTime:Nd}}var Rd=new B(0,-78,-166),zd=new B(-4.2,7,-84),Bd=new B(.9,-.2,-81.1),Vd=-46,Hd=[-4.3,-2.8,-1.3,.2,1.7,3.2,4.7],Ud=[-5,-3.3,-1.6,.1,1.8,3.5,5.2],Wd=[-3.8,-1.7,.4,2.5,4.6],Gd=[313.1,312.42,313.7,315.2,316.7],Kd=[1,2,3,4,5],qd=[2,3,4];function Jd(e=70,t=.9){let n=[664633,863815,1195352,666435,1527139,930895],r=[3890243,5007175,7693637,8943184,3102279,5924934,6707776],i=[12767697,14542305,11190210,15132381],a=[11190210,13030868,14542046,9678516],o=[13148775,14070904,10254146],s=Math.ceil(e)*2;return Rl(e,(t,c,l,u)=>{let d=(t+.5-s/2)/e,f=(c+.5-s/2)/e,p=(l+.5-s/2)/e;if(Math.abs(f)>.87)return i[Math.abs(t*7+l*11)%i.length];let m=Gl(d*2.35+3.2,p*2.2+f*1.45+2,3),h=Gl(d*4.1+14.1,p*3.5+f*2.9+4.6,2);if(h>.6)return a[Math.floor(h*a.length*3)%a.length];if(u>.987&&h>.5)return 13951456;let g;if(m>.535){if(g=r,m>.63&&h>.53&&d+p<-.25)return o[(t+l+4)%o.length]}else g=n;let _=Math.floor((m*79+Math.abs(d*31+p*13))%g.length);return g[_]},{voxel:t,anchor:`center`})}function Yd(e=70,t=.9){let n=new K({vertexColors:!0,roughness:.9,metalness:0,emissive:398108,emissiveIntensity:.46}),r=new W(Jd(e,t),n);return r.position.copy(Rd),r.rotation.y=.4,r.rotation.z=.14,r}function Xd(e,t,n,r){let i=new B().subVectors(t,e),a=new W(new Cr(n,i.length(),n),r);return a.position.copy(e).addScaledVector(i,.5),a.quaternion.setFromUnitVectors(new B(0,1,0),i.clone().normalize()),a}function Zd(){let e=new G,t=new K({color:3094584,roughness:.55,metalness:.35});return Q(e,[.28,.23,.38],[0,0,0],t),Q(e,[.16,.17,.22],[0,0,.28],new K({color:1777696,roughness:.35,metalness:.5})),Q(e,[.12,.12,.04],[0,0,.42],new U({color:8894388,toneMapped:!1}),{castShadow:!1}),Q(e,[.06,.12,.06],[0,.17,-.04],t),Q(e,[.18,.13,.05],[0,-.17,-.02],t),e}function Qd(){let e=new G,t=new K({color:5594973,metalness:.66,roughness:.38});Q(e,[2.15,2.35,1],[0,0,0],new K({color:1186074,metalness:.5,roughness:.6})),Q(e,[2.65,2.8,.38],[0,0,-.44],t),Q(e,[1.28,1.36,.14],[0,0,.5],t),Q(e,[1.06,1.14,.06],[0,0,.59],new U({color:658959}),{castShadow:!1}),Q(e,[1.02,1.1,.03],[0,0,.35],new U({color:10115889,toneMapped:!1}),{castShadow:!1}),Q(e,[.75,.82,.02],[0,0,.42],new U({color:3875864,toneMapped:!1}),{castShadow:!1}),Q(e,[.05,.82,.03],[0,0,.46],new U({color:15909764,toneMapped:!1}),{castShadow:!1});let n=new G;n.position.set(-.53,0,.62),e.add(n),Q(n,[.53,1.14,.07],[0,0,0],t),Q(n,[.08,.6,.12],[.2,0,0],new K({color:9141851,metalness:.7,roughness:.3}),{castShadow:!1});let r=new G;r.position.set(.53,0,.62),e.add(r),Q(r,[.53,1.14,.07],[0,0,0],t),Q(r,[.08,.6,.12],[-.2,0,0],new K({color:9141851,metalness:.7,roughness:.3}),{castShadow:!1});let i=new U({color:6105115,toneMapped:!1});Q(e,[.18,.1,.09],[0,1.46,.52],i,{castShadow:!1}),Q(e,[2.8,.08,.16],[0,-1.48,.54],t,{castShadow:!1});let a=new Oa(16757866,2.4,4.5,2);return a.position.set(0,.1,1.2),e.add(a),{group:e,left:n,right:r,indicator:i,light:a}}function $d(){let e=new G;e.name=`orbit`,e.visible=!1,e.add(ru(1300,250,700,21,14214123,10466498));let t=ru(260,60,220,918,12110034,8956088);t.material.size=1.1,e.add(t);let n=Yd(70,.9);e.add(n);let r=eu(5148601,220,.11);r.position.copy(Rd).add(new B(-10,34,12)),e.add(r);let i=eu(8636638,150,.08);i.position.copy(Rd).add(new B(-8,48,18)),e.add(i);let a=new G;a.position.set(40,35,-260),e.add(a);let o=new W(Rl(6,(e,t,n)=>{let r=Math.sqrt(e*e+t*t+n*n);return r>5.2?16761706:r>4.1?16774095:16776690},{voxel:1}),new U({vertexColors:!0,toneMapped:!1}));a.add(o);let s=eu(16769191,96,.55);s.position.z=14,a.add(s);let c=new ci(new Jr({map:Ql(`rgba(255,255,247,1)`,`rgba(255,206,132,.55)`),color:16774358,transparent:!0,opacity:.95,depthWrite:!1,depthTest:!0,blending:2}));c.scale.setScalar(26),c.position.z=18,a.add(c);let l=new ci(new Jr({map:Ql(`rgba(255,255,255,1)`,`rgba(255,232,178,.8)`),color:16777215,transparent:!0,opacity:.8,depthWrite:!1,depthTest:!0,blending:2}));l.scale.setScalar(13),l.position.z=19,a.add(l);let u=new ci(new Jr({map:Ql(`rgba(255,241,208,1)`,`rgba(218,143,67,.3)`),color:16767134,transparent:!0,opacity:.4,depthWrite:!1,depthTest:!0,blending:2}));u.scale.set(120,14,1),u.position.z=12,a.add(u);let d=new G;for(let e=0;e<4;e++){let t=new ci(new Jr({map:Ql(`rgba(255,248,218,1)`,`rgba(235,170,83,.32)`),color:e%2?12640998:16761466,transparent:!0,opacity:.1-e*.015,depthWrite:!1,blending:2}));t.scale.setScalar(9+e*5),t.position.set(-e*6.3,e*2.7,0),d.add(t)}e.add(d);let f=new ja(16769202,3.6);f.position.copy(a.position),f.target.position.set(0,0,-46),e.add(f,f.target);let p=new ja(6196136,.65);p.position.set(0,-30,-20),p.target.position.set(0,0,-40),e.add(p,p.target);let m=new ja(9024450,.8);m.position.set(-30,15,-120),m.target.position.set(0,0,-40),e.add(m,m.target);let h=new ja(12835810,1.55);h.position.set(14,7,28),h.target.position.set(0,3,-46),e.add(h,h.target),e.add(new Ma(1911347,1.02));let g=new Ca(13952230,520,55,.5,.8,2);g.position.set(-1,7,-29),g.target.position.set(.1,4.25,-46),e.add(g,g.target);let _=new U({color:6190971,transparent:!0,opacity:.14,toneMapped:!1}),v=zd.clone().add(new B(0,-8.4,.4)),y=new B(-1.3,-25,-118);e.add(Xd(v,y,.11,_));for(let t=0;t<10;t++){let n=v.clone().lerp(y,t/10),r=eu(10142152,.8,.15);r.position.copy(n),e.add(r)}let b=new G;b.position.copy(zd),e.add(b);let x=[],S=[],C=8.8;for(let e=0;e<34;e++){let t=e/34*Bl,n=Math.cos(t)*C,r=Math.sin(t)*C;for(let i of[-.46,.46])x.push({position:[n,r,i],size:[1.72,.72,.52],color:e%5==0?7305327:3884617,rotation:[0,0,t+Math.PI/2]});e%2==0&&S.push({position:[n,r,.75],size:[.28,.11,.08],color:e%8==0?16761722:10475728,rotation:[0,0,t+Math.PI/2]}),e%3==0&&(x.push({position:[n,r,1],size:[.5,.38,.3],color:7830898,rotation:[0,0,t+Math.PI/2]}),S.push({position:[n,r,1.17],size:[.13,.09,.04],color:15185013})),e%4==0&&x.push({position:[n*1.1,r*1.1,0],size:[1.8,.09,1.6],color:2370863,rotation:[0,0,t]})}for(let e=0;e<20;e++){let t=e/20*Bl;x.push({position:[Math.cos(t)*6.1,Math.sin(t)*6.1,0],size:[1.75,.45,.7],color:e%3==0?8879462:4345424,rotation:[0,0,t+Math.PI/2]})}for(let e=0;e<8;e++){let t=e/8*Bl;x.push({position:[Math.cos(t)*4,Math.sin(t)*4,0],size:[6.4,.24,.4],color:5857628,rotation:[0,0,t]}),x.push({position:[Math.cos(t)*4.05,Math.sin(t)*4.05,.27],size:[5.9,.07,.05],color:3291964,rotation:[0,0,t]})}x.push({position:[0,0,0],size:[2.9,2.9,2.1],color:5332317}),x.push({position:[0,0,1.15],size:[2,2,.9],color:3094584}),x.push({position:[0,2,0],size:[2.7,.36,1.4],color:7503995}),x.push({position:[0,-2,0],size:[2.7,.36,1.4],color:7503995}),x.push({position:[0,0,-1.8],size:[.6,4.5,.26],color:4542286});for(let[e,t,n]of[[7.2,4.2,.25],[-7.2,4.2,-.25],[7.2,-4.2,.25],[-7.2,-4.2,-.25]]){x.push({position:[e,t,-1.6],size:[5.8,1.6,.09],color:2569269,rotation:[0,0,n]});for(let r=0;r<5;r++)x.push({position:[e,t,-1.54],size:[.06,1.6,.06],color:8358782,rotation:[0,0,n]});S.push({position:[e,t,-1.48],size:[.09,.09,.04],color:13031604})}let w=su(b,x,{roughness:.62,metalness:.3},!1,!1);w&&(w.name=`huanghe-wheel`);let T=su(b,S,{toneMapped:!1,roughness:.5},!1,!1);T&&(T.material=new U({vertexColors:!0,toneMapped:!1}));let E=eu(9156541,27,.06);E.position.set(0,0,2),b.add(E),du(b,[0,.2,1.58],[0,0,0],{width:1.5,height:.58,text:`黄河`,bg:`#12191a`,color:`#d8b47f`,size:100,fontFamily:`"Noto Serif CJK SC", serif`,emissive:!0}),du(b,[0,-.36,1.58],[0,0,0],{width:2.4,height:.25,text:`HUANGHE SYNCHRONOUS`,bg:`#12191a`,color:`#7c9b9c`,size:28,fontFamily:`"Courier New", monospace`,emissive:!0});let D=Qd();D.group.position.set(4.7,-7.15,1.35),b.add(D.group),du(b,[4.7,-5.6,2.02],[0,0,0],{width:1.26,height:.24,text:`三号气闸 / A3`,bg:`#222b2a`,color:`#cdbb98`,size:31,fontFamily:`"Noto Sans CJK SC", sans-serif`,emissive:!0});let ee=Ul(443);for(let e=0;e<8;e++){let t=e/8*Bl+.2,n=11+e%3*1.2;x.length=0;let r=new G;r.position.set(Math.cos(t)*n,Math.sin(t)*n,-2.5-e%2*1.3),b.add(r),Q(r,[.15,1.3+ee()*2.2,.15],[0,0,0],new K({color:2436141,metalness:.6,roughness:.55})),Q(r,[.8,.1,.2],[.35,.5,0],new K({color:2831154,metalness:.5,roughness:.55}),{rotation:[0,0,.4]});let i=eu(e%2?16747349:7976904,.75,.32);i.position.set(0,1+ee()*.8,0),r.add(i)}let O=new G;O.position.set(17,10,-102),e.add(O);let k=[],A=Ul(781);for(let e=0;e<22;e++)k.push({position:[(A()-.5)*14,(A()-.5)*8,(A()-.5)*5],size:[.12,.12,2+A()*7],color:3950408,rotation:[A()*.7,A()*Bl,A()*.5]});for(let e=0;e<8;e++)k.push({position:[(A()-.5)*11,(A()-.5)*6,(A()-.5)*3],size:[2.4,.05,.12],color:5134168,rotation:[0,A()*Math.PI,0]});su(O,k,{metalness:.45,roughness:.55},!1,!1);for(let t=0;t<4;t++){let n=eu(14265454,1.1,.25);n.position.set(17+(t-2)*4,8+t%2*2,-102+t*.7),e.add(n)}let te=Ul(178);for(let t=0;t<5;t++){let n=-35+t*19,r=-1+t%3*4,i=-125-t*9,a=new G;a.position.set(n,r,i),e.add(a);let o=[];for(let e=0;e<7;e++)o.push({position:[(te()-.5)*5,(te()-.5)*2.4,(te()-.5)*3],size:[.8+te()*1.5,.4+te()*1.3,.7+te()*1.7],color:te()>.5?3358015:4870474});su(a,o,{roughness:.8,metalness:.2},!1,!1);let s=eu(8890543,1.4,.09);a.add(s)}let j=Ul(458),ne=[],M=new K({color:5067089,metalness:.45,roughness:.66});for(let t=0;t<26;t++){let t=.15+j()*1.1,n=new W(new Cr(t,t*(.4+j()),t*(.5+j())),M);n.position.set(-16+j()*32,-2+j()*14,-74+j()*58),n.rotation.set(j()*Bl,j()*Bl,j()*Bl),n.userData.spin=(j()-.5)*.1,e.add(n),ne.push(n)}let N=td();N.setSuit(`clear`),N.figure.root.position.set(0,0,0),N.figure.root.rotation.y=0,N.figure.anchors.back.add(ed()),e.add(N.figure.root);let re=$u(!1);re.root.visible=!1,N.figure.anchors.handR.add(re.root);let ie=new Oa(16764293,0,3.2,2);ie.position.set(0,0,3.6),re.root.add(ie);let ae=[];for(let e=0;e<6;e++){let t=tu(e<2?12:8,0),n=e<2?e?8:-8:(e-3.5)*2.2;t.position.set(n,-1.2-e%3*.8,-2-e%2*1.2),N.figure.anchors.back.add(t),ae.push(t)}let oe=eu(14348788,18,0);oe.position.set(0,-.5,-3),N.figure.anchors.back.add(oe),ae.push(oe);let P=[],se=[],F=[],ce=[{xs:Hd,y:3.05,z:Vd},{xs:Ud,y:4.15,z:-48.15},{xs:Wd,y:5.2,z:-50.25}];Hd.length+Ud.length+Wd.length;let le=0;for(let t=0;t<ce.length;t++){let n=ce[t];for(let r=0;r<n.xs.length;r++){let i=le++,a;a=i===2?od(0):i===3?od(1):i===4?od(2):id(40+i*7,t===0?`#b07b54`:`#879b95`),a.setVisor(`sealed`);let o=new B(n.xs[r],n.y,n.z);F.push(o);let s=Bd.clone().add(new B((i%5-2)*.5,(Math.floor(i/5)%4-1.5)*.35,-i*.07));a.figure.root.position.copy(s),a.figure.root.rotation.y=0,a.figure.root.visible=!1,e.add(a.figure.root);let c=[];for(let t=0;t<2;t++){let t=tu(1.2,0);e.add(t),c.push(t)}let l=Kd.indexOf(i),u={actor:a,start:s,lineup:o,phase:i*.61,index:i,victimSlot:l,puffs:c,hitTime:l>=0?Gd[l]:null,visorState:`sealed`,screamed:!1};P.push(u),l>=0&&se.push(u)}}let ue=id(620,`#aab1a4`);ue.setVisor(`clear`),ue.figure.root.position.set(6.6,3.2,-37.6),ue.figure.root.rotation.y=-.88;let de=Zd();de.scale.setScalar(.025),de.position.set(0,.05,.38),ue.figure.anchors.handR.add(de),ue.figure.root.visible=!1,e.add(ue.figure.root);let fe=$l(),pe=[];for(let t=0;t<se.length;t++)for(let t=0;t<4;t++){let n=new ci(new Jr({map:fe,color:t===0?14805222:12570834,transparent:!0,opacity:0,depthWrite:!1,blending:1}));n.scale.setScalar(.3),e.add(n),pe.push(n)}let me=Kl(8,8,e=>{e.fillStyle=`#7d211b`,e.fillRect(2,2,4,4),e.fillStyle=`#c14b40`,e.fillRect(3,3,2,2)},{nearest:!0}),I=new Ki(new lr,new Vi({color:13917006,size:.11,map:me,transparent:!0,alphaTest:.4,depthWrite:!1,sizeAttenuation:!0})),he=new Float32Array(se.length*18*3),ge=[],_e=Ul(559);for(let e=0;e<se.length*18;e++){let e=new B(_e()-.35,_e()-.2,_e()*1.5+.2).normalize();ge.push({dir:e,speed:.4+_e()*1.5})}let L=new lr;L.setAttribute(`position`,new Qn(he,3)),I.geometry=L,e.add(I);let ve=new G;ve.visible=!1,e.add(ve);let R=new Float32Array(90),ye=new lr;ye.setAttribute(`position`,new Qn(R,3));let be=new Ki(ye,new Vi({color:16770482,size:.42,map:Ql(`rgba(255,250,227,1)`,`rgba(240,172,83,.4)`),transparent:!0,depthWrite:!1,blending:2,sizeAttenuation:!0}));be.frustumCulled=!1,ve.add(be);let xe=new Ki(ye,new Vi({color:16767130,size:.95,map:Ql(`rgba(255,250,230,1)`,`rgba(236,161,72,.35)`),transparent:!0,opacity:.33,depthWrite:!1,blending:2,sizeAttenuation:!0}));xe.frustumCulled=!1,ve.add(xe);let Se=new Float32Array(180),Ce=new lr;Ce.setAttribute(`position`,new Qn(Se,3));let we=new Bi(Ce,new Oi({color:16768432,transparent:!0,opacity:.68,blending:2,depthWrite:!1}));we.frustumCulled=!1,ve.add(we);let Te=[F[2].clone().add(new B(0,1,0)),F[3].clone().add(new B(0,1,0)),F[4].clone().add(new B(0,1,0))],Ee=new lr,De=[],Oe=Ul(888);for(let e=0;e<100;e++)De.push(-7+Oe()*14,-4+Oe()*9,-28+Oe()*28);Ee.setAttribute(`position`,new tr(De,3));let ke=new Ki(Ee,new Vi({color:12900570,size:.012,transparent:!0,opacity:.25,depthWrite:!1,blending:2}));e.add(ke);let Ae=!1,je=!1,Me=!1,Ne=!1,Pe=0,Fe=null,Ie=new B,Le=P.flatMap(e=>e.puffs),Re=F.filter((e,t)=>qd.includes(t)),ze=[new B(0,1.55,.1),new B(.15,1.35,.15),new B(-.2,1.05,.1),new B(.1,1.82,0)],Be=e=>{Ae=e,P.forEach(t=>{t.actor.figure.root.visible=e}),ue.figure.root.visible=e,e||Le.forEach(e=>e.visible=!1)},Ve=e=>{je=e,re.root.visible=e},He=e=>{re.scope.visible=e},Ue=e=>{Me=e,ve.visible=e},We=e=>{Ne=e,ae.forEach(t=>t.visible=e)},Ge=()=>{},Ke=e=>{Fe=e},qe=e=>{let t=Y(e);a.position.y=X(35,-78,t),d.position.copy(a.position),f.position.copy(a.position),f.intensity=X(3.6,.85,Z(t)),f.color.setHSL(X(.1,.055,t),X(.55,.82,t),X(.82,.6,t)),s.material.opacity=X(.55,.2,t),u.material.opacity=X(.4,.12,t)},Je=e=>{if(!Ae)return;let t=267.2,n=e>=t;for(let r of P){let i=r.actor.figure.root;if(!n){i.visible=!1,r.puffs.forEach(e=>e.visible=!1);continue}i.visible=Fe===null||r.victimSlot===Fe;let a=r.index*.1,o=Z(Y((e-(t+a))/10.4)),s=t+a+10.4,c=r.phase,l=new B(Math.sin(e*.37+c)*.055,Math.sin(e*.43+c*1.3)*.075,Math.cos(e*.31+c)*.04);if(e<319.15){Ie.copy(r.start).lerp(r.lineup,o);let t=Math.sin(Math.PI*o)*.9;Ie.y+=t+l.y,Ie.x+=Math.sin(o*Math.PI)*(r.index%2?.5:-.5)+l.x,Ie.z+=l.z,i.position.copy(Ie);let n=Z(Y((e-317.7-r.victimSlot*.12)/1.4));i.rotation.y=(r.victimSlot>=0?-.8:0)*n}else{let t=Z(Y((e-319.15)/5.2)),n=r.lineup.clone().add(l),a=Bd.clone().add(new B((r.index%5-2)*.65,(Math.floor(r.index/4)%3-1)*.4,-r.index*.03));i.position.copy(n).lerp(a,t),i.position.y+=Math.sin(Math.PI*t)*.7;let o=r.victimSlot>=0?-.55:Math.PI;i.rotation.y=X(r.victimSlot>=0?-.8:0,o,Z(Y((e-319.15)/1.25)))}let u=fd(e*.52+c);u.hips=[(u.hips?.[0]??0)+.04*Math.sin(r.index*2.1),(u.hips?.[1]??0)+.04*Math.sin(r.index*1.3+.6),(u.hips?.[2]??0)+.03*Math.sin(r.index*.9+1.4)],u.armR=[(u.armR?.[0]??0)+(r.index%3-1)*.1,u.armR?.[1]??0,(u.armR?.[2]??0)+(r.index%4-1.5)*.05],u.armL=[(u.armL?.[0]??0)+(r.index%4-1.5)*.08,u.armL?.[1]??0,u.armL?.[2]??0],u.neck=[(u.neck?.[0]??0)+r.index%2*.04,(u.neck?.[1]??0)+Math.sin(r.index*1.7)*.1,u.neck?.[2]??0];let d=u,f=r.hitTime;if(f!==null&&e>=f){let t=e-f,n=Z(Y(t/1.5));d={hips:[-.32+Math.sin(t*.7)*.02,.25*n,.08],neck:[-.18,.35*n,.18*n],armR:[-1.4+Math.sin(t*.8)*.1,.16,.7],armL:[-.5+Math.cos(t*.6)*.1,-.28,-.8],legR:[-.65+Math.sin(t*.5)*.08,.13,.18],legL:[-.22,-.1,-.2],lift:1.15+Math.sin(t*.35)*.2}}else if(e>317.15){let t=Z(Y((e-317.15)/1.5)),n=d.armR??[0,0,0],r=d.armL??[0,0,0];d={hips:[-.1,0,0],neck:[.1,.2*Math.sin(e*1.7),0],armR:[X(n[0],-1.8,t),n[1],n[2]],armL:[X(r[0],-1.5,t),r[1],r[2]],legR:Ye(d,`legR`,t),legL:Ye(d,`legL`,t),lift:d.lift}}Ml(r.actor.figure,d);let p=e>280.35?`clear`:`sealed`;if(f!==null&&e>=f&&(p=`bloodied`),r.visorState!==p&&(r.visorState=p,r.actor.setVisor(p)),f!==null){let t=e>f+.2;r.screamed!==t&&(r.screamed=t,r.actor.setScream(t))}let m=e>268&&e<s+.2||e>319.2;r.puffs.forEach((t,n)=>{let a=i.position,o=e>319.2?new B((n-.5)*.25,.2,.7):new B((n-.5)*.25,.2,-.7);t.position.copy(a).add(o),t.visible=m;let s=t.material;s.opacity=m?.16+.07*Math.sin(e*9+r.phase+n):0,t.scale.setScalar(.65+.35*Math.sin(e*5+n+r.phase))})}ue.figure.root.visible=e>279.4&&Fe===null,e>279.4&&Ml(ue.figure,{hips:[-.05,.05,0],neck:[.08,-.45,0],armR:[-1.15,.2,.28],armL:[-.3,-.1,-.35],legR:[-.28,0,.06],legL:[-.18,0,-.06],lift:Math.sin(e*.5)*.1})};function Ye(e,t,n){let r=e[t]??[0,0,0],i=t===`legR`?[-.9,.1,.15]:[-.7,-.1,-.15];return[X(r[0],i[0],n),X(r[1],i[1],n),X(r[2],i[2],n)]}let Xe=e=>{for(let t=0;t<se.length;t++){let n=se[t],r=n.hitTime,i=n.actor.figure.root;for(let a=0;a<4;a++){let o=pe[t*4+a];if(r===null||e<r||Fe!==null&&Fe!==t){o.visible=!1;continue}let s=e-r;o.visible=s<17;let c=ze[a],l=new B(Math.sin(n.phase+a)*.1,.05+a*.02,.1+a*.05).multiplyScalar(Math.min(s,8));o.position.copy(i.position).add(c).add(l);let u=o.material;u.opacity=Math.max(0,.72*(1-s/17))*(.45+.55*Math.sin(Y(s/.4)*Math.PI*.5)),o.scale.setScalar(.34+Math.min(s,7)*.3+a*.1)}}let t=L.attributes.position.array;for(let n=0;n<se.length;n++){let r=se[n],i=r.hitTime,a=r.actor.figure.root;for(let r=0;r<18;r++){let o=n*18+r;if(i===null||e<i){t[o*3]=0,t[o*3+1]=-999,t[o*3+2]=0;continue}let s=Math.max(0,e-i),c=ge[o];if(Fe!==null&&Fe!==n){t[o*3]=0,t[o*3+1]=-999,t[o*3+2]=0;continue}let l=a.position.clone().add(new B(0,1.55,0)),u=Math.min(s,5.5),d=l.addScaledVector(c.dir,.05+c.speed*u*.1);d.y+=Math.sin(s*1.4+r)*.04-Math.min(s,8)*.012,t[o*3]=d.x,t[o*3+1]=d.y,t[o*3+2]=d.z}}L.attributes.position.needsUpdate=!0,I.material.opacity=.9},z=e=>{n.rotation.y=.4+e*55e-5,ne.forEach(t=>{t.rotation.x+=0,t.rotation.y=t.userData.phase??(t.userData.phase=t.rotation.y),t.rotation.y=t.userData.phase+e*t.userData.spin,t.rotation.x=t.userData.spin*e*.7+.2}),ke.rotation.y=e*.0015,b.rotation.z=Math.sin(e*.01)*.0015;let t=.5+.5*Math.sin(e*.6);D.light.intensity=2.4+t*1.1,Pe=Z(Y((e-266.6)/1.8)),D.left.position.x=-.53-Pe*.5,D.right.position.x=.53+Pe*.5;let r=e>266.6;D.indicator.color.setHex(r?7329443:8137245),Je(e),Xe(e);let i=Z(Y((e-271)/24));qe(i),d.position.copy(a.position),d.quaternion.copy(a.quaternion),re.setFlash(0);let o=0;for(let t of fl){let n=e-t;n>=-.02&&n<.075&&(o=Math.max(o,1-Math.abs(n)/.075))}if(re.setFlash(o),ie.intensity=o*40,je&&(re.flash.visible=!0),Me){let t=ye.attributes.position.array,n=Ce.attributes.position.array,r=N.figure.root.position.clone().add(new B(.04,1.36,-.24));for(let i=0;i<30;i++){let a=fl[i],o=Y((e-a)/9.98),s=Te[Math.min(2,Math.floor(i/10))],c=Y((e-a-.46)/9.98),l=X(r.x,s.x,o),u=X(r.y,s.y,o),d=X(r.z,s.z,o);t[i*3]=l,t[i*3+1]=u,t[i*3+2]=d;let f=X(r.x,s.x,c),p=X(r.y,s.y,c),m=X(r.z,s.z,c);n[i*6]=f,n[i*6+1]=p,n[i*6+2]=m,n[i*6+3]=l,n[i*6+4]=u,n[i*6+5]=d}ye.attributes.position.needsUpdate=!0,Ce.attributes.position.needsUpdate=!0}ae.forEach((t,n)=>{let r=t.material,i=n===ae.length-1;r.opacity=Ne?i?.12:.16+.05*Math.sin(e*7.2+n):0,i?t.scale.setScalar(18+2*Math.sin(e*2.3)):t.scale.setScalar(9.5+1.8*Math.sin(e*5+n))})};return z(0),Be(!1),Ve(!1),He(!1),Ue(!1),{group:e,zhang:N,gun:re,airlockGlobal:Bd.clone(),targetGlobals:Re.map(e=>e.clone().add(new B(0,1,0))),zhangMuzzle:re.muzzle,update:z,setCrewVisible:Be,setGunVisible:Ve,setScopeVisible:He,setBulletsVisible:Ue,setZhangJets:We,setSunset:qe,setVisorClear:Ge,getVictimPoint(e){return se[Math.max(0,Math.min(se.length-1,e))].actor.figure.root.position.clone().add(new B(0,1.42,0))},setSoloVictim:Ke}}function ef(){let e=[665149,1062479,1526371,732229],t=[4086594,7496260,9074513,3100741],n=[13819868,11913672],r=new W(Rl(34,(r,i,a,o)=>{let s=(r+.5-72/2)/34,c=(i+.5-72/2)/34,l=(a+.5-72/2)/34;return Math.abs(c)>.88?n[Math.abs(r+a)%n.length]:Math.sin(s*5.1+1.2)*Math.cos(l*4.2-.8)+Math.sin(s*l*9.3)*.3>.17?t[Math.abs((r*3+a*5)%t.length)]:o>.99?7118761:e[Math.abs((r*5+a*7)%e.length)]},{voxel:.42,anchor:`center`}),new K({vertexColors:!0,roughness:.92,metalness:0,emissive:532525,emissiveIntensity:.8}));return r.position.set(-9.2,-14,-32),r.rotation.z=.22,r}function tf(){let e=new G;e.name=`first-base`,e.visible=!1;let t=new K({map:Xl([2,2]),color:4807262,roughness:.8,metalness:.1}),n=new K({map:Xl([3,3]),color:3160893,roughness:.7,metalness:.2}),r=new K({color:2108462,roughness:.55,metalness:.5}),i=new K({color:8095619,roughness:.65,metalness:.25});Q(e,[6,.2,6.3],[0,-.1,.3],n,{castShadow:!1}),Q(e,[6,.2,6.3],[0,3.05,.3],r,{castShadow:!1}),Q(e,[6,3.1,.22],[0,1.55,-2.85],t),Q(e,[.22,3,6.3],[-3,1.5,.3],t),Q(e,[.22,3,6.3],[3,1.5,.3],t),Q(e,[6,3.1,.22],[0,1.55,3.55],t),Q(e,[1.2,2.7,.24],[-2.4,1.35,-2.85],t),Q(e,[2.7,2.7,.24],[2.35,1.35,-2.85],t),Q(e,[1.9,.66,.24],[-.72,2.72,-2.85],t),Q(e,[1.9,.58,.24],[-.72,.55,-2.85],t),Q(e,[2.2,.16,.4],[-.72,1.15,-2.7],i),Q(e,[2.2,.16,.4],[-.72,2.38,-2.7],i),Q(e,[.16,1.4,.4],[-1.72,1.78,-2.7],i),Q(e,[.16,1.4,.4],[.28,1.78,-2.7],i);let a=Kl(256,160,e=>{e.fillStyle=`#010307`,e.fillRect(0,0,256,160);let t=Ul(1803);for(let n=0;n<55;n++){let n=.3+t()*.7;e.fillStyle=`rgba(${Math.floor(180+n*60)},${Math.floor(205+n*40)},255,${.35+t()*.65})`;let r=t()>.9?2:1;e.fillRect(Math.floor(t()*256),Math.floor(t()*102),r,r)}let n=[`#0a273b`,`#0e344b`,`#15445d`,`#0b2d44`,`#1b5166`];for(let t=0;t<160;t+=6)for(let r=0;r<256;r+=6){let i=r+3-132,a=t+3-236,o=Math.sqrt(i*i+a*a);if(o>166)continue;let s=Math.sin(r*.042+t*.03)+Math.cos(r*.021-t*.046),c=n[Math.abs((r+t*3)%n.length)];s>1.18&&o<150?c=`#48654e`:s>1.35&&o<146&&(c=`#806d4b`),o>152&&(c=`#9fd6df`),s>.6&&o>140&&(c=`#86b7bd`),e.fillStyle=c,e.fillRect(r,t,6,6)}let r=e.createLinearGradient(0,48,0,105);r.addColorStop(0,`rgba(90,162,190,0)`),r.addColorStop(.7,`rgba(112,194,214,.28)`),r.addColorStop(1,`rgba(231,205,159,.6)`),e.fillStyle=r,e.fillRect(0,48,256,62),e.fillStyle=`rgba(255,229,182,.85)`,e.fillRect(222,74,5,5),e.fillStyle=`rgba(255,202,112,.16)`,e.fillRect(214,70,20,20)},{nearest:!0,anisotropy:4}),o=new W(new Zi(2.12,1.33),new U({map:a,toneMapped:!1}));o.position.set(-.72,1.77,-2.71),e.add(o);let s=new W(new Zi(1.9,1.18),new $i({color:11193816,transparent:!0,opacity:.1,roughness:.04,metalness:.1,depthWrite:!1,side:2}));s.position.set(-.72,1.77,-2.69),e.add(s),Q(e,[2,.34,.9],[-1.9,.28,2.55],r),Q(e,[1.9,.1,.82],[-1.9,.48,2.55],new K({color:5923419,roughness:.95})),Q(e,[.4,.22,.35],[-2.4,.62,2.4],i),Q(e,[1.45,.08,.75],[1.65,.84,1.85],i);for(let[t,n]of[[1,1.55],[2.3,1.55],[1,2.15],[2.3,2.15]])Q(e,[.06,.8,.06],[t,.42,n],r);Q(e,[.65,1.9,.66],[2.45,.95,2.85],r),Q(e,[.5,.04,.06],[2.45,1.32,2.5],i,{castShadow:!1}),Q(e,[.5,.09,.34],[1.55,.91,1.78],new K({color:1711646,metalness:.4,roughness:.5}),{castShadow:!1}),Q(e,[.42,.03,.26],[1.55,.97,1.78],new K({color:4014906,roughness:.8}),{castShadow:!1});let c=pd(2,812,!0);c.scale.setScalar(.38),c.position.set(1.48,1.03,1.79),e.add(c);let l=new W(new Cr(.025,.09,.025),new K({color:8020796,metalness:.65,roughness:.35}));l.position.set(1.65,1.02,1.75),l.rotation.z=.7,e.add(l);let u=fu([`黄河站遭遇微陨石雨`,`五名宇航员遇难`,`无工质推进项目重新论证`,`事故原因调查中`]);Q(e,[1.88,1.55,.22],[1.96,1.8,-2.7],r);let d=cu(e,[1.62,1.29],[1.96,1.82,-2.57],new U({map:u,toneMapped:!1}));d.name=`news-screen`;let f=new Oa(9093060,3.8,5.2,2);f.position.set(1.6,1.7,-1.5),e.add(f),Q(e,[1.7,.025,.05],[1.96,2.52,-2.5],new U({color:9026228,toneMapped:!1}),{castShadow:!1});for(let t of[-1.8,.3,2.45])Q(e,[6,.12,.12],[0,2.82,t],i,{castShadow:!1}),Q(e,[.12,.12,6],[-1.4,2.84,.3],i,{castShadow:!1});Q(e,[.65,1.15,.1],[2.18,1.62,3.42],r),Q(e,[.5,.04,.04],[2.18,1.55,3.36],i,{castShadow:!1}),Q(e,[.18,.18,.08],[1.74,1.77,-2.52],new U({color:7313808,toneMapped:!1}),{castShadow:!1});let p=new G;p.position.set(1.9,1.62,2.2),e.add(p),Q(p,[.08,.7,.08],[0,.2,0],r),Q(p,[.34,.2,.22],[0,.55,.02],new K({color:3095094,metalness:.35,roughness:.5}),{rotation:[0,0,.15]}),Q(p,[.24,.02,.16],[0,.45,.02],new U({color:16762497,toneMapped:!1}),{castShadow:!1});let m=new Oa(16761467,2.6,3.4,2);m.position.set(0,.38,0),p.add(m);let h=ru(700,26,92,991,13228511,10401987);h.position.z=-8,e.add(h);let g=ef();e.add(g);let _=eu(7251907,42,.18);_.position.set(-9.2,-1,-31),e.add(_);let v=eu(16768164,18,.18);v.position.set(13,7,-55),e.add(v);let y=tu(3,.035);y.position.set(-.9,1.8,-1.8),e.add(y);let b=new _a(9876151,2764584,.92);e.add(b);let x=new Ca(13820638,104,9,.95,.82,2);x.position.set(-2,3,1.8),x.target.position.set(-.8,1.1,-.5),x.castShadow=!0,x.shadow.mapSize.set(1024,1024),x.shadow.bias=-.0014,e.add(x,x.target);let S=new Oa(6527405,6.5,6,2);S.position.set(-.7,1.8,-2.2),e.add(S);let C=new ja(9682633,.62);C.position.set(4,2,-3),e.add(C);let w=new Oa(16767405,7,4.6,2);w.position.set(1.2,1.75,.85),e.add(w);let T=new ja(5933728,.55);T.position.set(-2,-3,-8),T.target.position.set(-.3,1.2,0),e.add(T,T.target);let E=new lr,D=[],ee=Ul(773);for(let e=0;e<80;e++)D.push(-2.8+ee()*5.6,.2+ee()*2.6,-2.5+ee()*5.2);E.setAttribute(`position`,new tr(D,3));let O=new Ki(E,new Vi({color:13162706,size:.02,transparent:!0,opacity:.16,depthWrite:!1}));e.add(O);let k=td();k.setUniform(),k.figure.root.position.set(-.35,0,-.1),k.figure.root.rotation.y=Math.PI,e.add(k.figure.root);let A=(e,t)=>{let n=.97+Math.sin(e*1.3)*.015+Math.sin(e*17.3)*.004;f.intensity=3.6*n,m.intensity=2.6*(.98+Math.sin(e*.7)*.02),y.position.x=-.9+Math.sin(e*.1)*.1,O.position.y=Math.sin(e*.07)*.05,g.rotation.z=.22+Math.sin(e*.01)*.01;let r=Z(Y((e-339.8)/2.4));k.figure.root.rotation.y=Math.PI*(1-r)};return A(337,0),{group:e,zhang:k,update:A,screenLight:f}}await new Promise(e=>requestAnimationFrame(()=>e()));function nf(e){let t=document.getElementById(e);if(!t)throw Error(`Missing element #${e}`);return t}function rf(){let e=document.getElementById(`grain`);if(!e)return;let t=document.createElement(`canvas`);t.width=128,t.height=128;let n=t.getContext(`2d`);if(!n)return;let r=n.createImageData(128,128),i=1779033703;for(let e=0;e<r.data.length;e+=4){i=Math.imul(i^i>>>15,739982445)+2654435769>>>0;let t=i>>>11&255;r.data[e]=t,r.data[e+1]=t,r.data[e+2]=t,r.data[e+3]=42+(i>>>19&63)}n.putImageData(r,0,0),e.style.backgroundImage=`url(${t.toDataURL(`image/png`)})`,e.style.backgroundSize=`128px 128px`}var af=new Wr;af.background=null;var of=new Ir(40,16/9,.02,1400);of.position.set(0,1.5,5),af.add(of);var sf=new Zc({antialias:!0,alpha:!0,powerPreference:`high-performance`});sf.setClearColor(0,0),sf.outputColorSpace=Ne,sf.toneMapping=4,sf.toneMappingExposure=1.16,sf.shadowMap.enabled=!0,sf.shadowMap.type=2,sf.domElement.setAttribute(`aria-label`,`陨石子弹，Three.js 体素电影画面`);var cf=xd(),lf=Sd(),uf=kd(),df=Md(),ff=Ld(),pf=$d(),mf=tf(),hf=[cf.group,lf.group,uf.group,df.group,ff.group,pf.group,mf.group];for(let e of hf)e.visible=!1,af.add(e);var gf={scene:af,camera:of,worlds:{prologue:cf,hutong:lf,collector:uf,workshop:df,basement:ff,space:pf,base:mf}};ol(pl,356);var _f=new sl({duration:356,context:gf,shots:vd(),cues:[...pl,...ml]}),vf=new el(_f);Lu(vf),vf.setMasterGain(.8),vf.setGroupGain(`amb`,.78),vf.setGroupGain(`score`,.7),vf.setGroupGain(`sfx`,.95),vf.setGroupGain(`suit`,.84),vf.setGroupGain(`radio`,.82),vf.setGroupGain(`space`,.55);var yf=new cl({player:_f,renderer:sf,scene:af,camera:()=>of,container:nf(`stage`),maxPixelRatio:Math.min(2,window.devicePixelRatio||1)}),bf=dl({player:_f,audio:vf,showFullscreen:!0}),xf=nf(`film-title`),Sf=nf(`place-card`),Cf=nf(`place-index`),wf=nf(`place-title`),Tf=nf(`place-sub`),Ef=nf(`scope`),Df=nf(`end-card`),Of=nf(`start-prompt`),kf=nf(`start-button`),Af=nf(`boot`),jf=!1,Mf=``,Nf=[{from:11,to:19.2,index:`01`,title:`北京 · 胡同深处`,sub:`危机纪元十二年 · 深秋`},{from:110,to:118.2,index:`02`,title:`太空军研究所 · 模型车间`,sub:`凌晨 02:40 / 禁止记录`},{from:156.3,to:164,index:`03`,title:`地下七层`,sub:`未登记设施 / 声音比光先到`},{from:234.8,to:243.6,index:`04`,title:`地球同步轨道`,sub:`黄河空间站 / 距地三万六千公里`},{from:337.6,to:344.6,index:`05`,title:`一号基地 · 返航后`,sub:`同一时刻，太空重归寂静`}];function Pf(e){if(!e){Sf.classList.remove(`is-visible`),Mf=``;return}let t=`${e.from}-${e.title}`;Mf!==t&&(Cf.textContent=e.index,wf.textContent=e.title,Tf.textContent=e.sub,Mf=t),Sf.classList.add(`is-visible`)}function Ff(e){let t=e>=0&&e<8.85;xf.classList.toggle(`is-visible`,t);let n=null;for(let t of Nf)if(e>=t.from&&e<t.to){n=t;break}Pf(n),Ef.classList.toggle(`is-visible`,e>=311.2&&e<315),Df.classList.toggle(`is-visible`,e>=347),(jf||_f.currentTime>.08)&&Of.classList.add(`is-hidden`)}function If(){Af.classList.add(`is-hidden`),window.setTimeout(()=>Af.remove(),1350)}function Lf(){jf=!0,Of.classList.add(`is-hidden`),vf.unlock().then(()=>{_f.play()})}kf.addEventListener(`click`,Lf),_f.addTypedEventListener(`statechange`,e=>{e.detail.state===`playing`&&(jf=!0,Of.classList.add(`is-hidden`))}),window.addEventListener(`keydown`,e=>{e.code===`Space`?(e.preventDefault(),_f.isPlaying?_f.pause():jf?vf.unlock().then(()=>_f.play()):Lf()):e.code===`ArrowRight`?_f.seek(Math.min(_f.duration,_f.currentTime+10)):e.code===`ArrowLeft`&&_f.seek(Math.max(0,_f.currentTime-10))}),_f.addTypedEventListener(`frame`,e=>{Ff(e.detail.time)}),rf(),Ff(0),_f.refresh(),window.setTimeout(If,180),window.__meteorBullets={player:_f,audio:vf,stage:yf,controls:bf,scene:af,camera:of,voices:pl,sounds:ml,fireTimes:fl,duration:356},window.addEventListener(`beforeunload`,()=>{bf.destroy(),yf.destroy(),vf.destroy(),_f.destroy()});
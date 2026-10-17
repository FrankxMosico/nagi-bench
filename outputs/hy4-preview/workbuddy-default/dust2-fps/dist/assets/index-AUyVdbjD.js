var I_=Object.defineProperty;var D_=(t,e,n)=>e in t?I_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var te=(t,e,n)=>D_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var T0={exports:{}},dc={},A0={exports:{}},Oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fa=Symbol.for("react.element"),N_=Symbol.for("react.portal"),U_=Symbol.for("react.fragment"),k_=Symbol.for("react.strict_mode"),z_=Symbol.for("react.profiler"),F_=Symbol.for("react.provider"),O_=Symbol.for("react.context"),B_=Symbol.for("react.forward_ref"),H_=Symbol.for("react.suspense"),G_=Symbol.for("react.memo"),V_=Symbol.for("react.lazy"),$h=Symbol.iterator;function W_(t){return t===null||typeof t!="object"?null:(t=$h&&t[$h]||t["@@iterator"],typeof t=="function"?t:null)}var b0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C0=Object.assign,R0={};function $s(t,e,n){this.props=t,this.context=e,this.refs=R0,this.updater=n||b0}$s.prototype.isReactComponent={};$s.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};$s.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function P0(){}P0.prototype=$s.prototype;function Nd(t,e,n){this.props=t,this.context=e,this.refs=R0,this.updater=n||b0}var Ud=Nd.prototype=new P0;Ud.constructor=Nd;C0(Ud,$s.prototype);Ud.isPureReactComponent=!0;var Kh=Array.isArray,L0=Object.prototype.hasOwnProperty,kd={current:null},I0={key:!0,ref:!0,__self:!0,__source:!0};function D0(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)L0.call(e,i)&&!I0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:fa,type:t,key:s,ref:o,props:r,_owner:kd.current}}function X_(t,e){return{$$typeof:fa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function zd(t){return typeof t=="object"&&t!==null&&t.$$typeof===fa}function j_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Zh=/\/+/g;function Oc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?j_(""+t.key):e.toString(36)}function fl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case fa:case N_:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Oc(o,0):i,Kh(r)?(n="",t!=null&&(n=t.replace(Zh,"$&/")+"/"),fl(r,e,n,"",function(c){return c})):r!=null&&(zd(r)&&(r=X_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Zh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Kh(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Oc(s,a);o+=fl(s,e,n,l,r)}else if(l=W_(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Oc(s,a++),o+=fl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Sa(t,e,n){if(t==null)return t;var i=[],r=0;return fl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function q_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var sn={current:null},dl={transition:null},Y_={ReactCurrentDispatcher:sn,ReactCurrentBatchConfig:dl,ReactCurrentOwner:kd};function N0(){throw Error("act(...) is not supported in production builds of React.")}Oe.Children={map:Sa,forEach:function(t,e,n){Sa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Sa(t,function(){e++}),e},toArray:function(t){return Sa(t,function(e){return e})||[]},only:function(t){if(!zd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Oe.Component=$s;Oe.Fragment=U_;Oe.Profiler=z_;Oe.PureComponent=Nd;Oe.StrictMode=k_;Oe.Suspense=H_;Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y_;Oe.act=N0;Oe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=C0({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=kd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)L0.call(e,l)&&!I0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:fa,type:t.type,key:r,ref:s,props:i,_owner:o}};Oe.createContext=function(t){return t={$$typeof:O_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:F_,_context:t},t.Consumer=t};Oe.createElement=D0;Oe.createFactory=function(t){var e=D0.bind(null,t);return e.type=t,e};Oe.createRef=function(){return{current:null}};Oe.forwardRef=function(t){return{$$typeof:B_,render:t}};Oe.isValidElement=zd;Oe.lazy=function(t){return{$$typeof:V_,_payload:{_status:-1,_result:t},_init:q_}};Oe.memo=function(t,e){return{$$typeof:G_,type:t,compare:e===void 0?null:e}};Oe.startTransition=function(t){var e=dl.transition;dl.transition={};try{t()}finally{dl.transition=e}};Oe.unstable_act=N0;Oe.useCallback=function(t,e){return sn.current.useCallback(t,e)};Oe.useContext=function(t){return sn.current.useContext(t)};Oe.useDebugValue=function(){};Oe.useDeferredValue=function(t){return sn.current.useDeferredValue(t)};Oe.useEffect=function(t,e){return sn.current.useEffect(t,e)};Oe.useId=function(){return sn.current.useId()};Oe.useImperativeHandle=function(t,e,n){return sn.current.useImperativeHandle(t,e,n)};Oe.useInsertionEffect=function(t,e){return sn.current.useInsertionEffect(t,e)};Oe.useLayoutEffect=function(t,e){return sn.current.useLayoutEffect(t,e)};Oe.useMemo=function(t,e){return sn.current.useMemo(t,e)};Oe.useReducer=function(t,e,n){return sn.current.useReducer(t,e,n)};Oe.useRef=function(t){return sn.current.useRef(t)};Oe.useState=function(t){return sn.current.useState(t)};Oe.useSyncExternalStore=function(t,e,n){return sn.current.useSyncExternalStore(t,e,n)};Oe.useTransition=function(){return sn.current.useTransition()};Oe.version="18.3.1";A0.exports=Oe;var je=A0.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $_=je,K_=Symbol.for("react.element"),Z_=Symbol.for("react.fragment"),Q_=Object.prototype.hasOwnProperty,J_=$_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ex={key:!0,ref:!0,__self:!0,__source:!0};function U0(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)Q_.call(e,i)&&!ex.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:K_,type:t,key:s,ref:o,props:r,_owner:J_.current}}dc.Fragment=Z_;dc.jsx=U0;dc.jsxs=U0;T0.exports=dc;var P=T0.exports,k0={exports:{}},Cn={},z0={exports:{}},F0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(L,$){var K=L.length;L.push($);e:for(;0<K;){var ne=K-1>>>1,we=L[ne];if(0<r(we,$))L[ne]=$,L[K]=we,K=ne;else break e}}function n(L){return L.length===0?null:L[0]}function i(L){if(L.length===0)return null;var $=L[0],K=L.pop();if(K!==$){L[0]=K;e:for(var ne=0,we=L.length,ze=we>>>1;ne<ze;){var Y=2*(ne+1)-1,ie=L[Y],de=Y+1,ce=L[de];if(0>r(ie,K))de<we&&0>r(ce,ie)?(L[ne]=ce,L[de]=K,ne=de):(L[ne]=ie,L[Y]=K,ne=Y);else if(de<we&&0>r(ce,K))L[ne]=ce,L[de]=K,ne=de;else break e}}return $}function r(L,$){var K=L.sortIndex-$.sortIndex;return K!==0?K:L.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,d=null,f=3,p=!1,g=!1,x=!1,m=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(L){for(var $=n(c);$!==null;){if($.callback===null)i(c);else if($.startTime<=L)i(c),$.sortIndex=$.expirationTime,e(l,$);else break;$=n(c)}}function S(L){if(x=!1,_(L),!g)if(n(l)!==null)g=!0,z(C);else{var $=n(c);$!==null&&q(S,$.startTime-L)}}function C(L,$){g=!1,x&&(x=!1,h(b),b=-1),p=!0;var K=f;try{for(_($),d=n(l);d!==null&&(!(d.expirationTime>$)||L&&!M());){var ne=d.callback;if(typeof ne=="function"){d.callback=null,f=d.priorityLevel;var we=ne(d.expirationTime<=$);$=t.unstable_now(),typeof we=="function"?d.callback=we:d===n(l)&&i(l),_($)}else i(l);d=n(l)}if(d!==null)var ze=!0;else{var Y=n(c);Y!==null&&q(S,Y.startTime-$),ze=!1}return ze}finally{d=null,f=K,p=!1}}var A=!1,T=null,b=-1,H=5,y=-1;function M(){return!(t.unstable_now()-y<H)}function D(){if(T!==null){var L=t.unstable_now();y=L;var $=!0;try{$=T(!0,L)}finally{$?U():(A=!1,T=null)}}else A=!1}var U;if(typeof v=="function")U=function(){v(D)};else if(typeof MessageChannel<"u"){var O=new MessageChannel,X=O.port2;O.port1.onmessage=D,U=function(){X.postMessage(null)}}else U=function(){m(D,0)};function z(L){T=L,A||(A=!0,U())}function q(L,$){b=m(function(){L(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(L){L.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,z(C))},t.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<L?Math.floor(1e3/L):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(L){switch(f){case 1:case 2:case 3:var $=3;break;default:$=f}var K=f;f=$;try{return L()}finally{f=K}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(L,$){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var K=f;f=L;try{return $()}finally{f=K}},t.unstable_scheduleCallback=function(L,$,K){var ne=t.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ne+K:ne):K=ne,L){case 1:var we=-1;break;case 2:we=250;break;case 5:we=1073741823;break;case 4:we=1e4;break;default:we=5e3}return we=K+we,L={id:u++,callback:$,priorityLevel:L,startTime:K,expirationTime:we,sortIndex:-1},K>ne?(L.sortIndex=K,e(c,L),n(l)===null&&L===n(c)&&(x?(h(b),b=-1):x=!0,q(S,K-ne))):(L.sortIndex=we,e(l,L),g||p||(g=!0,z(C))),L},t.unstable_shouldYield=M,t.unstable_wrapCallback=function(L){var $=f;return function(){var K=f;f=$;try{return L.apply(this,arguments)}finally{f=K}}}})(F0);z0.exports=F0;var tx=z0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nx=je,bn=tx;function re(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var O0=new Set,Xo={};function Xr(t,e){ks(t,e),ks(t+"Capture",e)}function ks(t,e){for(Xo[t]=e,t=0;t<e.length;t++)O0.add(e[t])}var Ri=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zu=Object.prototype.hasOwnProperty,ix=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Qh={},Jh={};function rx(t){return Zu.call(Jh,t)?!0:Zu.call(Qh,t)?!1:ix.test(t)?Jh[t]=!0:(Qh[t]=!0,!1)}function sx(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function ox(t,e,n,i){if(e===null||typeof e>"u"||sx(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function on(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xt[t]=new on(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xt[e]=new on(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xt[t]=new on(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xt[t]=new on(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xt[t]=new on(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xt[t]=new on(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xt[t]=new on(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xt[t]=new on(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xt[t]=new on(t,5,!1,t.toLowerCase(),null,!1,!1)});var Fd=/[\-:]([a-z])/g;function Od(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Fd,Od);Xt[e]=new on(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Fd,Od);Xt[e]=new on(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Fd,Od);Xt[e]=new on(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xt[t]=new on(t,1,!1,t.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new on("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xt[t]=new on(t,1,!1,t.toLowerCase(),null,!0,!0)});function Bd(t,e,n,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(ox(e,n,r,i)&&(n=null),i||r===null?rx(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ni=nx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ma=Symbol.for("react.element"),ds=Symbol.for("react.portal"),hs=Symbol.for("react.fragment"),Hd=Symbol.for("react.strict_mode"),Qu=Symbol.for("react.profiler"),B0=Symbol.for("react.provider"),H0=Symbol.for("react.context"),Gd=Symbol.for("react.forward_ref"),Ju=Symbol.for("react.suspense"),ef=Symbol.for("react.suspense_list"),Vd=Symbol.for("react.memo"),Vi=Symbol.for("react.lazy"),G0=Symbol.for("react.offscreen"),ep=Symbol.iterator;function ro(t){return t===null||typeof t!="object"?null:(t=ep&&t[ep]||t["@@iterator"],typeof t=="function"?t:null)}var St=Object.assign,Bc;function Co(t){if(Bc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Bc=e&&e[1]||""}return`
`+Bc+t}var Hc=!1;function Gc(t,e){if(!t||Hc)return"";Hc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Hc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Co(t):""}function ax(t){switch(t.tag){case 5:return Co(t.type);case 16:return Co("Lazy");case 13:return Co("Suspense");case 19:return Co("SuspenseList");case 0:case 2:case 15:return t=Gc(t.type,!1),t;case 11:return t=Gc(t.type.render,!1),t;case 1:return t=Gc(t.type,!0),t;default:return""}}function tf(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case hs:return"Fragment";case ds:return"Portal";case Qu:return"Profiler";case Hd:return"StrictMode";case Ju:return"Suspense";case ef:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case H0:return(t.displayName||"Context")+".Consumer";case B0:return(t._context.displayName||"Context")+".Provider";case Gd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Vd:return e=t.displayName||null,e!==null?e:tf(t.type)||"Memo";case Vi:e=t._payload,t=t._init;try{return tf(t(e))}catch{}}return null}function lx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return tf(e);case 8:return e===Hd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function V0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function cx(t){var e=V0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ea(t){t._valueTracker||(t._valueTracker=cx(t))}function W0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=V0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Il(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function nf(t,e){var n=e.checked;return St({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function tp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function X0(t,e){e=e.checked,e!=null&&Bd(t,"checked",e,!1)}function rf(t,e){X0(t,e);var n=cr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?sf(t,e.type,n):e.hasOwnProperty("defaultValue")&&sf(t,e.type,cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function np(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function sf(t,e,n){(e!=="number"||Il(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ro=Array.isArray;function Ts(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+cr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function of(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(re(91));return St({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ip(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(re(92));if(Ro(n)){if(1<n.length)throw Error(re(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:cr(n)}}function j0(t,e){var n=cr(e.value),i=cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function rp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function q0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function af(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?q0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var wa,Y0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(wa=wa||document.createElement("div"),wa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=wa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function jo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var No={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ux=["Webkit","ms","Moz","O"];Object.keys(No).forEach(function(t){ux.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),No[e]=No[t]})});function $0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||No.hasOwnProperty(t)&&No[t]?(""+e).trim():e+"px"}function K0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=$0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var fx=St({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function lf(t,e){if(e){if(fx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(re(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(re(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(re(61))}if(e.style!=null&&typeof e.style!="object")throw Error(re(62))}}function cf(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var uf=null;function Wd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ff=null,As=null,bs=null;function sp(t){if(t=pa(t)){if(typeof ff!="function")throw Error(re(280));var e=t.stateNode;e&&(e=vc(e),ff(t.stateNode,t.type,e))}}function Z0(t){As?bs?bs.push(t):bs=[t]:As=t}function Q0(){if(As){var t=As,e=bs;if(bs=As=null,sp(t),e)for(t=0;t<e.length;t++)sp(e[t])}}function J0(t,e){return t(e)}function eg(){}var Vc=!1;function tg(t,e,n){if(Vc)return t(e,n);Vc=!0;try{return J0(t,e,n)}finally{Vc=!1,(As!==null||bs!==null)&&(eg(),Q0())}}function qo(t,e){var n=t.stateNode;if(n===null)return null;var i=vc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(re(231,e,typeof n));return n}var df=!1;if(Ri)try{var so={};Object.defineProperty(so,"passive",{get:function(){df=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{df=!1}function dx(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var Uo=!1,Dl=null,Nl=!1,hf=null,hx={onError:function(t){Uo=!0,Dl=t}};function px(t,e,n,i,r,s,o,a,l){Uo=!1,Dl=null,dx.apply(hx,arguments)}function mx(t,e,n,i,r,s,o,a,l){if(px.apply(this,arguments),Uo){if(Uo){var c=Dl;Uo=!1,Dl=null}else throw Error(re(198));Nl||(Nl=!0,hf=c)}}function jr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function ng(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function op(t){if(jr(t)!==t)throw Error(re(188))}function gx(t){var e=t.alternate;if(!e){if(e=jr(t),e===null)throw Error(re(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return op(r),t;if(s===i)return op(r),e;s=s.sibling}throw Error(re(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(re(189))}}if(n.alternate!==i)throw Error(re(190))}if(n.tag!==3)throw Error(re(188));return n.stateNode.current===n?t:e}function ig(t){return t=gx(t),t!==null?rg(t):null}function rg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=rg(t);if(e!==null)return e;t=t.sibling}return null}var sg=bn.unstable_scheduleCallback,ap=bn.unstable_cancelCallback,vx=bn.unstable_shouldYield,_x=bn.unstable_requestPaint,bt=bn.unstable_now,xx=bn.unstable_getCurrentPriorityLevel,Xd=bn.unstable_ImmediatePriority,og=bn.unstable_UserBlockingPriority,Ul=bn.unstable_NormalPriority,yx=bn.unstable_LowPriority,ag=bn.unstable_IdlePriority,hc=null,di=null;function Sx(t){if(di&&typeof di.onCommitFiberRoot=="function")try{di.onCommitFiberRoot(hc,t,void 0,(t.current.flags&128)===128)}catch{}}var ti=Math.clz32?Math.clz32:wx,Mx=Math.log,Ex=Math.LN2;function wx(t){return t>>>=0,t===0?32:31-(Mx(t)/Ex|0)|0}var Ta=64,Aa=4194304;function Po(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function kl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Po(a):(s&=o,s!==0&&(i=Po(s)))}else o=n&~r,o!==0?i=Po(o):s!==0&&(i=Po(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ti(e),r=1<<n,i|=t[n],e&=~r;return i}function Tx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ax(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ti(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Tx(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function pf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function lg(){var t=Ta;return Ta<<=1,!(Ta&4194240)&&(Ta=64),t}function Wc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function da(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ti(e),t[e]=n}function bx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ti(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function jd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ti(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var nt=0;function cg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ug,qd,fg,dg,hg,mf=!1,ba=[],Ji=null,er=null,tr=null,Yo=new Map,$o=new Map,Xi=[],Cx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function lp(t,e){switch(t){case"focusin":case"focusout":Ji=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":Yo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":$o.delete(e.pointerId)}}function oo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=pa(e),e!==null&&qd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Rx(t,e,n,i,r){switch(e){case"focusin":return Ji=oo(Ji,t,e,n,i,r),!0;case"dragenter":return er=oo(er,t,e,n,i,r),!0;case"mouseover":return tr=oo(tr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Yo.set(s,oo(Yo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,$o.set(s,oo($o.get(s)||null,t,e,n,i,r)),!0}return!1}function pg(t){var e=Lr(t.target);if(e!==null){var n=jr(e);if(n!==null){if(e=n.tag,e===13){if(e=ng(n),e!==null){t.blockedOn=e,hg(t.priority,function(){fg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=gf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);uf=i,n.target.dispatchEvent(i),uf=null}else return e=pa(n),e!==null&&qd(e),t.blockedOn=n,!1;e.shift()}return!0}function cp(t,e,n){hl(t)&&n.delete(e)}function Px(){mf=!1,Ji!==null&&hl(Ji)&&(Ji=null),er!==null&&hl(er)&&(er=null),tr!==null&&hl(tr)&&(tr=null),Yo.forEach(cp),$o.forEach(cp)}function ao(t,e){t.blockedOn===e&&(t.blockedOn=null,mf||(mf=!0,bn.unstable_scheduleCallback(bn.unstable_NormalPriority,Px)))}function Ko(t){function e(r){return ao(r,t)}if(0<ba.length){ao(ba[0],t);for(var n=1;n<ba.length;n++){var i=ba[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Ji!==null&&ao(Ji,t),er!==null&&ao(er,t),tr!==null&&ao(tr,t),Yo.forEach(e),$o.forEach(e),n=0;n<Xi.length;n++)i=Xi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Xi.length&&(n=Xi[0],n.blockedOn===null);)pg(n),n.blockedOn===null&&Xi.shift()}var Cs=Ni.ReactCurrentBatchConfig,zl=!0;function Lx(t,e,n,i){var r=nt,s=Cs.transition;Cs.transition=null;try{nt=1,Yd(t,e,n,i)}finally{nt=r,Cs.transition=s}}function Ix(t,e,n,i){var r=nt,s=Cs.transition;Cs.transition=null;try{nt=4,Yd(t,e,n,i)}finally{nt=r,Cs.transition=s}}function Yd(t,e,n,i){if(zl){var r=gf(t,e,n,i);if(r===null)eu(t,e,i,Fl,n),lp(t,i);else if(Rx(r,t,e,n,i))i.stopPropagation();else if(lp(t,i),e&4&&-1<Cx.indexOf(t)){for(;r!==null;){var s=pa(r);if(s!==null&&ug(s),s=gf(t,e,n,i),s===null&&eu(t,e,i,Fl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else eu(t,e,i,null,n)}}var Fl=null;function gf(t,e,n,i){if(Fl=null,t=Wd(i),t=Lr(t),t!==null)if(e=jr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=ng(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Fl=t,null}function mg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(xx()){case Xd:return 1;case og:return 4;case Ul:case yx:return 16;case ag:return 536870912;default:return 16}default:return 16}}var $i=null,$d=null,pl=null;function gg(){if(pl)return pl;var t,e=$d,n=e.length,i,r="value"in $i?$i.value:$i.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return pl=r.slice(t,1<i?1-i:void 0)}function ml(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ca(){return!0}function up(){return!1}function Rn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ca:up,this.isPropagationStopped=up,this}return St(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ca)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ca)},persist:function(){},isPersistent:Ca}),e}var Ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kd=Rn(Ks),ha=St({},Ks,{view:0,detail:0}),Dx=Rn(ha),Xc,jc,lo,pc=St({},ha,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==lo&&(lo&&t.type==="mousemove"?(Xc=t.screenX-lo.screenX,jc=t.screenY-lo.screenY):jc=Xc=0,lo=t),Xc)},movementY:function(t){return"movementY"in t?t.movementY:jc}}),fp=Rn(pc),Nx=St({},pc,{dataTransfer:0}),Ux=Rn(Nx),kx=St({},ha,{relatedTarget:0}),qc=Rn(kx),zx=St({},Ks,{animationName:0,elapsedTime:0,pseudoElement:0}),Fx=Rn(zx),Ox=St({},Ks,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Bx=Rn(Ox),Hx=St({},Ks,{data:0}),dp=Rn(Hx),Gx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Vx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Wx[t])?!!e[t]:!1}function Zd(){return Xx}var jx=St({},ha,{key:function(t){if(t.key){var e=Gx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ml(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Vx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zd,charCode:function(t){return t.type==="keypress"?ml(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ml(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),qx=Rn(jx),Yx=St({},pc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hp=Rn(Yx),$x=St({},ha,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zd}),Kx=Rn($x),Zx=St({},Ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qx=Rn(Zx),Jx=St({},pc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ey=Rn(Jx),ty=[9,13,27,32],Qd=Ri&&"CompositionEvent"in window,ko=null;Ri&&"documentMode"in document&&(ko=document.documentMode);var ny=Ri&&"TextEvent"in window&&!ko,vg=Ri&&(!Qd||ko&&8<ko&&11>=ko),pp=" ",mp=!1;function _g(t,e){switch(t){case"keyup":return ty.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ps=!1;function iy(t,e){switch(t){case"compositionend":return xg(e);case"keypress":return e.which!==32?null:(mp=!0,pp);case"textInput":return t=e.data,t===pp&&mp?null:t;default:return null}}function ry(t,e){if(ps)return t==="compositionend"||!Qd&&_g(t,e)?(t=gg(),pl=$d=$i=null,ps=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return vg&&e.locale!=="ko"?null:e.data;default:return null}}var sy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!sy[t.type]:e==="textarea"}function yg(t,e,n,i){Z0(i),e=Ol(e,"onChange"),0<e.length&&(n=new Kd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var zo=null,Zo=null;function oy(t){Lg(t,0)}function mc(t){var e=vs(t);if(W0(e))return t}function ay(t,e){if(t==="change")return e}var Sg=!1;if(Ri){var Yc;if(Ri){var $c="oninput"in document;if(!$c){var vp=document.createElement("div");vp.setAttribute("oninput","return;"),$c=typeof vp.oninput=="function"}Yc=$c}else Yc=!1;Sg=Yc&&(!document.documentMode||9<document.documentMode)}function _p(){zo&&(zo.detachEvent("onpropertychange",Mg),Zo=zo=null)}function Mg(t){if(t.propertyName==="value"&&mc(Zo)){var e=[];yg(e,Zo,t,Wd(t)),tg(oy,e)}}function ly(t,e,n){t==="focusin"?(_p(),zo=e,Zo=n,zo.attachEvent("onpropertychange",Mg)):t==="focusout"&&_p()}function cy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return mc(Zo)}function uy(t,e){if(t==="click")return mc(e)}function fy(t,e){if(t==="input"||t==="change")return mc(e)}function dy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ii=typeof Object.is=="function"?Object.is:dy;function Qo(t,e){if(ii(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Zu.call(e,r)||!ii(t[r],e[r]))return!1}return!0}function xp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function yp(t,e){var n=xp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xp(n)}}function Eg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Eg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function wg(){for(var t=window,e=Il();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Il(t.document)}return e}function Jd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function hy(t){var e=wg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Eg(n.ownerDocument.documentElement,n)){if(i!==null&&Jd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=yp(n,s);var o=yp(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var py=Ri&&"documentMode"in document&&11>=document.documentMode,ms=null,vf=null,Fo=null,_f=!1;function Sp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_f||ms==null||ms!==Il(i)||(i=ms,"selectionStart"in i&&Jd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Fo&&Qo(Fo,i)||(Fo=i,i=Ol(vf,"onSelect"),0<i.length&&(e=new Kd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ms)))}function Ra(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var gs={animationend:Ra("Animation","AnimationEnd"),animationiteration:Ra("Animation","AnimationIteration"),animationstart:Ra("Animation","AnimationStart"),transitionend:Ra("Transition","TransitionEnd")},Kc={},Tg={};Ri&&(Tg=document.createElement("div").style,"AnimationEvent"in window||(delete gs.animationend.animation,delete gs.animationiteration.animation,delete gs.animationstart.animation),"TransitionEvent"in window||delete gs.transitionend.transition);function gc(t){if(Kc[t])return Kc[t];if(!gs[t])return t;var e=gs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Tg)return Kc[t]=e[n];return t}var Ag=gc("animationend"),bg=gc("animationiteration"),Cg=gc("animationstart"),Rg=gc("transitionend"),Pg=new Map,Mp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function hr(t,e){Pg.set(t,e),Xr(e,[t])}for(var Zc=0;Zc<Mp.length;Zc++){var Qc=Mp[Zc],my=Qc.toLowerCase(),gy=Qc[0].toUpperCase()+Qc.slice(1);hr(my,"on"+gy)}hr(Ag,"onAnimationEnd");hr(bg,"onAnimationIteration");hr(Cg,"onAnimationStart");hr("dblclick","onDoubleClick");hr("focusin","onFocus");hr("focusout","onBlur");hr(Rg,"onTransitionEnd");ks("onMouseEnter",["mouseout","mouseover"]);ks("onMouseLeave",["mouseout","mouseover"]);ks("onPointerEnter",["pointerout","pointerover"]);ks("onPointerLeave",["pointerout","pointerover"]);Xr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Lo));function Ep(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,mx(i,e,void 0,t),t.currentTarget=null}function Lg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Ep(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Ep(r,a,c),s=l}}}if(Nl)throw t=hf,Nl=!1,hf=null,t}function ft(t,e){var n=e[Ef];n===void 0&&(n=e[Ef]=new Set);var i=t+"__bubble";n.has(i)||(Ig(e,t,2,!1),n.add(i))}function Jc(t,e,n){var i=0;e&&(i|=4),Ig(n,t,i,e)}var Pa="_reactListening"+Math.random().toString(36).slice(2);function Jo(t){if(!t[Pa]){t[Pa]=!0,O0.forEach(function(n){n!=="selectionchange"&&(vy.has(n)||Jc(n,!1,t),Jc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Pa]||(e[Pa]=!0,Jc("selectionchange",!1,e))}}function Ig(t,e,n,i){switch(mg(e)){case 1:var r=Lx;break;case 4:r=Ix;break;default:r=Yd}n=r.bind(null,e,n,t),r=void 0,!df||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function eu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Lr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}tg(function(){var c=s,u=Wd(n),d=[];e:{var f=Pg.get(t);if(f!==void 0){var p=Kd,g=t;switch(t){case"keypress":if(ml(n)===0)break e;case"keydown":case"keyup":p=qx;break;case"focusin":g="focus",p=qc;break;case"focusout":g="blur",p=qc;break;case"beforeblur":case"afterblur":p=qc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=fp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Ux;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Kx;break;case Ag:case bg:case Cg:p=Fx;break;case Rg:p=Qx;break;case"scroll":p=Dx;break;case"wheel":p=ey;break;case"copy":case"cut":case"paste":p=Bx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=hp}var x=(e&4)!==0,m=!x&&t==="scroll",h=x?f!==null?f+"Capture":null:f;x=[];for(var v=c,_;v!==null;){_=v;var S=_.stateNode;if(_.tag===5&&S!==null&&(_=S,h!==null&&(S=qo(v,h),S!=null&&x.push(ea(v,S,_)))),m)break;v=v.return}0<x.length&&(f=new p(f,g,null,n,u),d.push({event:f,listeners:x}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==uf&&(g=n.relatedTarget||n.fromElement)&&(Lr(g)||g[Pi]))break e;if((p||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Lr(g):null,g!==null&&(m=jr(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(x=fp,S="onMouseLeave",h="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(x=hp,S="onPointerLeave",h="onPointerEnter",v="pointer"),m=p==null?f:vs(p),_=g==null?f:vs(g),f=new x(S,v+"leave",p,n,u),f.target=m,f.relatedTarget=_,S=null,Lr(u)===c&&(x=new x(h,v+"enter",g,n,u),x.target=_,x.relatedTarget=m,S=x),m=S,p&&g)t:{for(x=p,h=g,v=0,_=x;_;_=$r(_))v++;for(_=0,S=h;S;S=$r(S))_++;for(;0<v-_;)x=$r(x),v--;for(;0<_-v;)h=$r(h),_--;for(;v--;){if(x===h||h!==null&&x===h.alternate)break t;x=$r(x),h=$r(h)}x=null}else x=null;p!==null&&wp(d,f,p,x,!1),g!==null&&m!==null&&wp(d,m,g,x,!0)}}e:{if(f=c?vs(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var C=ay;else if(gp(f))if(Sg)C=fy;else{C=cy;var A=ly}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(C=uy);if(C&&(C=C(t,c))){yg(d,C,n,u);break e}A&&A(t,f,c),t==="focusout"&&(A=f._wrapperState)&&A.controlled&&f.type==="number"&&sf(f,"number",f.value)}switch(A=c?vs(c):window,t){case"focusin":(gp(A)||A.contentEditable==="true")&&(ms=A,vf=c,Fo=null);break;case"focusout":Fo=vf=ms=null;break;case"mousedown":_f=!0;break;case"contextmenu":case"mouseup":case"dragend":_f=!1,Sp(d,n,u);break;case"selectionchange":if(py)break;case"keydown":case"keyup":Sp(d,n,u)}var T;if(Qd)e:{switch(t){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else ps?_g(t,n)&&(b="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(vg&&n.locale!=="ko"&&(ps||b!=="onCompositionStart"?b==="onCompositionEnd"&&ps&&(T=gg()):($i=u,$d="value"in $i?$i.value:$i.textContent,ps=!0)),A=Ol(c,b),0<A.length&&(b=new dp(b,t,null,n,u),d.push({event:b,listeners:A}),T?b.data=T:(T=xg(n),T!==null&&(b.data=T)))),(T=ny?iy(t,n):ry(t,n))&&(c=Ol(c,"onBeforeInput"),0<c.length&&(u=new dp("onBeforeInput","beforeinput",null,n,u),d.push({event:u,listeners:c}),u.data=T))}Lg(d,e)})}function ea(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ol(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=qo(t,n),s!=null&&i.unshift(ea(t,s,r)),s=qo(t,e),s!=null&&i.push(ea(t,s,r))),t=t.return}return i}function $r(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function wp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=qo(n,s),l!=null&&o.unshift(ea(n,l,a))):r||(l=qo(n,s),l!=null&&o.push(ea(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var _y=/\r\n?/g,xy=/\u0000|\uFFFD/g;function Tp(t){return(typeof t=="string"?t:""+t).replace(_y,`
`).replace(xy,"")}function La(t,e,n){if(e=Tp(e),Tp(t)!==e&&n)throw Error(re(425))}function Bl(){}var xf=null,yf=null;function Sf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Mf=typeof setTimeout=="function"?setTimeout:void 0,yy=typeof clearTimeout=="function"?clearTimeout:void 0,Ap=typeof Promise=="function"?Promise:void 0,Sy=typeof queueMicrotask=="function"?queueMicrotask:typeof Ap<"u"?function(t){return Ap.resolve(null).then(t).catch(My)}:Mf;function My(t){setTimeout(function(){throw t})}function tu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ko(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ko(e)}function nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function bp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Zs=Math.random().toString(36).slice(2),ci="__reactFiber$"+Zs,ta="__reactProps$"+Zs,Pi="__reactContainer$"+Zs,Ef="__reactEvents$"+Zs,Ey="__reactListeners$"+Zs,wy="__reactHandles$"+Zs;function Lr(t){var e=t[ci];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pi]||n[ci]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=bp(t);t!==null;){if(n=t[ci])return n;t=bp(t)}return e}t=n,n=t.parentNode}return null}function pa(t){return t=t[ci]||t[Pi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function vs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(re(33))}function vc(t){return t[ta]||null}var wf=[],_s=-1;function pr(t){return{current:t}}function mt(t){0>_s||(t.current=wf[_s],wf[_s]=null,_s--)}function lt(t,e){_s++,wf[_s]=t.current,t.current=e}var ur={},Jt=pr(ur),pn=pr(!1),Fr=ur;function zs(t,e){var n=t.type.contextTypes;if(!n)return ur;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function mn(t){return t=t.childContextTypes,t!=null}function Hl(){mt(pn),mt(Jt)}function Cp(t,e,n){if(Jt.current!==ur)throw Error(re(168));lt(Jt,e),lt(pn,n)}function Dg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(re(108,lx(t)||"Unknown",r));return St({},n,i)}function Gl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ur,Fr=Jt.current,lt(Jt,t),lt(pn,pn.current),!0}function Rp(t,e,n){var i=t.stateNode;if(!i)throw Error(re(169));n?(t=Dg(t,e,Fr),i.__reactInternalMemoizedMergedChildContext=t,mt(pn),mt(Jt),lt(Jt,t)):mt(pn),lt(pn,n)}var wi=null,_c=!1,nu=!1;function Ng(t){wi===null?wi=[t]:wi.push(t)}function Ty(t){_c=!0,Ng(t)}function mr(){if(!nu&&wi!==null){nu=!0;var t=0,e=nt;try{var n=wi;for(nt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}wi=null,_c=!1}catch(r){throw wi!==null&&(wi=wi.slice(t+1)),sg(Xd,mr),r}finally{nt=e,nu=!1}}return null}var xs=[],ys=0,Vl=null,Wl=0,kn=[],zn=0,Or=null,Ti=1,Ai="";function Tr(t,e){xs[ys++]=Wl,xs[ys++]=Vl,Vl=t,Wl=e}function Ug(t,e,n){kn[zn++]=Ti,kn[zn++]=Ai,kn[zn++]=Or,Or=t;var i=Ti;t=Ai;var r=32-ti(i)-1;i&=~(1<<r),n+=1;var s=32-ti(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ti=1<<32-ti(e)+r|n<<r|i,Ai=s+t}else Ti=1<<s|n<<r|i,Ai=t}function eh(t){t.return!==null&&(Tr(t,1),Ug(t,1,0))}function th(t){for(;t===Vl;)Vl=xs[--ys],xs[ys]=null,Wl=xs[--ys],xs[ys]=null;for(;t===Or;)Or=kn[--zn],kn[zn]=null,Ai=kn[--zn],kn[zn]=null,Ti=kn[--zn],kn[zn]=null}var Tn=null,wn=null,gt=!1,Kn=null;function kg(t,e){var n=Fn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Pp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Tn=t,wn=nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Tn=t,wn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Or!==null?{id:Ti,overflow:Ai}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Fn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Tn=t,wn=null,!0):!1;default:return!1}}function Tf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Af(t){if(gt){var e=wn;if(e){var n=e;if(!Pp(t,e)){if(Tf(t))throw Error(re(418));e=nr(n.nextSibling);var i=Tn;e&&Pp(t,e)?kg(i,n):(t.flags=t.flags&-4097|2,gt=!1,Tn=t)}}else{if(Tf(t))throw Error(re(418));t.flags=t.flags&-4097|2,gt=!1,Tn=t}}}function Lp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Tn=t}function Ia(t){if(t!==Tn)return!1;if(!gt)return Lp(t),gt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Sf(t.type,t.memoizedProps)),e&&(e=wn)){if(Tf(t))throw zg(),Error(re(418));for(;e;)kg(t,e),e=nr(e.nextSibling)}if(Lp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(re(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){wn=nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}wn=null}}else wn=Tn?nr(t.stateNode.nextSibling):null;return!0}function zg(){for(var t=wn;t;)t=nr(t.nextSibling)}function Fs(){wn=Tn=null,gt=!1}function nh(t){Kn===null?Kn=[t]:Kn.push(t)}var Ay=Ni.ReactCurrentBatchConfig;function co(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(re(309));var i=n.stateNode}if(!i)throw Error(re(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(re(284));if(!n._owner)throw Error(re(290,t))}return t}function Da(t,e){throw t=Object.prototype.toString.call(e),Error(re(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Ip(t){var e=t._init;return e(t._payload)}function Fg(t){function e(h,v){if(t){var _=h.deletions;_===null?(h.deletions=[v],h.flags|=16):_.push(v)}}function n(h,v){if(!t)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function r(h,v){return h=or(h,v),h.index=0,h.sibling=null,h}function s(h,v,_){return h.index=_,t?(_=h.alternate,_!==null?(_=_.index,_<v?(h.flags|=2,v):_):(h.flags|=2,v)):(h.flags|=1048576,v)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,v,_,S){return v===null||v.tag!==6?(v=cu(_,h.mode,S),v.return=h,v):(v=r(v,_),v.return=h,v)}function l(h,v,_,S){var C=_.type;return C===hs?u(h,v,_.props.children,S,_.key):v!==null&&(v.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Vi&&Ip(C)===v.type)?(S=r(v,_.props),S.ref=co(h,v,_),S.return=h,S):(S=Ml(_.type,_.key,_.props,null,h.mode,S),S.ref=co(h,v,_),S.return=h,S)}function c(h,v,_,S){return v===null||v.tag!==4||v.stateNode.containerInfo!==_.containerInfo||v.stateNode.implementation!==_.implementation?(v=uu(_,h.mode,S),v.return=h,v):(v=r(v,_.children||[]),v.return=h,v)}function u(h,v,_,S,C){return v===null||v.tag!==7?(v=zr(_,h.mode,S,C),v.return=h,v):(v=r(v,_),v.return=h,v)}function d(h,v,_){if(typeof v=="string"&&v!==""||typeof v=="number")return v=cu(""+v,h.mode,_),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ma:return _=Ml(v.type,v.key,v.props,null,h.mode,_),_.ref=co(h,null,v),_.return=h,_;case ds:return v=uu(v,h.mode,_),v.return=h,v;case Vi:var S=v._init;return d(h,S(v._payload),_)}if(Ro(v)||ro(v))return v=zr(v,h.mode,_,null),v.return=h,v;Da(h,v)}return null}function f(h,v,_,S){var C=v!==null?v.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return C!==null?null:a(h,v,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Ma:return _.key===C?l(h,v,_,S):null;case ds:return _.key===C?c(h,v,_,S):null;case Vi:return C=_._init,f(h,v,C(_._payload),S)}if(Ro(_)||ro(_))return C!==null?null:u(h,v,_,S,null);Da(h,_)}return null}function p(h,v,_,S,C){if(typeof S=="string"&&S!==""||typeof S=="number")return h=h.get(_)||null,a(v,h,""+S,C);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ma:return h=h.get(S.key===null?_:S.key)||null,l(v,h,S,C);case ds:return h=h.get(S.key===null?_:S.key)||null,c(v,h,S,C);case Vi:var A=S._init;return p(h,v,_,A(S._payload),C)}if(Ro(S)||ro(S))return h=h.get(_)||null,u(v,h,S,C,null);Da(v,S)}return null}function g(h,v,_,S){for(var C=null,A=null,T=v,b=v=0,H=null;T!==null&&b<_.length;b++){T.index>b?(H=T,T=null):H=T.sibling;var y=f(h,T,_[b],S);if(y===null){T===null&&(T=H);break}t&&T&&y.alternate===null&&e(h,T),v=s(y,v,b),A===null?C=y:A.sibling=y,A=y,T=H}if(b===_.length)return n(h,T),gt&&Tr(h,b),C;if(T===null){for(;b<_.length;b++)T=d(h,_[b],S),T!==null&&(v=s(T,v,b),A===null?C=T:A.sibling=T,A=T);return gt&&Tr(h,b),C}for(T=i(h,T);b<_.length;b++)H=p(T,h,b,_[b],S),H!==null&&(t&&H.alternate!==null&&T.delete(H.key===null?b:H.key),v=s(H,v,b),A===null?C=H:A.sibling=H,A=H);return t&&T.forEach(function(M){return e(h,M)}),gt&&Tr(h,b),C}function x(h,v,_,S){var C=ro(_);if(typeof C!="function")throw Error(re(150));if(_=C.call(_),_==null)throw Error(re(151));for(var A=C=null,T=v,b=v=0,H=null,y=_.next();T!==null&&!y.done;b++,y=_.next()){T.index>b?(H=T,T=null):H=T.sibling;var M=f(h,T,y.value,S);if(M===null){T===null&&(T=H);break}t&&T&&M.alternate===null&&e(h,T),v=s(M,v,b),A===null?C=M:A.sibling=M,A=M,T=H}if(y.done)return n(h,T),gt&&Tr(h,b),C;if(T===null){for(;!y.done;b++,y=_.next())y=d(h,y.value,S),y!==null&&(v=s(y,v,b),A===null?C=y:A.sibling=y,A=y);return gt&&Tr(h,b),C}for(T=i(h,T);!y.done;b++,y=_.next())y=p(T,h,b,y.value,S),y!==null&&(t&&y.alternate!==null&&T.delete(y.key===null?b:y.key),v=s(y,v,b),A===null?C=y:A.sibling=y,A=y);return t&&T.forEach(function(D){return e(h,D)}),gt&&Tr(h,b),C}function m(h,v,_,S){if(typeof _=="object"&&_!==null&&_.type===hs&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case Ma:e:{for(var C=_.key,A=v;A!==null;){if(A.key===C){if(C=_.type,C===hs){if(A.tag===7){n(h,A.sibling),v=r(A,_.props.children),v.return=h,h=v;break e}}else if(A.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Vi&&Ip(C)===A.type){n(h,A.sibling),v=r(A,_.props),v.ref=co(h,A,_),v.return=h,h=v;break e}n(h,A);break}else e(h,A);A=A.sibling}_.type===hs?(v=zr(_.props.children,h.mode,S,_.key),v.return=h,h=v):(S=Ml(_.type,_.key,_.props,null,h.mode,S),S.ref=co(h,v,_),S.return=h,h=S)}return o(h);case ds:e:{for(A=_.key;v!==null;){if(v.key===A)if(v.tag===4&&v.stateNode.containerInfo===_.containerInfo&&v.stateNode.implementation===_.implementation){n(h,v.sibling),v=r(v,_.children||[]),v.return=h,h=v;break e}else{n(h,v);break}else e(h,v);v=v.sibling}v=uu(_,h.mode,S),v.return=h,h=v}return o(h);case Vi:return A=_._init,m(h,v,A(_._payload),S)}if(Ro(_))return g(h,v,_,S);if(ro(_))return x(h,v,_,S);Da(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,v!==null&&v.tag===6?(n(h,v.sibling),v=r(v,_),v.return=h,h=v):(n(h,v),v=cu(_,h.mode,S),v.return=h,h=v),o(h)):n(h,v)}return m}var Os=Fg(!0),Og=Fg(!1),Xl=pr(null),jl=null,Ss=null,ih=null;function rh(){ih=Ss=jl=null}function sh(t){var e=Xl.current;mt(Xl),t._currentValue=e}function bf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Rs(t,e){jl=t,ih=Ss=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(dn=!0),t.firstContext=null)}function Hn(t){var e=t._currentValue;if(ih!==t)if(t={context:t,memoizedValue:e,next:null},Ss===null){if(jl===null)throw Error(re(308));Ss=t,jl.dependencies={lanes:0,firstContext:t}}else Ss=Ss.next=t;return e}var Ir=null;function oh(t){Ir===null?Ir=[t]:Ir.push(t)}function Bg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,oh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Li(t,i)}function Li(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Wi=!1;function ah(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Hg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ci(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function ir(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Li(t,n)}return r=i.interleaved,r===null?(e.next=e,oh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Li(t,n)}function gl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,jd(t,n)}}function Dp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function ql(t,e,n,i){var r=t.updateQueue;Wi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,u=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,x=a;switch(f=e,p=n,x.tag){case 1:if(g=x.payload,typeof g=="function"){d=g.call(p,d,f);break e}d=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,f=typeof g=="function"?g.call(p,d,f):g,f==null)break e;d=St({},d,f);break e;case 2:Wi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(u===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Hr|=o,t.lanes=o,t.memoizedState=d}}function Np(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(re(191,r));r.call(i)}}}var ma={},hi=pr(ma),na=pr(ma),ia=pr(ma);function Dr(t){if(t===ma)throw Error(re(174));return t}function lh(t,e){switch(lt(ia,e),lt(na,t),lt(hi,ma),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:af(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=af(e,t)}mt(hi),lt(hi,e)}function Bs(){mt(hi),mt(na),mt(ia)}function Gg(t){Dr(ia.current);var e=Dr(hi.current),n=af(e,t.type);e!==n&&(lt(na,t),lt(hi,n))}function ch(t){na.current===t&&(mt(hi),mt(na))}var _t=pr(0);function Yl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var iu=[];function uh(){for(var t=0;t<iu.length;t++)iu[t]._workInProgressVersionPrimary=null;iu.length=0}var vl=Ni.ReactCurrentDispatcher,ru=Ni.ReactCurrentBatchConfig,Br=0,xt=null,It=null,Ot=null,$l=!1,Oo=!1,ra=0,by=0;function jt(){throw Error(re(321))}function fh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ii(t[n],e[n]))return!1;return!0}function dh(t,e,n,i,r,s){if(Br=s,xt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,vl.current=t===null||t.memoizedState===null?Ly:Iy,t=n(i,r),Oo){s=0;do{if(Oo=!1,ra=0,25<=s)throw Error(re(301));s+=1,Ot=It=null,e.updateQueue=null,vl.current=Dy,t=n(i,r)}while(Oo)}if(vl.current=Kl,e=It!==null&&It.next!==null,Br=0,Ot=It=xt=null,$l=!1,e)throw Error(re(300));return t}function hh(){var t=ra!==0;return ra=0,t}function oi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?xt.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function Gn(){if(It===null){var t=xt.alternate;t=t!==null?t.memoizedState:null}else t=It.next;var e=Ot===null?xt.memoizedState:Ot.next;if(e!==null)Ot=e,It=t;else{if(t===null)throw Error(re(310));It=t,t={memoizedState:It.memoizedState,baseState:It.baseState,baseQueue:It.baseQueue,queue:It.queue,next:null},Ot===null?xt.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function sa(t,e){return typeof e=="function"?e(t):e}function su(t){var e=Gn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=It,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((Br&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,xt.lanes|=u,Hr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ii(i,e.memoizedState)||(dn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,xt.lanes|=s,Hr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ou(t){var e=Gn(),n=e.queue;if(n===null)throw Error(re(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);ii(s,e.memoizedState)||(dn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Vg(){}function Wg(t,e){var n=xt,i=Gn(),r=e(),s=!ii(i.memoizedState,r);if(s&&(i.memoizedState=r,dn=!0),i=i.queue,ph(qg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,oa(9,jg.bind(null,n,i,r,e),void 0,null),Bt===null)throw Error(re(349));Br&30||Xg(n,e,r)}return r}function Xg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=xt.updateQueue,e===null?(e={lastEffect:null,stores:null},xt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function jg(t,e,n,i){e.value=n,e.getSnapshot=i,Yg(e)&&$g(t)}function qg(t,e,n){return n(function(){Yg(e)&&$g(t)})}function Yg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ii(t,n)}catch{return!0}}function $g(t){var e=Li(t,1);e!==null&&ni(e,t,1,-1)}function Up(t){var e=oi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sa,lastRenderedState:t},e.queue=t,t=t.dispatch=Py.bind(null,xt,t),[e.memoizedState,t]}function oa(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=xt.updateQueue,e===null?(e={lastEffect:null,stores:null},xt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Kg(){return Gn().memoizedState}function _l(t,e,n,i){var r=oi();xt.flags|=t,r.memoizedState=oa(1|e,n,void 0,i===void 0?null:i)}function xc(t,e,n,i){var r=Gn();i=i===void 0?null:i;var s=void 0;if(It!==null){var o=It.memoizedState;if(s=o.destroy,i!==null&&fh(i,o.deps)){r.memoizedState=oa(e,n,s,i);return}}xt.flags|=t,r.memoizedState=oa(1|e,n,s,i)}function kp(t,e){return _l(8390656,8,t,e)}function ph(t,e){return xc(2048,8,t,e)}function Zg(t,e){return xc(4,2,t,e)}function Qg(t,e){return xc(4,4,t,e)}function Jg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function ev(t,e,n){return n=n!=null?n.concat([t]):null,xc(4,4,Jg.bind(null,e,t),n)}function mh(){}function tv(t,e){var n=Gn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&fh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function nv(t,e){var n=Gn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&fh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function iv(t,e,n){return Br&21?(ii(n,e)||(n=lg(),xt.lanes|=n,Hr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,dn=!0),t.memoizedState=n)}function Cy(t,e){var n=nt;nt=n!==0&&4>n?n:4,t(!0);var i=ru.transition;ru.transition={};try{t(!1),e()}finally{nt=n,ru.transition=i}}function rv(){return Gn().memoizedState}function Ry(t,e,n){var i=sr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},sv(t))ov(e,n);else if(n=Bg(t,e,n,i),n!==null){var r=nn();ni(n,t,i,r),av(n,e,i)}}function Py(t,e,n){var i=sr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(sv(t))ov(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,ii(a,o)){var l=e.interleaved;l===null?(r.next=r,oh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Bg(t,e,r,i),n!==null&&(r=nn(),ni(n,t,i,r),av(n,e,i))}}function sv(t){var e=t.alternate;return t===xt||e!==null&&e===xt}function ov(t,e){Oo=$l=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function av(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,jd(t,n)}}var Kl={readContext:Hn,useCallback:jt,useContext:jt,useEffect:jt,useImperativeHandle:jt,useInsertionEffect:jt,useLayoutEffect:jt,useMemo:jt,useReducer:jt,useRef:jt,useState:jt,useDebugValue:jt,useDeferredValue:jt,useTransition:jt,useMutableSource:jt,useSyncExternalStore:jt,useId:jt,unstable_isNewReconciler:!1},Ly={readContext:Hn,useCallback:function(t,e){return oi().memoizedState=[t,e===void 0?null:e],t},useContext:Hn,useEffect:kp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,_l(4194308,4,Jg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return _l(4194308,4,t,e)},useInsertionEffect:function(t,e){return _l(4,2,t,e)},useMemo:function(t,e){var n=oi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=oi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Ry.bind(null,xt,t),[i.memoizedState,t]},useRef:function(t){var e=oi();return t={current:t},e.memoizedState=t},useState:Up,useDebugValue:mh,useDeferredValue:function(t){return oi().memoizedState=t},useTransition:function(){var t=Up(!1),e=t[0];return t=Cy.bind(null,t[1]),oi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=xt,r=oi();if(gt){if(n===void 0)throw Error(re(407));n=n()}else{if(n=e(),Bt===null)throw Error(re(349));Br&30||Xg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,kp(qg.bind(null,i,s,t),[t]),i.flags|=2048,oa(9,jg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=oi(),e=Bt.identifierPrefix;if(gt){var n=Ai,i=Ti;n=(i&~(1<<32-ti(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ra++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=by++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Iy={readContext:Hn,useCallback:tv,useContext:Hn,useEffect:ph,useImperativeHandle:ev,useInsertionEffect:Zg,useLayoutEffect:Qg,useMemo:nv,useReducer:su,useRef:Kg,useState:function(){return su(sa)},useDebugValue:mh,useDeferredValue:function(t){var e=Gn();return iv(e,It.memoizedState,t)},useTransition:function(){var t=su(sa)[0],e=Gn().memoizedState;return[t,e]},useMutableSource:Vg,useSyncExternalStore:Wg,useId:rv,unstable_isNewReconciler:!1},Dy={readContext:Hn,useCallback:tv,useContext:Hn,useEffect:ph,useImperativeHandle:ev,useInsertionEffect:Zg,useLayoutEffect:Qg,useMemo:nv,useReducer:ou,useRef:Kg,useState:function(){return ou(sa)},useDebugValue:mh,useDeferredValue:function(t){var e=Gn();return It===null?e.memoizedState=t:iv(e,It.memoizedState,t)},useTransition:function(){var t=ou(sa)[0],e=Gn().memoizedState;return[t,e]},useMutableSource:Vg,useSyncExternalStore:Wg,useId:rv,unstable_isNewReconciler:!1};function Yn(t,e){if(t&&t.defaultProps){e=St({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Cf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:St({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var yc={isMounted:function(t){return(t=t._reactInternals)?jr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=nn(),r=sr(t),s=Ci(i,r);s.payload=e,n!=null&&(s.callback=n),e=ir(t,s,r),e!==null&&(ni(e,t,r,i),gl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=nn(),r=sr(t),s=Ci(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=ir(t,s,r),e!==null&&(ni(e,t,r,i),gl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=nn(),i=sr(t),r=Ci(n,i);r.tag=2,e!=null&&(r.callback=e),e=ir(t,r,i),e!==null&&(ni(e,t,i,n),gl(e,t,i))}};function zp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Qo(n,i)||!Qo(r,s):!0}function lv(t,e,n){var i=!1,r=ur,s=e.contextType;return typeof s=="object"&&s!==null?s=Hn(s):(r=mn(e)?Fr:Jt.current,i=e.contextTypes,s=(i=i!=null)?zs(t,r):ur),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=yc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Fp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&yc.enqueueReplaceState(e,e.state,null)}function Rf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},ah(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Hn(s):(s=mn(e)?Fr:Jt.current,r.context=zs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Cf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&yc.enqueueReplaceState(r,r.state,null),ql(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Hs(t,e){try{var n="",i=e;do n+=ax(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function au(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Pf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Ny=typeof WeakMap=="function"?WeakMap:Map;function cv(t,e,n){n=Ci(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Ql||(Ql=!0,Bf=i),Pf(t,e)},n}function uv(t,e,n){n=Ci(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Pf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Pf(t,e),typeof i!="function"&&(rr===null?rr=new Set([this]):rr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Op(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Ny;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Yy.bind(null,t,e,n),e.then(t,t))}function Bp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Hp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ci(-1,1),e.tag=2,ir(n,e,1))),n.lanes|=1),t)}var Uy=Ni.ReactCurrentOwner,dn=!1;function tn(t,e,n,i){e.child=t===null?Og(e,null,n,i):Os(e,t.child,n,i)}function Gp(t,e,n,i,r){n=n.render;var s=e.ref;return Rs(e,r),i=dh(t,e,n,i,s,r),n=hh(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(gt&&n&&eh(e),e.flags|=1,tn(t,e,i,r),e.child)}function Vp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Eh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,fv(t,e,s,i,r)):(t=Ml(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qo,n(o,i)&&t.ref===e.ref)return Ii(t,e,r)}return e.flags|=1,t=or(s,i),t.ref=e.ref,t.return=e,e.child=t}function fv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Qo(s,i)&&t.ref===e.ref)if(dn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(dn=!0);else return e.lanes=t.lanes,Ii(t,e,r)}return Lf(t,e,n,i,r)}function dv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},lt(Es,Mn),Mn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,lt(Es,Mn),Mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,lt(Es,Mn),Mn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,lt(Es,Mn),Mn|=i;return tn(t,e,r,n),e.child}function hv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Lf(t,e,n,i,r){var s=mn(n)?Fr:Jt.current;return s=zs(e,s),Rs(e,r),n=dh(t,e,n,i,s,r),i=hh(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(gt&&i&&eh(e),e.flags|=1,tn(t,e,n,r),e.child)}function Wp(t,e,n,i,r){if(mn(n)){var s=!0;Gl(e)}else s=!1;if(Rs(e,r),e.stateNode===null)xl(t,e),lv(e,n,i),Rf(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Hn(c):(c=mn(n)?Fr:Jt.current,c=zs(e,c));var u=n.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Fp(e,o,i,c),Wi=!1;var f=e.memoizedState;o.state=f,ql(e,i,o,r),l=e.memoizedState,a!==i||f!==l||pn.current||Wi?(typeof u=="function"&&(Cf(e,n,u,i),l=e.memoizedState),(a=Wi||zp(e,n,a,i,f,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Hg(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Yn(e.type,a),o.props=c,d=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Hn(l):(l=mn(n)?Fr:Jt.current,l=zs(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||f!==l)&&Fp(e,o,i,l),Wi=!1,f=e.memoizedState,o.state=f,ql(e,i,o,r);var g=e.memoizedState;a!==d||f!==g||pn.current||Wi?(typeof p=="function"&&(Cf(e,n,p,i),g=e.memoizedState),(c=Wi||zp(e,n,c,i,f,g,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return If(t,e,n,i,s,r)}function If(t,e,n,i,r,s){hv(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Rp(e,n,!1),Ii(t,e,s);i=e.stateNode,Uy.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Os(e,t.child,null,s),e.child=Os(e,null,a,s)):tn(t,e,a,s),e.memoizedState=i.state,r&&Rp(e,n,!0),e.child}function pv(t){var e=t.stateNode;e.pendingContext?Cp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Cp(t,e.context,!1),lh(t,e.containerInfo)}function Xp(t,e,n,i,r){return Fs(),nh(r),e.flags|=256,tn(t,e,n,i),e.child}var Df={dehydrated:null,treeContext:null,retryLane:0};function Nf(t){return{baseLanes:t,cachePool:null,transitions:null}}function mv(t,e,n){var i=e.pendingProps,r=_t.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),lt(_t,r&1),t===null)return Af(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Ec(o,i,0,null),t=zr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Nf(n),e.memoizedState=Df,t):gh(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return ky(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=or(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=or(a,s):(s=zr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Nf(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Df,i}return s=t.child,t=s.sibling,i=or(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function gh(t,e){return e=Ec({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Na(t,e,n,i){return i!==null&&nh(i),Os(e,t.child,null,n),t=gh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ky(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=au(Error(re(422))),Na(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Ec({mode:"visible",children:i.children},r,0,null),s=zr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Os(e,t.child,null,o),e.child.memoizedState=Nf(o),e.memoizedState=Df,s);if(!(e.mode&1))return Na(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(re(419)),i=au(s,i,void 0),Na(t,e,o,i)}if(a=(o&t.childLanes)!==0,dn||a){if(i=Bt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Li(t,r),ni(i,t,r,-1))}return Mh(),i=au(Error(re(421))),Na(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=$y.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,wn=nr(r.nextSibling),Tn=e,gt=!0,Kn=null,t!==null&&(kn[zn++]=Ti,kn[zn++]=Ai,kn[zn++]=Or,Ti=t.id,Ai=t.overflow,Or=e),e=gh(e,i.children),e.flags|=4096,e)}function jp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),bf(t.return,e,n)}function lu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function gv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(tn(t,e,i.children,n),i=_t.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&jp(t,n,e);else if(t.tag===19)jp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(lt(_t,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Yl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),lu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Yl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}lu(e,!0,n,null,s);break;case"together":lu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function xl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ii(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Hr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(re(153));if(e.child!==null){for(t=e.child,n=or(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=or(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function zy(t,e,n){switch(e.tag){case 3:pv(e),Fs();break;case 5:Gg(e);break;case 1:mn(e.type)&&Gl(e);break;case 4:lh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;lt(Xl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(lt(_t,_t.current&1),e.flags|=128,null):n&e.child.childLanes?mv(t,e,n):(lt(_t,_t.current&1),t=Ii(t,e,n),t!==null?t.sibling:null);lt(_t,_t.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return gv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),lt(_t,_t.current),i)break;return null;case 22:case 23:return e.lanes=0,dv(t,e,n)}return Ii(t,e,n)}var vv,Uf,_v,xv;vv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Uf=function(){};_v=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Dr(hi.current);var s=null;switch(n){case"input":r=nf(t,r),i=nf(t,i),s=[];break;case"select":r=St({},r,{value:void 0}),i=St({},i,{value:void 0}),s=[];break;case"textarea":r=of(t,r),i=of(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Bl)}lf(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Xo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r?.[c],i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Xo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ft("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};xv=function(t,e,n,i){n!==i&&(e.flags|=4)};function uo(t,e){if(!gt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function qt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Fy(t,e,n){var i=e.pendingProps;switch(th(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qt(e),null;case 1:return mn(e.type)&&Hl(),qt(e),null;case 3:return i=e.stateNode,Bs(),mt(pn),mt(Jt),uh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Ia(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Kn!==null&&(Vf(Kn),Kn=null))),Uf(t,e),qt(e),null;case 5:ch(e);var r=Dr(ia.current);if(n=e.type,t!==null&&e.stateNode!=null)_v(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(re(166));return qt(e),null}if(t=Dr(hi.current),Ia(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ci]=e,i[ta]=s,t=(e.mode&1)!==0,n){case"dialog":ft("cancel",i),ft("close",i);break;case"iframe":case"object":case"embed":ft("load",i);break;case"video":case"audio":for(r=0;r<Lo.length;r++)ft(Lo[r],i);break;case"source":ft("error",i);break;case"img":case"image":case"link":ft("error",i),ft("load",i);break;case"details":ft("toggle",i);break;case"input":tp(i,s),ft("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ft("invalid",i);break;case"textarea":ip(i,s),ft("invalid",i)}lf(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&La(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&La(i.textContent,a,t),r=["children",""+a]):Xo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ft("scroll",i)}switch(n){case"input":Ea(i),np(i,s,!0);break;case"textarea":Ea(i),rp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Bl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=q0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[ci]=e,t[ta]=i,vv(t,e,!1,!1),e.stateNode=t;e:{switch(o=cf(n,i),n){case"dialog":ft("cancel",t),ft("close",t),r=i;break;case"iframe":case"object":case"embed":ft("load",t),r=i;break;case"video":case"audio":for(r=0;r<Lo.length;r++)ft(Lo[r],t);r=i;break;case"source":ft("error",t),r=i;break;case"img":case"image":case"link":ft("error",t),ft("load",t),r=i;break;case"details":ft("toggle",t),r=i;break;case"input":tp(t,i),r=nf(t,i),ft("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=St({},i,{value:void 0}),ft("invalid",t);break;case"textarea":ip(t,i),r=of(t,i),ft("invalid",t);break;default:r=i}lf(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?K0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Y0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&jo(t,l):typeof l=="number"&&jo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Xo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ft("scroll",t):l!=null&&Bd(t,s,l,o))}switch(n){case"input":Ea(t),np(t,i,!1);break;case"textarea":Ea(t),rp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+cr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ts(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ts(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Bl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return qt(e),null;case 6:if(t&&e.stateNode!=null)xv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(re(166));if(n=Dr(ia.current),Dr(hi.current),Ia(e)){if(i=e.stateNode,n=e.memoizedProps,i[ci]=e,(s=i.nodeValue!==n)&&(t=Tn,t!==null))switch(t.tag){case 3:La(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&La(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ci]=e,e.stateNode=i}return qt(e),null;case 13:if(mt(_t),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(gt&&wn!==null&&e.mode&1&&!(e.flags&128))zg(),Fs(),e.flags|=98560,s=!1;else if(s=Ia(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(re(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(re(317));s[ci]=e}else Fs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;qt(e),s=!1}else Kn!==null&&(Vf(Kn),Kn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||_t.current&1?Ut===0&&(Ut=3):Mh())),e.updateQueue!==null&&(e.flags|=4),qt(e),null);case 4:return Bs(),Uf(t,e),t===null&&Jo(e.stateNode.containerInfo),qt(e),null;case 10:return sh(e.type._context),qt(e),null;case 17:return mn(e.type)&&Hl(),qt(e),null;case 19:if(mt(_t),s=e.memoizedState,s===null)return qt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)uo(s,!1);else{if(Ut!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Yl(t),o!==null){for(e.flags|=128,uo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return lt(_t,_t.current&1|2),e.child}t=t.sibling}s.tail!==null&&bt()>Gs&&(e.flags|=128,i=!0,uo(s,!1),e.lanes=4194304)}else{if(!i)if(t=Yl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),uo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!gt)return qt(e),null}else 2*bt()-s.renderingStartTime>Gs&&n!==1073741824&&(e.flags|=128,i=!0,uo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=bt(),e.sibling=null,n=_t.current,lt(_t,i?n&1|2:n&1),e):(qt(e),null);case 22:case 23:return Sh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Mn&1073741824&&(qt(e),e.subtreeFlags&6&&(e.flags|=8192)):qt(e),null;case 24:return null;case 25:return null}throw Error(re(156,e.tag))}function Oy(t,e){switch(th(e),e.tag){case 1:return mn(e.type)&&Hl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Bs(),mt(pn),mt(Jt),uh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ch(e),null;case 13:if(mt(_t),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(re(340));Fs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return mt(_t),null;case 4:return Bs(),null;case 10:return sh(e.type._context),null;case 22:case 23:return Sh(),null;case 24:return null;default:return null}}var Ua=!1,Zt=!1,By=typeof WeakSet=="function"?WeakSet:Set,me=null;function Ms(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Et(t,e,i)}else n.current=null}function kf(t,e,n){try{n()}catch(i){Et(t,e,i)}}var qp=!1;function Hy(t,e){if(xf=zl,t=wg(),Jd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++u===i&&(l=o),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(yf={focusedElem:t,selectionRange:n},zl=!1,me=e;me!==null;)if(e=me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,me=t;else for(;me!==null;){e=me;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var x=g.memoizedProps,m=g.memoizedState,h=e.stateNode,v=h.getSnapshotBeforeUpdate(e.elementType===e.type?x:Yn(e.type,x),m);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(re(163))}}catch(S){Et(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,me=t;break}me=e.return}return g=qp,qp=!1,g}function Bo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&kf(e,n,s)}r=r.next}while(r!==i)}}function Sc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function zf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function yv(t){var e=t.alternate;e!==null&&(t.alternate=null,yv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ci],delete e[ta],delete e[Ef],delete e[Ey],delete e[wy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Sv(t){return t.tag===5||t.tag===3||t.tag===4}function Yp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Sv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ff(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Bl));else if(i!==4&&(t=t.child,t!==null))for(Ff(t,e,n),t=t.sibling;t!==null;)Ff(t,e,n),t=t.sibling}function Of(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Of(t,e,n),t=t.sibling;t!==null;)Of(t,e,n),t=t.sibling}var Gt=null,$n=!1;function ki(t,e,n){for(n=n.child;n!==null;)Mv(t,e,n),n=n.sibling}function Mv(t,e,n){if(di&&typeof di.onCommitFiberUnmount=="function")try{di.onCommitFiberUnmount(hc,n)}catch{}switch(n.tag){case 5:Zt||Ms(n,e);case 6:var i=Gt,r=$n;Gt=null,ki(t,e,n),Gt=i,$n=r,Gt!==null&&($n?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&($n?(t=Gt,n=n.stateNode,t.nodeType===8?tu(t.parentNode,n):t.nodeType===1&&tu(t,n),Ko(t)):tu(Gt,n.stateNode));break;case 4:i=Gt,r=$n,Gt=n.stateNode.containerInfo,$n=!0,ki(t,e,n),Gt=i,$n=r;break;case 0:case 11:case 14:case 15:if(!Zt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&kf(n,e,o),r=r.next}while(r!==i)}ki(t,e,n);break;case 1:if(!Zt&&(Ms(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Et(n,e,a)}ki(t,e,n);break;case 21:ki(t,e,n);break;case 22:n.mode&1?(Zt=(i=Zt)||n.memoizedState!==null,ki(t,e,n),Zt=i):ki(t,e,n);break;default:ki(t,e,n)}}function $p(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new By),e.forEach(function(i){var r=Ky.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Wn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Gt=a.stateNode,$n=!1;break e;case 3:Gt=a.stateNode.containerInfo,$n=!0;break e;case 4:Gt=a.stateNode.containerInfo,$n=!0;break e}a=a.return}if(Gt===null)throw Error(re(160));Mv(s,o,r),Gt=null,$n=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Et(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ev(e,t),e=e.sibling}function Ev(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Wn(e,t),ri(t),i&4){try{Bo(3,t,t.return),Sc(3,t)}catch(x){Et(t,t.return,x)}try{Bo(5,t,t.return)}catch(x){Et(t,t.return,x)}}break;case 1:Wn(e,t),ri(t),i&512&&n!==null&&Ms(n,n.return);break;case 5:if(Wn(e,t),ri(t),i&512&&n!==null&&Ms(n,n.return),t.flags&32){var r=t.stateNode;try{jo(r,"")}catch(x){Et(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&X0(r,s),cf(a,o);var c=cf(a,s);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?K0(r,d):u==="dangerouslySetInnerHTML"?Y0(r,d):u==="children"?jo(r,d):Bd(r,u,d,c)}switch(a){case"input":rf(r,s);break;case"textarea":j0(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ts(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?Ts(r,!!s.multiple,s.defaultValue,!0):Ts(r,!!s.multiple,s.multiple?[]:"",!1))}r[ta]=s}catch(x){Et(t,t.return,x)}}break;case 6:if(Wn(e,t),ri(t),i&4){if(t.stateNode===null)throw Error(re(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){Et(t,t.return,x)}}break;case 3:if(Wn(e,t),ri(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ko(e.containerInfo)}catch(x){Et(t,t.return,x)}break;case 4:Wn(e,t),ri(t);break;case 13:Wn(e,t),ri(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(xh=bt())),i&4&&$p(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(Zt=(c=Zt)||u,Wn(e,t),Zt=c):Wn(e,t),ri(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(me=t,u=t.child;u!==null;){for(d=me=u;me!==null;){switch(f=me,p=f.child,f.tag){case 0:case 11:case 14:case 15:Bo(4,f,f.return);break;case 1:Ms(f,f.return);var g=f.stateNode;if(typeof g.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(x){Et(i,n,x)}}break;case 5:Ms(f,f.return);break;case 22:if(f.memoizedState!==null){Zp(d);continue}}p!==null?(p.return=f,me=p):Zp(d)}u=u.sibling}e:for(u=null,d=t;;){if(d.tag===5){if(u===null){u=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=$0("display",o))}catch(x){Et(t,t.return,x)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(x){Et(t,t.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Wn(e,t),ri(t),i&4&&$p(t);break;case 21:break;default:Wn(e,t),ri(t)}}function ri(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Sv(n)){var i=n;break e}n=n.return}throw Error(re(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(jo(r,""),i.flags&=-33);var s=Yp(t);Of(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Yp(t);Ff(t,a,o);break;default:throw Error(re(161))}}catch(l){Et(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Gy(t,e,n){me=t,wv(t)}function wv(t,e,n){for(var i=(t.mode&1)!==0;me!==null;){var r=me,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ua;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Zt;a=Ua;var c=Zt;if(Ua=o,(Zt=l)&&!c)for(me=r;me!==null;)o=me,l=o.child,o.tag===22&&o.memoizedState!==null?Qp(r):l!==null?(l.return=o,me=l):Qp(r);for(;s!==null;)me=s,wv(s),s=s.sibling;me=r,Ua=a,Zt=c}Kp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,me=s):Kp(t)}}function Kp(t){for(;me!==null;){var e=me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Zt||Sc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Zt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Yn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Np(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Np(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&Ko(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(re(163))}Zt||e.flags&512&&zf(e)}catch(f){Et(e,e.return,f)}}if(e===t){me=null;break}if(n=e.sibling,n!==null){n.return=e.return,me=n;break}me=e.return}}function Zp(t){for(;me!==null;){var e=me;if(e===t){me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,me=n;break}me=e.return}}function Qp(t){for(;me!==null;){var e=me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Sc(4,e)}catch(l){Et(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Et(e,r,l)}}var s=e.return;try{zf(e)}catch(l){Et(e,s,l)}break;case 5:var o=e.return;try{zf(e)}catch(l){Et(e,o,l)}}}catch(l){Et(e,e.return,l)}if(e===t){me=null;break}var a=e.sibling;if(a!==null){a.return=e.return,me=a;break}me=e.return}}var Vy=Math.ceil,Zl=Ni.ReactCurrentDispatcher,vh=Ni.ReactCurrentOwner,On=Ni.ReactCurrentBatchConfig,qe=0,Bt=null,Lt=null,Wt=0,Mn=0,Es=pr(0),Ut=0,aa=null,Hr=0,Mc=0,_h=0,Ho=null,un=null,xh=0,Gs=1/0,Ei=null,Ql=!1,Bf=null,rr=null,ka=!1,Ki=null,Jl=0,Go=0,Hf=null,yl=-1,Sl=0;function nn(){return qe&6?bt():yl!==-1?yl:yl=bt()}function sr(t){return t.mode&1?qe&2&&Wt!==0?Wt&-Wt:Ay.transition!==null?(Sl===0&&(Sl=lg()),Sl):(t=nt,t!==0||(t=window.event,t=t===void 0?16:mg(t.type)),t):1}function ni(t,e,n,i){if(50<Go)throw Go=0,Hf=null,Error(re(185));da(t,n,i),(!(qe&2)||t!==Bt)&&(t===Bt&&(!(qe&2)&&(Mc|=n),Ut===4&&ji(t,Wt)),gn(t,i),n===1&&qe===0&&!(e.mode&1)&&(Gs=bt()+500,_c&&mr()))}function gn(t,e){var n=t.callbackNode;Ax(t,e);var i=kl(t,t===Bt?Wt:0);if(i===0)n!==null&&ap(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&ap(n),e===1)t.tag===0?Ty(Jp.bind(null,t)):Ng(Jp.bind(null,t)),Sy(function(){!(qe&6)&&mr()}),n=null;else{switch(cg(i)){case 1:n=Xd;break;case 4:n=og;break;case 16:n=Ul;break;case 536870912:n=ag;break;default:n=Ul}n=Iv(n,Tv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Tv(t,e){if(yl=-1,Sl=0,qe&6)throw Error(re(327));var n=t.callbackNode;if(Ps()&&t.callbackNode!==n)return null;var i=kl(t,t===Bt?Wt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=ec(t,i);else{e=i;var r=qe;qe|=2;var s=bv();(Bt!==t||Wt!==e)&&(Ei=null,Gs=bt()+500,kr(t,e));do try{jy();break}catch(a){Av(t,a)}while(!0);rh(),Zl.current=s,qe=r,Lt!==null?e=0:(Bt=null,Wt=0,e=Ut)}if(e!==0){if(e===2&&(r=pf(t),r!==0&&(i=r,e=Gf(t,r))),e===1)throw n=aa,kr(t,0),ji(t,i),gn(t,bt()),n;if(e===6)ji(t,i);else{if(r=t.current.alternate,!(i&30)&&!Wy(r)&&(e=ec(t,i),e===2&&(s=pf(t),s!==0&&(i=s,e=Gf(t,s))),e===1))throw n=aa,kr(t,0),ji(t,i),gn(t,bt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(re(345));case 2:Ar(t,un,Ei);break;case 3:if(ji(t,i),(i&130023424)===i&&(e=xh+500-bt(),10<e)){if(kl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){nn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Mf(Ar.bind(null,t,un,Ei),e);break}Ar(t,un,Ei);break;case 4:if(ji(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ti(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=bt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Vy(i/1960))-i,10<i){t.timeoutHandle=Mf(Ar.bind(null,t,un,Ei),i);break}Ar(t,un,Ei);break;case 5:Ar(t,un,Ei);break;default:throw Error(re(329))}}}return gn(t,bt()),t.callbackNode===n?Tv.bind(null,t):null}function Gf(t,e){var n=Ho;return t.current.memoizedState.isDehydrated&&(kr(t,e).flags|=256),t=ec(t,e),t!==2&&(e=un,un=n,e!==null&&Vf(e)),t}function Vf(t){un===null?un=t:un.push.apply(un,t)}function Wy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ii(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ji(t,e){for(e&=~_h,e&=~Mc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ti(e),i=1<<n;t[n]=-1,e&=~i}}function Jp(t){if(qe&6)throw Error(re(327));Ps();var e=kl(t,0);if(!(e&1))return gn(t,bt()),null;var n=ec(t,e);if(t.tag!==0&&n===2){var i=pf(t);i!==0&&(e=i,n=Gf(t,i))}if(n===1)throw n=aa,kr(t,0),ji(t,e),gn(t,bt()),n;if(n===6)throw Error(re(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ar(t,un,Ei),gn(t,bt()),null}function yh(t,e){var n=qe;qe|=1;try{return t(e)}finally{qe=n,qe===0&&(Gs=bt()+500,_c&&mr())}}function Gr(t){Ki!==null&&Ki.tag===0&&!(qe&6)&&Ps();var e=qe;qe|=1;var n=On.transition,i=nt;try{if(On.transition=null,nt=1,t)return t()}finally{nt=i,On.transition=n,qe=e,!(qe&6)&&mr()}}function Sh(){Mn=Es.current,mt(Es)}function kr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,yy(n)),Lt!==null)for(n=Lt.return;n!==null;){var i=n;switch(th(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Hl();break;case 3:Bs(),mt(pn),mt(Jt),uh();break;case 5:ch(i);break;case 4:Bs();break;case 13:mt(_t);break;case 19:mt(_t);break;case 10:sh(i.type._context);break;case 22:case 23:Sh()}n=n.return}if(Bt=t,Lt=t=or(t.current,null),Wt=Mn=e,Ut=0,aa=null,_h=Mc=Hr=0,un=Ho=null,Ir!==null){for(e=0;e<Ir.length;e++)if(n=Ir[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Ir=null}return t}function Av(t,e){do{var n=Lt;try{if(rh(),vl.current=Kl,$l){for(var i=xt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}$l=!1}if(Br=0,Ot=It=xt=null,Oo=!1,ra=0,vh.current=null,n===null||n.return===null){Ut=1,aa=e,Lt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Wt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Bp(o);if(p!==null){p.flags&=-257,Hp(p,o,a,s,e),p.mode&1&&Op(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var x=new Set;x.add(l),e.updateQueue=x}else g.add(l);break e}else{if(!(e&1)){Op(s,c,e),Mh();break e}l=Error(re(426))}}else if(gt&&a.mode&1){var m=Bp(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Hp(m,o,a,s,e),nh(Hs(l,a));break e}}s=l=Hs(l,a),Ut!==4&&(Ut=2),Ho===null?Ho=[s]:Ho.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=cv(s,l,e);Dp(s,h);break e;case 1:a=l;var v=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(rr===null||!rr.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=uv(s,a,e);Dp(s,S);break e}}s=s.return}while(s!==null)}Rv(n)}catch(C){e=C,Lt===n&&n!==null&&(Lt=n=n.return);continue}break}while(!0)}function bv(){var t=Zl.current;return Zl.current=Kl,t===null?Kl:t}function Mh(){(Ut===0||Ut===3||Ut===2)&&(Ut=4),Bt===null||!(Hr&268435455)&&!(Mc&268435455)||ji(Bt,Wt)}function ec(t,e){var n=qe;qe|=2;var i=bv();(Bt!==t||Wt!==e)&&(Ei=null,kr(t,e));do try{Xy();break}catch(r){Av(t,r)}while(!0);if(rh(),qe=n,Zl.current=i,Lt!==null)throw Error(re(261));return Bt=null,Wt=0,Ut}function Xy(){for(;Lt!==null;)Cv(Lt)}function jy(){for(;Lt!==null&&!vx();)Cv(Lt)}function Cv(t){var e=Lv(t.alternate,t,Mn);t.memoizedProps=t.pendingProps,e===null?Rv(t):Lt=e,vh.current=null}function Rv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Oy(n,e),n!==null){n.flags&=32767,Lt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ut=6,Lt=null;return}}else if(n=Fy(n,e,Mn),n!==null){Lt=n;return}if(e=e.sibling,e!==null){Lt=e;return}Lt=e=t}while(e!==null);Ut===0&&(Ut=5)}function Ar(t,e,n){var i=nt,r=On.transition;try{On.transition=null,nt=1,qy(t,e,n,i)}finally{On.transition=r,nt=i}return null}function qy(t,e,n,i){do Ps();while(Ki!==null);if(qe&6)throw Error(re(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(re(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(bx(t,s),t===Bt&&(Lt=Bt=null,Wt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ka||(ka=!0,Iv(Ul,function(){return Ps(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=On.transition,On.transition=null;var o=nt;nt=1;var a=qe;qe|=4,vh.current=null,Hy(t,n),Ev(n,t),hy(yf),zl=!!xf,yf=xf=null,t.current=n,Gy(n),_x(),qe=a,nt=o,On.transition=s}else t.current=n;if(ka&&(ka=!1,Ki=t,Jl=r),s=t.pendingLanes,s===0&&(rr=null),Sx(n.stateNode),gn(t,bt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ql)throw Ql=!1,t=Bf,Bf=null,t;return Jl&1&&t.tag!==0&&Ps(),s=t.pendingLanes,s&1?t===Hf?Go++:(Go=0,Hf=t):Go=0,mr(),null}function Ps(){if(Ki!==null){var t=cg(Jl),e=On.transition,n=nt;try{if(On.transition=null,nt=16>t?16:t,Ki===null)var i=!1;else{if(t=Ki,Ki=null,Jl=0,qe&6)throw Error(re(331));var r=qe;for(qe|=4,me=t.current;me!==null;){var s=me,o=s.child;if(me.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(me=c;me!==null;){var u=me;switch(u.tag){case 0:case 11:case 15:Bo(8,u,s)}var d=u.child;if(d!==null)d.return=u,me=d;else for(;me!==null;){u=me;var f=u.sibling,p=u.return;if(yv(u),u===c){me=null;break}if(f!==null){f.return=p,me=f;break}me=p}}}var g=s.alternate;if(g!==null){var x=g.child;if(x!==null){g.child=null;do{var m=x.sibling;x.sibling=null,x=m}while(x!==null)}}me=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,me=o;else e:for(;me!==null;){if(s=me,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Bo(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,me=h;break e}me=s.return}}var v=t.current;for(me=v;me!==null;){o=me;var _=o.child;if(o.subtreeFlags&2064&&_!==null)_.return=o,me=_;else e:for(o=v;me!==null;){if(a=me,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Sc(9,a)}}catch(C){Et(a,a.return,C)}if(a===o){me=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,me=S;break e}me=a.return}}if(qe=r,mr(),di&&typeof di.onPostCommitFiberRoot=="function")try{di.onPostCommitFiberRoot(hc,t)}catch{}i=!0}return i}finally{nt=n,On.transition=e}}return!1}function em(t,e,n){e=Hs(n,e),e=cv(t,e,1),t=ir(t,e,1),e=nn(),t!==null&&(da(t,1,e),gn(t,e))}function Et(t,e,n){if(t.tag===3)em(t,t,n);else for(;e!==null;){if(e.tag===3){em(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(rr===null||!rr.has(i))){t=Hs(n,t),t=uv(e,t,1),e=ir(e,t,1),t=nn(),e!==null&&(da(e,1,t),gn(e,t));break}}e=e.return}}function Yy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=nn(),t.pingedLanes|=t.suspendedLanes&n,Bt===t&&(Wt&n)===n&&(Ut===4||Ut===3&&(Wt&130023424)===Wt&&500>bt()-xh?kr(t,0):_h|=n),gn(t,e)}function Pv(t,e){e===0&&(t.mode&1?(e=Aa,Aa<<=1,!(Aa&130023424)&&(Aa=4194304)):e=1);var n=nn();t=Li(t,e),t!==null&&(da(t,e,n),gn(t,n))}function $y(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Pv(t,n)}function Ky(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(re(314))}i!==null&&i.delete(e),Pv(t,n)}var Lv;Lv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||pn.current)dn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return dn=!1,zy(t,e,n);dn=!!(t.flags&131072)}else dn=!1,gt&&e.flags&1048576&&Ug(e,Wl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;xl(t,e),t=e.pendingProps;var r=zs(e,Jt.current);Rs(e,n),r=dh(null,e,i,t,r,n);var s=hh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mn(i)?(s=!0,Gl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,ah(e),r.updater=yc,e.stateNode=r,r._reactInternals=e,Rf(e,i,t,n),e=If(null,e,i,!0,s,n)):(e.tag=0,gt&&s&&eh(e),tn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(xl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Qy(i),t=Yn(i,t),r){case 0:e=Lf(null,e,i,t,n);break e;case 1:e=Wp(null,e,i,t,n);break e;case 11:e=Gp(null,e,i,t,n);break e;case 14:e=Vp(null,e,i,Yn(i.type,t),n);break e}throw Error(re(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Lf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Wp(t,e,i,r,n);case 3:e:{if(pv(e),t===null)throw Error(re(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Hg(t,e),ql(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Hs(Error(re(423)),e),e=Xp(t,e,i,n,r);break e}else if(i!==r){r=Hs(Error(re(424)),e),e=Xp(t,e,i,n,r);break e}else for(wn=nr(e.stateNode.containerInfo.firstChild),Tn=e,gt=!0,Kn=null,n=Og(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Fs(),i===r){e=Ii(t,e,n);break e}tn(t,e,i,n)}e=e.child}return e;case 5:return Gg(e),t===null&&Af(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Sf(i,r)?o=null:s!==null&&Sf(i,s)&&(e.flags|=32),hv(t,e),tn(t,e,o,n),e.child;case 6:return t===null&&Af(e),null;case 13:return mv(t,e,n);case 4:return lh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Os(e,null,i,n):tn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Gp(t,e,i,r,n);case 7:return tn(t,e,e.pendingProps,n),e.child;case 8:return tn(t,e,e.pendingProps.children,n),e.child;case 12:return tn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,lt(Xl,i._currentValue),i._currentValue=o,s!==null)if(ii(s.value,o)){if(s.children===r.children&&!pn.current){e=Ii(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ci(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),bf(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(re(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),bf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}tn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Rs(e,n),r=Hn(r),i=i(r),e.flags|=1,tn(t,e,i,n),e.child;case 14:return i=e.type,r=Yn(i,e.pendingProps),r=Yn(i.type,r),Vp(t,e,i,r,n);case 15:return fv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),xl(t,e),e.tag=1,mn(i)?(t=!0,Gl(e)):t=!1,Rs(e,n),lv(e,i,r),Rf(e,i,r,n),If(null,e,i,!0,t,n);case 19:return gv(t,e,n);case 22:return dv(t,e,n)}throw Error(re(156,e.tag))};function Iv(t,e){return sg(t,e)}function Zy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fn(t,e,n,i){return new Zy(t,e,n,i)}function Eh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Qy(t){if(typeof t=="function")return Eh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Gd)return 11;if(t===Vd)return 14}return 2}function or(t,e){var n=t.alternate;return n===null?(n=Fn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ml(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Eh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case hs:return zr(n.children,r,s,e);case Hd:o=8,r|=8;break;case Qu:return t=Fn(12,n,e,r|2),t.elementType=Qu,t.lanes=s,t;case Ju:return t=Fn(13,n,e,r),t.elementType=Ju,t.lanes=s,t;case ef:return t=Fn(19,n,e,r),t.elementType=ef,t.lanes=s,t;case G0:return Ec(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case B0:o=10;break e;case H0:o=9;break e;case Gd:o=11;break e;case Vd:o=14;break e;case Vi:o=16,i=null;break e}throw Error(re(130,t==null?t:typeof t,""))}return e=Fn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function zr(t,e,n,i){return t=Fn(7,t,i,e),t.lanes=n,t}function Ec(t,e,n,i){return t=Fn(22,t,i,e),t.elementType=G0,t.lanes=n,t.stateNode={isHidden:!1},t}function cu(t,e,n){return t=Fn(6,t,null,e),t.lanes=n,t}function uu(t,e,n){return e=Fn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Jy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Wc(0),this.expirationTimes=Wc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function wh(t,e,n,i,r,s,o,a,l){return t=new Jy(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Fn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ah(s),t}function eS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ds,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Dv(t){if(!t)return ur;t=t._reactInternals;e:{if(jr(t)!==t||t.tag!==1)throw Error(re(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(re(171))}if(t.tag===1){var n=t.type;if(mn(n))return Dg(t,n,e)}return e}function Nv(t,e,n,i,r,s,o,a,l){return t=wh(n,i,!0,t,r,s,o,a,l),t.context=Dv(null),n=t.current,i=nn(),r=sr(n),s=Ci(i,r),s.callback=e??null,ir(n,s,r),t.current.lanes=r,da(t,r,i),gn(t,i),t}function wc(t,e,n,i){var r=e.current,s=nn(),o=sr(r);return n=Dv(n),e.context===null?e.context=n:e.pendingContext=n,e=Ci(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=ir(r,e,o),t!==null&&(ni(t,r,o,s),gl(t,r,o)),o}function tc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function tm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Th(t,e){tm(t,e),(t=t.alternate)&&tm(t,e)}function tS(){return null}var Uv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ah(t){this._internalRoot=t}Tc.prototype.render=Ah.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(re(409));wc(t,e,null,null)};Tc.prototype.unmount=Ah.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Gr(function(){wc(null,t,null,null)}),e[Pi]=null}};function Tc(t){this._internalRoot=t}Tc.prototype.unstable_scheduleHydration=function(t){if(t){var e=dg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Xi.length&&e!==0&&e<Xi[n].priority;n++);Xi.splice(n,0,t),n===0&&pg(t)}};function bh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ac(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function nm(){}function nS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=tc(o);s.call(c)}}var o=Nv(e,i,t,0,null,!1,!1,"",nm);return t._reactRootContainer=o,t[Pi]=o.current,Jo(t.nodeType===8?t.parentNode:t),Gr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=tc(l);a.call(c)}}var l=wh(t,0,!1,null,null,!1,!1,"",nm);return t._reactRootContainer=l,t[Pi]=l.current,Jo(t.nodeType===8?t.parentNode:t),Gr(function(){wc(e,l,n,i)}),l}function bc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=tc(o);a.call(l)}}wc(e,o,t,r)}else o=nS(n,e,t,r,i);return tc(o)}ug=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Po(e.pendingLanes);n!==0&&(jd(e,n|1),gn(e,bt()),!(qe&6)&&(Gs=bt()+500,mr()))}break;case 13:Gr(function(){var i=Li(t,1);if(i!==null){var r=nn();ni(i,t,1,r)}}),Th(t,1)}};qd=function(t){if(t.tag===13){var e=Li(t,134217728);if(e!==null){var n=nn();ni(e,t,134217728,n)}Th(t,134217728)}};fg=function(t){if(t.tag===13){var e=sr(t),n=Li(t,e);if(n!==null){var i=nn();ni(n,t,e,i)}Th(t,e)}};dg=function(){return nt};hg=function(t,e){var n=nt;try{return nt=t,e()}finally{nt=n}};ff=function(t,e,n){switch(e){case"input":if(rf(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=vc(i);if(!r)throw Error(re(90));W0(i),rf(i,r)}}}break;case"textarea":j0(t,n);break;case"select":e=n.value,e!=null&&Ts(t,!!n.multiple,e,!1)}};J0=yh;eg=Gr;var iS={usingClientEntryPoint:!1,Events:[pa,vs,vc,Z0,Q0,yh]},fo={findFiberByHostInstance:Lr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},rS={bundleType:fo.bundleType,version:fo.version,rendererPackageName:fo.rendererPackageName,rendererConfig:fo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ni.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ig(t),t===null?null:t.stateNode},findFiberByHostInstance:fo.findFiberByHostInstance||tS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var za=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!za.isDisabled&&za.supportsFiber)try{hc=za.inject(rS),di=za}catch{}}Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=iS;Cn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bh(e))throw Error(re(200));return eS(t,e,null,n)};Cn.createRoot=function(t,e){if(!bh(t))throw Error(re(299));var n=!1,i="",r=Uv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=wh(t,1,!1,null,null,n,!1,i,r),t[Pi]=e.current,Jo(t.nodeType===8?t.parentNode:t),new Ah(e)};Cn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(re(188)):(t=Object.keys(t).join(","),Error(re(268,t)));return t=ig(e),t=t===null?null:t.stateNode,t};Cn.flushSync=function(t){return Gr(t)};Cn.hydrate=function(t,e,n){if(!Ac(e))throw Error(re(200));return bc(null,t,e,!0,n)};Cn.hydrateRoot=function(t,e,n){if(!bh(t))throw Error(re(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Uv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Nv(e,null,t,1,n??null,r,!1,s,o),t[Pi]=e.current,Jo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Tc(e)};Cn.render=function(t,e,n){if(!Ac(e))throw Error(re(200));return bc(null,t,e,!1,n)};Cn.unmountComponentAtNode=function(t){if(!Ac(t))throw Error(re(40));return t._reactRootContainer?(Gr(function(){bc(null,null,t,!1,function(){t._reactRootContainer=null,t[Pi]=null})}),!0):!1};Cn.unstable_batchedUpdates=yh;Cn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Ac(n))throw Error(re(200));if(t==null||t._reactInternals===void 0)throw Error(re(38));return bc(t,e,n,!1,i)};Cn.version="18.3.1-next-f1338f8080-20240426";function kv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kv)}catch(t){console.error(t)}}kv(),k0.exports=Cn;var sS=k0.exports,zv,im=sS;zv=im.createRoot,im.hydrateRoot;const oS=1.5;function El(t,e,n,i,r,s,o,a){let l=0,c=a,u=0,d=0,f=0;if(Math.abs(i)<1e-8){if(t<o.minX||t>o.maxX)return null}else{const p=1/i;let g=(o.minX-t)*p,x=(o.maxX-t)*p,m=-1;if(g>x){const h=g;g=x,x=h,m=1}if(g>l&&(l=g,u=m,d=0,f=0),x<c&&(c=x),l>c)return null}if(Math.abs(r)<1e-8){if(e<o.minY||e>o.maxY)return null}else{const p=1/r;let g=(o.minY-e)*p,x=(o.maxY-e)*p,m=-1;if(g>x){const h=g;g=x,x=h,m=1}if(g>l&&(l=g,u=0,d=m,f=0),x<c&&(c=x),l>c)return null}if(Math.abs(s)<1e-8){if(n<o.minZ||n>o.maxZ)return null}else{const p=1/s;let g=(o.minZ-n)*p,x=(o.maxZ-n)*p,m=-1;if(g>x){const h=g;g=x,x=h,m=1}if(g>l&&(l=g,u=0,d=0,f=m),x<c&&(c=x),l>c)return null}return l<0?null:{t:l,nx:u,ny:d,nz:f}}class aS{constructor(e){te(this,"items",[]);te(this,"keys");this.keys=new Float64Array(e)}setCapacity(e){this.keys.length<e&&(this.keys=new Float64Array(e))}get size(){return this.items.length}clear(){this.items.length=0}push(e,n){this.keys[e]=n,this.items.push(e);let i=this.items.length-1;for(;i>0;){const r=i-1>>1;if(this.keys[this.items[r]]<=this.keys[this.items[i]])break;const s=this.items[r];this.items[r]=this.items[i],this.items[i]=s,i=r}}pop(){if(this.items.length===0)return;const e=this.items[0],n=this.items.pop();if(this.items.length>0){this.items[0]=n;let i=0;for(;;){const r=2*i+1,s=r+1;let o=i;if(r<this.items.length&&this.keys[this.items[r]]<this.keys[this.items[o]]&&(o=r),s<this.items.length&&this.keys[this.items[s]]<this.keys[this.items[o]]&&(o=s),o===i)break;const a=this.items[o];this.items[o]=this.items[i],this.items[i]=a,i=o}}return e}}const ot={minX:0,maxX:0,minY:0,maxY:0,minZ:0,maxZ:0};class lS{constructor(e,n,i,r,s){te(this,"cols");te(this,"rows");te(this,"cell");te(this,"ox");te(this,"oz");te(this,"walkable");te(this,"region");te(this,"height");te(this,"roof");te(this,"gScore");te(this,"fScore");te(this,"cameFrom");te(this,"closed");te(this,"open");te(this,"heap");te(this,"stamp");te(this,"currentStamp",1);this.cols=e,this.rows=n,this.cell=i,this.ox=r,this.oz=s;const o=e*n;this.walkable=new Uint8Array(o),this.region=new Uint8Array(o),this.height=new Float32Array(o),this.roof=new Uint8Array(o),this.gScore=new Float32Array(o),this.fScore=new Float32Array(o),this.cameFrom=new Int32Array(o),this.closed=new Uint8Array(o),this.open=new Uint8Array(o),this.stamp=new Int32Array(o),this.heap=new aS(o)}idx(e,n){return n*this.cols+e}inBounds(e,n){return e>=0&&n>=0&&e<this.cols&&n<this.rows}cellX(e){return Math.floor((e-this.ox)/this.cell)}cellZ(e){return Math.floor((e-this.oz)/this.cell)}centerX(e){return this.ox+(e+.5)*this.cell}centerZ(e){return this.oz+(e+.5)*this.cell}minXOf(e){return this.ox+e*this.cell}minZOf(e){return this.oz+e*this.cell}isWalkableCell(e,n){return this.inBounds(e,n)?this.walkable[this.idx(e,n)]===1:!1}isWalkableAt(e,n){return this.isWalkableCell(this.cellX(e),this.cellZ(n))}regionAt(e,n){const i=this.cellX(e),r=this.cellZ(n);return this.inBounds(i,r)?this.region[this.idx(i,r)]:0}heightAt(e,n){const i=this.cellX(e),r=this.cellZ(n);return this.inBounds(i,r)?this.height[this.idx(i,r)]:0}hasRoofAt(e,n){const i=this.cellX(e),r=this.cellZ(n);return this.inBounds(i,r)?this.roof[this.idx(i,r)]===1:!0}fillRect(e,n,i,r,s,o,a){const l=Math.max(0,this.cellX(e)),c=Math.min(this.cols-1,Math.ceil((i-this.ox)/this.cell)-1),u=Math.max(0,this.cellZ(n)),d=Math.min(this.rows-1,Math.ceil((r-this.oz)/this.cell)-1);for(let f=u;f<=d;f++)for(let p=l;p<=c;p++){const g=this.idx(p,f);s!==0&&(this.walkable[g]=1,this.region[g]=s,this.height[g]=o,this.roof[g]=a?1:0)}}finalise(){const e=new Float32Array(this.cols*this.rows);for(let n=0;n<this.rows;n++)for(let i=0;i<this.cols;i++){const r=this.idx(i,n);if(this.walkable[r]){e[r]=this.height[r];continue}let s=0;for(let o=-1;o<=1;o++)for(let a=-1;a<=1;a++){const l=i+a,c=n+o;if(!this.inBounds(l,c))continue;const u=this.idx(l,c);this.walkable[u]&&(s=Math.max(s,this.height[u]))}e[r]=s>0?s:4}for(let n=0;n<e.length;n++)e[n]===0&&(e[n]=4);this.height.set(e)}raycast(e,n,i,r,s,o,a){let l=this.cellX(e),c=this.cellZ(i);const u=r>0?1:-1,d=o>0?1:-1,f=Math.abs(r)<1e-9?1/0:Math.abs(this.cell/r),p=Math.abs(o)<1e-9?1/0:Math.abs(this.cell/o);let g;Math.abs(r)<1e-9?g=1/0:(g=(this.minXOf(l)+(r>0?this.cell:0)-e)/r,g<0&&(g=0));let x;Math.abs(o)<1e-9?x=1/0:(x=(this.minZOf(c)+(o>0?this.cell:0)-i)/o,x<0&&(x=0));let m=0,h=0;const v=(this.cols+this.rows)*2+8;for(;h++<v&&!(!this.inBounds(l,c)&&(m>0||g===1/0&&x===1/0));){if(this.inBounds(l,c)){const _=this.idx(l,c);if(this.walkable[_]!==1){const S=this.height[_];ot.minX=this.minXOf(l),ot.maxX=ot.minX+this.cell,ot.minZ=this.minZOf(c),ot.maxZ=ot.minZ+this.cell,ot.minY=0,ot.maxY=S;const C=El(e,n,i,r,s,o,ot,a);if(C&&C.t<=a)return{t:C.t,x:e+r*C.t,y:n+s*C.t,z:i+o*C.t,nx:C.nx,ny:C.ny,nz:C.nz}}else if(this.roof[_]===1){const S=this.height[_];ot.minX=this.minXOf(l),ot.maxX=ot.minX+this.cell,ot.minZ=this.minZOf(c),ot.maxZ=ot.minZ+this.cell,ot.minY=S-.35,ot.maxY=S;const C=El(e,n,i,r,s,o,ot,a);if(C&&C.t<=a)return{t:C.t,x:e+r*C.t,y:n+s*C.t,z:i+o*C.t,nx:C.nx,ny:C.ny,nz:C.nz}}else if(s<0){ot.minX=this.minXOf(l),ot.maxX=ot.minX+this.cell,ot.minZ=this.minZOf(c),ot.maxZ=ot.minZ+this.cell,ot.minY=-.35,ot.maxY=0;const S=El(e,n,i,r,s,o,ot,a);if(S&&S.t<=a)return{t:S.t,x:e+r*S.t,y:n+s*S.t,z:i+o*S.t,nx:S.nx,ny:S.ny,nz:S.nz}}}if(g<x){if(g>a)break;m=g,l+=u,g+=f}else{if(x>a)break;m=x,c+=d,x+=p}if(!this.inBounds(l,c))break}return null}nearestWalkable(e,n){const i=Math.min(this.cols-1,Math.max(0,this.cellX(e))),r=Math.min(this.rows-1,Math.max(0,this.cellZ(n)));if(this.isWalkableCell(i,r))return{x:this.centerX(i),z:this.centerZ(r)};const s=Math.max(this.cols,this.rows);for(let o=1;o<=s;o++)for(let a=-o;a<=o;a++)for(let l=-o;l<=o;l++){if(Math.max(Math.abs(l),Math.abs(a))!==o)continue;const c=i+l,u=r+a;if(this.isWalkableCell(c,u))return{x:this.centerX(c),z:this.centerZ(u)}}return null}findPath(e,n,i,r,s=12e3){const o=this.nearestWalkable(e,n),a=this.nearestWalkable(i,r);if(!o||!a)return[];const l=this.cellX(o.x),c=this.cellZ(o.z),u=this.cellX(a.x),d=this.cellZ(a.z),f=this.idx(l,c),p=this.idx(u,d);if(f===p)return[{x:a.x,z:a.z}];const g=++this.currentStamp,x=this.cols*this.rows;this.heap.setCapacity(x),this.heap.clear(),this.stamp[f]=g,this.gScore[f]=0,this.fScore[f]=this.heuristic(l,c,u,d),this.cameFrom[f]=-1,this.closed[f]=0,this.open[f]=1,this.heap.push(f,this.fScore[f]);let m=0,h=!1;for(;this.heap.size>0;){const A=this.heap.pop();if(this.stamp[A]!==g)continue;if(A===p){h=!0;break}if(this.closed[A]===1&&this.stamp[A]===g)continue;if(this.closed[A]=1,++m>s)break;const T=A%this.cols,b=(A-T)/this.cols,H=this.gScore[A];for(let y=-1;y<=1;y++)for(let M=-1;M<=1;M++){if(M===0&&y===0)continue;const D=T+M,U=b+y;if(!this.isWalkableCell(D,U)||M!==0&&y!==0&&(!this.isWalkableCell(T+M,b)||!this.isWalkableCell(T,b+y)))continue;const O=this.idx(D,U);if(this.stamp[O]===g&&this.closed[O]===1)continue;const z=H+(M!==0&&y!==0?1.41421356:1);this.stamp[O]!==g?(this.stamp[O]=g,this.closed[O]=0,this.open[O]=1,this.gScore[O]=z,this.cameFrom[O]=A,this.fScore[O]=z+this.heuristic(D,U,u,d),this.heap.push(O,this.fScore[O])):z<this.gScore[O]&&(this.gScore[O]=z,this.cameFrom[O]=A,this.fScore[O]=z+this.heuristic(D,U,u,d),this.heap.push(O,this.fScore[O]))}}if(!h)return[];const v=[];let _=p,S=0;for(;_!==-1&&S++<2e4&&(v.push(_),!(_===f||(_=this.cameFrom[_],this.stamp[_]!==g))););v.reverse();const C=v.map(A=>{const T=A%this.cols,b=(A-T)/this.cols;return{x:this.centerX(T),z:this.centerZ(b)}});return C.length>0&&(C[C.length-1]={x:a.x,z:a.z}),this.simplify(C,e,n)}heuristic(e,n,i,r){const s=Math.abs(e-i),o=Math.abs(n-r);return s+o+(1.41421356-2)*Math.min(s,o)+.001*(s+o)}simplify(e,n,i){if(e.length<=2)return e;const r=[];let s=n,o=i,a=0;for(;a<e.length;){let l=e.length-1;for(;l>a&&!this.clearLine(s,o,e[l].x,e[l].z);l--);l<=a&&(l=a),r.push({x:e[l].x,z:e[l].z}),s=e[l].x,o=e[l].z,a=l+1}return r}clearLine(e,n,i,r){const s=i-e,o=r-n,a=Math.hypot(s,o);if(a<1e-4)return!0;const l=Math.ceil(a/(this.cell*.4)),c=.42;for(let u=0;u<=l;u++){const d=u/l,f=e+s*d,p=n+o*d;if(!this.isWalkableAt(f,p)||!this.isWalkableAt(f+c,p)||!this.isWalkableAt(f-c,p)||!this.isWalkableAt(f,p+c)||!this.isWalkableAt(f,p-c))return!1}return!0}reachableFrom(e,n){const i=this.nearestWalkable(e,n),r=new Uint8Array(this.cols*this.rows);if(!i)return r;const s=[],o=this.idx(this.cellX(i.x),this.cellZ(i.z));r[o]=1,s.push(o);let a=0;for(;a<s.length;){const l=s[a++],c=l%this.cols,u=(l-c)/this.cols;for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){if(f===0&&d===0)continue;const p=c+f,g=u+d;if(!this.isWalkableCell(p,g)||f!==0&&d!==0&&(!this.isWalkableCell(c+f,u)||!this.isWalkableCell(c,u+d)))continue;const x=this.idx(p,g);r[x]||(r[x]=1,s.push(x))}}return r}}const Cc=[{id:"UPPER_TUNNEL",label:"上洞",x0:-20,z0:30,x1:18,z1:42,roof:!0,height:3.4,priority:3},{id:"TUNNEL_BEND",label:"洞弯道",x0:12,z0:26,x1:32,z1:38,roof:!0,height:3.4,priority:3},{id:"B_TUNNEL",label:"B 洞",x0:26,z0:-2,x1:38,z1:34,roof:!0,height:3.4,priority:4},{id:"T_SPAWN",label:"T 出生点",x0:-49,z0:18,x1:-10,z1:40,roof:!1,height:5,priority:8},{id:"A_LONG",label:"A 大",x0:-54,z0:-26,x1:-45,z1:22,roof:!0,height:4.2,priority:4},{id:"A_SITE",label:"A 点",x0:-54,z0:-46,x1:-34,z1:-20,roof:!1,height:6,priority:9},{id:"MID",label:"中路",x0:-13,z0:-20,x1:-1,z1:22,roof:!0,height:3.6,priority:4},{id:"CATWALK",label:"猫道",x0:-44,z0:-36,x1:-12,z1:-30,roof:!1,height:4.4,priority:6},{id:"TOP_MID",label:"中门上",x0:-16,z0:-46,x1:10,z1:-30,roof:!1,height:5.2,priority:5},{id:"MID_DOORS",label:"中门",x0:-14,z0:-36,x1:0,z1:-16,roof:!0,height:3.6,priority:7},{id:"CT_MID",label:"CT 中路",x0:4,z0:-42,x1:26,z1:-26,roof:!1,height:5,priority:4},{id:"CT_SPAWN",label:"CT 出生点",x0:22,z0:-46,x1:54,z1:-26,roof:!1,height:5.6,priority:8},{id:"B_DOORS",label:"B 门",x0:16,z0:-32,x1:32,z1:-16,roof:!0,height:3.6,priority:7},{id:"B_SITE",label:"B 点",x0:26,z0:-20,x1:52,z1:6,roof:!1,height:6,priority:9}],Fv={};Cc.forEach((t,e)=>Fv[t.id]=e);const Rc=[{id:"a-crate-1",x:-50,z:-26,w:2.4,d:2.4,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"a-crate-2",x:-46.5,z:-23.5,w:2.4,d:2.4,h:2.6,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"a-crate-3",x:-50,z:-43,w:3,d:2.2,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"a-platform",x:-38.5,z:-42,w:7,d:3,h:1.1,y:0,solid:!0,penetrable:!1,kind:"platform"},{id:"a-sandbag-1",x:-44,z:-31,w:3.4,d:1.1,h:1,y:0,solid:!0,penetrable:!1,kind:"sandbag"},{id:"a-barrel-1",x:-41,z:-27,w:1.2,d:1.2,h:1.5,y:0,solid:!0,penetrable:!1,kind:"barrel"},{id:"al-crate-1",x:-51,z:8,w:2.6,d:2.6,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"al-barrel-1",x:-47,z:-6,w:1.2,d:1.2,h:1.5,y:0,solid:!0,penetrable:!1,kind:"barrel"},{id:"al-barrel-2",x:-51,z:-12,w:1.2,d:1.2,h:1.5,y:0,solid:!0,penetrable:!1,kind:"barrel"},{id:"al-car",x:-47.5,z:-21.5,w:4.6,d:1.8,h:1.5,y:0,solid:!0,penetrable:!1,kind:"car"},{id:"al-crate-2",x:-51.5,z:-18,w:2.4,d:2.4,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"b-crate-1",x:30,z:-14,w:2.6,d:2.6,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"b-crate-2",x:34,z:-10,w:2.6,d:2.6,h:2.6,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"b-crate-3",x:44,z:-16,w:2.6,d:2.6,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"b-crate-4",x:48,z:0,w:3,d:2.6,h:2.6,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"b-platform",x:40,z:-18,w:6,d:2.6,h:1.1,y:0,solid:!0,penetrable:!1,kind:"platform"},{id:"b-barrel-1",x:28,z:2,w:1.2,d:1.2,h:1.5,y:0,solid:!0,penetrable:!1,kind:"barrel"},{id:"mid-xbox",x:-6,z:-33,w:2.2,d:2.2,h:1.4,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"mid-door-l",x:-12.6,z:-27,w:2.6,d:.35,h:3.2,y:0,solid:!0,penetrable:!1,kind:"door"},{id:"mid-door-r",x:-1.4,z:-27,w:2.6,d:.35,h:3.2,y:0,solid:!0,penetrable:!1,kind:"door"},{id:"ct-crate-1",x:26,z:-42,w:2.4,d:2.4,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"t-crate-1",x:-40,z:22,w:2.4,d:2.4,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"},{id:"tunnel-crate-1",x:31,z:20,w:2.4,d:2.4,h:1.3,y:0,solid:!0,penetrable:!1,kind:"crate"}],Qs=[{id:"A",label:"A 点",x0:-53,z0:-44,x1:-36,z1:-24,plantSpot:{x:-44,z:-34}},{id:"B",label:"B 点",x0:28,z0:-18,x1:50,z1:2,plantSpot:{x:39,z:-8}}],cS=[{x:-42,z:34},{x:-36,z:36},{x:-30,z:34},{x:-26,z:37},{x:-33,z:30}],uS=[{x:48,z:-32},{x:42,z:-34},{x:36,z:-31},{x:30,z:-34},{x:45,z:-40}],Yt={A_LONG_START:{x:-50,z:18},A_LONG_MID:{x:-50,z:0},A_LONG_END:{x:-49,z:-22},A_SITE:{x:-44,z:-33},CATWALK:{x:-30,z:-33},TOP_MID:{x:-5,z:-38},MID_DOORS:{x:-7,z:-24},MID:{x:-7,z:0},T_MID_EXIT:{x:-20,z:30},CT_MID:{x:12,z:-36},B_DOORS:{x:24,z:-24},B_SITE:{x:39,z:-7},B_TUNNEL:{x:32,z:20},TUNNEL_BEND:{x:22,z:32},UPPER_TUNNEL:{x:0,z:36}};function fS(){return Rc.filter(t=>t.solid).map(t=>({minX:t.x-t.w/2,maxX:t.x+t.w/2,minY:t.y,maxY:t.y+t.h,minZ:t.z-t.d/2,maxZ:t.z+t.d/2}))}function dS(){return Rc.filter(t=>t.solid&&!t.penetrable).map(t=>({minX:t.x-t.w/2,maxX:t.x+t.w/2,minY:t.y,maxY:t.y+t.h,minZ:t.z-t.d/2,maxZ:t.z+t.d/2}))}const hS=84,pS=66,mS=-66,gS=-51;function vS(){const t=new lS(hS,pS,oS,mS,gS),e=[...Cc].sort((n,i)=>n.priority-i.priority);for(const n of e)t.fillRect(n.x0,n.z0,n.x1,n.z1,Fv[n.id]+1,n.height,n.roof);return t.finalise(),t}function rm(t,e){for(const n of Qs)if(t>=n.x0&&t<=n.x1&&e>=n.z0&&e<=n.z1)return n;return null}const Bn={ak47:{id:"ak47",name:"AK-47",short:"AK",category:"primary",defaultFor:null,price:2700,damage:36,headshotMultiplier:2,armorPenetration:.78,rangeModifier:.98,range:60,penetration:.6,rpm:600,auto:!0,burst:0,magSize:30,reserveAmmo:90,reloadTime:2.4,triggerReset:0,moveSpeed:.93,spread:{base:.0085,move:.0075,air:.026,perShot:.0055,max:.055,recover:3.6},recoil:{vertical:.0195,horizontal:.0072,returnToZero:.72,recover:8.5,punch:1},ads:null,drawTime:.45,viewModel:{length:.92,bodyColor:5913122,accentColor:2829103,metalColor:4868688,barrel:.3,hasStock:!0,hasScope:!1,magSize:.2,blade:!1},audio:{dur:.16,freq:150,cutoff:2600,snap:.9,gain:.85,tail:.3},crosshair:"cross"},m4a4:{id:"m4a4",name:"M4A4",short:"M4",category:"primary",defaultFor:null,price:2900,damage:33,headshotMultiplier:2,armorPenetration:.7,rangeModifier:.97,range:60,penetration:.6,rpm:666,auto:!0,burst:0,magSize:30,reserveAmmo:90,reloadTime:3,triggerReset:0,moveSpeed:.95,spread:{base:.007,move:.0065,air:.022,perShot:.0034,max:.04,recover:4.6},recoil:{vertical:.0112,horizontal:.004,returnToZero:.8,recover:11,punch:.72},ads:null,drawTime:.45,viewModel:{length:.86,bodyColor:3093302,accentColor:1908771,metalColor:5988195,barrel:.26,hasStock:!0,hasScope:!1,magSize:.18,blade:!1},audio:{dur:.13,freq:205,cutoff:3400,snap:1,gain:.72,tail:.24},crosshair:"cross"},awp:{id:"awp",name:"AWP",short:"AWP",category:"primary",defaultFor:null,price:4750,damage:118,headshotMultiplier:2,armorPenetration:.97,rangeModifier:.99,range:90,penetration:1,rpm:41,auto:!1,burst:0,magSize:10,reserveAmmo:30,reloadTime:3.6,triggerReset:1.45,moveSpeed:.82,spread:{base:.0018,move:.03,air:.09,perShot:.024,max:.14,recover:2.2},recoil:{vertical:.045,horizontal:.01,returnToZero:.55,recover:6,punch:1.5},ads:{fov:22,time:.24,scope:!0,sensitivity:.42},drawTime:.7,viewModel:{length:1.18,bodyColor:4016687,accentColor:2369565,metalColor:5132887,barrel:.52,hasStock:!0,hasScope:!0,magSize:.16,blade:!1},audio:{dur:.34,freq:88,cutoff:1500,snap:.6,gain:1,tail:.85},crosshair:"scope"},glock:{id:"glock",name:"Glock-18",short:"Glock",category:"secondary",defaultFor:"T",price:200,damage:25,headshotMultiplier:2,armorPenetration:.47,rangeModifier:.9,range:35,penetration:.3,rpm:400,auto:!1,burst:3,magSize:20,reserveAmmo:120,reloadTime:2.2,triggerReset:.15,moveSpeed:1,spread:{base:.009,move:.006,air:.02,perShot:.0045,max:.045,recover:4},recoil:{vertical:.01,horizontal:.0038,returnToZero:.78,recover:9,punch:.55},ads:null,drawTime:.35,viewModel:{length:.42,bodyColor:2764081,accentColor:1514013,metalColor:5527645,barrel:.08,hasStock:!1,hasScope:!1,magSize:.1,blade:!1},audio:{dur:.1,freq:260,cutoff:4200,snap:1,gain:.55,tail:.16},crosshair:"cross"},usp:{id:"usp",name:"USP-S",short:"USP",category:"secondary",defaultFor:"CT",price:200,damage:30,headshotMultiplier:2,armorPenetration:.5,rangeModifier:.92,range:38,penetration:.3,rpm:352,auto:!1,burst:0,magSize:12,reserveAmmo:48,reloadTime:2.2,triggerReset:.17,moveSpeed:1,spread:{base:.0078,move:.0058,air:.019,perShot:.004,max:.04,recover:4.4},recoil:{vertical:.0088,horizontal:.0032,returnToZero:.8,recover:9.5,punch:.5},ads:null,drawTime:.35,viewModel:{length:.44,bodyColor:3356733,accentColor:1777185,metalColor:5922662,barrel:.1,hasStock:!1,hasScope:!1,magSize:.1,blade:!1},audio:{dur:.11,freq:240,cutoff:4e3,snap:1,gain:.58,tail:.18},crosshair:"cross"},deagle:{id:"deagle",name:"Desert Eagle",short:"Deagle",category:"secondary",defaultFor:null,price:700,damage:53,headshotMultiplier:2,armorPenetration:.93,rangeModifier:.81,range:45,penetration:.7,rpm:267,auto:!1,burst:0,magSize:7,reserveAmmo:35,reloadTime:2.2,triggerReset:.24,moveSpeed:.96,spread:{base:.006,move:.0105,air:.03,perShot:.0165,max:.07,recover:3},recoil:{vertical:.031,horizontal:.0085,returnToZero:.66,recover:7,punch:1.25},ads:null,drawTime:.45,viewModel:{length:.54,bodyColor:4868686,accentColor:2763310,metalColor:8422538,barrel:.16,hasStock:!1,hasScope:!1,magSize:.11,blade:!1},audio:{dur:.22,freq:130,cutoff:2100,snap:.85,gain:.92,tail:.44},crosshair:"cross"},knife:{id:"knife",name:"Knife",short:"Knife",category:"melee",defaultFor:null,price:0,damage:40,headshotMultiplier:2,armorPenetration:.85,rangeModifier:1,range:2,penetration:0,rpm:150,auto:!1,burst:0,magSize:0,reserveAmmo:0,reloadTime:0,triggerReset:.45,moveSpeed:1.05,spread:{base:0,move:0,air:0,perShot:0,max:0,recover:10},recoil:{vertical:.006,horizontal:0,returnToZero:1,recover:12,punch:.25},ads:null,drawTime:.25,viewModel:{length:.36,bodyColor:2040100,accentColor:9080726,metalColor:12830926,barrel:0,hasStock:!1,hasScope:!1,magSize:0,blade:!0},audio:{dur:.09,freq:620,cutoff:6e3,snap:1,gain:.35,tail:.06},crosshair:"dot"}},Ov=[{id:"head",label:"头部",multiplier:2,minY:1.53,maxY:1.82,halfW:.145,halfD:.145},{id:"chest",label:"胸部",multiplier:1,minY:1.16,maxY:1.53,halfW:.245,halfD:.165},{id:"stomach",label:"腹部",multiplier:.95,minY:.94,maxY:1.16,halfW:.225,halfD:.155},{id:"arms",label:"手臂",multiplier:.8,minY:.94,maxY:1.53,halfW:.36,halfD:.2},{id:"legs",label:"腿部",multiplier:.7,minY:0,maxY:.94,halfW:.24,halfD:.19}],pi={height:1.8,eyeHeight:1.62,radius:.36};function qi(t,e=0){const n=Bn[t];return{id:t,ammo:n.magSize,reserve:n.reserveAmmo,reloadEnd:0,reloading:!1,nextFireTime:e,readyTime:e}}function Dn(t){return Bn[t]}const _S=.5;function xS(t,e){if(t.category==="melee")return 1;const n=Math.min(1,Math.max(0,(e-t.range*.25)/(t.range*.75)));return 1+(t.rangeModifier-1)*n}function yS(t,e,n,i){const r=Ov.find(c=>c.id===e),s=e==="head";let o=t.damage*r.multiplier*xS(t,n);s&&(o=Math.max(o,t.damage*t.headshotMultiplier*(s?1:0)));let a=0;return i>0&&t.category!=="melee"&&(a=o*_S*(1-t.armorPenetration),a=Math.min(a,i),o-=a),{health:Math.max(1,Math.round(o)),absorbed:Math.round(a),hitbox:e,headshot:s,lethal:!1}}function SS(t){return t*.5}const Vo=Math.PI*2;function pt(t,e,n){return t<e?e:t>n?n:t}function Nn(t,e,n){return t+(e-t)*n}function Zi(t,e,n,i){return Nn(t,e,1-Math.exp(-n*i))}function Nt(t,e){return t+Math.random()*(e-t)}function la(t,e){let n=(e-t)%Vo;return n>Math.PI&&(n-=Vo),n<-Math.PI&&(n+=Vo),n}function Bv(t,e,n){const i=la(t,e);return Math.abs(i)<=n?e:t+Math.sign(i)*n}function Dt(t,e,n,i){const r=t-n,s=e-i;return Math.sqrt(r*r+s*s)}function MS(t,e,n,i){const r=t-n,s=e-i;return r*r+s*s}function ES(t,e,n,i,r,s){return t*i+e*r+n*s}const wS=20,TS=6.2,AS=.55,bS=.08,Hv=32,fu=24,sm=-1.5;function CS(t,e,n,i,r){return{x:t,y:e,z:n,vx:0,vy:0,vz:0,radius:i,height:r,onGround:!0}}function RS(t,e,n){const i=n.radius;let r=0;const s=t.cellX(n.x-i),o=t.cellX(n.x+i),a=t.cellZ(n.z-i),l=t.cellZ(n.z+i),c=n.y+AS;for(let u=a;u<=l;u++)for(let d=s;d<=o;d++){if(!t.inBounds(d,u))continue;const f=t.idx(d,u);if(t.walkable[f]===1)continue;const p=t.height[f];p<=c&&p>r&&(r=p)}for(const u of e)n.x+i<=u.minX||n.x-i>=u.maxX||n.z+i<=u.minZ||n.z-i>=u.maxZ||u.maxY<=c&&u.maxY>r&&(r=u.maxY);return r}function PS(t,e,n){const i=n.radius;let r=1/0;const s=t.cellX(n.x-i),o=t.cellX(n.x+i),a=t.cellZ(n.z-i),l=t.cellZ(n.z+i),c=n.y+n.height-.05;for(let u=a;u<=l;u++)for(let d=s;d<=o;d++){if(!t.inBounds(d,u))continue;const f=t.idx(d,u);if(t.walkable[f]!==1||t.roof[f]!==1)continue;const p=t.height[f]-.35;p>=c&&p<r&&(r=p)}for(const u of e)n.x+i<=u.minX||n.x-i>=u.maxX||n.z+i<=u.minZ||n.z-i>=u.maxZ||u.minY>=c&&u.minY<r&&(r=u.minY);return r}function om(t,e,n,i,r){const s=n.radius,o=n.y+bS,a=n.y+n.height,l=t.cellX(n.x-s),c=t.cellX(n.x+s),u=t.cellZ(n.z-s),d=t.cellZ(n.z+s);for(let f=u;f<=d;f++)for(let p=l;p<=c;p++){if(!t.inBounds(p,f))continue;const g=t.idx(p,f);if(t.walkable[g]===1||t.height[g]<=o)continue;const m=t.minXOf(p),h=m+t.cell,v=t.minZOf(f),_=v+t.cell;a<=0||n.x+s<=m||n.x-s>=h||n.z+s<=v||n.z-s>=_||(i===0?n.x=r>0?m-s:r<0?h+s:Math.abs(m-s-n.x)<Math.abs(h+s-n.x)?m-s:h+s:n.z=r>0?v-s:r<0?_+s:Math.abs(v-s-n.z)<Math.abs(_+s-n.z)?v-s:_+s)}for(const f of e)f.maxY<=o||a<=f.minY||n.x+s<=f.minX||n.x-s>=f.maxX||n.z+s<=f.minZ||n.z-s>=f.maxZ||(i===0?n.x=r>0?f.minX-s:r<0?f.maxX+s:Math.abs(f.minX-s-n.x)<Math.abs(f.maxX+s-n.x)?f.minX-s:f.maxX+s:n.z=r>0?f.minZ-s:r<0?f.maxZ+s:Math.abs(f.minZ-s-n.z)<Math.abs(f.maxZ+s-n.z)?f.minZ-s:f.maxZ+s)}function Io(t,e,n,i,r){if(i===0&&r===0)return;const s=Math.hypot(i,r),o=Math.max(.05,n.radius*.5),a=Math.min(Hv,Math.max(1,Math.ceil(s/o))),l=i/a,c=r/a,u=Math.sign(i),d=Math.sign(r);for(let f=0;f<a;f++)l!==0&&(n.x+=l,om(t,e,n,0,u)),c!==0&&(n.z+=c,om(t,e,n,1,d))}function LS(t,e){if(t.isWalkableAt(e.x,e.z))return;const n=t.nearestWalkable(e.x,e.z);n&&(e.x=n.x,e.z=n.z,e.vx=0,e.vz=0,e.onGround||(e.vy=Math.min(e.vy,0)))}function Wf(t,e,n,i){n.vy-=wS*i,n.vy>0&&n.y>=fu&&(n.vy=0);const r=Math.abs(n.vy*i),s=Math.min(Hv,Math.max(1,Math.ceil(r/.25))),o=n.vy*i/s;n.onGround=!1;for(let a=0;a<s;a++){let l=n.y+o;l>fu&&(l=fu,n.vy=0),l<sm&&(l=sm,n.vy=0);const c=PS(t,e,n);if(c<1/0){const d=c-n.height;l>d&&(l=d,n.vy>0&&(n.vy=0))}const u=RS(t,e,n);if(l<=u&&(l=u,n.vy=0,n.onGround=!0),n.y=l,n.vy===0)break}}function Gv(t,e,n,i,r,s,o,a,l){const c=t.raycast(n,i,r,s,o,a,l);let u=c?{...c,prop:!1}:null,d=c?c.t:l;for(const f of e){const p=El(n,i,r,s,o,a,f,d);p&&p.t<d&&(d=p.t,u={t:p.t,x:n+s*p.t,y:i+o*p.t,z:r+a*p.t,nx:p.nx,ny:p.ny,nz:p.nz,prop:!0})}return u}function IS(t,e,n,i,r,s,o,a){const l=s-n,c=o-i,u=a-r,d=Math.hypot(l,c,u);return d<.001?!0:Gv(t,e,n,i,r,l/d,c/d,u/d,d-.05)===null}const DS=1.02;function Xf(t,e,n){const i=t.onGround,r=i?e.friction:e.friction*.12,s=i?e.accel:e.accel*e.airAccel,o=Math.hypot(t.vx,t.vz);if(o>1e-4){const d=Math.max(o,4)*r*n,f=Math.max(0,o-d)/o;t.vx*=f,t.vz*=f}else t.vx=0,t.vz=0;const a=t.vx*e.wishX+t.vz*e.wishZ,l=e.speed-a;if(l>0){const d=Math.min(s*e.speed*n,l);t.vx+=e.wishX*d,t.vz+=e.wishZ*d}const c=Math.hypot(t.vx,t.vz),u=e.speed*DS;c>u&&c>1e-4&&(t.vx=t.vx/c*u,t.vz=t.vz/c*u)}const NS=["Viper","Frost","Slate","Nomad","Kite"],US=["Raiz","Blitz","Kobra","Dune","Havoc"];function ho(t){return{state:"advance",role:t,goal:null,path:[],pathIndex:0,repathTimer:0,stuckTimer:0,lastX:0,lastZ:0,targetId:null,lastSeenX:0,lastSeenZ:0,lastSeenTime:-99,visible:!1,reactionTimer:0,trackTime:0,aimHigh:!1,burstLeft:0,burstPause:0,strafeDir:Math.random()<.5?-1:1,strafeTimer:0,holdSpot:null,route:[],routeIndex:0,decisionTimer:0,aggression:.6+Math.random()*.4}}function _r(t){return{primary:null,secondary:t==="T"?"glock":"usp",armor:0,helmet:!1,kit:!1}}function am(t){const e=t==="T"?["ak47","ak47","ak47","awp","m4a4"]:["m4a4","m4a4","m4a4","awp","ak47"];return{primary:e[Math.floor(Math.random()*e.length)],secondary:Math.random()<.5?"deagle":t==="T"?"glock":"usp",armor:100,helmet:Math.random()<.8,kit:t==="CT"}}function po(t,e,n,i,r,s){const o=CS(r.x,0,r.z,pi.radius,pi.height),a=n==="T"?Math.PI*.75:-Math.PI*.25,l={secondary:qi(s.secondary),melee:qi("knife")};return s.primary&&(l.primary=qi(s.primary)),{id:t,name:e,team:n,isHuman:i,alive:!0,health:100,armor:s.armor,helmet:s.helmet,hasDefuseKit:s.kit,body:o,yaw:a+(Math.random()-.5)*.4,pitch:0,slot:s.primary?"primary":"secondary",weapons:l,primaryId:s.primary,hasBomb:!1,plantHold:0,defuseHold:0,spread:0,recoilPitch:0,recoilYaw:0,recoilDebt:0,ads:!1,adsAmount:0,triggerHeld:!1,burstLeft:0,kills:0,deaths:0,damage:0,lastHitTime:-99,lastHitFromX:0,lastHitFromZ:0,animPhase:Math.random()*10,stepAccum:0,deathTime:0,deathYaw:0,brain:null}}function Fa(t){return t==="T"?cS:uS}function kS(t,e,n,i,r,s,o,a){if(!t.alive)return null;t.body.radius;const l=t.body.x,c=t.body.z,u=t.body.y,d=l-e,f=u+pi.height*.5-n,p=c-i,g=d*r+f*s+p*o;if(g<-1||g>a+1)return null;const x=d-r*g,m=f-s*g,h=p-o*g;if(x*x+m*m+h*h>1.4*1.4)return null;let v=null;for(const _ of Ov){const S=u+_.minY,C=u+_.maxY,A=l-_.halfW,T=l+_.halfW,b=c-_.halfD,H=c+_.halfD;let y=0,M=a,D=!0;if(Math.abs(r)<1e-8)(e<A||e>T)&&(D=!1);else{const U=1/r;let O=(A-e)*U,X=(T-e)*U;if(O>X){const z=O;O=X,X=z}y=Math.max(y,O),M=Math.min(M,X)}if(!(!D||y>M)){if(Math.abs(s)<1e-8)(n<S||n>C)&&(D=!1);else{const U=1/s;let O=(S-n)*U,X=(C-n)*U;if(O>X){const z=O;O=X,X=z}y=Math.max(y,O),M=Math.min(M,X)}if(!(!D||y>M)){if(Math.abs(o)<1e-8)(i<b||i>H)&&(D=!1);else{const U=1/o;let O=(b-i)*U,X=(H-i)*U;if(O>X){const z=O;O=X,X=z}y=Math.max(y,O),M=Math.min(M,X)}!D||y>M||y<0||y>a||(!v||y<v.t)&&(v={hitbox:_.id,t:y})}}}return v}function nc(t){return{x:t.body.x,y:t.body.y+pi.eyeHeight,z:t.body.z}}function Wo(t,e){const n=Math.cos(e);return{x:-Math.sin(t)*n,y:Math.sin(e),z:-Math.cos(t)*n}}function jf(t){return{x:Math.cos(t),z:-Math.sin(t)}}function zS(t,e,n,i,r,s){const o=i-t,a=r-e,l=s-n,c=Math.hypot(o,l);return{yaw:Math.atan2(-o,-l),pitch:Math.atan2(a,c)}}const FS=62,OS=Math.cos(112*Math.PI/180/2),lm=.13,cm=.34,BS=2.4,HS=1.6,Oa=1.05,GS=1.6,VS=Math.PI*2;function WS(t,e){if(e===null)return null;for(const n of t)if(n.id===e)return n;return null}function XS(t,e,n){const i=e.brain,r=nc(e),s=Wo(e.yaw,0);let o=null,a=-1/0;for(const l of t.combatants){if(!l.alive||l.team===e.team||l.id===e.id)continue;const c=Dt(e.body.x,e.body.z,l.body.x,l.body.z);if(c>FS)continue;const u=(l.body.x-e.body.x)/(c||1),d=(l.body.z-e.body.z)/(c||1);if(u*s.x+d*s.z<OS-.35)continue;const p=l.body.y+pi.height*.68;if(!t.lineOfSight(r.x,r.y,r.z,l.body.x,p,l.body.z))continue;let g=120-c*.9;i.targetId===l.id&&(g+=26),l.hasBomb&&(g+=18),g>a&&(a=g,o=l)}o?(i.targetId!==o.id?(i.targetId=o.id,i.reactionTimer=Nt(lm,cm),i.trackTime=0,i.burstLeft=0,i.burstPause=0):i.trackTime+=n,i.visible=!0,i.lastSeenX=o.body.x,i.lastSeenZ=o.body.z,i.lastSeenTime=t.time):(i.visible&&(i.visible=!1,i.reactionTimer=Nt(lm,cm)*.7),i.trackTime=Math.max(0,i.trackTime-n*1.5),t.time-i.lastSeenTime>5&&(i.targetId=null))}function wl(t){return Qs.find(e=>e.id===t).plantSpot}function jS(t){return Qs.find(e=>e.id===t)}function qS(t,e){const n=jS(e);return t.body.x>=n.x0&&t.body.x<=n.x1&&t.body.z>=n.z0&&t.body.z<=n.z1}function um(t,e){const n=e.attackSite,i=t.id%5;if(t.team==="T"){const s=n==="A"?["long","mid","long","mid","long"][i]:["tunnel","mid","tunnel","tunnel","mid"][i];return s==="long"?[Yt.A_LONG_START,Yt.A_LONG_MID,Yt.A_LONG_END,wl(n)]:s==="tunnel"?[Yt.UPPER_TUNNEL,Yt.TUNNEL_BEND,Yt.B_TUNNEL,wl(n)]:[Yt.T_MID_EXIT,Yt.MID,Yt.MID_DOORS,Yt.TOP_MID,n==="A"?Yt.CATWALK:Yt.B_DOORS,wl(n)]}const r=t.brain.role;return r==="anchorMid"?[Yt.TOP_MID]:r==="anchorA"?[Yt.A_SITE]:r==="anchorB"?[Yt.B_SITE]:[Yt.CT_MID]}function fm(t,e,n){const i=t.id*2.399963%VS,r=n*(.55+t.id*7%10/20);return{x:e.x+Math.cos(i)*r,z:e.z+Math.sin(i)*r}}function YS(t,e){const n=e.brain,i=t.bomb;if(e.team==="T"){if(i.state==="planted"){n.goal=t.defendSpot(e);const c=Dt(e.body.x,e.body.z,n.goal.x,n.goal.z);n.state=c<2.6?"hold":"advance";return}if(i.state==="dropped"){const c=Dt(e.body.x,e.body.z,i.x,i.z);let u=!0;for(const d of t.combatants)if(!(!d.alive||d.team!==e.team||d.id===e.id)&&Dt(d.body.x,d.body.z,i.x,i.z)<c){u=!1;break}if(u&&c<45){n.goal={x:i.x,z:i.z},n.state=c<GS?"hold":"advance";return}}if(e.hasBomb){const c=fm(e,wl(t.attackSite),4.2);n.goal=c,n.state=qS(e,t.attackSite)&&Dt(e.body.x,e.body.z,c.x,c.z)<2.4?"plant":"advance";return}n.route.length===0&&(n.route=um(e,t));const a=n.route[n.route.length-1];if(n.routeIndex>=n.route.length-1&&Dt(e.body.x,e.body.z,a.x,a.z)<6){n.state="hold";const c=fm(e,a,6.5);n.goal={x:c.x+Nt(-2.2,2.2),z:c.z+Nt(-2.2,2.2)};return}const l=Math.min(n.routeIndex,n.route.length-1);n.goal=n.route[l],n.state="advance";return}if(i.state==="planted"){n.goal={x:i.x,z:i.z},n.state=Dt(e.body.x,e.body.z,i.x,i.z)<1.9?"defuse":"advance";return}if(i.state==="dropped"){n.goal={x:i.x+Nt(-6,6),z:i.z+Nt(-6,6)},n.state="advance";return}const r=t.recentEnemyNoise(e,2.5,42);if(r&&(n.role==="rotator"||n.role==="anchorMid")){n.goal=r,n.state="advance";return}n.route.length===0&&(n.route=um(e,t));const s=Math.min(n.routeIndex,n.route.length-1),o=n.route[s];n.state=Dt(e.body.x,e.body.z,o.x,o.z)<3?"hold":"advance",n.goal=n.state==="hold"?{x:o.x+Nt(-3.5,3.5),z:o.z+Nt(-3.5,3.5)}:o}function qf(t,e){const n=e.brain;if(!n.goal)return;const i=t.grid.findPath(e.body.x,e.body.z,n.goal.x,n.goal.z);n.path=i,n.pathIndex=0,n.repathTimer=.7+Math.random()*.6}function $S(t,e,n){let i=0,r=0;for(const s of t.combatants){if(s.id===e.id||!s.alive)continue;const o=e.body.x-s.body.x,a=e.body.z-s.body.z,l=o*o+a*a;if(l>Oa*Oa||l<1e-6)continue;const c=Math.sqrt(l),u=(Oa-c)/Oa;i+=o/c*u,r+=a/c*u}n.x=i,n.z=r}const du={x:0,z:0};function KS(t,e,n){const i=e.brain;if(i.repathTimer-=n,(i.repathTimer<=0||i.path.length===0&&i.goal)&&qf(t,e),i.path.length===0)return{x:0,z:0};for(;i.pathIndex<i.path.length;){const c=i.path[i.pathIndex],u=Dt(e.body.x,e.body.z,c.x,c.z),d=i.pathIndex===i.path.length-1;if(u<(d?HS:BS))i.pathIndex++;else break}if(i.pathIndex>=i.path.length)return{x:0,z:0};const r=i.path[i.pathIndex];let s=r.x-e.body.x,o=r.z-e.body.z;const a=Math.hypot(s,o)||1;s/=a,o/=a,$S(t,e,du),s+=du.x*1.5,o+=du.z*1.5;const l=Math.hypot(s,o)||1;return{x:s/l,z:o/l}}function ZS(t,e,n,i){const r=e.brain,s=Dt(e.body.x,e.body.z,r.lastX,r.lastZ);if(i&&s<.035){if(r.stuckTimer+=n,r.stuckTimer>.9&&(r.path.length>0&&qf(t,e),r.stuckTimer>1.8)){const o=t.grid.nearestWalkable(e.body.x+Nt(-6,6),e.body.z+Nt(-6,6));o&&(r.goal=o,qf(t,e)),r.stuckTimer=0,r.strafeDir*=-1}}else r.stuckTimer=Math.max(0,r.stuckTimer-n*.5);r.lastX=e.body.x,r.lastZ=e.body.z}function QS(t,e,n,i){const r=e.brain,s=nc(e),o=Dt(e.body.x,e.body.z,n.body.x,n.body.z),a=r.aimHigh,l=n.body.y+(a?pi.height*.9:pi.height*.72),c=zS(s.x,s.y,s.z,n.body.x,l,n.body.z),d=(1-pt(r.trackTime/.9,0,1)*.7)*(.03+(1-r.aggression)*.028)+(o>25?.006:0),f=Math.sin(t.time*3.1+e.id)*d,p=Math.cos(t.time*2.3+e.id*1.7)*d*.75,g=5.5+r.aggression*3.5,x=la(e.yaw,c.yaw+f);if(e.yaw+=pt(x,-g*i,g*i),e.pitch=Bv(e.pitch,pt(c.pitch+p,-1.2,1.2),g*i),r.reactionTimer>0){r.reactionTimer-=i;return}const m=Math.abs(la(e.yaw,c.yaw))+Math.abs(e.pitch-c.pitch)*.5,h=pt(.7/Math.max(4,o),.009,.1);if(m>h)return;if(r.burstPause>0){r.burstPause-=i;return}if(t.tryFire(e)&&(r.burstLeft--,r.burstLeft<=0)){const _=e.primaryId==="awp"&&e.slot==="primary";r.burstLeft=_?1:Math.round(Nt(2,6)),r.burstPause=_?Nt(1.1,1.6):Nt(.12,.42)*(o>30?2.2:1),r.aimHigh=Math.random()<(o<11?.26:.16)}}function JS(t,e,n){const i=e.brain;if(!e.alive)return;XS(t,e,n),i.decisionTimer-=n,(i.decisionTimer<=0||i.goal===null)&&(i.decisionTimer=.4+Math.random()*.4,YS(t,e));const r=WS(t.combatants,i.targetId),s=!!r&&i.visible;if(i.goal&&e.team==="T"&&i.route.length>0&&i.routeIndex<i.route.length-1){const d=i.route[i.routeIndex];MS(e.body.x,e.body.z,d.x,d.z)<3.2*3.2&&(i.routeIndex++,i.path=[],i.repathTimer=0)}let o=0,a=0,l=4.6;if(i.state==="plant"||i.state==="defuse")o=0,a=0;else if(s&&r){i.strafeTimer-=n,i.strafeTimer<=0&&(i.strafeTimer=Nt(.35,1.1),Math.random()<.45&&(i.strafeDir*=-1));const d=Dt(e.body.x,e.body.z,r.body.x,r.body.z),f=jf(e.yaw),p=(r.body.x-e.body.x)/(d||1),g=(r.body.z-e.body.z)/(d||1),x=d>22?.75:d<7?-.35:.12;o=f.x*i.strafeDir*.85+p*x,a=f.z*i.strafeDir*.85+g*x,l=3.4}else if(i.goal){const d=KS(t,e,n);(Dt(e.body.x,e.body.z,i.goal.x,i.goal.z)>1.8||e.team==="T"&&i.state==="advance")&&(o=d.x,a=d.z,l=e.team==="T"?4.9:4.4)}if(!s&&(o!==0||a!==0)){const d=Math.atan2(-o,-a),f=la(e.yaw,d);e.yaw+=pt(f,-4.5*n,4.5*n),e.pitch=Bv(e.pitch,0,2.5*n)}else if(!s&&i.goal&&i.state==="hold"){const d=Math.atan2(-(i.goal.x-e.body.x),-(i.goal.z-e.body.z))+Math.sin(t.time*.5+e.id)*.7,f=la(e.yaw,d);e.yaw+=pt(f,-2*n,2*n)}s&&r&&QS(t,e,r,n);const c=e.body;Xf(c,{wishX:o,wishZ:a,speed:l,accel:9,friction:8,airAccel:.22},n),Io(t.grid,t.collideBoxes,c,c.vx*n,c.vz*n),Wf(t.grid,t.collideBoxes,c,n),ZS(t,e,n,o!==0||a!==0);const u=e.weapons[e.slot];if(u&&!u.reloading&&!s){const d=Dn(u.id);d.category!=="melee"&&(u.ammo===0&&u.reserve>0||u.ammo<d.magSize*.34&&u.reserve>0&&Math.random()<.6*n)&&t.reload(e)}}class eM{constructor(){te(this,"ctx",null);te(this,"master",null);te(this,"noise",null);te(this,"listener",{x:0,z:0,fx:0,fz:-1});te(this,"voices",0);te(this,"maxVoices",28);te(this,"lastFootstep",0);te(this,"muted",!1);te(this,"masterVolume",.75)}ensure(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const e=window.AudioContext??window.webkitAudioContext;if(!e)return;const n=new e;this.ctx=n;const i=n.createGain();i.gain.value=this.masterVolume,i.connect(n.destination),this.master=i;const r=Math.floor(n.sampleRate*2),s=n.createBuffer(1,r,n.sampleRate),o=s.getChannelData(0);let a=22222;for(let l=0;l<r;l++)a=a*1103515245+12345&2147483647,o[l]=a/1073741823-1;this.noise=s}get ready(){return this.ctx!==null&&this.master!==null}setVolume(e){this.masterVolume=pt(e,0,1),this.master&&(this.master.gain.value=this.muted?0:this.masterVolume)}setMuted(e){this.muted=e,this.master&&(this.master.gain.value=e?0:this.masterVolume)}setListener(e,n,i,r){this.listener.x=e,this.listener.z=n;const s=Math.hypot(i,r)||1;this.listener.fx=i/s,this.listener.fz=r/s}spatial(e,n,i,r){const s=e-this.listener.x,o=n-this.listener.z,a=Math.hypot(s,o);if(a>r)return{gain:0,pan:0};const l=i/(i+Math.max(0,a-1.5)*.75),c=a>.001?1/a:0,u=pt(ES(s*c,0,o*c,-this.listener.fz,0,this.listener.fx),-1,1);return{gain:pt(l,0,1),pan:u}}out(e,n){if(!this.ctx||!this.master)return null;const i=this.ctx.createGain();if(i.gain.value=e,this.ctx.createStereoPanner){const r=this.ctx.createStereoPanner();r.pan.value=pt(n,-1,1),i.connect(r),r.connect(this.master)}else i.connect(this.master);return i}claim(e){return!this.ready||this.muted||this.voices>=this.maxVoices?!1:(this.voices++,setTimeout(()=>{this.voices--},Math.max(60,e*1e3+60)),!0)}noiseBurst(e){const n=this.ctx;if(!n||!this.noise)return;const i=this.out(e.gain,e.pan);if(!i)return;const r=n.currentTime+(e.delay??0),s=n.createBufferSource();s.buffer=this.noise,s.playbackRate.value=.85+Math.random()*.3;const o=Math.random()*1.5,a=n.createBiquadFilter();a.type=e.type??"lowpass",a.frequency.setValueAtTime(Math.max(60,e.cutoff),r),e.cutoffEnd!==void 0&&a.frequency.exponentialRampToValueAtTime(Math.max(60,e.cutoffEnd),r+e.dur),a.Q.value=e.q??1;const l=n.createGain();l.gain.setValueAtTime(1e-4,r),l.gain.linearRampToValueAtTime(1,r+e.attack),l.gain.exponentialRampToValueAtTime(1e-4,r+e.dur),s.connect(a),a.connect(l),l.connect(i),s.start(r,o,e.dur+.05),s.stop(r+e.dur+.06)}tone(e){const n=this.ctx;if(!n)return;const i=this.out(e.gain,e.pan);if(!i)return;const r=n.currentTime+(e.delay??0),s=n.createOscillator();s.type=e.type??"sine",s.frequency.setValueAtTime(e.freq,r),e.freqEnd!==void 0&&s.frequency.exponentialRampToValueAtTime(Math.max(20,e.freqEnd),r+e.dur);const o=n.createGain();o.gain.setValueAtTime(1e-4,r),o.gain.linearRampToValueAtTime(1,r+(e.attack??.002)),o.gain.exponentialRampToValueAtTime(1e-4,r+e.dur),s.connect(o),o.connect(i),s.start(r),s.stop(r+e.dur+.02)}shot(e,n,i,r){const o=Bn[e].audio,a=this.spatial(n,i,r?60:15,r?400:95);if(a.gain<=.001)return;const l=r?1:a.gain,c=r?0:a.pan;this.claim(o.dur+o.tail+.2)&&(this.noiseBurst({gain:.55*o.gain*l,pan:c,dur:o.dur*.55,attack:.0012,cutoff:o.cutoff*1.8,cutoffEnd:o.cutoff*.5,q:.9}),this.tone({gain:.5*o.gain*l,pan:c,freq:o.freq,freqEnd:o.freq*.35,dur:o.dur*1.3,type:"triangle"}),this.tone({gain:.42*o.gain*l,pan:c,freq:o.freq*.45,freqEnd:o.freq*.18,dur:o.dur*1.8,type:"sine"}),o.tail>.05&&this.noiseBurst({gain:.22*o.gain*l,pan:c,dur:o.tail,attack:.02,cutoff:o.cutoff*.55,cutoffEnd:220,q:.7,delay:.035}),e==="awp"&&this.tone({gain:.25*l,pan:c,freq:1800,freqEnd:700,dur:.05,type:"square",delay:.02}),e==="deagle"&&this.tone({gain:.18*l,pan:c,freq:2400,freqEnd:900,dur:.04,type:"square",delay:.01}))}dryFire(){this.claim(.08)&&this.tone({gain:.22,pan:0,freq:1500,freqEnd:500,dur:.045,type:"square"})}reload(e,n){if(this.claim(.16))switch(n){case"out":this.tone({gain:.2,pan:-.15,freq:900,freqEnd:380,dur:.07,type:"square"}),this.noiseBurst({gain:.16,pan:-.15,dur:.09,attack:.004,cutoff:3200,cutoffEnd:900});break;case"in":this.tone({gain:.24,pan:.1,freq:520,freqEnd:200,dur:.09,type:"square"}),this.noiseBurst({gain:.2,pan:.1,dur:.11,attack:.006,cutoff:2400,cutoffEnd:700});break;case"done":this.tone({gain:.26,pan:0,freq:1700,freqEnd:800,dur:.05,type:"square"});break}}draw(e){this.claim(.2)&&this.noiseBurst({gain:.14,pan:0,dur:.14,attack:.01,cutoff:1800,cutoffEnd:600})}scopeIn(){this.claim(.2)&&(this.tone({gain:.22,pan:0,freq:1250,freqEnd:620,dur:.055,type:"square"}),this.tone({gain:.16,pan:0,freq:700,freqEnd:340,dur:.07,type:"square",delay:.06}))}scopeOut(){this.claim(.2)&&this.tone({gain:.16,pan:0,freq:620,freqEnd:1250,dur:.05,type:"square"})}footstep(e,n,i,r){const s=performance.now();if(!i&&s-this.lastFootstep<40)return;this.lastFootstep=s;const o=this.spatial(e,n,i?40:6,i?100:34);if(o.gain<=.002||!this.claim(.14))return;const a=(i?.5:o.gain*.85)*(r?1.25:1);this.noiseBurst({gain:.34*a,pan:i?Math.random()*.5-.25:o.pan,dur:.085,attack:.003,cutoff:900+Math.random()*500,cutoffEnd:240,q:1.4}),this.tone({gain:.1*a,pan:i?0:o.pan,freq:110+Math.random()*40,freqEnd:60,dur:.07,type:"sine"})}impact(e,n){const i=this.spatial(e,n,8,55);i.gain<=.003||this.claim(.1)&&this.noiseBurst({gain:.16*i.gain,pan:i.pan,dur:.06,attack:.001,cutoff:5200,cutoffEnd:900,q:2})}hitmarker(e){this.claim(.12)&&(this.tone({gain:.3,pan:0,freq:e?1750:1150,freqEnd:e?1500:1e3,dur:.055,type:"square"}),e&&this.tone({gain:.18,pan:0,freq:2600,dur:.04,type:"sine",delay:.045}))}hurt(){this.claim(.25)&&(this.noiseBurst({gain:.3,pan:0,dur:.2,attack:.005,cutoff:700,cutoffEnd:200,q:1.2}),this.tone({gain:.2,pan:0,freq:190,freqEnd:90,dur:.22,type:"sine"}))}kill(e){if(!this.claim(.5))return;const n=e?1320:880;this.tone({gain:.34,pan:0,freq:n,dur:.075,type:"square"}),this.tone({gain:.32,pan:0,freq:n*1.5,dur:.09,type:"square",delay:.07}),e&&this.tone({gain:.24,pan:0,freq:n*2,dur:.1,type:"square",delay:.15})}death(){this.claim(.7)&&(this.noiseBurst({gain:.34,pan:0,dur:.55,attack:.01,cutoff:900,cutoffEnd:110,q:.8}),this.tone({gain:.24,pan:0,freq:220,freqEnd:60,dur:.6,type:"sine"}))}c4Beep(e){this.claim(.2)&&this.tone({gain:.26,pan:0,freq:e,dur:.075,type:"square"})}c4PlantStart(){if(this.claim(.6)){this.noiseBurst({gain:.18,pan:0,dur:.5,attack:.02,cutoff:1400,cutoffEnd:500});for(let e=0;e<4;e++)this.tone({gain:.18,pan:0,freq:700+e*90,dur:.06,type:"square",delay:e*.09})}}c4PlantDone(){this.claim(.5)&&(this.tone({gain:.3,pan:0,freq:990,dur:.09,type:"square"}),this.tone({gain:.3,pan:0,freq:1480,dur:.12,type:"square",delay:.1}))}c4DefuseTick(){this.claim(.12)&&this.tone({gain:.16,pan:0,freq:2100,freqEnd:1500,dur:.035,type:"square"})}c4DefuseDone(){this.claim(.6)&&(this.tone({gain:.3,pan:0,freq:660,dur:.1,type:"square"}),this.tone({gain:.3,pan:0,freq:990,dur:.14,type:"square",delay:.12}))}explosion(e,n){const i=this.spatial(e,n,90,400);if(!this.claim(2))return;const r=pt(i.gain*1.4+.35,0,1);this.noiseBurst({gain:.9*r,pan:i.pan,dur:1.5,attack:.004,cutoff:2200,cutoffEnd:90,q:.6}),this.noiseBurst({gain:.5*r,pan:i.pan,dur:2.2,attack:.05,cutoff:500,cutoffEnd:60,q:.5,delay:.08}),this.tone({gain:.7*r,pan:i.pan,freq:110,freqEnd:22,dur:1.1,type:"sine"}),this.tone({gain:.4*r,pan:i.pan,freq:62,freqEnd:18,dur:1.8,type:"sine",delay:.05})}roundStart(e){this.claim(1)&&(this.tone({gain:.24,pan:0,freq:440,dur:.16,type:"square"}),this.tone({gain:.24,pan:0,freq:660,dur:.22,type:"square",delay:.18}),e||this.tone({gain:.22,pan:0,freq:880,dur:.3,type:"square",delay:.4}))}roundWin(e){if(!this.claim(1.2))return;const n=e==="CT"?520:392;[0,.14,.3].forEach((i,r)=>{this.tone({gain:.26,pan:0,freq:n*(1+r*.26),dur:.24,type:"square",delay:i})})}}const dt=new eM,tM={CT:"T",T:"CT"},nM=115,dm=5,hm=5,iM=40,pm=3.5,rM=10,sM=5,oM=1.8,mm=2,aM=4.7,lM=.0022,gm=5;function cM(){return{forward:0,strafe:0,jump:!1,use:!1,fire:!1,firePressed:!1,ads:!1,reload:!1,walk:!1,slotRequest:null,mouseDX:0,mouseDY:0,cycleSpectate:0,takeControl:!1}}class uM{constructor(e="CT"){te(this,"grid");te(this,"props",Rc);te(this,"blockBoxes",dS());te(this,"collideBoxes",fS());te(this,"regions",Cc);te(this,"sites",Qs);te(this,"combatants",[]);te(this,"bomb",{state:"carried",carrier:null,x:0,z:0,site:null,timer:0,plantProgress:0,defuseProgress:0,planterId:null,defuserId:null});te(this,"round",{number:1,phase:"freeze",timeLeft:dm,isPistol:!0,winner:null,reason:"",scoreCT:0,scoreT:0});te(this,"time",0);te(this,"playerTeam");te(this,"playerId");te(this,"spectating",!1);te(this,"spectateId",null);te(this,"attackSite","A");te(this,"killfeed",[]);te(this,"hitmarkers",[]);te(this,"noises",[]);te(this,"banner",null);te(this,"bannerUntil",0);te(this,"killSeq",1);te(this,"hitSeq",1);te(this,"lastBeep",0);te(this,"humanLoadout");te(this,"humanUse",!1);te(this,"tracers",[]);te(this,"aiWorld");this.grid=vS(),this.playerTeam=e,this.humanLoadout=_r(e),this.playerId=0,this.buildTeams(),this.aiWorld={grid:this.grid,blockBoxes:this.blockBoxes,collideBoxes:this.collideBoxes,combatants:this.combatants,bomb:this.bomb,time:0,phase:"live",attackSite:"A",lineOfSight:(n,i,r,s,o,a)=>this.los(n,i,r,s,o,a),tryFire:n=>this.tryFire(n),reload:n=>this.startReload(n),defendSpot:n=>this.defendSpot(n),recentEnemyNoise:(n,i,r)=>this.recentEnemyNoise(n,i,r)},this.startRound(1)}buildTeams(){this.combatants=[];const e=Fa("T"),n=Fa("CT");let i=0;const r=po(i,"YOU",this.playerTeam,!0,this.playerTeam==="T"?e[0]:n[0],this.humanLoadout);this.combatants.push(r),this.playerId=r.id,i++;const s=[...US],o=[...NS];for(let a=1;a<gm;a++){if(this.playerTeam==="T"){const c=po(i,s.pop()??`T-${a}`,"T",!1,e[a],_r("T"));c.brain=ho("rushA"),this.combatants.push(c)}else{const c=po(i,o.pop()??`CT-${a}`,"CT",!1,n[a],_r("CT"));c.brain=ho("anchorA"),this.combatants.push(c)}i++}for(let a=0;a<gm;a++){if(this.playerTeam==="T"){const l=po(i,o.pop()??`CT-${a}`,"CT",!1,n[a],_r("CT"));l.brain=ho("anchorA"),this.combatants.push(l)}else{const l=po(i,s.pop()??`T-${a}`,"T",!1,e[a],_r("T"));l.brain=ho("rushA"),this.combatants.push(l)}i++}}assignRoundLoadouts(){const e=this.round.isPistol;this.humanLoadout=e?_r(this.playerTeam):am(this.playerTeam);for(const n of this.combatants){const i=e?_r(n.team):am(n.team);n.health=100,n.alive=!0,n.armor=i.armor,n.helmet=i.helmet,n.hasDefuseKit=i.kit,n.primaryId=i.primary,n.weapons={secondary:qi(i.secondary,this.time),melee:qi("knife",this.time)},i.primary&&(n.weapons.primary=qi(i.primary,this.time)),n.slot=i.primary?"primary":"secondary",n.spread=0,n.recoilDebt=0,n.recoilPitch=0,n.recoilYaw=0,n.ads=!1,n.adsAmount=0,n.burstLeft=0,n.plantHold=0,n.defuseHold=0,n.hasBomb=!1,n.body.vx=0,n.body.vy=0,n.body.vz=0,n.brain&&(n.brain.state="advance",n.brain.route=[],n.brain.routeIndex=0,n.brain.path=[],n.brain.pathIndex=0,n.brain.goal=null,n.brain.targetId=null,n.brain.lastSeenTime=-99,n.brain.visible=!1,n.brain.decisionTimer=0,n.brain.repathTimer=0,n.brain.stuckTimer=0,n.brain.holdSpot=null,n.brain.role=this.roleFor(n))}}roleFor(e){const n=e.id%5;return e.team==="T"?(this.attackSite==="A"?["rushA","midTake","rushA","midTake","lurker"]:["rushB","midTake","rushB","lurker","midTake"])[n]:["anchorA","anchorB","anchorMid","anchorA","anchorB"][n]}startRound(e){this.round.number=e,this.round.isPistol=(e-1)%13===0,this.round.phase="freeze",this.round.timeLeft=dm,this.round.winner=null,this.round.reason="",this.attackSite=Math.random()<.5?"A":"B";const n=Fa("T"),i=Fa("CT");let r=0,s=0;for(const l of this.combatants){const c=l.team==="T"?n[r++%n.length]:i[s++%i.length];l.body.x=c.x+Nt(-.8,.8),l.body.z=c.z+Nt(-.8,.8),l.body.y=0,l.body.vx=0,l.body.vy=0,l.body.vz=0,l.body.onGround=!0,l.yaw=l.team==="T"?Math.PI*.78:-Math.PI*.28,l.pitch=0}this.assignRoundLoadouts();const o=this.combatants.filter(l=>l.team==="T"),a=o[Math.floor(Math.random()*o.length)];a.hasBomb=!0,this.bomb={state:"carried",carrier:a.id,x:a.body.x,z:a.body.z,site:null,timer:0,plantProgress:0,defuseProgress:0,planterId:null,defuserId:null},this.killfeed=[],this.hitmarkers=[],this.noises=[],this.spectating=!1,this.spectateId=null,this.setBanner(this.round.isPistol?"手枪局 — 全员仅有默认手枪":`第 ${e} 回合`,3.2),dt.roundStart(this.round.isPistol)}setBanner(e,n){this.banner=e,this.bannerUntil=this.time+n}byId(e){for(const n of this.combatants)if(n.id===e)return n;return null}get player(){return this.byId(this.playerId)}aliveOf(e){return this.combatants.filter(n=>n.team===e&&n.alive)}los(e,n,i,r,s,o){return IS(this.grid,this.blockBoxes,e,n,i,r,s,o)}effectiveSpread(e){const n=Dn(this.currentWeaponId(e)),i=Math.hypot(e.body.vx,e.body.vz);let r=n.spread.base+e.spread;return e.body.onGround?r+=n.spread.move*Math.min(i,5.5)/5.5:r+=n.spread.air,n.ads&&e.adsAmount>.6&&(r*=.22),r}currentWeaponId(e){const n=e.weapons[e.slot];return n?n.id:"knife"}currentState(e){return e.weapons[e.slot]??null}startReload(e){const n=this.currentState(e);if(!n)return;const i=Dn(n.id);i.category!=="melee"&&(n.reloading||n.ammo>=i.magSize||n.reserve<=0||(n.reloading=!0,n.reloadEnd=this.time+i.reloadTime,dt.reload(n.id,"out"),e===this.player&&setTimeout(()=>dt.reload(n.id,"in"),i.reloadTime*500)))}finishReload(e){const n=this.currentState(e);if(!n||!n.reloading)return;const r=Dn(n.id).magSize-n.ammo,s=Math.min(r,n.reserve);n.ammo+=s,n.reserve-=s,n.reloading=!1,dt.reload(n.id,"done")}switchSlot(e,n){if(e.slot===n||!e.weapons[n])return!1;const i=e.weapons[n];return i.reloading=!1,e.slot=n,i.readyTime=this.time+Dn(i.id).drawTime,e.ads=!1,dt.draw(i.id),!0}fireOneShot(e){if(!e.alive||this.round.phase!=="live")return!1;const n=this.currentState(e);if(!n)return!1;const i=Dn(n.id);if(n.reloading||this.time<n.readyTime||this.time<n.nextFireTime)return!1;if(i.category!=="melee"&&n.ammo<=0)return e===this.player&&dt.dryFire(),n.nextFireTime=this.time+.35,!1;n.nextFireTime=this.time+60/i.rpm,i.auto||(n.nextFireTime=Math.max(n.nextFireTime,this.time+i.triggerReset)),i.category!=="melee"&&n.ammo--;const r=i.recoil.vertical*Nt(.78,1.18),s=i.recoil.horizontal*Nt(-1,1);e.pitch=pt(e.pitch+r,-1.45,1.45),e.yaw+=s,e.recoilDebt+=r*i.recoil.returnToZero,e.recoilPitch+=r*i.recoil.punch,e.spread=Math.min(i.spread.max,e.spread+i.spread.perShot);const o=Wo(e.yaw,e.pitch),a=jf(e.yaw),l=this.effectiveSpread(e);let c=o.x,u=o.y,d=o.z;if(l>0){const H=Math.random()*Vo,y=Math.sqrt(Math.random())*l,M=Math.cos(H)*y,D=Math.sin(H)*y;c+=a.x*M,d+=a.z*M;const U=o.y*a.z-o.z*0,O=o.z*a.x-o.x*a.z,X=o.x*0-o.y*a.x,z=Math.hypot(U,O,X)||1;c+=U/z*D,u+=O/z*D,d+=X/z*D;const q=Math.hypot(c,u,d)||1;c/=q,u/=q,d/=q}const f=nc(e),p=i.category==="melee"?i.range:120,g=Gv(this.grid,this.blockBoxes,f.x,f.y,f.z,c,u,d,p);let m=g?g.t:p,h=null,v="chest";for(const H of this.combatants){if(!H.alive||H.id===e.id||H.team===e.team)continue;const y=kS(H,f.x,f.y,f.z,c,u,d,m);y&&y.t<m&&(m=y.t,h=H,v=y.hitbox)}const _=e===this.player;dt.shot(n.id,e.body.x,e.body.z,_),this.noises.push({x:e.body.x,z:e.body.z,team:e.team,time:this.time}),this.noises.length>40&&this.noises.shift();const S=f.x+c*m,C=f.y+u*m,A=f.z+d*m,T=a.x*.16,b=a.z*.16;if(this.tracers.push({x0:f.x+T+c*.55,y0:f.y-.1+u*.55,z0:f.z+b+d*.55,x1:S,y1:C,z1:A,time:this.time,weapon:n.id}),this.tracers.length>48&&this.tracers.shift(),h){const H=yS(i,v,m,h.armor);this.applyDamage(h,e,H.health,H.absorbed,v,n.id)}else g&&dt.impact(g.x,g.z);return i.category!=="melee"&&n.ammo===0&&n.reserve>0&&this.startReload(e),!0}tryFire(e){const n=this.currentState(e);if(!n)return!1;const i=Dn(n.id);return i.burst>0?(e.burstLeft<=0&&(e.burstLeft=i.burst),!1):this.fireOneShot(e)}applyDamage(e,n,i,r,s,o){e.health-=i,e.armor>0&&(e.armor=Math.max(0,e.armor-SS(r))),n.damage+=i,e.lastHitTime=this.time,e.lastHitFromX=n.body.x,e.lastHitFromZ=n.body.z;const a=s==="head";n===this.player&&(this.hitmarkers.push({id:this.hitSeq++,time:this.time,headshot:a,killed:!1}),this.hitmarkers.length>4&&this.hitmarkers.shift(),dt.hitmarker(a)),e===this.player&&dt.hurt(),e.health<=0&&(e.health=0,this.killCombatant(e,n,o,a))}killCombatant(e,n,i,r){e.alive=!1,e.deaths++,e.deathTime=this.time,e.deathYaw=e.yaw,n.kills++;const s={id:this.killSeq++,time:this.time,killerId:n.id,killerName:n.name,killerTeam:n.team,victimId:e.id,victimName:e.name,victimTeam:e.team,weapon:i,headshot:r};if(this.killfeed.push(s),this.killfeed.length>6&&this.killfeed.shift(),n===this.player){const o=this.hitmarkers[this.hitmarkers.length-1];o&&(o.killed=!0),dt.kill(r)}e===this.player&&(dt.death(),this.beginSpectate()),e.hasBomb&&(e.hasBomb=!1,this.bomb.state="dropped",this.bomb.carrier=null,this.bomb.x=e.body.x,this.bomb.z=e.body.z,this.bomb.plantProgress=0),e.brain&&(e.brain.state="reposition",e.brain.targetId=null)}beginSpectate(){this.spectating=!0,this.pickSpectateTarget(1)}pickSpectateTarget(e){const n=this.combatants.filter(s=>s.team===this.playerTeam&&s.alive);if(n.length===0){this.spectateId=null;return}if(this.spectateId===null){this.spectateId=n[0].id;return}const i=n.map(s=>s.id);let r=i.indexOf(this.spectateId);r<0&&(r=0),r=(r+e+i.length)%i.length,this.spectateId=i[r]}takeControlOfSpectated(){if(!this.spectating||this.spectateId===null)return;const e=this.byId(this.spectateId);if(!e||!e.alive)return;const n=this.byId(this.playerId);n&&(n.isHuman=!1,n.brain=ho(n.team==="T"?"rushA":"anchorA"),n.brain.route=[],n.brain.decisionTimer=0),e.isHuman=!0,e.brain=null,this.playerId=e.id,this.spectating=!1,this.spectateId=null,this.setBanner(`接管 ${e.name}`,2)}updateBomb(e,n){this.humanUse=n.use;const i=this.bomb;if(i.state==="carried"){const o=this.byId(i.carrier??-1);if(!o||!o.alive||!o.hasBomb){const a=this.combatants.find(l=>l.hasBomb&&l.alive);a?i.carrier=a.id:(i.state="dropped",i.carrier=null)}i.state==="carried"&&o&&(i.x=o.body.x,i.z=o.body.z)}if(i.state==="dropped"){for(const o of this.combatants)if(!(!o.alive||o.team!=="T"||o.hasBomb)&&Dt(o.body.x,o.body.z,i.x,i.z)<oM){o.hasBomb=!0,i.state="carried",i.carrier=o.id,this.setBanner(`${o.name} 捡起了 C4`,1.6);break}}let r=!1;for(const o of this.combatants){if(!o.alive)continue;const a=rm(o.body.x,o.body.z),l=o.team==="T"&&o.hasBomb&&!!a&&(o.isHuman?this.humanUse:o.brain?.state==="plant"),c=Math.hypot(o.body.vx,o.body.vz)<.9;if(l&&c&&this.round.phase==="live"){if(o.plantHold===0&&dt.c4PlantStart(),o.plantHold+=e,r=!0,i.plantProgress=Math.min(1,o.plantHold/pm),o.plantHold>=pm){i.state="planted",i.x=o.body.x,i.z=o.body.z,i.site=a.id,i.timer=iM,i.planterId=o.id,i.plantProgress=1,o.hasBomb=!1,o.plantHold=0,this.setBanner(`C4 已在 ${a.label} 安放`,2.6),dt.c4PlantDone();for(const u of this.combatants)u.brain&&(u.brain.goal=null,u.brain.decisionTimer=0)}}else o.plantHold>0&&(o.plantHold=Math.max(0,o.plantHold-e*2.5),o.plantHold===0&&(i.plantProgress=0))}!r&&i.state!=="planted"&&(i.plantProgress=Math.max(0,i.plantProgress-e));let s=!1;if(i.state==="planted"){for(const a of this.combatants){if(!a.alive||a.team!=="CT")continue;const l=Dt(a.body.x,a.body.z,i.x,i.z)<mm,c=a.isHuman?this.humanUse:a.brain?.state==="defuse",u=Math.hypot(a.body.vx,a.body.vz)<.9;if(l&&c&&u&&this.round.phase==="live"){const d=a.hasDefuseKit?sM:rM;a.defuseHold===0&&dt.c4DefuseTick();const f=a.defuseHold;a.defuseHold+=e,Math.floor(f*3)!==Math.floor(a.defuseHold*3)&&dt.c4DefuseTick(),s=!0,i.defuseProgress=Math.min(1,a.defuseHold/d),i.defuserId=a.id,a.defuseHold>=d&&(i.state="defused",i.defuseProgress=1,this.setBanner(`${a.name} 拆除了 C4`,3),dt.c4DefuseDone(),this.endRound("CT","CT 成功拆包"))}else a.defuseHold>0&&(a.defuseHold=Math.max(0,a.defuseHold-e*2.5))}s||(i.defuseProgress=Math.max(0,i.defuseProgress-e*.6),i.defuserId=null),i.timer-=e;const o=i.timer>20?1:i.timer>10?.5:i.timer>5?.33:.22;if(this.time-this.lastBeep>o&&(this.lastBeep=this.time,dt.c4Beep(i.timer>10?880:1320)),i.timer<=0){i.timer=0,i.state="exploded",dt.explosion(i.x,i.z);for(const a of this.combatants){if(!a.alive)continue;const l=Dt(a.body.x,a.body.z,i.x,i.z);if(l<18){const c=Math.round(140*(1-l/18));if(a.health-=c,a.health<=0){a.health=0;const u=this.byId(i.planterId??-1);this.killCombatant(a,u??a,"ak47",!1)}}}this.endRound("T","C4 爆炸")}}}updateWeaponDynamics(e,n){const i=Dn(this.currentWeaponId(e)),r=this.currentState(e);if(e.recoilDebt>0){const o=e.recoilDebt*(1-Math.exp(-i.recoil.recover*n));e.recoilDebt-=o,e.pitch=pt(e.pitch-o,-1.45,1.45)}e.recoilPitch*=Math.exp(-9*n),e.recoilYaw*=Math.exp(-9*n),e.spread*=Math.exp(-i.spread.recover*n),e.spread<1e-5&&(e.spread=0);const s=e.ads&&!!i.ads;e.adsAmount=pt(e.adsAmount+(s?n/(i.ads?.time??.25):-n/(i.ads?.time??.25)),0,1),r&&r.reloading&&this.time>=r.reloadEnd&&this.finishReload(e),e.burstLeft>0&&r&&!r.reloading&&this.time>=r.nextFireTime&&(this.fireOneShot(e)&&e.burstLeft--,r.ammo<=0&&(e.burstLeft=0))}updateFootsteps(e,n){const i=Math.hypot(e.body.vx,e.body.vz);if(!e.body.onGround||i<.6)return;e.stepAccum+=i*n;const r=i>4?2.35:1.9;e.stepAccum>=r&&(e.stepAccum-=r,dt.footstep(e.body.x,e.body.z,e===this.player,i>4))}updateAnimation(e,n){const i=Math.hypot(e.body.vx,e.body.vz);e.animPhase+=i*n*2.4,e.body.onGround||(e.animPhase+=n*.6)}updateHuman(e,n,i){const r=Dn(this.currentWeaponId(e)),s=r.ads!==null&&e.adsAmount>.85,o=lM*(s?r.ads.sensitivity:1);e.yaw-=n.mouseDX*o,e.pitch=pt(e.pitch-n.mouseDY*o,-1.45,1.45),n.slotRequest&&(this.switchSlot(e,n.slotRequest),n.slotRequest=null);const a=n.ads&&r.ads!==null;a!==e.ads&&(e.ads=a,r.ads&&(a?dt.scopeIn():dt.scopeOut())),n.reload&&this.startReload(e);const l=this.round.phase!=="live";let c=0,u=0;if(!l){const f=Wo(e.yaw,0),p=jf(e.yaw);c=f.x*n.forward+p.x*n.strafe,u=f.z*n.forward+p.z*n.strafe;const g=Math.hypot(c,u);g>1e-4&&(c/=g,u/=g)}let d=aM*r.moveSpeed;if(e.adsAmount>.3&&r.ads&&(d*=.52),n.walk&&(d*=.52),Xf(e.body,{wishX:c,wishZ:u,speed:d,accel:11,friction:9.5,airAccel:.16},i),!l&&n.jump&&e.body.onGround&&(e.body.vy=TS,e.body.onGround=!1),Io(this.grid,this.collideBoxes,e.body,e.body.vx*i,e.body.vz*i),Wf(this.grid,this.collideBoxes,e.body,i),!l){const f=this.currentState(e),p=f?Dn(f.id):r;(n.firePressed||n.fire&&p.auto)&&this.tryFire(e)}}defendSpot(e){const n=this.bomb,i=e.id*1.9%Vo,r=Nt(8,13);return this.grid.nearestWalkable(n.x+Math.cos(i)*r,n.z+Math.sin(i)*r)??{x:n.x,z:n.z}}recentEnemyNoise(e,n,i){for(let r=this.noises.length-1;r>=0;r--){const s=this.noises[r];if(s.team!==e.team&&!(this.time-s.time>n)&&!(Dt(e.body.x,e.body.z,s.x,s.z)>i))return{x:s.x,z:s.z}}return null}step(e,n){if(this.time+=e,this.aiWorld.time=this.time,this.aiWorld.phase=this.round.phase,this.aiWorld.attackSite=this.attackSite,this.aiWorld.bomb=this.bomb,this.banner&&this.time>this.bannerUntil&&(this.banner=null),this.round.phase==="freeze")this.round.timeLeft-=e,this.round.timeLeft<=0&&(this.round.phase="live",this.round.timeLeft=nM,this.setBanner("开始！",1.2));else if(this.round.phase==="live")this.bomb.state!=="planted"&&(this.round.timeLeft-=e,this.round.timeLeft<=0&&(this.round.timeLeft=0,this.endRound("CT","时间耗尽")));else if(this.round.timeLeft-=e,this.round.timeLeft<=0){this.startRound(this.round.number+1);return}for(const r of this.combatants)this.updateWeaponDynamics(r,e),r.alive&&(r.isHuman?this.updateHuman(r,n,e):r.brain&&this.round.phase==="live"?JS(this.aiWorld,r,e):r.brain&&(Xf(r.body,{wishX:0,wishZ:0,speed:0,accel:9,friction:9,airAccel:.2},e),Io(this.grid,this.collideBoxes,r.body,r.body.vx*e,r.body.vz*e),Wf(this.grid,this.collideBoxes,r.body,e)),this.updateFootsteps(r,e),this.updateAnimation(r,e));this.separateBodies();for(const r of this.combatants)r.alive&&LS(this.grid,r.body);this.updateBomb(e,n),this.checkRoundEnd();const i=this.cameraCombatant();if(i){const r=Wo(i.yaw,0);dt.setListener(i.body.x,i.body.z,r.x,r.z)}if(n.firePressed=!1,n.mouseDX=0,n.mouseDY=0,n.cycleSpectate!==0&&(this.spectating&&this.pickSpectateTarget(n.cycleSpectate>0?1:-1),n.cycleSpectate=0),n.takeControl&&(this.takeControlOfSpectated(),n.takeControl=!1),this.spectating&&this.spectateId!==null){const r=this.byId(this.spectateId);(!r||!r.alive)&&this.pickSpectateTarget(1)}}separateBodies(){const e=this.combatants.filter(n=>n.alive);for(let n=0;n<e.length;n++)for(let i=n+1;i<e.length;i++){const r=e[n],s=e[i];if(Math.abs(r.body.y-s.body.y)>pi.height*.8)continue;const o=s.body.x-r.body.x,a=s.body.z-r.body.z,l=Math.hypot(o,a),c=pi.radius*2;if(l>c||l<1e-5)continue;const u=(c-l)*.5,d=o/l,f=a/l,p=r.body,g=s.body;Io(this.grid,this.collideBoxes,p,-d*u,-f*u),Io(this.grid,this.collideBoxes,g,d*u,f*u)}}checkRoundEnd(){if(this.round.phase!=="live"||this.bomb.state==="planted")return;const e=this.aliveOf("CT").length;this.aliveOf("T").length===0?this.endRound("CT","CT 全歼 T"):e===0&&this.endRound("T","T 全歼 CT")}endRound(e,n){this.round.phase!=="over"&&(this.round.phase="over",this.round.winner=e,this.round.reason=n,this.round.timeLeft=hm,e==="CT"?this.round.scoreCT++:this.round.scoreT++,this.setBanner(`${e==="CT"?"CT":"T"} 获胜 — ${n}`,hm),dt.roundWin(e))}cameraCombatant(){return this.spectating&&this.spectateId!==null?this.byId(this.spectateId):this.byId(this.playerId)}snapshot(){const e=this.cameraCombatant(),n=this.byId(this.playerId),i=this.time;let r=null;if(n){const l=this.currentState(n),c=Dn(this.currentWeaponId(n)),u=rm(n.body.x,n.body.z),d=this.bomb.state==="planted"&&Dt(n.body.x,n.body.z,this.bomb.x,this.bomb.z)<mm;r={id:n.id,team:n.team,alive:n.alive,health:Math.max(0,Math.round(n.health)),armor:Math.max(0,Math.round(n.armor)),helmet:n.helmet,kit:n.hasDefuseKit,weaponId:c.id,weaponName:c.name,ammo:l?l.ammo:0,magSize:c.magSize,reserve:l?l.reserve:0,reloading:l?l.reloading:!1,reloadProgress:l&&l.reloading?pt(1-(l.reloadEnd-i)/c.reloadTime,0,1):0,slot:n.slot,hasPrimary:!!n.weapons.primary,hasSecondary:!!n.weapons.secondary,spread:this.effectiveSpread(n),ads:n.ads,adsAmount:n.adsAmount,scoped:c.ads!==null&&n.adsAmount>.85,hasBomb:n.hasBomb,canPlant:n.hasBomb&&!!u&&n.alive,canDefuse:n.team==="CT"&&d&&n.alive,plantProgress:this.bomb.plantProgress,defuseProgress:this.bomb.defuseProgress,speed:Math.hypot(n.body.vx,n.body.vz),onGround:n.body.onGround,kills:n.kills,deaths:n.deaths,damage:Math.round(n.damage),hitFlash:n.alive?pt(1-(i-n.lastHitTime)/.7,0,1):0,hitFromAngle:n.alive?Math.atan2(n.lastHitFromX-n.body.x,-(n.lastHitFromZ-n.body.z)):0}}const s=this.combatants.map(l=>{let c=null;if(e&&l.id!==e.id&&l.alive){const u=Dt(e.body.x,e.body.z,l.body.x,l.body.z),d=nc(e),f=this.los(d.x,d.y,d.z,l.body.x,l.body.y+1.25,l.body.z);c={x:l.body.x,y:l.body.z,dist:u,visible:f}}return{id:l.id,name:l.name,team:l.team,alive:l.alive,health:Math.max(0,Math.round(l.health)),armor:Math.max(0,Math.round(l.armor)),kills:l.kills,deaths:l.deaths,damage:Math.round(l.damage),isHuman:l.isHuman,hasBomb:l.hasBomb,weapon:this.currentWeaponId(l),screen:c}}),o=this.spectating&&this.spectateId!==null?(()=>{const l=this.byId(this.spectateId);return l?{id:l.id,name:l.name,alive:l.alive}:null})():null,a=this.hitmarkers.length>0?this.hitmarkers[this.hitmarkers.length-1]:null;return{time:i,round:{...this.round},bomb:{state:this.bomb.state,x:this.bomb.x,z:this.bomb.z,timer:Math.max(0,this.bomb.timer),site:this.bomb.site,plantProgress:this.bomb.plantProgress,defuseProgress:this.bomb.defuseProgress},self:r,players:s,killfeed:this.killfeed.slice(-5),hitmarker:a&&i-a.time<.35?a:null,spectate:o,banner:this.banner,aliveCT:this.aliveOf("CT").length,aliveT:this.aliveOf("T").length,attackSite:this.attackSite,scoreLimit:16}}setPlayerWeapons(e,n){const i=this.byId(this.playerId);if(!i)return;i.primaryId=e,i.weapons.secondary=qi(n,this.time),e?i.weapons.primary=qi(e,this.time):delete i.weapons.primary,i.slot=e?"primary":"secondary";const r=this.currentState(i);r&&(r.readyTime=this.time+Dn(r.id).drawTime)}availableWeapons(){return Object.values(Bn).map(e=>({id:e.id,name:e.name,category:e.category}))}otherTeam(e){return tM[e]}}class fM{constructor(e,n={}){te(this,"state");te(this,"keys",new Set);te(this,"el",null);te(this,"actions");te(this,"locked",!1);te(this,"enabled",!0);te(this,"sensitivity",1);te(this,"onBlur",()=>{this.keys.clear(),this.state.fire=!1,this.state.ads=!1,this.state.use=!1,this.state.jump=!1});te(this,"onContextMenu",e=>{e.preventDefault()});te(this,"onPointerLockChange",()=>{this.locked=document.pointerLockElement===this.el,this.actions.onLockChange?.(this.locked),this.locked||this.onBlur()});te(this,"onKeyDown",e=>{if(e.code==="Escape")return;const n=e.target?.tagName;if(!(n==="INPUT"||n==="TEXTAREA")){if(!this.keys.has(e.code))switch(e.code){case"Digit1":this.state.slotRequest="primary";break;case"Digit2":this.state.slotRequest="secondary";break;case"Digit3":this.state.slotRequest="melee";break;case"KeyR":this.state.reload=!0;break;case"KeyF":this.state.takeControl=!0;break}this.keys.add(e.code),["Space","KeyW","KeyA","KeyS","KeyD","KeyE","Tab"].includes(e.code)&&e.preventDefault()}});te(this,"onKeyUp",e=>{this.keys.delete(e.code)});te(this,"onMouseDown",e=>{!this.locked||!this.enabled||(e.button===0&&(this.state.fire=!0,this.state.firePressed=!0),e.button===2&&(this.state.ads=!0))});te(this,"onMouseUp",e=>{e.button===0&&(this.state.fire=!1),e.button===2&&(this.state.ads=!1)});te(this,"onMouseMove",e=>{!this.locked||!this.enabled||(this.state.mouseDX+=e.movementX*this.sensitivity,this.state.mouseDY+=e.movementY*this.sensitivity)});te(this,"onWheel",e=>{this.enabled&&(this.state.cycleSpectate+=e.deltaY>0?1:-1)});this.state=e,this.actions=n}attach(e){this.el=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("wheel",this.onWheel,{passive:!0}),window.addEventListener("contextmenu",this.onContextMenu),document.addEventListener("pointerlockchange",this.onPointerLockChange),window.addEventListener("blur",this.onBlur)}detach(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("wheel",this.onWheel),window.removeEventListener("contextmenu",this.onContextMenu),document.removeEventListener("pointerlockchange",this.onPointerLockChange),window.removeEventListener("blur",this.onBlur),this.el=null}requestLock(){this.el&&!this.locked&&this.el.requestPointerLock()}releaseLock(){document.pointerLockElement&&document.exitPointerLock()}poll(){const e=this.keys,n=this.state;n.forward=(e.has("KeyW")?1:0)+(e.has("KeyS")?-1:0),n.strafe=(e.has("KeyD")?1:0)+(e.has("KeyA")?-1:0),n.jump=e.has("Space"),n.use=e.has("KeyE"),n.walk=e.has("ShiftLeft")||e.has("ShiftRight"),this.enabled||(n.forward=0,n.strafe=0,n.jump=!1,n.use=!1,n.fire=!1,n.ads=!1,n.walk=!1)}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ch="169",dM=0,vm=1,hM=2,Vv=1,Wv=2,Mi=3,fr=0,rn=1,ui=2,ar=0,Ls=1,ic=2,_m=3,xm=4,pM=5,Rr=100,mM=101,gM=102,vM=103,_M=104,xM=200,yM=201,SM=202,MM=203,Yf=204,$f=205,EM=206,wM=207,TM=208,AM=209,bM=210,CM=211,RM=212,PM=213,LM=214,Kf=0,Zf=1,Qf=2,Vs=3,Jf=4,ed=5,td=6,nd=7,Xv=0,IM=1,DM=2,lr=0,NM=1,UM=2,kM=3,jv=4,zM=5,FM=6,OM=7,qv=300,Ws=301,Xs=302,id=303,rd=304,Pc=306,ca=1e3,Nr=1001,sd=1002,hn=1003,BM=1004,Ba=1005,Zn=1006,hu=1007,Ur=1008,Di=1009,Yv=1010,$v=1011,ua=1012,Rh=1013,Vr=1014,fi=1015,ga=1016,Ph=1017,Lh=1018,js=1020,Kv=35902,Zv=1021,Qv=1022,ei=1023,Jv=1024,e_=1025,Is=1026,qs=1027,Ih=1028,Dh=1029,t_=1030,Nh=1031,Uh=1033,Tl=33776,Al=33777,bl=33778,Cl=33779,od=35840,ad=35841,ld=35842,cd=35843,ud=36196,fd=37492,dd=37496,hd=37808,pd=37809,md=37810,gd=37811,vd=37812,_d=37813,xd=37814,yd=37815,Sd=37816,Md=37817,Ed=37818,wd=37819,Td=37820,Ad=37821,Rl=36492,bd=36494,Cd=36495,n_=36283,Rd=36284,Pd=36285,Ld=36286,HM=3200,GM=3201,i_=0,VM=1,Yi="",Un="srgb",gr="srgb-linear",kh="display-p3",Lc="display-p3-linear",rc="linear",ht="srgb",sc="rec709",oc="p3",Kr=7680,ym=519,WM=512,XM=513,jM=514,r_=515,qM=516,YM=517,$M=518,KM=519,Sm=35044,Mm="300 es",bi=2e3,ac=2001;class Js{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const $t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pu=Math.PI/180,Id=180/Math.PI;function va(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[t&255]+$t[t>>8&255]+$t[t>>16&255]+$t[t>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[n&63|128]+$t[n>>8&255]+"-"+$t[n>>16&255]+$t[n>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function fn(t,e,n){return Math.max(e,Math.min(n,t))}function ZM(t,e){return(t%e+e)%e}function mu(t,e,n){return(1-n)*t+n*e}function mo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function cn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,n=0){Ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(fn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,n,i,r,s,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],g=i[8],x=r[0],m=r[3],h=r[6],v=r[1],_=r[4],S=r[7],C=r[2],A=r[5],T=r[8];return s[0]=o*x+a*v+l*C,s[3]=o*m+a*_+l*A,s[6]=o*h+a*S+l*T,s[1]=c*x+u*v+d*C,s[4]=c*m+u*_+d*A,s[7]=c*h+u*S+d*T,s[2]=f*x+p*v+g*C,s[5]=f*m+p*_+g*A,s[8]=f*h+p*S+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,p=c*s-o*l,g=n*d+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(u*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(gu.makeScale(e,n)),this}rotate(e){return this.premultiply(gu.makeRotation(-e)),this}translate(e,n){return this.premultiply(gu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gu=new ke;function s_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function lc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function QM(){const t=lc("canvas");return t.style.display="block",t}const Em={};function Pl(t){t in Em||(Em[t]=!0,console.warn(t))}function JM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function e1(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function t1(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const wm=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Tm=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),go={[gr]:{transfer:rc,primaries:sc,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[Un]:{transfer:ht,primaries:sc,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Lc]:{transfer:rc,primaries:oc,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(Tm),fromReference:t=>t.applyMatrix3(wm)},[kh]:{transfer:ht,primaries:oc,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(Tm),fromReference:t=>t.applyMatrix3(wm).convertLinearToSRGB()}},n1=new Set([gr,Lc]),et={enabled:!0,_workingColorSpace:gr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!n1.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=go[e].toReference,r=go[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return go[t].primaries},getTransfer:function(t){return t===Yi?rc:go[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(go[e].luminanceCoefficients)}};function Ds(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function vu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Zr;class i1{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Zr===void 0&&(Zr=lc("canvas")),Zr.width=e.width,Zr.height=e.height;const i=Zr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Zr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=lc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ds(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ds(n[i]/255)*255):n[i]=Ds(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let r1=0;class o_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=va(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(_u(r[o].image)):s.push(_u(r[o]))}else s=_u(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function _u(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?i1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let s1=0;class Qt extends Js{constructor(e=Qt.DEFAULT_IMAGE,n=Qt.DEFAULT_MAPPING,i=Nr,r=Nr,s=Zn,o=Ur,a=ei,l=Di,c=Qt.DEFAULT_ANISOTROPY,u=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:s1++}),this.uuid=va(),this.name="",this.source=new o_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ca:e.x=e.x-Math.floor(e.x);break;case Nr:e.x=e.x<0?0:1;break;case sd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ca:e.y=e.y-Math.floor(e.y);break;case Nr:e.y=e.y<0?0:1;break;case sd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=qv;Qt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,n=0,i=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(c+1)/2,S=(p+1)/2,C=(h+1)/2,A=(u+f)/4,T=(d+x)/4,b=(g+m)/4;return _>S&&_>C?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=A/i,s=T/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=A/r,s=b/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=T/s,r=b/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(f-u)/v,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class o1 extends Js{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new rt(0,0,e,n),this.scissorTest=!1,this.viewport=new rt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Qt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new o_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wr extends o1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class a_ extends Qt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=Nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class a1 extends Qt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=Nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class eo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=g,e[n+3]=x;return}if(d!==x||l!==f||c!==p||u!==g){let m=1-a;const h=l*f+c*p+u*g+d*x,v=h>=0?1:-1,_=1-h*h;if(_>Number.EPSILON){const C=Math.sqrt(_),A=Math.atan2(C,h*v);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const S=a*v;if(l=l*m+f*S,c=c*m+p*S,u=u*m+g*S,d=d*m+x*S,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+u*d+l*p-c*f,e[n+1]=l*g+u*f+c*d-a*p,e[n+2]=c*g+u*p+a*f-l*d,e[n+3]=u*g-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"YZX":this._x=f*u*d+c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d-f*p*g;break;case"XZY":this._x=f*u*d-c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(fn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,n=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Am.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Am.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xu.copy(this).projectOnVector(e),this.sub(xu)}reflect(e){return this.sub(xu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(fn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xu=new B,Am=new eo;class qr{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Xn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Xn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Xn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xn):Xn.fromBufferAttribute(s,o),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ha.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ha.copy(i.boundingBox)),Ha.applyMatrix4(e.matrixWorld),this.union(Ha)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vo),Ga.subVectors(this.max,vo),Qr.subVectors(e.a,vo),Jr.subVectors(e.b,vo),es.subVectors(e.c,vo),zi.subVectors(Jr,Qr),Fi.subVectors(es,Jr),xr.subVectors(Qr,es);let n=[0,-zi.z,zi.y,0,-Fi.z,Fi.y,0,-xr.z,xr.y,zi.z,0,-zi.x,Fi.z,0,-Fi.x,xr.z,0,-xr.x,-zi.y,zi.x,0,-Fi.y,Fi.x,0,-xr.y,xr.x,0];return!yu(n,Qr,Jr,es,Ga)||(n=[1,0,0,0,1,0,0,0,1],!yu(n,Qr,Jr,es,Ga))?!1:(Va.crossVectors(zi,Fi),n=[Va.x,Va.y,Va.z],yu(n,Qr,Jr,es,Ga))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vi=[new B,new B,new B,new B,new B,new B,new B,new B],Xn=new B,Ha=new qr,Qr=new B,Jr=new B,es=new B,zi=new B,Fi=new B,xr=new B,vo=new B,Ga=new B,Va=new B,yr=new B;function yu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){yr.fromArray(t,s);const a=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),l=e.dot(yr),c=n.dot(yr),u=i.dot(yr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const l1=new qr,_o=new B,Su=new B;class to{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):l1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_o.subVectors(e,this.center);const n=_o.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(_o,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Su.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_o.copy(e.center).add(Su)),this.expandByPoint(_o.copy(e.center).sub(Su))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _i=new B,Mu=new B,Wa=new B,Oi=new B,Eu=new B,Xa=new B,wu=new B;class l_{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=_i.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,n),_i.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Mu.copy(e).add(n).multiplyScalar(.5),Wa.copy(n).sub(e).normalize(),Oi.copy(this.origin).sub(Mu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Wa),a=Oi.dot(this.direction),l=-Oi.dot(Wa),c=Oi.lengthSq(),u=Math.abs(1-o*o);let d,f,p,g;if(u>0)if(d=o*l-a,f=o*a-l,g=s*u,d>=0)if(f>=-g)if(f<=g){const x=1/u;d*=x,f*=x,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Mu).addScaledVector(Wa,f),p}intersectSphere(e,n){_i.subVectors(e.center,this.origin);const i=_i.dot(this.direction),r=_i.dot(_i)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,n,i,r,s){Eu.subVectors(n,e),Xa.subVectors(i,e),wu.crossVectors(Eu,Xa);let o=this.direction.dot(wu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Oi.subVectors(this.origin,e);const l=a*this.direction.dot(Xa.crossVectors(Oi,Xa));if(l<0)return null;const c=a*this.direction.dot(Eu.cross(Oi));if(c<0||l+c>o)return null;const u=-a*Oi.dot(wu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,n,i,r,s,o,a,l,c,u,d,f,p,g,x,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,d,f,p,g,x,m)}set(e,n,i,r,s,o,a,l,c,u,d,f,p,g,x,m){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ts.setFromMatrixColumn(e,0).length(),s=1/ts.setFromMatrixColumn(e,1).length(),o=1/ts.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*d,g=a*u,x=a*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=f-x*c,n[9]=-a*l,n[2]=x-f*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,g=c*u,x=c*d;n[0]=f+x*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*u,n[9]=-a,n[2]=p*a-g,n[6]=x+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,g=c*u,x=c*d;n[0]=f-x*a,n[4]=-o*d,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*u,n[9]=x-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*d,g=a*u,x=a*d;n[0]=l*u,n[4]=g*c-p,n[8]=f*c+x,n[1]=l*d,n[5]=x*c+f,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,g=a*l,x=a*c;n[0]=l*u,n[4]=x-f*d,n[8]=g*d+p,n[1]=d,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*d+g,n[10]=f-x*d}else if(e.order==="XZY"){const f=o*l,p=o*c,g=a*l,x=a*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+x,n[5]=o*u,n[9]=p*d-g,n[2]=g*d-p,n[6]=a*u,n[10]=x*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(c1,e,u1)}lookAt(e,n,i){const r=this.elements;return yn.subVectors(e,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Bi.crossVectors(i,yn),Bi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Bi.crossVectors(i,yn)),Bi.normalize(),ja.crossVectors(yn,Bi),r[0]=Bi.x,r[4]=ja.x,r[8]=yn.x,r[1]=Bi.y,r[5]=ja.y,r[9]=yn.y,r[2]=Bi.z,r[6]=ja.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],g=i[2],x=i[6],m=i[10],h=i[14],v=i[3],_=i[7],S=i[11],C=i[15],A=r[0],T=r[4],b=r[8],H=r[12],y=r[1],M=r[5],D=r[9],U=r[13],O=r[2],X=r[6],z=r[10],q=r[14],L=r[3],$=r[7],K=r[11],ne=r[15];return s[0]=o*A+a*y+l*O+c*L,s[4]=o*T+a*M+l*X+c*$,s[8]=o*b+a*D+l*z+c*K,s[12]=o*H+a*U+l*q+c*ne,s[1]=u*A+d*y+f*O+p*L,s[5]=u*T+d*M+f*X+p*$,s[9]=u*b+d*D+f*z+p*K,s[13]=u*H+d*U+f*q+p*ne,s[2]=g*A+x*y+m*O+h*L,s[6]=g*T+x*M+m*X+h*$,s[10]=g*b+x*D+m*z+h*K,s[14]=g*H+x*U+m*q+h*ne,s[3]=v*A+_*y+S*O+C*L,s[7]=v*T+_*M+S*X+C*$,s[11]=v*b+_*D+S*z+C*K,s[15]=v*H+_*U+S*q+C*ne,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],h=e[15];return g*(+s*l*d-r*c*d-s*a*f+i*c*f+r*a*p-i*l*p)+x*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+m*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*u-i*c*u)+h*(-r*a*u-n*l*d+n*a*f+r*o*d-i*o*f+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],h=e[15],v=d*m*c-x*f*c+x*l*p-a*m*p-d*l*h+a*f*h,_=g*f*c-u*m*c-g*l*p+o*m*p+u*l*h-o*f*h,S=u*x*c-g*d*c+g*a*p-o*x*p-u*a*h+o*d*h,C=g*d*l-u*x*l-g*a*f+o*x*f+u*a*m-o*d*m,A=n*v+i*_+r*S+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=v*T,e[1]=(x*f*s-d*m*s-x*r*p+i*m*p+d*r*h-i*f*h)*T,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*h+i*l*h)*T,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*p-i*l*p)*T,e[4]=_*T,e[5]=(u*m*s-g*f*s+g*r*p-n*m*p-u*r*h+n*f*h)*T,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*h-n*l*h)*T,e[7]=(o*f*s-u*l*s+u*r*c-n*f*c-o*r*p+n*l*p)*T,e[8]=S*T,e[9]=(g*d*s-u*x*s-g*i*p+n*x*p+u*i*h-n*d*h)*T,e[10]=(o*x*s-g*a*s+g*i*c-n*x*c-o*i*h+n*a*h)*T,e[11]=(u*a*s-o*d*s-u*i*c+n*d*c+o*i*p-n*a*p)*T,e[12]=C*T,e[13]=(u*x*r-g*d*r+g*i*f-n*x*f-u*i*m+n*d*m)*T,e[14]=(g*a*r-o*x*r-g*i*l+n*x*l+o*i*m-n*a*m)*T,e[15]=(o*d*r-u*a*r+u*i*l-n*d*l-o*i*f+n*a*f)*T,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,d=a+a,f=s*c,p=s*u,g=s*d,x=o*u,m=o*d,h=a*d,v=l*c,_=l*u,S=l*d,C=i.x,A=i.y,T=i.z;return r[0]=(1-(x+h))*C,r[1]=(p+S)*C,r[2]=(g-_)*C,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(f+h))*A,r[6]=(m+v)*A,r[7]=0,r[8]=(g+_)*T,r[9]=(m-v)*T,r[10]=(1-(f+x))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=ts.set(r[0],r[1],r[2]).length();const o=ts.set(r[4],r[5],r[6]).length(),a=ts.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],jn.copy(this);const c=1/s,u=1/o,d=1/a;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=u,jn.elements[5]*=u,jn.elements[6]*=u,jn.elements[8]*=d,jn.elements[9]*=d,jn.elements[10]*=d,n.setFromRotationMatrix(jn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=bi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),d=(n+e)/(n-e),f=(i+r)/(i-r);let p,g;if(a===bi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===ac)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=bi){const l=this.elements,c=1/(n-e),u=1/(i-r),d=1/(o-s),f=(n+e)*c,p=(i+r)*u;let g,x;if(a===bi)g=(o+s)*d,x=-2*d;else if(a===ac)g=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ts=new B,jn=new st,c1=new B(0,0,0),u1=new B(1,1,1),Bi=new B,ja=new B,yn=new B,bm=new st,Cm=new eo;class mi{constructor(e=0,n=0,i=0,r=mi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(fn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-fn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(fn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-fn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(fn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-fn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return bm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Cm.setFromEuler(this),this.setFromQuaternion(Cm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mi.DEFAULT_ORDER="XYZ";class c_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let f1=0;const Rm=new B,ns=new eo,xi=new st,qa=new B,xo=new B,d1=new B,h1=new eo,Pm=new B(1,0,0),Lm=new B(0,1,0),Im=new B(0,0,1),Dm={type:"added"},p1={type:"removed"},is={type:"childadded",child:null},Tu={type:"childremoved",child:null};class yt extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=va(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new B,n=new mi,i=new eo,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new ke}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new c_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ns.setFromAxisAngle(e,n),this.quaternion.multiply(ns),this}rotateOnWorldAxis(e,n){return ns.setFromAxisAngle(e,n),this.quaternion.premultiply(ns),this}rotateX(e){return this.rotateOnAxis(Pm,e)}rotateY(e){return this.rotateOnAxis(Lm,e)}rotateZ(e){return this.rotateOnAxis(Im,e)}translateOnAxis(e,n){return Rm.copy(e).applyQuaternion(this.quaternion),this.position.add(Rm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Pm,e)}translateY(e){return this.translateOnAxis(Lm,e)}translateZ(e){return this.translateOnAxis(Im,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?qa.copy(e):qa.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(xo,qa,this.up):xi.lookAt(qa,xo,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),ns.setFromRotationMatrix(xi),this.quaternion.premultiply(ns.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dm),is.child=e,this.dispatchEvent(is),is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(p1),Tu.child=e,this.dispatchEvent(Tu),Tu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dm),is.child=e,this.dispatchEvent(is),is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,e,d1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,h1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}yt.DEFAULT_UP=new B(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qn=new B,yi=new B,Au=new B,Si=new B,rs=new B,ss=new B,Nm=new B,bu=new B,Cu=new B,Ru=new B,Pu=new rt,Lu=new rt,Iu=new rt;class Qn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),qn.subVectors(e,n),r.cross(qn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){qn.subVectors(r,n),yi.subVectors(i,n),Au.subVectors(e,n);const o=qn.dot(qn),a=qn.dot(yi),l=qn.dot(Au),c=yi.dot(yi),u=yi.dot(Au),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return Pu.setScalar(0),Lu.setScalar(0),Iu.setScalar(0),Pu.fromBufferAttribute(e,n),Lu.fromBufferAttribute(e,i),Iu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Pu,s.x),o.addScaledVector(Lu,s.y),o.addScaledVector(Iu,s.z),o}static isFrontFacing(e,n,i,r){return qn.subVectors(i,n),yi.subVectors(e,n),qn.cross(yi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),qn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;rs.subVectors(r,i),ss.subVectors(s,i),bu.subVectors(e,i);const l=rs.dot(bu),c=ss.dot(bu);if(l<=0&&c<=0)return n.copy(i);Cu.subVectors(e,r);const u=rs.dot(Cu),d=ss.dot(Cu);if(u>=0&&d<=u)return n.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(rs,o);Ru.subVectors(e,s);const p=rs.dot(Ru),g=ss.dot(Ru);if(g>=0&&p<=g)return n.copy(s);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(ss,a);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Nm.subVectors(s,r),a=(d-u)/(d-u+(p-g)),n.copy(r).addScaledVector(Nm,a);const h=1/(m+x+f);return o=x*h,a=f*h,n.copy(i).addScaledVector(rs,o).addScaledVector(ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const u_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},Ya={h:0,s:0,l:0};function Du(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ge{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=et.workingColorSpace){return this.r=e,this.g=n,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=et.workingColorSpace){if(e=ZM(e,1),n=fn(n,0,1),i=fn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Du(o,s,e+1/3),this.g=Du(o,s,e),this.b=Du(o,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,n=Un){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Un){const i=u_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}copyLinearToSRGB(e){return this.r=vu(e.r),this.g=vu(e.g),this.b=vu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Un){return et.fromWorkingColorSpace(Kt.copy(this),e),Math.round(fn(Kt.r*255,0,255))*65536+Math.round(fn(Kt.g*255,0,255))*256+Math.round(fn(Kt.b*255,0,255))}getHexString(e=Un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=et.workingColorSpace){et.fromWorkingColorSpace(Kt.copy(this),n);const i=Kt.r,r=Kt.g,s=Kt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=et.workingColorSpace){return et.fromWorkingColorSpace(Kt.copy(this),n),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=Un){et.fromWorkingColorSpace(Kt.copy(this),e);const n=Kt.r,i=Kt.g,r=Kt.b;return e!==Un?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+n,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Hi),e.getHSL(Ya);const i=mu(Hi.h,Ya.h,n),r=mu(Hi.s,Ya.s,n),s=mu(Hi.l,Ya.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new Ge;Ge.NAMES=u_;let m1=0;class no extends Js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:m1++}),this.uuid=va(),this.name="",this.type="Material",this.blending=Ls,this.side=fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yf,this.blendDst=$f,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=Vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ym,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(i.blending=this.blending),this.side!==fr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Yf&&(i.blendSrc=this.blendSrc),this.blendDst!==$f&&(i.blendDst=this.blendDst),this.blendEquation!==Rr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ym&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Kr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Kr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qi extends no{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=Xv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new B,$a=new Ye;class An{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Sm,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)$a.fromBufferAttribute(this,n),$a.applyMatrix3(e),this.setXY(n,$a.x,$a.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix3(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix4(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyNormalMatrix(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.transformDirection(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=mo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=mo(n,this.array)),n}setX(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=mo(n,this.array)),n}setY(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=mo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=mo(n,this.array)),n}setW(e,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=cn(n,this.array),i=cn(i,this.array),r=cn(r,this.array),s=cn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sm&&(e.usage=this.usage),e}}class f_ extends An{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class d_ extends An{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Ct extends An{constructor(e,n,i){super(new Float32Array(e),n,i)}}let g1=0;const In=new st,Nu=new yt,os=new B,Sn=new qr,yo=new qr,Ft=new B;class Pn extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=va(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(s_(e)?d_:f_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,n,i){return In.makeTranslation(e,n,i),this.applyMatrix4(In),this}scale(e,n,i){return In.makeScale(e,n,i),this.applyMatrix4(In),this}lookAt(e){return Nu.lookAt(e),Nu.updateMatrix(),this.applyMatrix4(Nu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ct(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new to);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];yo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(Sn.min,yo.min),Sn.expandByPoint(Ft),Ft.addVectors(Sn.max,yo.max),Sn.expandByPoint(Ft)):(Sn.expandByPoint(yo.min),Sn.expandByPoint(yo.max))}Sn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ft.fromBufferAttribute(a,c),l&&(os.fromBufferAttribute(e,c),Ft.add(os)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let b=0;b<i.count;b++)a[b]=new B,l[b]=new B;const c=new B,u=new B,d=new B,f=new Ye,p=new Ye,g=new Ye,x=new B,m=new B;function h(b,H,y){c.fromBufferAttribute(i,b),u.fromBufferAttribute(i,H),d.fromBufferAttribute(i,y),f.fromBufferAttribute(s,b),p.fromBufferAttribute(s,H),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),p.sub(f),g.sub(f);const M=1/(p.x*g.y-g.x*p.y);isFinite(M)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(M),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(M),a[b].add(x),a[H].add(x),a[y].add(x),l[b].add(m),l[H].add(m),l[y].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,H=v.length;b<H;++b){const y=v[b],M=y.start,D=y.count;for(let U=M,O=M+D;U<O;U+=3)h(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const _=new B,S=new B,C=new B,A=new B;function T(b){C.fromBufferAttribute(r,b),A.copy(C);const H=a[b];_.copy(H),_.sub(C.multiplyScalar(C.dot(H))).normalize(),S.crossVectors(A,H);const M=S.dot(l[b])<0?-1:1;o.setXYZW(b,_.x,_.y,_.z,M)}for(let b=0,H=v.length;b<H;++b){const y=v[b],M=y.start,D=y.count;for(let U=M,O=M+D;U<O;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new An(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let h=0;h<u;h++)f[g++]=c[p++]}return new An(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Pn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Um=new st,Sr=new l_,Ka=new to,km=new B,Za=new B,Qa=new B,Ja=new B,Uu=new B,el=new B,zm=new B,tl=new B;class Fe extends yt{constructor(e=new Pn,n=new Qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){el.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Uu.fromBufferAttribute(d,e),o?el.addScaledVector(Uu,u):el.addScaledVector(Uu.sub(n),u))}n.add(el)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(s),Sr.copy(e.ray).recast(e.near),!(Ka.containsPoint(Sr.origin)===!1&&(Sr.intersectSphere(Ka,km)===null||Sr.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(Um.copy(s).invert(),Sr.copy(e.ray).applyMatrix4(Um),!(i.boundingBox!==null&&Sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Sr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,C=_;S<C;S+=3){const A=a.getX(S),T=a.getX(S+1),b=a.getX(S+2);r=nl(this,h,e,i,c,u,d,A,T,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){const v=a.getX(m),_=a.getX(m+1),S=a.getX(m+2);r=nl(this,o,e,i,c,u,d,v,_,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,C=_;S<C;S+=3){const A=S,T=S+1,b=S+2;r=nl(this,h,e,i,c,u,d,A,T,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){const v=m,_=m+1,S=m+2;r=nl(this,o,e,i,c,u,d,v,_,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function v1(t,e,n,i,r,s,o,a){let l;if(e.side===rn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===fr,a),l===null)return null;tl.copy(a),tl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(tl);return c<n.near||c>n.far?null:{distance:c,point:tl.clone(),object:t}}function nl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Za),t.getVertexPosition(l,Qa),t.getVertexPosition(c,Ja);const u=v1(t,e,n,i,Za,Qa,Ja,zm);if(u){const d=new B;Qn.getBarycoord(zm,Za,Qa,Ja,d),r&&(u.uv=Qn.getInterpolatedAttribute(r,a,l,c,d,new Ye)),s&&(u.uv1=Qn.getInterpolatedAttribute(s,a,l,c,d,new Ye)),o&&(u.normal=Qn.getInterpolatedAttribute(o,a,l,c,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new B,materialIndex:0};Qn.getNormal(Za,Qa,Ja,f.normal),u.face=f,u.barycoord=d}return u}class Te extends Pn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(u,3)),this.setAttribute("uv",new Ct(d,2));function g(x,m,h,v,_,S,C,A,T,b,H){const y=S/T,M=C/b,D=S/2,U=C/2,O=A/2,X=T+1,z=b+1;let q=0,L=0;const $=new B;for(let K=0;K<z;K++){const ne=K*M-U;for(let we=0;we<X;we++){const ze=we*y-D;$[x]=ze*v,$[m]=ne*_,$[h]=O,c.push($.x,$.y,$.z),$[x]=0,$[m]=0,$[h]=A>0?1:-1,u.push($.x,$.y,$.z),d.push(we/T),d.push(1-K/b),q+=1}}for(let K=0;K<b;K++)for(let ne=0;ne<T;ne++){const we=f+ne+X*K,ze=f+ne+X*(K+1),Y=f+(ne+1)+X*(K+1),ie=f+(ne+1)+X*K;l.push(we,ze,ie),l.push(ze,Y,ie),L+=6}a.addGroup(p,L,H),p+=L,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Te(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ys(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function en(t){const e={};for(let n=0;n<t.length;n++){const i=Ys(t[n]);for(const r in i)e[r]=i[r]}return e}function _1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function h_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const x1={clone:Ys,merge:en};var y1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,S1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dr extends no{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=y1,this.fragmentShader=S1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=_1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class p_ extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=bi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gi=new B,Fm=new Ye,Om=new Ye;class En extends p_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Id*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(pu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Id*2*Math.atan(Math.tan(pu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z),Gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gi.x,Gi.y).multiplyScalar(-e/Gi.z)}getViewSize(e,n){return this.getViewBounds(e,Fm,Om),n.subVectors(Om,Fm)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(pu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const as=-90,ls=1;class M1 extends yt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new En(as,ls,e,n);r.layers=this.layers,this.add(r);const s=new En(as,ls,e,n);s.layers=this.layers,this.add(s);const o=new En(as,ls,e,n);o.layers=this.layers,this.add(o);const a=new En(as,ls,e,n);a.layers=this.layers,this.add(a);const l=new En(as,ls,e,n);l.layers=this.layers,this.add(l);const c=new En(as,ls,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===bi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ac)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(d,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class m_ extends Qt{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:Ws,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class E1 extends Wr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new m_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Zn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Te(5,5,5),s=new dr({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:ar});s.uniforms.tEquirect.value=n;const o=new Fe(r,s),a=n.minFilter;return n.minFilter===Ur&&(n.minFilter=Zn),new M1(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const ku=new B,w1=new B,T1=new ke;class br{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=ku.subVectors(i,n).cross(w1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(ku),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||T1.getNormalMatrix(e),r=this.coplanarPoint(ku).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mr=new to,il=new B;class zh{constructor(e=new br,n=new br,i=new br,r=new br,s=new br,o=new br){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=bi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],f=r[7],p=r[8],g=r[9],x=r[10],m=r[11],h=r[12],v=r[13],_=r[14],S=r[15];if(i[0].setComponents(l-s,f-c,m-p,S-h).normalize(),i[1].setComponents(l+s,f+c,m+p,S+h).normalize(),i[2].setComponents(l+o,f+u,m+g,S+v).normalize(),i[3].setComponents(l-o,f-u,m-g,S-v).normalize(),i[4].setComponents(l-a,f-d,m-x,S-_).normalize(),n===bi)i[5].setComponents(l+a,f+d,m+x,S+_).normalize();else if(n===ac)i[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(e){return Mr.center.set(0,0,0),Mr.radius=.7071067811865476,Mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(il.x=r.normal.x>0?e.max.x:e.min.x,il.y=r.normal.y>0?e.max.y:e.min.y,il.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(il)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function g_(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function A1(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){const g=d[f],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];t.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class _a extends Pn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=n/l,p=[],g=[],x=[],m=[];for(let h=0;h<u;h++){const v=h*f-o;for(let _=0;_<c;_++){const S=_*d-s;g.push(S,-v,0),x.push(0,0,1),m.push(_/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<a;v++){const _=v+c*h,S=v+c*(h+1),C=v+1+c*(h+1),A=v+1+c*h;p.push(_,S,A),p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(x,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _a(e.width,e.height,e.widthSegments,e.heightSegments)}}var b1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,C1=`#ifdef USE_ALPHAHASH
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
#endif`,R1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,P1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,L1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,I1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,D1=`#ifdef USE_AOMAP
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
#endif`,N1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,U1=`#ifdef USE_BATCHING
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
#endif`,k1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,z1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,B1=`#ifdef USE_IRIDESCENCE
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
#endif`,H1=`#ifdef USE_BUMPMAP
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
#endif`,G1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,V1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,W1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,X1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,j1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,q1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Y1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,K1=`#define PI 3.141592653589793
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
} // validated`,Z1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Q1=`vec3 transformedNormal = objectNormal;
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
#endif`,J1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iE="gl_FragColor = linearToOutputTexel( gl_FragColor );",rE=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sE=`#ifdef USE_ENVMAP
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
#endif`,oE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,aE=`#ifdef USE_ENVMAP
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
#endif`,lE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cE=`#ifdef USE_ENVMAP
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
#endif`,uE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pE=`#ifdef USE_GRADIENTMAP
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
}`,mE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_E=`uniform bool receiveShadow;
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
#endif`,xE=`#ifdef USE_ENVMAP
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
#endif`,yE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,SE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ME=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,EE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wE=`PhysicalMaterial material;
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
#endif`,TE=`struct PhysicalMaterial {
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
}`,AE=`
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
#endif`,bE=`#if defined( RE_IndirectDiffuse )
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
#endif`,CE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,RE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,PE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,DE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,NE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,UE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kE=`#if defined( USE_POINTS_UV )
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
#endif`,zE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,FE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,OE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,BE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,HE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GE=`#ifdef USE_MORPHTARGETS
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
#endif`,VE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,XE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$E=`#ifdef USE_NORMALMAP
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
#endif`,KE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ZE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,QE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,JE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ew=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ow=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
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
#endif`,cw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fw=`float getShadowMask() {
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
}`,dw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hw=`#ifdef USE_SKINNING
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
#endif`,pw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mw=`#ifdef USE_SKINNING
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
#endif`,gw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_w=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yw=`#ifdef USE_TRANSMISSION
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
#endif`,Sw=`#ifdef USE_TRANSMISSION
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
#endif`,Mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ww=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Aw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bw=`uniform sampler2D t2D;
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
}`,Cw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iw=`#include <common>
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
}`,Dw=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nw=`#define DISTANCE
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
}`,Uw=`#define DISTANCE
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
}`,kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fw=`uniform float scale;
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
}`,Ow=`uniform vec3 diffuse;
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
}`,Bw=`#include <common>
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
}`,Hw=`uniform vec3 diffuse;
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
}`,Gw=`#define LAMBERT
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
}`,Vw=`#define LAMBERT
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
}`,Ww=`#define MATCAP
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
}`,Xw=`#define MATCAP
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
}`,jw=`#define NORMAL
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
}`,qw=`#define NORMAL
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
}`,Yw=`#define PHONG
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
}`,$w=`#define PHONG
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
}`,Kw=`#define STANDARD
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
}`,Zw=`#define STANDARD
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
}`,Qw=`#define TOON
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
}`,Jw=`#define TOON
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
}`,eT=`uniform float size;
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
}`,tT=`uniform vec3 diffuse;
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
}`,nT=`#include <common>
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
}`,iT=`uniform vec3 color;
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
}`,rT=`uniform float rotation;
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
}`,sT=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:b1,alphahash_pars_fragment:C1,alphamap_fragment:R1,alphamap_pars_fragment:P1,alphatest_fragment:L1,alphatest_pars_fragment:I1,aomap_fragment:D1,aomap_pars_fragment:N1,batching_pars_vertex:U1,batching_vertex:k1,begin_vertex:z1,beginnormal_vertex:F1,bsdfs:O1,iridescence_fragment:B1,bumpmap_pars_fragment:H1,clipping_planes_fragment:G1,clipping_planes_pars_fragment:V1,clipping_planes_pars_vertex:W1,clipping_planes_vertex:X1,color_fragment:j1,color_pars_fragment:q1,color_pars_vertex:Y1,color_vertex:$1,common:K1,cube_uv_reflection_fragment:Z1,defaultnormal_vertex:Q1,displacementmap_pars_vertex:J1,displacementmap_vertex:eE,emissivemap_fragment:tE,emissivemap_pars_fragment:nE,colorspace_fragment:iE,colorspace_pars_fragment:rE,envmap_fragment:sE,envmap_common_pars_fragment:oE,envmap_pars_fragment:aE,envmap_pars_vertex:lE,envmap_physical_pars_fragment:xE,envmap_vertex:cE,fog_vertex:uE,fog_pars_vertex:fE,fog_fragment:dE,fog_pars_fragment:hE,gradientmap_pars_fragment:pE,lightmap_pars_fragment:mE,lights_lambert_fragment:gE,lights_lambert_pars_fragment:vE,lights_pars_begin:_E,lights_toon_fragment:yE,lights_toon_pars_fragment:SE,lights_phong_fragment:ME,lights_phong_pars_fragment:EE,lights_physical_fragment:wE,lights_physical_pars_fragment:TE,lights_fragment_begin:AE,lights_fragment_maps:bE,lights_fragment_end:CE,logdepthbuf_fragment:RE,logdepthbuf_pars_fragment:PE,logdepthbuf_pars_vertex:LE,logdepthbuf_vertex:IE,map_fragment:DE,map_pars_fragment:NE,map_particle_fragment:UE,map_particle_pars_fragment:kE,metalnessmap_fragment:zE,metalnessmap_pars_fragment:FE,morphinstance_vertex:OE,morphcolor_vertex:BE,morphnormal_vertex:HE,morphtarget_pars_vertex:GE,morphtarget_vertex:VE,normal_fragment_begin:WE,normal_fragment_maps:XE,normal_pars_fragment:jE,normal_pars_vertex:qE,normal_vertex:YE,normalmap_pars_fragment:$E,clearcoat_normal_fragment_begin:KE,clearcoat_normal_fragment_maps:ZE,clearcoat_pars_fragment:QE,iridescence_pars_fragment:JE,opaque_fragment:ew,packing:tw,premultiplied_alpha_fragment:nw,project_vertex:iw,dithering_fragment:rw,dithering_pars_fragment:sw,roughnessmap_fragment:ow,roughnessmap_pars_fragment:aw,shadowmap_pars_fragment:lw,shadowmap_pars_vertex:cw,shadowmap_vertex:uw,shadowmask_pars_fragment:fw,skinbase_vertex:dw,skinning_pars_vertex:hw,skinning_vertex:pw,skinnormal_vertex:mw,specularmap_fragment:gw,specularmap_pars_fragment:vw,tonemapping_fragment:_w,tonemapping_pars_fragment:xw,transmission_fragment:yw,transmission_pars_fragment:Sw,uv_pars_fragment:Mw,uv_pars_vertex:Ew,uv_vertex:ww,worldpos_vertex:Tw,background_vert:Aw,background_frag:bw,backgroundCube_vert:Cw,backgroundCube_frag:Rw,cube_vert:Pw,cube_frag:Lw,depth_vert:Iw,depth_frag:Dw,distanceRGBA_vert:Nw,distanceRGBA_frag:Uw,equirect_vert:kw,equirect_frag:zw,linedashed_vert:Fw,linedashed_frag:Ow,meshbasic_vert:Bw,meshbasic_frag:Hw,meshlambert_vert:Gw,meshlambert_frag:Vw,meshmatcap_vert:Ww,meshmatcap_frag:Xw,meshnormal_vert:jw,meshnormal_frag:qw,meshphong_vert:Yw,meshphong_frag:$w,meshphysical_vert:Kw,meshphysical_frag:Zw,meshtoon_vert:Qw,meshtoon_frag:Jw,points_vert:eT,points_frag:tT,shadow_vert:nT,shadow_frag:iT,sprite_vert:rT,sprite_frag:sT},ae={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},li={basic:{uniforms:en([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:en([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:en([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:en([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:en([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:en([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:en([ae.points,ae.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:en([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:en([ae.common,ae.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:en([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:en([ae.sprite,ae.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:en([ae.common,ae.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:en([ae.lights,ae.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};li.physical={uniforms:en([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const rl={r:0,b:0,g:0},Er=new mi,oT=new st;function aT(t,e,n,i,r,s,o){const a=new Ge(0);let l=s===!0?0:1,c,u,d=null,f=0,p=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?n:e).get(_)),_}function x(v){let _=!1;const S=g(v);S===null?h(a,l):S&&S.isColor&&(h(S,1),_=!0);const C=t.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(v,_){const S=g(_);S&&(S.isCubeTexture||S.mapping===Pc)?(u===void 0&&(u=new Fe(new Te(1,1,1),new dr({name:"BackgroundCubeMaterial",uniforms:Ys(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Er.copy(_.backgroundRotation),Er.x*=-1,Er.y*=-1,Er.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Er.y*=-1,Er.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(oT.makeRotationFromEuler(Er)),u.material.toneMapped=et.getTransfer(S.colorSpace)!==ht,(d!==S||f!==S.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,d=S,f=S.version,p=t.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Fe(new _a(2,2),new dr({name:"BackgroundMaterial",uniforms:Ys(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:fr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=et.getTransfer(S.colorSpace)!==ht,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,p=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function h(v,_){v.getRGB(rl,h_(t)),i.buffers.color.setClear(rl.r,rl.g,rl.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),l=_,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,h(a,l)},render:x,addToRenderList:m}}function lT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(y,M,D,U,O){let X=!1;const z=d(U,D,M);s!==z&&(s=z,c(s.object)),X=p(y,U,D,O),X&&g(y,U,D,O),O!==null&&e.update(O,t.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,S(y,M,D,U),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return t.createVertexArray()}function c(y){return t.bindVertexArray(y)}function u(y){return t.deleteVertexArray(y)}function d(y,M,D){const U=D.wireframe===!0;let O=i[y.id];O===void 0&&(O={},i[y.id]=O);let X=O[M.id];X===void 0&&(X={},O[M.id]=X);let z=X[U];return z===void 0&&(z=f(l()),X[U]=z),z}function f(y){const M=[],D=[],U=[];for(let O=0;O<n;O++)M[O]=0,D[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:D,attributeDivisors:U,object:y,attributes:{},index:null}}function p(y,M,D,U){const O=s.attributes,X=M.attributes;let z=0;const q=D.getAttributes();for(const L in q)if(q[L].location>=0){const K=O[L];let ne=X[L];if(ne===void 0&&(L==="instanceMatrix"&&y.instanceMatrix&&(ne=y.instanceMatrix),L==="instanceColor"&&y.instanceColor&&(ne=y.instanceColor)),K===void 0||K.attribute!==ne||ne&&K.data!==ne.data)return!0;z++}return s.attributesNum!==z||s.index!==U}function g(y,M,D,U){const O={},X=M.attributes;let z=0;const q=D.getAttributes();for(const L in q)if(q[L].location>=0){let K=X[L];K===void 0&&(L==="instanceMatrix"&&y.instanceMatrix&&(K=y.instanceMatrix),L==="instanceColor"&&y.instanceColor&&(K=y.instanceColor));const ne={};ne.attribute=K,K&&K.data&&(ne.data=K.data),O[L]=ne,z++}s.attributes=O,s.attributesNum=z,s.index=U}function x(){const y=s.newAttributes;for(let M=0,D=y.length;M<D;M++)y[M]=0}function m(y){h(y,0)}function h(y,M){const D=s.newAttributes,U=s.enabledAttributes,O=s.attributeDivisors;D[y]=1,U[y]===0&&(t.enableVertexAttribArray(y),U[y]=1),O[y]!==M&&(t.vertexAttribDivisor(y,M),O[y]=M)}function v(){const y=s.newAttributes,M=s.enabledAttributes;for(let D=0,U=M.length;D<U;D++)M[D]!==y[D]&&(t.disableVertexAttribArray(D),M[D]=0)}function _(y,M,D,U,O,X,z){z===!0?t.vertexAttribIPointer(y,M,D,O,X):t.vertexAttribPointer(y,M,D,U,O,X)}function S(y,M,D,U){x();const O=U.attributes,X=D.getAttributes(),z=M.defaultAttributeValues;for(const q in X){const L=X[q];if(L.location>=0){let $=O[q];if($===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),$!==void 0){const K=$.normalized,ne=$.itemSize,we=e.get($);if(we===void 0)continue;const ze=we.buffer,Y=we.type,ie=we.bytesPerElement,de=Y===t.INT||Y===t.UNSIGNED_INT||$.gpuType===Rh;if($.isInterleavedBufferAttribute){const ce=$.data,De=ce.stride,be=$.offset;if(ce.isInstancedInterleavedBuffer){for(let Ve=0;Ve<L.locationSize;Ve++)h(L.location+Ve,ce.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ve=0;Ve<L.locationSize;Ve++)m(L.location+Ve);t.bindBuffer(t.ARRAY_BUFFER,ze);for(let Ve=0;Ve<L.locationSize;Ve++)_(L.location+Ve,ne/L.locationSize,Y,K,De*ie,(be+ne/L.locationSize*Ve)*ie,de)}else{if($.isInstancedBufferAttribute){for(let ce=0;ce<L.locationSize;ce++)h(L.location+ce,$.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ce=0;ce<L.locationSize;ce++)m(L.location+ce);t.bindBuffer(t.ARRAY_BUFFER,ze);for(let ce=0;ce<L.locationSize;ce++)_(L.location+ce,ne/L.locationSize,Y,K,ne*ie,ne/L.locationSize*ce*ie,de)}}else if(z!==void 0){const K=z[q];if(K!==void 0)switch(K.length){case 2:t.vertexAttrib2fv(L.location,K);break;case 3:t.vertexAttrib3fv(L.location,K);break;case 4:t.vertexAttrib4fv(L.location,K);break;default:t.vertexAttrib1fv(L.location,K)}}}}v()}function C(){b();for(const y in i){const M=i[y];for(const D in M){const U=M[D];for(const O in U)u(U[O].object),delete U[O];delete M[D]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;const M=i[y.id];for(const D in M){const U=M[D];for(const O in U)u(U[O].object),delete U[O];delete M[D]}delete i[y.id]}function T(y){for(const M in i){const D=i[M];if(D[y.id]===void 0)continue;const U=D[y.id];for(const O in U)u(U[O].object),delete U[O];delete D[y.id]}}function b(){H(),o=!0,s!==r&&(s=r,c(s.object))}function H(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:H,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function cT(t,e,n){let i;function r(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function o(c,u,d){d!==0&&(t.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];n.update(p,i,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];for(let x=0;x<f.length;x++)n.update(g,i,f[x])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function uT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==ei&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const b=T===ga&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Di&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==fi&&!b)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const T=e.get("EXT_clip_control");T.clipControlEXT(T.LOWER_LEFT_EXT,T.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),_=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:S,vertexTextures:C,maxSamples:A}}function fT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new br,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,h=t.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const v=s?0:i,_=v*4;let S=h.clippingState||null;l.value=S,S=u(g,f,_,p);for(let C=0;C!==_;++C)S[C]=n[C];h.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const h=p+x*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let _=0,S=p;_!==x;++_,S+=4)o.copy(d[_]).applyMatrix4(v,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function dT(t){let e=new WeakMap;function n(o,a){return a===id?o.mapping=Ws:a===rd&&(o.mapping=Xs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===id||a===rd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new E1(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class v_ extends p_{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ws=4,Bm=[.125,.215,.35,.446,.526,.582],Pr=20,zu=new v_,Hm=new Ge;let Fu=null,Ou=0,Bu=0,Hu=!1;const Cr=(1+Math.sqrt(5))/2,cs=1/Cr,Gm=[new B(-Cr,cs,0),new B(Cr,cs,0),new B(-cs,0,Cr),new B(cs,0,Cr),new B(0,Cr,-cs),new B(0,Cr,cs),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class Vm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Fu=this._renderer.getRenderTarget(),Ou=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fu,Ou,Bu),this._renderer.xr.enabled=Hu,e.scissorTest=!1,sl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ws||e.mapping===Xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fu=this._renderer.getRenderTarget(),Ou=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),Hu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Zn,minFilter:Zn,generateMipmaps:!1,type:ga,format:ei,colorSpace:gr,depthBuffer:!1},r=Wm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hT(s)),this._blurMaterial=pT(s,e,n)}return r}_compileMaterial(e){const n=new Fe(this._lodPlanes[0],e);this._renderer.compile(n,zu)}_sceneToCubeUV(e,n,i,r){const a=new En(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Hm),u.toneMapping=lr,u.autoClear=!1;const p=new Qi({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),g=new Fe(new Te,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Hm),x=!0);for(let h=0;h<6;h++){const v=h%3;v===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):v===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const _=this._cubeSize;sl(r,v*_,h>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ws||e.mapping===Xs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=jm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Fe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;sl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,zu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Gm[(r-s-1)%Gm.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Fe(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Pr-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Pr;m>Pr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pr}`);const h=[];let v=0;for(let T=0;T<Pr;++T){const b=T/x,H=Math.exp(-b*b/2);h.push(H),T===0?v+=H:T<m&&(v+=2*H)}for(let T=0;T<h.length;T++)h[T]=h[T]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;const S=this._sizeLods[r],C=3*S*(r>_-ws?r-_+ws:0),A=4*(this._cubeSize-S);sl(n,C,A,3*S,2*S),l.setRenderTarget(n),l.render(d,zu)}}function hT(t){const e=[],n=[],i=[];let r=t;const s=t-ws+1+Bm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ws?l=Bm[o-t+ws-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,x=3,m=2,h=1,v=new Float32Array(x*g*p),_=new Float32Array(m*g*p),S=new Float32Array(h*g*p);for(let A=0;A<p;A++){const T=A%3*2/3-1,b=A>2?0:-1,H=[T,b,0,T+2/3,b,0,T+2/3,b+1,0,T,b,0,T+2/3,b+1,0,T,b+1,0];v.set(H,x*g*A),_.set(f,m*g*A);const y=[A,A,A,A,A,A];S.set(y,h*g*A)}const C=new Pn;C.setAttribute("position",new An(v,x)),C.setAttribute("uv",new An(_,m)),C.setAttribute("faceIndex",new An(S,h)),e.push(C),r>ws&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Wm(t,e,n){const i=new Wr(t,e,n);return i.texture.mapping=Pc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function sl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function pT(t,e,n){const i=new Float32Array(Pr),r=new B(0,1,0);return new dr({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Fh(),fragmentShader:`

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
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Xm(){return new dr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fh(),fragmentShader:`

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
		`,blending:ar,depthTest:!1,depthWrite:!1})}function jm(){return new dr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Fh(){return`

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
	`}function mT(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===id||l===rd,u=l===Ws||l===Xs;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new Vm(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(n===null&&(n=new Vm(t)),d=c?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function gT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Pl("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function vT(t,e,n,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,h=x.length;m<h;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],t.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const x=p[g];for(let m=0,h=x.length;m<h;m++)e.update(x[m],t.ARRAY_BUFFER)}}function c(d){const f=[],p=d.index,g=d.attributes.position;let x=0;if(p!==null){const v=p.array;x=p.version;for(let _=0,S=v.length;_<S;_+=3){const C=v[_+0],A=v[_+1],T=v[_+2];f.push(C,A,A,T,T,C)}}else if(g!==void 0){const v=g.array;x=g.version;for(let _=0,S=v.length/3-1;_<S;_+=3){const C=_+0,A=_+1,T=_+2;f.push(C,A,A,T,T,C)}}else return;const m=new(s_(f)?d_:f_)(f,1);m.version=x;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function _T(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,f*o,g),n.update(p,i,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];n.update(m,i,1)}function d(f,p,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/o,p[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,g);let h=0;for(let v=0;v<g;v++)h+=p[v];for(let v=0;v<x.length;v++)n.update(h,i,x[v])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function xT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function yT(t,e,n){const i=new WeakMap,r=new rt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let y=function(){b.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),x===!0&&(S=2),m===!0&&(S=3);let C=a.attributes.position.count*S,A=1;C>e.maxTextureSize&&(A=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const T=new Float32Array(C*A*4*d),b=new a_(T,C,A,d);b.type=fi,b.needsUpdate=!0;const H=S*4;for(let M=0;M<d;M++){const D=h[M],U=v[M],O=_[M],X=C*A*4*M;for(let z=0;z<D.count;z++){const q=z*H;g===!0&&(r.fromBufferAttribute(D,z),T[X+q+0]=r.x,T[X+q+1]=r.y,T[X+q+2]=r.z,T[X+q+3]=0),x===!0&&(r.fromBufferAttribute(U,z),T[X+q+4]=r.x,T[X+q+5]=r.y,T[X+q+6]=r.z,T[X+q+7]=0),m===!0&&(r.fromBufferAttribute(O,z),T[X+q+8]=r.x,T[X+q+9]=r.y,T[X+q+10]=r.z,T[X+q+11]=O.itemSize===4?r.w:1)}}f={count:d,texture:b,size:new Ye(C,A)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function ST(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class __ extends Qt{constructor(e,n,i,r,s,o,a,l,c,u=Is){if(u!==Is&&u!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Is&&(i=Vr),i===void 0&&u===qs&&(i=js),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:hn,this.minFilter=l!==void 0?l:hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const x_=new Qt,qm=new __(1,1),y_=new a_,S_=new a1,M_=new m_,Ym=[],$m=[],Km=new Float32Array(16),Zm=new Float32Array(9),Qm=new Float32Array(4);function io(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Ym[r];if(s===void 0&&(s=new Float32Array(r),Ym[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function kt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function zt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ic(t,e){let n=$m[e];n===void 0&&(n=new Int32Array(e),$m[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function MT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function ET(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2fv(this.addr,e),zt(n,e)}}function wT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(kt(n,e))return;t.uniform3fv(this.addr,e),zt(n,e)}}function TT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4fv(this.addr,e),zt(n,e)}}function AT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),zt(n,e)}else{if(kt(n,i))return;Qm.set(i),t.uniformMatrix2fv(this.addr,!1,Qm),zt(n,i)}}function bT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),zt(n,e)}else{if(kt(n,i))return;Zm.set(i),t.uniformMatrix3fv(this.addr,!1,Zm),zt(n,i)}}function CT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),zt(n,e)}else{if(kt(n,i))return;Km.set(i),t.uniformMatrix4fv(this.addr,!1,Km),zt(n,i)}}function RT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function PT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2iv(this.addr,e),zt(n,e)}}function LT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(kt(n,e))return;t.uniform3iv(this.addr,e),zt(n,e)}}function IT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4iv(this.addr,e),zt(n,e)}}function DT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function NT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2uiv(this.addr,e),zt(n,e)}}function UT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(kt(n,e))return;t.uniform3uiv(this.addr,e),zt(n,e)}}function kT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4uiv(this.addr,e),zt(n,e)}}function zT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(qm.compareFunction=r_,s=qm):s=x_,n.setTexture2D(e||s,r)}function FT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||S_,r)}function OT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||M_,r)}function BT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||y_,r)}function HT(t){switch(t){case 5126:return MT;case 35664:return ET;case 35665:return wT;case 35666:return TT;case 35674:return AT;case 35675:return bT;case 35676:return CT;case 5124:case 35670:return RT;case 35667:case 35671:return PT;case 35668:case 35672:return LT;case 35669:case 35673:return IT;case 5125:return DT;case 36294:return NT;case 36295:return UT;case 36296:return kT;case 35678:case 36198:case 36298:case 36306:case 35682:return zT;case 35679:case 36299:case 36307:return FT;case 35680:case 36300:case 36308:case 36293:return OT;case 36289:case 36303:case 36311:case 36292:return BT}}function GT(t,e){t.uniform1fv(this.addr,e)}function VT(t,e){const n=io(e,this.size,2);t.uniform2fv(this.addr,n)}function WT(t,e){const n=io(e,this.size,3);t.uniform3fv(this.addr,n)}function XT(t,e){const n=io(e,this.size,4);t.uniform4fv(this.addr,n)}function jT(t,e){const n=io(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function qT(t,e){const n=io(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function YT(t,e){const n=io(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function $T(t,e){t.uniform1iv(this.addr,e)}function KT(t,e){t.uniform2iv(this.addr,e)}function ZT(t,e){t.uniform3iv(this.addr,e)}function QT(t,e){t.uniform4iv(this.addr,e)}function JT(t,e){t.uniform1uiv(this.addr,e)}function eA(t,e){t.uniform2uiv(this.addr,e)}function tA(t,e){t.uniform3uiv(this.addr,e)}function nA(t,e){t.uniform4uiv(this.addr,e)}function iA(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||x_,s[o])}function rA(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||S_,s[o])}function sA(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||M_,s[o])}function oA(t,e,n){const i=this.cache,r=e.length,s=Ic(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),zt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||y_,s[o])}function aA(t){switch(t){case 5126:return GT;case 35664:return VT;case 35665:return WT;case 35666:return XT;case 35674:return jT;case 35675:return qT;case 35676:return YT;case 5124:case 35670:return $T;case 35667:case 35671:return KT;case 35668:case 35672:return ZT;case 35669:case 35673:return QT;case 5125:return JT;case 36294:return eA;case 36295:return tA;case 36296:return nA;case 35678:case 36198:case 36298:case 36306:case 35682:return iA;case 35679:case 36299:case 36307:return rA;case 35680:case 36300:case 36308:case 36293:return sA;case 36289:case 36303:case 36311:case 36292:return oA}}class lA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=HT(n.type)}}class cA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=aA(n.type)}}class uA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Gu=/(\w+)(\])?(\[|\.)?/g;function Jm(t,e){t.seq.push(e),t.map[e.id]=e}function fA(t,e,n){const i=t.name,r=i.length;for(Gu.lastIndex=0;;){const s=Gu.exec(i),o=Gu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Jm(n,c===void 0?new lA(a,t,e):new cA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new uA(a),Jm(n,d)),n=d}}}class Ll{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);fA(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function e0(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const dA=37297;let hA=0;function pA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function mA(t){const e=et.getPrimaries(et.workingColorSpace),n=et.getPrimaries(t);let i;switch(e===n?i="":e===oc&&n===sc?i="LinearDisplayP3ToLinearSRGB":e===sc&&n===oc&&(i="LinearSRGBToLinearDisplayP3"),t){case gr:case Lc:return[i,"LinearTransferOETF"];case Un:case kh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function t0(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+pA(t.getShaderSource(e),o)}else return r}function gA(t,e){const n=mA(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function vA(t,e){let n;switch(e){case NM:n="Linear";break;case UM:n="Reinhard";break;case kM:n="Cineon";break;case jv:n="ACESFilmic";break;case FM:n="AgX";break;case OM:n="Neutral";break;case zM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ol=new B;function _A(){et.getLuminanceCoefficients(ol);const t=ol.x.toFixed(4),e=ol.y.toFixed(4),n=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Do).join(`
`)}function yA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function SA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Do(t){return t!==""}function n0(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function i0(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const MA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dd(t){return t.replace(MA,wA)}const EA=new Map;function wA(t,e){let n=Ue[e];if(n===void 0){const i=EA.get(e);if(i!==void 0)n=Ue[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Dd(n)}const TA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function r0(t){return t.replace(TA,AA)}function AA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function s0(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Vv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Wv?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function CA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ws:case Xs:e="ENVMAP_TYPE_CUBE";break;case Pc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function RA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Xs:e="ENVMAP_MODE_REFRACTION";break}return e}function PA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Xv:e="ENVMAP_BLENDING_MULTIPLY";break;case IM:e="ENVMAP_BLENDING_MIX";break;case DM:e="ENVMAP_BLENDING_ADD";break}return e}function LA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function IA(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=bA(n),c=CA(n),u=RA(n),d=PA(n),f=LA(n),p=xA(n),g=yA(s),x=r.createProgram();let m,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Do).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Do).join(`
`),h.length>0&&(h+=`
`)):(m=[s0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Do).join(`
`),h=[s0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==lr?"#define TONE_MAPPING":"",n.toneMapping!==lr?Ue.tonemapping_pars_fragment:"",n.toneMapping!==lr?vA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,gA("linearToOutputTexel",n.outputColorSpace),_A(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Do).join(`
`)),o=Dd(o),o=n0(o,n),o=i0(o,n),a=Dd(a),a=n0(a,n),a=i0(a,n),o=r0(o),a=r0(a),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===Mm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Mm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const _=v+m+o,S=v+h+a,C=e0(r,r.VERTEX_SHADER,_),A=e0(r,r.FRAGMENT_SHADER,S);r.attachShader(x,C),r.attachShader(x,A),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function T(M){if(t.debug.checkShaderErrors){const D=r.getProgramInfoLog(x).trim(),U=r.getShaderInfoLog(C).trim(),O=r.getShaderInfoLog(A).trim();let X=!0,z=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(X=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,C,A);else{const q=t0(r,C,"vertex"),L=t0(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+D+`
`+q+`
`+L)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(U===""||O==="")&&(z=!1);z&&(M.diagnostics={runnable:X,programLog:D,vertexShader:{log:U,prefix:m},fragmentShader:{log:O,prefix:h}})}r.deleteShader(C),r.deleteShader(A),b=new Ll(r,x),H=SA(r,x)}let b;this.getUniforms=function(){return b===void 0&&T(this),b};let H;this.getAttributes=function(){return H===void 0&&T(this),H};let y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,dA)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=hA++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=A,this}let DA=0;class NA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new UA(e),n.set(e,i)),i}}class UA{constructor(e){this.id=DA++,this.code=e,this.usedTimes=0}}function kA(t,e,n,i,r,s,o){const a=new c_,l=new NA,c=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,p=r.vertexTextures;let g=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return c.add(y),y===0?"uv":`uv${y}`}function h(y,M,D,U,O){const X=U.fog,z=O.geometry,q=y.isMeshStandardMaterial?U.environment:null,L=(y.isMeshStandardMaterial?n:e).get(y.envMap||q),$=L&&L.mapping===Pc?L.image.height:null,K=x[y.type];y.precision!==null&&(g=r.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const ne=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,we=ne!==void 0?ne.length:0;let ze=0;z.morphAttributes.position!==void 0&&(ze=1),z.morphAttributes.normal!==void 0&&(ze=2),z.morphAttributes.color!==void 0&&(ze=3);let Y,ie,de,ce;if(K){const ln=li[K];Y=ln.vertexShader,ie=ln.fragmentShader}else Y=y.vertexShader,ie=y.fragmentShader,l.update(y),de=l.getVertexShaderID(y),ce=l.getFragmentShaderID(y);const De=t.getRenderTarget(),be=O.isInstancedMesh===!0,Ve=O.isBatchedMesh===!0,it=!!y.map,We=!!y.matcap,I=!!L,vn=!!y.aoMap,Be=!!y.lightMap,$e=!!y.bumpMap,Re=!!y.normalMap,ct=!!y.displacementMap,Ie=!!y.emissiveMap,R=!!y.metalnessMap,E=!!y.roughnessMap,G=y.anisotropy>0,Q=y.clearcoat>0,ee=y.dispersion>0,Z=y.iridescence>0,Se=y.sheen>0,le=y.transmission>0,ge=G&&!!y.anisotropyMap,Ke=Q&&!!y.clearcoatMap,se=Q&&!!y.clearcoatNormalMap,ve=Q&&!!y.clearcoatRoughnessMap,Pe=Z&&!!y.iridescenceMap,Le=Z&&!!y.iridescenceThicknessMap,_e=Se&&!!y.sheenColorMap,He=Se&&!!y.sheenRoughnessMap,Ne=!!y.specularMap,at=!!y.specularColorMap,N=!!y.specularIntensityMap,he=le&&!!y.transmissionMap,j=le&&!!y.thicknessMap,J=!!y.gradientMap,ue=!!y.alphaMap,pe=y.alphaTest>0,Xe=!!y.alphaHash,Rt=!!y.extensions;let an=lr;y.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(an=t.toneMapping);const Ze={shaderID:K,shaderType:y.type,shaderName:y.name,vertexShader:Y,fragmentShader:ie,defines:y.defines,customVertexShaderID:de,customFragmentShaderID:ce,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Ve,batchingColor:Ve&&O._colorsTexture!==null,instancing:be,instancingColor:be&&O.instanceColor!==null,instancingMorph:be&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:De===null?t.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:gr,alphaToCoverage:!!y.alphaToCoverage,map:it,matcap:We,envMap:I,envMapMode:I&&L.mapping,envMapCubeUVHeight:$,aoMap:vn,lightMap:Be,bumpMap:$e,normalMap:Re,displacementMap:p&&ct,emissiveMap:Ie,normalMapObjectSpace:Re&&y.normalMapType===VM,normalMapTangentSpace:Re&&y.normalMapType===i_,metalnessMap:R,roughnessMap:E,anisotropy:G,anisotropyMap:ge,clearcoat:Q,clearcoatMap:Ke,clearcoatNormalMap:se,clearcoatRoughnessMap:ve,dispersion:ee,iridescence:Z,iridescenceMap:Pe,iridescenceThicknessMap:Le,sheen:Se,sheenColorMap:_e,sheenRoughnessMap:He,specularMap:Ne,specularColorMap:at,specularIntensityMap:N,transmission:le,transmissionMap:he,thicknessMap:j,gradientMap:J,opaque:y.transparent===!1&&y.blending===Ls&&y.alphaToCoverage===!1,alphaMap:ue,alphaTest:pe,alphaHash:Xe,combine:y.combine,mapUv:it&&m(y.map.channel),aoMapUv:vn&&m(y.aoMap.channel),lightMapUv:Be&&m(y.lightMap.channel),bumpMapUv:$e&&m(y.bumpMap.channel),normalMapUv:Re&&m(y.normalMap.channel),displacementMapUv:ct&&m(y.displacementMap.channel),emissiveMapUv:Ie&&m(y.emissiveMap.channel),metalnessMapUv:R&&m(y.metalnessMap.channel),roughnessMapUv:E&&m(y.roughnessMap.channel),anisotropyMapUv:ge&&m(y.anisotropyMap.channel),clearcoatMapUv:Ke&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:He&&m(y.sheenRoughnessMap.channel),specularMapUv:Ne&&m(y.specularMap.channel),specularColorMapUv:at&&m(y.specularColorMap.channel),specularIntensityMapUv:N&&m(y.specularIntensityMap.channel),transmissionMapUv:he&&m(y.transmissionMap.channel),thicknessMapUv:j&&m(y.thicknessMap.channel),alphaMapUv:ue&&m(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Re||G),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!z.attributes.uv&&(it||ue),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:f,skinning:O.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:ze,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&D.length>0,shadowMapType:t.shadowMap.type,toneMapping:an,decodeVideoTexture:it&&y.map.isVideoTexture===!0&&et.getTransfer(y.map.colorSpace)===ht,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ui,flipSided:y.side===rn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Rt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Rt&&y.extensions.multiDraw===!0||Ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ze.vertexUv1s=c.has(1),Ze.vertexUv2s=c.has(2),Ze.vertexUv3s=c.has(3),c.clear(),Ze}function v(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)M.push(D),M.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(_(M,y),S(M,y),M.push(t.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function _(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function S(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),y.push(a.mask)}function C(y){const M=x[y.type];let D;if(M){const U=li[M];D=x1.clone(U.uniforms)}else D=y.uniforms;return D}function A(y,M){let D;for(let U=0,O=u.length;U<O;U++){const X=u[U];if(X.cacheKey===M){D=X,++D.usedTimes;break}}return D===void 0&&(D=new IA(t,M,y,s),u.push(D)),D}function T(y){if(--y.usedTimes===0){const M=u.indexOf(y);u[M]=u[u.length-1],u.pop(),y.destroy()}}function b(y){l.remove(y)}function H(){l.dispose()}return{getParameters:h,getProgramCacheKey:v,getUniforms:C,acquireProgram:A,releaseProgram:T,releaseShaderCache:b,programs:u,dispose:H}}function zA(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function FA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function o0(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function a0(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,f,p,g,x,m){let h=t[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},t[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=x,h.group=m),e++,h}function a(d,f,p,g,x,m){const h=o(d,f,p,g,x,m);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):n.push(h)}function l(d,f,p,g,x,m){const h=o(d,f,p,g,x,m);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):n.unshift(h)}function c(d,f){n.length>1&&n.sort(d||FA),i.length>1&&i.sort(f||o0),r.length>1&&r.sort(f||o0)}function u(){for(let d=e,f=t.length;d<f;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function OA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new a0,t.set(i,[o])):r>=s.length?(o=new a0,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function BA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new Ge};break;case"SpotLight":n={position:new B,direction:new B,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":n={color:new Ge,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function HA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let GA=0;function VA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function WA(t){const e=new BA,n=HA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new st,o=new st;function a(c){let u=0,d=0,f=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let p=0,g=0,x=0,m=0,h=0,v=0,_=0,S=0,C=0,A=0,T=0;c.sort(VA);for(let H=0,y=c.length;H<y;H++){const M=c[H],D=M.color,U=M.intensity,O=M.distance,X=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)u+=D.r*U,d+=D.g*U,f+=D.b*U;else if(M.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(M.sh.coefficients[z],U);T++}else if(M.isDirectionalLight){const z=e.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const q=M.shadow,L=n.get(M);L.shadowIntensity=q.intensity,L.shadowBias=q.bias,L.shadowNormalBias=q.normalBias,L.shadowRadius=q.radius,L.shadowMapSize=q.mapSize,i.directionalShadow[p]=L,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=M.shadow.matrix,v++}i.directional[p]=z,p++}else if(M.isSpotLight){const z=e.get(M);z.position.setFromMatrixPosition(M.matrixWorld),z.color.copy(D).multiplyScalar(U),z.distance=O,z.coneCos=Math.cos(M.angle),z.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),z.decay=M.decay,i.spot[x]=z;const q=M.shadow;if(M.map&&(i.spotLightMap[C]=M.map,C++,q.updateMatrices(M),M.castShadow&&A++),i.spotLightMatrix[x]=q.matrix,M.castShadow){const L=n.get(M);L.shadowIntensity=q.intensity,L.shadowBias=q.bias,L.shadowNormalBias=q.normalBias,L.shadowRadius=q.radius,L.shadowMapSize=q.mapSize,i.spotShadow[x]=L,i.spotShadowMap[x]=X,S++}x++}else if(M.isRectAreaLight){const z=e.get(M);z.color.copy(D).multiplyScalar(U),z.halfWidth.set(M.width*.5,0,0),z.halfHeight.set(0,M.height*.5,0),i.rectArea[m]=z,m++}else if(M.isPointLight){const z=e.get(M);if(z.color.copy(M.color).multiplyScalar(M.intensity),z.distance=M.distance,z.decay=M.decay,M.castShadow){const q=M.shadow,L=n.get(M);L.shadowIntensity=q.intensity,L.shadowBias=q.bias,L.shadowNormalBias=q.normalBias,L.shadowRadius=q.radius,L.shadowMapSize=q.mapSize,L.shadowCameraNear=q.camera.near,L.shadowCameraFar=q.camera.far,i.pointShadow[g]=L,i.pointShadowMap[g]=X,i.pointShadowMatrix[g]=M.shadow.matrix,_++}i.point[g]=z,g++}else if(M.isHemisphereLight){const z=e.get(M);z.skyColor.copy(M.color).multiplyScalar(U),z.groundColor.copy(M.groundColor).multiplyScalar(U),i.hemi[h]=z,h++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const b=i.hash;(b.directionalLength!==p||b.pointLength!==g||b.spotLength!==x||b.rectAreaLength!==m||b.hemiLength!==h||b.numDirectionalShadows!==v||b.numPointShadows!==_||b.numSpotShadows!==S||b.numSpotMaps!==C||b.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,b.directionalLength=p,b.pointLength=g,b.spotLength=x,b.rectAreaLength=m,b.hemiLength=h,b.numDirectionalShadows=v,b.numPointShadows=_,b.numSpotShadows=S,b.numSpotMaps=C,b.numLightProbes=T,i.version=GA++)}function l(c,u){let d=0,f=0,p=0,g=0,x=0;const m=u.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){const _=c[h];if(_.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(_.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(_.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function l0(t){const e=new WA(t),n=[],i=[];function r(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function XA(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new l0(t),e.set(r,[a])):s>=o.length?(a=new l0(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class jA extends no{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=HM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qA extends no{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const YA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$A=`uniform sampler2D shadow_pass;
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
}`;function KA(t,e,n){let i=new zh;const r=new Ye,s=new Ye,o=new rt,a=new jA({depthPacking:GM}),l=new qA,c={},u=n.maxTextureSize,d={[fr]:rn,[rn]:fr,[ui]:ui},f=new dr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:YA,fragmentShader:$A}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Pn;g.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Fe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vv;let h=this.type;this.render=function(A,T,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const H=t.getRenderTarget(),y=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),D=t.state;D.setBlending(ar),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=h!==Mi&&this.type===Mi,O=h===Mi&&this.type!==Mi;for(let X=0,z=A.length;X<z;X++){const q=A[X],L=q.shadow;if(L===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);const $=L.getFrameExtents();if(r.multiply($),s.copy(L.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/$.x),r.x=s.x*$.x,L.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/$.y),r.y=s.y*$.y,L.mapSize.y=s.y)),L.map===null||U===!0||O===!0){const ne=this.type!==Mi?{minFilter:hn,magFilter:hn}:{};L.map!==null&&L.map.dispose(),L.map=new Wr(r.x,r.y,ne),L.map.texture.name=q.name+".shadowMap",L.camera.updateProjectionMatrix()}t.setRenderTarget(L.map),t.clear();const K=L.getViewportCount();for(let ne=0;ne<K;ne++){const we=L.getViewport(ne);o.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),D.viewport(o),L.updateMatrices(q,ne),i=L.getFrustum(),S(T,b,L.camera,q,this.type)}L.isPointLightShadow!==!0&&this.type===Mi&&v(L,b),L.needsUpdate=!1}h=this.type,m.needsUpdate=!1,t.setRenderTarget(H,y,M)};function v(A,T){const b=e.update(x);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Wr(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(T,null,b,f,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(T,null,b,p,x,null)}function _(A,T,b,H){let y=null;const M=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(M!==void 0)y=M;else if(y=b.isPointLight===!0?l:a,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const D=y.uuid,U=T.uuid;let O=c[D];O===void 0&&(O={},c[D]=O);let X=O[U];X===void 0&&(X=y.clone(),O[U]=X,T.addEventListener("dispose",C)),y=X}if(y.visible=T.visible,y.wireframe=T.wireframe,H===Mi?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,b.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=t.properties.get(y);D.light=b}return y}function S(A,T,b,H,y){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Mi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const U=e.update(A),O=A.material;if(Array.isArray(O)){const X=U.groups;for(let z=0,q=X.length;z<q;z++){const L=X[z],$=O[L.materialIndex];if($&&$.visible){const K=_(A,$,H,y);A.onBeforeShadow(t,A,T,b,U,K,L),t.renderBufferDirect(b,null,U,K,A,L),A.onAfterShadow(t,A,T,b,U,K,L)}}}else if(O.visible){const X=_(A,O,H,y);A.onBeforeShadow(t,A,T,b,U,X,null),t.renderBufferDirect(b,null,U,X,A,null),A.onAfterShadow(t,A,T,b,U,X,null)}}const D=A.children;for(let U=0,O=D.length;U<O;U++)S(D[U],T,b,H,y)}function C(A){A.target.removeEventListener("dispose",C);for(const b in c){const H=c[b],y=A.target.uuid;y in H&&(H[y].dispose(),delete H[y])}}}const ZA={[Kf]:Zf,[Qf]:td,[Jf]:nd,[Vs]:ed,[Zf]:Kf,[td]:Qf,[nd]:Jf,[ed]:Vs};function QA(t){function e(){let N=!1;const he=new rt;let j=null;const J=new rt(0,0,0,0);return{setMask:function(ue){j!==ue&&!N&&(t.colorMask(ue,ue,ue,ue),j=ue)},setLocked:function(ue){N=ue},setClear:function(ue,pe,Xe,Rt,an){an===!0&&(ue*=Rt,pe*=Rt,Xe*=Rt),he.set(ue,pe,Xe,Rt),J.equals(he)===!1&&(t.clearColor(ue,pe,Xe,Rt),J.copy(he))},reset:function(){N=!1,j=null,J.set(-1,0,0,0)}}}function n(){let N=!1,he=!1,j=null,J=null,ue=null;return{setReversed:function(pe){he=pe},setTest:function(pe){pe?de(t.DEPTH_TEST):ce(t.DEPTH_TEST)},setMask:function(pe){j!==pe&&!N&&(t.depthMask(pe),j=pe)},setFunc:function(pe){if(he&&(pe=ZA[pe]),J!==pe){switch(pe){case Kf:t.depthFunc(t.NEVER);break;case Zf:t.depthFunc(t.ALWAYS);break;case Qf:t.depthFunc(t.LESS);break;case Vs:t.depthFunc(t.LEQUAL);break;case Jf:t.depthFunc(t.EQUAL);break;case ed:t.depthFunc(t.GEQUAL);break;case td:t.depthFunc(t.GREATER);break;case nd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}J=pe}},setLocked:function(pe){N=pe},setClear:function(pe){ue!==pe&&(t.clearDepth(pe),ue=pe)},reset:function(){N=!1,j=null,J=null,ue=null}}}function i(){let N=!1,he=null,j=null,J=null,ue=null,pe=null,Xe=null,Rt=null,an=null;return{setTest:function(Ze){N||(Ze?de(t.STENCIL_TEST):ce(t.STENCIL_TEST))},setMask:function(Ze){he!==Ze&&!N&&(t.stencilMask(Ze),he=Ze)},setFunc:function(Ze,ln,gi){(j!==Ze||J!==ln||ue!==gi)&&(t.stencilFunc(Ze,ln,gi),j=Ze,J=ln,ue=gi)},setOp:function(Ze,ln,gi){(pe!==Ze||Xe!==ln||Rt!==gi)&&(t.stencilOp(Ze,ln,gi),pe=Ze,Xe=ln,Rt=gi)},setLocked:function(Ze){N=Ze},setClear:function(Ze){an!==Ze&&(t.clearStencil(Ze),an=Ze)},reset:function(){N=!1,he=null,j=null,J=null,ue=null,pe=null,Xe=null,Rt=null,an=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},u={},d=new WeakMap,f=[],p=null,g=!1,x=null,m=null,h=null,v=null,_=null,S=null,C=null,A=new Ge(0,0,0),T=0,b=!1,H=null,y=null,M=null,D=null,U=null;const O=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,z=0;const q=t.getParameter(t.VERSION);q.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=z>=1):q.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=z>=2);let L=null,$={};const K=t.getParameter(t.SCISSOR_BOX),ne=t.getParameter(t.VIEWPORT),we=new rt().fromArray(K),ze=new rt().fromArray(ne);function Y(N,he,j,J){const ue=new Uint8Array(4),pe=t.createTexture();t.bindTexture(N,pe),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Xe=0;Xe<j;Xe++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(he,0,t.RGBA,1,1,J,0,t.RGBA,t.UNSIGNED_BYTE,ue):t.texImage2D(he+Xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ue);return pe}const ie={};ie[t.TEXTURE_2D]=Y(t.TEXTURE_2D,t.TEXTURE_2D,1),ie[t.TEXTURE_CUBE_MAP]=Y(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[t.TEXTURE_2D_ARRAY]=Y(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ie[t.TEXTURE_3D]=Y(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),de(t.DEPTH_TEST),s.setFunc(Vs),Be(!1),$e(vm),de(t.CULL_FACE),I(ar);function de(N){c[N]!==!0&&(t.enable(N),c[N]=!0)}function ce(N){c[N]!==!1&&(t.disable(N),c[N]=!1)}function De(N,he){return u[N]!==he?(t.bindFramebuffer(N,he),u[N]=he,N===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=he),N===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=he),!0):!1}function be(N,he){let j=f,J=!1;if(N){j=d.get(he),j===void 0&&(j=[],d.set(he,j));const ue=N.textures;if(j.length!==ue.length||j[0]!==t.COLOR_ATTACHMENT0){for(let pe=0,Xe=ue.length;pe<Xe;pe++)j[pe]=t.COLOR_ATTACHMENT0+pe;j.length=ue.length,J=!0}}else j[0]!==t.BACK&&(j[0]=t.BACK,J=!0);J&&t.drawBuffers(j)}function Ve(N){return p!==N?(t.useProgram(N),p=N,!0):!1}const it={[Rr]:t.FUNC_ADD,[mM]:t.FUNC_SUBTRACT,[gM]:t.FUNC_REVERSE_SUBTRACT};it[vM]=t.MIN,it[_M]=t.MAX;const We={[xM]:t.ZERO,[yM]:t.ONE,[SM]:t.SRC_COLOR,[Yf]:t.SRC_ALPHA,[bM]:t.SRC_ALPHA_SATURATE,[TM]:t.DST_COLOR,[EM]:t.DST_ALPHA,[MM]:t.ONE_MINUS_SRC_COLOR,[$f]:t.ONE_MINUS_SRC_ALPHA,[AM]:t.ONE_MINUS_DST_COLOR,[wM]:t.ONE_MINUS_DST_ALPHA,[CM]:t.CONSTANT_COLOR,[RM]:t.ONE_MINUS_CONSTANT_COLOR,[PM]:t.CONSTANT_ALPHA,[LM]:t.ONE_MINUS_CONSTANT_ALPHA};function I(N,he,j,J,ue,pe,Xe,Rt,an,Ze){if(N===ar){g===!0&&(ce(t.BLEND),g=!1);return}if(g===!1&&(de(t.BLEND),g=!0),N!==pM){if(N!==x||Ze!==b){if((m!==Rr||_!==Rr)&&(t.blendEquation(t.FUNC_ADD),m=Rr,_=Rr),Ze)switch(N){case Ls:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ic:t.blendFunc(t.ONE,t.ONE);break;case _m:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case xm:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ls:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ic:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case _m:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case xm:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}h=null,v=null,S=null,C=null,A.set(0,0,0),T=0,x=N,b=Ze}return}ue=ue||he,pe=pe||j,Xe=Xe||J,(he!==m||ue!==_)&&(t.blendEquationSeparate(it[he],it[ue]),m=he,_=ue),(j!==h||J!==v||pe!==S||Xe!==C)&&(t.blendFuncSeparate(We[j],We[J],We[pe],We[Xe]),h=j,v=J,S=pe,C=Xe),(Rt.equals(A)===!1||an!==T)&&(t.blendColor(Rt.r,Rt.g,Rt.b,an),A.copy(Rt),T=an),x=N,b=!1}function vn(N,he){N.side===ui?ce(t.CULL_FACE):de(t.CULL_FACE);let j=N.side===rn;he&&(j=!j),Be(j),N.blending===Ls&&N.transparent===!1?I(ar):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),s.setFunc(N.depthFunc),s.setTest(N.depthTest),s.setMask(N.depthWrite),r.setMask(N.colorWrite);const J=N.stencilWrite;o.setTest(J),J&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ct(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(t.SAMPLE_ALPHA_TO_COVERAGE):ce(t.SAMPLE_ALPHA_TO_COVERAGE)}function Be(N){H!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),H=N)}function $e(N){N!==dM?(de(t.CULL_FACE),N!==y&&(N===vm?t.cullFace(t.BACK):N===hM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ce(t.CULL_FACE),y=N}function Re(N){N!==M&&(X&&t.lineWidth(N),M=N)}function ct(N,he,j){N?(de(t.POLYGON_OFFSET_FILL),(D!==he||U!==j)&&(t.polygonOffset(he,j),D=he,U=j)):ce(t.POLYGON_OFFSET_FILL)}function Ie(N){N?de(t.SCISSOR_TEST):ce(t.SCISSOR_TEST)}function R(N){N===void 0&&(N=t.TEXTURE0+O-1),L!==N&&(t.activeTexture(N),L=N)}function E(N,he,j){j===void 0&&(L===null?j=t.TEXTURE0+O-1:j=L);let J=$[j];J===void 0&&(J={type:void 0,texture:void 0},$[j]=J),(J.type!==N||J.texture!==he)&&(L!==j&&(t.activeTexture(j),L=j),t.bindTexture(N,he||ie[N]),J.type=N,J.texture=he)}function G(){const N=$[L];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Q(){try{t.compressedTexImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{t.compressedTexImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{t.texSubImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(){try{t.texSubImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ke(){try{t.texStorage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{t.texStorage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{t.texImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{t.texImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Le(N){we.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),we.copy(N))}function _e(N){ze.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),ze.copy(N))}function He(N,he){let j=l.get(he);j===void 0&&(j=new WeakMap,l.set(he,j));let J=j.get(N);J===void 0&&(J=t.getUniformBlockIndex(he,N.name),j.set(N,J))}function Ne(N,he){const J=l.get(he).get(N);a.get(he)!==J&&(t.uniformBlockBinding(he,J,N.__bindingPointIndex),a.set(he,J))}function at(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},L=null,$={},u={},d=new WeakMap,f=[],p=null,g=!1,x=null,m=null,h=null,v=null,_=null,S=null,C=null,A=new Ge(0,0,0),T=0,b=!1,H=null,y=null,M=null,D=null,U=null,we.set(0,0,t.canvas.width,t.canvas.height),ze.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:de,disable:ce,bindFramebuffer:De,drawBuffers:be,useProgram:Ve,setBlending:I,setMaterial:vn,setFlipSided:Be,setCullFace:$e,setLineWidth:Re,setPolygonOffset:ct,setScissorTest:Ie,activeTexture:R,bindTexture:E,unbindTexture:G,compressedTexImage2D:Q,compressedTexImage3D:ee,texImage2D:ve,texImage3D:Pe,updateUBOMapping:He,uniformBlockBinding:Ne,texStorage2D:Ke,texStorage3D:se,texSubImage2D:Z,texSubImage3D:Se,compressedTexSubImage2D:le,compressedTexSubImage3D:ge,scissor:Le,viewport:_e,reset:at}}function c0(t,e,n,i){const r=JA(i);switch(n){case Zv:return t*e;case Jv:return t*e;case e_:return t*e*2;case Ih:return t*e/r.components*r.byteLength;case Dh:return t*e/r.components*r.byteLength;case t_:return t*e*2/r.components*r.byteLength;case Nh:return t*e*2/r.components*r.byteLength;case Qv:return t*e*3/r.components*r.byteLength;case ei:return t*e*4/r.components*r.byteLength;case Uh:return t*e*4/r.components*r.byteLength;case Tl:case Al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case bl:case Cl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ad:case cd:return Math.max(t,16)*Math.max(e,8)/4;case od:case ld:return Math.max(t,8)*Math.max(e,8)/2;case ud:case fd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case dd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case pd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case md:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case gd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case vd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case _d:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case xd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case yd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Sd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Md:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Ed:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case wd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Td:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Ad:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Rl:case bd:case Cd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case n_:case Rd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Pd:case Ld:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function JA(t){switch(t){case Di:case Yv:return{byteLength:1,components:1};case ua:case $v:case ga:return{byteLength:2,components:1};case Ph:case Lh:return{byteLength:2,components:4};case Vr:case Rh:case fi:return{byteLength:4,components:1};case Kv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function e2(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,E){return p?new OffscreenCanvas(R,E):lc("canvas")}function x(R,E,G){let Q=1;const ee=Ie(R);if((ee.width>G||ee.height>G)&&(Q=G/Math.max(ee.width,ee.height)),Q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Z=Math.floor(Q*ee.width),Se=Math.floor(Q*ee.height);d===void 0&&(d=g(Z,Se));const le=E?g(Z,Se):d;return le.width=Z,le.height=Se,le.getContext("2d").drawImage(R,0,0,Z,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Z+"x"+Se+")."),le}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function m(R){return R.generateMipmaps&&R.minFilter!==hn&&R.minFilter!==Zn}function h(R){t.generateMipmap(R)}function v(R,E,G,Q,ee=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Z=E;if(E===t.RED&&(G===t.FLOAT&&(Z=t.R32F),G===t.HALF_FLOAT&&(Z=t.R16F),G===t.UNSIGNED_BYTE&&(Z=t.R8)),E===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.R8UI),G===t.UNSIGNED_SHORT&&(Z=t.R16UI),G===t.UNSIGNED_INT&&(Z=t.R32UI),G===t.BYTE&&(Z=t.R8I),G===t.SHORT&&(Z=t.R16I),G===t.INT&&(Z=t.R32I)),E===t.RG&&(G===t.FLOAT&&(Z=t.RG32F),G===t.HALF_FLOAT&&(Z=t.RG16F),G===t.UNSIGNED_BYTE&&(Z=t.RG8)),E===t.RG_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.RG8UI),G===t.UNSIGNED_SHORT&&(Z=t.RG16UI),G===t.UNSIGNED_INT&&(Z=t.RG32UI),G===t.BYTE&&(Z=t.RG8I),G===t.SHORT&&(Z=t.RG16I),G===t.INT&&(Z=t.RG32I)),E===t.RGB_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.RGB8UI),G===t.UNSIGNED_SHORT&&(Z=t.RGB16UI),G===t.UNSIGNED_INT&&(Z=t.RGB32UI),G===t.BYTE&&(Z=t.RGB8I),G===t.SHORT&&(Z=t.RGB16I),G===t.INT&&(Z=t.RGB32I)),E===t.RGBA_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.RGBA8UI),G===t.UNSIGNED_SHORT&&(Z=t.RGBA16UI),G===t.UNSIGNED_INT&&(Z=t.RGBA32UI),G===t.BYTE&&(Z=t.RGBA8I),G===t.SHORT&&(Z=t.RGBA16I),G===t.INT&&(Z=t.RGBA32I)),E===t.RGB&&G===t.UNSIGNED_INT_5_9_9_9_REV&&(Z=t.RGB9_E5),E===t.RGBA){const Se=ee?rc:et.getTransfer(Q);G===t.FLOAT&&(Z=t.RGBA32F),G===t.HALF_FLOAT&&(Z=t.RGBA16F),G===t.UNSIGNED_BYTE&&(Z=Se===ht?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT_4_4_4_4&&(Z=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(Z=t.RGB5_A1)}return(Z===t.R16F||Z===t.R32F||Z===t.RG16F||Z===t.RG32F||Z===t.RGBA16F||Z===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function _(R,E){let G;return R?E===null||E===Vr||E===js?G=t.DEPTH24_STENCIL8:E===fi?G=t.DEPTH32F_STENCIL8:E===ua&&(G=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Vr||E===js?G=t.DEPTH_COMPONENT24:E===fi?G=t.DEPTH_COMPONENT32F:E===ua&&(G=t.DEPTH_COMPONENT16),G}function S(R,E){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==hn&&R.minFilter!==Zn?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function C(R){const E=R.target;E.removeEventListener("dispose",C),T(E),E.isVideoTexture&&u.delete(E)}function A(R){const E=R.target;E.removeEventListener("dispose",A),H(E)}function T(R){const E=i.get(R);if(E.__webglInit===void 0)return;const G=R.source,Q=f.get(G);if(Q){const ee=Q[E.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(R),Object.keys(Q).length===0&&f.delete(G)}i.remove(R)}function b(R){const E=i.get(R);t.deleteTexture(E.__webglTexture);const G=R.source,Q=f.get(G);delete Q[E.__cacheKey],o.memory.textures--}function H(R){const E=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let ee=0;ee<E.__webglFramebuffer[Q].length;ee++)t.deleteFramebuffer(E.__webglFramebuffer[Q][ee]);else t.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)t.deleteFramebuffer(E.__webglFramebuffer[Q]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const G=R.textures;for(let Q=0,ee=G.length;Q<ee;Q++){const Z=i.get(G[Q]);Z.__webglTexture&&(t.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(G[Q])}i.remove(R)}let y=0;function M(){y=0}function D(){const R=y;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),y+=1,R}function U(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function O(R,E){const G=i.get(R);if(R.isVideoTexture&&Re(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ze(G,R,E);return}}n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+E)}function X(R,E){const G=i.get(R);if(R.version>0&&G.__version!==R.version){ze(G,R,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+E)}function z(R,E){const G=i.get(R);if(R.version>0&&G.__version!==R.version){ze(G,R,E);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+E)}function q(R,E){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Y(G,R,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+E)}const L={[ca]:t.REPEAT,[Nr]:t.CLAMP_TO_EDGE,[sd]:t.MIRRORED_REPEAT},$={[hn]:t.NEAREST,[BM]:t.NEAREST_MIPMAP_NEAREST,[Ba]:t.NEAREST_MIPMAP_LINEAR,[Zn]:t.LINEAR,[hu]:t.LINEAR_MIPMAP_NEAREST,[Ur]:t.LINEAR_MIPMAP_LINEAR},K={[WM]:t.NEVER,[KM]:t.ALWAYS,[XM]:t.LESS,[r_]:t.LEQUAL,[jM]:t.EQUAL,[$M]:t.GEQUAL,[qM]:t.GREATER,[YM]:t.NOTEQUAL};function ne(R,E){if(E.type===fi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Zn||E.magFilter===hu||E.magFilter===Ba||E.magFilter===Ur||E.minFilter===Zn||E.minFilter===hu||E.minFilter===Ba||E.minFilter===Ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,L[E.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,L[E.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,L[E.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,$[E.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,$[E.minFilter]),E.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,K[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===hn||E.minFilter!==Ba&&E.minFilter!==Ur||E.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function we(R,E){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",C));const Q=E.source;let ee=f.get(Q);ee===void 0&&(ee={},f.set(Q,ee));const Z=U(E);if(Z!==R.__cacheKey){ee[Z]===void 0&&(ee[Z]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,G=!0),ee[Z].usedTimes++;const Se=ee[R.__cacheKey];Se!==void 0&&(ee[R.__cacheKey].usedTimes--,Se.usedTimes===0&&b(E)),R.__cacheKey=Z,R.__webglTexture=ee[Z].texture}return G}function ze(R,E,G){let Q=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=t.TEXTURE_3D);const ee=we(R,E),Z=E.source;n.bindTexture(Q,R.__webglTexture,t.TEXTURE0+G);const Se=i.get(Z);if(Z.version!==Se.__version||ee===!0){n.activeTexture(t.TEXTURE0+G);const le=et.getPrimaries(et.workingColorSpace),ge=E.colorSpace===Yi?null:et.getPrimaries(E.colorSpace),Ke=E.colorSpace===Yi||le===ge?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let se=x(E.image,!1,r.maxTextureSize);se=ct(E,se);const ve=s.convert(E.format,E.colorSpace),Pe=s.convert(E.type);let Le=v(E.internalFormat,ve,Pe,E.colorSpace,E.isVideoTexture);ne(Q,E);let _e;const He=E.mipmaps,Ne=E.isVideoTexture!==!0,at=Se.__version===void 0||ee===!0,N=Z.dataReady,he=S(E,se);if(E.isDepthTexture)Le=_(E.format===qs,E.type),at&&(Ne?n.texStorage2D(t.TEXTURE_2D,1,Le,se.width,se.height):n.texImage2D(t.TEXTURE_2D,0,Le,se.width,se.height,0,ve,Pe,null));else if(E.isDataTexture)if(He.length>0){Ne&&at&&n.texStorage2D(t.TEXTURE_2D,he,Le,He[0].width,He[0].height);for(let j=0,J=He.length;j<J;j++)_e=He[j],Ne?N&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,_e.width,_e.height,ve,Pe,_e.data):n.texImage2D(t.TEXTURE_2D,j,Le,_e.width,_e.height,0,ve,Pe,_e.data);E.generateMipmaps=!1}else Ne?(at&&n.texStorage2D(t.TEXTURE_2D,he,Le,se.width,se.height),N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,se.width,se.height,ve,Pe,se.data)):n.texImage2D(t.TEXTURE_2D,0,Le,se.width,se.height,0,ve,Pe,se.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ne&&at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,Le,He[0].width,He[0].height,se.depth);for(let j=0,J=He.length;j<J;j++)if(_e=He[j],E.format!==ei)if(ve!==null)if(Ne){if(N)if(E.layerUpdates.size>0){const ue=c0(_e.width,_e.height,E.format,E.type);for(const pe of E.layerUpdates){const Xe=_e.data.subarray(pe*ue/_e.data.BYTES_PER_ELEMENT,(pe+1)*ue/_e.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,pe,_e.width,_e.height,1,ve,Xe,0,0)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,0,_e.width,_e.height,se.depth,ve,_e.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,j,Le,_e.width,_e.height,se.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?N&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,0,_e.width,_e.height,se.depth,ve,Pe,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,j,Le,_e.width,_e.height,se.depth,0,ve,Pe,_e.data)}else{Ne&&at&&n.texStorage2D(t.TEXTURE_2D,he,Le,He[0].width,He[0].height);for(let j=0,J=He.length;j<J;j++)_e=He[j],E.format!==ei?ve!==null?Ne?N&&n.compressedTexSubImage2D(t.TEXTURE_2D,j,0,0,_e.width,_e.height,ve,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,j,Le,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?N&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,_e.width,_e.height,ve,Pe,_e.data):n.texImage2D(t.TEXTURE_2D,j,Le,_e.width,_e.height,0,ve,Pe,_e.data)}else if(E.isDataArrayTexture)if(Ne){if(at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,Le,se.width,se.height,se.depth),N)if(E.layerUpdates.size>0){const j=c0(se.width,se.height,E.format,E.type);for(const J of E.layerUpdates){const ue=se.data.subarray(J*j/se.data.BYTES_PER_ELEMENT,(J+1)*j/se.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,J,se.width,se.height,1,ve,Pe,ue)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ve,Pe,se.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Le,se.width,se.height,se.depth,0,ve,Pe,se.data);else if(E.isData3DTexture)Ne?(at&&n.texStorage3D(t.TEXTURE_3D,he,Le,se.width,se.height,se.depth),N&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ve,Pe,se.data)):n.texImage3D(t.TEXTURE_3D,0,Le,se.width,se.height,se.depth,0,ve,Pe,se.data);else if(E.isFramebufferTexture){if(at)if(Ne)n.texStorage2D(t.TEXTURE_2D,he,Le,se.width,se.height);else{let j=se.width,J=se.height;for(let ue=0;ue<he;ue++)n.texImage2D(t.TEXTURE_2D,ue,Le,j,J,0,ve,Pe,null),j>>=1,J>>=1}}else if(He.length>0){if(Ne&&at){const j=Ie(He[0]);n.texStorage2D(t.TEXTURE_2D,he,Le,j.width,j.height)}for(let j=0,J=He.length;j<J;j++)_e=He[j],Ne?N&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,ve,Pe,_e):n.texImage2D(t.TEXTURE_2D,j,Le,ve,Pe,_e);E.generateMipmaps=!1}else if(Ne){if(at){const j=Ie(se);n.texStorage2D(t.TEXTURE_2D,he,Le,j.width,j.height)}N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ve,Pe,se)}else n.texImage2D(t.TEXTURE_2D,0,Le,ve,Pe,se);m(E)&&h(Q),Se.__version=Z.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function Y(R,E,G){if(E.image.length!==6)return;const Q=we(R,E),ee=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+G);const Z=i.get(ee);if(ee.version!==Z.__version||Q===!0){n.activeTexture(t.TEXTURE0+G);const Se=et.getPrimaries(et.workingColorSpace),le=E.colorSpace===Yi?null:et.getPrimaries(E.colorSpace),ge=E.colorSpace===Yi||Se===le?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ke=E.isCompressedTexture||E.image[0].isCompressedTexture,se=E.image[0]&&E.image[0].isDataTexture,ve=[];for(let J=0;J<6;J++)!Ke&&!se?ve[J]=x(E.image[J],!0,r.maxCubemapSize):ve[J]=se?E.image[J].image:E.image[J],ve[J]=ct(E,ve[J]);const Pe=ve[0],Le=s.convert(E.format,E.colorSpace),_e=s.convert(E.type),He=v(E.internalFormat,Le,_e,E.colorSpace),Ne=E.isVideoTexture!==!0,at=Z.__version===void 0||Q===!0,N=ee.dataReady;let he=S(E,Pe);ne(t.TEXTURE_CUBE_MAP,E);let j;if(Ke){Ne&&at&&n.texStorage2D(t.TEXTURE_CUBE_MAP,he,He,Pe.width,Pe.height);for(let J=0;J<6;J++){j=ve[J].mipmaps;for(let ue=0;ue<j.length;ue++){const pe=j[ue];E.format!==ei?Le!==null?Ne?N&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,pe.width,pe.height,Le,pe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,He,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,pe.width,pe.height,Le,_e,pe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,He,pe.width,pe.height,0,Le,_e,pe.data)}}}else{if(j=E.mipmaps,Ne&&at){j.length>0&&he++;const J=Ie(ve[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,he,He,J.width,J.height)}for(let J=0;J<6;J++)if(se){Ne?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ve[J].width,ve[J].height,Le,_e,ve[J].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,He,ve[J].width,ve[J].height,0,Le,_e,ve[J].data);for(let ue=0;ue<j.length;ue++){const Xe=j[ue].image[J].image;Ne?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Xe.width,Xe.height,Le,_e,Xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,He,Xe.width,Xe.height,0,Le,_e,Xe.data)}}else{Ne?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,_e,ve[J]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,He,Le,_e,ve[J]);for(let ue=0;ue<j.length;ue++){const pe=j[ue];Ne?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Le,_e,pe.image[J]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,He,Le,_e,pe.image[J])}}}m(E)&&h(t.TEXTURE_CUBE_MAP),Z.__version=ee.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ie(R,E,G,Q,ee,Z){const Se=s.convert(G.format,G.colorSpace),le=s.convert(G.type),ge=v(G.internalFormat,Se,le,G.colorSpace);if(!i.get(E).__hasExternalTextures){const se=Math.max(1,E.width>>Z),ve=Math.max(1,E.height>>Z);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,Z,ge,se,ve,E.depth,0,Se,le,null):n.texImage2D(ee,Z,ge,se,ve,0,Se,le,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),$e(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Q,ee,i.get(G).__webglTexture,0,Be(E)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Q,ee,i.get(G).__webglTexture,Z),n.bindFramebuffer(t.FRAMEBUFFER,null)}function de(R,E,G){if(t.bindRenderbuffer(t.RENDERBUFFER,R),E.depthBuffer){const Q=E.depthTexture,ee=Q&&Q.isDepthTexture?Q.type:null,Z=_(E.stencilBuffer,ee),Se=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,le=Be(E);$e(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,le,Z,E.width,E.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,le,Z,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,Z,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,R)}else{const Q=E.textures;for(let ee=0;ee<Q.length;ee++){const Z=Q[ee],Se=s.convert(Z.format,Z.colorSpace),le=s.convert(Z.type),ge=v(Z.internalFormat,Se,le,Z.colorSpace),Ke=Be(E);G&&$e(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ke,ge,E.width,E.height):$e(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ke,ge,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ge,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ce(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),O(E.depthTexture,0);const Q=i.get(E.depthTexture).__webglTexture,ee=Be(E);if(E.depthTexture.format===Is)$e(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,Q,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,Q,0);else if(E.depthTexture.format===qs)$e(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,Q,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function De(R){const E=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){const Q=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Q){const ee=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Q.removeEventListener("dispose",ee)};Q.addEventListener("dispose",ee),E.__depthDisposeCallback=ee}E.__boundDepthTexture=Q}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ce(E.__webglFramebuffer,R)}else if(G){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]===void 0)E.__webglDepthbuffer[Q]=t.createRenderbuffer(),de(E.__webglDepthbuffer[Q],R,!1);else{const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[Q];t.bindRenderbuffer(t.RENDERBUFFER,Z),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,Z)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),de(E.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,ee)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function be(R,E,G){const Q=i.get(R);E!==void 0&&ie(Q.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&De(R)}function Ve(R){const E=R.texture,G=i.get(R),Q=i.get(E);R.addEventListener("dispose",A);const ee=R.textures,Z=R.isWebGLCubeRenderTarget===!0,Se=ee.length>1;if(Se||(Q.__webglTexture===void 0&&(Q.__webglTexture=t.createTexture()),Q.__version=E.version,o.memory.textures++),Z){G.__webglFramebuffer=[];for(let le=0;le<6;le++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[le]=[];for(let ge=0;ge<E.mipmaps.length;ge++)G.__webglFramebuffer[le][ge]=t.createFramebuffer()}else G.__webglFramebuffer[le]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let le=0;le<E.mipmaps.length;le++)G.__webglFramebuffer[le]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(Se)for(let le=0,ge=ee.length;le<ge;le++){const Ke=i.get(ee[le]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&$e(R)===!1){G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let le=0;le<ee.length;le++){const ge=ee[le];G.__webglColorRenderbuffer[le]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[le]);const Ke=s.convert(ge.format,ge.colorSpace),se=s.convert(ge.type),ve=v(ge.internalFormat,Ke,se,ge.colorSpace,R.isXRRenderTarget===!0),Pe=Be(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Pe,ve,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+le,t.RENDERBUFFER,G.__webglColorRenderbuffer[le])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),de(G.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Z){n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture),ne(t.TEXTURE_CUBE_MAP,E);for(let le=0;le<6;le++)if(E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)ie(G.__webglFramebuffer[le][ge],R,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+le,ge);else ie(G.__webglFramebuffer[le],R,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(E)&&h(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let le=0,ge=ee.length;le<ge;le++){const Ke=ee[le],se=i.get(Ke);n.bindTexture(t.TEXTURE_2D,se.__webglTexture),ne(t.TEXTURE_2D,Ke),ie(G.__webglFramebuffer,R,Ke,t.COLOR_ATTACHMENT0+le,t.TEXTURE_2D,0),m(Ke)&&h(t.TEXTURE_2D)}n.unbindTexture()}else{let le=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(le,Q.__webglTexture),ne(le,E),E.mipmaps&&E.mipmaps.length>0)for(let ge=0;ge<E.mipmaps.length;ge++)ie(G.__webglFramebuffer[ge],R,E,t.COLOR_ATTACHMENT0,le,ge);else ie(G.__webglFramebuffer,R,E,t.COLOR_ATTACHMENT0,le,0);m(E)&&h(le),n.unbindTexture()}R.depthBuffer&&De(R)}function it(R){const E=R.textures;for(let G=0,Q=E.length;G<Q;G++){const ee=E[G];if(m(ee)){const Z=R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Se=i.get(ee).__webglTexture;n.bindTexture(Z,Se),h(Z),n.unbindTexture()}}}const We=[],I=[];function vn(R){if(R.samples>0){if($e(R)===!1){const E=R.textures,G=R.width,Q=R.height;let ee=t.COLOR_BUFFER_BIT;const Z=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(R),le=E.length>1;if(le)for(let ge=0;ge<E.length;ge++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ge=0;ge<E.length;ge++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),le){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ge]);const Ke=i.get(E[ge]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ke,0)}t.blitFramebuffer(0,0,G,Q,0,0,G,Q,ee,t.NEAREST),l===!0&&(We.length=0,I.length=0,We.push(t.COLOR_ATTACHMENT0+ge),R.depthBuffer&&R.resolveDepthBuffer===!1&&(We.push(Z),I.push(Z),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,I)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,We))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),le)for(let ge=0;ge<E.length;ge++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ge]);const Ke=i.get(E[ge]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,Ke,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const E=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function Be(R){return Math.min(r.maxSamples,R.samples)}function $e(R){const E=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Re(R){const E=o.render.frame;u.get(R)!==E&&(u.set(R,E),R.update())}function ct(R,E){const G=R.colorSpace,Q=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==gr&&G!==Yi&&(et.getTransfer(G)===ht?(Q!==ei||ee!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function Ie(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=M,this.setTexture2D=O,this.setTexture2DArray=X,this.setTexture3D=z,this.setTextureCube=q,this.rebindTextures=be,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=vn,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=$e}function t2(t,e){function n(i,r=Yi){let s;const o=et.getTransfer(r);if(i===Di)return t.UNSIGNED_BYTE;if(i===Ph)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Lh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Kv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Yv)return t.BYTE;if(i===$v)return t.SHORT;if(i===ua)return t.UNSIGNED_SHORT;if(i===Rh)return t.INT;if(i===Vr)return t.UNSIGNED_INT;if(i===fi)return t.FLOAT;if(i===ga)return t.HALF_FLOAT;if(i===Zv)return t.ALPHA;if(i===Qv)return t.RGB;if(i===ei)return t.RGBA;if(i===Jv)return t.LUMINANCE;if(i===e_)return t.LUMINANCE_ALPHA;if(i===Is)return t.DEPTH_COMPONENT;if(i===qs)return t.DEPTH_STENCIL;if(i===Ih)return t.RED;if(i===Dh)return t.RED_INTEGER;if(i===t_)return t.RG;if(i===Nh)return t.RG_INTEGER;if(i===Uh)return t.RGBA_INTEGER;if(i===Tl||i===Al||i===bl||i===Cl)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Tl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Tl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===od||i===ad||i===ld||i===cd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===od)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ad)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ld)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ud||i===fd||i===dd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ud||i===fd)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===dd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hd||i===pd||i===md||i===gd||i===vd||i===_d||i===xd||i===yd||i===Sd||i===Md||i===Ed||i===wd||i===Td||i===Ad)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===md)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_d)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Md)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ed)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wd)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Td)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ad)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rl||i===bd||i===Cd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Rl)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===bd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===n_||i===Rd||i===Pd||i===Ld)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ld)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===js?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class n2 extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class vt extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const i2={type:"move"};class Vu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=n.getJointPose(x,i),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(i2)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new vt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const r2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,s2=`
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

}`;class o2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new Qt,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new dr({vertexShader:r2,fragmentShader:s2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Fe(new _a(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a2 extends Js{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,g=null;const x=new o2,m=n.getContextAttributes();let h=null,v=null;const _=[],S=[],C=new Ye;let A=null;const T=new En;T.layers.enable(1),T.viewport=new rt;const b=new En;b.layers.enable(2),b.viewport=new rt;const H=[T,b],y=new n2;y.layers.enable(1),y.layers.enable(2);let M=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ie=_[Y];return ie===void 0&&(ie=new Vu,_[Y]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Y){let ie=_[Y];return ie===void 0&&(ie=new Vu,_[Y]=ie),ie.getGripSpace()},this.getHand=function(Y){let ie=_[Y];return ie===void 0&&(ie=new Vu,_[Y]=ie),ie.getHandSpace()};function U(Y){const ie=S.indexOf(Y.inputSource);if(ie===-1)return;const de=_[ie];de!==void 0&&(de.update(Y.inputSource,Y.frame,c||o),de.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",X);for(let Y=0;Y<_.length;Y++){const ie=S[Y];ie!==null&&(S[Y]=null,_[Y].disconnect(ie))}M=null,D=null,x.reset(),e.setRenderTarget(h),p=null,f=null,d=null,r=null,v=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",O),r.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const ie={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ie),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Wr(p.framebufferWidth,p.framebufferHeight,{format:ei,type:Di,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ie=null,de=null,ce=null;m.depth&&(ce=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=m.stencil?qs:Is,de=m.stencil?js:Vr);const De={colorFormat:n.RGBA8,depthFormat:ce,scaleFactor:s};d=new XRWebGLBinding(r,n),f=d.createProjectionLayer(De),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Wr(f.textureWidth,f.textureHeight,{format:ei,type:Di,depthTexture:new __(f.textureWidth,f.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ze.setContext(r),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function X(Y){for(let ie=0;ie<Y.removed.length;ie++){const de=Y.removed[ie],ce=S.indexOf(de);ce>=0&&(S[ce]=null,_[ce].disconnect(de))}for(let ie=0;ie<Y.added.length;ie++){const de=Y.added[ie];let ce=S.indexOf(de);if(ce===-1){for(let be=0;be<_.length;be++)if(be>=S.length){S.push(de),ce=be;break}else if(S[be]===null){S[be]=de,ce=be;break}if(ce===-1)break}const De=_[ce];De&&De.connect(de)}}const z=new B,q=new B;function L(Y,ie,de){z.setFromMatrixPosition(ie.matrixWorld),q.setFromMatrixPosition(de.matrixWorld);const ce=z.distanceTo(q),De=ie.projectionMatrix.elements,be=de.projectionMatrix.elements,Ve=De[14]/(De[10]-1),it=De[14]/(De[10]+1),We=(De[9]+1)/De[5],I=(De[9]-1)/De[5],vn=(De[8]-1)/De[0],Be=(be[8]+1)/be[0],$e=Ve*vn,Re=Ve*Be,ct=ce/(-vn+Be),Ie=ct*-vn;if(ie.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ie),Y.translateZ(ct),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),De[10]===-1)Y.projectionMatrix.copy(ie.projectionMatrix),Y.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const R=Ve+ct,E=it+ct,G=$e-Ie,Q=Re+(ce-Ie),ee=We*it/E*R,Z=I*it/E*R;Y.projectionMatrix.makePerspective(G,Q,ee,Z,R,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function $(Y,ie){ie===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ie.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let ie=Y.near,de=Y.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(de=x.depthFar)),y.near=b.near=T.near=ie,y.far=b.far=T.far=de,(M!==y.near||D!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),M=y.near,D=y.far);const ce=Y.parent,De=y.cameras;$(y,ce);for(let be=0;be<De.length;be++)$(De[be],ce);De.length===2?L(y,T,b):y.projectionMatrix.copy(T.projectionMatrix),K(Y,y,ce)};function K(Y,ie,de){de===null?Y.matrix.copy(ie.matrixWorld):(Y.matrix.copy(de.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ie.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ie.projectionMatrix),Y.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Id*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let ne=null;function we(Y,ie){if(u=ie.getViewerPose(c||o),g=ie,u!==null){const de=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let ce=!1;de.length!==y.cameras.length&&(y.cameras.length=0,ce=!0);for(let be=0;be<de.length;be++){const Ve=de[be];let it=null;if(p!==null)it=p.getViewport(Ve);else{const I=d.getViewSubImage(f,Ve);it=I.viewport,be===0&&(e.setRenderTargetTextures(v,I.colorTexture,f.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(v))}let We=H[be];We===void 0&&(We=new En,We.layers.enable(be),We.viewport=new rt,H[be]=We),We.matrix.fromArray(Ve.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ve.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(it.x,it.y,it.width,it.height),be===0&&(y.matrix.copy(We.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ce===!0&&y.cameras.push(We)}const De=r.enabledFeatures;if(De&&De.includes("depth-sensing")){const be=d.getDepthInformation(de[0]);be&&be.isValid&&be.texture&&x.init(e,be,r.renderState)}}for(let de=0;de<_.length;de++){const ce=S[de],De=_[de];ce!==null&&De!==void 0&&De.update(ce,ie,c||o)}ne&&ne(Y,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const ze=new g_;ze.setAnimationLoop(we),this.setAnimationLoop=function(Y){ne=Y},this.dispose=function(){}}}const wr=new mi,l2=new st;function c2(t,e){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,h_(t)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,v,_,S){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,S)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),x(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,v,_):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===rn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===rn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const v=e.get(h),_=v.envMap,S=v.envMapRotation;_&&(m.envMap.value=_,wr.copy(S),wr.x*=-1,wr.y*=-1,wr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),m.envMapRotation.value.setFromMatrix4(l2.makeRotationFromEuler(wr)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,_){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=_*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===rn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const v=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function u2(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){const S=_.program;i.uniformBlockBinding(v,S)}function c(v,_){let S=r[v.id];S===void 0&&(g(v),S=u(v),r[v.id]=S,v.addEventListener("dispose",m));const C=_.program;i.updateUBOMapping(v,C);const A=e.render.frame;s[v.id]!==A&&(f(v),s[v.id]=A)}function u(v){const _=d();v.__bindingPointIndex=_;const S=t.createBuffer(),C=v.__size,A=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,C,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,S),S}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const _=r[v.id],S=v.uniforms,C=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let A=0,T=S.length;A<T;A++){const b=Array.isArray(S[A])?S[A]:[S[A]];for(let H=0,y=b.length;H<y;H++){const M=b[H];if(p(M,A,H,C)===!0){const D=M.__offset,U=Array.isArray(M.value)?M.value:[M.value];let O=0;for(let X=0;X<U.length;X++){const z=U[X],q=x(z);typeof z=="number"||typeof z=="boolean"?(M.__data[0]=z,t.bufferSubData(t.UNIFORM_BUFFER,D+O,M.__data)):z.isMatrix3?(M.__data[0]=z.elements[0],M.__data[1]=z.elements[1],M.__data[2]=z.elements[2],M.__data[3]=0,M.__data[4]=z.elements[3],M.__data[5]=z.elements[4],M.__data[6]=z.elements[5],M.__data[7]=0,M.__data[8]=z.elements[6],M.__data[9]=z.elements[7],M.__data[10]=z.elements[8],M.__data[11]=0):(z.toArray(M.__data,O),O+=q.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,D,M.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,_,S,C){const A=v.value,T=_+"_"+S;if(C[T]===void 0)return typeof A=="number"||typeof A=="boolean"?C[T]=A:C[T]=A.clone(),!0;{const b=C[T];if(typeof A=="number"||typeof A=="boolean"){if(b!==A)return C[T]=A,!0}else if(b.equals(A)===!1)return b.copy(A),!0}return!1}function g(v){const _=v.uniforms;let S=0;const C=16;for(let T=0,b=_.length;T<b;T++){const H=Array.isArray(_[T])?_[T]:[_[T]];for(let y=0,M=H.length;y<M;y++){const D=H[y],U=Array.isArray(D.value)?D.value:[D.value];for(let O=0,X=U.length;O<X;O++){const z=U[O],q=x(z),L=S%C,$=L%q.boundary,K=L+$;S+=$,K!==0&&C-K<q.storage&&(S+=C-K),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=q.storage}}}const A=S%C;return A>0&&(S+=C-A),v.__size=S,v.__cache={},this}function x(v){const _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){const _=v.target;_.removeEventListener("dispose",m);const S=o.indexOf(_.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function h(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class f2{constructor(e={}){const{canvas:n=QM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),g=new Int32Array(4);let x=null,m=null;const h=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Un,this.toneMapping=lr,this.toneMappingExposure=1;const _=this;let S=!1,C=0,A=0,T=null,b=-1,H=null;const y=new rt,M=new rt;let D=null;const U=new Ge(0);let O=0,X=n.width,z=n.height,q=1,L=null,$=null;const K=new rt(0,0,X,z),ne=new rt(0,0,X,z);let we=!1;const ze=new zh;let Y=!1,ie=!1;const de=new st,ce=new st,De=new B,be=new rt,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function We(){return T===null?q:1}let I=i;function vn(w,k){return n.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ch}`),n.addEventListener("webglcontextlost",J,!1),n.addEventListener("webglcontextrestored",ue,!1),n.addEventListener("webglcontextcreationerror",pe,!1),I===null){const k="webgl2";if(I=vn(k,w),I===null)throw vn(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Be,$e,Re,ct,Ie,R,E,G,Q,ee,Z,Se,le,ge,Ke,se,ve,Pe,Le,_e,He,Ne,at,N;function he(){Be=new gT(I),Be.init(),Ne=new t2(I,Be),$e=new uT(I,Be,e,Ne),Re=new QA(I),$e.reverseDepthBuffer&&Re.buffers.depth.setReversed(!0),ct=new xT(I),Ie=new zA,R=new e2(I,Be,Re,Ie,$e,Ne,ct),E=new dT(_),G=new mT(_),Q=new A1(I),at=new lT(I,Q),ee=new vT(I,Q,ct,at),Z=new ST(I,ee,Q,ct),Le=new yT(I,$e,R),se=new fT(Ie),Se=new kA(_,E,G,Be,$e,at,se),le=new c2(_,Ie),ge=new OA,Ke=new XA(Be),Pe=new aT(_,E,G,Re,Z,f,l),ve=new KA(_,Z,$e),N=new u2(I,ct,$e,Re),_e=new cT(I,Be,ct),He=new _T(I,Be,ct),ct.programs=Se.programs,_.capabilities=$e,_.extensions=Be,_.properties=Ie,_.renderLists=ge,_.shadowMap=ve,_.state=Re,_.info=ct}he();const j=new a2(_,I);this.xr=j,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=Be.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Be.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(w){w!==void 0&&(q=w,this.setSize(X,z,!1))},this.getSize=function(w){return w.set(X,z)},this.setSize=function(w,k,V=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,z=k,n.width=Math.floor(w*q),n.height=Math.floor(k*q),V===!0&&(n.style.width=w+"px",n.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(X*q,z*q).floor()},this.setDrawingBufferSize=function(w,k,V){X=w,z=k,q=V,n.width=Math.floor(w*V),n.height=Math.floor(k*V),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,k,V,W){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,k,V,W),Re.viewport(y.copy(K).multiplyScalar(q).round())},this.getScissor=function(w){return w.copy(ne)},this.setScissor=function(w,k,V,W){w.isVector4?ne.set(w.x,w.y,w.z,w.w):ne.set(w,k,V,W),Re.scissor(M.copy(ne).multiplyScalar(q).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(w){Re.setScissorTest(we=w)},this.setOpaqueSort=function(w){L=w},this.setTransparentSort=function(w){$=w},this.getClearColor=function(w){return w.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(w=!0,k=!0,V=!0){let W=0;if(w){let F=!1;if(T!==null){const oe=T.texture.format;F=oe===Uh||oe===Nh||oe===Dh}if(F){const oe=T.texture.type,fe=oe===Di||oe===Vr||oe===ua||oe===js||oe===Ph||oe===Lh,xe=Pe.getClearColor(),ye=Pe.getClearAlpha(),Ae=xe.r,Ce=xe.g,Me=xe.b;fe?(p[0]=Ae,p[1]=Ce,p[2]=Me,p[3]=ye,I.clearBufferuiv(I.COLOR,0,p)):(g[0]=Ae,g[1]=Ce,g[2]=Me,g[3]=ye,I.clearBufferiv(I.COLOR,0,g))}else W|=I.COLOR_BUFFER_BIT}k&&(W|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",J,!1),n.removeEventListener("webglcontextrestored",ue,!1),n.removeEventListener("webglcontextcreationerror",pe,!1),ge.dispose(),Ke.dispose(),Ie.dispose(),E.dispose(),G.dispose(),Z.dispose(),at.dispose(),N.dispose(),Se.dispose(),j.dispose(),j.removeEventListener("sessionstart",Hh),j.removeEventListener("sessionend",Gh),vr.stop()};function J(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=ct.autoReset,k=ve.enabled,V=ve.autoUpdate,W=ve.needsUpdate,F=ve.type;he(),ct.autoReset=w,ve.enabled=k,ve.autoUpdate=V,ve.needsUpdate=W,ve.type=F}function pe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Xe(w){const k=w.target;k.removeEventListener("dispose",Xe),Rt(k)}function Rt(w){an(w),Ie.remove(w)}function an(w){const k=Ie.get(w).programs;k!==void 0&&(k.forEach(function(V){Se.releaseProgram(V)}),w.isShaderMaterial&&Se.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,V,W,F,oe){k===null&&(k=Ve);const fe=F.isMesh&&F.matrixWorld.determinant()<0,xe=C_(w,k,V,W,F);Re.setMaterial(W,fe);let ye=V.index,Ae=1;if(W.wireframe===!0){if(ye=ee.getWireframeAttribute(V),ye===void 0)return;Ae=2}const Ce=V.drawRange,Me=V.attributes.position;let tt=Ce.start*Ae,ut=(Ce.start+Ce.count)*Ae;oe!==null&&(tt=Math.max(tt,oe.start*Ae),ut=Math.min(ut,(oe.start+oe.count)*Ae)),ye!==null?(tt=Math.max(tt,0),ut=Math.min(ut,ye.count)):Me!=null&&(tt=Math.max(tt,0),ut=Math.min(ut,Me.count));const Mt=ut-tt;if(Mt<0||Mt===1/0)return;at.setup(F,W,xe,V,ye);let _n,Qe=_e;if(ye!==null&&(_n=Q.get(ye),Qe=He,Qe.setIndex(_n)),F.isMesh)W.wireframe===!0?(Re.setLineWidth(W.wireframeLinewidth*We()),Qe.setMode(I.LINES)):Qe.setMode(I.TRIANGLES);else if(F.isLine){let Ee=W.linewidth;Ee===void 0&&(Ee=1),Re.setLineWidth(Ee*We()),F.isLineSegments?Qe.setMode(I.LINES):F.isLineLoop?Qe.setMode(I.LINE_LOOP):Qe.setMode(I.LINE_STRIP)}else F.isPoints?Qe.setMode(I.POINTS):F.isSprite&&Qe.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Qe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))Qe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ee=F._multiDrawStarts,Ht=F._multiDrawCounts,Je=F._multiDrawCount,Vn=ye?Q.get(ye).bytesPerElement:1,Yr=Ie.get(W).currentProgram.getUniforms();for(let xn=0;xn<Je;xn++)Yr.setValue(I,"_gl_DrawID",xn),Qe.render(Ee[xn]/Vn,Ht[xn])}else if(F.isInstancedMesh)Qe.renderInstances(tt,Mt,F.count);else if(V.isInstancedBufferGeometry){const Ee=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ht=Math.min(V.instanceCount,Ee);Qe.renderInstances(tt,Mt,Ht)}else Qe.render(tt,Mt)};function Ze(w,k,V){w.transparent===!0&&w.side===ui&&w.forceSinglePass===!1?(w.side=rn,w.needsUpdate=!0,ya(w,k,V),w.side=fr,w.needsUpdate=!0,ya(w,k,V),w.side=ui):ya(w,k,V)}this.compile=function(w,k,V=null){V===null&&(V=w),m=Ke.get(V),m.init(k),v.push(m),V.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),w!==V&&w.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const W=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const xe=oe[fe];Ze(xe,V,F),W.add(xe)}else Ze(oe,V,F),W.add(oe)}),v.pop(),m=null,W},this.compileAsync=function(w,k,V=null){const W=this.compile(w,k,V);return new Promise(F=>{function oe(){if(W.forEach(function(fe){Ie.get(fe).currentProgram.isReady()&&W.delete(fe)}),W.size===0){F(w);return}setTimeout(oe,10)}Be.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let ln=null;function gi(w){ln&&ln(w)}function Hh(){vr.stop()}function Gh(){vr.start()}const vr=new g_;vr.setAnimationLoop(gi),typeof self<"u"&&vr.setContext(self),this.setAnimationLoop=function(w){ln=w,j.setAnimationLoop(w),w===null?vr.stop():vr.start()},j.addEventListener("sessionstart",Hh),j.addEventListener("sessionend",Gh),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(k),k=j.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,k,T),m=Ke.get(w,v.length),m.init(k),v.push(m),ce.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ze.setFromProjectionMatrix(ce),ie=this.localClippingEnabled,Y=se.init(this.clippingPlanes,ie),x=ge.get(w,h.length),x.init(),h.push(x),j.enabled===!0&&j.isPresenting===!0){const oe=_.xr.getDepthSensingMesh();oe!==null&&Uc(oe,k,-1/0,_.sortObjects)}Uc(w,k,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(L,$),it=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,it&&Pe.addToRenderList(x,w),this.info.render.frame++,Y===!0&&se.beginShadows();const V=m.state.shadowsArray;ve.render(V,w,k),Y===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=x.opaque,F=x.transmissive;if(m.setupLights(),k.isArrayCamera){const oe=k.cameras;if(F.length>0)for(let fe=0,xe=oe.length;fe<xe;fe++){const ye=oe[fe];Wh(W,F,w,ye)}it&&Pe.render(w);for(let fe=0,xe=oe.length;fe<xe;fe++){const ye=oe[fe];Vh(x,w,ye,ye.viewport)}}else F.length>0&&Wh(W,F,w,k),it&&Pe.render(w),Vh(x,w,k);T!==null&&(R.updateMultisampleRenderTarget(T),R.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(_,w,k),at.resetDefaultState(),b=-1,H=null,v.pop(),v.length>0?(m=v[v.length-1],Y===!0&&se.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,h.pop(),h.length>0?x=h[h.length-1]:x=null};function Uc(w,k,V,W){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ze.intersectsSprite(w)){W&&be.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ce);const fe=Z.update(w),xe=w.material;xe.visible&&x.push(w,fe,xe,V,be.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ze.intersectsObject(w))){const fe=Z.update(w),xe=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),be.copy(w.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),be.copy(fe.boundingSphere.center)),be.applyMatrix4(w.matrixWorld).applyMatrix4(ce)),Array.isArray(xe)){const ye=fe.groups;for(let Ae=0,Ce=ye.length;Ae<Ce;Ae++){const Me=ye[Ae],tt=xe[Me.materialIndex];tt&&tt.visible&&x.push(w,fe,tt,V,be.z,Me)}}else xe.visible&&x.push(w,fe,xe,V,be.z,null)}}const oe=w.children;for(let fe=0,xe=oe.length;fe<xe;fe++)Uc(oe[fe],k,V,W)}function Vh(w,k,V,W){const F=w.opaque,oe=w.transmissive,fe=w.transparent;m.setupLightsView(V),Y===!0&&se.setGlobalState(_.clippingPlanes,V),W&&Re.viewport(y.copy(W)),F.length>0&&xa(F,k,V),oe.length>0&&xa(oe,k,V),fe.length>0&&xa(fe,k,V),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function Wh(w,k,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new Wr(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?ga:Di,minFilter:Ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const oe=m.state.transmissionRenderTarget[W.id],fe=W.viewport||y;oe.setSize(fe.z,fe.w);const xe=_.getRenderTarget();_.setRenderTarget(oe),_.getClearColor(U),O=_.getClearAlpha(),O<1&&_.setClearColor(16777215,.5),_.clear(),it&&Pe.render(V);const ye=_.toneMapping;_.toneMapping=lr;const Ae=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),Y===!0&&se.setGlobalState(_.clippingPlanes,W),xa(w,V,W),R.updateMultisampleRenderTarget(oe),R.updateRenderTargetMipmap(oe),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let Me=0,tt=k.length;Me<tt;Me++){const ut=k[Me],Mt=ut.object,_n=ut.geometry,Qe=ut.material,Ee=ut.group;if(Qe.side===ui&&Mt.layers.test(W.layers)){const Ht=Qe.side;Qe.side=rn,Qe.needsUpdate=!0,Xh(Mt,V,W,_n,Qe,Ee),Qe.side=Ht,Qe.needsUpdate=!0,Ce=!0}}Ce===!0&&(R.updateMultisampleRenderTarget(oe),R.updateRenderTargetMipmap(oe))}_.setRenderTarget(xe),_.setClearColor(U,O),Ae!==void 0&&(W.viewport=Ae),_.toneMapping=ye}function xa(w,k,V){const W=k.isScene===!0?k.overrideMaterial:null;for(let F=0,oe=w.length;F<oe;F++){const fe=w[F],xe=fe.object,ye=fe.geometry,Ae=W===null?fe.material:W,Ce=fe.group;xe.layers.test(V.layers)&&Xh(xe,k,V,ye,Ae,Ce)}}function Xh(w,k,V,W,F,oe){w.onBeforeRender(_,k,V,W,F,oe),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(_,k,V,W,w,oe),F.transparent===!0&&F.side===ui&&F.forceSinglePass===!1?(F.side=rn,F.needsUpdate=!0,_.renderBufferDirect(V,k,W,F,w,oe),F.side=fr,F.needsUpdate=!0,_.renderBufferDirect(V,k,W,F,w,oe),F.side=ui):_.renderBufferDirect(V,k,W,F,w,oe),w.onAfterRender(_,k,V,W,F,oe)}function ya(w,k,V){k.isScene!==!0&&(k=Ve);const W=Ie.get(w),F=m.state.lights,oe=m.state.shadowsArray,fe=F.state.version,xe=Se.getParameters(w,F.state,oe,k,V),ye=Se.getProgramCacheKey(xe);let Ae=W.programs;W.environment=w.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(w.isMeshStandardMaterial?G:E).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Ae===void 0&&(w.addEventListener("dispose",Xe),Ae=new Map,W.programs=Ae);let Ce=Ae.get(ye);if(Ce!==void 0){if(W.currentProgram===Ce&&W.lightsStateVersion===fe)return qh(w,xe),Ce}else xe.uniforms=Se.getUniforms(w),w.onBeforeCompile(xe,_),Ce=Se.acquireProgram(xe,ye),Ae.set(ye,Ce),W.uniforms=xe.uniforms;const Me=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Me.clippingPlanes=se.uniform),qh(w,xe),W.needsLights=P_(w),W.lightsStateVersion=fe,W.needsLights&&(Me.ambientLightColor.value=F.state.ambient,Me.lightProbe.value=F.state.probe,Me.directionalLights.value=F.state.directional,Me.directionalLightShadows.value=F.state.directionalShadow,Me.spotLights.value=F.state.spot,Me.spotLightShadows.value=F.state.spotShadow,Me.rectAreaLights.value=F.state.rectArea,Me.ltc_1.value=F.state.rectAreaLTC1,Me.ltc_2.value=F.state.rectAreaLTC2,Me.pointLights.value=F.state.point,Me.pointLightShadows.value=F.state.pointShadow,Me.hemisphereLights.value=F.state.hemi,Me.directionalShadowMap.value=F.state.directionalShadowMap,Me.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Me.spotShadowMap.value=F.state.spotShadowMap,Me.spotLightMatrix.value=F.state.spotLightMatrix,Me.spotLightMap.value=F.state.spotLightMap,Me.pointShadowMap.value=F.state.pointShadowMap,Me.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Ce,W.uniformsList=null,Ce}function jh(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=Ll.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function qh(w,k){const V=Ie.get(w);V.outputColorSpace=k.outputColorSpace,V.batching=k.batching,V.batchingColor=k.batchingColor,V.instancing=k.instancing,V.instancingColor=k.instancingColor,V.instancingMorph=k.instancingMorph,V.skinning=k.skinning,V.morphTargets=k.morphTargets,V.morphNormals=k.morphNormals,V.morphColors=k.morphColors,V.morphTargetsCount=k.morphTargetsCount,V.numClippingPlanes=k.numClippingPlanes,V.numIntersection=k.numClipIntersection,V.vertexAlphas=k.vertexAlphas,V.vertexTangents=k.vertexTangents,V.toneMapping=k.toneMapping}function C_(w,k,V,W,F){k.isScene!==!0&&(k=Ve),R.resetTextureUnits();const oe=k.fog,fe=W.isMeshStandardMaterial?k.environment:null,xe=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:gr,ye=(W.isMeshStandardMaterial?G:E).get(W.envMap||fe),Ae=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ce=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Me=!!V.morphAttributes.position,tt=!!V.morphAttributes.normal,ut=!!V.morphAttributes.color;let Mt=lr;W.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Mt=_.toneMapping);const _n=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qe=_n!==void 0?_n.length:0,Ee=Ie.get(W),Ht=m.state.lights;if(Y===!0&&(ie===!0||w!==H)){const Ln=w===H&&W.id===b;se.setState(W,w,Ln)}let Je=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ht.state.version||Ee.outputColorSpace!==xe||F.isBatchedMesh&&Ee.batching===!1||!F.isBatchedMesh&&Ee.batching===!0||F.isBatchedMesh&&Ee.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ee.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ee.instancing===!1||!F.isInstancedMesh&&Ee.instancing===!0||F.isSkinnedMesh&&Ee.skinning===!1||!F.isSkinnedMesh&&Ee.skinning===!0||F.isInstancedMesh&&Ee.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ee.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ee.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ee.instancingMorph===!1&&F.morphTexture!==null||Ee.envMap!==ye||W.fog===!0&&Ee.fog!==oe||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==se.numPlanes||Ee.numIntersection!==se.numIntersection)||Ee.vertexAlphas!==Ae||Ee.vertexTangents!==Ce||Ee.morphTargets!==Me||Ee.morphNormals!==tt||Ee.morphColors!==ut||Ee.toneMapping!==Mt||Ee.morphTargetsCount!==Qe)&&(Je=!0):(Je=!0,Ee.__version=W.version);let Vn=Ee.currentProgram;Je===!0&&(Vn=ya(W,k,F));let Yr=!1,xn=!1,kc=!1;const wt=Vn.getUniforms(),Ui=Ee.uniforms;if(Re.useProgram(Vn.program)&&(Yr=!0,xn=!0,kc=!0),W.id!==b&&(b=W.id,xn=!0),Yr||H!==w){$e.reverseDepthBuffer?(de.copy(w.projectionMatrix),e1(de),t1(de),wt.setValue(I,"projectionMatrix",de)):wt.setValue(I,"projectionMatrix",w.projectionMatrix),wt.setValue(I,"viewMatrix",w.matrixWorldInverse);const Ln=wt.map.cameraPosition;Ln!==void 0&&Ln.setValue(I,De.setFromMatrixPosition(w.matrixWorld)),$e.logarithmicDepthBuffer&&wt.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&wt.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),H!==w&&(H=w,xn=!0,kc=!0)}if(F.isSkinnedMesh){wt.setOptional(I,F,"bindMatrix"),wt.setOptional(I,F,"bindMatrixInverse");const Ln=F.skeleton;Ln&&(Ln.boneTexture===null&&Ln.computeBoneTexture(),wt.setValue(I,"boneTexture",Ln.boneTexture,R))}F.isBatchedMesh&&(wt.setOptional(I,F,"batchingTexture"),wt.setValue(I,"batchingTexture",F._matricesTexture,R),wt.setOptional(I,F,"batchingIdTexture"),wt.setValue(I,"batchingIdTexture",F._indirectTexture,R),wt.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&wt.setValue(I,"batchingColorTexture",F._colorsTexture,R));const zc=V.morphAttributes;if((zc.position!==void 0||zc.normal!==void 0||zc.color!==void 0)&&Le.update(F,V,Vn),(xn||Ee.receiveShadow!==F.receiveShadow)&&(Ee.receiveShadow=F.receiveShadow,wt.setValue(I,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ui.envMap.value=ye,Ui.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(Ui.envMapIntensity.value=k.environmentIntensity),xn&&(wt.setValue(I,"toneMappingExposure",_.toneMappingExposure),Ee.needsLights&&R_(Ui,kc),oe&&W.fog===!0&&le.refreshFogUniforms(Ui,oe),le.refreshMaterialUniforms(Ui,W,q,z,m.state.transmissionRenderTarget[w.id]),Ll.upload(I,jh(Ee),Ui,R)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ll.upload(I,jh(Ee),Ui,R),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&wt.setValue(I,"center",F.center),wt.setValue(I,"modelViewMatrix",F.modelViewMatrix),wt.setValue(I,"normalMatrix",F.normalMatrix),wt.setValue(I,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ln=W.uniformsGroups;for(let Fc=0,L_=Ln.length;Fc<L_;Fc++){const Yh=Ln[Fc];N.update(Yh,Vn),N.bind(Yh,Vn)}}return Vn}function R_(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function P_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,k,V){Ie.get(w.texture).__webglTexture=k,Ie.get(w.depthTexture).__webglTexture=V;const W=Ie.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const V=Ie.get(w);V.__webglFramebuffer=k,V.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,V=0){T=w,C=k,A=V;let W=!0,F=null,oe=!1,fe=!1;if(w){const ye=Ie.get(w);if(ye.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(ye.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(ye.__hasExternalTextures)R.rebindTextures(w,Ie.get(w.texture).__webglTexture,Ie.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Me=w.depthTexture;if(ye.__boundDepthTexture!==Me){if(Me!==null&&Ie.has(Me)&&(w.width!==Me.image.width||w.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}const Ae=w.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(fe=!0);const Ce=Ie.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ce[k])?F=Ce[k][V]:F=Ce[k],oe=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?F=Ie.get(w).__webglMultisampledFramebuffer:Array.isArray(Ce)?F=Ce[V]:F=Ce,y.copy(w.viewport),M.copy(w.scissor),D=w.scissorTest}else y.copy(K).multiplyScalar(q).floor(),M.copy(ne).multiplyScalar(q).floor(),D=we;if(Re.bindFramebuffer(I.FRAMEBUFFER,F)&&W&&Re.drawBuffers(w,F),Re.viewport(y),Re.scissor(M),Re.setScissorTest(D),oe){const ye=Ie.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,ye.__webglTexture,V)}else if(fe){const ye=Ie.get(w.texture),Ae=k||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ye.__webglTexture,V||0,Ae)}b=-1},this.readRenderTargetPixels=function(w,k,V,W,F,oe,fe){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ie.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(xe=xe[fe]),xe){Re.bindFramebuffer(I.FRAMEBUFFER,xe);try{const ye=w.texture,Ae=ye.format,Ce=ye.type;if(!$e.textureFormatReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-W&&V>=0&&V<=w.height-F&&I.readPixels(k,V,W,F,Ne.convert(Ae),Ne.convert(Ce),oe)}finally{const ye=T!==null?Ie.get(T).__webglFramebuffer:null;Re.bindFramebuffer(I.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(w,k,V,W,F,oe,fe){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ie.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(xe=xe[fe]),xe){const ye=w.texture,Ae=ye.format,Ce=ye.type;if(!$e.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-W&&V>=0&&V<=w.height-F){Re.bindFramebuffer(I.FRAMEBUFFER,xe);const Me=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Me),I.bufferData(I.PIXEL_PACK_BUFFER,oe.byteLength,I.STREAM_READ),I.readPixels(k,V,W,F,Ne.convert(Ae),Ne.convert(Ce),0);const tt=T!==null?Ie.get(T).__webglFramebuffer:null;Re.bindFramebuffer(I.FRAMEBUFFER,tt);const ut=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await JM(I,ut,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Me),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,oe),I.deleteBuffer(Me),I.deleteSync(ut),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,V=0){w.isTexture!==!0&&(Pl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const W=Math.pow(2,-V),F=Math.floor(w.image.width*W),oe=Math.floor(w.image.height*W),fe=k!==null?k.x:0,xe=k!==null?k.y:0;R.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,fe,xe,F,oe),Re.unbindTexture()},this.copyTextureToTexture=function(w,k,V=null,W=null,F=0){w.isTexture!==!0&&(Pl("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],k=arguments[2],F=arguments[3]||0,V=null);let oe,fe,xe,ye,Ae,Ce;V!==null?(oe=V.max.x-V.min.x,fe=V.max.y-V.min.y,xe=V.min.x,ye=V.min.y):(oe=w.image.width,fe=w.image.height,xe=0,ye=0),W!==null?(Ae=W.x,Ce=W.y):(Ae=0,Ce=0);const Me=Ne.convert(k.format),tt=Ne.convert(k.type);R.setTexture2D(k,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const ut=I.getParameter(I.UNPACK_ROW_LENGTH),Mt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),_n=I.getParameter(I.UNPACK_SKIP_PIXELS),Qe=I.getParameter(I.UNPACK_SKIP_ROWS),Ee=I.getParameter(I.UNPACK_SKIP_IMAGES),Ht=w.isCompressedTexture?w.mipmaps[F]:w.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Ht.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ht.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,xe),I.pixelStorei(I.UNPACK_SKIP_ROWS,ye),w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,F,Ae,Ce,oe,fe,Me,tt,Ht.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,F,Ae,Ce,Ht.width,Ht.height,Me,Ht.data):I.texSubImage2D(I.TEXTURE_2D,F,Ae,Ce,oe,fe,Me,tt,Ht),I.pixelStorei(I.UNPACK_ROW_LENGTH,ut),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Mt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,_n),I.pixelStorei(I.UNPACK_SKIP_ROWS,Qe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ee),F===0&&k.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Re.unbindTexture()},this.copyTextureToTexture3D=function(w,k,V=null,W=null,F=0){w.isTexture!==!0&&(Pl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,w=arguments[2],k=arguments[3],F=arguments[4]||0);let oe,fe,xe,ye,Ae,Ce,Me,tt,ut;const Mt=w.isCompressedTexture?w.mipmaps[F]:w.image;V!==null?(oe=V.max.x-V.min.x,fe=V.max.y-V.min.y,xe=V.max.z-V.min.z,ye=V.min.x,Ae=V.min.y,Ce=V.min.z):(oe=Mt.width,fe=Mt.height,xe=Mt.depth,ye=0,Ae=0,Ce=0),W!==null?(Me=W.x,tt=W.y,ut=W.z):(Me=0,tt=0,ut=0);const _n=Ne.convert(k.format),Qe=Ne.convert(k.type);let Ee;if(k.isData3DTexture)R.setTexture3D(k,0),Ee=I.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)R.setTexture2DArray(k,0),Ee=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const Ht=I.getParameter(I.UNPACK_ROW_LENGTH),Je=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Vn=I.getParameter(I.UNPACK_SKIP_PIXELS),Yr=I.getParameter(I.UNPACK_SKIP_ROWS),xn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Mt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Mt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ye),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ae),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ce),w.isDataTexture||w.isData3DTexture?I.texSubImage3D(Ee,F,Me,tt,ut,oe,fe,xe,_n,Qe,Mt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(Ee,F,Me,tt,ut,oe,fe,xe,_n,Mt.data):I.texSubImage3D(Ee,F,Me,tt,ut,oe,fe,xe,_n,Qe,Mt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ht),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Je),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Vn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Yr),I.pixelStorei(I.UNPACK_SKIP_IMAGES,xn),F===0&&k.generateMipmaps&&I.generateMipmap(Ee),Re.unbindTexture()},this.initRenderTarget=function(w){Ie.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Re.unbindTexture()},this.resetState=function(){C=0,A=0,T=null,Re.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===kh?"display-p3":"srgb",n.unpackColorSpace=et.workingColorSpace===Lc?"display-p3":"srgb"}}class Oh{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ge(e),this.near=n,this.far=i}clone(){return new Oh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class d2 extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mi,this.environmentIntensity=1,this.environmentRotation=new mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class h2 extends Qt{constructor(e=null,n=1,i=1,r,s,o,a,l,c=hn,u=hn,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class u0 extends An{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const us=new st,f0=new st,al=[],d0=new qr,p2=new st,So=new Fe,Mo=new to;class h0 extends Fe{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new u0(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,p2)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new qr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,us),d0.copy(e.boundingBox).applyMatrix4(us),this.boundingBox.union(d0)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new to),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,us),Mo.copy(e.boundingSphere).applyMatrix4(us),this.boundingSphere.union(Mo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(So.geometry=this.geometry,So.material=this.material,So.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(i),e.ray.intersectsSphere(Mo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,us),f0.multiplyMatrices(i,us),So.matrixWorld=f0,So.raycast(e,al);for(let o=0,a=al.length;o<a;o++){const l=al[o];l.instanceId=s,l.object=this,n.push(l)}al.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new u0(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new h2(new Float32Array(r*this.count),r,this.count,Ih,fi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class E_ extends no{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cc=new B,uc=new B,p0=new st,Eo=new l_,ll=new to,Wu=new B,m0=new B;class m2 extends yt{constructor(e=new Pn,n=new E_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)cc.fromBufferAttribute(n,r-1),uc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=cc.distanceTo(uc);e.setAttribute("lineDistance",new Ct(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ll.copy(i.boundingSphere),ll.applyMatrix4(r),ll.radius+=s,e.ray.intersectsSphere(ll)===!1)return;p0.copy(r).invert(),Eo.copy(e.ray).applyMatrix4(p0);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){const h=u.getX(x),v=u.getX(x+1),_=cl(this,e,Eo,l,h,v);_&&n.push(_)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(p),h=cl(this,e,Eo,l,x,m);h&&n.push(h)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){const h=cl(this,e,Eo,l,x,x+1);h&&n.push(h)}if(this.isLineLoop){const x=cl(this,e,Eo,l,g-1,p);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function cl(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(cc.fromBufferAttribute(o,r),uc.fromBufferAttribute(o,s),n.distanceSqToSegment(cc,uc,Wu,m0)>i)return;Wu.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Wu);if(!(l<e.near||l>e.far))return{distance:l,point:m0.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const g0=new B,v0=new B;class g2 extends m2{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)g0.fromBufferAttribute(n,r),v0.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+g0.distanceTo(v0);e.setAttribute("lineDistance",new Ct(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class w_ extends Qt{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jn extends Pn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],p=[];let g=0;const x=[],m=i/2;let h=0;v(),o===!1&&(e>0&&_(!0),n>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Ct(d,3)),this.setAttribute("normal",new Ct(f,3)),this.setAttribute("uv",new Ct(p,2));function v(){const S=new B,C=new B;let A=0;const T=(n-e)/i;for(let b=0;b<=s;b++){const H=[],y=b/s,M=y*(n-e)+e;for(let D=0;D<=r;D++){const U=D/r,O=U*l+a,X=Math.sin(O),z=Math.cos(O);C.x=M*X,C.y=-y*i+m,C.z=M*z,d.push(C.x,C.y,C.z),S.set(X,T,z).normalize(),f.push(S.x,S.y,S.z),p.push(U,1-y),H.push(g++)}x.push(H)}for(let b=0;b<r;b++)for(let H=0;H<s;H++){const y=x[H][b],M=x[H+1][b],D=x[H+1][b+1],U=x[H][b+1];e>0&&(u.push(y,M,U),A+=3),n>0&&(u.push(M,D,U),A+=3)}c.addGroup(h,A,0),h+=A}function _(S){const C=g,A=new Ye,T=new B;let b=0;const H=S===!0?e:n,y=S===!0?1:-1;for(let D=1;D<=r;D++)d.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const M=g;for(let D=0;D<=r;D++){const O=D/r*l+a,X=Math.cos(O),z=Math.sin(O);T.x=H*z,T.y=m*y,T.z=H*X,d.push(T.x,T.y,T.z),f.push(0,y,0),A.x=X*.5+.5,A.y=z*.5*y+.5,p.push(A.x,A.y),g++}for(let D=0;D<r;D++){const U=C+D,O=M+D;S===!0?u.push(O,O+1,U):u.push(O+1,O,U),b+=3}c.addGroup(h,b,S===!0?1:2),h+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dc extends Jn{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Dc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bh extends Pn{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let d=e;const f=(n-e)/r,p=new B,g=new Ye;for(let x=0;x<=r;x++){for(let m=0;m<=i;m++){const h=s+m/i*o;p.x=d*Math.cos(h),p.y=d*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/n+1)/2,g.y=(p.y/n+1)/2,u.push(g.x,g.y)}d+=f}for(let x=0;x<r;x++){const m=x*(i+1);for(let h=0;h<i;h++){const v=h+m,_=v,S=v+i+1,C=v+i+2,A=v+1;a.push(_,S,A),a.push(S,C,A)}}this.setIndex(a),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(c,3)),this.setAttribute("uv",new Ct(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class fc extends Pn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new B,f=new B,p=[],g=[],x=[],m=[];for(let h=0;h<=i;h++){const v=[],_=h/i;let S=0;h===0&&o===0?S=.5/n:h===i&&l===Math.PI&&(S=-.5/n);for(let C=0;C<=n;C++){const A=C/n;d.x=-e*Math.cos(r+A*s)*Math.sin(o+_*a),d.y=e*Math.cos(o+_*a),d.z=e*Math.sin(r+A*s)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(A+S,1-_),v.push(c++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){const _=u[h][v+1],S=u[h][v],C=u[h+1][v],A=u[h+1][v+1];(h!==0||o>0)&&p.push(_,S,A),(h!==i-1||l<Math.PI)&&p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(x,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Vt extends no{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=i_,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nc extends yt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class v2 extends Nc{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const Xu=new st,_0=new B,x0=new B;class T_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zh,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;_0.setFromMatrixPosition(e.matrixWorld),n.position.copy(_0),x0.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(x0),n.updateMatrixWorld(),Xu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Xu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const y0=new st,wo=new B,ju=new B;class _2 extends T_{constructor(){super(new En(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ye(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),wo.setFromMatrixPosition(e.matrixWorld),i.position.copy(wo),ju.copy(i.position),ju.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(ju),i.updateMatrixWorld(),r.makeTranslation(-wo.x,-wo.y,-wo.z),y0.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(y0)}}class x2 extends Nc{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new _2}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class y2 extends T_{constructor(){super(new v_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class S2 extends Nc{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new y2}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class M2 extends Nc{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ch}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ch);function To(t){const e=document.createElement("canvas");e.width=t,e.height=t;const n=e.getContext("2d");return{c:e,ctx:n}}function Ao(t,e,n){t.fillStyle=n.base,t.fillRect(0,0,e,e);for(let s=0;s<n.blotches;s++){const o=e*(.05+Math.random()*.22),a=Math.random()*e,l=Math.random()*e,c=t.createRadialGradient(a,l,0,a,l,o);c.addColorStop(0,n.blotchColor),c.addColorStop(1,"rgba(0,0,0,0)"),t.globalAlpha=.1+Math.random()*.22,t.fillStyle=c,t.beginPath(),t.arc(a,l,o,0,Math.PI*2),t.fill()}t.globalAlpha=1;for(let s=0;s<n.speckleCount;s++){t.fillStyle=n.speckle,t.globalAlpha=.12+Math.random()*.4;const o=1+Math.random()*n.speckleSize;t.fillRect(Math.random()*e,Math.random()*e,o,o)}if(t.globalAlpha=1,n.lines){t.strokeStyle=n.lines.color,t.globalAlpha=.25;for(let s=0;s<n.lines.count;s++){t.lineWidth=.5+Math.random()*n.lines.width,t.beginPath();const o=Math.random()*e,a=Math.random()*e;t.moveTo(o,a),t.lineTo(o+(Math.random()-.5)*e*.6,a+(Math.random()-.5)*e*.6),t.stroke()}t.globalAlpha=1}n.border&&(t.strokeStyle=n.border.color,t.lineWidth=n.border.size,t.strokeRect(0,0,e,e),t.globalAlpha=.5,t.strokeRect(n.border.size,n.border.size,e-n.border.size*2,e-n.border.size*2),t.globalAlpha=1);const i=t.getImageData(0,0,e,e),r=i.data;for(let s=0;s<r.length;s+=4){const o=(Math.random()-.5)*n.grain;r[s]=Math.max(0,Math.min(255,r[s]+o)),r[s+1]=Math.max(0,Math.min(255,r[s+1]+o)),r[s+2]=Math.max(0,Math.min(255,r[s+2]+o))}t.putImageData(i,0,0)}function bo(t,e,n=4){const i=new w_(t);return i.wrapS=ca,i.wrapT=ca,i.repeat.set(e,e),i.colorSpace=Un,i.anisotropy=n,i}let si=null;function A_(){if(si)return si;{const{c:t,ctx:e}=To(256);Ao(e,256,{base:"#c8ab7c",speckle:"#8f7448",speckleCount:4200,speckleSize:2.2,blotches:26,blotchColor:"#a98d5f",grain:26,lines:{color:"#b09468",count:40,width:1.2}}),si={},si.sand=bo(t,1,8)}{const{c:t,ctx:e}=To(256);Ao(e,256,{base:"#b9a583",speckle:"#8c7a5c",speckleCount:2600,speckleSize:2,blotches:20,blotchColor:"#947f5f",grain:22,lines:{color:"#8a7757",count:26,width:1.6}}),si.concrete=bo(t,2,8)}{const{c:t,ctx:e}=To(256);Ao(e,256,{base:"#9c8a6b",speckle:"#6f6047",speckleCount:3e3,speckleSize:2.4,blotches:16,blotchColor:"#7a6a4e",grain:20,lines:{color:"#6d5d42",count:30,width:2}}),si.wall=bo(t,1,8)}{const{c:t,ctx:e}=To(128);Ao(e,128,{base:"#8a6a41",speckle:"#5d4626",speckleCount:900,speckleSize:2,blotches:8,blotchColor:"#6d522f",grain:18,lines:{color:"#4e3a1f",count:18,width:1.4},border:{color:"#4a371d",size:7}}),si.crate=bo(t,2,4)}{const{c:t,ctx:e}=To(128);Ao(e,128,{base:"#5c666e",speckle:"#3d454b",speckleCount:700,speckleSize:1.8,blotches:6,blotchColor:"#454d54",grain:14,lines:{color:"#394046",count:10,width:1}}),si.metal=bo(t,1,4)}{const t=document.createElement("canvas");t.width=8,t.height=256;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,256);n.addColorStop(0,"#5b8fc9"),n.addColorStop(.45,"#9dbfd8"),n.addColorStop(.75,"#d8c9a8"),n.addColorStop(1,"#c9ab7d"),e.fillStyle=n,e.fillRect(0,0,8,256);const i=new w_(t);i.colorSpace=Un,si.sky=i}return si}const E2={crate:{color:16777215,map:"crate"},barrel:{color:8022591,map:"metal"},platform:{color:11048048,map:"concrete"},door:{color:7031850,map:"crate"},car:{color:9062972,map:"metal"},sandbag:{color:11903347,map:"concrete"}};function w2(t){const e=new vt,n=A_(),i=[],r=[],s=[],o=[];let a=0;for(let b=0;b<t.rows;b++)for(let H=0;H<t.cols;H++){const y=t.idx(H,b);if(t.walkable[y]!==1)continue;const M=t.minXOf(H),D=t.minZOf(b),U=M+t.cell,O=D+t.cell;i.push(M,0,D,U,0,D,U,0,O,M,0,O);for(let X=0;X<4;X++)r.push(0,1,0);s.push(M/4,D/4,U/4,D/4,U/4,O/4,M/4,O/4),o.push(a,a+2,a+1,a,a+3,a+2),a+=4}const l=new Pn;l.setAttribute("position",new Ct(i,3)),l.setAttribute("normal",new Ct(r,3)),l.setAttribute("uv",new Ct(s,2)),l.setIndex(o),l.computeBoundingSphere();const c=new Vt({map:n.sand,roughness:.97,metalness:0,color:16777215}),u=new Fe(l,c);u.receiveShadow=!0,u.name="floor",e.add(u);const d=[];for(let b=0;b<t.rows;b++)for(let H=0;H<t.cols;H++){const y=t.idx(H,b);if(t.walkable[y]===1)continue;let M=!1;for(let D=-1;D<=1&&!M;D++)for(let U=-1;U<=1;U++)if(t.inBounds(H+U,b+D)&&t.walkable[t.idx(H+U,b+D)]===1){M=!0;break}M&&d.push(y)}const f=new Te(1,1,1),p=new Vt({map:n.concrete,roughness:.95,metalness:0}),g=new h0(f,p,d.length);g.castShadow=!0,g.receiveShadow=!0,g.name="walls";const x=new st,m=new eo,h=new B,v=new B;d.forEach((b,H)=>{const y=b%t.cols,M=(b-y)/t.cols,D=t.height[b];v.set(t.centerX(y),D/2,t.centerZ(M)),h.set(t.cell+.02,D,t.cell+.02),x.compose(v,m,h),g.setMatrixAt(H,x)}),g.instanceMatrix.needsUpdate=!0,e.add(g);const _=[];for(let b=0;b<t.rows;b++)for(let H=0;H<t.cols;H++){const y=t.idx(H,b);t.walkable[y]!==1||t.roof[y]!==1||_.push(y)}const S=new Te(1,1,1),C=new Vt({map:n.wall,roughness:.96,metalness:0,color:12169376}),A=new h0(S,C,_.length);A.castShadow=!1,A.receiveShadow=!0,A.name="ceilings",_.forEach((b,H)=>{const y=b%t.cols,M=(b-y)/t.cols,D=t.height[b];v.set(t.centerX(y),D-.17,t.centerZ(M)),h.set(t.cell+.02,.34,t.cell+.02),x.compose(v,m,h),A.setMatrixAt(H,x)}),A.instanceMatrix.needsUpdate=!0,e.add(A);const T=[];for(const b of Rc){const H=E2[b.kind],y=b.kind==="crate"||b.kind==="door"?n.crate:H.map==="metal"?n.metal:n.concrete,M=b.kind==="barrel"?new Jn(b.w/2,b.w/2,b.h,14):new Te(b.w,b.h,b.d),D=new Vt({map:y,color:b.kind==="crate"||b.kind==="door"?16777215:H.color,roughness:b.kind==="barrel"||b.kind==="car"?.55:.92,metalness:b.kind==="barrel"||b.kind==="car"?.35:0}),U=new Fe(M,D);if(U.position.set(b.x,b.y+b.h/2,b.z),U.castShadow=!0,U.receiveShadow=!0,U.name=b.id,e.add(U),T.push(U),b.kind==="sandbag"){const O=new Fe(new Te(b.w*.92,b.h*.22,b.d*.92),new Vt({map:n.concrete,color:12626814,roughness:1}));O.position.set(b.x,b.y+b.h+.02,b.z),O.castShadow=!0,e.add(O),T.push(O)}}return{group:e,floor:u,walls:g,ceilings:A,props:T}}const T2={uniform:3099762,vest:1846338,head:14068094,helmet:4154003,gloves:2303790,accent:7317724,pants:2569807,boots:1382429},A2={uniform:8019768,vest:4272927,head:2827040,helmet:2827040,gloves:3090980,accent:13666874,pants:6048302,boots:1906707},Tt={pelvis:new Te(.34,.18,.23),torso:new Te(.44,.44,.25),vest:new Te(.47,.3,.28),neck:new Te(.12,.08,.12),head:new Te(.23,.26,.23),helmet:new Te(.27,.14,.27),brim:new Te(.28,.03,.1),band:new Te(.1,.09,.1),upperArm:new Te(.115,.3,.115),foreArm:new Te(.1,.28,.1),hand:new Te(.115,.115,.13),thigh:new Te(.155,.46,.16),shin:new Te(.13,.44,.14),foot:new Te(.15,.09,.27)};function ai(t,e=.85){return new Vt({color:t,roughness:e,metalness:.05})}function At(t,e,n,i,r,s,o){const a=new Fe(e,n);return a.position.set(i,r,s),a.castShadow=!0,a.receiveShadow=!1,t.add(a),o.meshes.push(a),a}function b2(t,e=1){const i=Bn[t].viewModel,r=new vt,s=ai(i.bodyColor,.6),o=new Vt({color:i.metalColor,roughness:.35,metalness:.7}),a=ai(i.accentColor,.7);if(i.blade){const c=new Fe(new Te(.04,.035,.13),a);c.position.set(0,0,.06);const u=new Fe(new Te(.022,.008,.2),o);u.position.set(0,.01,-.1);const d=new Fe(new Te(.06,.012,.018),o);d.position.set(0,0,-.005),r.add(c,u,d),[c,u,d].forEach(f=>{f.castShadow=!0})}else{const c=i.length*.42,u=new Fe(new Te(.075,.1,c),s);u.position.set(0,0,0),r.add(u);const d=new Fe(new Te(.038,.038,i.barrel),o);d.position.set(0,.022,-(c/2+i.barrel/2)),r.add(d);const f=new Fe(new Te(.055,i.magSize,.075),a);if(f.position.set(0,-.055-i.magSize/2,.02),f.rotation.x=-.16,r.add(f),i.hasStock){const g=new Fe(new Te(.065,.085,.24),a);g.position.set(0,-.012,c/2+.11),r.add(g)}if(i.hasScope){const g=new Fe(new Jn(.032,.032,.2,10),o);g.rotation.x=Math.PI/2,g.position.set(0,.075,-.02),r.add(g);const x=new Fe(new Te(.05,.045,.06),a);x.position.set(0,.045,-.02),r.add(x)}const p=new Fe(new Te(.05,.11,.06),a);p.position.set(0,-.07,c*.22),p.rotation.x=.28,r.add(p),r.traverse(g=>{g.isMesh&&(g.castShadow=!0)})}const l=new yt;return l.position.set(0,.022,-(i.barrel>0?i.length*.21+i.barrel:.2)),r.add(l),r.scale.setScalar(e),{group:r,muzzle:l}}function C2(t){const e=t==="CT"?T2:A2,n={root:new vt,upper:new vt,head:new vt,hipR:new vt,hipL:new vt,kneeR:new vt,kneeL:new vt,shoulderR:new vt,shoulderL:new vt,elbowR:new vt,elbowL:new vt,weapon:new vt,muzzle:new yt,marker:new Fe,meshes:[]},i=ai(e.uniform),r=ai(e.vest,.9),s=ai(e.head,.75),o=ai(e.helmet,.6),a=ai(e.gloves,.95),l=ai(e.accent,.5),c=ai(e.pants),u=ai(e.boots,.95),d=n.root;At(d,Tt.pelvis,c,0,.9,0,n);const f=n.upper;f.position.set(0,.98,0),d.add(f),At(f,Tt.torso,i,0,.22,0,n),At(f,Tt.vest,r,0,.2,.005,n),At(f,Tt.neck,s,0,.47,0,n);const p=new Fe(new Te(.44,.05,.26),l);p.position.set(0,.36,0),p.castShadow=!0,f.add(p),n.meshes.push(p);const g=n.head;if(g.position.set(0,.65,0),f.add(g),At(g,Tt.head,s,0,0,0,n),t==="CT")At(g,Tt.helmet,o,0,.1,0,n),At(g,Tt.brim,o,0,.02,-.14,n);else{At(g,Tt.helmet,o,0,.13,0,n);const h=new Fe(new Te(.235,.1,.235),o);h.position.set(0,-.05,0),h.castShadow=!0,g.add(h),n.meshes.push(h)}n.shoulderR.position.set(-.27,.4,0),n.shoulderL.position.set(.27,.4,0),f.add(n.shoulderR,n.shoulderL),At(n.shoulderR,Tt.upperArm,i,0,-.15,0,n),At(n.shoulderL,Tt.upperArm,i,0,-.15,0,n),At(n.shoulderL,Tt.band,l,0,-.06,0,n),n.elbowR.position.set(0,-.3,0),n.elbowL.position.set(0,-.3,0),n.shoulderR.add(n.elbowR),n.shoulderL.add(n.elbowL),At(n.elbowR,Tt.foreArm,i,0,-.14,0,n),At(n.elbowL,Tt.foreArm,i,0,-.14,0,n),At(n.elbowR,Tt.hand,a,0,-.31,-.01,n),At(n.elbowL,Tt.hand,a,0,-.31,-.01,n),n.weapon.position.set(.02,.3,-.22),f.add(n.weapon),n.hipR.position.set(-.115,.92,0),n.hipL.position.set(.115,.92,0),d.add(n.hipR,n.hipL),At(n.hipR,Tt.thigh,c,0,-.23,0,n),At(n.hipL,Tt.thigh,c,0,-.23,0,n),n.kneeR.position.set(0,-.46,0),n.kneeL.position.set(0,-.46,0),n.hipR.add(n.kneeR),n.hipL.add(n.kneeL),At(n.kneeR,Tt.shin,c,0,-.22,0,n),At(n.kneeL,Tt.shin,c,0,-.22,0,n),At(n.kneeR,Tt.foot,u,0,-.42,-.05,n),At(n.kneeL,Tt.foot,u,0,-.42,-.05,n);const x=new Dc(.13,.26,4),m=new Qi({color:t==="CT"?7317724:14721098,transparent:!0,opacity:.9,depthTest:!1});return n.marker=new Fe(x,m),n.marker.rotation.x=Math.PI,n.marker.position.set(0,2.25,0),n.marker.renderOrder=999,n.marker.visible=!1,d.add(n.marker),n}const fs={shoulderR:-1.06,elbowR:-.72,shoulderRz:-.2,shoulderL:-1.02,elbowL:-.92,shoulderLz:.26};function R2(t,e,n,i,r,s){const o=e.body;t.root.position.set(o.x,o.y,o.z),t.root.rotation.y=e.alive?e.yaw:e.deathYaw;const a=Math.hypot(o.vx,o.vz),l=pt(a/4.6,0,1.35);if(!e.alive){const g=pt((i-e.deathTime)/.45,0,1);t.upper.rotation.x=0,t.root.rotation.z=-Math.PI/2*.92*g,t.root.position.y=o.y+.15*g,t.hipR.rotation.x=.25,t.hipL.rotation.x=-.15,t.kneeR.rotation.x=.35,t.kneeL.rotation.x=.2,t.shoulderR.rotation.set(-.3,0,-.7),t.shoulderL.rotation.set(-.2,0,.7),t.elbowR.rotation.x=-.2,t.elbowL.rotation.x=-.2,t.marker.visible=!1,t.weapon.visible=!1;return}t.root.rotation.z=0,t.weapon.visible=!0;const c=e.animPhase*3.2,u=Math.sin(c)*.72*l,d=Math.sin(c+Math.PI)*.72*l;t.hipR.rotation.x=u,t.hipL.rotation.x=d,t.kneeR.rotation.x=Math.max(0,-u)*.85+.05,t.kneeL.rotation.x=Math.max(0,-d)*.85+.05;const f=Math.abs(Math.sin(c))*.035*l;t.upper.position.y=.98+f-(o.onGround?0:.02),t.upper.rotation.x=e.pitch*.85,t.head.rotation.x=-e.pitch*.18;const p=Math.sin(c)*.06*l;t.shoulderR.rotation.set(fs.shoulderR+p,0,fs.shoulderRz),t.shoulderL.rotation.set(fs.shoulderL-p,0,fs.shoulderLz),t.elbowR.rotation.x=fs.elbowR,t.elbowL.rotation.x=fs.elbowL,o.onGround||(t.hipR.rotation.x=.45,t.hipL.rotation.x=-.15,t.kneeR.rotation.x=.75,t.kneeL.rotation.x=.25),t.marker.visible=s&&r,t.marker.visible&&(t.marker.rotation.y+=n*1.6)}const S0=2762274;function qu(t,e,n,i,r=.6,s=.1){const o=new Fe(new Te(t,e,n),new Vt({color:i,roughness:r,metalness:s}));return o.castShadow=!1,o.receiveShadow=!1,o}function P2(t){const n=Bn[t].viewModel,i=new vt;if(n.blade){const v=qu(.035,.045,.15,n.bodyColor,.85);v.position.set(0,0,.04);const _=qu(.016,.075,.24,n.metalColor,.18,.9);_.position.set(0,.045,-.16),_.rotation.x=-.08;const S=qu(.055,.016,.02,n.accentColor,.4,.6);S.position.set(0,.012,-.035),i.add(v,_,S);const C=new yt;return C.position.set(0,.06,-.26),i.add(C),{group:i,muzzle:C}}const r=new Vt({color:n.bodyColor,roughness:.62,metalness:.22}),s=new Vt({color:n.metalColor,roughness:.32,metalness:.75}),o=new Vt({color:n.accentColor,roughness:.75,metalness:.1}),a=(v,_)=>{const S=new Fe(v,_);return S.castShadow=!1,S},l=n.length*.44,c=a(new Te(.085,.115,l),r);c.position.set(0,0,0),i.add(c);const u=a(new Te(.055,.016,l*.85),o);u.position.set(0,.062,-.01),i.add(u);const d=a(new Jn(.022,.022,n.barrel,10),s);if(d.rotation.x=Math.PI/2,d.position.set(0,.028,-(l/2+n.barrel/2)),i.add(d),t==="awp"){const v=a(new Jn(.032,.032,n.barrel*.35,10),s);v.rotation.x=Math.PI/2,v.position.set(0,.028,-(l/2+n.barrel*.16)),i.add(v)}const f=a(new Te(.07,.07,Math.max(.1,n.barrel*.5)),r);if(f.position.set(0,.012,-(l/2+Math.max(.1,n.barrel*.5)/2+.01)),i.add(f),n.magSize>0){const v=a(new Te(.062,n.magSize,.085),t==="ak47"?r:o);v.position.set(0,-.07-n.magSize/2,.03),v.rotation.x=-.14,i.add(v)}const p=a(new Te(.058,.13,.07),o);if(p.position.set(0,-.085,l*.26),p.rotation.x=.3,i.add(p),n.hasStock){const v=a(new Te(.072,.1,n.length*.24),o);v.position.set(0,-.015,l/2+n.length*.11),i.add(v);const _=a(new Te(.085,.13,.04),o);_.position.set(0,-.015,l/2+n.length*.23),i.add(_)}else{const v=a(new Te(.072,.055,l*.75),s);v.position.set(0,.07,-.02),i.add(v)}if(n.hasScope){const v=a(new Jn(.038,.038,.24,12),s);v.rotation.x=Math.PI/2,v.position.set(0,.105,-.03),i.add(v);const _=a(new Jn(.036,.036,.012,12),new Vt({color:1053720,roughness:.1,metalness:.4}));_.rotation.x=Math.PI/2,_.position.set(0,.105,-.152),i.add(_);const S=a(new Jn(.042,.042,.02,12),o);S.rotation.x=Math.PI/2,S.position.set(0,.105,.088),i.add(S)}const g=a(new Te(.05,.022,.02),s);g.position.set(0,.078,.02),i.add(g);const x=a(new Te(.085,.085,.1),new Vt({color:S0,roughness:.95}));x.position.set(.01,-.1,l*.3),x.rotation.set(.25,0,.1),i.add(x);const m=a(new Te(.09,.09,.11),new Vt({color:S0,roughness:.95}));m.position.set(-.035,-.02,-(l*.18+(n.barrel>0?n.barrel*.2:.05))),m.rotation.set(-.15,.1,-.2),i.add(m);const h=new yt;return h.position.set(0,.028,-(l/2+n.barrel)),i.add(h),i.scale.setScalar(.82),{group:i,muzzle:h}}function L2(t){const e=new vt;t.add(e);const n=new vt;e.add(n);const i=new Dc(.09,.26,6),r=new Qi({color:16765066,transparent:!0,opacity:0,depthWrite:!1,blending:ic,side:ui}),s=new Fe(i,r);s.rotation.x=-Math.PI/2,s.visible=!1,e.add(s);const o=new x2(16759654,0,6,2);e.add(o);const a=new vt;return e.add(a),e.position.set(.255,-.25,-.57),e.rotation.set(0,.1,0),{root:e,gun:n,muzzle:new yt,flash:s,flashLight:o,hands:a,id:null,kick:0,kickVel:0,swayX:0,swayY:0,bobPhase:0,reloadT:0,drawT:0,lastYaw:0,lastPitch:0}}function M0(t,e){if(t.id===e)return;t.id=e,t.gun.clear();const{group:n,muzzle:i}=P2(e);t.gun.add(n),t.muzzle=i,t.drawT=1}function I2(t,e){const n=Bn[t].ads!==null,i=t==="knife"?.3:.255,r=t==="knife"?-.26:-.25,s=t==="knife"?-.48:-.57,o=t==="knife"?.22:.1;return n?{x:Nn(i,0,e),y:Nn(r,-.078,e),z:Nn(s,-.26,e),rx:Nn(0,0,e),ry:Nn(o,0,e),rz:0}:{x:Nn(i,.1,e),y:Nn(r,-.145,e),z:Nn(s,-.42,e),rx:Nn(0,0,e),ry:Nn(o,.03,e),rz:0}}function D2(t,e){const n=e.dt,i=t.id??"knife";if(t.kickVel+=-t.kick*260*n-t.kickVel*26*n,e.firedThisFrame){const m=Bn[i];t.kickVel+=m.recoil.punch*9.5,t.flash.visible=!0,t.flash.material.opacity=.95,t.flashLight.intensity=7.5,t.flash.scale.setScalar(m.audio.gain)}if(t.kick+=t.kickVel*n,t.kick=pt(t.kick,-.02,.16),t.flash.visible){const m=t.flash.material;m.opacity=Math.max(0,m.opacity-n*26),t.flashLight.intensity=Math.max(0,t.flashLight.intensity-n*130),m.opacity<=.01&&(t.flash.visible=!1);const h=new B;t.muzzle.getWorldPosition(h),t.root.worldToLocal(h),t.flash.position.copy(h),t.flashLight.position.copy(h)}const r=e.yaw-t.lastYaw,s=e.pitch-t.lastPitch;t.lastYaw=e.yaw,t.lastPitch=e.pitch;const o=1-e.adsAmount*.75;t.swayX=Zi(t.swayX,pt(-r*2.2,-.06,.06),12,n)*o,t.swayY=Zi(t.swayY,pt(-s*2.2,-.06,.06),12,n)*o;const a=e.onGround&&e.speed>.5,l=6.2+e.speed*1.15;t.bobPhase+=e.speed*n*l*.35;const c=a?pt(e.speed/5,0,1)*.022*(1-e.adsAmount*.8):0,u=Math.cos(t.bobPhase)*c,d=Math.abs(Math.sin(t.bobPhase))*c*.9,f=e.reloading?1:0;t.reloadT=Zi(t.reloadT,f,e.reloading?12:9,n);const p=Math.sin(e.reloadProgress*Math.PI)*t.reloadT;t.drawT=Zi(t.drawT,e.drawing?1:0,9,n);const g=I2(i,e.adsAmount),x=t.root;x.position.x=g.x+t.swayX+u,x.position.y=g.y+t.swayY+d-p*.16-t.drawT*.22,x.position.z=g.z+t.kick*.55,x.rotation.x=g.rx-t.kick*1.5+p*.5+t.drawT*.5,x.rotation.y=g.ry+t.swayX*1.6+p*.35,x.rotation.z=g.rz+t.swayX*.8+p*.45+t.drawT*.3,t.gun.rotation.x=-e.recoilPitch*1.6,t.gun.position.z=0}const Yu=78,ul=48,$u=.075;class N2{constructor(e,n){te(this,"renderer");te(this,"scene",new d2);te(this,"camera");te(this,"world");te(this,"rigs",new Map);te(this,"vm");te(this,"bombMesh");te(this,"bombLed");te(this,"tracerGeo");te(this,"tracerMesh");te(this,"sun");te(this,"bobPhase",0);te(this,"bobOffset",0);te(this,"lastSpeed",0);te(this,"qualitySamples",0);te(this,"qualityTime",0);te(this,"shadowTier",1);te(this,"pixelRatio",Math.min(window.devicePixelRatio,1.75));te(this,"fps",0);te(this,"shake",0);te(this,"lastFired",new Map);te(this,"onResize",()=>{const e=window.innerWidth,n=window.innerHeight;this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75))});this.renderer=new f2({canvas:e,antialias:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Wv,this.renderer.toneMapping=jv,this.renderer.toneMappingExposure=1.05,this.camera=new En(Yu,window.innerWidth/window.innerHeight,.06,400),this.camera.rotation.order="YXZ",this.scene.add(this.camera);const i=A_(),r=new Fe(new fc(320,24,16),new Qi({map:i.sky,side:rn,fog:!1,depthWrite:!1}));r.name="sky",this.scene.add(r),this.scene.fog=new Oh(13616043,70,300);const s=new v2(13624063,12626045,.85);this.scene.add(s);const o=new M2(16777215,.28);this.scene.add(o),this.sun=new S2(16773846,1.65),this.sun.position.set(48,88,-34),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1536,1536);const a=this.sun.shadow.camera;a.left=-78,a.right=78,a.top=62,a.bottom=-62,a.near=1,a.far=260,this.sun.shadow.bias=-9e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun),this.scene.add(this.sun.target),this.world=w2(n.grid),this.scene.add(this.world.group),this.addSiteMarkers(),this.addSpawnMarkers(n);for(const x of n.combatants)this.addRig(n,x.id);this.vm=L2(this.camera);const l=n.currentWeaponId(n.byId(n.playerId));M0(this.vm,l);const c=new vt,u=new Fe(new Te(.34,.16,.24),new Vt({color:1908772,roughness:.7,metalness:.2})),d=new Fe(new Te(.2,.08,.02),new Vt({color:2830133,roughness:.5,metalness:.4}));d.position.set(0,.02,-.125),this.bombLed=new Fe(new fc(.032,8,6),new Qi({color:16724e3})),this.bombLed.position.set(.1,.06,-.13);const f=new Fe(new Jn(.008,.008,.16,6),new Vt({color:5593696,roughness:.4,metalness:.6}));f.position.set(-.13,.15,.06),c.add(u,d,this.bombLed,f),c.traverse(x=>{x.isMesh&&(x.castShadow=!0)}),c.visible=!1,this.bombMesh=c,this.scene.add(c),this.tracerGeo=new Pn;const p=new Float32Array(ul*2*3),g=new Float32Array(ul*2*3);this.tracerGeo.setAttribute("position",new An(p,3)),this.tracerGeo.setAttribute("color",new An(g,3)),this.tracerMesh=new g2(this.tracerGeo,new E_({vertexColors:!0,transparent:!0,opacity:.85,blending:ic,depthWrite:!1})),this.tracerMesh.frustumCulled=!1,this.scene.add(this.tracerMesh),window.addEventListener("resize",this.onResize)}addSiteMarkers(){for(const e of Qs){const n=e.x1-e.x0,i=e.z1-e.z0,r=new _a(n,i),s=new Qi({color:e.id==="A"?14245692:3973337,transparent:!0,opacity:.16,depthWrite:!1}),o=new Fe(r,s);o.rotation.x=-Math.PI/2,o.position.set((e.x0+e.x1)/2,.015,(e.z0+e.z1)/2),o.renderOrder=1,this.scene.add(o)}}addSpawnMarkers(e){const n=(i,r,s)=>{const o=new Fe(new Bh(2.2,2.6,20),new Qi({color:s,transparent:!0,opacity:.28,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.set(i,.02,r),this.scene.add(o)};n(-33,30,14721098),n(40,-36,7317724)}addRig(e,n){const i=e.byId(n);if(!i)return;const r=C2(i.team);this.scene.add(r.root),this.rigs.set(n,{rig:r,weaponId:""})}syncWeapon(e,n){if(e.weaponId===n)return;e.weaponId=n,e.rig.weapon.clear();const{group:i}=b2(n,1);e.rig.weapon.add(i)}update(e,n,i){const r=e.time,s=e.cameraCombatant();for(const a of e.combatants){const l=this.rigs.get(a.id);if(!l){this.addRig(e,a.id);continue}this.syncWeapon(l,e.currentWeaponId(a));const c=s!==null&&a.id===s.id;l.rig.root.visible=!c;const u=s!==null&&a.team===s.team&&a.id!==s.id;R2(l.rig,a,n,r,u,!c)}if(s){const a=s.body.y+pi.eyeHeight,l=Math.hypot(s.body.vx,s.body.vz);this.lastSpeed=Zi(this.lastSpeed,l,8,n),s.body.onGround&&l>.6?(this.bobPhase+=l*n*3.1,this.bobOffset=Zi(this.bobOffset,Math.sin(this.bobPhase)*.026*pt(l/4.6,0,1.2),18,n)):this.bobOffset=Zi(this.bobOffset,0,6,n),s.body.onGround&&this.lastSpeed>3.5&&this.shake<.05&&(this.shake=.045),this.shake=Math.max(0,this.shake-n*.35),this.camera.position.set(s.body.x,a+this.bobOffset+(Math.random()-.5)*this.shake*.5,s.body.z),this.camera.rotation.set(s.pitch,s.yaw,0);const c=Math.cos(s.yaw)*s.body.vx-Math.sin(s.yaw)*s.body.vz;this.camera.rotation.z=Zi(this.camera.rotation.z,-c*.006,8,n)}if(s){const a=Bn[e.currentWeaponId(s)],l=a.ads?Nn(Yu,a.ads.fov,s.adsAmount):Yu;Math.abs(this.camera.fov-l)>.01&&(this.camera.fov=l,this.camera.updateProjectionMatrix())}if(s&&i){const a=e.currentState(s),l=Bn[e.currentWeaponId(s)];M0(this.vm,l.id);const c=this.lastFired.get(s.id)??-99,u=r-c<.05;this.vm.root.visible=!0,D2(this.vm,{dt:n,yaw:s.yaw,pitch:s.pitch,speed:Math.hypot(s.body.vx,s.body.vz),onGround:s.body.onGround,adsAmount:s.adsAmount,recoilPitch:s.recoilPitch,reloading:a?a.reloading:!1,reloadProgress:a&&a.reloading?pt(1-(a.reloadEnd-r)/l.reloadTime,0,1):0,drawing:a?r<a.readyTime:!1,firedThisFrame:u}),this.vm.root.visible=!(l.ads&&l.ads.scope&&s.adsAmount>.92)}else this.vm.root.visible=!1;if(s&&e.tracers.length>0){const a=e.tracers[e.tracers.length-1];r-a.time<.02&&Math.hypot(a.x0-s.body.x,a.z0-s.body.z)<.8&&this.lastFired.set(s.id,r)}const o=e.bomb;if(o.state==="dropped"||o.state==="planted"){this.bombMesh.visible=!0,this.bombMesh.position.set(o.x,o.state==="planted"?.08:.09,o.z),this.bombMesh.rotation.y=o.state==="planted"?.4:r*.4;const a=o.state==="planted"?Math.sin(r*(o.timer<10?22:9))>0?1:.12:Math.sin(r*5)>0?1:.2;this.bombLed.material.color.setRGB(a,a*.12,a*.08)}else this.bombMesh.visible=!1;this.updateTracers(e,r),s&&(this.sun.position.set(s.body.x+48,88,s.body.z-34),this.sun.target.position.set(s.body.x,0,s.body.z),this.sun.target.updateMatrixWorld()),this.tickQuality(n*1e3)}updateTracers(e,n){const i=this.tracerGeo.getAttribute("position"),r=this.tracerGeo.getAttribute("color"),s=i.array,o=r.array;let a=0;for(const l of e.tracers){if(a>=ul)break;const c=(n-l.time)/$u;if(c<0||c>1)continue;const u=1-c,d=a*6;s[d]=l.x0,s[d+1]=l.y0,s[d+2]=l.z0,s[d+3]=l.x1,s[d+4]=l.y1,s[d+5]=l.z1;const f=Bn[l.weapon],p=f.category==="melee"?.6:1;o[d]=p*u,o[d+1]=(f.id==="awp"?.85:.72)*u,o[d+2]=.42*u,o[d+3]=p*u*.35,o[d+4]=.5*u*.35,o[d+5]=.2*u*.35,a++}for(let l=a;l<ul;l++){const c=l*6;s[c]=0,s[c+1]=-999,s[c+2]=0,s[c+3]=0,s[c+4]=-999,s[c+5]=0,o[c]=0,o[c+1]=0,o[c+2]=0,o[c+3]=0,o[c+4]=0,o[c+5]=0}i.needsUpdate=!0,r.needsUpdate=!0,e.tracers.length>0&&n-e.tracers[0].time>$u*4&&(e.tracers=e.tracers.filter(l=>n-l.time<=$u*2))}render(){this.renderer.render(this.scene,this.camera)}tickQuality(e){if(this.qualityTime+=e,this.qualitySamples++,this.qualitySamples<90)return;const n=this.qualityTime/this.qualitySamples;this.qualityTime=0,this.qualitySamples=0,this.fps=Math.round(1e3/Math.max(1,n)),n>26&&this.shadowTier===1?(this.shadowTier=0,this.sun.castShadow=!1,this.renderer.shadowMap.enabled=!1,this.renderer.shadowMap.needsUpdate=!0):n>40&&this.pixelRatio>1&&(this.pixelRatio=1,this.renderer.setPixelRatio(1),this.renderer.setSize(window.innerWidth,window.innerHeight,!1))}dispose(){window.removeEventListener("resize",this.onResize),this.renderer.dispose()}muzzleWorld(e){return this.vm.muzzle.getWorldPosition(e)}forward(){return Wo(this.camera.rotation.y,this.camera.rotation.x)}}const Ns=208,Us=166,U2={T_SPAWN:"#6d5b42",CT_SPAWN:"#3d4d61",A_SITE:"#7a5f42",B_SITE:"#7a5f42",A_LONG:"#5f5340",MID:"#574c3b",MID_DOORS:"#6a5a44",CATWALK:"#655442",TOP_MID:"#5b5140",CT_MID:"#49505e",B_DOORS:"#5a5348",B_TUNNEL:"#544936",TUNNEL_BEND:"#544936",UPPER_TUNNEL:"#544936"};function k2(t){const e=document.createElement("canvas");e.width=Ns,e.height=Us;const n=e.getContext("2d");n.fillStyle="#14171c",n.fillRect(0,0,Ns,Us);const i=Ns/(t.cols*t.cell),r=Us/(t.rows*t.cell);for(let o=0;o<t.rows;o++)for(let a=0;a<t.cols;a++){const l=t.idx(a,o);if(t.walkable[l]!==1)continue;const c=t.region[l],u=c>0?Cc[c-1].id:"";n.fillStyle=U2[u]??"#5a5140";const d=(t.minXOf(a)-t.ox)*i,f=(t.minZOf(o)-t.oz)*r;n.fillRect(d,f,t.cell*i+.6,t.cell*r+.6)}for(const o of Qs){n.strokeStyle=o.id==="A"?"rgba(230,110,70,0.85)":"rgba(90,170,230,0.85)",n.lineWidth=1.4;const a=(o.x0-t.ox)*i,l=(o.z0-t.oz)*r;n.strokeRect(a,l,(o.x1-o.x0)*i,(o.z1-o.z0)*r),n.fillStyle=o.id==="A"?"rgba(230,110,70,0.13)":"rgba(90,170,230,0.13)",n.fillRect(a,l,(o.x1-o.x0)*i,(o.z1-o.z0)*r)}n.font="7px Segoe UI, sans-serif",n.fillStyle="rgba(255,255,255,0.42)",n.textAlign="center";const s=[{x:-44,z:-34,t:"A"},{x:39,z:-8,t:"B"},{x:-33,z:30,t:"T"},{x:40,z:-36,t:"CT"},{x:-50,z:0,t:"A大"},{x:-7,z:0,t:"中"},{x:-28,z:-33,t:"猫"}];for(const o of s)n.fillText(o.t,(o.x-t.ox)*i,(o.z-t.oz)*r+2.5);return e}function z2({grid:t,combatants:e,bomb:n,cameraId:i,cameraTeam:r,yaw:s}){const o=je.useRef(null),a=je.useMemo(()=>k2(t),[t]);return je.useEffect(()=>{const l=o.current;if(!l)return;const c=l.getContext("2d"),u=Ns/(t.cols*t.cell),d=Us/(t.rows*t.cell),f=g=>(g-t.ox)*u,p=g=>(g-t.oz)*d;if(c.clearRect(0,0,Ns,Us),c.drawImage(a,0,0),n.state==="planted"||n.state==="dropped"){const g=f(n.x),x=p(n.z);if(n.state==="planted"){const m=4+(Math.sin(performance.now()/110)*1.6+1.6);c.fillStyle="#ff3b2e",c.beginPath(),c.arc(g,x,m,0,Math.PI*2),c.fill()}else c.fillStyle="rgba(255,190,60,0.95)",c.fillRect(g-2.5,x-2.5,5,5)}for(const g of e){if(!g.alive)continue;const x=f(g.body.x),m=p(g.body.z),h=g.team===r,v=g.id===i;if(v){c.fillStyle="rgba(255,255,255,0.16)",c.beginPath(),c.moveTo(x,m);const S=-Math.sin(s),C=-Math.cos(s),A=.55;c.lineTo(x+(S*Math.cos(A)-C*Math.sin(A))*26,m+(C*Math.cos(A)+S*Math.sin(A))*26),c.lineTo(x+(S*Math.cos(-A)-C*Math.sin(-A))*26,m+(C*Math.cos(-A)+S*Math.sin(-A))*26),c.closePath(),c.fill(),c.fillStyle="#ffffff",c.beginPath(),c.moveTo(x+S*4.6,m+C*4.6),c.lineTo(x-C*2.8-S*2,m+S*2.8-C*2),c.lineTo(x+C*2.8-S*2,m-S*2.8-C*2),c.closePath(),c.fill();continue}const _=g.__spotted;!h&&!_||(c.fillStyle=h?g.team==="CT"?"#6fa8dc":"#e0a04a":"#ff5a4a",c.beginPath(),c.arc(x,m,v?3.4:3,0,Math.PI*2),c.fill(),c.strokeStyle="rgba(0,0,0,0.7)",c.lineWidth=.8,c.stroke(),g.hasBomb&&h&&(c.strokeStyle="#ffb020",c.lineWidth=1.2,c.beginPath(),c.arc(x,m,5.2,0,Math.PI*2),c.stroke()))}}),P.jsxs("div",{className:"minimap",children:[P.jsx("div",{className:"mm-title",children:"DUST2"}),P.jsx("canvas",{ref:o,width:Ns,height:Us})]})}const E0={ak47:"AK-47",m4a4:"M4A4",awp:"AWP",glock:"GLOCK",usp:"USP-S",deagle:"DEAGLE",knife:"KNIFE"};function F2({spread:t,scoped:e,hidden:n}){if(n||e)return null;const i=Math.min(34,5+t*620),r=8,s=30,o=(a,l,c,u)=>({width:a,height:l,left:c,top:u});return P.jsxs("div",{className:"crosshair",children:[P.jsx("i",{style:o(2,r,s-1,s-i-r)}),P.jsx("i",{style:o(2,r,s-1,s+i)}),P.jsx("i",{style:o(r,2,s-i-r,s-1)}),P.jsx("i",{style:o(r,2,s+i,s-1)}),P.jsx("i",{className:"dot",style:{left:29,top:29}})]})}function O2({headshot:t,killed:e}){const n=e?13:9,i=e?11:8,r=17;return P.jsxs("div",{className:`hitmarker${t?" head":""}`,children:[P.jsx("i",{style:{width:2,height:i,left:r-1,top:r-n-i}}),P.jsx("i",{style:{width:2,height:i,left:r-1,top:r+n}}),P.jsx("i",{style:{width:i,height:2,left:r-n-i,top:r-1}}),P.jsx("i",{style:{width:i,height:2,left:r+n,top:r-1}})]})}function B2(){return P.jsxs("div",{className:"scope-wrap",children:[P.jsx("div",{className:"scope-mask"}),P.jsx("div",{className:"scope-ring"}),P.jsxs("div",{className:"scope-cross",children:[P.jsx("i",{style:{left:"50%",top:0,width:1.5,height:"100%",marginLeft:-.75}}),P.jsx("i",{style:{top:"50%",left:0,height:1.5,width:"100%",marginTop:-.75}})]}),[0,1,2,3].map(t=>P.jsx("div",{children:[1,2,3].map(e=>{const n=6+e*5,i=t%2===0;return P.jsx("div",{className:"scope-tick",style:i?{left:"50%",top:`calc(50% + ${t<2?n:-n}vmin)`,width:e===2?9:6,height:1.5,marginLeft:-3}:{top:"50%",left:`calc(50% + ${t===1?n:-n}vmin)`,height:e===2?9:6,width:1.5,marginTop:-3}},e)})},t)),P.jsx("div",{style:{position:"absolute",left:"50%",top:"50%",width:3,height:3,marginLeft:-1.5,marginTop:-1.5,background:"#000",borderRadius:"50%"}})]})}function H2({snap:t,grid:e,combatants:n,bomb:i,cameraId:r,cameraYaw:s,scoreboardOpen:o}){const a=t.self,l=t.round,c=a?.team??"CT",u=je.useRef(0);je.useEffect(()=>{t.hitmarker&&(u.current=performance.now())},[t.hitmarker]);const d=!!a&&a.alive&&a.health<=30,f=`${Math.floor(Math.max(0,l.timeLeft)/60)}:${String(Math.floor(Math.max(0,l.timeLeft)%60)).padStart(2,"0")}`;return P.jsxs("div",{className:"hud",children:[a&&!a.alive&&P.jsx("div",{className:"dead-overlay"}),d&&P.jsx("div",{className:"low-hp"}),a&&a.hitFlash>.02&&P.jsx("div",{className:"vignette",style:{opacity:a.hitFlash}}),P.jsxs("div",{className:"top-bar",children:[P.jsxs("div",{className:"score",children:[P.jsx("span",{className:"ct",children:l.scoreCT}),P.jsx("span",{className:"sep",children:":"}),P.jsx("span",{className:"t",children:l.scoreT})]}),P.jsx("div",{className:`timer${l.timeLeft<20&&l.phase==="live"?" urgent":""}`,children:l.phase==="freeze"?`准备 ${Math.ceil(l.timeLeft)}`:f}),P.jsxs("div",{className:"alive",children:[P.jsxs("span",{children:[P.jsx("b",{style:{color:"var(--ct)"},children:t.aliveCT})," CT"]}),P.jsxs("span",{children:[P.jsx("b",{style:{color:"var(--t)"},children:t.aliveT})," T"]})]})]}),P.jsx("div",{className:"killfeed",children:t.killfeed.slice().reverse().map(p=>P.jsxs("div",{className:`kf-row${p.killerId===a?.id||p.victimId===a?.id?" me":""}`,children:[P.jsx("span",{className:p.killerTeam==="CT"?"ct":"t",children:p.killerName}),P.jsx("span",{className:"w",children:E0[p.weapon]??p.weapon}),p.headshot&&P.jsx("span",{className:"hs",children:"HS"}),P.jsx("span",{className:"w",children:"›"}),P.jsx("span",{className:p.victimTeam==="CT"?"ct":"t",children:p.victimName})]},p.id))}),t.banner&&P.jsx("div",{className:"banner",children:t.banner}),i.state==="planted"&&P.jsxs("div",{className:"bomb-panel",children:[P.jsx("div",{className:"bt",children:i.timer.toFixed(1)}),P.jsxs("div",{className:"bl",children:["C4 已安放于 ",i.site," 点 — 按 E 拆除"]}),P.jsx("div",{className:"bomb-track",children:P.jsx("span",{style:{width:`${i.timer/40*100}%`}})})]}),a&&a.plantProgress>.01&&i.state!=="planted"&&P.jsxs("div",{className:"plant-panel",children:[P.jsx("div",{className:"pl",children:"正在安放 C4… 保持静止"}),P.jsx("div",{className:"plant-track",children:P.jsx("span",{style:{width:`${a.plantProgress*100}%`}})})]}),a&&a.defuseProgress>.01&&i.state==="planted"&&P.jsxs("div",{className:"plant-panel defuse",children:[P.jsxs("div",{className:"pl",children:[a.kit?"拆弹钳":"手动","拆除中… 保持静止"]}),P.jsx("div",{className:"plant-track",children:P.jsx("span",{style:{width:`${a.defuseProgress*100}%`}})})]}),a&&a.canPlant&&i.state!=="planted"&&a.plantProgress<.01&&P.jsx("div",{className:"plant-panel",children:P.jsxs("div",{className:"pl",children:["在 ",t.attackSite==="A"?"A":"B"," 点按住 ",P.jsx("b",{children:"E"})," 安放 C4"]})}),P.jsx(F2,{spread:a?.spread??0,scoped:!!a?.scoped,hidden:!a||!a.alive||o}),a?.scoped&&P.jsx(B2,{}),t.hitmarker&&P.jsx(O2,{headshot:t.hitmarker.headshot,killed:t.hitmarker.killed}),a&&a.hitFlash>.05&&a.alive&&P.jsx("div",{className:"damage-dir",children:P.jsx("i",{style:{transform:`rotate(${(a.hitFromAngle+s)*(180/Math.PI)}deg)`,opacity:a.hitFlash}})}),a&&P.jsxs("div",{className:"bottom-bar",children:[P.jsxs("div",{className:"vitals",children:[P.jsxs("div",{className:"vital-row",children:[P.jsx("div",{className:"vital-icon",style:{color:"var(--hp)"},children:"♥"}),P.jsx("div",{className:"vital-bar",children:P.jsx("span",{style:{width:`${a.health}%`,background:a.health>40?"var(--hp)":"var(--hp-low)"}})}),P.jsx("div",{className:"vital-num",children:a.health})]}),P.jsxs("div",{className:"vital-row",children:[P.jsx("div",{className:"vital-icon",style:{color:"var(--armor)"},children:"🛡"}),P.jsx("div",{className:"vital-bar",children:P.jsx("span",{style:{width:`${Math.min(100,a.armor)}%`,background:"var(--armor)"}})}),P.jsxs("div",{className:"vital-num",children:[a.armor,a.helmet?P.jsx("small",{children:"盔"}):null]})]}),P.jsx("div",{style:{fontSize:11,color:"var(--dim)",marginTop:2},children:a.hasBomb?"★ 你携带 C4":a.team==="CT"?a.kit?"拆弹钳 · 5 秒拆除":"无拆弹钳 · 10 秒拆除":`进攻目标 ${t.attackSite} 点`})]}),P.jsxs("div",{className:"ammo-block",children:[P.jsx("div",{className:"ammo-name",children:E0[a.weaponId]??a.weaponName}),a.weaponId!=="knife"?P.jsxs("div",{className:"ammo-main",children:[a.ammo,P.jsxs("span",{className:"reserve",children:[" / ",a.reserve]})]}):P.jsx("div",{className:"ammo-main",style:{fontSize:22},children:"近战"}),P.jsx("div",{className:"ammo-reloading",children:a.reloading?"换弹中…":a.ammo===0&&a.weaponId!=="knife"?"按 R 换弹":""}),a.reloading&&P.jsx("div",{className:"reload-track",children:P.jsx("span",{style:{width:`${a.reloadProgress*100}%`}})}),P.jsxs("div",{className:"slot-row",children:[a.hasPrimary&&P.jsx("span",{className:`slot-chip${a.slot==="primary"?" on":""}`,children:"1 主武器"}),a.hasSecondary&&P.jsx("span",{className:`slot-chip${a.slot==="secondary"?" on":""}`,children:"2 副武器"}),P.jsx("span",{className:`slot-chip${a.slot==="melee"?" on":""}`,children:"3 刀"})]})]})]}),P.jsx(z2,{grid:e,combatants:n,bomb:i,cameraId:r,cameraTeam:c,yaw:s}),t.spectate&&P.jsxs("div",{className:"spectate-bar",children:[P.jsxs("div",{children:["观战 ",P.jsx("b",{children:t.spectate.name})]}),P.jsx("div",{className:"hint",children:"滚轮切换队友 · 按 F 接管操控 · 你仍可继续本回合"})]}),!t.spectate&&P.jsxs("div",{className:"hint-corner",children:[P.jsx("b",{children:"Tab"})," 计分板 · ",P.jsx("b",{children:"Esc"})," 暂停",P.jsx("br",{}),P.jsx("b",{children:"1/2/3"})," 切换武器 · ",P.jsx("b",{children:"R"})," 换弹"]}),o&&P.jsxs("div",{className:"scoreboard",children:[P.jsxs("h3",{children:["第 ",l.number," 回合 · ",l.isPistol?"手枪局":"长枪局"," — CT ",l.scoreCT," : ",l.scoreT," T"]}),["CT","T"].map(p=>P.jsxs("div",{className:`sb-team ${p.toLowerCase()}`,children:[P.jsxs("div",{className:"th",children:[p==="CT"?"反恐精英 (CT)":"恐怖分子 (T)"," — ",p==="CT"?t.aliveCT:t.aliveT," 存活"]}),P.jsxs("table",{className:"sb-table",children:[P.jsx("thead",{children:P.jsxs("tr",{children:[P.jsx("th",{children:"玩家"}),P.jsx("th",{className:"num",children:"击杀"}),P.jsx("th",{className:"num",children:"死亡"}),P.jsx("th",{className:"num",children:"伤害"}),P.jsx("th",{className:"num",children:"生命"}),P.jsx("th",{className:"num",children:"护甲"})]})}),P.jsx("tbody",{children:t.players.filter(g=>g.team===p).map(g=>P.jsxs("tr",{className:`${g.alive?"":"dead"} ${g.id===a?.id?"me":""}`,children:[P.jsxs("td",{className:"nm",children:[g.isHuman?"★ ":"",g.name,g.hasBomb?" 💼":""]}),P.jsx("td",{className:"num",children:g.kills}),P.jsx("td",{className:"num",children:g.deaths}),P.jsx("td",{className:"num",children:g.damage}),P.jsx("td",{className:"num",children:g.alive?g.health:"—"}),P.jsx("td",{className:"num",children:g.alive?g.armor:"—"})]},g.id))})]})]},p))]})]})}const G2=[{id:"ak47",name:"AK-47",desc:"高伤害 · 后坐力剧烈"},{id:"m4a4",name:"M4A4",desc:"低后坐力 · 高射速"},{id:"awp",name:"AWP",desc:"单发致命 · 右键开镜"},{id:null,name:"不带主武器",desc:"只用手枪"}],V2=[{id:"deagle",name:"沙鹰",desc:"高伤害 · 7 发"},{id:"usp",name:"USP-S",desc:"CT 默认 · 12 发"},{id:"glock",name:"Glock",desc:"T 默认 · 20 发"}];function W2({team:t,prefs:e,onTeam:n,onPrefs:i,onStart:r,title:s,buttonLabel:o}){return P.jsx("div",{className:"start-screen",children:P.jsxs("div",{className:"start-card",children:[P.jsx("h1",{children:"DUST2 · 5v5"}),P.jsx("div",{className:"sub",children:"程序化生成的 3D 第一人称射击原型 — 地图、角色、武器、音效全部由代码生成，无任何外部资源文件"}),P.jsxs("div",{className:"section",children:[P.jsx("div",{className:"label",children:"选择阵营"}),P.jsxs("div",{className:"choice-row",children:[P.jsxs("button",{className:`choice team-ct${t==="CT"?" active":""}`,onClick:()=>n("CT"),children:[P.jsx("span",{className:"n",children:"反恐精英 · CT"}),P.jsx("span",{className:"d",children:"防守 A / B 点，阻止下包并拆弹。默认武器 USP-S。"})]}),P.jsxs("button",{className:`choice team-t${t==="T"?" active":""}`,onClick:()=>n("T"),children:[P.jsx("span",{className:"n",children:"恐怖分子 · T"}),P.jsx("span",{className:"d",children:"携带 C4 进攻 A 或 B 点并安放。默认武器 Glock-18。"})]})]})]}),P.jsxs("div",{className:"section",children:[P.jsx("div",{className:"label",children:"主武器（长枪局生效）"}),P.jsx("div",{className:"choice-row",children:G2.map(a=>P.jsxs("button",{className:`choice${e.primary===a.id?" active":""}`,onClick:()=>i({...e,primary:a.id}),children:[P.jsx("span",{className:"n",children:a.name}),P.jsx("span",{className:"d",children:a.desc})]},a.id??"none"))})]}),P.jsxs("div",{className:"section",children:[P.jsx("div",{className:"label",children:"副武器（长枪局生效）"}),P.jsx("div",{className:"choice-row",children:V2.map(a=>P.jsxs("button",{className:`choice${e.secondary===a.id?" active":""}`,onClick:()=>i({...e,secondary:a.id}),children:[P.jsx("span",{className:"n",children:a.name}),P.jsx("span",{className:"d",children:a.desc})]},a.id))})]}),P.jsxs("div",{className:"section",children:[P.jsx("div",{className:"label",children:"操作"}),P.jsxs("div",{className:"keys",children:[P.jsxs("div",{children:[P.jsx("b",{children:"WASD"})," 移动"]}),P.jsxs("div",{children:[P.jsx("b",{children:"鼠标"})," 转视角"]}),P.jsxs("div",{children:[P.jsx("b",{children:"空格"})," 跳跃"]}),P.jsxs("div",{children:[P.jsx("b",{children:"左键"})," 开火"]}),P.jsxs("div",{children:[P.jsx("b",{children:"右键"})," AWP 开镜"]}),P.jsxs("div",{children:[P.jsx("b",{children:"R"})," 换弹"]}),P.jsxs("div",{children:[P.jsx("b",{children:"Shift"})," 慢走"]}),P.jsxs("div",{children:[P.jsx("b",{children:"E"})," 下包 / 拆包"]}),P.jsxs("div",{children:[P.jsx("b",{children:"1 / 2 / 3"})," 主 / 副 / 刀"]}),P.jsxs("div",{children:[P.jsx("b",{children:"Tab"})," 计分板"]}),P.jsxs("div",{children:[P.jsx("b",{children:"Esc"})," 暂停"]}),P.jsxs("div",{children:[P.jsx("b",{children:"滚轮 + F"})," 观战接管"]})]})]}),P.jsxs("div",{className:"section",style:{marginBottom:10},children:[P.jsx("div",{className:"label",children:"规则"}),P.jsxs("div",{style:{fontSize:12,color:"var(--dim)",lineHeight:1.8},children:["第 1 回合为",P.jsx("b",{style:{color:"var(--text)"},children:"手枪局"}),"：全员只有默认手枪且无护甲。 之后每回合为长枪局（护甲 100）。T 清空 CT 或 C4 爆炸 → T 胜； CT 清空 T 或成功拆包或时间耗尽 → CT 胜。你阵亡后可观战队友，按 ",P.jsx("b",{style:{color:"var(--text)"},children:"F"})," 接管操控。"]})]}),P.jsx("button",{className:"start-btn",onClick:r,children:o??"点击进入战场"}),s?null:P.jsxs("div",{style:{fontSize:11,color:"var(--dim)",textAlign:"center",marginTop:10},children:["共 10 人：你 + 4 名 AI 队友 vs 5 名 AI 敌人 · 武器库 ",Object.keys(Bn).length," 种"]})]})})}const Ku=1/60,w0=5,X2=55;function j2(){const t=je.useRef(null),e=je.useRef(null),n=je.useRef(null),i=je.useRef(null),r=je.useRef(0),[s,o]=je.useState("menu"),[a,l]=je.useState(!1),[c,u]=je.useState(null),[d,f]=je.useState(!1),[p,g]=je.useState("CT"),[x,m]=je.useState({primary:"ak47",secondary:"deagle"}),[h,v]=je.useState(!1),_=je.useRef(!1),S=je.useRef(x);S.current=x;const C=je.useRef(s);C.current=s;const A=je.useCallback(z=>{_.current=z,l(z)},[]),T=je.useRef(0),b=je.useRef(0),H=je.useRef(0),y=je.useRef(0),M=je.useCallback(()=>{r.current=requestAnimationFrame(M);const z=e.current,q=n.current,L=i.current;if(!z||!q||!L)return;const $=performance.now();let K=($-b.current)/1e3;if(b.current=$,(!isFinite(K)||K<0)&&(K=0),K>.25&&(K=.25),L.poll(),_.current)T.current=0;else{T.current+=K;let ne=0;for(;T.current>=Ku&&ne<w0;)z.step(Ku,L.state),T.current-=Ku,ne++;ne>=w0&&(T.current=0)}if(q.update(z,K,!z.spectating),q.render(),z.round.number!==y.current){y.current=z.round.number;const ne=S.current;z.round.isPistol||z.setPlayerWeapons(ne.primary,ne.secondary)}if($-H.current>=X2){H.current=$;const ne=z.snapshot(),we=z.cameraCombatant();if(we)for(const ze of z.combatants){const Y=ne.players.find(ie=>ie.id===ze.id);ze.__spotted=ze.alive&&ze.team!==we.team&&!!Y?.screen?.visible}u(ne)}},[]),D=je.useCallback(()=>{r.current&&cancelAnimationFrame(r.current),r.current=0},[]),U=je.useCallback(()=>{const z=t.current;if(!z)return;dt.ensure(),D();const q=new uM(p),L=cM(),$=new fM(L,{onLockChange:ne=>{!ne&&C.current==="game"?(A(!0),v(!0)):ne&&(A(!1),v(!1))}});$.attach(z);const K=new N2(z,q);e.current=q,i.current=$,n.current=K,y.current=q.round.number,T.current=0,b.current=performance.now(),H.current=0,q.round.isPistol||q.setPlayerWeapons(S.current.primary,S.current.secondary),o("game"),A(!1),u(q.snapshot()),$.requestLock(),r.current=requestAnimationFrame(M)},[M,A,D,p]),O=je.useCallback(()=>{D(),i.current?.releaseLock(),i.current?.detach(),n.current?.dispose(),n.current=null,e.current=null,i.current=null,o("menu"),u(null),A(!0)},[A,D]);je.useEffect(()=>()=>{D(),i.current?.detach(),n.current?.dispose()},[D]),je.useEffect(()=>{const z=L=>{C.current==="game"&&L.code==="Tab"&&(L.preventDefault(),f($=>!$))},q=L=>{L.code==="Tab"&&f(!1)};return window.addEventListener("keydown",z),window.addEventListener("keyup",q),()=>{window.removeEventListener("keydown",z),window.removeEventListener("keyup",q)}},[]);const X=e.current;return P.jsxs("div",{className:"game-root",children:[P.jsx("canvas",{ref:t}),s==="game"&&c&&X&&P.jsx(H2,{snap:c,grid:X.grid,combatants:X.combatants,bomb:X.bomb,cameraId:X.cameraCombatant()?.id??null,cameraYaw:X.cameraCombatant()?.yaw??0,scoreboardOpen:d}),s==="menu"&&P.jsx(W2,{team:p,prefs:x,onTeam:g,onPrefs:m,onStart:U}),s==="game"&&a&&X&&P.jsx("div",{className:"pause",children:P.jsxs("div",{className:"start-card",style:{width:"min(560px, 92vw)"},children:[P.jsx("h1",{style:{fontSize:24},children:"已暂停"}),P.jsx("div",{className:"sub",children:h?"指针锁定已释放，点击下方按钮回到战场。":"喘口气。"}),P.jsxs("div",{className:"section",children:[P.jsx("div",{className:"label",children:"长枪局武器偏好（下一回合生效）"}),P.jsx("div",{className:"choice-row",children:["ak47","m4a4","awp"].map(z=>P.jsx("button",{className:`choice${x.primary===z?" active":""}`,onClick:()=>{const q={...x,primary:z};m(q),S.current=q,X.round.isPistol||X.setPlayerWeapons(z,q.secondary)},children:P.jsx("span",{className:"n",children:z.toUpperCase()})},z))})]}),P.jsx("button",{className:"start-btn",onClick:()=>{i.current?.requestLock(),A(!1)},children:"继续战斗"}),P.jsx("button",{className:"choice",style:{width:"100%",marginTop:10,textAlign:"center"},onClick:O,children:P.jsx("span",{className:"n",children:"返回主菜单"})})]})})]})}const b_=document.getElementById("root");if(!b_)throw new Error("#root not found");zv(b_).render(P.jsx(j2,{}));

var o_=Object.defineProperty;var a_=(n,e,t)=>e in n?o_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var q=(n,e,t)=>a_(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();var i0={exports:{}},tc={},r0={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ca=Symbol.for("react.element"),l_=Symbol.for("react.portal"),c_=Symbol.for("react.fragment"),u_=Symbol.for("react.strict_mode"),h_=Symbol.for("react.profiler"),d_=Symbol.for("react.provider"),f_=Symbol.for("react.context"),p_=Symbol.for("react.forward_ref"),m_=Symbol.for("react.suspense"),g_=Symbol.for("react.memo"),v_=Symbol.for("react.lazy"),Lf=Symbol.iterator;function __(n){return n===null||typeof n!="object"?null:(n=Lf&&n[Lf]||n["@@iterator"],typeof n=="function"?n:null)}var s0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},o0=Object.assign,a0={};function $s(n,e,t){this.props=n,this.context=e,this.refs=a0,this.updater=t||s0}$s.prototype.isReactComponent={};$s.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};$s.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function l0(){}l0.prototype=$s.prototype;function dd(n,e,t){this.props=n,this.context=e,this.refs=a0,this.updater=t||s0}var fd=dd.prototype=new l0;fd.constructor=dd;o0(fd,$s.prototype);fd.isPureReactComponent=!0;var Nf=Array.isArray,c0=Object.prototype.hasOwnProperty,pd={current:null},u0={key:!0,ref:!0,__self:!0,__source:!0};function h0(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)c0.call(e,i)&&!u0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:ca,type:n,key:s,ref:o,props:r,_owner:pd.current}}function x_(n,e){return{$$typeof:ca,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function md(n){return typeof n=="object"&&n!==null&&n.$$typeof===ca}function y_(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var If=/\/+/g;function Ec(n,e){return typeof n=="object"&&n!==null&&n.key!=null?y_(""+n.key):e.toString(36)}function al(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case ca:case l_:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+Ec(o,0):i,Nf(r)?(t="",n!=null&&(t=n.replace(If,"$&/")+"/"),al(r,e,t,"",function(c){return c})):r!=null&&(md(r)&&(r=x_(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(If,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Nf(n))for(var a=0;a<n.length;a++){s=n[a];var l=i+Ec(s,a);o+=al(s,e,t,l,r)}else if(l=__(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=i+Ec(s,a++),o+=al(s,e,t,l,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ya(n,e,t){if(n==null)return n;var i=[],r=0;return al(n,i,"","",function(s){return e.call(t,s,r++)}),i}function S_(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var cn={current:null},ll={transition:null},M_={ReactCurrentDispatcher:cn,ReactCurrentBatchConfig:ll,ReactCurrentOwner:pd};function d0(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:ya,forEach:function(n,e,t){ya(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return ya(n,function(){e++}),e},toArray:function(n){return ya(n,function(e){return e})||[]},only:function(n){if(!md(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};je.Component=$s;je.Fragment=c_;je.Profiler=h_;je.PureComponent=dd;je.StrictMode=u_;je.Suspense=m_;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=M_;je.act=d0;je.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=o0({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=pd.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)c0.call(e,l)&&!u0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:ca,type:n.type,key:r,ref:s,props:i,_owner:o}};je.createContext=function(n){return n={$$typeof:f_,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:d_,_context:n},n.Consumer=n};je.createElement=h0;je.createFactory=function(n){var e=h0.bind(null,n);return e.type=n,e};je.createRef=function(){return{current:null}};je.forwardRef=function(n){return{$$typeof:p_,render:n}};je.isValidElement=md;je.lazy=function(n){return{$$typeof:v_,_payload:{_status:-1,_result:n},_init:S_}};je.memo=function(n,e){return{$$typeof:g_,type:n,compare:e===void 0?null:e}};je.startTransition=function(n){var e=ll.transition;ll.transition={};try{n()}finally{ll.transition=e}};je.unstable_act=d0;je.useCallback=function(n,e){return cn.current.useCallback(n,e)};je.useContext=function(n){return cn.current.useContext(n)};je.useDebugValue=function(){};je.useDeferredValue=function(n){return cn.current.useDeferredValue(n)};je.useEffect=function(n,e){return cn.current.useEffect(n,e)};je.useId=function(){return cn.current.useId()};je.useImperativeHandle=function(n,e,t){return cn.current.useImperativeHandle(n,e,t)};je.useInsertionEffect=function(n,e){return cn.current.useInsertionEffect(n,e)};je.useLayoutEffect=function(n,e){return cn.current.useLayoutEffect(n,e)};je.useMemo=function(n,e){return cn.current.useMemo(n,e)};je.useReducer=function(n,e,t){return cn.current.useReducer(n,e,t)};je.useRef=function(n){return cn.current.useRef(n)};je.useState=function(n){return cn.current.useState(n)};je.useSyncExternalStore=function(n,e,t){return cn.current.useSyncExternalStore(n,e,t)};je.useTransition=function(){return cn.current.useTransition()};je.version="18.3.1";r0.exports=je;var rn=r0.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E_=rn,w_=Symbol.for("react.element"),T_=Symbol.for("react.fragment"),A_=Object.prototype.hasOwnProperty,b_=E_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,C_={key:!0,ref:!0,__self:!0,__source:!0};function f0(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)A_.call(e,i)&&!C_.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:w_,type:n,key:s,ref:o,props:r,_owner:b_.current}}tc.Fragment=T_;tc.jsx=f0;tc.jsxs=f0;i0.exports=tc;var S=i0.exports,Du={},p0={exports:{}},Cn={},m0={exports:{}},g0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(I,$){var te=I.length;I.push($);e:for(;0<te;){var le=te-1>>>1,Ee=I[le];if(0<r(Ee,$))I[le]=$,I[te]=Ee,te=le;else break e}}function t(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var $=I[0],te=I.pop();if(te!==$){I[0]=te;e:for(var le=0,Ee=I.length,Ye=Ee>>>1;le<Ye;){var Y=2*(le+1)-1,G=I[Y],ee=Y+1,K=I[ee];if(0>r(G,te))ee<Ee&&0>r(K,G)?(I[le]=K,I[ee]=te,le=ee):(I[le]=G,I[Y]=te,le=Y);else if(ee<Ee&&0>r(K,te))I[le]=K,I[ee]=te,le=ee;else break e}}return $}function r(I,$){var te=I.sortIndex-$.sortIndex;return te!==0?te:I.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,f=null,d=3,p=!1,m=!1,_=!1,v=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(I){for(var $=t(c);$!==null;){if($.callback===null)i(c);else if($.startTime<=I)i(c),$.sortIndex=$.expirationTime,e(l,$);else break;$=t(c)}}function y(I){if(_=!1,x(I),!m)if(t(l)!==null)m=!0,W(R);else{var $=t(c);$!==null&&Q(y,$.startTime-I)}}function R(I,$){m=!1,_&&(_=!1,h(P),P=-1),p=!0;var te=d;try{for(x($),f=t(l);f!==null&&(!(f.expirationTime>$)||I&&!N());){var le=f.callback;if(typeof le=="function"){f.callback=null,d=f.priorityLevel;var Ee=le(f.expirationTime<=$);$=n.unstable_now(),typeof Ee=="function"?f.callback=Ee:f===t(l)&&i(l),x($)}else i(l);f=t(l)}if(f!==null)var Ye=!0;else{var Y=t(c);Y!==null&&Q(y,Y.startTime-$),Ye=!1}return Ye}finally{f=null,d=te,p=!1}}var b=!1,A=null,P=-1,T=5,M=-1;function N(){return!(n.unstable_now()-M<T)}function B(){if(A!==null){var I=n.unstable_now();M=I;var $=!0;try{$=A(!0,I)}finally{$?k():(b=!1,A=null)}}else b=!1}var k;if(typeof g=="function")k=function(){g(B)};else if(typeof MessageChannel<"u"){var X=new MessageChannel,J=X.port2;X.port1.onmessage=B,k=function(){J.postMessage(null)}}else k=function(){v(B,0)};function W(I){A=I,b||(b=!0,k())}function Q(I,$){P=v(function(){I(n.unstable_now())},$)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(I){I.callback=null},n.unstable_continueExecution=function(){m||p||(m=!0,W(R))},n.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<I?Math.floor(1e3/I):5},n.unstable_getCurrentPriorityLevel=function(){return d},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(I){switch(d){case 1:case 2:case 3:var $=3;break;default:$=d}var te=d;d=$;try{return I()}finally{d=te}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(I,$){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var te=d;d=I;try{return $()}finally{d=te}},n.unstable_scheduleCallback=function(I,$,te){var le=n.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?le+te:le):te=le,I){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=te+Ee,I={id:u++,callback:$,priorityLevel:I,startTime:te,expirationTime:Ee,sortIndex:-1},te>le?(I.sortIndex=te,e(c,I),t(l)===null&&I===t(c)&&(_?(h(P),P=-1):_=!0,Q(y,te-le))):(I.sortIndex=Ee,e(l,I),m||p||(m=!0,W(R))),I},n.unstable_shouldYield=N,n.unstable_wrapCallback=function(I){var $=d;return function(){var te=d;d=$;try{return I.apply(this,arguments)}finally{d=te}}}})(g0);m0.exports=g0;var R_=m0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P_=rn,bn=R_;function se(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var v0=new Set,Go={};function Wr(n,e){Us(n,e),Us(n+"Capture",e)}function Us(n,e){for(Go[n]=e,n=0;n<e.length;n++)v0.add(e[n])}var Ri=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Uu=Object.prototype.hasOwnProperty,L_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Df={},Uf={};function N_(n){return Uu.call(Uf,n)?!0:Uu.call(Df,n)?!1:L_.test(n)?Uf[n]=!0:(Df[n]=!0,!1)}function I_(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function D_(n,e,t,i){if(e===null||typeof e>"u"||I_(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function un(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){Xt[n]=new un(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];Xt[e]=new un(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){Xt[n]=new un(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){Xt[n]=new un(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){Xt[n]=new un(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){Xt[n]=new un(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){Xt[n]=new un(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){Xt[n]=new un(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){Xt[n]=new un(n,5,!1,n.toLowerCase(),null,!1,!1)});var gd=/[\-:]([a-z])/g;function vd(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(gd,vd);Xt[e]=new un(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(gd,vd);Xt[e]=new un(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(gd,vd);Xt[e]=new un(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){Xt[n]=new un(n,1,!1,n.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new un("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){Xt[n]=new un(n,1,!1,n.toLowerCase(),null,!0,!0)});function _d(n,e,t,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(D_(e,t,r,i)&&(t=null),i||r===null?N_(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var Fi=P_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Sa=Symbol.for("react.element"),ds=Symbol.for("react.portal"),fs=Symbol.for("react.fragment"),xd=Symbol.for("react.strict_mode"),Fu=Symbol.for("react.profiler"),_0=Symbol.for("react.provider"),x0=Symbol.for("react.context"),yd=Symbol.for("react.forward_ref"),Ou=Symbol.for("react.suspense"),ku=Symbol.for("react.suspense_list"),Sd=Symbol.for("react.memo"),Yi=Symbol.for("react.lazy"),y0=Symbol.for("react.offscreen"),Ff=Symbol.iterator;function oo(n){return n===null||typeof n!="object"?null:(n=Ff&&n[Ff]||n["@@iterator"],typeof n=="function"?n:null)}var Et=Object.assign,wc;function Mo(n){if(wc===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);wc=e&&e[1]||""}return`
`+wc+n}var Tc=!1;function Ac(n,e){if(!n||Tc)return"";Tc=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){i=c}n.call(e.prototype)}else{try{throw Error()}catch(c){i=c}n()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{Tc=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?Mo(n):""}function U_(n){switch(n.tag){case 5:return Mo(n.type);case 16:return Mo("Lazy");case 13:return Mo("Suspense");case 19:return Mo("SuspenseList");case 0:case 2:case 15:return n=Ac(n.type,!1),n;case 11:return n=Ac(n.type.render,!1),n;case 1:return n=Ac(n.type,!0),n;default:return""}}function zu(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case fs:return"Fragment";case ds:return"Portal";case Fu:return"Profiler";case xd:return"StrictMode";case Ou:return"Suspense";case ku:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case x0:return(n.displayName||"Context")+".Consumer";case _0:return(n._context.displayName||"Context")+".Provider";case yd:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Sd:return e=n.displayName||null,e!==null?e:zu(n.type)||"Memo";case Yi:e=n._payload,n=n._init;try{return zu(n(e))}catch{}}return null}function F_(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return zu(e);case 8:return e===xd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ur(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function S0(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function O_(n){var e=S0(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Ma(n){n._valueTracker||(n._valueTracker=O_(n))}function M0(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=S0(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function Tl(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Bu(n,e){var t=e.checked;return Et({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Of(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=ur(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function E0(n,e){e=e.checked,e!=null&&_d(n,"checked",e,!1)}function Hu(n,e){E0(n,e);var t=ur(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Vu(n,e.type,t):e.hasOwnProperty("defaultValue")&&Vu(n,e.type,ur(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function kf(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Vu(n,e,t){(e!=="number"||Tl(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Eo=Array.isArray;function Ts(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+ur(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function Gu(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return Et({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function zf(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(se(92));if(Eo(t)){if(1<t.length)throw Error(se(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:ur(t)}}function w0(n,e){var t=ur(e.value),i=ur(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Bf(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function T0(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wu(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?T0(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ea,A0=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Ea=Ea||document.createElement("div"),Ea.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ea.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Wo(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Co={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},k_=["Webkit","ms","Moz","O"];Object.keys(Co).forEach(function(n){k_.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Co[e]=Co[n]})});function b0(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Co.hasOwnProperty(n)&&Co[n]?(""+e).trim():e+"px"}function C0(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=b0(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var z_=Et({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ju(n,e){if(e){if(z_[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function Xu(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yu=null;function Md(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var $u=null,As=null,bs=null;function Hf(n){if(n=da(n)){if(typeof $u!="function")throw Error(se(280));var e=n.stateNode;e&&(e=oc(e),$u(n.stateNode,n.type,e))}}function R0(n){As?bs?bs.push(n):bs=[n]:As=n}function P0(){if(As){var n=As,e=bs;if(bs=As=null,Hf(n),e)for(n=0;n<e.length;n++)Hf(e[n])}}function L0(n,e){return n(e)}function N0(){}var bc=!1;function I0(n,e,t){if(bc)return n(e,t);bc=!0;try{return L0(n,e,t)}finally{bc=!1,(As!==null||bs!==null)&&(N0(),P0())}}function jo(n,e){var t=n.stateNode;if(t===null)return null;var i=oc(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(se(231,e,typeof t));return t}var qu=!1;if(Ri)try{var ao={};Object.defineProperty(ao,"passive",{get:function(){qu=!0}}),window.addEventListener("test",ao,ao),window.removeEventListener("test",ao,ao)}catch{qu=!1}function B_(n,e,t,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(u){this.onError(u)}}var Ro=!1,Al=null,bl=!1,Ku=null,H_={onError:function(n){Ro=!0,Al=n}};function V_(n,e,t,i,r,s,o,a,l){Ro=!1,Al=null,B_.apply(H_,arguments)}function G_(n,e,t,i,r,s,o,a,l){if(V_.apply(this,arguments),Ro){if(Ro){var c=Al;Ro=!1,Al=null}else throw Error(se(198));bl||(bl=!0,Ku=c)}}function jr(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function D0(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Vf(n){if(jr(n)!==n)throw Error(se(188))}function W_(n){var e=n.alternate;if(!e){if(e=jr(n),e===null)throw Error(se(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return Vf(r),n;if(s===i)return Vf(r),e;s=s.sibling}throw Error(se(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===t){o=!0,t=r,i=s;break}if(a===i){o=!0,i=r,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,i=r;break}if(a===i){o=!0,i=s,t=r;break}a=a.sibling}if(!o)throw Error(se(189))}}if(t.alternate!==i)throw Error(se(190))}if(t.tag!==3)throw Error(se(188));return t.stateNode.current===t?n:e}function U0(n){return n=W_(n),n!==null?F0(n):null}function F0(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=F0(n);if(e!==null)return e;n=n.sibling}return null}var O0=bn.unstable_scheduleCallback,Gf=bn.unstable_cancelCallback,j_=bn.unstable_shouldYield,X_=bn.unstable_requestPaint,At=bn.unstable_now,Y_=bn.unstable_getCurrentPriorityLevel,Ed=bn.unstable_ImmediatePriority,k0=bn.unstable_UserBlockingPriority,Cl=bn.unstable_NormalPriority,$_=bn.unstable_LowPriority,z0=bn.unstable_IdlePriority,nc=null,ci=null;function q_(n){if(ci&&typeof ci.onCommitFiberRoot=="function")try{ci.onCommitFiberRoot(nc,n,void 0,(n.current.flags&128)===128)}catch{}}var Zn=Math.clz32?Math.clz32:J_,K_=Math.log,Z_=Math.LN2;function J_(n){return n>>>=0,n===0?32:31-(K_(n)/Z_|0)|0}var wa=64,Ta=4194304;function wo(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Rl(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~r;a!==0?i=wo(a):(s&=o,s!==0&&(i=wo(s)))}else o=t&~r,o!==0?i=wo(o):s!==0&&(i=wo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-Zn(e),r=1<<t,i|=n[t],e&=~r;return i}function Q_(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ex(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-Zn(s),a=1<<o,l=r[o];l===-1?(!(a&t)||a&i)&&(r[o]=Q_(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function Zu(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function B0(){var n=wa;return wa<<=1,!(wa&4194240)&&(wa=64),n}function Cc(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function ua(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-Zn(e),n[e]=t}function tx(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-Zn(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function wd(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-Zn(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var rt=0;function H0(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var V0,Td,G0,W0,j0,Ju=!1,Aa=[],er=null,tr=null,nr=null,Xo=new Map,Yo=new Map,qi=[],nx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Wf(n,e){switch(n){case"focusin":case"focusout":er=null;break;case"dragenter":case"dragleave":tr=null;break;case"mouseover":case"mouseout":nr=null;break;case"pointerover":case"pointerout":Xo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yo.delete(e.pointerId)}}function lo(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=da(e),e!==null&&Td(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function ix(n,e,t,i,r){switch(e){case"focusin":return er=lo(er,n,e,t,i,r),!0;case"dragenter":return tr=lo(tr,n,e,t,i,r),!0;case"mouseover":return nr=lo(nr,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return Xo.set(s,lo(Xo.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Yo.set(s,lo(Yo.get(s)||null,n,e,t,i,r)),!0}return!1}function X0(n){var e=Rr(n.target);if(e!==null){var t=jr(e);if(t!==null){if(e=t.tag,e===13){if(e=D0(t),e!==null){n.blockedOn=e,j0(n.priority,function(){G0(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function cl(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Qu(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);Yu=i,t.target.dispatchEvent(i),Yu=null}else return e=da(t),e!==null&&Td(e),n.blockedOn=t,!1;e.shift()}return!0}function jf(n,e,t){cl(n)&&t.delete(e)}function rx(){Ju=!1,er!==null&&cl(er)&&(er=null),tr!==null&&cl(tr)&&(tr=null),nr!==null&&cl(nr)&&(nr=null),Xo.forEach(jf),Yo.forEach(jf)}function co(n,e){n.blockedOn===e&&(n.blockedOn=null,Ju||(Ju=!0,bn.unstable_scheduleCallback(bn.unstable_NormalPriority,rx)))}function $o(n){function e(r){return co(r,n)}if(0<Aa.length){co(Aa[0],n);for(var t=1;t<Aa.length;t++){var i=Aa[t];i.blockedOn===n&&(i.blockedOn=null)}}for(er!==null&&co(er,n),tr!==null&&co(tr,n),nr!==null&&co(nr,n),Xo.forEach(e),Yo.forEach(e),t=0;t<qi.length;t++)i=qi[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<qi.length&&(t=qi[0],t.blockedOn===null);)X0(t),t.blockedOn===null&&qi.shift()}var Cs=Fi.ReactCurrentBatchConfig,Pl=!0;function sx(n,e,t,i){var r=rt,s=Cs.transition;Cs.transition=null;try{rt=1,Ad(n,e,t,i)}finally{rt=r,Cs.transition=s}}function ox(n,e,t,i){var r=rt,s=Cs.transition;Cs.transition=null;try{rt=4,Ad(n,e,t,i)}finally{rt=r,Cs.transition=s}}function Ad(n,e,t,i){if(Pl){var r=Qu(n,e,t,i);if(r===null)kc(n,e,i,Ll,t),Wf(n,i);else if(ix(r,n,e,t,i))i.stopPropagation();else if(Wf(n,i),e&4&&-1<nx.indexOf(n)){for(;r!==null;){var s=da(r);if(s!==null&&V0(s),s=Qu(n,e,t,i),s===null&&kc(n,e,i,Ll,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else kc(n,e,i,null,t)}}var Ll=null;function Qu(n,e,t,i){if(Ll=null,n=Md(i),n=Rr(n),n!==null)if(e=jr(n),e===null)n=null;else if(t=e.tag,t===13){if(n=D0(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Ll=n,null}function Y0(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Y_()){case Ed:return 1;case k0:return 4;case Cl:case $_:return 16;case z0:return 536870912;default:return 16}default:return 16}}var Ji=null,bd=null,ul=null;function $0(){if(ul)return ul;var n,e=bd,t=e.length,i,r="value"in Ji?Ji.value:Ji.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return ul=r.slice(n,1<i?1-i:void 0)}function hl(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function ba(){return!0}function Xf(){return!1}function Rn(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ba:Xf,this.isPropagationStopped=Xf,this}return Et(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=ba)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=ba)},persist:function(){},isPersistent:ba}),e}var qs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cd=Rn(qs),ha=Et({},qs,{view:0,detail:0}),ax=Rn(ha),Rc,Pc,uo,ic=Et({},ha,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rd,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==uo&&(uo&&n.type==="mousemove"?(Rc=n.screenX-uo.screenX,Pc=n.screenY-uo.screenY):Pc=Rc=0,uo=n),Rc)},movementY:function(n){return"movementY"in n?n.movementY:Pc}}),Yf=Rn(ic),lx=Et({},ic,{dataTransfer:0}),cx=Rn(lx),ux=Et({},ha,{relatedTarget:0}),Lc=Rn(ux),hx=Et({},qs,{animationName:0,elapsedTime:0,pseudoElement:0}),dx=Rn(hx),fx=Et({},qs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),px=Rn(fx),mx=Et({},qs,{data:0}),$f=Rn(mx),gx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_x={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xx(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=_x[n])?!!e[n]:!1}function Rd(){return xx}var yx=Et({},ha,{key:function(n){if(n.key){var e=gx[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=hl(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?vx[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rd,charCode:function(n){return n.type==="keypress"?hl(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?hl(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Sx=Rn(yx),Mx=Et({},ic,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qf=Rn(Mx),Ex=Et({},ha,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rd}),wx=Rn(Ex),Tx=Et({},qs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ax=Rn(Tx),bx=Et({},ic,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Cx=Rn(bx),Rx=[9,13,27,32],Pd=Ri&&"CompositionEvent"in window,Po=null;Ri&&"documentMode"in document&&(Po=document.documentMode);var Px=Ri&&"TextEvent"in window&&!Po,q0=Ri&&(!Pd||Po&&8<Po&&11>=Po),Kf=" ",Zf=!1;function K0(n,e){switch(n){case"keyup":return Rx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Z0(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ps=!1;function Lx(n,e){switch(n){case"compositionend":return Z0(e);case"keypress":return e.which!==32?null:(Zf=!0,Kf);case"textInput":return n=e.data,n===Kf&&Zf?null:n;default:return null}}function Nx(n,e){if(ps)return n==="compositionend"||!Pd&&K0(n,e)?(n=$0(),ul=bd=Ji=null,ps=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return q0&&e.locale!=="ko"?null:e.data;default:return null}}var Ix={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jf(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Ix[n.type]:e==="textarea"}function J0(n,e,t,i){R0(i),e=Nl(e,"onChange"),0<e.length&&(t=new Cd("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Lo=null,qo=null;function Dx(n){cg(n,0)}function rc(n){var e=vs(n);if(M0(e))return n}function Ux(n,e){if(n==="change")return e}var Q0=!1;if(Ri){var Nc;if(Ri){var Ic="oninput"in document;if(!Ic){var Qf=document.createElement("div");Qf.setAttribute("oninput","return;"),Ic=typeof Qf.oninput=="function"}Nc=Ic}else Nc=!1;Q0=Nc&&(!document.documentMode||9<document.documentMode)}function ep(){Lo&&(Lo.detachEvent("onpropertychange",eg),qo=Lo=null)}function eg(n){if(n.propertyName==="value"&&rc(qo)){var e=[];J0(e,qo,n,Md(n)),I0(Dx,e)}}function Fx(n,e,t){n==="focusin"?(ep(),Lo=e,qo=t,Lo.attachEvent("onpropertychange",eg)):n==="focusout"&&ep()}function Ox(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return rc(qo)}function kx(n,e){if(n==="click")return rc(e)}function zx(n,e){if(n==="input"||n==="change")return rc(e)}function Bx(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var ni=typeof Object.is=="function"?Object.is:Bx;function Ko(n,e){if(ni(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!Uu.call(e,r)||!ni(n[r],e[r]))return!1}return!0}function tp(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function np(n,e){var t=tp(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=tp(t)}}function tg(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?tg(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function ng(){for(var n=window,e=Tl();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Tl(n.document)}return e}function Ld(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Hx(n){var e=ng(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&tg(t.ownerDocument.documentElement,t)){if(i!==null&&Ld(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=np(t,s);var o=np(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Vx=Ri&&"documentMode"in document&&11>=document.documentMode,ms=null,eh=null,No=null,th=!1;function ip(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;th||ms==null||ms!==Tl(i)||(i=ms,"selectionStart"in i&&Ld(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),No&&Ko(No,i)||(No=i,i=Nl(eh,"onSelect"),0<i.length&&(e=new Cd("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=ms)))}function Ca(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var gs={animationend:Ca("Animation","AnimationEnd"),animationiteration:Ca("Animation","AnimationIteration"),animationstart:Ca("Animation","AnimationStart"),transitionend:Ca("Transition","TransitionEnd")},Dc={},ig={};Ri&&(ig=document.createElement("div").style,"AnimationEvent"in window||(delete gs.animationend.animation,delete gs.animationiteration.animation,delete gs.animationstart.animation),"TransitionEvent"in window||delete gs.transitionend.transition);function sc(n){if(Dc[n])return Dc[n];if(!gs[n])return n;var e=gs[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in ig)return Dc[n]=e[t];return n}var rg=sc("animationend"),sg=sc("animationiteration"),og=sc("animationstart"),ag=sc("transitionend"),lg=new Map,rp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function dr(n,e){lg.set(n,e),Wr(e,[n])}for(var Uc=0;Uc<rp.length;Uc++){var Fc=rp[Uc],Gx=Fc.toLowerCase(),Wx=Fc[0].toUpperCase()+Fc.slice(1);dr(Gx,"on"+Wx)}dr(rg,"onAnimationEnd");dr(sg,"onAnimationIteration");dr(og,"onAnimationStart");dr("dblclick","onDoubleClick");dr("focusin","onFocus");dr("focusout","onBlur");dr(ag,"onTransitionEnd");Us("onMouseEnter",["mouseout","mouseover"]);Us("onMouseLeave",["mouseout","mouseover"]);Us("onPointerEnter",["pointerout","pointerover"]);Us("onPointerLeave",["pointerout","pointerover"]);Wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jx=new Set("cancel close invalid load scroll toggle".split(" ").concat(To));function sp(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,G_(i,e,void 0,n),n.currentTarget=null}function cg(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;sp(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;sp(r,a,c),s=l}}}if(bl)throw n=Ku,bl=!1,Ku=null,n}function ft(n,e){var t=e[oh];t===void 0&&(t=e[oh]=new Set);var i=n+"__bubble";t.has(i)||(ug(e,n,2,!1),t.add(i))}function Oc(n,e,t){var i=0;e&&(i|=4),ug(t,n,i,e)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function Zo(n){if(!n[Ra]){n[Ra]=!0,v0.forEach(function(t){t!=="selectionchange"&&(jx.has(t)||Oc(t,!1,n),Oc(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Ra]||(e[Ra]=!0,Oc("selectionchange",!1,e))}}function ug(n,e,t,i){switch(Y0(e)){case 1:var r=sx;break;case 4:r=ox;break;default:r=Ad}t=r.bind(null,e,t,n),r=void 0,!qu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function kc(n,e,t,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Rr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}I0(function(){var c=s,u=Md(t),f=[];e:{var d=lg.get(n);if(d!==void 0){var p=Cd,m=n;switch(n){case"keypress":if(hl(t)===0)break e;case"keydown":case"keyup":p=Sx;break;case"focusin":m="focus",p=Lc;break;case"focusout":m="blur",p=Lc;break;case"beforeblur":case"afterblur":p=Lc;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Yf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=cx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=wx;break;case rg:case sg:case og:p=dx;break;case ag:p=Ax;break;case"scroll":p=ax;break;case"wheel":p=Cx;break;case"copy":case"cut":case"paste":p=px;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=qf}var _=(e&4)!==0,v=!_&&n==="scroll",h=_?d!==null?d+"Capture":null:d;_=[];for(var g=c,x;g!==null;){x=g;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,h!==null&&(y=jo(g,h),y!=null&&_.push(Jo(g,y,x)))),v)break;g=g.return}0<_.length&&(d=new p(d,m,null,t,u),f.push({event:d,listeners:_}))}}if(!(e&7)){e:{if(d=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",d&&t!==Yu&&(m=t.relatedTarget||t.fromElement)&&(Rr(m)||m[Pi]))break e;if((p||d)&&(d=u.window===u?u:(d=u.ownerDocument)?d.defaultView||d.parentWindow:window,p?(m=t.relatedTarget||t.toElement,p=c,m=m?Rr(m):null,m!==null&&(v=jr(m),m!==v||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=c),p!==m)){if(_=Yf,y="onMouseLeave",h="onMouseEnter",g="mouse",(n==="pointerout"||n==="pointerover")&&(_=qf,y="onPointerLeave",h="onPointerEnter",g="pointer"),v=p==null?d:vs(p),x=m==null?d:vs(m),d=new _(y,g+"leave",p,t,u),d.target=v,d.relatedTarget=x,y=null,Rr(u)===c&&(_=new _(h,g+"enter",m,t,u),_.target=x,_.relatedTarget=v,y=_),v=y,p&&m)t:{for(_=p,h=m,g=0,x=_;x;x=Yr(x))g++;for(x=0,y=h;y;y=Yr(y))x++;for(;0<g-x;)_=Yr(_),g--;for(;0<x-g;)h=Yr(h),x--;for(;g--;){if(_===h||h!==null&&_===h.alternate)break t;_=Yr(_),h=Yr(h)}_=null}else _=null;p!==null&&op(f,d,p,_,!1),m!==null&&v!==null&&op(f,v,m,_,!0)}}e:{if(d=c?vs(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var R=Ux;else if(Jf(d))if(Q0)R=zx;else{R=Ox;var b=Fx}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(R=kx);if(R&&(R=R(n,c))){J0(f,R,t,u);break e}b&&b(n,d,c),n==="focusout"&&(b=d._wrapperState)&&b.controlled&&d.type==="number"&&Vu(d,"number",d.value)}switch(b=c?vs(c):window,n){case"focusin":(Jf(b)||b.contentEditable==="true")&&(ms=b,eh=c,No=null);break;case"focusout":No=eh=ms=null;break;case"mousedown":th=!0;break;case"contextmenu":case"mouseup":case"dragend":th=!1,ip(f,t,u);break;case"selectionchange":if(Vx)break;case"keydown":case"keyup":ip(f,t,u)}var A;if(Pd)e:{switch(n){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else ps?K0(n,t)&&(P="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(P="onCompositionStart");P&&(q0&&t.locale!=="ko"&&(ps||P!=="onCompositionStart"?P==="onCompositionEnd"&&ps&&(A=$0()):(Ji=u,bd="value"in Ji?Ji.value:Ji.textContent,ps=!0)),b=Nl(c,P),0<b.length&&(P=new $f(P,n,null,t,u),f.push({event:P,listeners:b}),A?P.data=A:(A=Z0(t),A!==null&&(P.data=A)))),(A=Px?Lx(n,t):Nx(n,t))&&(c=Nl(c,"onBeforeInput"),0<c.length&&(u=new $f("onBeforeInput","beforeinput",null,t,u),f.push({event:u,listeners:c}),u.data=A))}cg(f,e)})}function Jo(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Nl(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=jo(n,t),s!=null&&i.unshift(Jo(n,s,r)),s=jo(n,e),s!=null&&i.push(Jo(n,s,r))),n=n.return}return i}function Yr(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function op(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=jo(t,s),l!=null&&o.unshift(Jo(t,l,a))):r||(l=jo(t,s),l!=null&&o.push(Jo(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var Xx=/\r\n?/g,Yx=/\u0000|\uFFFD/g;function ap(n){return(typeof n=="string"?n:""+n).replace(Xx,`
`).replace(Yx,"")}function Pa(n,e,t){if(e=ap(e),ap(n)!==e&&t)throw Error(se(425))}function Il(){}var nh=null,ih=null;function rh(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var sh=typeof setTimeout=="function"?setTimeout:void 0,$x=typeof clearTimeout=="function"?clearTimeout:void 0,lp=typeof Promise=="function"?Promise:void 0,qx=typeof queueMicrotask=="function"?queueMicrotask:typeof lp<"u"?function(n){return lp.resolve(null).then(n).catch(Kx)}:sh;function Kx(n){setTimeout(function(){throw n})}function zc(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),$o(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);$o(e)}function ir(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function cp(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var Ks=Math.random().toString(36).slice(2),ai="__reactFiber$"+Ks,Qo="__reactProps$"+Ks,Pi="__reactContainer$"+Ks,oh="__reactEvents$"+Ks,Zx="__reactListeners$"+Ks,Jx="__reactHandles$"+Ks;function Rr(n){var e=n[ai];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Pi]||t[ai]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=cp(n);n!==null;){if(t=n[ai])return t;n=cp(n)}return e}n=t,t=n.parentNode}return null}function da(n){return n=n[ai]||n[Pi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function vs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(se(33))}function oc(n){return n[Qo]||null}var ah=[],_s=-1;function fr(n){return{current:n}}function pt(n){0>_s||(n.current=ah[_s],ah[_s]=null,_s--)}function ct(n,e){_s++,ah[_s]=n.current,n.current=e}var hr={},Qt=fr(hr),gn=fr(!1),Fr=hr;function Fs(n,e){var t=n.type.contextTypes;if(!t)return hr;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function vn(n){return n=n.childContextTypes,n!=null}function Dl(){pt(gn),pt(Qt)}function up(n,e,t){if(Qt.current!==hr)throw Error(se(168));ct(Qt,e),ct(gn,t)}function hg(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,F_(n)||"Unknown",r));return Et({},t,i)}function Ul(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||hr,Fr=Qt.current,ct(Qt,n),ct(gn,gn.current),!0}function hp(n,e,t){var i=n.stateNode;if(!i)throw Error(se(169));t?(n=hg(n,e,Fr),i.__reactInternalMemoizedMergedChildContext=n,pt(gn),pt(Qt),ct(Qt,n)):pt(gn),ct(gn,t)}var Mi=null,ac=!1,Bc=!1;function dg(n){Mi===null?Mi=[n]:Mi.push(n)}function Qx(n){ac=!0,dg(n)}function pr(){if(!Bc&&Mi!==null){Bc=!0;var n=0,e=rt;try{var t=Mi;for(rt=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}Mi=null,ac=!1}catch(r){throw Mi!==null&&(Mi=Mi.slice(n+1)),O0(Ed,pr),r}finally{rt=e,Bc=!1}}return null}var xs=[],ys=0,Fl=null,Ol=0,Nn=[],In=0,Or=null,Ei=1,wi="";function Mr(n,e){xs[ys++]=Ol,xs[ys++]=Fl,Fl=n,Ol=e}function fg(n,e,t){Nn[In++]=Ei,Nn[In++]=wi,Nn[In++]=Or,Or=n;var i=Ei;n=wi;var r=32-Zn(i)-1;i&=~(1<<r),t+=1;var s=32-Zn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ei=1<<32-Zn(e)+r|t<<r|i,wi=s+n}else Ei=1<<s|t<<r|i,wi=n}function Nd(n){n.return!==null&&(Mr(n,1),fg(n,1,0))}function Id(n){for(;n===Fl;)Fl=xs[--ys],xs[ys]=null,Ol=xs[--ys],xs[ys]=null;for(;n===Or;)Or=Nn[--In],Nn[In]=null,wi=Nn[--In],Nn[In]=null,Ei=Nn[--In],Nn[In]=null}var An=null,Tn=null,vt=!1,Yn=null;function pg(n,e){var t=Un(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function dp(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,An=n,Tn=ir(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,An=n,Tn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Or!==null?{id:Ei,overflow:wi}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Un(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,An=n,Tn=null,!0):!1;default:return!1}}function lh(n){return(n.mode&1)!==0&&(n.flags&128)===0}function ch(n){if(vt){var e=Tn;if(e){var t=e;if(!dp(n,e)){if(lh(n))throw Error(se(418));e=ir(t.nextSibling);var i=An;e&&dp(n,e)?pg(i,t):(n.flags=n.flags&-4097|2,vt=!1,An=n)}}else{if(lh(n))throw Error(se(418));n.flags=n.flags&-4097|2,vt=!1,An=n}}}function fp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;An=n}function La(n){if(n!==An)return!1;if(!vt)return fp(n),vt=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!rh(n.type,n.memoizedProps)),e&&(e=Tn)){if(lh(n))throw mg(),Error(se(418));for(;e;)pg(n,e),e=ir(e.nextSibling)}if(fp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(se(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){Tn=ir(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}Tn=null}}else Tn=An?ir(n.stateNode.nextSibling):null;return!0}function mg(){for(var n=Tn;n;)n=ir(n.nextSibling)}function Os(){Tn=An=null,vt=!1}function Dd(n){Yn===null?Yn=[n]:Yn.push(n)}var ey=Fi.ReactCurrentBatchConfig;function ho(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(se(309));var i=t.stateNode}if(!i)throw Error(se(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(se(284));if(!t._owner)throw Error(se(290,n))}return n}function Na(n,e){throw n=Object.prototype.toString.call(e),Error(se(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function pp(n){var e=n._init;return e(n._payload)}function gg(n){function e(h,g){if(n){var x=h.deletions;x===null?(h.deletions=[g],h.flags|=16):x.push(g)}}function t(h,g){if(!n)return null;for(;g!==null;)e(h,g),g=g.sibling;return null}function i(h,g){for(h=new Map;g!==null;)g.key!==null?h.set(g.key,g):h.set(g.index,g),g=g.sibling;return h}function r(h,g){return h=ar(h,g),h.index=0,h.sibling=null,h}function s(h,g,x){return h.index=x,n?(x=h.alternate,x!==null?(x=x.index,x<g?(h.flags|=2,g):x):(h.flags|=2,g)):(h.flags|=1048576,g)}function o(h){return n&&h.alternate===null&&(h.flags|=2),h}function a(h,g,x,y){return g===null||g.tag!==6?(g=Yc(x,h.mode,y),g.return=h,g):(g=r(g,x),g.return=h,g)}function l(h,g,x,y){var R=x.type;return R===fs?u(h,g,x.props.children,y,x.key):g!==null&&(g.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Yi&&pp(R)===g.type)?(y=r(g,x.props),y.ref=ho(h,g,x),y.return=h,y):(y=_l(x.type,x.key,x.props,null,h.mode,y),y.ref=ho(h,g,x),y.return=h,y)}function c(h,g,x,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=$c(x,h.mode,y),g.return=h,g):(g=r(g,x.children||[]),g.return=h,g)}function u(h,g,x,y,R){return g===null||g.tag!==7?(g=Ur(x,h.mode,y,R),g.return=h,g):(g=r(g,x),g.return=h,g)}function f(h,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Yc(""+g,h.mode,x),g.return=h,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Sa:return x=_l(g.type,g.key,g.props,null,h.mode,x),x.ref=ho(h,null,g),x.return=h,x;case ds:return g=$c(g,h.mode,x),g.return=h,g;case Yi:var y=g._init;return f(h,y(g._payload),x)}if(Eo(g)||oo(g))return g=Ur(g,h.mode,x,null),g.return=h,g;Na(h,g)}return null}function d(h,g,x,y){var R=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return R!==null?null:a(h,g,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Sa:return x.key===R?l(h,g,x,y):null;case ds:return x.key===R?c(h,g,x,y):null;case Yi:return R=x._init,d(h,g,R(x._payload),y)}if(Eo(x)||oo(x))return R!==null?null:u(h,g,x,y,null);Na(h,x)}return null}function p(h,g,x,y,R){if(typeof y=="string"&&y!==""||typeof y=="number")return h=h.get(x)||null,a(g,h,""+y,R);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Sa:return h=h.get(y.key===null?x:y.key)||null,l(g,h,y,R);case ds:return h=h.get(y.key===null?x:y.key)||null,c(g,h,y,R);case Yi:var b=y._init;return p(h,g,x,b(y._payload),R)}if(Eo(y)||oo(y))return h=h.get(x)||null,u(g,h,y,R,null);Na(g,y)}return null}function m(h,g,x,y){for(var R=null,b=null,A=g,P=g=0,T=null;A!==null&&P<x.length;P++){A.index>P?(T=A,A=null):T=A.sibling;var M=d(h,A,x[P],y);if(M===null){A===null&&(A=T);break}n&&A&&M.alternate===null&&e(h,A),g=s(M,g,P),b===null?R=M:b.sibling=M,b=M,A=T}if(P===x.length)return t(h,A),vt&&Mr(h,P),R;if(A===null){for(;P<x.length;P++)A=f(h,x[P],y),A!==null&&(g=s(A,g,P),b===null?R=A:b.sibling=A,b=A);return vt&&Mr(h,P),R}for(A=i(h,A);P<x.length;P++)T=p(A,h,P,x[P],y),T!==null&&(n&&T.alternate!==null&&A.delete(T.key===null?P:T.key),g=s(T,g,P),b===null?R=T:b.sibling=T,b=T);return n&&A.forEach(function(N){return e(h,N)}),vt&&Mr(h,P),R}function _(h,g,x,y){var R=oo(x);if(typeof R!="function")throw Error(se(150));if(x=R.call(x),x==null)throw Error(se(151));for(var b=R=null,A=g,P=g=0,T=null,M=x.next();A!==null&&!M.done;P++,M=x.next()){A.index>P?(T=A,A=null):T=A.sibling;var N=d(h,A,M.value,y);if(N===null){A===null&&(A=T);break}n&&A&&N.alternate===null&&e(h,A),g=s(N,g,P),b===null?R=N:b.sibling=N,b=N,A=T}if(M.done)return t(h,A),vt&&Mr(h,P),R;if(A===null){for(;!M.done;P++,M=x.next())M=f(h,M.value,y),M!==null&&(g=s(M,g,P),b===null?R=M:b.sibling=M,b=M);return vt&&Mr(h,P),R}for(A=i(h,A);!M.done;P++,M=x.next())M=p(A,h,P,M.value,y),M!==null&&(n&&M.alternate!==null&&A.delete(M.key===null?P:M.key),g=s(M,g,P),b===null?R=M:b.sibling=M,b=M);return n&&A.forEach(function(B){return e(h,B)}),vt&&Mr(h,P),R}function v(h,g,x,y){if(typeof x=="object"&&x!==null&&x.type===fs&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Sa:e:{for(var R=x.key,b=g;b!==null;){if(b.key===R){if(R=x.type,R===fs){if(b.tag===7){t(h,b.sibling),g=r(b,x.props.children),g.return=h,h=g;break e}}else if(b.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Yi&&pp(R)===b.type){t(h,b.sibling),g=r(b,x.props),g.ref=ho(h,b,x),g.return=h,h=g;break e}t(h,b);break}else e(h,b);b=b.sibling}x.type===fs?(g=Ur(x.props.children,h.mode,y,x.key),g.return=h,h=g):(y=_l(x.type,x.key,x.props,null,h.mode,y),y.ref=ho(h,g,x),y.return=h,h=y)}return o(h);case ds:e:{for(b=x.key;g!==null;){if(g.key===b)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){t(h,g.sibling),g=r(g,x.children||[]),g.return=h,h=g;break e}else{t(h,g);break}else e(h,g);g=g.sibling}g=$c(x,h.mode,y),g.return=h,h=g}return o(h);case Yi:return b=x._init,v(h,g,b(x._payload),y)}if(Eo(x))return m(h,g,x,y);if(oo(x))return _(h,g,x,y);Na(h,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(t(h,g.sibling),g=r(g,x),g.return=h,h=g):(t(h,g),g=Yc(x,h.mode,y),g.return=h,h=g),o(h)):t(h,g)}return v}var ks=gg(!0),vg=gg(!1),kl=fr(null),zl=null,Ss=null,Ud=null;function Fd(){Ud=Ss=zl=null}function Od(n){var e=kl.current;pt(kl),n._currentValue=e}function uh(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function Rs(n,e){zl=n,Ud=Ss=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(mn=!0),n.firstContext=null)}function On(n){var e=n._currentValue;if(Ud!==n)if(n={context:n,memoizedValue:e,next:null},Ss===null){if(zl===null)throw Error(se(308));Ss=n,zl.dependencies={lanes:0,firstContext:n}}else Ss=Ss.next=n;return e}var Pr=null;function kd(n){Pr===null?Pr=[n]:Pr.push(n)}function _g(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,kd(e)):(t.next=r.next,r.next=t),e.interleaved=t,Li(n,i)}function Li(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var $i=!1;function zd(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function xg(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function bi(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function rr(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,Qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Li(n,t)}return r=i.interleaved,r===null?(e.next=e,kd(i)):(e.next=r.next,r.next=e),i.interleaved=e,Li(n,t)}function dl(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,wd(n,t)}}function mp(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Bl(n,e,t,i){var r=n.updateQueue;$i=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=n.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,u=c=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=n,_=a;switch(d=e,p=t,_.tag){case 1:if(m=_.payload,typeof m=="function"){f=m.call(p,f,d);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=_.payload,d=typeof m=="function"?m.call(p,f,d):m,d==null)break e;f=Et({},f,d);break e;case 2:$i=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);zr|=o,n.lanes=o,n.memoizedState=f}}function gp(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var fa={},ui=fr(fa),ea=fr(fa),ta=fr(fa);function Lr(n){if(n===fa)throw Error(se(174));return n}function Bd(n,e){switch(ct(ta,e),ct(ea,n),ct(ui,fa),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Wu(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=Wu(e,n)}pt(ui),ct(ui,e)}function zs(){pt(ui),pt(ea),pt(ta)}function yg(n){Lr(ta.current);var e=Lr(ui.current),t=Wu(e,n.type);e!==t&&(ct(ea,n),ct(ui,t))}function Hd(n){ea.current===n&&(pt(ui),pt(ea))}var yt=fr(0);function Hl(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Hc=[];function Vd(){for(var n=0;n<Hc.length;n++)Hc[n]._workInProgressVersionPrimary=null;Hc.length=0}var fl=Fi.ReactCurrentDispatcher,Vc=Fi.ReactCurrentBatchConfig,kr=0,St=null,Nt=null,Bt=null,Vl=!1,Io=!1,na=0,ty=0;function $t(){throw Error(se(321))}function Gd(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!ni(n[t],e[t]))return!1;return!0}function Wd(n,e,t,i,r,s){if(kr=s,St=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,fl.current=n===null||n.memoizedState===null?sy:oy,n=t(i,r),Io){s=0;do{if(Io=!1,na=0,25<=s)throw Error(se(301));s+=1,Bt=Nt=null,e.updateQueue=null,fl.current=ay,n=t(i,r)}while(Io)}if(fl.current=Gl,e=Nt!==null&&Nt.next!==null,kr=0,Bt=Nt=St=null,Vl=!1,e)throw Error(se(300));return n}function jd(){var n=na!==0;return na=0,n}function si(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bt===null?St.memoizedState=Bt=n:Bt=Bt.next=n,Bt}function kn(){if(Nt===null){var n=St.alternate;n=n!==null?n.memoizedState:null}else n=Nt.next;var e=Bt===null?St.memoizedState:Bt.next;if(e!==null)Bt=e,Nt=n;else{if(n===null)throw Error(se(310));Nt=n,n={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Bt===null?St.memoizedState=Bt=n:Bt=Bt.next=n}return Bt}function ia(n,e){return typeof e=="function"?e(n):e}function Gc(n){var e=kn(),t=e.queue;if(t===null)throw Error(se(311));t.lastRenderedReducer=n;var i=Nt,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((kr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:n(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,St.lanes|=u,zr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ni(i,e.memoizedState)||(mn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,St.lanes|=s,zr|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Wc(n){var e=kn(),t=e.queue;if(t===null)throw Error(se(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);ni(s,e.memoizedState)||(mn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function Sg(){}function Mg(n,e){var t=St,i=kn(),r=e(),s=!ni(i.memoizedState,r);if(s&&(i.memoizedState=r,mn=!0),i=i.queue,Xd(Tg.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||Bt!==null&&Bt.memoizedState.tag&1){if(t.flags|=2048,ra(9,wg.bind(null,t,i,r,e),void 0,null),Ht===null)throw Error(se(349));kr&30||Eg(t,e,r)}return r}function Eg(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function wg(n,e,t,i){e.value=t,e.getSnapshot=i,Ag(e)&&bg(n)}function Tg(n,e,t){return t(function(){Ag(e)&&bg(n)})}function Ag(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!ni(n,t)}catch{return!0}}function bg(n){var e=Li(n,1);e!==null&&Jn(e,n,1,-1)}function vp(n){var e=si();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ia,lastRenderedState:n},e.queue=n,n=n.dispatch=ry.bind(null,St,n),[e.memoizedState,n]}function ra(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function Cg(){return kn().memoizedState}function pl(n,e,t,i){var r=si();St.flags|=n,r.memoizedState=ra(1|e,t,void 0,i===void 0?null:i)}function lc(n,e,t,i){var r=kn();i=i===void 0?null:i;var s=void 0;if(Nt!==null){var o=Nt.memoizedState;if(s=o.destroy,i!==null&&Gd(i,o.deps)){r.memoizedState=ra(e,t,s,i);return}}St.flags|=n,r.memoizedState=ra(1|e,t,s,i)}function _p(n,e){return pl(8390656,8,n,e)}function Xd(n,e){return lc(2048,8,n,e)}function Rg(n,e){return lc(4,2,n,e)}function Pg(n,e){return lc(4,4,n,e)}function Lg(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function Ng(n,e,t){return t=t!=null?t.concat([n]):null,lc(4,4,Lg.bind(null,e,n),t)}function Yd(){}function Ig(n,e){var t=kn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Gd(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function Dg(n,e){var t=kn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Gd(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function Ug(n,e,t){return kr&21?(ni(t,e)||(t=B0(),St.lanes|=t,zr|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,mn=!0),n.memoizedState=t)}function ny(n,e){var t=rt;rt=t!==0&&4>t?t:4,n(!0);var i=Vc.transition;Vc.transition={};try{n(!1),e()}finally{rt=t,Vc.transition=i}}function Fg(){return kn().memoizedState}function iy(n,e,t){var i=or(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},Og(n))kg(e,t);else if(t=_g(n,e,t,i),t!==null){var r=on();Jn(t,n,i,r),zg(t,e,i)}}function ry(n,e,t){var i=or(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(Og(n))kg(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(r.hasEagerState=!0,r.eagerState=a,ni(a,o)){var l=e.interleaved;l===null?(r.next=r,kd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}t=_g(n,e,r,i),t!==null&&(r=on(),Jn(t,n,i,r),zg(t,e,i))}}function Og(n){var e=n.alternate;return n===St||e!==null&&e===St}function kg(n,e){Io=Vl=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function zg(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,wd(n,t)}}var Gl={readContext:On,useCallback:$t,useContext:$t,useEffect:$t,useImperativeHandle:$t,useInsertionEffect:$t,useLayoutEffect:$t,useMemo:$t,useReducer:$t,useRef:$t,useState:$t,useDebugValue:$t,useDeferredValue:$t,useTransition:$t,useMutableSource:$t,useSyncExternalStore:$t,useId:$t,unstable_isNewReconciler:!1},sy={readContext:On,useCallback:function(n,e){return si().memoizedState=[n,e===void 0?null:e],n},useContext:On,useEffect:_p,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,pl(4194308,4,Lg.bind(null,e,n),t)},useLayoutEffect:function(n,e){return pl(4194308,4,n,e)},useInsertionEffect:function(n,e){return pl(4,2,n,e)},useMemo:function(n,e){var t=si();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=si();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=iy.bind(null,St,n),[i.memoizedState,n]},useRef:function(n){var e=si();return n={current:n},e.memoizedState=n},useState:vp,useDebugValue:Yd,useDeferredValue:function(n){return si().memoizedState=n},useTransition:function(){var n=vp(!1),e=n[0];return n=ny.bind(null,n[1]),si().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=St,r=si();if(vt){if(t===void 0)throw Error(se(407));t=t()}else{if(t=e(),Ht===null)throw Error(se(349));kr&30||Eg(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,_p(Tg.bind(null,i,s,n),[n]),i.flags|=2048,ra(9,wg.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=si(),e=Ht.identifierPrefix;if(vt){var t=wi,i=Ei;t=(i&~(1<<32-Zn(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=na++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=ty++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},oy={readContext:On,useCallback:Ig,useContext:On,useEffect:Xd,useImperativeHandle:Ng,useInsertionEffect:Rg,useLayoutEffect:Pg,useMemo:Dg,useReducer:Gc,useRef:Cg,useState:function(){return Gc(ia)},useDebugValue:Yd,useDeferredValue:function(n){var e=kn();return Ug(e,Nt.memoizedState,n)},useTransition:function(){var n=Gc(ia)[0],e=kn().memoizedState;return[n,e]},useMutableSource:Sg,useSyncExternalStore:Mg,useId:Fg,unstable_isNewReconciler:!1},ay={readContext:On,useCallback:Ig,useContext:On,useEffect:Xd,useImperativeHandle:Ng,useInsertionEffect:Rg,useLayoutEffect:Pg,useMemo:Dg,useReducer:Wc,useRef:Cg,useState:function(){return Wc(ia)},useDebugValue:Yd,useDeferredValue:function(n){var e=kn();return Nt===null?e.memoizedState=n:Ug(e,Nt.memoizedState,n)},useTransition:function(){var n=Wc(ia)[0],e=kn().memoizedState;return[n,e]},useMutableSource:Sg,useSyncExternalStore:Mg,useId:Fg,unstable_isNewReconciler:!1};function jn(n,e){if(n&&n.defaultProps){e=Et({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function hh(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:Et({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var cc={isMounted:function(n){return(n=n._reactInternals)?jr(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=on(),r=or(n),s=bi(i,r);s.payload=e,t!=null&&(s.callback=t),e=rr(n,s,r),e!==null&&(Jn(e,n,r,i),dl(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=on(),r=or(n),s=bi(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=rr(n,s,r),e!==null&&(Jn(e,n,r,i),dl(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=on(),i=or(n),r=bi(t,i);r.tag=2,e!=null&&(r.callback=e),e=rr(n,r,i),e!==null&&(Jn(e,n,i,t),dl(e,n,i))}};function xp(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Ko(t,i)||!Ko(r,s):!0}function Bg(n,e,t){var i=!1,r=hr,s=e.contextType;return typeof s=="object"&&s!==null?s=On(s):(r=vn(e)?Fr:Qt.current,i=e.contextTypes,s=(i=i!=null)?Fs(n,r):hr),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=cc,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function yp(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&cc.enqueueReplaceState(e,e.state,null)}function dh(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},zd(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=On(s):(s=vn(e)?Fr:Qt.current,r.context=Fs(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(hh(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&cc.enqueueReplaceState(r,r.state,null),Bl(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function Bs(n,e){try{var t="",i=e;do t+=U_(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function jc(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function fh(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var ly=typeof WeakMap=="function"?WeakMap:Map;function Hg(n,e,t){t=bi(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){jl||(jl=!0,Eh=i),fh(n,e)},t}function Vg(n,e,t){t=bi(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){fh(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){fh(n,e),typeof i!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Sp(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new ly;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=My.bind(null,n,e,t),e.then(n,n))}function Mp(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Ep(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=bi(-1,1),e.tag=2,rr(t,e,1))),t.lanes|=1),n)}var cy=Fi.ReactCurrentOwner,mn=!1;function sn(n,e,t,i){e.child=n===null?vg(e,null,t,i):ks(e,n.child,t,i)}function wp(n,e,t,i,r){t=t.render;var s=e.ref;return Rs(e,r),i=Wd(n,e,t,i,s,r),t=jd(),n!==null&&!mn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Ni(n,e,r)):(vt&&t&&Nd(e),e.flags|=1,sn(n,e,i,r),e.child)}function Tp(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!tf(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,Gg(n,e,s,i,r)):(n=_l(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&r)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:Ko,t(o,i)&&n.ref===e.ref)return Ni(n,e,r)}return e.flags|=1,n=ar(s,i),n.ref=e.ref,n.return=e,e.child=n}function Gg(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if(Ko(s,i)&&n.ref===e.ref)if(mn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)n.flags&131072&&(mn=!0);else return e.lanes=n.lanes,Ni(n,e,r)}return ph(n,e,t,i,r)}function Wg(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ct(Es,Mn),Mn|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,ct(Es,Mn),Mn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,ct(Es,Mn),Mn|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,ct(Es,Mn),Mn|=i;return sn(n,e,r,t),e.child}function jg(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function ph(n,e,t,i,r){var s=vn(t)?Fr:Qt.current;return s=Fs(e,s),Rs(e,r),t=Wd(n,e,t,i,s,r),i=jd(),n!==null&&!mn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Ni(n,e,r)):(vt&&i&&Nd(e),e.flags|=1,sn(n,e,t,r),e.child)}function Ap(n,e,t,i,r){if(vn(t)){var s=!0;Ul(e)}else s=!1;if(Rs(e,r),e.stateNode===null)ml(n,e),Bg(e,t,i),dh(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=On(c):(c=vn(t)?Fr:Qt.current,c=Fs(e,c));var u=t.getDerivedStateFromProps,f=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&yp(e,o,i,c),$i=!1;var d=e.memoizedState;o.state=d,Bl(e,i,o,r),l=e.memoizedState,a!==i||d!==l||gn.current||$i?(typeof u=="function"&&(hh(e,t,u,i),l=e.memoizedState),(a=$i||xp(e,t,a,i,d,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,xg(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:jn(e.type,a),o.props=c,f=e.pendingProps,d=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=On(l):(l=vn(t)?Fr:Qt.current,l=Fs(e,l));var p=t.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||d!==l)&&yp(e,o,i,l),$i=!1,d=e.memoizedState,o.state=d,Bl(e,i,o,r);var m=e.memoizedState;a!==f||d!==m||gn.current||$i?(typeof p=="function"&&(hh(e,t,p,i),m=e.memoizedState),(c=$i||xp(e,t,c,i,d,m,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,m,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=m),o.props=i,o.state=m,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&d===n.memoizedState||(e.flags|=1024),i=!1)}return mh(n,e,t,i,s,r)}function mh(n,e,t,i,r,s){jg(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&hp(e,t,!1),Ni(n,e,s);i=e.stateNode,cy.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=ks(e,n.child,null,s),e.child=ks(e,null,a,s)):sn(n,e,a,s),e.memoizedState=i.state,r&&hp(e,t,!0),e.child}function Xg(n){var e=n.stateNode;e.pendingContext?up(n,e.pendingContext,e.pendingContext!==e.context):e.context&&up(n,e.context,!1),Bd(n,e.containerInfo)}function bp(n,e,t,i,r){return Os(),Dd(r),e.flags|=256,sn(n,e,t,i),e.child}var gh={dehydrated:null,treeContext:null,retryLane:0};function vh(n){return{baseLanes:n,cachePool:null,transitions:null}}function Yg(n,e,t){var i=e.pendingProps,r=yt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),ct(yt,r&1),n===null)return ch(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=dc(o,i,0,null),n=Ur(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=vh(t),e.memoizedState=gh,n):$d(e,o));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return uy(n,e,o,i,a,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=ar(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=ar(a,s):(s=Ur(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?vh(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=gh,i}return s=n.child,n=s.sibling,i=ar(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function $d(n,e){return e=dc({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Ia(n,e,t,i){return i!==null&&Dd(i),ks(e,n.child,null,t),n=$d(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function uy(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=jc(Error(se(422))),Ia(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=dc({mode:"visible",children:i.children},r,0,null),s=Ur(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&ks(e,n.child,null,o),e.child.memoizedState=vh(o),e.memoizedState=gh,s);if(!(e.mode&1))return Ia(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(se(419)),i=jc(s,i,void 0),Ia(n,e,o,i)}if(a=(o&n.childLanes)!==0,mn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Li(n,r),Jn(i,n,r,-1))}return ef(),i=jc(Error(se(421))),Ia(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=Ey.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,Tn=ir(r.nextSibling),An=e,vt=!0,Yn=null,n!==null&&(Nn[In++]=Ei,Nn[In++]=wi,Nn[In++]=Or,Ei=n.id,wi=n.overflow,Or=e),e=$d(e,i.children),e.flags|=4096,e)}function Cp(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),uh(n.return,e,t)}function Xc(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function $g(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(sn(n,e,i.children,t),i=yt.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Cp(n,t,e);else if(n.tag===19)Cp(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(ct(yt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&Hl(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),Xc(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&Hl(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}Xc(e,!0,t,null,s);break;case"together":Xc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ml(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Ni(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),zr|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(se(153));if(e.child!==null){for(n=e.child,t=ar(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=ar(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function hy(n,e,t){switch(e.tag){case 3:Xg(e),Os();break;case 5:yg(e);break;case 1:vn(e.type)&&Ul(e);break;case 4:Bd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ct(kl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ct(yt,yt.current&1),e.flags|=128,null):t&e.child.childLanes?Yg(n,e,t):(ct(yt,yt.current&1),n=Ni(n,e,t),n!==null?n.sibling:null);ct(yt,yt.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return $g(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ct(yt,yt.current),i)break;return null;case 22:case 23:return e.lanes=0,Wg(n,e,t)}return Ni(n,e,t)}var qg,_h,Kg,Zg;qg=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};_h=function(){};Kg=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,Lr(ui.current);var s=null;switch(t){case"input":r=Bu(n,r),i=Bu(n,i),s=[];break;case"select":r=Et({},r,{value:void 0}),i=Et({},i,{value:void 0}),s=[];break;case"textarea":r=Gu(n,r),i=Gu(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=Il)}ju(t,i);var o;t=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Go.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Go.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ft("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Zg=function(n,e,t,i){t!==i&&(e.flags|=4)};function fo(n,e){if(!vt)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function qt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function dy(n,e,t){var i=e.pendingProps;switch(Id(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qt(e),null;case 1:return vn(e.type)&&Dl(),qt(e),null;case 3:return i=e.stateNode,zs(),pt(gn),pt(Qt),Vd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(La(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Yn!==null&&(Ah(Yn),Yn=null))),_h(n,e),qt(e),null;case 5:Hd(e);var r=Lr(ta.current);if(t=e.type,n!==null&&e.stateNode!=null)Kg(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return qt(e),null}if(n=Lr(ui.current),La(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[ai]=e,i[Qo]=s,n=(e.mode&1)!==0,t){case"dialog":ft("cancel",i),ft("close",i);break;case"iframe":case"object":case"embed":ft("load",i);break;case"video":case"audio":for(r=0;r<To.length;r++)ft(To[r],i);break;case"source":ft("error",i);break;case"img":case"image":case"link":ft("error",i),ft("load",i);break;case"details":ft("toggle",i);break;case"input":Of(i,s),ft("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ft("invalid",i);break;case"textarea":zf(i,s),ft("invalid",i)}ju(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Pa(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Pa(i.textContent,a,n),r=["children",""+a]):Go.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ft("scroll",i)}switch(t){case"input":Ma(i),kf(i,s,!0);break;case"textarea":Ma(i),Bf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Il)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=T0(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[ai]=e,n[Qo]=i,qg(n,e,!1,!1),e.stateNode=n;e:{switch(o=Xu(t,i),t){case"dialog":ft("cancel",n),ft("close",n),r=i;break;case"iframe":case"object":case"embed":ft("load",n),r=i;break;case"video":case"audio":for(r=0;r<To.length;r++)ft(To[r],n);r=i;break;case"source":ft("error",n),r=i;break;case"img":case"image":case"link":ft("error",n),ft("load",n),r=i;break;case"details":ft("toggle",n),r=i;break;case"input":Of(n,i),r=Bu(n,i),ft("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=Et({},i,{value:void 0}),ft("invalid",n);break;case"textarea":zf(n,i),r=Gu(n,i),ft("invalid",n);break;default:r=i}ju(t,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?C0(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&A0(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Wo(n,l):typeof l=="number"&&Wo(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Go.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ft("scroll",n):l!=null&&_d(n,s,l,o))}switch(t){case"input":Ma(n),kf(n,i,!1);break;case"textarea":Ma(n),Bf(n);break;case"option":i.value!=null&&n.setAttribute("value",""+ur(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?Ts(n,!!i.multiple,s,!1):i.defaultValue!=null&&Ts(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=Il)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return qt(e),null;case 6:if(n&&e.stateNode!=null)Zg(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(t=Lr(ta.current),Lr(ui.current),La(e)){if(i=e.stateNode,t=e.memoizedProps,i[ai]=e,(s=i.nodeValue!==t)&&(n=An,n!==null))switch(n.tag){case 3:Pa(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Pa(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[ai]=e,e.stateNode=i}return qt(e),null;case 13:if(pt(yt),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(vt&&Tn!==null&&e.mode&1&&!(e.flags&128))mg(),Os(),e.flags|=98560,s=!1;else if(s=La(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(se(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(se(317));s[ai]=e}else Os(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;qt(e),s=!1}else Yn!==null&&(Ah(Yn),Yn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||yt.current&1?Dt===0&&(Dt=3):ef())),e.updateQueue!==null&&(e.flags|=4),qt(e),null);case 4:return zs(),_h(n,e),n===null&&Zo(e.stateNode.containerInfo),qt(e),null;case 10:return Od(e.type._context),qt(e),null;case 17:return vn(e.type)&&Dl(),qt(e),null;case 19:if(pt(yt),s=e.memoizedState,s===null)return qt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)fo(s,!1);else{if(Dt!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=Hl(n),o!==null){for(e.flags|=128,fo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return ct(yt,yt.current&1|2),e.child}n=n.sibling}s.tail!==null&&At()>Hs&&(e.flags|=128,i=!0,fo(s,!1),e.lanes=4194304)}else{if(!i)if(n=Hl(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),fo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!vt)return qt(e),null}else 2*At()-s.renderingStartTime>Hs&&t!==1073741824&&(e.flags|=128,i=!0,fo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=At(),e.sibling=null,t=yt.current,ct(yt,i?t&1|2:t&1),e):(qt(e),null);case 22:case 23:return Qd(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Mn&1073741824&&(qt(e),e.subtreeFlags&6&&(e.flags|=8192)):qt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function fy(n,e){switch(Id(e),e.tag){case 1:return vn(e.type)&&Dl(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return zs(),pt(gn),pt(Qt),Vd(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return Hd(e),null;case 13:if(pt(yt),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(se(340));Os()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return pt(yt),null;case 4:return zs(),null;case 10:return Od(e.type._context),null;case 22:case 23:return Qd(),null;case 24:return null;default:return null}}var Da=!1,Jt=!1,py=typeof WeakSet=="function"?WeakSet:Set,ve=null;function Ms(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){Tt(n,e,i)}else t.current=null}function xh(n,e,t){try{t()}catch(i){Tt(n,e,i)}}var Rp=!1;function my(n,e){if(nh=Pl,n=ng(),Ld(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,u=0,f=n,d=null;t:for(;;){for(var p;f!==t||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)d=f,f=p;for(;;){if(f===n)break t;if(d===t&&++c===r&&(a=o),d===s&&++u===i&&(l=o),(p=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=p}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(ih={focusedElem:n,selectionRange:t},Pl=!1,ve=e;ve!==null;)if(e=ve,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,ve=n;else for(;ve!==null;){e=ve;try{var m=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var _=m.memoizedProps,v=m.memoizedState,h=e.stateNode,g=h.getSnapshotBeforeUpdate(e.elementType===e.type?_:jn(e.type,_),v);h.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(y){Tt(e,e.return,y)}if(n=e.sibling,n!==null){n.return=e.return,ve=n;break}ve=e.return}return m=Rp,Rp=!1,m}function Do(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&xh(e,t,s)}r=r.next}while(r!==i)}}function uc(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function yh(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function Jg(n){var e=n.alternate;e!==null&&(n.alternate=null,Jg(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[ai],delete e[Qo],delete e[oh],delete e[Zx],delete e[Jx])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Qg(n){return n.tag===5||n.tag===3||n.tag===4}function Pp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Qg(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Sh(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Il));else if(i!==4&&(n=n.child,n!==null))for(Sh(n,e,t),n=n.sibling;n!==null;)Sh(n,e,t),n=n.sibling}function Mh(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(Mh(n,e,t),n=n.sibling;n!==null;)Mh(n,e,t),n=n.sibling}var Vt=null,Xn=!1;function Bi(n,e,t){for(t=t.child;t!==null;)ev(n,e,t),t=t.sibling}function ev(n,e,t){if(ci&&typeof ci.onCommitFiberUnmount=="function")try{ci.onCommitFiberUnmount(nc,t)}catch{}switch(t.tag){case 5:Jt||Ms(t,e);case 6:var i=Vt,r=Xn;Vt=null,Bi(n,e,t),Vt=i,Xn=r,Vt!==null&&(Xn?(n=Vt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Vt.removeChild(t.stateNode));break;case 18:Vt!==null&&(Xn?(n=Vt,t=t.stateNode,n.nodeType===8?zc(n.parentNode,t):n.nodeType===1&&zc(n,t),$o(n)):zc(Vt,t.stateNode));break;case 4:i=Vt,r=Xn,Vt=t.stateNode.containerInfo,Xn=!0,Bi(n,e,t),Vt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!Jt&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&xh(t,e,o),r=r.next}while(r!==i)}Bi(n,e,t);break;case 1:if(!Jt&&(Ms(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){Tt(t,e,a)}Bi(n,e,t);break;case 21:Bi(n,e,t);break;case 22:t.mode&1?(Jt=(i=Jt)||t.memoizedState!==null,Bi(n,e,t),Jt=i):Bi(n,e,t);break;default:Bi(n,e,t)}}function Lp(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new py),e.forEach(function(i){var r=wy.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Hn(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Vt=a.stateNode,Xn=!1;break e;case 3:Vt=a.stateNode.containerInfo,Xn=!0;break e;case 4:Vt=a.stateNode.containerInfo,Xn=!0;break e}a=a.return}if(Vt===null)throw Error(se(160));ev(s,o,r),Vt=null,Xn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Tt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)tv(e,n),e=e.sibling}function tv(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Hn(e,n),ri(n),i&4){try{Do(3,n,n.return),uc(3,n)}catch(_){Tt(n,n.return,_)}try{Do(5,n,n.return)}catch(_){Tt(n,n.return,_)}}break;case 1:Hn(e,n),ri(n),i&512&&t!==null&&Ms(t,t.return);break;case 5:if(Hn(e,n),ri(n),i&512&&t!==null&&Ms(t,t.return),n.flags&32){var r=n.stateNode;try{Wo(r,"")}catch(_){Tt(n,n.return,_)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&E0(r,s),Xu(a,o);var c=Xu(a,s);for(o=0;o<l.length;o+=2){var u=l[o],f=l[o+1];u==="style"?C0(r,f):u==="dangerouslySetInnerHTML"?A0(r,f):u==="children"?Wo(r,f):_d(r,u,f,c)}switch(a){case"input":Hu(r,s);break;case"textarea":w0(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ts(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?Ts(r,!!s.multiple,s.defaultValue,!0):Ts(r,!!s.multiple,s.multiple?[]:"",!1))}r[Qo]=s}catch(_){Tt(n,n.return,_)}}break;case 6:if(Hn(e,n),ri(n),i&4){if(n.stateNode===null)throw Error(se(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(_){Tt(n,n.return,_)}}break;case 3:if(Hn(e,n),ri(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{$o(e.containerInfo)}catch(_){Tt(n,n.return,_)}break;case 4:Hn(e,n),ri(n);break;case 13:Hn(e,n),ri(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Zd=At())),i&4&&Lp(n);break;case 22:if(u=t!==null&&t.memoizedState!==null,n.mode&1?(Jt=(c=Jt)||u,Hn(e,n),Jt=c):Hn(e,n),ri(n),i&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!u&&n.mode&1)for(ve=n,u=n.child;u!==null;){for(f=ve=u;ve!==null;){switch(d=ve,p=d.child,d.tag){case 0:case 11:case 14:case 15:Do(4,d,d.return);break;case 1:Ms(d,d.return);var m=d.stateNode;if(typeof m.componentWillUnmount=="function"){i=d,t=d.return;try{e=i,m.props=e.memoizedProps,m.state=e.memoizedState,m.componentWillUnmount()}catch(_){Tt(i,t,_)}}break;case 5:Ms(d,d.return);break;case 22:if(d.memoizedState!==null){Ip(f);continue}}p!==null?(p.return=d,ve=p):Ip(f)}u=u.sibling}e:for(u=null,f=n;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=b0("display",o))}catch(_){Tt(n,n.return,_)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(_){Tt(n,n.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===n)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===n)break e;for(;f.sibling===null;){if(f.return===null||f.return===n)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Hn(e,n),ri(n),i&4&&Lp(n);break;case 21:break;default:Hn(e,n),ri(n)}}function ri(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(Qg(t)){var i=t;break e}t=t.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Wo(r,""),i.flags&=-33);var s=Pp(n);Mh(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Pp(n);Sh(n,a,o);break;default:throw Error(se(161))}}catch(l){Tt(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function gy(n,e,t){ve=n,nv(n)}function nv(n,e,t){for(var i=(n.mode&1)!==0;ve!==null;){var r=ve,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Da;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Jt;a=Da;var c=Jt;if(Da=o,(Jt=l)&&!c)for(ve=r;ve!==null;)o=ve,l=o.child,o.tag===22&&o.memoizedState!==null?Dp(r):l!==null?(l.return=o,ve=l):Dp(r);for(;s!==null;)ve=s,nv(s),s=s.sibling;ve=r,Da=a,Jt=c}Np(n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ve=s):Np(n)}}function Np(n){for(;ve!==null;){var e=ve;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Jt||uc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Jt)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:jn(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&gp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}gp(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&$o(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}Jt||e.flags&512&&yh(e)}catch(d){Tt(e,e.return,d)}}if(e===n){ve=null;break}if(t=e.sibling,t!==null){t.return=e.return,ve=t;break}ve=e.return}}function Ip(n){for(;ve!==null;){var e=ve;if(e===n){ve=null;break}var t=e.sibling;if(t!==null){t.return=e.return,ve=t;break}ve=e.return}}function Dp(n){for(;ve!==null;){var e=ve;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{uc(4,e)}catch(l){Tt(e,t,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Tt(e,r,l)}}var s=e.return;try{yh(e)}catch(l){Tt(e,s,l)}break;case 5:var o=e.return;try{yh(e)}catch(l){Tt(e,o,l)}}}catch(l){Tt(e,e.return,l)}if(e===n){ve=null;break}var a=e.sibling;if(a!==null){a.return=e.return,ve=a;break}ve=e.return}}var vy=Math.ceil,Wl=Fi.ReactCurrentDispatcher,qd=Fi.ReactCurrentOwner,Fn=Fi.ReactCurrentBatchConfig,Qe=0,Ht=null,Ct=null,jt=0,Mn=0,Es=fr(0),Dt=0,sa=null,zr=0,hc=0,Kd=0,Uo=null,pn=null,Zd=0,Hs=1/0,Si=null,jl=!1,Eh=null,sr=null,Ua=!1,Qi=null,Xl=0,Fo=0,wh=null,gl=-1,vl=0;function on(){return Qe&6?At():gl!==-1?gl:gl=At()}function or(n){return n.mode&1?Qe&2&&jt!==0?jt&-jt:ey.transition!==null?(vl===0&&(vl=B0()),vl):(n=rt,n!==0||(n=window.event,n=n===void 0?16:Y0(n.type)),n):1}function Jn(n,e,t,i){if(50<Fo)throw Fo=0,wh=null,Error(se(185));ua(n,t,i),(!(Qe&2)||n!==Ht)&&(n===Ht&&(!(Qe&2)&&(hc|=t),Dt===4&&Ki(n,jt)),_n(n,i),t===1&&Qe===0&&!(e.mode&1)&&(Hs=At()+500,ac&&pr()))}function _n(n,e){var t=n.callbackNode;ex(n,e);var i=Rl(n,n===Ht?jt:0);if(i===0)t!==null&&Gf(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&Gf(t),e===1)n.tag===0?Qx(Up.bind(null,n)):dg(Up.bind(null,n)),qx(function(){!(Qe&6)&&pr()}),t=null;else{switch(H0(i)){case 1:t=Ed;break;case 4:t=k0;break;case 16:t=Cl;break;case 536870912:t=z0;break;default:t=Cl}t=uv(t,iv.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function iv(n,e){if(gl=-1,vl=0,Qe&6)throw Error(se(327));var t=n.callbackNode;if(Ps()&&n.callbackNode!==t)return null;var i=Rl(n,n===Ht?jt:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=Yl(n,i);else{e=i;var r=Qe;Qe|=2;var s=sv();(Ht!==n||jt!==e)&&(Si=null,Hs=At()+500,Dr(n,e));do try{yy();break}catch(a){rv(n,a)}while(!0);Fd(),Wl.current=s,Qe=r,Ct!==null?e=0:(Ht=null,jt=0,e=Dt)}if(e!==0){if(e===2&&(r=Zu(n),r!==0&&(i=r,e=Th(n,r))),e===1)throw t=sa,Dr(n,0),Ki(n,i),_n(n,At()),t;if(e===6)Ki(n,i);else{if(r=n.current.alternate,!(i&30)&&!_y(r)&&(e=Yl(n,i),e===2&&(s=Zu(n),s!==0&&(i=s,e=Th(n,s))),e===1))throw t=sa,Dr(n,0),Ki(n,i),_n(n,At()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:Er(n,pn,Si);break;case 3:if(Ki(n,i),(i&130023424)===i&&(e=Zd+500-At(),10<e)){if(Rl(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){on(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=sh(Er.bind(null,n,pn,Si),e);break}Er(n,pn,Si);break;case 4:if(Ki(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-Zn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=At()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*vy(i/1960))-i,10<i){n.timeoutHandle=sh(Er.bind(null,n,pn,Si),i);break}Er(n,pn,Si);break;case 5:Er(n,pn,Si);break;default:throw Error(se(329))}}}return _n(n,At()),n.callbackNode===t?iv.bind(null,n):null}function Th(n,e){var t=Uo;return n.current.memoizedState.isDehydrated&&(Dr(n,e).flags|=256),n=Yl(n,e),n!==2&&(e=pn,pn=t,e!==null&&Ah(e)),n}function Ah(n){pn===null?pn=n:pn.push.apply(pn,n)}function _y(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!ni(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ki(n,e){for(e&=~Kd,e&=~hc,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-Zn(e),i=1<<t;n[t]=-1,e&=~i}}function Up(n){if(Qe&6)throw Error(se(327));Ps();var e=Rl(n,0);if(!(e&1))return _n(n,At()),null;var t=Yl(n,e);if(n.tag!==0&&t===2){var i=Zu(n);i!==0&&(e=i,t=Th(n,i))}if(t===1)throw t=sa,Dr(n,0),Ki(n,e),_n(n,At()),t;if(t===6)throw Error(se(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Er(n,pn,Si),_n(n,At()),null}function Jd(n,e){var t=Qe;Qe|=1;try{return n(e)}finally{Qe=t,Qe===0&&(Hs=At()+500,ac&&pr())}}function Br(n){Qi!==null&&Qi.tag===0&&!(Qe&6)&&Ps();var e=Qe;Qe|=1;var t=Fn.transition,i=rt;try{if(Fn.transition=null,rt=1,n)return n()}finally{rt=i,Fn.transition=t,Qe=e,!(Qe&6)&&pr()}}function Qd(){Mn=Es.current,pt(Es)}function Dr(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,$x(t)),Ct!==null)for(t=Ct.return;t!==null;){var i=t;switch(Id(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Dl();break;case 3:zs(),pt(gn),pt(Qt),Vd();break;case 5:Hd(i);break;case 4:zs();break;case 13:pt(yt);break;case 19:pt(yt);break;case 10:Od(i.type._context);break;case 22:case 23:Qd()}t=t.return}if(Ht=n,Ct=n=ar(n.current,null),jt=Mn=e,Dt=0,sa=null,Kd=hc=zr=0,pn=Uo=null,Pr!==null){for(e=0;e<Pr.length;e++)if(t=Pr[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}Pr=null}return n}function rv(n,e){do{var t=Ct;try{if(Fd(),fl.current=Gl,Vl){for(var i=St.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Vl=!1}if(kr=0,Bt=Nt=St=null,Io=!1,na=0,qd.current=null,t===null||t.return===null){Dt=1,sa=e,Ct=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=jt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var d=u.alternate;d?(u.updateQueue=d.updateQueue,u.memoizedState=d.memoizedState,u.lanes=d.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Mp(o);if(p!==null){p.flags&=-257,Ep(p,o,a,s,e),p.mode&1&&Sp(s,c,e),e=p,l=c;var m=e.updateQueue;if(m===null){var _=new Set;_.add(l),e.updateQueue=_}else m.add(l);break e}else{if(!(e&1)){Sp(s,c,e),ef();break e}l=Error(se(426))}}else if(vt&&a.mode&1){var v=Mp(o);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Ep(v,o,a,s,e),Dd(Bs(l,a));break e}}s=l=Bs(l,a),Dt!==4&&(Dt=2),Uo===null?Uo=[s]:Uo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=Hg(s,l,e);mp(s,h);break e;case 1:a=l;var g=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(sr===null||!sr.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=Vg(s,a,e);mp(s,y);break e}}s=s.return}while(s!==null)}av(t)}catch(R){e=R,Ct===t&&t!==null&&(Ct=t=t.return);continue}break}while(!0)}function sv(){var n=Wl.current;return Wl.current=Gl,n===null?Gl:n}function ef(){(Dt===0||Dt===3||Dt===2)&&(Dt=4),Ht===null||!(zr&268435455)&&!(hc&268435455)||Ki(Ht,jt)}function Yl(n,e){var t=Qe;Qe|=2;var i=sv();(Ht!==n||jt!==e)&&(Si=null,Dr(n,e));do try{xy();break}catch(r){rv(n,r)}while(!0);if(Fd(),Qe=t,Wl.current=i,Ct!==null)throw Error(se(261));return Ht=null,jt=0,Dt}function xy(){for(;Ct!==null;)ov(Ct)}function yy(){for(;Ct!==null&&!j_();)ov(Ct)}function ov(n){var e=cv(n.alternate,n,Mn);n.memoizedProps=n.pendingProps,e===null?av(n):Ct=e,qd.current=null}function av(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=fy(t,e),t!==null){t.flags&=32767,Ct=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Dt=6,Ct=null;return}}else if(t=dy(t,e,Mn),t!==null){Ct=t;return}if(e=e.sibling,e!==null){Ct=e;return}Ct=e=n}while(e!==null);Dt===0&&(Dt=5)}function Er(n,e,t){var i=rt,r=Fn.transition;try{Fn.transition=null,rt=1,Sy(n,e,t,i)}finally{Fn.transition=r,rt=i}return null}function Sy(n,e,t,i){do Ps();while(Qi!==null);if(Qe&6)throw Error(se(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(se(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(tx(n,s),n===Ht&&(Ct=Ht=null,jt=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Ua||(Ua=!0,uv(Cl,function(){return Ps(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=Fn.transition,Fn.transition=null;var o=rt;rt=1;var a=Qe;Qe|=4,qd.current=null,my(n,t),tv(t,n),Hx(ih),Pl=!!nh,ih=nh=null,n.current=t,gy(t),X_(),Qe=a,rt=o,Fn.transition=s}else n.current=t;if(Ua&&(Ua=!1,Qi=n,Xl=r),s=n.pendingLanes,s===0&&(sr=null),q_(t.stateNode),_n(n,At()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(jl)throw jl=!1,n=Eh,Eh=null,n;return Xl&1&&n.tag!==0&&Ps(),s=n.pendingLanes,s&1?n===wh?Fo++:(Fo=0,wh=n):Fo=0,pr(),null}function Ps(){if(Qi!==null){var n=H0(Xl),e=Fn.transition,t=rt;try{if(Fn.transition=null,rt=16>n?16:n,Qi===null)var i=!1;else{if(n=Qi,Qi=null,Xl=0,Qe&6)throw Error(se(331));var r=Qe;for(Qe|=4,ve=n.current;ve!==null;){var s=ve,o=s.child;if(ve.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(ve=c;ve!==null;){var u=ve;switch(u.tag){case 0:case 11:case 15:Do(8,u,s)}var f=u.child;if(f!==null)f.return=u,ve=f;else for(;ve!==null;){u=ve;var d=u.sibling,p=u.return;if(Jg(u),u===c){ve=null;break}if(d!==null){d.return=p,ve=d;break}ve=p}}}var m=s.alternate;if(m!==null){var _=m.child;if(_!==null){m.child=null;do{var v=_.sibling;_.sibling=null,_=v}while(_!==null)}}ve=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,ve=o;else e:for(;ve!==null;){if(s=ve,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Do(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,ve=h;break e}ve=s.return}}var g=n.current;for(ve=g;ve!==null;){o=ve;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,ve=x;else e:for(o=g;ve!==null;){if(a=ve,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:uc(9,a)}}catch(R){Tt(a,a.return,R)}if(a===o){ve=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,ve=y;break e}ve=a.return}}if(Qe=r,pr(),ci&&typeof ci.onPostCommitFiberRoot=="function")try{ci.onPostCommitFiberRoot(nc,n)}catch{}i=!0}return i}finally{rt=t,Fn.transition=e}}return!1}function Fp(n,e,t){e=Bs(t,e),e=Hg(n,e,1),n=rr(n,e,1),e=on(),n!==null&&(ua(n,1,e),_n(n,e))}function Tt(n,e,t){if(n.tag===3)Fp(n,n,t);else for(;e!==null;){if(e.tag===3){Fp(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(sr===null||!sr.has(i))){n=Bs(t,n),n=Vg(e,n,1),e=rr(e,n,1),n=on(),e!==null&&(ua(e,1,n),_n(e,n));break}}e=e.return}}function My(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=on(),n.pingedLanes|=n.suspendedLanes&t,Ht===n&&(jt&t)===t&&(Dt===4||Dt===3&&(jt&130023424)===jt&&500>At()-Zd?Dr(n,0):Kd|=t),_n(n,e)}function lv(n,e){e===0&&(n.mode&1?(e=Ta,Ta<<=1,!(Ta&130023424)&&(Ta=4194304)):e=1);var t=on();n=Li(n,e),n!==null&&(ua(n,e,t),_n(n,t))}function Ey(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),lv(n,t)}function wy(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),lv(n,t)}var cv;cv=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||gn.current)mn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return mn=!1,hy(n,e,t);mn=!!(n.flags&131072)}else mn=!1,vt&&e.flags&1048576&&fg(e,Ol,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;ml(n,e),n=e.pendingProps;var r=Fs(e,Qt.current);Rs(e,t),r=Wd(null,e,i,n,r,t);var s=jd();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,vn(i)?(s=!0,Ul(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,zd(e),r.updater=cc,e.stateNode=r,r._reactInternals=e,dh(e,i,n,t),e=mh(null,e,i,!0,s,t)):(e.tag=0,vt&&s&&Nd(e),sn(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(ml(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Ay(i),n=jn(i,n),r){case 0:e=ph(null,e,i,n,t);break e;case 1:e=Ap(null,e,i,n,t);break e;case 11:e=wp(null,e,i,n,t);break e;case 14:e=Tp(null,e,i,jn(i.type,n),t);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),ph(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),Ap(n,e,i,r,t);case 3:e:{if(Xg(e),n===null)throw Error(se(387));i=e.pendingProps,s=e.memoizedState,r=s.element,xg(n,e),Bl(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Bs(Error(se(423)),e),e=bp(n,e,i,t,r);break e}else if(i!==r){r=Bs(Error(se(424)),e),e=bp(n,e,i,t,r);break e}else for(Tn=ir(e.stateNode.containerInfo.firstChild),An=e,vt=!0,Yn=null,t=vg(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Os(),i===r){e=Ni(n,e,t);break e}sn(n,e,i,t)}e=e.child}return e;case 5:return yg(e),n===null&&ch(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,rh(i,r)?o=null:s!==null&&rh(i,s)&&(e.flags|=32),jg(n,e),sn(n,e,o,t),e.child;case 6:return n===null&&ch(e),null;case 13:return Yg(n,e,t);case 4:return Bd(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=ks(e,null,i,t):sn(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),wp(n,e,i,r,t);case 7:return sn(n,e,e.pendingProps,t),e.child;case 8:return sn(n,e,e.pendingProps.children,t),e.child;case 12:return sn(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ct(kl,i._currentValue),i._currentValue=o,s!==null)if(ni(s.value,o)){if(s.children===r.children&&!gn.current){e=Ni(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=bi(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),uh(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(se(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),uh(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}sn(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Rs(e,t),r=On(r),i=i(r),e.flags|=1,sn(n,e,i,t),e.child;case 14:return i=e.type,r=jn(i,e.pendingProps),r=jn(i.type,r),Tp(n,e,i,r,t);case 15:return Gg(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),ml(n,e),e.tag=1,vn(i)?(n=!0,Ul(e)):n=!1,Rs(e,t),Bg(e,i,r),dh(e,i,r,t),mh(null,e,i,!0,n,t);case 19:return $g(n,e,t);case 22:return Wg(n,e,t)}throw Error(se(156,e.tag))};function uv(n,e){return O0(n,e)}function Ty(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Un(n,e,t,i){return new Ty(n,e,t,i)}function tf(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Ay(n){if(typeof n=="function")return tf(n)?1:0;if(n!=null){if(n=n.$$typeof,n===yd)return 11;if(n===Sd)return 14}return 2}function ar(n,e){var t=n.alternate;return t===null?(t=Un(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function _l(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")tf(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case fs:return Ur(t.children,r,s,e);case xd:o=8,r|=8;break;case Fu:return n=Un(12,t,e,r|2),n.elementType=Fu,n.lanes=s,n;case Ou:return n=Un(13,t,e,r),n.elementType=Ou,n.lanes=s,n;case ku:return n=Un(19,t,e,r),n.elementType=ku,n.lanes=s,n;case y0:return dc(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case _0:o=10;break e;case x0:o=9;break e;case yd:o=11;break e;case Sd:o=14;break e;case Yi:o=16,i=null;break e}throw Error(se(130,n==null?n:typeof n,""))}return e=Un(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function Ur(n,e,t,i){return n=Un(7,n,i,e),n.lanes=t,n}function dc(n,e,t,i){return n=Un(22,n,i,e),n.elementType=y0,n.lanes=t,n.stateNode={isHidden:!1},n}function Yc(n,e,t){return n=Un(6,n,null,e),n.lanes=t,n}function $c(n,e,t){return e=Un(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function by(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Cc(0),this.expirationTimes=Cc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function nf(n,e,t,i,r,s,o,a,l){return n=new by(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Un(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},zd(s),n}function Cy(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ds,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function hv(n){if(!n)return hr;n=n._reactInternals;e:{if(jr(n)!==n||n.tag!==1)throw Error(se(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(vn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(n.tag===1){var t=n.type;if(vn(t))return hg(n,t,e)}return e}function dv(n,e,t,i,r,s,o,a,l){return n=nf(t,i,!0,n,r,s,o,a,l),n.context=hv(null),t=n.current,i=on(),r=or(t),s=bi(i,r),s.callback=e??null,rr(t,s,r),n.current.lanes=r,ua(n,r,i),_n(n,i),n}function fc(n,e,t,i){var r=e.current,s=on(),o=or(r);return t=hv(t),e.context===null?e.context=t:e.pendingContext=t,e=bi(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=rr(r,e,o),n!==null&&(Jn(n,r,o,s),dl(n,r,o)),o}function $l(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Op(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function rf(n,e){Op(n,e),(n=n.alternate)&&Op(n,e)}function Ry(){return null}var fv=typeof reportError=="function"?reportError:function(n){console.error(n)};function sf(n){this._internalRoot=n}pc.prototype.render=sf.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(se(409));fc(n,e,null,null)};pc.prototype.unmount=sf.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Br(function(){fc(null,n,null,null)}),e[Pi]=null}};function pc(n){this._internalRoot=n}pc.prototype.unstable_scheduleHydration=function(n){if(n){var e=W0();n={blockedOn:null,target:n,priority:e};for(var t=0;t<qi.length&&e!==0&&e<qi[t].priority;t++);qi.splice(t,0,n),t===0&&X0(n)}};function of(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function mc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function kp(){}function Py(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=$l(o);s.call(c)}}var o=dv(e,i,n,0,null,!1,!1,"",kp);return n._reactRootContainer=o,n[Pi]=o.current,Zo(n.nodeType===8?n.parentNode:n),Br(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=$l(l);a.call(c)}}var l=nf(n,0,!1,null,null,!1,!1,"",kp);return n._reactRootContainer=l,n[Pi]=l.current,Zo(n.nodeType===8?n.parentNode:n),Br(function(){fc(e,l,t,i)}),l}function gc(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=$l(o);a.call(l)}}fc(e,o,n,r)}else o=Py(t,e,n,r,i);return $l(o)}V0=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=wo(e.pendingLanes);t!==0&&(wd(e,t|1),_n(e,At()),!(Qe&6)&&(Hs=At()+500,pr()))}break;case 13:Br(function(){var i=Li(n,1);if(i!==null){var r=on();Jn(i,n,1,r)}}),rf(n,1)}};Td=function(n){if(n.tag===13){var e=Li(n,134217728);if(e!==null){var t=on();Jn(e,n,134217728,t)}rf(n,134217728)}};G0=function(n){if(n.tag===13){var e=or(n),t=Li(n,e);if(t!==null){var i=on();Jn(t,n,e,i)}rf(n,e)}};W0=function(){return rt};j0=function(n,e){var t=rt;try{return rt=n,e()}finally{rt=t}};$u=function(n,e,t){switch(e){case"input":if(Hu(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=oc(i);if(!r)throw Error(se(90));M0(i),Hu(i,r)}}}break;case"textarea":w0(n,t);break;case"select":e=t.value,e!=null&&Ts(n,!!t.multiple,e,!1)}};L0=Jd;N0=Br;var Ly={usingClientEntryPoint:!1,Events:[da,vs,oc,R0,P0,Jd]},po={findFiberByHostInstance:Rr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ny={bundleType:po.bundleType,version:po.version,rendererPackageName:po.rendererPackageName,rendererConfig:po.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fi.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=U0(n),n===null?null:n.stateNode},findFiberByHostInstance:po.findFiberByHostInstance||Ry,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fa.isDisabled&&Fa.supportsFiber)try{nc=Fa.inject(Ny),ci=Fa}catch{}}Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ly;Cn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!of(e))throw Error(se(200));return Cy(n,e,null,t)};Cn.createRoot=function(n,e){if(!of(n))throw Error(se(299));var t=!1,i="",r=fv;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=nf(n,1,!1,null,null,t,!1,i,r),n[Pi]=e.current,Zo(n.nodeType===8?n.parentNode:n),new sf(e)};Cn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(se(188)):(n=Object.keys(n).join(","),Error(se(268,n)));return n=U0(e),n=n===null?null:n.stateNode,n};Cn.flushSync=function(n){return Br(n)};Cn.hydrate=function(n,e,t){if(!mc(e))throw Error(se(200));return gc(null,n,e,!0,t)};Cn.hydrateRoot=function(n,e,t){if(!of(n))throw Error(se(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=fv;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=dv(e,null,n,1,t??null,r,!1,s,o),n[Pi]=e.current,Zo(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new pc(e)};Cn.render=function(n,e,t){if(!mc(e))throw Error(se(200));return gc(null,n,e,!1,t)};Cn.unmountComponentAtNode=function(n){if(!mc(n))throw Error(se(40));return n._reactRootContainer?(Br(function(){gc(null,null,n,!1,function(){n._reactRootContainer=null,n[Pi]=null})}),!0):!1};Cn.unstable_batchedUpdates=Jd;Cn.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!mc(t))throw Error(se(200));if(n==null||n._reactInternals===void 0)throw Error(se(38));return gc(n,e,t,!1,i)};Cn.version="18.3.1-next-f1338f8080-20240426";function pv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pv)}catch(n){console.error(n)}}pv(),p0.exports=Cn;var Iy=p0.exports,zp=Iy;Du.createRoot=zp.createRoot,Du.hydrateRoot=zp.hydrateRoot;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const af="170",Dy=0,Bp=1,Uy=2,mv=1,gv=2,yi=3,Ii=0,an=1,Dn=2,lr=0,Ls=1,oa=2,Hp=3,Vp=4,Fy=5,br=100,Oy=101,ky=102,zy=103,By=104,Hy=200,Vy=201,Gy=202,Wy=203,bh=204,Ch=205,jy=206,Xy=207,Yy=208,$y=209,qy=210,Ky=211,Zy=212,Jy=213,Qy=214,Rh=0,Ph=1,Lh=2,Vs=3,Nh=4,Ih=5,Dh=6,Uh=7,vv=0,eS=1,tS=2,cr=0,nS=1,iS=2,rS=3,_v=4,sS=5,oS=6,aS=7,xv=300,Gs=301,Ws=302,Fh=303,Oh=304,vc=306,Hr=1e3,Nr=1001,kh=1002,Qn=1003,lS=1004,Oa=1005,li=1006,qc=1007,Ir=1008,Di=1009,yv=1010,Sv=1011,aa=1012,lf=1013,Vr=1014,Ti=1015,pa=1016,cf=1017,uf=1018,js=1020,Mv=35902,Ev=1021,wv=1022,qn=1023,Tv=1024,Av=1025,Ns=1026,Xs=1027,bv=1028,hf=1029,Cv=1030,df=1031,ff=1033,xl=33776,yl=33777,Sl=33778,Ml=33779,zh=35840,Bh=35841,Hh=35842,Vh=35843,Gh=36196,Wh=37492,jh=37496,Xh=37808,Yh=37809,$h=37810,qh=37811,Kh=37812,Zh=37813,Jh=37814,Qh=37815,ed=37816,td=37817,nd=37818,id=37819,rd=37820,sd=37821,El=36492,od=36494,ad=36495,Rv=36283,ld=36284,cd=36285,ud=36286,cS=3200,uS=3201,Pv=0,hS=1,Zi="",It="srgb",Zs="srgb-linear",_c="linear",st="srgb",$r=7680,Gp=519,dS=512,fS=513,pS=514,Lv=515,mS=516,gS=517,vS=518,_S=519,Wp=35044,jp="300 es",Ai=2e3,ql=2001;class Js{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xp=1234567;const Oo=Math.PI/180,la=180/Math.PI;function Qs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function Wt(n,e,t){return Math.max(e,Math.min(t,n))}function pf(n,e){return(n%e+e)%e}function xS(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function yS(n,e,t){return n!==e?(t-n)/(e-n):0}function ko(n,e,t){return(1-t)*n+t*e}function SS(n,e,t,i){return ko(n,e,1-Math.exp(-t*i))}function MS(n,e=1){return e-Math.abs(pf(n,e*2)-e)}function ES(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function wS(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function TS(n,e){return n+Math.floor(Math.random()*(e-n+1))}function AS(n,e){return n+Math.random()*(e-n)}function bS(n){return n*(.5-Math.random())}function CS(n){n!==void 0&&(Xp=n);let e=Xp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function RS(n){return n*Oo}function PS(n){return n*la}function LS(n){return(n&n-1)===0&&n!==0}function NS(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function IS(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function DS(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),d=o((e-i)/2),p=s((i-e)/2),m=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*f,l*d,a*c);break;case"YZY":n.set(l*d,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*d,a*u,a*c);break;case"XZX":n.set(a*u,l*m,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*m,a*c);break;case"ZYZ":n.set(l*m,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function hs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const zt={DEG2RAD:Oo,RAD2DEG:la,generateUUID:Qs,clamp:Wt,euclideanModulo:pf,mapLinear:xS,inverseLerp:yS,lerp:ko,damp:SS,pingpong:MS,smoothstep:ES,smootherstep:wS,randInt:TS,randFloat:AS,randFloatSpread:bS,seededRandom:CS,degToRad:RS,radToDeg:PS,isPowerOfTwo:LS,ceilPowerOfTwo:NS,floorPowerOfTwo:IS,setQuaternionFromProperEuler:DS,normalize:tn,denormalize:hs};class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,i,r,s,o,a,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],m=i[8],_=r[0],v=r[3],h=r[6],g=r[1],x=r[4],y=r[7],R=r[2],b=r[5],A=r[8];return s[0]=o*_+a*g+l*R,s[3]=o*v+a*x+l*b,s[6]=o*h+a*y+l*A,s[1]=c*_+u*g+f*R,s[4]=c*v+u*x+f*b,s[7]=c*h+u*y+f*A,s[2]=d*_+p*g+m*R,s[5]=d*v+p*x+m*b,s[8]=d*h+p*y+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,d=a*l-u*s,p=c*s-o*l,m=t*f+i*d+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=d*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Kc.makeScale(e,t)),this}rotate(e){return this.premultiply(Kc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Kc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Kc=new Be;function Nv(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Kl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function US(){const n=Kl("canvas");return n.style.display="block",n}const Yp={};function Ao(n){n in Yp||(Yp[n]=!0,console.warn(n))}function FS(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function OS(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function kS(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Je={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===st&&(n.r=Ci(n.r),n.g=Ci(n.g),n.b=Ci(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===st&&(n.r=Is(n.r),n.g=Is(n.g),n.b=Is(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Zi?_c:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ci(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Is(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const $p=[.64,.33,.3,.6,.15,.06],qp=[.2126,.7152,.0722],Kp=[.3127,.329],Zp=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jp=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Je.define({[Zs]:{primaries:$p,whitePoint:Kp,transfer:_c,toXYZ:Zp,fromXYZ:Jp,luminanceCoefficients:qp,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:$p,whitePoint:Kp,transfer:st,toXYZ:Zp,fromXYZ:Jp,luminanceCoefficients:qp,outputColorSpaceConfig:{drawingBufferColorSpace:It}}});let qr;class zS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qr===void 0&&(qr=Kl("canvas")),qr.width=e.width,qr.height=e.height;const i=qr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=qr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kl("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ci(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ci(t[i]/255)*255):t[i]=Ci(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let BS=0;class Iv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=Qs(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Zc(r[o].image)):s.push(Zc(r[o]))}else s=Zc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Zc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zS.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let HS=0;class ln extends Js{constructor(e=ln.DEFAULT_IMAGE,t=ln.DEFAULT_MAPPING,i=Nr,r=Nr,s=li,o=Ir,a=qn,l=Di,c=ln.DEFAULT_ANISOTROPY,u=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:HS++}),this.uuid=Qs(),this.name="",this.source=new Iv(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hr:e.x=e.x-Math.floor(e.x);break;case Nr:e.x=e.x<0?0:1;break;case kh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hr:e.y=e.y-Math.floor(e.y);break;case Nr:e.y=e.y<0?0:1;break;case kh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=xv;ln.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,i=0,r=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],m=l[9],_=l[2],v=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-v)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+v)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(p+1)/2,R=(h+1)/2,b=(u+d)/4,A=(f+_)/4,P=(m+v)/4;return x>y&&x>R?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=b/i,s=A/i):y>R?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=b/r,s=P/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=A/s,r=P/s),this.set(i,r,s,t),this}let g=Math.sqrt((v-m)*(v-m)+(f-_)*(f-_)+(d-u)*(d-u));return Math.abs(g)<.001&&(g=1),this.x=(v-m)/g,this.y=(f-_)/g,this.z=(d-u)/g,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class VS extends Js{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:li,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new ln(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Iv(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gr extends VS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dv extends ln{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=Nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class GS extends ln{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=Nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ma{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const d=s[o+0],p=s[o+1],m=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=m,e[t+3]=_;return}if(f!==_||l!==d||c!==p||u!==m){let v=1-a;const h=l*d+c*p+u*m+f*_,g=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const R=Math.sqrt(x),b=Math.atan2(R,h*g);v=Math.sin(v*b)/R,a=Math.sin(a*b)/R}const y=a*g;if(l=l*v+d*y,c=c*v+p*y,u=u*v+m*y,f=f*v+_*y,v===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],d=s[o+1],p=s[o+2],m=s[o+3];return e[t]=a*m+u*f+l*p-c*d,e[t+1]=l*m+u*d+c*f-a*p,e[t+2]=c*m+u*p+a*d-l*f,e[t+3]=u*m-a*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),d=l(i/2),p=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=d*u*f+c*p*m,this._y=c*p*f-d*u*m,this._z=c*u*m+d*p*f,this._w=c*u*f-d*p*m;break;case"YXZ":this._x=d*u*f+c*p*m,this._y=c*p*f-d*u*m,this._z=c*u*m-d*p*f,this._w=c*u*f+d*p*m;break;case"ZXY":this._x=d*u*f-c*p*m,this._y=c*p*f+d*u*m,this._z=c*u*m+d*p*f,this._w=c*u*f-d*p*m;break;case"ZYX":this._x=d*u*f-c*p*m,this._y=c*p*f+d*u*m,this._z=c*u*m-d*p*f,this._w=c*u*f+d*p*m;break;case"YZX":this._x=d*u*f+c*p*m,this._y=c*p*f+d*u*m,this._z=c*u*m-d*p*f,this._w=c*u*f-d*p*m;break;case"XZY":this._x=d*u*f-c*p*m,this._y=c*p*f-d*u*m,this._z=c*u*m+d*p*f,this._w=c*u*f+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Jc.copy(this).projectOnVector(e),this.sub(Jc)}reflect(e){return this.sub(Jc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jc=new L,Qp=new ma;class eo{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(s,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ka.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ka.copy(i.boundingBox)),ka.applyMatrix4(e.matrixWorld),this.union(ka)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mo),za.subVectors(this.max,mo),Kr.subVectors(e.a,mo),Zr.subVectors(e.b,mo),Jr.subVectors(e.c,mo),Hi.subVectors(Zr,Kr),Vi.subVectors(Jr,Zr),gr.subVectors(Kr,Jr);let t=[0,-Hi.z,Hi.y,0,-Vi.z,Vi.y,0,-gr.z,gr.y,Hi.z,0,-Hi.x,Vi.z,0,-Vi.x,gr.z,0,-gr.x,-Hi.y,Hi.x,0,-Vi.y,Vi.x,0,-gr.y,gr.x,0];return!Qc(t,Kr,Zr,Jr,za)||(t=[1,0,0,0,1,0,0,0,1],!Qc(t,Kr,Zr,Jr,za))?!1:(Ba.crossVectors(Hi,Vi),t=[Ba.x,Ba.y,Ba.z],Qc(t,Kr,Zr,Jr,za))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pi=[new L,new L,new L,new L,new L,new L,new L,new L],Vn=new L,ka=new eo,Kr=new L,Zr=new L,Jr=new L,Hi=new L,Vi=new L,gr=new L,mo=new L,za=new L,Ba=new L,vr=new L;function Qc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){vr.fromArray(n,s);const a=r.x*Math.abs(vr.x)+r.y*Math.abs(vr.y)+r.z*Math.abs(vr.z),l=e.dot(vr),c=t.dot(vr),u=i.dot(vr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const WS=new eo,go=new L,eu=new L;class xc{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):WS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;go.subVectors(e,this.center);const t=go.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(go,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(eu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(go.copy(e.center).add(eu)),this.expandByPoint(go.copy(e.center).sub(eu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mi=new L,tu=new L,Ha=new L,Gi=new L,nu=new L,Va=new L,iu=new L;class Uv{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){tu.copy(e).add(t).multiplyScalar(.5),Ha.copy(t).sub(e).normalize(),Gi.copy(this.origin).sub(tu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ha),a=Gi.dot(this.direction),l=-Gi.dot(Ha),c=Gi.lengthSq(),u=Math.abs(1-o*o);let f,d,p,m;if(u>0)if(f=o*l-a,d=o*a-l,m=s*u,f>=0)if(d>=-m)if(d<=m){const _=1/u;f*=_,d*=_,p=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;else d<=-m?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=m?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(tu).addScaledVector(Ha,d),p}intersectSphere(e,t){mi.subVectors(e.center,this.origin);const i=mi.dot(this.direction),r=mi.dot(mi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,i,r,s){nu.subVectors(t,e),Va.subVectors(i,e),iu.crossVectors(nu,Va);let o=this.direction.dot(iu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gi.subVectors(this.origin,e);const l=a*this.direction.dot(Va.crossVectors(Gi,Va));if(l<0)return null;const c=a*this.direction.dot(nu.cross(Gi));if(c<0||l+c>o)return null;const u=-a*Gi.dot(iu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,t,i,r,s,o,a,l,c,u,f,d,p,m,_,v){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,d,p,m,_,v)}set(e,t,i,r,s,o,a,l,c,u,f,d,p,m,_,v){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=m,h[11]=_,h[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Qr.setFromMatrixColumn(e,0).length(),s=1/Qr.setFromMatrixColumn(e,1).length(),o=1/Qr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*u,p=o*f,m=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+m*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=m+p*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,m=c*u,_=c*f;t[0]=d+_*a,t[4]=m*a-p,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=p*a-m,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,m=c*u,_=c*f;t[0]=d-_*a,t[4]=-o*f,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,p=o*f,m=a*u,_=a*f;t[0]=l*u,t[4]=m*c-p,t[8]=d*c+_,t[1]=l*f,t[5]=_*c+d,t[9]=p*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=_-d*f,t[8]=m*f+p,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*f+m,t[10]=d-_*f}else if(e.order==="XZY"){const d=o*l,p=o*c,m=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+_,t[5]=o*u,t[9]=p*f-m,t[2]=m*f-p,t[6]=a*u,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jS,e,XS)}lookAt(e,t,i){const r=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Wi.crossVectors(i,yn),Wi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Wi.crossVectors(i,yn)),Wi.normalize(),Ga.crossVectors(yn,Wi),r[0]=Wi.x,r[4]=Ga.x,r[8]=yn.x,r[1]=Wi.y,r[5]=Ga.y,r[9]=yn.y,r[2]=Wi.z,r[6]=Ga.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],m=i[2],_=i[6],v=i[10],h=i[14],g=i[3],x=i[7],y=i[11],R=i[15],b=r[0],A=r[4],P=r[8],T=r[12],M=r[1],N=r[5],B=r[9],k=r[13],X=r[2],J=r[6],W=r[10],Q=r[14],I=r[3],$=r[7],te=r[11],le=r[15];return s[0]=o*b+a*M+l*X+c*I,s[4]=o*A+a*N+l*J+c*$,s[8]=o*P+a*B+l*W+c*te,s[12]=o*T+a*k+l*Q+c*le,s[1]=u*b+f*M+d*X+p*I,s[5]=u*A+f*N+d*J+p*$,s[9]=u*P+f*B+d*W+p*te,s[13]=u*T+f*k+d*Q+p*le,s[2]=m*b+_*M+v*X+h*I,s[6]=m*A+_*N+v*J+h*$,s[10]=m*P+_*B+v*W+h*te,s[14]=m*T+_*k+v*Q+h*le,s[3]=g*b+x*M+y*X+R*I,s[7]=g*A+x*N+y*J+R*$,s[11]=g*P+x*B+y*W+R*te,s[15]=g*T+x*k+y*Q+R*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],m=e[3],_=e[7],v=e[11],h=e[15];return m*(+s*l*f-r*c*f-s*a*d+i*c*d+r*a*p-i*l*p)+_*(+t*l*p-t*c*d+s*o*d-r*o*p+r*c*u-s*l*u)+v*(+t*c*f-t*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+h*(-r*a*u-t*l*f+t*a*d+r*o*f-i*o*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],m=e[12],_=e[13],v=e[14],h=e[15],g=f*v*c-_*d*c+_*l*p-a*v*p-f*l*h+a*d*h,x=m*d*c-u*v*c-m*l*p+o*v*p+u*l*h-o*d*h,y=u*_*c-m*f*c+m*a*p-o*_*p-u*a*h+o*f*h,R=m*f*l-u*_*l-m*a*d+o*_*d+u*a*v-o*f*v,b=t*g+i*x+r*y+s*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=g*A,e[1]=(_*d*s-f*v*s-_*r*p+i*v*p+f*r*h-i*d*h)*A,e[2]=(a*v*s-_*l*s+_*r*c-i*v*c-a*r*h+i*l*h)*A,e[3]=(f*l*s-a*d*s-f*r*c+i*d*c+a*r*p-i*l*p)*A,e[4]=x*A,e[5]=(u*v*s-m*d*s+m*r*p-t*v*p-u*r*h+t*d*h)*A,e[6]=(m*l*s-o*v*s-m*r*c+t*v*c+o*r*h-t*l*h)*A,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*p+t*l*p)*A,e[8]=y*A,e[9]=(m*f*s-u*_*s-m*i*p+t*_*p+u*i*h-t*f*h)*A,e[10]=(o*_*s-m*a*s+m*i*c-t*_*c-o*i*h+t*a*h)*A,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*p-t*a*p)*A,e[12]=R*A,e[13]=(u*_*r-m*f*r+m*i*d-t*_*d-u*i*v+t*f*v)*A,e[14]=(m*a*r-o*_*r-m*i*l+t*_*l+o*i*v-t*a*v)*A,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*d+t*a*d)*A,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,d=s*c,p=s*u,m=s*f,_=o*u,v=o*f,h=a*f,g=l*c,x=l*u,y=l*f,R=i.x,b=i.y,A=i.z;return r[0]=(1-(_+h))*R,r[1]=(p+y)*R,r[2]=(m-x)*R,r[3]=0,r[4]=(p-y)*b,r[5]=(1-(d+h))*b,r[6]=(v+g)*b,r[7]=0,r[8]=(m+x)*A,r[9]=(v-g)*A,r[10]=(1-(d+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Qr.set(r[0],r[1],r[2]).length();const o=Qr.set(r[4],r[5],r[6]).length(),a=Qr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Gn.copy(this);const c=1/s,u=1/o,f=1/a;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=u,Gn.elements[5]*=u,Gn.elements[6]*=u,Gn.elements[8]*=f,Gn.elements[9]*=f,Gn.elements[10]*=f,t.setFromRotationMatrix(Gn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Ai){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let p,m;if(a===Ai)p=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===ql)p=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ai){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(o-s),d=(t+e)*c,p=(i+r)*u;let m,_;if(a===Ai)m=(o+s)*f,_=-2*f;else if(a===ql)m=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Qr=new L,Gn=new mt,jS=new L(0,0,0),XS=new L(1,1,1),Wi=new L,Ga=new L,yn=new L,em=new mt,tm=new ma;class hi{constructor(e=0,t=0,i=0,r=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Wt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return em.makeRotationFromQuaternion(e),this.setFromRotationMatrix(em,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tm.setFromEuler(this),this.setFromQuaternion(tm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class Fv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let YS=0;const nm=new L,es=new ma,gi=new mt,Wa=new L,vo=new L,$S=new L,qS=new ma,im=new L(1,0,0),rm=new L(0,1,0),sm=new L(0,0,1),om={type:"added"},KS={type:"removed"},ts={type:"childadded",child:null},ru={type:"childremoved",child:null};class Ut extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:YS++}),this.uuid=Qs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new L,t=new hi,i=new ma,r=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new Be}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis(im,e)}rotateY(e){return this.rotateOnAxis(rm,e)}rotateZ(e){return this.rotateOnAxis(sm,e)}translateOnAxis(e,t){return nm.copy(e).applyQuaternion(this.quaternion),this.position.add(nm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(im,e)}translateY(e){return this.translateOnAxis(rm,e)}translateZ(e){return this.translateOnAxis(sm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Wa.copy(e):Wa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(vo,Wa,this.up):gi.lookAt(Wa,vo,this.up),this.quaternion.setFromRotationMatrix(gi),r&&(gi.extractRotation(r.matrixWorld),es.setFromRotationMatrix(gi),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(om),ts.child=e,this.dispatchEvent(ts),ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(KS),ru.child=e,this.dispatchEvent(ru),ru.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(om),ts.child=e,this.dispatchEvent(ts),ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,e,$S),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vo,qS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ut.DEFAULT_UP=new L(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new L,vi=new L,su=new L,_i=new L,ns=new L,is=new L,am=new L,ou=new L,au=new L,lu=new L,cu=new ot,uu=new ot,hu=new ot;class $n{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Wn.subVectors(e,t),r.cross(Wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Wn.subVectors(r,t),vi.subVectors(i,t),su.subVectors(e,t);const o=Wn.dot(Wn),a=Wn.dot(vi),l=Wn.dot(su),c=vi.dot(vi),u=vi.dot(su),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-a*u)*d,m=(o*u-a*l)*d;return s.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,_i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,_i.x),l.addScaledVector(o,_i.y),l.addScaledVector(a,_i.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return cu.setScalar(0),uu.setScalar(0),hu.setScalar(0),cu.fromBufferAttribute(e,t),uu.fromBufferAttribute(e,i),hu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(cu,s.x),o.addScaledVector(uu,s.y),o.addScaledVector(hu,s.z),o}static isFrontFacing(e,t,i,r){return Wn.subVectors(i,t),vi.subVectors(e,t),Wn.cross(vi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Wn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return $n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;ns.subVectors(r,i),is.subVectors(s,i),ou.subVectors(e,i);const l=ns.dot(ou),c=is.dot(ou);if(l<=0&&c<=0)return t.copy(i);au.subVectors(e,r);const u=ns.dot(au),f=is.dot(au);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(ns,o);lu.subVectors(e,s);const p=ns.dot(lu),m=is.dot(lu);if(m>=0&&p<=m)return t.copy(s);const _=p*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(is,a);const v=u*m-p*f;if(v<=0&&f-u>=0&&p-m>=0)return am.subVectors(s,r),a=(f-u)/(f-u+(p-m)),t.copy(r).addScaledVector(am,a);const h=1/(v+_+d);return o=_*h,a=d*h,t.copy(i).addScaledVector(ns,o).addScaledVector(is,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ov={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},ja={h:0,s:0,l:0};function du(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ge{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=pf(e,1),t=Wt(t,0,1),i=Wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=du(o,s,e+1/3),this.g=du(o,s,e),this.b=du(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=It){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const i=Ov[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return Je.fromWorkingColorSpace(Zt.copy(this),e),Math.round(Wt(Zt.r*255,0,255))*65536+Math.round(Wt(Zt.g*255,0,255))*256+Math.round(Wt(Zt.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Zt.copy(this),t);const i=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=It){Je.fromWorkingColorSpace(Zt.copy(this),e);const t=Zt.r,i=Zt.g,r=Zt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(ja);const i=ko(ji.h,ja.h,t),r=ko(ji.s,ja.s,t),s=ko(ji.l,ja.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Ge;Ge.NAMES=Ov;let ZS=0;class to extends Js{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Qs(),this.name="",this.blending=Ls,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bh,this.blendDst=Ch,this.blendEquation=br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=Vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$r,this.stencilZFail=$r,this.stencilZPass=$r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(i.blending=this.blending),this.side!==Ii&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bh&&(i.blendSrc=this.blendSrc),this.blendDst!==Ch&&(i.blendDst=this.blendDst),this.blendEquation!==br&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$r&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$r&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$r&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ei extends to{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=vv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new L,Xa=new Pe;class ti{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Wp,this.updateRanges=[],this.gpuType=Ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xa.fromBufferAttribute(this,t),Xa.applyMatrix3(e),this.setXY(t,Xa.x,Xa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hs(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hs(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hs(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wp&&(e.usage=this.usage),e}}class kv extends ti{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class zv extends ti{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Mt extends ti{constructor(e,t,i){super(new Float32Array(e),t,i)}}let JS=0;const Ln=new mt,fu=new Ut,rs=new L,Sn=new eo,_o=new eo,kt=new L;class hn extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=Qs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nv(e)?zv:kv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,t,i){return Ln.makeTranslation(e,t,i),this.applyMatrix4(Ln),this}scale(e,t,i){return Ln.makeScale(e,t,i),this.applyMatrix4(Ln),this}lookAt(e){return fu.lookAt(e),fu.updateMatrix(),this.applyMatrix4(fu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Mt(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];_o.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(Sn.min,_o.min),Sn.expandByPoint(kt),kt.addVectors(Sn.max,_o.max),Sn.expandByPoint(kt)):(Sn.expandByPoint(_o.min),Sn.expandByPoint(_o.max))}Sn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(kt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)kt.fromBufferAttribute(a,c),l&&(rs.fromBufferAttribute(e,c),kt.add(rs)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ti(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new L,l[P]=new L;const c=new L,u=new L,f=new L,d=new Pe,p=new Pe,m=new Pe,_=new L,v=new L;function h(P,T,M){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,M),d.fromBufferAttribute(s,P),p.fromBufferAttribute(s,T),m.fromBufferAttribute(s,M),u.sub(c),f.sub(c),p.sub(d),m.sub(d);const N=1/(p.x*m.y-m.x*p.y);isFinite(N)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(N),v.copy(f).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(N),a[P].add(_),a[T].add(_),a[M].add(_),l[P].add(v),l[T].add(v),l[M].add(v))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let P=0,T=g.length;P<T;++P){const M=g[P],N=M.start,B=M.count;for(let k=N,X=N+B;k<X;k+=3)h(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const x=new L,y=new L,R=new L,b=new L;function A(P){R.fromBufferAttribute(r,P),b.copy(R);const T=a[P];x.copy(T),x.sub(R.multiplyScalar(R.dot(T))).normalize(),y.crossVectors(b,T);const N=y.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,N)}for(let P=0,T=g.length;P<T;++P){const M=g[P],N=M.start,B=M.count;for(let k=N,X=N+B;k<X;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ti(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new L,s=new L,o=new L,a=new L,l=new L,c=new L,u=new L,f=new L;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),_=e.getX(d+1),v=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,v),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,v),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,d=new c.constructor(l.length*u);let p=0,m=0;for(let _=0,v=l.length;_<v;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let h=0;h<u;h++)d[m++]=c[p++]}return new ti(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new hn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lm=new mt,_r=new Uv,Ya=new xc,cm=new L,$a=new L,qa=new L,Ka=new L,pu=new L,Za=new L,um=new L,Ja=new L;class Re extends Ut{constructor(e=new hn,t=new ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Za.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(pu.fromBufferAttribute(f,e),o?Za.addScaledVector(pu,u):Za.addScaledVector(pu.sub(t),u))}t.add(Za)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ya.copy(i.boundingSphere),Ya.applyMatrix4(s),_r.copy(e.ray).recast(e.near),!(Ya.containsPoint(_r.origin)===!1&&(_r.intersectSphere(Ya,cm)===null||_r.origin.distanceToSquared(cm)>(e.far-e.near)**2))&&(lm.copy(s).invert(),_r.copy(e.ray).applyMatrix4(lm),!(i.boundingBox!==null&&_r.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_r)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const v=d[m],h=o[v.materialIndex],g=Math.max(v.start,p.start),x=Math.min(a.count,Math.min(v.start+v.count,p.start+p.count));for(let y=g,R=x;y<R;y+=3){const b=a.getX(y),A=a.getX(y+1),P=a.getX(y+2);r=Qa(this,h,e,i,c,u,f,b,A,P),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let v=m,h=_;v<h;v+=3){const g=a.getX(v),x=a.getX(v+1),y=a.getX(v+2);r=Qa(this,o,e,i,c,u,f,g,x,y),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const v=d[m],h=o[v.materialIndex],g=Math.max(v.start,p.start),x=Math.min(l.count,Math.min(v.start+v.count,p.start+p.count));for(let y=g,R=x;y<R;y+=3){const b=y,A=y+1,P=y+2;r=Qa(this,h,e,i,c,u,f,b,A,P),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let v=m,h=_;v<h;v+=3){const g=v,x=v+1,y=v+2;r=Qa(this,o,e,i,c,u,f,g,x,y),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}}}function QS(n,e,t,i,r,s,o,a){let l;if(e.side===an?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ii,a),l===null)return null;Ja.copy(a),Ja.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ja);return c<t.near||c>t.far?null:{distance:c,point:Ja.clone(),object:n}}function Qa(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,$a),n.getVertexPosition(l,qa),n.getVertexPosition(c,Ka);const u=QS(n,e,t,i,$a,qa,Ka,um);if(u){const f=new L;$n.getBarycoord(um,$a,qa,Ka,f),r&&(u.uv=$n.getInterpolatedAttribute(r,a,l,c,f,new Pe)),s&&(u.uv1=$n.getInterpolatedAttribute(s,a,l,c,f,new Pe)),o&&(u.normal=$n.getInterpolatedAttribute(o,a,l,c,f,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};$n.getNormal($a,qa,Ka,d.normal),u.face=d,u.barycoord=f}return u}class xt extends hn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,p=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(f,2));function m(_,v,h,g,x,y,R,b,A,P,T){const M=y/A,N=R/P,B=y/2,k=R/2,X=b/2,J=A+1,W=P+1;let Q=0,I=0;const $=new L;for(let te=0;te<W;te++){const le=te*N-k;for(let Ee=0;Ee<J;Ee++){const Ye=Ee*M-B;$[_]=Ye*g,$[v]=le*x,$[h]=X,c.push($.x,$.y,$.z),$[_]=0,$[v]=0,$[h]=b>0?1:-1,u.push($.x,$.y,$.z),f.push(Ee/A),f.push(1-te/P),Q+=1}}for(let te=0;te<P;te++)for(let le=0;le<A;le++){const Ee=d+le+J*te,Ye=d+le+J*(te+1),Y=d+(le+1)+J*(te+1),G=d+(le+1)+J*te;l.push(Ee,Ye,G),l.push(Ye,Y,G),I+=6}a.addGroup(p,I,T),p+=I,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ys(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function nn(n){const e={};for(let t=0;t<n.length;t++){const i=Ys(n[t]);for(const r in i)e[r]=i[r]}return e}function e1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Bv(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const t1={clone:Ys,merge:nn};var n1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,i1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ui extends to{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=n1,this.fragmentShader=i1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=e1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Hv extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Ai}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new L,hm=new Pe,dm=new Pe;class En extends Hv{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=la*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return la*2*Math.atan(Math.tan(Oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,hm,dm),t.subVectors(dm,hm)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Oo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ss=-90,os=1;class r1 extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new En(ss,os,e,t);r.layers=this.layers,this.add(r);const s=new En(ss,os,e,t);s.layers=this.layers,this.add(s);const o=new En(ss,os,e,t);o.layers=this.layers,this.add(o);const a=new En(ss,os,e,t);a.layers=this.layers,this.add(a);const l=new En(ss,os,e,t);l.layers=this.layers,this.add(l);const c=new En(ss,os,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ql)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Vv extends ln{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Gs,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class s1 extends Gr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Vv(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:li}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new xt(5,5,5),s=new Ui({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:lr});s.uniforms.tEquirect.value=t;const o=new Re(r,s),a=t.minFilter;return t.minFilter===Ir&&(t.minFilter=li),new r1(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const mu=new L,o1=new L,a1=new Be;class wr{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=mu.subVectors(i,t).cross(o1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(mu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||a1.getNormalMatrix(e),r=this.coplanarPoint(mu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xr=new xc,el=new L;class mf{constructor(e=new wr,t=new wr,i=new wr,r=new wr,s=new wr,o=new wr){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ai){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],d=r[7],p=r[8],m=r[9],_=r[10],v=r[11],h=r[12],g=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,d-c,v-p,y-h).normalize(),i[1].setComponents(l+s,d+c,v+p,y+h).normalize(),i[2].setComponents(l+o,d+u,v+m,y+g).normalize(),i[3].setComponents(l-o,d-u,v-m,y-g).normalize(),i[4].setComponents(l-a,d-f,v-_,y-x).normalize(),t===Ai)i[5].setComponents(l+a,d+f,v+_,y+x).normalize();else if(t===ql)i[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xr)}intersectsSprite(e){return xr.center.set(0,0,0),xr.radius=.7071067811865476,xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(xr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(el.x=r.normal.x>0?e.max.x:e.min.x,el.y=r.normal.y>0?e.max.y:e.min.y,el.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(el)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gv(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function l1(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<f.length;p++){const m=f[d],_=f[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let p=0,m=f.length;p<m;p++){const _=f[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class wn extends hn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,d=t/l,p=[],m=[],_=[],v=[];for(let h=0;h<u;h++){const g=h*d-o;for(let x=0;x<c;x++){const y=x*f-s;m.push(y,-g,0),_.push(0,0,1),v.push(x/a),v.push(1-h/l)}}for(let h=0;h<l;h++)for(let g=0;g<a;g++){const x=g+c*h,y=g+c*(h+1),R=g+1+c*(h+1),b=g+1+c*h;p.push(x,y,b),p.push(y,R,b)}this.setIndex(p),this.setAttribute("position",new Mt(m,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.width,e.height,e.widthSegments,e.heightSegments)}}var c1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,u1=`#ifdef USE_ALPHAHASH
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
#endif`,h1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,p1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,m1=`#ifdef USE_AOMAP
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
#endif`,g1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,v1=`#ifdef USE_BATCHING
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
#endif`,_1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,x1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,y1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,S1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,M1=`#ifdef USE_IRIDESCENCE
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
#endif`,E1=`#ifdef USE_BUMPMAP
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
#endif`,w1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,T1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,A1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,b1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,C1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,R1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,P1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,L1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,N1=`#define PI 3.141592653589793
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
} // validated`,I1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,D1=`vec3 transformedNormal = objectNormal;
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
#endif`,U1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,F1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,O1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,k1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,z1="gl_FragColor = linearToOutputTexel( gl_FragColor );",B1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,H1=`#ifdef USE_ENVMAP
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
#endif`,V1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,G1=`#ifdef USE_ENVMAP
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
#endif`,W1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
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
#endif`,X1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Y1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,q1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,K1=`#ifdef USE_GRADIENTMAP
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
}`,Z1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,J1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Q1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eM=`uniform bool receiveShadow;
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
#endif`,tM=`#ifdef USE_ENVMAP
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
#endif`,nM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,oM=`PhysicalMaterial material;
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
#endif`,aM=`struct PhysicalMaterial {
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
}`,lM=`
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
#endif`,cM=`#if defined( RE_IndirectDiffuse )
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
#endif`,uM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_M=`#if defined( USE_POINTS_UV )
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
#endif`,xM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,SM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,MM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,EM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wM=`#ifdef USE_MORPHTARGETS
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
#endif`,TM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,AM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,CM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,LM=`#ifdef USE_NORMALMAP
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
#endif`,NM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,UM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,FM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,OM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,BM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,HM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,VM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,WM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,XM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,YM=`float getShadowMask() {
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
}`,$M=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qM=`#ifdef USE_SKINNING
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
#endif`,KM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ZM=`#ifdef USE_SKINNING
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
#endif`,JM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,QM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tE=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nE=`#ifdef USE_TRANSMISSION
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
#endif`,iE=`#ifdef USE_TRANSMISSION
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
#endif`,rE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cE=`uniform sampler2D t2D;
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
}`,uE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pE=`#include <common>
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
}`,mE=`#if DEPTH_PACKING == 3200
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
}`,gE=`#define DISTANCE
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
}`,vE=`#define DISTANCE
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
}`,_E=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yE=`uniform float scale;
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
}`,SE=`uniform vec3 diffuse;
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
}`,ME=`#include <common>
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
}`,EE=`uniform vec3 diffuse;
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
}`,wE=`#define LAMBERT
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
}`,TE=`#define LAMBERT
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
}`,AE=`#define MATCAP
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
}`,bE=`#define MATCAP
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
}`,CE=`#define NORMAL
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
}`,RE=`#define NORMAL
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
}`,PE=`#define PHONG
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
}`,LE=`#define PHONG
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
}`,NE=`#define STANDARD
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
}`,IE=`#define STANDARD
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
}`,DE=`#define TOON
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
}`,UE=`#define TOON
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
}`,FE=`uniform float size;
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
}`,OE=`uniform vec3 diffuse;
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
}`,kE=`#include <common>
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
}`,zE=`uniform vec3 color;
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
}`,BE=`uniform float rotation;
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
}`,HE=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:c1,alphahash_pars_fragment:u1,alphamap_fragment:h1,alphamap_pars_fragment:d1,alphatest_fragment:f1,alphatest_pars_fragment:p1,aomap_fragment:m1,aomap_pars_fragment:g1,batching_pars_vertex:v1,batching_vertex:_1,begin_vertex:x1,beginnormal_vertex:y1,bsdfs:S1,iridescence_fragment:M1,bumpmap_pars_fragment:E1,clipping_planes_fragment:w1,clipping_planes_pars_fragment:T1,clipping_planes_pars_vertex:A1,clipping_planes_vertex:b1,color_fragment:C1,color_pars_fragment:R1,color_pars_vertex:P1,color_vertex:L1,common:N1,cube_uv_reflection_fragment:I1,defaultnormal_vertex:D1,displacementmap_pars_vertex:U1,displacementmap_vertex:F1,emissivemap_fragment:O1,emissivemap_pars_fragment:k1,colorspace_fragment:z1,colorspace_pars_fragment:B1,envmap_fragment:H1,envmap_common_pars_fragment:V1,envmap_pars_fragment:G1,envmap_pars_vertex:W1,envmap_physical_pars_fragment:tM,envmap_vertex:j1,fog_vertex:X1,fog_pars_vertex:Y1,fog_fragment:$1,fog_pars_fragment:q1,gradientmap_pars_fragment:K1,lightmap_pars_fragment:Z1,lights_lambert_fragment:J1,lights_lambert_pars_fragment:Q1,lights_pars_begin:eM,lights_toon_fragment:nM,lights_toon_pars_fragment:iM,lights_phong_fragment:rM,lights_phong_pars_fragment:sM,lights_physical_fragment:oM,lights_physical_pars_fragment:aM,lights_fragment_begin:lM,lights_fragment_maps:cM,lights_fragment_end:uM,logdepthbuf_fragment:hM,logdepthbuf_pars_fragment:dM,logdepthbuf_pars_vertex:fM,logdepthbuf_vertex:pM,map_fragment:mM,map_pars_fragment:gM,map_particle_fragment:vM,map_particle_pars_fragment:_M,metalnessmap_fragment:xM,metalnessmap_pars_fragment:yM,morphinstance_vertex:SM,morphcolor_vertex:MM,morphnormal_vertex:EM,morphtarget_pars_vertex:wM,morphtarget_vertex:TM,normal_fragment_begin:AM,normal_fragment_maps:bM,normal_pars_fragment:CM,normal_pars_vertex:RM,normal_vertex:PM,normalmap_pars_fragment:LM,clearcoat_normal_fragment_begin:NM,clearcoat_normal_fragment_maps:IM,clearcoat_pars_fragment:DM,iridescence_pars_fragment:UM,opaque_fragment:FM,packing:OM,premultiplied_alpha_fragment:kM,project_vertex:zM,dithering_fragment:BM,dithering_pars_fragment:HM,roughnessmap_fragment:VM,roughnessmap_pars_fragment:GM,shadowmap_pars_fragment:WM,shadowmap_pars_vertex:jM,shadowmap_vertex:XM,shadowmask_pars_fragment:YM,skinbase_vertex:$M,skinning_pars_vertex:qM,skinning_vertex:KM,skinnormal_vertex:ZM,specularmap_fragment:JM,specularmap_pars_fragment:QM,tonemapping_fragment:eE,tonemapping_pars_fragment:tE,transmission_fragment:nE,transmission_pars_fragment:iE,uv_pars_fragment:rE,uv_pars_vertex:sE,uv_vertex:oE,worldpos_vertex:aE,background_vert:lE,background_frag:cE,backgroundCube_vert:uE,backgroundCube_frag:hE,cube_vert:dE,cube_frag:fE,depth_vert:pE,depth_frag:mE,distanceRGBA_vert:gE,distanceRGBA_frag:vE,equirect_vert:_E,equirect_frag:xE,linedashed_vert:yE,linedashed_frag:SE,meshbasic_vert:ME,meshbasic_frag:EE,meshlambert_vert:wE,meshlambert_frag:TE,meshmatcap_vert:AE,meshmatcap_frag:bE,meshnormal_vert:CE,meshnormal_frag:RE,meshphong_vert:PE,meshphong_frag:LE,meshphysical_vert:NE,meshphysical_frag:IE,meshtoon_vert:DE,meshtoon_frag:UE,points_vert:FE,points_frag:OE,shadow_vert:kE,shadow_frag:zE,sprite_vert:BE,sprite_frag:HE},he={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},oi={basic:{uniforms:nn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:nn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:nn([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:nn([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:nn([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:nn([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:nn([he.points,he.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:nn([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:nn([he.common,he.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:nn([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:nn([he.sprite,he.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:nn([he.common,he.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:nn([he.lights,he.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};oi.physical={uniforms:nn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const tl={r:0,b:0,g:0},yr=new hi,VE=new mt;function GE(n,e,t,i,r,s,o){const a=new Ge(0);let l=s===!0?0:1,c,u,f=null,d=0,p=null;function m(g){let x=g.isScene===!0?g.background:null;return x&&x.isTexture&&(x=(g.backgroundBlurriness>0?t:e).get(x)),x}function _(g){let x=!1;const y=m(g);y===null?h(a,l):y&&y.isColor&&(h(y,1),x=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(g,x){const y=m(x);y&&(y.isCubeTexture||y.mapping===vc)?(u===void 0&&(u=new Re(new xt(1,1,1),new Ui({name:"BackgroundCubeMaterial",uniforms:Ys(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),yr.copy(x.backgroundRotation),yr.x*=-1,yr.y*=-1,yr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(yr.y*=-1,yr.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(VE.makeRotationFromEuler(yr)),u.material.toneMapped=Je.getTransfer(y.colorSpace)!==st,(f!==y||d!==y.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=y,d=y.version,p=n.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Re(new wn(2,2),new Ui({name:"BackgroundMaterial",uniforms:Ys(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Je.getTransfer(y.colorSpace)!==st,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||d!==y.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,d=y.version,p=n.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function h(g,x){g.getRGB(tl,Bv(n)),i.buffers.color.setClear(tl.r,tl.g,tl.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(g,x=1){a.set(g),l=x,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,h(a,l)},render:_,addToRenderList:v}}function WE(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(M,N,B,k,X){let J=!1;const W=f(k,B,N);s!==W&&(s=W,c(s.object)),J=p(M,k,B,X),J&&m(M,k,B,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(M,N,B,k),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function f(M,N,B){const k=B.wireframe===!0;let X=i[M.id];X===void 0&&(X={},i[M.id]=X);let J=X[N.id];J===void 0&&(J={},X[N.id]=J);let W=J[k];return W===void 0&&(W=d(l()),J[k]=W),W}function d(M){const N=[],B=[],k=[];for(let X=0;X<t;X++)N[X]=0,B[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:B,attributeDivisors:k,object:M,attributes:{},index:null}}function p(M,N,B,k){const X=s.attributes,J=N.attributes;let W=0;const Q=B.getAttributes();for(const I in Q)if(Q[I].location>=0){const te=X[I];let le=J[I];if(le===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(le=M.instanceColor)),te===void 0||te.attribute!==le||le&&te.data!==le.data)return!0;W++}return s.attributesNum!==W||s.index!==k}function m(M,N,B,k){const X={},J=N.attributes;let W=0;const Q=B.getAttributes();for(const I in Q)if(Q[I].location>=0){let te=J[I];te===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(te=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(te=M.instanceColor));const le={};le.attribute=te,te&&te.data&&(le.data=te.data),X[I]=le,W++}s.attributes=X,s.attributesNum=W,s.index=k}function _(){const M=s.newAttributes;for(let N=0,B=M.length;N<B;N++)M[N]=0}function v(M){h(M,0)}function h(M,N){const B=s.newAttributes,k=s.enabledAttributes,X=s.attributeDivisors;B[M]=1,k[M]===0&&(n.enableVertexAttribArray(M),k[M]=1),X[M]!==N&&(n.vertexAttribDivisor(M,N),X[M]=N)}function g(){const M=s.newAttributes,N=s.enabledAttributes;for(let B=0,k=N.length;B<k;B++)N[B]!==M[B]&&(n.disableVertexAttribArray(B),N[B]=0)}function x(M,N,B,k,X,J,W){W===!0?n.vertexAttribIPointer(M,N,B,X,J):n.vertexAttribPointer(M,N,B,k,X,J)}function y(M,N,B,k){_();const X=k.attributes,J=B.getAttributes(),W=N.defaultAttributeValues;for(const Q in J){const I=J[Q];if(I.location>=0){let $=X[Q];if($===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&($=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&($=M.instanceColor)),$!==void 0){const te=$.normalized,le=$.itemSize,Ee=e.get($);if(Ee===void 0)continue;const Ye=Ee.buffer,Y=Ee.type,G=Ee.bytesPerElement,ee=Y===n.INT||Y===n.UNSIGNED_INT||$.gpuType===lf;if($.isInterleavedBufferAttribute){const K=$.data,ce=K.stride,ue=$.offset;if(K.isInstancedInterleavedBuffer){for(let _e=0;_e<I.locationSize;_e++)h(I.location+_e,K.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let _e=0;_e<I.locationSize;_e++)v(I.location+_e);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let _e=0;_e<I.locationSize;_e++)x(I.location+_e,le/I.locationSize,Y,te,ce*G,(ue+le/I.locationSize*_e)*G,ee)}else{if($.isInstancedBufferAttribute){for(let K=0;K<I.locationSize;K++)h(I.location+K,$.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let K=0;K<I.locationSize;K++)v(I.location+K);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let K=0;K<I.locationSize;K++)x(I.location+K,le/I.locationSize,Y,te,le*G,le/I.locationSize*K*G,ee)}}else if(W!==void 0){const te=W[Q];if(te!==void 0)switch(te.length){case 2:n.vertexAttrib2fv(I.location,te);break;case 3:n.vertexAttrib3fv(I.location,te);break;case 4:n.vertexAttrib4fv(I.location,te);break;default:n.vertexAttrib1fv(I.location,te)}}}}g()}function R(){P();for(const M in i){const N=i[M];for(const B in N){const k=N[B];for(const X in k)u(k[X].object),delete k[X];delete N[B]}delete i[M]}}function b(M){if(i[M.id]===void 0)return;const N=i[M.id];for(const B in N){const k=N[B];for(const X in k)u(k[X].object),delete k[X];delete N[B]}delete i[M.id]}function A(M){for(const N in i){const B=i[N];if(B[M.id]===void 0)continue;const k=B[M.id];for(const X in k)u(k[X].object),delete k[X];delete B[M.id]}}function P(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:v,disableUnusedAttributes:g}}function jE(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let m=0;m<f;m++)p+=u[m];t.update(p,i,1)}function l(c,u,f,d){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<c.length;m++)o(c[m],u[m],d[m]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,f);let m=0;for(let _=0;_<f;_++)m+=u[_]*d[_];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function XE(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==qn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===pa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Di&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ti&&!P)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),g=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:v,maxAttributes:h,maxVertexUniforms:g,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:R,maxSamples:b}}function YE(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new wr,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const m=f.clippingPlanes,_=f.clipIntersection,v=f.clipShadows,h=n.get(f);if(!r||m===null||m.length===0||s&&!v)s?u(null):c();else{const g=s?0:i,x=g*4;let y=h.clippingState||null;l.value=y,y=u(m,d,x,p);for(let R=0;R!==x;++R)y[R]=t[R];h.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,m){const _=f!==null?f.length:0;let v=null;if(_!==0){if(v=l.value,m!==!0||v===null){const h=p+_*4,g=d.matrixWorldInverse;a.getNormalMatrix(g),(v===null||v.length<h)&&(v=new Float32Array(h));for(let x=0,y=p;x!==_;++x,y+=4)o.copy(f[x]).applyMatrix4(g,a),o.normal.toArray(v,y),v[y+3]=o.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,v}}function $E(n){let e=new WeakMap;function t(o,a){return a===Fh?o.mapping=Gs:a===Oh&&(o.mapping=Ws),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Fh||a===Oh)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new s1(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Wv extends Hv{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ws=4,fm=[.125,.215,.35,.446,.526,.582],Cr=20,gu=new Wv,pm=new Ge;let vu=null,_u=0,xu=0,yu=!1;const Tr=(1+Math.sqrt(5))/2,as=1/Tr,mm=[new L(-Tr,as,0),new L(Tr,as,0),new L(-as,0,Tr),new L(as,0,Tr),new L(0,Tr,-as),new L(0,Tr,as),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class gm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){vu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_m(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vu,_u,xu),this._renderer.xr.enabled=yu,e.scissorTest=!1,nl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gs||e.mapping===Ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:li,minFilter:li,generateMipmaps:!1,type:pa,format:qn,colorSpace:Zs,depthBuffer:!1},r=vm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vm(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qE(s)),this._blurMaterial=KE(s,e,t)}return r}_compileMaterial(e){const t=new Re(this._lodPlanes[0],e);this._renderer.compile(t,gu)}_sceneToCubeUV(e,t,i,r){const a=new En(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(pm),u.toneMapping=cr,u.autoClear=!1;const p=new ei({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),m=new Re(new xt,p);let _=!1;const v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,_=!0):(p.color.copy(pm),_=!0);for(let h=0;h<6;h++){const g=h%3;g===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):g===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const x=this._cubeSize;nl(r,g*x,h>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(m,a),u.render(e,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Gs||e.mapping===Ws;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=xm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_m());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Re(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;nl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,gu)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=mm[(r-s-1)%mm.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Re(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Cr-1),_=s/m,v=isFinite(s)?1+Math.floor(u*_):Cr;v>Cr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Cr}`);const h=[];let g=0;for(let A=0;A<Cr;++A){const P=A/_,T=Math.exp(-P*P/2);h.push(T),A===0?g+=T:A<v&&(g+=2*T)}for(let A=0;A<h.length;A++)h[A]=h[A]/g;d.envMap.value=e.texture,d.samples.value=v,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-i;const y=this._sizeLods[r],R=3*y*(r>x-ws?r-x+ws:0),b=4*(this._cubeSize-y);nl(t,R,b,3*y,2*y),l.setRenderTarget(t),l.render(f,gu)}}function qE(n){const e=[],t=[],i=[];let r=n;const s=n-ws+1+fm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ws?l=fm[o-n+ws-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,m=6,_=3,v=2,h=1,g=new Float32Array(_*m*p),x=new Float32Array(v*m*p),y=new Float32Array(h*m*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,P=b>2?0:-1,T=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];g.set(T,_*m*b),x.set(d,v*m*b);const M=[b,b,b,b,b,b];y.set(M,h*m*b)}const R=new hn;R.setAttribute("position",new ti(g,_)),R.setAttribute("uv",new ti(x,v)),R.setAttribute("faceIndex",new ti(y,h)),e.push(R),r>ws&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function vm(n,e,t){const i=new Gr(n,e,t);return i.texture.mapping=vc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function KE(n,e,t){const i=new Float32Array(Cr),r=new L(0,1,0);return new Ui({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:gf(),fragmentShader:`

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
		`,blending:lr,depthTest:!1,depthWrite:!1})}function _m(){return new Ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gf(),fragmentShader:`

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
		`,blending:lr,depthTest:!1,depthWrite:!1})}function xm(){return new Ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:lr,depthTest:!1,depthWrite:!1})}function gf(){return`

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
	`}function ZE(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Fh||l===Oh,u=l===Gs||l===Ws;if(c||u){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new gm(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new gm(n)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function JE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ao("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function QE(n,e,t,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let v=0,h=_.length;v<h;v++)e.remove(_[v])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const m in d)e.update(d[m],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const _=p[m];for(let v=0,h=_.length;v<h;v++)e.update(_[v],n.ARRAY_BUFFER)}}function c(f){const d=[],p=f.index,m=f.attributes.position;let _=0;if(p!==null){const g=p.array;_=p.version;for(let x=0,y=g.length;x<y;x+=3){const R=g[x+0],b=g[x+1],A=g[x+2];d.push(R,b,b,A,A,R)}}else if(m!==void 0){const g=m.array;_=m.version;for(let x=0,y=g.length/3-1;x<y;x+=3){const R=x+0,b=x+1,A=x+2;d.push(R,b,b,A,A,R)}}else return;const v=new(Nv(d)?zv:kv)(d,1);v.version=_;const h=s.get(f);h&&e.remove(h),s.set(f,v)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function ew(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){n.drawElements(i,p,s,d*o),t.update(p,i,1)}function c(d,p,m){m!==0&&(n.drawElementsInstanced(i,p,s,d*o,m),t.update(p,i,m))}function u(d,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,m);let v=0;for(let h=0;h<m;h++)v+=p[h];t.update(v,i,1)}function f(d,p,m,_){if(m===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let h=0;h<d.length;h++)c(d[h]/o,p[h],_[h]);else{v.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,_,0,m);let h=0;for(let g=0;g<m;g++)h+=p[g]*_[g];t.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function tw(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function nw(n,e,t){const i=new WeakMap,r=new ot;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let M=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;m===!0&&(y=1),_===!0&&(y=2),v===!0&&(y=3);let R=a.attributes.position.count*y,b=1;R>e.maxTextureSize&&(b=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const A=new Float32Array(R*b*4*f),P=new Dv(A,R,b,f);P.type=Ti,P.needsUpdate=!0;const T=y*4;for(let N=0;N<f;N++){const B=h[N],k=g[N],X=x[N],J=R*b*4*N;for(let W=0;W<B.count;W++){const Q=W*T;m===!0&&(r.fromBufferAttribute(B,W),A[J+Q+0]=r.x,A[J+Q+1]=r.y,A[J+Q+2]=r.z,A[J+Q+3]=0),_===!0&&(r.fromBufferAttribute(k,W),A[J+Q+4]=r.x,A[J+Q+5]=r.y,A[J+Q+6]=r.z,A[J+Q+7]=0),v===!0&&(r.fromBufferAttribute(X,W),A[J+Q+8]=r.x,A[J+Q+9]=r.y,A[J+Q+10]=r.z,A[J+Q+11]=X.itemSize===4?r.w:1)}}d={count:f,texture:P,size:new Pe(R,b)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];const _=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function iw(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class jv extends ln{constructor(e,t,i,r,s,o,a,l,c,u=Ns){if(u!==Ns&&u!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ns&&(i=Vr),i===void 0&&u===Xs&&(i=js),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Qn,this.minFilter=l!==void 0?l:Qn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Xv=new ln,ym=new jv(1,1),Yv=new Dv,$v=new GS,qv=new Vv,Sm=[],Mm=[],Em=new Float32Array(16),wm=new Float32Array(9),Tm=new Float32Array(4);function no(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Sm[r];if(s===void 0&&(s=new Float32Array(r),Sm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function yc(n,e){let t=Mm[e];t===void 0&&(t=new Int32Array(e),Mm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function rw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function sw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function ow(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function aw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function lw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;Tm.set(i),n.uniformMatrix2fv(this.addr,!1,Tm),Ot(t,i)}}function cw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;wm.set(i),n.uniformMatrix3fv(this.addr,!1,wm),Ot(t,i)}}function uw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;Em.set(i),n.uniformMatrix4fv(this.addr,!1,Em),Ot(t,i)}}function hw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function fw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function pw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function mw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function gw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function vw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function _w(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function xw(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ym.compareFunction=Lv,s=ym):s=Xv,t.setTexture2D(e||s,r)}function yw(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||$v,r)}function Sw(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||qv,r)}function Mw(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Yv,r)}function Ew(n){switch(n){case 5126:return rw;case 35664:return sw;case 35665:return ow;case 35666:return aw;case 35674:return lw;case 35675:return cw;case 35676:return uw;case 5124:case 35670:return hw;case 35667:case 35671:return dw;case 35668:case 35672:return fw;case 35669:case 35673:return pw;case 5125:return mw;case 36294:return gw;case 36295:return vw;case 36296:return _w;case 35678:case 36198:case 36298:case 36306:case 35682:return xw;case 35679:case 36299:case 36307:return yw;case 35680:case 36300:case 36308:case 36293:return Sw;case 36289:case 36303:case 36311:case 36292:return Mw}}function ww(n,e){n.uniform1fv(this.addr,e)}function Tw(n,e){const t=no(e,this.size,2);n.uniform2fv(this.addr,t)}function Aw(n,e){const t=no(e,this.size,3);n.uniform3fv(this.addr,t)}function bw(n,e){const t=no(e,this.size,4);n.uniform4fv(this.addr,t)}function Cw(n,e){const t=no(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Rw(n,e){const t=no(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Pw(n,e){const t=no(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Lw(n,e){n.uniform1iv(this.addr,e)}function Nw(n,e){n.uniform2iv(this.addr,e)}function Iw(n,e){n.uniform3iv(this.addr,e)}function Dw(n,e){n.uniform4iv(this.addr,e)}function Uw(n,e){n.uniform1uiv(this.addr,e)}function Fw(n,e){n.uniform2uiv(this.addr,e)}function Ow(n,e){n.uniform3uiv(this.addr,e)}function kw(n,e){n.uniform4uiv(this.addr,e)}function zw(n,e,t){const i=this.cache,r=e.length,s=yc(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Xv,s[o])}function Bw(n,e,t){const i=this.cache,r=e.length,s=yc(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||$v,s[o])}function Hw(n,e,t){const i=this.cache,r=e.length,s=yc(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||qv,s[o])}function Vw(n,e,t){const i=this.cache,r=e.length,s=yc(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Yv,s[o])}function Gw(n){switch(n){case 5126:return ww;case 35664:return Tw;case 35665:return Aw;case 35666:return bw;case 35674:return Cw;case 35675:return Rw;case 35676:return Pw;case 5124:case 35670:return Lw;case 35667:case 35671:return Nw;case 35668:case 35672:return Iw;case 35669:case 35673:return Dw;case 5125:return Uw;case 36294:return Fw;case 36295:return Ow;case 36296:return kw;case 35678:case 36198:case 36298:case 36306:case 35682:return zw;case 35679:case 36299:case 36307:return Bw;case 35680:case 36300:case 36308:case 36293:return Hw;case 36289:case 36303:case 36311:case 36292:return Vw}}class Ww{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ew(t.type)}}class jw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gw(t.type)}}class Xw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Su=/(\w+)(\])?(\[|\.)?/g;function Am(n,e){n.seq.push(e),n.map[e.id]=e}function Yw(n,e,t){const i=n.name,r=i.length;for(Su.lastIndex=0;;){const s=Su.exec(i),o=Su.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Am(t,c===void 0?new Ww(a,n,e):new jw(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new Xw(a),Am(t,f)),t=f}}}class wl{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Yw(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function bm(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const $w=37297;let qw=0;function Kw(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Cm=new Be;function Zw(n){Je._getMatrix(Cm,Je.workingColorSpace,n);const e=`mat3( ${Cm.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case _c:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Rm(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Kw(n.getShaderSource(e),o)}else return r}function Jw(n,e){const t=Zw(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Qw(n,e){let t;switch(e){case nS:t="Linear";break;case iS:t="Reinhard";break;case rS:t="Cineon";break;case _v:t="ACESFilmic";break;case oS:t="AgX";break;case aS:t="Neutral";break;case sS:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const il=new L;function eT(){Je.getLuminanceCoefficients(il);const n=il.x.toFixed(4),e=il.y.toFixed(4),t=il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bo).join(`
`)}function nT(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function iT(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function bo(n){return n!==""}function Pm(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rT=/^[ \t]*#include +<([\w\d./]+)>/gm;function hd(n){return n.replace(rT,oT)}const sT=new Map;function oT(n,e){let t=Ve[e];if(t===void 0){const i=sT.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return hd(t)}const aT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nm(n){return n.replace(aT,lT)}function lT(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Im(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cT(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===mv?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===gv?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yi&&(e="SHADOWMAP_TYPE_VSM"),e}function uT(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Gs:case Ws:e="ENVMAP_TYPE_CUBE";break;case vc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hT(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ws:e="ENVMAP_MODE_REFRACTION";break}return e}function dT(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case vv:e="ENVMAP_BLENDING_MULTIPLY";break;case eS:e="ENVMAP_BLENDING_MIX";break;case tS:e="ENVMAP_BLENDING_ADD";break}return e}function fT(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function pT(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=cT(t),c=uT(t),u=hT(t),f=dT(t),d=fT(t),p=tT(t),m=nT(s),_=r.createProgram();let v,h,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(bo).join(`
`),v.length>0&&(v+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(bo).join(`
`),h.length>0&&(h+=`
`)):(v=[Im(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bo).join(`
`),h=[Im(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==cr?"#define TONE_MAPPING":"",t.toneMapping!==cr?Ve.tonemapping_pars_fragment:"",t.toneMapping!==cr?Qw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Jw("linearToOutputTexel",t.outputColorSpace),eT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bo).join(`
`)),o=hd(o),o=Pm(o,t),o=Lm(o,t),a=hd(a),a=Pm(a,t),a=Lm(a,t),o=Nm(o),a=Nm(a),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,v=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,h=["#define varying in",t.glslVersion===jp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const x=g+v+o,y=g+h+a,R=bm(r,r.VERTEX_SHADER,x),b=bm(r,r.FRAGMENT_SHADER,y);r.attachShader(_,R),r.attachShader(_,b),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(N){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),k=r.getShaderInfoLog(R).trim(),X=r.getShaderInfoLog(b).trim();let J=!0,W=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,R,b);else{const Q=Rm(r,R,"vertex"),I=Rm(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+B+`
`+Q+`
`+I)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||X==="")&&(W=!1);W&&(N.diagnostics={runnable:J,programLog:B,vertexShader:{log:k,prefix:v},fragmentShader:{log:X,prefix:h}})}r.deleteShader(R),r.deleteShader(b),P=new wl(r,_),T=iT(r,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,$w)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qw++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=b,this}let mT=0;class gT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vT(e),t.set(e,i)),i}}class vT{constructor(e){this.id=mT++,this.code=e,this.usedTimes=0}}function _T(n,e,t,i,r,s,o){const a=new Fv,l=new gT,c=new Set,u=[],f=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function v(T,M,N,B,k){const X=B.fog,J=k.geometry,W=T.isMeshStandardMaterial?B.environment:null,Q=(T.isMeshStandardMaterial?t:e).get(T.envMap||W),I=Q&&Q.mapping===vc?Q.image.height:null,$=m[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const te=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,le=te!==void 0?te.length:0;let Ee=0;J.morphAttributes.position!==void 0&&(Ee=1),J.morphAttributes.normal!==void 0&&(Ee=2),J.morphAttributes.color!==void 0&&(Ee=3);let Ye,Y,G,ee;if($){const it=oi[$];Ye=it.vertexShader,Y=it.fragmentShader}else Ye=T.vertexShader,Y=T.fragmentShader,l.update(T),G=l.getVertexShaderID(T),ee=l.getFragmentShaderID(T);const K=n.getRenderTarget(),ce=n.state.buffers.depth.getReversed(),ue=k.isInstancedMesh===!0,_e=k.isBatchedMesh===!0,Oe=!!T.map,Le=!!T.matcap,We=!!Q,D=!!T.aoMap,Rt=!!T.lightMap,$e=!!T.bumpMap,qe=!!T.normalMap,Ie=!!T.displacementMap,ut=!!T.emissiveMap,Ne=!!T.metalnessMap,C=!!T.roughnessMap,E=T.anisotropy>0,z=T.clearcoat>0,ne=T.dispersion>0,re=T.iridescence>0,Z=T.sheen>0,be=T.transmission>0,fe=E&&!!T.anisotropyMap,xe=z&&!!T.clearcoatMap,Ze=z&&!!T.clearcoatNormalMap,oe=z&&!!T.clearcoatRoughnessMap,ye=re&&!!T.iridescenceMap,De=re&&!!T.iridescenceThicknessMap,Ue=Z&&!!T.sheenColorMap,Se=Z&&!!T.sheenRoughnessMap,Ke=!!T.specularMap,He=!!T.specularColorMap,at=!!T.specularIntensityMap,U=be&&!!T.transmissionMap,de=be&&!!T.thicknessMap,j=!!T.gradientMap,ie=!!T.alphaMap,ge=T.alphaTest>0,pe=!!T.alphaHash,ke=!!T.extensions;let wt=cr;T.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(wt=n.toneMapping);const Yt={shaderID:$,shaderType:T.type,shaderName:T.name,vertexShader:Ye,fragmentShader:Y,defines:T.defines,customVertexShaderID:G,customFragmentShaderID:ee,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:_e,batchingColor:_e&&k._colorsTexture!==null,instancing:ue,instancingColor:ue&&k.instanceColor!==null,instancingMorph:ue&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Zs,alphaToCoverage:!!T.alphaToCoverage,map:Oe,matcap:Le,envMap:We,envMapMode:We&&Q.mapping,envMapCubeUVHeight:I,aoMap:D,lightMap:Rt,bumpMap:$e,normalMap:qe,displacementMap:d&&Ie,emissiveMap:ut,normalMapObjectSpace:qe&&T.normalMapType===hS,normalMapTangentSpace:qe&&T.normalMapType===Pv,metalnessMap:Ne,roughnessMap:C,anisotropy:E,anisotropyMap:fe,clearcoat:z,clearcoatMap:xe,clearcoatNormalMap:Ze,clearcoatRoughnessMap:oe,dispersion:ne,iridescence:re,iridescenceMap:ye,iridescenceThicknessMap:De,sheen:Z,sheenColorMap:Ue,sheenRoughnessMap:Se,specularMap:Ke,specularColorMap:He,specularIntensityMap:at,transmission:be,transmissionMap:U,thicknessMap:de,gradientMap:j,opaque:T.transparent===!1&&T.blending===Ls&&T.alphaToCoverage===!1,alphaMap:ie,alphaTest:ge,alphaHash:pe,combine:T.combine,mapUv:Oe&&_(T.map.channel),aoMapUv:D&&_(T.aoMap.channel),lightMapUv:Rt&&_(T.lightMap.channel),bumpMapUv:$e&&_(T.bumpMap.channel),normalMapUv:qe&&_(T.normalMap.channel),displacementMapUv:Ie&&_(T.displacementMap.channel),emissiveMapUv:ut&&_(T.emissiveMap.channel),metalnessMapUv:Ne&&_(T.metalnessMap.channel),roughnessMapUv:C&&_(T.roughnessMap.channel),anisotropyMapUv:fe&&_(T.anisotropyMap.channel),clearcoatMapUv:xe&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:De&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(T.sheenRoughnessMap.channel),specularMapUv:Ke&&_(T.specularMap.channel),specularColorMapUv:He&&_(T.specularColorMap.channel),specularIntensityMapUv:at&&_(T.specularIntensityMap.channel),transmissionMapUv:U&&_(T.transmissionMap.channel),thicknessMapUv:de&&_(T.thicknessMap.channel),alphaMapUv:ie&&_(T.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(qe||E),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!J.attributes.uv&&(Oe||ie),fog:!!X,useFog:T.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:ce,skinning:k.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ee,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:wt,decodeVideoTexture:Oe&&T.map.isVideoTexture===!0&&Je.getTransfer(T.map.colorSpace)===st,decodeVideoTextureEmissive:ut&&T.emissiveMap.isVideoTexture===!0&&Je.getTransfer(T.emissiveMap.colorSpace)===st,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Dn,flipSided:T.side===an,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:ke&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&T.extensions.multiDraw===!0||_e)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Yt.vertexUv1s=c.has(1),Yt.vertexUv2s=c.has(2),Yt.vertexUv3s=c.has(3),c.clear(),Yt}function h(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const N in T.defines)M.push(N),M.push(T.defines[N]);return T.isRawShaderMaterial===!1&&(g(M,T),x(M,T),M.push(n.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function g(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function x(T,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),T.push(a.mask)}function y(T){const M=m[T.type];let N;if(M){const B=oi[M];N=t1.clone(B.uniforms)}else N=T.uniforms;return N}function R(T,M){let N;for(let B=0,k=u.length;B<k;B++){const X=u[B];if(X.cacheKey===M){N=X,++N.usedTimes;break}}return N===void 0&&(N=new pT(n,M,T,s),u.push(N)),N}function b(T){if(--T.usedTimes===0){const M=u.indexOf(T);u[M]=u[u.length-1],u.pop(),T.destroy()}}function A(T){l.remove(T)}function P(){l.dispose()}return{getParameters:v,getProgramCacheKey:h,getUniforms:y,acquireProgram:R,releaseProgram:b,releaseShaderCache:A,programs:u,dispose:P}}function xT(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function yT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Dm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Um(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,d,p,m,_,v){let h=n[e];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:m,renderOrder:f.renderOrder,z:_,group:v},n[e]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=m,h.renderOrder=f.renderOrder,h.z=_,h.group=v),e++,h}function a(f,d,p,m,_,v){const h=o(f,d,p,m,_,v);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):t.push(h)}function l(f,d,p,m,_,v){const h=o(f,d,p,m,_,v);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):t.unshift(h)}function c(f,d){t.length>1&&t.sort(f||yT),i.length>1&&i.sort(d||Dm),r.length>1&&r.sort(d||Dm)}function u(){for(let f=e,d=n.length;f<d;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function ST(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Um,n.set(i,[o])):r>=s.length?(o=new Um,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function MT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ge};break;case"SpotLight":t={position:new L,direction:new L,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function ET(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let wT=0;function TT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function AT(n){const e=new MT,t=ET(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const r=new L,s=new mt,o=new mt;function a(c){let u=0,f=0,d=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,m=0,_=0,v=0,h=0,g=0,x=0,y=0,R=0,b=0,A=0;c.sort(TT);for(let T=0,M=c.length;T<M;T++){const N=c[T],B=N.color,k=N.intensity,X=N.distance,J=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=B.r*k,f+=B.g*k,d+=B.b*k;else if(N.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(N.sh.coefficients[W],k);A++}else if(N.isDirectionalLight){const W=e.get(N);if(W.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const Q=N.shadow,I=t.get(N);I.shadowIntensity=Q.intensity,I.shadowBias=Q.bias,I.shadowNormalBias=Q.normalBias,I.shadowRadius=Q.radius,I.shadowMapSize=Q.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=N.shadow.matrix,g++}i.directional[p]=W,p++}else if(N.isSpotLight){const W=e.get(N);W.position.setFromMatrixPosition(N.matrixWorld),W.color.copy(B).multiplyScalar(k),W.distance=X,W.coneCos=Math.cos(N.angle),W.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),W.decay=N.decay,i.spot[_]=W;const Q=N.shadow;if(N.map&&(i.spotLightMap[R]=N.map,R++,Q.updateMatrices(N),N.castShadow&&b++),i.spotLightMatrix[_]=Q.matrix,N.castShadow){const I=t.get(N);I.shadowIntensity=Q.intensity,I.shadowBias=Q.bias,I.shadowNormalBias=Q.normalBias,I.shadowRadius=Q.radius,I.shadowMapSize=Q.mapSize,i.spotShadow[_]=I,i.spotShadowMap[_]=J,y++}_++}else if(N.isRectAreaLight){const W=e.get(N);W.color.copy(B).multiplyScalar(k),W.halfWidth.set(N.width*.5,0,0),W.halfHeight.set(0,N.height*.5,0),i.rectArea[v]=W,v++}else if(N.isPointLight){const W=e.get(N);if(W.color.copy(N.color).multiplyScalar(N.intensity),W.distance=N.distance,W.decay=N.decay,N.castShadow){const Q=N.shadow,I=t.get(N);I.shadowIntensity=Q.intensity,I.shadowBias=Q.bias,I.shadowNormalBias=Q.normalBias,I.shadowRadius=Q.radius,I.shadowMapSize=Q.mapSize,I.shadowCameraNear=Q.camera.near,I.shadowCameraFar=Q.camera.far,i.pointShadow[m]=I,i.pointShadowMap[m]=J,i.pointShadowMatrix[m]=N.shadow.matrix,x++}i.point[m]=W,m++}else if(N.isHemisphereLight){const W=e.get(N);W.skyColor.copy(N.color).multiplyScalar(k),W.groundColor.copy(N.groundColor).multiplyScalar(k),i.hemi[h]=W,h++}}v>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const P=i.hash;(P.directionalLength!==p||P.pointLength!==m||P.spotLength!==_||P.rectAreaLength!==v||P.hemiLength!==h||P.numDirectionalShadows!==g||P.numPointShadows!==x||P.numSpotShadows!==y||P.numSpotMaps!==R||P.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=v,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+R-b,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,P.directionalLength=p,P.pointLength=m,P.spotLength=_,P.rectAreaLength=v,P.hemiLength=h,P.numDirectionalShadows=g,P.numPointShadows=x,P.numSpotShadows=y,P.numSpotMaps=R,P.numLightProbes=A,i.version=wT++)}function l(c,u){let f=0,d=0,p=0,m=0,_=0;const v=u.matrixWorldInverse;for(let h=0,g=c.length;h<g;h++){const x=c[h];if(x.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(v),f++}else if(x.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(v),y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(v),p++}else if(x.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(v),o.identity(),s.copy(x.matrixWorld),s.premultiply(v),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(v),d++}else if(x.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(v),_++}}}return{setup:a,setupView:l,state:i}}function Fm(n){const e=new AT(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function bT(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Fm(n),e.set(r,[a])):s>=o.length?(a=new Fm(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class CT extends to{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=cS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class RT extends to{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const PT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LT=`uniform sampler2D shadow_pass;
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
}`;function NT(n,e,t){let i=new mf;const r=new Pe,s=new Pe,o=new ot,a=new CT({depthPacking:uS}),l=new RT,c={},u=t.maxTextureSize,f={[Ii]:an,[an]:Ii,[Dn]:Dn},d=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:PT,fragmentShader:LT}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new hn;m.setAttribute("position",new ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Re(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mv;let h=this.type;this.render=function(b,A,P){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;const T=n.getRenderTarget(),M=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),B=n.state;B.setBlending(lr),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=h!==yi&&this.type===yi,X=h===yi&&this.type!==yi;for(let J=0,W=b.length;J<W;J++){const Q=b[J],I=Q.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const $=I.getFrameExtents();if(r.multiply($),s.copy(I.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/$.x),r.x=s.x*$.x,I.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/$.y),r.y=s.y*$.y,I.mapSize.y=s.y)),I.map===null||k===!0||X===!0){const le=this.type!==yi?{minFilter:Qn,magFilter:Qn}:{};I.map!==null&&I.map.dispose(),I.map=new Gr(r.x,r.y,le),I.map.texture.name=Q.name+".shadowMap",I.camera.updateProjectionMatrix()}n.setRenderTarget(I.map),n.clear();const te=I.getViewportCount();for(let le=0;le<te;le++){const Ee=I.getViewport(le);o.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),B.viewport(o),I.updateMatrices(Q,le),i=I.getFrustum(),y(A,P,I.camera,Q,this.type)}I.isPointLightShadow!==!0&&this.type===yi&&g(I,P),I.needsUpdate=!1}h=this.type,v.needsUpdate=!1,n.setRenderTarget(T,M,N)};function g(b,A){const P=e.update(_);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Gr(r.x,r.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,P,d,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,P,p,_,null)}function x(b,A,P,T){let M=null;const N=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)M=N;else if(M=P.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=M.uuid,k=A.uuid;let X=c[B];X===void 0&&(X={},c[B]=X);let J=X[k];J===void 0&&(J=M.clone(),X[k]=J,A.addEventListener("dispose",R)),M=J}if(M.visible=A.visible,M.wireframe=A.wireframe,T===yi?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:f[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=n.properties.get(M);B.light=P}return M}function y(b,A,P,T,M){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===yi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);const k=e.update(b),X=b.material;if(Array.isArray(X)){const J=k.groups;for(let W=0,Q=J.length;W<Q;W++){const I=J[W],$=X[I.materialIndex];if($&&$.visible){const te=x(b,$,T,M);b.onBeforeShadow(n,b,A,P,k,te,I),n.renderBufferDirect(P,null,k,te,b,I),b.onAfterShadow(n,b,A,P,k,te,I)}}}else if(X.visible){const J=x(b,X,T,M);b.onBeforeShadow(n,b,A,P,k,J,null),n.renderBufferDirect(P,null,k,J,b,null),b.onAfterShadow(n,b,A,P,k,J,null)}}const B=b.children;for(let k=0,X=B.length;k<X;k++)y(B[k],A,P,T,M)}function R(b){b.target.removeEventListener("dispose",R);for(const P in c){const T=c[P],M=b.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const IT={[Rh]:Ph,[Lh]:Dh,[Nh]:Uh,[Vs]:Ih,[Ph]:Rh,[Dh]:Lh,[Uh]:Nh,[Ih]:Vs};function DT(n,e){function t(){let U=!1;const de=new ot;let j=null;const ie=new ot(0,0,0,0);return{setMask:function(ge){j!==ge&&!U&&(n.colorMask(ge,ge,ge,ge),j=ge)},setLocked:function(ge){U=ge},setClear:function(ge,pe,ke,wt,Yt){Yt===!0&&(ge*=wt,pe*=wt,ke*=wt),de.set(ge,pe,ke,wt),ie.equals(de)===!1&&(n.clearColor(ge,pe,ke,wt),ie.copy(de))},reset:function(){U=!1,j=null,ie.set(-1,0,0,0)}}}function i(){let U=!1,de=!1,j=null,ie=null,ge=null;return{setReversed:function(pe){if(de!==pe){const ke=e.get("EXT_clip_control");de?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT);const wt=ge;ge=null,this.setClear(wt)}de=pe},getReversed:function(){return de},setTest:function(pe){pe?K(n.DEPTH_TEST):ce(n.DEPTH_TEST)},setMask:function(pe){j!==pe&&!U&&(n.depthMask(pe),j=pe)},setFunc:function(pe){if(de&&(pe=IT[pe]),ie!==pe){switch(pe){case Rh:n.depthFunc(n.NEVER);break;case Ph:n.depthFunc(n.ALWAYS);break;case Lh:n.depthFunc(n.LESS);break;case Vs:n.depthFunc(n.LEQUAL);break;case Nh:n.depthFunc(n.EQUAL);break;case Ih:n.depthFunc(n.GEQUAL);break;case Dh:n.depthFunc(n.GREATER);break;case Uh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ie=pe}},setLocked:function(pe){U=pe},setClear:function(pe){ge!==pe&&(de&&(pe=1-pe),n.clearDepth(pe),ge=pe)},reset:function(){U=!1,j=null,ie=null,ge=null,de=!1}}}function r(){let U=!1,de=null,j=null,ie=null,ge=null,pe=null,ke=null,wt=null,Yt=null;return{setTest:function(it){U||(it?K(n.STENCIL_TEST):ce(n.STENCIL_TEST))},setMask:function(it){de!==it&&!U&&(n.stencilMask(it),de=it)},setFunc:function(it,zn,di){(j!==it||ie!==zn||ge!==di)&&(n.stencilFunc(it,zn,di),j=it,ie=zn,ge=di)},setOp:function(it,zn,di){(pe!==it||ke!==zn||wt!==di)&&(n.stencilOp(it,zn,di),pe=it,ke=zn,wt=di)},setLocked:function(it){U=it},setClear:function(it){Yt!==it&&(n.clearStencil(it),Yt=it)},reset:function(){U=!1,de=null,j=null,ie=null,ge=null,pe=null,ke=null,wt=null,Yt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d=new WeakMap,p=[],m=null,_=!1,v=null,h=null,g=null,x=null,y=null,R=null,b=null,A=new Ge(0,0,0),P=0,T=!1,M=null,N=null,B=null,k=null,X=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(I)[1]),W=Q>=1):I.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),W=Q>=2);let $=null,te={};const le=n.getParameter(n.SCISSOR_BOX),Ee=n.getParameter(n.VIEWPORT),Ye=new ot().fromArray(le),Y=new ot().fromArray(Ee);function G(U,de,j,ie){const ge=new Uint8Array(4),pe=n.createTexture();n.bindTexture(U,pe),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<j;ke++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,ie,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(de+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return pe}const ee={};ee[n.TEXTURE_2D]=G(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=G(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=G(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=G(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(n.DEPTH_TEST),o.setFunc(Vs),$e(!1),qe(Bp),K(n.CULL_FACE),D(lr);function K(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function ce(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function ue(U,de){return f[U]!==de?(n.bindFramebuffer(U,de),f[U]=de,U===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=de),U===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=de),!0):!1}function _e(U,de){let j=p,ie=!1;if(U){j=d.get(de),j===void 0&&(j=[],d.set(de,j));const ge=U.textures;if(j.length!==ge.length||j[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,ke=ge.length;pe<ke;pe++)j[pe]=n.COLOR_ATTACHMENT0+pe;j.length=ge.length,ie=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,ie=!0);ie&&n.drawBuffers(j)}function Oe(U){return m!==U?(n.useProgram(U),m=U,!0):!1}const Le={[br]:n.FUNC_ADD,[Oy]:n.FUNC_SUBTRACT,[ky]:n.FUNC_REVERSE_SUBTRACT};Le[zy]=n.MIN,Le[By]=n.MAX;const We={[Hy]:n.ZERO,[Vy]:n.ONE,[Gy]:n.SRC_COLOR,[bh]:n.SRC_ALPHA,[qy]:n.SRC_ALPHA_SATURATE,[Yy]:n.DST_COLOR,[jy]:n.DST_ALPHA,[Wy]:n.ONE_MINUS_SRC_COLOR,[Ch]:n.ONE_MINUS_SRC_ALPHA,[$y]:n.ONE_MINUS_DST_COLOR,[Xy]:n.ONE_MINUS_DST_ALPHA,[Ky]:n.CONSTANT_COLOR,[Zy]:n.ONE_MINUS_CONSTANT_COLOR,[Jy]:n.CONSTANT_ALPHA,[Qy]:n.ONE_MINUS_CONSTANT_ALPHA};function D(U,de,j,ie,ge,pe,ke,wt,Yt,it){if(U===lr){_===!0&&(ce(n.BLEND),_=!1);return}if(_===!1&&(K(n.BLEND),_=!0),U!==Fy){if(U!==v||it!==T){if((h!==br||y!==br)&&(n.blendEquation(n.FUNC_ADD),h=br,y=br),it)switch(U){case Ls:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case oa:n.blendFunc(n.ONE,n.ONE);break;case Hp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vp:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ls:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case oa:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Hp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vp:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}g=null,x=null,R=null,b=null,A.set(0,0,0),P=0,v=U,T=it}return}ge=ge||de,pe=pe||j,ke=ke||ie,(de!==h||ge!==y)&&(n.blendEquationSeparate(Le[de],Le[ge]),h=de,y=ge),(j!==g||ie!==x||pe!==R||ke!==b)&&(n.blendFuncSeparate(We[j],We[ie],We[pe],We[ke]),g=j,x=ie,R=pe,b=ke),(wt.equals(A)===!1||Yt!==P)&&(n.blendColor(wt.r,wt.g,wt.b,Yt),A.copy(wt),P=Yt),v=U,T=!1}function Rt(U,de){U.side===Dn?ce(n.CULL_FACE):K(n.CULL_FACE);let j=U.side===an;de&&(j=!j),$e(j),U.blending===Ls&&U.transparent===!1?D(lr):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const ie=U.stencilWrite;a.setTest(ie),ie&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ut(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(U){M!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),M=U)}function qe(U){U!==Dy?(K(n.CULL_FACE),U!==N&&(U===Bp?n.cullFace(n.BACK):U===Uy?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ce(n.CULL_FACE),N=U}function Ie(U){U!==B&&(W&&n.lineWidth(U),B=U)}function ut(U,de,j){U?(K(n.POLYGON_OFFSET_FILL),(k!==de||X!==j)&&(n.polygonOffset(de,j),k=de,X=j)):ce(n.POLYGON_OFFSET_FILL)}function Ne(U){U?K(n.SCISSOR_TEST):ce(n.SCISSOR_TEST)}function C(U){U===void 0&&(U=n.TEXTURE0+J-1),$!==U&&(n.activeTexture(U),$=U)}function E(U,de,j){j===void 0&&($===null?j=n.TEXTURE0+J-1:j=$);let ie=te[j];ie===void 0&&(ie={type:void 0,texture:void 0},te[j]=ie),(ie.type!==U||ie.texture!==de)&&($!==j&&(n.activeTexture(j),$=j),n.bindTexture(U,de||ee[U]),ie.type=U,ie.texture=de)}function z(){const U=te[$];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ne(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ze(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function De(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ue(U){Ye.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),Ye.copy(U))}function Se(U){Y.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Y.copy(U))}function Ke(U,de){let j=c.get(de);j===void 0&&(j=new WeakMap,c.set(de,j));let ie=j.get(U);ie===void 0&&(ie=n.getUniformBlockIndex(de,U.name),j.set(U,ie))}function He(U,de){const ie=c.get(de).get(U);l.get(de)!==ie&&(n.uniformBlockBinding(de,ie,U.__bindingPointIndex),l.set(de,ie))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},$=null,te={},f={},d=new WeakMap,p=[],m=null,_=!1,v=null,h=null,g=null,x=null,y=null,R=null,b=null,A=new Ge(0,0,0),P=0,T=!1,M=null,N=null,B=null,k=null,X=null,Ye.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:K,disable:ce,bindFramebuffer:ue,drawBuffers:_e,useProgram:Oe,setBlending:D,setMaterial:Rt,setFlipSided:$e,setCullFace:qe,setLineWidth:Ie,setPolygonOffset:ut,setScissorTest:Ne,activeTexture:C,bindTexture:E,unbindTexture:z,compressedTexImage2D:ne,compressedTexImage3D:re,texImage2D:ye,texImage3D:De,updateUBOMapping:Ke,uniformBlockBinding:He,texStorage2D:Ze,texStorage3D:oe,texSubImage2D:Z,texSubImage3D:be,compressedTexSubImage2D:fe,compressedTexSubImage3D:xe,scissor:Ue,viewport:Se,reset:at}}function Om(n,e,t,i){const r=UT(i);switch(t){case Ev:return n*e;case Tv:return n*e;case Av:return n*e*2;case bv:return n*e/r.components*r.byteLength;case hf:return n*e/r.components*r.byteLength;case Cv:return n*e*2/r.components*r.byteLength;case df:return n*e*2/r.components*r.byteLength;case wv:return n*e*3/r.components*r.byteLength;case qn:return n*e*4/r.components*r.byteLength;case ff:return n*e*4/r.components*r.byteLength;case xl:case yl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sl:case Ml:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bh:case Vh:return Math.max(n,16)*Math.max(e,8)/4;case zh:case Hh:return Math.max(n,8)*Math.max(e,8)/2;case Gh:case Wh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case jh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case $h:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case qh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Kh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Zh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Jh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Qh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ed:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case td:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case nd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case id:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case rd:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case sd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case El:case od:case ad:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Rv:case ld:return Math.ceil(n/4)*Math.ceil(e/4)*8;case cd:case ud:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function UT(n){switch(n){case Di:case yv:return{byteLength:1,components:1};case aa:case Sv:case pa:return{byteLength:2,components:1};case cf:case uf:return{byteLength:2,components:4};case Vr:case lf:case Ti:return{byteLength:4,components:1};case Mv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function FT(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,u=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,E){return p?new OffscreenCanvas(C,E):Kl("canvas")}function _(C,E,z){let ne=1;const re=Ne(C);if((re.width>z||re.height>z)&&(ne=z/Math.max(re.width,re.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(ne*re.width),be=Math.floor(ne*re.height);f===void 0&&(f=m(Z,be));const fe=E?m(Z,be):f;return fe.width=Z,fe.height=be,fe.getContext("2d").drawImage(C,0,0,Z,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Z+"x"+be+")."),fe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),C;return C}function v(C){return C.generateMipmaps}function h(C){n.generateMipmap(C)}function g(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(C,E,z,ne,re=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=E;if(E===n.RED&&(z===n.FLOAT&&(Z=n.R32F),z===n.HALF_FLOAT&&(Z=n.R16F),z===n.UNSIGNED_BYTE&&(Z=n.R8)),E===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.R8UI),z===n.UNSIGNED_SHORT&&(Z=n.R16UI),z===n.UNSIGNED_INT&&(Z=n.R32UI),z===n.BYTE&&(Z=n.R8I),z===n.SHORT&&(Z=n.R16I),z===n.INT&&(Z=n.R32I)),E===n.RG&&(z===n.FLOAT&&(Z=n.RG32F),z===n.HALF_FLOAT&&(Z=n.RG16F),z===n.UNSIGNED_BYTE&&(Z=n.RG8)),E===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RG8UI),z===n.UNSIGNED_SHORT&&(Z=n.RG16UI),z===n.UNSIGNED_INT&&(Z=n.RG32UI),z===n.BYTE&&(Z=n.RG8I),z===n.SHORT&&(Z=n.RG16I),z===n.INT&&(Z=n.RG32I)),E===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),z===n.UNSIGNED_INT&&(Z=n.RGB32UI),z===n.BYTE&&(Z=n.RGB8I),z===n.SHORT&&(Z=n.RGB16I),z===n.INT&&(Z=n.RGB32I)),E===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),z===n.UNSIGNED_INT&&(Z=n.RGBA32UI),z===n.BYTE&&(Z=n.RGBA8I),z===n.SHORT&&(Z=n.RGBA16I),z===n.INT&&(Z=n.RGBA32I)),E===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),E===n.RGBA){const be=re?_c:Je.getTransfer(ne);z===n.FLOAT&&(Z=n.RGBA32F),z===n.HALF_FLOAT&&(Z=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Z=be===st?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(C,E){let z;return C?E===null||E===Vr||E===js?z=n.DEPTH24_STENCIL8:E===Ti?z=n.DEPTH32F_STENCIL8:E===aa&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Vr||E===js?z=n.DEPTH_COMPONENT24:E===Ti?z=n.DEPTH_COMPONENT32F:E===aa&&(z=n.DEPTH_COMPONENT16),z}function R(C,E){return v(C)===!0||C.isFramebufferTexture&&C.minFilter!==Qn&&C.minFilter!==li?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function b(C){const E=C.target;E.removeEventListener("dispose",b),P(E),E.isVideoTexture&&u.delete(E)}function A(C){const E=C.target;E.removeEventListener("dispose",A),M(E)}function P(C){const E=i.get(C);if(E.__webglInit===void 0)return;const z=C.source,ne=d.get(z);if(ne){const re=ne[E.__cacheKey];re.usedTimes--,re.usedTimes===0&&T(C),Object.keys(ne).length===0&&d.delete(z)}i.remove(C)}function T(C){const E=i.get(C);n.deleteTexture(E.__webglTexture);const z=C.source,ne=d.get(z);delete ne[E.__cacheKey],o.memory.textures--}function M(C){const E=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(E.__webglFramebuffer[ne]))for(let re=0;re<E.__webglFramebuffer[ne].length;re++)n.deleteFramebuffer(E.__webglFramebuffer[ne][re]);else n.deleteFramebuffer(E.__webglFramebuffer[ne]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[ne])}else{if(Array.isArray(E.__webglFramebuffer))for(let ne=0;ne<E.__webglFramebuffer.length;ne++)n.deleteFramebuffer(E.__webglFramebuffer[ne]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ne=0;ne<E.__webglColorRenderbuffer.length;ne++)E.__webglColorRenderbuffer[ne]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[ne]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const z=C.textures;for(let ne=0,re=z.length;ne<re;ne++){const Z=i.get(z[ne]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(z[ne])}i.remove(C)}let N=0;function B(){N=0}function k(){const C=N;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),N+=1,C}function X(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function J(C,E){const z=i.get(C);if(C.isVideoTexture&&Ie(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const ne=C.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,C,E);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+E)}function W(C,E){const z=i.get(C);if(C.version>0&&z.__version!==C.version){Y(z,C,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+E)}function Q(C,E){const z=i.get(C);if(C.version>0&&z.__version!==C.version){Y(z,C,E);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+E)}function I(C,E){const z=i.get(C);if(C.version>0&&z.__version!==C.version){G(z,C,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+E)}const $={[Hr]:n.REPEAT,[Nr]:n.CLAMP_TO_EDGE,[kh]:n.MIRRORED_REPEAT},te={[Qn]:n.NEAREST,[lS]:n.NEAREST_MIPMAP_NEAREST,[Oa]:n.NEAREST_MIPMAP_LINEAR,[li]:n.LINEAR,[qc]:n.LINEAR_MIPMAP_NEAREST,[Ir]:n.LINEAR_MIPMAP_LINEAR},le={[dS]:n.NEVER,[_S]:n.ALWAYS,[fS]:n.LESS,[Lv]:n.LEQUAL,[pS]:n.EQUAL,[vS]:n.GEQUAL,[mS]:n.GREATER,[gS]:n.NOTEQUAL};function Ee(C,E){if(E.type===Ti&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===li||E.magFilter===qc||E.magFilter===Oa||E.magFilter===Ir||E.minFilter===li||E.minFilter===qc||E.minFilter===Oa||E.minFilter===Ir)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,$[E.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,$[E.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,$[E.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,te[E.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,te[E.minFilter]),E.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,le[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Qn||E.minFilter!==Oa&&E.minFilter!==Ir||E.type===Ti&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Ye(C,E){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",b));const ne=E.source;let re=d.get(ne);re===void 0&&(re={},d.set(ne,re));const Z=X(E);if(Z!==C.__cacheKey){re[Z]===void 0&&(re[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),re[Z].usedTimes++;const be=re[C.__cacheKey];be!==void 0&&(re[C.__cacheKey].usedTimes--,be.usedTimes===0&&T(E)),C.__cacheKey=Z,C.__webglTexture=re[Z].texture}return z}function Y(C,E,z){let ne=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ne=n.TEXTURE_3D);const re=Ye(C,E),Z=E.source;t.bindTexture(ne,C.__webglTexture,n.TEXTURE0+z);const be=i.get(Z);if(Z.version!==be.__version||re===!0){t.activeTexture(n.TEXTURE0+z);const fe=Je.getPrimaries(Je.workingColorSpace),xe=E.colorSpace===Zi?null:Je.getPrimaries(E.colorSpace),Ze=E.colorSpace===Zi||fe===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let oe=_(E.image,!1,r.maxTextureSize);oe=ut(E,oe);const ye=s.convert(E.format,E.colorSpace),De=s.convert(E.type);let Ue=x(E.internalFormat,ye,De,E.colorSpace,E.isVideoTexture);Ee(ne,E);let Se;const Ke=E.mipmaps,He=E.isVideoTexture!==!0,at=be.__version===void 0||re===!0,U=Z.dataReady,de=R(E,oe);if(E.isDepthTexture)Ue=y(E.format===Xs,E.type),at&&(He?t.texStorage2D(n.TEXTURE_2D,1,Ue,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,ye,De,null));else if(E.isDataTexture)if(Ke.length>0){He&&at&&t.texStorage2D(n.TEXTURE_2D,de,Ue,Ke[0].width,Ke[0].height);for(let j=0,ie=Ke.length;j<ie;j++)Se=Ke[j],He?U&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,Se.width,Se.height,ye,De,Se.data):t.texImage2D(n.TEXTURE_2D,j,Ue,Se.width,Se.height,0,ye,De,Se.data);E.generateMipmaps=!1}else He?(at&&t.texStorage2D(n.TEXTURE_2D,de,Ue,oe.width,oe.height),U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe.width,oe.height,ye,De,oe.data)):t.texImage2D(n.TEXTURE_2D,0,Ue,oe.width,oe.height,0,ye,De,oe.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){He&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,Ue,Ke[0].width,Ke[0].height,oe.depth);for(let j=0,ie=Ke.length;j<ie;j++)if(Se=Ke[j],E.format!==qn)if(ye!==null)if(He){if(U)if(E.layerUpdates.size>0){const ge=Om(Se.width,Se.height,E.format,E.type);for(const pe of E.layerUpdates){const ke=Se.data.subarray(pe*ge/Se.data.BYTES_PER_ELEMENT,(pe+1)*ge/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,pe,Se.width,Se.height,1,ye,ke)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,Se.width,Se.height,oe.depth,ye,Se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,Ue,Se.width,Se.height,oe.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,Se.width,Se.height,oe.depth,ye,De,Se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,Ue,Se.width,Se.height,oe.depth,0,ye,De,Se.data)}else{He&&at&&t.texStorage2D(n.TEXTURE_2D,de,Ue,Ke[0].width,Ke[0].height);for(let j=0,ie=Ke.length;j<ie;j++)Se=Ke[j],E.format!==qn?ye!==null?He?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,Se.width,Se.height,ye,Se.data):t.compressedTexImage2D(n.TEXTURE_2D,j,Ue,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?U&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,Se.width,Se.height,ye,De,Se.data):t.texImage2D(n.TEXTURE_2D,j,Ue,Se.width,Se.height,0,ye,De,Se.data)}else if(E.isDataArrayTexture)if(He){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,Ue,oe.width,oe.height,oe.depth),U)if(E.layerUpdates.size>0){const j=Om(oe.width,oe.height,E.format,E.type);for(const ie of E.layerUpdates){const ge=oe.data.subarray(ie*j/oe.data.BYTES_PER_ELEMENT,(ie+1)*j/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ie,oe.width,oe.height,1,ye,De,ge)}E.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ye,De,oe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,oe.width,oe.height,oe.depth,0,ye,De,oe.data);else if(E.isData3DTexture)He?(at&&t.texStorage3D(n.TEXTURE_3D,de,Ue,oe.width,oe.height,oe.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ye,De,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,oe.width,oe.height,oe.depth,0,ye,De,oe.data);else if(E.isFramebufferTexture){if(at)if(He)t.texStorage2D(n.TEXTURE_2D,de,Ue,oe.width,oe.height);else{let j=oe.width,ie=oe.height;for(let ge=0;ge<de;ge++)t.texImage2D(n.TEXTURE_2D,ge,Ue,j,ie,0,ye,De,null),j>>=1,ie>>=1}}else if(Ke.length>0){if(He&&at){const j=Ne(Ke[0]);t.texStorage2D(n.TEXTURE_2D,de,Ue,j.width,j.height)}for(let j=0,ie=Ke.length;j<ie;j++)Se=Ke[j],He?U&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,ye,De,Se):t.texImage2D(n.TEXTURE_2D,j,Ue,ye,De,Se);E.generateMipmaps=!1}else if(He){if(at){const j=Ne(oe);t.texStorage2D(n.TEXTURE_2D,de,Ue,j.width,j.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,De,oe)}else t.texImage2D(n.TEXTURE_2D,0,Ue,ye,De,oe);v(E)&&h(ne),be.__version=Z.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function G(C,E,z){if(E.image.length!==6)return;const ne=Ye(C,E),re=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+z);const Z=i.get(re);if(re.version!==Z.__version||ne===!0){t.activeTexture(n.TEXTURE0+z);const be=Je.getPrimaries(Je.workingColorSpace),fe=E.colorSpace===Zi?null:Je.getPrimaries(E.colorSpace),xe=E.colorSpace===Zi||be===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ze=E.isCompressedTexture||E.image[0].isCompressedTexture,oe=E.image[0]&&E.image[0].isDataTexture,ye=[];for(let ie=0;ie<6;ie++)!Ze&&!oe?ye[ie]=_(E.image[ie],!0,r.maxCubemapSize):ye[ie]=oe?E.image[ie].image:E.image[ie],ye[ie]=ut(E,ye[ie]);const De=ye[0],Ue=s.convert(E.format,E.colorSpace),Se=s.convert(E.type),Ke=x(E.internalFormat,Ue,Se,E.colorSpace),He=E.isVideoTexture!==!0,at=Z.__version===void 0||ne===!0,U=re.dataReady;let de=R(E,De);Ee(n.TEXTURE_CUBE_MAP,E);let j;if(Ze){He&&at&&t.texStorage2D(n.TEXTURE_CUBE_MAP,de,Ke,De.width,De.height);for(let ie=0;ie<6;ie++){j=ye[ie].mipmaps;for(let ge=0;ge<j.length;ge++){const pe=j[ge];E.format!==qn?Ue!==null?He?U&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge,0,0,pe.width,pe.height,Ue,pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge,Ke,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge,0,0,pe.width,pe.height,Ue,Se,pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge,Ke,pe.width,pe.height,0,Ue,Se,pe.data)}}}else{if(j=E.mipmaps,He&&at){j.length>0&&de++;const ie=Ne(ye[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,de,Ke,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(oe){He?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,ye[ie].width,ye[ie].height,Ue,Se,ye[ie].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ke,ye[ie].width,ye[ie].height,0,Ue,Se,ye[ie].data);for(let ge=0;ge<j.length;ge++){const ke=j[ge].image[ie].image;He?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge+1,0,0,ke.width,ke.height,Ue,Se,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge+1,Ke,ke.width,ke.height,0,Ue,Se,ke.data)}}else{He?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ue,Se,ye[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ke,Ue,Se,ye[ie]);for(let ge=0;ge<j.length;ge++){const pe=j[ge];He?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge+1,0,0,Ue,Se,pe.image[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ge+1,Ke,Ue,Se,pe.image[ie])}}}v(E)&&h(n.TEXTURE_CUBE_MAP),Z.__version=re.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function ee(C,E,z,ne,re,Z){const be=s.convert(z.format,z.colorSpace),fe=s.convert(z.type),xe=x(z.internalFormat,be,fe,z.colorSpace),Ze=i.get(E),oe=i.get(z);if(oe.__renderTarget=E,!Ze.__hasExternalTextures){const ye=Math.max(1,E.width>>Z),De=Math.max(1,E.height>>Z);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,Z,xe,ye,De,E.depth,0,be,fe,null):t.texImage2D(re,Z,xe,ye,De,0,be,fe,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),qe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,re,oe.__webglTexture,0,$e(E)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,re,oe.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function K(C,E,z){if(n.bindRenderbuffer(n.RENDERBUFFER,C),E.depthBuffer){const ne=E.depthTexture,re=ne&&ne.isDepthTexture?ne.type:null,Z=y(E.stencilBuffer,re),be=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=$e(E);qe(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,fe,Z,E.width,E.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,Z,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Z,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,C)}else{const ne=E.textures;for(let re=0;re<ne.length;re++){const Z=ne[re],be=s.convert(Z.format,Z.colorSpace),fe=s.convert(Z.type),xe=x(Z.internalFormat,be,fe,Z.colorSpace),Ze=$e(E);z&&qe(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ze,xe,E.width,E.height):qe(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ze,xe,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,xe,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ce(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=i.get(E.depthTexture);ne.__renderTarget=E,(!ne.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),J(E.depthTexture,0);const re=ne.__webglTexture,Z=$e(E);if(E.depthTexture.format===Ns)qe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0);else if(E.depthTexture.format===Xs)qe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function ue(C){const E=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const ne=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ne){const re=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ne.removeEventListener("dispose",re)};ne.addEventListener("dispose",re),E.__depthDisposeCallback=re}E.__boundDepthTexture=ne}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ce(E.__webglFramebuffer,C)}else if(z){E.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[ne]),E.__webglDepthbuffer[ne]===void 0)E.__webglDepthbuffer[ne]=n.createRenderbuffer(),K(E.__webglDepthbuffer[ne],C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[ne];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),K(E.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,re)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function _e(C,E,z){const ne=i.get(C);E!==void 0&&ee(ne.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&ue(C)}function Oe(C){const E=C.texture,z=i.get(C),ne=i.get(E);C.addEventListener("dispose",A);const re=C.textures,Z=C.isWebGLCubeRenderTarget===!0,be=re.length>1;if(be||(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=E.version,o.memory.textures++),Z){z.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer[fe]=[];for(let xe=0;xe<E.mipmaps.length;xe++)z.__webglFramebuffer[fe][xe]=n.createFramebuffer()}else z.__webglFramebuffer[fe]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){z.__webglFramebuffer=[];for(let fe=0;fe<E.mipmaps.length;fe++)z.__webglFramebuffer[fe]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(be)for(let fe=0,xe=re.length;fe<xe;fe++){const Ze=i.get(re[fe]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&qe(C)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let fe=0;fe<re.length;fe++){const xe=re[fe];z.__webglColorRenderbuffer[fe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[fe]);const Ze=s.convert(xe.format,xe.colorSpace),oe=s.convert(xe.type),ye=x(xe.internalFormat,Ze,oe,xe.colorSpace,C.isXRRenderTarget===!0),De=$e(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,ye,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,z.__webglColorRenderbuffer[fe])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),K(z.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),Ee(n.TEXTURE_CUBE_MAP,E);for(let fe=0;fe<6;fe++)if(E.mipmaps&&E.mipmaps.length>0)for(let xe=0;xe<E.mipmaps.length;xe++)ee(z.__webglFramebuffer[fe][xe],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,xe);else ee(z.__webglFramebuffer[fe],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);v(E)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let fe=0,xe=re.length;fe<xe;fe++){const Ze=re[fe],oe=i.get(Ze);t.bindTexture(n.TEXTURE_2D,oe.__webglTexture),Ee(n.TEXTURE_2D,Ze),ee(z.__webglFramebuffer,C,Ze,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,0),v(Ze)&&h(n.TEXTURE_2D)}t.unbindTexture()}else{let fe=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(fe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),Ee(fe,E),E.mipmaps&&E.mipmaps.length>0)for(let xe=0;xe<E.mipmaps.length;xe++)ee(z.__webglFramebuffer[xe],C,E,n.COLOR_ATTACHMENT0,fe,xe);else ee(z.__webglFramebuffer,C,E,n.COLOR_ATTACHMENT0,fe,0);v(E)&&h(fe),t.unbindTexture()}C.depthBuffer&&ue(C)}function Le(C){const E=C.textures;for(let z=0,ne=E.length;z<ne;z++){const re=E[z];if(v(re)){const Z=g(C),be=i.get(re).__webglTexture;t.bindTexture(Z,be),h(Z),t.unbindTexture()}}}const We=[],D=[];function Rt(C){if(C.samples>0){if(qe(C)===!1){const E=C.textures,z=C.width,ne=C.height;let re=n.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(C),fe=E.length>1;if(fe)for(let xe=0;xe<E.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let xe=0;xe<E.length;xe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),fe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[xe]);const Ze=i.get(E[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ze,0)}n.blitFramebuffer(0,0,z,ne,0,0,z,ne,re,n.NEAREST),l===!0&&(We.length=0,D.length=0,We.push(n.COLOR_ATTACHMENT0+xe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(We.push(Z),D.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,We))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),fe)for(let xe=0;xe<E.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,be.__webglColorRenderbuffer[xe]);const Ze=i.get(E[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,Ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const E=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function $e(C){return Math.min(r.maxSamples,C.samples)}function qe(C){const E=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ie(C){const E=o.render.frame;u.get(C)!==E&&(u.set(C,E),C.update())}function ut(C,E){const z=C.colorSpace,ne=C.format,re=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Zs&&z!==Zi&&(Je.getTransfer(z)===st?(ne!==qn||re!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),E}function Ne(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=I,this.rebindTextures=_e,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=qe}function OT(n,e){function t(i,r=Zi){let s;const o=Je.getTransfer(r);if(i===Di)return n.UNSIGNED_BYTE;if(i===cf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===uf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mv)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yv)return n.BYTE;if(i===Sv)return n.SHORT;if(i===aa)return n.UNSIGNED_SHORT;if(i===lf)return n.INT;if(i===Vr)return n.UNSIGNED_INT;if(i===Ti)return n.FLOAT;if(i===pa)return n.HALF_FLOAT;if(i===Ev)return n.ALPHA;if(i===wv)return n.RGB;if(i===qn)return n.RGBA;if(i===Tv)return n.LUMINANCE;if(i===Av)return n.LUMINANCE_ALPHA;if(i===Ns)return n.DEPTH_COMPONENT;if(i===Xs)return n.DEPTH_STENCIL;if(i===bv)return n.RED;if(i===hf)return n.RED_INTEGER;if(i===Cv)return n.RG;if(i===df)return n.RG_INTEGER;if(i===ff)return n.RGBA_INTEGER;if(i===xl||i===yl||i===Sl||i===Ml)if(o===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===xl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ml)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===xl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ml)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zh||i===Bh||i===Hh||i===Vh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===zh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Bh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Hh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Vh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Gh||i===Wh||i===jh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Gh||i===Wh)return o===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===jh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Xh||i===Yh||i===$h||i===qh||i===Kh||i===Zh||i===Jh||i===Qh||i===ed||i===td||i===nd||i===id||i===rd||i===sd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Xh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Yh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$h)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Kh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Qh)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ed)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===td)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===nd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===id)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===El||i===od||i===ad)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===El)return o===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===od)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ad)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rv||i===ld||i===cd||i===ud)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===El)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ld)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===cd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ud)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===js?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class kT extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class gt extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zT={type:"move"};class Mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const v=t.getJointPose(_,i),h=this._getHandJoint(c,_);v!==null&&(h.matrix.fromArray(v.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=v.radius),h.visible=v!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new gt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const BT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,HT=`
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

}`;class VT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new ln,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ui({vertexShader:BT,fragmentShader:HT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Re(new wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class GT extends Js{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,m=null;const _=new VT,v=t.getContextAttributes();let h=null,g=null;const x=[],y=[],R=new Pe;let b=null;const A=new En;A.viewport=new ot;const P=new En;P.viewport=new ot;const T=[A,P],M=new kT;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let G=x[Y];return G===void 0&&(G=new Mu,x[Y]=G),G.getTargetRaySpace()},this.getControllerGrip=function(Y){let G=x[Y];return G===void 0&&(G=new Mu,x[Y]=G),G.getGripSpace()},this.getHand=function(Y){let G=x[Y];return G===void 0&&(G=new Mu,x[Y]=G),G.getHandSpace()};function k(Y){const G=y.indexOf(Y.inputSource);if(G===-1)return;const ee=x[G];ee!==void 0&&(ee.update(Y.inputSource,Y.frame,c||o),ee.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",J);for(let Y=0;Y<x.length;Y++){const G=y[Y];G!==null&&(y[Y]=null,x[Y].disconnect(G))}N=null,B=null,_.reset(),e.setRenderTarget(h),p=null,d=null,f=null,r=null,g=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",X),r.addEventListener("inputsourceschange",J),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const G={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),g=new Gr(p.framebufferWidth,p.framebufferHeight,{format:qn,type:Di,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let G=null,ee=null,K=null;v.depth&&(K=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=v.stencil?Xs:Ns,ee=v.stencil?js:Vr);const ce={colorFormat:t.RGBA8,depthFormat:K,scaleFactor:s};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(ce),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),g=new Gr(d.textureWidth,d.textureHeight,{format:qn,type:Di,depthTexture:new jv(d.textureWidth,d.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function J(Y){for(let G=0;G<Y.removed.length;G++){const ee=Y.removed[G],K=y.indexOf(ee);K>=0&&(y[K]=null,x[K].disconnect(ee))}for(let G=0;G<Y.added.length;G++){const ee=Y.added[G];let K=y.indexOf(ee);if(K===-1){for(let ue=0;ue<x.length;ue++)if(ue>=y.length){y.push(ee),K=ue;break}else if(y[ue]===null){y[ue]=ee,K=ue;break}if(K===-1)break}const ce=x[K];ce&&ce.connect(ee)}}const W=new L,Q=new L;function I(Y,G,ee){W.setFromMatrixPosition(G.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);const K=W.distanceTo(Q),ce=G.projectionMatrix.elements,ue=ee.projectionMatrix.elements,_e=ce[14]/(ce[10]-1),Oe=ce[14]/(ce[10]+1),Le=(ce[9]+1)/ce[5],We=(ce[9]-1)/ce[5],D=(ce[8]-1)/ce[0],Rt=(ue[8]+1)/ue[0],$e=_e*D,qe=_e*Rt,Ie=K/(-D+Rt),ut=Ie*-D;if(G.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ut),Y.translateZ(Ie),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ce[10]===-1)Y.projectionMatrix.copy(G.projectionMatrix),Y.projectionMatrixInverse.copy(G.projectionMatrixInverse);else{const Ne=_e+Ie,C=Oe+Ie,E=$e-ut,z=qe+(K-ut),ne=Le*Oe/C*Ne,re=We*Oe/C*Ne;Y.projectionMatrix.makePerspective(E,z,ne,re,Ne,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function $(Y,G){G===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(G.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let G=Y.near,ee=Y.far;_.texture!==null&&(_.depthNear>0&&(G=_.depthNear),_.depthFar>0&&(ee=_.depthFar)),M.near=P.near=A.near=G,M.far=P.far=A.far=ee,(N!==M.near||B!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),N=M.near,B=M.far),A.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;const K=Y.parent,ce=M.cameras;$(M,K);for(let ue=0;ue<ce.length;ue++)$(ce[ue],K);ce.length===2?I(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),te(Y,M,K)};function te(Y,G,ee){ee===null?Y.matrix.copy(G.matrixWorld):(Y.matrix.copy(ee.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(G.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(G.projectionMatrix),Y.projectionMatrixInverse.copy(G.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=la*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let le=null;function Ee(Y,G){if(u=G.getViewerPose(c||o),m=G,u!==null){const ee=u.views;p!==null&&(e.setRenderTargetFramebuffer(g,p.framebuffer),e.setRenderTarget(g));let K=!1;ee.length!==M.cameras.length&&(M.cameras.length=0,K=!0);for(let ue=0;ue<ee.length;ue++){const _e=ee[ue];let Oe=null;if(p!==null)Oe=p.getViewport(_e);else{const We=f.getViewSubImage(d,_e);Oe=We.viewport,ue===0&&(e.setRenderTargetTextures(g,We.colorTexture,d.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(g))}let Le=T[ue];Le===void 0&&(Le=new En,Le.layers.enable(ue),Le.viewport=new ot,T[ue]=Le),Le.matrix.fromArray(_e.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(_e.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),ue===0&&(M.matrix.copy(Le.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),K===!0&&M.cameras.push(Le)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")){const ue=f.getDepthInformation(ee[0]);ue&&ue.isValid&&ue.texture&&_.init(e,ue,r.renderState)}}for(let ee=0;ee<x.length;ee++){const K=y[ee],ce=x[ee];K!==null&&ce!==void 0&&ce.update(K,G,c||o)}le&&le(Y,G),G.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:G}),m=null}const Ye=new Gv;Ye.setAnimationLoop(Ee),this.setAnimationLoop=function(Y){le=Y},this.dispose=function(){}}}const Sr=new hi,WT=new mt;function jT(n,e){function t(v,h){v.matrixAutoUpdate===!0&&v.updateMatrix(),h.value.copy(v.matrix)}function i(v,h){h.color.getRGB(v.fogColor.value,Bv(n)),h.isFog?(v.fogNear.value=h.near,v.fogFar.value=h.far):h.isFogExp2&&(v.fogDensity.value=h.density)}function r(v,h,g,x,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(v,h):h.isMeshToonMaterial?(s(v,h),f(v,h)):h.isMeshPhongMaterial?(s(v,h),u(v,h)):h.isMeshStandardMaterial?(s(v,h),d(v,h),h.isMeshPhysicalMaterial&&p(v,h,y)):h.isMeshMatcapMaterial?(s(v,h),m(v,h)):h.isMeshDepthMaterial?s(v,h):h.isMeshDistanceMaterial?(s(v,h),_(v,h)):h.isMeshNormalMaterial?s(v,h):h.isLineBasicMaterial?(o(v,h),h.isLineDashedMaterial&&a(v,h)):h.isPointsMaterial?l(v,h,g,x):h.isSpriteMaterial?c(v,h):h.isShadowMaterial?(v.color.value.copy(h.color),v.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(v,h){v.opacity.value=h.opacity,h.color&&v.diffuse.value.copy(h.color),h.emissive&&v.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(v.map.value=h.map,t(h.map,v.mapTransform)),h.alphaMap&&(v.alphaMap.value=h.alphaMap,t(h.alphaMap,v.alphaMapTransform)),h.bumpMap&&(v.bumpMap.value=h.bumpMap,t(h.bumpMap,v.bumpMapTransform),v.bumpScale.value=h.bumpScale,h.side===an&&(v.bumpScale.value*=-1)),h.normalMap&&(v.normalMap.value=h.normalMap,t(h.normalMap,v.normalMapTransform),v.normalScale.value.copy(h.normalScale),h.side===an&&v.normalScale.value.negate()),h.displacementMap&&(v.displacementMap.value=h.displacementMap,t(h.displacementMap,v.displacementMapTransform),v.displacementScale.value=h.displacementScale,v.displacementBias.value=h.displacementBias),h.emissiveMap&&(v.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,v.emissiveMapTransform)),h.specularMap&&(v.specularMap.value=h.specularMap,t(h.specularMap,v.specularMapTransform)),h.alphaTest>0&&(v.alphaTest.value=h.alphaTest);const g=e.get(h),x=g.envMap,y=g.envMapRotation;x&&(v.envMap.value=x,Sr.copy(y),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),v.envMapRotation.value.setFromMatrix4(WT.makeRotationFromEuler(Sr)),v.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=h.reflectivity,v.ior.value=h.ior,v.refractionRatio.value=h.refractionRatio),h.lightMap&&(v.lightMap.value=h.lightMap,v.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,v.lightMapTransform)),h.aoMap&&(v.aoMap.value=h.aoMap,v.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,v.aoMapTransform))}function o(v,h){v.diffuse.value.copy(h.color),v.opacity.value=h.opacity,h.map&&(v.map.value=h.map,t(h.map,v.mapTransform))}function a(v,h){v.dashSize.value=h.dashSize,v.totalSize.value=h.dashSize+h.gapSize,v.scale.value=h.scale}function l(v,h,g,x){v.diffuse.value.copy(h.color),v.opacity.value=h.opacity,v.size.value=h.size*g,v.scale.value=x*.5,h.map&&(v.map.value=h.map,t(h.map,v.uvTransform)),h.alphaMap&&(v.alphaMap.value=h.alphaMap,t(h.alphaMap,v.alphaMapTransform)),h.alphaTest>0&&(v.alphaTest.value=h.alphaTest)}function c(v,h){v.diffuse.value.copy(h.color),v.opacity.value=h.opacity,v.rotation.value=h.rotation,h.map&&(v.map.value=h.map,t(h.map,v.mapTransform)),h.alphaMap&&(v.alphaMap.value=h.alphaMap,t(h.alphaMap,v.alphaMapTransform)),h.alphaTest>0&&(v.alphaTest.value=h.alphaTest)}function u(v,h){v.specular.value.copy(h.specular),v.shininess.value=Math.max(h.shininess,1e-4)}function f(v,h){h.gradientMap&&(v.gradientMap.value=h.gradientMap)}function d(v,h){v.metalness.value=h.metalness,h.metalnessMap&&(v.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,v.metalnessMapTransform)),v.roughness.value=h.roughness,h.roughnessMap&&(v.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,v.roughnessMapTransform)),h.envMap&&(v.envMapIntensity.value=h.envMapIntensity)}function p(v,h,g){v.ior.value=h.ior,h.sheen>0&&(v.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),v.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(v.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,v.sheenColorMapTransform)),h.sheenRoughnessMap&&(v.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,v.sheenRoughnessMapTransform))),h.clearcoat>0&&(v.clearcoat.value=h.clearcoat,v.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(v.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,v.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(v.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===an&&v.clearcoatNormalScale.value.negate())),h.dispersion>0&&(v.dispersion.value=h.dispersion),h.iridescence>0&&(v.iridescence.value=h.iridescence,v.iridescenceIOR.value=h.iridescenceIOR,v.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(v.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,v.iridescenceMapTransform)),h.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),h.transmission>0&&(v.transmission.value=h.transmission,v.transmissionSamplerMap.value=g.texture,v.transmissionSamplerSize.value.set(g.width,g.height),h.transmissionMap&&(v.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,v.transmissionMapTransform)),v.thickness.value=h.thickness,h.thicknessMap&&(v.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=h.attenuationDistance,v.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(v.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(v.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=h.specularIntensity,v.specularColor.value.copy(h.specularColor),h.specularColorMap&&(v.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,v.specularColorMapTransform)),h.specularIntensityMap&&(v.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,v.specularIntensityMapTransform))}function m(v,h){h.matcap&&(v.matcap.value=h.matcap)}function _(v,h){const g=e.get(h).light;v.referencePosition.value.setFromMatrixPosition(g.matrixWorld),v.nearDistance.value=g.shadow.camera.near,v.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function XT(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,x){const y=x.program;i.uniformBlockBinding(g,y)}function c(g,x){let y=r[g.id];y===void 0&&(m(g),y=u(g),r[g.id]=y,g.addEventListener("dispose",v));const R=x.program;i.updateUBOMapping(g,R);const b=e.render.frame;s[g.id]!==b&&(d(g),s[g.id]=b)}function u(g){const x=f();g.__bindingPointIndex=x;const y=n.createBuffer(),R=g.__size,b=g.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,R,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function f(){for(let g=0;g<a;g++)if(o.indexOf(g)===-1)return o.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(g){const x=r[g.id],y=g.uniforms,R=g.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let b=0,A=y.length;b<A;b++){const P=Array.isArray(y[b])?y[b]:[y[b]];for(let T=0,M=P.length;T<M;T++){const N=P[T];if(p(N,b,T,R)===!0){const B=N.__offset,k=Array.isArray(N.value)?N.value:[N.value];let X=0;for(let J=0;J<k.length;J++){const W=k[J],Q=_(W);typeof W=="number"||typeof W=="boolean"?(N.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,B+X,N.__data)):W.isMatrix3?(N.__data[0]=W.elements[0],N.__data[1]=W.elements[1],N.__data[2]=W.elements[2],N.__data[3]=0,N.__data[4]=W.elements[3],N.__data[5]=W.elements[4],N.__data[6]=W.elements[5],N.__data[7]=0,N.__data[8]=W.elements[6],N.__data[9]=W.elements[7],N.__data[10]=W.elements[8],N.__data[11]=0):(W.toArray(N.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(g,x,y,R){const b=g.value,A=x+"_"+y;if(R[A]===void 0)return typeof b=="number"||typeof b=="boolean"?R[A]=b:R[A]=b.clone(),!0;{const P=R[A];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return R[A]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function m(g){const x=g.uniforms;let y=0;const R=16;for(let A=0,P=x.length;A<P;A++){const T=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,N=T.length;M<N;M++){const B=T[M],k=Array.isArray(B.value)?B.value:[B.value];for(let X=0,J=k.length;X<J;X++){const W=k[X],Q=_(W),I=y%R,$=I%Q.boundary,te=I+$;y+=$,te!==0&&R-te<Q.storage&&(y+=R-te),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=Q.storage}}}const b=y%R;return b>0&&(y+=R-b),g.__size=y,g.__cache={},this}function _(g){const x={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(x.boundary=4,x.storage=4):g.isVector2?(x.boundary=8,x.storage=8):g.isVector3||g.isColor?(x.boundary=16,x.storage=12):g.isVector4?(x.boundary=16,x.storage=16):g.isMatrix3?(x.boundary=48,x.storage=48):g.isMatrix4?(x.boundary=64,x.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),x}function v(g){const x=g.target;x.removeEventListener("dispose",v);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const g in r)n.deleteBuffer(r[g]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class YT{constructor(e={}){const{canvas:t=US(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const m=new Uint32Array(4),_=new Int32Array(4);let v=null,h=null;const g=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=It,this.toneMapping=cr,this.toneMappingExposure=1;const y=this;let R=!1,b=0,A=0,P=null,T=-1,M=null;const N=new ot,B=new ot;let k=null;const X=new Ge(0);let J=0,W=t.width,Q=t.height,I=1,$=null,te=null;const le=new ot(0,0,W,Q),Ee=new ot(0,0,W,Q);let Ye=!1;const Y=new mf;let G=!1,ee=!1;const K=new mt,ce=new mt,ue=new L,_e=new ot,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function We(){return P===null?I:1}let D=i;function Rt(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${af}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",pe,!1),D===null){const F="webgl2";if(D=Rt(F,w),D===null)throw Rt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let $e,qe,Ie,ut,Ne,C,E,z,ne,re,Z,be,fe,xe,Ze,oe,ye,De,Ue,Se,Ke,He,at,U;function de(){$e=new JE(D),$e.init(),He=new OT(D,$e),qe=new XE(D,$e,e,He),Ie=new DT(D,$e),qe.reverseDepthBuffer&&d&&Ie.buffers.depth.setReversed(!0),ut=new tw(D),Ne=new xT,C=new FT(D,$e,Ie,Ne,qe,He,ut),E=new $E(y),z=new ZE(y),ne=new l1(D),at=new WE(D,ne),re=new QE(D,ne,ut,at),Z=new iw(D,re,ne,ut),Ue=new nw(D,qe,C),oe=new YE(Ne),be=new _T(y,E,z,$e,qe,at,oe),fe=new jT(y,Ne),xe=new ST,Ze=new bT($e),De=new GE(y,E,z,Ie,Z,p,l),ye=new NT(y,Z,qe),U=new XT(D,ut,qe,Ie),Se=new jE(D,$e,ut),Ke=new ew(D,$e,ut),ut.programs=be.programs,y.capabilities=qe,y.extensions=$e,y.properties=Ne,y.renderLists=xe,y.shadowMap=ye,y.state=Ie,y.info=ut}de();const j=new GT(y,D);this.xr=j,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=$e.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=$e.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(w){w!==void 0&&(I=w,this.setSize(W,Q,!1))},this.getSize=function(w){return w.set(W,Q)},this.setSize=function(w,F,H=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=w,Q=F,t.width=Math.floor(w*I),t.height=Math.floor(F*I),H===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(W*I,Q*I).floor()},this.setDrawingBufferSize=function(w,F,H){W=w,Q=F,I=H,t.width=Math.floor(w*H),t.height=Math.floor(F*H),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(N)},this.getViewport=function(w){return w.copy(le)},this.setViewport=function(w,F,H,V){w.isVector4?le.set(w.x,w.y,w.z,w.w):le.set(w,F,H,V),Ie.viewport(N.copy(le).multiplyScalar(I).round())},this.getScissor=function(w){return w.copy(Ee)},this.setScissor=function(w,F,H,V){w.isVector4?Ee.set(w.x,w.y,w.z,w.w):Ee.set(w,F,H,V),Ie.scissor(B.copy(Ee).multiplyScalar(I).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(w){Ie.setScissorTest(Ye=w)},this.setOpaqueSort=function(w){$=w},this.setTransparentSort=function(w){te=w},this.getClearColor=function(w){return w.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(w=!0,F=!0,H=!0){let V=0;if(w){let O=!1;if(P!==null){const ae=P.texture.format;O=ae===ff||ae===df||ae===hf}if(O){const ae=P.texture.type,me=ae===Di||ae===Vr||ae===aa||ae===js||ae===cf||ae===uf,we=De.getClearColor(),Te=De.getClearAlpha(),Fe=we.r,ze=we.g,Ae=we.b;me?(m[0]=Fe,m[1]=ze,m[2]=Ae,m[3]=Te,D.clearBufferuiv(D.COLOR,0,m)):(_[0]=Fe,_[1]=ze,_[2]=Ae,_[3]=Te,D.clearBufferiv(D.COLOR,0,_))}else V|=D.COLOR_BUFFER_BIT}F&&(V|=D.DEPTH_BUFFER_BIT),H&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),xe.dispose(),Ze.dispose(),Ne.dispose(),E.dispose(),z.dispose(),Z.dispose(),at.dispose(),U.dispose(),be.dispose(),j.dispose(),j.removeEventListener("sessionstart",Ef),j.removeEventListener("sessionend",wf),mr.stop()};function ie(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=ut.autoReset,F=ye.enabled,H=ye.autoUpdate,V=ye.needsUpdate,O=ye.type;de(),ut.autoReset=w,ye.enabled=F,ye.autoUpdate=H,ye.needsUpdate=V,ye.type=O}function pe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ke(w){const F=w.target;F.removeEventListener("dispose",ke),wt(F)}function wt(w){Yt(w),Ne.remove(w)}function Yt(w){const F=Ne.get(w).programs;F!==void 0&&(F.forEach(function(H){be.releaseProgram(H)}),w.isShaderMaterial&&be.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,H,V,O,ae){F===null&&(F=Oe);const me=O.isMesh&&O.matrixWorld.determinant()<0,we=i_(w,F,H,V,O);Ie.setMaterial(V,me);let Te=H.index,Fe=1;if(V.wireframe===!0){if(Te=re.getWireframeAttribute(H),Te===void 0)return;Fe=2}const ze=H.drawRange,Ae=H.attributes.position;let et=ze.start*Fe,lt=(ze.start+ze.count)*Fe;ae!==null&&(et=Math.max(et,ae.start*Fe),lt=Math.min(lt,(ae.start+ae.count)*Fe)),Te!==null?(et=Math.max(et,0),lt=Math.min(lt,Te.count)):Ae!=null&&(et=Math.max(et,0),lt=Math.min(lt,Ae.count));const ht=lt-et;if(ht<0||ht===1/0)return;at.setup(O,V,we,H,Te);let dn,tt=Se;if(Te!==null&&(dn=ne.get(Te),tt=Ke,tt.setIndex(dn)),O.isMesh)V.wireframe===!0?(Ie.setLineWidth(V.wireframeLinewidth*We()),tt.setMode(D.LINES)):tt.setMode(D.TRIANGLES);else if(O.isLine){let Ce=V.linewidth;Ce===void 0&&(Ce=1),Ie.setLineWidth(Ce*We()),O.isLineSegments?tt.setMode(D.LINES):O.isLineLoop?tt.setMode(D.LINE_LOOP):tt.setMode(D.LINE_STRIP)}else O.isPoints?tt.setMode(D.POINTS):O.isSprite&&tt.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)tt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))tt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ce=O._multiDrawStarts,fi=O._multiDrawCounts,nt=O._multiDrawCount,Bn=Te?ne.get(Te).bytesPerElement:1,Xr=Ne.get(V).currentProgram.getUniforms();for(let xn=0;xn<nt;xn++)Xr.setValue(D,"_gl_DrawID",xn),tt.render(Ce[xn]/Bn,fi[xn])}else if(O.isInstancedMesh)tt.renderInstances(et,ht,O.count);else if(H.isInstancedBufferGeometry){const Ce=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,fi=Math.min(H.instanceCount,Ce);tt.renderInstances(et,ht,fi)}else tt.render(et,ht)};function it(w,F,H){w.transparent===!0&&w.side===Dn&&w.forceSinglePass===!1?(w.side=an,w.needsUpdate=!0,xa(w,F,H),w.side=Ii,w.needsUpdate=!0,xa(w,F,H),w.side=Dn):xa(w,F,H)}this.compile=function(w,F,H=null){H===null&&(H=w),h=Ze.get(H),h.init(F),x.push(h),H.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),w!==H&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),h.setupLights();const V=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ae=O.material;if(ae)if(Array.isArray(ae))for(let me=0;me<ae.length;me++){const we=ae[me];it(we,H,O),V.add(we)}else it(ae,H,O),V.add(ae)}),x.pop(),h=null,V},this.compileAsync=function(w,F,H=null){const V=this.compile(w,F,H);return new Promise(O=>{function ae(){if(V.forEach(function(me){Ne.get(me).currentProgram.isReady()&&V.delete(me)}),V.size===0){O(w);return}setTimeout(ae,10)}$e.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let zn=null;function di(w){zn&&zn(w)}function Ef(){mr.stop()}function wf(){mr.start()}const mr=new Gv;mr.setAnimationLoop(di),typeof self<"u"&&mr.setContext(self),this.setAnimationLoop=function(w){zn=w,j.setAnimationLoop(w),w===null?mr.stop():mr.start()},j.addEventListener("sessionstart",Ef),j.addEventListener("sessionend",wf),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(F),F=j.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,F,P),h=Ze.get(w,x.length),h.init(F),x.push(h),ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(ce),ee=this.localClippingEnabled,G=oe.init(this.clippingPlanes,ee),v=xe.get(w,g.length),v.init(),g.push(v),j.enabled===!0&&j.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&Mc(ae,F,-1/0,y.sortObjects)}Mc(w,F,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort($,te),Le=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Le&&De.addToRenderList(v,w),this.info.render.frame++,G===!0&&oe.beginShadows();const H=h.state.shadowsArray;ye.render(H,w,F),G===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=v.opaque,O=v.transmissive;if(h.setupLights(),F.isArrayCamera){const ae=F.cameras;if(O.length>0)for(let me=0,we=ae.length;me<we;me++){const Te=ae[me];Af(V,O,w,Te)}Le&&De.render(w);for(let me=0,we=ae.length;me<we;me++){const Te=ae[me];Tf(v,w,Te,Te.viewport)}}else O.length>0&&Af(V,O,w,F),Le&&De.render(w),Tf(v,w,F);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(y,w,F),at.resetDefaultState(),T=-1,M=null,x.pop(),x.length>0?(h=x[x.length-1],G===!0&&oe.setGlobalState(y.clippingPlanes,h.state.camera)):h=null,g.pop(),g.length>0?v=g[g.length-1]:v=null};function Mc(w,F,H,V){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)h.pushLight(w),w.castShadow&&h.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Y.intersectsSprite(w)){V&&_e.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ce);const me=Z.update(w),we=w.material;we.visible&&v.push(w,me,we,H,_e.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Y.intersectsObject(w))){const me=Z.update(w),we=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),_e.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),_e.copy(me.boundingSphere.center)),_e.applyMatrix4(w.matrixWorld).applyMatrix4(ce)),Array.isArray(we)){const Te=me.groups;for(let Fe=0,ze=Te.length;Fe<ze;Fe++){const Ae=Te[Fe],et=we[Ae.materialIndex];et&&et.visible&&v.push(w,me,et,H,_e.z,Ae)}}else we.visible&&v.push(w,me,we,H,_e.z,null)}}const ae=w.children;for(let me=0,we=ae.length;me<we;me++)Mc(ae[me],F,H,V)}function Tf(w,F,H,V){const O=w.opaque,ae=w.transmissive,me=w.transparent;h.setupLightsView(H),G===!0&&oe.setGlobalState(y.clippingPlanes,H),V&&Ie.viewport(N.copy(V)),O.length>0&&_a(O,F,H),ae.length>0&&_a(ae,F,H),me.length>0&&_a(me,F,H),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Af(w,F,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[V.id]===void 0&&(h.state.transmissionRenderTarget[V.id]=new Gr(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?pa:Di,minFilter:Ir,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const ae=h.state.transmissionRenderTarget[V.id],me=V.viewport||N;ae.setSize(me.z,me.w);const we=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(X),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),Le&&De.render(H);const Te=y.toneMapping;y.toneMapping=cr;const Fe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),h.setupLightsView(V),G===!0&&oe.setGlobalState(y.clippingPlanes,V),_a(w,H,V),C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae),$e.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let Ae=0,et=F.length;Ae<et;Ae++){const lt=F[Ae],ht=lt.object,dn=lt.geometry,tt=lt.material,Ce=lt.group;if(tt.side===Dn&&ht.layers.test(V.layers)){const fi=tt.side;tt.side=an,tt.needsUpdate=!0,bf(ht,H,V,dn,tt,Ce),tt.side=fi,tt.needsUpdate=!0,ze=!0}}ze===!0&&(C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae))}y.setRenderTarget(we),y.setClearColor(X,J),Fe!==void 0&&(V.viewport=Fe),y.toneMapping=Te}function _a(w,F,H){const V=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ae=w.length;O<ae;O++){const me=w[O],we=me.object,Te=me.geometry,Fe=V===null?me.material:V,ze=me.group;we.layers.test(H.layers)&&bf(we,F,H,Te,Fe,ze)}}function bf(w,F,H,V,O,ae){w.onBeforeRender(y,F,H,V,O,ae),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(y,F,H,V,w,ae),O.transparent===!0&&O.side===Dn&&O.forceSinglePass===!1?(O.side=an,O.needsUpdate=!0,y.renderBufferDirect(H,F,V,O,w,ae),O.side=Ii,O.needsUpdate=!0,y.renderBufferDirect(H,F,V,O,w,ae),O.side=Dn):y.renderBufferDirect(H,F,V,O,w,ae),w.onAfterRender(y,F,H,V,O,ae)}function xa(w,F,H){F.isScene!==!0&&(F=Oe);const V=Ne.get(w),O=h.state.lights,ae=h.state.shadowsArray,me=O.state.version,we=be.getParameters(w,O.state,ae,F,H),Te=be.getProgramCacheKey(we);let Fe=V.programs;V.environment=w.isMeshStandardMaterial?F.environment:null,V.fog=F.fog,V.envMap=(w.isMeshStandardMaterial?z:E).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Fe===void 0&&(w.addEventListener("dispose",ke),Fe=new Map,V.programs=Fe);let ze=Fe.get(Te);if(ze!==void 0){if(V.currentProgram===ze&&V.lightsStateVersion===me)return Rf(w,we),ze}else we.uniforms=be.getUniforms(w),w.onBeforeCompile(we,y),ze=be.acquireProgram(we,Te),Fe.set(Te,ze),V.uniforms=we.uniforms;const Ae=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ae.clippingPlanes=oe.uniform),Rf(w,we),V.needsLights=s_(w),V.lightsStateVersion=me,V.needsLights&&(Ae.ambientLightColor.value=O.state.ambient,Ae.lightProbe.value=O.state.probe,Ae.directionalLights.value=O.state.directional,Ae.directionalLightShadows.value=O.state.directionalShadow,Ae.spotLights.value=O.state.spot,Ae.spotLightShadows.value=O.state.spotShadow,Ae.rectAreaLights.value=O.state.rectArea,Ae.ltc_1.value=O.state.rectAreaLTC1,Ae.ltc_2.value=O.state.rectAreaLTC2,Ae.pointLights.value=O.state.point,Ae.pointLightShadows.value=O.state.pointShadow,Ae.hemisphereLights.value=O.state.hemi,Ae.directionalShadowMap.value=O.state.directionalShadowMap,Ae.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ae.spotShadowMap.value=O.state.spotShadowMap,Ae.spotLightMatrix.value=O.state.spotLightMatrix,Ae.spotLightMap.value=O.state.spotLightMap,Ae.pointShadowMap.value=O.state.pointShadowMap,Ae.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=ze,V.uniformsList=null,ze}function Cf(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=wl.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Rf(w,F){const H=Ne.get(w);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function i_(w,F,H,V,O){F.isScene!==!0&&(F=Oe),C.resetTextureUnits();const ae=F.fog,me=V.isMeshStandardMaterial?F.environment:null,we=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Zs,Te=(V.isMeshStandardMaterial?z:E).get(V.envMap||me),Fe=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ze=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ae=!!H.morphAttributes.position,et=!!H.morphAttributes.normal,lt=!!H.morphAttributes.color;let ht=cr;V.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ht=y.toneMapping);const dn=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,tt=dn!==void 0?dn.length:0,Ce=Ne.get(V),fi=h.state.lights;if(G===!0&&(ee===!0||w!==M)){const Pn=w===M&&V.id===T;oe.setState(V,w,Pn)}let nt=!1;V.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==fi.state.version||Ce.outputColorSpace!==we||O.isBatchedMesh&&Ce.batching===!1||!O.isBatchedMesh&&Ce.batching===!0||O.isBatchedMesh&&Ce.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ce.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ce.instancing===!1||!O.isInstancedMesh&&Ce.instancing===!0||O.isSkinnedMesh&&Ce.skinning===!1||!O.isSkinnedMesh&&Ce.skinning===!0||O.isInstancedMesh&&Ce.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ce.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ce.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ce.instancingMorph===!1&&O.morphTexture!==null||Ce.envMap!==Te||V.fog===!0&&Ce.fog!==ae||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==oe.numPlanes||Ce.numIntersection!==oe.numIntersection)||Ce.vertexAlphas!==Fe||Ce.vertexTangents!==ze||Ce.morphTargets!==Ae||Ce.morphNormals!==et||Ce.morphColors!==lt||Ce.toneMapping!==ht||Ce.morphTargetsCount!==tt)&&(nt=!0):(nt=!0,Ce.__version=V.version);let Bn=Ce.currentProgram;nt===!0&&(Bn=xa(V,F,O));let Xr=!1,xn=!1,ro=!1;const dt=Bn.getUniforms(),ii=Ce.uniforms;if(Ie.useProgram(Bn.program)&&(Xr=!0,xn=!0,ro=!0),V.id!==T&&(T=V.id,xn=!0),Xr||M!==w){Ie.buffers.depth.getReversed()?(K.copy(w.projectionMatrix),OS(K),kS(K),dt.setValue(D,"projectionMatrix",K)):dt.setValue(D,"projectionMatrix",w.projectionMatrix),dt.setValue(D,"viewMatrix",w.matrixWorldInverse);const ki=dt.map.cameraPosition;ki!==void 0&&ki.setValue(D,ue.setFromMatrixPosition(w.matrixWorld)),qe.logarithmicDepthBuffer&&dt.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&dt.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,xn=!0,ro=!0)}if(O.isSkinnedMesh){dt.setOptional(D,O,"bindMatrix"),dt.setOptional(D,O,"bindMatrixInverse");const Pn=O.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),dt.setValue(D,"boneTexture",Pn.boneTexture,C))}O.isBatchedMesh&&(dt.setOptional(D,O,"batchingTexture"),dt.setValue(D,"batchingTexture",O._matricesTexture,C),dt.setOptional(D,O,"batchingIdTexture"),dt.setValue(D,"batchingIdTexture",O._indirectTexture,C),dt.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&dt.setValue(D,"batchingColorTexture",O._colorsTexture,C));const so=H.morphAttributes;if((so.position!==void 0||so.normal!==void 0||so.color!==void 0)&&Ue.update(O,H,Bn),(xn||Ce.receiveShadow!==O.receiveShadow)&&(Ce.receiveShadow=O.receiveShadow,dt.setValue(D,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(ii.envMap.value=Te,ii.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&F.environment!==null&&(ii.envMapIntensity.value=F.environmentIntensity),xn&&(dt.setValue(D,"toneMappingExposure",y.toneMappingExposure),Ce.needsLights&&r_(ii,ro),ae&&V.fog===!0&&fe.refreshFogUniforms(ii,ae),fe.refreshMaterialUniforms(ii,V,I,Q,h.state.transmissionRenderTarget[w.id]),wl.upload(D,Cf(Ce),ii,C)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(wl.upload(D,Cf(Ce),ii,C),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&dt.setValue(D,"center",O.center),dt.setValue(D,"modelViewMatrix",O.modelViewMatrix),dt.setValue(D,"normalMatrix",O.normalMatrix),dt.setValue(D,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Pn=V.uniformsGroups;for(let ki=0,zi=Pn.length;ki<zi;ki++){const Pf=Pn[ki];U.update(Pf,Bn),U.bind(Pf,Bn)}}return Bn}function r_(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function s_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,F,H){Ne.get(w.texture).__webglTexture=F,Ne.get(w.depthTexture).__webglTexture=H;const V=Ne.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||$e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,F){const H=Ne.get(w);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,H=0){P=w,b=F,A=H;let V=!0,O=null,ae=!1,me=!1;if(w){const Te=Ne.get(w);if(Te.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(D.FRAMEBUFFER,null),V=!1;else if(Te.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(Te.__hasExternalTextures)C.rebindTextures(w,Ne.get(w.texture).__webglTexture,Ne.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ae=w.depthTexture;if(Te.__boundDepthTexture!==Ae){if(Ae!==null&&Ne.has(Ae)&&(w.width!==Ae.image.width||w.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}const Fe=w.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(me=!0);const ze=Ne.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ze[F])?O=ze[F][H]:O=ze[F],ae=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?O=Ne.get(w).__webglMultisampledFramebuffer:Array.isArray(ze)?O=ze[H]:O=ze,N.copy(w.viewport),B.copy(w.scissor),k=w.scissorTest}else N.copy(le).multiplyScalar(I).floor(),B.copy(Ee).multiplyScalar(I).floor(),k=Ye;if(Ie.bindFramebuffer(D.FRAMEBUFFER,O)&&V&&Ie.drawBuffers(w,O),Ie.viewport(N),Ie.scissor(B),Ie.setScissorTest(k),ae){const Te=Ne.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,Te.__webglTexture,H)}else if(me){const Te=Ne.get(w.texture),Fe=F||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.__webglTexture,H||0,Fe)}T=-1},this.readRenderTargetPixels=function(w,F,H,V,O,ae,me){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(we=we[me]),we){Ie.bindFramebuffer(D.FRAMEBUFFER,we);try{const Te=w.texture,Fe=Te.format,ze=Te.type;if(!qe.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-V&&H>=0&&H<=w.height-O&&D.readPixels(F,H,V,O,He.convert(Fe),He.convert(ze),ae)}finally{const Te=P!==null?Ne.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(D.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(w,F,H,V,O,ae,me){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Ne.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(we=we[me]),we){const Te=w.texture,Fe=Te.format,ze=Te.type;if(!qe.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=w.width-V&&H>=0&&H<=w.height-O){Ie.bindFramebuffer(D.FRAMEBUFFER,we);const Ae=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ae),D.bufferData(D.PIXEL_PACK_BUFFER,ae.byteLength,D.STREAM_READ),D.readPixels(F,H,V,O,He.convert(Fe),He.convert(ze),0);const et=P!==null?Ne.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(D.FRAMEBUFFER,et);const lt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await FS(D,lt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ae),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ae),D.deleteBuffer(Ae),D.deleteSync(lt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,F=null,H=0){w.isTexture!==!0&&(Ao("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,w=arguments[1]);const V=Math.pow(2,-H),O=Math.floor(w.image.width*V),ae=Math.floor(w.image.height*V),me=F!==null?F.x:0,we=F!==null?F.y:0;C.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,me,we,O,ae),Ie.unbindTexture()},this.copyTextureToTexture=function(w,F,H=null,V=null,O=0){w.isTexture!==!0&&(Ao("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],F=arguments[2],O=arguments[3]||0,H=null);let ae,me,we,Te,Fe,ze,Ae,et,lt;const ht=w.isCompressedTexture?w.mipmaps[O]:w.image;H!==null?(ae=H.max.x-H.min.x,me=H.max.y-H.min.y,we=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,Fe=H.min.y,ze=H.isBox3?H.min.z:0):(ae=ht.width,me=ht.height,we=ht.depth||1,Te=0,Fe=0,ze=0),V!==null?(Ae=V.x,et=V.y,lt=V.z):(Ae=0,et=0,lt=0);const dn=He.convert(F.format),tt=He.convert(F.type);let Ce;F.isData3DTexture?(C.setTexture3D(F,0),Ce=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(C.setTexture2DArray(F,0),Ce=D.TEXTURE_2D_ARRAY):(C.setTexture2D(F,0),Ce=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const fi=D.getParameter(D.UNPACK_ROW_LENGTH),nt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Bn=D.getParameter(D.UNPACK_SKIP_PIXELS),Xr=D.getParameter(D.UNPACK_SKIP_ROWS),xn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ht.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ht.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Te),D.pixelStorei(D.UNPACK_SKIP_ROWS,Fe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ze);const ro=w.isDataArrayTexture||w.isData3DTexture,dt=F.isDataArrayTexture||F.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const ii=Ne.get(w),so=Ne.get(F),Pn=Ne.get(ii.__renderTarget),ki=Ne.get(so.__renderTarget);Ie.bindFramebuffer(D.READ_FRAMEBUFFER,Pn.__webglFramebuffer),Ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let zi=0;zi<we;zi++)ro&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ne.get(w).__webglTexture,O,ze+zi),w.isDepthTexture?(dt&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ne.get(F).__webglTexture,O,lt+zi),D.blitFramebuffer(Te,Fe,ae,me,Ae,et,ae,me,D.DEPTH_BUFFER_BIT,D.NEAREST)):dt?D.copyTexSubImage3D(Ce,O,Ae,et,lt+zi,Te,Fe,ae,me):D.copyTexSubImage2D(Ce,O,Ae,et,lt+zi,Te,Fe,ae,me);Ie.bindFramebuffer(D.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else dt?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Ce,O,Ae,et,lt,ae,me,we,dn,tt,ht.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(Ce,O,Ae,et,lt,ae,me,we,dn,ht.data):D.texSubImage3D(Ce,O,Ae,et,lt,ae,me,we,dn,tt,ht):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,O,Ae,et,ae,me,dn,tt,ht.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,O,Ae,et,ht.width,ht.height,dn,ht.data):D.texSubImage2D(D.TEXTURE_2D,O,Ae,et,ae,me,dn,tt,ht);D.pixelStorei(D.UNPACK_ROW_LENGTH,fi),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,nt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Bn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Xr),D.pixelStorei(D.UNPACK_SKIP_IMAGES,xn),O===0&&F.generateMipmaps&&D.generateMipmap(Ce),Ie.unbindTexture()},this.copyTextureToTexture3D=function(w,F,H=null,V=null,O=0){return w.isTexture!==!0&&(Ao("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,w=arguments[2],F=arguments[3],O=arguments[4]||0),Ao('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,H,V,O)},this.initRenderTarget=function(w){Ne.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),Ie.unbindTexture()},this.resetState=function(){b=0,A=0,P=null,Ie.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}class vf{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ge(e),this.near=t,this.far=i}clone(){return new vf(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class $T extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Kv extends to{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Zl=new L,Jl=new L,km=new mt,xo=new Uv,rl=new xc,Eu=new L,zm=new L;class qT extends Ut{constructor(e=new hn,t=new Kv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Zl.fromBufferAttribute(t,r-1),Jl.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Zl.distanceTo(Jl);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),rl.copy(i.boundingSphere),rl.applyMatrix4(r),rl.radius+=s,e.ray.intersectsSphere(rl)===!1)return;km.copy(r).invert(),xo.copy(e.ray).applyMatrix4(km);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=p,v=m-1;_<v;_+=c){const h=u.getX(_),g=u.getX(_+1),x=sl(this,e,xo,l,h,g);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(m-1),v=u.getX(p),h=sl(this,e,xo,l,_,v);h&&t.push(h)}}else{const p=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=p,v=m-1;_<v;_+=c){const h=sl(this,e,xo,l,_,_+1);h&&t.push(h)}if(this.isLineLoop){const _=sl(this,e,xo,l,m-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function sl(n,e,t,i,r,s){const o=n.geometry.attributes.position;if(Zl.fromBufferAttribute(o,r),Jl.fromBufferAttribute(o,s),t.distanceSqToSegment(Zl,Jl,Eu,zm)>i)return;Eu.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Eu);if(!(l<e.near||l>e.far))return{distance:l,point:zm.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}class io extends ln{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Oi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],d=i[r+1]-u,p=(o-u)/d;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new Pe:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new L,r=[],s=[],o=[],a=new L,l=new mt;for(let p=0;p<=e;p++){const m=p/e;r[p]=this.getTangentAt(m,new L)}s[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Wt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,m))}o[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Wt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],p*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Zv extends Oi{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Pe){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*u-p*f+this.aX,c=d*f+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class KT extends Zv{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function _f(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,f){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+f)+(l-a)/f;d*=u,p*=u,r(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const ol=new L,wu=new _f,Tu=new _f,Au=new _f;class Jv extends Oi{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new L){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(ol.subVectors(r[0],r[1]).add(r[0]),c=ol);const f=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(ol.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=ol),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(u),p);_<1e-4&&(_=1),m<1e-4&&(m=_),v<1e-4&&(v=_),wu.initNonuniformCatmullRom(c.x,f.x,d.x,u.x,m,_,v),Tu.initNonuniformCatmullRom(c.y,f.y,d.y,u.y,m,_,v),Au.initNonuniformCatmullRom(c.z,f.z,d.z,u.z,m,_,v)}else this.curveType==="catmullrom"&&(wu.initCatmullRom(c.x,f.x,d.x,u.x,this.tension),Tu.initCatmullRom(c.y,f.y,d.y,u.y,this.tension),Au.initCatmullRom(c.z,f.z,d.z,u.z,this.tension));return i.set(wu.calc(l),Tu.calc(l),Au.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Bm(n,e,t,i,r){const s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function ZT(n,e){const t=1-n;return t*t*e}function JT(n,e){return 2*(1-n)*n*e}function QT(n,e){return n*n*e}function zo(n,e,t,i){return ZT(n,e)+JT(n,t)+QT(n,i)}function e2(n,e){const t=1-n;return t*t*t*e}function t2(n,e){const t=1-n;return 3*t*t*n*e}function n2(n,e){return 3*(1-n)*n*n*e}function i2(n,e){return n*n*n*e}function Bo(n,e,t,i,r){return e2(n,e)+t2(n,t)+n2(n,i)+i2(n,r)}class r2 extends Oi{constructor(e=new Pe,t=new Pe,i=new Pe,r=new Pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Pe){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Bo(e,r.x,s.x,o.x,a.x),Bo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class s2 extends Oi{constructor(e=new L,t=new L,i=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new L){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Bo(e,r.x,s.x,o.x,a.x),Bo(e,r.y,s.y,o.y,a.y),Bo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class o2 extends Oi{constructor(e=new Pe,t=new Pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Pe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class a2 extends Oi{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class l2 extends Oi{constructor(e=new Pe,t=new Pe,i=new Pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Pe){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(zo(e,r.x,s.x,o.x),zo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qv extends Oi{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(zo(e,r.x,s.x,o.x),zo(e,r.y,s.y,o.y),zo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class c2 extends Oi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Pe){const i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(Bm(a,l.x,c.x,u.x,f.x),Bm(a,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Pe().fromArray(r))}return this}}var u2=Object.freeze({__proto__:null,ArcCurve:KT,CatmullRomCurve3:Jv,CubicBezierCurve:r2,CubicBezierCurve3:s2,EllipseCurve:Zv,LineCurve:o2,LineCurve3:a2,QuadraticBezierCurve:l2,QuadraticBezierCurve3:Qv,SplineCurve:c2});class xf extends hn{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new L,u=new Pe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const p=i+f/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(a,3)),this.setAttribute("uv",new Mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ga extends hn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],d=[],p=[];let m=0;const _=[],v=i/2;let h=0;g(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(p,2));function g(){const y=new L,R=new L;let b=0;const A=(t-e)/i;for(let P=0;P<=s;P++){const T=[],M=P/s,N=M*(t-e)+e;for(let B=0;B<=r;B++){const k=B/r,X=k*l+a,J=Math.sin(X),W=Math.cos(X);R.x=N*J,R.y=-M*i+v,R.z=N*W,f.push(R.x,R.y,R.z),y.set(J,A,W).normalize(),d.push(y.x,y.y,y.z),p.push(k,1-M),T.push(m++)}_.push(T)}for(let P=0;P<r;P++)for(let T=0;T<s;T++){const M=_[T][P],N=_[T+1][P],B=_[T+1][P+1],k=_[T][P+1];(e>0||T!==0)&&(u.push(M,N,k),b+=3),(t>0||T!==s-1)&&(u.push(N,B,k),b+=3)}c.addGroup(h,b,0),h+=b}function x(y){const R=m,b=new Pe,A=new L;let P=0;const T=y===!0?e:t,M=y===!0?1:-1;for(let B=1;B<=r;B++)f.push(0,v*M,0),d.push(0,M,0),p.push(.5,.5),m++;const N=m;for(let B=0;B<=r;B++){const X=B/r*l+a,J=Math.cos(X),W=Math.sin(X);A.x=T*W,A.y=v*M,A.z=T*J,f.push(A.x,A.y,A.z),d.push(0,M,0),b.x=J*.5+.5,b.y=W*.5*M+.5,p.push(b.x,b.y),m++}for(let B=0;B<r;B++){const k=R+B,X=N+B;y===!0?u.push(X,X+1,k):u.push(X+1,X,k),P+=3}c.addGroup(h,P,y===!0?1:2),h+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Sc extends ga{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Sc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Kn extends hn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new L,d=new L,p=[],m=[],_=[],v=[];for(let h=0;h<=i;h++){const g=[],x=h/i;let y=0;h===0&&o===0?y=.5/t:h===i&&l===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){const b=R/t;f.x=-e*Math.cos(r+b*s)*Math.sin(o+x*a),f.y=e*Math.cos(o+x*a),f.z=e*Math.sin(r+b*s)*Math.sin(o+x*a),m.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),v.push(b+y,1-x),g.push(c++)}u.push(g)}for(let h=0;h<i;h++)for(let g=0;g<t;g++){const x=u[h][g+1],y=u[h][g],R=u[h+1][g],b=u[h+1][g+1];(h!==0||o>0)&&p.push(x,y,b),(h!==i-1||l<Math.PI)&&p.push(y,R,b)}this.setIndex(p),this.setAttribute("position",new Mt(m,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class va extends hn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new L,f=new L,d=new L;for(let p=0;p<=i;p++)for(let m=0;m<=r;m++){const _=m/r*s,v=p/i*Math.PI*2;f.x=(e+t*Math.cos(v))*Math.cos(_),f.y=(e+t*Math.cos(v))*Math.sin(_),f.z=t*Math.sin(v),a.push(f.x,f.y,f.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),d.subVectors(f,u).normalize(),l.push(d.x,d.y,d.z),c.push(m/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let m=1;m<=r;m++){const _=(r+1)*p+m-1,v=(r+1)*(p-1)+m-1,h=(r+1)*(p-1)+m,g=(r+1)*p+m;o.push(_,v,g),o.push(v,h,g)}this.setIndex(o),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new va(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class yf extends hn{constructor(e=new Qv(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Pe;let u=new L;const f=[],d=[],p=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(d,3)),this.setAttribute("uv",new Mt(p,2));function _(){for(let x=0;x<t;x++)v(x);v(s===!1?t:0),g(),h()}function v(x){u=e.getPointAt(x/t,u);const y=o.normals[x],R=o.binormals[x];for(let b=0;b<=r;b++){const A=b/r*Math.PI*2,P=Math.sin(A),T=-Math.cos(A);l.x=T*y.x+P*R.x,l.y=T*y.y+P*R.y,l.z=T*y.z+P*R.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,f.push(a.x,a.y,a.z)}}function h(){for(let x=1;x<=t;x++)for(let y=1;y<=r;y++){const R=(r+1)*(x-1)+(y-1),b=(r+1)*x+(y-1),A=(r+1)*x+y,P=(r+1)*(x-1)+y;m.push(R,b,P),m.push(b,A,P)}}function g(){for(let x=0;x<=t;x++)for(let y=0;y<=r;y++)c.x=x/t,c.y=y/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new yf(new u2[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Lt extends to{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pv,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sf extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class h2 extends Sf{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const bu=new mt,Hm=new L,Vm=new L;class e_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mf,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Hm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hm),Vm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vm),t.updateMatrixWorld(),bu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Gm=new mt,yo=new L,Cu=new L;class d2 extends e_{constructor(){super(new En(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),yo.setFromMatrixPosition(e.matrixWorld),i.position.copy(yo),Cu.copy(i.position),Cu.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Cu),i.updateMatrixWorld(),r.makeTranslation(-yo.x,-yo.y,-yo.z),Gm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gm)}}class Ds extends Sf{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new d2}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class f2 extends e_{constructor(){super(new Wv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wm extends Sf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new f2}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:af}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=af);class p2{constructor(){q(this,"ctx",null);q(this,"master",null);q(this,"compressor",null);q(this,"noiseBuffer",null);q(this,"enabled",!0);q(this,"volume",.7)}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e;this.ctx=t;const i=t.createGain();i.gain.value=this.volume;const r=t.createDynamicsCompressor();r.threshold.value=-16,r.knee.value=20,r.ratio.value=8,r.attack.value=.003,r.release.value=.22,i.connect(r),r.connect(t.destination),this.master=i,this.compressor=r;const s=Math.floor(t.sampleRate*1.2),o=t.createBuffer(1,s,t.sampleRate),a=o.getChannelData(0);let l=0;for(let c=0;c<s;c++){const u=Math.random()*2-1;l=l*.55+u*.45,a[c]=l}this.noiseBuffer=o}setEnabled(e){this.enabled=e,this.master&&this.ctx&&this.master.gain.setTargetAtTime(e?this.volume:0,this.ctx.currentTime,.03)}isEnabled(){return this.enabled}get ready(){return!!(this.enabled&&this.ctx&&this.master&&this.ctx.state!=="closed")}panner(e){if(!this.ctx)return null;if(typeof this.ctx.createStereoPanner=="function"){const t=this.ctx.createStereoPanner();return t.pan.value=Math.max(-1,Math.min(1,e)),t}return null}noise(e,t,i,r,s=0,o=1){if(!this.ready||!this.noiseBuffer||!this.ctx||!this.master)return;const a=this.ctx,l=a.createBufferSource();l.buffer=this.noiseBuffer,l.playbackRate.value=o;const c=a.createBiquadFilter();c.type=i,c.frequency.value=r,c.Q.value=i==="bandpass"?1.2:.7;const u=a.createGain(),f=a.currentTime;u.gain.setValueAtTime(0,f),u.gain.linearRampToValueAtTime(t,f+.003),u.gain.exponentialRampToValueAtTime(1e-4,f+e),l.connect(c),c.connect(u);const d=this.panner(s);d?(u.connect(d),d.connect(this.master)):u.connect(this.master),l.start(f),l.stop(f+e+.02)}tone(e,t,i,r,s,o=0,a=0){if(!this.ready||!this.ctx||!this.master)return;const l=this.ctx,c=l.currentTime+o,u=l.createOscillator();u.type=r,u.frequency.setValueAtTime(e,c),s!==void 0&&u.frequency.exponentialRampToValueAtTime(Math.max(20,s),c+t);const f=l.createGain();f.gain.setValueAtTime(1e-4,c),f.gain.exponentialRampToValueAtTime(i,c+.008),f.gain.exponentialRampToValueAtTime(1e-4,c+t),u.connect(f);const d=this.panner(a);d?(f.connect(d),d.connect(this.master)):f.connect(this.master),u.start(c),u.stop(c+t+.03)}spatial(e,t){return 1/(1+Math.max(0,e)/20)}shot(e,t=0,i=0){if(!this.ready)return;const r=this.spatial(t,i),s=e.sound,o=s.volume*Math.max(.08,r);s.kind==="rifle"||s.kind==="smg"?(this.noise(s.duration,o*.7,"lowpass",2600*s.pitch,i,1.2),this.noise(.075,o*.45,"bandpass",4300*s.pitch,i,1.6),this.tone(120*s.pitch,.16,o*.32,"sawtooth",52*s.pitch,0,i)):s.kind==="heavy"?(this.noise(.75,o*.8,"lowpass",1750,i,.62),this.noise(.22,o*.55,"bandpass",2200,i,.85),this.tone(95,.55,o*.5,"sawtooth",34,0,i),this.tone(1900,.16,o*.08,"sine",400,.01,i)):s.kind==="pistol"?(this.noise(.11,o*.72,"highpass",900,i,1.6),this.noise(.16,o*.32,"bandpass",2400*s.pitch,i,1.2),this.tone(230*s.pitch,.09,o*.23,"triangle",80*s.pitch,0,i)):s.kind==="deagle"?(this.noise(.34,o*.8,"lowpass",3200,i,.9),this.tone(150,.3,o*.45,"sawtooth",45,0,i),this.noise(.12,o*.38,"highpass",1500,i,1.4)):this.noise(.12,o*.4,"bandpass",2300,i,1)}knife(){this.ready&&(this.noise(.13,.26,"bandpass",2600,0,2.2),this.tone(730,.08,.06,"triangle",300))}reload(e,t){if(!this.ready)return;const i=t==="heavy"?.8:t==="pistol"?1.4:1;this.tone(410*i,.045,.1,"square",270*i,.03),this.noise(.055,.12,"highpass",2800,0,1.5),this.tone(320*i,.055,.09,"square",210*i,e*.6),this.noise(.07,.1,"bandpass",1900,0,1)}empty(){this.ready&&(this.tone(760,.045,.08,"square",380),this.noise(.03,.05,"highpass",3e3))}scope(){this.ready&&(this.tone(1500,.045,.07,"square",900),this.tone(720,.08,.055,"sine",350,.04),this.noise(.05,.04,"bandpass",4200,0,2))}footstep(e,t=0,i=0){if(!this.ready)return;const r=(e?.14:.07)*Math.max(.1,this.spatial(t,i));this.noise(e?.11:.085,r,"lowpass",e?520:380,i,.75+Math.random()*.2),this.tone(e?92:75,.06,r*.24,"sine",45,0,i)}hit(e){this.ready&&(e?(this.tone(1450,.09,.13,"triangle",2100),this.tone(2100,.07,.08,"sine",1400,.015),this.noise(.06,.07,"highpass",3800)):(this.tone(420,.055,.08,"triangle",250),this.noise(.045,.055,"bandpass",1300)))}kill(){this.ready&&(this.tone(880,.08,.1,"triangle",1320),this.tone(1320,.12,.08,"sine",1760,.07))}damage(){this.ready&&(this.noise(.12,.16,"lowpass",500),this.tone(140,.16,.09,"sawtooth",60))}bombPlant(){this.ready&&(this.tone(880,.08,.09,"square",660),this.tone(660,.1,.08,"square",440,.15),this.noise(.08,.08,"bandpass",1700,0,1.2))}bombBeep(e){this.ready&&this.tone(e?1450:1180,.055,e?.12:.07,"square",e?1180:980)}bombDefuse(e){this.ready&&(e?(this.tone(700,.1,.1,"sine",1e3),this.tone(1050,.2,.08,"sine",1400,.08)):(this.noise(.06,.06,"bandpass",2400,0,1.3),this.tone(540,.04,.04,"square",720)))}explosion(){this.ready&&(this.noise(1.9,.95,"lowpass",900,0,.5),this.noise(.9,.6,"bandpass",320,0,.42),this.tone(110,1.5,.7,"sawtooth",26),this.tone(55,1.8,.4,"sine",20),this.tone(2200,.3,.12,"sine",200))}roundStart(){this.ready&&(this.tone(520,.12,.08,"sine",680),this.tone(780,.16,.07,"sine",980,.12))}win(){this.ready&&[523,659,784,1046].forEach((e,t)=>this.tone(e,.2,.08,"triangle",e,t*.1))}lose(){this.ready&&[392,330,262].forEach((e,t)=>this.tone(e,.26,.08,"triangle",e*.96,t*.14))}pickup(){this.ready&&(this.tone(420,.06,.06,"square",620),this.tone(650,.09,.05,"sine",880,.055))}}const _t=(n,e,t)=>Math.max(e,Math.min(t,n)),Xe=(n,e)=>n+Math.random()*(e-n),Pt=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z);function Ho(n){for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}function m2(n,e){return Ho(e-n)}function So(n,e,t){const i=m2(n,e);return n+_t(i,-t,t)}function jm(n,e,t,i){const r=_t(n,i.minX,i.maxX),s=_t(e,i.minZ,i.maxZ);return(n-r)**2+(e-s)**2<t*t}function Xm(n,e,t,i=0){return n>=t.minX-i&&n<=t.maxX+i&&e>=t.minZ-i&&e<=t.maxZ+i}function g2(n,e,t,i){const r=_t(n,i.minX,i.maxX),s=_t(e,i.minZ,i.maxZ),o=n-r,a=e-s,l=o*o+a*a;if(l>=t*t)return{x:n,z:e};if(l>1e-8){const u=Math.sqrt(l);return{x:n+o/u*(t-u),z:e+a/u*(t-u)}}const c=[{d:n-i.minX,x:i.minX-t,z:e},{d:i.maxX-n,x:i.maxX+t,z:e},{d:e-i.minZ,x:n,z:i.minZ-t},{d:i.maxZ-e,x:n,z:i.maxZ+t}].sort((u,f)=>u.d-f.d);return{x:c[0].x,z:c[0].z}}function v2(n,e,t,i,r,s=0){const o=r.minX-s,a=r.maxX+s,l=r.minZ-s,c=r.maxZ+s,u=t-n,f=i-e;let d=0,p=1;for(const[m,_,v,h]of[[n,u,o,a],[e,f,l,c]])if(Math.abs(_)<1e-9){if(m<v||m>h)return null}else{let g=(v-m)/_,x=(h-m)/_;if(g>x&&([g,x]=[x,g]),d=Math.max(d,g),p=Math.min(p,x),d>p)return null}return d}function _2(n,e,t,i,r,s=0){for(const o of r)if(v2(n,e,t,i,o,s)!==null)return!1;return!0}function Ru(n,e,t,i,r,s,o,a,l,c,u,f){let d=0,p=1/0;const m=[[n,i,o,c],[e,r,a,u],[t,s,l,f]];for(const[_,v,h,g]of m)if(Math.abs(v)<1e-9){if(_<h||_>g)return null}else{let x=(h-_)/v,y=(g-_)/v;if(x>y&&([x,y]=[y,x]),d=Math.max(d,x),p=Math.min(p,y),d>p)return null}return d}const x2={T:{shirt:8022859,pants:3880233,vest:4931630,skin:10120522,helmet:1710616,accent:10894382,boots:2170393},CT:{shirt:3887722,pants:2438210,vest:1977142,skin:11041110,helmet:4480630,accent:5017546,boots:1514786}},Ym=new Map;function Gt(n,e=.85,t=.05){const i=n*1e3+Math.round(e*100)+Math.round(t*100)*1e5;let r=Ym.get(i);return r||(r=new Lt({color:n,roughness:e,metalness:t}),Ym.set(i,r)),r}function Me(n,e,t,i,r,s,o,a,l=.85,c=.04){const u=new Re(new xt(e,t,i),Gt(a,l,c));return u.position.set(r,s,o),u.castShadow=!0,u.receiveShadow=!0,n.add(u),u}function Ar(n,e,t,i,r,s,o,a,l=8,c=.7,u=.25){const f=new Re(new ga(e,t,i,l),Gt(a,c,u));return f.position.set(r,s,o),f.castShadow=!0,f.receiveShadow=!0,n.add(f),f}class y2{constructor(e){q(this,"root",new gt);q(this,"visual",new gt);q(this,"weaponMount",new gt);q(this,"leftLeg",new gt);q(this,"rightLeg",new gt);q(this,"leftArm",new gt);q(this,"rightArm",new gt);q(this,"torso");q(this,"head");q(this,"walkPhase",0);q(this,"deadTime",0);q(this,"weaponModel",null);q(this,"currentWeapon",null);q(this,"deathRoll",Math.random()>.5?1:-1);q(this,"team");this.team=e,this.root.add(this.visual),this.root.name="character",this.visual.position.y=0,this.torso=this.buildBody(),this.visual.add(this.torso),this.weaponMount.position.set(.21,1.28,-.47),this.visual.add(this.weaponMount),this.root.userData.character=this}buildBody(){const e=x2[this.team],t=new gt;Me(t,.42,.2,.28,0,.92,0,e.pants).scale.set(1,1,1),Me(t,.46,.46,.29,0,1.27,0,e.shirt),Me(t,.5,.36,.33,0,1.32,0,e.vest),Me(t,.4,.24,.34,0,1.25,.04,e.accent===10894382?5127717:2503486);for(const s of[-.13,0,.13])Me(t,.1,.1,.08,s,1.2,-.2,2959906);Me(t,.08,.11,.31,.27,1.33,0,e.accent),Ar(t,.075,.085,.13,0,1.53,-.01,e.skin,8,.9,0),this.head=new gt,this.head.position.set(0,1.7,-.01),t.add(this.head);const r=new Re(new Kn(.185,12,10),Gt(e.skin,.9,0));if(r.scale.set(.9,1.06,.94),r.castShadow=!0,this.head.add(r),this.team==="T"){const s=new Re(new Kn(.19,12,10,0,Math.PI*2,.42,Math.PI*.6),Gt(1973530,.96,0));s.castShadow=!0,this.head.add(s);const o=new Re(new va(.185,.032,5,14),Gt(e.accent,.75,0));o.rotation.x=Math.PI/2,o.position.y=.065,o.castShadow=!0,this.head.add(o),Me(this.head,.05,.18,.04,.16,-.02,.08,e.accent);for(const a of[-.065,.065]){const l=new Re(new Kn(.019,6,5),Gt(14208952,.5,0));l.position.set(a,0,-.165),this.head.add(l)}}else{const s=new Re(new Kn(.205,14,10,0,Math.PI*2,0,Math.PI*.55),Gt(e.helmet,.55,.3));s.scale.set(1.02,.88,1.03),s.position.y=.035,s.castShadow=!0,this.head.add(s),Me(this.head,.23,.055,.02,0,.075,.185,2437951),Me(this.head,.25,.1,.12,0,.03,-.12,1712940);for(const o of[-.075,.075])Me(this.head,.055,.032,.02,o,0,-.18,9427199,.3,.4);Me(this.head,.05,.035,.24,.17,-.04,-.03,2306364)}for(const s of[-1,1]){const o=new gt;o.position.set(s*.31,1.47,0),t.add(o),Me(o,.15,.32,.17,0,-.14,0,e.shirt);const a=new gt;a.position.y=-.31,a.rotation.x=-.36,o.add(a),Me(a,.13,.3,.14,0,-.14,0,e.shirt),Me(a,.12,.1,.13,0,-.3,0,2368030),o.rotation.x=1.08,o.rotation.z=s*-.1,s<0?this.leftArm=o:this.rightArm=o}for(const s of[-1,1]){const o=new gt;o.position.set(s*.135,.9,0),t.add(o),Me(o,.19,.42,.21,0,-.2,0,e.pants);const a=new gt;a.position.y=-.42,o.add(a),Me(a,.16,.38,.18,0,-.18,.01,e.pants),Me(a,.19,.12,.28,0,-.38,-.04,e.boots),s<0?this.leftLeg=o:this.rightLeg=o}return Me(t,.32,.34,.16,0,1.3,.23,2828836),Me(t,.34,.06,.18,0,1.48,.23,e.accent),t}setWeapon(e){if(this.currentWeapon===e||(this.currentWeapon=e,this.weaponModel&&(this.weaponMount.remove(this.weaponModel),this.weaponModel=null),!e))return;const t=t_(e,"world");t.scale.setScalar(.82),t.rotation.set(0,0,0),this.weaponMount.add(t),this.weaponModel=t}setAimPitch(e){this.weaponModel&&(this.weaponMount.rotation.x=_t(e,-.7,.7))}kick(){this.weaponModel&&(this.weaponMount.position.z+=.035)}update(e,t,i){if(!i){this.deadTime+=e,this.visual.rotation.z=zt.damp(this.visual.rotation.z,this.deathRoll*1.42,4.5,e),this.visual.rotation.x=zt.damp(this.visual.rotation.x,.15,3.5,e),this.visual.position.y=zt.damp(this.visual.position.y,-.03,4,e),this.weaponMount.visible=!1;return}this.weaponMount.visible=!0;const r=_t(t/4.5,0,1);this.walkPhase+=e*(3.2+t*1.15);const s=Math.sin(this.walkPhase)*.68*r;this.leftLeg.rotation.x=s,this.rightLeg.rotation.x=-s;const o=Math.abs(Math.sin(this.walkPhase*2))*.022*r;this.torso.position.y=o,this.head.position.y=1.7+o;const a=Math.sin(performance.now()*.0016+this.root.id)*.012;this.torso.rotation.z=a*(1-r),this.weaponMount.position.z=zt.damp(this.weaponMount.position.z,0,12,e),this.rightArm.rotation.x=1.08-s*.06,this.leftArm.rotation.x=1.12+s*.04}getHitboxes(e,t,i){if(!i)return[];const r=Math.cos(t),s=Math.sin(t),o=(l,c,u)=>{const f=e.x+l*r+u*s,d=e.z-l*s+u*r;return new L(f,e.y+c,d)},a=(l,c,u,f,d,p,m)=>{const _=o(c,u,f),v=new eo(_.clone().sub(new L(d/2,p/2,m/2)),_.clone().add(new L(d/2,p/2,m/2)));return{part:l,box:v}};return[a("head",0,1.72,0,.38,.4,.38),a("chest",0,1.34,0,.5,.42,.34),a("stomach",0,1.04,0,.43,.32,.3),a("arm",-.34,1.22,-.08,.2,.53,.24),a("arm",.34,1.22,-.08,.2,.53,.24),a("leg",-.14,.47,0,.24,.78,.26),a("leg",.14,.47,0,.24,.78,.26)]}getMuzzleWorld(){const e=new L(.22,1.31,-1.15);return this.root.localToWorld(e)}getCenter(){return this.root.localToWorld(new L(0,1.2,0))}getWeaponRoot(){return this.weaponModel}setVisible(e){this.visual.visible=e}reset(){this.deadTime=0,this.visual.rotation.set(0,0,0),this.visual.position.y=0,this.visual.visible=!0,this.weaponMount.visible=!0}}const $m=new Map;function S2(){return{black:Gt(3883331,.55,.35),dark:Gt(4936276,.65,.28),steel:Gt(10002336,.32,.75),wood:Gt(7292198,.82,.05),olive:Gt(5002560,.72,.15),tan:Gt(8285517,.8,.1),gold:Gt(11831877,.32,.8),glove:Gt(3814444,.92,0)}}function M2(n,e,t=1){const i=new Ut;i.name="muzzle",i.position.set(0,0,e),n.add(i);const r=new ei({color:16768924,transparent:!0,opacity:.95,blending:oa,depthWrite:!1,side:Dn}),s=new Re(new Sc(.1*t,.32*t,7),r);s.name="flash",s.rotation.x=Math.PI/2,s.position.z=-.15*t,s.visible=!1,i.add(s);const o=new Re(new Kn(.07*t,7,5),r);o.name="flashStar",o.visible=!1,i.add(o)}function ls(n,e){Me(n,.105,.13,.13,.05,-.17,.07,3485994,.95),Me(n,.12,.105,.16,-.035,-.135,e,3485994,.95),Me(n,.08,.05,.06,.055,-.105,.05,4866614,.9)}function E2(n,e){const t=new gt,i=S2();let r=-.9;if(n==="ak47"){Me(t,.13,.14,.55,0,0,-.24,2303269,.55,.55),Me(t,.1,.12,.42,0,.02,-.6,2829613,.5,.6),Me(t,.09,.1,.35,0,-.015,-.47,7292198,.85,.03),Me(t,.11,.15,.26,0,-.02,.17,7292198,.85,.03);const s=Me(t,.1,.13,.36,0,0,.38,7292198,.85,.03);s.rotation.x=-.12;const o=Me(t,.115,.3,.17,0,-.23,-.28,4011046,.65,.15);o.rotation.x=.18;const a=Me(t,.11,.16,.16,0,-.36,-.22,4011046,.65,.15);a.rotation.x=.36;const l=Ar(t,.023,.027,.5,0,.035,-.85,4080194,8,.35,.8);l.rotation.x=Math.PI/2,Me(t,.02,.08,.02,0,.1,-.74,2237476,.5,.5),Me(t,.03,.04,.03,0,.09,-.11,2237476,.5,.5),Me(t,.09,.04,.16,0,-.09,-.45,7292198,.85,.03),r=-1.11,e==="fp"&&ls(t,-.52)}else if(n==="m4a4"){Me(t,.12,.13,.55,0,0,-.3,4212554,.55,.35),Me(t,.1,.11,.36,0,.01,-.7,5067863,.5,.4),Me(t,.08,.17,.12,0,-.14,-.14,5594207,.55,.3),Me(t,.085,.2,.13,0,-.23,-.18,4344139,.6,.3);const s=Ar(t,.018,.024,.5,0,.025,-.95,8489355,8,.35,.75);s.rotation.x=Math.PI/2,Me(t,.1,.06,.3,0,.1,-.43,4541262,.5,.4),Me(t,.07,.07,.1,0,.16,-.28,3883331,.45,.45),Me(t,.05,.07,.3,0,.12,-.05,3685952,.5,.4),Me(t,.1,.13,.4,0,.01,.38,4278346,.6,.3);const o=Me(t,.1,.025,.5,0,.09,-.28,3356987,.45,.5);o.rotation.x=0,r=-1.2,e==="fp"&&ls(t,-.63)}else if(n==="awp"){Me(t,.14,.14,.85,0,0,-.42,5199687,.72,.18),Me(t,.11,.12,.44,0,0,-.95,4344380,.65,.25);const s=Ar(t,.03,.04,.95,0,.025,-1.25,3817526,10,.35,.7);s.rotation.x=Math.PI/2,Me(t,.12,.14,.46,0,-.05,.44,3949622,.75,.2),Me(t,.13,.19,.1,0,-.17,.22,3291182,.8,.1),Me(t,.04,.04,.18,.1,.02,-.12,7501688,.35,.8),Me(t,.08,.1,.3,0,.13,-.32,2236958,.6,.3);const o=Ar(t,.06,.07,.42,0,.23,-.34,1514008,12,.4,.55);o.rotation.x=Math.PI/2;const a=new Re(new xf(.058,12),new Lt({color:8378308,roughness:.15,metalness:.7}));a.position.set(0,.23,-.56),a.rotation.y=Math.PI,t.add(a),Me(t,.1,.1,.4,0,-.14,-.7,3423024,.8,.1),r=-1.75,e==="fp"&&ls(t,-.73)}else if(n==="glock"){Me(t,.1,.12,.3,0,.02,-.19,2434856,.55,.4),Me(t,.095,.1,.31,0,-.05,-.2,1908512,.6,.35);const s=Me(t,.09,.28,.13,0,-.18,0,2829871,.75,.15);s.rotation.x=-.16,Me(t,.04,.035,.1,0,.095,-.27,1513754,.5,.5),r=-.36,e==="fp"&&ls(t,-.21)}else if(n==="usp"){Me(t,.1,.12,.33,0,.02,-.2,2434856,.55,.4),Me(t,.095,.105,.35,0,-.055,-.22,1842719,.6,.35);const s=Me(t,.085,.29,.13,0,-.19,.01,2369320,.8,.1);s.rotation.x=-.15;const o=Ar(t,.038,.042,.34,0,.015,-.58,2961457,12,.45,.55);o.rotation.x=Math.PI/2,Me(t,.025,.035,.08,0,.1,-.28,1447961,.5,.5),r=-.78,e==="fp"&&ls(t,-.3)}else if(n==="deagle"){Me(t,.115,.14,.4,0,.02,-.23,9212306,.32,.82),Me(t,.11,.11,.4,0,-.05,-.24,10330786,.28,.85);const s=Me(t,.095,.31,.15,0,-.21,0,5593691,.55,.4);s.rotation.x=-.14,Me(t,.04,.04,.11,0,.11,-.34,2237734,.5,.5);const o=Ar(t,.025,.03,.22,0,.025,-.54,3224629,8,.35,.8);o.rotation.x=Math.PI/2,r=-.68,e==="fp"&&ls(t,-.25)}else{Me(t,.06,.08,.24,0,-.02,.02,3158318,.85,.05),Me(t,.11,.035,.04,0,0,-.1,7304051,.35,.9);const s=new Re(new xt(.045,.02,.5),Gt(12173505,.22,.95));s.position.set(0,.01,-.36),s.rotation.y=.04,s.castShadow=!0,t.add(s);const o=new Re(new Sc(.035,.16,4),Gt(12173505,.22,.95));if(o.rotation.x=-Math.PI/2,o.rotation.z=Math.PI/4,o.position.set(0,.01,-.7),t.add(o),r=-.8,e==="fp"){Me(t,.14,.15,.14,.02,-.16,.1,2959909,.95);const a=new Re(new xt(.14,.42,.14),i.glove);a.position.set(.07,-.33,.22),a.rotation.set(-.2,0,-.25),t.add(a)}}return M2(t,r,n==="awp"?1.5:n==="glock"||n==="usp"||n==="deagle"?.7:1),t}function t_(n,e){const t=`${n}:${e}`;let i=$m.get(t);return i||(i=E2(n,e),$m.set(t,i)),i.clone(!0)}function w2(n){const e=t_(n,"fp");return e.scale.setScalar(.43),e.traverse(t=>{const i=t;if(!i.isMesh)return;const r=i.material;if(!r||!("emissive"in r))return;const s=r.clone();s.emissive=new Ge(s.color).multiplyScalar(.55),s.emissiveIntensity=.9,s.metalness=Math.min(.35,s.metalness),s.roughness=Math.max(.4,s.roughness),i.material=s,i.castShadow=!1,i.receiveShadow=!1}),e}function T2(n){return n.getObjectByName("muzzle")??null}function qm(n,e=.055){const t=T2(n);if(!t)return;t.children.forEach(r=>{if(r.name==="flash"||r.name==="flashStar"){r.visible=!0;const s=r;s.material&&"opacity"in s.material&&(s.material.opacity=.95),window.setTimeout(()=>{r.visible=!1},e*1e3)}});const i=new Ds(16760939,2.8,6,2);t.add(i),window.setTimeout(()=>{t.remove(i),i.dispose()},60)}function A2(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new hn;let c=0;for(let u=0;u<n.length;++u){const f=n[u];let d=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in f.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(f.attributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in f.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(f.morphAttributes[p])}if(e){let p;if(t)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(t){let u=0;const f=[];for(let d=0;d<n.length;++d){const p=n[d].index;for(let m=0;m<p.count;++m)f.push(p.getX(m)+u);u+=n[d].attributes.position.count}l.setIndex(f)}for(const u in s){const f=Km(s[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(const u in o){const f=o[u][0].length;if(f===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<f;++d){const p=[];for(let _=0;_<o[u].length;++_)p.push(o[u][_][d]);const m=Km(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}return l}function Km(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const o=new e(s),a=new ti(o,t,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const f=l/t;for(let d=0,p=u.count;d<p;d++)for(let m=0;m<t;m++){const _=u.getComponent(d,m);a.setComponent(d+f,m,_)}}else o.set(u.array,l);l+=u.count*t}return r!==void 0&&(a.gpuType=r),a}const fn={minX:-60,maxX:60,minZ:-52,maxZ:52},Mf={sand:"#c4a56b",wall:"#b89b69",metal:"#52554d"};function b2(){const n=document.createElement("canvas");n.width=n.height=512;const e=n.getContext("2d");e.fillStyle=Mf.sand,e.fillRect(0,0,512,512);for(let i=0;i<18e3;i++){const r=Math.random()*.18;e.fillStyle=Math.random()>.5?`rgba(92,70,35,${r})`:`rgba(255,238,188,${r})`;const s=Math.random()*2.4+.4;e.fillRect(Math.random()*512,Math.random()*512,s,s)}for(let i=0;i<28;i++){e.strokeStyle=`rgba(112,89,52,${.05+Math.random()*.08})`,e.lineWidth=1+Math.random()*2,e.beginPath();let r=Math.random()*512,s=Math.random()*512;e.moveTo(r,s);for(let o=0;o<5;o++)r+=(Math.random()-.5)*90,s+=(Math.random()-.5)*30,e.lineTo(r,s);e.stroke()}const t=new io(n);return t.wrapS=t.wrapT=Hr,t.repeat.set(18,18),t.colorSpace=It,t}function C2(){const n=document.createElement("canvas");n.width=n.height=512;const e=n.getContext("2d");e.fillStyle=Mf.wall,e.fillRect(0,0,512,512);for(let i=0;i<14e3;i++){const r=Math.random();e.fillStyle=r>.5?`rgba(255,245,210,${Math.random()*.13})`:`rgba(73,57,31,${Math.random()*.14})`;const s=Math.random()*3+.4;e.fillRect(Math.random()*512,Math.random()*512,s,s)}for(let i=0;i<10;i++)e.fillStyle=`rgba(222,200,150,${.05+Math.random()*.12})`,e.beginPath(),e.ellipse(Math.random()*512,Math.random()*512,18+Math.random()*60,10+Math.random()*40,Math.random()*3,0,Math.PI*2),e.fill();e.strokeStyle="rgba(80,62,34,0.14)",e.lineWidth=2;for(let i=0;i<512;i+=128){e.beginPath(),e.moveTo(0,i),e.lineTo(512,i),e.stroke();const r=i/128%2?64:0;for(let s=r;s<512;s+=128)e.beginPath(),e.moveTo(s,i),e.lineTo(s,i+128),e.stroke()}const t=new io(n);return t.wrapS=t.wrapT=Hr,t.repeat.set(1,1),t.colorSpace=It,t}function Zm(){const n=document.createElement("canvas");n.width=n.height=256;const e=n.getContext("2d");e.fillStyle="#8b5a2c",e.fillRect(0,0,256,256);for(let i=0;i<256;i+=32){e.fillStyle=i%64===0?"rgba(255,190,100,.06)":"rgba(45,22,8,.07)",e.fillRect(0,i,256,32),e.strokeStyle="rgba(46,25,10,.45)",e.lineWidth=2,e.beginPath(),e.moveTo(0,i),e.lineTo(256,i),e.stroke();for(let r=0;r<7;r++)e.strokeStyle=`rgba(43,23,8,${.08+Math.random()*.12})`,e.beginPath(),e.moveTo(Math.random()*256,i+4+Math.random()*22),e.lineTo(Math.random()*256,i+4+Math.random()*22),e.stroke()}e.strokeStyle="rgba(48,26,10,.6)",e.lineWidth=12,e.strokeRect(5,5,246,246),e.strokeStyle="rgba(30,16,5,.55)",e.lineWidth=8,e.beginPath(),e.moveTo(10,10),e.lineTo(246,246),e.moveTo(246,10),e.lineTo(10,246),e.stroke();const t=new io(n);return t.colorSpace=It,t.wrapS=t.wrapT=Hr,t}function R2(){const n=document.createElement("canvas");n.width=n.height=256;const e=n.getContext("2d");e.fillStyle=Mf.metal,e.fillRect(0,0,256,256);for(let i=0;i<6e3;i++)e.fillStyle=Math.random()>.5?`rgba(255,255,255,${Math.random()*.09})`:`rgba(0,0,0,${Math.random()*.18})`,e.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);for(let i=0;i<8;i++)e.fillStyle="rgba(30,30,26,.35)",e.beginPath(),e.arc(18+i%4*70,20+Math.floor(i/4)*210,4,0,Math.PI*2),e.fill();const t=new io(n);return t.wrapS=t.wrapT=Hr,t.colorSpace=It,t}function Ql(n,e,t=256,i=""){const r=document.createElement("canvas");r.width=r.height=t;const s=r.getContext("2d");s.clearRect(0,0,t,t),s.textAlign="center",s.textBaseline="middle",s.fillStyle=e,s.font=`900 ${t*.62}px Impact, Arial Black, sans-serif`,s.globalAlpha=.9,s.fillText(n,t/2,t*.48),i&&(s.font=`700 ${t*.08}px Arial, sans-serif`,s.globalAlpha=.75,s.fillText(i,t/2,t*.85)),s.globalAlpha=1;const o=new io(r);return o.colorSpace=It,o}function P2(n,e){const t=document.createElement("canvas");t.width=512,t.height=128;const i=t.getContext("2d");i.fillStyle="rgba(22, 23, 18, 0.9)",i.fillRect(0,0,512,128),i.strokeStyle="rgba(202, 169, 102, 0.7)",i.lineWidth=3,i.strokeRect(4,4,504,120),i.fillStyle="#d9c294",i.font="900 50px Impact, Arial Black, sans-serif",i.textAlign="left",i.textBaseline="middle",i.fillText(n,26,58),i.fillStyle="rgba(207, 187, 145, 0.7)",i.font="700 17px Arial, sans-serif",i.fillText(e,28,98),i.fillStyle="rgba(202, 169, 102, 0.85)",i.fillRect(430,54,52,4),i.fillRect(430,64,32,3);const r=new io(t);return r.colorSpace=It,r}function xi(n,e,t,i,r,s,o=.4,a=.015){const l=new Re(new wn(i,r),new Lt({color:s,transparent:o<1,opacity:o,roughness:1,metalness:0,depthWrite:!1}));return l.rotation.x=-Math.PI/2,l.position.set(e,a,t),l.receiveShadow=!0,n.add(l),l}function Jm(n,e){const t=Ql(e.name,"#e6d7b8",256,"BOMBSITE"),i=new ei({map:t,transparent:!0,depthWrite:!1,opacity:.52}),r=new Re(new wn(11,11),i);r.rotation.x=-Math.PI/2,r.position.set(e.center.x,.026,e.center.z),n.add(r)}function Qm(n,e,t,i,r){const s=Ql(i,r,256),o=new ei({map:s,transparent:!0,depthWrite:!1,opacity:.38}),a=new Re(new wn(9,9),o);a.rotation.x=-Math.PI/2,a.position.set(e,.027,t),n.add(a)}function L2(n){n.updateMatrixWorld(!0);const e=new Map;n.traverse(t=>{const i=t;if(!i.isMesh||!i.userData.staticOpaque||Array.isArray(i.material))return;const r=i.material.uuid;let s=e.get(r);s||(s={material:i.material,meshes:[]},e.set(r,s)),s.meshes.push(i)});for(const t of e.values()){if(t.meshes.length<2)continue;const i=[];let r=!1,s=!1;for(const l of t.meshes){const c=l.geometry.clone();c.applyMatrix4(l.matrixWorld),i.push(c),r||(r=l.castShadow),s||(s=l.receiveShadow)}const o=A2(i,!1);if(i.forEach(l=>l.dispose()),!o)continue;const a=new Re(o,t.material);a.castShadow=r,a.receiveShadow=s,a.frustumCulled=!0,n.add(a);for(const l of t.meshes)n.remove(l),l.geometry.dispose()}}function N2(n){const e=new gt;n.add(e);const t=b2(),i=C2(),r=Zm(),s=R2(),o=new Lt({map:t,color:16777215,roughness:.98,metalness:0}),a=new Lt({map:i,color:16777215,roughness:.94,metalness:0}),l=new Lt({color:9204811,roughness:.98}),c=new Lt({color:6968888,roughness:.9}),u=new Lt({map:r,color:16777215,roughness:.85});new Lt({map:s,color:16777215,roughness:.55,metalness:.55});const f=new Lt({color:3948603,roughness:.48,metalness:.6}),d=new Lt({color:6122319,roughness:.6,metalness:.35}),p=new Lt({color:8141613,roughness:.95}),m=[],_=[],v=new Re(new wn(124,108),o);v.rotation.x=-Math.PI/2,v.position.set(0,0,0),v.receiveShadow=!0,e.add(v),xi(e,0,5,20,62,8352860,.24),xi(e,40,18,14,54,8878945,.18),xi(e,-38,9,18,44,6182470,.22),xi(e,0,40,36,20,9864030,.2),xi(e,0,-42,38,14,8551272,.2),xi(e,40,-27,30,37,10193509,.17),xi(e,-40,-31,30,30,8352599,.16),xi(e,16,-10,16,8,6580063,.6,.03).geometry=new wn(16,8);const h=(G,ee,K)=>{m.push({rect:G,minY:0,maxY:ee,kind:K}),_.push({rect:G,kind:K})},g=(G,ee,K,ce,ue=4.2,_e=a)=>{const Oe=ee-G,Le=ce-K,We=new Re(new xt(Oe,ue,Le),_e);We.position.set((G+ee)/2,ue/2,(K+ce)/2),We.castShadow=!0,We.receiveShadow=!0,We.userData.staticOpaque=!0,e.add(We);const D=new Re(new xt(Oe+.14,.2,Le+.14),c);return D.position.set(We.position.x,ue+.08,We.position.z),D.castShadow=!0,D.userData.staticOpaque=!0,e.add(D),h({minX:G,maxX:ee,minZ:K,maxZ:ce},ue,"wall"),We},x=(G,ee,K,ce,ue=l)=>{const Oe=new Re(new xt(ee-G,1.15,ce-K),ue);return Oe.position.set((G+ee)/2,1.15/2,(K+ce)/2),Oe.castShadow=!0,Oe.receiveShadow=!0,Oe.userData.staticOpaque=!0,e.add(Oe),h({minX:G,maxX:ee,minZ:K,maxZ:ce},1.15,"railing"),Oe},y=(G,ee,K,ce,ue,_e=0,Oe=u)=>{const Le=new Re(new xt(K,ue,ce),Oe);Le.position.set(G,ue/2,ee),Le.rotation.y=_e,Le.castShadow=!0,Le.receiveShadow=!0,Le.userData.staticOpaque=!0,e.add(Le);const We=new Re(new xt(K+.04,.07,ce+.04),f);We.position.set(G,ue-.035,ee),We.rotation.y=_e,We.userData.staticOpaque=!0,e.add(We);const D=Math.abs(Math.cos(_e))*K/2+Math.abs(Math.sin(_e))*ce/2,Rt=Math.abs(Math.sin(_e))*K/2+Math.abs(Math.cos(_e))*ce/2;return h({minX:G-D,maxX:G+D,minZ:ee-Rt,maxZ:ee+Rt},ue,"crate"),Le},R=(G,ee,K=.55,ce=1.25)=>{const ue=new Re(new ga(K,K*.95,ce,12),d);ue.position.set(G,ce/2,ee),ue.castShadow=!0,ue.receiveShadow=!0,ue.userData.staticOpaque=!0,e.add(ue);const _e=new Re(new va(K*.85,.045,5,14),f);_e.rotation.x=Math.PI/2,_e.position.set(G,ce*.74,ee),_e.userData.staticOpaque=!0,e.add(_e),h({minX:G-K,maxX:G+K,minZ:ee-K,maxZ:ee+K},ce,"prop")},b=(G,ee,K=.9,ce=.9,ue=4)=>{const _e=new Re(new xt(K,ue,ce),l);_e.position.set(G,ue/2,ee),_e.castShadow=!0,_e.receiveShadow=!0,_e.userData.staticOpaque=!0,e.add(_e),h({minX:G-K/2,maxX:G+K/2,minZ:ee-ce/2,maxZ:ee+ce/2},ue,"wall")};g(-60,-57,-50,50,5.2),g(57,60,-50,50,5.2),g(-60,60,-52,-49,5.2),g(-60,60,49,52,5.2),g(-22,-8,26,28),g(8,22,26,28),g(-20,-18,28,34),g(-20,-18,44,49),g(18,20,28,34),g(18,20,44,49),g(-10,-8,-36,26),g(8,10,-36,-14),g(8,10,-6,26),g(-10,-4,.6,2.4),g(4,10,.6,2.4),g(-20,-8,-38,-36),g(8,20,-38,-36),g(18,20,-48,-44),g(18,20,-38,-36),g(-20,-18,-48,-44),g(-20,-18,-38,-36),y(-12,-45,3.2,1.7,1.25),y(12,-45,3.2,1.7,1.25),R(16,-40.5),R(-16,-40.5),g(18,40,32,34),g(18,40,44,46),g(38,40,-8,32),g(54,57,-8,44),g(40,45,14,16.4),g(49,54,14,16.4),b(45,15.2,1.2,1.4,4),b(49,15.2,1.2,1.4,4),y(51.3,22,2,2.4,1.5),y(42.2,6.5,1.6,1.6,1.2),y(45.5,-1.5,2.4,2,1.2),g(22,24,-38,-14),g(22,24,-6,-3.8),g(24,44,-8,-6),g(50,56,-8,-6),g(56,57,-46,-8,5.2),y(34,-27,3.2,2.2,2.1),y(38,-28.2,2.1,1.7,1.35),y(50.1,-39.5,2.5,2.5,1.4),y(27.5,-42,2.1,1.5,1.5),y(51.8,-23.5,2,2,1.15),R(45.7,-36.5),R(44.6,-38.2),R(29.2,-17.2);const A=new Re(new wn(9,8),p);A.rotation.x=-Math.PI/2,A.position.set(42.2,.05,-17.6),e.add(A),x(10,24,-16.2,-14.2),x(10,24,-5.8,-3.8),y(13.8,-9,1.5,1.2,1);const P=xi(e,16,-10,16,8,10131340,.42,.032);P.material=new Lt({color:10131340,roughness:.65,metalness:.25,transparent:!0,opacity:.45}),g(20,22,-48,-46.2),y(28,-42.5,2.2,1.4,1.2),b(24,-38.7,1.1,1.1,3.8),b(24,-45.7,1.1,1.1,3.8),g(-22,-20,-48,-46.2),y(-28,-42.5,2.2,1.4,1.2),b(-24,-38.7,1.1,1.1,3.8),b(-24,-45.7,1.1,1.1,3.8),g(-24,-22,-38,-18),g(-56,-44,-18,-16),g(-30,-24,-18,-16),g(-57,-56,-46,-16,5.2),y(-39.5,-29.5,3.2,2.2,2),y(-43.3,-30.3,2,1.7,1.2),y(-48.7,-24,2.6,2,1.5),y(-31.3,-22.5,2.3,2.1,1.35),y(-47.7,-40.2,2,1.8,1.2),R(-29.6,-35.4),R(-50.3,-32.7),R(-44.2,-20.4);const T=new Re(new wn(7,7),new Lt({color:5069120,roughness:1}));T.rotation.x=-Math.PI/2,T.position.set(-49.2,.05,-43.6),e.add(T),g(-48,-46,-18,32),g(-28,-26,-18,32),g(-46,-28,32,34),g(-48,-18,44,46),g(-50,-48,32,46),g(-46,-44,0,2,1.6,l),g(-30,-28,0,2,1.6,l),b(-44,1,.9,.9,3.8),b(-30,1,.9,.9,3.8),y(-44.5,16,2.2,2.3,1.35),y(-30.7,26.5,1.7,1.7,1.1),R(-34.6,10.2),R(-41.2,27.8);for(let G=-8;G<34;G+=8){const ee=new Re(new xt(18,.4,3.4),l);ee.position.set(-37,3.7,G),ee.castShadow=!1,ee.userData.staticOpaque=!0,e.add(ee)}y(-13.2,33.4,2.1,1.7,1.2),y(13.2,33.4,2.1,1.7,1.2),R(-15.3,46.2),R(15.3,46.2),y(0,45.7,3.2,1.2,.65);const M={name:"A",center:{x:40,z:-27},rect:{minX:24,maxX:56,minZ:-46,maxZ:-6}},N={name:"B",center:{x:-40,z:-31},rect:{minX:-56,maxX:-24,minZ:-46,maxZ:-16}};Jm(e,M),Jm(e,N),Qm(e,0,38,"T","#a8452f"),Qm(e,0,-42,"CT","#3f6d9b");const B=(G,ee,K,ce,ue,_e,Oe=4.4,Le=1.1)=>{const We=new ei({map:P2(G,ee),transparent:!0,side:Ii,opacity:.92});for(const D of[0,Math.PI]){const Rt=new Re(new wn(Oe,Le),We);Rt.position.set(K,ce,ue),Rt.rotation.y=_e+D,e.add(Rt)}};B("MID","CONTROL / DOORS",0,4.15,2.55,0,5.4,1.25),B("A LONG","EAST APPROACH",40.02,2.55,21.5,Math.PI/2),B("B TUNNELS","WEST APPROACH",-45.92,2.5,24,Math.PI/2,5.2,1.2),B("CATWALK","ELEVATED ROUTE",16,1.85,-3.62,0,4.6,1.05),B("T SPAWN","INSURGENT STAGING",-17.94,2.35,31.2,Math.PI/2,3.4,.85),B("CT SPAWN","COUNTER-TERRORIST HQ",-17.94,2.35,-45.6,Math.PI/2,3.4,.85),B("A SITE","BOMBSITE ALPHA",40.5,3.05,-8.06,Math.PI,5,1.15),B("B SITE","BOMBSITE BRAVO",-47.5,3.05,-18.06,Math.PI,5,1.15);const k=new Re(new wn(7.5,7.5),new ei({map:Ql("A","#ddc79f",256,"BOMBSITE"),transparent:!0,side:Dn,opacity:.88}));k.position.set(34.2,3.3,-25.2),k.rotation.y=.3,e.add(k);const X=k.clone();X.material=new ei({map:Ql("B","#ddc79f",256,"BOMBSITE"),transparent:!0,side:Dn,opacity:.88}),X.position.set(-39.4,3.3,-27.2),X.rotation.y=-.2,e.add(X);const J=new Lt({map:Zm(),color:10192480,roughness:.82}),W=new gt,Q=new gt;W.position.set(-4,0,1.5),Q.position.set(4,0,1.5);const I=new Re(new xt(3.92,3.1,.2),J);I.position.set(1.96,1.55,0),I.castShadow=!0,I.receiveShadow=!0,W.add(I);const $=new Re(new xt(3.92,3.1,.2),J);$.position.set(-1.96,1.55,0),$.castShadow=!0,$.receiveShadow=!0,Q.add($);for(const[G,ee]of[[W,1],[Q,-1]]){for(const ce of[.8,2.2]){const ue=new Re(new xt(3.6,.12,.06),f);ue.position.set(ee*2,ce,.12),G.add(ue)}const K=new Re(new Kn(.09,8,6),f);K.position.set(ee*3.5,1.5,.18),G.add(K)}e.add(W,Q);const te=new Re(new xt(9,.6,.5),c);te.position.set(0,3.5,1.5),te.castShadow=!0,e.add(te);for(const[G,ee,K,ce,ue]of[[-20,10,20,12,4.8],[24,-14,54,-12,4.6],[-48,-20,-24,-18,4.6]]){const _e=new Jv([new L(G,ue,ee),new L((G+K)/2,ue-.35,(ee+ce)/2),new L(K,ue,ce)]),Oe=new Re(new yf(_e,16,.025,4,!1),f);Oe.userData.staticOpaque=!0,e.add(Oe)}const le=new Ds(16763780,12,16,1.8);le.position.set(-37,3.3,8),e.add(le);const Ee=new Ds(16763780,10,14,1.8);Ee.position.set(0,3.2,-28),e.add(Ee);const Ye=(G,ee)=>{let K=!1;for(const Le of G)if(Le.x>-7&&Le.x<7&&Math.abs(Le.z-1.5)<5.2){K=!0;break}const ce=K?1.28:0,ue=3.8,_e=(W.rotation.y+-Q.rotation.y)/2,Oe=_e+Math.max(-ue*ee,Math.min(ue*ee,ce-_e));W.rotation.y=-Oe,Q.rotation.y=Oe};return L2(e),{group:e,solids:m,mapRects:_,sites:{A:M,B:N},tSpawns:[{x:0,z:39},{x:-4.5,z:42},{x:4.5,z:42},{x:-9,z:39},{x:9,z:39}],ctSpawns:[{x:0,z:-42},{x:-4.5,z:-44},{x:4.5,z:-44},{x:-9,z:-41},{x:9,z:-41}],doors:{left:W,right:Q,open:0,target:0,position:{x:0,z:1.5}},updateDoors:Ye,getSiteAt:(G,ee)=>Xm(G,ee,M.rect,-1.2)?M:Xm(G,ee,N.rect,-1.2)?N:null}}class I2{constructor(){q(this,"heap",[])}push(e){this.heap.push(e);let t=this.heap.length-1;for(;t>0;){const i=t-1>>1;if(this.heap[i].f<=this.heap[t].f)break;[this.heap[i],this.heap[t]]=[this.heap[t],this.heap[i]],t=i}}pop(){if(this.heap.length===0)return null;const e=this.heap[0],t=this.heap.pop();if(this.heap.length>0){this.heap[0]=t;let i=0;for(;;){const r=i*2+1,s=r+1;let o=i;if(r<this.heap.length&&this.heap[r].f<this.heap[o].f&&(o=r),s<this.heap.length&&this.heap[s].f<this.heap[o].f&&(o=s),o===i)break;[this.heap[o],this.heap[i]]=[this.heap[i],this.heap[o]],i=o}}return e}get size(){return this.heap.length}}class D2{constructor(e){q(this,"step",1);q(this,"minX",-56);q(this,"maxX",56);q(this,"minZ",-48);q(this,"maxZ",48);q(this,"cols");q(this,"rows");q(this,"blocked");q(this,"clearance",.56);q(this,"blockers");q(this,"solids");this.solids=e,this.cols=Math.round((this.maxX-this.minX)/this.step)+1,this.rows=Math.round((this.maxZ-this.minZ)/this.step)+1,this.blocked=new Uint8Array(this.cols*this.rows),this.blockers=e.map(t=>t.rect);for(let t=0;t<this.rows;t++){const i=this.minZ+t*this.step;for(let r=0;r<this.cols;r++){const s=this.minX+r*this.step;let o=!1;for(const a of e)if(!(a.maxY<.25)&&jm(s,i,this.clearance,a.rect)){o=!0;break}o&&(this.blocked[t*this.cols+r]=1)}}}idx(e,t){return t*this.cols+e}isFree(e,t){return e>=0&&e<this.cols&&t>=0&&t<this.rows&&this.blocked[this.idx(e,t)]===0}cellToWorld(e,t){return{x:this.minX+e*this.step,z:this.minZ+t*this.step}}worldToCell(e){return{ix:Math.max(0,Math.min(this.cols-1,Math.round((e.x-this.minX)/this.step))),iz:Math.max(0,Math.min(this.rows-1,Math.round((e.z-this.minZ)/this.step)))}}isWalkable(e,t,i=0){for(const r of this.solids)if(!(r.maxY<.25)&&jm(e,t,this.clearance-.1+i,r.rect))return!1;return e>this.minX+.3&&e<this.maxX-.3&&t>this.minZ+.3&&t<this.maxZ-.3}nearestFree(e,t){if(this.isFree(e,t))return{ix:e,iz:t};for(let i=1;i<=7;i++){let r=null;for(let s=-i;s<=i;s++)for(let o=-i;o<=i;o++){if(Math.max(Math.abs(o),Math.abs(s))!==i)continue;const a=e+o,l=t+s;if(!this.isFree(a,l))continue;const c=o*o+s*s;(!r||c<r.d)&&(r={ix:a,iz:l,d:c})}if(r)return{ix:r.ix,iz:r.iz}}return null}heuristic(e,t,i,r){const s=Math.abs(e-i),o=Math.abs(t-r);return Math.max(s,o)+(Math.SQRT2-1)*Math.min(s,o)}findPath(e,t){let i=this.worldToCell(e),r=this.worldToCell(t);const s=this.nearestFree(i.ix,i.iz),o=this.nearestFree(r.ix,r.iz);if(!s||!o)return[];i=s,r=o;const a=this.idx(i.ix,i.iz),l=this.idx(r.ix,r.iz),c=this.cols*this.rows,u=new Float32Array(c);u.fill(1/0);const f=new Int32Array(c);f.fill(-1);const d=new Uint8Array(c),p=new I2;u[a]=0,p.push({idx:a,g:0,f:this.heuristic(i.ix,i.iz,r.ix,r.iz)});const m=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]];let _=!1,v=0;for(;p.size>0&&v++<18e3;){const R=p.pop();if(d[R.idx])continue;if(d[R.idx]=1,R.idx===l){_=!0;break}const b=R.idx%this.cols,A=Math.floor(R.idx/this.cols);for(const[P,T,M]of m){const N=b+P,B=A+T;if(!this.isFree(N,B)||P!==0&&T!==0&&(!this.isFree(b+P,A)||!this.isFree(b,A+T)))continue;const k=this.idx(N,B);if(d[k])continue;const X=R.g+M;X>=u[k]||(u[k]=X,f[k]=R.idx,p.push({idx:k,g:X,f:X+this.heuristic(N,B,r.ix,r.iz)}))}}if(!_)return[];const h=[];let g=l,x=0;for(;g!==-1&&x++<c;){const R=g%this.cols,b=Math.floor(g/this.cols);if(h.push(this.cellToWorld(R,b)),g===a)break;g=f[g]}h.reverse();const y=h;return y.length>0&&(y[0]={x:e.x,z:e.z}),y.length>1&&this.isWalkable(t.x,t.z,.1)&&(y[y.length-1]={x:t.x,z:t.z}),this.smooth(y)}smooth(e){if(e.length<=2)return e;const t=[e[0]];let i=0;for(let r=2;r<e.length;r++)_2(e[i].x,e[i].z,e[r].x,e[r].z,this.blockers,.5)||(t.push(e[r-1]),i=r-1);return t.push(e[e.length-1]),t}randomNearbyWalkable(e,t){for(let i=0;i<24;i++){const r=Math.random()*Math.PI*2,s=Math.random()*t,o=e.x+Math.cos(r)*s,a=e.z+Math.sin(r)*s;if(this.isWalkable(o,a,.1))return{x:o,z:a}}return e}}const U2={head:2,chest:1,stomach:.85,arm:.65,leg:.6},ec={ak47:{id:"ak47",name:"AK-47",shortName:"AK-47",slot:"primary",damage:36,fireInterval:100,automatic:!0,magSize:30,reserve:90,reloadTime:2.45,spreadBase:.0045,spreadShot:.0052,spreadMove:.018,recoilPitch:.014,recoilYaw:.007,range:130,armorPen:.775,speedFactor:.92,scoped:!1,accent:"#e3a64d",sound:{kind:"rifle",pitch:.8,duration:.24,volume:.75}},m4a4:{id:"m4a4",name:"M4A4",shortName:"M4A4",slot:"primary",damage:30,fireInterval:82,automatic:!0,magSize:30,reserve:90,reloadTime:2.15,spreadBase:.0032,spreadShot:.0028,spreadMove:.013,recoilPitch:.007,recoilYaw:.0038,range:125,armorPen:.7,speedFactor:.95,scoped:!1,accent:"#8fc7ff",sound:{kind:"rifle",pitch:1.22,duration:.18,volume:.62}},awp:{id:"awp",name:"AWP",shortName:"AWP",slot:"primary",damage:115,fireInterval:1450,automatic:!1,magSize:10,reserve:30,reloadTime:3.25,spreadBase:4e-4,spreadShot:.02,spreadMove:.05,recoilPitch:.043,recoilYaw:.009,range:180,armorPen:.95,speedFactor:.8,scoped:!0,accent:"#89d39f",sound:{kind:"heavy",pitch:.62,duration:.65,volume:.92}},glock:{id:"glock",name:"Glock-18",shortName:"GLOCK",slot:"secondary",damage:22,fireInterval:145,automatic:!1,magSize:20,reserve:120,reloadTime:1.75,spreadBase:.009,spreadShot:.0045,spreadMove:.014,recoilPitch:.0042,recoilYaw:.0026,range:75,armorPen:.47,speedFactor:1.02,scoped:!1,accent:"#e4c068",sound:{kind:"pistol",pitch:1.35,duration:.12,volume:.48}},usp:{id:"usp",name:"USP-S",shortName:"USP-S",slot:"secondary",damage:25,fireInterval:175,automatic:!1,magSize:12,reserve:96,reloadTime:2,spreadBase:.0064,spreadShot:.0038,spreadMove:.012,recoilPitch:.004,recoilYaw:.0018,range:85,armorPen:.5,speedFactor:1.02,scoped:!1,accent:"#a8d6ff",sound:{kind:"pistol",pitch:1.05,duration:.11,volume:.4}},deagle:{id:"deagle",name:"Desert Eagle",shortName:"DEAGLE",slot:"secondary",damage:48,fireInterval:330,automatic:!1,magSize:7,reserve:35,reloadTime:2.35,spreadBase:.0075,spreadShot:.009,spreadMove:.02,recoilPitch:.019,recoilYaw:.006,range:100,armorPen:.82,speedFactor:.98,scoped:!1,accent:"#f2c35e",sound:{kind:"deagle",pitch:.92,duration:.3,volume:.72}},knife:{id:"knife",name:"Tactical Knife",shortName:"KNIFE",slot:"melee",damage:55,fireInterval:430,automatic:!1,magSize:1,reserve:0,reloadTime:0,spreadBase:0,spreadShot:0,spreadMove:0,recoilPitch:.002,recoilYaw:.001,range:2.35,armorPen:.9,speedFactor:1.1,scoped:!1,accent:"#d8dde3",sound:{kind:"knife",pitch:1,duration:.14,volume:.35}}};function Vo(n){const e=ec[n];return{def:e,ammo:e.magSize,reserve:e.reserve}}function F2(n){return n==="T"?"glock":"usp"}function Pu(n,e,t){return{primary:e?Vo(e):null,secondary:Vo(t??F2(n)),melee:Vo("knife"),slot:e?"primary":"secondary"}}function O2(n,e){return e==="melee"?n.melee:e==="secondary"?n.secondary:n.primary}function en(n){return O2(n,n.slot)??n.secondary??n.melee}function e0(n,e){return e==="melee"||(e==="secondary"?!!n.secondary:!!n.primary)}const n_=[{id:"ak47",name:"AK-47",desc:"高伤害 · 剧烈后坐力",team:"T",kind:"primary"},{id:"m4a4",name:"M4A4",desc:"高射速 · 稳定弹道",team:"CT",kind:"primary"},{id:"awp",name:"AWP",desc:"一击必杀 · 右键开镜",team:"both",kind:"primary"},{id:"deagle",name:"沙漠之鹰",desc:"手枪重炮 · 7发弹匣",team:"both",kind:"pistol"},{id:"kevlar",name:"防弹衣",desc:"恢复 100 点护甲",team:"both",kind:"armor"}],k2=4.6,Lu=108,Nu=40,z2=3.2,B2=7,cs=1.62,us=.42,t0=13,H2=["Sable","Rook","Viper","Echo","Atlas"],V2=["Falcon","Jackal","Dune","Mako","Cobra"];function G2(n){return n==="CT"?"反恐精英":"恐怖分子"}function n0(n,e,t){return n+Ho(e-n)*t}class W2{constructor(e,t){q(this,"container");q(this,"onHud");q(this,"renderer");q(this,"scene");q(this,"camera");q(this,"map");q(this,"nav");q(this,"audio",new p2);q(this,"entities",[]);q(this,"humanId",null);q(this,"playerTeam","CT");q(this,"started",!1);q(this,"paused",!1);q(this,"buyOpen",!1);q(this,"matchOver",!1);q(this,"phase","menu");q(this,"round",1);q(this,"roundTime",Lu);q(this,"freezeEnd",0);q(this,"roundEndAt",0);q(this,"simTime",0);q(this,"ctScore",0);q(this,"tScore",0);q(this,"tStrategy","A");q(this,"playerPreferredPrimary",null);q(this,"playerPreferredPistol",null);q(this,"killfeed",[]);q(this,"killfeedId",0);q(this,"action",null);q(this,"message","");q(this,"messageSub","");q(this,"objective","");q(this,"hitMarkerUntil",0);q(this,"hitMarkerHead",!1);q(this,"damageFlash",0);q(this,"shake",0);q(this,"scoped",!1);q(this,"scopeHeld",!1);q(this,"fireHeld",!1);q(this,"semiLocked",!1);q(this,"interactHeld",!1);q(this,"showScoreboard",!1);q(this,"takeoverAt",-1);q(this,"spectateId",null);q(this,"lastHudAt",0);q(this,"lastFrame",performance.now());q(this,"menuAngle",0);q(this,"keys",new Set);q(this,"fpRoot",new gt);q(this,"fpWeaponHost",new gt);q(this,"fpWeapon",null);q(this,"fpWeaponId",null);q(this,"fpRecoil",0);q(this,"fpReload",0);q(this,"swayX",0);q(this,"swayY",0);q(this,"lastLookYaw",0);q(this,"lastLookPitch",0);q(this,"lockAcquiredAt",0);q(this,"bobPhase",0);q(this,"effects",[]);q(this,"explosionFlash",null);q(this,"exploLight",null);q(this,"bombMesh");q(this,"bombLed");q(this,"bombLight");q(this,"spotUntil",new Map);q(this,"nextTeamVision",0);q(this,"raf",0);q(this,"disposed",!1);q(this,"resizeObserver");q(this,"bomb",{planted:!1,plantedSite:null,carriedBy:null,dropped:!1,position:new L,timer:Nu,plantProgress:0,defuseProgress:0,nextBeep:0,plantedAt:0,exploded:!1,defused:!1});q(this,"handleKeyDown",e=>{if(!(!this.started||this.paused||this.matchOver)){if(e.code==="Tab"){e.preventDefault(),this.showScoreboard=!0,this.emitHud(!0);return}if(this.buyOpen){(e.code==="KeyB"||e.code==="Escape")&&(e.preventDefault(),this.closeBuy());return}if(["Space","KeyW","KeyA","KeyS","KeyD","KeyR","KeyE","Digit1","Digit2","Digit3","KeyB"].includes(e.code)&&e.preventDefault(),this.keys.add(e.code),!e.repeat){if(e.code==="KeyB"){this.phase==="freeze"&&(this.round===1?(this.message="手枪局禁止购买主武器",this.messageSub="全员仅可使用默认手枪",this.audio.empty(),this.emitHud(!0)):this.openBuy());return}if(e.code==="KeyR"&&this.startReload(this.getHuman(),!0),e.code==="KeyE"&&(this.interactHeld=!0),e.code==="Space"){const t=this.getHuman();if(t&&!t.alive){const i=this.pickSpectateTarget();i&&this.possess(i)}else this.activeGameplay()&&t&&this.tryJump(t)}e.code==="Digit1"&&this.switchSlot("primary"),e.code==="Digit2"&&this.switchSlot("secondary"),e.code==="Digit3"&&this.switchSlot("melee")}}});q(this,"handleKeyUp",e=>{this.keys.delete(e.code),e.code==="KeyE"&&(this.interactHeld=!1),e.code==="Tab"&&(this.showScoreboard=!1,this.emitHud(!0))});q(this,"handleBlur",()=>{this.keys.clear(),this.fireHeld=!1,this.scopeHeld=!1,this.interactHeld=!1});q(this,"handleResize",()=>{this.resize()});q(this,"handleMouseDown",e=>{if(!(!this.started||this.buyOpen)){if(document.pointerLockElement!==this.renderer.domElement){this.requestLock();return}this.paused||(e.button===0?(this.fireHeld=!0,this.semiLocked=!1):e.button===2&&(this.scopeHeld=!0))}});q(this,"handleMouseUp",e=>{e.button===0?(this.fireHeld=!1,this.semiLocked=!1):e.button===2&&(this.scopeHeld=!1)});q(this,"handleContextMenu",e=>{e.preventDefault()});q(this,"handleMouseMove",e=>{if(!this.started||this.paused||this.buyOpen||document.pointerLockElement!==this.renderer.domElement)return;const t=this.getHuman();if(!t||!t.alive||performance.now()-this.lockAcquiredAt<180)return;const i=_t(e.movementX,-90,90),r=_t(e.movementY,-90,90),s=.0021*(this.scoped?.48:1);t.yaw=Ho(t.yaw-i*s),t.pitch=_t(t.pitch-r*s,-1.3,1.3),this.lastLookYaw=_t(i*8e-4,-.035,.035),this.lastLookPitch=_t(r*5e-4,-.025,.025)});q(this,"handleWheel",e=>{if(!this.activeGameplay()||document.pointerLockElement!==this.renderer.domElement)return;e.preventDefault();const t=this.getHuman();if(!t||!t.alive)return;const r=["primary","secondary","melee"].filter(a=>e0(t.inventory,a));if(r.length<=1)return;const o=(r.indexOf(t.inventory.slot)+(e.deltaY>0?1:-1)+r.length)%r.length;this.switchSlot(r[o],t)});q(this,"handlePointerLockChange",()=>{if(!this.started){this.emitHud(!0);return}const e=document.pointerLockElement===this.renderer.domElement;!e&&!this.buyOpen&&!this.matchOver?(this.paused=!0,this.fireHeld=!1,this.scopeHeld=!1,this.interactHeld=!1):e&&(this.paused=!1,this.lockAcquiredAt=performance.now()),this.emitHud(!0)});this.container=e,this.onHud=t,this.renderer=new YT({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.setSize(e.clientWidth||1,e.clientHeight||1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=gv,this.renderer.toneMapping=_v,this.renderer.toneMappingExposure=1.05,this.renderer.outputColorSpace=It,this.renderer.domElement.className="game-canvas",this.renderer.domElement.tabIndex=0,e.appendChild(this.renderer.domElement),this.scene=new $T,this.scene.fog=new vf(13482900,62,152),this.camera=new En(75,this.aspect(),.045,300),this.camera.rotation.order="YXZ",this.scene.add(this.camera),this.setupSky(),this.setupLights(),this.map=N2(this.scene),this.nav=new D2(this.map.solids),this.camera.add(this.fpRoot);const i=new Ds(16769725,2.4,2.6,2);i.position.set(.35,.25,.2),this.camera.add(i),this.fpRoot.position.set(.27,-.29,-.68),this.fpRoot.add(this.fpWeaponHost),this.fpRoot.visible=!1;const r=this.buildBombMesh();this.bombMesh=r.group,this.bombLed=r.led,this.bombLight=r.light,this.bombMesh.visible=!1,this.scene.add(this.bombMesh),this.bindEvents(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.menuAngle=Math.PI*.22,this.loop=this.loop.bind(this),this.raf=requestAnimationFrame(this.loop),this.emitHud(!0)}aspect(){const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;return e/Math.max(1,t)}setupSky(){const e={topColor:{value:new Ge(8300741)},horizonColor:{value:new Ge(15259048)},bottomColor:{value:new Ge(12295788)},sunDir:{value:new L(.55,.45,.25).normalize()}},t=new Ui({side:an,depthWrite:!1,fog:!1,uniforms:e,vertexShader:`
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        varying vec3 vWorld;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        void main() {
          vec3 dir = normalize(vWorld);
          float h = clamp(dir.y * 1.15 + 0.08, 0.0, 1.0);
          vec3 col = mix(horizonColor, topColor, pow(h, 0.7));
          col = mix(bottomColor, col, clamp(h * 4.0, 0.0, 1.0));
          float sun = pow(max(dot(dir, sunDir), 0.0), 380.0);
          float halo = pow(max(dot(dir, sunDir), 0.0), 14.0);
          col += vec3(1.0, 0.83, 0.56) * (sun * 1.8 + halo * 0.18);
          gl_FragColor = vec4(col, 1.0);
        }
      `}),i=new Re(new Kn(220,32,18),t);i.frustumCulled=!1,i.renderOrder=-10,this.scene.add(i)}setupLights(){const e=new h2(12178920,8019254,1.25);this.scene.add(e);const t=new Wm(16769718,2.55);t.position.set(38,64,24),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=-70,t.shadow.camera.right=70,t.shadow.camera.top=72,t.shadow.camera.bottom=-72,t.shadow.camera.near=4,t.shadow.camera.far=160,t.shadow.bias=-4e-4,t.shadow.normalBias=.025,this.scene.add(t);const i=new Wm(9152198,.38);i.position.set(-40,22,-38),this.scene.add(i)}buildBombMesh(){const e=new gt,t=new Re(new xt(.48,.24,.34),new Lt({color:5260335,roughness:.85,metalness:.15}));t.castShadow=!0,t.position.y=.14,e.add(t);const i=new Re(new xt(.38,.03,.24),new Lt({color:1514264,roughness:.5,metalness:.4}));i.position.set(0,.27,0),e.add(i);const r=new Lt({color:5901063,emissive:16719112,emissiveIntensity:1,roughness:.3}),s=new Re(new Kn(.045,8,6),r);s.position.set(.11,.3,.06),e.add(s);const o=new Lt({color:10103583,roughness:.6});for(let l=0;l<3;l++){const c=new Re(new va(.18+l*.02,.008,4,16,Math.PI*1.25),o);c.rotation.x=Math.PI/2,c.rotation.z=l*.8,c.position.y=.29,e.add(c)}const a=new Ds(16722705,0,5,2);return a.position.set(.11,.36,.06),e.add(a),{group:e,led:s,light:a}}startGame(e){this.audio.init(),this.clearEntities(),this.playerTeam=e,this.playerPreferredPrimary=null,this.playerPreferredPistol=null,this.ctScore=0,this.tScore=0,this.round=1,this.matchOver=!1,this.started=!0,this.paused=!1,this.buyOpen=!1,this.showScoreboard=!1,this.createEntities(),this.startRound(1),this.requestLock(),this.emitHud(!0)}restartMatch(){this.audio.init();const e=this.playerTeam;this.startGame(e)}returnToMenu(){this.started=!1,this.paused=!1,this.buyOpen=!1,this.phase="menu",this.humanId=null,this.spectateId=null,this.clearEntities(),this.bombMesh.visible=!1,this.fpRoot.visible=!1,this.scoped=!1,document.pointerLockElement&&document.exitPointerLock(),this.emitHud(!0)}resume(){this.audio.init(),this.paused=!1,this.requestLock(),this.emitHud(!0)}setBuyOpen(e){e?this.openBuy():this.closeBuy()}buyOption(e){if(this.phase!=="freeze"||this.round===1||!this.buyOpen)return;const t=this.getHuman();if(!t||!t.alive)return;const i=n_.find(r=>r.id===e);if(!(!i||i.team!=="both"&&i.team!==t.team)){if(i.kind==="primary"){const r=e;t.inventory.primary=Vo(r),t.inventory.slot="primary",this.playerPreferredPrimary=r,t.reloading=!1,this.setEntityWeaponView(t),this.message=`已装备 ${ec[r].name}`,this.messageSub="军械库配置将在本回合生效"}else if(i.kind==="pistol"){const r=e;t.inventory.secondary=Vo(r),t.inventory.slot="secondary",this.playerPreferredPistol=r,t.reloading=!1,this.setEntityWeaponView(t),this.message=`已装备 ${ec[r].name}`,this.messageSub="副武器已更换"}else e==="kevlar"&&(t.armor=100,this.message="已穿戴防弹衣",this.messageSub="护甲将吸收部分伤害");this.audio.pickup(),this.emitHud(!0)}}openBuy(){!this.started||this.phase!=="freeze"||(this.buyOpen=!0,this.fireHeld=!1,this.scopeHeld=!1,this.scoped=!1,document.pointerLockElement&&document.exitPointerLock(),this.emitHud(!0))}closeBuy(){this.buyOpen=!1,this.paused=!1,this.requestLock(),this.emitHud(!0)}requestLock(){if(!this.started)return;const e=this.renderer.domElement;try{const t=e.requestPointerLock();t&&typeof t.catch=="function"&&t.catch(()=>{})}catch{}}clearEntities(){for(const e of this.entities)this.scene.remove(e.model.root);this.entities=[],this.humanId=null}createEntities(){const e=(t,i)=>{for(let r=0;r<5;r++){const s=new y2(t);this.scene.add(s.root);const o=`${t.toLowerCase()}${r}`,a=t===this.playerTeam&&r===0,l={id:o,name:a?"你":i[r],team:t,teamIndex:r,position:new L,yaw:t==="T"?Math.PI:0,pitch:0,health:100,armor:0,alive:!0,inventory:Pu(t),model:s,ai:null,kills:0,deaths:0,nextFireAt:0,reloading:!1,reloadEnd:0,bloom:0,velocityY:0,onGround:!0,footstepTimer:0,lastDamageAt:-99,speed:0,lastPosition:new L,deathAt:0};s.setWeapon("knife"),this.entities.push(l)}};e("CT",H2),e("T",V2)}startRound(e){var r;this.round=e,this.phase="freeze",this.freezeEnd=this.simTime+k2,this.roundEndAt=0,this.roundTime=Lu,this.killfeed=[],this.action=null,this.buyOpen=!1,this.scoped=!1,this.scopeHeld=!1,this.fireHeld=!1,this.semiLocked=!1,this.interactHeld=!1,this.damageFlash=0,this.shake=0,this.spotUntil.clear(),this.tStrategy=Math.random()<.5?"A":"B",this.bomb.planted=!1,this.bomb.plantedSite=null,this.bomb.carriedBy=null,this.bomb.dropped=!1,this.bomb.timer=Nu,this.bomb.plantProgress=0,this.bomb.defuseProgress=0,this.bomb.exploded=!1,this.bomb.defused=!1,this.bomb.nextBeep=0,this.bomb.plantedAt=0,this.bomb.position.set(0,.02,0),this.bombMesh.visible=!1,this.bombMesh.position.copy(this.bomb.position),(r=this.explosionFlash)==null||r.removeFromParent(),this.explosionFlash=null,this.exploLight&&(this.exploLight.removeFromParent(),this.exploLight=null),this.entities.forEach((s,o)=>{const l=(s.team==="T"?this.map.tSpawns:this.map.ctSpawns)[s.teamIndex];s.position.set(l.x+(o%2===0?.18:-.18),0,l.z),s.yaw=s.team==="T"?0:Math.PI,s.pitch=0,s.alive=!0,s.health=100,s.velocityY=0,s.onGround=!0,s.bloom=0,s.nextFireAt=0,s.reloading=!1,s.reloadEnd=0,s.speed=0,s.deathAt=0,s.lastPosition.copy(s.position),s.footstepTimer=0,s.model.reset(),s.model.root.position.copy(s.position),s.model.root.rotation.y=s.yaw,s.model.setVisible(!0),this.giveLoadout(s,e),s.model.setWeapon(en(s.inventory).def.id),s.ai=this.createAIState()});const t=this.entities.find(s=>s.team===this.playerTeam&&s.teamIndex===0);t&&(this.humanId=t.id,this.spectateId=null,this.takeoverAt=-1,this.camera.fov=75,this.camera.updateProjectionMatrix(),this.possess(t,!0),this.camera.position.set(t.position.x,t.position.y+cs,t.position.z),this.camera.rotation.set(t.pitch,t.yaw,0,"YXZ"));const i=this.aliveEntities("T");if(i.length){const s=i[Math.floor(Math.random()*i.length)];this.bomb.carriedBy=s.id,this.bomb.dropped=!1,this.bomb.position.copy(s.position),this.bombMesh.visible=!0}this.killfeed=[],this.scoped=!1,this.objective=this.playerTeam==="T"?this.round===1?"手枪局：携带 C4 推进至 A 或 B 点并安放炸弹":`目标：${this.tStrategy} 点 · 安放 C4 或清除所有 CT`:"目标：阻止 T 安放 C4，或拆除已安放的炸弹",this.message=`第 ${this.round} 回合 · ${this.round===1?"手枪局":this.tStrategy+" 点进攻"}`,this.messageSub=this.round===1?"全员仅装备默认手枪与战术刀 · 无护甲":this.phase==="freeze"?"准备阶段 · 按 B 打开军械库":"",this.updateBombAuxiliary(),this.emitHud(!0)}giveLoadout(e,t){if(t===1)e.inventory=Pu(e.team),e.armor=0;else{const i=e.team===this.playerTeam&&e.teamIndex===0,r=e.team==="T"?"ak47":"m4a4";let s=r,o=e.team==="T"?"glock":"usp";e.teamIndex===4&&(s="awp"),(e.teamIndex===2||e.teamIndex===3)&&(o="deagle"),i&&(s=this.playerPreferredPrimary??r,o=this.playerPreferredPistol??(e.team==="T"?"glock":"usp")),e.inventory=Pu(e.team,s,o),e.armor=100}}createAIState(){return{mode:"idle",targetId:null,targetVisible:!1,lastSeen:null,lastSeenAt:-99,nextThink:0,reactionUntil:0,nextFireAt:0,burstLeft:3,path:[],pathIndex:0,pathGoal:null,goalKey:"",nextRepathAt:0,wantsPlant:!1,wantsDefuse:!1,strafeDir:Math.random()<.5?-1:1,nextStrafeAt:0,stuckCheckAt:0,lastCheck:{x:0,z:0},routeDone:!1,arrivedAt:0,holdPoint:null}}getHuman(){return this.humanId?this.entities.find(e=>e.id===this.humanId)??null:null}getEntity(e){return e?this.entities.find(t=>t.id===e)??null:null}aliveEntities(e){return this.entities.filter(t=>t.team===e&&t.alive)}possess(e,t=!1){if(!e.alive)return;const i=this.getHuman();i&&i.id!==e.id&&i.model.setVisible(!0),this.humanId=e.id,this.spectateId=null,this.takeoverAt=-1,e.model.setVisible(!1),this.scoped=!1,this.scopeHeld=!1,this.fireHeld=!1,this.semiLocked=!1,this.reloadingViewSync(e),this.message=t?this.message:`已接管 ${e.name}`,this.messageSub=t?this.messageSub:"你正在控制这名队友",this.audio.pickup(),this.emitHud(!0)}reloadingViewSync(e){const t=en(e.inventory);this.updateFPWeapon(t.def.id)}setEntityWeaponView(e){e.model.setWeapon(en(e.inventory).def.id),e.id===this.humanId&&this.updateFPWeapon(en(e.inventory).def.id)}bindEvents(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.handleBlur),window.addEventListener("mouseup",this.handleMouseUp),document.addEventListener("pointerlockchange",this.handlePointerLockChange),window.addEventListener("resize",this.handleResize);const e=this.renderer.domElement;e.addEventListener("mousedown",this.handleMouseDown),e.addEventListener("contextmenu",this.handleContextMenu),e.addEventListener("mousemove",this.handleMouseMove),e.addEventListener("wheel",this.handleWheel,{passive:!1})}unbindEvents(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.handleBlur),window.removeEventListener("mouseup",this.handleMouseUp),document.removeEventListener("pointerlockchange",this.handlePointerLockChange),window.removeEventListener("resize",this.handleResize);const e=this.renderer.domElement;e.removeEventListener("mousedown",this.handleMouseDown),e.removeEventListener("contextmenu",this.handleContextMenu),e.removeEventListener("mousemove",this.handleMouseMove),e.removeEventListener("wheel",this.handleWheel)}activeGameplay(){return this.started&&!this.paused&&!this.buyOpen&&(this.phase==="live"||this.phase==="planted")}loop(e){if(this.disposed)return;this.raf=requestAnimationFrame(this.loop);const t=Math.min(.05,Math.max(.001,(e-this.lastFrame)/1e3));if(this.lastFrame=e,this.started)!this.paused&&!this.buyOpen&&(this.simTime+=t,this.update(t));else{this.menuAngle+=t*.045;const i=69;this.camera.position.set(Math.cos(this.menuAngle)*i,36,Math.sin(this.menuAngle)*i*.7+8),this.camera.lookAt(0,1.5,-5),this.camera.fov=58,this.camera.updateProjectionMatrix(),this.fpRoot.visible=!1}this.renderer.render(this.scene,this.camera),this.started&&!this.paused&&!this.buyOpen&&e-this.lastHudAt>55&&this.emitHud()}update(e){this.updateDoors(e),this.updateReloads(e),this.updatePlayer(e),this.updateBots(e),this.updateBombCarry(),this.updateBombActions(e),this.updateBombState(e),this.updateRoundState(e),this.updateEntityVisuals(e),this.updateEffects(e),this.updateCamera(e),this.updateTeamVision(),this.updateSpotCleanup()}updateDoors(e){const t=this.entities.filter(i=>i.alive).map(i=>({x:i.position.x,z:i.position.z}));this.map.updateDoors(t,e)}updateReloads(e){for(const t of this.entities)if(t.alive&&(t.bloom=Math.max(0,t.bloom-e*(.045+t.bloom*5.8)),t.reloading&&this.simTime>=t.reloadEnd)){t.reloading=!1;const i=en(t.inventory),r=i.def.magSize-i.ammo,s=Math.min(r,i.reserve);i.ammo+=s,i.reserve-=s,this.setEntityWeaponView(t),t.id===this.humanId&&(this.fpReload=0)}}updatePlayer(e){const t=this.getHuman();if(!t)return;if(!t.alive){this.updateSpectator(e);return}const r=this.activeGameplay()&&!this.buyOpen,s=en(t.inventory),o=this.updateMovement(t,e,r,this.keys);t.speed=o,(!t.onGround||t.velocityY!==0)&&(t.velocityY-=19.5*e,t.position.y+=t.velocityY*e,t.position.y<=0?(t.position.y=0,t.velocityY=0,t.onGround=!0):t.onGround=!1);const a=this.scoped;if(s.def.scoped&&t.alive?this.scoped=this.scopeHeld&&!t.reloading&&(this.phase==="live"||this.phase==="planted"||this.phase==="freeze"):this.scoped=!1,this.scoped!==a&&this.audio.scope(),t.reloading?this.fpReload=Math.min(1,1-(t.reloadEnd-this.simTime)/Math.max(.01,s.def.reloadTime)):this.fpReload=Math.max(0,this.fpReload-e*5),r&&this.fireHeld&&(s.def.automatic||!this.semiLocked)){const l=this.tryFire(t);!s.def.automatic&&l&&(this.semiLocked=!0)}if(o>.4&&t.onGround){if(t.footstepTimer-=e,t.footstepTimer<=0){const l=o>3.2;t.footstepTimer=l?.35:.55,this.audio.footstep(l,0,0)}}else t.footstepTimer=Math.min(t.footstepTimer,.1);this.updateScopeFov(e)}updateSpectator(e){var i;const t=this.aliveEntities(this.playerTeam);if(!t.length){this.takeoverAt=-1,this.spectateId=null;return}if((!this.spectateId||!((i=this.getEntity(this.spectateId))!=null&&i.alive))&&(this.spectateId=t[0].id,this.takeoverAt=this.simTime+2.4),this.takeoverAt>0&&this.simTime>=this.takeoverAt){const r=this.getEntity(this.spectateId);r&&r.alive&&this.possess(r)}}pickSpectateTarget(){const e=this.aliveEntities(this.playerTeam);if(!e.length)return null;if(this.spectateId){const t=this.getEntity(this.spectateId);if(t&&t.alive)return t}return e[0]}updateScopeFov(e){const t=this.scoped?30:75,i=zt.damp(this.camera.fov,t,13,e);Math.abs(i-this.camera.fov)>.01&&(this.camera.fov=i,this.camera.updateProjectionMatrix())}updateMovement(e,t,i,r){if(!i)return e.speed=0,0;const s=en(e.inventory);let o=0,a=0;r.has("KeyW")&&(o+=1),r.has("KeyS")&&(o-=1),r.has("KeyD")&&(a+=1),r.has("KeyA")&&(a-=1);const l=-Math.sin(e.yaw),c=-Math.cos(e.yaw),u=Math.cos(e.yaw),f=-Math.sin(e.yaw);let d=l*o+u*a,p=c*o+f*a;const m=Math.hypot(d,p);let _=0;return m>.01&&(d/=m,p/=m,_=r.has("ShiftLeft")||r.has("ShiftRight")?2.65:5.15,this.scoped&&(_*=.52),_*=s.def.speedFactor,e.reloading&&(_*=.9),e.position.x+=d*_*t,e.position.z+=p*_*t,this.resolveEntityCollisions(e)),_}tryJump(e){e.onGround&&(e.velocityY=6.2,e.onGround=!1,e.position.y+=.02)}resolveEntityCollisions(e){for(let t=0;t<2;t++)for(const i of this.map.solids)if(!(i.maxY<e.position.y+.2)&&e.position.x+us>i.rect.minX&&e.position.x-us<i.rect.maxX&&e.position.z+us>i.rect.minZ&&e.position.z-us<i.rect.maxZ){const r=g2(e.position.x,e.position.z,us,i.rect);e.position.x=r.x,e.position.z=r.z}e.position.x=_t(e.position.x,-56.5,56.5),e.position.z=_t(e.position.z,-48.5,48.5)}separateEntities(){const e=this.entities.filter(t=>t.alive);for(let t=0;t<e.length;t++)for(let i=t+1;i<e.length;i++){const r=e[t],s=e[i],o=s.position.x-r.position.x,a=s.position.z-r.position.z,l=Math.hypot(o,a),c=us*1.7;if(l>1e-4&&l<c){const u=(c-l)*.5,f=o/l,d=a/l;r.position.x-=f*u,r.position.z-=d*u,s.position.x+=f*u,s.position.z+=d*u,r.alive&&this.resolveEntityCollisions(r),s.alive&&this.resolveEntityCollisions(s)}}}startReload(e,t){if(!e||!e.alive||e.reloading)return;const i=en(e.inventory);if(i.def.id!=="knife"){if(i.ammo>=i.def.magSize||i.reserve<=0){t&&this.audio.empty();return}this.phase!=="live"&&this.phase!=="planted"&&this.phase!=="freeze"||(e.reloading=!0,e.reloadEnd=this.simTime+i.def.reloadTime,this.scoped=!1,t&&(this.audio.reload(i.def.reloadTime,i.def.sound.kind),this.fpReload=.001))}}switchSlot(e,t){const i=t??this.getHuman();!i||!i.alive||!e0(i.inventory,e)||i.inventory.slot===e||this.phase==="roundEnd"||this.phase==="menu"||(i.inventory.slot=e,i.reloading=!1,i.nextFireAt=this.simTime+.18,this.scoped=!1,this.semiLocked=!1,this.fireHeld=!1,this.setEntityWeaponView(i),i.id===this.humanId&&this.audio.pickup(),this.emitHud(!0))}currentSpread(e){const t=en(e.inventory);if(t.def.id==="knife")return .01;let i=t.def.spreadBase+e.bloom;const r=_t(e.speed/5,0,1);return i+=r*t.def.spreadMove,e.onGround||(i+=.05),e.reloading&&(i+=.04),this.scoped&&(i*=.18),i}tryFire(e){if(!e.alive||this.phase!=="live"&&this.phase!=="planted"||this.simTime<e.nextFireAt||e.reloading)return!1;const t=en(e.inventory);if(t.def.id!=="knife"&&t.ammo<=0)return e.id===this.humanId&&(this.audio.empty(),this.message="弹匣已空 · 按 R 换弹",this.messageSub=t.reserve>0?"换弹后继续射击":"没有备用弹药",this.emitHud(!0)),t.reserve>0&&this.startReload(e,!1),!1;if(e.nextFireAt=this.simTime+t.def.fireInterval/1e3,t.def.id==="knife")this.audio.knife(),e.id===this.humanId&&(this.fpRecoil=.5);else{t.ammo-=1,e.bloom=Math.min(.075,e.bloom+t.def.spreadShot),e.pitch=_t(e.pitch+t.def.recoilPitch*Xe(.85,1.15),-1.35,1.35),e.yaw=Ho(e.yaw+Xe(-1,1)*t.def.recoilYaw),e.id===this.humanId&&(this.fpRecoil=Math.min(1,this.fpRecoil+.9),this.shake=Math.min(.28,this.shake+t.def.recoilPitch*1.2));const s=this.getHuman(),o=s?Pt({x:s.position.x,z:s.position.z},{x:e.position.x,z:e.position.z}):0,a=this.audioPan(e.position);this.audio.shot(t.def,o,a);const l=e.model.getWeaponRoot();l&&qm(l),e.id===this.humanId&&this.fpWeapon&&qm(this.fpWeapon,.05)}const i=new L(e.position.x,e.position.y+cs,e.position.z),r=this.getShotDirection(e,t);return this.resolveShot(e,i,r,t,t.def.id==="knife"?"knife":"gun"),t.def.id!=="knife"&&this.alertNearbyBots(e),t.def.id!=="knife"&&t.ammo===0&&t.reserve>0&&this.startReload(e,e.id===this.humanId),this.emitHud(),!0}getShotDirection(e,t){var o;if(e.id===this.humanId){const a=this.currentSpread(e),l=e.yaw+Xe(-a,a),c=_t(e.pitch+Xe(-a,a),-1.45,1.45);return new L(-Math.sin(l)*Math.cos(c),Math.sin(c),-Math.cos(l)*Math.cos(c)).normalize()}const i=this.getEntity(((o=e.ai)==null?void 0:o.targetId)??null);if(i&&i.alive){const a=new L(e.position.x,e.position.y+cs,e.position.z),l=Math.random()<(t.def.id==="awp"?.18:.09),u=new L(i.position.x,i.position.y+(l?1.65:Xe(1.05,1.35)),i.position.z).sub(a).normalize(),f=i.position.distanceTo(e.position),d=1+_t(e.speed/4.2,0,1)*.8,p=(t.def.id==="awp"?.014:.032)*(1+f/38)*d;return u.x+=Xe(-p,p),u.y+=Xe(-p*.65,p*.65),u.z+=Xe(-p,p),u.normalize()}const r=e.yaw,s=e.pitch;return new L(-Math.sin(r)*Math.cos(s),Math.sin(s),-Math.cos(r)*Math.cos(s))}resolveShot(e,t,i,r,s){const o=r.def.range;let a=1/0;for(const d of this.map.solids){const p=Ru(t.x,t.y,t.z,i.x,i.y,i.z,d.rect.minX,d.minY,d.rect.minZ,d.rect.maxX,d.maxY,d.rect.maxZ);p!==null&&p>=0&&p<a&&(a=p)}let l=null,c="chest",u=1/0;for(const d of this.entities){if(!d.alive||d.team===e.team||Pt({x:e.position.x,z:e.position.z},{x:d.position.x,z:d.position.z})>o+3)continue;const p=d.model.getHitboxes(d.position,d.yaw,d.alive);for(const m of p){const _=m.box,v=Ru(t.x,t.y,t.z,i.x,i.y,i.z,_.min.x,_.min.y,_.min.z,_.max.x,_.max.y,_.max.z);v!==null&&v>=0&&v<u&&(u=v,l=d,c=m.part)}}const f=new L;if(l&&u<a&&u<=o){f.copy(t).addScaledVector(i,u);const p=1-_t((u-34)/180,0,.42),m=r.def.damage*U2[c]*p;this.damageEntity(l,e,m,c,r,f),s==="gun"&&this.spawnTracer(t,f,16178336),this.spawnImpact(f,9382431,7,!0)}else a<1/0&&a<=o?(f.copy(t).addScaledVector(i,a),s==="gun"&&(this.spawnTracer(t,f,15323027),this.spawnImpact(f,13020541,5,!1))):(f.copy(t).addScaledVector(i,o),s==="gun"&&this.spawnTracer(t,f,15323027))}damageEntity(e,t,i,r,s,o){if(!e.alive)return;let a=i;if(e.armor>0){const c=a*.5*(1-s.def.armorPen),u=Math.min(e.armor,c);e.armor=Math.max(0,e.armor-u),a-=u}e.health=Math.max(0,e.health-a),e.lastDamageAt=this.simTime;const l=this.getHuman();t.id===this.humanId&&l&&(this.hitMarkerUntil=this.simTime+.22,this.hitMarkerHead=r==="head",this.audio.hit(r==="head"),this.shake=Math.min(.1,this.shake+.02)),e.id===this.humanId&&(this.damageFlash=Math.min(1,this.damageFlash+a/55),this.shake=Math.min(.65,this.shake+a/220),this.audio.damage()),e.ai&&(!e.ai.targetId||Math.random()<.75)&&(e.ai.targetId=t.id,e.ai.targetVisible=!1,e.ai.lastSeen={x:t.position.x,z:t.position.z},e.ai.lastSeenAt=this.simTime,e.ai.reactionUntil=this.simTime+Xe(.12,.3)),e.health<=0&&this.killEntity(e,t,s,r==="head"),this.emitHud()}killEntity(e,t,i,r){if(e.alive){if(e.alive=!1,e.deathAt=this.simTime,e.deaths++,t.kills++,e.velocityY=0,this.killfeed.push({id:++this.killfeedId,killer:t.name,victim:e.name,killerTeam:t.team,victimTeam:e.team,weapon:i.def.shortName,headshot:r,age:0,at:this.simTime}),this.killfeed.length>6&&this.killfeed.shift(),this.audio.kill(),this.bomb.carriedBy===e.id&&!this.bomb.planted&&(this.bomb.carriedBy=null,this.bomb.dropped=!0,this.bomb.position.set(e.position.x,.02,e.position.z),this.bombMesh.visible=!0,this.bombMesh.position.copy(this.bomb.position),e.team===this.playerTeam&&(this.message="C4 已掉落",this.messageSub="队友可以靠近拾取炸弹")),e.id===this.humanId){const s=this.aliveEntities(this.playerTeam);s.length?(this.spectateId=s[0].id,this.takeoverAt=this.simTime+2.5,this.message="你已阵亡",this.messageSub="2.5 秒后自动接管存活队友 · 按空格立即接管"):(this.message="你已阵亡",this.messageSub="队伍已无存活成员"),this.fireHeld=!1,this.scopeHeld=!1,this.scoped=!1}this.emitHud(!0)}}alertNearbyBots(e){for(const t of this.entities){if(!t.alive||t.team===e.team||!t.ai||t.ai.targetVisible)continue;Pt({x:t.position.x,z:t.position.z},{x:e.position.x,z:e.position.z})<19&&(t.ai.targetId=e.id,t.ai.lastSeen={x:e.position.x,z:e.position.z},t.ai.lastSeenAt=this.simTime,t.ai.reactionUntil=this.simTime+Xe(.2,.45))}}audioPan(e){const t=this.getHuman();if(!t)return 0;const i=e.x-t.position.x,r=e.z-t.position.z,s=Math.cos(t.yaw),o=-Math.sin(t.yaw),a=Math.max(1,Math.hypot(i,r));return _t((i*s+r*o)/a,-1,1)}updateBots(e){if(this.phase!=="live"&&this.phase!=="planted"){for(const t of this.entities)!t.alive||t.id===this.humanId||!t.ai||(t.ai.wantsPlant=!1,t.ai.wantsDefuse=!1);return}for(const t of this.entities){if(!t.alive||t.id===this.humanId||!t.ai)continue;const i=t.ai,r=this.simTime;if(r>=i.nextThink&&(i.nextThink=r+Xe(.13,.2),this.aiThink(t,i)),i.targetId){const o=this.getEntity(i.targetId);(!o||!o.alive)&&(i.targetId=null,i.targetVisible=!1)}const s=this.getEntity(i.targetId);s&&s.alive&&i.targetVisible?this.aiCombat(t,i,s,e):s&&s.alive&&i.lastSeen&&r-i.lastSeenAt<5?this.aiInvestigate(t,i,e):(i.targetId=i.targetId&&s&&s.alive?i.targetId:null,this.aiObjective(t,i,e))}this.separateEntities()}aiThink(e,t){const i=this.simTime,r=this.entities.filter(a=>a.alive&&a.team!==e.team);let s=null,o=-1/0;for(const a of r){const l=Pt({x:e.position.x,z:e.position.z},{x:a.position.x,z:a.position.z});if(l>52)continue;if(t.targetId!==a.id&&l>3){const u=a.position.x-e.position.x,f=a.position.z-e.position.z,d=-Math.sin(e.yaw),p=-Math.cos(e.yaw);if((u*d+f*p)/Math.max(.001,l)<-.34)continue}if(!this.hasLineOfSight(e,a))continue;const c=-l+(a.id===t.targetId?7:0)+(a.health<40?5:0);c>o&&(o=c,s=a)}s?(t.targetId!==s.id&&(t.reactionUntil=i+Xe(.24,.52),t.burstLeft=Math.floor(Xe(2,6))),t.targetId=s.id,t.targetVisible=!0,t.lastSeen={x:s.position.x,z:s.position.z},t.lastSeenAt=i):(t.targetVisible=!1,t.targetId&&t.lastSeen&&i-t.lastSeenAt>5.5&&(t.targetId=null))}hasLineOfSight(e,t){const i=[new L(e.position.x,e.position.y+cs,e.position.z)],r=[new L(t.position.x,t.position.y+1.55,t.position.z),new L(t.position.x,t.position.y+1.1,t.position.z),new L(t.position.x,t.position.y+.7,t.position.z)];for(const s of i)for(const o of r){const a=o.clone().sub(s),l=a.length();if(l<.01||(a.divideScalar(l),this.lineClear(s,a,l-.2)))return!0}return!1}lineClear(e,t,i){for(const r of this.map.solids){const s=Ru(e.x,e.y,e.z,t.x,t.y,t.z,r.rect.minX,r.minY,r.rect.minZ,r.rect.maxX,r.maxY,r.rect.maxZ);if(s!==null&&s>=0&&s<i)return!1}return!0}aiCombat(e,t,i,r){t.mode="combat",t.wantsPlant=!1,t.wantsDefuse=!1;const s=i.position.x-e.position.x,o=i.position.z-e.position.z,a=Math.hypot(s,o),l=Math.max(.001,a),c=i.position.y+(Math.random()<.5?1.55:1.2),u=Math.atan2(-s,-o),f=Math.atan2(c-(e.position.y+cs),Math.max(.2,a));e.yaw=So(e.yaw,u,8.6*r),e.pitch=n0(e.pitch,f,Math.min(1,r*8));const d=Math.abs(Ho(e.yaw-u)),p=en(e.inventory),m=this.simTime;m>=t.reactionUntil&&d<.16&&!e.reloading&&m>=e.nextFireAt&&(t.burstLeft<=0?(t.burstLeft=Math.floor(Xe(3,7)),e.nextFireAt=m+Xe(.28,.7)):(this.tryFire(e)&&t.burstLeft--,e.nextFireAt=Math.max(e.nextFireAt,m+p.def.fireInterval/1e3*Xe(1.02,1.55)))),e.reloading&&p.ammo>0&&(e.reloading=!1);let _=0,v=0;const h=this.simTime;a>15?(_=s/l,v=o/l):a<4.5?(_=-s/l,v=-o/l):(h>t.nextStrafeAt&&(t.strafeDir*=-1,t.nextStrafeAt=h+Xe(.5,1.3)),_=-o/l*t.strafeDir,v=s/l*t.strafeDir);const g=(a>15?3.4:2.15)*p.def.speedFactor;e.position.x+=_*g*r,e.position.z+=v*g*r,this.resolveEntityCollisions(e),e.speed=Math.hypot(_,v)*g}aiInvestigate(e,t,i){if(t.mode="investigate",t.wantsPlant=!1,t.wantsDefuse=!1,!t.lastSeen)return;const r=t.lastSeen;if(Pt({x:e.position.x,z:e.position.z},r)<1.2){e.yaw+=i*1.7,e.speed=0,this.simTime-t.lastSeenAt>1.6&&(t.targetId=null);return}const o=`seen:${Math.round(r.x)}:${Math.round(r.z)}`;this.aiGoTo(e,t,r,o,i,.92);const a=r.x-e.position.x,l=r.z-e.position.z;e.yaw=So(e.yaw,Math.atan2(-a,-l),4.5*i)}aiObjective(e,t,i){var s;t.mode="objective",t.wantsPlant=!1,t.wantsDefuse=!1;const r=this.simTime;if(e.team==="T"){if(this.bomb.planted){const l=this.bomb.plantedSite,c=l?this.siteHoldPoint(e.team,l.name,e.teamIndex):this.map.sites[this.tStrategy].center;r>t.arrivedAt&&Pt({x:e.position.x,z:e.position.z},c)<1.4&&r>t.arrivedAt+5+e.teamIndex&&(t.arrivedAt=r,t.holdPoint=this.nav.randomNearbyWalkable(c,3.2)),this.aiGoTo(e,t,t.holdPoint??c,`defend:${(l==null?void 0:l.name)??"A"}`,i,.78),t.path.length===0&&(e.yaw+=i*.55);return}if(this.bomb.carriedBy===e.id){const l=this.map.sites[this.tStrategy];if(((s=this.map.getSiteAt(e.position.x,e.position.z))==null?void 0:s.name)===l.name){t.mode="plant",t.wantsPlant=!0,e.speed=0,!t.targetVisible&&e.ai&&(e.yaw=So(e.yaw,Math.atan2(-(l.center.x-e.position.x),-(l.center.z-e.position.z)),1.5*i));return}if(!t.routeDone){const f=this.tStrategy==="A"?{x:46,z:8}:{x:-37,z:13};if(Pt({x:e.position.x,z:e.position.z},f)<5)t.routeDone=!0;else{this.aiGoTo(e,t,f,`route:${this.tStrategy}`,i,1);return}}const u=this.siteApproachPoint(l.name,e.teamIndex);this.aiGoTo(e,t,u,`plant:${l.name}`,i,1);return}if(!this.bomb.carriedBy&&this.bomb.dropped){const l=this.nearestTerroristToBomb(),c=(l==null?void 0:l.id)===e.id?{x:this.bomb.position.x,z:this.bomb.position.z}:this.siteApproachPoint(this.tStrategy,e.teamIndex);this.aiGoTo(e,t,c,(l==null?void 0:l.id)===e.id?"bomb:pickup":`push:${this.tStrategy}`,i,.95);return}const o=this.map.sites[this.tStrategy];if(!t.routeDone){const l=this.tStrategy==="A"?{x:46,z:12}:{x:-37,z:15};if(Pt({x:e.position.x,z:e.position.z},l)<6)t.routeDone=!0;else{this.aiGoTo(e,t,l,`route:${this.tStrategy}`,i,1);return}}const a=this.siteApproachPoint(o.name,e.teamIndex);this.aiGoTo(e,t,a,`push:${o.name}`,i,.92)}else{if(this.bomb.planted){const l={x:this.bomb.position.x,z:this.bomb.position.z};if(Pt({x:e.position.x,z:e.position.z},l)<1.65&&!t.targetVisible){t.mode="defuse",t.wantsDefuse=!0,e.speed=0;const u=Math.atan2(-(l.x-e.position.x),-(l.z-e.position.z));e.yaw=So(e.yaw,u,3*i);return}this.aiGoTo(e,t,l,"defuse",i,1);return}const o=this.ctRole(e.teamIndex),a=this.ctDefendPoint(o,e.teamIndex);if(Pt({x:e.position.x,z:e.position.z},a)<1.3){if(t.holdPoint||(t.holdPoint=a),r>t.arrivedAt+7&&(t.arrivedAt=r,t.holdPoint=this.nav.randomNearbyWalkable(a,3.6)),t.holdPoint){const l=t.holdPoint;Pt({x:e.position.x,z:e.position.z},l)>.6?this.aiGoTo(e,t,l,`hold:${o}`,i,.7):(e.yaw+=i*.35,e.speed=0)}}else t.holdPoint=null,this.aiGoTo(e,t,a,`defend:${o}`,i,.92)}}aiGoTo(e,t,i,r,s,o){const a=this.simTime,l=!t.pathGoal||Pt(t.pathGoal,i)>2.2;if((r!==t.goalKey||l||a>=t.nextRepathAt)&&(t.path=this.nav.findPath({x:e.position.x,z:e.position.z},i),t.pathIndex=0,t.pathGoal={...i},t.goalKey=r,t.nextRepathAt=a+1.25),t.path.length===0){e.speed=0;return}let c=t.path[t.pathIndex];for(;c&&Pt({x:e.position.x,z:e.position.z},c)<.62;)t.pathIndex++,c=t.path[t.pathIndex];if(!c){t.pathGoal=null,t.goalKey="",e.speed=0;return}const u=c.x-e.position.x,f=c.z-e.position.z,d=Math.hypot(u,f);if(d<.001)return;const m=4.35*en(e.inventory).def.speedFactor*o,_=e.position.x,v=e.position.z;e.position.x+=u/d*m*s,e.position.z+=f/d*m*s,this.resolveEntityCollisions(e);const h=Math.hypot(e.position.x-_,e.position.z-v);h<2e-4&&t.path.length>1&&t.pathIndex++,e.yaw=So(e.yaw,Math.atan2(-u,-f),5.2*s),e.speed=h/Math.max(s,1e-4),a>t.stuckCheckAt&&(t.stuckCheckAt=a+1.1,Pt(t.lastCheck,{x:e.position.x,z:e.position.z})<.15&&d>.9&&(t.path=[],t.nextRepathAt=0,t.goalKey=""),t.lastCheck={x:e.position.x,z:e.position.z})}ctRole(e){return e===1||e===3?"A":"B"}ctDefendPoint(e,t){if(e==="A"){const r=[{x:44,z:-35},{x:34,z:-21},{x:49,z:-13},{x:29,z:-42},{x:38,z:-36}];return r[t%r.length]}const i=[{x:-41,z:-35},{x:-48,z:-22},{x:-31,z:-37},{x:-36,z:-20},{x:-29,z:-27}];return i[t%i.length]}siteApproachPoint(e,t){if(e==="A"){const r=[{x:44,z:-30},{x:36,z:-34},{x:48,z:-22},{x:30,z:-27},{x:41,z:-20}];return r[t%r.length]}const i=[{x:-39,z:-34},{x:-47,z:-26},{x:-31,z:-29},{x:-42,z:-20},{x:-33,z:-38}];return i[t%i.length]}siteHoldPoint(e,t,i){return e==="CT"?this.ctDefendPoint(t,i):this.siteApproachPoint(t,i)}nearestTerroristToBomb(){const e=this.aliveEntities("T");let t=null,i=1/0;for(const r of e){const s=Pt({x:r.position.x,z:r.position.z},{x:this.bomb.position.x,z:this.bomb.position.z});s<i&&(i=s,t=r)}return t}updateBombCarry(){if(!this.bomb.planted){if(!this.bomb.carriedBy&&this.bomb.dropped){for(const e of this.aliveEntities("T"))if(Pt({x:e.position.x,z:e.position.z},{x:this.bomb.position.x,z:this.bomb.position.z})<1.35){this.bomb.carriedBy=e.id,this.bomb.dropped=!1,e.id===this.humanId&&(this.message="已拾取 C4",this.messageSub="在 A 或 B 点内按住 E 安放炸弹",this.audio.pickup());break}}if(this.bomb.carriedBy){const e=this.getEntity(this.bomb.carriedBy);if(!e||!e.alive)e&&(this.bomb.carriedBy=null,this.bomb.dropped=!0,this.bomb.position.set(e.position.x,.02,e.position.z));else{const t=Math.sin(e.yaw)*.28,i=Math.cos(e.yaw)*.28;this.bomb.position.set(e.position.x+t,.02,e.position.z+i)}}this.updateBombAuxiliary()}}updateBombActions(e){var r,s,o,a;if(!this.started)return;let t=null;if(this.phase==="live"&&!this.bomb.planted&&this.bomb.carriedBy){const l=this.getEntity(this.bomb.carriedBy);l&&l.alive&&this.map.getSiteAt(l.position.x,l.position.z)&&(l.id===this.humanId?this.interactHeld&&l.speed<1.1&&l.onGround&&(t=l):(r=l.ai)!=null&&r.wantsPlant&&(t=l))}if(t){(!this.action||this.action.kind!=="plant"||this.action.entityId!==t.id)&&(this.action={kind:"plant",entityId:t.id,progress:0});const l=this.action.progress;this.action.progress+=e/z2,this.bomb.plantProgress=this.action.progress,Math.floor(l*8)!==Math.floor(this.action.progress*8)&&this.audio.bombBeep(!1),this.action.progress>=1&&this.plantBomb(t)}else((s=this.action)==null?void 0:s.kind)==="plant"&&(this.action=null,this.bomb.plantProgress=0);let i=null;if(this.phase==="planted"&&this.bomb.planted){let l=1/0;for(const c of this.aliveEntities("CT")){const u=Pt({x:c.position.x,z:c.position.z},{x:this.bomb.position.x,z:this.bomb.position.z});if(u>2)continue;(c.id===this.humanId?this.interactHeld:((o=c.ai)==null?void 0:o.wantsDefuse)===!0)&&u<l&&(l=u,i=c)}}if(i){(!this.action||this.action.kind!=="defuse"||this.action.entityId!==i.id)&&(this.action={kind:"defuse",entityId:i.id,progress:0});const l=this.action.progress;this.action.progress+=e/B2,this.bomb.defuseProgress=this.action.progress,Math.floor(l*12)!==Math.floor(this.action.progress*12)&&this.audio.bombDefuse(!1),this.action.progress>=1&&this.defuseBomb(i)}else((a=this.action)==null?void 0:a.kind)==="defuse"&&(this.action=null,this.bomb.defuseProgress=0)}plantBomb(e){if(this.bomb.planted)return;const t=this.map.getSiteAt(e.position.x,e.position.z)??this.map.sites[this.tStrategy];this.bomb.planted=!0,this.bomb.plantedSite=t,this.bomb.carriedBy=null,this.bomb.dropped=!1,this.bomb.position.set(e.position.x,.03,e.position.z),this.bomb.timer=Nu,this.bomb.plantedAt=this.simTime,this.bomb.nextBeep=this.simTime+.35,this.bomb.plantProgress=1,this.bombMesh.visible=!0,this.bombMesh.position.copy(this.bomb.position),this.phase="planted",this.action=null,this.message=`C4 已安放在 ${t.name} 点`,this.messageSub="炸弹将在 40 秒后爆炸 · CT 必须拆除",this.objective=e.team===this.playerTeam?`保护 ${t.name} 点炸弹直至爆炸`:`前往 ${t.name} 点拆除 C4`,this.audio.bombPlant(),this.emitHud(!0)}defuseBomb(e){this.bomb.planted&&(this.bomb.defused=!0,this.bomb.defuseProgress=1,this.action=null,this.audio.bombDefuse(!0),this.message="C4 已成功拆除",this.messageSub=`${e.name} 拆除了炸弹`,this.endRound("CT","C4 已被拆除"))}updateBombState(e){if(this.phase==="planted"&&this.bomb.planted){this.bomb.timer=Math.max(0,this.bomb.timer-e);const t=this.bomb.timer<10?.32:.95;if(this.simTime>=this.bomb.nextBeep){this.bomb.nextBeep=this.simTime+t,this.audio.bombBeep(this.bomb.timer<6),this.bombLight.intensity=6;const r=this.bombLed.material;r.emissiveIntensity=3}this.bombLight.intensity=Math.max(0,this.bombLight.intensity-e*16);const i=this.bombLed.material;i.emissiveIntensity=Math.max(.6,i.emissiveIntensity-e*10),this.bomb.timer<=0&&this.detonateBomb()}this.updateBombAuxiliary()}updateBombAuxiliary(){if(this.bombMesh.visible=this.bomb.planted||this.bomb.dropped||!!this.bomb.carriedBy,this.bomb.planted)this.bombMesh.position.copy(this.bomb.position),this.bombMesh.position.y=.02,this.bombMesh.rotation.y=.3;else if(this.bomb.dropped)this.bombMesh.position.copy(this.bomb.position),this.bombMesh.position.y=.02,this.bombMesh.rotation.y+=.01;else if(this.bomb.carriedBy){const e=this.getEntity(this.bomb.carriedBy);e&&(this.bombMesh.visible=e.id!==this.humanId,this.bombMesh.position.copy(this.bomb.position),this.bombMesh.position.y=e.position.y+.55,this.bombMesh.rotation.y=e.yaw)}}detonateBomb(){if(this.phase!=="planted")return;this.bomb.exploded=!0,this.audio.explosion(),this.shake=1.4,this.damageFlash=.9;const e=this.bomb.position.clone(),t=new ei({color:16765066,transparent:!0,opacity:.95,blending:oa,depthWrite:!1}),i=new Re(new Kn(2.2,16,12),t);i.position.copy(e),i.position.y=2,this.scene.add(i),this.explosionFlash=i;const r=new Ds(16752704,140,45,2);r.position.copy(e).add(new L(0,3,0)),this.scene.add(r),this.exploLight=r;for(let s=0;s<48;s++){const o=new xt(Xe(.06,.22),Xe(.06,.22),Xe(.06,.22)),a=new Re(o,new ei({color:s%3?3879204:16751932}));a.position.copy(e).add(new L(Xe(-.7,.7),Xe(.2,1.2),Xe(-.7,.7))),this.scene.add(a),this.effects.push({object:a,ttl:Xe(.8,1.8),life:1.8,velocity:new L(Xe(-7,7),Xe(5,15),Xe(-7,7)),gravity:-15,spin:Xe(-12,12)})}this.endRound("T","C4 爆炸 · 反恐精英未能拆除炸弹")}updateRoundState(e){if(this.phase==="freeze"){this.simTime>=this.freezeEnd&&(this.phase="live",this.roundTime=Lu,this.message=`第 ${this.round} 回合 · 行动开始`,this.messageSub=this.playerTeam==="T"?`进攻 ${this.tStrategy} 点`:"守住 A / B 点",this.audio.roundStart(),this.emitHud(!0));return}if(this.phase==="live"){if(this.roundTime=Math.max(0,this.roundTime-e),this.checkElimination(),this.phase!=="live")return;if(this.roundTime<=0){this.endRound("CT","回合时间耗尽");return}return}if(this.phase==="planted"){this.checkElimination();return}this.phase==="roundEnd"&&!this.matchOver&&this.roundEndAt>0&&this.simTime>=this.roundEndAt&&(this.roundEndAt=0,this.startRound(this.round+1))}checkElimination(){if(this.phase==="roundEnd")return;const e=this.aliveEntities("CT").length,t=this.aliveEntities("T").length;if(e===0){this.endRound("T","反恐精英已被全部消灭");return}if(t===0){if(this.phase==="planted")return;this.endRound("CT","恐怖分子已被全部消灭")}}endRound(e,t){if(this.phase==="roundEnd")return;this.phase="roundEnd",this.action=null,this.fireHeld=!1,this.scopeHeld=!1,this.scoped=!1,this.interactHeld=!1,this.bomb.plantProgress=0,this.bomb.defuseProgress=0,e==="CT"?this.ctScore++:this.tScore++;const i=e===this.playerTeam;this.message=`${G2(e)}胜利`,this.messageSub=t,this.objective=`比分 ${this.ctScore} : ${this.tScore}`,this.roundEndAt=this.simTime+5.8,this.audio[i?"win":"lose"](),(this.ctScore>=t0||this.tScore>=t0)&&(this.matchOver=!0,this.roundEndAt=0,this.messageSub=`${t} · 比赛结束`,document.pointerLockElement&&document.exitPointerLock()),this.emitHud(!0)}updateEntityVisuals(e){for(const t of this.entities){if(t.model.root.position.copy(t.position),t.model.root.rotation.y=t.yaw,t.alive){const i=Math.hypot(t.position.x-t.lastPosition.x,t.position.z-t.lastPosition.z),r=Math.max(t.speed,i/Math.max(e,1e-4));t.model.update(e,r,!0),t.model.setAimPitch(t.pitch),t.model.setWeapon(en(t.inventory).def.id)}else t.model.update(e,0,!1);if((this.phase==="live"||this.phase==="planted")&&t.alive&&t.id!==this.humanId&&t.speed>1.15&&t.onGround&&(t.footstepTimer-=e,t.footstepTimer<=0)){t.footstepTimer=_t(5.2/Math.max(1,t.speed),.3,.7);const i=this.getHuman(),r=i?Math.hypot(t.position.x-i.position.x,t.position.z-i.position.z):0;r<22&&this.audio.footstep(t.speed>3.6,r,this.audioPan(t.position))}t.lastPosition.copy(t.position)}}spawnTracer(e,t,i){const r=new hn().setFromPoints([e,t]),s=new Kv({color:i,transparent:!0,opacity:.65,blending:oa,depthWrite:!1}),o=new qT(r,s);this.scene.add(o),this.effects.push({object:o,ttl:.065,life:.065,fade:!0})}spawnImpact(e,t,i,r){if(this.effects.length>180)return;const s=new ei({color:t,transparent:!0,opacity:.9});for(let o=0;o<i;o++){const a=new Re(new xt(r?.045:.035,r?.045:.035,r?.045:.035),s);a.position.copy(e),this.scene.add(a),this.effects.push({object:a,ttl:Xe(.25,r?.65:.5),life:r?.65:.5,velocity:new L(Xe(-2.2,2.2),Xe(.6,3.2),Xe(-2.2,2.2)),gravity:-9,fade:!0})}}updateEffects(e){for(let t=this.effects.length-1;t>=0;t--){const i=this.effects[t];if(i.ttl-=e,i.velocity&&(i.velocity.y+=(i.gravity??0)*e,i.object.position.addScaledVector(i.velocity,e)),i.spin&&(i.object.rotation.x+=i.spin*e),i.fade){const r=i.object.material;r&&typeof r.opacity=="number"&&(r.transparent=!0,r.opacity=_t(i.ttl/i.life,0,1)*.9)}if(i.ttl<=0){this.scene.remove(i.object);const r=i.object;r.geometry&&r.geometry.dispose(),r.material&&r.material.dispose(),this.effects.splice(t,1)}}if(this.shake=Math.max(0,this.shake-e*2.1),this.damageFlash=Math.max(0,this.damageFlash-e*1.8),this.explosionFlash){this.explosionFlash.scale.multiplyScalar(1+e*2.8);const t=this.explosionFlash.material;t.opacity=Math.max(0,t.opacity-e*1.6),t.opacity<=0&&(this.explosionFlash.removeFromParent(),this.explosionFlash=null)}this.exploLight&&(this.exploLight.intensity=Math.max(0,this.exploLight.intensity-e*180),this.exploLight.intensity<=0&&(this.exploLight.removeFromParent(),this.exploLight=null))}updateCamera(e){if(!this.started)return;const t=this.getHuman();if(!t)return;let i=t;if(!t.alive){const p=this.getEntity(this.spectateId);if(p&&p.alive)i=p;else{const m=this.aliveEntities(this.playerTeam);m.length&&(this.spectateId=m[0].id,i=m[0])}}const r=!t.alive,s=r?i:t;!r&&this.scoped;const o=s.speed;!r&&s.onGround&&o>.2&&(this.bobPhase+=e*(4.8+o*.75));const a=!r&&s.onGround?Math.sin(this.bobPhase*2)*Math.min(.045,o*.007):0,l=r?0:Math.cos(this.bobPhase)*Math.min(.035,o*.005),c=new L(s.position.x,s.position.y+cs+a,s.position.z);c.addScaledVector(new L(Math.cos(s.yaw),0,-Math.sin(s.yaw)),l),this.shake>.001&&(c.x+=Xe(-this.shake,this.shake)*.08,c.y+=Xe(-this.shake,this.shake)*.07,c.z+=Xe(-this.shake,this.shake)*.08);const u=r?8:26;this.camera.position.x=zt.damp(this.camera.position.x,c.x,u,e),this.camera.position.y=zt.damp(this.camera.position.y,c.y,u,e),this.camera.position.z=zt.damp(this.camera.position.z,c.z,u,e);const f=s.yaw,d=r?s.pitch-.02:s.pitch;this.camera.rotation.y=n0(this.camera.rotation.y,f,Math.min(1,e*(r?8:28))),this.camera.rotation.x=zt.damp(this.camera.rotation.x,d,r?8:28,e),this.camera.rotation.z=zt.damp(this.camera.rotation.z,r?0:this.keys.has("KeyA")&&!r?.012:this.keys.has("KeyD")&&!r?-.012:0,6,e),!r&&this.scoped?this.fpRoot.visible=!1:!r&&t.alive?(this.fpRoot.visible=!0,this.updateFPTransform(e,t)):this.fpRoot.visible=!1,this.updateScopeFov(e),this.lastLookYaw*=Math.exp(-e*8),this.lastLookPitch*=Math.exp(-e*8)}updateFPTransform(e,t){const i=en(t.inventory);this.fpWeaponId!==i.def.id&&this.updateFPWeapon(i.def.id);const r=i.def,s=t.reloading?_t(1-(t.reloadEnd-this.simTime)/Math.max(.01,r.reloadTime),0,1):0,o=Math.sin(s*Math.PI),a=.27,l=-.29,c=-.68;this.fpRoot.position.x=zt.damp(this.fpRoot.position.x,a+this.swayX,14,e),this.fpRoot.position.y=zt.damp(this.fpRoot.position.y,l+this.swayY-o*.18,14,e),this.fpRoot.position.z=zt.damp(this.fpRoot.position.z,c+this.fpRecoil*.055,16,e),this.fpRoot.rotation.x=zt.damp(this.fpRoot.rotation.x,this.fpRecoil*.1-o*.55,15,e),this.fpRoot.rotation.y=zt.damp(this.fpRoot.rotation.y,.055+o*.3+this.lastLookYaw*2.2,14,e),this.fpRoot.rotation.z=zt.damp(this.fpRoot.rotation.z,o*.15,14,e),this.fpRecoil=Math.max(0,this.fpRecoil-e*7.5),this.swayX=zt.damp(this.swayX,this.lastLookYaw*.7,9,e),this.swayY=zt.damp(this.swayY,-this.lastLookPitch*.55,9,e),this.fpWeapon&&(this.fpWeapon.rotation.z=Math.sin(this.bobPhase)*.006*Math.min(1,t.speed/4))}updateFPWeapon(e){this.fpWeaponId===e&&this.fpWeapon||(this.fpWeapon&&(this.fpWeaponHost.remove(this.fpWeapon),this.fpWeapon=null),this.fpWeaponId=e,this.fpWeapon=w2(e),this.fpWeaponHost.add(this.fpWeapon))}updateTeamVision(){if(this.simTime<this.nextTeamVision)return;this.nextTeamVision=this.simTime+.18;const e=this.aliveEntities(this.playerTeam);if(e.length)for(const t of this.aliveEntities(this.playerTeam==="CT"?"T":"CT")){let i=!1;for(const r of e)if(!(Pt({x:r.position.x,z:r.position.z},{x:t.position.x,z:t.position.z})>54)&&this.hasLineOfSight(r,t)){i=!0;break}i&&this.spotUntil.set(t.id,{x:t.position.x,z:t.position.z,until:this.simTime+2.2})}}updateSpotCleanup(){for(const[e,t]of this.spotUntil)t.until<this.simTime&&this.spotUntil.delete(e)}getMinimapData(){const e=this.getHuman(),t=o=>({x:o.position.x,z:o.position.z,yaw:o.yaw,team:o.team,alive:o.alive}),i=this.entities.filter(o=>o.team===this.playerTeam&&o.id!==this.humanId&&o.alive).map(t),r=[];for(const[o,a]of this.spotUntil){const l=this.getEntity(o);l&&l.alive&&r.push({x:a.x,z:a.z,team:l.team,alive:!0})}let s=null;if(this.bomb.planted)s={x:this.bomb.position.x,z:this.bomb.position.z,kind:"planted"};else if(this.bomb.dropped)s={x:this.bomb.position.x,z:this.bomb.position.z,kind:"dropped"};else if(this.bomb.carriedBy){const o=this.getEntity(this.bomb.carriedBy);o&&(s={x:o.position.x,z:o.position.z,kind:"carried"})}return{player:e?t(e):null,teammates:i,enemies:r,bomb:s,sites:[{name:"A",x:this.map.sites.A.center.x,z:this.map.sites.A.center.z},{name:"B",x:this.map.sites.B.center.x,z:this.map.sites.B.center.z}]}}emitHud(e=!1){var d,p;const t=performance.now();if(!e&&t-this.lastHudAt<48)return;this.lastHudAt=t;const i=this.getHuman(),r=this.aliveEntities("CT").length,s=this.aliveEntities("T").length,o=i?en(i.inventory):null,a=this.entities.map(m=>({id:m.id,name:m.name,team:m.team,alive:m.alive,health:m.health,isPlayer:m.id===this.humanId,kills:m.kills,deaths:m.deaths})).sort((m,_)=>_.kills-m.kills||m.deaths-_.deaths),l=this.getEntity(this.spectateId),c=this.makeActionHint(i),u=this.getEntity(this.bomb.carriedBy),f={started:this.started,paused:this.paused,phase:this.phase,round:this.round,ctScore:this.ctScore,tScore:this.tScore,roundTime:this.phase==="planted"?this.roundTime:this.roundTime,bombTime:this.bomb.planted?this.bomb.timer:0,player:i?{team:i.team,name:i.name,alive:i.alive,health:Math.ceil(i.health),armor:Math.ceil(i.armor),weapon:(o==null?void 0:o.def.name)??"—",slot:i.inventory.slot,ammo:o&&o.def.id!=="knife"?o.ammo:-1,reserve:o&&o.def.id!=="knife"?o.reserve:-1,reloading:i.reloading,scoped:this.scoped,moving:i.speed>.5,spread:this.currentSpread(i),hasPrimary:!!i.inventory.primary,hasBomb:this.bomb.carriedBy===i.id,controlledName:i.name,takeoverIn:i.alive?0:this.takeoverAt>0?Math.max(0,this.takeoverAt-this.simTime):0,spectating:!i.alive&&!!l}:null,ctAlive:r,tAlive:s,killfeed:this.killfeed.map(m=>({...m,age:this.simTime-(m.at??this.simTime)})),bomb:{planted:this.bomb.planted,plantedSite:((d=this.bomb.plantedSite)==null?void 0:d.name)??null,carriedBy:(u==null?void 0:u.id)===this.humanId?"你":(u==null?void 0:u.name)??null,dropped:this.bomb.dropped,defusing:((p=this.action)==null?void 0:p.kind)==="defuse",defuseProgress:this.bomb.defuseProgress,plantProgress:this.bomb.plantProgress,actionHint:c},message:this.message,messageSub:this.messageSub,buyOpen:this.buyOpen,scoreboard:a,hitMarker:Math.max(0,this.hitMarkerUntil-this.simTime),damageFlash:this.damageFlash,objective:this.objective,pointerLocked:document.pointerLockElement===this.renderer.domElement,matchOver:this.matchOver,scoreboardOpen:this.showScoreboard};this.onHud(f)}makeActionHint(e){return!e||!e.alive?"":this.phase==="freeze"?this.round===1?"手枪局 · 准备阶段":"按 B 打开军械库":e.team==="T"&&this.bomb.carriedBy===e.id&&!this.bomb.planted?this.map.getSiteAt(e.position.x,e.position.z)?this.interactHeld?"正在安放 C4…":"按住 E 安放 C4":"将 C4 带到 A 或 B 点":e.team==="CT"&&this.bomb.planted?Pt({x:e.position.x,z:e.position.z},{x:this.bomb.position.x,z:this.bomb.position.z})<2.1?this.interactHeld?"正在拆除 C4…":"按住 E 拆除 C4":"前往 C4 位置进行拆除":e.team==="CT"?"守住 A / B 点":this.bomb.carriedBy===e.id?"将 C4 带至炸弹点":"推进至炸弹点"}resize(){if(!this.container)return;const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/Math.max(1,t),this.camera.updateProjectionMatrix()}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.unbindEvents(),this.resizeObserver.disconnect();for(const e of this.entities)this.scene.remove(e.model.root);this.effects.forEach(e=>{this.scene.remove(e.object)}),this.renderer.dispose(),this.renderer.domElement.remove()}}function j2({game:n}){const e=rn.useRef(null);return rn.useEffect(()=>{const t=e.current;if(!t)return;const i=t.getContext("2d");if(!i)return;const r=Math.min(2,window.devicePixelRatio||1),s=248,o=216;t.width=s*r,t.height=o*r,t.style.width=`${s}px`,t.style.height=`${o}px`;let a=0,l=0;const c=(f,d)=>{const m=(s-20)/(fn.maxX-fn.minX),_=(o-10*2)/(fn.maxZ-fn.minZ),v=Math.min(m,_),h=(s-(fn.maxX-fn.minX)*v)/2,g=(o-(fn.maxZ-fn.minZ)*v)/2;return{x:h+(f-fn.minX)*v,y:g+(d-fn.minZ)*v,s:v}},u=f=>{if(a=requestAnimationFrame(u),f-l<33)return;l=f;const d=n.getMinimapData();i.setTransform(r,0,0,r,0,0),i.clearRect(0,0,s,o);const p=i.createLinearGradient(0,0,s,o);p.addColorStop(0,"rgba(28, 25, 19, 0.92)"),p.addColorStop(1,"rgba(16, 18, 17, 0.92)"),i.fillStyle=p,i.fillRect(0,0,s,o),i.strokeStyle="rgba(198, 167, 104, 0.08)",i.lineWidth=1;for(let h=10;h<s;h+=24)i.beginPath(),i.moveTo(h,0),i.lineTo(h,o),i.stroke();for(let h=10;h<o;h+=24)i.beginPath(),i.moveTo(0,h),i.lineTo(s,h),i.stroke();const m=c(fn.minX,fn.minZ),_=c(fn.maxX,fn.maxZ);i.fillStyle="rgba(173, 144, 89, 0.16)",i.fillRect(m.x,m.y,_.x-m.x,_.y-m.y);for(const h of[n.map.sites.A,n.map.sites.B]){const g=c(h.rect.minX,h.rect.minZ),x=c(h.rect.maxX,h.rect.maxZ);i.fillStyle="rgba(197, 159, 77, 0.12)",i.fillRect(g.x,g.y,x.x-g.x,x.y-g.y),i.strokeStyle="rgba(219, 187, 117, 0.28)",i.lineWidth=1,i.strokeRect(g.x+.5,g.y+.5,x.x-g.x-1,x.y-g.y-1),i.fillStyle="rgba(229, 205, 150, 0.53)",i.font="900 20px Impact, Arial Black, sans-serif",i.textAlign="center",i.textBaseline="middle";const y=c(h.center.x,h.center.z);i.fillText(h.name,y.x,y.y)}for(const h of n.map.mapRects){const g=c(h.rect.minX,h.rect.minZ),x=c(h.rect.maxX,h.rect.maxZ);x.x-g.x>s-20||x.y-g.y>o-20||(h.kind==="wall"?(i.fillStyle="rgba(52, 48, 38, 0.94)",i.strokeStyle="rgba(147, 128, 88, 0.45)"):h.kind==="railing"?(i.fillStyle="rgba(92, 82, 61, 0.8)",i.strokeStyle="rgba(164, 144, 103, 0.4)"):h.kind==="crate"?(i.fillStyle="rgba(122, 83, 45, 0.92)",i.strokeStyle="rgba(214, 171, 105, 0.45)"):(i.fillStyle="rgba(92, 87, 66, 0.82)",i.strokeStyle="rgba(170, 151, 108, 0.3)"),i.fillRect(g.x,g.y,Math.max(1,x.x-g.x),Math.max(1,x.y-g.y)),i.lineWidth=.6,i.strokeRect(g.x,g.y,Math.max(1,x.x-g.x),Math.max(1,x.y-g.y)))}if(d.bomb){const h=c(d.bomb.x,d.bomb.z),g=.65+Math.sin(f*.012)*.35;i.save(),i.translate(h.x,h.y),d.bomb.kind==="planted"?(i.strokeStyle=`rgba(255, 91, 53, ${g})`,i.lineWidth=2,i.beginPath(),i.arc(0,0,9,0,Math.PI*2),i.stroke(),i.fillStyle=`rgba(255, 94, 48, ${.72+g*.2})`,i.fillRect(-4,-4,8,8)):d.bomb.kind==="dropped"?(i.fillStyle="#e8b65c",i.beginPath(),i.moveTo(0,-6),i.lineTo(6,4),i.lineTo(-6,4),i.closePath(),i.fill()):(i.strokeStyle="rgba(235, 177, 86, .85)",i.lineWidth=1.5,i.strokeRect(-4,-4,8,8)),i.restore()}const v=(h,g,x,y)=>{const R=c(h.x,h.z);i.save(),i.translate(R.x,R.y),y&&h.yaw!==void 0?(i.rotate(-h.yaw),i.fillStyle=g,i.beginPath(),i.moveTo(0,-x),i.lineTo(x*.72,x*.8),i.lineTo(0,x*.38),i.lineTo(-x*.72,x*.8),i.closePath(),i.fill(),i.strokeStyle="rgba(255,255,255,.5)",i.lineWidth=.7,i.stroke()):(i.fillStyle=g,i.beginPath(),i.arc(0,0,x*.6,0,Math.PI*2),i.fill(),y&&(i.strokeStyle="rgba(255,255,255,.5)",i.lineWidth=.8,i.stroke())),i.restore()};for(const h of d.teammates)v(h,"#5bb3ec",5,!0);for(const h of d.enemies)v(h,"#ef5e4b",5,!1);d.player&&v(d.player,"#f3f0e4",6,!0),i.strokeStyle="rgba(209, 181, 118, 0.22)",i.lineWidth=1,i.strokeRect(5.5,5.5,s-11,o-11),i.fillStyle="rgba(204, 180, 128, 0.5)",i.font='600 8px "Trebuchet MS", sans-serif',i.textAlign="left",i.textBaseline="bottom",i.fillText("N",10,o-8),i.textAlign="right",i.fillText("DUST II // RADAR",s-10,o-8)};return a=requestAnimationFrame(u),()=>cancelAnimationFrame(a)},[n]),S.jsxs("div",{className:"minimap-shell",children:[S.jsxs("div",{className:"minimap-topline",children:[S.jsx("span",{children:"TACTICAL MAP"}),S.jsxs("span",{className:"minimap-live",children:[S.jsx("i",{})," LIVE"]})]}),S.jsx("canvas",{ref:e,className:"minimap-canvas"})]})}function Iu(n){const e=Math.max(0,Math.ceil(n));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function X2(n){return n==="CT"?"CT":"T"}function Y2(n){return n.phase==="freeze"?"准备阶段":n.phase==="planted"?"C4 已安放":n.phase==="roundEnd"?"回合结束":"行动中"}function $2({hud:n,game:e}){const t=n.player;if(!t)return null;const i=Math.max(3,Math.min(44,3.5+t.spread*880)),r=t.health<=35,s=n.phase,o=Iu(s==="planted"?n.bombTime:n.roundTime),a=t.scoped&&t.alive,l=t.alive&&!a&&!n.paused&&!n.buyOpen,c=n.killfeed.filter(p=>p.age<9).slice(-5),u=t.slot,f=n.bomb.defuseProgress>0?n.bomb.defuseProgress:n.bomb.plantProgress,d=n.bomb.defuseProgress>0?"拆除 C4":n.bomb.plantProgress>0?"安放 C4":"";return S.jsxs("div",{className:"hud",children:[S.jsx("div",{className:"hud-vignette"}),S.jsx("div",{className:"hud-grain"}),S.jsxs("div",{className:"top-center",children:[S.jsxs("div",{className:"score-hud",children:[S.jsxs("div",{className:"team-score ct-score",children:[S.jsx("div",{className:"team-mark",children:"CT"}),S.jsxs("div",{className:"score-stack",children:[S.jsx("b",{children:n.ctScore}),S.jsxs("span",{children:[n.ctAlive," 存活"]})]})]}),S.jsxs("div",{className:`round-clock ${s}`,children:[S.jsxs("div",{className:"round-label",children:[S.jsx("span",{className:"round-dot"})," ROUND ",String(n.round).padStart(2,"0")]}),S.jsx("strong",{className:s==="planted"?"bomb-clock":"",children:o}),S.jsx("div",{className:"phase-label",children:Y2(n)})]}),S.jsxs("div",{className:"team-score t-score",children:[S.jsxs("div",{className:"score-stack right",children:[S.jsx("b",{children:n.tScore}),S.jsxs("span",{children:[n.tAlive," 存活"]})]}),S.jsx("div",{className:"team-mark",children:"T"})]})]}),S.jsxs("div",{className:"objective-strip",children:[S.jsx("span",{className:"objective-pip"}),S.jsx("span",{children:n.objective})]}),n.bomb.planted&&S.jsxs("div",{className:"bomb-status",children:[S.jsxs("div",{className:"bomb-icon",children:[S.jsx("span",{className:"bomb-led"}),S.jsx("span",{children:"C4"})]}),S.jsxs("div",{children:[S.jsxs("b",{children:["炸弹已安放 · ",n.bomb.plantedSite," 点"]}),S.jsxs("small",{children:[Iu(n.bombTime)," 后爆炸"]})]}),n.bomb.defusing&&S.jsxs("div",{className:"defuse-live",children:[S.jsx("span",{})," 正在拆除"]})]})]}),S.jsx("div",{className:"top-left",children:S.jsx(j2,{game:e})}),S.jsxs("div",{className:"top-right",children:[S.jsx("div",{className:"killfeed",children:c.map(p=>S.jsxs("div",{className:"kill-entry",style:{opacity:Math.max(0,1-p.age/10)},children:[S.jsx("span",{className:`kf-name ${p.killerTeam==="CT"?"ct":"t"}`,children:p.killer}),S.jsxs("span",{className:"kf-weapon",children:[p.headshot&&S.jsx("i",{className:"headshot-icon",title:"爆头",children:"◎"}),p.weapon]}),S.jsx("span",{className:`kf-name ${p.victimTeam==="CT"?"ct":"t"}`,children:p.victim})]},p.id))}),S.jsxs("div",{className:"controls-mini",children:[S.jsxs("span",{children:[S.jsx("kbd",{children:"TAB"})," 计分板"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"B"})," 军械库"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"ESC"})," 暂停"]})]})]}),S.jsxs("div",{className:"message-area",children:[S.jsx("div",{className:`message-title ${s==="roundEnd"?"round-end":""}`,children:n.message}),n.messageSub&&S.jsx("div",{className:"message-sub",children:n.messageSub}),s==="freeze"&&S.jsxs("div",{className:"freeze-line",children:[S.jsx("span",{})," 准备阶段 ",S.jsx("span",{})]})]}),d&&S.jsxs("div",{className:"action-panel",children:[S.jsxs("div",{className:"action-head",children:[S.jsx("span",{children:d}),S.jsxs("b",{children:[Math.round(f*100),"%"]})]}),S.jsx("div",{className:"action-bar",children:S.jsx("i",{style:{width:`${Math.min(100,f*100)}%`}})}),S.jsx("small",{children:n.bomb.actionHint})]}),!d&&n.bomb.actionHint&&s!=="freeze"&&S.jsxs("div",{className:"hint-panel",children:[S.jsx("i",{}),S.jsx("span",{children:n.bomb.actionHint})]}),S.jsxs("div",{className:`player-panel ${r?"low":""}`,children:[S.jsxs("div",{className:"player-head",children:[S.jsx("div",{className:`team-chip ${t.team==="CT"?"ct":"t"}`,children:X2(t.team)}),S.jsxs("div",{className:"player-name-block",children:[S.jsx("div",{className:"player-name",children:t.controlledName}),S.jsx("div",{className:"player-role",children:t.team==="CT"?"COUNTER-TERRORIST":"TERRORIST"})]}),t.hasBomb&&S.jsx("div",{className:"c4-chip",children:"C4"})]}),S.jsxs("div",{className:"vitals",children:[S.jsxs("div",{className:"vital-block hp",children:[S.jsx("div",{className:"vital-icon",children:"✚"}),S.jsxs("div",{className:"vital-main",children:[S.jsx("b",{children:t.alive?t.health:0}),S.jsx("div",{className:"vital-bar",children:S.jsx("i",{style:{width:`${t.alive?t.health:0}%`}})})]})]}),S.jsxs("div",{className:"vital-block armor",children:[S.jsx("div",{className:"vital-icon",children:"◆"}),S.jsxs("div",{className:"vital-main",children:[S.jsx("b",{children:t.alive?t.armor:0}),S.jsx("div",{className:"vital-bar",children:S.jsx("i",{style:{width:`${t.alive?t.armor:0}%`}})})]})]})]}),S.jsxs("div",{className:"player-status",children:[S.jsx("span",{className:t.alive?"online":"offline",children:t.alive?"COMBAT READY":"KIA"}),S.jsx("span",{children:t.team==="CT"?"守方":"攻方"})]})]}),S.jsxs("div",{className:"weapon-panel",children:[S.jsxs("div",{className:"weapon-head",children:[S.jsx("div",{className:"weapon-kicker",children:"ACTIVE WEAPON"}),S.jsxs("div",{className:"weapon-title-row",children:[S.jsx("b",{children:t.weapon}),t.scoped&&S.jsx("span",{className:"zoom-chip",children:"SCOPED"}),t.reloading&&S.jsx("span",{className:"reload-chip",children:"RELOADING"})]})]}),S.jsxs("div",{className:"ammo-row",children:[S.jsxs("div",{className:"ammo-main",children:[t.ammo<0?S.jsx("span",{className:"infinity",children:"∞"}):S.jsx("b",{className:t.ammo<=5?"ammo-low":"",children:t.ammo}),t.ammo>=0&&S.jsxs("span",{className:"reserve",children:["/ ",t.reserve]})]}),S.jsxs("div",{className:"slots",children:[S.jsxs("div",{className:`slot ${u==="primary"?"active":""} ${t.hasPrimary?"":"empty"}`,children:[S.jsx("kbd",{children:"1"}),S.jsx("span",{children:"主武器"})]}),S.jsxs("div",{className:`slot ${u==="secondary"?"active":""}`,children:[S.jsx("kbd",{children:"2"}),S.jsx("span",{children:"手枪"})]}),S.jsxs("div",{className:`slot ${u==="melee"?"active":""}`,children:[S.jsx("kbd",{children:"3"}),S.jsx("span",{children:"战术刀"})]})]})]})]}),l&&S.jsxs("div",{className:"crosshair",style:{"--gap":`${i}px`},children:[S.jsx("i",{className:"ch top"}),S.jsx("i",{className:"ch bottom"}),S.jsx("i",{className:"ch left"}),S.jsx("i",{className:"ch right"}),S.jsx("i",{className:"ch dot"})]}),n.hitMarker>0&&S.jsxs("div",{className:`hitmarker ${n.player&&n.hitMarker>0?"active":""}`,children:[S.jsx("i",{}),S.jsx("i",{}),S.jsx("i",{}),S.jsx("i",{})]}),a&&S.jsxs("div",{className:"scope-overlay",children:[S.jsx("div",{className:"scope-mask"}),S.jsxs("div",{className:"scope-ring",children:[S.jsx("div",{className:"scope-cross-h"}),S.jsx("div",{className:"scope-cross-v"}),S.jsx("div",{className:"scope-mil-dot"}),S.jsx("span",{className:"scope-tick t1"}),S.jsx("span",{className:"scope-tick t2"}),S.jsx("span",{className:"scope-tick t3"}),S.jsx("span",{className:"scope-tick b1"}),S.jsx("span",{className:"scope-tick b2"}),S.jsx("span",{className:"scope-tick b3"}),S.jsx("span",{className:"scope-tick l1"}),S.jsx("span",{className:"scope-tick l2"}),S.jsx("span",{className:"scope-tick r1"}),S.jsx("span",{className:"scope-tick r2"}),S.jsx("div",{className:"scope-label",children:"AWP · 8×"})]}),S.jsx("div",{className:"scope-vignette"})]}),S.jsx("div",{className:"damage-vignette",style:{opacity:n.damageFlash*.8}}),!n.pointerLocked&&!n.paused&&!n.buyOpen&&!t.scoped&&S.jsx("div",{className:"lock-prompt",children:"点击画面 · 锁定鼠标"}),!t.alive&&s!=="roundEnd"&&!n.matchOver&&S.jsxs("div",{className:"death-overlay",children:[S.jsx("div",{className:"death-kicker",children:"YOU ARE DEAD"}),S.jsx("div",{className:"death-title",children:"观战模式"}),t.takeoverIn>0?S.jsxs("div",{className:"takeover-line",children:[S.jsx("div",{className:"takeover-bar",children:S.jsx("i",{style:{width:`${Math.max(0,100-t.takeoverIn/2.5*100)}%`}})}),S.jsxs("span",{children:[t.takeoverIn.toFixed(1)," 秒后接管存活队友"]}),S.jsxs("small",{children:["按 ",S.jsx("kbd",{children:"SPACE"})," 立即接管"]})]}):S.jsx("div",{className:"takeover-line",children:S.jsx("span",{children:"队伍已无存活成员"})})]}),n.scoreboardOpen&&S.jsx("div",{className:"scoreboard-overlay",children:S.jsxs("div",{className:"scoreboard-card",children:[S.jsxs("div",{className:"scoreboard-head",children:[S.jsxs("div",{children:[S.jsx("span",{className:"eyebrow",children:"MATCH TELEMETRY"}),S.jsx("h2",{children:"战术计分板"})]}),S.jsxs("div",{className:"sb-score",children:[S.jsxs("span",{className:"ct",children:["CT ",n.ctScore]}),S.jsx("em",{children:":"}),S.jsxs("span",{className:"t",children:["T ",n.tScore]})]})]}),S.jsx("div",{className:"scoreboard-columns",children:["CT","T"].map(p=>S.jsxs("div",{className:`sb-team ${p==="CT"?"ct":"t"}`,children:[S.jsxs("div",{className:"sb-team-head",children:[S.jsx("span",{children:p==="CT"?"反恐精英":"恐怖分子"}),S.jsx("b",{children:p==="CT"?n.ctScore:n.tScore})]}),S.jsxs("div",{className:"sb-labels",children:[S.jsx("span",{children:"玩家"}),S.jsx("span",{children:"K"}),S.jsx("span",{children:"D"}),S.jsx("span",{children:"HP"})]}),n.scoreboard.filter(m=>m.team===p).sort((m,_)=>_.kills-m.kills).map(m=>S.jsxs("div",{className:`sb-row ${m.isPlayer?"me":""} ${m.alive?"":"dead"}`,children:[S.jsxs("span",{className:"sb-player",children:[S.jsx("i",{className:m.alive?"alive":"dead"}),m.name,m.isPlayer&&S.jsx("em",{children:"YOU"})]}),S.jsx("span",{children:m.kills}),S.jsx("span",{children:m.deaths}),S.jsx("span",{children:m.alive?m.health:"—"})]},m.id))]},p))}),S.jsxs("div",{className:"scoreboard-foot",children:["按住 TAB 查看 · ",n.phase==="freeze"?"准备阶段":"实时战绩"]})]})})]})}function q2({onStart:n,audioEnabled:e,onToggleAudio:t}){const[i,r]=rn.useState("CT");return rn.useEffect(()=>{const s=o=>{o.code==="Enter"&&n(i)};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[i,n]),S.jsxs("div",{className:"menu-overlay main-menu",children:[S.jsx("div",{className:"menu-atmosphere"}),S.jsxs("header",{className:"menu-nav",children:[S.jsxs("div",{className:"brand-lockup",children:[S.jsxs("div",{className:"brand-mark",children:["D",S.jsx("span",{children:"II"})]}),S.jsxs("div",{className:"brand-copy",children:[S.jsx("b",{children:"STRIKE PROTOCOL"}),S.jsx("small",{children:"DUST II · TACTICAL FPS PROTOTYPE"})]})]}),S.jsxs("div",{className:"menu-nav-right",children:[S.jsxs("div",{className:"server-status",children:[S.jsx("i",{})," LOCAL SIMULATION"]}),S.jsx("button",{className:"icon-button",onClick:t,title:e?"静音":"开启声音",children:e?"◖)))":"◖×"})]})]}),S.jsxs("main",{className:"menu-main",children:[S.jsxs("section",{className:"menu-hero",children:[S.jsxs("div",{className:"hero-kicker",children:[S.jsx("span",{})," DECLASSIFIED // DUST II"]}),S.jsxs("h1",{children:["DUST",S.jsx("span",{children:"II"}),S.jsx("br",{}),S.jsx("em",{children:"STRIKE PROTOCOL"})]}),S.jsx("p",{className:"hero-copy",children:"程序化重建的 Dust2 核心战区。5v5 战术对抗，C4 攻防，真实弹道与命中分区。 没有贴图、没有模型文件——这里的一切都由几何体与代码构成。"}),S.jsxs("div",{className:"hero-tags",children:[S.jsx("span",{children:"5V5 AI WARFARE"}),S.jsx("span",{children:"C4 OBJECTIVE"}),S.jsx("span",{children:"PROCEDURAL WORLD"})]}),S.jsxs("div",{className:"map-facts",children:[S.jsxs("div",{children:[S.jsx("b",{children:"7"}),S.jsxs("span",{children:["A大 · 中门 · 猫道",S.jsx("br",{}),"B洞 · A/B点 · 双出生点"]})]}),S.jsxs("div",{children:[S.jsx("b",{children:"06"}),S.jsxs("span",{children:["AK-47 · M4A4 · AWP",S.jsx("br",{}),"GLOCK · USP · DEAGLE"]})]}),S.jsxs("div",{children:[S.jsx("b",{children:"10"}),S.jsxs("span",{children:["头 / 胸 / 腹 / 手臂 / 腿",S.jsx("br",{}),"独立命中判定"]})]})]})]}),S.jsxs("section",{className:"deploy-panel",children:[S.jsx("div",{className:"panel-eyebrow",children:"SELECT YOUR SIDE"}),S.jsx("h2",{children:"选择阵营"}),S.jsxs("div",{className:"team-select",children:[S.jsxs("button",{className:`team-card ct ${i==="CT"?"active":""}`,onClick:()=>r("CT"),children:[S.jsx("div",{className:"team-card-bg"}),S.jsxs("div",{className:"team-card-top",children:[S.jsx("span",{className:"team-sigil",children:"CT"}),S.jsx("span",{className:"team-radio",children:i==="CT"?"● SELECTED":"○ STANDBY"})]}),S.jsxs("div",{className:"team-card-copy",children:[S.jsx("h3",{children:"反恐精英"}),S.jsx("p",{children:"驻守 A/B 点，阻止炸弹安放。炸弹落地后，突入点位完成拆除。"})]}),S.jsxs("div",{className:"team-loadout",children:[S.jsx("span",{children:"USP-S"}),S.jsx("span",{children:"M4A4"}),S.jsx("span",{children:"护甲"})]})]}),S.jsxs("button",{className:`team-card t ${i==="T"?"active":""}`,onClick:()=>r("T"),children:[S.jsx("div",{className:"team-card-bg"}),S.jsxs("div",{className:"team-card-top",children:[S.jsx("span",{className:"team-sigil",children:"T"}),S.jsx("span",{className:"team-radio",children:i==="T"?"● SELECTED":"○ STANDBY"})]}),S.jsxs("div",{className:"team-card-copy",children:[S.jsx("h3",{children:"恐怖分子"}),S.jsx("p",{children:"突破 A 大、B 洞或中门，控制包点并安放 C4。守住 40 秒倒计时。"})]}),S.jsxs("div",{className:"team-loadout",children:[S.jsx("span",{children:"GLOCK-18"}),S.jsx("span",{children:"AK-47"}),S.jsx("span",{children:"C4"})]})]})]}),S.jsxs("div",{className:"deploy-note",children:[S.jsx("div",{className:"pistol-badge",children:"ROUND 01"}),S.jsxs("div",{children:[S.jsx("b",{children:"首回合为手枪局"}),S.jsx("span",{children:"全员仅携带默认手枪与战术刀，无主武器、无护甲。第 2 回合起开放军械库，按 B 配置。"})]})]}),S.jsxs("button",{className:"deploy-button",onClick:()=>n(i),children:[S.jsx("span",{className:"deploy-arrow",children:"↗"}),S.jsxs("span",{className:"deploy-label",children:["部署至 DUST II",S.jsx("small",{children:i==="CT"?"DEFEND THE SITE":"PLANT THE OBJECTIVE"})]}),S.jsx("span",{className:"deploy-key",children:"ENTER"})]}),S.jsxs("div",{className:"controls-grid",children:[S.jsxs("div",{children:[S.jsx("kbd",{children:"W A S D"}),S.jsx("span",{children:"移动"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"SPACE"}),S.jsx("span",{children:"跳跃 / 接管"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"MOUSE 1"}),S.jsx("span",{children:"开火"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"MOUSE 2"}),S.jsx("span",{children:"AWP 开镜"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"R"}),S.jsx("span",{children:"换弹"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"1 / 2 / 3"}),S.jsx("span",{children:"切换武器"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"E"}),S.jsx("span",{children:"安放 / 拆除"})]}),S.jsxs("div",{children:[S.jsx("kbd",{children:"SHIFT"}),S.jsx("span",{children:"静步"})]})]})]})]}),S.jsxs("footer",{className:"menu-footer",children:[S.jsxs("div",{children:[S.jsx("span",{className:"footer-dot"})," THREE.JS / REACT / TYPESCRIPT"]}),S.jsx("div",{children:"100% PROCEDURAL ASSETS · WEB AUDIO SYNTHESIS"}),S.jsx("div",{className:"footer-warning",children:"PROTOTYPE BUILD · AI 5V5"})]})]})}const K2={ak47:{dmg:"36",rate:"600 RPM",ctrl:"低稳定"},m4a4:{dmg:"30",rate:"730 RPM",ctrl:"高稳定"},awp:{dmg:"115",rate:"单发",ctrl:"开镜"},deagle:{dmg:"48",rate:"半自动",ctrl:"7 发"}};function Z2({id:n}){return S.jsxs("div",{className:`weapon-glyph glyph-${n}`,children:[S.jsx("i",{className:"wg-body"}),S.jsx("i",{className:"wg-barrel"}),S.jsx("i",{className:"wg-mag"}),S.jsx("i",{className:"wg-stock"}),n==="awp"&&S.jsx("i",{className:"wg-scope"})]})}function J2({hud:n,game:e}){if(!n.player)return null;const t=n.player.team,i=n_.filter(s=>s.team==="both"||s.team===t),r=n.player.weapon;return S.jsx("div",{className:"menu-overlay buy-overlay",children:S.jsxs("div",{className:"buy-card",children:[S.jsxs("div",{className:"buy-head",children:[S.jsxs("div",{children:[S.jsxs("div",{className:"eyebrow",children:["FIELD ARMORY // ROUND ",String(n.round).padStart(2,"0")]}),S.jsx("h1",{children:"军械库"}),S.jsx("p",{children:"试验场补给已解锁。选择主武器、副武器或补充护甲，配置将在本回合冻结时间结束后生效。"})]}),S.jsxs("div",{className:"buy-loadout",children:[S.jsx("span",{children:"当前配置"}),S.jsx("b",{children:r}),S.jsxs("small",{children:["护甲 ",n.player.armor," · ",t==="CT"?"CT":"T"," 阵营"]})]})]}),S.jsx("div",{className:"buy-grid",children:i.map(s=>{var c;const o=K2[s.id],a=s.kind!=="armor",l=a&&r===(s.kind==="primary"||s.kind==="pistol"?(c=ec[s.id])==null?void 0:c.name:"");return S.jsxs("button",{className:`buy-item ${s.kind} ${l?"selected":""}`,onClick:()=>e.buyOption(s.id),children:[S.jsxs("div",{className:"buy-item-top",children:[S.jsx("span",{className:"buy-kind",children:s.kind==="primary"?"主武器":s.kind==="pistol"?"副武器":"装备"}),S.jsx("span",{className:"buy-status",children:l?"已装备":"点击装备"})]}),a?S.jsx(Z2,{id:s.id}):S.jsxs("div",{className:"armor-glyph",children:[S.jsx("i",{}),S.jsx("i",{}),S.jsx("i",{})]}),S.jsx("div",{className:"buy-name",children:s.name}),S.jsx("div",{className:"buy-desc",children:s.desc}),o?S.jsxs("div",{className:"buy-stats",children:[S.jsxs("span",{children:[S.jsx("small",{children:"伤害"}),o.dmg]}),S.jsxs("span",{children:[S.jsx("small",{children:"射速"}),o.rate]}),S.jsxs("span",{children:[S.jsx("small",{children:"特性"}),o.ctrl]})]}):S.jsxs("div",{className:"buy-stats armor-stats",children:[S.jsxs("span",{children:[S.jsx("small",{children:"护甲"}),"+100"]}),S.jsxs("span",{children:[S.jsx("small",{children:"减伤"}),"吸收"]}),S.jsxs("span",{children:[S.jsx("small",{children:"状态"}),"满配"]})]}),S.jsxs("div",{className:"buy-cta",children:["装备 ",S.jsx("span",{children:"→"})]})]},s.id)})}),S.jsxs("div",{className:"buy-foot",children:[S.jsxs("div",{className:"buy-tip",children:[S.jsx("span",{className:"key-dot",children:"B"})," 关闭军械库并继续准备"]}),S.jsxs("div",{className:"buy-actions",children:[S.jsx("button",{className:"ghost-button",onClick:()=>e.setBuyOpen(!1),children:"返回战场"}),S.jsxs("button",{className:"primary-button",onClick:()=>e.setBuyOpen(!1),children:["进入战斗 ",S.jsx("span",{children:"→"})]})]})]})]})})}function Q2(){const n=rn.useRef(null),e=rn.useRef(null),[t,i]=rn.useState(null),[r,s]=rn.useState(null),[o,a]=rn.useState(!0),[l,c]=rn.useState("");rn.useEffect(()=>{if(n.current)try{const m=new W2(n.current,_=>s(_));return e.current=m,i(m),()=>{m.dispose(),e.current=null}}catch(m){console.error(m),c(m instanceof Error?m.message:"WebGL 初始化失败")}},[]);const u=rn.useCallback(m=>{var _;(_=e.current)==null||_.startGame(m)},[]),f=rn.useCallback(()=>{a(m=>{var v;const _=!m;return(v=e.current)==null||v.audio.setEnabled(_),_})},[]),d=r&&r.ctScore>r.tScore?"CT":"T",p=r==null?void 0:r.scoreboard.slice().sort((m,_)=>_.kills-m.kills)[0];return S.jsxs("div",{className:"game-shell",ref:n,children:[l&&S.jsxs("div",{className:"fatal-screen",children:[S.jsx("h1",{children:"无法启动战术模拟"}),S.jsx("p",{children:l}),S.jsx("small",{children:"请确认浏览器启用了 WebGL 与硬件加速。"})]}),t&&r&&S.jsxs("div",{className:"ui-layer",children:[r.started&&S.jsx($2,{hud:r,game:t}),!r.started&&S.jsx(q2,{onStart:u,audioEnabled:o,onToggleAudio:f}),r.started&&r.buyOpen&&S.jsx(J2,{hud:r,game:t}),r.started&&r.paused&&!r.buyOpen&&!r.matchOver&&S.jsx("div",{className:"menu-overlay pause-overlay",children:S.jsxs("div",{className:"pause-card",children:[S.jsx("div",{className:"pause-sigil",children:"II"}),S.jsx("div",{className:"eyebrow",children:"SIMULATION SUSPENDED"}),S.jsx("h1",{children:"战术暂停"}),S.jsx("p",{children:"鼠标已释放。恢复后点击画面重新锁定指针。"}),S.jsxs("div",{className:"pause-stats",children:[S.jsxs("div",{children:[S.jsx("span",{children:"回合"}),S.jsx("b",{children:r.round})]}),S.jsxs("div",{children:[S.jsx("span",{children:"比分"}),S.jsxs("b",{className:"ct",children:["CT ",r.ctScore]}),S.jsxs("b",{className:"t",children:["T ",r.tScore]})]}),S.jsxs("div",{children:[S.jsx("span",{children:"状态"}),S.jsx("b",{children:r.phase==="planted"?"C4 倒计时":"进行中"})]})]}),S.jsxs("div",{className:"pause-actions",children:[S.jsxs("button",{className:"primary-button wide",onClick:()=>t.resume(),children:["恢复战斗 ",S.jsx("span",{children:"→"})]}),S.jsx("button",{className:"ghost-button wide",onClick:()=>t.restartMatch(),children:"重新开始比赛"}),S.jsx("button",{className:"ghost-button wide",onClick:()=>t.returnToMenu(),children:"返回主菜单"})]}),S.jsx("button",{className:"sound-toggle",onClick:f,children:o?"声音：开启":"声音：关闭"}),S.jsxs("div",{className:"pause-controls",children:[S.jsxs("span",{children:[S.jsx("kbd",{children:"WASD"})," 移动"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"SHIFT"})," 静步"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"SPACE"})," 跳跃"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"E"})," 安放 / 拆除"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"R"})," 换弹"]}),S.jsxs("span",{children:[S.jsx("kbd",{children:"B"})," 军械库"]})]})]})}),r.started&&r.matchOver&&S.jsx("div",{className:"menu-overlay match-over",children:S.jsxs("div",{className:`match-card ${d==="CT"?"ct-win":"t-win"}`,children:[S.jsxs("div",{className:"match-kicker",children:["MATCH COMPLETE // ",d==="CT"?"COUNTER-TERRORISTS":"TERRORISTS"," WIN"]}),S.jsx("div",{className:"match-team-mark",children:d}),S.jsx("h1",{children:d==="CT"?"防线守住了":"目标被摧毁"}),S.jsxs("div",{className:"final-score",children:[S.jsxs("div",{children:[S.jsx("span",{children:"CT"}),S.jsx("b",{children:r.ctScore})]}),S.jsx("em",{children:":"}),S.jsxs("div",{children:[S.jsx("span",{children:"T"}),S.jsx("b",{children:r.tScore})]})]}),p&&S.jsxs("div",{className:"mvp-line",children:[S.jsx("span",{children:"MVP"}),S.jsx("b",{children:p.name}),S.jsxs("small",{children:[p.kills," KILLS · ",p.deaths," DEATHS"]})]}),S.jsxs("div",{className:"match-actions",children:[S.jsxs("button",{className:"primary-button",onClick:()=>t.restartMatch(),children:["再战一场 ",S.jsx("span",{children:"→"})]}),S.jsx("button",{className:"ghost-button",onClick:()=>t.returnToMenu(),children:"返回主菜单"})]})]})})]})]})}Du.createRoot(document.getElementById("root")).render(S.jsx(Q2,{}));

import{r as R,g as I,R as A}from"./index.CZlPm10g.js";const m=e=>{let t;const n=new Set,o=(s,l)=>{const c=typeof s=="function"?s(t):s;if(!Object.is(c,t)){const i=t;t=l??(typeof c!="object"||c===null)?c:Object.assign({},t,c),n.forEach(a=>a(t,i))}},r=()=>t,E={setState:o,getState:r,getInitialState:()=>p,subscribe:s=>(n.add(s),()=>n.delete(s)),destroy:()=>{n.clear()}},p=t=e(o,r,E);return E},O=e=>e?m(e):m;var x={exports:{}},g={},b={exports:{}},w={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=R;function T(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var P=typeof Object.is=="function"?Object.is:T,_=f.useState,F=f.useEffect,V=f.useLayoutEffect,j=f.useDebugValue;function q(e,t){var n=t(),o=_({inst:{value:n,getSnapshot:t}}),r=o[0].inst,u=o[1];return V(function(){r.value=n,r.getSnapshot=t,y(r)&&u({inst:r})},[e,n,t]),F(function(){return y(r)&&u({inst:r}),e(function(){y(r)&&u({inst:r})})},[e]),j(n),n}function y(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!P(e,n)}catch{return!0}}function W(e,t){return t()}var $=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?W:q;w.useSyncExternalStore=f.useSyncExternalStore!==void 0?f.useSyncExternalStore:$;b.exports=w;var B=b.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=R,C=B;function L(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var M=typeof Object.is=="function"?Object.is:L,U=C.useSyncExternalStore,z=v.useRef,X=v.useEffect,k=v.useMemo,G=v.useDebugValue;g.useSyncExternalStoreWithSelector=function(e,t,n,o,r){var u=z(null);if(u.current===null){var d={hasValue:!1,value:null};u.current=d}else d=u.current;u=k(function(){function E(i){if(!p){if(p=!0,s=i,i=o(i),r!==void 0&&d.hasValue){var a=d.value;if(r(a,i))return l=a}return l=i}if(a=l,M(s,i))return a;var h=o(i);return r!==void 0&&r(a,h)?a:(s=i,l=h)}var p=!1,s,l,c=n===void 0?null:n;return[function(){return E(t())},c===null?void 0:function(){return E(c())}]},[t,n,o,r]);var S=U(e,u[0],u[1]);return X(function(){d.hasValue=!0,d.value=S},[S]),G(S),S};x.exports=g;var H=x.exports;const J=I(H),{useDebugValue:K}=A,{useSyncExternalStoreWithSelector:N}=J;const Q=e=>e;function Y(e,t=Q,n){const o=N(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return K(o),o}const D=e=>{const t=typeof e=="function"?O(e):e,n=(o,r)=>Y(t,o,r);return Object.assign(n,t),n},Z=e=>e?D(e):D;var te=e=>Z(e);export{te as r};

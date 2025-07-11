/**
* @vue/shared v3.4.24
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const b=()=>{},a=Object.prototype.hasOwnProperty,j=(t,c)=>a.call(t,c),l=Array.isArray,O=t=>o(t)==="[object Date]",n=t=>typeof t=="function",u=t=>typeof t=="string",r=t=>t!==null&&typeof t=="object",g=t=>(r(t)||n(t))&&n(t.then)&&n(t.catch),i=Object.prototype.toString,o=t=>i.call(t),f=t=>o(t)==="[object Object]",s=t=>{const c=Object.create(null);return e=>c[e]||(c[e]=t(e))},p=/-(\w)/g,w=s(t=>t.replace(p,(c,e)=>e?e.toUpperCase():"")),h=/\B([A-Z])/g,A=s(t=>t.replace(h,"-$1").toLowerCase()),P=s(t=>t.charAt(0).toUpperCase()+t.slice(1));export{b as N,l as a,r as b,n as c,w as d,O as e,P as f,g,j as h,u as i,f as j,A as k};

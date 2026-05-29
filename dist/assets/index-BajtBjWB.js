(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const eu=()=>{};var ko={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},nu=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[e++],a=n[e++],c=n[e++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Ga={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],a=i+1<n.length,c=a?n[i+1]:0,h=i+2<n.length,d=h?n[i+2]:0,p=o>>2,g=(o&3)<<4|c>>4;let E=(c&15)<<2|d>>6,S=d&63;h||(S=64,a||(E=64)),r.push(e[p],e[g],e[E],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Ha(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):nu(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=e[n.charAt(i++)],c=i<n.length?e[n.charAt(i)]:0;++i;const d=i<n.length?e[n.charAt(i)]:64;++i;const g=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||c==null||d==null||g==null)throw new ru;const E=o<<2|c>>4;if(r.push(E),d!==64){const S=c<<4&240|d>>2;if(r.push(S),g!==64){const C=d<<6&192|g;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ru extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const su=function(n){const t=Ha(n);return Ga.encodeByteArray(t,!0)},Ir=function(n){return su(n).replace(/\./g,"")},iu=function(n){try{return Ga.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ou(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=()=>ou().__FIREBASE_DEFAULTS__,lu=()=>{if(typeof process>"u"||typeof ko>"u")return;const n=ko.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},cu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&iu(n[1]);return t&&JSON.parse(t)},ii=()=>{try{return eu()||au()||lu()||cu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},uu=n=>{var t,e;return(e=(t=ii())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},hu=n=>{const t=uu(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ka=()=>{var n;return(n=ii())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function fu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ir(JSON.stringify(e)),Ir(JSON.stringify(a)),""].join(".")}const bn={};function gu(){const n={prod:[],emulator:[]};for(const t of Object.keys(bn))bn[t]?n.emulator.push(t):n.prod.push(t);return n}function mu(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let No=!1;function yu(n,t){if(typeof window>"u"||typeof document>"u"||!oi(window.location.host)||bn[n]===t||bn[n]||No)return;bn[n]=t;function e(E){return`__firebase__banner__${E}`}const r="__firebase__banner",o=gu().prod.length>0;function a(){const E=document.getElementById(r);E&&E.remove()}function c(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function h(E,S){E.setAttribute("width","24"),E.setAttribute("id",S),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function d(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{No=!0,a()},E}function p(E,S){E.setAttribute("id",S),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function g(){const E=mu(r),S=e("text"),C=document.getElementById(S)||document.createElement("span"),V=e("learnmore"),D=document.getElementById(V)||document.createElement("a"),k=e("preprendIcon"),F=document.getElementById(k)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const H=E.element;c(H),p(D,V);const et=d();h(F,k),H.append(F,C,D,et),document.body.appendChild(H)}o?(C.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vu(){var n;const t=(n=ii())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Eu(){return!vu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Tu(){try{return typeof indexedDB=="object"}catch{return!1}}function Iu(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="FirebaseError";class en extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=wu,Object.setPrototypeOf(this,en.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wa.prototype.create)}}class Wa{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?Au(o,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new en(i,c,r)}}function Au(n,t){return n.replace(bu,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const bu=/\{\$([^}]+)}/g;function wr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const o=n[i],a=t[i];if(Oo(o)&&Oo(a)){if(!wr(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function Oo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qa(n){return n&&n._delegate?n._delegate:n}class Dn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new du;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t?.identifier),i=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Su(t))try{this.getOrInitializeService({instanceIdentifier:Ce})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=Ce){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ce){return this.instances.has(t)}getOptions(t=Ce){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(i)}return i}onInit(t,e){var r;const i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Cu(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ce){return this.component?this.component.multipleInstances?t:Ce:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Cu(n){return n===Ce?void 0:n}function Su(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Pu(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(X||(X={}));const xu={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},Du=X.INFO,Vu={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},ku=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=Vu[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Xa{constructor(t){this.name=t,this._logLevel=Du,this._logHandler=ku,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in X))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?xu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...t),this._logHandler(this,X.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...t),this._logHandler(this,X.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,X.INFO,...t),this._logHandler(this,X.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,X.WARN,...t),this._logHandler(this,X.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...t),this._logHandler(this,X.ERROR,...t)}}const Nu=(n,t)=>t.some(e=>n instanceof e);let Lo,Mo;function Ou(){return Lo||(Lo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Lu(){return Mo||(Mo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ja=new WeakMap,Os=new WeakMap,Ya=new WeakMap,Es=new WeakMap,ai=new WeakMap;function Mu(n){const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(ae(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&Ja.set(e,n)}).catch(()=>{}),ai.set(t,n),t}function Fu(n){if(Os.has(n))return;const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Os.set(n,t)}let Ls={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Os.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Ya.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return ae(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function ju(n){Ls=n(Ls)}function $u(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Ts(this),t,...e);return Ya.set(r,t.sort?t.sort():[t]),ae(r)}:Lu().includes(n)?function(...t){return n.apply(Ts(this),t),ae(Ja.get(this))}:function(...t){return ae(n.apply(Ts(this),t))}}function Bu(n){return typeof n=="function"?$u(n):(n instanceof IDBTransaction&&Fu(n),Nu(n,Ou())?new Proxy(n,Ls):n)}function ae(n){if(n instanceof IDBRequest)return Mu(n);if(Es.has(n))return Es.get(n);const t=Bu(n);return t!==n&&(Es.set(n,t),ai.set(t,n)),t}const Ts=n=>ai.get(n);function Uu(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(n,t),c=ae(a);return r&&a.addEventListener("upgradeneeded",h=>{r(ae(a.result),h.oldVersion,h.newVersion,ae(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const zu=["get","getKey","getAll","getAllKeys","count"],qu=["put","add","delete","clear"],Is=new Map;function Fo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Is.get(t))return Is.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,i=qu.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||zu.includes(e)))return;const o=async function(a,...c){const h=this.transaction(a,i?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[e](...c),i&&h.done]))[0]};return Is.set(t,o),o}ju(n=>({...n,get:(t,e,r)=>Fo(t,e)||n.get(t,e,r),has:(t,e)=>!!Fo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Gu(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Gu(n){const t=n.getComponent();return t?.type==="VERSION"}const Ms="@firebase/app",jo="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new Xa("@firebase/app"),Ku="@firebase/app-compat",Wu="@firebase/analytics-compat",Qu="@firebase/analytics",Xu="@firebase/app-check-compat",Ju="@firebase/app-check",Yu="@firebase/auth",Zu="@firebase/auth-compat",th="@firebase/database",eh="@firebase/data-connect",nh="@firebase/database-compat",rh="@firebase/functions",sh="@firebase/functions-compat",ih="@firebase/installations",oh="@firebase/installations-compat",ah="@firebase/messaging",lh="@firebase/messaging-compat",ch="@firebase/performance",uh="@firebase/performance-compat",hh="@firebase/remote-config",dh="@firebase/remote-config-compat",fh="@firebase/storage",ph="@firebase/storage-compat",gh="@firebase/firestore",mh="@firebase/ai",yh="@firebase/firestore-compat",_h="firebase",vh="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs="[DEFAULT]",Eh={[Ms]:"fire-core",[Ku]:"fire-core-compat",[Qu]:"fire-analytics",[Wu]:"fire-analytics-compat",[Ju]:"fire-app-check",[Xu]:"fire-app-check-compat",[Yu]:"fire-auth",[Zu]:"fire-auth-compat",[th]:"fire-rtdb",[eh]:"fire-data-connect",[nh]:"fire-rtdb-compat",[rh]:"fire-fn",[sh]:"fire-fn-compat",[ih]:"fire-iid",[oh]:"fire-iid-compat",[ah]:"fire-fcm",[lh]:"fire-fcm-compat",[ch]:"fire-perf",[uh]:"fire-perf-compat",[hh]:"fire-rc",[dh]:"fire-rc-compat",[fh]:"fire-gcs",[ph]:"fire-gcs-compat",[gh]:"fire-fst",[yh]:"fire-fst-compat",[mh]:"fire-vertex","fire-js":"fire-js",[_h]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=new Map,Th=new Map,js=new Map;function $o(n,t){try{n.container.addComponent(t)}catch(e){Yt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function br(n){const t=n.name;if(js.has(t))return Yt.debug(`There were multiple attempts to register component ${t}.`),!1;js.set(t,n);for(const e of Ar.values())$o(e,n);for(const e of Th.values())$o(e,n);return!0}function Ih(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function wh(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},le=new Wa("app","Firebase",Ah);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw le.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ph=vh;function Za(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Fs,automaticDataCollectionEnabled:!0},t),i=r.name;if(typeof i!="string"||!i)throw le.create("bad-app-name",{appName:String(i)});if(e||(e=Ka()),!e)throw le.create("no-options");const o=Ar.get(i);if(o){if(wr(e,o.options)&&wr(r,o.config))return o;throw le.create("duplicate-app",{appName:i})}const a=new Ru(i);for(const h of js.values())a.addComponent(h);const c=new bh(e,r,a);return Ar.set(i,c),c}function Ch(n=Fs){const t=Ar.get(n);if(!t&&n===Fs&&Ka())return Za();if(!t)throw le.create("no-app",{appName:n});return t}function qe(n,t,e){var r;let i=(r=Eh[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);const o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const c=[`Unable to register library "${i}" with version "${t}":`];o&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Yt.warn(c.join(" "));return}br(new Dn(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="firebase-heartbeat-database",Rh=1,Vn="firebase-heartbeat-store";let ws=null;function tl(){return ws||(ws=Uu(Sh,Rh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Vn)}catch(e){console.warn(e)}}}}).catch(n=>{throw le.create("idb-open",{originalErrorMessage:n.message})})),ws}async function xh(n){try{const e=(await tl()).transaction(Vn),r=await e.objectStore(Vn).get(el(n));return await e.done,r}catch(t){if(t instanceof en)Yt.warn(t.message);else{const e=le.create("idb-get",{originalErrorMessage:t?.message});Yt.warn(e.message)}}}async function Bo(n,t){try{const r=(await tl()).transaction(Vn,"readwrite");await r.objectStore(Vn).put(t,el(n)),await r.done}catch(e){if(e instanceof en)Yt.warn(e.message);else{const r=le.create("idb-set",{originalErrorMessage:e?.message});Yt.warn(r.message)}}}function el(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh=1024,Vh=30;class kh{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Oh(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Uo();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Vh){const a=Lh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Yt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Uo(),{heartbeatsToSend:r,unsentEntries:i}=Nh(this._heartbeatsCache.heartbeats),o=Ir(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Yt.warn(e),""}}}function Uo(){return new Date().toISOString().substring(0,10)}function Nh(n,t=Dh){const e=[];let r=n.slice();for(const i of n){const o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),zo(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),zo(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Oh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Tu()?Iu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await xh(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return Bo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return Bo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function zo(n){return Ir(JSON.stringify({version:2,heartbeats:n})).length}function Lh(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mh(n){br(new Dn("platform-logger",t=>new Hu(t),"PRIVATE")),br(new Dn("heartbeat",t=>new kh(t),"PRIVATE")),qe(Ms,jo,n),qe(Ms,jo,"esm2017"),qe("fire-js","")}Mh("");var Fh="firebase",jh="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe(Fh,jh,"app");var qo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ce,nl;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(w,m){function v(){}v.prototype=m.prototype,w.D=m.prototype,w.prototype=new v,w.prototype.constructor=w,w.C=function(T,_,I){for(var y=Array(arguments.length-2),ot=2;ot<arguments.length;ot++)y[ot-2]=arguments[ot];return m.prototype[_].apply(T,y)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,m,v){v||(v=0);var T=Array(16);if(typeof m=="string")for(var _=0;16>_;++_)T[_]=m.charCodeAt(v++)|m.charCodeAt(v++)<<8|m.charCodeAt(v++)<<16|m.charCodeAt(v++)<<24;else for(_=0;16>_;++_)T[_]=m[v++]|m[v++]<<8|m[v++]<<16|m[v++]<<24;m=w.g[0],v=w.g[1],_=w.g[2];var I=w.g[3],y=m+(I^v&(_^I))+T[0]+3614090360&4294967295;m=v+(y<<7&4294967295|y>>>25),y=I+(_^m&(v^_))+T[1]+3905402710&4294967295,I=m+(y<<12&4294967295|y>>>20),y=_+(v^I&(m^v))+T[2]+606105819&4294967295,_=I+(y<<17&4294967295|y>>>15),y=v+(m^_&(I^m))+T[3]+3250441966&4294967295,v=_+(y<<22&4294967295|y>>>10),y=m+(I^v&(_^I))+T[4]+4118548399&4294967295,m=v+(y<<7&4294967295|y>>>25),y=I+(_^m&(v^_))+T[5]+1200080426&4294967295,I=m+(y<<12&4294967295|y>>>20),y=_+(v^I&(m^v))+T[6]+2821735955&4294967295,_=I+(y<<17&4294967295|y>>>15),y=v+(m^_&(I^m))+T[7]+4249261313&4294967295,v=_+(y<<22&4294967295|y>>>10),y=m+(I^v&(_^I))+T[8]+1770035416&4294967295,m=v+(y<<7&4294967295|y>>>25),y=I+(_^m&(v^_))+T[9]+2336552879&4294967295,I=m+(y<<12&4294967295|y>>>20),y=_+(v^I&(m^v))+T[10]+4294925233&4294967295,_=I+(y<<17&4294967295|y>>>15),y=v+(m^_&(I^m))+T[11]+2304563134&4294967295,v=_+(y<<22&4294967295|y>>>10),y=m+(I^v&(_^I))+T[12]+1804603682&4294967295,m=v+(y<<7&4294967295|y>>>25),y=I+(_^m&(v^_))+T[13]+4254626195&4294967295,I=m+(y<<12&4294967295|y>>>20),y=_+(v^I&(m^v))+T[14]+2792965006&4294967295,_=I+(y<<17&4294967295|y>>>15),y=v+(m^_&(I^m))+T[15]+1236535329&4294967295,v=_+(y<<22&4294967295|y>>>10),y=m+(_^I&(v^_))+T[1]+4129170786&4294967295,m=v+(y<<5&4294967295|y>>>27),y=I+(v^_&(m^v))+T[6]+3225465664&4294967295,I=m+(y<<9&4294967295|y>>>23),y=_+(m^v&(I^m))+T[11]+643717713&4294967295,_=I+(y<<14&4294967295|y>>>18),y=v+(I^m&(_^I))+T[0]+3921069994&4294967295,v=_+(y<<20&4294967295|y>>>12),y=m+(_^I&(v^_))+T[5]+3593408605&4294967295,m=v+(y<<5&4294967295|y>>>27),y=I+(v^_&(m^v))+T[10]+38016083&4294967295,I=m+(y<<9&4294967295|y>>>23),y=_+(m^v&(I^m))+T[15]+3634488961&4294967295,_=I+(y<<14&4294967295|y>>>18),y=v+(I^m&(_^I))+T[4]+3889429448&4294967295,v=_+(y<<20&4294967295|y>>>12),y=m+(_^I&(v^_))+T[9]+568446438&4294967295,m=v+(y<<5&4294967295|y>>>27),y=I+(v^_&(m^v))+T[14]+3275163606&4294967295,I=m+(y<<9&4294967295|y>>>23),y=_+(m^v&(I^m))+T[3]+4107603335&4294967295,_=I+(y<<14&4294967295|y>>>18),y=v+(I^m&(_^I))+T[8]+1163531501&4294967295,v=_+(y<<20&4294967295|y>>>12),y=m+(_^I&(v^_))+T[13]+2850285829&4294967295,m=v+(y<<5&4294967295|y>>>27),y=I+(v^_&(m^v))+T[2]+4243563512&4294967295,I=m+(y<<9&4294967295|y>>>23),y=_+(m^v&(I^m))+T[7]+1735328473&4294967295,_=I+(y<<14&4294967295|y>>>18),y=v+(I^m&(_^I))+T[12]+2368359562&4294967295,v=_+(y<<20&4294967295|y>>>12),y=m+(v^_^I)+T[5]+4294588738&4294967295,m=v+(y<<4&4294967295|y>>>28),y=I+(m^v^_)+T[8]+2272392833&4294967295,I=m+(y<<11&4294967295|y>>>21),y=_+(I^m^v)+T[11]+1839030562&4294967295,_=I+(y<<16&4294967295|y>>>16),y=v+(_^I^m)+T[14]+4259657740&4294967295,v=_+(y<<23&4294967295|y>>>9),y=m+(v^_^I)+T[1]+2763975236&4294967295,m=v+(y<<4&4294967295|y>>>28),y=I+(m^v^_)+T[4]+1272893353&4294967295,I=m+(y<<11&4294967295|y>>>21),y=_+(I^m^v)+T[7]+4139469664&4294967295,_=I+(y<<16&4294967295|y>>>16),y=v+(_^I^m)+T[10]+3200236656&4294967295,v=_+(y<<23&4294967295|y>>>9),y=m+(v^_^I)+T[13]+681279174&4294967295,m=v+(y<<4&4294967295|y>>>28),y=I+(m^v^_)+T[0]+3936430074&4294967295,I=m+(y<<11&4294967295|y>>>21),y=_+(I^m^v)+T[3]+3572445317&4294967295,_=I+(y<<16&4294967295|y>>>16),y=v+(_^I^m)+T[6]+76029189&4294967295,v=_+(y<<23&4294967295|y>>>9),y=m+(v^_^I)+T[9]+3654602809&4294967295,m=v+(y<<4&4294967295|y>>>28),y=I+(m^v^_)+T[12]+3873151461&4294967295,I=m+(y<<11&4294967295|y>>>21),y=_+(I^m^v)+T[15]+530742520&4294967295,_=I+(y<<16&4294967295|y>>>16),y=v+(_^I^m)+T[2]+3299628645&4294967295,v=_+(y<<23&4294967295|y>>>9),y=m+(_^(v|~I))+T[0]+4096336452&4294967295,m=v+(y<<6&4294967295|y>>>26),y=I+(v^(m|~_))+T[7]+1126891415&4294967295,I=m+(y<<10&4294967295|y>>>22),y=_+(m^(I|~v))+T[14]+2878612391&4294967295,_=I+(y<<15&4294967295|y>>>17),y=v+(I^(_|~m))+T[5]+4237533241&4294967295,v=_+(y<<21&4294967295|y>>>11),y=m+(_^(v|~I))+T[12]+1700485571&4294967295,m=v+(y<<6&4294967295|y>>>26),y=I+(v^(m|~_))+T[3]+2399980690&4294967295,I=m+(y<<10&4294967295|y>>>22),y=_+(m^(I|~v))+T[10]+4293915773&4294967295,_=I+(y<<15&4294967295|y>>>17),y=v+(I^(_|~m))+T[1]+2240044497&4294967295,v=_+(y<<21&4294967295|y>>>11),y=m+(_^(v|~I))+T[8]+1873313359&4294967295,m=v+(y<<6&4294967295|y>>>26),y=I+(v^(m|~_))+T[15]+4264355552&4294967295,I=m+(y<<10&4294967295|y>>>22),y=_+(m^(I|~v))+T[6]+2734768916&4294967295,_=I+(y<<15&4294967295|y>>>17),y=v+(I^(_|~m))+T[13]+1309151649&4294967295,v=_+(y<<21&4294967295|y>>>11),y=m+(_^(v|~I))+T[4]+4149444226&4294967295,m=v+(y<<6&4294967295|y>>>26),y=I+(v^(m|~_))+T[11]+3174756917&4294967295,I=m+(y<<10&4294967295|y>>>22),y=_+(m^(I|~v))+T[2]+718787259&4294967295,_=I+(y<<15&4294967295|y>>>17),y=v+(I^(_|~m))+T[9]+3951481745&4294967295,w.g[0]=w.g[0]+m&4294967295,w.g[1]=w.g[1]+(_+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+_&4294967295,w.g[3]=w.g[3]+I&4294967295}r.prototype.u=function(w,m){m===void 0&&(m=w.length);for(var v=m-this.blockSize,T=this.B,_=this.h,I=0;I<m;){if(_==0)for(;I<=v;)i(this,w,I),I+=this.blockSize;if(typeof w=="string"){for(;I<m;)if(T[_++]=w.charCodeAt(I++),_==this.blockSize){i(this,T),_=0;break}}else for(;I<m;)if(T[_++]=w[I++],_==this.blockSize){i(this,T),_=0;break}}this.h=_,this.o+=m},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var m=1;m<w.length-8;++m)w[m]=0;var v=8*this.o;for(m=w.length-8;m<w.length;++m)w[m]=v&255,v/=256;for(this.u(w),w=Array(16),m=v=0;4>m;++m)for(var T=0;32>T;T+=8)w[v++]=this.g[m]>>>T&255;return w};function o(w,m){var v=c;return Object.prototype.hasOwnProperty.call(v,w)?v[w]:v[w]=m(w)}function a(w,m){this.h=m;for(var v=[],T=!0,_=w.length-1;0<=_;_--){var I=w[_]|0;T&&I==m||(v[_]=I,T=!1)}this.g=v}var c={};function h(w){return-128<=w&&128>w?o(w,function(m){return new a([m|0],0>m?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return g;if(0>w)return D(d(-w));for(var m=[],v=1,T=0;w>=v;T++)m[T]=w/v|0,v*=4294967296;return new a(m,0)}function p(w,m){if(w.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(w.charAt(0)=="-")return D(p(w.substring(1),m));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=d(Math.pow(m,8)),T=g,_=0;_<w.length;_+=8){var I=Math.min(8,w.length-_),y=parseInt(w.substring(_,_+I),m);8>I?(I=d(Math.pow(m,I)),T=T.j(I).add(d(y))):(T=T.j(v),T=T.add(d(y)))}return T}var g=h(0),E=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(V(this))return-D(this).m();for(var w=0,m=1,v=0;v<this.g.length;v++){var T=this.i(v);w+=(0<=T?T:4294967296+T)*m,m*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(V(this))return"-"+D(this).toString(w);for(var m=d(Math.pow(w,6)),v=this,T="";;){var _=et(v,m).g;v=k(v,_.j(m));var I=((0<v.g.length?v.g[0]:v.h)>>>0).toString(w);if(v=_,C(v))return I+T;for(;6>I.length;)I="0"+I;T=I+T}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(var m=0;m<w.g.length;m++)if(w.g[m]!=0)return!1;return!0}function V(w){return w.h==-1}n.l=function(w){return w=k(this,w),V(w)?-1:C(w)?0:1};function D(w){for(var m=w.g.length,v=[],T=0;T<m;T++)v[T]=~w.g[T];return new a(v,~w.h).add(E)}n.abs=function(){return V(this)?D(this):this},n.add=function(w){for(var m=Math.max(this.g.length,w.g.length),v=[],T=0,_=0;_<=m;_++){var I=T+(this.i(_)&65535)+(w.i(_)&65535),y=(I>>>16)+(this.i(_)>>>16)+(w.i(_)>>>16);T=y>>>16,I&=65535,y&=65535,v[_]=y<<16|I}return new a(v,v[v.length-1]&-2147483648?-1:0)};function k(w,m){return w.add(D(m))}n.j=function(w){if(C(this)||C(w))return g;if(V(this))return V(w)?D(this).j(D(w)):D(D(this).j(w));if(V(w))return D(this.j(D(w)));if(0>this.l(S)&&0>w.l(S))return d(this.m()*w.m());for(var m=this.g.length+w.g.length,v=[],T=0;T<2*m;T++)v[T]=0;for(T=0;T<this.g.length;T++)for(var _=0;_<w.g.length;_++){var I=this.i(T)>>>16,y=this.i(T)&65535,ot=w.i(_)>>>16,Mt=w.i(_)&65535;v[2*T+2*_]+=y*Mt,F(v,2*T+2*_),v[2*T+2*_+1]+=I*Mt,F(v,2*T+2*_+1),v[2*T+2*_+1]+=y*ot,F(v,2*T+2*_+1),v[2*T+2*_+2]+=I*ot,F(v,2*T+2*_+2)}for(T=0;T<m;T++)v[T]=v[2*T+1]<<16|v[2*T];for(T=m;T<2*m;T++)v[T]=0;return new a(v,0)};function F(w,m){for(;(w[m]&65535)!=w[m];)w[m+1]+=w[m]>>>16,w[m]&=65535,m++}function H(w,m){this.g=w,this.h=m}function et(w,m){if(C(m))throw Error("division by zero");if(C(w))return new H(g,g);if(V(w))return m=et(D(w),m),new H(D(m.g),D(m.h));if(V(m))return m=et(w,D(m)),new H(D(m.g),m.h);if(30<w.g.length){if(V(w)||V(m))throw Error("slowDivide_ only works with positive integers.");for(var v=E,T=m;0>=T.l(w);)v=_t(v),T=_t(T);var _=nt(v,1),I=nt(T,1);for(T=nt(T,2),v=nt(v,2);!C(T);){var y=I.add(T);0>=y.l(w)&&(_=_.add(v),I=y),T=nt(T,1),v=nt(v,1)}return m=k(w,_.j(m)),new H(_,m)}for(_=g;0<=w.l(m);){for(v=Math.max(1,Math.floor(w.m()/m.m())),T=Math.ceil(Math.log(v)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),I=d(v),y=I.j(m);V(y)||0<y.l(w);)v-=T,I=d(v),y=I.j(m);C(I)&&(I=E),_=_.add(I),w=k(w,y)}return new H(_,w)}n.A=function(w){return et(this,w).h},n.and=function(w){for(var m=Math.max(this.g.length,w.g.length),v=[],T=0;T<m;T++)v[T]=this.i(T)&w.i(T);return new a(v,this.h&w.h)},n.or=function(w){for(var m=Math.max(this.g.length,w.g.length),v=[],T=0;T<m;T++)v[T]=this.i(T)|w.i(T);return new a(v,this.h|w.h)},n.xor=function(w){for(var m=Math.max(this.g.length,w.g.length),v=[],T=0;T<m;T++)v[T]=this.i(T)^w.i(T);return new a(v,this.h^w.h)};function _t(w){for(var m=w.g.length+1,v=[],T=0;T<m;T++)v[T]=w.i(T)<<1|w.i(T-1)>>>31;return new a(v,w.h)}function nt(w,m){var v=m>>5;m%=32;for(var T=w.g.length-v,_=[],I=0;I<T;I++)_[I]=0<m?w.i(I+v)>>>m|w.i(I+v+1)<<32-m:w.i(I+v);return new a(_,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,nl=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,ce=a}).apply(typeof qo<"u"?qo:typeof self<"u"?self:typeof window<"u"?window:{});var ar=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rl,Tn,sl,fr,$s,il,ol,al;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof ar=="object"&&ar];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function i(s,l){if(l)t:{var u=r;s=s.split(".");for(var f=0;f<s.length-1;f++){var A=s[f];if(!(A in u))break t;u=u[A]}s=s[s.length-1],f=u[s],l=l(f),l!=f&&l!=null&&t(u,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var u=0,f=!1,A={next:function(){if(!f&&u<s.length){var P=u++;return{value:l(P,s[P]),done:!1}}return f=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(s){return s||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function d(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function p(s,l,u){return s.call.apply(s.bind,arguments)}function g(s,l,u){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,f),s.apply(l,A)}}return function(){return s.apply(l,arguments)}}function E(s,l,u){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,E.apply(null,arguments)}function S(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function C(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(f,A,P){for(var L=Array(arguments.length-2),rt=2;rt<arguments.length;rt++)L[rt-2]=arguments[rt];return l.prototype[A].apply(f,L)}}function V(s){const l=s.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=s[f];return u}return[]}function D(s,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const A=s.length||0,P=f.length||0;s.length=A+P;for(let L=0;L<P;L++)s[A+L]=f[L]}else s.push(f)}}class k{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function F(s){return/^[\s\xa0]*$/.test(s)}function H(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function et(s){return et[" "](s),s}et[" "]=function(){};var _t=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function nt(s,l,u){for(const f in s)l.call(u,s[f],f,s)}function w(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function m(s){const l={};for(const u in s)l[u]=s[u];return l}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(s,l){let u,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(u in f)s[u]=f[u];for(let P=0;P<v.length;P++)u=v[P],Object.prototype.hasOwnProperty.call(f,u)&&(s[u]=f[u])}}function _(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function I(s){c.setTimeout(()=>{throw s},0)}function y(){var s=Bt;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class ot{constructor(){this.h=this.g=null}add(l,u){const f=Mt.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var Mt=new k(()=>new Vt,s=>s.reset());class Vt{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let ee,$t=!1,Bt=new ot,N=()=>{const s=c.Promise.resolve(void 0);ee=()=>{s.then(B)}};var B=()=>{for(var s;s=y();){try{s.h.call(s.g)}catch(u){I(u)}var l=Mt;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}$t=!1};function W(){this.s=this.s,this.C=this.C}W.prototype.s=!1,W.prototype.ma=function(){this.s||(this.s=!0,this.N())},W.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function U(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}U.prototype.h=function(){this.defaultPrevented=!0};var pt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function Ut(s,l){if(U.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(_t){t:{try{et(l.nodeName);var A=!0;break t}catch{}A=!1}A||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Ot[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Ut.aa.h.call(this)}}C(Ut,U);var Ot={2:"touch",3:"pen",4:"mouse"};Ut.prototype.h=function(){Ut.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Ft="closure_listenable_"+(1e6*Math.random()|0),Ac=0;function bc(s,l,u,f,A){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=A,this.key=++Ac,this.da=this.fa=!1}function zn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function qn(s){this.src=s,this.g={},this.h=0}qn.prototype.add=function(s,l,u,f,A){var P=s.toString();s=this.g[P],s||(s=this.g[P]=[],this.h++);var L=Yr(s,l,f,A);return-1<L?(l=s[L],u||(l.fa=!1)):(l=new bc(l,this.src,P,!!f,A),l.fa=u,s.push(l)),l};function Jr(s,l){var u=l.type;if(u in s.g){var f=s.g[u],A=Array.prototype.indexOf.call(f,l,void 0),P;(P=0<=A)&&Array.prototype.splice.call(f,A,1),P&&(zn(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Yr(s,l,u,f){for(var A=0;A<s.length;++A){var P=s[A];if(!P.da&&P.listener==l&&P.capture==!!u&&P.ha==f)return A}return-1}var Zr="closure_lm_"+(1e6*Math.random()|0),ts={};function ki(s,l,u,f,A){if(Array.isArray(l)){for(var P=0;P<l.length;P++)ki(s,l[P],u,f,A);return null}return u=Li(u),s&&s[Ft]?s.K(l,u,d(f)?!!f.capture:!1,A):Pc(s,l,u,!1,f,A)}function Pc(s,l,u,f,A,P){if(!l)throw Error("Invalid event type");var L=d(A)?!!A.capture:!!A,rt=ns(s);if(rt||(s[Zr]=rt=new qn(s)),u=rt.add(l,u,f,L,P),u.proxy)return u;if(f=Cc(),u.proxy=f,f.src=s,f.listener=u,s.addEventListener)pt||(A=L),A===void 0&&(A=!1),s.addEventListener(l.toString(),f,A);else if(s.attachEvent)s.attachEvent(Oi(l.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Cc(){function s(u){return l.call(s.src,s.listener,u)}const l=Sc;return s}function Ni(s,l,u,f,A){if(Array.isArray(l))for(var P=0;P<l.length;P++)Ni(s,l[P],u,f,A);else f=d(f)?!!f.capture:!!f,u=Li(u),s&&s[Ft]?(s=s.i,l=String(l).toString(),l in s.g&&(P=s.g[l],u=Yr(P,u,f,A),-1<u&&(zn(P[u]),Array.prototype.splice.call(P,u,1),P.length==0&&(delete s.g[l],s.h--)))):s&&(s=ns(s))&&(l=s.g[l.toString()],s=-1,l&&(s=Yr(l,u,f,A)),(u=-1<s?l[s]:null)&&es(u))}function es(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[Ft])Jr(l.i,s);else{var u=s.type,f=s.proxy;l.removeEventListener?l.removeEventListener(u,f,s.capture):l.detachEvent?l.detachEvent(Oi(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=ns(l))?(Jr(u,s),u.h==0&&(u.src=null,l[Zr]=null)):zn(s)}}}function Oi(s){return s in ts?ts[s]:ts[s]="on"+s}function Sc(s,l){if(s.da)s=!0;else{l=new Ut(l,this);var u=s.listener,f=s.ha||s.src;s.fa&&es(s),s=u.call(f,l)}return s}function ns(s){return s=s[Zr],s instanceof qn?s:null}var rs="__closure_events_fn_"+(1e9*Math.random()>>>0);function Li(s){return typeof s=="function"?s:(s[rs]||(s[rs]=function(l){return s.handleEvent(l)}),s[rs])}function It(){W.call(this),this.i=new qn(this),this.M=this,this.F=null}C(It,W),It.prototype[Ft]=!0,It.prototype.removeEventListener=function(s,l,u,f){Ni(this,s,l,u,f)};function Rt(s,l){var u,f=s.F;if(f)for(u=[];f;f=f.F)u.push(f);if(s=s.M,f=l.type||l,typeof l=="string")l=new U(l,s);else if(l instanceof U)l.target=l.target||s;else{var A=l;l=new U(f,s),T(l,A)}if(A=!0,u)for(var P=u.length-1;0<=P;P--){var L=l.g=u[P];A=Hn(L,f,!0,l)&&A}if(L=l.g=s,A=Hn(L,f,!0,l)&&A,A=Hn(L,f,!1,l)&&A,u)for(P=0;P<u.length;P++)L=l.g=u[P],A=Hn(L,f,!1,l)&&A}It.prototype.N=function(){if(It.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],f=0;f<u.length;f++)zn(u[f]);delete s.g[l],s.h--}}this.F=null},It.prototype.K=function(s,l,u,f){return this.i.add(String(s),l,!1,u,f)},It.prototype.L=function(s,l,u,f){return this.i.add(String(s),l,!0,u,f)};function Hn(s,l,u,f){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,P=0;P<l.length;++P){var L=l[P];if(L&&!L.da&&L.capture==u){var rt=L.listener,vt=L.ha||L.src;L.fa&&Jr(s.i,L),A=rt.call(vt,f)!==!1&&A}}return A&&!f.defaultPrevented}function Mi(s,l,u){if(typeof s=="function")u&&(s=E(s,u));else if(s&&typeof s.handleEvent=="function")s=E(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function Fi(s){s.g=Mi(()=>{s.g=null,s.i&&(s.i=!1,Fi(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Rc extends W{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Fi(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ln(s){W.call(this),this.h=s,this.g={}}C(ln,W);var ji=[];function $i(s){nt(s.g,function(l,u){this.g.hasOwnProperty(u)&&es(l)},s),s.g={}}ln.prototype.N=function(){ln.aa.N.call(this),$i(this)},ln.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ss=c.JSON.stringify,xc=c.JSON.parse,Dc=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function is(){}is.prototype.h=null;function Bi(s){return s.h||(s.h=s.i())}function Ui(){}var cn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function os(){U.call(this,"d")}C(os,U);function as(){U.call(this,"c")}C(as,U);var Ie={},zi=null;function Gn(){return zi=zi||new It}Ie.La="serverreachability";function qi(s){U.call(this,Ie.La,s)}C(qi,U);function un(s){const l=Gn();Rt(l,new qi(l))}Ie.STAT_EVENT="statevent";function Hi(s,l){U.call(this,Ie.STAT_EVENT,s),this.stat=l}C(Hi,U);function xt(s){const l=Gn();Rt(l,new Hi(l,s))}Ie.Ma="timingevent";function Gi(s,l){U.call(this,Ie.Ma,s),this.size=l}C(Gi,U);function hn(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function dn(){this.g=!0}dn.prototype.xa=function(){this.g=!1};function Vc(s,l,u,f,A,P){s.info(function(){if(s.g)if(P)for(var L="",rt=P.split("&"),vt=0;vt<rt.length;vt++){var Z=rt[vt].split("=");if(1<Z.length){var wt=Z[0];Z=Z[1];var At=wt.split("_");L=2<=At.length&&At[1]=="type"?L+(wt+"="+Z+"&"):L+(wt+"=redacted&")}}else L=null;else L=P;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+l+`
`+u+`
`+L})}function kc(s,l,u,f,A,P,L){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+l+`
`+u+`
`+P+" "+L})}function ke(s,l,u,f){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+Oc(s,u)+(f?" "+f:"")})}function Nc(s,l){s.info(function(){return"TIMEOUT: "+l})}dn.prototype.info=function(){};function Oc(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var f=u[s];if(!(2>f.length)){var A=f[1];if(Array.isArray(A)&&!(1>A.length)){var P=A[0];if(P!="noop"&&P!="stop"&&P!="close")for(var L=1;L<A.length;L++)A[L]=""}}}}return ss(u)}catch{return l}}var Kn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ki={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ls;function Wn(){}C(Wn,is),Wn.prototype.g=function(){return new XMLHttpRequest},Wn.prototype.i=function(){return{}},ls=new Wn;function ne(s,l,u,f){this.j=s,this.i=l,this.l=u,this.R=f||1,this.U=new ln(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Wi}function Wi(){this.i=null,this.g="",this.h=!1}var Qi={},cs={};function us(s,l,u){s.L=1,s.v=Yn(Qt(l)),s.m=u,s.P=!0,Xi(s,null)}function Xi(s,l){s.F=Date.now(),Qn(s),s.A=Qt(s.v);var u=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),uo(u.i,"t",f),s.C=0,u=s.j.J,s.h=new Wi,s.g=Ro(s.j,u?l:null,!s.m),0<s.O&&(s.M=new Rc(E(s.Y,s,s.g),s.O)),l=s.U,u=s.g,f=s.ca;var A="readystatechange";Array.isArray(A)||(A&&(ji[0]=A.toString()),A=ji);for(var P=0;P<A.length;P++){var L=ki(u,A[P],f||l.handleEvent,!1,l.h||l);if(!L)break;l.g[L.key]=L}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),un(),Vc(s.i,s.u,s.A,s.l,s.R,s.m)}ne.prototype.ca=function(s){s=s.target;const l=this.M;l&&Xt(s)==3?l.j():this.Y(s)},ne.prototype.Y=function(s){try{if(s==this.g)t:{const At=Xt(this.g);var l=this.g.Ba();const Le=this.g.Z();if(!(3>At)&&(At!=3||this.g&&(this.h.h||this.g.oa()||_o(this.g)))){this.J||At!=4||l==7||(l==8||0>=Le?un(3):un(2)),hs(this);var u=this.g.Z();this.X=u;e:if(Ji(this)){var f=_o(this.g);s="";var A=f.length,P=Xt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){we(this),fn(this);var L="";break e}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,s+=this.h.i.decode(f[l],{stream:!(P&&l==A-1)});f.length=0,this.h.g+=s,this.C=0,L=this.h.g}else L=this.g.oa();if(this.o=u==200,kc(this.i,this.u,this.A,this.l,this.R,At,u),this.o){if(this.T&&!this.K){e:{if(this.g){var rt,vt=this.g;if((rt=vt.g?vt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(rt)){var Z=rt;break e}}Z=null}if(u=Z)ke(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ds(this,u);else{this.o=!1,this.s=3,xt(12),we(this),fn(this);break t}}if(this.P){u=!0;let jt;for(;!this.J&&this.C<L.length;)if(jt=Lc(this,L),jt==cs){At==4&&(this.s=4,xt(14),u=!1),ke(this.i,this.l,null,"[Incomplete Response]");break}else if(jt==Qi){this.s=4,xt(15),ke(this.i,this.l,L,"[Invalid Chunk]"),u=!1;break}else ke(this.i,this.l,jt,null),ds(this,jt);if(Ji(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),At!=4||L.length!=0||this.h.h||(this.s=1,xt(16),u=!1),this.o=this.o&&u,!u)ke(this.i,this.l,L,"[Invalid Chunked Response]"),we(this),fn(this);else if(0<L.length&&!this.W){this.W=!0;var wt=this.j;wt.g==this&&wt.ba&&!wt.M&&(wt.j.info("Great, no buffering proxy detected. Bytes received: "+L.length),_s(wt),wt.M=!0,xt(11))}}else ke(this.i,this.l,L,null),ds(this,L);At==4&&we(this),this.o&&!this.J&&(At==4?bo(this.j,this):(this.o=!1,Qn(this)))}else Zc(this.g),u==400&&0<L.indexOf("Unknown SID")?(this.s=3,xt(12)):(this.s=0,xt(13)),we(this),fn(this)}}}catch{}finally{}};function Ji(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Lc(s,l){var u=s.C,f=l.indexOf(`
`,u);return f==-1?cs:(u=Number(l.substring(u,f)),isNaN(u)?Qi:(f+=1,f+u>l.length?cs:(l=l.slice(f,f+u),s.C=f+u,l)))}ne.prototype.cancel=function(){this.J=!0,we(this)};function Qn(s){s.S=Date.now()+s.I,Yi(s,s.I)}function Yi(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=hn(E(s.ba,s),l)}function hs(s){s.B&&(c.clearTimeout(s.B),s.B=null)}ne.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Nc(this.i,this.A),this.L!=2&&(un(),xt(17)),we(this),this.s=2,fn(this)):Yi(this,this.S-s)};function fn(s){s.j.G==0||s.J||bo(s.j,s)}function we(s){hs(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,$i(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function ds(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||fs(u.h,s))){if(!s.K&&fs(u.h,s)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)sr(u),nr(u);else break t;ys(u),xt(18)}}else u.za=A[1],0<u.za-u.T&&37500>A[2]&&u.F&&u.v==0&&!u.C&&(u.C=hn(E(u.Za,u),6e3));if(1>=eo(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else be(u,11)}else if((s.K||u.g==s)&&sr(u),!F(l))for(A=u.Da.g.parse(l),l=0;l<A.length;l++){let Z=A[l];if(u.T=Z[0],Z=Z[1],u.G==2)if(Z[0]=="c"){u.K=Z[1],u.ia=Z[2];const wt=Z[3];wt!=null&&(u.la=wt,u.j.info("VER="+u.la));const At=Z[4];At!=null&&(u.Aa=At,u.j.info("SVER="+u.Aa));const Le=Z[5];Le!=null&&typeof Le=="number"&&0<Le&&(f=1.5*Le,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const jt=s.g;if(jt){const or=jt.g?jt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(or){var P=f.h;P.g||or.indexOf("spdy")==-1&&or.indexOf("quic")==-1&&or.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(ps(P,P.h),P.h=null))}if(f.D){const vs=jt.g?jt.g.getResponseHeader("X-HTTP-Session-Id"):null;vs&&(f.ya=vs,st(f.I,f.D,vs))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var L=s;if(f.qa=So(f,f.J?f.ia:null,f.W),L.K){no(f.h,L);var rt=L,vt=f.L;vt&&(rt.I=vt),rt.B&&(hs(rt),Qn(rt)),f.g=L}else wo(f);0<u.i.length&&rr(u)}else Z[0]!="stop"&&Z[0]!="close"||be(u,7);else u.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?be(u,7):ms(u):Z[0]!="noop"&&u.l&&u.l.ta(Z),u.v=0)}}un(4)}catch{}}var Mc=class{constructor(s,l){this.g=s,this.map=l}};function Zi(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function to(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function eo(s){return s.h?1:s.g?s.g.size:0}function fs(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function ps(s,l){s.g?s.g.add(l):s.h=l}function no(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}Zi.prototype.cancel=function(){if(this.i=ro(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function ro(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return V(s.i)}function Fc(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var l=[],u=s.length,f=0;f<u;f++)l.push(s[f]);return l}l=[],u=0;for(f in s)l[u++]=s[f];return l}function jc(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const f in s)l[u++]=f;return l}}}function so(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=jc(s),f=Fc(s),A=f.length,P=0;P<A;P++)l.call(void 0,f[P],u&&u[P],s)}var io=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $c(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var f=s[u].indexOf("="),A=null;if(0<=f){var P=s[u].substring(0,f);A=s[u].substring(f+1)}else P=s[u];l(P,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Ae(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof Ae){this.h=s.h,Xn(this,s.j),this.o=s.o,this.g=s.g,Jn(this,s.s),this.l=s.l;var l=s.i,u=new mn;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),oo(this,u),this.m=s.m}else s&&(l=String(s).match(io))?(this.h=!1,Xn(this,l[1]||"",!0),this.o=pn(l[2]||""),this.g=pn(l[3]||"",!0),Jn(this,l[4]),this.l=pn(l[5]||"",!0),oo(this,l[6]||"",!0),this.m=pn(l[7]||"")):(this.h=!1,this.i=new mn(null,this.h))}Ae.prototype.toString=function(){var s=[],l=this.j;l&&s.push(gn(l,ao,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(gn(l,ao,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(gn(u,u.charAt(0)=="/"?zc:Uc,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",gn(u,Hc)),s.join("")};function Qt(s){return new Ae(s)}function Xn(s,l,u){s.j=u?pn(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function Jn(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function oo(s,l,u){l instanceof mn?(s.i=l,Gc(s.i,s.h)):(u||(l=gn(l,qc)),s.i=new mn(l,s.h))}function st(s,l,u){s.i.set(l,u)}function Yn(s){return st(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function pn(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function gn(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,Bc),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Bc(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var ao=/[#\/\?@]/g,Uc=/[#\?:]/g,zc=/[#\?]/g,qc=/[#\?@]/g,Hc=/#/g;function mn(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function re(s){s.g||(s.g=new Map,s.h=0,s.i&&$c(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=mn.prototype,n.add=function(s,l){re(this),this.i=null,s=Ne(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function lo(s,l){re(s),l=Ne(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function co(s,l){return re(s),l=Ne(s,l),s.g.has(l)}n.forEach=function(s,l){re(this),this.g.forEach(function(u,f){u.forEach(function(A){s.call(l,A,f,this)},this)},this)},n.na=function(){re(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const A=s[f];for(let P=0;P<A.length;P++)u.push(l[f])}return u},n.V=function(s){re(this);let l=[];if(typeof s=="string")co(this,s)&&(l=l.concat(this.g.get(Ne(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return re(this),this.i=null,s=Ne(this,s),co(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function uo(s,l,u){lo(s,l),0<u.length&&(s.i=null,s.g.set(Ne(s,l),V(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const P=encodeURIComponent(String(f)),L=this.V(f);for(f=0;f<L.length;f++){var A=P;L[f]!==""&&(A+="="+encodeURIComponent(String(L[f]))),s.push(A)}}return this.i=s.join("&")};function Ne(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function Gc(s,l){l&&!s.j&&(re(s),s.i=null,s.g.forEach(function(u,f){var A=f.toLowerCase();f!=A&&(lo(this,f),uo(this,A,u))},s)),s.j=l}function Kc(s,l){const u=new dn;if(c.Image){const f=new Image;f.onload=S(se,u,"TestLoadImage: loaded",!0,l,f),f.onerror=S(se,u,"TestLoadImage: error",!1,l,f),f.onabort=S(se,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=S(se,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else l(!1)}function Wc(s,l){const u=new dn,f=new AbortController,A=setTimeout(()=>{f.abort(),se(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:f.signal}).then(P=>{clearTimeout(A),P.ok?se(u,"TestPingServer: ok",!0,l):se(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),se(u,"TestPingServer: error",!1,l)})}function se(s,l,u,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(u)}catch{}}function Qc(){this.g=new Dc}function Xc(s,l,u){const f=u||"";try{so(s,function(A,P){let L=A;d(A)&&(L=ss(A)),l.push(f+P+"="+encodeURIComponent(L))})}catch(A){throw l.push(f+"type="+encodeURIComponent("_badmap")),A}}function Zn(s){this.l=s.Ub||null,this.j=s.eb||!1}C(Zn,is),Zn.prototype.g=function(){return new tr(this.l,this.j)},Zn.prototype.i=function(s){return function(){return s}}({});function tr(s,l){It.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(tr,It),n=tr.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,_n(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,_n(this)),this.g&&(this.readyState=3,_n(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ho(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function ho(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?yn(this):_n(this),this.readyState==3&&ho(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,yn(this))},n.Qa=function(s){this.g&&(this.response=s,yn(this))},n.ga=function(){this.g&&yn(this)};function yn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,_n(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function _n(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(tr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function fo(s){let l="";return nt(s,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function gs(s,l,u){t:{for(f in u){var f=!1;break t}f=!0}f||(u=fo(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):st(s,l,u))}function lt(s){It.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(lt,It);var Jc=/^https?$/i,Yc=["POST","PUT"];n=lt.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ls.g(),this.v=this.o?Bi(this.o):Bi(ls),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(P){po(this,P);return}if(s=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)u.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const P of f.keys())u.set(P,f.get(P));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(P=>P.toLowerCase()=="content-type"),A=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Yc,l,void 0))||f||A||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,L]of u)this.g.setRequestHeader(P,L);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{yo(this),this.u=!0,this.g.send(s),this.u=!1}catch(P){po(this,P)}};function po(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,go(s),er(s)}function go(s){s.A||(s.A=!0,Rt(s,"complete"),Rt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Rt(this,"complete"),Rt(this,"abort"),er(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),er(this,!0)),lt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?mo(this):this.bb())},n.bb=function(){mo(this)};function mo(s){if(s.h&&typeof a<"u"&&(!s.v[1]||Xt(s)!=4||s.Z()!=2)){if(s.u&&Xt(s)==4)Mi(s.Ea,0,s);else if(Rt(s,"readystatechange"),Xt(s)==4){s.h=!1;try{const L=s.Z();t:switch(L){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var u;if(!(u=l)){var f;if(f=L===0){var A=String(s.D).match(io)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),f=!Jc.test(A?A.toLowerCase():"")}u=f}if(u)Rt(s,"complete"),Rt(s,"success");else{s.m=6;try{var P=2<Xt(s)?s.g.statusText:""}catch{P=""}s.l=P+" ["+s.Z()+"]",go(s)}}finally{er(s)}}}}function er(s,l){if(s.g){yo(s);const u=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||Rt(s,"ready");try{u.onreadystatechange=f}catch{}}}function yo(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Xt(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Xt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),xc(l)}};function _o(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Zc(s){const l={};s=(s.g&&2<=Xt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(F(s[f]))continue;var u=_(s[f]);const A=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const P=l[A]||[];l[A]=P,P.push(u)}w(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function vn(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function vo(s){this.Aa=0,this.i=[],this.j=new dn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=vn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=vn("baseRetryDelayMs",5e3,s),this.cb=vn("retryDelaySeedMs",1e4,s),this.Wa=vn("forwardChannelMaxRetries",2,s),this.wa=vn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Zi(s&&s.concurrentRequestLimit),this.Da=new Qc,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=vo.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,f){xt(0),this.W=s,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=So(this,null,this.W),rr(this)};function ms(s){if(Eo(s),s.G==3){var l=s.U++,u=Qt(s.I);if(st(u,"SID",s.K),st(u,"RID",l),st(u,"TYPE","terminate"),En(s,u),l=new ne(s,s.j,l),l.L=2,l.v=Yn(Qt(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=Ro(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Qn(l)}Co(s)}function nr(s){s.g&&(_s(s),s.g.cancel(),s.g=null)}function Eo(s){nr(s),s.u&&(c.clearTimeout(s.u),s.u=null),sr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function rr(s){if(!to(s.h)&&!s.s){s.s=!0;var l=s.Ga;ee||N(),$t||(ee(),$t=!0),Bt.add(l,s),s.B=0}}function tu(s,l){return eo(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=hn(E(s.Ga,s,l),Po(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const A=new ne(this,this.j,s);let P=this.o;if(this.S&&(P?(P=m(P),T(P,this.S)):P=this.S),this.m!==null||this.O||(A.H=P,P=null),this.P)t:{for(var l=0,u=0;u<this.i.length;u++){e:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break t}if(l===4096||u===this.i.length-1){l=u+1;break t}}l=1e3}else l=1e3;l=Io(this,A,l),u=Qt(this.I),st(u,"RID",s),st(u,"CVER",22),this.D&&st(u,"X-HTTP-Session-Id",this.D),En(this,u),P&&(this.O?l="headers="+encodeURIComponent(String(fo(P)))+"&"+l:this.m&&gs(u,this.m,P)),ps(this.h,A),this.Ua&&st(u,"TYPE","init"),this.P?(st(u,"$req",l),st(u,"SID","null"),A.T=!0,us(A,u,null)):us(A,u,l),this.G=2}}else this.G==3&&(s?To(this,s):this.i.length==0||to(this.h)||To(this))};function To(s,l){var u;l?u=l.l:u=s.U++;const f=Qt(s.I);st(f,"SID",s.K),st(f,"RID",u),st(f,"AID",s.T),En(s,f),s.m&&s.o&&gs(f,s.m,s.o),u=new ne(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=Io(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),ps(s.h,u),us(u,f,l)}function En(s,l){s.H&&nt(s.H,function(u,f){st(l,f,u)}),s.l&&so({},function(u,f){st(l,f,u)})}function Io(s,l,u){u=Math.min(s.i.length,u);var f=s.l?E(s.l.Na,s.l,s):null;t:{var A=s.i;let P=-1;for(;;){const L=["count="+u];P==-1?0<u?(P=A[0].g,L.push("ofs="+P)):P=0:L.push("ofs="+P);let rt=!0;for(let vt=0;vt<u;vt++){let Z=A[vt].g;const wt=A[vt].map;if(Z-=P,0>Z)P=Math.max(0,A[vt].g-100),rt=!1;else try{Xc(wt,L,"req"+Z+"_")}catch{f&&f(wt)}}if(rt){f=L.join("&");break t}}}return s=s.i.splice(0,u),l.D=s,f}function wo(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;ee||N(),$t||(ee(),$t=!0),Bt.add(l,s),s.v=0}}function ys(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=hn(E(s.Fa,s),Po(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Ao(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=hn(E(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xt(10),nr(this),Ao(this))};function _s(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function Ao(s){s.g=new ne(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=Qt(s.qa);st(l,"RID","rpc"),st(l,"SID",s.K),st(l,"AID",s.T),st(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&st(l,"TO",s.ja),st(l,"TYPE","xmlhttp"),En(s,l),s.m&&s.o&&gs(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=Yn(Qt(l)),u.m=null,u.P=!0,Xi(u,s)}n.Za=function(){this.C!=null&&(this.C=null,nr(this),ys(this),xt(19))};function sr(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function bo(s,l){var u=null;if(s.g==l){sr(s),_s(s),s.g=null;var f=2}else if(fs(s.h,l))u=l.D,no(s.h,l),f=1;else return;if(s.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var A=s.B;f=Gn(),Rt(f,new Gi(f,u)),rr(s)}else wo(s);else if(A=l.s,A==3||A==0&&0<l.X||!(f==1&&tu(s,l)||f==2&&ys(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),A){case 1:be(s,5);break;case 4:be(s,10);break;case 3:be(s,6);break;default:be(s,2)}}}function Po(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function be(s,l){if(s.j.info("Error code "+l),l==2){var u=E(s.fb,s),f=s.Xa;const A=!f;f=new Ae(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Xn(f,"https"),Yn(f),A?Kc(f.toString(),u):Wc(f.toString(),u)}else xt(2);s.G=0,s.l&&s.l.sa(l),Co(s),Eo(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),xt(2)):(this.j.info("Failed to ping google.com"),xt(1))};function Co(s){if(s.G=0,s.ka=[],s.l){const l=ro(s.h);(l.length!=0||s.i.length!=0)&&(D(s.ka,l),D(s.ka,s.i),s.h.i.length=0,V(s.i),s.i.length=0),s.l.ra()}}function So(s,l,u){var f=u instanceof Ae?Qt(u):new Ae(u);if(f.g!="")l&&(f.g=l+"."+f.g),Jn(f,f.s);else{var A=c.location;f=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var P=new Ae(null);f&&Xn(P,f),l&&(P.g=l),A&&Jn(P,A),u&&(P.l=u),f=P}return u=s.D,l=s.ya,u&&l&&st(f,u,l),st(f,"VER",s.la),En(s,f),f}function Ro(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new lt(new Zn({eb:u})):new lt(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xo(){}n=xo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ir(){}ir.prototype.g=function(s,l){return new Lt(s,l)};function Lt(s,l){It.call(this),this.g=new vo(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!F(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!F(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Oe(this)}C(Lt,It),Lt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Lt.prototype.close=function(){ms(this.g)},Lt.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=ss(s),s=u);l.i.push(new Mc(l.Ya++,s)),l.G==3&&rr(l)},Lt.prototype.N=function(){this.g.l=null,delete this.j,ms(this.g),delete this.g,Lt.aa.N.call(this)};function Do(s){os.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){t:{for(const u in l){s=u;break t}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}C(Do,os);function Vo(){as.call(this),this.status=1}C(Vo,as);function Oe(s){this.g=s}C(Oe,xo),Oe.prototype.ua=function(){Rt(this.g,"a")},Oe.prototype.ta=function(s){Rt(this.g,new Do(s))},Oe.prototype.sa=function(s){Rt(this.g,new Vo)},Oe.prototype.ra=function(){Rt(this.g,"b")},ir.prototype.createWebChannel=ir.prototype.g,Lt.prototype.send=Lt.prototype.o,Lt.prototype.open=Lt.prototype.m,Lt.prototype.close=Lt.prototype.close,al=function(){return new ir},ol=function(){return Gn()},il=Ie,$s={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Kn.NO_ERROR=0,Kn.TIMEOUT=8,Kn.HTTP_ERROR=6,fr=Kn,Ki.COMPLETE="complete",sl=Ki,Ui.EventType=cn,cn.OPEN="a",cn.CLOSE="b",cn.ERROR="c",cn.MESSAGE="d",It.prototype.listen=It.prototype.K,Tn=Ui,lt.prototype.listenOnce=lt.prototype.L,lt.prototype.getLastError=lt.prototype.Ka,lt.prototype.getLastErrorCode=lt.prototype.Ba,lt.prototype.getStatus=lt.prototype.Z,lt.prototype.getResponseJson=lt.prototype.Oa,lt.prototype.getResponseText=lt.prototype.oa,lt.prototype.send=lt.prototype.ea,lt.prototype.setWithCredentials=lt.prototype.Ha,rl=lt}).apply(typeof ar<"u"?ar:typeof self<"u"?self:typeof window<"u"?window:{});const Ho="@firebase/firestore",Go="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Pt.UNAUTHENTICATED=new Pt(null),Pt.GOOGLE_CREDENTIALS=new Pt("google-credentials-uid"),Pt.FIRST_PARTY=new Pt("first-party-uid"),Pt.MOCK_USER=new Pt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De=new Xa("@firebase/firestore");function $e(){return De.logLevel}function M(n,...t){if(De.logLevel<=X.DEBUG){const e=t.map(li);De.debug(`Firestore (${nn}): ${n}`,...e)}}function Zt(n,...t){if(De.logLevel<=X.ERROR){const e=t.map(li);De.error(`Firestore (${nn}): ${n}`,...e)}}function pe(n,...t){if(De.logLevel<=X.WARN){const e=t.map(li);De.warn(`Firestore (${nn}): ${n}`,...e)}}function li(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,ll(n,r,e)}function ll(n,t,e){let r=`FIRESTORE (${nn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Zt(r),new Error(r)}function at(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||ll(t,i,r)}function J(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends en{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class $h{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Pt.UNAUTHENTICATED))}shutdown(){}}class Bh{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Uh{constructor(t){this.t=t,this.currentUser=Pt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){at(this.o===void 0,42304);let r=this.i;const i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new ue;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ue,t.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},c=h=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ue)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(at(typeof r.accessToken=="string",31837,{l:r}),new cl(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return at(t===null||typeof t=="string",2055,{h:t}),new Pt(t)}}class zh{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Pt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class qh{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new zh(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(Pt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ko{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hh{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,wh(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){at(this.o===void 0,3512);const r=o=>{o.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const i=o=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ko(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(at(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Ko(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gh(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ul(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=Gh(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%62))}return r}}function G(n,t){return n<t?-1:n>t?1:0}function Bs(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),i=t.codePointAt(e);if(r!==i){if(r<128&&i<128)return G(r,i);{const o=ul(),a=Kh(o.encode(Wo(n,e)),o.encode(Wo(t,e)));return a!==0?a:G(r,i)}}e+=r>65535?2:1}return G(n.length,t.length)}function Wo(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Kh(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return G(n[e],t[e]);return G(n.length,t.length)}function Qe(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="__name__";class zt{constructor(t,e,r){e===void 0?e=0:e>t.length&&q(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&q(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return zt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof zt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const o=zt.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return G(t.length,e.length)}static compareSegments(t,e){const r=zt.isNumericId(t),i=zt.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?zt.extractNumericId(t).compare(zt.extractNumericId(e)):Bs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ce.fromString(t.substring(4,t.length-2))}}class it extends zt{construct(t,e,r){return new it(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new j(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new it(e)}static emptyPath(){return new it([])}}const Wh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Dt extends zt{construct(t,e,r){return new Dt(t,e,r)}static isValidIdentifier(t){return Wh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Dt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Qo}static keyField(){return new Dt([Qo])}static fromServerFormat(t){const e=[];let r="",i=0;const o=()=>{if(r.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new j(O.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new j(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(o(),i++)}if(o(),a)throw new j(O.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Dt(e)}static emptyPath(){return new Dt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(t){this.path=t}static fromPath(t){return new $(it.fromString(t))}static fromName(t){return new $(it.fromString(t).popFirst(5))}static empty(){return new $(it.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&it.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return it.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new $(new it(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hl(n,t,e){if(!e)throw new j(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Qh(n,t,e,r){if(t===!0&&r===!0)throw new j(O.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Xo(n){if(!$.isDocumentKey(n))throw new j(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Jo(n){if($.isDocumentKey(n))throw new j(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Xh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Jh(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":q(12329,{type:typeof n})}function kn(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new j(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Jh(n);throw new j(O.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(n,t){const e={typeString:n};return t&&(e.value=t),e}function Fn(n,t){if(!Xh(n))throw new j(O.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const i=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new j(O.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo=-62135596800,Zo=1e6;class dt{static now(){return dt.fromMillis(Date.now())}static fromDate(t){return dt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Zo);return new dt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Yo)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Zo}_compareTo(t){return this.seconds===t.seconds?G(this.nanoseconds,t.nanoseconds):G(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:dt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Fn(t,dt._jsonSchema))return new dt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Yo;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}dt._jsonSchemaVersion="firestore/timestamp/1.0",dt._jsonSchema={type:ft("string",dt._jsonSchemaVersion),seconds:ft("number"),nanoseconds:ft("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(t){return new z(t)}static min(){return new z(new dt(0,0))}static max(){return new z(new dt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=-1;function Yh(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=z.fromTimestamp(r===1e9?new dt(e+1,0):new dt(e,r));return new ge(i,$.empty(),t)}function Zh(n){return new ge(n.readTime,n.key,Nn)}class ge{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new ge(z.min(),$.empty(),Nn)}static max(){return new ge(z.max(),$.empty(),Nn)}}function td(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=$.comparator(n.documentKey,t.documentKey),e!==0?e:G(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fr(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==ed)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&q(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new R((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof R?e:R.resolve(e)}catch(e){return R.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):R.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):R.reject(e)}static resolve(t){return new R((e,r)=>{e(t)})}static reject(t){return new R((e,r)=>{r(t)})}static waitFor(t){return new R((e,r)=>{let i=0,o=0,a=!1;t.forEach(c=>{++i,c.next(()=>{++o,a&&o===i&&e()},h=>r(h))}),a=!0,o===i&&e()})}static or(t){let e=R.resolve(!1);for(const r of t)e=e.next(i=>i?R.resolve(i):r());return e}static forEach(t,e){const r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new R((r,i)=>{const o=t.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(p=>{a[d]=p,++c,c===o&&r(a)},p=>i(p))}})}static doWhile(t,e){return new R((r,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}}function rd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function rn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ae&&this.ae(t),t}}jr.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd=-1;function $r(n){return n==null}function Us(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dl="";function id(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ta(t)),t=od(n.get(e),t);return ta(t)}function od(n,t){let e=t;const r=n.length;for(let i=0;i<r;i++){const o=n.charAt(i);switch(o){case"\0":e+="";break;case dl:e+="";break;default:e+=o}}return e}function ta(n){return n+dl+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function jn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function ad(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t,e){this.comparator=t,this.root=e||Et.EMPTY}insert(t,e){return new ut(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(t){return new ut(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Et.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new lr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new lr(this.root,t,this.comparator,!1)}getReverseIterator(){return new lr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new lr(this.root,t,this.comparator,!0)}}class lr{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Et{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??Et.RED,this.left=i??Et.EMPTY,this.right=o??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new Et(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return Et.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw q(43730,{key:this.key,value:this.value});if(this.right.isRed())throw q(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw q(27949);return t+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1;Et.EMPTY=new class{constructor(){this.size=0}get key(){throw q(57766)}get value(){throw q(16141)}get color(){throw q(16727)}get left(){throw q(29726)}get right(){throw q(36894)}copy(t,e,r,i,o){return this}insert(t,e,r){return new Et(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(t){this.comparator=t,this.data=new ut(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new na(this.data.getIterator())}getIteratorFrom(t){return new na(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof mt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new mt(this.comparator);return e.data=t,e}}class na{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(t){this.fields=t,t.sort(Dt.comparator)}static empty(){return new ie([])}unionWith(t){let e=new mt(Dt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new ie(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Qe(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new fl("Invalid base64 string: "+o):o}}(t);return new Tt(e)}static fromUint8Array(t){const e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new Tt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return G(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Tt.EMPTY_BYTE_STRING=new Tt("");const ld=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function me(n){if(at(!!n,39018),typeof n=="string"){let t=0;const e=ld.exec(n);if(at(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:ct(n.seconds),nanos:ct(n.nanos)}}function ct(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ye(n){return typeof n=="string"?Tt.fromBase64String(n):Tt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl="server_timestamp",gl="__type__",ml="__previous_value__",yl="__local_write_time__";function ui(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[gl])===null||e===void 0?void 0:e.stringValue)===pl}function Br(n){const t=n.mapValue.fields[ml];return ui(t)?Br(t):t}function On(n){const t=me(n.mapValue.fields[yl].timestampValue);return new dt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(t,e,r,i,o,a,c,h,d,p){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=p}}const Pr="(default)";class Ln{constructor(t,e){this.projectId=t,this.database=e||Pr}static empty(){return new Ln("","")}get isDefaultDatabase(){return this.database===Pr}isEqual(t){return t instanceof Ln&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud="__type__",hd="__max__",cr={mapValue:{}},dd="__vector__",zs="value";function _e(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ui(n)?4:pd(n)?9007199254740991:fd(n)?10:11:q(28295,{value:n})}function Kt(n,t){if(n===t)return!0;const e=_e(n);if(e!==_e(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return On(n).isEqual(On(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=me(i.timestampValue),c=me(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return ye(i.bytesValue).isEqual(ye(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return ct(i.geoPointValue.latitude)===ct(o.geoPointValue.latitude)&&ct(i.geoPointValue.longitude)===ct(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return ct(i.integerValue)===ct(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=ct(i.doubleValue),c=ct(o.doubleValue);return a===c?Us(a)===Us(c):isNaN(a)&&isNaN(c)}return!1}(n,t);case 9:return Qe(n.arrayValue.values||[],t.arrayValue.values||[],Kt);case 10:case 11:return function(i,o){const a=i.mapValue.fields||{},c=o.mapValue.fields||{};if(ea(a)!==ea(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!Kt(a[h],c[h])))return!1;return!0}(n,t);default:return q(52216,{left:n})}}function Mn(n,t){return(n.values||[]).find(e=>Kt(e,t))!==void 0}function Xe(n,t){if(n===t)return 0;const e=_e(n),r=_e(t);if(e!==r)return G(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return G(n.booleanValue,t.booleanValue);case 2:return function(o,a){const c=ct(o.integerValue||o.doubleValue),h=ct(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,t);case 3:return ra(n.timestampValue,t.timestampValue);case 4:return ra(On(n),On(t));case 5:return Bs(n.stringValue,t.stringValue);case 6:return function(o,a){const c=ye(o),h=ye(a);return c.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const p=G(c[d],h[d]);if(p!==0)return p}return G(c.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const c=G(ct(o.latitude),ct(a.latitude));return c!==0?c:G(ct(o.longitude),ct(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return sa(n.arrayValue,t.arrayValue);case 10:return function(o,a){var c,h,d,p;const g=o.fields||{},E=a.fields||{},S=(c=g[zs])===null||c===void 0?void 0:c.arrayValue,C=(h=E[zs])===null||h===void 0?void 0:h.arrayValue,V=G(((d=S?.values)===null||d===void 0?void 0:d.length)||0,((p=C?.values)===null||p===void 0?void 0:p.length)||0);return V!==0?V:sa(S,C)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===cr.mapValue&&a===cr.mapValue)return 0;if(o===cr.mapValue)return 1;if(a===cr.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let g=0;g<h.length&&g<p.length;++g){const E=Bs(h[g],p[g]);if(E!==0)return E;const S=Xe(c[h[g]],d[p[g]]);if(S!==0)return S}return G(h.length,p.length)}(n.mapValue,t.mapValue);default:throw q(23264,{le:e})}}function ra(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return G(n,t);const e=me(n),r=me(t),i=G(e.seconds,r.seconds);return i!==0?i:G(e.nanos,r.nanos)}function sa(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const o=Xe(e[i],r[i]);if(o)return o}return G(e.length,r.length)}function Je(n){return qs(n)}function qs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=me(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return ye(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return $.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(const o of e.values||[])i?i=!1:r+=",",r+=qs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${qs(e.fields[a])}`;return i+"}"}(n.mapValue):q(61005,{value:n})}function pr(n){switch(_e(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Br(n);return t?16+pr(t):16;case 5:return 2*n.stringValue.length;case 6:return ye(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+pr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return jn(r.fields,(o,a)=>{i+=o.length+pr(a)}),i}(n.mapValue);default:throw q(13486,{value:n})}}function Hs(n){return!!n&&"integerValue"in n}function hi(n){return!!n&&"arrayValue"in n}function ia(n){return!!n&&"nullValue"in n}function oa(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function As(n){return!!n&&"mapValue"in n}function fd(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[ud])===null||e===void 0?void 0:e.stringValue)===dd}function Pn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return jn(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Pn(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Pn(n.arrayValue.values[e]);return t}return Object.assign({},n)}function pd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===hd}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(t){this.value=t}static empty(){return new qt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!As(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Pn(e)}setAll(t){let e=Dt.emptyPath(),r={},i=[];t.forEach((a,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=c.popLast()}a?r[c.lastSegment()]=Pn(a):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){const e=this.field(t.popLast());As(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Kt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];As(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){jn(e,(i,o)=>t[i]=o);for(const i of r)delete t[i]}clone(){return new qt(Pn(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t,e,r,i,o,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(t){return new Ct(t,0,z.min(),z.min(),z.min(),qt.empty(),0)}static newFoundDocument(t,e,r,i){return new Ct(t,1,e,z.min(),r,i,0)}static newNoDocument(t,e){return new Ct(t,2,e,z.min(),z.min(),qt.empty(),0)}static newUnknownDocument(t,e){return new Ct(t,3,e,z.min(),z.min(),qt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=qt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=qt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Ct&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Ct(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(t,e){this.position=t,this.inclusive=e}}function aa(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){const o=t[i],a=n.position[i];if(o.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),e.key):r=Xe(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function la(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Kt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(t,e="asc"){this.field=t,this.dir=e}}function gd(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{}class gt extends _l{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new yd(t,e,r):e==="array-contains"?new Ed(t,r):e==="in"?new Td(t,r):e==="not-in"?new Id(t,r):e==="array-contains-any"?new wd(t,r):new gt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new _d(t,r):new vd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Xe(e,this.value)):e!==null&&_e(this.value)===_e(e)&&this.matchesComparison(Xe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return q(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Wt extends _l{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new Wt(t,e)}matches(t){return vl(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function vl(n){return n.op==="and"}function El(n){return md(n)&&vl(n)}function md(n){for(const t of n.filters)if(t instanceof Wt)return!1;return!0}function Gs(n){if(n instanceof gt)return n.field.canonicalString()+n.op.toString()+Je(n.value);if(El(n))return n.filters.map(t=>Gs(t)).join(",");{const t=n.filters.map(e=>Gs(e)).join(",");return`${n.op}(${t})`}}function Tl(n,t){return n instanceof gt?function(r,i){return i instanceof gt&&r.op===i.op&&r.field.isEqual(i.field)&&Kt(r.value,i.value)}(n,t):n instanceof Wt?function(r,i){return i instanceof Wt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,c)=>o&&Tl(a,i.filters[c]),!0):!1}(n,t):void q(19439)}function Il(n){return n instanceof gt?function(e){return`${e.field.canonicalString()} ${e.op} ${Je(e.value)}`}(n):n instanceof Wt?function(e){return e.op.toString()+" {"+e.getFilters().map(Il).join(" ,")+"}"}(n):"Filter"}class yd extends gt{constructor(t,e,r){super(t,e,r),this.key=$.fromName(r.referenceValue)}matches(t){const e=$.comparator(t.key,this.key);return this.matchesComparison(e)}}class _d extends gt{constructor(t,e){super(t,"in",e),this.keys=wl("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class vd extends gt{constructor(t,e){super(t,"not-in",e),this.keys=wl("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function wl(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>$.fromName(r.referenceValue))}class Ed extends gt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return hi(e)&&Mn(e.arrayValue,this.value)}}class Td extends gt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Mn(this.value.arrayValue,e)}}class Id extends gt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Mn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Mn(this.value.arrayValue,e)}}class wd extends gt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!hi(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Mn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(t,e=null,r=[],i=[],o=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=c,this.Pe=null}}function ca(n,t=null,e=[],r=[],i=null,o=null,a=null){return new Ad(n,t,e,r,i,o,a)}function di(n){const t=J(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Gs(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),$r(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Je(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Je(r)).join(",")),t.Pe=e}return t.Pe}function fi(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!gd(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Tl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!la(n.startAt,t.startAt)&&la(n.endAt,t.endAt)}function Ks(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e=null,r=[],i=[],o=null,a="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function bd(n,t,e,r,i,o,a,c){return new Ur(n,t,e,r,i,o,a,c)}function pi(n){return new Ur(n)}function ua(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Pd(n){return n.collectionGroup!==null}function Cn(n){const t=J(n);if(t.Te===null){t.Te=[];const e=new Set;for(const o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new mt(Dt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new Sr(o,r))}),e.has(Dt.keyField().canonicalString())||t.Te.push(new Sr(Dt.keyField(),r))}return t.Te}function Gt(n){const t=J(n);return t.Ie||(t.Ie=Cd(t,Cn(n))),t.Ie}function Cd(n,t){if(n.limitType==="F")return ca(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new Sr(i.field,o)});const e=n.endAt?new Cr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Cr(n.startAt.position,n.startAt.inclusive):null;return ca(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ws(n,t,e){return new Ur(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function zr(n,t){return fi(Gt(n),Gt(t))&&n.limitType===t.limitType}function Al(n){return`${di(Gt(n))}|lt:${n.limitType}`}function Be(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>Il(i)).join(", ")}]`),$r(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>Je(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>Je(i)).join(",")),`Target(${r})`}(Gt(n))}; limitType=${n.limitType})`}function qr(n,t){return t.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):$.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(const o of Cn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(a,c,h){const d=aa(a,c,h);return a.inclusive?d<=0:d<0}(r.startAt,Cn(r),i)||r.endAt&&!function(a,c,h){const d=aa(a,c,h);return a.inclusive?d>=0:d>0}(r.endAt,Cn(r),i))}(n,t)}function Sd(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function bl(n){return(t,e)=>{let r=!1;for(const i of Cn(n)){const o=Rd(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Rd(n,t,e){const r=n.field.isKeyField()?$.comparator(t.key,e.key):function(o,a,c){const h=a.data.field(o),d=c.data.field(o);return h!==null&&d!==null?Xe(h,d):q(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return q(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){jn(this.inner,(e,r)=>{for(const[i,o]of r)t(i,o)})}isEmpty(){return ad(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd=new ut($.comparator);function ve(){return xd}const Pl=new ut($.comparator);function In(...n){let t=Pl;for(const e of n)t=t.insert(e.key,e);return t}function Dd(n){let t=Pl;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Se(){return Sn()}function Cl(){return Sn()}function Sn(){return new Ve(n=>n.toString(),(n,t)=>n.isEqual(t))}const Vd=new mt($.comparator);function Y(...n){let t=Vd;for(const e of n)t=t.add(e);return t}const kd=new mt(G);function Nd(){return kd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Od(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Us(t)?"-0":t}}function Ld(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(){this._=void 0}}function Md(n,t,e){return n instanceof Qs?function(i,o){const a={fields:{[gl]:{stringValue:pl},[yl]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ui(o)&&(o=Br(o)),o&&(a.fields[ml]=o),{mapValue:a}}(e,t):n instanceof Rr?Sl(n,t):n instanceof xr?Rl(n,t):function(i,o){const a=jd(i,o),c=ha(a)+ha(i.Ee);return Hs(a)&&Hs(i.Ee)?Ld(c):Od(i.serializer,c)}(n,t)}function Fd(n,t,e){return n instanceof Rr?Sl(n,t):n instanceof xr?Rl(n,t):e}function jd(n,t){return n instanceof Xs?function(r){return Hs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class Qs extends Hr{}class Rr extends Hr{constructor(t){super(),this.elements=t}}function Sl(n,t){const e=xl(t);for(const r of n.elements)e.some(i=>Kt(i,r))||e.push(r);return{arrayValue:{values:e}}}class xr extends Hr{constructor(t){super(),this.elements=t}}function Rl(n,t){let e=xl(t);for(const r of n.elements)e=e.filter(i=>!Kt(i,r));return{arrayValue:{values:e}}}class Xs extends Hr{constructor(t,e){super(),this.serializer=t,this.Ee=e}}function ha(n){return ct(n.integerValue||n.doubleValue)}function xl(n){return hi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function $d(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof Rr&&i instanceof Rr||r instanceof xr&&i instanceof xr?Qe(r.elements,i.elements,Kt):r instanceof Xs&&i instanceof Xs?Kt(r.Ee,i.Ee):r instanceof Qs&&i instanceof Qs}(n.transform,t.transform)}class Re{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Re}static exists(t){return new Re(void 0,t)}static updateTime(t){return new Re(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function gr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class gi{}function Dl(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Ud(n.key,Re.none()):new mi(n.key,n.data,Re.none());{const e=n.data,r=qt.empty();let i=new mt(Dt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new Gr(n.key,r,new ie(i.toArray()),Re.none())}}function Bd(n,t,e){n instanceof mi?function(i,o,a){const c=i.value.clone(),h=fa(i.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,t,e):n instanceof Gr?function(i,o,a){if(!gr(i.precondition,o))return void o.convertToUnknownDocument(a.version);const c=fa(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Vl(i)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Rn(n,t,e,r){return n instanceof mi?function(o,a,c,h){if(!gr(o.precondition,a))return c;const d=o.value.clone(),p=pa(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof Gr?function(o,a,c,h){if(!gr(o.precondition,a))return c;const d=pa(o.fieldTransforms,h,a),p=a.data;return p.setAll(Vl(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(g=>g.field))}(n,t,e,r):function(o,a,c){return gr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,t,e)}function da(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Qe(r,i,(o,a)=>$d(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class mi extends gi{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Gr extends gi{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Vl(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function fa(n,t,e){const r=new Map;at(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let i=0;i<e.length;i++){const o=n[i],a=o.transform,c=t.data.field(o.field);r.set(o.field,Fd(a,c,e[i]))}return r}function pa(n,t,e){const r=new Map;for(const i of n){const o=i.transform,a=e.data.field(i.field);r.set(i.field,Md(o,a,t))}return r}class Ud extends gi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Bd(o,t,r[i])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Rn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Rn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Cl();return this.mutations.forEach(i=>{const o=t.get(i.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=e.has(i.key)?null:c;const h=Dl(a,c);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(z.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),Y())}isEqual(t){return this.batchId===t.batchId&&Qe(this.mutations,t.mutations,(e,r)=>da(e,r))&&Qe(this.baseMutations,t.baseMutations,(e,r)=>da(e,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ht,Q;function kl(n){if(n===void 0)return Zt("GRPC error has no .code"),O.UNKNOWN;switch(n){case ht.OK:return O.OK;case ht.CANCELLED:return O.CANCELLED;case ht.UNKNOWN:return O.UNKNOWN;case ht.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case ht.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case ht.INTERNAL:return O.INTERNAL;case ht.UNAVAILABLE:return O.UNAVAILABLE;case ht.UNAUTHENTICATED:return O.UNAUTHENTICATED;case ht.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case ht.NOT_FOUND:return O.NOT_FOUND;case ht.ALREADY_EXISTS:return O.ALREADY_EXISTS;case ht.PERMISSION_DENIED:return O.PERMISSION_DENIED;case ht.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case ht.ABORTED:return O.ABORTED;case ht.OUT_OF_RANGE:return O.OUT_OF_RANGE;case ht.UNIMPLEMENTED:return O.UNIMPLEMENTED;case ht.DATA_LOSS:return O.DATA_LOSS;default:return q(39323,{code:n})}}(Q=ht||(ht={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd=new ce([4294967295,4294967295],0);function ga(n){const t=ul().encode(n),e=new nl;return e.update(t),new Uint8Array(e.digest())}function ma(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ce([e,r],0),new ce([i,o],0)]}class yi{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new wn(`Invalid padding: ${e}`);if(r<0)throw new wn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new wn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new wn(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=ce.fromNumber(this.fe)}pe(t,e,r){let i=t.add(e.multiply(ce.fromNumber(r)));return i.compare(Gd)===1&&(i=new ce([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;const e=ga(t),[r,i]=ma(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,i,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new yi(o,i,e);return r.forEach(c=>a.insert(c)),a}insert(t){if(this.fe===0)return;const e=ga(t),[r,i]=ma(e);for(let o=0;o<this.hashCount;o++){const a=this.pe(r,i,o);this.we(a)}}we(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class wn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const i=new Map;return i.set(t,$n.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Kr(z.min(),i,new ut(G),ve(),Y())}}class $n{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new $n(r,e,Y(),Y(),Y())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(t,e,r,i){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=i}}class Nl{constructor(t,e){this.targetId=t,this.De=e}}class Ol{constructor(t,e,r=Tt.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}}class ya{constructor(){this.ve=0,this.Ce=_a(),this.Fe=Tt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=Y(),e=Y(),r=Y();return this.Ce.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:q(38017,{changeType:o})}}),new $n(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=_a()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,at(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Kd{constructor(t){this.We=t,this.Ge=new Map,this.ze=ve(),this.je=ur(),this.Je=ur(),this.He=new ut(G)}Ye(t){for(const e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(const e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,e=>{const r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:q(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach((r,i)=>{this.nt(i)&&e(i)})}it(t){const e=t.targetId,r=t.De.count,i=this.st(e);if(i){const o=i.target;if(Ks(o))if(r===0){const a=new $(o.path);this.Xe(e,a,Ct.newNoDocument(a,z.min()))}else at(r===1,20013,{expectedCount:r});else{const a=this.ot(e);if(a!==r){const c=this._t(t),h=c?this.ut(c,t,a):1;if(h!==0){this.rt(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,d)}}}}}_t(t){const e=t.De.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e;let a,c;try{a=ye(r).toUint8Array()}catch(h){if(h instanceof fl)return pe("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new yi(a,i,o)}catch(h){return pe(h instanceof wn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.fe===0?null:c}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){const r=this.We.getRemoteKeysForTarget(e);let i=0;return r.forEach(o=>{const a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.Xe(e,o,null),i++)}),i}Pt(t){const e=new Map;this.Ge.forEach((o,a)=>{const c=this.st(a);if(c){if(o.current&&Ks(c.target)){const h=new $(c.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,Ct.newNoDocument(h,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}});let r=Y();this.Je.forEach((o,a)=>{let c=!0;a.forEachWhile(h=>{const d=this.st(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.ze.forEach((o,a)=>a.setReadTime(t));const i=new Kr(t,e,this.He,this.ze,r);return this.ze=ve(),this.je=ur(),this.Je=ur(),this.He=new ut(G),i}Ze(t,e){if(!this.nt(t))return;const r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;const i=this.tt(t);this.It(t,e)?i.qe(e,1):i.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){const e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new ya,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new mt(G),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new mt(G),this.je=this.je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||M("WatchChangeAggregator","Detected inactive target",t),e}st(t){const e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new ya),this.We.getRemoteKeysForTarget(t).forEach(e=>{this.Xe(t,e,null)})}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}}function ur(){return new ut($.comparator)}function _a(){return new ut($.comparator)}const Wd={asc:"ASCENDING",desc:"DESCENDING"},Qd={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Xd={and:"AND",or:"OR"};class Jd{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Js(n,t){return n.useProto3Json||$r(t)?t:{value:t}}function Yd(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Zd(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function He(n){return at(!!n,49232),z.fromTimestamp(function(e){const r=me(e);return new dt(r.seconds,r.nanos)}(n))}function tf(n,t){return Ys(n,t).canonicalString()}function Ys(n,t){const e=function(i){return new it(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Ll(n){const t=it.fromString(n);return at(Bl(t),10190,{key:t.toString()}),t}function bs(n,t){const e=Ll(t);if(e.get(1)!==n.databaseId.projectId)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new $(Fl(e))}function Ml(n,t){return tf(n.databaseId,t)}function ef(n){const t=Ll(n);return t.length===4?it.emptyPath():Fl(t)}function va(n){return new it(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Fl(n){return at(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function nf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:q(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(at(p===void 0||typeof p=="string",58123),Tt.fromBase64String(p||"")):(at(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Tt.fromUint8Array(p||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(d){const p=d.code===void 0?O.UNKNOWN:kl(d.code);return new j(p,d.message||"")}(a);e=new Ol(r,i,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=bs(n,r.document.name),o=He(r.document.updateTime),a=r.document.createTime?He(r.document.createTime):z.min(),c=new qt({mapValue:{fields:r.document.fields}}),h=Ct.newFoundDocument(i,o,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];e=new mr(d,p,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=bs(n,r.document),o=r.readTime?He(r.readTime):z.min(),a=Ct.newNoDocument(i,o),c=r.removedTargetIds||[];e=new mr([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=bs(n,r.document),o=r.removedTargetIds||[];e=new mr([],o,i,null)}else{if(!("filter"in t))return q(11601,{At:t});{t.filter;const r=t.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,a=new Hd(i,o),c=r.targetId;e=new Nl(c,a)}}return e}function rf(n,t){return{documents:[Ml(n,t.path)]}}function sf(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Ml(n,i);const o=function(d){if(d.length!==0)return $l(Wt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(p=>function(E){return{field:Ue(E.field),direction:lf(E.dir)}}(p))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=Js(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{Vt:e,parent:i}}function of(n){let t=ef(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let i=null;if(r>0){at(r===1,65062);const p=e.from[0];p.allDescendants?i=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(g){const E=jl(g);return E instanceof Wt&&El(E)?E.getFilters():[E]}(e.where));let a=[];e.orderBy&&(a=function(g){return g.map(E=>function(C){return new Sr(ze(C.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(E))}(e.orderBy));let c=null;e.limit&&(c=function(g){let E;return E=typeof g=="object"?g.value:g,$r(E)?null:E}(e.limit));let h=null;e.startAt&&(h=function(g){const E=!!g.before,S=g.values||[];return new Cr(S,E)}(e.startAt));let d=null;return e.endAt&&(d=function(g){const E=!g.before,S=g.values||[];return new Cr(S,E)}(e.endAt)),bd(t,i,a,o,c,"F",h,d)}function af(n,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return q(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function jl(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=ze(e.unaryFilter.field);return gt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ze(e.unaryFilter.field);return gt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=ze(e.unaryFilter.field);return gt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=ze(e.unaryFilter.field);return gt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return q(61313);default:return q(60726)}}(n):n.fieldFilter!==void 0?function(e){return gt.create(ze(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return q(58110);default:return q(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Wt.create(e.compositeFilter.filters.map(r=>jl(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return q(1026)}}(e.compositeFilter.op))}(n):q(30097,{filter:n})}function lf(n){return Wd[n]}function cf(n){return Qd[n]}function uf(n){return Xd[n]}function Ue(n){return{fieldPath:n.canonicalString()}}function ze(n){return Dt.fromServerFormat(n.fieldPath)}function $l(n){return n instanceof gt?function(e){if(e.op==="=="){if(oa(e.value))return{unaryFilter:{field:Ue(e.field),op:"IS_NAN"}};if(ia(e.value))return{unaryFilter:{field:Ue(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(oa(e.value))return{unaryFilter:{field:Ue(e.field),op:"IS_NOT_NAN"}};if(ia(e.value))return{unaryFilter:{field:Ue(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ue(e.field),op:cf(e.op),value:e.value}}}(n):n instanceof Wt?function(e){const r=e.getFilters().map(i=>$l(i));return r.length===1?r[0]:{compositeFilter:{op:uf(e.op),filters:r}}}(n):q(54877,{filter:n})}function Bl(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(t,e,r,i,o=z.min(),a=z.min(),c=Tt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new oe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(t){this.gt=t}}function df(n){const t=of({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ws(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(){this.Dn=new pf}addToCollectionParentIndex(t,e){return this.Dn.add(e),R.resolve()}getCollectionParents(t,e){return R.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return R.resolve()}deleteFieldIndex(t,e){return R.resolve()}deleteAllFieldIndexes(t){return R.resolve()}createTargetIndexes(t,e){return R.resolve()}getDocumentsMatchingTarget(t,e){return R.resolve(null)}getIndexType(t,e){return R.resolve(0)}getFieldIndexes(t,e){return R.resolve([])}getNextCollectionGroupToUpdate(t){return R.resolve(null)}getMinOffset(t,e){return R.resolve(ge.min())}getMinOffsetFromCollectionGroup(t,e){return R.resolve(ge.min())}updateCollectionGroup(t,e,r){return R.resolve()}updateIndexEntries(t,e){return R.resolve()}}class pf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new mt(it.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new mt(it.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ul=41943040;class kt{static withCacheSize(t){return new kt(t,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(Ul,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new Ye(0)}static ur(){return new Ye(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ta="LruGarbageCollector",gf=1048576;function Ia([n,t],[e,r]){const i=G(n,e);return i===0?G(t,r):i}class mf{constructor(t){this.Tr=t,this.buffer=new mt(Ia),this.Ir=0}dr(){return++this.Ir}Er(t){const e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Ia(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class yf{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){M(Ta,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){rn(e)?M(Ta,"Ignoring IndexedDB error during garbage collection: ",e):await Fr(e)}await this.Rr(3e5)})}}class _f{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return R.resolve(jr.ue);const r=new mf(e);return this.Vr.forEachTarget(t,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(t,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Ea)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ea):this.pr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,i,o,a,c,h,d;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,a=Date.now(),this.nthSequenceNumber(t,i))).next(g=>(r=g,c=Date.now(),this.removeTargets(t,r,e))).next(g=>(o=g,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(g=>(d=Date.now(),$e()<=X.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${g} documents in `+(d-h)+`ms
Total Duration: ${d-p}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:g})))}}function vf(n,t){return new _f(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(){this.changes=new Ve(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Ct.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?R.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&Rn(r.mutation,i,ie.empty(),dt.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,Y()).next(()=>r))}getLocalViewOfDocuments(t,e,r=Y()){const i=Se();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let a=In();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=Se();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,Y()))}populateOverlays(t,e,r){const i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,c)=>{e.set(a,c)})})}computeViews(t,e,r,i){let o=ve();const a=Sn(),c=function(){return Sn()}();return e.forEach((h,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Gr)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Rn(p.mutation,d,p.mutation.getFieldMask(),dt.now())):a.set(d.key,ie.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,p)=>a.set(d,p)),e.forEach((d,p)=>{var g;return c.set(d,new Tf(p,(g=a.get(d))!==null&&g!==void 0?g:null))}),c))}recalculateAndSaveOverlays(t,e){const r=Sn();let i=new ut((a,c)=>a-c),o=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const c of a)c.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let p=r.get(h)||ie.empty();p=c.applyToLocalView(d,p),r.set(h,p);const g=(i.get(c.batchId)||Y()).add(h);i=i.insert(c.batchId,g)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,p=h.value,g=Cl();p.forEach(E=>{if(!o.has(E)){const S=Dl(e.get(E),r.get(E));S!==null&&g.set(E,S),o=o.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,g))}return R.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Pd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):R.resolve(Se());let c=Nn,h=o;return a.next(d=>R.forEach(d,(p,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),o.get(p)?R.resolve():this.remoteDocumentCache.getEntry(t,p).next(E=>{h=h.insert(p,E)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,Y())).next(p=>({batchId:c,changes:Dd(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new $(e)).next(r=>{let i=In();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){const o=e.collectionGroup;let a=In();return this.indexManager.getCollectionParents(t,o).next(c=>R.forEach(c,h=>{const d=function(g,E){return new Ur(E,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,i).next(p=>{p.forEach((g,E)=>{a=a.insert(g,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(a=>{o.forEach((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ct.newInvalidDocument(p)))});let c=In();return a.forEach((h,d)=>{const p=o.get(h);p!==void 0&&Rn(p.mutation,d,ie.empty(),dt.now()),qr(e,d)&&(c=c.insert(h,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return R.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,function(i){return{id:i.id,version:i.version,createTime:He(i.createTime)}}(e)),R.resolve()}getNamedQuery(t,e){return R.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,function(i){return{name:i.name,query:df(i.bundledQuery),readTime:He(i.readTime)}}(e)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(){this.overlays=new ut($.comparator),this.kr=new Map}getOverlay(t,e){return R.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Se();return R.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.wt(t,e,o)}),R.resolve()}removeOverlaysForBatchId(t,e,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.kr.delete(r)),R.resolve()}getOverlaysForCollection(t,e,r){const i=Se(),o=e.length+1,a=new $(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return R.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new ut((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let p=o.get(d.largestBatchId);p===null&&(p=Se(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=Se(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return R.resolve(c)}wt(t,e,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new qd(e,r));let o=this.kr.get(e);o===void 0&&(o=Y(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(){this.sessionToken=Tt.EMPTY_BYTE_STRING}getSessionToken(t){return R.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(){this.qr=new mt(yt.Qr),this.$r=new mt(yt.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){const r=new yt(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new yt(t,e))}Gr(t,e){t.forEach(r=>this.removeReference(r,e))}zr(t){const e=new $(new it([])),r=new yt(e,t),i=new yt(e,t+1),o=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),o.push(a.key)}),o}jr(){this.qr.forEach(t=>this.Wr(t))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){const e=new $(new it([])),r=new yt(e,t),i=new yt(e,t+1);let o=Y();return this.$r.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new yt(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class yt{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return $.comparator(t.key,e.key)||G(t.Hr,e.Hr)}static Ur(t,e){return G(t.Hr,e.Hr)||$.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new mt(yt.Qr)}checkEmpty(t){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){const o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new zd(o,e,r,i);this.mutationQueue.push(a);for(const c of i)this.Yr=this.Yr.add(new yt(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return R.resolve(a)}lookupMutationBatch(t,e){return R.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,i=this.Xr(r),o=i<0?0:i;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?sd:this.er-1)}getAllMutationBatches(t){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new yt(e,0),i=new yt(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,i],a=>{const c=this.Zr(a.Hr);o.push(c)}),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new mt(G);return e.forEach(i=>{const o=new yt(i,0),a=new yt(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],c=>{r=r.add(c.Hr)})}),R.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,i=r.length+1;let o=r;$.isDocumentKey(o)||(o=o.child(""));const a=new yt(new $(o),0);let c=new mt(G);return this.Yr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(h.Hr)),!0)},a),R.resolve(this.ei(c))}ei(t){const e=[];return t.forEach(r=>{const i=this.Zr(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){at(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return R.forEach(e.mutations,i=>{const o=new yt(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Yr=r})}rr(t){}containsKey(t,e){const r=new yt(e,0),i=this.Yr.firstAfterOrEqual(r);return R.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,R.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(t){this.ni=t,this.docs=function(){return new ut($.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,i=this.docs.get(r),o=i?i.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return R.resolve(r?r.document.mutableCopy():Ct.newInvalidDocument(e))}getEntries(t,e){let r=ve();return e.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Ct.newInvalidDocument(i))}),R.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=ve();const a=e.path,c=new $(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||td(Zh(p),r)<=0||(i.has(p.key)||qr(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(t,e,r,i){q(9500)}ri(t,e){return R.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Sf(this)}getSize(t){return R.resolve(this.size)}}class Sf extends Ef{constructor(t){super(),this.Or=t}applyChanges(t){const e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.Or.addEntry(t,i)):this.Or.removeEntry(r)}),R.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(t){this.persistence=t,this.ii=new Ve(e=>di(e),fi),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.si=0,this.oi=new _i,this.targetCount=0,this._i=Ye.ar()}forEachTarget(t,e){return this.ii.forEach((r,i)=>e(i)),R.resolve()}getLastRemoteSnapshotVersion(t){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return R.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),R.resolve()}hr(t){this.ii.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this._i=new Ye(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,R.resolve()}updateTargetData(t,e){return this.hr(e),R.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,R.resolve()}removeTargets(t,e,r){let i=0;const o=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),R.waitFor(o).next(()=>i)}getTargetCount(t){return R.resolve(this.targetCount)}getTargetData(t,e){const r=this.ii.get(e)||null;return R.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),R.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),R.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),R.resolve()}getMatchingKeysForTargetId(t,e){const r=this.oi.Jr(e);return R.resolve(r)}containsKey(t,e){return R.resolve(this.oi.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(t,e){this.ai={},this.overlays={},this.ui=new jr(0),this.ci=!1,this.ci=!0,this.li=new bf,this.referenceDelegate=t(this),this.hi=new Rf(this),this.indexManager=new ff,this.remoteDocumentCache=function(i){return new Cf(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new hf(e),this.Ti=new wf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Af,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new Pf(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){M("MemoryPersistence","Starting transaction:",t);const i=new xf(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(o=>this.referenceDelegate.di(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ei(t,e){return R.or(Object.values(this.ai).map(r=>()=>r.containsKey(t,e)))}}class xf extends nd{constructor(t){super(),this.currentSequenceNumber=t}}class vi{constructor(t){this.persistence=t,this.Ai=new _i,this.Ri=null}static Vi(t){return new vi(t)}get mi(){if(this.Ri)return this.Ri;throw q(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),R.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),R.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.mi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ii(){this.Ri=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.mi,r=>{const i=$.fromPath(r);return this.fi(t,i).next(o=>{o||e.removeEntry(i,z.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.fi(t,e).next(r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())})}Pi(t){return 0}fi(t,e){return R.or([()=>R.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class Dr{constructor(t,e){this.persistence=t,this.gi=new Ve(r=>id(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=vf(this,e)}static Vi(t,e){return new Dr(t,e)}Ii(){}di(t){return R.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){const e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(i=>r+i))}yr(t){let e=0;return this.gr(t,r=>{e++}).next(()=>e)}gr(t,e){return R.forEach(this.gi,(r,i)=>this.Sr(t,r,i).next(o=>o?R.resolve():e(i)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ri(t,a=>this.Sr(t,a,e).next(c=>{c||(r++,o.removeEntry(a,z.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),R.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),R.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),R.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),R.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=pr(t.data.value)),e}Sr(t,e,r){return R.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.gi.get(e);return R.resolve(i!==void 0&&i>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=i}static Es(t,e){let r=Y(),i=Y();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Ei(t,e.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Eu()?8:rd(_u())>0?6:4}()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,i){const o={result:null};return this.ps(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ys(t,e,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Df;return this.ws(t,e,a).next(c=>{if(o.result=c,this.Rs)return this.Ss(t,e,a,c.size)})}).next(()=>o.result)}Ss(t,e,r,i){return r.documentReadCount<this.Vs?($e()<=X.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Be(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),R.resolve()):($e()<=X.DEBUG&&M("QueryEngine","Query:",Be(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?($e()<=X.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Be(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Gt(e))):R.resolve())}ps(t,e){if(ua(e))return R.resolve(null);let r=Gt(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=Ws(e,null,"F"),r=Gt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=Y(...o);return this.gs.getDocuments(t,a).next(c=>this.indexManager.getMinOffset(t,r).next(h=>{const d=this.bs(e,c);return this.Ds(e,d,a,h.readTime)?this.ps(t,Ws(e,null,"F")):this.vs(t,d,e,h)}))})))}ys(t,e,r,i){return ua(e)||i.isEqual(z.min())?R.resolve(null):this.gs.getDocuments(t,r).next(o=>{const a=this.bs(e,o);return this.Ds(e,a,r,i)?R.resolve(null):($e()<=X.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Be(e)),this.vs(t,a,e,Yh(i,Nn)).next(c=>c))})}bs(t,e){let r=new mt(bl(t));return e.forEach((i,o)=>{qr(t,o)&&(r=r.add(o))}),r}Ds(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ws(t,e,r){return $e()<=X.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Be(e)),this.gs.getDocumentsMatchingQuery(t,e,ge.min(),r)}vs(t,e,r,i){return this.gs.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti="LocalStore",kf=3e8;class Nf{constructor(t,e,r,i){this.persistence=t,this.Cs=e,this.serializer=i,this.Fs=new ut(G),this.Ms=new Ve(o=>di(o),fi),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new If(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Fs))}}function Of(n,t,e,r){return new Nf(n,t,e,r)}async function ql(n,t){const e=J(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],c=[];let h=Y();for(const d of i){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){c.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return e.localDocuments.getDocuments(r,h).next(d=>({Bs:d,removedBatchIds:a,addedBatchIds:c}))})})}function Hl(n){const t=J(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.hi.getLastRemoteSnapshotVersion(e))}function Lf(n,t){const e=J(n),r=t.snapshotVersion;let i=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Os.newChangeBuffer({trackRemovals:!0});i=e.Fs;const c=[];t.targetChanges.forEach((p,g)=>{const E=i.get(g);if(!E)return;c.push(e.hi.removeMatchingKeys(o,p.removedDocuments,g).next(()=>e.hi.addMatchingKeys(o,p.addedDocuments,g)));let S=E.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(g)!==null?S=S.withResumeToken(Tt.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(g,S),function(V,D,k){return V.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=kf?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0}(E,S,p)&&c.push(e.hi.updateTargetData(o,S))});let h=ve(),d=Y();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),c.push(Mf(o,a,t.documentUpdates).next(p=>{h=p.Ls,d=p.ks})),!r.isEqual(z.min())){const p=e.hi.getLastRemoteSnapshotVersion(o).next(g=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(p)}return R.waitFor(c).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.Fs=i,o))}function Mf(n,t,e){let r=Y(),i=Y();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=ve();return e.forEach((c,h)=>{const d=o.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),h.isNoDocument()&&h.version.isEqual(z.min())?(t.removeEntry(c,h.readTime),a=a.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(c,h)):M(Ti,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)}),{Ls:a,ks:i}})}function Ff(n,t){const e=J(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.hi.getTargetData(r,t).next(o=>o?(i=o,R.resolve(i)):e.hi.allocateTargetId(r).next(a=>(i=new oe(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=e.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r})}async function Zs(n,t,e){const r=J(n),i=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!rn(a))throw a;M(Ti,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(i.target)}function wa(n,t,e){const r=J(n);let i=z.min(),o=Y();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,p){const g=J(h),E=g.Ms.get(p);return E!==void 0?R.resolve(g.Fs.get(E)):g.hi.getTargetData(d,p)}(r,a,Gt(t)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?i:z.min(),e?o:Y())).next(c=>(jf(r,Sd(t),c),{documents:c,qs:o})))}function jf(n,t,e){let r=n.xs.get(t)||z.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.xs.set(t,r)}class Aa{constructor(){this.activeTargetIds=Nd()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class $f{constructor(){this.Fo=new Aa,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new Aa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{xo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba="ConnectivityMonitor";class Pa{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){M(ba,"Network connectivity changed: AVAILABLE");for(const t of this.ko)t(0)}Lo(){M(ba,"Network connectivity changed: UNAVAILABLE");for(const t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hr=null;function ti(){return hr===null?hr=function(){return 268435456+Math.round(2147483648*Math.random())}():hr++,"0x"+hr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps="RestConnection",Uf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class zf{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Pr?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(t,e,r,i,o){const a=ti(),c=this.Go(t,e.toUriEncodedString());M(Ps,`Sending RPC '${t}' ${a}:`,c,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,i,o);const{host:d}=new URL(c),p=oi(d);return this.jo(t,c,h,r,p).then(g=>(M(Ps,`Received RPC '${t}' ${a}: `,g),g),g=>{throw pe(Ps,`RPC '${t}' ${a} failed with error: `,g,"url: ",c,"request:",r),g})}Jo(t,e,r,i,o,a){return this.Wo(t,e,r,i,o)}zo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+nn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),r&&r.headers.forEach((i,o)=>t[o]=i)}Go(t,e){const r=Uf[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt="WebChannelConnection";class Hf extends zf{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,i,o){const a=ti();return new Promise((c,h)=>{const d=new rl;d.setWithCredentials(!0),d.listenOnce(sl.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case fr.NO_ERROR:const g=d.getResponseJson();M(bt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(g)),c(g);break;case fr.TIMEOUT:M(bt,`RPC '${t}' ${a} timed out`),h(new j(O.DEADLINE_EXCEEDED,"Request time out"));break;case fr.HTTP_ERROR:const E=d.getStatus();if(M(bt,`RPC '${t}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S?.error;if(C&&C.status&&C.message){const V=function(k){const F=k.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(F)>=0?F:O.UNKNOWN}(C.status);h(new j(V,C.message))}else h(new j(O.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new j(O.UNAVAILABLE,"Connection failed."));break;default:q(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{M(bt,`RPC '${t}' ${a} completed.`)}});const p=JSON.stringify(i);M(bt,`RPC '${t}' ${a} sending request:`,i),d.send(e,"POST",p,r,15)})}P_(t,e,r){const i=ti(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=al(),c=ol(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const p=o.join("");M(bt,`Creating RPC '${t}' stream ${i}: ${p}`,h);const g=a.createWebChannel(p,h);this.T_(g);let E=!1,S=!1;const C=new qf({Ho:D=>{S?M(bt,`Not sending because RPC '${t}' stream ${i} is closed:`,D):(E||(M(bt,`Opening RPC '${t}' stream ${i} transport.`),g.open(),E=!0),M(bt,`RPC '${t}' stream ${i} sending:`,D),g.send(D))},Yo:()=>g.close()}),V=(D,k,F)=>{D.listen(k,H=>{try{F(H)}catch(et){setTimeout(()=>{throw et},0)}})};return V(g,Tn.EventType.OPEN,()=>{S||(M(bt,`RPC '${t}' stream ${i} transport opened.`),C.s_())}),V(g,Tn.EventType.CLOSE,()=>{S||(S=!0,M(bt,`RPC '${t}' stream ${i} transport closed`),C.__(),this.I_(g))}),V(g,Tn.EventType.ERROR,D=>{S||(S=!0,pe(bt,`RPC '${t}' stream ${i} transport errored. Name:`,D.name,"Message:",D.message),C.__(new j(O.UNAVAILABLE,"The operation could not be completed")))}),V(g,Tn.EventType.MESSAGE,D=>{var k;if(!S){const F=D.data[0];at(!!F,16349);const H=F,et=H?.error||((k=H[0])===null||k===void 0?void 0:k.error);if(et){M(bt,`RPC '${t}' stream ${i} received error:`,et);const _t=et.status;let nt=function(v){const T=ht[v];if(T!==void 0)return kl(T)}(_t),w=et.message;nt===void 0&&(nt=O.INTERNAL,w="Unknown error status: "+_t+" with message "+et.message),S=!0,C.__(new j(nt,w)),g.close()}else M(bt,`RPC '${t}' stream ${i} received:`,F),C.a_(F)}}),V(c,il.STAT_EVENT,D=>{D.stat===$s.PROXY?M(bt,`RPC '${t}' stream ${i} detected buffering proxy`):D.stat===$s.NOPROXY&&M(bt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(t=>t.close()),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter(e=>e===t)}}function Cs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(n){return new Jd(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(t,e,r=1e3,i=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=i,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();const e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,e-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca="PersistentStream";class Gf{constructor(t,e,r,i,o,a,c,h){this.Fi=t,this.w_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Kl(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===O.RESOURCE_EXHAUSTED?(Zt(e.toString()),Zt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;const t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===e&&this.W_(r,i)},r=>{t(()=>{const i=new j(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(t,e){const r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return M(Ca,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget(()=>this.b_===t?e():(M(Ca,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Kf extends Gf{constructor(t,e,r,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=nf(this.serializer,t),r=function(o){if(!("targetChange"in o))return z.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?z.min():a.readTime?He(a.readTime):z.min()}(t);return this.listener.J_(e,r)}H_(t){const e={};e.database=va(this.serializer),e.addTarget=function(o,a){let c;const h=a.target;if(c=Ks(h)?{documents:rf(o,h)}:{query:sf(o,h).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Zd(o,a.resumeToken);const d=Js(o,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(z.min())>0){c.readTime=Yd(o,a.snapshotVersion.toTimestamp());const d=Js(o,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,t);const r=af(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){const e={};e.database=va(this.serializer),e.removeTarget=t,this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{}class Qf extends Wf{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,Ys(e,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new j(O.UNKNOWN,o.toString())})}Jo(t,e,r,i,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(t,Ys(e,r),i,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new j(O.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Xf{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Zt(e),this._a=!1):M("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze="RemoteStore";class Jf{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Un(this)&&(M(Ze,"Restarting streams for network reachability change."),await async function(h){const d=J(h);d.Ia.add(4),await Bn(d),d.Aa.set("Unknown"),d.Ia.delete(4),await Wr(d)}(this))})}),this.Aa=new Xf(r,i)}}async function Wr(n){if(Un(n))for(const t of n.da)await t(!0)}async function Bn(n){for(const t of n.da)await t(!1)}function Wl(n,t){const e=J(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),bi(e)?Ai(e):sn(e).x_()&&wi(e,t))}function Ii(n,t){const e=J(n),r=sn(e);e.Ta.delete(t),r.x_()&&Ql(e,t),e.Ta.size===0&&(r.x_()?r.B_():Un(e)&&e.Aa.set("Unknown"))}function wi(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(z.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}sn(n).H_(t)}function Ql(n,t){n.Ra.$e(t),sn(n).Y_(t)}function Ai(n){n.Ra=new Kd({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),sn(n).start(),n.Aa.aa()}function bi(n){return Un(n)&&!sn(n).M_()&&n.Ta.size>0}function Un(n){return J(n).Ia.size===0}function Xl(n){n.Ra=void 0}async function Yf(n){n.Aa.set("Online")}async function Zf(n){n.Ta.forEach((t,e)=>{wi(n,t)})}async function tp(n,t){Xl(n),bi(n)?(n.Aa.la(t),Ai(n)):n.Aa.set("Unknown")}async function ep(n,t,e){if(n.Aa.set("Online"),t instanceof Ol&&t.state===2&&t.cause)try{await async function(i,o){const a=o.cause;for(const c of o.targetIds)i.Ta.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ta.delete(c),i.Ra.removeTarget(c))}(n,t)}catch(r){M(Ze,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Sa(n,r)}else if(t instanceof mr?n.Ra.Ye(t):t instanceof Nl?n.Ra.it(t):n.Ra.et(t),!e.isEqual(z.min()))try{const r=await Hl(n.localStore);e.compareTo(r)>=0&&await function(o,a){const c=o.Ra.Pt(a);return c.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.Ta.get(d);p&&o.Ta.set(d,p.withResumeToken(h.resumeToken,a))}}),c.targetMismatches.forEach((h,d)=>{const p=o.Ta.get(h);if(!p)return;o.Ta.set(h,p.withResumeToken(Tt.EMPTY_BYTE_STRING,p.snapshotVersion)),Ql(o,h);const g=new oe(p.target,h,d,p.sequenceNumber);wi(o,g)}),o.remoteSyncer.applyRemoteEvent(c)}(n,e)}catch(r){M(Ze,"Failed to raise snapshot:",r),await Sa(n,r)}}async function Sa(n,t,e){if(!rn(t))throw t;n.Ia.add(1),await Bn(n),n.Aa.set("Offline"),e||(e=()=>Hl(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M(Ze,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Wr(n)})}async function Ra(n,t){const e=J(n);e.asyncQueue.verifyOperationInProgress(),M(Ze,"RemoteStore received new credentials");const r=Un(e);e.Ia.add(3),await Bn(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Wr(e)}async function np(n,t){const e=J(n);t?(e.Ia.delete(2),await Wr(e)):t||(e.Ia.add(2),await Bn(e),e.Aa.set("Unknown"))}function sn(n){return n.Va||(n.Va=function(e,r,i){const o=J(e);return o.ia(),new Kf(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:Yf.bind(null,n),e_:Zf.bind(null,n),n_:tp.bind(null,n),J_:ep.bind(null,n)}),n.da.push(async t=>{t?(n.Va.N_(),bi(n)?Ai(n):n.Aa.set("Unknown")):(await n.Va.stop(),Xl(n))})),n.Va}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new ue,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){const a=Date.now()+r,c=new Pi(t,e,a,i,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(O.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jl(n,t){if(Zt("AsyncQueue",`${t}: ${n}`),rn(n))return new j(O.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{static emptySet(t){return new Ge(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||$.comparator(e.key,r.key):(e,r)=>$.comparator(e.key,r.key),this.keyedMap=In(),this.sortedSet=new ut(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ge)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Ge;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(){this.fa=new ut($.comparator)}track(t){const e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):q(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){const t=[];return this.fa.inorderTraversal((e,r)=>{t.push(r)}),t}}class tn{constructor(t,e,r,i,o,a,c,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,i,o){const a=[];return e.forEach(c=>{a.push({type:0,doc:c})}),new tn(t,e,Ge.emptySet(e),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&zr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(t=>t.ba())}}class sp{constructor(){this.queries=Da(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){const i=J(e),o=i.queries;i.queries=Da(),o.forEach((a,c)=>{for(const h of c.wa)h.onError(r)})})(this,new j(O.ABORTED,"Firestore shutting down"))}}function Da(){return new Ve(n=>Al(n),zr)}async function Yl(n,t){const e=J(n);let r=3;const i=t.query;let o=e.queries.get(i);o?!o.Sa()&&t.ba()&&(r=2):(o=new rp,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(i,!0);break;case 1:o.ya=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){const c=Jl(a,`Initialization of query '${Be(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&Ci(e)}async function Zl(n,t){const e=J(n),r=t.query;let i=3;const o=e.queries.get(r);if(o){const a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?i=t.ba()?0:1:!o.Sa()&&t.ba()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function ip(n,t){const e=J(n);let r=!1;for(const i of t){const o=i.query,a=e.queries.get(o);if(a){for(const c of a.wa)c.Ca(i)&&(r=!0);a.ya=i}}r&&Ci(e)}function op(n,t,e){const r=J(n),i=r.queries.get(t);if(i)for(const o of i.wa)o.onError(e);r.queries.delete(t)}function Ci(n){n.Da.forEach(t=>{t.next()})}var ei,Va;(Va=ei||(ei={})).Fa="default",Va.Cache="cache";class tc{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){const r=[];for(const i of t.docChanges)i.type!==3&&r.push(i);t=new tn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;const r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;const e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=tn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==ei.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(t){this.key=t}}class nc{constructor(t){this.key=t}}class ap{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Y(),this.mutatedKeys=Y(),this.Xa=bl(t),this.eu=new Ge(this.Xa)}get tu(){return this.Ha}nu(t,e){const r=e?e.ru:new xa,i=e?e.eu:this.eu;let o=e?e.mutatedKeys:this.mutatedKeys,a=i,c=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((p,g)=>{const E=i.get(p),S=qr(this.query,g)?g:null,C=!!E&&this.mutatedKeys.has(E.key),V=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;E&&S?E.data.isEqual(S.data)?C!==V&&(r.track({type:3,doc:S}),D=!0):this.iu(E,S)||(r.track({type:2,doc:S}),D=!0,(h&&this.Xa(S,h)>0||d&&this.Xa(S,d)<0)&&(c=!0)):!E&&S?(r.track({type:0,doc:S}),D=!0):E&&!S&&(r.track({type:1,doc:E}),D=!0,(h||d)&&(c=!0)),D&&(S?(a=a.add(S),o=V?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{eu:a,ru:r,Ds:c,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){const o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;const a=t.ru.pa();a.sort((p,g)=>function(S,C){const V=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return q(20277,{At:D})}};return V(S)-V(C)}(p.type,g.type)||this.Xa(p.doc,g.doc)),this.su(r),i=i!=null&&i;const c=e&&!i?this.ou():[],h=this.Za.size===0&&this.current&&!i?1:0,d=h!==this.Ya;return this.Ya=h,a.length!==0||d?{snapshot:new tn(this.query,t.eu,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new xa,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}ou(){if(!this.current)return[];const t=this.Za;this.Za=Y(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const e=[];return t.forEach(r=>{this.Za.has(r)||e.push(new nc(r))}),this.Za.forEach(r=>{t.has(r)||e.push(new ec(r))}),e}uu(t){this.Ha=t.qs,this.Za=Y();const e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return tn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Si="SyncEngine";class lp{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class cp{constructor(t){this.key=t,this.lu=!1}}class up{constructor(t,e,r,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Ve(c=>Al(c),zr),this.Tu=new Map,this.Iu=new Set,this.du=new ut($.comparator),this.Eu=new Map,this.Au=new _i,this.Ru={},this.Vu=new Map,this.mu=Ye.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function hp(n,t,e=!0){const r=ac(n);let i;const o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.cu()):i=await rc(r,t,e,!0),i}async function dp(n,t){const e=ac(n);await rc(e,t,!0,!1)}async function rc(n,t,e,r){const i=await Ff(n.localStore,Gt(t)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await fp(n,t,o,a==="current",i.resumeToken)),n.isPrimaryClient&&e&&Wl(n.remoteStore,i),c}async function fp(n,t,e,r,i){n.gu=(g,E,S)=>async function(V,D,k,F){let H=D.view.nu(k);H.Ds&&(H=await wa(V.localStore,D.query,!1).then(({documents:w})=>D.view.nu(w,H)));const et=F&&F.targetChanges.get(D.targetId),_t=F&&F.targetMismatches.get(D.targetId)!=null,nt=D.view.applyChanges(H,V.isPrimaryClient,et,_t);return Na(V,D.targetId,nt._u),nt.snapshot}(n,g,E,S);const o=await wa(n.localStore,t,!0),a=new ap(t,o.qs),c=a.nu(o.documents),h=$n.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,h);Na(n,e,d._u);const p=new lp(t,e,a);return n.Pu.set(t,p),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),d.snapshot}async function pp(n,t,e){const r=J(n),i=r.Pu.get(t),o=r.Tu.get(i.targetId);if(o.length>1)return r.Tu.set(i.targetId,o.filter(a=>!zr(a,t))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Zs(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&Ii(r.remoteStore,i.targetId),ni(r,i.targetId)}).catch(Fr)):(ni(r,i.targetId),await Zs(r.localStore,i.targetId,!0))}async function gp(n,t){const e=J(n),r=e.Pu.get(t),i=e.Tu.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ii(e.remoteStore,r.targetId))}async function sc(n,t){const e=J(n);try{const r=await Lf(e.localStore,t);t.targetChanges.forEach((i,o)=>{const a=e.Eu.get(o);a&&(at(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?at(a.lu,14607):i.removedDocuments.size>0&&(at(a.lu,42227),a.lu=!1))}),await oc(e,r,t)}catch(r){await Fr(r)}}function ka(n,t,e){const r=J(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const i=[];r.Pu.forEach((o,a)=>{const c=a.view.va(t);c.snapshot&&i.push(c.snapshot)}),function(a,c){const h=J(a);h.onlineState=c;let d=!1;h.queries.forEach((p,g)=>{for(const E of g.wa)E.va(c)&&(d=!0)}),d&&Ci(h)}(r.eventManager,t),i.length&&r.hu.J_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function mp(n,t,e){const r=J(n);r.sharedClientState.updateQueryState(t,"rejected",e);const i=r.Eu.get(t),o=i&&i.key;if(o){let a=new ut($.comparator);a=a.insert(o,Ct.newNoDocument(o,z.min()));const c=Y().add(o),h=new Kr(z.min(),new Map,new ut(G),a,c);await sc(r,h),r.du=r.du.remove(o),r.Eu.delete(t),Ri(r)}else await Zs(r.localStore,t,!1).then(()=>ni(r,t,e)).catch(Fr)}function ni(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach(r=>{n.Au.containsKey(r)||ic(n,r)})}function ic(n,t){n.Iu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Ii(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),Ri(n))}function Na(n,t,e){for(const r of e)r instanceof ec?(n.Au.addReference(r.key,t),yp(n,r)):r instanceof nc?(M(Si,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||ic(n,r.key)):q(19791,{yu:r})}function yp(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(M(Si,"New document in limbo: "+e),n.Iu.add(r),Ri(n))}function Ri(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new $(it.fromString(t)),r=n.mu.next();n.Eu.set(r,new cp(e)),n.du=n.du.insert(e,r),Wl(n.remoteStore,new oe(Gt(pi(e.path)),r,"TargetPurposeLimboResolution",jr.ue))}}async function oc(n,t,e){const r=J(n),i=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,h)=>{a.push(r.gu(h,t,e).then(d=>{var p;if((d||e)&&r.isPrimaryClient){const g=d?!d.fromCache:(p=e?.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(h.targetId,g?"current":"not-current")}if(d){i.push(d);const g=Ei.Es(h.targetId,d);o.push(g)}}))}),await Promise.all(a),r.hu.J_(i),await async function(h,d){const p=J(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>R.forEach(d,E=>R.forEach(E.Is,S=>p.persistence.referenceDelegate.addReference(g,E.targetId,S)).next(()=>R.forEach(E.ds,S=>p.persistence.referenceDelegate.removeReference(g,E.targetId,S)))))}catch(g){if(!rn(g))throw g;M(Ti,"Failed to update sequence numbers: "+g)}for(const g of d){const E=g.targetId;if(!g.fromCache){const S=p.Fs.get(E),C=S.snapshotVersion,V=S.withLastLimboFreeSnapshotVersion(C);p.Fs=p.Fs.insert(E,V)}}}(r.localStore,o))}async function _p(n,t){const e=J(n);if(!e.currentUser.isEqual(t)){M(Si,"User change. New user:",t.toKey());const r=await ql(e.localStore,t);e.currentUser=t,function(o,a){o.Vu.forEach(c=>{c.forEach(h=>{h.reject(new j(O.CANCELLED,a))})}),o.Vu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await oc(e,r.Bs)}}function vp(n,t){const e=J(n),r=e.Eu.get(t);if(r&&r.lu)return Y().add(r.key);{let i=Y();const o=e.Tu.get(t);if(!o)return i;for(const a of o){const c=e.Pu.get(a);i=i.unionWith(c.view.tu)}return i}}function ac(n){const t=J(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=sc.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=vp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=mp.bind(null,t),t.hu.J_=ip.bind(null,t.eventManager),t.hu.pu=op.bind(null,t.eventManager),t}class Vr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Gl(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return Of(this.persistence,new Vf,t.initialUser,this.serializer)}Du(t){return new zl(vi.Vi,this.serializer)}bu(t){return new $f}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Vr.provider={build:()=>new Vr};class Ep extends Vr{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){at(this.persistence.referenceDelegate instanceof Dr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new yf(r,t.asyncQueue,e)}Du(t){const e=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new zl(r=>Dr.Vi(r,e),this.serializer)}}class ri{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ka(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=_p.bind(null,this.syncEngine),await np(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new sp}()}createDatastore(t){const e=Gl(t.databaseInfo.databaseId),r=function(o){return new Hf(o)}(t.databaseInfo);return function(o,a,c,h){return new Qf(o,a,c,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,a,c){return new Jf(r,i,o,a,c)}(this.localStore,this.datastore,t.asyncQueue,e=>ka(this.syncEngine,e,0),function(){return Pa.C()?new Pa:new Bf}())}createSyncEngine(t,e){return function(i,o,a,c,h,d,p){const g=new up(i,o,a,c,h,d);return p&&(g.fu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=J(i);M(Ze,"RemoteStore shutting down."),o.Ia.add(5),await Bn(o),o.Ea.shutdown(),o.Aa.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}ri.provider={build:()=>new ri};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):Zt("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="FirestoreClient";class Tp{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=Pt.UNAUTHENTICATED,this.clientId=ci.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{M(Ee,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(M(Ee,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ue;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Jl(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Ss(n,t){n.asyncQueue.verifyOperationInProgress(),M(Ee,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await ql(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>{pe("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{M("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{pe("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=t}async function Oa(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Ip(n);M(Ee,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>Ra(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Ra(t.remoteStore,i)),n._onlineComponents=t}async function Ip(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(Ee,"Using user provided OfflineComponentProvider");try{await Ss(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===O.FAILED_PRECONDITION||i.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;pe("Error using user provided cache. Falling back to memory cache: "+e),await Ss(n,new Vr)}}else M(Ee,"Using default OfflineComponentProvider"),await Ss(n,new Ep(void 0));return n._offlineComponents}async function wp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(Ee,"Using user provided OnlineComponentProvider"),await Oa(n,n._uninitializedComponentsProvider._online)):(M(Ee,"Using default OnlineComponentProvider"),await Oa(n,new ri))),n._onlineComponents}async function cc(n){const t=await wp(n),e=t.eventManager;return e.onListen=hp.bind(null,t.syncEngine),e.onUnlisten=pp.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=dp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=gp.bind(null,t.syncEngine),e}function Ap(n,t,e={}){const r=new ue;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,h,d){const p=new lc({next:E=>{p.Ou(),a.enqueueAndForget(()=>Zl(o,g));const S=E.docs.has(c);!S&&E.fromCache?d.reject(new j(O.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&E.fromCache&&h&&h.source==="server"?d.reject(new j(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),g=new tc(pi(c.path),p,{includeMetadataChanges:!0,ka:!0});return Yl(o,g)}(await cc(n),n.asyncQueue,t,e,r)),r.promise}function bp(n,t,e={}){const r=new ue;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,h,d){const p=new lc({next:E=>{p.Ou(),a.enqueueAndForget(()=>Zl(o,g)),E.fromCache&&h.source==="server"?d.reject(new j(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),g=new tc(c,p,{includeMetadataChanges:!0,ka:!0});return Yl(o,g)}(await cc(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc="firestore.googleapis.com",Ma=!0;class Fa{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new j(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hc,this.ssl=Ma}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:Ma;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Ul;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<gf)throw new j(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Qh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uc((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Qr{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Fa({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new j(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new j(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Fa(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new $h;switch(r.type){case"firstParty":return new qh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new j(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=La.get(e);r&&(M("ComponentProvider","Removing Datastore"),La.delete(e),r.terminate())}(this),Promise.resolve()}}function Pp(n,t,e,r={}){var i;n=kn(n,Qr);const o=oi(t),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(fu(`https://${h}`),yu("Firestore",!0)),a.host!==hc&&a.host!==h&&pe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!wr(d,c)&&(n._setSettings(d),r.mockUserToken)){let p,g;if(typeof r.mockUserToken=="string")p=r.mockUserToken,g=Pt.MOCK_USER;else{p=pu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new j(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new Pt(E)}n._authCredentials=new Bh(new cl(p,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Xr(this.firestore,t,this._query)}}class St{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new he(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new St(this.firestore,t,this._key)}toJSON(){return{type:St._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(Fn(e,St._jsonSchema))return new St(t,r||null,new $(it.fromString(e.referencePath)))}}St._jsonSchemaVersion="firestore/documentReference/1.0",St._jsonSchema={type:ft("string",St._jsonSchemaVersion),referencePath:ft("string")};class he extends Xr{constructor(t,e,r){super(t,e,pi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new St(this.firestore,null,new $(t))}withConverter(t){return new he(this.firestore,t,this._path)}}function Me(n,t,...e){if(n=Qa(n),hl("collection","path",t),n instanceof Qr){const r=it.fromString(t,...e);return Jo(r),new he(n,null,r)}{if(!(n instanceof St||n instanceof he))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(it.fromString(t,...e));return Jo(r),new he(n.firestore,null,r)}}function Cp(n,t,...e){if(n=Qa(n),arguments.length===1&&(t=ci.newId()),hl("doc","path",t),n instanceof Qr){const r=it.fromString(t,...e);return Xo(r),new St(n,null,new $(r))}{if(!(n instanceof St||n instanceof he))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(it.fromString(t,...e));return Xo(r),new St(n.firestore,n instanceof he?n.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="AsyncQueue";class $a{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Kl(this,"async_queue_retry"),this.oc=()=>{const r=Cs();r&&M(ja,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;const e=Cs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;const e=Cs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});const e=new ue;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!rn(t))throw t;M(ja,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){const e=this._c.then(()=>(this.nc=!0,t().catch(r=>{throw this.tc=r,this.nc=!1,Zt("INTERNAL UNHANDLED ERROR: ",Ba(r)),r}).then(r=>(this.nc=!1,r))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);const i=Pi.createAndSchedule(this,t,e,r,o=>this.lc(o));return this.ec.push(i),i}ac(){this.tc&&q(47125,{hc:Ba(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(const e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){const e=this.ec.indexOf(t);this.ec.splice(e,1)}}function Ba(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class xi extends Qr{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new $a,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new $a(t),this._firestoreClient=void 0,await t}}}function Sp(n,t){const e=typeof n=="object"?n:Ch(),r=typeof n=="string"?n:Pr,i=Ih(e,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=hu("firestore");o&&Pp(i,...o)}return i}function dc(n){if(n._terminated)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Rp(n),n._firestoreClient}function Rp(n){var t,e,r;const i=n._freezeSettings(),o=function(c,h,d,p){return new cd(c,h,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,uc(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Tp(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c?._online.build();return{_offline:c?._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ht(Tt.fromBase64String(t))}catch(e){throw new j(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ht(Tt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ht._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Fn(t,Ht._jsonSchema))return Ht.fromBase64String(t.bytes)}}Ht._jsonSchemaVersion="firestore/bytes/1.0",Ht._jsonSchema={type:ft("string",Ht._jsonSchemaVersion),bytes:ft("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new j(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Dt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new j(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new j(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return G(this._lat,t._lat)||G(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:de._jsonSchemaVersion}}static fromJSON(t){if(Fn(t,de._jsonSchema))return new de(t.latitude,t.longitude)}}de._jsonSchemaVersion="firestore/geoPoint/1.0",de._jsonSchema={type:ft("string",de._jsonSchemaVersion),latitude:ft("number"),longitude:ft("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:fe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Fn(t,fe._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new fe(t.vectorValues);throw new j(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}fe._jsonSchemaVersion="firestore/vectorValue/1.0",fe._jsonSchema={type:ft("string",fe._jsonSchemaVersion),vectorValues:ft("object")};const xp=new RegExp("[~\\*/\\[\\]]");function Dp(n,t,e){if(t.search(xp)>=0)throw Ua(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new fc(...t.split("."))._internalPath}catch{throw Ua(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function Ua(n,t,e,r,i){let o=`Function ${t}() called with invalid data`;o+=". ";let a="";return new j(O.INVALID_ARGUMENT,o+n+a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new St(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Vp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(gc("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Vp extends pc{data(){return super.data()}}function gc(n,t){return typeof t=="string"?Dp(n,t):t instanceof fc?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new j(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Np{convertValue(t,e="none"){switch(_e(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ct(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ye(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw q(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return jn(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,i;const o=(i=(r=(e=t.fields)===null||e===void 0?void 0:e[zs].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ct(a.doubleValue));return new fe(o)}convertGeoPoint(t){return new de(ct(t.latitude),ct(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Br(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(On(t));default:return null}}convertTimestamp(t){const e=me(t);return new dt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=it.fromString(t);at(Bl(r),9688,{name:t});const i=new Ln(r.get(1),r.get(3)),o=new $(r.popFirst(5));return i.isEqual(e)||Zt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}class An{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class xe extends pc{constructor(t,e,r,i,o,a){super(t,e,r,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new yr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(gc("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new j(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=xe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}xe._jsonSchemaVersion="firestore/documentSnapshot/1.0",xe._jsonSchema={type:ft("string",xe._jsonSchemaVersion),bundleSource:ft("string","DocumentSnapshot"),bundleName:ft("string"),bundle:ft("string")};class yr extends xe{data(t={}){return super.data(t)}}class Ke{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new An(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new yr(this._firestore,this._userDataWriter,r.key,r,new An(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new j(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const h=new yr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new An(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const h=new yr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new An(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:Op(c.type),doc:h,oldIndex:d,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new j(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ke._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ci.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Op(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return q(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(n){n=kn(n,St);const t=kn(n.firestore,xi);return Ap(dc(t),n._key).then(e=>Mp(t,n,e))}Ke._jsonSchemaVersion="firestore/querySnapshot/1.0",Ke._jsonSchema={type:ft("string",Ke._jsonSchemaVersion),bundleSource:ft("string","QuerySnapshot"),bundleName:ft("string"),bundle:ft("string")};class mc extends Np{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ht(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new St(this.firestore,null,e)}}function Fe(n){n=kn(n,Xr);const t=kn(n.firestore,xi),e=dc(t),r=new mc(t);return kp(n._query),bp(e,n._query).then(i=>new Ke(t,r,n,i))}function Mp(n,t,e){const r=e.docs.get(t._key),i=new mc(n);return new xe(n,i,t._key,r,new An(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(i){nn=i})(Ph),br(new Dn("firestore",(r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new xi(new Uh(r.getProvider("auth-internal")),new Hh(a,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new j(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ln(d.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),qe(Ho,Go,t),qe(Ho,Go,"esm2017")})();const Fp={projectId:"morestudio-sprint-2026",appId:"1:97508017044:web:0707e3f2138ed43f8a0581",storageBucket:"morestudio-sprint-2026.firebasestorage.app",apiKey:"AIzaSyDGmV4wQlF1WEJFkihZDULU9kT7BTvsm8Y",authDomain:"morestudio-sprint-2026.firebaseapp.com",messagingSenderId:"97508017044"},jp=Za(Fp),Pe=Sp(jp);window.onerror=function(n,t,e,r,i){return document.body.innerHTML+="<div style='color:red; background:#fff; position:absolute; z-index:9999; top:0; left:0; width:100%; padding:20px; font-family:sans-serif;'><h1>Global Error</h1><pre>"+n+"<br/>"+(i?i.stack:"")+"</pre></div>",!1};let b={};try{console.log("Fetching from normalized collections...");const[n,t,e,r,i,o,a]=await Promise.all([Fe(Me(Pe,"users")),Fe(Me(Pe,"sprints")),Fe(Me(Pe,"projects")),Fe(Me(Pe,"tasks")),Fe(Me(Pe,"sprintUserStats")),Fe(Me(Pe,"sprintProjectStats")),Lp(Cp(Pe,"dashboardStats","v1"))]),c=[];t.forEach(p=>c.push(p.data())),c.sort((p,g)=>p.index-g.index),b.sprints=c.map(p=>p.name),b.movement=[],r.forEach(p=>b.movement.push(p.data()));const h={};e.forEach(p=>h[p.data().id]=p.data().name),b.points={},b.tasks={};const d=[];n.forEach(p=>d.push(p.data().id)),d.forEach(p=>{b.points[p]=new Array(b.sprints.length).fill(0),b.tasks[p]=new Array(b.sprints.length).fill(0)}),i.forEach(p=>{const g=p.data();b.points[g.userId]||(b.points[g.userId]=new Array(b.sprints.length).fill(0)),b.tasks[g.userId]||(b.tasks[g.userId]=new Array(b.sprints.length).fill(0)),b.points[g.userId][g.sprintIndex]=g.points,b.tasks[g.userId][g.sprintIndex]=g.tasks}),b.projectSprint={},Object.values(h).forEach(p=>{b.projectSprint[p]=new Array(b.sprints.length).fill(0)}),o.forEach(p=>{const g=p.data(),E=h[g.projectId]||g.projectId;b.projectSprint[E]||(b.projectSprint[E]=new Array(b.sprints.length).fill(0)),b.projectSprint[E][g.sprintIndex]=g.points}),b.contribution={},b.personProject={},b.projectPerson={},b.statusPersonCount={"To Do":{},Doing:{},Done:{},Holding:{},Canceled:{}},b.statusPersonPts={"To Do":{},Doing:{},Done:{},Holding:{},Canceled:{}},b.statusProjectPts={"To Do":{},Doing:{},Done:{},Holding:{},Canceled:{}},b.statusProjectCount={"To Do":{},Doing:{},Done:{},Holding:{},Canceled:{}},b.movement.forEach(p=>{const g=p.person,E=p.project,S=(p.sprint||1)-1,C=parseFloat(p.points)||0;let V="To Do";const D=(p.state||"").toLowerCase();D.includes("done")||D==="closed"?V="Done":D.includes("doing")||D==="active"||D.includes("progress")?V="Doing":D.includes("hold")?V="Holding":(D.includes("cancel")||D.includes("remove"))&&(V="Canceled"),b.contribution[g]||(b.contribution[g]={}),b.contribution[g][E]||(b.contribution[g][E]=new Array(b.sprints.length).fill(0)),b.contribution[g][E][S]+=C,b.personProject[g]||(b.personProject[g]={}),b.personProject[g][E]=(b.personProject[g][E]||0)+C,b.projectPerson[E]||(b.projectPerson[E]={}),b.projectPerson[E][g]=(b.projectPerson[E][g]||0)+C,b.statusPersonCount[V][g]||(b.statusPersonCount[V][g]=0),b.statusPersonCount[V][g]++,b.statusPersonPts[V][g]||(b.statusPersonPts[V][g]=0),b.statusPersonPts[V][g]+=C,b.statusProjectPts[V][E]||(b.statusProjectPts[V][E]=0),b.statusProjectPts[V][E]+=C,b.statusProjectCount[V][E]||(b.statusProjectCount[V][E]=0),b.statusProjectCount[V][E]++}),console.log("Firebase data loaded and computed dynamically:",b)}catch(n){throw document.body.innerHTML="<div style='color:red; padding:20px'><h1>Firebase Error</h1><pre>"+n.stack+"</pre></div>",n}const xn={points:"Story Points",tasks:"Tasks"},dr=[{s:"2026-01-05",e:"2026-01-18"},{s:"2026-01-19",e:"2026-02-01"},{s:"2026-02-02",e:"2026-02-15"},{s:"2026-02-16",e:"2026-03-01"},{s:"2026-03-02",e:"2026-03-15"},{s:"2026-03-16",e:"2026-03-29"},{s:"2026-03-30",e:"2026-04-12"},{s:"2026-04-13",e:"2026-04-26"},{s:"2026-04-27",e:"2026-05-10"},{s:"2026-05-11",e:"2026-05-24"},{s:"2026-05-25",e:"2026-06-07"},{s:"2026-06-08",e:"2026-06-21"}],yc="2026-05-25";function $p(n){const t=yc;for(let e=0;e<dr.length;e++)if(t>=dr[e].s&&t<=dr[e].e)return e;return dr.length-1}const Bp=Math.min($p(),b.sprints.length-1),Up=(()=>{const n={};return Object.keys(b.points).forEach(t=>{n[t]=new Array(b.sprints.length).fill(0)}),(b.movement||[]).forEach(t=>{const e=(t.sprint|0)-1;n[t.person]&&e>=0&&e<b.sprints.length&&(n[t.person][e]+=1)}),n})();function za(n,t){return(Up[n]?.[t]||0)>0}const _r={Waew:"BA",Torfah:"BA",Tae:"BA",Ploy:"Designer",Gib:"Designer",Nine:"Designer",Ping:"Tester",Dream:"PC",Karn:"CEO",Ohm:"Dev",Nust:"Dev",Unn:"Dev",Praew:"Dev",P:"Dev",No:"Dev",Tum:"Dev"},kr=["Dev","Designer","BA","Tester","PC","CEO"],Di={Dev:"#6366f1",Designer:"#ec4899",BA:"#a855f7",Tester:"#06b6d4",PC:"#f59e0b",CEO:"#10b981"};function te(n){return _r[n]||"—"}function on(n){return!n||n==="all"?Object.keys(b.points):Object.keys(b.points).filter(t=>te(t)===n)}function Vi(n){const t=te(n);if(t==="—")return"";const e=Di[t]||"#94a3b8";return`<span style="display:inline-block; padding:1px 7px; border-radius:999px; font-size:10px; font-weight:600; background:${e}22; color:${e}; border:1px solid ${e}55; margin-left:6px; vertical-align:middle;">${t}</span>`}const _c=["#6366f1","#22d3ee","#f97316","#10b981","#f43f5e","#eab308","#a855f7","#14b8a6","#3b82f6","#ec4899","#84cc16","#06b6d4","#f59e0b","#8b5cf6","#ef4444","#64748b"],vc=["#6366f1","#22d3ee","#f97316","#10b981","#f43f5e","#eab308","#a855f7","#14b8a6","#3b82f6","#ec4899","#84cc16","#06b6d4","#f59e0b","#8b5cf6","#ef4444","#64748b","#c084fc","#fb923c","#4ade80","#60a5fa","#f472b6","#fbbf24","#34d399","#93c5fd","#fda4af","#a3e635","#67e8f9","#d8b4fe","#fdba74","#86efac","#c4b5fd","#fca5a5","#fde047","#d1d5db"],K={grid:"#334155",tick:"#cbd5e1"};function Ec(){const n=getComputedStyle(document.documentElement),t=n.getPropertyValue("--grid").trim(),e=n.getPropertyValue("--tick").trim();t&&(K.grid=t),e&&(K.tick=e)}function zp(n){const t=document.documentElement;n==="light"?t.setAttribute("data-theme","light"):t.removeAttribute("data-theme"),Ec(),Chart.defaults.color=K.tick,document.getElementById("themeToggle")&&(document.getElementById("themeIcon").textContent=n==="light"?"☀️":"🌙",document.getElementById("themeLabel").textContent=n==="light"?"Light":"Dark");try{localStorage.setItem("theme",n)}catch{}typeof Nt=="function"&&Nt()}(function(){let t="dark";try{t=localStorage.getItem("theme")||"dark"}catch{}t==="light"&&document.documentElement.setAttribute("data-theme","light"),Ec()})();(function(){const t=window.innerWidth;Chart.defaults.font.size=t<=420?9:t<=600?10:t<=900?11:12,Chart.defaults.color=K.tick})();window.addEventListener("resize",()=>{const n=window.innerWidth,t=n<=420?9:n<=600?10:n<=900?11:12;Chart.defaults.font.size!==t&&(Chart.defaults.font.size=t,typeof Nt=="function"&&Nt())});const qp={id:"stackTotals",afterDatasetsDraw(n,t,e){if(!e||!e.enabled)return;const r=n.scales.x,i=n.scales.y;if(!r||!i)return;const o=n.options.indexAxis==="y",a=n.data.labels.length,c=new Array(a).fill(0);n.data.datasets.forEach((g,E)=>{const S=n.getDatasetMeta(E);S.hidden||(g.type||S.type||n.config.type)!=="bar"||g.data.forEach((V,D)=>{c[D]+=+V||0})});const h=n.ctx;h.save(),h.fillStyle=e.color||K.tick||"#e2e8f0";const d=e.fontSize||Math.max(10,(Chart.defaults.font.size||11)-1);h.font=`600 ${d}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;const p=e.decimals??1;o?(h.textAlign="left",h.textBaseline="middle",c.forEach((g,E)=>{if(!g)return;const S=i.getPixelForValue(E),C=r.getPixelForValue(g);h.fillText(g.toLocaleString(void 0,{maximumFractionDigits:p}),C+6,S)})):(h.textAlign="center",h.textBaseline="bottom",c.forEach((g,E)=>{if(!g)return;const S=r.getPixelForValue(E),C=i.getPixelForValue(g);h.fillText(g.toLocaleString(void 0,{maximumFractionDigits:p}),S,C-4)})),h.restore()}};Chart.register(qp);let Rs,xs,Ds,Vs,je,We,ks,x={section:"overview",view:"points",highlight:"All",range:"all",chartType:"bar",projRange:"all",projRole:"all",projDrill:"__all__",projDrillMetric:"points",projDrillStatus:"all",statusMetric:"points",statusView:"person",role:"all",topSprint:"all"};function Nr(n,t){return[(n.Done||{})[t]||0,(n.Doing||{})[t]||0,(n["To Do"]||{})[t]||0,(n.Holding||{})[t]||0,(n.Canceled||{})[t]||0]}Object.keys(b.points).forEach(n=>{Nr(b.statusPersonPts,n),Nr(b.statusPersonCount,n)});Object.keys(b.projectSprint).forEach(n=>{Nr(b.statusProjectPts,n),Nr(b.statusProjectCount,n)});function Jt(n){return b.points[n]||[]}function Te(n){return b.tasks[n]||[]}function Tc(n){return b.projectSprint[n]||[]}function Ns(n){const t=x.projRole;if(!t||t==="all")return Tc(n);const e=on(t),r=b.sprints.length,i=new Array(r).fill(0);return e.forEach(o=>{const a=(b.contribution[o]||{})[n]||[];for(let c=0;c<r;c++)i[c]+=+a[c]||0}),i}function vr(n,t){return(b.contribution[n]||{})[t]||[]}function tt(n){return n.reduce((t,e)=>t+(+e||0),0)}function an(n){if(n==="all")return[0,1,2,3,4,5,6,7,8,9,10,11];const[t,e]=n.split("-").map(Number);return Array.from({length:e-t+1},(r,i)=>t-1+i)}function qa(n){return n===0||n==null?"—":Number.isInteger(n)?n:(+n).toFixed(2)}function Er(n){return(n*100).toFixed(1)+"%"}function Or(n,t,e=_c){return e[t%e.length]}function Hp(){const n=an(x.range),t=x.highlight,e=t!=="All",r="";if(e){const C=Jt(t),V=Te(t),D=tt(n.map(T=>C[T]||0)),k=tt(n.map(T=>V[T]||0)),F=b.contribution[t]||{},H=Object.entries(F).filter(([T,_])=>{const I=_;return n.some(y=>I[y]>0)}).length,et=k?D/k:0,_t=b.statusPersonPts[t]||[0,0,0,0,0,0],nt=tt(_t),w=nt?_t[0]/nt:0,m=n.reduce((T,_)=>T+tt(Object.keys(b.points).map(I=>Jt(I)[_]||0)),0),v=m?D/m:0;document.getElementById("kpis").innerHTML=`
      <div class="kpi"><div class="label">${t} · Points${r}</div><div class="value">${D.toLocaleString(void 0,{maximumFractionDigits:1})}</div><div class="hint">in selected range</div></div>
      <div class="kpi"><div class="label">${t} · Tasks${r}</div><div class="value">${k.toLocaleString(void 0,{maximumFractionDigits:1})}</div><div class="hint">all item types</div></div>
      <div class="kpi"><div class="label">Projects Touched</div><div class="value">${H}</div><div class="hint">in range</div></div>
      <div class="kpi"><div class="label">Team Share</div><div class="value">${Er(v)}</div><div class="hint">of team points</div></div>
      <div class="kpi"><div class="label">Avg Pts / Task</div><div class="value">${et.toFixed(2)}</div><div class="hint">${t}'s avg</div></div>
      <div class="kpi"><div class="label">% Done (pts)</div><div class="value">${Er(w)}</div><div class="hint">${t} full-year</div></div>
    `;return}const i=on(x.role);new Set(i);const o=x.role==="all"?"":` · ${x.role}`;let a=0,c=0,h=new Set;i.forEach(C=>{const V=Jt(C);n.forEach(D=>{V[D]>0&&(a+=V[D],h.add(C))})}),i.forEach(C=>{const V=Te(C);n.forEach(D=>c+=V[D]||0)});const d=Object.keys(b.projectSprint).filter(C=>{const V=Tc(C);return n.some(D=>V[D]>0)}).length,p=c?a/c:0,g=tt(i.map(C=>(b.statusPersonPts[C]||[])[0]||0)),E=tt(i.map(C=>tt(b.statusPersonPts[C]||[]))),S=E?g/E:0;document.getElementById("kpis").innerHTML=`
    <div class="kpi"><div class="label">Total Points${o}</div><div class="value">${a.toLocaleString(void 0,{maximumFractionDigits:1})}</div><div class="hint">selected range</div></div>
    <div class="kpi"><div class="label">Total Tasks${o}</div><div class="value">${c.toLocaleString(void 0,{maximumFractionDigits:1})}</div><div class="hint">Done only</div></div>
    <div class="kpi"><div class="label">Active People</div><div class="value">${h.size}</div><div class="hint">of ${i.length}${o?` ${x.role}`:""}</div></div>
    <div class="kpi"><div class="label">Active Projects</div><div class="value">${d}</div><div class="hint">of ${Object.keys(b.projectSprint).length}</div></div>
    <div class="kpi"><div class="label">Avg Pts / Task</div><div class="value">${p.toFixed(2)}</div><div class="hint">${x.role==="all"?"team-wide":x.role}</div></div>
    <div class="kpi"><div class="label">% Done (pts)</div><div class="value">${Er(S)}</div><div class="hint">full-year</div></div>
  `}function Ic(){const n=document.getElementById("trendChart"),t=an(x.range),e=t.map(c=>b.sprints[c]),r=x.highlight,i=r!=="All",o="";let a;if(i){const c=b.contribution[r]||{};a=Object.keys(c).sort((d,p)=>tt(vr(r,p))-tt(vr(r,d))).map((d,p)=>{const g=vr(r,d),E=t.map(C=>g[C]??0),S=Or(d,p,vc);return{label:d,data:E,backgroundColor:x.chartType==="bar"?S:S+"22",borderColor:S,borderWidth:2,pointRadius:x.chartType==="line"?3:0,fill:!1,stack:"a",tension:.25}}),document.getElementById("trendTitleText").textContent=`Sprint Trend — ${r} by Project`,document.getElementById("trendTag").textContent=`${xn[x.view]}${o}`}else{const c=x.view==="points"?Jt:Te,h=on(x.role).slice();h.sort((p,g)=>tt(t.map(E=>c(g)[E]||0))-tt(t.map(E=>c(p)[E]||0))),a=h.map((p,g)=>{const E=c(p),S=t.map(V=>E[V]??0),C=Or(p,g);return{label:p,data:S,backgroundColor:x.chartType==="bar"?C:C+"22",borderColor:C,borderWidth:1.5,pointRadius:x.chartType==="line"?2:0,fill:!1,stack:"a"}});const d=x.role==="all"?"":` · ${x.role}`;document.getElementById("trendTitleText").textContent="Sprint Trend by Person",document.getElementById("trendTag").textContent=`${xn[x.view]}${d}`}Rs&&Rs.destroy(),Rs=new Chart(n,{type:x.chartType,data:{labels:e,datasets:a},options:{responsive:!0,maintainAspectRatio:!1,interaction:x.chartType==="bar"?{mode:"nearest",intersect:!0,axis:"xy"}:{mode:"index",intersect:!1},scales:{x:{stacked:x.chartType==="bar",grid:{color:K.grid},ticks:{color:K.tick}},y:{stacked:x.chartType==="bar",beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick}}},plugins:{legend:{position:"bottom",labels:{color:K.tick,boxWidth:10,font:{size:11}}},stackTotals:{enabled:x.chartType==="bar"},tooltip:x.chartType==="bar"?{callbacks:{title:c=>c.length?`${c[0].dataset.label} · ${c[0].label}`:"",label:c=>`${(c.parsed.y||0).toLocaleString(void 0,{maximumFractionDigits:2})} ${xn[x.view]}`}}:{callbacks:{footer:c=>"Total: "+c.reduce((h,d)=>h+(d.parsed.y||0),0).toLocaleString(void 0,{maximumFractionDigits:2})}}}}})}function wc(){const n=document.getElementById("topChart"),t=x.topSprint!=="all",e=t?[parseInt(x.topSprint,10)-1]:an(x.range),r=x.highlight,i=r!=="All",o=t?` · Sprint ${x.topSprint}`:"";let a,c,h,d,p;if(i){const g=b.contribution[r]||{},E=Object.keys(g).map(S=>({n:S,v:tt(e.map(C=>vr(r,S)[C]||0))})).filter(S=>S.v>0).sort((S,C)=>C.v-S.v);a=E.map(S=>S.n),c=E.map(S=>S.v),h=a.map((S,C)=>Or(S,C,vc)),d=`${r}'s Top Projects`,p=`${a.length} projects${o}`}else{const g=x.view==="points"?Jt:Te;let S=on(x.role).map(C=>({n:C,v:tt(e.map(V=>g(C)[V]||0)),role:te(C)})).filter(C=>C.v>0);x.role==="all"?S.sort((C,V)=>{const D=kr.indexOf(C.role),k=kr.indexOf(V.role);return D!==k?D-k:V.v-C.v}):S.sort((C,V)=>V.v-C.v),a=S.map(C=>`${C.n} · ${C.role}`),c=S.map(C=>C.v),h=S.map(C=>Di[C.role]||"#94a3b8"),d=x.role==="all"?"Top Contributors (grouped by role)":`Top ${x.role}`,p=`${xn[x.view]} · ${a.length} people${o}`}xs&&xs.destroy(),xs=new Chart(n,{type:"bar",data:{labels:a,datasets:[{data:c,backgroundColor:h,borderRadius:6}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,onHover:(g,E)=>{g.native.target.style.cursor="default"},scales:{x:{beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick}},y:{grid:{display:!1},ticks:{color:K.tick}}},plugins:{legend:{display:!1},tooltip:{}}}}),document.getElementById("topTitleText").textContent=d,document.getElementById("topTag").textContent=p}function Gp(){const n=document.getElementById("capacityChart"),t=an(x.range),e=t.map(h=>b.sprints[h]),r=x.highlight,i=r!=="All",o="Points + Tasks";let a,c;if(i){const h=Jt(r),d=Te(r);a=t.map(p=>h[p]||0),c=t.map(p=>d[p]||0),document.getElementById("capTitle").innerHTML=`${r}'s Capacity by Sprint <span class="tag" id="capTag">${o}</span>`}else{const h=on(x.role);a=t.map(p=>tt(h.map(g=>Jt(g)[p]||0))),c=t.map(p=>tt(h.map(g=>Te(g)[p]||0)));const d=x.role==="all"?"Team Capacity by Sprint":`${x.role} Capacity by Sprint`;document.getElementById("capTitle").innerHTML=`${d} <span class="tag" id="capTag">${o}</span>`}Ds&&Ds.destroy(),Ds=new Chart(n,{data:{labels:e,datasets:[{type:"bar",label:"Story Points",data:a,backgroundColor:"#6366f1cc",borderRadius:6,yAxisID:"y"},{type:"line",label:"Tasks (count)",data:c,borderColor:"#22d3ee",backgroundColor:"#22d3ee22",tension:.35,yAxisID:"y1",borderWidth:2,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{grid:{color:K.grid},ticks:{color:K.tick}},y:{beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick},title:{display:!0,text:"Points",color:"#94a3b8"}},y1:{beginAtZero:!0,grid:{display:!1},ticks:{color:K.tick},position:"right",title:{display:!0,text:"Tasks",color:"#94a3b8"}}},plugins:{legend:{labels:{color:K.tick}}}}})}function Kp(){const n=document.getElementById("avgTrendChart"),t=an(x.range),e=t.map(d=>b.sprints[d]),r=x.highlight,i=r!=="All",o="per sprint";let a,c;if(i){const d=Jt(r),p=Te(r);a=t.map(g=>d[g]||0),c=t.map(g=>p[g]||0),document.getElementById("avgTitle").innerHTML=`${r}'s Avg Points / Task <span class="tag" id="avgTag">${o}</span>`}else{const d=on(x.role);a=t.map(g=>tt(d.map(E=>Jt(E)[g]||0))),c=t.map(g=>tt(d.map(E=>Te(E)[g]||0)));const p=x.role==="all"?"Team-wide":x.role;document.getElementById("avgTitle").innerHTML=`Avg Points / Task Trend <span class="tag" id="avgTag">${p}</span>`}const h=a.map((d,p)=>c[p]?d/c[p]:0);Vs&&Vs.destroy(),Vs=new Chart(n,{type:"line",data:{labels:e,datasets:[{label:"Avg Pts / Task",data:h,borderColor:"#a855f7",backgroundColor:"#a855f733",tension:.35,borderWidth:2.5,pointRadius:4,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:K.grid},ticks:{color:K.tick}},y:{beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick}}},plugins:{legend:{labels:{color:K.tick}}}}})}function Wp(){const n=an(x.projRange),t=Object.keys(b.projectSprint).filter(h=>{const d=Ns(h);return n.some(p=>d[p]>0)}),e=tt(t.map(h=>tt(n.map(d=>Ns(h)[d]||0)))),r=t.map(h=>({n:h,v:tt(n.map(d=>Ns(h)[d]||0))})).sort((h,d)=>d.v-h.v),i=r[0]||{n:"—",v:0},o=e?r.slice(0,3).reduce((h,d)=>h+d.v,0)/e:0,a="",c=x.projRole&&x.projRole!=="all"?` <span class="pill neutral">${x.projRole}</span>`:"";document.getElementById("projKpis").innerHTML=`
    <div class="kpi"><div class="label">Active Projects${c}</div><div class="value">${t.length}</div><div class="hint">in range</div></div>
    <div class="kpi"><div class="label">Total Points${a}</div><div class="value">${e.toLocaleString(void 0,{maximumFractionDigits:1})}</div><div class="hint">across projects</div></div>
    <div class="kpi"><div class="label">#1 Project</div><div class="value" style="font-size:18px">${i.n}</div><div class="hint">${i.v.toFixed(1)} pts</div></div>
    <div class="kpi"><div class="label">Top-3 Share</div><div class="value">${Er(o)}</div><div class="hint">of total points</div></div>
  `}const Qp=["In Progress","Ready for review","Ready for test","Waiting to INT deploy","Waiting to PRD deploy"];function Xp(n){const t=n==="__all__",e=x.projRole&&x.projRole!=="all"?x.projRole:null,r=h=>!e||te(h)===e,i={};Object.keys(b.contribution).forEach(h=>{if(r(h))if(t){const d=new Array(b.sprints.length).fill(0);Object.values(b.contribution[h]||{}).forEach(p=>{p.forEach((g,E)=>{d[E]+=+g||0})}),d.some(p=>p>0)&&(i[h]=d)}else{const d=b.contribution[h][n];d&&d.some(p=>(+p||0)>0)&&(i[h]=d.slice())}});const o={},a=h=>o[h]=o[h]||{donePts:0,doneT:0,wip:0,wipPts:0,blocked:0,blockedPts:0,bugged:0,buggedPts:0,todo:0,todoPts:0,removed:0,total:0,totalPts:0,doneTasksSprint:new Array(b.sprints.length).fill(0)};return(t?b.movement||[]:(b.movement||[]).filter(h=>h.project===n)).forEach(h=>{if(!r(h.person))return;const d=a(h.person);d.total++,d.totalPts+=+h.points||0,h.state==="Done"?(d.donePts+=+h.points||0,d.doneT++,d.doneTasksSprint[h.sprint-1]+=1):Qp.indexOf(h.state)>=0?(d.wip++,d.wipPts+=+h.points||0):h.state==="Blocked"?(d.blocked++,d.blockedPts+=+h.points||0):h.state==="Bugged"?(d.bugged++,d.buggedPts+=+h.points||0):h.state==="To Do"?(d.todo++,d.todoPts+=+h.points||0):h.state==="Removed"&&d.removed++}),{sprintsArr:i,stats:o}}function Tr(){const n=x.projDrill,t=x.projDrillMetric||"points",e=document.getElementById("projDrillName"),r=document.getElementById("projDrillStat"),i=document.getElementById("projDrillContribTable"),o=n==="__all__";if(!n||!o&&!b.projectSprint[n]){e.textContent="Select a project",r.textContent="—",i.innerHTML="",je&&(je.destroy(),je=null);return}const{stats:a}=Xp(n),c=x.projDrillStatus&&x.projDrillStatus!=="all"?x.projDrillStatus:null,{filteredCountByPerson:h,filteredMetricByPerson:d}=(()=>{const N=x.projRole&&x.projRole!=="all"?x.projRole:null,B={},W={},U=b.sprints.length;return(b.movement||[]).forEach(pt=>{c&&pt.state!==c||n!=="__all__"&&pt.project!==n||N&&te(pt.person)!==N||(B[pt.person]=B[pt.person]||new Array(U).fill(0),W[pt.person]=W[pt.person]||new Array(U).fill(0),B[pt.person][pt.sprint-1]+=1,W[pt.person][pt.sprint-1]+=t==="tasks"?1:+pt.points||0)}),{filteredCountByPerson:B,filteredMetricByPerson:W}})(),p=Object.keys(h).filter(N=>(h[N]||[]).some(B=>B>0)).sort((N,B)=>{const W=(h[N]||[]).reduce((Ot,Ft)=>Ot+Ft,0),U=(h[B]||[]).reduce((Ot,Ft)=>Ot+Ft,0);if(U!==W)return U-W;const pt=(d[N]||[]).reduce((Ot,Ft)=>Ot+Ft,0);return(d[B]||[]).reduce((Ot,Ft)=>Ot+Ft,0)-pt});p.reduce((N,B)=>N+a[B].donePts,0);const g=p.reduce((N,B)=>N+a[B].doneT,0),E=p.reduce((N,B)=>N+a[B].total,0);p.reduce((N,B)=>N+a[B].totalPts,0);const S=E?g/E*100:0,C=x.projRole&&x.projRole!=="all"?x.projRole:null,V=C?` <span class="pill neutral" style="margin-left:6px; font-size:11px;">${C}</span>`:"",D=c?` <span class="pill warn" style="margin-left:6px; font-size:11px;">${c}</span>`:"";e.innerHTML=(o?"🗂️ All Projects":`🗂️ ${n}`)+V+D;const k=o?` · ${Object.keys(b.projectSprint).filter(N=>b.projectSprint[N].some(B=>B>0)).length} projects`:"",F=p.reduce((N,B)=>N+(h[B]||[]).reduce((W,U)=>W+U,0),0),H=p.reduce((N,B)=>N+(d[B]||[]).reduce((W,U)=>W+U,0),0);if(c){const N=t==="tasks"?`${F} tasks`:`${H.toLocaleString(void 0,{maximumFractionDigits:1})} pts · ${F} tasks`;r.textContent=`${N} in "${c}" · ${p.length} contributors${k}`}else r.textContent=`${H.toLocaleString(void 0,{maximumFractionDigits:1})} pts · ${F} tasks (all statuses) · ${g} Done · ${S.toFixed(0)}% done · ${p.length} contributors${k}`;const et=b.sprints,_t=b.sprints.length,nt=p.length>0&&p.every(N=>!(d[N]||[]).some(B=>B>0)),w=p.map((N,B)=>{const W=nt?h[N]||new Array(_t).fill(0):d[N]||new Array(_t).fill(0);return{label:N,data:W,backgroundColor:Or(N,B,_c),borderRadius:4,stack:"a"}}),m=nt?"tasks (no pts)":t==="tasks"?"tasks":"pts",v=c?`${c} · ${m}`:`All Statuses · ${m}`;document.getElementById("projDrillChartTag").textContent=v;const T=(()=>{const N={},B=x.projRole&&x.projRole!=="all"?x.projRole:null,W=nt||t==="tasks";return(b.movement||[]).forEach(U=>{n!=="__all__"&&U.project!==n||B&&te(U.person)!==B||c&&U.state!==c||(N[U.person]=N[U.person]||[],N[U.person][U.sprint-1]=N[U.person][U.sprint-1]||{},N[U.person][U.sprint-1][U.state]=(N[U.person][U.sprint-1][U.state]||0)+(W?1:+U.points||0))}),N})(),_=nt||t==="tasks"?"tasks":"pts";je&&je.destroy(),je=new Chart(document.getElementById("projDrillChart"),{type:"bar",data:{labels:et,datasets:w},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0,axis:"xy"},scales:{x:{stacked:!0,grid:{color:K.grid},ticks:{color:K.tick}},y:{stacked:!0,beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick}}},plugins:{legend:{position:"bottom",labels:{color:K.tick,boxWidth:10,font:{size:11}}},stackTotals:{enabled:!0,decimals:t==="tasks"||nt?0:1},tooltip:{callbacks:{title:N=>N.length?`${N[0].dataset.label} · ${N[0].label}`:"",label:N=>{const B=(N.parsed.y||0).toLocaleString(void 0,{maximumFractionDigits:2}),W=T[N.dataset.label]?.[N.dataIndex];if(!W)return[`${B} ${_}`];const U=Object.entries(W).sort((Ut,Ot)=>Ot[1]-Ut[1]);if(U.length===1)return[`${B} ${_} · ${U[0][0]}`];const pt=[`${B} ${_}`];return U.forEach(([Ut,Ot])=>{pt.push(`  ${Ut}: ${Ot.toLocaleString(void 0,{maximumFractionDigits:1})}`)}),pt}}}}}});const I=t==="tasks",y=I?"Tasks Count":"Story Points";if(document.getElementById("projDrillTableTag").textContent=`${p.length} contributors · ${y}`,!p.length){i.innerHTML='<div style="color:var(--muted); padding:14px;">ยังไม่มีคน contribute project นี้</div>';return}const ot=N=>N?I?N.toString():N.toLocaleString(void 0,{maximumFractionDigits:1}):"",Mt=(N,B)=>`<td style="text-align:right; ${B&&N?`color:${B}; font-weight:600;`:""}">${ot(N)}</td>`,Vt=(N,B)=>I?N[B+"T"]:N[B+"Pts"],ee=N=>({doneT:N.doneT,donePts:N.donePts,wipT:N.wip,wipPts:N.wipPts,buggedT:N.bugged,buggedPts:N.buggedPts,blockedT:N.blocked,blockedPts:N.blockedPts,todoT:N.todo,todoPts:N.todoPts,totalT:N.total,totalPts:N.totalPts});let $t=`<table><thead><tr>
    <th>Person</th>
    <th style="text-align:right">Done</th>
    <th style="text-align:right">WIP</th>
    <th style="text-align:right">Bugged</th>
    <th style="text-align:right">Blocked</th>
    <th style="text-align:right">To Do</th>
    <th style="text-align:right">Total</th>
  </tr></thead><tbody>`;p.forEach(N=>{const B=ee(a[N]),W=a[N].total?a[N].doneT/a[N].total*100:0;$t+=`<tr>
      <td style="font-weight:500;">${N}${Vi(N)}<span style="margin-left:8px; font-size:10px; color:var(--muted);">${W.toFixed(0)}%</span></td>
      ${Mt(Vt(B,"done"),"var(--good-text)")}
      ${Mt(Vt(B,"wip"),"var(--accent-text)")}
      ${Mt(Vt(B,"bugged"),"var(--bad-text)")}
      ${Mt(Vt(B,"blocked"),"var(--bad-text)")}
      ${Mt(Vt(B,"todo"),"var(--warn-text)")}
      <td style="text-align:right; font-weight:600;">${ot(Vt(B,"total"))}</td>
    </tr>`});const Bt=p.reduce((N,B)=>{const W=ee(a[B]);return N.done+=Vt(W,"done"),N.wip+=Vt(W,"wip"),N.bugged+=Vt(W,"bugged"),N.blocked+=Vt(W,"blocked"),N.todo+=Vt(W,"todo"),N.total+=Vt(W,"total"),N},{done:0,wip:0,bugged:0,blocked:0,todo:0,total:0});$t+=`<tr class="total-row">
    <td>TOTAL</td>
    <td style="text-align:right;">${ot(Bt.done)}</td>
    <td style="text-align:right;">${ot(Bt.wip)}</td>
    <td style="text-align:right;">${ot(Bt.bugged)}</td>
    <td style="text-align:right;">${ot(Bt.blocked)}</td>
    <td style="text-align:right;">${ot(Bt.todo)}</td>
    <td style="text-align:right;">${ot(Bt.total)}</td>
  </tr>`,$t+="</tbody></table>",i.innerHTML=$t}const Jp={Done:"#10b981",Removed:"#475569",Blocked:"#ef4444",Bugged:"#ec4899","In Progress":"#3b82f6","Ready for review":"#6366f1","Ready for test":"#06b6d4","Waiting to INT deploy":"#f59e0b","Waiting to PRD deploy":"#f97316","To Do":"#94a3b8"};function Yp(){const n=(b.movement||[]).filter(k=>k.type==="Bug"),t=b.sprints.length,e=n.length,r=n.filter(k=>k.state==="Done").length,i=n.filter(k=>!["Done","Removed"].includes(k.state)).length,o=n.filter(k=>k.state==="Removed").length,a=e?r/e*100:0;document.getElementById("bugKpis").innerHTML=`
    <div class="kpi"><div class="label">Total Bugs</div><div class="value">${e}</div><div class="hint">Work Item Type = Bug</div></div>
    <div class="kpi"><div class="label">Closed (Done)</div><div class="value" style="color:var(--good-text);">${r}</div><div class="hint">${a.toFixed(0)}% close rate</div></div>
    <div class="kpi"><div class="label">Open</div><div class="value" style="color:${i>0?"var(--bad-text)":"var(--muted)"};">${i}</div><div class="hint">In Progress / Blocked / RR / etc.</div></div>
    <div class="kpi"><div class="label">Removed</div><div class="value" style="color:var(--muted);">${o}</div><div class="hint">cancelled / out-of-scope</div></div>
  `;const c=Array.from(new Set(n.map(k=>k.state))),h=["Done","Removed","In Progress","Ready for review","Ready for test","Waiting to INT deploy","Waiting to PRD deploy","To Do","Blocked","Bugged"].filter(k=>c.includes(k)),d=b.sprints,p=h.map((k,F)=>{const H=new Array(t).fill(0);return n.filter(et=>et.state===k).forEach(et=>{H[et.sprint-1]+=1}),{label:k,data:H,backgroundColor:Jp[k]||"#64748b",borderRadius:4,stack:"a"}});ks&&ks.destroy(),ks=new Chart(document.getElementById("bugTrendChart"),{type:"bar",data:{labels:d,datasets:p},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0,axis:"xy"},scales:{x:{stacked:!0,grid:{color:K.grid},ticks:{color:K.tick}},y:{stacked:!0,beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick,precision:0}}},plugins:{legend:{position:"bottom",labels:{color:K.tick,boxWidth:10,font:{size:11}}},stackTotals:{enabled:!0,decimals:0},tooltip:{callbacks:{title:k=>k.length?`${k[0].dataset.label} · ${k[0].label}`:"",label:k=>`${k.parsed.y} ${k.parsed.y===1?"bug":"bugs"}`}}}}}),document.getElementById("bugTrendTag").textContent=`${h.length} states · ${e} bugs across ${t} sprints`;const g={};n.forEach(k=>{g[k.person]=g[k.person]||{done:0,open:0,removed:0,total:0},g[k.person].total++,k.state==="Done"?g[k.person].done++:k.state==="Removed"?g[k.person].removed++:g[k.person].open++});const E=Object.keys(g).sort((k,F)=>g[F].total-g[k].total);document.getElementById("bugPersonTag").textContent=`${E.length} people · ${e} bugs`;let S='<table><thead><tr><th>Person</th><th style="text-align:right">Done</th><th style="text-align:right">Open</th><th style="text-align:right">Removed</th><th style="text-align:right">Total</th><th style="text-align:right">Close %</th></tr></thead><tbody>';E.forEach(k=>{const F=g[k],H=F.total?F.done/F.total*100:0;S+=`<tr>
      <td style="font-weight:500;">${k}${Vi(k)}</td>
      <td style="text-align:right; color:var(--good-text); font-weight:600;">${F.done}</td>
      <td style="text-align:right; ${F.open?"color:var(--bad-text); font-weight:600;":""}">${F.open||""}</td>
      <td style="text-align:right; color:var(--muted);">${F.removed||""}</td>
      <td style="text-align:right; font-weight:600;">${F.total}</td>
      <td style="text-align:right; color:var(--muted);">${H.toFixed(0)}%</td>
    </tr>`}),S+="</tbody></table>",document.getElementById("bugPersonTable").innerHTML=S;const C={};n.forEach(k=>{C[k.project]=C[k.project]||{done:0,open:0,removed:0,total:0},C[k.project].total++,k.state==="Done"?C[k.project].done++:k.state==="Removed"?C[k.project].removed++:C[k.project].open++});const V=Object.keys(C).sort((k,F)=>C[F].total-C[k].total);document.getElementById("bugProjectTag").textContent=`${V.length} projects · ${e} bugs`;let D='<table><thead><tr><th>Project</th><th style="text-align:right">Done</th><th style="text-align:right">Open</th><th style="text-align:right">Removed</th><th style="text-align:right">Total</th><th style="text-align:right">Close %</th></tr></thead><tbody>';V.forEach(k=>{const F=C[k],H=F.total?F.done/F.total*100:0;D+=`<tr>
      <td style="font-weight:500;">${k}</td>
      <td style="text-align:right; color:var(--good-text); font-weight:600;">${F.done}</td>
      <td style="text-align:right; ${F.open?"color:var(--bad-text); font-weight:600;":""}">${F.open||""}</td>
      <td style="text-align:right; color:var(--muted);">${F.removed||""}</td>
      <td style="text-align:right; font-weight:600;">${F.total}</td>
      <td style="text-align:right; color:var(--muted);">${H.toFixed(0)}%</td>
    </tr>`}),D+="</tbody></table>",document.getElementById("bugProjectTable").innerHTML=D}function Zp(){const n=x.statusMetric==="points"?b.statusPersonPts:b.statusPersonCount,t=b.statusLabels.map((i,o)=>tt(Object.values(n).map(a=>a[o]))),e=tt(t),r=b.statusLabels.map((i,o)=>{const a=t[o],c=e?a/e*100:0,h=o===0?"good":o===7||o===8?"bad":o>=1&&o<=5?"warn":"neutral",d=x.statusMetric==="points"?a.toLocaleString(void 0,{maximumFractionDigits:1}):a;return`<div class="kpi"><div class="label">${i}</div><div class="value" style="color:${b.statusColors[o]}">${d}</div><div class="hint"><span class="pill ${h}">${c.toFixed(1)}%</span></div></div>`}).join("");document.getElementById("statusKpis").innerHTML=r}let si=null,Lr=[];function Mr(n){if(!We||n===si)return;si=n,We.data.datasets.forEach(r=>{const i=r.__base;r.backgroundColor=r.data.map((o,a)=>n===null||a===n?i:i+"1a")}),We.update("none");const t=n===null?null:Lr[n]&&Lr[n].n;document.querySelectorAll("#doneTable tbody tr").forEach(r=>{const i=t&&r.dataset.name===t;r.style.background=i?"rgba(99,102,241,0.18)":"",r.style.outline=i?"1px solid #6366f1":""});const e=document.getElementById("statusTag");e&&e.dataset.base&&(e.textContent=t?`${t} only`:e.dataset.base)}function tg(){const n=document.getElementById("statusChart"),t=x.statusView==="person",e=t?x.statusMetric==="points"?b.statusPersonPts:b.statusPersonCount:x.statusMetric==="points"?b.statusProjectPts:b.statusProjectCount,r=Object.entries(e).map(([h,d])=>({n:h,a:d,total:tt(d)})).sort((h,d)=>d.total-h.total);Lr=r,si=null;const i=r.map(h=>h.n),o=b.statusLabels.map((h,d)=>{const p=b.statusColors[d];return{label:h,data:r.map(g=>g.a[d]),backgroundColor:r.map(()=>p),__base:p,borderRadius:4,stack:"a"}});We&&We.destroy(),We=new Chart(n,{type:"bar",data:{labels:i,datasets:o},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0,axis:"xy"},onHover:(h,d)=>{const p=d.length?d[0].index:null;Mr(p)},scales:{x:{stacked:!0,beginAtZero:!0,grid:{color:K.grid},ticks:{color:K.tick}},y:{stacked:!0,grid:{display:!1},ticks:{color:K.tick}}},plugins:{legend:{position:"bottom",labels:{color:K.tick,boxWidth:10,font:{size:11}}},tooltip:{callbacks:{title:h=>h.length?`${h[0].dataset.label} · ${h[0].label}`:"",label:h=>`${(h.parsed.x||0).toLocaleString(void 0,{maximumFractionDigits:2})}`}}}}});const a=`By ${t?"Person":"Project"} · ${xn[x.statusMetric==="points"?"points":"tasks"]}`,c=document.getElementById("statusTag");c.textContent=a,c.dataset.base=a,n.onmouseleave=()=>Mr(null)}function eg(){const n=x.statusView==="person",t=n?x.statusMetric==="points"?b.statusPersonPts:b.statusPersonCount:x.statusMetric==="points"?b.statusProjectPts:b.statusProjectCount,e=Object.entries(t).map(([o,a])=>{const c=tt(a),h=a[0],d=c?h/c:0;return{n:o,a,total:c,done:h,rate:d}}).sort((o,a)=>a.rate-o.rate);let r=`<table><thead><tr><th>${n?"Name":"Project"}</th>${b.statusLabels.map(o=>`<th>${o}</th>`).join("")}<th>Total</th><th>% Done</th><th>Progress</th></tr></thead><tbody>`;e.forEach(o=>{const a=(o.rate*100).toFixed(1),c=n?`<td>${o.n}${Vi(o.n)}</td>`:`<td>${o.n}</td>`;r+=`<tr data-name="${o.n}">${c}${o.a.map((h,d)=>`<td style="color:${h?b.statusColors[d]:"#64748b"}">${qa(h)}</td>`).join("")}<td style="font-weight:600">${qa(o.total)}</td><td>${a}%</td><td><span class="progress"><div style="width:${a}%"></div></span></td></tr>`}),r+="</tbody></table>",document.getElementById("doneTable").innerHTML=r;const i=document.querySelector("#doneTable tbody");i&&(i.addEventListener("mouseover",o=>{const a=o.target.closest("tr[data-name]");if(!a)return;const c=Lr.findIndex(h=>h.n===a.dataset.name);c!==-1&&Mr(c)}),i.addEventListener("mouseleave",()=>Mr(null)))}function ng(){const n=Object.keys(b.points),e=kr.map(a=>({role:a,members:n.filter(c=>te(c)===a)})).filter(a=>a.members.length).map(a=>`<optgroup label="${a.role}">`+a.members.map(c=>`<option value="${c}">${c} · ${a.role}</option>`).join("")+"</optgroup>").join("");document.getElementById("memberSelect").innerHTML='<option value="All">All (no highlight)</option>'+e;const r=Object.entries(b.projectSprint).map(([a,c])=>[a,c.reduce((h,d)=>h+(+d||0),0)]).filter(([,a])=>a>0).sort((a,c)=>c[1]-a[1]),o=`<option value="__all__">🗂️ All Projects · ${r.reduce((a,[,c])=>a+c,0).toLocaleString(void 0,{maximumFractionDigits:1})} pts</option>`+r.map(([a,c])=>`<option value="${a}">${a} · ${c.toLocaleString(void 0,{maximumFractionDigits:1})} pts</option>`).join("");document.getElementById("projDrill").innerHTML=o,x.projDrill||(x.projDrill="__all__"),document.getElementById("projDrill").value=x.projDrill}function rg(n){x.section=n,document.querySelectorAll(".navtab").forEach(e=>e.classList.toggle("active",e.dataset.section===n)),document.querySelectorAll(".section").forEach(e=>e.classList.toggle("active",e.id===`section-${n}`));const t=document.getElementById("staleBanner");if(t&&t.dataset.hasContent==="1"){const e=n!=="people";t.classList.toggle("section-only",e),t.style.display=e?"none":"block"}Nt()}function Nt(){x.section==="overview"?(Hp(),Ic(),wc(),Gp(),Kp()):x.section==="projects"?(Wp(),Tr()):x.section==="bugs"?Yp():x.section==="status"?(Zp(),tg(),eg()):x.section==="logic"&&sg()}function sg(){const t=b.sprints.map((_,I)=>Object.values(b.points).reduce((y,ot)=>y+(ot[I]||0),0)).map((_,I)=>_>0?I+1:null).filter(_=>_!==null),e=t.length?`Sprint ${t[0]}–${t[t.length-1]} (${t.length} sprints loaded)`:"no data",r=tt(Object.values(b.points).map(tt)),i=tt(Object.values(b.tasks).map(tt)),o=tt(Object.values(b.statusPersonPts).map(tt)),a=tt(Object.values(b.statusPersonCount).map(tt)),h=`<div class="card">
    <h3>1 · Filtering Rules <span class="tag">what gets included</span></h3>
    <div class="insights-grid" style="margin-top:8px;">
      <div class="insight">
        <div class="ins-title">Work Item Type</div>
        <div class="ins-value">Task · Bug</div>
        <div class="ins-hint">ตัด Feature · PBI · Epic ออก</div>
      </div>
      <div class="insight info">
        <div class="ins-title">Iteration</div>
        <div class="ins-value">${t.length?`M\\2026\\${t[0]} → M\\2026\\${t[t.length-1]}`:"—"}</div>
        <div class="ins-hint">${e} · auto-refresh ทุก sprint ที่อัปไฟล์</div>
      </div>
      <div class="insight warn">
        <div class="ins-title">Assignee</div>
        <div class="ins-value">required</div>
        <div class="ins-hint">Task ไม่มีคน assign → ข้าม</div>
      </div>
      <div class="insight good">
        <div class="ins-title">Backlog / Out-of-scope</div>
        <div class="ins-value">excluded</div>
        <div class="ins-hint">M\\Backlog · M\\2025\\* · iteration ที่ไม่มี sprint number</div>
      </div>
    </div>
  </div>`,d=`<div class="card" style="margin-top:14px;">
    <h3>2 · Point Counting <span class="tag">Done-only</span></h3>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:8px;">
      <div style="background:rgba(16,185,129,0.08); border:1px solid #10b98155; border-radius:10px; padding:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="width:10px; height:10px; border-radius:2px; background:#10b981;"></span>
          <span style="font-weight:600; color:var(--good-text);">นับ Point</span>
        </div>
        <div style="font-size:13px; color:var(--text); line-height:1.7;">
          เฉพาะ <code style="background:var(--panel-2); border:1px solid var(--border); padding:1px 6px; border-radius:4px; color:var(--accent-text); font-weight:600;">state == "Done"</code>
          เท่านั้นที่บวกเข้า:<br>
          • Total Points / Tasks per person<br>
          • Project × Sprint contribution<br>
          • Person × Project matrix<br>
          • KPIs ในทุก tab (ยกเว้น Status)
        </div>
        <div style="margin-top:10px; padding:8px 10px; background:rgba(0,0,0,0.2); border-radius:6px; font-size:12px;">
          <strong style="color:var(--good-text);">${r.toLocaleString()}</strong> pts ·
          <strong style="color:var(--good-text);">${i}</strong> tasks · Done
        </div>
      </div>
      <div style="background:rgba(148,163,184,0.06); border:1px solid #475569; border-radius:10px; padding:14px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <span style="width:10px; height:10px; border-radius:2px; background:#94a3b8;"></span>
          <span style="font-weight:600; color:var(--text);">ไม่นับ Point</span>
        </div>
        <div style="font-size:13px; color:var(--text); line-height:1.7;">
          งานสถานะอื่น (In Progress, Ready for review/test, Waiting to deploy, To Do, Blocked, Bugged, Removed) →<br>
          • <strong style="color:var(--warn-text);">ไม่บวก</strong> เข้า KPI ใน Overview/People/Projects<br>
          • <strong style="color:#22d3ee;">โชว์ครบ</strong> ใน Status tab (เห็น pipeline)
        </div>
        <div style="margin-top:10px; padding:8px 10px; background:rgba(0,0,0,0.2); border-radius:6px; font-size:12px;">
          <strong style="color:var(--text);">${o.toLocaleString(void 0,{maximumFractionDigits:1})}</strong> pts ·
          <strong style="color:var(--text);">${a}</strong> tasks · all statuses
        </div>
      </div>
    </div>
  </div>`,p=_=>_===0?"good":_===7||_===8?"bad":_>=1&&_<=5?"warn":"neutral",g=b.statusLabels.map((_,I)=>{const y=b.statusColors[I],ot=p(I);return`<tr>
      <td style="padding:10px 12px; text-align:left; border-bottom:1px solid var(--border);">
        <span style="display:inline-block; width:10px; height:10px; border-radius:2px; background:${y}; margin-right:10px; vertical-align:middle;"></span>
        <span style="font-weight:500; color:var(--text);">${_}</span>
      </td>
      <td style="padding:10px 12px; text-align:center; border-bottom:1px solid var(--border);">
        <span style="font-family:monospace; font-size:11px; color:var(--muted);">${y}</span>
      </td>
      <td style="padding:10px 12px; text-align:center; border-bottom:1px solid var(--border);">
        <span class="pill ${ot}">${ot}</span>
      </td>
      <td style="padding:10px 12px; text-align:right; border-bottom:1px solid var(--border); color:${I===0?"var(--good-text)":"#64748b"}; font-weight:${I===0?600:400};">${I===0?"✓ Counted":"—"}</td>
    </tr>`}).join(""),E=`<div class="card" style="margin-top:14px;">
    <h3>3 · Status Buckets <span class="tag">${b.statusLabels.length} statuses · ตรงตาม Azure 100%</span></h3>
    <div style="overflow:auto; border-radius:10px; border:1px solid var(--border); margin-top:8px;">
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="background:var(--panel-2);">
            <th style="padding:10px 12px; text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Status</th>
            <th style="padding:10px 12px; text-align:center; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Color</th>
            <th style="padding:10px 12px; text-align:center; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Pill</th>
            <th style="padding:10px 12px; text-align:right; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); font-weight:600;">Counts in KPI?</th>
          </tr>
        </thead>
        <tbody>${g}</tbody>
      </table>
    </div>
  </div>`,C=[{name:"NCSWT",rules:["HCA / NCSWT / NSCWT prefix","scholarship modules (Student, Fund Type, Fund Allocation, Academic)"]},{name:"Gift-Card-2026",rules:["HCA Gift Card / Top-up"]},{name:"Event-Registration-2026",rules:["HCA Event Registration"]},{name:"P2CR2",rules:["ChangHP P2-CR2 / Coupon / Key account / Personal assistant"]},{name:"Chang HomePro",rules:["Chang Homepro / Chang HP (other)"]},{name:"InsureTech",rules:["IST: / Insurtech / [Insurtech] prefix"]},{name:"Village Fund",rules:["VFM / VF- / VFM-PC prefix"]},{name:"VFM-MA_25",rules:["VFM-MA_25 (specific)"]},{name:"MorePOS",rules:["MorePOS / MPOS / POS:"]},{name:"Breaking Par",rules:["BKP prefix"]},{name:"Merlin",rules:["Merlin / Merlin POC / Merlin MVP / Merin"]},{name:"Gamesmith",rules:["Gamesmith (anywhere)"]},{name:"khaojai it",rules:["khaojai / Khojai"]},{name:"AdelphiISRP",rules:["Adelphi / PAM01"]},{name:"Ship360EXP",rules:["Ship360 / Ship 360"]},{name:"POC",rules:["Thai Alexa / MoreChange / Maggie POC / ADO POC"]},{name:"2026-1",rules:["Hatyai / HatYai (Hatyai project)"]},{name:"Andaman Phuket",rules:["Vana Nava / Andaman"]},{name:"Other singles",rules:["Zleep, GENCO, MeApp, OEG, Seree Golf, Market Village, Monty, AI, Campaign-Accumulate-2025, Additional Requirement"]},{name:"Internal/Ops",rules:["Fallback: meetings, year review, recruitment, research, Morestudio internal, generic ops"]}].map(_=>`
    <div style="background:var(--panel-2); border-radius:10px; padding:12px 14px; border-left:3px solid var(--accent);">
      <div style="font-weight:600; color:var(--accent-text); font-size:13px; margin-bottom:6px;">${_.name}</div>
      <div style="font-size:12px; color:var(--muted); line-height:1.5;">
        ${_.rules.map(I=>`• ${I}`).join("<br>")}
      </div>
    </div>`).join(""),V=`<div class="card" style="margin-top:14px;">
    <h3>4 · Project Mapping <span class="tag">${Object.keys(b.projectSprint).length} projects · prefix-based rules</span></h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px; margin-top:8px;">
      ${C}
    </div>
  </div>`,D=kr.map(_=>({role:_,members:Object.keys(_r).filter(I=>_r[I]===_)})).filter(_=>_.members.length),k=D.map(_=>{const I=Di[_.role];return`<div style="background:var(--panel-2); border-radius:10px; padding:14px; border-left:4px solid ${I};">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <span style="font-weight:700; color:${I}; font-size:14px;">${_.role}</span>
        <span style="font-size:11px; color:var(--muted);">${_.members.length} ${_.members.length===1?"person":"people"}</span>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${_.members.map(y=>`<span style="background:${I}22; color:${I}; border:1px solid ${I}55; padding:3px 10px; border-radius:999px; font-size:12px; font-weight:500;">${y}</span>`).join("")}
      </div>
    </div>`}).join(""),H=`<div class="card" style="margin-top:14px;">
    <h3>5 · Team Roles <span class="tag">${Object.keys(_r).length} people · ${D.length} roles</span></h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-top:8px;">
      ${k}
    </div>
  </div>`,et=[{icon:"📊",title:"Workload",rule:"รวม Story Points & Tasks ทั้งปี + นับจำนวน sprint ที่มี activity + Avg pts/task",flag:"warn เมื่อ total points = 0"},{icon:"✅",title:"Done Rate",rule:"donePts / allStatusPts × 100 (จาก status sheet)",flag:"good ≥ 70% · info 40–69% · warn < 40%"},{icon:"📈",title:"Recent Trend",rule:"เทียบผลรวมของ 3 sprints ล่าสุด (latest-2 ถึง latest) กับ 3 sprints ก่อนหน้า (latest-5 ถึง latest-3)",flag:"good = เพิ่มขึ้น · warn = ลดลง > 40% · info = ลดลง ≤ 40% หรือคงที่"},{icon:"🏔️",title:"Peak Sprint",rule:"หา sprint ที่ได้ points สูงสุดทั้งปี",flag:"info เสมอ (ถ้ามี activity)"},{icon:"🎯",title:"Top Projects",rule:"เลือก 3 project ที่ contribute points มากที่สุด (ตัดที่ 0)",flag:"warn ถ้าไม่มี project"},{icon:"⚠️",title:"Risk Flags",rule:"แสดงเมื่อ Blocked > 0 หรือ Bugged > 0 (จำนวน tasks)",flag:"bad เสมอ (ถ้าเจอ)"},{icon:"🔄",title:"Work in Progress",rule:"รวม In Progress + Ready for review + Ready for test + Waiting to INT/PRD deploy",flag:"warn > 15 · info ≤ 15"},{icon:"📝",title:"Backlog (To Do)",rule:"จำนวน tasks สถานะ To Do",flag:"warn > 20 · info ≤ 20"},{icon:"⏰",title:"Stale",rule:"ไม่มี task assigned (ทุก state) ทั้งใน sprint ล่าสุด (latest) และ sprint ก่อนหน้า (latest-1)",flag:"bad · สอดคล้องกับ warning banner ด้านบน"},{icon:"👤",title:"Role Observation",rule:"ข้อความสรุปตาม role ของบุคคล (Dev / Designer / BA / Tester / PC / CEO) + threshold ของ points รวมทั้งปี",flag:"info เสมอ"}],_t=et.map(_=>`
    <div style="background:var(--panel-2); border-radius:10px; padding:12px 14px; border-left:3px solid var(--accent-2);">
      <div style="font-weight:600; color:var(--accent-text); font-size:13px; margin-bottom:6px;">${_.icon} ${_.title}</div>
      <div style="font-size:12px; color:var(--text); line-height:1.55; margin-bottom:6px;">${_.rule}</div>
      <div style="font-size:11px; color:var(--muted);"><strong style="color:var(--warn-text);">Flag:</strong> ${_.flag}</div>
    </div>`).join(""),nt=`<div class="card" style="margin-top:14px;">
    <h3>6 · People · 🔍 Insights criteria <span class="tag">${et.length} rules · auto per person</span></h3>
    <div style="font-size:13px; color:var(--muted); margin:4px 0 12px;">
      เกณฑ์ที่ใช้คำนวณการ์ด Insight แต่ละใบในหน้า <strong style="color:var(--text);">People</strong> (แสดงเฉพาะเมื่อเลือก person)
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px;">
      ${_t}
    </div>
    <div style="margin-top:12px; padding:10px 12px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:8px; font-size:12px; color:var(--warn-text);">
      <strong>Stale rule (สอดคล้องกับ warning banner):</strong> "sprint ล่าสุด" ใช้ <strong>ปฏิทิน sprint</strong> (SPRINT_DATES) เทียบกับวัน snapshot (${yc}) ไม่ใช่ sprint ที่ไกลที่สุดที่มี task assigned. ตรวจ 2 sprint ย้อนหลัง (latest-1, latest). ถ้าคน ๆ นั้น <strong>ไม่มี task assigned เลย</strong> (<em>นับทุก state</em>) ทั้งสอง sprint → ถือว่า <strong>ไม่พบ task งานเกิน 2 sprints</strong>. เกณฑ์นี้ไม่ลงโทษคนที่มีงาน In Progress / Waiting to deploy / Blocked และไม่ treat sprint ที่ยังมาไม่ถึงเป็น "ปัจจุบัน"
    </div>
  </div>`,w=`<div style="background:linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.05)); border:1px solid var(--border); border-radius:14px; padding:20px 24px; margin-bottom:14px;">
    <h2 style="margin:0; font-size:20px; color:var(--text); font-weight:700;">Methodology &amp; Logic</h2>
    <div style="color:var(--muted); font-size:13px; margin-top:6px;">วิธีคำนวณตัวเลขในแดชบอร์ด · refresh ทุกครั้งที่อัปไฟล์ CSV ใหม่</div>
  </div>`,m=[{icon:"🗂️",title:"Portfolio",rule:"นับ active projects และผลรวม points ใน sprint range ที่เลือก",flag:"info เสมอ"},{icon:"🎯",title:"Concentration (Top-3 Share)",rule:"ผลรวม points ของ 3 projects ใหญ่สุด ÷ total points ใน range",flag:"good < 50% · info 50–69% · warn ≥ 70% (กระจุก)"},{icon:"🏆",title:"Leader",rule:"Project ที่มี points สูงสุดใน range",flag:"good เสมอ (ถ้ามี)"},{icon:"📈",title:"Rising",rule:"Project ที่ delta = (3 sprints ล่าสุด) − (3 sprints ก่อนหน้า) บวกสูงสุด (ต้องมี yearTotal > 5)",flag:"good"},{icon:"📉",title:"Fading",rule:"Project ที่ delta ลบหนักสุด (ต้องมี prior > 0 และ yearTotal > 10)",flag:"warn"},{icon:"⏰",title:"Stale Projects",rule:"Project ที่มี points ใน range > 0 แต่ 2 sprints สุดท้ายใน range = 0",flag:"bad"},{icon:"⚠️",title:"Risk Projects",rule:"Project ที่มี Blocked หรือ Bugged > 0 (นับจาก status sheet ทั้งปี)",flag:"bad · โชว์ top 3"},{icon:"✅",title:"Best / Lowest Done Rate",rule:"donePts/grandPts × 100 · เฉพาะ project ที่มี grandPts ≥ 30 (ตัด noise)",flag:"best: good ≥ 70% · worst: warn < 40%"},{icon:"📝",title:"Big Backlog",rule:"Project ที่มี tasks สถานะ To Do > 20",flag:"warn · โชว์ top 3"},{icon:"🔄",title:"WIP Concentration",rule:"Project ที่รวม In Progress + Review/Test + Waiting deploy > 15",flag:"info · โชว์ top 3"}],v=m.map(_=>`
    <div style="background:var(--panel-2); border-radius:10px; padding:12px 14px; border-left:3px solid var(--accent-2);">
      <div style="font-weight:600; color:var(--accent-text); font-size:13px; margin-bottom:6px;">${_.icon} ${_.title}</div>
      <div style="font-size:12px; color:var(--text); line-height:1.55; margin-bottom:6px;">${_.rule}</div>
      <div style="font-size:11px; color:var(--muted);"><strong style="color:var(--warn-text);">Flag:</strong> ${_.flag}</div>
    </div>`).join(""),T=`<div class="card" style="margin-top:14px;">
    <h3>7 · Projects · 🔍 Insights criteria <span class="tag">${m.length} rules · auto</span></h3>
    <div style="font-size:13px; color:var(--muted); margin:4px 0 12px;">
      เกณฑ์ที่ใช้คำนวณการ์ด Insight ในหน้า <strong style="color:var(--text);">Projects</strong> (reactive ตาม Sprint Range ที่เลือก)
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px;">
      ${v}
    </div>
    <div style="margin-top:12px; padding:10px 12px; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.3); border-radius:8px; font-size:12px; color:var(--accent-text);">
      <strong>Trend window:</strong> recent = 3 sprints สุดท้ายก่อน latest (inclusive) · prior = 3 sprints ก่อนหน้า · latest = sprint ล่าสุดที่ <em>ทีมใด ๆ</em> มี activity
    </div>
  </div>`;document.getElementById("logicContent").innerHTML=w+h+d+E+V+H+nt+T}function ig(){document.querySelectorAll(".navtab").forEach(n=>n.addEventListener("click",()=>rg(n.dataset.section))),document.getElementById("viewSelect").addEventListener("change",n=>{x.view=n.target.value,Nt()}),document.getElementById("memberSelect").addEventListener("change",n=>{x.highlight=n.target.value,Nt()}),document.getElementById("roleSelect").addEventListener("change",n=>{x.role=n.target.value,Nt()}),document.getElementById("sprintRange").addEventListener("change",n=>{x.range=n.target.value,Nt()}),document.getElementById("chartType").addEventListener("change",n=>{x.chartType=n.target.value,Ic()}),document.getElementById("topSprint").addEventListener("change",n=>{x.topSprint=n.target.value,wc()}),document.getElementById("projSprintRange").addEventListener("change",n=>{x.projRange=n.target.value,Nt()}),document.getElementById("projRole").addEventListener("change",n=>{x.projRole=n.target.value,Nt()}),document.getElementById("projDrill").addEventListener("change",n=>{x.projDrill=n.target.value,Tr()}),document.getElementById("projDrillMetric").addEventListener("change",n=>{x.projDrillMetric=n.target.value,Tr()}),document.getElementById("projDrillStatus").addEventListener("change",n=>{x.projDrillStatus=n.target.value,Tr()}),document.getElementById("statusMetric").addEventListener("change",n=>{x.statusMetric=n.target.value,Nt()}),document.getElementById("statusView").addEventListener("change",n=>{x.statusView=n.target.value,Nt()})}document.getElementById("updated").textContent="Data updated: 25 May 2026";(function(){const t=Object.keys(b.points);let e=-1;for(let h=Math.min(b.sprints.length-1,Bp);h>=0;h--)if(t.some(d=>za(d,h))){e=h;break}const r=document.getElementById("staleBanner");if(e<1){r.style.display="none",r.dataset.hasContent="0";return}r.dataset.hasContent="1";const i=[e-1,e],o=t.filter(h=>i.every(d=>!za(h,d))),a=`Sprint ${i[0]+1}–${i[1]+1}`;if(o.length===0){r.className="stale-banner ok",r.innerHTML=`<span class="stale-icon">✅</span>ทุกคนมี task งานในช่วง <strong>${a}</strong> ที่ผ่านมา`,r.style.display="block";return}const c=o.map(h=>`<span class="stale-chip">${h}${te(h)!=="—"?` · ${te(h)}`:""}</span>`).join("");r.className="stale-banner",r.innerHTML=`<span class="stale-icon">⚠️</span><strong>ไม่พบ task งานเกิน 2 Sprints:</strong> ${c}`,r.style.display="block"})();ng();ig();(function(){const t=document.getElementById("themeToggle");if(!t)return;const e=function(){try{return localStorage.getItem("theme")||"dark"}catch{return"dark"}}();document.getElementById("themeIcon").textContent=e==="light"?"☀️":"🌙",document.getElementById("themeLabel").textContent=e==="light"?"Light":"Dark",t.addEventListener("click",()=>{const r=document.documentElement.getAttribute("data-theme")==="light"?"light":"dark";zp(r==="light"?"dark":"light")})})();Nt();

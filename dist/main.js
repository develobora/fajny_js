!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class r{constructor({name:t,stars:e,license:n}){this.name=t,this.stars=e,this.license=n}get starsInfo(){return this.stars>0?`(${this.stars} *)`:""}toString(){return`${this.name} ${this.starsInfo}`}}const o="https://api.github.com/users/mat3e/repos",s=["ux"],a=({name:t,stargazers_count:e,license:n})=>new r({name:t,stars:e,license:n?n.spdx_id:""});!async function(){(await async function(){try{const t=await fetch(o);if(t.ok)return(await t.json()).filter(t=>!s.includes(t.name)).map(a);throw Error("Response not 200")}catch(t){return console.warn(t),[]}}()).forEach(t=>alert(t))}()}]);
(function(){"use strict";var n={343:function(n,t,e){var r=e(963),o=e(252);const i={id:"app"};function s(n,t,e,r,s,a){const l=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(l)])}var a={name:"App",components:{}},l=e(744);const u=(0,l.Z)(a,[["render",s]]);var c=u,d=e(201),p=e(577);const v=n=>((0,o.dD)("data-v-5c734fbc"),n=n(),(0,o.Cn)(),n),f={class:"wrap"},m=v((()=>(0,o._)("h1",null,"5월 마지막주 영화 예매 순위",-1))),_={class:"movies"},h={class:"rank"},w=["src"],g={class:"detail"},b={class:"tit"},k=v((()=>(0,o._)("br",null,null,-1))),y={class:"rate"},O={class:"num"},z=v((()=>(0,o._)("br",null,null,-1)));function j(n,t,e,r,i,s){const a=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",f,[m,(0,o._)("ul",_,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.movies,(n=>((0,o.wg)(),(0,o.iD)("li",{class:"item",key:n.id},[(0,o._)("span",h,(0,p.zw)(n.id),1),(0,o.Wm)(a,{to:{name:"show",params:{id:n.id}}},{default:(0,o.w5)((()=>[(0,o._)("img",{src:n.poster,class:"poster"},null,8,w)])),_:2},1032,["to"]),(0,o._)("div",g,[(0,o._)("strong",b,(0,p.zw)(n.name),1),k,(0,o._)("span",y,[(0,o.Uk)("예매율 "),(0,o._)("span",O,(0,p.zw)(n.rate),1)]),z,(0,o.Wm)(a,{to:{name:"show",params:{id:n.id}},class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("자세히보기")])),_:2},1032,["to"])])])))),128))])])}var x=e(262),D=e(154),Z={setup(){const n=(0,x.iH)([]),t=(0,d.tv)();return(0,o.bv)((()=>{D.Z.get("/api/movies").then((t=>{n.value=t.data}))})),{movies:n,router:t}}};const H=(0,l.Z)(Z,[["render",j],["__scopeId","data-v-5c734fbc"]]);var T=H;const P={class:"detail"},W=["src"],C=(0,o._)("h2",null,"영화정보",-1),U={class:"info"},L=(0,o._)("dt",null,"감독",-1),M=(0,o._)("dt",null,"출연",-1),$=(0,o._)("dt",null,"러닝타임",-1),A=(0,o._)("h2",null,"줄거리",-1),E=["innerHTML"];function F(n,t,e,r,i,s){const a=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",P,[(0,o._)("h1",null,(0,p.zw)(r.movie.name),1),(0,o._)("img",{src:r.movie.poster,class:"poster"},null,8,W),(0,o._)("section",null,[C,(0,o._)("dl",U,[L,(0,o._)("dd",null,(0,p.zw)(r.movie.director),1),M,(0,o._)("dd",null,(0,p.zw)(r.movie.actors),1),$,(0,o._)("dd",null,(0,p.zw)(r.movie.time),1)])]),(0,o._)("section",null,[A,(0,o._)("p",{innerHTML:r.movie.synopsis,class:"synopsis"},null,8,E)]),(0,o.Wm)(a,{to:{name:"index",params:{id:r.movie.id}},class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("돌아가기")])),_:1},8,["to"])])}var I={setup(){const n=(0,x.iH)({}),t=(0,d.tv)(),e=t.currentRoute.value.params.id;return(0,o.bv)((()=>{D.Z.get(`/api/movies/${e}`).then((t=>{n.value=t.data[0]}))})),{movie:n}}};const K=(0,l.Z)(I,[["render",F]]);var R=K;const Y=(0,d.p7)({history:(0,d.PO)(),routes:[{path:"/",name:"index",component:T},{path:"/:id",name:"show",component:R}]}),q=(0,r.ri)(c);q.config.productionTip=!1,q.config.globalProperties.$http=D.Z,q.use(Y),q.mount("#app")}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return n[r](i,i.exports,e),i.exports}e.m=n,function(){var n=[];e.O=function(t,r,o,i){if(!r){var s=1/0;for(c=0;c<n.length;c++){r=n[c][0],o=n[c][1],i=n[c][2];for(var a=!0,l=0;l<r.length;l++)(!1&i||s>=i)&&Object.keys(e.O).every((function(n){return e.O[n](r[l])}))?r.splice(l--,1):(a=!1,i<s&&(s=i));if(a){n.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=n.length;c>0&&n[c-1][2]>i;c--)n[c]=n[c-1];n[c]=[r,o,i]}}(),function(){e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){var n={143:0};e.O.j=function(t){return 0===n[t]};var t=function(t,r){var o,i,s=r[0],a=r[1],l=r[2],u=0;if(s.some((function(t){return 0!==n[t]}))){for(o in a)e.o(a,o)&&(e.m[o]=a[o]);if(l)var c=l(e)}for(t&&t(r);u<s.length;u++)i=s[u],e.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return e.O(c)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(343)}));r=e.O(r)})();
//# sourceMappingURL=app.dc7b198d.js.map
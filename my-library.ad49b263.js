!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired76b;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired76b=a);var o=a("kfhZi"),c=a("eI9Bk");a("dTADz");var i=a("bpxeT"),s=a("2TvXO");a("7rQOT");var l,u=a("fivgP"),d=a("dIxxU"),f=(i=a("bpxeT"),s=a("2TvXO"),a("7rQOT")),h=a("3likm"),p=document.querySelector(".gallery"),v=(l=e(i)(e(s).mark((function t(n){var r;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,h.fetchGenres)();case 3:r=e.sent.genres,f.Loading.hourglass(),p.insertAdjacentHTML("afterbegin",m(n,r)),f.Loading.remove(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0.message);case 12:case"end":return e.stop()}}),t,null,[[0,9]])}))),function(e){return l.apply(this,arguments)}),m=function(e,t){return'\n      <li class="movieCard">\n              <a data-id="'.concat(e.id,'">\n                  <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500').concat(e.poster_path,'" alt="movieImg" />\n                  <p class="movieCard__info movieCard__title">').concat(g(e.title),'</p>\n                      <p class="movieCard__info movieCard__description">').concat(b(t)," | ").concat(e.release_date.slice(0,4),"</p>\n              </a>\n      </li>\n    ")},g=function(e){return e.length>30?e.slice(0,30)+"...":e},b=function(e){var t=[],n=!0,r=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done);n=!0){var i=o.value;t.push(i.name)}}catch(e){r=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw a}}switch(!0){case t.length>2:return"".concat(t[0],", ").concat(t[1],", other...");case 2===t.length:return"".concat(t[0],", ").concat(t[1]);case 1===t.length:return"".concat(t[0])}},y=a("iNWLi"),_=a("cokon"),w=a("gQOBw"),x=document.querySelector(".header_btn-queue"),T=document.querySelector(".header_btn-watched"),L=document.querySelector(".gallery"),k="ac91775ba29254b7e75060011bf34a90";function C(){return S.apply(this,arguments)}function S(){return(S=e(i)(e(s).mark((function t(){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x.classList.remove("current-btn"),T.classList.add("current-btn"),L.innerHTML="",(0,w.onAuthStateChanged)(y.auth,(function(e){e?(0,_.get)((0,_.child)(y.dbRef,"users/".concat(e.uid,"/watched"))).then((function(e){e.exists()?Object.values(e.val()).forEach((function(e){d.default.get("https://api.themoviedb.org/3/movie/".concat(e,"?api_key=").concat(k,"&language=en-US")).then((function(e){var t=e.data;return v(t)}))})):u.Report.info("No movies in collection now","Add movies to see them here")})).catch((function(e){console.error(e)})):console.log("no user")}));case 4:case"end":return e.stop()}}),t)})))).apply(this,arguments)}T.addEventListener("click",C),C();i=a("bpxeT"),s=a("2TvXO"),d=a("dIxxU"),i=a("bpxeT"),s=a("2TvXO"),f=a("7rQOT"),h=a("3likm");var O=document.querySelector(".gallery"),q=function(){var t=e(i)(e(s).mark((function t(n){var r;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,h.fetchGenres)();case 3:r=e.sent.genres,f.Loading.hourglass(),O.insertAdjacentHTML("afterbegin",A(n,r)),f.Loading.remove(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0.message);case 12:case"end":return e.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}(),A=function(e,t){return'\n      <li class="movieCard">\n              <a data-id="'.concat(e.id,'">\n                  <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500').concat(e.poster_path,'" alt="movieImg" />\n                  <p class="movieCard__info movieCard__title">').concat(E(e.title),'</p>\n                      <p class="movieCard__info movieCard__description">').concat(R(t)," | ").concat(e.release_date.slice(0,4),"</p>\n              </a>\n      </li>\n    ")},E=function(e){return e.length>30?e.slice(0,30)+"...":e},R=function(e){var t=[],n=!0,r=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done);n=!0){var i=o.value;t.push(i.name)}}catch(e){r=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw a}}switch(!0){case t.length>2:return"".concat(t[0],", ").concat(t[1],", other...");case 2===t.length:return"".concat(t[0],", ").concat(t[1]);case 1===t.length:return"".concat(t[0])}},U=(u=a("fivgP"),y=a("iNWLi"),_=a("cokon"),w=a("gQOBw"),document.querySelector(".header_btn-queue")),I=document.querySelector(".header_btn-watched"),M=document.querySelector(".gallery"),N="ac91775ba29254b7e75060011bf34a90";function Q(){return(Q=e(i)(e(s).mark((function t(){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I.classList.remove("current-btn"),U.classList.add("current-btn"),M.innerHTML="",(0,w.onAuthStateChanged)(y.auth,(function(e){e?(0,_.get)((0,_.child)(y.dbRef,"users/".concat(e.uid,"/queue"))).then((function(e){e.exists()?Object.values(e.val()).forEach((function(e){d.default.get("https://api.themoviedb.org/3/movie/".concat(e,"?api_key=").concat(N,"&language=en-US")).then((function(e){var t=e.data;return q(t)}))})):u.Report.info("No movies in collection now","Add movies to see them here")})).catch((function(e){console.error(e)})):console.log("no user")}));case 4:case"end":return e.stop()}}),t)})))).apply(this,arguments)}U.addEventListener("click",(function(){return Q.apply(this,arguments)})),a("jzQFI"),a("2Alfd"),a("1KXgy"),a("6R4lm"),a("5xtVg"),(0,c.smoothscroll)(),window.addEventListener("scroll",o.hideScrollUpBtn)}();
//# sourceMappingURL=my-library.ad49b263.js.map
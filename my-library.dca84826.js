var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=e.parcelRequired76b;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var a=r[e];delete r[e];var n={id:e,exports:{}};return t[e]=n,a.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},e.parcelRequired76b=a);var n=a("9vy3o"),o=a("i6cgS"),s=a("2shzp"),i=a("dSs1Y"),c=a("7zQK0");const l=document.querySelector(".gallery"),d=async e=>{try{const{genres:t}=await(0,c.fetchGenres)();i.Loading.hourglass(),l.insertAdjacentHTML("afterbegin",u(e,t)),i.Loading.remove()}catch(e){console.error(e.message)}},u=(e,t)=>`\n      <li class="movieCard">\n              <a data-id="${e.id}">\n                  <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="movieImg" />\n                  <p class="movieCard__info movieCard__title">${g(e.title)}</p>\n                      <p class="movieCard__info movieCard__description">${m(t)} | ${e.release_date.slice(0,4)}</p>\n              </a>\n      </li>\n    `,g=e=>{if(e.length>30){return e.slice(0,30)+"..."}return e},m=e=>{let t=[];for(let r of e)t.push(r.name);switch(!0){case t.length>2:return`${t[0]}, ${t[1]}, other...`;case 2===t.length:return`${t[0]}, ${t[1]}`;case 1===t.length:return`${t[0]}`}},p=document.querySelector(".header_btn-queue"),v=document.querySelector(".header_btn-watched"),h=document.querySelector(".gallery");async function f(){p.classList.remove("current-btn"),v.classList.add("current-btn"),savedMovies=localStorage.getItem("movieID"),parsedMovies=JSON.parse(savedMovies),h.innerHTML="";for(let e of parsedMovies.watched)try{const{data:t}=await s.default.get(`https://api.themoviedb.org/3/movie/${e}?api_key=ac91775ba29254b7e75060011bf34a90&language=en-US`);d(t)}catch(e){console.error(e.message)}}v.addEventListener("click",f),f();s=a("2shzp"),i=a("dSs1Y"),c=a("7zQK0");const _=document.querySelector(".gallery"),b=async e=>{try{const{genres:t}=await(0,c.fetchGenres)();i.Loading.hourglass(),_.insertAdjacentHTML("afterbegin",y(e,t)),i.Loading.remove()}catch(e){console.error(e.message)}},y=(e,t)=>`\n      <li class="movieCard">\n              <a data-id="${e.id}">\n                  <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="movieImg" />\n                  <p class="movieCard__info movieCard__title">${$(e.title)}</p>\n                      <p class="movieCard__info movieCard__description">${w(t)} | ${e.release_date.slice(0,4)}</p>\n              </a>\n      </li>\n    `,$=e=>{if(e.length>30){return e.slice(0,30)+"..."}return e},w=e=>{let t=[];for(let r of e)t.push(r.name);switch(!0){case t.length>2:return`${t[0]}, ${t[1]}, other...`;case 2===t.length:return`${t[0]}, ${t[1]}`;case 1===t.length:return`${t[0]}`}},S=document.querySelector(".header_btn-queue"),L=document.querySelector(".header_btn-watched"),M=document.querySelector(".gallery");S.addEventListener("click",(async function(){L.classList.remove("current-btn"),S.classList.add("current-btn"),savedMovies=localStorage.getItem("movieID"),parsedMovies=JSON.parse(savedMovies),M.innerHTML="";for(let e of parsedMovies.queue)try{const{data:t}=await s.default.get(`https://api.themoviedb.org/3/movie/${e}?api_key=ac91775ba29254b7e75060011bf34a90&language=en-US`);b(t)}catch(e){console.error(e.message)}})),a("gv2Yj"),a("2mMJL"),a("1oNJL"),a("bTcpz"),a("iVS7T"),(0,n.smoothscroll)(),window.addEventListener("scroll",o.hideScrollUpBtn);
//# sourceMappingURL=my-library.dca84826.js.map
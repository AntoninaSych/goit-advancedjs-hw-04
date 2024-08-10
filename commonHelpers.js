import{a as h,S as g,i as b}from"./assets/vendor-576dab23.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const L="45260330-4aac6e6a6c993f9154e4b36c5",v="https://pixabay.com/api/";let c=1,d="";const f=200;async function y(n,s=1){n!==d?(c=1,d=n):c=s;const o=`${v}?key=${L}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${f}&page=${c}`;try{return(await h.get(o)).data}catch(t){throw console.error("Error fetching images:",t),t}}function w(){c+=1}function P(){c=1}function $(){return d}function S(){return c}let u;function p(n){const s=document.querySelector(".gallery"),o=n.map(t=>`
      <div class="photo-card">
        <a href="${t.largeImageURL}" class="gallery-link">
          <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${t.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${t.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${t.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${t.downloads}
          </p>
        </div>
      </div>
    `).join("");s.insertAdjacentHTML("beforeend",o),u?u.refresh():u=new g(".gallery a",{captionsData:"alt",captionDelay:250})}function m(){document.querySelector(".loader").classList.remove("hidden")}function l(){document.querySelector(".loader").classList.add("hidden")}function i(n){b.error({title:"Error",message:n})}document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("search-form"),s=document.querySelector(".gallery"),o=document.querySelector(".load-more");let t=0;n.addEventListener("submit",async function(e){e.preventDefault();const r=n.querySelector('input[name="searchQuery"]').value.trim();if(r===""){i("Please enter a search query.");return}m(),P(),s.innerHTML="",o.style.display="none";try{const a=await y(r);l(),a.totalHits>0?(p(a.hits),t=Math.ceil(a.totalHits/f),a.totalHits%f===0&&(t-=1),t>1&&(o.style.display="block")):i("Sorry, there are no images matching your search query. Please try again!")}catch{l(),i("An error occurred while fetching images.")}finally{n.reset()}}),o.addEventListener("click",async function(){const e=S();if(e>=t){o.style.display="none",i("We're sorry, but you've reached the end of search results.");return}w(),m(),o.style.display="none";try{const r=await y($(),e+1);l(),p(r.hits),e+1>=t?(o.style.display="none",i("We're sorry, but you've reached the end of search results.")):o.style.display="block"}catch{l(),o.style.display="block",i("An error occurred while fetching more images.")}})});
//# sourceMappingURL=commonHelpers.js.map

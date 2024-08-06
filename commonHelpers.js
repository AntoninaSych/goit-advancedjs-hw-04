import{S as d,i as u}from"./assets/vendor-0fc460d7.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f="45260330-4aac6e6a6c993f9154e4b36c5";async function m(o,n=1,r=12){const s=`https://pixabay.com/api/?key=${f}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${r}&page=${n}`;try{const e=await fetch(s);if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){throw e}}let a;function p(o){const n=document.querySelector(".gallery");n.innerHTML=o.map(r=>`
            <div class="photo-card">
                <a href="${r.largeImageURL}" class="gallery-link">
                    <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${r.likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${r.views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${r.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${r.downloads}
                    </p>
                </div>
            </div>
        `).join(""),a?a.refresh():a=new d(".gallery a")}function y(){document.querySelector(".loader").classList.remove("hidden")}function l(){document.querySelector(".loader").classList.add("hidden")}function c(o){u.error({title:"Error",message:o})}document.addEventListener("DOMContentLoaded",function(){const o=document.getElementById("search-form"),n=document.querySelector(".gallery");o.addEventListener("submit",async function(r){r.preventDefault();const s=o.querySelector('input[name="searchQuery"]').value.trim();if(s===""){c("Please enter a search query.");return}y(),n.innerHTML="";try{const e=await m(s);l(),e.totalHits>0?p(e.hits):c("Sorry, there are no images matching your search query. Please try again!")}catch(e){l(),console.error("Request Failed:",e),c("An error occurred while fetching images.")}finally{o.reset()}})});
//# sourceMappingURL=commonHelpers.js.map

import{$ as o,i as n,S as c}from"./assets/vendor-eae310a5.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&s(t)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();var d="45260330-4aac6e6a6c993f9154e4b36c5";o(document).ready(function(){o("#search-form").on("submit",function(l){l.preventDefault();var i=o('input[name="searchQuery"]').val().trim();if(i===""){n.error({title:"Error",message:"Please enter a search query."});return}o(".gallery").empty(),o(".loader").removeClass("hidden");var a="https://pixabay.com/api/?key="+d+"&q="+encodeURIComponent(i)+"&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1";o.getJSON(a,function(s){if(o(".loader").addClass("hidden"),parseInt(s.totalHits)>0){o.each(s.hits,function(r,t){o(".gallery").append('<div class="photo-card"><a href="'+t.largeImageURL+'" class="gallery-link"><img src="'+t.previewURL+'" alt="'+t.tags+'" loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes</b> '+t.likes+'</p><p class="info-item"><b>Views</b> '+t.views+'</p><p class="info-item"><b>Comments</b> '+t.comments+'</p><p class="info-item"><b>Downloads</b> '+t.downloads+"</p></div></div>")});var e=new c(".gallery a");e.refresh()}else parseInt(s.totalHits)>0||n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3})}).fail(function(s,e,r){o(".loader").addClass("hidden");var t=e+", "+r;console.log("Request Failed: "+t),n.error({title:"Error",message:"An error occurred while fetching images."})})})});
//# sourceMappingURL=commonHelpers.js.map
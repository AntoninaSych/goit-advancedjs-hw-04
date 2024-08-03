import 'izitoast/dist/css/iziToast.min.css';
import '../src/css/loader.css';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import $ from 'jquery';

const API_KEY = '45260330-4aac6e6a6c993f9154e4b36c5';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  const loader = document.getElementById('loader');
  const gallery = document.querySelector('.gallery');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = form.querySelector('input[name="searchQuery"]').value.trim();

    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query.',
        position: 'topRight'
      });
      return;
    }

    loader.classList.remove('hidden'); // Показать спиннер
    gallery.innerHTML = ''; // Очистить галерею

    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        loader.classList.add('hidden'); // Скрыть спиннер
        if (data.totalHits > 0) {
          data.hits.forEach(hit => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
            photoCard.innerHTML = `
              <a href="${hit.largeImageURL}" class="gallery-link">
                <img src="${hit.previewURL}" alt="${hit.tags}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item"><b>Likes</b> ${hit.likes}</p>
                <p class="info-item"><b>Views</b> ${hit.views}</p>
                <p class="info-item"><b>Comments</b> ${hit.comments}</p>
                <p class="info-item"><b>Downloads</b> ${hit.downloads}</p>
              </div>
            `;
            gallery.appendChild(photoCard);
          });
          const lightbox = new SimpleLightbox('.gallery a');
          lightbox.refresh();
        } else {
          iziToast.error({
            title: 'No results',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            timeout: 5000
          });
        }
      })
      .catch(error => {
        loader.classList.add('hidden'); // Скрыть спиннер
        console.error("Request Failed:", error);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while fetching images.',
          position: 'topRight',
          timeout: 5000
        });
      })
      .finally(() => {
        form.reset(); // Сбросить форму, очистить все поля
      });
  });
});

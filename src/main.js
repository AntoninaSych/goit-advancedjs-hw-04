import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader, showError } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.gallery');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = form.querySelector('input[name="searchQuery"]').value.trim();

    if (query === '') {
      showError('Please enter a search query.');
      return;
    }

    showLoader();
    gallery.innerHTML = '';

    try {
      const data = await fetchImages(query);
      hideLoader();
      if (data.totalHits > 0) {
        renderGallery(data.hits);
      } else {
        showError('Sorry, there are no images matching your search query. Please try again!');
      }
    } catch (error) {
      hideLoader();
      console.error("Request Failed:", error);
      showError('An error occurred while fetching images.');
    } finally {
      form.reset();
    }
  });
});

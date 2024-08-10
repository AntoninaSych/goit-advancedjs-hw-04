import { fetchImages, incrementPage, resetPage, getCurrentQuery, getCurrentPage } from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader, showError } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.gallery');
  const loadMoreBtn = document.querySelector('.load-more');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = form.querySelector('input[name="searchQuery"]').value.trim();

    if (query === '') {
      showError('Please enter a search query.');
      return;
    }

    showLoader();
    resetPage(); // Сбрасываем страницу до начального значения
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none'; // Скрываем кнопку перед новым поиском

    try {
      const data = await fetchImages(query);
      hideLoader();

      if (data.totalHits > 0) {
        renderGallery(data.hits);

        // Отображаем кнопку "Load more", если найдено больше изображений, чем на одной странице
        if (data.totalHits > 15) {
          loadMoreBtn.style.display = 'block';
        }
      } else {
        showError('Sorry, there are no images matching your search query. Please try again!');
      }
    } catch (error) {
      hideLoader();
      showError('An error occurred while fetching images.');
    } finally {
      form.reset();
    }
  });

  loadMoreBtn.addEventListener('click', async function() {
    incrementPage(); // Увеличиваем номер страницы
    showLoader();

    try {
      const data = await fetchImages(getCurrentQuery(), getCurrentPage()); // Используем текущие query и page
      hideLoader();
      renderGallery(data.hits);

      // Вычисляем общее количество страниц
      const totalPages = Math.ceil(500 / 15); // totalHits ограничено 500

      // Если достигли последней страницы, скрываем кнопку "Load more"
      if (getCurrentPage() >= totalPages) {
        loadMoreBtn.style.display = 'none';
        showError("We're sorry, but you've reached the end of search results.");
      }
    } catch (error) {
      hideLoader();
      showError('An error occurred while fetching more images.');
    }
  });
});

import { fetchImages, incrementPage, resetPage, getCurrentQuery, getCurrentPage, perPage } from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader, showError } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.gallery');
  const loadMoreBtn = document.querySelector('.load-more');

  let totalPages = 0;

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = form.querySelector('input[name="searchQuery"]').value.trim();

    if (query === '') {
      showError('Please enter a search query.');
      return;
    }

    showLoader(); // Показать спиннер
    resetPage(); // Сброс страницы до начального значения
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none'; // Скрываем кнопку перед новым поиском

    try {
      const data = await fetchImages(query);
      hideLoader(); // Скрыть спиннер

      if (data.totalHits > 0) {
        renderGallery(data.hits);

        // Определяем общее количество страниц
        totalPages = Math.ceil(data.totalHits / perPage);

        // Корректируем totalPages, если totalHits кратно perPage
        if (data.totalHits % perPage === 0) {
          totalPages -= 1;
        }

        // Отображаем кнопку "Load more", если найдено больше изображений, чем на одной странице
        if (totalPages > 1) {
          loadMoreBtn.style.display = 'block';
        }
      } else {
        showError('Sorry, there are no images matching your search query. Please try again!');
      }
    } catch (error) {
      hideLoader(); // Скрыть спиннер
      showError('An error occurred while fetching images.');
    } finally {
      form.reset();
    }
  });

  loadMoreBtn.addEventListener('click', async function() {
    const currentPage = getCurrentPage();

    if (currentPage >= totalPages) {
      // Если текущая страница уже равна или больше общего количества страниц
      loadMoreBtn.style.display = 'none';
      showError("We're sorry, but you've reached the end of search results.");
      return;
    }

    incrementPage(); // Увеличиваем номер страницы
    showLoader(); // Показать спиннер
    loadMoreBtn.style.display = 'none'; // Скрыть кнопку

    try {
      const data = await fetchImages(getCurrentQuery(), currentPage + 1);
      hideLoader(); // Скрыть спиннер
      renderGallery(data.hits);

      if (currentPage + 1 >= totalPages) {
        loadMoreBtn.style.display = 'none';
        showError("We're sorry, but you've reached the end of search results.");
      } else {
        loadMoreBtn.style.display = 'block'; // Показать кнопку для загрузки следующей страницы
      }
    } catch (error) {
      hideLoader(); // Скрыть спиннер
      loadMoreBtn.style.display = 'block'; // Вернуть кнопку в случае ошибки
      showError('An error occurred while fetching more images.');
    }
  });
});

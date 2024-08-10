import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  // Генерируем HTML-код для новых изображений
  const markup = images.map(image => {
    return `
      <div class="photo-card">
        <a href="${image.largeImageURL}" class="gallery-link">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${image.downloads}
          </p>
        </div>
      </div>
    `;
  }).join('');

  // Добавляем новый контент к существующему
  gallery.insertAdjacentHTML('beforeend', markup);

  // Инициализируем или обновляем SimpleLightbox для галереи
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  }
}
export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('hidden');
}


export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

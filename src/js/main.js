var API_KEY = '45260330-4aac6e6a6c993f9154e4b36c5';

$(document).ready(function() {
  $('#search-form').on('submit', function(event) {
    event.preventDefault();
    var query = $('input[name="searchQuery"]').val().trim();
    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query.'
      });
      return;
    }

    $('.gallery').empty();
    $('.loader').removeClass('hidden');  // Показать индикатор загрузки

    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(query) + "&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1";

    $.getJSON(URL, function(data) {
      $('.loader').addClass('hidden');  // Скрыть индикатор загрузки
      if (parseInt(data.totalHits) > 0) {
        $.each(data.hits, function(i, hit) {
          $('.gallery').append(
            '<div class="photo-card">' +
            '<a href="' + hit.largeImageURL + '" class="gallery-link">' +
            '<img src="' + hit.previewURL + '" alt="' + hit.tags + '" loading="lazy" />' +
            '</a>' +
            '<div class="info">' +
            '<p class="info-item"><b>Likes</b> ' + hit.likes + '</p>' +
            '<p class="info-item"><b>Views</b> ' + hit.views + '</p>' +
            '<p class="info-item"><b>Comments</b> ' + hit.comments + '</p>' +
            '<p class="info-item"><b>Downloads</b> ' + hit.downloads + '</p>' +
            '</div>' +
            '</div>'
          );
        });
        // Инициализация или обновление SimpleLightbox
        var lightbox = new SimpleLightbox('.gallery a', { /* опции */ });
        lightbox.refresh();
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!'
        });
      }
    }).fail(function(jqxhr, textStatus, error) {
      $('.loader').addClass('hidden');  // Скрыть индикатор загрузки
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images.'
      });
    });
  });
});

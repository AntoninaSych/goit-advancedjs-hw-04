$.getJSON(URL, function(data) {
  $('.loader').addClass('hidden');
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
    var lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  } else {
    iziToast.error({
      title: 'No results',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      timeout: 5000
    });
  }
}).fail(function(jqxhr, textStatus, error) {
  $('.loader').addClass('hidden');
  var err = textStatus + ", " + error;
  console.log("Request Failed: " + err);
  iziToast.error({
    title: 'Error',
    message: 'An error occurred while fetching images.',
    position: 'topRight',
    timeout: 5000
  });
});

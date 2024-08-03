var API_KEY = '45260330-4aac6e6a6c993f9154e4b36c5';
var query = 'red roses';
var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(query) + "&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1";

$.getJSON(URL, function(data) {
  if (parseInt(data.totalHits) > 0) {
    $.each(data.hits, function(i, hit) {
      console.log(hit.pageURL);
      // Дополнительно: Вывод информации о каждом изображении
      console.log('Preview URL:', hit.previewURL);
      console.log('Likes:', hit.likes);
      console.log('Views:', hit.views);
    });
  } else {
    console.log('No hits');
  }
}).fail(function(jqxhr, textStatus, error) {
  var err = textStatus + ", " + error;
  console.log("Request Failed: " + err);
});

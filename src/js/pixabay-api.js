const API_KEY = '45260330-4aac6e6a6c993f9154e4b36c5';

export async function fetchImages(query, page = 1, perPage = 12) {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

import axios from 'axios';
import { renderWatchedMarkup } from './renderWatchedMarkup';

export { fetchMovieByIdFromStorageWatched };

const API_KEY = 'ac91775ba29254b7e75060011bf34a90';

async function fetchMovieByIdFromStorageWatched() {
  savedMovies = localStorage.getItem('movieID');
  parsedMovies = JSON.parse(savedMovies);
  //   console.log(parsedMovies);

  //   gallery.innerHTML = '';

  for (let movieId of parsedMovies.watched) {
    console.log(
      'fetchMovieByIdFromStorageWatched ~ parsedMovies.watched',
      parsedMovies.watched
    );
    console.log('Here is your movies ID:', movieId);

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      // renderWatchedMarkup(data);
      console.log(data);
      renderWatchedMarkup(data);
      // запускаем функцию один раз, иначе уходит в infinity loop
      //   fetchMovieByIdFromStorageWatched = function () {
      //     return false;
      //   };
    } catch (error) {
      console.error(error.message);
    }
  }
}

fetchMovieByIdFromStorageWatched();

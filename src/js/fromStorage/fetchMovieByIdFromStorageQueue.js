import axios from 'axios';
import { renderQueueMarkup } from './renderQueueMarkup';

const btnQueue = document.querySelector('.header_btn-queue');
const btnWatched = document.querySelector('.header_btn-watched');
const gallery = document.querySelector('.gallery');

const API_KEY = 'ac91775ba29254b7e75060011bf34a90';

btnQueue.addEventListener('click', fetchMovieByIdFromStorageQueue);

async function fetchMovieByIdFromStorageQueue() {
  btnWatched.classList.remove('current-btn');
  btnQueue.classList.add('current-btn');

  savedMovies = localStorage.getItem('movieID');
  parsedMovies = JSON.parse(savedMovies);
  // console.log(parsedMovies);

  gallery.innerHTML = '';

  for (let movieId of parsedMovies.queue) {
    // console.log(
    //   'fetchMovieByIdFromStorageWatched ~ parsedMovies.watched',
    //   parsedMovies.watched
    // );
    // console.log('Here is your movies ID:', movieId);

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      // renderWatchedMarkup(data);
      //   console.log(data);
      renderQueueMarkup(data);
      // запускаем функцию один раз, иначе уходит в infinity loop
      //   fetchMovieByIdFromStorageWatched = function () {
      //     return false;
      //   };
    } catch (error) {
      console.error(error.message);
    }
  }
}

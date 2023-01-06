import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { renderWatchedMarkup } from './renderWatchedMarkup';
import { auth, dbRef } from '../firebase';
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  push,
  update,
} from 'firebase/database';

import { onAuthStateChanged } from 'firebase/auth';

// const myLibrLink = document.querySelector('.header-nav_libr');
const btnQueue = document.querySelector('.header_btn-queue');
const btnWatched = document.querySelector('.header_btn-watched');
const gallery = document.querySelector('.gallery');

const API_KEY = 'ac91775ba29254b7e75060011bf34a90';

// myLibrLink.addEventListener('click', fetchMovieByIdFromStorageWatched);
btnWatched.addEventListener('click', fetchMovieByIdFromStorageWatched);

export { fetchMovieByIdFromStorageWatched };

async function fetchMovieByIdFromStorageWatched() {
  btnQueue.classList.remove('current-btn');
  btnWatched.classList.add('current-btn');

  // const savedMovies = await JSON.parse(getWatched());
  // const parsedMovies = JSON.parse(savedMovies);
  // console.log(parsedMovies);

  gallery.innerHTML = '';

  onAuthStateChanged(auth, user => {
    if (user) {
      get(child(dbRef, `users/${user.uid}/watched`))
        .then(snapshot => {
          if (snapshot.exists()) {
            const savedMovies = Object.values(snapshot.val());
            savedMovies.forEach(element => {
              axios
                .get(
                  `https://api.themoviedb.org/3/movie/${element}?api_key=${API_KEY}&language=en-US`
                )
                .then(({ data }) => renderWatchedMarkup(data));
            });
          } else {
            // console.log('No data available');
            Report.info(
              'No movies in collection now',
              'Add movies to see them here'
            );
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('no user');
    }
  });
}

fetchMovieByIdFromStorageWatched();
//

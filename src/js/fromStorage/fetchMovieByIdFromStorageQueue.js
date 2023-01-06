import axios from 'axios';
import { renderQueueMarkup } from './renderQueueMarkup';
import { Report } from 'notiflix/build/notiflix-report-aio';

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

export { fetchMovieByIdFromStorageQueue };

const btnQueue = document.querySelector('.header_btn-queue');
const btnWatched = document.querySelector('.header_btn-watched');
const gallery = document.querySelector('.gallery');

const API_KEY = 'ac91775ba29254b7e75060011bf34a90';

btnQueue.addEventListener('click', fetchMovieByIdFromStorageQueue);

async function fetchMovieByIdFromStorageQueue() {
  btnWatched.classList.remove('current-btn');
  btnQueue.classList.add('current-btn');

  gallery.innerHTML = '';

  onAuthStateChanged(auth, user => {
    if (user) {
      get(child(dbRef, `users/${user.uid}/queue`))
        .then(snapshot => {
          if (snapshot.exists()) {
            const savedMovies = Object.values(snapshot.val());
            savedMovies.forEach(element => {
              axios
                .get(
                  `https://api.themoviedb.org/3/movie/${element}?api_key=${API_KEY}&language=en-US`
                )
                .then(({ data }) => renderQueueMarkup(data));
            });
          } else {
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

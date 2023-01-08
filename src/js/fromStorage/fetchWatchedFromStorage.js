import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { renderWatchedMarkup } from './renderWatchedMarkup';
import { auth, dbRef } from '../firebase';
import { child, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const gallery = document.querySelector('.gallery');
const API_KEY = 'ac91775ba29254b7e75060011bf34a90';

export { fetchMovieByIdFromStorageWatched };

async function fetchMovieByIdFromStorageWatched() {
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

// fetchMovieByIdFromStorageWatched();
//

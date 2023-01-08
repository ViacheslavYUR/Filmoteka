import { hideScrollUpBtn } from './js/hide-scroll-up-button';
import { smoothscroll } from './js/smoothscroll';
import { hiddenElementsOnMobileVersion } from './js/hideElementsInMobileVersion';
import { fetchMovieByIdFromStorageWatched } from './js/fromStorage/fetchWatchedFromStorage';
import { fetchMovieByIdFromStorageQueue } from './js/fromStorage/fetchMovieByIdFromStorageQueue';

import './js/modalTeam/renderTeam';
import './js/modalTeam/teamModal';
import './js/vanilla';
import './js/modal';
import './js/firebase-library';

smoothscroll();
window.addEventListener('scroll', hideScrollUpBtn);

const btnQueue = document.querySelector('.header_btn-queue');
const btnWatched = document.querySelector('.header_btn-watched');

if (btnWatched.classList.contains('current-btn')) {
  fetchMovieByIdFromStorageWatched();
}

if (btnQueue.classList.contains('current-btn')) {
  fetchMovieByIdFromStorageQueue();
}

btnQueue.addEventListener('click', () => {
  btnWatched.classList.remove('current-btn');
  btnQueue.classList.add('current-btn');
  fetchMovieByIdFromStorageQueue();
});

btnWatched.addEventListener('click', () => {
  btnQueue.classList.remove('current-btn');
  btnWatched.classList.add('current-btn');
  fetchMovieByIdFromStorageWatched();
});

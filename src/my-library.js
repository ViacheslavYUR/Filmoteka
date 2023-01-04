import { hideScrollUpBtn } from './js/hide-scroll-up-button';
import { smoothscroll } from './js/smoothscroll';
// import { renderMarkup } from './js/showTrending/renderTrending';
import { hiddenElementsOnMobileVersion } from './js/hideElementsInMobileVersion';
import { fetchMovieByIdFromStorageWatched } from './js/fromStorage/fetchWatchedFromStorage';
import { fetchMovieByIdFromStorageQueue } from './js/fromStorage/fetchMovieByIdFromStorageQueue';
import storage from './js/storage';

// import './js/pagination/pagination';
import './js/modalTeam/renderTeam';
import './js/modalTeam/teamModal';
import './js/vanilla';
import './js/modal';

smoothscroll();
window.addEventListener('scroll', hideScrollUpBtn);

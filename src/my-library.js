import { smoothscroll } from './js/smoothscroll';
import { hideScrollUpBtn } from './js/hide-scroll-up-button';
import { fetchMovieByIdFromStorageWatched } from './js/fromStorage/fetchWatchedFromStorage';
import { hiddenElementsOnMobileVersion } from './js/hideElementsInMobileVersion';

// import { renderMarkup } from './js/showTrending/renderTrending';
// import './js/pagination/pagination';
import './js/modalTeam/renderTeam';
import './js/modalTeam/teamModal';
import './js/modal';
import './js/vanilla';

smoothscroll();
window.addEventListener('scroll', hideScrollUpBtn);

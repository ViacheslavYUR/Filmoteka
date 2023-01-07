import { hideScrollUpBtn } from './js/hide-scroll-up-button';
import { smoothscroll } from './js/smoothscroll';
import { renderMarkup } from './js/showTrending/renderTrending';
import { hiddenElementsOnMobileVersion } from './js/hideElementsInMobileVersion';
import { handleInputSearchMovie } from './js/inputSearch/inputMovieSearch';
import './js/pagination/pagination';
// import storage from './js/storage';

import './js/modalTeam/teamModal';
import './js/modalTeam/renderTeam';
import './js/vanilla';
import './js/modal';
import './js/firebase';

smoothscroll();
window.addEventListener('scroll', hideScrollUpBtn);

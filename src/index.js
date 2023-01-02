import { hideScrollUpBtn } from './js/hide-scroll-up-button';
import { smoothscroll } from './js/smoothscroll';
import { renderMarkup } from './js/showTrending/renderTrending';
import { hiddenElementsOnMobileVersion } from './js/hideElementsInMobileVersion';
import { handleInputSearchMovie } from './js/inputSearch/inputMovieSearch';
import './js/pagination/pagination';
smoothscroll();
window.addEventListener('scroll', hideScrollUpBtn);

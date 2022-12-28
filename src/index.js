import { hideScrollUpBtn } from './js/hide-scroll-up-button';
import { smoothscroll } from './js/smoothscroll';
import { renderTrending } from './js/showTrending/renderTrending';
// import './js/modal';
import './js/hideElementsInMobileVersion';

smoothscroll();
window.addEventListener('scroll', hideScrollUpBtn);

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MovieApiService from './getAllMovieApi';
import { galleryMarkupСreation } from '../showTrending/renderTrending';
import { fetchGenres } from '../fetchGenres';
import * as tuiPagination from '../pagination/pagination';
import { setVanillaTiltAnimation } from '../vanilla';

export const movieApiService = new MovieApiService();

const refs = {
  searchMovie: document.querySelector('.searchForm'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.searchForm__button'),
  searchQueryInput: document.querySelector('input[name=searchQuery]'),
};

refs.searchMovie.addEventListener('submit', handleInputSearchMovie);
refs.searchQueryInput.addEventListener('input', handleInputSearchCondition);
refs.searchBtn.setAttribute('disabled', 'true');

function handleInputSearchCondition(e) {
  if (e.currentTarget.value.length > 0) {
    refs.searchBtn.removeAttribute('disabled');
    refs.searchQueryInput.removeEventListener(
      'input',
      handleInputSearchCondition
    );
  }
}

export async function handleInputSearchMovie(e) {
  e.preventDefault();
  let searchValue = e.currentTarget.elements.searchQuery.value.trim();

  if (searchValue !== movieApiService.userRequest) {
    movieApiService.resetPage();
  }
  movieApiService.request = searchValue;

  const response = await movieApiService.getMovie(tuiPagination.page);
  const results = response.results;

  tuiPagination.pagination.off(
    'beforeMove',
    tuiPagination.loadMoreTrendingFilms
  );
  tuiPagination.pagination.off(
    'beforeMove',
    tuiPagination.loadMoreFilmsByQuery
  );
  tuiPagination.pagination.on('beforeMove', tuiPagination.loadMoreFilmsByQuery);
  tuiPagination.pagination.reset(movieApiService.totalResults);
  const { genres } = await fetchGenres();

  if (movieApiService.totalResults < 20) {
    tuiPagination.paginationCont.classList.add('tui-pagination--hidden');
  } else {
    tuiPagination.paginationCont.classList.remove('tui-pagination--hidden');
  }

  if (results.length === 0 && window.screen.width > 511) {
    Notify.info('Search result not successful. Enter the correct movie name', {
      position: 'center-top',
      distance: '147px',
      width: '250px',
      fontSize: '14px',
      timeout: 1500,
      showOnlyTheLastOne: true,
      backOverlay: false,
      info: {
        background: '#ff6b01',
        textColor: '#fff',
        childClassName: 'notiflix-notify-info',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-info-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(38,192,211,0.2)',
      },
    });
    return;
  } else if (results.length === 0) {
    Notify.info('Search result not successful. Enter the correct movie name', {
      position: 'right-top',
      width: '250px',
      fontSize: '14px',
      timeout: 1500,
      showOnlyTheLastOne: true,
      backOverlay: false,
      info: {
        background: '#ff6b01',
        textColor: '#fff',
        childClassName: 'notiflix-notify-info',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-info-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(38,192,211,0.2)',
      },
    });
    return;
  }
  clearRender();

  refs.gallery.innerHTML = galleryMarkupСreation(results, genres);
  setVanillaTiltAnimation();
}

function clearRender() {
  refs.gallery.innerHTML = '';
}

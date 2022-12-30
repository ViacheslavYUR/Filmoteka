import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MovieApiService from './getAllMovieApi';

const movieApiService = new MovieApiService();

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
    console.log(e);
  }
}

async function handleInputSearchMovie(e) {
  e.preventDefault();
  movieApiService.request = e.currentTarget.elements.searchQuery.value.trim();

  const response = await movieApiService.getMovie();
  const results = response.results;

  if (results.length === 0) {
    console.log(results);
    Notify.info(
      'Search result not successful. Enter the correct movie name and'
    );
    return;
  }

  clearRender();

  console.log(results);
  // there has to be a markup function
}

function clearRender() {
  refs.gallery.innerHTML = '';
}

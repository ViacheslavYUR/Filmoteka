import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { Loading, Notify } from 'notiflix';
import { fetchTrending } from '../showTrending/fetchTrending';
import { fetchGenres } from '../fetchGenres';
import * as render from '../showTrending/renderTrending';
import { movieApiService } from '../inputSearch/inputMovieSearch';

const PER_PAGE = 20;

const gallery = document.querySelector('.gallery');

const options = {
  totalItems: 0,
  itemsPerPage: PER_PAGE,
  page: 1,
  visiblePages: 5,
  template: {
    page: '<a href="&" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="&" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="&" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export const paginationCont = document.querySelector('.tui-pagination');
export const pagination = new Pagination(paginationCont, options);



export const page = pagination.getCurrentPage();

pagination.on('beforeMove', loadMoreTrendingFilms);

export async function loadMoreTrendingFilms(e) {
  const currentPage = e.page;
  Loading.hourglass();
  try {
    const { results, total_results, total_pages } = await fetchTrending(
      currentPage
    );
    const { genres } = await fetchGenres();
    if (total_results > 0) {
      gallery.innerHTML = render.galleryMarkupСreation(results, genres);
      return;
    }
  } catch (err) {
    Notify.failure(err.message);
    paginationCont.classList.add('js-hidden');
  } finally {
    Loading.remove();
    window.scroll(0, 0);
  }
}

export async function loadMoreFilmsByQuery(e) {
  const currentPage = e.page;
  Loading.hourglass();
  try {
    const { results } = await movieApiService.getMovie(currentPage);
    console.log(results);
    const { genres } = await fetchGenres();
    gallery.innerHTML = await render.galleryMarkupСreation(results, genres);
  } catch (err) {
    Notify.failure(err.message);
    paginationCont.classList.add('js-hidden');
  } finally {
    Loading.remove();
    window.scroll(0, 0);
  }
}


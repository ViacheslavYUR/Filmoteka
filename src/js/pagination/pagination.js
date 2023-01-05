import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { Loading, Notify } from 'notiflix';
import { movieApiService } from '../inputSearch/inputMovieSearch';
import { fetchTrending } from '../showTrending/fetchTrending';
import { fetchGenres } from '../fetchGenres';
import * as render from '../showTrending/renderTrending';

const PER_PAGE = 20;

const gallery = document.querySelector('.gallery');

export const options = {
  totalItems: 0,
  itemsPerPage: PER_PAGE,
  visiblePages: 10,
  page: 1,
  template: {
    page: '<a href="&" class="tui-page-btn page-button">{{page}}</a>',
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

async function loadMoreTrendingFilms(e) {
  const currentPage = e.page;
  try {
    const { results, total_results, total_pages } = await fetchTrending(
      currentPage
    );
    const { genres } = await fetchGenres();
    if (total_results > 0) {
      Loading.hourglass();
      gallery.innerHTML = await render.galleryMarkupСreation(results, genres);
      Loading.remove();
      return;
    }
  } catch (err) {
    Notify.failure(err.message);
    pagination.classList.add('js-hidden');
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
    pagination.classList.add('js-hidden');
    Notify.failure(err.message);
  } finally {
    Loading.remove();
    window.scroll(0, 0);
  }
}

// ------------------- for styles

// const paginationButtons = document.querySelectorAll('a[href*="&"]');
// console.log(paginationButtons)

// paginationBtns.forEach(paginationBtn => {
//   console.log(paginationBtn);
//   paginationBtn.style.borderColor = 'teal';
// });

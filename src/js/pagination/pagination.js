import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { fetchTrending } from '../showTrending/fetchTrending';
import { fetchGenres } from '../fetchGenres';
import * as render from '../showTrending/renderTrending';

console.log(render);

const gallery = document.querySelector('.gallery');

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  page: 1,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const paginationCont = document.querySelector('.tui-pagination');
const pagination = new Pagination(paginationCont, options);

const page = pagination.getCurrentPage();

pagination.on('beforeMove', loadMoreTrendingFilms);

async function loadMoreTrendingFilms(e) {
<<<<<<< Updated upstream
  const currentPage = e.page;
  const { results } = await fetchTrending(currentPage);
  console.log('results ', results);
  const { genres } = await fetchGenres();
  console.log('genres ', genres);
=======
    const currentPage = e.page;
   await fetchTrending(currentPage);
   const { genres } = await fetchGenres();
//    await render.cardGenres(genre_ids, genres);
//    await render.titleSlice(title);
//    await render.galleryMarkupСreation(results, genres);
//    await render.renderMarkup();
  //  await renderMoreTrandingFilms(currentPage);
}

async function renderMoreTrandingFilms(page) {
    try {
        const { results, total_pages, total_results, genres } = await fetchTrending(page);
        gallery.innerHTML=render.galleryMarkupСreation(results, genres);
      
}
>>>>>>> Stashed changes

  gallery.innerHTML = await render.galleryMarkupСreation(results, genres);
}

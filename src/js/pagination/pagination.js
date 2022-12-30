import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { fetchTrending } from '../showTrending/fetchTrending';
import *as render from '../showTrending/renderTrending';

console.log(render)

const gallery= document.querySelector('.gallery');
console.log(gallery)

const options = {
    totalItems: 20000,
    itemsPerPage: 20,
    page:1,
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
            '</a>'
    }
}
const paginationCont= document.querySelector('.tui-pagination');
const pagination = new Pagination(paginationCont, options);

const page = pagination.getCurrentPage();


pagination.on('beforeMove', loadMoreTrendingFilms);


async function loadMoreTrendingFilms(e) {
    const currentPage = e.page;
   await fetchTrending(currentPage);
   await renderMoreTrandingFilms(currentPage);
}

async function renderMoreTrandingFilms(page) {
    try {
        const { results, total_pages, total_results, genres } = await fetchTrending(page);
        gallery.innerHTML=galleryMarkupСreation(results, genres);
      
}

catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}


function galleryMarkupСreation (results, genres)  {
    const markup = results
      .map(
        ({ poster_path, title, id, genre_ids, release_date }) => `
        <li class="movieCard">
                <a data-id="${id}">
                    <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movieImg" />
                    <p class="movieCard__info movieCard__title">${titleSlice(
                      title
                    )}</p>
                        <p class="movieCard__info movieCard__description">${cardGenres(
                          genre_ids,
                          genres
                        )} | ${release_date.slice(0, 4)}</p>
                </a>
        </li>
      `
      )
      .join('');
    return markup;
  };
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchTrending } from './fetchTrending';
import { fetchGenres } from '../fetchGenres';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as tuiPagination from '../pagination/pagination' 

const refs = {
  searchForm: document.querySelector('.searchForm'),
  searchQueryInput: document.querySelector('input[name=searchQuery]'),
  searchBtn: document.querySelector('.searchForm__button'),
  gallery: document.querySelector('.gallery'),
};

export const renderMarkup = async () => {
  try {
    const { page, results, total_pages, total_results } = await fetchTrending();
    const { genres } = await fetchGenres();
    tuiPagination.pagination.reset(total_results)

    if (total_results > 0) {
      Loading.hourglass();

      refs.gallery.innerHTML = galleryMarkupСreation(results, genres);

      Loading.remove();
      return;
    }
    Report.failure('Sorry, some problem happend. Please try again.');
    refs.gallery.innerHTML = '';
  } catch (error) {
    console.error(error.message);
  }
};

export const cardGenres = (genre_ids, genres) => {
  let cardGenresArr = [];

  genre_ids.map(genre_id =>
    genres.map(genre => {
      if (genre.id === genre_id) {
        cardGenresArr.push(genre.name);
      }
    })
  );

  switch (true) {
    case cardGenresArr.length > 2:
      return `${cardGenresArr[0]}, ${cardGenresArr[1]}, other...`;

    case cardGenresArr.length === 2:
      return `${cardGenresArr[0]}, ${cardGenresArr[1]}`;

    case cardGenresArr.length === 1:
      return `${cardGenresArr[0]}`;

    default:
      break;
  }
};

export const titleSlice = title => {
  if (title.length > 30) {
    const titleSliced = title.slice(0, 30) + '...';
    return titleSliced;
  } else {
    return title;
  }
};

export const galleryMarkupСreation = (results, genres) => {
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

renderMarkup();

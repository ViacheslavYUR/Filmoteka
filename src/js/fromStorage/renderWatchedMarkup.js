import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchGenres } from '../fetchGenres';

export { renderWatchedMarkup };

const gallery = document.querySelector('.gallery');

const renderWatchedMarkup = async data => {
  try {
    // const data = await fetchMovieByIdFromStorageWatched();
    // console.log(data);
    const { genres } = await fetchGenres();
    // console.log(genres);
    Loading.hourglass();
    gallery.insertAdjacentHTML(
      'afterbegin',
      watchedGalleryMarkupСreat(data, genres)
    );
    Loading.remove();
  } catch (error) {
    console.error(error.message);
  }
};

const watchedGalleryMarkupСreat = (data, genres) => {
  const markup = `
      <li class="movieCard">
              <a data-id="${data.id}">
                  <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500${
                    data.poster_path
                  }" alt="movieImg" />
                  <p class="movieCard__info movieCard__title">${titleSlice(
                    data.title
                  )}</p>
                      <p class="movieCard__info movieCard__description">${cardGenres(
                        genres
                      )} | ${data.release_date.slice(0, 4)}</p>
              </a>
      </li>
    `;
  return markup;
};

const titleSlice = title => {
  if (title.length > 30) {
    const titleSliced = title.slice(0, 30) + '...';
    return titleSliced;
  } else {
    return title;
  }
};

const cardGenres = genres => {
  let cardGenresArr = [];

  for (let genre of genres) {
    cardGenresArr.push(genre.name);
  }

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

// renderWatchedMarkup();

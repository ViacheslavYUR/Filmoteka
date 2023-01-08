import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchGenres } from '../fetchGenres';
import { setVanillaTiltAnimation } from '../vanilla';

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
    setVanillaTiltAnimation();
    Loading.remove();
  } catch (error) {
    console.error(error.message);
  }
};
function addStubPicture(urlTemplate, poster_path, urlStub) {
  if (poster_path !== null) {
    return urlTemplate + poster_path;
  } else {
    return urlStub;
  }
}

const watchedGalleryMarkupСreat = (data, genres) => {
  const urlStub =
    'http://www.posterterritory.com/wp-content/uploads/2022/02/Nikodem-Pre%CC%A8gowski-717x1024.jpeg';
  const urlTemplate = 'https://image.tmdb.org/t/p/w500';
  const markup = `
      <li class="movieCard">
              <a data-id="${data.id}">
                  <img class="movieCard__image" src="${addStubPicture(
                    urlTemplate,
                    data.poster_path,
                    urlStub
                  )}" alt="movieImg" />
                  <p class="movieCard__info movieCard__title">${titleSlice(
                    data.title
                  )}</p>
                  <div class="movieCard_info-wrapper">
                    <p class="movieCard__info movieCard__description">${cardGenres(
                      genres
                    )} | ${data.release_date.slice(0, 4)}
                    </p>
                    <p class="movieCard__info vote_rating">${data.vote_average.toFixed(
                      1
                    )}</p>
                  </div>
                      
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
      return `${cardGenresArr[0]}, ${cardGenresArr[1]}, other`;

    case cardGenresArr.length === 2:
      return `${cardGenresArr[0]}, ${cardGenresArr[1]}`;

    case cardGenresArr.length === 1:
      return `${cardGenresArr[0]}`;

    default:
      break;
  }
};

// renderWatchedMarkup();

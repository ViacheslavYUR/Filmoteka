import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchTrending } from './fetchTrending';
import { fetchGenres } from '../fetchGenres';

const refs = {
  searchForm: document.querySelector('.searchForm'),
  searchQueryInput: document.querySelector('input[name=searchQuery]'),
  searchBtn: document.querySelector('.searchForm__button'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
};

let page = 1;
let pageLimit = 40;
let lastCard;

const renderMarkup = async () => {
  try {
    const { page, results, total_pages, total_results } = await fetchTrending();

    if (total_results > 0) {
      Loading.hourglass();

      refs.gallery.innerHTML = await galleryMarkupСreation(results);
      if (total_results > pageLimit) {
      }

      Loading.remove();
      return;
    }
    Report.failure('Sorry, some problem happend. Please try again.');
    refs.gallery.innerHTML = '';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
};

const cardGanres = cardGenresArr => {
  switch (true) {
    case cardGenresArr.length > 2:
      return `${cardGenresArr[0]}, ${cardGenresArr[1]}, other...`;

    case cardGenresArr.length === 2:
      return `${cardGenresArr[0]}, ${cardGenresArr[1]}`;

    case cardGenresArr.length === 1:
      return `${arr[0]}`;

    default:
      break;
  }
};

const titleSlice = title => {
  if (title.length > 35) {
    const titleSliced = title.slice(0, 30) + '...';
    return titleSliced;
  } else {
    return title;
  }
};

const galleryMarkupСreation = async results => {
  try {
    const { genres } = await fetchGenres();

    const markup = await results
      .map(({ poster_path, title, id, genre_ids, release_date }) => {
        cardGenresArr = [];

        genre_ids.map(genre_id =>
          genres.map(item => {
            if (item.id === genre_id) {
              cardGenresArr.push(item.name);
            }
          })
        );

        return ` <li class="movieCard">
          <a data-id=${id}>
            <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movieImg" />              
                <p class="movieCard__info movieCard__title">${titleSlice(
                  title
                )}</p>
                <p class="movieCard__info movieCard__description"> 
                  ${cardGanres(cardGenresArr)}
                 | ${release_date.substr(0, 4)}</p>            
          </a> 
        </li>
      `;
      })
      .join('');
    return markup;
  } catch (error) {}
};

renderMarkup();
// const loadMore = async () => {
//   page += 1;
//   Loading.hourglass();

//   try {
//     const { results, total_pages, total_results } = await fetchTrending(page);
//     refs.gallery.insertAdjacentHTML(
//       'beforeend',
//       galleryMarkupСreation(results)
//     );
//     Loading.remove();

//     // if (page * pageLimit >= totalHits) {
//     //   Notify.info("We're sorry, but you've reached the end of search results.");
//     //   return;
//     // }

//     observeLastCard();
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(error.message);
//   }
// };

// const observer = new IntersectionObserver(
//   ([entry], observer) => {
//     if (entry.isIntersecting) {
//       observer.unobserve(entry.target);
//       loadMore();
//     }
//   },
//   { threshold: 0.5 }
// );

// const observeLastCard = () => {
//   lastCard = document.querySelector('.movieCard:last-child');
//   observer.observe(lastCard);
// };

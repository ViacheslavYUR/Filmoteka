import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchTrending } from './fetchTrending';

const refs = {
  searchForm: document.querySelector('.searchForm'),
  searchQueryInput: document.querySelector('input[name=searchQuery]'),
  searchBtn: document.querySelector('.searchForm__button'),
  gallery: document.querySelector('.gallery'),
};

let page = 1;
let pageLimit = 40;
let searchQuery = '';
let gallery;
let lastCard;

const renderMarkup = async () => {
  try {
    const { page, results, total_pages, total_results } = await fetchTrending();

    if (total_results > 0) {
      Loading.hourglass();

      refs.gallery.innerHTML = galleryMarkupСreation(results);

      if (total_results > pageLimit) {
        observeLastCard();
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

renderMarkup();

const galleryMarkupСreation = results => {
  const markup = results
    .map(
      ({ poster_path, title, release_date }) => `
        <li class="movieCard" data-modal-open>
            <article>
                <a>
                    <img class="movieCard__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movieImg" />
                    <div class="movieCard__info">
                        <p class="movieCard__title">${title}</p>
                        <p class="movieCard__description">Drama, Action | ${release_date}</p>
                    </div>
                </a>
            </article>
        </li>
      `
    )
    .join('');
  return markup;
};

const loadMore = async () => {
  page += 1;
  Loading.hourglass();

  try {
    console.log(page);
    const { results, total_pages, total_results } = await fetchTrending(page);
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      galleryMarkupСreation(results)
    );
    Loading.remove();

    // if (page * pageLimit >= totalHits) {
    //   Notify.info("We're sorry, but you've reached the end of search results.");
    //   return;
    // }

    observeLastCard();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
};

const observer = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loadMore();
    }
  },
  { threshold: 0.5 }
);

const observeLastCard = () => {
  lastCard = document.querySelector('.movieCard:last-child');
  observer.observe(lastCard);
};

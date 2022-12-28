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

const setSearchQuery = e => {
  searchQuery = e.target.value.toLowerCase().trim();
  refs.searchQueryInput.value = searchQuery;

  if (searchQuery.length > 0) {
    refs.searchBtn.removeAttribute('disabled');
    refs.searchBtn.addEventListener('click', onSearchBtn);
    return;
  }

  refs.searchBtn.setAttribute('disabled', true);
  refs.searchBtn.removeEventListener('click', onSearchBtn);
};

const onSearchBtn = async () => {
  event.preventDefault();
  refs.searchForm.reset();
  refs.searchBtn.setAttribute('disabled', true);
  refs.searchBtn.removeEventListener('click', onSearchBtn);
  page = 1;

  try {
    const { totalHits, hits } = await fetchImages(`${searchQuery}`, page);

    if (hits.length > 0) {
      Notify.info(`Hooray! We found ${totalHits} images.`);
      Loading.hourglass();
      renderGalleryMarkup(totalHits, searchQuery, galleryMarkupСreation(hits));
      simpleLightboxInit();
      if (totalHits > pageLimit) {
        observeLastCard();
      }
      Loading.remove();
      return;
    }
    Report.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.gallery.innerHTML = '';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
};

// const galleryMarkupСreation = hits => {
//   const markup = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//           <a class="photo-card" href="${largeImageURL}">
//             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item">
//                 <b>Likes:</b> ${likes}.
//               </p>
//               <p class="info-item">
//                 <b>Views:</b> ${views}.
//               </p>
//               <p class="info-item">
//                 <b>Comments:</b> ${comments}.
//               </p>
//               <p class="info-item">
//                 <b>Downloads:</b> ${downloads}.
//               </p>
//             </div>
//           </a>
//       `
//     )
//     .join('');

//   return markup;
// };

// const renderGalleryMarkup = (totalHits, searchQuery, markup) => {
//   const gallaryMarkup = `<h1 class="page-title">Pictures for the search query "${searchQuery}"</h1>
//            <h2 class="page-sub-title">Total found ${totalHits} pcs</h2>${markup}`;
//   refs.gallery.innerHTML = gallaryMarkup;
// };

// const loadMorePics = async () => {
//   page += 1;
//   Loading.hourglass();

//   try {
//     const { totalHits, hits } = await fetchImages(`${searchQuery}`, page);
//     refs.gallery.insertAdjacentHTML('beforeend', galleryMarkupСreation(hits));
//     gallery.refresh();
//     Loading.remove();

//     if (page * pageLimit >= totalHits) {
//       Notify.info("We're sorry, but you've reached the end of search results.");
//       return;
//     }

//     observeLastCard();
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(error.message);
//   }
// };

// const simpleLightboxInit = () => {
//   gallery = new SimpleLightbox('.gallery a');
// };

// const observer = new IntersectionObserver(
//   ([entry], observer) => {
//     if (entry.isIntersecting) {
//       observer.unobserve(entry.target);
//       loadMorePics();
//     }
//   },
//   { threshold: 0.5 }
// );

// const observeLastCard = () => {
//   lastCard = document.querySelector('.photo-card:last-child');
//   observer.observe(lastCard);
// };

refs.searchQueryInput.addEventListener('input', setSearchQuery);

// window.addEventListener('scroll', hideScrollUpBtn);

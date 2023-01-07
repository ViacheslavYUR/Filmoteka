import { fetchMovieCardModal } from './showMovieCardModal/fetchMovieCardModal';
import { renderModalMarkup } from './showMovieCardModal/renderMovieCardModal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    body: document.querySelector('body'),
  };

  refs.openModalBtn.addEventListener('click', onOpenModal);
  refs.modal.addEventListener('click', onBackdropClick);

<<<<<<< Updated upstream
  async function onOpenModal(e) {
    e.preventDefault();
=======
const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  headerBtnQueue: document.querySelector('header_btn-queue'),
  body: document.querySelector('body'),
};
>>>>>>> Stashed changes

    let id;

<<<<<<< Updated upstream
    if (e.target.dataset.id) {
      id = e.target.dataset.id;
=======
async function onOpenModal(e) {
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.remove('backdrop--hidden');
  e.preventDefault();

  let id;

  if (e.target.dataset.id) {
    id = e.target.dataset.id;
  } else {
    id = e.target.parentElement.dataset.id;
  }
  if (!id) {
    return;
  }
  refs.body.classList.add('scroll-hidden');

  try {
    const data = await fetchMovieCardModal(id);
    if (data) {
      Loading.hourglass();
      renderModalMarkup(data);
      Loading.remove();
>>>>>>> Stashed changes
    } else {
      id = e.target.parentElement.dataset.id;
    }
    if (!id) {
      return;
    }

    refs.closeModalBtn.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onEscKeyPress);
    refs.modal.classList.remove('backdrop--hidden');
    refs.body.classList.add('scroll-hidden');

    try {
      const data = await fetchMovieCardModal(id);
      if (data) {
        Loading.hourglass();
        renderModalMarkup(data);
        Loading.remove();
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error.message);
    }
<<<<<<< Updated upstream
  }
=======
  });

  btnWatched.addEventListener('click', () => {
    if (btnWatched.classList.contains('filmoteca-btn--secondary')) {
      onAddToWatchedBtnClick(id);

      // if (window.location.pathname === '/my-library.html') {
      //   fetchMovieByIdFromStorageWatched();
      // }

      Notify.success('Added to watched in Your library');
      btnWatched.textContent = 'Remove from Watched';
      btnWatched.classList.remove('filmoteca-btn--secondary');
      btnWatched.classList.add('filmoteca-btn--primary');
      btnWatched.blur();
    } else {
      onRemoveFromWatchedBtnClick(id);

      // if (window.location.pathname === '/my-library.html') {
      //   fetchMovieByIdFromStorageWatched();
      // }

      Notify.warning('Removed from watched in Your library!');
      btnWatched.textContent = 'Add to Watched';
      btnWatched.classList.add('filmoteca-btn--secondary');
      btnWatched.classList.remove('filmoteca-btn--primary');
      btnWatched.blur();
    }

    btnWatched.removeEventListener('click', () => onAddToWatchedBtnClick(id));
  });

  btnQueue.addEventListener('click', () => {
    if (btnQueue.classList.contains('filmoteca-btn--secondary')) {
      onAddToQueueBtnClick(id);

      // if (window.location.pathname === '/my-library.html') {
      //   fetchMovieByIdFromStorageQueue();
      // }

      Notify.success('Added to queue in Your library');
      btnQueue.textContent = 'Remove from Queue';
      btnQueue.classList.remove('filmoteca-btn--secondary');
      btnQueue.classList.add('filmoteca-btn--primary');
      btnQueue.blur();
    } else {
      onRemoveFromQueueBtnClick(id);

      // if (window.location.pathname === '/my-library.html') {
      //   fetchMovieByIdFromStorageQueue();
      // }

      Notify.warning('Removed from queue in Your library!');
      btnQueue.textContent = 'Add to Queue';
      btnQueue.classList.add('filmoteca-btn--secondary');
      btnQueue.classList.remove('filmoteca-btn--primary');
      btnQueue.blur();
    }
    btnQueue.removeEventListener('click', () => onAddToQueueBtnClick(id, id));
  });
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modal.classList.add('backdrop--hidden');
  refs.body.classList.remove('scroll-hidden');
  document.querySelector('.movieModal__info').innerHTML = '';
  // console.log('Клікнув в close!!!!');
>>>>>>> Stashed changes

  function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.modal.classList.add('backdrop--hidden');
    refs.body.classList.remove('scroll-hidden');
    document.querySelector('.movieModal__info').innerHTML = '';
  }

  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;

    if (isEscKey) {
      onCloseModal();
    }
  }
})();

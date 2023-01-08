import { fetchMovieCardModal } from './showMovieCardModal/fetchMovieCardModal';
import { renderModalMarkup } from './showMovieCardModal/renderMovieCardModal';
import { onAuthStateChanged } from 'firebase/auth';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchMovieByIdFromStorageWatched } from './fromStorage/fetchWatchedFromStorage';
import { fetchMovieByIdFromStorageQueue } from './fromStorage/fetchMovieByIdFromStorageQueue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { child, get } from 'firebase/database';

import {
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
  onRemoveFromWatchedBtnClick,
  onRemoveFromQueueBtnClick,
  auth,
  dbRef,
} from './firebase';

const options = {
  reserveScrollBarGap: true,
};

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  headerBtnQueue: document.querySelector('header_btn-queue'),
  body: document.querySelector('body'),
  gallery: document.querySelector('.gallery'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.modal.addEventListener('click', onBackdropClick);

async function onOpenModal(e) {
  disableBodyScroll(refs.modal, options);
  e.preventDefault();

  let id;

  if (e.target.dataset.id) {
    id = e.target.dataset.id;
  } else {
    id = e.target.parentElement.dataset.id;
  }
  // -----------------поставити вірно
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

  const btnWatched = document.querySelector('#addToWatchedBtn');
  const btnQueue = document.querySelector('#addToQueueBtn');

  onAuthStateChanged(auth, user => {
    if (user) {
      get(child(dbRef, `users/${user.uid}/watched`))
        .then(snapshot => {
          if (snapshot.exists()) {
            if (Object.values(snapshot.val()).includes(id)) {
              btnWatched.textContent = 'Remove from Watched';
              btnWatched.classList.remove('filmoteca-btn--secondary');
              btnWatched.classList.add('filmoteca-btn--primary');
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    if (user) {
      get(child(dbRef, `users/${user.uid}/queue`))
        .then(snapshot => {
          if (snapshot.exists()) {
            if (Object.values(snapshot.val()).includes(id)) {
              // console.log(snapshot.val());
              btnQueue.textContent = 'Remove from Queue';
              btnQueue.classList.remove('filmoteca-btn--secondary');
              btnQueue.classList.add('filmoteca-btn--primary');
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      btnWatched.classList.add('visually-hidden');
      btnQueue.classList.add('visually-hidden');
    }
  });

  btnWatched.addEventListener('click', () => {
    if (btnWatched.classList.contains('filmoteca-btn--secondary')) {
      onAddToWatchedBtnClick(id);
      Notify.success('Added to watched in Your library', {
        position: 'right-bottom',
        timeout: 2000,
      });
      btnWatched.textContent = 'Remove from Watched';
      btnWatched.classList.remove('filmoteca-btn--secondary');
      btnWatched.classList.add('filmoteca-btn--primary');
      btnWatched.blur();
    } else {
      onRemoveFromWatchedBtnClick(id);
      Notify.warning('Removed from watched in Your library!', {
        position: 'right-bottom',
        timeout: 2000,
      });
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
      Notify.success('Added to queue in Your library', {
        position: 'right-bottom',
        timeout: 2000,
      });
      btnQueue.textContent = 'Remove from Queue';
      btnQueue.classList.remove('filmoteca-btn--secondary');
      btnQueue.classList.add('filmoteca-btn--primary');
      btnQueue.blur();
    } else {
      onRemoveFromQueueBtnClick(id);
      Notify.warning('Removed from queue in Your library!', {
        position: 'right-bottom',
        timeout: 2000,
      });
      btnQueue.textContent = 'Add to Queue';
      btnQueue.classList.add('filmoteca-btn--secondary');
      btnQueue.classList.remove('filmoteca-btn--primary');
      btnQueue.blur();
    }
    btnQueue.removeEventListener('click', () => onAddToQueueBtnClick(id, id));
  });
}

export function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modal.classList.add('backdrop--hidden');
  refs.body.classList.remove('scroll-hidden');

  document.querySelector('.movieModal__info').innerHTML = '';
  enableBodyScroll(refs.modal);
  if (
    window.location.href ===
    'https://viacheslavyur.github.io/Filmoteka/my-library.html'
  ) {
    refs.gallery.innerHTML = '';

    const btnQueue = document.querySelector('.header_btn-queue');
    const btnWatched = document.querySelector('.header_btn-watched');

    if (btnWatched.classList.contains('current-btn')) {
      fetchMovieByIdFromStorageWatched();
    }

    if (btnQueue.classList.contains('current-btn')) {
      fetchMovieByIdFromStorageQueue();
    }
  }
}

export function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

export function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

import { fetchMovieCardModal } from './showMovieCardModal/fetchMovieCardModal';
import { renderModalMarkup } from './showMovieCardModal/renderMovieCardModal';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { renderWatchedMarkup } from './fromStorage/renderWatchedMarkup';

import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  push,
  update,
} from 'firebase/database';

import {
  onAddToWatchedBtnClick,
  onAddToQueueBtnClick,
  onRemoveFromWatchedBtnClick,
  onRemoveFromQueueBtnClick,
  auth,
  dbRef,
} from './firebase';

import { onAuthStateChanged } from 'firebase/auth';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.modal.addEventListener('click', onBackdropClick);

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
              // console.log(snapshot.val());
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
      console.log('no user');
    }
  });

  btnWatched.addEventListener('click', () => {
    if (btnWatched.classList.contains('filmoteca-btn--secondary')) {
      onAddToWatchedBtnClick(id);
      btnWatched.textContent = 'Remove from Watched';
      btnWatched.classList.remove('filmoteca-btn--secondary');
      btnWatched.classList.add('filmoteca-btn--primary');
      btnWatched.blur();
    } else {
      onRemoveFromWatchedBtnClick(id);
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
      btnQueue.textContent = 'Remove from Queue';
      btnQueue.classList.remove('filmoteca-btn--secondary');
      btnQueue.classList.add('filmoteca-btn--primary');
      btnQueue.blur();
    } else {
      onRemoveFromQueueBtnClick(id);
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
  document.querySelector('.movieModal__info').innerHTML = '';

  if (window.location.pathname === '/my-library.html') {
    window.location.reload();
  }
  // console.log('Клікнув в close!!!!');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    // console.log('Клікнув в Backdrop!!!!');
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
  // console.log('Нажав в ESC_KEY_CODE!!!!');
}

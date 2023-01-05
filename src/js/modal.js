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

  async function onOpenModal(e) {
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
  }

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

import { fetchMovieCardModal } from './showMovieCardModal/fetchMovieCardModal';
import { renderModalMarkup } from './showMovieCardModal/renderMovieCardModal';

(() => {
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
        renderModalMarkup(data);
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
    document.querySelector('.movieModal__info').innerHTML = '';
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
})();

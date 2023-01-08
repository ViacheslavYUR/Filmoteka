import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('[data-team-modal]'),
    body: document.querySelector('body'),
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);

  const options = {
    reserveScrollBarGap: true,
  };

  function openModal(e) {
    e.preventDefault();
    disableBodyScroll(refs.modal, options);

    refs.modal.classList.remove('backdrop--hidden');
    window.addEventListener('keydown', closeModalOnEsc);
    refs.modal.addEventListener('click', closeModalOnGreyZoneClick);
  }

  function closeModal() {
    enableBodyScroll(refs.modal);
    refs.modal.classList.add('backdrop--hidden');
    window.removeEventListener('keydown', closeModalOnEsc);
    refs.modal.removeEventListener('click', closeModalOnGreyZoneClick);
  }

  function closeModalOnEsc(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  function closeModalOnGreyZoneClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
})();

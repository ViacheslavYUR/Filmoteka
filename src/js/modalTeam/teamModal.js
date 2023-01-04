(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('[data-team-modal]'),
    body: document.querySelector('body'),
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
  
  function openModal(e) {
    e.preventDefault();
    refs.modal.classList.remove('backdrop--hidden');
    refs.body.classList.add('scroll-hidden');
    window.addEventListener('keydown', closeModalOnEsc);
    refs.modal.addEventListener('click', closeModalOnGreyZoneClick);
  }

  function closeModal(){
    refs.modal.classList.add('backdrop--hidden');
    refs.body.classList.remove('scroll-hidden');
    window.removeEventListener('keydown', closeModalOnEsc);
    refs.modal.removeEventListener('click', closeModalOnGreyZoneClick)
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

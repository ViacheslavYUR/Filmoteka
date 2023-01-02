(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('[data-team-modal]'),
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal(){
    refs.modal.classList.toggle('backdrop--hidden');
  }
  
  function openModal(e) {
    e.preventDefault();
    toggleModal();

    window.addEventListener('keydown', closeModalEsc);

    function closeModalEsc(e) {
      if (e.code === 'Escape') {
        toggleModal();
        window.removeEventListener('keydown', closeModalEsc);
      }
    }
  }
})();

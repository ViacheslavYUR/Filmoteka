(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('[data-team-modal]'),
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
  
  function closeModalEsc(e) {
      if (e.code === 'Escape') {
        refs.modal.classList.add('backdrop--hidden')
        window.removeEventListener('keydown', closeModalEsc);
      }
  }
  
  function openModal(e) {
    e.preventDefault();
    refs.modal.classList.remove('backdrop--hidden');
    
    window.addEventListener('keydown', closeModalEsc);  
  }

  function closeModal(){
    refs.modal.classList.add('backdrop--hidden');
    window.removeEventListener('keydown', closeModalEsc);
  }
})();

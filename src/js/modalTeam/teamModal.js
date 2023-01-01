(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-team-modal-open]'),
    closeModalBtn: document.querySelector('[data-team-modal-close]'),
    modal: document.querySelector('[data-team-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal(e) {
    e.preventDefault();
    refs.modal.classList.toggle('backdrop--hidden');
  }

  onKeydownClose();

  function onKeydownClose() {
    if (refs.modal.classList.contains("backdrop--hidden"))
      return;
  
    window.addEventListener('keydown', closeModalEsc);

    function closeModalEsc (e) {
      if (e.code === 'Escape') {
        toggleModal();
        window.removeEventListener('keydown', closeModalEsc);
      }
    }

    window.addEventListener('keydown', onKeydown);

    function onKeydown(e) {
      return console.log(e.code) 
      }
     
  }
  })();

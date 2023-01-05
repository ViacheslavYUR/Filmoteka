const refs = {
  backdrop: document.querySelector('[data-signInModal]'),
  closeModalBtn: document.querySelector('[data-signInModal-close]'),
  loginWithEmailBtn: document.querySelector('#loginWithEmailBtn'),
};

export const closeModalFunc = () => {
  refs.closeModalBtn.addEventListener('click', () =>
    refs.backdrop.classList.add('backdrop--hidden')
  );

  if (refs.backdrop.classList.contains('backdrop--hidden')) {
    closeModalBtn.removeEventListener('click', toggleModal);
  }
};

const hiddenElementsOnMobileVersion = [
  ...document.querySelectorAll('[id = hiddenOnMobile]'),
];

window.addEventListener('resize', () => {
  hiddenElementsOnMobileVersion.map(item => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      item.classList.remove('visually-hidden');
    } else {
      item.classList.add('visually-hidden');
    }
  });
});

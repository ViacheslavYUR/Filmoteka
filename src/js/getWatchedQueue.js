import { getAllMovieApi } from './getAllMovieApi';

const libraryUl = document.querySelector('.header-nav_list');
const libraryBack = document.querySelector('.header-nav_libr');
const watchedBtn = document.querySelector('#header_btn-watched');
const queueBtn = document.querySelector('#header_btn-queue');

const body = document.querySelector('body');
const backdropLibrary = document.querySelector('.backdrop');

const loadToPageWatch = () => {
  if (!JSON.parse(localStorage.getItem('watched'))) {
    return (libraryUl.textContent = '');
  } else return watched.map(watchCard).join('');
};
const loadToPageQueue = () => {
  if (!JSON.parse(localStorage.getItem('queue'))) {
    return (libraryUl.textContent = '');
  } else return queue.map(queueCard).join('');
};
const watched = JSON.parse(localStorage.getItem('watched'));
const queue = JSON.parse(localStorage.getItem('queue'));

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', loadToPageWatch());
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  watchedBtn.classList.toggle('activeBtn');
  queueBtn.classList.remove('activeBtn');
}

function onQueueClick() {
  libraryUl.innerHTML = '';
  libraryUl.insertAdjacentHTML('beforeend', loadToPageQueue());
  libraryUl.classList.remove('visually-hidden');
  libraryBack.classList.add('visually-hidden');
  queueBtn.classList.toggle('activeBtn');
  watchedBtn.classList.remove('activeBtn');
}
///////
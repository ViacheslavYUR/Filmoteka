export let dataStorage = {
  watched: [],
  queue: [],
};
export let watchedText = 'add to Watched';

export function ifModalNotHidden() {
  const btnWatched = document.querySelector('.filmoteca-btn--primary');
  const btnQueue = document.querySelector('.filmoteca-btn--secondary');
  btnWatched.addEventListener('click', setToWatchedStorage);
  btnQueue.addEventListener('click', setToQueueStorage);
}

// По клику на карточку получаем ID фильма и закидываем его в ЛокалСторэдж - ПРОСМОТРЕННЫЕ

function setToWatchedStorage(evt) {
  const moviesFromStorage = localStorage.getItem('movieID');
  if (moviesFromStorage === null) {
    dataStorage.watched.push(evt.target.dataset.id);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    evt.target.textContent = 'Remove from Watched';

    return;
  }
  let parsedMoviesFromStorage = JSON.parse(moviesFromStorage);
  dataStorage = parsedMoviesFromStorage;
  if (!dataStorage.watched.includes(evt.target.dataset.id)) {
    dataStorage.watched.push(evt.target.dataset.id);

    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    evt.target.textContent = 'Remove from Watched';
    return;
  } else {
    evt.target.textContent = 'ADD TO WATCHED';
    const savedMovies = localStorage.getItem('movieID');
    let parsedMovies = JSON.parse(savedMovies);
    const indexMovie = parsedMovies.watched.indexOf(evt.target.dataset.id);
    dataStorage.watched.splice(indexMovie, 1);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
  }
}

// По клику на карточку получаем ID фильма и закидываем его в ЛокалСторэдж - ОЧЕРЕДЬ

function setToQueueStorage(evt) {
  const moviesFromStorageQueue = localStorage.getItem('movieID');

  if (moviesFromStorageQueue === null) {
    dataStorage.queue.push(evt.target.dataset.id);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    return;
  }
  let parsedMoviesFromStorageQueue = JSON.parse(moviesFromStorageQueue);
  dataStorage = parsedMoviesFromStorageQueue;

  if (!dataStorage.queue.includes(evt.target.dataset.id)) {
    dataStorage.queue.push(evt.target.dataset.id);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    evt.target.textContent = 'Remove from Watched';

    return;
  } else {
    evt.target.textContent = 'ADD TO Queue';
    const savedMoviesQueue = localStorage.getItem('movieID');
    let parsedMoviesQueue = JSON.parse(savedMoviesQueue);
    const indexMovie = parsedMoviesQueue.queue.indexOf(evt.target.dataset.id);
    dataStorage.queue.splice(indexMovie, 1);
    try {
      localStorage.setItem('movieID', JSON.stringify(dataStorage));
    } catch (error) {
      console.log(error);
    }
  }
}

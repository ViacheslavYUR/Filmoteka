let dataStorage = {
  watched: [],
  queue: [],
};

export function ifModalNotHidden() {
  const btnWatched = document.querySelector('.filmoteca-btn--primary');
  const btnQueue = document.querySelector('.filmoteca-btn--secondary');
  btnWatched.addEventListener('click', setToWatchedStorage);
  btnQueue.addEventListener('click', setToQueueStorage);
}

// По клику на карточку получаем ID фильма и закидываем его в ЛокалСторэдж - ПРОСМОТРЕННЫЕ

function setToWatchedStorage(evt) {
  // if (evt.target.dataset.id) {

  const moviesFromStorage = localStorage.getItem('movieID');
  let parsedMoviesFromStorage = JSON.parse(moviesFromStorage);
  dataStorage.watched = parsedMoviesFromStorage.watched;

  if (!dataStorage.watched.includes(evt.target.dataset.id)) {
    dataStorage.watched.push(evt.target.dataset.id);
    console.log(evt.target.dataset.id);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    changeBtnTextContent(evt);
    return;
  } else {
    evt.target.textContent = 'ADD TO WATCHED';
    const savedModies = localStorage.getItem('movieID');
    let parsedMovies = JSON.parse(savedModies);
    console.log(parsedMovies.watched);
    const indexMovie = parsedMovies.watched.indexOf(evt.target.dataset.id);
    dataStorage.watched.splice(indexMovie, 1);
    try {
      localStorage.setItem('movieID', JSON.stringify(dataStorage));
    } catch (error) {
      console.log(error);
    }
  }
  // }
}

// По клику на карточку получаем ID фильма и закидываем его в ЛокалСторэдж - ОЧЕРЕДЬ

function setToQueueStorage(evt) {
  if (evt.target.dataset.id) {
    if (dataStorage.queue.includes(evt.target.dataset.id)) {
      return;
    }
    dataStorage.queue.push(evt.target.dataset.id);
  } else {
    if (dataStorage.queue.includes(evt.target.parentElement.dataset.id)) {
      return;
    }
    dataStorage.queue.push(evt.target.parentElement.dataset.id);
  }
  localStorage.setItem('movieID', JSON.stringify(dataStorage));
}

// fetchMovieByIdFromStorageWatched();

export function changeBtnTextContent(evt) {
  evt.target.textContent = 'Remove from Watched';
}

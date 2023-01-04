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
    changeBtnTextContent(evt);
    return;
  }

  let parsedMoviesFromStorage = JSON.parse(moviesFromStorage);
  console.log(
    'setToWatchedStorage ~ parsedMoviesFromStorage',
    parsedMoviesFromStorage
  );
  dataStorage = parsedMoviesFromStorage;

  if (!dataStorage.watched.includes(evt.target.dataset.id)) {
    dataStorage.watched.push(evt.target.dataset.id);

    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    changeBtnTextContent(evt);
    return;
  } else {
    evt.target.textContent = 'ADD TO WATCHED';
    const savedMovies = localStorage.getItem('movieID');
    let parsedMovies = JSON.parse(savedMovies);

    const indexMovie = parsedMovies.watched.indexOf(evt.target.dataset.id);
    dataStorage.watched.splice(indexMovie, 1);
    try {
      localStorage.setItem('movieID', JSON.stringify(dataStorage));
    } catch (error) {
      console.log(error);
    }
  }
}

// По клику на карточку получаем ID фильма и закидываем его в ЛокалСторэдж - ОЧЕРЕДЬ

function setToQueueStorage(evt) {
  const moviesFromStorageQueue = localStorage.getItem('movieID');

  if (moviesFromStorageQueue === null) {
    dataStorage.queue.push(evt.target.dataset.id);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    changeBtnQueueTextContent(evt);
    return;
  }

  let parsedMoviesFromStorageQueue = JSON.parse(moviesFromStorageQueue);
  console.log(
    'setToQueueStorage ~ parsedMoviesFromStorageQueue',
    parsedMoviesFromStorageQueue
  );
  dataStorage = parsedMoviesFromStorageQueue;

  if (!dataStorage.queue.includes(evt.target.dataset.id)) {
    dataStorage.queue.push(evt.target.dataset.id);
    localStorage.setItem('movieID', JSON.stringify(dataStorage));
    changeBtnQueueTextContent(evt);
    return;
  } else {
    evt.target.textContent = 'ADD TO Queue';
    const savedMoviesQueue = localStorage.getItem('movieID');
    let parsedMoviesQueue = JSON.parse(savedMoviesQueue);
    const indexMovieQueue = parsedMoviesQueue.queue.indexOf(
      evt.target.dataset.id
    );
    dataStorage.queue.splice(indexMovieQueue, 1);
    try {
      localStorage.setItem('movieID', JSON.stringify(dataStorage));
    } catch (error) {
      console.log(error);
    }
  }
}
//
//
//   if (evt.target.dataset.id) {
//     if (dataStorage.queue.includes(evt.target.dataset.id)) {
//       return;
//     }
//     dataStorage.queue.push(evt.target.dataset.id);
//   } else {
//     if (dataStorage.queue.includes(evt.target.parentElement.dataset.id)) {
//       return;
//     }
//     dataStorage.queue.push(evt.target.parentElement.dataset.id);
//   }
//   localStorage.setItem('movieID', JSON.stringify(dataStorage));
// }

// fetchMovieByIdFromStorageWatched();

function changeBtnTextContent(evt) {
  evt.target.textContent = 'Remove from Watched';


function changeBtnQueueTextContent(evt) {
  evt.target.textContent = 'Remove from Queue';
}

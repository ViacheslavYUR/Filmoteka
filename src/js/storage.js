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
  if (evt.target.dataset.id) {
    if (dataStorage.watched.includes(evt.target.dataset.id)) {
      return;
    }
    dataStorage.watched.push(evt.target.dataset.id);
  } else {
    if (dataStorage.watched.includes(evt.target.parentElement.dataset.id)) {
      return;
    }
    dataStorage.watched.push(evt.target.parentElement.dataset.id);
  }
  localStorage.setItem('movieID', JSON.stringify(dataStorage));
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

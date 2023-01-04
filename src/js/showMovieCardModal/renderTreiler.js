const refs = {
  movieModal: document.querySelector('.movieModal__trailer'),
};

export const renderTrailer = ({ key }) => {
  const markup = `
      <div class="movieModal__video">
<a href="https://www.youtube.com/watch?v=${key}" target="_blank">
  <button type="button">
        <svg class="searchForm__icon">
          <use href="./images/svg/symbol-defs.svg#youtube"></use>
        </svg>  
  </button>
</a>
      </div>
    `;
  document.querySelector('.movieModal__trailer').innerHTML = markup;
};
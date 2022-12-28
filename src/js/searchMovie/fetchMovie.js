/* eslint-disable camelcase */
import axios from 'axios';
export { searchMovie };

const URL = 'https://api.themoviedb.org/3/';

const searchMovie = async (mediaType, timeWindow, page) => {
  let searchParams = new URLSearchParams({
    api_key: 'ac91775ba29254b7e75060011bf34a90',
    // page: `${page}`,
    // per_page: 40,
  });

  try {
    const { data } = await axios.get(
      `${URL}/${mediaType}/${timeWindow}/?${searchParams}`
    );
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
};

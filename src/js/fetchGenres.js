/* eslint-disable camelcase */
import axios from 'axios';

export const fetchGenres = async () => {
  const URL = 'https://api.themoviedb.org/3/genre/movie/list';

  let searchParams = new URLSearchParams({
    api_key: 'ac91775ba29254b7e75060011bf34a90',
  });

  try {
    const { data } = await axios.get(`${URL}?${searchParams}`);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
};

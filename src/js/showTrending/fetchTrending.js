/* eslint-disable camelcase */
import axios from 'axios';
export { fetchTrending };

const URL = 'https://api.themoviedb.org/3/trending';

const fetchTrending = async (page = 1) => {
  const mediaType = 'movie';
  const timeWindow = 'week';

  let searchParams = new URLSearchParams({
    api_key: 'ac91775ba29254b7e75060011bf34a90',
    page: `${page}`,
    // per_page: 40,
  });

  try {
    const { data } = await axios.get(
      `${URL}/${mediaType}/${timeWindow}?${searchParams}`
    );
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
};

// console.log(fetchTrending());

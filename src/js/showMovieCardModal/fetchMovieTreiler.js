import axios from 'axios';

export const fetchMovieTreiler = async id => {
  const mediaType = 'movie';
  const URL = 'https://api.themoviedb.org/3/';

  let searchParams = new URLSearchParams({
    api_key: 'ac91775ba29254b7e75060011bf34a90',
  });

  try {
    const { data } = await axios.get(
      `${URL}${mediaType}/${id}/videos?${searchParams}`
    );
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};


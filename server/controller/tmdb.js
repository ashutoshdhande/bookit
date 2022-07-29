const fetch = require('node-fetch');

exports.fetchTMDB = async (tmdbId) => {
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_KEY}&language=en-US`;

  const response = await fetch(url);

  const result = await response.json();

  return result;
};

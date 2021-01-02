const API_KEY = "dd86470883f1c776f77d487330fa36a3";
const BASE_URL = "//api.themoviedb.org/3";

const CAST_IMG_PREFIX_ID = "mediaInfoCastImg";

const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;
const SEARCH_SHOW_URL = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=`;

const getTitleDetailsURL = (info) =>
  info.movie
    ? `${BASE_URL}/movie/${info.id}?api_key=${API_KEY}`
    : `${BASE_URL}/tv/${info.id}?api_key=${API_KEY}`;

const getTitleCreditsURL = (info) =>
  info.movie
    ? `${BASE_URL}/movie/${info.id}/credits?api_key=${API_KEY}`
    : `${BASE_URL}/tv/${info.id}/credits?api_key=${API_KEY}`;

const getPersonURL = (person) => `${BASE_URL}/person/${person.id}?api_key=${API_KEY}`;

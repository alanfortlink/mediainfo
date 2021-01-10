const Config = {
  API_KEY: "dd86470883f1c776f77d487330fa36a3",
  BASE_URL: "//api.themoviedb.org/3",
};

const Constants = {
  CAST_IMG_PREFIX_ID: "mediaInfoCastImg",

  SEARCH_MOVIE_URL: `${Config.BASE_URL}/search/movie?api_key=${Config.API_KEY}&query=`,
  SEARCH_SHOW_URL: `${Config.BASE_URL}/search/tv?api_key=${Config.API_KEY}&query=`,

  getImdbInfoURL: (info) =>
    `//www.omdbapi.com/?apikey=46189a64&t=${info.name}&plot=full&r=json`,

  getImdbInfoWithIdURL: (info) =>
    `//www.omdbapi.com/?apikey=46189a64&i=${info.id}&plot=full&r=json`,

  getTitleDetailsURLs: (info) => {
    if (info.titleInfo.type == "movie")
      return [`${Config.BASE_URL}/movie/${info.id}?api_key=${Config.API_KEY}`];
    else if (info.titleInfo.type == "tvshow") {
      const [season, episode] = info.titleInfo.extra
        .replace("S", "")
        .replace("E", "")
        .split(":");
      return [
        `${Config.BASE_URL}/tv/${info.id}?api_key=${Config.API_KEY}`,
        `${Config.BASE_URL}/tv/${info.id}/season/${season}/episode/${episode}?api_key=${Config.API_KEY}`,
        `${Config.BASE_URL}/tv/${info.id}/season/${season}/episode/${episode}/external_ids?api_key=${Config.API_KEY}`,
      ];
    } else
      return [`${Config.BASE_URL}/movie/${info.id}?api_key=${Config.API_KEY}`];
  },

  getTitleCreditsURL: (info) =>
    info.titleInfo.type == "movie"
      ? `${Config.BASE_URL}/movie/${info.id}/credits?api_key=${Config.API_KEY}`
      : `${Config.BASE_URL}/tv/${info.id}/credits?api_key=${Config.API_KEY}`,

  getPersonURL: (person) =>
    `${Config.BASE_URL}/person/${person.id}?api_key=${Config.API_KEY}`,
};

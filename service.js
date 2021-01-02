const Service = {
  getTitleWithInfo: (titleInfo) => {
    // TODO: Use titleInfo.extra to get specific tv show episode.
    const url =
      (titleInfo.movie
        ? Constants.SEARCH_MOVIE_URL
        : Constants.SEARCH_SHOW_URL) + titleInfo.title;

    return new Promise((resolve, reject) => {
      $.get(url, (data) => {
        if (data.results.length == 0) reject("Title not found");
        else resolve(data.results[0]);
      });
    });
  },

  getTitleDetails: (info) => {
    // TODO: How to get the error from $.get
    // Send it to resolve (currently '_').
    return new Promise((resolve, _) => {
      const url = Constants.getTitleDetailsURL(info);
      $.get(url, resolve);
    });
  },

  getTitleCredits: (info) => {
    // TODO: How to get the error from $.get
    // Send it to resolve (currently '_').
    return new Promise((resolve, _) => {
      const url = Constants.getTitleCreditsURL(info);
      $.get(url, resolve);
    });
  },

  getPerson: (castMember) => {
    // TODO: How to get the error from $.get
    // Send it to resolve (currently '_').
    return new Promise((resolve, _) => {
      const url = Constants.getPersonURL(castMember);
      $.get(url, resolve);
    });
  },

  getImdbInfo: (info) => {
    // TODO: How to get the error from $.get
    // Send it to resolve (currently '_').
    return new Promise((resolve, _) => {
      const url = Constants.getImdbInfoURL(info);
      $.get(url, resolve);
    });
  },
};

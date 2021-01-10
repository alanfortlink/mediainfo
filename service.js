const Service = {
  getTitleWithInfo: (titleInfo) => {
    // TODO: Use titleInfo.extra to get specific tv show episode.
    const url =
      (titleInfo.type == "movie"
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
    return new Promise((resolve, reject) => {
      const urls = Constants.getTitleDetailsURLs(info);
      const promises = urls.map(
        (url) =>
          new Promise((urlResolve, _) => {
            $.get(url, urlResolve);
          })
      );

      Promise.all(promises)
        .then((results) => {
          let details = {};
          if (results.length >= 1) {
            for (k in results[0]) details[k] = results[0][k];
          } 

          if (results.length >= 2) {
            for (k in results[1]) details[`extra_${k}`] = results[1][k];
          }

          if (results.length >= 3) {
            for (k in results[2]) details[`extra2_${k}`] = results[2][k];
          }

          resolve(details);
        })
        .catch(reject);
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

  getImdbInfoWithId: (info) => {
    // TODO: How to get the error from $.get
    // Send it to resolve (currently '_').
    return new Promise((resolve, _) => {
      const url = Constants.getImdbInfoWithIdURL(info);
      $.get(url, resolve);
    });
  },
};

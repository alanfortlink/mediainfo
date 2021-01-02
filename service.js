const getTitleWithInfo = (titleInfo) => {
  // TODO: Use titleInfo.extra to get specific tv show episode.
  const url =
    (titleInfo.movie ? SEARCH_MOVIE_URL : SEARCH_SHOW_URL) + titleInfo.title;

  return new Promise((resolve, reject) => {
    $.get(url, (data) => {
      if(data.results.length == 0) reject("Title not found");
      resolve(data.results[0]);
    });
  });
};

const getTitleDetails = (info) => {
  // TODO: How to get the error from $.get
  // Send it to resolve (currently '_').
  return new Promise((resolve, _) => {
    const url = getTitleDetailsURL(info);
    $.get(url, resolve);
  });
};

const getTitleCredits = (info) => {
  // TODO: How to get the error from $.get
  // Send it to resolve (currently '_').
  return new Promise((resolve, _) => {
    const url = getTitleCreditsURL(info);
    $.get(url, resolve);
  });
};

const getPerson = (castMember) => {
  // TODO: How to get the error from $.get
  // Send it to resolve (currently '_').
  return new Promise((resolve, _) => {
    const url = getPersonURL(castMember);
    $.get(url, resolve);
  });
};

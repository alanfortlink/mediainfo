const loadElements = (callback) => {
  // TODO: Reject after a few retries.
  if (
    !getTitleContainer() ||
    !getPlayPauseButton() ||
    !getNetflixAppContainer()
  ) {
    // If we can't load the objects, they're not ready yet.
    // Let's try again in a second.
    setTimeout(() => {
      loadElements(callback);
    }, 1000);
    return;
  }

  callback();
};

const loadContent = () => {
  const titleInfo = getTitleInfo();
  getTitleWithInfo(titleInfo)
    .then((info) => {
      info.movie = titleInfo.movie;
      getTitleDetails(info)
        .then((details) => {
          getTitleCredits(info).then((credits) => {
            updateMediaInfo(details, credits);
          });
        })
        .catch(notifyError);
    })
    .catch(notifyError);
};

function setup() {
  addStyles();
  loadElements(() => {
    addMediaInfoContainer();
    addInfoToggleButton(onInfoClicked);
    loadContent();
  });
}

// TODO: Something to destruct?
function teardown() {}

$(document).ready(() => {
  setup();
});

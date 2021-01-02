let $currentTitle = null;

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

function removeElements() {
  removeStyles();
  removeMediaInfoContainer();
  removeInfoToggleButton();
}

function setupElements() {
  addStyles();
  loadElements(() => {
    addMediaInfoContainer();
    addInfoToggleButton(onInfoClicked);
    loadContent();
  });
}

function setup() {
  // See if the movie changed every second
  setInterval(() => {
    const $titleContainer = getTitleContainer();

    if (!$titleContainer) {
      removeElements();
      return;
    }

    const $newTitle = getTitleContainer().innerHTML;
    if ($newTitle != $currentTitle) {
      $currentTitle = $newTitle;

      removeElements();
      setupElements();
    }
  }, 1000);
}

// TODO: Something to destruct?
function teardown() {}

$(document).ready(() => {
  setup();
});

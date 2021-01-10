let $currentTitle = null;

const loadElements = (callback) => {
  // TODO: Reject after a few retries.
  if (
    !Elements.getTitleContainer() ||
    !Elements.getPlayPauseButton() ||
    !Elements.getNetflixAppContainer()
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
  const titleInfo = Elements.getTitleInfo();
  Service.getTitleWithInfo(titleInfo)
    .then((info) => {
      info.titleInfo = titleInfo;
      Service.getTitleDetails(info)
        .then((details) => {
          Service.getTitleCredits(info).then((credits) => {
            Render.updateMediaInfo(details, credits);
          });
        })
        .catch(notifyError);
    })
    .catch(notifyError);
};

function removeElements() {
  Style.removeStyles();
  Elements.removeMediaInfoContainer();
  Elements.removeInfoToggleButton();
}

function setupElements() {
  Style.addStyles();
  loadElements(() => {
    Elements.addMediaInfoContainer();
    Elements.addInfoToggleButton(Actions.onInfoClicked);
    loadContent();
  });
}

function setup() {
  // See if the movie changed every second
  setInterval(() => {
    const $titleContainer = Elements.getTitleContainer();

    if (!$titleContainer) {
      removeElements();
      return;
    }

    const $newTitle = Elements.getTitleContainer().innerHTML;
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

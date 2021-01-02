const Elements = {
  getTitleContainer: () => $(".video-title .ellipsize-text")[0],

  getPlayPauseButton: () =>
    $(".button-nfplayerPlay")[0] || $(".button-nfplayerPause")[0],

  getNetflixAppContainer: () => $("#appMountPoint")[0],

  getMediaInfoContainer: () => $("#mediaInfoContainer")[0],

  getInfoToggleButton: () => $("#infoToggleButton"),

  addMediaInfoContainer: () => {
    const divHTML = `<div id="mediaInfoContainer">Loading...</div>`;
    $(divHTML).appendTo(Elements.getNetflixAppContainer());
  },

  removeMediaInfoContainer: () => {
    if (Elements.getMediaInfoContainer()) {
      Elements.getMediaInfoContainer().remove();
    }
  },

  addInfoToggleButton: (toggleFunction) => {
    const buttonHTML = `
      <button id="infoToggleButton"
              class="touchable
                     PlayerControls--control-element
                     nfp-button-control
                     default-control-button
                     button-nfplayerPlay"
      >
      DET
      </button>
    `;

    Elements.getPlayPauseButton().insertAdjacentHTML("afterEnd", buttonHTML);
    Elements.getInfoToggleButton().click(toggleFunction);
  },

  removeInfoToggleButton: () => {
    if (Elements.getInfoToggleButton()) {
      Elements.getInfoToggleButton().remove();
    }
  },

  getTitleInfo: () => {
    const $titleContainer = Elements.getTitleContainer();
    const isTitleAMovie = $titleContainer.children.length == 0;

    return isTitleAMovie
      ? {
          title: $titleContainer.innerHTML,
          subtitle: null,
          movie: isTitleAMovie,
          extra: null,
        }
      : {
          title: $titleContainer.children[0].innerHTML,
          subtitle: $titleContainer.children[2].innerHTML,
          movie: isTitleAMovie,
          extra: $titleContainer.children[1].innerHTML,
        };
  },
};

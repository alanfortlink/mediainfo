const getTitleContainer = () => $(".video-title .ellipsize-text")[0];

const getPlayPauseButton = () =>
  $(".button-nfplayerPlay")[0] || $(".button-nfplayerPause")[0];

const getNetflixAppContainer = () => $("#appMountPoint")[0];

const getMediaInfoContainer = () => $("#mediaInfoContainer")[0];

const addMediaInfoContainer = () => {
  const divHTML = `<div id="mediaInfoContainer">Loading...</div>`;
  $(divHTML).appendTo(getNetflixAppContainer());
};

const addInfoToggleButton = (toggleFunction) => {
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

  getPlayPauseButton().insertAdjacentHTML("afterEnd", buttonHTML);
  $("#infoToggleButton").click(toggleFunction);
};

const getTitleInfo = () => {
  const $titleContainer = getTitleContainer();
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
};

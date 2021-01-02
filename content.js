const API_KEY = "dd86470883f1c776f77d487330fa36a3";
const BASE_URL = "//api.themoviedb.org/3";
let $titleContainer = null;
let $firstButton = null;
let $mediaInfoContainer = null;
let $netflixContainerApp = null;
let beingDisplayed = false;

function loadElements() {
  $titleContainer = $(".video-title .ellipsize-text")[0];
  $firstButton = $(".button-nfplayerPlay")[0] || $(".button-nfplayerPause")[0];
  $netflixContainerApp = $("#appMountPoint")[0];

  if (!$titleContainer || !$firstButton || !$netflixContainerApp) {
    setTimeout(loadElements, 1000);
    return;
  }

  console.log("All elements loaded");

  addMediaInfoContainer();
  fillContent();
}

function addMediaInfoContainer() {
  let content = `
    <div id='mediaInfoContainer'>Loading...</div>
    <style>
      #mediaInfoContainer{
        background-color: rgba(0, 0, 0, 0.8);
        padding: 10px;
        margin: 10px;
        position: absolute;
        z-index: 99;
        display: block;
        border-radius: 4px;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 1px solid white;
        display: none;
      }
    </style>
  `;

  $(content).appendTo($netflixContainerApp);
  $mediaInfoContainer = $("#mediaInfoContainer")[0];
}

function getMovieContent() {
  return new Promise((resolve, reject) => {
    const movieName = $titleContainer.innerHTML;
    const url = `${BASE_URL}/search/movie?query=${movieName}&api_key=${API_KEY}`;

    $.get(url, (data) => {
      if (data.results.length == 0) reject("No movie found");
      resolve(data.results[0]);
    });
  });
}

function getMovieCredits(movieId) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;

    $.get(url, (data) => {
      resolve(data);
    });
  });
}

function getShowContent() {
  return new Promise((resolve, reject) => {
    const showName = $titleContainer.children[0].innerHTML;
    const url = `${BASE_URL}/search/tv?query=${showName}&api_key=${API_KEY}`;

    $.get(url, (data) => {
      if (data.results.length == 0) reject("No show found");
      resolve(data.results[0]);
    });
  });
}

function getShowCredits(showId) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}`;

    $.get(url, (data) => {
      resolve(data);
    });
  });
}

function listImages(cast) {
  cast.forEach((p) => {
    const url = `${BASE_URL}/person/${p.id}?api_key=${API_KEY}`;
    $.get(url, (data) => {
      $(`#mediaInfoCast${p.id}`)[0].setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w200/${data.profile_path}`
      );
    });
  });
}

function updateTitleInfo(content, credits) {
  let castList = "";

  listImages(credits.cast);

  credits.cast.forEach((p) => {
    castList += `
      <div class="media-info-cast-item">
        <div class="media-info-cast-item-picture">
          <img id="mediaInfoCast${p.id}" src=""/>
        </div>
        <div class="media-info-cast-item-name">
          ${p.name}
        </div>
      </div>
    `;
  });

  const castContent = `
    <div class="media-info-cast-container">
    ${castList}
    </div>
  `;

  const divContent = `
    <div class="media-info-full-container">
      <div class="media-info-container">
        <div class="media-info-banner">
          <img src="https://image.tmdb.org/t/p/w300/${content.poster_path}"/>
        </div>
        <div class="media-info-overview">${content.overview}</div>
      </div>

      ${castContent}
    </div>

    <style>
      .media-info-full-container{
        min-width: 1000px;
        max-width: 1000px;
        position: relative;
        padding: 5px;
        display: flex;
        flex-direction: column;
      }

      .media-info-container{
        position: relative;
        width: auto;
        padding: 5px;
        display: flex;
        flex-direction: row;
        flex-grow: 1;
      }

      .media-info-banner{
        padding: 5px;
      }

      .media-info-banner img{
        min-height: 444px;
        max-height: 444px;
        min-width: 300px;
        max-width: 300px;
      }

      .media-info-overview{
        font-size: 20px;
        padding: 5px;
      }

      .media-info-cast-container{
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        padding-bottom: 10px;
      }

      .media-info-cast-item{
        margin-left: 8px;
        margin-right: 8px;
      }

      .media-info-cast-item-picture{
        display: flex;
      }

      .media-info-cast-item-picture img{
        width: 100px;
        display: flex;
      }

      .media-info-cast-item-name{
        display: flex;
        font-size: 12px;
      }
    </style>
  `;

  $mediaInfoContainer.innerHTML = "";
  $(divContent).appendTo($mediaInfoContainer);
}

function fillMovieContent() {
  getMovieContent()
    .then((movieContent) => {
      getMovieCredits(movieContent.id)
        .then((movieCredits) => {
          updateTitleInfo(movieContent, movieCredits);
        })
        .catch(alert);
    })
    .catch(alert);
}

function fillShowContent() {
  getShowContent()
    .then((showContent) => {
      getShowCredits(showContent.id)
        .then((showCredits) => {
          updateTitleInfo(showContent, showCredits);
        })
        .catch(alert);
    })
    .catch(alert);
}

function fillContent() {
  createDetailsButton();

  if ($titleContainer.children.length == 0) {
    // Title if a movie
    fillMovieContent($titleContainer);
  } else {
    // Title is a show
    fillShowContent($titleContainer);
  }
}

function detailsToggle() {
  if (beingDisplayed) {
    $mediaInfoContainer.setAttribute("style", "display: none;");
  } else {
    $mediaInfoContainer.setAttribute("style", "display: block;");
  }
  beingDisplayed = !beingDisplayed;
}

function createDetailsButton() {
  const $buttonContent = `
    <button class="touchable
                   PlayerControls--control-element
                   nfp-button-control
                   default-control-button
                   button-nfplayerPlay"
            id="mediaInfoDetailsButton"
            >
            DET
    </button>

    <style>
      #mediaInfoDetailsButton:hover{
      transform: scale(1.3);
      }
    </style>
  `;

  // Adds the new option after the first button in the bottom;
  $firstButton.insertAdjacentHTML("afterEnd", $buttonContent);
  $("#mediaInfoDetailsButton").click(detailsToggle);
}

$(document).ready(() => {
  loadElements();
});

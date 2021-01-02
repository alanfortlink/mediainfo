const styleText = `
<style id="mediaInfoStyleTag">
#mediaInfoContainer {
  position: absolute;
    min-width: 70%;
    max-width: 70%;

    left: 50%;
    top: 50%;

    transform: translateX(-50%) translateY(-50%);

    border: 1px solid white;
    background-color: rgba(0, 0, 0, 0.7);

    padding: 16px;
    border-radius: 8px;

    z-index: 99;
}

#mediaInfoParent {
    display: flex;
    flex-direction: column;
}

#mediaInfoTitle {
    display: flex;
    flex-direction: column;
}

#mediaInfoOverviewContainer {
    display: flex;
}

#mediaInfoOverviewBanner {
    display: flex;
}

#mediaInfoOverviewBanner img {
    width: 400px;
    flex-grow: 1;
}

#mediaInfoOverviewContent {
    display: flex;
    padding: 16px;
    padding-top: 0;
    color: #ddd;
    font-size: 30px;
}

#mediaInfoCastContainer {
    display: flex;
    flex-grow: 1;
    overflow-y: hidden;
    overflow-x: hidden;
}

.media-info-cast-item {
    transition: all 0.2s;
    margin: 8px;
    background-color: #000;
    border-radius: 4px;
}

.media-info-cast-item:hover {
    transition: all 0.2s;
    transform: scale(1.05);
    cursor: pointer;
}

.media-info-cast-name {
    color: white;
    font-size: 20px;
    margin: 8px;
}

.media-info-cast-image img {
    border-radius: 4px;
}

.media-info-title-description,
  .media-info-cast-description {
      color: white;
      font-size: 40px;
      font-weight: bold;
      padding: 4px;
  }


#mediaInfoCastScrollContainer {
    display: flex;
}

#mediaInfoPreviousButton,
  #mediaInfoNextButton {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      padding: 8px;
      margin: 16px;
      border-radius: 50%;
      min-height: 40px;
      max-height: 40px;
      min-width: 40px;
      max-width: 40px;

      cursor: pointer;
  }

#mediaInfoPreviousButton:hover,
  #mediaInfoNextButton:hover {
      transition: all 0.2s;
      transform: scale(1.2);
      box-shadow: 2px 2px 2px black;
  }


#triangleLeft {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid white;
    border-bottom: 10px solid transparent;
}

#triangleRight {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid white;
    border-bottom: 10px solid transparent;
}
</style>
`;

const addStyles = () => {
  $(styleText).appendTo(getNetflixAppContainer());
};

const removeStyles = () => {
  $("#mediaInfoStyleTag").remove();
};

const Style = {
  styleText: `
  <style id="mediaInfoStyleTag">
    #mediaInfoContainer {
        position: absolute;
        min-width: 1440px;
        max-width: 1440px;

        max-height: 800px;
        min-height: 800px;

        left: 50%;
        top: 5%;

        transform: translateX(-50%);

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
        flex: 1;
    }

    #mediaInfoOverviewBanner img {
      display: flex;
      flex-grow: 1;
      height: 450px;
    }

    #mediaInfoOverviewTitleName{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }

    #mediaInfoOverviewTitleName div {
      margin-right: 8px;
    }

    #mediaInfoOverviewContent {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        flex: 4;
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
        background-color: transparent;
        border-radius: 4px;
        min-height: 100%;
    }

    .media-info-cast-item:hover {
        transition: all 0.2s;
        transform: scale(1.05);
        cursor: pointer;
    }

    .media-info-cast-name {
        color: white;
        font-size: 20px;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        height: 44px;
        width: 100%;
        padding: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .media-info-cast-name-actor,
    .media-info-cast-name-character{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .media-info-cast-name-actor{
      font-weight: bold;
    }

    .media-info-cast-name-character{
      font-size: 17px;
    }

    .media-info-cast-image {
      min-height: 225px;
      max-height: 225px;
      position: relative;
    }

    .media-info-cast-image img {
        border-radius: 4px;
        min-width: 120px;
        max-width: 120px;
        min-height: 180px;
        max-height: 180px;
    }

    .media-info-title-description,
    .media-info-cast-description {
        display: flex;
        justify-content: space-between;
        color: white;
        font-size: 40px;
        font-weight: bold;
        padding: 4px;
    }

    #mediaInfoImdbRating, 
    #mediaInfoImdbCount, 
    #mediaEpisodeInfoImdbRating, 
    #mediaEpisodeInfoImdbCount {
      margin: 2px;
    }

    #mediaInfoOverviewImdb, #mediaEpisodeInfoOverviewImdb {
      display: flex;
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

    #mediaInfoBackdrop{
      width: 100%;
      height: 100%;
      position: absolute;
      margin-left: -16px;
      margin-top: -16px;
      z-index: -1;
      opacity: 0.3;
      background-size: 100% !important;
    }

    #mediaInfoOverviewTitle{
      color: #eeeeee;
      font-weight: bold;
      font-size: 40px;
      display: flex;
      justify-content: space-between;
    }

    .no-padding{
      padding: 0;
    }

    .no-margin{
      margin: 0;
    }
  </style>
  `,

  addStyles: () => {
    $(Style.styleText).appendTo(Elements.getNetflixAppContainer());
  },

  removeStyles: () => {
    $("#mediaInfoStyleTag").remove();
  },
};

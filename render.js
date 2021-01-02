const getCastItemHTML = (castMember) => {
  const castItemHTML = `
    <a href="http://www.google.com/search?q=${castMember.name}" target="_blank">
      <div class="media-info-cast-item">
        <div class="media-info-cast-image">
          <img id="${CAST_IMG_PREFIX_ID}${castMember.id}" src=""/>
          <div class="media-info-cast-name">${castMember.name}</div>
        </div>
      </div>
    </a>
  `;

  return castItemHTML;
};

const updateMediaInfo = (details, credits) => {
  const $containerHTML = `
    <div id="mediaInfoParent">
      <div id="mediaInfoTitle">
        <div class="media-info-title-description">${
          details.original_title || details.original_name
        }</div>

        <div id="mediaInfoOverviewContainer">
          <div id="mediaInfoOverviewBanner">
            <img src="https://image.tmdb.org/t/p/w400/${details.poster_path}"/>
          </div>
          <div id="mediaInfoOverviewContent">${details.overview}</div>
        </div>
      </div>

      <div id="mediaInfoCast">
        <div class="media-info-cast-description">Cast</div>
        <div id="mediaInfoCastScrollContainer">
          <div id="mediaInfoPreviousButton">
            <div id="triangleLeft"></div>
          </div>
          <div id="mediaInfoCastContainer">
            ${credits.cast.map((m) => getCastItemHTML(m)).join("")}
          </div>
          <div id="mediaInfoNextButton">
            <div id="triangleRight"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  getMediaInfoContainer().innerHTML = $containerHTML;

  $("#mediaInfoPreviousButton").click(onCastScrollLeft);
  $("#mediaInfoNextButton").click(onCastScrollRight);

  credits.cast.forEach((castMember) => {
    getPerson(castMember)
      .then((person) => {
        $(`#${CAST_IMG_PREFIX_ID}${person.id}`)[0].setAttribute(
          "src",
          person.profile_path
            ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
            : `https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-vector-id846183030?b=1&k=6&m=846183030&s=612x612&w=0&h=Dp-Qub1xwkcyR2p96O6DdrvEBNsMfcOur29sTxUo-V8=`
        );
      })
      .catch(notifyError);
  });
};

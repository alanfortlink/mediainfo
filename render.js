const getCastItemHTML = (castMember) => {
  const castItemHTML = `
    <div class="media-info-cast-item">
      <div class="media-info-cast-image">
        <img id="${CAST_IMG_PREFIX_ID}${castMember.id}" src=""/>
      </div>
      <div class="media-info-cast-name">${castMember.name}</div>
    </div>
  `;

  return castItemHTML;
};

const updateMediaInfo = (details, credits) => {
  const $containerHTML = `
    <div id="mediaInfoParent">
      <div id="mediaInfoTitle">
        <div class="media-info-title-description">${details.original_title}</div>

        <div id="mediaInfoOverviewContainer">
          <div id="mediaInfoOverviewBanner">
            <img src="https://image.tmdb.org/t/p/w400/${details.poster_path}"/>
          </div>
          <div id="mediaInfoOverviewContent">${details.overview}</div>
        </div>
      </div>

      <div id="mediaInfoCast">
        <div class="media-info-cast-description">Cast</div>
        <div id="mediaInfoCastContainer">
          ${credits.cast.map((m) => getCastItemHTML(m)).join("")}
        </div>
      </div>
    </div>
  `;

  getMediaInfoContainer().innerHTML = $containerHTML;

  credits.cast.forEach((castMember) => {
    getPerson(castMember)
      .then((person) => {
        if (person.profile_path) {
          $(`#${CAST_IMG_PREFIX_ID}${person.id}`)[0].setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w200/${person.profile_path}`
          );
        }
      })
      .catch(notifyError);
  });
};

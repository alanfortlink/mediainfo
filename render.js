const Render = {
  getExtraDetailsDiv: (details) => {
    return details.extra_id
      ? `<div class="overview-separator">
                <div id="mediaInfoOverviewTitle">
                  <div>S${details.extra_season_number}E${details.extra_episode_number} "${details.extra_name}" <span id="mediaEpisodeInfoTitleYear"></span></div>
                  <div>
                    <div id="mediaEpisodeInfoOverviewImdb">
                      <div id="mediaEpisodeInfoImdbRating">-.-</div>
                      /
                      <div id="mediaEpisodeInfoImdbCount">...</div>
                    </div>
                  </div>
                </div>
                <div id="mediaInfoOverviewText">
                  ${details.extra_overview}
                </div>
              </div>`
      : "";
  },

  getCastItemHTML: (castMember) => {
    const castItemHTML = `
      <a href="http://www.google.com/search?q=${
        castMember.name
      }" target="_blank">
        <div class="media-info-cast-item">
          <div class="media-info-cast-image">
            <img id="${Constants.CAST_IMG_PREFIX_ID}${castMember.id}" src=""/>
            <div class="media-info-cast-name">
              <div class="media-info-cast-name-actor">${castMember.name}</div>
              <div class="media-info-cast-name-character">${
                castMember.character || castMember.job || castMember.department
              }</div>
            </div>
          </div>
        </div>
      </a>
    `;

    return castItemHTML;
  },

  updateMediaInfo: (details, credits) => {
    console.log(details);
    console.log(credits);

    const yearExpression = details.release_date
      ? Aux.getYear(details.release_date)
      : `${Aux.getYear(details.first_air_date)} - ${Aux.getYear(
          details.last_air_date
        )}`;

    let members = credits.cast;

    credits.crew
      .filter((m) => !members.some((_m) => _m.id == m.id))
      .forEach((m) => {
        members.push(m);
      });

    if (details.extra_cast)
      details.extra_cast
        .filter((m) => !members.some((_m) => _m.id == m.id))
        .forEach((m) => {
          members.push(m);
        });

    if (details.extra_guest_stars)
      details.extra_guest_stars
        .filter((m) => !members.some((_m) => _m.id == m.id))
        .forEach((m) => {
          members.push(m);
        });

    members.sort((a, b) => b.popularity - a.popularity);

    const $containerHTML = `
      <div id="mediaInfoParent">
        <div id="mediaInfoBackdrop" 
             style="background: url(//image.tmdb.org/t/p/w400/${
               details.backdrop_path
             });">
        </div>
        <div id="mediaInfoTitle">
          <div id="mediaInfoOverviewContainer">
            <div id="mediaInfoOverviewBanner">
              <img src="//image.tmdb.org/t/p/w400/${details.poster_path}"/>
            </div>
            <div id="mediaInfoOverviewContent">
              <div class="overview-separator">
                <div id="mediaInfoOverviewTitle">
                  <div>${
                    details.name || details.title || details.original_title
                  } <span id="mediaInfoTitleYear"></span></div>
                  <div>
                    <div id="mediaInfoOverviewImdb">
                      <div id="mediaInfoImdbRating">-.-</div>
                      /
                      <div id="mediaInfoImdbCount">...</div>
                    </div>
                  </div>

                </div>
                <div id="mediaInfoOverviewText">
                  ${details.overview}
                </div>
              </div>

              <div>&nbsp;</div>

              ${Render.getExtraDetailsDiv(details)}

            </div>
          </div>
        </div>

        <div id="mediaInfoCast">
          <div class="media-info-cast-description">Cast & Crew</div>
          <div id="mediaInfoCastScrollContainer">
            <div id="mediaInfoPreviousButton">
              <div id="triangleLeft"></div>
            </div>
            <div id="mediaInfoCastContainer">
              ${members.map((m) => Render.getCastItemHTML(m)).join("")}
            </div>
            <div id="mediaInfoNextButton">
              <div id="triangleRight"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Lazy load cast and imdb information.
    Elements.getMediaInfoContainer().innerHTML = $containerHTML;

    $("#mediaInfoPreviousButton").click(Actions.onCastScrollLeft);
    $("#mediaInfoNextButton").click(Actions.onCastScrollRight);

    Service.getImdbInfo({ name: details.name })
      .then((imdbInfo) => {
        console.log(imdbInfo);
        $("#mediaInfoImdbRating")[0].innerHTML = `${imdbInfo.imdbRating}★`;
        $("#mediaInfoImdbCount")[0].innerHTML = `${imdbInfo.imdbVotes} votes`;
        $("#mediaInfoTitleYear")[0].innerHTML = `(${imdbInfo.Year})`;
      })
      .catch(notifyError);

    if (details.extra_name) {
      Service.getImdbInfoWithId({ id: details.extra2_imdb_id })
        .then((imdbInfo) => {
          console.log(imdbInfo);
          $(
            "#mediaEpisodeInfoImdbRating"
          )[0].innerHTML = `${imdbInfo.imdbRating}★`;
          $(
            "#mediaEpisodeInfoImdbCount"
          )[0].innerHTML = `${imdbInfo.imdbVotes} votes`;
          $("#mediaEpisodeInfoTitleYear")[0].innerHTML = `(${imdbInfo.Year})`;
        })
        .catch(notifyError);
    }

    credits.cast.forEach((castMember) => {
      Service.getPerson(castMember)
        .then((person) => {
          $(`#${Constants.CAST_IMG_PREFIX_ID}${person.id}`)[0].setAttribute(
            "src",
            person.profile_path
              ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
              : `https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-vector-id846183030?b=1&k=6&m=846183030&s=612x612&w=0&h=Dp-Qub1xwkcyR2p96O6DdrvEBNsMfcOur29sTxUo-V8=`
          );
        })
        .catch(notifyError);
    });
  },
};

/*Keep actions that our components will perform.*/

const SCROLL_SPEED = 800;

const onInfoClicked = () => {
  if (getMediaInfoContainer().getAttribute("style")) {
    getMediaInfoContainer().removeAttribute("style");
  } else {
    getMediaInfoContainer().setAttribute("style", "display: none;");
  }
};

const scrollCast = (diff) => {
  const $container = $("#mediaInfoCastContainer")[0];
  const scrollLeft = $container.scrollLeft;
  $container.scroll({ left: scrollLeft + diff, behavior: "smooth" });
};

const onCastScrollLeft = () => {
  scrollCast(-SCROLL_SPEED);
};

const onCastScrollRight = () => {
  scrollCast(SCROLL_SPEED);
};

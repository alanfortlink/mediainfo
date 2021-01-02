/*Keep actions that our components will perform.*/

const Actions = {
  SCROLL_SPEED: 800,

  onInfoClicked: () => {
    if (Elements.getMediaInfoContainer().getAttribute("style")) {
      Elements.getMediaInfoContainer().removeAttribute("style");
    } else {
      Elements.getMediaInfoContainer().setAttribute("style", "display: none;");
    }
  },

  scrollCast: (diff) => {
    const $container = $("#mediaInfoCastContainer")[0];
    const scrollLeft = $container.scrollLeft;
    $container.scroll({ left: scrollLeft + diff, behavior: "smooth" });
  },

  onCastScrollLeft: () => {
    Actions.scrollCast(-Actions.SCROLL_SPEED);
  },

  onCastScrollRight: () => {
    Actions.scrollCast(Actions.SCROLL_SPEED);
  },
};

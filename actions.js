const onInfoClicked = () => {
  if(getMediaInfoContainer().getAttribute("style")){
    getMediaInfoContainer().removeAttribute("style");
  }else{
    getMediaInfoContainer().setAttribute("style", "display: none;");
  }
};

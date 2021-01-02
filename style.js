const styleText = `
<style>
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

#mediaInfoParent{
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

#mediaInfoOverviewBanner{
    display: flex;
}

#mediaInfoOverviewBanner img {
    width: 400px;
    flex-grow: 1;
}

#mediaInfoOverviewContent{
    display: flex;
    padding: 16px;
    color: #ddd;
    font-size: 30px;
}

#mediaInfoCastContainer {
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
}

.media-info-cast-item {
    margin: 8px;
    background-color: #000;
    border-radius: 4px;
}

.media-info-cast-name {
    color: white;
    font-size: 20px;
    padding: 8px;
}

.media-info-cast-image img {
    border-radius: 4px;
}

.media-info-title-description, .media-info-cast-description {
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 4px;
}
</style>
`;

const addStyles = () => {
  $(styleText).appendTo(getNetflixAppContainer());
};

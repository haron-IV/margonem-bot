const checkIsGameLoaded = () => {
    return document.querySelector("#loading").style.display === 'none' ? true : false;
};

export default checkIsGameLoaded;
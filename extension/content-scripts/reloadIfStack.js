function getCoordinates(){
    return document.querySelector('#botloc').innerHTML;
}

const coordinates = {
    old: getCoordinates(),
    active: getCoordinates()
}

function updateOldCoordinates(){
    coordinates.old = getCoordinates();
}

function updateActiveCoordinates(){
    coordinates.active = getCoordinates();
}

function updateCoordinates() {
    setInterval(() => {
        updateOldCoordinates();
    }, 10000);

    setInterval(() => {
        updateActiveCoordinates();
    }, 1000);
}

function checkCoordinates(){
    chrome.storage.sync.get(['botStatus'], (botStats) => {
        if( botStats.botStatus === true && coordinates.old === coordinates.active ){
            console.log('Reload beacuse your hero is stuck.')
            window.location.reload();
        }
    });
}

setTimeout(() => {

    updateCoordinates();
    setInterval(() => {
        checkCoordinates();    
    }, 45000);
    
}, 2000);





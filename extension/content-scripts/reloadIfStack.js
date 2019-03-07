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
            // window.location.reload();
        }
    });
}

function checkBotStatus() {
    chrome.storage.sync.get('botStatus', (bot) => {
        if (bot.botStats === true){
            return bot.botStats;
        }
    });
}

setInterval(() => {
    checkBotStatus();
}, 2000);

setTimeout(() => {

    updateCoordinates();
    setInterval(() => {
        checkCoordinates();
        if (isDead() === true && checkBotStatus() === true){
            document.querySelector('#logoutbut').click();
        }
    }, 45000);
    
}, 2000);

// LOGOUT IF DEAD

function isDead(){
    if (document.querySelector('#dazed').style.display == "block"){
        return true;
    } else {
        return false;
    }
}
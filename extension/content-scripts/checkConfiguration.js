checkIsGameLoaded();

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            init_config();
            clearInterval(interval);
        }
    }, 1000);
}

function init_config () {
    getBotStatus();
    openConfiguration();

    setTimeout(() => {
        if (bot_status == true){
            if (checkIfAutoPassingPortalsIsOn() === false) {
                TurnOffAutoPassingPortals();
                saveConfiguration();
            } else {
                closeConfiguration();
            }
        } else {
            if (checkIfAutoPassingPortalsIsOn() === true){
                TurnOffAutoPassingPortals();
                saveConfiguration();
            } else {
                closeConfiguration();
            }
        }
    }, 200);
}

function openConfiguration() {
    document.querySelector('#b_config').click();
    
}

function closeConfiguration() {
    setTimeout(() => {
        document.querySelector('.cancel').click();
    }, 200);
}

function TurnOffAutoPassingPortals() {
    setTimeout(() => {
        document.querySelector('#opt12').click();    
    }, 200);
}

function saveConfiguration() {
    setTimeout(() => {
        document.querySelector('.save').click();
    }, 200);
}

function checkIfAutoPassingPortalsIsOn(){
    if (document.querySelector('#opt12').style.backgroundPosition === '0px 0px') {
        return false
    } else {
        return true
    }
}

let bot_status;
function getBotStatus() {
    chrome.storage.sync.get(['botStatus'], (bot) => {
        if (bot.botStatus === false){
            bot_status = false;
        } else {
            bot_status = true;
        }
    });
}
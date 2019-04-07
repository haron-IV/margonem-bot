checkIsGameLoaded();

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            init_change_fight_window();
            clearInterval(interval);
        }
    }, 1000);
}

function init_change_fight_window() {
    getSettings();
    changeFightWindow();
}

//
let settings = {};
//

function getSettings(){
    chrome.storage.sync.get(['settingsData'], (bot) => {
        if (bot.settingsData){
            settings = bot.settingsData;
        }
    });
}

function changeFightWindow() {
    setTimeout(() => {
        if (settings.changed_fight_window === true){
            document.querySelector('#battlelog').classList.add('fightLog');
            document.querySelector('#battle').classList.add('battle');
        }    
    }, 250);
}
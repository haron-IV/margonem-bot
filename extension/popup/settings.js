const $reset_black_list_btn = document.querySelector('#reset-black-list-btn');
const $changed_fight_window = document.querySelector('#changed-fight-window');
const $active_minimap = document.querySelector('#active-minimap');


// 
let settings = {
    changed_fight_window: false
};
//

function init_settings(){
    loadSettings();
    setInterfaceStatus();
}
init_settings();

function loadSettings(){
    chrome.storage.sync.get(['settingsData'], (bot) => {
        if(bot.settingsData){
            settings = bot.settingsData;
            console.log('data: ', settings);
        }
    });
}

function setInterfaceStatus(){
    setTimeout(() => {
        if (settings.changed_fight_window === true) {
            $changed_fight_window.checked = true;
        }

        if (settings.active_minimap === true) {
            $active_minimap.checked = true;
        }
    }, 100);
}


$reset_black_list_btn.addEventListener('click', () => {
    // clear black list
    chrome.storage.sync.get(['black_list_mob'], (mobs) => {
        const data = {
            data: []
        }

        chrome.storage.sync.set({'black_list_mob': data});
    });
});

$changed_fight_window.addEventListener('change', () => {

    if ($changed_fight_window.checked === true){
        settings.changed_fight_window = true
    } else {
        settings.changed_fight_window = false
    }
    
    chrome.storage.sync.set({'settingsData': settings});
});

$active_minimap.addEventListener('change', () => {

    if ($active_minimap.checked === true){
        settings.active_minimap = true
    } else {
        settings.active_minimap = false
    }
    
    chrome.storage.sync.set({'settingsData': settings});
});
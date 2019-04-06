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
    setMiniMapConfig();
    checkIfMiniMapDataWasCreated();
    getMiniMapMinMobLvl();

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

// minimap config:
function toggleMiniMapConfig(display){
    document.querySelector('.ns-wrapper').style.display = display;
}

function showMiniMapConfig(){
    toggleMiniMapConfig('block');
    document.querySelector('.ns-lpanel-entry[data-name="Inne"]').click();
}

function setMinMobLvl(){
    chrome.storage.sync.get(['miniMap', 'nickname'], (bot) => {
        let whichSettings;

        if(bot.miniMap){
            bot.miniMap.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    miniMapSettings = el;
                    whichSettings = i;
                }
            });

            const lvl = bot.miniMap[whichSettings].miniMapSettings.minMobLvl;

            document.querySelector('input[data-key="/minlvl"]').value = lvl;
        }
    });
}

function getMiniMapMinMobLvl(){
    document.querySelector('.ns-save-button').addEventListener('click', () =>{
        chrome.storage.sync.get(['miniMap', 'nickname'], (bot) => {
            let data;
            let whichCharacter;

            bot.miniMap.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    data = el.miniMapSettings;
                    whichCharacter = i;
                }
            });
    
            data = document.querySelector('input[data-key="/minlvl"]').value;

            bot.miniMap[whichCharacter].miniMapSettings = {minMobLvl:data};

            chrome.storage.sync.set({'miniMap': bot.miniMap});
        });
    });
}

function saveMiniMapConfig(){ // This function is only for click on the save button
    document.querySelector('.ns-save-button').click();
    toggleMiniMapConfig('none')
}

let miniMapSettings = [];
let checkMiniMap;
function checkIfMiniMapDataWasCreated(){
    chrome.storage.sync.get(['miniMap', 'nickname'], (bot) => {
        if (!bot.miniMap){
            chrome.storage.sync.set({'miniMap': miniMapSettings});
        } else {
            bot.miniMap.forEach(el => {
                if (el.nickname === bot.nickname){
                    checkMiniMap = true;
                }
            });
        }

        setTimeout(() => {
            if (checkMiniMap === undefined && bot.miniMap) {
                bot.miniMap.push({nickname: bot.nickname, miniMapSettings: []});
                chrome.storage.sync.set({'miniMap': bot.miniMap});
            }
        }, 200);
    });
}

function setMiniMapConfig(lvl){
    showMiniMapConfig();
    setMinMobLvl(lvl);
    saveMiniMapConfig();
}
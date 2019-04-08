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


    test();

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

function showMiniMapConfig(which){
    toggleMiniMapConfig('block');
    document.querySelector(`.ns-lpanel-entry[data-name="${which}"]`).click();
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
            let lvl;
            if (bot.miniMap[whichSettings].miniMapSettings.minMobLvl) {
                lvl = bot.miniMap[whichSettings].miniMapSettings.minMobLvl; // check this :)
            } else {
                lvl = 70;
            }
            

            // document.querySelector('input[data-key="/minlvl"]').value = lvl;
            saveMiniMapConfig(); // here must be saving from gui cuz bot only set this value but not save this

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

function setMiniMapConfig(){
    showMiniMapConfig('Inne');
    setMinMobLvl();
    saveMiniMapConfig();
}

// active minimap config:
function addClass(className){
    document.querySelector('.mmpWrapper').classList.add(className);
}

function removeClass(className){
    document.querySelector('.mmpWrapper').classList.remove(className);
}

function setMiniMapSize(size){
    showMiniMapConfig('Wygląd mapy');
    // document.querySelector('input[data-key="/mapsize"]').value = size;
    saveMiniMapConfig();
}

function hotkey(){
    let toggle = false;
    window.addEventListener('keydown', e => {
        if(e.key = "r" && toggle === false){
            addClass('enlargeMiniMap');
            removeClass('autoShowMiniMap');
            toggle = true;
        } else if (toggle === true){
            console.log('toggle')
            removeClass('enlargeMiniMap');
            addClass('autoShowMiniMap');
            toggle = false;
        }
    });
}

function test() {
    addClass('autoShowMiniMap');
    setMiniMapSize(60); //60 is the minimum size of the map
    hotkey();
}
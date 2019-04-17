const config = {
    bot_status: undefined,
    miniMapSettings: [],
    checkMiniMap: undefined
}

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if (loading_el.style.display === 'none') {
            init_config();
            clearInterval(interval);
        }
    }, 1000);
} checkIsGameLoaded();

function init_config () {
    getBotStatus();
    openConfiguration();
    setMiniMapConfig();
    checkIfMiniMapDataWasCreated();
    getMiniMapMinMobLvl();
    activeMiniMap();
    checkVisibleMiniMapStatusAndSetVisibility();

    addToggleButtonToMiniMap();

    setTimeout(() => {
        if (config.bot_status == true){
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

function getBotStatus() {
    chrome.storage.sync.get(['botStatus'], (bot) => {
        if (bot.botStatus === false){
            config.bot_status = false;
        } else {
            config.bot_status = true;
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
        let lvl;

        if(bot.miniMap){
            bot.miniMap.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    config.miniMapSettings = el;
                    whichSettings = i;
                }
            });
            
            if (bot.miniMap[whichSettings].miniMapSettings.minMobLvl) {
                lvl = bot.miniMap[whichSettings].miniMapSettings.minMobLvl; // check this :)
            } else {
                lvl = 70;
            }
            
            document.querySelector('input[data-key="/minlvl"]').value = lvl;
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

            if (document.querySelector('input[data-key="/minlvl"]')) {
                data = document.querySelector('input[data-key="/minlvl"]').value;
                bot.miniMap[whichCharacter].miniMapSettings = {minMobLvl:data};
                chrome.storage.sync.set({'miniMap': bot.miniMap});
            }
        });
    });
}

function saveMiniMapConfig(){ // This function is only for click on the save button
    document.querySelector('.ns-save-button').click();
    toggleMiniMapConfig('none');
}

function checkIfMiniMapDataWasCreated(){
    chrome.storage.sync.get(['miniMap', 'nickname'], (bot) => {
        if (!bot.miniMap){
            chrome.storage.sync.set({'miniMap': config.miniMapSettings});
        } else {
            bot.miniMap.forEach(el => {
                if (el.nickname === bot.nickname){
                    config.checkMiniMap = true;
                }
            });
        }

        setTimeout(() => {
            if (config.checkMiniMap === undefined && bot.miniMap) {
                bot.miniMap.push({nickname: bot.nickname, miniMapSettings: []}); // creating new user in data
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
    document.querySelector('input[data-key="/mapsize"]').value = size;
    saveMiniMapConfig();
}

function setHorizontalPosiTionOfMiniMap(){
    document.querySelector('.mmpWrapper').style.right = `${document.querySelector('#panel').offsetWidth+5}px`;
}

function addOpacitySliderForMiniMap(){
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.classList.add('minimap-opacity-slider');
    document.querySelector('.mmpWrapper').appendChild(slider);

    slider.addEventListener('change', () => {
        if (slider.value <= 30 && slider.value < 99){
            slider.value = 30;
            document.querySelector('.mmpWrapper').style.opacity = `0.${slider.value}`;
        } else if (slider.value <= 99){
            document.querySelector('.mmpWrapper').style.opacity = `0.${slider.value}`;    
        } else if (slider.value > 99){
            document.querySelector('.mmpWrapper').style.opacity = '1';
        }
    });
}

function hotkey(){
    let toggle = false;

    window.addEventListener('keydown', e => {
        if (e.key === 'r' && e.target.id !== 'inpchat'){
            if(toggle === false){
                addClass('enlargeMiniMap');
                removeClass('autoShowMiniMap');
                toggle = true;
            } else {
                removeClass('enlargeMiniMap');
                addClass('autoShowMiniMap');
                toggle = false;
            }
        }
    });
}

function addToggleButtonToMiniMap(){
    let toggle = true;
    const miniMapWrapper = document.querySelector('.mmpWrapper');
    const button = document.createElement('button');
    button.innerHTML = 'hide map';
    button.id = "close-mini-map-button";
    button.style.position = 'absolute';
    button.style.zIndex = '999';
    button.style.right = '280px';
    button.style.bottom = '35px';
    
    chrome.storage.sync.get(['settingsData'], (minimap) => {
        if (minimap.settingsData.active_minimap === true){
            document.querySelector('#centerbox2').appendChild(button);
        }
    });

    chrome.storage.sync.get(['miniMap', 'nickname'], (bot) => {
        let whichSettings;
    
        if(bot.miniMap){
            bot.miniMap.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    config.miniMapSettings = el;
                    whichSettings = i;
                }
            });

            if(bot.miniMap[whichSettings].miniMapSettings.status === true){
                miniMapWrapper.classList.add('hidden');
                toggle = false;
                button.innerHTML = "show map";
            } else {
                miniMapWrapper.classList.remove('hidden');
                toggle = true;
                button.innerHTML = "hide map";
            }
        }
          
    });

    button.addEventListener('click', () => {

        chrome.storage.sync.get(['miniMap', 'nickname'], (bot) => {
            let whichSettings;
    
            if(bot.miniMap){
                bot.miniMap.forEach( (el, i) => {
                    if (el.nickname === bot.nickname){
                        config.miniMapSettings = el;
                        whichSettings = i;
                    }
                });

                if (toggle === true){
                    bot.miniMap[whichSettings].miniMapSettings.status = true;
                    chrome.storage.sync.set({'miniMap': bot.miniMap});
                } else {
                    bot.miniMap[whichSettings].miniMapSettings.status = false;
                    chrome.storage.sync.set({'miniMap': bot.miniMap});
                }
            }

            if(toggle === true){
                miniMapWrapper.classList.add('hidden');
                toggle = false;
                button.innerHTML = "show map";
            } else {
                miniMapWrapper.classList.remove('hidden');
                toggle = true;
                button.innerHTML = "hide map";
            }
        });
        
        button.blur(); // unfocus button, after clicking on button when user click enter button was clicked
    });
}

function checkVisibleMiniMapStatusAndSetVisibility(){
    chrome.storage.sync.get(['miniMap', 'nickname'], (settings) => {
        let whichSettings;

        if (settings.miniMap){
            settings.miniMap.forEach((el, i) => {
                if (el.nickname === settings.nickname) {
                    config.miniMapSettings = el;
                    whichSettings = i;
                }
            });

            // chrome.storage.sync.set({'miniMap': [{miniMapSettings:[]});

            if(settings.miniMap[whichSettings].miniMapSettings.status === true){
                document.querySelector('.mmpWrapper').classList.remove('hidden');
            } else {
                document.querySelector('.mmpWrapper').classList.add('hidden');
            }
        } 
    });
}

function activeMiniMap() {
    chrome.storage.sync.get(['settingsData'], (settings) => {
        if ( settings.settingsData && settings.settingsData.active_minimap === true) {
            addClass('autoShowMiniMap');
            setMiniMapSize(60); //60 is the minimum size of the map
            hotkey();
            setHorizontalPosiTionOfMiniMap();
            addOpacitySliderForMiniMap(); // for refactorize and better look

        } else {
            setMiniMapSize(130);
        }
    });
}
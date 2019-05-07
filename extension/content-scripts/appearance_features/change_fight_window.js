const change_fight_window = () => {
    let settings = {};

    chrome.storage.sync.get(['settingsData'], (bot) => {
        if (bot.settingsData){
            settings = bot.settingsData;
        }
    });

    setTimeout(() => {
        if (settings.changed_fight_window === true){
            document.querySelector('#battlelog').classList.add('fightLog');
            document.querySelector('#battle').classList.add('battle');
        }    
    }, 250);
};

export default change_fight_window;
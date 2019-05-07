const add_bot_interface = () => {
    const bot_interface = {
        wrapper: document.createElement('div'),
        startBotButton: document.createElement('button'),
        stopBotButton: document.createElement('button'),
        eliteBotButtonStart: document.createElement('button'),
        eliteBotButtonStop: document.createElement('button'),
        toggleButton: document.querySelector('#nick'),
        toggleState: false
    }

    bot_interface.wrapper.id = "bot-interface-wrapper";
    bot_interface.wrapper.classList.add('bot-interface-wrapper');

    bot_interface.startBotButton.id = 'start-bot';
    bot_interface.startBotButton.classList.add('start-bot', 'bot-button');
    bot_interface.startBotButton.innerHTML = 'start';
    bot_interface.wrapper.appendChild(bot_interface.startBotButton);

    bot_interface.stopBotButton.id = 'stop-bot';
    bot_interface.stopBotButton.classList.add('stop-bot', 'bot-button');
    bot_interface.stopBotButton.innerHTML = 'stop';
    bot_interface.wrapper.appendChild(bot_interface.stopBotButton);

    // interface.eliteBotButtonStart.id = 'elite-bot-start';
    // interface.eliteBotButtonStart.classList.add('elite-bot-start', 'bot-button');
    // interface.eliteBotButtonStart.innerHTML = 'elite bot start';
    // interface.wrapper.appendChild(interface.eliteBotButtonStart);

    // interface.eliteBotButtonStop.id = 'elite-bot-stop';
    // interface.eliteBotButtonStop.classList.add('elite-bot-stop', 'bot-button');
    // interface.eliteBotButtonStop.innerHTML = 'elite bot stop';
    // interface.wrapper.appendChild(interface.eliteBotButtonStop);

    bot_interface.toggleButton.classList.add('toggle-button');

    bot_interface.toggleButton.addEventListener('click', () => {

        chrome.storage.sync.get(['interface_state'], (botStats) =>{
            if (botStats.interface_state === undefined){
                chrome.storage.sync.set({'interface_state': false});

            } else if (botStats.interface_state === true){
                bot_interface.wrapper.style.top = "-50px";
                chrome.storage.sync.set({'interface_state': false});

            } else if (botStats.interface_state === false){
                bot_interface.wrapper.style.top = "0";
                chrome.storage.sync.set({'interface_state': true});
            }

        });
    });

    document.querySelector('body').appendChild(bot_interface.wrapper);

    bot_interface.startBotButton.addEventListener('click', () => {
        bot_interface.startBotButton.classList.add('active-button');
        bot_interface.stopBotButton.classList.remove('active-button');
    });

    bot_interface.stopBotButton.addEventListener('click', () => {
        bot_interface.startBotButton.classList.remove('active-button');
        bot_interface.stopBotButton.classList.add('active-button');
    });

    chrome.storage.sync.get(['botStatus', 'interface_state'], (botStats) => {
        if ( botStats.botStatus ===  true ) {
            bot_interface.startBotButton.classList.add('active-button');
        } else {
            bot_interface.stopBotButton.classList.add('active-button');
        }

        if (botStats.interface_state === true){
            bot_interface.wrapper.style.top = "0px";
        } else if (botStats.interface_state === false){
            bot_interface.wrapper.style.top = "-50px";
        }
    });
};
    
export default add_bot_interface;
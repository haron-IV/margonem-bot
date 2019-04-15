setTimeout(() => {
    const interface = {
        wrapper: document.createElement('div'),
        startBotButton: document.createElement('button'),
        stopBotButton: document.createElement('button'),
        eliteBotButtonStart: document.createElement('button'),
        eliteBotButtonStop: document.createElement('button'),
        toggleButton: document.querySelector('#nick'),
        toggleState: false
    }

    interface.wrapper.id = "bot-interface-wrapper";
    interface.wrapper.classList.add('bot-interface-wrapper');

    interface.startBotButton.id = 'start-bot';
    interface.startBotButton.classList.add('start-bot', 'bot-button');
    interface.startBotButton.innerHTML = 'start';
    interface.wrapper.appendChild(interface.startBotButton);

    interface.stopBotButton.id = 'stop-bot';
    interface.stopBotButton.classList.add('stop-bot', 'bot-button');
    interface.stopBotButton.innerHTML = 'stop';
    interface.wrapper.appendChild(interface.stopBotButton)

    // interface.eliteBotButtonStart.id = 'elite-bot-start';
    // interface.eliteBotButtonStart.classList.add('elite-bot-start', 'bot-button');
    // interface.eliteBotButtonStart.innerHTML = 'elite bot start';
    // interface.wrapper.appendChild(interface.eliteBotButtonStart);

    // interface.eliteBotButtonStop.id = 'elite-bot-stop';
    // interface.eliteBotButtonStop.classList.add('elite-bot-stop', 'bot-button');
    // interface.eliteBotButtonStop.innerHTML = 'elite bot stop';
    // interface.wrapper.appendChild(interface.eliteBotButtonStop);

    interface.toggleButton.classList.add('toggle-button');

    

    interface.toggleButton.addEventListener('click', () => {

        chrome.storage.sync.get(['interface_state'], (botStats) =>{
            if (botStats.interface_state === undefined){
                chrome.storage.sync.set({'interface_state': false});

            } else if (botStats.interface_state === true){
                interface.wrapper.style.top = "-50px";
                chrome.storage.sync.set({'interface_state': false});

            } else if (botStats.interface_state === false){
                interface.wrapper.style.top = "0";
                chrome.storage.sync.set({'interface_state': true});
            }

        });
    });

    document.querySelector('body').appendChild(interface.wrapper);

    interface.startBotButton.addEventListener('click', () => {
        interface.startBotButton.classList.add('active-button');
        interface.stopBotButton.classList.remove('active-button');
    });

    interface.stopBotButton.addEventListener('click', () => {
        interface.startBotButton.classList.remove('active-button');
        interface.stopBotButton.classList.add('active-button');
    });

    chrome.storage.sync.get(['botStatus', 'interface_state'], (botStats) => {
        if ( botStats.botStatus ===  true ) {
            interface.startBotButton.classList.add('active-button');
        } else {
            interface.stopBotButton.classList.add('active-button');
        }

        // console.log('interface state: ', botStats.interface_state)

        if (botStats.interface_state === true){
            interface.wrapper.style.top = "0px";
        } else if (botStats.interface_state === false){
            interface.wrapper.style.top = "-50px";
        }
    });

}, 1500);
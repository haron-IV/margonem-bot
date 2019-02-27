setTimeout(() => {

    const wrapper = document.createElement('div');
    wrapper.id = "bot-interface-wrapper";
    wrapper.classList.add('bot-interface-wrapper');
    document.querySelector('body').appendChild(wrapper);
    const $wrapper = document.querySelector('#bot-interface-wrapper');

    const startBotButton = document.createElement('button');
    startBotButton.id = 'start-bot';
    startBotButton.classList.add('start-bot', 'bot-button');
    startBotButton.innerHTML = 'start';
    $wrapper.appendChild(startBotButton);

    const stopBotButton = document.createElement('button');
    stopBotButton.id = 'stop-bot';
    stopBotButton.classList.add('stop-bot', 'bot-button');
    stopBotButton.innerHTML = 'stop';
    $wrapper.appendChild(stopBotButton)

    const eliteBotButtonStart = document.createElement('button');
    eliteBotButtonStart.id = 'elite-bot-start';
    eliteBotButtonStart.classList.add('elite-bot-start', 'bot-button');
    eliteBotButtonStart.innerHTML = 'elite bot start';
    $wrapper.appendChild(eliteBotButtonStart);

    const eliteBotButtonStop = document.createElement('button');
    eliteBotButtonStop.id = 'elite-bot-stop';
    eliteBotButtonStop.classList.add('elite-bot-stop', 'bot-button');
    eliteBotButtonStop.innerHTML = 'elite bot stop';
    $wrapper.appendChild(eliteBotButtonStop);


    const $buttonstart = document.querySelector('#start-bot');
    const $buttonStop = document.querySelector('#stop-bot');


    $buttonstart.addEventListener('click', () => {
        $buttonstart.classList.add('active');
        $buttonStop.classList.remove('active');
    });

    chrome.storage.sync.get(['botStatus'], (botStats) => {
        if ( botStats.botStatus ===  true ) {
            startBotButton.classList.add('active');
        } else {
            stopBotButton.classList.add('active');
        }
    });

}, 1500);

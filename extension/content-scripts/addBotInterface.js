setTimeout(() => {

    const startBotButton = document.createElement('button');
    startBotButton.id = 'start-bot';
    startBotButton.innerHTML = 'start';
    startBotButton.style.fontSize = '10px';
    document.querySelector('#nick').appendChild(startBotButton)


    const stopBotButton = document.createElement('button');
    stopBotButton.id = 'stop-bot';
    stopBotButton.innerHTML = 'stop';
    stopBotButton.style.fontSize = '10px';
    document.querySelector('#nick').appendChild(stopBotButton)

}, 1500);

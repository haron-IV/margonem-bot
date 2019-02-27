setTimeout(() => {

    const startBotButton = document.createElement('button');
    startBotButton.id = 'start-bot';
    startBotButton.classList.add('start-bot');
    startBotButton.innerHTML = 'start';
    document.querySelector('#centerbox2').appendChild(startBotButton)


    const stopBotButton = document.createElement('button');
    stopBotButton.id = 'stop-bot';
    stopBotButton.classList.add('stop-bot');
    stopBotButton.innerHTML = 'stop';
    document.querySelector('#centerbox2').appendChild(stopBotButton)


    const $buttonstart = document.querySelector('#start-bot');


    // $buttonstart.addEventListener('click', ()=>{
    //     $buttonstart.style.backgroundColor = "green";
    // });

    chrome.storage.sync.get(['botStatus'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
        if ( botStats.botStatus ===  true ) {
            $buttonstart.style.backgroundColor = 'green';
        }
    });

}, 1500);

setTimeout(() => { //REFACTORIZE

    function eliteBot() {
        let interval = null;

        interval = setInterval(() => {
            const npcs = document.querySelectorAll('.npc');

            npcs.forEach(el => {
                if( el.getAttribute('tip').split('elita').length >= 2 ) {
                    console.log('here is a elite', el);
                    el.click();
                    clearInterval(interval);
                    autoFight();
                    closeFight();
                    updateEliteStats();
                    reload(7000);
                }
            });
                
        }, 500);
    }

    function autoFight(){
        setInterval(() => {
        document.querySelector('#autobattleButton').click(); 
        }, 3000);
    }

    function closeFight(){
        setInterval(() => {
            if ( document.querySelector('#battleclose') ) {
                document.querySelector('#battleclose').click();
            }
        }, 5500);
    }

    function updateEliteStats(){
        chrome.storage.sync.get(['killedElites'], (botStats) => {

            if(botStats.killedElites === undefined){
                chrome.storage.sync.set({'killedElites': 1}, ()=>{});
            } else {
                chrome.storage.sync.set({'killedElites': botStats.killedElites+1}, ()=>{});
            }

        });
    }

    function reload(time){
        setTimeout(() => {
            window.location.reload()
        }, time);
    }

    chrome.storage.sync.get(['eliteBotStatus'], (botStats)=>{
        if (botStats.eliteBotStatus === true) {
            eliteBot();
            $buttonEliteStart.classList.add('active');
            $buttonEliteStop.classList.remove('active');
            console.log('elite bot is on.');
        } else {
            $buttonEliteStop.classList.add('active');
            $buttonEliteStart.classList.remove('active');
            console.log('elite bot is off.');
        }
    });

    const $buttonEliteStart = document.querySelector('#elite-bot-start');
    const $buttonEliteStop = document.querySelector('#elite-bot-stop');

    $buttonEliteStart.addEventListener('click', ()=>{
        chrome.storage.sync.set({'eliteBotStatus': true}, ()=>{
            console.log('Elite bot is on.');
            $buttonEliteStart.classList.add('active');
            $buttonEliteStop.classList.remove('active');
            eliteBot();
        });
    });

    $buttonEliteStop.addEventListener('click', ()=>{
        chrome.storage.sync.set({'eliteBotStatus': false}, ()=>{
            console.log('Elite bot is off.');
            $buttonEliteStop.classList.add('active');
            $buttonEliteStart.classList.remove('active');
            reload(1000);
        });
    });

}, 2000);
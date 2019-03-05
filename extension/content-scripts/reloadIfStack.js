setInterval(() => { // refactorize and better way

    chrome.storage.sync.get(['lastLocalizationCoord', 'botStatus'], (botStats) => {
        if(botStats.botStatus === true &&  botStats.lastLocalizationCoord ===  document.querySelector('#botloc').innerHTML ){
            console.log('Reload beacuse your hero is stuck.')
            window.location.reload();
        }
    });
    
}, 8000); // 30s
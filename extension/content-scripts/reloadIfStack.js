setInterval(() => {

    chrome.storage.sync.get(['lastLocalizationCoord', 'botStatus'], (botStats) => {
        if(botStats.botStatus === true &&  botStats.lastLocalizationCoord ===  document.querySelector('#botloc').innerHTML ){
            console.log('Reload beacuse your hero is stuck.')
            window.location.reload();
        }
    });
    
}, 30000); // 30s




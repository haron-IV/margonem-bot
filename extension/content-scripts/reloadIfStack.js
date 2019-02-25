setInterval(() => {

    chrome.storage.sync.get(['lastLocalizationCoord'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
        if ( botStats.lastLocalizationCoord ===  document.querySelector('#botloc').innerHTML ) {
            console.log('Reload beacuse your hero is stuck.')
            window.location.reload();
        }
    });
    
}, 60000); // 2 minutes = 60000 * 2




setInterval(() => { // better way
    const stats = {
        'needExp': document.querySelector('#exp1').getAttribute('tip').split('>')[6],
        'lastLocalization': document.querySelector('#botloc').getAttribute('tip'),
        'lastLocalizationCoord': document.querySelector('#botloc').innerHTML,
        'gold': document.querySelector('#gold').innerHTML
    };

    chrome.storage.sync.set(stats, function (){
        console.log('exp updated')
    });
}, 20000);
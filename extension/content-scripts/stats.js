setInterval(() => {
    const stats = {
        'needExp': document.querySelector('#exp1').getAttribute('tip').split('>')[6],
        'lastLocalization': document.querySelector('#botloc').getAttribute('tip'),
        'lastLocalizationCoord': document.querySelector('#botloc').innerHTML,
        'gold': document.querySelector('#gold').innerHTML,
        'server': location.href
    };
    // 'clan_name': document.querySelector('#clanbox').children[1].innerText.split('klanu')[1].trim()

    chrome.storage.sync.set(stats, function (){
        console.log('stats updated')
    });
}, 20000);

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            getPlayerNickname();
            clearInterval(interval);
        }
    }, 1000);
} checkIsGameLoaded();

function getPlayerNickname(){
    const nickname = {nickname: document.querySelector('#nick').innerHTML.split('·')[0].trim()};
    chrome.storage.sync.set(nickname, () => {});
}
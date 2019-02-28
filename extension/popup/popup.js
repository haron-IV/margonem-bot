const $need_exp = document.querySelector('#need-exp');
const $actual_localization = document.querySelector('#actual-localization');
const $actuallocalizationCoord = document.querySelector('#actual-localization-coord');
const $gold = document.querySelector('#gold');
const $killedElites = document.querySelector('#killed-elites');

chrome.storage.sync.get(['needExp', 'lastLocalization', 'lastLocalizationCoord', 'gold', 'killedElites'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
    $need_exp.innerHTML = botStats.needExp;
    $actual_localization.innerHTML = botStats.lastLocalization;
    $actuallocalizationCoord.innerHTML = botStats.lastLocalizationCoord;
    $gold.innerHTML = botStats.gold;
    $killedElites.innerHTML = botStats.killedElites;
});
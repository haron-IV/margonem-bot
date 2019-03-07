const $need_exp = document.querySelector('#need-exp');
const $actual_localization = document.querySelector('#actual-localization');
const $actuallocalizationCoord = document.querySelector('#actual-localization-coord');
const $gold = document.querySelector('#gold');
const $killedElites = document.querySelector('#killed-elites');
const $search_npc_inp = document.querySelector('#npc-search-inp');
const $search_npc_btn = document.querySelector('#npc-search-btn');
const $search_quest_btn = document.querySelector('#quest-search-btn');
const $search_quest_inp = document.querySelector('#quest-search-inp');

chrome.storage.sync.get(['needExp', 'lastLocalization', 'lastLocalizationCoord', 'gold', 'killedElites'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
    $need_exp.innerHTML = botStats.needExp;
    $actual_localization.innerHTML = botStats.lastLocalization;
    $actuallocalizationCoord.innerHTML = botStats.lastLocalizationCoord;
    $gold.innerHTML = botStats.gold;
    $killedElites.innerHTML = botStats.killedElites;
});

$search_npc_btn.addEventListener('click', ()=>{
    const npc_name = $search_npc_inp.value;
    const link = `http://emargo.pl/npc/szukaj?q=${npc_name}`;
    window.open(link, '_blank');
});

$search_quest_btn.addEventListener('click', () => {
    const quest_name = $search_quest_inp.value;
    const link = `http://emargo.pl/questy/szukaj?q=${quest_name}`;
    window.open(link, '_blank');
});


const $need_exp = document.querySelector('#need-exp');
const $actual_localization = document.querySelector('#actual-localization');
const $actuallocalizationCoord = document.querySelector('#actual-localization-coord');
const $gold = document.querySelector('#gold');
const $killedElites = document.querySelector('#killed-elites');
const $search_npc_inp = document.querySelector('#npc-search-inp');
const $search_npc_btn = document.querySelector('#npc-search-btn');
const $search_quest_btn = document.querySelector('#quest-search-btn');
const $search_quest_inp = document.querySelector('#quest-search-inp');
const $search_mob_inp = document.querySelector('#mob-search-inp');
const $search_mob_btn = document.querySelector('#mob-search-btn');


chrome.storage.sync.get(['needExp', 'lastLocalization', 'lastLocalizationCoord', 'gold', 'killedElites'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
    $need_exp.innerHTML = botStats.needExp;
    $actual_localization.innerHTML = botStats.lastLocalization;
    $actuallocalizationCoord.innerHTML = botStats.lastLocalizationCoord;
    $gold.innerHTML = botStats.gold;
    $killedElites.innerHTML = botStats.killedElites;
});

function search(input, searcher_link) {
    const searching_element = input.value;
    const link = `${searcher_link}${searching_element}`;

    window.open(link, '_blank');
}

function search_on_enter(input, searcher_link){
    input.addEventListener('keydown', (e) => {
        if ( e.key === "Enter" ){
            const searching_element = input.value;
            const link = `${searcher_link}${searching_element}`;
            window.open(link, '_blank');
        }
    });
}

$search_npc_btn.addEventListener('click', ()=>{
    search($search_npc_inp, 'http://emargo.pl/npc/szukaj?q=', );
});
search_on_enter($search_npc_inp, 'http://emargo.pl/npc/szukaj?q=');

$search_quest_btn.addEventListener('click', () => {
    search($search_quest_inp, 'http://emargo.pl/questy/szukaj?q=');
});
search_on_enter($search_quest_inp, 'http://emargo.pl/questy/szukaj?q=');

$search_mob_btn.addEventListener('click', () => {
    search($search_mob_inp, 'http://emargo.pl/potwory/szukaj?q=');
});
search_on_enter($search_mob_inp, 'http://emargo.pl/potwory/szukaj?q=');


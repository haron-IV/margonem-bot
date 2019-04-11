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
const $search_player_inp = document.querySelector('#search-player-inp');
const $search_player_btn = document.querySelector('#search-player-btn');


chrome.storage.sync.get(['needExp', 'lastLocalization', 'lastLocalizationCoord', 'gold', 'killedElites'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
    $need_exp.innerHTML = botStats.needExp;
    $actual_localization.innerHTML = botStats.lastLocalization;
    $actuallocalizationCoord.innerHTML = botStats.lastLocalizationCoord;
    $gold.innerHTML = botStats.gold;
});

function search(input, searcher_link) {
    const searching_element = input.value;
    const link = `${searcher_link}${searching_element}`;

    if (searching_element.length > 3) {
        window.open(link, '_blank');
    } else {
        input.classList.add('input-unvalid')
    }
}

function search_on_enter(input, searcher_link){
    input.addEventListener('keydown', (e) => {
        const input_length = input.value.length;
        
        if ( input_length < 3 ){
            input.classList.add('input-unvalid')
        } else if( input_length > 2 ){
            input.classList.remove('input-unvalid');
        } 

        if ( e.key === "Enter" && input.value.length > 3){
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

// to refactorize
$search_player_btn.addEventListener('click', () => {
    const searching_element = $search_player_inp.value;
    const link = `https://www.margonem.pl/?task=forum&show=found&kw=${searching_element}&playerinfo=Szukaj+gracza&cat=2`;
    
    if (searching_element.length > 3) {
        window.open(link, '_blank');
    }
    
});

$search_player_inp.addEventListener('keydown', (e) => {
    if ( e.key === "Enter" && $search_player_inp.value.length > 3){
        const searching_element = $search_player_inp.value;
        const link = `https://www.margonem.pl/?task=forum&show=found&kw=${searching_element}&playerinfo=Szukaj+gracza&cat=2`;
        window.open(link, '_blank');
    }
});
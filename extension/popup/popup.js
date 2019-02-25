const $need_exp = document.querySelector('#need-exp');
const $actual_localization = document.querySelector('#actual-localization');
const $actuallocalizationCoord = document.querySelector('#actual-localization-coord');

chrome.storage.sync.get(['needExp', 'lastLocalization', 'lastLocalizationCoord'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
    $need_exp.innerHTML = botStats.needExp;
    $actual_localization.innerHTML = botStats.lastLocalization;
    $actuallocalizationCoord.innerHTML = botStats.lastLocalizationCoord;
});

// $enter_amount_button.addEventListener('click', () => {
//     chrome.storage.sync.get(['total', 'limit'], function (budget){ // total - value in storage in budget object
        // let newTotal = 0;
        // if (budget.total){
        //     newTotal += parseInt( budget.total );
        // }

        // let amount = $enter_amount.value;
        // if(amount){
        //     newTotal += parseInt( amount );
        // }

        // chrome.storage.sync.set({"total": newTotal}, () => {
        //     if (amount && newTotal >= budget.limit){
        //         const notificationOptions = { // tworzenie objektu konfiguracyjnego dla powiadomienia
        //             type: "basic", // sa rozne typy powiadomien
        //             iconUrl: "../icons/icon128.png",
        //             title: "Limit reached!",
        //             message: "Hey! You reached the limit :/"
        //         };

        //         chrome.notifications.create('limit_notification', notificationOptions); //wywołanie powiadomienia
        //     }
        // });

        // $total_spend.innerHTML = newTotal;
        // $enter_amount.value = '';
//     } );
// });
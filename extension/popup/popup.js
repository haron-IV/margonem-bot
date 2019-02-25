// const $total_spend = document.querySelector('#total-spend');
// const $limit = document.querySelector('#limit') ;
// const $enter_amount = document.querySelector('#enter-amount');
// const $enter_amount_button = document.querySelector('#enter-amount-button');

// chrome.storage.sync.get(['total', 'limit'], (budget) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
//     $total_spend.innerHTML = budget.total;
//     $limit.innerHTML = budget.limit;
// });

// $enter_amount_button.addEventListener('click', () => {
//     chrome.storage.sync.get(['total', 'limit'], function (budget){ // total - value in storage in budget object
//         let newTotal = 0;
//         if (budget.total){
//             newTotal += parseInt( budget.total );
//         }

//         let amount = $enter_amount.value;
//         if(amount){
//             newTotal += parseInt( amount );
//         }

//         chrome.storage.sync.set({"total": newTotal}, () => {
//             if (amount && newTotal >= budget.limit){
//                 const notificationOptions = { // tworzenie objektu konfiguracyjnego dla powiadomienia
//                     type: "basic", // sa rozne typy powiadomien
//                     iconUrl: "../icons/icon128.png",
//                     title: "Limit reached!",
//                     message: "Hey! You reached the limit :/"
//                 };

//                 chrome.notifications.create('limit_notification', notificationOptions); //wywołanie powiadomienia
//             }
//         });

//         $total_spend.innerHTML = newTotal;
//         $enter_amount.value = '';
//     } );
// });


const test_button = document.querySelector('#test-button');

test_button.addEventListener('click', () => {
    // chrome.tabs.getSelected(null, (tab) => {
    //     chrome.tabs.sendRequest(tab.id, {greeting: "test"}, (response) => {
    //         alert();
    //     });
    // });

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {greeting: "hello"}, function(response) {
           alert(response.farewell);
        });
    });
});
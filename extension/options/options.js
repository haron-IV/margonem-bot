const $limit = document.querySelector('#limit');
const $save_limit_button = document.querySelector('#save-limit');
const $reset_total_button = document.querySelector('#reset-total');

$save_limit_button.addEventListener('click', () => {
    let limit = $limit.value;
    if(limit) {
        chrome.storage.sync.set({"limit": limit}, () => {
            close();
            console.log(1)
        });
    }
});

$reset_total_button.addEventListener('click', () => {
    chrome.storage.sync.set({"total": 0}, () => {
        const notificationOptions = { // tworzenie objektu konfiguracyjnego dla powiadomienia
            type: "basic", // sa rozne typy powiadomien
            iconUrl: "../icons/icon128.png",
            title: "Total reset!",
            message: "You reset the total value!"
        };

        chrome.notifications.create('limit_notification', notificationOptions); //wywołanie powiadomienia

        close();
    });
});
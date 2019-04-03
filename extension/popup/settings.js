const $reset_black_list_btn = document.querySelector('#reset-black-list-btn');


$reset_black_list_btn.addEventListener('click', () => {
    chrome.storage.sync.get(['black_list_mob'], (mobs) => {
        const data = {
            data: []
        }

        chrome.storage.sync.set({'black_list_mob': data});
    });
});
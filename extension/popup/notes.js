const $textarea = document.querySelector('#notes-textarea');
const $button_save_notes = document.querySelector('#button-save-notes');
const $notes_list = document.querySelector('#notes-list');


//
let allNotes = [];
//



function init_notes(){
    checkIfNotesWasCreated();
    loadNotes();
}
init_notes();

function checkIfNotesWasCreated(){
    chrome.storage.sync.get(['notes'], (bot) => {
        if (!bot.notes){
            chrome.storage.sync.set({'notes': allNotes});
        }
    });
}

function loadNotes(){
    chrome.storage.sync.get(['notes'], (bot) => {
        allNotes = bot.notes;
    });
}

$button_save_notes.addEventListener('click', () => {
    const activeNote = $textarea.value;

    chrome.storage.sync.get(['notes'], (bot) => {
        let data = bot.notes;

        data.push(activeNote);

        chrome.storage.sync.set({'notes': data});
    });
});

// $changed_fight_window.addEventListener('change', () => {

//     if ($changed_fight_window.checked === true){
//         settings.changed_fight_window = true
//     } else {
//         settings.changed_fight_window = false
//     }
    
//     chrome.storage.sync.set({'settingsData': settings});
// });

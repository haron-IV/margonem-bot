const $textarea = document.querySelector('#notes-textarea');
const $button_save_notes = document.querySelector('#button-save-notes');
const $notes_list = document.querySelector('#notes-list');


//
let allNotes = [];
//

function init_notes(){
    checkIfNotesWasCreated();
    loadNotes();
    showNotes();
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

function showNotes(){
    chrome.storage.sync.get(['notes'], (bot) => {
        bot.notes.forEach(el => {
           createNote(el); 
        });
    });
}

function createNote(text){
    const note = document.createElement('p');
    note.classList.add('single-note');
    note.innerHTML = text;
    
    $notes_list.appendChild(note);

    const deleteNote = document.createElement('img');
    deleteNote.src = '../img/delete-button.png';
    deleteNote.classList.add('delete-note');
    note.appendChild(deleteNote);
}

$button_save_notes.addEventListener('click', () => {
    const activeNote = $textarea.value;

    if (activeNote != '') {
        chrome.storage.sync.get(['notes'], (bot) => {
            let data = bot.notes;
    
            data.push(activeNote);
    
            chrome.storage.sync.set({'notes': data});
    
            $textarea.value = '';
        });
    }
    
});
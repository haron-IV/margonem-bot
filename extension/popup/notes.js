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
    deleteNote();
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
        bot.notes.forEach( (el, i) => {
           createNote(el, i); 
        });
    });
}

function createNote(text, id){
    const note = document.createElement('p');
    note.classList.add('single-note');
    note.id = id;
    note.innerHTML = text;
    
    $notes_list.appendChild(note);

    const deleteNote = document.createElement('img');
    deleteNote.src = '../img/delete-button.png';
    deleteNote.classList.add('delete-note');
    note.appendChild(deleteNote);
}

function deleteNote(){
    setTimeout(() => {
        document.querySelectorAll('.delete-note').forEach(el => {
            el.addEventListener('click', (e) => {
                e.target.parentNode.style.display = 'none';

                chrome.storage.sync.get(['notes'], (bot) => {
                    let data = bot.notes;
        
                    data.splice(parseInt( e.target.parentNode.id ), 1);
        
                    chrome.storage.sync.set({'notes': data});
                });
            })
        });    
    }, 250);
}

$button_save_notes.addEventListener('click', () => {
    const activeNote = $textarea.value;

    if (activeNote != '') {
        chrome.storage.sync.get(['notes'], (bot) => {
            let data = bot.notes;
    
            data.push(activeNote);
    
            chrome.storage.sync.set({'notes': data});
    
            $textarea.value = '';

            createNote(activeNote, data.length-1);
        });
    }
    
});
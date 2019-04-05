const $textarea = document.querySelector('#notes-textarea');
const $button_save_notes = document.querySelector('#button-save-notes');
const $notes_list = document.querySelector('#notes-list');

//
let wholeNotes = [];
let checkNotes;
//

function init_notes(){
    checkIfNotesWasCreated();
    loadNotes();
    showNotes();
    deleteNote();
}
init_notes();

function checkIfNotesWasCreated(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        if (!bot.notes){
            chrome.storage.sync.set({'notes': wholeNotes});
        } else {
            bot.notes.forEach(el => {
                if (el.nickname === bot.nickname){
                    checkNotes = true;
                }
            });
        }

        setTimeout(() => {
            if (checkNotes === undefined && bot.notes) {
                bot.notes.push({nickname: bot.nickname, notes: []});
                chrome.storage.sync.set({'notes': bot.notes});
            }
        }, 200);
    });
}

function checkUser(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        bot.notes.forEach(el => {
            if (el.nickname === bot.nickname){
                checkNotes = true;
            }
        });
    });
}

function loadNotes(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        if(bot.notes){
            bot.notes.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    wholeNotes = el;
                }
            });
        }
    });
}

function showNotes(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        if (bot.notes) {
            bot.notes.forEach( (el, i) => {
                if (el.nickname === bot.nickname) {
                    createNote(el.notes, i); 
                }
            });
        }
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
                e.target.parentNode.classList.add('single-note-fade-out');
                const noteHeight = e.target.parentNode.offsetHeight;
                setTimeout(() => {
                    e.target.parentNode.style.display = 'none';
                }, 900);
                
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
        chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
            let data;
            let whichCharacter;

            bot.notes.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    data = el.notes;
                    whichCharacter = i;
                }
            });
    
            data.push(activeNote);

            bot.notes[whichCharacter].notes = data;

    
            chrome.storage.sync.set({'notes': bot.notes});
            $textarea.value = '';

            createNote(activeNote, data.length-1);
        });
    }
    
});
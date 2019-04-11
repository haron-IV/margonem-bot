const data_hotkeys = {
    friendsListActive: false,
    mapActive: false,
    questListActive: false,
    chatEl: document.querySelector('#inpchat'),
    chatIsUse: false,
    equipmentAndAbilitySwitcher: [
        document.querySelector('.MM-battleset-switch-button-1'),
        document.querySelector('.MM-battleset-switch-button-2'),
        document.querySelector('.MM-battleset-switch-button-3')
    ]
}

function friendsList(){
    if ( data_hotkeys.friendsListActive === false && data_hotkeys.chatIsUse === false) {
        document.querySelector('#b_friends').click();
        data_hotkeys.friendsListActive = true;
    } else if (data_hotkeys.friendsListActive === true && data_hotkeys.chatIsUse === false) {
        document.querySelectorAll('.closebut')[2].click();
        data_hotkeys.friendsListActive = false;
    }    
}

function map(){
    if ( data_hotkeys.mapActive === false && data_hotkeys.chatIsUse === false) {
                
        setTimeout(() => {
            document.querySelector('#mappanel').children[0].children[0].click();    
        }, 200);
        
        data_hotkeys.mapActive = true;
    } else if (data_hotkeys.mapActive === true && data_hotkeys.chatIsUse === false) {
        data_hotkeys.mapActive = false;
    }  
}

function quest(){
    if ( data_hotkeys.questListActive === false && data_hotkeys.chatIsUse === false) {
        document.querySelector('#b_quests').click();
        data_hotkeys.questListActive = true;
    } else if (data_hotkeys.questListActive === true && data_hotkeys.chatIsUse === false) {
        document.querySelector('.closebut').click();
        data_hotkeys.questListActive = false;
    }   
}

function switchEquipmentAndAbilities(){
    window.addEventListener('keydown', e => {
        if (data_hotkeys.chatIsUse === false) {
            switch (e.key){
                case '1':
                    data_hotkeys.equipmentAndAbilitySwitcher[0].click();
                break;
    
                case '2':
                    data_hotkeys.equipmentAndAbilitySwitcher[1].click();
                break;
    
                case '3':
                    data_hotkeys.equipmentAndAbilitySwitcher[2].click();
                break;
            }

            data_hotkeys.questListActive = false;
        }
    });
}

function init_hotkeys(){
    data_hotkeys.chatEl.addEventListener('keydown', (e) => {
        if (e.key == 'Enter'){
            data_hotkeys.chatIsUse = false;
            console.log(data_hotkeys.chatIsUse)
        } else {
            data_hotkeys.chatIsUse = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch(e.key){
            case 'p':
                friendsList();
            break;

            case 'm':
                map();
            break;

            case 'q':
                quest();
            break;
        }
    });
    
    switchEquipmentAndAbilities();
}

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            init_hotkeys();
            clearInterval(interval);
        }
    }, 1000);
} checkIsGameLoaded();
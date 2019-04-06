const data = {
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
    if ( data.friendsListActive === false && data.chatIsUse === false) {
        document.querySelector('#b_friends').click();
        data.friendsListActive = true;
    } else if (data.friendsListActive === true && data.chatIsUse === false) {
        document.querySelectorAll('.closebut')[2].click();
        data.friendsListActive = false;
    }    
}

function map(){
    if ( data.mapActive === false && data.chatIsUse === false) {
                
        setTimeout(() => {
            document.querySelector('#mappanel').children[0].children[0].click();    
        }, 200);
        
        data.mapActive = true;
    } else if (data.mapActive === true && data.chatIsUse === false) {
        data.mapActive = false;
    }  
}

function quest(){
    if ( data.questListActive === false && data.chatIsUse === false) {
        document.querySelector('#b_quests').click();
        data.questListActive = true;
    } else if (data.questListActive === true && data.chatIsUse === false) {
        document.querySelector('.closebut').click();
        data.questListActive = false;
    }   
}

function switchEquipmentAndAbilities(){
    window.addEventListener('keydown', e => {
        switch (e.key){
            case '1':
                data.equipmentAndAbilitySwitcher[0].click();
            break;

            case '2':
                data.equipmentAndAbilitySwitcher[1].click();
            break;

            case '3':
                data.equipmentAndAbilitySwitcher[2].click();
            break;
        }
    });
}

function init_hotkeys(){
    data.chatEl.addEventListener('keydown', (e) => {
        if (e.key == 'Enter'){
            data.chatIsUse = false;
            console.log(data.chatIsUse)
        } else {
            data.chatIsUse = true;
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
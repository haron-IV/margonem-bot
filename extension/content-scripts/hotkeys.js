const data = {
    friendsListActive: false,
    mapActive: false,
    questListActive: false,
    chatEl: document.querySelector('#inpchat'),
    chatIsUse: false
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

setTimeout(() => {
    
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
    })
}, 2500);
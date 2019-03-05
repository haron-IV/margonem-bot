let friendsListActive = false;

setTimeout(() => {
    document.addEventListener('keyup', (e) => {
        if(e.key === 'p'){
            if ( friendsListActive === false ) {
                document.querySelector('#b_friends').click();
                friendsListActive = true;
            } else {
                document.querySelectorAll('.closebut')[2].click();
                friendsListActive = false;
            }    
        }
    } );    
}, 2000);


//
let mapActive = false;

setTimeout(() => {
    document.addEventListener('keyup', (e) => {
        if(e.key === 'm'){
            
            if ( mapActive === false ) {
                
                setTimeout(() => {
                    document.querySelector('#mappanel').children[0].children[0].click();    
                }, 150);
                
                mapActive = true;
            } else {
                mapActive = false;
            }    
        }
    } );  
    
}, 2000);

//

let questListActive = false;

setTimeout(() => {
    document.addEventListener('keyup', (e) => {
        if(e.key === 'q'){
            console.log(2)
            if ( questListActive === false ) {
                document.querySelector('#b_quests').click();
                questListActive = true;
            } else {
                document.querySelector('.closebut').click();
                questListActive = false;
            }    
        }
    } );    
}, 2000);

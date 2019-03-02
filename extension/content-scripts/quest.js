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

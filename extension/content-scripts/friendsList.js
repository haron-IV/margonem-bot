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

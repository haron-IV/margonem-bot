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
let questListActive = false;

function toggleQuests(e){
    console.log(e);
    // if(e.key === 'q'){
    //     console.log(2)
    //     if ( questListActive === false ) {
    //         document.querySelector('#b_quests').click();
    //         questListActive = true;
    //     } else {
    //         document.querySelector('#rndid#0.9879867508140954').click();
    //         questListActive = false;
    //     }    
    // }
    
}

// document.addEventListener('keyup', (e)=>{
// 	console.log(e.key)
// })

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

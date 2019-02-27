setTimeout(() => {
    let interval = null;

    interval = setInterval(() => {
        const npcs = document.querySelectorAll('.npc');
        
        npcs.forEach(el => {
            if( el.getAttribute('tip').split('elita').length >= 2 ) {
            console.log('here is a elite', el);
            el.click();
            clearInterval(interval);
            }
        });
        
    }, 500);
}, 2000);
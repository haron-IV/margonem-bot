const data = {
    dry_check: {}
};

function init_reloading(){
    walkAndCheckCoords();
}

function checkLoading() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
            console.log('loading')
        } else if (loading_el.style.display === 'none') {
            init_reloading();
            clearInterval(interval);
        }
    }, 1500);
}checkLoading();

function getCoordinates(){
    const coords = document.querySelector('#botloc').innerHTML;
    return coords;
}

function goToCoord (x, y) {
    document.querySelector('#coord-x').value = x;
    document.querySelector('#coord-y').value = y;
    setTimeout(() => {
      document.querySelector('#go-to-btn').click();    
    }, 500);
}

function getMapMaxCoord(){
    const map = {
      max_x: (document.querySelector('#ground').offsetWidth / 32 ) - 1,
      max_y: (document.querySelector('#ground').offsetHeight / 32 ) - 1,
    }

    return map;
}

function walkAndCheckCoords(){
    data.old_coordinates = getCoordinates();
    data.map = getMapMaxCoord();

    dryCheckIsHeroStuck();
    
    if (data.dry_check.stuck === true){
        goToCoord( Math.floor( data.map.max_x / 4 ), Math.floor( data.map.max_y / 4 ) );
    }
    
    setTimeout(() => {
        data.fresh_coordinates = getCoordinates();

        if(data.fresh_coordinates === data.old_coordinates && data.dry_check.stuck === true){
            window.location.reload();
        } else {
            walkAndCheckCoords();
        }
    }, 10000);
}

function dryCheckIsHeroStuck(){
    data.dry_check.old_coordinates = getCoordinates();

    setTimeout(() => {
        data.dry_check.fresh_coordinates = getCoordinates();
        chrome.storage.sync.get(['botStatus'], (botStats) => {
            data.botStatus = botStats.botStatus;

            if( data.dry_check.old_coordinates === data.dry_check.fresh_coordinates && botStats.botStatus === true){
                data.dry_check.stuck = true;
            } else {
                data.dry_check.stuck = false;
                dryCheckIsHeroStuck();
            }
        });
    }, 3715);
}

// reload after dead

function checkDead(){
    const dead_window = document.querySelector('#dazed');

    if (dead_window.style.display === 'block' && data.botStatus === true){
        console.log('Hero is dead');

        chrome.storage.sync.set({'botStatus': false}, () => {});

        setTimeout(() => {
            document.querySelector('#logoutbut').click();
        }, 1000);

        setTimeout(() => {
            document.querySelector('#a_ok').click();    
        }, 1500);
    }
}

setTimeout(() => {
    checkDead();
}, 10000);
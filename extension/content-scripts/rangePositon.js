function heroPositon(){
    const hero = document.querySelector('.mmp-hero');
    
    const coord = {
        x: parseInt( hero.style.left.split(/[. px]/)[0] ), // hero left on minimap
        y: parseInt( hero.style.top.split(/[. px]/)[0] ),
        width: parseInt( hero.style.width.split(/[. px]/)[0] ),
        height: parseInt( hero.style.height.split(/[. px]/)[0] )
    }
    return coord;
}

function mini_map(){
    const map = {
        width: parseInt( document.querySelector('.mmpMap').style.width.split(/[. px]/)[0] ),
        heigh: parseInt( document.querySelector('.mmpMap').style.height.split(/[. px]/)[0] )
    }
    return map;
}

function addRangeToMap(){
    const map = mini_map();
    const mapEl = document.querySelector('.mmpMap');

    const rangeItem = document.createElement('div');
    rangeItem.id="range";
    rangeItem.classList.add('big-range', 'range');
    rangeItem.style.width = `${(map.width / 4 ) * 2}px`; // range width
    rangeItem.style.height = `${(map.heigh / 5 ) * 2}px`; //range height
    mapEl.appendChild(rangeItem);
}

function _range(el) {
    const rangeEl = document.querySelector(el);
    const range = {
        x: parseInt( rangeEl.style.left.split(/[. px]/)[0] ),
        y: parseInt( rangeEl.style.top.split(/[. px]/)[0] ),
        width: parseInt( rangeEl.style.width.split(/[. px]/)[0] ),
        height: parseInt( rangeEl.style.height.split(/[. px]/)[0] ),
        x_start: parseInt( rangeEl.style.left.split(/[. px]/)[0] ),
        y_start: parseInt( rangeEl.style.top.split(/[. px]/)[0] )
    }
    return range;
}

function updateRangePosition(){
    const hero = heroPositon();
    const range = _range('#range');

    range.x = hero.x - ( ( range.width / 2 ) - (hero.width / 2 ) );
    range.y = hero.y - ( ( range.height / 2 ) - (hero.height / 2 ) );

    document.querySelector('#range').style.transform = `translate(${range.x}px, ${range.y}px)`;
}

// small range for checking if hero is near clicked mob:

function addSmallRangeToMap(){
    const mapEl = document.querySelector('.mmpMap');
    const hero = heroPositon();

    const rangeItem = document.createElement('div');
    rangeItem.id="smallRange";
    rangeItem.classList.add('small-range', 'range');
    rangeItem.style.width = `${hero.width + hero.width*3}px`; // range width
    rangeItem.style.height = `${hero.width+ hero.width*3}px`; // range width
    mapEl.appendChild(rangeItem);
}

function updateSmallRangePosition(){
    const hero = heroPositon();
    const range = _range('#smallRange');

    range.x = hero.x - ( ( range.width / 2 ) - (hero.width / 2 ) );
    range.y = hero.y - ( ( range.height / 2 ) - (hero.height / 2 ) );

    document.querySelector('#smallRange').style.transform = `translate(${range.x}px, ${range.y}px)`;
}

let mini_map_mouse_position = {
    x_first: 0,
    y_first: 0,
    x_second: 0,
    y_second: 0,
    counter: 0
};
function getMousePositionOnMiniMap () {
    document.querySelector('.mmpMap').addEventListener('mousedown', (e) => {
        const range = document.querySelector('#botRange');

        if (mini_map_mouse_position.counter === 0) {
            mini_map_mouse_position.x_first = e.layerX;
            mini_map_mouse_position.y_first = e.layerY;

            range.style.left = `${mini_map_mouse_position.x_first}px`;
            range.style.top = `${mini_map_mouse_position.y_first}px`;

            mini_map_mouse_position.counter++;
        }
    });

    document.querySelector('.mmpMap').addEventListener('mousemove', (e) => {
        if (mini_map_mouse_position.counter === 1){
            mini_map_mouse_position.x_second = e.layerX;
            mini_map_mouse_position.y_second = e.layerY;
            document.querySelector('#range').style.pointerEvents = "auto";
            drowRangeOnMiniMap();
        }
    });

    document.querySelector('.mmpMap').addEventListener('mouseup', (e) => {
        mini_map_mouse_position.counter++;
        mini_map_mouse_position.counter = 0;
        document.querySelector('#range').style.pointerEvents = "none";
    });

}

function drowRangeOnMiniMap() {
    const range = document.querySelector('#botRange');

    if (mini_map_mouse_position.counter >= 1 && mini_map_mouse_position.counter <= 2){
        if ( mini_map_mouse_position.x_first < mini_map_mouse_position.x_second ) {
            range.style.width = `${mini_map_mouse_position.x_second - mini_map_mouse_position.x_first}px`;
        } else {
            range.style.width = `${mini_map_mouse_position.x_first - mini_map_mouse_position.x_second}px`;
            range.style.transform = `translateX(${ - (mini_map_mouse_position.x_first - mini_map_mouse_position.x_second) }px`;
        }

        if ( mini_map_mouse_position.y_first < mini_map_mouse_position.y_second ) {
            range.style.height = `${mini_map_mouse_position.y_second - mini_map_mouse_position.y_first}px`;
        } else {
            range.style.height = `${mini_map_mouse_position.y_first - mini_map_mouse_position.y_second}px`;
            range.style.transform = `translateY(${ - (mini_map_mouse_position.y_first - mini_map_mouse_position.y_second) }px`;
        }
    }
}

function addRangeToMap_bot_range() {
    const mapEl = document.querySelector('.mmpMap');

    const rangeItem = document.createElement('div');
    rangeItem.id="botRange";
    rangeItem.classList.add('test', 'botRangeTest');
    rangeItem.style.width = `0`; // range width
    rangeItem.style.height = `0`; // range width
    mapEl.appendChild(rangeItem);
}

function init () {
    console.log('RangePosition.js included.')
    addRangeToMap();
    addSmallRangeToMap();

    getMousePositionOnMiniMap();
    addRangeToMap_bot_range();

    setInterval(() => {
        updateRangePosition();
        updateSmallRangePosition();
    }, 250);
}

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
            // chrome.storage.sync.set({'gameLoadedStatus': false}, () => {});
        } else if (loading_el.style.display === 'none') {
            // chrome.storage.sync.set({'gameLoadedStatus': true}, () => {});
            init();
            clearInterval(interval);
        }
    }, 1000);
    
}

checkIsGameLoaded();

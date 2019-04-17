function checkMapFightStatus(){
    //"PvP wyłąc"
    // "Mapka PvP"
    return document.querySelector('#pvpmode').getAttribute('tip').slice(0, 9);
}

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

    if (checkMapFightStatus() === "PvP wyłąc") {
        rangeItem.style.width = `${(map.width / 4 ) * 2}px`; // range width
        rangeItem.style.height = `${(map.heigh / 5 ) * 2}px`; //range height
    } else if (checkMapFightStatus() === "Mapka PvP"){
        rangeItem.style.width = document.querySelector('.mmp-visibility').style.width; // range width
        rangeItem.style.height = document.querySelector('.mmp-visibility').style.height; //range height
    } 
    
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

    range.x = hero.x - ( ( range.width / 2 ) - (hero.width / 2 ) +2 );
    range.y = hero.y - ( ( range.height / 2 ) - (hero.height / 2 ) +2 );

    document.querySelector('#range').style.transform = `translate(${range.x}px, ${range.y}px)`;
}

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

/// bot range
let mini_map_mouse_position = {
    x_first: 0,
    y_first: 0,
    x_second: 0,
    y_second: 0,
    counter: 0
};
function getMousePositionOnMiniMap () {
    const range = document.querySelector('#range');
    const allElementsOnMiniMap = document.querySelector('.mmpMap').children;

    document.querySelector('.mmpMap').addEventListener('mousedown', (e) => {
        const botRange = document.querySelector('#botRange');

        if (mini_map_mouse_position.counter === 0) {
            botRange.style.width = 0;
            botRange.style.height = 0; // reset area after click
            
            mini_map_mouse_position.x_first = e.layerX;
            mini_map_mouse_position.y_first = e.layerY;

            botRange.style.left = `${mini_map_mouse_position.x_first}px`;
            botRange.style.top = `${mini_map_mouse_position.y_first}px`;

            mini_map_mouse_position.counter++;

            for (let i = 0; i <= allElementsOnMiniMap.length-1; i++){
                allElementsOnMiniMap[i].classList.add('off-pointer-events')
            } 
        }
    });

    document.querySelector('.mmpMap').addEventListener('mousemove', (e) => {
        if (mini_map_mouse_position.counter === 1){
            mini_map_mouse_position.x_second = e.layerX;
            mini_map_mouse_position.y_second = e.layerY;
            range.style.pointerEvents = "auto";
            drowRangeOnMiniMap();
        }
    });

    document.querySelector('.mmpMap').addEventListener('mouseup', (e) => {
        mini_map_mouse_position.counter = 0;
        range.style.pointerEvents = "none";

        for (let i = 0; i <= allElementsOnMiniMap.length-1; i++){
            allElementsOnMiniMap[i].classList.remove('off-pointer-events');
            saveBotRangePositionAndSize();
        } 
    });

}

function saveBotRangePositionAndSize(){
    const range = document.querySelector('#botRange');
    const last_range_styles = range.getAttribute('style');

    const data = {
        "last_botRange_style": last_range_styles
    }

    chrome.storage.sync.set(data, function (){});
}

function drowRangeOnMiniMap() {
    const range = document.querySelector('#botRange');

    if (mini_map_mouse_position.counter >= 1 && mini_map_mouse_position.counter <= 2){

        if (mini_map_mouse_position.x_first > mini_map_mouse_position.x_second && mini_map_mouse_position.y_first > mini_map_mouse_position.y_second) {
            range.style.height = `${ Math.abs( mini_map_mouse_position.y_first ) - Math.abs( mini_map_mouse_position.y_second )}px`;
            range.style.width = `${ Math.abs( mini_map_mouse_position.x_first ) - Math.abs( mini_map_mouse_position.x_second )}px`;

            range.style.transform = `translate(${ - ( Math.abs( mini_map_mouse_position.x_first ) - Math.abs( mini_map_mouse_position.x_second ) ) }px, ${ ( Math.abs( mini_map_mouse_position.y_second ) - Math.abs( mini_map_mouse_position.y_first ))}px`;
            
        } else {

            if ( mini_map_mouse_position.x_first < mini_map_mouse_position.x_second ) {
                range.style.width = `${ Math.abs( mini_map_mouse_position.x_second ) - Math.abs( mini_map_mouse_position.x_first )}px`;
            } else {
                range.style.width = `${ Math.abs( mini_map_mouse_position.x_first ) - Math.abs( mini_map_mouse_position.x_second )}px`;
                range.style.transform = `translateX(${ - ( Math.abs( mini_map_mouse_position.x_first ) - Math.abs( mini_map_mouse_position.x_second ) ) }px`;
            }
    
            if ( mini_map_mouse_position.y_first < mini_map_mouse_position.y_second ) {
                range.style.height = `${ Math.abs( mini_map_mouse_position.y_second ) - Math.abs( mini_map_mouse_position.y_first )}px`;
            } else {
                range.style.height = `${ Math.abs( mini_map_mouse_position.y_first ) - Math.abs( mini_map_mouse_position.y_second )}px`;
                range.style.transform = `translateY(${ - (mini_map_mouse_position.y_first - mini_map_mouse_position.y_second) }px`;
            }
        }
        
    }
}

function addBotRangeToMiniMap() {
    const mapEl = document.querySelector('.mmpMap');

    const rangeItem = document.createElement('div');
    rangeItem.id="botRange";
    rangeItem.classList.add('bot-range', 'range');
    rangeItem.style.width = `0`; // range width
    rangeItem.style.height = `0`; // range width
    mapEl.appendChild(rangeItem);
}

function init () {
    addRangeToMap();
    addSmallRangeToMap();

    getMousePositionOnMiniMap();
    addBotRangeToMiniMap();

    setInterval(() => {
        updateRangePosition();
        updateSmallRangePosition();
    }, 250);
}

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            init();
            clearInterval(interval);
        }
    }, 1000);
}

checkIsGameLoaded();
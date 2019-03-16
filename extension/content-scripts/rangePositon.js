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

function init () {
    console.log('RangePosition.js included.')
    addRangeToMap();
    addSmallRangeToMap();

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

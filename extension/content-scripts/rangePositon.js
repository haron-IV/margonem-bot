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
    rangeItem.style.position = "absolute";
    rangeItem.style.width = `${(map.width / 4 ) * 2}px`; // range width
    rangeItem.style.height = `${(map.heigh / 5 ) * 2}px`; //range height
    rangeItem.style.left = `${0}px`;
    rangeItem.style.top = `${0}px`;
    rangeItem.style.backgroundColor = "rgba(65, 150, 235, .5)";
    rangeItem.style.border = "1px solid rgba(65, 150, 235, 1)";
    rangeItem.style.pointerEvents = "none";
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

    document.querySelector('#range').style.left = `${range.x}px`;
    document.querySelector('#range').style.top = `${range.y}px`;
}

// small range for checking if hero is near clicked mob:

function addSmallRangeToMap(){
    const mapEl = document.querySelector('.mmpMap');
    const hero = heroPositon();

    const rangeItem = document.createElement('div');
    rangeItem.id="smallRange";
    rangeItem.style.position = "absolute";
    rangeItem.style.width = `${hero.width + hero.width*3}px`; // range width
    rangeItem.style.height = `${hero.width+ hero.width*3}px`; // range width
    rangeItem.style.left = `${0}px`;
    rangeItem.style.top = `${0}px`;
    rangeItem.style.backgroundColor = "rgba(255, 0, 0, .5)";
    rangeItem.style.border = "1px solid rgba(255, 0, 0, 1)";
    rangeItem.style.pointerEvents = "none";
    mapEl.appendChild(rangeItem);
}

function updateSmallRangePosition(){
    const hero = heroPositon();
    const range = _range('#smallRange');

    range.x = hero.x - ( ( range.width / 2 ) - (hero.width / 2 ) );
    range.y = hero.y - ( ( range.height / 2 ) - (hero.height / 2 ) );

    document.querySelector('#smallRange').style.left = `${range.x}px`;
    document.querySelector('#smallRange').style.top = `${range.y}px`;
}

setTimeout(() => {
    addRangeToMap();
    addSmallRangeToMap();

    setInterval(() => {
        updateRangePosition();
        updateSmallRangePosition();
    }, 400);

}, 2500)
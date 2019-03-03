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

function createRange() {
    const hero = heroPositon();
    const map = mini_map();

    const range = {
        left: hero.x - map.width / 8,
        top: hero.y - map.heigh / 10,
        right: hero.x + map.width / 8,
        bottom: hero.y + map.heigh / 10
    }
    return range;
}

function addRangeToMap(){
    const map = mini_map();
    const mapEl = document.querySelector('.mmpMap');

    const rangeItem = document.createElement('div');
    rangeItem.id="range";
    rangeItem.style.position = "absolute";
    rangeItem.style.width = `${(map.width / 8 )* 2}px`;
    rangeItem.style.height = `${(map.heigh / 10 )* 2}px`;
    rangeItem.style.left = `${0}px`;
    rangeItem.style.top = `${0}px`;
    rangeItem.style.backgroundColor = "rgba(65, 150, 235, .6)"
    mapEl.appendChild(rangeItem);
}

function _range() {
    const rangeEl = document.querySelector('#range');
    const range = {
        x: parseInt( rangeEl.style.left.split(/[. px]/)[0] ),
        y: parseInt( rangeEl.style.top.split(/[. px]/)[0] ),
        width: parseInt( rangeEl.style.width.split(/[. px]/)[0] ),
        height: parseInt( rangeEl.style.height.split(/[. px]/)[0] ),
    }
    return range;
}

function updateRangePosition(){
    const hero = heroPositon();
    const map = mini_map();
    const range = _range();



    range.x = hero.x - ( ( range.width / 2 ) - (hero.width / 2 ) );
    range.y = hero.y - ( ( range.height / 2 ) - (hero.height / 2 ) );

    console.log(hero.height)


    // range.x = hero.x;
    // range.y = hero.y;

    document.querySelector('#range').style.left = `${range.x}px`;
    document.querySelector('#range').style.top = `${range.y}px`;

}

addRangeToMap();
updateRangePosition()
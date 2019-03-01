function getHeroCoord(){
	const hero = {
        x: parseInt( document.querySelector('#hero').style.left.split('px')[0].trim() ),
        y: parseInt( document.querySelector('#hero').style.top.split('px')[0].trim() )
    }
	return	hero;
}

function getMobCoord(){
    const mob = {
        x: parseInt( document.querySelector('#npc18107').style.left.split('px')[0].trim() ),
        y: parseInt( document.querySelector('#npc18107').style.top.split('px')[0].trim() )
    }
	return mob;
}

if ( getHeroCoord().x + 50 > getMobCoord().x && getHeroCoord().x - 50 < getMobCoord().x ) {
	console.log('mob!')
}

///
function getMobs(){
    return document.querySelectorAll('.npc');

    mobs.forEach(el => {
        if( parseInt(el.getAttribute('tip').split('">')[1].split('lvl')[0].trim() ) > 20 ){
            //lvl check
        }
       
    });
}

getMobs().forEach(el => {
    if (
        getHeroCoord().x + 50 > parseInt( el.style.left.split('px')[0].trim() ) && getHeroCoord().x - 50 < parseInt( el.style.left.split('px')[0].trim() )
        &&
        getHeroCoord().y + 50 > parseInt( el.style.top.split('px')[0].trim() ) && getHeroCoord().y - 50 < parseInt( el.style.top.split('px')[0].trim() )
        ) {
        console.log(el)
    }
});
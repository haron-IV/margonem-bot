document.querySelectorAll('.mmp-mob')[0]; // pobiera moba z minimapki
document.querySelectorAll('.npc')[0]; // pobiera moba z mapy gry

document.querySelector('#autobattleButton').click(); // klika autowalke

document.querySelector('#battleclose').click(); // zamyka okno walki

document.querySelector('#hero'); //pobiera element naszego bohatera z mapy gry

document.querySelector('.mmp-hero'); // pobiera element naszego bohatera z minimapy



function goToMob(){
    if( document.querySelectorAll('.mmp-mob')[0] ){
        document.querySelectorAll('.mmp-mob')[0].click();
    } else {
        console.log('Here is not mob')
    }
}

function attackMob(){
    setTimeout(() => {
        document.querySelectorAll('.npc')[0].click();
    }, 1500);
}

function autoFight(){
    setTimeout(() => {
        document.querySelector('#autobattleButton').click();
        closeFight();  
    }, 2500);
}

function closeFight(){
    setTimeout(() => {
        document.querySelector('#battleclose').click();
    }, 2000);
}

function checkHeroPosition(){
    const MyHero = document.querySelector('.mmp-hero');
    const mob = document.querySelectorAll('.mmp-mob')[0];
    const stepLength = 20; // px

    let interval = setInterval(() => {
        if ( 
            parseInt( MyHero.style.top.split(/[px .]/)[0] ) >= parseInt( mob.style.top.split(/[px .]/)[0] ) - stepLength 
                &&
            parseInt( MyHero.style.top.split(/[px .]/)[0] ) <= parseInt( mob.style.top.split(/[px .]/)[0] ) + stepLength
                &&
            parseInt( MyHero.style.left.split(/[px .]/)[0] ) >= parseInt( mob.style.left.split(/[px .]/)[0] ) - stepLength
                &&
           parseInt( MyHero.style.left.split(/[px .]/)[0] ) <= parseInt( mob.style.left.split(/[px .]/)[0] ) + stepLength
        ) {
            console.log('attack')
            clearInterval(interval);

            attackMob();
            autoFight();
        }
    }, 3500);
}

function GoToMobAndAttack(){
    goToMob();
    checkHeroPosition();
}

function bot(){
    let interval = setInterval(() => {
        GoToMobAndAttack();
    }, 7000);
}

/////////////////////
// Range for attacking neat mobs

const miniMap = document.querySelector('.mmpMap');
const myHero = document.querySelector('.mmp-hero');
const mobs = document.querySelectorAll('.mmp-mob');

function getMapInfo(){
    const map = {
        width: parseInt( miniMap.style.width.split('px')[0] ),
        height: parseInt( miniMap.style.height.split('px')[0] ),
    }

    return map;
}

function getHeroInfo(){
    const hero = {
        position_left: parseInt( myHero.style.left.split('px')[0] ),
        position_top: parseInt( myHero.style.top.split('px')[0] )
    }

    return hero;
}

function getMobs(){
    const mobs = {
        mobs_list: document.querySelectorAll('.mmp-mob'),
        mobs_positions: []
    }

    mobs.mobs_list.forEach(el => {
        const mob = [];
        mob.push( parseInt( el.style.left.split('px')[0] ) );
        mob.push( parseInt( el.style.top.split('px')[0] ) );

        mobs.mobs_positions.push(mob)
        
    });

    return mobs;
}

function checkMobsPosition() {
    let positions = getMobs().mobs_positions;
    let hero = getHeroInfo();
    let map = getMapInfo();
    let mobs = getMobs();
    const range_x = map.width / 3;
    const range_y = map.height / 3;
    let mobs_in_range = [];

    positions.forEach((el, i) => {
        if ( 
            hero.position_left + range_x >=  mobs.mobs_positions[i][0] && hero.position_left - range_x <=  mobs.mobs_positions[i][0]
            &&
            hero.position_top + range_y >=  mobs.mobs_positions[i][1] && hero.position_top - range_y <=  mobs.mobs_positions[i][1] 
            )
            {
            mobs_in_range.push(mobs.mobs_list[i]);
        }
    });

    return mobs_in_range;
}
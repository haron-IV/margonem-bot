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
function close_and_get_loot(e) {
	if(e.which === 81){
		$('#loots_button').click();
    	$('#battleclose').click();
	}
}

document.querySelector('body').addEventListener('keyup', close_and_get_loot)




document.querySelectorAll('.mmp-mob')[0]; // pobiera moba z minimapki
document.querySelectorAll('.npc')[0]; // pobiera moba z mapy gry

document.querySelector('#autobattleButton').click(); // klika autowalke

document.querySelector('#battleclose').click(); // zamyka okno walki

document.querySelector('#hero'); //pobiera element naszego bohatera z mapy gry

document.querySelector('.mmp-hero'); // pobiera element naszego bohatera z minimapy



function goToMob(){
    document.querySelectorAll('.mmp-mob')[0].click();
}

function attackMob(){
    document.querySelectorAll('.npc')[0];
}

function checkHeroPosition(){
    const MyHero = document.querySelector('.mmp-hero');
    const mob = document.querySelectorAll('.mmp-mob')[0];
    const stepLength = 20; // px

    if ( MyHero.style.top.split(/[px .]/)[0] >= mob.style.top.split(/[px .]/)[0] - stepLength // in top position
            &&
         MyHero.style.top.split(/[px .]/)[0] <= mob.style.top.split(/[px .]/)[0] + stepLength 
            &&
         MyHero.style.left.split(/[px .]/)[0] >= mob.style.left.split(/[px .]/)[0] - stepLength
            &&
         MyHero.style.left.split(/[px .]/)[0] <= mob.style.left.split(/[px .]/)[0] + stepLength
        ){ console.log('atak')}

    
}


&&
MyHero.style.left.split('.')[0] >= mob.style.left.split('.')[0] + stepLength // in left position
    ||
MyHero.style.left.split('.')[0] >= mob.style.left.split('.')[0] - stepLength // in left position
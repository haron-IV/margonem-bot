setTimeout(() => {
  // document.querySelectorAll('.mmp-gw'); przejscia. 0 element powinien byc wyjsciem (przejscia z minimapy)

  function goToMob(){
    let mobs = [];

    const lvl_range = 22;

    document.querySelectorAll('.mmp-mob').forEach(el => {
      if ( parseInt( el.getAttribute('tip').split('">')[1].split('lvl')[0].trim() ) >= lvl_range ){
        mobs.push(el);
      }
    });
    //here is problem bot go to mob but not attack him

    if( mobs[0] ){
      mobs[0].click();
    } else {
      console.log('Here is not mob');
      document.querySelectorAll('.mmp-gw')[document.querySelectorAll('.mmp-gw').length-1].click();
    }
  }

  function getMobs(){
    return document.querySelectorAll('.npc');
  }

  function getHeroCoord(){
    const hero = {
      x: parseInt( document.querySelector('#hero').style.left.split('px')[0].trim() ),
      y: parseInt( document.querySelector('#hero').style.top.split('px')[0].trim() )
    }
    return	hero;
  }

  // function attackMob(){
  //   setTimeout(() => {
  //     console.log('attack mob')
      

  //   }, 1500);
  // }

  function autoFight(){
    setInterval(() => {
      document.querySelector('#autobattleButton').click(); 
    }, 2000);
  }

  function closeFight(){
    setInterval(() => {
        if ( document.querySelector('#battleclose') ) {
          document.querySelector('#battleclose').click();
        }
    }, 2500);
  }

  function checkHeroPosition(){
    getMobs().forEach(el => {
      if (
        getHeroCoord().x + 50 > parseInt( el.style.left.split('px')[0].trim() ) && getHeroCoord().x - 50 < parseInt( el.style.left.split('px')[0].trim() )
        &&
        getHeroCoord().y + 50 > parseInt( el.style.top.split('px')[0].trim() ) && getHeroCoord().y - 50 < parseInt( el.style.top.split('px')[0].trim() )
          ) {
        el.click();
      }
    });
  }

  // function checkHeroPosition(){
  //   const MyHero = document.querySelector('.mmp-hero');
  //   const mob = document.querySelectorAll('.mmp-mob')[0];
  //   const stepLength = 20; // px

  //   let interval = setInterval(() => {

  //     if( mob ){

  //       if ( 
  //         parseInt( MyHero.style.top.split(/[px .]/)[0] ) >= parseInt( mob.style.top.split(/[px .]/)[0] ) - stepLength 
  //             &&
  //         parseInt( MyHero.style.top.split(/[px .]/)[0] ) <= parseInt( mob.style.top.split(/[px .]/)[0] ) + stepLength
  //             &&
  //         parseInt( MyHero.style.left.split(/[px .]/)[0] ) >= parseInt( mob.style.left.split(/[px .]/)[0] ) - stepLength
  //             &&
  //         parseInt( MyHero.style.left.split(/[px .]/)[0] ) <= parseInt( mob.style.left.split(/[px .]/)[0] ) + stepLength
  //       ) {
  //         console.log('attack')
  //         clearInterval(interval);

  //         attackMob();
  //       }

  //     }
        
  //   }, 2000);
  // }

  function GoToMobAndAttack(){
    goToMob();
    checkHeroPosition();
  }

  function bot(){
    autoFight();
    closeFight();
    

    let interval = setInterval(() => {
      GoToMobAndAttack();
    }, 5000);
  }

// \/\/\/\/ start stop bot statement \/\/\/\/
  chrome.storage.sync.get(['botStatus'], (botStats)=> {
    console.log('bot status: ', botStats.botStatus)
    if( botStats.botStatus == true ){
      bot();
      console.log('Bot run automaticly.')
    }
  });

  document.querySelector('#start-bot').addEventListener('click', ()=>{
    console.log('start bot');

    chrome.storage.sync.get(['botStatus'], (botStats) => {
      let data = {
        'botStatus': true
      };
        
      chrome.storage.sync.set(data, function (){});
      bot();
    });
    
  });

  document.querySelector('#stop-bot').addEventListener('click', ()=> {
    console.log('stop bot');
    chrome.storage.sync.get(['botStatus'], (botStats) => {
      let data = {
        'botStatus': false
      };
        
      chrome.storage.sync.set(data, function (){});
      window.location.reload();
    });

  });
  // ^^^^ start stop bot statement ^^^^
}, 2000);
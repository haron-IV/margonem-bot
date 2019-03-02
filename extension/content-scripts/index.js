setTimeout(() => {
  // document.querySelectorAll('.mmp-gw'); przejscia. 0 element powinien byc wyjsciem (przejscia z minimapy)

  function goToMob(){
    let mobs = [];

    const lvl_range_min = 40; // this variable should be set in popup
    const lvl_range_max = 55; // this variable should be set in popup

    document.querySelectorAll('.mmp-mob').forEach(el => { //here can be add range if state

      if ( parseInt( el.getAttribute('tip').split('<span')[1].split('>')[1].split('lvl')[0].trim() ) ){
        if ( parseInt( el.getAttribute('tip').split('<span')[1].split('>')[1].split('lvl')[0].trim() ) >= lvl_range_min && parseInt( el.getAttribute('tip').split('<span')[1].split('>')[1].split('lvl')[0].trim() ) <= lvl_range_max ){
          mobs.push(el);
        }
      }

    });

    if( mobs[0] ){
      mobs[0].click(); // go to mob
    } else {
      console.log('Here is not mob');
      document.querySelectorAll('.mmp-gw')[document.querySelectorAll('.mmp-gw').length-1].click(); // portal for next map
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
    }, 3000);
  }

  function checkHeroPositionAndAttack(){
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

  function GoToMobAndAttack(){
    goToMob();
    checkHeroPositionAndAttack();
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
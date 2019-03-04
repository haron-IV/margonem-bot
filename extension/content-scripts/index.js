setTimeout(() => {
  // document.querySelectorAll('.mmp-gw'); przejscia. 0 element powinien byc wyjsciem (przejscia z minimapy)
  function heroPositon(){ //
    const hero = document.querySelector('.mmp-hero');
    
    const coord = {
      x: parseInt( hero.style.left.split(/[. px]/)[0] ), // hero left on minimap
      y: parseInt( hero.style.top.split(/[. px]/)[0] ),
      width: parseInt( hero.style.width.split(/[. px]/)[0] ),
      height: parseInt( hero.style.height.split(/[. px]/)[0] )
    }
    return coord;
  }

  function _range() {
    const rangeEl = document.querySelector('#range');
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

  function _mobs() {
    return document.querySelectorAll('.mmp-mob');
  }

  function mobsInRange(){
    const range = _range();
    const mobs = _mobs();
    let mobs_list = [];

    range.x_start = parseInt( document.querySelector('#range').style.left.split(/[. px]/)[0] );
    range.y_start = parseInt( document.querySelector('#range').style.top.split(/[. px]/)[0] );

    mobs.forEach(el => {
      const mob_left = parseInt( el.style.left.split(/[. px]/)[0] );
      const mob_top = parseInt( el.style.top.split(/[. px]/)[0] );

      if (
        !el.classList.contains('hidden') &&
        mob_left > range.x_start && 
        mob_left < range.x_start + range.width && 
        mob_top > range.y_start && 
        mob_top < range.y_start + range.height
      ){
        mobs_list.push(el);
      }
    });
    return mobs_list;
  }

  function goToMob(){
    let mobs = [];

    mobs = mobsInRange();

    if( mobs[0] ){
      mobs[0].click(); // go to mob
    } else {
      console.log('Here is not mob');
      // document.querySelectorAll('.mmp-gw')[document.querySelectorAll('.mmp-gw').length-1].click(); // portal for next map
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
      if ( document.querySelector('#autobattleButton') ) {
        document.querySelector('#autobattleButton').click(); 
      } 
    }, 1000);
  }

  function closeFight(){
    setInterval(() => {
      if ( document.querySelector('#battleclose') ) {
        document.querySelector('#battleclose').click();
      }
    }, 2000);
  }

  function checkHeroPositionAndAttack(){
    getMobs().forEach(el => {
      if (
        getHeroCoord().x + 50 > parseInt( el.style.left.split(/[. px]/)[0].trim() ) && getHeroCoord().x - 50 < parseInt( el.style.left.split(/[. px]/)[0].trim() )
        &&
        getHeroCoord().y + 50 > parseInt( el.style.top.split(/[. px]/)[0].trim() ) && getHeroCoord().y - 50 < parseInt( el.style.top.split(/[. px]/)[0].trim() )
        ) {
        el.click(); // attack
      }
    });
  }

  function bot(){
    autoFight();
    closeFight();
    
    let interval = setInterval(() => {
      goToMob();
    }, 5000);

    let interval2 = setInterval(() => {
      checkHeroPositionAndAttack();
    }, 2000);
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
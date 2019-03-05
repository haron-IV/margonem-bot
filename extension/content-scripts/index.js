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

  let stuckCounter = 0;
  function checkIfHeroIsStuck() {
    const hero = heroPositon();
    localStorage.setItem('hero_x', hero.x);
    localStorage.setItem('hero_y', hero.y);
    let isStuck = false;
    setTimeout(() => {
      if ( localStorage.getItem('hero_x') == hero.x && localStorage.getItem('hero_y') == hero.y ) {
        isStuck = true;
        stuckCounter++;
      } 

      if (stuckCounter >= _mobs().length ) {
        stuckCounter = 0;
        console.log('reset sutck counter');
      }

      if (isStuck === true){
        console.log('hero is stuck. Go to other mob');
        _mobs()[stuckCounter].click();
      }
    }, 5000);
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

  function _mobs() {
    return document.querySelectorAll('.mmp-mob');
  }

  function _portals(){
    return document.querySelectorAll('.mmp-gw');
  }

  function mobsInRange(){
    const range = _range('#range');
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
        // console.log(mobs_list)
      }
    });
    return mobs_list;
  }

  function checkIfHeroIsNearPortal(){
    const range = _range('#smallRange');
    const portals = _portals();
    let isNear = false;


    range.x_start = parseInt( document.querySelector('#smallRange').style.left.split(/[. px]/)[0] );
    range.y_start = parseInt( document.querySelector('#smallRange').style.top.split(/[. px]/)[0] );

    portals.forEach(el => {
      const mob_left = parseInt( el.style.left.split(/[. px]/)[0] );
      const mob_top = parseInt( el.style.top.split(/[. px]/)[0] );

      if (
        !el.classList.contains('hidden') &&
        mob_left > range.x_start && 
        mob_left < range.x_start + range.width && 
        mob_top > range.y_start && 
        mob_top < range.y_start + range.height
      ){
        console.log('hero is near the portal!');
        isNear = true;
      }
    });

    return isNear;
  }


  function goToMob(){
    let mobs = mobsInRange();
    let portals = _portals();

    if( mobs[0] ){
      mobs[0].click(); // go to mob
    } else {
      console.log('Here is not mob');
      portals[0].click();

      console.log(portals[0])

      setInterval(() => {
        if ( checkIfHeroIsNearPortal() === true ){
          goToMob();
          console.log('return to mob');
        }  
      }, 200);
      
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

  function checkFightStatus(){
    const battleStatus = document.querySelector('#battle').style.display;
    if ( battleStatus === 'none' || battleStatus === '' ) {
      // console.log('battle window is closed');
      return false;
    } else {
      // console.log('Battle window is open');
      return true;
    }
  }

  function closeFight(){
    if ( document.querySelector('#battleclose') ) {
      document.querySelector('#battleclose').click();
      console.log('close fight window')
    }
  }

  function checkHeroPositionAndAttack(){
    const battleState = document.querySelector('#battle').style.display;

    getMobs().forEach(el => {
      if (
        getHeroCoord().x + 50 > parseInt( el.style.left.split(/[. px]/)[0].trim() ) && getHeroCoord().x - 50 < parseInt( el.style.left.split(/[. px]/)[0].trim() )
        &&
        getHeroCoord().y + 50 > parseInt( el.style.top.split(/[. px]/)[0].trim() ) && getHeroCoord().y - 50 < parseInt( el.style.top.split(/[. px]/)[0].trim() )
        ) {
        
        if(battleState === "none" || battleState === "" ){
          el.click(); // attack
          console.log('attack')
        }
        
      }
    });
  }

  function bot(){
    autoFight();
    let letHeroWalk = true;

    let interval = setInterval(() => {
      //if fight window is closed run goToMob();
      //and if bot closed fight window after fight let the bot goToMob(); again

      checkIfHeroIsNearPortal();
      checkIfHeroIsStuck();
      
      if (checkFightStatus() === false ) { // if fight window is closed
        if ( letHeroWalk === true){
          goToMob();
          letHeroWalk = false;
        }
      } else {
        letHeroWalk = true;
        closeFight(); // if fight window is open bot close it.
      }

    }, 1000);  
    
    let interval2 = setInterval(() => {
      checkHeroPositionAndAttack();
    }, 700);
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
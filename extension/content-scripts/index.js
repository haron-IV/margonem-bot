setTimeout(() => {

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
      const mob_position = {
        left: parseInt( el.style.left.split(/[. px]/)[0] ),
        top: parseInt( el.style.top.split(/[. px]/)[0] )
      }

      if (
        !el.classList.contains('hidden') &&
        mob_position.left > range.x_start && 
        mob_position.left < range.x_start + range.width && 
        mob_position.top > range.y_start && 
        mob_position.top < range.y_start + range.height
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
      const portal_position = {
        left: parseInt( el.style.left.split(/[. px]/)[0] ),
        top: parseInt( el.style.top.split(/[. px]/)[0] )
      }

      if (
        !el.classList.contains('hidden') &&
        portal_position.left > range.x_start && 
        portal_position.left < range.x_start + range.width && 
        portal_position.top > range.y_start && 
        portal_position.top < range.y_start + range.height
      ){
        // console.log('hero is near the portal!');
        isNear = true;
      }
    });

    return isNear;
  }

  let go_to_portal_counter = 0;
  function goToPortal(){
    const data = {
      portals: _portals()
    }
    
    data.portals[go_to_portal_counter].click();
    console.log('Go to portal: ', data.portals[go_to_portal_counter]);

    let interval = setInterval(() => {
      if ( checkIfHeroIsNearPortal() === true ){
        goToMob(0);
        clearInterval(interval);
        console.log('return to mob');
      }
    }, 100);
    go_to_portal_counter++;
  }

  function goToMob(which){
    const data = {
      mobs: mobsInRange()
    }

    if( data.mobs[0] ){

      data.mobs[which].click(); // go to mob
      console.log(data.mobs[which])

    } else {
      console.log('Here is not mob');
      goToPortal();
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
    }, 1200);
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
    const data = {
      battleState: document.querySelector('#battle').style.display,
      hero: getHeroCoord(),
      mobs:  getMobs(),
      offset: 50
    }
    
    data.mobs.forEach(el => { 
      const mob = {
        x: parseInt( el.style.left.split(/[. px]/)[0].trim() ),
        y: parseInt( el.style.top.split(/[. px]/)[0].trim() )
      }

      if (
        data.hero.x + data.offset > mob.x && data.hero.x - data.offset < mob.x
        &&
        data.hero.y + data.offset > mob.y && data.hero.y - data.offset < mob.y
        ) {
        
        if(data.battleState === "none" || data.battleState === "" ){
          el.click(); // attack
          console.log('attack')
        }
        
      }
    });
  }

  function checkHeroIsStuck(){
    
  }

  let hero_is_stucked = false;
  function bot(){
    autoFight();
    
    let letHeroWalk = true;

    let interval = setInterval(() => {
      //if fight window is closed run goToMob();
      //and if bot closed fight window after fight let the bot goToMob(); again

      if (checkFightStatus() === false ) { // if fight window is closed
        if ( letHeroWalk === true){
          goToMob(0);
          letHeroWalk = false;

          
          const heroLast = getHeroCoord();

          setTimeout(() => {
            const heroActive = getHeroCoord();

            if (heroLast.x === heroActive.x && heroLast.y === heroActive.y){
              console.log('hero is stuck');
              goToPortal();
            }else {
              letHeroWalk = true;
            }
            
          }, 7000);
         
        }
      } else {
        hero_is_stucked = false;
        letHeroWalk = true;
        closeFight(); // if fight window is open bot close it.
      }

    }, 1700);
    
    let interval2 = setInterval(() => {
      checkHeroPositionAndAttack();
    }, 1300);
  }

  // \/\/\/\/ start stop bot statement \/\/\/\/ this function should be refactorized in future
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
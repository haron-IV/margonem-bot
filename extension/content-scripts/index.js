setTimeout(() => {

  function _range(el) {
    const rangeEl = document.querySelector(el);
    const range = {
      x: parseInt( rangeEl.style.transform.replace(/[translate px ()]/g, '').split(',')[0] ),
      y: parseInt( rangeEl.style.transform.replace(/[translate px ()]/g, '').split(',')[1] ),
      width: parseInt( rangeEl.style.width.split(/[. px]/)[0] ),
      height: parseInt( rangeEl.style.height.split(/[. px]/)[0] ),
      x_start: parseInt( rangeEl.style.transform.replace(/[translate px ()]/g, '').split(',')[0] ),
      y_start: parseInt( rangeEl.style.transform.replace(/[translate px ()]/g, '').split(',')[1] )
    }
    return range;
  }

  function _mobs() {
    return document.querySelectorAll('.mmp-mob');
  }

  function _portals(){
    return document.querySelectorAll('.mmp-gw');
  }

  function mobsInRange(which_range){
    const range = _range(which_range);
    const mobs = _mobs();
    let mobs_list = [];

    range.x_start = parseInt( document.querySelector(which_range).style.transform.replace(/[translate px ()]/g, '').split(',')[0] );
    range.y_start = parseInt( document.querySelector(which_range).style.transform.replace(/[translate px ()]/g, '').split(',')[1] );

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

  function getCoordNearestMob(mob){
    if(mob){
      const mob_coord = mob.getAttribute('tip').split(/[()]/)[1];
      console.log('Nearest mob coordinates: ', mob_coord);
      return mob_coord;
    }
  }

  function getNearestMob() {
    const mobs_in_range = mobsInRange('#range');
    const hero_coord = getMapHeroCoord();
    let distances = [];
    let nearest;

    mobs_in_range.forEach(el => {
      const distance_x = Math.abs(hero_coord.x - parseInt( el.style.left.split(/[. px]/)[0] ));
      const distance_y = Math.abs(hero_coord.y - parseInt( el.style.top.split(/[. px]/)[0] ));

      const distance = (distance_x * distance_x) + (distance_y * distance_y); // Here is pitagoras (a*a) + (b*b) = c*c / we need c value - it's our distance from mob to hero
      distances.push( Math.sqrt(distance) );
    });

    const min_distance = Math.min(...distances); // get minimal distance from mob to hero

    mobs_in_range.forEach(el => {
      const distance_x = Math.abs(hero_coord.x - parseInt( el.style.left.split(/[. px]/)[0] ));
      const distance_y = Math.abs(hero_coord.y - parseInt( el.style.top.split(/[. px]/)[0] ));

      const distance = Math.sqrt( (distance_x * distance_x) + (distance_y * distance_y) );

      if (distance === min_distance){ // check our nearest mob
        // console.log('nearest mob: ', el);
        nearest = el;
      } 
    });
    // checkIsMobInSmallRange( getCoordNearestMob(nearest) );
    return nearest;
  }

  function checkIfHeroIsNearPortal(){
    const range = _range('#smallRange');
    const portals = _portals();
    let isNear = false;

    range.x_start = parseInt( document.querySelector('#smallRange').style.transform.replace(/[translate px ()]/g, '').split(',')[0] );
    range.y_start = parseInt( document.querySelector('#smallRange').style.transform.replace(/[translate px ()]/g, '').split(',')[1] );

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
        if ( mobsInRange('#range')[0] ){
          goToMob(0);
          console.log('return to mob');
        } else {
          goToPortal();
          console.log('no more mob near you, go to next portal')
        }
        
        clearInterval(interval);
        
      }
    }, 100);
    go_to_portal_counter++;
  }

  function arrayContainsArray (superset, subset) {
    if (0 === subset.length || superset.length < subset.length) {
      return false;
    }
    for(var i = 0; i < subset.length; i++) {
      if(superset.indexOf(subset[i]) === -1) return false;
    }
    return true;
  }

  function getAllMobsWhichCantKill(){
    const all_mobs = _mobs();

    chrome.storage.sync.get(['black_list_mob'], (mobs) => {
      console.log('black list: ', mobs.black_list_mob);

      all_mobs.forEach( el => {
        let mob_coords = [];
        mob_coords.push( el.getAttribute('tip').split(/[()]/)[1] );

        if ( arrayContainsArray(mobs.black_list_mob, mob_coords) === true ) {
          console.log('bot hidden this mob cuz cant kill him. ', el)
          el.classList.add('hidden', 'hiddenFromBot');
        }
        
      });
    });

  }

  let nearest_mob_coord;
  function goToMob(which){ // here bot should check coordinates from black list.
    const data = {
      mobs: mobsInRange('#range')
    }

    const nearest = getNearestMob();

    if( data.mobs[0] ){
      nearest.click();
      nearest_mob_coord = getCoordNearestMob(nearest);
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


  function getMapHeroCoord(){
    const hero = {
      x: parseInt( document.querySelector('.mmp-hero').style.left.split('px')[0].trim() ),
      y: parseInt( document.querySelector('.mmp-hero').style.top.split('px')[0].trim() )
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

      if (el.getAttribute('tip') != null) {
        if (
          data.hero.x + data.offset > mob.x && data.hero.x - data.offset < mob.x
          &&
          data.hero.y + data.offset > mob.y && data.hero.y - data.offset < mob.y
          &&
          el.getAttribute('tip').split('lvl').length > 1        
          
          ) {
          console.log('attacked el classlist: ', el.getAttribute('tip'))
  
          if(data.battleState === "none" || data.battleState === ""){
            el.click(); // attack mob
            getAllMobsWhichCantKill(); // check black list and refresh black list
            console.log('attack')
          }
            
        }
      }
    });
  }

  function check_if_black_list_mob_is_created() {
    chrome.storage.sync.get(['black_list_mob'], (mobs) => {
      if (!mobs.black_list_mob){

        const data = {
          data: []
        }
        
        chrome.storage.sync.set({'black_list_mob': data });
      }
    } );
  }
  check_if_black_list_mob_is_created();

  function bot(){
    autoFight();
    const map_name = document.querySelector('#botloc').getAttribute('tip');
    
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
              console.log('last nearest: ', nearest_mob_coord);

              chrome.storage.sync.get(['black_list_mob'], (mobs) => {
                console.log('mobs.black_list_mob: ', mobs.black_list_mob)

                console.log('----------------------------------')

                mobs.black_list_mob.data.push(nearest_mob_coord);

                // console.log('data for send: ', mobs.black_list_mob)

                let cleared = [...new Set(mobs.black_list_mob.data)];
                chrome.storage.sync.set({'black_list_mob': {data: cleared} });
              });

              goToPortal();
            } else {
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
}, 5000);
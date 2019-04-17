const expBot = {
  search_mobs_counter: 0
};
// document.querySelector('.mmp-visibility')

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

  function _rangeBot(el) { // this function do the smae as _range but for other element which should be get via top, left not transform
    const rangeEl = document.querySelector(el);
    const range = {
      x: parseInt( rangeEl.style.left.replace(/[translate px ()]/g, '') ),
      y: parseInt( rangeEl.style.top.replace(/[translate px ()]/g, '') ),
      width: parseInt( rangeEl.style.width.split(/[. px]/)[0] ),
      height: parseInt( rangeEl.style.height.split(/[. px]/)[0] ),
      x_start: parseInt( rangeEl.style.left.replace(/[translate px ()]/g, '')),
      y_start: parseInt( rangeEl.style.top.replace(/[translate px ()]/g, '') )
    }
    return range;
  }

  function _mobs() {
    return document.querySelectorAll('.mmp-mob, .mmp-elite');
  }

  function _portals(){
    return document.querySelectorAll('.mmp-gw');
  }

  function mobsInRange(which_range){
    let range;

    if (which_range === '#range' || which_range === '#smallRange') {
      range = _range(which_range);

      range.x_start = parseInt( document.querySelector(which_range).style.transform.replace(/[translate px ()]/g, '').split(',')[0] );
      range.y_start = parseInt( document.querySelector(which_range).style.transform.replace(/[translate px ()]/g, '').split(',')[1] );

    } else if (which_range === '#botRange'){
      range = _rangeBot(which_range);
      
      range.x_start = parseInt( document.querySelector(which_range).style.left.replace(/[translate px ()]/g, '') );
      range.y_start = parseInt( document.querySelector(which_range).style.top.replace(/[translate px ()]/g, '') );

      // console.log('bot range: ', range);
    } else if (which_range === '.mmpMap' ) {
      range = _rangeBot(which_range);
      
      range.x = 0;
      range.y = 0;
      range.width = parseInt( document.querySelector(which_range).style.width.split(/[. px]/)[0] );
      range.height = parseInt( document.querySelector(which_range).style.height.split(/[. px]/)[0] );
      range.x_start = 0;
      range.y_start = 0;
    }

    const mobs = _mobs();
    let mobs_list = [];

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
      // console.log('Nearest mob coordinates: ', mob_coord);
      return mob_coord;
    }
  }

  function getMapInfo(){
    const map = {
      width: parseInt( document.querySelector('.mmpMap').style.width.split(/[. px]/)[0] ),
      heigh: parseInt( document.querySelector('.mmpMap').style.height.split(/[. px]/)[0] )
    }
    return map;
  }

  function checkIfBotRangeIsAvailable(){

    if ( document.querySelector('#botRange') ){
      // console.log('bot range is available');

      const botRange = _rangeBot('#botRange');
      const map = getMapInfo();

      if ( botRange.width > map.width / 14 && botRange.height > map.heigh / 14 ){
        return true;
        // console.log('bot range have correct size');
      } else {
        // console.log('bot range havent correct size');
        return false;
      }
    } else {
      // console.log('bot range isnt available');
      return false;
    }
    
  }

  function hideOutsideMobsFromBotRange () {
    const mobsInBotRange = mobsInRange('#botRange');
    const allMobs = document.querySelectorAll('.mmp-mob, .mmp-elite');
    
    if (checkIfBotRangeIsAvailable() === true) {
      mobsInBotRange.forEach(el => {
        el.classList.add('bot-in-range');
      });

      allMobs.forEach(el => {
        if (el.classList.contains('bot-in-range') === false){
          el.classList.add('hidden');
        } 
      });
    }
  }

  function refreshHiddenMobsFromBotRange(){
    setInterval(()=>{
      hideOutsideMobsFromBotRange();
    }, 2000);
  }

  function checkMapFightStatus(){
    //"PvP wyłąc"
    // "Mapka PvP"
    //"PvP za zg"
    return document.querySelector('#pvpmode').getAttribute('tip').slice(0, 9);
}

  function getNearestMob() {
    let mobs_in_range;

    if (checkMapFightStatus() === 'Mapka PvP') {
      mobs_in_range = mobsInRange('#range');
    } else {
      mobs_in_range = mobsInRange('.mmpMap');
    }

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
    // console.log('nearest mob: ', nearest);
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
    // console.log('Go to portal: ', data.portals[go_to_portal_counter]);

    let interval = setInterval(() => {
      if ( checkIfHeroIsNearPortal() === true ){
        if ( mobsInRange('#range')[0] ){
          goToMob(0);
          // console.log('return to mob');
        } else {
          goToPortal();
          // console.log('no more mob near you, go to next portal')
        }
        
        clearInterval(interval);
        
      }
    }, 100);
    go_to_portal_counter++;

    if ( go_to_portal_counter >= data.portals.length-1 ) {
      go_to_portal_counter = 0;
    }
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
      // console.log('black list: ', mobs.black_list_mob.data);

      all_mobs.forEach( el => {
        let mob_coords = [];
        mob_coords.push( el.getAttribute('tip').split(/[()]/)[1] );

        if ( arrayContainsArray(mobs.black_list_mob.data, mob_coords) === true ) {
          // console.log('bot hidden this mob cuz cant kill him. ', el)
          el.classList.add('hidden', 'hiddenFromBot');
        }
        
      });
    });

  }

  let nearest_mob_coord;
  function goToMob(){ // here bot should check coordinates from black list.
    const data = {
      mobs: ''
    }

    if (checkFightStatus() === "mapka pvp") {
      data.mobs = mobsInRange('#range');
    } else {
      data.mobs = mobsInRange('.mmpMap');
    }

    const nearest = getNearestMob();

    if( data.mobs[0] ){
      nearest.click();
      nearest_mob_coord = getCoordNearestMob(nearest);
    } else {
      // console.log('Here is not mob');
      // goToPortal();
      searchMobs();
    }
  }

  function goToCoord (x, y) {
    document.querySelector('#coord-x').value = x;
    document.querySelector('#coord-y').value = y;
    setTimeout(() => {
      document.querySelector('#go-to-btn').click();    
    }, 500);
  }

  function getMapMaxCoord(){
    const map = {
      max_x: (document.querySelector('#ground').offsetWidth / 32 ) - 1,
      max_y: (document.querySelector('#ground').offsetHeight / 32 ) - 1,
    }

    return map;
  }

  function searchMobs(){
    // REFACTORIZE, find better solution
    const map = getMapMaxCoord();

    const corners = [
      {x: 0, y: 0},//left top
      {x: map.max_x, y: 0},//right top
      {x: map.max_x, y: map.max_y},//right bottom
      {x: 0, y: map.max_y},//left bottom
      {x: Math.floor( map.max_x / 2 ), y: Math.floor( map.max_y / 2 ) }// middle of the map
      //here is place for center coordinates
    ];

    switch(expBot.search_mobs_counter){
      case 0:
        goToCoord(corners[0].x, corners[0].y);
      break;

      case 1:
        goToCoord(corners[1].x, corners[1].y);
      break;

      case 2:
        goToCoord(corners[2].x, corners[2].y);
      break;

      case 3:
        goToCoord(corners[3].x, corners[3].y);
      break;

      case 4:
        goToCoord(corners[4].x, corners[4].y);
        expBot.search_mobs_counter = 0;
      break;
    }

    // console.log('counter corners: ', expBot.search_mobs_counter)

    expBot.search_mobs_counter++;
  }

  // function checkIfHeroIsNearCoords(x, y){
  //   const heroCoord = getHeroCoordinatesOnMap();
  //   if (heroCoord.x >= x - 2 && heroCoord.x <= x + 2 && heroCoord.y >= y - 2 && heroCoord.y <= x + 2) {
  //     return true;
  //   }
  // }

  function getHeroCoordinatesOnMap(){
    const coords = {
      x: parseInt( document.querySelector('#botloc').innerHTML.split(',')[0] ),
      y: parseInt( document.querySelector('#botloc').innerHTML.split(',')[1] )
    }
    return coords;
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
      // console.log('close fight window')
    }
  }

  function checkHeroPositionAndAttack(){
    const data = {
      battleState: document.querySelector('#battle').style.display,
      hero: getHeroCoord(),
      mobs:  getMobs(),
      offset: 50,
      dialogWindow: document.querySelector('#dialog'),
      dialogLineExit: document.querySelector('.LINE_EXIT')
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
          // console.log('attacked el classlist: ', el.getAttribute('tip'))
  
          if(data.battleState === "none" || data.battleState === ""){
           

            if (data.dialogWindow.style.display === 'block') {
              data.dialogLineExit.click();
              // console.log('-EXIT DIALOG-')
            } else {
              getAllMobsWhichCantKill(); // check black list and refresh black list
              el.click(); // attack mob
              // console.log('attack')
            }
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

  function setBotRangeFromLastPosition(){
    chrome.storage.sync.get(['last_botRange_style'], (bot) => {
      setTimeout(() => {
        document.querySelector('#botRange').setAttribute('style', bot.last_botRange_style);
        refreshHiddenMobsFromBotRange();
      }, 500);
    });
  }

  function bot(){
    autoFight();
    getAllMobsWhichCantKill();
  
    if (checkIfBotRangeIsAvailable() === true){
      // console.log('hide mobs which are out of bot range');
      refreshHiddenMobsFromBotRange();

    } else {
      // console.log('bot cant see botRange so added it from last data')
      // setBotRangeFromLastPosition();
    }
    
    // const map_name = document.querySelector('#botloc').getAttribute('tip');
    
    let letHeroWalk = true;

    let interval = setInterval(() => {
      //if fight window is closed run goToMob();
      //and if bot closed fight window after fight let the bot goToMob(); again

      if (checkFightStatus() === false ) { // if fight window is closed
        if ( letHeroWalk === true){
          goToMob();
          letHeroWalk = false;

          const heroLast = getHeroCoord();

          setTimeout(() => {
            const heroActive = getHeroCoord();

            if (heroLast.x === heroActive.x && heroLast.y === heroActive.y){
              // console.log('hero is stuck');
              // console.log('last nearest: ', nearest_mob_coord);

              chrome.storage.sync.get(['black_list_mob'], (mobs) => {
                // console.log('mobs.black_list_mob: ', mobs.black_list_mob)

                // console.log('----------------------------------')

                mobs.black_list_mob.data.push(nearest_mob_coord);

                let cleared = [...new Set(mobs.black_list_mob.data)];
                chrome.storage.sync.set({'black_list_mob': {data: cleared} });
              });

              // goToPortal();
              searchMobs();
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
    }, 1000);
  }

  // \/\/\/\/ start stop bot statement \/\/\/\/ this function should be refactorized in future

  function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {

          chrome.storage.sync.get(['botStatus'], (botStats)=> {
            // console.log('bot status: ', botStats.botStatus);

            if( botStats.botStatus == true ){
              bot();
              // console.log('Bot run automaticly.');
            }
          });

          clearInterval(interval);
        }
    }, 1000);
  }

  checkIsGameLoaded();


  document.querySelector('#start-bot').addEventListener('click', ()=>{
    // console.log('start bot');

    chrome.storage.sync.get(['botStatus'], (botStats) => {
      const data = {
        'botStatus': true
      };
        
      chrome.storage.sync.set(data, function (){ console.log('botStatus after set state: ', data )});
      bot();
    });
    
  });

  document.querySelector('#stop-bot').addEventListener('click', ()=> {
    // console.log('stop bot');
    chrome.storage.sync.get(['botStatus'], (botStats) => {
      let data = {
        'botStatus': false
      };
        
      chrome.storage.sync.set(data, function (){});
      setTimeout(() => {
        window.location.reload();  
      }, 1000);
      
    });

  });
  // ^^^^ start stop bot statement ^^^^
}, 2000);
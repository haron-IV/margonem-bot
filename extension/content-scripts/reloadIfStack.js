setInterval(() => {

    chrome.storage.sync.get(['lastLocalizationCoord', 'botStatus'], (botStats) => {
        if(botStats.botStatus === true &&  botStats.lastLocalizationCoord ===  document.querySelector('#botloc').innerHTML ){
            console.log('Reload beacuse your hero is stuck.')
            window.location.reload();
        }
    });
    
}, 8000); // 30s



// function heroPositon(){
//     const hero = document.querySelector('.mmp-hero');
    
//     const coord = {
//         x: parseInt( hero.style.left.split(/[. px]/)[0] ), // hero left on minimap
//         y: parseInt( hero.style.top.split(/[. px]/)[0] ),
//     }
//     return coord;
// }

// let last_x, last_Y;

// function heroPositonLast(){
//     last_x = heroPositon().x;
//     last_y = heroPositon().y;
// }

// setTimeout(() => {
//     setInterval(() => {
//         heroPositonLast();
//         console.log('update last position')
//     }, 10000);

//     setInterval(() => {
        
//         if ( heroPositon().x === last_x && heroPositon().y === last_Y){
//             console.log('hero is stuck')
//         } 
        
//     }, 1000);
// }, 3000);





////////////////



// function heroLastPosition(){
  //   setInterval(() => {
  //     const hero = heroPositon();
  //     localStorage.setItem('hero_x', hero.x);
  //     localStorage.setItem('hero_y', hero.y);  
  //   }, 10000);
  // }
  // heroLastPosition();

  // let stuckCounter = 0;
  // function checkIfHeroIsStuck() {
  //   let isStuck = false;

  //   setInterval(() => {
  //     const hero = heroPositon();

  //     if ( localStorage.getItem('hero_x') == hero.x && localStorage.getItem('hero_y') == hero.y ) {
  //       isStuck = true;
  //       stuckCounter++;
  //     } 

  //     if (stuckCounter >= _mobs().length ) {
  //       stuckCounter = 0;
  //       console.log('reset sutck counter');
  //     }

  //     if (isStuck === true){
  //       console.log('hero is stuck. Go to other mob');
  //       _mobs()[stuckCounter].click();
  //       isStuck = false;
  //     }
  //   }, 1500);
  // }
// setTimeout(() => {
//     let interval = null;

//     interval = setInterval(() => {
//         const npcs = document.querySelectorAll('.npc');
        
//         npcs.forEach(el => {
//             if( el.getAttribute('tip').split('elita').length >= 2 ) {
//                 console.log('here is a elite', el);
//                 el.click();
//                 clearInterval(interval);
//                 autoFight();
//                 closeFight();
//                 reload();
//             }
//         });
        
//     }, 500);

//     function autoFight(){
//         setInterval(() => {
//           document.querySelector('#autobattleButton').click(); 
//         }, 3000);
//     }
    
//     function closeFight(){
//         setInterval(() => {
//             if ( document.querySelector('#battleclose') ) {
//                 document.querySelector('#battleclose').click();
//             }
//         }, 5500);
//     }

//     function reload(){
//         setTimeout(() => {
//             window.location.reload()
//         }, 7000);
//     }
// }, 2000);
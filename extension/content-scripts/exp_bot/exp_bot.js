import checkIsGameLoaded from '../checkIsGameLoaded';

const exp_bot = () => {
    const exp_bot_data = {
        is_game_loaded: false
    };

    const interval = setInterval(() => {
        if ( checkIsGameLoaded() === true ){
            exp_bot_data.is_game_loaded = true;
            console.log('Game loaded.');

            clearInterval(interval);
        }
    }, 1000);
};




export default exp_bot;
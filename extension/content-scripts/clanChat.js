const emoji_config = {
    size: 13,
    nickname: '',
    chat_length: 0,
    all_emojis: [
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Slightly_Smiling_Face_Emoji_Icon_60x60.png?16228697460559734940',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Smiling_Face_Emoji_Icon.png?16228697460559734940',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Tears_of_Joy_Emoji_Icon_60x60.png?14173495976923716614',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Unamused_Face_Emoji_Icon_60x60.png?7614083643283495824',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Tongue_Out_Emoji_with_Tightly_Closed_Eyes_Icon_60x60.png?7614083643283495824',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Tongue_Out_Emoji_with_Winking_Eye_Icon_60x60.png?7614083643283495824',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Sunglasses_Emoji.png?2976903553660223024',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Wink_Emoji_60x60.png?2976903553660223024',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Blow_Kiss_Emoji.png?8026536574188759287',
        'https://cdn.shopify.com/s/files/1/1061/1924/files/Growing_Pink_Heart_Emoji_Icon_60x60.png?16285229369325405128'
    ]
};

const notification_sound = new Audio('https://notificationsounds.com/soundfiles/1728efbda81692282ba642aafd57be3a/file-sounds-1101-plucky.mp3');

const emoticons = [
    {text: ':)',
    emoji_img: `<img src="${emoji_config.all_emojis[0]}" width="${emoji_config.size}">`},

    {text: ':D',
    emoji_img: `<img src="${emoji_config.all_emojis[1]}" width="${emoji_config.size}">`},

    {text: ':d',
    emoji_img: `<img src="${emoji_config.all_emojis[1]}" width="${emoji_config.size}">`},

    {text: ';D',
    emoji_img: `<img src="${emoji_config.all_emojis[1]}" width="${emoji_config.size}">`},

    {text: ';d',
    emoji_img: `<img src="${emoji_config.all_emojis[1]}" width="${emoji_config.size}">`},

    {text: 'hahaha',
    emoji_img: `<img src="${emoji_config.all_emojis[2]}" width="${emoji_config.size}">`},

    {text: ':(',
    emoji_img: `<img src="${emoji_config.all_emojis[3]}" width="${emoji_config.size}">`},

    {text: ':p',
    emoji_img: `<img src="${emoji_config.all_emojis[4]}" width="${emoji_config.size}">`},

    {text: ':P',
    emoji_img: `<img src="${emoji_config.all_emojis[4]}" width="${emoji_config.size}">`},

    {text: ';p',
    emoji_img: `<img src="${emoji_config.all_emojis[5]}" width="${emoji_config.size}">`},

    {text: ';P',
    emoji_img: `<img src="${emoji_config.all_emojis[5]}" width="${emoji_config.size}">`},

    {text: ':B',
    emoji_img: `<img src="${emoji_config.all_emojis[6]}" width="${emoji_config.size}">`},

    {text: ';)',
    emoji_img: `<img src="${emoji_config.all_emojis[7]}" width="${emoji_config.size}">`},

    {text: ';*',
    emoji_img: `<img src="${emoji_config.all_emojis[8]}" width="${emoji_config.size}">`},

    {text: ':*',
    emoji_img: `<img src="${emoji_config.all_emojis[8]}" width="${emoji_config.size}">`}
];

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            emoji();
            colors();
            clearInterval(interval);
        }
    }, 1000);
} checkIsGameLoaded();

var targetNode = document.querySelector("#chattxt");
var observerOptions = {
  childList: true,
  attributes: true,
  subtree: true
}

var observer = new MutationObserver(checkChatNewMaessages);
observer.observe(targetNode, observerOptions);


function checkChatNewMaessages(mutationList) {
    mutationList.forEach((mutation) => {
        switch(mutation.type) {
            case 'childList':
                emoji();
                colors();
                playNotificationSound(mutation);
            break;
        }
    });
}

function colors() {
    emoji_config.nickname = document.querySelector('#nick').innerText.split('·')[0].trim();

    document.querySelectorAll('.chnick').forEach(el => {
        if ( el.innerText.includes(emoji_config.nickname) ){
            if(el.innerText.split(`«${emoji_config.nickname}»`).length > 1 || el.innerText.split(`«${emoji_config.nickname} ->`).length > 0){
                el.style.color ="#b3d9ff";
            }

            if (el.innerText.includes(`-> ${emoji_config.nickname}`)){
                el.style.color = "#2090FE";
            }
        }
    });
}

function emoji(){
    const all_messages = [].slice.call(document.querySelectorAll(".chatmsg"));

    const newest_messages = all_messages.slice(emoji_config.chat_length-1, all_messages.length+1);

    if (newest_messages.length >= 1){
        newest_messages.forEach( messsage => {

            emoticons.forEach(emoji => {
    
                if ( messsage.innerText.includes(emoji.text) ){
                    const splitted_message = messsage.innerHTML.split(emoji.text).filter(el => {return el != ''});
                    
                    let message_with_emoji = '';
    
                    splitted_message.forEach(el => {
                        message_with_emoji += `${el} ${emoji.emoji_img}`;
                    });
    
                    if (message_with_emoji.length === 0) {
                        message_with_emoji = emoji.emoji_img;
                    }
    
                    messsage.innerHTML = message_with_emoji;
                }
    
            });
    
        });
    }
}

function playNotificationSound(mutation){
    if (mutation.addedNodes[0] && mutation.addedNodes[0].childNodes[0] && mutation.addedNodes[0].childNodes[0].innerText && mutation.addedNodes[0].childNodes[0].innerText.split('->')[1]){
        if ( mutation.addedNodes[0].childNodes[0].innerText.split('->')[1].trim() === `${emoji_config.nickname}»`){
            notification_sound.play();
        }
    }
}
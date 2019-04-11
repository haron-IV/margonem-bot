const emoji_config = {
    size: 13,
    nickname: '',
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

const emoticons = [
    {text: ':)',
    emoji_img: `<img src="${emoji_config.all_emojis[0]}" width="${emoji_config.size}">`},

    {text: ':D',
    emoji_img: `<img src="${emoji_config.all_emojis[1]}" width="${emoji_config.size}">`},

    {text: 'hahaha',
    emoji_img: `<img src="${emoji_config.all_emojis[2]}" width="${emoji_config.size}">`},

    {text: ':(',
    emoji_img: `<img src="${emoji_config.all_emojis[3]}" width="${emoji_config.size}">`},

    {text: ':p',
    emoji_img: `<img src="${emoji_config.all_emojis[4]}" width="${emoji_config.size}">`},

    {text: ';p',
    emoji_img: `<img src="${emoji_config.all_emojis[5]}" width="${emoji_config.size}">`},

    {text: ':B',
    emoji_img: `<img src="${emoji_config.all_emojis[6]}" width="${emoji_config.size}">`},

    {text: ';)',
    emoji_img: `<img src="${emoji_config.all_emojis[7]}" width="${emoji_config.size}">`},

    {text: ';*',
    emoji_img: `<img src="${emoji_config.all_emojis[8]}" width="${emoji_config.size}">`},

    {text: '<3',
    emoji_img: `<img src="${emoji_config.all_emojis[9]}" width="${emoji_config.size}">`},
];

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            init_clanchat();
            emoji();
            clearInterval(interval);
        }
    }, 1000);
} checkIsGameLoaded();

function init_clanchat() {
    emoji_config.nickname = document.querySelector('#nick').innerText.split('·')[0].trim();

    document.querySelectorAll('.chnick').forEach(el => {
        if ( el.innerText.includes(emoji_config.nickname) ){
            if(el.innerText.split(`«${emoji_config.nickname}»`).length > 1 || el.innerText.split(`«${emoji_config.nickname} ->`).length > 0){
                el.style.color ="#2090FE"
            } else if (el.innerText.includes(`-> ${emoji_config.nickname}`)){
                el.style.color = "#2070FE"
            }
        }
    });
}

function emoji(){
    document.querySelectorAll('.chatmsg').forEach( messsage => {

        emoticons.forEach(emoji => {

            if ( messsage.innerText.includes(emoji.text) ){
                const splitted_message = messsage.innerHTML.split(emoji.text).filter(el => {return el != ''});
                
                let message_with_emoji = '';

                splitted_message.forEach(el => {
                    message_with_emoji += `${el} ${emoji.emoji_img}`;
                });

                if (message_with_emoji.length === 0) {
                    message_with_emoji = emoji.emoji_img;
                    console.log('dsa')
                }

                messsage.innerHTML = message_with_emoji;
            }

        });

    });
}
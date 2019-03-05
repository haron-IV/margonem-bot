const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

let nick = '';

document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('other')){
        nick = e.target.getAttribute('tip').split(/[> <]/)[2];
        copyToClipboard(nick)
    }
});


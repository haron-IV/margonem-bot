const myHero = document.querySelector('#hero')

const stamina_bar = document.createElement('div');

stamina_bar.id = "stamina-bar";

stamina_bar.style.width = "100%";
stamina_bar.style.position = "absolute";
stamina_bar.style.top = '-20px';
stamina_bar.style.left = "0";
stamina_bar.style.color = "red";
stamina_bar.style.fontSize = '11px';
stamina_bar.innerText = "stamina"

myHero.appendChild(stamina_bar);
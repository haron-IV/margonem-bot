!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);var n=function(){return"none"===document.querySelector("#loading").style.display},r=function(){var t={wrapper:document.createElement("div"),startBotButton:document.createElement("button"),stopBotButton:document.createElement("button"),eliteBotButtonStart:document.createElement("button"),eliteBotButtonStop:document.createElement("button"),toggleButton:document.querySelector("#nick"),toggleState:!1};t.wrapper.id="bot-interface-wrapper",t.wrapper.classList.add("bot-interface-wrapper"),t.startBotButton.id="start-bot",t.startBotButton.classList.add("start-bot","bot-button"),t.startBotButton.innerHTML="start",t.wrapper.appendChild(t.startBotButton),t.stopBotButton.id="stop-bot",t.stopBotButton.classList.add("stop-bot","bot-button"),t.stopBotButton.innerHTML="stop",t.wrapper.appendChild(t.stopBotButton),t.toggleButton.classList.add("toggle-button"),t.toggleButton.addEventListener("click",function(){chrome.storage.sync.get(["interface_state"],function(e){void 0===e.interface_state?chrome.storage.sync.set({interface_state:!1}):!0===e.interface_state?(t.wrapper.style.top="-50px",chrome.storage.sync.set({interface_state:!1})):!1===e.interface_state&&(t.wrapper.style.top="0",chrome.storage.sync.set({interface_state:!0}))})}),document.querySelector("body").appendChild(t.wrapper),t.startBotButton.addEventListener("click",function(){t.startBotButton.classList.add("active-button"),t.stopBotButton.classList.remove("active-button")}),t.stopBotButton.addEventListener("click",function(){t.startBotButton.classList.remove("active-button"),t.stopBotButton.classList.add("active-button")}),chrome.storage.sync.get(["botStatus","interface_state"],function(e){!0===e.botStatus?t.startBotButton.classList.add("active-button"):t.stopBotButton.classList.add("active-button"),!0===e.interface_state?t.wrapper.style.top="0px":!1===e.interface_state&&(t.wrapper.style.top="-50px")})},a=function(){var t={};chrome.storage.sync.get(["settingsData"],function(e){e.settingsData&&(t=e.settingsData)}),setTimeout(function(){!0===t.changed_fight_window&&(document.querySelector("#battlelog").classList.add("fightLog"),document.querySelector("#battle").classList.add("battle"))},250)};(function(){var t={is_game_loaded:!1},e=setInterval(function(){!0===n()&&(t.is_game_loaded=!0,console.log("Game loaded."),r(),a(),clearInterval(e))},1e3)})()}]);
//# sourceMappingURL=main.bundle.js.map
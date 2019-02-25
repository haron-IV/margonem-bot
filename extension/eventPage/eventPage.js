// chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
//     if ( request.todo === "showPageAction" ) {
//         chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//             let a = tabs[0].id;
//             console.log(a)
//             chrome.pageAction.show(a);
//         })
//     }
// } );

chrome.runtime.onMessage.addListener(notify);

function notify(message) {
  chrome.notifications.create({
    "type": "basic",
    "iconUrl": chrome.extension.getURL("link.png"),
    "title": "You clicked a link!",
    "message": message.url
  });
}
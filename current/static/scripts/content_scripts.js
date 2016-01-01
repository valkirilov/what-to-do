/*
 * Action: fired when a message is sent from either an extension process or a content script. 
 * Documentation: http://developer.chrome.com/extensions/runtime.html#event-onMessage
 */

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.action) {
    case 'context_menu':
      WhatToDoContentScripts.contextMenuAction(message.type, message.content);
      break;
    case 'update':
      break;
  }
});

var WhatToDoContentScripts = (function() {

  var contextMenuAction = function(type, message) {
    WhatToDoApp.init();
    WhatToDoApp.openWidget();
  };

  return {
    contextMenuAction: contextMenuAction
  }

})();
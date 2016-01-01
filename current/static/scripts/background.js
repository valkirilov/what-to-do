
var WhatToDoBackground = (function() {

	var init = function() {
		initContextMenuActions();
	};

	var initContextMenuActions = function() {

		/**
		 * Adding a new option to the right click context menu
		 */
		chrome.contextMenus.create({
		  "id": "what-to-do-context-menu",
		  "title": local("manifestContextActionButton"),
		  "contexts": ["page", "selection", "link"],
		  "onclick" : function(e) {

		    var url = e.pageUrl,
		    		title = e.pageTitle,
		        type, 
		        message;

		    if (e.linkUrl) {
		      // The user wants to save a link.
		      type = 'link';
		      message = {
		        url: e.linkUrl,
		        title: e.linkTitle,
		      };
		    }
		    else if (e.selectionText) {
		      // The user selected some text, put this in the message.
		      type = 'text';
		      message = {
		        text: encodeURI(e.selectionText)
		      };
		    }
		    else {
		      type = 'page';
		      message = {
		        url: url,
		        title: title
		      };
		    }

		    // Get the current tab
		    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		      // Send message to the tab
		      message.title = tabs[0].title;
		      chrome.tabs.sendMessage(tabs[0].id, { 
		        action: 'context_menu', 
		        type: type, 
		        content: message, 
		      });
		    });

		  }
		});

	};

	return {
		init: init
	};

})();

WhatToDoBackground.init();
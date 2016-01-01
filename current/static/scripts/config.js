
var WhatToDoConfig = {
	app: {
		id: 'what-to-do-extension-123456789'
	}
}


/**
 * Get i18n string
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
function local(param) {
  return chrome.i18n.getMessage(param);
}

/**
 * Short allias for a function which is adding a class name to a specific element
 * @param {HtmlElement}
 * @param {string}
 */
function addClass(element, className) {
  if (element.className.indexOf(className) > -1) {
    return;
  }

  element.className += ' ' + className;
}

/**
 * Short allias for a function which is removing a class name to a specific element
 * @param {HtmlElement}
 * @param {string}
 */
function removeClass(element, className) {
  if (element.className.indexOf(className) === -1) {
    return;
  }

  element.className = element.className.replace(new RegExp(className, 'g'), '');
}

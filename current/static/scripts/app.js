
var WhatToDoApp = (function() {

	var isInitialized = false;
	var mainElement;

	var init = function() {

		if (isInitialized)
			return;

		generateMarkup();
		publicActions();

		isInitialized = true;
	};

	var generateMarkup = function() {

		mainElement = document.createElement('div');
		mainElement.setAttribute('id', WhatToDoConfig.app.id);

		// Main content element
		var mainContentElement = document.createElement('div');
		mainContentElement.setAttribute('class', 'wtd-content');
		mainElement.appendChild(mainContentElement);

		// Header element
		var headerElement = generateMarkupHeader();
		mainContentElement.appendChild(headerElement);		
	
		// Body element
		var bodyElement = generateMarkupBody();
		mainContentElement.appendChild(bodyElement);		
		
		// Footer element

		document.body.appendChild(mainElement);

	};

	var generateMarkupHeader = function() {
		var headerElement = document.createElement('div');
		headerElement.setAttribute('class', 'wtd-header');

		// Logo element
		var logoElement = document.createElement('img');
		logoElement.setAttribute('class', 'wtd-logo');
		logoElement.setAttribute('src', chrome.extension.getURL('static/images/app/logo.png'));

		// Close element
		var closeElement = document.createElement('a');
		closeElement.setAttribute('class', 'wtd-close');
		closeElement.innerHTML = '&#10006;';

		headerElement.appendChild(logoElement);
		headerElement.appendChild(closeElement);

		return headerElement;
	};

	var generateMarkupBody = function() {
		var bodyElement = document.createElement('div');
		bodyElement.setAttribute('class', 'wtd-body');

		var newOptionElement = document.createElement('div');
		newOptionElement.setAttribute('class', 'wtd-new-option');

		var newOptionInputElement = document.createElement('input');
		addClass(newOptionInputElement, 'wtd-input');
		addClass(newOptionInputElement, 'wtd-new-option-input');

		var newOptionButtonElement = document.createElement('button');
		addClass(newOptionButtonElement, 'wtd-button');
		addClass(newOptionButtonElement, 'wtd-new-option-button');
		newOptionButtonElement.innerHTML = "Add";

		newOptionElement.appendChild(newOptionInputElement);
		newOptionElement.appendChild(newOptionButtonElement);
		bodyElement.appendChild(newOptionElement);

		return bodyElement;
	}

	var publicActions = function() {

		mainElement.querySelector('.wtd-header .wtd-close').addEventListener('click', function() {
			closeWidget();
		}, false);

	};

	var openWidget = function() {
		addClass(mainElement, 'opened');
		removeClass(mainElement, 'closed');
	};

	var closeWidget = function() {
		addClass(mainElement, 'closed');
		removeClass(mainElement, 'opened');
	};

	return {
		init: init,

		openWidget: openWidget,
		closeWidget: closeWidget
	};

})();
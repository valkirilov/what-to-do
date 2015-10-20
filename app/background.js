chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('what-to-do/app/index.html', {
    'outerBounds': {
      'width': 800,
      'height': 600
    }
  });
});
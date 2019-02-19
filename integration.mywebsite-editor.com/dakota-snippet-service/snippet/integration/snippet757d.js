function mws_require(file, callback, extraAttrs) {
  var head = document.getElementsByTagName("head")[0];

  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';

  if (extraAttrs) {
    for (var attr in extraAttrs) {
      if (extraAttrs.hasOwnProperty(attr)) {
        script[attr] = extraAttrs[attr];
      }
    }
  }

  if (callback) {
    //real browsers
    script.onload = callback;
    //Internet explorer
    script.onreadystatechange = function() {
      if (this.readyState == 'complete') {
        callback();
      }
    }
  }

  head.appendChild(script);
}

function trackPerformance() {
  //uuid to some number
  var uuidAsSumOfItsCharacters = 0;
  for (var i = 0; i < ''.length; i++) {
    uuidAsSumOfItsCharacters+=''.charCodeAt(i);
  }
  if (
    window.perfBar
    // if config is set, then init was already run, so avoid tracking twice
    && !window.perfBar.config && (uuidAsSumOfItsCharacters % 100 < 20)
  ) {
    window.perfBar.init({
      websiteId: '',
      mode: 'dakota_',
      type: 'page',
      lazy: false,
      url: 'https://tracking.mywebsite-editor.com/tracking'
    });
    window.perfBar.waitAndSend(10);
  };
}

mws_require("//integration.mywebsite-editor.com/dakota-snippet-service/snippet/integration/js/perfbar.js", function() {
  trackPerformance();
});



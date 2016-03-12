console.log('loaded home..');

var iframes = iFrameResize({
  log: true,
  resizedCallback: function(messageData) {
    console.log(messageData);
  },
  messageCallback: function(messageData) {
    console.log(messageData);
  },
  closedCallback: function(messageData) {
    console.log(messageData);
  },
  heightCalculationMethod: 'max'
});

function addClickHandlersForClassName(clickHandler, className) {
  var clickElements = document.getElementsByClassName(className);

  for (var i = 0; i < clickElements.length; i++) {
    var clickElement = clickElements[i];
	  // Android 2.2 needs FastClick to be instantiated before the other listeners so that the stopImmediatePropagation hack can work.
	  FastClick.attach(clickElement);
		clickElement.addEventListener('touchend', clickHandler, false);
		clickElement.addEventListener('click', clickHandler, false);
  }
}

function addClickHandlerForId(clickHandler, id) {
  var clickElement = document.getElementById(id);
  // Android 2.2 needs FastClick to be instantiated before the other listeners so that the stopImmediatePropagation hack can work.
  FastClick.attach(clickElement);
	clickElement.addEventListener('touchend', clickHandler, false);
	clickElement.addEventListener('click', clickHandler, false);
}

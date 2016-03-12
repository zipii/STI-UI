function handleStepClick(event) {
  // alert('TODO: prepare warning modal');
  return true;
}

window.addEventListener('load', function() {
  var steps = document.getElementsByClassName('questions-form__header__navigation__step__content')
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
	  // Android 2.2 needs FastClick to be instantiated before the other listeners so that the stopImmediatePropagation hack can work.
	  FastClick.attach(step);
		step.addEventListener('touchend', handleStepClick, false);
		step.addEventListener('click', handleStepClick, false);
  }
}, false);

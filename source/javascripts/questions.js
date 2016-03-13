function handleStepClick(event) {
  // alert('TODO: prepare warning modal, submit in background?!');
  console.log(event);
  return true;
}

addClickHandlersForClassName(handleStepClick, 'questions-form__header__navigation__step__content');

function handleExpandArrowClick(event) {
  console.log(event);
  var $clickedElement = $(event.target);
  $clickedElement.parent().parent()
    .siblings('div.text-muted').first()
    .slideToggle(function() {
      $clickedElement.toggleClass('fa-caret-down');
      $clickedElement.toggleClass('fa-caret-up');
    });
  return true;
}

addClickHandlersForClassName(handleExpandArrowClick, 'expand-arrow');

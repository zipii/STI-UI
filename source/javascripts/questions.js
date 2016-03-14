function handleStepClick(event) {
  // alert('TODO: prepare warning modal, submit in background?!');
  console.log(event);
  return true;
}

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

if (typeof handleLanguageSelect != 'undefined') {
  function handleLanguageSelect(event) {
    console.log('LANGUAGE SELECT');
    return true;
  }
}

if (typeof handleCountrySelect != 'undefined') {
  function handleCountrySelect(event) {
    console.log('COUNTRY SELECT');
    return true;
  }
}

$(document).ready(function() {
  addClickHandlersForClassName(handleStepClick, 'questions-form__header__navigation__step__content');
  addClickHandlersForClassName(handleExpandArrowClick, 'expand-arrow');
  addClickHandlersForClassName(handleLanguageSelect, 'select-picker');
  // the passed handler functions must be prepended globally
  $('#questions-form__header__locality__language__select').on('changed.bs.select', handleLanguageSelect);
  $('#questions-form__header__locality__country__select').on('changed.bs.select', handleCountrySelect);
});

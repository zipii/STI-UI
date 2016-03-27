function handleStepClick(event) {
  // alert('TODO: prepare warning modal, submit in background?!');
  console.log(event);
  return true;
}

function handleExpandArrowClick(event) {
  console.log(event);
  event.preventDefault();
  var $clickedElement = $(event.target);
  console.log($clickedElement.parent().parent())
  if ($clickedElement.parent().parent().is('fieldset')) {
    console.log('fieldset')
    $clickedElement.parent().parent()
      .siblings('div.question-explanation').first()
      .slideToggle(function() {
        $clickedElement.toggleClass('fa-caret-down');
        $clickedElement.toggleClass('fa-caret-up');
      });
  } else {
    console.log('alt')
    $clickedElement.parent()
      .siblings('div.question-predefined-message-preview').first()
      .slideToggle(function() {
        $clickedElement.toggleClass('fa-caret-down');
        $clickedElement.toggleClass('fa-caret-up');
      });
  }
  return true;
}

if (typeof handleLanguageSelect === 'undefined') {
  function handleLanguageSelect(event) {
    console.log('LANGUAGE SELECT');
    return true;
  }
}

if (typeof handleCountrySelect === 'undefined') {
  function handleCountrySelect(event) {
    console.log('COUNTRY SELECT');
    return true;
  }
}

function registerStepHoverEvent(id, addClassName, removeClassName) {
  $(id).hover(function() {
    console.log('hover');
    if (!$(this).hasClass('active')) {
      $(this).find('i').addClass(addClassName);
      $(this).find('i').removeClass(removeClassName);
      $(this).find('i').addClass('fa-5x');
      $(this).find('i').removeClass('fa-3x');
    }
  }, function() {
    if (!$(this).hasClass('active')) {
      console.log('unhover');
      $(this).find('i').addClass(removeClassName);
      $(this).find('i').removeClass(addClassName);
      $(this).find('i').addClass('fa-3x');
      $(this).find('i').removeClass('fa-5x');
    }
  });
}


$(document).ready(function() {

  registerStepHoverEvent('#questions-form__header__navigation__step-1', 'fa-check-square-o', 'fa-check-square');
  registerStepHoverEvent('#questions-form__header__navigation__step-2', 'fa-pencil-square-o', 'fa-pencil-square');
  registerStepHoverEvent('#questions-form__header__navigation__step-3', 'fa-pencil-square-o', 'fa-pencil-square');
  registerStepHoverEvent('#questions-form__header__navigation__step-4', 'fa-envelope-o', 'fa-envelope');

  console.log('loaded questions..');

  // fit step label text to container
  // $('.step-label').find('h3').each(function() {
  //   $(this).fitText();
  // })

  addClickHandlersForClassName(handleStepClick, 'questions-form__header__navigation__step__content');
  addClickHandlersForClassName(handleExpandArrowClick, 'expand-arrow');
  addClickHandlersForClassName(handleLanguageSelect, 'select-picker');

  // the passed handler functions must be prepended globally
  $('#questions-form__header__locality__language__select').on('changed.bs.select', handleLanguageSelect);
  $('#questions-form__header__locality__country__select').on('changed.bs.select', handleCountrySelect);
});

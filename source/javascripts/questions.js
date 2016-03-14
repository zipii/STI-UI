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

$(document).ready(function() {

  addClickHandlersForClassName(handleStepClick, 'questions-form__header__navigation__step__content');
  addClickHandlersForClassName(handleExpandArrowClick, 'expand-arrow');

  $('.selectpicker').selectpicker({
    size: 10
  });


  // $('#questions-form__header__locality__country_select option').each(function() {
  //   var $option       = $(this);
  //   var twoLetterCode = $option.val();
  //   var $flagIcon = $('<i/>').addClass('flag flag-' + twoLetterCode.toLowerCase());
  //   $option.data('content', $flagIcon.outerHtml);
  //   console.log($option.data('content'))
  // });

});

// $('#questions-form__header__locality__country__select').flagStrap({
//     buttonSize: 'btn-lg',
//     buttonType: 'btn-primary',
//     labelMargin: '20px',
//     scrollable: true,
//     scrollableHeight: '350px',
//     onSelect: function (value, element) {
//         alert(value);
//         console.log(element);
//     },
//     placeholder: {
//       value: "",
//       text: "Please select a country"
//     }
// });

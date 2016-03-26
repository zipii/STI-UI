function daysUntil(deadline) {
  var today = new Date();
  var millisecondsUntil = deadline.getTime() - today.getTime();
  return Math.floor(((((millisecondsUntil / 1000) / 60) / 60) / 24));
}

$(document).ready(function() {

  var deadline = new Date('2016-03-29');

  var iframes = iFrameResize({
    heightCalculationMethod: 'max'
  }, document.getElementById('home__questions__container__content__body__iframe'));

  $('.carousel').carousel({
    interval: false
  });

  $.get('/counter/count.json', function(counter) {
    $('.home__counter__container__content__counter').show();
    $('.counter-message').first().html(counter.count);
    $('.counter-days-left').first().html(daysUntil(deadline));
  });

});

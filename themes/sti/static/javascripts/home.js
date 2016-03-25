$(document).ready(function() {
  console.log('loaded home..');

  var iframes = iFrameResize({
    heightCalculationMethod: 'max'
  }, document.getElementById('home__questions__container__content__body__iframe'));

  $('.carousel').carousel({
    interval: false
  });

  $.get('/counter/count.json', function(counter) {
    $('.home__counter__container__content__counter').show();
    $('.counter-message').first().html(counter.count);
  })
});

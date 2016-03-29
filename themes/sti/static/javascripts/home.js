function daysUntil(deadline) {
  var today = new Date();
  var millisecondsUntil = deadline.getTime() - today.getTime();
  return Math.floor(((((millisecondsUntil / 1000) / 60) / 60) / 24));
}

$(function clickToActivate() {
  $(".videoplaceholder" ).click(function() {
    var videourl = $( this ).attr( "videourl" );
    $( this ).replaceWith( '<iframe src="' + videourl + '" frameborder="0"></iframe>' );
  });
});

$(document).ready(function() {

  var deadline = new Date('2016-03-29');

  var iframes = iFrameResize({
    heightCalculationMethod: 'max',
    messageCallback: function(context) {
      if (context.message === 'loaded' ||
          context.message === 'loading') {
            $('#questionnaire-loading-spinner').toggle();
      }
    }
  }, document.getElementById('home__questions__container__content__body__iframe'));

  if (typeof window.counter === 'undefined') {
    window.counter = { "count" : 2 };
  }

  $('.home__counter__container__content__counter').show();
  $('.counter-message').first().html(counter.count);
  $('.counter-days-left').first().html(daysUntil(deadline));

  if (typeof window.shares === 'undefined') {
    window.shares = {'twitter': 4883 , 'facebook': 7350 , 'linkedin': 0 , 'google': 958};
  }

  $('#tw_counter').html(window.shares['twitter'] );
  $('#fb_counter').html(window.shares['facebook']);
  $('#gp_counter').html(window.shares['google']);

  $('.carousel').carousel({
    interval: false
  });

  $('#video-carousel').hammer().on('swipeleft', function(){
      $(this).carousel('next');
  });

  $('#video-carousel').hammer().on('swiperight', function(){
    $(this).carousel('prev');
  });

});

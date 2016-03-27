function daysUntil(deadline) {
  var today = new Date();
  var millisecondsUntil = deadline.getTime() - today.getTime();
  return Math.floor(((((millisecondsUntil / 1000) / 60) / 60) / 24));
}

$(document).ready(function() {

  var deadline = new Date('2016-03-29');

  var iframes = iFrameResize({
    heightCalculationMethod: 'max',
    messageCallback: function(context) {
      if (context.message === 'loaded' ||
          context.message === 'loading') {
            $('#questionnaire-loading-spinner').toggle();
      }
      // if (context.message === 'loaded' ||
      //     context.message === 'loading') {
      //   $spinner = $('#questionnaire-loading-spinner');
      //   if ($spinner.css('visibility') === 'hidden' ) {
      //     $spinner.css('visibility', 'visible');
      //   } else {
      //     $spinner.css('visibility', 'hidden');
      //   }
      // }
    }
  }, document.getElementById('home__questions__container__content__body__iframe'));

  $('.carousel').carousel({
    interval: false
  });

  $('#video-carousel').hammer().on('swipeleft', function(){
      $(this).carousel('next');
  });

  $('#video-carousel').hammer().on('swiperight', function(){
    $(this).carousel('prev');
  });

  $.get('/counter/count.json', function(counter) {
    $('.home__counter__container__content__counter').show();
    $('.counter-message').first().html(counter.count);
    $('.counter-days-left').first().html(daysUntil(deadline));
  });

});

$(function clickToActivate() {
  $(".videoplaceholder" ).click(function() {
    var videourl = $( this ).attr( "videourl" );
    $( this ).replaceWith( '<iframe src="' + videourl + '" frameborder="0"></iframe>' );
  });
});

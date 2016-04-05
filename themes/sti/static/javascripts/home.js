var userAgent = navigator.userAgent || navigator.vendor || window.opera;
var isMobile = {
  windows: function() {
    return /IEMobile/i.test(userAgent);
  },
  android: function() {
    return /Android/i.test(userAgent);
  },
  blackberry: function() {
    return /BlackBerry/i.test(userAgent);
  },
  ios: function() {
    return /iPhone|iPad|iPod/i.test(userAgent);
  },
  any: function() {
    return (isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.windows());
  }
};
var isWeird = (userAgent.indexOf('MSIE') !== -1 ||
               userAgent.indexOf('Firefox') && userAgent.match(/Android/i));

// counter related globals

function daysUntil(deadline) {
  var today = new Date();
  var millisecondsUntil = deadline.getTime() - today.getTime();
  return Math.floor(((((millisecondsUntil / 1000) / 60) / 60) / 24));
}

// video related globals

var videoPlayers  = [];
var intialVideoId = 1;

function loadYoutubePlayerScript() {
  var playerScriptTagId = '#player-script-tag';
  var $playerScriptTag  = $(playerScriptTagId);

  if (!($playerScriptTag.length > 0)) {
    $playerScriptTag = $('<script>').attr({
      'id':  playerScriptTagId,
      'src': 'https://www.youtube.com/iframe_api'
    });
    $('script').first().parent().prepend($playerScriptTag);
  }
}

function onYouTubeIframeAPIReady() {
  videoPlayers = $.map($('.video-placeholder'), function(videoPlaceholder) {
    var $videoPlaceholder = $(videoPlaceholder);
    var $video            = $videoPlaceholder.parent();
    var videoId           = $video.data('video-id');
    var youtubeVideoId    = $video.data('youtube-video-id');
    // remove placeholder styling
    $videoPlaceholder.removeClass('video-placeholder');
    return new YT.Player(videoPlaceholder, {
      width: 480,
      videoId: youtubeVideoId,
      events: {
        'onReady': function(e) {
          if (initialVideoId === videoId) {
            if(!isMobile.any()) {
              e.target.playVideo();
            }
          }
        }
      }
    });
  });
}

function setCurrentVideo(videoId) {
  var currentVideoIdIndex = videoId - 1;
  for (var i = 0; i < videoPlayers.length; i++) {
    var player = videoPlayers[i];
    if (i === currentVideoIdIndex) {
      if(!isMobile.any()) {
        player.playVideo();
      }
    } else {
      player.stopVideo();
    }
  }
}

// activating all youtube embeds on first click of any placeholder

$(function clickToActivate() {
  $('.video-placeholder').on('click', function() {
    initialVideoId = $(this).parent().data('video-id');
    loadYoutubePlayerScript();
  });
});

// document loaded and ready

$(document).ready(function() {

  // questionnaire iframe specifics

  var iframes = iFrameResize({
    heightCalculationMethod:  isWeird ? 'lowestElement' : 'max',
    messageCallback: function(context) {
      if (context.message === 'loaded' ||
          context.message === 'loading') {
            $('#questionnaire-loading-spinner').toggle();
      }
    }
  }, document.getElementById('home__questions__container__content__body__iframe'));

  // berec counter

  var deadline = new Date('2016-06-02');

  $.get('/counter/count.json', function(counter) {
    $('.counter-message').first().html(counter.count);
    $('.counter-days-left').first().html(daysUntil(deadline));
    $('.home__counter__container__content__counter').show();
  }).fail(function() {
    console.log('Error: "/counter/count.json" could not be loaded');
    // set to last known "hiscore" in case json couldn't be fetched
    $('.counter-message').first().html(181);
    $('.counter-days-left').first().html(daysUntil(deadline));
    $('.home__counter__container__content__counter').show();
  });

  // social sharing counter

  if (typeof window.shares === 'undefined') {
    window.shares = {'twitter': 4883 , 'facebook': 7350 , 'linkedin': 0 , 'google': 958};
  }

  $('#tw_counter').html(window.shares['twitter'] );
  $('#fb_counter').html(window.shares['facebook']);
  $('#gp_counter').html(window.shares['google']);

  // video

  $('.carousel').carousel({
    interval: false
  });

  $('#video-carousel').hammer().on('swipeleft', function(){
      $(this).carousel('next');
  });

  $('#video-carousel').hammer().on('swiperight', function(){
    $(this).carousel('prev');
  });

  $('#video-carousel').on('slid.bs.carousel', function (e) {
    var currentVideoId = $(e.relatedTarget).find('.home-video').first().data('video-id');
    setCurrentVideo(currentVideoId);
  })

});

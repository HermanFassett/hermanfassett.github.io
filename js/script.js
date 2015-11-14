(function($) {
  var small = false;
$(document).ready(function(){
  $(window).scroll( function(){
    $(".fadein").each( function(){
      var object_top = $(this).position().top;
      var screen_bottom = $(window).scrollTop() + $(window).height();
      if(screen_bottom > object_top)
        $(this).animate({'opacity':'1'},1500);
    });
    if (!small) {
      var nav = $(".menu")[0];
      var circle = $(".circle")[1];
      var bottom = $(circle).position().top + $(circle).outerHeight();
      if (bottom < $(window).scrollTop()) $(nav).animate({"opacity":"1"}, 100);
      else $(nav).animate({"opacity":"0"}, 100);
    }
  });
  $(window).resize(function() {
    resize();
  });
  function resize() {
    if ($(window).width() < 1000) {
      small = true;
      $(".background-img").addClass("small");
      $(".main").hide();
      $(".circle").hide();
      $($(".menu")[0]).addClass("largemenu");
    }
    else {
      small = false;
      $(".main").show();
      $(".circle").show();
      $($(".menu")[0]).removeClass("largemenu");
      $(".background-img").removeClass("small");
    }
  }
  resize();
});
})(jQuery)

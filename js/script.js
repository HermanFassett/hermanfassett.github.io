(function($) {
  var small = false; //Boolean width < 1000
  /* On Document Ready */
  $(document).ready(function() {
    /* On Window Scroll */
    $(window).scroll(function() {
      // For each element with class fadein
      $(".fadein").each(function() {
        var object_top = $(this).position().top; // Top of current element
        var screen_bottom = $(window).scrollTop() + $(window).height(); //Bottom of visible screen
        if(screen_bottom > object_top)
          $(this).animate({'opacity':'1'},1500); // Show element if in view
      });
      // If the width is 1000 pixels or greater
      if (!small) {
        var nav = $(".menu")[0]; // Get the menu bar
        var circle = $(".circle")[1]; // Get the main circle
        var bottom = $(circle).position().top + $(circle).outerHeight(); // Get bottom of circle
        if (bottom < $(window).scrollTop())
          $(nav).animate({"opacity":"1"}, 100); // Show menu if main circle isn't in view
        else $(nav).animate({"opacity":"0"}, 100); // Otherwise hide menu bar
      }
    });

    /* On resize */
    $(window).resize(function() {
      resize(); // Call resize function
    });

    /* Sizing function */
    function resize() {
      // If window width is less than 1000
      if ($(window).width() < 1000) {
        small = true; // Set boolean small screen
        $(".background-img").addClass("small"); // Set background image small
        $(".main").hide(); // Hide main div
        $(".circle").hide(); // Hide circles
        $($(".menu")[0]).addClass("largemenu"); // Show menu permanently
      } // Otherwise...
      else {
        small = false; // Set boolean small screen false
        $(".main").show(); // Show main div
        $(".circle").show(); // Show circles
        $($(".menu")[0]).removeClass("largemenu"); // Set menu view back to normal
        $(".background-img").removeClass("small"); // Reset background image size
      }
    }
    resize(); // Call resize function on reload
  });
})(jQuery)

$(document).ready(function() {
  function load() {
    $.ajax({
      url: "/audio",
      success: function (data) {
        console.log(data);
      }
    });
  }
  function resize() {
    $(".list").css("height", ($(window).height() - 25) + "px");
    $(".list-item").css("width", ($(".list-item").parent().width()/2 - 10) + "px");
  }
  $(window).on("resize" ,function() {resize()});
  load();
  resize();
});

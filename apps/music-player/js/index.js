$(document).ready(function() {
  var aud = ["A Winter Day", "Brightness Davar", "Exiled",
  "Sunrise", "The Path To Freedom"];
  var audio;
  function load() {
    for (var a in aud) {
      var song = aud[a];
      $(".list").append("<div class='list-item'><h1>" +
      song + "</h1></div>");
    }
  }
  $(document).on("click", ".list-item", function() {
    var ctx = new AudioContext();
    audio = new Audio("./audio/" + $(this).text() + ".mp3");
    var audioSrc = ctx.createMediaElementSource(audio);
    var analyser = ctx.createAnalyser();
    audioSrc.connect(analyser);
    $(".player").css("display", "block");

    audio.play();
  });
  $(".ball").click(function() {
    (audio.paused) ? audio.play() : audio.pause();
  });
  $(".ball").hover(function() {

  });
  function resize() {
    $(".list").css("height", ($(window).height() - 25) + "px");
    $(".list-item").css("width", ($(".list-item").parent().width()/2 - 10) + "px");
  }
  $(window).on("resize" ,function() {resize()});
  load();
  resize();
});

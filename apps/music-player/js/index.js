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
  var ctx, analyser, audioSrc;
  $(document).on("click", ".list-item", function() {
    ctx = new AudioContext();
    audio = new Audio("./audio/" + $(this).text() + ".mp3");
    audioSrc = ctx.createMediaElementSource(audio);
    analyser = ctx.createAnalyser();
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    $(".player").css("display", "block");
    audio.play();
    frameLooper();
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
  function frameLooper(){
  	window.requestAnimationFrame(frameLooper);
  	fbc_array = new Uint8Array(analyser.frequencyBinCount);
  	analyser.getByteFrequencyData(fbc_array);
    console.log(fbc_array);
    $(".ball").css("transform", "scale(" + (fbc_array[0]/50) + ")");
  }
});

$(document).ready(function() {
  var btns = [$("#green"), $("#yellow"), $("#blue"), $("#red")];
  var history = [];
  var current = [];
  var on = false;
  var playing = false;
  var score = 0;
  function click(index) {
    if (on && !playing) {
      current.push(index);
      if (history[current.length - 1] === index) {
        play(index);
        if (history.length === current.length) {
          score += 1;
          $("#display").text(score);
          setTimeout(getNext, 2000);
          current = [];
        }
      }
      else {
        $("#display").text("!!");
        var audio = new Audio("sounds/simonSoundFail.mp3");
        audio.play();
        $(audio).bind("ended", function() {
          restart();
        });
      }
    }
  }
  function play(index) {
    $(btns[index - 1]).addClass("active");
    var url = "sounds/simonSound" + index + ".mp3";
    var audio = new Audio(url);
    audio.play();
    $(audio).bind("ended", function() {
      $(btns[index - 1]).removeClass("active");
    });
  }
  function restart() {
    clear();
    getNext();
  }
  function clear() {
    playing = false;
    history = [];
    current = [];
    score = 0;
    $("#display").text("--");
  }
  $("#green").click(function() {
    click(1);
  });
  $("#red").click(function() {
    click(4);
  });
  $("#yellow").click(function() {
    click(2);
  });
  $("#blue").click(function() {
    click(3);
  });
  $("#btnOn").click(function() {
    if (on) {
      clear();
      $("#display").css("color", "#422");
      $("#btnOn").css("background", "green");
      $("#btnOn").css("box-shadow", "inset 0 0 15px #292");
    }
    else {
      $("#display").css("color", "red");
      $("#btnOn").css("background", "#272");
      $("#btnOn").css("box-shadow", "inset 0 0 15px #232");
      getNext();
    }
    on = !on;
  });
  function getNext() {
    playing = true;
    var random =  Math.floor((Math.random() * 4) + 1);
    history.push(random);
    playAll(0);
  }
  function playAll(i) {
    play(history[i]);
    if (i + 1 < history.length && playing) {
      setTimeout(function() { playAll(i + 1) }, 1000)
    }
    else playing = false;
  }
});

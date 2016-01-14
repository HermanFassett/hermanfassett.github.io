$(document).ready(function() {
  var audio = new Audio("http://www.freesfx.co.uk/rx2/mp3s/9/11143_1393964019.mp3"),
    past = false,
    max = 1667;
  function resize() {
    $("#txtArea").width($(window).width() - 80);
    $("#txtArea").height($(window).height() - 125);
  }

  $(window).resize(function() {
    resize();
  });
  $("#txtArea").keydown(function(e) {
    var wordCount = $("#txtArea").val().split(" ").length;
    $("#txtLbl").text("Words Today: " + wordCount);
    if (wordCount > max && !past) {
      past = true;
      audio.play();
    }
  });
  $("#btnS").click(function() {
    var download = document.createElement("a");
    download.href = "data:attachment/text," + encodeURI($("#txtArea").val());
    download.target = "_blank";
    var now = new Date();
    download.download = "NaNoWriMo_" + now.toLocaleString() + ".txt";
    download.click();
  })
  $("#btnO").click(function() {
    var words = $("#txtArea").val().split(" ");
    var r = confirm("Are you sure? Make sure to save your text somewhere else.");
    if (r) {
      for (var i = 0; i < words.length; i++) {
        var j = (words[i].length > 35) ? 35 : words[i].length;
        words[i] = Math.random().toString(36).substring(2, j + 2);
      }
      $("#txtArea").val(words.join(" "));
    }
  });
  resize();
});

$(document).ready(function() {
  var turn = true;
  var c = [["", "", ""],["","",""],["","",""]];
  var cs = [[$("#c1"), $("#c2"), $("#c3")],
            [$("#c4"), $("#c5"), $("#c6")],
            [$("#c7"), $("#c8"), $("#c9")]];
  $("#c1, #c2, #c3, #c4, #c5, #c6, #c7, #c8, #c9").click(function() {
    if (turn) {
      for (var i = 0; i < cs.length; i++) {
        for (var j = 0; j < cs[i].length; j++) {
          if (this.id === cs[i][j][0].id && c[i][j] === "") {
            $("#text").css("display", "none");
            $(cs[i][j]).css("background-image", "url('images/X.png')");
            c[i][j] = "X";
            check();
            go();
            break;
          }
        }
      }
    }
  });
  function check() {
    turn = false;
    // Diagonal
    if (c[1][1] !== "" && ((c[0][0] === c[1][1] && c[1][1] === c[2][2]) || (c[0][2] === c[1][1] && c[1][1] === c[2][0]))) {
        win(c[0][0]);
      }
    // Horizontal
    for (var i = 0; i < c.length; i++) {
      if (c[i][0] !== "" && c[i][0] === c[i][1] && c[i][1] === c[i][2]) {
        win(c[i][0]);
        break;
      }
    }
    // Vertical
    for (var j = 0; j < 3; j++) {
      if (c[0][j] !== "" && c[0][j] === c[1][j] && c[1][j] === c[2][j]) {
        win(c[0][j]);
        break;
      }
    }
  }
  function win(ty) {
    $("#text").css("display", "block");
    $(".box").css("pointer-events", "none");
    (ty === "tie") ? $("#text").text("Cat's Game!") : $("#text").text(ty + " wins!");
    setTimeout(start, 3000);
  }
  function go() {
    turn = false;
    var is = [];
    var js = [];
    for (var i = 0; i < c.length; i++) {
      for (var j = 0; j < c.length; j++) {
        if (c[i][j] === "") {
          is.push(i);
          js.push(j);
        }
      }
    }
    if (!is.length) {
      win("tie");
    }
    else {
      var x = Math.floor(Math.random() * is.length);
      c[is[x]][js[x]] = "O";
      $(cs[is[x]][js[x]]).css("background-image", "url('images/O.png')");
    }
    check();
    turn = true;
  }
  function start() {
    $(".box").css("pointer-events", "auto");
    $("#text").css("display", "none");
    c = [["", "", ""],["","",""],["","",""]];
    for (var i = 0; i < cs.length; i++) {
      for (var j = 0; j < cs[i].length; j++) {
        $(cs[i][j]).css("background-image", "none");
        $(cs[i][j]).css("background-size", "100%, 100%;");
      }
    }
  }
});

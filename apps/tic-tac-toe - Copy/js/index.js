$(document).ready(function() {
  var turn = true, depth = 0;
  var player = "X", opponent = "O";
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
            $(cs[i][j]).css("background-image", "url('images/" +  player + ".png')");
            c[i][j] = player;
            go();
            break;
          }
        }
      }
    }
  });
  function score(moves) {
    var winner = check(moves);
    if (winner === player) return 10 - depth;
    else if (winner === opponent) return depth - 10;
    else return 0;
  }
  function minimax() {
    var moves = c;
    var scores = [];
    var cscore = score(moves);
    if (cscore !== 0) return cscore;
    depth += 1;
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
    for (var i = 0; i < is.length; i++) {
      moves[is[i]][js[i]] = opponent;
      for (var j = 0; j < is.length - i; j++) {
        moves[is[j]][js[j]] = player;
        console.log(moves[0]);
        console.log(moves[1]);
        console.log(moves[2]);
        console.log("");
      }
    }
  }
  function check(moves) {
    turn = false;
    // Diagonal
    if (moves[1][1] !== "" && ((moves[0][0] === moves[1][1] && moves[1][1] === moves[2][2]) || (moves[0][2] === moves[1][1] && moves[1][1] === moves[2][0]))) {
        return moves[0][0];
    }
    // Horizontal
    for (var i = 0; i < moves.length; i++) {
      if (moves[i][0] !== "" && moves[i][0] === moves[i][1] && moves[i][1] === moves[i][2]) {
        return moves[i][0];
        break;
      }
    }
    // Vertical
    for (var j = 0; j < 3; j++) {
      if (moves[0][j] !== "" && moves[0][j] === moves[1][j] && moves[1][j] === moves[2][j]) {
        return moves[0][j];
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
    minimax();
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

var arr = "000"+
          "000"+
          "000",
          user = "X", ai = "O";
var rows = function(inarr) {
    var inarr = inarr || arr;
    return inarr.match(/.{1,3}/g);
};
var columns = function(inarr) {
    var inarr = inarr || arr;
    return [inarr[0]+inarr[3]+inarr[6],inarr[1]+inarr[4]+inarr[7],inarr[2]+inarr[5]+inarr[8]];
};
var diagonals = function(inarr) {
    var inarr = inarr || arr;
    return [inarr[0]+inarr[4]+inarr[8], inarr[2]+inarr[4]+inarr[6]];
};
var indexOf = function(type, a) {
    var index = a[0], offset = a[1];
    if (type === "r") return (offset * 3) + index;
    else if (type === "c") return (index * 3) + offset;
    else if (type === "d") return (offset === 0) ? index * 4 : index * 2 + 2;
};
var wins = function(inarr) {
    var inarr = inarr || arr;
    var rs = rows(inarr), cs = columns(inarr), ds = diagonals(inarr);
    var winner = false;
    rs.forEach(check);
    cs.forEach(check);
    ds.forEach(check);
    function check(a, index) {
        if (a.match(/X{3}|O{3}/)) winner = true;
    }
    return winner;
};
var nextWins = function(inarr, player) {
    var inarr = inarr || arr;
    var rs = rows(inarr), cs = columns(inarr), ds = diagonals(inarr), type = "r";
    var wins = [];
    rs.forEach(check);
    type = "c";
    cs.forEach(check);
    type = "d";
    ds.forEach(check);
    function check(a, index) {
        var b = (player) ? a.match(player + player) : a.match(/(OO|XX)/);
        if (b && !b.input.match((b[0][0] === "X") ? "O" : "X")) wins.push(indexOf(type, [(b.index === 0) ? 2 : 0, index]));
        else {
            b = (player) ? a.match(player + "0" + player) : a.match(/X0X|O0O/);
            if (b) wins.push(indexOf(type, [1, index]));
        }
    }
    return wins;
};
var forks = function(inarr, player) {
  var inarr = inarr || arr;
  var rs = rows(inarr), cs = columns(inarr), ds = diagonals(inarr), type = "r";
  var fork = [], moves = possibleMoves(inarr);
  moves.forEach(function(a, i) {
    var temp = arr;
    temp = temp.substr(0, a) + player + temp.substr(a + 1);
    if (nextWins(temp, player).length > 1) {
      fork.push(a);
    }
  });
  return fork;
}
var possibleMoves = function(inarr) {
  var inarr = inarr || arr;
  var moves = [];
  inarr.split("").forEach(function(a, index) {
    if (a === "0") moves.push(index);
  });
  return moves;
};
$(document).ready(function() {
  var turn = true;
  var cs = [$("#c1"),$("#c2"),$("#c3"),$("#c4"), $("#c5"), $("#c6"),$("#c7"),$("#c8"),$("#c9")];
  $(".box").click(function() {
    if (turn) {
      for (var i = 0; i < cs.length; i++) {
        if (this.id === cs[i][0].id && arr[i] === "0") {
          $("#text").css("display", "none");
          $(cs[i]).css("background-image", "url('images/" + user + ".png')");
          arr = arr.substr(0,i) + user + arr.substr(i+1);
          go();
          break;
        }
      }
    }
  });
  function go() {
    turn = false;
    if (wins()) win(user);
    else if (nextWins().length > 0) {
      var moves = nextWins();
      var best = [];
      moves.forEach(function(a) {
        if (arr[a] === "0") best.push(a);
      });
      best.forEach(function(b,i) {
        var temp = arr;
        temp = temp.substr(0, b) + ai + temp.substr(b + 1);
        if (wins()) best = [b];
      });
      arr = arr.substr(0, best[0]) + ai + arr.substr(best[0] + 1);
      $(cs[best[0]]).css("background-image", "url('images/" + ai +".png')");
      if (wins()) win(ai);
    }
    else if (forks(arr, "X").length > 0) {
      var moves = forks(arr, "X");
      console.log(moves);
      arr = arr.substr(0, moves[0]) + ai + arr.substr(moves[0] + 1);
      $(cs[moves[0]]).css("background-image", "url('images/" + ai + ".png')");
    }
    else if (forks(arr, "O").length > 0) {
      var moves = forks(arr, "O");
      arr = arr.substr(0, moves[0]) + ai + arr.substr(moves[0] + 1);
      $(cs[moves[0]]).css("background-image", "url('images/" + ai + ".png')");
    }
    else if (possibleMoves().length > 0) {
      var moves = possibleMoves();
      arr = arr.substr(0, moves[0]) + ai + arr.substr(moves[0] + 1);
      $(cs[moves[0]]).css("background-image", "url('images/" + ai + ".png')");
    }
    if (possibleMoves().length === 0 && !wins()) win("tie");
    turn = true;
  }
  function win(ty) {
    $("#text").css("display", "block");
    $(".box").css("pointer-events", "none");
    $("#text").text((ty === "tie") ? "Cat's Game!": ty + " wins!");
    setTimeout(start, 3000);
  }
  function start() {
    $(".box").css("pointer-events", "auto");
    $("#text").css("display", "none");
    arr = "000000000";
    for (var i = 0; i < cs.length; i++) {
      $(cs[i]).css("background", "white");
    }
  }
});

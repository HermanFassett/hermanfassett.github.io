var arr = "000"+
          "000"+
          "000",
          user = "X", ai = "O";
var rows = function() {
    return arr.match(/.{1,3}/g);
};
var columns = function() {
    return [arr[0]+arr[3]+arr[6],arr[1]+arr[4]+arr[7],arr[2]+arr[5]+arr[8]];
};
var diagonals = function() {
    return [arr[0]+arr[4]+arr[8], arr[2]+arr[4]+arr[6]];
};
var indexOf = function(type, a) {
    var index = a[0], offset = a[1];
    if (type === "r") return (offset * 3) + index;
    else if (type === "c") return (index * 3) + offset;
    else if (type === "d") return (offset === 0) ? index * 4 : index * 2 + 2;
};
var wins = function() {
    var rs = rows(), cs = columns(), ds = diagonals();
    var winner = false;
    rs.forEach(check);
    cs.forEach(check);
    ds.forEach(check);
    function check(a, index) {
        if (a.match(/X{3}|O{3}/)) winner = true;
    }
    return winner;
};
var nextWins = function() {
    var rs = rows(), cs = columns(), ds = diagonals(), type = "r";
    var wins = [];
    rs.forEach(check);
    type = "c";
    cs.forEach(check);
    type = "d";
    ds.forEach(check);
    function check(a, index) {
        var b = a.match(/((0|^)+(X{2}|O{2})(0|$)+)/);
        if (b) wins.push(indexOf(type, [(b.index === 0) ? 2 : 0, index]));
        else {
            b = a.match(/X0X|O0O/);
            if (b) wins.push(indexOf(type, [1, index]));
        }
    }
    return wins;
};
var possibleMoves = function() {
  var moves = [];
    arr.split("").forEach(function(a, index) {
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
        arr = arr.substr(0, b) + ai + arr.substr(b + 1);
        if (wins()) best = [b];
        arr = temp;
      });
      arr = arr.substr(0, best[0]) + ai + arr.substr(best[0] + 1);
      $(cs[best[0]]).css("background-image", "url('images/" + ai +".png')");
      if (wins()) win(ai);
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

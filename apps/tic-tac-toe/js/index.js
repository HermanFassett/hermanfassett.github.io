var arr = "000"+ // R1
          "000"+ // R2  -- All one string
          "000", // R3
          user = "X", ai = "O"; // These might change
// Get rows of board
var rows = function(inarr) {
    var inarr = inarr || arr;
    return inarr.match(/.{1,3}/g);
};
// Get columns of board
var columns = function(inarr) {
    var inarr = inarr || arr;
    return [inarr[0]+inarr[3]+inarr[6],inarr[1]+inarr[4]+inarr[7],inarr[2]+inarr[5]+inarr[8]];
};
// Get diagonals of board
var diagonals = function(inarr) {
    var inarr = inarr || arr;
    return [inarr[0]+inarr[4]+inarr[8], inarr[2]+inarr[4]+inarr[6]];
};
// Get index of value relative to single line board
var indexOf = function(type, a) {
    var index = a[0], offset = a[1];
    if (type === "r") return (offset * 3) + index;
    else if (type === "c") return (index * 3) + offset;
    else if (type === "d") return (offset === 0) ? index * 4 : index * 2 + 2;
};
// Check for a win
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
// Check for next turn wins
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
// Check for forks
var forks = function(inarr, player) {
  var inarr = inarr || arr;
  var rs = rows(inarr), cs = columns(inarr), ds = diagonals(inarr), type = "r";
  var fork = [], moves = possibleMoves(inarr);
  moves.forEach(function(a, i) {
    var temp = inarr;
    temp = temp.substr(0, a) + player + temp.substr(a + 1);
    if (nextWins(temp, player).length > 1) {
      fork.push(a);
    }
  });
  return fork;
}
// Check for all possible moves
var possibleMoves = function(inarr) {
  var inarr = inarr || arr;
  var moves = [];
  inarr.split("").forEach(function(a, index) {
    if (a === "0") moves.push(index);
  });
  return moves;
};
/*
 * When document is ready
 */
$(document).ready(function() {
  var turn = true;
  var cs = [$("#c1"),$("#c2"),$("#c3"),$("#c4"), $("#c5"), $("#c6"),$("#c7"),$("#c8"),$("#c9")];
  $(".btn").click(function() {
    if ($("#" + this.id).text() === "X") {
      user = "X";
      ai = "O";
    }
    else {
      user = "O";
      ai = "X";
      go();
    }
    $(".popup").hide();
  });
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
  /*
   * Make the AI move
   */
  function go() {
    turn = false; // Keep player from clicking while ai moves
    // If user has won, finish
    if (wins()) win(user);
    // Else if user or ai can win with next move, go in winning position
    else if (nextWins().length > 0) {
      var moves = nextWins(), best = [];
      moves.forEach(function(a) {
        if (arr[a] === "0") best.push(a);
      });
      best.forEach(function(b,i) {
        var temp = arr;
        temp = temp.substr(0, b) + ai + temp.substr(b + 1);
        if (wins(temp)) best = [b];
      });
      arr = arr.substr(0, best[0]) + ai + arr.substr(best[0] + 1);
      $(cs[best[0]]).css("background-image", "url('images/" + ai +".png')");
      if (wins()) win(ai); // If ai has won, finish
    }
    // Else if a fork is being made by user, counter
    else if (forks(arr, user).length > 0) {
      var moves = forks(arr, user); // Get possible forks for user
      var best = { index: moves[0], length: moves.length }; // Create a new best move obj
      // loop through possible forks to find best counter move
      moves.forEach(function(a) {
        var temp = arr;
        temp = temp.substr(0, a) + ai + temp.substr(a + 1);
        var w = forks(temp, user);
        // Find the move leaving the least amount of possible forks for user
        if (w.length < best.length) {
          best.index = a;
          best.length = w.length;
        }
      });
      arr = arr.substr(0, best.index) + ai + arr.substr(best.index + 1);
      $(cs[best.index]).css("background-image", "url('images/" + ai + ".png')");
    }
    // Else if a fork can be made by ai, create it
    else if (forks(arr, ai).length > 0) {
      var moves = forks(arr, ai);
      arr = arr.substr(0, moves[0]) + ai + arr.substr(moves[0] + 1);
      $(cs[moves[0]]).css("background-image", "url('images/" + ai + ".png')");
    }
    // Otherwise go through remaining possible moves
    else if (possibleMoves().length > 0) {
      var moves = possibleMoves().join(""), move; // Get possible moves
      // If player goes in a corner, go in the opposite corner if possible
      if ((arr[0] === user || arr[8] === user) && moves.match(/[80]/)) move = moves.match("8") || moves.match("0");
      else if ((arr[2] === user || arr[6] === user) && moves.match(/[26]/)) move = moves.match("6") || moves.match("2");
      // Else go in center if possible
      else if (moves.match("4")) move = 4;
      // Else play in a corner
      else if (moves.match(/[0268]/)) move = moves.match("0") || moves.match("2") || moves.match("6") || moves.match("8");
      // Else play on a side (whatever's left)
      else move = moves[0];
      arr = arr.substr(0, move) + ai + arr.substr(parseInt(move) + 1); // Add play to board
      $(cs[move]).css("background-image", "url('images/" + ai + ".png')"); // Set image at index
    }
    // Check for a tie
    if (possibleMoves().length === 0 && !wins()) win("tie");
    turn = true; // Allow player to click
  }
  /*
   * Show winning text, then set timer for restart
   */
  function win(ty) {
    $("#text").css("display", "block");
    $(".box").css("pointer-events", "none");
    $("#text").text((ty === "tie") ? "Cat's Game!": ty + " wins!");
    setTimeout(start, 3000);
  }
  /*
   * Reset everything and start again
   */
  function start() {
    $(".box").css("pointer-events", "auto");
    $("#text").css("display", "none");
    arr = "000000000";
    for (var i = 0; i < cs.length; i++) {
      $(cs[i]).css("background", "white");
    }
    if (ai === "X") go(); // X goes first
  }
});

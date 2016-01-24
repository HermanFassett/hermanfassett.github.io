"use strict";

var MAP,
    PROPS = {},
    SEEN,
    FLOOR,
    PLAYER,
    DUNGEON = 1;
var COLS = 20,
    ROWS = 30,
    ROOMS = 5,
    ENEMIES = 5,
    HP = 5;
var VISIBLE_WIDTH = 30; // ROWS
var VISIBLE_HEIGHT = 20; // COLS
var EYESIGHT = 5;
var GRID_SIZE = 20;
var WEAPONS = [{ type: "weapon", name: "Stick", damage: [0, 3] }, { type: "weapon", name: "Knife", damage: [1, 5] }, { type: "weapon", name: "Hatchet", damage: [2, 8] }, { type: "weapon", name: "Sword", damage: [3, 10] }];
reset();
function reset() {
  DUNGEON = 1, COLS = 20, ROWS = 30, ROOMS = 5, ENEMIES = 5, HP = 5;
  // Set up player
  PLAYER = {
    col: 2,
    row: 2,
    health: 100,
    maxh: 100,
    weapon: "Fists",
    damage: [0, 1],
    exp: 0,
    level: 1,
    lives: 0
  };
  start();
}
function start() {
  // Reset some variables
  PROPS = {}, SEEN = {}, MAP = [], FLOOR = {}, PLAYER.col = 2, PLAYER.row = 2;
  // Init empty (full of walls) map
  for (var i = 0; i < COLS; i++) {
    var temp = [];
    for (var j = 0; j < ROWS; j++) {
      temp.push(0);
    }
    MAP.push(temp);
  }
  // Function to create a randomly sized and positioned room. Overlapping allowed.
  function getRoom(col, row) {
    var w = Math.floor(Math.random() * 6) + 2;
    var h = Math.floor(Math.random() * 6) + 2;
    var col = col ? col : Math.floor(Math.random() * (COLS - h - h)) + 2;
    var row = row ? row : Math.floor(Math.random() * (ROWS - w - w)) + 2;
    return { w: w, h: h, col: col, row: row };
  }
  // Init lastroom
  var lastroom;
  // Add rooms
  for (var i = 0; i < ROOMS; i++) {
    var room = lastroom ? getRoom() : getRoom(2, 2);
    if (lastroom) {
      var cdir = room.col > lastroom.col ? -1 : 1;
      var rdir = room.row > lastroom.row ? -1 : 1;
      var nc = cdir === -1 ? room.col : room.col + room.h - 1;
      var nr = rdir === -1 ? room.row : room.row + room.w - 1;
      while (cdir === -1 && nc >= lastroom.col || cdir === 1 && nc <= lastroom.col) {
        MAP[nc][nr] = 1;
        nc += cdir;
      }
      while (rdir === -1 && nr >= lastroom.row || rdir === 1 && nr <= lastroom.row) {
        MAP[nc][nr] = 1;
        nr += rdir;
      }
      lastroom = room;
    } else lastroom = room;
    for (var a = 0; a < room.h; a++) {
      for (var b = 0; b < room.w; b++) {
        MAP[a + room.col][b + room.row] = 1;
        FLOOR[a + room.col + "," + (b + room.row)] = true;
      }
    }
  }
  // Add enemies
  for (var k = 0; k < ENEMIES; k++) {
    var s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    while (PROPS.hasOwnProperty(s) || PLAYER.col + "," + PLAYER.row === s) {
      s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    }
    var col = s.split(",")[1];
    var row = s.split(",")[0];
    var level = Math.floor(Math.random() * (DUNGEON * 5)) + 1;
    PROPS[col + "," + row] = {
      type: "enemy",
      health: level * 2,
      level: level,
      exp: level * 2
    };
  }
  // Add hp boxes
  for (var k = 0; k < HP; k++) {
    var s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    while (PROPS.hasOwnProperty(s)) {
      s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    }
    var col = s.split(",")[1];
    var row = s.split(",")[0];
    PROPS[col + "," + row] = {
      type: "health",
      amount: Math.floor(Math.random() * 15) + 10
    };
  }
  if (DUNGEON < 5) {
    // Add a Door for next dungeon
    var s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    while (PROPS.hasOwnProperty(s)) {
      s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    }
    var col = s.split(",")[0];
    var row = s.split(",")[1];
    MAP[col][row] = 2;
    // Add a new weapon pickup
    s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    while (PROPS.hasOwnProperty(s)) {
      s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    }
    col = s.split(",")[1];
    row = s.split(",")[0];
    PROPS[col + "," + row] = WEAPONS[DUNGEON - 1];
    if (DUNGEON > 1) {
      // Add a new shield pickup
      s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
      while (PROPS.hasOwnProperty(s)) {
        s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
      }
      col = s.split(",")[1];
      row = s.split(",")[0];
      PROPS[col + "," + row] = { type: "shield" };
    }
  } else {
    // Otherwise add THE BOSS!
    var s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    while (PROPS.hasOwnProperty(s)) {
      s = Object.keys(FLOOR)[Math.floor(Math.random() * Object.keys(FLOOR).length)];
    }
    var col = s.split(",")[1];
    var row = s.split(",")[0];
    var level = 20;
    PROPS[col + "," + row] = {
      type: "boss",
      health: 750,
      level: level,
      exp: level * 2
    };
  }
}

var Tile = React.createClass({
  displayName: "Tile",

  setVisible: function setVisible() {
    this.props.visible = true;
  },
  render: function render() {
    var type = "#000",
        text = "",
        border = "none",
        size = "1em";
    if (this.props.col === PLAYER.col && this.props.row === PLAYER.row) {
      type = "#0F0";
      text = "P";
      this.props.visible = true;
      border = "1px solid #222";
    } else if (this.props.visible) {
      switch (this.props.type) {
        case 0:
          type = "#333";
          break;
        case 1:
          type = "#EEE";
          break;
        case 2:
          type = "#620";
          text = "D";
      }
      if (PROPS.hasOwnProperty(this.props.col + "," + this.props.row)) {
        var prop = PROPS[this.props.col + "," + this.props.row];
        border = "1px solid #222";
        if (prop.type === "enemy" || prop.type === "boss") {
          type = "#F00";
          text = prop.health;
          border = "1px solid #222";
          if (prop.type === "boss") size = "0.7em";
        } else {
          type = "#FF0";
          if (prop.type === "weapon") text = "W";else if (prop.type === "shield") text = "S";else if (prop.type === "health") text = "H";
        }
      }
    }
    this.props.style = {
      top: (this.props.row - this.props.imax + VISIBLE_HEIGHT) * GRID_SIZE + 35,
      left: (this.props.col - this.props.max + VISIBLE_WIDTH) * GRID_SIZE + 10,
      width: GRID_SIZE,
      height: GRID_SIZE,
      background: type,
      border: border,
      "font-size": size
    };
    return React.createElement(
      "div",
      { className: "tile", style: this.props.style },
      text
    );
  }
});

var GameBoard = React.createClass({
  displayName: "GameBoard",

  render: function render() {
    var style = {
      width: VISIBLE_WIDTH * GRID_SIZE,
      height: VISIBLE_HEIGHT * GRID_SIZE + 2
    };
    $("#main").width(VISIBLE_WIDTH * GRID_SIZE);
    this.props.board = [];
    var i = Math.floor(PLAYER.row - VISIBLE_HEIGHT / 2);
    if (i < 0) i = 0;else if (i > COLS - VISIBLE_HEIGHT) i = COLS - VISIBLE_HEIGHT;
    var imax = VISIBLE_HEIGHT + i;
    if (imax > COLS) max = COLS;
    for (; i < imax; i++) {
      var j = Math.floor(0 + PLAYER.col - VISIBLE_WIDTH / 2);
      if (j < 0) j = 0;else if (j > ROWS - VISIBLE_WIDTH) j = ROWS - VISIBLE_WIDTH;
      var max = VISIBLE_WIDTH + j;
      if (max > ROWS) max = ROWS;
      for (; j < max; j++) {
        this.props.board.push(React.createElement(Tile, { row: i, col: j, imax: imax, max: max, type: MAP[i][j], visible: distance(i, j) }));
      }
    }
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { style: style, id: "board" },
        this.props.board
      )
    );
  }
});
var distance = function distance(i, j) {
  if (i < PLAYER.row + EYESIGHT && i > PLAYER.row - EYESIGHT && j < PLAYER.col + EYESIGHT && j > PLAYER.col - EYESIGHT) {
    SEEN[i + "," + j] = true;
    return true;
  }
  return SEEN.hasOwnProperty(i + "," + j);
};
var Health = React.createClass({
  displayName: "Health",

  render: function render() {
    var progressstyle = {
      width: VISIBLE_WIDTH * GRID_SIZE
    };
    var style = {
      width: PLAYER.health / PLAYER.maxh * 100 + "%"
    };
    return React.createElement(
      "div",
      { className: "progress", style: progressstyle },
      React.createElement(
        "div",
        { className: "progress-bar progress-bar-" + this.props.type, role: "progressbar", "aria-valuemin": "0", "aria-valuemax": PLAYER.maxh, style: style },
        PLAYER.health
      )
    );
  }
});
var Stats = React.createClass({
  displayName: "Stats",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Dungeon: ",
      DUNGEON,
      ", Shields: ",
      PLAYER.lives,
      ", ",
      PLAYER.weapon,
      ": ",
      PLAYER.damage[0],
      "-",
      PLAYER.damage[1],
      " dmg, XP: ",
      PLAYER.exp,
      ", Level: ",
      PLAYER.level,
      ", Explored: ",
      Math.round(Object.keys(SEEN).length / (ROWS * COLS) * 100),
      "%"
    );
  }
});
var game = ReactDOM.render(React.createElement(GameBoard, null), $("#game")[0]);
var health = ReactDOM.render(React.createElement(Health, { type: "success" }), $("#health")[0]);
var stats = ReactDOM.render(React.createElement(Stats, null), $("#stats")[0]);

// GAME MOVEMENT

$(document).on("keydown", function (e) {
  switch (e.keyCode) {
    case 87:
    case 38:
      move(PLAYER.col, PLAYER.row - 1);
      break;
    case 83:
    case 40:
      move(PLAYER.col, PLAYER.row + 1);
      break;
    case 65:
    case 37:
      move(PLAYER.col - 1, PLAYER.row);
      break;
    case 68:
    case 39:
      move(PLAYER.col + 1, PLAYER.row);
  }
});
function move(col, row) {
  if (check(col, row)) {
    PLAYER.col = col;
    PLAYER.row = row;
    if (MAP[PLAYER.row][PLAYER.col] === 2) {
      DUNGEON++;
      COLS += 10;
      ROWS += 10;
      ROOMS += 20;
      ENEMIES += 5;
      HP += 5;
      start();
    }
    if (PROPS.hasOwnProperty(PLAYER.col + "," + PLAYER.row)) {
      var prop = PROPS[PLAYER.col + "," + PLAYER.row];
      if (prop.type === "weapon") {
        PLAYER.weapon = prop.name;
        PLAYER.damage = prop.damage.slice();
      } else if (prop.type === "health") {
        PLAYER.health += prop.amount;
        if (PLAYER.health > PLAYER.maxh) PLAYER.health = PLAYER.maxh;
        updateHealth();
      } else if (prop.type === "shield") {
        PLAYER.lives++;
      }
      delete PROPS[PLAYER.col + "," + PLAYER.row];
    }
    game.forceUpdate();
    stats.forceUpdate();
  } else if (PROPS.hasOwnProperty(col + "," + row) && (PROPS[col + "," + row].type === "enemy" || PROPS[col + "," + row].type === "boss")) {
    var prop = PROPS[col + "," + row];
    PLAYER.health -= Math.floor(Math.random() * (prop.level * 2 + 1));
    prop.health -= Math.floor(Math.random() * (PLAYER.level + PLAYER.damage[1] - PLAYER.damage[0] + 1)) + PLAYER.damage[0];
    if (prop.health <= 0) {
      PLAYER.exp += prop.exp;
      checkLevel();
      if (prop.type === "boss") {
        message("You Win!");
        setTimeout(start, 1000);
      } else {
        delete PROPS[col + "," + row];
        stats.forceUpdate();
      }
    }
    updateHealth();
    game.forceUpdate();
  }
}
function check(col, row) {
  return !(PROPS.hasOwnProperty(col + "," + row) && (PROPS[col + "," + row].type === "enemy" || PROPS[col + "," + row].type === "boss")) && !(MAP[row][col] === 0);
}
function updateHealth() {
  if (PLAYER.health < 0) {
    PLAYER.lives--;
    if (PLAYER.lives < 0) {
      message("Game Over!");
      PLAYER.col = -1, PLAYER.row = -1;
      setTimeout(reset, 1000);
    } else {
      message("You died!");
      PLAYER.health = PLAYER.maxh;
      PLAYER.col = 2, PLAYER.row = 2;
    }
    stats.forceUpdate();
  }
  var h = PLAYER.health / PLAYER.maxh * 100; // Percentage
  if (h <= 15) health.props.type = "danger";else if (h <= 50) health.props.type = "warning";else health.props.type = "success";
  health.forceUpdate();
}
function checkLevel() {
  var needed = PLAYER.level * 5;
  if (PLAYER.exp >= needed) PLAYER.level++;
}
function message(msg) {
  $("#msg").text(msg);
  $("#msg").addClass("zoomed");
  setTimeout(function () {
    $("#msg").text("WASD/Arrow Keys to move");
    $("#msg").removeClass();
    game.forceUpdate();
  }, 1000);
}

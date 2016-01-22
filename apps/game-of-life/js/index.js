"use strict";

var GRID_SIZE = 15; // Width and Height of a grid in pixels
var generations = 0; // Current generation
var SPEED = 250; // Animation speed

var Grids = React.createClass({
  displayName: "Grids",

  setActive: function setActive() {
    // If active set inactive, and vice versa
    this.props.active = this.props.active === 0 ? 1 : 0;
    this.props.style.background = this.props.active === 1 ? "#AAA" : "#333";
    this.forceUpdate(); // Update grid
  },
  render: function render() {
    if (!this.props.style) {
      var active = this.props.active === 1 ? "#AAA" : "#333";
      this.props.style = {
        top: this.props.row * GRID_SIZE + 5,
        left: this.props.col * GRID_SIZE + 5,
        width: GRID_SIZE,
        height: GRID_SIZE,
        background: active
      };
    }
    return React.createElement("div", { className: "grid", onClick: this.setActive, style: this.props.style });
  }
});

var Board = React.createClass({
  displayName: "Board",

  componentDidMount: function componentDidMount() {
    // Initial set up
    generations = 0;
    this.setSize(30);
  },
  setSpeed: function setSpeed(value) {
    // Set animation speed
    SPEED = value;
    this.pause();
    this.play();
  },
  setSize: function setSize(size) {
    // Set board width and height
    this.pause();
    generations = 0;
    this.props.size = size;
    this.props.parts = null;
    this.forceUpdate();
  },
  play: function play() {
    // Play the animation
    this.props.playing = setInterval(this.getNext, SPEED);
  },
  pause: function pause() {
    // Pause the animation
    clearInterval(this.props.playing);
  },
  random: function random() {
    // Set board up randomly
    this.props.parts = null;
    this.forceUpdate();
  },
  getRandom: function getRandom() {
    // Get random board
    generations = 0;
    this.props.parts = [];
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {
        var active = Math.floor(Math.random() * 3);
        active = active === 0 ? 1 : 0;
        this.props.parts.push(React.createElement(Grids, { row: i, col: j, active: active }));
      }
    }
  },
  clear: function clear() {
    // Clear the board, pause, and reset gens
    generations = 0;
    this.props.parts = [];
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {
        this.props.parts.push(React.createElement(Grids, { row: i, col: j, active: 0 }));
      }
    }
    this.forceUpdate();
  },
  addBeacon: function addBeacon() {
    generations = 0;
    this.props.parts = [];
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {
        var act = 0;
        // Building Beacon
        // 1 1 0 0
        // 1 1 0 0 
        // 0 0 1 1
        // 0 0 1 1
        switch (i + "," + j) {
          case "0,0":
          case "1,0":
          case "0,1":
          case "1,1":
          case "2,2":
          case "2,3":
          case "3,2":
          case "3,3":
            act = 1;
            break;
        }
        this.props.parts.push(React.createElement(Grids, { row: i, col: j, active: act }));
      }
    }
    this.forceUpdate();
  },
  addPulsar: function addPulsar() {
    generations = 0;
    this.props.parts = [];
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {
        var act = 0;
        // Building pulsar http://www.conwaylife.com/wiki/Pulsar
        switch (i + "," + j) {
          case "3,1":
          case "4,1":
          case "5,1":
          case "3,6":
          case "4,6":
          case "5,6":
          case "3,8":
          case "4,8":
          case "5,8":
          case "3,13":
          case "4,13":
          case "5,13":
          case "1,3":
          case "1,4":
          case "1,5":
          case "1,9":
          case "1,10":
          case "1,11":
          case "6,5":
          case "6,3":
          case "6,4":
          case "6,11":
          case "6,9":
          case "6,10":
          case "8,5":
          case "8,3":
          case "8,4":
          case "8,11":
          case "8,9":
          case "8,10":
          case "9,1":
          case "10,1":
          case "11,1":
          case "9,6":
          case "10,6":
          case "11,6":
          case "9,8":
          case "10,8":
          case "11,8":
          case "9,13":
          case "10,13":
          case "11,13":
          case "13,3":
          case "13,4":
          case "13,5":
          case "13,9":
          case "13,10":
          case "13,11":
            act = 1;
            break;
        }
        this.props.parts.push(React.createElement(Grids, { row: i, col: j, active: act }));
      }
    }
    this.forceUpdate();
  },
  addGlider: function addGlider() {
    generations = 0;
    this.props.parts = [];
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {
        var act = 0;
        // Building
        // 0 0 1
        // 1 0 1
        // 0 1 1
        switch (i + "," + j) {
          case "0,2":
          case "1,2":
          case "2,2":
          case "2,1":
          case "1,0":
            act = 1;
            break;
        }
        this.props.parts.push(React.createElement(Grids, { row: i, col: j, active: act }));
      }
    }
    this.forceUpdate();
  },
  addLWSS: function addLWSS() {
    generations = 0;
    this.props.parts = [];
    for (var i = 0; i < this.props.size; i++) {
      for (var j = 0; j < this.props.size; j++) {
        var act = 0;
        // Building Light Weight Space Ship
        // http://www.conwaylife.com/wiki/LWSS
        switch (i + "," + j) {
          case "1,1":
          case "3,1":
          case "4,2":
          case "4,3":
          case "4,4":
          case "4,5":
          case "3,5":
          case "2,5":
          case "1,4":
            act = 1;
            break;
        }
        this.props.parts.push(React.createElement(Grids, { row: i, col: j, active: act }));
      }
    }
    this.forceUpdate();
  },
  getNext: function getNext() {
    // Get next step in life
    generations++;
    var size = this.props.size;
    var board = this.props.parts.slice();
    var change = [];
    for (var i = 0; i < board.length; i++) {
      // Get the north neighbor
      var north = function north() {
        if (i - size < 0) return board[board.length + (i - size)];
        return board[i - size];
      };
      // Get the east neighbor
      var east = function east() {
        if ((i + 1) % size === 0) return board[i - (size - 1)];
        return board[i + 1];
      };
      // Get the south neighbor
      var south = function south() {
        if (i + size >= board.length) return board[i + size - board.length];
        return board[i + size];
      };
      // Get the west neighbor
      var west = function west() {
        if ((i - 1) % size === size - 1 || (i - 1) % size < 0) return board[i + (size - 1)];
        return board[i - 1];
      };
      // Get the north-east neighbor
      var neast = function neast() {
        if (i - size + 1 < 0) return board[board.length + (i - size + 1)];
        if ((i + 1) % size === 0) return board[i - size + 1 - size] || board[i - size + 1 + size * (size - 1)];
        return board[i - size + 1];
      };
      // Get the north-west neighbor
      var nwest = function nwest() {
        if (i % size === 0) return board[i - 1] || board[board.length - 1];
        if (i - size - 1 < 0) return board[board.length + (i - size - 1)];
        return board[i - size - 1];
      };
      // Get the south-east neighbor
      var seast = function seast() {
        if ((i + 1) % size === 0) return board[i + size + 1 - size] || board[0];
        if (i + size + 1 >= board.length) return board[i + size + 1 - board.length];
        return board[i + size + 1];
      };
      // Get the south-west neighbor
      var swest = function swest() {
        if (i % size === 0) return board[i + size + (size - 1)] || board[size - 1];
        if (i + size - 1 >= board.length) return board[i + size - 1 - board.length];
        return board[i + size - 1];
      };
      // Set to new variables and get active property
      var n = north().props.active,
          e = east().props.active,
          s = south().props.active,
          w = west().props.active,
          ne = neast().props.active,
          nw = nwest().props.active,
          se = seast().props.active,
          sw = swest().props.active;
      // Get total of inactive neighbors (1 is active or live, 0 is dead)
      var total = n + e + s + w + ne + nw + se + sw;
      var tochange = [i, board[i]];
      // If current tile is alive
      if (tochange[1].props.active === 1) {
        if (total < 2) change.push(tochange); // Underpopulation
        else if (total > 3) change.push(tochange); // Overpopulation
      } else if (total === 3) change.push(tochange); // New life
    }
    for (var i = 0; i < change.length; i++) {
      board[change[i][0]].props.active = change[i][1].props.active === 1 ? 0 : 1;
    }
    this.forceUpdate();
  },
  render: function render() {
    // Render the board and buttons: set size
    var style = {
      width: this.props.size * GRID_SIZE,
      height: this.props.size * GRID_SIZE
    };
    // Set grid width
    $("#grid").width(this.props.size * GRID_SIZE);
    if (this.props.parts) {
      // If board exists
      for (var i = 0, partial = []; i < this.props.parts.length; i++) {
        partial.push(React.createElement(Grids, { row: this.props.parts[i].props.row, col: this.props.parts[i].props.col, active: this.props.parts[i].props.active }));
      }
      this.props.parts = partial.slice();
    } else this.getRandom(); // If no board, randomly generate
    // Update generations text
    $("#generations").text("Generation: " + generations);
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { style: style, id: "board" },
        this.props.parts
      ),
      React.createElement(
        "div",
        { className: "btn-group", role: "group" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.setSize.bind(this, 30) },
          "x30"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.setSize.bind(this, 40) },
          "x40"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.setSize.bind(this, 50) },
          "x50"
        )
      ),
      React.createElement(
        "div",
        { className: "btn-group", role: "group" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.play },
          " ",
          React.createElement("i", { className: "fa fa-play" }),
          " "
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.pause },
          " ",
          React.createElement("i", { className: "fa fa-pause" }),
          " "
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.getNext },
          " ",
          React.createElement("i", { className: "fa fa-forward" }),
          " "
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.random },
          " ",
          React.createElement("i", { className: "fa fa-random" }),
          " "
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.clear },
          " ",
          React.createElement("i", { className: "fa fa-cut" }),
          " "
        )
      ),
      React.createElement(
        "div",
        { className: "btn-group", role: "group" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.setSpeed.bind(this, 500) },
          "Slow"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.setSpeed.bind(this, 250) },
          "Medium"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.setSpeed.bind(this, 100) },
          "Fast"
        )
      ),
      React.createElement(
        "div",
        { className: "btn-group", role: "group" },
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.addBeacon },
          "Beacon"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.addPulsar },
          "Pulsar"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.addGlider },
          "Glider"
        ),
        React.createElement(
          "button",
          { className: "btn btn-default", onClick: this.addLWSS },
          "LWSS"
        )
      ),
      React.createElement("br", null)
    );
  }
});
ReactDOM.render(React.createElement(Board, { size: "10" }), document.getElementById("grid"));
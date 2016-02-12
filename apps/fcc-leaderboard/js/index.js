"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var urlroot = "https://fcctop100.herokuapp.com/api/fccusers/top100/";

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "header",
      null,
      React.createElement(
        "a",
        { href: "http://www.freecodecamp.com" },
        React.createElement("img", { src: "https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" })
      )
    );
  }
});
var Head = React.createClass({
  displayName: "Head",

  render: function render() {
    return React.createElement(
      "header",
      { className: "head" },
      "This score is calculated as Points + (projects * 50) + (algorithms * 5)"
    );
  }
});

var Footer = React.createClass({
  displayName: "Footer",

  year: function year() {
    return new Date().getFullYear();
  },
  render: function render() {
    return React.createElement(
      "footer",
      null,
      React.createElement(
        "h3",
        null,
        "© ",
        React.createElement(
          "a",
          { href: "http://hermanfassett.me" },
          "Herman Fassett"
        ),
        " ",
        this.year()
      )
    );
  }
});

var User = React.createClass({
  displayName: "User",

  render: function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.i
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: "http://freecodecamp.com/" + this.props.username, target: "_blank", className: "user" },
          React.createElement("img", { src: this.props.img }),
          React.createElement(
            "div",
            null,
            this.props.username
          )
        )
      ),
      React.createElement(
        "td",
        null,
        this.props.total
      ),
      React.createElement(
        "td",
        null,
        this.props.totalRecent
      )
    );
  }
});

var Table = React.createClass({
  displayName: "Table",

  getInitialState: function getInitialState() {
    return {
      users: [],
      sort: 'alltime',
      alltimeactive: "▾",
      recentactive: ""
    };
  },
  componentDidMount: function componentDidMount() {
    $.get(urlroot + this.state.sort, (function (result) {
      if (this.isMounted()) {
        this.setState({
          users: result,
          sort: 'alltime'
        });
      }
    }).bind(this));
  },
  render: function render() {
    return React.createElement(
      "table",
      { className: "table table-hover table-striped" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "#"
          ),
          React.createElement(
            "th",
            null,
            "Campername"
          ),
          React.createElement(
            "th",
            { className: "sort", onClick: this.sort.bind(this, "alltime") },
            "Alltime ",
            this.state.alltimeactive
          ),
          React.createElement(
            "th",
            { className: "sort", onClick: this.sort.bind(this, "recent") },
            "Recent ",
            this.state.recentactive
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        this.state.users.map(function (user, i) {
          return React.createElement(User, _extends({ i: i }, user));
        })
      )
    );
  },
  sort: function sort(input) {
    this.state.sort = input;
    var name = input + "active";
    var other = (input === "alltime" ? "recent" : "alltime") + "active";
    this.state[name] = "▾";
    this.state[other] = "";
    this.componentDidMount();
  }
});
var Page = React.createClass({
  displayName: "Page",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Header, null),
      React.createElement(Head, null),
      React.createElement(Table, null),
      React.createElement(Footer, null)
    );
  }
});
React.render(React.createElement(Page, null), document.getElementById("fcc"));

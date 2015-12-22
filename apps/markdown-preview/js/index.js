var DisplayContainer = React.createClass({
  displayName: 'DisplayContainer',

  updateValue: function updateValue(modifiedValue) {
    this.setState({
      value: modifiedValue
    });
  },
  getInitialState: function getInitialState() {
    return {
      value: '#Testing *mark*down\n####What is there to test?\n****\n' + '+ Everything\n+ Nothing\n* Whatever you want!\n----\n' + '| Code        | None Code |\n' + '-------------- | -------------   |\n' +
        '| `*Hi*`        | *Hi*             |\n' + '| `**Bye**`   | **Bye**        |\n' + '| `~~Die~~` | ~~Die~~     |\n' + '____\n' + '```\nfunction hello_world() {\n' + '    alert("**HELLO WORLD**!");\n}\n```\n' +
        '>Notice that the `**` don\'t do anything\n\n' + '####Have fun with this!\n*~[Herman Fassett](http://freecodecamp.com/hermanfassett)*'
    };
  },
  rawMarkup: function rawMarkup(value) {
    var rawMarkup = marked(value, {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  },
  render: function render() {
    return React.createElement(
      'div', {
        className: 'row'
      },
      React.createElement(
        'div', {
          className: 'col-md-6'
        },
        React.createElement(RawInput, {
          value: this.state.value,
          updateValue: this.updateValue
        })
      ),
      React.createElement(
        'div', {
          className: 'col-md-6'
        },
        React.createElement('span', {
          dangerouslySetInnerHTML: this.rawMarkup(this.state.value)
        })
      )
    );
  }
});

var RawInput = React.createClass({
  displayName: 'RawInput',

  update: function update() {
    var modifiedValue = this.refs.inputValue.getDOMNode().value;
    this.props.updateValue(modifiedValue);
  },
  render: function render() {
    return React.createElement('textarea', {
      rows: '22',
      type: 'text',
      ref: 'inputValue',
      value: this.props.value,
      onChange: this.update,
      className: 'form-control'
    });
  }
});

React.render(React.createElement(DisplayContainer, null), document.getElementById("container"));

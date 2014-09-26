(function(){
  var React, div, App;
  React = require('react');
  div = React.DOM.div;
  App = React.createClass({
    displayName: 'React.App',
    getInitialState: function(){
      return {
        color: 'red'
      };
    },
    render: function(){
      var this$ = this;
      return div({
        className: 'app',
        style: {
          background: this.state.color
        },
        onClick: function(){
          return this$.setState({
            color: this$.state.color === 'red' ? 'green' : 'red'
          });
        }
      }, 'click me');
    }
  });
  module.exports = App;
}).call(this);

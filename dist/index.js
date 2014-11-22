(function(){
  var $, React, Word, computeLength, div, log;
  $ = require('jquery');
  React = require('react');
  Word = require('./zhStroker').Word;
  computeLength = require('./zhStroker/data').computeLength;
  div = React.DOM.div;
  log = function(it){
    try {
      return console.log(it);
    } catch (e$) {}
  };
  $.getJSON('./json/840c.json', function(data){
    var progress, onEnter, onLeave, onEnterStroke, onLeaveStroke, App, app;
    data = computeLength(data);
    progress = 0;
    onEnter = function(){
      return log('enter');
    };
    onLeave = function(){
      return log('leave');
    };
    onEnterStroke = function(){
      return log('enter stroke');
    };
    onLeaveStroke = function(){
      return log('leave stroke');
    };
    App = React.createFactory(React.createClass({
      displayName: 'App',
      getDefaultProps: function(){
        return {
          data: {}
        };
      },
      getInitialState: function(){
        return {
          progress: 0
        };
      },
      update: function(){
        this.setState({
          progress: (this.state.progress + 20) % this.props.data.length
        });
        return requestAnimationFrame(this.update);
      },
      render: function(){
        var dim, i;
        dim = 400;
        return div({}, Word({
          data: this.props.data,
          progress: this.state.progress,
          onEnter: onEnter,
          onLeave: onLeave,
          onEnterStroke: onEnterStroke,
          onLeaveStroke: onLeaveStroke
        }), (function(){
          var i$, results$ = [];
          for (i$ = 0; i$ < 4; ++i$) {
            i = i$;
            dim /= 2;
            results$.push(Word({
              key: i,
              data: this.props.data,
              progress: this.state.progress,
              width: dim,
              height: dim
            }));
          }
          return results$;
        }.call(this)));
      }
    }));
    app = React.render(App({
      data: data
    }), document.getElementById('container'));
    return requestAnimationFrame(app.update);
  });
}).call(this);

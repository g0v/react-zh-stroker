(function(){
  var getJSON, React, ReactDOM, ref$, data, Word, computeLength, div, log;
  require('whatwg-fetch');
  getJSON = function(path, next){
    return fetch(path).then(function(it){
      return it.json();
    }).then(next)['catch'](console.error);
  };
  React = require('react');
  ReactDOM = require('react-dom');
  ref$ = require('./dist'), data = ref$.data, Word = ref$.Word;
  computeLength = data.computeLength;
  Word = React.createFactory(Word);
  div = React.DOM.div;
  log = function(it){
    try {
      return console.log(it);
    } catch (e$) {}
  };
  getJSON('./json/840c.json', function(data){
    var colors, progress, onEnter, onLeave, onEnterStroke, onLeaveStroke, App, app;
    data = computeLength(data);
    colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#009688'];
    progress = 0;
    onEnter = function(){};
    onLeave = function(){};
    onEnterStroke = function(){};
    onLeaveStroke = function(){};
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
          color: colors[0],
          progress: this.state.progress,
          onEnter: onEnter,
          onLeave: onLeave,
          onEnterStroke: onEnterStroke,
          onLeaveStroke: onLeaveStroke
        }), (function(){
          var i$, results$ = [];
          for (i$ = 1; i$ <= 4; ++i$) {
            i = i$;
            dim /= 2;
            results$.push(Word({
              key: i,
              data: this.props.data,
              color: colors[i],
              progress: this.state.progress,
              width: dim,
              height: dim
            }));
          }
          return results$;
        }.call(this)));
      }
    }));
    app = ReactDOM.render(App({
      data: data
    }), document.getElementById('container'));
    return requestAnimationFrame(app.update);
  });
}).call(this);

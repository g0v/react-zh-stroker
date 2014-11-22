(function(){
  var $, React, Word, computeLength, log;
  $ = require('jquery');
  React = require('react');
  Word = require('./zhStroker').Word;
  computeLength = require('./zhStroker/data').computeLength;
  log = function(it){
    try {
      return console.log(it);
    } catch (e$) {}
  };
  $.getJSON('./json/840c.json', function(data){
    var progress, onEnter, onLeave, onEnterStroke, onLeaveStroke, word, update;
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
    word = React.render(Word({
      data: data,
      progress: progress,
      onEnter: onEnter,
      onLeave: onLeave,
      onEnterStroke: onEnterStroke,
      onLeaveStroke: onLeaveStroke
    }), document.getElementById('container'));
    update = function(){
      word.setProps({
        progress: progress
      });
      progress += 20;
      if (progress < data.length) {
        return requestAnimationFrame(update);
      }
    };
    return requestAnimationFrame(update);
  });
}).call(this);

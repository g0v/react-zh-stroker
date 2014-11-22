(function(){
  var React, Stroke, ref$, svg, g, Word;
  React = require('react');
  Stroke = React.createFactory(require('./Stroke'));
  ref$ = React.DOM, svg = ref$.svg, g = ref$.g;
  Word = module.exports = React.createClass({
    displayName: "zhStroker.Word",
    getDefaultProps: function(){
      return {
        data: {
          word: [],
          length: 0
        },
        x: 0,
        y: 0,
        width: 410,
        height: 410,
        progress: Infinity,
        onEnter: function(){},
        onLeave: function(){},
        onEnterStroke: function(){},
        onLeaveStroke: function(){}
      };
    },
    componentWillReceiveProps: function(next){
      var length;
      length = this.props.data.length;
      if (this.props.progress <= 0 && next.progress > 0) {
        this.props.onEnter();
      }
      if (this.props.progress <= length && next.progress > length) {
        return this.props.onLeave();
      }
    },
    render: function(){
      var ref$, length, word, progress, i, stroke, comp;
      ref$ = this.props.data, length = ref$.length, word = ref$.word;
      progress = this.props.progress;
      if (progress < 0) {
        progress = 0;
      }
      if (progress > length) {
        progress = length;
      }
      return svg({
        width: this.props.width,
        height: this.props.height,
        viewBox: "0 0 2050 2050",
        version: 1.1,
        xmlns: '"http://www.w3.org/2000/svg'
      }, g({
        x: this.props.x,
        y: this.props.y
      }, (function(){
        var ref$, results$ = [];
        for (i in ref$ = word) {
          stroke = ref$[i];
          comp = Stroke({
            key: i,
            data: stroke,
            progress: progress,
            onEnterStroke: this.props.onEnterStroke,
            onLeaveStroke: this.props.onLeaveStroke
          });
          progress -= stroke.length;
          results$.push(comp);
        }
        return results$;
      }.call(this))));
    }
  });
}).call(this);

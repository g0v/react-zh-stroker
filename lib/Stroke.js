(function(){
  var React, Track, equal, ref$, g, defs, path, clipPath, Stroke;
  React = require('react');
  Track = React.createFactory(require('./Track'));
  equal = require('./data/equal');
  ref$ = React.DOM, g = ref$.g, defs = ref$.defs, path = ref$.path, clipPath = ref$.clipPath;
  Stroke = module.exports = React.createClass({
    displayName: "zhStroker.Stroke",
    getDefaultProps: function(){
      return {
        data: {
          outline: [],
          track: [],
          length: 0
        },
        x: 0,
        y: 0,
        color: 'black',
        trackSize: 200,
        progress: Infinity,
        onEnterStroke: function(){},
        onLeaveStroke: function(){}
      };
    },
    componentWillReceiveProps: function(next){
      var length;
      length = this.props.data.length;
      if (this.props.progress <= 0 && next.progress > 0) {
        this.props.onEnterStroke(this.props, next);
      }
      if (this.props.progress < length && next.progress >= length) {
        return this.props.onLeaveStroke(this.props, next);
      }
    },
    render: function(){
      var length, progress, sum, outline, res$, i$, ref$, len$, cmd, id, track, i, bgn, end, comp;
      length = this.props.data.length;
      progress = this.props.progress;
      if (progress < 0) {
        progress = 0;
      }
      if (progress > length) {
        progress = length;
      }
      if (equal(progress, length)) {
        progress = length;
      }
      sum = 0;
      res$ = [];
      for (i$ = 0, len$ = (ref$ = this.props.data.outline).length; i$ < len$; ++i$) {
        cmd = ref$[i$];
        switch (cmd.type) {
        case 'M':
          sum += cmd.x + cmd.y;
          res$.push("M " + cmd.x + " " + cmd.y);
          break;
        case 'L':
          sum += cmd.x + cmd.y;
          res$.push("L " + cmd.x + " " + cmd.y);
          break;
        case 'Q':
          sum += cmd.begin.x + cmd.begin.y + cmd.end.x + cmd.end.y;
          res$.push("Q " + cmd.begin.x + " " + cmd.begin.y + ", " + cmd.end.x + " " + cmd.end.y);
          break;
        case 'C':
          sum += cmd.begin.x + cmd.begin.y + cmd.mid.x + cmd.mid.y + cmd.end.x + cmd.end.y;
          res$.push("C " + cmd.begin.x + " " + cmd.begin.y + ", " + cmd.mid.x + " " + cmd.mid.y + ", " + cmd.end.x + " " + cmd.end.y);
        }
      }
      outline = res$;
      outline.push('Z');
      outline = outline.join(' ');
      id = (sum + "").replace('.', '');
      track = this.props.data.track;
      if (progress !== length) {
        return g({
          x: this.props.x,
          y: this.props.y,
          clipPath: "url(#" + id + ")"
        }, defs({}, clipPath({
          id: id
        }, path({
          d: outline,
          fill: '#F00'
        }))), (function(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = track.length - 1; i$ < to$; ++i$) {
            i = i$;
            bgn = track[i];
            end = track[i + 1];
            comp = Track({
              key: i,
              data: {
                bgn: bgn,
                end: end
              },
              color: this.props.color,
              trackSize: this.props.trackSize,
              progress: progress
            });
            progress -= bgn.length;
            results$.push(comp);
          }
          return results$;
        }.call(this)));
      } else {
        return g({
          x: this.props.x,
          y: this.props.y
        }, path({
          d: outline,
          fill: this.props.color,
          strokeWidth: 1,
          strokeLinejoin: 'round'
        }));
      }
    }
  });
}).call(this);

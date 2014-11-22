(function(){
  var React, ref$, g, path, Track;
  React = require('react');
  ref$ = React.DOM, g = ref$.g, path = ref$.path;
  Track = module.exports = React.createClass({
    displayName: "zhStroker.Track",
    getDefaultProps: function(){
      return {
        data: {
          bgn: {
            x: 0,
            y: 0,
            length: 0
          },
          end: {
            x: 0,
            y: 0
          }
        },
        x: 0,
        y: 0,
        progress: Infinity
      };
    },
    render: function(){
      var ref$, bgn, end, progress, ratio, dx, dy, track, valid;
      ref$ = this.props.data, bgn = ref$.bgn, end = ref$.end;
      progress = this.props.progress;
      if (progress < 0) {
        progress = 0;
      }
      if (progress > bgn.length) {
        progress = bgn.length;
      }
      ratio = progress / bgn.length;
      dx = (end.x - bgn.x) * ratio;
      dy = (end.y - bgn.y) * ratio;
      track = "M" + bgn.x + " " + bgn.y + " L" + (bgn.x + dx) + " " + (bgn.y + dy);
      valid = !isNaN(ratio) && ratio !== Infinity && ratio !== 0;
      return g({
        x: this.props.x,
        y: this.props.y
      }, path({
        d: valid ? track : 'M0 0 L0 0',
        fill: 'transparent',
        stroke: '#000',
        strokeWidth: valid ? 4 * bgn.size || 250 : 0,
        strokeLinecap: 'round'
      }));
    }
  });
}).call(this);

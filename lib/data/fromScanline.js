(function(){
  var fromScanline;
  fromScanline = function(txt, done){
    var strokes, stroke, data, lines, i$, len$, line, r;
    strokes = [];
    stroke = [];
    data = null;
    lines = txt.split(/\r+\n+/);
    for (i$ = 0, len$ = lines.length; i$ < len$; ++i$) {
      line = lines[i$];
      if (r = /^([0|1]),(\d+)$/.exec(line)) {
        if (r[1] === '0' && r[2] === '0') {
          stroke.push(data);
          strokes.push(stroke);
          stroke = [];
          data = null;
        } else {
          if (data) {
            stroke.push(data);
          }
          data = {
            direction: +r[1],
            lines: []
          };
        }
      } else if (r = /^(\d+),(\d+),(\d+)$/.exec(line)) {
        data.lines.push({
          idx: +r[1],
          start: +r[2],
          end: +r[3]
        });
      }
    }
    done(null, strokes);
  };
  module.exports = fromScanline;
}).call(this);

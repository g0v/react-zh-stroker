(function(){
  var sax, fromXML;
  sax = require('sax');
  fromXML = function(doc, done){
    var ret, outlines, tracks, outline, track, parser, strict;
    ret = [];
    outlines = [];
    tracks = [];
    parser = sax.parser(strict = true);
    parser.onopentag = function(node){
      var curr, prev, dx, dy;
      if (outline) {
        switch (node.name) {
        case 'MoveTo':
          return outline.push({
            type: 'M',
            x: parseFloat(node.attributes.x),
            y: parseFloat(node.attributes.y)
          });
        case 'LineTo':
          return outline.push({
            type: 'L',
            x: parseFloat(node.attributes.x),
            y: parseFloat(node.attributes.y)
          });
        case 'CubicTo':
          return outline.push({
            type: 'C',
            begin: {
              x: parseFloat(node.attributes.x1),
              y: parseFloat(node.attributes.y1)
            },
            mid: {
              x: parseFloat(node.attributes.x2),
              y: parseFloat(node.attributes.y2)
            },
            end: {
              x: parseFloat(node.attributes.x3),
              y: parseFloat(node.attributes.y3)
            }
          });
        case 'QuadTo':
          return outline.push({
            type: 'Q',
            begin: {
              x: parseFloat(node.attributes.x1),
              y: parseFloat(node.attributes.y1)
            },
            end: {
              x: parseFloat(node.attributes.x2),
              y: parseFloat(node.attributes.y2)
            }
          });
        }
      } else if (track) {
        switch (node.name) {
        case 'MoveTo':
          curr = {
            x: parseFloat(node.attributes.x),
            y: parseFloat(node.attributes.y),
            size: node.attributes.size ? parseFloat(node.attributes.size) : undefined
          };
          if (prev = track[track.length - 1]) {
            dx = curr.x - prev.x;
            dy = curr.y - prev.y;
            prev.length = Math.sqrt(dx * dx + dy * dy);
          }
          return track.push(curr);
        }
      } else {
        if (node.name === 'Outline') {
          outline = [];
        }
        if (node.name === 'Track') {
          return track = [];
        }
      }
    };
    parser.onclosetag = function(name){
      if (name === 'Outline') {
        outlines.push(outline);
        outline = null;
      }
      if (name === 'Track') {
        tracks.push(track);
        return track = null;
      }
    };
    parser.onend = function(){
      var i, ref$, outline, track;
      for (i in ref$ = outlines) {
        outline = ref$[i];
        track = tracks[i];
        ret.push({
          outline: outline,
          track: track
        });
      }
      return done(null, ret);
    };
    parser.onerror = done;
    parser.write(doc).close();
  };
  module.exports = fromXML;
}).call(this);

(function(){
  var sax, bytebuffer, fromXML, undelta, undeltaR, scale, size, fromBinary, fromScanline, computeLength;
  sax = require('sax');
  bytebuffer = require('ByteBuffer');
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
  undelta = function(xs){
    var results, i$, to$, i;
    results = [xs[0]];
    for (i$ = 1, to$ = xs.length; i$ < to$; ++i$) {
      i = i$;
      results.push((results[i - 1] + xs[i] + 256) % 256);
    }
    return results;
  };
  undeltaR = function(result, current){
    var prev;
    prev = result.length !== 0 ? result[result.length - 1] : 0;
    return result.concat([(prev + current + 256) % 256]);
  };
  scale = function(v){
    return v * 2060.0 / 256;
  };
  size = {
    M: 1,
    L: 1,
    Q: 2,
    C: 3
  };
  fromBinary = function(buffer, done){
    var bb, numWords, ids, offsets, i$, data, res$, lresult$, numStrokes, j$, numCmds, numCoords, outline, res1$, k$, type, xs, ys, i, len$, cmd, numTracks, numSizes, idxSizes, ss, track, curr, prev, dx, dy, idx, result;
    ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.LITTLE_ENDIAN;
    bb = ByteBuffer.wrap(buffer);
    numWords = bb.readUint16();
    ids = [];
    offsets = [];
    for (i$ = 0; i$ < numWords; ++i$) {
      ids.push(bb.readUint16());
      offsets.push(bb.readUint32());
    }
    res$ = [];
    for (i$ = 0; i$ < numWords; ++i$) {
      lresult$ = [];
      numStrokes = bb.readUint8();
      for (j$ = 0; j$ < numStrokes; ++j$) {
        numCmds = bb.readUint8();
        numCoords = 0;
        res1$ = [];
        for (k$ = 0; k$ < numCmds; ++k$) {
          type = bb.readString(1);
          numCoords += size[type];
          res1$.push({
            type: type
          });
        }
        outline = res1$;
        xs = undelta((fn$())).map(scale);
        ys = undelta((fn1$())).map(scale);
        i = 0;
        for (k$ = 0, len$ = outline.length; k$ < len$; ++k$) {
          cmd = outline[k$];
          switch (cmd.type) {
          case 'M':
            cmd.x = xs[i];
            cmd.y = ys[i++];
            break;
          case 'L':
            cmd.x = xs[i];
            cmd.y = ys[i++];
            break;
          case 'Q':
            cmd.begin = {
              x: xs[i],
              y: ys[i++]
            };
            cmd.end = {
              x: xs[i],
              y: ys[i++]
            };
            break;
          case 'C':
            cmd.begin = {
              x: xs[i],
              y: ys[i++]
            };
            cmd.mid = {
              x: xs[i],
              y: ys[i++]
            };
            cmd.end = {
              x: xs[i],
              y: ys[i++]
            };
          }
        }
        numTracks = bb.readUint8();
        numSizes = bb.readUint8();
        res1$ = [];
        for (k$ = 0; k$ < numSizes; ++k$) {
          res1$.push(bb.readUint8());
        }
        idxSizes = res1$;
        xs = undelta((fn2$())).map(scale);
        ys = undelta((fn3$())).map(scale);
        ss = (fn4$()).map(scale);
        track = [];
        for (k$ = 0; k$ < numTracks; ++k$) {
          i = k$;
          curr = {
            x: xs[i],
            y: ys[i]
          };
          if (prev = track[track.length - 1]) {
            dx = curr.x - prev.x;
            dy = curr.y - prev.y;
            prev.length = Math.sqrt(dx * dx + dy * dy);
          }
          track.push(curr);
        }
        i = 0;
        for (k$ = 0, len$ = idxSizes.length; k$ < len$; ++k$) {
          idx = idxSizes[k$];
          track[idx].size = ss[i++];
        }
        lresult$.push({
          outline: outline,
          track: track
        });
      }
      res$.push(lresult$);
    }
    data = res$;
    bb.flip();
    result = {};
    for (i in ids) {
      result[ids[i]] = data[i];
    }
    done(null, result);
    function fn$(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = numCoords; i$ < to$; ++i$) {
        results$.push(bb.readUint8());
      }
      return results$;
    }
    function fn1$(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = numCoords; i$ < to$; ++i$) {
        results$.push(bb.readUint8());
      }
      return results$;
    }
    function fn2$(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = numTracks; i$ < to$; ++i$) {
        results$.push(bb.readUint8());
      }
      return results$;
    }
    function fn3$(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = numTracks; i$ < to$; ++i$) {
        results$.push(bb.readUint8());
      }
      return results$;
    }
    function fn4$(){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = numSizes; i$ < to$; ++i$) {
        results$.push(bb.readUint8());
      }
      return results$;
    }
  };
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
  computeLength = function(word){
    var length, i$, len$, stroke, len, i, ref$, curr, prev, dx, dy;
    length = 0;
    for (i$ = 0, len$ = word.length; i$ < len$; ++i$) {
      stroke = word[i$];
      len = 0;
      for (i in ref$ = stroke.track) {
        curr = ref$[i];
        if (prev = stroke.track[i - 1]) {
          if (!prev.length) {
            dx = curr.x - prev.x;
            dy = curr.y - prev.y;
            prev.length = Math.sqrt(dx * dx + dy * dy);
          }
          len += prev.length;
        }
      }
      length += stroke.length = len;
    }
    return {
      word: word,
      length: length
    };
  };
  module.exports = {
    fromXML: fromXML,
    fromBinary: fromBinary,
    fromScanline: fromScanline,
    computeLength: computeLength
  };
}).call(this);
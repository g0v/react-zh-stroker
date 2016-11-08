(function(){
  var ByteBuffer, undelta, undeltaR, scale, size, fromBinary;
  ByteBuffer = require('bytebuffer');
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
    if (!done) {
      return;
    }
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
  module.exports = fromBinary;
}).call(this);

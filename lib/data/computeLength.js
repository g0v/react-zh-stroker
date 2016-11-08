(function(){
  var computeLength;
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
  module.exports = computeLength;
}).call(this);

computeLength = (word) ->
  length = 0
  for stroke in word
    len = 0
    for i, curr of stroke.track
      if prev = stroke.track[i-1]
        if not prev.length
          dx = curr.x - prev.x
          dy = curr.y - prev.y
          prev.length = Math.sqrt dx * dx + dy * dy
        len += prev.length
    length += stroke.length = len
  { word, length }



module.exports = computeLength

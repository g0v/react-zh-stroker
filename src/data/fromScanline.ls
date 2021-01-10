fromScanline = (txt, done) !->
  strokes = []
  stroke = []
  data = null
  lines = txt.split /\r+\n+/
  for line in lines
    if r = /^([0|1]),(\d+)$/exec line
      if r.1 is '0' and r.2 is '0'
        stroke.push data
        strokes.push stroke
        stroke = []
        data = null
      else
        stroke.push data if data
        data =
          direction: +r.1
          lines: []
    else if r = /^(\d+),(\d+),(\d+)$/exec line
      data.lines.push idx: +r.1, start: +r.2, end: +r.3
  done null, strokes

module.exports = fromScanline

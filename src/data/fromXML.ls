require! sax

fromXML = (doc, done) !->
  ret      = []
  outlines = []
  tracks   = []
  var outline, track
  # thank you, sax
  parser = sax.parser (strict = true)
  parser.onopentag = (node) ->
    # parse path of the outline
    if outline
      switch node.name
        when \MoveTo
          outline.push do
            type: \M
            x: parseFloat node.attributes.x
            y: parseFloat node.attributes.y
        when \LineTo
          outline.push do
            type: \L
            x: parseFloat node.attributes.x
            y: parseFloat node.attributes.y
        when \CubicTo
          outline.push do
            type: \C
            begin:
              x: parseFloat node.attributes.x1
              y: parseFloat node.attributes.y1
            mid:
              x: parseFloat node.attributes.x2
              y: parseFloat node.attributes.y2
            end:
              x: parseFloat node.attributes.x3
              y: parseFloat node.attributes.y3
        when \QuadTo
          outline.push do
            type: \Q
            begin:
              x: parseFloat node.attributes.x1
              y: parseFloat node.attributes.y1
            end:
              x: parseFloat node.attributes.x2
              y: parseFloat node.attributes.y2
    # parse path of the track
    else if track
      switch node.name
        when \MoveTo
          curr =
            x: parseFloat node.attributes.x
            y: parseFloat node.attributes.y
            size: if node.attributes.size then parseFloat(node.attributes.size) else undefined
          if prev = track[*-1]
            dx = curr.x - prev.x
            dy = curr.y - prev.y
            prev.length = Math.sqrt dx * dx + dy * dy
          track.push curr
    # not in any outline or track
    else
      if node.name is \Outline
        outline := []
      if node.name is \Track
        track := []
  # end of parser.onopentag
  parser.onclosetag = (name) ->
    if name is \Outline
      outlines.push outline
      outline := null
    if name is \Track
      tracks.push track
      track := null
  parser.onend = ->
    for i, outline of outlines
      track = tracks[i]
      ret.push do
        outline: outline
        track: track
    done null, ret
  parser.onerror = done
  parser.write(doc).close!

module.exports = fromXML

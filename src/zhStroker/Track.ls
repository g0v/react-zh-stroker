React = require 'react'

{ g, path } = React.DOM

Track = module.exports = React.createClass do
  displayName: "zhStroker.Track"
  getDefaultProps: ->
    data:
      bgn:
        x: 0
        y: 0
        length: 0
      end:
        x: 0
        y: 0
    x: 0
    y: 0
    progress: Infinity
  render: ->
    { bgn, end } = @props.data
    { progress } = @props
    progress = 0      if progress < 0
    progress = bgn.length if progress > bgn.length
    ratio = progress / bgn.length
    dx = (end.x - bgn.x) * ratio
    dy = (end.y - bgn.y) * ratio
    track = "M#{bgn.x} #{bgn.y} L#{bgn.x + dx} #{bgn.y + dy}"
    valid = not isNaN ratio     and
            ratio isnt Infinity and
            ratio isnt 0
    g do
      x: @props.x
      y: @props.y
      path do
        d: if valid
          then track
          else 'M0 0 L0 0'
        fill: \transparent
        stroke: \#000
        stroke-width: if valid
          then 4 * bgn.size or 250
          else 0
        stroke-linecap: \round


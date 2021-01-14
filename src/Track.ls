React = require 'react'
ReactDOM = require 'react-dom'
createClass = require 'create-react-class'

{ createElement } = React

Track = module.exports = createClass do
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
    color: \black
    trackSize: 200
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
    createElement \g,
      x: @props.x
      y: @props.y
      createElement \path,
        d: if valid
          then track
          else 'M0 0 L0 0'
        fill: \transparent
        stroke: @props.color
        stroke-width: if valid
          then @props.trackSize
          else 0
        stroke-linecap: \round


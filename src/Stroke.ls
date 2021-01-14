React = require 'react'
createClass = require 'create-react-class'
Track = require './Track'
equal = require './data/equal'

{ createElement } = React

Stroke = module.exports = createClass do
  displayName: "zhStroker.Stroke"
  getDefaultProps: ->
    data:
      outline: []
      track:   []
      length:  0
    x: 0
    y: 0
    color: \black
    trackSize: 200
    progress: Infinity
    onEnterStroke: ->
    onLeaveStroke: ->
  UNSAFE_componentWillReceiveProps: (next) ->
    { length } = @props.data
    # XXX: one way
    if @props.progress <= 0 and next.progress > 0
      @props.onEnterStroke @props, next
    if @props.progress < length and next.progress >= length
      @props.onLeaveStroke @props, next
  render: ->
    { length }   = @props.data
    { progress } = @props
    # XXX: guard
    progress = 0      if progress < 0
    progress = length if progress > length
    progress = length if equal progress, length
    sum = 0
    outline = for cmd in @props.data.outline
      switch cmd.type
        | \M =>
          sum += cmd.x + cmd.y
          "M #{cmd.x} #{cmd.y}"
        | \L =>
          sum += cmd.x + cmd.y
          "L #{cmd.x} #{cmd.y}"
        | \Q =>
          sum += cmd.begin.x + cmd.begin.y + cmd.end.x + cmd.end.y
          "Q #{cmd.begin.x} #{cmd.begin.y}, #{cmd.end.x} #{cmd.end.y}"
        | \C =>
          sum += cmd.begin.x + cmd.begin.y + cmd.mid.x + cmd.mid.y + cmd.end.x + cmd.end.y
          "C #{cmd.begin.x} #{cmd.begin.y}, #{cmd.mid.x} #{cmd.mid.y}, #{cmd.end.x} #{cmd.end.y}"
    outline.push 'Z'
    outline = outline.join ' '
    id = "#sum".replace '.', ''
    track = @props.data.track
    if progress isnt length then
      createElement \g,
        x: @props.x
        y: @props.y
        clip-path: "url(##{id})"
        createElement \defs, {},
          createElement \clipPath,
            id: id
            createElement \path,
              d: outline
              fill: \#F00
        for i til track.length - 1
          bgn = track[i]
          end = track[i + 1]
          comp = createElement Track,
            key:       i
            data:      { bgn, end }
            color:     @props.color
            trackSize: @props.trackSize
            progress:  progress
          progress -= bgn.length
          comp
    else
      # clip-path will not close itself like path do
      createElement \g,
        x: @props.x
        y: @props.y
        createElement \path,
          d: outline
          fill: @props.color
          strokeWidth: 1
          strokeLinejoin: \round


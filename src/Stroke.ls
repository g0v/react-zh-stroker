React = require 'react'
Track = React.createFactory require './Track'
equal = require './data/equal'

{ g, defs, path, clip-path } = React.DOM

Stroke = module.exports = React.createClass do
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
  componentWillReceiveProps: (next) ->
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
      g do
        x: @props.x
        y: @props.y
        clip-path: "url(##{id})"
        defs {},
          clip-path do
            id: id
            path do
              d: outline
              fill: \#F00
        for i til track.length - 1
          bgn = track[i]
          end = track[i + 1]
          comp = Track do
            key:      i
            data:     { bgn, end }
            color:    @props.color
            trackSize: @props.trackSize
            progress: progress
          progress -= bgn.length
          comp
    else
      # clip-path will not close itself like path do
      g do
        x: @props.x
        y: @props.y
        path do
          d: outline
          fill: @props.color
          strokeWidth: 1
          strokeLinejoin: \round


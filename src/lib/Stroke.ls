React = require 'react'
Track = React.createFactory require './Track'

{ g, defs, path, clip-path } = React.DOM

Stroke = module.exports = React.createClass do
  displayName: "zhStroker.Stroke"
  defaultProps:
    data:
      outline: []
      track:   []
      length:  0
    x: 0
    y: 0
    color: \black
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
    outline = for cmd in @props.data.outline
      switch cmd.type
        | \M => "M #{cmd.x} #{cmd.y}"
        | \L => "L #{cmd.x} #{cmd.y}"
        | \Q => "Q #{cmd.begin.x} #{cmd.begin.y}, #{cmd.end.x} #{cmd.end.y}"
        | \C => "C #{cmd.begin.x} #{cmd.begin.y}, #{cmd.mid.x} #{cmd.mid.y}, #{cmd.end.x} #{cmd.end.y}"
    outline = "#{outline.join ' '} Z"
    # XXX: Chrome and IE treat `url()` differently from FireFox
    # https://bugzilla.mozilla.org/show_bug.cgi?id=1249914
    id = outline.replace new RegExp(' ', \g), '+'
    track = @props.data.track
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
          progress: progress
        progress -= bgn.length
        comp


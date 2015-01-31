React  = require 'react'
Stroke = React.createFactory require './Stroke'

{ svg, g } = React.DOM

Word = module.exports = React.createClass do
  displayName: "zhStroker.Word"
  getDefaultProps: ->
    data:
      word:   []
      length: 0
    x: 0
    y: 0
    width:  410
    height: 410
    color: \black
    progress: Infinity
    onEnter: ->
    onLeave: ->
    onEnterStroke: ->
    onLeaveStroke: ->
  componentWillReceiveProps: (next) ->
    { length } = @props.data
    if @props.progress <= 0 and next.progress > 0
      @props.onEnter!
    if @props.progress < length and next.progress >= length
      @props.onLeave!
  render: ->
    { length, word } = @props.data
    { progress }     = @props
    progress = 0      if progress < 0
    progress = length if progress > length
    svg do
      width:  @props.width
      height: @props.height
      view-box: "0 0 2050 2050"
      version: 1.1
      xmlns: '"http://www.w3.org/2000/svg'
      g do
        x: @props.x
        y: @props.y
        for i, stroke of word
          comp = Stroke do
            key:      i
            data:     stroke
            color:    @props.color
            progress: progress
            onEnterStroke: @props.onEnterStroke
            onLeaveStroke: @props.onLeaveStroke
          progress -= stroke.length
          comp


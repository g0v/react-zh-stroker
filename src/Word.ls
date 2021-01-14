React  = require 'react'
createClass = require 'create-react-class'
Stroke = require './Stroke'
equal = require './data/equal'

{ createElement } = React

Word = module.exports = createClass do
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
    trackSize: 200
    progress: Infinity
    onEnter: ->
    onLeave: ->
    onEnterStroke: ->
    onLeaveStroke: ->
  UNSAFE_componentWillReceiveProps: (next) ->
    { length } = @props.data
    if @props.progress <= 0 and next.progress > 0
      @props.onEnter @props, next
    if @props.progress < length and next.progress >= length
      @props.onLeave @props, next
  render: ->
    { length, word } = @props.data
    { progress }     = @props
    progress = 0      if progress < 0
    progress = length if progress > length
    progress = length if equal progress, length
    createElement \svg,
      width:  @props.width
      height: @props.height
      view-box: "0 0 2048 2048"
      version: 1.1
      xmlns: '"http://www.w3.org/2000/svg'
      createElement \g,
        x: @props.x
        y: @props.y
        for i, stroke of word
          comp = createElement Stroke,
            key:       i
            data:      stroke
            color:     @props.color
            trackSize: @props.trackSize
            progress:  progress
            onEnterStroke: @props.onEnterStroke
            onLeaveStroke: @props.onLeaveStroke
          progress -= stroke.length
          comp


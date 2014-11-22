$                 = require 'jquery'
React             = require 'react'
{ Word }          = require './zhStroker'
{ computeLength } = require './zhStroker/data'
#require './zhStroker/index.css'

{ div } = React.DOM
log = -> try console.log it

##
# main
data <- $.getJSON './json/840c.json'
data = computeLength data
progress = 0

onEnter = -> log 'enter'
onLeave = -> log 'leave'
onEnterStroke = -> log 'enter stroke'
onLeaveStroke = -> log 'leave stroke'

App = React.createFactory React.createClass do
  displayName: 'App'
  getDefaultProps: ->
    data: {}
  getInitialState: ->
    progress: 0
  update: ->
    @setState progress: (@state.progress + 20) % @props.data.length
    requestAnimationFrame @update
  render: ->
    dim = 400
    div {},
      Word {
        data: @props.data
        progress: @state.progress
        onEnter
        onLeave
        onEnterStroke
        onLeaveStroke
      }
      for i til 4
        dim /= 2
        Word do
          key: i
          data: @props.data
          progress: @state.progress
          width:  dim
          height: dim

app = React.render do
  App { data }
  document.getElementById \container

requestAnimationFrame app.update


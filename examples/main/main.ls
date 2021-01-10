require 'whatwg-fetch'
getJSON = (path, next) ->
  fetch path
    .then (.json!)
    .then next
    .catch console.error

React             = require 'react'
ReactDOM          = require 'react-dom'
{ data, Word }    = require './dist'

computeLength = data.computeLength
Word = React.createFactory Word

{ div } = React.DOM
log = -> try console.log it

##
# main
data <- getJSON './json/840c.json'
#data <- getJSON './json/3109.json'
data = computeLength data

# Material UI colors
# http://www.google.com/design/spec/style/color.html
colors = <[#f44336 #e91e63 #9c27b0 #3f51b5 #009688]>

progress = 0
onEnter = -> #log 'enter'
onLeave = -> #log 'leave'
onEnterStroke = -> #log 'enter stroke'
onLeaveStroke = -> #log 'leave stroke'

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
        color: colors.0
        progress: @state.progress
        onEnter
        onLeave
        onEnterStroke
        onLeaveStroke
      }
      for i from 1 to 4
        dim /= 2
        Word do
          key: i
          data: @props.data
          color: colors[i]
          progress: @state.progress
          width:  dim
          height: dim

app = ReactDOM.render do
  App { data }
  document.getElementById \container

requestAnimationFrame app.update


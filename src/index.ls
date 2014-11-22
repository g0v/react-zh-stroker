$                 = require 'jquery'
React             = require 'react'
{ Word }          = require './zhStroker'
{ computeLength } = require './zhStroker/data'
#require './zhStroker/index.css'

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

word = React.render do
  Word {
    data
    progress
    onEnter
    onLeave
    onEnterStroke
    onLeaveStroke
  }
  document.getElementById \container

update = ->
  word.setProps { progress }
  progress += 20
  if progress < data.length
    requestAnimationFrame update
requestAnimationFrame update


React = require 'react'
{div} = React.DOM

App = React.createClass do
  displayName: 'React.App'
  getInitialState: ->
    color: \red
  render: ->
    div do
      className: \app
      style:
        background: @state.color
      onClick: ~>
        @setState color:
          if @state.color is \red
            then \green
            else \red
      'click me'

module.exports = App

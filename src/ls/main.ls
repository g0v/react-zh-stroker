React = require 'react'
App   = require './app'
require './app.css'

React.renderComponent do
  App!
  document.getElementById \container

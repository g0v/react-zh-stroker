React = require 'react'
App   = require './app/app'
require './app/app.css'

React.renderComponent do
  App!
  document.getElementById \container

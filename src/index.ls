React = require 'react'
App   = React.createFactory require './app/app'
require './app/app.css'

React.render App!, document.getElementById \container

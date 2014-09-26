(function(){
  var React, App;
  React = require('react');
  App = require('./app');
  require('./app.css');
  React.renderComponent(App(), document.getElementById('container'));
}).call(this);

(function(){
  var React, App;
  React = require('react');
  App = require('./app/app');
  require('./app/app.css');
  React.renderComponent(App(), document.getElementById('container'));
}).call(this);

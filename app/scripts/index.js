var Backbone = require('backbone');
var $ = window.jQuery = require('jquery');
require('bootstrap-sass');
var router = require('./router');

$(function(){
  Backbone.history.start();
});

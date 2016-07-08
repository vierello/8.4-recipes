var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginComponent = require('./components/recipes.jsx').LoginComponent;
var AppComponent = require('./components/recipes.jsx').AppComponent;


var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home/': 'home',
    'myrecipes/': 'myRecipes',
    'newrecipe/': 'newRecipe',
  },

  index: function(){
    ReactDOM.render(
      React.createElement(LoginComponent),
      document.getElementById('inner-container')
    )
  },

  home: function(){
    ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('container')
    )
  },

  // myRecipes: function(){
  //
  // },
  //
  // newRecipe(){
  //
  // }
});

var router = new Router();

module.exports = router;

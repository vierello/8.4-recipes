var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');

var LoginComponent = require('./components/login.jsx').LoginComponent;
var AppComponent = require('./components/recipes.jsx').AppComponent;
var SignUpComponent = require('./components/login.jsx').SignUpComponent;
var CreateNewRecipeComponent = require('./components/recipes.jsx').CreateNewRecipeComponent;
var RecipeDetailComponent = require('./components/recipes.jsx').RecipeDetailComponent;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login/': 'index',
    'signup/': 'signUp',
    'recipes/': 'recipeList',
    'recipes/:id': 'recipeDetail',
    'myrecipes/': 'myRecipes',
    'newrecipe/': 'newRecipe'
  },

  // initialize: function(){
  //   JSON.parse(localStorage.getItem('Username'));
  //   var user = new User();
  //   user.fetch();
  //   this.user = user;
  // }

  index: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(LoginComponent, {router: self}),
      document.getElementById('container')
    )
    $('#container').addClass('wrapper-login');
    $('#container').removeClass('wrapper-main');
  },

  recipeList: function(){
    ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('container')
    )
    $('#container').addClass('wrapper-main');
    $('#container').removeClass('wrapper-login');
  },

  signUp: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(SignUpComponent, {router: self}),
      document.getElementById('container')
    )
    $('#container').addClass('wrapper-login');
    $('#container').removeClass('wrapper-main');
  },

  recipeDetail: function(objectId){
    var self = this;
    ReactDOM.render(
      React.createElement(RecipeDetailComponent, {router: self, objectId: objectId}),
      document.getElementById('container')
    )
    $('#container').addClass('wrapper-main');
    $('#container').removeClass('wrapper-login');
  },

  // myRecipes: function(){
  //   var self = this;
  //   ReactDOM.render(
  //     React.createElement(MyRecipesComponent, {router: self}),
  //     document.getElementById('container')
  //   )
  //   $('#container').addClass('wrapper-main');
  //   $('#container').removeClass('wrapper-login');
  // },

  newRecipe: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(CreateNewRecipeComponent, {router: self}),
      document.getElementById('container')
    )
    $('#container').addClass('wrapper-main');
    $('#container').removeClass('wrapper-login');
  }
});

var router = new Router();

module.exports = router;

var React = require('react');
var $ = require('jquery');

var recipes = require('../models/recipes');
var User = require('../models/user').User;
var IngredientCollection = require('../models/ingredients').IngredientCollection;
var StepCollection = require('../models/steps').StepCollection;
var RecipeCollection = require('../models/recipes').RecipeCollection;


var MyRecipesComponent = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: []
    }
  },

  componentWillMount: function(){
    var self = this;
    var recipeCollection = new recipes.RecipeCollection();
    recipeCollection.fetch().done(function(){
      self.setState({recipeCollection: recipeCollection});
    });
  },

  render: function(){
    var recipes = this.state.recipeCollection;
    var recipeList = recipes.map(function(recipe){
      return (
        <li className="recipe well col-md-3" key={recipe.get('objectId')}>
          <a className="my-recipe-title" href={"#recipes/" + recipe.get('objectId')}>
          <span className="recipe-title">{recipe.get('title')}</span>
          <img className="recipe-image" src={recipe.get('image')} />
          </a>
        </li>
      )
    });
    return(
      <div className="recipe-list">
        <h3 className="col-md-offset-1 recipe-list-header">My Recipes</h3>
        <div className="row">
          <ul className="col-md-offset-1 col-md-9 my-recipes">
            {recipeList}
          </ul>
        </div>
      </div>
    )
  }
});

var PublicRecipesComponent = React.createClass({
  render: function(){
      return(
        <div className="row">
          <h3 className="col-md-offset-1 recipe-list-header">Public Recipes</h3>
          <ul className="col-md-offset-1 col-md-9 my-recipes">
          </ul>
        </div>
    )
  }
});

var PopularRecipesComponent = React.createClass({
  render: function(){
      return(
        <div className="row">
          <h3 className="col-md-offset-1 recipe-list-header">Popular Recipes</h3>
          <ul className="col-md-offset-1 col-md-9 my-recipes">
          </ul>
        </div>
    )
  }
});

var FavoriteRecipesComponent = React.createClass({
  render: function(){
      return(
        <div className="row">
          <h3 className="col-md-offset-1 recipe-list-header">Favorite Recipes</h3>
          <ul className="col-md-offset-1 col-md-9 my-recipes">
          </ul>
        </div>
    )
  }
});

var NavComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <nav className="main-nav-bar">
              <h2 className="main-heading">{localStorage.getItem('username')}&#8217;s Recipe Book</h2>
              <a className="main-nav-links pull-right" href="#recipes/"><button className="home-button">Main Recipe Page</button></a>
              <a className="main-nav-links pull-right" href="#newrecipe/"><button className="add-button">Add Recipe</button></a>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="left-nav-bar-back col-md-1"></div>
          <nav className="left-nav-bar col-md-1">
            <a href="#myrecipes/" className="recipe-nav">My Recipes</a>
            <hr/>
            <a href="#" className="recipe-nav">Public Recipes</a>
            <hr/>
            <a href="#" className="recipe-nav">Popular Recipes</a>
            <hr/>
            <a href="#" className="recipe-nav">Favorite Recipes</a>
            <hr/>
            <a href="#" className="recipe-nav">My Pantry</a>
            <hr/>
          </nav>
          <div className="col-md-10">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});


var AppComponent = React.createClass({
  render: function(){
    //console.log(this.state.ratio);

    return (
      <div>
        <NavComponent>
          <MyRecipesComponent/>
          <PublicRecipesComponent/>
          <PopularRecipesComponent/>
          <FavoriteRecipesComponent/>
        </NavComponent>
      </div>
    )
  }
});

module.exports = {
  'AppComponent': AppComponent,
  'NavComponent': NavComponent
};

var React = require('react');
var $ = require('jquery');

var RecipeCollection = require('../models/recipes').RecipeCollection;
var NavComponent = require('../components/recipes.jsx').NavComponent;

var AdjustRecipe = React.createClass({
  getInitialState: function(){
    return {
      'serving': 1,
    }
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.handleAdjustment(this.state.serving)
  },

  handleChange: function(e){
    e.preventDefault();
    this.setState(this.props.recipe);
    this.setState({'serving': e.target.value})
  },

  render: function(){
    var ratio = this.props.ratio;
    var ingredients = this.props.recipe.get('ingredients')
    var ingredient = ingredients.map(function(ingredient, index){
      return (
        <li className="adjust-list" key={index}>{(ingredient.qty * ratio).toFixed(2)} {ingredient.units} {ingredient.item}</li>
      )
    });

    return (
      <div className="hidden row">
        <div className="col-md-offset-4 col-md-4">
          <form className="adjust-recipe" onSubmit={this.handleSubmit}>
            <label htmlFor="servings">Makes</label>
            <input className="input-field" id="servings" onChange={this.handleChange} type="number" value={this.state.serving} placeholder={this.props.recipe.get('servings')}/>
            <label htmlFor="servings">servings</label>
            <button type="submit" className="adjust-button btn">Adjust Recipe</button>
          </form>
          <ol>
            {ingredient}
          </ol>
        </div>
      </div>
    )
  }
});

var RecipeDetailComponent = React.createClass({
  getInitialState: function(){
    return {
      'recipe': {},
      'ratio': 1,
      recipeCollection: []
    }
  },

  componentWillMount: function(){
    var recipe = new recipes.Recipe();

    this.setState({'recipe': recipe});
    recipe.on('change', this.update);
  },

  update: function(){
    this.forceUpdate()
  },

  handleAdjustment: function(serving){
    var originalServing = this.state.recipe.get('servings');
    var newServing = serving / originalServing;
    this.setState({'ratio': newServing})
  },

  componentWillMount: function(objectId){
    var self = this;
    var recipeCollection = new RecipeCollection();
    //console.log(recipeCollection);
    recipeCollection.fetch().done(function(){
      self.setState({recipeCollection: recipeCollection});
    });
  },

  render: function(){
    var self = this;
    var recipeCollection = this.state.recipeCollection;
    //console.log(this.state.recipeCollection);
    //console.log(this.props.objectId);

    var recipeItem = recipeCollection.map(function(recipe, index){
      var id = recipe.id;
      var ingredients = recipe.get('ingredients')
      var ingredientItem = ingredients.map(function(ingredient, index){
        //console.log(ingredient);
        return(
          <div key={index}>{ingredient.qty} {ingredient.units} {ingredient.item}</div>
        )
      });
      var steps = recipe.get('steps')
      var stepItem = steps.map(function(step, index){
        return(
          <div key={index}>Step {(index) + 1}: <span>{step.steps}</span></div>
        )
      });
      if(id == self.props.objectId){
        return (
          <div key={index}>
            <h1 className="recipe-detail-heading">{recipe.get('title')}</h1>
            <div className="recipe-detail-creator">Created By: {recipe.get('createdBy')}</div>
            <img src={recipe.get('image')}/>
            <hr />
            <div className="recipe-detail-serves">Serves: {recipe.get('servings')}</div>
            <hr />
            <span className="recipe-detail-ingredients">Ingredients: </span>
            <div>{ingredientItem}</div>
            <hr />
            <span className="recipe-detail-steps">Steps: </span>
            <div>{stepItem}</div>
            <hr/>
            <input className="btn btn-success" value="Edit Recipe"/>
            <input  className="btn pull-right btn-success" value="Adjust Serving Size"/>
          </div>
        )
      }
    });

    return (
      <NavComponent>
        <div className="row">
          <div className="col-md-offset-1 well recipe-detail col-md-8">
            {recipeItem}
          </div>
        </div>
      </NavComponent>
    )
  }
});

module.exports = {
  'RecipeDetailComponent': RecipeDetailComponent
}

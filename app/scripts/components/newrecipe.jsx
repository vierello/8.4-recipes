var React = require('react');
var $ = require('jquery');

var recipes = require('../models/recipes');
var NavComponent = require('../components/recipes.jsx').NavComponent;
var IngredientCollection = require('../models/ingredients').IngredientCollection;
var StepCollection = require('../models/steps').StepCollection;


var IngredientForm = React.createClass({
  handleQty: function(e){
    this.props.ingredient.set('qty', e.target.value)
  },

  handleUnits: function(e){
    this.props.ingredient.set('units', e.target.value)
  },

  handleItem: function(e){
    this.props.ingredient.set('item', e.target.value)
  },

  render: function(){
    var ingredient = this.props.ingredient;
    var count = this.props.counter + 1;
    return (
      <div className="ingredient-form">
        <h3 className="ingredient-heading">Ingredient #{count}</h3>
        <div>
          <input onChange={this.handleQty} value={ingredient.get('qty')} className="input-field ingredient-input" type="text" placeholder="Qty"/>
          <input onChange={this.handleUnits} className="input-field ingredient-input" type="text" placeholder="Units"/>
          <input onChange={this.handleItem} className="input-field ingredient-input ingredient-input-field" type="text" placeholder="Ingredient"/>
          <button onClick={this.props.handleDelete} className="btn delete-button btn-danger">X</button>
        </div>
      </div>
    )
  }
});

var StepsForm = React.createClass({
  handleSteps: function(e){
    this.props.step.set('steps', e.target.value)
  },

  render: function(){
    var step = this.props.step;
    var count = this.props.counter + 1;
    return (
      <div className="step-form">
        <h3 className="steps-heading">Step #{count}</h3>
        <div className="step-input-row">
          <textarea onChange={this.handleSteps} className="input-field" type="text" cols="100" rows="4" placeholder="Steps"/>
          <button onClick={this.props.handleDelete} className="btn delete-button btn-danger">X</button>
        </div>
      </div>
    )
  }
});

var CreateNewRecipeComponent = React.createClass({
  getInitialState: function(){
    var ingredients = new IngredientCollection();
    ingredients.add([{}]);
    var steps = new StepCollection();
    steps.add([{}]);

    return {
      ingredients: ingredients,
      steps: steps,
      recipe: new recipes.Recipe()
    };
  },

  componentWillMount: function(){
    var self = this;
    var recipe = this.state.recipe;

    recipe.on('change', this.update);
    this.state.ingredients.on('add', this.update);
    this.state.steps.on('add', this.update);

    if(this.props.objectId){
      recipe.set('obejectId', this.props.objectId);
      recipe.fetch().done(function(){
        self.setState({
          ingredients: recipe.get('ingredients'),
          steps: recipe.get('steps'),
          recipe: recipe,
          title: recipe.get('title')
        });
      });
    }
  },

  update: function(){
    this.forceUpdate();
  },

  handleSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;

    var recipe = this.state.recipe;
    console.log(recipe);
    var ingredients = this.state.ingredients;
    var steps = this.state.steps;

    recipe.set('ingredients', ingredients.toJSON());
    recipe.set('steps', steps.toJSON());
    recipe.save().done(function(){
      router.navigate('recipes/', {trigger: true});
    });
  },

  addIngredient: function(){
    this.state.ingredients.add({});
  },

  addStep: function(){
    this.state.steps.add({});
  },

  handleDelete: function(e){
    e.preventDefault();
  },

  handleTitleChange: function(e){
    this.state.recipe.set('title', e.target.value)
  },

  handleServingChange: function(e){
    this.state.recipe.set('servings', parseInt(e.target.value))
  },

  handleCreatorChange: function(e){
    this.state.recipe.set('createdBy', e.target.value)
  },

  render: function(){
    var self = this;
    var ingredientFormSet = this.state.ingredients.map(function(ingredient, index){
      return <IngredientForm key={ingredient.cid} handleDelete={self.handleDelete} ingredient={ingredient} counter={index}/>
    });

    var stepFormSet = this.state.steps.map(function(step, index){
      return <StepsForm key={step.cid} handleDelete={self.handleDelete} step={step} counter={index}/>
    });
    return(
      <NavComponent>
        <h2 className="new-recipe-heading col-md-offset-1 col-md-10">Add New Recipe</h2>
        <form onSubmit={this.handleSubmit} className="new-recipe well col-md-offset-1 col-md-8">
          <div className="row">
            <div className="col-md-12">
              <img className="recipe-picture col-md-4" />
              <div className="col-md-8">
                <div className="new-recipe-field">
                  <label htmlFor="new-recipe-title">New Recipe Name</label>
                  <input onChange={this.handleTitleChange} value={this.state.title} className="input-field top-new-recipe-input" id="new-recipe-title" type="text" placeholder="Recipe Title"/>
                </div>
                <div className="new-recipe-field">
                  <label className="clearfloat" htmlFor="new-recipe-serves">Number Served</label>
                  <input onChange={this.handleServingChange} value={this.state.servings} className="input-field top-new-recipe-input clearfloat" id="new-recipe-serves" type="number" placeholder="Serves?"/>
                </div>
                <div className="new-recipe-field">
                  <label className="clearfloat" htmlFor="new-recipe-creator">Recipe By</label>
                  <input onChange={this.handleCreatorChange} value={this.state.createdBy} className="input-field top-new-recipe-input clearfloat" id="new-recipe-creator" type="text" placeholder='Who Are You?'/>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="add-ingredient col-md-12">
              <hr />
              {ingredientFormSet}
              <button type="button" className="btn btn-success" onClick={this.addIngredient}>Add Ingredient</button>
            </div>
          </div>
          <div>
            <div className="add-step col-md-12">
              <hr />
              {stepFormSet}
              <button type="button" className="btn btn-success" onClick={this.addStep}>Add Step</button>
              <hr/>
            </div>
          </div>
          <p className="save-button"><input type="submit" className="btn save-recipe-button btn-success" value="Save Recipe"/></p>
        </form>
      </NavComponent>
    )
  }
});

module.exports = {
  'CreateNewRecipeComponent': CreateNewRecipeComponent
}

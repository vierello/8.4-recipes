var React = require('react');
var $ = require('jquery');

var recipes = require('../models/recipes');
var User = require('../models/user').User;
var IngredientCollection = require('../models/ingredients').IngredientCollection;
var StepCollection = require('../models/steps').StepCollection;
var RecipeCollection = require('../models/recipes').RecipeCollection;

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
          <button onClick={this.props.handleDelete} className="btn btn-danger">X</button>
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
      <div>
        <h3 className="steps-heading">Step #{count}</h3>
        <div>
          <textarea onChange={this.handleSteps} className="input-field" type="text" cols="100" rows="4" placeholder="Steps"/>
          <button onClick={this.props.handleDelete} className="btn btn-danger">X</button>
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

  handleDelete: function(){

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
      return <IngredientForm key={ingredient.cid} ingredient={ingredient} counter={index}/>
    });

    var stepFormSet = this.state.steps.map(function(step, index){
      return <StepsForm key={step.cid} step={step} counter={index}/>
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
              <button type="button" className="btn pull-right btn-success" onClick={this.addIngredient}>Add Ingredient</button>
              {ingredientFormSet}
            </div>
          </div>
          <div>
            <div className="add-step col-md-12">
              <button type="button" className="btn pull-right btn-success" onClick={this.addStep}>Add Step</button>
              {stepFormSet}
            </div>
          </div>
          <input type="submit" className="btn save-recipe-button btn-success" value="Save Recipe"/>
        </form>
      </NavComponent>
    )
  }
});

//   var objectId = this.props.objectId;
//   var recipe = new recipes.Recipe();
//   recipe.objectId = objectId;
//   recipe.fetch({
//     success: function(model, response){
//     App.showPerson(model);
//   }
// })
//
//
//   ).done(function(){
//     console.log(recipe.objectId);
//   });
// },

var RecipeDetailComponent = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: []
    }
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
        console.log(ingredient);
        return(
          <div key={index}>{ingredient.qty} {ingredient.units} {ingredient.item}</div>
        )
      });
      var steps = recipe.get('steps')
      var stepItem = steps.map(function(step, index){
        return(
          <div key={index}>Step {(index) + 1}: {step.steps}</div>
        )
      });
      if(id == self.props.objectId){
        return (
          <div key={index}>
            <h1 className="recipe-detail-heading">{recipe.get('title')}</h1>
            <div className="recipe-detail-creator">Created By: {recipe.get('createdBy')}</div>
            <img src={recipe.get('image')}/>
            <div>Serves {recipe.get('servings')}</div>
            {ingredientItem}
            {stepItem}
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
      <div className="row">
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
  getInitialState: function(){
    return {
      'recipe': {},
      'ratio': 1
    }
  },

  componentWillMount: function(){
    var recipe = new recipes.Recipe();

    // recipe.set({
    //             'image': './images/meatloaf.png',
    //             'title': 'Meatloaf',
    //             'createdBy': 'vierello',
    //             'servings': 4,
    //             'ingredients': [{'qty': 2, 'units': 'lbs', 'item': '85% ground beef'},
    //                            {'qty': 3/4, 'units': 'sleeve', 'item': 'saltine crackers'},
    //                            {'qty': 2, 'units': '', 'item': 'eggs'},
    //                            {'qty': 2, 'units': 'tsp', 'item': 'onion powder'},
    //                            {'qty': 2, 'units': 'tsp', 'item': 'groud black pepper'},
    //                            {'qty': 2, 'units': 'tsp', 'item': 'garlic powder'},
    //                            {'qty': 3/2, 'units': 'tsp', 'item': 'parsley'},
    //                            {'qty': 1, 'units': '', 'item': 'green bell pepper'},
    //                            {'qty': 1/2, 'units': 'cup', 'item': 'ketchup'}],
    //             'steps': [{'number': 1, 'action': 'Mix with hands beef, eggs, onion powder, pepper, garlic powder, parsley and finely crushed saltines in a large mixing bowl until all ingredients are well dispersed.'},
    //                       {'number': 2, 'action': 'In a greased pie tin form meat into a loaf then spread ketchup all over the loaf and line up sliced green peppers on top of the meatloaf'},
    //                       {'number': 3, 'action': 'Bake in 375 degree oven for about 1 hour 15 mintues.'}]
    //           })
    // recipe.save();


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

  render: function(){
    //console.log(this.state.ratio);
    // <AdjustRecipe handleAdjustment={this.handleAdjustment} recipe={this.state.recipe} ratio={this.state.ratio}/>
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
  'CreateNewRecipeComponent': CreateNewRecipeComponent,
  'RecipeDetailComponent': RecipeDetailComponent
};

var React = require('react');

var models = require('../models/recipes');


var LoginComponent = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="login-form col-md-6">
          <h1 className="login-header">Recipe Book</h1>
          <form id="login">
            <div>
              <label className="login-label" htmlFor="username">Username:</label>
              <input id="username" type="username" placeholder="Username"/>
            </div>
            <div>
              <label className="login-label" htmlFor="password">Password:</label>
              <input id="password" type="password" placeholder="Password"/>
            </div>
              <input type="submit" className="login-account btn btn-success" value='Login'/>
          </form>
          <span className="create-or">or</span>
          <button className="create-account btn btn-primary">Create Account</button>
        </div>
      </div>
    )
  }
});


var AdjustRecipe = React.createClass({
  getInitialState: function(){
    return {
      'serving': '',
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
        <li key={index}>{(ingredient.qty * ratio).toFixed(2)} {ingredient.units} {ingredient.item}</li>
      )
    });

    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4">
          <form className="adjust-recipe" onSubmit={this.handleSubmit}>
            <label htmlFor="servings">Makes</label>
            <input id="servings" onChange={this.handleChange} type="number" value={this.state.serving} placeholder={this.props.recipe.get('servings')}/>
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


var AppComponent = React.createClass({
  getInitialState: function(){
    return {
      'recipe': {},
      'ratio': 1
    }
  },

  componentWillMount: function(){
    var recipe = new models.Recipe();

    recipe.set(
      {'title': 'Meatloaf',
       'servings': 4,
       'ingredients': [{'qty': 2, 'units': 'lbs', 'item': '85% ground beef'},
                       {'qty': 3/4, 'units': 'sleeve', 'item': 'saltine crackers'},
                       {'qty': 2, 'units': '', 'item': 'eggs'},
                       {'qty': 2, 'units': 'tsp', 'item': 'onion powder'},
                       {'qty': 2, 'units': 'tsp', 'item': 'groud black pepper'},
                       {'qty': 2, 'units': 'tsp', 'item': 'garlic powder'},
                       {'qty': 3/2, 'units': 'tsp', 'item': 'parsley'},
                       {'qty': 1, 'units': '', 'item': 'green bell pepper'},
                       {'qty': 1/2, 'units': 'cup', 'item': 'ketchup'}],
       'step 1': 'Mix with hands beef, eggs, onion powder, pepper, garlic powder, parsley and finely crushed saltines in a large mixing bowl until all ingredients are well dispersed.',
       'step 2': 'In a greased pie tin form meat into a loaf then spread ketchup all over the loaf and line up sliced green peppers on top of the meatloaf',
       'step 3': 'Bake in 375 degree oven for about 1 hour 15 mintues.'
     }
    )

    this.setState({'recipe': recipe})

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

  // this.setState({'ratio': newServing})

  //   var ingredients = this.state.recipe.get('ingredients');
  //   var ingredientQty = ingredients.map(function(ingredient, index){
  //     ingredient.qty = (ingredient.qty * newServing).toFixed(2)
  //     self.state.recipe.set({'servings': 4})
  //     return ingredient;
  //   });
  //
  //   this.state.recipe.unset('ingredients');
  //   this.state.recipe.set({'ingredients': ingredientQty});
  //
  // },

  render: function(){
    console.log(this.state.ratio);
    return (
      <div>
        <AdjustRecipe handleAdjustment={this.handleAdjustment} recipe={this.state.recipe} ratio={this.state.ratio}/>
      </div>
    )
  }
})

module.exports = {
  'LoginComponent': LoginComponent,
  'AppComponent': AppComponent
};

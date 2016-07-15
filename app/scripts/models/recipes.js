var Backbone = require('backbone');

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://tiny-parse-server.herokuapp.com/classes/AVRecipes/'
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://tiny-parse-server.herokuapp.com/classes/AVRecipes/',
  parse: function(serverResponse){
    return serverResponse.results;
  }
});

module.exports = {
  'Recipe': Recipe,
  'RecipeCollection': RecipeCollection
};

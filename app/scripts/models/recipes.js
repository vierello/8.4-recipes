var Backbone = require('backbone');

var Recipe = Backbone.Model.extend({
  
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,

});

module.exports = {
  'Recipe': Recipe,
  'RecipeCollection': RecipeCollection
};

var Backbone = require('backbone');

var Ingredient = Backbone.Model.extend({

});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient,

});

module.exports = {
  'Ingredient': Ingredient,
  'IngredientCollection': IngredientCollection
};

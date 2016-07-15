var Backbone = require('backbone');

var Step = Backbone.Model.extend({

});

var StepCollection = Backbone.Collection.extend({
  model: Step,

});

module.exports = {
  'Step': Step,
  'StepCollection': StepCollection
};

import Ember from 'ember';
import genNewItem from 'many-components-ember/utils/gen-new-item';

var model = [genNewItem()];

export default Ember.Route.extend({
  model: function() {
    return model;
  },

  renderTemplate: function() {
    this.render('ember');
  },
});

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('item');
  },

  renderTemplate: function(controller) {
    this.render('ember', {controller: controller});
  },
});

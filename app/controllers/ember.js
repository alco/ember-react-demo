import Ember from 'ember';
import genNewItem from 'many-components-ember/utils/gen-new-item';

export default Ember.Controller.extend({
  actions: {
    // Sent by the custom-item component
    removeItem: function(item) {
      this.get('model').removeObject(item);
    },

    // Sent by the buttons in templates/demo.hbs
    newItem: function() {
      this.genNewItem();
    },
    addManyItems: function() {
      for (var i = 0; i < 1000; i++) {
        this.genNewItem();
      }
    },
    removeAllItems: function() {
      this.get('model').clear();
    },
  },

  genNewItem: function() {
    var item = genNewItem();
    this.get('model').addObject(item);
  },
});

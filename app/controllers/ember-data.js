import Ember from 'ember';
import genNewItem from 'many-components-ember/utils/gen-new-item';

export default Ember.Controller.extend({
  init: function() {
    this._super.apply(this, arguments);
    this.genNewItem();
  },

  actions: {
    // Sent by the custom-item component
    removeItem: function(item) {
      item.deleteRecord();
      item.save();
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
      this.store.findAll('item').then(function(record) {
        record.content.invoke('destroyRecord');
      });
    },
  },

  genNewItem: function() {
    var item = this.store.createRecord('item', genNewItem());
    item.save();
  }
});

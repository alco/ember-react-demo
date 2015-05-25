import Ember from 'ember';
import genNewItem from 'many-components-ember/utils/gen-new-item';
import globalTimings from 'many-components-ember/utils/global-timings';

export default Ember.Controller.extend({
  init: function() {
    this._super.apply(this, arguments);
    this.genNewItem();
  },

  actions: {
    // Sent by the custom-item component
    removeItem: function(item) {
      var timestamp = Date.now();

      item.deleteRecord();
      item.save();

      Ember.run.schedule('afterRender', this, function() {
        var timing = Date.now() - timestamp;
        globalTimings.addTiming('ember-data', 'removeSingle', timing / 1000);
      });
    },

    // Sent by the buttons in templates/demo.hbs
    newItem: function() {
      this.genNewItem();
    },
    addManyItems: function() {
      var timestamp = Date.now();

      for (var i = 0; i < 1000; i++) {
        this.genNewItem();
      }

      Ember.run.schedule('afterRender', this, function() {
        var timing = Date.now() - timestamp;
        globalTimings.addTiming('ember-data', 'addMany', timing / 1000);
      });
    },
    removeAllItems: function() {
      var timestamp = Date.now();
      this.store.findAll('item').then(function(record) {
        record.content.invoke('destroyRecord');
        Ember.run.schedule('afterRender', this, function() {
          var timing = Date.now() - timestamp;
          globalTimings.addTiming('ember-data', 'removeAll', timing / 1000);
        });
      });
    },
  },

  genNewItem: function() {
    var item = this.store.createRecord('item', genNewItem());
    item.save();
  }
});

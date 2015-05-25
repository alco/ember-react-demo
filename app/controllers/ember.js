import Ember from 'ember';
import genNewItem from 'many-components-ember/utils/gen-new-item';
import globalTimings from 'many-components-ember/utils/global-timings';

export default Ember.Controller.extend({
  actions: {
    // Sent by the custom-item component
    removeItem: function(item) {
      var timestamp = Date.now();

      this.get('model').removeObject(item);

      Ember.run.schedule('afterRender', this, function() {
        var timing = Date.now() - timestamp;
        globalTimings.addTiming('ember', 'removeSingle', timing / 1000);
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
        globalTimings.addTiming('ember', 'addMany', timing / 1000);
      });
    },
    removeAllItems: function() {
      var timestamp = Date.now();

      this.get('model').clear();

      Ember.run.schedule('afterRender', this, function() {
        var timing = Date.now() - timestamp;
        globalTimings.addTiming('ember', 'removeAll', timing / 1000);
      });
    },
  },

  genNewItem: function() {
    var item = genNewItem();
    this.get('model').addObject(item);
  },
});

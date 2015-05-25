import Ember from 'ember';

var Timing = Ember.Object.extend({
  addMany: null,
  removeAll: null,
  removeSingle: null,
});

var GlobalTimings = Ember.Object.extend({
  'ember-data': Timing.create(),
  ember: Timing.create(),
  react: Timing.create(),

  addTiming: function(route, key, value) {
    this.set(route + "." + key, value);
  },
});

export default GlobalTimings.create();

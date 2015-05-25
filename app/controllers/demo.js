import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.genNewItem();
  },

  actions: {
    removeItem: function(item) {
      item.deleteRecord();
      item.save();
    },
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
    var item = this.store.createRecord('item', {
      color: '#' + randomHex(6),
      width: randomInt(200, 1000),
    });
    item.save();
  }.on('activate'),
});

function randomInt(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1));
}

function randomHex(ndigits) {
  var string = "";
  for (var i = 0; i < ndigits; i++) {
    string += "0123456789ABCDEF".charAt(randomInt(0, 15));
  }
  return string;
}


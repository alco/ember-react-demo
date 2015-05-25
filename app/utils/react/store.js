import Ember from 'ember';

// This is a slightly modified version of the code at
// http://binarymuse.github.io/react-primer/build/index.html?6

var id = 1;

// The store simply keeps track of an array of items. Each item
// has an id, a color, and a width.
export default Ember.Object.extend({
  init: function() {
    this.items = [];
    this.itemsById = {};
    this.addItem("red", 300);
  },

  addItem: function(color, width) {
    var item = {id: ++id, color: color, width: width};
    this.items.push(item);
    this.itemsById[id] = item;
    if (this.handler) { this.handler(); }
  },

  removeItem: function(itemId) {
    this.timestamp = Date.now();
    this.timingName = 'removeSingle';

    var item = this.itemsById[itemId],
        index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      delete this.itemsById[itemId];
      if (this.handler) { this.handler(); }
    }
  },

  changeItem: function(itemId, color, width) {
    var item = this.itemsById[itemId];
    item.color = color;
    item.width = width;
    if (this.handler) { this.handler(); }
  },

  clearItems: function() {
    this.timestamp = Date.now();
    this.timingName = 'removeAll';

    this.items = [];
    this.itemsById = {};
    if (this.handler) { this.handler(); }
  },
});

import Ember from 'ember';

export default Ember.Component.extend({
  myStyle: function() {
    return ("background-color: " + this.get('color') + "; width: " + this.get('width') + "px").htmlSafe();
  }.property('color', 'width'),

  actions: {
    remove: function() {
      this.sendAction('removeClicked', this.get('param'));
    },
  },
});

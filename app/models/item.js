import DS from 'ember-data';

export default DS.Model.extend({
  color: DS.attr('string'),
  width: DS.attr('number'),
}).reopenClass({
  FIXTURES: [],
});

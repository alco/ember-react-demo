import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('demo', {path: '/'}, function() {
    this.route('ember-data');
    this.route('ember');
    this.route('react');
  });
});

export default Router;

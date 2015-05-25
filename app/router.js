import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.reopen({
    rootURL: '/ember-react-demo/1.12.0/'
});

Router.map(function() {
  this.route('ember-data');
  this.route('ember');
  this.route('react');
});

export default Router;

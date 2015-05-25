import Ember from 'ember';
import globalTimings from 'many-components-ember/utils/global-timings';

export default Ember.Controller.extend({
  routeTimings: globalTimings,
});


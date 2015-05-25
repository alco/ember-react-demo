import Ember from 'ember';
import Application from 'many-components-ember/utils/react/application';
import Store from 'many-components-ember/utils/react/store';

var store = Store.create();

export default Ember.View.extend({
  init: function() {
    this._super.apply(this, arguments);

    var renderApp = function() {
      React.render(
        <Application store={store} items={store.items} />,
        document.getElementById("react-container")
      );
    }

    // store will call our handler every time there is a change in the model
    // (changed are only caused by user input in this demo)
    store.handler = renderApp;
  },

  didInsertElement: function() {
    store.handler();
  },
});

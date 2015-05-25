/* jshint ignore:start */

/* jshint ignore:end */

define('many-components-ember/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].FixtureAdapter.extend({});

});
define('many-components-ember/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'many-components-ember/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('many-components-ember/components/custom-item/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    myStyle: (function () {
      return ('background-color: ' + this.get('color') + '; ' + 'width: ' + this.get('width') + 'px').htmlSafe();
    }).property('color', 'width'),

    actions: {
      remove: function remove() {
        this.sendAction('removeClicked', this.get('param'));
      } } });

});
define('many-components-ember/components/custom-item/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-canary+850aba37",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "many-components-ember/components/custom-item/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","custom-item");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Remove");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [7]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createMorphAt(element0,1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        morphs[4] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [
        ["attribute","style",["get","myStyle"]],
        ["inline","input",[],["type","text","value",["subexpr","@mut",[["get","color"]],[]]]],
        ["inline","input",[],["type","range","min","200","max","1000","value",["subexpr","@mut",[["get","width"]],[]]]],
        ["content","width"],
        ["element","action",["remove"],[]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('many-components-ember/controllers/application', ['exports', 'ember', 'many-components-ember/utils/global-timings'], function (exports, Ember, globalTimings) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    routeTimings: globalTimings['default'] });

});
define('many-components-ember/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('many-components-ember/controllers/ember-data', ['exports', 'ember', 'many-components-ember/utils/gen-new-item', 'many-components-ember/utils/global-timings'], function (exports, Ember, _genNewItem, globalTimings) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    init: function init() {
      this._super.apply(this, arguments);
      this.genNewItem();
    },

    actions: {
      // Sent by the custom-item component
      removeItem: function removeItem(item) {
        var timestamp = Date.now();

        item.deleteRecord();
        item.save();

        Ember['default'].run.schedule('afterRender', this, function () {
          var timing = Date.now() - timestamp;
          globalTimings['default'].addTiming('ember-data', 'removeSingle', timing / 1000);
        });
      },

      // Sent by the buttons in templates/demo.hbs
      newItem: function newItem() {
        this.genNewItem();
      },
      addManyItems: function addManyItems() {
        var timestamp = Date.now();

        for (var i = 0; i < 1000; i++) {
          this.genNewItem();
        }

        Ember['default'].run.schedule('afterRender', this, function () {
          var timing = Date.now() - timestamp;
          globalTimings['default'].addTiming('ember-data', 'addMany', timing / 1000);
        });
      },
      removeAllItems: function removeAllItems() {
        var timestamp = Date.now();
        this.store.findAll('item').then(function (record) {
          record.content.invoke('destroyRecord');
          Ember['default'].run.schedule('afterRender', this, function () {
            var timing = Date.now() - timestamp;
            globalTimings['default'].addTiming('ember-data', 'removeAll', timing / 1000);
          });
        });
      } },

    genNewItem: function genNewItem() {
      var item = this.store.createRecord('item', _genNewItem['default']());
      item.save();
    }
  });

});
define('many-components-ember/controllers/ember', ['exports', 'ember', 'many-components-ember/utils/gen-new-item', 'many-components-ember/utils/global-timings'], function (exports, Ember, _genNewItem, globalTimings) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      // Sent by the custom-item component
      removeItem: function removeItem(item) {
        var timestamp = Date.now();

        this.get('model').removeObject(item);

        Ember['default'].run.schedule('afterRender', this, function () {
          var timing = Date.now() - timestamp;
          globalTimings['default'].addTiming('ember', 'removeSingle', timing / 1000);
        });
      },

      // Sent by the buttons in templates/demo.hbs
      newItem: function newItem() {
        this.genNewItem();
      },
      addManyItems: function addManyItems() {
        var timestamp = Date.now();

        for (var i = 0; i < 1000; i++) {
          this.genNewItem();
        }

        Ember['default'].run.schedule('afterRender', this, function () {
          var timing = Date.now() - timestamp;
          globalTimings['default'].addTiming('ember', 'addMany', timing / 1000);
        });
      },
      removeAllItems: function removeAllItems() {
        var timestamp = Date.now();

        this.get('model').clear();

        Ember['default'].run.schedule('afterRender', this, function () {
          var timing = Date.now() - timestamp;
          globalTimings['default'].addTiming('ember', 'removeAll', timing / 1000);
        });
      } },

    genNewItem: function genNewItem() {
      var item = _genNewItem['default']();
      this.get('model').addObject(item);
    } });

});
define('many-components-ember/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('many-components-ember/initializers/app-version', ['exports', 'many-components-ember/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('many-components-ember/initializers/export-application-global', ['exports', 'ember', 'many-components-ember/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('many-components-ember/models/item', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    color: DS['default'].attr('string'),
    width: DS['default'].attr('number') }).reopenClass({
    FIXTURES: [] });

});
define('many-components-ember/router', ['exports', 'ember', 'many-components-ember/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.reopen({
    rootURL: '/ember-react-demo/'
  });

  Router.map(function () {
    this.route('ember-data');
    this.route('ember');
    this.route('react');
  });

  exports['default'] = Router;

});
define('many-components-ember/routes/ember-data', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('item');
    },

    renderTemplate: function renderTemplate(controller) {
      this.render('ember', { controller: controller });
    } });

});
define('many-components-ember/routes/ember', ['exports', 'ember', 'many-components-ember/utils/gen-new-item'], function (exports, Ember, genNewItem) {

  'use strict';

  var _model = [genNewItem['default']()];

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return _model;
    },

    renderTemplate: function renderTemplate(controller) {
      this.render('ember', { controller: controller });
    } });

});
define('many-components-ember/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('ember-data');
    } });

});
define('many-components-ember/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-canary+850aba37",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 6
            },
            "end": {
              "line": 7,
              "column": 72
            }
          },
          "moduleName": "many-components-ember/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Ember + Ember Data");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-canary+850aba37",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 6
            },
            "end": {
              "line": 8,
              "column": 54
            }
          },
          "moduleName": "many-components-ember/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Ember");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-canary+850aba37",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 6
            },
            "end": {
              "line": 9,
              "column": 54
            }
          },
          "moduleName": "many-components-ember/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("React");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-canary+850aba37",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 46,
            "column": 0
          }
        },
        "moduleName": "many-components-ember/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Source code for this demo: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","https://github.com/alco/ember-react-demo");
        var el3 = dom.createTextNode("https://github.com/alco/ember-react-demo");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Original React demo: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://binarymuse.github.io/react-primer/build/index.html?6");
        var el3 = dom.createTextNode("http://binarymuse.github.io/react-primer/build/index.html?6");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"id","filters");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"style","width:600px; float:right;");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2,"border","1");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createTextNode("Add Many Items time, s");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createTextNode("Remove All Items time, s");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createTextNode("Remove Single Item time, s");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createTextNode("Ember + Ember Data");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createTextNode("Ember");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createTextNode("React");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6]);
        var element1 = dom.childAt(fragment, [10, 1]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element1, [5]);
        var element4 = dom.childAt(element1, [7]);
        var morphs = new Array(13);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [3]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [5]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(element2, [7]),0,0);
        morphs[6] = dom.createMorphAt(dom.childAt(element3, [3]),0,0);
        morphs[7] = dom.createMorphAt(dom.childAt(element3, [5]),0,0);
        morphs[8] = dom.createMorphAt(dom.childAt(element3, [7]),0,0);
        morphs[9] = dom.createMorphAt(dom.childAt(element4, [3]),0,0);
        morphs[10] = dom.createMorphAt(dom.childAt(element4, [5]),0,0);
        morphs[11] = dom.createMorphAt(dom.childAt(element4, [7]),0,0);
        morphs[12] = dom.createMorphAt(dom.childAt(fragment, [12]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["ember-data"],["activeClass","selected"],0,null],
        ["block","link-to",["ember"],["activeClass","selected"],1,null],
        ["block","link-to",["react"],["activeClass","selected"],2,null],
        ["content","routeTimings.ember-data.addMany"],
        ["content","routeTimings.ember-data.removeAll"],
        ["content","routeTimings.ember-data.removeSingle"],
        ["content","routeTimings.ember.addMany"],
        ["content","routeTimings.ember.removeAll"],
        ["content","routeTimings.ember.removeSingle"],
        ["content","routeTimings.react.addMany"],
        ["content","routeTimings.react.removeAll"],
        ["content","routeTimings.react.removeSingle"],
        ["content","outlet"]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
define('many-components-ember/templates/ember', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0-canary+850aba37",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "many-components-ember/templates/ember.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","custom-item",[],["param",["subexpr","@mut",[["get","item"]],[]],"color",["subexpr","@mut",[["get","item.color"]],[]],"width",["subexpr","@mut",[["get","item.width"]],[]],"removeClicked","removeItem"]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0-canary+850aba37",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "many-components-ember/templates/ember.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Add New Item");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Add Many Items");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("Remove All Items");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element0, [5]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["element","action",["newItem"],[]],
        ["element","action",["addManyItems"],[]],
        ["element","action",["removeAllItems"],[]],
        ["block","each",[["get","model"]],[],0,null]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('many-components-ember/templates/react', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.0-canary+850aba37",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "many-components-ember/templates/react.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","react-container");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('many-components-ember/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/components/custom-item/component.jshint', function () {

  'use strict';

  module('JSHint - components/custom-item');
  test('components/custom-item/component.js should pass jshint', function() { 
    ok(true, 'components/custom-item/component.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/controllers/ember-data.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/ember-data.js should pass jshint', function() { 
    ok(true, 'controllers/ember-data.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/controllers/ember.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/ember.js should pass jshint', function() { 
    ok(true, 'controllers/ember.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/models/item.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/item.js should pass jshint', function() { 
    ok(true, 'models/item.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/routes/ember-data.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/ember-data.js should pass jshint', function() { 
    ok(true, 'routes/ember-data.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/routes/ember.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/ember.js should pass jshint', function() { 
    ok(true, 'routes/ember.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/utils/gen-new-item.jshint', function () {

  'use strict';

  module('JSHint - utils');
  test('utils/gen-new-item.js should pass jshint', function() { 
    ok(true, 'utils/gen-new-item.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/utils/global-timings.jshint', function () {

  'use strict';

  module('JSHint - utils');
  test('utils/global-timings.js should pass jshint', function() { 
    ok(true, 'utils/global-timings.js should pass jshint.'); 
  });

});
define('many-components-ember/tests/utils/react/store.jshint', function () {

  'use strict';

  module('JSHint - utils/react');
  test('utils/react/store.js should pass jshint', function() { 
    ok(true, 'utils/react/store.js should pass jshint.'); 
  });

});
define('many-components-ember/utils/gen-new-item', ['exports'], function (exports) {

  'use strict';



  exports['default'] = genNewItem;

  var id = 0;
  function genNewItem() {
    id += 1;
    return {
      id: id,
      color: "#" + randomHex(6),
      width: randomInt(200, 1000) };
  }

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

});
define('many-components-ember/utils/global-timings', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Timing = Ember['default'].Object.extend({
    addMany: null,
    removeAll: null,
    removeSingle: null });

  var GlobalTimings = Ember['default'].Object.extend({
    'ember-data': Timing.create(),
    ember: Timing.create(),
    react: Timing.create(),

    addTiming: function addTiming(route, key, value) {
      this.set(route + '.' + key, value);
    } });

  exports['default'] = GlobalTimings.create();

});
define('many-components-ember/utils/react/application', ['exports', 'many-components-ember/utils/react/item', 'many-components-ember/utils/global-timings'], function (exports, Item, globalTimings) {

  'use strict';

  exports['default'] = React.createClass({
    componentDidUpdate: function() {
      // A hacky way to measure the perceived duration of different operations
      if (this.props.store.timestamp) {
        var timing = Date.now() - this.props.store.timestamp;
        globalTimings['default'].addTiming('react', this.props.store.timingName, timing / 1000);
        this.props.store.timestamp = null;
      }
    },

    handleItemChange(itemId, color, width) {
      this.props.store.changeItem(itemId, color, width);
    },

    handleRemoveItem(itemId) {
      this.props.store.removeItem(itemId);
    },

    addItem() {
      this.props.store.addItem(randomColor(), Math.floor(Math.random() * 800 + 200));
    },

    addManyItems() {
      this.props.store.timestamp = Date.now();
      this.props.store.timingName = 'addMany';

      for (var i = 0; i < 1000; i++) {
        this.addItem();
      }
    },

    clearItems() {
      this.props.store.clearItems();
    },

    render() {
      return (
        React.createElement("div", null, 
          React.createElement("div", null, 
            React.createElement("button", {onClick: this.addItem}, "Add New Item"), 
            React.createElement("button", {onClick: this.addManyItems}, "Add Many Items"), 
            React.createElement("button", {onClick: this.clearItems}, "Remove All Items")
          ), 
          this.props.items.map(function(item) {
            return React.createElement(Item['default'], {color: item.color, width: item.width, 
                         id: item.id, key: item.id, 
                         onChange: this.handleItemChange, 
                         onRemove: this.handleRemoveItem})
          }.bind(this))
        )
      );
    }
  });

  function randomColor() {
    var hex = Math.floor(Math.random() * 16777215).toString(16);
    while (hex.length < 6) {
      hex = "0" + hex;
    }
    return "#" + hex;
  }

});
define('many-components-ember/utils/react/item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = React.createClass({
    propTypes: {
      onChange: React.PropTypes.func,
      onRemove: React.PropTypes.func,
      id: React.PropTypes.number.isRequired,
      color: React.PropTypes.string.isRequired,
      width: React.PropTypes.number.isRequired
    },

    getDefaultProps() {
      return {
        onChange: function() {},
        onRemove: function() {}
      };
    },

    mixins: [React.addons.PureRenderMixin],

    handleColorChange(e) {
      this.props.onChange(this.props.id, e.target.value, this.props.width);
    },

    handleWidthChange(e) {
      var width = ~~e.target.value;
      this.props.onChange(this.props.id, this.props.color, width);
    },

    handleRemoveClick() {
      this.props.onRemove(this.props.id);
    },

    render() {
      var style = {
        background: this.props.color,
        width: this.props.width
      };

      return (
        React.createElement("div", {style: style, className: "custom-item"}, 
          React.createElement("div", null, 
            React.createElement("input", {type: "text", value: this.props.color, 
                   onChange: this.handleColorChange})
          ), 
          React.createElement("div", null, 
            React.createElement("input", {type: "range", min: 200, max: 1000, 
                   value: this.props.width, 
                   onChange: this.handleWidthChange})
          ), 
          React.createElement("div", null, this.props.width), 
          React.createElement("div", null, 
            React.createElement("button", {onClick: this.handleRemoveClick}, "Remove")
          )
        )
      );
    }
  });

});
define('many-components-ember/utils/react/store', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var id = 1;

  // The store simply keeps track of an array of items. Each item
  // has an id, a color, and a width.
  exports['default'] = Ember['default'].Object.extend({
    init: function init() {
      this.items = [];
      this.itemsById = {};
      this.addItem('red', 300);
    },

    addItem: function addItem(color, width) {
      var item = { id: ++id, color: color, width: width };
      this.items.push(item);
      this.itemsById[id] = item;
      if (this.handler) {
        this.handler();
      }
    },

    removeItem: function removeItem(itemId) {
      this.timestamp = Date.now();
      this.timingName = 'removeSingle';

      var item = this.itemsById[itemId],
          index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
        delete this.itemsById[itemId];
        if (this.handler) {
          this.handler();
        }
      }
    },

    changeItem: function changeItem(itemId, color, width) {
      var item = this.itemsById[itemId];
      item.color = color;
      item.width = width;
      if (this.handler) {
        this.handler();
      }
    },

    clearItems: function clearItems() {
      this.timestamp = Date.now();
      this.timingName = 'removeAll';

      this.items = [];
      this.itemsById = {};
      if (this.handler) {
        this.handler();
      }
    } });

});
define('many-components-ember/views/react', ['exports', 'ember', 'many-components-ember/utils/react/application', 'many-components-ember/utils/react/store'], function (exports, Ember, Application, Store) {

  'use strict';

  var store = Store['default'].create();

  exports['default'] = Ember['default'].View.extend({
    init: function() {
      this._super.apply(this, arguments);

      var renderApp = function() {
        React.render(
          React.createElement(Application['default'], {store: store, items: store.items}),
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

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('many-components-ember/config/environment', ['ember'], function(Ember) {
  var prefix = 'many-components-ember';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("many-components-ember/tests/test-helper");
} else {
  require("many-components-ember/app")["default"].create({"name":"many-components-ember","version":"0.0.0.4f18d3d4"});
}

/* jshint ignore:end */
//# sourceMappingURL=many-components-ember.map
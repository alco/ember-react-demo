import Ember from 'ember';

var Item = React.createClass({
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
      <div style={style} className="custom-item">
        <div>
          <input type="text" value={this.props.color}
                 onChange={this.handleColorChange} />
        </div>
        <div>
          <input type="range" min={200} max={1000}
                 value={this.props.width}
                 onChange={this.handleWidthChange} />
        </div>
        <div>{this.props.width}</div>
        <div>
          <button onClick={this.handleRemoveClick}>Remove</button>
        </div>
      </div>
    );
  }
});

var id = 1;

// The store simply keeps track of an array of items. Each item
// has an id, a color, and a width.
//
// Notice we're using another ES6 feature, classes.
var Store = Ember.Object.extend({
  init: function() {
    this.items = [];
    this.itemsById = {};
    this.addItem("red", 300);
  },

  addItem: function(color, width) {
    var item = {id: ++id, color: color, width: width};
    this.items.push(item);
    this.itemsById[id] = item;
    if (this.handler) this.handler();
  },

  removeItem: function(itemId) {
    var item = this.itemsById[itemId],
        index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      delete this.itemsById[itemId];
      if (this.handler) this.handler();
    }
  },

  changeItem: function(itemId, color, width) {
    var item = this.itemsById[itemId];
    item.color = color;
    item.width = width;
    if (this.handler) this.handler();
  },

  clearItems: function() {
    this.items = [];
    this.itemsById = {};
    if (this.handler) this.handler();
  },
});

function randomColor() {
  var hex = Math.floor(Math.random() * 16777215).toString(16);
  while (hex.length < 6) {
    hex = "0" + hex;
  }
  return "#" + hex;
}

var store = Store.create();

// Here are a few utility functions which help us abstract away
// the store API from the `Application` component.
var addItem    = function(color, width) { store.addItem(color, width) };
var removeItem = function(itemId) { store.removeItem(itemId) };
var changeItem = function(itemId, color, width) { store.changeItem(itemId, color, width) };
var clearItems = function() { store.clearItems() };

var Application = React.createClass({
  handleItemChange(itemId, color, width) {
    changeItem(itemId, color, width);
  },

  handleRemoveItem(itemId) {
    removeItem(itemId);
  },

  addItem() {
    addItem(randomColor(), Math.floor(Math.random() * 800 + 200));
  },

  addManyItems() {
    for (var i = 0; i < 1000; i++) {
      this.addItem();
    }
  },

  clearItems() {
    clearItems();
  },

  render() {
    return (
      <div>
        <div>
          <button onClick={this.addItem}>Add New Item</button>
          <button onClick={this.addManyItems}>Add Many Items</button>
          <button onClick={this.clearItems}>Remove All Items</button>
        </div>
        {this.props.items.map(function(item) {
          return <Item color={item.color} width={item.width}
                       id={item.id} key={item.id}
                       onChange={this.handleItemChange}
                       onRemove={this.handleRemoveItem} />
        }.bind(this))}
      </div>
    );
  }
});


export default Ember.View.extend({
  init: function() {
    this._super.apply(this, arguments);
    var renderApp = function() {
      React.render(
        <Application items={store.items} />,
        document.getElementById("react-container")
      );
    }
    store.handler = renderApp;
    this.renderApp = renderApp;
  },

  didInsertElement: function() {
    this.renderApp();
  },
});

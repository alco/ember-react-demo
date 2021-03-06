import Item from 'many-components-ember/utils/react/item';
import globalTimings from 'many-components-ember/utils/global-timings';

export default React.createClass({
  componentDidUpdate: function() {
    // A hacky way to measure the perceived duration of different operations
    if (this.props.store.timestamp) {
      var timing = Date.now() - this.props.store.timestamp;
      globalTimings.addTiming('react', this.props.store.timingName, timing / 1000);
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

function randomColor() {
  var hex = Math.floor(Math.random() * 16777215).toString(16);
  while (hex.length < 6) {
    hex = "0" + hex;
  }
  return "#" + hex;
}

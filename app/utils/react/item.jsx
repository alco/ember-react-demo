export default React.createClass({
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

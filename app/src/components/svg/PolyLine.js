var React = require('react')

module.exports = React.createClass({
  render: function(){
    return <polyline {...this.props}>{this.props.children}</polyline>;
  }
})

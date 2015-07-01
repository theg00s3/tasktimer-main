var React = require('react')

module.exports = React.createClass({
  render: function(){
    return <line {...this.props}>{this.props.children}</line>;
  }
})

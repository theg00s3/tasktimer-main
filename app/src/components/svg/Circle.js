var React = require('react')

module.exports = React.createClass({
  render: function(){
    return <circle {...this.props}>{this.props.children}</circle>;
  }
})

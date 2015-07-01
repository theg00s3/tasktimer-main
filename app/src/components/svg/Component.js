var React = require('react')

module.exports = React.createClass({
  render: function(){
    return <svg {...this.props}>{this.props.children}</svg>;
  }
})

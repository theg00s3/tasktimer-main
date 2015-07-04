var React = require('react')

module.exports = React.createClass({
  render: function(){
    return  <div className="alert alert-success limit small tac breath">
              {this.props.children}
            </div>

  }
})

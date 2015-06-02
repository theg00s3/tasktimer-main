var React = require('react')

module.exports = React.createClass({
  getInitialState: function(){
    return {
      opened: false
    }
  },
  render: function(){
    return  <div className="dropdown">
              <span className="menu-text">{this.props.text}</span>
              <ul className="menu">
                {this.props.items}
              </ul>
            </div>
  }
})

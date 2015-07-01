var React = require('react')

module.exports = React.createClass({
  render: function(){
  return  <div className="arrow-navigation" role="navigation">
            <a href="" onClick={this.props.onBack}>
              <i className="icon ion-ios-arrow-back"></i>
            </a>
            <a href="" onClick={this.props.onForward}>
              <i className="icon ion-ios-arrow-forward"></i>
            </a>
          </div>
  }
})

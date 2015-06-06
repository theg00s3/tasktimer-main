var React = require('react')

module.exports = React.createClass({
  render: function(){
    return  <div className="arrow-navigation" role="navigation">
              <i onClick={this.props.onBack} className="icon ion-ios-arrow-back"></i>
              <i onClick={this.props.onForward} className="icon ion-ios-arrow-forward"></i>
            </div>
  }
})

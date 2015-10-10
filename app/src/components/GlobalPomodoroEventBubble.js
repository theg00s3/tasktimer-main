var React = require('react')


module.exports = React.createClass({
  getInitialState: function(){
    return {
      active: false
    }
  },
  render: function(){
    if( !this.state.active ) {
      return null
    }
    return  <div className="bubble active">
            </div>
    return null
  },
  _startDeactivateTimer: function(){
    clearTimeout(this._timerHandle)
    this._timerHandle = setTimeout(function(){
      this.setState({active: false})
    }.bind(this), 5000)
  }
})

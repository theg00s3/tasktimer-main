var React = require('react')
  , GlobalPomodoroWebSocketSingleton = require('../modules/GlobalPomodoroWebSocketSingleton')

var socket = GlobalPomodoroWebSocketSingleton.getSocket()

module.exports = React.createClass({
  getInitialState: function(){
    return {
      active: false
    }
  },
  componentDidMount: function(){
    socket.onmessage = function(message){
      var data = message.data
      if( /phx_reply/.test(data) ){
        return
      }
      this.setState({active: true})
      this._startDeactivateTimer()
    }.bind(this)
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

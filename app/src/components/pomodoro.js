var React = require('react')
var TimeFormatter = require('../modules/TimeFormatter')
var store = require('store')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      remaining: 0,
      time: '00:00',
      disabled25: false,
      disabled15: false,
      disabled5: false,
    }
  },
  componentDidMount: function() {
    if( this.props.data ){
      this.state.remaining = parseInt(this.props.remaining,10)
      this._startTimer()
    }
  },
  componentWillUnmount: function(){
    console.log( 'componentWillUnmount', this.state.remaining )
    clearInterval(this.interval)
  },
  tick: function(){
    var remaining = this.state.remaining
    var time = TimeFormatter.formatSeconds(remaining)
    console.log('-- tick', remaining, time)
    this.setState({
      remaining: remaining - 1,
      time: time,
    })
    if( remaining <= 0 ){
      this._stopTimer()
    }
  },
  _startStop: function(minutes, type){
    return function(){
      if( this.props.notify ){
        this.props.notify(minutes, type)
      }
      console.log( '-- start', minutes, type )
      this._stopTimer()
      this.state.remaining =  minutes * 60
      this.setState({
        disabled25: true,
        disabled15: true,
        disabled5: true,
      })
      var disabledMinutes = {}
      disabledMinutes['disabled'+minutes] = false
      this.setState(disabledMinutes)
      this._startTimer()
    }.bind(this)
  },
  _stopTimer: function(){
    clearInterval(this.interval)
  },
  _startTimer: function(){
    if( this.state.remaining > 0 ){
      this.tick()
      this.interval = setInterval(this.tick, 1000)
    }
  },
  render: function(){
    return  <div>
              <div className="pomodoro">{this.state.time}</div>
              <div className="pomodoro-control-buttons-container">
                <button disabled={this.state.disabled25} onClick={this._startStop(25,"pomodoro")}>
                  <i className="icon pomodoro"></i>
                  <span>&nbsp; 25 min</span>
                </button>
                <button disabled={this.state.disabled5} onClick={this._startStop(5,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 5 min</span>
                </button>
                <button disabled={this.state.disabled15} onClick={this._startStop(15,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 15 min</span>
                </button>
              </div>
            </div>
  }
})

var React = require('react')
var TimeFormatter = require('../modules/TimeFormatter')
var store = require('store')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      remaining: 0,
      time: TimeFormatter.formatSeconds(0),
      disabled25: false,
      disabled15: false,
      disabled5: false,
    }
  },
  componentDidMount: function() {
    if( this.props.data ){
      this.state.remaining = parseInt(this.props.remaining,10)
      this.setState({
        disabled25: true,
        disabled15: true,
        disabled5: true,
      })
      var newState = {disabled25: true, disabled15: true,disabled5: true}
      newState['disabled'+this.props.data.minutes] = false
      this.setState(newState)

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
      this._stop()
      if( this.props.notify ){
        this.props.notify('stop', this.props.data.minutes, this.props.data.type)
      }
    }
  },
  _startStop: function(minutes, type){
    return function(){
      var eventName = this.interval ? 'stop' : 'start'
      if( this.props.notify ){
        this.props.notify(eventName, minutes, type)
      }

      if( eventName === 'start' ) {
        this._start(minutes, type)
      }else{
        this._stop(minutes, type)
      }
    }.bind(this)
  },
  _start: function(minutes, type){
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
  },
  _stop: function(minutes, type){
    this._stopTimer()
    this.setState({
      disabled25: false,
      disabled15: false,
      disabled5: false,
      remaining: 0,
      time: TimeFormatter.formatSeconds(0)
    })
  },
  _stopTimer: function(){
    clearInterval(this.interval)
    this.interval = undefined
  },
  _startTimer: function(){
    if( this.state.remaining > 0 ){
      this.tick()
      this.interval = setInterval(this.tick, 1000)
    }
  },
  render: function(){
    return  <div className="pomodoro">
              <div className="timer">{this.state.time}</div>
              <div className="control-buttons-container">
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

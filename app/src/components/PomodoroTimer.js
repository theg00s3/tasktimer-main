var React = require('react')
  , TimeFormatter = require('../modules/TimeFormatter')
  , store = require('store')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      remaining: 0,
      time: TimeFormatter.formatSeconds(0),
      disabled25: false,
      disabled15: false,
      disabled5: false,
      startedAt: 0
    }
  },
  componentDidMount: function() {
    this.state.startedAt = parseInt(Date.now()/1000, 10)
    if( this.props.remaining > 0 && this.props.data ){
      this.remaining = this.props.remaining
      this.state.remaining = parseInt(this.remaining,10)
      var newState = {disabled25: true, disabled15: true,disabled5: true}
      newState['disabled'+this.props.data.minutes] = false
      this.setState(newState)

      this._startTimer()
    }
  },
  componentWillUnmount: function(){
    clearInterval(this.interval)
  },
  _resetButtons: function(){
    this.setState({disabled25: true, disabled15: true, disabled5: true })
  },
  _tick: function(){
    var now = parseInt(Date.now()/1000, 10)
    var startedAt = this.state.startedAt
    var remaining = startedAt - now + this.remaining

    var time = TimeFormatter.formatSeconds(remaining)
    if( this.props.notify ){
      this.props.notify('tick', this.minutes, this.type, time)
    }
    this.setState({
      remaining: remaining,
      time: time,
    })
    if( remaining <= 0 ){
      this._stop()
    if( this.props.notify ){
        this.props.notify('end', this.minutes, this.type)
      }
    }
  },
  _startStop: function(minutes, type){
    return function(){
      var eventName = this.interval ? 'end' : 'start'
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
    this.state.startedAt = parseInt(Date.now()/1000, 10)
    this._stopTimer()
    this.state.remaining = minutes * 60
    this.remaining = minutes * 60
    this._resetButtons()
    this.minutes = minutes
    this.type = type
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
      this._tick()
      this.interval = setInterval(this._tick, 1000)
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

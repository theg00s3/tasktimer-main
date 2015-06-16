var React = require('react')
  , TimeFormatter = require('../modules/TimeFormatter')
  , Timer = require('../modules/Timer')
  , Buzz = require('../modules/Buzz')

var ringingSound = new Buzz.sound('/assets/audio/ring.mp3', {
  preload: true,
  loop: false,
  webAudioApi: true,
})
var tickingSound = new Buzz.sound('/assets/audio/tick.mp3', {
  preload: true,
  loop: true,
  webAudioApi: true,
})

module.exports = React.createClass({
  getInitialState: function() {
    return {
      time: TimeFormatter.formatSeconds(0),
      disabled25: false,
      disabled15: false,
      disabled5: false,
      startedAt: 0
    }
  },
  componentDidUnmount: function(){
    Timer.off('tick', this._tick)
    Timer.off('end', this._end)
  },
  componentDidMount: function() {
    Timer.on('tick', this._tick)
    Timer.on('end', this._end)
    if( !Timer.isInProgress() && this.props.remaining > 0 && this.props.data ){
      Timer.start(this.props.remaining)
      tickingSound.play()
    }
    if( this.props.data && this.props.data.minutes ){
      var newState = {disabled25: true, disabled15: true,disabled5: true}
      if( this.props.data && this.props.data.minutes !== undefined ){
        newState['disabled'+this.props.data.minutes] = false
      }
      this.setState(newState)
    }
  },
  _resetButtons: function(){
    this.setState({disabled25: true, disabled15: true, disabled5: true })
  },
  _tick: function(){
    if( !this.isMounted() )
      return
    var remaining = Timer.getRemaining()
    var time = TimeFormatter.formatSeconds(remaining)
    if( this.props.notify ){
      this.props.notify('tick', this.minutes, this.type, time)
    }
    this.setState({
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
      var eventName = Timer.isInProgress() ? 'end' : 'start'
      if( this.props.notify ){
        this.props.notify(eventName, minutes, type)
      }

      this[eventName === 'start' ? '_start' : '_stop'](minutes, type)
    }.bind(this)
  },
  _start: function(minutes, type){
    if( Timer.isInProgress() ){
      return
    }
    Timer.start(minutes*60)
    tickingSound.play()
    this.minutes = minutes
    this.type = type
    this._resetButtons()
    var disabledMinutes = {}
    disabledMinutes['disabled'+minutes] = false
    this.setState(disabledMinutes)
  },
  _stop: function(minutes, type){
    tickingSound.stop()
    ringingSound.play()
    Timer.stop()
    this.setState({
      disabled25: false,
      disabled15: false,
      disabled5: false,
      time: TimeFormatter.formatSeconds(0)
    })
  },
  _end: function(){

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

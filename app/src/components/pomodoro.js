var React = require('react')
var TimeFormatter = require('../modules/TimeFormatter')

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
    var pomodoro = localStorage.pomodoro
    if( pomodoro && pomodoro.startedAt && pomodoro.minutes ){
      var remaining = parseInt(localStorage.remaining, 10)
      if( remaining != undefined && remaining > 0 ){
        this.state.remaining = remaining
        console.log( '-- remaining', remaining )
        this._startTimer()
      }
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
    localStorage.remaining = remaining
    this.setState({
      remaining: remaining - 1,
      time: time,
    })
    if( remaining <= 0 ){
      this._stopTimer()
    }
  },
  _start: function(minutes, type){
    return function(){
      console.log( '-- start', minutes, type )
      this._stopTimer()
      this.state.remaining =  minutes * 60
      this._startTimer()
    }.bind(this)
  },
  _stopTimer: function(){
    clearInterval(this.interval)
  },
  _startTimer: function(){
    this.tick()
    this.interval = setInterval(this.tick, 1000)
  },
  render: function(){
    return  <div>
              <div className="pomodoro">{this.state.time}</div>
              <div className="pomodoro-control-buttons-container">
                <button disabled={this.state.disabled25} onClick={this._start(25,"pomodoro")}>
                  <i className="icon pomodoro"></i>
                  <span>&nbsp; 25 min</span>
                </button>
                <button onClick={this._start(5,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 5 min</span>
                </button>
                <button onClick={this._start(15,"break")}>
                  <i className="icon ion-pause"></i>
                  <span>&nbsp; 15 min</span>
                </button>
              </div>
            </div>
  }
})

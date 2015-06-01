var React = require('react')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      seconds: 0,
      time: '00:00'
    }
  },
  componentDidMount: function() {
    var time = localStorage.time
    if (time) {
      console.log( '-- time', time )
      this.interval = setInterval(this.tick, 1000)
    }
  },
  componentWillUnmount: function(){
    clearInterval(this.interval)
  },
  tick: function(){
    console.log('-- tick')
  },
  actions: {
    start: function(minutes, type){
      return function(){
        console.log( '-- start', minutes, type )
      }.bind(this)
    }
  },
  render: function(){
    return  <div>
              <div className="pomodoro">{this.state.time}</div>
              <div className="pomodoro-control-buttons-container">
                <button onClick={this.actions.start(25,"pomodoro")}>
                  <i className="icon pomodoro"></i>
                  <span>&nbsp; 25 min</span>
                </button>
                <button onClick={this.actions.start(5,"break")}>
                  <i className="icon ion-ios7-pause"></i>
                  <span>&nbsp; 5 min</span>
                </button>
                <button onClick={this.actions.start(15,"break")}>
                  <i className="icon ion-ios7-pause"></i>
                  <span>&nbsp; 15 min</span>
                </button>
              </div>
            </div>
  }
})

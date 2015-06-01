var React = require('react')
var Pomodoro = require('./Pomodoro')

module.exports = React.createClass({
  render: function() {
    var pomodoroData = {}
    var remaining = 0
    try {
      pomodoroData = JSON.parse(localStorage.pomodoroData)
    }catch(e){}
    if( pomodoroData && pomodoroData.minutes && pomodoroData.startedAt ){
      remaining = parseInt((moment(pomodoroData.startedAt).unix()+pomodoroData.minutes*60 - moment().unix()),10)
      debugger
    }
    return  <div className="main">
              <Pomodoro remaining={remaining}/>
            </div>
  }
})

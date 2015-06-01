var React = require('react')
var Pomodoro = require('./Pomodoro')
var store = require('store')
var moment = require('moment')

module.exports = React.createClass({
  render: function() {
    var pomodoroData = store.get('pomodoroData')
    var remaining = 0
    console.log( '-- pomodoroData', pomodoroData )
    if( pomodoroData && pomodoroData.minutes && pomodoroData.startedAt ){
      remaining = parseInt((moment(pomodoroData.startedAt).unix() + pomodoroData.minutes*60 - moment().unix()),10)
      // debugger
    }else{
      store.remove('pomodoroData')
    }
    var pomodoroEvent = function(eventName, minutes, type){
      if( eventName === 'stop' ){
        store.remove('pomodoroData')
        return
      }
      store.set('pomodoroData', {
        minutes: minutes,
        type: type,
        startedAt: Date.now()
      })
    }
    return  <div className="main">
              <Pomodoro remaining={remaining} data={pomodoroData} notify={pomodoroEvent}/>
            </div>
  }
})

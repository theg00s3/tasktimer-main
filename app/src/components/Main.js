var React = require('react')
var PomodoroTimer = require('./PomodoroTimer')
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
    return  <div className="main">
              <PomodoroTimer remaining={remaining} data={pomodoroData} notify={pomodoroEvent}/>
            </div>
  }
})

function pomodoroEvent(eventName, minutes, type){
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

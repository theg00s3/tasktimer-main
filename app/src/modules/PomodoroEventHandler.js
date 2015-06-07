var store = require('store')
var PomodoroService = require('./PomodoroService')
var constants = require('../constants')
var AnalyticsService = require('./AnalyticsService')

module.exports = function(eventName, minutes, type, time){
  switch( eventName ){
    case 'start':
      var pomodoroData = {
        minutes: minutes,
        type: type,
        startedAt: Date.now()
      }
      AnalyticsService.track('timer-start', pomodoroData)
      store.set('pomodoroData', pomodoroData)
      break
    case 'end':
      var pomodoroData = store.get('pomodoroData')
      if( pomodoroData && pomodoroData.minutes && pomodoroData.startedAt ){
        pomodoroData = setCancelledAtIfNeeded(pomodoroData)
        AnalyticsService.track('timer-end', pomodoroData)
        PomodoroService.create(pomodoroData)
      }
      store.remove('pomodoroData')
      resetTitle()
      break
    case 'tick':
      document.title = time + ' - ' + constants.title
  }
}

function setCancelledAtIfNeeded(pomodoroData){
  var now = Date.now()
  if( (now - pomodoroData.startedAt)/60/1000 < pomodoroData.minutes ){
    pomodoroData.cancelledAt = now
  }
  return pomodoroData
}


function resetTitle(){
  document.title = constants.title
}


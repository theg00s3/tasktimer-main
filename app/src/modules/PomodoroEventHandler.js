var store = require('store')
  , PomodoroRepository = require('./PomodoroRepository')
  , AnalyticsService = require('./AnalyticsService')

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
        PomodoroRepository.create(pomodoroData)
      }
      store.remove('pomodoroData')
      break
  }
}

function setCancelledAtIfNeeded(pomodoroData){
  var now = Date.now()
  if( (now - pomodoroData.startedAt)/60/1000 < pomodoroData.minutes ){
    pomodoroData.cancelledAt = now
  }
  return pomodoroData
}

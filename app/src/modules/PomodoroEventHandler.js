var store = require('store')
var PomodoroService = require('./PomodoroService')
var constants = require('../constants')

module.exports = function(eventName, minutes, type, time){
  switch( eventName ){
    case 'start':
      store.set('pomodoroData', {
        minutes: minutes,
        type: type,
        startedAt: Date.now()
      })
      break
    case 'end':
      var pomodoroData = store.get('pomodoroData')
      pomodoroData.cancelledAt = Date.now()
      PomodoroService.create(pomodoroData)
      store.remove('pomodoroData')
      resetTitle()
      break
    case 'tick':
      document.title = time + ' - ' + constants.title
  }

}


function resetTitle(){
  document.title = constants.title
}

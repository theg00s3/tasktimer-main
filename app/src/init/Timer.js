var store = require('store')
  , moment = require('moment')

var TimerService = require('../modules/TimerService')
  , Timer = require('../modules/Timer')
  , DocumentTitleUpdateCommand = require('../modules/DocumentTitleUpdateCommand')
  , SoundService = require('../modules/SoundService')

module.exports = function(){
  TimerService.start(Timer, DocumentTitleUpdateCommand, SoundService)

  var pomodoroData = store.get('pomodoroData')

  if( pomodoroData ){
    if( pomodoroData.minutes && pomodoroData.startedAt ){
      remaining = parseInt((moment(pomodoroData.startedAt).unix() + pomodoroData.minutes*60 - moment().unix()),10)
      Timer.start(remaining)
    }
  }
}

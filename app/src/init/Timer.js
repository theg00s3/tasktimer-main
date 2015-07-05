var store = require('store')
  , moment = require('moment')

var TimerService = require('../modules/TimerService')
  , Timer = require('../modules/Timer')
  , Buzz = require('../modules/Buzz')
  , DocumentTitleUpdateCommand = require('../modules/DocumentTitleUpdateCommand')


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


module.exports = function(){
  TimerService.start(Timer, DocumentTitleUpdateCommand, {
    tick: tickingSound,
    ring: ringingSound
  })

  var pomodoroData = store.get('pomodoroData')

  if( pomodoroData ){
    if( pomodoroData.minutes && pomodoroData.startedAt ){
      remaining = parseInt((moment(pomodoroData.startedAt).unix() + pomodoroData.minutes*60 - moment().unix()),10)
      Timer.start(remaining)
    }
  }

}

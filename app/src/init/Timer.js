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
}

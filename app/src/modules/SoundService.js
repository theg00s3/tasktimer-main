module.exports = {
  startTickingSound: startTickingSound,
  stopTickingSound: stopTickingSound,
  startRingingSound: startRingingSound,
}

var Buzz = require('./Buzz')

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


function startTickingSound(){
  tickingSound.play()
}

function stopTickingSound(){
  tickingSound.stop()
}

function startRingingSound(){
  ringingSound.play()
}
module.exports = {
  isMutedTickingSound: isMutedTickingSound,
  isMutedRingingSound: isMutedRingingSound,
  startTickingSound: startTickingSound,
  stopTickingSound: stopTickingSound,
  startRingingSound: startRingingSound,
  toggleMuteTickingSound: toggleMuteTickingSound,
  toggleMuteRingingSound: toggleMuteRingingSound,
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

function isMutedTickingSound(){
  return tickingSound.isMuted()
}

function isMutedRingingSound(){
  return ringingSound.isMuted()
}

function startTickingSound(){
  tickingSound.play()
}

function stopTickingSound(){
  tickingSound.stop()
}

function startRingingSound(){
  ringingSound.play()
}

function toggleMuteTickingSound(){
  tickingSound.toggleMute()
}

function toggleMuteRingingSound(){
  ringingSound.toggleMute()
}
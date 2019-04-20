import Buzz from './Buzz'

// require('../assets/audio/ring.mp3')
// require('../assets/audio/tick-tock.mp3')

export default {
  tickSoundEnabled: tickSoundEnabled,
  ringSoundEnabled: ringSoundEnabled,
  startTickingSound: startTickingSound,
  stopTickingSound: stopTickingSound,
  startRingingSound: startRingingSound,
  toggleTickSound: toggleTickSound,
  toggleRingSound: toggleRingSound
}

const Sound = Buzz.sound
const ringSound = new Sound('ring', {
  preload: true,
  loop: false,
  formats: ['mp3']
})
const tickSound = new Sound('tick-tock', {
  preload: true,
  loop: true,
  formats: ['mp3']
}).setSpeed(1)

function tickSoundEnabled () {
  return !tickSound.isMuted()
}

function ringSoundEnabled () {
  return !ringSound.isMuted()
}

function startTickingSound () {
  if (tickSound.isPaused()) {
    tickSound.unmute()
    tickSound.play()
  }
}

function stopTickingSound () {
  tickSound.stop()
}

function startRingingSound () {
  ringSound.play()
}

function toggleTickSound () {
  tickSound.toggleMute()
}

function toggleRingSound () {
  ringSound.toggleMute()
}

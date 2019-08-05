const ringSoundSrc = require('../assets/audio/ring.mp3')
const tickSoundSrc = require('../assets/audio/tick.mp3')

const ringSound = new Audio(ringSoundSrc)
const tickSound = new Audio(tickSoundSrc)

export default {
  tickSoundEnabled: tickSoundEnabled,
  ringSoundEnabled: ringSoundEnabled,
  startTickingSound: startTickingSound,
  stopTickingSound: stopTickingSound,
  startRingingSound: startRingingSound,
  toggleTickSound: toggleTickSound,
  toggleRingSound: toggleRingSound
}

function tickSoundEnabled () {
  return !tickSound.isMuted()
}

function ringSoundEnabled () {
  return !ringSound.isMuted()
}

function startTickingSound (settings = {tickSoundEnabled: false}) {
  tickSound.play()
  .catch(err => {
    console.error(err)
    tickSound.pause()
  })
}

function stopTickingSound () {
  tickSound.pause()
}

function startRingingSound () {
  ringSound.play().catch(err => {
    console.error(err)
  })
}

function toggleTickSound () {
  if (tickSound.volume === 0) tickSound.volume = 1
  else tickSound.volume = 0
}

function toggleRingSound () {
  if (ringSound.volume === 0) ringSound.volume = 1
  else ringSound.volume = 0
}

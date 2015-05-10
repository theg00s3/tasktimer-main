angular.module('app')
.service('Sounds', function(Settings,rAf){
  var self = this
  var sounds = {}
  var loopingSound = null
  var soundsEnabled = true
  var tickingSoundEnabled = true

  Settings.get().then(function(settings){
    soundsEnabled = settings.soundsEnabled
    tickingSoundEnabled = settings.tickingSoundEnabled
  })

  Settings.changed(function(settings){
    soundsEnabled = settings.soundsEnabled
    tickingSoundEnabled = settings.tickingSoundEnabled
    if( loopingSound ){
      if( soundsEnabled && tickingSoundEnabled ){
        loopingSound.play()
      }else{
        loopingSound.pause()
      }
    }
  })

  function registerLoop(soundName){
    loopingSound = sounds[soundName]
    var buffer = 0.105
    var rAfHandle = rAf.start(function loop(){
      try{
        if(loopingSound.currentTime > loopingSound.duration - buffer){
          loopingSound.currentTime = 0
          loopingSound.play()
        }
        rAf.start(loop)
      }catch(e){
        rAf.stop(loop)
      }
    })
  }

  function soundExists(soundName){
    return !!sounds[soundName]
  }

  function resetSound(soundName){
    if( sounds[soundName] && sounds[soundName].readyState >= 4 ){
      sounds[soundName].currentTime = 0
      sounds[soundName].pause()
      // sounds[soundName].removeEventListener('timeupdate')
    }
  }

  self.load = function(soundName){
    var audio = document.createElement('audio')
    audio.src= '/assets/' + soundName + '.mp3'
    audio.setAttribute('preload', true)
    sounds[soundName] = audio
  }

  self.play = function(soundName,looping){
    if( !soundExists(soundName) ) { return }
    if( soundsEnabled ){
      sounds[soundName].play()
    }
  }

  self.playLoop = function(soundName){
    registerLoop(soundName)
    if( soundsEnabled && tickingSoundEnabled ){
      self.play(soundName)
    }
  }

  self.stop = function(soundName){
    if( !soundExists(soundName) ) { return }
    loopingSound = null
    resetSound(soundName)
  }

})

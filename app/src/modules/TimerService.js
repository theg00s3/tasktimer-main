module.exports = {
  start: start
}

var DocumentTitleService
  , Buzz

var ringingSound
  , tickingSound

function start(Timer, _DocumentTitleService, _Buzz){
  DocumentTitleService = _DocumentTitleService
  Buzz = _Buzz
  Timer.on('tick', onTick)
  Timer.on('end', onEnd)
  Timer.on('start', onStart)

  if( Buzz && Buzz.sound ){
    ringingSound = new Buzz.sound('/assets/audio/ring.mp3', {
      preload: true,
      loop: false,
      webAudioApi: true,
    })
    ringingSound = new Buzz.sound('/assets/audio/tick.mp3', {
      preload: true,
      loop: false,
      webAudioApi: true,
    })
  }
}

function onTick(remaining){
  if( DocumentTitleService && DocumentTitleService.execute ) {
    DocumentTitleService.execute(remaining)
  }
}
function onEnd(remaining){
  if( DocumentTitleService && DocumentTitleService.execute ) {
    DocumentTitleService.execute(remaining)
  }
}

function onStart(){
}

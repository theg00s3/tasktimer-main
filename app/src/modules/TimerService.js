module.exports = {
  start: start
}

var DocumentTitleService

var ringingSound
  , tickingSound

function start(Timer, _DocumentTitleService, Sounds){
  DocumentTitleService = _DocumentTitleService
  if( Sounds ){
    ringingSound = Sounds.ring
    tickingSound = Sounds.tick
  }

  Timer.on('tick', onTick)
  Timer.on('end', onEnd)
  Timer.on('start', onStart)
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
  if( tickingSound && tickingSound.stop ){
    tickingSound.stop()
  }  
}

function onStart(){
  if( tickingSound && tickingSound.play ){
    tickingSound.play()
  }
}

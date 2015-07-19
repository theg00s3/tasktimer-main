module.exports = {
  start: start
}

var DocumentTitleService
  , SoundService

function start(Timer, _DocumentTitleService, _SoundService){
  DocumentTitleService = _DocumentTitleService
  SoundService = _SoundService

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
  if( SoundService && SoundService.stopTickingSound ) {
    SoundService.stopTickingSound()
  }
  if( SoundService && SoundService.startRingingSound ) {
    SoundService.startRingingSound()
  }
}

function onStart(){
  if( SoundService && SoundService.startTickingSound ) {
    SoundService.startTickingSound()
  }
}
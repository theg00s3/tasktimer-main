module.exports = {
  start: start
}

var DocumentTitleService
  , Buzz

function start(Timer, _DocumentTitleService, _Buzz){
  DocumentTitleService = _DocumentTitleService
  Buzz = _Buzz
  Timer.on('tick', onTick)
  Timer.on('end', onEnd)
  Timer.on('start', onStart)

  if( Buzz && Buzz.sound ){
    new Buzz.sound()
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
  if( Buzz && Buzz.foo ){
    Buzz.foo()
  }
}

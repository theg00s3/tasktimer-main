module.exports = {
  start: start
}

var DocumentTitleService

function start(Timer, _DocumentTitleService){
  DocumentTitleService = _DocumentTitleService

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
}

function onStart(){
}
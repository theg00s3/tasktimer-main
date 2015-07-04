module.exports = {
  start: start
}

var DocumentTitleService

function start(Timer, _DocumentTitleService){
  Timer.on('tick', onTick)
  DocumentTitleService = _DocumentTitleService
}

function onTick(){
  if( DocumentTitleService && DocumentTitleService.update ) {
    DocumentTitleService.update()
  }
}

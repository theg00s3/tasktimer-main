module.exports = {
  start: start
}

var DocumentTitleService

function start(Timer, _DocumentTitleService){
  DocumentTitleService = _DocumentTitleService
  Timer.on('tick', onTick)
}

function onTick(){
  if( DocumentTitleService && DocumentTitleService.execute ) {
    DocumentTitleService.execute()
  }
}

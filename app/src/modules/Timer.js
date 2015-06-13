module.exports = {
  start: start,
  stop: stop,
  getRemaining: getRemaining,
}

var startedAt = undefined
var seconds = undefined

function start(_seconds){
  if( !validateSeconds(_seconds) )
    return
  if( !startedAt ){
    startedAt = Date.now()
    seconds = _seconds
    return seconds
  }
}

function stop(){
  if( startedAt ){
    startedAt = undefined
    seconds = undefined
    return Date.now()
  }
}

function getRemaining(){
  var now = Date.now()
  return startedAt - now + seconds
}


function validateSeconds(seconds){
  return seconds === parseInt(seconds, 10 ) && seconds >= 0
}

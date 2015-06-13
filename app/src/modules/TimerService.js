module.exports = {
  start: start,
  stop: stop,
  getRemaining: getRemaining,
}

var startedAt = undefined

function start(seconds){
  if( validateSeconds(seconds) )
    return
  if( !startedAt ){
    startedAt = Date.now()
    return startedAt
  }
}

function stop(){
  if( startedAt ){
    startedAt = undefined
    return Date.now()
  }
}

function getRemaining(){
  return 42
}


function validateSeconds(seconds){
  return seconds !== parseInt(seconds, 10 ) || seconds < 0
}

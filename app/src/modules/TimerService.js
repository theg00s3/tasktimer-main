module.exports = {
  start: start,
  stop: stop,
  getRemaining: getRemaining,
}

var startedAt = undefined

function start(){
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

var Timer = {
  start: start,
  stop: stop,
  getRemaining: getRemaining,
  isInProgress: isInProgress,
  on: on,
}

module.exports = Timer

var startedAt = undefined
var seconds = undefined
var interval = undefined
var events = {
  tick: []
}

function start(_seconds){
  if( !validateSeconds(_seconds) || isTicking() )
    return

  startedAt = Date.now()
  seconds = _seconds
  interval = setInterval(tick, 100)
  return seconds
}

function stop(){
  if( startedAt ){
    startedAt = undefined
    seconds = undefined
    clearInterval(interval)
    return Date.now()
  }
}

function getRemaining(){
  var now = Date.now()
  return intValue(startedAt/1000) - intValue(now/1000) + seconds
}

function isInProgress(){
  return !!startedAt
}

function on(event, fn){
  if( events[event] !== undefined && fn instanceof Function ){
    events[event].push(fn)
  }
  return Timer
}


function tick(){
  var remaining = getRemaining()
  events.tick.forEach(function(cb){
    if( cb instanceof Function )
      cb(remaining)
  })
  if( remaining <= 0 ){
    stop()
  }
}

function intValue(number){
  return parseInt(number, 10)
}

function validateSeconds(seconds){
  return seconds === parseInt(seconds, 10 ) && seconds >= 0
}

function isTicking(){
  return !!startedAt
}

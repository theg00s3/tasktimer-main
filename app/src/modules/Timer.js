module.exports = {
  start: start,
  stop: stop,
  getRemaining: getRemaining,
  on: on,
}

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

function on(event, fn){
  if( events[event] !== undefined ){
    events[event].push(fn)
  }
  return module.exports
}


function tick(){
  console.log( 'tick', getRemaining() )
  events.tick.forEach(function(cb){
    cb(getRemaining())
  })
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

var noop = function(){}
var StartTimer = {
  start: noop,
  stop: noop,
  getRemaining: noop,
  isInProgress: noop,
  on: on,
  off: noop,
}

module.exports = StartTimer

var events = {
  tick: [],
}

function on(event, fn){
  if( event === 'start' ){
    fn(25*60)
  }
  return StartTimer
}

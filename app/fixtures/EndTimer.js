var noop = function(){}
var EndTimer = {
  start: noop,
  stop: noop,
  getRemaining: noop,
  isInProgress: noop,
  on: on,
  off: noop,
}

module.exports = EndTimer

var events = {
  tick: [],
}

function on(event, fn){
  if( event === 'end' ){
    fn(0)
  }
  return EndTimer
}

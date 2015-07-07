var noop = function(){}
var VoidTimer = {
  start: noop,
  stop: noop,
  getRemaining: noop,
  isInProgress: noop,
  on: on,
  off: noop,
}

module.exports = VoidTimer

function on(event, fn){
  if( event === 'end' ){
    fn(0)
  }
  return VoidTimer
}

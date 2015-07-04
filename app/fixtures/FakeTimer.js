var noop = function(){}
var FakeTimer = {
  start: noop,
  stop: noop,
  getRemaining: noop,
  isInProgress: noop,
  on: on,
  off: noop,
}

module.exports = FakeTimer

var events = {
  tick: [],
}

function on(event, fn){
  if( event === 'tick' ){
    fn(25*60)
  }
  return FakeTimer
}

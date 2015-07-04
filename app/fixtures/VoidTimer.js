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

function on(event, fn){
  fn(0)
  return FakeTimer
}

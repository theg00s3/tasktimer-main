var noop = function(){}
var FakeTimer = {
  start: noop,
  stop: noop,
  getRemaining: noop,
  isInProgress: noop,
  on: noop,
  off: noop,
}

module.exports = FakeTimer


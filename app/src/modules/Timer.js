export default {
  start: start,
  forceEnd: forceEnd,
  getRemaining: getRemaining,
  isInProgress: isInProgress,
  on: on,
  off: off
}

let started_at
let seconds
let interval
const events = {
  tick: [],
  end: [],
  forceEnd: [],
  start: []
}

function start (_seconds) {
  if (!validateSeconds(_seconds) || isTicking() || _seconds <= 0) {
    return
  }

  started_at = Date.now()
  seconds = _seconds
  interval = setInterval(tick, 1000)
  setTimeout(tick, 50)
  events.start.forEach(function (callback) {
    callback(seconds)
  })
  return seconds
}

function forceEnd (natural) {
  if (started_at) {
    events[natural ? 'end' : 'forceEnd'].forEach((cb) => {
      if (cb instanceof Function) {
        cb(0)
      }
    })
    started_at = undefined
    seconds = undefined
    clearInterval(interval)
  }
  return 0
}

function getRemaining () {
  if (!started_at) { return 0 }
  const now = Date.now()
  return intValue(started_at / 1000) - intValue(now / 1000) + seconds
}

function isInProgress () {
  return !!started_at
}

function on (event, fn) {
  if (events[event] !== undefined && fn instanceof Function) {
    events[event].push(fn)
  }
}

function off (event, fn) {
  if (events[event] !== undefined && fn instanceof Function) {
    events[event].forEach((callback, index) => {
      if (fn === callback) {
        delete events[event][index] // TODO: better delete
      }
    })
  }
}

function tick () {
  const remaining = getRemaining()
  if (remaining <= 0) {
    return forceEnd(true)
  }
  events.tick.forEach((cb) => {
    if (cb instanceof Function) {
      cb(remaining, seconds)
    }
  })
}

function intValue (number) {
  return parseInt(number, 10)
}

function validateSeconds (seconds) {
  const parsedSeconds = parseInt(seconds, 10)
  return seconds === parsedSeconds && seconds >= 0 && seconds <= 25 * 60
}

function isTicking () {
  return !!started_at
}

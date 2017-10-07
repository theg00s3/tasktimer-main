const events = {
  on: []
}

export default {
  on: on,
  off: off,
  emit: emit
}

function off (topic, callback) {
  events.on = events.on.filter((ev) => {
    return ev.topic === topic && ev.callback === callback
  })
}

function on (topic, callback) {
  events.on.push({
    topic,
    callback
  })
}
function emit (topic, payload) {
  events.on
  .filter((ev) => { return ev.topic === topic })
  .forEach(({callback}) => { callback(payload) })
}

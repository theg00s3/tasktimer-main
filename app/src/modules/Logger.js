module.exports = {
  log: log,
  enable: enable
}

var enabled = false

function enable(enable){
  enabled = !!enable
}

function log() {
  if( enabled && window.console && window.console.log){
    window.console.log.apply(console, Array.prototype.slice.call(arguments) )
  }
}

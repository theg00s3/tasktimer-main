module.exports = {
  start: start
}

function start(Timer){
  Timer.on('tick', onTick)
}

function onTick(){}

module.exports = {
  start: start
}

var startedAt = undefined

function start(){
  if( !startedAt ){
    startedAt = Date.now()
    return startedAt
  }
}

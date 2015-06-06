module.exports = {
  getDuration: getDuration
}

function getDuration(pomodoro){
  if( !pomodoro || pomodoro.startedAt === undefined || pomodoro.minutes === undefined ) {
    return 0
  }
  if( !pomodoro.cancelledAt ){
    return pomodoro.minutes * 60
  }
  if( pomodoro.cancelledAt ) {
    return parseInt((pomodoro.cancelledAt - pomodoro.startedAt)/1000, 10)
  }
  return 0
}

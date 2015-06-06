module.exports = {
  getDuration: getDuration
}

function getDuration(pomodoro){
  if( !pomodoro || pomodoro.startedAt === undefined || pomodoro.minutes === undefined ) {
    return 0
  }
  if( pomodoro.cancelledAt === undefined && pomodoro.minutes ){
    return pomodoro.minutes * 60
  }
  return 0
}

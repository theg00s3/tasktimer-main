module.exports = {
  getFullPomodoroCount: getFullPomodoroCount
}

var _ = require('underscore')

function getFullPomodoroCount(data){
  return _.reduce(data, function(acc, pomodoro){
    var fullPomodoro = isFullPomodoro(pomodoro)
    return acc + (fullPomodoro ? 1 : 0)
  }, 0)
}

function isFullPomodoro(pomodoro){
  return 'pomodoro' === pomodoro.type && pomodoro.cancelledAt === undefined
}
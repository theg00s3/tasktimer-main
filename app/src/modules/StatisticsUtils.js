module.exports = {
  getFullPomodoroCount: getFullPomodoroCount,
  getFullPomodoroHours: getFullPomodoroHours,
}

var _ = require('underscore')
var PomodoroUtils = require('../../../shared/PomodoroUtils')
var NumberUtils = require('../../../shared/NumberUtils')

function getFullPomodoroCount(data){
  return _.reduce(data, function(acc, pomodoro){
    var fullPomodoro = isFullPomodoro(pomodoro)
    return acc + (fullPomodoro ? 1 : 0)
  }, 0)
}

function getFullPomodoroHours(data){
  return _.reduce(data, function(acc, pomodoro){
    var fullPomodoro = isFullPomodoro(pomodoro)
    var hours = PomodoroUtils.calculateDurationInHours(pomodoro)
    acc =  acc + (fullPomodoro ? PomodoroUtils.calculateDurationInHours(pomodoro) : 0)
    return NumberUtils.limitDecimals(acc, 1)
  }, 0)
}

function isFullPomodoro(pomodoro){
  return 'pomodoro' === pomodoro.type && pomodoro.cancelledAt === undefined
}
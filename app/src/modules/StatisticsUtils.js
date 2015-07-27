module.exports = {
  getFullPomodoroCount: getFullPomodoroCount,
  getFullPomodoroHours: getFullPomodoroHours,
  getAllPomodoroCount: getAllPomodoroCount,
  getAllPomodoroHours: getAllPomodoroHours,
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
    acc = acc + (fullPomodoro ? PomodoroUtils.calculateDurationInHours(pomodoro) : 0)
    return NumberUtils.limitDecimals(acc, 1)
  }, 0)
}

function getAllPomodoroCount(data){
  return _.reduce(data, function(acc, pomodoro){
    if( !PomodoroUtils.isPomodoro(pomodoro) ){
      return acc
    }
    var duration = PomodoroUtils.calculateDurationInMinutes(pomodoro)
    acc = acc + (duration / 25)
    return NumberUtils.limitDecimals(acc, 1)
  }, 0)
}

function getAllPomodoroHours(data){
  return _.reduce(data, function(acc, pomodoro){
    if( !PomodoroUtils.isPomodoro(pomodoro) ){
      return acc
    }

    var duration = PomodoroUtils.calculateDurationInHours(pomodoro)
    acc = acc + PomodoroUtils.calculateDurationInHours(pomodoro)
    return NumberUtils.limitDecimals(acc, 2)
  }, 0)
}

function isFullPomodoro(pomodoro){
  return PomodoroUtils.isPomodoro(pomodoro) && pomodoro.cancelledAt === undefined
}
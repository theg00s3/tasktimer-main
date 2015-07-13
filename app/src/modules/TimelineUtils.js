module.exports = {
  calculateStart: calculateStart,
  calculateStartHour: calculateStartHour,
  calculateEnd: calculateEnd,
  calculateEndHour: calculateEndHour,
  calculateTimelineItem: calculateTimelineItem,
}

var _ = require('underscore')
var moment = require('moment')
var PomodoroUtils = require('../../../shared/PomodoroUtils')

var hourFormat = 'HH:mm'

function calculateStart(data){
  data = _.isArray(data) ? data : [data]
  return _.min(data, function(value, key, list){
    return new Date(value.startedAt)
  }).startedAt
}

function calculateStartHour(data){
  return moment(calculateStart(data)).startOf('hour').format(hourFormat)
}

function calculateEnd(data){
  data = _.isArray(data) ? data : [data]
  return _.max(data, function(value, key, list){
    return new Date(value.startedAt)
  }).startedAt
}

function calculateEndHour(data){
  return moment(calculateEnd(data)).endOf('hour').add(1,'minute').format(hourFormat)
}

function calculateTimelineItem(pomodoro, data){
  var args = Array.prototype.slice.call(arguments)
  if( args.length === 3 ){ // for practical use with Array.prototype.map
    data = args[2]
  }
  var pomodoroStart = moment(calculateStart(pomodoro)).unix()
  var timelineStart = moment(calculateStart(data)).startOf('hour').unix()
  var timelineEnd = moment(calculateEnd(data)).endOf('hour').add(1,'minute').unix()
  var timelineInMinutes = calculateTimelineInMinutes(timelineStart, timelineEnd)

  var pomodoroDurationInMinutes = PomodoroUtils.calculateDurationInMinutes(pomodoro)
  var pomodoroDurationInPercent = limitDecimalPlaces(pomodoroDurationInMinutes * 100 / timelineInMinutes)
  var r = limitDecimalPlaces(pomodoroDurationInPercent / 2)
  var x = limitDecimalPlaces(percentualValue(timelineStart, timelineEnd, pomodoroStart) + r)
  var className = pomodoro.type
  r = r + '%'
  x = x + '%'

  return {
    x: x,
    r: r,
    className: className
  }
}





function calculateTimelineInMinutes(start,end){
  return parseInt((end - start) / 60 , 10)
}

function percentualValue(min,max,value){
  var normalizedMax = max - min
  var normalizedValue = value - min

  var percent = (normalizedValue/normalizedMax) * 100
  percent = limitDecimalPlaces(percent, 2)
  return percent  
}

function limitDecimalPlaces(number, decimalPlaces) {
  decimalPlaces = decimalPlaces || 2
  var pow = Math.pow(10, decimalPlaces)
  return parseInt(number * pow) / pow
}


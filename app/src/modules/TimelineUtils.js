module.exports = {
  getStart: getStart,
  getStartHour: getStartHour,
  getEnd: getEnd,
  getEndHour: getEndHour,
  getTimelineItemRenderingData: getTimelineItemRenderingData,
}

var _ = require('underscore')
var moment = require('moment')
var PomodoroUtils = require('../../../shared/PomodoroUtils')

var hourFormat = 'HH:mm'

function getStart(data){
  data = _.isArray(data) ? data : [data]
  return _.min(data, function(value, key, list){
    return new Date(value.startedAt)
  }).startedAt
}

function getStartHour(data){
  return moment(getStart(data)).startOf('hour').format(hourFormat)
}

function getEnd(data){
  data = _.isArray(data) ? data : [data]
  return _.max(data, function(value, key, list){
    return new Date(value.startedAt)
  }).startedAt
}

function getEndHour(data){
  return moment(getEnd(data)).endOf('hour').add(1,'minute').format(hourFormat)
}

function getTimelineItemRenderingData(pomodoro, data){
  var args = Array.prototype.slice.call(arguments)
  if( args.length === 3 ){ // for practical use with Array.prototype.map
    data = args[2]
  }
  var startPoint = moment(getStart(pomodoro)).unix()*1000
  var start = moment(getStart(data)).startOf('hour').unix()*1000
  var end = moment(getEnd(data)).endOf('hour').add(1,'minute').unix()*1000
  var timespanInMinutes = getTimespanInMinutes(start, end)

  var durationInMinutes = PomodoroUtils.getDurationInMinutes(pomodoro)
  var percentualDuration = limitDecimalPlaces(durationInMinutes * 100 / timespanInMinutes)
  var r = limitDecimalPlaces(percentualDuration / 2)
  var x = limitDecimalPlaces(percentualValue(start,end,startPoint) + r)
  r = r + '%'
  x = x + '%'

  return {
    x: x,
    r: r,
  }
}

function getTimespanInMinutes(start,end){
  return parseInt((end - start) / 60 / 1000 , 10)
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


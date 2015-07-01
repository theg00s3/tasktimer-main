module.exports = {
  getStart: getStart,
  getStartHour: getStartHour,
  getEnd: getEnd,
  getEndHour: getEndHour,
  getPercentPosition: getPercentPosition,
}

var _ = require('underscore')
var moment = require('moment')

var hourFormat = 'HH:mm'

function getStart(data){
  data = _.isArray(data) ? data : [data]
  return _.min(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getStartHour(data){
  return moment(getStart(data)).startOf('hour').format(hourFormat)
}

function getEnd(data){
  data = _.isArray(data) ? data : [data]
  return _.max(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getEndHour(data){
  return moment(getEnd(data)).endOf('hour').format(hourFormat)
}

function getPercentPosition(point, data){
  var startPoint = getStart(point)
  var start = getStart(data)
  var end = getEnd(data)

  var normalizedEnd = end - start
  var normalizedStartPoint = startPoint - start

  var percent = (normalizedStartPoint/normalizedEnd) * 100
  percent = parseInt(percent * 100)/100

  return (percent + '%').replace(/\./, ',')
}

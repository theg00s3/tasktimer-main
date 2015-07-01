module.exports = {
  getStart: getStart,
  getStartHour: getStartHour,
  getEnd: getEnd,
  getEndHour: getEndHour,
}

var _ = require('underscore')
var moment = require('moment')

var hourFormat = 'HH:mm'

function getStart(data){
  return _.min(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getStartHour(data){
  return moment(getStart(data)).startOf('hour').format(hourFormat)
}

function getEnd(data){
  return _.max(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getEndHour(data){
  return moment(getEnd(data)).endOf('hour').add(1,'minute').format(hourFormat)
}


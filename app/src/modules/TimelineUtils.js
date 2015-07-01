module.exports = {
  getStart: getStart,
  getStartHour: getStartHour,
  getEnd: getEnd,
  getEndHour: getEndHour,
}

var _ = require('underscore')
var moment = require('moment')

function getStart(data){
  return _.min(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getStartHour(data){
  return moment(getStart(data)).startOf('hour').format('HH:mm')
}

function getEnd(data){
  return _.max(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getEndHour(data){
  return moment(getEnd(data)).endOf('hour').add(1,'minute').format('HH:mm')
}


module.exports = {
  getStart: getStart,
  getStartHour: getStartHour,
  getEnd: getEnd,
  getEndHour: getEndHour,
  getRenderingData: getRenderingData,
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
  return moment(getStart(data)).utc().startOf('hour').format(hourFormat)
}

function getEnd(data){
  data = _.isArray(data) ? data : [data]
  return _.max(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getEndHour(data){
  return moment(getEnd(data)).utc().endOf('hour').format(hourFormat)
}

function getRenderingData(point, data){
  var args = Array.prototype.slice.call(arguments)
  if( args.length === 3 ){ // for practical use with Array.prototype.map
    data = args[2]
  }
  var startPoint = getStart(point)
  var start = getStart(data)
  var end = getEnd(data)

  var normalizedEnd = end - start
  var normalizedStartPoint = startPoint - start

  var percent = (normalizedStartPoint/normalizedEnd) * 100
  percent = limitDecimalPlaces(percent, 2)
  var x = percent + '%'

  return {
    x: x
  }
}

function limitDecimalPlaces(number, decimalPlaces) {
  decimalPlaces = decimalPlaces || 2
  var pow = Math.pow(10, decimalPlaces)
  return parseInt(number * pow) / pow

}

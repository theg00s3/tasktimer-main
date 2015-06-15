module.exports = {
  getStart: getStart,
  getEnd: getEnd,
}

var _ = require('underscore')

function getStart(data){
  return _.min(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

function getEnd(data){
  return _.max(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

module.exports = {
  getStart: getStart
}

var _ = require('underscore')

function getStart(data){
  return _.min(data, function(value, key, list){
    return value.startedAt
  }).startedAt
}

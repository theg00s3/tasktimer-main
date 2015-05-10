angular.module('app')
.service('TimeValidator', function(constants){
  var self = this

  function parseToInt(number){
    return parseInt(number,10)
  }

  function inRange(number,min,max){
    return number>=min && number<=max
  }

  function validateIntegerRange(testValue,min,max){
    var _testValue = parseToInt(testValue)
    if( inRange(testValue,min,max) && _testValue===testValue ){
      return _testValue
    }
    return NaN
  }

  self.validateMinutes = function(minutes){
    return validateIntegerRange(minutes,1,25)
  }

  self.validateSeconds = function(seconds){
    return validateIntegerRange(seconds,1,59)
  }

  self.validateDay = function(day){
    return moment(day,constants.dateFormat,true).isValid()
  }
  self.validateWeek = function(week){
    return validateIntegerRange(parseToInt(week),1,52)
  }
})

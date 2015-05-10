angular.module('app')
.service('PomodoroValidator', function(TimeValidator,TagsValidator,constants){
  var self = this

  var propertyValidators = {
    minutes: validateMinutes,
    startedAt: validateStartedAt,
    type: validateType,
    tags: validateTags,
    distractions: validateDistractions,
  }

  self.validate = function(pomodoro){
    var errors = []
    for(var prop in propertyValidators){
      if( !pomodoro && pomodoro.hasOwnProperty(prop) ){
        errors.push('not existing property: \''+ prop +'\'')
      }

      var rule = propertyValidators[prop]
      if( !rule(pomodoro[prop],pomodoro) ){
        errors.push('invalid property: \''+ prop +'\'')
      }
    }
    if( errors.length===0 ){ return true }
    return errors
  }

  function hasProperty(pomodoro,prop){
    return pomodoro && pomodoro.hasOwnProperty(prop) && pomodoro[prop] !==  undefined
  }

  function inTimerange(timestamp,timespan){
    return timestamp<timespan.max && timestamp>timespan.min
  }

  function getPomodoroTimespan(pomodoro){
    return {
      min: pomodoro.startedAt,
      max: pomodoro.cancelledAt ? pomodoro.cancelledAt : pomodoro.startedAt+pomodoro.minutes*60*1000
    }
  }

  /* validators */
  function validateMinutes(minutes){
    return TimeValidator.validateMinutes(minutes)
  }
  function validateStartedAt(startedAt){
    return startedAt < Date.now()
  }
  function validateType(type){
    return ['pomodoro','break'].indexOf(type)>=0
  }
  function validateTags(tags){
    return angular.isArray(tags) && TagsValidator.validate(tags)
  }
  function validateDistractions(distractions,pomodoro){
    if( !angular.isArray(distractions) ){
      return false
    }
    var timespan = getPomodoroTimespan(pomodoro)
    for (var i = 0; i < distractions.length; i++) {
      var d = distractions[i]
      if( !inTimerange(d,timespan) ) { return false }
    }
    return true
  }
})

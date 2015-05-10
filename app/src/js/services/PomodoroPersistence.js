angular.module('app')
.service('PomodoroPersistence', function($q,PomodoroResource,DataManager){
  var self = this 

  self.save = function(pomodoro){
    var deferred = $q.defer()
    PomodoroResource.create(pomodoro).$promise.then(function(){
      console.log('saving success',pomodoro)
      deferred.resolve()
    },function(){
      console.log('saving fail',pomodoro)
      DataManager.addTo('pomodoroSaveFailures',pomodoro)
      deferred.reject()
    })
    return deferred.promise
  }
})
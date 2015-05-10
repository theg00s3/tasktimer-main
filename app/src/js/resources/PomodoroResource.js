angular.module('app')
.factory('PomodoroResource', function($resource){
  return $resource('/api/pomodoro/:id',{'id':'@id'},{
    create: {
      method: 'post',
    },
    query: {
      method:'GET',
      isArray:true
    }
  })
})
angular.module('app')
.run(function($rootScope, User, DataManager, Pomodoro, Notifications) {
  restorePomodoro()

  User.authenticate().then(function(response){
    var user = response.data
    $rootScope.user = user
    if( window.mixpanel ){
      mixpanel.identify(user.id)
      mixpanel.people.set({
        $username: user.username,
        $name: user.username,
      })
    }
  })

  Notifications.requestPermission()

  $rootScope.remainingTime = '00:00'

  function restorePomodoro(){
    DataManager.get('pomodoroRestoreData').then(function(restoreData){
      if( !restoreData || restoreData.minutes ===0 ){ return }
      try{
        if( !Pomodoro.inProgress() ){
          Pomodoro.restore(restoreData)
        } else {
          savePomodoro(restoreData)
        }
      }catch(e){
        savePomodoro(restoreData)
      }
    })
  }

  function savePomodoro(pomodoro){
    DataManager.addPomodoro(pomodoro)
    DataManager.set('pomodoroRestoreData',null)
  }

})

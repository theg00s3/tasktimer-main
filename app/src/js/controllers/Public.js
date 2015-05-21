angular.module('app')
.controller('PublicCtrl', function($scope, $state, $analytics, utils, Socket, Pomodoro){
  var vm = this

  vm.roomId = $state.params.id
  vm.roomTitle = '#'+vm.roomId

  vm.pomodoro = Pomodoro
  vm.clientsCount = 1

  var socket = new Socket('/', {forceNew: true, reconnect: true})
  socket.emit('room', vm.roomId)
  socket.on('start', function(minutes, type){
    if( !vm.pomodoro.inProgress() ){
      vm.startStopPomodoro(minutes, type, true)
    }
  })
  socket.on('stop', function(minutes, type){
    if( vm.pomodoro.inProgress() ){
      vm.startStopPomodoro(minutes, type, true)
    }
  })
  socket.on('clientsCount', function(clientsCount){
    vm.clientsCount = clientsCount
  })
  socket.on('pomodoroSyncRequest', function(){
    socket.emit('pomodoroSyncResponse', vm.pomodoro.getData())
  })
  socket.on('pomodoroSyncResponse', function(pomodoroSync){
    console.log( pomodoroSync )
    if( pomodoroSync.minutes ){
      Pomodoro.restore(pomodoroSync)
    }
  })


  $scope.$on('$destroy', function(){
    socket.removeAllListeners()
    socket.disconnect()
  })

  vm.startStopPomodoro = function(minutes,type,remoteOperation){
    if( vm.pomodoro.inProgress() ){
      if( remoteOperation === undefined) {
        if( !confirm('Do you want to cancel the timer?') ) {
          return
        }
      }
      if( !remoteOperation )
        socket.emit('stop', minutes, type)
      vm.pomodoro.stop()
      $analytics.eventTrack('length'+minutes,{category:type+'-stop'})
      utils.loseFocus()
      return
    }
    if( !remoteOperation )
      socket.emit('start', minutes, type)
    vm.pomodoro.start(minutes, type, angular.noop, angular.noop, angular.noop)
    $analytics.eventTrack('length'+minutes,{category:type+'-start'})
    utils.loseFocus()
  }
})

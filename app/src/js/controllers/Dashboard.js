angular.module('app')
.controller('DashboardCtrl', function($scope,$analytics,Keyboard,Pomodoro,Tour,Settings,utils){
  var vm = this

  var clicks = 0
  var keyboard = new Keyboard()
  keyboard
    .when(32, function(){
      event.preventDefault()
      vm.startStopPomodoro(25,'pomodoro')
    })
    .when(77,function(){
      Settings.toggle('soundsEnabled')
    })
    .when(84,function(){
      Settings.toggle('tickingSoundEnabled')
    })
    .when(88,function(){
      vm.pomodoro.recordDistraction()
    })

  vm.tour = Tour

  vm.pomodoro = Pomodoro

  vm.newTag = ''
  vm.newTagEnabled = true

  Settings.changed(function(settings){
    vm.soundsEnabled = settings.soundsEnabled
    vm.tickingSoundEnabled = settings.tickingSoundEnabled
  })


  function keyboardShortcut(e){
    var nodeName = e.target.nodeName.toLowerCase()
    if( nodeName==='input' || nodeName==='button' ){ return }
    keyboard.handle((e.shiftKey?'shift':'') + e.keyCode)
  }

  ;(function registerInteractionEvents(){
    angular.element(document.body).on('keydown', keyboardShortcut)
  })();

  function deregisterInteractionEvents(){
    angular.element(document.body).off('keydown', keyboardShortcut)
  }

  $scope.$on('$destroy', deregisterInteractionEvents)

  vm.newTagKeyUp = function($event){
    if( !vm.newTag || $event.keyCode !== 13 ){ return }
    if( vm.pomodoro.getTags().canAdd(vm.newTag) ){
      vm.pomodoro.getTags().add( vm.newTag )
      vm.newTag = ''
    }
  }

  vm.toggleSound = function(){
    Settings.toggle('soundsEnabled')
  }

  vm.startStopPomodoro = function(minutes,type){
    if( vm.pomodoro.inProgress() ){
      if( confirm('Do you want to cancel the timer?') ){
        vm.pomodoro.stop()
        $analytics.eventTrack('length'+minutes,{category:type+'-stop'})
        utils.loseFocus()
      }
      return
    }
    vm.pomodoro.start(minutes, type, angular.noop, angular.noop, angular.noop)
    $analytics.eventTrack('length'+minutes,{category:type+'-start'})
    utils.loseFocus()
  }

  vm.addTag = function($event,tag){
    if( $event instanceof KeyboardEvent && $event.keyCode !== 13 ){
      return
    }
    vm.pomodoro.getTags().add(tag)
  }
})

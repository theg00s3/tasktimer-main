angular.module('app')
.run(function($state,Modal,Keyboard) {
  var keyboard = new Keyboard()
  keyboard
    .when('83',function(){
      $state.go('statistics.daily')
    })
    .when('87',function(){
      $state.go('statistics.weekly')
    })
    .when('68',function(){
      $state.go('dashboard')
    })
    .when('27',function(){
      Modal.hide('keyboardShortcuts')
      Modal.hide('loginPrompt')
    })
    .when('shift191',function(){
      Modal.toggle('keyboardShortcuts')
    })

  angular.element(document.body).on('keydown', function(e){
    if( !isInputElement(e.target) ) {
      keyboard.handle((e.shiftKey?'shift':'') + e.keyCode)
    }
  })

  function isInputElement(element){
    var nodeName = element.nodeName.toLowerCase()
    return ['input','button','textarea'].indexOf(nodeName) >= 0
  }

})

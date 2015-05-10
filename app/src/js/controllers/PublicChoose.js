angular.module('app')
.controller('PublicChooseCtrl', function($state,RoomValidator){
  var vm = this

  vm.submit = function(){
    if( RoomValidator.validate(vm.room) ){
      $state.go('public.room', {id: vm.room})
    }
  }
})

angular.module('app')
.controller('TrelloGrantCtrl',function($location,$state,$timeout,Trello){
  var vm = this

  var token = Trello.getTokenFrom($location.$$hash)
  if( token ){
    Trello.setToken(token)
    localStorage.setItem('trelloToken',token)
    vm.token = token
  } else{
    vm.token = 'invalid'
  }

  $timeout(function(){
    $state.go('dashboard')
  }, 5000)
})
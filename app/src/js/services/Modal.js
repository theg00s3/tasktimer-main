angular.module('app')
.service('Modal', function($rootScope){
  var self = this

  var listeners = {}

  self.toggle = function(modalName){
    if( listeners[modalName] ){
      listeners[modalName].state = !listeners[modalName].state
      setState(modalName, listeners[modalName].state)
    }
  }

  self.show = function(modalName){
    setState(modalName, true)
  }

  self.hide = function(modalName){
    setState(modalName, false)
  }

  self.changes = function(modalName,callback){
    listeners[modalName] = {
      callback: callback || angular.noop,
      state: false
    }
  }

  function setState(modalName,state){
    if( listeners[modalName] ){
      state = !!state
      listeners[modalName].state = state
      if( $rootScope.$$phase ){
        listeners[modalName].callback(state)
      }else{
        $rootScope.$evalAsync(function(){
          listeners[modalName].callback(state)
        })
      }
    }    
  }
})